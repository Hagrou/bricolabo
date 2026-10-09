const Sim=(function(){
"use strict";
const GW=44, GH=30, N=GW*GH, DT=1/6, GMAX=600, DAQ=15, KG=0.8, NSUB=4, NRIV=0.04, GRIV=0.88*GMAX, DX=250, QK=DX*DX/1000/600, FLOOD=150;
// inf : infiltration max (mm/h) · cap : réserve du sol (mm) · n : rugosité de Manning · kc : transpiration · cost : crédits par case
const C=[
 {name:"Forêt",inf:40,cap:200,n:0.40,kc:1.0,cost:3,col:[72,122,86],txt:"L'humus et les racines font une éponge : la pluie s'infiltre vite et la litière freine le ruissellement. En échange, les arbres puisent beaucoup d'eau dans le sol pour transpirer."},
 {name:"Prairie",inf:25,cap:150,n:0.15,kc:0.8,cost:1,col:[150,178,104],txt:"Un sol couvert toute l'année : bonne infiltration, écoulement ralenti par l'herbe, transpiration modérée."},
 {name:"Cultures",inf:12,cap:130,n:0.08,kc:0.9,cost:1,col:[214,190,110],txt:"Sol travaillé, souvent tassé : il absorbe moins vite et l'eau file entre les rangs. Les cultures souffrent dès que la réserve du sol tombe sous un quart."},
 {name:"Sol nu",inf:4,cap:100,n:0.04,kc:0.3,cost:0,col:[186,150,112],txt:"Les gouttes forment une croûte en surface : très peu d'infiltration, ruissellement rapide."},
 {name:"Ville",inf:1,cap:30,n:0.015,kc:0.1,cost:0,col:[170,168,172],txt:"Surfaces imperméables : presque toute la pluie ruisselle, et vite. La crue arrive plus tôt et plus haut, la nappe n'est plus rechargée."},
 {name:"Zone humide",inf:15,cap:250,n:0.50,kc:1.1,cost:3,col:[96,146,132],txt:"Une végétation dense qui étale et retient l'eau. Elle stocke la crue et la rend lentement, au prix d'une forte évaporation."}
];
// qualité : SRC = charge du ruissellement produit par chaque occupation (indice, en mg/L) · TRAP = part retenue à chaque pas par la végétation
const SRC=[2,5,100,60,40,0], TRAP=[0.03,0.03,0,0,0,0.08], SEUIL=50, ATH=30, SEAK=0.3, REC=0.5;   // REC : part de l'évaporation des terres qui retombe sur place, le reste part avec le vent
const COST_UP=5, COST_DOWN=4, COST_PUMP=10, COST_SLOW=2, COST_UNFAST=1;
// fr : 0 rien · 1 frein (haies, méandres) · 2 accélérateur (fossés, lit rectifié)
function nOf(i){const riv=dist[i]===0,b=riv?NRIV:C[cov[i]].n;return fr[i]===1?(riv?0.12:Math.max(b,0.35)):fr[i]===2?(riv?0.02:Math.min(b,0.03)):b}
const h=new Float32Array(N), W=new Float32Array(N), S=new Float32Array(N), G=new Float32Array(N),
      dW=new Float32Array(N), dG=new Float32Array(N), cropFl=new Float32Array(N), cropDry=new Float32Array(N), L=new Float32Array(N), dL=new Float32Array(N), V=new Float32Array(N),
      cov=new Uint8Array(N), sea=new Uint8Array(N), pump=new Uint8Array(N), fr=new Uint8Array(N), rough=new Float32Array(N), dist=new Float32Array(N), side=new Int8Array(N);
let pumps=[], oris=[];
const QORI=30*600/(DX*DX/1000);   // pertuis d'un barrage écrêteur : 30 m³/s quand la retenue est pleine
const st={t:0,rain:{left:0,int:0},etpDay:3,meteo:"temp",script:null,nLand:1,axis:[],noise:null,
  A:20,loop:false,cumSea:0,cap:0,cumP:0,cumE:0,cumQ:0,qAcc:0,qNow:0,lastPeak:0,prevPeak:0,hist:[],m:null};
function resetMetrics(){st.m={infl:0,polOut:0,cMax:0,cHours:0,cNow:0,rains:0,rain:0,peakT:0,peak:0,minQ:1e9,floodMax:0,floodH:0,stress:0,evapOpen:0,pumpG:0,pumpW:0,floodNow:0,dryNow:0}}
resetMetrics();
function rng(seed){let s=seed>>>0;return()=>{s=(s+0x6D2B79F5)>>>0;let r=Math.imul(s^s>>>15,1|s);r=(r+Math.imul(r^r>>>7,61|r))^r;return((r^r>>>14)>>>0)/4294967296}}
function each(fn){for(let y=0;y<GH-2;y++)for(let x=0;x<GW;x++)fn(y*GW+x,x,y,dist[y*GW+x])}
function inTown(x,y){const i=y*GW+x;return y>=GH-13&&y<=GH-8&&side[i]>0&&dist[i]>=1&&dist[i]<=4}

function generate(seed,setup){
  const R=rng(seed);
  const mk=(sz)=>{const w=Math.ceil(GW/sz)+2,hh=Math.ceil(GH/sz)+2,a=[];for(let i=0;i<w*hh;i++)a.push(R());
    return(x,y)=>{const fx=x/sz,fy=y/sz,x0=fx|0,y0=fy|0;let u=fx-x0,v=fy-y0;u=u*u*(3-2*u);v=v*v*(3-2*v);
      const g=(i,j)=>a[j*w+i];return g(x0,y0)*(1-u)*(1-v)+g(x0+1,y0)*u*(1-v)+g(x0,y0+1)*(1-u)*v+g(x0+1,y0+1)*u*v}};
  const n1=mk(9),n2=mk(4),n3=mk(6),ph=R()*6,amp=3+R()*2;
  st.noise=n3; st.axis=[]; for(let y=0;y<GH;y++)st.axis.push(Math.round(GW/2+Math.sin(y*0.18+ph)*amp));
  st.nLand=0; st.cap=(GH-13)*GW+st.axis[GH-13];
  for(let y=0;y<GH;y++)for(let x=0;x<GW;x++){const i=y*GW+x; pump[i]=0; fr[i]=0;
    if(y>=GH-2){sea[i]=1;h[i]=-1;cov[i]=0;continue}
    sea[i]=0;st.nLand++;oris=[];
    // lit de la rivière : un chemin continu de case en case, au creux d'un fond de vallée en V très ouvert
    const a0=st.axis[y],a1=st.axis[Math.min(y+1,GH-3)],lo=Math.min(a0,a1),hi=Math.max(a0,a1);
    const d=x<lo?lo-x:x>hi?x-hi:0; dist[i]=d; side[i]=x<lo?-1:x>hi?1:0;
    const cs=d<=3?0.5*d:1.5+Math.pow((d-3)/GW,1.2)*100, nz=Math.min(1,Math.max(0,d-4)/6);
    let z=1+(GH-3-y)/(GH-3)*14+cs+((n1(x,y)-.5)*12+(n2(x,y)-.5)*3)*nz;
    h[i]=Math.max(0.5,z);
  }
  pumps=[];
  // comblement des cuvettes pour que les rivières atteignent la mer
  const F=new Float32Array(N);for(let i=0;i<N;i++)F[i]=sea[i]?h[i]:1e9;
  for(let ch=true,it=0;ch&&it<400;it++){ch=false;
    for(let y=0;y<GH;y++)for(let x=0;x<GW;x++){const i=y*GW+x;if(sea[i]||F[i]<=h[i])continue;
      const nb=[x>0?i-1:-1,x<GW-1?i+1:-1,y>0?i-GW:-1,y<GH-1?i+GW:-1];
      for(const j of nb){if(j<0)continue;const v=F[j]+0.03;
        if(h[i]>=v){F[i]=h[i];ch=true;break}
        if(F[i]>v){F[i]=v;ch=true}}}}
  for(let i=0;i<N;i++)if(!sea[i])h[i]=F[i];
  each((i,x,y,d)=>{const z=h[i],m=n3(x,y);
    let c=z>36?0:z>16?(m>.6?0:m>.3?1:2):(m>.7?1:2);
    if(z>12&&z<26&&m<.22)c=3;
    if(d<1)c=1;
    if(inTown(x,y))c=4;
    cov[i]=c});
  if(setup)setup(api);
  each(i=>{S[i]=C[cov[i]].cap*0.55;G[i]=GMAX*0.6;W[i]=0});
  const e=st.etpDay,m=st.meteo,sc=st.script;st.etpDay=0;st.meteo="none";st.script=null;
  st.t=1;st.rain={left:288,int:2};for(let k=0;k<3000;k++)step();
  st.etpDay=e;st.meteo=m;st.script=sc;
  L.fill(0); resetRun();
}
function resetRun(){st.A=20;st.cumSea=0;st.t=0;st.rain={left:0,int:0};st.cumP=st.cumE=st.cumQ=0;st.qAcc=0;st.qNow=0;st.lastPeak=st.prevPeak=0;st.hist=[];cropFl.fill(0);cropDry.fill(0);resetMetrics()}
function startRain(int,hours){ if(st.lastPeak>0)st.prevPeak=st.lastPeak; st.lastPeak=0; st.rain={left:Math.round(hours*6),int:int}; }
function setPump(i,on){pump[i]=on?1:0;pumps=[];for(let k=0;k<N;k++)if(pump[k])pumps.push(k)}
function snapshot(){return{W:W.slice(),S:S.slice(),G:G.slice(),L:L.slice()}}
function restore(s){W.set(s.W);S.set(s.S);G.set(s.G);L.set(s.L);for(let i=0;i<N;i++){const c=C[cov[i]].cap;if(S[i]>c)S[i]=c}}
const lst=[];

function step(){
  const sc=st.script, m=st.m; st.loop=sc?!!sc.loop:st.meteo==="cycle";
  if(sc){ for(const ev of sc.rain)if(ev[0]*6===st.t)startRain(ev[1],ev[2]);
    for(const ev of sc.etp)if(ev[0]*144<=st.t)st.etpDay=ev[1]; }
  else if(st.rain.left<=0&&st.meteo!=="none"){const r=Math.random(),mt=st.meteo;
    if(mt==="temp"&&r<1/500){const k=Math.random();k<.5?startRain(8,4):k<.85?startRain(3,24):startRain(40,2)}
    else if(mt==="sec"&&r<1/2600){Math.random()<.5?startRain(8,3):startRain(40,1.5)}
    else if(mt==="orage"&&r<1/420){Math.random()<.7?startRain(30+Math.random()*25,2):startRain(8,4)}}
  const rain=st.rain, rs=rain.left>0?rain.int*DT:0; if(rain.left>0)rain.left--;
  const etp=st.etpDay/144, wetF=rs>0?0.2:1;
  let cE=0;
  for(let i=0;i<N;i++){ if(sea[i])continue;
    const c=C[cov[i]],cap=c.cap; let w=W[i]+rs, s=S[i]; rough[i]=nOf(i);
    const inf=Math.min(w,c.inf*DT*(1-0.8*s/cap),cap-s); let l=L[i];
    if(inf>0){l*=1-inf/w;w-=inf;s+=inf;m.infl+=inf}                                  // ce qui s'infiltre est filtré par le sol
    if(rs>inf)l+=SRC[cov[i]]*(rs-(inf>0?inf:0));                          // le ruissellement produit ici se charge
    if(l>0){const tr=(dist[i]>0?TRAP[cov[i]]:0)+(fr[i]===1?(dist[i]===0?0.02:0.04):0);L[i]=l*(1-tr)}else L[i]=0;
    const fc=cap*0.5;
    if(s>fc){ if(G[i]<GMAX){const p=Math.min((s-fc)*0.008,GMAX-G[i]);s-=p;G[i]+=p} }
    else if(G[i]>0.97*GMAX){const p=Math.min(0.05,fc-s);s+=p;G[i]-=p}   // remontée capillaire
    const e1=Math.min(w,etp); w-=e1; if(w>100)m.evapOpen+=e1;
    const e2=Math.min(s,etp*c.kc*Math.min(1,s/(0.4*cap))*wetF); s-=e2; cE+=e1+e2;
    W[i]=w;S[i]=s; }
  st.cumE+=cE; st.cumP+=rs*st.nLand;
  // boucle fermée : l'atmosphère se charge de l'évaporation de la mer et des terres, et se vide en pluie
  if(st.loop){const es=st.etpDay*SEAK/144; st.A+=es+REC*cE/st.nLand; st.cumSea+=es;
    if(rain.left<=0&&st.A>=ATH){const amt=st.A*0.85; st.A-=amt; startRain(amt/4,4); m.rains++}}
  // pompes : irriguent les cultures dans un rayon de 3 cases, en prenant l'eau de surface puis la nappe
  for(let q=0;q<pumps.length;q++){const p=pumps[q],px=p%GW,py=p/GW|0,tgt=C[2].cap*0.6;let need=0;lst.length=0;
    for(let y=py-3;y<=py+3;y++)for(let x=px-3;x<=px+3;x++){ if(x<0||y<0||x>=GW||y>=GH-2)continue;const j=y*GW+x;
      if(cov[j]===2&&S[j]<tgt){const nd=Math.min(tgt-S[j],0.2);need+=nd;lst.push(j,nd)}}
    if(need<=0)continue;
    const tw=Math.min(need,Math.max(0,W[p]-2)), tg=Math.min(need-tw,G[p]*0.25), r=(tw+tg)/need;
    if(tw>0)L[p]*=1-tw/W[p];
    W[p]-=tw;G[p]-=tg;m.pumpW+=tw;m.pumpG+=tg;
    for(let k=0;k<lst.length;k+=2)S[lst[k]]+=lst[k+1]*r; }
  // nappe : écoulement latéral lent, de la nappe haute vers la nappe basse
  dG.fill(0);
  for(let y=0;y<GH;y++)for(let x=0;x<GW;x++){const a=y*GW+x;
    for(let k=0;k<2;k++){ if(k===0&&x===GW-1)continue; if(k===1&&y===GH-1)continue;
      const b=k===0?a+1:a+GW; if(sea[a]&&sea[b])continue;
      const za=sea[a]?0:h[a]-DAQ*(1-G[a]/GMAX), zb=sea[b]?0:h[b]-DAQ*(1-G[b]/GMAX);
      let q=KG*(za-zb);
      if(q>0){ if(sea[a])continue; q=Math.min(q,G[a]*0.2); dG[a]-=q; if(sea[b])st.cumQ+=q; else dG[b]+=q; }
      else if(q<0){ if(sea[b])continue; q=Math.min(-q,G[b]*0.2); dG[b]-=q; if(sea[a])st.cumQ+=q; else dG[a]+=q; } } }
  // le lit, entaillé dans le terrain, draine la nappe dès qu'elle monte assez haut
  for(let i=0;i<N;i++){ if(sea[i])continue; let g=G[i]+dG[i]; if(g>GMAX){W[i]+=g-GMAX;g=GMAX}
    if(dist[i]===0&&g>GRIV){const ex=(g-GRIV)*0.05;g-=ex;W[i]+=ex} G[i]=g<0?0:g; }
  // surface : vitesse de Manning v = (1/n) · d^(2/3) · √pente
  let qs=0,po=0;
  for(let sub=0;sub<NSUB;sub++){ dW.fill(0); dL.fill(0);
  for(let y=0;y<GH-2;y++)for(let x=0;x<GW;x++){const i=y*GW+x,w=W[i]; V[i]=0; if(w<0.01)continue;
    const Hi=h[i]+w/1000; let d0=0,d1=0,d2=0,d3=0,j,d;
    if(x>0){j=i-1;d=Hi-h[j]-W[j]/1000;if(d>0)d0=d}
    if(x<GW-1){j=i+1;d=Hi-h[j]-W[j]/1000;if(d>0)d1=d}
    if(y>0){j=i-GW;d=Hi-h[j]-W[j]/1000;if(d>0)d2=d}
    j=i+GW;d=Hi-(sea[j]?0:h[j]+W[j]/1000);if(d>0)d3=d;
    const sum=d0+d1+d2+d3; if(sum<=0)continue;
    const mx=Math.max(d0,d1,d2,d3), v=Math.pow(w/1000,0.667)*Math.sqrt(mx/DX)/rough[i];
    V[i]=v; const out=w*Math.min(0.8,v*150/DX);
    let mv; const lr=L[i]/w;                                             // la pollution voyage avec l'eau
    if(d0>0){mv=Math.min(out*d0/sum,d0*200);dW[i]-=mv;dW[i-1]+=mv;dL[i]-=mv*lr;dL[i-1]+=mv*lr}
    if(d1>0){mv=Math.min(out*d1/sum,d1*200);dW[i]-=mv;dW[i+1]+=mv;dL[i]-=mv*lr;dL[i+1]+=mv*lr}
    if(d2>0){mv=Math.min(out*d2/sum,d2*200);dW[i]-=mv;dW[i-GW]+=mv;dL[i]-=mv*lr;dL[i-GW]+=mv*lr}
    if(d3>0){mv=Math.min(out*d3/sum,d3*200);dW[i]-=mv;dL[i]-=mv*lr;if(sea[i+GW]){qs+=mv;po+=mv*lr}else{dW[i+GW]+=mv;dL[i+GW]+=mv*lr}}
  }
  for(let i=0;i<N;i++)if(!sea[i]){const w=W[i]+dW[i];W[i]=w<0?0:w;const l=L[i]+dL[i];L[i]=l<0?0:l} }
  // pertuis : l'eau passe sous le barrage écrêteur, d'autant plus vite que la retenue est haute
  for(const o of oris){const u=o.u,d=o.d,w=W[u];if(w<=0)continue;const head=h[u]+w/1000-o.bed;if(head<=0)continue;
    const q=Math.min(w*0.8,QORI*Math.sqrt(Math.min(1,head/o.H))),lr=L[u]/w;W[u]-=q;L[u]-=q*lr;
    if(sea[d]){qs+=q;po+=q*lr}else{W[d]+=q;L[d]+=q*lr}}
  m.polOut+=po;
  let fl=0,dr=0; const dryT=C[2].cap*0.25;
  for(let i=0;i<N;i++)if(!sea[i]){
    if(cov[i]===4){if(W[i]>FLOOD)fl++}else if(cov[i]===2){if(S[i]<dryT){dr++;cropDry[i]++}if(W[i]>FLOOD)cropFl[i]++}}
  m.floodNow=fl;m.dryNow=dr;if(fl>m.floodMax)m.floodMax=fl;m.floodH+=fl*DT;m.stress+=dr/144;
  st.cumQ+=qs; st.qAcc+=qs; st.t++;
  if(st.t%3===0){ const q=st.qNow=st.qAcc/3*QK; st.qAcc=0; if(q>st.lastPeak)st.lastPeak=q; if(q>m.peak){m.peak=q;m.peakT=st.t}
    if(sc&&st.t>=sc.lowFrom*144&&q<m.minQ)m.minQ=q;
    const cw=W[st.cap],c=cw>3?L[st.cap]/cw:0; m.cNow=c; if(c>m.cMax)m.cMax=c; if(c>SEUIL)m.cHours+=0.5; m.rain=st.cumP/st.nLand; m.et=st.cumE/st.nLand;
    st.hist.push({q:q,r:rs/DT,c:c}); if(!sc&&st.hist.length>432)st.hist.shift(); }
}
// instant où la moitié du volume de la crue (au-dessus du débit de départ) est passée, en pas de temps
function half(){const H=st.hist;if(!H.length)return 0;const q0=H[0].q;let tot=0,a=0;for(const p of H)tot+=Math.max(0,p.q-q0);
  for(let k=0;k<H.length;k++){a+=Math.max(0,H[k].q-q0);if(a>=tot/2)return(k+1)*3}return H.length*3}
// récolte : chaque case cultivée rapporte 1 au mieux. Une haie prend un dixième de la parcelle ;
// un champ noyé perd jusqu'à 60 % (au bout d'un jour sous l'eau) ; un champ assoiffé jusqu'à 70 % (au bout de 10 jours)
function hedgeNb(i){const x=i%GW,y=i/GW|0;let n=0;
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=GW||yy>=GH-2)continue;if(fr[yy*GW+xx]===1)n++}return n}
// une haie voisine abrite le champ du vent, protège son sol et héberge des insectes utiles : +5 % de récolte, +8 % avec deux haies ou plus
function harvest(){let y=0;for(let i=0;i<N;i++){if(cov[i]!==2||sea[i])continue;const nb=hedgeNb(i);let r=(fr[i]===1?0.9:1)*(1+(nb>=2?0.08:nb===1?0.05:0));
  r*=1-Math.min(0.6,cropFl[i]*DT/24*0.6); r*=1-Math.min(0.7,cropDry[i]/144/10*0.7); y+=r}return y}
