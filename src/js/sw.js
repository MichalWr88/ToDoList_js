if(!self.define){let e,t={};const i=(i,r)=>(i=new URL(i+".js",r).href,t[i]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=t,document.head.appendChild(e)}else e=i,importScripts(i),t()})).then((()=>{let e=t[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(t[s])return;let o={};const c=e=>i(e,s),d={module:{uri:s},exports:o,require:c};t[s]=Promise.all(r.map((e=>d[e]||c(e)))).then((e=>(n(...e),o)))}}define(["./workbox-f01d03c6"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"index.html",revision:"fafe0acac5638935e6bd0dce6b82d6ca"},{url:"main.be4a522101c30ee253dc.js",revision:"4b980c1681f85c396d05d16fe0e75260"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
