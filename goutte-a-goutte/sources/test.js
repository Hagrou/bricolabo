const {Sim:s,MISSIONS}=require("./sim.js");
const SEED=20261005, GW=s.GW, GH=s.GH;
function load(m){s.st.script=m.script;s.st.meteo="none";s.generate(SEED,m.setup);return{snap:s.snapshot(),cov0:s.cov.slice(),h0:s.h.slice(),fr0:s.fr.slice()}}
function run(m,ctx){s.restore(ctx.snap);s.resetRun();s.runAll();return Object.assign({},s.st.m)}
function cost(ctx){let c=0;for(let i=0;i<s.N;i++){if(s.sea[i])continue;if(s.cov[i]!==ctx.cov0[i])c+=s.C[s.cov[i]].cost;const d=(s.h[i]-ctx.h0[i])/2;c+=d>0?d*s.COST_UP:-d*s.COST_DOWN;if(s.pump[i])c+=s.COST_PUMP;if(s.fr[i]!==ctx.fr0[i])c+=s.fr[i]===1?s.COST_SLOW:s.fr[i]===0?s.COST_UNFAST:0}return c}
function show(tag,m,b,M,ctx){const x={newTown:0,crops:0,crops0:0,pumps:s.pump.reduce((a,v)=>a+v,0)};for(let i=0;i<s.N;i++){if(s.sea[i])continue;if(s.cov[i]===4&&ctx.cov0[i]!==4)x.newTown++;if(s.cov[i]===2)x.crops++;if(ctx.cov0[i]===2)x.crops0++}
  console.log("  "+tag.padEnd(34),"coût",String(Math.round(cost(ctx))).padStart(4),"| infil",Math.round(m.infl/s.st.nLand),"récolte",(m.harvest/b.harvest*100).toFixed(1)+"%","pic",m.peak.toFixed(1),"@h"+(m.peakT/6).toFixed(1),"t50 h"+(m.t50/6).toFixed(1),"minQ",m.minQ.toFixed(3),"flood",m.floodMax,"stress",Math.round(m.stress),"pol",Math.round(m.polOut*62.5e-6),"cMax",Math.round(m.cMax),"cH",m.cHours,"pluie",Math.round(m.rain),m.rains,"ET",Math.round(m.et),"evapOpen",Math.round(m.evapOpen),"pump",Math.round(m.pumpW),Math.round(m.pumpG),"|",M.obj.map(o=>o.ok(m,b,x)?"OK":"--").join(" "))}
