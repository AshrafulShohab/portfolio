function u(t){return t==null?'""':`"${String(t).replace(/"/g,'""')}"`}function l(t,n,s){const r=n.map(o=>u(o)).join(","),d=s.map(o=>o.join(",")).join(`\r
`),i="\uFEFF"+r+`\r
`+d,a=new Blob([i],{type:"text/csv;charset=utf-8;"}),c=URL.createObjectURL(a),e=document.createElement("a");e.setAttribute("href",c),e.setAttribute("download",t.toLowerCase().endsWith(".csv")?t:`${t}.csv`),document.body.appendChild(e),e.click(),document.body.removeChild(e),URL.revokeObjectURL(c)}export{l as d,u as e};
