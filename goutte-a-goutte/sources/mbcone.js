const {Sim:s,MISSIONS,solOps}=require("./sim.js");const K=62.5/1e6;
const M=MISSIONS.find(m=>m.id==="mb");
function setup(dry){const sc=JSON.parse(JSON.stringify(M.script));if(dry)sc.rain=sc.rain.map(r=>r[0]<sc.fillUntil*24?[r[0],r[1]/2,r[2]]:r);s.st.script=sc;s.st.meteo="none";s.generate(20261005,M.setup);
 const snap=s.snapshot();s.runAll();return{snap,b:Object.assign({},s.st.m)}}
function trial(ctx,apply){for(let i=0;i<s.N;i++)if(s.res[i])s.setRes(i,0);s.restore(ctx.snap);s.resetRun();apply(solOps(()=>null),s);s.runAll();const m=s.st.m,b=ctx.b,c=s.cone(b.Gfill,m.Gfill);let n=0;for(let i=0;i<s.N;i++)n+=s.res[i];
 return {n,stress:Math.round((1-m.stress/b.stress)*100),low:Math.round(m.minQ/b.minQ*100),cone:c.avg.toFixed(2)+"/"+c.max.toFixed(2),pumped:(m.resIn*K).toFixed(2),rech:(m.rechW*K).toFixed(2),rechB:(b.rechW*K).toFixed(2),evap:Math.round(m.resEvap/(m.resIn+m.resRain)*100),harv:Math.round(m.harvest/b.harvest*100)}}
const L={
 sol:o=>{for(const y of [8,18]){o.res(y,-8,2);o.res(y,7,2)}},
 spread16:(o,S)=>{for(const y of [4,9,14,19]){for(const dx of [-10,-6,6,10]){o.res(y,dx,1)}}},
 spread16b:(o,S)=>{for(const y of [3,8,13,18]){for(const dx of [-11,-6,6,11]){o.res(y,dx,1)}}},
 spread12:(o,S)=>{for(const y of [4,10,16]){for(const dx of [-10,-6,6,10]){o.res(y,dx,1)}}},
 spread16c:(o,S)=>{for(const y of [5,10,15,20]){for(const dx of [-9,-5,5,9]){o.res(y,dx,1)}}},
};
for(const dry of [false,true]){const ctx=setup(dry);console.log(dry?"SEC":"NORMAL","base stress",Math.round(ctx.b.stress),"minQ",ctx.b.minQ.toFixed(2));
 for(const k in L)console.log(k,JSON.stringify(trial(ctx,L[k])));}
