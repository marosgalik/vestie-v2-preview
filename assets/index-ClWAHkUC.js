(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[],t=()=>{};function n(t,n){let r=[],i=t.replace(/:(\w+)/g,(e,t)=>(r.push(t),`([^/]+)`));e.push({regex:RegExp(`^${i}$`),keys:r,screen:n})}function r(){let[e,t=``]=(location.hash.slice(1)||`/`).split(`?`);return{path:e,query:Object.fromEntries(new URLSearchParams(t))}}function i(t){for(let n of e){let e=n.regex.exec(t);if(e){let t=Object.fromEntries(n.keys.map((t,n)=>[t,decodeURIComponent(e[n+1])]));return{screen:n.screen,params:t}}}return null}function a(e,{replace:n=!1}={}){let r=history.state?.index??0;n?history.replaceState({index:r},``,`#${e}`):history.pushState({index:r+1},``,`#${e}`),t()}function o(e){history.replaceState(history.state,``,`#${e}`)}function s(e){(history.state?.index??0)>0?history.back():a(e,{replace:!0})}function c(e){t=e,window.addEventListener(`popstate`,()=>e()),e()}var l;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(l||={});var u=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},d=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,f=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?d(e):t.name,a=()=>i()!==`web`,o=e=>!!(f.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),f=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=f.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),d=s(e),p,m=async()=>(!p&&c in a?p=p=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!p&&`web`in a&&(p=p=typeof a.web==`function`?await a.web():a.web),p),h=(t,r)=>{if(d){let i=d?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new u(`"${e}" plugin is not implemented on ${c}`,l.Unimplemented)},g=t=>{let n,r=(...r)=>{let i=m().then(i=>{let a=h(i,t);if(a){let e=a(...r);return n=e?.remove,e}throw new u(`"${e}.${t}()" is not implemented on ${c}`,l.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,"name",{value:t,writable:!1,configurable:!1}),r},_=g(`addListener`),v=g(`removeListener`),y=(e,t)=>{let n=_({eventName:e},t),r=async()=>{let r=await n;v({eventName:e,callbackId:r},t)},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},b=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return d?y:_;case`removeListener`:return v;default:return g(t)}}});return r[e]=b,f.set(e,{name:e,proxy:b,platforms:new Set([...Object.keys(a),...d?[c]:[]])}),b},n.Exception=u,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},p=(e=>e.Capacitor=f(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),m=p.registerPlugin,h=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new p.Exception(e,l.Unimplemented)}unavailable(e=`not available`){return new p.Exception(e,l.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},g=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),_=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),v=class extends h{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=_(n).trim(),r=_(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=g(e.key),n=g(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};m(`CapacitorCookies`,{web:()=>new v});var y=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),b=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},x=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,S=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=b(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},C=class extends h{async request(e){let t=S(e,e.webFetchExtra),n=x(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await y(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};m(`CapacitorHttp`,{web:()=>new C});var w;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(w||={});var T;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(T||={});var E=class extends h{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};m(`SystemBars`,{web:()=>new E});var D=`modulepreload`,ee=function(e,t){return new URL(e,t).href},te={},O=function(e){return e.pathname.endsWith(`.css`)},ne=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},k=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=ee(t,n);let r=s(t),i=O(r);return ne(te,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:D,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},re=m(`Preferences`,{web:()=>k(()=>import(`./web-Bh6GSKO3.js`).then(e=>new e.PreferencesWeb),[],import.meta.url)}),ie=new TextEncoder,ae=new TextDecoder,oe=6e5;function se(e){let t=new Uint8Array(e),n=``;for(let e=0;e<t.length;e+=32768)n+=String.fromCharCode(...t.subarray(e,e+32768));return btoa(n)}var ce=e=>Uint8Array.from(atob(e),e=>e.charCodeAt(0)),le=e=>crypto.getRandomValues(new Uint8Array(e)),ue=()=>se(le(16));async function de(e,t,n=oe){let r=await crypto.subtle.importKey(`raw`,ie.encode(e),`PBKDF2`,!1,[`deriveKey`]);return crypto.subtle.deriveKey({name:`PBKDF2`,salt:ce(t),iterations:n,hash:`SHA-256`},r,{name:`AES-GCM`,length:256},!1,[`wrapKey`,`unwrapKey`])}var fe=()=>crypto.subtle.generateKey({name:`AES-GCM`,length:256},!0,[`encrypt`,`decrypt`]);async function pe(e,t){let n=le(12),r=await crypto.subtle.wrapKey(`raw`,e,t,{name:`AES-GCM`,iv:n});return{iv:se(n),key:se(r)}}function me(e,t){return crypto.subtle.unwrapKey(`raw`,ce(e.key),t,{name:`AES-GCM`,iv:ce(e.iv)},{name:`AES-GCM`,length:256},!0,[`encrypt`,`decrypt`])}async function he(e,t){let n=le(12),r=await crypto.subtle.encrypt({name:`AES-GCM`,iv:n},t,ie.encode(JSON.stringify(e)));return{enc:1,iv:se(n),data:se(r)}}async function ge(e,t){let n=await crypto.subtle.decrypt({name:`AES-GCM`,iv:ce(e.iv)},t,ce(e.data));return JSON.parse(ae.decode(n))}async function _e(e,t,n){let r=await crypto.subtle.importKey(`raw`,ie.encode(e),`PBKDF2`,!1,[`deriveKey`]);return crypto.subtle.deriveKey({name:`PBKDF2`,salt:ce(t),iterations:n,hash:`SHA-256`},r,{name:`AES-GCM`,length:256},!1,[`encrypt`,`decrypt`])}async function ve(e,t){let n=ue(),r=await _e(t,n,oe);return{kdf:{name:`PBKDF2-SHA-256`,salt:n,iterations:oe},cipher:{name:`AES-256-GCM`,...await he(e,r)}}}async function ye({kdf:e,cipher:t},n){return ge(t,await _e(n,e.salt,e.iterations))}var be={facebook:`https://www.facebook.com/groups/3261623930593764`,instagram:`https://www.instagram.com/vestibularnamigrena/`,discord:`https://discord.gg/AMz5vd5HRr`,web:`https://www.vestibularnamigrena.sk/`},xe=m(`Browser`,{web:()=>k(()=>import(`./web-5paJv1y3.js`).then(e=>new e.BrowserWeb),[],import.meta.url)});function Se(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,n){return new Proxy({},{get(t,r){return(t,i,a)=>{let o=e.Capacitor.Plugins[n];o===void 0?a(Error(`Capacitor plugin ${n} not found`)):typeof o[r]==`function`?(async()=>{try{i(await o[r](t))}catch(e){a(e)}})():a(Error(`Method ${r} not found in Capacitor plugin ${n}`))}}})}})}function Ce(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,n){return e.cordova.plugins[n]}})}function we(e=!1){typeof window>`u`||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?Se(window):window.cordova!==void 0&&Ce(window))}var Te;(function(e){e.Documents=`DOCUMENTS`,e.Data=`DATA`,e.Library=`LIBRARY`,e.Cache=`CACHE`,e.External=`EXTERNAL`,e.ExternalStorage=`EXTERNAL_STORAGE`,e.ExternalCache=`EXTERNAL_CACHE`,e.LibraryNoCloud=`LIBRARY_NO_CLOUD`,e.Temporary=`TEMPORARY`})(Te||={});var Ee;(function(e){e.UTF8=`utf8`,e.ASCII=`ascii`,e.UTF16=`utf16`})(Ee||={});var De=m(`Filesystem`,{web:()=>k(()=>import(`./web-Du-VJuWP.js`).then(e=>new e.FilesystemWeb),[],import.meta.url)});we();var Oe=m(`PrivacyScreen`,{web:()=>k(()=>import(`./web-CuWXBIfc-DoEKK6X8.js`).then(e=>new e.PrivacyScreenWeb),[],import.meta.url)}),ke=m(`Share`,{web:()=>k(()=>import(`./web-BKqpNd6i.js`).then(e=>new e.ShareWeb),[],import.meta.url)}),Ae=()=>p.isNativePlatform(),je=m(`VestiePrint`),Me=`vestie-`;function Ne(e){return xe.open({url:e})}async function Pe(e){Ae()?await je.print({name:e}):window.print()}async function Fe(e,t){let{uri:n}=await De.writeFile({path:`${Me}${e}`,data:t,directory:Te.Cache,encoding:Ee.UTF8});try{return await ke.share({files:[n]}),!0}catch{return!1}}async function Ie(e,t,n=`application/json`){if(Ae())return Fe(e,t);let r=URL.createObjectURL(new Blob([t],{type:n})),i=document.createElement(`a`);return i.href=r,i.download=`${Me}${e}`,document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3),!0}async function Le(){if(Ae())try{let{files:e}=await De.readdir({path:``,directory:Te.Cache}),t=e.filter(e=>e.name.startsWith(Me));await Promise.all(t.map(e=>De.deleteFile({path:e.name,directory:Te.Cache})))}catch(e){console.error(`[native] Dočasné súbory sa nepodarilo vymazať`,e)}}function Re(e){return new Promise(t=>{let n=document.createElement(`input`);n.type=`file`,n.accept=e,n.addEventListener(`change`,()=>t(n.files[0]??null),{once:!0}),n.addEventListener(`cancel`,()=>t(null),{once:!0}),n.click()})}async function ze(e){if(Ae())try{e?await Oe.enable():await Oe.disable()}catch(e){console.error(`[native] Ochranu obrazovky sa nepodarilo nastaviť`,e)}}var Be=`vm2:data`,Ve=`vm2:lock`,He=5,Ue=3e4,We=9e5,Ge=null,Ke=Promise.resolve(),qe=new Map;function Je(e){return Ae()?qe.get(e)??null:localStorage.getItem(e)}function Ye(e){e().catch(e=>console.error(`[storage] Dáta sa nepodarilo uložiť`,e))}function Xe(e,t){Ae()?(qe.set(e,t),Ye(()=>re.set({key:e,value:t}))):localStorage.setItem(e,t)}function Ze(e){Ae()?(qe.delete(e),Ye(()=>re.remove({key:e}))):localStorage.removeItem(e)}async function Qe(){if(Ae())for(let e of[Be,Ve]){let{value:t}=await re.get({key:e}),n=t===null?localStorage.getItem(e):null;n!==null&&(await re.set({key:e,value:n}),localStorage.removeItem(e));let r=t??n;r!==null&&qe.set(e,r)}await ze(tt())}function $e(e){try{let t=Je(e);return t?JSON.parse(t):null}catch(e){return console.error(`[storage] Dáta sa nepodarilo načítať`,e),null}}function et(e,t){try{Xe(e,JSON.stringify(t))}catch(e){console.error(`[storage] Dáta sa nepodarilo uložiť`,e)}}var tt=()=>!!$e(Ve),nt=()=>!tt()||!!Ge,rt=()=>$e(Ve)?.language??null,it=()=>$e(Ve)?.theme??null;function at({language:e,theme:t}){let n=$e(Ve);n&&et(Ve,{...n,...e?{language:e}:{},...t?{theme:t}:{}})}var ot=()=>$e(Ve)?.blockedUntil??0;function st(e){let t=(e.failed??0)+1,n=t-He,r=n>=0?Date.now()+Math.min(Ue*2**n,We):0;return et(Ve,{...e,failed:t,blockedUntil:r}),{failed:t,blockedUntil:r,remaining:Math.max(He-t,0)}}var ct=class extends Error{constructor(e,t={}){super(e),this.code=e,Object.assign(this,t)}};async function lt(e){let t=$e(Ve);if(!t)throw new ct(`wrong`);if(t.blockedUntil&&t.blockedUntil>Date.now())throw new ct(`blocked`,{blockedUntil:t.blockedUntil});try{let n=await de(e,t.salt,t.iterations),r=await me(t.wrapped,n);return et(Ve,{...t,failed:0,blockedUntil:0}),r}catch{throw new ct(`wrong`,st($e(Ve)))}}function ut(){if(tt())return null;let e=$e(Be);return e?.enc?null:e}function dt(e){if(!tt()){et(Be,e);return}if(!Ge)return;let t=he(e,Ge);Ke=Ke.then(()=>t).then(e=>et(Be,e)).catch(e=>console.error(`[storage] Dáta sa nepodarilo zašifrovať`,e))}async function ft(e){let t=await lt(e),n=$e(Be),r=n?.enc?await ge(n,t):n;return Ge=t,r}async function pt(e){return await lt(e),!0}async function mt(e,t,{language:n,theme:r}={}){let i=ue(),a=await de(e,i),o=await fe(),s=await pe(o,a),c=await he(t,o);await Ke,et(Ve,{v:1,salt:i,iterations:oe,wrapped:s,language:n,theme:r,failed:0,blockedUntil:0}),et(Be,c),Ge=o,await ze(!0)}async function ht(e){let t=$e(Ve);if(!t||!Ge)return;let n=ue(),r=await de(e,n),i=await pe(Ge,r);et(Ve,{...t,salt:n,iterations:oe,wrapped:i,failed:0,blockedUntil:0})}async function gt(e){await Ke,Ze(Ve),Ge=null,et(Be,e),await ze(!1)}function _t(){Ge=null}function vt(){Ge=null;try{Ze(Be),Ze(Ve)}catch(e){console.error(`[storage] Dáta sa nepodarilo vymazať`,e)}ze(!1)}var yt=e=>String(e).padStart(2,`0`);function A(e=new Date){let t=new Date(e);return`${t.getFullYear()}-${yt(t.getMonth()+1)}-${yt(t.getDate())}`}function j(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function bt(e=new Date){let t=new Date(e);return`${yt(t.getHours())}:${yt(t.getMinutes())}`}function xt(e,t=`12:00`){let n=j(e),[r,i]=t.split(`:`).map(Number);return n.setHours(r||0,i||0,0,0),n.toISOString()}function M(e,t){let n=new Date(e);return n.setDate(n.getDate()+t),n}var St=(e,t)=>A(e)===A(t),Ct=e=>St(e,new Date),wt=(e=new Date)=>A(e).slice(0,7);function Tt(e){let[t,n]=e.split(`-`).map(Number);return new Date(t,n-1,1)}function Et(e,t){let n=Tt(e);return n.setMonth(n.getMonth()+t),wt(n)}function Dt(e,t){let n=[];for(let r=j(e);A(r)<=t;r=M(r,1))n.push(A(r));return n}var Ot=1;function kt(){return{schemaVersion:Ot,settings:{language:null,onboardingCompletedAt:null,name:``,nameSetAt:null,goals:[],condition:null,cycleTracking:null,reminder:{enabled:!1,time:`20:00`},theme:`system`,reduceMotion:!1,demoSeededAt:null,demoEnabled:!0,consent:null,autoLockMinutes:1,plus:{active:!1,plan:null,startedAt:null,trialEndsAt:null,simulated:!1},weather:{enabled:!1,source:null,lat:null,lon:null,placeLabel:``,consentAt:null,updatedAt:null},health:{connected:!1,provider:null,types:[],consentAt:null,lastSyncAt:null},forecast:{enabled:!1,notify:!0,time:`19:00`,alerts:[`pressure_drop`]},backup:{lastAt:null,remind:!0,snoozedUntil:null}},medications:[],medicationIntakes:[],episodes:[],symptomLogs:[],sleepLogs:[],cycleEntries:[],customSymptoms:[],customTriggers:[],weatherDays:[],healthDays:[]}}function At(e){let t=kt();if(!e)return t;let n={...t,...e,schemaVersion:Ot,settings:{...t.settings,...e.settings}};return n.weatherDays=n.weatherDays.filter(e=>e.source!==`demo`),n.healthDays=n.healthDays.filter(e=>!String(e.id).startsWith(`demo-`)),n.sleepLogs=n.sleepLogs.map(e=>String(e.id).startsWith(`demo-`)?{...e,source:`manual`,bedtime:null,wakeTime:null,externalId:null}:e),n.settings.weather.source===`demo`&&(n.settings.weather=t.settings.weather),n.settings.health.simulated&&(n.settings.health=t.settings.health),n.healthDays=n.healthDays.map(({restingHr:e,...t})=>t),n.settings.health={...n.settings.health,types:(n.settings.health.types??[]).filter(e=>e!==`restingHr`)},n.settings.forecast={...t.settings.forecast,...n.settings.forecast},n}var N=kt();function jt(e){N=At(e)}function Mt(){N=kt()}function P(){dt(N)}var Nt=()=>globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`,Pt=()=>new Date().toISOString();function Ft(e){let t=Pt();return{id:Nt(),createdAt:t,updatedAt:t,...e}}var It=e=>(t,n)=>n[e].localeCompare(t[e]),F=()=>N.settings;function Lt(e){N.settings={...N.settings,...e},P()}var Rt=()=>!!N.settings.onboardingCompletedAt;function zt(){Lt({onboardingCompletedAt:Pt()})}var Bt=()=>N.medications,Vt=e=>N.medications.find(t=>t.id===e)??null;function Ht({name:e=``,type:t,dose:n=``,frequency:r=``,note:i=``,startDate:a=null,endDate:o=null}){return{name:String(e).trim(),type:t===`acute`?`acute`:`preventive`,dose:String(n).trim(),frequency:String(r).trim(),note:String(i).trim(),startDate:a||null,endDate:o||null}}function Ut(e){let t=Ft(Ht(e));return N.medications.push(t),P(),t}function Wt(e,t){let n=Vt(e);return n?(Object.assign(n,Ht({...n,...t}),{updatedAt:Pt()}),P(),n):null}function Gt(e){let t={medication:Vt(e),intakes:N.medicationIntakes.filter(t=>t.medicationId===e)};return N.medications=N.medications.filter(t=>t.id!==e),N.medicationIntakes=N.medicationIntakes.filter(t=>t.medicationId!==e),P(),t}function Kt(e){e?.medication&&!Vt(e.medication.id)&&(N.medications.push(e.medication),N.medicationIntakes.push(...e.intakes),P())}function qt(e){return N.medicationIntakes.filter(t=>!e||t.medicationId===e).sort(It(`takenAt`))}var Jt=e=>N.medicationIntakes.find(t=>t.id===e)??null;function Yt(e){return N.episodes.find(t=>t.startedAt<=e&&(!t.endedAt||t.endedAt>=e))??null}function Xt({medicationId:e,takenAt:t,dose:n=``,effect:r=null,note:i=``}){return{medicationId:e,takenAt:t,dose:String(n).trim(),effect:r||null,note:String(i).trim(),episodeId:Yt(t)?.id??null}}function Zt(e){let t=Ft(Xt(e));return N.medicationIntakes.push(t),P(),t}function Qt(e,t){let n=Jt(e);return n?(Object.assign(n,Xt({...n,...t}),{updatedAt:Pt()}),P(),n):null}function $t(e){let t=Jt(e);return N.medicationIntakes=N.medicationIntakes.filter(t=>t.id!==e),P(),t}function en(e){e&&!Jt(e.id)&&(N.medicationIntakes.push(e),P())}var tn=e=>N.symptomLogs.find(t=>t.id===e)??null,nn=e=>N.symptomLogs.filter(t=>t.episodeId===e).sort(It(`occurredAt`));function rn({id:e,occurredAt:t,symptoms:n,vertigoType:r=null,duration:i=null,note:a=``,episodeId:o=null}){let s={occurredAt:t,symptoms:n.map(({key:e,intensity:t})=>({key:e,intensity:t??null})),vertigoType:r,duration:i,note:String(a).trim(),episodeId:o},c=e?tn(e):null;if(c)return Object.assign(c,s,{updatedAt:Pt()}),P(),c;let l=Ft(s);return N.symptomLogs.push(l),P(),l}function an(e){let t=tn(e);return N.symptomLogs=N.symptomLogs.filter(t=>t.id!==e),P(),t}function on(e){e&&!tn(e.id)&&(N.symptomLogs.push(e),P())}function sn(e){let t=e.symptoms.map(e=>e.intensity).filter(e=>e!=null);return t.length?Math.max(...t):null}var cn=()=>N.customSymptoms,ln=e=>N.customSymptoms.find(t=>t.key===e)??null;function un(e){let t=String(e).trim().slice(0,40);if(!t)return null;let n=N.customSymptoms.find(e=>e.label.toLocaleLowerCase()===t.toLocaleLowerCase());if(n)return n;let r={key:`custom:${Nt()}`,label:t,createdAt:Pt()};return N.customSymptoms.push(r),P(),r}var dn=e=>N.episodes.find(t=>t.id===e)??null;function fn(){return N.episodes.filter(e=>!e.endedAt).sort(It(`startedAt`))[0]??null}function pn(){let e=Ft({startedAt:Pt(),endedAt:null,type:null,intensity:null,symptoms:[],vertigoTypes:[],triggers:[],triggerOther:``,medicationIntakeIds:[],helped:null,relief:[],reliefOther:``,impact:[],impactOther:``,note:``});return N.episodes.push(e),P(),e}function mn(e,t){let n=dn(e);return n?(Object.assign(n,t,{updatedAt:Pt()}),P(),n):null}var hn=e=>mn(e,{endedAt:Pt()}),gn=(e,t)=>mn(e,t),_n=e=>qt().filter(t=>t.episodeId===e),vn=e=>mn(e,{endedAt:null});function yn(e){let t=dn(e);return N.episodes=N.episodes.filter(t=>t.id!==e),P(),t}function bn(e){e&&!dn(e.id)&&(N.episodes.push(e),P())}var xn=e=>N.cycleEntries.some(t=>t.date===e&&t.type===`period`);function Sn(e){return xn(e)?N.cycleEntries=N.cycleEntries.filter(t=>t.date!==e||t.type!==`period`):N.cycleEntries.push({id:Nt(),date:e,type:`period`,createdAt:Pt()}),P(),xn(e)}var Cn=e=>N.sleepLogs.find(t=>t.date===e)??null;function wn({date:e,minutes:t,quality:n=null,note:r=``}){let i={date:e,minutes:Math.max(0,Math.round(t)),quality:n||null,note:String(r).trim(),source:`manual`},a=Cn(e);if(a)return Object.assign(a,i,{updatedAt:Pt()}),P(),a;let o=Ft({...i,bedtime:null,wakeTime:null,externalId:null});return N.sleepLogs.push(o),P(),o}function Tn(e){let t=Cn(e);return N.sleepLogs=N.sleepLogs.filter(t=>t.date!==e),P(),t}function En(e){e&&!Cn(e.date)&&(N.sleepLogs.push(e),P())}var I=()=>!!N.settings.plus.active;function Dn({plan:e,simulated:t=!1,trial:n=e===`yearly`,startedAt:r=null}){let i=new Date;N.settings.plus={active:!0,plan:e,startedAt:r??i.toISOString(),trialEndsAt:n?M(i,7).toISOString():null,simulated:t},P()}function On(){N.settings.plus=kt().settings.plus,P()}var kn=e=>N.weatherDays.find(t=>t.date===e)??null;function An({source:e,lat:t=null,lon:n=null,placeLabel:r=``}){N.settings.weather={enabled:!0,source:e,lat:t,lon:n,placeLabel:r,consentAt:Pt(),updatedAt:Pt()},P()}function jn(){N.settings.weather={...kt().settings.weather},P()}function Mn(e,t=null){let n=new Map(N.weatherDays.map(e=>[e.date,e]));for(let t of e){let e=n.get(t.date);n.set(t.date,e?{...e,...t,updatedAt:Pt()}:Ft(t))}N.weatherDays=[...n.values()],N.settings.weather={...N.settings.weather,...t??{},updatedAt:Pt()},P()}var Nn=e=>N.healthDays.find(t=>t.date===e)??null;function Pn({provider:e,types:t}){N.settings.health={connected:!0,provider:e,types:t,consentAt:Pt(),lastSyncAt:null},P()}function Fn(){N.settings.health={...kt().settings.health},P()}function In(e){N.settings.health={...N.settings.health,types:e},P()}function Ln({sleepLogs:e=[],healthDays:t=[]}){for(let t of e){let e=Cn(t.date);(!e||e.source!==`manual`||Un(e))&&(e&&!Un(e)?Object.assign(e,t,{updatedAt:Pt()}):(e&&(N.sleepLogs=N.sleepLogs.filter(t=>t!==e)),N.sleepLogs.push(Ft({quality:null,note:``,...t}))))}for(let e of t){let t=Nn(e.date);t?Object.assign(t,e,{updatedAt:Pt()}):N.healthDays.push(Ft(e))}N.settings.health={...N.settings.health,lastSyncAt:Pt()},P()}function Rn(e){N.settings.forecast={...N.settings.forecast,...e},P()}var zn=()=>N;function Bn(e){return{episodes:N.episodes.filter(t=>A(t.startedAt)===e).sort(It(`startedAt`)),symptomLogs:N.symptomLogs.filter(t=>A(t.occurredAt)===e).sort(It(`occurredAt`)),intakes:N.medicationIntakes.filter(t=>A(t.takenAt)===e).sort(It(`takenAt`)),sleep:Cn(e),period:xn(e)}}function Vn(e=new Date){let t=Bn(A(e)),n=fn();return n&&!t.episodes.includes(n)&&t.episodes.unshift(n),t}var Hn=[`medications`,`episodes`,`symptomLogs`,`medicationIntakes`,`sleepLogs`,`cycleEntries`],Un=e=>String(e.id).startsWith(`demo-`);function Wn(){N.settings.name!==`Simona`||N.settings.nameSetAt||(N.settings={...N.settings,name:``},P())}function Gn({records:e}){for(let t of Hn)N[t]=[...N[t].filter(e=>!Un(e)),...e[t]];N.settings={...N.settings,demoSeededAt:A(),demoEnabled:!0},Wn(),P()}function Kn(){for(let e of Hn)N[e]=N[e].filter(e=>!Un(e));N.medicationIntakes=N.medicationIntakes.filter(e=>!String(e.medicationId).startsWith(`demo-`)),N.settings={...N.settings,demoEnabled:!1},P()}function qn(e){if(!e||typeof e!=`object`||typeof e.schemaVersion!=`number`||!e.settings||typeof e.settings!=`object`)return!1;let t=kt();return Object.keys(t).filter(e=>Array.isArray(t[e])).every(t=>e[t]===void 0||Array.isArray(e[t]))}function Jn(e){let t=At(e),{plus:n,consent:r,health:i,weather:a,autoLockMinutes:o,onboardingCompletedAt:s,language:c,backup:l}=N.settings;N={...t,settings:{...t.settings,plus:n,consent:r,health:i,weather:a,autoLockMinutes:o,onboardingCompletedAt:s,language:t.settings.language??c,backup:{...l,lastAt:Pt(),snoozedUntil:null}}},P()}function Yn(){N.settings.backup={...N.settings.backup,lastAt:Pt(),snoozedUntil:null},P()}function Xn(e){N.settings.backup={...N.settings.backup,remind:e,snoozedUntil:null},P()}function Zn(e){N.settings.backup={...N.settings.backup,snoozedUntil:M(new Date,e).toISOString()},P()}function Qn(){vt(),N=kt()}var $n=`openweather`,er=`643a83902695d6996a8b0ea69776c634`,tr=`https://api.openweathermap.org/data/2.5/weather`,nr=`https://api.openweathermap.org/data/2.5/forecast`,rr=6,ir=108e5,ar=864e5,or=e=>Math.round(e*10)/10;function sr(e){return e>=200&&e<300?`storm`:e>=600&&e<700?`snow`:e>=700&&e<800?`fog`:e===800?`clear`:e===801||e===802?`partly`:e>802?`cloudy`:`rain`}var cr=[`clear`,`partly`,`cloudy`,`fog`,`rain`,`snow`,`storm`],lr=(e,t=A())=>!!e.forecast&&e.date<t;function ur(){return new Promise((e,t)=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(({coords:t})=>e({lat:or(t.latitude),lon:or(t.longitude)}),e=>t(Error(e.code===e.PERMISSION_DENIED?`denied`:`unavailable`)),{enableHighAccuracy:!1,maximumAge:6e5,timeout:15e3}):t(Error(`unavailable`))})}async function dr({lat:e,lon:t}){try{if(p.isNativePlatform()||(await navigator.permissions?.query({name:`geolocation`}))?.state===`granted`)return await ur()}catch{}return{lat:e,lon:t}}var fr=e=>e.reduce((e,t)=>e+t,0)/e.length,pr=e=>Math.round(e*10)/10,mr=(e,t)=>({pressure:e.main?.sea_level??e.main?.pressure??null,temp:e.main?.temp??null,humidity:e.main?.humidity??null,precipitation:(e.rain?.[t]??0)+(e.snow?.[t]??0),condition:e.weather?.[0]?.id==null?null:sr(e.weather[0].id)});function hr(e,t,n=A()){let r=t.city?.timezone??e.timezone??0,i=new Map([[n,[mr(e,`1h`)]]]);for(let e of t.list){let t=new Date((e.dt+r)*1e3).toISOString().slice(0,10);t>=n&&i.set(t,[...i.get(t)??[],mr(e,`3h`)])}let a=[];for(let[e,t]of i){let r=t.filter(e=>e.pressure!=null&&e.temp!=null&&e.condition!=null);if(!r.length||e>n&&r.length<rr)continue;let i=r.map(e=>e.temp),o=r.map(e=>e.humidity).filter(e=>e!=null);a.push({date:e,pressure:pr(fr(r.map(e=>e.pressure))),pressureChange:null,tempMin:Math.round(Math.min(...i)),tempMax:Math.round(Math.max(...i)),humidity:o.length?Math.round(fr(o)):null,precipitation:pr(r.reduce((e,t)=>e+t.precipitation,0)),condition:e===n?r[0].condition:r.map(e=>e.condition).sort((e,t)=>cr.indexOf(t)-cr.indexOf(e))[0],forecast:e>n,source:$n})}return a}async function gr(e,t){let n=await fetch(`${e}?${new URLSearchParams(t)}`);if(n.status===401)throw Error(`setup`);if(!n.ok)throw Error(`network`);return n.json()}function _r(e,t){let n=[...e].sort((e,t)=>e.date.localeCompare(t.date));return n.map((e,r)=>{let i=r?n[r-1]:null,a=i&&A(M(j(i.date),1))===e.date?i.pressure:t(e.date);return{...e,pressureChange:a==null?null:pr(e.pressure-a)}})}async function vr({lat:e,lon:t}){let n={lat:String(e),lon:String(t),units:`metric`,appid:er},[r,i]=await Promise.all([gr(tr,n),gr(nr,n)]),a=A(),o=hr(r,i,a),s=kn(a),c=o.find(e=>e.date===a);return s&&c&&(c.tempMin=Math.min(c.tempMin,s.tempMin),c.tempMax=Math.max(c.tempMax,s.tempMax)),_r(o,e=>kn(A(M(j(e),-1)))?.pressure??null)}async function yr(){let e=await ur();return{position:e,days:await vr(e)}}async function br(){let e=F().weather;if(!e.enabled||e.lat==null||e.updatedAt&&Date.now()-new Date(e.updatedAt).getTime()<ir)return!1;try{let t=await dr(e);return Mn(await vr(t),t),!0}catch{return!1}}function xr(){let{enabled:e,updatedAt:t}=F().weather;return e&&!!t&&Date.now()-new Date(t).getTime()<ar}var Sr=m(`Health`,{web:()=>k(()=>import(`./web-BFSgDTO3.js`).then(e=>new e.HealthWeb),[],import.meta.url)}),Cr=365,wr=56,Tr=[2,9,16,24,33,41,50],Er=[{key:`betahistine`,name:`Betahistín`,type:`preventive`,dose:`24 mg`,frequency:`2× denne`,since:95},{key:`magnesium`,name:`Magnézium`,type:`preventive`,dose:`300 mg`,frequency:`1× denne večer`,since:60},{key:`ibuprofen`,name:`Ibuprofén`,type:`acute`,dose:`400 mg`,frequency:`podľa potreby`},{key:`dimenhydrinate`,name:`Dimenhydrinát`,type:`acute`,dose:`50 mg`,frequency:`pri nevoľnosti`}],Dr=[`Začalo v obchode pri regáloch, pomohlo ľahnúť si do tmy.`,`Celý deň pri počítači, večer sa to rozbehlo.`,`Pred tým som zle spala.`,``,``],Or=[[`dizziness`,2,4],[`brain_fog`,2,4],[`fatigue`,3,4],[`unsteadiness`,2,4],[`tinnitus`,1,3],[`ear_pressure`,2,3],[`rocking`,2,4],[`floating`,2,3],[`headache`,2,4]],kr=[`weather_change`,`stress`,`screen_time`,`skipped_meal`,`visual_stimulation`,`dehydration`,`bright_light`,`neck_pain`,`long_sleep`],Ar=[7,9,11,13,14,15,16,16,17,17,18,18,19,20,21];function jr(e){return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Mr(e){let t=[];for(let n=20;n<Cr;){for(let e=0;e<4;e++)t.push(n-e);n+=n===20?28:27+Math.floor(e()*4)}return t}function Nr(e=new Date){let t=jr(20261019),n=(e,n)=>Math.round(e+t()*(n-e)),r=e=>t()<e,i=e=>e[Math.floor(t()*e.length)],a=0,o=e=>`demo-${e}-${++a}`,s=(t,n,r=0)=>{let i=M(e,-t);return i.setHours(n,r,0,0),i<=e?i:null},c=(e,t)=>new Date(e.getTime()+t*6e4),l=e=>({createdAt:e.toISOString(),updatedAt:e.toISOString()}),u=t=>A(M(e,-t)),d=Er.map(t=>{let n=M(e,-(t.since??90));return{id:`demo-med-${t.key}`,...l(n),name:t.name,type:t.type,dose:t.dose,frequency:t.frequency,note:``,startDate:t.since?A(n):null,endDate:null}}),f=e=>d.find(t=>t.id===`demo-med-${e}`),p=jr(20261102),m=jr(20261103),h=e=>p()<e,g=(e,t)=>Math.round(e+p()*(t-e)),_=Mr(m),v=e=>_.some(t=>Math.abs(t-e)<=1),y=new Map;for(let e=0;e<Cr;e++){if(e>3&&!h(.88))continue;let t=Tr.includes(e)?h(.6):h(e<wr?.08:.14);y.set(e,t?g(60,71)*5:g(74,100)*5)}let b=[];for(let e=364;e>=wr;e--){if(b.at(-1)===e+1)continue;let t=(y.get(e)??450)<360,n=.07;t&&(n+=.25),v(e)&&(n+=.12),e>95&&(n*=1.25),m()<n&&b.push(e)}let x=[...b,...[...Tr].reverse()],S=[],C=jr(20261026),w=e=>e[Math.floor(C()*e.length)],T=(e,t)=>[...new Set(Array.from({length:1+Math.floor(C()*t)},()=>w(e)))],E=e=>({type:w([`vestibular`,`vestibular`,`vestibular`,`migraine_no_headache`,`migraine_headache`]),helped:e,relief:T([`rest`,`sleep`,`dark_room`,`dark_room`,`hydration`,`relaxation`,`cold_compress`,`shower`],2),impact:T([`work_study`,`daily_activities`,`daily_activities`,`social`,`movement`,`sleep`,`rest`],2)}),D=[],ee=[],te=[],O=(e,t,{effect:n=null,episodeId:r=null}={})=>{t&&ee.push({id:o(`intake`),...l(t),medicationId:e.id,takenAt:t.toISOString(),dose:e.dose,effect:n,note:``,episodeId:r})},ne=(e,t,n={})=>{e&&D.push({id:o(`log`),...l(e),occurredAt:e.toISOString(),symptoms:t,vertigoType:null,duration:null,note:``,episodeId:null,...n})};for(let t of x){let a=s(t,t<wr?n(13,19):i(Ar),i([0,15,30,45]));if(!a)continue;let u=n(18,66)*5,d=c(a,u),p=n(5,8),m=new Set([i(kr)]);r(.45)&&m.add(i(kr)),(y.get(t)??450)<360&&r(.7)&&m.add(`poor_sleep`),v(t)&&m.add(`menstrual_cycle`);let h=o(`episode`),g={id:h,...l(a),startedAt:a.toISOString(),endedAt:d<=e?d.toISOString():null,type:null,intensity:p,symptoms:[],vertigoTypes:[],triggers:[...m],triggerOther:``,medicationIntakeIds:[],helped:null,relief:[],impact:[],note:``};S.push(g);let _=n(3,6),b=[{key:`vertigo`,intensity:p},{key:`nausea`,intensity:_}];r(.6)&&b.push(i([{key:`light_sensitivity`,intensity:n(3,6)},{key:`headache`,intensity:n(3,7)},{key:`sound_sensitivity`,intensity:n(2,5)}])),ne(c(a,10),b,{episodeId:h,duration:u<180?`1_3h`:u<360?`3_6h`:`6_12h`,note:i(Dr)}),r(.4)&&d<=e&&ne(c(d,-20),[{key:`fatigue`,intensity:n(4,6)},{key:`brain_fog`,intensity:n(3,5)}],{episodeId:h});let x=i([`helped`,`partly`,`helped`,`not_helped`,`partly`]);O(f(_>=4?`dimenhydrinate`:`ibuprofen`),c(a,35),{effect:x,episodeId:h}),t!==Tr[0]&&Object.assign(g,E(x))}for(let t=0;t<Cr;t++){let a=u(t),d=x.includes(t),p=y.get(t);if(p!=null){let n=p>=430?r(.85)?`good`:`fair`:p>=380?`fair`:`poor`,i=M(e,-t);i.setHours(6,30,0,0),te.push({id:o(`sleep`),...l(i<=e?i:e),date:a,minutes:p,quality:n,note:``,bedtime:null,wakeTime:null,source:`manual`,externalId:null})}if(t===0)ne(s(0,9,15)??c(e,-20),[{key:`brain_fog`,intensity:3},{key:`fatigue`,intensity:4}]);else if(!d&&r(.32)){let e=r(.35)?2:1,a=[];for(;a.length<e;){let[e,t,o]=i(Or);a.some(t=>t.key===e)||a.push({key:e,intensity:r(.8)?n(t,o):null})}ne(s(t,n(8,20),i([0,10,20,30,40,50])),a,{duration:r(.6)?i([`moment`,`under_1h`,`under_1h`,`1_3h`]):null})}t<95&&r(.65)&&O(f(`betahistine`),s(t,8,n(0,40))),t<95&&r(.35)&&O(f(`betahistine`),s(t,20,n(0,30))),t<60&&r(.4)&&O(f(`magnesium`),s(t,21,n(0,30)))}return{records:{medications:d,episodes:S,symptomLogs:D,medicationIntakes:ee,sleepLogs:te,cycleEntries:_.map(t=>({id:o(`cycle`),date:u(t),type:`period`,createdAt:M(e,-t).toISOString()}))}}}var Pr={sk:{app:{name:`Vestie`,logo:`Vestie – Vestibulárna migréna`},common:{continue:`Pokračovať`,skip:`Preskočiť`,back:`Späť`,save:`Uložiť`,cancel:`Zrušiť`,close:`Zavrieť`,yes:`Áno`,undo:`Vrátiť`,optional:`nepovinné`,on:`Zapnuté`,off:`Vypnuté`,stepOf:`Krok {step} z {total}`,edit:`Upraviť`,delete:`Vymazať`},language:{title:`Vyber si jazyk`,sk:`Slovenčina`,en:`English`},welcome:{title:`Tvoj denník príznakov`,text:`Zapisuj príznaky, epizódy, lieky a spánok. Appka ich zoradí do kalendára a prehľadov a pripraví report, ktorý môžeš ukázať lekárovi.`,cta:`Začať`},goals:{title:`S čím ti môže aplikácia pomôcť?`,lead:`Vyber, čo je pre teba dôležité. Môžeš zvoliť viac možností alebo pokračovať bez výberu.`,options:{symptoms:`Zaznamenávať príznaky`,triggers:`Zaznamenávať možné spúšťače`,patterns:`Porozumieť svojim ťažkostiam`,doctor:`Pripraviť prehľad pre lekára`}},condition:{title:`Čo chceš sledovať?`,lead:`Výber slúži len na prispôsobenie obsahu, nejde o diagnózu. Môžeš ho kedykoľvek zmeniť.`,options:{vestibular_migraine:`Vestibulárna migréna`,migraine:`Migréna`,other_vestibular:`Iné vestibulárne ochorenie`,unsure:`Nie som si istý/istá`}},cycle:{title:`Chceš sledovať menštruačný cyklus?`,lead:`Táto funkcia je voliteľná. Neskôr ju môžeš zapnúť alebo vypnúť v nastaveniach.`,yes:`Áno`,no:`Nie`},medications:{title:`Chceš pridať svoje lieky?`,lead:`Môžeš pridať lieky, ktoré užívaš preventívne alebo pri akútnych ťažkostiach. Tento krok môžeš vynechať a lieky pridať neskôr.`,add:`Pridať lieky`,addAnother:`Pridať ďalší liek`,added:`Pridané lieky`,remove:`Odstrániť liek {name}`,disclaimer:`Aplikácia neodporúča dávkovanie ani nemení tvoju liečbu.`,types:{preventive:`Preventívny`,acute:`Akútny`}},medForm:{title:`Nový liek`,name:`Názov lieku`,namePlaceholder:`napr. Betahistín`,nameRequired:`Zadaj názov lieku.`,type:`Typ lieku`,dose:`Dávka`,dosePlaceholder:`napr. 24 mg`,frequency:`Frekvencia`,frequencyPlaceholder:`napr. 2× denne`,note:`Poznámka`,submit:`Uložiť liek`,saved:`Liek {name} bol pridaný`,startDate:`Začiatok užívania`,startDateHint:`Pomôže porovnať záznamy pred liekom a po ňom.`},reminders:{title:`Chceš si nastaviť pripomienku?`,lead:`Každý deň ti v čase, ktorý si zvolíš, pripomenieme, aby si si zaznamenal/a svoje príznaky a to, ako sa cítiš.`,yes:`Áno`,no:`Nie, zatiaľ nie`,time:`Kedy ti ju máme pripomenúť?`,permission:`Telefón ťa potom požiada o povolenie posielať upozornenia. Pripomienku môžeš kedykoľvek vypnúť v profile.`},today:{greeting:`Ahoj`,greetingName:`Ahoj, {name}`,howAreYou:`Ako sa dnes cítiš?`,noEntries:`Dnes zatiaľ nemáš zaznamenané žiadne príznaky.`,loggedToday:`Dnes zaznamenané`,addSymptom:`Pridať príznak`,startEpisode:`Spustiť epizódu`,overview:`Dnes`,sleep:`Spánok`,meds:`Lieky`,nothingYet:`Zatiaľ nič`,entriesEmpty:`Zatiaľ tu nič nie je. Príznak pridáš tlačidlom vyššie, epizódu spustíš v strede spodného menu.`,symptomsToday:`Dnes zaznamenané príznaky`,intakeTitle:`Liek`,logIntake:`Zaznamenať liek`,pressure:`Tlak`,steps:`Kroky`,turnOn:`Zapnúť`,connect:`Prepojiť`,mobileOnly:`V mobilnej appke`},episode:{title:`Epizóda`,ongoing:`Prebieha epizóda`,statusOngoing:`Prebieha`,statusEnded:`Ukončená`,started:`Epizóda bola spustená`,startedAt:`Začiatok`,endedAt:`Koniec`,duration:`Trvanie`,since:`od {time}`,lasting:`trvá {duration}`,detailsLater:`Podrobnosti môžeš doplniť teraz alebo kedykoľvek neskôr. Epizóda zostane uložená, aj keď aplikáciu zavrieš.`,addDetails:`Pridať podrobnosti`,finishLater:`Dokončiť neskôr`,end:`Ukončiť epizódu`,endedToast:`Epizóda bola ukončená`,mistake:`Spustená omylom?`,cancel:`Zrušiť epizódu`,cancelledToast:`Epizóda bola zrušená`,delete:`Vymazať epizódu`,deleteTitle:`Vymazať epizódu?`,deleteText:`Záznam sa natrvalo odstráni z tohto zariadenia.`,deletedToast:`Epizóda bola vymazaná`,notFound:`Táto epizóda už neexistuje.`,linkedSymptoms:`Príznaky zaznamenané počas epizódy`,linkedIntakes:`Lieky užité počas epizódy`,editDetails:`Upraviť podrobnosti`,saveLater:`Uložiť a doplniť neskôr`,savedLater:`Epizóda je uložená. Podrobnosti doplníš kedykoľvek v jej detaile.`,details:`Podrobnosti`},duration:{underMinute:`menej ako minúta`,minutes:`{m} min`,hours:`{h} h`,hoursMinutes:`{h} h {m} min`},nav:{label:`Hlavná navigácia`,today:`Domov`,calendar:`Kalendár`,insights:`Prehľady`,treatment:`Liečba`,profile:`Profil`,startEpisode:`Spustiť epizódu`},profile:{title:`Profil`,me:`Môj profil`,name:`Meno`,namePlaceholder:`Nepovinné`,nameHint:`Použijeme ho iba na pozdrav na domovskej obrazovke.`,language:`Jazyk`,tracking:`Sledovanie`,cycle:`Menštruačný cyklus`,reminders:`Denná pripomienka`,reminderTime:`Čas pripomienky`,display:`Zobrazenie`,reduceMotion:`Obmedziť animácie`,reduceMotionHint:`Vhodné pri citlivosti na pohyb. Ak máš obmedzenie pohybu zapnuté v telefóne, animácie sú vypnuté automaticky.`,privacy:`Súkromie`,deleteAll:`Vymazať všetky dáta`,deleteAllTitle:`Vymazať všetky dáta?`,deleteAllText:`Odstránia sa všetky záznamy, lieky a nastavenia v tomto zariadení. Túto akciu nie je možné vrátiť.`,deleteAllConfirm:`Áno, vymazať`,dev:`Pre vývoj`,styleguide:`Dizajn systém`,saved:`Uložené`,disclaimer:`Aplikácia slúži na osobné zaznamenávanie a nie je zdravotníckou pomôckou. Neposkytuje diagnózu ani liečbu a nenahrádza konzultáciu s lekárom.`,integrations:`Prepojenia`,health:`Smart hodinky a zdravotné údaje`,healthHint:`Spánok a kroky z Apple Zdravia alebo Health Connect, aj z tvojich hodiniek.`,comingSoon:`Pripravujeme`,demoReset:`Obnoviť ukážkové dáta`,demoResetTitle:`Obnoviť ukážkové dáta?`,demoResetText:`Ukážkové záznamy za posledný rok sa vrátia do pôvodného stavu. Tvoje vlastné záznamy zostanú.`,demoResetConfirm:`Obnoviť`,demoResetDone:`Ukážkové dáta sú obnovené`,onboardingAgain:`Prejsť úvodom znova`,logout:`Odhlásiť sa`,logoutNoPinTitle:`Najprv si nastav PIN`,logoutNoPinText:`Bez PIN-u by sa do appky po odhlásení dostal ktokoľvek s tvojím telefónom. Po nastavení PIN-u ťa hneď odhlásime.`,logoutNoPinConfirm:`Nastaviť PIN`,appearance:`Vzhľad`,themes:{light:`Svetlý`,dark:`Tmavý`,system:`Podľa telefónu`},demoSection:`Ukážka appky`,demoFill:`Vyplnená appka`,demoFillHint:`Vypni a uvidíš prázdnu appku ako nový človek.`,demoFillOn:`Ukážkové dáta sú zapnuté`,demoFillOff:`Ukážkové dáta sú vypnuté, appka je prázdna`,weatherHint:`Tlak a počasie podľa polohy sa zapisujú každý deň.`,demoPlus:`Vestie+ zapnuté`,demoPlusHint:`Prepni a uvidíš appku s predplatným alebo bez neho.`,plusActive:`Moje Vestie+`,plusTry:`Vyskúšať Vestie+`,plusHint:`Počasie a tlak, upozornenia na počasie, hľadač súvislostí a ďalšie.`},symptoms:{dizziness:`Závrat`,vertigo:`Vertigo`,rocking:`Hojdanie / kolísanie`,floating:`Pocit vznášania`,unsteadiness:`Nestabilita / neistota pri chôdzi`,nausea:`Nevoľnosť`,vomiting:`Vracanie`,light_sensitivity:`Citlivosť na svetlo`,sound_sensitivity:`Citlivosť na zvuk`,visual_sensitivity:`Vizuálna citlivosť`,tinnitus:`Tinnitus / pískanie v ušiach`,ear_pressure:`Tlak v ušiach`,headache:`Bolesť hlavy`,brain_fog:`Mozgová hmla`,fatigue:`Únava`,unknown:`Neznámy príznak`},durations:{just_started:`Práve začali`,under_1h:`Menej ako 1 hodinu`,"1_3h":`1–3 hodiny`,"3_6h":`3–6 hodín`,"6_12h":`6–12 hodín`,over_12h:`Viac ako 12 hodín`,ongoing:`Stále pretrvávajú`,moment:`Chvíľu (sekundy až minúty)`},triggers:{poor_sleep:`Nekvalitný / krátky spánok`,stress:`Stres`,skipped_meal:`Vynechané jedlo`,dehydration:`Dehydratácia`,caffeine:`Kofeín`,alcohol:`Alkohol`,exertion:`Fyzická námaha`,illness:`Choroba / infekcia`,visual_stimulation:`Vizuálna stimulácia`,screen_time:`Dlhý čas pred obrazovkou`,weather_change:`Zmena počasia`,menstrual_cycle:`Menštruačný cyklus`,travel:`Cestovanie / pohyb`,other:`Iné`,long_sleep:`Príliš dlhý spánok`,bright_light:`Ostré svetlo / slnečné žiarenie`,strong_smells:`Silné pachy`,neck_pain:`Bolesť alebo napätie krku`,allergy:`Alergia`},effects:{helped:`Pomohlo`,partly:`Čiastočne`,not_helped:`Nepomohlo`,unknown:`Neviem`},intensity:{none:`žiadna`,mild:`mierna`,moderate:`stredná`,severe:`silná`,notSet:`Nezadané`,value:`{value} – {level}`,highest:`najvyššia intenzita {value}`},log:{symptomsTitle:`Aké príznaky zaznamenávaš?`,symptomsLead:`Vyber jeden alebo viac príznakov.`,search:`Hľadať príznak`,noMatch:`Žiadny príznak nezodpovedá hľadaniu. Môžeš pridať vlastný.`,custom:`Vlastný príznak`,customPlaceholder:`Napíš názov príznaku`,customAdd:`Pridať`,continueCount:`Pokračovať ({n})`,intensityTitle:`Aká silná je intenzita?`,intensityLead:`0 = žiadna, 10 = najhoršia. Posuvník začína na 5 – posuň ho podľa toho, ako sa cítiš. Ktorýkoľvek príznak môžeš vynechať.`,clear:`Vynechať`,detailsTitle:`Ako dlho tieto príznaky trvajú?`,detailsLead:`Všetko na tejto obrazovke je nepovinné.`,when:`Kedy začali`,date:`Dátum`,time:`Čas`,note:`Poznámka`,linkEpisode:`Priradiť k prebiehajúcej epizóde`,save:`Uložiť záznam`,saved:`Záznam bol uložený`,whenToday:`Dnes o {time}`,whenOn:`{date} o {time}`,changeTime:`Zmeniť čas`,clearLabel:`Vynechať intenzitu: {name}`,restore:`Zadať intenzitu`},symptomLog:{title:`Príznaky`,duration:`Trvanie`,note:`Poznámka`,episode:`Súčasť epizódy`,openEpisode:`Otvoriť epizódu`,edit:`Upraviť záznam`,delete:`Vymazať záznam`,deleteTitle:`Vymazať záznam?`,deleteText:`Záznam sa natrvalo odstráni z tohto zariadenia.`,deletedToast:`Záznam bol vymazaný`,notFound:`Tento záznam už neexistuje.`},treatment:{title:`Liečba`,lead:`Tvoje lieky, ich užívanie a ako ti podľa teba pomáhajú.`,preventive:`Preventívne`,acute:`Akútne`,add:`Pridať liek`,empty:`Zatiaľ nemáš pridané žiadne lieky.`,noneOfType:`Žiadne lieky v tejto skupine.`,lastTaken:`Naposledy {when}`,neverTaken:`Zatiaľ bez záznamu užitia`,disclaimer:`Aplikácia nepredpisuje lieky ani nenavrhuje zmenu dávkovania. O liečbe sa rozhoduj so svojím lekárom.`,type:`Typ`,dose:`Dávka`,frequency:`Frekvencia`,note:`Poznámka`,logIntake:`Zaznamenať užitie`,history:`História užitia`,historyEmpty:`Zatiaľ tu nie je žiadne užitie.`,taken:`Užité`,effectSummary:`Účinok podľa teba`,edit:`Upraviť liek`,delete:`Odstrániť liek`,deleteTitle:`Odstrániť liek?`,deleteText:`Odstráni sa liek aj celá história jeho užitia.`,deletedToast:`Liek bol odstránený`,notFound:`Tento liek už neexistuje.`,inEpisode:`počas epizódy`,effectMissing:`účinok nezadaný`,showAll:`Zobraziť celú históriu ({n})`,hint:`Kliknutím na liek môžeš zaznamenať jeho užitie a sledovať, ako ti pomáha.`},intake:{title:`Užitie lieku`,editTitle:`Upraviť užitie`,date:`Dátum`,time:`Čas`,dose:`Dávka`,effect:`Pomohlo to?`,effectHint:`Ak ešte nevieš, doplň to neskôr.`,note:`Poznámka`,save:`Uložiť užitie`,saved:`Užitie bolo uložené`,delete:`Vymazať užitie`,deleteTitle:`Vymazať užitie?`,deleteText:`Záznam o užití sa natrvalo odstráni.`,deletedToast:`Užitie bolo vymazané`,notFound:`Tento záznam už neexistuje.`},calendar:{title:`Kalendár`,prev:`Predchádzajúci mesiac`,next:`Nasledujúci mesiac`,backToday:`Dnes`,legend:`Vysvetlivky`,legendPeriod:`Menštruácia`,dayEmpty:`V tento deň nemáš žiadne záznamy.`,addSymptom:`Pridať príznak`,period:`Menštruácia`,periodMark:`Zaznamenať menštruáciu v tento deň`,summaryEntries:`počet záznamov {n}`,summaryPeriod:`menštruácia`,summaryNone:`bez záznamov`,selected:`vybraný deň`,today:`dnes`,legendEpisode:`Deň s epizódou`,legendSymptoms:`Zaznamenané príznaky`,summaryEpisode:`epizóda`},insights:{title:`Prehľady`,periodLabel:`Obdobie`,empty:`Prehľad sa skladá z tvojich záznamov. Keď budeš mať zapísané príznaky z viacerých dní, uvidíš tu, čo sa opakuje.`,overview:`Súhrn`,symptomDays:`Dni s príznakmi`,episodes:`Epizódy`,avgIntensity:`Priemerná intenzita`,avgDuration:`Priemerné trvanie epizódy`,noValue:`nezadané`,topSymptoms:`Najčastejšie príznaky`,topSymptomsLead:`Počet záznamov, v ktorých sa príznak objavil.`,topTriggers:`Najčastejšie možné spúšťače`,triggersEmpty:`Zatiaľ tu nie sú žiadne možné spúšťače. Pribudnú s podrobnosťami epizódy.`,meds:`Lieky`,medsEmpty:`V tomto období nie je zaznamenané žiadne užitie lieku.`,interpretation:`Zaznamenaná súvislosť nie je dôkazom príčiny. Prehľad počíta iba so zadanými údajmi.`,report:`Vytvoriť report pre lekára`},report:{title:`Report pre lekára`,lead:`Vyber obdobie. Report zhrnie tvoje záznamy do prehľadu, ktorý môžeš ukázať lekárovi.`,custom:`Vlastné obdobie`,from:`Od`,to:`Do`,create:`Vytvoriť report`,invalidRange:`Dátum „Od“ musí byť skôr alebo v ten istý deň ako „Do“.`,docTitle:`Zaznamenané príznaky a liečba`,period:`Obdobie`,created:`Vytvorené`,disclaimer:`Údaje zaznamenal používateľ v aplikácii Vestie. Nejde o diagnózu ani lekársky záznam.`,fewData:`V tomto období je zaznamenaných málo údajov, prehľad nemusí byť reprezentatívny.`,summary:`Súhrn`,symptoms:`Najčastejšie príznaky`,triggers:`Zaznamenané možné spúšťače`,meds:`Lieky a účinok podľa používateľa`,sleep:`Spánok`,sleepNone:`V tomto období nebol zaznamenaný spánok.`,cycle:`Menštruačný cyklus`,cycleDays:`Zaznamenané dni menštruácie`,notes:`Poznámky`,timeline:`Časová os`,colDate:`Dátum a čas`,colEntry:`Záznam`,colDetail:`Podrobnosti`,none:`Bez záznamov.`,print:`Uložiť ako PDF`,printHint:`V okne tlače zvoľ „Uložiť ako PDF“.`,sleepQuality:`Kvalita spánku`,plusHint:`S Vestie+ pribudne v reporte tlak pri epizódach, možné súvislosti a aktivita.`,weather:`Počasie a tlak pri epizódach`,weatherSummary:`Epizódy v dňoch s poklesom tlaku o 6 hPa a viac: {drops} z {total}.`,patterns:`Možné súvislosti podľa záznamov`,patternsOther:`inak {a} z {b}`,patternsNote:`Počet ťažších dní po dni s daným faktorom. Ide o možné súvislosti zo záznamov používateľa za posledný rok, nie o dôkaz príčiny.`,activity:`Aktivita`,avgSteps:`Priemerný počet krokov za deň`},sleep:{title:`Spánok`,formTitle:`Ako sa ti spalo?`,lead:`Zaznamenaj dĺžku spánku. Kvalitu a poznámku môžeš vynechať.`,date:`Deň prebudenia`,duration:`Dĺžka spánku`,hours:`Hodiny`,minutes:`Minúty`,durationRequired:`Zadaj dĺžku spánku.`,quality:`Kvalita spánku`,qualities:{good:`Dobrá`,fair:`Priemerná`,poor:`Zlá`},note:`Poznámka`,save:`Uložiť spánok`,saved:`Spánok bol uložený`,add:`Zaznamenať spánok`,entry:`Spánok {duration}`,delete:`Vymazať záznam spánku`,deleteTitle:`Vymazať záznam spánku?`,deleteText:`Záznam sa natrvalo odstráni z tohto zariadenia.`,deletedToast:`Záznam spánku bol vymazaný`,avg:`Priemerný spánok`,nights:`Zaznamenané noci`},consent:{title:`Tvoje údaje zostávajú v tvojom telefóne`,lead:`Skôr než začneš, pozri sa, ako s tvojimi údajmi zaobchádzame.`,updatedLead:`Zásady ochrany súkromia sa zmenili. Prečítaj si ich a potvrď súhlas znova, potom môžeš appku používať ďalej.`,factDevice:`Záznamy o zdraví sa ukladajú iba v tomto telefóne.`,factNoServer:`Appka nemá účet na internete, záznamy o zdraví nikam neodosiela a nepoužíva reklamy ani analytické nástroje.`,factPin:`Prihlasovať sa budeš PIN kódom a tvoje údaje budú zašifrované.`,factControl:`Údaje môžeš kedykoľvek exportovať do súboru alebo natrvalo vymazať.`,health:`Súhlasím so spracovaním mojich údajov o zdraví v tomto telefóne na účely osobného sledovania.`,age:`Mám aspoň 16 rokov.`,policyLink:`Prečítať zásady ochrany súkromia`,submit:`Súhlasím a pokračujem`},privacyPolicy:{title:`Zásady ochrany súkromia`,draft:`Návrh`,version:`Verzia {version}`,draftNote:`Pracovný návrh na pripomienkovanie. Pred vydaním ho skontroluje právnik.`,controllerTitle:`Kto je prevádzkovateľ`,controllerText:`Prevádzkovateľom je IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, IČO 47321547. Kontakt pre otázky o osobných údajoch: support@vestibularnamigrena.sk.`,dataTitle:`Aké údaje appka spracúva`,dataText:`Iba to, čo do nej zadáš: príznaky a ich intenzitu, epizódy, lieky a ich účinok, spánok, voliteľne menštruačný cyklus a meno na pozdrav. S Vestie+ aj počasie a tlak podľa približnej polohy a údaje zo zdravotných appiek, ak si to zapneš. Ide o údaje o zdraví, preto ich chránime osobitne.`,storageTitle:`Kde sú tvoje údaje`,storageText:`Iba v tomto telefóne. Appka nemá server ani účet na internete, záznamy o zdraví nikam neodosiela a nepoužíva reklamné ani analytické nástroje. Prevádzkovateľ k tvojim údajom nemá prístup.`,purposeTitle:`Na čo slúžia`,purposeText:`Na tvoje osobné sledovanie ťažkostí a na prehľad alebo report, ktorý môžeš ukázať lekárovi. Report sa vytvorí v telefóne a ty rozhodneš, komu ho dáš. Appka v telefóne ukazuje možné súvislosti v tvojich záznamoch, ale nerobí o tebe žiadne automatizované rozhodnutia s právnymi ani podobne závažnými účinkami.`,legalTitle:`Na akom základe`,legalText:`Údaje o zdraví spracúvame na základe tvojho výslovného súhlasu (čl. 9 ods. 2 písm. a) GDPR). Súhlas môžeš kedykoľvek odvolať v Profile, údaje sa tým vymažú. Polohu na počasie appka posiela na základe tvojho súhlasu, ktorý dáš zapnutím funkcie a odvoláš jej vypnutím (čl. 6 ods. 1 písm. a) GDPR). Na e-maily odpovedáme na základe oprávneného záujmu (čl. 6 ods. 1 písm. f) GDPR).`,rightsTitle:`Tvoje práva`,rightsText:`Máš právo na prístup k údajom, ich opravu a vymazanie, obmedzenie spracúvania, prenosnosť, právo namietať a právo kedykoľvek odvolať súhlas. Údaje sú iba v tvojom telefóne a my k nim nemáme prístup, preto väčšinu práv uplatníš priamo v appke: údaje si pozrieš, upravíš, exportuješ do súboru alebo natrvalo vymažeš (Profil → Súkromie). S ostatným ti pomôžeme na support@vestibularnamigrena.sk. Máš aj právo podať sťažnosť na Úrad na ochranu osobných údajov SR, Hraničná 12, 820 07 Bratislava 27, dataprotection.gov.sk.`,securityTitle:`Zabezpečenie`,securityText:`Do appky sa prihlasuješ 6-miestnym PIN-om. Kým je PIN zapnutý, tvoje údaje v telefóne sú zašifrované (AES-256) a bez PIN-u sú nečitateľné. Ak PIN zabudneš, údaje nie je možné obnoviť.`,backupTitle:`Zálohovanie`,backupText:`Údaje sú iba v telefóne a appka nemá server. V Androide sa nezálohujú na Google Disk. Na iPhone sú súčasťou zálohy celého telefónu v iCloude alebo v počítači, ak ju máš zapnutú. V Profile si môžeš vytvoriť zálohu chránenú heslom a uložiť ju, kam chceš. Heslo k zálohe nepoznáme, preto ho nevieme ani obnoviť. Pri nastavovaní nového telefónu môže Android preniesť údaje appky priamo zo starého telefónu (káblom alebo cez Wi-Fi). Ak máš zapnutý PIN, údaje sú v zálohe telefónu aj pri prenose zašifrované. Bez zálohy alebo prenosu sa pri strate či výmene telefónu údaje stratia.`,ageTitle:`Vek`,ageText:`Appka je určená pre ľudí od 16 rokov.`,changesTitle:`Zmeny zásad`,changesText:`O zmenách týchto zásad ťa upozorníme priamo v appke.`,weatherTitle:`Počasie a tlak (Vestie+)`,weatherText:`Ak si túto funkciu zapneš, appka pri každom otvorení pošle poskytovateľovi počasia polohu zaokrúhlenú na približne 10 km, aby získala skutočné počasie a tlak. Poskytovateľom je OpenWeather Ltd., 30 St Mary Axe, Londýn, Spojené kráľovstvo. Pre Spojené kráľovstvo má EÚ rozhodnutie o primeranej ochrane osobných údajov. Poskytovateľ pritom technicky vidí aj tvoju IP adresu, ako pri každej požiadavke na internet. Podľa svojich zásad IP adresu ani polohu z týchto požiadaviek neukladá. Nič o tvojom zdraví sa neodosiela. Funkciu môžeš kedykoľvek vypnúť.`,healthTitle:`Prepojenie so zdravím (Vestie+)`,healthText:`Ak prepojíš Apple Zdravie alebo Health Connect, appka z nich iba číta vybrané údaje (spánok, kroky) do tohto telefónu. Nič do nich nezapisuje, nikam ich neodosiela a prepojenie môžeš kedykoľvek zrušiť.`,purchasesTitle:`Predplatné`,purchasesText:`Platbu za Vestie+ vybavuje Google alebo Apple ako samostatný prevádzkovateľ podľa svojich podmienok a zásad. Appka sa od nich dozvie iba to, či je predplatné aktívne. Tvoje platobné údaje nevidíme.`,linksTitle:`Odkazy na web a komunitu`,linksText:`Appka obsahuje odkazy na web vestibularnamigrena.sk a na komunitu na Facebooku, Instagrame a Discorde. Nič im neodosiela. Keď odkaz otvoríš, opustíš appku a platia pravidlá a zásady danej služby.`,retentionTitle:`Ako dlho`,retentionText:`Záznamy sú v telefóne, kým ich nevymažeš, neodvoláš súhlas alebo neodinštaluješ appku. Zálohu máš u seba ty a sám/sama rozhoduješ, kedy ju zmažeš.`,contactTitle:`Keď nám napíšeš`,contactText:`Ak napíšeš na support@vestibularnamigrena.sk, spracúvame tvoju e-mailovú adresu a obsah správy iba na to, aby sme ti odpovedali. Správu uchováme, kým je to na vybavenie potrebné, potom ju vymažeme. Do správy prosím nepíš viac údajov o zdraví, než treba.`},profileSetup:{title:`Vytvor si profil`,lead:`Profil existuje iba v tomto telefóne – bez e-mailu a hesla na internete. Prihlasovať sa budeš PIN kódom.`,pinTitle:`Prihlasovací PIN`,pinText:`V ďalšom kroku si nastavíš 6-miestny PIN. Budeš sa ním prihlasovať a zároveň zašifruje tvoje údaje v telefóne.`,nameLabel:`Ako ťa máme oslovovať?`,namePlaceholder:`Tvoje meno`,nameHint:`Nepovinné. Uvidíš ho v pozdrave na domovskej obrazovke.`,pinAlready:`PIN už máš nastavený. Zmeniť ho môžeš v Profile → Zabezpečenie.`},pin:{progress:`Zadané {n} z {total} číslic`,keypad:`Klávesnica na PIN`,delete:`Zmazať číslicu`,prompt:{current:`Zadaj svoj súčasný PIN`,new:`Zvoľ si 6-miestny PIN`,confirm:`Zopakuj PIN pre kontrolu`},title:{set:`Nastav si prihlasovací PIN`,change:`Zmena PIN-u`,disable:`Vypnutie PIN-u`},setLead:`Budeš sa ním prihlasovať a zároveň zašifruje tvoje údaje v telefóne. Ak ho zabudneš, údaje nie je možné obnoviť – nikto iný k nim nemá prístup.`,checking:`Overujem…`,wrong:`Nesprávny PIN. Skús to znova.`,blocked:`Príliš veľa nesprávnych pokusov. Skús to znova o {time}.`,weak:`Tento PIN sa dá ľahko uhádnuť. Zvoľ iný.`,mismatch:`PIN-y sa nezhodujú. Zvoľ si PIN znova.`,saving:`Šifrujem údaje…`,enabled:`PIN je nastavený, údaje sú zašifrované`,changed:`PIN bol zmenený`,disabled:`PIN je vypnutý`,blockedSeconds:`Príliš veľa nesprávnych pokusov. Skús to znova o {n} s.`},lock:{title:`Prihlás sa`,lead:`Zadaj svoj PIN`,forgot:`Zabudnutý PIN?`,forgotTitle:`Zabudnutý PIN`,forgotText:`PIN nie je možné obnoviť – tvoje údaje sú zašifrované iba v tomto telefóne a nikto iný k nim nemá kľúč. Môžeš ich iba vymazať a začať odznova.`,forgotConfirm:`Vymazať všetko a začať odznova`},security:{title:`Zabezpečenie`,pin:`Prihlasovanie PIN-om`,pinOnHint:`Údaje sú v telefóne zašifrované. Bez PIN-u sa k nim nedá dostať.`,pinOffHint:`Bez PIN-u sa do appky dostane ktokoľvek s tvojím telefónom a údaje nie sú zašifrované.`,changePin:`Zmeniť PIN`,autoLock:`Automaticky odhlásiť`,autoLockOptions:{m0:`Hneď po odchode z appky`,m1:`Po 1 minúte`,m5:`Po 5 minútach`,m15:`Po 15 minútach`},biometrics:`Odomykanie tvárou alebo odtlačkom`,biometricsHint:`Dostupné v mobilnej aplikácii.`},privacy:{deviceOnly:`Záznamy sú iba v tomto telefóne`,deviceOnlyHint:`Appka záznamy o zdraví nikam neodosiela a nemá k nim prístup nikto iný.`,export:`Exportovať moje údaje`,exportHint:`Čitateľný súbor JSON so všetkými záznamami, napríklad na prenos inam. Nie je zašifrovaný.`,exportDone:`Súbor s údajmi je pripravený`,consent:`Súhlas so spracovaním údajov`,consentGiven:`Udelený {date}`,withdraw:`Odvolať súhlas`,withdrawTitle:`Odvolať súhlas?`,withdrawText:`Bez súhlasu appka nemôže uchovávať tvoje údaje o zdraví. Odvolaním sa natrvalo vymažú všetky údaje v tomto telefóne.`,withdrawConfirm:`Odvolať a vymazať údaje`,backupFirst:`Najprv urobiť zálohu`,plusNotCancelled:`Predplatné Vestie+ sa tým nezruší. Ak ho už nechceš, zruš ho v {store}, inak sa bude ďalej obnovovať.`,exportFailed:`Súbor sa nepodarilo vytvoriť. Skús to znova.`,importTitle:`Obnoviť údaje zo súboru?`,importText:`Všetky záznamy v tomto telefóne sa nahradia záznamami zo súboru. Predplatné a PIN sa nezmenia.`,importConfirm:`Obnoviť`,importDone:`Údaje sú obnovené`},backup:{title:`Záloha údajov`,profileHint:`Súbor chránený heslom. Z neho obnovíš záznamy, napríklad v novom telefóne.`,lead:`Appka nemá server, tvoje záznamy sú iba v tomto telefóne. Zálohu si ulož mimo neho, napríklad na Google Disk alebo do počítača. Keď telefón vymeníš alebo stratíš, obnovíš z nej všetky záznamy.`,lastAt:`Posledná záloha: {date}`,never:`Zatiaľ si zálohu nevytvoril/a.`,createTitle:`Vytvoriť zálohu`,password:`Heslo k zálohe`,passwordHint:`Aspoň {n} znakov. Nepoužívaj svoj PIN.`,passwordRepeat:`Zopakuj heslo`,passwordWarning:`Heslo si zapamätaj alebo zapíš na bezpečné miesto. Bez neho sa záloha nedá otvoriť ani obnoviť a nikto ti ho nevie zistiť.`,create:`Vytvoriť zálohu`,creating:`Vytváram zálohu…`,created:`Záloha je hotová. Ulož si ju mimo telefónu.`,failed:`Zálohu sa nepodarilo vytvoriť. Skús to znova.`,fileName:`zaloha`,restoreTitle:`Obnoviť zo zálohy`,restore:`Vybrať súbor so zálohou`,restoreHint:`Napríklad v novom telefóne. Záznamy v tomto telefóne sa nahradia záznamami zo zálohy.`,restoreLead:`Záloha je zašifrovaná. Zadaj heslo, ktoré si k nej zvolil/a.`,restoreLeadDate:`Záloha z {date} je zašifrovaná. Zadaj heslo, ktoré si k nej zvolil/a.`,restoreSubmit:`Obnoviť`,reminderTitle:`Pripomienka`,reminder:`Pripomínať zálohu`,reminderHint:`Raz za mesiac sa na obrazovke Dnes ukáže krátka pripomienka.`,privacy:`Záloha nikam neodchádza sama. Kam ju uložíš, rozhoduješ ty, a bez hesla je jej obsah nečitateľný.`,errors:{tooShort:`Heslo musí mať aspoň {n} znakov.`,mismatch:`Heslá sa nezhodujú.`,passwordRequired:`Zadaj heslo k zálohe.`,wrongPassword:`Nesprávne heslo alebo poškodený súbor.`,invalidFile:`Tento súbor sa nedá načítať. Vyber zálohu alebo export z appky.`},card:{title:`Zálohuj si svoje záznamy`,textNever:`Záznamy sú iba v tomto telefóne. Ak ho stratíš alebo vymeníš, bez zálohy o ne prídeš.`,textOld:`Posledná záloha je z {date}. Vytvor si novú, nech máš v bezpečí aj novšie záznamy.`,action:`Vytvoriť zálohu`,later:`Teraz nie`}},plural:{entries:{one:`{n} záznam`,few:`{n} záznamy`,other:`{n} záznamov`},times:{other:`{n}×`},days:{one:`{n} deň`,few:`{n} dni`,other:`{n} dní`},episodes:{one:`{n} epizóda`,few:`{n} epizódy`,other:`{n} epizód`},hardDays:{one:`{n} ťažší deň`,few:`{n} ťažšie dni`,other:`{n} ťažších dní`}},community:{title:`Komunita a podpora`,lead:`Nemusíš na to byť osamote. V našej komunite zdieľame vlastné skúsenosti, podržíme sa a odporúčame si špecialistov.`,facebook:`Facebook skupina`,facebookHint:`Skúsenosti, otázky a vzájomná podpora`,instagram:`Instagram`,instagramHint:`@vestibularnamigrena`,discord:`Discord`,discordHint:`Rozhovory s komunitou v reálnom čase`,webTitle:`Články na našom webe`,webText:`O diagnóze, liečbe a živote s vestibulárnou migrénou.`,webUrl:`www.vestibularnamigrena.sk`,external:`(otvorí sa mimo aplikácie)`,note:`Skúsenosti a odporúčania z komunity nenahrádzajú vyšetrenie a radu lekára.`,soon:`Čoskoro`},episodeTypes:{vestibular:`Vestibulárna epizóda`,migraine_headache:`Migréna s bolesťou hlavy`,migraine_no_headache:`Migréna bez bolesti hlavy`,other:`Iné`,unsure:`Neviem`},relief:{rest:`Oddych`,sleep:`Spánok`,dark_room:`Oddych v tmavej miestnosti`,hydration:`Pitie vody`,relaxation:`Relaxácia alebo meditácia`,cold_compress:`Studený obklad`,warm_compress:`Teplý obklad`,shower:`Sprcha`,food:`Jedlo`,other:`Iné`},impact:{work_study:`Práca alebo štúdium`,sleep:`Spánok`,daily_activities:`Bežné denné činnosti`,social:`Kontakt s rodinou a priateľmi`,movement:`Pohyb a fyzické aktivity`,rest:`Oddych a relaxácia`,other:`Iné`,none:`Epizóda ma výrazne neobmedzila`},episodeFlow:{typeTitle:`Aká to bola epizóda?`,typeLead:`Všetko v podrobnostiach je nepovinné. Čo nevieš, preskoč a doplň neskôr.`,intensity:`Celková intenzita`,symptomsTitle:`Aké príznaky sa objavili?`,symptomsLead:`Vyber jeden alebo viac. Silu každého zadáš v ďalšom kroku.`,date:`Dátum`,time:`Čas`,triggersTitle:`Čo ju mohlo spustiť?`,triggersLead:`Vyber všetko, čo sa ťa týka. Ide o možné súvislosti, nie potvrdené príčiny. Môžeš vybrať viac možností.`,triggerOther:`Iný spúšťač`,triggerOtherPlaceholder:`Napíš, čo to bolo`,medsTitle:`Užil/a si počas epizódy liek?`,medsLead:`Označ lieky a kedy si ich užil/a. Užitie sa uloží aj do Liečby.`,medsLogged:`Už zaznamenané počas epizódy`,medsNone:`Zatiaľ nemáš pridané žiadne lieky.`,addMed:`Pridať liek`,medsWhen:`Kedy si ich užil/a`,medsOutside:`Čas musí byť počas epizódy.`,helped:`Pomohlo to?`,reliefTitle:`Čo ti prinieslo úľavu?`,summaryTitle:`Zhrnutie epizódy`,summaryLead:`Skontroluj, čo si vyplnil/a. Každú časť môžeš upraviť.`,summaryMissing:`Ešte môžeš doplniť`,save:`Uložiť epizódu`,saved:`Epizóda bola uložená`,edit:`Upraviť`,sections:{type:`Typ`,intensity:`Intenzita`,time:`Čas`,symptoms:`Príznaky`,triggers:`Možné spúšťače`,meds:`Lieky`,helped:`Pomohlo to?`,relief:`Úľava`,impact:`Obmedzenia`},reliefLead:`Môžeš vybrať viac možností.`,reliefOther:`Čo ešte ti pomohlo?`,reliefOtherPlaceholder:`Napíš, čo to bolo`,impactTitle:`Ako ťa epizóda obmedzila?`,impactLead:`V ktorých oblastiach každodenného života si pocítil/a jej vplyv?`,impactOther:`Čo ešte epizóda ovplyvnila?`,impactOtherPlaceholder:`Napíš, čo to bolo`},symptomInfo:{open:`Čo znamená {name}?`,close:`Rozumiem`,dizziness:`Pocit omámenia, neistoty alebo straty rovnováhy. Môžeš mať pocit, že sa ti zatočila hlava, cítiš sa na odpadnutie alebo nemáš istotu pri státí či chôdzi.`,vertigo:`Falošný pocit pohybu, hoci sa v skutočnosti nehýbeš. Môžeš mať pocit, že sa točíš ty, že sa otáča miestnosť alebo že sa okolité prostredie pohybuje.`,brain_fog:`Stav, pri ktorom máš problém sústrediť sa, jasne premýšľať alebo spracovávať informácie. Môžeš mať pocit, že ti to myslí pomalšie, ťažšie hľadáš slová alebo sa horšie orientuješ v myšlienkach.`,visual_sensitivity:`Zvýšená citlivosť na vizuálne podnety. Pohybujúce sa obrazy, rušné prostredie, vzory, davy ľudí alebo obrazovky môžu vyvolávať závrat, nevoľnosť alebo dezorientáciu.`,tinnitus:`Vnímanie zvuku v jednom alebo oboch ušiach, hoci v okolí nie je žiadny skutočný zdroj zvuku. Môže ísť o pískanie, hučanie, bzučanie alebo šumenie.`,rocking:`Pocit, akoby sa tvoje telo alebo okolie jemne hojdalo, kolísalo zo strany na stranu alebo pohybovalo dopredu a dozadu, podobne ako na lodi.`,floating:`Pocit, akoby si sa nadnášal/a, nemal/a pevný kontakt so zemou.`,unsteadiness:`Pocit neistoty pri státí alebo chôdzi, akoby si strácal/a rovnováhu, vychyľoval/a sa do strán alebo potreboval/a oporu pri pohybe.`},quickIntake:{title:`Ktorý liek si užil/a?`,lead:`Vyber liek. V ďalšom kroku zadáš čas a či ti pomohol.`,add:`Pridať nový liek`,empty:`Zatiaľ nemáš pridané žiadne lieky. Pridaj liek a potom zaznamenáš jeho užitie.`},plus:JSON.parse(`{"name":"Vestie+","lockedLabel":"Súčasť Vestie+","tryChip":"Vyskúšať","demoChip":"Ukážka","features":{"weather":{"title":"Počasie a tlak","text":"Každý deň sa zapíše počasie a barometrický tlak podľa tvojej polohy."},"forecast":{"title":"Upozornenia na počasie","text":"Večer ti dá vedieť, keď na ďalší deň hlásia prudkú zmenu tlaku, teploty alebo vlhkosti."},"finder":{"title":"Hľadač súvislostí","text":"Porovná dni s ťažkosťami a bez nich a ukáže možné súvislosti."},"stats":{"title":"Pokročilé štatistiky","text":"Trendy za celý rok, kedy epizódy začínajú, čo pomáha a záznamy pred liekom a po ňom."},"health":{"title":"Prepojenie so zdravím","text":"Spánok a kroky z Apple Zdravia alebo Health Connect, aj z tvojich hodiniek."},"report":{"title":"Bohatší report pre lekára","text":"Pribudne tlak pri epizódach, možné súvislosti a aktivita."}},"periods":{"d90":"90 dní","d180":"6 mesiacov","d365":"12 mesiacov"},"plans":{"yearly":{"name":"Ročne","hint":"{monthly} mesačne, prvých 7 dní zadarmo","hintNoTrial":"{monthly} mesačne","badge":"Ušetríš {percent} %","cta":"Vyskúšať 7 dní zadarmo","ctaNoTrial":"Predplatiť za {price} ročne","terms":"7 dní zadarmo, potom {price} ročne. Predplatné sa obnovuje automaticky. Ak ho v {store} zrušíš pred koncom skúšky, nič nezaplatíš.","termsNoTrial":"{price} ročne. Predplatné sa obnovuje automaticky, kým ho v {store} nezrušíš."},"monthly":{"name":"Mesačne","hint":"Zrušíš kedykoľvek","cta":"Predplatiť za {price} mesačne","terms":"{price} mesačne. Predplatné sa obnovuje automaticky, kým ho v {store} nezrušíš."}},"paywall":{"title":"Viac porozumenia z tvojich záznamov","lead":"Vestie+ pridáva počasie a tlak, upozornenia na zmeny počasia a hlbšie súvislosti v tvojich záznamoch. Základný denník ostáva zadarmo.","choosePlan":"Vyber si predplatné","renewal":"Platbu vybaví {store}. Predplatné zrušíš kedykoľvek v nastaveniach {store} a Vestie+ ti ostane do konca zaplateného obdobia.","loadingPrices":"Načítavam ceny…","pricesFailed":"Ceny sa nepodarilo načítať. Skontroluj pripojenie na internet a skús to znova.","retryPrices":"Skúsiť znova","restored":"Predplatné už máš, Vestie+ je znova zapnuté.","freeTitle":"Zadarmo ostáva všetko, čo máš teraz","freeText":"Záznamy príznakov a epizód, kalendár, prehľady, lieky, spánok aj report pre lekára. Keď predplatné skončí, tvoje záznamy ostanú tvoje.","demoNote":"V tomto náhľade sa nič neplatí.","restore":"Obnoviť nákup","terms":"Podmienky používania","termsText":"Podmienky používania doplníme pred vydaním appky po kontrole právnikom.","disclaimer":"Vestie+ nie je zdravotnícka pomôcka. Neposkytuje diagnózu ani liečbu a nenahrádza konzultáciu s lekárom.","notNow":"Teraz nie","nativeOnly":"Nákup bude dostupný v mobilnej appke.","nothingToRestore":"Nenašli sme žiadny nákup na obnovenie.","purchaseFailed":"Nákup sa nepodaril. Skús to znova neskôr.","purchasePending":"Platba sa ešte spracúva. Vestie+ sa zapne, keď ju obchod potvrdí."},"manage":{"title":"Tvoje Vestie+","lead":"Všetko na jednom mieste. Každú funkciu môžeš kedykoľvek zapnúť alebo vypnúť.","welcomeTitle":"Vitaj vo Vestie+","welcomeLead":"Počasie a tlak si zapni ako prvé. Ostatné funkcie nájdeš v zozname.","features":"Funkcie","subscription":"Predplatné","trialUntil":"Skúšobná doba do {date}","since":"Aktívne od {date}","cancel":"Zrušiť predplatné","cancelHint":"Tvoje záznamy ostanú v telefóne.","cancelTitle":"Zrušiť Vestie+?","cancelText":"Funkcie Vestie+ sa uzamknú. Všetky záznamy vrátane zapísaného počasia a tlaku ti ostanú.","cancelConfirm":"Zrušiť predplatné","cancelled":"Vestie+ je zrušené","toToday":"Pokračovať na Domov","enableWeather":"Zapnúť počasie a tlak","manageStore":"Spravovať v Google Play","manageStoreHint":"Tu predplatné zmeníš alebo zrušíš. Tvoje záznamy ostanú v telefóne."},"charts":{"legend":"Vysvetlivky grafu","showTable":"Zobraziť ako tabuľku"},"weather":{"hpa":"{value} hPa","temps":"{min} až {max} °C","changeShort":"{value} oproti predošlému dňu","conditions":{"clear":"Jasno","partly":"Polojasno","cloudy":"Oblačno","fog":"Hmla","rain":"Dážď","snow":"Sneh","storm":"Búrka"},"offLead":"Počasie a tlak môžu súvisieť s vestibulárnou migrénou. Appka si ich bude každý deň zapisovať k tvojim záznamom, aby si videl/a, či sa u teba niečo opakuje.","factRecord":"Od zapnutia sa zapisuje tlak, teplota, vlhkosť a počasie každého dňa. Zapísané dni ostávajú v telefóne. Dni pred zapnutím sa nedopĺňajú.","factLocation":"Poskytovateľovi počasia sa pri každej aktualizácii odošle iba poloha zaokrúhlená na približne 10 km.","factHealth":"Nikdy sa neodosiela nič o tvojom zdraví.","factOff":"Kedykoľvek to môžeš vypnúť.","enable":"Povoliť polohu a zapnúť","today":"Dnes","condition":"Počasie","temperature":"Teplota","humidity":"Vlhkosť","humidityValue":"Vlhkosť {value} %","forecastWord":"predpoveď","estimateWord":"odhad","episodeWord":"epizóda","chartTitle":"Tlak v čase","rangeDays":"{n} dní","chartLabel":"Graf barometrického tlaku za posledných {n} dní a predpoveď na najbližšie dni. Bodky označujú dni s epizódou.","legendPressure":"Tlak","legendForecast":"Predpoveď","legendEpisode":"Deň s epizódou","colDay":"Deň","colPressure":"Tlak","colChange":"Zmena","colEpisode":"Epizóda","forecastTitle":"Predpoveď na najbližšie dni","linkTitle":"Tlak a tvoje záznamy","openFinder":"Otvoriť hľadač súvislostí","myLocation":"Podľa tvojej polohy","noData":"Pre dnešok zatiaľ nie sú údaje o počasí.","settings":"Nastavenia","updateLocation":"Aktualizovať teraz","turnOff":"Vypnúť počasie a tlak","turnOffHint":"Zapísané dni ostanú.","turnOffTitle":"Vypnúť počasie a tlak?","turnOffText":"Appka prestane zisťovať počasie a zabudne tvoju polohu. Dni, ktoré sa už zapísali, ostanú.","attribution":"Údaje o počasí poskytuje OpenWeather","disclaimer":"Údaje sú z meteorologických modelov pre tvoju približnú polohu a predpoveď sa môže líšiť od skutočnosti. Dni, keď si appku neotvoril/a, sú odhad z poslednej predpovede. Súvislosť s počasím nie je dôkazom príčiny.","loading":"Zisťujem počasie…","enabled":"Počasie a tlak sú zapnuté","errors":{"denied":"Bez povolenia polohy to nepôjde. Povoľ ju v nastaveniach telefónu alebo prehliadača.","unavailable":"Polohu sa nepodarilo zistiť. Skús to znova.","network":"Počasie sa nepodarilo načítať. Skontroluj pripojenie na internet.","setup":"Počasie v tejto verzii zatiaľ nie je nastavené. Skús to neskôr."},"episodeDay":"Počasie a aktivita v ten deň","updated":"Aktualizované {time}. Údaje sa obnovujú samy.","stale":"Bez pripojenia. Posledné údaje sú z {time}.","bands":{"low":"Nízky tlak","normal":"Bežný tlak","high":"Vyšší tlak","veryHigh":"Veľmi vysoký tlak"},"bandRanges":{"low":"menej ako 1000 hPa","normal":"1000 až 1020 hPa","high":"1021 až 1029 hPa","veryHigh":"1030 hPa a viac"},"bandTitle":"Čo znamenajú hodnoty tlaku","bandNow":"teraz","bandNote":"Hodnoty sú orientačné. Tlak je prepočítaný na hladinu mora rovnako ako v predpovediach počasia, preto sa dá porovnať aj vo vyššej nadmorskej výške. Okrem samotnej hodnoty appka ukazuje aj zmenu oproti predošlému dňu a hľadač súvislostí porovnáva dni, keď sa tlak zmenil o 6 hPa a viac."},"health":{"connected":"Prepojené","notConnected":"Neprepojené","stepsValue":"{value} krokov","lead":"Spánok a kroky sa môžu načítavať priamo z telefónu. Zapisujú tam aj hodinky ako Apple Watch, Garmin, Samsung či Fitbit.","providers":{"apple_health":"Apple Zdravie","health_connect":"Health Connect"},"typesTitle":"Čo načítavať","types":{"sleep":"Spánok","steps":"Kroky"},"privacy":"Údaje sa iba načítajú do tohto telefónu a nikam sa neodosielajú. Ručne zapísaný spánok sa neprepíše.","lastSync":"Naposledy načítané {time}","stepsToday":"Kroky dnes","sleepToday":"Spánok dnes v noci","stepsWeek":"Kroky za posledných 7 dní","sleepWeek":"Spánok za posledných 7 nocí (hodiny)","noValue":"bez záznamu","disconnect":"Odpojiť","disconnectTitle":"Odpojiť zdravotnú appku?","disconnectText":"Appka prestane načítavať nové údaje. To, čo sa už načítalo, ostane v tvojich záznamoch.","revokeHint":{"health_connect":"Povolenie na čítanie údajov zrušíš v nastaveniach Health Connect.","apple_health":"Povolenie na čítanie údajov zrušíš v appke Zdravie v časti Zdieľanie."},"disconnectedToast":"Odpojené","openSettings":"Nastavenia","connectedToast":"Prepojené","connectTo":{"apple_health":"Prepojiť s Apple Zdravím","health_connect":"Prepojiť s Health Connect"},"browserOnly":"Webový prehliadač k týmto údajom nemá prístup. Prepojenie funguje iba v mobilnej appke, kde sa údaje po povolení načítavajú samy. V tomto náhľade preto nič neukazujeme, aby tu neboli vymyslené čísla.","errors":{"denied":"Bez povolenia sa údaje načítať nedajú. Povoľ ich v nastaveniach telefónu.","unavailable":"Zdravotná appka nie je v tomto telefóne dostupná. Na Androide si nainštaluj Health Connect."}},"finder":{"ofDays":"{a} z {b}","percent":"{n} %","factors":{"pressure_drop":"Deň s poklesom tlaku o 6 hPa a viac","pressure_rise":"Deň s nárastom tlaku o 6 hPa a viac","humid":"Deň s vysokou vlhkosťou (85 % a viac)","temp_swing":"Deň so zmenou teploty o 8 °C a viac","short_sleep":"Noc kratšia ako 6 hodín","poor_sleep":"Noc so zlou kvalitou spánku","high_steps":"Deň s 12 000 krokmi a viac","low_steps":"Deň s menej ako 3 000 krokmi","period":"Obdobie okolo menštruácie"},"strength":{"strong":"Výraznejší rozdiel","possible":"Možná súvislosť","none":"Bez výrazného rozdielu","few":"Málo údajov"},"fewFactor":"Zatiaľ to nastalo {n}-krát, na porovnanie je to málo.","after":"Ťažší deň potom","otherDays":"V ostatných dňoch","lead":"Porovnávame, ako často prišiel ťažší deň po dni s daným faktorom a bez neho. Ťažší deň je deň s epizódou alebo príznakom s intenzitou aspoň {intensity}.","summary":"V tomto období je to {hard} z celkom {days}.","notEnough":"Zatiaľ máš zaznamenané {days} a {hard}. Na porovnanie treba aspoň 30 dní a 5 ťažších dní.","moreTitle":"Čo ešte porovnať","more":{"weather":"Zapni ich a porovnáme aj tlak, vlhkosť a teplotu.","health":"Prepoj ho a porovnáme aj kroky."},"loggedTitle":"Čo si sám/sama označil/a pri epizódach","loggedLead":"Tieto spúšťače zapisuješ iba pri epizódach, preto sa nedajú porovnať s dňami bez ťažkostí. Ukazujeme iba ich počet.","howTitle":"Ako to počítame","howText":"Ťažší deň hľadáme v ten istý deň a na druhý deň (pri krokoch iba na druhý deň). Deň bez záznamu sa počíta ako deň bez ťažkostí, chýbajúci spánok alebo tlak sa nedopĺňa. Rozdiel označíme až vtedy, keď je malá šanca, že vznikol náhodou.","disclaimer":"Možná súvislosť nie je dôkazom príčiny. Výsledok sa môže zmeniť s ďalšími záznamami. Ak chceš niečo zmeniť v liečbe, poraď sa s lekárom.","toForecast":"Zapnúť upozornenia na počasie","moreRecords":"Čím viac záznamov pridáš, tým lepšie môže aplikácia rozpoznať opakujúce sa súvislosti medzi tvojimi príznakmi a možnými spúšťačmi. Výsledky preto ber ako orientačné, najmä ak máš zatiaľ málo záznamov."},"forecast":{"today":"Dnes","tomorrow":"Zajtra","signals":{"pressure_drop":"Hlásia pokles tlaku o {amount} hPa.","pressure_rise":"Hlásia nárast tlaku o {amount} hPa.","humid":"Hlásia vysokú vlhkosť ({amount} %).","temp_swing":"Hlásia zmenu teploty o {amount} °C."},"evidence":"Z tvojich záznamov: pri podobných dňoch bol ťažší deň v {a} z {b} prípadov, pri ostatných v {c} z {d}.","evidenceFew":"Na porovnanie s tvojimi záznamami ich zatiaľ nie je dosť.","evidenceNone":"V tvojich záznamoch sa pri tom zatiaľ rozdiel neukazuje.","levels":{"change":"Hlásia výraznú zmenu","calm":"Bez výrazných zmien"},"cardTitle":"Zmena počasia · {day}","factWeather":"Sleduje predpoveď tlaku, vlhkosti a teploty na najbližšie dni.","factRecords":"Sám/sama si vyberieš, na ktoré zmeny ťa má upozorniť.","factNotify":"Večer pred dňom s vybranou zmenou ti pošle upozornenie.","factOff":"Kedykoľvek to môžeš vypnúť. Niektorým ľuďom je bez upozornení lepšie.","offLead":"Večer ti dá vedieť, keď na ďalší deň hlásia výraznú zmenu počasia. Vyberieš si, na ktoré zmeny.","disclaimer":"Upozornenia hlásia iba predpoveď počasia z meteorologických modelov pre tvoju približnú polohu a skutočnosť sa môže líšiť. Nehovoria nič o tom, ako sa budeš cítiť, a nie sú zdravotnou radou. Lieky ani liečbu podľa nich nemeň.","enable":"Zapnúť upozornenia na počasie","calmText":"Žiadna zo sledovaných zmien sa nehlási.","lead":"Výrazné zmeny počasia na dnes a najbližšie tri dni.","weatherOff":"Zapni počasie a tlak","weatherOffHint":"Upozornenia potrebujú predpoveď počasia.","notifyTitle":"Upozornenia","notify":"Upozorniť ma vopred","notifyHint":"Večer pred dňom s vybranou zmenou. Vychádza z predpovede pri poslednom otvorení appky.","notifyTime":"Kedy ma upozorniť","previewLabel":"Takto bude vyzerať upozornenie v telefóne:","disable":"Vypnúť upozornenia na počasie","staleForecast":"Predpoveď je staršia ako deň, preto na ňu teraz neupozorňujeme. Skontroluj pripojenie na internet.","nothingToNotify":"Podľa aktuálnej predpovede teraz nie je na čo upozorniť.","alertsTitle":"Na čo ma upozorniť","alerts":{"pressure_drop":"Pokles tlaku","pressure_rise":"Nárast tlaku","humid":"Vysoká vlhkosť","temp_swing":"Prudká zmena teploty"},"alertsNone":"Vyber aspoň jednu zmenu, inak appka nebude na nič upozorňovať."},"stats":{"empty":"Štatistiky sa skladajú z tvojich záznamov. Keď budeš mať zapísané príznaky alebo epizódy, uvidíš ich tu.","noCompare":"bez porovnania","same":"rovnako ako predtým","less":"o {value} menej","more":"o {value} viac","compareTitle":"Oproti predošlému obdobiu","compareLead":"Posledných {days} oproti rovnako dlhému obdobiu predtým.","symptomDaysValue":"dni s príznakmi: {n}","trendTitle":"Dni s príznakmi po mesiacoch","trendLabel":"Stĺpcový graf počtu dní s príznakmi za posledných 12 mesiacov.","colMonth":"Mesiac","rhythmTitle":"Kedy epizódy začínajú","rhythmLead":"Spolu {n} podľa dňa v týždni a časti dňa.","parts":{"morning":"Ráno","afternoon":"Popol.","evening":"Večer","night":"Noc"},"cycleStart":"Prvý deň menštruácie","cycleOffset":"Deň {n} od začiatku","cycleTitle":"Epizódy okolo menštruácie","cycleLead":"Z {n} zapísaných menštruácií. Ďalšiu menštruáciu appka nepredpovedá.","colCycleDay":"Deň","reliefTitle":"Čo najčastejšie prinieslo úľavu","impactTitle":"Čo epizódy najčastejšie obmedzili","medValue":"{days} dní s príznakmi, {episodes} epizód za 30 dní","medTitle":"Záznamy pred preventívnym liekom a po ňom","medLead":"Prepočítané na 30 dní.","medSince":"Od {date}, porovnaných {days} pred a po","medBefore":"Pred začiatkom","medAfter":"Po začiatku","medDisclaimer":"Je to iba popis tvojich záznamov, nie hodnotenie lieku. Zmena môže mať aj iné dôvody. O liečbe sa rozhoduj so svojím lekárom."},"demoSymptoms":"V tejto ukážke sú príznaky a epizódy vymyslené, počasie je skutočné. Súvislosť s tlakom sa preto ukáže až z tvojich vlastných záznamov."}`),notifications:{channelReminders:`Denná pripomienka`,channelForecast:`Zmeny počasia`,reminderBody:`Ako sa dnes máš? Zapíš si, ako sa cítiš.`,denied:`Telefón upozornenia nepovolil. Zapneš ich v nastaveniach telefónu.`}},en:{app:{name:`Vestie`,logo:`Vestie – Vestibular Migraine`},common:{continue:`Continue`,skip:`Skip`,back:`Back`,save:`Save`,cancel:`Cancel`,close:`Close`,yes:`Yes`,undo:`Undo`,optional:`optional`,on:`On`,off:`Off`,stepOf:`Step {step} of {total}`,edit:`Edit`,delete:`Delete`},language:{title:`Choose your language`,sk:`Slovenčina`,en:`English`},welcome:{title:`Your symptom diary`,text:`Log symptoms, episodes, medication and sleep. The app arranges them into a calendar and insights and prepares a report you can show your doctor.`,cta:`Get started`},goals:{title:`What can the app help you with?`,lead:`Choose what matters to you. You can pick several options or continue without choosing.`,options:{symptoms:`Log symptoms`,triggers:`Log possible triggers`,patterns:`Understand my difficulties`,doctor:`Prepare an overview for my doctor`}},condition:{title:`What would you like to track?`,lead:`This only tailors the content – it is not a diagnosis. You can change it at any time.`,options:{vestibular_migraine:`Vestibular migraine`,migraine:`Migraine`,other_vestibular:`Other vestibular condition`,unsure:`I'm not sure`}},cycle:{title:`Would you like to track your menstrual cycle?`,lead:`This feature is optional. You can turn it on or off later in settings.`,yes:`Yes`,no:`No`},medications:{title:`Would you like to add your medications?`,lead:`You can add medications you take preventively or for acute symptoms. You can skip this and add them later.`,add:`Add medications`,addAnother:`Add another medication`,added:`Added medications`,remove:`Remove medication {name}`,disclaimer:`The app does not recommend doses or change your treatment.`,types:{preventive:`Preventive`,acute:`Acute`}},medForm:{title:`New medication`,name:`Medication name`,namePlaceholder:`e.g. Betahistine`,nameRequired:`Please enter the medication name.`,type:`Type`,dose:`Dose`,dosePlaceholder:`e.g. 24 mg`,frequency:`Frequency`,frequencyPlaceholder:`e.g. twice a day`,note:`Note`,submit:`Save medication`,saved:`{name} was added`,startDate:`Started taking`,startDateHint:`Helps compare your entries before and after this medication.`},reminders:{title:`Would you like to set a reminder?`,lead:`Every day, at a time you choose, we'll remind you to log your symptoms and how you feel.`,yes:`Yes`,no:`No, not now`,time:`When should we remind you?`,permission:`Your phone will then ask for permission to send notifications. You can turn the reminder off in your profile at any time.`},today:{greeting:`Hello`,greetingName:`Hello, {name}`,howAreYou:`How are you feeling today?`,noEntries:`You haven't logged any symptoms today yet.`,loggedToday:`Logged today`,addSymptom:`Add symptom`,startEpisode:`Start episode`,overview:`Today`,sleep:`Sleep`,meds:`Medications`,nothingYet:`Nothing yet`,entriesEmpty:`Nothing here yet. Add a symptom with the button above, start an episode in the middle of the bottom menu.`,symptomsToday:`Symptoms logged today`,intakeTitle:`Medication`,logIntake:`Log medication`,pressure:`Pressure`,steps:`Steps`,turnOn:`Turn on`,connect:`Connect`,mobileOnly:`In the mobile app`},episode:{title:`Episode`,ongoing:`Episode in progress`,statusOngoing:`In progress`,statusEnded:`Ended`,started:`Episode started`,startedAt:`Started`,endedAt:`Ended`,duration:`Duration`,since:`since {time}`,lasting:`lasting {duration}`,detailsLater:`You can add details now or at any time later. The episode stays saved even if you close the app.`,addDetails:`Add details`,finishLater:`Finish later`,end:`End episode`,endedToast:`Episode ended`,mistake:`Started it by mistake?`,cancel:`Cancel episode`,cancelledToast:`Episode cancelled`,delete:`Delete episode`,deleteTitle:`Delete this episode?`,deleteText:`The entry will be permanently removed from this device.`,deletedToast:`Episode deleted`,notFound:`This episode no longer exists.`,linkedSymptoms:`Symptoms logged during the episode`,linkedIntakes:`Medications taken during the episode`,editDetails:`Edit details`,saveLater:`Save and finish later`,savedLater:`The episode is saved. You can add details any time in its detail view.`,details:`Details`},duration:{underMinute:`less than a minute`,minutes:`{m} min`,hours:`{h} h`,hoursMinutes:`{h} h {m} min`},nav:{label:`Main navigation`,today:`Today`,calendar:`Calendar`,insights:`Insights`,treatment:`Treatment`,profile:`Profile`,startEpisode:`Start episode`},profile:{title:`Profile`,me:`My profile`,name:`Name`,namePlaceholder:`Optional`,nameHint:`Used only to greet you on the home screen.`,language:`Language`,tracking:`Tracking`,cycle:`Menstrual cycle`,reminders:`Daily reminder`,reminderTime:`Reminder time`,display:`Display`,reduceMotion:`Reduce animations`,reduceMotionHint:`Helpful if motion bothers you. If reduced motion is turned on in your phone settings, animations are already off.`,privacy:`Privacy`,deleteAll:`Delete all data`,deleteAllTitle:`Delete all data?`,deleteAllText:`All entries, medications and settings on this device will be removed. This cannot be undone.`,deleteAllConfirm:`Yes, delete`,dev:`For development`,styleguide:`Design system`,saved:`Saved`,disclaimer:`This app is for personal tracking and is not a medical device. It does not provide a diagnosis or treatment and does not replace consulting a doctor.`,integrations:`Connections`,health:`Smartwatch and health data`,healthHint:`Sleep and steps from Apple Health or Health Connect, including from your watch.`,comingSoon:`Coming soon`,demoReset:`Reset sample data`,demoResetTitle:`Reset sample data?`,demoResetText:`Sample entries for the last year will be restored. Entries you added yourself will stay.`,demoResetConfirm:`Reset`,demoResetDone:`Sample data has been reset`,onboardingAgain:`Go through the intro again`,logout:`Sign out`,logoutNoPinTitle:`Set a PIN first`,logoutNoPinText:`Without a PIN, anyone with your phone could open the app after you sign out. Once you set a PIN, we will sign you out right away.`,logoutNoPinConfirm:`Set a PIN`,appearance:`Appearance`,themes:{light:`Light`,dark:`Dark`,system:`Automatic`},demoSection:`App preview`,demoFill:`Filled app`,demoFillHint:`Turn off to see the empty app, as a new person would.`,demoFillOn:`Sample data is on`,demoFillOff:`Sample data is off, the app is empty`,weatherHint:`Pressure and weather for your location are recorded every day.`,demoPlus:`Vestie+ on`,demoPlusHint:`Switch to see the app with or without a subscription.`,plusActive:`My Vestie+`,plusTry:`Try Vestie+`,plusHint:`Weather and pressure, weather alerts, pattern finder and more.`},symptoms:{dizziness:`Dizziness`,vertigo:`Vertigo`,rocking:`Rocking / swaying`,floating:`Floating sensation`,unsteadiness:`Unsteadiness when walking`,nausea:`Nausea`,vomiting:`Vomiting`,light_sensitivity:`Sensitivity to light`,sound_sensitivity:`Sensitivity to sound`,visual_sensitivity:`Visual sensitivity`,tinnitus:`Tinnitus / ringing in the ears`,ear_pressure:`Ear pressure`,headache:`Headache`,brain_fog:`Brain fog`,fatigue:`Fatigue`,unknown:`Unknown symptom`},durations:{just_started:`Just started`,under_1h:`Less than 1 hour`,"1_3h":`1–3 hours`,"3_6h":`3–6 hours`,"6_12h":`6–12 hours`,over_12h:`More than 12 hours`,ongoing:`Still ongoing`,moment:`A moment (seconds to minutes)`},triggers:{poor_sleep:`Poor / insufficient sleep`,stress:`Stress`,skipped_meal:`Skipped meal`,dehydration:`Dehydration`,caffeine:`Caffeine`,alcohol:`Alcohol`,exertion:`Physical exertion`,illness:`Illness / infection`,visual_stimulation:`Visual stimulation`,screen_time:`Extended screen time`,weather_change:`Weather change`,menstrual_cycle:`Menstrual cycle`,travel:`Travel / motion`,other:`Other`,long_sleep:`Too much sleep`,bright_light:`Bright light / sunlight`,strong_smells:`Strong smells`,neck_pain:`Neck pain or tension`,allergy:`Allergy`},effects:{helped:`Helped`,partly:`Partly`,not_helped:`Didn't help`,unknown:`Not sure`},intensity:{none:`none`,mild:`mild`,moderate:`moderate`,severe:`severe`,notSet:`Not set`,value:`{value} – {level}`,highest:`highest intensity {value}`},log:{symptomsTitle:`Which symptoms are you logging?`,symptomsLead:`Choose one or more symptoms.`,search:`Search symptoms`,noMatch:`No symptom matches your search. You can add your own.`,custom:`Custom symptom`,customPlaceholder:`Type the symptom name`,customAdd:`Add`,continueCount:`Continue ({n})`,intensityTitle:`How intense is it?`,intensityLead:`0 = none, 10 = worst. The slider starts at 5 – move it to match how you feel. You can skip any symptom.`,clear:`Skip`,detailsTitle:`How long have these symptoms lasted?`,detailsLead:`Everything on this screen is optional.`,when:`When they started`,date:`Date`,time:`Time`,note:`Note`,linkEpisode:`Add to the ongoing episode`,save:`Save entry`,saved:`Entry saved`,whenToday:`Today at {time}`,whenOn:`{date} at {time}`,changeTime:`Change time`,clearLabel:`Skip intensity: {name}`,restore:`Rate intensity`},symptomLog:{title:`Symptoms`,duration:`Duration`,note:`Note`,episode:`Part of an episode`,openEpisode:`Open episode`,edit:`Edit entry`,delete:`Delete entry`,deleteTitle:`Delete this entry?`,deleteText:`The entry will be permanently removed from this device.`,deletedToast:`Entry deleted`,notFound:`This entry no longer exists.`},treatment:{title:`Treatment`,lead:`Your medications, when you take them and how they seem to help.`,preventive:`Preventive`,acute:`Acute`,add:`Add medication`,empty:`You haven't added any medications yet.`,noneOfType:`No medications in this group.`,lastTaken:`Last taken {when}`,neverTaken:`No intake logged yet`,disclaimer:`The app does not prescribe medications or suggest dose changes. Decide on treatment with your doctor.`,type:`Type`,dose:`Dose`,frequency:`Frequency`,note:`Note`,logIntake:`Log intake`,history:`Intake history`,historyEmpty:`You haven't logged any intake yet.`,taken:`Taken`,effectSummary:`Effect as you rated it`,edit:`Edit medication`,delete:`Remove medication`,deleteTitle:`Remove this medication?`,deleteText:`The medication and its whole intake history will be removed.`,deletedToast:`Medication removed`,notFound:`This medication no longer exists.`,inEpisode:`during an episode`,effectMissing:`effect not rated`,showAll:`Show full history ({n})`,hint:`Tap a medication to log when you take it and see how it helps you.`},intake:{title:`Medication intake`,editTitle:`Edit intake`,date:`Date`,time:`Time`,dose:`Dose`,effect:`Did it help?`,effectHint:`If you don't know yet, add it later.`,note:`Note`,save:`Save intake`,saved:`Intake saved`,delete:`Delete intake`,deleteTitle:`Delete this intake?`,deleteText:`The intake record will be permanently removed.`,deletedToast:`Intake deleted`,notFound:`This entry no longer exists.`},calendar:{title:`Calendar`,prev:`Previous month`,next:`Next month`,backToday:`Today`,legend:`Legend`,legendPeriod:`Period`,dayEmpty:`You have no entries on this day.`,addSymptom:`Add symptom`,period:`Period`,periodMark:`Log period on this day`,summaryEntries:`{n} entries`,summaryPeriod:`period`,summaryNone:`no entries`,selected:`selected day`,today:`today`,legendEpisode:`Day with an episode`,legendSymptoms:`Symptoms logged`,summaryEpisode:`episode`},insights:{title:`Insights`,periodLabel:`Period`,empty:`Insights are built from your entries. Once you've logged symptoms on several days, you'll see here what keeps coming back.`,overview:`Summary`,symptomDays:`Days with symptoms`,episodes:`Episodes`,avgIntensity:`Average intensity`,avgDuration:`Average episode duration`,noValue:`not entered`,topSymptoms:`Most frequent symptoms`,topSymptomsLead:`Number of entries in which the symptom appeared.`,topTriggers:`Most frequent possible triggers`,triggersEmpty:`You haven't logged any possible triggers yet. They will come with episode details.`,meds:`Medications`,medsEmpty:`You didn't log any medication intake in this period.`,interpretation:`A recorded connection is not proof of a cause. The overview only uses data you entered.`,report:`Create a report for your doctor`},report:{title:`Report for your doctor`,lead:`Choose a period. The report summarises your entries so you can show them to your doctor.`,custom:`Custom period`,from:`From`,to:`To`,create:`Create report`,invalidRange:`The “From” date must be on or before the “To” date.`,docTitle:`Recorded symptoms and treatment`,period:`Period`,created:`Created`,disclaimer:`Data recorded by the user in the Vestie app. This is not a diagnosis or a medical record.`,fewData:`Few entries were recorded in this period, so the overview may not be representative.`,summary:`Summary`,symptoms:`Most frequent symptoms`,triggers:`Recorded possible triggers`,meds:`Medications and effect as rated by the user`,sleep:`Sleep`,sleepNone:`No sleep was recorded in this period.`,cycle:`Menstrual cycle`,cycleDays:`Recorded period days`,notes:`Notes`,timeline:`Timeline`,colDate:`Date and time`,colEntry:`Entry`,colDetail:`Details`,none:`No entries.`,print:`Save as PDF`,printHint:`In the print window, choose “Save as PDF”.`,sleepQuality:`Sleep quality`,plusHint:`With Vestie+ the report also shows pressure during episodes, possible patterns and activity.`,weather:`Weather and pressure during episodes`,weatherSummary:`Episodes on days when pressure dropped by 6 hPa or more: {drops} of {total}.`,patterns:`Possible patterns from the entries`,patternsOther:`otherwise {a} of {b}`,patternsNote:`Number of harder days after a day with this factor. These are possible patterns from the user's entries over the past year, not proof of a cause.`,activity:`Activity`,avgSteps:`Average steps per day`},sleep:{title:`Sleep`,formTitle:`How did you sleep?`,lead:`Log how long you slept. Quality and a note are optional.`,date:`Day you woke up`,duration:`Sleep duration`,hours:`Hours`,minutes:`Minutes`,durationRequired:`Please enter how long you slept.`,quality:`Sleep quality`,qualities:{good:`Good`,fair:`Fair`,poor:`Poor`},note:`Note`,save:`Save sleep`,saved:`Sleep saved`,add:`Log sleep`,entry:`Sleep {duration}`,delete:`Delete sleep entry`,deleteTitle:`Delete this sleep entry?`,deleteText:`The entry will be permanently removed from this device.`,deletedToast:`Sleep entry deleted`,avg:`Average sleep`,nights:`Nights recorded`},consent:{title:`Your data stays on your phone`,lead:`Before you start, here is how we handle your data.`,updatedLead:`The privacy policy has changed. Please read it and confirm your consent again to keep using the app.`,factDevice:`Health entries are stored only on this phone.`,factNoServer:`The app has no online account, sends no health entries anywhere and uses no ads or analytics.`,factPin:`You will sign in with a PIN and your data will be encrypted.`,factControl:`You can export your data to a file or delete it permanently at any time.`,health:`I agree to the processing of my health data on this phone for personal tracking.`,age:`I am at least 16 years old.`,policyLink:`Read the privacy policy`,submit:`Agree and continue`},privacyPolicy:{title:`Privacy policy`,draft:`Draft`,version:`Version {version}`,draftNote:`Working draft for review. Before release it will be checked by a lawyer.`,controllerTitle:`Who is the controller`,controllerText:`The controller is IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, Slovakia, company ID (IČO) 47321547. Contact for personal data questions: support@vestibularnamigrena.sk.`,dataTitle:`What data the app processes`,dataText:`Only what you enter yourself: symptoms and their intensity, episodes, medications and their effect, sleep, optionally your menstrual cycle and a name for the greeting. With Vestie+ also weather and pressure for your approximate location and data from health apps, if you turn them on. This is health data, so we protect it specially.`,storageTitle:`Where your data is`,storageText:`Only on this phone. The app has no server or online account, sends no health entries anywhere and uses no advertising or analytics tools. The controller has no access to your data.`,purposeTitle:`What it is for`,purposeText:`For your personal tracking and for an overview or report you can show your doctor. The report is created on the phone and you decide who gets it. The app shows possible connections in your entries on the phone, but makes no automated decisions about you with legal or similarly significant effects.`,legalTitle:`Legal basis`,legalText:`We process health data on the basis of your explicit consent (Art. 9(2)(a) GDPR). You can withdraw it at any time in your Profile – your data will then be deleted. The app sends your location for weather on the basis of your consent, which you give by turning the feature on and withdraw by turning it off (Art. 6(1)(a) GDPR). We answer e-mails on the basis of our legitimate interest (Art. 6(1)(f) GDPR).`,rightsTitle:`Your rights`,rightsText:`You have the right to access your data, to have it corrected and erased, to restrict its processing, to data portability, to object and to withdraw your consent at any time. Your data exists only on your phone and we have no access to it, so you exercise most of these rights directly in the app: you can view, edit, export or permanently delete your data (Profile → Privacy). For anything else, we will help at support@vestibularnamigrena.sk. You also have the right to lodge a complaint with the Office for Personal Data Protection of the Slovak Republic, Hraničná 12, 820 07 Bratislava 27, dataprotection.gov.sk, or with the data protection authority in your country.`,securityTitle:`Security`,securityText:`You sign in to the app with a 6-digit PIN. While the PIN is on, your data on the phone is encrypted (AES-256) and unreadable without the PIN. If you forget the PIN, the data cannot be recovered.`,backupTitle:`Backup`,backupText:`Your data exists only on your phone and the app has no server. On Android it is not backed up to Google Drive. On iPhone it is part of your whole-phone backup in iCloud or on your computer, if you have it turned on. In Profile you can create a password-protected backup and save it wherever you like. We don't know your backup password, so we can't recover it either. When you set up a new phone, Android may transfer the app's data directly from the old phone (by cable or over Wi-Fi). If your PIN is on, the data stays encrypted both in phone backups and during a transfer. Without a backup or a transfer, your data is lost if you lose or change your phone.`,ageTitle:`Age`,ageText:`The app is intended for people aged 16 and over.`,changesTitle:`Changes to this policy`,changesText:`We will let you know about changes directly in the app.`,weatherTitle:`Weather and pressure (Vestie+)`,weatherText:`If you turn this feature on, each time you open the app it sends your location, rounded to about 10 km, to the weather provider to get real weather and pressure. The provider is OpenWeather Ltd., 30 St Mary Axe, London, United Kingdom. The EU has an adequacy decision for the United Kingdom. The provider technically also sees your IP address, as with any internet request. According to its policy, it does not store the IP address or location from these requests. Nothing about your health is sent. You can turn this off at any time.`,healthTitle:`Health connection (Vestie+)`,healthText:`If you connect Apple Health or Health Connect, the app only reads the selected data (sleep, steps) onto this phone. It writes nothing to them, sends nothing anywhere and you can disconnect at any time.`,purchasesTitle:`Subscription`,purchasesText:`Payment for Vestie+ is handled by Google or Apple as a separate controller under their own terms and policies. The app only learns whether the subscription is active. We never see your payment details.`,linksTitle:`Links to the website and community`,linksText:`The app contains links to the vestibularnamigrena.sk website and to the community on Facebook, Instagram and Discord. It sends them nothing. When you open a link, you leave the app and the rules and policies of that service apply.`,retentionTitle:`How long`,retentionText:`Your entries stay on the phone until you delete them, withdraw your consent or uninstall the app. You keep any backup yourself and decide when to delete it.`,contactTitle:`When you write to us`,contactText:`If you write to support@vestibularnamigrena.sk, we process your e-mail address and the content of your message only to reply to you. We keep the message as long as needed to deal with it and then delete it. Please do not include more health information than necessary.`},profileSetup:{title:`Create your profile`,lead:`Your profile exists only on this phone – no online e-mail or password. You will sign in with a PIN.`,pinTitle:`Sign-in PIN`,pinText:`In the next step you will set a 6-digit PIN. You will use it to sign in and it also encrypts your data on the phone.`,nameLabel:`What should we call you?`,namePlaceholder:`Your name`,nameHint:`Optional. You will see it in the greeting on the home screen.`,pinAlready:`You already have a PIN. You can change it in Profile → Security.`},pin:{progress:`{n} of {total} digits entered`,keypad:`PIN keypad`,delete:`Delete digit`,prompt:{current:`Enter your current PIN`,new:`Choose a 6-digit PIN`,confirm:`Enter the PIN again to confirm`},title:{set:`Set your sign-in PIN`,change:`Change PIN`,disable:`Turn off PIN`},setLead:`You will use it to sign in and it also encrypts your data on the phone. If you forget it, the data cannot be recovered – nobody else has access to it.`,checking:`Checking…`,wrong:`Wrong PIN. Please try again.`,blocked:`Too many wrong attempts. Try again at {time}.`,weak:`This PIN is easy to guess. Please choose another one.`,mismatch:`The PINs don't match. Please choose your PIN again.`,saving:`Encrypting your data…`,enabled:`PIN set, your data is encrypted`,changed:`PIN changed`,disabled:`PIN turned off`,blockedSeconds:`Too many wrong attempts. Try again in {n} s.`},lock:{title:`Sign in`,lead:`Enter your PIN`,forgot:`Forgot your PIN?`,forgotTitle:`Forgotten PIN`,forgotText:`The PIN cannot be recovered – your data is encrypted only on this phone and nobody else has the key. You can only delete it and start over.`,forgotConfirm:`Delete everything and start over`},security:{title:`Security`,pin:`Sign in with PIN`,pinOnHint:`Your data is encrypted on the phone and cannot be accessed without the PIN.`,pinOffHint:`Without a PIN, anyone with your phone can open the app and your data is not encrypted.`,changePin:`Change PIN`,autoLock:`Sign out automatically`,autoLockOptions:{m0:`Right after leaving the app`,m1:`After 1 minute`,m5:`After 5 minutes`,m15:`After 15 minutes`},biometrics:`Unlock with face or fingerprint`,biometricsHint:`Available in the mobile app.`},privacy:{deviceOnly:`Your entries are only on this phone`,deviceOnlyHint:`The app sends no health entries anywhere and nobody else can access them.`,export:`Export my data`,exportHint:`A readable JSON file with all your entries, for example to move them elsewhere. It is not encrypted.`,exportDone:`Your data file is ready`,consent:`Consent to data processing`,consentGiven:`Given on {date}`,withdraw:`Withdraw consent`,withdrawTitle:`Withdraw consent?`,withdrawText:`Without consent the app cannot keep your health data. Withdrawing will permanently delete all data on this phone.`,withdrawConfirm:`Withdraw and delete data`,backupFirst:`Make a backup first`,plusNotCancelled:`This does not cancel your Vestie+ subscription. If you no longer want it, cancel it in {store}, otherwise it will keep renewing.`,exportFailed:`The file could not be created. Please try again.`,importTitle:`Restore data from this file?`,importText:`All records on this phone will be replaced by the records in the file. Your subscription and PIN stay the same.`,importConfirm:`Restore`,importDone:`Your data has been restored`},backup:{title:`Data backup`,profileHint:`A password-protected file you can restore your entries from, for example on a new phone.`,lead:`The app has no server; your entries exist only on this phone. Save a backup somewhere else, such as Google Drive or a computer. If you change or lose your phone, you can restore all your entries from it.`,lastAt:`Last backup: {date}`,never:`You haven't created a backup yet.`,createTitle:`Create a backup`,password:`Backup password`,passwordHint:`At least {n} characters. Don't use your PIN.`,passwordRepeat:`Repeat the password`,passwordWarning:`Remember the password or write it down somewhere safe. Without it the backup can't be opened or restored, and nobody can recover it for you.`,create:`Create backup`,creating:`Creating the backup…`,created:`The backup is ready. Save it somewhere other than this phone.`,failed:`The backup couldn't be created. Please try again.`,fileName:`backup`,restoreTitle:`Restore from a backup`,restore:`Choose a backup file`,restoreHint:`For example on a new phone. The entries on this phone will be replaced with the ones from the backup.`,restoreLead:`The backup is encrypted. Enter the password you chose for it.`,restoreLeadDate:`The backup from {date} is encrypted. Enter the password you chose for it.`,restoreSubmit:`Restore`,reminderTitle:`Reminder`,reminder:`Remind me to back up`,reminderHint:`Once a month, a short reminder appears on the Today screen.`,privacy:`The backup never goes anywhere on its own. You decide where to save it, and without the password its contents can't be read.`,errors:{tooShort:`The password must have at least {n} characters.`,mismatch:`The passwords don't match.`,passwordRequired:`Enter the backup password.`,wrongPassword:`Wrong password or a damaged file.`,invalidFile:`This file can't be read. Choose a backup or an export from the app.`},card:{title:`Back up your entries`,textNever:`Your entries exist only on this phone. If you lose or change it, you'll lose them without a backup.`,textOld:`Your last backup is from {date}. Create a new one to keep your newer entries safe too.`,action:`Create backup`,later:`Not now`}},plural:{entries:{one:`{n} entry`,other:`{n} entries`},times:{other:`{n}×`},days:{one:`{n} day`,other:`{n} days`},episodes:{one:`{n} episode`,other:`{n} episodes`},hardDays:{one:`{n} harder day`,other:`{n} harder days`}},community:{title:`Community & support`,lead:`You don't have to face it alone. In our community we share our own experiences, support each other and recommend specialists.`,facebook:`Facebook group`,facebookHint:`Experiences, questions and mutual support`,instagram:`Instagram`,instagramHint:`@vestibularnamigrena`,discord:`Discord`,discordHint:`Real-time conversations with the community`,webTitle:`Articles on our website`,webText:`About the diagnosis, treatment and living with vestibular migraine (in Slovak).`,webUrl:`www.vestibularnamigrena.sk`,external:`(opens outside the app)`,note:`Experiences and recommendations from the community don't replace a doctor's examination and advice.`,soon:`Coming soon`},episodeTypes:{vestibular:`Vestibular episode`,migraine_headache:`Migraine with headache`,migraine_no_headache:`Migraine without headache`,other:`Other`,unsure:`I don't know`},relief:{rest:`Rest`,sleep:`Sleep`,dark_room:`Resting in a dark room`,hydration:`Drinking water`,relaxation:`Relaxation or meditation`,cold_compress:`Cold compress`,warm_compress:`Warm compress`,shower:`Shower`,food:`Food`,other:`Other`},impact:{work_study:`Work or study`,sleep:`Sleep`,daily_activities:`Everyday activities`,social:`Contact with family and friends`,movement:`Movement and physical activity`,rest:`Rest and relaxation`,other:`Other`,none:`The episode didn't limit me much`},episodeFlow:{typeTitle:`What kind of episode was it?`,typeLead:`Every detail is optional. Skip what you don't know and add it later.`,intensity:`Overall intensity`,symptomsTitle:`Which symptoms appeared?`,symptomsLead:`Choose one or more. You'll rate each one in the next step.`,date:`Date`,time:`Time`,triggersTitle:`What might have triggered it?`,triggersLead:`Choose everything that applies. These are possible links, not confirmed causes. You can choose more than one.`,triggerOther:`Other trigger`,triggerOtherPlaceholder:`Describe what it was`,medsTitle:`Did you take any medication during the episode?`,medsLead:`Tick the medication and when you took it. It will also be saved in Treatment.`,medsLogged:`Already logged during the episode`,medsNone:`You haven't added any medication yet.`,addMed:`Add medication`,medsWhen:`When you took it`,medsOutside:`The time must be during the episode.`,helped:`Did it help?`,reliefTitle:`What brought you relief?`,summaryTitle:`Episode summary`,summaryLead:`Check what you filled in. You can edit any part.`,summaryMissing:`You can still add`,save:`Save episode`,saved:`The episode was saved`,edit:`Edit`,sections:{type:`Type`,intensity:`Intensity`,time:`Time`,symptoms:`Symptoms`,triggers:`Possible triggers`,meds:`Medication`,helped:`Did it help?`,relief:`Relief`,impact:`Limitations`},reliefLead:`You can choose more than one.`,reliefOther:`What else helped?`,reliefOtherPlaceholder:`Describe what it was`,impactTitle:`How did the episode limit you?`,impactLead:`Which areas of everyday life did it affect?`,impactOther:`What else did the episode affect?`,impactOtherPlaceholder:`Describe what it was`},symptomInfo:{open:`What does {name} mean?`,close:`Got it`,dizziness:`A feeling of lightheadedness, unsteadiness or loss of balance. You may feel your head is spinning, feel faint or feel unsure when standing or walking.`,vertigo:`A false sense of movement even though you aren't moving. You may feel that you are spinning, that the room is turning or that your surroundings are moving.`,brain_fog:`A state in which it is hard to concentrate, think clearly or process information. Your thinking may feel slower, words may be harder to find or your thoughts harder to follow.`,visual_sensitivity:`Increased sensitivity to visual stimuli. Moving images, busy environments, patterns, crowds or screens can trigger dizziness, nausea or disorientation.`,tinnitus:`Hearing a sound in one or both ears even though there is no real source of sound around you. It may be ringing, humming, buzzing or hissing.`,rocking:`A feeling as if your body or surroundings are gently rocking, swaying from side to side or moving back and forth, like on a boat.`,floating:`A feeling as if you are floating, without firm contact with the ground.`,unsteadiness:`A feeling of unsteadiness when standing or walking, as if you are losing your balance, drifting to the sides or need support to move.`},quickIntake:{title:`Which medication did you take?`,lead:`Choose a medication. Next you'll enter the time and whether it helped.`,add:`Add a new medication`,empty:`You haven't added any medication yet. Add one and then log taking it.`},plus:JSON.parse(`{"name":"Vestie+","lockedLabel":"Part of Vestie+","tryChip":"Try it","demoChip":"Sample","features":{"weather":{"title":"Weather and pressure","text":"Weather and barometric pressure for your location are recorded every day."},"forecast":{"title":"Weather alerts","text":"In the evening, lets you know when a sharp change in pressure, temperature or humidity is forecast for the next day."},"finder":{"title":"Pattern finder","text":"Compares days with and without symptoms and shows possible patterns."},"stats":{"title":"Advanced statistics","text":"Year-long trends, when episodes start, what helps, and your entries before and after a medication."},"health":{"title":"Health connection","text":"Sleep and steps from Apple Health or Health Connect, including from your watch."},"report":{"title":"Richer doctor's report","text":"Adds pressure during episodes, possible patterns and activity."}},"periods":{"d90":"90 days","d180":"6 months","d365":"12 months"},"plans":{"yearly":{"name":"Yearly","hint":"{monthly} a month, first 7 days free","hintNoTrial":"{monthly} a month","badge":"Save {percent}%","cta":"Try free for 7 days","ctaNoTrial":"Subscribe for {price} a year","terms":"7 days free, then {price} a year. The subscription renews automatically. Cancel it in {store} before the trial ends and you pay nothing.","termsNoTrial":"{price} a year. The subscription renews automatically until you cancel it in {store}."},"monthly":{"name":"Monthly","hint":"Cancel any time","cta":"Subscribe for {price} a month","terms":"{price} a month. The subscription renews automatically until you cancel it in {store}."}},"paywall":{"title":"Understand more from your entries","lead":"Vestie+ adds weather and pressure, alerts about weather changes and deeper patterns in your entries. The basic diary stays free.","choosePlan":"Choose your subscription","renewal":"Payment is handled by {store}. You can cancel any time in your {store} settings and keep Vestie+ until the end of the period you paid for.","loadingPrices":"Loading prices…","pricesFailed":"Prices could not be loaded. Check your internet connection and try again.","retryPrices":"Try again","restored":"You already have a subscription. Vestie+ is on again.","freeTitle":"Everything you have now stays free","freeText":"Symptom and episode entries, calendar, insights, medications, sleep and the doctor's report. When a subscription ends, your entries stay yours.","demoNote":"Nothing is charged in this preview.","restore":"Restore purchase","terms":"Terms of use","termsText":"The terms of use will be added before release, after legal review.","disclaimer":"Vestie+ is not a medical device. It does not provide a diagnosis or treatment and does not replace seeing a doctor.","notNow":"Not now","nativeOnly":"Purchases will be available in the mobile app.","nothingToRestore":"We found no purchase to restore.","purchaseFailed":"The purchase did not go through. Please try again later.","purchasePending":"The payment is still processing. Vestie+ turns on once the store confirms it."},"manage":{"title":"Your Vestie+","lead":"Everything in one place. You can turn any feature on or off at any time.","welcomeTitle":"Welcome to Vestie+","welcomeLead":"Turn on weather and pressure first. You will find the other features in the list.","features":"Features","subscription":"Subscription","trialUntil":"Free trial until {date}","since":"Active since {date}","cancel":"Cancel subscription","cancelHint":"Your entries stay on your phone.","cancelTitle":"Cancel Vestie+?","cancelText":"Vestie+ features will be locked. All your entries, including recorded weather and pressure, stay with you.","cancelConfirm":"Cancel subscription","cancelled":"Vestie+ is cancelled","toToday":"Continue to Home","enableWeather":"Turn on weather and pressure","manageStore":"Manage in Google Play","manageStoreHint":"Change or cancel your subscription here. Your records stay on your phone."},"charts":{"legend":"Chart legend","showTable":"Show as a table"},"weather":{"hpa":"{value} hPa","temps":"{min} to {max} °C","changeShort":"{value} from the day before","conditions":{"clear":"Clear","partly":"Partly cloudy","cloudy":"Cloudy","fog":"Fog","rain":"Rain","snow":"Snow","storm":"Storm"},"offLead":"Weather and pressure may be linked to vestibular migraine. The app will record them next to your entries every day, so you can see whether anything repeats for you.","factRecord":"From the moment you turn this on, pressure, temperature, humidity and weather are recorded for each day. Recorded days stay on your phone. Days before that are not filled in.","factLocation":"Each update sends the weather provider only your location, rounded to about 10 km.","factHealth":"Nothing about your health is ever sent.","factOff":"You can turn this off at any time.","enable":"Allow location and turn on","today":"Today","condition":"Weather","temperature":"Temperature","humidity":"Humidity","humidityValue":"Humidity {value}%","forecastWord":"forecast","estimateWord":"estimate","episodeWord":"episode","chartTitle":"Pressure over time","rangeDays":"{n} days","chartLabel":"Chart of barometric pressure over the last {n} days and the forecast for the coming days. Dots mark days with an episode.","legendPressure":"Pressure","legendForecast":"Forecast","legendEpisode":"Day with an episode","colDay":"Day","colPressure":"Pressure","colChange":"Change","colEpisode":"Episode","forecastTitle":"Forecast for the coming days","linkTitle":"Pressure and your entries","openFinder":"Open pattern finder","myLocation":"For your location","noData":"There is no weather data for today yet.","settings":"Settings","updateLocation":"Update now","turnOff":"Turn off weather and pressure","turnOffHint":"Recorded days will stay.","turnOffTitle":"Turn off weather and pressure?","turnOffText":"The app will stop checking the weather and forget your location. Days already recorded will stay.","attribution":"Weather data provided by OpenWeather","disclaimer":"Data comes from weather models for your approximate location and forecasts can differ from reality. Days when you didn't open the app are an estimate from the latest forecast. A link with weather is not proof of a cause.","loading":"Checking the weather…","enabled":"Weather and pressure are on","errors":{"denied":"This won't work without location access. Allow it in your phone or browser settings.","unavailable":"We couldn't find your location. Please try again.","network":"We couldn't load the weather. Check your internet connection.","setup":"Weather isn't set up in this version yet. Please try again later."},"episodeDay":"Weather and activity that day","updated":"Updated {time}. Data refreshes by itself.","stale":"No connection. The latest data is from {time}.","bands":{"low":"Low pressure","normal":"Normal pressure","high":"Higher pressure","veryHigh":"Very high pressure"},"bandRanges":{"low":"below 1000 hPa","normal":"1000 to 1020 hPa","high":"1021 to 1029 hPa","veryHigh":"1030 hPa and above"},"bandTitle":"What the pressure values mean","bandNow":"now","bandNote":"The values are a rough guide. Pressure is converted to sea level, the same as in weather forecasts, so it can be compared at higher altitudes too. Besides the value itself, the app shows the change from the previous day, and the pattern finder compares days when pressure changed by 6 hPa or more."},"health":{"connected":"Connected","notConnected":"Not connected","stepsValue":"{value} steps","lead":"Sleep and steps can be read directly from your phone. Watches such as Apple Watch, Garmin, Samsung or Fitbit write there too.","providers":{"apple_health":"Apple Health","health_connect":"Health Connect"},"typesTitle":"What to read","types":{"sleep":"Sleep","steps":"Steps"},"privacy":"Data is only read onto this phone and is not sent anywhere. Sleep you entered by hand is not overwritten.","lastSync":"Last read {time}","stepsToday":"Steps today","sleepToday":"Sleep last night","stepsWeek":"Steps over the last 7 days","sleepWeek":"Sleep over the last 7 nights (hours)","noValue":"no entry","disconnect":"Disconnect","disconnectTitle":"Disconnect the health app?","disconnectText":"The app will stop reading new data. What has already been read stays in your entries.","revokeHint":{"health_connect":"You can revoke read access in the Health Connect settings.","apple_health":"You can revoke read access in the Health app under Sharing."},"disconnectedToast":"Disconnected","openSettings":"Settings","connectedToast":"Connected","connectTo":{"apple_health":"Connect to Apple Health","health_connect":"Connect to Health Connect"},"browserOnly":"A web browser cannot access this data. The connection only works in the mobile app, where data is read automatically once you allow it. So this preview shows nothing here rather than made-up numbers.","errors":{"denied":"Data can't be read without permission. Allow it in your phone settings.","unavailable":"The health app isn't available on this phone. On Android, install Health Connect."}},"finder":{"ofDays":"{a} of {b}","percent":"{n}%","factors":{"pressure_drop":"Day with a pressure drop of 6 hPa or more","pressure_rise":"Day with a pressure rise of 6 hPa or more","humid":"Day with high humidity (85% or more)","temp_swing":"Day with a temperature change of 8 °C or more","short_sleep":"Night shorter than 6 hours","poor_sleep":"Night with poor sleep quality","high_steps":"Day with 12,000 steps or more","low_steps":"Day with fewer than 3,000 steps","period":"Days around your period"},"strength":{"strong":"Clearer difference","possible":"Possible pattern","none":"No clear difference","few":"Not enough data"},"fewFactor":"This has happened {n} times so far, which is too few to compare.","after":"Harder day afterwards","otherDays":"On other days","lead":"We compare how often a harder day came after a day with this factor and without it. A harder day is one with an episode or a symptom of intensity {intensity} or more.","summary":"In this period that's {hard} out of {days} in total.","notEnough":"So far you have {days} and {hard} recorded. Comparing needs at least 30 days and 5 harder days.","moreTitle":"What else to compare","more":{"weather":"Turn them on and we'll also compare pressure, humidity and temperature.","health":"Connect it and we'll also compare steps."},"loggedTitle":"What you marked during episodes","loggedLead":"You only record these triggers during episodes, so they can't be compared with days without symptoms. We only show how often they appear.","howTitle":"How we calculate this","howText":"We look for a harder day on the same day and the next day (for steps, only the next day). A day without entries counts as a day without symptoms; missing sleep or pressure is not filled in. We only flag a difference when it is unlikely to be due to chance.","disclaimer":"A possible pattern is not proof of a cause. Results can change as you add entries. If you want to change anything about your treatment, talk to your doctor.","toForecast":"Turn on weather alerts","moreRecords":"The more entries you add, the better the app can recognise recurring links between your symptoms and possible triggers. Treat the results as a rough guide, especially while you have only a few entries."},"forecast":{"today":"Today","tomorrow":"Tomorrow","signals":{"pressure_drop":"A pressure drop of {amount} hPa is forecast.","pressure_rise":"A pressure rise of {amount} hPa is forecast.","humid":"High humidity is forecast ({amount}%).","temp_swing":"A temperature change of {amount} °C is forecast."},"evidence":"From your entries: on similar days a harder day came in {a} of {b} cases, on other days in {c} of {d}.","evidenceFew":"There aren't enough of your entries yet to compare.","evidenceNone":"Your entries don't show a difference for this so far.","levels":{"change":"Notable change forecast","calm":"No major changes"},"cardTitle":"Weather change · {day}","factWeather":"Follows the forecast for pressure, humidity and temperature over the next days.","factRecords":"You choose which changes to be alerted about.","factNotify":"The evening before a day with a chosen change, it sends you an alert.","factOff":"You can turn this off at any time. Some people feel better without warnings.","offLead":"In the evening, lets you know when a notable weather change is forecast for the next day. You choose which changes.","disclaimer":"The alerts only report the weather forecast from meteorological models for your approximate location, and reality may differ. They say nothing about how you will feel and are not health advice. Don't change medication or treatment because of them.","enable":"Turn on weather alerts","calmText":"None of the changes we follow are forecast.","lead":"Notable weather changes for today and the next three days.","weatherOff":"Turn on weather and pressure","weatherOffHint":"Alerts need the weather forecast.","notifyTitle":"Notifications","notify":"Alert me ahead of time","notifyHint":"The evening before a day with a chosen change. Based on the forecast from when you last opened the app.","notifyTime":"When to alert me","previewLabel":"This is how the notification will look on your phone:","disable":"Turn off weather alerts","staleForecast":"The forecast is more than a day old, so we're not alerting from it right now. Check your internet connection.","nothingToNotify":"The current forecast gives nothing to alert you about right now.","alertsTitle":"What to alert me about","alerts":{"pressure_drop":"Pressure drop","pressure_rise":"Pressure rise","humid":"High humidity","temp_swing":"Sharp temperature change"},"alertsNone":"Choose at least one change, otherwise the app won't alert you about anything."},"stats":{"empty":"Statistics are built from your entries. Once you have recorded symptoms or episodes, you'll see them here.","noCompare":"no comparison","same":"same as before","less":"{value} less","more":"{value} more","compareTitle":"Compared with the previous period","compareLead":"The last {days} compared with the same length of time before.","symptomDaysValue":"days with symptoms: {n}","trendTitle":"Days with symptoms by month","trendLabel":"Column chart of the number of days with symptoms over the last 12 months.","colMonth":"Month","rhythmTitle":"When episodes start","rhythmLead":"{n} in total, by day of the week and part of the day.","parts":{"morning":"Morn.","afternoon":"Aft.","evening":"Eve.","night":"Night"},"cycleStart":"First day of your period","cycleOffset":"Day {n} from the start","cycleTitle":"Episodes around your period","cycleLead":"From {n} recorded periods. The app does not predict your next period.","colCycleDay":"Day","reliefTitle":"What brought relief most often","impactTitle":"What episodes limited most often","medValue":"{days} days with symptoms, {episodes} episodes per 30 days","medTitle":"Entries before and after a preventive medication","medLead":"Converted to 30 days.","medSince":"Since {date}, comparing {days} before and after","medBefore":"Before starting","medAfter":"After starting","medDisclaimer":"This only describes your entries and does not rate the medication. A change can have other causes. Make treatment decisions with your doctor."},"demoSymptoms":"In this sample the symptoms and episodes are made up, while the weather is real. Any link with pressure will only show from your own entries."}`),notifications:{channelReminders:`Daily reminder`,channelForecast:`Weather changes`,reminderBody:`How are you today? Note down how you feel.`,denied:`Your phone did not allow notifications. You can turn them on in the phone settings.`}}},Fr=[`sk`,`en`],Ir={sk:`sk-SK`,en:`en-GB`},Lr=`sk`;function Rr(e){Lr=Pr[e]?e:`sk`,document.documentElement.lang=Lr}var zr=()=>Ir[Lr];function Br(e,t){return t.split(`.`).reduce((e,t)=>e?.[t],e)}function Vr(e,t){return t?e.replace(/\{(\w+)\}/g,(e,n)=>t[n]??``):e}function Hr(e,t,n){let r=Br(Pr[e],t)??Br(Pr.sk,t);return typeof r==`string`?Vr(r,n):(console.warn(`[i18n] Chýba preklad: ${t}`),t)}var L=(e,t)=>Hr(Lr,e,t);function Ur(e,t){let n=new Intl.PluralRules(zr()).select(t),r=Br(Pr[Lr],e)??{};return Vr(r[n]??r.other??e,{n:t})}function Wr(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function Gr(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var Kr={autoSleep:120,force3D:`auto`,nullTargetWarn:1,units:{lineHeight:``}},qr={duration:.5,overwrite:!1,delay:0},Jr,Yr,R,Xr=1e8,z=1/Xr,Zr=Math.PI*2,Qr=Zr/4,$r=0,ei=Math.sqrt,ti=Math.cos,ni=Math.sin,ri=function(e){return typeof e==`string`},B=function(e){return typeof e==`function`},ii=function(e){return typeof e==`number`},ai=function(e){return e===void 0},oi=function(e){return typeof e==`object`},si=function(e){return e!==!1},ci=function(){return typeof window<`u`},li=function(e){return B(e)||ri(e)},ui=typeof ArrayBuffer==`function`&&ArrayBuffer.isView||function(){},di=Array.isArray,fi=/random\([^)]+\)/g,pi=/,\s*/g,mi=/(?:-?\.?\d|\.)+/gi,hi=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,gi=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,_i=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,vi=/[+-]=-?[.\d]+/,yi=/[^,'"\[\]\s]+/gi,bi=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,V,xi,Si,Ci,wi={},Ti={},Ei,Di=function(e){return(Ti=ia(e,wi))&&Ss},Oi=function(e,t){return console.warn(`Invalid property`,e,`set to`,t,`Missing plugin? gsap.registerPlugin()`)},ki=function(e,t){return!t&&console.warn(e)},Ai=function(e,t){return e&&(wi[e]=t)&&Ti&&(Ti[e]=t)||wi},ji=function(){return 0},Mi={suppressEvents:!0,isStart:!0,kill:!1},Ni={suppressEvents:!0,kill:!1},Pi={suppressEvents:!0},Fi={},Ii=[],Li={},Ri,zi={},Bi={},Vi=30,Hi=[],Ui=``,Wi=function(e){var t=e[0],n,r;if(oi(t)||B(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=Hi.length;r--&&!Hi[r].targetTest(t););n=Hi[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Mo(e[r],n)))||e.splice(r,1);return e},Gi=function(e){return e._gsap||Wi(Va(e))[0]._gsap},Ki=function(e,t,n){return(n=e[t])&&B(n)?e[t]():ai(n)&&e.getAttribute&&e.getAttribute(t)||n},qi=function(e,t){return(e=e.split(`,`)).forEach(t)||e},Ji=function(e){return Math.round(e*1e5)/1e5||0},H=function(e){return Math.round(e*1e7)/1e7||0},Yi=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n===`+`?e+r:n===`-`?e-r:n===`*`?e*r:e/r},Xi=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},Zi=function(){var e=Ii.length,t=Ii.slice(0),n,r;for(Li={},Ii.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Qi=function(e){return!!(e._initted||e._startAt||e.add)},$i=function(e,t,n,r){Ii.length&&!Yr&&Zi(),e.render(t,n,r||!!(Yr&&t<0&&Qi(e))),Ii.length&&!Yr&&Zi()},ea=function(e){var t=parseFloat(e);return(t||t===0)&&(e+``).match(yi).length<2?t:ri(e)?e.trim():e},ta=function(e){return e},na=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},ra=function(e){return function(t,n){for(var r in n)r in t||r===`duration`&&e||r===`ease`||(t[r]=n[r])}},ia=function(e,t){for(var n in t)e[n]=t[n];return e},aa=function e(t,n){for(var r in n)r!==`__proto__`&&r!==`constructor`&&r!==`prototype`&&(t[r]=oi(n[r])?e(t[r]||(t[r]={}),n[r]):n[r]);return t},oa=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},sa=function(e){var t=e.parent||V,n=e.keyframes?ra(di(e.keyframes)):na;if(si(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},ca=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},la=function(e,t,n,r,i){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var a=e[r],o;if(i)for(o=t[i];a&&a[i]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},ua=function(e,t,n,r){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var i=t._prev,a=t._next;i?i._next=a:e[n]===t&&(e[n]=a),a?a._prev=i:e[r]===t&&(e[r]=i),t._next=t._prev=t.parent=null},da=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},fa=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},pa=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},ma=function(e,t,n,r){return e._startAt&&(Yr?e._startAt.revert(Ni):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},ha=function e(t){return!t||t._ts&&e(t.parent)},ga=function(e){return e._repeat?_a(e._tTime,e=e.duration()+e._rDelay)*e:0},_a=function(e,t){var n=Math.floor(e=H(e/t));return e&&n===e?n-1:n},va=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},ya=function(e){return e._end=H(e._start+(e._tDur/Math.abs(e._ts||e._rts||z)||0))},ba=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=H(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),ya(e),n._dirty||fa(n,e)),e},xa=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=va(e.rawTime(),t),(!t._dur||Fa(0,t.totalDuration(),n)-t._tTime>z)&&t.render(n,!0)),fa(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-z}},Sa=function(e,t,n,r){return t.parent&&da(t),t._start=H((ii(n)?n:n||e!==V?Ma(e,n,t):e._time)+t._delay),t._end=H(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),la(e,t,`_first`,`_last`,e._sort?`_start`:0),Ea(t)||(e._recent=t),r||xa(e,t),e._ts<0&&ba(e,e._tTime),e},Ca=function(e,t){return(wi.ScrollTrigger||Oi(`scrollTrigger`,t))&&wi.ScrollTrigger.create(t,e)},wa=function(e,t,n,r,i){if(Vo(e,t,i),!e._initted)return 1;if(!n&&e._pt&&!Yr&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Ri!==yo.frame)return Ii.push(e),e._lazy=[i,r],1},Ta=function e(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||e(n))},Ea=function(e){var t=e.data;return t===`isFromStart`||t===`isStart`},Da=function(e,t,n,r){var i=e.ratio,a=t<0||!t&&(!e._start&&Ta(e)&&(e._initted||!Ea(e))||(e._ts<0||e._dp._ts<0)&&!Ea(e))?0:1,o=e._rDelay,s=0,c,l,u;if(o&&e._repeat&&(s=Fa(0,e._tDur,t),l=_a(s,o),e._yoyo&&l&1&&(a=1-a),l!==_a(e._tTime,o)&&(i=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==i||Yr||r||e._zTime===z||!t&&e._zTime){if(!e._initted&&wa(e,t,r,n,s))return;for(u=e._zTime,e._zTime=t||(n?z:0),n||=t&&!u,e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=s,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&ma(e,t,n,!0),e._onUpdate&&!n&&io(e,`onUpdate`),s&&e._repeat&&!n&&e.parent&&io(e,`onRepeat`),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&da(e,1),!n&&!Yr&&(io(e,a?`onComplete`:`onReverseComplete`,!0),e._prom&&e._prom()))}else e._zTime||=t},Oa=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data===`isPause`&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data===`isPause`&&r._start<t)return r;r=r._prev}},ka=function(e,t,n,r){var i=e._repeat,a=H(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=i?i<0?1e10:H(a*(i+1)+e._rDelay*i):a,o>0&&!r&&ba(e,e._tTime=e._tDur*o),e.parent&&ya(e),n||fa(e.parent,e),e},Aa=function(e){return e instanceof Po?fa(e):ka(e,e._dur)},ja={_start:0,endTime:ji,totalDuration:ji},Ma=function e(t,n,r){var i=t.labels,a=t._recent||ja,o=t.duration()>=Xr?a.endTime(!1):t._dur,s,c,l;return ri(n)&&(isNaN(n)||n in i)?(c=n.charAt(0),l=n.substr(-1)===`%`,s=n.indexOf(`=`),c===`<`||c===`>`?(s>=0&&(n=n.replace(/=/,``)),(c===`<`?a._start:a.endTime(a._repeat>=0))+(parseFloat(n.substr(1))||0)*(l?(s<0?a:r).totalDuration()/100:1)):s<0?(n in i||(i[n]=o),i[n]):(c=parseFloat(n.charAt(s-1)+n.substr(s+1)),l&&r&&(c=c/100*(di(r)?r[0]:r).totalDuration()),s>1?e(t,n.substr(0,s-1),r)+c:o+c)):n==null?o:+n},Na=function(e,t,n){var r=ii(t[1]),i=(r?2:1)+(e<2?0:1),a=t[i],o,s;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,s=n;s&&!(`immediateRender`in o);)o=s.vars.defaults||{},s=si(s.vars.inherit)&&s.parent;a.immediateRender=si(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[i-1]}return new Jo(t[0],a,t[i+1])},Pa=function(e,t){return e||e===0?t(e):t},Fa=function(e,t,n){return n<e?e:n>t?t:n},Ia=function(e,t){return!ri(e)||!(t=bi.exec(e))?``:t[1]},La=function(e,t,n){return Pa(n,function(n){return Fa(e,t,n)})},Ra=[].slice,za=function(e,t){return e&&oi(e)&&`length`in e&&(!t&&!e.length||e.length-1 in e&&oi(e[0]))&&!e.nodeType&&e!==xi},Ba=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(e){var r;return ri(e)&&!t||za(e,1)?(r=n).push.apply(r,Va(e)):n.push(e)})||n},Va=function(e,t,n){return R&&!t&&R.selector?R.selector(e):ri(e)&&!n&&(Si||!bo())?Ra.call((t||Ci).querySelectorAll(e),0):di(e)?Ba(e,n):za(e)?Ra.call(e,0):e?[e]:[]},Ha=function(e){return e=Va(e)[0]||ki(`Invalid scope`)||{},function(t){var n=e.current||e.nativeElement||e;return Va(t,n.querySelectorAll?n:n===e?ki(`Invalid scope`)||Ci.createElement(`div`):e)}},Ua=function(e){return e.sort(function(){return .5-Math.random()})},Wa=function(e){if(B(e))return e;var t=oi(e)?e:{each:e},n=Do(t.ease),r=t.from||0,i=parseFloat(t.base)||0,a={},o=r>0&&r<1,s=isNaN(r)||o,c=t.axis,l=r,u=r;return ri(r)?l=u={center:.5,edges:.5,end:1}[r]||0:!o&&s&&(l=r[0],u=r[1]),function(e,o,d){var f=(d||t).length,p=a[f],m,h,g,_,v,y,b,x,S;if(!p){if(S=t.grid===`auto`?0:(t.grid||[1,Xr])[1],!S){for(b=-Xr;b<(b=d[S++].getBoundingClientRect().left)&&S<f;);S<f&&S--}for(p=a[f]=[],m=s?Math.min(S,f)*l-.5:r%S,h=S===Xr?0:s?f*u/S-.5:r/S|0,b=0,x=Xr,y=0;y<f;y++)g=y%S-m,_=h-(y/S|0),p[y]=v=c?Math.abs(c===`y`?_:g):ei(g*g+_*_),v>b&&(b=v),v<x&&(x=v);r===`random`&&Ua(p),p.max=b-x,p.min=x,p.v=f=(parseFloat(t.amount)||parseFloat(t.each)*(S>f?f-1:c?c===`y`?f/S:S:Math.max(S,f/S))||0)*(r===`edges`?-1:1),p.b=f<0?i-f:i,p.u=Ia(t.amount||t.each)||0,n=n&&f<0?Eo(n):n}return f=(p[e]-p.min)/p.max||0,H(p.b+(n?n(f):f)*p.v)+p.u}},Ga=function(e){var t=10**((e+``).split(`.`)[1]||``).length;return function(n){var r=H(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(ii(n)?0:Ia(n))}},Ka=function(e,t){var n=di(e),r,i;return!n&&oi(e)&&(r=n=e.radius||Xr,e.values?(e=Va(e.values),(i=!ii(e[0]))&&(r*=r)):e=Ga(e.increment)),Pa(t,n?B(e)?function(t){return i=e(t),Math.abs(i-t)<=r?i:t}:function(t){for(var n=parseFloat(i?t.x:t),a=parseFloat(i?t.y:0),o=Xr,s=0,c=e.length,l,u;c--;)i?(l=e[c].x-n,u=e[c].y-a,l=l*l+u*u):l=Math.abs(e[c]-n),l<o&&(o=l,s=c);return s=!r||o<=r?e[s]:t,i||s===t||ii(t)?s:s+Ia(t)}:Ga(e))},qa=function(e,t,n,r){return Pa(di(e)?!t:n===!0?!!(n=0):!r,function(){return di(e)?e[~~(Math.random()*e.length)]:(n||=1e-5)&&(r=n<1?10**((n+``).length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},Ja=function(){var e=[...arguments];return function(t){return e.reduce(function(e,t){return t(e)},t)}},Ya=function(e,t){return function(n){return e(parseFloat(n))+(t||Ia(n))}},Xa=function(e,t,n){return to(e,t,0,1,n)},Za=function(e,t,n){return Pa(n,function(n){return e[~~t(n)]})},Qa=function e(t,n,r){var i=n-t;return di(t)?Za(t,e(0,t.length),n):Pa(r,function(e){return(i+(e-t)%i)%i+t})},$a=function e(t,n,r){var i=n-t,a=i*2;return di(t)?Za(t,e(0,t.length-1),n):Pa(r,function(e){return e=(a+(e-t)%a)%a||0,t+(e>i?a-e:e)})},eo=function(e){return e.replace(fi,function(e){var t=e.indexOf(`[`)+1,n=e.substring(t||7,t?e.indexOf(`]`):e.length-1).split(pi);return qa(t?n:+n[0],t?0:+n[1],+n[2]||1e-5)})},to=function(e,t,n,r,i){var a=t-e,o=r-n;return Pa(i,function(t){return n+((t-e)/a*o||0)})},no=function e(t,n,r,i){var a=isNaN(t+n)?0:function(e){return(1-e)*t+e*n};if(!a){var o=ri(t),s={},c,l,u,d,f;if(r===!0&&(i=1)&&(r=null),o)t={p:t},n={p:n};else if(di(t)&&!di(n)){for(u=[],d=t.length,f=d-2,l=1;l<d;l++)u.push(e(t[l-1],t[l]));d--,a=function(e){e*=d;var t=Math.min(f,~~e);return u[t](e-t)},r=n}else i||(t=ia(di(t)?[]:{},t));if(!u){for(c in n)Io.call(s,t,c,`get`,n[c]);a=function(e){return rs(e,s)||(o?t.p:t)}}}return Pa(r,a)},ro=function(e,t,n){var r=e.labels,i=Xr,a,o,s;for(a in r)o=r[a]-t,o<0==!!n&&o&&i>(o=Math.abs(o))&&(s=a,i=o);return s},io=function(e,t,n){var r=e.vars,i=r[t],a=R,o=e._ctx,s,c,l;if(i)return s=r[t+`Params`],c=r.callbackScope||e,n&&Ii.length&&Zi(),o&&(R=o),l=s?i.apply(c,s):i.call(c),R=a,l},ao=function(e){return da(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Yr),e.progress()<1&&io(e,`onInterrupt`),e},oo,so=[],co=function(e){if(e){if(e=!e.name&&e.default||e,ci()||e.headless){var t=e.name,n=B(e),r=t&&!n&&e.init?function(){this._props=[]}:e,i={init:ji,render:rs,add:Io,kill:as,modifier:is,rawVars:0},a={targetTest:0,get:0,getSetter:$o,aliases:{},register:0};if(bo(),e!==r){if(zi[t])return;na(r,na(oa(e,i),a)),ia(r.prototype,ia(i,oa(e,a))),zi[r.prop=t]=r,e.targetTest&&(Hi.push(r),Fi[t]=1),t=(t===`css`?`CSS`:t.charAt(0).toUpperCase()+t.substr(1))+`Plugin`}Ai(t,r),e.register&&e.register(Ss,r,cs)}else so.push(e)}},U=255,lo={aqua:[0,U,U],lime:[0,U,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,U],navy:[0,0,128],white:[U,U,U],olive:[128,128,0],yellow:[U,U,0],orange:[U,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[U,0,0],pink:[U,192,203],cyan:[0,U,U],transparent:[U,U,U,0]},uo=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*U+.5|0},fo=function(e,t,n){var r=e?ii(e)?[e>>16,e>>8&U,e&U]:0:lo.black,i,a,o,s,c,l,u,d,f,p;if(!r){if(e.substr(-1)===`,`&&(e=e.substr(0,e.length-1)),lo[e])r=lo[e];else if(e.charAt(0)===`#`){if(e.length<6&&(i=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e=`#`+i+i+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):``)),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&U,r&U,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&U,e&U]}else if(e.substr(0,3)===`hsl`){if(r=p=e.match(mi),!t)s=r[0]%360/360,c=r[1]/100,l=r[2]/100,a=l<=.5?l*(c+1):l+c-l*c,i=l*2-a,r.length>3&&(r[3]*=1),r[0]=uo(s+1/3,i,a),r[1]=uo(s,i,a),r[2]=uo(s-1/3,i,a);else if(~e.indexOf(`=`))return r=e.match(hi),n&&r.length<4&&(r[3]=1),r}else r=e.match(mi)||lo.transparent;r=r.map(Number)}return t&&!p&&(i=r[0]/U,a=r[1]/U,o=r[2]/U,u=Math.max(i,a,o),d=Math.min(i,a,o),l=(u+d)/2,u===d?s=c=0:(f=u-d,c=l>.5?f/(2-u-d):f/(u+d),s=u===i?(a-o)/f+(a<o?6:0):u===a?(o-i)/f+2:(i-a)/f+4,s*=60),r[0]=~~(s+.5),r[1]=~~(c*100+.5),r[2]=~~(l*100+.5)),n&&r.length<4&&(r[3]=1),r},po=function(e){var t=[],n=[],r=-1;return e.split(ho).forEach(function(e){var i=e.match(gi)||[];t.push.apply(t,i),n.push(r+=i.length+1)}),t.c=n,t},mo=function(e,t,n){var r=``,i=(e+r).match(ho),a=t?`hsla(`:`rgba(`,o=0,s,c,l,u;if(!i)return e;if(i=i.map(function(e){return(e=fo(e,t,1))&&a+(t?e[0]+`,`+e[1]+`%,`+e[2]+`%,`+e[3]:e.join(`,`))+`)`}),n&&(l=po(e),s=n.c,s.join(r)!==l.c.join(r)))for(c=e.replace(ho,`1`).split(gi),u=c.length-1;o<u;o++)r+=c[o]+(~s.indexOf(o)?i.shift()||a+`0,0,0,0)`:(l.length?l:i.length?i:n).shift());if(!c)for(c=e.split(ho),u=c.length-1;o<u;o++)r+=c[o]+i[o];return r+c[u]},ho=function(){var e=`(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b`,t;for(t in lo)e+=`|`+t+`\\b`;return RegExp(e+`)`,`gi`)}(),go=/hsl[a]?\(/,_o=function(e){var t=e.join(` `),n;if(ho.lastIndex=0,ho.test(t))return n=go.test(t),e[1]=mo(e[1],n),e[0]=mo(e[0],n,po(e[1])),!0},vo,yo=function(){var e=Date.now,t=500,n=33,r=e(),i=r,a=1e3/240,o=a,s=[],c,l,u,d,f,p,m=function u(m){var h=e()-i,g=m===!0,_,v,y,b;if((h>t||h<0)&&(r+=h-n),i+=h,y=i-r,_=y-o,(_>0||g)&&(b=++d.frame,f=y-d.time*1e3,d.time=y/=1e3,o+=_+(_>=a?4:a-_),v=1),g||(c=l(u)),v)for(p=0;p<s.length;p++)s[p](y,f,b,m)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(e){return f/(1e3/(e||60))},wake:function(){Ei&&(!Si&&ci()&&(xi=Si=window,Ci=xi.document||{},wi.gsap=Ss,(xi.gsapVersions||(xi.gsapVersions=[])).push(Ss.version),Di(Ti||xi.GreenSockGlobals||!xi.gsap&&xi||{}),so.forEach(co)),u=typeof requestAnimationFrame<`u`&&requestAnimationFrame,c&&d.sleep(),l=u||function(e){return setTimeout(e,o-d.time*1e3+1|0)},vo=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),vo=0,l=ji},lagSmoothing:function(e,r){t=e||1/0,n=Math.min(r||33,t)},fps:function(e){a=1e3/(e||240),o=d.time*1e3+a},add:function(e,t,n){var r=t?function(t,n,i,a){e(t,n,i,a),d.remove(r)}:e;return d.remove(e),s[n?`unshift`:`push`](r),bo(),r},remove:function(e,t){~(t=s.indexOf(e))&&s.splice(t,1)&&p>=t&&p--},_listeners:s},d}(),bo=function(){return!vo&&yo.wake()},W={},xo=/^[\d.\-M][\d.\-,\s]/,So=/["']/g,Co=function(e){for(var t={},n=e.substr(1,e.length-3).split(`:`),r=n[0],i=1,a=n.length,o,s,c;i<a;i++)s=n[i],o=i===a-1?s.length:s.lastIndexOf(`,`),c=s.substr(0,o),t[r]=isNaN(c)?c.replace(So,``).trim():+c,r=s.substr(o+1).trim();return t},wo=function(e){var t=e.indexOf(`(`)+1,n=e.indexOf(`)`),r=e.indexOf(`(`,t);return e.substring(t,~r&&r<n?e.indexOf(`)`,n+1):n)},To=function(e){var t=(e+``).split(`(`),n=W[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf(`{`)?[Co(t[1])]:wo(e).split(`,`).map(ea)):W._CE&&xo.test(e)?W._CE(``,e):n},Eo=function(e){return function(t){return 1-e(1-t)}},Do=function(e,t){return e&&(B(e)?e:W[e]||To(e))||t},Oo=function(e,t,n,r){n===void 0&&(n=function(e){return 1-t(1-e)}),r===void 0&&(r=function(e){return e<.5?t(e*2)/2:1-t((1-e)*2)/2});var i={easeIn:t,easeOut:n,easeInOut:r},a;return qi(e,function(e){for(var t in W[e]=wi[e]=i,W[a=e.toLowerCase()]=n,i)W[a+(t===`easeIn`?`.in`:t===`easeOut`?`.out`:`.inOut`)]=W[e+`.`+t]=i[t]}),i},ko=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Ao=function e(t,n,r){var i=n>=1?n:1,a=(r||(t?.3:.45))/(n<1?n:1),o=a/Zr*(Math.asin(1/i)||0),s=function(e){return e===1?1:i*2**(-10*e)*ni((e-o)*a)+1},c=t===`out`?s:t===`in`?function(e){return 1-s(1-e)}:ko(s);return a=Zr/a,c.config=function(n,r){return e(t,n,r)},c},jo=function e(t,n){n===void 0&&(n=1.70158);var r=function(e){return e?--e*e*((n+1)*e+n)+1:0},i=t===`out`?r:t===`in`?function(e){return 1-r(1-e)}:ko(r);return i.config=function(n){return e(t,n)},i};qi(`Linear,Quad,Cubic,Quart,Quint,Strong`,function(e,t){var n=t<5?t+1:t;Oo(e+`,Power`+(n-1),t?function(e){return e**+n}:function(e){return e},function(e){return 1-(1-e)**n},function(e){return e<.5?(e*2)**n/2:1-((1-e)*2)**n/2})}),W.Linear.easeNone=W.none=W.Linear.easeIn,Oo(`Elastic`,Ao(`in`),Ao(`out`),Ao()),(function(e,t){var n=1/t,r=2*n,i=2.5*n,a=function(a){return a<n?e*a*a:a<r?e*(a-1.5/t)**2+.75:a<i?e*(a-=2.25/t)*a+.9375:e*(a-2.625/t)**2+.984375};Oo(`Bounce`,function(e){return 1-a(1-e)},a)})(7.5625,2.75),Oo(`Expo`,function(e){return 2**(10*(e-1))*e+e*e*e*e*e*e*(1-e)}),Oo(`Circ`,function(e){return-(ei(1-e*e)-1)}),Oo(`Sine`,function(e){return e===1?1:-ti(e*Qr)+1}),Oo(`Back`,jo(`in`),jo(`out`),jo()),W.SteppedEase=W.steps=wi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+ +!t,i=+!!t,a=1-z;return function(e){return((r*Fa(0,a,e)|0)+i)*n}}},qr.ease=W[`quad.out`],qi(`onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt`,function(e){return Ui+=e+`,`+e+`Params,`});var Mo=function(e,t){this.id=$r++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Ki,this.set=t?t.getSetter:$o},No=function(){function e(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,ka(this,+e.duration,1,1),this.data=e.data,R&&(this._ctx=R,R.data.push(this)),vo||yo.wake()}var t=e.prototype;return t.delay=function(e){return e||e===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+e-this._delay),this._delay=e,this):this._delay},t.duration=function(e){return arguments.length?this.totalDuration(this._repeat>0?e+(e+this._rDelay)*this._repeat:e):this.totalDuration()&&this._dur},t.totalDuration=function(e){return arguments.length?(this._dirty=0,ka(this,this._repeat<0?e:(e-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(e,t){if(bo(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for(ba(this,e),!n._dp||n.parent||xa(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&e<this._tDur||this._ts<0&&e>0||!this._tDur&&!e)&&Sa(this._dp,this,this._start-this._delay)}return(this._tTime!==e||!this._dur&&!t||this._initted&&Math.abs(this._zTime)===z||!this._initted&&this._dur&&e||!e&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=e),$i(this,e,t)),this},t.time=function(e,t){return arguments.length?this.totalTime(Math.min(this.totalDuration(),e+ga(this))%(this._dur+this._rDelay)||(e?this._dur:0),t):this._time},t.totalProgress=function(e,t){return arguments.length?this.totalTime(this.totalDuration()*e,t):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(e,t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-e:e)+ga(this),t):this.duration()?Math.min(1,this._time/this._dur):+(this.rawTime()>0)},t.iteration=function(e,t){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(e-1)*n,t):this._repeat?_a(this._tTime,n)+1:1},t.timeScale=function(e,t){if(!arguments.length)return this._rts===-z?0:this._rts;if(this._rts===e)return this;var n=this.parent&&this._ts?va(this.parent._time,this):this._tTime;return this._rts=+e||0,this._ts=this._ps||e===-z?0:this._rts,this.totalTime(Fa(-Math.abs(this._delay),this.totalDuration(),n),t!==!1),ya(this),pa(this)},t.paused=function(e){return arguments.length?(this._ps!==e&&(this._ps=e,e?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(bo(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==z&&(this._tTime-=z)))),this):this._ps},t.startTime=function(e){if(arguments.length){this._start=H(e);var t=this.parent||this._dp;return t&&(t._sort||!this.parent)&&Sa(t,this,this._start-this._delay),this}return this._start},t.endTime=function(e){return this._start+(si(e)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(e){var t=this.parent||this._dp;return t?e&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?va(t.rawTime(e),this):this._tTime:this._tTime},t.revert=function(e){e===void 0&&(e=Pi);var t=Yr;return Yr=e,Qi(this)&&(this.timeline&&this.timeline.revert(e),this.totalTime(-.01,e.suppressEvents)),this.data!==`nested`&&e.kill!==!1&&this.kill(),Yr=t,this},t.globalTime=function(e){for(var t=this,n=arguments.length?e:t.rawTime();t;)n=t._start+n/(Math.abs(t._ts)||1),t=t._dp;return!this.parent&&this._sat?this._sat.globalTime(e):n},t.repeat=function(e){return arguments.length?(this._repeat=e===1/0?-2:e,Aa(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(e){if(arguments.length){var t=this._time;return this._rDelay=e,Aa(this),t?this.time(t):this}return this._rDelay},t.yoyo=function(e){return arguments.length?(this._yoyo=e,this):this._yoyo},t.seek=function(e,t){return this.totalTime(Ma(this,e),si(t))},t.restart=function(e,t){return this.play().totalTime(e?-this._delay:0,si(t)),this._dur||(this._zTime=-z),this},t.play=function(e,t){return e!=null&&this.seek(e,t),this.reversed(!1).paused(!1)},t.reverse=function(e,t){return e!=null&&this.seek(e||this.totalDuration(),t),this.reversed(!0).paused(!1)},t.pause=function(e,t){return e!=null&&this.seek(e,t),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(e){return arguments.length?(!!e!==this.reversed()&&this.timeScale(-this._rts||(e?-z:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-z,this},t.isActive=function(){var e=this.parent||this._dp,t=this._start,n;return!!(!e||this._ts&&this._initted&&e.isActive()&&(n=e.rawTime(!0))>=t&&n<this.endTime(!0)-z)},t.eventCallback=function(e,t,n){var r=this.vars;return arguments.length>1?(t?(r[e]=t,n&&(r[e+`Params`]=n),e===`onUpdate`&&(this._onUpdate=t)):delete r[e],this):r[e]},t.then=function(e){var t=this,n=t._prom;return new Promise(function(r){var i=B(e)?e:ta,a=function(){var e=t.then;t.then=null,n&&n(),B(i)&&(i=i(t))&&(i.then||i===t)&&(t.then=e),r(i),t.then=e};t._initted&&t.totalProgress()===1&&t._ts>=0||!t._tTime&&t._ts<0?a():t._prom=a})},t.kill=function(){ao(this)},e}();na(No.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-z,_prom:0,_ps:!1,_rts:1});var Po=function(e){Gr(t,e);function t(t,n){var r;return t===void 0&&(t={}),r=e.call(this,t)||this,r.labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=si(t.sortChildren),V&&Sa(t.parent||V,Wr(r),n),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&Ca(Wr(r),t.scrollTrigger),r}var n=t.prototype;return n.to=function(e,t,n){return Na(0,arguments,this),this},n.from=function(e,t,n){return Na(1,arguments,this),this},n.fromTo=function(e,t,n,r){return Na(2,arguments,this),this},n.set=function(e,t,n){return t.duration=0,t.parent=this,sa(t).repeatDelay||(t.repeat=0),t.immediateRender=!!t.immediateRender,new Jo(e,t,Ma(this,n),1),this},n.call=function(e,t,n){return Sa(this,Jo.delayedCall(0,e,t),n)},n.staggerTo=function(e,t,n,r,i,a,o){return n.duration=t,n.stagger=n.stagger||r,n.onComplete=a,n.onCompleteParams=o,n.parent=this,new Jo(e,n,Ma(this,i)),this},n.staggerFrom=function(e,t,n,r,i,a,o){return n.runBackwards=1,sa(n).immediateRender=si(n.immediateRender),this.staggerTo(e,t,n,r,i,a,o)},n.staggerFromTo=function(e,t,n,r,i,a,o,s){return r.startAt=n,sa(r).immediateRender=si(r.immediateRender),this.staggerTo(e,t,r,i,a,o,s)},n.render=function(e,t,n){var r=this._time,i=this._dirty?this.totalDuration():this._tDur,a=this._dur,o=e<=0?0:H(e),s=this._zTime<0!=e<0&&(this._initted||!a),c,l,u,d,f,p,m,h,g,_,v,y;if(this!==V&&o>i&&e>=0&&(o=i),o!==this._tTime||n||s){if(r!==this._time&&a&&(o+=this._time-r,e+=this._time-r),c=o,g=this._start,h=this._ts,p=!h,s&&(a||(r=this._zTime),(e||!t)&&(this._zTime=e)),this._repeat){if(v=this._yoyo,f=a+this._rDelay,this._repeat<-1&&e<0)return this.totalTime(f*100+e,t,n);if(c=H(o%f),o===i?(d=this._repeat,c=a):(_=H(o/f),d=~~_,d&&d===_&&(c=a,d--),c>a&&(c=a)),_=_a(this._tTime,f),!r&&this._tTime&&_!==d&&this._tTime-_*f-this._dur<=0&&(_=d),v&&d&1&&(c=a-c,y=1),d!==_&&!this._lock){var b=v&&_&1,x=b===(v&&d&1);if(d<_&&(b=!b),r=b?0:o%a?a:o,this._lock=1,this.render(r||(y?0:H(d*f)),t,!a)._lock=0,this._tTime=o,!t&&this.parent&&io(this,`onRepeat`),this.vars.repeatRefresh&&!y&&(this.invalidate()._lock=1,_=d),r&&r!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act||(a=this._dur,i=this._tDur,x&&(this._lock=2,r=b?a:-1e-4,this.render(r,!0),this.vars.repeatRefresh&&!y&&this.invalidate()),this._lock=0,!this._ts&&!p))return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(m=Oa(this,H(r),H(c)),m&&(o-=c-(c=m._start))),this._tTime=o,this._time=c,this._act=!!h,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=e,r=0),!r&&o&&a&&!t&&!_&&(io(this,`onStart`),this._tTime!==o))return this;if(c>=r&&e>=0)for(l=this._first;l;){if(u=l._next,(l._act||c>=l._start)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(c-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(c-l._start)*l._ts,t,n),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=-z);break}}l=u}else{l=this._last;for(var S=e<0?e:c;l;){if(u=l._prev,(l._act||S<=l._end)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(S-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(S-l._start)*l._ts,t,n||Yr&&Qi(l)),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=S?-z:z);break}}l=u}}if(m&&!t&&(this.pause(),m.render(c>=r?0:-z)._zTime=c>=r?1:-1,this._ts))return this._start=g,ya(this),this.render(e,t,n);this._onUpdate&&!t&&io(this,`onUpdate`,!0),(o===i&&this._tTime>=this.totalDuration()||!o&&r)&&(g===this._start||Math.abs(h)!==Math.abs(this._ts))&&(this._lock||((e||!a)&&(o===i&&this._ts>0||!o&&this._ts<0)&&da(this,1),!t&&!(e<0&&!r)&&(o||r||!i)&&(io(this,o===i&&e>=0?`onComplete`:`onReverseComplete`,!0),this._prom&&!(o<i&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(e,t){var n=this;if(ii(t)||(t=Ma(this,t,e)),!(e instanceof No)){if(di(e))return e.forEach(function(e){return n.add(e,t)}),this;if(ri(e))return this.addLabel(e,t);if(B(e))e=Jo.delayedCall(0,e);else return this}return this===e?this:Sa(this,e,t)},n.getChildren=function(e,t,n,r){e===void 0&&(e=!0),t===void 0&&(t=!0),n===void 0&&(n=!0),r===void 0&&(r=-Xr);for(var i=[],a=this._first;a;)a._start>=r&&(a instanceof Jo?t&&i.push(a):(n&&i.push(a),e&&i.push.apply(i,a.getChildren(!0,t,n)))),a=a._next;return i},n.getById=function(e){for(var t=this.getChildren(1,1,1),n=t.length;n--;)if(t[n].vars.id===e)return t[n]},n.remove=function(e){return ri(e)?this.removeLabel(e):B(e)?this.killTweensOf(e):(e.parent===this&&ua(this,e),e===this._recent&&(this._recent=this._last),fa(this))},n.totalTime=function(t,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=H(yo.time-(this._ts>0?t/this._ts:(this.totalDuration()-t)/-this._ts))),e.prototype.totalTime.call(this,t,n),this._forcing=0,this):this._tTime},n.addLabel=function(e,t){return this.labels[e]=Ma(this,t),this},n.removeLabel=function(e){return delete this.labels[e],this},n.addPause=function(e,t,n){var r=Jo.delayedCall(0,t||ji,n);return r.data=`isPause`,this._hasPause=1,Sa(this,r,Ma(this,e))},n.removePause=function(e){var t=this._first;for(e=Ma(this,e);t;)t._start===e&&t.data===`isPause`&&da(t),t=t._next},n.killTweensOf=function(e,t,n){for(var r=this.getTweensOf(e,n),i=r.length;i--;)zo!==r[i]&&r[i].kill(e,t);return this},n.getTweensOf=function(e,t){for(var n=[],r=Va(e),i=this._first,a=ii(t),o;i;)i instanceof Jo?Xi(i._targets,r)&&(a?(!zo||i._initted&&i._ts)&&i.globalTime(0)<=t&&i.globalTime(i.totalDuration())>t:!t||i.isActive())&&n.push(i):(o=i.getTweensOf(r,t)).length&&n.push.apply(n,o),i=i._next;return n},n.tweenTo=function(e,t){t||={};var n=this,r=Ma(n,e),i=t,a=i.startAt,o=i.onStart,s=i.onStartParams,c=i.immediateRender,l,u=Jo.to(n,na({ease:t.ease||`none`,lazy:!1,immediateRender:!1,time:r,overwrite:`auto`,duration:t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale())||z,onStart:function(){if(n.pause(),!l){var e=t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale());u._dur!==e&&ka(u,e,0,1).render(u._time,!0,!0),l=1}o&&o.apply(u,s||[])}},t));return c?u.render(0):u},n.tweenFromTo=function(e,t,n){return this.tweenTo(t,na({startAt:{time:Ma(this,e)}},n))},n.recent=function(){return this._recent},n.nextLabel=function(e){return e===void 0&&(e=this._time),ro(this,Ma(this,e))},n.previousLabel=function(e){return e===void 0&&(e=this._time),ro(this,Ma(this,e),1)},n.currentLabel=function(e){return arguments.length?this.seek(e,!0):this.previousLabel(this._time+z)},n.shiftChildren=function(e,t,n){n===void 0&&(n=0);var r=this._first,i=this.labels,a;for(e=H(e);r;)r._start>=n&&(r._start+=e,r._end+=e),r=r._next;if(t)for(a in i)i[a]>=n&&(i[a]+=e);return fa(this)},n.invalidate=function(t){var n=this._first;for(this._lock=0;n;)n.invalidate(t),n=n._next;return e.prototype.invalidate.call(this,t)},n.clear=function(e){e===void 0&&(e=!0);for(var t=this._first,n;t;)n=t._next,this.remove(t),t=n;return this._dp&&(this._time=this._tTime=this._pTime=0),e&&(this.labels={}),fa(this)},n.totalDuration=function(e){var t=0,n=this,r=n._last,i=Xr,a,o,s;if(arguments.length)return n.timeScale((n._repeat<0?n.duration():n.totalDuration())/(n.reversed()?-e:e));if(n._dirty){for(s=n.parent;r;)a=r._prev,r._dirty&&r.totalDuration(),o=r._start,o>i&&n._sort&&r._ts&&!n._lock?(n._lock=1,Sa(n,r,o-r._delay,1)._lock=0):i=o,o<0&&r._ts&&(t-=o,(!s&&!n._dp||s&&s.smoothChildTiming)&&(n._start+=H(o/n._ts),n._time-=o,n._tTime-=o),n.shiftChildren(-o,!1,-1/0),i=0),r._end>t&&r._ts&&(t=r._end),r=a;ka(n,n===V&&n._time>t?n._time:t,1,1),n._dirty=0}return n._tDur},t.updateRoot=function(e){if(V._ts&&($i(V,va(e,V)),Ri=yo.frame),yo.frame>=Vi){Vi+=Kr.autoSleep||120;var t=V._first;if((!t||!t._ts)&&Kr.autoSleep&&yo._listeners.length<2){for(;t&&!t._ts;)t=t._next;t||yo.sleep()}}},t}(No);na(Po.prototype,{_lock:0,_hasPause:0,_forcing:0});var Fo=function(e,t,n,r,i,a,o){var s=new cs(this._pt,e,t,0,1,ns,null,i),c=0,l=0,u,d,f,p,m,h,g,_;for(s.b=n,s.e=r,n+=``,r+=``,(g=~r.indexOf(`random(`))&&(r=eo(r)),a&&(_=[n,r],a(_,e,t),n=_[0],r=_[1]),d=n.match(_i)||[];u=_i.exec(r);)p=u[0],m=r.substring(c,u.index),f?f=(f+1)%5:m.substr(-5)===`rgba(`&&(f=1),p!==d[l++]&&(h=parseFloat(d[l-1])||0,s._pt={_next:s._pt,p:m||l===1?m:`,`,s:h,c:p.charAt(1)===`=`?Yi(h,p)-h:parseFloat(p)-h,m:f&&f<4?Math.round:0},c=_i.lastIndex);return s.c=c<r.length?r.substring(c,r.length):``,s.fp=o,(vi.test(r)||g)&&(s.e=0),this._pt=s,s},Io=function(e,t,n,r,i,a,o,s,c,l){B(r)&&(r=r(i||0,e,a));var u=e[t],d=n===`get`?B(u)?c?e[t.indexOf(`set`)||!B(e[`get`+t.substr(3)])?t:`get`+t.substr(3)](c):e[t]():u:n,f=B(u)?c?Zo:Xo:Yo,p;if(ri(r)&&(~r.indexOf(`random(`)&&(r=eo(r)),r.charAt(1)===`=`&&(p=Yi(d,r)+(Ia(d)||0),(p||p===0)&&(r=p))),!l||d!==r||Bo)return!isNaN(d*r)&&r!==``?(p=new cs(this._pt,e,t,+d||0,r-(d||0),typeof u==`boolean`?ts:es,0,f),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!u&&!(t in e)&&Oi(t,r),Fo.call(this,e,t,d,r,f,s||Kr.stringFilter,c))},Lo=function(e,t,n,r,i){if(B(e)&&(e=Go(e,i,t,n,r)),!oi(e)||e.style&&e.nodeType||di(e)||ui(e))return ri(e)?Go(e,i,t,n,r):e;var a={},o;for(o in e)a[o]=Go(e[o],i,t,n,r);return a},Ro=function(e,t,n,r,i,a){var o,s,c,l;if(zi[e]&&(o=new zi[e]).init(i,o.rawVars?t[e]:Lo(t[e],r,i,a,n),n,r,a)!==!1&&(n._pt=s=new cs(n._pt,i,e,0,1,o.render,o,0,o.priority),n!==oo))for(c=n._ptLookup[n._targets.indexOf(i)],l=o._props.length;l--;)c[o._props[l]]=s;return o},zo,Bo,Vo=function e(t,n,r){var i=t.vars,a=i.ease,o=i.startAt,s=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,p=i.autoRevert,m=t._dur,h=t._startAt,g=t._targets,_=t.parent,v=_&&_.data===`nested`?_.vars.targets:g,y=t._overwrite===`auto`&&!Jr,b=t.timeline,x=i.easeReverse||d,S,C,w,T,E,D,ee,te,O,ne,k,re,ie;if(b&&(!f||!a)&&(a=`none`),t._ease=Do(a,qr.ease),t._rEase=x&&(Do(x)||t._ease),t._from=!b&&!!i.runBackwards,t._from&&(t.ratio=1),!b||f&&!i.stagger){if(te=g[0]?Gi(g[0]).harness:0,re=te&&i[te.prop],S=oa(i,Fi),h&&(h._zTime<0&&h.progress(1),n<0&&u&&s&&!p?h.render(-1,!0):h.revert(u&&m?Ni:Mi),h._lazy=0),o){if(da(t._startAt=Jo.set(g,na({data:`isStart`,overwrite:!1,parent:_,immediateRender:!0,lazy:!h&&si(c),startAt:null,delay:0,onUpdate:l&&function(){return io(t,`onUpdate`)},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,n<0&&(Yr||!s&&!p)&&t._startAt.revert(Ni),s&&m&&n<=0&&r<=0){n&&(t._zTime=n);return}}else if(u&&m&&!h){if(n&&(s=!1),w=na({overwrite:!1,data:`isFromStart`,lazy:s&&!h&&si(c),immediateRender:s,stagger:0,parent:_},S),re&&(w[te.prop]=re),da(t._startAt=Jo.set(g,w)),t._startAt._dp=0,t._startAt._sat=t,n<0&&(Yr?t._startAt.revert(Ni):t._startAt.render(-1,!0)),t._zTime=n,!s)e(t._startAt,z,z);else if(!n)return}for(t._pt=t._ptCache=0,c=m&&si(c)||c&&!m,C=0;C<g.length;C++){if(E=g[C],ee=E._gsap||Wi(g)[C]._gsap,t._ptLookup[C]=ne={},Li[ee.id]&&Ii.length&&Zi(),k=v===g?C:v.indexOf(E),te&&(O=new te).init(E,re||S,t,k,v)!==!1&&(t._pt=T=new cs(t._pt,E,O.name,0,1,O.render,O,0,O.priority),O._props.forEach(function(e){ne[e]=T}),O.priority&&(D=1)),!te||re)for(w in S)zi[w]&&(O=Ro(w,S,t,k,E,v))?O.priority&&(D=1):ne[w]=T=Io.call(t,E,w,`get`,S[w],k,v,0,i.stringFilter);t._op&&t._op[C]&&t.kill(E,t._op[C]),y&&t._pt&&(zo=t,V.killTweensOf(E,ne,t.globalTime(n)),ie=!t.parent,zo=0),t._pt&&c&&(Li[ee.id]=1)}D&&ss(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!ie,f&&n<=0&&b.render(Xr,!0,!0)},Ho=function(e,t,n,r,i,a,o,s){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],l,u,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(l=d[f][t],l&&l.d&&l.d._pt)for(l=l.d._pt;l&&l.p!==t&&l.fp!==t;)l=l._next;if(!l)return Bo=1,e.vars[t]=`+=0`,Vo(e,o),Bo=0,s?ki(t+` not eligible for reset. Try splitting into individual properties`):1;c.push(l)}for(f=c.length;f--;)u=c[f],l=u._pt||u,l.s=(r||r===0)&&!i?r:l.s+(r||0)+a*l.c,l.c=n-l.s,u.e&&(u.e=Ji(n)+Ia(u.e)),u.b&&(u.b=l.s+Ia(u.b))},Uo=function(e,t){var n=e[0]?Gi(e[0]).harness:0,r=n&&n.aliases,i,a,o,s;if(!r)return t;for(a in i=ia({},t),r)if(a in i)for(s=r[a].split(`,`),o=s.length;o--;)i[s[o]]=i[a];return i},Wo=function(e,t,n,r){var i=t.ease||r||`power1.inOut`,a,o;if(di(t))o=n[e]||(n[e]=[]),t.forEach(function(e,n){return o.push({t:n/(t.length-1)*100,v:e,e:i})});else for(a in t)o=n[a]||(n[a]=[]),a===`ease`||o.push({t:parseFloat(e),v:t[a],e:i})},Go=function(e,t,n,r,i){return B(e)?e.call(t,n,r,i):ri(e)&&~e.indexOf(`random(`)?eo(e):e},Ko=Ui+`repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert`,qo={};qi(Ko+`,id,stagger,delay,duration,paused,scrollTrigger`,function(e){return qo[e]=1});var Jo=function(e){Gr(t,e);function t(t,n,r,i){var a;typeof n==`number`&&(r.duration=n,n=r,r=null),a=e.call(this,i?n:sa(n))||this;var o=a.vars,s=o.duration,c=o.delay,l=o.immediateRender,u=o.stagger,d=o.overwrite,f=o.keyframes,p=o.defaults,m=o.scrollTrigger,h=n.parent||V,g=(di(t)||ui(t)?ii(t[0]):`length`in n)?[t]:Va(t),_,v,y,b,x,S,C,w;if(a._targets=g.length?Wi(g):ki(`GSAP target `+t+` not found. https://gsap.com`,!Kr.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,f||u||li(s)||li(c)){n=a.vars;var T=n.easeReverse||n.yoyoEase;if(_=a.timeline=new Po({data:`nested`,defaults:p||{},targets:h&&h.data===`nested`?h.vars.targets:g}),_.kill(),_.parent=_._dp=Wr(a),_._start=0,u||li(s)||li(c)){if(b=g.length,C=u&&Wa(u),oi(u))for(x in u)~Ko.indexOf(x)&&(w||={},w[x]=u[x]);for(v=0;v<b;v++)y=oa(n,qo),y.stagger=0,T&&(y.easeReverse=T),w&&ia(y,w),S=g[v],y.duration=+Go(s,Wr(a),v,S,g),y.delay=(+Go(c,Wr(a),v,S,g)||0)-a._delay,!u&&b===1&&y.delay&&(a._delay=c=y.delay,a._start+=c,y.delay=0),_.to(S,y,C?C(v,S,g):0),_._ease=W.none;_.duration()?s=c=0:a.timeline=0}else if(f){sa(na(_.vars.defaults,{ease:`none`})),_._ease=Do(f.ease||n.ease||`none`);var E=0,D,ee,te;if(di(f))f.forEach(function(e){return _.to(g,e,`>`)}),_.duration();else{for(x in y={},f)x===`ease`||x===`easeEach`||Wo(x,f[x],y,f.easeEach);for(x in y)for(D=y[x].sort(function(e,t){return e.t-t.t}),E=0,v=0;v<D.length;v++)ee=D[v],te={ease:ee.e,duration:(ee.t-(v?D[v-1].t:0))/100*s},te[x]=ee.v,_.to(g,te,E),E+=te.duration;_.duration()<s&&_.to({},{duration:s-_.duration()})}}s||a.duration(s=_.duration())}else a.timeline=0;return d===!0&&!Jr&&(zo=Wr(a),V.killTweensOf(g),zo=0),Sa(h,Wr(a),r),n.reversed&&a.reverse(),n.paused&&a.paused(!0),(l||!s&&!f&&a._start===H(h._time)&&si(l)&&ha(Wr(a))&&h.data!==`nested`)&&(a._tTime=-z,a.render(Math.max(0,-c)||0)),m&&Ca(Wr(a),m),a}var n=t.prototype;return n.render=function(e,t,n){var r=this._time,i=this._tDur,a=this._dur,o=e<0,s=e>i-z&&!o?i:e<z?0:e,c,l,u,d,f,p,m,h;if(!a)Da(this,e,t,n);else if(s!==this._tTime||!e||n||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==o||this._lazy){if(c=s,h=this.timeline,this._repeat){if(d=a+this._rDelay,this._repeat<-1&&o)return this.totalTime(d*100+e,t,n);if(c=H(s%d),s===i?(u=this._repeat,c=a):(f=H(s/d),u=~~f,u&&u===f?(c=a,u--):c>a&&(c=a)),p=this._yoyo&&u&1,p&&(c=a-c),f=_a(this._tTime,d),c===r&&!n&&this._initted&&u===f)return this._tTime=s,this;u!==f&&this.vars.repeatRefresh&&!p&&!this._lock&&c!==d&&this._initted&&(this._lock=n=1,this.render(H(d*u),!0).invalidate()._lock=0)}if(!this._initted){if(wa(this,o?e:c,n,t,s))return this._tTime=0,this;if(r!==this._time&&!(n&&this.vars.repeatRefresh&&u!==f))return this;if(a!==this._dur)return this.render(e,t,n)}if(this._rEase){var g=c<r;if(g!==this._inv){var _=g?r:a-r;this._inv=g,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=r,this._invRecip=_?(g?-1:1)/_:0,this._invScale=g?-this.ratio:1-this.ratio,this._invEase=g?this._rEase:this._ease}this.ratio=m=this._invRatio+this._invScale*this._invEase((c-this._invTime)*this._invRecip)}else this.ratio=m=this._ease(c/a);if(this._from&&(this.ratio=m=1-m),this._tTime=s,this._time=c,!this._act&&this._ts&&(this._act=1,this._lazy=0),!r&&s&&!t&&!f&&(io(this,`onStart`),this._tTime!==s))return this;for(l=this._pt;l;)l.r(m,l.d),l=l._next;h&&h.render(e<0?e:h._dur*h._ease(c/this._dur),t,n)||this._startAt&&(this._zTime=e),this._onUpdate&&!t&&(o&&ma(this,e,t,n),io(this,`onUpdate`)),this._repeat&&u!==f&&this.vars.onRepeat&&!t&&this.parent&&io(this,`onRepeat`),(s===this._tDur||!s)&&this._tTime===s&&(o&&!this._onUpdate&&ma(this,e,!0,!0),(e||!a)&&(s===this._tDur&&this._ts>0||!s&&this._ts<0)&&da(this,1),!t&&(!o||r)&&(s||r||p)&&(io(this,s===i?`onComplete`:`onReverseComplete`,!0),this._prom&&!(s<i&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(t){return(!t||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),e.prototype.invalidate.call(this,t)},n.resetTo=function(e,t,n,r,i){vo||yo.wake(),this._ts||this.play();var a=Math.min(this._dur,(this._dp._time-this._start)*this._ts),o;return this._initted||Vo(this,a),o=this._ease(a/this._dur),Ho(this,e,t,n,r,o,a,i)?this.resetTo(e,t,n,r,1):(ba(this,0),this.parent||la(this._dp,this,`_first`,`_last`,this._dp._sort?`_start`:0),this.render(0))},n.kill=function(e,t){if(t===void 0&&(t=`all`),!e&&(!t||t===`all`))return this._lazy=this._pt=0,this.parent?ao(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Yr),this;if(this.timeline){var n=this.timeline.totalDuration();return this.timeline.killTweensOf(e,t,zo&&zo.vars.overwrite!==!0)._first||ao(this),this.parent&&n!==this.timeline.totalDuration()&&ka(this,this._dur*this.timeline._tDur/n,0,1),this}var r=this._targets,i=e?Va(e):r,a=this._ptLookup,o=this._pt,s,c,l,u,d,f,p;if((!t||t===`all`)&&ca(r,i))return t===`all`&&(this._pt=0),ao(this);for(s=this._op=this._op||[],t!==`all`&&(ri(t)&&(d={},qi(t,function(e){return d[e]=1}),t=d),t=Uo(r,t)),p=r.length;p--;)if(~i.indexOf(r[p]))for(d in c=a[p],t===`all`?(s[p]=t,u=c,l={}):(l=s[p]=s[p]||{},u=t),u)f=c&&c[d],f&&((!(`kill`in f.d)||f.d.kill(d)===!0)&&ua(this,f,`_pt`),delete c[d]),l!==`all`&&(l[d]=1);return this._initted&&!this._pt&&o&&ao(this),this},t.to=function(e,n){return new t(e,n,arguments[2])},t.from=function(e,t){return Na(1,arguments)},t.delayedCall=function(e,n,r,i){return new t(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:e,onComplete:n,onReverseComplete:n,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},t.fromTo=function(e,t,n){return Na(2,arguments)},t.set=function(e,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new t(e,n)},t.killTweensOf=function(e,t,n){return V.killTweensOf(e,t,n)},t}(No);na(Jo.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),qi(`staggerTo,staggerFrom,staggerFromTo`,function(e){Jo[e]=function(){var t=new Po,n=Ra.call(arguments,0);return n.splice(e===`staggerFromTo`?5:4,0,0),t[e].apply(t,n)}});var Yo=function(e,t,n){return e[t]=n},Xo=function(e,t,n){return e[t](n)},Zo=function(e,t,n,r){return e[t](r.fp,n)},Qo=function(e,t,n){return e.setAttribute(t,n)},$o=function(e,t){return B(e[t])?Xo:ai(e[t])&&e.setAttribute?Qo:Yo},es=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},ts=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},ns=function(e,t){var n=t._pt,r=``;if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},rs=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},is=function(e,t,n,r){for(var i=this._pt,a;i;)a=i._next,i.p===r&&i.modifier(e,t,n),i=a},as=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?ua(this,t,`_pt`):t.dep||(n=1),t=r;return!n},os=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},ss=function(e){for(var t=e._pt,n,r,i,a;t;){for(n=t._next,r=i;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:i=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=i},cs=function(){function e(e,t,n,r,i,a,o,s,c){this.t=t,this.s=r,this.c=i,this.p=n,this.r=a||es,this.d=o||this,this.set=s||Yo,this.pr=c||0,this._next=e,e&&(e._prev=this)}var t=e.prototype;return t.modifier=function(e,t,n){this.mSet=this.mSet||this.set,this.set=os,this.m=e,this.mt=n,this.tween=t},e}();qi(Ui+`parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse`,function(e){return Fi[e]=1}),wi.TweenMax=wi.TweenLite=Jo,wi.TimelineLite=wi.TimelineMax=Po,V=new Po({sortChildren:!1,defaults:qr,autoRemoveChildren:!0,id:`root`,smoothChildTiming:!0}),Kr.stringFilter=_o;var ls=[],us={},ds=[],fs=0,ps=0,ms=function(e){return(us[e]||ds).map(function(e){return e()})},hs=function(){var e=Date.now(),t=[];e-fs>2&&(ms(`matchMediaInit`),ls.forEach(function(e){var n=e.queries,r=e.conditions,i,a,o,s;for(a in n)i=xi.matchMedia(n[a]).matches,i&&(o=1),i!==r[a]&&(r[a]=i,s=1);s&&(e.revert(),o&&t.push(e))}),ms(`matchMediaRevert`),t.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),fs=e,ms(`matchMedia`))},gs=function(){function e(e,t){this.selector=t&&Ha(t),this.data=[],this._r=[],this.isReverted=!1,this.id=ps++,e&&this.add(e)}var t=e.prototype;return t.add=function(e,t,n){B(e)&&(n=t,t=e,e=B);var r=this,i=function(){var e=R,i=r.selector,a;return e&&e!==r&&e.data.push(r),n&&(r.selector=Ha(n)),R=r,a=t.apply(r,arguments),B(a)&&r._r.push(a),R=e,r.selector=i,r.isReverted=!1,a};return r.last=i,e===B?i(r,function(e){return r.add(null,e)}):e?r[e]=i:i},t.ignore=function(e){var t=R;R=null,e(this),R=t},t.getTweens=function(){var t=[];return this.data.forEach(function(n){return n instanceof e?t.push.apply(t,n.getTweens()):n instanceof Jo&&!(n.parent&&n.parent.data===`nested`)&&t.push(n)}),t},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(e,t){var n=this;if(e?(function(){for(var t=n.getTweens(),r=n.data.length,i;r--;)i=n.data[r],i.data===`isFlip`&&(i.revert(),i.getChildren(!0,!0,!1).forEach(function(e){return t.splice(t.indexOf(e),1)}));for(t.map(function(e){return{g:e._dur||e._delay||e._sat&&!e._sat.vars.immediateRender?e.globalTime(0):-1/0,t:e}}).sort(function(e,t){return t.g-e.g||-1/0}).forEach(function(t){return t.t.revert(e)}),r=n.data.length;r--;)i=n.data[r],i instanceof Po?i.data!==`nested`&&(i.scrollTrigger&&i.scrollTrigger.revert(),i.kill()):!(i instanceof Jo)&&i.revert&&i.revert(e);n._r.forEach(function(t){return t(e,n)}),n.isReverted=!0})():this.data.forEach(function(e){return e.kill&&e.kill()}),this.clear(),t)for(var r=ls.length;r--;)ls[r].id===this.id&&ls.splice(r,1)},t.revert=function(e){this.kill(e||{})},e}(),_s=function(){function e(e){this.contexts=[],this.scope=e,R&&R.data.push(this)}var t=e.prototype;return t.add=function(e,t,n){oi(e)||(e={matches:e});var r=new gs(0,n||this.scope),i=r.conditions={},a,o,s;for(o in R&&!r.selector&&(r.selector=R.selector),this.contexts.push(r),t=r.add(`onMatch`,t),r.queries=e,e)o===`all`?s=1:(a=xi.matchMedia(e[o]),a&&(ls.indexOf(r)<0&&ls.push(r),(i[o]=a.matches)&&(s=1),a.addListener?a.addListener(hs):a.addEventListener(`change`,hs)));return s&&t(r,function(e){return r.add(null,e)}),this},t.revert=function(e){this.kill(e||{})},t.kill=function(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},e}(),vs={registerPlugin:function(){[...arguments].forEach(function(e){return co(e)})},timeline:function(e){return new Po(e)},getTweensOf:function(e,t){return V.getTweensOf(e,t)},getProperty:function(e,t,n,r){ri(e)&&(e=Va(e)[0]);var i=Gi(e||{}).get,a=n?ta:ea;return n===`native`&&(n=``),e&&(t?a((zi[t]&&zi[t].get||i)(e,t,n,r)):function(t,n,r){return a((zi[t]&&zi[t].get||i)(e,t,n,r))})},quickSetter:function(e,t,n){if(e=Va(e),e.length>1){var r=e.map(function(e){return Ss.quickSetter(e,t,n)}),i=r.length;return function(e){for(var t=i;t--;)r[t](e)}}e=e[0]||{};var a=zi[t],o=Gi(e),s=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(t){var r=new a;oo._pt=0,r.init(e,n?t+n:t,oo,0,[e]),r.render(1,r),oo._pt&&rs(1,oo)}:o.set(e,s);return a?c:function(t){return c(e,s,n?t+n:t,o,1)}},quickTo:function(e,t,n){var r,i=Ss.to(e,na((r={},r[t]=`+=0.1`,r.paused=!0,r.stagger=0,r),n||{})),a=function(e,n,r){return i.resetTo(t,e,n,r)};return a.tween=i,a},isTweening:function(e){return V.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Do(e.ease,qr.ease)),aa(qr,e||{})},config:function(e){return aa(Kr,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,i=e.defaults,a=e.extendTimeline;(r||``).split(`,`).forEach(function(e){return e&&!zi[e]&&!wi[e]&&ki(t+` effect requires `+e+` plugin.`)}),Bi[t]=function(e,t,r){return n(Va(e),na(t||{},i),r)},a&&(Po.prototype[t]=function(e,n,r){return this.add(Bi[t](e,oi(n)?n:(r=n)&&{},this),r)})},registerEase:function(e,t){W[e]=Do(t)},parseEase:function(e,t){return arguments.length?Do(e,t):W},getById:function(e){return V.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Po(e),r,i;for(n.smoothChildTiming=si(e.smoothChildTiming),V.remove(n),n._dp=0,n._time=n._tTime=V._time,r=V._first;r;)i=r._next,(t||!(!r._dur&&r instanceof Jo&&r.vars.onComplete===r._targets[0]))&&Sa(n,r,r._start-r._delay),r=i;return Sa(V,n,0),n},context:function(e,t){return e?new gs(e,t):R},matchMedia:function(e){return new _s(e)},matchMediaRefresh:function(){return ls.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||hs()},addEventListener:function(e,t){var n=us[e]||(us[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=us[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:Qa,wrapYoyo:$a,distribute:Wa,random:qa,snap:Ka,normalize:Xa,getUnit:Ia,clamp:La,splitColor:fo,toArray:Va,selector:Ha,mapRange:to,pipe:Ja,unitize:Ya,interpolate:no,shuffle:Ua},install:Di,effects:Bi,ticker:yo,updateRoot:Po.updateRoot,plugins:zi,globalTimeline:V,core:{PropTween:cs,globals:Ai,Tween:Jo,Timeline:Po,Animation:No,getCache:Gi,_removeLinkedListItem:ua,reverting:function(){return Yr},context:function(e){return e&&R&&(R.data.push(e),e._ctx=R),R},suppressOverwrites:function(e){return Jr=e}}};qi(`to,from,fromTo,delayedCall,set,killTweensOf`,function(e){return vs[e]=Jo[e]}),yo.add(Po.updateRoot),oo=vs.to({},{duration:0});var ys=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},bs=function(e,t){var n=e._targets,r,i,a;for(r in t)for(i=n.length;i--;)a=e._ptLookup[i][r],(a&&=a.d)&&(a._pt&&(a=ys(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[i],r))},xs=function(e,t){return{name:e,headless:1,rawVars:1,init:function(e,n,r){r._onInit=function(e){var r,i;if(ri(n)&&(r={},qi(n,function(e){return r[e]=1}),n=r),t){for(i in r={},n)r[i]=t(n[i]);n=r}bs(e,n)}}}},Ss=vs.registerPlugin({name:`attr`,init:function(e,t,n,r,i){var a,o,s;for(a in this.tween=n,t)s=e.getAttribute(a)||``,o=this.add(e,`setAttribute`,(s||0)+``,t[a],r,i,0,0,a),o.op=a,o.b=s,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)Yr?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:`endArray`,headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},xs(`roundProps`,Ga),xs(`modifiers`),xs(`snap`,Ka))||vs;Jo.version=Po.version=Ss.version=`3.15.0`,Ei=1,ci()&&bo(),W.Power0,W.Power1,W.Power2,W.Power3,W.Power4,W.Linear,W.Quad,W.Cubic,W.Quart,W.Quint,W.Strong,W.Elastic,W.Back,W.SteppedEase,W.Bounce,W.Sine,W.Expo,W.Circ;var Cs,ws,Ts,Es,Ds,Os,ks,As=function(){return typeof window<`u`},js={},Ms=180/Math.PI,Ns=Math.PI/180,Ps=Math.atan2,Fs=1e8,Is=/([A-Z])/g,Ls=/(left|right|width|margin|padding|x)/i,Rs=/[\s,\(]\S/,zs={autoAlpha:`opacity,visibility`,scale:`scaleX,scaleY`,alpha:`opacity`},Bs=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Vs=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Hs=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Us=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Ws=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Gs=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Ks=function(e,t){return t.set(t.t,t.p,e===1?t.e:t.b,t)},qs=function(e,t,n){return e.style[t]=n},Js=function(e,t,n){return e.style.setProperty(t,n)},Ys=function(e,t,n){return e._gsap[t]=n},Xs=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},Zs=function(e,t,n,r,i){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(i,a)},Qs=function(e,t,n,r,i){var a=e._gsap;a[t]=n,a.renderTransform(i,a)},G=`transform`,$s=G+`Origin`,ec=function e(t,n){var r=this,i=this.target,a=i.style,o=i._gsap;if(t in js&&a){if(this.tfm=this.tfm||{},t!==`transform`)t=zs[t]||t,~t.indexOf(`,`)?t.split(`,`).forEach(function(e){return r.tfm[e]=yc(i,e)}):this.tfm[t]=o.x?o[t]:yc(i,t),t===$s&&(this.tfm.zOrigin=o.zOrigin);else return zs.transform.split(`,`).forEach(function(t){return e.call(r,t,n)});if(this.props.indexOf(G)>=0)return;o.svg&&(this.svgo=i.getAttribute(`data-svg-origin`),this.props.push($s,n,``)),t=G}(a||n)&&this.props.push(t,n,a[t])},tc=function(e){e.translate&&(e.removeProperty(`translate`),e.removeProperty(`scale`),e.removeProperty(`rotate`))},nc=function(){for(var e=this.props,t=this.target,n=t.style,r=t._gsap,i=0,a;i<e.length;i+=3)e[i+1]?e[i+1]===2?t[e[i]](e[i+2]):t[e[i]]=e[i+2]:e[i+2]?n[e[i]]=e[i+2]:n.removeProperty(e[i].substr(0,2)===`--`?e[i]:e[i].replace(Is,`-$1`).toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute(`data-svg-origin`,this.svgo||``)),i=ks(),(!i||!i.isStart)&&!n[G]&&(tc(n),r.zOrigin&&n[$s]&&(n[$s]+=` `+r.zOrigin+`px`,r.zOrigin=0,r.renderTransform()),r.uncache=1)}},rc=function(e,t){var n={target:e,props:[],revert:nc,save:ec};return e._gsap||Ss.core.getCache(e),t&&e.style&&e.nodeType&&t.split(`,`).forEach(function(e){return n.save(e)}),n},ic,ac=function(e,t){var n=ws.createElementNS?ws.createElementNS((t||`http://www.w3.org/1999/xhtml`).replace(/^https/,`http`),e):ws.createElement(e);return n&&n.style?n:ws.createElement(e)},oc=function e(t,n,r){var i=getComputedStyle(t);return i[n]||i.getPropertyValue(n.replace(Is,`-$1`).toLowerCase())||i.getPropertyValue(n)||!r&&e(t,cc(n)||n,1)||``},sc=`O,Moz,ms,Ms,Webkit`.split(`,`),cc=function(e,t,n){var r=(t||Ds).style,i=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);i--&&!(sc[i]+e in r););return i<0?null:(i===3?`ms`:i>=0?sc[i]:``)+e},lc=function(){As()&&window.document&&(Cs=window,ws=Cs.document,Ts=ws.documentElement,Ds=ac(`div`)||{style:{}},ac(`div`),G=cc(G),$s=G+`Origin`,Ds.style.cssText=`border-width:0;line-height:0;position:absolute;padding:0`,ic=!!cc(`perspective`),ks=Ss.core.reverting,Es=1)},uc=function(e){var t=e.ownerSVGElement,n=ac(`svg`,t&&t.getAttribute(`xmlns`)||`http://www.w3.org/2000/svg`),r=e.cloneNode(!0),i;r.style.display=`block`,n.appendChild(r),Ts.appendChild(n);try{i=r.getBBox()}catch{}return n.removeChild(r),Ts.removeChild(n),i},dc=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},fc=function(e){var t,n;try{t=e.getBBox()}catch{t=uc(e),n=1}return t&&(t.width||t.height)||n||(t=uc(e)),t&&!t.width&&!t.x&&!t.y?{x:+dc(e,[`x`,`cx`,`x1`])||0,y:+dc(e,[`y`,`cy`,`y1`])||0,width:0,height:0}:t},pc=function(e){return!(!e.getCTM||e.parentNode&&!e.ownerSVGElement||!fc(e))},mc=function(e,t){if(t){var n=e.style,r;t in js&&t!==$s&&(t=G),n.removeProperty?(r=t.substr(0,2),(r===`ms`||t.substr(0,6)===`webkit`)&&(t=`-`+t),n.removeProperty(r===`--`?t:t.replace(Is,`-$1`).toLowerCase())):n.removeAttribute(t)}},hc=function(e,t,n,r,i,a){var o=new cs(e._pt,t,n,0,1,a?Ks:Gs);return e._pt=o,o.b=r,o.e=i,e._props.push(n),o},gc={deg:1,rad:1,turn:1},_c={grid:1,flex:1},vc=function e(t,n,r,i){var a=parseFloat(r)||0,o=(r+``).trim().substr((a+``).length)||`px`,s=Ds.style,c=Ls.test(n),l=t.tagName.toLowerCase()===`svg`,u=(l?`client`:`offset`)+(c?`Width`:`Height`),d=100,f=i===`px`,p=i===`%`,m,h,g,_;if(i===o||!a||gc[i]||gc[o])return a;if(o!==`px`&&!f&&(a=e(t,n,r,`px`)),_=t.getCTM&&pc(t),(p||o===`%`)&&(js[n]||~n.indexOf(`adius`)))return m=_?t.getBBox()[c?`width`:`height`]:t[u],Ji(p?a/m*d:a/100*m);if(s[c?`width`:`height`]=d+(f?o:i),h=i!==`rem`&&~n.indexOf(`adius`)||i===`em`&&t.appendChild&&!l?t:t.parentNode,_&&(h=(t.ownerSVGElement||{}).parentNode),(!h||h===ws||!h.appendChild)&&(h=ws.body),g=h._gsap,g&&p&&g.width&&c&&g.time===yo.time&&!g.uncache)return Ji(a/g.width*d);if(p&&(n===`height`||n===`width`)){var v=t.style[n];t.style[n]=d+i,m=t[u],v?t.style[n]=v:mc(t,n)}else(p||o===`%`)&&!_c[oc(h,`display`)]&&(s.position=oc(t,`position`)),h===t&&(s.position=`static`),h.appendChild(Ds),m=Ds[u],h.removeChild(Ds),s.position=`absolute`;return c&&p&&(g=Gi(h),g.time=yo.time,g.width=h[u]),Ji(f?m*a/d:m&&a?d/m*a:0)},yc=function(e,t,n,r){var i;return Es||lc(),t in zs&&t!==`transform`&&(t=zs[t],~t.indexOf(`,`)&&(t=t.split(`,`)[0])),js[t]&&t!==`transform`?(i=jc(e,r),i=t===`transformOrigin`?i.svg?i.origin:Mc(oc(e,$s))+` `+i.zOrigin+`px`:i[t]):(i=e.style[t],(!i||i===`auto`||r||~(i+``).indexOf(`calc(`))&&(i=wc[t]&&wc[t](e,t,n)||oc(e,t)||Ki(e,t)||+(t===`opacity`))),n&&!~(i+``).trim().indexOf(` `)?vc(e,t,i,n)+n:i},bc=function(e,t,n,r){if(!n||n===`none`){var i=cc(t,e,1),a=i&&oc(e,i,1);a&&a!==n?(t=i,n=a):t===`borderColor`&&(n=oc(e,`borderTopColor`))}var o=new cs(this._pt,e.style,t,0,1,ns),s=0,c=0,l,u,d,f,p,m,h,g,_,v,y,b;if(o.b=n,o.e=r,n+=``,r+=``,r.substring(0,6)===`var(--`&&(r=oc(e,r.substring(4,r.indexOf(`)`)))),r===`auto`&&(m=e.style[t],e.style[t]=r,r=oc(e,t)||r,m?e.style[t]=m:mc(e,t)),l=[n,r],_o(l),n=l[0],r=l[1],d=n.match(gi)||[],b=r.match(gi)||[],b.length){for(;u=gi.exec(r);)h=u[0],_=r.substring(s,u.index),p?p=(p+1)%5:(_.substr(-5)===`rgba(`||_.substr(-5)===`hsla(`)&&(p=1),h!==(m=d[c++]||``)&&(f=parseFloat(m)||0,y=m.substr((f+``).length),h.charAt(1)===`=`&&(h=Yi(f,h)+y),g=parseFloat(h),v=h.substr((g+``).length),s=gi.lastIndex-v.length,v||(v=v||Kr.units[t]||y,s===r.length&&(r+=v,o.e+=v)),y!==v&&(f=vc(e,t,m,v)||0),o._pt={_next:o._pt,p:_||c===1?_:`,`,s:f,c:g-f,m:p&&p<4||t===`zIndex`?Math.round:0});o.c=s<r.length?r.substring(s,r.length):``}else o.r=t===`display`&&r===`none`?Ks:Gs;return vi.test(r)&&(o.e=0),this._pt=o,o},xc={top:`0%`,bottom:`100%`,left:`0%`,right:`100%`,center:`50%`},Sc=function(e){var t=e.split(` `),n=t[0],r=t[1]||`50%`;return(n===`top`||n===`bottom`||r===`left`||r===`right`)&&(e=n,n=r,r=e),t[0]=xc[n]||n,t[1]=xc[r]||r,t.join(` `)},Cc=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,i=t.u,a=n._gsap,o,s,c;if(i===`all`||i===!0)r.cssText=``,s=1;else for(i=i.split(`,`),c=i.length;--c>-1;)o=i[c],js[o]&&(s=1,o=o===`transformOrigin`?$s:G),mc(n,o);s&&(mc(n,G),a&&(a.svg&&n.removeAttribute(`transform`),r.scale=r.rotate=r.translate=`none`,jc(n,1),a.uncache=1,tc(r)))}},wc={clearProps:function(e,t,n,r,i){if(i.data!==`isFromStart`){var a=e._pt=new cs(e._pt,t,n,0,0,Cc);return a.u=r,a.pr=-10,a.tween=i,e._props.push(n),1}}},Tc=[1,0,0,1,0,0],Ec={},Dc=function(e){return e===`matrix(1, 0, 0, 1, 0, 0)`||e===`none`||!e},Oc=function(e){var t=oc(e,G);return Dc(t)?Tc:t.substr(7).match(hi).map(Ji)},kc=function(e,t){var n=e._gsap||Gi(e),r=e.style,i=Oc(e),a,o,s,c;return n.svg&&e.getAttribute(`transform`)?(s=e.transform.baseVal.consolidate().matrix,i=[s.a,s.b,s.c,s.d,s.e,s.f],i.join(`,`)===`1,0,0,1,0,0`?Tc:i):(i===Tc&&!e.offsetParent&&e!==Ts&&!n.svg&&(s=r.display,r.display=`block`,a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,Ts.appendChild(e)),i=Oc(e),s?r.display=s:mc(e,`display`),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):Ts.removeChild(e))),t&&i.length>6?[i[0],i[1],i[4],i[5],i[12],i[13]]:i)},Ac=function(e,t,n,r,i,a){var o=e._gsap,s=i||kc(e,!0),c=o.xOrigin||0,l=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,f=s[0],p=s[1],m=s[2],h=s[3],g=s[4],_=s[5],v=t.split(` `),y=parseFloat(v[0])||0,b=parseFloat(v[1])||0,x,S,C,w;n?s!==Tc&&(S=f*h-p*m)&&(C=h/S*y+b*(-m/S)+(m*_-h*g)/S,w=y*(-p/S)+f/S*b-(f*_-p*g)/S,y=C,b=w):(x=fc(e),y=x.x+(~v[0].indexOf(`%`)?y/100*x.width:y),b=x.y+(~(v[1]||v[0]).indexOf(`%`)?b/100*x.height:b)),r||r!==!1&&o.smooth?(g=y-c,_=b-l,o.xOffset=u+(g*f+_*m)-g,o.yOffset=d+(g*p+_*h)-_):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=b,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[$s]=`0px 0px`,a&&(hc(a,o,`xOrigin`,c,y),hc(a,o,`yOrigin`,l,b),hc(a,o,`xOffset`,u,o.xOffset),hc(a,o,`yOffset`,d,o.yOffset)),e.setAttribute(`data-svg-origin`,y+` `+b)},jc=function(e,t){var n=e._gsap||new Mo(e);if(`x`in n&&!t&&!n.uncache)return n;var r=e.style,i=n.scaleX<0,a=`px`,o=`deg`,s=getComputedStyle(e),c=oc(e,$s)||`0`,l=u=d=m=h=g=_=v=y=0,u,d,f=p=1,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,ee,te,O,ne,k,re,ie,ae,oe,se,ce,le,ue;return n.svg=!!(e.getCTM&&pc(e)),s.translate&&((s.translate!==`none`||s.scale!==`none`||s.rotate!==`none`)&&(r[G]=(s.translate===`none`?``:`translate3d(`+(s.translate+` 0 0`).split(` `).slice(0,3).join(`, `)+`) `)+(s.rotate===`none`?``:`rotate(`+s.rotate+`) `)+(s.scale===`none`?``:`scale(`+s.scale.split(` `).join(`,`)+`) `)+(s[G]===`none`?``:s[G])),r.scale=r.rotate=r.translate=`none`),S=kc(e,n.svg),n.svg&&(n.uncache?(re=e.getBBox(),c=n.xOrigin-re.x+`px `+(n.yOrigin-re.y)+`px`,k=``):k=!t&&e.getAttribute(`data-svg-origin`),Ac(e,k||c,!!k||n.originIsAbsolute,n.smooth!==!1,S)),b=n.xOrigin||0,x=n.yOrigin||0,S!==Tc&&(E=S[0],D=S[1],ee=S[2],te=S[3],l=O=S[4],u=ne=S[5],S.length===6?(f=Math.sqrt(E*E+D*D),p=Math.sqrt(te*te+ee*ee),m=E||D?Ps(D,E)*Ms:0,_=ee||te?Ps(ee,te)*Ms+m:0,_&&(p*=Math.abs(Math.cos(_*Ns))),n.svg&&(l-=b-(b*E+x*ee),u-=x-(b*D+x*te))):(ue=S[6],ce=S[7],ae=S[8],oe=S[9],se=S[10],le=S[11],l=S[12],u=S[13],d=S[14],C=Ps(ue,se),h=C*Ms,C&&(w=Math.cos(-C),T=Math.sin(-C),k=O*w+ae*T,re=ne*w+oe*T,ie=ue*w+se*T,ae=O*-T+ae*w,oe=ne*-T+oe*w,se=ue*-T+se*w,le=ce*-T+le*w,O=k,ne=re,ue=ie),C=Ps(-ee,se),g=C*Ms,C&&(w=Math.cos(-C),T=Math.sin(-C),k=E*w-ae*T,re=D*w-oe*T,ie=ee*w-se*T,le=te*T+le*w,E=k,D=re,ee=ie),C=Ps(D,E),m=C*Ms,C&&(w=Math.cos(C),T=Math.sin(C),k=E*w+D*T,re=O*w+ne*T,D=D*w-E*T,ne=ne*w-O*T,E=k,O=re),h&&Math.abs(h)+Math.abs(m)>359.9&&(h=m=0,g=180-g),f=Ji(Math.sqrt(E*E+D*D+ee*ee)),p=Ji(Math.sqrt(ne*ne+ue*ue)),C=Ps(O,ne),_=Math.abs(C)>2e-4?C*Ms:0,y=le?1/(le<0?-le:le):0),n.svg&&(k=e.getAttribute(`transform`),n.forceCSS=e.setAttribute(`transform`,``)||!Dc(oc(e,G)),k&&e.setAttribute(`transform`,k))),Math.abs(_)>90&&Math.abs(_)<270&&(i?(f*=-1,_+=m<=0?180:-180,m+=m<=0?180:-180):(p*=-1,_+=_<=0?180:-180)),t||=n.uncache,n.x=l-((n.xPercent=l&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-l)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=Ji(f),n.scaleY=Ji(p),n.rotation=Ji(m)+o,n.rotationX=Ji(h)+o,n.rotationY=Ji(g)+o,n.skewX=_+o,n.skewY=v+o,n.transformPerspective=y+a,(n.zOrigin=parseFloat(c.split(` `)[2])||!t&&n.zOrigin||0)&&(r[$s]=Mc(c)),n.xOffset=n.yOffset=0,n.force3D=Kr.force3D,n.renderTransform=n.svg?zc:ic?Rc:Pc,n.uncache=0,n},Mc=function(e){return(e=e.split(` `))[0]+` `+e[1]},Nc=function(e,t,n){var r=Ia(t);return Ji(parseFloat(t)+parseFloat(vc(e,`x`,n+`px`,r)))+r},Pc=function(e,t){t.z=`0px`,t.rotationY=t.rotationX=`0deg`,t.force3D=0,Rc(e,t)},Fc=`0deg`,Ic=`0px`,Lc=`) `,Rc=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.z,c=n.rotation,l=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,p=n.scaleX,m=n.scaleY,h=n.transformPerspective,g=n.force3D,_=n.target,v=n.zOrigin,y=``,b=g===`auto`&&e&&e!==1||g===!0;if(v&&(u!==Fc||l!==Fc)){var x=parseFloat(l)*Ns,S=Math.sin(x),C=Math.cos(x),w;x=parseFloat(u)*Ns,w=Math.cos(x),a=Nc(_,a,S*w*-v),o=Nc(_,o,-Math.sin(x)*-v),s=Nc(_,s,C*w*-v+v)}h!==Ic&&(y+=`perspective(`+h+Lc),(r||i)&&(y+=`translate(`+r+`%, `+i+`%) `),(b||a!==Ic||o!==Ic||s!==Ic)&&(y+=s!==Ic||b?`translate3d(`+a+`, `+o+`, `+s+`) `:`translate(`+a+`, `+o+Lc),c!==Fc&&(y+=`rotate(`+c+Lc),l!==Fc&&(y+=`rotateY(`+l+Lc),u!==Fc&&(y+=`rotateX(`+u+Lc),(d!==Fc||f!==Fc)&&(y+=`skew(`+d+`, `+f+Lc),(p!==1||m!==1)&&(y+=`scale(`+p+`, `+m+Lc),_.style[G]=y||`translate(0, 0)`},zc=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.rotation,c=n.skewX,l=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,p=n.xOrigin,m=n.yOrigin,h=n.xOffset,g=n.yOffset,_=n.forceCSS,v=parseFloat(a),y=parseFloat(o),b,x,S,C,w;s=parseFloat(s),c=parseFloat(c),l=parseFloat(l),l&&(l=parseFloat(l),c+=l,s+=l),s||c?(s*=Ns,c*=Ns,b=Math.cos(s)*u,x=Math.sin(s)*u,S=Math.sin(s-c)*-d,C=Math.cos(s-c)*d,c&&(l*=Ns,w=Math.tan(c-l),w=Math.sqrt(1+w*w),S*=w,C*=w,l&&(w=Math.tan(l),w=Math.sqrt(1+w*w),b*=w,x*=w)),b=Ji(b),x=Ji(x),S=Ji(S),C=Ji(C)):(b=u,C=d,x=S=0),(v&&!~(a+``).indexOf(`px`)||y&&!~(o+``).indexOf(`px`))&&(v=vc(f,`x`,a,`px`),y=vc(f,`y`,o,`px`)),(p||m||h||g)&&(v=Ji(v+p-(p*b+m*S)+h),y=Ji(y+m-(p*x+m*C)+g)),(r||i)&&(w=f.getBBox(),v=Ji(v+r/100*w.width),y=Ji(y+i/100*w.height)),w=`matrix(`+b+`,`+x+`,`+S+`,`+C+`,`+v+`,`+y+`)`,f.setAttribute(`transform`,w),_&&(f.style[G]=w)},Bc=function(e,t,n,r,i){var a=360,o=ri(i),s=parseFloat(i)*(o&&~i.indexOf(`rad`)?Ms:1)-r,c=r+s+`deg`,l,u;return o&&(l=i.split(`_`)[1],l===`short`&&(s%=a,s!==s%(a/2)&&(s+=s<0?a:-a)),l===`cw`&&s<0?s=(s+a*Fs)%a-~~(s/a)*a:l===`ccw`&&s>0&&(s=(s-a*Fs)%a-~~(s/a)*a)),e._pt=u=new cs(e._pt,t,n,r,s,Vs),u.e=c,u.u=`deg`,e._props.push(n),u},Vc=function(e,t){for(var n in t)e[n]=t[n];return e},Hc=function(e,t,n){var r=Vc({},n._gsap),i=`perspective,force3D,transformOrigin,svgOrigin`,a=n.style,o,s,c,l,u,d,f,p;for(s in r.svg?(c=n.getAttribute(`transform`),n.setAttribute(`transform`,``),a[G]=t,o=jc(n,1),mc(n,G),n.setAttribute(`transform`,c)):(c=getComputedStyle(n)[G],a[G]=t,o=jc(n,1),a[G]=c),js)c=r[s],l=o[s],c!==l&&i.indexOf(s)<0&&(f=Ia(c),p=Ia(l),u=f===p?parseFloat(c):vc(n,s,c,p),d=parseFloat(l),e._pt=new cs(e._pt,o,s,u,d-u,Bs),e._pt.u=p||0,e._props.push(s));Vc(o,r)};qi(`padding,margin,Width,Radius`,function(e,t){var n=`Top`,r=`Right`,i=`Bottom`,a=`Left`,o=(t<3?[n,r,i,a]:[n+a,n+r,i+r,i+a]).map(function(n){return t<2?e+n:`border`+n+e});wc[t>1?`border`+e:e]=function(e,t,n,r,i){var a,s;if(arguments.length<4)return a=o.map(function(t){return yc(e,t,n)}),s=a.join(` `),s.split(a[0]).length===5?a[0]:s;a=(r+``).split(` `),s={},o.forEach(function(e,t){return s[e]=a[t]=a[t]||a[(t-1)/2|0]}),e.init(t,s,i)}});var Uc={name:`css`,register:lc,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,i){var a=this._props,o=e.style,s=n.vars.startAt,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;for(m in Es||lc(),this.styles=this.styles||rc(e),C=this.styles.props,this.tween=n,t)if(m!==`autoRound`&&(l=t[m],!(zi[m]&&Ro(m,t,n,r,e,i)))){if(f=typeof l,p=wc[m],f===`function`&&(l=l.call(n,r,e,i),f=typeof l),f===`string`&&~l.indexOf(`random(`)&&(l=eo(l)),p)p(this,e,m,l,n)&&(S=1);else if(m.substr(0,2)===`--`)c=(getComputedStyle(e).getPropertyValue(m)+``).trim(),l+=``,ho.lastIndex=0,ho.test(c)||(h=Ia(c),g=Ia(l),g?h!==g&&(c=vc(e,m,c,g)+g):h&&(l+=h)),this.add(o,`setProperty`,c,l,r,i,0,0,m),a.push(m),C.push(m,0,o[m]);else if(f!==`undefined`){if(s&&m in s?(c=typeof s[m]==`function`?s[m].call(n,r,e,i):s[m],ri(c)&&~c.indexOf(`random(`)&&(c=eo(c)),Ia(c+``)||c===`auto`||(c+=Kr.units[m]||Ia(yc(e,m))||``),(c+``).charAt(1)===`=`&&(c=yc(e,m))):c=yc(e,m),d=parseFloat(c),_=f===`string`&&l.charAt(1)===`=`&&l.substr(0,2),_&&(l=l.substr(2)),u=parseFloat(l),m in zs&&(m===`autoAlpha`&&(d===1&&yc(e,`visibility`)===`hidden`&&u&&(d=0),C.push(`visibility`,0,o.visibility),hc(this,o,`visibility`,d?`inherit`:`hidden`,u?`inherit`:`hidden`,!u)),m!==`scale`&&m!==`transform`&&(m=zs[m],~m.indexOf(`,`)&&(m=m.split(`,`)[0]))),v=m in js,v){if(this.styles.save(m),w=l,f===`string`&&l.substring(0,6)===`var(--`){if(l=oc(e,l.substring(4,l.indexOf(`)`))),l.substring(0,5)===`calc(`){var T=e.style.perspective;e.style.perspective=l,l=oc(e,`perspective`),T?e.style.perspective=T:mc(e,`perspective`)}u=parseFloat(l)}if(y||(b=e._gsap,b.renderTransform&&!t.parseTransform||jc(e,t.parseTransform),x=t.smoothOrigin!==!1&&b.smooth,y=this._pt=new cs(this._pt,o,G,0,1,b.renderTransform,b,0,-1),y.dep=1),m===`scale`)this._pt=new cs(this._pt,b,`scaleY`,b.scaleY,(_?Yi(b.scaleY,_+u):u)-b.scaleY||0,Bs),this._pt.u=0,a.push(`scaleY`,m),m+=`X`;else if(m===`transformOrigin`){C.push($s,0,o[$s]),l=Sc(l),b.svg?Ac(e,l,0,x,0,this):(g=parseFloat(l.split(` `)[2])||0,g!==b.zOrigin&&hc(this,b,`zOrigin`,b.zOrigin,g),hc(this,o,m,Mc(c),Mc(l)));continue}else if(m===`svgOrigin`){Ac(e,l,1,x,0,this);continue}else if(m in Ec){Bc(this,b,m,d,_?Yi(d,_+l):l);continue}else if(m===`smoothOrigin`){hc(this,b,`smooth`,b.smooth,l);continue}else if(m===`force3D`){b[m]=l;continue}else if(m===`transform`){Hc(this,l,e);continue}}else m in o||(m=cc(m)||m);if(v||(u||u===0)&&(d||d===0)&&!Rs.test(l)&&m in o)h=(c+``).substr((d+``).length),u||=0,g=Ia(l)||(m in Kr.units?Kr.units[m]:h),h!==g&&(d=vc(e,m,c,g)),this._pt=new cs(this._pt,v?b:o,m,d,(_?Yi(d,_+u):u)-d,!v&&(g===`px`||m===`zIndex`)&&t.autoRound!==!1?Ws:Bs),this._pt.u=g||0,v&&w!==l?(this._pt.b=c,this._pt.e=w,this._pt.r=Us):h!==g&&g!==`%`&&(this._pt.b=c,this._pt.r=Hs);else if(m in o)bc.call(this,e,m,c,_?_+l:l);else if(m in e)this.add(e,m,c||e[m],_?_+l:l,r,i);else if(m!==`parseTransform`){Oi(m,l);continue}v||(m in o?C.push(m,0,o[m]):typeof e[m]==`function`?C.push(m,2,e[m]()):C.push(m,1,c||e[m])),a.push(m)}}S&&ss(this)},render:function(e,t){if(t.tween._time||!ks())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:yc,aliases:zs,getSetter:function(e,t,n){var r=zs[t];return r&&r.indexOf(`,`)<0&&(t=r),t in js&&t!==$s&&(e._gsap.x||yc(e,`x`))?n&&Os===n?t===`scale`?Xs:Ys:(Os=n||{})&&(t===`scale`?Zs:Qs):e.style&&!ai(e.style[t])?qs:~t.indexOf(`-`)?Js:$o(e,t)},core:{_removeProperty:mc,_getMatrix:kc}};Ss.utils.checkPrefix=cc,Ss.core.getStyleSaver=rc,(function(e,t,n,r){var i=qi(e+`,`+t+`,`+n,function(e){js[e]=1});qi(t,function(e){Kr.units[e]=`deg`,Ec[e]=1}),zs[i[13]]=e+`,`+t,qi(r,function(e){var t=e.split(`:`);zs[t[1]]=i[t[0]]})})(`x,y,z,scale,scaleX,scaleY,xPercent,yPercent`,`rotation,rotationX,rotationY,skewX,skewY`,`transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective`,`0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY`),qi(`x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective`,function(e){Kr.units[e]=`px`}),Ss.registerPlugin(Uc);var Wc=Ss.registerPlugin(Uc)||Ss;Wc.core.Tween,Wc.defaults({duration:.32,ease:`power2.out`});var Gc=window.matchMedia(`(prefers-reduced-motion: reduce)`),Kc=()=>!Gc.matches&&!F().reduceMotion;function qc(){document.documentElement.classList.toggle(`reduce-motion`,!Kc())}Gc.addEventListener(`change`,qc);var Jc=[`.language`,`.welcome`,`.step-options`,`.options`,`.med-list`,`.section`,`.tiles`,`.entries`,`.coming`,`.episode-started`,`.profile-section`,`.form-stack`,`.stack`,`.intensity-list`,`.sym-rows`].join(`,`);function Yc(e){let t=[];for(let n of e.children)n.matches(`legend, .visually-hidden`)||(n.matches(Jc)?t.push(...Yc(n)):t.push(n));return t}var Xc=0,Zc=null;function Qc(e){let t=e.querySelector(`.screen`);if(!t)return;let n=t.querySelectorAll(`.progress__seg.is-done`),r=t.querySelector(`.tabbar__item[aria-current]`),i=Xc,a=Zc;if(Xc=n.length,Zc=r?.getAttribute(`href`)??null,!Kc())return;let o=t.querySelector(`.screen__body`),s=o?Yc(o):[];Wc.from(s,{opacity:0,y:10,duration:.4,stagger:Math.min(.05,.4/Math.max(s.length,1)),clearProps:`transform,opacity`});let c=t.querySelectorAll(`.screen__footer > *`);c.length&&Wc.from(c,{opacity:0,delay:.12,stagger:.05,clearProps:`opacity`}),n.length>i&&Wc.from([...n].slice(i),{scaleX:0,transformOrigin:`left center`,duration:.45,ease:`power2.inOut`,clearProps:`transform`}),r&&a!==Zc&&Wc.from(r.querySelector(`.tabbar__icon`),{scaleX:.5,autoAlpha:0,duration:.28,clearProps:`all`});let l=t.querySelector(`.episode-started .icon-badge`);l&&Wc.from(l,{scale:.7,duration:.5,ease:`back.out(1.4)`,clearProps:`transform`})}function $c(e){if(!Kc()||!e.checked)return;let t=e.closest(`.option`)?.querySelector(`.option__control`);t&&Wc.fromTo(t,{scale:.75},{scale:1,duration:.3,ease:`back.out(2)`,clearProps:`transform`})}function el(e){Kc()&&e&&Wc.from(e,{autoAlpha:0,y:-6,duration:.3,clearProps:`transform,opacity,visibility`})}function tl(e){return!Kc()||!e?Promise.resolve():new Promise(t=>{Wc.to(e,{autoAlpha:0,scale:.98,duration:.22,ease:`power1.in`,onComplete:t})})}function nl(e){Kc()&&Wc.from(e,{autoAlpha:0,y:12,duration:.28,clearProps:`transform,opacity,visibility`})}function rl(e,t){if(!Kc())return t();Wc.to(e,{autoAlpha:0,y:8,duration:.2,ease:`power1.in`,onComplete:t})}function il(e){Kc()&&Wc.fromTo(e,{opacity:0,y:8,scale:.97},{opacity:1,y:0,scale:1,duration:.25,clearProps:`transform,opacity`})}var al=[`light`,`dark`,`system`],ol=window.matchMedia(`(prefers-color-scheme: dark)`),sl=`system`;function cl(e=sl){sl=al.includes(e)?e:`system`;let t=sl===`system`?ol.matches?`dark`:`light`:sl;document.documentElement.dataset.theme=t;let n=getComputedStyle(document.documentElement).getPropertyValue(`--color-bg`).trim();document.querySelector(`meta[name="theme-color"]`)?.setAttribute(`content`,n)}ol.addEventListener(`change`,()=>{sl===`system`&&cl()});var ll=null,ul=0,dl=()=>ul>0;async function fl(e){ul+=1;try{return await e()}finally{--ul}}function pl(e){jt(e),Rr(F().language??rt()??`sk`),cl(F().theme),qc(),Wn(),Rt()&&F().demoEnabled&&F().demoSeededAt!==A()&&Gn(Nr())}function ml(){tt()?(Rr(rt()??`sk`),cl(it()??`system`),qc()):pl(ut())}var hl=()=>nt();function gl(e){tt()&&(ll=e&&e!==`/lock`?e:ll,_t(),Mt())}function _l(){gl(`/today`),a(`/lock`,{replace:!0})}function vl(e){e&&e!==`/lock`&&(ll=e)}function yl(){let e=ll??`/today`;return ll=null,e}function bl(){zt(),F().demoEnabled&&Gn(Nr()),a(`/today`,{replace:!0})}var xl=[`sleep`,`steps`],Sl={sleep:`sleep`,steps:`steps`},Cl=90,wl=7,Tl=9e5,El=[`awake`,`inBed`],Dl=()=>p.isNativePlatform(),Ol=()=>p.getPlatform()===`ios`?`apple_health`:`health_connect`,kl=()=>p.getPlatform()===`android`,Al=()=>fl(()=>Sr.openHealthConnectSettings()).catch(e=>console.error(`[health] Nastavenia sa nepodarilo otvoriť`,e));function jl(e){let t=new Map;for(let n of e){let e=(n.stages?.length?n.stages.map(e=>({state:e.stage,minutes:e.durationMinutes})):[{state:n.sleepState,minutes:n.value}]).filter(e=>!El.includes(e.state)).reduce((e,t)=>e+t.minutes,0);if(e<=0)continue;let r=A(n.endDate),i=n.sourceId??n.sourceName??`unknown`;t.has(r)||t.set(r,new Map);let a=t.get(r).get(i)??{minutes:0,bedtime:n.startDate,wakeTime:n.endDate};a.minutes+=e,n.startDate<a.bedtime&&(a.bedtime=n.startDate),n.endDate>a.wakeTime&&(a.wakeTime=n.endDate),t.get(r).set(i,a)}return[...t].map(([e,t])=>({date:e,...[...t.values()].sort((e,t)=>t.minutes-e.minutes)[0]}))}async function Ml(e,t){let n=new Date,r=M(n,-t);r.setHours(0,0,0,0);let i={startDate:r.toISOString(),endDate:n.toISOString()},a=Ol(),o=new Map,s=e=>(o.has(e)||o.set(e,{date:e,steps:null,source:a,externalId:null}),o.get(e));if(e.includes(`steps`)){let{samples:e}=await Sr.queryAggregated({dataType:`steps`,...i,bucket:`day`,aggregation:`sum`});for(let t of e)s(A(t.startDate)).steps=Math.round(t.value)}let c=[];if(e.includes(`sleep`)){let{samples:e}=await Sr.readSamples({dataType:`sleep`,...i,limit:t*40,ascending:!0});c=jl(e).map(e=>({date:e.date,minutes:Math.round(e.minutes),bedtime:e.bedtime,wakeTime:e.wakeTime,source:a,externalId:`${a}-${e.date}`}))}return{sleepLogs:c,healthDays:[...o.values()]}}async function Nl(e){let{available:t}=await Sr.isAvailable();if(!t)throw Error(`unavailable`);if(!(await fl(()=>Sr.requestAuthorization({read:e.map(e=>Sl[e]),write:[],requestHistoryAccess:!0}))).readAuthorized?.length)throw Error(`denied`);Pn({provider:Ol(),types:e}),Ln(await Ml(e,Cl))}async function Pl(){let{connected:e,types:t,lastSyncAt:n}=F().health;if(!Dl()||!e||n&&Date.now()-new Date(n).getTime()<Tl)return!1;try{return Ln(await Ml(t,wl)),!0}catch{return!1}}var Fl;(function(e){e[e.APPLE_SEARCH_ADS=0]=`APPLE_SEARCH_ADS`,e[e.ADJUST=1]=`ADJUST`,e[e.APPSFLYER=2]=`APPSFLYER`,e[e.BRANCH=3]=`BRANCH`,e[e.TENJIN=4]=`TENJIN`,e[e.FACEBOOK=5]=`FACEBOOK`})(Fl||={});var Il;(function(e){e.INAPP=`inapp`,e.SUBS=`subs`})(Il||={});var Ll;(function(e){e[e.SUBSCRIPTIONS=0]=`SUBSCRIPTIONS`,e[e.SUBSCRIPTIONS_UPDATE=1]=`SUBSCRIPTIONS_UPDATE`,e[e.IN_APP_ITEMS_ON_VR=2]=`IN_APP_ITEMS_ON_VR`,e[e.SUBSCRIPTIONS_ON_VR=3]=`SUBSCRIPTIONS_ON_VR`,e[e.PRICE_CHANGE_CONFIRMATION=4]=`PRICE_CHANGE_CONFIRMATION`})(Ll||={});var Rl;(function(e){e[e.UNKNOWN_SUBSCRIPTION_UPGRADE_DOWNGRADE_POLICY=0]=`UNKNOWN_SUBSCRIPTION_UPGRADE_DOWNGRADE_POLICY`,e[e.IMMEDIATE_WITH_TIME_PRORATION=1]=`IMMEDIATE_WITH_TIME_PRORATION`,e[e.IMMEDIATE_AND_CHARGE_PRORATED_PRICE=2]=`IMMEDIATE_AND_CHARGE_PRORATED_PRICE`,e[e.IMMEDIATE_WITHOUT_PRORATION=3]=`IMMEDIATE_WITHOUT_PRORATION`,e[e.DEFERRED=4]=`DEFERRED`})(Rl||={});var zl;(function(e){e.UNKNOWN=`UNKNOWN`,e.CUSTOM=`CUSTOM`,e.LIFETIME=`LIFETIME`,e.ANNUAL=`ANNUAL`,e.SIX_MONTH=`SIX_MONTH`,e.THREE_MONTH=`THREE_MONTH`,e.TWO_MONTH=`TWO_MONTH`,e.MONTHLY=`MONTHLY`,e.WEEKLY=`WEEKLY`})(zl||={});var Bl;(function(e){e[e.INTRO_ELIGIBILITY_STATUS_UNKNOWN=0]=`INTRO_ELIGIBILITY_STATUS_UNKNOWN`,e[e.INTRO_ELIGIBILITY_STATUS_INELIGIBLE=1]=`INTRO_ELIGIBILITY_STATUS_INELIGIBLE`,e[e.INTRO_ELIGIBILITY_STATUS_ELIGIBLE=2]=`INTRO_ELIGIBILITY_STATUS_ELIGIBLE`})(Bl||={});var Vl=m(`NativePurchases`,{web:()=>k(()=>import(`./web-BsH32hr7.js`).then(e=>new e.NativePurchasesWeb),[],import.meta.url)}),Hl=[`yearly`,`monthly`],Ul={yearly:`vestie_plus_yearly`,monthly:`vestie_plus_monthly`},Wl=`1`,Gl=36e5,Kl=null,ql=0,Jl=e=>Hl.find(t=>Ul[t]===e)??null,Yl=()=>Ae()&&!1,Xl=()=>p.getPlatform()===`ios`?`App Store`:`Google Play`,Zl=()=>Kl,Ql={yearly:{amount:29.99,currency:`EUR`,trial:!0},monthly:{amount:3.99,currency:`EUR`,trial:!1}},$l=()=>Yl()?Kl:Ql;async function eu(){if(!Yl()||Kl)return Kl;try{let{products:e}=await Vl.getProducts({productIdentifiers:Object.values(Ul),productType:Il.SUBS}),t={};for(let n of e){let e=Jl(n.planIdentifier)??Jl(n.identifier);if(!e)continue;let r=n.introductoryPrice?.price===0;t[e]={price:n.priceString,amount:typeof n.price==`number`?n.price:null,currency:n.currencyCode,trial:!!(t[e]?.trial||r)}}Hl.every(e=>t[e])&&(Kl=t)}catch(e){console.error(`[purchases] Ceny sa nepodarilo načítať`,e)}return Kl}async function tu(e){return Dn({plan:e,simulated:!0}),`done`}async function nu(){let{purchases:e}=await Vl.getPurchases({productType:Il.SUBS}),t=e.find(e=>Jl(e.productIdentifier)&&e.purchaseState===Wl);return t&&t.isAcknowledged===!1&&await Vl.acknowledgePurchase({purchaseToken:t.purchaseToken}),t??null}function ru(e){let t=e?Jl(e.productIdentifier):null;return t&&F().plus.plan!==t?(Dn({plan:t,trial:!1,startedAt:e.purchaseDate}),!0):!t&&I()?(On(),!0):!1}async function iu(){if(!Yl()||Date.now()-ql<Gl)return!1;ql=Date.now();try{let e=await nu();return nt()?ru(e):!1}catch(e){return console.error(`[purchases] Stav predplatného sa nepodarilo zistiť`,e),!1}}async function au(){if(Yl())try{ru(await nu())}catch(e){console.error(`[purchases] Nákup sa nepodarilo obnoviť`,e)}return I()}async function ou(){ql=0,await Vl.manageSubscriptions()}function su(){let{simulated:e}=F().plus;On(),e&&(jn(),Fn(),Rn({enabled:!1}))}var cu=m(`App`,{web:()=>k(()=>import(`./web-CSmDln7Y.js`).then(e=>new e.AppWeb),[],import.meta.url)}),lu;(function(e){e[e.Sunday=1]=`Sunday`,e[e.Monday=2]=`Monday`,e[e.Tuesday=3]=`Tuesday`,e[e.Wednesday=4]=`Wednesday`,e[e.Thursday=5]=`Thursday`,e[e.Friday=6]=`Friday`,e[e.Saturday=7]=`Saturday`})(lu||={});var uu=m(`LocalNotifications`,{web:()=>k(()=>import(`./web-Dd2xEzlE.js`).then(e=>new e.LocalNotificationsWeb),[],import.meta.url)});function du(e){return{from:A(M(new Date,-(e-1))),to:A()}}function fu(e){let t=new Map;for(let n of e)t.set(n,(t.get(n)??0)+1);return[...t].map(([e,t])=>({key:e,count:t})).sort((e,t)=>t.count-e.count)}var pu=e=>e.length?e.reduce((e,t)=>e+t,0)/e.length:null;function mu({from:e,to:t}){let{symptomLogs:n,episodes:r,medicationIntakes:i,medications:a,cycleEntries:o,sleepLogs:s}=zn(),c=s.filter(n=>n.date>=e&&n.date<=t).sort((e,t)=>e.date.localeCompare(t.date)),l=n=>{let r=A(n);return r>=e&&r<=t},u=n.filter(e=>l(e.occurredAt)).sort((e,t)=>e.occurredAt.localeCompare(t.occurredAt)),d=r.filter(e=>l(e.startedAt)).sort((e,t)=>e.startedAt.localeCompare(t.startedAt)),f=i.filter(e=>l(e.takenAt)).sort((e,t)=>e.takenAt.localeCompare(t.takenAt)),p=new Set([...u.map(e=>A(e.occurredAt)),...d.map(e=>A(e.startedAt))]),m=[...u.map(sn),...d.map(e=>e.intensity)].filter(e=>e!=null),h=d.filter(e=>e.endedAt).map(e=>(new Date(e.endedAt)-new Date(e.startedAt))/6e4),g=a.map(e=>{let t=f.filter(t=>t.medicationId===e.id);return{medication:e,count:t.length,effects:fu(t.map(e=>e.effect).filter(Boolean))}}).filter(e=>e.count>0).sort((e,t)=>t.count-e.count);return{from:e,to:t,logs:u,episodes:d,intakes:f,recordCount:u.length+d.length,symptomDays:p.size,episodeCount:d.length,avgIntensity:pu(m),avgDurationMinutes:pu(h),symptoms:fu([...u.flatMap(e=>e.symptoms.map(e=>e.key)),...d.flatMap(e=>(e.symptoms??[]).map(e=>e.key??e))]),triggers:fu(d.flatMap(e=>(e.triggers??[]).map(e=>e.key??e))),meds:g,periodDays:o.filter(n=>n.type===`period`&&n.date>=e&&n.date<=t).length,sleeps:c,avgSleepMinutes:pu(c.map(e=>e.minutes)),sleepQuality:fu(c.map(e=>e.quality).filter(Boolean))}}var hu=85,gu=8,_u=3e3,vu=12e3,yu=5,bu=10,xu=30,Su=5,Cu=[90,180,365],wu=[90,180,365],Tu=[{key:`pressure_drop`,group:`weather`,icon:`trendingDown`,lags:[0,1],test:e=>e.pressureChange==null?null:e.pressureChange<=-6},{key:`pressure_rise`,group:`weather`,icon:`trendingUp`,lags:[0,1],test:e=>e.pressureChange==null?null:e.pressureChange>=6},{key:`humid`,group:`weather`,icon:`droplets`,lags:[0,1],test:e=>e.humidity==null?null:e.humidity>=hu},{key:`temp_swing`,group:`weather`,icon:`thermometer`,lags:[0,1],test:e=>e.tempChange==null?null:Math.abs(e.tempChange)>=gu},{key:`short_sleep`,group:`sleep`,icon:`bed`,lags:[0,1],test:e=>e.sleep==null?null:e.sleep<360},{key:`poor_sleep`,group:`sleep`,icon:`moon`,lags:[0,1],test:e=>e.sleepQuality==null?null:e.sleepQuality===`poor`},{key:`high_steps`,group:`health`,icon:`dumbbell`,lags:[1],test:e=>e.steps==null?null:e.steps>=vu},{key:`low_steps`,group:`health`,icon:`footprints`,lags:[1],test:e=>e.steps==null?null:e.steps<_u},{key:`period`,group:`cycle`,icon:`droplet`,lags:[0,1],test:e=>!!e.periodWindow}];function Eu(){let{weather:e,health:t,cycleTracking:n}=F();return{weather:e.enabled,sleep:!0,health:t.connected&&t.types.includes(`steps`),cycle:n===!0}}function Du(){let{episodes:e,symptomLogs:t,sleepLogs:n,healthDays:r,weatherDays:i,cycleEntries:a}=zn(),o=new Map,s=e=>(o.has(e)||o.set(e,{date:e,hard:!1,record:!1}),o.get(e));for(let t of e){let e=s(A(t.startedAt));e.hard=!0,e.record=!0}for(let e of t){let t=s(A(e.occurredAt));t.record=!0,(sn(e)??0)>=5&&(t.hard=!0)}for(let e of n){let t=s(e.date);t.sleep=e.minutes,t.sleepQuality=e.quality??null,e.source===`manual`&&(t.record=!0)}for(let e of r){let t=s(e.date);t.steps=e.steps??null}for(let e of i){let t=s(e.date);t.pressureChange=e.pressureChange,t.humidity=e.humidity,t.tempMax=e.tempMax}for(let e of o.values()){let t=o.get(A(M(j(e.date),-1)));e.tempChange=e.tempMax!=null&&t?.tempMax!=null?e.tempMax-t.tempMax:null}for(let e of a)if(e.type===`period`)for(let t=-2;t<=2;t++)s(A(M(j(e.date),t))).periodWindow=!0;return o}var Ou=[0];function ku(e){for(let t=Ou.length;t<=e;t++)Ou[t]=Ou[t-1]+Math.log(t);return Ou[e]}var Au=(e,t)=>ku(e)-ku(t)-ku(e-t);function ju(e,t,n,r){let i=t+r,a=e+n,o=0;for(let n=e;n<=Math.min(t,a);n++)o+=Math.exp(Au(a,n)+Au(i-a,t-n)-Au(i,t));return o}function Mu(e,t,n,r){let i=0,a=0,o=0,s=0;for(let c of t){let t=e.test(c);if(t==null)continue;let l=e.lags.map(e=>A(M(j(c.date),e)));if(l.at(-1)>r)continue;let u=l.some(e=>n.get(e)?.hard);t?(i++,u&&a++):(o++,u&&s++)}let c=i?a/i:0,l=o?s/o:0,u=c-l,d=`none`;if(i<yu||o<bu)d=`few`;else{let e=ju(a,i,s,o);u>=.15&&c>=l*1.5&&e<.05?d=`strong`:u>=.08&&c>=l*1.25&&e<.2&&(d=`possible`)}return{key:e.key,group:e.group,icon:e.icon,withDays:i,withHard:a,withoutDays:o,withoutHard:s,rateWith:c,rateWithout:l,difference:u,strength:d}}var Nu={strong:0,possible:1,none:2,few:3};function Pu({days:e=180,now:t=new Date}={}){let n=A(t),r=A(M(t,-(e-1))),i=Du(),a=[...i.values()].filter(e=>e.record).map(e=>e.date).sort()[0],o=a&&a>r?a:r,s=a?Dt(o,n).map(e=>i.get(e)??{date:e,hard:!1}):[],c=s.length,l=s.filter(e=>e.hard).length,u=Eu(),d=Tu.filter(e=>u[e.group]).map(e=>Mu(e,s,i,n)).filter(e=>e.withDays>0).sort((e,t)=>Nu[e.strength]-Nu[t.strength]||t.difference-e.difference),{episodes:f}=zn(),p=f.filter(e=>A(e.startedAt)>=o);return{period:e,trackedDays:c,hardDays:l,enough:c>=xu&&l>=Su,factors:d,logged:fu(p.flatMap(e=>(e.triggers??[]).map(e=>e.key??e)))}}var Fu=[`pressure_drop`,`pressure_rise`,`humid`,`temp_swing`];function Iu(e,{days:t,weather:n,alerts:r}){if(!n)return[];let i=t.get(e)??{},a=[];return i.pressureChange!=null&&i.pressureChange<=-6&&a.push({key:`pressure_drop`,amount:Math.round(-i.pressureChange)}),i.pressureChange!=null&&i.pressureChange>=6&&a.push({key:`pressure_rise`,amount:Math.round(i.pressureChange)}),i.humidity!=null&&i.humidity>=hu&&a.push({key:`humid`,amount:i.humidity}),i.tempChange!=null&&Math.abs(i.tempChange)>=gu&&a.push({key:`temp_swing`,amount:Math.abs(i.tempChange)}),a.filter(e=>r.includes(e.key))}function Lu({now:e=new Date}={}){let t=Pu({days:365,now:e}),n=new Map(t.factors.map(e=>[e.key,e])),r=Du(),i=xr(),a=F().forecast.alerts??[],o=[0,1,2,3].map(o=>{let s=A(M(e,o)),c=Iu(s,{days:r,weather:i,alerts:a}).map(e=>({...e,stat:t.enough?n.get(e.key):null}));return{date:s,offset:o,signals:c,level:c.length?`change`:`calm`}});return{days:o,next:o.find(e=>e.offset>0&&e.level===`change`)??null}}function Ru(e,t=new Date){let n=du(e),r=M(t,-e),i={from:A(M(r,-(e-1))),to:A(r)};return{current:mu(n),previous:mu(i)}}function zu(e=12,t=new Date){let n=[];for(let r=e-1;r>=0;r--){let e=new Date(t.getFullYear(),t.getMonth()-r,1),i=new Date(t.getFullYear(),t.getMonth()-r+1,0),a=mu({from:A(e),to:A(i)});n.push({month:e,symptomDays:a.symptomDays,episodes:a.episodeCount})}return n}var Bu=[`morning`,`afternoon`,`evening`,`night`],Vu=e=>e>=5&&e<12?0:e>=12&&e<17?1:e>=17&&e<22?2:3;function Hu({from:e,to:t}){let n=Array.from({length:7},()=>[0,0,0,0]),r=0;for(let i of zn().episodes){let a=A(i.startedAt);if(a<e||a>t)continue;let o=new Date(i.startedAt);n[(o.getDay()+6)%7][Vu(o.getHours())]++,r++}return{grid:n,total:r}}function Uu({from:e,to:t},n=[-3,7]){let{cycleEntries:r,episodes:i}=zn(),a=new Set(r.filter(e=>e.type===`period`).map(e=>e.date)),o=[...a].filter(e=>!a.has(A(M(j(e),-1)))).map(e=>j(e).getTime()),s=new Map;for(let e=n[0];e<=n[1];e++)s.set(e,0);let c=0;for(let n of i){let r=A(n.startedAt);if(r<e||r>t)continue;let i=j(r).getTime();for(let e of o){let t=Math.round((i-e)/864e5);if(s.has(t)){s.set(t,s.get(t)+1),c++;break}}}return{items:[...s].map(([e,t])=>({offset:e,count:t})),total:c,starts:o.length}}function Wu({from:e,to:t}){let n=zn().episodes.filter(n=>{let r=A(n.startedAt);return r>=e&&r<=t});return{relief:fu(n.flatMap(e=>e.relief??[])),impact:fu(n.flatMap(e=>e.impact??[]).filter(e=>e!==`none`))}}var Gu=28;function Ku(e=new Date){let{medications:t,medicationIntakes:n,episodes:r,symptomLogs:i}=zn(),a=[...r.map(e=>A(e.startedAt)),...i.map(e=>A(e.occurredAt))].sort()[0];if(!a)return[];let o=A(e);return t.filter(e=>e.type===`preventive`).map(e=>{let t=n.filter(t=>t.medicationId===e.id).map(e=>A(e.takenAt)).sort()[0],r=e.startDate??t;if(!r)return null;let i=j(r),s=Dt(r,o).length,c=a<r?Dt(a,A(M(i,-1))).length:0,l=Math.min(90,c,s);if(l<Gu)return null;let u=e=>e/l*30,d=mu({from:A(M(i,-l)),to:A(M(i,-1))}),f=mu({from:r,to:A(M(i,l-1))});return{medication:e,start:r,window:l,before:{symptomDays:u(d.symptomDays),episodes:u(d.episodeCount)},after:{symptomDays:u(f.symptomDays),episodes:u(f.episodeCount)}}}).filter(Boolean)}function qu({from:e,to:t}){let{weatherDays:n,episodes:r}=zn(),i=new Set(r.map(e=>A(e.startedAt)));return n.filter(n=>n.date>=e&&n.date<=t).sort((e,t)=>e.date.localeCompare(t.date)).map(e=>({...e,episode:i.has(e.date),estimated:lr(e)}))}function Ju({from:e,to:t}){let{episodes:n,weatherDays:r,healthDays:i}=zn(),a=new Map(r.map(e=>[e.date,e])),o=n.filter(n=>{let r=A(n.startedAt);return r>=e&&r<=t}).sort((e,t)=>e.startedAt.localeCompare(t.startedAt)).map(e=>({episode:e,weather:a.get(A(e.startedAt))??null})).filter(e=>e.weather),s=i.filter(n=>n.date>=e&&n.date<=t);return{rows:o,drops:o.filter(e=>e.weather.pressureChange!=null&&e.weather.pressureChange<=-6).length,avgSteps:(e=>e.length?e.reduce((e,t)=>e+t,0)/e.length:null)(s.map(e=>e.steps).filter(e=>e!=null))}}var Yu=class{constructor(e){this.value=e}toString(){return this.value}},Xu={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},Zu=e=>String(e).replace(/[&<>"']/g,e=>Xu[e]),Qu=e=>new Yu(String(e??``));function $u(e){return e==null||e===!1||e===!0?``:e instanceof Yu?e.value:Array.isArray(e)?e.map($u).join(``):Zu(e)}function K(e,...t){let n=e[0];for(let r=0;r<t.length;r++)n+=$u(t[r])+e[r+1];return new Yu(n)}var ed={activity:`
<svg
  class="lucide lucide-activity"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
</svg>
`,arrowDown:`
<svg
  class="lucide lucide-arrow-down"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 5v14" />
  <path d="m19 12-7 7-7-7" />
</svg>
`,arrowRight:`
<svg
  class="lucide lucide-arrow-right"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 12h14" />
  <path d="m12 5 7 7-7 7" />
</svg>
`,arrowUp:`
<svg
  class="lucide lucide-arrow-up"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m5 12 7-7 7 7" />
  <path d="M12 19V5" />
</svg>
`,audioWave:`
<svg
  class="lucide lucide-audio-waveform"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2" />
</svg>
`,battery:`
<svg
  class="lucide lucide-battery-low"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M22 14v-4" />
  <path d="M6 14v-4" />
  <rect x="2" y="6" width="16" height="12" rx="2" />
</svg>
`,bed:`
<svg
  class="lucide lucide-bed-double"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
  <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
  <path d="M12 4v6" />
  <path d="M2 18h20" />
</svg>
`,bone:`
<svg
  class="lucide lucide-bone"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" />
</svg>
`,brain:`
<svg
  class="lucide lucide-brain"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 18V5" />
  <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />
  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />
  <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />
  <path d="M18 18a4 4 0 0 0 2-7.464" />
  <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />
  <path d="M6 18a4 4 0 0 1-2-7.464" />
  <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
</svg>
`,bell:`
<svg
  class="lucide lucide-bell"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10.268 21a2 2 0 0 0 3.464 0" />
  <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
</svg>
`,bellRing:`
<svg
  class="lucide lucide-bell-ring"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10.268 21a2 2 0 0 0 3.464 0" />
  <path d="M22 8c0-2.3-.8-4.3-2-6" />
  <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
  <path d="M4 2C2.8 3.7 2 5.7 2 8" />
</svg>
`,calendar:`
<svg
  class="lucide lucide-calendar-days"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M8 2v3" />
  <path d="M16 2v3" />
  <rect x="3" y="3" width="18" height="18" rx="2" />
  <path d="M3 9h18" />
  <path d="M8 13h.01" />
  <path d="M12 13h.01" />
  <path d="M16 13h.01" />
  <path d="M8 17h.01" />
  <path d="M12 17h.01" />
  <path d="M16 17h.01" />
</svg>
`,camera:`
<svg
  class="lucide lucide-camera"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
  <circle cx="12" cy="13" r="3" />
</svg>
`,car:`
<svg
  class="lucide lucide-car"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
  <circle cx="7" cy="17" r="2" />
  <path d="M9 17h6" />
  <circle cx="17" cy="17" r="2" />
</svg>
`,calendarPlus:`
<svg
  class="lucide lucide-calendar-plus"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 18h6" />
  <path d="M16 2v3" />
  <path d="M19 15v6" />
  <path d="M21 11.5V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h8.3" />
  <path d="M3 9h18" />
  <path d="M8 2v3" />
</svg>
`,chart:`
<svg
  class="lucide lucide-chart-column"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 3v16a2 2 0 0 0 2 2h16" />
  <path d="M18 17V9" />
  <path d="M13 17V5" />
  <path d="M8 17v-3" />
</svg>
`,check:`
<svg
  class="lucide lucide-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 6 9 17l-5-5" />
</svg>
`,chevronLeft:`
<svg
  class="lucide lucide-chevron-left"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m15 18-6-6 6-6" />
</svg>
`,chevronRight:`
<svg
  class="lucide lucide-chevron-right"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m9 18 6-6-6-6" />
</svg>
`,clock:`
<svg
  class="lucide lucide-clock"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 6v6l4 2" />
</svg>
`,coffee:`
<svg
  class="lucide lucide-coffee"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 2v2" />
  <path d="M14 2v2" />
  <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
  <path d="M6 2v2" />
</svg>
`,cloud:`
<svg
  class="lucide lucide-cloud"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
</svg>
`,cloudFog:`
<svg
  class="lucide lucide-cloud-fog"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
  <path d="M16 17H7" />
  <path d="M17 21H9" />
</svg>
`,cloudLightning:`
<svg
  class="lucide lucide-cloud-lightning"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
  <path d="m13 12-3 5h4l-3 5" />
</svg>
`,cloudRain:`
<svg
  class="lucide lucide-cloud-rain"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
  <path d="M16 14v6" />
  <path d="M8 14v6" />
  <path d="M12 16v6" />
</svg>
`,cloudSun:`
<svg
  class="lucide lucide-cloud-sun"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 2v2" />
  <path d="m4.93 4.93 1.41 1.41" />
  <path d="M20 12h2" />
  <path d="m19.07 4.93-1.41 1.41" />
  <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
  <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
</svg>
`,delete:`
<svg
  class="lucide lucide-delete"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
  <path d="m12 9 6 6" />
  <path d="m18 9-6 6" />
</svg>
`,backup:`
<svg
  class="lucide lucide-database-backup"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <ellipse cx="12" cy="5" rx="9" ry="3" />
  <path d="M3 12a9 3 0 0 0 5 2.69" />
  <path d="M21 9.3V5" />
  <path d="M3 5v14a9 3 0 0 0 6.47 2.88" />
  <path d="M12 12v4h4" />
  <path d="M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16" />
</svg>
`,fileLock:`
<svg
  class="lucide lucide-file-lock"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 9.8V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3" />
  <path d="M14 2v5a1 1 0 0 0 1 1h5" />
  <path d="M9 17v-2a2 2 0 0 0-4 0v2" />
  <rect width="8" height="5" x="3" y="17" rx="1" />
</svg>
`,download:`
<svg
  class="lucide lucide-download"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 15V3" />
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
  <path d="m7 10 5 5 5-5" />
</svg>
`,upload:`
<svg
  class="lucide lucide-upload"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 3v12" />
  <path d="m17 8-5-5-5 5" />
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
</svg>
`,droplet:`
<svg
  class="lucide lucide-droplet"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
</svg>
`,droplets:`
<svg
  class="lucide lucide-droplets"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
  <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
</svg>
`,dumbbell:`
<svg
  class="lucide lucide-dumbbell"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" />
  <path d="m2.5 21.5 1.4-1.4" />
  <path d="m20.1 3.9 1.4-1.4" />
  <path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" />
  <path d="m9.6 14.4 4.8-4.8" />
</svg>
`,ear:`
<svg
  class="lucide lucide-ear"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" />
  <path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4" />
</svg>
`,ellipsis:`
<svg
  class="lucide lucide-ellipsis"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="1" />
  <circle cx="19" cy="12" r="1" />
  <circle cx="5" cy="12" r="1" />
</svg>
`,externalLink:`
<svg
  class="lucide lucide-external-link"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 3h6v6" />
  <path d="M10 14 21 3" />
  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
</svg>
`,eye:`
<svg
  class="lucide lucide-eye"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
  <circle cx="12" cy="12" r="3" />
</svg>
`,fileText:`
<svg
  class="lucide lucide-file-text"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
  <path d="M14 2v5a1 1 0 0 0 1 1h5" />
  <path d="M10 9H8" />
  <path d="M16 13H8" />
  <path d="M16 17H8" />
</svg>
`,flower:`
<svg
  class="lucide lucide-flower-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1" />
  <circle cx="12" cy="8" r="2" />
  <path d="M12 10v12" />
  <path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z" />
  <path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z" />
</svg>
`,footprints:`
<svg
  class="lucide lucide-footprints"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" />
  <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" />
  <path d="M16 17h4" />
  <path d="M4 13h4" />
</svg>
`,gauge:`
<svg
  class="lucide lucide-gauge"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m12 14 4-4" />
  <path d="M3.34 19a10 10 0 1 1 17.32 0" />
</svg>
`,glassWater:`
<svg
  class="lucide lucide-glass-water"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z" />
  <path d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0" />
</svg>
`,globe:`
<svg
  class="lucide lucide-globe"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
  <path d="M2 12h20" />
</svg>
`,home:`
<svg
  class="lucide lucide-house"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
  <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
</svg>
`,hourglass:`
<svg
  class="lucide lucide-hourglass"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 22h14" />
  <path d="M5 2h14" />
  <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
  <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
</svg>
`,info:`
<svg
  class="lucide lucide-info"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 16v-4" />
  <path d="M12 8h.01" />
</svg>
`,keyRound:`
<svg
  class="lucide lucide-key-round"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
</svg>
`,languages:`
<svg
  class="lucide lucide-languages"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m5 8 6 6" />
  <path d="m4 14 6-6 2-3" />
  <path d="M2 5h12" />
  <path d="M7 2h1" />
  <path d="m22 22-5-10-5 10" />
  <path d="M14 18h6" />
</svg>
`,lock:`
<svg
  class="lucide lucide-lock"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
</svg>
`,lockKeyhole:`
<svg
  class="lucide lucide-lock-keyhole"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="16" r="1" />
  <rect x="3" y="10" width="18" height="12" rx="2" />
  <path d="M7 10V7a5 5 0 0 1 10 0v3" />
</svg>
`,logOut:`
<svg
  class="lucide lucide-log-out"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m16 17 5-5-5-5" />
  <path d="M21 12H9" />
  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
</svg>
`,mapPin:`
<svg
  class="lucide lucide-map-pin"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
  <circle cx="12" cy="10" r="3" />
</svg>
`,messages:`
<svg
  class="lucide lucide-messages-square"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  <path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1" />
</svg>
`,minus:`
<svg
  class="lucide lucide-minus"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 12h14" />
</svg>
`,monitor:`
<svg
  class="lucide lucide-monitor"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="20" height="14" x="2" y="3" rx="2" />
  <line x1="8" x2="16" y1="21" y2="21" />
  <line x1="12" x2="12" y1="17" y2="21" />
</svg>
`,moon:`
<svg
  class="lucide lucide-moon"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
</svg>
`,note:`
<svg
  class="lucide lucide-notebook-pen"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
  <path d="M2 6h4" />
  <path d="M2 10h4" />
  <path d="M2 14h4" />
  <path d="M2 18h4" />
  <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
</svg>
`,orbit:`
<svg
  class="lucide lucide-orbit"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20.341 6.484A10 10 0 0 1 10.266 21.85" />
  <path d="M3.659 17.516A10 10 0 0 1 13.74 2.152" />
  <circle cx="12" cy="12" r="3" />
  <circle cx="19" cy="5" r="2" />
  <circle cx="5" cy="19" r="2" />
</svg>
`,palette:`
<svg
  class="lucide lucide-palette"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
</svg>
`,pencil:`
<svg
  class="lucide lucide-pencil"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
  <path d="m15 5 4 4" />
</svg>
`,pill:`
<svg
  class="lucide lucide-pill"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
  <path d="m8.5 8.5 7 7" />
</svg>
`,play:`
<svg
  class="lucide lucide-play"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
</svg>
`,plus:`
<svg
  class="lucide lucide-plus"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 12h14" />
  <path d="M12 5v14" />
</svg>
`,printer:`
<svg
  class="lucide lucide-printer"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
  <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
  <rect x="6" y="14" width="12" height="8" rx="1" />
</svg>
`,refresh:`
<svg
  class="lucide lucide-refresh-cw"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
  <path d="M21 3v5h-5" />
  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
  <path d="M8 16H3v5" />
</svg>
`,rotate3d:`
<svg
  class="lucide lucide-rotate-3d"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m15.194 13.707 3.814 1.86-1.86 3.814" />
  <path d="M16.47214 7.52786 A 5 10 0 1 0 13 21.79796" />
  <path d="M21.79796 11 A 10 5 0 1 0 19 15.57071" />
</svg>
`,sailboat:`
<svg
  class="lucide lucide-sailboat"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 2v15" />
  <path d="M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z" />
  <path d="M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z" />
</svg>
`,scanFace:`
<svg
  class="lucide lucide-scan-face"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 7V5a2 2 0 0 1 2-2h2" />
  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
  <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
  <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
  <path d="M9 9h.01" />
  <path d="M15 9h.01" />
</svg>
`,search:`
<svg
  class="lucide lucide-search"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m21 21-4.34-4.34" />
  <circle cx="11" cy="11" r="8" />
</svg>
`,shield:`
<svg
  class="lucide lucide-shield-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  <path d="m9 12 2 2 4-4" />
</svg>
`,smartphone:`
<svg
  class="lucide lucide-smartphone"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
  <path d="M12 18h.01" />
</svg>
`,snowflake:`
<svg
  class="lucide lucide-snowflake"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m10 20-1.25-2.5L6 18" />
  <path d="M10 4 8.75 6.5 6 6" />
  <path d="m14 20 1.25-2.5L18 18" />
  <path d="m14 4 1.25 2.5L18 6" />
  <path d="m17 21-3-6h-4" />
  <path d="m17 3-3 6 1.5 3" />
  <path d="M2 12h6.5L10 9" />
  <path d="m20 10-1.5 2 1.5 2" />
  <path d="M22 12h-6.5L14 15" />
  <path d="m4 10 1.5 2L4 14" />
  <path d="m7 21 3-6-1.5-3" />
  <path d="m7 3 3 6h4" />
</svg>
`,sparkles:`
<svg
  class="lucide lucide-sparkles"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
  <path d="M20 2v4" />
  <path d="M22 4h-4" />
  <circle cx="4" cy="20" r="2" />
</svg>
`,stethoscope:`
<svg
  class="lucide lucide-stethoscope"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11 2v2" />
  <path d="M5 2v2" />
  <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
  <path d="M8 15a6 6 0 0 0 12 0v-3" />
  <circle cx="20" cy="10" r="2" />
</svg>
`,sun:`
<svg
  class="lucide lucide-sun"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="4" />
  <path d="M12 2v2" />
  <path d="M12 20v2" />
  <path d="m4.93 4.93 1.41 1.41" />
  <path d="m17.66 17.66 1.41 1.41" />
  <path d="M2 12h2" />
  <path d="M20 12h2" />
  <path d="m6.34 17.66-1.41 1.41" />
  <path d="m19.07 4.93-1.41 1.41" />
</svg>
`,thermometer:`
<svg
  class="lucide lucide-thermometer"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
</svg>
`,timer:`
<svg
  class="lucide lucide-timer"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <line x1="10" x2="14" y1="2" y2="2" />
  <line x1="12" x2="15" y1="14" y2="11" />
  <circle cx="12" cy="14" r="8" />
</svg>
`,trash:`
<svg
  class="lucide lucide-trash"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 11v6" />
  <path d="M14 11v6" />
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
  <path d="M3 6h18" />
  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
</svg>
`,trendingDown:`
<svg
  class="lucide lucide-trending-down"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 17h6v-6" />
  <path d="m22 17-8.5-8.5-5 5L2 7" />
</svg>
`,trendingUp:`
<svg
  class="lucide lucide-trending-up"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 7h6v6" />
  <path d="m22 7-8.5 8.5-5-5L2 17" />
</svg>
`,user:`
<svg
  class="lucide lucide-circle-user-round"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17.925 20.056a6 6 0 0 0-11.851.001" />
  <circle cx="12" cy="11" r="4" />
  <circle cx="12" cy="12" r="10" />
</svg>
`,users:`
<svg
  class="lucide lucide-users"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
  <path d="M16 3.128a4 4 0 0 1 0 7.744" />
  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
  <circle cx="9" cy="7" r="4" />
</svg>
`,utensils:`
<svg
  class="lucide lucide-utensils"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
  <path d="M7 2v20" />
  <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
</svg>
`,volume:`
<svg
  class="lucide lucide-volume-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
  <path d="M16 9a5 5 0 0 1 0 6" />
  <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
</svg>
`,watch:`
<svg
  class="lucide lucide-watch"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 10v2.2l1.6 1" />
  <path d="m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05" />
  <path d="m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05" />
  <circle cx="12" cy="12" r="6" />
</svg>
`,wine:`
<svg
  class="lucide lucide-wine"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M8 22h8" />
  <path d="M7 10h10" />
  <path d="M12 15v7" />
  <path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" />
</svg>
`,waves:`
<svg
  class="lucide lucide-waves-horizontal"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2 12q2.5 2 5 0t5 0 5 0 5 0" />
  <path d="M2 19q2.5 2 5 0t5 0 5 0 5 0" />
  <path d="M2 5q2.5 2 5 0t5 0 5 0 5 0" />
</svg>
`,wind:`
<svg
  class="lucide lucide-wind"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
  <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
  <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
</svg>
`,x:`
<svg
  class="lucide lucide-x"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M18 6 6 18" />
  <path d="m6 6 12 12" />
</svg>
`,zap:`
<svg
  class="lucide lucide-zap"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z" />
</svg>
`},td=Object.keys(ed);function q(e,{size:t=24,label:n,strokeWidth:r=1.75}={}){let i=ed[e];if(!i)return console.warn(`[icons] Neznáma ikona: ${e}`),Qu(``);let a=n?`role="img" aria-label="${Zu(n)}"`:`aria-hidden="true" focusable="false"`;return Qu(i.trim().replace(`<svg`,`<svg ${a}`).replace(`class="lucide`,`class="icon lucide`).replace(`width="24"`,`width="${t}"`).replace(`height="24"`,`height="${t}"`).replace(`stroke-width="2"`,`stroke-width="${r}"`))}var nd=(e,t)=>t==null||t===!1?``:K` ${Qu(e)}="${t}"`,rd=(e,t)=>t?Qu(` ${e}`):``;function id(e={}){return Qu(Object.entries(e).map(([e,t])=>` data-${e}="${Zu(t)}"`).join(``))}function J({header:e=``,body:t,footer:n=``,nav:r=``,variant:i=``,form:a=!1}){let o=K`
    ${e}
    <div class="screen__body">${t}</div>
    ${n?K`<div class="screen__footer">${n}</div>`:``}
    ${r}`;return a?K`<form class="screen ${i}" novalidate>${o}</form>`:K`<div class="screen ${i}">${o}</div>`}var ad=(e,t,{header:n}={})=>J({variant:n?``:`screen--tab`,header:n,body:t,nav:ld(e)});function Y({back:e,backAction:t,step:n,total:r}={}){return K`
    <header class="screen__header">
      ${e||t?K`<button type="button" class="icon-btn" data-action="${t??`back`}"${nd(`data-fallback`,e)} aria-label="${L(`common.back`)}">
            ${q(`chevronLeft`)}
          </button>`:K`<span class="topbar__spacer"></span>`}
      ${n?K`<div class="progress">
            <span class="visually-hidden">${L(`common.stepOf`,{step:n,total:r})}</span>
            ${Array.from({length:r},(e,t)=>K`<span class="progress__seg ${t<n?`is-done`:``}" aria-hidden="true"></span>`)}
          </div>`:K`<span class="progress"></span>`}
      <span class="topbar__spacer"></span>
    </header>`}var od=[{key:`today`,path:`/today`,icon:`home`},{key:`calendar`,path:`/calendar`,icon:`calendar`},{key:`insights`,path:`/insights`,icon:`chart`},{key:`treatment`,path:`/treatment`,icon:`pill`}],sd=(e,t)=>K`
  <a class="tabbar__item" href="#${e.path}" data-replace${e.key===t?Qu(` aria-current="page"`):``}>
    <span class="tabbar__icon">${q(e.icon)}</span>
    ${L(`nav.${e.key}`)}
  </a>`;function cd(){let e=fn();return e?K`
      <a class="tabbar__fab tabbar__fab--live" href="#/episode/${e.id}" aria-label="${L(`episode.ongoing`)}">
        <span class="tabbar__fab-circle" aria-hidden="true">${q(`timer`,{size:30})}</span>
        <span class="tabbar__fab-label" aria-hidden="true">${L(`episode.statusOngoing`)}</span>
      </a>`:K`
    <button type="button" class="tabbar__fab" data-action="startEpisode">
      <span class="tabbar__fab-circle" aria-hidden="true">${q(`play`,{size:28,strokeWidth:2.5})}</span>
      <span class="tabbar__fab-label">${L(`nav.startEpisode`)}</span>
    </button>`}function ld(e){let[t,n,r,i]=od;return K`
    <nav class="tabbar" aria-label="${L(`nav.label`)}">
      ${sd(t,e)}${sd(n,e)}${cd()}${sd(r,e)}${sd(i,e)}
    </nav>`}var ud=()=>K`<a href="#/profile" class="icon-btn" aria-label="${L(`nav.profile`)}">${q(`user`)}</a>`,dd=e=>K`
  <header class="tab-title">
    <h1 class="screen-title" tabindex="-1">${e}</h1>
    ${ud()}
  </header>`;function X({label:e,variant:t=`primary`,action:n,type:r=`button`,iconName:i,block:a=!1,compact:o=!1,disabled:s=!1,data:c,id:l}){return K`<button type="${r}" class="${[`btn`,`btn--${t}`,a&&`btn--block`,o&&`btn--compact`].filter(Boolean).join(` `)}"${nd(`id`,l)}${nd(`data-action`,n)}${id(c)}${rd(`disabled`,s)}>
    ${i?q(i,{size:20}):``}<span>${e}</span>
  </button>`}function fd({name:e,type:t=`radio`,options:n,selected:r,legend:i}){let a=new Set([].concat(r??[]));return K`
    <fieldset class="options">
      ${i?K`<legend class="visually-hidden">${i}</legend>`:``}
      ${n.map(n=>K`
          <label class="option option--${t}">
            <input type="${t}" name="${e}" value="${n.value}" id="${e}-${n.value}"${rd(`checked`,a.has(n.value))} />
            <span class="option__control">${q(`check`,{size:16,strokeWidth:3})}</span>
            <span class="option__label">${n.label}</span>
          </label>`)}
    </fieldset>`}function pd({name:e,options:t,selected:n,legend:r}){return K`
    <fieldset class="segmented">
      ${r?K`<legend class="visually-hidden">${r}</legend>`:``}
      ${t.map(t=>K`
          <label class="segmented__item">
            <input type="radio" name="${e}" value="${t.value}" id="${e}-${t.value}"${rd(`checked`,t.value===n)} />
            <span>${t.label}</span>
          </label>`)}
    </fieldset>`}function Z({label:e,name:t,type:n=`text`,value:r=``,placeholder:i,hint:a,optional:o=!1,required:s=!1,multiline:c=!1,autocomplete:l=`off`,maxlength:u=120}){let d=`f-${t}`,f=[a&&`${d}-hint`,`${d}-error`].filter(Boolean).join(` `),p=c?K`<textarea class="field__input" id="${d}" name="${t}"${nd(`placeholder`,i)} maxlength="1000" aria-describedby="${f}">${r}</textarea>`:K`<input class="field__input" id="${d}" name="${t}" type="${n}" value="${r}"${nd(`placeholder`,i)}${nd(`autocomplete`,l)}${n===`text`?nd(`maxlength`,u):``}${rd(`required`,s)} aria-describedby="${f}" />`;return K`
    <div class="field">
      <label class="field__label" for="${d}">
        ${e}${o?K` <span class="field__optional">(${L(`common.optional`)})</span>`:``}
      </label>
      ${p}
      ${a?K`<p class="field__hint" id="${d}-hint">${a}</p>`:``}
      <p class="field__error" id="${d}-error" hidden></p>
    </div>`}function md(e,t,n){let r=e.querySelector(`#f-${t}`),i=e.querySelector(`#f-${t}-error`);i&&(i.textContent=n,i.hidden=!1),r?.setAttribute(`aria-invalid`,`true`),r?.focus()}function hd(e){if(e?.getAttribute?.(`aria-invalid`)!==`true`)return;e.removeAttribute(`aria-invalid`);let t=document.getElementById(`${e.id}-error`);t&&(t.hidden=!0)}function gd({name:e,label:t,hint:n,checked:r,iconName:i}){return K`
    <label class="list__row list__row--switch" for="f-${e}">
      ${i?q(i):``}
      <span class="list__text">
        <span class="list__label">${t}</span>
        ${n?K`<span class="list__hint" id="f-${e}-hint">${n}</span>`:``}
      </span>
      <input class="switch" type="checkbox" role="switch" id="f-${e}" name="${e}"${rd(`checked`,r)}${n?K` aria-describedby="f-${e}-hint"`:``} />
    </label>`}var _d=(e,{live:t=!1,neutral:n=!1}={})=>K`<span class="chip ${t?`chip--live`:``} ${n?`chip--neutral`:``}">${e}</span>`,vd=(e,{large:t=!1}={})=>K`<span class="icon-badge ${t?`icon-badge--lg`:``}">${q(e,{size:t?34:22})}</span>`,yd=[`weather`,`forecast`,`finder`,`stats`,`health`,`report`],bd={weather:`gauge`,forecast:`bellRing`,finder:`search`,stats:`chart`,health:`watch`,report:`fileText`},xd={clear:`sun`,partly:`cloudSun`,cloudy:`cloud`,fog:`cloudFog`,rain:`cloudRain`,snow:`snowflake`,storm:`cloudLightning`},Sd=e=>e.charAt(0).toLocaleUpperCase(zr())+e.slice(1);function Cd(e){let t=Math.round(e);return t>0?`+${t}`:t<0?`−${Math.abs(t)}`:`0`}var wd=e=>L(`plus.weather.hpa`,{value:Math.round(e)}),Td=[{key:`low`,below:1e3},{key:`normal`,below:1021},{key:`high`,below:1030},{key:`veryHigh`,below:1/0}],Ed=e=>Td.find(t=>Math.round(e)<t.below).key,Dd=e=>L(`plus.weather.hpa`,{value:Cd(e)}),Od=e=>L(`plus.weather.temps`,{min:e.tempMin,max:e.tempMax}),kd=e=>L(`plus.weather.conditions.${e}`),Ad=e=>new Intl.NumberFormat(zr()).format(Math.round(e)),jd=e=>Sd(new Intl.DateTimeFormat(zr(),{weekday:`long`}).format(e)),Md=e=>new Intl.DateTimeFormat(zr(),{day:`numeric`,month:`numeric`}).format(e);function Nd(e){return e===A()?L(`plus.forecast.today`):e===A(M(new Date,1))?L(`plus.forecast.tomorrow`):jd(j(e))}function Pd(e,{status:t}={}){let n=I(),r=e===`report`?`#/report`:`#/plus/${e}`;return K`
    <a class="list__row" href="${n?r:`#/plus?from=${e}`}">
      ${q(bd[e])}
      <span class="list__text">
        <span class="list__label">${L(`plus.features.${e}.title`)}</span>
        ${n?``:K`<span class="list__hint">${L(`plus.features.${e}.text`)}</span>`}
      </span>
      ${n&&t?K`<span class="list__value">${t}</span>`:``}
      ${n?``:q(`lock`,{size:18,label:L(`plus.lockedLabel`)})}
      ${q(`chevronRight`,{size:20})}
    </a>`}function Fd(e){let{weather:t,forecast:n,health:r}=F();return e===`weather`?L(t.enabled?`common.on`:`common.off`):e===`forecast`?L(n.enabled?`common.on`:`common.off`):e===`health`?L(r.connected?`plus.health.connected`:`plus.health.notConnected`):``}function Id(){return K`
    <section class="section" aria-labelledby="plus-title">
      <h2 class="section-title plus-title" id="plus-title">${L(`plus.name`)}${I()?``:_d(L(`plus.tryChip`))}</h2>
      <div class="list">${[`forecast`,`finder`,`stats`,`weather`].map(e=>Pd(e,{status:Fd(e)}))}</div>
    </section>`}function Ld(e){if(!I())return``;let{weather:t,health:n}=F(),r=t.enabled?kn(e):null,i=n.connected?Nn(e):null;return!r&&!i?``:K`
    <ul class="day-context">
      ${r?K`<li>
            ${q(xd[r.condition]??`cloud`,{size:20})}
            <span>${[wd(r.pressure),r.pressureChange==null?``:L(`plus.weather.changeShort`,{value:Dd(r.pressureChange)}),kd(r.condition),Od(r),lr(r)?L(`plus.weather.estimateWord`):``].filter(Boolean).join(` · `)}</span>
          </li>`:``}
      ${i?.steps==null?``:K`<li>${q(`footprints`,{size:20})}<span>${L(`plus.health.stepsValue`,{value:Ad(i.steps)})}</span></li>`}
    </ul>`}var Rd=e=>L(`plus.forecast.signals.${e.key}`,{amount:e.amount});function zd(e){let{stat:t}=e;return!t||t.strength===`few`?L(`plus.forecast.evidenceFew`):t.strength===`none`?L(`plus.forecast.evidenceNone`):L(`plus.forecast.evidence`,{a:t.withHard,b:t.withDays,c:t.withoutHard,d:t.withoutDays})}var Bd=e=>e.signals[0];function Vd(e){return K`<span class="level level--${e}">${q(e===`calm`?`check`:`bellRing`,{size:16})}${L(`plus.forecast.levels.${e}`)}</span>`}function Hd(){if(!I()||!F().forecast.enabled)return``;let{next:e}=Lu();if(!e)return``;let t=Bd(e);return K`
    <a class="card forecast-card forecast-card--${e.level}" href="#/plus/forecast">
      <span class="forecast-card__head">
        <span class="forecast-card__title">${L(`plus.forecast.cardTitle`,{day:Nd(e.date)})}</span>
        ${Vd(e.level)}
      </span>
      <span class="forecast-card__text">${Rd(t)} ${zd(t)}</span>
    </a>`}var Ud=1,Wd=[2,3],Gd=`reminders`,Kd=`forecast-private`,qd=[`forecast`],Jd=3,Yd=0,Xd=e=>{let[t,n]=e.split(`:`).map(Number);return{hour:t,minute:n}};async function Zd(){if(!Ae())return!0;let{display:e}=await uu.checkPermissions();return e===`granted`||(await fl(()=>uu.requestPermissions())).display===`granted`}async function Qd(){return(await uu.checkPermissions()).display===`granted`}async function $d(){await uu.createChannel({id:Gd,name:L(`notifications.channelReminders`),importance:Jd}),await uu.createChannel({id:Kd,name:L(`notifications.channelForecast`),importance:Jd,visibility:Yd}),await Promise.all(qd.map(e=>uu.deleteChannel({id:e}).catch(()=>{})))}async function ef(){if(Ae())try{await uu.cancel({notifications:[{id:Ud}]});let{reminder:e}=F();if(!e.enabled||!await Qd())return;await $d(),await uu.schedule({notifications:[{id:Ud,channelId:Gd,title:L(`app.name`),body:L(`notifications.reminderBody`),isExactNotification:!1,schedule:{on:Xd(e.time),allowWhileIdle:!0}}]})}catch(e){console.error(`[notifications] Pripomienku sa nepodarilo naplánovať`,e)}}function tf(){let{hour:e,minute:t}=Xd(F().forecast.time),n=new Date;return Lu().days.filter(e=>(e.offset===1||e.offset===2)&&e.level===`change`).map(n=>{let r=M(j(n.date),-1);return r.setHours(e,t,0,0),{day:n,at:r}}).filter(({at:e})=>e>n).map(({day:e,at:t})=>({id:Wd[e.offset-1],channelId:Kd,title:L(`plus.forecast.cardTitle`,{day:L(`plus.forecast.tomorrow`)}),body:Rd(Bd(e)),isExactNotification:!1,schedule:{at:t,allowWhileIdle:!0}}))}async function nf(){if(Ae())try{await uu.cancel({notifications:Wd.map(e=>({id:e}))});let{forecast:e,weather:t}=F();if(!I()||!e.enabled||!e.notify||!t.enabled||!xr()||!await Qd())return;let n=tf();if(!n.length)return;await $d(),await uu.schedule({notifications:n})}catch(e){console.error(`[notifications] Upozornenie sa nepodarilo naplánovať`,e)}}var rf=()=>Promise.all([ef(),nf()]);async function af(){if(Ae())try{await uu.cancel({notifications:[Ud,...Wd].map(e=>({id:e}))})}catch(e){console.error(`[notifications] Upozornenia sa nepodarilo zrušiť`,e)}}var of=`<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 573.28 138.03">
  <defs>
    <style>
      .cls-1 {
        fill: #f97c5f;
      }

      .cls-2 {
        fill: #1d262d;
      }
    </style>
  </defs>
  <g>
    <path class="cls-1" d="M101.68,39.33l-3.1-.16c-1.11-.05-2.12.73-2.32,1.84-.79,4.33-2.04,11.15-3.29,17.99-1.14,6.21-2.28,12.43-3.07,16.78l-5.28-26.34c-.24-1.19-1.36-1.97-2.56-1.77l-3.05.49c-.6.1-1.14.44-1.49.94-.35.5-.48,1.13-.35,1.72l8.95,44.59c.21,1.05,1.13,1.8,2.2,1.8h.02l3.49-.04c1.07-.01,1.99-.79,2.18-1.84,1.32-7.23,3.1-16.98,4.88-26.73,1.78-9.71,3.55-19.41,4.86-26.62.12-.64-.05-1.29-.45-1.79-.4-.51-1-.82-1.64-.85Z"/>
    <path class="cls-1" d="M135.04,54.1h0c-.43-.42-.98-.65-1.61-.65l-4.89.06c-.73.01-1.4.37-1.82.97-1.87,2.7-3.71,5.43-5.55,8.16l-.65.96-6.25-9.14c-.43-.63-1.13-.99-1.91-.98l-4.74.12c-1.22.03-2.2,1.04-2.19,2.26l.41,55.61c0,.59.25,1.17.68,1.59.42.41.98.64,1.57.64h.03l3.1-.05c1.23-.02,2.22-1.04,2.21-2.26l-.32-45.14c.59.89,1.22,1.86,1.86,2.84,1.11,1.7,2.22,3.41,3.09,4.69.42.62,1.11.99,1.85.99h1.52c.75,0,1.45-.38,1.87-1.01.89-1.36,2.01-3.18,3.09-4.95.56-.92,1.12-1.84,1.65-2.69-.04,5.51-.07,11.76-.11,18-.04,6.48-.08,12.94-.12,18.5,0,.6.23,1.18.66,1.61.42.42,1,.69,1.61.66l3.1-.03c1.22-.01,2.21-1.01,2.22-2.23l.3-46.92c0-.6-.24-1.18-.66-1.6Z"/>
  </g>
  <g>
    <g>
      <path class="cls-2" d="M297.99,21.49c-.33.33-.77.51-1.23.51h-23.63c-.84,0-1.55.6-1.7,1.42-2.88,15.82-5.76,31.65-8.64,47.47-.15.82-.86,1.41-1.68,1.42l-4.35.05c-.83,0-1.55-.57-1.72-1.39l-10.82-53.66c-.09-.46,0-.94.27-1.33s.68-.65,1.15-.72l3.8-.62c.92-.15,1.79.46,1.97,1.37l6.55,32.51c.07.35.38.61.74.6.36,0,.67-.26.73-.62,1.97-10.83,3.94-21.66,5.92-32.49.16-.86.92-1.46,1.79-1.42,0,0,19.14.07,29.57.08.95,0,1.72.76,1.73,1.71l.04,3.87c0,.46-.17.91-.5,1.24ZM299.82,69.71c.02.47-.16.92-.48,1.26-.32.34-.77.53-1.24.53l-20.83.07c-.95,0-1.73-.77-1.74-1.72l-.3-38.77c0-.46.18-.9.5-1.23.32-.33.76-.51,1.22-.51l19.64-.07c.95,0,1.73.76,1.74,1.71l.04,3.86c0,.46-.17.91-.5,1.23-.32.33-.77.51-1.23.52l-13.49.05c-.23,0-.45.09-.61.26-.16.16-.25.38-.25.61,0,.17,0,1.22.01,2.9,0,.46.36.83.81.86l10.58.66c.47.03.9.25,1.2.6s.45.82.41,1.28l-.3,3.35c-.08.93-.89,1.63-1.83,1.57l-9.92-.62c-.24-.02-.47.07-.65.23s-.27.39-.27.63c.04,9.97.1,8.44.12,14.38,0,.23.09.45.26.61.16.16.38.25.61.25l14.62-.05c.94,0,1.7.74,1.74,1.67l.13,3.87Z"/>
      <path class="cls-2" d="M328.83,57.97c1.09,9.78-7.72,17.53-17.23,14.48-8.23-2.64-9.3-11.64-8.68-19.66.07-.92.85-1.62,1.77-1.59l3.7.1c.48.01.93.22,1.25.58.32.36.47.83.42,1.31-.39,3.67-.32,7.54,1.39,10.41,2.24,3.77,7.98,2.49,9.54-1.13,2.05-4.75-1.75-9.51-4.58-13.03-6.19-7.71-15.01-16.87-11.16-27.53,1.62-4.48,5.97-7.99,10.84-8.03,4.81-.05,8.66,3.35,10.37,7.65,1.36,3.43,1.19,7.01.45,10.52-.19.87-1,1.45-1.88,1.36l-3.79-.4c-.5-.05-.94-.32-1.23-.73-.29-.41-.38-.92-.27-1.4,3.46-14.51-12.39-11.38-6.99,1.12,4,9.24,14.88,15.42,16.05,25.98Z"/>
      <path class="cls-2" d="M361.39,15.17c.33.33.51.77.5,1.24l-.04,3.85c0,.95-.78,1.71-1.73,1.72h-12.55c-.23.01-.45.11-.61.27s-.25.39-.25.62l.6,47.53c.01.94-.73,1.72-1.68,1.75l-3.86.12c-.46.01-.92-.16-1.25-.48s-.53-.76-.53-1.23c-.2-15.9-.4-31.79-.6-47.69,0-.48-.39-.86-.87-.85l-6.69.02c-.95,0-1.73-.76-1.74-1.72l-.03-3.87c0-.46.17-.9.5-1.23s.76-.51,1.22-.51c6.15-.02,18.18-.04,28.38-.05.46,0,.91.18,1.23.51ZM361.07,31.42v39.23c0,.94-.76,1.71-1.7,1.73l-3.86.07c-.46,0-.91-.17-1.24-.5s-.52-.77-.52-1.23V31.4c0-.46.18-.9.51-1.23.33-.32.77-.51,1.23-.5l3.87.02c.95,0,1.72.78,1.72,1.73Z"/>
      <path class="cls-2" d="M390.33,64.75c-2.53,8.69-12.24,9.11-20.69,8.14-.86-.1-1.52-.82-1.54-1.69l-.83-55.13c-.02-.93.7-1.71,1.63-1.76,10.74-.58,21.88,5.45,22.38,17.3.16,7.11-2.2,14.04-6.68,19.57-.17.21-.22.49-.15.75.07.26.26.48.51.58.38.16.75.35,1.11.55,3.96,2.24,5.48,7.48,4.25,11.7ZM374.88,48.87c0,.33.2.64.51.78.31.14.66.09.92-.12,4.77-4,7.54-11.07,7.66-16.91.23-5.17-3.65-8.95-8.31-10.33-.26-.08-.55-.02-.76.15-.22.17-.34.43-.34.7.11,8.58.22,17.16.33,25.74ZM382.99,63.42c2.56-4.45-3.47-5.14-7.19-4.84-.45.04-.8.42-.79.87.02,1.85.05,3.7.07,5.56,0,.47.38.84.84.85,2.51.05,5.77-.16,7.06-2.44h0Z"/>
      <path class="cls-2" d="M420.14,14.95c.47-.02.93.15,1.28.48.34.33.53.78.53,1.25-.03,11.53-.05,23.06-.11,34.58-.05,8.44-2.07,22.17-13.46,21.79-11.57-.39-12.41-14.78-12.42-23.29-.04-11,.08-22,.36-33,.02-.94.79-1.69,1.73-1.69h3.86c.47-.02.92.17,1.24.5.33.33.5.79.49,1.25-.21,8.71-.33,17.43-.35,26.14-.01,4.55-.27,9.21.16,13.74.27,2.86,1.25,8.75,5.02,9,3.79.25,5.36-5.11,5.76-7.96.63-4.41.29-9.06.3-13.5.03-9.14.06-18.27.08-27.41,0-.92.73-1.68,1.65-1.72l3.87-.18Z"/>
      <path class="cls-2" d="M435.67,64.97c.16.16.39.25.62.25l12.29-.16c.95-.01,1.73.74,1.75,1.68l.1,3.64c.01.46-.16.92-.48,1.25-.32.33-.77.53-1.23.53l-18.89.17c-.46,0-.91-.18-1.23-.5-.33-.33-.51-.77-.51-1.23V16.75c0-.93.74-1.7,1.67-1.73l3.87-.14c.47-.02.92.16,1.26.48s.53.78.53,1.24v47.74c0,.23.09.45.26.62Z"/>
      <path class="cls-2" d="M478.04,70.91c-.04.92-.79,1.64-1.71,1.65l-3.86.05c-.48,0-.93-.19-1.26-.53-.33-.34-.5-.81-.48-1.28.47-10.7.15-21.42-.2-32.12-.03-.92-.77-1.66-1.69-1.68-2.3-.04-4.61,0-6.92.13-.91.06-1.61.8-1.62,1.71-.1,10.62-.35,21.24-.4,31.87,0,.46-.19.9-.51,1.22-.33.32-.77.5-1.23.5l-3.87-.02c-.96,0-1.73-.78-1.72-1.74.06-12.63.4-25.25.45-37.88.02-4.26-.07-8.67,1.83-12.6,3.8-7.88,13.96-9.19,19.26-2.08,2.73,3.66,3.1,8.28,3.33,12.69.25,4.67.44,9.35.59,14.02.28,8.69.38,17.4,0,26.09ZM460.34,7.53l4.46-6.75c.25-.38.65-.65,1.1-.74.45-.09.92,0,1.3.25l2.21,1.46c.8.53,1.02,1.6.49,2.4l-4.5,6.83c-.26.39-.66.66-1.12.75-.46.09-.94-.02-1.32-.29l-2.16-1.53c-.76-.54-.96-1.59-.45-2.37ZM469.48,29.07c.34-.39.48-.9.4-1.41-.65-3.93-2.88-9.44-7.05-6.09-1.8,1.53-2.36,3.93-2.51,6.42-.02.49.16.97.51,1.32s.83.53,1.32.49c1.99-.11,3.98-.15,5.98-.13.51.01,1.01-.21,1.34-.6Z"/>
      <path class="cls-2" d="M509.94,70.13c0,.93-.75,1.69-1.68,1.72l-3.82.11c-.47.02-.93-.16-1.27-.5-.34-.33-.52-.79-.51-1.26.15-7.99.12-21.82-5.19-26.73-1.46-1.17-3.19-1.97-5.03-2.33-.26-.05-.53.01-.73.18-.2.17-.32.42-.32.68.12,9.51.24,19.01.36,28.52.01.95-.74,1.73-1.68,1.75l-3.58.1c-.46.01-.91-.16-1.25-.48s-.53-.76-.53-1.22l-.75-54.4c-.01-.94.73-1.72,1.67-1.76,5.17-.19,10.41.08,15.17,2.18,9.62,4.35,10.28,14.78,1.59,20.13-.23.14-.38.37-.41.64-.03.26.07.53.26.71,7.29,7.06,7.77,20.75,7.7,31.95ZM492.11,21.95c-.25-.03-.49.05-.68.22s-.29.41-.28.65l.12,9.3c0,.25.12.5.31.66.2.16.45.23.7.19,3.09-.57,6.96-1.79,8.52-4.57,2.04-4.25-5.08-6.01-8.69-6.44Z"/>
      <path class="cls-2" d="M540.74,16.49c.39,17.97.78,35.94,1.17,53.91.01.47-.17.92-.49,1.25s-.77.52-1.24.52h-3.87c-.94,0-1.71-.75-1.73-1.69l-.75-34.53c0-.23-.1-.45-.27-.61l-9.67-9.25c-.25-.24-.62-.31-.94-.17-.32.14-.53.45-.53.8v43.64c0,.94-.75,1.71-1.69,1.73l-3.87.08c-.47,0-.92-.17-1.25-.49-.33-.33-.52-.77-.52-1.24V16.68c0-.94.76-1.71,1.7-1.73l5.23-.08c.46,0,.9.16,1.22.48l8.83,8.45c.25.24.63.31.95.17s.52-.46.52-.81c-.05-2.19-.09-4.37-.14-6.56-.01-.46.16-.91.49-1.25.32-.33.77-.52,1.23-.52l3.86-.02c.95,0,1.72.75,1.74,1.69Z"/>
      <path class="cls-2" d="M573.03,70.91c-.04.92-.79,1.64-1.71,1.65l-3.86.05c-.48,0-.93-.19-1.26-.53-.33-.34-.5-.81-.48-1.28.47-10.7.15-21.42-.2-32.12-.03-.92-.77-1.66-1.69-1.68-2.31-.04-4.61,0-6.92.13-.91.06-1.61.8-1.62,1.71-.1,10.62-.35,21.24-.4,31.87,0,.46-.19.9-.51,1.22-.33.32-.77.5-1.23.5l-3.87-.02c-.96,0-1.73-.79-1.72-1.74.06-12.63.4-25.25.45-37.88.02-4.26-.07-8.67,1.83-12.6,3.8-7.88,13.96-9.19,19.26-2.08,2.73,3.66,3.1,8.27,3.33,12.69.25,4.67.44,9.35.59,14.02.28,8.69.38,17.4,0,26.09ZM557.15,29.79c1.99-.11,3.98-.15,5.97-.13.51.01,1.01-.21,1.34-.6.34-.39.49-.91.4-1.41-.65-3.93-2.88-9.44-7.05-6.09-1.8,1.53-2.37,3.93-2.51,6.42-.02.49.16.97.51,1.32s.83.52,1.33.49h0Z"/>
    </g>
    <g>
      <path class="cls-2" d="M281.93,78.99c.33.33.51.77.51,1.24l-.38,53.86c0,.95-.77,1.71-1.71,1.72l-3.87.04c-.46,0-.91-.18-1.24-.51s-.51-.77-.51-1.24c.1-14.27.2-28.53.3-42.8,0-.23-.15-.44-.37-.5-.22-.07-.46.02-.59.22-2.09,3.28-4.95,8.13-6.93,11.15-.32.48-.86.78-1.44.77h-1.89c-.57,0-1.11-.28-1.43-.76-1.99-2.97-5.05-7.72-7.18-10.93-.13-.19-.37-.28-.58-.21-.22.07-.37.27-.37.5l.41,42.23c0,.95-.75,1.73-1.7,1.75l-3.87.06c-.46,0-.91-.17-1.24-.49-.33-.32-.52-.76-.52-1.22l-.52-53.45c0-.95.74-1.72,1.69-1.75l5.91-.14c.59-.02,1.14.27,1.47.75l8.26,12.07c.1.14.26.23.43.23s.33-.08.43-.23c2.71-4.03,5.41-8.06,8.17-12.05.32-.46.84-.74,1.4-.75l6.1-.07c.46,0,.91.17,1.24.5Z"/>
      <path class="cls-2" d="M296.21,80.75v53.37c0,.94-.75,1.71-1.69,1.73l-3.87.09c-.47.01-.92-.17-1.25-.49s-.52-.77-.52-1.24v-53.48c0-.46.18-.9.51-1.23.33-.33.77-.51,1.23-.5l3.87.03c.95,0,1.72.78,1.72,1.73Z"/>
      <path class="cls-2" d="M323.66,77.29c.48.01.93.23,1.24.59.31.36.47.83.42,1.31l-.36,3.81c-.09.9-.86,1.59-1.77,1.57-12.56-.09-15.16,12.94-14.62,23.62.41,8.17,1.9,18.93,11.05,20.93.26.06.52,0,.73-.17.2-.16.32-.41.33-.67.06-9.61.37-19.22.52-28.84,0-.23-.09-.46-.25-.62-.16-.17-.39-.26-.62-.26h-3.66c-.46,0-.91-.19-1.23-.51-.32-.33-.5-.77-.5-1.24l.04-3.87c.01-.95.78-1.71,1.73-1.71h9.81c.46,0,.91.19,1.23.52.33.33.5.78.5,1.24l-.65,41.92c-.02.88-.69,1.61-1.57,1.7-17.91,1.74-24.25-12.07-24.78-28.42-.27-8.34.73-17.44,6.21-24.11,3.77-4.59,10.22-6.89,16.2-6.78Z"/>
      <path class="cls-2" d="M359.81,133.79c0,.93-.75,1.69-1.68,1.72l-3.82.11c-.47.02-.93-.16-1.27-.5-.34-.33-.52-.79-.51-1.26.15-7.99.12-21.82-5.19-26.73-1.46-1.17-3.19-1.97-5.03-2.33-.26-.05-.53.01-.73.18-.2.17-.32.42-.32.68.12,9.51.24,19.01.36,28.52.01.95-.74,1.73-1.68,1.75l-3.58.1c-.46.01-.91-.16-1.25-.48s-.53-.76-.53-1.22l-.75-54.4c-.01-.94.73-1.72,1.67-1.76,5.17-.19,10.41.08,15.17,2.18,9.62,4.35,10.28,14.78,1.59,20.13-.23.14-.38.37-.41.64s.07.53.26.71c7.29,7.06,7.77,20.75,7.7,31.95ZM341.99,85.61c-.25-.03-.5.05-.68.22-.19.17-.29.41-.28.66l.12,9.3c0,.25.12.49.31.66s.45.23.7.19c3.09-.57,6.96-1.79,8.52-4.57,2.04-4.26-5.08-6.01-8.69-6.44Z"/>
      <path class="cls-2" d="M389.4,134.23c.02.47-.16.92-.48,1.26-.33.34-.77.53-1.24.53l-20.83.07c-.95,0-1.73-.77-1.74-1.72l-.3-41.6c0-.46.18-.9.5-1.23.32-.33.76-.51,1.22-.51l19.64-.07c.95,0,1.73.76,1.74,1.71l.04,3.87c0,.46-.17.91-.5,1.23s-.77.51-1.23.52l-13.48.05c-.23,0-.45.09-.61.26-.16.16-.25.38-.25.61,0,.17,0,1.22.01,2.9,0,.46.36.83.81.86l10.58.67c.47.03.9.25,1.2.6s.45.82.41,1.28l-.3,3.35c-.08.94-.89,1.63-1.83,1.57l-9.92-.62c-.24-.02-.47.07-.65.23-.17.16-.27.39-.27.63.04,9.97.1,11.27.12,17.21,0,.23.09.45.26.61.16.16.38.25.61.25l14.62-.05c.94,0,1.71.74,1.74,1.67l.13,3.87ZM372.67,84.81l4.46-6.75c.53-.8,1.6-1.02,2.4-.49l2.21,1.46c.8.53,1.02,1.6.49,2.4l-4.5,6.83c-.26.39-.66.66-1.12.75-.46.09-.94-.02-1.32-.29l-2.16-1.53c-.76-.54-.96-1.59-.44-2.37Z"/>
      <path class="cls-2" d="M418.8,80.15c.39,17.97.78,35.94,1.17,53.91.01.47-.17.92-.49,1.25s-.77.52-1.24.52h-3.87c-.94,0-1.71-.75-1.73-1.69l-.75-34.53c0-.23-.1-.45-.27-.61l-9.67-9.25c-.25-.24-.62-.31-.94-.17-.32.14-.53.45-.53.8v43.64c0,.94-.75,1.71-1.69,1.73l-3.87.08c-.47,0-.92-.17-1.25-.49s-.52-.77-.52-1.24v-53.76c0-.95.76-1.72,1.7-1.73l5.23-.08c.46,0,.9.16,1.22.48l8.83,8.45c.25.24.63.31.95.17.32-.14.52-.46.52-.81-.05-2.19-.09-4.37-.14-6.56-.01-.46.16-.91.49-1.25.32-.33.77-.52,1.23-.52l3.86-.02c.95,0,1.72.75,1.74,1.69Z"/>
      <path class="cls-2" d="M451.09,134.57c-.04.92-.79,1.64-1.71,1.66l-3.86.05c-.48,0-.93-.19-1.26-.53-.33-.34-.5-.81-.48-1.28.47-10.71.15-21.42-.2-32.12-.03-.92-.77-1.66-1.69-1.68-2.31-.04-4.61,0-6.92.13-.91.06-1.61.8-1.62,1.71-.1,10.62-.35,21.24-.4,31.86,0,.46-.19.9-.51,1.22-.33.32-.77.5-1.23.5l-3.87-.02c-.96,0-1.73-.78-1.72-1.74.06-12.63.4-25.25.45-37.88.02-4.26-.07-8.67,1.83-12.6,3.8-7.88,13.96-9.19,19.26-2.08,2.73,3.66,3.1,8.28,3.33,12.69.25,4.67.44,9.35.59,14.03.28,8.69.38,17.4,0,26.09ZM435.21,93.45c1.99-.11,3.98-.15,5.97-.13.51.01,1.01-.21,1.34-.6.34-.39.49-.91.4-1.41-.65-3.93-2.88-9.44-7.05-6.09-1.8,1.53-2.36,3.94-2.51,6.42-.02.49.16.97.51,1.32s.83.52,1.33.49h0Z"/>
    </g>
  </g>
  <path class="cls-1" d="M191.32,85.63c-1.91-1.72-3.9-3.45-6-5.18-1.29-1.06-2.62-2.12-3.98-3.18-2.12-1.65-4.31-3.31-6.6-4.95-1.36-.98-2.74-1.96-4.15-2.92-13.73-9.52-29.9-18.71-47.34-26.87-.13-.06-.26-.13-.39-.18-1.94-.9-3.89-1.79-5.87-2.66,2.18-.83,4.35-1.63,6.48-2.4,24.4-8.73,45.37-12.82,59.94-12.82,11.33,0,18.81,2.48,21,7.18,3.5,7.52-6.03,21.73-25.71,37.56,2.26,1.64,4.43,3.3,6.53,4.95,20.32-16.61,32.22-33.47,26.42-45.89-9.03-19.37-53.95-12.73-98.59,4.41-2.17.83-4.34,1.69-6.51,2.57-3.49,1.42-6.97,2.9-10.42,4.44-1.97.87-3.93,1.76-5.87,2.66-.13.06-.26.13-.39.18-17.44,8.16-33.61,17.36-47.34,26.85-1.42.97-2.8,1.95-4.15,2.93-1.37-1.04-2.69-2.08-3.97-3.12C14.73,53.38,5.21,39.17,8.71,31.65c2.19-4.7,9.66-7.18,21-7.18,14.57,0,35.54,4.09,59.94,12.82,3.47-1.6,6.95-3.14,10.41-4.61C55.42,15.54,10.49,8.9,1.46,28.27c-5.79,12.42,6.11,29.29,26.43,45.89,1.27,1.04,2.57,2.08,3.89,3.1,2.13,1.67,4.35,3.32,6.64,4.96,1.36.98,2.75,1.95,4.17,2.92,14.14,9.76,30.56,19.05,47.28,26.87.13.06.26.13.39.18,1.95.91,3.9,1.8,5.85,2.67-2.17.82-4.34,1.62-6.48,2.4-16.2,5.79-31.6,9.79-45.06,11.65-19.46,2.68-32.87.43-35.87-6.01-3.01-6.45,3.89-18.17,18.45-31.35,2.26-2.04,4.66-4.09,7.2-6.14-2.26-1.64-4.45-3.3-6.56-4.96-2.1,1.73-4.1,3.46-6,5.18C3.73,102-3.31,116.05,1.46,126.28c3.63,7.77,13.33,11.74,28.36,11.74,4.76,0,10.05-.4,15.85-1.2,16.12-2.23,34.89-7.41,54.42-14.94,2.15-.82,4.3-1.68,6.47-2.57,3.46-1.42,6.94-2.9,10.43-4.45,1.95-.87,3.9-1.76,5.85-2.67.13-.06.26-.13.39-.18,16.72-7.82,33.14-17.11,47.28-26.87,1.42-.97,2.8-1.94,4.15-2.92,1.39,1.05,2.74,2.11,4.06,3.18,2.55,2.04,4.95,4.1,7.21,6.14,14.56,13.18,21.46,24.9,18.45,31.35-3,6.45-16.42,8.7-35.88,6.01-13.44-1.86-28.86-5.87-45.06-11.65-3.49,1.61-6.97,3.15-10.44,4.62,19.53,7.53,38.3,12.71,54.42,14.94,5.8.8,11.09,1.2,15.84,1.2,15.04,0,24.74-3.97,28.36-11.74,4.77-10.24-2.26-24.29-20.33-40.65ZM163.7,80.22c-12.38,8.35-27.25,16.82-44.23,24.74-2.23,1.04-4.46,2.05-6.69,3.04-2.08.91-4.15,1.81-6.22,2.68-2.07-.87-4.14-1.76-6.23-2.68-2.23-.98-4.45-2-6.69-3.04-16.97-7.92-31.84-16.39-44.23-24.74-1.45-.98-2.88-1.96-4.26-2.94,1.39-.97,2.81-1.95,4.25-2.92,12.94-8.74,28.02-17.2,44.24-24.77,2.24-1.05,4.47-2.05,6.68-3.04,2.1-.92,4.18-1.83,6.24-2.68,2.05.86,4.13,1.76,6.23,2.68,2.2.98,4.44,1.99,6.68,3.04,16.22,7.57,31.28,16.02,44.23,24.77,1.44.97,2.85,1.94,4.25,2.93-1.38.97-2.8,1.95-4.25,2.93Z"/>
</svg>`,sf=(e,t)=>[...of.matchAll(RegExp(`<path class="${e}" d="([^"]+)"`,`g`))].map(e=>`<path class="logo__${t}" d="${e[1]}"/>`).join(``),cf=sf(`cls-1`,`mark`),lf=sf(`cls-2`,`word`),uf=of.match(/viewBox="([^"]+)"/)[1];function df({large:e=!1}={}){return K`
    <div class="logo ${e?`logo--large`:``}" role="img" aria-label="${L(`app.logo`)}">
      <span class="logo__name">${L(`app.name`)}</span>
      ${Qu(`<svg class="logo__svg" viewBox="${uf}" aria-hidden="true" focusable="false">${cf}${lf}</svg>`)}
    </div>`}function ff({symbol:e,size:t=280}={}){return K`
    <svg class="illustration" viewBox="0 0 280 240" style="max-width:${t}px;color:var(--color-coral)" aria-hidden="true" focusable="false">
      <path fill="var(--color-blob)"
        d="M57 63c30-38 95-49 141-29 47 20 72 70 60 116-12 47-60 80-112 79-52-1-101-37-112-82-8-32 2-58 23-84z" />
      <path fill="var(--color-surface-tint)" opacity="0.9"
        d="M92 82c22-22 66-26 92-6 27 20 31 60 11 86-20 27-63 33-93 18-30-16-41-50-29-73 4-9 11-17 19-25z" />
      <g fill="none" stroke="var(--color-coral)" stroke-width="1.5" opacity="0.55">
        <ellipse cx="140" cy="120" rx="128" ry="44" transform="rotate(-12 140 120)" />
        <ellipse cx="140" cy="120" rx="112" ry="70" transform="rotate(18 140 120)" opacity="0.6" />
      </g>
      <circle cx="31" cy="104" r="5" fill="var(--color-coral)" opacity="0.7" />
      <circle cx="246" cy="148" r="4" fill="var(--color-coral)" opacity="0.5" />
      ${Qu(e?String(q(e,{size:64,strokeWidth:1.4})).replace(`<svg`,`<svg x="108" y="86"`):`
      <circle cx="140" cy="118" r="34" fill="var(--color-coral-soft)" opacity="0.55" />
      <circle cx="140" cy="118" r="18" fill="var(--color-coral)" opacity="0.5" />`)}
    </svg>`}var pf={render(){return J({variant:`screen--language`,body:K`
        <div class="language">
          ${df({large:!0})}
          ${ff({size:220})}
          <h1 class="screen-title language__title" tabindex="-1">
            <span lang="sk">${Hr(`sk`,`language.title`)}</span>
            <span class="language__alt" lang="en">${Hr(`en`,`language.title`)}</span>
          </h1>
          <div class="stack">
            ${Fr.map(e=>K`
                <button type="button" class="choice" data-action="choose" data-lang="${e}" lang="${e}">
                  <span class="choice__badge" aria-hidden="true">${e.toUpperCase()}</span>
                  <span>${Hr(e,`language.${e}`)}</span>
                  <span class="choice__end">${q(`chevronRight`)}</span>
                </button>`)}
          </div>
        </div>`})},actions:{choose(e){let{lang:t}=e.dataset;Rr(t),Lt({language:t}),a(`/start/welcome`)}}},mf={render(){return J({variant:`screen--welcome`,header:Y({back:`/start/language`}),body:K`
        <div class="welcome">
          ${df()}
          <h1 class="screen-title welcome__title" tabindex="-1">${L(`welcome.title`)}</h1>
          <p class="screen-lead">${L(`welcome.text`)}</p>
          ${ff()}
        </div>`,footer:X({label:L(`welcome.cta`),action:`start`,block:!0})})},actions:{start(){a(`/start/privacy`)}}},hf=[`/start/privacy`,`/start/profile`,`/start/goals`,`/start/condition`,`/start/cycle`,`/start/medications`,`/start/reminders`];function gf(e){let t=hf.indexOf(e);return{step:t+1,total:hf.length,prev:hf[t-1]??`/start/welcome`,next:hf[t+1]??`/today`}}var _f=`/start/goals`,vf=[`symptoms`,`triggers`,`patterns`,`doctor`],yf={render(){let{step:e,total:t,prev:n}=gf(_f);return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`goals.title`)}</h1>
        <p class="screen-lead">${L(`goals.lead`)}</p>
        <div class="step-options">
          ${fd({name:`goals`,type:`checkbox`,legend:L(`goals.title`),options:vf.map(e=>({value:e,label:L(`goals.options.${e}`)})),selected:F().goals})}
        </div>`,footer:K`
        ${X({label:L(`common.continue`),type:`submit`,block:!0})}
        ${X({label:L(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onSubmit(e){Lt({goals:new FormData(e).getAll(`goals`)}),a(gf(_f).next)},actions:{skip(){a(gf(_f).next)}}},bf=`/start/condition`,xf=[`vestibular_migraine`,`migraine`,`other_vestibular`,`unsure`],Sf={render(){let{step:e,total:t,prev:n}=gf(bf);return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`condition.title`)}</h1>
        <p class="screen-lead">${L(`condition.lead`)}</p>
        <div class="step-options">
          ${fd({name:`condition`,legend:L(`condition.title`),options:xf.map(e=>({value:e,label:L(`condition.options.${e}`)})),selected:F().condition??`vestibular_migraine`})}
        </div>`,footer:K`
        ${X({label:L(`common.continue`),type:`submit`,block:!0})}
        ${X({label:L(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onSubmit(e){Lt({condition:new FormData(e).get(`condition`)}),a(gf(bf).next)},actions:{skip(){a(gf(bf).next)}}},Cf=`/start/cycle`;function wf(){let{cycleTracking:e}=F();return e===!0?`yes`:e===!1?`no`:null}var Tf={render(){let{step:e,total:t,prev:n}=gf(Cf),r=wf();return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`cycle.title`)}</h1>
        <p class="screen-lead">${L(`cycle.lead`)}</p>
        <div class="step-options">
          ${fd({name:`cycle`,legend:L(`cycle.title`),options:[{value:`yes`,label:L(`cycle.yes`)},{value:`no`,label:L(`cycle.no`)}],selected:r})}
        </div>`,footer:K`
        ${X({label:L(`common.continue`),type:`submit`,block:!0,id:`cycle-continue`,disabled:!r})}
        ${X({label:L(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onChange(e){e.name===`cycle`&&(document.getElementById(`cycle-continue`).disabled=!1)},onSubmit(e){let t=new FormData(e).get(`cycle`);t&&(Lt({cycleTracking:t===`yes`}),a(gf(Cf).next))},actions:{skip(){a(gf(Cf).next)}}},Ef=`/start/medications`;function Df(e){return[L(`medications.types.${e.type}`),e.dose,e.frequency].filter(Boolean).join(` · `)}var Of={render(){let{step:e,total:t,prev:n}=gf(Ef),r=Bt(),i=r.length>0;return J({header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`medications.title`)}</h1>
        <p class="screen-lead">${L(`medications.lead`)}</p>
        ${i?K`
              <h2 class="visually-hidden">${L(`medications.added`)}</h2>
              <ul class="med-list">
                ${r.map(e=>K`
                    <li class="med">
                      <span class="med__main">
                        <span class="med__name">${e.name}</span>
                        <span class="med__meta">${Df(e)}</span>
                      </span>
                      <button type="button" class="icon-btn" data-action="remove" data-id="${e.id}"
                        aria-label="${L(`medications.remove`,{name:e.name})}">
                        ${q(`x`,{size:20})}
                      </button>
                    </li>`)}
              </ul>`:ff({symbol:`pill`,size:240})}
        <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`medications.disclaimer`)}</span></p>`,footer:i?K`
            ${X({label:L(`common.continue`),action:`next`,block:!0})}
            ${X({label:L(`medications.addAnother`),variant:`secondary`,action:`add`,iconName:`plus`,block:!0})}`:K`
            ${X({label:L(`medications.add`),action:`add`,iconName:`plus`,block:!0})}
            ${X({label:L(`common.skip`),variant:`ghost`,action:`next`,block:!0})}`})},actions:{add(){a(`/start/medications/new`)},async remove(e,t){e.disabled=!0,await tl(e.closest(`.med`)),Gt(e.dataset.id),t.rerender()},next(){a(gf(Ef).next)}}},kf=`/start/reminders`,Af={render(){let{step:e,total:t,prev:n}=gf(kf),{reminder:r}=F();return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`reminders.title`)}</h1>
        <p class="screen-lead">${L(`reminders.lead`)}</p>
        ${ff({symbol:`bell`,size:180})}
        <div class="step-options">
          ${fd({name:`reminder`,legend:L(`reminders.title`),options:[{value:`yes`,label:L(`reminders.yes`)},{value:`no`,label:L(`reminders.no`)}],selected:r.enabled?`yes`:null})}
        </div>
        <!-- Zobrazí sa iba pri „Áno“ (CSS :has), bez prekresľovania obrazovky -->
        <div class="reminder-extra">
          ${Z({label:L(`reminders.time`),name:`time`,type:`time`,value:r.time})}
          <p class="field__hint">${L(`reminders.permission`)}</p>
        </div>`,footer:X({label:L(`common.continue`),type:`submit`,block:!0})})},onChange(e){e.name===`reminder`&&e.value===`yes`&&el(document.querySelector(`.reminder-extra`))},async onSubmit(e){let t=new FormData(e),n=t.get(`reminder`)===`yes`,r=String(t.get(`time`)||F().reminder.time);Lt({reminder:{enabled:n&&await Zd(),time:r}}),ef(),bl()}};function Q(e,{actionLabel:t,onAction:n,duration:r}={}){let i=document.getElementById(`toast-region`),a=document.createElement(`div`);a.className=`toast`;let o=document.createElement(`span`);o.textContent=e,a.append(o);let s=setTimeout(c,r??(t?6e3:3500));function c(){clearTimeout(s),rl(a,()=>a.remove())}if(t){let e=document.createElement(`button`);e.type=`button`,e.className=`toast__action`,e.textContent=t,e.addEventListener(`click`,()=>{c(),n?.()}),a.append(e)}i.replaceChildren(a),nl(a)}function jf({title:e,text:t,closeLabel:n=L(`common.close`)}){let r=document.getElementById(`dialog`);return r.setAttribute(`aria-labelledby`,`dialog-title`),r.innerHTML=String(K`
    <h2 class="dialog__title" id="dialog-title">${e}</h2>
    ${t?K`<p class="dialog__text">${t}</p>`:``}
    <form method="dialog" class="dialog__actions">
      <button class="btn btn--primary btn--block" value="close" autofocus>${n}</button>
    </form>`),new Promise(e=>{let t=!1,n=()=>{t||(t=!0,e())};r.querySelector(`form`).addEventListener(`submit`,n),r.addEventListener(`close`,n,{once:!0}),r.showModal(),il(r)})}function Mf({title:e,text:t,choices:n,cancelLabel:r=L(`common.cancel`)}){let i=document.getElementById(`dialog`),a=[t].flat().filter(Boolean);i.setAttribute(`aria-labelledby`,`dialog-title`),i.innerHTML=String(K`
    <h2 class="dialog__title" id="dialog-title">${e}</h2>
    ${a.map(e=>K`<p class="dialog__text">${e}</p>`)}
    <form method="dialog" class="dialog__actions">
      ${n.map(({value:e,label:t,variant:n=`primary`})=>K`<button class="btn btn--${n} btn--block" value="${e}">${t}</button>`)}
      <button class="btn btn--ghost btn--block" value="cancel" autofocus>${r}</button>
    </form>`);let o=n.map(e=>e.value),s=e=>o.includes(e)?e:null;return new Promise(e=>{let t=!1,n=n=>{t||(t=!0,e(n))};i.returnValue=``,i.querySelector(`form`).addEventListener(`submit`,e=>n(s(e.submitter?.value))),i.addEventListener(`close`,()=>n(s(i.returnValue)),{once:!0}),i.showModal(),il(i)})}async function Nf({title:e,text:t,confirmLabel:n,cancelLabel:r}){return await Mf({title:e,text:t,choices:[{value:`confirm`,label:n}],cancelLabel:r})===`confirm`}var Pf={name:``,type:`preventive`,dose:``,frequency:``,note:``,startDate:``};function Ff({returnTo:e}){let t=t=>typeof e==`function`?e(t):e;return{render(e){let n=e.params.id?Vt(e.params.id):null,r={...Pf,...n??{}};return J({form:!0,header:Y({back:t(e)}),body:K`
          <h1 class="screen-title" tabindex="-1">${L(n?`treatment.edit`:`medForm.title`)}</h1>
          <div class="form-stack">
            ${Z({label:L(`medForm.name`),name:`name`,value:r.name,placeholder:L(`medForm.namePlaceholder`),required:!0})}
            <div class="field">
              <span class="field__label" aria-hidden="true">${L(`medForm.type`)}</span>
              ${pd({name:`type`,legend:L(`medForm.type`),selected:r.type,options:[{value:`preventive`,label:L(`medications.types.preventive`)},{value:`acute`,label:L(`medications.types.acute`)}]})}
            </div>
            ${Z({label:L(`medForm.dose`),name:`dose`,value:r.dose,placeholder:L(`medForm.dosePlaceholder`),optional:!0})}
            ${Z({label:L(`medForm.frequency`),name:`frequency`,value:r.frequency,placeholder:L(`medForm.frequencyPlaceholder`),optional:!0})}
            ${Z({label:L(`medForm.startDate`),name:`startDate`,type:`date`,value:r.startDate??``,optional:!0,hint:L(`medForm.startDateHint`)})}
            ${Z({label:L(`medForm.note`),name:`note`,value:r.note,multiline:!0,optional:!0})}
            <p class="disclaimer">${L(`medications.disclaimer`)}</p>
          </div>`,footer:X({label:L(`medForm.submit`),type:`submit`,block:!0})})},onSubmit(e,n){let r=new FormData(e),i=String(r.get(`name`)??``).trim();if(!i){md(e,`name`,L(`medForm.nameRequired`));return}let a={name:i,type:r.get(`type`),dose:String(r.get(`dose`)??``),frequency:String(r.get(`frequency`)??``),note:String(r.get(`note`)??``),startDate:String(r.get(`startDate`)??``)||null};n.params.id&&Vt(n.params.id)?(Wt(n.params.id,a),Q(L(`profile.saved`))):Q(L(`medForm.saved`,{name:Ut(a).name})),s(t(n))}}}var If=e=>e.charAt(0).toLocaleUpperCase(zr())+e.slice(1);function Lf(e=new Date){return If(new Intl.DateTimeFormat(zr(),{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}).format(e))}function Rf(e){return new Intl.DateTimeFormat(zr(),{hour:`2-digit`,minute:`2-digit`}).format(new Date(e))}function zf(e){let t=new Date(e),n=new Date;return t.toDateString()===n.toDateString()?Rf(t):new Intl.DateTimeFormat(zr(),{day:`numeric`,month:`numeric`,hour:`2-digit`,minute:`2-digit`}).format(t)}function Bf(e){return new Intl.DateTimeFormat(zr(),{day:`numeric`,month:`short`,year:`numeric`,hour:`2-digit`,minute:`2-digit`}).format(new Date(e))}function Vf(e){return new Intl.DateTimeFormat(zr(),{day:`numeric`,month:`numeric`,year:`numeric`}).format(new Date(e))}function Hf(e){return If(new Intl.DateTimeFormat(zr(),{month:`long`,year:`numeric`}).format(e))}function Uf(e){return new Intl.NumberFormat(zr(),{minimumFractionDigits:1,maximumFractionDigits:1}).format(e)}function Wf(e,t){return new Intl.NumberFormat(zr(),{style:`currency`,currency:t}).format(e)}function Gf(e){return Kf(0,Math.round(e)*6e4)}function Kf(e,t=new Date){let n=Math.max(0,Math.floor((new Date(t)-new Date(e))/6e4));if(n<1)return L(`duration.underMinute`);if(n<60)return L(`duration.minutes`,{m:n});let r=Math.floor(n/60),i=n%60;return i?L(`duration.hoursMinutes`,{h:r,m:i}):L(`duration.hours`,{h:r})}var qf=[{key:`dizziness`,icon:`orbit`,info:!0},{key:`vertigo`,icon:`rotate3d`,info:!0},{key:`rocking`,icon:`sailboat`,info:!0},{key:`floating`,icon:`cloud`,info:!0},{key:`unsteadiness`,icon:`footprints`,info:!0},{key:`nausea`,icon:`waves`},{key:`vomiting`,icon:`droplets`},{key:`light_sensitivity`,icon:`sun`},{key:`sound_sensitivity`,icon:`volume`},{key:`visual_sensitivity`,icon:`eye`,info:!0},{key:`tinnitus`,icon:`audioWave`,info:!0},{key:`ear_pressure`,icon:`ear`},{key:`headache`,icon:`zap`},{key:`brain_fog`,icon:`cloudFog`,info:!0},{key:`fatigue`,icon:`battery`}],Jf=[`moment`,`under_1h`,`1_3h`,`3_6h`,`6_12h`,`over_12h`],Yf=[`vestibular`,`migraine_headache`,`migraine_no_headache`,`other`,`unsure`],Xf=[`poor_sleep`,`long_sleep`,`stress`,`skipped_meal`,`dehydration`,`caffeine`,`alcohol`,`exertion`,`illness`,`visual_stimulation`,`bright_light`,`strong_smells`,`screen_time`,`neck_pain`,`weather_change`,`menstrual_cycle`,`allergy`,`travel`,`other`],Zf={poor_sleep:`bed`,long_sleep:`moon`,stress:`brain`,skipped_meal:`utensils`,dehydration:`glassWater`,caffeine:`coffee`,alcohol:`wine`,exertion:`dumbbell`,illness:`thermometer`,visual_stimulation:`eye`,bright_light:`sun`,strong_smells:`wind`,screen_time:`monitor`,neck_pain:`bone`,weather_change:`cloud`,menstrual_cycle:`droplet`,allergy:`flower`,travel:`car`,other:`ellipsis`},Qf=[`rest`,`sleep`,`dark_room`,`hydration`,`relaxation`,`cold_compress`,`warm_compress`,`shower`,`food`,`other`],$f=[`work_study`,`sleep`,`daily_activities`,`social`,`movement`,`rest`,`other`,`none`],ep=[`helped`,`partly`,`not_helped`,`unknown`];function tp(e){return e==null?null:e===0?`none`:e<=3?`mild`:e<=6?`moderate`:`severe`}var np=`custom:`,rp=e=>e.startsWith(np);function ip(e){return rp(e)?ln(e)?.label??L(`symptoms.unknown`):L(`symptoms.${e}`)}var ap=e=>qf.find(t=>t.key===e)?.icon??`sparkles`;function op(e){return e==null?L(`intensity.notSet`):L(`intensity.value`,{value:e,level:L(`intensity.${tp(e)}`)})}function sp(e){return e.symptoms.map(e=>e.intensity==null?ip(e.key):`${ip(e.key)} ${e.intensity}`).join(`, `)}var cp=e=>L(`durations.${e}`),lp=e=>L(`effects.${e}`),up=e=>L(`triggers.${e}`),dp=e=>L(`episodeTypes.${e}`),fp=e=>L(`relief.${e}`),pp=e=>L(`impact.${e}`),mp=e=>L(`sleep.qualities.${e}`);function hp({href:e,iconName:t,title:n,meta:r,badge:i}){return K`
    <li>
      <a class="entry" href="${e}">
        ${q(t)}
        <span class="entry__main">
          <span class="entry__title">${n}${i??``}</span>
          <span class="entry__meta">${r}</span>
        </span>
        ${q(`chevronRight`,{size:20})}
      </a>
    </li>`}function gp(e){return hp({href:`#/episode/${e.id}`,iconName:`timer`,title:L(`episode.title`),badge:e.endedAt?``:_d(L(`episode.statusOngoing`),{live:!0}),meta:e.endedAt?`${zf(e.startedAt)} – ${Rf(e.endedAt)} · ${Kf(e.startedAt,e.endedAt)}`:L(`episode.since`,{time:zf(e.startedAt)})})}function _p(e){let t=sn(e);return hp({href:`#/symptom/${e.id}`,iconName:`activity`,title:sp(e),meta:[Rf(e.occurredAt),t==null?``:L(`intensity.highest`,{value:op(t)})].filter(Boolean).join(` · `)})}function vp(e){let t=Vt(e.medicationId);return hp({href:`#/intake/${e.id}`,iconName:`pill`,title:[t?.name??L(`today.intakeTitle`),e.dose].filter(Boolean).join(` `),meta:[Rf(e.takenAt),e.effect?lp(e.effect):``].filter(Boolean).join(` · `)})}function yp(e){return hp({href:`#/sleep?date=${e.date}`,iconName:`bed`,title:L(`sleep.entry`,{duration:Gf(e.minutes)}),meta:[e.quality?mp(e.quality):L(`sleep.title`),e.source&&e.source!==`manual`?L(`plus.health.providers.${e.source}`):``].filter(Boolean).join(` · `)})}function bp({episodes:e=[],symptomLogs:t=[],intakes:n=[],sleep:r=null}){return K`<ul class="entries">${[...e.map(e=>({at:e.startedAt,render:()=>gp(e)})),...t.map(e=>({at:e.occurredAt,render:()=>_p(e)})),...n.map(e=>({at:e.takenAt,render:()=>vp(e)})),...r?[{at:r.wakeTime??xt(r.date,`06:00`),render:()=>yp(r)}]:[]].sort((e,t)=>t.at.localeCompare(e.at)).map(e=>e.render())}</ul>`}var xp=`vestie-backup`,Sp=5e6,Cp=30,wp=14;async function Tp(e){let t=await ve(zn(),e);return JSON.stringify({format:xp,version:1,createdAt:new Date().toISOString(),...t},null,2)}var Ep=e=>e?.format===xp&&typeof e.kdf?.salt==`string`&&Number.isInteger(e.kdf?.iterations)&&e.kdf.iterations>0&&e.kdf.iterations<=Sp&&typeof e.cipher?.iv==`string`&&typeof e.cipher?.data==`string`;function Dp(e){let t;try{t=JSON.parse(e)}catch{return null}return Ep(t)?{kind:`encrypted`,backup:t,createdAt:t.createdAt??null}:qn(t)?{kind:`plain`,records:t}:null}async function Op(e,t){try{let n=await ye(e,t);return qn(n)?n:null}catch{return null}}function kp(){let{episodes:e,symptomLogs:t,sleepLogs:n}=zn(),r=[...e.map(e=>e.startedAt),...t.map(e=>e.occurredAt),...n.map(e=>`${e.date}T12:00:00`)].map(e=>new Date(e).getTime()).filter(Number.isFinite);return r.length?Math.min(...r):null}function Ap(e=new Date){let{remind:t,lastAt:n,snoozedUntil:r}=F().backup;if(!t||r&&new Date(r)>e)return!1;if(n)return M(new Date(n),Cp)<=e;let i=kp();return i!=null&&M(new Date(i),wp)<=e}var jp=null;function Mp({logId:e=null,date:t=null}={}){let n=e?tn(e):null,r=n?new Date(n.occurredAt):new Date;return jp={id:n?.id??null,symptoms:n?n.symptoms.map(e=>({...e,pending:!1})):[],vertigoType:n?.vertigoType??null,duration:n?.duration??null,note:n?.note??``,date:n?A(r):t??A(r),time:bt(r),episodeId:n?.episodeId??null,linkEpisode:!n||!!n.episodeId},jp}var Np=()=>jp;function Pp(){jp=null}function Fp(){return[`/log/symptoms`,`/log/intensity`,`/log/details`]}function Ip(e){let t=Fp(),n=t.indexOf(e);return{step:n+1,total:t.length,prev:t[n-1]??null,next:t[n+1]??null}}var Lp=e=>e.intensity??(e.pending?5:null);function Rp(e,t){e.intensity=t,e.pending=!1}function zp(e){e.pending&&Rp(e,5)}function Bp({index:e,label:t,value:n,iconName:r}){let i=`int-${e}`;return K`
    <div class="intensity ${n==null?`is-unset`:``}" data-index="${e}">
      <div class="intensity__head">
        ${r?K`<span class="intensity__icon">${q(r,{size:22})}</span>`:``}
        <label class="intensity__label" for="${i}">${t}</label>
      </div>
      <output class="intensity__value" for="${i}">${op(n)}</output>
      <input class="range" type="range" id="${i}" data-index="${e}" min="0" max="10" step="1"
        value="${n??5}" aria-valuetext="${op(n)}" />
      <div class="intensity__scale" aria-hidden="true"><span>0</span><span>5</span><span>10</span></div>
      <!-- Vynechať a späť zadať: jedno z dvoch tlačidiel je vždy viditeľné -->
      <div class="intensity__actions">
        <button type="button" class="pill-btn" data-action="clear" data-index="${e}" aria-label="${L(`log.clearLabel`,{name:t})}"${n==null?K` hidden`:``}>
          ${q(`x`,{size:16,strokeWidth:2.25})}${L(`log.clear`)}
        </button>
        <button type="button" class="pill-btn pill-btn--accent" data-action="restore" data-index="${e}"${n==null?``:K` hidden`}>
          ${q(`plus`,{size:16,strokeWidth:2.25})}${L(`log.restore`)}
        </button>
      </div>
    </div>`}function Vp(e,t){let n=document.querySelector(`.intensity[data-index="${e}"]`),r=t==null;n.classList.toggle(`is-unset`,r),n.querySelector(`.intensity__value`).textContent=op(t),n.querySelector(`[data-action="clear"]`).hidden=r,n.querySelector(`[data-action="restore"]`).hidden=!r;let i=n.querySelector(`input[type="range"]`);i.setAttribute(`aria-valuetext`,op(t)),r&&(i.value=5)}var Hp=e=>e.normalize(`NFD`).replace(/\p{Diacritic}/gu,``).toLowerCase();function Up(){return[...qf.map(e=>({key:e.key,icon:e.icon,label:ip(e.key),info:!!e.info})),...cn().map(e=>({key:e.key,icon:`sparkles`,label:e.label}))]}function Wp({name:e,legend:t,items:n,selected:r,search:i=!1}){return K`
    <fieldset class="sym-grid">
      <legend class="visually-hidden">${t}</legend>
      ${n.map(t=>K`
          <div class="sym-cell ${t.info?`sym-cell--info`:``}"${i?K` data-search="${Hp(t.label)}"`:``}>
            <label class="sym-tile">
              <input type="checkbox" name="${e}" value="${t.key}" id="${e}-${t.key}"${r.includes(t.key)?K` checked`:``} />
              <span class="sym-tile__icon">${q(t.icon,{size:22})}</span>
              <span class="sym-tile__label">${t.label}</span>
              <span class="sym-tile__check">${q(`check`,{size:14,strokeWidth:3})}</span>
            </label>
            ${t.info?K`<button type="button" class="sym-tile__info" data-action="symptomInfo" data-key="${t.key}"
                  aria-label="${L(`symptomInfo.open`,{name:t.label})}">${q(`info`,{size:20})}</button>`:``}
          </div>`)}
    </fieldset>`}var Gp={symptomInfo(e){let{key:t}=e.dataset;jf({title:ip(t),text:L(`symptomInfo.${t}`),closeLabel:L(`symptomInfo.close`)}).then(()=>e.focus())}};function Kp(e){let{startedAt:t,endedAt:n}=e,r=n?St(t,n)?Rf(n):zf(n):L(`episode.statusOngoing`);return`${zf(t)} – ${r} · ${Kf(t,n??new Date)}`}function qp(e=[],t,n){let r=e.filter(e=>e!==`other`).map(t);return e.includes(`other`)&&r.push(n?.trim()||t(`other`)),r.length?r.join(`, `):null}function Jp(e){let t=_n(e.id);return t.length?t.map(e=>[Vt(e.medicationId)?.name,e.dose,Rf(e.takenAt)].filter(Boolean).join(` · `)).join(`, `):null}function Yp(e,{withTime:t=!0}={}){return[{key:`type`,step:`type`,value:e.type?dp(e.type):null},{key:`intensity`,step:`type`,value:e.intensity==null?null:op(e.intensity)},t&&{key:`time`,value:Kp(e)},{key:`symptoms`,step:`symptoms`,value:e.symptoms?.length?sp(e):null},{key:`triggers`,step:`triggers`,value:qp(e.triggers,up,e.triggerOther)},{key:`meds`,step:`meds`,value:Jp(e)},{key:`helped`,step:`meds`,value:e.helped?lp(e.helped):null},{key:`relief`,step:`relief`,value:qp(e.relief,fp,e.reliefOther)},{key:`impact`,step:`impact`,value:qp(e.impact,pp,e.impactOther)}].filter(Boolean)}var Xp=e=>Yp(e,{withTime:!1}).some(e=>e.value);function Zp(e,{editable:t=!1}={}){return t?K`
      <ul class="summary-list">
        ${e.map(e=>{let t=L(`episodeFlow.sections.${e.key}`);return e.step?K`
            <li>
              <button type="button" class="summary-row summary-row--edit" data-action="edit" data-step="${e.step}">
                <span class="summary-row__text">
                  <span class="summary-row__label">${t}</span>
                  <span class="summary-row__value">${e.value}</span>
                </span>
                <span class="summary-row__edit" aria-hidden="true">${q(`pencil`,{size:18})}</span>
                <span class="visually-hidden">${L(`episodeFlow.edit`)}</span>
              </button>
            </li>`:K`
              <li class="summary-row">
                <span class="summary-row__label">${t}</span>
                <span class="summary-row__value">${e.value}</span>
              </li>`})}
      </ul>`:K`
    <dl class="summary-list">
      ${e.map(e=>K`
          <div class="summary-row">
            <dt class="summary-row__label">${L(`episodeFlow.sections.${e.key}`)}</dt>
            <dd class="summary-row__value">${e.value}</dd>
          </div>`)}
    </dl>`}var $=null;function Qp(e){let t=new Date(e.startedAt),n=e.endedAt&&new Date(e.endedAt)?t:new Date;return{episodeId:e.id,type:e.type??null,overall:{intensity:e.intensity??null,pending:e.intensity==null&&!Xp(e)},symptoms:(e.symptoms??[]).map(e=>({...e,pending:!1})),triggers:[...e.triggers??[]],triggerOther:e.triggerOther??``,medIds:[],medDate:A(n),medTime:bt(n),helped:e.helped??null,relief:[...e.relief??[]],reliefOther:e.reliefOther??``,impact:[...e.impact??[]],impactOther:e.impactOther??``}}function $p(e){return $=Qp(e),`/episode/${e.id}/details/${Xp(e)?`summary`:`type`}`}function em(){return[`type`,`symptoms`,...$.symptoms.length?[`intensity`]:[],`triggers`,`meds`,`relief`,`impact`,`summary`]}var tm=(e,t,n)=>n?[...new Set([...e,t])]:e.filter(e=>e!==t);function nm(e,t){return md(document.querySelector(`.screen`),e,t),!1}function rm(e){let t=new Date(e);return t.setSeconds(0,0),t}function im(){let e=$.episodeId;gn(e,{type:$.type,intensity:$.overall.intensity,symptoms:$.symptoms.map(({key:e,intensity:t})=>({key:e,intensity:t})),triggers:[...$.triggers],triggerOther:$.triggers.includes(`other`)?$.triggerOther.trim():``,helped:$.helped,relief:[...$.relief],reliefOther:$.relief.includes(`other`)?$.reliefOther.trim():``,impact:[...$.impact],impactOther:$.impact.includes(`other`)?$.impactOther.trim():``})}function am(){let e=dn($.episodeId),t=new Date(e.startedAt).getTime(),n=e.endedAt?new Date(e.endedAt).getTime():Date.now(),r=new Date(Math.min(Math.max(new Date(xt($.medDate,$.medTime)).getTime(),t),n)).toISOString();for(let e of Bt().filter(e=>$.medIds.includes(e.id)))Zt({medicationId:e.id,takenAt:r,dose:e.dose,effect:$.helped});$.medIds=[];let i=_n($.episodeId);if($.helped)for(let e of i.filter(e=>!e.effect))Qt(e.id,{effect:$.helped});gn($.episodeId,{medicationIntakeIds:i.map(e=>e.id)})}var om=(e,t,n)=>K`
  <div class="field-row">
    ${Z({label:L(`episodeFlow.date`),name:`${e}Date`,type:`date`,value:t})}
    ${Z({label:L(`episodeFlow.time`),name:`${e}Time`,type:`time`,value:n})}
  </div>`,sm=(e,t,n)=>K`
  <div class="form-section" id="${e}-wrap"${t.includes(`other`)?``:K` hidden`}>
    ${Z({label:L(`episodeFlow.${e}`),name:e,value:n,placeholder:L(`episodeFlow.${e}Placeholder`),maxlength:80})}
  </div>`,cm={type:{title:()=>L(`episodeFlow.typeTitle`),lead:()=>L(`episodeFlow.typeLead`),body:()=>K`
      <div class="step-options">
        ${fd({name:`episodeType`,legend:L(`episodeFlow.sections.type`),options:Yf.map(e=>({value:e,label:dp(e)})),selected:$.type})}
      </div>
      <div class="intensity-list form-section">
        ${Bp({index:`overall`,label:L(`episodeFlow.intensity`),value:Lp($.overall)})}
      </div>`,onChange(e){e.name===`episodeType`&&($.type=e.value)},confirm:()=>zp($.overall)},symptoms:{title:()=>L(`episodeFlow.symptomsTitle`),lead:()=>L(`episodeFlow.symptomsLead`),body:()=>K`
      ${Wp({name:`symptom`,legend:L(`episodeFlow.symptomsTitle`),items:Up(),selected:$.symptoms.map(e=>e.key)})}
      <form class="custom-add" data-form="custom">
        <label class="field__label" for="custom-symptom">${L(`log.custom`)}</label>
        <div class="custom-add__row">
          <input class="field__input" id="custom-symptom" name="custom" maxlength="40" autocomplete="off"
            placeholder="${L(`log.customPlaceholder`)}" />
          <button type="submit" class="btn btn--secondary btn--compact">${q(`plus`,{size:20})}<span>${L(`log.customAdd`)}</span></button>
        </div>
      </form>`,onChange(e){e.name===`symptom`&&(e.checked?$.symptoms.push({key:e.value,intensity:null,pending:!0}):$.symptoms=$.symptoms.filter(t=>t.key!==e.value))}},intensity:{title:()=>L(`log.intensityTitle`),lead:()=>L(`log.intensityLead`),body:()=>K`
      <div class="intensity-list">
        ${$.symptoms.map((e,t)=>Bp({index:t,label:ip(e.key),value:Lp(e),iconName:ap(e.key)}))}
      </div>`,confirm:()=>$.symptoms.forEach(zp)},triggers:{title:()=>L(`episodeFlow.triggersTitle`),lead:()=>L(`episodeFlow.triggersLead`),body:()=>K`
      ${Wp({name:`trigger`,legend:L(`episodeFlow.triggersTitle`),items:Xf.map(e=>({key:e,icon:Zf[e],label:up(e)})),selected:$.triggers})}
      <div class="form-section" id="trigger-other"${$.triggers.includes(`other`)?``:K` hidden`}>
        ${Z({label:L(`episodeFlow.triggerOther`),name:`triggerOther`,value:$.triggerOther,placeholder:L(`episodeFlow.triggerOtherPlaceholder`),maxlength:80})}
      </div>`,onChange(e){e.name===`trigger`&&($.triggers=tm($.triggers,e.value,e.checked),e.value===`other`&&(document.getElementById(`trigger-other`).hidden=!e.checked))},onInput(e){e.name===`triggerOther`&&($.triggerOther=e.value)}},meds:{title:()=>L(`episodeFlow.medsTitle`),lead:()=>L(`episodeFlow.medsLead`),body:()=>{let e=Bt(),t=_n($.episodeId);return K`
        ${t.length?K`<section class="form-section" aria-labelledby="meds-logged">
              <h2 class="section-title" id="meds-logged">${L(`episodeFlow.medsLogged`)}</h2>
              ${bp({intakes:t})}
            </section>`:``}
        ${e.length?K`
              <div class="step-options">
                ${fd({name:`med`,type:`checkbox`,legend:L(`episodeFlow.medsTitle`),options:e.map(e=>({value:e.id,label:[e.name,e.dose].filter(Boolean).join(` · `)})),selected:$.medIds})}
              </div>
              <fieldset class="form-section" id="med-when"${$.medIds.length?``:K` hidden`}>
                <legend class="section-title">${L(`episodeFlow.medsWhen`)}</legend>
                ${om(`med`,$.medDate,$.medTime)}
              </fieldset>`:K`<p class="empty form-section">${L(`episodeFlow.medsNone`)}</p>`}
        <div class="form-section">
          ${X({label:L(`episodeFlow.addMed`),iconName:`plus`,variant:`secondary`,action:`addMed`,block:!0})}
        </div>
        ${e.length||t.length?K`<fieldset class="form-section">
              <legend class="section-title">${L(`episodeFlow.helped`)}</legend>
              ${fd({name:`helped`,legend:L(`episodeFlow.helped`),options:ep.map(e=>({value:e,label:lp(e)})),selected:$.helped})}
            </fieldset>`:``}`},onChange(e){e.name===`med`&&($.medIds=tm($.medIds,e.value,e.checked),document.getElementById(`med-when`).hidden=!$.medIds.length),e.name===`helped`&&($.helped=e.value),[`medDate`,`medTime`].includes(e.name)&&e.value&&($[e.name]=e.value)},validate(){if(!$.medIds.length)return!0;let e=dn($.episodeId),t=new Date(xt($.medDate,$.medTime));return t>=rm(e.startedAt)&&t<=rm(e.endedAt??new Date)||nm(`medTime`,L(`episodeFlow.medsOutside`))},afterCommit:am},relief:{title:()=>L(`episodeFlow.reliefTitle`),lead:()=>L(`episodeFlow.reliefLead`),body:()=>K`
      <div class="step-options">
        ${fd({name:`relief`,type:`checkbox`,legend:L(`episodeFlow.reliefTitle`),options:Qf.map(e=>({value:e,label:fp(e)})),selected:$.relief})}
      </div>
      ${sm(`reliefOther`,$.relief,$.reliefOther)}`,onChange(e){e.name===`relief`&&($.relief=tm($.relief,e.value,e.checked),e.value===`other`&&(document.getElementById(`reliefOther-wrap`).hidden=!e.checked))},onInput(e){e.name===`reliefOther`&&($.reliefOther=e.value)}},impact:{title:()=>L(`episodeFlow.impactTitle`),lead:()=>L(`episodeFlow.impactLead`),body:()=>K`
      <div class="step-options">
        ${fd({name:`impact`,type:`checkbox`,legend:L(`episodeFlow.impactTitle`),options:$f.map(e=>({value:e,label:pp(e)})),selected:$.impact})}
      </div>
      ${sm(`impactOther`,$.impact,$.impactOther)}`,onChange(e){if(e.name!==`impact`)return;$.impact=tm($.impact,e.value,e.checked);let t=$.impact.filter(e=>e!==`none`);if(e.checked&&(e.value===`none`?t.length:$.impact.includes(`none`))){$.impact=e.value===`none`?[`none`]:t;for(let e of document.querySelectorAll(`input[name="impact"]`))e.checked=$.impact.includes(e.value)}document.getElementById(`impactOther-wrap`).hidden=!$.impact.includes(`other`)},onInput(e){e.name===`impactOther`&&($.impactOther=e.value)}},summary:{title:()=>L(`episodeFlow.summaryTitle`),lead:()=>L(`episodeFlow.summaryLead`),body:e=>{let t=Yp(e),n=t.filter(e=>!e.value);return K`
        <div class="summary-status">
          ${e.endedAt?_d(L(`episode.statusEnded`),{neutral:!0}):_d(L(`episode.statusOngoing`),{live:!0})}
        </div>
        ${Zp(t.filter(e=>e.value),{editable:!0})}
        ${n.length?K`<section class="summary-missing" aria-labelledby="missing-title">
              <h2 class="section-title" id="missing-title">${L(`episodeFlow.summaryMissing`)}</h2>
              <div class="summary-missing__list">
                ${n.map(e=>K`<button type="button" class="chip-btn" data-action="edit" data-step="${e.step}">
                    ${q(`plus`,{size:16})}${L(`episodeFlow.sections.${e.key}`)}
                  </button>`)}
              </div>
            </section>`:``}`}}};function lm(){return J({header:Y({back:`/today`}),body:K`<h1 class="screen-title" tabindex="-1">${L(`episode.title`)}</h1>
      <p class="screen-lead">${L(`episode.notFound`)}</p>`})}var um=e=>cm[e.params.step]&&em().includes(e.params.step)?e.params.step:`type`;function dm(e){let t=cm[um(e)];return t.validate&&!t.validate()?!1:(im(),t.afterCommit?.(),!0)}var fm=(e,t)=>`/episode/${e.params.id}/details/${t}`,pm=e=>e===`overall`?$.overall:$.symptoms[Number(e)],mm={render(e){let t=dn(e.params.id);if(!t)return lm();(!$||$.episodeId!==t.id)&&($=Qp(t));let n=um(e),r=cm[n],i=em();return J({header:Y({backAction:`prevStep`,step:i.indexOf(n)+1,total:i.length}),body:K`
        <h1 class="screen-title" tabindex="-1">${r.title(t)}</h1>
        ${r.lead?K`<p class="screen-lead">${r.lead(t)}</p>`:``}
        ${r.body(t)}`,footer:n===`summary`?X({label:L(`episodeFlow.save`),iconName:`check`,action:`save`,block:!0}):K`
              ${X({label:L(`common.continue`),action:`next`,block:!0})}
              ${X({label:L(`episode.saveLater`),variant:`ghost`,action:`later`,block:!0})}`})},onChange(e,t){if(e.type===`range`)return this.onInput(e,t);cm[um(t)].onChange?.(e)},onInput(e,t){if(e.type===`range`){let t=Number(e.value);Rp(pm(e.dataset.index),t),Vp(e.dataset.index,t)}else cm[um(t)].onInput?.(e)},onSubmit(e,t){if(e.dataset.form!==`custom`)return;let n=un(e.elements.custom.value);n&&($.symptoms.some(e=>e.key===n.key)||$.symptoms.push({key:n.key,intensity:null,pending:!0}),t.rerender())},actions:{...Gp,clear(e){let{index:t}=e.dataset;Rp(pm(t),null),Vp(t,null),document.querySelector(`[data-action="restore"][data-index="${t}"]`).focus()},restore(e){let{index:t}=e.dataset;Rp(pm(t),5),Vp(t,5),document.getElementById(`int-${t}`).focus()},next(e,t){if(cm[um(t)].confirm?.(),!dm(t))return;let n=em(),r=n[n.indexOf(um(t))+1],i=t.query.from===`summary`,o=i&&r!==`intensity`?`summary`:r;a(`${fm(t,o)}${i&&o!==`summary`?`?from=summary`:``}`,{replace:!0})},prevStep(e,t){if(!dm(t))return;let n=em(),r=n.indexOf(um(t));t.query.from===`summary`?a(fm(t,`summary`),{replace:!0}):a(r>0?fm(t,n[r-1]):`/episode/${t.params.id}`,{replace:!0})},later(e,t){dm(t)&&($=null,a(`/today`,{replace:!0}),Q(L(`episode.savedLater`)))},save(){im(),$=null,a(`/today`,{replace:!0}),Q(L(`episodeFlow.saved`))},edit(e,t){a(`${fm(t,e.dataset.step)}?from=summary`,{replace:!0})},addMed(e,t){dm(t)&&a(`/treatment/new`)}}};function hm(e){return K`
    <section class="card card--accent episode-live" aria-labelledby="live-title">
      <div class="episode-live__head">
        ${_d(L(`episode.statusOngoing`),{live:!0})}
        <span class="muted small">${L(`episode.since`,{time:zf(e.startedAt)})}</span>
      </div>
      <div>
        <h2 class="card__title" id="live-title">${L(`episode.title`)}</h2>
        <p class="muted">${L(`episode.lasting`,{duration:Kf(e.startedAt)})}</p>
      </div>
      <div class="btn-row">
        ${X({label:L(`episode.addDetails`),variant:`secondary`,action:`details`,compact:!0})}
        ${X({label:L(`episode.end`),variant:`secondary`,action:`endEpisode`,data:{id:e.id},compact:!0})}
      </div>
    </section>`}function gm(e,t,n,{href:r,add:i,empty:a=!1}={}){let o=K`
    <span class="tile__label">${q(e,{size:18})}${t}</span>
    <span class="tile__value${a?` tile__value--empty`:``}">${n}</span>`;return r?K`<a class="tile tile--link" href="${r}">${o}</a>`:i?K`
    <div class="tile tile--with-add">
      ${o}
      <a class="tile__add" href="${i.href}" aria-label="${i.label}" title="${i.label}">${q(`plus`,{size:22,strokeWidth:2.25})}</a>
    </div>`:K`<div class="tile">${o}</div>`}var _m=(e,t,n)=>gm(e,t,K`<span class="tile__lock">${q(`lock`,{size:14})}${L(`plus.name`)}</span>`,{href:`#/plus?from=${n}`});function vm(){let e=L(`today.pressure`),t=L(`today.steps`);if(!I())return[_m(`gauge`,e,`weather`),_m(`footprints`,t,`health`)];let{weather:n,health:r}=F(),i=n.enabled?kn(A()):null,a=r.connected&&r.types.includes(`steps`)?Nn(A()):null;return[i?gm(`gauge`,e,[wd(i.pressure),i.pressureChange==null?``:Dd(i.pressureChange)].filter(Boolean).join(` · `),{href:`#/plus/weather`}):gm(`gauge`,e,L(`today.turnOn`),{href:`#/plus/weather`,empty:!0}),a?.steps==null?gm(`footprints`,t,Dl()?L(`today.connect`):L(`today.mobileOnly`),{href:`#/plus/health`,empty:!0}):gm(`footprints`,t,Ad(a.steps),{href:`#/plus/health`})]}function ym(e){let t=new Map;for(let n of e)for(let e of n.symptoms){let n=t.get(e.key);t.set(e.key,n==null?e.intensity:Math.max(n,e.intensity??n))}return K`
    <ul class="sym-chips" aria-label="${L(`today.symptomsToday`)}">
      ${[...t].map(([e,t])=>K`<li class="sym-chip">${ip(e)}${t==null?``:K` <strong>${t}</strong>`}</li>`)}
    </ul>`}function bm(){if(!Ap())return``;let{lastAt:e}=F().backup;return K`
    <section class="card backup-card" aria-labelledby="backup-title">
      <div class="backup-card__head">
        ${q(`backup`,{size:22})}
        <h2 class="card__title" id="backup-title">${L(`backup.card.title`)}</h2>
      </div>
      <p class="muted">${e?L(`backup.card.textOld`,{date:Vf(e)}):L(`backup.card.textNever`)}</p>
      <div class="btn-row">
        ${X({label:L(`backup.card.action`),variant:`secondary`,action:`openBackup`,compact:!0})}
        ${X({label:L(`backup.card.later`),variant:`ghost`,action:`snoozeBackup`,compact:!0})}
      </div>
    </section>`}function xm(){let e=K`<span class="visually-hidden">${L(`community.external`)}</span>`,t=(t,n)=>{let r=K`
      ${q(n)}
      <span class="list__text">
        <span class="list__label">${L(`community.${t}`)}</span>
        <span class="list__hint">${L(`community.${t}Hint`)}</span>
      </span>`;return be[t]?K`
      <a class="list__row" href="${be[t]}" target="_blank" rel="noopener noreferrer">
        ${r}
        <span class="community__ext">${q(`externalLink`,{size:18})}</span>
        ${e}
      </a>`:K`<div class="list__row">${r}${_d(L(`community.soon`),{neutral:!0})}</div>`};return K`
    <section class="section" aria-labelledby="community-title">
      <h2 class="section-title" id="community-title">${L(`community.title`)}</h2>
      <p class="community__lead">${L(`community.lead`)}</p>
      <div class="list">${t(`facebook`,`users`)}${t(`instagram`,`camera`)}${t(`discord`,`messages`)}</div>
      <div class="community-web">
        <h3 class="community-web__title">${L(`community.webTitle`)}</h3>
        <p class="muted">${L(`community.webText`)}</p>
        <a class="community-web__link" href="${be.web}" target="_blank" rel="noopener noreferrer">
          ${L(`community.webUrl`)}${q(`externalLink`,{size:18})}${e}
        </a>
      </div>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`community.note`)}</span></p>
    </section>`}var Sm={render(){let{name:e}=F(),t=Vn(),n=fn(),r=t.episodes.length+t.symptomLogs.length+t.intakes.length>0||!!t.sleep,i=t.sleep?[Gf(t.sleep.minutes),t.sleep.quality?mp(t.sleep.quality):``].filter(Boolean).join(` · `):``,a=`#/sleep?date=${A()}`,o=L(`today.nothingYet`);return ad(`today`,K`
      <header class="today-header">
        <h1 class="screen-title today-title" tabindex="-1">
          ${e?L(`today.greetingName`,{name:e}):L(`today.greeting`)}
        </h1>
        ${ud()}
        <p class="today-date">${Lf()}</p>
      </header>

      ${n?hm(n):``}

      <section class="card feeling" aria-labelledby="feeling-title">
        <h2 class="card__title" id="feeling-title">${L(`today.howAreYou`)}</h2>
        ${t.symptomLogs.length?ym(t.symptomLogs):K`${ff({size:150})}<p class="muted">${L(`today.noEntries`)}</p>`}
        <div class="btn-row">
          ${X({label:L(`today.addSymptom`),iconName:`plus`,action:`addSymptom`,compact:!0})}
        </div>
      </section>

      ${n?``:Hd()}

      <section class="section" aria-labelledby="overview-title">
        <h2 class="section-title" id="overview-title">${L(`today.overview`)}</h2>
        <div class="tiles tiles--grid">
          ${t.sleep?gm(`bed`,L(`today.sleep`),i,{href:a}):gm(`bed`,L(`today.sleep`),o,{empty:!0,add:{href:a,label:L(`sleep.add`)}})}
          ${gm(`pill`,L(`today.meds`),t.intakes.length?Ur(`plural.entries`,t.intakes.length):o,{empty:!t.intakes.length,add:{href:`#/medication-intake`,label:L(`today.logIntake`)}})}
          ${vm()}
        </div>
        ${r?bp(t):K`<p class="empty">${L(`today.entriesEmpty`)}</p>`}
      </section>

      ${n?``:bm()}

      ${xm()}`)},mount(e,t){if(!fn())return null;let n=setInterval(()=>t.rerender(),3e4);return()=>clearInterval(n)},actions:{addSymptom(){Mp(),a(`/log/symptoms`)},details(){a($p(fn()))},openBackup(){a(`/backup`)},async snoozeBackup(e,t){await tl(e.closest(`.backup-card`)),Zn(14),t.rerender()},async endEpisode(e,t){let{id:n}=e.dataset;e.disabled=!0,await tl(e.closest(`.episode-live`)),hn(n),t.rerender(),Q(L(`episode.endedToast`),{actionLabel:L(`common.undo`),onAction:()=>{vn(n),t.rerender()}})}}};function Cm(){return J({header:Y({back:`/today`}),body:K`<h1 class="screen-title" tabindex="-1">${L(`episode.title`)}</h1>
      <p class="screen-lead">${L(`episode.notFound`)}</p>`})}function wm(e){return J({variant:`screen--center`,header:Y({back:`/today`}),body:K`
      <div class="episode-started">
        ${vd(`timer`,{large:!0})}
        <h1 class="screen-title" tabindex="-1">${L(`episode.started`)}</h1>
        <p class="big-time">
          <span class="big-time__label">${L(`episode.startedAt`)}</span>
          <time datetime="${e.startedAt}">${Rf(e.startedAt)}</time>
        </p>
        <p class="muted">${L(`episode.detailsLater`)}</p>
      </div>`,footer:K`
      ${X({label:L(`episode.addDetails`),action:`addDetails`,block:!0})}
      ${X({label:L(`episode.finishLater`),variant:`outline`,action:`finishLater`,block:!0})}
      <p class="mistake">
        <span>${L(`episode.mistake`)}</span>
        <button type="button" class="link-btn" data-action="cancelNew">${L(`episode.cancel`)}</button>
      </p>`})}function Tm(e){let t=nn(e.id),n=qt().filter(t=>t.episodeId===e.id);return K`
    ${t.length?K`<section class="section"><h2 class="section-title">${L(`episode.linkedSymptoms`)}</h2>${bp({symptomLogs:t})}</section>`:``}
    ${n.length?K`<section class="section"><h2 class="section-title">${L(`episode.linkedIntakes`)}</h2>${bp({intakes:n})}</section>`:``}`}function Em(e){let t=!e.endedAt,n=Xp(e),r=Yp(e,{withTime:!1}).filter(e=>e.value);return J({header:Y({back:`/today`}),body:K`
      <div class="episode-head">
        <h1 class="screen-title" tabindex="-1">${L(`episode.title`)}</h1>
        ${t?_d(L(`episode.statusOngoing`),{live:!0}):_d(L(`episode.statusEnded`),{neutral:!0})}
      </div>
      <p class="screen-lead">${Lf(new Date(e.startedAt))}</p>
      <dl class="facts">
        <div class="fact">
          <dt>${L(`episode.startedAt`)}</dt>
          <dd>${Rf(e.startedAt)}</dd>
        </div>
        <div class="fact">
          <dt>${L(`episode.endedAt`)}</dt>
          <dd>${t?`—`:Rf(e.endedAt)}</dd>
        </div>
        <div class="fact">
          <dt>${L(`episode.duration`)}</dt>
          <dd>${Kf(e.startedAt,e.endedAt??new Date)}</dd>
        </div>
      </dl>
      ${n?K`<section class="section" aria-labelledby="details-title">
            <h2 class="section-title" id="details-title">${L(`episode.details`)}</h2>
            ${Zp(r)}
          </section>`:``}
      ${Ld(A(e.startedAt))?K`<section class="section" aria-labelledby="context-title">
            <h2 class="section-title" id="context-title">${L(`plus.weather.episodeDay`)}</h2>
            ${Ld(A(e.startedAt))}
          </section>`:``}
      ${Tm(e)}`,footer:K`
      ${t?X({label:L(`episode.end`),action:`end`,block:!0}):``}
      ${X({label:L(n?`episode.editDetails`:`episode.addDetails`),variant:t?`secondary`:`primary`,action:`addDetails`,block:!0})}
      ${t||n?``:X({label:L(`episode.saveLater`),variant:`secondary`,action:`saveLater`,block:!0})}
      ${X({label:L(`episode.delete`),variant:`danger`,action:`delete`,block:!0})}`})}var Dm={render(e){let t=dn(e.params.id);return t?e.query.new===`1`&&!t.endedAt?wm(t):Em(t):Cm()},actions:{addDetails(e,t){a($p(dn(t.params.id)),{replace:t.query.new===`1`})},saveLater(){a(`/today`,{replace:!0}),Q(L(`episode.savedLater`))},finishLater(){a(`/today`,{replace:!0})},cancelNew(e,t){let n=yn(t.params.id);a(`/today`,{replace:!0}),Q(L(`episode.cancelledToast`),{actionLabel:L(`common.undo`),onAction:()=>{bn(n),t.rerender()}})},end(e,t){let{id:n}=t.params;hn(n),t.rerender(),Q(L(`episode.endedToast`),{actionLabel:L(`common.undo`),onAction:()=>{vn(n),t.rerender()}})},async delete(e,t){if(!await Nf({title:L(`episode.deleteTitle`),text:L(`episode.deleteText`),confirmLabel:L(`episode.delete`)}))return;let n=yn(t.params.id);s(`/today`),Q(L(`episode.deletedToast`),{actionLabel:L(`common.undo`),onAction:()=>{bn(n),t.rerender()}})}}};function Om(e){return K`
    <li>
      <a class="entry" href="#/treatment/${e.id}/intake" data-replace>
        <span class="entry__main">
          <span class="entry__title">${[e.name,e.dose].filter(Boolean).join(` · `)}</span>
          ${e.frequency?K`<span class="entry__meta">${e.frequency}</span>`:``}
        </span>
        ${q(`chevronRight`,{size:20})}
      </a>
    </li>`}function km(e,t){let n=t.filter(t=>t.type===e);return n.length?K`
    <section class="section" aria-labelledby="pick-${e}">
      <h2 class="section-title" id="pick-${e}">${L(`treatment.${e}`)}</h2>
      <ul class="entries">${n.map(Om)}</ul>
    </section>`:``}var Am={render(){let e=Bt();return J({header:Y({back:`/today`}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`quickIntake.title`)}</h1>
        ${e.length?K`<p class="screen-lead">${L(`quickIntake.lead`)}</p>${km(`acute`,e)}${km(`preventive`,e)}`:K`<p class="screen-lead">${L(`quickIntake.empty`)}</p>`}`,footer:X({label:L(`quickIntake.add`),iconName:`plus`,variant:e.length?`secondary`:`primary`,action:`add`,block:!0})})},actions:{add(){a(`/treatment/new`)}}},jm=[0,1,5,15];async function Mm({title:e,text:t,confirmLabel:n}){let r=await Mf({title:e,text:[t,I()&&!F().plus.simulated?L(`privacy.plusNotCancelled`,{store:Xl()}):``],choices:[{value:`erase`,label:n},{value:`backup`,label:L(`privacy.backupFirst`),variant:`outline`}]});r===`backup`&&a(`/backup`),r===`erase`&&(af(),Qn(),qc(),a(`/start/language`,{replace:!0}))}function Nm(e){let t=tt();return K`
    <section class="profile-section" aria-labelledby="security-title">
      <h2 id="security-title">${L(`security.title`)}</h2>
      <div class="list">
        ${gd({name:`appLock`,label:L(`security.pin`),hint:L(t?`security.pinOnHint`:`security.pinOffHint`),checked:t,iconName:`lock`})}
        ${t?K`
              <a class="list__row" href="#/security/pin?mode=change">
                ${q(`keyRound`)}<span class="list__label">${L(`security.changePin`)}</span>${q(`chevronRight`,{size:20})}
              </a>
              <div class="list__field">
                <label class="field__label" for="f-autoLock">${L(`security.autoLock`)}</label>
                <select class="field__input" id="f-autoLock" name="autoLock">
                  ${jm.map(t=>K`<option value="${t}"${t===(e.autoLockMinutes??1)?K` selected`:``}>
                      ${L(`security.autoLockOptions.m${t}`)}
                    </option>`)}
                </select>
              </div>`:``}
        ${Ae()?``:K`<label class="list__row list__row--switch is-disabled" for="f-biometrics">
              ${q(`scanFace`)}
              <span class="list__text">
                <span class="list__label">${L(`security.biometrics`)}</span>
                <span class="list__hint" id="f-biometrics-hint">${L(`security.biometricsHint`)}</span>
              </span>
              <input class="switch" type="checkbox" role="switch" id="f-biometrics" disabled aria-describedby="f-biometrics-hint" />
            </label>`}
      </div>
    </section>`}function Pm(){return fl(()=>Ie(`${A()}.json`,JSON.stringify(zn(),null,2)))}var Fm={render(){let e=F();return ad(`profile`,K`
      <h1 class="screen-title" tabindex="-1">${L(`profile.title`)}</h1>

      ${K`<section class="profile-section" aria-labelledby="demo-title">
            <h2 id="demo-title">${L(`profile.demoSection`)}</h2>
            <div class="list">
              ${gd({name:`demoEnabled`,label:L(`profile.demoFill`),hint:L(`profile.demoFillHint`),checked:e.demoEnabled,iconName:`sparkles`})}
              ${gd({name:`demoPlus`,label:L(`profile.demoPlus`),hint:L(`profile.demoPlusHint`),checked:I(),iconName:`lock`})}
            </div>
          </section>`}

      <section class="profile-section" aria-labelledby="plus-title">
        <h2 id="plus-title">${L(`plus.name`)}</h2>
        <div class="list">
          <a class="list__row" href="#/plus">
            ${q(`sparkles`)}
            <span class="list__text">
              <span class="list__label">${L(I()?`profile.plusActive`:`profile.plusTry`)}</span>
              <span class="list__hint">${I()&&e.plus.trialEndsAt?L(`plus.manage.trialUntil`,{date:Vf(e.plus.trialEndsAt)}):L(`profile.plusHint`)}</span>
            </span>
            ${q(`chevronRight`,{size:20})}
          </a>
        </div>
      </section>

      <section class="profile-section" aria-labelledby="me-title">
        <h2 id="me-title">${L(`profile.me`)}</h2>
        ${Z({label:L(`profile.name`),name:`name`,value:e.name,placeholder:L(`profile.namePlaceholder`),hint:L(`profile.nameHint`),autocomplete:`given-name`,maxlength:40})}
      </section>

      <section class="profile-section" aria-labelledby="lang-title">
        <h2 id="lang-title">${L(`profile.language`)}</h2>
        <label class="visually-hidden" for="f-language">${L(`profile.language`)}</label>
        <select class="field__input" id="f-language" name="language">
          ${Fr.map(t=>K`<option value="${t}" lang="${t}"${t===e.language?K` selected`:``}>${Hr(t,`language.${t}`)}</option>`)}
        </select>
      </section>

      <section class="profile-section" aria-labelledby="tracking-title">
        <h2 id="tracking-title">${L(`profile.tracking`)}</h2>
        <div class="list">
          ${gd({name:`cycleTracking`,label:L(`profile.cycle`),checked:e.cycleTracking===!0,iconName:`calendar`})}
          ${gd({name:`reminderEnabled`,label:L(`profile.reminders`),checked:e.reminder.enabled,iconName:`bell`})}
          ${e.reminder.enabled?K`<div class="list__field">
                ${Z({label:L(`profile.reminderTime`),name:`reminderTime`,type:`time`,value:e.reminder.time})}
              </div>`:``}
        </div>
      </section>

      <section class="profile-section" aria-labelledby="display-title">
        <h2 id="display-title">${L(`profile.display`)}</h2>
        <div class="list">
          <div class="list__field list__field--first">
            <span class="field__label" aria-hidden="true">${L(`profile.appearance`)}</span>
            ${pd({name:`theme`,legend:L(`profile.appearance`),selected:e.theme??`system`,options:al.map(e=>({value:e,label:L(`profile.themes.${e}`)}))})}
          </div>
          ${gd({name:`reduceMotion`,label:L(`profile.reduceMotion`),hint:L(`profile.reduceMotionHint`),checked:e.reduceMotion,iconName:`sparkles`})}
        </div>
      </section>

      <section class="profile-section" aria-labelledby="integrations-title">
        <h2 id="integrations-title">${L(`profile.integrations`)}</h2>
        <div class="list">
          <a class="list__row" href="${I()?`#/plus/health`:`#/plus?from=health`}">
            ${q(`watch`)}
            <span class="list__text">
              <span class="list__label">${L(`profile.health`)}</span>
              <span class="list__hint">${L(`profile.healthHint`)}</span>
            </span>
            ${I()?``:q(`lock`,{size:18,label:L(`plus.lockedLabel`)})}
            ${q(`chevronRight`,{size:20})}
          </a>
          <a class="list__row" href="${I()?`#/plus/weather`:`#/plus?from=weather`}">
            ${q(`gauge`)}
            <span class="list__text">
              <span class="list__label">${L(`plus.features.weather.title`)}</span>
              <span class="list__hint">${L(`profile.weatherHint`)}</span>
            </span>
            ${I()?``:q(`lock`,{size:18,label:L(`plus.lockedLabel`)})}
            ${q(`chevronRight`,{size:20})}
          </a>
        </div>
      </section>

      ${Nm(e)}

      <section class="profile-section" aria-labelledby="privacy-title">
        <h2 id="privacy-title">${L(`profile.privacy`)}</h2>
        <div class="list">
          <div class="list__row">
            ${q(`smartphone`)}
            <span class="list__text">
              <span class="list__label">${L(`privacy.deviceOnly`)}</span>
              <span class="list__hint">${L(`privacy.deviceOnlyHint`)}</span>
            </span>
          </div>
          <a class="list__row" href="#/backup">
            ${q(`backup`)}
            <span class="list__text">
              <span class="list__label">${L(`backup.title`)}</span>
              <span class="list__hint">${e.backup.lastAt?L(`backup.lastAt`,{date:Vf(e.backup.lastAt)}):L(`backup.profileHint`)}</span>
            </span>
            ${q(`chevronRight`,{size:20})}
          </a>
          <button type="button" class="list__row" data-action="exportData">
            ${q(`download`)}
            <span class="list__text">
              <span class="list__label">${L(`privacy.export`)}</span>
              <span class="list__hint">${L(`privacy.exportHint`)}</span>
            </span>
          </button>
          <a class="list__row" href="#/privacy-policy">
            ${q(`fileText`)}
            <span class="list__label">${L(`privacyPolicy.title`)}</span>
            ${q(`chevronRight`,{size:20})}
          </a>
          <div class="list__row">
            ${q(`shield`)}
            <span class="list__text">
              <span class="list__label">${L(`privacy.consent`)}</span>
              <span class="list__hint">
                ${e.consent?.healthDataAt?L(`privacy.consentGiven`,{date:Vf(e.consent.healthDataAt)}):``}
              </span>
              <button type="button" class="link-btn list__chip" data-action="withdrawConsent">${L(`privacy.withdraw`)}</button>
            </span>
          </div>
          <button type="button" class="list__row list__row--danger" data-action="deleteAll">
            ${q(`trash`)}
            <span class="list__label">${L(`profile.deleteAll`)}</span>
          </button>
        </div>
      </section>

      ${K`<section class="profile-section" aria-labelledby="dev-title">
            <h2 id="dev-title">${L(`profile.dev`)}</h2>
            <div class="list">
              ${e.demoEnabled?K`<button type="button" class="list__row" data-action="demoReset">
                    ${q(`sparkles`)}<span class="list__label">${L(`profile.demoReset`)}</span>
                  </button>`:``}
              <button type="button" class="list__row" data-action="onboardingAgain">
                ${q(`arrowRight`)}<span class="list__label">${L(`profile.onboardingAgain`)}</span>
              </button>
              <a class="list__row" href="#/styleguide">
                ${q(`palette`)}
                <span class="list__label">${L(`profile.styleguide`)}</span>
                ${q(`chevronRight`,{size:20})}
              </a>
            </div>
          </section>`}

      <div class="section">
        ${X({label:L(`profile.logout`),variant:`outline`,iconName:`logOut`,action:`logout`,block:!0})}
      </div>

      <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`profile.disclaimer`)}</span></p>`,{header:Y({back:`/today`})})},async onChange(e,t){let{reminder:n}=F();switch(e.name){case`name`:Lt({name:e.value.trim(),nameSetAt:e.value.trim()?new Date().toISOString():null}),Q(L(`profile.saved`));break;case`language`:Rr(e.value),Lt({language:e.value}),at({language:e.value}),rf(),t.rerender();break;case`theme`:Lt({theme:e.value}),at({theme:e.value}),cl(e.value);break;case`demoEnabled`:e.checked?Gn(Nr()):Kn(),t.rerender(),Q(L(e.checked?`profile.demoFillOn`:`profile.demoFillOff`));break;case`demoPlus`:e.checked?tu(`yearly`):su(),t.rerender();break;case`appLock`:a(`/security/pin?mode=${e.checked?`set`:`disable`}`);break;case`autoLock`:Lt({autoLockMinutes:Number(e.value)}),Q(L(`profile.saved`));break;case`cycleTracking`:Lt({cycleTracking:e.checked});break;case`reminderEnabled`:{let r=e.checked&&await Zd();e.checked&&!r&&Q(L(`notifications.denied`)),Lt({reminder:{...n,enabled:r}}),ef(),t.rerender(),r&&el(document.querySelector(`.list__field`));break}case`reduceMotion`:Lt({reduceMotion:e.checked}),qc();break;case`reminderTime`:e.value&&(Lt({reminder:{...n,time:e.value}}),ef())}},actions:{async demoReset(e,t){await Nf({title:L(`profile.demoResetTitle`),text:L(`profile.demoResetText`),confirmLabel:L(`profile.demoResetConfirm`)})&&(Gn(Nr()),t.rerender(),Q(L(`profile.demoResetDone`)))},onboardingAgain(){Lt({onboardingCompletedAt:null}),a(`/start/welcome`,{replace:!0})},async exportData(e,t){try{if(!await Pm())return;Yn(),t.rerender(),Q(L(`privacy.exportDone`))}catch(e){console.error(`[profile] Export sa nepodaril`,e),Q(L(`privacy.exportFailed`))}},async logout(){tt()?_l():await Nf({title:L(`profile.logoutNoPinTitle`),text:L(`profile.logoutNoPinText`),confirmLabel:L(`profile.logoutNoPinConfirm`)})&&a(`/security/pin?mode=set&logout=1`)},withdrawConsent(){return Mm({title:L(`privacy.withdrawTitle`),text:L(`privacy.withdrawText`),confirmLabel:L(`privacy.withdrawConfirm`)})},deleteAll(){return Mm({title:L(`profile.deleteAllTitle`),text:L(`profile.deleteAllText`),confirmLabel:L(`profile.deleteAllConfirm`)})}}},Im=null;function Lm(){let{lastAt:e,remind:t}=F().backup;return J({header:Y({back:`/profile`}),form:!0,body:K`
      <h1 class="screen-title" tabindex="-1">${L(`backup.title`)}</h1>
      <p class="screen-lead">${L(`backup.lead`)}</p>
      <p class="backup-status">
        ${q(e?`check`:`info`,{size:20})}
        <span>${e?L(`backup.lastAt`,{date:Vf(e)}):L(`backup.never`)}</span>
      </p>

      <section class="section" aria-labelledby="create-title">
        <h2 class="section-title" id="create-title">${L(`backup.createTitle`)}</h2>
        ${Z({label:L(`backup.password`),name:`password`,type:`password`,autocomplete:`new-password`,hint:L(`backup.passwordHint`,{n:8})})}
        ${Z({label:L(`backup.passwordRepeat`),name:`passwordRepeat`,type:`password`,autocomplete:`new-password`})}
        <p class="info-note">${q(`info`,{size:20})}<span>${L(`backup.passwordWarning`)}</span></p>
        <div class="section-sm">${X({label:L(`backup.create`),iconName:`fileLock`,type:`submit`,block:!0,id:`backup-create`})}</div>
      </section>

      <section class="section" aria-labelledby="restore-title">
        <h2 class="section-title" id="restore-title">${L(`backup.restoreTitle`)}</h2>
        <div class="list">
          <button type="button" class="list__row" data-action="pickBackup">
            ${q(`upload`)}
            <span class="list__text">
              <span class="list__label">${L(`backup.restore`)}</span>
              <span class="list__hint">${L(`backup.restoreHint`)}</span>
            </span>
          </button>
        </div>
      </section>

      <section class="section" aria-labelledby="remind-title">
        <h2 class="section-title" id="remind-title">${L(`backup.reminderTitle`)}</h2>
        <div class="list">${gd({name:`remind`,label:L(`backup.reminder`),hint:L(`backup.reminderHint`),checked:t,iconName:`bell`})}</div>
      </section>

      <p class="disclaimer">${q(`shield`,{size:20})}<span>${L(`backup.privacy`)}</span></p>`})}function Rm(){return J({header:Y({backAction:`cancelRestore`}),form:!0,body:K`
      <h1 class="screen-title" tabindex="-1">${L(`backup.restoreTitle`)}</h1>
      <p class="screen-lead">${Im.createdAt?L(`backup.restoreLeadDate`,{date:Vf(Im.createdAt)}):L(`backup.restoreLead`)}</p>
      ${Z({label:L(`backup.password`),name:`restorePassword`,type:`password`,autocomplete:`current-password`})}
      <p class="info-note">${q(`info`,{size:20})}<span>${L(`privacy.importText`)}</span></p>`,footer:K`
      ${X({label:L(`backup.restoreSubmit`),iconName:`upload`,type:`submit`,block:!0,id:`backup-restore`})}
      ${X({label:L(`common.cancel`),variant:`ghost`,action:`cancelRestore`,block:!0})}`})}function zm(e){Jn(e),Im=null,rf(),Q(L(`privacy.importDone`)),a(`/today`,{replace:!0})}async function Bm(e,t){let n=new FormData(e),r=String(n.get(`password`)??``);if(r.length<8){md(e,`password`,L(`backup.errors.tooShort`,{n:8}));return}if(r!==String(n.get(`passwordRepeat`)??``)){md(e,`passwordRepeat`,L(`backup.errors.mismatch`));return}let i=e.querySelector(`#backup-create`);i.disabled=!0,Q(L(`backup.creating`));try{let e=await Tp(r);if(!await fl(()=>Ie(`${L(`backup.fileName`)}-${A()}.json`,e))){i.disabled=!1;return}Yn(),t.rerender(),Q(L(`backup.created`))}catch(e){console.error(`[backup] Zálohu sa nepodarilo vytvoriť`,e),i.disabled=!1,Q(L(`backup.failed`))}}async function Vm(e){let t=String(new FormData(e).get(`restorePassword`)??``);if(!t){md(e,`restorePassword`,L(`backup.errors.passwordRequired`));return}let n=e.querySelector(`#backup-restore`);n.disabled=!0;let r=await Op(Im.backup,t);n.disabled=!1,r?await Nf({title:L(`privacy.importTitle`),text:L(`privacy.importText`),confirmLabel:L(`privacy.importConfirm`)})&&zm(r):md(e,`restorePassword`,L(`backup.errors.wrongPassword`))}var Hm={render(e){return e.query.restore||(Im=null),Im?Rm():Lm()},onSubmit(e,t){return Im?Vm(e):Bm(e,t)},onChange(e){e.name===`remind`&&Xn(e.checked)},actions:{async pickBackup(e,t){let n=await fl(()=>Re(`application/json,.json`));if(!n)return;let r=Dp(await n.text());r?r.kind===`plain`?await Nf({title:L(`privacy.importTitle`),text:L(`privacy.importText`),confirmLabel:L(`privacy.importConfirm`)})&&zm(r.records):(Im=r,o(`/backup?restore=1`),t.rerender(),document.getElementById(`f-restorePassword`)?.focus()):Q(L(`backup.errors.invalidFile`))},cancelRestore(e,t){Im=null,o(`/backup`),t.rerender()}}},Um=[[`--color-bg`,`Pozadie`],[`--color-blob`,`Organické tvary`],[`--color-surface`,`Karty`],[`--color-surface-tint`,`Zvolené / sekundárne`],[`--color-border`,`Okraje`],[`--color-border-strong`,`Výrazné okraje`],[`--color-coral`,`Korálová – akcent`],[`--color-coral-soft`,`Korálová jemná`],[`--color-cta`,`Tlačidlá`],[`--color-cta-pressed`,`Tlačidlá – stlačené`],[`--color-text`,`Text`],[`--color-text-muted`,`Text tlmený`]],Wm=(e,t)=>K`
  <section class="sg-section">
    <h2 class="section-title">${e}</h2>
    ${t}
  </section>`,Gm={render(){return J({header:Y({back:`/profile`}),body:K`
        <h1 class="screen-title" tabindex="-1">Dizajn systém</h1>
        <p class="screen-lead">Farby a písma sú v <code>src/styles/tokens.css</code>, logo v
          <code>src/assets/brand/vm-logo.svg</code>. Ilustrácie sú zatiaľ zástupné v <code>src/ui/placeholders.js</code>.</p>

        ${Wm(`Farby`,K`<div class="sg-swatches">
            ${Um.map(([e,t])=>K`
                <div class="sg-swatch">
                  <span class="sg-swatch__color" style="background:var(${e})"></span>
                  <span class="sg-swatch__label">${t}</span>
                  <code class="sg-swatch__token">${e}</code>
                </div>`)}
          </div>`)}

        ${Wm(`Typografia`,K`<div class="stack">
            <p class="sg-type sg-type--3xl">Nadpis úvodu 38</p>
            <p class="sg-type sg-type--2xl">Nadpis obrazovky 32</p>
            <p class="sg-type sg-type--xl">Nadpis dialógu 26</p>
            <p class="sg-type sg-type--lg">Nadpis sekcie a karty 20</p>
            <p>Bežný text 17 – Zaznamenávajte svoje symptómy, hľadajte možné súvislosti.</p>
            <p class="muted small">Doplnkový text 15 – tlmená farba pre vysvetlivky.</p>
          </div>`)}

        ${Wm(`Tlačidlá`,K`<div class="stack">
            ${X({label:`Primárne`,block:!0,action:`demo`})}
            ${X({label:`Sekundárne`,variant:`secondary`,block:!0,action:`demo`})}
            ${X({label:`Obrysové`,variant:`outline`,block:!0,action:`demo`})}
            ${X({label:`Textové (Preskočiť)`,variant:`ghost`,block:!0,action:`demo`})}
            ${X({label:`Nebezpečná akcia`,variant:`danger`,block:!0,action:`demo`})}
            ${X({label:`Neaktívne`,block:!0,disabled:!0})}
            <div class="btn-row">
              ${X({label:`S ikonou`,iconName:`plus`,compact:!0,action:`demo`})}
              ${X({label:`Kompaktné`,variant:`secondary`,iconName:`timer`,compact:!0,action:`demo`})}
            </div>
          </div>`)}

        ${Wm(`Výber možností`,K`<div class="stack">
            ${fd({name:`sg-radio`,legend:`Jedna možnosť`,options:[{value:`a`,label:`Vestibulárna migréna`},{value:`b`,label:`Migréna`}],selected:`a`})}
            ${fd({name:`sg-check`,type:`checkbox`,legend:`Viac možností`,options:[{value:`a`,label:`Sledovať moje symptómy`},{value:`b`,label:`Zaznamenávať možné spúšťače`}],selected:[`a`]})}
            ${pd({name:`sg-seg`,legend:`Segment`,selected:`a`,options:[{value:`a`,label:`Preventívny`},{value:`b`,label:`Akútny`}]})}
          </div>`)}

        ${Wm(`Polia a prepínače`,K`<div class="stack">
            ${Z({label:`Názov lieku`,name:`sg-name`,placeholder:`napr. Betahistín`})}
            ${Z({label:`Poznámka`,name:`sg-note`,multiline:!0,optional:!0})}
            <div class="list">${gd({name:`sg-switch`,label:`Denná pripomienka`,checked:!0,iconName:`bell`})}</div>
          </div>`)}

        ${Wm(`Karty a štítky`,K`<div class="stack">
            <div class="card">
              <h3 class="card__title">Karta</h3>
              <p class="muted">Zaoblená plocha s jemným tieňom.</p>
            </div>
            <div class="card card--accent">
              <h3 class="card__title">Zvýraznená karta</h3>
              <p class="muted">Napríklad prebiehajúca epizóda.</p>
            </div>
            <div class="btn-row">${_d(`Prebieha`,{live:!0})} ${_d(`Ukončená`,{neutral:!0})}</div>
          </div>`)}

        ${Wm(`Ikony (Lucide)`,K`<div class="sg-icons">
            ${td.map(e=>K`<span class="sg-icon" title="${e}">${q(e)}</span>`)}
          </div>
          <div class="btn-row" style="margin-top:16px">${vd(`timer`)} ${vd(`pill`,{large:!0})}</div>`)}

        ${Wm(`Logo a ilustrácie (ilustrácie sú zástupné)`,K`<div class="stack">
            ${df()}
            ${df({large:!0})}
            ${ff({size:220})}
            ${ff({symbol:`bell`,size:160})}
          </div>`)}`})},actions:{demo(){Q(`Toto je upozornenie (toast)`,{actionLabel:`Vrátiť`,onAction:()=>{}})}}},Km=`/log/symptoms`;function qm(){let e=Np().symptoms.length,t=document.getElementById(`log-continue`);t.disabled=e===0,t.querySelector(`span`).textContent=e?L(`log.continueCount`,{n:e}):L(`common.continue`)}var Jm={render(){let e=Np(),{step:t,total:n}=Ip(Km),r=e.symptoms.map(e=>e.key),i=r.length;return J({header:Y({back:`/today`,step:t,total:n}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`log.symptomsTitle`)}</h1>
        <p class="screen-lead">${L(`log.symptomsLead`)}</p>

        <div class="search">
          ${q(`search`,{size:20})}
          <input class="field__input search__input" type="search" id="symptom-search" autocomplete="off"
            placeholder="${L(`log.search`)}" aria-label="${L(`log.search`)}" />
        </div>

        ${Wp({name:`symptom`,legend:L(`log.symptomsTitle`),items:Up(),selected:r,search:!0})}
        <p class="empty" id="sym-empty" hidden>${L(`log.noMatch`)}</p>

        <form class="custom-add" data-form="custom">
          <label class="field__label" for="custom-symptom">${L(`log.custom`)}</label>
          <div class="custom-add__row">
            <input class="field__input" id="custom-symptom" name="custom" maxlength="40" autocomplete="off"
              placeholder="${L(`log.customPlaceholder`)}" />
            <button type="submit" class="btn btn--secondary btn--compact">${q(`plus`,{size:20})}<span>${L(`log.customAdd`)}</span></button>
          </div>
        </form>`,footer:X({label:i?L(`log.continueCount`,{n:i}):L(`common.continue`),action:`next`,id:`log-continue`,disabled:i===0,block:!0})})},onInput(e){if(e.id!==`symptom-search`)return;let t=Hp(e.value.trim()),n=0;for(let e of document.querySelectorAll(`.sym-cell`)){let r=!t||e.dataset.search.includes(t);e.hidden=!r,r&&(n+=1)}document.getElementById(`sym-empty`).hidden=n>0},onChange(e){if(e.name!==`symptom`)return;let t=Np();e.checked?t.symptoms.push({key:e.value,intensity:null,pending:!0}):t.symptoms=t.symptoms.filter(t=>t.key!==e.value),qm()},onSubmit(e,t){if(e.dataset.form!==`custom`)return;let n=un(e.elements.custom.value);if(!n)return;let r=Np();r.symptoms.some(e=>e.key===n.key)||r.symptoms.push({key:n.key,intensity:null,pending:!0}),t.rerender(),document.getElementById(`custom-symptom`).value=``},actions:{...Gp,next(){Np().symptoms.length&&a(Ip(Km).next,{replace:!0})}}},Ym=`/log/intensity`,Xm={render(){let{symptoms:e}=Np(),{step:t,total:n}=Ip(Ym);return J({header:Y({backAction:`prevStep`,step:t,total:n}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`log.intensityTitle`)}</h1>
        <p class="screen-lead">${L(`log.intensityLead`)}</p>
        <div class="intensity-list">
          ${e.map((e,t)=>Bp({index:t,label:ip(e.key),value:Lp(e),iconName:ap(e.key)}))}
        </div>`,footer:K`
        ${X({label:L(`common.continue`),action:`next`,block:!0})}
        ${X({label:L(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onInput(e){if(e.type!==`range`)return;let t=Number(e.dataset.index);Rp(Np().symptoms[t],Number(e.value)),Vp(t,Number(e.value))},onChange(e){this.onInput(e)},actions:{clear(e){let t=Number(e.dataset.index);Rp(Np().symptoms[t],null),Vp(t,null),document.querySelector(`[data-action="restore"][data-index="${t}"]`).focus()},restore(e){let t=Number(e.dataset.index);Rp(Np().symptoms[t],5),Vp(t,5),document.getElementById(`int-${t}`).focus()},next(){Np().symptoms.forEach(zp),a(Ip(Ym).next,{replace:!0})},skip(){for(let e of Np().symptoms)Rp(e,null);a(Ip(Ym).next,{replace:!0})},prevStep(){a(Ip(Ym).prev,{replace:!0})}}},Zm=`/log/details`;function Qm(e){return e.episodeId?dn(e.episodeId):Ct(e.date)?fn():null}function $m(e){return Ct(j(e.date))?L(`log.whenToday`,{time:e.time}):L(`log.whenOn`,{date:Lf(j(e.date)),time:e.time})}var eh={render(){let e=Np(),{step:t,total:n}=Ip(Zm),r=Qm(e);return J({header:Y({backAction:`prevStep`,step:t,total:n}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`log.detailsTitle`)}</h1>
        <p class="screen-lead">${L(`log.detailsLead`)}</p>
        <div class="step-options">
          ${fd({name:`duration`,legend:L(`log.detailsTitle`),options:Jf.map(e=>({value:e,label:cp(e)})),selected:e.duration})}
        </div>

        <fieldset class="form-section">
          <legend class="section-title">${L(`log.when`)}</legend>
          <!-- Čas je predvyplnený (teraz alebo deň z kalendára); polia sa ukážu až na požiadanie -->
          <div class="when-summary"${e.editTime?K` hidden`:``}>
            <span>${$m(e)}</span>
            <button type="button" class="link-btn" data-action="changeTime" aria-controls="when-fields">${L(`log.changeTime`)}</button>
          </div>
          <div class="field-row" id="when-fields"${e.editTime?``:K` hidden`}>
            <div class="field">
              <label class="field__label" for="f-date">${L(`log.date`)}</label>
              <input class="field__input" type="date" id="f-date" name="date" value="${e.date}" max="${A()}" required />
            </div>
            <div class="field">
              <label class="field__label" for="f-time">${L(`log.time`)}</label>
              <input class="field__input" type="time" id="f-time" name="time" value="${e.time}" required />
            </div>
          </div>
          ${r?fd({name:`linkEpisode`,type:`checkbox`,legend:L(`log.linkEpisode`),options:[{value:`yes`,label:`${L(`log.linkEpisode`)} (${L(`episode.since`,{time:Rf(r.startedAt)})})`}],selected:e.linkEpisode?`yes`:null}):``}
        </fieldset>

        <div class="form-section">
          ${Z({label:L(`log.note`),name:`note`,value:e.note,multiline:!0,optional:!0})}
        </div>`,footer:X({label:L(`log.save`),action:`save`,iconName:`check`,block:!0})})},onChange(e){let t=Np();e.name===`duration`&&(t.duration=e.value),e.name===`date`&&e.value&&(t.date=e.value),e.name===`time`&&e.value&&(t.time=e.value),e.name===`linkEpisode`&&(t.linkEpisode=e.checked)},onInput(e){e.name===`note`&&(Np().note=e.value)},actions:{changeTime(){Np().editTime=!0,document.querySelector(`.when-summary`).hidden=!0,document.getElementById(`when-fields`).hidden=!1,document.getElementById(`f-date`).focus()},save(){let e=Np(),t=Qm(e);rn({id:e.id,occurredAt:xt(e.date,e.time),symptoms:e.symptoms,vertigoType:e.vertigoType,duration:e.duration,note:e.note,episodeId:t&&e.linkEpisode?t.id:null}),Pp(),s(`/today`),Q(L(`log.saved`))},prevStep(){a(Ip(Zm).prev,{replace:!0})}}};function th(e){return K`
    <ul class="sym-rows">
      ${e.symptoms.map(e=>K`
          <li class="sym-row">
            <span class="icon-badge">${q(ap(e.key),{size:22})}</span>
            <span class="sym-row__label">${ip(e.key)}</span>
            <span class="sym-row__value ${e.intensity==null?`muted`:``}">${op(e.intensity)}</span>
          </li>`)}
    </ul>`}var nh={render(e){let t=tn(e.params.id);if(!t)return J({header:Y({back:`/today`}),body:K`<h1 class="screen-title" tabindex="-1">${L(`symptomLog.title`)}</h1>
          <p class="screen-lead">${L(`symptomLog.notFound`)}</p>`});let n=t.episodeId?dn(t.episodeId):null;return J({header:Y({back:`/today`}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`symptomLog.title`)}</h1>
        <p class="screen-lead">${Lf(new Date(t.occurredAt))} · ${Rf(t.occurredAt)}</p>
        ${th(t)}
        <dl class="facts">
          ${t.duration?K`<div class="fact"><dt>${L(`symptomLog.duration`)}</dt><dd>${cp(t.duration)}</dd></div>`:``}
          ${n?K`<div class="fact"><dt>${L(`symptomLog.episode`)}</dt>
                <dd><a href="#/episode/${n.id}">${L(`episode.since`,{time:Rf(n.startedAt)})}</a></dd></div>`:``}
        </dl>
        ${t.note?K`<h2 class="section-title section">${L(`symptomLog.note`)}</h2><p class="note-text">${t.note}</p>`:``}`,footer:K`
        ${X({label:L(`symptomLog.edit`),variant:`secondary`,iconName:`pencil`,action:`edit`,block:!0})}
        ${X({label:L(`symptomLog.delete`),variant:`danger`,action:`delete`,block:!0})}`})},actions:{edit(e,t){Mp({logId:t.params.id}),a(`/log/symptoms`)},async delete(e,t){if(!await Nf({title:L(`symptomLog.deleteTitle`),text:L(`symptomLog.deleteText`),confirmLabel:L(`symptomLog.delete`)}))return;let n=an(t.params.id);s(`/today`),Q(L(`symptomLog.deletedToast`),{actionLabel:L(`common.undo`),onAction:()=>{on(n),t.rerender()}})}}};function rh(e){let t=qt(e.id)[0];return K`
    <li>
      <a class="entry" href="#/treatment/${e.id}">
        <span class="entry__main">
          <span class="entry__title">${[e.name,e.dose].filter(Boolean).join(` · `)}</span>
          <span class="entry__meta">
            ${[e.frequency,t?L(`treatment.lastTaken`,{when:zf(t.takenAt)}):L(`treatment.neverTaken`)].filter(Boolean).join(` · `)}
          </span>
        </span>
        ${q(`chevronRight`,{size:20})}
      </a>
    </li>`}function ih(e,t){let n=t.filter(t=>t.type===e);return K`
    <section class="section" aria-labelledby="group-${e}">
      <h2 class="section-title" id="group-${e}">${L(`treatment.${e}`)}</h2>
      ${n.length?K`<ul class="entries">${n.map(rh)}</ul>`:K`<p class="empty">${L(`treatment.noneOfType`)}</p>`}
    </section>`}var ah={render(){let e=Bt();return ad(`treatment`,K`
        ${dd(L(`treatment.title`))}
        <p class="screen-lead">${L(`treatment.lead`)}</p>
        ${e.length?K`<p class="treatment-hint">${L(`treatment.hint`)}</p>`:``}
        ${e.length?K`${ih(`preventive`,e)}${ih(`acute`,e)}`:K`<p class="empty section">${L(`treatment.empty`)}</p>`}
        <div class="section">
          ${X({label:L(`treatment.add`),iconName:`plus`,variant:e.length?`secondary`:`primary`,action:`add`,block:!0})}
        </div>
        <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`treatment.disclaimer`)}</span></p>`)},actions:{add(){a(`/treatment/new`)}}},oh=20,sh=(e,t)=>t?K`<div class="fact"><dt>${e}</dt><dd>${t}</dd></div>`:``;function ch(e){let t=[e.dose,e.effect?lp(e.effect):L(`treatment.effectMissing`),e.episodeId?L(`treatment.inEpisode`):``].filter(Boolean);return K`
    <li>
      <a class="entry" href="#/intake/${e.id}">
        <span class="entry__main">
          <span class="entry__title">${Bf(e.takenAt)}</span>
          <span class="entry__meta">${t.join(` · `)}</span>
        </span>
        ${q(`chevronRight`,{size:20})}
      </a>
    </li>`}var lh={render(e){let t=Vt(e.params.id);if(!t)return J({header:Y({back:`/treatment`}),body:K`<h1 class="screen-title" tabindex="-1">${L(`treatment.title`)}</h1>
          <p class="screen-lead">${L(`treatment.notFound`)}</p>`});let n=qt(t.id),r=e.query.all===`1`,i=ep.map(e=>({key:e,count:n.filter(t=>t.effect===e).length})).filter(e=>e.count);return J({header:Y({back:`/treatment`}),body:K`
        <div class="episode-head">
          <h1 class="screen-title" tabindex="-1">${t.name}</h1>
          ${_d(L(`medications.types.${t.type}`),{neutral:!0})}
        </div>
        <dl class="facts">
          ${sh(L(`treatment.dose`),t.dose)}
          ${sh(L(`treatment.frequency`),t.frequency)}
          ${sh(L(`treatment.taken`),Ur(`plural.times`,n.length))}
        </dl>
        ${t.note?K`<p class="note-text section-sm">${t.note}</p>`:``}

        ${i.length?K`<section class="section" aria-labelledby="effect-title">
              <h2 class="section-title" id="effect-title">${L(`treatment.effectSummary`)}</h2>
              <ul class="sym-chips sym-chips--start">
                ${i.map(e=>K`<li class="sym-chip">${lp(e.key)} <strong>${Ur(`plural.times`,e.count)}</strong></li>`)}
              </ul>
            </section>`:``}

        <section class="section" aria-labelledby="history-title">
          <h2 class="section-title" id="history-title">${L(`treatment.history`)}</h2>
          ${n.length?K`<ul class="entries">${(r?n:n.slice(0,oh)).map(ch)}</ul>
                ${!r&&n.length>oh?K`<button type="button" class="link-btn section-sm" id="show-all" data-action="showAll">
                      ${L(`treatment.showAll`,{n:n.length})}
                    </button>`:``}`:K`<p class="empty">${L(`treatment.historyEmpty`)}</p>`}
        </section>

        <div class="list section">
          <a class="list__row" href="#/treatment/${t.id}/edit">
            ${q(`pencil`)}<span class="list__label">${L(`treatment.edit`)}</span>${q(`chevronRight`,{size:20})}
          </a>
          <button type="button" class="list__row list__row--danger" data-action="delete">
            ${q(`trash`)}<span class="list__label">${L(`treatment.delete`)}</span>
          </button>
        </div>
        <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`treatment.disclaimer`)}</span></p>`,footer:X({label:L(`treatment.logIntake`),iconName:`plus`,action:`logIntake`,block:!0})})},actions:{showAll(e,t){o(`/treatment/${t.params.id}?all=1`),t.rerender()},logIntake(e,t){a(`/treatment/${t.params.id}/intake`)},async delete(e,t){if(!await Nf({title:L(`treatment.deleteTitle`),text:L(`treatment.deleteText`),confirmLabel:L(`treatment.delete`)}))return;let n=Gt(t.params.id);s(`/treatment`),Q(L(`treatment.deletedToast`),{actionLabel:L(`common.undo`),onAction:()=>{Kt(n),t.rerender()}})}}};function uh(e,t){if(t===`edit`){let t=Jt(e.params.id);return{intake:t,medication:t?Vt(t.medicationId):null}}return{intake:null,medication:Vt(e.params.id)}}function dh({mode:e}){return{render(t){let{intake:n,medication:r}=uh(t,e),i=r?`/treatment/${r.id}`:`/treatment`;if(!r||e===`edit`&&!n)return J({header:Y({back:i}),body:K`<h1 class="screen-title" tabindex="-1">${L(`intake.title`)}</h1>
            <p class="screen-lead">${L(`intake.notFound`)}</p>`});let a=n?new Date(n.takenAt):new Date,o=n?A(a):t.query.date??A(a);return J({form:!0,header:Y({back:i}),body:K`
          <h1 class="screen-title" tabindex="-1">${L(n?`intake.editTitle`:`intake.title`)}</h1>
          <p class="screen-lead">${[r.name,r.dose].filter(Boolean).join(` · `)}</p>
          <div class="form-stack">
            <div class="field-row">
              ${Z({label:L(`intake.date`),name:`date`,type:`date`,value:o})}
              ${Z({label:L(`intake.time`),name:`time`,type:`time`,value:bt(a)})}
            </div>
            ${Z({label:L(`intake.dose`),name:`dose`,value:n?.dose??r.dose,optional:!0})}
            <fieldset class="form-section form-section--tight">
              <legend class="field__label">${L(`intake.effect`)}</legend>
              <p class="field__hint">${L(`intake.effectHint`)}</p>
              ${fd({name:`effect`,legend:L(`intake.effect`),options:ep.map(e=>({value:e,label:lp(e)})),selected:n?.effect})}
            </fieldset>
            ${Z({label:L(`intake.note`),name:`note`,value:n?.note??``,multiline:!0,optional:!0})}
          </div>`,footer:K`
          ${X({label:L(`intake.save`),type:`submit`,iconName:`check`,block:!0})}
          ${n?X({label:L(`intake.delete`),variant:`danger`,action:`delete`,block:!0}):``}`})},onSubmit(t,n){let{intake:r,medication:i}=uh(n,e);if(!i)return;let a=new FormData(t),o=String(a.get(`date`)||A()),c={medicationId:i.id,takenAt:xt(o,String(a.get(`time`)||bt())),dose:String(a.get(`dose`)??``),effect:a.get(`effect`),note:String(a.get(`note`)??``)};r?Qt(r.id,c):Zt(c),Q(L(`intake.saved`)),s(`/treatment/${i.id}`)},actions:{async delete(t,n){let{intake:r,medication:i}=uh(n,e);if(!await Nf({title:L(`intake.deleteTitle`),text:L(`intake.deleteText`),confirmLabel:L(`intake.delete`)}))return;let a=$t(r.id);s(`/treatment/${i.id}`),Q(L(`intake.deletedToast`),{actionLabel:L(`common.undo`),onAction:()=>{en(a),n.rerender()}})}}}}function fh(e){let t=Bn(e);return{entries:t,count:t.symptomLogs.length+t.episodes.length,episode:t.episodes.length>0,symptoms:t.symptomLogs.length>0,period:t.period}}function ph(){let e=new Date(2024,0,1),t=new Intl.DateTimeFormat(zr(),{weekday:`short`});return Array.from({length:7},(n,r)=>{let i=t.format(M(e,r)).replace(`.`,``);return i.charAt(0).toLocaleUpperCase(zr())+i.slice(1)})}function mh(e,t,{isToday:n,isSelected:r}){let i=[Lf(j(e))];return n&&i.push(L(`calendar.today`)),t.episode&&i.push(L(`calendar.summaryEpisode`)),t.count&&i.push(L(`calendar.summaryEntries`,{n:t.count})),t.period&&i.push(L(`calendar.summaryPeriod`)),!t.count&&!t.period&&i.push(L(`calendar.summaryNone`)),r&&i.push(L(`calendar.selected`)),i.join(`, `)}function hh(e,{inMonth:t,selectedKey:n,todayKey:r,cycleOn:i}){let a=fh(e),o=e===r,s=e===n;return K`
    <button type="button" class="${[`cal-day`,t?``:`cal-day--outside`,a.episode?`cal-day--episode`:``,o?`cal-day--today`:``,s?`cal-day--selected`:``].filter(Boolean).join(` `)}" id="day-${e}" data-action="selectDay" data-day="${e}"
      aria-label="${mh(e,a,{isToday:o,isSelected:s})}"${s?K` aria-pressed="true"`:K` aria-pressed="false"`}>
      <span class="cal-day__num" aria-hidden="true">${Number(e.slice(8))}</span>
      <span class="cal-day__marks" aria-hidden="true">${a.symptoms?K`<span class="cal-dot"></span>`:``}</span>
      ${i&&a.period?K`<span class="cal-period" aria-hidden="true"></span>`:``}
    </button>`}function gh(e,t,n){let r=Tt(e),i=(r.getDay()+6)%7,a=M(r,-i),o=A(),s=Math.ceil((i+new Date(r.getFullYear(),r.getMonth()+1,0).getDate())/7),c=Array.from({length:s*7},(e,t)=>A(M(a,t)));return K`
    <div class="cal">
      <div class="cal-weekdays" aria-hidden="true">${ph().map(e=>K`<span>${e}</span>`)}</div>
      <div class="cal-grid">
        ${c.map(r=>hh(r,{inMonth:r.startsWith(e),selectedKey:t,todayKey:o,cycleOn:n}))}
      </div>
    </div>`}function _h(e,t){let{entries:n,count:r}=fh(e),i=r+n.intakes.length>0||!!n.sleep,a=e>A();return K`
    <section class="section cal-detail" aria-labelledby="day-title">
      <h2 class="section-title" id="day-title">${Lf(j(e))}</h2>
      ${Ld(e)}
      ${i?bp(n):K`<p class="empty">${L(`calendar.dayEmpty`)}</p>`}
      ${t?K`<div class="list cal-period-toggle">
            <label class="list__row list__row--switch" for="f-period">
              ${q(`droplet`)}
              <span class="list__label">${L(`calendar.periodMark`)}</span>
              <input class="switch" type="checkbox" role="switch" id="f-period" name="period" data-day="${e}"${n.period?K` checked`:``} />
            </label>
          </div>`:``}
      ${a?``:K`<div class="cal-detail__actions">
            ${X({label:L(`calendar.addSymptom`),iconName:`plus`,variant:`secondary`,action:`addSymptom`,data:{day:e},block:!0})}
            ${n.sleep?``:X({label:L(`sleep.add`),iconName:`bed`,variant:`secondary`,action:`addSleep`,data:{day:e},block:!0})}
          </div>`}
    </section>`}var vh={render(e){let t=A(),n=e.query.day??t,r=e.query.month??n.slice(0,7),i=F().cycleTracking===!0,a=r===wt();return ad(`calendar`,K`
        ${dd(L(`calendar.title`))}
        <div class="cal-head">
          <button type="button" class="icon-btn" id="cal-prev" data-action="month" data-month="${Et(r,-1)}" aria-label="${L(`calendar.prev`)}">
            ${q(`chevronLeft`)}
          </button>
          <h2 class="cal-head__title" aria-live="polite">${Hf(Tt(r))}</h2>
          <button type="button" class="icon-btn" id="cal-next" data-action="month" data-month="${Et(r,1)}" aria-label="${L(`calendar.next`)}">
            ${q(`chevronRight`)}
          </button>
        </div>
        ${a?``:K`<button type="button" class="link-btn cal-today-link" data-action="goToday">${L(`calendar.backToday`)}</button>`}
        ${gh(r,n,i)}
        <ul class="cal-legend" aria-label="${L(`calendar.legend`)}">
          <li><span class="cal-legend__mark cal-legend__mark--episode" aria-hidden="true"></span>${L(`calendar.legendEpisode`)}</li>
          <li><span class="cal-legend__mark" aria-hidden="true"><span class="cal-dot"></span></span>${L(`calendar.legendSymptoms`)}</li>
          ${i?K`<li><span class="cal-legend__mark" aria-hidden="true"><span class="cal-period cal-period--legend"></span></span>${L(`calendar.legendPeriod`)}</li>`:``}
        </ul>
        ${_h(n,i)}`)},onChange(e,t){e.name===`period`&&(Sn(e.dataset.day),t.rerender())},actions:{month(e,t){let n=t.query.day;o(`/calendar?month=${e.dataset.month}${n?`&day=${n}`:``}`),t.rerender()},goToday(e,t){o(`/calendar`),t.rerender(),document.getElementById(`day-${A()}`)?.focus()},selectDay(e,t){let n=e.dataset.day;o(`/calendar?month=${n.slice(0,7)}&day=${n}`),t.rerender(),document.getElementById(`day-title`)?.scrollIntoView({block:`nearest`})},addSymptom(e){Mp({date:e.dataset.day}),a(`/log/symptoms`)},addSleep(e){a(`/sleep?date=${e.dataset.day}`)}}},yh=[30,60,90];function bh(e,t){let n=Math.max(...e.map(e=>e.count),1);return K`
    <ul class="bars">
      ${e.map(e=>K`
          <li class="bars__row">
            <span class="bars__label">${t(e.key)}</span>
            <span class="bars__value">${Ur(`plural.times`,e.count)}</span>
            <span class="bars__track" aria-hidden="true"><span class="bars__fill" style="width:${Math.max(e.count/n*100,4)}%"></span></span>
          </li>`)}
    </ul>`}var xh=(e,t,{empty:n=!1}={})=>K`
  <div class="stat">
    <span class="stat__value ${n?`stat__value--empty`:``}">${t}</span>
    <span class="stat__label">${e}</span>
  </div>`,Sh={render(e){let t=yh.includes(Number(e.query.days))?Number(e.query.days):30,n=mu(du(t)),r=L(`insights.noValue`),i=K`
      ${dd(L(`insights.title`))}
      <div class="insights-period">
        ${pd({name:`days`,legend:L(`insights.periodLabel`),selected:String(t),options:yh.map(e=>({value:String(e),label:Ur(`plural.days`,e)}))})}
      </div>`;return!n.recordCount&&!n.intakes.length&&!n.sleeps.length?ad(`insights`,K`${i}
          <div class="coming">
            ${ff({symbol:`chart`,size:200})}
            <p class="muted">${L(`insights.empty`)}</p>
          </div>
          ${X({label:L(`insights.report`),iconName:`fileText`,variant:`secondary`,action:`report`,block:!0})}
          ${Id()}`):ad(`insights`,K`${i}
        <section class="section" aria-labelledby="ov-title">
          <h2 class="section-title" id="ov-title">${L(`insights.overview`)}</h2>
          <div class="stats">
            ${xh(L(`insights.symptomDays`),n.symptomDays)}
            ${xh(L(`insights.episodes`),n.episodeCount)}
            ${xh(L(`insights.avgIntensity`),n.avgIntensity==null?r:Uf(n.avgIntensity),{empty:n.avgIntensity==null})}
            ${xh(L(`insights.avgDuration`),n.avgDurationMinutes==null?r:Gf(n.avgDurationMinutes),{empty:n.avgDurationMinutes==null})}
          </div>
        </section>

        ${Id()}

        <section class="section" aria-labelledby="sym-title">
          <h2 class="section-title" id="sym-title">${L(`insights.topSymptoms`)}</h2>
          <p class="muted small">${L(`insights.topSymptomsLead`)}</p>
          ${n.symptoms.length?bh(n.symptoms.slice(0,6),ip):K`<p class="muted">${L(`insights.empty`)}</p>`}
        </section>

        <section class="section" aria-labelledby="trig-title">
          <h2 class="section-title" id="trig-title">${L(`insights.topTriggers`)}</h2>
          ${n.triggers.length?bh(n.triggers.slice(0,6),up):K`<p class="muted">${L(`insights.triggersEmpty`)}</p>`}
        </section>

        <section class="section" aria-labelledby="sleep-title">
          <h2 class="section-title" id="sleep-title">${L(`sleep.title`)}</h2>
          ${n.sleeps.length?K`<div class="stats">
                  ${xh(L(`sleep.avg`),Gf(n.avgSleepMinutes))}
                  ${xh(L(`sleep.nights`),n.sleeps.length)}
                </div>
                ${n.sleepQuality.length?bh(n.sleepQuality,mp):``}`:K`<p class="muted">${L(`report.sleepNone`)}</p>`}
        </section>

        <section class="section" aria-labelledby="meds-title">
          <h2 class="section-title" id="meds-title">${L(`insights.meds`)}</h2>
          ${n.meds.length?K`<ul class="med-stats">
                ${n.meds.map(e=>K`
                    <li class="med-stats__row">
                      <a href="#/treatment/${e.medication.id}" class="med-stats__name">${e.medication.name}</a>
                      <span class="med-stats__count">${Ur(`plural.times`,e.count)}</span>
                      ${e.effects.length?K`<span class="med-stats__effects">${e.effects.map(e=>`${lp(e.key)} ${Ur(`plural.times`,e.count)}`).join(` · `)}</span>`:``}
                    </li>`)}
              </ul>`:K`<p class="muted">${L(`insights.medsEmpty`)}</p>`}
        </section>

        <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`insights.interpretation`)}</span></p>
        <div class="section">
          ${X({label:L(`insights.report`),iconName:`fileText`,action:`report`,block:!0})}
        </div>`)},onChange(e,t){e.name===`days`&&(o(`/insights?days=${e.value}`),t.rerender())},actions:{report(e,t){a(`/report?days=${t.query.days??30}`)}}},Ch={render(e){let t=yh.includes(Number(e.query.days))?String(e.query.days):`30`,n=du(30);return J({form:!0,header:Y({back:`/insights`}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`report.title`)}</h1>
        <p class="screen-lead">${L(`report.lead`)}</p>
        <div class="step-options">
          ${fd({name:`range`,legend:L(`report.period`),options:[...yh.map(e=>({value:String(e),label:Ur(`plural.days`,e)})),{value:`custom`,label:L(`report.custom`)}],selected:t})}
        </div>
        <!-- Zobrazí sa iba pri „Vlastné obdobie“ (CSS :has) -->
        <div class="report-custom field-row">
          ${Z({label:L(`report.from`),name:`from`,type:`date`,value:n.from})}
          ${Z({label:L(`report.to`),name:`to`,type:`date`,value:n.to})}
        </div>
        ${I()?``:K`<a class="report-plus-hint" href="#/plus?from=report">
              ${q(`lock`,{size:16})}<span>${L(`report.plusHint`)}</span>
            </a>`}`,footer:X({label:L(`report.create`),type:`submit`,iconName:`fileText`,block:!0})})},onSubmit(e){let t=new FormData(e),n=t.get(`range`),r,i;if(n===`custom`){if(r=String(t.get(`from`)||``),i=String(t.get(`to`)||A()),!r||r>i){md(e,`from`,L(`report.invalidRange`));return}}else({from:r,to:i}=du(Number(n)));a(`/report/view?from=${r}&to=${i}`)}},wh=5;function Th({from:e,to:t}){if(!I())return``;let{weather:n,health:r}=F(),i=Ju({from:e,to:t}),a=Pu({days:365}),o=a.enough?a.factors.filter(e=>e.strength===`strong`||e.strength===`possible`):[];return K`
    ${n.enabled&&i.rows.length?K`<section>
          <h3>${L(`report.weather`)}</h3>
          <p>${L(`report.weatherSummary`,{drops:i.drops,total:i.rows.length})}</p>
          <table class="report-table">
            <thead><tr><th>${L(`plus.weather.colDay`)}</th><th>${L(`plus.weather.colPressure`)}</th><th>${L(`plus.weather.colChange`)}</th><th>${L(`plus.weather.condition`)}</th></tr></thead>
            <tbody>
              ${i.rows.map(e=>K`<tr>
                  <td>${Vf(e.episode.startedAt)}</td>
                  <td>${wd(e.weather.pressure)}${lr(e.weather)?` (${L(`plus.weather.estimateWord`)})`:``}</td>
                  <td>${e.weather.pressureChange==null?`–`:Dd(e.weather.pressureChange)}</td>
                  <td>${kd(e.weather.condition)}</td>
                </tr>`)}
            </tbody>
          </table>
        </section>`:``}
    ${o.length?K`<section>
          <h3>${L(`report.patterns`)}</h3>
          <table class="report-table">
            <tbody>
              ${o.map(e=>K`<tr>
                  <td>${L(`plus.finder.factors.${e.key}`)}</td>
                  <td class="num">${L(`plus.finder.ofDays`,{a:e.withHard,b:e.withDays})}</td>
                  <td class="num">${L(`report.patternsOther`,{a:e.withoutHard,b:e.withoutDays})}</td>
                </tr>`)}
            </tbody>
          </table>
          <p class="report-sub">${L(`report.patternsNote`)}</p>
        </section>`:``}
    ${r.connected&&i.avgSteps!=null?K`<section>
          <h3>${L(`report.activity`)}</h3>
          <table class="report-table">
            <tbody>
              <tr><td>${L(`report.avgSteps`)}</td><td class="num">${Ad(i.avgSteps)}</td></tr>
            </tbody>
          </table>
        </section>`:``}`}function Eh(e,t){return e.length?K`
    <table class="report-table">
      <tbody>
        ${e.map(e=>K`<tr><td>${t(e.key)}</td><td class="num">${Ur(`plural.times`,e.count)}</td></tr>`)}
      </tbody>
    </table>`:K`<p class="report-none">${L(`report.none`)}</p>`}function Dh(e){let t=[...e.logs.map(e=>{let t=sn(e);return{at:e.occurredAt,entry:L(`symptomLog.title`),detail:[sp(e),t==null?``:L(`intensity.highest`,{value:op(t)}),e.duration?cp(e.duration):``].filter(Boolean).join(` · `)}}),...e.episodes.map(e=>({at:e.startedAt,entry:L(`episode.title`),detail:e.endedAt?`${Bf(e.startedAt)} – ${Bf(e.endedAt)}`:L(`episode.statusOngoing`)})),...e.intakes.filter(e=>Vt(e.medicationId)?.type===`acute`||e.effect||e.episodeId).map(e=>({at:e.takenAt,entry:Vt(e.medicationId)?.name??L(`today.intakeTitle`),detail:[e.dose,e.effect?lp(e.effect):``].filter(Boolean).join(` · `)})),...e.sleeps.map(e=>({at:e.wakeTime??xt(e.date,`06:00`),dateOnly:!0,entry:L(`sleep.title`),detail:[Gf(e.minutes),e.quality?mp(e.quality):``].filter(Boolean).join(` · `)}))].sort((e,t)=>e.at.localeCompare(t.at));return t.length?K`
    <table class="report-table report-table--timeline">
      <thead><tr><th>${L(`report.colDate`)}</th><th>${L(`report.colEntry`)}</th><th>${L(`report.colDetail`)}</th></tr></thead>
      <tbody>${t.map(e=>K`<tr><td>${e.dateOnly?Vf(e.at):Bf(e.at)}</td><td>${e.entry}</td><td>${e.detail}</td></tr>`)}</tbody>
    </table>`:K`<p class="report-none">${L(`report.none`)}</p>`}var Oh={render(e){let t=e.query.from??A(),n=e.query.to??A(),r=mu({from:t,to:n}),i=F().cycleTracking===!0,a=r.logs.filter(e=>e.note),o=L(`insights.noValue`);return J({variant:`screen--report`,header:Y({back:`/insights`}),body:K`
        <h1 class="visually-hidden" tabindex="-1">${L(`report.title`)}</h1>
        <p class="report-hint">${L(`report.printHint`)}</p>
        <article class="report-doc">
          <header class="report-doc__head">
            <p class="report-doc__app">${L(`app.name`)}</p>
            <h2 class="report-doc__title screen-title" tabindex="-1">${L(`report.docTitle`)}</h2>
            <dl class="report-meta">
              <div><dt>${L(`report.period`)}</dt><dd>${Vf(j(t))} – ${Vf(j(n))}</dd></div>
              <div><dt>${L(`report.created`)}</dt><dd>${Vf(new Date)}</dd></div>
            </dl>
            <p class="report-disclaimer">${L(`report.disclaimer`)}</p>
            ${r.recordCount<wh?K`<p class="report-warning">${L(`report.fewData`)}</p>`:``}
          </header>

          <section>
            <h3>${L(`report.summary`)}</h3>
            <table class="report-table">
              <tbody>
                <tr><td>${L(`insights.symptomDays`)}</td><td class="num">${r.symptomDays}</td></tr>
                <tr><td>${L(`insights.episodes`)}</td><td class="num">${r.episodeCount}</td></tr>
                <tr><td>${L(`insights.avgIntensity`)}</td><td class="num">${r.avgIntensity==null?o:Uf(r.avgIntensity)}</td></tr>
                <tr><td>${L(`insights.avgDuration`)}</td><td class="num">${r.avgDurationMinutes==null?o:Gf(r.avgDurationMinutes)}</td></tr>
              </tbody>
            </table>
          </section>

          <section>
            <h3>${L(`report.symptoms`)}</h3>
            ${Eh(r.symptoms,ip)}
          </section>

          <section>
            <h3>${L(`report.triggers`)}</h3>
            ${Eh(r.triggers,up)}
          </section>

          <section>
            <h3>${L(`report.meds`)}</h3>
            ${r.meds.length?K`<table class="report-table">
                  <tbody>
                    ${r.meds.map(e=>K`<tr>
                        <td>${[e.medication.name,e.medication.dose].filter(Boolean).join(` `)}<br /><span class="report-sub">${L(`medications.types.${e.medication.type}`)}</span></td>
                        <td class="num">${Ur(`plural.times`,e.count)}</td>
                        <td>${e.effects.map(e=>`${lp(e.key)} ${Ur(`plural.times`,e.count)}`).join(`, `)||L(`treatment.effectMissing`)}</td>
                      </tr>`)}
                  </tbody>
                </table>`:K`<p class="report-none">${L(`report.none`)}</p>`}
          </section>

          <section>
            <h3>${L(`report.sleep`)}</h3>
            ${r.sleeps.length?K`<table class="report-table">
                  <tbody>
                    <tr><td>${L(`sleep.avg`)}</td><td class="num">${Gf(r.avgSleepMinutes)}</td></tr>
                    <tr><td>${L(`sleep.nights`)}</td><td class="num">${r.sleeps.length}</td></tr>
                    ${r.sleepQuality.map(e=>K`<tr><td>${L(`report.sleepQuality`)}: ${mp(e.key)}</td><td class="num">${Ur(`plural.times`,e.count)}</td></tr>`)}
                  </tbody>
                </table>`:K`<p class="report-none">${L(`report.sleepNone`)}</p>`}
          </section>

          ${i?K`<section>
                <h3>${L(`report.cycle`)}</h3>
                <p>${L(`report.cycleDays`)}: <strong>${r.periodDays}</strong></p>
              </section>`:``}

          ${Th({from:t,to:n})}

          ${a.length?K`<section>
                <h3>${L(`report.notes`)}</h3>
                <ul class="report-notes">
                  ${a.map(e=>K`<li><strong>${Bf(e.occurredAt)}:</strong> ${e.note}</li>`)}
                </ul>
              </section>`:``}

          <section>
            <h3>${L(`report.timeline`)}</h3>
            ${Dh(r)}
          </section>
        </article>`,footer:X({label:L(`report.print`),iconName:`printer`,action:`print`,block:!0})})},actions:{print(){fl(()=>Pe(`${L(`app.name`)} ${A()}`))}}},kh=[`good`,`fair`,`poor`],Ah=Array.from({length:17},(e,t)=>t),jh=Array.from({length:12},(e,t)=>t*5);function Mh({name:e,label:t,values:n,selected:r,suffix:i=``}){return K`
    <div class="field">
      <label class="field__label" for="f-${e}">${t}</label>
      <select class="field__input" id="f-${e}" name="${e}" aria-describedby="f-${e}-error">
        ${n.map(e=>K`<option value="${e}"${e===r?K` selected`:``}>${e}${i}</option>`)}
      </select>
    </div>`}var Nh={render(e){let t=e.query.date??A(),n=Cn(t),r=n?Math.floor(n.minutes/60):7,i=n?Math.min(55,Math.round(n.minutes%60/5)*5):0;return J({form:!0,header:Y({back:`/today`}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`sleep.formTitle`)}</h1>
        <p class="screen-lead">${L(`sleep.lead`)}</p>
        <div class="form-stack">
          ${Z({label:L(`sleep.date`),name:`date`,type:`date`,value:t})}
          <fieldset class="form-section form-section--tight">
            <legend class="field__label">${L(`sleep.duration`)}</legend>
            <div class="field-row">
              ${Mh({name:`hours`,label:L(`sleep.hours`),values:Ah,selected:r,suffix:` h`})}
              ${Mh({name:`minutes`,label:L(`sleep.minutes`),values:jh,selected:i,suffix:` min`})}
            </div>
            <p class="field__error" id="f-hours-error" hidden></p>
          </fieldset>
          <fieldset class="form-section form-section--tight">
            <legend class="field__label">${L(`sleep.quality`)} <span class="field__optional">(${L(`common.optional`)})</span></legend>
            ${fd({name:`quality`,legend:L(`sleep.quality`),options:kh.map(e=>({value:e,label:L(`sleep.qualities.${e}`)})),selected:n?.quality})}
          </fieldset>
          ${Z({label:L(`sleep.note`),name:`note`,value:n?.note??``,multiline:!0,optional:!0})}
        </div>`,footer:K`
        ${X({label:L(`sleep.save`),type:`submit`,iconName:`check`,block:!0})}
        ${n?X({label:L(`sleep.delete`),variant:`danger`,action:`delete`,block:!0}):``}`})},onSubmit(e){let t=new FormData(e),n=Number(t.get(`hours`))*60+Number(t.get(`minutes`));n<=0?md(e,`hours`,L(`sleep.durationRequired`)):(wn({date:String(t.get(`date`)||A()),minutes:n,quality:t.get(`quality`),note:String(t.get(`note`)??``)}),Q(L(`sleep.saved`)),s(`/today`))},actions:{async delete(e,t){let n=t.query.date??A();if(!await Nf({title:L(`sleep.deleteTitle`),text:L(`sleep.deleteText`),confirmLabel:L(`sleep.delete`)}))return;let r=Tn(n);s(`/today`),Q(L(`sleep.deletedToast`),{actionLabel:L(`common.undo`),onAction:()=>{En(r),t.rerender()}})}}},Ph=`2026-11`,Fh=[`controller`,`data`,`storage`,`weather`,`health`,`purchases`,`links`,`purpose`,`legal`,`retention`,`rights`,`contact`,`security`,`backup`,`age`,`changes`];function Ih(){let e=F().consent;return!!e?.healthDataAt&&e.policyVersion===`2026-11`}var Lh=[[`smartphone`,`consent.factDevice`],[`shield`,`consent.factNoServer`],[`lock`,`consent.factPin`],[`download`,`consent.factControl`]];function Rh(){let e=document.querySelectorAll(`input[name="consent"]:checked`).length;document.getElementById(`consent-submit`).disabled=e<2}function zh({onboarding:e}){let t=`/start/privacy`;return{render(){let n=Ih(),r=!n&&!!F().consent?.healthDataAt,i=e?gf(t):null;return J({form:!0,header:e?Y({back:i.prev,step:i.step,total:i.total}):``,variant:e?``:`screen--tab`,body:K`
          <h1 class="screen-title" tabindex="-1">${L(`consent.title`)}</h1>
          <p class="screen-lead">${L(r?`consent.updatedLead`:`consent.lead`)}</p>
          <ul class="facts-list">
            ${Lh.map(([e,t])=>K`<li>${q(e,{size:22})}<span>${L(t)}</span></li>`)}
          </ul>
          <div class="step-options">
            ${fd({name:`consent`,type:`checkbox`,legend:L(`consent.title`),options:[{value:`health`,label:L(`consent.health`)},{value:`age`,label:L(`consent.age`)}],selected:n?[`health`,`age`]:[]})}
          </div>
          <p class="section-sm"><a href="#/privacy-policy">${L(`consent.policyLink`)}</a></p>`,footer:X({label:L(`consent.submit`),type:`submit`,id:`consent-submit`,disabled:!n,block:!0})})},onChange(e){e.name===`consent`&&Rh()},onSubmit(n){let r=new FormData(n).getAll(`consent`);if(!r.includes(`health`)||!r.includes(`age`))return;let i=new Date().toISOString();Lt({consent:{healthDataAt:i,ageConfirmedAt:i,policyVersion:Ph}}),a(e?gf(t).next:`/today`,{replace:!e})}}}var Bh={render(){return J({header:Y({back:`/profile`}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`privacyPolicy.title`)}</h1>
        <p class="screen-lead">${_d(L(`privacyPolicy.draft`),{neutral:!0})} ${L(`privacyPolicy.version`,{version:Ph})}</p>
        <p class="field__hint section-sm">${L(`privacyPolicy.draftNote`)}</p>
        <div class="policy">
          ${Fh.map(e=>K`
              <section>
                <h2 class="section-title">${L(`privacyPolicy.${e}Title`)}</h2>
                <p>${L(`privacyPolicy.${e}Text`)}</p>
              </section>`)}
        </div>`})}},Vh=`/start/profile`,Hh={render(){let{step:e,total:t,prev:n}=gf(Vh);return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`profileSetup.title`)}</h1>
        <p class="screen-lead">${L(`profileSetup.lead`)}</p>
        <div class="form-stack">
          ${Z({label:L(`profileSetup.nameLabel`),name:`name`,value:F().name,placeholder:L(`profileSetup.namePlaceholder`),hint:L(`profileSetup.nameHint`),autocomplete:`given-name`,maxlength:40})}
          <div class="card card--accent pin-offer">
            <div class="pin-offer__head">${q(`lock`,{size:22})}<h2 class="card__title">${L(`profileSetup.pinTitle`)}</h2></div>
            <p class="muted">${L(tt()?`profileSetup.pinAlready`:`profileSetup.pinText`)}</p>
          </div>
        </div>`,footer:X({label:L(`common.continue`),type:`submit`,block:!0})})},onSubmit(e){let t=String(new FormData(e).get(`name`)??``).trim();Lt({name:t,nameSetAt:t?new Date().toISOString():null});let n=gf(Vh).next;tt()?a(n):a(`/security/pin?mode=set&next=${encodeURIComponent(n)}`)}};function Uh(){return K`
    <div class="pin">
      <div class="pin__dots" id="pin-dots" role="img" aria-label="${L(`pin.progress`,{n:0,total:6})}">
        ${Array.from({length:6},()=>K`<span class="pin__dot"></span>`)}
      </div>
      <p class="pin__status" id="pin-status" role="status" aria-live="polite"></p>
      <div class="pinpad" role="group" aria-label="${L(`pin.keypad`)}">
        ${[1,2,3,4,5,6,7,8,9].map(e=>K`<button type="button" class="pinpad__key" data-action="pinDigit" data-digit="${e}">${e}</button>`)}
        <span></span>
        <button type="button" class="pinpad__key" data-action="pinDigit" data-digit="0">0</button>
        <button type="button" class="pinpad__key pinpad__key--icon" data-action="pinBackspace" aria-label="${L(`pin.delete`)}">
          ${q(`delete`,{size:26})}
        </button>
      </div>
    </div>`}function Wh({onComplete:e}){let t=``,n=!1;function r(){let e=document.getElementById(`pin-dots`);e&&([...e.children].forEach((e,n)=>e.classList.toggle(`is-filled`,n<t.length)),e.setAttribute(`aria-label`,L(`pin.progress`,{n:t.length,total:6})))}let i={async digit(a){if(!(n||t.length>=6)&&(t+=a,r(),t.length===6)){let a=t;n=!0,i.setDisabled(!0);try{await e(a)}finally{n=!1,t=``,r(),i.setDisabled(!1)}}},backspace(){n||(t=t.slice(0,-1),r())},status(e,{error:t=!1}={}){let n=document.getElementById(`pin-status`);n&&(n.textContent=e??``,n.classList.toggle(`pin__status--error`,t))},setDisabled(e){document.querySelectorAll(`.pinpad__key`).forEach(t=>{t.disabled=e})},listenToKeyboard(){let e=e=>{/^[0-9]$/.test(e.key)?i.digit(e.key):e.key===`Backspace`&&i.backspace()};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)}};return i}function Gh(e,t){let n=Math.ceil((e-Date.now())/1e3);return n<=120?L(`pin.blockedSeconds`,{n:Math.max(n,1)}):L(`pin.blocked`,{time:t(e)})}function Kh(e){if(/^(\d)\1+$/.test(e))return!0;let t=[...e].slice(1).map((t,n)=>Number(t)-Number(e[n]));return t.every(e=>e===1)||t.every(e=>e===-1)}var qh={set:`new`,change:`current`,disable:`current`},Jh=null,Yh=null;function Xh(){return L(`pin.prompt.${Jh.step}`)}function Zh(){let e=document.querySelector(`.pin-setup__prompt`);e&&(e.textContent=Xh())}function Qh(e){return e?.blockedUntil?Gh(e.blockedUntil,Rf):L(`pin.wrong`)}var $h={render(e){let t=[`set`,`change`,`disable`].includes(e.query.mode)?e.query.mode:`set`;return Jh={mode:t,step:qh[t],first:null},J({variant:`screen--pin`,header:Y({back:e.query.next?`/start/profile`:`/profile`}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`pin.title.${t}`)}</h1>
        ${t===`set`?K`<p class="screen-lead">${L(`pin.setLead`)}</p>`:``}
        <p class="pin-setup__prompt">${Xh()}</p>
        ${Uh()}`})},mount(e,t){return Yh=Wh({onComplete:async e=>{if(Yh.status(``),Jh.step===`current`){Yh.status(L(`pin.checking`));try{await pt(e)}catch(e){Yh.status(Qh(e),{error:!0});return}if(Jh.mode===`disable`){await gt(zn()),Q(L(`pin.disabled`)),s(`/profile`);return}Jh.step=`new`,Yh.status(``),Zh()}else if(Jh.step===`new`){if(Kh(e)){Yh.status(L(`pin.weak`),{error:!0});return}Jh.first=e,Jh.step=`confirm`,Zh()}else e===Jh.first?(Yh.status(L(`pin.saving`)),Jh.mode===`set`?await mt(e,zn(),{language:F().language,theme:F().theme}):await ht(e),Q(L(Jh.mode===`set`?`pin.enabled`:`pin.changed`)),t.query.logout?_l():t.query.next?a(t.query.next,{replace:!0}):s(`/profile`)):(Jh.step=`new`,Jh.first=null,Zh(),Yh.status(L(`pin.mismatch`),{error:!0}))}}),Yh.listenToKeyboard()},actions:{pinDigit(e){Yh?.digit(e.dataset.digit)},pinBackspace(){Yh?.backspace()}}},eg=null;function tg(){let e=ot();return e>Date.now()&&(eg.setDisabled(!0),eg.status(Gh(e,Rf),{error:!0}),!0)}var ng={render(){return J({variant:`screen--pin screen--lock`,body:K`
        <div class="lock">
          ${df()}
          <h1 class="screen-title lock__title" tabindex="-1">${L(`lock.title`)}</h1>
          <p class="pin-setup__prompt">${L(`lock.lead`)}</p>
          ${Uh()}
          <button type="button" class="link-btn lock__forgot" data-action="forgot">${L(`lock.forgot`)}</button>
        </div>`})},mount(){eg=Wh({onComplete:async e=>{eg.status(L(`pin.checking`));try{let t=await ft(e);eg.status(``),pl(t),a(yl(),{replace:!0})}catch(e){e?.code===`blocked`||e?.blockedUntil?eg.status(Gh(e.blockedUntil,Rf),{error:!0}):eg.status(L(`pin.wrong`),{error:!0})}}});let e=tg(),t=setInterval(()=>{let t=tg();!t&&e&&(eg.setDisabled(!1),eg.status(``)),e=t},1e3),n=eg.listenToKeyboard();return()=>{clearInterval(t),n()}},actions:{pinDigit(e){ot()<=Date.now()&&eg?.digit(e.dataset.digit)},pinBackspace(){eg?.backspace()},async forgot(){await Nf({title:L(`lock.forgotTitle`),text:L(`lock.forgotText`),confirmLabel:L(`lock.forgotConfirm`)})&&(vt(),Mt(),a(`/start/language`,{replace:!0}))}}},rg=Hl[0],ig=`idle`,ag=e=>e.price??Wf(e.amount,e.currency);function og(e){let t=$l()?.[e];return t?e===`yearly`&&t.trial?L(`plus.plans.yearly.cta`):L(e===`yearly`?`plus.plans.yearly.ctaNoTrial`:`plus.plans.monthly.cta`,{price:ag(t)}):L(ig===`failed`?`plus.paywall.retryPrices`:`plus.paywall.loadingPrices`)}function sg(e){let t=$l()?.[e];return t?L(e===`yearly`?t.trial?`plus.plans.yearly.terms`:`plus.plans.yearly.termsNoTrial`:`plus.plans.monthly.terms`,{price:ag(t),store:Xl()}):ig===`failed`?L(`plus.paywall.pricesFailed`):``}function cg(e){if(e!==`yearly`)return L(`plus.plans.monthly.hint`);let t=$l()?.yearly;return t?.amount==null?``:L(t.trial?`plus.plans.yearly.hint`:`plus.plans.yearly.hintNoTrial`,{monthly:Wf(t.amount/12,t.currency)})}function lg(){let{yearly:e,monthly:t}=$l()??{};if(!e?.amount||!t?.amount||e.currency!==t.currency)return null;let n=Math.floor((1-e.amount/(t.amount*12))*100);return n>0?n:null}function ug(e,t){let n=$l()?.[e],r=e===`yearly`?lg():null;return K`
    <label class="option option--radio plan">
      <input type="radio" name="plan" value="${e}" id="plan-${e}"${t?K` checked`:``} />
      <span class="option__control">${q(`check`,{size:16,strokeWidth:3})}</span>
      <span class="plan__text">
        <span class="plan__name">${L(`plus.plans.${e}.name`)}${r?_d(L(`plus.plans.yearly.badge`,{percent:r})):``}</span>
        <span class="plan__hint">${cg(e)}</span>
      </span>
      <span class="plan__price">${n?ag(n):``}</span>
    </label>`}function dg(e){let t=yd.includes(e.query.from)?e.query.from:null,n=t?[t,...yd.filter(e=>e!==t)]:yd;return J({variant:`screen--paywall`,form:!0,header:Y({back:`/today`}),body:K`
      <p class="plus-mark" aria-hidden="true">${L(`app.name`)}<span>+</span></p>
      <h1 class="screen-title" tabindex="-1">${L(`plus.paywall.title`)}</h1>
      <p class="screen-lead">${L(`plus.paywall.lead`)}</p>

      <ul class="plus-features">
        ${n.map(e=>K`
            <li class="plus-feature">
              ${vd(bd[e])}
              <span>
                <strong>${L(`plus.features.${e}.title`)}</strong>
                <span class="plus-feature__text">${L(`plus.features.${e}.text`)}</span>
              </span>
            </li>`)}
      </ul>

      <section class="section" aria-labelledby="plans-title">
        <h2 class="section-title" id="plans-title">${L(`plus.paywall.choosePlan`)}</h2>
        <fieldset class="options">
          <legend class="visually-hidden">${L(`plus.paywall.choosePlan`)}</legend>
          ${Hl.map(e=>ug(e,e===rg))}
        </fieldset>
        <p class="plus-note">${L(`plus.paywall.renewal`,{store:Xl()})}</p>
      </section>

      <section class="plus-free" aria-labelledby="free-title">
        <h2 class="section-title" id="free-title">${L(`plus.paywall.freeTitle`)}</h2>
        <p class="muted">${L(`plus.paywall.freeText`)}</p>
      </section>

      ${K`<p class="plus-demo">${_d(L(`plus.demoChip`),{neutral:!0})}<span>${L(`plus.paywall.demoNote`)}</span></p>`}

      <div class="plus-links">
        <button type="button" class="link-btn" data-action="restore">${L(`plus.paywall.restore`)}</button>
        <button type="button" class="link-btn" data-action="terms">${L(`plus.paywall.terms`)}</button>
        <a class="link-btn" href="#/privacy-policy">${L(`privacyPolicy.title`)}</a>
      </div>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`plus.paywall.disclaimer`)}</span></p>`,footer:K`
      <p class="plus-terms" id="plus-terms" aria-live="polite">${sg(rg)}</p>
      ${X({label:og(rg),action:$l()||ig!==`failed`?`buy`:`retryPrices`,id:`plus-buy`,block:!0,disabled:!$l()&&ig!==`failed`})}
      ${X({label:L(`plus.paywall.notNow`),variant:`ghost`,action:`notNow`,block:!0})}`})}function fg(e){let{plus:t}=F(),n=e.query.welcome===`1`;return J({header:Y({back:`/profile`}),body:K`
      <h1 class="screen-title" tabindex="-1">${L(n?`plus.manage.welcomeTitle`:`plus.manage.title`)}</h1>
      <p class="screen-lead">${L(n?`plus.manage.welcomeLead`:`plus.manage.lead`)}</p>

      <section class="section" aria-labelledby="features-title">
        <h2 class="section-title" id="features-title">${L(`plus.manage.features`)}</h2>
        <div class="list">${yd.map(e=>Pd(e,{status:Fd(e)}))}</div>
      </section>

      <section class="section" aria-labelledby="sub-title">
        <h2 class="section-title" id="sub-title">${L(`plus.manage.subscription`)}</h2>
        <div class="list">
          <div class="list__row">
            ${q(`sparkles`)}
            <span class="list__text">
              <span class="list__label">${L(`plus.plans.${t.plan}.name`)}${$l()?.[t.plan]?` · ${ag($l()[t.plan])}`:``}</span>
              <span class="list__hint">${t.trialEndsAt?L(`plus.manage.trialUntil`,{date:Vf(t.trialEndsAt)}):L(`plus.manage.since`,{date:Vf(t.startedAt)})}</span>
            </span>
            ${t.simulated?_d(L(`plus.demoChip`),{neutral:!0}):``}
          </div>
          <button type="button" class="list__row" data-action="cancel">
            ${q(`x`)}
            <span class="list__text">
              <span class="list__label">${L(Yl()?`plus.manage.manageStore`:`plus.manage.cancel`)}</span>
              <span class="list__hint">${L(Yl()?`plus.manage.manageStoreHint`:`plus.manage.cancelHint`)}</span>
            </span>
          </button>
        </div>
      </section>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`plus.paywall.disclaimer`)}</span></p>`,footer:n?K`
          ${F().weather.enabled?``:X({label:L(`plus.manage.enableWeather`),iconName:`mapPin`,action:`toWeather`,block:!0})}
          ${X({label:L(`plus.manage.toToday`),variant:F().weather.enabled?`primary`:`ghost`,action:`toToday`,block:!0})}`:``})}var pg={render(e){return I()?fg(e):dg(e)},mount(e,t){I()||!Yl()||Zl()||ig!==`idle`||(ig=`loading`,eu().then(e=>{ig=e?`idle`:`failed`,!I()&&r().path===`/plus`&&t.rerender()}))},onChange(e){if(e.name!==`plan`)return;rg=e.value;let t=document.querySelector(`#plus-buy span`);t&&(t.textContent=og(e.value));let n=document.getElementById(`plus-terms`);n&&(n.textContent=sg(e.value))},actions:{async buy(){let e=document.querySelector(`input[name="plan"]:checked`)?.value??Hl[0];if(!$l()?.[e])return;let t=await tu(e);t===`done`?a(`/plus?welcome=1`,{replace:!0}):t===`restored`?(Q(L(`plus.paywall.restored`)),a(`/plus`,{replace:!0})):t===`unavailable`?Q(L(`plus.paywall.nativeOnly`)):t===`pending`?Q(L(`plus.paywall.purchasePending`)):t===`failed`&&Q(L(`plus.paywall.purchaseFailed`))},notNow(){s(`/today`)},retryPrices(e,t){ig=`idle`,t.rerender()},async restore(e,t){await au()?t.rerender():Q(L(`plus.paywall.nothingToRestore`))},terms(){jf({title:L(`plus.paywall.terms`),text:L(`plus.paywall.termsText`)})},toToday(){a(`/today`,{replace:!0})},toWeather(){a(`/plus/weather`,{replace:!0})},async cancel(e,t){Yl()?await ou():await Nf({title:L(`plus.manage.cancelTitle`),text:L(`plus.manage.cancelText`),confirmLabel:L(`plus.manage.cancelConfirm`)})&&(su(),t.rerender(),Q(L(`plus.manage.cancelled`)))}}},mg=327,hg=190,gg={top:12,right:8,bottom:26,left:42};function _g({points:e,todayKey:t,label:n,legend:r,table:i}){let a=e.map(e=>e.pressure),o=Math.floor(Math.min(...a)/5)*5,s=Math.ceil(Math.max(...a)/5)*5,c=s-o>30?10:5,l=[];for(let e=o;e<=s;e+=c)l.push(e);let u=mg-gg.left-gg.right,d=hg-gg.top-gg.bottom,f=e=>Date.parse(`${e.date}T00:00:00Z`)/864e5,p=e.map(t=>({...t,index:f(t)-f(e[0])})),m=Math.max(p[p.length-1].index,1),h=e=>gg.left+e/m*u,g=e=>gg.top+(1-(e-o)/Math.max(s-o,1))*d,_=e=>e.map((t,n)=>{let r=`${h(t.index).toFixed(1)} ${g(t.pressure).toFixed(1)}`;return n&&t.index-e[n-1].index===1?`L${r}`:`M${r} L${r}`}).join(` `),v=Math.max(p.findIndex(e=>e.date===t),0),y=p.slice(0,v+1),b=p.slice(v),x=p[v],S=x.index,C=u/m,w=[0,v,e.length-1].filter((e,t,n)=>n.indexOf(e)===t&&(e===v||Math.abs(p[e].index-S)*C>44));return K`
    <div class="chart">
      <p class="chart__readout" aria-live="polite">${x.readout}</p>
      <svg class="chart__svg" viewBox="0 0 ${mg} ${hg}" role="img" aria-label="${n}">
        ${l.map(e=>K`
            <line class="chart__grid" x1="${gg.left}" x2="${mg-gg.right}" y1="${g(e).toFixed(1)}" y2="${g(e).toFixed(1)}"></line>
            <text class="chart__tick" x="${gg.left-6}" y="${(g(e)+4).toFixed(1)}" text-anchor="end">${e}</text>`)}
        ${w.map(t=>K`<text class="chart__tick" x="${h(p[t].index).toFixed(1)}" y="${182}" text-anchor="${t===0?`start`:t===e.length-1?`end`:`middle`}">${p[t].tickLabel}</text>`)}
        <line class="chart__today" x1="${h(S).toFixed(1)}" x2="${h(S).toFixed(1)}" y1="${gg.top}" y2="${hg-gg.bottom}"></line>
        <path class="chart__line" d="${_(y)}"></path>
        ${b.length>1?K`<path class="chart__line chart__line--forecast" d="${_(b)}"></path>`:``}
        ${p.filter(e=>e.episode).map(e=>K`<circle class="chart__dot" cx="${h(e.index).toFixed(1)}" cy="${g(e.pressure).toFixed(1)}" r="5"></circle>`)}
        <line class="chart__cross" x1="${h(S).toFixed(1)}" x2="${h(S).toFixed(1)}" y1="${gg.top}" y2="${hg-gg.bottom}"></line>
        <circle class="chart__selected" cx="${h(S).toFixed(1)}" cy="${g(x.pressure).toFixed(1)}" r="5"></circle>
        ${p.map(e=>K`<rect class="chart__hit" x="${(h(e.index)-C/2).toFixed(1)}" y="0" width="${C.toFixed(1)}" height="${hg-gg.bottom}"
            data-readout="${e.readout}" data-x="${h(e.index).toFixed(1)}" data-y="${g(e.pressure).toFixed(1)}"></rect>`)}
      </svg>
      <ul class="chart__legend" aria-label="${L(`plus.charts.legend`)}">
        ${r.map(e=>K`<li><span class="chart__key chart__key--${e.key}" aria-hidden="true"></span>${e.label}</li>`)}
      </ul>
      ${i}
    </div>`}function vg({items:e,label:t,table:n,selected:r=e.length-1}){let i=Math.max(...e.map(e=>e.value),1),a=e.findIndex(e=>e.value===i);return K`
    <div class="chart">
      <p class="chart__readout" aria-live="polite">${e[r].readout}</p>
      <div class="cols" role="img" aria-label="${t}">
        ${e.map((t,n)=>K`
            <div class="cols__col${n===r?` is-selected`:``}" data-readout="${t.readout}">
              <span class="cols__plot">
                <span class="cols__value">${n===a||n===e.length-1?t.display??t.value:``}</span>
                <span class="cols__bar${t.value?``:` cols__bar--empty`}" style="height:${Math.max(t.value/i*100,2)}%"></span>
              </span>
              <span class="cols__label">${t.label}</span>
            </div>`)}
      </div>
      ${n}
    </div>`}function yg({head:e,rows:t}){return K`
    <details class="chart__table">
      <summary>${L(`plus.charts.showTable`)}</summary>
      <table class="data-table">
        <thead><tr>${e.map(e=>K`<th scope="col">${e}</th>`)}</tr></thead>
        <tbody>${t.map(e=>K`<tr>${e.map(e=>K`<td>${e}</td>`)}</tr>`)}</tbody>
      </table>
    </details>`}function bg({grid:e,rowLabels:t,colLabels:n,label:r}){let i=Math.max(...e.flat(),1),a=e=>e===0?0:Math.ceil(e/i*3);return K`
    <div class="heat-wrap">
      <table class="heat" aria-label="${r}">
        <thead>
          <tr><td></td>${n.map(e=>K`<th scope="col">${e}</th>`)}</tr>
        </thead>
        <tbody>
          ${e.map((e,n)=>K`
              <tr>
                <th scope="row">${t[n]}</th>
                ${e.map(e=>K`<td class="heat__cell heat__cell--${a(e)}">${e||``}${e?``:K`<span class="visually-hidden">0</span>`}</td>`)}
              </tr>`)}
        </tbody>
      </table>
    </div>`}function xg(e){let t=t=>{let n=document.elementFromPoint(t.clientX,t.clientY)?.closest?.(`[data-readout]`);if(!n||!e.contains(n))return;let r=n.closest(`.chart`);if(r.querySelector(`.chart__readout`).textContent=n.dataset.readout,n.matches(`.cols__col`)){r.querySelector(`.cols__col.is-selected`)?.classList.remove(`is-selected`),n.classList.add(`is-selected`);return}let i=r.querySelector(`.chart__cross`),a=r.querySelector(`.chart__selected`);i.setAttribute(`x1`,n.dataset.x),i.setAttribute(`x2`,n.dataset.x),a.setAttribute(`cx`,n.dataset.x),a.setAttribute(`cy`,n.dataset.y)};return e.addEventListener(`pointermove`,t),e.addEventListener(`click`,t),()=>{e.removeEventListener(`pointermove`,t),e.removeEventListener(`click`,t)}}var Sg=new URL(`openweather-logo-DYDLtN4d.png`,import.meta.url).href,Cg=new URL(`openweather-logo-negative-ajDAZS8x.png`,import.meta.url).href,wg=[14,30,90],Tg=`https://openweathermap.org/`;function Eg(){return J({header:Y({back:`/plus`}),body:K`
      ${vd(`gauge`,{large:!0})}
      <h1 class="screen-title plus-after-badge" tabindex="-1">${L(`plus.features.weather.title`)}</h1>
      <p class="screen-lead">${L(`plus.weather.offLead`)}</p>
      <ul class="facts-list">${[[`gauge`,`plus.weather.factRecord`],[`mapPin`,`plus.weather.factLocation`],[`shield`,`plus.weather.factHealth`],[`x`,`plus.weather.factOff`]].map(([e,t])=>K`<li>${q(e,{size:22})}<span>${L(t)}</span></li>`)}</ul>`,footer:X({label:L(`plus.weather.enable`),iconName:`mapPin`,action:`useLocation`,id:`weather-enable`,block:!0})})}function Dg(e){let t=e.pressureChange,n=t==null||Math.abs(t)<1?`minus`:t<0?`arrowDown`:`arrowUp`;return K`
    <section class="card weather-now" aria-labelledby="now-title">
      <h2 class="visually-hidden" id="now-title">${L(`plus.weather.today`)}</h2>
      <div class="weather-now__main">
        <span class="weather-now__pressure">${wd(e.pressure)}</span>
        ${t==null?``:K`<span class="weather-now__change">${q(n,{size:18})}${L(`plus.weather.changeShort`,{value:Dd(t)})}</span>`}
      </div>
      <p class="weather-now__band">${L(`plus.weather.bands.${Ed(e.pressure)}`)}</p>
      <dl class="weather-now__facts">
        <div><dt>${q(xd[e.condition]??`cloud`,{size:18})}<span class="visually-hidden">${L(`plus.weather.condition`)}</span></dt><dd>${kd(e.condition)}</dd></div>
        <div><dt>${q(`thermometer`,{size:18})}<span class="visually-hidden">${L(`plus.weather.temperature`)}</span></dt><dd>${Od(e)}</dd></div>
        ${e.humidity==null?``:K`<div><dt>${q(`droplets`,{size:18})}<span class="visually-hidden">${L(`plus.weather.humidity`)}</span></dt><dd>${L(`plus.weather.humidityValue`,{value:e.humidity})}</dd></div>`}
      </dl>
    </section>`}function Og(e){return K`
    <details class="pressure-scale">
      <summary>${L(`plus.weather.bandTitle`)}</summary>
      <ul class="pressure-scale__list">
        ${Td.map(({key:t})=>K`
            <li class="pressure-scale__row${t===e?` is-current`:``}">
              <span class="pressure-scale__label">
                ${L(`plus.weather.bands.${t}`)}
                ${t===e?K`<span class="pressure-scale__now">${L(`plus.weather.bandNow`)}</span>`:``}
              </span>
              <span class="pressure-scale__range">${L(`plus.weather.bandRanges.${t}`)}</span>
            </li>`)}
      </ul>
      <p class="muted small">${L(`plus.weather.bandNote`)}</p>
    </details>`}function kg(e){let t=A(),n=qu({from:A(M(new Date,-(e-1))),to:A(M(new Date,7))});if(n.length<2)return``;let r=e=>[e.date===t?L(`plus.forecast.today`):`${Nd(e.date)} ${Md(j(e.date))}`,wd(e.pressure),e.pressureChange==null?``:L(`plus.weather.changeShort`,{value:Dd(e.pressureChange)}),e.date>t?L(`plus.weather.forecastWord`):``,e.estimated?L(`plus.weather.estimateWord`):``,e.episode?L(`plus.weather.episodeWord`):``].filter(Boolean).join(` · `),i=n.map(e=>({date:e.date,pressure:e.pressure,episode:e.episode,tickLabel:e.date===t?L(`plus.forecast.today`):Md(j(e.date)),readout:r(e)}));return K`
    <section class="section" aria-labelledby="chart-title">
      <h2 class="section-title" id="chart-title">${L(`plus.weather.chartTitle`)}</h2>
      ${pd({name:`range`,legend:L(`insights.periodLabel`),selected:String(e),options:wg.map(e=>({value:String(e),label:L(`plus.weather.rangeDays`,{n:e})}))})}
      ${_g({points:i,todayKey:t,label:L(`plus.weather.chartLabel`,{n:e}),legend:[{key:`line`,label:L(`plus.weather.legendPressure`)},{key:`forecast`,label:L(`plus.weather.legendForecast`)},{key:`dot`,label:L(`plus.weather.legendEpisode`)}],table:yg({head:[L(`plus.weather.colDay`),L(`plus.weather.colPressure`),L(`plus.weather.colChange`),L(`plus.weather.colEpisode`)],rows:[...n].reverse().map(e=>[Md(j(e.date)),e.estimated?`${wd(e.pressure)} (${L(`plus.weather.estimateWord`)})`:wd(e.pressure),e.pressureChange==null?`–`:Dd(e.pressureChange),e.episode?L(`common.yes`):`–`])})})}
    </section>`}function Ag(){let e=[1,2,3,4,5,6,7].map(e=>kn(A(M(new Date,e)))).filter(Boolean);return e.length?K`
    <section class="section" aria-labelledby="fc-title">
      <h2 class="section-title" id="fc-title">${L(`plus.weather.forecastTitle`)}</h2>
      <ul class="weather-days">
        ${e.map(e=>K`
            <li class="weather-day">
              ${q(xd[e.condition]??`cloud`,{size:22})}
              <span class="weather-day__main">
                <span class="weather-day__name">${Nd(e.date)}</span>
                <span class="weather-day__meta">${kd(e.condition)} · ${Od(e)}</span>
              </span>
              <span class="weather-day__pressure">
                <span>${wd(e.pressure)}</span>
                ${e.pressureChange==null?``:K`<span class="weather-day__change">${Dd(e.pressureChange)}</span>`}
              </span>
            </li>`)}
      </ul>
    </section>`:``}function jg(){let e=Pu({days:365}),t=e.enough?e.factors.find(e=>e.key===`pressure_drop`):null;return K`
    <section class="section" aria-labelledby="link-title">
      <h2 class="section-title" id="link-title">${L(`plus.weather.linkTitle`)}</h2>
      <p class="muted">${t?zd({stat:t}):L(`plus.forecast.evidenceFew`)}</p>
      <div class="section-sm">${X({label:L(`plus.weather.openFinder`),iconName:`search`,variant:`secondary`,action:`openFinder`,block:!0})}</div>
    </section>`}function Mg(e){let t=F().weather,n=wg.includes(Number(e.query.range))?Number(e.query.range):14,r=kn(A());return J({header:Y({back:`/plus`}),body:K`
      <h1 class="screen-title" tabindex="-1">${L(`plus.features.weather.title`)}</h1>
      <p class="weather-place">${q(`mapPin`,{size:18})}<span>${L(`plus.weather.myLocation`)}</span></p>
      <p class="muted small">${L(xr()?`plus.weather.updated`:`plus.weather.stale`,{time:zf(t.updatedAt)})}</p>
      ${r?Dg(r):K`<p class="empty section-sm">${L(`plus.weather.noData`)}</p>`}
      ${Og(r?Ed(r.pressure):null)}
      ${kg(n)}
      ${Ag()}
      ${jg()}

      <section class="section" aria-labelledby="ws-title">
        <h2 class="section-title" id="ws-title">${L(`plus.weather.settings`)}</h2>
        <div class="list">
          <button type="button" class="list__row" data-action="useLocation">
            ${q(`refresh`)}
            <span class="list__text">
              <span class="list__label">${L(`plus.weather.updateLocation`)}</span>
              <span class="list__hint">${L(`plus.weather.factLocation`)}</span>
            </span>
          </button>
          <button type="button" class="list__row list__row--danger" data-action="turnOff">
            ${q(`x`)}
            <span class="list__text">
              <span class="list__label">${L(`plus.weather.turnOff`)}</span>
              <span class="list__hint">${L(`plus.weather.turnOffHint`)}</span>
            </span>
          </button>
        </div>
      </section>
      <p class="plus-source">
        <a class="weather-source" href="${Tg}" target="_blank" rel="noopener noreferrer">
          <img class="weather-source__logo weather-source__logo--light" src="${Sg}" alt="" width="196" height="84">
          <img class="weather-source__logo weather-source__logo--dark" src="${Cg}" alt="" width="197" height="84">
          <span>${L(`plus.weather.attribution`)}</span>
        </a>
      </p>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`plus.weather.disclaimer`)}</span></p>`})}var Ng={render(e){return F().weather.enabled?Mg(e):Eg()},mount(e){return xg(e)},onChange(e,t){e.name===`range`&&(o(`/plus/weather?range=${e.value}`),t.rerender())},actions:{async useLocation(e,t){e.disabled=!0,Q(L(`plus.weather.loading`));try{let{position:e,days:n}=await yr();F().weather.enabled||An({source:$n,...e}),Mn(n,e),t.rerender(),Q(L(`plus.weather.enabled`))}catch(t){e.disabled=!1,Q(L(`plus.weather.errors.${[`denied`,`unavailable`,`setup`].includes(t.message)?t.message:`network`}`))}},openFinder(){a(`/plus/finder`)},async turnOff(e,t){await Nf({title:L(`plus.weather.turnOffTitle`),text:L(`plus.weather.turnOffText`),confirmLabel:L(`plus.weather.turnOff`)})&&(jn(),t.rerender())}}},Pg={sleep:`bed`,steps:`footprints`};function Fg(){return J({header:Y({back:`/plus`}),body:K`
      ${vd(`watch`,{large:!0})}
      <h1 class="screen-title plus-after-badge" tabindex="-1">${L(`plus.features.health.title`)}</h1>
      <p class="screen-lead">${L(`plus.health.lead`)}</p>
      <p class="plus-free section-sm">${L(`plus.health.browserOnly`)}</p>
      <p class="disclaimer">${q(`shield`,{size:20})}<span>${L(`plus.health.privacy`)}</span></p>`})}function Ig(){return J({form:!0,header:Y({back:`/plus`}),body:K`
      ${vd(`watch`,{large:!0})}
      <h1 class="screen-title plus-after-badge" tabindex="-1">${L(`plus.features.health.title`)}</h1>
      <p class="screen-lead">${L(`plus.health.lead`)}</p>
      <section class="section" aria-labelledby="types-title">
        <h2 class="section-title" id="types-title">${L(`plus.health.typesTitle`)}</h2>
        <div class="list">
          ${xl.map(e=>gd({name:`type-${e}`,label:L(`plus.health.types.${e}`),checked:!0,iconName:Pg[e]}))}
        </div>
      </section>
      <p class="disclaimer">${q(`shield`,{size:20})}<span>${L(`plus.health.privacy`)}</span></p>`,footer:X({label:L(`plus.health.connectTo.${Ol()}`),iconName:`watch`,action:`connect`,id:`health-connect`,block:!0})})}function Lg(e){return Array.from({length:e},(t,n)=>A(M(new Date,-(e-1-n))))}function Rg(){let{health:e}=F(),t=A(),n=Nn(t),r=Cn(t),i=Lg(7),a=t=>e.types.includes(t),o=e=>`${Nd(e)} ${Md(j(e))}`,s=L(`plus.health.noValue`),c=i.map(e=>{let t=Nn(e)?.steps??null;return{label:jd(j(e)).slice(0,2),value:t??0,display:t==null?``:Ad(t),readout:`${o(e)} · ${t==null?s:L(`plus.health.stepsValue`,{value:Ad(t)})}`}}),l=i.map(e=>{let t=Cn(e)?.minutes??0;return{label:jd(j(e)).slice(0,2),value:t,display:t?Uf(t/60):``,readout:`${o(e)} · ${t?Gf(t):s}`}});return J({header:Y({back:`/plus`}),body:K`
      <h1 class="screen-title" tabindex="-1">${L(`plus.features.health.title`)}</h1>
      <p class="weather-place">${q(`watch`,{size:18})}<span>${L(`plus.health.providers.${e.provider}`)}</span></p>
      ${e.lastSyncAt?K`<p class="muted small">${L(`plus.health.lastSync`,{time:zf(e.lastSyncAt)})}</p>`:``}

      <div class="stats section-sm">
        ${a(`steps`)?K`<div class="stat"><span class="stat__value">${n?.steps==null?`–`:Ad(n.steps)}</span><span class="stat__label">${L(`plus.health.stepsToday`)}</span></div>`:``}
        ${a(`sleep`)?K`<div class="stat"><span class="stat__value">${r?Gf(r.minutes):`–`}</span><span class="stat__label">${L(`plus.health.sleepToday`)}</span></div>`:``}
      </div>

      ${a(`steps`)?K`<section class="section" aria-labelledby="steps-title">
            <h2 class="section-title" id="steps-title">${L(`plus.health.stepsWeek`)}</h2>
            ${vg({items:c,label:L(`plus.health.stepsWeek`),table:yg({head:[L(`plus.weather.colDay`),L(`plus.health.types.steps`)],rows:c.map(e=>[e.readout.split(` · `)[0],e.display||s])})})}
          </section>`:``}
      ${a(`sleep`)?K`<section class="section" aria-labelledby="sleep-title">
            <h2 class="section-title" id="sleep-title">${L(`plus.health.sleepWeek`)}</h2>
            ${vg({items:l,label:L(`plus.health.sleepWeek`),table:yg({head:[L(`plus.weather.colDay`),L(`plus.health.types.sleep`)],rows:l.map(e=>e.readout.split(` · `))})})}
          </section>`:``}

      <section class="section" aria-labelledby="types-title">
        <h2 class="section-title" id="types-title">${L(`plus.health.typesTitle`)}</h2>
        <div class="list">
          ${xl.map(t=>gd({name:`type-${t}`,label:L(`plus.health.types.${t}`),checked:e.types.includes(t),iconName:Pg[t]}))}
        </div>
      </section>

      <p class="disclaimer">${q(`shield`,{size:20})}<span>${L(`plus.health.privacy`)}</span></p>
      <div class="section">${X({label:L(`plus.health.disconnect`),variant:`outline`,iconName:`x`,action:`disconnect`,block:!0})}</div>`})}var zg={render(){return Dl()?F().health.connected?Rg():Ig():Fg()},mount(e){return xg(e)},onChange(e,t){if(!e.name?.startsWith(`type-`)||!F().health.connected)return;let n=e.name.slice(5),{types:r}=F().health;In(e.checked?[...new Set([...r,n])]:r.filter(e=>e!==n)),t.rerender()},actions:{async connect(e,t){let n=xl.filter(e=>document.getElementById(`f-type-${e}`)?.checked);e.disabled=!0;try{await Nl(n),t.rerender(),Q(L(`plus.health.connectedToast`))}catch(t){e.disabled=!1,Q(L(t.message===`unavailable`?`plus.health.errors.unavailable`:`plus.health.errors.denied`))}},async disconnect(e,t){await Nf({title:L(`plus.health.disconnectTitle`),text:[L(`plus.health.disconnectText`),L(`plus.health.revokeHint.${Ol()}`)],confirmLabel:L(`plus.health.disconnect`)})&&(Fn(),t.rerender(),Q(L(`plus.health.disconnectedToast`),kl()?{actionLabel:L(`plus.health.openSettings`),onAction:Al}:{}))}}},Bg=e=>Math.round(e*100);function Vg(e,t,n,r,i){return K`
    <div class="compare__row">
      <span class="compare__label">${e}</span>
      <span class="compare__value">${L(`plus.finder.ofDays`,{a:t,b:n})} · ${L(`plus.finder.percent`,{n:Bg(r)})}</span>
      <span class="bars__track" aria-hidden="true"><span class="bars__fill compare__fill--${i}" style="width:${Math.max(r*100,2)}%"></span></span>
    </div>`}function Hg(e){return K`
    <li class="finder-factor">
      <div class="finder-factor__head">
        ${q(e.icon,{size:22})}
        <h3 class="finder-factor__title">${L(`plus.finder.factors.${e.key}`)}</h3>
        <span class="strength strength--${e.strength}">${L(`plus.finder.strength.${e.strength}`)}</span>
      </div>
      ${e.strength===`few`?K`<p class="muted small">${L(`plus.finder.fewFactor`,{n:e.withDays})}</p>`:K`<div class="compare">
            ${Vg(L(`plus.finder.after`),e.withHard,e.withDays,e.rateWith,`with`)}
            ${Vg(L(`plus.finder.otherDays`),e.withoutHard,e.withoutDays,e.rateWithout,`without`)}
          </div>`}
    </li>`}var Ug={render(e){let t=Cu.includes(Number(e.query.days))?Number(e.query.days):180,n=Pu({days:t}),{weather:r,health:i}=F(),a=[r.enabled?null:{key:`weather`,href:`#/plus/weather`},i.connected?null:{key:`health`,href:`#/plus/health`}].filter(Boolean);return J({header:Y({back:`/insights`}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`plus.features.finder.title`)}</h1>
        <p class="screen-lead">${L(`plus.finder.lead`,{intensity:5})}</p>
        <p class="info-note">${q(`info`,{size:20})}<span>${L(`plus.finder.moreRecords`)}</span></p>
        <div class="insights-period">
          ${pd({name:`days`,legend:L(`insights.periodLabel`),selected:String(t),options:Cu.map(e=>({value:String(e),label:L(`plus.periods.d${e}`)}))})}
        </div>

        ${n.enough?K`
              ${F().demoEnabled&&r.enabled?K`<p class="plus-summary">${L(`plus.demoSymptoms`)}</p>`:``}
              <p class="plus-summary">${L(`plus.finder.summary`,{hard:Ur(`plural.hardDays`,n.hardDays),days:Ur(`plural.days`,n.trackedDays)})}</p>
              <ul class="finder-factors">${n.factors.map(Hg)}</ul>`:K`
              <div class="coming">
                ${q(`search`,{size:40})}
                <p class="muted">${L(`plus.finder.notEnough`,{days:Ur(`plural.days`,n.trackedDays),hard:Ur(`plural.hardDays`,n.hardDays)})}</p>
              </div>`}

        ${a.length?K`<section class="section" aria-labelledby="more-title">
              <h2 class="section-title" id="more-title">${L(`plus.finder.moreTitle`)}</h2>
              <div class="list">
                ${a.map(e=>K`
                    <a class="list__row" href="${e.href}">
                      ${q(e.key===`weather`?`gauge`:`watch`)}
                      <span class="list__text">
                        <span class="list__label">${L(`plus.features.${e.key}.title`)}</span>
                        <span class="list__hint">${L(`plus.finder.more.${e.key}`)}</span>
                      </span>
                      ${q(`chevronRight`,{size:20})}
                    </a>`)}
              </div>
            </section>`:``}

        ${n.logged.length?K`<section class="section" aria-labelledby="logged-title">
              <h2 class="section-title" id="logged-title">${L(`plus.finder.loggedTitle`)}</h2>
              <p class="muted small">${L(`plus.finder.loggedLead`)}</p>
              ${bh(n.logged.slice(0,6),up)}
            </section>`:``}

        <section class="section" aria-labelledby="how-title">
          <h2 class="section-title" id="how-title">${L(`plus.finder.howTitle`)}</h2>
          <p class="muted small">${L(`plus.finder.howText`)}</p>
        </section>

        <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`plus.finder.disclaimer`)}</span></p>
        ${F().forecast.enabled?``:K`<div class="section">${X({label:L(`plus.finder.toForecast`),iconName:`bellRing`,variant:`secondary`,action:`toForecast`,block:!0})}</div>`}`})},onChange(e,t){e.name===`days`&&(o(`/plus/finder?days=${e.value}`),t.rerender())},actions:{toForecast(){a(`/plus/forecast`)}}};async function Wg(){let e=await Zd();return e||Q(L(`notifications.denied`)),e}function Gg(){return J({header:Y({back:`/plus`}),body:K`
      ${vd(`bellRing`,{large:!0})}
      <h1 class="screen-title plus-after-badge" tabindex="-1">${L(`plus.features.forecast.title`)}</h1>
      <p class="screen-lead">${L(`plus.forecast.offLead`)}</p>
      <ul class="facts-list">${[[`gauge`,`plus.forecast.factWeather`],[`check`,`plus.forecast.factRecords`],[`bellRing`,`plus.forecast.factNotify`],[`x`,`plus.forecast.factOff`]].map(([e,t])=>K`<li>${q(e,{size:22})}<span>${L(t)}</span></li>`)}</ul>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`plus.forecast.disclaimer`)}</span></p>`,footer:X({label:L(`plus.forecast.enable`),iconName:`bellRing`,action:`enable`,block:!0})})}function Kg(e){return K`
    <li class="outlook-day">
      <div class="outlook-day__head">
        <span class="outlook-day__name">${Nd(e.date)}<span class="outlook-day__date">${Md(j(e.date))}</span></span>
        ${Vd(e.level)}
      </div>
      ${e.signals.length?K`<ul class="outlook-signals">
            ${e.signals.slice(0,2).map(e=>K`<li><strong>${Rd(e)}</strong> ${zd(e)}</li>`)}
          </ul>`:K`<p class="muted small">${L(`plus.forecast.calmText`)}</p>`}
    </li>`}function qg(e){return K`
    <section class="section" aria-labelledby="alerts-title">
      <h2 class="section-title" id="alerts-title">${L(`plus.forecast.alertsTitle`)}</h2>
      ${fd({name:`alerts`,type:`checkbox`,legend:L(`plus.forecast.alertsTitle`),options:Fu.map(e=>({value:e,label:L(`plus.forecast.alerts.${e}`)})),selected:e})}
      ${e.length?``:K`<p class="plus-summary">${L(`plus.forecast.alertsNone`)}</p>`}
    </section>`}function Jg(){let{forecast:e,weather:t,demoEnabled:n}=F(),r=Lu(),i=r.next,a=i?Bd(i):null;return J({header:Y({back:`/plus`}),body:K`
      <h1 class="screen-title" tabindex="-1">${L(`plus.features.forecast.title`)}</h1>
      <p class="screen-lead">${L(`plus.forecast.lead`)}</p>

      ${t.enabled?``:K`<a class="list section-sm plus-prompt" href="#/plus/weather">
            <span class="list__row">
              ${q(`gauge`)}
              <span class="list__text">
                <span class="list__label">${L(`plus.forecast.weatherOff`)}</span>
                <span class="list__hint">${L(`plus.forecast.weatherOffHint`)}</span>
              </span>
              ${q(`chevronRight`,{size:20})}
            </span>
          </a>`}
      ${t.enabled&&!xr()?K`<p class="plus-summary">${L(`plus.forecast.staleForecast`)}</p>`:``}
      ${n&&t.enabled?K`<p class="plus-summary">${L(`plus.demoSymptoms`)}</p>`:``}

      <ul class="outlook-days">${r.days.map(Kg)}</ul>

      ${qg(e.alerts)}

      <section class="section" aria-labelledby="notify-title">
        <h2 class="section-title" id="notify-title">${L(`plus.forecast.notifyTitle`)}</h2>
        <div class="list">
          ${gd({name:`notify`,label:L(`plus.forecast.notify`),hint:L(`plus.forecast.notifyHint`),checked:e.notify,iconName:`bell`})}
          ${e.notify?K`<div class="list__field">${Z({label:L(`plus.forecast.notifyTime`),name:`notifyTime`,type:`time`,value:e.time})}</div>`:``}
        </div>
        ${e.notify&&!a&&e.alerts.length?K`<p class="plus-summary">${L(`plus.forecast.nothingToNotify`)}</p>`:``}
        ${e.notify&&a?K`<div class="notif-preview">
              <p class="notif-preview__label">${L(`plus.forecast.previewLabel`)}</p>
              <div class="notif">
                <span class="notif__head">${q(`bellRing`,{size:18})}<strong>${L(`app.name`)}</strong><span>${e.time}</span></span>
                <strong class="notif__title">${L(`plus.forecast.cardTitle`,{day:Nd(i.date)})}</strong>
                <span>${Rd(a)}</span>
              </div>
            </div>`:``}
      </section>

      <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`plus.forecast.disclaimer`)}</span></p>
      <div class="section">${X({label:L(`plus.forecast.disable`),variant:`outline`,iconName:`x`,action:`disable`,block:!0})}</div>`})}var Yg={render(){return F().forecast.enabled?Jg():Gg()},async onChange(e,t){if(e.name===`alerts`){let e=new Set([...document.querySelectorAll(`input[name="alerts"]:checked`)].map(e=>e.value));Rn({alerts:Fu.filter(t=>e.has(t))}),nf(),t.rerender()}if(e.name===`notify`){let n=e.checked&&await Wg();Rn({notify:n}),nf(),t.rerender(),n&&el(document.querySelector(`.notif-preview`))}e.name===`notifyTime`&&e.value&&(Rn({time:e.value}),nf(),t.rerender())},actions:{async enable(e,t){Rn({enabled:!0,notify:F().forecast.notify&&await Wg()}),nf(),t.rerender(),F().weather.enabled||Q(L(`plus.forecast.weatherOff`))},disable(){Rn({enabled:!1}),nf(),a(`/plus`,{replace:!0})}}};function Xg(e,t,n){if(e==null||t==null)return L(`plus.stats.noCompare`);let r=e-t;return Math.abs(r)<.05?L(`plus.stats.same`):L(r<0?`plus.stats.less`:`plus.stats.more`,{value:n(Math.abs(r))})}function Zg(e){let{current:t,previous:n}=Ru(e),r=e=>String(Math.round(e)),i=[{key:`symptomDays`,now:t.symptomDays,before:n.symptomDays,format:r},{key:`episodes`,now:t.episodeCount,before:n.episodeCount,format:r},{key:`avgIntensity`,now:t.avgIntensity,before:n.avgIntensity,format:Uf},{key:`avgDuration`,now:t.avgDurationMinutes,before:n.avgDurationMinutes,format:Gf}];return K`
    <section class="section" aria-labelledby="cmp-title">
      <h2 class="section-title" id="cmp-title">${L(`plus.stats.compareTitle`)}</h2>
      <p class="muted small">${L(`plus.stats.compareLead`,{days:Ur(`plural.days`,e)})}</p>
      <ul class="compare-list">
        ${i.map(e=>{let t=e.now==null||e.before==null||Math.abs(e.now-e.before)<.05?`minus`:e.now<e.before?`arrowDown`:`arrowUp`;return K`
            <li class="compare-item">
              <span class="compare-item__label">${L(`insights.${e.key}`)}</span>
              <span class="compare-item__value${e.now==null?` compare-item__value--empty`:``}">${e.now==null?L(`insights.noValue`):e.format(e.now)}</span>
              <span class="compare-item__trend">${q(t,{size:16})}${Xg(e.now,e.before,e.format)}</span>
            </li>`})}
      </ul>
    </section>`}function Qg(){let e=zu(12),t=new Intl.DateTimeFormat(zr(),{month:`narrow`}),n=e.map(e=>({label:t.format(e.month),value:e.symptomDays,readout:`${Hf(e.month)} · ${L(`plus.stats.symptomDaysValue`,{n:e.symptomDays})} · ${Ur(`plural.episodes`,e.episodes)}`}));return K`
    <section class="section" aria-labelledby="trend-title">
      <h2 class="section-title" id="trend-title">${L(`plus.stats.trendTitle`)}</h2>
      ${vg({items:n,label:L(`plus.stats.trendLabel`),table:yg({head:[L(`plus.stats.colMonth`),L(`insights.symptomDays`),L(`insights.episodes`)],rows:[...e].reverse().map(e=>[Hf(e.month),e.symptomDays,e.episodes])})})}
    </section>`}function $g(e){let{grid:t,total:n}=Hu(e);if(n<3)return``;let r=new Date(2024,0,1),i=new Intl.DateTimeFormat(zr(),{weekday:`short`}),a=Array.from({length:7},(e,t)=>{let n=i.format(M(r,t)).replace(`.`,``);return n.charAt(0).toLocaleUpperCase(zr())+n.slice(1)});return K`
    <section class="section" aria-labelledby="rhythm-title">
      <h2 class="section-title" id="rhythm-title">${L(`plus.stats.rhythmTitle`)}</h2>
      <p class="muted small">${L(`plus.stats.rhythmLead`,{n:Ur(`plural.episodes`,n)})}</p>
      ${bg({grid:t,rowLabels:a,colLabels:Bu.map(e=>L(`plus.stats.parts.${e}`)),label:L(`plus.stats.rhythmTitle`)})}
    </section>`}function e_(e){if(F().cycleTracking!==!0)return``;let{items:t,total:n,starts:r}=Uu(e);if(n<3||r<2)return``;let i=e=>e===0?L(`plus.stats.cycleStart`):L(`plus.stats.cycleOffset`,{n:e>0?`+${e}`:`−${Math.abs(e)}`}),a=t.map(e=>({label:e.offset===0?`1.`:e.offset>0?`+${e.offset}`:`−${Math.abs(e.offset)}`,value:e.count,readout:`${i(e.offset)} · ${Ur(`plural.episodes`,e.count)}`}));return K`
    <section class="section" aria-labelledby="cycle-title">
      <h2 class="section-title" id="cycle-title">${L(`plus.stats.cycleTitle`)}</h2>
      <p class="muted small">${L(`plus.stats.cycleLead`,{n:r})}</p>
      ${vg({items:a,selected:t.findIndex(e=>e.offset===0),label:L(`plus.stats.cycleTitle`),table:yg({head:[L(`plus.stats.colCycleDay`),L(`insights.episodes`)],rows:t.map(e=>[i(e.offset),e.count])})})}
    </section>`}function t_(e){let{relief:t,impact:n}=Wu(e);return K`
    ${t.length?K`<section class="section" aria-labelledby="relief-title">
          <h2 class="section-title" id="relief-title">${L(`plus.stats.reliefTitle`)}</h2>
          ${bh(t.slice(0,5),fp)}
        </section>`:``}
    ${n.length?K`<section class="section" aria-labelledby="impact-title">
          <h2 class="section-title" id="impact-title">${L(`plus.stats.impactTitle`)}</h2>
          ${bh(n.slice(0,5),pp)}
        </section>`:``}`}function n_(){let e=Ku();if(!e.length)return``;let t=e=>L(`plus.stats.medValue`,{days:Uf(e.symptomDays),episodes:Uf(e.episodes)});return K`
    <section class="section" aria-labelledby="med-title">
      <h2 class="section-title" id="med-title">${L(`plus.stats.medTitle`)}</h2>
      <p class="muted small">${L(`plus.stats.medLead`)}</p>
      <ul class="med-timeline">
        ${e.map(e=>K`
            <li class="med-timeline__item">
              <span class="med-timeline__name">${e.medication.name}</span>
              <span class="muted small">${L(`plus.stats.medSince`,{date:Vf(j(e.start)),days:Ur(`plural.days`,e.window)})}</span>
              <dl class="med-timeline__facts">
                <div><dt>${L(`plus.stats.medBefore`)}</dt><dd>${t(e.before)}</dd></div>
                <div><dt>${L(`plus.stats.medAfter`)}</dt><dd>${t(e.after)}</dd></div>
              </dl>
            </li>`)}
      </ul>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`plus.stats.medDisclaimer`)}</span></p>
    </section>`}n(`/start/language`,pf),n(`/start/welcome`,mf),n(`/start/privacy`,zh({onboarding:!0})),n(`/start/goals`,yf),n(`/start/condition`,Sf),n(`/start/cycle`,Tf),n(`/start/medications`,Of),n(`/start/medications/new`,Ff({returnTo:`/start/medications`})),n(`/start/reminders`,Af),n(`/start/profile`,Hh),n(`/consent`,zh({onboarding:!1})),n(`/privacy-policy`,Bh),n(`/security/pin`,$h),n(`/lock`,ng),n(`/today`,Sm),n(`/episode/:id`,Dm),n(`/episode/:id/details/:step`,mm),n(`/log/symptoms`,Jm),n(`/log/intensity`,Xm),n(`/log/details`,eh),n(`/symptom/:id`,nh),n(`/calendar`,vh),n(`/insights`,Sh),n(`/report`,Ch),n(`/report/view`,Oh),n(`/sleep`,Nh),n(`/treatment`,ah),n(`/treatment/new`,Ff({returnTo:`/treatment`})),n(`/treatment/:id`,lh),n(`/treatment/:id/edit`,Ff({returnTo:e=>`/treatment/${e.params.id}`})),n(`/treatment/:id/intake`,dh({mode:`new`})),n(`/intake/:id`,dh({mode:`edit`})),n(`/medication-intake`,Am),n(`/profile`,Fm),n(`/backup`,Hm),n(`/styleguide`,Gm),n(`/plus`,pg),n(`/plus/weather`,Ng),n(`/plus/health`,zg),n(`/plus/finder`,Ug),n(`/plus/forecast`,Yg),n(`/plus/stats`,{render(e){let t=wu.includes(Number(e.query.days))?Number(e.query.days):180,n=du(t);return mu(du(365)).recordCount?J({header:Y({back:`/insights`}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`plus.features.stats.title`)}</h1>
        <div class="insights-period">
          ${pd({name:`days`,legend:L(`insights.periodLabel`),selected:String(t),options:wu.map(e=>({value:String(e),label:L(`plus.periods.d${e}`)}))})}
        </div>
        ${Zg(t)}
        ${Qg()}
        ${$g(n)}
        ${e_(n)}
        ${t_(n)}
        ${n_()}
        <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`insights.interpretation`)}</span></p>`}):J({header:Y({back:`/insights`}),body:K`
          <h1 class="screen-title" tabindex="-1">${L(`plus.features.stats.title`)}</h1>
          <div class="coming">
            ${q(`chart`,{size:40})}
            <p class="muted">${L(`plus.stats.empty`)}</p>
          </div>`})},mount(e){return xg(e)},onChange(e,t){e.name===`days`&&(o(`/plus/stats?days=${e.value}`),t.rerender())}});var r_=[`/privacy-policy`,`/security/pin`];function i_(e){return hl()?e===`/lock`?`/today`:e===`/styleguide`?null:F().language?Rt()?e===`/`||e.startsWith(`/start/`)?`/today`:Ih()?e.startsWith(`/log/`)&&!Np()?`/today`:e.startsWith(`/plus/`)&&!I()?`/plus?from=${e.split(`/`)[2]}`:null:e===`/consent`||e===`/privacy-policy`?null:`/consent`:e.startsWith(`/start/`)||r_.includes(e)?null:`/start/welcome`:e===`/start/language`?null:`/start/language`:(vl(e),e===`/lock`?null:`/lock`)}var a_=document.getElementById(`app`),o_=null;function s_({navigation:e=!0}={}){let{path:t,query:n}=r(),o=i_(t);if(o)return a(o,{replace:!0});let s=i(t);if(!s)return a(`/today`,{replace:!0});let c=e?null:document.activeElement?.id,l=e?0:a_.querySelector(`.screen__body`)?.scrollTop??0;o_?.cleanup?.();let u=document.getElementById(`dialog`);e&&u.open&&u.close();let d={params:s.params,query:n,rerender:()=>s_({navigation:!1})};a_.innerHTML=String(s.screen.render(d)),o_={screen:s.screen,ctx:d,cleanup:s.screen.mount?.(a_,d)};let f=a_.querySelector(`.screen__body`);f&&(f.scrollTop=l),e?(a_.querySelector(`.screen-title`)?.focus({preventScroll:!0}),Qc(a_)):c&&document.getElementById(c)?.focus({preventScroll:!0}),e&&d_()}var c_=[`/today`,`/calendar`,`/profile`,`/plus`,`/plus/weather`,`/plus/health`,`/plus/forecast`],l_=!1,u_=!1;async function d_(){if(l_||!hl()||!Rt())return;l_=!0;let e=await iu(),[t,n]=I()?await Promise.all([br(),Pl()]):[!1,!1];l_=!1,hl()&&((!u_||e||t)&&(u_=!0,rf()),(e||t||n)&&c_.includes(r().path)&&s_({navigation:!1}))}var f_={back:e=>s(e.dataset.fallback||`/today`),startEpisode:()=>{a(`/episode/${pn().id}?new=1`)}};a_.addEventListener(`click`,e=>{let t=e.target.closest(`a[target="_blank"]`);if(t&&Ae()){e.preventDefault(),Ne(t.href);return}let n=e.target.closest(`a[href^="#/"]`);if(n){e.preventDefault(),a(n.getAttribute(`href`).slice(1),{replace:n.hasAttribute(`data-replace`)});return}let r=e.target.closest(`[data-action]`);if(!r||!o_)return;let i=o_.screen.actions?.[r.dataset.action]??f_[r.dataset.action];i&&(e.preventDefault(),i(r,o_.ctx,e))}),a_.addEventListener(`submit`,e=>{e.preventDefault(),o_?.screen.onSubmit?.(e.target,o_.ctx,e)}),a_.addEventListener(`change`,e=>{e.target.matches(`.option input`)&&$c(e.target),o_?.screen.onChange?.(e.target,o_.ctx,e)}),a_.addEventListener(`input`,e=>{hd(e.target),o_?.screen.onInput?.(e.target,o_.ctx,e)});var p_=0;function m_(){gl(r().path),a(`/lock`,{replace:!0})}function h_(e){if(e&&d_(),dl()){p_=0;return}if(!tt()||!hl())return;let t=F().autoLockMinutes??1;e?p_&&Date.now()-p_>=t*6e4?m_():p_=0:(p_=Date.now(),t===0&&m_())}document.addEventListener(`visibilitychange`,()=>h_(!document.hidden));var g_=[`/today`,`/lock`,`/consent`,`/start/language`];function __(){let e=document.getElementById(`dialog`);e.open?e.close():g_.includes(r().path)?cu.exitApp():s(`/today`)}Ae()&&(cu.addListener(`appStateChange`,({isActive:e})=>h_(e)),cu.addListener(`backButton`,__));async function v_(){await Qe(),ml(),history.state||history.replaceState({index:0},``,location.href),c(()=>s_()),Le()}v_();export{h as n,S as r,Ee as t};