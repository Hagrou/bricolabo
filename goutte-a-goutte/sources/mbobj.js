const {Sim:s,MISSIONS,solOps}=require("./sim.js");const K=62.5/1e6;
const M=MISSIONS.find(m=>m.id==="mb");
for(const dry of [false,true]){const sc=JSON.parse(JSON.stringify(M.script));if(dry)sc.rain=sc.rain.map(r=>r[0]<sc.fillUntil*24?[r[0],Math.round(r[1]*5)/10,r[2]]:r);
s.st.script=sc;s.st.meteo="none";s.generate(20261005,M.setup);const cov0=s.cov.slice();let crops0=0;for(let i=0;i<s.N;i++)if(s.cov[i]===2)crops0++;
const snap=s.snapshot();s.runAll();const b=Object.assign({},s.st.m);
const run=(name,ap)=>{for(let i=0;i<s.N;i++)if(s.res[i])s.setRes(i,0);s.restore(snap);s.resetRun();ap(solOps(()=>null));let n=0;for(let i=0;i<s.N;i++)n+=s.res[i];s.runAll();const m=s.st.m;
 const x={crops:crops0,crops0,pumps:0,newTown:0};
 console.log((dry?"SEC ":"NORM ")+name,"n",n,"cap",(n*s.RES_D*K).toFixed(2),"Mm³ pumped",(m.resIn*K).toFixed(2),"rechW",(m.rechW*K).toFixed(1),"base rechW",(b.rechW*K).toFixed(1),"evap",(m.resEvap*K).toFixed(2),Math.round(m.resEvap/(m.resIn+m.resRain)*100)+"%","out",(m.resOut*K).toFixed(2),"left",(s.st.res.V*K).toFixed(2),"cmax",Math.round(m.resCmax),"algae",Math.round(m.algae));
 M.obj.forEach(o=>console.log("   ",o.ok(m,b,x)?"✓":"✗",o.txt,"|",o.cur(m,b,x)));
 console.log("    stress -"+Math.round((1-m.stress/b.stress)*100)+"%");}
run("sol",M.sol.apply);
run("old16",o=>{for(const y of [8,18]){o.res(y,-8,2);o.res(y,7,2)}});
}
