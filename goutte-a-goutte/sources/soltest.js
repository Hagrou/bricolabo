const {Sim:s,MISSIONS,solOps}=require("./sim.js");
for(const M of MISSIONS){ s.st.script=M.script;s.st.meteo="none";s.generate(20261005,M.setup);
  const snap=s.snapshot(),cov0=s.cov.slice(),h0=s.h.slice(),fr0=s.fr.slice();
  s.runAll();const b=Object.assign({},s.st.m);
  s.restore(snap);s.resetRun();let ecr=0;
  M.sol.apply(solOps((i,H,e)=>{const p=s.buildDam(i,H,e);if(e&&p)ecr++;return p}));
  let c=0,x={newTown:0,crops:0,crops0:0,pumps:0};
  for(let i=0;i<s.N;i++){if(s.sea[i])continue;if(s.cov[i]!==cov0[i]){c+=s.C[s.cov[i]].cost;if(s.cov[i]===4)x.newTown++}
    const d=(s.h[i]-h0[i])/2;c+=d>0?d*s.COST_UP:-d*s.COST_DOWN;if(s.pump[i]){c+=s.COST_PUMP;x.pumps++}
    if(s.fr[i]!==fr0[i])c+=s.fr[i]===1?s.COST_SLOW:s.fr[i]===0?s.COST_UNFAST:0;if(s.cov[i]===2)x.crops++;if(cov0[i]===2)x.crops0++;if(s.res[i])c+=s.COST_RES}
  c+=ecr*10; s.restore(snap);s.resetRun();s.runAll();const m=s.st.m;
  const res=M.obj.map(o=>o.ok(m,b,x));
  console.log((res.every(Boolean)&&c<=M.budget?"RÉUSSIT":"ÉCHOUE ").padEnd(8),M.id.padEnd(3),M.name.padEnd(30),"coût",Math.round(c),"/",M.budget,"|",M.obj.map((o,k)=>(res[k]?"✓ ":"✗ ")+o.cur(m,b,x)).join(" ; "));
  s.setOrifices([]);for(let i=0;i<s.N;i++)if(s.res[i])s.setRes(i,0);
}