// barrage : posé d'un clic, il barre la vallée perpendiculairement à la pente, d'un versant à l'autre, avec une crête de niveau
function damPlan(i,H){ if(i<0||sea[i]||cov[i]===4)return null; const x=i%GW,y=i/GW|0;
  const hh=(xx,yy)=>{xx=Math.max(0,Math.min(GW-1,xx));yy=Math.max(0,Math.min(GH-1,yy));const k=yy*GW+xx;return sea[k]?0:h[k]};
  const gx=hh(x+2,y)-hh(x-2,y), gy=hh(x,y+2)-hh(x,y-2), along=Math.abs(gy)>=Math.abs(gx);   // along : l'eau descend selon y, le barrage suit x
  const crest=h[i]+H, line=[i]; let ends=0, why="";
  for(const sgn of [-1,1])for(let k=1;k<=19;k++){const xx=along?x+sgn*k:x,yy=along?y:y+sgn*k;
    if(xx<0||yy<0||xx>=GW||yy>=GH-2||k===19){why="bord";break}const j=yy*GW+xx;
    if(h[j]>=crest){ends++;break} if(sea[j]){why="bord";break} if(cov[j]===4){why="ville";break} line.push(j)}
  // la retenue : les cases en amont, reliées entre elles, dont le sol est sous la crête
  const up=[],seen=new Uint8Array(N);for(const j of line)seen[j]=1;
  const ux=along?0:(gx>0?1:-1), uy=along?(gy>0?1:-1):0, q=[];               // l'amont est du côté où le terrain monte
  for(const j of line){const a=(j/GW|0)+uy,b=j%GW+ux;if(a>=0&&a<GH-2&&b>=0&&b<GW){const k=a*GW+b;if(!seen[k]&&h[k]<crest){seen[k]=1;q.push(k)}}}
  while(q.length&&up.length<700){const k=q.shift();up.push(k);const a=k/GW|0,b=k%GW;
    for(const [da,db] of [[1,0],[-1,0],[0,1],[0,-1]]){const aa=a+da,bb=b+db;if(aa<0||bb<0||aa>=GH-2||bb>=GW)continue;const n=aa*GW+bb;if(!seen[n]&&!sea[n]&&h[n]<crest){seen[n]=1;q.push(n)}}}
  const ok=ends===2&&up.length<700; if(!ok&&!why)why="bord";
  return{line,crest,up,along,ok,why,dn:[-ux,-uy]}}
