'use strict';
const path=require('path'),fs=require('fs'); const {score}=require('./score-platform-evidence');
const matrix=JSON.parse(fs.readFileSync(path.join(__dirname,'behavioral-equivalence-matrix.json'),'utf8'));
const full={construct_id:matrix.construct_id,target:'microsoft-365',results:matrix.criteria.map(c=>({criterion_id:c.id,status:'pass',evidence:['fixture/'+c.id]}))};
const tests=[];function t(id,fn){try{fn();tests.push({id,status:'pass'});}catch(e){tests.push({id,status:'fail',detail:e.message});}}
t('full-score-100',()=>{const x=score(matrix,full);if(x.score!==100||!x.certified)throw Error(JSON.stringify(x));});
t('single-required-fail-not-certified',()=>{const e=JSON.parse(JSON.stringify(full));e.results[9].status='fail';const x=score(matrix,e);if(x.score!==94||x.certified||x.required_failures!==1)throw Error(JSON.stringify(x));});
t('missing-result-rejected',()=>{const e=JSON.parse(JSON.stringify(full));e.results.pop();const x=score(matrix,e);if(!x.problems.some(p=>p.startsWith('missing '))||x.certified)throw Error(JSON.stringify(x));});
t('duplicate-rejected',()=>{const e=JSON.parse(JSON.stringify(full));e.results.push(e.results[0]);const x=score(matrix,e);if(!x.problems.some(p=>p.startsWith('duplicate '))||x.certified)throw Error(JSON.stringify(x));});
t('unknown-rejected',()=>{const e=JSON.parse(JSON.stringify(full));e.results.push({criterion_id:'unknown',status:'pass',evidence:['x']});const x=score(matrix,e);if(!x.problems.some(p=>p.startsWith('unknown '))||x.certified)throw Error(JSON.stringify(x));});
t('construct-mismatch-rejected',()=>{const e=JSON.parse(JSON.stringify(full));e.construct_id='other';if(score(matrix,e).certified)throw Error('certified');});
t('target-mismatch-rejected',()=>{const e=JSON.parse(JSON.stringify(full));e.target='gemini';if(score(matrix,e).certified)throw Error('certified');});
const f=tests.filter(x=>x.status==='fail');console.log('R4_SCORE_CASES='+tests.length);console.log('R4_SCORE_FAILED='+f.length);for(const x of f)console.log('FAIL '+x.id+': '+x.detail);console.log('R4_SCORE_RESULT='+(f.length?'FAIL':'PASS'));process.exit(f.length?1:0);
