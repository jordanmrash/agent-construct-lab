'use strict';
const fs=require('fs'),path=require('path');
const ROOT=process.env.COWORK_ROOT||path.resolve(__dirname,'..','..');
const DIR=path.join(ROOT,'AgentConstructLab','release4');
const OUT=path.join(ROOT,'Outputs','2026-09-29 - Release 4 Claude Evidence Gap');
const matrix=JSON.parse(fs.readFileSync(path.join(DIR,'behavioral-equivalence-matrix.json'),'utf8'));
const manifest=JSON.parse(fs.readFileSync(path.join(ROOT,'Outputs','2026-09-29 - Release 4 Compatibility','claude-compatibility-manifest.json'),'utf8'));
const history=path.join(ROOT,'AI Projects','Claude - Cowork Agent - Build History.txt');
if(!fs.existsSync(history)) throw new Error('Claude build history missing');
const plans={
 'approval-boundary':{reuse:['AgentConstructLab/release4/certified-workspace-agent.construct.json'],claude:['Claude policy or instructions showing the approval boundary','Claude execution test proving a state-changing action obeys that boundary']},
 'bounded-filesystem':{reuse:[],claude:['Callable Claude filesystem evidence proving an allowed read/write','Negative Claude test proving an out-of-scope path is refused']},
 'governed-command':{reuse:['JobFramework/schemas/job-receipt.schema.json'],claude:['Claude run_batch_file success receipt','Claude negative test for path, argument, or extension injection']},
 'browser-read':{reuse:[],claude:['Claude browser-read operation with retained source-grounded evidence']},
 'browser-action':{reuse:[],claude:['Claude state-changing browser operation with approval and post-action verification']},
 'persistent-memory':{reuse:['Memory/Lessons/lessons.db'],claude:['Fresh Claude session retrieves a durable, pre-existing memory item']},
 'incident-learning':{reuse:['Memory/Lessons/lessons.db','Memory/Lessons/ingest-incidents.js'],claude:['Claude-originated failed operation is ingested','No automatic lesson promotion occurs']},
 'rollback':{reuse:['JobFramework/schemas/rollback-manifest.schema.json'],claude:['Claude route performs or validates a bounded rollback test']},
 'evidence-receipt':{reuse:['JobFramework/schemas/job-receipt.schema.json'],claude:['Claude material action produces a structured receipt and retained evidence']},
 'cross-skill-orchestration':{reuse:[],claude:['One Claude workflow coordinates at least two authorized capability classes and produces one evidence chain']}
};
const criteria=matrix.criteria.map(c=>{const p=plans[c.id];const reusable=p.reuse.filter(x=>fs.existsSync(path.join(ROOT,...x.split('/'))));return{id:c.id,weight:c.weight,status:'gap',reusable_evidence:reusable.map(x=>path.join(ROOT,...x.split('/'))),claude_specific_evidence_required:p.claude};});
const reusable=new Set(criteria.flatMap(x=>x.reusable_evidence));
const required=criteria.reduce((n,x)=>n+x.claude_specific_evidence_required.length,0);
const report={schema_version:'1.0.0',generated_at:new Date().toISOString(),construct_id:matrix.construct_id,target:'claude',compatibility_manifest_status:manifest.status,source_history:history,history_treatment:'context only; not certification evidence',criteria,reusable_evidence_files:reusable.size,claude_specific_evidence_items_required:required,ready_to_certify:false,next_gate:'execute Claude-specific evidence suite'};
fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'claude-evidence-gap-assessment.json'),JSON.stringify(report,null,2)+'\n');
const md=['# Claude Evidence Gap Assessment','','The compatibility contract is present, but historical conversation text is context only and does not certify current Claude behavior.','','## Summary',`- Criteria: ${criteria.length}`,`- Reusable evidence files: ${reusable.size}`,`- Claude-specific evidence items required: ${required}`,'- Ready to certify: no','','## Required Claude tests',...criteria.flatMap(x=>[`### ${x.id} (${x.weight} points)`,...x.claude_specific_evidence_required.map(y=>`- ${y}`),''])].join('\n');
fs.writeFileSync(path.join(OUT,'claude-evidence-test-plan.md'),md+'\n');
console.log('R4_CLAUDE_CRITERIA='+criteria.length);console.log('R4_CLAUDE_REUSABLE_EVIDENCE_FILES='+reusable.size);console.log('R4_CLAUDE_SPECIFIC_ITEMS_REQUIRED='+required);console.log('R4_CLAUDE_READY_TO_CERTIFY=false');console.log('R4_CLAUDE_GAP_RESULT=PASS');
