import{f as W,j as d}from"./vendor-react-NF5A8vL5.js";import{M as k,r as A,a as K,b as y,c as C}from"./vendor-markdown-Ct3NZgrQ.js";function Q(o){if(!o)return"";let t=o;t=t.replace(/(?<!\$)(?:\\begin\{(?:array|tabular|matrix|pmatrix|bmatrix)\}[\s\S]*?\\end\{(?:array|tabular|matrix|pmatrix|bmatrix)\})(?!\$)/g,s=>`
$$
${s}
$$
`);const a=t.split(`
`),i=[];let e=[];const r=()=>{if(e.length>0){const s=Math.max(...e.map(n=>n.length));if(s>1&&e.length>1){const n=e[0];for(;n.length<s;)n.push("");i.push(""),i.push("| "+n.map(m=>m||"-").join(" | ")+" |"),i.push("| "+Array(s).fill("---").join(" | ")+" |");for(let m=1;m<e.length;m++){const h=e[m];for(;h.length<s;)h.push("");i.push("| "+h.join(" | ")+" |")}i.push("")}else e.forEach(n=>i.push(n.join("	")));e=[]}};for(let s=0;s<a.length;s++){const n=a[s];n.includes("	")&&!n.trim().startsWith("|")?e.push(n.split("	").map(m=>m.trim())):(e.length>0&&r(),i.push(n))}e.length>0&&r(),t=i.join(`
`);const l=t.split(`
`),c=[];for(let s=0;s<l.length;s++){c.push(l[s]);const n=l[s].trim(),m=s<l.length-1?l[s+1].trim():"",h=n.startsWith("|")&&n.endsWith("|")&&n.split("|").length>2,g=n.startsWith("|")&&/^[|\s\-:]+$/.test(n),f=m.startsWith("|")&&m.endsWith("|")&&m.split("|").length>2,p=m.startsWith("|")&&/^[|\s\-:]+$/.test(m);if(h&&!g&&f&&!p){const b=s>0?l[s-1].trim():"";if(!(b.startsWith("|")&&b.endsWith("|"))){const $=Math.max(1,n.split("|").length-2),w="| "+Array($).fill("---").join(" | ")+" |";c.push(w)}}}const u=[];for(let s=0;s<c.length;s++){const n=c[s],m=s>0?c[s-1]:"",h=s<c.length-1?c[s+1]:"",g=n.trim().startsWith("|")&&n.trim().endsWith("|"),f=m.trim().startsWith("|")&&m.trim().endsWith("|"),p=h.trim().startsWith("|")&&h.trim().endsWith("|");g&&!f&&m.trim().length>0&&u.push(""),u.push(n),g&&!p&&h.trim().length>0&&u.push("")}return u.join(`
`)}function D({content:o,className:t=""}){const a=W.useMemo(()=>Q(o),[o]);return d.jsx("div",{className:`markdown-content ${t}`,children:d.jsx(k,{remarkPlugins:[K,y,C],rehypePlugins:[A],components:{p:({node:i,children:e,...r})=>d.jsx("p",{className:"my-1 leading-relaxed",...r,children:e}),ol:({node:i,children:e,...r})=>d.jsx("ol",{className:"list-decimal list-outside ml-5 space-y-1 my-2",...r,children:e}),ul:({node:i,children:e,...r})=>d.jsx("ul",{className:"list-disc list-outside ml-5 space-y-1 my-2",...r,children:e}),li:({node:i,children:e,...r})=>d.jsx("li",{className:"leading-relaxed pl-1",...r,children:e}),strong:({node:i,children:e,...r})=>d.jsx("strong",{className:"font-bold text-white tracking-wide",...r,children:e}),table:({node:i,...e})=>d.jsx("div",{className:"my-3 overflow-x-auto rounded-lg border border-white/20 bg-black/40 shadow-sm max-w-full",children:d.jsx("table",{className:"w-full text-center divide-y divide-white/20 text-xs sm:text-sm border-collapse text-[#E0D8D0]",...e})}),thead:({node:i,...e})=>d.jsx("thead",{className:"bg-[#C5A059]/15 text-[#C5A059] font-medium tracking-wide text-xs border-b border-white/20",...e}),th:({node:i,...e})=>d.jsx("th",{className:"px-3.5 py-2.5 text-center font-semibold border-r border-white/10 last:border-r-0 whitespace-nowrap",...e}),tbody:({node:i,...e})=>d.jsx("tbody",{className:"divide-y divide-white/10",...e}),tr:({node:i,...e})=>d.jsx("tr",{className:"hover:bg-white/5 transition-colors even:bg-white/[0.02]",...e}),td:({node:i,...e})=>d.jsx("td",{className:"px-3.5 py-2 text-center border-r border-white/10 last:border-r-0 text-white/90 whitespace-nowrap",...e}),code:({node:i,className:e,children:r,...l})=>e?d.jsx("code",{className:e,...l,children:r}):d.jsx("code",{className:"px-1.5 py-0.5 rounded bg-white/10 text-[#C5A059] font-mono text-xs",...l,children:r})},children:a})})}const R=W.memo(D),M=o=>{if(!o)return null;const t=o.trim();return t==="K"||t==="k"||t==="A"||t==="a"||t==="ক"||t==="১"?"K":t==="L"||t==="l"||t==="B"||t==="b"||t==="খ"||t==="২"?"L":t==="M"||t==="m"||t==="C"||t==="c"||t==="গ"||t==="৩"?"M":t==="N"||t==="n"||t==="D"||t==="d"||t==="ঘ"||t==="৪"?"N":null},T=o=>{const t={"০":"0","১":"1","২":"2","৩":"3","৪":"4","৫":"5","৬":"6","৭":"7","৮":"8","৯":"9"},a=o.replace(/[০-৯]/g,i=>t[i]||i);return parseInt(a,10)},v=/^(?:\*\*)?\s*(?:[0-9০-৯]+|(?:[Qq]uestion|[Qq]|প্রশ্ন)\s*[0-9০-৯]*)[\.\)\-:]+\s*/i,j=/^(?:\*\*)?\s*(?:উদ্দীপক|নিচের\s*(?:উদ্দীপক|অনুচ্ছেদ|তথ্য|তথ্যাবলি|সারণি|ছক|চিত্র|দৃষ্টান্ত)|অনুচ্ছেদ|চিত্রটি\s*লক্ষ্য|সারণিটি\s*লক্ষ্য|তথ্যটি\s*লক্ষ্য|stimulus|passage|read the following|based on the (?:above|following))/i;function N(o){if(!o)return"";let t=o.trim();for(let a=0;a<2;a++)t=t.replace(/^(\*\*)\s*(?:[Qq]uestion|[Qq]|প্রশ্ন)?\s*[0-9০-৯]+[\.\)\-:]*\s*(\*\*)\s*/i,""),t=t.replace(/^(?:[Qq]uestion|[Qq]|প্রশ্ন)?\s*[0-9০-৯]+[\.\)\-:]*\s*(\*\*)\s*/i,""),t=t.replace(/^(\*\*)\s*(?:[Qq]uestion|[Qq]|প্রশ্ন)?\s*[0-9০-৯]+[\.\)\-:]+\s*/i,"$1"),t=t.replace(/^(?:[Qq]uestion|[Qq]|প্রশ্ন)?\s*[0-9০-৯]+[\.\)\-:]+\s*/i,""),t=t.replace(/^\*{4,}\s*/,""),t=t.replace(/^\*{2}\s+(?!\S)/,"");if(t.startsWith("**")){const a=t.slice(2);a.includes("**")||(t=a.trim())}return t.trim()}const I=N;function P(o){if(!o||!o.trim())return[];const t=o.split(`
`).map(m=>m.trimEnd()),a=[];let i=[],e={K:"",L:"",M:"",N:""},r="K",l=!1,c=!1,u=null,s=!1;const n=()=>{if(i.length>0||c){for(;i.length>0&&i[i.length-1].trim()==="";)i.pop();const m=i.join(`
`).trim(),h=N(m);a.push({text:h,options:{...e},correctOption:r}),i=[],e={K:"",L:"",M:"",N:""},r="K",l=!1,c=!1,u=null,s=!1}};for(const m of t){const h=m.trim();if(!h){i.length>0&&!c&&i.push(""),c&&(s=!0);continue}const g=h.match(/^(?:\[|\()? *(?:Ans|Answer|উত্তর|উত্তরঃ|সঠিক\s*উত্তর)[\s:\-]+(?:\*|\()? *([KLMNABCDklmnabcdকখগঘ১-৪])(?:\)|\*|\])?$/i);if(g){const $=M(g[1]);if($){r=$,l=!0;continue}}const f=h.match(/^(?:(\*?)\s*(?:\[([KLMNABCDklmnabcdকখগঘ])\]|\(([KLMNABCDklmnabcdকখগঘ])\)|\(?([KLMNABCDklmnabcdকখগঘ])(\*?)\)?[\.\)\-:]*))\s*(.*)$/);let p=null,b=!1,x="";if(f){const $=f[1]==="*",w=f[2]||f[3]||f[4],L=f[5]==="*";p=M(w),b=$||L,x=f[6]?f[6].trim():"",x.startsWith("*")?(b=!0,x=x.replace(/^\*+\s*/,"")):/^\(\*\)\s*/.test(x)&&(b=!0,x=x.replace(/^\(\*\)\s*/,""))}if(p)e[p]=x,b&&!l&&(r=p,l=!0),c=!0,u=p,s=!1;else if(c){const $=v.test(h),w=j.test(h),L=!!(e.K&&e.L&&e.M&&e.N);$||w||s||L||u==="N"&&(h.startsWith("**")||w)?(n(),i=[m]):u&&!s?e[u]+=`
`+m:i.push(m)}else i.push(m)}return n(),a}function O(o){if(!o)return 0;const t=o.match(/(?:\*[KLMNABCDklmnabcdকখগঘ]|[KLMNABCDklmnabcdকখগঘ]\*|\[(?:Ans|উত্তর)[\s:\-]+|Ans[\s:\-]+[KLMNABCDklmnabcdকখগঘ])/gi);return t?t.length:0}const F={passage:`**নিচের উদ্দীপকটি পড়ো এবং পরবর্তী প্রশ্নের উত্তর দাও:**
একটি সমতলে গতিশীল বস্তুর ত্বরণ $a = 4\\text{ ms}^{-2}$ এবং আদিবেগ $u = 0$। বস্তুটি $5$ সেকেন্ড ধরে চলছে।

**1. উদ্দীপক অনুসারে ৫ সেকেন্ড পর বস্তুটির বেগ কত?**
K $10\\text{ ms}^{-1}$
*L $20\\text{ ms}^{-1}$
M $30\\text{ ms}^{-1}$
N $40\\text{ ms}^{-1}$

**2. উদ্দীপক অনুসারে অতিক্রান্ত দূরত্ব কত?**
K $25\\text{ m}$
*L $50\\text{ m}$
M $75\\text{ m}$
N $100\\text{ m}$`,table:`**নিচের সারণিটি লক্ষ্য করো এবং প্রশ্নের উত্তর দাও:**

| মৌল | পারমাণবিক সংখ্যা | যোজ্যতা |
|---|---|---|
| X | 11 | 1 |
| Y | 17 | 1 |
| Z | 12 | 2 |

**1. উদ্দীপকের X ও Y মৌল দ্বারা গঠিত যৌগের প্রকৃতি কী রূপ?**
*K আয়নিক
L সমযোজী
M ধাতব
N সন্নিবেশ

**2. নিচের কোনটি সঠিক?**
K X মৌলটি অ্যানায়ন তৈরি করে
*L Z মৌলটি ক্ষারীয় মৃত্তিকা ধাতু
M Y মৌলটি নিষ্ক্রিয় গ্যাস
N X ও Z মিলে যৌগ গঠন করে`,multistatement:`**1. নিচের তথ্যাবলি লক্ষ্য করো:**
i. কাজ একটি স্কেলার রাশি
ii. বল ও সরণের মধ্যবর্তী কোণ $90^\\circ$ হলে কৃতকাজ শূন্য
iii. অভিকর্ষ বল একটি সংরক্ষণশীল বল

**নিচের কোনটি সঠিক?**
K i ও ii
L i ও iii
M ii ও iii
*N i, ii ও iii`};function X(o,t){const a={};if(!o||!o.trim())return a;const i=/(?:^|[,\s;\n])([0-9০-৯]+)[\.\)\-:\s]+([KLMNABCDklmnabcdকখগঘ])(?=[,\s;\n]|$)/g;let e,r=!1;for(;(e=i.exec(o))!==null;){const l=T(e[1]),c=M(e[2]);l>=1&&c&&(a[l-1]=c,r=!0)}if(!r){const l=o.split(/[\s,;\n]+/).filter(Boolean);let c=0;for(const u of l){const s=M(u);s&&c<t&&(a[c]=s,c++)}}return a}function B(o,t){if(!o)return`**${t+1}. **`;const a=o.trim();if(a.includes(`
`)){const e=a.split(`
`),r=e[0].trim();if(j.test(r)){let u=-1;for(let s=e.length-1;s>=1;s--){const n=e[s].trim();if(n.length>0&&(n.includes("?")||n.includes("কত")||n.includes("কোনটি")||n.includes("কী")||n.startsWith("**"))){u=s;break}}if(u!==-1){let s=e[u].trim();if(s=N(s),s.startsWith("**")&&s.endsWith("**")){const n=s.slice(2,-2).trim();e[u]=`**${t+1}. ${n}**`}else s.startsWith("**")?e[u]=`**${t+1}. ${s.slice(2)}`:e[u]=`**${t+1}. ${s}**`;return e.join(`
`)}return e.join(`
`)}const l=N(r);let c="";if(l.startsWith("**")&&l.endsWith("**")){const u=l.slice(2,-2).trim();c=`**${t+1}. ${u}**`}else l.startsWith("**")?c=`**${t+1}. ${l.slice(2)}`:c=`**${t+1}. ${l}**`;return[c,...e.slice(1)].join(`
`)}const i=N(a);if(i.startsWith("**")&&i.endsWith("**")){const e=i.slice(2,-2).trim();return`**${t+1}. ${e}**`}return`**${t+1}. ${i}**`}function U(o){return o.map((t,a)=>{const e=[B(t.text,a)];return["K","L","M","N"].forEach(r=>{const l=t.correctOption===r;e.push(`${l?"*":""}${r} ${t.options[r]||""}`)}),e.join(`
`)}).join(`

`)}function _(o){if(!o)return"";const t=o.split(`
`),a=[];for(let i=0;i<t.length;i++){const e=t[i],r=i>0?t[i-1]:"",l=i<t.length-1?t[i+1]:"",c=e.trim().startsWith("|")&&e.trim().endsWith("|"),u=r.trim().startsWith("|")&&r.trim().endsWith("|"),s=l.trim().startsWith("|")&&l.trim().endsWith("|");if(c&&!u&&r.trim().length>0&&a.push(""),a.push(e),c&&s){const n=/^[|\s\-:]+$/.test(e.trim()),m=/^[|\s\-:]+$/.test(l.trim());if(!n&&!m&&!u){const h=Math.max(1,e.trim().split("|").length-2);a.push("| "+Array(h).fill("---").join(" | ")+" |")}}c&&!s&&l.trim().length>0&&a.push("")}return a.join(`
`)}export{R as M,F as S,O as a,X as b,I as c,U as f,P as p,_ as s};
