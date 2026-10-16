const {Sim:s,MISSIONS,solOps}=require("./sim.js");const GW=s.GW;
const M=MISSIONS.find(m=>m.id==="md");s.st.script=M.script;s.st.meteo="none";
let t0=Date.now();s.generate(20261005,M.setup);const snap=s.snapshot(),cov0=s.cov.slice(),fr0=s.fr.slice(),K=62.5/1000;
s.runAll();const b=Object.assign({},s.st.m);const bh=s.st.hist.slice();console.log("référence calculée en",Date.now()-t0,"ms");
const ax=y=>s.st.axis[y];
function clear(){s.cov.set(cov0);s.fr.set(fr0);for(let i=0;i<s.N;i++){if(s.pump[i])s.setPump(i,0);if(s.res[i])s.setRes(i,0);s.soilv[i]=0}s.setOrifices([])}
const O=solOps((i,H,e)=>s.buildDam(i,H,e));
const blk=(y0,x0,n)=>{for(let y=y0;y<y0+n;y++)for(let x=x0;x<x0+n;x++)s.setRes(y*GW+x,1)};
function cost(){let c=0;for(let i=0;i<s.N;i++){if(s.sea[i])continue;if(s.cov[i]!==cov0[i])c+=s.C[s.cov[i]].cost;if(s.pump[i])c+=10;if(s.res[i])c+=20;if(s.soilv[i])c+=1;if(s.fr[i]!==fr0[i]&&s.fr[i]===1)c+=2}return c}
function run(tag,f){clear();f();const c=cost();s.st.m.lowW=s.st.m.lowW||[];let x={crops:0,crops0:0,pumps:0};for(let i=0;i<s.N;i++){if(s.cov[i]===2)x.crops++;if(cov0[i]===2)x.crops0++;x.pumps+=s.pump[i]}
  s.restore(snap);s.resetRun();const yr=[];let lastIn=0;
  while(s.st.t<M.script.days*144){s.step();if([15,55,95].includes(s.st.t/144))yr.push(Math.round((s.st.m.resIn-lastIn)*K)+"k"),lastIn=s.st.m.resIn}
  s.st.m.gEnd=s.gAvg();const m=s.st.m;
  const ok=M.obj.map(o=>o.ok(m,b,x)?"OK":"--").join(" ");
  // débit minimal par été
  const H=s.st.hist,ms=[[15,40],[55,80],[95,120]].map(w=>{let mn=1e9;for(let k=w[0]*48;k<w[1]*48&&k<H.length;k++)mn=Math.min(mn,H[k].q);return mn.toFixed(2)});
  console.log(tag.padEnd(40),"coût",String(c).padStart(3),"| stress",String(Math.round(m.stress)).padStart(5),"("+Math.round((1-m.stress/b.stress)*100)+"%)","| été/réf",m.lowW.map((v,j)=>Math.round(v/b.lowW[j]*100)+"%").join("/"),"| nappe fin",(m.gEnd*100).toFixed(1)+"%","| cultures",x.crops+"/"+x.crops0,"| rempli/an",yr.join(","),"évap",Math.round(m.resEvap*K)+"k","| récolte",(s.harvest()/s.harvest()).toFixed(0),"|",ok)}
{const H=bh,ms=[[15,40],[55,80],[95,120]].map(w=>{let mn=1e9;for(let k=w[0]*48;k<w[1]*48&&k<H.length;k++)mn=Math.min(mn,H[k].q);return mn.toFixed(2)});
 console.log("référence".padEnd(40),"stress",Math.round(b.stress),"| débit min été",ms.join("/"),"| nappe fin",Math.round(b.gEnd*100)+"%","| nappe par fin d'hiver",[15,55,95].map(d=>Math.round(H[d*48-1].g*100)+"%").join("/"))}
run("A: 45 cultures→prairie + 1 réserve + sol 300 + haies 30",()=>{O.cover(45,(i,x,y,d)=>s.cov[i]===2&&d<=2,1);O.res(12,-8,2);O.soil(300,()=>true);let n=0;O.slow((i,x,y,d)=>s.cov[i]===2&&y%3===0&&n++<30)});
run("B: 45 cultures→prairie + 1 réserve + sol 330 + haies 15",()=>{O.cover(45,(i,x,y,d)=>s.cov[i]===2&&d<=2,1);O.res(12,-8,2);O.soil(330,()=>true);let n=0;O.slow((i,x,y,d)=>s.cov[i]===2&&y%3===0&&n++<15)});
run("C: 45 cultures→prairie + 1 réserve rive droite + sol 300 + haies 30",()=>{O.cover(45,(i,x,y,d)=>s.cov[i]===2&&d<=2,1);O.res(14,7,2);O.soil(300,()=>true);let n=0;O.slow((i,x,y,d)=>s.cov[i]===2&&y%3===0&&n++<30)});
run("D: 45 cultures→ZH au bord + 1 réserve + sol 300",()=>{O.cover(45,(i,x,y,d)=>s.cov[i]===2&&d<=1,5);O.res(12,-8,2);O.soil(300,()=>true)});
run("mixte: 2 réserves + prairie 100 + sol vivant 200",()=>{O.res(8,-8,2);O.res(18,7,2);O.cover(100,i=>s.cov[i]===3,1);O.soil(200,()=>true)});