function orificeFor(p,i){return{u:i-p.dn[0]-p.dn[1]*GW,d:i+p.dn[0]+p.dn[1]*GW,bed:h[i],H:p.crest-h[i]}}
function setOrifices(l){oris=l}
// construit un barrage sur le seul moteur (banc de test, solutions) ; l'interface a sa propre version qui garde la trace des barrages
function buildDam(i,H,ecr){const p=damPlan(i,H);if(!p||!p.ok)return null;const o=ecr?orificeFor(p,i):null;
  for(const j of p.line)h[j]=Math.max(h[j],p.crest);if(o)oris.push(o);return p}
function runAll(){while(st.t<st.script.days*144)step();st.m.t50=half();st.m.harvest=harvest()}
const api={QORI,orificeFor,setOrifices,buildDam,damPlan,hedgeNb,harvest,cropFl,cropDry,L,SRC,TRAP,SEUIL,ATH,SEAK,REC,half,fr,nOf,COST_SLOW,COST_UNFAST,NRIV,dist,side,GW,GH,N,DT,GMAX,DAQ,DX,FLOOD,C,COST_UP,COST_DOWN,COST_PUMP,h,W,S,G,V,cov,sea,pump,st,each,inTown,generate,resetRun,startRain,setPump,snapshot,restore,step,runAll};
return api;
})();

