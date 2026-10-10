const {Sim:s,MISSIONS}=require("./sim.js");const GW=s.GW;
const M=MISSIONS.find(m=>m.id==="mb");s.st.script=M.script;s.st.meteo="none";s.generate(20261005,M.setup);
const snap=s.snapshot(),cov0=s.cov.slice();const ax=y=>s.st.axis[y];
function run(tag,f){s.cov.set(cov0);for(let i=0;i<s.N;i++){if(s.pump[i])s.setPump(i,0);if(s.res[i])s.setRes(i,0)}f();s.restore(snap);s.resetRun();
  let qW=0,nW=0,gS=0;
  while(s.st.t<M.script.days*144){s.step();if(s.st.t===25*144){let g=0;s.each(i=>g+=s.G[i]);gS=g/s.st.nLand/s.GMAX}}
  const m=s.st.m,R=s.st.res,K=62.5/1000;   // milliers de m³
  console.log(tag.padEnd(36),"stress",String(Math.round(m.stress)).padStart(5),"| débit été",m.minQ.toFixed(2),"| débit hiver moyen",(m.qWin/m.nWin).toFixed(2),"| nappe fin hiver",Math.round(gS*100)+"%",
    "| réserve: pompé",Math.round(m.resIn*K),"pluie",Math.round(m.resRain*K),"évaporé",Math.round(m.resEvap*K),"irrigué",Math.round(m.resOut*K),"reste",Math.round(R.V*K),"k m³ | C",(R.V>1?R.M/R.V:m.resCmax).toFixed(1),"max",m.resCmax.toFixed(1),"| algues",m.algae.toFixed(0)+" j","| pompes nappe",Math.round(m.pumpG*K));return m}
const blk=(y0,x0,n)=>{for(let y=y0;y<y0+n;y++)for(let x=x0;x<x0+n;x++)s.setRes(y*GW+x,1)};
run("référence",()=>{});
run("8 pompes d'été en nappe (d=8)",()=>{for(const y of [6,12,18,24])for(const d of [-8,8])s.setPump(y*GW+ax(y)+d,1)});
run("prairie sur 60 cases de sol nu + 6 pompes d=8",()=>{let n=0;s.each(i=>{if(s.cov[i]===3&&n<60){s.cov[i]=1;n++}});for(const y of [8,16,24])for(const d of [-8,8])s.setPump(y*GW+ax(y)+d,1)});
run("réserve 2×2 (25 ha) rive gauche",()=>blk(12,ax(12)-8,2));
run("réserve 3×3 (56 ha) rive gauche",()=>blk(12,ax(12)-9,3));
run("2 réserves 2×2, une par rive",()=>{blk(12,ax(12)-8,2);blk(16,ax(16)+7,2)});
run("réserve 4×4 (100 ha) rive gauche",()=>blk(11,ax(11)-10,4));
run("4 réserves 2×2",()=>{blk(8,ax(8)-8,2);blk(8,ax(8)+7,2);blk(18,ax(18)-8,2);blk(18,ax(18)+7,2)});
