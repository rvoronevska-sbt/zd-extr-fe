function Mr(...o){if(o){let e=[];for(let r=0;r<o.length;r++){let n=o[r];if(!n)continue;let t=typeof n;if(t==="string"||t==="number")e.push(n);else if(t==="object"){let d=Array.isArray(n)?[Mr(...n)]:Object.entries(n).map(([a,i])=>i?a:void 0);e=d.length?e.concat(d.filter(a=>!!a)):e}}return e.join(" ").trim()}}function qr(o,e){return o?o.classList?o.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(o.className):!1}function ce(o,e){if(o&&e){let r=n=>{qr(o,n)||(o.classList?o.classList.add(n):o.className+=" "+n)};[e].flat().filter(Boolean).forEach(n=>n.split(" ").forEach(r))}}function Vr(){return window.innerWidth-document.documentElement.offsetWidth}function Tf(o){typeof o=="string"?ce(document.body,o||"p-overflow-hidden"):(o!=null&&o.variableName&&document.body.style.setProperty(o.variableName,Vr()+"px"),ce(document.body,(o==null?void 0:o.className)||"p-overflow-hidden"))}function Xr(o){if(o){let e=document.createElement("a");if(e.download!==void 0){let{name:r,src:n}=o;return e.setAttribute("href",n),e.setAttribute("download",r),e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e),!0}}return!1}function Af(o,e){let r=new Blob([o],{type:"application/csv;charset=utf-8;"});window.navigator.msSaveOrOpenBlob?navigator.msSaveOrOpenBlob(r,e+".csv"):Xr({name:e+".csv",src:URL.createObjectURL(r)})||(o="data:text/csv;charset=utf-8,"+o,window.open(encodeURI(o)))}function se(o,e){if(o&&e){let r=n=>{o.classList?o.classList.remove(n):o.className=o.className.replace(new RegExp("(^|\\b)"+n.split(" ").join("|")+"(\\b|$)","gi")," ")};[e].flat().filter(Boolean).forEach(n=>n.split(" ").forEach(r))}}function Df(o){typeof o=="string"?se(document.body,o||"p-overflow-hidden"):(o!=null&&o.variableName&&document.body.style.removeProperty(o.variableName),se(document.body,(o==null?void 0:o.className)||"p-overflow-hidden"))}function Mo(o){for(let e of document==null?void 0:document.styleSheets)try{for(let r of e==null?void 0:e.cssRules)for(let n of r==null?void 0:r.style)if(o.test(n))return{name:n,value:r.style.getPropertyValue(n).trim()}}catch{}return null}function We(o){let e={width:0,height:0};if(o){let[r,n]=[o.style.visibility,o.style.display],t=o.getBoundingClientRect();o.style.visibility="hidden",o.style.display="block",e.width=t.width||o.offsetWidth,e.height=t.height||o.offsetHeight,o.style.display=n,o.style.visibility=r}return e}function Ue(){let o=window,e=document,r=e.documentElement,n=e.getElementsByTagName("body")[0],t=o.innerWidth||r.clientWidth||n.clientWidth,d=o.innerHeight||r.clientHeight||n.clientHeight;return{width:t,height:d}}function qo(o){return o?Math.abs(o.scrollLeft):0}function Yr(){let o=document.documentElement;return(window.pageXOffset||qo(o))-(o.clientLeft||0)}function Kr(){let o=document.documentElement;return(window.pageYOffset||o.scrollTop)-(o.clientTop||0)}function Jr(o){return o?getComputedStyle(o).direction==="rtl":!1}function Nf(o,e,r=!0){var n,t,d,a;if(o){let i=o.offsetParent?{width:o.offsetWidth,height:o.offsetHeight}:We(o),l=i.height,c=i.width,s=e.offsetHeight,b=e.offsetWidth,g=e.getBoundingClientRect(),m=Kr(),p=Yr(),h=Ue(),f,v,y="top";g.top+s+l>h.height?(f=g.top+m-l,y="bottom",f<0&&(f=m)):f=s+g.top+m,g.left+c>h.width?v=Math.max(0,g.left+p+b-c):v=g.left+p,Jr(o)?o.style.insetInlineEnd=v+"px":o.style.insetInlineStart=v+"px",o.style.top=f+"px",o.style.transformOrigin=y,r&&(o.style.marginTop=y==="bottom"?`calc(${(t=(n=Mo(/-anchor-gutter$/))==null?void 0:n.value)!=null?t:"2px"} * -1)`:(a=(d=Mo(/-anchor-gutter$/))==null?void 0:d.value)!=null?a:"")}}function Lf(o,e){o&&(typeof e=="string"?o.style.cssText=e:Object.entries(e||{}).forEach(([r,n])=>o.style[r]=n))}function Pf(o,e){return o instanceof HTMLElement?o.offsetWidth:0}function Ff(o,e,r=!0,n=void 0){var t;if(o){let d=o.offsetParent?{width:o.offsetWidth,height:o.offsetHeight}:We(o),a=e.offsetHeight,i=e.getBoundingClientRect(),l=Ue(),c,s,b=n??"top";if(!n&&i.top+a+d.height>l.height?(c=-1*d.height,b="bottom",i.top+c<0&&(c=-1*i.top)):c=a,d.width>l.width?s=i.left*-1:i.left+d.width>l.width?s=(i.left+d.width-l.width)*-1:s=0,o.style.top=c+"px",o.style.insetInlineStart=s+"px",o.style.transformOrigin=b,r){let g=(t=Mo(/-anchor-gutter$/))==null?void 0:t.value;o.style.marginTop=b==="bottom"?`calc(${g??"2px"} * -1)`:g??""}}}function ee(o){if(o){let e=o.parentNode;return e&&e instanceof ShadowRoot&&e.host&&(e=e.host),e}return null}function _f(o){return!!(o!==null&&typeof o<"u"&&o.nodeName&&ee(o))}function po(o){return typeof Element<"u"?o instanceof Element:o!==null&&typeof o=="object"&&o.nodeType===1&&typeof o.nodeName=="string"}function jf(){if(window.getSelection){let o=window.getSelection()||{};o.empty?o.empty():o.removeAllRanges&&o.rangeCount>0&&o.getRangeAt(0).getClientRects().length>0&&o.removeAllRanges()}}function He(o,e={}){if(po(o)){let r=(n,t)=>{var d,a;let i=(d=o==null?void 0:o.$attrs)!=null&&d[n]?[(a=o==null?void 0:o.$attrs)==null?void 0:a[n]]:[];return[t].flat().reduce((l,c)=>{if(c!=null){let s=typeof c;if(s==="string"||s==="number")l.push(c);else if(s==="object"){let b=Array.isArray(c)?r(n,c):Object.entries(c).map(([g,m])=>n==="style"&&(m||m===0)?`${g.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}:${m}`:m?g:void 0);l=b.length?l.concat(b.filter(g=>!!g)):l}}return l},i)};Object.entries(e).forEach(([n,t])=>{if(t!=null){let d=n.match(/^on(.+)/);d?o.addEventListener(d[1].toLowerCase(),t):n==="p-bind"||n==="pBind"?He(o,t):(t=n==="class"?[...new Set(r("class",t))].join(" ").trim():n==="style"?r("style",t).join(";").trim():t,(o.$attrs=o.$attrs||{})&&(o.$attrs[n]=t),o.setAttribute(n,t))}})}}function If(o,e={},...r){{let n=document.createElement(o);return He(n,e),n.append(...r),n}}function Gr(o,e){return po(o)?Array.from(o.querySelectorAll(e)):[]}function Zr(o,e){return po(o)?o.matches(e)?o:o.querySelector(e):null}function Wf(o,e){o&&document.activeElement!==o&&o.focus(e)}function Uf(o,e){if(po(o)){let r=o.getAttribute(e);return isNaN(r)?r==="true"||r==="false"?r==="true":r:+r}}function Me(o,e=""){let r=Gr(o,`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [href]:not([tabindex = "-1"]):not([style*="display:none"]):not([hidden])${e},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`),n=[];for(let t of r)getComputedStyle(t).display!="none"&&getComputedStyle(t).visibility!="hidden"&&n.push(t);return n}function Hf(o,e){let r=Me(o,e);return r.length>0?r[0]:null}function Mf(o){if(o){let e=o.offsetHeight,r=getComputedStyle(o);return e-=parseFloat(r.paddingTop)+parseFloat(r.paddingBottom)+parseFloat(r.borderTopWidth)+parseFloat(r.borderBottomWidth),e}return 0}function qf(o){if(o){let[e,r]=[o.style.visibility,o.style.display];o.style.visibility="hidden",o.style.display="block";let n=o.offsetHeight;return o.style.display=r,o.style.visibility=e,n}return 0}function Vf(o){if(o){let[e,r]=[o.style.visibility,o.style.display];o.style.visibility="hidden",o.style.display="block";let n=o.offsetWidth;return o.style.display=r,o.style.visibility=e,n}return 0}function Xf(o){var e;if(o){let r=(e=ee(o))==null?void 0:e.childNodes,n=0;if(r)for(let t=0;t<r.length;t++){if(r[t]===o)return n;r[t].nodeType===1&&n++}}return-1}function Yf(o,e){let r=Me(o,e);return r.length>0?r[r.length-1]:null}function Kf(o,e){let r=o.nextElementSibling;for(;r;){if(r.matches(e))return r;r=r.nextElementSibling}return null}function Jf(o){if(o){let e=o.getBoundingClientRect();return{top:e.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:e.left+(window.pageXOffset||qo(document.documentElement)||qo(document.body)||0)}}return{top:"auto",left:"auto"}}function Gf(o,e){return o?o.offsetHeight:0}function qe(o,e=[]){let r=ee(o);return r===null?e:qe(r,e.concat([r]))}function Zf(o,e){let r=o.previousElementSibling;for(;r;){if(r.matches(e))return r;r=r.previousElementSibling}return null}function Qf(o){let e=[];if(o){let r=qe(o),n=/(auto|scroll)/,t=d=>{try{let a=window.getComputedStyle(d,null);return n.test(a.getPropertyValue("overflow"))||n.test(a.getPropertyValue("overflowX"))||n.test(a.getPropertyValue("overflowY"))}catch{return!1}};for(let d of r){let a=d.nodeType===1&&d.dataset.scrollselectors;if(a){let i=a.split(",");for(let l of i){let c=Zr(d,l);c&&t(c)&&e.push(c)}}d.nodeType!==9&&t(d)&&e.push(d)}}return e}function og(){if(window.getSelection)return window.getSelection().toString();if(document.getSelection)return document.getSelection().toString()}function eg(o){if(o){let e=o.offsetWidth,r=getComputedStyle(o);return e-=parseFloat(r.paddingLeft)+parseFloat(r.paddingRight)+parseFloat(r.borderLeftWidth)+parseFloat(r.borderRightWidth),e}return 0}function rg(o,e,r){let n=o[e];typeof n=="function"&&n.apply(o,[])}function ng(){return/(android)/i.test(navigator.userAgent)}function tg(o){if(o){let e=o.nodeName,r=o.parentElement&&o.parentElement.nodeName;return e==="INPUT"||e==="TEXTAREA"||e==="BUTTON"||e==="A"||r==="INPUT"||r==="TEXTAREA"||r==="BUTTON"||r==="A"||!!o.closest(".p-button, .p-checkbox, .p-radiobutton")}return!1}function ag(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function dg(o,e=""){return po(o)?o.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`):!1}function ig(o){return!!(o&&o.offsetParent!=null)}function lg(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}function cg(o,e="",r){po(o)&&r!==null&&r!==void 0&&o.setAttribute(e,r)}function Qr(){let o=new Map;return{on(e,r){let n=o.get(e);return n?n.push(r):n=[r],o.set(e,n),this},off(e,r){let n=o.get(e);return n&&n.splice(n.indexOf(r)>>>0,1),this},emit(e,r){let n=o.get(e);n&&n.forEach(t=>{t(r)})},clear(){o.clear()}}}var on=Object.defineProperty,ue=Object.getOwnPropertySymbols,en=Object.prototype.hasOwnProperty,rn=Object.prototype.propertyIsEnumerable,pe=(o,e,r)=>e in o?on(o,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):o[e]=r,nn=(o,e)=>{for(var r in e||(e={}))en.call(e,r)&&pe(o,r,e[r]);if(ue)for(var r of ue(e))rn.call(e,r)&&pe(o,r,e[r]);return o};function ao(o){return o==null||o===""||Array.isArray(o)&&o.length===0||!(o instanceof Date)&&typeof o=="object"&&Object.keys(o).length===0}function tn(o,e,r,n=1){let t=-1,d=ao(o),a=ao(e);return d&&a?t=0:d?t=n:a?t=-n:typeof o=="string"&&typeof e=="string"?t=r(o,e):t=o<e?-1:o>e?1:0,t}function Vo(o,e,r=new WeakSet){if(o===e)return!0;if(!o||!e||typeof o!="object"||typeof e!="object"||r.has(o)||r.has(e))return!1;r.add(o).add(e);let n=Array.isArray(o),t=Array.isArray(e),d,a,i;if(n&&t){if(a=o.length,a!=e.length)return!1;for(d=a;d--!==0;)if(!Vo(o[d],e[d],r))return!1;return!0}if(n!=t)return!1;let l=o instanceof Date,c=e instanceof Date;if(l!=c)return!1;if(l&&c)return o.getTime()==e.getTime();let s=o instanceof RegExp,b=e instanceof RegExp;if(s!=b)return!1;if(s&&b)return o.toString()==e.toString();let g=Object.keys(o);if(a=g.length,a!==Object.keys(e).length)return!1;for(d=a;d--!==0;)if(!Object.prototype.hasOwnProperty.call(e,g[d]))return!1;for(d=a;d--!==0;)if(i=g[d],!Vo(o[i],e[i],r))return!1;return!0}function an(o,e){return Vo(o,e)}function Ve(o){return typeof o=="function"&&"call"in o&&"apply"in o}function x(o){return!ao(o)}function be(o,e){if(!o||!e)return null;try{let r=o[e];if(x(r))return r}catch{}if(Object.keys(o).length){if(Ve(e))return e(o);if(e.indexOf(".")===-1)return o[e];{let r=e.split("."),n=o;for(let t=0,d=r.length;t<d;++t){if(n==null)return null;n=n[r[t]]}return n}}return null}function dn(o,e,r){return r?be(o,r)===be(e,r):an(o,e)}function sg(o,e){if(o!=null&&e&&e.length){for(let r of e)if(dn(o,r))return!0}return!1}function V(o,e=!0){return o instanceof Object&&o.constructor===Object&&(e||Object.keys(o).length!==0)}function Xe(o={},e={}){let r=nn({},o);return Object.keys(e).forEach(n=>{let t=n;V(e[t])&&t in o&&V(o[t])?r[t]=Xe(o[t],e[t]):r[t]=e[t]}),r}function ln(...o){return o.reduce((e,r,n)=>n===0?r:Xe(e,r),{})}function ug(o,e){let r=-1;if(e){for(let n=0;n<e.length;n++)if(e[n]===o){r=n;break}}return r}function pg(o,e){let r=-1;if(x(o))try{r=o.findLastIndex(e)}catch{r=o.lastIndexOf([...o].reverse().find(e))}return r}function q(o,...e){return Ve(o)?o(...e):o}function Y(o,e=!0){return typeof o=="string"&&(e||o!=="")}function fe(o){return Y(o)?o.replace(/(-|_)/g,"").toLowerCase():o}function cn(o,e="",r={}){let n=fe(e).split("."),t=n.shift();if(t){if(V(o)){let d=Object.keys(o).find(a=>fe(a)===t)||"";return cn(q(o[d],r),n.join("."),r)}return}return q(o,r)}function bg(o,e=!0){return Array.isArray(o)&&(e||o.length!==0)}function fg(o){return o instanceof Date}function sn(o){return x(o)&&!isNaN(o)}function gg(o=""){return x(o)&&o.length===1&&!!o.match(/\S| /)}function hg(){return new Intl.Collator(void 0,{numeric:!0}).compare}function no(o,e){if(e){let r=e.test(o);return e.lastIndex=0,r}return!1}function mg(...o){return ln(...o)}function ge(o){return o&&o.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g,"").replace(/ {2,}/g," ").replace(/ ([{:}]) /g,"$1").replace(/([;,]) /g,"$1").replace(/ !/g,"!").replace(/: /g,":").trim()}function kg(o){if(o&&/[\xC0-\xFF\u0100-\u017E]/.test(o)){let e={A:/[\xC0-\xC5\u0100\u0102\u0104]/g,AE:/[\xC6]/g,C:/[\xC7\u0106\u0108\u010A\u010C]/g,D:/[\xD0\u010E\u0110]/g,E:/[\xC8-\xCB\u0112\u0114\u0116\u0118\u011A]/g,G:/[\u011C\u011E\u0120\u0122]/g,H:/[\u0124\u0126]/g,I:/[\xCC-\xCF\u0128\u012A\u012C\u012E\u0130]/g,IJ:/[\u0132]/g,J:/[\u0134]/g,K:/[\u0136]/g,L:/[\u0139\u013B\u013D\u013F\u0141]/g,N:/[\xD1\u0143\u0145\u0147\u014A]/g,O:/[\xD2-\xD6\xD8\u014C\u014E\u0150]/g,OE:/[\u0152]/g,R:/[\u0154\u0156\u0158]/g,S:/[\u015A\u015C\u015E\u0160]/g,T:/[\u0162\u0164\u0166]/g,U:/[\xD9-\xDC\u0168\u016A\u016C\u016E\u0170\u0172]/g,W:/[\u0174]/g,Y:/[\xDD\u0176\u0178]/g,Z:/[\u0179\u017B\u017D]/g,a:/[\xE0-\xE5\u0101\u0103\u0105]/g,ae:/[\xE6]/g,c:/[\xE7\u0107\u0109\u010B\u010D]/g,d:/[\u010F\u0111]/g,e:/[\xE8-\xEB\u0113\u0115\u0117\u0119\u011B]/g,g:/[\u011D\u011F\u0121\u0123]/g,i:/[\xEC-\xEF\u0129\u012B\u012D\u012F\u0131]/g,ij:/[\u0133]/g,j:/[\u0135]/g,k:/[\u0137,\u0138]/g,l:/[\u013A\u013C\u013E\u0140\u0142]/g,n:/[\xF1\u0144\u0146\u0148\u014B]/g,p:/[\xFE]/g,o:/[\xF2-\xF6\xF8\u014D\u014F\u0151]/g,oe:/[\u0153]/g,r:/[\u0155\u0157\u0159]/g,s:/[\u015B\u015D\u015F\u0161]/g,t:/[\u0163\u0165\u0167]/g,u:/[\xF9-\xFC\u0169\u016B\u016D\u016F\u0171\u0173]/g,w:/[\u0175]/g,y:/[\xFD\xFF\u0177]/g,z:/[\u017A\u017C\u017E]/g};for(let r in e)o=o.replace(e[r],r)}return o}function vg(o,e,r){o&&e!==r&&(r>=o.length&&(r%=o.length,e%=o.length),o.splice(r,0,o.splice(e,1)[0]))}function yg(o,e,r=1,n,t=1){let d=tn(o,e,n,r),a=r;return(ao(o)||ao(e))&&(a=t===1?r:t),a*d}function wg(o){return Y(o,!1)?o[0].toUpperCase()+o.slice(1):o}function Ye(o){return Y(o)?o.replace(/(_)/g,"-").replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase():o}var $o={};function xg(o="pui_id_"){return Object.hasOwn($o,o)||($o[o]=0),$o[o]++,`${o}${$o[o]}`}function un(){let o=[],e=(a,i,l=999)=>{let c=t(a,i,l),s=c.value+(c.key===a?0:l)+1;return o.push({key:a,value:s}),s},r=a=>{o=o.filter(i=>i.value!==a)},n=(a,i)=>t(a).value,t=(a,i,l=0)=>[...o].reverse().find(c=>!0)||{key:a,value:l},d=a=>a&&parseInt(a.style.zIndex,10)||0;return{get:d,set:(a,i,l)=>{i&&(i.style.zIndex=String(e(a,!0,l)))},clear:a=>{a&&(r(d(a)),a.style.zIndex="")},getCurrent:a=>n(a)}}var Cg=un(),pn=Object.defineProperty,bn=Object.defineProperties,fn=Object.getOwnPropertyDescriptors,Eo=Object.getOwnPropertySymbols,Ke=Object.prototype.hasOwnProperty,Je=Object.prototype.propertyIsEnumerable,he=(o,e,r)=>e in o?pn(o,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):o[e]=r,j=(o,e)=>{for(var r in e||(e={}))Ke.call(e,r)&&he(o,r,e[r]);if(Eo)for(var r of Eo(e))Je.call(e,r)&&he(o,r,e[r]);return o},Po=(o,e)=>bn(o,fn(e)),M=(o,e)=>{var r={};for(var n in o)Ke.call(o,n)&&e.indexOf(n)<0&&(r[n]=o[n]);if(o!=null&&Eo)for(var n of Eo(o))e.indexOf(n)<0&&Je.call(o,n)&&(r[n]=o[n]);return r},gn=Qr(),eo=gn,mo=/{([^}]*)}/g,Ge=/(\d+\s+[\+\-\*\/]\s+\d+)/g,Ze=/var\([^)]+\)/g;function me(o){return Y(o)?o.replace(/[A-Z]/g,(e,r)=>r===0?e:"."+e.toLowerCase()).toLowerCase():o}function hn(o){return V(o)&&o.hasOwnProperty("$value")&&o.hasOwnProperty("$type")?o.$value:o}function mn(o){return o.replaceAll(/ /g,"").replace(/[^\w]/g,"-")}function Xo(o="",e=""){return mn(`${Y(o,!1)&&Y(e,!1)?`${o}-`:o}${e}`)}function Qe(o="",e=""){return`--${Xo(o,e)}`}function kn(o=""){let e=(o.match(/{/g)||[]).length,r=(o.match(/}/g)||[]).length;return(e+r)%2!==0}function or(o,e="",r="",n=[],t){if(Y(o)){let d=o.trim();if(kn(d))return;if(no(d,mo)){let a=d.replaceAll(mo,i=>{let l=i.replace(/{|}/g,"").split(".").filter(c=>!n.some(s=>no(c,s)));return`var(${Qe(r,Ye(l.join("-")))}${x(t)?`, ${t}`:""})`});return no(a.replace(Ze,"0"),Ge)?`calc(${a})`:a}return d}else if(sn(o))return o}function vn(o,e,r){Y(e,!1)&&o.push(`${e}:${r};`)}function so(o,e){return o?`${o}{${e}}`:""}function er(o,e){if(o.indexOf("dt(")===-1)return o;function r(a,i){let l=[],c=0,s="",b=null,g=0;for(;c<=a.length;){let m=a[c];if((m==='"'||m==="'"||m==="`")&&a[c-1]!=="\\"&&(b=b===m?null:m),!b&&(m==="("&&g++,m===")"&&g--,(m===","||c===a.length)&&g===0)){let p=s.trim();p.startsWith("dt(")?l.push(er(p,i)):l.push(n(p)),s="",c++;continue}m!==void 0&&(s+=m),c++}return l}function n(a){let i=a[0];if((i==='"'||i==="'"||i==="`")&&a[a.length-1]===i)return a.slice(1,-1);let l=Number(a);return isNaN(l)?a:l}let t=[],d=[];for(let a=0;a<o.length;a++)if(o[a]==="d"&&o.slice(a,a+3)==="dt(")d.push(a),a+=2;else if(o[a]===")"&&d.length>0){let i=d.pop();d.length===0&&t.push([i,a])}if(!t.length)return o;for(let a=t.length-1;a>=0;a--){let[i,l]=t[a],c=o.slice(i+3,l),s=r(c,e),b=e(...s);o=o.slice(0,i)+b+o.slice(l+1)}return o}var $g=o=>{var e;let r=ko.getTheme(),n=Yo(r,o,void 0,"variable"),t=(e=n==null?void 0:n.match(/--[\w-]+/g))==null?void 0:e[0],d=Yo(r,o,void 0,"value");return{name:t,variable:n,value:d}},ho=(...o)=>Yo(ko.getTheme(),...o),Yo=(o={},e,r,n)=>{if(e){let{variable:t,options:d}=ko.defaults||{},{prefix:a,transform:i}=(o==null?void 0:o.options)||d||{},l=no(e,mo)?e:`{${e}}`;return n==="value"||ao(n)&&i==="strict"?ko.getTokenValue(e):or(l,void 0,a,[t.excludedKeyRegex],r)}return""};function Bg(o,...e){if(o instanceof Array){let r=o.reduce((n,t,d)=>{var a;return n+t+((a=q(e[d],{dt:ho}))!=null?a:"")},"");return er(r,ho)}return q(o,{dt:ho})}function yn(o,e={}){let r=ko.defaults.variable,{prefix:n=r.prefix,selector:t=r.selector,excludedKeyRegex:d=r.excludedKeyRegex}=e,a=[],i=[],l=[{node:o,path:n}];for(;l.length;){let{node:s,path:b}=l.pop();for(let g in s){let m=s[g],p=hn(m),h=no(g,d)?Xo(b):Xo(b,Ye(g));if(V(p))l.push({node:p,path:h});else{let f=Qe(h),v=or(p,h,n,[d]);vn(i,f,v);let y=h;n&&y.startsWith(n+"-")&&(y=y.slice(n.length+1)),a.push(y.replace(/-/g,"."))}}}let c=i.join("");return{value:i,tokens:a,declarations:c,css:so(t,c)}}var _={regex:{rules:{class:{pattern:/^\.([a-zA-Z][\w-]*)$/,resolve(o){return{type:"class",selector:o,matched:this.pattern.test(o.trim())}}},attr:{pattern:/^\[(.*)\]$/,resolve(o){return{type:"attr",selector:`:root${o},:host${o}`,matched:this.pattern.test(o.trim())}}},media:{pattern:/^@media (.*)$/,resolve(o){return{type:"media",selector:o,matched:this.pattern.test(o.trim())}}},system:{pattern:/^system$/,resolve(o){return{type:"system",selector:"@media (prefers-color-scheme: dark)",matched:this.pattern.test(o.trim())}}},custom:{resolve(o){return{type:"custom",selector:o,matched:!0}}}},resolve(o){let e=Object.keys(this.rules).filter(r=>r!=="custom").map(r=>this.rules[r]);return[o].flat().map(r=>{var n;return(n=e.map(t=>t.resolve(r)).find(t=>t.matched))!=null?n:this.rules.custom.resolve(r)})}},_toVariables(o,e){return yn(o,{prefix:e==null?void 0:e.prefix})},getCommon({name:o="",theme:e={},params:r,set:n,defaults:t}){var d,a,i,l,c,s,b;let{preset:g,options:m}=e,p,h,f,v,y,w,$;if(x(g)&&m.transform!=="strict"){let{primitive:S,semantic:N,extend:R}=g,W=N||{},{colorScheme:U}=W,K=M(W,["colorScheme"]),J=R||{},{colorScheme:H}=J,P=M(J,["colorScheme"]),T=U||{},{dark:G}=T,B=M(T,["dark"]),Z=H||{},{dark:A}=Z,Q=M(Z,["dark"]),lo=x(S)?this._toVariables({primitive:S},m):{},D=x(K)?this._toVariables({semantic:K},m):{},F=x(B)?this._toVariables({light:B},m):{},co=x(G)?this._toVariables({dark:G},m):{},oo=x(P)?this._toVariables({semantic:P},m):{},fo=x(Q)?this._toVariables({light:Q},m):{},le=x(A)?this._toVariables({dark:A},m):{},[Rr,Sr]=[(d=lo.declarations)!=null?d:"",lo.tokens],[zr,Er]=[(a=D.declarations)!=null?a:"",D.tokens||[]],[Or,Tr]=[(i=F.declarations)!=null?i:"",F.tokens||[]],[Ar,Dr]=[(l=co.declarations)!=null?l:"",co.tokens||[]],[Nr,Lr]=[(c=oo.declarations)!=null?c:"",oo.tokens||[]],[Pr,Fr]=[(s=fo.declarations)!=null?s:"",fo.tokens||[]],[_r,jr]=[(b=le.declarations)!=null?b:"",le.tokens||[]];p=this.transformCSS(o,Rr,"light","variable",m,n,t),h=Sr;let Ir=this.transformCSS(o,`${zr}${Or}`,"light","variable",m,n,t),Wr=this.transformCSS(o,`${Ar}`,"dark","variable",m,n,t);f=`${Ir}${Wr}`,v=[...new Set([...Er,...Tr,...Dr])];let Ur=this.transformCSS(o,`${Nr}${Pr}color-scheme:light`,"light","variable",m,n,t),Hr=this.transformCSS(o,`${_r}color-scheme:dark`,"dark","variable",m,n,t);y=`${Ur}${Hr}`,w=[...new Set([...Lr,...Fr,...jr])],$=q(g.css,{dt:ho})}return{primitive:{css:p,tokens:h},semantic:{css:f,tokens:v},global:{css:y,tokens:w},style:$}},getPreset({name:o="",preset:e={},options:r,params:n,set:t,defaults:d,selector:a}){var i,l,c;let s,b,g;if(x(e)&&r.transform!=="strict"){let m=o.replace("-directive",""),p=e,{colorScheme:h,extend:f,css:v}=p,y=M(p,["colorScheme","extend","css"]),w=f||{},{colorScheme:$}=w,S=M(w,["colorScheme"]),N=h||{},{dark:R}=N,W=M(N,["dark"]),U=$||{},{dark:K}=U,J=M(U,["dark"]),H=x(y)?this._toVariables({[m]:j(j({},y),S)},r):{},P=x(W)?this._toVariables({[m]:j(j({},W),J)},r):{},T=x(R)?this._toVariables({[m]:j(j({},R),K)},r):{},[G,B]=[(i=H.declarations)!=null?i:"",H.tokens||[]],[Z,A]=[(l=P.declarations)!=null?l:"",P.tokens||[]],[Q,lo]=[(c=T.declarations)!=null?c:"",T.tokens||[]],D=this.transformCSS(m,`${G}${Z}`,"light","variable",r,t,d,a),F=this.transformCSS(m,Q,"dark","variable",r,t,d,a);s=`${D}${F}`,b=[...new Set([...B,...A,...lo])],g=q(v,{dt:ho})}return{css:s,tokens:b,style:g}},getPresetC({name:o="",theme:e={},params:r,set:n,defaults:t}){var d;let{preset:a,options:i}=e,l=(d=a==null?void 0:a.components)==null?void 0:d[o];return this.getPreset({name:o,preset:l,options:i,params:r,set:n,defaults:t})},getPresetD({name:o="",theme:e={},params:r,set:n,defaults:t}){var d,a;let i=o.replace("-directive",""),{preset:l,options:c}=e,s=((d=l==null?void 0:l.components)==null?void 0:d[i])||((a=l==null?void 0:l.directives)==null?void 0:a[i]);return this.getPreset({name:i,preset:s,options:c,params:r,set:n,defaults:t})},applyDarkColorScheme(o){return!(o.darkModeSelector==="none"||o.darkModeSelector===!1)},getColorSchemeOption(o,e){var r;return this.applyDarkColorScheme(o)?this.regex.resolve(o.darkModeSelector===!0?e.options.darkModeSelector:(r=o.darkModeSelector)!=null?r:e.options.darkModeSelector):[]},getLayerOrder(o,e={},r,n){let{cssLayer:t}=e;return t?`@layer ${q(t.order||t.name||"primeui",r)}`:""},getCommonStyleSheet({name:o="",theme:e={},params:r,props:n={},set:t,defaults:d}){let a=this.getCommon({name:o,theme:e,params:r,set:t,defaults:d}),i=Object.entries(n).reduce((l,[c,s])=>l.push(`${c}="${s}"`)&&l,[]).join(" ");return Object.entries(a||{}).reduce((l,[c,s])=>{if(V(s)&&Object.hasOwn(s,"css")){let b=ge(s.css),g=`${c}-variables`;l.push(`<style type="text/css" data-primevue-style-id="${g}" ${i}>${b}</style>`)}return l},[]).join("")},getStyleSheet({name:o="",theme:e={},params:r,props:n={},set:t,defaults:d}){var a;let i={name:o,theme:e,params:r,set:t,defaults:d},l=(a=o.includes("-directive")?this.getPresetD(i):this.getPresetC(i))==null?void 0:a.css,c=Object.entries(n).reduce((s,[b,g])=>s.push(`${b}="${g}"`)&&s,[]).join(" ");return l?`<style type="text/css" data-primevue-style-id="${o}-variables" ${c}>${ge(l)}</style>`:""},createTokens(o={},e,r="",n="",t={}){let d=function(i,l={},c=[]){if(c.includes(this.path))return console.warn(`Circular reference detected at ${this.path}`),{colorScheme:i,path:this.path,paths:l,value:void 0};c.push(this.path),l.name=this.path,l.binding||(l.binding={});let s=this.value;if(typeof this.value=="string"&&mo.test(this.value)){let b=this.value.trim().replace(mo,g=>{var m;let p=g.slice(1,-1),h=this.tokens[p];if(!h)return console.warn(`Token not found for path: ${p}`),"__UNRESOLVED__";let f=h.computed(i,l,c);return Array.isArray(f)&&f.length===2?`light-dark(${f[0].value},${f[1].value})`:(m=f==null?void 0:f.value)!=null?m:"__UNRESOLVED__"});s=Ge.test(b.replace(Ze,"0"))?`calc(${b})`:b}return ao(l.binding)&&delete l.binding,c.pop(),{colorScheme:i,path:this.path,paths:l,value:s.includes("__UNRESOLVED__")?void 0:s}},a=(i,l,c)=>{Object.entries(i).forEach(([s,b])=>{let g=no(s,e.variable.excludedKeyRegex)?l:l?`${l}.${me(s)}`:me(s),m=c?`${c}.${s}`:s;V(b)?a(b,g,m):(t[g]||(t[g]={paths:[],computed:(p,h={},f=[])=>{if(t[g].paths.length===1)return t[g].paths[0].computed(t[g].paths[0].scheme,h.binding,f);if(p&&p!=="none")for(let v=0;v<t[g].paths.length;v++){let y=t[g].paths[v];if(y.scheme===p)return y.computed(p,h.binding,f)}return t[g].paths.map(v=>v.computed(v.scheme,h[v.scheme],f))}}),t[g].paths.push({path:m,value:b,scheme:m.includes("colorScheme.light")?"light":m.includes("colorScheme.dark")?"dark":"none",computed:d,tokens:t}))})};return a(o,r,n),t},getTokenValue(o,e,r){var n;let t=(i=>i.split(".").filter(l=>!no(l.toLowerCase(),r.variable.excludedKeyRegex)).join("."))(e),d=e.includes("colorScheme.light")?"light":e.includes("colorScheme.dark")?"dark":void 0,a=[(n=o[t])==null?void 0:n.computed(d)].flat().filter(i=>i);return a.length===1?a[0].value:a.reduce((i={},l)=>{let c=l,{colorScheme:s}=c,b=M(c,["colorScheme"]);return i[s]=b,i},void 0)},getSelectorRule(o,e,r,n){return r==="class"||r==="attr"?so(x(e)?`${o}${e},${o} ${e}`:o,n):so(o,so(e??":root,:host",n))},transformCSS(o,e,r,n,t={},d,a,i){if(x(e)){let{cssLayer:l}=t;if(n!=="style"){let c=this.getColorSchemeOption(t,a);e=r==="dark"?c.reduce((s,{type:b,selector:g})=>(x(g)&&(s+=g.includes("[CSS]")?g.replace("[CSS]",e):this.getSelectorRule(g,i,b,e)),s),""):so(i??":root,:host",e)}if(l){let c={name:"primeui"};V(l)&&(c.name=q(l.name,{name:o,type:n})),x(c.name)&&(e=so(`@layer ${c.name}`,e),d==null||d.layerNames(c.name))}return e}return""}},ko={defaults:{variable:{prefix:"p",selector:":root,:host",excludedKeyRegex:/^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi},options:{prefix:"p",darkModeSelector:"system",cssLayer:!1}},_theme:void 0,_layerNames:new Set,_loadedStyleNames:new Set,_loadingStyles:new Set,_tokens:{},update(o={}){let{theme:e}=o;e&&(this._theme=Po(j({},e),{options:j(j({},this.defaults.options),e.options)}),this._tokens=_.createTokens(this.preset,this.defaults),this.clearLoadedStyleNames())},get theme(){return this._theme},get preset(){var o;return((o=this.theme)==null?void 0:o.preset)||{}},get options(){var o;return((o=this.theme)==null?void 0:o.options)||{}},get tokens(){return this._tokens},getTheme(){return this.theme},setTheme(o){this.update({theme:o}),eo.emit("theme:change",o)},getPreset(){return this.preset},setPreset(o){this._theme=Po(j({},this.theme),{preset:o}),this._tokens=_.createTokens(o,this.defaults),this.clearLoadedStyleNames(),eo.emit("preset:change",o),eo.emit("theme:change",this.theme)},getOptions(){return this.options},setOptions(o){this._theme=Po(j({},this.theme),{options:o}),this.clearLoadedStyleNames(),eo.emit("options:change",o),eo.emit("theme:change",this.theme)},getLayerNames(){return[...this._layerNames]},setLayerNames(o){this._layerNames.add(o)},getLoadedStyleNames(){return this._loadedStyleNames},isStyleNameLoaded(o){return this._loadedStyleNames.has(o)},setLoadedStyleName(o){this._loadedStyleNames.add(o)},deleteLoadedStyleName(o){this._loadedStyleNames.delete(o)},clearLoadedStyleNames(){this._loadedStyleNames.clear()},getTokenValue(o){return _.getTokenValue(this.tokens,o,this.defaults)},getCommon(o="",e){return _.getCommon({name:o,theme:this.theme,params:e,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},getComponent(o="",e){let r={name:o,theme:this.theme,params:e,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return _.getPresetC(r)},getDirective(o="",e){let r={name:o,theme:this.theme,params:e,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return _.getPresetD(r)},getCustomPreset(o="",e,r,n){let t={name:o,preset:e,options:this.options,selector:r,params:n,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return _.getPreset(t)},getLayerOrderCSS(o=""){return _.getLayerOrder(o,this.options,{names:this.getLayerNames()},this.defaults)},transformCSS(o="",e,r="style",n){return _.transformCSS(o,e,n,r,this.options,{layerNames:this.setLayerNames.bind(this)},this.defaults)},getCommonStyleSheet(o="",e,r={}){return _.getCommonStyleSheet({name:o,theme:this.theme,params:e,props:r,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},getStyleSheet(o,e,r={}){return _.getStyleSheet({name:o,theme:this.theme,params:e,props:r,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},onStyleMounted(o){this._loadingStyles.add(o)},onStyleUpdated(o){this._loadingStyles.add(o)},onStyleLoaded(o,{name:e}){this._loadingStyles.size&&(this._loadingStyles.delete(e),eo.emit(`theme:${e}:load`,o),!this._loadingStyles.size&&eo.emit("theme:load"))}},Rg=`
    *,
    ::before,
    ::after {
        box-sizing: border-box;
    }

    .p-collapsible-enter-active {
        animation: p-animate-collapsible-expand 0.2s ease-out;
        overflow: hidden;
    }

    .p-collapsible-leave-active {
        animation: p-animate-collapsible-collapse 0.2s ease-out;
        overflow: hidden;
    }

    @keyframes p-animate-collapsible-expand {
        from {
            grid-template-rows: 0fr;
        }
        to {
            grid-template-rows: 1fr;
        }
    }

    @keyframes p-animate-collapsible-collapse {
        from {
            grid-template-rows: 1fr;
        }
        to {
            grid-template-rows: 0fr;
        }
    }

    .p-disabled,
    .p-disabled * {
        cursor: default;
        pointer-events: none;
        user-select: none;
    }

    .p-disabled,
    .p-component:disabled {
        opacity: dt('disabled.opacity');
    }

    .pi {
        font-size: dt('icon.size');
    }

    .p-icon {
        width: dt('icon.size');
        height: dt('icon.size');
    }

    .p-overlay-mask {
        background: var(--px-mask-background, dt('mask.background'));
        color: dt('mask.color');
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .p-overlay-mask-enter-active {
        animation: p-animate-overlay-mask-enter dt('mask.transition.duration') forwards;
    }

    .p-overlay-mask-leave-active {
        animation: p-animate-overlay-mask-leave dt('mask.transition.duration') forwards;
    }

    @keyframes p-animate-overlay-mask-enter {
        from {
            background: transparent;
        }
        to {
            background: var(--px-mask-background, dt('mask.background'));
        }
    }
    @keyframes p-animate-overlay-mask-leave {
        from {
            background: var(--px-mask-background, dt('mask.background'));
        }
        to {
            background: transparent;
        }
    }

    .p-anchored-overlay-enter-active {
        animation: p-animate-anchored-overlay-enter 300ms cubic-bezier(.19,1,.22,1);
    }

    .p-anchored-overlay-leave-active {
        animation: p-animate-anchored-overlay-leave 300ms cubic-bezier(.19,1,.22,1);
    }

    @keyframes p-animate-anchored-overlay-enter {
        from {
            opacity: 0;
            transform: scale(0.93);
        }
    }

    @keyframes p-animate-anchored-overlay-leave {
        to {
            opacity: 0;
            transform: scale(0.93);
        }
    }
`,Sg=`
    .p-badge {
        display: inline-flex;
        border-radius: dt('badge.border.radius');
        align-items: center;
        justify-content: center;
        padding: dt('badge.padding');
        background: dt('badge.primary.background');
        color: dt('badge.primary.color');
        font-size: dt('badge.font.size');
        font-weight: dt('badge.font.weight');
        min-width: dt('badge.min.width');
        height: dt('badge.height');
    }

    .p-badge-dot {
        width: dt('badge.dot.size');
        min-width: dt('badge.dot.size');
        height: dt('badge.dot.size');
        border-radius: 50%;
        padding: 0;
    }

    .p-badge-circle {
        padding: 0;
        border-radius: 50%;
    }

    .p-badge-secondary {
        background: dt('badge.secondary.background');
        color: dt('badge.secondary.color');
    }

    .p-badge-success {
        background: dt('badge.success.background');
        color: dt('badge.success.color');
    }

    .p-badge-info {
        background: dt('badge.info.background');
        color: dt('badge.info.color');
    }

    .p-badge-warn {
        background: dt('badge.warn.background');
        color: dt('badge.warn.color');
    }

    .p-badge-danger {
        background: dt('badge.danger.background');
        color: dt('badge.danger.color');
    }

    .p-badge-contrast {
        background: dt('badge.contrast.background');
        color: dt('badge.contrast.color');
    }

    .p-badge-sm {
        font-size: dt('badge.sm.font.size');
        min-width: dt('badge.sm.min.width');
        height: dt('badge.sm.height');
    }

    .p-badge-lg {
        font-size: dt('badge.lg.font.size');
        min-width: dt('badge.lg.min.width');
        height: dt('badge.lg.height');
    }

    .p-badge-xl {
        font-size: dt('badge.xl.font.size');
        min-width: dt('badge.xl.min.width');
        height: dt('badge.xl.height');
    }
`,zg=`
    .p-ink {
        display: block;
        position: absolute;
        background: dt('ripple.background');
        border-radius: 100%;
        transform: scale(0);
        pointer-events: none;
    }

    .p-ink-active {
        animation: ripple 0.4s linear;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`,Eg=`
    .p-button {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        color: dt('button.primary.color');
        background: dt('button.primary.background');
        border: 1px solid dt('button.primary.border.color');
        padding: dt('button.padding.y') dt('button.padding.x');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('button.transition.duration'),
            color dt('button.transition.duration'),
            border-color dt('button.transition.duration'),
            outline-color dt('button.transition.duration'),
            box-shadow dt('button.transition.duration');
        border-radius: dt('button.border.radius');
        outline-color: transparent;
        gap: dt('button.gap');
    }

    .p-button:disabled {
        cursor: default;
    }

    .p-button-icon-right {
        order: 1;
    }

    .p-button-icon-right:dir(rtl) {
        order: -1;
    }

    .p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
        order: 1;
    }

    .p-button-icon-bottom {
        order: 2;
    }

    .p-button-icon-only {
        width: dt('button.icon.only.width');
        padding-inline-start: 0;
        padding-inline-end: 0;
        gap: 0;
    }

    .p-button-icon-only.p-button-rounded {
        border-radius: 50%;
        height: dt('button.icon.only.width');
    }

    .p-button-icon-only .p-button-label {
        visibility: hidden;
        width: 0;
    }

    .p-button-icon-only::after {
        content: " ";
        visibility: hidden;
        width: 0;
    }

    .p-button-sm {
        font-size: dt('button.sm.font.size');
        padding: dt('button.sm.padding.y') dt('button.sm.padding.x');
    }

    .p-button-sm .p-button-icon {
        font-size: dt('button.sm.font.size');
    }

    .p-button-sm.p-button-icon-only {
        width: dt('button.sm.icon.only.width');
    }

    .p-button-sm.p-button-icon-only.p-button-rounded {
        height: dt('button.sm.icon.only.width');
    }

    .p-button-lg {
        font-size: dt('button.lg.font.size');
        padding: dt('button.lg.padding.y') dt('button.lg.padding.x');
    }

    .p-button-lg .p-button-icon {
        font-size: dt('button.lg.font.size');
    }

    .p-button-lg.p-button-icon-only {
        width: dt('button.lg.icon.only.width');
    }

    .p-button-lg.p-button-icon-only.p-button-rounded {
        height: dt('button.lg.icon.only.width');
    }

    .p-button-vertical {
        flex-direction: column;
    }

    .p-button-label {
        font-weight: dt('button.label.font.weight');
    }

    .p-button-fluid {
        width: 100%;
    }

    .p-button-fluid.p-button-icon-only {
        width: dt('button.icon.only.width');
    }

    .p-button:not(:disabled):hover {
        background: dt('button.primary.hover.background');
        border: 1px solid dt('button.primary.hover.border.color');
        color: dt('button.primary.hover.color');
    }

    .p-button:not(:disabled):active {
        background: dt('button.primary.active.background');
        border: 1px solid dt('button.primary.active.border.color');
        color: dt('button.primary.active.color');
    }

    .p-button:focus-visible {
        box-shadow: dt('button.primary.focus.ring.shadow');
        outline: dt('button.focus.ring.width') dt('button.focus.ring.style') dt('button.primary.focus.ring.color');
        outline-offset: dt('button.focus.ring.offset');
    }

    .p-button .p-badge {
        min-width: dt('button.badge.size');
        height: dt('button.badge.size');
        line-height: dt('button.badge.size');
    }

    .p-button-raised {
        box-shadow: dt('button.raised.shadow');
    }

    .p-button-rounded {
        border-radius: dt('button.rounded.border.radius');
    }

    .p-button-secondary {
        background: dt('button.secondary.background');
        border: 1px solid dt('button.secondary.border.color');
        color: dt('button.secondary.color');
    }

    .p-button-secondary:not(:disabled):hover {
        background: dt('button.secondary.hover.background');
        border: 1px solid dt('button.secondary.hover.border.color');
        color: dt('button.secondary.hover.color');
    }

    .p-button-secondary:not(:disabled):active {
        background: dt('button.secondary.active.background');
        border: 1px solid dt('button.secondary.active.border.color');
        color: dt('button.secondary.active.color');
    }

    .p-button-secondary:focus-visible {
        outline-color: dt('button.secondary.focus.ring.color');
        box-shadow: dt('button.secondary.focus.ring.shadow');
    }

    .p-button-success {
        background: dt('button.success.background');
        border: 1px solid dt('button.success.border.color');
        color: dt('button.success.color');
    }

    .p-button-success:not(:disabled):hover {
        background: dt('button.success.hover.background');
        border: 1px solid dt('button.success.hover.border.color');
        color: dt('button.success.hover.color');
    }

    .p-button-success:not(:disabled):active {
        background: dt('button.success.active.background');
        border: 1px solid dt('button.success.active.border.color');
        color: dt('button.success.active.color');
    }

    .p-button-success:focus-visible {
        outline-color: dt('button.success.focus.ring.color');
        box-shadow: dt('button.success.focus.ring.shadow');
    }

    .p-button-info {
        background: dt('button.info.background');
        border: 1px solid dt('button.info.border.color');
        color: dt('button.info.color');
    }

    .p-button-info:not(:disabled):hover {
        background: dt('button.info.hover.background');
        border: 1px solid dt('button.info.hover.border.color');
        color: dt('button.info.hover.color');
    }

    .p-button-info:not(:disabled):active {
        background: dt('button.info.active.background');
        border: 1px solid dt('button.info.active.border.color');
        color: dt('button.info.active.color');
    }

    .p-button-info:focus-visible {
        outline-color: dt('button.info.focus.ring.color');
        box-shadow: dt('button.info.focus.ring.shadow');
    }

    .p-button-warn {
        background: dt('button.warn.background');
        border: 1px solid dt('button.warn.border.color');
        color: dt('button.warn.color');
    }

    .p-button-warn:not(:disabled):hover {
        background: dt('button.warn.hover.background');
        border: 1px solid dt('button.warn.hover.border.color');
        color: dt('button.warn.hover.color');
    }

    .p-button-warn:not(:disabled):active {
        background: dt('button.warn.active.background');
        border: 1px solid dt('button.warn.active.border.color');
        color: dt('button.warn.active.color');
    }

    .p-button-warn:focus-visible {
        outline-color: dt('button.warn.focus.ring.color');
        box-shadow: dt('button.warn.focus.ring.shadow');
    }

    .p-button-help {
        background: dt('button.help.background');
        border: 1px solid dt('button.help.border.color');
        color: dt('button.help.color');
    }

    .p-button-help:not(:disabled):hover {
        background: dt('button.help.hover.background');
        border: 1px solid dt('button.help.hover.border.color');
        color: dt('button.help.hover.color');
    }

    .p-button-help:not(:disabled):active {
        background: dt('button.help.active.background');
        border: 1px solid dt('button.help.active.border.color');
        color: dt('button.help.active.color');
    }

    .p-button-help:focus-visible {
        outline-color: dt('button.help.focus.ring.color');
        box-shadow: dt('button.help.focus.ring.shadow');
    }

    .p-button-danger {
        background: dt('button.danger.background');
        border: 1px solid dt('button.danger.border.color');
        color: dt('button.danger.color');
    }

    .p-button-danger:not(:disabled):hover {
        background: dt('button.danger.hover.background');
        border: 1px solid dt('button.danger.hover.border.color');
        color: dt('button.danger.hover.color');
    }

    .p-button-danger:not(:disabled):active {
        background: dt('button.danger.active.background');
        border: 1px solid dt('button.danger.active.border.color');
        color: dt('button.danger.active.color');
    }

    .p-button-danger:focus-visible {
        outline-color: dt('button.danger.focus.ring.color');
        box-shadow: dt('button.danger.focus.ring.shadow');
    }

    .p-button-contrast {
        background: dt('button.contrast.background');
        border: 1px solid dt('button.contrast.border.color');
        color: dt('button.contrast.color');
    }

    .p-button-contrast:not(:disabled):hover {
        background: dt('button.contrast.hover.background');
        border: 1px solid dt('button.contrast.hover.border.color');
        color: dt('button.contrast.hover.color');
    }

    .p-button-contrast:not(:disabled):active {
        background: dt('button.contrast.active.background');
        border: 1px solid dt('button.contrast.active.border.color');
        color: dt('button.contrast.active.color');
    }

    .p-button-contrast:focus-visible {
        outline-color: dt('button.contrast.focus.ring.color');
        box-shadow: dt('button.contrast.focus.ring.shadow');
    }

    .p-button-outlined {
        background: transparent;
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):hover {
        background: dt('button.outlined.primary.hover.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):active {
        background: dt('button.outlined.primary.active.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined.p-button-secondary {
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):hover {
        background: dt('button.outlined.secondary.hover.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):active {
        background: dt('button.outlined.secondary.active.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-success {
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):hover {
        background: dt('button.outlined.success.hover.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):active {
        background: dt('button.outlined.success.active.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-info {
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):hover {
        background: dt('button.outlined.info.hover.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):active {
        background: dt('button.outlined.info.active.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-warn {
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):hover {
        background: dt('button.outlined.warn.hover.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):active {
        background: dt('button.outlined.warn.active.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-help {
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):hover {
        background: dt('button.outlined.help.hover.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):active {
        background: dt('button.outlined.help.active.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-danger {
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):hover {
        background: dt('button.outlined.danger.hover.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):active {
        background: dt('button.outlined.danger.active.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-contrast {
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):hover {
        background: dt('button.outlined.contrast.hover.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):active {
        background: dt('button.outlined.contrast.active.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-plain {
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):hover {
        background: dt('button.outlined.plain.hover.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):active {
        background: dt('button.outlined.plain.active.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-text {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):hover {
        background: dt('button.text.primary.hover.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):active {
        background: dt('button.text.primary.active.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text.p-button-secondary {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):hover {
        background: dt('button.text.secondary.hover.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):active {
        background: dt('button.text.secondary.active.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-success {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):hover {
        background: dt('button.text.success.hover.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):active {
        background: dt('button.text.success.active.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-info {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):hover {
        background: dt('button.text.info.hover.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):active {
        background: dt('button.text.info.active.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-warn {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):hover {
        background: dt('button.text.warn.hover.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):active {
        background: dt('button.text.warn.active.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-help {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):hover {
        background: dt('button.text.help.hover.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):active {
        background: dt('button.text.help.active.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-danger {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):hover {
        background: dt('button.text.danger.hover.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):active {
        background: dt('button.text.danger.active.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-contrast {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):hover {
        background: dt('button.text.contrast.hover.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):active {
        background: dt('button.text.contrast.active.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-plain {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):hover {
        background: dt('button.text.plain.hover.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):active {
        background: dt('button.text.plain.active.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-link {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.color');
    }

    .p-button-link:not(:disabled):hover {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.hover.color');
    }

    .p-button-link:not(:disabled):hover .p-button-label {
        text-decoration: underline;
    }

    .p-button-link:not(:disabled):active {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.active.color');
    }
`,Og=`
    .p-inputtext {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('inputtext.color');
        background: dt('inputtext.background');
        padding-block: dt('inputtext.padding.y');
        padding-inline: dt('inputtext.padding.x');
        border: 1px solid dt('inputtext.border.color');
        transition:
            background dt('inputtext.transition.duration'),
            color dt('inputtext.transition.duration'),
            border-color dt('inputtext.transition.duration'),
            outline-color dt('inputtext.transition.duration'),
            box-shadow dt('inputtext.transition.duration');
        appearance: none;
        border-radius: dt('inputtext.border.radius');
        outline-color: transparent;
        box-shadow: dt('inputtext.shadow');
    }

    .p-inputtext:enabled:hover {
        border-color: dt('inputtext.hover.border.color');
    }

    .p-inputtext:enabled:focus {
        border-color: dt('inputtext.focus.border.color');
        box-shadow: dt('inputtext.focus.ring.shadow');
        outline: dt('inputtext.focus.ring.width') dt('inputtext.focus.ring.style') dt('inputtext.focus.ring.color');
        outline-offset: dt('inputtext.focus.ring.offset');
    }

    .p-inputtext.p-invalid {
        border-color: dt('inputtext.invalid.border.color');
    }

    .p-inputtext.p-variant-filled {
        background: dt('inputtext.filled.background');
    }

    .p-inputtext.p-variant-filled:enabled:hover {
        background: dt('inputtext.filled.hover.background');
    }

    .p-inputtext.p-variant-filled:enabled:focus {
        background: dt('inputtext.filled.focus.background');
    }

    .p-inputtext:disabled {
        opacity: 1;
        background: dt('inputtext.disabled.background');
        color: dt('inputtext.disabled.color');
    }

    .p-inputtext::placeholder {
        color: dt('inputtext.placeholder.color');
    }

    .p-inputtext.p-invalid::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }

    .p-inputtext-sm {
        font-size: dt('inputtext.sm.font.size');
        padding-block: dt('inputtext.sm.padding.y');
        padding-inline: dt('inputtext.sm.padding.x');
    }

    .p-inputtext-lg {
        font-size: dt('inputtext.lg.font.size');
        padding-block: dt('inputtext.lg.padding.y');
        padding-inline: dt('inputtext.lg.padding.x');
    }

    .p-inputtext-fluid {
        width: 100%;
    }
`,Tg=`
    .p-password {
        display: inline-flex;
        position: relative;
    }

    .p-password .p-password-overlay {
        min-width: 100%;
    }

    .p-password-meter {
        height: dt('password.meter.height');
        background: dt('password.meter.background');
        border-radius: dt('password.meter.border.radius');
    }

    .p-password-meter-label {
        height: 100%;
        width: 0;
        transition: width 1s ease-in-out;
        border-radius: dt('password.meter.border.radius');
    }

    .p-password-meter-weak {
        background: dt('password.strength.weak.background');
    }

    .p-password-meter-medium {
        background: dt('password.strength.medium.background');
    }

    .p-password-meter-strong {
        background: dt('password.strength.strong.background');
    }

    .p-password-fluid {
        display: flex;
    }

    .p-password-fluid .p-password-input {
        width: 100%;
    }

    .p-password-input::-ms-reveal,
    .p-password-input::-ms-clear {
        display: none;
    }

    .p-password-overlay {
        padding: dt('password.overlay.padding');
        background: dt('password.overlay.background');
        color: dt('password.overlay.color');
        border: 1px solid dt('password.overlay.border.color');
        box-shadow: dt('password.overlay.shadow');
        border-radius: dt('password.overlay.border.radius');
    }

    .p-password-content {
        display: flex;
        flex-direction: column;
        gap: dt('password.content.gap');
    }

    .p-password-toggle-mask-icon {
        inset-inline-end: dt('form.field.padding.x');
        color: dt('password.icon.color');
        position: absolute;
        top: 50%;
        margin-top: calc(-1 * calc(dt('icon.size') / 2));
        width: dt('icon.size');
        height: dt('icon.size');
    }

    .p-password-clear-icon {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        cursor: pointer;
        inset-inline-end: dt('form.field.padding.x');
        color: dt('form.field.icon.color');
    }

    .p-password:has(.p-password-toggle-mask-icon) .p-password-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-password:has(.p-password-toggle-mask-icon) .p-password-clear-icon {
        inset-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-password:has(.p-password-clear-icon) .p-password-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-password:has(.p-password-clear-icon):has(.p-password-toggle-mask-icon)  .p-password-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 3) + calc(dt('icon.size') * 2));
    }

`,Ag=`
    .p-dialog {
        max-height: 90%;
        transform: scale(1);
        border-radius: dt('dialog.border.radius');
        box-shadow: dt('dialog.shadow');
        background: dt('dialog.background');
        border: 1px solid dt('dialog.border.color');
        color: dt('dialog.color');
        will-change: transform;
    }

    .p-dialog-content {
        overflow-y: auto;
        padding: dt('dialog.content.padding');
        flex-grow: 1;
    }

    .p-dialog-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        padding: dt('dialog.header.padding');
    }

    .p-dialog-title {
        font-weight: dt('dialog.title.font.weight');
        font-size: dt('dialog.title.font.size');
    }

    .p-dialog-footer {
        flex-shrink: 0;
        padding: dt('dialog.footer.padding');
        display: flex;
        justify-content: flex-end;
        gap: dt('dialog.footer.gap');
    }

    .p-dialog-header-actions {
        display: flex;
        align-items: center;
        gap: dt('dialog.header.gap');
    }

    .p-dialog-top .p-dialog,
    .p-dialog-bottom .p-dialog,
    .p-dialog-left .p-dialog,
    .p-dialog-right .p-dialog,
    .p-dialog-topleft .p-dialog,
    .p-dialog-topright .p-dialog,
    .p-dialog-bottomleft .p-dialog,
    .p-dialog-bottomright .p-dialog {
        margin: 1rem;
    }

    .p-dialog-maximized {
        width: 100vw !important;
        height: 100vh !important;
        top: 0px !important;
        left: 0px !important;
        max-height: 100%;
        height: 100%;
        border-radius: 0;
    }

    .p-dialog .p-resizable-handle {
        position: absolute;
        font-size: 0.1px;
        display: block;
        cursor: se-resize;
        width: 12px;
        height: 12px;
        right: 1px;
        bottom: 1px;
    }

    .p-dialog-enter-active {
        animation: p-animate-dialog-enter 300ms cubic-bezier(.19,1,.22,1);
    }

    .p-dialog-leave-active {
        animation: p-animate-dialog-leave 300ms cubic-bezier(.19,1,.22,1);
    }

    @keyframes p-animate-dialog-enter {
        from {
            opacity: 0;
            transform: scale(0.93);
        }
    }

    @keyframes p-animate-dialog-leave {
        to {
            opacity: 0;
            transform: scale(0.93);
        }
    }
`,Dg=`
    .p-paginator {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        background: dt('paginator.background');
        color: dt('paginator.color');
        padding: dt('paginator.padding');
        border-radius: dt('paginator.border.radius');
        gap: dt('paginator.gap');
    }

    .p-paginator-content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: dt('paginator.gap');
    }

    .p-paginator-content-start {
        margin-inline-end: auto;
    }

    .p-paginator-content-end {
        margin-inline-start: auto;
    }

    .p-paginator-page,
    .p-paginator-next,
    .p-paginator-last,
    .p-paginator-first,
    .p-paginator-prev {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        user-select: none;
        overflow: hidden;
        position: relative;
        background: dt('paginator.nav.button.background');
        border: 0 none;
        color: dt('paginator.nav.button.color');
        min-width: dt('paginator.nav.button.width');
        height: dt('paginator.nav.button.height');
        transition:
            background dt('paginator.transition.duration'),
            color dt('paginator.transition.duration'),
            outline-color dt('paginator.transition.duration'),
            box-shadow dt('paginator.transition.duration');
        border-radius: dt('paginator.nav.button.border.radius');
        padding: 0;
        margin: 0;
    }

    .p-paginator-page:focus-visible,
    .p-paginator-next:focus-visible,
    .p-paginator-last:focus-visible,
    .p-paginator-first:focus-visible,
    .p-paginator-prev:focus-visible {
        box-shadow: dt('paginator.nav.button.focus.ring.shadow');
        outline: dt('paginator.nav.button.focus.ring.width') dt('paginator.nav.button.focus.ring.style') dt('paginator.nav.button.focus.ring.color');
        outline-offset: dt('paginator.nav.button.focus.ring.offset');
    }

    .p-paginator-page:not(.p-disabled):not(.p-paginator-page-selected):hover,
    .p-paginator-first:not(.p-disabled):hover,
    .p-paginator-prev:not(.p-disabled):hover,
    .p-paginator-next:not(.p-disabled):hover,
    .p-paginator-last:not(.p-disabled):hover {
        background: dt('paginator.nav.button.hover.background');
        color: dt('paginator.nav.button.hover.color');
    }

    .p-paginator-page.p-paginator-page-selected {
        background: dt('paginator.nav.button.selected.background');
        color: dt('paginator.nav.button.selected.color');
    }

    .p-paginator-current {
        color: dt('paginator.current.page.report.color');
    }

    .p-paginator-pages {
        display: flex;
        align-items: center;
        gap: dt('paginator.gap');
    }

    .p-paginator-jtp-input .p-inputtext {
        max-width: dt('paginator.jump.to.page.input.max.width');
    }

    .p-paginator-first:dir(rtl),
    .p-paginator-prev:dir(rtl),
    .p-paginator-next:dir(rtl),
    .p-paginator-last:dir(rtl) {
        transform: rotate(180deg);
    }
`,Ng=`
    .p-iconfield {
        position: relative;
        display: block;
    }

    .p-inputicon {
        position: absolute;
        top: 50%;
        margin-top: calc(-1 * (dt('icon.size') / 2));
        color: dt('iconfield.icon.color');
        line-height: 1;
        z-index: 1;
    }

    .p-iconfield .p-inputicon:first-child {
        inset-inline-start: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputicon:last-child {
        inset-inline-end: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputtext:not(:first-child),
    .p-iconfield .p-inputwrapper:not(:first-child) .p-inputtext {
        padding-inline-start: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield .p-inputtext:not(:last-child) {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield:has(.p-inputfield-sm) .p-inputicon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
        margin-top: calc(-1 * (dt('form.field.sm.font.size') / 2));
    }

    .p-iconfield:has(.p-inputfield-lg) .p-inputicon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
        margin-top: calc(-1 * (dt('form.field.lg.font.size') / 2));
    }
`,Lg=`
    .p-virtualscroller-loader {
        background: dt('virtualscroller.loader.mask.background');
        color: dt('virtualscroller.loader.mask.color');
    }

    .p-virtualscroller-loading-icon {
        font-size: dt('virtualscroller.loader.icon.size');
        width: dt('virtualscroller.loader.icon.size');
        height: dt('virtualscroller.loader.icon.size');
    }
`,Pg=`
    .p-select {
        display: inline-flex;
        cursor: pointer;
        position: relative;
        user-select: none;
        background: dt('select.background');
        border: 1px solid dt('select.border.color');
        transition:
            background dt('select.transition.duration'),
            color dt('select.transition.duration'),
            border-color dt('select.transition.duration'),
            outline-color dt('select.transition.duration'),
            box-shadow dt('select.transition.duration');
        border-radius: dt('select.border.radius');
        outline-color: transparent;
        box-shadow: dt('select.shadow');
    }

    .p-select:not(.p-disabled):hover {
        border-color: dt('select.hover.border.color');
    }

    .p-select:not(.p-disabled).p-focus {
        border-color: dt('select.focus.border.color');
        box-shadow: dt('select.focus.ring.shadow');
        outline: dt('select.focus.ring.width') dt('select.focus.ring.style') dt('select.focus.ring.color');
        outline-offset: dt('select.focus.ring.offset');
    }

    .p-select.p-variant-filled {
        background: dt('select.filled.background');
    }

    .p-select.p-variant-filled:not(.p-disabled):hover {
        background: dt('select.filled.hover.background');
    }

    .p-select.p-variant-filled:not(.p-disabled).p-focus {
        background: dt('select.filled.focus.background');
    }

    .p-select.p-invalid {
        border-color: dt('select.invalid.border.color');
    }

    .p-select.p-disabled {
        opacity: 1;
        background: dt('select.disabled.background');
    }

    .p-select-clear-icon {
        align-self: center;
        color: dt('select.clear.icon.color');
        inset-inline-end: dt('select.dropdown.width');
    }

    .p-select-dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: transparent;
        color: dt('select.dropdown.color');
        width: dt('select.dropdown.width');
        border-start-end-radius: dt('select.border.radius');
        border-end-end-radius: dt('select.border.radius');
    }

    .p-select-label {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        flex: 1 1 auto;
        width: 1%;
        padding: dt('select.padding.y') dt('select.padding.x');
        text-overflow: ellipsis;
        cursor: pointer;
        color: dt('select.color');
        background: transparent;
        border: 0 none;
        outline: 0 none;
        font-size: 1rem;
    }

    .p-select-label.p-placeholder {
        color: dt('select.placeholder.color');
    }

    .p-select.p-invalid .p-select-label.p-placeholder {
        color: dt('select.invalid.placeholder.color');
    }

    .p-select.p-disabled .p-select-label {
        color: dt('select.disabled.color');
    }

    .p-select-label-empty {
        overflow: hidden;
        opacity: 0;
    }

    input.p-select-label {
        cursor: default;
    }

    .p-select-overlay {
        position: absolute;
        top: 0;
        left: 0;
        background: dt('select.overlay.background');
        color: dt('select.overlay.color');
        border: 1px solid dt('select.overlay.border.color');
        border-radius: dt('select.overlay.border.radius');
        box-shadow: dt('select.overlay.shadow');
        min-width: 100%;
        transform-origin: inherit;
        will-change: transform;
    }

    .p-select-header {
        padding: dt('select.list.header.padding');
    }

    .p-select-filter {
        width: 100%;
    }

    .p-select-list-container {
        overflow: auto;
    }

    .p-select-option-group {
        cursor: auto;
        margin: 0;
        padding: dt('select.option.group.padding');
        background: dt('select.option.group.background');
        color: dt('select.option.group.color');
        font-weight: dt('select.option.group.font.weight');
    }

    .p-select-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        padding: dt('select.list.padding');
        gap: dt('select.list.gap');
        display: flex;
        flex-direction: column;
    }

    .p-select-option {
        cursor: pointer;
        font-weight: normal;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding: dt('select.option.padding');
        border: 0 none;
        color: dt('select.option.color');
        background: transparent;
        transition:
            background dt('select.transition.duration'),
            color dt('select.transition.duration'),
            border-color dt('select.transition.duration'),
            box-shadow dt('select.transition.duration'),
            outline-color dt('select.transition.duration');
        border-radius: dt('select.option.border.radius');
    }

    .p-select-option:not(.p-select-option-selected):not(.p-disabled).p-focus {
        background: dt('select.option.focus.background');
        color: dt('select.option.focus.color');
    }

    .p-select-option:not(.p-select-option-selected):not(.p-disabled):hover {
        background: dt('select.option.focus.background');
        color: dt('select.option.focus.color');
    }

    .p-select-option.p-select-option-selected {
        background: dt('select.option.selected.background');
        color: dt('select.option.selected.color');
    }

    .p-select-option.p-select-option-selected.p-focus {
        background: dt('select.option.selected.focus.background');
        color: dt('select.option.selected.focus.color');
    }
   
    .p-select-option-blank-icon {
        flex-shrink: 0;
    }

    .p-select-option-check-icon {
        position: relative;
        flex-shrink: 0;
        margin-inline-start: dt('select.checkmark.gutter.start');
        margin-inline-end: dt('select.checkmark.gutter.end');
        color: dt('select.checkmark.color');
    }

    .p-select-empty-message {
        padding: dt('select.empty.message.padding');
    }

    .p-select-fluid {
        display: flex;
        width: 100%;
    }

    .p-select-sm .p-select-label {
        font-size: dt('select.sm.font.size');
        padding-block: dt('select.sm.padding.y');
        padding-inline: dt('select.sm.padding.x');
    }

    .p-select-sm .p-select-dropdown .p-icon {
        font-size: dt('select.sm.font.size');
        width: dt('select.sm.font.size');
        height: dt('select.sm.font.size');
    }

    .p-select-lg .p-select-label {
        font-size: dt('select.lg.font.size');
        padding-block: dt('select.lg.padding.y');
        padding-inline: dt('select.lg.padding.x');
    }

    .p-select-lg .p-select-dropdown .p-icon {
        font-size: dt('select.lg.font.size');
        width: dt('select.lg.font.size');
        height: dt('select.lg.font.size');
    }

    .p-floatlabel-in .p-select-filter {
        padding-block-start: dt('select.padding.y');
        padding-block-end: dt('select.padding.y');
    }
`,Fg=`
    .p-inputnumber {
        display: inline-flex;
        position: relative;
    }

    .p-inputnumber-button {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        cursor: pointer;
        background: dt('inputnumber.button.background');
        color: dt('inputnumber.button.color');
        width: dt('inputnumber.button.width');
        transition:
            background dt('inputnumber.transition.duration'),
            color dt('inputnumber.transition.duration'),
            border-color dt('inputnumber.transition.duration'),
            outline-color dt('inputnumber.transition.duration');
    }

    .p-inputnumber-button:disabled {
        cursor: auto;
    }

    .p-inputnumber-button:not(:disabled):hover {
        background: dt('inputnumber.button.hover.background');
        color: dt('inputnumber.button.hover.color');
    }

    .p-inputnumber-button:not(:disabled):active {
        background: dt('inputnumber.button.active.background');
        color: dt('inputnumber.button.active.color');
    }

    .p-inputnumber-stacked .p-inputnumber-button {
        position: relative;
        flex: 1 1 auto;
        border: 0 none;
    }

    .p-inputnumber-stacked .p-inputnumber-button-group {
        display: flex;
        flex-direction: column;
        position: absolute;
        inset-block-start: 1px;
        inset-inline-end: 1px;
        height: calc(100% - 2px);
        z-index: 1;
    }

    .p-inputnumber-stacked .p-inputnumber-increment-button {
        padding: 0;
        border-start-end-radius: calc(dt('inputnumber.button.border.radius') - 1px);
    }

    .p-inputnumber-stacked .p-inputnumber-decrement-button {
        padding: 0;
        border-end-end-radius: calc(dt('inputnumber.button.border.radius') - 1px);
    }

    .p-inputnumber-stacked .p-inputnumber-input {
        padding-inline-end: calc(dt('inputnumber.button.width') + dt('form.field.padding.x'));
    }

    .p-inputnumber-horizontal .p-inputnumber-button {
        border: 1px solid dt('inputnumber.button.border.color');
    }

    .p-inputnumber-horizontal .p-inputnumber-button:hover {
        border-color: dt('inputnumber.button.hover.border.color');
    }

    .p-inputnumber-horizontal .p-inputnumber-button:active {
        border-color: dt('inputnumber.button.active.border.color');
    }

    .p-inputnumber-horizontal .p-inputnumber-increment-button {
        order: 3;
        border-start-end-radius: dt('inputnumber.button.border.radius');
        border-end-end-radius: dt('inputnumber.button.border.radius');
        border-inline-start: 0 none;
    }

    .p-inputnumber-horizontal .p-inputnumber-input {
        order: 2;
        border-radius: 0;
    }

    .p-inputnumber-horizontal .p-inputnumber-decrement-button {
        order: 1;
        border-start-start-radius: dt('inputnumber.button.border.radius');
        border-end-start-radius: dt('inputnumber.button.border.radius');
        border-inline-end: 0 none;
    }

    .p-floatlabel:has(.p-inputnumber-horizontal) label {
        margin-inline-start: dt('inputnumber.button.width');
    }

    .p-inputnumber-vertical {
        flex-direction: column;
    }

    .p-inputnumber-vertical .p-inputnumber-button {
        border: 1px solid dt('inputnumber.button.border.color');
        padding: dt('inputnumber.button.vertical.padding');
    }

    .p-inputnumber-vertical .p-inputnumber-button:hover {
        border-color: dt('inputnumber.button.hover.border.color');
    }

    .p-inputnumber-vertical .p-inputnumber-button:active {
        border-color: dt('inputnumber.button.active.border.color');
    }

    .p-inputnumber-vertical .p-inputnumber-increment-button {
        order: 1;
        border-start-start-radius: dt('inputnumber.button.border.radius');
        border-start-end-radius: dt('inputnumber.button.border.radius');
        width: 100%;
        border-block-end: 0 none;
    }

    .p-inputnumber-vertical .p-inputnumber-input {
        order: 2;
        border-radius: 0;
        text-align: center;
    }

    .p-inputnumber-vertical .p-inputnumber-decrement-button {
        order: 3;
        border-end-start-radius: dt('inputnumber.button.border.radius');
        border-end-end-radius: dt('inputnumber.button.border.radius');
        width: 100%;
        border-block-start: 0 none;
    }

    .p-inputnumber-input {
        flex: 1 1 auto;
    }

    .p-inputnumber-fluid {
        width: 100%;
    }

    .p-inputnumber-fluid .p-inputnumber-input {
        width: 1%;
    }

    .p-inputnumber-fluid.p-inputnumber-vertical .p-inputnumber-input {
        width: 100%;
    }

    .p-inputnumber:has(.p-inputtext-sm) .p-inputnumber-button .p-icon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
    }

    .p-inputnumber:has(.p-inputtext-lg) .p-inputnumber-button .p-icon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
    }

    .p-inputnumber-clear-icon {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        cursor: pointer;
        inset-inline-end: dt('form.field.padding.x');
        color: dt('form.field.icon.color');
    }

    .p-inputnumber:has(.p-inputnumber-clear-icon) .p-inputnumber-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-inputnumber-stacked .p-inputnumber-clear-icon {
        inset-inline-end: calc(dt('inputnumber.button.width') + dt('form.field.padding.x'));
    }

    .p-inputnumber-stacked:has(.p-inputnumber-clear-icon) .p-inputnumber-input {
        padding-inline-end: calc(dt('inputnumber.button.width') + (dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-inputnumber-horizontal .p-inputnumber-clear-icon {
        inset-inline-end: calc(dt('inputnumber.button.width') + dt('form.field.padding.x'));
    }
`,_g=`
    .p-datatable {
        position: relative;
        display: block;
    }

    .p-datatable-table {
        border-spacing: 0;
        border-collapse: separate;
        width: 100%;
    }

    .p-datatable-scrollable > .p-datatable-table-container {
        position: relative;
    }

    .p-datatable-scrollable-table > .p-datatable-thead {
        inset-block-start: 0;
        z-index: 1;
    }

    .p-datatable-scrollable-table > .p-datatable-frozen-tbody {
        position: sticky;
        z-index: 1;
    }

    .p-datatable-scrollable-table > .p-datatable-tfoot {
        inset-block-end: 0;
        z-index: 1;
    }

    .p-datatable-scrollable .p-datatable-frozen-column {
        position: sticky;
    }

    .p-datatable-scrollable th.p-datatable-frozen-column {
        z-index: 1;
    }

    .p-datatable-scrollable td.p-datatable-frozen-column {
        background: inherit;
    }

    .p-datatable-scrollable > .p-datatable-table-container > .p-datatable-table > .p-datatable-thead,
    .p-datatable-scrollable > .p-datatable-table-container > .p-virtualscroller > .p-datatable-table > .p-datatable-thead {
        background: dt('datatable.header.cell.background');
    }

    .p-datatable-scrollable > .p-datatable-table-container > .p-datatable-table > .p-datatable-tfoot,
    .p-datatable-scrollable > .p-datatable-table-container > .p-virtualscroller > .p-datatable-table > .p-datatable-tfoot {
        background: dt('datatable.footer.cell.background');
    }

    .p-datatable-flex-scrollable {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .p-datatable-flex-scrollable > .p-datatable-table-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;
    }

    .p-datatable-scrollable-table > .p-datatable-tbody > .p-datatable-row-group-header {
        position: sticky;
        z-index: 1;
    }

    .p-datatable-resizable-table > .p-datatable-thead > tr > th,
    .p-datatable-resizable-table > .p-datatable-tfoot > tr > td,
    .p-datatable-resizable-table > .p-datatable-tbody > tr > td {
        overflow: hidden;
        white-space: nowrap;
    }

    .p-datatable-resizable-table > .p-datatable-thead > tr > th.p-datatable-resizable-column:not(.p-datatable-frozen-column) {
        background-clip: padding-box;
        position: relative;
    }

    .p-datatable-resizable-table-fit > .p-datatable-thead > tr > th.p-datatable-resizable-column:last-child .p-datatable-column-resizer {
        display: none;
    }

    .p-datatable-column-resizer {
        display: block;
        position: absolute;
        inset-block-start: 0;
        inset-inline-end: 0;
        margin: 0;
        width: dt('datatable.column.resizer.width');
        height: 100%;
        padding: 0;
        cursor: col-resize;
        border: 1px solid transparent;
    }

    .p-datatable-column-header-content {
        display: flex;
        align-items: center;
        gap: dt('datatable.header.cell.gap');
    }

    .p-datatable-column-resize-indicator {
        width: dt('datatable.resize.indicator.width');
        position: absolute;
        z-index: 10;
        display: none;
        background: dt('datatable.resize.indicator.color');
    }

    .p-datatable-row-reorder-indicator-up,
    .p-datatable-row-reorder-indicator-down {
        position: absolute;
        display: none;
    }

    .p-datatable-reorderable-column,
    .p-datatable-reorderable-row-handle {
        cursor: move;
    }

    .p-datatable-mask {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
    }

    .p-datatable-inline-filter {
        display: flex;
        align-items: center;
        width: 100%;
        gap: dt('datatable.filter.inline.gap');
    }

    .p-datatable-inline-filter .p-datatable-filter-element-container {
        flex: 1 1 auto;
        width: 1%;
    }

    .p-datatable-filter-overlay {
        background: dt('datatable.filter.overlay.select.background');
        color: dt('datatable.filter.overlay.select.color');
        border: 1px solid dt('datatable.filter.overlay.select.border.color');
        border-radius: dt('datatable.filter.overlay.select.border.radius');
        box-shadow: dt('datatable.filter.overlay.select.shadow');
        min-width: 12.5rem;
    }

    .p-datatable-filter-constraint-list {
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        padding: dt('datatable.filter.constraint.list.padding');
        gap: dt('datatable.filter.constraint.list.gap');
    }

    .p-datatable-filter-constraint {
        padding: dt('datatable.filter.constraint.padding');
        color: dt('datatable.filter.constraint.color');
        border-radius: dt('datatable.filter.constraint.border.radius');
        cursor: pointer;
        transition:
            background dt('datatable.transition.duration'),
            color dt('datatable.transition.duration'),
            border-color dt('datatable.transition.duration'),
            box-shadow dt('datatable.transition.duration');
    }

    .p-datatable-filter-constraint-selected {
        background: dt('datatable.filter.constraint.selected.background');
        color: dt('datatable.filter.constraint.selected.color');
    }

    .p-datatable-filter-constraint:not(.p-datatable-filter-constraint-selected):not(.p-disabled):hover {
        background: dt('datatable.filter.constraint.focus.background');
        color: dt('datatable.filter.constraint.focus.color');
    }

    .p-datatable-filter-constraint:focus-visible {
        outline: 0 none;
        background: dt('datatable.filter.constraint.focus.background');
        color: dt('datatable.filter.constraint.focus.color');
    }

    .p-datatable-filter-constraint-selected:focus-visible {
        outline: 0 none;
        background: dt('datatable.filter.constraint.selected.focus.background');
        color: dt('datatable.filter.constraint.selected.focus.color');
    }

    .p-datatable-filter-constraint-separator {
        border-block-start: 1px solid dt('datatable.filter.constraint.separator.border.color');
    }

    .p-datatable-popover-filter {
        display: inline-flex;
        margin-inline-start: auto;
    }

    .p-datatable-filter-overlay-popover {
        background: dt('datatable.filter.overlay.popover.background');
        color: dt('datatable.filter.overlay.popover.color');
        border: 1px solid dt('datatable.filter.overlay.popover.border.color');
        border-radius: dt('datatable.filter.overlay.popover.border.radius');
        box-shadow: dt('datatable.filter.overlay.popover.shadow');
        min-width: 12.5rem;
        padding: dt('datatable.filter.overlay.popover.padding');
        display: flex;
        flex-direction: column;
        gap: dt('datatable.filter.overlay.popover.gap');
    }

    .p-datatable-filter-operator-dropdown {
        width: 100%;
    }

    .p-datatable-filter-rule-list,
    .p-datatable-filter-rule {
        display: flex;
        flex-direction: column;
        gap: dt('datatable.filter.overlay.popover.gap');
    }

    .p-datatable-filter-rule {
        border-block-end: 1px solid dt('datatable.filter.rule.border.color');
        padding-bottom: dt('datatable.filter.overlay.popover.gap');
    }

    .p-datatable-filter-rule:last-child {
        border-block-end: 0 none;
        padding-bottom: 0;
    }

    .p-datatable-filter-add-rule-button {
        width: 100%;
    }

    .p-datatable-filter-remove-rule-button {
        width: 100%;
    }

    .p-datatable-filter-buttonbar {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .p-datatable-virtualscroller-spacer {
        display: flex;
    }

    .p-datatable .p-virtualscroller .p-virtualscroller-loading {
        transform: none !important;
        min-height: 0;
        position: sticky;
        inset-block-start: 0;
        inset-inline-start: 0;
    }

    .p-datatable-paginator-top {
        border-color: dt('datatable.paginator.top.border.color');
        border-style: solid;
        border-width: dt('datatable.paginator.top.border.width');
    }

    .p-datatable-paginator-bottom {
        border-color: dt('datatable.paginator.bottom.border.color');
        border-style: solid;
        border-width: dt('datatable.paginator.bottom.border.width');
    }

    .p-datatable-header {
        background: dt('datatable.header.background');
        color: dt('datatable.header.color');
        border-color: dt('datatable.header.border.color');
        border-style: solid;
        border-width: dt('datatable.header.border.width');
        padding: dt('datatable.header.padding');
    }

    .p-datatable-footer {
        background: dt('datatable.footer.background');
        color: dt('datatable.footer.color');
        border-color: dt('datatable.footer.border.color');
        border-style: solid;
        border-width: dt('datatable.footer.border.width');
        padding: dt('datatable.footer.padding');
    }

    .p-datatable-header-cell {
        padding: dt('datatable.header.cell.padding');
        background: dt('datatable.header.cell.background');
        border-color: dt('datatable.header.cell.border.color');
        border-style: solid;
        border-width: 0 0 1px 0;
        color: dt('datatable.header.cell.color');
        font-weight: normal;
        text-align: start;
        transition:
            background dt('datatable.transition.duration'),
            color dt('datatable.transition.duration'),
            border-color dt('datatable.transition.duration'),
            outline-color dt('datatable.transition.duration'),
            box-shadow dt('datatable.transition.duration');
    }

    .p-datatable-column-title {
        font-weight: dt('datatable.column.title.font.weight');
    }

    .p-datatable-tbody > tr {
        outline-color: transparent;
        background: dt('datatable.row.background');
        color: dt('datatable.row.color');
        transition:
            background dt('datatable.transition.duration'),
            color dt('datatable.transition.duration'),
            border-color dt('datatable.transition.duration'),
            outline-color dt('datatable.transition.duration'),
            box-shadow dt('datatable.transition.duration');
    }

    .p-datatable-tbody > tr > td {
        text-align: start;
        border-color: dt('datatable.body.cell.border.color');
        border-style: solid;
        border-width: 0 0 1px 0;
        padding: dt('datatable.body.cell.padding');
    }

    .p-datatable-hoverable .p-datatable-tbody > tr:not(.p-datatable-row-selected):hover {
        background: dt('datatable.row.hover.background');
        color: dt('datatable.row.hover.color');
    }

    .p-datatable-tbody > tr.p-datatable-row-selected {
        background: dt('datatable.row.selected.background');
        color: dt('datatable.row.selected.color');
    }

    .p-datatable-tbody > tr:has(+ .p-datatable-row-selected) > td {
        border-block-end-color: dt('datatable.body.cell.selected.border.color');
    }

    .p-datatable-tbody > tr.p-datatable-row-selected > td {
        border-block-end-color: dt('datatable.body.cell.selected.border.color');
    }

    .p-datatable-tbody > tr:focus-visible,
    .p-datatable-tbody > tr.p-datatable-contextmenu-row-selected {
        box-shadow: dt('datatable.row.focus.ring.shadow');
        outline: dt('datatable.row.focus.ring.width') dt('datatable.row.focus.ring.style') dt('datatable.row.focus.ring.color');
        outline-offset: dt('datatable.row.focus.ring.offset');
    }

    .p-datatable-tfoot > tr > td {
        text-align: start;
        padding: dt('datatable.footer.cell.padding');
        border-color: dt('datatable.footer.cell.border.color');
        border-style: solid;
        border-width: 0 0 1px 0;
        color: dt('datatable.footer.cell.color');
        background: dt('datatable.footer.cell.background');
    }

    .p-datatable-column-footer {
        font-weight: dt('datatable.column.footer.font.weight');
    }

    .p-datatable-sortable-column {
        cursor: pointer;
        user-select: none;
        outline-color: transparent;
    }

    .p-datatable-column-title,
    .p-datatable-sort-icon,
    .p-datatable-sort-badge {
        vertical-align: middle;
    }

    .p-datatable-sort-icon {
        color: dt('datatable.sort.icon.color');
        font-size: dt('datatable.sort.icon.size');
        width: dt('datatable.sort.icon.size');
        height: dt('datatable.sort.icon.size');
        transition: color dt('datatable.transition.duration');
    }

    .p-datatable-sortable-column:not(.p-datatable-column-sorted):hover {
        background: dt('datatable.header.cell.hover.background');
        color: dt('datatable.header.cell.hover.color');
    }

    .p-datatable-sortable-column:not(.p-datatable-column-sorted):hover .p-datatable-sort-icon {
        color: dt('datatable.sort.icon.hover.color');
    }

    .p-datatable-column-sorted {
        background: dt('datatable.header.cell.selected.background');
        color: dt('datatable.header.cell.selected.color');
    }

    .p-datatable-column-sorted .p-datatable-sort-icon {
        color: dt('datatable.header.cell.selected.color');
    }

    .p-datatable-sortable-column:focus-visible {
        box-shadow: dt('datatable.header.cell.focus.ring.shadow');
        outline: dt('datatable.header.cell.focus.ring.width') dt('datatable.header.cell.focus.ring.style') dt('datatable.header.cell.focus.ring.color');
        outline-offset: dt('datatable.header.cell.focus.ring.offset');
    }

    .p-datatable-hoverable .p-datatable-selectable-row {
        cursor: pointer;
    }

    .p-datatable-tbody > tr.p-datatable-dragpoint-top > td {
        box-shadow: inset 0 2px 0 0 dt('datatable.drop.point.color');
    }

    .p-datatable-tbody > tr.p-datatable-dragpoint-bottom > td {
        box-shadow: inset 0 -2px 0 0 dt('datatable.drop.point.color');
    }

    .p-datatable-loading-icon {
        font-size: dt('datatable.loading.icon.size');
        width: dt('datatable.loading.icon.size');
        height: dt('datatable.loading.icon.size');
    }

    .p-datatable-gridlines .p-datatable-header {
        border-width: 1px 1px 0 1px;
    }

    .p-datatable-gridlines .p-datatable-footer {
        border-width: 0 1px 1px 1px;
    }

    .p-datatable-gridlines .p-datatable-paginator-top {
        border-width: 1px 1px 0 1px;
    }

    .p-datatable-gridlines .p-datatable-paginator-bottom {
        border-width: 0 1px 1px 1px;
    }

    .p-datatable-gridlines .p-datatable-thead > tr > th {
        border-width: 1px 0 1px 1px;
    }

    .p-datatable-gridlines .p-datatable-thead > tr > th:last-child {
        border-width: 1px;
    }

    .p-datatable-gridlines .p-datatable-tbody > tr > td {
        border-width: 1px 0 0 1px;
    }

    .p-datatable-gridlines .p-datatable-tbody > tr > td:last-child {
        border-width: 1px 1px 0 1px;
    }

    .p-datatable-gridlines .p-datatable-tbody > tr:last-child > td {
        border-width: 1px 0 1px 1px;
    }

    .p-datatable-gridlines .p-datatable-tbody > tr:last-child > td:last-child {
        border-width: 1px;
    }

    .p-datatable-gridlines .p-datatable-tfoot > tr > td {
        border-width: 1px 0 1px 1px;
    }

    .p-datatable-gridlines .p-datatable-tfoot > tr > td:last-child {
        border-width: 1px 1px 1px 1px;
    }

    .p-datatable.p-datatable-gridlines .p-datatable-thead + .p-datatable-tfoot > tr > td {
        border-width: 0 0 1px 1px;
    }

    .p-datatable.p-datatable-gridlines .p-datatable-thead + .p-datatable-tfoot > tr > td:last-child {
        border-width: 0 1px 1px 1px;
    }

    .p-datatable.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody) .p-datatable-tbody > tr > td {
        border-width: 0 0 1px 1px;
    }

    .p-datatable.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody) .p-datatable-tbody > tr > td:last-child {
        border-width: 0 1px 1px 1px;
    }

    .p-datatable.p-datatable-gridlines:has(.p-datatable-tbody):has(.p-datatable-tfoot) .p-datatable-tbody > tr:last-child > td {
        border-width: 0 0 0 1px;
    }

    .p-datatable.p-datatable-gridlines:has(.p-datatable-tbody):has(.p-datatable-tfoot) .p-datatable-tbody > tr:last-child > td:last-child {
        border-width: 0 1px 0 1px;
    }

    .p-datatable.p-datatable-striped .p-datatable-tbody > tr.p-row-odd {
        background: dt('datatable.row.striped.background');
    }

    .p-datatable.p-datatable-striped .p-datatable-tbody > tr.p-row-odd.p-datatable-row-selected {
        background: dt('datatable.row.selected.background');
        color: dt('datatable.row.selected.color');
    }

    .p-datatable-striped.p-datatable-hoverable .p-datatable-tbody > tr:not(.p-datatable-row-selected):hover {
        background: dt('datatable.row.hover.background');
        color: dt('datatable.row.hover.color');
    }

    .p-datatable.p-datatable-sm .p-datatable-header {
        padding: dt('datatable.header.sm.padding');
    }

    .p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
        padding: dt('datatable.header.cell.sm.padding');
    }

    .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
        padding: dt('datatable.body.cell.sm.padding');
    }

    .p-datatable.p-datatable-sm .p-datatable-tfoot > tr > td {
        padding: dt('datatable.footer.cell.sm.padding');
    }

    .p-datatable.p-datatable-sm .p-datatable-footer {
        padding: dt('datatable.footer.sm.padding');
    }

    .p-datatable.p-datatable-lg .p-datatable-header {
        padding: dt('datatable.header.lg.padding');
    }

    .p-datatable.p-datatable-lg .p-datatable-thead > tr > th {
        padding: dt('datatable.header.cell.lg.padding');
    }

    .p-datatable.p-datatable-lg .p-datatable-tbody > tr > td {
        padding: dt('datatable.body.cell.lg.padding');
    }

    .p-datatable.p-datatable-lg .p-datatable-tfoot > tr > td {
        padding: dt('datatable.footer.cell.lg.padding');
    }

    .p-datatable.p-datatable-lg .p-datatable-footer {
        padding: dt('datatable.footer.lg.padding');
    }

    .p-datatable-row-toggle-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        width: dt('datatable.row.toggle.button.size');
        height: dt('datatable.row.toggle.button.size');
        color: dt('datatable.row.toggle.button.color');
        border: 0 none;
        background: transparent;
        cursor: pointer;
        border-radius: dt('datatable.row.toggle.button.border.radius');
        transition:
            background dt('datatable.transition.duration'),
            color dt('datatable.transition.duration'),
            border-color dt('datatable.transition.duration'),
            outline-color dt('datatable.transition.duration'),
            box-shadow dt('datatable.transition.duration');
        outline-color: transparent;
        user-select: none;
    }

    .p-datatable-row-toggle-button:enabled:hover {
        color: dt('datatable.row.toggle.button.hover.color');
        background: dt('datatable.row.toggle.button.hover.background');
    }

    .p-datatable-tbody > tr.p-datatable-row-selected .p-datatable-row-toggle-button:hover {
        background: dt('datatable.row.toggle.button.selected.hover.background');
        color: dt('datatable.row.toggle.button.selected.hover.color');
    }

    .p-datatable-row-toggle-button:focus-visible {
        box-shadow: dt('datatable.row.toggle.button.focus.ring.shadow');
        outline: dt('datatable.row.toggle.button.focus.ring.width') dt('datatable.row.toggle.button.focus.ring.style') dt('datatable.row.toggle.button.focus.ring.color');
        outline-offset: dt('datatable.row.toggle.button.focus.ring.offset');
    }

    .p-datatable-row-toggle-icon:dir(rtl) {
        transform: rotate(180deg);
    }
`,jg=`
    .p-checkbox {
        position: relative;
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        width: dt('checkbox.width');
        height: dt('checkbox.height');
    }

    .p-checkbox-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border: 1px solid transparent;
        border-radius: dt('checkbox.border.radius');
    }

    .p-checkbox-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: dt('checkbox.border.radius');
        border: 1px solid dt('checkbox.border.color');
        background: dt('checkbox.background');
        width: dt('checkbox.width');
        height: dt('checkbox.height');
        transition:
            background dt('checkbox.transition.duration'),
            color dt('checkbox.transition.duration'),
            border-color dt('checkbox.transition.duration'),
            box-shadow dt('checkbox.transition.duration'),
            outline-color dt('checkbox.transition.duration');
        outline-color: transparent;
        box-shadow: dt('checkbox.shadow');
    }

    .p-checkbox-icon {
        transition-duration: dt('checkbox.transition.duration');
        color: dt('checkbox.icon.color');
        font-size: dt('checkbox.icon.size');
        width: dt('checkbox.icon.size');
        height: dt('checkbox.icon.size');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        border-color: dt('checkbox.hover.border.color');
    }

    .p-checkbox-checked .p-checkbox-box {
        border-color: dt('checkbox.checked.border.color');
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked .p-checkbox-icon {
        color: dt('checkbox.icon.checked.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
        border-color: dt('checkbox.checked.hover.border.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {
        color: dt('checkbox.icon.checked.hover.color');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.focus.border.color');
        box-shadow: dt('checkbox.focus.ring.shadow');
        outline: dt('checkbox.focus.ring.width') dt('checkbox.focus.ring.style') dt('checkbox.focus.ring.color');
        outline-offset: dt('checkbox.focus.ring.offset');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.checked.focus.border.color');
    }

    .p-checkbox.p-invalid > .p-checkbox-box {
        border-color: dt('checkbox.invalid.border.color');
    }

    .p-checkbox.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.filled.background');
    }

    .p-checkbox-checked.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
    }

    .p-checkbox.p-disabled {
        opacity: 1;
    }

    .p-checkbox.p-disabled .p-checkbox-box {
        background: dt('checkbox.disabled.background');
        border-color: dt('checkbox.checked.disabled.border.color');
    }

    .p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {
        color: dt('checkbox.icon.disabled.color');
    }

    .p-checkbox-sm,
    .p-checkbox-sm .p-checkbox-box {
        width: dt('checkbox.sm.width');
        height: dt('checkbox.sm.height');
    }

    .p-checkbox-sm .p-checkbox-icon {
        font-size: dt('checkbox.icon.sm.size');
        width: dt('checkbox.icon.sm.size');
        height: dt('checkbox.icon.sm.size');
    }

    .p-checkbox-lg,
    .p-checkbox-lg .p-checkbox-box {
        width: dt('checkbox.lg.width');
        height: dt('checkbox.lg.height');
    }

    .p-checkbox-lg .p-checkbox-icon {
        font-size: dt('checkbox.icon.lg.size');
        width: dt('checkbox.icon.lg.size');
        height: dt('checkbox.icon.lg.size');
    }
`,Ig=`
    .p-radiobutton {
        position: relative;
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        width: dt('radiobutton.width');
        height: dt('radiobutton.height');
    }

    .p-radiobutton-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        top: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border: 1px solid transparent;
        border-radius: 50%;
    }

    .p-radiobutton-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 1px solid dt('radiobutton.border.color');
        background: dt('radiobutton.background');
        width: dt('radiobutton.width');
        height: dt('radiobutton.height');
        transition:
            background dt('radiobutton.transition.duration'),
            color dt('radiobutton.transition.duration'),
            border-color dt('radiobutton.transition.duration'),
            box-shadow dt('radiobutton.transition.duration'),
            outline-color dt('radiobutton.transition.duration');
        outline-color: transparent;
        box-shadow: dt('radiobutton.shadow');
    }

    .p-radiobutton-icon {
        transition-duration: dt('radiobutton.transition.duration');
        background: transparent;
        font-size: dt('radiobutton.icon.size');
        width: dt('radiobutton.icon.size');
        height: dt('radiobutton.icon.size');
        border-radius: 50%;
        backface-visibility: hidden;
        transform: translateZ(0) scale(0.1);
    }

    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
        border-color: dt('radiobutton.hover.border.color');
    }

    .p-radiobutton-checked .p-radiobutton-box {
        border-color: dt('radiobutton.checked.border.color');
        background: dt('radiobutton.checked.background');
    }

    .p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
        background: dt('radiobutton.icon.checked.color');
        transform: translateZ(0) scale(1, 1);
        visibility: visible;
    }

    .p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
        border-color: dt('radiobutton.checked.hover.border.color');
        background: dt('radiobutton.checked.hover.background');
    }

    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
        background: dt('radiobutton.icon.checked.hover.color');
    }

    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
        border-color: dt('radiobutton.focus.border.color');
        box-shadow: dt('radiobutton.focus.ring.shadow');
        outline: dt('radiobutton.focus.ring.width') dt('radiobutton.focus.ring.style') dt('radiobutton.focus.ring.color');
        outline-offset: dt('radiobutton.focus.ring.offset');
    }

    .p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
        border-color: dt('radiobutton.checked.focus.border.color');
    }

    .p-radiobutton.p-invalid > .p-radiobutton-box {
        border-color: dt('radiobutton.invalid.border.color');
    }

    .p-radiobutton.p-variant-filled .p-radiobutton-box {
        background: dt('radiobutton.filled.background');
    }

    .p-radiobutton.p-variant-filled.p-radiobutton-checked .p-radiobutton-box {
        background: dt('radiobutton.checked.background');
    }

    .p-radiobutton.p-variant-filled:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box {
        background: dt('radiobutton.checked.hover.background');
    }

    .p-radiobutton.p-disabled {
        opacity: 1;
    }

    .p-radiobutton.p-disabled .p-radiobutton-box {
        background: dt('radiobutton.disabled.background');
        border-color: dt('radiobutton.checked.disabled.border.color');
    }

    .p-radiobutton-checked.p-disabled .p-radiobutton-box .p-radiobutton-icon {
        background: dt('radiobutton.icon.disabled.color');
    }

    .p-radiobutton-sm,
    .p-radiobutton-sm .p-radiobutton-box {
        width: dt('radiobutton.sm.width');
        height: dt('radiobutton.sm.height');
    }

    .p-radiobutton-sm .p-radiobutton-icon {
        font-size: dt('radiobutton.icon.sm.size');
        width: dt('radiobutton.icon.sm.size');
        height: dt('radiobutton.icon.sm.size');
    }

    .p-radiobutton-lg,
    .p-radiobutton-lg .p-radiobutton-box {
        width: dt('radiobutton.lg.width');
        height: dt('radiobutton.lg.height');
    }

    .p-radiobutton-lg .p-radiobutton-icon {
        font-size: dt('radiobutton.icon.lg.size');
        width: dt('radiobutton.icon.lg.size');
        height: dt('radiobutton.icon.lg.size');
    }
`,Wg=`
    .p-chip {
        display: inline-flex;
        align-items: center;
        background: dt('chip.background');
        color: dt('chip.color');
        border-radius: dt('chip.border.radius');
        padding-block: dt('chip.padding.y');
        padding-inline: dt('chip.padding.x');
        gap: dt('chip.gap');
    }

    .p-chip-icon {
        color: dt('chip.icon.color');
        font-size: dt('chip.icon.size');
        width: dt('chip.icon.size');
        height: dt('chip.icon.size');
    }

    .p-chip-image {
        border-radius: 50%;
        width: dt('chip.image.width');
        height: dt('chip.image.height');
        margin-inline-start: calc(-1 * dt('chip.padding.y'));
    }

    .p-chip:has(.p-chip-remove-icon) {
        padding-inline-end: dt('chip.padding.y');
    }

    .p-chip:has(.p-chip-image) {
        padding-block-start: calc(dt('chip.padding.y') / 2);
        padding-block-end: calc(dt('chip.padding.y') / 2);
    }

    .p-chip-remove-icon {
        cursor: pointer;
        font-size: dt('chip.remove.icon.size');
        width: dt('chip.remove.icon.size');
        height: dt('chip.remove.icon.size');
        color: dt('chip.remove.icon.color');
        border-radius: 50%;
        transition:
            outline-color dt('chip.transition.duration'),
            box-shadow dt('chip.transition.duration');
        outline-color: transparent;
    }

    .p-chip-remove-icon:focus-visible {
        box-shadow: dt('chip.remove.icon.focus.ring.shadow');
        outline: dt('chip.remove.icon.focus.ring.width') dt('chip.remove.icon.focus.ring.style') dt('chip.remove.icon.focus.ring.color');
        outline-offset: dt('chip.remove.icon.focus.ring.offset');
    }
`,Ug=`
    .p-multiselect {
        display: inline-flex;
        cursor: pointer;
        position: relative;
        user-select: none;
        background: dt('multiselect.background');
        border: 1px solid dt('multiselect.border.color');
        transition:
            background dt('multiselect.transition.duration'),
            color dt('multiselect.transition.duration'),
            border-color dt('multiselect.transition.duration'),
            outline-color dt('multiselect.transition.duration'),
            box-shadow dt('multiselect.transition.duration');
        border-radius: dt('multiselect.border.radius');
        outline-color: transparent;
        box-shadow: dt('multiselect.shadow');
    }

    .p-multiselect:not(.p-disabled):hover {
        border-color: dt('multiselect.hover.border.color');
    }

    .p-multiselect:not(.p-disabled).p-focus {
        border-color: dt('multiselect.focus.border.color');
        box-shadow: dt('multiselect.focus.ring.shadow');
        outline: dt('multiselect.focus.ring.width') dt('multiselect.focus.ring.style') dt('multiselect.focus.ring.color');
        outline-offset: dt('multiselect.focus.ring.offset');
    }

    .p-multiselect.p-variant-filled {
        background: dt('multiselect.filled.background');
    }

    .p-multiselect.p-variant-filled:not(.p-disabled):hover {
        background: dt('multiselect.filled.hover.background');
    }

    .p-multiselect.p-variant-filled.p-focus {
        background: dt('multiselect.filled.focus.background');
    }

    .p-multiselect.p-invalid {
        border-color: dt('multiselect.invalid.border.color');
    }

    .p-multiselect.p-disabled {
        opacity: 1;
        background: dt('multiselect.disabled.background');
    }

    .p-multiselect-dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: transparent;
        color: dt('multiselect.dropdown.color');
        width: dt('multiselect.dropdown.width');
        border-start-end-radius: dt('multiselect.border.radius');
        border-end-end-radius: dt('multiselect.border.radius');
    }

    .p-multiselect-clear-icon {
        align-self: center;
        color: dt('multiselect.clear.icon.color');
        inset-inline-end: dt('multiselect.dropdown.width');
    }

    .p-multiselect-label-container {
        overflow: hidden;
        flex: 1 1 auto;
        cursor: pointer;
    }

    .p-multiselect-label {
        white-space: nowrap;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: dt('multiselect.padding.y') dt('multiselect.padding.x');
        color: dt('multiselect.color');
    }

    .p-multiselect-display-chip .p-multiselect-label {
        display: flex;
        align-items: center;
        gap: calc(dt('multiselect.padding.y') / 2);
    }

    .p-multiselect-label.p-placeholder {
        color: dt('multiselect.placeholder.color');
    }

    .p-multiselect.p-invalid .p-multiselect-label.p-placeholder {
        color: dt('multiselect.invalid.placeholder.color');
    }

    .p-multiselect.p-disabled .p-multiselect-label {
        color: dt('multiselect.disabled.color');
    }

    .p-multiselect-label-empty {
        overflow: hidden;
        visibility: hidden;
    }

    .p-multiselect-overlay {
        position: absolute;
        top: 0;
        left: 0;
        background: dt('multiselect.overlay.background');
        color: dt('multiselect.overlay.color');
        border: 1px solid dt('multiselect.overlay.border.color');
        border-radius: dt('multiselect.overlay.border.radius');
        box-shadow: dt('multiselect.overlay.shadow');
        min-width: 100%;
    }

    .p-multiselect-header {
        display: flex;
        align-items: center;
        padding: dt('multiselect.list.header.padding');
    }

    .p-multiselect-header .p-checkbox {
        margin-inline-end: dt('multiselect.option.gap');
    }

    .p-multiselect-filter-container {
        flex: 1 1 auto;
    }

    .p-multiselect-filter {
        width: 100%;
    }

    .p-multiselect-list-container {
        overflow: auto;
    }

    .p-multiselect-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        padding: dt('multiselect.list.padding');
        display: flex;
        flex-direction: column;
        gap: dt('multiselect.list.gap');
    }

    .p-multiselect-option {
        cursor: pointer;
        font-weight: normal;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        gap: dt('multiselect.option.gap');
        padding: dt('multiselect.option.padding');
        border: 0 none;
        color: dt('multiselect.option.color');
        background: transparent;
        transition:
            background dt('multiselect.transition.duration'),
            color dt('multiselect.transition.duration'),
            border-color dt('multiselect.transition.duration'),
            box-shadow dt('multiselect.transition.duration'),
            outline-color dt('multiselect.transition.duration');
        border-radius: dt('multiselect.option.border.radius');
    }

    .p-multiselect-option:not(.p-multiselect-option-selected):not(.p-disabled).p-focus {
        background: dt('multiselect.option.focus.background');
        color: dt('multiselect.option.focus.color');
    }

    .p-multiselect-option:not(.p-multiselect-option-selected):not(.p-disabled):hover {
        background: dt('multiselect.option.focus.background');
        color: dt('multiselect.option.focus.color');
    }

    .p-multiselect-option.p-multiselect-option-selected {
        background: dt('multiselect.option.selected.background');
        color: dt('multiselect.option.selected.color');
    }

    .p-multiselect-option.p-multiselect-option-selected.p-focus {
        background: dt('multiselect.option.selected.focus.background');
        color: dt('multiselect.option.selected.focus.color');
    }

    .p-multiselect-option-group {
        cursor: auto;
        margin: 0;
        padding: dt('multiselect.option.group.padding');
        background: dt('multiselect.option.group.background');
        color: dt('multiselect.option.group.color');
        font-weight: dt('multiselect.option.group.font.weight');
    }

    .p-multiselect-empty-message {
        padding: dt('multiselect.empty.message.padding');
    }

    .p-multiselect-label .p-chip {
        padding-block-start: calc(dt('multiselect.padding.y') / 2);
        padding-block-end: calc(dt('multiselect.padding.y') / 2);
        border-radius: dt('multiselect.chip.border.radius');
    }

    .p-multiselect-label:has(.p-chip) {
        padding: calc(dt('multiselect.padding.y') / 2) calc(dt('multiselect.padding.x') / 2);
    }

    .p-multiselect-fluid {
        display: flex;
        width: 100%;
    }

    .p-multiselect-sm .p-multiselect-label {
        font-size: dt('multiselect.sm.font.size');
        padding-block: dt('multiselect.sm.padding.y');
        padding-inline: dt('multiselect.sm.padding.x');
    }

    .p-multiselect-sm .p-multiselect-dropdown .p-icon {
        font-size: dt('multiselect.sm.font.size');
        width: dt('multiselect.sm.font.size');
        height: dt('multiselect.sm.font.size');
    }

    .p-multiselect-lg .p-multiselect-label {
        font-size: dt('multiselect.lg.font.size');
        padding-block: dt('multiselect.lg.padding.y');
        padding-inline: dt('multiselect.lg.padding.x');
    }

    .p-multiselect-lg .p-multiselect-dropdown .p-icon {
        font-size: dt('multiselect.lg.font.size');
        width: dt('multiselect.lg.font.size');
        height: dt('multiselect.lg.font.size');
    }

    .p-floatlabel-in .p-multiselect-filter {
        padding-block-start: dt('multiselect.padding.y');
        padding-block-end: dt('multiselect.padding.y');
    }
`,Hg=`
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: dt('tag.primary.background');
        color: dt('tag.primary.color');
        font-size: dt('tag.font.size');
        font-weight: dt('tag.font.weight');
        padding: dt('tag.padding');
        border-radius: dt('tag.border.radius');
        gap: dt('tag.gap');
    }

    .p-tag-icon {
        font-size: dt('tag.icon.size');
        width: dt('tag.icon.size');
        height: dt('tag.icon.size');
    }

    .p-tag-rounded {
        border-radius: dt('tag.rounded.border.radius');
    }

    .p-tag-success {
        background: dt('tag.success.background');
        color: dt('tag.success.color');
    }

    .p-tag-info {
        background: dt('tag.info.background');
        color: dt('tag.info.color');
    }

    .p-tag-warn {
        background: dt('tag.warn.background');
        color: dt('tag.warn.color');
    }

    .p-tag-danger {
        background: dt('tag.danger.background');
        color: dt('tag.danger.color');
    }

    .p-tag-secondary {
        background: dt('tag.secondary.background');
        color: dt('tag.secondary.color');
    }

    .p-tag-contrast {
        background: dt('tag.contrast.background');
        color: dt('tag.contrast.color');
    }
`,Mg=`
    .p-datepicker {
        display: inline-flex;
        max-width: 100%;
    }

    .p-datepicker:has(.p-datepicker-dropdown) .p-datepicker-input {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    .p-datepicker-input {
        flex: 1 1 auto;
        width: 1%;
    }

    .p-datepicker-dropdown {
        cursor: pointer;
        display: inline-flex;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        width: dt('datepicker.dropdown.width');
        border-start-end-radius: dt('datepicker.dropdown.border.radius');
        border-end-end-radius: dt('datepicker.dropdown.border.radius');
        background: dt('datepicker.dropdown.background');
        border: 1px solid dt('datepicker.dropdown.border.color');
        border-inline-start: 0 none;
        color: dt('datepicker.dropdown.color');
        transition:
            background dt('datepicker.transition.duration'),
            color dt('datepicker.transition.duration'),
            border-color dt('datepicker.transition.duration'),
            outline-color dt('datepicker.transition.duration');
        outline-color: transparent;
    }

    .p-datepicker-dropdown:not(:disabled):hover {
        background: dt('datepicker.dropdown.hover.background');
        border-color: dt('datepicker.dropdown.hover.border.color');
        color: dt('datepicker.dropdown.hover.color');
    }

    .p-datepicker-dropdown:not(:disabled):active {
        background: dt('datepicker.dropdown.active.background');
        border-color: dt('datepicker.dropdown.active.border.color');
        color: dt('datepicker.dropdown.active.color');
    }

    .p-datepicker-dropdown:focus-visible {
        box-shadow: dt('datepicker.dropdown.focus.ring.shadow');
        outline: dt('datepicker.dropdown.focus.ring.width') dt('datepicker.dropdown.focus.ring.style') dt('datepicker.dropdown.focus.ring.color');
        outline-offset: dt('datepicker.dropdown.focus.ring.offset');
    }

    .p-datepicker:has(.p-datepicker-input-icon-container) {
        position: relative;
    }

    .p-datepicker:has(.p-datepicker-input-icon-container) .p-datepicker-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-datepicker-input-icon-container {
        cursor: pointer;
        position: absolute;
        top: 50%;
        inset-inline-end: dt('form.field.padding.x');
        margin-block-start: calc(-1 * (dt('icon.size') / 2));
        color: dt('datepicker.input.icon.color');
        line-height: 1;
        z-index: 1;
    }

    .p-datepicker:has(.p-datepicker-input:disabled) .p-datepicker-input-icon-container {
        cursor: default;
    }

    .p-datepicker-fluid {
        display: flex;
    }

    .p-datepicker .p-datepicker-panel {
        min-width: 100%;
    }

    .p-datepicker-panel {
        width: auto;
        padding: dt('datepicker.panel.padding');
        background: dt('datepicker.panel.background');
        color: dt('datepicker.panel.color');
        border: 1px solid dt('datepicker.panel.border.color');
        border-radius: dt('datepicker.panel.border.radius');
        box-shadow: dt('datepicker.panel.shadow');
    }

    .p-datepicker-panel-inline {
        display: inline-block;
        overflow-x: auto;
        box-shadow: none;
    }

    .p-datepicker-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: dt('datepicker.header.padding');
        background: dt('datepicker.header.background');
        color: dt('datepicker.header.color');
        border-block-end: 1px solid dt('datepicker.header.border.color');
    }

    .p-datepicker-next-button:dir(rtl) {
        order: -1;
    }

    .p-datepicker-prev-button:dir(rtl) {
        order: 1;
    }

    .p-datepicker-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: dt('datepicker.title.gap');
        font-weight: dt('datepicker.title.font.weight');
    }

    .p-datepicker-select-year,
    .p-datepicker-select-month {
        border: none;
        background: transparent;
        margin: 0;
        cursor: pointer;
        font-weight: inherit;
        transition:
            background dt('datepicker.transition.duration'),
            color dt('datepicker.transition.duration'),
            border-color dt('datepicker.transition.duration'),
            outline-color dt('datepicker.transition.duration'),
            box-shadow dt('datepicker.transition.duration');
    }

    .p-datepicker-select-month {
        padding: dt('datepicker.select.month.padding');
        color: dt('datepicker.select.month.color');
        border-radius: dt('datepicker.select.month.border.radius');
    }

    .p-datepicker-select-year {
        padding: dt('datepicker.select.year.padding');
        color: dt('datepicker.select.year.color');
        border-radius: dt('datepicker.select.year.border.radius');
    }

    .p-datepicker-select-month:enabled:hover {
        background: dt('datepicker.select.month.hover.background');
        color: dt('datepicker.select.month.hover.color');
    }

    .p-datepicker-select-year:enabled:hover {
        background: dt('datepicker.select.year.hover.background');
        color: dt('datepicker.select.year.hover.color');
    }

    .p-datepicker-select-month:focus-visible,
    .p-datepicker-select-year:focus-visible {
        box-shadow: dt('datepicker.date.focus.ring.shadow');
        outline: dt('datepicker.date.focus.ring.width') dt('datepicker.date.focus.ring.style') dt('datepicker.date.focus.ring.color');
        outline-offset: dt('datepicker.date.focus.ring.offset');
    }

    .p-datepicker-calendar-container {
        display: flex;
    }

    .p-datepicker-calendar-container .p-datepicker-calendar {
        flex: 1 1 auto;
        border-inline-start: 1px solid dt('datepicker.group.border.color');
        padding-inline-end: dt('datepicker.group.gap');
        padding-inline-start: dt('datepicker.group.gap');
    }

    .p-datepicker-calendar-container .p-datepicker-calendar:first-child {
        padding-inline-start: 0;
        border-inline-start: 0 none;
    }

    .p-datepicker-calendar-container .p-datepicker-calendar:last-child {
        padding-inline-end: 0;
    }

    .p-datepicker-day-view {
        width: 100%;
        border-collapse: collapse;
        font-size: 1rem;
        margin: dt('datepicker.day.view.margin');
    }

    .p-datepicker-weekday-cell {
        padding: dt('datepicker.week.day.padding');
    }

    .p-datepicker-weekday {
        font-weight: dt('datepicker.week.day.font.weight');
        color: dt('datepicker.week.day.color');
    }

    .p-datepicker-day-cell {
        padding: dt('datepicker.date.padding');
    }

    .p-datepicker-day {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        width: dt('datepicker.date.width');
        height: dt('datepicker.date.height');
        border-radius: dt('datepicker.date.border.radius');
        transition:
            background dt('datepicker.transition.duration'),
            color dt('datepicker.transition.duration'),
            border-color dt('datepicker.transition.duration'),
            box-shadow dt('datepicker.transition.duration'),
            outline-color dt('datepicker.transition.duration');
        border: 1px solid transparent;
        outline-color: transparent;
        color: dt('datepicker.date.color');
    }

    .p-datepicker-day:not(.p-datepicker-day-selected):not(.p-disabled):hover {
        background: dt('datepicker.date.hover.background');
        color: dt('datepicker.date.hover.color');
    }

    .p-datepicker-day:focus-visible {
        box-shadow: dt('datepicker.date.focus.ring.shadow');
        outline: dt('datepicker.date.focus.ring.width') dt('datepicker.date.focus.ring.style') dt('datepicker.date.focus.ring.color');
        outline-offset: dt('datepicker.date.focus.ring.offset');
    }

    .p-datepicker-day-selected {
        background: dt('datepicker.date.selected.background');
        color: dt('datepicker.date.selected.color');
    }

    .p-datepicker-day-selected-range {
        background: dt('datepicker.date.range.selected.background');
        color: dt('datepicker.date.range.selected.color');
    }

    .p-datepicker-today > .p-datepicker-day {
        background: dt('datepicker.today.background');
        color: dt('datepicker.today.color');
    }

    .p-datepicker-today > .p-datepicker-day-selected {
        background: dt('datepicker.date.selected.background');
        color: dt('datepicker.date.selected.color');
    }

    .p-datepicker-today > .p-datepicker-day-selected-range {
        background: dt('datepicker.date.range.selected.background');
        color: dt('datepicker.date.range.selected.color');
    }

    .p-datepicker-weeknumber {
        text-align: center;
    }

    .p-datepicker-month-view {
        margin: dt('datepicker.month.view.margin');
    }

    .p-datepicker-month {
        width: 33.3%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        overflow: hidden;
        position: relative;
        padding: dt('datepicker.month.padding');
        transition:
            background dt('datepicker.transition.duration'),
            color dt('datepicker.transition.duration'),
            border-color dt('datepicker.transition.duration'),
            box-shadow dt('datepicker.transition.duration'),
            outline-color dt('datepicker.transition.duration');
        border-radius: dt('datepicker.month.border.radius');
        outline-color: transparent;
        color: dt('datepicker.date.color');
    }

    .p-datepicker-month:not(.p-disabled):not(.p-datepicker-month-selected):hover {
        color: dt('datepicker.date.hover.color');
        background: dt('datepicker.date.hover.background');
    }

    .p-datepicker-month-selected {
        color: dt('datepicker.date.selected.color');
        background: dt('datepicker.date.selected.background');
    }

    .p-datepicker-month:not(.p-disabled):focus-visible {
        box-shadow: dt('datepicker.date.focus.ring.shadow');
        outline: dt('datepicker.date.focus.ring.width') dt('datepicker.date.focus.ring.style') dt('datepicker.date.focus.ring.color');
        outline-offset: dt('datepicker.date.focus.ring.offset');
    }

    .p-datepicker-year-view {
        margin: dt('datepicker.year.view.margin');
    }

    .p-datepicker-year {
        width: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        overflow: hidden;
        position: relative;
        padding: dt('datepicker.year.padding');
        transition:
            background dt('datepicker.transition.duration'),
            color dt('datepicker.transition.duration'),
            border-color dt('datepicker.transition.duration'),
            box-shadow dt('datepicker.transition.duration'),
            outline-color dt('datepicker.transition.duration');
        border-radius: dt('datepicker.year.border.radius');
        outline-color: transparent;
        color: dt('datepicker.date.color');
    }

    .p-datepicker-year:not(.p-disabled):not(.p-datepicker-year-selected):hover {
        color: dt('datepicker.date.hover.color');
        background: dt('datepicker.date.hover.background');
    }

    .p-datepicker-year-selected {
        color: dt('datepicker.date.selected.color');
        background: dt('datepicker.date.selected.background');
    }

    .p-datepicker-year:not(.p-disabled):focus-visible {
        box-shadow: dt('datepicker.date.focus.ring.shadow');
        outline: dt('datepicker.date.focus.ring.width') dt('datepicker.date.focus.ring.style') dt('datepicker.date.focus.ring.color');
        outline-offset: dt('datepicker.date.focus.ring.offset');
    }

    .p-datepicker-buttonbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: dt('datepicker.buttonbar.padding');
        border-block-start: 1px solid dt('datepicker.buttonbar.border.color');
    }

    .p-datepicker-buttonbar .p-button {
        width: auto;
    }

    .p-datepicker-time-picker {
        display: flex;
        justify-content: center;
        align-items: center;
        border-block-start: 1px solid dt('datepicker.time.picker.border.color');
        padding: 0;
        gap: dt('datepicker.time.picker.gap');
    }

    .p-datepicker-calendar-container + .p-datepicker-time-picker {
        padding: dt('datepicker.time.picker.padding');
    }

    .p-datepicker-time-picker > div {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: dt('datepicker.time.picker.button.gap');
    }

    .p-datepicker-time-picker span {
        font-size: 1rem;
    }

    .p-datepicker-timeonly .p-datepicker-time-picker {
        border-block-start: 0 none;
    }

    .p-datepicker-time-picker:dir(rtl) {
        flex-direction: row-reverse;
    }

    .p-datepicker:has(.p-inputtext-sm) .p-datepicker-dropdown {
        width: dt('datepicker.dropdown.sm.width');
    }

    .p-datepicker:has(.p-inputtext-sm) .p-datepicker-dropdown .p-icon,
    .p-datepicker:has(.p-inputtext-sm) .p-datepicker-input-icon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
    }

    .p-datepicker:has(.p-inputtext-lg) .p-datepicker-dropdown {
        width: dt('datepicker.dropdown.lg.width');
    }

    .p-datepicker:has(.p-inputtext-lg) .p-datepicker-dropdown .p-icon,
    .p-datepicker:has(.p-inputtext-lg) .p-datepicker-input-icon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
    }

    .p-datepicker-clear-icon {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        cursor: pointer;
        color: dt('form.field.icon.color');
        inset-inline-end: dt('form.field.padding.x');
    }

    .p-datepicker:has(.p-datepicker-dropdown) .p-datepicker-clear-icon {
        inset-inline-end: calc(dt('datepicker.dropdown.width') + dt('form.field.padding.x'));
    }

    .p-datepicker:has(.p-datepicker-input-icon-container) .p-datepicker-clear-icon {
        inset-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-datepicker:has(.p-datepicker-clear-icon) .p-datepicker-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-datepicker:has(.p-datepicker-input-icon-container):has(.p-datepicker-clear-icon) .p-datepicker-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 3) + calc(dt('icon.size') * 2));
    }

    .p-inputgroup .p-datepicker-dropdown {
        border-radius: 0;
    }

    .p-inputgroup > .p-datepicker:last-child:has(.p-datepicker-dropdown) > .p-datepicker-input {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    .p-inputgroup > .p-datepicker:last-child .p-datepicker-dropdown {
        border-start-end-radius: dt('datepicker.dropdown.border.radius');
        border-end-end-radius: dt('datepicker.dropdown.border.radius');
    }
`,wn={transitionDuration:"{transition.duration}"},xn={borderWidth:"0 0 1px 0",borderColor:"{content.border.color}"},Cn={color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{text.color}",activeHoverColor:"{text.color}",padding:"1.125rem",fontWeight:"600",borderRadius:"0",borderWidth:"0",borderColor:"{content.border.color}",background:"{content.background}",hoverBackground:"{content.background}",activeBackground:"{content.background}",activeHoverBackground:"{content.background}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"},toggleIcon:{color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{text.color}",activeHoverColor:"{text.color}"},first:{topBorderRadius:"{content.border.radius}",borderWidth:"0"},last:{bottomBorderRadius:"{content.border.radius}",activeBottomBorderRadius:"0"}},$n={borderWidth:"0",borderColor:"{content.border.color}",background:"{content.background}",color:"{text.color}",padding:"0 1.125rem 1.125rem 1.125rem"},Bn={root:wn,panel:xn,header:Cn,content:$n},Rn={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}"},Sn={background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},zn={padding:"{list.padding}",gap:"{list.gap}"},En={focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"},On={background:"{list.option.group.background}",color:"{list.option.group.color}",fontWeight:"{list.option.group.font.weight}",padding:"{list.option.group.padding}"},Tn={width:"2.5rem",sm:{width:"2rem"},lg:{width:"3rem"},borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.border.color}",activeBorderColor:"{form.field.border.color}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},An={borderRadius:"{border.radius.sm}"},Dn={padding:"{list.option.padding}"},Nn={light:{chip:{focusBackground:"{surface.200}",focusColor:"{surface.800}"},dropdown:{background:"{surface.100}",hoverBackground:"{surface.200}",activeBackground:"{surface.300}",color:"{surface.600}",hoverColor:"{surface.700}",activeColor:"{surface.800}"}},dark:{chip:{focusBackground:"{surface.700}",focusColor:"{surface.0}"},dropdown:{background:"{surface.800}",hoverBackground:"{surface.700}",activeBackground:"{surface.600}",color:"{surface.300}",hoverColor:"{surface.200}",activeColor:"{surface.100}"}}},Ln={root:Rn,overlay:Sn,list:zn,option:En,optionGroup:On,dropdown:Tn,chip:An,emptyMessage:Dn,colorScheme:Nn},Pn={width:"2rem",height:"2rem",fontSize:"1rem",background:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}"},Fn={size:"1rem"},_n={borderColor:"{content.background}",offset:"-0.75rem"},jn={width:"3rem",height:"3rem",fontSize:"1.5rem",icon:{size:"1.5rem"},group:{offset:"-1rem"}},In={width:"4rem",height:"4rem",fontSize:"2rem",icon:{size:"2rem"},group:{offset:"-1.5rem"}},Wn={root:Pn,icon:Fn,group:_n,lg:jn,xl:In},Un={borderRadius:"{border.radius.md}",padding:"0 0.5rem",fontSize:"0.75rem",fontWeight:"700",minWidth:"1.5rem",height:"1.5rem"},Hn={size:"0.5rem"},Mn={fontSize:"0.625rem",minWidth:"1.25rem",height:"1.25rem"},qn={fontSize:"0.875rem",minWidth:"1.75rem",height:"1.75rem"},Vn={fontSize:"1rem",minWidth:"2rem",height:"2rem"},Xn={light:{primary:{background:"{primary.color}",color:"{primary.contrast.color}"},secondary:{background:"{surface.100}",color:"{surface.600}"},success:{background:"{green.500}",color:"{surface.0}"},info:{background:"{sky.500}",color:"{surface.0}"},warn:{background:"{orange.500}",color:"{surface.0}"},danger:{background:"{red.500}",color:"{surface.0}"},contrast:{background:"{surface.950}",color:"{surface.0}"}},dark:{primary:{background:"{primary.color}",color:"{primary.contrast.color}"},secondary:{background:"{surface.800}",color:"{surface.300}"},success:{background:"{green.400}",color:"{green.950}"},info:{background:"{sky.400}",color:"{sky.950}"},warn:{background:"{orange.400}",color:"{orange.950}"},danger:{background:"{red.400}",color:"{red.950}"},contrast:{background:"{surface.0}",color:"{surface.950}"}}},Yn={root:Un,dot:Hn,sm:Mn,lg:qn,xl:Vn,colorScheme:Xn},Kn={borderRadius:{none:"0",xs:"2px",sm:"4px",md:"6px",lg:"8px",xl:"12px"},emerald:{50:"#ecfdf5",100:"#d1fae5",200:"#a7f3d0",300:"#6ee7b7",400:"#34d399",500:"#10b981",600:"#059669",700:"#047857",800:"#065f46",900:"#064e3b",950:"#022c22"},green:{50:"#f0fdf4",100:"#dcfce7",200:"#bbf7d0",300:"#86efac",400:"#4ade80",500:"#22c55e",600:"#16a34a",700:"#15803d",800:"#166534",900:"#14532d",950:"#052e16"},lime:{50:"#f7fee7",100:"#ecfccb",200:"#d9f99d",300:"#bef264",400:"#a3e635",500:"#84cc16",600:"#65a30d",700:"#4d7c0f",800:"#3f6212",900:"#365314",950:"#1a2e05"},red:{50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d",950:"#450a0a"},orange:{50:"#fff7ed",100:"#ffedd5",200:"#fed7aa",300:"#fdba74",400:"#fb923c",500:"#f97316",600:"#ea580c",700:"#c2410c",800:"#9a3412",900:"#7c2d12",950:"#431407"},amber:{50:"#fffbeb",100:"#fef3c7",200:"#fde68a",300:"#fcd34d",400:"#fbbf24",500:"#f59e0b",600:"#d97706",700:"#b45309",800:"#92400e",900:"#78350f",950:"#451a03"},yellow:{50:"#fefce8",100:"#fef9c3",200:"#fef08a",300:"#fde047",400:"#facc15",500:"#eab308",600:"#ca8a04",700:"#a16207",800:"#854d0e",900:"#713f12",950:"#422006"},teal:{50:"#f0fdfa",100:"#ccfbf1",200:"#99f6e4",300:"#5eead4",400:"#2dd4bf",500:"#14b8a6",600:"#0d9488",700:"#0f766e",800:"#115e59",900:"#134e4a",950:"#042f2e"},cyan:{50:"#ecfeff",100:"#cffafe",200:"#a5f3fc",300:"#67e8f9",400:"#22d3ee",500:"#06b6d4",600:"#0891b2",700:"#0e7490",800:"#155e75",900:"#164e63",950:"#083344"},sky:{50:"#f0f9ff",100:"#e0f2fe",200:"#bae6fd",300:"#7dd3fc",400:"#38bdf8",500:"#0ea5e9",600:"#0284c7",700:"#0369a1",800:"#075985",900:"#0c4a6e",950:"#082f49"},blue:{50:"#eff6ff",100:"#dbeafe",200:"#bfdbfe",300:"#93c5fd",400:"#60a5fa",500:"#3b82f6",600:"#2563eb",700:"#1d4ed8",800:"#1e40af",900:"#1e3a8a",950:"#172554"},indigo:{50:"#eef2ff",100:"#e0e7ff",200:"#c7d2fe",300:"#a5b4fc",400:"#818cf8",500:"#6366f1",600:"#4f46e5",700:"#4338ca",800:"#3730a3",900:"#312e81",950:"#1e1b4b"},violet:{50:"#f5f3ff",100:"#ede9fe",200:"#ddd6fe",300:"#c4b5fd",400:"#a78bfa",500:"#8b5cf6",600:"#7c3aed",700:"#6d28d9",800:"#5b21b6",900:"#4c1d95",950:"#2e1065"},purple:{50:"#faf5ff",100:"#f3e8ff",200:"#e9d5ff",300:"#d8b4fe",400:"#c084fc",500:"#a855f7",600:"#9333ea",700:"#7e22ce",800:"#6b21a8",900:"#581c87",950:"#3b0764"},fuchsia:{50:"#fdf4ff",100:"#fae8ff",200:"#f5d0fe",300:"#f0abfc",400:"#e879f9",500:"#d946ef",600:"#c026d3",700:"#a21caf",800:"#86198f",900:"#701a75",950:"#4a044e"},pink:{50:"#fdf2f8",100:"#fce7f3",200:"#fbcfe8",300:"#f9a8d4",400:"#f472b6",500:"#ec4899",600:"#db2777",700:"#be185d",800:"#9d174d",900:"#831843",950:"#500724"},rose:{50:"#fff1f2",100:"#ffe4e6",200:"#fecdd3",300:"#fda4af",400:"#fb7185",500:"#f43f5e",600:"#e11d48",700:"#be123c",800:"#9f1239",900:"#881337",950:"#4c0519"},slate:{50:"#f8fafc",100:"#f1f5f9",200:"#e2e8f0",300:"#cbd5e1",400:"#94a3b8",500:"#64748b",600:"#475569",700:"#334155",800:"#1e293b",900:"#0f172a",950:"#020617"},gray:{50:"#f9fafb",100:"#f3f4f6",200:"#e5e7eb",300:"#d1d5db",400:"#9ca3af",500:"#6b7280",600:"#4b5563",700:"#374151",800:"#1f2937",900:"#111827",950:"#030712"},zinc:{50:"#fafafa",100:"#f4f4f5",200:"#e4e4e7",300:"#d4d4d8",400:"#a1a1aa",500:"#71717a",600:"#52525b",700:"#3f3f46",800:"#27272a",900:"#18181b",950:"#09090b"},neutral:{50:"#fafafa",100:"#f5f5f5",200:"#e5e5e5",300:"#d4d4d4",400:"#a3a3a3",500:"#737373",600:"#525252",700:"#404040",800:"#262626",900:"#171717",950:"#0a0a0a"},stone:{50:"#fafaf9",100:"#f5f5f4",200:"#e7e5e4",300:"#d6d3d1",400:"#a8a29e",500:"#78716c",600:"#57534e",700:"#44403c",800:"#292524",900:"#1c1917",950:"#0c0a09"}},Jn={transitionDuration:"0.2s",focusRing:{width:"1px",style:"solid",color:"{primary.color}",offset:"2px",shadow:"none"},disabledOpacity:"0.6",iconSize:"1rem",anchorGutter:"2px",primary:{50:"{emerald.50}",100:"{emerald.100}",200:"{emerald.200}",300:"{emerald.300}",400:"{emerald.400}",500:"{emerald.500}",600:"{emerald.600}",700:"{emerald.700}",800:"{emerald.800}",900:"{emerald.900}",950:"{emerald.950}"},formField:{paddingX:"0.75rem",paddingY:"0.5rem",sm:{fontSize:"0.875rem",paddingX:"0.625rem",paddingY:"0.375rem"},lg:{fontSize:"1.125rem",paddingX:"0.875rem",paddingY:"0.625rem"},borderRadius:"{border.radius.md}",focusRing:{width:"0",style:"none",color:"transparent",offset:"0",shadow:"none"},transitionDuration:"{transition.duration}"},list:{padding:"0.25rem 0.25rem",gap:"2px",header:{padding:"0.5rem 1rem 0.25rem 1rem"},option:{padding:"0.5rem 0.75rem",borderRadius:"{border.radius.sm}"},optionGroup:{padding:"0.5rem 0.75rem",fontWeight:"600"}},content:{borderRadius:"{border.radius.md}"},mask:{transitionDuration:"0.3s"},navigation:{list:{padding:"0.25rem 0.25rem",gap:"2px"},item:{padding:"0.5rem 0.75rem",borderRadius:"{border.radius.sm}",gap:"0.5rem"},submenuLabel:{padding:"0.5rem 0.75rem",fontWeight:"600"},submenuIcon:{size:"0.875rem"}},overlay:{select:{borderRadius:"{border.radius.md}",shadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"},popover:{borderRadius:"{border.radius.md}",padding:"0.75rem",shadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"},modal:{borderRadius:"{border.radius.xl}",padding:"1.25rem",shadow:"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"},navigation:{shadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"}},colorScheme:{light:{surface:{0:"#ffffff",50:"{slate.50}",100:"{slate.100}",200:"{slate.200}",300:"{slate.300}",400:"{slate.400}",500:"{slate.500}",600:"{slate.600}",700:"{slate.700}",800:"{slate.800}",900:"{slate.900}",950:"{slate.950}"},primary:{color:"{primary.500}",contrastColor:"#ffffff",hoverColor:"{primary.600}",activeColor:"{primary.700}"},highlight:{background:"{primary.50}",focusBackground:"{primary.100}",color:"{primary.700}",focusColor:"{primary.800}"},mask:{background:"rgba(0,0,0,0.4)",color:"{surface.200}"},formField:{background:"{surface.0}",disabledBackground:"{surface.200}",filledBackground:"{surface.50}",filledHoverBackground:"{surface.50}",filledFocusBackground:"{surface.50}",borderColor:"{surface.300}",hoverBorderColor:"{surface.400}",focusBorderColor:"{primary.color}",invalidBorderColor:"{red.400}",color:"{surface.700}",disabledColor:"{surface.500}",placeholderColor:"{surface.500}",invalidPlaceholderColor:"{red.600}",floatLabelColor:"{surface.500}",floatLabelFocusColor:"{primary.600}",floatLabelActiveColor:"{surface.500}",floatLabelInvalidColor:"{form.field.invalid.placeholder.color}",iconColor:"{surface.400}",shadow:"0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)"},text:{color:"{surface.700}",hoverColor:"{surface.800}",mutedColor:"{surface.500}",hoverMutedColor:"{surface.600}"},content:{background:"{surface.0}",hoverBackground:"{surface.100}",borderColor:"{surface.200}",color:"{text.color}",hoverColor:"{text.hover.color}"},overlay:{select:{background:"{surface.0}",borderColor:"{surface.200}",color:"{text.color}"},popover:{background:"{surface.0}",borderColor:"{surface.200}",color:"{text.color}"},modal:{background:"{surface.0}",borderColor:"{surface.200}",color:"{text.color}"}},list:{option:{focusBackground:"{surface.100}",selectedBackground:"{highlight.background}",selectedFocusBackground:"{highlight.focus.background}",color:"{text.color}",focusColor:"{text.hover.color}",selectedColor:"{highlight.color}",selectedFocusColor:"{highlight.focus.color}",icon:{color:"{surface.400}",focusColor:"{surface.500}"}},optionGroup:{background:"transparent",color:"{text.muted.color}"}},navigation:{item:{focusBackground:"{surface.100}",activeBackground:"{surface.100}",color:"{text.color}",focusColor:"{text.hover.color}",activeColor:"{text.hover.color}",icon:{color:"{surface.400}",focusColor:"{surface.500}",activeColor:"{surface.500}"}},submenuLabel:{background:"transparent",color:"{text.muted.color}"},submenuIcon:{color:"{surface.400}",focusColor:"{surface.500}",activeColor:"{surface.500}"}}},dark:{surface:{0:"#ffffff",50:"{zinc.50}",100:"{zinc.100}",200:"{zinc.200}",300:"{zinc.300}",400:"{zinc.400}",500:"{zinc.500}",600:"{zinc.600}",700:"{zinc.700}",800:"{zinc.800}",900:"{zinc.900}",950:"{zinc.950}"},primary:{color:"{primary.400}",contrastColor:"{surface.900}",hoverColor:"{primary.300}",activeColor:"{primary.200}"},highlight:{background:"color-mix(in srgb, {primary.400}, transparent 84%)",focusBackground:"color-mix(in srgb, {primary.400}, transparent 76%)",color:"rgba(255,255,255,.87)",focusColor:"rgba(255,255,255,.87)"},mask:{background:"rgba(0,0,0,0.6)",color:"{surface.200}"},formField:{background:"{surface.950}",disabledBackground:"{surface.700}",filledBackground:"{surface.800}",filledHoverBackground:"{surface.800}",filledFocusBackground:"{surface.800}",borderColor:"{surface.600}",hoverBorderColor:"{surface.500}",focusBorderColor:"{primary.color}",invalidBorderColor:"{red.300}",color:"{surface.0}",disabledColor:"{surface.400}",placeholderColor:"{surface.400}",invalidPlaceholderColor:"{red.400}",floatLabelColor:"{surface.400}",floatLabelFocusColor:"{primary.color}",floatLabelActiveColor:"{surface.400}",floatLabelInvalidColor:"{form.field.invalid.placeholder.color}",iconColor:"{surface.400}",shadow:"0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)"},text:{color:"{surface.0}",hoverColor:"{surface.0}",mutedColor:"{surface.400}",hoverMutedColor:"{surface.300}"},content:{background:"{surface.900}",hoverBackground:"{surface.800}",borderColor:"{surface.700}",color:"{text.color}",hoverColor:"{text.hover.color}"},overlay:{select:{background:"{surface.900}",borderColor:"{surface.700}",color:"{text.color}"},popover:{background:"{surface.900}",borderColor:"{surface.700}",color:"{text.color}"},modal:{background:"{surface.900}",borderColor:"{surface.700}",color:"{text.color}"}},list:{option:{focusBackground:"{surface.800}",selectedBackground:"{highlight.background}",selectedFocusBackground:"{highlight.focus.background}",color:"{text.color}",focusColor:"{text.hover.color}",selectedColor:"{highlight.color}",selectedFocusColor:"{highlight.focus.color}",icon:{color:"{surface.500}",focusColor:"{surface.400}"}},optionGroup:{background:"transparent",color:"{text.muted.color}"}},navigation:{item:{focusBackground:"{surface.800}",activeBackground:"{surface.800}",color:"{text.color}",focusColor:"{text.hover.color}",activeColor:"{text.hover.color}",icon:{color:"{surface.500}",focusColor:"{surface.400}",activeColor:"{surface.400}"}},submenuLabel:{background:"transparent",color:"{text.muted.color}"},submenuIcon:{color:"{surface.500}",focusColor:"{surface.400}",activeColor:"{surface.400}"}}}}},Gn={primitive:Kn,semantic:Jn},Zn={borderRadius:"{content.border.radius}"},Qn={root:Zn},ot={padding:"1rem",background:"{content.background}",gap:"0.5rem",transitionDuration:"{transition.duration}"},et={color:"{text.muted.color}",hoverColor:"{text.color}",borderRadius:"{content.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",hoverColor:"{navigation.item.icon.focus.color}"},focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},rt={color:"{navigation.item.icon.color}"},nt={root:ot,item:et,separator:rt},tt={borderRadius:"{form.field.border.radius}",roundedBorderRadius:"2rem",gap:"0.5rem",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",iconOnlyWidth:"2.5rem",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}",iconOnlyWidth:"2rem"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}",iconOnlyWidth:"3rem"},label:{fontWeight:"500"},raisedShadow:"0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",offset:"{focus.ring.offset}"},badgeSize:"1rem",transitionDuration:"{form.field.transition.duration}"},at={light:{root:{primary:{background:"{primary.color}",hoverBackground:"{primary.hover.color}",activeBackground:"{primary.active.color}",borderColor:"{primary.color}",hoverBorderColor:"{primary.hover.color}",activeBorderColor:"{primary.active.color}",color:"{primary.contrast.color}",hoverColor:"{primary.contrast.color}",activeColor:"{primary.contrast.color}",focusRing:{color:"{primary.color}",shadow:"none"}},secondary:{background:"{surface.100}",hoverBackground:"{surface.200}",activeBackground:"{surface.300}",borderColor:"{surface.100}",hoverBorderColor:"{surface.200}",activeBorderColor:"{surface.300}",color:"{surface.600}",hoverColor:"{surface.700}",activeColor:"{surface.800}",focusRing:{color:"{surface.600}",shadow:"none"}},info:{background:"{sky.500}",hoverBackground:"{sky.600}",activeBackground:"{sky.700}",borderColor:"{sky.500}",hoverBorderColor:"{sky.600}",activeBorderColor:"{sky.700}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{sky.500}",shadow:"none"}},success:{background:"{green.500}",hoverBackground:"{green.600}",activeBackground:"{green.700}",borderColor:"{green.500}",hoverBorderColor:"{green.600}",activeBorderColor:"{green.700}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{green.500}",shadow:"none"}},warn:{background:"{orange.500}",hoverBackground:"{orange.600}",activeBackground:"{orange.700}",borderColor:"{orange.500}",hoverBorderColor:"{orange.600}",activeBorderColor:"{orange.700}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{orange.500}",shadow:"none"}},help:{background:"{purple.500}",hoverBackground:"{purple.600}",activeBackground:"{purple.700}",borderColor:"{purple.500}",hoverBorderColor:"{purple.600}",activeBorderColor:"{purple.700}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{purple.500}",shadow:"none"}},danger:{background:"{red.500}",hoverBackground:"{red.600}",activeBackground:"{red.700}",borderColor:"{red.500}",hoverBorderColor:"{red.600}",activeBorderColor:"{red.700}",color:"#ffffff",hoverColor:"#ffffff",activeColor:"#ffffff",focusRing:{color:"{red.500}",shadow:"none"}},contrast:{background:"{surface.950}",hoverBackground:"{surface.900}",activeBackground:"{surface.800}",borderColor:"{surface.950}",hoverBorderColor:"{surface.900}",activeBorderColor:"{surface.800}",color:"{surface.0}",hoverColor:"{surface.0}",activeColor:"{surface.0}",focusRing:{color:"{surface.950}",shadow:"none"}}},outlined:{primary:{hoverBackground:"{primary.50}",activeBackground:"{primary.100}",borderColor:"{primary.200}",color:"{primary.color}"},secondary:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",borderColor:"{surface.200}",color:"{surface.500}"},success:{hoverBackground:"{green.50}",activeBackground:"{green.100}",borderColor:"{green.200}",color:"{green.500}"},info:{hoverBackground:"{sky.50}",activeBackground:"{sky.100}",borderColor:"{sky.200}",color:"{sky.500}"},warn:{hoverBackground:"{orange.50}",activeBackground:"{orange.100}",borderColor:"{orange.200}",color:"{orange.500}"},help:{hoverBackground:"{purple.50}",activeBackground:"{purple.100}",borderColor:"{purple.200}",color:"{purple.500}"},danger:{hoverBackground:"{red.50}",activeBackground:"{red.100}",borderColor:"{red.200}",color:"{red.500}"},contrast:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",borderColor:"{surface.700}",color:"{surface.950}"},plain:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",borderColor:"{surface.200}",color:"{surface.700}"}},text:{primary:{hoverBackground:"{primary.50}",activeBackground:"{primary.100}",color:"{primary.color}"},secondary:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",color:"{surface.500}"},success:{hoverBackground:"{green.50}",activeBackground:"{green.100}",color:"{green.500}"},info:{hoverBackground:"{sky.50}",activeBackground:"{sky.100}",color:"{sky.500}"},warn:{hoverBackground:"{orange.50}",activeBackground:"{orange.100}",color:"{orange.500}"},help:{hoverBackground:"{purple.50}",activeBackground:"{purple.100}",color:"{purple.500}"},danger:{hoverBackground:"{red.50}",activeBackground:"{red.100}",color:"{red.500}"},contrast:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",color:"{surface.950}"},plain:{hoverBackground:"{surface.50}",activeBackground:"{surface.100}",color:"{surface.700}"}},link:{color:"{primary.color}",hoverColor:"{primary.color}",activeColor:"{primary.color}"}},dark:{root:{primary:{background:"{primary.color}",hoverBackground:"{primary.hover.color}",activeBackground:"{primary.active.color}",borderColor:"{primary.color}",hoverBorderColor:"{primary.hover.color}",activeBorderColor:"{primary.active.color}",color:"{primary.contrast.color}",hoverColor:"{primary.contrast.color}",activeColor:"{primary.contrast.color}",focusRing:{color:"{primary.color}",shadow:"none"}},secondary:{background:"{surface.800}",hoverBackground:"{surface.700}",activeBackground:"{surface.600}",borderColor:"{surface.800}",hoverBorderColor:"{surface.700}",activeBorderColor:"{surface.600}",color:"{surface.300}",hoverColor:"{surface.200}",activeColor:"{surface.100}",focusRing:{color:"{surface.300}",shadow:"none"}},info:{background:"{sky.400}",hoverBackground:"{sky.300}",activeBackground:"{sky.200}",borderColor:"{sky.400}",hoverBorderColor:"{sky.300}",activeBorderColor:"{sky.200}",color:"{sky.950}",hoverColor:"{sky.950}",activeColor:"{sky.950}",focusRing:{color:"{sky.400}",shadow:"none"}},success:{background:"{green.400}",hoverBackground:"{green.300}",activeBackground:"{green.200}",borderColor:"{green.400}",hoverBorderColor:"{green.300}",activeBorderColor:"{green.200}",color:"{green.950}",hoverColor:"{green.950}",activeColor:"{green.950}",focusRing:{color:"{green.400}",shadow:"none"}},warn:{background:"{orange.400}",hoverBackground:"{orange.300}",activeBackground:"{orange.200}",borderColor:"{orange.400}",hoverBorderColor:"{orange.300}",activeBorderColor:"{orange.200}",color:"{orange.950}",hoverColor:"{orange.950}",activeColor:"{orange.950}",focusRing:{color:"{orange.400}",shadow:"none"}},help:{background:"{purple.400}",hoverBackground:"{purple.300}",activeBackground:"{purple.200}",borderColor:"{purple.400}",hoverBorderColor:"{purple.300}",activeBorderColor:"{purple.200}",color:"{purple.950}",hoverColor:"{purple.950}",activeColor:"{purple.950}",focusRing:{color:"{purple.400}",shadow:"none"}},danger:{background:"{red.400}",hoverBackground:"{red.300}",activeBackground:"{red.200}",borderColor:"{red.400}",hoverBorderColor:"{red.300}",activeBorderColor:"{red.200}",color:"{red.950}",hoverColor:"{red.950}",activeColor:"{red.950}",focusRing:{color:"{red.400}",shadow:"none"}},contrast:{background:"{surface.0}",hoverBackground:"{surface.100}",activeBackground:"{surface.200}",borderColor:"{surface.0}",hoverBorderColor:"{surface.100}",activeBorderColor:"{surface.200}",color:"{surface.950}",hoverColor:"{surface.950}",activeColor:"{surface.950}",focusRing:{color:"{surface.0}",shadow:"none"}}},outlined:{primary:{hoverBackground:"color-mix(in srgb, {primary.color}, transparent 96%)",activeBackground:"color-mix(in srgb, {primary.color}, transparent 84%)",borderColor:"{primary.700}",color:"{primary.color}"},secondary:{hoverBackground:"rgba(255,255,255,0.04)",activeBackground:"rgba(255,255,255,0.16)",borderColor:"{surface.700}",color:"{surface.400}"},success:{hoverBackground:"color-mix(in srgb, {green.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {green.400}, transparent 84%)",borderColor:"{green.700}",color:"{green.400}"},info:{hoverBackground:"color-mix(in srgb, {sky.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {sky.400}, transparent 84%)",borderColor:"{sky.700}",color:"{sky.400}"},warn:{hoverBackground:"color-mix(in srgb, {orange.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {orange.400}, transparent 84%)",borderColor:"{orange.700}",color:"{orange.400}"},help:{hoverBackground:"color-mix(in srgb, {purple.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {purple.400}, transparent 84%)",borderColor:"{purple.700}",color:"{purple.400}"},danger:{hoverBackground:"color-mix(in srgb, {red.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {red.400}, transparent 84%)",borderColor:"{red.700}",color:"{red.400}"},contrast:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",borderColor:"{surface.500}",color:"{surface.0}"},plain:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",borderColor:"{surface.600}",color:"{surface.0}"}},text:{primary:{hoverBackground:"color-mix(in srgb, {primary.color}, transparent 96%)",activeBackground:"color-mix(in srgb, {primary.color}, transparent 84%)",color:"{primary.color}"},secondary:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",color:"{surface.400}"},success:{hoverBackground:"color-mix(in srgb, {green.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {green.400}, transparent 84%)",color:"{green.400}"},info:{hoverBackground:"color-mix(in srgb, {sky.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {sky.400}, transparent 84%)",color:"{sky.400}"},warn:{hoverBackground:"color-mix(in srgb, {orange.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {orange.400}, transparent 84%)",color:"{orange.400}"},help:{hoverBackground:"color-mix(in srgb, {purple.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {purple.400}, transparent 84%)",color:"{purple.400}"},danger:{hoverBackground:"color-mix(in srgb, {red.400}, transparent 96%)",activeBackground:"color-mix(in srgb, {red.400}, transparent 84%)",color:"{red.400}"},contrast:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",color:"{surface.0}"},plain:{hoverBackground:"{surface.800}",activeBackground:"{surface.700}",color:"{surface.0}"}},link:{color:"{primary.color}",hoverColor:"{primary.color}",activeColor:"{primary.color}"}}},dt={root:tt,colorScheme:at},it={background:"{content.background}",borderRadius:"{border.radius.xl}",color:"{content.color}",shadow:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"},lt={padding:"1.25rem",gap:"0.5rem"},ct={gap:"0.5rem"},st={fontSize:"1.25rem",fontWeight:"500"},ut={color:"{text.muted.color}"},pt={root:it,body:lt,caption:ct,title:st,subtitle:ut},bt={transitionDuration:"{transition.duration}"},ft={gap:"0.25rem"},gt={padding:"1rem",gap:"0.5rem"},ht={width:"2rem",height:"0.5rem",borderRadius:"{content.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},mt={light:{indicator:{background:"{surface.200}",hoverBackground:"{surface.300}",activeBackground:"{primary.color}"}},dark:{indicator:{background:"{surface.700}",hoverBackground:"{surface.600}",activeBackground:"{primary.color}"}}},kt={root:bt,content:ft,indicatorList:gt,indicator:ht,colorScheme:mt},vt={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},yt={width:"2.5rem",color:"{form.field.icon.color}"},wt={background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},xt={padding:"{list.padding}",gap:"{list.gap}",mobileIndent:"1rem"},Ct={focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}",icon:{color:"{list.option.icon.color}",focusColor:"{list.option.icon.focus.color}",size:"0.875rem"}},$t={color:"{form.field.icon.color}"},Bt={root:vt,dropdown:yt,overlay:wt,list:xt,option:Ct,clearIcon:$t},Rt={borderRadius:"{border.radius.sm}",width:"1.25rem",height:"1.25rem",background:"{form.field.background}",checkedBackground:"{primary.color}",checkedHoverBackground:"{primary.hover.color}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.border.color}",checkedBorderColor:"{primary.color}",checkedHoverBorderColor:"{primary.hover.color}",checkedFocusBorderColor:"{primary.color}",checkedDisabledBorderColor:"{form.field.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",shadow:"{form.field.shadow}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{width:"1rem",height:"1rem"},lg:{width:"1.5rem",height:"1.5rem"}},St={size:"0.875rem",color:"{form.field.color}",checkedColor:"{primary.contrast.color}",checkedHoverColor:"{primary.contrast.color}",disabledColor:"{form.field.disabled.color}",sm:{size:"0.75rem"},lg:{size:"1rem"}},zt={root:Rt,icon:St},Et={borderRadius:"16px",paddingX:"0.75rem",paddingY:"0.5rem",gap:"0.5rem",transitionDuration:"{transition.duration}"},Ot={width:"2rem",height:"2rem"},Tt={size:"1rem"},At={size:"1rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"}},Dt={light:{root:{background:"{surface.100}",color:"{surface.800}"},icon:{color:"{surface.800}"},removeIcon:{color:"{surface.800}"}},dark:{root:{background:"{surface.800}",color:"{surface.0}"},icon:{color:"{surface.0}"},removeIcon:{color:"{surface.0}"}}},Nt={root:Et,image:Ot,icon:Tt,removeIcon:At,colorScheme:Dt},Lt={transitionDuration:"{transition.duration}"},Pt={width:"1.5rem",height:"1.5rem",borderRadius:"{form.field.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Ft={shadow:"{overlay.popover.shadow}",borderRadius:"{overlay.popover.borderRadius}"},_t={light:{panel:{background:"{surface.800}",borderColor:"{surface.900}"},handle:{color:"{surface.0}"}},dark:{panel:{background:"{surface.900}",borderColor:"{surface.700}"},handle:{color:"{surface.0}"}}},jt={root:Lt,preview:Pt,panel:Ft,colorScheme:_t},It={size:"2rem",color:"{overlay.modal.color}"},Wt={gap:"1rem"},Ut={icon:It,content:Wt},Ht={background:"{overlay.popover.background}",borderColor:"{overlay.popover.border.color}",color:"{overlay.popover.color}",borderRadius:"{overlay.popover.border.radius}",shadow:"{overlay.popover.shadow}",gutter:"10px",arrowOffset:"1.25rem"},Mt={padding:"{overlay.popover.padding}",gap:"1rem"},qt={size:"1.5rem",color:"{overlay.popover.color}"},Vt={gap:"0.5rem",padding:"0 {overlay.popover.padding} {overlay.popover.padding} {overlay.popover.padding}"},Xt={root:Ht,content:Mt,icon:qt,footer:Vt},Yt={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.navigation.shadow}",transitionDuration:"{transition.duration}"},Kt={padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},Jt={focusBackground:"{navigation.item.focus.background}",activeBackground:"{navigation.item.active.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",activeColor:"{navigation.item.active.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}",activeColor:"{navigation.item.icon.active.color}"}},Gt={mobileIndent:"1rem"},Zt={size:"{navigation.submenu.icon.size}",color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}",activeColor:"{navigation.submenu.icon.active.color}"},Qt={borderColor:"{content.border.color}"},oa={root:Yt,list:Kt,item:Jt,submenu:Gt,submenuIcon:Zt,separator:Qt},ea=`
    li.p-autocomplete-option,
    div.p-cascadeselect-option-content,
    li.p-listbox-option,
    li.p-multiselect-option,
    li.p-select-option,
    li.p-listbox-option,
    div.p-tree-node-content,
    li.p-datatable-filter-constraint,
    .p-datatable .p-datatable-tbody > tr,
    .p-treetable .p-treetable-tbody > tr,
    div.p-menu-item-content,
    div.p-tieredmenu-item-content,
    div.p-contextmenu-item-content,
    div.p-menubar-item-content,
    div.p-megamenu-item-content,
    div.p-panelmenu-header-content,
    div.p-panelmenu-item-content,
    th.p-datatable-header-cell,
    th.p-treetable-header-cell,
    thead.p-datatable-thead > tr > th,
    .p-treetable thead.p-treetable-thead>tr>th {
        transition: none;
    }
`,ra={transitionDuration:"{transition.duration}"},na={background:"{content.background}",borderColor:"{datatable.border.color}",color:"{content.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem",sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},ta={background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",borderColor:"{datatable.border.color}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{highlight.color}",gap:"0.5rem",padding:"0.75rem 1rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"},sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},aa={fontWeight:"600"},da={background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{highlight.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"}},ia={borderColor:"{datatable.border.color}",padding:"0.75rem 1rem",sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},la={background:"{content.background}",borderColor:"{datatable.border.color}",color:"{content.color}",padding:"0.75rem 1rem",sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},ca={fontWeight:"600"},sa={background:"{content.background}",borderColor:"{datatable.border.color}",color:"{content.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem",sm:{padding:"0.375rem 0.5rem"},lg:{padding:"1rem 1.25rem"}},ua={color:"{primary.color}"},pa={width:"0.5rem"},ba={width:"1px",color:"{primary.color}"},fa={color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",size:"0.875rem"},ga={size:"2rem"},ha={hoverBackground:"{content.hover.background}",selectedHoverBackground:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.color}",selectedHoverColor:"{primary.color}",size:"1.75rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},ma={inlineGap:"0.5rem",overlaySelect:{background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},overlayPopover:{background:"{overlay.popover.background}",borderColor:"{overlay.popover.border.color}",borderRadius:"{overlay.popover.border.radius}",color:"{overlay.popover.color}",shadow:"{overlay.popover.shadow}",padding:"{overlay.popover.padding}",gap:"0.5rem"},rule:{borderColor:"{content.border.color}"},constraintList:{padding:"{list.padding}",gap:"{list.gap}"},constraint:{focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",separator:{borderColor:"{content.border.color}"},padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"}},ka={borderColor:"{datatable.border.color}",borderWidth:"0 0 1px 0"},va={borderColor:"{datatable.border.color}",borderWidth:"0 0 1px 0"},ya={light:{root:{borderColor:"{content.border.color}"},row:{stripedBackground:"{surface.50}"},bodyCell:{selectedBorderColor:"{primary.100}"}},dark:{root:{borderColor:"{surface.800}"},row:{stripedBackground:"{surface.950}"},bodyCell:{selectedBorderColor:"{primary.900}"}}},wa=`
    .p-datatable-mask.p-overlay-mask {
        --px-mask-background: light-dark(rgba(255,255,255,0.5),rgba(0,0,0,0.3));
    }
`,xa={root:ra,header:na,headerCell:ta,columnTitle:aa,row:da,bodyCell:ia,footerCell:la,columnFooter:ca,footer:sa,dropPoint:ua,columnResizer:pa,resizeIndicator:ba,sortIcon:fa,loadingIcon:ga,rowToggleButton:ha,filter:ma,paginatorTop:ka,paginatorBottom:va,colorScheme:ya,css:wa},Ca={borderColor:"transparent",borderWidth:"0",borderRadius:"0",padding:"0"},$a={background:"{content.background}",color:"{content.color}",borderColor:"{content.border.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem",borderRadius:"0"},Ba={background:"{content.background}",color:"{content.color}",borderColor:"transparent",borderWidth:"0",padding:"0",borderRadius:"0"},Ra={background:"{content.background}",color:"{content.color}",borderColor:"{content.border.color}",borderWidth:"1px 0 0 0",padding:"0.75rem 1rem",borderRadius:"0"},Sa={borderColor:"{content.border.color}",borderWidth:"0 0 1px 0"},za={borderColor:"{content.border.color}",borderWidth:"1px 0 0 0"},Ea={root:Ca,header:$a,content:Ba,footer:Ra,paginatorTop:Sa,paginatorBottom:za},Oa={transitionDuration:"{transition.duration}"},Ta={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.popover.shadow}",padding:"{overlay.popover.padding}"},Aa={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",padding:"0 0 0.5rem 0"},Da={gap:"0.5rem",fontWeight:"500"},Na={width:"2.5rem",sm:{width:"2rem"},lg:{width:"3rem"},borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.border.color}",activeBorderColor:"{form.field.border.color}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},La={color:"{form.field.icon.color}"},Pa={hoverBackground:"{content.hover.background}",color:"{content.color}",hoverColor:"{content.hover.color}",padding:"0.25rem 0.5rem",borderRadius:"{content.border.radius}"},Fa={hoverBackground:"{content.hover.background}",color:"{content.color}",hoverColor:"{content.hover.color}",padding:"0.25rem 0.5rem",borderRadius:"{content.border.radius}"},_a={borderColor:"{content.border.color}",gap:"{overlay.popover.padding}"},ja={margin:"0.5rem 0 0 0"},Ia={padding:"0.25rem",fontWeight:"500",color:"{content.color}"},Wa={hoverBackground:"{content.hover.background}",selectedBackground:"{primary.color}",rangeSelectedBackground:"{highlight.background}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{primary.contrast.color}",rangeSelectedColor:"{highlight.color}",width:"2rem",height:"2rem",borderRadius:"50%",padding:"0.25rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Ua={margin:"0.5rem 0 0 0"},Ha={padding:"0.375rem",borderRadius:"{content.border.radius}"},Ma={margin:"0.5rem 0 0 0"},qa={padding:"0.375rem",borderRadius:"{content.border.radius}"},Va={padding:"0.5rem 0 0 0",borderColor:"{content.border.color}"},Xa={padding:"0.5rem 0 0 0",borderColor:"{content.border.color}",gap:"0.5rem",buttonGap:"0.25rem"},Ya={light:{dropdown:{background:"{surface.100}",hoverBackground:"{surface.200}",activeBackground:"{surface.300}",color:"{surface.600}",hoverColor:"{surface.700}",activeColor:"{surface.800}"},today:{background:"{surface.200}",color:"{surface.900}"}},dark:{dropdown:{background:"{surface.800}",hoverBackground:"{surface.700}",activeBackground:"{surface.600}",color:"{surface.300}",hoverColor:"{surface.200}",activeColor:"{surface.100}"},today:{background:"{surface.700}",color:"{surface.0}"}}},Ka={root:Oa,panel:Ta,header:Aa,title:Da,dropdown:Na,inputIcon:La,selectMonth:Pa,selectYear:Fa,group:_a,dayView:ja,weekDay:Ia,date:Wa,monthView:Ua,month:Ha,yearView:Ma,year:qa,buttonbar:Va,timePicker:Xa,colorScheme:Ya},Ja={background:"{overlay.modal.background}",borderColor:"{overlay.modal.border.color}",color:"{overlay.modal.color}",borderRadius:"{overlay.modal.border.radius}",shadow:"{overlay.modal.shadow}"},Ga={padding:"{overlay.modal.padding}",gap:"0.5rem"},Za={fontSize:"1.25rem",fontWeight:"600"},Qa={padding:"0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}"},od={padding:"0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}",gap:"0.5rem"},ed={root:Ja,header:Ga,title:Za,content:Qa,footer:od},rd={borderColor:"{content.border.color}"},nd={background:"{content.background}",color:"{text.color}"},td={margin:"1rem 0",padding:"0 1rem",content:{padding:"0 0.5rem"}},ad={margin:"0 1rem",padding:"0.5rem 0",content:{padding:"0.5rem 0"}},dd={root:rd,content:nd,horizontal:td,vertical:ad},id={background:"rgba(255, 255, 255, 0.1)",borderColor:"rgba(255, 255, 255, 0.2)",padding:"0.5rem",borderRadius:"{border.radius.xl}"},ld={borderRadius:"{content.border.radius}",padding:"0.5rem",size:"3rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},cd={root:id,item:ld},sd={background:"{overlay.modal.background}",borderColor:"{overlay.modal.border.color}",color:"{overlay.modal.color}",shadow:"{overlay.modal.shadow}"},ud={padding:"{overlay.modal.padding}"},pd={fontSize:"1.5rem",fontWeight:"600"},bd={padding:"0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}"},fd={padding:"{overlay.modal.padding}"},gd={root:sd,header:ud,title:pd,content:bd,footer:fd},hd={background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}"},md={color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}"},kd={background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}",padding:"{list.padding}"},vd={focusBackground:"{list.option.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"},yd={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}"},wd={toolbar:hd,toolbarItem:md,overlay:kd,overlayOption:vd,content:yd},xd={background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",color:"{content.color}",padding:"0 1.125rem 1.125rem 1.125rem",transitionDuration:"{transition.duration}"},Cd={background:"{content.background}",hoverBackground:"{content.hover.background}",color:"{content.color}",hoverColor:"{content.hover.color}",borderRadius:"{content.border.radius}",borderWidth:"1px",borderColor:"transparent",padding:"0.5rem 0.75rem",gap:"0.5rem",fontWeight:"600",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},$d={color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}"},Bd={padding:"0"},Rd={root:xd,legend:Cd,toggleIcon:$d,content:Bd},Sd={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",transitionDuration:"{transition.duration}"},zd={background:"transparent",color:"{text.color}",padding:"1.125rem",borderColor:"unset",borderWidth:"0",borderRadius:"0",gap:"0.5rem"},Ed={highlightBorderColor:"{primary.color}",padding:"0 1.125rem 1.125rem 1.125rem",gap:"1rem"},Od={padding:"1rem",gap:"1rem",borderColor:"{content.border.color}",info:{gap:"0.5rem"}},Td={gap:"0.5rem"},Ad={height:"0.25rem"},Dd={gap:"0.5rem"},Nd={root:Sd,header:zd,content:Ed,file:Od,fileList:Td,progressbar:Ad,basic:Dd},Ld={color:"{form.field.float.label.color}",focusColor:"{form.field.float.label.focus.color}",activeColor:"{form.field.float.label.active.color}",invalidColor:"{form.field.float.label.invalid.color}",transitionDuration:"0.2s",positionX:"{form.field.padding.x}",positionY:"{form.field.padding.y}",fontWeight:"500",active:{fontSize:"0.75rem",fontWeight:"400"}},Pd={active:{top:"-1.25rem"}},Fd={input:{paddingTop:"1.5rem",paddingBottom:"{form.field.padding.y}"},active:{top:"{form.field.padding.y}"}},_d={borderRadius:"{border.radius.xs}",active:{background:"{form.field.background}",padding:"0 0.125rem"}},jd={root:Ld,over:Pd,in:Fd,on:_d},Id={borderWidth:"1px",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",transitionDuration:"{transition.duration}"},Wd={background:"rgba(255, 255, 255, 0.1)",hoverBackground:"rgba(255, 255, 255, 0.2)",color:"{surface.100}",hoverColor:"{surface.0}",size:"3rem",gutter:"0.5rem",prev:{borderRadius:"50%"},next:{borderRadius:"50%"},focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Ud={size:"1.5rem"},Hd={background:"{content.background}",padding:"1rem 0.25rem"},Md={size:"2rem",borderRadius:"{content.border.radius}",gutter:"0.5rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},qd={size:"1rem"},Vd={background:"rgba(0, 0, 0, 0.5)",color:"{surface.100}",padding:"1rem"},Xd={gap:"0.5rem",padding:"1rem"},Yd={width:"1rem",height:"1rem",activeBackground:"{primary.color}",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Kd={background:"rgba(0, 0, 0, 0.5)"},Jd={background:"rgba(255, 255, 255, 0.4)",hoverBackground:"rgba(255, 255, 255, 0.6)",activeBackground:"rgba(255, 255, 255, 0.9)"},Gd={size:"3rem",gutter:"0.5rem",background:"rgba(255, 255, 255, 0.1)",hoverBackground:"rgba(255, 255, 255, 0.2)",color:"{surface.50}",hoverColor:"{surface.0}",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Zd={size:"1.5rem"},Qd={light:{thumbnailNavButton:{hoverBackground:"{surface.100}",color:"{surface.600}",hoverColor:"{surface.700}"},indicatorButton:{background:"{surface.200}",hoverBackground:"{surface.300}"}},dark:{thumbnailNavButton:{hoverBackground:"{surface.700}",color:"{surface.400}",hoverColor:"{surface.0}"},indicatorButton:{background:"{surface.700}",hoverBackground:"{surface.600}"}}},oi={root:Id,navButton:Wd,navIcon:Ud,thumbnailsContent:Hd,thumbnailNavButton:Md,thumbnailNavButtonIcon:qd,caption:Vd,indicatorList:Xd,indicatorButton:Yd,insetIndicatorList:Kd,insetIndicatorButton:Jd,closeButton:Gd,closeButtonIcon:Zd,colorScheme:Qd},ei={color:"{form.field.icon.color}"},ri={icon:ei},ni={color:"{form.field.float.label.color}",focusColor:"{form.field.float.label.focus.color}",invalidColor:"{form.field.float.label.invalid.color}",transitionDuration:"0.2s",positionX:"{form.field.padding.x}",top:"{form.field.padding.y}",fontSize:"0.75rem",fontWeight:"400"},ti={paddingTop:"1.5rem",paddingBottom:"{form.field.padding.y}"},ai={root:ni,input:ti},di={transitionDuration:"{transition.duration}"},ii={icon:{size:"1.5rem"},mask:{background:"{mask.background}",color:"{mask.color}"}},li={position:{left:"auto",right:"1rem",top:"1rem",bottom:"auto"},blur:"8px",background:"rgba(255,255,255,0.1)",borderColor:"rgba(255,255,255,0.2)",borderWidth:"1px",borderRadius:"30px",padding:".5rem",gap:"0.5rem"},ci={hoverBackground:"rgba(255,255,255,0.1)",color:"{surface.50}",hoverColor:"{surface.0}",size:"3rem",iconSize:"1.5rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},si={root:di,preview:ii,toolbar:li,action:ci},ui={size:"15px",hoverSize:"30px",background:"rgba(255,255,255,0.3)",hoverBackground:"rgba(255,255,255,0.3)",borderColor:"unset",hoverBorderColor:"unset",borderWidth:"0",borderRadius:"50%",transitionDuration:"{transition.duration}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"rgba(255,255,255,0.3)",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},pi={handle:ui},bi={padding:"{form.field.padding.y} {form.field.padding.x}",borderRadius:"{content.border.radius}",gap:"0.5rem"},fi={fontWeight:"500"},gi={size:"1rem"},hi={light:{info:{background:"color-mix(in srgb, {blue.50}, transparent 5%)",borderColor:"{blue.200}",color:"{blue.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)"},success:{background:"color-mix(in srgb, {green.50}, transparent 5%)",borderColor:"{green.200}",color:"{green.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)"},warn:{background:"color-mix(in srgb,{yellow.50}, transparent 5%)",borderColor:"{yellow.200}",color:"{yellow.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)"},error:{background:"color-mix(in srgb, {red.50}, transparent 5%)",borderColor:"{red.200}",color:"{red.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)"},secondary:{background:"{surface.100}",borderColor:"{surface.200}",color:"{surface.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)"},contrast:{background:"{surface.900}",borderColor:"{surface.950}",color:"{surface.50}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)"}},dark:{info:{background:"color-mix(in srgb, {blue.500}, transparent 84%)",borderColor:"color-mix(in srgb, {blue.700}, transparent 64%)",color:"{blue.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)"},success:{background:"color-mix(in srgb, {green.500}, transparent 84%)",borderColor:"color-mix(in srgb, {green.700}, transparent 64%)",color:"{green.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)"},warn:{background:"color-mix(in srgb, {yellow.500}, transparent 84%)",borderColor:"color-mix(in srgb, {yellow.700}, transparent 64%)",color:"{yellow.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)"},error:{background:"color-mix(in srgb, {red.500}, transparent 84%)",borderColor:"color-mix(in srgb, {red.700}, transparent 64%)",color:"{red.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)"},secondary:{background:"{surface.800}",borderColor:"{surface.700}",color:"{surface.300}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)"},contrast:{background:"{surface.0}",borderColor:"{surface.100}",color:"{surface.950}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)"}}},mi={root:bi,text:fi,icon:gi,colorScheme:hi},ki={padding:"{form.field.padding.y} {form.field.padding.x}",borderRadius:"{content.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},transitionDuration:"{transition.duration}"},vi={hoverBackground:"{content.hover.background}",hoverColor:"{content.hover.color}"},yi={root:ki,display:vi},wi={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}"},xi={borderRadius:"{border.radius.sm}"},Ci={light:{chip:{focusBackground:"{surface.200}",color:"{surface.800}"}},dark:{chip:{focusBackground:"{surface.700}",color:"{surface.0}"}}},$i={root:wi,chip:xi,colorScheme:Ci},Bi={background:"{form.field.background}",borderColor:"{form.field.border.color}",color:"{form.field.icon.color}",borderRadius:"{form.field.border.radius}",padding:"0.5rem",minWidth:"2.5rem"},Ri={addon:Bi},Si={transitionDuration:"{transition.duration}"},zi={width:"2.5rem",borderRadius:"{form.field.border.radius}",verticalPadding:"{form.field.padding.y}"},Ei={light:{button:{background:"transparent",hoverBackground:"{surface.100}",activeBackground:"{surface.200}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.border.color}",activeBorderColor:"{form.field.border.color}",color:"{surface.400}",hoverColor:"{surface.500}",activeColor:"{surface.600}"}},dark:{button:{background:"transparent",hoverBackground:"{surface.800}",activeBackground:"{surface.700}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.border.color}",activeBorderColor:"{form.field.border.color}",color:"{surface.400}",hoverColor:"{surface.300}",activeColor:"{surface.200}"}}},Oi={root:Si,button:zi,colorScheme:Ei},Ti={gap:"0.5rem"},Ai={width:"2.5rem",sm:{width:"2rem"},lg:{width:"3rem"}},Di={root:Ti,input:Ai},Ni={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},Li={root:Ni},Pi={transitionDuration:"{transition.duration}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Fi={background:"{primary.color}"},_i={background:"{content.border.color}"},ji={color:"{text.muted.color}"},Ii={root:Pi,value:Fi,range:_i,text:ji},Wi={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",borderColor:"{form.field.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",shadow:"{form.field.shadow}",borderRadius:"{form.field.border.radius}",transitionDuration:"{form.field.transition.duration}"},Ui={padding:"{list.padding}",gap:"{list.gap}",header:{padding:"{list.header.padding}"}},Hi={focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"},Mi={background:"{list.option.group.background}",color:"{list.option.group.color}",fontWeight:"{list.option.group.font.weight}",padding:"{list.option.group.padding}"},qi={color:"{list.option.color}",gutterStart:"-0.375rem",gutterEnd:"0.375rem"},Vi={padding:"{list.option.padding}"},Xi={light:{option:{stripedBackground:"{surface.50}"}},dark:{option:{stripedBackground:"{surface.900}"}}},Yi={root:Wi,list:Ui,option:Hi,optionGroup:Mi,checkmark:qi,emptyMessage:Vi,colorScheme:Xi},Ki={background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",color:"{content.color}",gap:"0.5rem",verticalOrientation:{padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},horizontalOrientation:{padding:"0.5rem 0.75rem",gap:"0.5rem"},transitionDuration:"{transition.duration}"},Ji={borderRadius:"{content.border.radius}",padding:"{navigation.item.padding}"},Gi={focusBackground:"{navigation.item.focus.background}",activeBackground:"{navigation.item.active.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",activeColor:"{navigation.item.active.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}",activeColor:"{navigation.item.icon.active.color}"}},Zi={padding:"0",background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",color:"{content.color}",shadow:"{overlay.navigation.shadow}",gap:"0.5rem"},Qi={padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},ol={padding:"{navigation.submenu.label.padding}",fontWeight:"{navigation.submenu.label.font.weight}",background:"{navigation.submenu.label.background}",color:"{navigation.submenu.label.color}"},el={size:"{navigation.submenu.icon.size}",color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}",activeColor:"{navigation.submenu.icon.active.color}"},rl={borderColor:"{content.border.color}"},nl={borderRadius:"50%",size:"1.75rem",color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",hoverBackground:"{content.hover.background}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},tl={root:Ki,baseItem:Ji,item:Gi,overlay:Zi,submenu:Qi,submenuLabel:ol,submenuIcon:el,separator:rl,mobileButton:nl},al={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.navigation.shadow}",transitionDuration:"{transition.duration}"},dl={padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},il={focusBackground:"{navigation.item.focus.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}"}},ll={padding:"{navigation.submenu.label.padding}",fontWeight:"{navigation.submenu.label.font.weight}",background:"{navigation.submenu.label.background}",color:"{navigation.submenu.label.color}"},cl={borderColor:"{content.border.color}"},sl={root:al,list:dl,item:il,submenuLabel:ll,separator:cl},ul={background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",color:"{content.color}",gap:"0.5rem",padding:"0.5rem 0.75rem",transitionDuration:"{transition.duration}"},pl={borderRadius:"{content.border.radius}",padding:"{navigation.item.padding}"},bl={focusBackground:"{navigation.item.focus.background}",activeBackground:"{navigation.item.active.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",activeColor:"{navigation.item.active.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}",activeColor:"{navigation.item.icon.active.color}"}},fl={padding:"{navigation.list.padding}",gap:"{navigation.list.gap}",background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.navigation.shadow}",mobileIndent:"1rem",icon:{size:"{navigation.submenu.icon.size}",color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}",activeColor:"{navigation.submenu.icon.active.color}"}},gl={borderColor:"{content.border.color}"},hl={borderRadius:"50%",size:"1.75rem",color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",hoverBackground:"{content.hover.background}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},ml={root:ul,baseItem:pl,item:bl,submenu:fl,separator:gl,mobileButton:hl},kl={borderRadius:"{content.border.radius}",borderWidth:"1px",transitionDuration:"{transition.duration}"},vl={padding:"0.5rem 0.75rem",gap:"0.5rem",sm:{padding:"0.375rem 0.625rem"},lg:{padding:"0.625rem 0.875rem"}},yl={fontSize:"1rem",fontWeight:"500",sm:{fontSize:"0.875rem"},lg:{fontSize:"1.125rem"}},wl={size:"1.125rem",sm:{size:"1rem"},lg:{size:"1.25rem"}},xl={width:"1.75rem",height:"1.75rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",offset:"{focus.ring.offset}"}},Cl={size:"1rem",sm:{size:"0.875rem"},lg:{size:"1.125rem"}},$l={root:{borderWidth:"1px"}},Bl={content:{padding:"0"}},Rl={light:{info:{background:"color-mix(in srgb, {blue.50}, transparent 5%)",borderColor:"{blue.200}",color:"{blue.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)",closeButton:{hoverBackground:"{blue.100}",focusRing:{color:"{blue.600}",shadow:"none"}},outlined:{color:"{blue.600}",borderColor:"{blue.600}"},simple:{color:"{blue.600}"}},success:{background:"color-mix(in srgb, {green.50}, transparent 5%)",borderColor:"{green.200}",color:"{green.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)",closeButton:{hoverBackground:"{green.100}",focusRing:{color:"{green.600}",shadow:"none"}},outlined:{color:"{green.600}",borderColor:"{green.600}"},simple:{color:"{green.600}"}},warn:{background:"color-mix(in srgb,{yellow.50}, transparent 5%)",borderColor:"{yellow.200}",color:"{yellow.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)",closeButton:{hoverBackground:"{yellow.100}",focusRing:{color:"{yellow.600}",shadow:"none"}},outlined:{color:"{yellow.600}",borderColor:"{yellow.600}"},simple:{color:"{yellow.600}"}},error:{background:"color-mix(in srgb, {red.50}, transparent 5%)",borderColor:"{red.200}",color:"{red.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)",closeButton:{hoverBackground:"{red.100}",focusRing:{color:"{red.600}",shadow:"none"}},outlined:{color:"{red.600}",borderColor:"{red.600}"},simple:{color:"{red.600}"}},secondary:{background:"{surface.100}",borderColor:"{surface.200}",color:"{surface.600}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)",closeButton:{hoverBackground:"{surface.200}",focusRing:{color:"{surface.600}",shadow:"none"}},outlined:{color:"{surface.500}",borderColor:"{surface.500}"},simple:{color:"{surface.500}"}},contrast:{background:"{surface.900}",borderColor:"{surface.950}",color:"{surface.50}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)",closeButton:{hoverBackground:"{surface.800}",focusRing:{color:"{surface.50}",shadow:"none"}},outlined:{color:"{surface.950}",borderColor:"{surface.950}"},simple:{color:"{surface.950}"}}},dark:{info:{background:"color-mix(in srgb, {blue.500}, transparent 84%)",borderColor:"color-mix(in srgb, {blue.700}, transparent 64%)",color:"{blue.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{blue.500}",shadow:"none"}},outlined:{color:"{blue.500}",borderColor:"{blue.500}"},simple:{color:"{blue.500}"}},success:{background:"color-mix(in srgb, {green.500}, transparent 84%)",borderColor:"color-mix(in srgb, {green.700}, transparent 64%)",color:"{green.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{green.500}",shadow:"none"}},outlined:{color:"{green.500}",borderColor:"{green.500}"},simple:{color:"{green.500}"}},warn:{background:"color-mix(in srgb, {yellow.500}, transparent 84%)",borderColor:"color-mix(in srgb, {yellow.700}, transparent 64%)",color:"{yellow.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{yellow.500}",shadow:"none"}},outlined:{color:"{yellow.500}",borderColor:"{yellow.500}"},simple:{color:"{yellow.500}"}},error:{background:"color-mix(in srgb, {red.500}, transparent 84%)",borderColor:"color-mix(in srgb, {red.700}, transparent 64%)",color:"{red.500}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{red.500}",shadow:"none"}},outlined:{color:"{red.500}",borderColor:"{red.500}"},simple:{color:"{red.500}"}},secondary:{background:"{surface.800}",borderColor:"{surface.700}",color:"{surface.300}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)",closeButton:{hoverBackground:"{surface.700}",focusRing:{color:"{surface.300}",shadow:"none"}},outlined:{color:"{surface.400}",borderColor:"{surface.400}"},simple:{color:"{surface.400}"}},contrast:{background:"{surface.0}",borderColor:"{surface.100}",color:"{surface.950}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)",closeButton:{hoverBackground:"{surface.100}",focusRing:{color:"{surface.950}",shadow:"none"}},outlined:{color:"{surface.0}",borderColor:"{surface.0}"},simple:{color:"{surface.0}"}}}},Sl={root:kl,content:vl,text:yl,icon:wl,closeButton:xl,closeIcon:Cl,outlined:$l,simple:Bl,colorScheme:Rl},zl={borderRadius:"{content.border.radius}",gap:"1rem"},El={background:"{content.border.color}",size:"0.5rem"},Ol={gap:"0.5rem"},Tl={size:"0.5rem"},Al={size:"1rem"},Dl={verticalGap:"0.5rem",horizontalGap:"1rem"},Nl={root:zl,meters:El,label:Ol,labelMarker:Tl,labelIcon:Al,labelList:Dl},Ll={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},Pl={width:"2.5rem",color:"{form.field.icon.color}"},Fl={background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},_l={padding:"{list.padding}",gap:"{list.gap}",header:{padding:"{list.header.padding}"}},jl={focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}",gap:"0.5rem"},Il={background:"{list.option.group.background}",color:"{list.option.group.color}",fontWeight:"{list.option.group.font.weight}",padding:"{list.option.group.padding}"},Wl={color:"{form.field.icon.color}"},Ul={borderRadius:"{border.radius.sm}"},Hl={padding:"{list.option.padding}"},Ml={root:Ll,dropdown:Pl,overlay:Fl,list:_l,option:jl,optionGroup:Il,chip:Ul,clearIcon:Wl,emptyMessage:Hl},ql={gap:"1.125rem"},Vl={gap:"0.5rem"},Xl={root:ql,controls:Vl},Yl={gutter:"0.75rem",transitionDuration:"{transition.duration}"},Kl={background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",borderColor:"{content.border.color}",color:"{content.color}",selectedColor:"{highlight.color}",hoverColor:"{content.hover.color}",padding:"0.75rem 1rem",toggleablePadding:"0.75rem 1rem 1.25rem 1rem",borderRadius:"{content.border.radius}"},Jl={background:"{content.background}",hoverBackground:"{content.hover.background}",borderColor:"{content.border.color}",color:"{text.muted.color}",hoverColor:"{text.color}",size:"1.5rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Gl={color:"{content.border.color}",borderRadius:"{content.border.radius}",height:"24px"},Zl={root:Yl,node:Kl,nodeToggleButton:Jl,connector:Gl},Ql={outline:{width:"2px",color:"{content.background}"}},oc={root:Ql},ec={padding:"0.5rem 1rem",gap:"0.25rem",borderRadius:"{content.border.radius}",background:"{content.background}",color:"{content.color}",transitionDuration:"{transition.duration}"},rc={background:"transparent",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",selectedColor:"{highlight.color}",width:"2.5rem",height:"2.5rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},nc={color:"{text.muted.color}"},tc={maxWidth:"2.5rem"},ac={root:ec,navButton:rc,currentPageReport:nc,jumpToPageInput:tc},dc={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}"},ic={background:"transparent",color:"{text.color}",padding:"1.125rem",borderColor:"{content.border.color}",borderWidth:"0",borderRadius:"0"},lc={padding:"0.375rem 1.125rem"},cc={fontWeight:"600"},sc={padding:"0 1.125rem 1.125rem 1.125rem"},uc={padding:"0 1.125rem 1.125rem 1.125rem"},pc={root:dc,header:ic,toggleableHeader:lc,title:cc,content:sc,footer:uc},bc={gap:"0.5rem",transitionDuration:"{transition.duration}"},fc={background:"{content.background}",borderColor:"{content.border.color}",borderWidth:"1px",color:"{content.color}",padding:"0.25rem 0.25rem",borderRadius:"{content.border.radius}",first:{borderWidth:"1px",topBorderRadius:"{content.border.radius}"},last:{borderWidth:"1px",bottomBorderRadius:"{content.border.radius}"}},gc={focusBackground:"{navigation.item.focus.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",gap:"0.5rem",padding:"{navigation.item.padding}",borderRadius:"{content.border.radius}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}"}},hc={indent:"1rem"},mc={color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}"},kc={root:bc,panel:fc,item:gc,submenu:hc,submenuIcon:mc},vc={background:"{content.border.color}",borderRadius:"{content.border.radius}",height:".75rem"},yc={color:"{form.field.icon.color}"},wc={background:"{overlay.popover.background}",borderColor:"{overlay.popover.border.color}",borderRadius:"{overlay.popover.border.radius}",color:"{overlay.popover.color}",padding:"{overlay.popover.padding}",shadow:"{overlay.popover.shadow}"},xc={gap:"0.5rem"},Cc={light:{strength:{weakBackground:"{red.500}",mediumBackground:"{amber.500}",strongBackground:"{green.500}"}},dark:{strength:{weakBackground:"{red.400}",mediumBackground:"{amber.400}",strongBackground:"{green.400}"}}},$c={meter:vc,icon:yc,overlay:wc,content:xc,colorScheme:Cc},Bc={gap:"1.125rem"},Rc={gap:"0.5rem"},Sc={root:Bc,controls:Rc},zc={background:"{overlay.popover.background}",borderColor:"{overlay.popover.border.color}",color:"{overlay.popover.color}",borderRadius:"{overlay.popover.border.radius}",shadow:"{overlay.popover.shadow}",gutter:"10px",arrowOffset:"1.25rem"},Ec={padding:"{overlay.popover.padding}"},Oc={root:zc,content:Ec},Tc={background:"{content.border.color}",borderRadius:"{content.border.radius}",height:"1.25rem"},Ac={background:"{primary.color}"},Dc={color:"{primary.contrast.color}",fontSize:"0.75rem",fontWeight:"600"},Nc={root:Tc,value:Ac,label:Dc},Lc={light:{root:{colorOne:"{red.500}",colorTwo:"{blue.500}",colorThree:"{green.500}",colorFour:"{yellow.500}"}},dark:{root:{colorOne:"{red.400}",colorTwo:"{blue.400}",colorThree:"{green.400}",colorFour:"{yellow.400}"}}},Pc={colorScheme:Lc},Fc={width:"1.25rem",height:"1.25rem",background:"{form.field.background}",checkedBackground:"{primary.color}",checkedHoverBackground:"{primary.hover.color}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.border.color}",checkedBorderColor:"{primary.color}",checkedHoverBorderColor:"{primary.hover.color}",checkedFocusBorderColor:"{primary.color}",checkedDisabledBorderColor:"{form.field.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",shadow:"{form.field.shadow}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{width:"1rem",height:"1rem"},lg:{width:"1.5rem",height:"1.5rem"}},_c={size:"0.75rem",checkedColor:"{primary.contrast.color}",checkedHoverColor:"{primary.contrast.color}",disabledColor:"{form.field.disabled.color}",sm:{size:"0.5rem"},lg:{size:"1rem"}},jc={root:Fc,icon:_c},Ic={gap:"0.25rem",transitionDuration:"{transition.duration}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Wc={size:"1rem",color:"{text.muted.color}",hoverColor:"{primary.color}",activeColor:"{primary.color}"},Uc={root:Ic,icon:Wc},Hc={light:{root:{background:"rgba(0,0,0,0.1)"}},dark:{root:{background:"rgba(255,255,255,0.3)"}}},Mc={colorScheme:Hc},qc={transitionDuration:"{transition.duration}"},Vc={size:"9px",borderRadius:"{border.radius.sm}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Xc={light:{bar:{background:"{surface.100}"}},dark:{bar:{background:"{surface.800}"}}},Yc={root:qc,bar:Vc,colorScheme:Xc},Kc={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},Jc={width:"2.5rem",color:"{form.field.icon.color}"},Gc={background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},Zc={padding:"{list.padding}",gap:"{list.gap}",header:{padding:"{list.header.padding}"}},Qc={focusBackground:"{list.option.focus.background}",selectedBackground:"{list.option.selected.background}",selectedFocusBackground:"{list.option.selected.focus.background}",color:"{list.option.color}",focusColor:"{list.option.focus.color}",selectedColor:"{list.option.selected.color}",selectedFocusColor:"{list.option.selected.focus.color}",padding:"{list.option.padding}",borderRadius:"{list.option.border.radius}"},os={background:"{list.option.group.background}",color:"{list.option.group.color}",fontWeight:"{list.option.group.font.weight}",padding:"{list.option.group.padding}"},es={color:"{form.field.icon.color}"},rs={color:"{list.option.color}",gutterStart:"-0.375rem",gutterEnd:"0.375rem"},ns={padding:"{list.option.padding}"},ts={root:Kc,dropdown:Jc,overlay:Gc,list:Zc,option:Qc,optionGroup:os,clearIcon:es,checkmark:rs,emptyMessage:ns},as={borderRadius:"{form.field.border.radius}"},ds={light:{root:{invalidBorderColor:"{form.field.invalid.border.color}"}},dark:{root:{invalidBorderColor:"{form.field.invalid.border.color}"}}},is={root:as,colorScheme:ds},ls={borderRadius:"{content.border.radius}"},cs={light:{root:{background:"{surface.200}",animationBackground:"rgba(255,255,255,0.4)"}},dark:{root:{background:"rgba(255, 255, 255, 0.06)",animationBackground:"rgba(255, 255, 255, 0.04)"}}},ss={root:ls,colorScheme:cs},us={transitionDuration:"{transition.duration}"},ps={background:"{content.border.color}",borderRadius:"{content.border.radius}",size:"3px"},bs={background:"{primary.color}"},fs={width:"20px",height:"20px",borderRadius:"50%",background:"{content.border.color}",hoverBackground:"{content.border.color}",content:{borderRadius:"50%",hoverBackground:"{content.background}",width:"16px",height:"16px",shadow:"0px 0.5px 0px 0px rgba(0, 0, 0, 0.08), 0px 1px 1px 0px rgba(0, 0, 0, 0.14)"},focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},gs={light:{handle:{content:{background:"{surface.0}"}}},dark:{handle:{content:{background:"{surface.950}"}}}},hs={root:us,track:ps,range:bs,handle:fs,colorScheme:gs},ms={gap:"0.5rem",transitionDuration:"{transition.duration}"},ks={root:ms},vs={borderRadius:"{form.field.border.radius}",roundedBorderRadius:"2rem",raisedShadow:"0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)"},ys={root:vs},ws={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",transitionDuration:"{transition.duration}"},xs={background:"{content.border.color}"},Cs={size:"24px",background:"transparent",borderRadius:"{content.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},$s={root:ws,gutter:xs,handle:Cs},Bs={transitionDuration:"{transition.duration}"},Rs={background:"{content.border.color}",activeBackground:"{primary.color}",margin:"0 0 0 1.625rem",size:"2px"},Ss={padding:"0.5rem",gap:"1rem"},zs={padding:"0",borderRadius:"{content.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},gap:"0.5rem"},Es={color:"{text.muted.color}",activeColor:"{primary.color}",fontWeight:"500"},Os={background:"{content.background}",activeBackground:"{content.background}",borderColor:"{content.border.color}",activeBorderColor:"{content.border.color}",color:"{text.muted.color}",activeColor:"{primary.color}",size:"2rem",fontSize:"1.143rem",fontWeight:"500",borderRadius:"50%",shadow:"0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)"},Ts={padding:"0.875rem 0.5rem 1.125rem 0.5rem"},As={background:"{content.background}",color:"{content.color}",padding:"0",indent:"1rem"},Ds={root:Bs,separator:Rs,step:Ss,stepHeader:zs,stepTitle:Es,stepNumber:Os,steppanels:Ts,steppanel:As},Ns={transitionDuration:"{transition.duration}"},Ls={background:"{content.border.color}"},Ps={borderRadius:"{content.border.radius}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},gap:"0.5rem"},Fs={color:"{text.muted.color}",activeColor:"{primary.color}",fontWeight:"500"},_s={background:"{content.background}",activeBackground:"{content.background}",borderColor:"{content.border.color}",activeBorderColor:"{content.border.color}",color:"{text.muted.color}",activeColor:"{primary.color}",size:"2rem",fontSize:"1.143rem",fontWeight:"500",borderRadius:"50%",shadow:"0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)"},js={root:Ns,separator:Ls,itemLink:Ps,itemLabel:Fs,itemNumber:_s},Is={transitionDuration:"{transition.duration}"},Ws={borderWidth:"0 0 1px 0",background:"{content.background}",borderColor:"{content.border.color}"},Us={background:"transparent",hoverBackground:"transparent",activeBackground:"transparent",borderWidth:"0 0 1px 0",borderColor:"{content.border.color}",hoverBorderColor:"{content.border.color}",activeBorderColor:"{primary.color}",color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}",padding:"1rem 1.125rem",fontWeight:"600",margin:"0 0 -1px 0",gap:"0.5rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Hs={color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}"},Ms={height:"1px",bottom:"-1px",background:"{primary.color}"},qs={root:Is,tablist:Ws,item:Us,itemIcon:Hs,activeBar:Ms},Vs={transitionDuration:"{transition.duration}"},Xs={borderWidth:"0 0 1px 0",background:"{content.background}",borderColor:"{content.border.color}"},Ys={background:"transparent",hoverBackground:"transparent",activeBackground:"transparent",borderWidth:"0 0 1px 0",borderColor:"{content.border.color}",hoverBorderColor:"{content.border.color}",activeBorderColor:"{primary.color}",color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}",padding:"1rem 1.125rem",fontWeight:"600",margin:"0 0 -1px 0",gap:"0.5rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"}},Ks={background:"{content.background}",color:"{content.color}",padding:"0.875rem 1.125rem 1.125rem 1.125rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"inset {focus.ring.shadow}"}},Js={background:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.color}",width:"2.5rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"}},Gs={height:"1px",bottom:"-1px",background:"{primary.color}"},Zs={light:{navButton:{shadow:"0px 0px 10px 50px rgba(255, 255, 255, 0.6)"}},dark:{navButton:{shadow:"0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)"}}},Qs={root:Vs,tablist:Xs,tab:Ys,tabpanel:Ks,navButton:Js,activeBar:Gs,colorScheme:Zs},ou={transitionDuration:"{transition.duration}"},eu={background:"{content.background}",borderColor:"{content.border.color}"},ru={borderColor:"{content.border.color}",activeBorderColor:"{primary.color}",color:"{text.muted.color}",hoverColor:"{text.color}",activeColor:"{primary.color}"},nu={background:"{content.background}",color:"{content.color}"},tu={background:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.color}"},au={light:{navButton:{shadow:"0px 0px 10px 50px rgba(255, 255, 255, 0.6)"}},dark:{navButton:{shadow:"0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)"}}},du={root:ou,tabList:eu,tab:ru,tabPanel:nu,navButton:tu,colorScheme:au},iu={fontSize:"0.875rem",fontWeight:"700",padding:"0.25rem 0.5rem",gap:"0.25rem",borderRadius:"{content.border.radius}",roundedBorderRadius:"{border.radius.xl}"},lu={size:"0.75rem"},cu={light:{primary:{background:"{primary.100}",color:"{primary.700}"},secondary:{background:"{surface.100}",color:"{surface.600}"},success:{background:"{green.100}",color:"{green.700}"},info:{background:"{sky.100}",color:"{sky.700}"},warn:{background:"{orange.100}",color:"{orange.700}"},danger:{background:"{red.100}",color:"{red.700}"},contrast:{background:"{surface.950}",color:"{surface.0}"}},dark:{primary:{background:"color-mix(in srgb, {primary.500}, transparent 84%)",color:"{primary.300}"},secondary:{background:"{surface.800}",color:"{surface.300}"},success:{background:"color-mix(in srgb, {green.500}, transparent 84%)",color:"{green.300}"},info:{background:"color-mix(in srgb, {sky.500}, transparent 84%)",color:"{sky.300}"},warn:{background:"color-mix(in srgb, {orange.500}, transparent 84%)",color:"{orange.300}"},danger:{background:"color-mix(in srgb, {red.500}, transparent 84%)",color:"{red.300}"},contrast:{background:"{surface.0}",color:"{surface.950}"}}},su={root:iu,icon:lu,colorScheme:cu},uu={background:"{form.field.background}",borderColor:"{form.field.border.color}",color:"{form.field.color}",height:"18rem",padding:"{form.field.padding.y} {form.field.padding.x}",borderRadius:"{form.field.border.radius}"},pu={gap:"0.25rem"},bu={margin:"2px 0"},fu={root:uu,prompt:pu,commandResponse:bu},gu={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},hu={root:gu},mu={background:"{content.background}",borderColor:"{content.border.color}",color:"{content.color}",borderRadius:"{content.border.radius}",shadow:"{overlay.navigation.shadow}",transitionDuration:"{transition.duration}"},ku={padding:"{navigation.list.padding}",gap:"{navigation.list.gap}"},vu={focusBackground:"{navigation.item.focus.background}",activeBackground:"{navigation.item.active.background}",color:"{navigation.item.color}",focusColor:"{navigation.item.focus.color}",activeColor:"{navigation.item.active.color}",padding:"{navigation.item.padding}",borderRadius:"{navigation.item.border.radius}",gap:"{navigation.item.gap}",icon:{color:"{navigation.item.icon.color}",focusColor:"{navigation.item.icon.focus.color}",activeColor:"{navigation.item.icon.active.color}"}},yu={mobileIndent:"1rem"},wu={size:"{navigation.submenu.icon.size}",color:"{navigation.submenu.icon.color}",focusColor:"{navigation.submenu.icon.focus.color}",activeColor:"{navigation.submenu.icon.active.color}"},xu={borderColor:"{content.border.color}"},Cu={root:mu,list:ku,item:vu,submenu:yu,submenuIcon:wu,separator:xu},$u={minHeight:"5rem"},Bu={eventContent:{padding:"1rem 0"}},Ru={eventContent:{padding:"0 1rem"}},Su={size:"1.125rem",borderRadius:"50%",borderWidth:"2px",background:"{content.background}",borderColor:"{content.border.color}",content:{borderRadius:"50%",size:"0.375rem",background:"{primary.color}",insetShadow:"0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)"}},zu={color:"{content.border.color}",size:"2px"},Eu={event:$u,horizontal:Bu,vertical:Ru,eventMarker:Su,eventConnector:zu},Ou={width:"25rem",borderRadius:"{content.border.radius}",borderWidth:"1px",transitionDuration:"{transition.duration}"},Tu={size:"1.125rem"},Au={padding:"{overlay.popover.padding}",gap:"0.5rem"},Du={gap:"0.5rem"},Nu={fontWeight:"500",fontSize:"1rem"},Lu={fontWeight:"500",fontSize:"0.875rem"},Pu={width:"1.75rem",height:"1.75rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",offset:"{focus.ring.offset}"}},Fu={size:"1rem"},_u={light:{root:{blur:"1.5px"},info:{background:"color-mix(in srgb, {blue.50}, transparent 5%)",borderColor:"{blue.200}",color:"{blue.600}",detailColor:"{surface.700}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)",closeButton:{hoverBackground:"{blue.100}",focusRing:{color:"{blue.600}",shadow:"none"}}},success:{background:"color-mix(in srgb, {green.50}, transparent 5%)",borderColor:"{green.200}",color:"{green.600}",detailColor:"{surface.700}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)",closeButton:{hoverBackground:"{green.100}",focusRing:{color:"{green.600}",shadow:"none"}}},warn:{background:"color-mix(in srgb,{yellow.50}, transparent 5%)",borderColor:"{yellow.200}",color:"{yellow.600}",detailColor:"{surface.700}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)",closeButton:{hoverBackground:"{yellow.100}",focusRing:{color:"{yellow.600}",shadow:"none"}}},error:{background:"color-mix(in srgb, {red.50}, transparent 5%)",borderColor:"{red.200}",color:"{red.600}",detailColor:"{surface.700}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)",closeButton:{hoverBackground:"{red.100}",focusRing:{color:"{red.600}",shadow:"none"}}},secondary:{background:"{surface.100}",borderColor:"{surface.200}",color:"{surface.600}",detailColor:"{surface.700}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)",closeButton:{hoverBackground:"{surface.200}",focusRing:{color:"{surface.600}",shadow:"none"}}},contrast:{background:"{surface.900}",borderColor:"{surface.950}",color:"{surface.50}",detailColor:"{surface.0}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)",closeButton:{hoverBackground:"{surface.800}",focusRing:{color:"{surface.50}",shadow:"none"}}}},dark:{root:{blur:"10px"},info:{background:"color-mix(in srgb, {blue.500}, transparent 84%)",borderColor:"color-mix(in srgb, {blue.700}, transparent 64%)",color:"{blue.500}",detailColor:"{surface.0}",shadow:"0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{blue.500}",shadow:"none"}}},success:{background:"color-mix(in srgb, {green.500}, transparent 84%)",borderColor:"color-mix(in srgb, {green.700}, transparent 64%)",color:"{green.500}",detailColor:"{surface.0}",shadow:"0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{green.500}",shadow:"none"}}},warn:{background:"color-mix(in srgb, {yellow.500}, transparent 84%)",borderColor:"color-mix(in srgb, {yellow.700}, transparent 64%)",color:"{yellow.500}",detailColor:"{surface.0}",shadow:"0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{yellow.500}",shadow:"none"}}},error:{background:"color-mix(in srgb, {red.500}, transparent 84%)",borderColor:"color-mix(in srgb, {red.700}, transparent 64%)",color:"{red.500}",detailColor:"{surface.0}",shadow:"0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)",closeButton:{hoverBackground:"rgba(255, 255, 255, 0.05)",focusRing:{color:"{red.500}",shadow:"none"}}},secondary:{background:"{surface.800}",borderColor:"{surface.700}",color:"{surface.300}",detailColor:"{surface.0}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)",closeButton:{hoverBackground:"{surface.700}",focusRing:{color:"{surface.300}",shadow:"none"}}},contrast:{background:"{surface.0}",borderColor:"{surface.100}",color:"{surface.950}",detailColor:"{surface.950}",shadow:"0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)",closeButton:{hoverBackground:"{surface.100}",focusRing:{color:"{surface.950}",shadow:"none"}}}}},ju={root:Ou,icon:Tu,content:Au,text:Du,summary:Nu,detail:Lu,closeButton:Pu,closeIcon:Fu,colorScheme:_u},Iu={padding:"0.25rem",borderRadius:"{content.border.radius}",gap:"0.5rem",fontWeight:"500",disabledBackground:"{form.field.disabled.background}",disabledBorderColor:"{form.field.disabled.background}",disabledColor:"{form.field.disabled.color}",invalidBorderColor:"{form.field.invalid.border.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",padding:"0.25rem"},lg:{fontSize:"{form.field.lg.font.size}",padding:"0.25rem"}},Wu={disabledColor:"{form.field.disabled.color}"},Uu={padding:"0.25rem 0.75rem",borderRadius:"{content.border.radius}",checkedShadow:"0px 1px 2px 0px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.04)",sm:{padding:"0.25rem 0.75rem"},lg:{padding:"0.25rem 0.75rem"}},Hu={light:{root:{background:"{surface.100}",checkedBackground:"{surface.100}",hoverBackground:"{surface.100}",borderColor:"{surface.100}",color:"{surface.500}",hoverColor:"{surface.700}",checkedColor:"{surface.900}",checkedBorderColor:"{surface.100}"},content:{checkedBackground:"{surface.0}"},icon:{color:"{surface.500}",hoverColor:"{surface.700}",checkedColor:"{surface.900}"}},dark:{root:{background:"{surface.950}",checkedBackground:"{surface.950}",hoverBackground:"{surface.950}",borderColor:"{surface.950}",color:"{surface.400}",hoverColor:"{surface.300}",checkedColor:"{surface.0}",checkedBorderColor:"{surface.950}"},content:{checkedBackground:"{surface.800}"},icon:{color:"{surface.400}",hoverColor:"{surface.300}",checkedColor:"{surface.0}"}}},Mu={root:Iu,icon:Wu,content:Uu,colorScheme:Hu},qu={width:"2.5rem",height:"1.5rem",borderRadius:"30px",gap:"0.25rem",shadow:"{form.field.shadow}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"},borderWidth:"1px",borderColor:"transparent",hoverBorderColor:"transparent",checkedBorderColor:"transparent",checkedHoverBorderColor:"transparent",invalidBorderColor:"{form.field.invalid.border.color}",transitionDuration:"{form.field.transition.duration}",slideDuration:"0.2s"},Vu={borderRadius:"50%",size:"1rem"},Xu={light:{root:{background:"{surface.300}",disabledBackground:"{form.field.disabled.background}",hoverBackground:"{surface.400}",checkedBackground:"{primary.color}",checkedHoverBackground:"{primary.hover.color}"},handle:{background:"{surface.0}",disabledBackground:"{form.field.disabled.color}",hoverBackground:"{surface.0}",checkedBackground:"{surface.0}",checkedHoverBackground:"{surface.0}",color:"{text.muted.color}",hoverColor:"{text.color}",checkedColor:"{primary.color}",checkedHoverColor:"{primary.hover.color}"}},dark:{root:{background:"{surface.700}",disabledBackground:"{surface.600}",hoverBackground:"{surface.600}",checkedBackground:"{primary.color}",checkedHoverBackground:"{primary.hover.color}"},handle:{background:"{surface.400}",disabledBackground:"{surface.900}",hoverBackground:"{surface.300}",checkedBackground:"{surface.900}",checkedHoverBackground:"{surface.900}",color:"{surface.900}",hoverColor:"{surface.800}",checkedColor:"{primary.color}",checkedHoverColor:"{primary.hover.color}"}}},Yu={root:qu,handle:Vu,colorScheme:Xu},Ku={background:"{content.background}",borderColor:"{content.border.color}",borderRadius:"{content.border.radius}",color:"{content.color}",gap:"0.5rem",padding:"0.75rem"},Ju={root:Ku},Gu={maxWidth:"12.5rem",gutter:"0.25rem",shadow:"{overlay.popover.shadow}",padding:"0.5rem 0.75rem",borderRadius:"{overlay.popover.border.radius}"},Zu={light:{root:{background:"{surface.700}",color:"{surface.0}"}},dark:{root:{background:"{surface.700}",color:"{surface.0}"}}},Qu={root:Gu,colorScheme:Zu},op={background:"{content.background}",color:"{content.color}",padding:"1rem",gap:"2px",indent:"1rem",transitionDuration:"{transition.duration}"},ep={padding:"0.25rem 0.5rem",borderRadius:"{content.border.radius}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",color:"{text.color}",hoverColor:"{text.hover.color}",selectedColor:"{highlight.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"},gap:"0.25rem"},rp={color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",selectedColor:"{highlight.color}"},np={borderRadius:"50%",size:"1.75rem",hoverBackground:"{content.hover.background}",selectedHoverBackground:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",selectedHoverColor:"{primary.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},tp={size:"2rem"},ap={margin:"0 0 0.5rem 0"},dp=`
    .p-tree-mask.p-overlay-mask {
        --px-mask-background: light-dark(rgba(255,255,255,0.5),rgba(0,0,0,0.3));
    }
`,ip={root:op,node:ep,nodeIcon:rp,nodeToggleButton:np,loadingIcon:tp,filter:ap,css:dp},lp={background:"{form.field.background}",disabledBackground:"{form.field.disabled.background}",filledBackground:"{form.field.filled.background}",filledHoverBackground:"{form.field.filled.hover.background}",filledFocusBackground:"{form.field.filled.focus.background}",borderColor:"{form.field.border.color}",hoverBorderColor:"{form.field.hover.border.color}",focusBorderColor:"{form.field.focus.border.color}",invalidBorderColor:"{form.field.invalid.border.color}",color:"{form.field.color}",disabledColor:"{form.field.disabled.color}",placeholderColor:"{form.field.placeholder.color}",invalidPlaceholderColor:"{form.field.invalid.placeholder.color}",shadow:"{form.field.shadow}",paddingX:"{form.field.padding.x}",paddingY:"{form.field.padding.y}",borderRadius:"{form.field.border.radius}",focusRing:{width:"{form.field.focus.ring.width}",style:"{form.field.focus.ring.style}",color:"{form.field.focus.ring.color}",offset:"{form.field.focus.ring.offset}",shadow:"{form.field.focus.ring.shadow}"},transitionDuration:"{form.field.transition.duration}",sm:{fontSize:"{form.field.sm.font.size}",paddingX:"{form.field.sm.padding.x}",paddingY:"{form.field.sm.padding.y}"},lg:{fontSize:"{form.field.lg.font.size}",paddingX:"{form.field.lg.padding.x}",paddingY:"{form.field.lg.padding.y}"}},cp={width:"2.5rem",color:"{form.field.icon.color}"},sp={background:"{overlay.select.background}",borderColor:"{overlay.select.border.color}",borderRadius:"{overlay.select.border.radius}",color:"{overlay.select.color}",shadow:"{overlay.select.shadow}"},up={padding:"{list.padding}"},pp={padding:"{list.option.padding}"},bp={borderRadius:"{border.radius.sm}"},fp={color:"{form.field.icon.color}"},gp={root:lp,dropdown:cp,overlay:sp,tree:up,emptyMessage:pp,chip:bp,clearIcon:fp},hp={transitionDuration:"{transition.duration}"},mp={background:"{content.background}",borderColor:"{treetable.border.color}",color:"{content.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem"},kp={background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",borderColor:"{treetable.border.color}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{highlight.color}",gap:"0.5rem",padding:"0.75rem 1rem",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"}},vp={fontWeight:"600"},yp={background:"{content.background}",hoverBackground:"{content.hover.background}",selectedBackground:"{highlight.background}",color:"{content.color}",hoverColor:"{content.hover.color}",selectedColor:"{highlight.color}",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"-1px",shadow:"{focus.ring.shadow}"}},wp={borderColor:"{treetable.border.color}",padding:"0.75rem 1rem",gap:"0.5rem"},xp={background:"{content.background}",borderColor:"{treetable.border.color}",color:"{content.color}",padding:"0.75rem 1rem"},Cp={fontWeight:"600"},$p={background:"{content.background}",borderColor:"{treetable.border.color}",color:"{content.color}",borderWidth:"0 0 1px 0",padding:"0.75rem 1rem"},Bp={width:"0.5rem"},Rp={width:"1px",color:"{primary.color}"},Sp={color:"{text.muted.color}",hoverColor:"{text.hover.muted.color}",size:"0.875rem"},zp={size:"2rem"},Ep={hoverBackground:"{content.hover.background}",selectedHoverBackground:"{content.background}",color:"{text.muted.color}",hoverColor:"{text.color}",selectedHoverColor:"{primary.color}",size:"1.75rem",borderRadius:"50%",focusRing:{width:"{focus.ring.width}",style:"{focus.ring.style}",color:"{focus.ring.color}",offset:"{focus.ring.offset}",shadow:"{focus.ring.shadow}"}},Op={borderColor:"{content.border.color}",borderWidth:"0 0 1px 0"},Tp={borderColor:"{content.border.color}",borderWidth:"0 0 1px 0"},Ap={light:{root:{borderColor:"{content.border.color}"},bodyCell:{selectedBorderColor:"{primary.100}"}},dark:{root:{borderColor:"{surface.800}"},bodyCell:{selectedBorderColor:"{primary.900}"}}},Dp=`
    .p-treetable-mask.p-overlay-mask {
        --px-mask-background: light-dark(rgba(255,255,255,0.5),rgba(0,0,0,0.3));
    }
`,Np={root:hp,header:mp,headerCell:kp,columnTitle:vp,row:yp,bodyCell:wp,footerCell:xp,columnFooter:Cp,footer:$p,columnResizer:Bp,resizeIndicator:Rp,sortIcon:Sp,loadingIcon:zp,nodeToggleButton:Ep,paginatorTop:Op,paginatorBottom:Tp,colorScheme:Ap,css:Dp},Lp={mask:{background:"{content.background}",color:"{text.muted.color}"},icon:{size:"2rem"}},Pp={loader:Lp},Fp=Object.defineProperty,_p=Object.defineProperties,jp=Object.getOwnPropertyDescriptors,ke=Object.getOwnPropertySymbols,Ip=Object.prototype.hasOwnProperty,Wp=Object.prototype.propertyIsEnumerable,ve=(o,e,r)=>e in o?Fp(o,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):o[e]=r,ye,qg=(ye=((o,e)=>{for(var r in e||(e={}))Ip.call(e,r)&&ve(o,r,e[r]);if(ke)for(var r of ke(e))Wp.call(e,r)&&ve(o,r,e[r]);return o})({},Gn),_p(ye,jp({components:{accordion:Bn,autocomplete:Ln,avatar:Wn,badge:Yn,blockui:Qn,breadcrumb:nt,button:dt,card:pt,carousel:kt,cascadeselect:Bt,checkbox:zt,chip:Nt,colorpicker:jt,confirmdialog:Ut,confirmpopup:Xt,contextmenu:oa,datatable:xa,dataview:Ea,datepicker:Ka,dialog:ed,divider:dd,dock:cd,drawer:gd,editor:wd,fieldset:Rd,fileupload:Nd,floatlabel:jd,galleria:oi,iconfield:ri,iftalabel:ai,image:si,imagecompare:pi,inlinemessage:mi,inplace:yi,inputchips:$i,inputgroup:Ri,inputnumber:Oi,inputotp:Di,inputtext:Li,knob:Ii,listbox:Yi,megamenu:tl,menu:sl,menubar:ml,message:Sl,metergroup:Nl,multiselect:Ml,orderlist:Xl,organizationchart:Zl,overlaybadge:oc,paginator:ac,panel:pc,panelmenu:kc,password:$c,picklist:Sc,popover:Oc,progressbar:Nc,progressspinner:Pc,radiobutton:jc,rating:Uc,ripple:Mc,scrollpanel:Yc,select:ts,selectbutton:is,skeleton:ss,slider:hs,speeddial:ks,splitbutton:ys,splitter:$s,stepper:Ds,steps:js,tabmenu:qs,tabs:Qs,tabview:du,tag:su,terminal:fu,textarea:hu,tieredmenu:Cu,timeline:Eu,toast:ju,togglebutton:Mu,toggleswitch:Yu,toolbar:Ju,tooltip:Qu,tree:ip,treeselect:gp,treetable:Np,virtualscroller:Pp},css:ea})));const Up=(o,e)=>e.some(r=>o instanceof r);let we,xe;function Hp(){return we||(we=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Mp(){return xe||(xe=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const rr=new WeakMap,Ko=new WeakMap,nr=new WeakMap,Fo=new WeakMap,re=new WeakMap;function qp(o){const e=new Promise((r,n)=>{const t=()=>{o.removeEventListener("success",d),o.removeEventListener("error",a)},d=()=>{r(X(o.result)),t()},a=()=>{n(o.error),t()};o.addEventListener("success",d),o.addEventListener("error",a)});return e.then(r=>{r instanceof IDBCursor&&rr.set(r,o)}).catch(()=>{}),re.set(e,o),e}function Vp(o){if(Ko.has(o))return;const e=new Promise((r,n)=>{const t=()=>{o.removeEventListener("complete",d),o.removeEventListener("error",a),o.removeEventListener("abort",a)},d=()=>{r(),t()},a=()=>{n(o.error||new DOMException("AbortError","AbortError")),t()};o.addEventListener("complete",d),o.addEventListener("error",a),o.addEventListener("abort",a)});Ko.set(o,e)}let Jo={get(o,e,r){if(o instanceof IDBTransaction){if(e==="done")return Ko.get(o);if(e==="objectStoreNames")return o.objectStoreNames||nr.get(o);if(e==="store")return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return X(o[e])},set(o,e,r){return o[e]=r,!0},has(o,e){return o instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in o}};function Xp(o){Jo=o(Jo)}function Yp(o){return o===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...r){const n=o.call(_o(this),e,...r);return nr.set(n,e.sort?e.sort():[e]),X(n)}:Mp().includes(o)?function(...e){return o.apply(_o(this),e),X(rr.get(this))}:function(...e){return X(o.apply(_o(this),e))}}function Kp(o){return typeof o=="function"?Yp(o):(o instanceof IDBTransaction&&Vp(o),Up(o,Hp())?new Proxy(o,Jo):o)}function X(o){if(o instanceof IDBRequest)return qp(o);if(Fo.has(o))return Fo.get(o);const e=Kp(o);return e!==o&&(Fo.set(o,e),re.set(e,o)),e}const _o=o=>re.get(o);function Vg(o,e,{blocked:r,upgrade:n,blocking:t,terminated:d}={}){const a=indexedDB.open(o,e),i=X(a);return n&&a.addEventListener("upgradeneeded",l=>{n(X(a.result),l.oldVersion,l.newVersion,X(a.transaction),l)}),r&&a.addEventListener("blocked",l=>r(l.oldVersion,l.newVersion,l)),i.then(l=>{d&&l.addEventListener("close",()=>d()),t&&l.addEventListener("versionchange",c=>t(c.oldVersion,c.newVersion,c))}).catch(()=>{}),i}const Jp=["get","getKey","getAll","getAllKeys","count"],Gp=["put","add","delete","clear"],jo=new Map;function Ce(o,e){if(!(o instanceof IDBDatabase&&!(e in o)&&typeof e=="string"))return;if(jo.get(e))return jo.get(e);const r=e.replace(/FromIndex$/,""),n=e!==r,t=Gp.includes(r);if(!(r in(n?IDBIndex:IDBObjectStore).prototype)||!(t||Jp.includes(r)))return;const d=async function(a,...i){const l=this.transaction(a,t?"readwrite":"readonly");let c=l.store;return n&&(c=c.index(i.shift())),(await Promise.all([c[r](...i),t&&l.done]))[0]};return jo.set(e,d),d}Xp(o=>({...o,get:(e,r,n)=>Ce(e,r)||o.get(e,r,n),has:(e,r)=>!!Ce(e,r)||o.has(e,r)}));function tr(o,e){return function(){return o.apply(e,arguments)}}const{toString:Zp}=Object.prototype,{getPrototypeOf:ne}=Object,{iterator:To,toStringTag:ar}=Symbol,Ao=(o=>e=>{const r=Zp.call(e);return o[r]||(o[r]=r.slice(8,-1).toLowerCase())})(Object.create(null)),I=o=>(o=o.toLowerCase(),e=>Ao(e)===o),Do=o=>e=>typeof e===o,{isArray:bo}=Array,uo=Do("undefined");function vo(o){return o!==null&&!uo(o)&&o.constructor!==null&&!uo(o.constructor)&&E(o.constructor.isBuffer)&&o.constructor.isBuffer(o)}const dr=I("ArrayBuffer");function Qp(o){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(o):e=o&&o.buffer&&dr(o.buffer),e}const ob=Do("string"),E=Do("function"),ir=Do("number"),yo=o=>o!==null&&typeof o=="object",eb=o=>o===!0||o===!1,Ro=o=>{if(Ao(o)!=="object")return!1;const e=ne(o);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(ar in o)&&!(To in o)},rb=o=>{if(!yo(o)||vo(o))return!1;try{return Object.keys(o).length===0&&Object.getPrototypeOf(o)===Object.prototype}catch{return!1}},nb=I("Date"),tb=I("File"),ab=o=>!!(o&&typeof o.uri<"u"),db=o=>o&&typeof o.getParts<"u",ib=I("Blob"),lb=I("FileList"),cb=o=>yo(o)&&E(o.pipe);function sb(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const $e=sb(),Be=typeof $e.FormData<"u"?$e.FormData:void 0,ub=o=>{let e;return o&&(Be&&o instanceof Be||E(o.append)&&((e=Ao(o))==="formdata"||e==="object"&&E(o.toString)&&o.toString()==="[object FormData]"))},pb=I("URLSearchParams"),[bb,fb,gb,hb]=["ReadableStream","Request","Response","Headers"].map(I),mb=o=>o.trim?o.trim():o.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function wo(o,e,{allOwnKeys:r=!1}={}){if(o===null||typeof o>"u")return;let n,t;if(typeof o!="object"&&(o=[o]),bo(o))for(n=0,t=o.length;n<t;n++)e.call(null,o[n],n,o);else{if(vo(o))return;const d=r?Object.getOwnPropertyNames(o):Object.keys(o),a=d.length;let i;for(n=0;n<a;n++)i=d[n],e.call(null,o[i],i,o)}}function lr(o,e){if(vo(o))return null;e=e.toLowerCase();const r=Object.keys(o);let n=r.length,t;for(;n-- >0;)if(t=r[n],e===t.toLowerCase())return t;return null}const ro=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,cr=o=>!uo(o)&&o!==ro;function Go(){const{caseless:o,skipUndefined:e}=cr(this)&&this||{},r={},n=(t,d)=>{if(d==="__proto__"||d==="constructor"||d==="prototype")return;const a=o&&lr(r,d)||d;Ro(r[a])&&Ro(t)?r[a]=Go(r[a],t):Ro(t)?r[a]=Go({},t):bo(t)?r[a]=t.slice():(!e||!uo(t))&&(r[a]=t)};for(let t=0,d=arguments.length;t<d;t++)arguments[t]&&wo(arguments[t],n);return r}const kb=(o,e,r,{allOwnKeys:n}={})=>(wo(e,(t,d)=>{r&&E(t)?Object.defineProperty(o,d,{value:tr(t,r),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(o,d,{value:t,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:n}),o),vb=o=>(o.charCodeAt(0)===65279&&(o=o.slice(1)),o),yb=(o,e,r,n)=>{o.prototype=Object.create(e.prototype,n),Object.defineProperty(o.prototype,"constructor",{value:o,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(o,"super",{value:e.prototype}),r&&Object.assign(o.prototype,r)},wb=(o,e,r,n)=>{let t,d,a;const i={};if(e=e||{},o==null)return e;do{for(t=Object.getOwnPropertyNames(o),d=t.length;d-- >0;)a=t[d],(!n||n(a,o,e))&&!i[a]&&(e[a]=o[a],i[a]=!0);o=r!==!1&&ne(o)}while(o&&(!r||r(o,e))&&o!==Object.prototype);return e},xb=(o,e,r)=>{o=String(o),(r===void 0||r>o.length)&&(r=o.length),r-=e.length;const n=o.indexOf(e,r);return n!==-1&&n===r},Cb=o=>{if(!o)return null;if(bo(o))return o;let e=o.length;if(!ir(e))return null;const r=new Array(e);for(;e-- >0;)r[e]=o[e];return r},$b=(o=>e=>o&&e instanceof o)(typeof Uint8Array<"u"&&ne(Uint8Array)),Bb=(o,e)=>{const n=(o&&o[To]).call(o);let t;for(;(t=n.next())&&!t.done;){const d=t.value;e.call(o,d[0],d[1])}},Rb=(o,e)=>{let r;const n=[];for(;(r=o.exec(e))!==null;)n.push(r);return n},Sb=I("HTMLFormElement"),zb=o=>o.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(r,n,t){return n.toUpperCase()+t}),Re=(({hasOwnProperty:o})=>(e,r)=>o.call(e,r))(Object.prototype),Eb=I("RegExp"),sr=(o,e)=>{const r=Object.getOwnPropertyDescriptors(o),n={};wo(r,(t,d)=>{let a;(a=e(t,d,o))!==!1&&(n[d]=a||t)}),Object.defineProperties(o,n)},Ob=o=>{sr(o,(e,r)=>{if(E(o)&&["arguments","caller","callee"].indexOf(r)!==-1)return!1;const n=o[r];if(E(n)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+r+"'")})}})},Tb=(o,e)=>{const r={},n=t=>{t.forEach(d=>{r[d]=!0})};return bo(o)?n(o):n(String(o).split(e)),r},Ab=()=>{},Db=(o,e)=>o!=null&&Number.isFinite(o=+o)?o:e;function Nb(o){return!!(o&&E(o.append)&&o[ar]==="FormData"&&o[To])}const Lb=o=>{const e=new Array(10),r=(n,t)=>{if(yo(n)){if(e.indexOf(n)>=0)return;if(vo(n))return n;if(!("toJSON"in n)){e[t]=n;const d=bo(n)?[]:{};return wo(n,(a,i)=>{const l=r(a,t+1);!uo(l)&&(d[i]=l)}),e[t]=void 0,d}}return n};return r(o,0)},Pb=I("AsyncFunction"),Fb=o=>o&&(yo(o)||E(o))&&E(o.then)&&E(o.catch),ur=((o,e)=>o?setImmediate:e?((r,n)=>(ro.addEventListener("message",({source:t,data:d})=>{t===ro&&d===r&&n.length&&n.shift()()},!1),t=>{n.push(t),ro.postMessage(r,"*")}))(`axios@${Math.random()}`,[]):r=>setTimeout(r))(typeof setImmediate=="function",E(ro.postMessage)),_b=typeof queueMicrotask<"u"?queueMicrotask.bind(ro):typeof process<"u"&&process.nextTick||ur,jb=o=>o!=null&&E(o[To]),u={isArray:bo,isArrayBuffer:dr,isBuffer:vo,isFormData:ub,isArrayBufferView:Qp,isString:ob,isNumber:ir,isBoolean:eb,isObject:yo,isPlainObject:Ro,isEmptyObject:rb,isReadableStream:bb,isRequest:fb,isResponse:gb,isHeaders:hb,isUndefined:uo,isDate:nb,isFile:tb,isReactNativeBlob:ab,isReactNative:db,isBlob:ib,isRegExp:Eb,isFunction:E,isStream:cb,isURLSearchParams:pb,isTypedArray:$b,isFileList:lb,forEach:wo,merge:Go,extend:kb,trim:mb,stripBOM:vb,inherits:yb,toFlatObject:wb,kindOf:Ao,kindOfTest:I,endsWith:xb,toArray:Cb,forEachEntry:Bb,matchAll:Rb,isHTMLForm:Sb,hasOwnProperty:Re,hasOwnProp:Re,reduceDescriptors:sr,freezeMethods:Ob,toObjectSet:Tb,toCamelCase:zb,noop:Ab,toFiniteNumber:Db,findKey:lr,global:ro,isContextDefined:cr,isSpecCompliantForm:Nb,toJSONObject:Lb,isAsyncFn:Pb,isThenable:Fb,setImmediate:ur,asap:_b,isIterable:jb};let k=class pr extends Error{static from(e,r,n,t,d,a){const i=new pr(e.message,r||e.code,n,t,d);return i.cause=e,i.name=e.name,e.status!=null&&i.status==null&&(i.status=e.status),a&&Object.assign(i,a),i}constructor(e,r,n,t,d){super(e),Object.defineProperty(this,"message",{value:e,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,r&&(this.code=r),n&&(this.config=n),t&&(this.request=t),d&&(this.response=d,this.status=d.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:u.toJSONObject(this.config),code:this.code,status:this.status}}};k.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";k.ERR_BAD_OPTION="ERR_BAD_OPTION";k.ECONNABORTED="ECONNABORTED";k.ETIMEDOUT="ETIMEDOUT";k.ERR_NETWORK="ERR_NETWORK";k.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";k.ERR_DEPRECATED="ERR_DEPRECATED";k.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";k.ERR_BAD_REQUEST="ERR_BAD_REQUEST";k.ERR_CANCELED="ERR_CANCELED";k.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";k.ERR_INVALID_URL="ERR_INVALID_URL";const Ib=null;function Zo(o){return u.isPlainObject(o)||u.isArray(o)}function br(o){return u.endsWith(o,"[]")?o.slice(0,-2):o}function Io(o,e,r){return o?o.concat(e).map(function(t,d){return t=br(t),!r&&d?"["+t+"]":t}).join(r?".":""):e}function Wb(o){return u.isArray(o)&&!o.some(Zo)}const Ub=u.toFlatObject(u,{},null,function(e){return/^is[A-Z]/.test(e)});function No(o,e,r){if(!u.isObject(o))throw new TypeError("target must be an object");e=e||new FormData,r=u.toFlatObject(r,{metaTokens:!0,dots:!1,indexes:!1},!1,function(h,f){return!u.isUndefined(f[h])});const n=r.metaTokens,t=r.visitor||s,d=r.dots,a=r.indexes,l=(r.Blob||typeof Blob<"u"&&Blob)&&u.isSpecCompliantForm(e);if(!u.isFunction(t))throw new TypeError("visitor must be a function");function c(p){if(p===null)return"";if(u.isDate(p))return p.toISOString();if(u.isBoolean(p))return p.toString();if(!l&&u.isBlob(p))throw new k("Blob is not supported. Use a Buffer instead.");return u.isArrayBuffer(p)||u.isTypedArray(p)?l&&typeof Blob=="function"?new Blob([p]):Buffer.from(p):p}function s(p,h,f){let v=p;if(u.isReactNative(e)&&u.isReactNativeBlob(p))return e.append(Io(f,h,d),c(p)),!1;if(p&&!f&&typeof p=="object"){if(u.endsWith(h,"{}"))h=n?h:h.slice(0,-2),p=JSON.stringify(p);else if(u.isArray(p)&&Wb(p)||(u.isFileList(p)||u.endsWith(h,"[]"))&&(v=u.toArray(p)))return h=br(h),v.forEach(function(w,$){!(u.isUndefined(w)||w===null)&&e.append(a===!0?Io([h],$,d):a===null?h:h+"[]",c(w))}),!1}return Zo(p)?!0:(e.append(Io(f,h,d),c(p)),!1)}const b=[],g=Object.assign(Ub,{defaultVisitor:s,convertValue:c,isVisitable:Zo});function m(p,h){if(!u.isUndefined(p)){if(b.indexOf(p)!==-1)throw Error("Circular reference detected in "+h.join("."));b.push(p),u.forEach(p,function(v,y){(!(u.isUndefined(v)||v===null)&&t.call(e,v,u.isString(y)?y.trim():y,h,g))===!0&&m(v,h?h.concat(y):[y])}),b.pop()}}if(!u.isObject(o))throw new TypeError("data must be an object");return m(o),e}function Se(o){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(o).replace(/[!'()~]|%20|%00/g,function(n){return e[n]})}function te(o,e){this._pairs=[],o&&No(o,this,e)}const fr=te.prototype;fr.append=function(e,r){this._pairs.push([e,r])};fr.toString=function(e){const r=e?function(n){return e.call(this,n,Se)}:Se;return this._pairs.map(function(t){return r(t[0])+"="+r(t[1])},"").join("&")};function Hb(o){return encodeURIComponent(o).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function gr(o,e,r){if(!e)return o;const n=r&&r.encode||Hb,t=u.isFunction(r)?{serialize:r}:r,d=t&&t.serialize;let a;if(d?a=d(e,t):a=u.isURLSearchParams(e)?e.toString():new te(e,t).toString(n),a){const i=o.indexOf("#");i!==-1&&(o=o.slice(0,i)),o+=(o.indexOf("?")===-1?"?":"&")+a}return o}class ze{constructor(){this.handlers=[]}use(e,r,n){return this.handlers.push({fulfilled:e,rejected:r,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){u.forEach(this.handlers,function(n){n!==null&&e(n)})}}const ae={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},Mb=typeof URLSearchParams<"u"?URLSearchParams:te,qb=typeof FormData<"u"?FormData:null,Vb=typeof Blob<"u"?Blob:null,Xb={isBrowser:!0,classes:{URLSearchParams:Mb,FormData:qb,Blob:Vb},protocols:["http","https","file","blob","url","data"]},de=typeof window<"u"&&typeof document<"u",Qo=typeof navigator=="object"&&navigator||void 0,Yb=de&&(!Qo||["ReactNative","NativeScript","NS"].indexOf(Qo.product)<0),Kb=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Jb=de&&window.location.href||"http://localhost",Gb=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:de,hasStandardBrowserEnv:Yb,hasStandardBrowserWebWorkerEnv:Kb,navigator:Qo,origin:Jb},Symbol.toStringTag,{value:"Module"})),z={...Gb,...Xb};function Zb(o,e){return No(o,new z.classes.URLSearchParams,{visitor:function(r,n,t,d){return z.isNode&&u.isBuffer(r)?(this.append(n,r.toString("base64")),!1):d.defaultVisitor.apply(this,arguments)},...e})}function Qb(o){return u.matchAll(/\w+|\[(\w*)]/g,o).map(e=>e[0]==="[]"?"":e[1]||e[0])}function of(o){const e={},r=Object.keys(o);let n;const t=r.length;let d;for(n=0;n<t;n++)d=r[n],e[d]=o[d];return e}function hr(o){function e(r,n,t,d){let a=r[d++];if(a==="__proto__")return!0;const i=Number.isFinite(+a),l=d>=r.length;return a=!a&&u.isArray(t)?t.length:a,l?(u.hasOwnProp(t,a)?t[a]=[t[a],n]:t[a]=n,!i):((!t[a]||!u.isObject(t[a]))&&(t[a]=[]),e(r,n,t[a],d)&&u.isArray(t[a])&&(t[a]=of(t[a])),!i)}if(u.isFormData(o)&&u.isFunction(o.entries)){const r={};return u.forEachEntry(o,(n,t)=>{e(Qb(n),t,r,0)}),r}return null}function ef(o,e,r){if(u.isString(o))try{return(e||JSON.parse)(o),u.trim(o)}catch(n){if(n.name!=="SyntaxError")throw n}return(r||JSON.stringify)(o)}const xo={transitional:ae,adapter:["xhr","http","fetch"],transformRequest:[function(e,r){const n=r.getContentType()||"",t=n.indexOf("application/json")>-1,d=u.isObject(e);if(d&&u.isHTMLForm(e)&&(e=new FormData(e)),u.isFormData(e))return t?JSON.stringify(hr(e)):e;if(u.isArrayBuffer(e)||u.isBuffer(e)||u.isStream(e)||u.isFile(e)||u.isBlob(e)||u.isReadableStream(e))return e;if(u.isArrayBufferView(e))return e.buffer;if(u.isURLSearchParams(e))return r.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let i;if(d){if(n.indexOf("application/x-www-form-urlencoded")>-1)return Zb(e,this.formSerializer).toString();if((i=u.isFileList(e))||n.indexOf("multipart/form-data")>-1){const l=this.env&&this.env.FormData;return No(i?{"files[]":e}:e,l&&new l,this.formSerializer)}}return d||t?(r.setContentType("application/json",!1),ef(e)):e}],transformResponse:[function(e){const r=this.transitional||xo.transitional,n=r&&r.forcedJSONParsing,t=this.responseType==="json";if(u.isResponse(e)||u.isReadableStream(e))return e;if(e&&u.isString(e)&&(n&&!this.responseType||t)){const a=!(r&&r.silentJSONParsing)&&t;try{return JSON.parse(e,this.parseReviver)}catch(i){if(a)throw i.name==="SyntaxError"?k.from(i,k.ERR_BAD_RESPONSE,this,null,this.response):i}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:z.classes.FormData,Blob:z.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};u.forEach(["delete","get","head","post","put","patch"],o=>{xo.headers[o]={}});const rf=u.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),nf=o=>{const e={};let r,n,t;return o&&o.split(`
`).forEach(function(a){t=a.indexOf(":"),r=a.substring(0,t).trim().toLowerCase(),n=a.substring(t+1).trim(),!(!r||e[r]&&rf[r])&&(r==="set-cookie"?e[r]?e[r].push(n):e[r]=[n]:e[r]=e[r]?e[r]+", "+n:n)}),e},Ee=Symbol("internals");function go(o){return o&&String(o).trim().toLowerCase()}function So(o){return o===!1||o==null?o:u.isArray(o)?o.map(So):String(o)}function tf(o){const e=Object.create(null),r=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let n;for(;n=r.exec(o);)e[n[1]]=n[2];return e}const af=o=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(o.trim());function Wo(o,e,r,n,t){if(u.isFunction(n))return n.call(this,e,r);if(t&&(e=r),!!u.isString(e)){if(u.isString(n))return e.indexOf(n)!==-1;if(u.isRegExp(n))return n.test(e)}}function df(o){return o.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,r,n)=>r.toUpperCase()+n)}function lf(o,e){const r=u.toCamelCase(" "+e);["get","set","has"].forEach(n=>{Object.defineProperty(o,n+r,{value:function(t,d,a){return this[n].call(this,e,t,d,a)},configurable:!0})})}let O=class{constructor(e){e&&this.set(e)}set(e,r,n){const t=this;function d(i,l,c){const s=go(l);if(!s)throw new Error("header name must be a non-empty string");const b=u.findKey(t,s);(!b||t[b]===void 0||c===!0||c===void 0&&t[b]!==!1)&&(t[b||l]=So(i))}const a=(i,l)=>u.forEach(i,(c,s)=>d(c,s,l));if(u.isPlainObject(e)||e instanceof this.constructor)a(e,r);else if(u.isString(e)&&(e=e.trim())&&!af(e))a(nf(e),r);else if(u.isObject(e)&&u.isIterable(e)){let i={},l,c;for(const s of e){if(!u.isArray(s))throw TypeError("Object iterator must return a key-value pair");i[c=s[0]]=(l=i[c])?u.isArray(l)?[...l,s[1]]:[l,s[1]]:s[1]}a(i,r)}else e!=null&&d(r,e,n);return this}get(e,r){if(e=go(e),e){const n=u.findKey(this,e);if(n){const t=this[n];if(!r)return t;if(r===!0)return tf(t);if(u.isFunction(r))return r.call(this,t,n);if(u.isRegExp(r))return r.exec(t);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,r){if(e=go(e),e){const n=u.findKey(this,e);return!!(n&&this[n]!==void 0&&(!r||Wo(this,this[n],n,r)))}return!1}delete(e,r){const n=this;let t=!1;function d(a){if(a=go(a),a){const i=u.findKey(n,a);i&&(!r||Wo(n,n[i],i,r))&&(delete n[i],t=!0)}}return u.isArray(e)?e.forEach(d):d(e),t}clear(e){const r=Object.keys(this);let n=r.length,t=!1;for(;n--;){const d=r[n];(!e||Wo(this,this[d],d,e,!0))&&(delete this[d],t=!0)}return t}normalize(e){const r=this,n={};return u.forEach(this,(t,d)=>{const a=u.findKey(n,d);if(a){r[a]=So(t),delete r[d];return}const i=e?df(d):String(d).trim();i!==d&&delete r[d],r[i]=So(t),n[i]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const r=Object.create(null);return u.forEach(this,(n,t)=>{n!=null&&n!==!1&&(r[t]=e&&u.isArray(n)?n.join(", "):n)}),r}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,r])=>e+": "+r).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...r){const n=new this(e);return r.forEach(t=>n.set(t)),n}static accessor(e){const n=(this[Ee]=this[Ee]={accessors:{}}).accessors,t=this.prototype;function d(a){const i=go(a);n[i]||(lf(t,a),n[i]=!0)}return u.isArray(e)?e.forEach(d):d(e),this}};O.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);u.reduceDescriptors(O.prototype,({value:o},e)=>{let r=e[0].toUpperCase()+e.slice(1);return{get:()=>o,set(n){this[r]=n}}});u.freezeMethods(O);function Uo(o,e){const r=this||xo,n=e||r,t=O.from(n.headers);let d=n.data;return u.forEach(o,function(i){d=i.call(r,d,t.normalize(),e?e.status:void 0)}),t.normalize(),d}function mr(o){return!!(o&&o.__CANCEL__)}let Co=class extends k{constructor(e,r,n){super(e??"canceled",k.ERR_CANCELED,r,n),this.name="CanceledError",this.__CANCEL__=!0}};function kr(o,e,r){const n=r.config.validateStatus;!r.status||!n||n(r.status)?o(r):e(new k("Request failed with status code "+r.status,[k.ERR_BAD_REQUEST,k.ERR_BAD_RESPONSE][Math.floor(r.status/100)-4],r.config,r.request,r))}function cf(o){const e=/^([-+\w]{1,25})(:?\/\/|:)/.exec(o);return e&&e[1]||""}function sf(o,e){o=o||10;const r=new Array(o),n=new Array(o);let t=0,d=0,a;return e=e!==void 0?e:1e3,function(l){const c=Date.now(),s=n[d];a||(a=c),r[t]=l,n[t]=c;let b=d,g=0;for(;b!==t;)g+=r[b++],b=b%o;if(t=(t+1)%o,t===d&&(d=(d+1)%o),c-a<e)return;const m=s&&c-s;return m?Math.round(g*1e3/m):void 0}}function uf(o,e){let r=0,n=1e3/e,t,d;const a=(c,s=Date.now())=>{r=s,t=null,d&&(clearTimeout(d),d=null),o(...c)};return[(...c)=>{const s=Date.now(),b=s-r;b>=n?a(c,s):(t=c,d||(d=setTimeout(()=>{d=null,a(t)},n-b)))},()=>t&&a(t)]}const Oo=(o,e,r=3)=>{let n=0;const t=sf(50,250);return uf(d=>{const a=d.loaded,i=d.lengthComputable?d.total:void 0,l=a-n,c=t(l),s=a<=i;n=a;const b={loaded:a,total:i,progress:i?a/i:void 0,bytes:l,rate:c||void 0,estimated:c&&i&&s?(i-a)/c:void 0,event:d,lengthComputable:i!=null,[e?"download":"upload"]:!0};o(b)},r)},Oe=(o,e)=>{const r=o!=null;return[n=>e[0]({lengthComputable:r,total:o,loaded:n}),e[1]]},Te=o=>(...e)=>u.asap(()=>o(...e)),pf=z.hasStandardBrowserEnv?((o,e)=>r=>(r=new URL(r,z.origin),o.protocol===r.protocol&&o.host===r.host&&(e||o.port===r.port)))(new URL(z.origin),z.navigator&&/(msie|trident)/i.test(z.navigator.userAgent)):()=>!0,bf=z.hasStandardBrowserEnv?{write(o,e,r,n,t,d,a){if(typeof document>"u")return;const i=[`${o}=${encodeURIComponent(e)}`];u.isNumber(r)&&i.push(`expires=${new Date(r).toUTCString()}`),u.isString(n)&&i.push(`path=${n}`),u.isString(t)&&i.push(`domain=${t}`),d===!0&&i.push("secure"),u.isString(a)&&i.push(`SameSite=${a}`),document.cookie=i.join("; ")},read(o){if(typeof document>"u")return null;const e=document.cookie.match(new RegExp("(?:^|; )"+o+"=([^;]*)"));return e?decodeURIComponent(e[1]):null},remove(o){this.write(o,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function ff(o){return typeof o!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(o)}function gf(o,e){return e?o.replace(/\/?\/$/,"")+"/"+e.replace(/^\/+/,""):o}function vr(o,e,r){let n=!ff(e);return o&&(n||r==!1)?gf(o,e):e}const Ae=o=>o instanceof O?{...o}:o;function io(o,e){e=e||{};const r={};function n(c,s,b,g){return u.isPlainObject(c)&&u.isPlainObject(s)?u.merge.call({caseless:g},c,s):u.isPlainObject(s)?u.merge({},s):u.isArray(s)?s.slice():s}function t(c,s,b,g){if(u.isUndefined(s)){if(!u.isUndefined(c))return n(void 0,c,b,g)}else return n(c,s,b,g)}function d(c,s){if(!u.isUndefined(s))return n(void 0,s)}function a(c,s){if(u.isUndefined(s)){if(!u.isUndefined(c))return n(void 0,c)}else return n(void 0,s)}function i(c,s,b){if(b in e)return n(c,s);if(b in o)return n(void 0,c)}const l={url:d,method:d,data:d,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,withXSRFToken:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,beforeRedirect:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:i,headers:(c,s,b)=>t(Ae(c),Ae(s),b,!0)};return u.forEach(Object.keys({...o,...e}),function(s){if(s==="__proto__"||s==="constructor"||s==="prototype")return;const b=u.hasOwnProp(l,s)?l[s]:t,g=b(o[s],e[s],s);u.isUndefined(g)&&b!==i||(r[s]=g)}),r}const yr=o=>{const e=io({},o);let{data:r,withXSRFToken:n,xsrfHeaderName:t,xsrfCookieName:d,headers:a,auth:i}=e;if(e.headers=a=O.from(a),e.url=gr(vr(e.baseURL,e.url,e.allowAbsoluteUrls),o.params,o.paramsSerializer),i&&a.set("Authorization","Basic "+btoa((i.username||"")+":"+(i.password?unescape(encodeURIComponent(i.password)):""))),u.isFormData(r)){if(z.hasStandardBrowserEnv||z.hasStandardBrowserWebWorkerEnv)a.setContentType(void 0);else if(u.isFunction(r.getHeaders)){const l=r.getHeaders(),c=["content-type","content-length"];Object.entries(l).forEach(([s,b])=>{c.includes(s.toLowerCase())&&a.set(s,b)})}}if(z.hasStandardBrowserEnv&&(n&&u.isFunction(n)&&(n=n(e)),n||n!==!1&&pf(e.url))){const l=t&&d&&bf.read(d);l&&a.set(t,l)}return e},hf=typeof XMLHttpRequest<"u",mf=hf&&function(o){return new Promise(function(r,n){const t=yr(o);let d=t.data;const a=O.from(t.headers).normalize();let{responseType:i,onUploadProgress:l,onDownloadProgress:c}=t,s,b,g,m,p;function h(){m&&m(),p&&p(),t.cancelToken&&t.cancelToken.unsubscribe(s),t.signal&&t.signal.removeEventListener("abort",s)}let f=new XMLHttpRequest;f.open(t.method.toUpperCase(),t.url,!0),f.timeout=t.timeout;function v(){if(!f)return;const w=O.from("getAllResponseHeaders"in f&&f.getAllResponseHeaders()),S={data:!i||i==="text"||i==="json"?f.responseText:f.response,status:f.status,statusText:f.statusText,headers:w,config:o,request:f};kr(function(R){r(R),h()},function(R){n(R),h()},S),f=null}"onloadend"in f?f.onloadend=v:f.onreadystatechange=function(){!f||f.readyState!==4||f.status===0&&!(f.responseURL&&f.responseURL.indexOf("file:")===0)||setTimeout(v)},f.onabort=function(){f&&(n(new k("Request aborted",k.ECONNABORTED,o,f)),f=null)},f.onerror=function($){const S=$&&$.message?$.message:"Network Error",N=new k(S,k.ERR_NETWORK,o,f);N.event=$||null,n(N),f=null},f.ontimeout=function(){let $=t.timeout?"timeout of "+t.timeout+"ms exceeded":"timeout exceeded";const S=t.transitional||ae;t.timeoutErrorMessage&&($=t.timeoutErrorMessage),n(new k($,S.clarifyTimeoutError?k.ETIMEDOUT:k.ECONNABORTED,o,f)),f=null},d===void 0&&a.setContentType(null),"setRequestHeader"in f&&u.forEach(a.toJSON(),function($,S){f.setRequestHeader(S,$)}),u.isUndefined(t.withCredentials)||(f.withCredentials=!!t.withCredentials),i&&i!=="json"&&(f.responseType=t.responseType),c&&([g,p]=Oo(c,!0),f.addEventListener("progress",g)),l&&f.upload&&([b,m]=Oo(l),f.upload.addEventListener("progress",b),f.upload.addEventListener("loadend",m)),(t.cancelToken||t.signal)&&(s=w=>{f&&(n(!w||w.type?new Co(null,o,f):w),f.abort(),f=null)},t.cancelToken&&t.cancelToken.subscribe(s),t.signal&&(t.signal.aborted?s():t.signal.addEventListener("abort",s)));const y=cf(t.url);if(y&&z.protocols.indexOf(y)===-1){n(new k("Unsupported protocol "+y+":",k.ERR_BAD_REQUEST,o));return}f.send(d||null)})},kf=(o,e)=>{const{length:r}=o=o?o.filter(Boolean):[];if(e||r){let n=new AbortController,t;const d=function(c){if(!t){t=!0,i();const s=c instanceof Error?c:this.reason;n.abort(s instanceof k?s:new Co(s instanceof Error?s.message:s))}};let a=e&&setTimeout(()=>{a=null,d(new k(`timeout of ${e}ms exceeded`,k.ETIMEDOUT))},e);const i=()=>{o&&(a&&clearTimeout(a),a=null,o.forEach(c=>{c.unsubscribe?c.unsubscribe(d):c.removeEventListener("abort",d)}),o=null)};o.forEach(c=>c.addEventListener("abort",d));const{signal:l}=n;return l.unsubscribe=()=>u.asap(i),l}},vf=function*(o,e){let r=o.byteLength;if(r<e){yield o;return}let n=0,t;for(;n<r;)t=n+e,yield o.slice(n,t),n=t},yf=async function*(o,e){for await(const r of wf(o))yield*vf(r,e)},wf=async function*(o){if(o[Symbol.asyncIterator]){yield*o;return}const e=o.getReader();try{for(;;){const{done:r,value:n}=await e.read();if(r)break;yield n}}finally{await e.cancel()}},De=(o,e,r,n)=>{const t=yf(o,e);let d=0,a,i=l=>{a||(a=!0,n&&n(l))};return new ReadableStream({async pull(l){try{const{done:c,value:s}=await t.next();if(c){i(),l.close();return}let b=s.byteLength;if(r){let g=d+=b;r(g)}l.enqueue(new Uint8Array(s))}catch(c){throw i(c),c}},cancel(l){return i(l),t.return()}},{highWaterMark:2})},Ne=64*1024,{isFunction:Bo}=u,xf=(({Request:o,Response:e})=>({Request:o,Response:e}))(u.global),{ReadableStream:Le,TextEncoder:Pe}=u.global,Fe=(o,...e)=>{try{return!!o(...e)}catch{return!1}},Cf=o=>{o=u.merge.call({skipUndefined:!0},xf,o);const{fetch:e,Request:r,Response:n}=o,t=e?Bo(e):typeof fetch=="function",d=Bo(r),a=Bo(n);if(!t)return!1;const i=t&&Bo(Le),l=t&&(typeof Pe=="function"?(p=>h=>p.encode(h))(new Pe):async p=>new Uint8Array(await new r(p).arrayBuffer())),c=d&&i&&Fe(()=>{let p=!1;const h=new r(z.origin,{body:new Le,method:"POST",get duplex(){return p=!0,"half"}}).headers.has("Content-Type");return p&&!h}),s=a&&i&&Fe(()=>u.isReadableStream(new n("").body)),b={stream:s&&(p=>p.body)};t&&["text","arrayBuffer","blob","formData","stream"].forEach(p=>{!b[p]&&(b[p]=(h,f)=>{let v=h&&h[p];if(v)return v.call(h);throw new k(`Response type '${p}' is not supported`,k.ERR_NOT_SUPPORT,f)})});const g=async p=>{if(p==null)return 0;if(u.isBlob(p))return p.size;if(u.isSpecCompliantForm(p))return(await new r(z.origin,{method:"POST",body:p}).arrayBuffer()).byteLength;if(u.isArrayBufferView(p)||u.isArrayBuffer(p))return p.byteLength;if(u.isURLSearchParams(p)&&(p=p+""),u.isString(p))return(await l(p)).byteLength},m=async(p,h)=>{const f=u.toFiniteNumber(p.getContentLength());return f??g(h)};return async p=>{let{url:h,method:f,data:v,signal:y,cancelToken:w,timeout:$,onDownloadProgress:S,onUploadProgress:N,responseType:R,headers:W,withCredentials:U="same-origin",fetchOptions:K}=yr(p),J=e||fetch;R=R?(R+"").toLowerCase():"text";let H=kf([y,w&&w.toAbortSignal()],$),P=null;const T=H&&H.unsubscribe&&(()=>{H.unsubscribe()});let G;try{if(N&&c&&f!=="get"&&f!=="head"&&(G=await m(W,v))!==0){let D=new r(h,{method:"POST",body:v,duplex:"half"}),F;if(u.isFormData(v)&&(F=D.headers.get("content-type"))&&W.setContentType(F),D.body){const[co,oo]=Oe(G,Oo(Te(N)));v=De(D.body,Ne,co,oo)}}u.isString(U)||(U=U?"include":"omit");const B=d&&"credentials"in r.prototype,Z={...K,signal:H,method:f.toUpperCase(),headers:W.normalize().toJSON(),body:v,duplex:"half",credentials:B?U:void 0};P=d&&new r(h,Z);let A=await(d?J(P,K):J(h,Z));const Q=s&&(R==="stream"||R==="response");if(s&&(S||Q&&T)){const D={};["status","statusText","headers"].forEach(fo=>{D[fo]=A[fo]});const F=u.toFiniteNumber(A.headers.get("content-length")),[co,oo]=S&&Oe(F,Oo(Te(S),!0))||[];A=new n(De(A.body,Ne,co,()=>{oo&&oo(),T&&T()}),D)}R=R||"text";let lo=await b[u.findKey(b,R)||"text"](A,p);return!Q&&T&&T(),await new Promise((D,F)=>{kr(D,F,{data:lo,headers:O.from(A.headers),status:A.status,statusText:A.statusText,config:p,request:P})})}catch(B){throw T&&T(),B&&B.name==="TypeError"&&/Load failed|fetch/i.test(B.message)?Object.assign(new k("Network Error",k.ERR_NETWORK,p,P,B&&B.response),{cause:B.cause||B}):k.from(B,B&&B.code,p,P,B&&B.response)}}},$f=new Map,wr=o=>{let e=o&&o.env||{};const{fetch:r,Request:n,Response:t}=e,d=[n,t,r];let a=d.length,i=a,l,c,s=$f;for(;i--;)l=d[i],c=s.get(l),c===void 0&&s.set(l,c=i?new Map:Cf(e)),s=c;return c};wr();const ie={http:Ib,xhr:mf,fetch:{get:wr}};u.forEach(ie,(o,e)=>{if(o){try{Object.defineProperty(o,"name",{value:e})}catch{}Object.defineProperty(o,"adapterName",{value:e})}});const _e=o=>`- ${o}`,Bf=o=>u.isFunction(o)||o===null||o===!1;function Rf(o,e){o=u.isArray(o)?o:[o];const{length:r}=o;let n,t;const d={};for(let a=0;a<r;a++){n=o[a];let i;if(t=n,!Bf(n)&&(t=ie[(i=String(n)).toLowerCase()],t===void 0))throw new k(`Unknown adapter '${i}'`);if(t&&(u.isFunction(t)||(t=t.get(e))))break;d[i||"#"+a]=t}if(!t){const a=Object.entries(d).map(([l,c])=>`adapter ${l} `+(c===!1?"is not supported by the environment":"is not available in the build"));let i=r?a.length>1?`since :
`+a.map(_e).join(`
`):" "+_e(a[0]):"as no adapter specified";throw new k("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return t}const xr={getAdapter:Rf,adapters:ie};function Ho(o){if(o.cancelToken&&o.cancelToken.throwIfRequested(),o.signal&&o.signal.aborted)throw new Co(null,o)}function je(o){return Ho(o),o.headers=O.from(o.headers),o.data=Uo.call(o,o.transformRequest),["post","put","patch"].indexOf(o.method)!==-1&&o.headers.setContentType("application/x-www-form-urlencoded",!1),xr.getAdapter(o.adapter||xo.adapter,o)(o).then(function(n){return Ho(o),n.data=Uo.call(o,o.transformResponse,n),n.headers=O.from(n.headers),n},function(n){return mr(n)||(Ho(o),n&&n.response&&(n.response.data=Uo.call(o,o.transformResponse,n.response),n.response.headers=O.from(n.response.headers))),Promise.reject(n)})}const Cr="1.13.6",Lo={};["object","boolean","number","function","string","symbol"].forEach((o,e)=>{Lo[o]=function(n){return typeof n===o||"a"+(e<1?"n ":" ")+o}});const Ie={};Lo.transitional=function(e,r,n){function t(d,a){return"[Axios v"+Cr+"] Transitional option '"+d+"'"+a+(n?". "+n:"")}return(d,a,i)=>{if(e===!1)throw new k(t(a," has been removed"+(r?" in "+r:"")),k.ERR_DEPRECATED);return r&&!Ie[a]&&(Ie[a]=!0,console.warn(t(a," has been deprecated since v"+r+" and will be removed in the near future"))),e?e(d,a,i):!0}};Lo.spelling=function(e){return(r,n)=>(console.warn(`${n} is likely a misspelling of ${e}`),!0)};function Sf(o,e,r){if(typeof o!="object")throw new k("options must be an object",k.ERR_BAD_OPTION_VALUE);const n=Object.keys(o);let t=n.length;for(;t-- >0;){const d=n[t],a=e[d];if(a){const i=o[d],l=i===void 0||a(i,d,o);if(l!==!0)throw new k("option "+d+" must be "+l,k.ERR_BAD_OPTION_VALUE);continue}if(r!==!0)throw new k("Unknown option "+d,k.ERR_BAD_OPTION)}}const zo={assertOptions:Sf,validators:Lo},L=zo.validators;let to=class{constructor(e){this.defaults=e||{},this.interceptors={request:new ze,response:new ze}}async request(e,r){try{return await this._request(e,r)}catch(n){if(n instanceof Error){let t={};Error.captureStackTrace?Error.captureStackTrace(t):t=new Error;const d=t.stack?t.stack.replace(/^.+\n/,""):"";try{n.stack?d&&!String(n.stack).endsWith(d.replace(/^.+\n.+\n/,""))&&(n.stack+=`
`+d):n.stack=d}catch{}}throw n}}_request(e,r){typeof e=="string"?(r=r||{},r.url=e):r=e||{},r=io(this.defaults,r);const{transitional:n,paramsSerializer:t,headers:d}=r;n!==void 0&&zo.assertOptions(n,{silentJSONParsing:L.transitional(L.boolean),forcedJSONParsing:L.transitional(L.boolean),clarifyTimeoutError:L.transitional(L.boolean),legacyInterceptorReqResOrdering:L.transitional(L.boolean)},!1),t!=null&&(u.isFunction(t)?r.paramsSerializer={serialize:t}:zo.assertOptions(t,{encode:L.function,serialize:L.function},!0)),r.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?r.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:r.allowAbsoluteUrls=!0),zo.assertOptions(r,{baseUrl:L.spelling("baseURL"),withXsrfToken:L.spelling("withXSRFToken")},!0),r.method=(r.method||this.defaults.method||"get").toLowerCase();let a=d&&u.merge(d.common,d[r.method]);d&&u.forEach(["delete","get","head","post","put","patch","common"],p=>{delete d[p]}),r.headers=O.concat(a,d);const i=[];let l=!0;this.interceptors.request.forEach(function(h){if(typeof h.runWhen=="function"&&h.runWhen(r)===!1)return;l=l&&h.synchronous;const f=r.transitional||ae;f&&f.legacyInterceptorReqResOrdering?i.unshift(h.fulfilled,h.rejected):i.push(h.fulfilled,h.rejected)});const c=[];this.interceptors.response.forEach(function(h){c.push(h.fulfilled,h.rejected)});let s,b=0,g;if(!l){const p=[je.bind(this),void 0];for(p.unshift(...i),p.push(...c),g=p.length,s=Promise.resolve(r);b<g;)s=s.then(p[b++],p[b++]);return s}g=i.length;let m=r;for(;b<g;){const p=i[b++],h=i[b++];try{m=p(m)}catch(f){h.call(this,f);break}}try{s=je.call(this,m)}catch(p){return Promise.reject(p)}for(b=0,g=c.length;b<g;)s=s.then(c[b++],c[b++]);return s}getUri(e){e=io(this.defaults,e);const r=vr(e.baseURL,e.url,e.allowAbsoluteUrls);return gr(r,e.params,e.paramsSerializer)}};u.forEach(["delete","get","head","options"],function(e){to.prototype[e]=function(r,n){return this.request(io(n||{},{method:e,url:r,data:(n||{}).data}))}});u.forEach(["post","put","patch"],function(e){function r(n){return function(d,a,i){return this.request(io(i||{},{method:e,headers:n?{"Content-Type":"multipart/form-data"}:{},url:d,data:a}))}}to.prototype[e]=r(),to.prototype[e+"Form"]=r(!0)});let zf=class $r{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let r;this.promise=new Promise(function(d){r=d});const n=this;this.promise.then(t=>{if(!n._listeners)return;let d=n._listeners.length;for(;d-- >0;)n._listeners[d](t);n._listeners=null}),this.promise.then=t=>{let d;const a=new Promise(i=>{n.subscribe(i),d=i}).then(t);return a.cancel=function(){n.unsubscribe(d)},a},e(function(d,a,i){n.reason||(n.reason=new Co(d,a,i),r(n.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const r=this._listeners.indexOf(e);r!==-1&&this._listeners.splice(r,1)}toAbortSignal(){const e=new AbortController,r=n=>{e.abort(n)};return this.subscribe(r),e.signal.unsubscribe=()=>this.unsubscribe(r),e.signal}static source(){let e;return{token:new $r(function(t){e=t}),cancel:e}}};function Ef(o){return function(r){return o.apply(null,r)}}function Of(o){return u.isObject(o)&&o.isAxiosError===!0}const oe={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(oe).forEach(([o,e])=>{oe[e]=o});function Br(o){const e=new to(o),r=tr(to.prototype.request,e);return u.extend(r,to.prototype,e,{allOwnKeys:!0}),u.extend(r,e,null,{allOwnKeys:!0}),r.create=function(t){return Br(io(o,t))},r}const C=Br(xo);C.Axios=to;C.CanceledError=Co;C.CancelToken=zf;C.isCancel=mr;C.VERSION=Cr;C.toFormData=No;C.AxiosError=k;C.Cancel=C.CanceledError;C.all=function(e){return Promise.all(e)};C.spread=Ef;C.isAxiosError=Of;C.mergeConfig=io;C.AxiosHeaders=O;C.formToJSON=o=>hr(u.isHTMLForm(o)?new FormData(o):o);C.getAdapter=xr.getAdapter;C.HttpStatusCode=oe;C.default=C;const{Axios:Jg,AxiosError:Gg,CanceledError:Zg,isCancel:Qg,CancelToken:o0,VERSION:e0,all:r0,Cancel:n0,isAxiosError:t0,spread:a0,toFormData:d0,AxiosHeaders:i0,HttpStatusCode:l0,formToJSON:c0,getAdapter:s0,mergeConfig:u0}=C;export{Ue as $,He as A,Cg as B,bg as C,Nf as D,ho as E,cn as F,Lf as G,Wf as H,Ff as I,Hf as J,Jf as K,Yf as L,dg as M,eo as N,Df as O,se as P,Uf as Q,eg as R,ko as S,_f as T,If as U,$g as V,ce as W,Tf as X,ge as Y,Ag as Z,cg as _,Bg as a,dn as a0,kg as a1,be as a2,Dg as a3,Ng as a4,Lg as a5,ig as a6,Pg as a7,pg as a8,Me as a9,Mg as aA,fg as aB,mg as aC,Vg as aD,qg as aE,C as aF,ng as aa,gg as ab,Fg as ac,jf as ad,og as ae,_g as af,jg as ag,sg as ah,Ig as ai,Gr as aj,vg as ak,Xf as al,Vf as am,qf as an,Jr as ao,Af as ap,ug as aq,tg as ar,hg as as,yg as at,Kf as au,Zf as av,rg as aw,Wg as ax,Ug as ay,Hg as az,x as b,Y as c,Ve as d,po as e,Sg as f,fe as g,Mr as h,Qr as i,xg as j,V as k,ao as l,q as m,wg as n,zg as o,Mf as p,Gf as q,Eg as r,Rg as s,ag as t,Og as u,Pf as v,Qf as w,Tg as x,lg as y,Zr as z};