/* ---------- missions ---------- */
const WET=[[2,8,6],[40,10,4],[80,6,10],[130,12,4],[170,8,5]];           // saison humide : heures de début, mm/h, durée
const SEASON={days:34,rain:WET,etp:[[0,1],[8,3.5],[11,6]],lowFrom:24};
const f1=v=>v.toFixed(v<10?1:0).replace(".",",");
const pct=x=>Math.round(x*100);
const oPeak=(k)=>({txt:"Réduire le pic de crue d'au moins "+pct(k)+" %",ok:(m,b)=>m.peak<=b.peak*(1-k),cur:(m,b)=>"pic "+f1(m.peak)+" m³/s · référence "+f1(b.peak)});
const oPeakMax=(k)=>({txt:"Ne pas aggraver le pic de crue (au plus +"+pct(k)+" %)",ok:(m,b)=>m.peak<=b.peak*(1+k),cur:(m,b)=>"pic "+f1(m.peak)+" m³/s · référence "+f1(b.peak)});
const oFlood=()=>({txt:"Aucune case de ville inondée",ok:m=>m.floodMax===0,cur:(m,b)=>"jusqu'à "+m.floodMax+" case(s) · référence "+b.floodMax});
const oLow=(k)=>({txt:k>=1?"Relever le débit d'été d'au moins "+pct(k-1)+" %":"Garder au moins "+pct(k)+" % du débit d'été de référence",ok:(m,b)=>m.minQ>=b.minQ*k,cur:(m,b)=>"plus bas débit "+(m.minQ>1e8?"…":m.minQ.toFixed(2).replace(".",","))+" m³/s · référence "+b.minQ.toFixed(2).replace(".",",")});
const oStress=(k)=>({txt:"Réduire le manque d'eau des cultures d'au moins "+pct(k)+" %",ok:(m,b)=>m.stress<=b.stress*(1-k),cur:(m,b)=>Math.round(m.stress)+" cases·jours · référence "+Math.round(b.stress)});
const hh=t=>{const x=t/6;return "jour "+((x/24|0)+1)+" à "+Math.round(x%24)+" h"};
const oLag=(k)=>({txt:"Retarder la crue d'au moins "+k+" heure"+(k>1?"s":""),ok:(m,b)=>m.t50-b.t50>=k*6,cur:(m,b)=>"moitié de la crue passée le "+(m.t50?hh(m.t50):"…")+" · référence "+hh(b.t50)});
const oLoad=(k)=>({txt:"Réduire d'au moins "+pct(k)+" % la pollution qui part en mer",ok:(m,b)=>m.polOut<=b.polOut*(1-k),cur:(m,b)=>Math.round(m.polOut*62.5e-6)+" tonnes · référence "+Math.round(b.polOut*62.5e-6)});
const oCap=(k)=>({txt:"Réduire d'au moins "+pct(k)+" % la pointe de pollution au captage",ok:(m,b)=>m.cMax<=b.cMax*(1-k),cur:(m,b)=>"pointe "+Math.round(m.cMax)+" mg/L · référence "+Math.round(b.cMax)});
const oEt=(k)=>({txt:"Renvoyer vers le ciel au moins "+pct(k)+" % d'eau en plus",ok:(m,b)=>m.et>=b.et*(1+k),cur:(m,b)=>Math.round(m.et||0)+" mm évaporés par les terres · référence "+Math.round(b.et)});
const oHarvest=(k)=>({txt:"Garder au moins "+pct(k)+" % de la récolte",ok:(m,b)=>m.harvest>=b.harvest*k,cur:(m,b)=>(m.harvest==null?"…":Math.round(m.harvest/b.harvest*100)+" % de la récolte de référence")});
const oInf=(k)=>({txt:"Faire entrer dans le sol au moins "+pct(k)+" % de pluie en plus",ok:(m,b)=>m.infl>=b.infl*(1+k),cur:(m,b)=>Math.round(m.infl/Sim.st.nLand)+" mm infiltrés · référence "+Math.round(b.infl/Sim.st.nLand)});
const oNoPump=()=>({txt:"Ne pas irriguer : aucune pompe",live:true,ok:(m,b,x)=>x.pumps===0,cur:(m,b,x)=>x.pumps+" pompe"+(x.pumps>1?"s":"")});
const oCrops=(k)=>({txt:"Garder au moins "+pct(k)+" % des surfaces cultivées",live:true,ok:(m,b,x)=>x.crops>=x.crops0*k,cur:(m,b,x)=>x.crops+" cases sur "+x.crops0});
const oTown=(n)=>({txt:"Construire "+n+" nouvelles cases de ville",live:true,ok:(m,b,x)=>x.newTown>=n,cur:(m,b,x)=>x.newTown+" / "+n});

