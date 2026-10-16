const {Sim:s,MISSIONS,solOps}=require("./sim.js");
function stock(){let t=0;for(let i=0;i<s.N;i++)if(!s.sea[i])t+=s.W[i]+s.S[i]+s.G[i];return t+s.st.res.V}
for(const id of ["m1","m3","m4","mb","md","mc"]){const M=MISSIONS.find(m=>m.id===id);s.st.script=M.script;s.st.meteo="none";s.generate(20261005,M.setup);
  s.resetRun();if(id==="mb"||id==="md")M.sol.apply(solOps((i,H,e)=>s.buildDam(i,H,e)));
  const s0=stock();s.runAll();const s1=stock(),P=s.st.cumP,E=s.st.cumE,Q=s.st.cumQ;
  const err=(s1-s0)-(P-E-Q);console.log(id.padEnd(3),"pluie",Math.round(P/s.st.nLand),"mm | évap",Math.round(E/s.st.nLand),"| mer",Math.round(Q/s.st.nLand),"| Δstock",Math.round((s1-s0)/s.st.nLand),"| écart de bilan",(err/s.st.nLand).toFixed(2),"mm (",(Math.abs(err)/Math.max(P,1)*100).toFixed(2),"% de la pluie )");
  for(let i=0;i<s.N;i++)if(s.res[i])s.setRes(i,0)}
