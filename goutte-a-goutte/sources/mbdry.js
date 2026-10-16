const {Sim:s,MISSIONS,solOps}=require("./sim.js");const K=62.5/1000;
const M=MISSIONS.find(m=>m.id==="mb");
for(const dry of [false,true]){const sc=JSON.parse(JSON.stringify(M.script));if(dry)sc.rain=sc.rain.map(r=>r[0]<sc.fillUntil*24?[r[0],Math.round(r[1]*5)/10,r[2]]:r);
  s.st.script=sc;s.st.meteo="none";s.generate(20261005,M.setup);const snap=s.snapshot();s.runAll();const b=Object.assign({},s.st.m),bh=s.st.hist.slice();
  s.restore(snap);s.resetRun();M.sol.apply(solOps(()=>null));s.runAll();const m=s.st.m,h=s.st.hist,k=sc.fillUntil*48-1;
  const dO=bh[k].o-h[k].o,dG=(bh[k].g-h[k].g)*s.GMAX*s.st.nLand;
  console.log(dry?"HIVER SEC   ":"HIVER NORMAL","| pompé",Math.round(m.resIn*K),"k m³ | remplissage autorisé",Math.round(m.fillOk/Math.max(1,m.fillSteps)*100)+"% du temps","| stress",Math.round((1-m.stress/b.stress)*100)+"%","| débit été",(m.minQ/b.minQ*100).toFixed(0)+"%","| hiver",(m.qWin/m.nWin/(b.qWin/b.nWin)*100-100).toFixed(0)+"%","| origine: rivière",Math.round(dO/(dO+dG)*100)+"%, nappe",Math.round(dG/(dO+dG)*100)+"%","| nappe fin hiver",Math.round(h[k].g*100)+"% vs réf",Math.round(bh[k].g*100)+"%");
  for(let i=0;i<s.N;i++)if(s.res[i])s.setRes(i,0)}
