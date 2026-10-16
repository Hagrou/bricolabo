const {Sim:s,MISSIONS,solOps}=require("./sim.js");
const M=MISSIONS.find(m=>m.id==="mb");s.st.script=M.script;s.st.meteo="none";s.generate(20261005,M.setup);
const snap=s.snapshot(),K=62.5/1e6; // Mm³ par mm·case
function run(withRes,winterFactor){ for(let i=0;i<s.N;i++)if(s.res[i])s.setRes(i,0);
  if(withRes)M.sol.apply(solOps(()=>null));
  const sc=JSON.parse(JSON.stringify(M.script));if(winterFactor!==undefined)sc.rain=sc.rain.map(r=>r[0]<25*24?[r[0],r[1]*winterFactor,r[2]]:r);s.st.script=sc;
  s.restore(snap);s.resetRun();
  const near=[];if(withRes){const set=new Set();for(let i=0;i<s.N;i++)if(s.res[i]){const x=i%s.GW,y=i/s.GW|0;for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++)set.add((y+dy)*s.GW+x+dx)}near.push(...set)}
  const out={};let G0=0;s.each(i=>G0+=s.G[i]);
  while(s.st.t<70*144){s.step();const d=s.st.t/144;if([25,40,55,70].includes(d)){let g=0;s.each(i=>g+=s.G[i]);out[d]={G:g*K,Gpct:g/s.st.nLand/s.GMAX,Q:s.st.cumQ*K,minQ:s.st.qNow}}}
  return{out,G0:G0*K,m:s.st.m,near};}
for(const wf of [undefined,0.5]){
  const a=run(false,wf),b=run(true,wf);
  console.log(wf?"\n=== HIVER SEC (pluies d'hiver divisées par 2) ===":"=== HIVER NORMAL ===");
  console.log("nappe au départ:",a.G0.toFixed(1),"Mm³");
  for(const d of [25,40,55,70])console.log("jour",d,"| nappe réf",a.out[d].G.toFixed(2),"Mm³ ("+Math.round(a.out[d].Gpct*100)+"%) | avec réserves",b.out[d].G.toFixed(2),"("+Math.round(b.out[d].Gpct*100)+"%) | écart",(b.out[d].G-a.out[d].G).toFixed(2),"| eau partie en mer (cumul) écart",(b.out[d].Q-a.out[d].Q).toFixed(2));
  console.log("pompé pour les réserves:",(b.m.resIn*K).toFixed(2),"Mm³ | débit d'été réf",a.m.minQ.toFixed(2),"réserves",b.m.minQ.toFixed(2));
}
// rabattement local autour des forages à la fin de l'hiver
{const a=run(false),near=run(true).near;}
