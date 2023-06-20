!function(){"use strict";var e={};(function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})})(e);var t=window.wp.element;function n(){return(0,t.createElement)("div",{className:"lds-ring"},[1,2,3,4].map((e=>(0,t.createElement)("div",null))))}function s(e){return Array.isArray?Array.isArray(e):"[object Array]"===h(e)}function i(e){return"string"==typeof e}function r(e){return"number"==typeof e}function c(e){return"object"==typeof e}function a(e){return null!=e}function o(e){return!e.trim().length}function h(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}const l=e=>`Missing ${e} property in key`,d=e=>`Property 'weight' in key '${e}' must be a positive integer`,u=Object.prototype.hasOwnProperty;class m{constructor(e){this._keys=[],this._keyMap={};let t=0;e.forEach((e=>{let n=f(e);t+=n.weight,this._keys.push(n),this._keyMap[n.id]=n,t+=n.weight})),this._keys.forEach((e=>{e.weight/=t}))}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function f(e){let t=null,n=null,r=null,c=1,a=null;if(i(e)||s(e))r=e,t=g(e),n=p(e);else{if(!u.call(e,"name"))throw new Error(l("name"));const s=e.name;if(r=s,u.call(e,"weight")&&(c=e.weight,c<=0))throw new Error(d(s));t=g(s),n=p(s),a=e.getFn}return{path:t,id:n,weight:c,src:r,getFn:a}}function g(e){return s(e)?e:e.split(".")}function p(e){return s(e)?e.join("."):e}var y={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(e,t)=>e.score===t.score?e.idx<t.idx?-1:1:e.score<t.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,useExtendedSearch:!1,getFn:function(e,t){let n=[],o=!1;const l=(e,t,d)=>{if(a(e))if(t[d]){const u=e[t[d]];if(!a(u))return;if(d===t.length-1&&(i(u)||r(u)||function(e){return!0===e||!1===e||function(e){return c(e)&&null!==e}(e)&&"[object Boolean]"==h(e)}(u)))n.push(function(e){return null==e?"":function(e){if("string"==typeof e)return e;let t=e+"";return"0"==t&&1/e==-1/0?"-0":t}(e)}(u));else if(s(u)){o=!0;for(let e=0,n=u.length;e<n;e+=1)l(u[e],t,d+1)}else t.length&&l(u,t,d+1)}else n.push(e)};return l(e,i(t)?t.split("."):t,0),o?n:n[0]},ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};const v=/[^ ]+/g;class M{constructor({getFn:e=y.getFn,fieldNormWeight:t=y.fieldNormWeight}={}){this.norm=function(e=1,t=3){const n=new Map,s=Math.pow(10,t);return{get(t){const i=t.match(v).length;if(n.has(i))return n.get(i);const r=1/Math.pow(i,.5*e),c=parseFloat(Math.round(r*s)/s);return n.set(i,c),c},clear(){n.clear()}}}(t,3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach(((e,t)=>{this._keysMap[e.id]=t}))}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,i(this.docs[0])?this.docs.forEach(((e,t)=>{this._addString(e,t)})):this.docs.forEach(((e,t)=>{this._addObject(e,t)})),this.norm.clear())}add(e){const t=this.size();i(e)?this._addString(e,t):this._addObject(e,t)}removeAt(e){this.records.splice(e,1);for(let t=e,n=this.size();t<n;t+=1)this.records[t].i-=1}getValueForItemAtKeyId(e,t){return e[this._keysMap[t]]}size(){return this.records.length}_addString(e,t){if(!a(e)||o(e))return;let n={v:e,i:t,n:this.norm.get(e)};this.records.push(n)}_addObject(e,t){let n={i:t,$:{}};this.keys.forEach(((t,r)=>{let c=t.getFn?t.getFn(e):this.getFn(e,t.path);if(a(c))if(s(c)){let e=[];const t=[{nestedArrIndex:-1,value:c}];for(;t.length;){const{nestedArrIndex:n,value:r}=t.pop();if(a(r))if(i(r)&&!o(r)){let t={v:r,i:n,n:this.norm.get(r)};e.push(t)}else s(r)&&r.forEach(((e,n)=>{t.push({nestedArrIndex:n,value:e})}))}n.$[r]=e}else if(i(c)&&!o(c)){let e={v:c,n:this.norm.get(c)};n.$[r]=e}})),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}}function E(e,t,{getFn:n=y.getFn,fieldNormWeight:s=y.fieldNormWeight}={}){const i=new M({getFn:n,fieldNormWeight:s});return i.setKeys(e.map(f)),i.setSources(t),i.create(),i}function x(e,{errors:t=0,currentLocation:n=0,expectedLocation:s=0,distance:i=y.distance,ignoreLocation:r=y.ignoreLocation}={}){const c=t/e.length;if(r)return c;const a=Math.abs(s-n);return i?c+a/i:a?1:c}const _=32;function k(e){let t={};for(let n=0,s=e.length;n<s;n+=1){const i=e.charAt(n);t[i]=(t[i]||0)|1<<s-n-1}return t}class S{constructor(e,{location:t=y.location,threshold:n=y.threshold,distance:s=y.distance,includeMatches:i=y.includeMatches,findAllMatches:r=y.findAllMatches,minMatchCharLength:c=y.minMatchCharLength,isCaseSensitive:a=y.isCaseSensitive,ignoreLocation:o=y.ignoreLocation}={}){if(this.options={location:t,threshold:n,distance:s,includeMatches:i,findAllMatches:r,minMatchCharLength:c,isCaseSensitive:a,ignoreLocation:o},this.pattern=a?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;const h=(e,t)=>{this.chunks.push({pattern:e,alphabet:k(e),startIndex:t})},l=this.pattern.length;if(l>_){let e=0;const t=l%_,n=l-t;for(;e<n;)h(this.pattern.substr(e,_),e),e+=_;if(t){const e=l-_;h(this.pattern.substr(e),e)}}else h(this.pattern,0)}searchIn(e){const{isCaseSensitive:t,includeMatches:n}=this.options;if(t||(e=e.toLowerCase()),this.pattern===e){let t={isMatch:!0,score:0};return n&&(t.indices=[[0,e.length-1]]),t}const{location:s,distance:i,threshold:r,findAllMatches:c,minMatchCharLength:a,ignoreLocation:o}=this.options;let h=[],l=0,d=!1;this.chunks.forEach((({pattern:t,alphabet:u,startIndex:m})=>{const{isMatch:f,score:g,indices:p}=function(e,t,n,{location:s=y.location,distance:i=y.distance,threshold:r=y.threshold,findAllMatches:c=y.findAllMatches,minMatchCharLength:a=y.minMatchCharLength,includeMatches:o=y.includeMatches,ignoreLocation:h=y.ignoreLocation}={}){if(t.length>_)throw new Error("Pattern length exceeds max of 32.");const l=t.length,d=e.length,u=Math.max(0,Math.min(s,d));let m=r,f=u;const g=a>1||o,p=g?Array(d):[];let v;for(;(v=e.indexOf(t,f))>-1;){let e=x(t,{currentLocation:v,expectedLocation:u,distance:i,ignoreLocation:h});if(m=Math.min(e,m),f=v+l,g){let e=0;for(;e<l;)p[v+e]=1,e+=1}}f=-1;let M=[],E=1,k=l+d;const S=1<<l-1;for(let s=0;s<l;s+=1){let r=0,a=k;for(;r<a;)x(t,{errors:s,currentLocation:u+a,expectedLocation:u,distance:i,ignoreLocation:h})<=m?r=a:k=a,a=Math.floor((k-r)/2+r);k=a;let o=Math.max(1,u-a+1),y=c?d:Math.min(u+a,d)+l,v=Array(y+2);v[y+1]=(1<<s)-1;for(let r=y;r>=o;r-=1){let c=r-1,a=n[e.charAt(c)];if(g&&(p[c]=+!!a),v[r]=(v[r+1]<<1|1)&a,s&&(v[r]|=(M[r+1]|M[r])<<1|1|M[r+1]),v[r]&S&&(E=x(t,{errors:s,currentLocation:c,expectedLocation:u,distance:i,ignoreLocation:h}),E<=m)){if(m=E,f=c,f<=u)break;o=Math.max(1,2*u-f)}}if(x(t,{errors:s+1,currentLocation:u,expectedLocation:u,distance:i,ignoreLocation:h})>m)break;M=v}const L={isMatch:f>=0,score:Math.max(.001,E)};if(g){const e=function(e=[],t=y.minMatchCharLength){let n=[],s=-1,i=-1,r=0;for(let c=e.length;r<c;r+=1){let c=e[r];c&&-1===s?s=r:c||-1===s||(i=r-1,i-s+1>=t&&n.push([s,i]),s=-1)}return e[r-1]&&r-s>=t&&n.push([s,r-1]),n}(p,a);e.length?o&&(L.indices=e):L.isMatch=!1}return L}(e,t,u,{location:s+m,distance:i,threshold:r,findAllMatches:c,minMatchCharLength:a,includeMatches:n,ignoreLocation:o});f&&(d=!0),l+=g,f&&p&&(h=[...h,...p])}));let u={isMatch:d,score:d?l/this.chunks.length:1};return d&&n&&(u.indices=h),u}}class L{constructor(e){this.pattern=e}static isMultiMatch(e){return w(e,this.multiRegex)}static isSingleMatch(e){return w(e,this.singleRegex)}search(){}}function w(e,t){const n=e.match(t);return n?n[1]:null}class I extends L{constructor(e,{location:t=y.location,threshold:n=y.threshold,distance:s=y.distance,includeMatches:i=y.includeMatches,findAllMatches:r=y.findAllMatches,minMatchCharLength:c=y.minMatchCharLength,isCaseSensitive:a=y.isCaseSensitive,ignoreLocation:o=y.ignoreLocation}={}){super(e),this._bitapSearch=new S(e,{location:t,threshold:n,distance:s,includeMatches:i,findAllMatches:r,minMatchCharLength:c,isCaseSensitive:a,ignoreLocation:o})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(e){return this._bitapSearch.searchIn(e)}}class N extends L{constructor(e){super(e)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(e){let t,n=0;const s=[],i=this.pattern.length;for(;(t=e.indexOf(this.pattern,n))>-1;)n=t+i,s.push([t,n-1]);const r=!!s.length;return{isMatch:r,score:r?0:1,indices:s}}}const C=[class extends L{constructor(e){super(e)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(e){const t=e===this.pattern;return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},N,class extends L{constructor(e){super(e)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(e){const t=e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},class extends L{constructor(e){super(e)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(e){const t=!e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends L{constructor(e){super(e)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(e){const t=!e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends L{constructor(e){super(e)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(e){const t=e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[e.length-this.pattern.length,e.length-1]}}},class extends L{constructor(e){super(e)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(e){const t=-1===e.indexOf(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},I],$=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,b=new Set([I.type,N.type]);const F=[];function A(e,t){for(let n=0,s=F.length;n<s;n+=1){let s=F[n];if(s.condition(e,t))return new s(e,t)}return new S(e,t)}const R="$and",T="$path",z=e=>!(!e[R]&&!e.$or),O=e=>({[R]:Object.keys(e).map((t=>({[t]:e[t]})))});function j(e,t,{auto:n=!0}={}){const r=e=>{let a=Object.keys(e);const o=(e=>!!e[T])(e);if(!o&&a.length>1&&!z(e))return r(O(e));if((e=>!s(e)&&c(e)&&!z(e))(e)){const s=o?e[T]:a[0],r=o?e.$val:e[s];if(!i(r))throw new Error((e=>`Invalid value for key ${e}`)(s));const c={keyId:p(s),pattern:r};return n&&(c.searcher=A(r,t)),c}let h={children:[],operator:a[0]};return a.forEach((t=>{const n=e[t];s(n)&&n.forEach((e=>{h.children.push(r(e))}))})),h};return z(e)||(e=O(e)),r(e)}function W(e,t){const n=e.matches;t.matches=[],a(n)&&n.forEach((e=>{if(!a(e.indices)||!e.indices.length)return;const{indices:n,value:s}=e;let i={indices:n,value:s};e.key&&(i.key=e.key.src),e.idx>-1&&(i.refIndex=e.idx),t.matches.push(i)}))}function P(e,t){t.score=e.score}class q{constructor(e,t={},n){this.options={...y,...t},this.options.useExtendedSearch,this._keyStore=new m(this.options.keys),this.setCollection(e,n)}setCollection(e,t){if(this._docs=e,t&&!(t instanceof M))throw new Error("Incorrect 'index' type");this._myIndex=t||E(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(e){a(e)&&(this._docs.push(e),this._myIndex.add(e))}remove(e=(()=>!1)){const t=[];for(let n=0,s=this._docs.length;n<s;n+=1){const i=this._docs[n];e(i,n)&&(this.removeAt(n),n-=1,s-=1,t.push(i))}return t}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:t=-1}={}){const{includeMatches:n,includeScore:s,shouldSort:c,sortFn:a,ignoreFieldNorm:o}=this.options;let h=i(e)?i(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return function(e,{ignoreFieldNorm:t=y.ignoreFieldNorm}){e.forEach((e=>{let n=1;e.matches.forEach((({key:e,norm:s,score:i})=>{const r=e?e.weight:null;n*=Math.pow(0===i&&r?Number.EPSILON:i,(r||1)*(t?1:s))})),e.score=n}))}(h,{ignoreFieldNorm:o}),c&&h.sort(a),r(t)&&t>-1&&(h=h.slice(0,t)),function(e,t,{includeMatches:n=y.includeMatches,includeScore:s=y.includeScore}={}){const i=[];return n&&i.push(W),s&&i.push(P),e.map((e=>{const{idx:n}=e,s={item:t[n],refIndex:n};return i.length&&i.forEach((t=>{t(e,s)})),s}))}(h,this._docs,{includeMatches:n,includeScore:s})}_searchStringList(e){const t=A(e,this.options),{records:n}=this._myIndex,s=[];return n.forEach((({v:e,i:n,n:i})=>{if(!a(e))return;const{isMatch:r,score:c,indices:o}=t.searchIn(e);r&&s.push({item:e,idx:n,matches:[{score:c,value:e,norm:i,indices:o}]})})),s}_searchLogical(e){const t=j(e,this.options),n=(e,t,s)=>{if(!e.children){const{keyId:n,searcher:i}=e,r=this._findMatches({key:this._keyStore.get(n),value:this._myIndex.getValueForItemAtKeyId(t,n),searcher:i});return r&&r.length?[{idx:s,item:t,matches:r}]:[]}const i=[];for(let r=0,c=e.children.length;r<c;r+=1){const c=e.children[r],a=n(c,t,s);if(a.length)i.push(...a);else if(e.operator===R)return[]}return i},s=this._myIndex.records,i={},r=[];return s.forEach((({$:e,i:s})=>{if(a(e)){let c=n(t,e,s);c.length&&(i[s]||(i[s]={idx:s,item:e,matches:[]},r.push(i[s])),c.forEach((({matches:e})=>{i[s].matches.push(...e)})))}})),r}_searchObjectList(e){const t=A(e,this.options),{keys:n,records:s}=this._myIndex,i=[];return s.forEach((({$:e,i:s})=>{if(!a(e))return;let r=[];n.forEach(((n,s)=>{r.push(...this._findMatches({key:n,value:e[s],searcher:t}))})),r.length&&i.push({idx:s,item:e,matches:r})})),i}_findMatches({key:e,value:t,searcher:n}){if(!a(t))return[];let i=[];if(s(t))t.forEach((({v:t,i:s,n:r})=>{if(!a(t))return;const{isMatch:c,score:o,indices:h}=n.searchIn(t);c&&i.push({score:o,key:e,value:t,idx:s,norm:r,indices:h})}));else{const{v:s,n:r}=t,{isMatch:c,score:a,indices:o}=n.searchIn(s);c&&i.push({score:a,key:e,value:s,norm:r,indices:o})}return i}}q.version="6.6.2",q.createIndex=E,q.parseIndex=function(e,{getFn:t=y.getFn,fieldNormWeight:n=y.fieldNormWeight}={}){const{keys:s,records:i}=e,r=new M({getFn:t,fieldNormWeight:n});return r.setKeys(s),r.setIndexRecords(i),r},q.config=y,q.parseQuery=j,function(...e){F.push(...e)}(class{constructor(e,{isCaseSensitive:t=y.isCaseSensitive,includeMatches:n=y.includeMatches,minMatchCharLength:s=y.minMatchCharLength,ignoreLocation:i=y.ignoreLocation,findAllMatches:r=y.findAllMatches,location:c=y.location,threshold:a=y.threshold,distance:o=y.distance}={}){this.query=null,this.options={isCaseSensitive:t,includeMatches:n,minMatchCharLength:s,findAllMatches:r,ignoreLocation:i,location:c,threshold:a,distance:o},this.pattern=t?e:e.toLowerCase(),this.query=function(e,t={}){return e.split("|").map((e=>{let n=e.trim().split($).filter((e=>e&&!!e.trim())),s=[];for(let e=0,i=n.length;e<i;e+=1){const i=n[e];let r=!1,c=-1;for(;!r&&++c<8;){const e=C[c];let n=e.isMultiMatch(i);n&&(s.push(new e(n,t)),r=!0)}if(!r)for(c=-1;++c<8;){const e=C[c];let n=e.isSingleMatch(i);if(n){s.push(new e(n,t));break}}}return s}))}(this.pattern,this.options)}static condition(e,t){return t.useExtendedSearch}searchIn(e){const t=this.query;if(!t)return{isMatch:!1,score:1};const{includeMatches:n,isCaseSensitive:s}=this.options;e=s?e:e.toLowerCase();let i=0,r=[],c=0;for(let s=0,a=t.length;s<a;s+=1){const a=t[s];r.length=0,i=0;for(let t=0,s=a.length;t<s;t+=1){const s=a[t],{isMatch:o,indices:h,score:l}=s.search(e);if(!o){c=0,i=0,r.length=0;break}if(i+=1,c+=l,n){const e=s.constructor.type;b.has(e)?r=[...r,...h]:r.push(h)}}if(i){let e={isMatch:!0,score:c/i};return n&&(e.indices=r),e}}return{isMatch:!1,score:1}}});const G={keys:[{name:"title",weight:1},{name:"event_info.description",weight:.5},{name:"event_info.info.day",weight:.03},{name:"type.name",weight:.8},{name:"locations.name",weight:.8}]};function K({filters:e,checkedFilters:n,setCheckedFilters:s}){return(0,t.createElement)("div",{className:"cno-event-search-filters"},e.map((({type:{name:e,filters:i}})=>(0,t.createElement)("div",{className:"cno-event-search-filters__container",onClick:e=>{!function(e,{target:t}){t.id&&(n.includes(t.id)?s(n.filter((e=>e!==t.id))):s((e=>[...e,t.id])))}(0,e)}},(0,t.createElement)("h4",{className:"cno-event-search-filters__title"},e),i.map((e=>(0,t.createElement)("div",{className:"cno-event-search-filters__filter"},(0,t.createElement)("input",{type:"checkbox",name:e.link,id:e.name,checked:n.includes(e.name),onChange:()=>{}}),(0,t.createElement)("label",{htmlFor:e.name},e.name))))))))}function D({search:e,handleSearchInput:n}){return(0,t.createElement)("input",{type:"text",name:"search",id:"search",placeholder:"Find an Event",className:"cno-event-search__search-bar",value:e,onChange:n})}function J({filters:e,checkedFilters:n,setCheckedFilters:s,handleSearchInput:i,search:r}){const[c,a]=(0,t.useState)(!1);return(0,t.createElement)("section",{className:"cno-event-search"},(0,t.createElement)("div",{className:"container"},(0,t.createElement)("h2",{className:"cno-event-search__title"},"Search Events"),(0,t.createElement)(D,{search:r,handleSearchInput:i}),(0,t.createElement)("div",{className:"cno-event-search__filters"},(0,t.createElement)("div",{className:"cno-event-search__filters--header"},(0,t.createElement)("h3",{className:"cno-event-search__filters--title"},"Filters"),(0,t.createElement)("button",{className:"btn__outline--secondary",onClick:()=>{a(!c)}},c?"Hide Filters":"Show Filters")),c&&(0,t.createElement)(K,{filters:e,checkedFilters:n,setCheckedFilters:s}))))}function B({data:e}){const{locations:n,title:s,event_info:i,altText:r,srcSet:c,size:a,sizes:o,type:h}=e;return(0,t.createElement)("article",{className:"cno-event"},(0,t.createElement)("figure",{className:"cno-event__image"},(0,t.createElement)("img",{width:a.width,height:a.height,src:"",className:"attachment-large size-large wp-post-image",alt:r,decoding:"async",srcSet:c,sizes:o})),(0,t.createElement)("h2",null,s),(0,t.createElement)("aside",{className:"event-meta"},(0,t.createElement)("div",{className:"event-meta__day"},(0,t.createElement)("strong",null,"When: "),i.info.day,", September 1"),n.length>0&&(0,t.createElement)("div",{className:"event-meta__location"},(0,t.createElement)("strong",null,"Where:")," ",(0,t.createElement)("a",{href:n[0].link,rel:"tag"},n[0].name)),(0,t.createElement)("div",{className:"event-meta__start-time"},(0,t.createElement)("strong",null,"Start Time:")," "+i.info.startTime),i.info.endTime&&(0,t.createElement)("div",{className:"event-meta__end-time"},(0,t.createElement)("strong",null,"End Time:")," ",i.info.endTime),(0,t.createElement)("div",{className:"event-meta__type"},(0,t.createElement)("strong",null,"Event Type:")," ",(0,t.createElement)("a",{href:"${type[0].link}",rel:"tag"},h[0].name))),(0,t.createElement)("div",{className:"about"},i.description))}function Q({posts:e,checkedFilters:n}){return(0,t.createElement)("section",{className:"cno-events"},e.map((e=>{if(0===n.length)return(0,t.createElement)(B,{data:e});if(1===n.length){if(n.includes(e.eventLocations.nodes[0].name)||n.includes(e.eventTypes.nodes[0].name))return(0,t.createElement)(B,{data:e})}else if(n.includes(e.eventLocations.nodes[0].name)&&n.includes(e.eventTypes.nodes[0].name))return(0,t.createElement)(B,{data:e})})))}const U=document.getElementById("app");U&&(0,t.createRoot)(U).render((0,t.createElement)((function(){const[s,i]=(0,t.useState)(!0),[r,c]=(0,t.useState)([]),[a,o]=(0,t.useState)([]),[h,l]=(0,t.useState)("");(0,t.useEffect)((()=>{""===h&&async function(){const t={query:'query Events($first: Int = 4, $after: String = "", $include: [MediaItemSizeEnum] = [LARGE], $size: MediaItemSizeEnum = LARGE) {\n  events(after: $after, first: $first) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    nodes {\n      eventLocations {\n        nodes {\n          name\n          link\n          event_locationId\n        }\n      }\n      event_info {\n        description\n        info {\n          day\n          endTime\n          startTime\n        }\n      }\n      featuredImage {\n        node {\n          altText\n          mediaDetails {\n            sizes(include: $include) {\n              height\n              name\n              width\n              sourceUrl\n            }\n          }\n          srcSet(size: $size)\n\t\t  sizes(size: $size)\n        }\n      }\n      title(format: RENDERED)\n      link\n\t  eventId\n      eventTypes {\n        nodes {\n          event_typeId\n          name\n          link\n        }\n      }\n    }\n  }\n  eventTypes {\n    nodes {\n      event_typeId\n      name\n\t  link\n    }\n  }\n  eventLocations {\n    nodes {\n      name\n      link\n      event_locationId\n    }\n  }\n}',variables:{first:Number(e.POSTS_PER_PAGE),after:"",include:["LARGE"],size:"LARGE"}};try{const n=await async function(t){try{const n=await fetch(`${e.graphQL}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),{data:s}=await n.json();return s}catch(e){throw console.error("makeRequest error:",e),e}}(t);return n}catch(e){console.error(e)}}().then((({eventLocations:e,eventTypes:t,events:n})=>{c(n.nodes.map((e=>function(e){const{eventLocations:{nodes:t}}=e,{eventTypes:{nodes:n}}=e,{eventId:s,link:i,title:r}=e,{event_info:c}=e,{featuredImage:{node:{altText:a,srcSet:o,mediaDetails:h,sizes:l}}}=e;return{locations:t,type:n,sizes:l,eventId:s,link:i,title:r,event_info:c,altText:a,srcSet:o,size:h.sizes[0]}}(e)))),i(!1)}))}),[h]),(0,t.useEffect)((()=>{if(""===h)return;i(!0);const e=setTimeout((()=>{const e=new q(r,{...G}).search(h);c(e.map((e=>e.item))),i(!1)}),500);return()=>clearTimeout(e)}),[h]);const[d,u]=(0,t.useState)([]);return(0,t.createElement)("div",{className:"cno-search"},(0,t.createElement)(J,{filters:a,search:h,checkedFilters:d,setCheckedFilters:u,handleSearchInput:function({target:e}){l(e.value)}}),(0,t.createElement)("div",{className:"container"},s?(0,t.createElement)(n,null):(0,t.createElement)(Q,{posts:r,checkedFilters:d})))}),null))}();