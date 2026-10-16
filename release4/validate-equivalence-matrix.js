'use strict';
const fs=require('fs'),path=require('path');
const ROOT=process.env.COWORK_ROOT||path.resolve(__dirname,'..','..');
const DIR=path.join(ROOT,'AgentConstructLab','release4');
const COMP=path.join(ROOT,'Outputs','2026-09-29 - Release 4 Compatibility');
const m=JSON.parse(fs.readFileSync(path.join(DIR,'behavioral-equivalence-matrix.json'),'utf8'));
const checks=[]; const add=(id,ok,detail)=>checks.push({id,status:ok?'pass':'fail',detail:ok?undefined:detail});
add('target-count',m.targets.length===2,'expected 2');
add('criterion-count',m.criteria.length===10,'expected 10');
add('weight-total',m.criteria.reduce((a,c)=>a+c.weight,0)===100,'weights must total 100');
add('required-all',m.criteria.every(c=>c.required===true),'all criteria must be required');
add('minimum-score',m.minimum_score===95,'minimum must be 95');
for(const t of m.targets){const p=path.join(COMP,t+'-compatibility-manifest.json'); let x=null; try{x=JSON.parse(fs.readFileSync(p,'utf8'));}catch(e){} add(t+':manifest',!!x,'missing'); if(x){add(t+':construct',x.construct.id===m.construct_id,'construct mismatch'); add(t+':ready',x.status==='ready-for-platform-evaluation','not ready'); add(t+':shared-validation',x.validation.shared_required===true,'shared validation absent');}}
const failed=checks.filter(x=>x.status==='fail');
const out={schema_version:'1.0.0',generated_at:new Date().toISOString(),matrix:m,checks,overall:failed.length?'fail':'pass'};
const od=path.join(ROOT,'Outputs','2026-09-29 - Release 4 Equivalence'); fs.mkdirSync(od,{recursive:true}); fs.writeFileSync(path.join(od,'equivalence-matrix-validation.json'),JSON.stringify(out,null,2)+'\n');
console.log('R4_EQ_CRITERIA='+m.criteria.length); console.log('R4_EQ_WEIGHT='+m.criteria.reduce((a,c)=>a+c.weight,0)); console.log('R4_EQ_CHECKS='+checks.length); console.log('R4_EQ_FAILED='+failed.length); console.log('R4_EQ_RESULT='+(failed.length?'FAIL':'PASS')); process.exit(failed.length?1:0);
