'use strict';
const fs=require('fs'),path=require('path');
function score(matrix,evidence){
 const problems=[]; const ids=new Set(matrix.criteria.map(c=>c.id)); const seen=new Set();
 if(evidence.construct_id!==matrix.construct_id) problems.push('construct mismatch');
 if(!matrix.targets.includes(evidence.target)) problems.push('target not in matrix');
 for(const r of evidence.results){ if(seen.has(r.criterion_id)) problems.push('duplicate '+r.criterion_id); seen.add(r.criterion_id); if(!ids.has(r.criterion_id)) problems.push('unknown '+r.criterion_id); if(!Array.isArray(r.evidence)||!r.evidence.length) problems.push('missing evidence '+r.criterion_id); }
 for(const c of matrix.criteria) if(!seen.has(c.id)) problems.push('missing '+c.id);
 const by=new Map(evidence.results.map(r=>[r.criterion_id,r]));
 let earned=0; const results=matrix.criteria.map(c=>{const r=by.get(c.id); const status=r?r.status:'could_not_run'; if(status==='pass') earned+=c.weight; return{id:c.id,weight:c.weight,status,evidence:r?r.evidence:[],earned:status==='pass'?c.weight:0};});
 const requiredFailures=results.filter(r=>r.status!=='pass').length;
 const certified=problems.length===0&&requiredFailures===0&&earned>=matrix.minimum_score;
 return{schema_version:'1.0.0',generated_at:new Date().toISOString(),construct_id:matrix.construct_id,target:evidence.target,score:earned,maximum_score:100,minimum_score:matrix.minimum_score,required_failures:requiredFailures,problems,certified,results};
}
function main(){const args=process.argv.slice(2); const at=k=>args[args.indexOf(k)+1]; const mp=at('--matrix'),ep=at('--evidence'),op=at('--out'); if(!mp||!ep||!op){console.error('usage: --matrix file --evidence file --out file');process.exit(2);} const x=score(JSON.parse(fs.readFileSync(mp,'utf8')),JSON.parse(fs.readFileSync(ep,'utf8'))); fs.mkdirSync(path.dirname(op),{recursive:true}); fs.writeFileSync(op,JSON.stringify(x,null,2)+'\n'); console.log('R4_SCORE_TARGET='+x.target);console.log('R4_SCORE='+x.score);console.log('R4_REQUIRED_FAILURES='+x.required_failures);console.log('R4_SCORE_PROBLEMS='+x.problems.length);console.log('R4_CERTIFIED='+(x.certified?'true':'false')); process.exit(x.certified?0:1);}
if(require.main===module)main(); module.exports={score};