function reset(ctx){s.fr.set(ctx.fr0);s.cov.set(ctx.cov0);s.h.set(ctx.h0);for(let i=0;i<s.N;i++)if(s.pump[i])s.setPump(i,0)}
const ax=y=>s.st.axis[y];
const pick=(n,f,srt)=>{const o=[];s.each((i,x,y,d)=>{if(f(i,x,y,d))o.push(i)});if(srt)o.sort(srt);return o.slice(0,n)};
const dam=(y,k,H,gap)=>{for(let x=0;x<GW;x++){const i=y*GW+x;if(s.dist[i]<=k&&!(gap&&s.dist[i]===0))s.h[i]+=H}};
const pumpsAt=(ys,ds)=>{for(const y of ys)for(const dd of ds){const x=ax(y)+dd;if(x>=0&&x<GW)s.setPump(y*GW+x,1)}};
const slow=f=>s.each((i,x,y,d)=>{if(s.cov[i]!==4&&f(i,x,y,d))s.fr[i]=1});
const cv=(n,f,c,srt)=>pick(n,f,srt).forEach(i=>s.cov[i]=c);
const bdam=(y,H)=>{const p=s.damPlan(y*GW+ax(y),H);for(const j of p.line)s.h[j]=Math.max(s.h[j],p.crest);return p};
const strategies={
 mq:{ 'EXPLOIT ville d=1 (gratuit)':()=>cv(999,(i,x,y,d)=>d===1&&s.cov[i]===2,4),
      'EXPLOIT sol nu d=1':()=>cv(999,(i,x,y,d)=>d===1&&s.cov[i]===2,3),
      'EXPLOIT digue pleine y=17':()=>dam(17,5,6,false),
      'prairie d=1':()=>cv(999,(i,x,y,d)=>d===1&&s.cov[i]===2,1),
      'prairie d<=2':()=>cv(999,(i,x,y,d)=>d>=1&&d<=2&&s.cov[i]===2,1),
      'zone humide d=1':()=>cv(999,(i,x,y,d)=>d===1&&s.cov[i]===2,5),
      'haies d<=2':()=>slow((i,x,y,d)=>d>=1&&d<=2),
      'haies d=1 + prairie d=1':()=>{cv(999,(i,x,y,d)=>d===1&&s.cov[i]===2,1);slow((i,x,y,d)=>d===1)},
      'ZH d=1 amont captage seulement':()=>cv(999,(i,x,y,d)=>d===1&&y<=17&&s.cov[i]===2,5),
      'prairie 85 au hasard dans la plaine':()=>cv(85,(i,x,y,d)=>d>=5&&s.cov[i]===2,1),
      'haies 130 loin de la rivière':()=>{let n=0;slow((i,x,y,d)=>d>=6&&s.cov[i]===2&&n++<130)},
      'forêt d=1':()=>cv(999,(i,x,y,d)=>d===1&&s.cov[i]===2,0) },
 mc:{ 'forêt 200 sur sol nu':()=>cv(200,i=>s.cov[i]===3,0),
      'prairie 600 sur sol nu':()=>cv(600,i=>s.cov[i]===3,1),
      'zone humide 200':()=>cv(200,i=>s.cov[i]===3,5),
      'prairie 300':()=>cv(300,i=>s.cov[i]===3,1),
      'forêt 100 + prairie 300':()=>{cv(100,i=>s.cov[i]===3,0);cv(300,i=>s.cov[i]===3,1)} },
 mv:{ 'rivière entière':()=>slow((i,x,y,d)=>d===0),
      'rivière amont y<15':()=>slow((i,x,y,d)=>d===0&&y<15),
      'rivière amont y<15 + plaine amont':()=>{slow((i,x,y,d)=>d===0&&y<15);let n=0;slow((i,x,y,d)=>s.fr[i]===2&&d>0&&y<15&&n++<110)},
      'haies 150 cases de plaine':()=>{let n=0;slow((i,x,y,d)=>s.fr[i]===2&&d>0&&n++<150)},
      'haies au bord de la rivière d<=3':()=>slow((i,x,y,d)=>d>0&&d<=3),
      'rivière amont + bords d<=4 amont':()=>slow((i,x,y,d)=>y<16&&d<=4),
      'bords d<=2 + rivière amont':()=>slow((i,x,y,d)=>(d>0&&d<=2)||(d===0&&y<15)),
      'bords d<=2 seuls':()=>slow((i,x,y,d)=>d>0&&d<=2),
      'bande d 2..4':()=>slow((i,x,y,d)=>d>=2&&d<=4),
      'bords d<=3 moitié amont':()=>slow((i,x,y,d)=>d>0&&d<=3&&y<14),
      'bords d<=3 moitié aval':()=>slow((i,x,y,d)=>d>0&&d<=3&&y>=14),
      'plaine en damier 150':()=>{let n=0;slow((i,x,y,d)=>s.fr[i]===2&&d>0&&(x+y)%2===0&&n++<150)},
      'forêt d=1 (tout outil)':()=>cv(999,(i,x,y,d)=>d===1,0),
      'zone humide d=1 hors cultures':()=>cv(999,(i,x,y,d)=>d===1&&s.cov[i]!==2&&s.cov[i]!==4,5),
      'digue y=15 4 m':()=>dam(15,4,4,false),
      'haies partout sur les cultures':()=>slow((i,x,y,d)=>s.cov[i]===2),
      'haies une rangée sur trois':()=>slow((i,x,y,d)=>s.cov[i]===2&&y%3===0),
      'rivière aval seulement y>=15':()=>slow((i,x,y,d)=>d===0&&y>=15) },
 m1:{ 'BARRAGE clic y=15 4 m':()=>bdam(15,4),
      'digue y=15 seule':()=>dam(15,5,6,false),
      'EXPLOIT creuser 150 cases':()=>pick(150,(i,x,y,d)=>d>=1&&d<=3).forEach(i=>s.h[i]-=2),
      "forêt bas de versant (230)":()=>pick(230,i=>s.cov[i]===3,(a,b)=>s.h[a]-s.h[b]).forEach(i=>s.cov[i]=0),
      "forêt en haut (230)":()=>pick(230,i=>s.cov[i]===3,(a,b)=>s.h[b]-s.h[a]).forEach(i=>s.cov[i]=0),
      "prairie 700":()=>pick(700,i=>s.cov[i]===3).forEach(i=>s.cov[i]=1),
      "prairie 350":()=>pick(350,i=>s.cov[i]===3).forEach(i=>s.cov[i]=1) },
 m2:{ "ville au bord de l'eau":()=>pick(60,(i,x,y,d)=>d>=1&&d<=3&&y>3&&y<16&&s.cov[i]!==4).forEach(i=>s.cov[i]=4),
      "ville sur versant":()=>pick(60,(i,x,y,d)=>d>=7&&d<=11&&y>6&&s.cov[i]!==4).forEach(i=>s.cov[i]=4),
      "versant + 85 forêt":()=>{pick(60,(i,x,y,d)=>d>=7&&d<=11&&y>6&&s.cov[i]!==4).forEach(i=>s.cov[i]=4);pick(85,i=>s.cov[i]===2||s.cov[i]===3).forEach(i=>s.cov[i]=0)},
      "versant + 260 prairie":()=>{pick(60,(i,x,y,d)=>d>=7&&d<=11&&y>6&&s.cov[i]!==4).forEach(i=>s.cov[i]=4);pick(260,i=>s.cov[i]===2||s.cov[i]===3).forEach(i=>s.cov[i]=1)},
      "versant + 60 bassins -2m":()=>{pick(60,(i,x,y,d)=>d>=7&&d<=11&&y>6&&s.cov[i]!==4).forEach(i=>s.cov[i]=4);pick(60,(i,x,y,d)=>d>=4&&d<=6&&y>6&&s.cov[i]!==4).forEach(i=>s.h[i]-=2)} },
 m3:{ 'BARRAGE clic y=15 4 m':()=>bdam(15,4),
      'BARRAGE clic y=15 6 m':()=>bdam(15,6),
      'BARRAGE clic y=12 6 m':()=>bdam(12,6),
      'BARRAGE clic y=8 4 m':()=>bdam(8,4),
      "100 forêt":()=>pick(100,i=>s.cov[i]===2||s.cov[i]===3).forEach(i=>s.cov[i]=0),
      "320 prairie sur cultures":()=>pick(320,i=>s.cov[i]===2||s.cov[i]===3).forEach(i=>s.cov[i]=1),
      "digue y=15 k=4 H=4":()=>dam(15,4,4,false),
      "digue y=15 k=5 H=6":()=>dam(15,5,6,false),
      "digue y=12 k=5 H=6":()=>dam(12,5,6,false),
      "digues y=8 et y=15 k=4 H=4":()=>{dam(8,4,4,false);dam(15,4,4,false)},
      "digue y=15 H=4 + 40 forêt":()=>{dam(15,4,4,false);pick(40,i=>s.cov[i]===2||s.cov[i]===3).forEach(i=>s.cov[i]=0)},
      "digue le long de la ville":()=>{s.each((i,x,y,d)=>{if(d===1&&y>=16&&y<=23&&s.cov[i]!==4)s.h[i]+=2})} },
 m4:{ "forêt 150":()=>pick(150,i=>s.cov[i]===3).forEach(i=>s.cov[i]=0),
      "prairie 450":()=>pick(450,i=>s.cov[i]===3).forEach(i=>s.cov[i]=1),
      "prairie 450 par le bas":()=>pick(450,i=>s.cov[i]===3,(a,b)=>s.h[a]-s.h[b]).forEach(i=>s.cov[i]=1),
      "prairie 250":()=>pick(250,i=>s.cov[i]===3).forEach(i=>s.cov[i]=1),
      "2 digues seules":()=>{dam(5,4,4,false);dam(10,4,4,false)},
      "bassins 100 cases -2m":()=>pick(100,(i,x,y,d)=>s.cov[i]===3&&d>3&&d<9).forEach(i=>s.h[i]-=2) },
 m5:{ "8 pompes rivière":()=>pumpsAt([4,7,10,13,16,19,22,25],[0]),
      "16 pompes nappe d=4":()=>pumpsAt([4,7,10,13,16,19,22,25],[-4,4]),
      "16 pompes nappe d=8":()=>pumpsAt([4,7,10,13,16,19,22,25],[-8,8]),
      "22 pompes nappe d=8":()=>pumpsAt([3,5,7,9,11,13,15,17,19,21,23],[-8,8]),
      "10 pompes nappe d=10":()=>pumpsAt([4,9,14,19,24],[-10,10]),
      "retenue y=8 + 2 dessus + 6 nappe":()=>{dam(8,4,4,false);pumpsAt([7,6],[0]);pumpsAt([12,18,24],[-5,5])},
      "retenue y=14 + 4 dessus + 6 nappe d=9":()=>{dam(14,4,4,false);pumpsAt([13,12],[-1,1]);pumpsAt([6,18,24],[-9,9])},
      "2 retenues + 6 pompes dessus":()=>{dam(8,4,4,false);dam(16,4,4,false);pumpsAt([7,6,5],[0]);pumpsAt([15,14,13],[0])},
      "8 pompes d=8 seulement":()=>pumpsAt([6,12,18,24],[-8,8]) },
 m6:{ 'BARRAGE y=15 4 m + prairie 200 + 12 pompes d=8':()=>{bdam(15,4);pick(200,i=>s.cov[i]===3).forEach(i=>s.cov[i]=1);pumpsAt([4,8,12,16,20,24],[-8,8])},
      "prairie 250 + 12 pompes d=7":()=>{pick(250,i=>s.cov[i]===3).forEach(i=>s.cov[i]=1);pumpsAt([4,8,12,16,20,24],[-7,7])},
      "digue y=15 H=4 + prairie 200 + 12 pompes d=8":()=>{dam(15,4,4,false);pick(200,i=>s.cov[i]===3).forEach(i=>s.cov[i]=1);pumpsAt([4,8,12,16,20,24],[-8,8])},
      "digue y=15 H=6 k=5 + prairie 150 + 10 pompes":()=>{dam(15,5,6,false);pick(150,i=>s.cov[i]===3).forEach(i=>s.cov[i]=1);pumpsAt([4,8,12,20,24],[-8,8])},
      "digue ville + prairie 250 + 12 pompes d=8":()=>{s.each((i,x,y,d)=>{if(d===1&&y>=16&&y<=23&&s.cov[i]!==4)s.h[i]+=2});pick(250,i=>s.cov[i]===3).forEach(i=>s.cov[i]=1);pumpsAt([4,8,12,16,20,24],[-8,8])},
      "digue y=15 + 100 cultures→prairie + 10 pompes":()=>{dam(15,4,4,false);pick(100,i=>s.cov[i]===2).forEach(i=>s.cov[i]=1);pick(150,i=>s.cov[i]===3).forEach(i=>s.cov[i]=1);pumpsAt([4,8,12,20,24],[-8,8])} }
};
const only=process.argv[2];
for(const M of MISSIONS){ if(only&&M.id!==only)continue;
  const t0=Date.now(),ctx=load(M),b=run(M,ctx);
  let cnt=[0,0,0,0,0,0];s.each(i=>cnt[s.cov[i]]++);
  console.log(M.id,M.name,"— occupation",cnt.join("/"),"("+(Date.now()-t0)+" ms)");
  show("référence",b,b,M,ctx);
  for(const k in strategies[M.id]||{}){reset(ctx);strategies[M.id][k]();show(k,run(M,ctx),b,M,ctx)}
  reset(ctx);
}
