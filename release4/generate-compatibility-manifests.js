'use strict';
const fs=require('fs'); const path=require('path'); const crypto=require('crypto');
const ROOT=process.env.COWORK_ROOT||path.resolve(__dirname,'..','..');
const DIR=path.join(ROOT,'AgentConstructLab','release4');
const OUT=path.join(ROOT,'Outputs','2026-09-29 - Release 4 Compatibility');
const construct=JSON.parse(fs.readFileSync(path.join(DIR,'certified-workspace-agent.construct.json'),'utf8'));
const registry=JSON.parse(fs.readFileSync(path.join(ROOT,'Outputs','2026-09-29 - Release 4 Baseline','component-registry.json'),'utf8'));
const index=new Map(registry.components.map(x=>[x.id,x]));
const missing=construct.components.filter(x=>!index.has(x));
if(missing.length) throw new Error('missing registry components: '+missing.join(','));
fs.mkdirSync(OUT,{recursive:true});
const targets=['microsoft-365','claude'];
const manifests=[];
for(const target of targets){
 const adapter=JSON.parse(fs.readFileSync(path.join(DIR,target+'.adapter.json'),'utf8'));
 const manifest={schema_version:'1.0.0',generated_at:new Date().toISOString(),construct:{id:construct.id,name:construct.name,sha256:sha(path.join(DIR,'certified-workspace-agent.construct.json'))},target,adapter:{id:adapter.id,sha256:sha(path.join(DIR,target+'.adapter.json'))},capabilities:construct.capabilities,components:construct.components.map(id=>{const c=index.get(id);return{id,path:c.path,sha256:c.sha256};}),tool_mapping:adapter.tool_mapping,outputs:adapter.outputs,host_specific:adapter.host_specific,validation:adapter.validation,status:'ready-for-platform-evaluation'};
 const p=path.join(OUT,target+'-compatibility-manifest.json'); fs.writeFileSync(p,JSON.stringify(manifest,null,2)+'\n');
 manifests.push({target,path:p,component_count:manifest.components.length,status:manifest.status});
}
const receipt={schema_version:'1.0.0',generated_at:new Date().toISOString(),construct_id:construct.id,registry_component_count:registry.summary.total,resolved_component_count:construct.components.length,missing_component_count:missing.length,manifests,overall:'pass'};
fs.writeFileSync(path.join(OUT,'compatibility-generation-receipt.json'),JSON.stringify(receipt,null,2)+'\n');
console.log('R4_CONSTRUCT='+construct.id); console.log('R4_REGISTRY_COMPONENTS='+registry.summary.total); console.log('R4_RESOLVED_COMPONENTS='+construct.components.length); console.log('R4_MISSING_COMPONENTS='+missing.length); console.log('R4_COMPATIBILITY_MANIFESTS='+manifests.length); console.log('R4_COMPAT_RESULT=PASS');
function sha(p){return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');}
