"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const {score} = require("../../release4/score-platform-evidence");
const matrix = JSON.parse(fs.readFileSync(path.join(__dirname,"../../release4/behavioral-equivalence-matrix.json"),"utf8"));
const full = {construct_id:matrix.construct_id,target:"microsoft-365",results:matrix.criteria.map(c=>({criterion_id:c.id,status:"pass",evidence:["synthetic-example/"+c.id]}))};
function copy(){return JSON.parse(JSON.stringify(full));}
function test(name,fn){fn();console.log("PASS "+name);}
test("complete fictional fixture accepted",()=>assert.strictEqual(score(matrix,full).certified,true));
test("required failure blocks certification",()=>{const e=copy();const i=matrix.criteria.findIndex(c=>c.required);assert(i>=0);e.results[i].status="fail";assert.strictEqual(score(matrix,e).certified,false);});
test("missing criterion blocks certification",()=>{const e=copy();e.results.pop();assert.strictEqual(score(matrix,e).certified,false);});
test("duplicate criterion blocks certification",()=>{const e=copy();e.results.push(e.results[0]);assert.strictEqual(score(matrix,e).certified,false);});
test("wrong target blocks certification",()=>{const e=copy();e.target="gemini";assert.strictEqual(score(matrix,e).certified,false);});
console.log("SYNTHETIC ONLY: scorer behavior, not live platform certification.");
