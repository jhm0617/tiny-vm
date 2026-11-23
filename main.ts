import {mkdirSync,readdirSync,readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
const IM=new Uint8Array(256).fill(255),PO=new Uint8Array(256),PU=new Uint8Array(256);
function s(o,i,p,u){IM[o]=i;PO[o]=p;PU[o]=u}
s(0,0,0,0);s(1,1,0,1);s(2,4,0,1);s(3,0,1,0);s(4,0,1,2);s(5,0,2,2);s(6,0,2,3);s(7,0,3,3);
for(let o=16;o<35;o++)o===23||o===27?s(o,0,1,1):s(o,0,2,1);
s(48,2,0,0);s(49,2,1,0);s(50,2,1,0);s(51,2,0,0);s(52,0,0,0);s(64,0,1,1);s(65,0,2,0);s(80,0,1,0);s(81,0,1,0);s(82,0,0,1);s(83,0,1,0);
function run(p,g){
 const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=[];
 let sp=0,cp=0,pc=0,ip=0,st=0;
 const plen=p.length;
 for(;;){
  if(st===1e6)return[o,10];
  if(pc<0||pc>=plen)return[o,9];
  const op=p[pc],im=IM[op];
  if(im===255)return[o,5];
  if(pc+im>=plen)return[o,9];
  st++;const nx=pc+1+im;
  if(sp<PO[op])return[o,2];
  if(sp-PO[op]+PU[op]>256)return[o,3];
  pc=nx;
  switch(op){
   case 0:return[o,0];
   case 1:D[sp++]=(p[nx-1]<<24)>>24;break;
   case 2:D[sp++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
   case 3:sp--;break;
   case 4:D[sp]=D[sp-1];sp++;break;
   case 5:{const t=D[sp-1];D[sp-1]=D[sp-2];D[sp-2]=t;break;}
   case 6:D[sp]=D[sp-2];sp++;break;
   case 7:{const a=D[sp-3];D[sp-3]=D[sp-2];D[sp-2]=D[sp-1];D[sp-1]=a;break;}
   case 23:D[sp-1]=-D[sp-1]|0;break;
   case 27:D[sp-1]=~D[sp-1];break;
   case 48:case 49:case 50:{
    const rel=((p[nx-2]|p[nx-1]<<8)<<16)>>16;let t=op===48;
    if(op!==48){const v=D[--sp];t=op===49?v===0:v!==0}
    if(t)pc=nx+rel;break;}
   case 51:if(cp===64)return[o,7];C[cp++]=nx;pc=p[nx-2]|p[nx-1]<<8;break;
   case 52:if(cp===0)return[o,8];pc=C[--cp];break;
   case 64:{const a=D[sp-1];if(a<0||a>255)return[o,6];D[sp-1]=M[a];break;}
   case 65:{const a=D[sp-1],v=D[sp-2];if(a<0||a>255)return[o,6];sp-=2;M[a]=v;break;}
   case 80:{const q=String(D[sp-1]);if(o.length+q.length>65536)return[o,11];sp--;for(let i=0;i<q.length;i++)o.push(q.charCodeAt(i));break;}
   case 81:if(o.length+1>65536)return[o,11];o.push(D[--sp]&255);break;
   case 82:D[sp++]=ip<g.length?g[ip++]:-1;break;
   case 83:return[o,D[--sp]&255];
   default:{
    const b=D[sp-1],a=D[sp-2];let r;
    if(op===16)r=a+b|0;else if(op===17)r=a-b|0;else if(op===18)r=Math.imul(a,b);
    else if(op===19){if(b===0)return[o,4];r=(a/b)|0}
    else if(op===20){if(b===0)return[o,4];r=a%b|0}
    else if(op===21){if(b===0)return[o,4];r=((a>>>0)/(b>>>0))|0}
    else if(op===22){if(b===0)return[o,4];r=(a>>>0)%(b>>>0)|0}
    else if(op===24)r=a&b;else if(op===25)r=a|b;else if(op===26)r=a^b;
    else if(op===28)r=a<<(b&31);else if(op===29)r=a>>(b&31);else if(op===30)r=(a>>>(b&31))|0;
    else if(op===32)r=a===b?1:0;else if(op===33)r=a<b?1:0;else r=(a>>>0)<(b>>>0)?1:0;
    sp-=2;D[sp++]=r;break;}
  }
 }
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I).sort()){
 const r=run(new Uint8Array(readFileSync(join(I,id,'program.bin'))),new Uint8Array(readFileSync(join(I,id,'input.bin'))));
 mkdirSync(join(O,id),{recursive:true});
 writeFileSync(join(O,id,'stdout.bin'),Uint8Array.from(r[0]));
 writeFileSync(join(O,id,'exit.txt'),r[1]+'\n');
}
