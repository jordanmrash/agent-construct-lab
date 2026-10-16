'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = process.env.COWORK_ROOT || path.resolve(__dirname, '..', '..');
const SRC = path.join(ROOT, 'JobFramework');
const OUT = path.join(ROOT, 'Outputs', '2026-09-29 - Release 4 Baseline');
const REGISTRY = path.join(OUT, 'component-registry.json');
const REPORT = path.join(OUT, 'release4-baseline.json');
const EXCLUDE = new Set(['.baseline', '.locks', 'node_modules', '.git']);

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (EXCLUDE.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.isFile()) out.push(p);
  }
  return out.sort();
}
function hash(p) { return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'); }
function rel(p) { return path.relative(ROOT, p).split(path.sep).join('/'); }
function classify(p) {
  const r = rel(p).toLowerCase();
  if (r.includes('/fixtures/positive/')) return 'fixture-positive';
  if (r.includes('/fixtures/negative/')) return 'fixture-negative';
  if (r.includes('/factories/')) return 'factory';
  if (r.includes('/runtime/')) return 'runtime';
  if (r.includes('/schemas/')) return 'schema';
  if (r.includes('/templates/')) return 'template';
  if (r.includes('/tools/')) return 'tool';
  if (r.endsWith('.md')) return 'documentation';
  return 'tool';
}
function kind(p, category) {
  const x = path.extname(p).toLowerCase();
  if (category === 'schema') return 'json-schema';
  if (x === '.js') return 'javascript';
  if (x === '.json') return 'json';
  if (x === '.md') return 'markdown';
  if (x === '.csv') return 'data';
  return 'other';
}
function idFor(p) { return rel(p).replace(/^JobFramework\//, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase(); }
function main() {
  if (!fs.existsSync(SRC)) throw new Error('JobFramework missing: ' + SRC);
  fs.mkdirSync(OUT, { recursive: true });
  const files = walk(SRC);
  const components = files.map(p => {
    const category = classify(p);
    return { id: idFor(p), category, path: rel(p), kind: kind(p, category), sha256: hash(p), bytes: fs.statSync(p).size, status: 'present' };
  });
  const cats = ['runtime','schema','template','tool','factory','fixture-positive','fixture-negative','documentation'];
  const summary = { total: components.length };
  for (const c of cats) summary[c] = components.filter(x => x.category === c).length;
  const registry = { schema_version: '1.0.0', generated_at: new Date().toISOString(), project: 'Agent Construct Lab', components, summary };
  fs.writeFileSync(REGISTRY, JSON.stringify(registry, null, 2) + '\n');

  const expected = { runtime: 1, schema: 10, template: 2, tool: 4, 'fixture-positive': 16, 'fixture-negative': 36 };
  const checks = Object.entries(expected).map(([k,v]) => ({ id: 'count:' + k, expected: v, actual: summary[k], status: summary[k] === v ? 'pass' : 'fail' }));
  const duplicates = new Map();
  for (const c of components) { const a = duplicates.get(c.sha256) || []; a.push(c.path); duplicates.set(c.sha256, a); }
  const duplicate_content_groups = [...duplicates.entries()].filter(([,a]) => a.length > 1).map(([sha256, paths]) => ({ sha256, paths }));
  const report = { schema_version: '1.0.0', generated_at: new Date().toISOString(), source: 'JobFramework', summary, checks, duplicate_content_groups, overall: checks.every(x => x.status === 'pass') ? 'pass' : 'fail' };
  fs.writeFileSync(REPORT, JSON.stringify(report, null, 2) + '\n');
  console.log('R4_COMPONENTS=' + summary.total);
  for (const c of cats) console.log('R4_' + c.toUpperCase().replace('-', '_') + '=' + summary[c]);
  console.log('R4_DUPLICATE_CONTENT_GROUPS=' + duplicate_content_groups.length);
  console.log('R4_RESULT=' + report.overall.toUpperCase());
  process.exit(report.overall === 'pass' ? 0 : 1);
}
try { main(); } catch (e) { console.error('R4_RESULT=FAIL ' + e.message); process.exit(1); }
