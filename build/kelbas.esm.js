const UUID=()=>{let e=()=>(65536*(1+Math.random())|0).toString(16).substring(1);return"p"+(e()+e())+"-"+e()};class Parser{constructor(e,...t){this.values_map=[],this.string=this.concat_string(e,t)}concat_string(e,t){return e.map((e,n)=>{const r=t[n],a=UUID();switch(!0){case"function"==typeof r:e=e.concat(`"${a} `),this.values_map.push({id:a,value:r});break;case"object"==typeof r||r&&1===r.nodeType:e=`${e} <template ${a}></template>`,this.values_map.push({id:a,value:r});break;case"string"==typeof r:e=`${e}${r||""}`}return e}).reduce((e,t)=>e+t)}get fragment(){const e=document.createElement("template");return e.innerHTML=this.string,this.place_values(e.content.cloneNode(!0))}get container(){let e=(new DOMParser).parseFromString(this.string,"text/html");return this.place_values(e.body.firstChild)}get svg(){let e=new DOMParser;const t=this.container;t.setAttribute("xmlns","http://www.w3.org/2000/svg");let n=e.parseFromString(t.outerHTML,"image/svg+xml");return this.place_values(n.documentElement)}place_values(e){return this.values_map.forEach(t=>{const n=e.outerHTML?e.parentNode.querySelector(`[${t.id}]`):e.querySelector(`[${t.id}]`);if(!n)throw new Error('Warning function must be defined between parentheses for example "${calledFunction}"');if("function"==typeof t.value){const e=/(on)\w+/g.exec(n.outerHTML)[0].split("on")[1];n.addEventListener(e,t.value.bind(this)),n.removeAttribute(`on${e}`)}else if("object"==typeof t.value)if(t.value.children)n.replaceWith(t.value);else{const e=document.createDocumentFragment();t.value.forEach(t=>e.appendChild(t)),n.replaceWith(e)}}),e}}function html(e,...t){return new Parser(e,...t)}window.html=html;export default html;