// opérations utilisées par les solutions ; dam est fourni par l'appelant (l'interface garde la trace des barrages)
function solOps(dam){const S=Sim;return{
  cover:(n,f,c,srt)=>{const o=[];S.each((i,x,y,d)=>{if(S.cov[i]!==4&&f(i,x,y,d))o.push(i)});if(srt)o.sort(srt);o.slice(0,n).forEach(i=>S.cov[i]=c)},
  slow:f=>S.each((i,x,y,d)=>{if(S.cov[i]!==4&&f(i,x,y,d))S.fr[i]=1}),
  pumps:(ys,ds)=>{for(const y of ys)for(const dd of ds){const x=S.st.axis[y]+dd;if(x>=0&&x<S.GW)S.setPump(y*S.GW+x,1)}},
  dam:(y,H,ecr)=>dam(y*S.GW+S.st.axis[y],H,ecr),
  low:(a,b)=>S.h[a]-S.h[b]}}
const MISSIONS=[
{ id:"m1", name:"Premier orage", theme:"Ruissellement et infiltration",
  brief:"Les versants ont été mis à nu. À chaque orage, l'eau dévale les pentes sans s'infiltrer et gonfle la rivière en quelques heures. Replantez pour que la pluie entre dans le sol au lieu de ruisseler.",
  hint:"Sondez un versant pendant l'orage : sur sol nu, l'eau file à plusieurs dizaines de cm/s. Regardez aussi la vue « Humidité du sol ».",
  learn:"Une même pluie ne fait pas la même crue. Ce qui décide, c'est le partage au sol entre infiltration et ruissellement : un sol couvert absorbe et freine, un sol nu ou tassé évacue tout, tout de suite.",
  tools:["c0","c1"], budget:700, speed:1, meteo:"3 jours · un orage de 80 mm en 2 heures",
  setup:s=>s.each((i,x,y,d)=>{if(s.h[i]>13&&s.cov[i]!==4)s.cov[i]=3}),
  script:{days:3,rain:[[6,40,2]],etp:[[0,3]],lowFrom:0}, sol:{txt:"Plantez de la forêt sur les versants nus les plus bas, juste au-dessus de la plaine : 230 cases, 690 crédits. C'est de là que l'eau rejoint le plus vite la rivière, en même temps que le pic. La forêt y absorbe jusqu'à 40 mm/h et freine le reste : le pic tombe d'environ 126 à 50 m³/s et l'infiltration augmente de plus de 70 %. La même forêt en haut des versants fait beaucoup moins, car l'eau du haut arrive de toute façon après le pic.",apply:o=>o.cover(230,(i)=>Sim.cov[i]===3,0,o.low)},
  obj:[oPeak(0.30),oInf(0.4)] },
{ id:"mv", name:"La course de l'eau", theme:"Vitesse d'écoulement",
  brief:"Pour assécher les champs et évacuer l'eau au plus vite, on a creusé des fossés dans toute la plaine et rectifié la rivière. L'eau ne s'attarde plus nulle part : tout arrive en bas en même temps. Ralentissez-la pour étaler la crue, sans trop entamer la récolte : une haie prend un peu de place dans le champ mais abrite ses voisins, et une eau freinée peut noyer des cultures.",
  hint:"Passez en vue « Vitesse » et lancez une première fois pour voir où l'eau court. Les dernières centaines de mètres avant la rivière comptent beaucoup. Et une rivière ralentie monte plus haut : devant la ville, c'est un risque.",
  learn:"Une crue, c'est un volume d'eau qui arrive dans un temps donné. À volume égal, plus l'eau va vite, plus elle arrive groupée et plus le pic est haut. La freiner l'étale dans le temps et lui laisse le loisir de s'infiltrer. Mais une eau plus lente est aussi une eau plus haute : on ralentit là où elle peut s'étaler sans dégât, pas devant les maisons. Pour l'agriculture, le bilan dépend du dosage : quelques haies bien réparties abritent les champs et augmentent la récolte, une plaine couverte de haies la réduit, et remplacer les champs par de la forêt la fait chuter.",
  tools:["slow"], budget:300, speed:1, meteo:"3 jours · un orage de 100 mm en 2 heures",
  setup:s=>s.each((i,x,y,d)=>{if(d===0||s.cov[i]===2||s.cov[i]===3)s.fr[i]=2}),
  script:{days:3,rain:[[6,50,2]],etp:[[0,3]],lowFrom:0}, sol:{txt:"Posez des haies sur les deux cases qui bordent la rivière de chaque côté, sur toute sa longueur : environ 100 cases, 200 crédits. Toute l'eau des versants doit traverser cette bande avant d'entrer dans la rivière ; freinée au dernier moment, elle arrive étalée. Le pic passe d'environ 121 à 71 m³/s et la moitié de la crue passe plus de deux heures plus tard. Les haies mangent un peu de surface mais abritent les champs voisins : la récolte reste autour de 98 %. Évitez de ralentir le lit de la rivière devant la ville, l'eau y monterait.",apply:o=>o.slow((i,x,y,d)=>d>=1&&d<=2)},
  obj:[oPeak(0.2),oLag(1),oFlood(),oHarvest(0.95)] },
{ id:"m2", name:"La ville s'étend", theme:"Imperméabilisation des sols",
  brief:"La commune doit accueillir de nouveaux quartiers. Chaque case bâtie renvoie presque toute sa pluie vers la rivière. Trouvez où construire, et comment compenser, pour que la crue ne grossisse pas et que personne n'ait les pieds dans l'eau.",
  hint:"Le fond de vallée est la place de la rivière en crue. Un bassin creusé en contrebas d'un quartier, ou des versants reboisés ailleurs, compensent ce que la ville n'absorbe plus.",
  learn:"Artificialiser un sol, c'est déplacer l'eau vers l'aval, plus vite. On peut compenser par des sols plus absorbants ailleurs ou par du stockage, mais l'emplacement compte autant que la surface : bâtir dans le lit de la rivière en crue reste une exposition au risque.",
  tools:["c4","c0","c1","c5","down"], budget:260, speed:1, meteo:"3 jours · un orage de 100 mm en 2 heures",
  setup:null,
  script:{days:3,rain:[[6,50,2]],etp:[[0,3]],lowFrom:0}, sol:{txt:"Construisez les 60 cases de ville sur les versants, loin du fond de vallée (entre 7 et 11 cases de la rivière), puis transformez 260 cases de cultures et de sol nu en prairie. Hors du lit de la rivière en crue, les nouveaux quartiers ne sont pas inondés. La prairie absorbe deux fois plus vite que les cultures et compense largement l'eau que la ville renvoie : le pic baisse même d'environ 84 à 64 m³/s. Coût : 260 crédits.",apply:o=>{o.cover(60,(i,x,y,d)=>d>=7&&d<=11&&y>6,4);o.cover(260,(i)=>Sim.cov[i]===2||Sim.cov[i]===3,1)}},
  obj:[oTown(60),oFlood(),oPeakMax(0.05)] },
{ id:"m3", name:"Quand le sol est plein", theme:"Crue sur sol saturé",
  brief:"Il pleut depuis un jour entier, puis l'orage arrive. Les sols sont gorgés d'eau : même la forêt ne peut plus rien absorber. Il faut cette fois retenir l'eau en surface, le temps que la crue passe.",
  hint:"Un barrage ne retient que l'eau venue de l'amont : placée trop haut, elle laisse passer tout ce qui tombe plus bas. Il doit aussi être assez haut pour ne pas déborder, et il noie les terres derrière lui.",
  learn:"L'infiltration a une limite : la place disponible dans le sol. Après de longues pluies, presque tout ruisselle, quelle que soit la végétation. Il faut alors du volume libre pour retenir la crue, au bon endroit, et accepter que des terres soient noyées à la place de la ville. Une digue le long de la ville, elle, renvoie le problème en aval.",
  tools:["c0","c1","c5","up","down"], budget:320, speed:1, meteo:"4 jours · 150 mm de pluie continue, puis un orage de 110 mm en 2 heures",
  setup:null,
  script:{days:4,rain:[[2,5,30],[36,55,2]],etp:[[0,2]],lowFrom:0}, sol:{txt:"Posez un barrage plein de 4 m sur la rivière, deux cases au-dessus des premières maisons : 65 crédits. Les sols étant saturés, aucune végétation ne peut plus absorber l'orage ; il faut du volume vide. La retenue stocke la crue venue de l'amont pendant qu'elle passe : le pic tombe d'environ 136 à 104 m³/s et la ville reste au sec. Plus haut dans la vallée, le barrage laisserait passer toute la pluie tombée en dessous. Un barrage écrêteur marche aussi, mais il lui faut 6 m, car son pertuis laisse filer 30 m³/s.",apply:o=>o.dam(15,4,false)},
  obj:[oFlood(),oPeak(0.15)] },
{ id:"mq", name:"L'eau qui emporte", theme:"Qualité de l'eau",
  brief:"La plaine est cultivée jusqu'au bord de la rivière. À chaque pluie, l'eau qui ruisselle sur les champs emporte de la terre, des engrais et des pesticides. La ville, elle, puise son eau potable dans la rivière : le captage est marqué d'un losange. Gardez les cultures, mais arrêtez la pollution avant qu'elle n'atteigne l'eau.",
  hint:"Passez en vue « Qualité » pendant une pluie pour voir d'où part la pollution et par où elle rejoint la rivière. Une bande de végétation n'agit que sur l'eau qui la traverse : sa place compte plus que sa surface.",
  learn:"L'eau garde la trace de ce qu'elle a traversé. Celle qui ruisselle sur un sol nu ou cultivé se charge ; celle qui s'infiltre ou traverse lentement une végétation dense se décharge. Une bande enherbée, une haie ou une zone humide placée entre le champ et la rivière protège l'eau pour une petite surface. Le jeu ne montre pas tout : les nitrates descendent aussi vers la nappe avec l'eau qui s'infiltre.",
  tools:["c1","c5","c0","slow"], budget:260, speed:2, quality:true, meteo:"5 jours · une averse, un orage de 60 mm, puis une pluie de 30 mm",
  setup:s=>s.each((i,x,y,d)=>{if(s.h[i]<19&&d>=1&&s.cov[i]!==4)s.cov[i]=2}),
  script:{days:5,rain:[[4,8,4],[30,30,2],[70,10,3]],etp:[[0,3]],lowFrom:0}, sol:{txt:"Transformez en zone humide la case qui borde la rivière de chaque côté, sur toute sa longueur : environ 50 cases, 150 crédits. Toute l'eau qui ruisselle des champs doit la traverser avant d'atteindre la rivière ; la végétation dense la ralentit et retient la pollution. La pollution partie en mer tombe d'environ 99 à 35 tonnes et la pointe au captage de 54 à 20 mg/L, en gardant plus de 90 % des champs. La même surface de prairie au milieu de la plaine ne change presque rien : ce qui compte, c'est d'être sur le chemin de l'eau.",apply:o=>o.cover(999,(i,x,y,d)=>d===1&&Sim.cov[i]===2,5)},
  obj:[oLoad(0.5),oCap(0.45),oCrops(0.85)] },
{ id:"m4", name:"La rivière en été", theme:"Nappe et débit d'étiage",
  brief:"Huit jours de pluies d'hiver, puis vingt-six jours sans une goutte. En été, la rivière ne coule que grâce à la nappe qui se vide lentement. Faites en sorte que l'eau de l'hiver entre dans le sous-sol pour ressortir quand il n'y a plus de pluie.",
  hint:"Ce qui ruisselle en hiver est perdu pour l'été. Comparez ce que coûte une case de forêt et une case de prairie, et ce que chacune consomme en été. Une retenue, elle, garde l'eau pour elle et en évapore une partie.",
  learn:"La rivière d'été est faite de la pluie d'hiver. L'eau infiltrée met des semaines à rejoindre le cours d'eau, alors que l'eau ruisselée est en mer en quelques heures. Protéger la recharge des nappes, c'est protéger le débit d'étiage.",
  tools:["c0","c1","c5","up","down"], budget:450, speed:8, sqrt:true, meteo:"34 jours · 8 jours de pluies d'hiver (236 mm), puis 26 jours secs et chauds",
  setup:s=>s.each((i,x,y,d)=>{if(s.h[i]>12&&s.cov[i]!==4&&s.st.noise(x,y)<0.72)s.cov[i]=3}),
  script:SEASON, sol:{txt:"Semez de la prairie sur 450 cases de sol nu, en commençant par les plus basses : 450 crédits. En hiver, le sol nu laisse ruisseler la pluie, qui file en mer en quelques heures ; la prairie la fait entrer dans le sol, d'où elle descend lentement vers la nappe. En été, cette nappe mieux remplie alimente la rivière : son débit le plus bas remonte d'environ 0,83 à 1,05 m³/s. La forêt recharge aussi, mais elle coûte trois fois plus cher et boit davantage en été. Les retenues, elles, gardent l'eau pour elles et l'évaporent.",apply:o=>o.cover(450,(i)=>Sim.cov[i]===3,1,o.low)},
  obj:[oLow(1.15)] },
{ id:"m5", name:"Partager l'eau", theme:"Irrigation et débit réservé",
  brief:"L'été, les cultures de la plaine manquent d'eau. Des pompes peuvent les irriguer, en puisant dans la rivière ou dans la nappe. Mais cette eau manque ensuite au cours d'eau, qui doit garder un débit minimal pour rester vivant.",
  hint:"Une pompe irrigue les cultures à 3 cases autour d'elle. Posée sur la rivière, elle prend l'eau qui passe ; ailleurs, elle puise dans la nappe et creuse un cône visible en vue « Nappe ». Une retenue remplie en hiver peut aussi servir de réserve.",
  learn:"Rivière et nappe sont le même réservoir vu à deux endroits : pomper dans l'une fait baisser l'autre. Pomper loin du cours d'eau retarde l'effet sans le supprimer, et trop de pompes finissent toujours par se voir dans la rivière. Stocker l'eau d'hiver déplace le prélèvement dans le temps, mais une partie s'évapore.",
  tools:["pump","c5","up","down"], budget:220, speed:8, sqrt:true, meteo:"34 jours · 8 jours de pluies d'hiver (236 mm), puis 26 jours secs et chauds",
  setup:s=>s.each((i,x,y,d)=>{if(s.h[i]<19&&d>=1&&s.cov[i]!==4)s.cov[i]=2}),
  script:SEASON, sol:{txt:"Installez 8 pompes dans la plaine, à 8 cases de la rivière de chaque côté, sur les rangées 6, 12, 18 et 24 : 80 crédits. Elles puisent dans la nappe loin du cours d'eau ; l'effet sur la rivière arrive donc lentement et reste limité pendant la saison. Le manque d'eau des cultures baisse d'environ moitié et la rivière garde près des deux tiers de son débit d'été. Des pompes dans la rivière, ou trop près d'elle, la vident presque ; trop de pompes, même loin, finissent par se voir aussi.",apply:o=>o.pumps([6,12,18,24],[-8,8])},
  obj:[oStress(0.45),oLow(0.6),oCrops(0.9)] },
{ id:"mc", name:"D'où vient la pluie", theme:"La boucle complète",
  brief:"Jusqu'ici la pluie tombait toute seule. Ici, plus de météo imposée : l'atmosphère se charge de l'eau évaporée par la mer et par les terres, et il ne pleut que lorsqu'elle est pleine. Sur ce territoire aux versants dénudés, presque rien ne remonte vers le ciel et les pluies sont rares. Faites tourner l'eau plus souvent pour que les cultures tiennent, sans irrigation.",
  hint:"Suivez la jauge « Atmosphère » du schéma : elle se remplit par la mer et par l'évapotranspiration des terres. Un sol nu ou sec n'évapore presque rien. La moitié de ce que les terres évaporent retombe sur place, le reste part avec le vent. Pour cette mission, la carte représente une grande région.",
  learn:"L'eau ne se perd pas, elle tourne. La mer fournit l'apport net, et c'est lui qui finit dans les rivières. Mais une région couverte de végétation renvoie vers le ciel une partie de sa pluie, qui retombe plus loin : la même eau sert plusieurs fois. Ce recyclage pèse à l'échelle d'une grande région ou d'un continent ; sur un petit bassin versant, l'essentiel de la pluie vient d'ailleurs.",
  tools:["c0","c1","c5"], budget:500, speed:8, sqrt:true, meteo:"45 jours chauds · il pleut dès que l'atmosphère contient 30 mm d'eau",
  setup:s=>s.each((i,x,y,d)=>{if(s.cov[i]===4)return;if(s.h[i]<19&&d>=1)s.cov[i]=2;else if(s.h[i]>=19&&s.st.noise(x,y)<0.75)s.cov[i]=3}),
  script:{days:45,loop:true,rain:[],etp:[[0,5]],lowFrom:0}, sol:{txt:"Semez de la prairie sur 450 cases de sol nu : 450 crédits, sans toucher aux cultures ni installer de pompe. Un sol nu sec n'évapore presque rien ; couvert de végétation, il renvoie de l'eau vers le ciel tant qu'il en a. L'atmosphère se remplit plus vite, les pluies reviennent plus tôt et les cultures souffrent beaucoup moins. Le nombre de pluies change peu : c'est leur rythme qui compte.",apply:o=>o.cover(450,(i)=>Sim.cov[i]===3,1)},
  obj:[oEt(0.12),oStress(0.4),oCrops(0.9),oNoPump()] },
{ id:"m6", name:"Un territoire, quatre saisons", theme:"Tout concilier",
  brief:"Une année entière en accéléré : pluies d'hiver avec un gros orage sur sol saturé, puis un été sec. Protégez la ville, gardez les cultures en vie et la rivière en eau, avec un budget qui ne permet pas tout.",
  hint:"Chaque aménagement a deux faces : la forêt absorbe la crue mais boit en été, la retenue protège et irrigue mais s'évapore, la pompe sauve la récolte mais prend à la rivière.",
  learn:"Il n'y a pas d'aménagement miracle. Gérer l'eau d'un bassin versant, c'est arbitrer entre des usages et des risques qui dépendent tous du même stock, d'une saison à l'autre et de l'amont à l'aval.",
  tools:["c0","c1","c5","slow","up","down","pump"], budget:500, speed:8, sqrt:true, meteo:"34 jours · pluies d'hiver, un orage de 80 mm au 8e jour, puis 26 jours secs et chauds",
  setup:s=>s.each((i,x,y,d)=>{if(s.cov[i]===4)return;if(s.h[i]<19&&d>=1)s.cov[i]=2;else if(s.h[i]>19&&s.st.noise(x,y)<0.45)s.cov[i]=3}),
  script:{days:34,rain:WET.concat([[176,40,2]]),etp:[[0,1],[8,3.5],[11,6]],lowFrom:24}, sol:{txt:"Combinez trois aménagements, pour 395 crédits environ. Un barrage écrêteur de 4 m juste au-dessus de la ville retient l'orage, puis se vide par son pertuis : il ne coupe pas la rivière et s'évapore peu en été. 200 cases de sol nu passent en prairie, pour infiltrer l'hiver et soutenir la nappe. 12 pompes, à 8 cases de la rivière, irriguent la plaine sans assécher le cours d'eau. Avec un barrage plein à la place de l'écrêteur, la retenue évapore une quinzaine de fois plus d'eau et le débit d'été baisse nettement.",apply:o=>{o.dam(15,4,true);o.cover(200,(i)=>Sim.cov[i]===3,1);o.pumps([4,8,12,16,20,24],[-8,8])}},
  obj:[oFlood(),oPeak(0.15),oStress(0.4),oLow(0.5),oCrops(0.8)] }
];
if(typeof module!=="undefined")module.exports={Sim,MISSIONS,solOps};
