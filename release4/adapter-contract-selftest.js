'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = process.env.COWORK_ROOT || path.resolve(__dirname, '..', '..');
const DIR = path.join(ROOT, 'AgentConstructLab', 'release4');
const targets = ['microsoft-365','claude','chatgpt','gemini','open-runtime'];
const files = targets.map(t => path.join(DIR, t + '.adapter.json'));
const results = [];
function test(id, fn) { try { fn(); results.push({id,status:'pass'}); } catch(e) { results.push({id,status:'fail',detail:e.message}); } }
for (const p of [path.join(DIR,'agent-construct.schema.json'), path.join(DIR,'platform-adapter.schema.json'), ...files]) {
  test('json:' + path.basename(p), () => JSON.parse(fs.readFileSync(p,'utf8')));
}
const adapters = files.map(p => JSON.parse(fs.readFileSync(p,'utf8')));
test('targets:complete', () => { const got = adapters.map(x=>x.target).sort(); if (JSON.stringify(got)!==JSON.stringify([...targets].sort())) throw new Error('targets=' + got.join(',')); });
test('ids:unique', () => { const a=adapters.map(x=>x.id); if(new Set(a).size!==a.length) throw new Error('duplicate id'); });
test('contract:canonical', () => { if(adapters.some(x=>x.input_contract!=='acl:agent-construct:1')) throw new Error('wrong input contract'); });
test('tools:complete', () => { for(const a of adapters) for(const k of ['filesystem','command','browser']) if(!a.tool_mapping || !a.tool_mapping[k]) throw new Error(a.id+' missing '+k); });
test('validation:governed', () => { for(const a of adapters) for(const k of ['shared_required','adapter_required','publish_requires_approval']) if(a.validation[k]!==true) throw new Error(a.id+' '+k); });
const failed = results.filter(x=>x.status==='fail');
console.log('R4_ADAPTER_CASES=' + results.length);
console.log('R4_ADAPTER_FAILED=' + failed.length);
for(const x of failed) console.log('FAIL ' + x.id + ': ' + x.detail);
console.log('R4_ADAPTER_RESULT=' + (failed.length ? 'FAIL' : 'PASS'));
process.exit(failed.length ? 1 : 0);
