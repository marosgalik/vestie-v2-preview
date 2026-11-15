(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[],t=()=>{};function n(t,n){let r=[],i=t.replace(/:(\w+)/g,(e,t)=>(r.push(t),`([^/]+)`));e.push({regex:RegExp(`^${i}$`),keys:r,screen:n})}function r(){let[e,t=``]=(location.hash.slice(1)||`/`).split(`?`);return{path:e,query:Object.fromEntries(new URLSearchParams(t))}}function i(t){for(let n of e){let e=n.regex.exec(t);if(e){let t=Object.fromEntries(n.keys.map((t,n)=>[t,decodeURIComponent(e[n+1])]));return{screen:n.screen,params:t}}}return null}function a(e,{replace:n=!1}={}){let r=history.state?.index??0;n?history.replaceState({index:r},``,`#${e}`):history.pushState({index:r+1},``,`#${e}`),t()}function o(e){history.replaceState(history.state,``,`#${e}`)}function s(e){(history.state?.index??0)>0?history.back():a(e,{replace:!0})}function c(e){t=e,window.addEventListener(`popstate`,()=>e()),e()}var l;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(l||={});var u=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},d=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,f=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?d(e):t.name,a=()=>i()!==`web`,o=e=>!!(f.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),f=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=f.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),d=s(e),p,m=async()=>(!p&&c in a?p=p=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!p&&`web`in a&&(p=p=typeof a.web==`function`?await a.web():a.web),p),h=(t,r)=>{if(d){let i=d?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new u(`"${e}" plugin is not implemented on ${c}`,l.Unimplemented)},g=t=>{let n,r=(...r)=>{let i=m().then(i=>{let a=h(i,t);if(a){let e=a(...r);return n=e?.remove,e}throw new u(`"${e}.${t}()" is not implemented on ${c}`,l.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,"name",{value:t,writable:!1,configurable:!1}),r},_=g(`addListener`),v=g(`removeListener`),y=(e,t)=>{let n=_({eventName:e},t),r=async()=>{let r=await n;v({eventName:e,callbackId:r},t)},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},b=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return d?y:_;case`removeListener`:return v;default:return g(t)}}});return r[e]=b,f.set(e,{name:e,proxy:b,platforms:new Set([...Object.keys(a),...d?[c]:[]])}),b},n.Exception=u,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},p=(e=>e.Capacitor=f(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),m=p.registerPlugin,h=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new p.Exception(e,l.Unimplemented)}unavailable(e=`not available`){return new p.Exception(e,l.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},g=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),_=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),v=class extends h{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=_(n).trim(),r=_(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=g(e.key),n=g(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};m(`CapacitorCookies`,{web:()=>new v});var y=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),b=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},x=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,S=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=b(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},C=class extends h{async request(e){let t=S(e,e.webFetchExtra),n=x(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await y(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};m(`CapacitorHttp`,{web:()=>new C});var w;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(w||={});var T;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(T||={});var E=class extends h{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};m(`SystemBars`,{web:()=>new E});var D=`modulepreload`,ee=function(e,t){return new URL(e,t).href},te={},O=function(e){return e.pathname.endsWith(`.css`)},ne=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},k=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=ee(t,n);let r=s(t),i=O(r);return ne(te,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:D,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},re=m(`Preferences`,{web:()=>k(()=>import(`./web-Ckn1rnRL.js`).then(e=>new e.PreferencesWeb),[],import.meta.url)}),ie=new TextEncoder,ae=new TextDecoder,oe=6e5;function se(e){let t=new Uint8Array(e),n=``;for(let e=0;e<t.length;e+=32768)n+=String.fromCharCode(...t.subarray(e,e+32768));return btoa(n)}var ce=e=>Uint8Array.from(atob(e),e=>e.charCodeAt(0)),le=e=>crypto.getRandomValues(new Uint8Array(e)),ue=()=>se(le(16));async function de(e,t,n=oe){let r=await crypto.subtle.importKey(`raw`,ie.encode(e),`PBKDF2`,!1,[`deriveKey`]);return crypto.subtle.deriveKey({name:`PBKDF2`,salt:ce(t),iterations:n,hash:`SHA-256`},r,{name:`AES-GCM`,length:256},!1,[`wrapKey`,`unwrapKey`])}var fe=()=>crypto.subtle.generateKey({name:`AES-GCM`,length:256},!0,[`encrypt`,`decrypt`]);async function pe(e,t){let n=le(12),r=await crypto.subtle.wrapKey(`raw`,e,t,{name:`AES-GCM`,iv:n});return{iv:se(n),key:se(r)}}function me(e,t){return crypto.subtle.unwrapKey(`raw`,ce(e.key),t,{name:`AES-GCM`,iv:ce(e.iv)},{name:`AES-GCM`,length:256},!0,[`encrypt`,`decrypt`])}async function he(e,t){let n=le(12),r=await crypto.subtle.encrypt({name:`AES-GCM`,iv:n},t,ie.encode(JSON.stringify(e)));return{enc:1,iv:se(n),data:se(r)}}async function ge(e,t){let n=await crypto.subtle.decrypt({name:`AES-GCM`,iv:ce(e.iv)},t,ce(e.data));return JSON.parse(ae.decode(n))}async function _e(e,t,n){let r=await crypto.subtle.importKey(`raw`,ie.encode(e),`PBKDF2`,!1,[`deriveKey`]);return crypto.subtle.deriveKey({name:`PBKDF2`,salt:ce(t),iterations:n,hash:`SHA-256`},r,{name:`AES-GCM`,length:256},!1,[`encrypt`,`decrypt`])}async function ve(e,t){let n=ue(),r=await _e(t,n,oe);return{kdf:{name:`PBKDF2-SHA-256`,salt:n,iterations:oe},cipher:{name:`AES-256-GCM`,...await he(e,r)}}}async function ye({kdf:e,cipher:t},n){return ge(t,await _e(n,e.salt,e.iterations))}var be=`support@vestibularnamigrena.sk`,xe={facebook:`https://www.facebook.com/groups/3261623930593764`,instagram:`https://www.instagram.com/vestibularnamigrena/`,discord:`https://discord.gg/AMz5vd5HRr`,web:`https://www.vestibularnamigrena.sk/`},Se=m(`Browser`,{web:()=>k(()=>import(`./web-DuX-z2qZ.js`).then(e=>new e.BrowserWeb),[],import.meta.url)});function Ce(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,n){return new Proxy({},{get(t,r){return(t,i,a)=>{let o=e.Capacitor.Plugins[n];o===void 0?a(Error(`Capacitor plugin ${n} not found`)):typeof o[r]==`function`?(async()=>{try{i(await o[r](t))}catch(e){a(e)}})():a(Error(`Method ${r} not found in Capacitor plugin ${n}`))}}})}})}function we(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,n){return e.cordova.plugins[n]}})}function Te(e=!1){typeof window>`u`||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?Ce(window):window.cordova!==void 0&&we(window))}var Ee;(function(e){e.Documents=`DOCUMENTS`,e.Data=`DATA`,e.Library=`LIBRARY`,e.Cache=`CACHE`,e.External=`EXTERNAL`,e.ExternalStorage=`EXTERNAL_STORAGE`,e.ExternalCache=`EXTERNAL_CACHE`,e.LibraryNoCloud=`LIBRARY_NO_CLOUD`,e.Temporary=`TEMPORARY`})(Ee||={});var De;(function(e){e.UTF8=`utf8`,e.ASCII=`ascii`,e.UTF16=`utf16`})(De||={});var Oe=m(`Filesystem`,{web:()=>k(()=>import(`./web-B8fvHHJE.js`).then(e=>new e.FilesystemWeb),[],import.meta.url)});Te();var ke=m(`PrivacyScreen`,{web:()=>k(()=>import(`./web-CuWXBIfc-C8P0rjF1.js`).then(e=>new e.PrivacyScreenWeb),[],import.meta.url)}),Ae=m(`Share`,{web:()=>k(()=>import(`./web-DT6N4J3D.js`).then(e=>new e.ShareWeb),[],import.meta.url)}),je=()=>p.isNativePlatform(),Me=m(`VestiePrint`),Ne=m(`VestieLocation`),Pe=`vestie-`,Fe=()=>p.getPlatform()===`android`;async function Ie({ask:e=!0}={}){try{return await Ne.getCurrentPosition({ask:e})}catch(e){throw Error(e?.code===`DENIED`?`denied`:`unavailable`)}}function Le(e){return Se.open({url:e})}async function Re(e){je()?await Me.print({name:e}):window.print()}async function ze(e,t){let{uri:n}=await Oe.writeFile({path:`${Pe}${e}`,data:t,directory:Ee.Cache,encoding:De.UTF8});try{return await Ae.share({files:[n]}),!0}catch{return!1}}async function Be(e,t,n=`application/json`){if(je())return ze(e,t);let r=URL.createObjectURL(new Blob([t],{type:n})),i=document.createElement(`a`);return i.href=r,i.download=`${Pe}${e}`,document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3),!0}async function Ve(){if(je())try{let{files:e}=await Oe.readdir({path:``,directory:Ee.Cache}),t=e.filter(e=>e.name.startsWith(Pe));await Promise.all(t.map(e=>Oe.deleteFile({path:e.name,directory:Ee.Cache})))}catch(e){console.error(`[native] Dočasné súbory sa nepodarilo vymazať`,e)}}function He(e){return new Promise(t=>{let n=document.createElement(`input`);n.type=`file`,n.accept=e,n.addEventListener(`change`,()=>t(n.files[0]??null),{once:!0}),n.addEventListener(`cancel`,()=>t(null),{once:!0}),n.click()})}async function Ue(e){if(je())try{e?await ke.enable():await ke.disable()}catch(e){console.error(`[native] Ochranu obrazovky sa nepodarilo nastaviť`,e)}}var We=`vm2:data`,Ge=`vm2:lock`,Ke=5,qe=3e4,Je=9e5,Ye=null,Xe=Promise.resolve(),Ze=new Map;function Qe(e){return je()?Ze.get(e)??null:localStorage.getItem(e)}function $e(e){e().catch(e=>console.error(`[storage] Dáta sa nepodarilo uložiť`,e))}function et(e,t){je()?(Ze.set(e,t),$e(()=>re.set({key:e,value:t}))):localStorage.setItem(e,t)}function tt(e){je()?(Ze.delete(e),$e(()=>re.remove({key:e}))):localStorage.removeItem(e)}async function nt(){if(je())for(let e of[We,Ge]){let{value:t}=await re.get({key:e}),n=t===null?localStorage.getItem(e):null;n!==null&&(await re.set({key:e,value:n}),localStorage.removeItem(e));let r=t??n;r!==null&&Ze.set(e,r)}await Ue(at())}function rt(e){try{let t=Qe(e);return t?JSON.parse(t):null}catch(e){return console.error(`[storage] Dáta sa nepodarilo načítať`,e),null}}function it(e,t){try{et(e,JSON.stringify(t))}catch(e){console.error(`[storage] Dáta sa nepodarilo uložiť`,e)}}var at=()=>!!rt(Ge),ot=()=>!at()||!!Ye,st=()=>rt(Ge)?.language??null,ct=()=>rt(Ge)?.theme??null;function lt({language:e,theme:t}){let n=rt(Ge);n&&it(Ge,{...n,...e?{language:e}:{},...t?{theme:t}:{}})}var ut=()=>rt(Ge)?.blockedUntil??0;function dt(e){let t=(e.failed??0)+1,n=t-Ke,r=n>=0?Date.now()+Math.min(qe*2**n,Je):0;return it(Ge,{...e,failed:t,blockedUntil:r}),{failed:t,blockedUntil:r,remaining:Math.max(Ke-t,0)}}var ft=class extends Error{constructor(e,t={}){super(e),this.code=e,Object.assign(this,t)}};async function pt(e){let t=rt(Ge);if(!t)throw new ft(`wrong`);if(t.blockedUntil&&t.blockedUntil>Date.now())throw new ft(`blocked`,{blockedUntil:t.blockedUntil});try{let n=await de(e,t.salt,t.iterations),r=await me(t.wrapped,n);return it(Ge,{...t,failed:0,blockedUntil:0}),r}catch{throw new ft(`wrong`,dt(rt(Ge)))}}function mt(){if(at())return null;let e=rt(We);return e?.enc?null:e}function ht(e){if(!at()){it(We,e);return}if(!Ye)return;let t=he(e,Ye);Xe=Xe.then(()=>t).then(e=>it(We,e)).catch(e=>console.error(`[storage] Dáta sa nepodarilo zašifrovať`,e))}async function gt(e){let t=await pt(e),n=rt(We),r=n?.enc?await ge(n,t):n;return Ye=t,r}async function _t(e){return await pt(e),!0}async function vt(e,t,{language:n,theme:r}={}){let i=ue(),a=await de(e,i),o=await fe(),s=await pe(o,a),c=await he(t,o);await Xe,it(Ge,{v:1,salt:i,iterations:oe,wrapped:s,language:n,theme:r,failed:0,blockedUntil:0}),it(We,c),Ye=o,await Ue(!0)}async function yt(e){let t=rt(Ge);if(!t||!Ye)return;let n=ue(),r=await de(e,n),i=await pe(Ye,r);it(Ge,{...t,salt:n,iterations:oe,wrapped:i,failed:0,blockedUntil:0})}async function bt(e){await Xe,it(We,e),tt(Ge),Ye=null,await Ue(!1)}function xt(){Ye=null}function St(){Ye=null;try{tt(We),tt(Ge)}catch(e){console.error(`[storage] Dáta sa nepodarilo vymazať`,e)}Ue(!1)}var Ct=e=>String(e).padStart(2,`0`);function A(e=new Date){let t=new Date(e);return`${t.getFullYear()}-${Ct(t.getMonth()+1)}-${Ct(t.getDate())}`}function j(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function wt(e=new Date){let t=new Date(e);return`${Ct(t.getHours())}:${Ct(t.getMinutes())}`}function Tt(e,t=`12:00`){let n=j(e),[r,i]=t.split(`:`).map(Number);return n.setHours(r||0,i||0,0,0),n.toISOString()}function M(e,t){let n=new Date(e);return n.setDate(n.getDate()+t),n}var Et=(e,t)=>A(e)===A(t),Dt=e=>Et(e,new Date),Ot=(e=new Date)=>A(e).slice(0,7);function kt(e){let[t,n]=e.split(`-`).map(Number);return new Date(t,n-1,1)}function At(e,t){let n=kt(e);return n.setMonth(n.getMonth()+t),Ot(n)}function jt(e,t){let n=[];for(let r=j(e);A(r)<=t;r=M(r,1))n.push(A(r));return n}var Mt=1;function Nt(){return{schemaVersion:Mt,settings:{language:null,onboardingCompletedAt:null,name:``,nameSetAt:null,goals:[],condition:null,cycleTracking:null,reminder:{enabled:!1,time:`20:00`},theme:`system`,demoSeededAt:null,demoEnabled:!0,consent:null,autoLockMinutes:1,plus:{active:!1,plan:null,startedAt:null,trialEndsAt:null,simulated:!1,storeLinked:!1,orderId:null},weather:{enabled:!1,source:null,lat:null,lon:null,placeLabel:``,consentAt:null,updatedAt:null},health:{connected:!1,provider:null,types:[],consentAt:null,lastSyncAt:null},forecast:{enabled:!1,notify:!0,time:`19:00`,alerts:[`pressure_drop`]},backup:{lastAt:null,remind:!0,snoozedUntil:null}},medications:[],medicationIntakes:[],episodes:[],symptomLogs:[],sleepLogs:[],cycleEntries:[],customSymptoms:[],customTriggers:[],weatherDays:[],healthDays:[]}}function Pt(e){let t=Nt();if(!e)return t;let n={...t,...e,schemaVersion:Mt,settings:{...t.settings,...e.settings}};return n.weatherDays=n.weatherDays.filter(e=>e.source!==`demo`),n.healthDays=n.healthDays.filter(e=>!String(e.id).startsWith(`demo-`)),n.sleepLogs=n.sleepLogs.map(e=>String(e.id).startsWith(`demo-`)?{...e,source:`manual`,bedtime:null,wakeTime:null,externalId:null}:e),n.settings.weather.source===`demo`&&(n.settings.weather=t.settings.weather),n.settings.health.simulated&&(n.settings.health=t.settings.health),n.healthDays=n.healthDays.map(({restingHr:e,...t})=>t),n.settings.health={...n.settings.health,types:(n.settings.health.types??[]).filter(e=>e!==`restingHr`)},n.settings.forecast={...t.settings.forecast,...n.settings.forecast},n}var N=Nt();function Ft(e){N=Pt(e)}function It(){N=Nt()}function P(){ht(N)}var Lt=()=>globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`,Rt=()=>new Date().toISOString();function zt(e){let t=Rt();return{id:Lt(),createdAt:t,updatedAt:t,...e}}var Bt=e=>(t,n)=>n[e].localeCompare(t[e]),F=()=>N.settings;function Vt(e){N.settings={...N.settings,...e},P()}var Ht=()=>!!N.settings.onboardingCompletedAt;function Ut(){Vt({onboardingCompletedAt:Rt()})}var Wt=()=>N.medications,Gt=e=>N.medications.find(t=>t.id===e)??null;function Kt({name:e=``,type:t,dose:n=``,frequency:r=``,note:i=``,startDate:a=null,endDate:o=null}){return{name:String(e).trim(),type:t===`acute`?`acute`:`preventive`,dose:String(n).trim(),frequency:String(r).trim(),note:String(i).trim(),startDate:a||null,endDate:o||null}}function qt(e){let t=zt(Kt(e));return N.medications.push(t),P(),t}function Jt(e,t){let n=Gt(e);return n?(Object.assign(n,Kt({...n,...t}),{updatedAt:Rt()}),P(),n):null}function Yt(e){let t={medication:Gt(e),intakes:N.medicationIntakes.filter(t=>t.medicationId===e)};return N.medications=N.medications.filter(t=>t.id!==e),N.medicationIntakes=N.medicationIntakes.filter(t=>t.medicationId!==e),P(),t}function Xt(e){e?.medication&&!Gt(e.medication.id)&&(N.medications.push(e.medication),N.medicationIntakes.push(...e.intakes),P())}function Zt(e){return N.medicationIntakes.filter(t=>!e||t.medicationId===e).sort(Bt(`takenAt`))}var Qt=e=>N.medicationIntakes.find(t=>t.id===e)??null;function $t(e){return N.episodes.find(t=>t.startedAt<=e&&(!t.endedAt||t.endedAt>=e))??null}function en({medicationId:e,takenAt:t,dose:n=``,effect:r=null,note:i=``}){return{medicationId:e,takenAt:t,dose:String(n).trim(),effect:r||null,note:String(i).trim(),episodeId:$t(t)?.id??null}}function tn(e){let t=zt(en(e));return N.medicationIntakes.push(t),P(),t}function nn(e,t){let n=Qt(e);return n?(Object.assign(n,en({...n,...t}),{updatedAt:Rt()}),P(),n):null}function rn(e){let t=Qt(e);return N.medicationIntakes=N.medicationIntakes.filter(t=>t.id!==e),P(),t}function an(e){e&&!Qt(e.id)&&(N.medicationIntakes.push(e),P())}var on=e=>N.symptomLogs.find(t=>t.id===e)??null,sn=e=>N.symptomLogs.filter(t=>t.episodeId===e).sort(Bt(`occurredAt`));function cn({id:e,occurredAt:t,symptoms:n,vertigoType:r=null,duration:i=null,note:a=``,episodeId:o=null}){let s={occurredAt:t,symptoms:n.map(({key:e,intensity:t})=>({key:e,intensity:t??null})),vertigoType:r,duration:i,note:String(a).trim(),episodeId:o},c=e?on(e):null;if(c)return Object.assign(c,s,{updatedAt:Rt()}),P(),c;let l=zt(s);return N.symptomLogs.push(l),P(),l}function ln(e){let t=on(e);return N.symptomLogs=N.symptomLogs.filter(t=>t.id!==e),P(),t}function un(e){e&&!on(e.id)&&(N.symptomLogs.push(e),P())}function dn(e){let t=e.symptoms.map(e=>e.intensity).filter(e=>e!=null);return t.length?Math.max(...t):null}var fn=()=>N.customSymptoms,pn=e=>N.customSymptoms.find(t=>t.key===e)??null;function mn(e){let t=String(e).trim().slice(0,40);if(!t)return null;let n=N.customSymptoms.find(e=>e.label.toLocaleLowerCase()===t.toLocaleLowerCase());if(n)return n;let r={key:`custom:${Lt()}`,label:t,createdAt:Rt()};return N.customSymptoms.push(r),P(),r}var hn=e=>N.episodes.find(t=>t.id===e)??null;function gn(){return N.episodes.filter(e=>!e.endedAt).sort(Bt(`startedAt`))[0]??null}function _n(){let e=zt({startedAt:Rt(),endedAt:null,type:null,intensity:null,symptoms:[],vertigoTypes:[],triggers:[],triggerOther:``,medicationIntakeIds:[],helped:null,relief:[],reliefOther:``,impact:[],impactOther:``,note:``});return N.episodes.push(e),P(),e}function vn(e,t){let n=hn(e);return n?(Object.assign(n,t,{updatedAt:Rt()}),P(),n):null}var yn=e=>vn(e,{endedAt:Rt()}),bn=(e,t)=>vn(e,t),xn=e=>Zt().filter(t=>t.episodeId===e),Sn=e=>vn(e,{endedAt:null});function Cn(e){let t=hn(e);return N.episodes=N.episodes.filter(t=>t.id!==e),P(),t}function wn(e){e&&!hn(e.id)&&(N.episodes.push(e),P())}var Tn=e=>N.cycleEntries.some(t=>t.date===e&&t.type===`period`);function En(e){return Tn(e)?N.cycleEntries=N.cycleEntries.filter(t=>t.date!==e||t.type!==`period`):N.cycleEntries.push({id:Lt(),date:e,type:`period`,createdAt:Rt()}),P(),Tn(e)}var Dn=e=>N.sleepLogs.find(t=>t.date===e)??null;function On({date:e,minutes:t,quality:n=null,note:r=``}){let i={date:e,minutes:Math.max(0,Math.round(t)),quality:n||null,note:String(r).trim(),source:`manual`},a=Dn(e);if(a)return Object.assign(a,i,{updatedAt:Rt()}),P(),a;let o=zt({...i,bedtime:null,wakeTime:null,externalId:null});return N.sleepLogs.push(o),P(),o}function kn(e){let t=Dn(e);return N.sleepLogs=N.sleepLogs.filter(t=>t.date!==e),P(),t}function An(e){e&&!Dn(e.date)&&(N.sleepLogs.push(e),P())}var I=()=>!!N.settings.plus.active;function jn({plan:e,simulated:t=!1,trialEndsAt:n=null,startedAt:r=null,orderId:i=null}){N.settings.plus={...N.settings.plus,active:!0,plan:e,startedAt:r??new Date().toISOString(),trialEndsAt:n,simulated:t,orderId:i},P()}var Mn=()=>!!N.settings.plus.storeLinked;function Nn(){Mn()||(N.settings.plus={...N.settings.plus,storeLinked:!0},P())}function Pn(){let{active:e,trialEndsAt:t}=N.settings.plus;return e&&t&&new Date(t)>new Date?t:null}function Fn(e=new Date){let{active:t,startedAt:n}=N.settings.plus;if(!t||!n)return null;let r=M(new Date(n),14);return r.setHours(23,59,59,999),r>=e?r:null}function In(){N.settings.plus={...Nt().settings.plus,storeLinked:Mn()},P()}var Ln=e=>N.weatherDays.find(t=>t.date===e)??null;function Rn({source:e,lat:t=null,lon:n=null,placeLabel:r=``}){N.settings.weather={enabled:!0,source:e,lat:t,lon:n,placeLabel:r,consentAt:Rt(),updatedAt:Rt()},P()}function zn(){N.settings.weather={...Nt().settings.weather},P()}function Bn(e,t=null){let n=new Map(N.weatherDays.map(e=>[e.date,e]));for(let t of e){let e=n.get(t.date);n.set(t.date,e?{...e,...t,updatedAt:Rt()}:zt(t))}N.weatherDays=[...n.values()],N.settings.weather={...N.settings.weather,...t??{},updatedAt:Rt()},P()}var Vn=e=>N.healthDays.find(t=>t.date===e)??null;function Hn({provider:e,types:t}){N.settings.health={connected:!0,provider:e,types:t,consentAt:Rt(),lastSyncAt:null},P()}function Un(){N.settings.health={...Nt().settings.health},P()}function Wn(e){N.settings.health={...N.settings.health,types:e},P()}function Gn({sleepLogs:e=[],healthDays:t=[]}){for(let t of e){let e=Dn(t.date);(!e||e.source!==`manual`||Zn(e))&&(e&&!Zn(e)?Object.assign(e,t,{updatedAt:Rt()}):(e&&(N.sleepLogs=N.sleepLogs.filter(t=>t!==e)),N.sleepLogs.push(zt({quality:null,note:``,...t}))))}for(let e of t){let t=Vn(e.date);t?Object.assign(t,e,{updatedAt:Rt()}):N.healthDays.push(zt(e))}N.settings.health={...N.settings.health,lastSyncAt:Rt()},P()}function Kn(e){N.settings.forecast={...N.settings.forecast,...e},P()}var qn=()=>N;function Jn(e){return{episodes:N.episodes.filter(t=>A(t.startedAt)===e).sort(Bt(`startedAt`)),symptomLogs:N.symptomLogs.filter(t=>A(t.occurredAt)===e).sort(Bt(`occurredAt`)),intakes:N.medicationIntakes.filter(t=>A(t.takenAt)===e).sort(Bt(`takenAt`)),sleep:Dn(e),period:Tn(e)}}function Yn(e=new Date){let t=Jn(A(e)),n=gn();return n&&!t.episodes.includes(n)&&t.episodes.unshift(n),t}var Xn=[`medications`,`episodes`,`symptomLogs`,`medicationIntakes`,`sleepLogs`,`cycleEntries`],Zn=e=>String(e.id).startsWith(`demo-`);function Qn(){N.settings.name!==`Simona`||N.settings.nameSetAt||(N.settings={...N.settings,name:``},P())}function $n({records:e}){for(let t of Xn)N[t]=[...N[t].filter(e=>!Zn(e)),...e[t]];N.settings={...N.settings,demoSeededAt:A(),demoEnabled:!0},Qn(),P()}function er(){for(let e of Xn)N[e]=N[e].filter(e=>!Zn(e));N.medicationIntakes=N.medicationIntakes.filter(e=>!String(e.medicationId).startsWith(`demo-`)),N.settings={...N.settings,demoEnabled:!1},P()}var tr=e=>typeof e==`string`&&Number.isFinite(new Date(e).getTime()),nr=e=>typeof e==`string`&&/^\d{4}-\d{2}-\d{2}$/.test(e),rr={medications:e=>typeof e.name==`string`,medicationIntakes:e=>tr(e.takenAt),episodes:e=>tr(e.startedAt)&&(e.endedAt==null||tr(e.endedAt)),symptomLogs:e=>tr(e.occurredAt)&&Array.isArray(e.symptoms),sleepLogs:e=>nr(e.date)&&Number.isFinite(e.minutes),cycleEntries:e=>nr(e.date),customSymptoms:e=>typeof e.key==`string`&&typeof e.label==`string`,weatherDays:e=>nr(e.date),healthDays:e=>nr(e.date)},ir=e=>!!e&&typeof e==`object`&&typeof e.schemaVersion==`number`&&!!e.settings&&typeof e.settings==`object`,ar=e=>ir(e)&&e.schemaVersion>Mt;function or(e){if(!ir(e)||e.schemaVersion>Mt)return!1;let t=Nt();return Object.keys(t).filter(e=>Array.isArray(t[e])).every(t=>{if(e[t]===void 0)return!0;if(!Array.isArray(e[t]))return!1;let n=rr[t];return e[t].every(e=>!!e&&typeof e==`object`&&(!n||n(e)))})}function sr(e){let t=Pt(e),{plus:n,consent:r,health:i,weather:a,autoLockMinutes:o,onboardingCompletedAt:s,language:c,backup:l}=N.settings;N={...t,settings:{...t.settings,plus:n,consent:r,health:i,weather:a,autoLockMinutes:o,onboardingCompletedAt:s,language:t.settings.language??c,backup:{...l,lastAt:Rt(),snoozedUntil:null}}},P()}function cr(){N.settings.backup={...N.settings.backup,lastAt:Rt(),snoozedUntil:null},P()}function lr(e){N.settings.backup={...N.settings.backup,remind:e,snoozedUntil:null},P()}function ur(e){N.settings.backup={...N.settings.backup,snoozedUntil:M(new Date,e).toISOString()},P()}function dr(){St(),N=Nt()}var fr=365,pr=56,mr=[2,9,16,24,33,41,50],hr=[{key:`betahistine`,name:`Betahistín`,type:`preventive`,dose:`24 mg`,frequency:`2× denne`,since:95},{key:`magnesium`,name:`Magnézium`,type:`preventive`,dose:`300 mg`,frequency:`1× denne večer`,since:60},{key:`ibuprofen`,name:`Ibuprofén`,type:`acute`,dose:`400 mg`,frequency:`podľa potreby`},{key:`dimenhydrinate`,name:`Dimenhydrinát`,type:`acute`,dose:`50 mg`,frequency:`pri nevoľnosti`}],gr=[`Začalo v obchode pri regáloch, pomohlo ľahnúť si do tmy.`,`Celý deň pri počítači, večer sa to rozbehlo.`,`Pred tým som zle spala.`,``,``],_r=[[`dizziness`,2,4],[`brain_fog`,2,4],[`fatigue`,3,4],[`unsteadiness`,2,4],[`tinnitus`,1,3],[`ear_pressure`,2,3],[`rocking`,2,4],[`floating`,2,3],[`headache`,2,4]],vr=[`weather_change`,`stress`,`screen_time`,`skipped_meal`,`visual_stimulation`,`dehydration`,`bright_light`,`neck_pain`,`long_sleep`],yr=[7,9,11,13,14,15,16,16,17,17,18,18,19,20,21];function br(e){return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function xr(e){let t=[];for(let n=20;n<fr;){for(let e=0;e<4;e++)t.push(n-e);n+=n===20?28:27+Math.floor(e()*4)}return t}function Sr(e=new Date){let t=br(20261019),n=(e,n)=>Math.round(e+t()*(n-e)),r=e=>t()<e,i=e=>e[Math.floor(t()*e.length)],a=0,o=e=>`demo-${e}-${++a}`,s=(t,n,r=0)=>{let i=M(e,-t);return i.setHours(n,r,0,0),i<=e?i:null},c=(e,t)=>new Date(e.getTime()+t*6e4),l=e=>({createdAt:e.toISOString(),updatedAt:e.toISOString()}),u=t=>A(M(e,-t)),d=hr.map(t=>{let n=M(e,-(t.since??90));return{id:`demo-med-${t.key}`,...l(n),name:t.name,type:t.type,dose:t.dose,frequency:t.frequency,note:``,startDate:t.since?A(n):null,endDate:null}}),f=e=>d.find(t=>t.id===`demo-med-${e}`),p=br(20261102),m=br(20261103),h=e=>p()<e,g=(e,t)=>Math.round(e+p()*(t-e)),_=xr(m),v=e=>_.some(t=>Math.abs(t-e)<=1),y=new Map;for(let e=0;e<fr;e++){if(e>3&&!h(.88))continue;let t=mr.includes(e)?h(.6):h(e<pr?.08:.14);y.set(e,t?g(60,71)*5:g(74,100)*5)}let b=[];for(let e=364;e>=pr;e--){if(b.at(-1)===e+1)continue;let t=(y.get(e)??450)<360,n=.07;t&&(n+=.25),v(e)&&(n+=.12),e>95&&(n*=1.25),m()<n&&b.push(e)}let x=[...b,...[...mr].reverse()],S=[],C=br(20261026),w=e=>e[Math.floor(C()*e.length)],T=(e,t)=>[...new Set(Array.from({length:1+Math.floor(C()*t)},()=>w(e)))],E=e=>({type:w([`vestibular`,`vestibular`,`vestibular`,`migraine_headache`,`migraine_headache`]),helped:e,relief:T([`rest`,`sleep`,`dark_room`,`dark_room`,`hydration`,`relaxation`,`cold_compress`,`shower`],2),impact:T([`work_study`,`daily_activities`,`daily_activities`,`social`,`movement`,`sleep`,`rest`],2)}),D=[],ee=[],te=[],O=(e,t,{effect:n=null,episodeId:r=null}={})=>{t&&ee.push({id:o(`intake`),...l(t),medicationId:e.id,takenAt:t.toISOString(),dose:e.dose,effect:n,note:``,episodeId:r})},ne=(e,t,n={})=>{e&&D.push({id:o(`log`),...l(e),occurredAt:e.toISOString(),symptoms:t,vertigoType:null,duration:null,note:``,episodeId:null,...n})};for(let t of x){let a=s(t,t<pr?n(13,19):i(yr),i([0,15,30,45]));if(!a)continue;let u=n(18,66)*5,d=c(a,u),p=n(5,8),m=new Set([i(vr)]);r(.45)&&m.add(i(vr)),(y.get(t)??450)<360&&r(.7)&&m.add(`poor_sleep`),v(t)&&m.add(`menstrual_cycle`);let h=o(`episode`),g={id:h,...l(a),startedAt:a.toISOString(),endedAt:d<=e?d.toISOString():null,type:null,intensity:p,symptoms:[],vertigoTypes:[],triggers:[...m],triggerOther:``,medicationIntakeIds:[],helped:null,relief:[],impact:[],note:``};S.push(g);let _=n(3,6),b=[{key:`vertigo`,intensity:p},{key:`nausea`,intensity:_}];r(.6)&&b.push(i([{key:`light_sensitivity`,intensity:n(3,6)},{key:`headache`,intensity:n(3,7)},{key:`sound_sensitivity`,intensity:n(2,5)}])),ne(c(a,10),b,{episodeId:h,duration:u<180?`1_3h`:u<360?`3_6h`:`6_12h`,note:i(gr)}),r(.4)&&d<=e&&ne(c(d,-20),[{key:`fatigue`,intensity:n(4,6)},{key:`brain_fog`,intensity:n(3,5)}],{episodeId:h});let x=i([`helped`,`partly`,`helped`,`not_helped`,`partly`]);O(f(_>=4?`dimenhydrinate`:`ibuprofen`),c(a,35),{effect:x,episodeId:h}),t!==mr[0]&&Object.assign(g,E(x))}for(let t=0;t<fr;t++){let a=u(t),d=x.includes(t),p=y.get(t);if(p!=null){let n=p>=430?r(.85)?`good`:`fair`:p>=380?`fair`:`poor`,i=M(e,-t);i.setHours(6,30,0,0),te.push({id:o(`sleep`),...l(i<=e?i:e),date:a,minutes:p,quality:n,note:``,bedtime:null,wakeTime:null,source:`manual`,externalId:null})}if(t===0)ne(s(0,9,15)??c(e,-20),[{key:`brain_fog`,intensity:3},{key:`fatigue`,intensity:4}]);else if(!d&&r(.32)){let e=r(.35)?2:1,a=[];for(;a.length<e;){let[e,t,o]=i(_r);a.some(t=>t.key===e)||a.push({key:e,intensity:r(.8)?n(t,o):null})}ne(s(t,n(8,20),i([0,10,20,30,40,50])),a,{duration:r(.6)?i([`moment`,`under_1h`,`under_1h`,`1_3h`]):null})}t<95&&r(.65)&&O(f(`betahistine`),s(t,8,n(0,40))),t<95&&r(.35)&&O(f(`betahistine`),s(t,20,n(0,30))),t<60&&r(.4)&&O(f(`magnesium`),s(t,21,n(0,30)))}return{records:{medications:d,episodes:S,symptomLogs:D,medicationIntakes:ee,sleepLogs:te,cycleEntries:_.map(t=>({id:o(`cycle`),date:u(t),type:`period`,createdAt:M(e,-t).toISOString()}))}}}var Cr={sk:{app:{name:`Vestie`,logo:`Vestie – Vestibulárna migréna`},common:{continue:`Pokračovať`,skip:`Preskočiť`,back:`Späť`,save:`Uložiť`,cancel:`Zrušiť`,close:`Zavrieť`,yes:`Áno`,undo:`Vrátiť`,optional:`nepovinné`,on:`Zapnuté`,off:`Vypnuté`,stepOf:`Krok {step} z {total}`,edit:`Upraviť`,delete:`Vymazať`},language:{title:`Vyber si jazyk`,sk:`Slovenčina`,en:`English`},welcome:{title:`Tvoj denník príznakov`,text:`Zapisuj príznaky, epizódy, lieky a spánok. Appka ich zoradí do kalendára a prehľadov a pripraví report, ktorý môžeš ukázať lekárovi.`,cta:`Začať`},goals:{title:`S čím ti môže aplikácia pomôcť?`,lead:`Vyber, čo je pre teba dôležité. Môžeš zvoliť viac možností alebo pokračovať bez výberu.`,options:{symptoms:`Zaznamenávať príznaky`,triggers:`Zaznamenávať možné spúšťače`,patterns:`Porozumieť svojim ťažkostiam`,doctor:`Pripraviť prehľad pre lekára`}},condition:{title:`Čo chceš sledovať?`,lead:`Výber slúži len na prispôsobenie obsahu, nejde o diagnózu. Môžeš ho kedykoľvek zmeniť.`,options:{vestibular_migraine:`Vestibulárna migréna`,migraine:`Migréna`,other_vestibular:`Iné vestibulárne ochorenie`,unsure:`Nie som si istý/istá`}},cycle:{title:`Chceš sledovať menštruačný cyklus?`,lead:`Táto funkcia je voliteľná. Neskôr ju môžeš zapnúť alebo vypnúť v nastaveniach.`,yes:`Áno`,no:`Nie`},medications:{title:`Chceš pridať svoje lieky?`,lead:`Môžeš pridať lieky, ktoré užívaš preventívne alebo pri akútnych ťažkostiach. Tento krok môžeš vynechať a lieky pridať neskôr.`,add:`Pridať lieky`,addAnother:`Pridať ďalší liek`,added:`Pridané lieky`,remove:`Odstrániť liek {name}`,disclaimer:`Aplikácia neodporúča dávkovanie ani nemení tvoju liečbu.`,types:{preventive:`Preventívny`,acute:`Akútny`}},medForm:{title:`Nový liek`,name:`Názov lieku`,namePlaceholder:`napr. Betahistín`,nameRequired:`Zadaj názov lieku.`,type:`Typ lieku`,dose:`Dávka`,dosePlaceholder:`napr. 24 mg`,frequency:`Frekvencia`,frequencyPlaceholder:`napr. 2× denne`,note:`Poznámka`,submit:`Uložiť liek`,saved:`Liek {name} bol pridaný`,startDate:`Začiatok užívania`,startDateHint:`Pomôže tebe aj lekárovi vidieť, odkedy liek užívaš.`},reminders:{title:`Chceš si nastaviť pripomienku?`,lead:`Každý deň ti v čase, ktorý si zvolíš, pripomenieme, aby si si zaznamenal/a svoje príznaky a to, ako sa cítiš.`,yes:`Áno`,no:`Nie, zatiaľ nie`,time:`Kedy ti ju máme pripomenúť?`,permission:`Telefón ťa potom požiada o povolenie posielať upozornenia. Pripomienku môžeš kedykoľvek vypnúť v profile.`},today:{greeting:`Ahoj`,greetingName:`Ahoj, {name}`,howAreYou:`Ako sa dnes cítiš?`,noEntries:`Dnes zatiaľ nemáš zaznamenané žiadne príznaky.`,loggedToday:`Dnes zaznamenané`,addSymptom:`Pridať príznak`,startEpisode:`Spustiť epizódu`,overview:`Dnes`,sleep:`Spánok`,meds:`Lieky`,nothingYet:`Zatiaľ nič`,entriesEmpty:`Zatiaľ tu nič nie je. Príznak pridáš tlačidlom vyššie, epizódu spustíš v strede spodného menu.`,symptomsToday:`Dnes zaznamenané príznaky`,intakeTitle:`Liek`,logIntake:`Zaznamenať liek`,pressure:`Tlak`,steps:`Kroky`,turnOn:`Zapnúť`,connect:`Prepojiť`,mobileOnly:`V mobilnej appke`},episode:{title:`Epizóda`,ongoing:`Prebieha epizóda`,statusOngoing:`Prebieha`,statusEnded:`Ukončená`,started:`Epizóda bola spustená`,startedAt:`Začiatok`,endedAt:`Koniec`,duration:`Trvanie`,since:`od {time}`,lasting:`trvá {duration}`,detailsLater:`Podrobnosti môžeš doplniť teraz alebo kedykoľvek neskôr. Epizóda zostane uložená, aj keď aplikáciu zavrieš.`,addDetails:`Pridať podrobnosti`,finishLater:`Dokončiť neskôr`,end:`Ukončiť epizódu`,endedToast:`Epizóda bola ukončená`,mistake:`Spustená omylom?`,cancel:`Zrušiť epizódu`,cancelledToast:`Epizóda bola zrušená`,delete:`Vymazať epizódu`,deleteTitle:`Vymazať epizódu?`,deleteText:`Záznam sa natrvalo odstráni z tohto zariadenia.`,deletedToast:`Epizóda bola vymazaná`,notFound:`Táto epizóda už neexistuje.`,linkedSymptoms:`Príznaky zaznamenané počas epizódy`,linkedIntakes:`Lieky užité počas epizódy`,editDetails:`Upraviť podrobnosti`,saveLater:`Uložiť a doplniť neskôr`,savedLater:`Epizóda je uložená. Podrobnosti doplníš kedykoľvek v jej detaile.`,details:`Podrobnosti`},duration:{underMinute:`menej ako minúta`,minutes:`{m} min`,hours:`{h} h`,hoursMinutes:`{h} h {m} min`},nav:{label:`Hlavná navigácia`,today:`Domov`,calendar:`Kalendár`,insights:`Prehľady`,treatment:`Liečba`,profile:`Profil`,startEpisode:`Spustiť epizódu`},profile:{title:`Profil`,me:`Môj profil`,name:`Meno`,namePlaceholder:`Nepovinné`,nameHint:`Použijeme ho iba na pozdrav na domovskej obrazovke.`,language:`Jazyk`,tracking:`Sledovanie`,cycle:`Menštruačný cyklus`,reminders:`Denná pripomienka`,reminderTime:`Čas pripomienky`,display:`Zobrazenie`,privacy:`Súkromie`,deleteAll:`Vymazať všetky dáta`,deleteAllTitle:`Vymazať všetky dáta?`,deleteAllText:`Odstránia sa všetky záznamy, lieky a nastavenia v tomto zariadení. Túto akciu nie je možné vrátiť.`,deleteAllConfirm:`Áno, vymazať`,dev:`Pre vývoj`,styleguide:`Dizajn systém`,saved:`Uložené`,disclaimer:`Aplikácia slúži na osobné zaznamenávanie a nie je zdravotníckou pomôckou. Neposkytuje diagnózu ani liečbu a nenahrádza konzultáciu s lekárom.`,integrations:`Prepojenia`,health:`Smart hodinky a zdravotné údaje`,healthHint:`Spánok, kroky a tréningy z Apple Zdravia alebo Health Connect, aj z tvojich hodiniek.`,comingSoon:`Pripravujeme`,demoReset:`Obnoviť ukážkové dáta`,demoResetTitle:`Obnoviť ukážkové dáta?`,demoResetText:`Ukážkové záznamy za posledný rok sa vrátia do pôvodného stavu. Tvoje vlastné záznamy zostanú.`,demoResetConfirm:`Obnoviť`,demoResetDone:`Ukážkové dáta sú obnovené`,onboardingAgain:`Prejsť úvodom znova`,logout:`Odhlásiť sa`,logoutNoPinTitle:`Najprv si nastav PIN`,logoutNoPinText:`Bez PIN-u by sa do appky po odhlásení dostal ktokoľvek s tvojím telefónom. Po nastavení PIN-u ťa hneď odhlásime.`,logoutNoPinConfirm:`Nastaviť PIN`,appearance:`Vzhľad`,themes:{light:`Svetlý`,dark:`Tmavý`,system:`Podľa telefónu`},demoSection:`Ukážka appky`,demoFill:`Vyplnená appka`,demoFillHint:`Vypni a uvidíš prázdnu appku ako nový človek.`,demoFillOn:`Ukážkové dáta sú zapnuté`,demoFillOff:`Ukážkové dáta sú vypnuté, appka je prázdna`,weatherHint:`Tlak a počasie podľa polohy sa zapisujú každý deň.`,demoPlus:`Vestie+ zapnuté`,demoPlusHint:`Prepni a uvidíš appku s predplatným alebo bez neho.`,plusActive:`Moje Vestie+`,plusTry:`Vyskúšať Vestie+`,plusHint:`Počasie a tlak, upozornenia na počasie, hľadač súvislostí a ďalšie.`},symptoms:{dizziness:`Závrat`,vertigo:`Vertigo`,rocking:`Hojdanie / kolísanie`,floating:`Pocit vznášania`,unsteadiness:`Nestabilita / neistota pri chôdzi`,nausea:`Nevoľnosť`,vomiting:`Vracanie`,light_sensitivity:`Citlivosť na svetlo`,sound_sensitivity:`Citlivosť na zvuk`,visual_sensitivity:`Vizuálna citlivosť`,tinnitus:`Tinnitus / pískanie v ušiach`,ear_pressure:`Tlak v ušiach`,headache:`Bolesť hlavy`,brain_fog:`Mozgová hmla`,fatigue:`Únava`,unknown:`Neznámy príznak`},durations:{just_started:`Práve začali`,under_1h:`Menej ako 1 hodinu`,"1_3h":`1–3 hodiny`,"3_6h":`3–6 hodín`,"6_12h":`6–12 hodín`,over_12h:`Viac ako 12 hodín`,ongoing:`Stále pretrvávajú`,moment:`Chvíľu (sekundy až minúty)`},triggers:{poor_sleep:`Nekvalitný / krátky spánok`,stress:`Stres`,skipped_meal:`Vynechané jedlo`,dehydration:`Dehydratácia`,caffeine:`Kofeín`,alcohol:`Alkohol`,exertion:`Fyzická námaha`,illness:`Choroba / infekcia`,visual_stimulation:`Vizuálna stimulácia`,screen_time:`Dlhý čas pred obrazovkou`,weather_change:`Zmena počasia`,menstrual_cycle:`Menštruačný cyklus`,travel:`Cestovanie / pohyb`,other:`Iné`,long_sleep:`Príliš dlhý spánok`,bright_light:`Ostré svetlo / slnečné žiarenie`,strong_smells:`Silné pachy`,neck_pain:`Bolesť alebo napätie krku`,allergy:`Alergia`},effects:{helped:`Pomohlo`,partly:`Čiastočne`,not_helped:`Nepomohlo`,unknown:`Neviem`},intensity:{none:`žiadna`,mild:`mierna`,moderate:`stredná`,severe:`silná`,notSet:`Nezadané`,value:`{value} – {level}`,highest:`najvyššia intenzita {value}`},log:{symptomsTitle:`Aké príznaky zaznamenávaš?`,symptomsLead:`Vyber jeden alebo viac príznakov.`,search:`Hľadať príznak`,noMatch:`Žiadny príznak nezodpovedá hľadaniu. Môžeš pridať vlastný.`,custom:`Vlastný príznak`,customPlaceholder:`Napíš názov príznaku`,customAdd:`Pridať`,continueCount:`Pokračovať ({n})`,intensityTitle:`Aká silná je intenzita?`,intensityLead:`0 = žiadna, 10 = najhoršia. Posuvník začína na 5 – posuň ho podľa toho, ako sa cítiš. Ktorýkoľvek príznak môžeš vynechať.`,clear:`Vynechať`,detailsTitle:`Ako dlho tieto príznaky trvajú?`,detailsLead:`Všetko na tejto obrazovke je nepovinné.`,when:`Kedy začali`,date:`Dátum`,time:`Čas`,note:`Poznámka`,linkEpisode:`Priradiť k prebiehajúcej epizóde`,save:`Uložiť záznam`,saved:`Záznam bol uložený`,whenToday:`Dnes o {time}`,whenOn:`{date} o {time}`,changeTime:`Zmeniť čas`,clearLabel:`Vynechať intenzitu: {name}`,restore:`Zadať intenzitu`},symptomLog:{title:`Príznaky`,duration:`Trvanie`,note:`Poznámka`,episode:`Súčasť epizódy`,openEpisode:`Otvoriť epizódu`,edit:`Upraviť záznam`,delete:`Vymazať záznam`,deleteTitle:`Vymazať záznam?`,deleteText:`Záznam sa natrvalo odstráni z tohto zariadenia.`,deletedToast:`Záznam bol vymazaný`,notFound:`Tento záznam už neexistuje.`},treatment:{title:`Liečba`,lead:`Tvoje lieky, ich užívanie a ako ti podľa teba pomáhajú.`,preventive:`Preventívne`,acute:`Akútne`,add:`Pridať liek`,empty:`Zatiaľ nemáš pridané žiadne lieky.`,noneOfType:`Žiadne lieky v tejto skupine.`,lastTaken:`Naposledy {when}`,neverTaken:`Zatiaľ bez záznamu užitia`,disclaimer:`Aplikácia nepredpisuje lieky ani nenavrhuje zmenu dávkovania. O liečbe sa rozhoduj so svojím lekárom.`,type:`Typ`,dose:`Dávka`,frequency:`Frekvencia`,note:`Poznámka`,logIntake:`Zaznamenať užitie`,history:`História užitia`,historyEmpty:`Zatiaľ tu nie je žiadne užitie.`,taken:`Užité`,effectSummary:`Účinok podľa teba`,edit:`Upraviť liek`,delete:`Odstrániť liek`,deleteTitle:`Odstrániť liek?`,deleteText:`Odstráni sa liek aj celá história jeho užitia.`,deletedToast:`Liek bol odstránený`,notFound:`Tento liek už neexistuje.`,inEpisode:`počas epizódy`,effectMissing:`účinok nezadaný`,showAll:`Zobraziť celú históriu ({n})`,hint:`Kliknutím na liek môžeš zaznamenať jeho užitie a sledovať, ako ti pomáha.`},intake:{title:`Užitie lieku`,editTitle:`Upraviť užitie`,date:`Dátum`,time:`Čas`,dose:`Dávka`,effect:`Pomohlo to?`,effectHint:`Ak ešte nevieš, doplň to neskôr.`,note:`Poznámka`,save:`Uložiť užitie`,saved:`Užitie bolo uložené`,delete:`Vymazať užitie`,deleteTitle:`Vymazať užitie?`,deleteText:`Záznam o užití sa natrvalo odstráni.`,deletedToast:`Užitie bolo vymazané`,notFound:`Tento záznam už neexistuje.`},calendar:{title:`Kalendár`,prev:`Predchádzajúci mesiac`,next:`Nasledujúci mesiac`,backToday:`Dnes`,legend:`Vysvetlivky`,legendPeriod:`Menštruácia`,dayEmpty:`V tento deň nemáš žiadne záznamy.`,addSymptom:`Pridať príznak`,period:`Menštruácia`,periodMark:`Zaznamenať menštruáciu v tento deň`,summaryEntries:`počet záznamov {n}`,summaryPeriod:`menštruácia`,summaryNone:`bez záznamov`,selected:`vybraný deň`,today:`dnes`,legendEpisode:`Deň s epizódou`,legendSymptoms:`Zaznamenané príznaky`,summaryEpisode:`epizóda`},insights:{title:`Prehľady`,periodLabel:`Obdobie`,empty:`Prehľad sa skladá z tvojich záznamov. Keď budeš mať zapísané príznaky z viacerých dní, uvidíš tu, čo sa opakuje.`,overview:`Súhrn`,symptomDays:`Dni s príznakmi`,episodes:`Epizódy`,avgIntensity:`Priemerná intenzita`,avgDuration:`Priemerné trvanie epizódy`,noValue:`nezadané`,topSymptoms:`Najčastejšie príznaky`,topSymptomsLead:`Počet záznamov, v ktorých sa príznak objavil.`,topTriggers:`Najčastejšie možné spúšťače`,triggersEmpty:`Zatiaľ tu nie sú žiadne možné spúšťače. Pribudnú s podrobnosťami epizódy.`,meds:`Lieky`,medsEmpty:`V tomto období nie je zaznamenané žiadne užitie lieku.`,interpretation:`Zaznamenaná súvislosť nie je dôkazom príčiny. Prehľad počíta iba so zadanými údajmi.`,report:`Vytvoriť report pre lekára`},report:{title:`Report pre lekára`,lead:`Vyber obdobie. Report zhrnie tvoje záznamy do prehľadu, ktorý môžeš ukázať lekárovi.`,custom:`Vlastné obdobie`,from:`Od`,to:`Do`,create:`Vytvoriť report`,invalidRange:`Dátum „Od“ musí byť skôr alebo v ten istý deň ako „Do“.`,docTitle:`Zaznamenané príznaky a liečba`,period:`Obdobie`,created:`Vytvorené`,disclaimer:`Údaje zaznamenal používateľ v aplikácii Vestie. Nejde o diagnózu ani lekársky záznam.`,fewData:`V tomto období je zaznamenaných málo údajov, prehľad nemusí byť reprezentatívny.`,summary:`Súhrn`,symptoms:`Najčastejšie príznaky`,triggers:`Zaznamenané možné spúšťače`,meds:`Lieky a účinok podľa používateľa`,sleep:`Spánok`,sleepNone:`V tomto období nebol zaznamenaný spánok.`,cycle:`Menštruačný cyklus`,cycleDays:`Zaznamenané dni menštruácie`,notes:`Poznámky`,timeline:`Časová os`,colDate:`Dátum a čas`,colEntry:`Záznam`,colDetail:`Podrobnosti`,none:`Bez záznamov.`,print:`Uložiť ako PDF`,printHint:`V okne tlače zvoľ „Uložiť ako PDF“.`,sleepQuality:`Kvalita spánku`,plusHint:`S Vestie+ pribudne v reporte tlak pri epizódach, možné súvislosti a aktivita.`,weather:`Počasie a tlak pri epizódach`,weatherSummary:`Epizódy v dňoch s poklesom tlaku o 6 hPa a viac: {drops} z {total}.`,patterns:`Možné súvislosti podľa záznamov`,patternsOther:`inak {a} z {b}`,patternsNote:`Počet ťažších dní po dni s daným faktorom. Ide o možné súvislosti zo záznamov používateľa za posledný rok, nie o dôkaz príčiny.`,activity:`Aktivita`,avgSteps:`Priemerný počet krokov za deň`,workoutDays:`Dni s tréningom`,workoutDaysValue:`{a} z {b}`,workoutTypes:`Najčastejšie tréningy`},sleep:{title:`Spánok`,formTitle:`Ako sa ti spalo?`,lead:`Zaznamenaj dĺžku spánku. Kvalitu a poznámku môžeš vynechať.`,date:`Deň prebudenia`,duration:`Dĺžka spánku`,hours:`Hodiny`,minutes:`Minúty`,durationRequired:`Zadaj dĺžku spánku.`,quality:`Kvalita spánku`,qualities:{good:`Dobrá`,fair:`Priemerná`,poor:`Zlá`},note:`Poznámka`,save:`Uložiť spánok`,saved:`Spánok bol uložený`,add:`Zaznamenať spánok`,entry:`Spánok {duration}`,delete:`Vymazať záznam spánku`,deleteTitle:`Vymazať záznam spánku?`,deleteText:`Záznam sa natrvalo odstráni z tohto zariadenia.`,deletedToast:`Záznam spánku bol vymazaný`,avg:`Priemerný spánok`,nights:`Zaznamenané noci`},consent:{title:`Tvoje údaje zostávajú v tvojom telefóne`,lead:`Skôr než začneš, pozri sa, ako s tvojimi údajmi zaobchádzame.`,updatedLead:`Zásady ochrany súkromia sa zmenili. Prečítaj si ich a potvrď súhlas znova, potom môžeš appku používať ďalej.`,factDevice:`Záznamy o zdraví sa ukladajú iba v tomto telefóne.`,factNoServer:`Appka nemá účet na internete, záznamy o zdraví nikam neodosiela a nepoužíva reklamy ani analytické nástroje.`,factPin:`Prihlasovať sa budeš PIN kódom a tvoje údaje budú zašifrované.`,factControl:`Údaje môžeš kedykoľvek exportovať do súboru alebo natrvalo vymazať.`,health:`Súhlasím so spracovaním mojich údajov o zdraví v tomto telefóne na účely osobného sledovania.`,age:`Mám aspoň 16 rokov.`,policyLink:`Prečítať zásady ochrany súkromia`,submit:`Súhlasím a pokračujem`,decline:`Nesúhlasím`,declineTitle:`Bez súhlasu appka nemôže pokračovať`,declineText:`Tvoje záznamy ostávajú v telefóne. Môžeš si ich exportovať do súboru alebo ich natrvalo vymazať. Kým nesúhlasíš, appka s nimi nič nerobí.`},privacyPolicy:{title:`Zásady ochrany súkromia`,draft:`Návrh`,version:`Verzia {version}`,draftNote:`Pracovný návrh na pripomienkovanie. Pred vydaním ho skontroluje právnik.`,controllerTitle:`Kto je prevádzkovateľ`,controllerText:`Prevádzkovateľom je IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, IČO 47321547. Kontakt pre otázky o osobných údajoch: support@vestibularnamigrena.sk.`,dataTitle:`Aké údaje appka spracúva`,dataText:`Iba to, čo do nej zadáš: čo chceš sledovať (napríklad vestibulárnu migrénu), príznaky a ich intenzitu, epizódy a ich spúšťače, lieky a ich účinok, spánok, poznámky, voliteľne menštruačný cyklus a meno na pozdrav. S Vestie+ aj počasie a tlak podľa približnej polohy a údaje zo zdravotných appiek, ak si to zapneš. Ide o údaje o zdraví, preto ich chránime osobitne.`,storageTitle:`Kde sú tvoje údaje`,storageText:`Iba v tomto telefóne. Appka nemá server ani účet na internete, záznamy o zdraví nikam neodosiela a nepoužíva reklamné ani analytické nástroje. Prevádzkovateľ k tvojim údajom nemá prístup.`,purposeTitle:`Na čo slúžia`,purposeText:`Na tvoje osobné sledovanie ťažkostí a na prehľad alebo report, ktorý môžeš ukázať lekárovi. Report sa vytvorí v telefóne a ty rozhodneš, komu ho dáš. Appka v telefóne ukazuje možné súvislosti v tvojich záznamoch, ale nerobí o tebe žiadne automatizované rozhodnutia s právnymi ani podobne závažnými účinkami.`,legalTitle:`Na akom základe`,legalText:`Údaje o zdraví spracúvame na základe tvojho výslovného súhlasu (čl. 9 ods. 2 písm. a) GDPR). Súhlas môžeš kedykoľvek odvolať v Profile, údaje sa tým vymažú. Polohu na počasie appka posiela na základe tvojho súhlasu, ktorý dáš zapnutím funkcie a odvoláš jej vypnutím (čl. 6 ods. 1 písm. a) GDPR). Na e-maily odpovedáme na základe oprávneného záujmu (čl. 6 ods. 1 písm. f) GDPR).`,rightsTitle:`Tvoje práva`,rightsText:`Máš právo na prístup k údajom, ich opravu a vymazanie, obmedzenie spracúvania, prenosnosť, právo namietať a právo kedykoľvek odvolať súhlas. Údaje sú iba v tvojom telefóne a my k nim nemáme prístup, preto väčšinu práv uplatníš priamo v appke: údaje si pozrieš, upravíš, exportuješ do súboru alebo natrvalo vymažeš (Profil → Súkromie). S ostatným ti pomôžeme na support@vestibularnamigrena.sk. Máš aj právo podať sťažnosť na Úrad na ochranu osobných údajov SR, Hraničná 12, 820 07 Bratislava 27, dataprotection.gov.sk.`,securityTitle:`Zabezpečenie`,securityText:`Do appky sa prihlasuješ 6-miestnym PIN-om. Kým je PIN zapnutý, tvoje údaje v telefóne sú zašifrované (AES-256) a bez PIN-u sú nečitateľné. Ak PIN zabudneš, údaje nie je možné obnoviť.`,backupTitle:`Zálohovanie`,backupText:`Údaje sú iba v telefóne a appka nemá server. V Androide sa nezálohujú na Google Disk. Na iPhone sú súčasťou zálohy celého telefónu v iCloude alebo v počítači, ak ju máš zapnutú. V Profile si môžeš vytvoriť zálohu chránenú heslom a uložiť ju, kam chceš. Heslo k zálohe nepoznáme, preto ho nevieme ani obnoviť. Pri nastavovaní nového telefónu môže Android preniesť údaje appky priamo zo starého telefónu (káblom alebo cez Wi-Fi). Ak máš zapnutý PIN, údaje sú v zálohe telefónu aj pri prenose zašifrované. Bez zálohy alebo prenosu sa pri strate či výmene telefónu údaje stratia.`,ageTitle:`Vek`,ageText:`Appka je určená pre ľudí od 16 rokov.`,changesTitle:`Zmeny zásad`,changesText:`O zmenách týchto zásad ťa upozorníme priamo v appke.`,weatherTitle:`Počasie a tlak (Vestie+)`,weatherText:`Ak si túto funkciu zapneš, appka pri každom otvorení pošle poskytovateľovi počasia polohu zaokrúhlenú na približne 10 km, aby získala skutočné počasie a tlak. Poskytovateľom je OpenWeather Ltd., 30 St Mary Axe, Londýn, Spojené kráľovstvo. Pre Spojené kráľovstvo má EÚ rozhodnutie o primeranej ochrane osobných údajov. Poskytovateľ pritom technicky vidí aj tvoju IP adresu, ako pri každej požiadavke na internet. Podľa svojich zásad IP adresu ani polohu z týchto požiadaviek neukladá. Nič o tvojom zdraví sa neodosiela. Funkciu môžeš kedykoľvek vypnúť.`,healthTitle:`Prepojenie s aplikáciami zdravia (Vestie+)`,healthText:`Ak prepojíš Apple Zdravie alebo Health Connect, appka z nich iba číta vybrané údaje (spánok, kroky a tréningy, pri nich iba druh, čas a trvanie) do tohto telefónu. Nič do nich nezapisuje, nikam ich neodosiela a prepojenie môžeš kedykoľvek zrušiť.`,purchasesTitle:`Predplatné`,purchasesText:`Platbu za Vestie+ vybavuje Google alebo Apple ako samostatný prevádzkovateľ podľa svojich podmienok a zásad. Appka sa od nich dozvie iba to, či je predplatné aktívne. Tvoje platobné údaje nevidíme.`,linksTitle:`Odkazy na web a komunitu`,linksText:`Appka obsahuje odkazy na web vestibularnamigrena.sk a na komunitu na Facebooku, Instagrame a Discorde. Nič im neodosiela. Keď odkaz otvoríš, opustíš appku a platia pravidlá a zásady danej služby.`,retentionTitle:`Ako dlho`,retentionText:`Záznamy sú v telefóne, kým ich nevymažeš, neodvoláš súhlas alebo neodinštaluješ appku. Zálohu máš u seba ty a sám/sama rozhoduješ, kedy ju zmažeš.`,contactTitle:`Keď nám napíšeš`,contactText:`Ak napíšeš na support@vestibularnamigrena.sk, spracúvame tvoju e-mailovú adresu a obsah správy iba na to, aby sme ti odpovedali. Správu uchováme, kým je to na vybavenie potrebné, potom ju vymažeme. Do správy prosím nepíš viac údajov o zdraví, než treba.`},terms:{title:`Podmienky používania`,draft:`Návrh`,version:`Verzia {version}`,draftNote:`Pracovný návrh na pripomienkovanie. Pred vydaním ho skontroluje právnik.`,providerTitle:`Kto appku poskytuje`,providerText:`Appku Vestie a predplatné Vestie+ poskytuje IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, IČO 47321547, zapísaná v Obchodnom registri Mestského súdu Bratislava III, oddiel Sro, vložka č. 90506/B. Kontakt: support@vestibularnamigrena.sk.
Tieto podmienky upravujú používanie appky a predplatného Vestie+. Ako zaobchádzame s tvojimi údajmi, opisujú samostatné Zásady ochrany súkromia.`,appTitle:`Čo appka je`,appText:`Vestie je osobný denník. Zapisuješ si doň príznaky, epizódy, lieky, spánok a ďalšie údaje a appka z nich ukazuje prehľady, možné súvislosti a report, ktorý môžeš ukázať lekárovi. Základná verzia je zadarmo. Appka je určená pre ľudí od 16 rokov.`,healthTitle:`Appka nie je zdravotnícka pomôcka`,healthText:`Appka nediagnostikuje, nelieči, neodporúča lieky ani ich dávkovanie a nenahrádza lekára. Možné súvislosti a upozornenia na počasie vychádzajú iba z tvojich záznamov a z predpovede počasia, nie z lekárskeho posúdenia. O liečbe sa vždy raď s lekárom. Pri náhlych, silných alebo nezvyčajných ťažkostiach vyhľadaj lekársku pomoc alebo volaj 155 či 112.`,useTitle:`Ako môžeš appku používať`,useText:`Appku môžeš používať pre svoju osobnú potrebu. Appka, jej texty a ilustrácie aj značky Vestie a Vestibulárna migréna sú chránené. Bez súhlasu ich nesmieš kopírovať, upravovať ani šíriť ďalej, okrem prípadov, ktoré dovoľuje zákon. Nesmieš obchádzať predplatné ani zasahovať do fungovania appky.`,plusTitle:`Čo obsahuje Vestie+`,plusText:`Vestie+ pridáva k bezplatnej verzii počasie a tlak podľa približnej polohy, upozornenia na počasie, hľadač súvislostí, pokročilé štatistiky, prepojenie s aplikáciami zdravia (spánok, kroky a tréningy) a rozšírený report pre lekára. Aktuálny rozsah je opísaný v ponuke Vestie+ v appke. Funkcie, ktoré potrebujú internet alebo iné appky, fungujú iba vtedy, keď sú dostupné (pozri Služby iných poskytovateľov).`,paymentTitle:`Cena, platba a obnovovanie`,paymentText:`Vestie+ si predplácaš na mesiac alebo na rok. Cenu vrátane DPH vidíš v appke a v obchode ešte pred nákupom. Platbu vybavuje Google Play (na iPhone App Store) podľa svojich podmienok, tvoje platobné údaje nevidíme.
Predplatné sa na konci každého obdobia samo obnoví a znova zaplatí, kým ho nezrušíš. O zmene ceny ťa obchod upozorní vopred a pri zvýšení ceny ti dá možnosť predplatné zrušiť.
Ak ponuka obsahuje skúšobnú dobu zadarmo, prvá platba prebehne až po jej skončení. Ak predplatné počas skúšobnej doby zrušíš, nezaplatíš nič. Skúšobnú dobu ponúka obchod iba raz na jeden účet, spolu pre oba plány.`,cancelTitle:`Zrušenie predplatného`,cancelText:`Predplatné zrušíš kedykoľvek v nastaveniach predplatných v obchode. Z appky sa tam dostaneš cez Vestie+ → Spravovať v Google Play. Odinštalovaním appky ani vymazaním údajov sa predplatné nezruší.
Po zrušení ti Vestie+ ostane do konca zaplateného obdobia a ďalšia platba už neprebehne. Potom sa appka vráti do bezplatnej verzie a všetky tvoje záznamy ostanú v telefóne.`,withdrawalTitle:`Odstúpenie od zmluvy a vrátenie peňazí`,withdrawalText:`Ako spotrebiteľ môžeš od zmluvy o Vestie+ odstúpiť bez uvedenia dôvodu do 14 dní od jej uzavretia, teda od začiatku predplatného. Ak predplatné začína skúšobnou dobou, lehota zahŕňa aj ju: pri 7-dňovej skúšobnej dobe ti po prvej platbe ostáva ešte najmenej 7 dní. Odstúpiť môžeš priamo v appke cez Vestie+ → Odstúpiť od zmluvy tu, alebo správou na support@vestibularnamigrena.sk, v ktorej uvedieš číslo objednávky z potvrdenia od Google Play (začína sa GPA.). Doručenie oznámenia ti potvrdíme e-mailom. Vrátime ti celú sumu cez Google Play na rovnaký spôsob platby, najneskôr do 14 dní od doručenia tvojej správy. Vestie+ sa potom vypne.
Po uplynutí 14 dní sa za začaté obdobie peniaze nevracajú a pri automatickom obnovení predplatného nová lehota nevzniká. Výnimkou sú iba prípady podľa častí Zmeny appky a podmienok a Reklamácie a spory. Nezávisle od toho môže Google Play podľa svojich pravidiel vrátiť peniaze aj sám, napríklad pri žiadosti krátko po platbe.`,dataTitle:`Tvoje záznamy`,dataText:`Tvoje záznamy sú iba v tvojom telefóne. Nemáme k nim prístup, preto ich nevieme obnoviť, preniesť ani vrátiť. O zálohu sa staráš ty (Profil → Záloha údajov). Ak zabudneš PIN alebo heslo k zálohe, údaje sa obnoviť nedajú.`,servicesTitle:`Služby iných poskytovateľov`,servicesText:`Počasie a tlak poskytuje OpenWeather, spánok, kroky a tréningy číta appka z Health Connect alebo Apple Zdravia a platby vybavuje Google Play alebo App Store. Ich dostupnosť ani presnosť neovplyvníme a predpoveď počasia sa môže mýliť. Keď služba nie je dostupná, appka ukáže posledné skutočné údaje s časom, odkedy sú, alebo povie, že údaje nemá. Odkazy na web a komunitu (Facebook, Instagram, Discord) vedú mimo appky, kde platia pravidlá danej služby.`,liabilityTitle:`Zodpovednosť`,liabilityText:`Appku pripravujeme starostlivo, no nevieme zaručiť, že bude vždy bez chýb a bez prerušenia. Nezodpovedáme za rozhodnutia o zdraví urobené iba na základe appky ani za stratu údajov, ktorú sme nespôsobili (napríklad pri strate telefónu bez zálohy). Zodpovednosť, ktorú podľa zákona nemožno obmedziť, ani tvoje práva spotrebiteľa tým nie sú dotknuté.`,changesTitle:`Zmeny appky a podmienok`,changesText:`Appku môžeme vylepšovať a meniť. Ak by sme Vestie+ podstatne obmedzili alebo ukončili, upozorníme ťa v appke vopred, môžeš od zmluvy odstúpiť a nevyužitú časť zaplateného obdobia ti vrátime. O zmenách týchto podmienok ťa upozorníme v appke. Zmena v tvoj neprospech neplatí pre obdobie, ktoré už máš zaplatené.`,complaintsTitle:`Reklamácie a spory`,complaintsText:`Ak Vestie+ nefunguje, ako má, napíš na support@vestibularnamigrena.sk, čo sa deje. Reklamáciu vybavíme bez zbytočného odkladu, najneskôr do 30 dní. Ak chybu neodstránime, máš nárok na primeranú zľavu alebo môžeš od zmluvy odstúpiť a vrátime ti peniaze za obdobie, keď Vestie+ nefungovalo.
Ak nie si spokojný/spokojná s vybavením alebo si myslíš, že sme porušili tvoje práva, môžeš nás na support@vestibularnamigrena.sk požiadať o nápravu. Ak tvoju žiadosť zamietneme alebo na ňu do 30 dní neodpovieme, môžeš podať návrh na alternatívne riešenie sporu Slovenskej obchodnej inšpekcii (soi.sk) alebo inému subjektu zo zoznamu Ministerstva hospodárstva SR.`,lawTitle:`Rozhodné právo`,lawText:`Tieto podmienky sa riadia právom Slovenskej republiky. Ak žiješ v inej krajine Európskej únie, ostáva ti aj ochrana, ktorú ti dávajú záväzné predpisy tvojej krajiny. Slovenské a anglické znenie majú rovnakú platnosť.`},profileSetup:{title:`Vytvor si profil`,lead:`Profil existuje iba v tomto telefóne – bez e-mailu a hesla na internete. Prihlasovať sa budeš PIN kódom.`,pinTitle:`Prihlasovací PIN`,pinText:`V ďalšom kroku si nastavíš 6-miestny PIN. Budeš sa ním prihlasovať a zároveň zašifruje tvoje údaje v telefóne.`,nameLabel:`Ako ťa máme oslovovať?`,namePlaceholder:`Tvoje meno`,nameHint:`Nepovinné. Uvidíš ho v pozdrave na domovskej obrazovke.`,pinAlready:`PIN už máš nastavený. Zmeniť ho môžeš v Profile → Zabezpečenie.`},pin:{progress:`Zadané {n} z {total} číslic`,keypad:`Klávesnica na PIN`,delete:`Zmazať číslicu`,prompt:{current:`Zadaj svoj súčasný PIN`,new:`Zvoľ si 6-miestny PIN`,confirm:`Zopakuj PIN pre kontrolu`},title:{set:`Nastav si prihlasovací PIN`,change:`Zmena PIN-u`,disable:`Vypnutie PIN-u`},setLead:`Budeš sa ním prihlasovať a zároveň zašifruje tvoje údaje v telefóne. Ak ho zabudneš, údaje nie je možné obnoviť – nikto iný k nim nemá prístup.`,checking:`Overujem…`,wrong:`Nesprávny PIN. Skús to znova.`,blocked:`Príliš veľa nesprávnych pokusov. Skús to znova o {time}.`,weak:`Tento PIN sa dá ľahko uhádnuť. Zvoľ iný.`,mismatch:`PIN-y sa nezhodujú. Zvoľ si PIN znova.`,saving:`Šifrujem údaje…`,enabled:`PIN je nastavený, údaje sú zašifrované`,changed:`PIN bol zmenený`,disabled:`PIN je vypnutý`,blockedSeconds:`Príliš veľa nesprávnych pokusov. Skús to znova o {n} s.`},lock:{title:`Prihlás sa`,lead:`Zadaj svoj PIN`,forgot:`Zabudnutý PIN?`,forgotTitle:`Zabudnutý PIN`,forgotText:`PIN nie je možné obnoviť – tvoje údaje sú zašifrované iba v tomto telefóne a nikto iný k nim nemá kľúč. Môžeš ich iba vymazať a začať odznova.`,forgotConfirm:`Vymazať všetko a začať odznova`},security:{title:`Zabezpečenie`,pin:`Prihlasovanie PIN-om`,pinOnHint:`Údaje sú v telefóne zašifrované. Bez PIN-u sa k nim nedá dostať.`,pinOffHint:`Bez PIN-u sa do appky dostane ktokoľvek s tvojím telefónom a údaje nie sú zašifrované.`,changePin:`Zmeniť PIN`,autoLock:`Automaticky odhlásiť`,autoLockOptions:{m0:`Hneď po odchode z appky`,m1:`Po 1 minúte`,m5:`Po 5 minútach`,m15:`Po 15 minútach`},biometrics:`Odomykanie tvárou alebo odtlačkom`,biometricsHint:`Dostupné v mobilnej aplikácii.`},privacy:{deviceOnly:`Záznamy sú iba v tomto telefóne`,deviceOnlyHint:`Appka záznamy o zdraví nikam neodosiela a nemá k nim prístup nikto iný.`,export:`Exportovať moje údaje`,exportHint:`Čitateľný súbor JSON so všetkými záznamami, napríklad na prenos inam. Nie je zašifrovaný.`,exportDone:`Súbor s údajmi je pripravený`,consent:`Súhlas so spracovaním údajov`,consentGiven:`Udelený {date}`,withdraw:`Odvolať súhlas`,withdrawTitle:`Odvolať súhlas?`,withdrawText:`Bez súhlasu appka nemôže uchovávať tvoje údaje o zdraví. Odvolaním sa natrvalo vymažú všetky údaje v tomto telefóne.`,withdrawConfirm:`Odvolať a vymazať údaje`,backupFirst:`Najprv urobiť zálohu`,plusNotCancelled:`Predplatné Vestie+ sa tým nezruší. Ak ho už nechceš, zruš ho v {store}, inak sa bude ďalej obnovovať.`,exportFailed:`Súbor sa nepodarilo vytvoriť. Skús to znova.`,importTitle:`Obnoviť údaje zo súboru?`,importText:`Všetky záznamy v tomto telefóne sa nahradia záznamami zo súboru. Predplatné a PIN sa nezmenia.`,importConfirm:`Obnoviť`,importDone:`Údaje sú obnovené`},backup:{title:`Záloha údajov`,profileHint:`Súbor chránený heslom. Z neho obnovíš záznamy, napríklad v novom telefóne.`,lead:`Appka nemá server, tvoje záznamy sú iba v tomto telefóne. Zálohu si ulož mimo neho, napríklad na Google Disk alebo do počítača. Keď telefón vymeníš alebo stratíš, obnovíš z nej všetky záznamy.`,lastAt:`Posledná záloha: {date}`,never:`Zatiaľ si zálohu nevytvoril/a.`,createTitle:`Vytvoriť zálohu`,password:`Heslo k zálohe`,passwordHint:`Aspoň {n} znakov. Nepoužívaj svoj PIN.`,passwordRepeat:`Zopakuj heslo`,passwordWarning:`Heslo si zapamätaj alebo zapíš na bezpečné miesto. Bez neho sa záloha nedá otvoriť ani obnoviť a nikto ti ho nevie zistiť.`,create:`Vytvoriť zálohu`,creating:`Vytváram zálohu…`,created:`Záloha je hotová. Ulož si ju mimo telefónu.`,failed:`Zálohu sa nepodarilo vytvoriť. Skús to znova.`,fileName:`zaloha`,restoreTitle:`Obnoviť zo zálohy`,restore:`Vybrať súbor so zálohou`,restoreHint:`Napríklad v novom telefóne. Záznamy v tomto telefóne sa nahradia záznamami zo zálohy.`,restoreLead:`Záloha je zašifrovaná. Zadaj heslo, ktoré si k nej zvolil/a.`,restoreLeadDate:`Záloha z {date} je zašifrovaná. Zadaj heslo, ktoré si k nej zvolil/a.`,restoreSubmit:`Obnoviť`,reminderTitle:`Pripomienka`,reminder:`Pripomínať zálohu`,reminderHint:`Raz za mesiac sa na obrazovke Dnes ukáže krátka pripomienka.`,privacy:`Záloha nikam neodchádza sama. Kam ju uložíš, rozhoduješ ty, a bez hesla je jej obsah nečitateľný.`,errors:{tooShort:`Heslo musí mať aspoň {n} znakov.`,mismatch:`Heslá sa nezhodujú.`,passwordRequired:`Zadaj heslo k zálohe.`,wrongPassword:`Nesprávne heslo alebo poškodený súbor.`,invalidFile:`Tento súbor sa nedá načítať. Vyber zálohu alebo export z appky.`,newerVersion:`Táto záloha je z novšej verzie appky. Aktualizuj appku a obnov ju znova.`},card:{title:`Zálohuj si svoje záznamy`,textNever:`Záznamy sú iba v tomto telefóne. Ak ho stratíš alebo vymeníš, bez zálohy o ne prídeš.`,textOld:`Posledná záloha je z {date}. Vytvor si novú, nech máš v bezpečí aj novšie záznamy.`,action:`Vytvoriť zálohu`,later:`Teraz nie`}},plural:{entries:{one:`{n} záznam`,few:`{n} záznamy`,other:`{n} záznamov`},times:{other:`{n}×`},days:{one:`{n} deň`,few:`{n} dni`,other:`{n} dní`},weeks:{one:`{n} týždeň`,few:`{n} týždne`,other:`{n} týždňov`},months:{one:`{n} mesiac`,few:`{n} mesiace`,other:`{n} mesiacov`},years:{one:`{n} rok`,few:`{n} roky`,other:`{n} rokov`},episodes:{one:`{n} epizóda`,few:`{n} epizódy`,other:`{n} epizód`},hardDays:{one:`{n} ťažší deň`,few:`{n} ťažšie dni`,other:`{n} ťažších dní`}},community:{title:`Komunita a podpora`,lead:`Nemusíš na to byť osamote. V našej komunite zdieľame vlastné skúsenosti, podržíme sa a odporúčame si špecialistov.`,facebook:`Facebook skupina`,facebookHint:`Skúsenosti, otázky a vzájomná podpora`,instagram:`Instagram`,instagramHint:`@vestibularnamigrena`,discord:`Discord`,discordHint:`Rozhovory s komunitou v reálnom čase`,webTitle:`Články na našom webe`,webText:`O diagnóze, liečbe a živote s vestibulárnou migrénou.`,webUrl:`www.vestibularnamigrena.sk`,external:`(otvorí sa mimo aplikácie)`,note:`Skúsenosti a odporúčania z komunity nenahrádzajú vyšetrenie a radu lekára.`,soon:`Čoskoro`},episodeTypes:{vestibular:`Vestibulárna epizóda`,migraine_headache:`Migréna s bolesťou hlavy`,migraine_no_headache:`Migréna bez bolesti hlavy`,other:`Iné`,unsure:`Neviem`},relief:{rest:`Oddych`,sleep:`Spánok`,dark_room:`Oddych v tmavej miestnosti`,hydration:`Pitie vody`,relaxation:`Relaxácia alebo meditácia`,cold_compress:`Studený obklad`,warm_compress:`Teplý obklad`,shower:`Sprcha`,food:`Jedlo`,other:`Iné`},impact:{work_study:`Práca alebo štúdium`,sleep:`Spánok`,daily_activities:`Bežné denné činnosti`,social:`Kontakt s rodinou a priateľmi`,movement:`Pohyb a fyzické aktivity`,rest:`Oddych a relaxácia`,other:`Iné`,none:`Epizóda ma výrazne neobmedzila`},episodeFlow:{typeTitle:`Aká to bola epizóda?`,typeLead:`Všetko v podrobnostiach je nepovinné. Čo nevieš, preskoč a doplň neskôr.`,intensity:`Celková intenzita`,symptomsTitle:`Aké príznaky sa objavili?`,symptomsLead:`Vyber jeden alebo viac. Silu každého zadáš v ďalšom kroku.`,date:`Dátum`,time:`Čas`,triggersTitle:`Čo ju mohlo spustiť?`,triggersLead:`Vyber všetko, čo sa ťa týka. Ide o možné súvislosti, nie potvrdené príčiny. Môžeš vybrať viac možností.`,triggerOther:`Iný spúšťač`,triggerOtherPlaceholder:`Napíš, čo to bolo`,medsTitle:`Užil/a si počas epizódy liek?`,medsLead:`Označ lieky a kedy si ich užil/a. Užitie sa uloží aj do Liečby.`,medsLogged:`Už zaznamenané počas epizódy`,medsNone:`Zatiaľ nemáš pridané žiadne lieky.`,addMed:`Pridať liek`,medsWhen:`Kedy si ich užil/a`,medsOutside:`Čas musí byť počas epizódy.`,helped:`Pomohlo to?`,reliefTitle:`Čo ti prinieslo úľavu?`,summaryTitle:`Zhrnutie epizódy`,summaryLead:`Skontroluj, čo si vyplnil/a. Každú časť môžeš upraviť.`,summaryMissing:`Ešte môžeš doplniť`,save:`Uložiť epizódu`,saved:`Epizóda bola uložená`,edit:`Upraviť`,sections:{type:`Typ`,intensity:`Intenzita`,time:`Čas`,symptoms:`Príznaky`,triggers:`Možné spúšťače`,meds:`Lieky`,helped:`Pomohlo to?`,relief:`Úľava`,impact:`Obmedzenia`},reliefLead:`Môžeš vybrať viac možností.`,reliefOther:`Čo ešte ti pomohlo?`,reliefOtherPlaceholder:`Napíš, čo to bolo`,impactTitle:`Ako ťa epizóda obmedzila?`,impactLead:`V ktorých oblastiach každodenného života si pocítil/a jej vplyv?`,impactOther:`Čo ešte epizóda ovplyvnila?`,impactOtherPlaceholder:`Napíš, čo to bolo`},symptomInfo:{open:`Čo znamená {name}?`,close:`Rozumiem`,dizziness:`Pocit omámenia, neistoty alebo straty rovnováhy. Môžeš mať pocit, že sa ti zatočila hlava, cítiš sa na odpadnutie alebo nemáš istotu pri státí či chôdzi.`,vertigo:`Falošný pocit pohybu, hoci sa v skutočnosti nehýbeš. Môžeš mať pocit, že sa točíš ty, že sa otáča miestnosť alebo že sa okolité prostredie pohybuje.`,brain_fog:`Stav, pri ktorom máš problém sústrediť sa, jasne premýšľať alebo spracovávať informácie. Môžeš mať pocit, že ti to myslí pomalšie, ťažšie hľadáš slová alebo sa horšie orientuješ v myšlienkach.`,visual_sensitivity:`Zvýšená citlivosť na vizuálne podnety. Pohybujúce sa obrazy, rušné prostredie, vzory, davy ľudí alebo obrazovky môžu vyvolávať závrat, nevoľnosť alebo dezorientáciu.`,tinnitus:`Vnímanie zvuku v jednom alebo oboch ušiach, hoci v okolí nie je žiadny skutočný zdroj zvuku. Môže ísť o pískanie, hučanie, bzučanie alebo šumenie.`,rocking:`Pocit, akoby sa tvoje telo alebo okolie jemne hojdalo, kolísalo zo strany na stranu alebo pohybovalo dopredu a dozadu, podobne ako na lodi.`,floating:`Pocit, akoby si sa nadnášal/a, nemal/a pevný kontakt so zemou.`,unsteadiness:`Pocit neistoty pri státí alebo chôdzi, akoby si strácal/a rovnováhu, vychyľoval/a sa do strán alebo potreboval/a oporu pri pohybe.`},quickIntake:{title:`Ktorý liek si užil/a?`,lead:`Vyber liek. V ďalšom kroku zadáš čas a či ti pomohol.`,add:`Pridať nový liek`,empty:`Zatiaľ nemáš pridané žiadne lieky. Pridaj liek a potom zaznamenáš jeho užitie.`},plus:JSON.parse(`{"name":"Vestie+","lockedLabel":"Súčasť Vestie+","tryChip":"Vyskúšať","demoChip":"Ukážka","features":{"weather":{"title":"Počasie a tlak","text":"Počasie a atmosférický tlak sa automaticky zaznamenávajú podľa tvojej polohy."},"forecast":{"title":"Upozornenia na počasie","text":"Vopred ťa upozorní na predpovedané výraznejšie zmeny atmosférického tlaku, teploty alebo vlhkosti."},"finder":{"title":"Hľadač súvislostí","text":"Porovná dni s ťažkosťami a bez nich a ukáže možné súvislosti."},"stats":{"title":"Pokročilé štatistiky","text":"Sleduj dlhodobý vývoj, časy výskytu epizód a prehľad užívania liekov po mesiacoch."},"health":{"title":"Prepojenie s aplikáciami zdravia","text":"Automatické zaznamenávanie spánku, krokov a tréningov cez Apple Zdravie alebo Health Connect vrátane údajov z podporovaných hodiniek."},"report":{"title":"Rozšírený report pre lekára","text":"Rozšírený report s údajmi o počasí, atmosférickom tlaku, fyzickej aktivite a možných súvislostiach."}},"periods":{"d90":"90 dní","d180":"6 mesiacov","d365":"12 mesiacov"},"plans":{"yearly":{"name":"Ročne","per":"ročne","hint":"V prepočte {monthly} mesačne, {trial} zadarmo","hintNoTrial":"V prepočte {monthly} mesačne","badge":"Ušetríš {percent} %","cta":"Vyskúšať {trial} zadarmo","ctaNoTrial":"Predplatiť za {price} ročne","terms":"{trial} zadarmo, potom {price} ročne. Predplatné sa obnovuje automaticky. Ak ho v {store} zrušíš pred koncom skúšky, nič nezaplatíš.","termsNoTrial":"{price} ročne. Predplatné sa obnovuje automaticky, kým ho v {store} nezrušíš."},"monthly":{"name":"Mesačne","per":"mesačne","hint":"{trial} zadarmo, zrušíš kedykoľvek","hintNoTrial":"Zrušíš kedykoľvek","cta":"Vyskúšať {trial} zadarmo","ctaNoTrial":"Predplatiť za {price} mesačne","terms":"{trial} zadarmo, potom {price} mesačne. Predplatné sa obnovuje automaticky. Ak ho v {store} zrušíš pred koncom skúšky, nič nezaplatíš.","termsNoTrial":"{price} mesačne. Predplatné sa obnovuje automaticky, kým ho v {store} nezrušíš."}},"paywall":{"title":"Viac porozumenia vďaka rozšírenému sledovaniu","lead":"Vestie+ ti prináša sledovanie počasia a tlaku, upozornenia na zmeny počasia a podrobnejšie súvislosti v tvojich záznamoch. Základný denník zostáva zadarmo.","choosePlan":"Vyber si predplatné","renewal":"Platbu vybaví {store}. Predplatné môžeš kedykoľvek zrušiť v nastaveniach {store}. Prístup k Vestie+ ti zostane do konca zaplateného obdobia.","withdrawal":"Od zmluvy môžeš odstúpiť bez uvedenia dôvodu do 14 dní od začiatku predplatného, aj keď začína skúšobnou dobou, a vrátime ti celú sumu. Odstúpiť môžeš priamo v appke (Vestie+ → Odstúpiť od zmluvy tu). Podrobnosti sú v podmienkach používania.","loadingPrices":"Načítavam ceny…","pricesFailed":"Ceny sa nepodarilo načítať. Skontroluj pripojenie na internet a skús to znova.","retryPrices":"Skúsiť znova","restored":"Predplatné už máš, Vestie+ je znova zapnuté.","freeTitle":"Zadarmo ostáva všetko, čo máš teraz","freeText":"Záznamy príznakov a epizód, kalendár, prehľady, lieky, spánok aj report pre lekára. Keď predplatné skončí, tvoje záznamy ostanú tvoje.","demoNote":"V tomto náhľade sa nič neplatí.","restore":"Obnoviť nákup","disclaimer":"Vestie+ nie je zdravotnícka pomôcka. Neposkytuje diagnózu ani liečbu a nenahrádza konzultáciu s lekárom.","notNow":"Teraz nie","nativeOnly":"Nákup bude dostupný v mobilnej appke.","nothingToRestore":"Nenašli sme žiadny nákup na obnovenie.","purchaseFailed":"Nákup sa nepodaril. Skús to znova neskôr.","purchasePending":"Platba sa ešte spracúva. Vestie+ sa zapne, keď ju obchod potvrdí."},"manage":{"title":"Tvoje Vestie+","lead":"Všetko na jednom mieste. Každú funkciu môžeš kedykoľvek zapnúť alebo vypnúť.","welcomeTitle":"Vitaj vo Vestie+","welcomeLead":"Počasie a tlak si zapni ako prvé. Ostatné funkcie nájdeš v zozname.","features":"Funkcie","subscription":"Predplatné","trialUntil":"Skúšobná doba do {date}","since":"Aktívne od {date}","cancel":"Zrušiť predplatné","cancelHint":"Tvoje záznamy ostanú v telefóne.","cancelTitle":"Zrušiť Vestie+?","cancelText":"Funkcie Vestie+ sa uzamknú. Všetky záznamy vrátane zapísaného počasia a tlaku ti ostanú.","cancelConfirm":"Zrušiť predplatné","cancelled":"Vestie+ je zrušené","toToday":"Pokračovať na Domov","enableWeather":"Zapnúť počasie a tlak","manageStore":"Spravovať v Google Play","manageStoreHint":"Tu predplatné zmeníš alebo zrušíš. Tvoje záznamy ostanú v telefóne."},"withdraw":{"row":"Odstúpiť od zmluvy tu","rowHint":"Bez uvedenia dôvodu do {date}. Vrátime ti celú sumu.","title":"Odstúpenie od zmluvy","lead":"Od zmluvy o predplatnom Vestie+ môžeš odstúpiť bez uvedenia dôvodu do {date}. Vyplň údaje a potvrď. Appka pripraví oznámenie a otvorí ho v tvojom e-maile, odkiaľ ho odošleš.","leadLate":"Lehota 14 dní na odstúpenie bez uvedenia dôvodu už uplynula. Ak si myslíš, že máš na odstúpenie nárok z iného dôvodu, vyplň údaje a napíš nám.","name":"Meno a priezvisko","order":"Číslo objednávky","orderHint":"Nájdeš ho v potvrdení od Google Play, začína sa GPA.","email":"E-mail na potvrdenie","emailHint":"Na túto adresu ti potvrdíme, že sme oznámenie dostali.","note":"Oznámenie pôjde z tvojho e-mailu na {address}. Po odstúpení ti vrátime celú sumu cez Google Play do 14 dní a Vestie+ sa vypne. Tvoje záznamy ostanú v telefóne.","submit":"Potvrdiť odstúpenie od zmluvy","errors":{"name":"Zadaj meno a priezvisko.","order":"Zadaj číslo objednávky.","email":"Zadaj platnú e-mailovú adresu."},"mailSubject":"Odstúpenie od zmluvy – Vestie+","mailBody":"Týmto odstupujem od zmluvy o predplatnom Vestie+.\\n\\nMeno a priezvisko: {name}\\nČíslo objednávky: {order}\\nE-mail na potvrdenie: {email}\\nDátum a čas: {time}","sentTitle":"Oznámenie je pripravené v tvojom e-maile","sentText":"Odošli ho z e-mailovej appky, ktorá sa otvorila. Odstúpenie platí dňom odoslania a doručenie ti potvrdíme na {email}.","sentFallback":"Ak sa e-mail neotvoril, pošli tento text na {address}","copy":"Kopírovať text","copied":"Text je skopírovaný","demoNote":"V tomto náhľade sa nič neodosiela.","done":"Späť na Vestie+"},"charts":{"legend":"Vysvetlivky grafu","showTable":"Zobraziť ako tabuľku"},"weather":{"hpa":"{value} hPa","temps":"{min} až {max} °C","changeShort":"{value} oproti predošlému dňu","conditions":{"clear":"Jasno","partly":"Polojasno","cloudy":"Oblačno","fog":"Hmla","rain":"Dážď","snow":"Sneh","storm":"Búrka"},"offLead":"Zmeny počasia a atmosférického tlaku môžu súvisieť so zhoršením tvojich ťažkostí. Aplikácia ich bude zaznamenávať, aby si mohol/mohla sledovať možné súvislosti.","factRecord":"Od zapnutia sa zapisuje tlak, teplota, vlhkosť a počasie každého dňa. Zapísané dni ostávajú v telefóne. Dni pred zapnutím sa nedopĺňajú.","factLocation":"Poskytovateľovi počasia sa pri každej aktualizácii odošle iba poloha zaokrúhlená na približne 10 km.","factHealth":"Nikdy sa neodosiela nič o tvojom zdraví.","factOff":"Kedykoľvek to môžeš vypnúť.","enable":"Povoliť polohu a zapnúť","today":"Dnes","condition":"Počasie","temperature":"Teplota","humidity":"Vlhkosť","humidityValue":"Vlhkosť {value} %","forecastWord":"predpoveď","estimateWord":"odhad","episodeWord":"epizóda","chartTitle":"Tlak v čase","rangeDays":"{n} dní","chartLabel":"Graf barometrického tlaku za posledných {n} dní a predpoveď na najbližšie dni. Bodky označujú dni s epizódou.","legendPressure":"Tlak","legendForecast":"Predpoveď","legendEpisode":"Deň s epizódou","colDay":"Deň","colPressure":"Tlak","colChange":"Zmena","colEpisode":"Epizóda","forecastTitle":"Predpoveď na najbližšie dni","linkTitle":"Tlak a tvoje záznamy","openFinder":"Otvoriť hľadač súvislostí","myLocation":"Podľa tvojej polohy","noData":"Pre dnešok zatiaľ nie sú údaje o počasí.","settings":"Nastavenia","updateLocation":"Aktualizovať teraz","turnOff":"Vypnúť počasie a tlak","turnOffHint":"Zapísané dni ostanú.","turnOffTitle":"Vypnúť počasie a tlak?","turnOffText":"Appka prestane zisťovať počasie a zabudne tvoju polohu. Dni, ktoré sa už zapísali, ostanú.","attribution":"Údaje o počasí poskytuje OpenWeather","disclaimer":"Údaje sú z meteorologických modelov pre tvoju približnú polohu a predpoveď sa môže líšiť od skutočnosti. Dni, keď si appku neotvoril/a, sú odhad z poslednej predpovede. Súvislosť s počasím nie je dôkazom príčiny.","loading":"Zisťujem počasie…","enabled":"Počasie a tlak sú zapnuté","errors":{"denied":"Bez povolenia polohy to nepôjde. Povoľ ju v nastaveniach telefónu alebo prehliadača.","unavailable":"Polohu sa nepodarilo zistiť. Skús to znova.","network":"Počasie sa nepodarilo načítať. Skontroluj pripojenie na internet.","setup":"Počasie v tejto verzii zatiaľ nie je nastavené. Skús to neskôr."},"episodeDay":"Počasie a aktivita v ten deň","updated":"Aktualizované {time}. Údaje sa obnovujú samy.","stale":"Bez pripojenia. Posledné údaje sú z {time}.","bands":{"low":"Nízky tlak","normal":"Bežný tlak","high":"Vyšší tlak","veryHigh":"Veľmi vysoký tlak"},"bandRanges":{"low":"menej ako 1000 hPa","normal":"1000 až 1020 hPa","high":"1021 až 1029 hPa","veryHigh":"1030 hPa a viac"},"bandTitle":"Čo znamenajú hodnoty tlaku","bandNow":"teraz","bandNote":"Hodnoty sú orientačné. Tlak je prepočítaný na hladinu mora rovnako ako v predpovediach počasia, preto sa dá porovnať aj vo vyššej nadmorskej výške. Okrem samotnej hodnoty appka ukazuje aj zmenu oproti predošlému dňu a hľadač súvislostí porovnáva dni, keď sa tlak zmenil o 6 hPa a viac."},"health":{"connected":"Prepojené","notConnected":"Neprepojené","stepsValue":"{value} krokov","lead":"Spánok, kroky a tréningy sa môžu načítavať priamo z telefónu. Zapisujú tam aj hodinky ako Apple Watch, Garmin, Samsung či Fitbit.","providers":{"apple_health":"Apple Zdravie","health_connect":"Health Connect"},"typesTitle":"Čo načítavať","types":{"sleep":"Spánok","steps":"Kroky","workouts":"Tréningy"},"privacy":"Údaje sa iba načítajú do tohto telefónu a nikam sa neodosielajú. Ručne zapísaný spánok sa neprepíše.","lastSync":"Naposledy načítané {time}","stepsToday":"Kroky dnes","sleepToday":"Spánok dnes v noci","stepsWeek":"Kroky za posledných 7 dní","sleepWeek":"Spánok za posledných 7 nocí (hodiny)","noValue":"bez záznamu","disconnect":"Odpojiť","disconnectTitle":"Odpojiť zdravotnú appku?","disconnectText":"Appka prestane načítavať nové údaje. To, čo sa už načítalo, ostane v tvojich záznamoch.","revokeHint":{"health_connect":"Povolenie na čítanie údajov zrušíš v nastaveniach Health Connect.","apple_health":"Povolenie na čítanie údajov zrušíš v appke Zdravie v časti Zdieľanie."},"disconnectedToast":"Odpojené","openSettings":"Nastavenia","connectedToast":"Prepojené","connectTo":{"apple_health":"Prepojiť s Apple Zdravím","health_connect":"Prepojiť s Health Connect"},"browserOnly":"Webový prehliadač k týmto údajom nemá prístup. Prepojenie funguje iba v mobilnej appke, kde sa údaje po povolení načítavajú samy. V tomto náhľade preto nič neukazujeme, aby tu neboli vymyslené čísla.","errors":{"denied":"Bez povolenia sa údaje načítať nedajú. Povoľ ich v nastaveniach telefónu.","unavailable":"Zdravotná appka nie je v tomto telefóne dostupná. Na Androide si nainštaluj Health Connect."},"typesHint":"Pri tréningoch sa načíta iba druh a trvanie, napríklad bicykel, hokej alebo posilňovanie. Chôdza sa počíta v krokoch.","workouts":{"cycling":"Bicykel","running":"Beh","walking":"Chôdza","hiking":"Turistika","swimming":"Plávanie","strength":"Posilňovanie","hockey":"Hokej","soccer":"Futbal","basketball":"Basketbal","volleyball":"Volejbal","teamSport":"Kolektívny šport","tennis":"Tenis","racket":"Raketový šport","yoga":"Joga a strečing","dance":"Tanec","skiing":"Lyžovanie","skating":"Korčuľovanie","climbing":"Lezenie","rowing":"Veslovanie","cardio":"Kardio","combat":"Bojové športy","other":"Iná aktivita"},"workoutsWeek":"Tréningy za posledných 7 dní","workoutsNone":"Za posledných 7 dní tu nie je žiadny tréning."},"finder":{"ofDays":"{a} z {b}","percent":"{n} %","factors":{"pressure_drop":"Deň s poklesom tlaku o 6 hPa a viac","pressure_rise":"Deň s nárastom tlaku o 6 hPa a viac","humid":"Deň s vysokou vlhkosťou (85 % a viac)","temp_swing":"Deň so zmenou teploty o 8 °C a viac","short_sleep":"Noc kratšia ako 6 hodín","poor_sleep":"Noc so zlou kvalitou spánku","high_steps":"Deň s 12 000 krokmi a viac","low_steps":"Deň s menej ako 3 000 krokmi","period":"Obdobie okolo menštruácie","workout":"Deň s tréningom 30 min a viac"},"strength":{"strong":"Výraznejší rozdiel","possible":"Možná súvislosť","none":"Bez výrazného rozdielu","few":"Málo údajov"},"fewFactor":"Zatiaľ to nastalo {n}-krát, na porovnanie je to málo.","after":"Ťažší deň potom","otherDays":"V ostatných dňoch","lead":"Aplikácia porovnáva, ako často nasleduje ťažší deň po dni, keď sa daný faktor objavil, a po dni, keď sa neobjavil. Za ťažší deň sa považuje deň s epizódou alebo príznakom s intenzitou aspoň {intensity}.","summary":"V tomto období je to {hard} z celkom {days}.","notEnough":"Zatiaľ máš zaznamenané {days} a {hard}. Na porovnanie treba aspoň 30 dní a 5 ťažších dní.","moreTitle":"Čo ešte porovnať","more":{"weather":"Zapni ich a porovnáme aj tlak, vlhkosť a teplotu.","health":"Prepoj ho a porovnáme aj kroky."},"loggedTitle":"Čo si sám/sama označil/a pri epizódach","loggedLead":"Tieto spúšťače zapisuješ iba pri epizódach, preto sa nedajú porovnať s dňami bez ťažkostí. Ukazujeme iba ich počet.","howTitle":"Ako to počítame","howText":"Ťažší deň hľadáme v ten istý deň a na druhý deň (pri krokoch iba na druhý deň). Deň bez záznamu sa počíta ako deň bez ťažkostí, chýbajúci spánok alebo tlak sa nedopĺňa. Rozdiel označíme až vtedy, keď je malá šanca, že vznikol náhodou.","disclaimer":"Možná súvislosť nie je dôkazom príčiny. Výsledok sa môže zmeniť s ďalšími záznamami. Ak chceš niečo zmeniť v liečbe, poraď sa s lekárom.","toForecast":"Zapnúť upozornenia na počasie","moreRecords":"Čím viac záznamov pridáš, tým lepšie môže aplikácia rozpoznať opakujúce sa súvislosti medzi tvojimi príznakmi a možnými spúšťačmi. Výsledky preto ber ako orientačné, najmä ak máš zatiaľ málo záznamov."},"forecast":{"today":"Dnes","tomorrow":"Zajtra","signals":{"pressure_drop":"Hlásia pokles tlaku o {amount} hPa.","pressure_rise":"Hlásia nárast tlaku o {amount} hPa.","humid":"Hlásia vysokú vlhkosť ({amount} %).","temp_swing":"Hlásia zmenu teploty o {amount} °C."},"evidence":"Z tvojich záznamov: pri podobných dňoch bol ťažší deň v {a} z {b} prípadov, pri ostatných v {c} z {d}.","evidenceFew":"Na porovnanie s tvojimi záznamami ich zatiaľ nie je dosť.","evidenceNone":"V tvojich záznamoch sa pri tom zatiaľ rozdiel neukazuje.","levels":{"change":"Hlásia výraznú zmenu","calm":"Bez výrazných zmien"},"cardTitle":"Zmena počasia · {day}","factWeather":"Sleduj predpoveď atmosférického tlaku, vlhkosti a teploty na najbližšie dni.","factRecords":"Vyber si, na ktoré zmeny ťa má aplikácia upozorniť.","factNotify":"Upozornenie dostaneš večer pred dňom, na ktorý sa predpovedá vybraná zmena.","factOff":"Upozornenia môžeš kedykoľvek vypnúť, ak ti nevyhovujú.","offLead":"Aplikácia ťa vopred upozorní na výrazné zmeny počasia očakávané na nasledujúci deň. Vyberieš si, na ktoré zmeny chceš byť upozornený/á.","disclaimer":"Upozornenia hlásia iba predpoveď počasia z meteorologických modelov pre tvoju približnú polohu a skutočnosť sa môže líšiť. Nehovoria nič o tom, ako sa budeš cítiť, a nie sú zdravotnou radou. Lieky ani liečbu podľa nich nemeň.","enable":"Zapnúť upozornenia na počasie","calmText":"Žiadna zo sledovaných zmien sa nehlási.","lead":"Výrazné zmeny počasia na dnes a najbližšie tri dni.","weatherOff":"Zapni počasie a tlak","weatherOffHint":"Upozornenia potrebujú predpoveď počasia.","notifyTitle":"Upozornenia","notify":"Upozorniť ma vopred","notifyHint":"Večer pred dňom s vybranou zmenou. Vychádza z predpovede pri poslednom otvorení appky.","notifyTime":"Kedy ma upozorniť","previewLabel":"Takto bude vyzerať upozornenie v telefóne:","disable":"Vypnúť upozornenia na počasie","staleForecast":"Predpoveď je staršia ako deň, preto na ňu teraz neupozorňujeme. Skontroluj pripojenie na internet.","nothingToNotify":"Podľa aktuálnej predpovede teraz nie je na čo upozorniť.","alertsTitle":"Na čo ma upozorniť","alerts":{"pressure_drop":"Pokles tlaku","pressure_rise":"Nárast tlaku","humid":"Vysoká vlhkosť","temp_swing":"Prudká zmena teploty"},"alertsNone":"Vyber aspoň jednu zmenu, inak appka nebude na nič upozorňovať."},"stats":{"empty":"Štatistiky sa skladajú z tvojich záznamov. Keď budeš mať zapísané príznaky alebo epizódy, uvidíš ich tu.","noCompare":"bez porovnania","same":"rovnako ako predtým","less":"o {value} menej","more":"o {value} viac","compareTitle":"Oproti predošlému obdobiu","compareLead":"Posledných {days} oproti rovnako dlhému obdobiu predtým.","symptomDaysValue":"dni s príznakmi: {n}","trendTitle":"Dni s príznakmi po mesiacoch","trendLabel":"Stĺpcový graf počtu dní s príznakmi za posledných 12 mesiacov.","colMonth":"Mesiac","rhythmTitle":"Kedy epizódy začínajú","rhythmLead":"Spolu {n} podľa dňa v týždni a časti dňa.","parts":{"morning":"Ráno","afternoon":"Popol.","evening":"Večer","night":"Noc"},"cycleStart":"Prvý deň menštruácie","cycleOffset":"Deň {n} od začiatku","cycleTitle":"Epizódy okolo menštruácie","cycleLead":"Z {n} zapísaných menštruácií. Ďalšiu menštruáciu appka nepredpovedá.","colCycleDay":"Deň","reliefTitle":"Čo najčastejšie prinieslo úľavu","impactTitle":"Čo epizódy najčastejšie obmedzili","medTitle":"Užívanie liekov po mesiacoch","medLead":"Koľkokrát si liek zapísal/a v jednotlivých mesiacoch zvoleného obdobia.","medSince":"Užívaš od {date}","medDisclaimer":"Je to iba prehľad tvojich záznamov, nie hodnotenie lieku. O liečbe sa rozhoduj so svojím lekárom.","medTotal":"Spolu {count}, naposledy {date}","colCount":"Počet"},"demoSymptoms":"V tejto ukážke sú príznaky a epizódy vymyslené, počasie je skutočné. Súvislosť s tlakom sa preto ukáže až z tvojich vlastných záznamov."}`),failure:{title:`Túto obrazovku sa nepodarilo zobraziť`,text:`Tvoje záznamy ostali uložené. Skús to znova. Ak to nepomôže, vytvor si zálohu alebo obnov údaje zo zálohy.`,retry:`Skúsiť znova`,backup:`Záloha a obnovenie`,home:`Na Domov`},notifications:{channelReminders:`Denná pripomienka`,channelForecast:`Zmeny počasia`,reminderBody:`Ako sa dnes máš? Zapíš si, ako sa cítiš.`,denied:`Telefón upozornenia nepovolil. Zapneš ich v nastaveniach telefónu.`}},en:{app:{name:`Vestie`,logo:`Vestie – Vestibular Migraine`},common:{continue:`Continue`,skip:`Skip`,back:`Back`,save:`Save`,cancel:`Cancel`,close:`Close`,yes:`Yes`,undo:`Undo`,optional:`optional`,on:`On`,off:`Off`,stepOf:`Step {step} of {total}`,edit:`Edit`,delete:`Delete`},language:{title:`Choose your language`,sk:`Slovenčina`,en:`English`},welcome:{title:`Your symptom diary`,text:`Log symptoms, episodes, medication and sleep. The app arranges them into a calendar and insights and prepares a report you can show your doctor.`,cta:`Get started`},goals:{title:`What can the app help you with?`,lead:`Choose what matters to you. You can pick several options or continue without choosing.`,options:{symptoms:`Log symptoms`,triggers:`Log possible triggers`,patterns:`Understand my difficulties`,doctor:`Prepare an overview for my doctor`}},condition:{title:`What would you like to track?`,lead:`This only tailors the content – it is not a diagnosis. You can change it at any time.`,options:{vestibular_migraine:`Vestibular migraine`,migraine:`Migraine`,other_vestibular:`Other vestibular condition`,unsure:`I'm not sure`}},cycle:{title:`Would you like to track your menstrual cycle?`,lead:`This feature is optional. You can turn it on or off later in settings.`,yes:`Yes`,no:`No`},medications:{title:`Would you like to add your medications?`,lead:`You can add medications you take preventively or for acute symptoms. You can skip this and add them later.`,add:`Add medications`,addAnother:`Add another medication`,added:`Added medications`,remove:`Remove medication {name}`,disclaimer:`The app does not recommend doses or change your treatment.`,types:{preventive:`Preventive`,acute:`Acute`}},medForm:{title:`New medication`,name:`Medication name`,namePlaceholder:`e.g. Betahistine`,nameRequired:`Please enter the medication name.`,type:`Type`,dose:`Dose`,dosePlaceholder:`e.g. 24 mg`,frequency:`Frequency`,frequencyPlaceholder:`e.g. twice a day`,note:`Note`,submit:`Save medication`,saved:`{name} was added`,startDate:`Started taking`,startDateHint:`Helps you and your doctor see since when you take the medication.`},reminders:{title:`Would you like to set a reminder?`,lead:`Every day, at a time you choose, we'll remind you to log your symptoms and how you feel.`,yes:`Yes`,no:`No, not now`,time:`When should we remind you?`,permission:`Your phone will then ask for permission to send notifications. You can turn the reminder off in your profile at any time.`},today:{greeting:`Hello`,greetingName:`Hello, {name}`,howAreYou:`How are you feeling today?`,noEntries:`You haven't logged any symptoms today yet.`,loggedToday:`Logged today`,addSymptom:`Add symptom`,startEpisode:`Start episode`,overview:`Today`,sleep:`Sleep`,meds:`Medications`,nothingYet:`Nothing yet`,entriesEmpty:`Nothing here yet. Add a symptom with the button above, start an episode in the middle of the bottom menu.`,symptomsToday:`Symptoms logged today`,intakeTitle:`Medication`,logIntake:`Log medication`,pressure:`Pressure`,steps:`Steps`,turnOn:`Turn on`,connect:`Connect`,mobileOnly:`In the mobile app`},episode:{title:`Episode`,ongoing:`Episode in progress`,statusOngoing:`In progress`,statusEnded:`Ended`,started:`Episode started`,startedAt:`Started`,endedAt:`Ended`,duration:`Duration`,since:`since {time}`,lasting:`lasting {duration}`,detailsLater:`You can add details now or at any time later. The episode stays saved even if you close the app.`,addDetails:`Add details`,finishLater:`Finish later`,end:`End episode`,endedToast:`Episode ended`,mistake:`Started it by mistake?`,cancel:`Cancel episode`,cancelledToast:`Episode cancelled`,delete:`Delete episode`,deleteTitle:`Delete this episode?`,deleteText:`The entry will be permanently removed from this device.`,deletedToast:`Episode deleted`,notFound:`This episode no longer exists.`,linkedSymptoms:`Symptoms logged during the episode`,linkedIntakes:`Medications taken during the episode`,editDetails:`Edit details`,saveLater:`Save and finish later`,savedLater:`The episode is saved. You can add details any time in its detail view.`,details:`Details`},duration:{underMinute:`less than a minute`,minutes:`{m} min`,hours:`{h} h`,hoursMinutes:`{h} h {m} min`},nav:{label:`Main navigation`,today:`Today`,calendar:`Calendar`,insights:`Insights`,treatment:`Treatment`,profile:`Profile`,startEpisode:`Start episode`},profile:{title:`Profile`,me:`My profile`,name:`Name`,namePlaceholder:`Optional`,nameHint:`Used only to greet you on the home screen.`,language:`Language`,tracking:`Tracking`,cycle:`Menstrual cycle`,reminders:`Daily reminder`,reminderTime:`Reminder time`,display:`Display`,privacy:`Privacy`,deleteAll:`Delete all data`,deleteAllTitle:`Delete all data?`,deleteAllText:`All entries, medications and settings on this device will be removed. This cannot be undone.`,deleteAllConfirm:`Yes, delete`,dev:`For development`,styleguide:`Design system`,saved:`Saved`,disclaimer:`This app is for personal tracking and is not a medical device. It does not provide a diagnosis or treatment and does not replace consulting a doctor.`,integrations:`Connections`,health:`Smartwatch and health data`,healthHint:`Sleep, steps and workouts from Apple Health or Health Connect, including your watch.`,comingSoon:`Coming soon`,demoReset:`Reset sample data`,demoResetTitle:`Reset sample data?`,demoResetText:`Sample entries for the last year will be restored. Entries you added yourself will stay.`,demoResetConfirm:`Reset`,demoResetDone:`Sample data has been reset`,onboardingAgain:`Go through the intro again`,logout:`Sign out`,logoutNoPinTitle:`Set a PIN first`,logoutNoPinText:`Without a PIN, anyone with your phone could open the app after you sign out. Once you set a PIN, we will sign you out right away.`,logoutNoPinConfirm:`Set a PIN`,appearance:`Appearance`,themes:{light:`Light`,dark:`Dark`,system:`Automatic`},demoSection:`App preview`,demoFill:`Filled app`,demoFillHint:`Turn off to see the empty app, as a new person would.`,demoFillOn:`Sample data is on`,demoFillOff:`Sample data is off, the app is empty`,weatherHint:`Pressure and weather for your location are recorded every day.`,demoPlus:`Vestie+ on`,demoPlusHint:`Switch to see the app with or without a subscription.`,plusActive:`My Vestie+`,plusTry:`Try Vestie+`,plusHint:`Weather and pressure, weather alerts, pattern finder and more.`},symptoms:{dizziness:`Dizziness`,vertigo:`Vertigo`,rocking:`Rocking / swaying`,floating:`Floating sensation`,unsteadiness:`Unsteadiness when walking`,nausea:`Nausea`,vomiting:`Vomiting`,light_sensitivity:`Sensitivity to light`,sound_sensitivity:`Sensitivity to sound`,visual_sensitivity:`Visual sensitivity`,tinnitus:`Tinnitus / ringing in the ears`,ear_pressure:`Ear pressure`,headache:`Headache`,brain_fog:`Brain fog`,fatigue:`Fatigue`,unknown:`Unknown symptom`},durations:{just_started:`Just started`,under_1h:`Less than 1 hour`,"1_3h":`1–3 hours`,"3_6h":`3–6 hours`,"6_12h":`6–12 hours`,over_12h:`More than 12 hours`,ongoing:`Still ongoing`,moment:`A moment (seconds to minutes)`},triggers:{poor_sleep:`Poor / insufficient sleep`,stress:`Stress`,skipped_meal:`Skipped meal`,dehydration:`Dehydration`,caffeine:`Caffeine`,alcohol:`Alcohol`,exertion:`Physical exertion`,illness:`Illness / infection`,visual_stimulation:`Visual stimulation`,screen_time:`Extended screen time`,weather_change:`Weather change`,menstrual_cycle:`Menstrual cycle`,travel:`Travel / motion`,other:`Other`,long_sleep:`Too much sleep`,bright_light:`Bright light / sunlight`,strong_smells:`Strong smells`,neck_pain:`Neck pain or tension`,allergy:`Allergy`},effects:{helped:`Helped`,partly:`Partly`,not_helped:`Didn't help`,unknown:`Not sure`},intensity:{none:`none`,mild:`mild`,moderate:`moderate`,severe:`severe`,notSet:`Not set`,value:`{value} – {level}`,highest:`highest intensity {value}`},log:{symptomsTitle:`Which symptoms are you logging?`,symptomsLead:`Choose one or more symptoms.`,search:`Search symptoms`,noMatch:`No symptom matches your search. You can add your own.`,custom:`Custom symptom`,customPlaceholder:`Type the symptom name`,customAdd:`Add`,continueCount:`Continue ({n})`,intensityTitle:`How intense is it?`,intensityLead:`0 = none, 10 = worst. The slider starts at 5 – move it to match how you feel. You can skip any symptom.`,clear:`Skip`,detailsTitle:`How long have these symptoms lasted?`,detailsLead:`Everything on this screen is optional.`,when:`When they started`,date:`Date`,time:`Time`,note:`Note`,linkEpisode:`Add to the ongoing episode`,save:`Save entry`,saved:`Entry saved`,whenToday:`Today at {time}`,whenOn:`{date} at {time}`,changeTime:`Change time`,clearLabel:`Skip intensity: {name}`,restore:`Rate intensity`},symptomLog:{title:`Symptoms`,duration:`Duration`,note:`Note`,episode:`Part of an episode`,openEpisode:`Open episode`,edit:`Edit entry`,delete:`Delete entry`,deleteTitle:`Delete this entry?`,deleteText:`The entry will be permanently removed from this device.`,deletedToast:`Entry deleted`,notFound:`This entry no longer exists.`},treatment:{title:`Treatment`,lead:`Your medications, when you take them and how they seem to help.`,preventive:`Preventive`,acute:`Acute`,add:`Add medication`,empty:`You haven't added any medications yet.`,noneOfType:`No medications in this group.`,lastTaken:`Last taken {when}`,neverTaken:`No intake logged yet`,disclaimer:`The app does not prescribe medications or suggest dose changes. Decide on treatment with your doctor.`,type:`Type`,dose:`Dose`,frequency:`Frequency`,note:`Note`,logIntake:`Log intake`,history:`Intake history`,historyEmpty:`You haven't logged any intake yet.`,taken:`Taken`,effectSummary:`Effect as you rated it`,edit:`Edit medication`,delete:`Remove medication`,deleteTitle:`Remove this medication?`,deleteText:`The medication and its whole intake history will be removed.`,deletedToast:`Medication removed`,notFound:`This medication no longer exists.`,inEpisode:`during an episode`,effectMissing:`effect not rated`,showAll:`Show full history ({n})`,hint:`Tap a medication to log when you take it and see how it helps you.`},intake:{title:`Medication intake`,editTitle:`Edit intake`,date:`Date`,time:`Time`,dose:`Dose`,effect:`Did it help?`,effectHint:`If you don't know yet, add it later.`,note:`Note`,save:`Save intake`,saved:`Intake saved`,delete:`Delete intake`,deleteTitle:`Delete this intake?`,deleteText:`The intake record will be permanently removed.`,deletedToast:`Intake deleted`,notFound:`This entry no longer exists.`},calendar:{title:`Calendar`,prev:`Previous month`,next:`Next month`,backToday:`Today`,legend:`Legend`,legendPeriod:`Period`,dayEmpty:`You have no entries on this day.`,addSymptom:`Add symptom`,period:`Period`,periodMark:`Log period on this day`,summaryEntries:`{n} entries`,summaryPeriod:`period`,summaryNone:`no entries`,selected:`selected day`,today:`today`,legendEpisode:`Day with an episode`,legendSymptoms:`Symptoms logged`,summaryEpisode:`episode`},insights:{title:`Insights`,periodLabel:`Period`,empty:`Insights are built from your entries. Once you've logged symptoms on several days, you'll see here what keeps coming back.`,overview:`Summary`,symptomDays:`Days with symptoms`,episodes:`Episodes`,avgIntensity:`Average intensity`,avgDuration:`Average episode duration`,noValue:`not entered`,topSymptoms:`Most frequent symptoms`,topSymptomsLead:`Number of entries in which the symptom appeared.`,topTriggers:`Most frequent possible triggers`,triggersEmpty:`You haven't logged any possible triggers yet. They will come with episode details.`,meds:`Medications`,medsEmpty:`You didn't log any medication intake in this period.`,interpretation:`A recorded connection is not proof of a cause. The overview only uses data you entered.`,report:`Create a report for your doctor`},report:{title:`Report for your doctor`,lead:`Choose a period. The report summarises your entries so you can show them to your doctor.`,custom:`Custom period`,from:`From`,to:`To`,create:`Create report`,invalidRange:`The “From” date must be on or before the “To” date.`,docTitle:`Recorded symptoms and treatment`,period:`Period`,created:`Created`,disclaimer:`Data recorded by the user in the Vestie app. This is not a diagnosis or a medical record.`,fewData:`Few entries were recorded in this period, so the overview may not be representative.`,summary:`Summary`,symptoms:`Most frequent symptoms`,triggers:`Recorded possible triggers`,meds:`Medications and effect as rated by the user`,sleep:`Sleep`,sleepNone:`No sleep was recorded in this period.`,cycle:`Menstrual cycle`,cycleDays:`Recorded period days`,notes:`Notes`,timeline:`Timeline`,colDate:`Date and time`,colEntry:`Entry`,colDetail:`Details`,none:`No entries.`,print:`Save as PDF`,printHint:`In the print window, choose “Save as PDF”.`,sleepQuality:`Sleep quality`,plusHint:`With Vestie+ the report also shows pressure during episodes, possible patterns and activity.`,weather:`Weather and pressure during episodes`,weatherSummary:`Episodes on days when pressure dropped by 6 hPa or more: {drops} of {total}.`,patterns:`Possible patterns from the entries`,patternsOther:`otherwise {a} of {b}`,patternsNote:`Number of harder days after a day with this factor. These are possible patterns from the user's entries over the past year, not proof of a cause.`,activity:`Activity`,avgSteps:`Average steps per day`,workoutDays:`Days with a workout`,workoutDaysValue:`{a} of {b}`,workoutTypes:`Most frequent workouts`},sleep:{title:`Sleep`,formTitle:`How did you sleep?`,lead:`Log how long you slept. Quality and a note are optional.`,date:`Day you woke up`,duration:`Sleep duration`,hours:`Hours`,minutes:`Minutes`,durationRequired:`Please enter how long you slept.`,quality:`Sleep quality`,qualities:{good:`Good`,fair:`Fair`,poor:`Poor`},note:`Note`,save:`Save sleep`,saved:`Sleep saved`,add:`Log sleep`,entry:`Sleep {duration}`,delete:`Delete sleep entry`,deleteTitle:`Delete this sleep entry?`,deleteText:`The entry will be permanently removed from this device.`,deletedToast:`Sleep entry deleted`,avg:`Average sleep`,nights:`Nights recorded`},consent:{title:`Your data stays on your phone`,lead:`Before you start, here is how we handle your data.`,updatedLead:`The privacy policy has changed. Please read it and confirm your consent again to keep using the app.`,factDevice:`Health entries are stored only on this phone.`,factNoServer:`The app has no online account, sends no health entries anywhere and uses no ads or analytics.`,factPin:`You will sign in with a PIN and your data will be encrypted.`,factControl:`You can export your data to a file or delete it permanently at any time.`,health:`I agree to the processing of my health data on this phone for personal tracking.`,age:`I am at least 16 years old.`,policyLink:`Read the privacy policy`,submit:`Agree and continue`,decline:`I don't agree`,declineTitle:`The app can't continue without your consent`,declineText:`Your entries stay on your phone. You can export them to a file or delete them permanently. Until you agree, the app does nothing with them.`},privacyPolicy:{title:`Privacy policy`,draft:`Draft`,version:`Version {version}`,draftNote:`Working draft for review. Before release it will be checked by a lawyer.`,controllerTitle:`Who is the controller`,controllerText:`The controller is IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, Slovakia, company ID (IČO) 47321547. Contact for personal data questions: support@vestibularnamigrena.sk.`,dataTitle:`What data the app processes`,dataText:`Only what you enter yourself: what you want to track (for example vestibular migraine), symptoms and their intensity, episodes and their triggers, medications and their effect, sleep, notes, optionally your menstrual cycle and a name for the greeting. With Vestie+ also weather and pressure for your approximate location and data from health apps, if you turn them on. This is health data, so we protect it specially.`,storageTitle:`Where your data is`,storageText:`Only on this phone. The app has no server or online account, sends no health entries anywhere and uses no advertising or analytics tools. The controller has no access to your data.`,purposeTitle:`What it is for`,purposeText:`For your personal tracking and for an overview or report you can show your doctor. The report is created on the phone and you decide who gets it. The app shows possible connections in your entries on the phone, but makes no automated decisions about you with legal or similarly significant effects.`,legalTitle:`Legal basis`,legalText:`We process health data on the basis of your explicit consent (Art. 9(2)(a) GDPR). You can withdraw it at any time in your Profile – your data will then be deleted. The app sends your location for weather on the basis of your consent, which you give by turning the feature on and withdraw by turning it off (Art. 6(1)(a) GDPR). We answer e-mails on the basis of our legitimate interest (Art. 6(1)(f) GDPR).`,rightsTitle:`Your rights`,rightsText:`You have the right to access your data, to have it corrected and erased, to restrict its processing, to data portability, to object and to withdraw your consent at any time. Your data exists only on your phone and we have no access to it, so you exercise most of these rights directly in the app: you can view, edit, export or permanently delete your data (Profile → Privacy). For anything else, we will help at support@vestibularnamigrena.sk. You also have the right to lodge a complaint with the Office for Personal Data Protection of the Slovak Republic, Hraničná 12, 820 07 Bratislava 27, dataprotection.gov.sk, or with the data protection authority in your country.`,securityTitle:`Security`,securityText:`You sign in to the app with a 6-digit PIN. While the PIN is on, your data on the phone is encrypted (AES-256) and unreadable without the PIN. If you forget the PIN, the data cannot be recovered.`,backupTitle:`Backup`,backupText:`Your data exists only on your phone and the app has no server. On Android it is not backed up to Google Drive. On iPhone it is part of your whole-phone backup in iCloud or on your computer, if you have it turned on. In Profile you can create a password-protected backup and save it wherever you like. We don't know your backup password, so we can't recover it either. When you set up a new phone, Android may transfer the app's data directly from the old phone (by cable or over Wi-Fi). If your PIN is on, the data stays encrypted both in phone backups and during a transfer. Without a backup or a transfer, your data is lost if you lose or change your phone.`,ageTitle:`Age`,ageText:`The app is intended for people aged 16 and over.`,changesTitle:`Changes to this policy`,changesText:`We will let you know about changes directly in the app.`,weatherTitle:`Weather and pressure (Vestie+)`,weatherText:`If you turn this feature on, each time you open the app it sends your location, rounded to about 10 km, to the weather provider to get real weather and pressure. The provider is OpenWeather Ltd., 30 St Mary Axe, London, United Kingdom. The EU has an adequacy decision for the United Kingdom. The provider technically also sees your IP address, as with any internet request. According to its policy, it does not store the IP address or location from these requests. Nothing about your health is sent. You can turn this off at any time.`,healthTitle:`Health apps connection (Vestie+)`,healthText:`If you connect Apple Health or Health Connect, the app only reads selected data from them (sleep, steps and workouts, for workouts only the type, time and duration) into this phone. It writes nothing to them, sends nothing anywhere, and you can remove the connection at any time.`,purchasesTitle:`Subscription`,purchasesText:`Payment for Vestie+ is handled by Google or Apple as a separate controller under their own terms and policies. The app only learns whether the subscription is active. We never see your payment details.`,linksTitle:`Links to the website and community`,linksText:`The app contains links to the vestibularnamigrena.sk website and to the community on Facebook, Instagram and Discord. It sends them nothing. When you open a link, you leave the app and the rules and policies of that service apply.`,retentionTitle:`How long`,retentionText:`Your entries stay on the phone until you delete them, withdraw your consent or uninstall the app. You keep any backup yourself and decide when to delete it.`,contactTitle:`When you write to us`,contactText:`If you write to support@vestibularnamigrena.sk, we process your e-mail address and the content of your message only to reply to you. We keep the message as long as needed to deal with it and then delete it. Please do not include more health information than necessary.`},terms:{title:`Terms of use`,draft:`Draft`,version:`Version {version}`,draftNote:`Working draft for review. Before release it will be checked by a lawyer.`,providerTitle:`Who provides the app`,providerText:`The Vestie app and the Vestie+ subscription are provided by IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, Slovakia, company ID 47321547, registered in the Commercial Register of the City Court Bratislava III, Section Sro, Insert No. 90506/B. Contact: support@vestibularnamigrena.sk.
These terms govern the use of the app and the Vestie+ subscription. How we handle your data is described in the separate Privacy policy.`,appTitle:`What the app is`,appText:`Vestie is a personal diary. You record symptoms, episodes, medications, sleep and other details, and the app shows overviews, possible patterns and a report you can show your doctor. The basic version is free. The app is intended for people aged 16 and over.`,healthTitle:`The app is not a medical device`,healthText:`The app does not diagnose, treat, or recommend medications or dosages, and it does not replace a doctor. Possible patterns and weather alerts are based only on your own entries and the weather forecast, not on a medical assessment. Always talk to your doctor about treatment. If you have sudden, severe or unusual symptoms, seek medical help or call 112.`,useTitle:`How you may use the app`,useText:`You may use the app for your own personal needs. The app, its texts and illustrations, and the Vestie and Vestibulárna migréna brands are protected. You may not copy, modify or distribute them without permission, except where the law allows. You may not get around the subscription or interfere with how the app works.`,plusTitle:`What Vestie+ includes`,plusText:`Vestie+ adds to the free version weather and pressure based on your approximate location, weather alerts, the pattern finder, advanced statistics, the health apps connection (sleep, steps and workouts) and an extended report for your doctor. The current scope is described in the Vestie+ offer in the app. Features that need the internet or other apps only work when they are available (see Services of other providers).`,paymentTitle:`Price, payment and renewal`,paymentText:`Vestie+ is a monthly or yearly subscription. You see the price including VAT in the app and in the store before you buy. Payment is handled by Google Play (App Store on iPhone) under its own terms; we never see your payment details.
The subscription renews and is charged automatically at the end of each period until you cancel it. The store will tell you about a price change in advance and, if the price goes up, will give you the option to cancel.
If the offer includes a free trial, the first payment is taken only after the trial ends. If you cancel during the trial, you pay nothing. The store offers the trial only once per account, for both plans together.`,cancelTitle:`Cancelling the subscription`,cancelText:`You can cancel at any time in the store's subscription settings. From the app, go to Vestie+ → Manage in Google Play. Uninstalling the app or deleting your data does not cancel the subscription.
After you cancel, you keep Vestie+ until the end of the paid period and no further payment is taken. The app then returns to the free version and all your entries stay on your phone.`,withdrawalTitle:`Right of withdrawal and refunds`,withdrawalText:`As a consumer, you may withdraw from the Vestie+ contract without giving a reason within 14 days of concluding it, that is, from the start of the subscription. If the subscription starts with a free trial, the period includes the trial: with a 7-day trial, you still have at least 7 days after the first payment. You can withdraw directly in the app under Vestie+ → Withdraw from the contract here, or by emailing support@vestibularnamigrena.sk with the order number from your Google Play receipt (it starts with GPA.). We will confirm receipt of your notice by email. We will refund the full amount through Google Play to the same payment method no later than 14 days after we receive your message. Vestie+ will then be switched off.
After the 14 days, there are no refunds for a period that has already started, and an automatic renewal does not start a new withdrawal period. The only exceptions are described in Changes to the app and these terms and in Complaints and disputes. Independently of this, Google Play may refund a payment itself under its own rules, for example when asked shortly after the payment.`,dataTitle:`Your entries`,dataText:`Your entries are stored only on your phone. We have no access to them, so we cannot restore, transfer or return them. Backups are up to you (Profile → Data backup). If you forget your PIN or your backup password, your data cannot be recovered.`,servicesTitle:`Services of other providers`,servicesText:`Weather and pressure come from OpenWeather, sleep, steps and workouts are read from Health Connect or Apple Health, and payments are handled by Google Play or the App Store. We cannot control their availability or accuracy, and weather forecasts can be wrong. When a service is unavailable, the app shows the last real data with the time it is from, or says it has no data. Links to the website and the community (Facebook, Instagram, Discord) lead outside the app, where that service's rules apply.`,liabilityTitle:`Liability`,liabilityText:`We build the app with care, but we cannot guarantee that it will always be free of errors or available without interruption. We are not liable for health decisions made solely on the basis of the app, or for loss of data we did not cause (for example, losing your phone without a backup). This does not affect liability that cannot be limited by law, or your rights as a consumer.`,changesTitle:`Changes to the app and these terms`,changesText:`We may improve and change the app. If we significantly reduce or discontinue Vestie+, we will let you know in the app in advance, you may withdraw from the contract, and we will refund the unused part of the paid period. We will tell you about changes to these terms in the app. A change to your disadvantage does not apply to a period you have already paid for.`,complaintsTitle:`Complaints and disputes`,complaintsText:`If Vestie+ does not work as it should, email support@vestibularnamigrena.sk and describe what is happening. We will deal with your complaint without undue delay and within 30 days at the latest. If we do not fix the problem, you are entitled to an appropriate price reduction, or you may withdraw from the contract and we will refund you for the period when Vestie+ did not work.
If you are not satisfied with how we dealt with it, or you believe we have breached your rights, you can ask us for redress at support@vestibularnamigrena.sk. If we reject your request or do not reply within 30 days, you can file a proposal for alternative dispute resolution with the Slovak Trade Inspection (Slovenská obchodná inšpekcia, soi.sk) or another body on the list kept by the Slovak Ministry of Economy.`,lawTitle:`Governing law`,lawText:`These terms are governed by the law of the Slovak Republic. If you live in another country of the European Union, you also keep the protection given to you by the mandatory laws of your country. The Slovak and English versions are equally valid.`},profileSetup:{title:`Create your profile`,lead:`Your profile exists only on this phone – no online e-mail or password. You will sign in with a PIN.`,pinTitle:`Sign-in PIN`,pinText:`In the next step you will set a 6-digit PIN. You will use it to sign in and it also encrypts your data on the phone.`,nameLabel:`What should we call you?`,namePlaceholder:`Your name`,nameHint:`Optional. You will see it in the greeting on the home screen.`,pinAlready:`You already have a PIN. You can change it in Profile → Security.`},pin:{progress:`{n} of {total} digits entered`,keypad:`PIN keypad`,delete:`Delete digit`,prompt:{current:`Enter your current PIN`,new:`Choose a 6-digit PIN`,confirm:`Enter the PIN again to confirm`},title:{set:`Set your sign-in PIN`,change:`Change PIN`,disable:`Turn off PIN`},setLead:`You will use it to sign in and it also encrypts your data on the phone. If you forget it, the data cannot be recovered – nobody else has access to it.`,checking:`Checking…`,wrong:`Wrong PIN. Please try again.`,blocked:`Too many wrong attempts. Try again at {time}.`,weak:`This PIN is easy to guess. Please choose another one.`,mismatch:`The PINs don't match. Please choose your PIN again.`,saving:`Encrypting your data…`,enabled:`PIN set, your data is encrypted`,changed:`PIN changed`,disabled:`PIN turned off`,blockedSeconds:`Too many wrong attempts. Try again in {n} s.`},lock:{title:`Sign in`,lead:`Enter your PIN`,forgot:`Forgot your PIN?`,forgotTitle:`Forgotten PIN`,forgotText:`The PIN cannot be recovered – your data is encrypted only on this phone and nobody else has the key. You can only delete it and start over.`,forgotConfirm:`Delete everything and start over`},security:{title:`Security`,pin:`Sign in with PIN`,pinOnHint:`Your data is encrypted on the phone and cannot be accessed without the PIN.`,pinOffHint:`Without a PIN, anyone with your phone can open the app and your data is not encrypted.`,changePin:`Change PIN`,autoLock:`Sign out automatically`,autoLockOptions:{m0:`Right after leaving the app`,m1:`After 1 minute`,m5:`After 5 minutes`,m15:`After 15 minutes`},biometrics:`Unlock with face or fingerprint`,biometricsHint:`Available in the mobile app.`},privacy:{deviceOnly:`Your entries are only on this phone`,deviceOnlyHint:`The app sends no health entries anywhere and nobody else can access them.`,export:`Export my data`,exportHint:`A readable JSON file with all your entries, for example to move them elsewhere. It is not encrypted.`,exportDone:`Your data file is ready`,consent:`Consent to data processing`,consentGiven:`Given on {date}`,withdraw:`Withdraw consent`,withdrawTitle:`Withdraw consent?`,withdrawText:`Without consent the app cannot keep your health data. Withdrawing will permanently delete all data on this phone.`,withdrawConfirm:`Withdraw and delete data`,backupFirst:`Make a backup first`,plusNotCancelled:`This does not cancel your Vestie+ subscription. If you no longer want it, cancel it in {store}, otherwise it will keep renewing.`,exportFailed:`The file could not be created. Please try again.`,importTitle:`Restore data from this file?`,importText:`All records on this phone will be replaced by the records in the file. Your subscription and PIN stay the same.`,importConfirm:`Restore`,importDone:`Your data has been restored`},backup:{title:`Data backup`,profileHint:`A password-protected file you can restore your entries from, for example on a new phone.`,lead:`The app has no server; your entries exist only on this phone. Save a backup somewhere else, such as Google Drive or a computer. If you change or lose your phone, you can restore all your entries from it.`,lastAt:`Last backup: {date}`,never:`You haven't created a backup yet.`,createTitle:`Create a backup`,password:`Backup password`,passwordHint:`At least {n} characters. Don't use your PIN.`,passwordRepeat:`Repeat the password`,passwordWarning:`Remember the password or write it down somewhere safe. Without it the backup can't be opened or restored, and nobody can recover it for you.`,create:`Create backup`,creating:`Creating the backup…`,created:`The backup is ready. Save it somewhere other than this phone.`,failed:`The backup couldn't be created. Please try again.`,fileName:`backup`,restoreTitle:`Restore from a backup`,restore:`Choose a backup file`,restoreHint:`For example on a new phone. The entries on this phone will be replaced with the ones from the backup.`,restoreLead:`The backup is encrypted. Enter the password you chose for it.`,restoreLeadDate:`The backup from {date} is encrypted. Enter the password you chose for it.`,restoreSubmit:`Restore`,reminderTitle:`Reminder`,reminder:`Remind me to back up`,reminderHint:`Once a month, a short reminder appears on the Today screen.`,privacy:`The backup never goes anywhere on its own. You decide where to save it, and without the password its contents can't be read.`,errors:{tooShort:`The password must have at least {n} characters.`,mismatch:`The passwords don't match.`,passwordRequired:`Enter the backup password.`,wrongPassword:`Wrong password or a damaged file.`,invalidFile:`This file can't be read. Choose a backup or an export from the app.`,newerVersion:`This backup is from a newer version of the app. Update the app and restore it again.`},card:{title:`Back up your entries`,textNever:`Your entries exist only on this phone. If you lose or change it, you'll lose them without a backup.`,textOld:`Your last backup is from {date}. Create a new one to keep your newer entries safe too.`,action:`Create backup`,later:`Not now`}},plural:{entries:{one:`{n} entry`,other:`{n} entries`},times:{other:`{n}×`},days:{one:`{n} day`,other:`{n} days`},weeks:{one:`{n} week`,other:`{n} weeks`},months:{one:`{n} month`,other:`{n} months`},years:{one:`{n} year`,other:`{n} years`},episodes:{one:`{n} episode`,other:`{n} episodes`},hardDays:{one:`{n} harder day`,other:`{n} harder days`}},community:{title:`Community & support`,lead:`You don't have to face it alone. In our community we share our own experiences, support each other and recommend specialists.`,facebook:`Facebook group`,facebookHint:`Experiences, questions and mutual support`,instagram:`Instagram`,instagramHint:`@vestibularnamigrena`,discord:`Discord`,discordHint:`Real-time conversations with the community`,webTitle:`Articles on our website`,webText:`About the diagnosis, treatment and living with vestibular migraine (in Slovak).`,webUrl:`www.vestibularnamigrena.sk`,external:`(opens outside the app)`,note:`Experiences and recommendations from the community don't replace a doctor's examination and advice.`,soon:`Coming soon`},episodeTypes:{vestibular:`Vestibular episode`,migraine_headache:`Migraine with headache`,migraine_no_headache:`Migraine without headache`,other:`Other`,unsure:`I don't know`},relief:{rest:`Rest`,sleep:`Sleep`,dark_room:`Resting in a dark room`,hydration:`Drinking water`,relaxation:`Relaxation or meditation`,cold_compress:`Cold compress`,warm_compress:`Warm compress`,shower:`Shower`,food:`Food`,other:`Other`},impact:{work_study:`Work or study`,sleep:`Sleep`,daily_activities:`Everyday activities`,social:`Contact with family and friends`,movement:`Movement and physical activity`,rest:`Rest and relaxation`,other:`Other`,none:`The episode didn't limit me much`},episodeFlow:{typeTitle:`What kind of episode was it?`,typeLead:`Every detail is optional. Skip what you don't know and add it later.`,intensity:`Overall intensity`,symptomsTitle:`Which symptoms appeared?`,symptomsLead:`Choose one or more. You'll rate each one in the next step.`,date:`Date`,time:`Time`,triggersTitle:`What might have triggered it?`,triggersLead:`Choose everything that applies. These are possible links, not confirmed causes. You can choose more than one.`,triggerOther:`Other trigger`,triggerOtherPlaceholder:`Describe what it was`,medsTitle:`Did you take any medication during the episode?`,medsLead:`Tick the medication and when you took it. It will also be saved in Treatment.`,medsLogged:`Already logged during the episode`,medsNone:`You haven't added any medication yet.`,addMed:`Add medication`,medsWhen:`When you took it`,medsOutside:`The time must be during the episode.`,helped:`Did it help?`,reliefTitle:`What brought you relief?`,summaryTitle:`Episode summary`,summaryLead:`Check what you filled in. You can edit any part.`,summaryMissing:`You can still add`,save:`Save episode`,saved:`The episode was saved`,edit:`Edit`,sections:{type:`Type`,intensity:`Intensity`,time:`Time`,symptoms:`Symptoms`,triggers:`Possible triggers`,meds:`Medication`,helped:`Did it help?`,relief:`Relief`,impact:`Limitations`},reliefLead:`You can choose more than one.`,reliefOther:`What else helped?`,reliefOtherPlaceholder:`Describe what it was`,impactTitle:`How did the episode limit you?`,impactLead:`Which areas of everyday life did it affect?`,impactOther:`What else did the episode affect?`,impactOtherPlaceholder:`Describe what it was`},symptomInfo:{open:`What does {name} mean?`,close:`Got it`,dizziness:`A feeling of lightheadedness, unsteadiness or loss of balance. You may feel your head is spinning, feel faint or feel unsure when standing or walking.`,vertigo:`A false sense of movement even though you aren't moving. You may feel that you are spinning, that the room is turning or that your surroundings are moving.`,brain_fog:`A state in which it is hard to concentrate, think clearly or process information. Your thinking may feel slower, words may be harder to find or your thoughts harder to follow.`,visual_sensitivity:`Increased sensitivity to visual stimuli. Moving images, busy environments, patterns, crowds or screens can trigger dizziness, nausea or disorientation.`,tinnitus:`Hearing a sound in one or both ears even though there is no real source of sound around you. It may be ringing, humming, buzzing or hissing.`,rocking:`A feeling as if your body or surroundings are gently rocking, swaying from side to side or moving back and forth, like on a boat.`,floating:`A feeling as if you are floating, without firm contact with the ground.`,unsteadiness:`A feeling of unsteadiness when standing or walking, as if you are losing your balance, drifting to the sides or need support to move.`},quickIntake:{title:`Which medication did you take?`,lead:`Choose a medication. Next you'll enter the time and whether it helped.`,add:`Add a new medication`,empty:`You haven't added any medication yet. Add one and then log taking it.`},plus:JSON.parse(`{"name":"Vestie+","lockedLabel":"Part of Vestie+","tryChip":"Try it","demoChip":"Sample","features":{"weather":{"title":"Weather and pressure","text":"Weather and atmospheric pressure are recorded automatically based on your location."},"forecast":{"title":"Weather alerts","text":"Alerts you in advance about forecast larger changes in atmospheric pressure, temperature or humidity."},"finder":{"title":"Pattern finder","text":"Compares days with and without symptoms and shows possible patterns."},"stats":{"title":"Advanced statistics","text":"Follow long-term trends, when episodes occur and an overview of medication use by month."},"health":{"title":"Health apps connection","text":"Automatic recording of sleep, steps and workouts through Apple Health or Health Connect, including data from supported watches."},"report":{"title":"Extended report for your doctor","text":"An extended report with weather, atmospheric pressure, physical activity and possible patterns."}},"periods":{"d90":"90 days","d180":"6 months","d365":"12 months"},"plans":{"yearly":{"name":"Yearly","per":"per year","hint":"Works out at {monthly} a month, {trial} free","hintNoTrial":"Works out at {monthly} a month","badge":"Save {percent}%","cta":"Try {trial} free","ctaNoTrial":"Subscribe for {price} a year","terms":"{trial} free, then {price} a year. The subscription renews automatically. Cancel it in {store} before the trial ends and you pay nothing.","termsNoTrial":"{price} a year. The subscription renews automatically until you cancel it in {store}."},"monthly":{"name":"Monthly","per":"per month","hint":"{trial} free, cancel any time","hintNoTrial":"Cancel any time","cta":"Try {trial} free","ctaNoTrial":"Subscribe for {price} a month","terms":"{trial} free, then {price} a month. The subscription renews automatically. Cancel it in {store} before the trial ends and you pay nothing.","termsNoTrial":"{price} a month. The subscription renews automatically until you cancel it in {store}."}},"paywall":{"title":"More understanding through extended tracking","lead":"Vestie+ brings you weather and pressure tracking, alerts about weather changes and more detailed patterns in your records. The basic diary stays free.","choosePlan":"Choose your subscription","renewal":"{store} handles the payment. You can cancel the subscription at any time in {store} settings. You keep access to Vestie+ until the end of the paid period.","withdrawal":"You can withdraw from the contract without giving a reason within 14 days of the start of the subscription, even if it starts with a free trial, and we will refund the full amount. You can withdraw directly in the app (Vestie+ → Withdraw from the contract here). Details are in the Terms of use.","loadingPrices":"Loading prices…","pricesFailed":"Prices could not be loaded. Check your internet connection and try again.","retryPrices":"Try again","restored":"You already have a subscription. Vestie+ is on again.","freeTitle":"Everything you have now stays free","freeText":"Symptom and episode entries, calendar, insights, medications, sleep and the doctor's report. When a subscription ends, your entries stay yours.","demoNote":"Nothing is charged in this preview.","restore":"Restore purchase","disclaimer":"Vestie+ is not a medical device. It does not provide a diagnosis or treatment and does not replace seeing a doctor.","notNow":"Not now","nativeOnly":"Purchases will be available in the mobile app.","nothingToRestore":"We found no purchase to restore.","purchaseFailed":"The purchase did not go through. Please try again later.","purchasePending":"The payment is still processing. Vestie+ turns on once the store confirms it."},"manage":{"title":"Your Vestie+","lead":"Everything in one place. You can turn any feature on or off at any time.","welcomeTitle":"Welcome to Vestie+","welcomeLead":"Turn on weather and pressure first. You will find the other features in the list.","features":"Features","subscription":"Subscription","trialUntil":"Free trial until {date}","since":"Active since {date}","cancel":"Cancel subscription","cancelHint":"Your entries stay on your phone.","cancelTitle":"Cancel Vestie+?","cancelText":"Vestie+ features will be locked. All your entries, including recorded weather and pressure, stay with you.","cancelConfirm":"Cancel subscription","cancelled":"Vestie+ is cancelled","toToday":"Continue to Home","enableWeather":"Turn on weather and pressure","manageStore":"Manage in Google Play","manageStoreHint":"Change or cancel your subscription here. Your records stay on your phone."},"withdraw":{"row":"Withdraw from the contract here","rowHint":"No reason needed until {date}. We refund the full amount.","title":"Withdrawal from the contract","lead":"You can withdraw from the Vestie+ subscription contract without giving a reason until {date}. Fill in the details and confirm. The app prepares the notice and opens it in your email, where you send it.","leadLate":"The 14-day period for withdrawing without a reason has ended. If you believe you are entitled to withdraw for another reason, fill in the details and write to us.","name":"First and last name","order":"Order number","orderHint":"You will find it in your Google Play receipt. It starts with GPA.","email":"Email for confirmation","emailHint":"We will confirm receipt of your notice at this address.","note":"The notice goes from your email to {address}. After you withdraw, we refund the full amount through Google Play within 14 days and Vestie+ is switched off. Your entries stay on your phone.","submit":"Confirm withdrawal from the contract","errors":{"name":"Enter your first and last name.","order":"Enter the order number.","email":"Enter a valid email address."},"mailSubject":"Withdrawal from the contract – Vestie+","mailBody":"I hereby withdraw from the Vestie+ subscription contract.\\n\\nFirst and last name: {name}\\nOrder number: {order}\\nEmail for confirmation: {email}\\nDate and time: {time}","sentTitle":"The notice is ready in your email","sentText":"Send it from the email app that opened. The withdrawal takes effect on the day you send it, and we will confirm receipt at {email}.","sentFallback":"If your email did not open, send this text to {address}","copy":"Copy text","copied":"Text copied","demoNote":"Nothing is sent in this preview.","done":"Back to Vestie+"},"charts":{"legend":"Chart legend","showTable":"Show as a table"},"weather":{"hpa":"{value} hPa","temps":"{min} to {max} °C","changeShort":"{value} from the day before","conditions":{"clear":"Clear","partly":"Partly cloudy","cloudy":"Cloudy","fog":"Fog","rain":"Rain","snow":"Snow","storm":"Storm"},"offLead":"Changes in weather and atmospheric pressure may be related to your symptoms getting worse. The app will record them so you can follow possible patterns.","factRecord":"From the moment you turn this on, pressure, temperature, humidity and weather are recorded for each day. Recorded days stay on your phone. Days before that are not filled in.","factLocation":"Each update sends the weather provider only your location, rounded to about 10 km.","factHealth":"Nothing about your health is ever sent.","factOff":"You can turn this off at any time.","enable":"Allow location and turn on","today":"Today","condition":"Weather","temperature":"Temperature","humidity":"Humidity","humidityValue":"Humidity {value}%","forecastWord":"forecast","estimateWord":"estimate","episodeWord":"episode","chartTitle":"Pressure over time","rangeDays":"{n} days","chartLabel":"Chart of barometric pressure over the last {n} days and the forecast for the coming days. Dots mark days with an episode.","legendPressure":"Pressure","legendForecast":"Forecast","legendEpisode":"Day with an episode","colDay":"Day","colPressure":"Pressure","colChange":"Change","colEpisode":"Episode","forecastTitle":"Forecast for the coming days","linkTitle":"Pressure and your entries","openFinder":"Open pattern finder","myLocation":"For your location","noData":"There is no weather data for today yet.","settings":"Settings","updateLocation":"Update now","turnOff":"Turn off weather and pressure","turnOffHint":"Recorded days will stay.","turnOffTitle":"Turn off weather and pressure?","turnOffText":"The app will stop checking the weather and forget your location. Days already recorded will stay.","attribution":"Weather data provided by OpenWeather","disclaimer":"Data comes from weather models for your approximate location and forecasts can differ from reality. Days when you didn't open the app are an estimate from the latest forecast. A link with weather is not proof of a cause.","loading":"Checking the weather…","enabled":"Weather and pressure are on","errors":{"denied":"This won't work without location access. Allow it in your phone or browser settings.","unavailable":"We couldn't find your location. Please try again.","network":"We couldn't load the weather. Check your internet connection.","setup":"Weather isn't set up in this version yet. Please try again later."},"episodeDay":"Weather and activity that day","updated":"Updated {time}. Data refreshes by itself.","stale":"No connection. The latest data is from {time}.","bands":{"low":"Low pressure","normal":"Normal pressure","high":"Higher pressure","veryHigh":"Very high pressure"},"bandRanges":{"low":"below 1000 hPa","normal":"1000 to 1020 hPa","high":"1021 to 1029 hPa","veryHigh":"1030 hPa and above"},"bandTitle":"What the pressure values mean","bandNow":"now","bandNote":"The values are a rough guide. Pressure is converted to sea level, the same as in weather forecasts, so it can be compared at higher altitudes too. Besides the value itself, the app shows the change from the previous day, and the pattern finder compares days when pressure changed by 6 hPa or more."},"health":{"connected":"Connected","notConnected":"Not connected","stepsValue":"{value} steps","lead":"Sleep, steps and workouts can be read directly from your phone. Watches such as Apple Watch, Garmin, Samsung or Fitbit write there too.","providers":{"apple_health":"Apple Health","health_connect":"Health Connect"},"typesTitle":"What to read","types":{"sleep":"Sleep","steps":"Steps","workouts":"Workouts"},"privacy":"Data is only read onto this phone and is not sent anywhere. Sleep you entered by hand is not overwritten.","lastSync":"Last read {time}","stepsToday":"Steps today","sleepToday":"Sleep last night","stepsWeek":"Steps over the last 7 days","sleepWeek":"Sleep over the last 7 nights (hours)","noValue":"no entry","disconnect":"Disconnect","disconnectTitle":"Disconnect the health app?","disconnectText":"The app will stop reading new data. What has already been read stays in your entries.","revokeHint":{"health_connect":"You can revoke read access in the Health Connect settings.","apple_health":"You can revoke read access in the Health app under Sharing."},"disconnectedToast":"Disconnected","openSettings":"Settings","connectedToast":"Connected","connectTo":{"apple_health":"Connect to Apple Health","health_connect":"Connect to Health Connect"},"browserOnly":"A web browser cannot access this data. The connection only works in the mobile app, where data is read automatically once you allow it. So this preview shows nothing here rather than made-up numbers.","errors":{"denied":"Data can't be read without permission. Allow it in your phone settings.","unavailable":"The health app isn't available on this phone. On Android, install Health Connect."},"typesHint":"For workouts, only the type and duration are read, for example cycling, hockey or strength training. Walking counts in steps.","workouts":{"cycling":"Cycling","running":"Running","walking":"Walking","hiking":"Hiking","swimming":"Swimming","strength":"Strength training","hockey":"Hockey","soccer":"Football","basketball":"Basketball","volleyball":"Volleyball","teamSport":"Team sport","tennis":"Tennis","racket":"Racket sport","yoga":"Yoga and stretching","dance":"Dance","skiing":"Skiing","skating":"Skating","climbing":"Climbing","rowing":"Rowing","cardio":"Cardio","combat":"Combat sports","other":"Other activity"},"workoutsWeek":"Workouts in the last 7 days","workoutsNone":"No workouts in the last 7 days."},"finder":{"ofDays":"{a} of {b}","percent":"{n}%","factors":{"pressure_drop":"Day with a pressure drop of 6 hPa or more","pressure_rise":"Day with a pressure rise of 6 hPa or more","humid":"Day with high humidity (85% or more)","temp_swing":"Day with a temperature change of 8 °C or more","short_sleep":"Night shorter than 6 hours","poor_sleep":"Night with poor sleep quality","high_steps":"Day with 12,000 steps or more","low_steps":"Day with fewer than 3,000 steps","period":"Days around your period","workout":"Day with a workout of 30 min or more"},"strength":{"strong":"Clearer difference","possible":"Possible pattern","none":"No clear difference","few":"Not enough data"},"fewFactor":"This has happened {n} times so far, which is too few to compare.","after":"Harder day afterwards","otherDays":"On other days","lead":"The app compares how often a harder day follows a day when the factor appeared and a day when it did not. A harder day is a day with an episode or a symptom of intensity {intensity} or more.","summary":"In this period that's {hard} out of {days} in total.","notEnough":"So far you have {days} and {hard} recorded. Comparing needs at least 30 days and 5 harder days.","moreTitle":"What else to compare","more":{"weather":"Turn them on and we'll also compare pressure, humidity and temperature.","health":"Connect it and we'll also compare steps."},"loggedTitle":"What you marked during episodes","loggedLead":"You only record these triggers during episodes, so they can't be compared with days without symptoms. We only show how often they appear.","howTitle":"How we calculate this","howText":"We look for a harder day on the same day and the next day (for steps, only the next day). A day without entries counts as a day without symptoms; missing sleep or pressure is not filled in. We only flag a difference when it is unlikely to be due to chance.","disclaimer":"A possible pattern is not proof of a cause. Results can change as you add entries. If you want to change anything about your treatment, talk to your doctor.","toForecast":"Turn on weather alerts","moreRecords":"The more entries you add, the better the app can recognise recurring links between your symptoms and possible triggers. Treat the results as a rough guide, especially while you have only a few entries."},"forecast":{"today":"Today","tomorrow":"Tomorrow","signals":{"pressure_drop":"A pressure drop of {amount} hPa is forecast.","pressure_rise":"A pressure rise of {amount} hPa is forecast.","humid":"High humidity is forecast ({amount}%).","temp_swing":"A temperature change of {amount} °C is forecast."},"evidence":"From your entries: on similar days a harder day came in {a} of {b} cases, on other days in {c} of {d}.","evidenceFew":"There aren't enough of your entries yet to compare.","evidenceNone":"Your entries don't show a difference for this so far.","levels":{"change":"Notable change forecast","calm":"No major changes"},"cardTitle":"Weather change · {day}","factWeather":"Follow the forecast of atmospheric pressure, humidity and temperature for the coming days.","factRecords":"Choose which changes the app should alert you about.","factNotify":"You get the alert in the evening before the day the chosen change is forecast for.","factOff":"You can turn the alerts off at any time if they do not suit you.","offLead":"The app alerts you in advance about notable weather changes expected the next day. You choose which changes you want to be alerted about.","disclaimer":"The alerts only report the weather forecast from meteorological models for your approximate location, and reality may differ. They say nothing about how you will feel and are not health advice. Don't change medication or treatment because of them.","enable":"Turn on weather alerts","calmText":"None of the changes we follow are forecast.","lead":"Notable weather changes for today and the next three days.","weatherOff":"Turn on weather and pressure","weatherOffHint":"Alerts need the weather forecast.","notifyTitle":"Notifications","notify":"Alert me ahead of time","notifyHint":"The evening before a day with a chosen change. Based on the forecast from when you last opened the app.","notifyTime":"When to alert me","previewLabel":"This is how the notification will look on your phone:","disable":"Turn off weather alerts","staleForecast":"The forecast is more than a day old, so we're not alerting from it right now. Check your internet connection.","nothingToNotify":"The current forecast gives nothing to alert you about right now.","alertsTitle":"What to alert me about","alerts":{"pressure_drop":"Pressure drop","pressure_rise":"Pressure rise","humid":"High humidity","temp_swing":"Sharp temperature change"},"alertsNone":"Choose at least one change, otherwise the app won't alert you about anything."},"stats":{"empty":"Statistics are built from your entries. Once you have recorded symptoms or episodes, you'll see them here.","noCompare":"no comparison","same":"same as before","less":"{value} less","more":"{value} more","compareTitle":"Compared with the previous period","compareLead":"The last {days} compared with the same length of time before.","symptomDaysValue":"days with symptoms: {n}","trendTitle":"Days with symptoms by month","trendLabel":"Column chart of the number of days with symptoms over the last 12 months.","colMonth":"Month","rhythmTitle":"When episodes start","rhythmLead":"{n} in total, by day of the week and part of the day.","parts":{"morning":"Morn.","afternoon":"Aft.","evening":"Eve.","night":"Night"},"cycleStart":"First day of your period","cycleOffset":"Day {n} from the start","cycleTitle":"Episodes around your period","cycleLead":"From {n} recorded periods. The app does not predict your next period.","colCycleDay":"Day","reliefTitle":"What brought relief most often","impactTitle":"What episodes limited most often","medTitle":"Medication use by month","medLead":"How many times you logged each medication in each month of the chosen period.","medSince":"Taking since {date}","medDisclaimer":"This is only an overview of your records, not an assessment of the medication. Make treatment decisions with your doctor.","medTotal":"{count} in total, last on {date}","colCount":"Count"},"demoSymptoms":"In this sample the symptoms and episodes are made up, while the weather is real. Any link with pressure will only show from your own entries."}`),failure:{title:`This screen couldn't be shown`,text:`Your entries are still saved. Try again. If that doesn't help, create a backup or restore your data from a backup.`,retry:`Try again`,backup:`Backup and restore`,home:`Go to Home`},notifications:{channelReminders:`Daily reminder`,channelForecast:`Weather changes`,reminderBody:`How are you today? Note down how you feel.`,denied:`Your phone did not allow notifications. You can turn them on in the phone settings.`}}},wr=[`sk`,`en`],Tr={sk:`sk-SK`,en:`en-GB`},Er=`sk`;function Dr(e){Er=Cr[e]?e:`sk`,document.documentElement.lang=Er}var Or=()=>Tr[Er];function kr(e,t){return t.split(`.`).reduce((e,t)=>e?.[t],e)}function Ar(e,t){return t?e.replace(/\{(\w+)\}/g,(e,n)=>t[n]??``):e}function jr(e,t,n){let r=kr(Cr[e],t)??kr(Cr.sk,t);return typeof r==`string`?Ar(r,n):(console.warn(`[i18n] Chýba preklad: ${t}`),t)}var L=(e,t)=>jr(Er,e,t);function R(e,t){let n=new Intl.PluralRules(Or()).select(t),r=kr(Cr[Er],e)??{};return Ar(r[n]??r.other??e,{n:t})}function Mr(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function Nr(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var Pr={autoSleep:120,force3D:`auto`,nullTargetWarn:1,units:{lineHeight:``}},Fr={duration:.5,overwrite:!1,delay:0},Ir,Lr,z,Rr=1e8,B=1/Rr,zr=Math.PI*2,Br=zr/4,Vr=0,Hr=Math.sqrt,Ur=Math.cos,Wr=Math.sin,Gr=function(e){return typeof e==`string`},Kr=function(e){return typeof e==`function`},qr=function(e){return typeof e==`number`},Jr=function(e){return e===void 0},Yr=function(e){return typeof e==`object`},Xr=function(e){return e!==!1},Zr=function(){return typeof window<`u`},Qr=function(e){return Kr(e)||Gr(e)},$r=typeof ArrayBuffer==`function`&&ArrayBuffer.isView||function(){},ei=Array.isArray,ti=/random\([^)]+\)/g,ni=/,\s*/g,ri=/(?:-?\.?\d|\.)+/gi,ii=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,ai=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,oi=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,si=/[+-]=-?[.\d]+/,ci=/[^,'"\[\]\s]+/gi,li=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,V,ui,di,fi,pi={},mi={},hi,gi=function(e){return(mi=qi(e,pi))&&ds},_i=function(e,t){return console.warn(`Invalid property`,e,`set to`,t,`Missing plugin? gsap.registerPlugin()`)},vi=function(e,t){return!t&&console.warn(e)},yi=function(e,t){return e&&(pi[e]=t)&&mi&&(mi[e]=t)||pi},bi=function(){return 0},xi={suppressEvents:!0,isStart:!0,kill:!1},Si={suppressEvents:!0,kill:!1},Ci={suppressEvents:!0},wi={},Ti=[],Ei={},Di,Oi={},ki={},Ai=30,ji=[],Mi=``,Ni=function(e){var t=e[0],n,r;if(Yr(t)||Kr(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=ji.length;r--&&!ji[r].targetTest(t););n=ji[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new xo(e[r],n)))||e.splice(r,1);return e},Pi=function(e){return e._gsap||Ni(Aa(e))[0]._gsap},Fi=function(e,t,n){return(n=e[t])&&Kr(n)?e[t]():Jr(n)&&e.getAttribute&&e.getAttribute(t)||n},Ii=function(e,t){return(e=e.split(`,`)).forEach(t)||e},Li=function(e){return Math.round(e*1e5)/1e5||0},H=function(e){return Math.round(e*1e7)/1e7||0},Ri=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n===`+`?e+r:n===`-`?e-r:n===`*`?e*r:e/r},zi=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},Bi=function(){var e=Ti.length,t=Ti.slice(0),n,r;for(Ei={},Ti.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Vi=function(e){return!!(e._initted||e._startAt||e.add)},Hi=function(e,t,n,r){Ti.length&&!Lr&&Bi(),e.render(t,n,r||!!(Lr&&t<0&&Vi(e))),Ti.length&&!Lr&&Bi()},Ui=function(e){var t=parseFloat(e);return(t||t===0)&&(e+``).match(ci).length<2?t:Gr(e)?e.trim():e},Wi=function(e){return e},Gi=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Ki=function(e){return function(t,n){for(var r in n)r in t||r===`duration`&&e||r===`ease`||(t[r]=n[r])}},qi=function(e,t){for(var n in t)e[n]=t[n];return e},Ji=function e(t,n){for(var r in n)r!==`__proto__`&&r!==`constructor`&&r!==`prototype`&&(t[r]=Yr(n[r])?e(t[r]||(t[r]={}),n[r]):n[r]);return t},Yi=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},Xi=function(e){var t=e.parent||V,n=e.keyframes?Ki(ei(e.keyframes)):Gi;if(Xr(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},Zi=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},Qi=function(e,t,n,r,i){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var a=e[r],o;if(i)for(o=t[i];a&&a[i]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},$i=function(e,t,n,r){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var i=t._prev,a=t._next;i?i._next=a:e[n]===t&&(e[n]=a),a?a._prev=i:e[r]===t&&(e[r]=i),t._next=t._prev=t.parent=null},ea=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},ta=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},na=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},ra=function(e,t,n,r){return e._startAt&&(Lr?e._startAt.revert(Si):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},ia=function e(t){return!t||t._ts&&e(t.parent)},aa=function(e){return e._repeat?oa(e._tTime,e=e.duration()+e._rDelay)*e:0},oa=function(e,t){var n=Math.floor(e=H(e/t));return e&&n===e?n-1:n},sa=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},ca=function(e){return e._end=H(e._start+(e._tDur/Math.abs(e._ts||e._rts||B)||0))},la=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=H(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),ca(e),n._dirty||ta(n,e)),e},ua=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=sa(e.rawTime(),t),(!t._dur||wa(0,t.totalDuration(),n)-t._tTime>B)&&t.render(n,!0)),ta(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-B}},da=function(e,t,n,r){return t.parent&&ea(t),t._start=H((qr(n)?n:n||e!==V?xa(e,n,t):e._time)+t._delay),t._end=H(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Qi(e,t,`_first`,`_last`,e._sort?`_start`:0),ha(t)||(e._recent=t),r||ua(e,t),e._ts<0&&la(e,e._tTime),e},fa=function(e,t){return(pi.ScrollTrigger||_i(`scrollTrigger`,t))&&pi.ScrollTrigger.create(t,e)},pa=function(e,t,n,r,i){if(Ao(e,t,i),!e._initted)return 1;if(!n&&e._pt&&!Lr&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Di!==so.frame)return Ti.push(e),e._lazy=[i,r],1},ma=function e(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||e(n))},ha=function(e){var t=e.data;return t===`isFromStart`||t===`isStart`},ga=function(e,t,n,r){var i=e.ratio,a=t<0||!t&&(!e._start&&ma(e)&&(e._initted||!ha(e))||(e._ts<0||e._dp._ts<0)&&!ha(e))?0:1,o=e._rDelay,s=0,c,l,u;if(o&&e._repeat&&(s=wa(0,e._tDur,t),l=oa(s,o),e._yoyo&&l&1&&(a=1-a),l!==oa(e._tTime,o)&&(i=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==i||Lr||r||e._zTime===B||!t&&e._zTime){if(!e._initted&&pa(e,t,r,n,s))return;for(u=e._zTime,e._zTime=t||(n?B:0),n||=t&&!u,e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=s,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&ra(e,t,n,!0),e._onUpdate&&!n&&qa(e,`onUpdate`),s&&e._repeat&&!n&&e.parent&&qa(e,`onRepeat`),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&ea(e,1),!n&&!Lr&&(qa(e,a?`onComplete`:`onReverseComplete`,!0),e._prom&&e._prom()))}else e._zTime||=t},_a=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data===`isPause`&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data===`isPause`&&r._start<t)return r;r=r._prev}},va=function(e,t,n,r){var i=e._repeat,a=H(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=i?i<0?1e10:H(a*(i+1)+e._rDelay*i):a,o>0&&!r&&la(e,e._tTime=e._tDur*o),e.parent&&ca(e),n||ta(e.parent,e),e},ya=function(e){return e instanceof Co?ta(e):va(e,e._dur)},ba={_start:0,endTime:bi,totalDuration:bi},xa=function e(t,n,r){var i=t.labels,a=t._recent||ba,o=t.duration()>=Rr?a.endTime(!1):t._dur,s,c,l;return Gr(n)&&(isNaN(n)||n in i)?(c=n.charAt(0),l=n.substr(-1)===`%`,s=n.indexOf(`=`),c===`<`||c===`>`?(s>=0&&(n=n.replace(/=/,``)),(c===`<`?a._start:a.endTime(a._repeat>=0))+(parseFloat(n.substr(1))||0)*(l?(s<0?a:r).totalDuration()/100:1)):s<0?(n in i||(i[n]=o),i[n]):(c=parseFloat(n.charAt(s-1)+n.substr(s+1)),l&&r&&(c=c/100*(ei(r)?r[0]:r).totalDuration()),s>1?e(t,n.substr(0,s-1),r)+c:o+c)):n==null?o:+n},Sa=function(e,t,n){var r=qr(t[1]),i=(r?2:1)+(e<2?0:1),a=t[i],o,s;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,s=n;s&&!(`immediateRender`in o);)o=s.vars.defaults||{},s=Xr(s.vars.inherit)&&s.parent;a.immediateRender=Xr(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[i-1]}return new Lo(t[0],a,t[i+1])},Ca=function(e,t){return e||e===0?t(e):t},wa=function(e,t,n){return n<e?e:n>t?t:n},Ta=function(e,t){return!Gr(e)||!(t=li.exec(e))?``:t[1]},Ea=function(e,t,n){return Ca(n,function(n){return wa(e,t,n)})},Da=[].slice,Oa=function(e,t){return e&&Yr(e)&&`length`in e&&(!t&&!e.length||e.length-1 in e&&Yr(e[0]))&&!e.nodeType&&e!==ui},ka=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(e){var r;return Gr(e)&&!t||Oa(e,1)?(r=n).push.apply(r,Aa(e)):n.push(e)})||n},Aa=function(e,t,n){return z&&!t&&z.selector?z.selector(e):Gr(e)&&!n&&(di||!co())?Da.call((t||fi).querySelectorAll(e),0):ei(e)?ka(e,n):Oa(e)?Da.call(e,0):e?[e]:[]},ja=function(e){return e=Aa(e)[0]||vi(`Invalid scope`)||{},function(t){var n=e.current||e.nativeElement||e;return Aa(t,n.querySelectorAll?n:n===e?vi(`Invalid scope`)||fi.createElement(`div`):e)}},Ma=function(e){return e.sort(function(){return .5-Math.random()})},Na=function(e){if(Kr(e))return e;var t=Yr(e)?e:{each:e},n=go(t.ease),r=t.from||0,i=parseFloat(t.base)||0,a={},o=r>0&&r<1,s=isNaN(r)||o,c=t.axis,l=r,u=r;return Gr(r)?l=u={center:.5,edges:.5,end:1}[r]||0:!o&&s&&(l=r[0],u=r[1]),function(e,o,d){var f=(d||t).length,p=a[f],m,h,g,_,v,y,b,x,S;if(!p){if(S=t.grid===`auto`?0:(t.grid||[1,Rr])[1],!S){for(b=-Rr;b<(b=d[S++].getBoundingClientRect().left)&&S<f;);S<f&&S--}for(p=a[f]=[],m=s?Math.min(S,f)*l-.5:r%S,h=S===Rr?0:s?f*u/S-.5:r/S|0,b=0,x=Rr,y=0;y<f;y++)g=y%S-m,_=h-(y/S|0),p[y]=v=c?Math.abs(c===`y`?_:g):Hr(g*g+_*_),v>b&&(b=v),v<x&&(x=v);r===`random`&&Ma(p),p.max=b-x,p.min=x,p.v=f=(parseFloat(t.amount)||parseFloat(t.each)*(S>f?f-1:c?c===`y`?f/S:S:Math.max(S,f/S))||0)*(r===`edges`?-1:1),p.b=f<0?i-f:i,p.u=Ta(t.amount||t.each)||0,n=n&&f<0?ho(n):n}return f=(p[e]-p.min)/p.max||0,H(p.b+(n?n(f):f)*p.v)+p.u}},Pa=function(e){var t=10**((e+``).split(`.`)[1]||``).length;return function(n){var r=H(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(qr(n)?0:Ta(n))}},Fa=function(e,t){var n=ei(e),r,i;return!n&&Yr(e)&&(r=n=e.radius||Rr,e.values?(e=Aa(e.values),(i=!qr(e[0]))&&(r*=r)):e=Pa(e.increment)),Ca(t,n?Kr(e)?function(t){return i=e(t),Math.abs(i-t)<=r?i:t}:function(t){for(var n=parseFloat(i?t.x:t),a=parseFloat(i?t.y:0),o=Rr,s=0,c=e.length,l,u;c--;)i?(l=e[c].x-n,u=e[c].y-a,l=l*l+u*u):l=Math.abs(e[c]-n),l<o&&(o=l,s=c);return s=!r||o<=r?e[s]:t,i||s===t||qr(t)?s:s+Ta(t)}:Pa(e))},Ia=function(e,t,n,r){return Ca(ei(e)?!t:n===!0?!!(n=0):!r,function(){return ei(e)?e[~~(Math.random()*e.length)]:(n||=1e-5)&&(r=n<1?10**((n+``).length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},La=function(){var e=[...arguments];return function(t){return e.reduce(function(e,t){return t(e)},t)}},Ra=function(e,t){return function(n){return e(parseFloat(n))+(t||Ta(n))}},za=function(e,t,n){return Wa(e,t,0,1,n)},Ba=function(e,t,n){return Ca(n,function(n){return e[~~t(n)]})},Va=function e(t,n,r){var i=n-t;return ei(t)?Ba(t,e(0,t.length),n):Ca(r,function(e){return(i+(e-t)%i)%i+t})},Ha=function e(t,n,r){var i=n-t,a=i*2;return ei(t)?Ba(t,e(0,t.length-1),n):Ca(r,function(e){return e=(a+(e-t)%a)%a||0,t+(e>i?a-e:e)})},Ua=function(e){return e.replace(ti,function(e){var t=e.indexOf(`[`)+1,n=e.substring(t||7,t?e.indexOf(`]`):e.length-1).split(ni);return Ia(t?n:+n[0],t?0:+n[1],+n[2]||1e-5)})},Wa=function(e,t,n,r,i){var a=t-e,o=r-n;return Ca(i,function(t){return n+((t-e)/a*o||0)})},Ga=function e(t,n,r,i){var a=isNaN(t+n)?0:function(e){return(1-e)*t+e*n};if(!a){var o=Gr(t),s={},c,l,u,d,f;if(r===!0&&(i=1)&&(r=null),o)t={p:t},n={p:n};else if(ei(t)&&!ei(n)){for(u=[],d=t.length,f=d-2,l=1;l<d;l++)u.push(e(t[l-1],t[l]));d--,a=function(e){e*=d;var t=Math.min(f,~~e);return u[t](e-t)},r=n}else i||(t=qi(ei(t)?[]:{},t));if(!u){for(c in n)To.call(s,t,c,`get`,n[c]);a=function(e){return Ko(e,s)||(o?t.p:t)}}}return Ca(r,a)},Ka=function(e,t,n){var r=e.labels,i=Rr,a,o,s;for(a in r)o=r[a]-t,o<0==!!n&&o&&i>(o=Math.abs(o))&&(s=a,i=o);return s},qa=function(e,t,n){var r=e.vars,i=r[t],a=z,o=e._ctx,s,c,l;if(i)return s=r[t+`Params`],c=r.callbackScope||e,n&&Ti.length&&Bi(),o&&(z=o),l=s?i.apply(c,s):i.call(c),z=a,l},Ja=function(e){return ea(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Lr),e.progress()<1&&qa(e,`onInterrupt`),e},Ya,Xa=[],Za=function(e){if(e){if(e=!e.name&&e.default||e,Zr()||e.headless){var t=e.name,n=Kr(e),r=t&&!n&&e.init?function(){this._props=[]}:e,i={init:bi,render:Ko,add:To,kill:Jo,modifier:qo,rawVars:0},a={targetTest:0,get:0,getSetter:Ho,aliases:{},register:0};if(co(),e!==r){if(Oi[t])return;Gi(r,Gi(Yi(e,i),a)),qi(r.prototype,qi(i,Yi(e,a))),Oi[r.prop=t]=r,e.targetTest&&(ji.push(r),wi[t]=1),t=(t===`css`?`CSS`:t.charAt(0).toUpperCase()+t.substr(1))+`Plugin`}yi(t,r),e.register&&e.register(ds,r,Zo)}else Xa.push(e)}},U=255,Qa={aqua:[0,U,U],lime:[0,U,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,U],navy:[0,0,128],white:[U,U,U],olive:[128,128,0],yellow:[U,U,0],orange:[U,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[U,0,0],pink:[U,192,203],cyan:[0,U,U],transparent:[U,U,U,0]},$a=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*U+.5|0},eo=function(e,t,n){var r=e?qr(e)?[e>>16,e>>8&U,e&U]:0:Qa.black,i,a,o,s,c,l,u,d,f,p;if(!r){if(e.substr(-1)===`,`&&(e=e.substr(0,e.length-1)),Qa[e])r=Qa[e];else if(e.charAt(0)===`#`){if(e.length<6&&(i=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e=`#`+i+i+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):``)),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&U,r&U,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&U,e&U]}else if(e.substr(0,3)===`hsl`){if(r=p=e.match(ri),!t)s=r[0]%360/360,c=r[1]/100,l=r[2]/100,a=l<=.5?l*(c+1):l+c-l*c,i=l*2-a,r.length>3&&(r[3]*=1),r[0]=$a(s+1/3,i,a),r[1]=$a(s,i,a),r[2]=$a(s-1/3,i,a);else if(~e.indexOf(`=`))return r=e.match(ii),n&&r.length<4&&(r[3]=1),r}else r=e.match(ri)||Qa.transparent;r=r.map(Number)}return t&&!p&&(i=r[0]/U,a=r[1]/U,o=r[2]/U,u=Math.max(i,a,o),d=Math.min(i,a,o),l=(u+d)/2,u===d?s=c=0:(f=u-d,c=l>.5?f/(2-u-d):f/(u+d),s=u===i?(a-o)/f+(a<o?6:0):u===a?(o-i)/f+2:(i-a)/f+4,s*=60),r[0]=~~(s+.5),r[1]=~~(c*100+.5),r[2]=~~(l*100+.5)),n&&r.length<4&&(r[3]=1),r},to=function(e){var t=[],n=[],r=-1;return e.split(ro).forEach(function(e){var i=e.match(ai)||[];t.push.apply(t,i),n.push(r+=i.length+1)}),t.c=n,t},no=function(e,t,n){var r=``,i=(e+r).match(ro),a=t?`hsla(`:`rgba(`,o=0,s,c,l,u;if(!i)return e;if(i=i.map(function(e){return(e=eo(e,t,1))&&a+(t?e[0]+`,`+e[1]+`%,`+e[2]+`%,`+e[3]:e.join(`,`))+`)`}),n&&(l=to(e),s=n.c,s.join(r)!==l.c.join(r)))for(c=e.replace(ro,`1`).split(ai),u=c.length-1;o<u;o++)r+=c[o]+(~s.indexOf(o)?i.shift()||a+`0,0,0,0)`:(l.length?l:i.length?i:n).shift());if(!c)for(c=e.split(ro),u=c.length-1;o<u;o++)r+=c[o]+i[o];return r+c[u]},ro=function(){var e=`(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b`,t;for(t in Qa)e+=`|`+t+`\\b`;return RegExp(e+`)`,`gi`)}(),io=/hsl[a]?\(/,ao=function(e){var t=e.join(` `),n;if(ro.lastIndex=0,ro.test(t))return n=io.test(t),e[1]=no(e[1],n),e[0]=no(e[0],n,to(e[1])),!0},oo,so=function(){var e=Date.now,t=500,n=33,r=e(),i=r,a=1e3/240,o=a,s=[],c,l,u,d,f,p,m=function u(m){var h=e()-i,g=m===!0,_,v,y,b;if((h>t||h<0)&&(r+=h-n),i+=h,y=i-r,_=y-o,(_>0||g)&&(b=++d.frame,f=y-d.time*1e3,d.time=y/=1e3,o+=_+(_>=a?4:a-_),v=1),g||(c=l(u)),v)for(p=0;p<s.length;p++)s[p](y,f,b,m)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(e){return f/(1e3/(e||60))},wake:function(){hi&&(!di&&Zr()&&(ui=di=window,fi=ui.document||{},pi.gsap=ds,(ui.gsapVersions||(ui.gsapVersions=[])).push(ds.version),gi(mi||ui.GreenSockGlobals||!ui.gsap&&ui||{}),Xa.forEach(Za)),u=typeof requestAnimationFrame<`u`&&requestAnimationFrame,c&&d.sleep(),l=u||function(e){return setTimeout(e,o-d.time*1e3+1|0)},oo=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),oo=0,l=bi},lagSmoothing:function(e,r){t=e||1/0,n=Math.min(r||33,t)},fps:function(e){a=1e3/(e||240),o=d.time*1e3+a},add:function(e,t,n){var r=t?function(t,n,i,a){e(t,n,i,a),d.remove(r)}:e;return d.remove(e),s[n?`unshift`:`push`](r),co(),r},remove:function(e,t){~(t=s.indexOf(e))&&s.splice(t,1)&&p>=t&&p--},_listeners:s},d}(),co=function(){return!oo&&so.wake()},W={},lo=/^[\d.\-M][\d.\-,\s]/,uo=/["']/g,fo=function(e){for(var t={},n=e.substr(1,e.length-3).split(`:`),r=n[0],i=1,a=n.length,o,s,c;i<a;i++)s=n[i],o=i===a-1?s.length:s.lastIndexOf(`,`),c=s.substr(0,o),t[r]=isNaN(c)?c.replace(uo,``).trim():+c,r=s.substr(o+1).trim();return t},po=function(e){var t=e.indexOf(`(`)+1,n=e.indexOf(`)`),r=e.indexOf(`(`,t);return e.substring(t,~r&&r<n?e.indexOf(`)`,n+1):n)},mo=function(e){var t=(e+``).split(`(`),n=W[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf(`{`)?[fo(t[1])]:po(e).split(`,`).map(Ui)):W._CE&&lo.test(e)?W._CE(``,e):n},ho=function(e){return function(t){return 1-e(1-t)}},go=function(e,t){return e&&(Kr(e)?e:W[e]||mo(e))||t},_o=function(e,t,n,r){n===void 0&&(n=function(e){return 1-t(1-e)}),r===void 0&&(r=function(e){return e<.5?t(e*2)/2:1-t((1-e)*2)/2});var i={easeIn:t,easeOut:n,easeInOut:r},a;return Ii(e,function(e){for(var t in W[e]=pi[e]=i,W[a=e.toLowerCase()]=n,i)W[a+(t===`easeIn`?`.in`:t===`easeOut`?`.out`:`.inOut`)]=W[e+`.`+t]=i[t]}),i},vo=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},yo=function e(t,n,r){var i=n>=1?n:1,a=(r||(t?.3:.45))/(n<1?n:1),o=a/zr*(Math.asin(1/i)||0),s=function(e){return e===1?1:i*2**(-10*e)*Wr((e-o)*a)+1},c=t===`out`?s:t===`in`?function(e){return 1-s(1-e)}:vo(s);return a=zr/a,c.config=function(n,r){return e(t,n,r)},c},bo=function e(t,n){n===void 0&&(n=1.70158);var r=function(e){return e?--e*e*((n+1)*e+n)+1:0},i=t===`out`?r:t===`in`?function(e){return 1-r(1-e)}:vo(r);return i.config=function(n){return e(t,n)},i};Ii(`Linear,Quad,Cubic,Quart,Quint,Strong`,function(e,t){var n=t<5?t+1:t;_o(e+`,Power`+(n-1),t?function(e){return e**+n}:function(e){return e},function(e){return 1-(1-e)**n},function(e){return e<.5?(e*2)**n/2:1-((1-e)*2)**n/2})}),W.Linear.easeNone=W.none=W.Linear.easeIn,_o(`Elastic`,yo(`in`),yo(`out`),yo()),(function(e,t){var n=1/t,r=2*n,i=2.5*n,a=function(a){return a<n?e*a*a:a<r?e*(a-1.5/t)**2+.75:a<i?e*(a-=2.25/t)*a+.9375:e*(a-2.625/t)**2+.984375};_o(`Bounce`,function(e){return 1-a(1-e)},a)})(7.5625,2.75),_o(`Expo`,function(e){return 2**(10*(e-1))*e+e*e*e*e*e*e*(1-e)}),_o(`Circ`,function(e){return-(Hr(1-e*e)-1)}),_o(`Sine`,function(e){return e===1?1:-Ur(e*Br)+1}),_o(`Back`,bo(`in`),bo(`out`),bo()),W.SteppedEase=W.steps=pi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+ +!t,i=+!!t,a=1-B;return function(e){return((r*wa(0,a,e)|0)+i)*n}}},Fr.ease=W[`quad.out`],Ii(`onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt`,function(e){return Mi+=e+`,`+e+`Params,`});var xo=function(e,t){this.id=Vr++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Fi,this.set=t?t.getSetter:Ho},So=function(){function e(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,va(this,+e.duration,1,1),this.data=e.data,z&&(this._ctx=z,z.data.push(this)),oo||so.wake()}var t=e.prototype;return t.delay=function(e){return e||e===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+e-this._delay),this._delay=e,this):this._delay},t.duration=function(e){return arguments.length?this.totalDuration(this._repeat>0?e+(e+this._rDelay)*this._repeat:e):this.totalDuration()&&this._dur},t.totalDuration=function(e){return arguments.length?(this._dirty=0,va(this,this._repeat<0?e:(e-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(e,t){if(co(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for(la(this,e),!n._dp||n.parent||ua(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&e<this._tDur||this._ts<0&&e>0||!this._tDur&&!e)&&da(this._dp,this,this._start-this._delay)}return(this._tTime!==e||!this._dur&&!t||this._initted&&Math.abs(this._zTime)===B||!this._initted&&this._dur&&e||!e&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=e),Hi(this,e,t)),this},t.time=function(e,t){return arguments.length?this.totalTime(Math.min(this.totalDuration(),e+aa(this))%(this._dur+this._rDelay)||(e?this._dur:0),t):this._time},t.totalProgress=function(e,t){return arguments.length?this.totalTime(this.totalDuration()*e,t):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(e,t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-e:e)+aa(this),t):this.duration()?Math.min(1,this._time/this._dur):+(this.rawTime()>0)},t.iteration=function(e,t){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(e-1)*n,t):this._repeat?oa(this._tTime,n)+1:1},t.timeScale=function(e,t){if(!arguments.length)return this._rts===-B?0:this._rts;if(this._rts===e)return this;var n=this.parent&&this._ts?sa(this.parent._time,this):this._tTime;return this._rts=+e||0,this._ts=this._ps||e===-B?0:this._rts,this.totalTime(wa(-Math.abs(this._delay),this.totalDuration(),n),t!==!1),ca(this),na(this)},t.paused=function(e){return arguments.length?(this._ps!==e&&(this._ps=e,e?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(co(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==B&&(this._tTime-=B)))),this):this._ps},t.startTime=function(e){if(arguments.length){this._start=H(e);var t=this.parent||this._dp;return t&&(t._sort||!this.parent)&&da(t,this,this._start-this._delay),this}return this._start},t.endTime=function(e){return this._start+(Xr(e)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(e){var t=this.parent||this._dp;return t?e&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?sa(t.rawTime(e),this):this._tTime:this._tTime},t.revert=function(e){e===void 0&&(e=Ci);var t=Lr;return Lr=e,Vi(this)&&(this.timeline&&this.timeline.revert(e),this.totalTime(-.01,e.suppressEvents)),this.data!==`nested`&&e.kill!==!1&&this.kill(),Lr=t,this},t.globalTime=function(e){for(var t=this,n=arguments.length?e:t.rawTime();t;)n=t._start+n/(Math.abs(t._ts)||1),t=t._dp;return!this.parent&&this._sat?this._sat.globalTime(e):n},t.repeat=function(e){return arguments.length?(this._repeat=e===1/0?-2:e,ya(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(e){if(arguments.length){var t=this._time;return this._rDelay=e,ya(this),t?this.time(t):this}return this._rDelay},t.yoyo=function(e){return arguments.length?(this._yoyo=e,this):this._yoyo},t.seek=function(e,t){return this.totalTime(xa(this,e),Xr(t))},t.restart=function(e,t){return this.play().totalTime(e?-this._delay:0,Xr(t)),this._dur||(this._zTime=-B),this},t.play=function(e,t){return e!=null&&this.seek(e,t),this.reversed(!1).paused(!1)},t.reverse=function(e,t){return e!=null&&this.seek(e||this.totalDuration(),t),this.reversed(!0).paused(!1)},t.pause=function(e,t){return e!=null&&this.seek(e,t),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(e){return arguments.length?(!!e!==this.reversed()&&this.timeScale(-this._rts||(e?-B:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-B,this},t.isActive=function(){var e=this.parent||this._dp,t=this._start,n;return!!(!e||this._ts&&this._initted&&e.isActive()&&(n=e.rawTime(!0))>=t&&n<this.endTime(!0)-B)},t.eventCallback=function(e,t,n){var r=this.vars;return arguments.length>1?(t?(r[e]=t,n&&(r[e+`Params`]=n),e===`onUpdate`&&(this._onUpdate=t)):delete r[e],this):r[e]},t.then=function(e){var t=this,n=t._prom;return new Promise(function(r){var i=Kr(e)?e:Wi,a=function(){var e=t.then;t.then=null,n&&n(),Kr(i)&&(i=i(t))&&(i.then||i===t)&&(t.then=e),r(i),t.then=e};t._initted&&t.totalProgress()===1&&t._ts>=0||!t._tTime&&t._ts<0?a():t._prom=a})},t.kill=function(){Ja(this)},e}();Gi(So.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-B,_prom:0,_ps:!1,_rts:1});var Co=function(e){Nr(t,e);function t(t,n){var r;return t===void 0&&(t={}),r=e.call(this,t)||this,r.labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=Xr(t.sortChildren),V&&da(t.parent||V,Mr(r),n),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&fa(Mr(r),t.scrollTrigger),r}var n=t.prototype;return n.to=function(e,t,n){return Sa(0,arguments,this),this},n.from=function(e,t,n){return Sa(1,arguments,this),this},n.fromTo=function(e,t,n,r){return Sa(2,arguments,this),this},n.set=function(e,t,n){return t.duration=0,t.parent=this,Xi(t).repeatDelay||(t.repeat=0),t.immediateRender=!!t.immediateRender,new Lo(e,t,xa(this,n),1),this},n.call=function(e,t,n){return da(this,Lo.delayedCall(0,e,t),n)},n.staggerTo=function(e,t,n,r,i,a,o){return n.duration=t,n.stagger=n.stagger||r,n.onComplete=a,n.onCompleteParams=o,n.parent=this,new Lo(e,n,xa(this,i)),this},n.staggerFrom=function(e,t,n,r,i,a,o){return n.runBackwards=1,Xi(n).immediateRender=Xr(n.immediateRender),this.staggerTo(e,t,n,r,i,a,o)},n.staggerFromTo=function(e,t,n,r,i,a,o,s){return r.startAt=n,Xi(r).immediateRender=Xr(r.immediateRender),this.staggerTo(e,t,r,i,a,o,s)},n.render=function(e,t,n){var r=this._time,i=this._dirty?this.totalDuration():this._tDur,a=this._dur,o=e<=0?0:H(e),s=this._zTime<0!=e<0&&(this._initted||!a),c,l,u,d,f,p,m,h,g,_,v,y;if(this!==V&&o>i&&e>=0&&(o=i),o!==this._tTime||n||s){if(r!==this._time&&a&&(o+=this._time-r,e+=this._time-r),c=o,g=this._start,h=this._ts,p=!h,s&&(a||(r=this._zTime),(e||!t)&&(this._zTime=e)),this._repeat){if(v=this._yoyo,f=a+this._rDelay,this._repeat<-1&&e<0)return this.totalTime(f*100+e,t,n);if(c=H(o%f),o===i?(d=this._repeat,c=a):(_=H(o/f),d=~~_,d&&d===_&&(c=a,d--),c>a&&(c=a)),_=oa(this._tTime,f),!r&&this._tTime&&_!==d&&this._tTime-_*f-this._dur<=0&&(_=d),v&&d&1&&(c=a-c,y=1),d!==_&&!this._lock){var b=v&&_&1,x=b===(v&&d&1);if(d<_&&(b=!b),r=b?0:o%a?a:o,this._lock=1,this.render(r||(y?0:H(d*f)),t,!a)._lock=0,this._tTime=o,!t&&this.parent&&qa(this,`onRepeat`),this.vars.repeatRefresh&&!y&&(this.invalidate()._lock=1,_=d),r&&r!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act||(a=this._dur,i=this._tDur,x&&(this._lock=2,r=b?a:-1e-4,this.render(r,!0),this.vars.repeatRefresh&&!y&&this.invalidate()),this._lock=0,!this._ts&&!p))return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(m=_a(this,H(r),H(c)),m&&(o-=c-(c=m._start))),this._tTime=o,this._time=c,this._act=!!h,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=e,r=0),!r&&o&&a&&!t&&!_&&(qa(this,`onStart`),this._tTime!==o))return this;if(c>=r&&e>=0)for(l=this._first;l;){if(u=l._next,(l._act||c>=l._start)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(c-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(c-l._start)*l._ts,t,n),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=-B);break}}l=u}else{l=this._last;for(var S=e<0?e:c;l;){if(u=l._prev,(l._act||S<=l._end)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(S-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(S-l._start)*l._ts,t,n||Lr&&Vi(l)),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=S?-B:B);break}}l=u}}if(m&&!t&&(this.pause(),m.render(c>=r?0:-B)._zTime=c>=r?1:-1,this._ts))return this._start=g,ca(this),this.render(e,t,n);this._onUpdate&&!t&&qa(this,`onUpdate`,!0),(o===i&&this._tTime>=this.totalDuration()||!o&&r)&&(g===this._start||Math.abs(h)!==Math.abs(this._ts))&&(this._lock||((e||!a)&&(o===i&&this._ts>0||!o&&this._ts<0)&&ea(this,1),!t&&!(e<0&&!r)&&(o||r||!i)&&(qa(this,o===i&&e>=0?`onComplete`:`onReverseComplete`,!0),this._prom&&!(o<i&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(e,t){var n=this;if(qr(t)||(t=xa(this,t,e)),!(e instanceof So)){if(ei(e))return e.forEach(function(e){return n.add(e,t)}),this;if(Gr(e))return this.addLabel(e,t);if(Kr(e))e=Lo.delayedCall(0,e);else return this}return this===e?this:da(this,e,t)},n.getChildren=function(e,t,n,r){e===void 0&&(e=!0),t===void 0&&(t=!0),n===void 0&&(n=!0),r===void 0&&(r=-Rr);for(var i=[],a=this._first;a;)a._start>=r&&(a instanceof Lo?t&&i.push(a):(n&&i.push(a),e&&i.push.apply(i,a.getChildren(!0,t,n)))),a=a._next;return i},n.getById=function(e){for(var t=this.getChildren(1,1,1),n=t.length;n--;)if(t[n].vars.id===e)return t[n]},n.remove=function(e){return Gr(e)?this.removeLabel(e):Kr(e)?this.killTweensOf(e):(e.parent===this&&$i(this,e),e===this._recent&&(this._recent=this._last),ta(this))},n.totalTime=function(t,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=H(so.time-(this._ts>0?t/this._ts:(this.totalDuration()-t)/-this._ts))),e.prototype.totalTime.call(this,t,n),this._forcing=0,this):this._tTime},n.addLabel=function(e,t){return this.labels[e]=xa(this,t),this},n.removeLabel=function(e){return delete this.labels[e],this},n.addPause=function(e,t,n){var r=Lo.delayedCall(0,t||bi,n);return r.data=`isPause`,this._hasPause=1,da(this,r,xa(this,e))},n.removePause=function(e){var t=this._first;for(e=xa(this,e);t;)t._start===e&&t.data===`isPause`&&ea(t),t=t._next},n.killTweensOf=function(e,t,n){for(var r=this.getTweensOf(e,n),i=r.length;i--;)Oo!==r[i]&&r[i].kill(e,t);return this},n.getTweensOf=function(e,t){for(var n=[],r=Aa(e),i=this._first,a=qr(t),o;i;)i instanceof Lo?zi(i._targets,r)&&(a?(!Oo||i._initted&&i._ts)&&i.globalTime(0)<=t&&i.globalTime(i.totalDuration())>t:!t||i.isActive())&&n.push(i):(o=i.getTweensOf(r,t)).length&&n.push.apply(n,o),i=i._next;return n},n.tweenTo=function(e,t){t||={};var n=this,r=xa(n,e),i=t,a=i.startAt,o=i.onStart,s=i.onStartParams,c=i.immediateRender,l,u=Lo.to(n,Gi({ease:t.ease||`none`,lazy:!1,immediateRender:!1,time:r,overwrite:`auto`,duration:t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale())||B,onStart:function(){if(n.pause(),!l){var e=t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale());u._dur!==e&&va(u,e,0,1).render(u._time,!0,!0),l=1}o&&o.apply(u,s||[])}},t));return c?u.render(0):u},n.tweenFromTo=function(e,t,n){return this.tweenTo(t,Gi({startAt:{time:xa(this,e)}},n))},n.recent=function(){return this._recent},n.nextLabel=function(e){return e===void 0&&(e=this._time),Ka(this,xa(this,e))},n.previousLabel=function(e){return e===void 0&&(e=this._time),Ka(this,xa(this,e),1)},n.currentLabel=function(e){return arguments.length?this.seek(e,!0):this.previousLabel(this._time+B)},n.shiftChildren=function(e,t,n){n===void 0&&(n=0);var r=this._first,i=this.labels,a;for(e=H(e);r;)r._start>=n&&(r._start+=e,r._end+=e),r=r._next;if(t)for(a in i)i[a]>=n&&(i[a]+=e);return ta(this)},n.invalidate=function(t){var n=this._first;for(this._lock=0;n;)n.invalidate(t),n=n._next;return e.prototype.invalidate.call(this,t)},n.clear=function(e){e===void 0&&(e=!0);for(var t=this._first,n;t;)n=t._next,this.remove(t),t=n;return this._dp&&(this._time=this._tTime=this._pTime=0),e&&(this.labels={}),ta(this)},n.totalDuration=function(e){var t=0,n=this,r=n._last,i=Rr,a,o,s;if(arguments.length)return n.timeScale((n._repeat<0?n.duration():n.totalDuration())/(n.reversed()?-e:e));if(n._dirty){for(s=n.parent;r;)a=r._prev,r._dirty&&r.totalDuration(),o=r._start,o>i&&n._sort&&r._ts&&!n._lock?(n._lock=1,da(n,r,o-r._delay,1)._lock=0):i=o,o<0&&r._ts&&(t-=o,(!s&&!n._dp||s&&s.smoothChildTiming)&&(n._start+=H(o/n._ts),n._time-=o,n._tTime-=o),n.shiftChildren(-o,!1,-1/0),i=0),r._end>t&&r._ts&&(t=r._end),r=a;va(n,n===V&&n._time>t?n._time:t,1,1),n._dirty=0}return n._tDur},t.updateRoot=function(e){if(V._ts&&(Hi(V,sa(e,V)),Di=so.frame),so.frame>=Ai){Ai+=Pr.autoSleep||120;var t=V._first;if((!t||!t._ts)&&Pr.autoSleep&&so._listeners.length<2){for(;t&&!t._ts;)t=t._next;t||so.sleep()}}},t}(So);Gi(Co.prototype,{_lock:0,_hasPause:0,_forcing:0});var wo=function(e,t,n,r,i,a,o){var s=new Zo(this._pt,e,t,0,1,Go,null,i),c=0,l=0,u,d,f,p,m,h,g,_;for(s.b=n,s.e=r,n+=``,r+=``,(g=~r.indexOf(`random(`))&&(r=Ua(r)),a&&(_=[n,r],a(_,e,t),n=_[0],r=_[1]),d=n.match(oi)||[];u=oi.exec(r);)p=u[0],m=r.substring(c,u.index),f?f=(f+1)%5:m.substr(-5)===`rgba(`&&(f=1),p!==d[l++]&&(h=parseFloat(d[l-1])||0,s._pt={_next:s._pt,p:m||l===1?m:`,`,s:h,c:p.charAt(1)===`=`?Ri(h,p)-h:parseFloat(p)-h,m:f&&f<4?Math.round:0},c=oi.lastIndex);return s.c=c<r.length?r.substring(c,r.length):``,s.fp=o,(si.test(r)||g)&&(s.e=0),this._pt=s,s},To=function(e,t,n,r,i,a,o,s,c,l){Kr(r)&&(r=r(i||0,e,a));var u=e[t],d=n===`get`?Kr(u)?c?e[t.indexOf(`set`)||!Kr(e[`get`+t.substr(3)])?t:`get`+t.substr(3)](c):e[t]():u:n,f=Kr(u)?c?Bo:zo:Ro,p;if(Gr(r)&&(~r.indexOf(`random(`)&&(r=Ua(r)),r.charAt(1)===`=`&&(p=Ri(d,r)+(Ta(d)||0),(p||p===0)&&(r=p))),!l||d!==r||ko)return!isNaN(d*r)&&r!==``?(p=new Zo(this._pt,e,t,+d||0,r-(d||0),typeof u==`boolean`?Wo:Uo,0,f),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!u&&!(t in e)&&_i(t,r),wo.call(this,e,t,d,r,f,s||Pr.stringFilter,c))},Eo=function(e,t,n,r,i){if(Kr(e)&&(e=Po(e,i,t,n,r)),!Yr(e)||e.style&&e.nodeType||ei(e)||$r(e))return Gr(e)?Po(e,i,t,n,r):e;var a={},o;for(o in e)a[o]=Po(e[o],i,t,n,r);return a},Do=function(e,t,n,r,i,a){var o,s,c,l;if(Oi[e]&&(o=new Oi[e]).init(i,o.rawVars?t[e]:Eo(t[e],r,i,a,n),n,r,a)!==!1&&(n._pt=s=new Zo(n._pt,i,e,0,1,o.render,o,0,o.priority),n!==Ya))for(c=n._ptLookup[n._targets.indexOf(i)],l=o._props.length;l--;)c[o._props[l]]=s;return o},Oo,ko,Ao=function e(t,n,r){var i=t.vars,a=i.ease,o=i.startAt,s=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,p=i.autoRevert,m=t._dur,h=t._startAt,g=t._targets,_=t.parent,v=_&&_.data===`nested`?_.vars.targets:g,y=t._overwrite===`auto`&&!Ir,b=t.timeline,x=i.easeReverse||d,S,C,w,T,E,D,ee,te,O,ne,k,re,ie;if(b&&(!f||!a)&&(a=`none`),t._ease=go(a,Fr.ease),t._rEase=x&&(go(x)||t._ease),t._from=!b&&!!i.runBackwards,t._from&&(t.ratio=1),!b||f&&!i.stagger){if(te=g[0]?Pi(g[0]).harness:0,re=te&&i[te.prop],S=Yi(i,wi),h&&(h._zTime<0&&h.progress(1),n<0&&u&&s&&!p?h.render(-1,!0):h.revert(u&&m?Si:xi),h._lazy=0),o){if(ea(t._startAt=Lo.set(g,Gi({data:`isStart`,overwrite:!1,parent:_,immediateRender:!0,lazy:!h&&Xr(c),startAt:null,delay:0,onUpdate:l&&function(){return qa(t,`onUpdate`)},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,n<0&&(Lr||!s&&!p)&&t._startAt.revert(Si),s&&m&&n<=0&&r<=0){n&&(t._zTime=n);return}}else if(u&&m&&!h){if(n&&(s=!1),w=Gi({overwrite:!1,data:`isFromStart`,lazy:s&&!h&&Xr(c),immediateRender:s,stagger:0,parent:_},S),re&&(w[te.prop]=re),ea(t._startAt=Lo.set(g,w)),t._startAt._dp=0,t._startAt._sat=t,n<0&&(Lr?t._startAt.revert(Si):t._startAt.render(-1,!0)),t._zTime=n,!s)e(t._startAt,B,B);else if(!n)return}for(t._pt=t._ptCache=0,c=m&&Xr(c)||c&&!m,C=0;C<g.length;C++){if(E=g[C],ee=E._gsap||Ni(g)[C]._gsap,t._ptLookup[C]=ne={},Ei[ee.id]&&Ti.length&&Bi(),k=v===g?C:v.indexOf(E),te&&(O=new te).init(E,re||S,t,k,v)!==!1&&(t._pt=T=new Zo(t._pt,E,O.name,0,1,O.render,O,0,O.priority),O._props.forEach(function(e){ne[e]=T}),O.priority&&(D=1)),!te||re)for(w in S)Oi[w]&&(O=Do(w,S,t,k,E,v))?O.priority&&(D=1):ne[w]=T=To.call(t,E,w,`get`,S[w],k,v,0,i.stringFilter);t._op&&t._op[C]&&t.kill(E,t._op[C]),y&&t._pt&&(Oo=t,V.killTweensOf(E,ne,t.globalTime(n)),ie=!t.parent,Oo=0),t._pt&&c&&(Ei[ee.id]=1)}D&&Xo(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!ie,f&&n<=0&&b.render(Rr,!0,!0)},jo=function(e,t,n,r,i,a,o,s){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],l,u,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(l=d[f][t],l&&l.d&&l.d._pt)for(l=l.d._pt;l&&l.p!==t&&l.fp!==t;)l=l._next;if(!l)return ko=1,e.vars[t]=`+=0`,Ao(e,o),ko=0,s?vi(t+` not eligible for reset. Try splitting into individual properties`):1;c.push(l)}for(f=c.length;f--;)u=c[f],l=u._pt||u,l.s=(r||r===0)&&!i?r:l.s+(r||0)+a*l.c,l.c=n-l.s,u.e&&(u.e=Li(n)+Ta(u.e)),u.b&&(u.b=l.s+Ta(u.b))},Mo=function(e,t){var n=e[0]?Pi(e[0]).harness:0,r=n&&n.aliases,i,a,o,s;if(!r)return t;for(a in i=qi({},t),r)if(a in i)for(s=r[a].split(`,`),o=s.length;o--;)i[s[o]]=i[a];return i},No=function(e,t,n,r){var i=t.ease||r||`power1.inOut`,a,o;if(ei(t))o=n[e]||(n[e]=[]),t.forEach(function(e,n){return o.push({t:n/(t.length-1)*100,v:e,e:i})});else for(a in t)o=n[a]||(n[a]=[]),a===`ease`||o.push({t:parseFloat(e),v:t[a],e:i})},Po=function(e,t,n,r,i){return Kr(e)?e.call(t,n,r,i):Gr(e)&&~e.indexOf(`random(`)?Ua(e):e},Fo=Mi+`repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert`,Io={};Ii(Fo+`,id,stagger,delay,duration,paused,scrollTrigger`,function(e){return Io[e]=1});var Lo=function(e){Nr(t,e);function t(t,n,r,i){var a;typeof n==`number`&&(r.duration=n,n=r,r=null),a=e.call(this,i?n:Xi(n))||this;var o=a.vars,s=o.duration,c=o.delay,l=o.immediateRender,u=o.stagger,d=o.overwrite,f=o.keyframes,p=o.defaults,m=o.scrollTrigger,h=n.parent||V,g=(ei(t)||$r(t)?qr(t[0]):`length`in n)?[t]:Aa(t),_,v,y,b,x,S,C,w;if(a._targets=g.length?Ni(g):vi(`GSAP target `+t+` not found. https://gsap.com`,!Pr.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,f||u||Qr(s)||Qr(c)){n=a.vars;var T=n.easeReverse||n.yoyoEase;if(_=a.timeline=new Co({data:`nested`,defaults:p||{},targets:h&&h.data===`nested`?h.vars.targets:g}),_.kill(),_.parent=_._dp=Mr(a),_._start=0,u||Qr(s)||Qr(c)){if(b=g.length,C=u&&Na(u),Yr(u))for(x in u)~Fo.indexOf(x)&&(w||={},w[x]=u[x]);for(v=0;v<b;v++)y=Yi(n,Io),y.stagger=0,T&&(y.easeReverse=T),w&&qi(y,w),S=g[v],y.duration=+Po(s,Mr(a),v,S,g),y.delay=(+Po(c,Mr(a),v,S,g)||0)-a._delay,!u&&b===1&&y.delay&&(a._delay=c=y.delay,a._start+=c,y.delay=0),_.to(S,y,C?C(v,S,g):0),_._ease=W.none;_.duration()?s=c=0:a.timeline=0}else if(f){Xi(Gi(_.vars.defaults,{ease:`none`})),_._ease=go(f.ease||n.ease||`none`);var E=0,D,ee,te;if(ei(f))f.forEach(function(e){return _.to(g,e,`>`)}),_.duration();else{for(x in y={},f)x===`ease`||x===`easeEach`||No(x,f[x],y,f.easeEach);for(x in y)for(D=y[x].sort(function(e,t){return e.t-t.t}),E=0,v=0;v<D.length;v++)ee=D[v],te={ease:ee.e,duration:(ee.t-(v?D[v-1].t:0))/100*s},te[x]=ee.v,_.to(g,te,E),E+=te.duration;_.duration()<s&&_.to({},{duration:s-_.duration()})}}s||a.duration(s=_.duration())}else a.timeline=0;return d===!0&&!Ir&&(Oo=Mr(a),V.killTweensOf(g),Oo=0),da(h,Mr(a),r),n.reversed&&a.reverse(),n.paused&&a.paused(!0),(l||!s&&!f&&a._start===H(h._time)&&Xr(l)&&ia(Mr(a))&&h.data!==`nested`)&&(a._tTime=-B,a.render(Math.max(0,-c)||0)),m&&fa(Mr(a),m),a}var n=t.prototype;return n.render=function(e,t,n){var r=this._time,i=this._tDur,a=this._dur,o=e<0,s=e>i-B&&!o?i:e<B?0:e,c,l,u,d,f,p,m,h;if(!a)ga(this,e,t,n);else if(s!==this._tTime||!e||n||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==o||this._lazy){if(c=s,h=this.timeline,this._repeat){if(d=a+this._rDelay,this._repeat<-1&&o)return this.totalTime(d*100+e,t,n);if(c=H(s%d),s===i?(u=this._repeat,c=a):(f=H(s/d),u=~~f,u&&u===f?(c=a,u--):c>a&&(c=a)),p=this._yoyo&&u&1,p&&(c=a-c),f=oa(this._tTime,d),c===r&&!n&&this._initted&&u===f)return this._tTime=s,this;u!==f&&this.vars.repeatRefresh&&!p&&!this._lock&&c!==d&&this._initted&&(this._lock=n=1,this.render(H(d*u),!0).invalidate()._lock=0)}if(!this._initted){if(pa(this,o?e:c,n,t,s))return this._tTime=0,this;if(r!==this._time&&!(n&&this.vars.repeatRefresh&&u!==f))return this;if(a!==this._dur)return this.render(e,t,n)}if(this._rEase){var g=c<r;if(g!==this._inv){var _=g?r:a-r;this._inv=g,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=r,this._invRecip=_?(g?-1:1)/_:0,this._invScale=g?-this.ratio:1-this.ratio,this._invEase=g?this._rEase:this._ease}this.ratio=m=this._invRatio+this._invScale*this._invEase((c-this._invTime)*this._invRecip)}else this.ratio=m=this._ease(c/a);if(this._from&&(this.ratio=m=1-m),this._tTime=s,this._time=c,!this._act&&this._ts&&(this._act=1,this._lazy=0),!r&&s&&!t&&!f&&(qa(this,`onStart`),this._tTime!==s))return this;for(l=this._pt;l;)l.r(m,l.d),l=l._next;h&&h.render(e<0?e:h._dur*h._ease(c/this._dur),t,n)||this._startAt&&(this._zTime=e),this._onUpdate&&!t&&(o&&ra(this,e,t,n),qa(this,`onUpdate`)),this._repeat&&u!==f&&this.vars.onRepeat&&!t&&this.parent&&qa(this,`onRepeat`),(s===this._tDur||!s)&&this._tTime===s&&(o&&!this._onUpdate&&ra(this,e,!0,!0),(e||!a)&&(s===this._tDur&&this._ts>0||!s&&this._ts<0)&&ea(this,1),!t&&(!o||r)&&(s||r||p)&&(qa(this,s===i?`onComplete`:`onReverseComplete`,!0),this._prom&&!(s<i&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(t){return(!t||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),e.prototype.invalidate.call(this,t)},n.resetTo=function(e,t,n,r,i){oo||so.wake(),this._ts||this.play();var a=Math.min(this._dur,(this._dp._time-this._start)*this._ts),o;return this._initted||Ao(this,a),o=this._ease(a/this._dur),jo(this,e,t,n,r,o,a,i)?this.resetTo(e,t,n,r,1):(la(this,0),this.parent||Qi(this._dp,this,`_first`,`_last`,this._dp._sort?`_start`:0),this.render(0))},n.kill=function(e,t){if(t===void 0&&(t=`all`),!e&&(!t||t===`all`))return this._lazy=this._pt=0,this.parent?Ja(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Lr),this;if(this.timeline){var n=this.timeline.totalDuration();return this.timeline.killTweensOf(e,t,Oo&&Oo.vars.overwrite!==!0)._first||Ja(this),this.parent&&n!==this.timeline.totalDuration()&&va(this,this._dur*this.timeline._tDur/n,0,1),this}var r=this._targets,i=e?Aa(e):r,a=this._ptLookup,o=this._pt,s,c,l,u,d,f,p;if((!t||t===`all`)&&Zi(r,i))return t===`all`&&(this._pt=0),Ja(this);for(s=this._op=this._op||[],t!==`all`&&(Gr(t)&&(d={},Ii(t,function(e){return d[e]=1}),t=d),t=Mo(r,t)),p=r.length;p--;)if(~i.indexOf(r[p]))for(d in c=a[p],t===`all`?(s[p]=t,u=c,l={}):(l=s[p]=s[p]||{},u=t),u)f=c&&c[d],f&&((!(`kill`in f.d)||f.d.kill(d)===!0)&&$i(this,f,`_pt`),delete c[d]),l!==`all`&&(l[d]=1);return this._initted&&!this._pt&&o&&Ja(this),this},t.to=function(e,n){return new t(e,n,arguments[2])},t.from=function(e,t){return Sa(1,arguments)},t.delayedCall=function(e,n,r,i){return new t(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:e,onComplete:n,onReverseComplete:n,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},t.fromTo=function(e,t,n){return Sa(2,arguments)},t.set=function(e,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new t(e,n)},t.killTweensOf=function(e,t,n){return V.killTweensOf(e,t,n)},t}(So);Gi(Lo.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),Ii(`staggerTo,staggerFrom,staggerFromTo`,function(e){Lo[e]=function(){var t=new Co,n=Da.call(arguments,0);return n.splice(e===`staggerFromTo`?5:4,0,0),t[e].apply(t,n)}});var Ro=function(e,t,n){return e[t]=n},zo=function(e,t,n){return e[t](n)},Bo=function(e,t,n,r){return e[t](r.fp,n)},Vo=function(e,t,n){return e.setAttribute(t,n)},Ho=function(e,t){return Kr(e[t])?zo:Jr(e[t])&&e.setAttribute?Vo:Ro},Uo=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Wo=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Go=function(e,t){var n=t._pt,r=``;if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},Ko=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},qo=function(e,t,n,r){for(var i=this._pt,a;i;)a=i._next,i.p===r&&i.modifier(e,t,n),i=a},Jo=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?$i(this,t,`_pt`):t.dep||(n=1),t=r;return!n},Yo=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},Xo=function(e){for(var t=e._pt,n,r,i,a;t;){for(n=t._next,r=i;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:i=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=i},Zo=function(){function e(e,t,n,r,i,a,o,s,c){this.t=t,this.s=r,this.c=i,this.p=n,this.r=a||Uo,this.d=o||this,this.set=s||Ro,this.pr=c||0,this._next=e,e&&(e._prev=this)}var t=e.prototype;return t.modifier=function(e,t,n){this.mSet=this.mSet||this.set,this.set=Yo,this.m=e,this.mt=n,this.tween=t},e}();Ii(Mi+`parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse`,function(e){return wi[e]=1}),pi.TweenMax=pi.TweenLite=Lo,pi.TimelineLite=pi.TimelineMax=Co,V=new Co({sortChildren:!1,defaults:Fr,autoRemoveChildren:!0,id:`root`,smoothChildTiming:!0}),Pr.stringFilter=ao;var Qo=[],$o={},es=[],ts=0,ns=0,rs=function(e){return($o[e]||es).map(function(e){return e()})},is=function(){var e=Date.now(),t=[];e-ts>2&&(rs(`matchMediaInit`),Qo.forEach(function(e){var n=e.queries,r=e.conditions,i,a,o,s;for(a in n)i=ui.matchMedia(n[a]).matches,i&&(o=1),i!==r[a]&&(r[a]=i,s=1);s&&(e.revert(),o&&t.push(e))}),rs(`matchMediaRevert`),t.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),ts=e,rs(`matchMedia`))},as=function(){function e(e,t){this.selector=t&&ja(t),this.data=[],this._r=[],this.isReverted=!1,this.id=ns++,e&&this.add(e)}var t=e.prototype;return t.add=function(e,t,n){Kr(e)&&(n=t,t=e,e=Kr);var r=this,i=function(){var e=z,i=r.selector,a;return e&&e!==r&&e.data.push(r),n&&(r.selector=ja(n)),z=r,a=t.apply(r,arguments),Kr(a)&&r._r.push(a),z=e,r.selector=i,r.isReverted=!1,a};return r.last=i,e===Kr?i(r,function(e){return r.add(null,e)}):e?r[e]=i:i},t.ignore=function(e){var t=z;z=null,e(this),z=t},t.getTweens=function(){var t=[];return this.data.forEach(function(n){return n instanceof e?t.push.apply(t,n.getTweens()):n instanceof Lo&&!(n.parent&&n.parent.data===`nested`)&&t.push(n)}),t},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(e,t){var n=this;if(e?(function(){for(var t=n.getTweens(),r=n.data.length,i;r--;)i=n.data[r],i.data===`isFlip`&&(i.revert(),i.getChildren(!0,!0,!1).forEach(function(e){return t.splice(t.indexOf(e),1)}));for(t.map(function(e){return{g:e._dur||e._delay||e._sat&&!e._sat.vars.immediateRender?e.globalTime(0):-1/0,t:e}}).sort(function(e,t){return t.g-e.g||-1/0}).forEach(function(t){return t.t.revert(e)}),r=n.data.length;r--;)i=n.data[r],i instanceof Co?i.data!==`nested`&&(i.scrollTrigger&&i.scrollTrigger.revert(),i.kill()):!(i instanceof Lo)&&i.revert&&i.revert(e);n._r.forEach(function(t){return t(e,n)}),n.isReverted=!0})():this.data.forEach(function(e){return e.kill&&e.kill()}),this.clear(),t)for(var r=Qo.length;r--;)Qo[r].id===this.id&&Qo.splice(r,1)},t.revert=function(e){this.kill(e||{})},e}(),os=function(){function e(e){this.contexts=[],this.scope=e,z&&z.data.push(this)}var t=e.prototype;return t.add=function(e,t,n){Yr(e)||(e={matches:e});var r=new as(0,n||this.scope),i=r.conditions={},a,o,s;for(o in z&&!r.selector&&(r.selector=z.selector),this.contexts.push(r),t=r.add(`onMatch`,t),r.queries=e,e)o===`all`?s=1:(a=ui.matchMedia(e[o]),a&&(Qo.indexOf(r)<0&&Qo.push(r),(i[o]=a.matches)&&(s=1),a.addListener?a.addListener(is):a.addEventListener(`change`,is)));return s&&t(r,function(e){return r.add(null,e)}),this},t.revert=function(e){this.kill(e||{})},t.kill=function(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},e}(),ss={registerPlugin:function(){[...arguments].forEach(function(e){return Za(e)})},timeline:function(e){return new Co(e)},getTweensOf:function(e,t){return V.getTweensOf(e,t)},getProperty:function(e,t,n,r){Gr(e)&&(e=Aa(e)[0]);var i=Pi(e||{}).get,a=n?Wi:Ui;return n===`native`&&(n=``),e&&(t?a((Oi[t]&&Oi[t].get||i)(e,t,n,r)):function(t,n,r){return a((Oi[t]&&Oi[t].get||i)(e,t,n,r))})},quickSetter:function(e,t,n){if(e=Aa(e),e.length>1){var r=e.map(function(e){return ds.quickSetter(e,t,n)}),i=r.length;return function(e){for(var t=i;t--;)r[t](e)}}e=e[0]||{};var a=Oi[t],o=Pi(e),s=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(t){var r=new a;Ya._pt=0,r.init(e,n?t+n:t,Ya,0,[e]),r.render(1,r),Ya._pt&&Ko(1,Ya)}:o.set(e,s);return a?c:function(t){return c(e,s,n?t+n:t,o,1)}},quickTo:function(e,t,n){var r,i=ds.to(e,Gi((r={},r[t]=`+=0.1`,r.paused=!0,r.stagger=0,r),n||{})),a=function(e,n,r){return i.resetTo(t,e,n,r)};return a.tween=i,a},isTweening:function(e){return V.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=go(e.ease,Fr.ease)),Ji(Fr,e||{})},config:function(e){return Ji(Pr,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,i=e.defaults,a=e.extendTimeline;(r||``).split(`,`).forEach(function(e){return e&&!Oi[e]&&!pi[e]&&vi(t+` effect requires `+e+` plugin.`)}),ki[t]=function(e,t,r){return n(Aa(e),Gi(t||{},i),r)},a&&(Co.prototype[t]=function(e,n,r){return this.add(ki[t](e,Yr(n)?n:(r=n)&&{},this),r)})},registerEase:function(e,t){W[e]=go(t)},parseEase:function(e,t){return arguments.length?go(e,t):W},getById:function(e){return V.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Co(e),r,i;for(n.smoothChildTiming=Xr(e.smoothChildTiming),V.remove(n),n._dp=0,n._time=n._tTime=V._time,r=V._first;r;)i=r._next,(t||!(!r._dur&&r instanceof Lo&&r.vars.onComplete===r._targets[0]))&&da(n,r,r._start-r._delay),r=i;return da(V,n,0),n},context:function(e,t){return e?new as(e,t):z},matchMedia:function(e){return new os(e)},matchMediaRefresh:function(){return Qo.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||is()},addEventListener:function(e,t){var n=$o[e]||($o[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=$o[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:Va,wrapYoyo:Ha,distribute:Na,random:Ia,snap:Fa,normalize:za,getUnit:Ta,clamp:Ea,splitColor:eo,toArray:Aa,selector:ja,mapRange:Wa,pipe:La,unitize:Ra,interpolate:Ga,shuffle:Ma},install:gi,effects:ki,ticker:so,updateRoot:Co.updateRoot,plugins:Oi,globalTimeline:V,core:{PropTween:Zo,globals:yi,Tween:Lo,Timeline:Co,Animation:So,getCache:Pi,_removeLinkedListItem:$i,reverting:function(){return Lr},context:function(e){return e&&z&&(z.data.push(e),e._ctx=z),z},suppressOverwrites:function(e){return Ir=e}}};Ii(`to,from,fromTo,delayedCall,set,killTweensOf`,function(e){return ss[e]=Lo[e]}),so.add(Co.updateRoot),Ya=ss.to({},{duration:0});var cs=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},ls=function(e,t){var n=e._targets,r,i,a;for(r in t)for(i=n.length;i--;)a=e._ptLookup[i][r],(a&&=a.d)&&(a._pt&&(a=cs(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[i],r))},us=function(e,t){return{name:e,headless:1,rawVars:1,init:function(e,n,r){r._onInit=function(e){var r,i;if(Gr(n)&&(r={},Ii(n,function(e){return r[e]=1}),n=r),t){for(i in r={},n)r[i]=t(n[i]);n=r}ls(e,n)}}}},ds=ss.registerPlugin({name:`attr`,init:function(e,t,n,r,i){var a,o,s;for(a in this.tween=n,t)s=e.getAttribute(a)||``,o=this.add(e,`setAttribute`,(s||0)+``,t[a],r,i,0,0,a),o.op=a,o.b=s,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)Lr?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:`endArray`,headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},us(`roundProps`,Pa),us(`modifiers`),us(`snap`,Fa))||ss;Lo.version=Co.version=ds.version=`3.15.0`,hi=1,Zr()&&co(),W.Power0,W.Power1,W.Power2,W.Power3,W.Power4,W.Linear,W.Quad,W.Cubic,W.Quart,W.Quint,W.Strong,W.Elastic,W.Back,W.SteppedEase,W.Bounce,W.Sine,W.Expo,W.Circ;var fs,ps,ms,hs,gs,_s,vs,ys=function(){return typeof window<`u`},bs={},xs=180/Math.PI,Ss=Math.PI/180,Cs=Math.atan2,ws=1e8,Ts=/([A-Z])/g,Es=/(left|right|width|margin|padding|x)/i,Ds=/[\s,\(]\S/,Os={autoAlpha:`opacity,visibility`,scale:`scaleX,scaleY`,alpha:`opacity`},ks=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},As=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},js=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Ms=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Ns=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Ps=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Fs=function(e,t){return t.set(t.t,t.p,e===1?t.e:t.b,t)},Is=function(e,t,n){return e.style[t]=n},Ls=function(e,t,n){return e.style.setProperty(t,n)},Rs=function(e,t,n){return e._gsap[t]=n},zs=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},Bs=function(e,t,n,r,i){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(i,a)},Vs=function(e,t,n,r,i){var a=e._gsap;a[t]=n,a.renderTransform(i,a)},G=`transform`,Hs=G+`Origin`,Us=function e(t,n){var r=this,i=this.target,a=i.style,o=i._gsap;if(t in bs&&a){if(this.tfm=this.tfm||{},t!==`transform`)t=Os[t]||t,~t.indexOf(`,`)?t.split(`,`).forEach(function(e){return r.tfm[e]=cc(i,e)}):this.tfm[t]=o.x?o[t]:cc(i,t),t===Hs&&(this.tfm.zOrigin=o.zOrigin);else return Os.transform.split(`,`).forEach(function(t){return e.call(r,t,n)});if(this.props.indexOf(G)>=0)return;o.svg&&(this.svgo=i.getAttribute(`data-svg-origin`),this.props.push(Hs,n,``)),t=G}(a||n)&&this.props.push(t,n,a[t])},Ws=function(e){e.translate&&(e.removeProperty(`translate`),e.removeProperty(`scale`),e.removeProperty(`rotate`))},Gs=function(){for(var e=this.props,t=this.target,n=t.style,r=t._gsap,i=0,a;i<e.length;i+=3)e[i+1]?e[i+1]===2?t[e[i]](e[i+2]):t[e[i]]=e[i+2]:e[i+2]?n[e[i]]=e[i+2]:n.removeProperty(e[i].substr(0,2)===`--`?e[i]:e[i].replace(Ts,`-$1`).toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute(`data-svg-origin`,this.svgo||``)),i=vs(),(!i||!i.isStart)&&!n[G]&&(Ws(n),r.zOrigin&&n[Hs]&&(n[Hs]+=` `+r.zOrigin+`px`,r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Ks=function(e,t){var n={target:e,props:[],revert:Gs,save:Us};return e._gsap||ds.core.getCache(e),t&&e.style&&e.nodeType&&t.split(`,`).forEach(function(e){return n.save(e)}),n},qs,Js=function(e,t){var n=ps.createElementNS?ps.createElementNS((t||`http://www.w3.org/1999/xhtml`).replace(/^https/,`http`),e):ps.createElement(e);return n&&n.style?n:ps.createElement(e)},Ys=function e(t,n,r){var i=getComputedStyle(t);return i[n]||i.getPropertyValue(n.replace(Ts,`-$1`).toLowerCase())||i.getPropertyValue(n)||!r&&e(t,Zs(n)||n,1)||``},Xs=`O,Moz,ms,Ms,Webkit`.split(`,`),Zs=function(e,t,n){var r=(t||gs).style,i=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);i--&&!(Xs[i]+e in r););return i<0?null:(i===3?`ms`:i>=0?Xs[i]:``)+e},Qs=function(){ys()&&window.document&&(fs=window,ps=fs.document,ms=ps.documentElement,gs=Js(`div`)||{style:{}},Js(`div`),G=Zs(G),Hs=G+`Origin`,gs.style.cssText=`border-width:0;line-height:0;position:absolute;padding:0`,qs=!!Zs(`perspective`),vs=ds.core.reverting,hs=1)},$s=function(e){var t=e.ownerSVGElement,n=Js(`svg`,t&&t.getAttribute(`xmlns`)||`http://www.w3.org/2000/svg`),r=e.cloneNode(!0),i;r.style.display=`block`,n.appendChild(r),ms.appendChild(n);try{i=r.getBBox()}catch{}return n.removeChild(r),ms.removeChild(n),i},ec=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},tc=function(e){var t,n;try{t=e.getBBox()}catch{t=$s(e),n=1}return t&&(t.width||t.height)||n||(t=$s(e)),t&&!t.width&&!t.x&&!t.y?{x:+ec(e,[`x`,`cx`,`x1`])||0,y:+ec(e,[`y`,`cy`,`y1`])||0,width:0,height:0}:t},nc=function(e){return!(!e.getCTM||e.parentNode&&!e.ownerSVGElement||!tc(e))},rc=function(e,t){if(t){var n=e.style,r;t in bs&&t!==Hs&&(t=G),n.removeProperty?(r=t.substr(0,2),(r===`ms`||t.substr(0,6)===`webkit`)&&(t=`-`+t),n.removeProperty(r===`--`?t:t.replace(Ts,`-$1`).toLowerCase())):n.removeAttribute(t)}},ic=function(e,t,n,r,i,a){var o=new Zo(e._pt,t,n,0,1,a?Fs:Ps);return e._pt=o,o.b=r,o.e=i,e._props.push(n),o},ac={deg:1,rad:1,turn:1},oc={grid:1,flex:1},sc=function e(t,n,r,i){var a=parseFloat(r)||0,o=(r+``).trim().substr((a+``).length)||`px`,s=gs.style,c=Es.test(n),l=t.tagName.toLowerCase()===`svg`,u=(l?`client`:`offset`)+(c?`Width`:`Height`),d=100,f=i===`px`,p=i===`%`,m,h,g,_;if(i===o||!a||ac[i]||ac[o])return a;if(o!==`px`&&!f&&(a=e(t,n,r,`px`)),_=t.getCTM&&nc(t),(p||o===`%`)&&(bs[n]||~n.indexOf(`adius`)))return m=_?t.getBBox()[c?`width`:`height`]:t[u],Li(p?a/m*d:a/100*m);if(s[c?`width`:`height`]=d+(f?o:i),h=i!==`rem`&&~n.indexOf(`adius`)||i===`em`&&t.appendChild&&!l?t:t.parentNode,_&&(h=(t.ownerSVGElement||{}).parentNode),(!h||h===ps||!h.appendChild)&&(h=ps.body),g=h._gsap,g&&p&&g.width&&c&&g.time===so.time&&!g.uncache)return Li(a/g.width*d);if(p&&(n===`height`||n===`width`)){var v=t.style[n];t.style[n]=d+i,m=t[u],v?t.style[n]=v:rc(t,n)}else(p||o===`%`)&&!oc[Ys(h,`display`)]&&(s.position=Ys(t,`position`)),h===t&&(s.position=`static`),h.appendChild(gs),m=gs[u],h.removeChild(gs),s.position=`absolute`;return c&&p&&(g=Pi(h),g.time=so.time,g.width=h[u]),Li(f?m*a/d:m&&a?d/m*a:0)},cc=function(e,t,n,r){var i;return hs||Qs(),t in Os&&t!==`transform`&&(t=Os[t],~t.indexOf(`,`)&&(t=t.split(`,`)[0])),bs[t]&&t!==`transform`?(i=bc(e,r),i=t===`transformOrigin`?i.svg?i.origin:xc(Ys(e,Hs))+` `+i.zOrigin+`px`:i[t]):(i=e.style[t],(!i||i===`auto`||r||~(i+``).indexOf(`calc(`))&&(i=pc[t]&&pc[t](e,t,n)||Ys(e,t)||Fi(e,t)||+(t===`opacity`))),n&&!~(i+``).trim().indexOf(` `)?sc(e,t,i,n)+n:i},lc=function(e,t,n,r){if(!n||n===`none`){var i=Zs(t,e,1),a=i&&Ys(e,i,1);a&&a!==n?(t=i,n=a):t===`borderColor`&&(n=Ys(e,`borderTopColor`))}var o=new Zo(this._pt,e.style,t,0,1,Go),s=0,c=0,l,u,d,f,p,m,h,g,_,v,y,b;if(o.b=n,o.e=r,n+=``,r+=``,r.substring(0,6)===`var(--`&&(r=Ys(e,r.substring(4,r.indexOf(`)`)))),r===`auto`&&(m=e.style[t],e.style[t]=r,r=Ys(e,t)||r,m?e.style[t]=m:rc(e,t)),l=[n,r],ao(l),n=l[0],r=l[1],d=n.match(ai)||[],b=r.match(ai)||[],b.length){for(;u=ai.exec(r);)h=u[0],_=r.substring(s,u.index),p?p=(p+1)%5:(_.substr(-5)===`rgba(`||_.substr(-5)===`hsla(`)&&(p=1),h!==(m=d[c++]||``)&&(f=parseFloat(m)||0,y=m.substr((f+``).length),h.charAt(1)===`=`&&(h=Ri(f,h)+y),g=parseFloat(h),v=h.substr((g+``).length),s=ai.lastIndex-v.length,v||(v=v||Pr.units[t]||y,s===r.length&&(r+=v,o.e+=v)),y!==v&&(f=sc(e,t,m,v)||0),o._pt={_next:o._pt,p:_||c===1?_:`,`,s:f,c:g-f,m:p&&p<4||t===`zIndex`?Math.round:0});o.c=s<r.length?r.substring(s,r.length):``}else o.r=t===`display`&&r===`none`?Fs:Ps;return si.test(r)&&(o.e=0),this._pt=o,o},uc={top:`0%`,bottom:`100%`,left:`0%`,right:`100%`,center:`50%`},dc=function(e){var t=e.split(` `),n=t[0],r=t[1]||`50%`;return(n===`top`||n===`bottom`||r===`left`||r===`right`)&&(e=n,n=r,r=e),t[0]=uc[n]||n,t[1]=uc[r]||r,t.join(` `)},fc=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,i=t.u,a=n._gsap,o,s,c;if(i===`all`||i===!0)r.cssText=``,s=1;else for(i=i.split(`,`),c=i.length;--c>-1;)o=i[c],bs[o]&&(s=1,o=o===`transformOrigin`?Hs:G),rc(n,o);s&&(rc(n,G),a&&(a.svg&&n.removeAttribute(`transform`),r.scale=r.rotate=r.translate=`none`,bc(n,1),a.uncache=1,Ws(r)))}},pc={clearProps:function(e,t,n,r,i){if(i.data!==`isFromStart`){var a=e._pt=new Zo(e._pt,t,n,0,0,fc);return a.u=r,a.pr=-10,a.tween=i,e._props.push(n),1}}},mc=[1,0,0,1,0,0],hc={},gc=function(e){return e===`matrix(1, 0, 0, 1, 0, 0)`||e===`none`||!e},_c=function(e){var t=Ys(e,G);return gc(t)?mc:t.substr(7).match(ii).map(Li)},vc=function(e,t){var n=e._gsap||Pi(e),r=e.style,i=_c(e),a,o,s,c;return n.svg&&e.getAttribute(`transform`)?(s=e.transform.baseVal.consolidate().matrix,i=[s.a,s.b,s.c,s.d,s.e,s.f],i.join(`,`)===`1,0,0,1,0,0`?mc:i):(i===mc&&!e.offsetParent&&e!==ms&&!n.svg&&(s=r.display,r.display=`block`,a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,ms.appendChild(e)),i=_c(e),s?r.display=s:rc(e,`display`),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):ms.removeChild(e))),t&&i.length>6?[i[0],i[1],i[4],i[5],i[12],i[13]]:i)},yc=function(e,t,n,r,i,a){var o=e._gsap,s=i||vc(e,!0),c=o.xOrigin||0,l=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,f=s[0],p=s[1],m=s[2],h=s[3],g=s[4],_=s[5],v=t.split(` `),y=parseFloat(v[0])||0,b=parseFloat(v[1])||0,x,S,C,w;n?s!==mc&&(S=f*h-p*m)&&(C=h/S*y+b*(-m/S)+(m*_-h*g)/S,w=y*(-p/S)+f/S*b-(f*_-p*g)/S,y=C,b=w):(x=tc(e),y=x.x+(~v[0].indexOf(`%`)?y/100*x.width:y),b=x.y+(~(v[1]||v[0]).indexOf(`%`)?b/100*x.height:b)),r||r!==!1&&o.smooth?(g=y-c,_=b-l,o.xOffset=u+(g*f+_*m)-g,o.yOffset=d+(g*p+_*h)-_):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=b,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[Hs]=`0px 0px`,a&&(ic(a,o,`xOrigin`,c,y),ic(a,o,`yOrigin`,l,b),ic(a,o,`xOffset`,u,o.xOffset),ic(a,o,`yOffset`,d,o.yOffset)),e.setAttribute(`data-svg-origin`,y+` `+b)},bc=function(e,t){var n=e._gsap||new xo(e);if(`x`in n&&!t&&!n.uncache)return n;var r=e.style,i=n.scaleX<0,a=`px`,o=`deg`,s=getComputedStyle(e),c=Ys(e,Hs)||`0`,l=u=d=m=h=g=_=v=y=0,u,d,f=p=1,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,ee,te,O,ne,k,re,ie,ae,oe,se,ce,le,ue;return n.svg=!!(e.getCTM&&nc(e)),s.translate&&((s.translate!==`none`||s.scale!==`none`||s.rotate!==`none`)&&(r[G]=(s.translate===`none`?``:`translate3d(`+(s.translate+` 0 0`).split(` `).slice(0,3).join(`, `)+`) `)+(s.rotate===`none`?``:`rotate(`+s.rotate+`) `)+(s.scale===`none`?``:`scale(`+s.scale.split(` `).join(`,`)+`) `)+(s[G]===`none`?``:s[G])),r.scale=r.rotate=r.translate=`none`),S=vc(e,n.svg),n.svg&&(n.uncache?(re=e.getBBox(),c=n.xOrigin-re.x+`px `+(n.yOrigin-re.y)+`px`,k=``):k=!t&&e.getAttribute(`data-svg-origin`),yc(e,k||c,!!k||n.originIsAbsolute,n.smooth!==!1,S)),b=n.xOrigin||0,x=n.yOrigin||0,S!==mc&&(E=S[0],D=S[1],ee=S[2],te=S[3],l=O=S[4],u=ne=S[5],S.length===6?(f=Math.sqrt(E*E+D*D),p=Math.sqrt(te*te+ee*ee),m=E||D?Cs(D,E)*xs:0,_=ee||te?Cs(ee,te)*xs+m:0,_&&(p*=Math.abs(Math.cos(_*Ss))),n.svg&&(l-=b-(b*E+x*ee),u-=x-(b*D+x*te))):(ue=S[6],ce=S[7],ae=S[8],oe=S[9],se=S[10],le=S[11],l=S[12],u=S[13],d=S[14],C=Cs(ue,se),h=C*xs,C&&(w=Math.cos(-C),T=Math.sin(-C),k=O*w+ae*T,re=ne*w+oe*T,ie=ue*w+se*T,ae=O*-T+ae*w,oe=ne*-T+oe*w,se=ue*-T+se*w,le=ce*-T+le*w,O=k,ne=re,ue=ie),C=Cs(-ee,se),g=C*xs,C&&(w=Math.cos(-C),T=Math.sin(-C),k=E*w-ae*T,re=D*w-oe*T,ie=ee*w-se*T,le=te*T+le*w,E=k,D=re,ee=ie),C=Cs(D,E),m=C*xs,C&&(w=Math.cos(C),T=Math.sin(C),k=E*w+D*T,re=O*w+ne*T,D=D*w-E*T,ne=ne*w-O*T,E=k,O=re),h&&Math.abs(h)+Math.abs(m)>359.9&&(h=m=0,g=180-g),f=Li(Math.sqrt(E*E+D*D+ee*ee)),p=Li(Math.sqrt(ne*ne+ue*ue)),C=Cs(O,ne),_=Math.abs(C)>2e-4?C*xs:0,y=le?1/(le<0?-le:le):0),n.svg&&(k=e.getAttribute(`transform`),n.forceCSS=e.setAttribute(`transform`,``)||!gc(Ys(e,G)),k&&e.setAttribute(`transform`,k))),Math.abs(_)>90&&Math.abs(_)<270&&(i?(f*=-1,_+=m<=0?180:-180,m+=m<=0?180:-180):(p*=-1,_+=_<=0?180:-180)),t||=n.uncache,n.x=l-((n.xPercent=l&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-l)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=Li(f),n.scaleY=Li(p),n.rotation=Li(m)+o,n.rotationX=Li(h)+o,n.rotationY=Li(g)+o,n.skewX=_+o,n.skewY=v+o,n.transformPerspective=y+a,(n.zOrigin=parseFloat(c.split(` `)[2])||!t&&n.zOrigin||0)&&(r[Hs]=xc(c)),n.xOffset=n.yOffset=0,n.force3D=Pr.force3D,n.renderTransform=n.svg?Oc:qs?Dc:Cc,n.uncache=0,n},xc=function(e){return(e=e.split(` `))[0]+` `+e[1]},Sc=function(e,t,n){var r=Ta(t);return Li(parseFloat(t)+parseFloat(sc(e,`x`,n+`px`,r)))+r},Cc=function(e,t){t.z=`0px`,t.rotationY=t.rotationX=`0deg`,t.force3D=0,Dc(e,t)},wc=`0deg`,Tc=`0px`,Ec=`) `,Dc=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.z,c=n.rotation,l=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,p=n.scaleX,m=n.scaleY,h=n.transformPerspective,g=n.force3D,_=n.target,v=n.zOrigin,y=``,b=g===`auto`&&e&&e!==1||g===!0;if(v&&(u!==wc||l!==wc)){var x=parseFloat(l)*Ss,S=Math.sin(x),C=Math.cos(x),w;x=parseFloat(u)*Ss,w=Math.cos(x),a=Sc(_,a,S*w*-v),o=Sc(_,o,-Math.sin(x)*-v),s=Sc(_,s,C*w*-v+v)}h!==Tc&&(y+=`perspective(`+h+Ec),(r||i)&&(y+=`translate(`+r+`%, `+i+`%) `),(b||a!==Tc||o!==Tc||s!==Tc)&&(y+=s!==Tc||b?`translate3d(`+a+`, `+o+`, `+s+`) `:`translate(`+a+`, `+o+Ec),c!==wc&&(y+=`rotate(`+c+Ec),l!==wc&&(y+=`rotateY(`+l+Ec),u!==wc&&(y+=`rotateX(`+u+Ec),(d!==wc||f!==wc)&&(y+=`skew(`+d+`, `+f+Ec),(p!==1||m!==1)&&(y+=`scale(`+p+`, `+m+Ec),_.style[G]=y||`translate(0, 0)`},Oc=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.rotation,c=n.skewX,l=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,p=n.xOrigin,m=n.yOrigin,h=n.xOffset,g=n.yOffset,_=n.forceCSS,v=parseFloat(a),y=parseFloat(o),b,x,S,C,w;s=parseFloat(s),c=parseFloat(c),l=parseFloat(l),l&&(l=parseFloat(l),c+=l,s+=l),s||c?(s*=Ss,c*=Ss,b=Math.cos(s)*u,x=Math.sin(s)*u,S=Math.sin(s-c)*-d,C=Math.cos(s-c)*d,c&&(l*=Ss,w=Math.tan(c-l),w=Math.sqrt(1+w*w),S*=w,C*=w,l&&(w=Math.tan(l),w=Math.sqrt(1+w*w),b*=w,x*=w)),b=Li(b),x=Li(x),S=Li(S),C=Li(C)):(b=u,C=d,x=S=0),(v&&!~(a+``).indexOf(`px`)||y&&!~(o+``).indexOf(`px`))&&(v=sc(f,`x`,a,`px`),y=sc(f,`y`,o,`px`)),(p||m||h||g)&&(v=Li(v+p-(p*b+m*S)+h),y=Li(y+m-(p*x+m*C)+g)),(r||i)&&(w=f.getBBox(),v=Li(v+r/100*w.width),y=Li(y+i/100*w.height)),w=`matrix(`+b+`,`+x+`,`+S+`,`+C+`,`+v+`,`+y+`)`,f.setAttribute(`transform`,w),_&&(f.style[G]=w)},kc=function(e,t,n,r,i){var a=360,o=Gr(i),s=parseFloat(i)*(o&&~i.indexOf(`rad`)?xs:1)-r,c=r+s+`deg`,l,u;return o&&(l=i.split(`_`)[1],l===`short`&&(s%=a,s!==s%(a/2)&&(s+=s<0?a:-a)),l===`cw`&&s<0?s=(s+a*ws)%a-~~(s/a)*a:l===`ccw`&&s>0&&(s=(s-a*ws)%a-~~(s/a)*a)),e._pt=u=new Zo(e._pt,t,n,r,s,As),u.e=c,u.u=`deg`,e._props.push(n),u},Ac=function(e,t){for(var n in t)e[n]=t[n];return e},jc=function(e,t,n){var r=Ac({},n._gsap),i=`perspective,force3D,transformOrigin,svgOrigin`,a=n.style,o,s,c,l,u,d,f,p;for(s in r.svg?(c=n.getAttribute(`transform`),n.setAttribute(`transform`,``),a[G]=t,o=bc(n,1),rc(n,G),n.setAttribute(`transform`,c)):(c=getComputedStyle(n)[G],a[G]=t,o=bc(n,1),a[G]=c),bs)c=r[s],l=o[s],c!==l&&i.indexOf(s)<0&&(f=Ta(c),p=Ta(l),u=f===p?parseFloat(c):sc(n,s,c,p),d=parseFloat(l),e._pt=new Zo(e._pt,o,s,u,d-u,ks),e._pt.u=p||0,e._props.push(s));Ac(o,r)};Ii(`padding,margin,Width,Radius`,function(e,t){var n=`Top`,r=`Right`,i=`Bottom`,a=`Left`,o=(t<3?[n,r,i,a]:[n+a,n+r,i+r,i+a]).map(function(n){return t<2?e+n:`border`+n+e});pc[t>1?`border`+e:e]=function(e,t,n,r,i){var a,s;if(arguments.length<4)return a=o.map(function(t){return cc(e,t,n)}),s=a.join(` `),s.split(a[0]).length===5?a[0]:s;a=(r+``).split(` `),s={},o.forEach(function(e,t){return s[e]=a[t]=a[t]||a[(t-1)/2|0]}),e.init(t,s,i)}});var Mc={name:`css`,register:Qs,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,i){var a=this._props,o=e.style,s=n.vars.startAt,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;for(m in hs||Qs(),this.styles=this.styles||Ks(e),C=this.styles.props,this.tween=n,t)if(m!==`autoRound`&&(l=t[m],!(Oi[m]&&Do(m,t,n,r,e,i)))){if(f=typeof l,p=pc[m],f===`function`&&(l=l.call(n,r,e,i),f=typeof l),f===`string`&&~l.indexOf(`random(`)&&(l=Ua(l)),p)p(this,e,m,l,n)&&(S=1);else if(m.substr(0,2)===`--`)c=(getComputedStyle(e).getPropertyValue(m)+``).trim(),l+=``,ro.lastIndex=0,ro.test(c)||(h=Ta(c),g=Ta(l),g?h!==g&&(c=sc(e,m,c,g)+g):h&&(l+=h)),this.add(o,`setProperty`,c,l,r,i,0,0,m),a.push(m),C.push(m,0,o[m]);else if(f!==`undefined`){if(s&&m in s?(c=typeof s[m]==`function`?s[m].call(n,r,e,i):s[m],Gr(c)&&~c.indexOf(`random(`)&&(c=Ua(c)),Ta(c+``)||c===`auto`||(c+=Pr.units[m]||Ta(cc(e,m))||``),(c+``).charAt(1)===`=`&&(c=cc(e,m))):c=cc(e,m),d=parseFloat(c),_=f===`string`&&l.charAt(1)===`=`&&l.substr(0,2),_&&(l=l.substr(2)),u=parseFloat(l),m in Os&&(m===`autoAlpha`&&(d===1&&cc(e,`visibility`)===`hidden`&&u&&(d=0),C.push(`visibility`,0,o.visibility),ic(this,o,`visibility`,d?`inherit`:`hidden`,u?`inherit`:`hidden`,!u)),m!==`scale`&&m!==`transform`&&(m=Os[m],~m.indexOf(`,`)&&(m=m.split(`,`)[0]))),v=m in bs,v){if(this.styles.save(m),w=l,f===`string`&&l.substring(0,6)===`var(--`){if(l=Ys(e,l.substring(4,l.indexOf(`)`))),l.substring(0,5)===`calc(`){var T=e.style.perspective;e.style.perspective=l,l=Ys(e,`perspective`),T?e.style.perspective=T:rc(e,`perspective`)}u=parseFloat(l)}if(y||(b=e._gsap,b.renderTransform&&!t.parseTransform||bc(e,t.parseTransform),x=t.smoothOrigin!==!1&&b.smooth,y=this._pt=new Zo(this._pt,o,G,0,1,b.renderTransform,b,0,-1),y.dep=1),m===`scale`)this._pt=new Zo(this._pt,b,`scaleY`,b.scaleY,(_?Ri(b.scaleY,_+u):u)-b.scaleY||0,ks),this._pt.u=0,a.push(`scaleY`,m),m+=`X`;else if(m===`transformOrigin`){C.push(Hs,0,o[Hs]),l=dc(l),b.svg?yc(e,l,0,x,0,this):(g=parseFloat(l.split(` `)[2])||0,g!==b.zOrigin&&ic(this,b,`zOrigin`,b.zOrigin,g),ic(this,o,m,xc(c),xc(l)));continue}else if(m===`svgOrigin`){yc(e,l,1,x,0,this);continue}else if(m in hc){kc(this,b,m,d,_?Ri(d,_+l):l);continue}else if(m===`smoothOrigin`){ic(this,b,`smooth`,b.smooth,l);continue}else if(m===`force3D`){b[m]=l;continue}else if(m===`transform`){jc(this,l,e);continue}}else m in o||(m=Zs(m)||m);if(v||(u||u===0)&&(d||d===0)&&!Ds.test(l)&&m in o)h=(c+``).substr((d+``).length),u||=0,g=Ta(l)||(m in Pr.units?Pr.units[m]:h),h!==g&&(d=sc(e,m,c,g)),this._pt=new Zo(this._pt,v?b:o,m,d,(_?Ri(d,_+u):u)-d,!v&&(g===`px`||m===`zIndex`)&&t.autoRound!==!1?Ns:ks),this._pt.u=g||0,v&&w!==l?(this._pt.b=c,this._pt.e=w,this._pt.r=Ms):h!==g&&g!==`%`&&(this._pt.b=c,this._pt.r=js);else if(m in o)lc.call(this,e,m,c,_?_+l:l);else if(m in e)this.add(e,m,c||e[m],_?_+l:l,r,i);else if(m!==`parseTransform`){_i(m,l);continue}v||(m in o?C.push(m,0,o[m]):typeof e[m]==`function`?C.push(m,2,e[m]()):C.push(m,1,c||e[m])),a.push(m)}}S&&Xo(this)},render:function(e,t){if(t.tween._time||!vs())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:cc,aliases:Os,getSetter:function(e,t,n){var r=Os[t];return r&&r.indexOf(`,`)<0&&(t=r),t in bs&&t!==Hs&&(e._gsap.x||cc(e,`x`))?n&&_s===n?t===`scale`?zs:Rs:(_s=n||{})&&(t===`scale`?Bs:Vs):e.style&&!Jr(e.style[t])?Is:~t.indexOf(`-`)?Ls:Ho(e,t)},core:{_removeProperty:rc,_getMatrix:vc}};ds.utils.checkPrefix=Zs,ds.core.getStyleSaver=Ks,(function(e,t,n,r){var i=Ii(e+`,`+t+`,`+n,function(e){bs[e]=1});Ii(t,function(e){Pr.units[e]=`deg`,hc[e]=1}),Os[i[13]]=e+`,`+t,Ii(r,function(e){var t=e.split(`:`);Os[t[1]]=i[t[0]]})})(`x,y,z,scale,scaleX,scaleY,xPercent,yPercent`,`rotation,rotationX,rotationY,skewX,skewY`,`transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective`,`0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY`),Ii(`x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective`,function(e){Pr.units[e]=`px`}),ds.registerPlugin(Mc);var Nc=ds.registerPlugin(Mc)||ds;Nc.core.Tween,Nc.defaults({duration:.32,ease:`power2.out`});var Pc=window.matchMedia(`(prefers-reduced-motion: reduce)`),Fc=()=>!Pc.matches;function Ic(){document.documentElement.classList.toggle(`reduce-motion`,!Fc())}Pc.addEventListener(`change`,Ic);var Lc=[`.language`,`.welcome`,`.step-options`,`.options`,`.med-list`,`.section`,`.tiles`,`.entries`,`.coming`,`.episode-started`,`.profile-section`,`.form-stack`,`.stack`,`.intensity-list`,`.sym-rows`].join(`,`);function Rc(e){let t=[];for(let n of e.children)n.matches(`legend, .visually-hidden`)||(n.matches(Lc)?t.push(...Rc(n)):t.push(n));return t}var zc=0,Bc=null;function Vc(e){let t=e.querySelector(`.screen`);if(!t)return;let n=t.querySelectorAll(`.progress__seg.is-done`),r=t.querySelector(`.tabbar__item[aria-current]`),i=zc,a=Bc;if(zc=n.length,Bc=r?.getAttribute(`href`)??null,!Fc())return;let o=t.querySelector(`.screen__body`),s=o?Rc(o):[];Nc.from(s,{opacity:0,y:10,duration:.4,stagger:Math.min(.05,.4/Math.max(s.length,1)),clearProps:`transform,opacity`});let c=t.querySelectorAll(`.screen__footer > *`);c.length&&Nc.from(c,{opacity:0,delay:.12,stagger:.05,clearProps:`opacity`}),n.length>i&&Nc.from([...n].slice(i),{scaleX:0,transformOrigin:`left center`,duration:.45,ease:`power2.inOut`,clearProps:`transform`}),r&&a!==Bc&&Nc.from(r.querySelector(`.tabbar__icon`),{scaleX:.5,autoAlpha:0,duration:.28,clearProps:`all`});let l=t.querySelector(`.episode-started .icon-badge`);l&&Nc.from(l,{scale:.7,duration:.5,ease:`back.out(1.4)`,clearProps:`transform`})}function Hc(e){if(!Fc()||!e.checked)return;let t=e.closest(`.option`)?.querySelector(`.option__control`);t&&Nc.fromTo(t,{scale:.75},{scale:1,duration:.3,ease:`back.out(2)`,clearProps:`transform`})}function Uc(e){Fc()&&e&&Nc.from(e,{autoAlpha:0,y:-6,duration:.3,clearProps:`transform,opacity,visibility`})}function Wc(e){return!Fc()||!e?Promise.resolve():new Promise(t=>{Nc.to(e,{autoAlpha:0,scale:.98,duration:.22,ease:`power1.in`,onComplete:t})})}function Gc(e){Fc()&&Nc.from(e,{autoAlpha:0,y:12,duration:.28,clearProps:`transform,opacity,visibility`})}function Kc(e,t){if(!Fc())return t();Nc.to(e,{autoAlpha:0,y:8,duration:.2,ease:`power1.in`,onComplete:t})}function qc(e){Fc()&&Nc.fromTo(e,{opacity:0,y:8,scale:.97},{opacity:1,y:0,scale:1,duration:.25,clearProps:`transform,opacity`})}var Jc=[`light`,`dark`,`system`],Yc=window.matchMedia(`(prefers-color-scheme: dark)`),Xc=`system`;function Zc(e=Xc){Xc=Jc.includes(e)?e:`system`;let t=Xc===`system`?Yc.matches?`dark`:`light`:Xc;document.documentElement.dataset.theme=t;let n=getComputedStyle(document.documentElement).getPropertyValue(`--color-bg`).trim();document.querySelector(`meta[name="theme-color"]`)?.setAttribute(`content`,n)}Yc.addEventListener(`change`,()=>{Xc===`system`&&Zc()});var Qc=null,$c=0,el=()=>$c>0;async function tl(e){$c+=1;try{return await e()}finally{--$c}}function nl(e){Ft(e),Dr(F().language??st()??`sk`),Zc(F().theme),Ic(),Qn(),Ht()&&F().demoEnabled&&F().demoSeededAt!==A()&&$n(Sr())}function rl(){at()?(Dr(st()??`sk`),Zc(ct()??`system`),Ic()):nl(mt())}var il=()=>ot();function al(e){at()&&(Qc=e&&e!==`/lock`?e:Qc,xt(),It())}function ol(){al(`/today`),a(`/lock`,{replace:!0})}function sl(e){e&&e!==`/lock`&&(Qc=e)}function cl(){let e=Qc??`/today`;return Qc=null,e}function ll(){Ut(),F().demoEnabled&&$n(Sr()),a(`/today`,{replace:!0})}var ul=`openweather`,dl=`643a83902695d6996a8b0ea69776c634`,fl=`https://api.openweathermap.org/data/2.5/weather`,pl=`https://api.openweathermap.org/data/2.5/forecast`,ml=6,hl=108e5,gl=864e5,_l=e=>Math.round(e*10)/10;function vl(e){return e>=200&&e<300?`storm`:e>=600&&e<700?`snow`:e>=700&&e<800?`fog`:e===800?`clear`:e===801||e===802?`partly`:e>802?`cloudy`:`rain`}var yl=[`clear`,`partly`,`cloudy`,`fog`,`rain`,`snow`,`storm`],bl=(e,t=A())=>!!e.forecast&&e.date<t,xl=({latitude:e,longitude:t})=>({lat:_l(e),lon:_l(t)});async function Sl({ask:e=!0}={}){return Fe()?xl(await(e?tl(()=>Ie({ask:e})):Ie({ask:e}))):new Promise((e,t)=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(({coords:t})=>e(xl(t)),e=>t(Error(e.code===e.PERMISSION_DENIED?`denied`:`unavailable`)),{enableHighAccuracy:!1,maximumAge:6e5,timeout:15e3}):t(Error(`unavailable`))})}async function Cl({lat:e,lon:t}){try{if(p.isNativePlatform()||(await navigator.permissions?.query({name:`geolocation`}))?.state===`granted`)return await Sl({ask:!1})}catch{}return{lat:e,lon:t}}var wl=e=>e.reduce((e,t)=>e+t,0)/e.length,Tl=e=>Math.round(e*10)/10,El=(e,t)=>({pressure:e.main?.sea_level??e.main?.pressure??null,temp:e.main?.temp??null,humidity:e.main?.humidity??null,precipitation:(e.rain?.[t]??0)+(e.snow?.[t]??0),condition:e.weather?.[0]?.id==null?null:vl(e.weather[0].id)});function Dl(e,t,n=A()){let r=t.city?.timezone??e.timezone??0,i=new Map([[n,[El(e,`1h`)]]]);for(let e of t.list){let t=new Date((e.dt+r)*1e3).toISOString().slice(0,10);t>=n&&i.set(t,[...i.get(t)??[],El(e,`3h`)])}let a=[];for(let[e,t]of i){let r=t.filter(e=>e.pressure!=null&&e.temp!=null&&e.condition!=null);if(!r.length||e>n&&r.length<ml)continue;let i=r.map(e=>e.temp),o=r.map(e=>e.humidity).filter(e=>e!=null);a.push({date:e,pressure:Tl(wl(r.map(e=>e.pressure))),pressureChange:null,tempMin:Math.round(Math.min(...i)),tempMax:Math.round(Math.max(...i)),humidity:o.length?Math.round(wl(o)):null,precipitation:Tl(r.reduce((e,t)=>e+t.precipitation,0)),condition:e===n?r[0].condition:r.map(e=>e.condition).sort((e,t)=>yl.indexOf(t)-yl.indexOf(e))[0],forecast:e>n,source:ul})}return a}async function Ol(e,t){let n=await fetch(`${e}?${new URLSearchParams(t)}`);if(n.status===401)throw Error(`setup`);if(!n.ok)throw Error(`network`);return n.json()}function kl(e,t){let n=[...e].sort((e,t)=>e.date.localeCompare(t.date));return n.map((e,r)=>{let i=r?n[r-1]:null,a=i&&A(M(j(i.date),1))===e.date?i.pressure:t(e.date);return{...e,pressureChange:a==null?null:Tl(e.pressure-a)}})}async function Al({lat:e,lon:t}){let n={lat:String(e),lon:String(t),units:`metric`,appid:dl},[r,i]=await Promise.all([Ol(fl,n),Ol(pl,n)]),a=A(),o=Dl(r,i,a),s=Ln(a),c=o.find(e=>e.date===a);return s&&c&&(c.tempMin=Math.min(c.tempMin,s.tempMin),c.tempMax=Math.max(c.tempMax,s.tempMax)),kl(o,e=>Ln(A(M(j(e),-1)))?.pressure??null)}async function jl(){let e=await Sl();return{position:e,days:await Al(e)}}async function Ml(){let e=F().weather;if(!e.enabled||e.lat==null||e.updatedAt&&Date.now()-new Date(e.updatedAt).getTime()<hl)return!1;try{let t=await Cl(e);return Bn(await Al(t),t),!0}catch{return!1}}function Nl(){let{enabled:e,updatedAt:t}=F().weather;return e&&!!t&&Date.now()-new Date(t).getTime()<gl}var Pl=m(`Health`,{web:()=>k(()=>import(`./web-CSngV9Ap.js`).then(e=>new e.HealthWeb),[],import.meta.url)}),Fl=[`sleep`,`steps`,`workouts`],Il={sleep:`sleep`,steps:`steps`,workouts:`workouts`},Ll=new Map(Object.entries({cycling:[`cycling`,`bikingStationary`,`handCycling`],running:[`running`,`runningTreadmill`,`trackAndField`],walking:[`walking`],hiking:[`hiking`,`snowshoeing`],swimming:[`swimming`,`swimmingPool`,`swimmingOpenWater`,`waterFitness`,`waterPolo`],strength:`strengthTraining.traditionalStrengthTraining.functionalStrengthTraining.weightlifting.crossTraining.coreTraining.calisthenics.bootCamp.highIntensityIntervalTraining.exerciseClass.backExtension.barbellShoulderPress.benchPress.benchSitUp.burpee.crunch.deadlift.dumbbellCurlLeftArm.dumbbellCurlRightArm.dumbbellFrontRaise.dumbbellLateralRaise.dumbbellTricepsExtensionLeftArm.dumbbellTricepsExtensionRightArm.dumbbellTricepsExtensionTwoArm.jumpingJack.latPullDown.lunge.plank.forwardTwist.upperTwist`.split(`.`),hockey:[`hockey`,`iceHockey`,`rollerHockey`],soccer:[`soccer`],basketball:[`basketball`],volleyball:[`volleyball`],teamSport:[`americanFootball`,`australianFootball`,`baseball`,`cricket`,`handball`,`lacrosse`,`rugby`,`softball`],tennis:[`tennis`],racket:[`badminton`,`pickleball`,`racquetball`,`squash`,`tableTennis`],yoga:[`yoga`,`pilates`,`flexibility`,`stretching`,`mindAndBody`,`taiChi`,`barre`],dance:[`dance`,`dancing`,`cardioDance`,`socialDance`],skiing:[`skiing`,`downhillSkiing`,`crossCountrySkiing`,`snowboarding`,`snowSports`],skating:[`skating`,`iceSkating`,`skatingSports`],climbing:[`climbing`,`rockClimbing`],rowing:[`rowing`,`rowingMachine`,`paddling`,`paddleSports`],cardio:[`elliptical`,`stairClimbing`,`stairClimbingMachine`,`stairs`,`stepTraining`,`mixedCardio`,`jumpRope`],combat:[`boxing`,`kickboxing`,`martialArts`,`wrestling`,`fencing`]}).flatMap(([e,t])=>t.map(t=>[t,e]))),Rl=e=>Ll.get(e)??`other`,zl=1e3,Bl=90,Vl=7,Hl=9e5,Ul=[`awake`,`inBed`],Wl=()=>p.isNativePlatform(),Gl=()=>p.getPlatform()===`ios`?`apple_health`:`health_connect`,Kl=()=>p.getPlatform()===`android`,ql=()=>tl(()=>Pl.openHealthConnectSettings()).catch(e=>console.error(`[health] Nastavenia sa nepodarilo otvoriť`,e));function Jl(e){let t=new Map;for(let n of e){let e=(n.stages?.length?n.stages.map(e=>({state:e.stage,minutes:e.durationMinutes})):[{state:n.sleepState,minutes:n.value}]).filter(e=>!Ul.includes(e.state)).reduce((e,t)=>e+t.minutes,0);if(e<=0)continue;let r=A(n.endDate),i=n.sourceId??n.sourceName??`unknown`;t.has(r)||t.set(r,new Map);let a=t.get(r).get(i)??{minutes:0,bedtime:n.startDate,wakeTime:n.endDate};a.minutes+=e,n.startDate<a.bedtime&&(a.bedtime=n.startDate),n.endDate>a.wakeTime&&(a.wakeTime=n.endDate),t.get(r).set(i,a)}return[...t].map(([e,t])=>({date:e,...[...t.values()].sort((e,t)=>t.minutes-e.minutes)[0]}))}var Yl=({startDate:e})=>new Date(new Date(e).getTime()+432e5);async function Xl(e,t){let n=new Date,r=M(n,-t);r.setHours(0,0,0,0);let i={startDate:r.toISOString(),endDate:n.toISOString()},a=Gl(),o=new Map,s=e=>(o.has(e)||o.set(e,{date:e,source:a,externalId:null}),o.get(e));if(e.includes(`steps`)){let{samples:e}=await Pl.queryAggregated({dataType:`steps`,...i,bucket:`day`,aggregation:`sum`});for(let t of e)s(A(Yl(t))).steps=Math.round(t.value)}if(e.includes(`workouts`)){for(let e of jt(A(r),A(n)))s(e).workouts=[];let e,t=0;do{let n=await Pl.queryWorkouts({...i,limit:200,ascending:!0,...e?{anchor:e}:{}});for(let e of n.workouts){let t=Math.round(e.duration/60);t<1||s(A(e.startDate)).workouts.push({type:Rl(e.workoutType),minutes:t,startedAt:e.startDate})}t+=n.workouts.length,e=n.anchor}while(e&&t<zl)}let c=[];if(e.includes(`sleep`)){let{samples:e}=await Pl.readSamples({dataType:`sleep`,...i,limit:t*40,ascending:!0});c=Jl(e).map(e=>({date:e.date,minutes:Math.round(e.minutes),bedtime:e.bedtime,wakeTime:e.wakeTime,source:a,externalId:`${a}-${e.date}`}))}return{sleepLogs:c,healthDays:[...o.values()]}}async function Zl(e){let{available:t}=await Pl.isAvailable();if(!t)throw Error(`unavailable`);let n=await tl(()=>Pl.requestAuthorization({read:e.map(e=>Il[e]),write:[],requestHistoryAccess:!0})),r=e.filter(e=>n.readAuthorized?.includes(Il[e]));if(!r.length)throw Error(`denied`);Hn({provider:Gl(),types:r}),Gn(await Xl(r,Bl))}async function Ql(e){if(!(await tl(()=>Pl.requestAuthorization({read:[Il[e]],write:[],requestHistoryAccess:!0}))).readAuthorized?.includes(Il[e]))throw Error(`denied`);Wn([...new Set([...F().health.types,e])]),Gn(await Xl([e],Bl))}async function $l(){let{connected:e,types:t,lastSyncAt:n}=F().health;if(!Wl()||!e||n&&Date.now()-new Date(n).getTime()<Hl)return!1;try{return Gn(await Xl(t,Vl)),!0}catch{return!1}}var eu;(function(e){e[e.APPLE_SEARCH_ADS=0]=`APPLE_SEARCH_ADS`,e[e.ADJUST=1]=`ADJUST`,e[e.APPSFLYER=2]=`APPSFLYER`,e[e.BRANCH=3]=`BRANCH`,e[e.TENJIN=4]=`TENJIN`,e[e.FACEBOOK=5]=`FACEBOOK`})(eu||={});var tu;(function(e){e.INAPP=`inapp`,e.SUBS=`subs`})(tu||={});var nu;(function(e){e[e.SUBSCRIPTIONS=0]=`SUBSCRIPTIONS`,e[e.SUBSCRIPTIONS_UPDATE=1]=`SUBSCRIPTIONS_UPDATE`,e[e.IN_APP_ITEMS_ON_VR=2]=`IN_APP_ITEMS_ON_VR`,e[e.SUBSCRIPTIONS_ON_VR=3]=`SUBSCRIPTIONS_ON_VR`,e[e.PRICE_CHANGE_CONFIRMATION=4]=`PRICE_CHANGE_CONFIRMATION`})(nu||={});var ru;(function(e){e[e.UNKNOWN_SUBSCRIPTION_UPGRADE_DOWNGRADE_POLICY=0]=`UNKNOWN_SUBSCRIPTION_UPGRADE_DOWNGRADE_POLICY`,e[e.IMMEDIATE_WITH_TIME_PRORATION=1]=`IMMEDIATE_WITH_TIME_PRORATION`,e[e.IMMEDIATE_AND_CHARGE_PRORATED_PRICE=2]=`IMMEDIATE_AND_CHARGE_PRORATED_PRICE`,e[e.IMMEDIATE_WITHOUT_PRORATION=3]=`IMMEDIATE_WITHOUT_PRORATION`,e[e.DEFERRED=4]=`DEFERRED`})(ru||={});var iu;(function(e){e.UNKNOWN=`UNKNOWN`,e.CUSTOM=`CUSTOM`,e.LIFETIME=`LIFETIME`,e.ANNUAL=`ANNUAL`,e.SIX_MONTH=`SIX_MONTH`,e.THREE_MONTH=`THREE_MONTH`,e.TWO_MONTH=`TWO_MONTH`,e.MONTHLY=`MONTHLY`,e.WEEKLY=`WEEKLY`})(iu||={});var au;(function(e){e[e.INTRO_ELIGIBILITY_STATUS_UNKNOWN=0]=`INTRO_ELIGIBILITY_STATUS_UNKNOWN`,e[e.INTRO_ELIGIBILITY_STATUS_INELIGIBLE=1]=`INTRO_ELIGIBILITY_STATUS_INELIGIBLE`,e[e.INTRO_ELIGIBILITY_STATUS_ELIGIBLE=2]=`INTRO_ELIGIBILITY_STATUS_ELIGIBLE`})(au||={});var ou=m(`NativePurchases`,{web:()=>k(()=>import(`./web-C2cVWztS.js`).then(e=>new e.NativePurchasesWeb),[],import.meta.url)}),su=[`yearly`,`monthly`],cu=`vestie_plus`,lu=`1`,uu=36e5,du=null,fu=0,pu=()=>je()&&!1,mu=()=>p.getPlatform()===`ios`?`App Store`:`Google Play`,hu=()=>du,gu={yearly:{amount:29.99,currency:`EUR`,trial:!0,trialPeriod:{unit:`day`,count:7}},monthly:{amount:3.99,currency:`EUR`,trial:!0,trialPeriod:{unit:`day`,count:7}}},_u=[`day`,`week`,`month`,`year`];function vu(e){if(e?.price!==0)return null;let{numberOfUnits:t,unit:n,unitString:r}=e.subscriptionPeriod??{},i=_u.includes(r)?r:_u[n],a=(t??0)*Math.max(1,e.numberOfPeriods??1);return i&&a>0?{unit:i,count:a}:null}function yu(e,t){if(!t)return null;let n=new Date(e);return t.unit===`day`?n.setDate(n.getDate()+t.count):t.unit===`week`?n.setDate(n.getDate()+7*t.count):t.unit===`month`?n.setMonth(n.getMonth()+t.count):n.setFullYear(n.getFullYear()+t.count),n.toISOString()}var bu=()=>pu()?du:gu;async function xu(){if(!pu()||du)return du;try{let{products:e}=await ou.getProducts({productIdentifiers:[cu],productType:tu.SUBS}),t={};for(let n of e){let e=su.includes(n.identifier)?n.identifier:null;if(!e||n.planIdentifier&&n.planIdentifier!==cu)continue;let r=t[e]?.trialPeriod??vu(n.introductoryPrice);t[e]={price:n.priceString,amount:typeof n.price==`number`?n.price:null,currency:n.currencyCode,trial:!!(t[e]?.trial||n.introductoryPrice?.price===0),trialPeriod:r}}su.every(e=>t[e])&&(du=t)}catch(e){console.error(`[purchases] Ceny sa nepodarilo načítať`,e)}return du}async function Su(e){return jn({plan:e,simulated:!0,trialEndsAt:yu(new Date,gu[e].trialPeriod)}),`done`}async function Cu(){let{purchases:e}=await ou.getPurchases({productType:tu.SUBS}),t=e.find(e=>e.productIdentifier===cu&&e.purchaseState===lu);return t&&t.isAcknowledged===!1&&await ou.acknowledgePurchase({purchaseToken:t.purchaseToken}),t??null}function wu(e){let{plus:t}=F();if(!e)return I()?(In(),!0):!1;let n=e.orderId??null;if(I()&&t.orderId===n)return!1;let r=I()&&t.orderId==null;return jn({plan:r?t.plan:null,startedAt:r?t.startedAt:e.purchaseDate,trialEndsAt:r?t.trialEndsAt:null,orderId:n}),!0}async function Tu(){if(!pu()||!(I()||Mn())||Date.now()-fu<uu)return!1;fu=Date.now();try{let e=await Cu();return ot()?wu(e):!1}catch(e){return console.error(`[purchases] Stav predplatného sa nepodarilo zistiť`,e),!1}}async function Eu(){if(pu()){Nn();try{wu(await Cu())}catch(e){console.error(`[purchases] Nákup sa nepodarilo obnoviť`,e)}}return I()}async function Du(){fu=0,await ou.manageSubscriptions()}function Ou(){let{simulated:e}=F().plus;In(),e&&(zn(),Un(),Kn({enabled:!1}))}var ku=m(`App`,{web:()=>k(()=>import(`./web-e38jlXL6.js`).then(e=>new e.AppWeb),[],import.meta.url)}),Au;(function(e){e[e.Sunday=1]=`Sunday`,e[e.Monday=2]=`Monday`,e[e.Tuesday=3]=`Tuesday`,e[e.Wednesday=4]=`Wednesday`,e[e.Thursday=5]=`Thursday`,e[e.Friday=6]=`Friday`,e[e.Saturday=7]=`Saturday`})(Au||={});var ju=m(`LocalNotifications`,{web:()=>k(()=>import(`./web-DW2cpu8f.js`).then(e=>new e.LocalNotificationsWeb),[],import.meta.url)});function Mu(e){return{from:A(M(new Date,-(e-1))),to:A()}}function Nu(e){let t=new Map;for(let n of e)t.set(n,(t.get(n)??0)+1);return[...t].map(([e,t])=>({key:e,count:t})).sort((e,t)=>t.count-e.count)}var Pu=e=>e.length?e.reduce((e,t)=>e+t,0)/e.length:null;function Fu({from:e,to:t}){let{symptomLogs:n,episodes:r,medicationIntakes:i,medications:a,cycleEntries:o,sleepLogs:s}=qn(),c=s.filter(n=>n.date>=e&&n.date<=t).sort((e,t)=>e.date.localeCompare(t.date)),l=n=>{let r=A(n);return r>=e&&r<=t},u=n.filter(e=>l(e.occurredAt)).sort((e,t)=>e.occurredAt.localeCompare(t.occurredAt)),d=r.filter(e=>l(e.startedAt)).sort((e,t)=>e.startedAt.localeCompare(t.startedAt)),f=i.filter(e=>l(e.takenAt)).sort((e,t)=>e.takenAt.localeCompare(t.takenAt)),p=new Set([...u.map(e=>A(e.occurredAt)),...d.map(e=>A(e.startedAt))]),m=[...u.map(dn),...d.map(e=>e.intensity)].filter(e=>e!=null),h=d.filter(e=>e.endedAt).map(e=>(new Date(e.endedAt)-new Date(e.startedAt))/6e4),g=a.map(e=>{let t=f.filter(t=>t.medicationId===e.id);return{medication:e,count:t.length,effects:Nu(t.map(e=>e.effect).filter(Boolean))}}).filter(e=>e.count>0).sort((e,t)=>t.count-e.count);return{from:e,to:t,logs:u,episodes:d,intakes:f,recordCount:u.length+d.length,symptomDays:p.size,episodeCount:d.length,avgIntensity:Pu(m),avgDurationMinutes:Pu(h),symptoms:Nu([...u.flatMap(e=>e.symptoms.map(e=>e.key)),...d.flatMap(e=>(e.symptoms??[]).map(e=>e.key??e))]),triggers:Nu(d.flatMap(e=>(e.triggers??[]).map(e=>e.key??e))),meds:g,periodDays:o.filter(n=>n.type===`period`&&n.date>=e&&n.date<=t).length,sleeps:c,avgSleepMinutes:Pu(c.map(e=>e.minutes)),sleepQuality:Nu(c.map(e=>e.quality).filter(Boolean))}}var Iu=85,Lu=8,Ru=3e3,zu=12e3,Bu=30,Vu=5,Hu=10,Uu=30,Wu=5,Gu=[90,180,365],Ku=[90,180,365],qu=[{key:`pressure_drop`,group:`weather`,icon:`trendingDown`,lags:[0,1],test:e=>e.pressureChange==null?null:e.pressureChange<=-6},{key:`pressure_rise`,group:`weather`,icon:`trendingUp`,lags:[0,1],test:e=>e.pressureChange==null?null:e.pressureChange>=6},{key:`humid`,group:`weather`,icon:`droplets`,lags:[0,1],test:e=>e.humidity==null?null:e.humidity>=Iu},{key:`temp_swing`,group:`weather`,icon:`thermometer`,lags:[0,1],test:e=>e.tempChange==null?null:Math.abs(e.tempChange)>=Lu},{key:`short_sleep`,group:`sleep`,icon:`bed`,lags:[0,1],test:e=>e.sleep==null?null:e.sleep<360},{key:`poor_sleep`,group:`sleep`,icon:`moon`,lags:[0,1],test:e=>e.sleepQuality==null?null:e.sleepQuality===`poor`},{key:`high_steps`,group:`health`,icon:`dumbbell`,lags:[1],test:e=>e.steps==null?null:e.steps>=zu},{key:`low_steps`,group:`health`,icon:`footprints`,lags:[1],test:e=>e.steps==null?null:e.steps<Ru},{key:`workout`,group:`workouts`,icon:`dumbbell`,lags:[0,1],test:e=>e.workoutMinutes==null?null:e.workoutMinutes>=Bu},{key:`period`,group:`cycle`,icon:`droplet`,lags:[0,1],test:e=>!!e.periodWindow}];function Ju(){let{weather:e,health:t,cycleTracking:n}=F();return{weather:e.enabled,sleep:!0,health:t.connected&&t.types.includes(`steps`),workouts:t.connected&&t.types.includes(`workouts`),cycle:n===!0}}function Yu(){let{episodes:e,symptomLogs:t,sleepLogs:n,healthDays:r,weatherDays:i,cycleEntries:a}=qn(),o=new Map,s=e=>(o.has(e)||o.set(e,{date:e,hard:!1,record:!1}),o.get(e));for(let t of e){let e=s(A(t.startedAt));e.hard=!0,e.record=!0}for(let e of t){let t=s(A(e.occurredAt));t.record=!0,(dn(e)??0)>=5&&(t.hard=!0)}for(let e of n){let t=s(e.date);t.sleep=e.minutes,t.sleepQuality=e.quality??null,e.source===`manual`&&(t.record=!0)}for(let e of r){let t=s(e.date);t.steps=e.steps??null,t.workoutMinutes=e.workouts==null?null:e.workouts.filter(e=>e.type!==`walking`).reduce((e,t)=>e+t.minutes,0)}for(let e of i){let t=s(e.date);t.pressureChange=e.pressureChange,t.humidity=e.humidity,t.tempMax=e.tempMax}for(let e of o.values()){let t=o.get(A(M(j(e.date),-1)));e.tempChange=e.tempMax!=null&&t?.tempMax!=null?e.tempMax-t.tempMax:null}for(let e of a)if(e.type===`period`)for(let t=-2;t<=2;t++)s(A(M(j(e.date),t))).periodWindow=!0;return o}var Xu=[0];function Zu(e){for(let t=Xu.length;t<=e;t++)Xu[t]=Xu[t-1]+Math.log(t);return Xu[e]}var Qu=(e,t)=>Zu(e)-Zu(t)-Zu(e-t);function $u(e,t,n,r){let i=t+r,a=e+n,o=0;for(let n=e;n<=Math.min(t,a);n++)o+=Math.exp(Qu(a,n)+Qu(i-a,t-n)-Qu(i,t));return o}function ed(e,t,n,r){let i=0,a=0,o=0,s=0;for(let c of t){let t=e.test(c);if(t==null)continue;let l=e.lags.map(e=>A(M(j(c.date),e)));if(l.at(-1)>r)continue;let u=l.some(e=>n.get(e)?.hard);t?(i++,u&&a++):(o++,u&&s++)}let c=i?a/i:0,l=o?s/o:0,u=c-l,d=`none`;if(i<Vu||o<Hu)d=`few`;else{let e=$u(a,i,s,o);u>=.15&&c>=l*1.5&&e<.05?d=`strong`:u>=.08&&c>=l*1.25&&e<.2&&(d=`possible`)}return{key:e.key,group:e.group,icon:e.icon,withDays:i,withHard:a,withoutDays:o,withoutHard:s,rateWith:c,rateWithout:l,difference:u,strength:d}}var td={strong:0,possible:1,none:2,few:3};function nd({days:e=180,now:t=new Date}={}){let n=A(t),r=A(M(t,-(e-1))),i=Yu(),a=[...i.values()].filter(e=>e.record).map(e=>e.date).sort()[0],o=a&&a>r?a:r,s=a?jt(o,n).map(e=>i.get(e)??{date:e,hard:!1}):[],c=s.length,l=s.filter(e=>e.hard).length,u=Ju(),d=qu.filter(e=>u[e.group]).map(e=>ed(e,s,i,n)).filter(e=>e.withDays>0).sort((e,t)=>td[e.strength]-td[t.strength]||t.difference-e.difference),{episodes:f}=qn(),p=f.filter(e=>A(e.startedAt)>=o);return{period:e,trackedDays:c,hardDays:l,enough:c>=Uu&&l>=Wu,factors:d,logged:Nu(p.flatMap(e=>(e.triggers??[]).map(e=>e.key??e)))}}var rd=[`pressure_drop`,`pressure_rise`,`humid`,`temp_swing`];function id(e,{days:t,weather:n,alerts:r}){if(!n)return[];let i=t.get(e)??{},a=[];return i.pressureChange!=null&&i.pressureChange<=-6&&a.push({key:`pressure_drop`,amount:Math.round(-i.pressureChange)}),i.pressureChange!=null&&i.pressureChange>=6&&a.push({key:`pressure_rise`,amount:Math.round(i.pressureChange)}),i.humidity!=null&&i.humidity>=Iu&&a.push({key:`humid`,amount:i.humidity}),i.tempChange!=null&&Math.abs(i.tempChange)>=Lu&&a.push({key:`temp_swing`,amount:Math.abs(i.tempChange)}),a.filter(e=>r.includes(e.key))}function ad({now:e=new Date}={}){let t=nd({days:365,now:e}),n=new Map(t.factors.map(e=>[e.key,e])),r=Yu(),i=Nl(),a=F().forecast.alerts??[],o=[0,1,2,3].map(o=>{let s=A(M(e,o)),c=id(s,{days:r,weather:i,alerts:a}).map(e=>({...e,stat:t.enough?n.get(e.key):null}));return{date:s,offset:o,signals:c,level:c.length?`change`:`calm`}});return{days:o,next:o.find(e=>e.offset>0&&e.level===`change`)??null}}function od(e,t=new Date){let n=Mu(e),r=M(t,-e),i={from:A(M(r,-(e-1))),to:A(r)};return{current:Fu(n),previous:Fu(i)}}function sd(e=12,t=new Date){let n=[];for(let r=e-1;r>=0;r--){let e=new Date(t.getFullYear(),t.getMonth()-r,1),i=new Date(t.getFullYear(),t.getMonth()-r+1,0),a=Fu({from:A(e),to:A(i)});n.push({month:e,symptomDays:a.symptomDays,episodes:a.episodeCount})}return n}var cd=[`morning`,`afternoon`,`evening`,`night`],ld=e=>e>=5&&e<12?0:e>=12&&e<17?1:e>=17&&e<22?2:3;function ud({from:e,to:t}){let n=Array.from({length:7},()=>[0,0,0,0]),r=0;for(let i of qn().episodes){let a=A(i.startedAt);if(a<e||a>t)continue;let o=new Date(i.startedAt);n[(o.getDay()+6)%7][ld(o.getHours())]++,r++}return{grid:n,total:r}}function dd({from:e,to:t},n=[-3,7]){let{cycleEntries:r,episodes:i}=qn(),a=new Set(r.filter(e=>e.type===`period`).map(e=>e.date)),o=[...a].filter(e=>!a.has(A(M(j(e),-1)))).map(e=>j(e).getTime()),s=new Map;for(let e=n[0];e<=n[1];e++)s.set(e,0);let c=0;for(let n of i){let r=A(n.startedAt);if(r<e||r>t)continue;let i=j(r).getTime();for(let e of o){let t=Math.round((i-e)/864e5);if(s.has(t)){s.set(t,s.get(t)+1),c++;break}}}return{items:[...s].map(([e,t])=>({offset:e,count:t})),total:c,starts:o.length}}function fd({from:e,to:t}){let n=qn().episodes.filter(n=>{let r=A(n.startedAt);return r>=e&&r<=t});return{relief:Nu(n.flatMap(e=>e.relief??[])),impact:Nu(n.flatMap(e=>e.impact??[]).filter(e=>e!==`none`))}}function pd({from:e,to:t}){let{medications:n,medicationIntakes:r}=qn(),i=j(e),a=j(t),o=[];for(let e=new Date(i.getFullYear(),i.getMonth(),1);e<=a;e=new Date(e.getFullYear(),e.getMonth()+1,1))o.push(e);let s=e=>{let t=j(e);return(t.getFullYear()-o[0].getFullYear())*12+t.getMonth()-o[0].getMonth()};return n.map(n=>{let i=r.filter(e=>e.medicationId===n.id).map(e=>A(e.takenAt)).filter(n=>n>=e&&n<=t).sort();if(!i.length)return null;let a=o.map(()=>0);for(let e of i)a[s(e)]++;return{medication:n,total:i.length,last:i.at(-1),months:o.map((e,t)=>({month:e,count:a[t]}))}}).filter(Boolean).sort((e,t)=>t.total-e.total)}function md({from:e,to:t}){let{weatherDays:n,episodes:r}=qn(),i=new Set(r.map(e=>A(e.startedAt)));return n.filter(n=>n.date>=e&&n.date<=t).sort((e,t)=>e.date.localeCompare(t.date)).map(e=>({...e,episode:i.has(e.date),estimated:bl(e)}))}function hd({from:e,to:t}){let{episodes:n,weatherDays:r,healthDays:i}=qn(),a=new Map(r.map(e=>[e.date,e])),o=n.filter(n=>{let r=A(n.startedAt);return r>=e&&r<=t}).sort((e,t)=>e.startedAt.localeCompare(t.startedAt)).map(e=>({episode:e,weather:a.get(A(e.startedAt))??null})).filter(e=>e.weather),s=i.filter(n=>n.date>=e&&n.date<=t),c=e=>e.length?e.reduce((e,t)=>e+t,0)/e.length:null,l=s.filter(e=>e.workouts!=null),u=e=>e.workouts.filter(e=>e.type!==`walking`);return{rows:o,drops:o.filter(e=>e.weather.pressureChange!=null&&e.weather.pressureChange<=-6).length,avgSteps:c(s.map(e=>e.steps).filter(e=>e!=null)),workoutTracked:l.length,workoutDays:l.filter(e=>u(e).length).length,workoutTypes:Nu(l.flatMap(e=>u(e).map(e=>e.type))).slice(0,3)}}var gd=class{constructor(e){this.value=e}toString(){return this.value}},_d={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},vd=e=>String(e).replace(/[&<>"']/g,e=>_d[e]),yd=e=>new gd(String(e??``));function bd(e){return e==null||e===!1||e===!0?``:e instanceof gd?e.value:Array.isArray(e)?e.map(bd).join(``):vd(e)}function K(e,...t){let n=e[0];for(let r=0;r<t.length;r++)n+=bd(t[r])+e[r+1];return new gd(n)}var xd={activity:`
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
`,copy:`
<svg
  class="lucide lucide-copy"
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
  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
</svg>
`,undo:`
<svg
  class="lucide lucide-undo-2"
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
  <path d="M9 14 4 9l5-5" />
  <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
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
`},Sd=Object.keys(xd);function q(e,{size:t=24,label:n,strokeWidth:r=1.75}={}){let i=xd[e];if(!i)return console.warn(`[icons] Neznáma ikona: ${e}`),yd(``);let a=n?`role="img" aria-label="${vd(n)}"`:`aria-hidden="true" focusable="false"`;return yd(i.trim().replace(`<svg`,`<svg ${a}`).replace(`class="lucide`,`class="icon lucide`).replace(`width="24"`,`width="${t}"`).replace(`height="24"`,`height="${t}"`).replace(`stroke-width="2"`,`stroke-width="${r}"`))}var Cd=(e,t)=>t==null||t===!1?``:K` ${yd(e)}="${t}"`,wd=(e,t)=>t?yd(` ${e}`):``;function Td(e={}){return yd(Object.entries(e).map(([e,t])=>` data-${e}="${vd(t)}"`).join(``))}function J({header:e=``,body:t,footer:n=``,nav:r=``,variant:i=``,form:a=!1}){let o=K`
    ${e}
    <div class="screen__body">${t}</div>
    ${n?K`<div class="screen__footer">${n}</div>`:``}
    ${r}`;return a?K`<form class="screen ${i}" novalidate>${o}</form>`:K`<div class="screen ${i}">${o}</div>`}var Ed=(e,t,{header:n}={})=>J({variant:n?``:`screen--tab`,header:n,body:t,nav:Ad(e)});function Y({back:e,backAction:t,step:n,total:r}={}){return K`
    <header class="screen__header">
      ${e||t?K`<button type="button" class="icon-btn" data-action="${t??`back`}"${Cd(`data-fallback`,e)} aria-label="${L(`common.back`)}">
            ${q(`chevronLeft`)}
          </button>`:K`<span class="topbar__spacer"></span>`}
      ${n?K`<div class="progress">
            <span class="visually-hidden">${L(`common.stepOf`,{step:n,total:r})}</span>
            ${Array.from({length:r},(e,t)=>K`<span class="progress__seg ${t<n?`is-done`:``}" aria-hidden="true"></span>`)}
          </div>`:K`<span class="progress"></span>`}
      <span class="topbar__spacer"></span>
    </header>`}var Dd=[{key:`today`,path:`/today`,icon:`home`},{key:`calendar`,path:`/calendar`,icon:`calendar`},{key:`insights`,path:`/insights`,icon:`chart`},{key:`treatment`,path:`/treatment`,icon:`pill`}],Od=(e,t)=>K`
  <a class="tabbar__item" href="#${e.path}" data-replace${e.key===t?yd(` aria-current="page"`):``}>
    <span class="tabbar__icon">${q(e.icon)}</span>
    ${L(`nav.${e.key}`)}
  </a>`;function kd(){let e=gn();return e?K`
      <a class="tabbar__fab tabbar__fab--live" href="#/episode/${e.id}" aria-label="${L(`episode.ongoing`)}">
        <span class="tabbar__fab-circle" aria-hidden="true">${q(`timer`,{size:30})}</span>
        <span class="tabbar__fab-label" aria-hidden="true">${L(`episode.statusOngoing`)}</span>
      </a>`:K`
    <button type="button" class="tabbar__fab" data-action="startEpisode">
      <span class="tabbar__fab-circle" aria-hidden="true">${q(`play`,{size:28,strokeWidth:2.5})}</span>
      <span class="tabbar__fab-label">${L(`nav.startEpisode`)}</span>
    </button>`}function Ad(e){let[t,n,r,i]=Dd;return K`
    <nav class="tabbar" aria-label="${L(`nav.label`)}">
      ${Od(t,e)}${Od(n,e)}${kd()}${Od(r,e)}${Od(i,e)}
    </nav>`}var jd=()=>K`<a href="#/profile" class="icon-btn" aria-label="${L(`nav.profile`)}">${q(`user`)}</a>`,Md=e=>K`
  <header class="tab-title">
    <h1 class="screen-title" tabindex="-1">${e}</h1>
    ${jd()}
  </header>`;function X({label:e,variant:t=`primary`,action:n,type:r=`button`,iconName:i,block:a=!1,compact:o=!1,disabled:s=!1,data:c,id:l}){return K`<button type="${r}" class="${[`btn`,`btn--${t}`,a&&`btn--block`,o&&`btn--compact`].filter(Boolean).join(` `)}"${Cd(`id`,l)}${Cd(`data-action`,n)}${Td(c)}${wd(`disabled`,s)}>
    ${i?q(i,{size:20}):``}<span>${e}</span>
  </button>`}function Nd({name:e,type:t=`radio`,options:n,selected:r,legend:i}){let a=new Set([].concat(r??[]));return K`
    <fieldset class="options">
      ${i?K`<legend class="visually-hidden">${i}</legend>`:``}
      ${n.map(n=>K`
          <label class="option option--${t}">
            <input type="${t}" name="${e}" value="${n.value}" id="${e}-${n.value}"${wd(`checked`,a.has(n.value))} />
            <span class="option__control">${q(`check`,{size:16,strokeWidth:3})}</span>
            <span class="option__label">${n.label}</span>
          </label>`)}
    </fieldset>`}function Pd({name:e,options:t,selected:n,legend:r}){return K`
    <fieldset class="segmented">
      ${r?K`<legend class="visually-hidden">${r}</legend>`:``}
      ${t.map(t=>K`
          <label class="segmented__item">
            <input type="radio" name="${e}" value="${t.value}" id="${e}-${t.value}"${wd(`checked`,t.value===n)} />
            <span>${t.label}</span>
          </label>`)}
    </fieldset>`}function Z({label:e,name:t,type:n=`text`,value:r=``,placeholder:i,hint:a,optional:o=!1,required:s=!1,multiline:c=!1,autocomplete:l=`off`,maxlength:u=120}){let d=`f-${t}`,f=[a&&`${d}-hint`,`${d}-error`].filter(Boolean).join(` `),p=c?K`<textarea class="field__input" id="${d}" name="${t}"${Cd(`placeholder`,i)} maxlength="1000" aria-describedby="${f}">${r}</textarea>`:K`<input class="field__input" id="${d}" name="${t}" type="${n}" value="${r}"${Cd(`placeholder`,i)}${Cd(`autocomplete`,l)}${n===`text`?Cd(`maxlength`,u):``}${wd(`required`,s)} aria-describedby="${f}" />`;return K`
    <div class="field">
      <label class="field__label" for="${d}">
        ${e}${o?K` <span class="field__optional">(${L(`common.optional`)})</span>`:``}
      </label>
      ${p}
      ${a?K`<p class="field__hint" id="${d}-hint">${a}</p>`:``}
      <p class="field__error" id="${d}-error" hidden></p>
    </div>`}function Fd(e,t,n){let r=e.querySelector(`#f-${t}`),i=e.querySelector(`#f-${t}-error`);i&&(i.textContent=n,i.hidden=!1),r?.setAttribute(`aria-invalid`,`true`),r?.focus()}function Id(e){if(e?.getAttribute?.(`aria-invalid`)!==`true`)return;e.removeAttribute(`aria-invalid`);let t=document.getElementById(`${e.id}-error`);t&&(t.hidden=!0)}function Ld({name:e,label:t,hint:n,checked:r,iconName:i}){return K`
    <label class="list__row list__row--switch" for="f-${e}">
      ${i?q(i):``}
      <span class="list__text">
        <span class="list__label">${t}</span>
        ${n?K`<span class="list__hint" id="f-${e}-hint">${n}</span>`:``}
      </span>
      <input class="switch" type="checkbox" role="switch" id="f-${e}" name="${e}"${wd(`checked`,r)}${n?K` aria-describedby="f-${e}-hint"`:``} />
    </label>`}var Rd=(e,{live:t=!1,neutral:n=!1}={})=>K`<span class="chip ${t?`chip--live`:``} ${n?`chip--neutral`:``}">${e}</span>`,zd=(e,{large:t=!1}={})=>K`<span class="icon-badge ${t?`icon-badge--lg`:``}">${q(e,{size:t?34:22})}</span>`,Bd=e=>e.charAt(0).toLocaleUpperCase(Or())+e.slice(1);function Vd(e=new Date){return Bd(new Intl.DateTimeFormat(Or(),{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}).format(e))}function Hd(e){return new Intl.DateTimeFormat(Or(),{hour:`2-digit`,minute:`2-digit`}).format(new Date(e))}function Ud(e){let t=new Date(e),n=new Date;return t.toDateString()===n.toDateString()?Hd(t):new Intl.DateTimeFormat(Or(),{day:`numeric`,month:`numeric`,hour:`2-digit`,minute:`2-digit`}).format(t)}function Wd(e){return new Intl.DateTimeFormat(Or(),{day:`numeric`,month:`short`,year:`numeric`,hour:`2-digit`,minute:`2-digit`}).format(new Date(e))}function Gd(e){return new Intl.DateTimeFormat(Or(),{day:`numeric`,month:`numeric`,year:`numeric`}).format(new Date(e))}function Kd(e){return Bd(new Intl.DateTimeFormat(Or(),{month:`long`,year:`numeric`}).format(e))}function qd(e){return new Intl.NumberFormat(Or(),{minimumFractionDigits:1,maximumFractionDigits:1}).format(e)}function Jd(e,t){return new Intl.NumberFormat(Or(),{style:`currency`,currency:t}).format(e)}function Yd(e){return Xd(0,Math.round(e)*6e4)}function Xd(e,t=new Date){let n=Math.max(0,Math.floor((new Date(t)-new Date(e))/6e4));if(n<1)return L(`duration.underMinute`);if(n<60)return L(`duration.minutes`,{m:n});let r=Math.floor(n/60),i=n%60;return i?L(`duration.hoursMinutes`,{h:r,m:i}):L(`duration.hours`,{h:r})}var Zd=[`weather`,`forecast`,`finder`,`stats`,`health`,`report`],Qd={weather:`gauge`,forecast:`bellRing`,finder:`search`,stats:`chart`,health:`watch`,report:`fileText`},$d={clear:`sun`,partly:`cloudSun`,cloudy:`cloud`,fog:`cloudFog`,rain:`cloudRain`,snow:`snowflake`,storm:`cloudLightning`},ef=e=>e.charAt(0).toLocaleUpperCase(Or())+e.slice(1);function tf(e){let t=Math.round(e);return t>0?`+${t}`:t<0?`−${Math.abs(t)}`:`0`}var nf=e=>L(`plus.weather.hpa`,{value:Math.round(e)}),rf=[{key:`low`,below:1e3},{key:`normal`,below:1021},{key:`high`,below:1030},{key:`veryHigh`,below:1/0}],af=e=>rf.find(t=>Math.round(e)<t.below).key,of=e=>L(`plus.weather.hpa`,{value:tf(e)}),sf=e=>L(`plus.weather.temps`,{min:e.tempMin,max:e.tempMax}),cf=e=>L(`plus.weather.conditions.${e}`),lf=e=>new Intl.NumberFormat(Or()).format(Math.round(e)),uf=e=>ef(new Intl.DateTimeFormat(Or(),{weekday:`long`}).format(e)),df=e=>new Intl.DateTimeFormat(Or(),{day:`numeric`,month:`numeric`}).format(e);function ff(e){return e===A()?L(`plus.forecast.today`):e===A(M(new Date,1))?L(`plus.forecast.tomorrow`):uf(j(e))}function pf(e,{status:t}={}){let n=I(),r=e===`report`?`#/report`:`#/plus/${e}`;return K`
    <a class="list__row" href="${n?r:`#/plus?from=${e}`}">
      ${q(Qd[e])}
      <span class="list__text">
        <span class="list__label">${L(`plus.features.${e}.title`)}</span>
        ${n?``:K`<span class="list__hint">${L(`plus.features.${e}.text`)}</span>`}
      </span>
      ${n&&t?K`<span class="list__value">${t}</span>`:``}
      ${n?``:q(`lock`,{size:18,label:L(`plus.lockedLabel`)})}
      ${q(`chevronRight`,{size:20})}
    </a>`}function mf(e){let{weather:t,forecast:n,health:r}=F();return e===`weather`?L(t.enabled?`common.on`:`common.off`):e===`forecast`?L(n.enabled?`common.on`:`common.off`):e===`health`?L(r.connected?`plus.health.connected`:`plus.health.notConnected`):``}function hf(){return K`
    <section class="section" aria-labelledby="plus-title">
      <h2 class="section-title plus-title" id="plus-title">${L(`plus.name`)}${I()?``:Rd(L(`plus.tryChip`))}</h2>
      <div class="list">${[`forecast`,`finder`,`stats`,`weather`].map(e=>pf(e,{status:mf(e)}))}</div>
    </section>`}function gf(e){if(!I())return``;let{weather:t,health:n}=F(),r=t.enabled?Ln(e):null,i=n.connected?Vn(e):null,a=i?.steps!=null||i?.workouts?.length?i:null;return!r&&!a?``:K`
    <ul class="day-context">
      ${r?K`<li>
            ${q($d[r.condition]??`cloud`,{size:20})}
            <span>${[nf(r.pressure),r.pressureChange==null?``:L(`plus.weather.changeShort`,{value:of(r.pressureChange)}),cf(r.condition),sf(r),bl(r)?L(`plus.weather.estimateWord`):``].filter(Boolean).join(` · `)}</span>
          </li>`:``}
      ${a?.steps==null?``:K`<li>${q(`footprints`,{size:20})}<span>${L(`plus.health.stepsValue`,{value:lf(a.steps)})}</span></li>`}
      ${a?.workouts?.length?K`<li>${q(`dumbbell`,{size:20})}<span>${a.workouts.map(_f).join(`, `)}</span></li>`:``}
    </ul>`}var _f=e=>`${L(`plus.health.workouts.${e.type}`)} ${Yd(e.minutes)}`,vf=e=>L(`plus.forecast.signals.${e.key}`,{amount:e.amount});function yf(e){let{stat:t}=e;return!t||t.strength===`few`?L(`plus.forecast.evidenceFew`):t.strength===`none`?L(`plus.forecast.evidenceNone`):L(`plus.forecast.evidence`,{a:t.withHard,b:t.withDays,c:t.withoutHard,d:t.withoutDays})}var bf=e=>e.signals[0];function xf(e){return K`<span class="level level--${e}">${q(e===`calm`?`check`:`bellRing`,{size:16})}${L(`plus.forecast.levels.${e}`)}</span>`}function Sf(){if(!I()||!F().forecast.enabled)return``;let{next:e}=ad();if(!e)return``;let t=bf(e);return K`
    <a class="card forecast-card forecast-card--${e.level}" href="#/plus/forecast">
      <span class="forecast-card__head">
        <span class="forecast-card__title">${L(`plus.forecast.cardTitle`,{day:ff(e.date)})}</span>
        ${xf(e.level)}
      </span>
      <span class="forecast-card__text">${vf(t)} ${yf(t)}</span>
    </a>`}var Cf=1,wf=[2,3],Tf=`reminders`,Ef=`forecast-private`,Df=[`forecast`],Of=3,kf=0,Af=e=>{let[t,n]=e.split(`:`).map(Number);return{hour:t,minute:n}};async function jf(){if(!je())return!0;let{display:e}=await ju.checkPermissions();return e===`granted`||(await tl(()=>ju.requestPermissions())).display===`granted`}async function Mf(){return(await ju.checkPermissions()).display===`granted`}async function Nf(){await ju.createChannel({id:Tf,name:L(`notifications.channelReminders`),importance:Of}),await ju.createChannel({id:Ef,name:L(`notifications.channelForecast`),importance:Of,visibility:kf}),await Promise.all(Df.map(e=>ju.deleteChannel({id:e}).catch(()=>{})))}async function Pf(){if(je())try{await ju.cancel({notifications:[{id:Cf}]});let{reminder:e}=F();if(!e.enabled||!await Mf())return;await Nf(),await ju.schedule({notifications:[{id:Cf,channelId:Tf,title:L(`app.name`),body:L(`notifications.reminderBody`),isExactNotification:!1,schedule:{on:Af(e.time),allowWhileIdle:!0}}]})}catch(e){console.error(`[notifications] Pripomienku sa nepodarilo naplánovať`,e)}}function Ff(){let{hour:e,minute:t}=Af(F().forecast.time),n=new Date;return ad().days.filter(e=>(e.offset===1||e.offset===2)&&e.level===`change`).map(n=>{let r=M(j(n.date),-1);return r.setHours(e,t,0,0),{day:n,at:r}}).filter(({at:e})=>e>n).map(({day:e,at:t})=>({id:wf[e.offset-1],channelId:Ef,title:L(`plus.forecast.cardTitle`,{day:L(`plus.forecast.tomorrow`)}),body:vf(bf(e)),isExactNotification:!1,schedule:{at:t,allowWhileIdle:!0}}))}async function If(){if(je())try{await ju.cancel({notifications:wf.map(e=>({id:e}))});let{forecast:e,weather:t}=F();if(!I()||!e.enabled||!e.notify||!t.enabled||!Nl()||!await Mf())return;let n=Ff();if(!n.length)return;await Nf(),await ju.schedule({notifications:n})}catch(e){console.error(`[notifications] Upozornenie sa nepodarilo naplánovať`,e)}}var Lf=()=>Promise.all([Pf(),If()]);async function Rf(){if(je())try{await ju.cancel({notifications:[Cf,...wf].map(e=>({id:e}))})}catch(e){console.error(`[notifications] Upozornenia sa nepodarilo zrušiť`,e)}}var zf=`<?xml version="1.0" encoding="UTF-8"?>
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
</svg>`,Bf=(e,t)=>[...zf.matchAll(RegExp(`<path class="${e}" d="([^"]+)"`,`g`))].map(e=>`<path class="logo__${t}" d="${e[1]}"/>`).join(``),Vf=Bf(`cls-1`,`mark`),Hf=Bf(`cls-2`,`word`),Uf=zf.match(/viewBox="([^"]+)"/)[1];function Wf({large:e=!1}={}){return K`
    <div class="logo ${e?`logo--large`:``}" role="img" aria-label="${L(`app.logo`)}">
      <span class="logo__name">${L(`app.name`)}</span>
      ${yd(`<svg class="logo__svg" viewBox="${Uf}" aria-hidden="true" focusable="false">${Vf}${Hf}</svg>`)}
    </div>`}function Gf({symbol:e,size:t=280}={}){return K`
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
      ${yd(e?String(q(e,{size:64,strokeWidth:1.4})).replace(`<svg`,`<svg x="108" y="86"`):`
      <circle cx="140" cy="118" r="34" fill="var(--color-coral-soft)" opacity="0.55" />
      <circle cx="140" cy="118" r="18" fill="var(--color-coral)" opacity="0.5" />`)}
    </svg>`}var Kf={render(){return J({variant:`screen--language`,body:K`
        <div class="language">
          ${Wf({large:!0})}
          ${Gf({size:220})}
          <h1 class="screen-title language__title" tabindex="-1">
            <span lang="sk">${jr(`sk`,`language.title`)}</span>
            <span class="language__alt" lang="en">${jr(`en`,`language.title`)}</span>
          </h1>
          <div class="stack">
            ${wr.map(e=>K`
                <button type="button" class="choice" data-action="choose" data-lang="${e}" lang="${e}">
                  <span class="choice__badge" aria-hidden="true">${e.toUpperCase()}</span>
                  <span>${jr(e,`language.${e}`)}</span>
                  <span class="choice__end">${q(`chevronRight`)}</span>
                </button>`)}
          </div>
        </div>`})},actions:{choose(e){let{lang:t}=e.dataset;Dr(t),Vt({language:t}),a(`/start/welcome`)}}},qf={render(){return J({variant:`screen--welcome`,header:Y({back:`/start/language`}),body:K`
        <div class="welcome">
          ${Wf()}
          <h1 class="screen-title welcome__title" tabindex="-1">${L(`welcome.title`)}</h1>
          <p class="screen-lead">${L(`welcome.text`)}</p>
          ${Gf()}
        </div>`,footer:X({label:L(`welcome.cta`),action:`start`,block:!0})})},actions:{start(){a(`/start/privacy`)}}},Jf=[`/start/privacy`,`/start/profile`,`/start/goals`,`/start/condition`,`/start/cycle`,`/start/medications`,`/start/reminders`];function Yf(e){let t=Jf.indexOf(e);return{step:t+1,total:Jf.length,prev:Jf[t-1]??`/start/welcome`,next:Jf[t+1]??`/today`}}var Xf=`/start/goals`,Zf=[`symptoms`,`triggers`,`patterns`,`doctor`],Qf={render(){let{step:e,total:t,prev:n}=Yf(Xf);return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`goals.title`)}</h1>
        <p class="screen-lead">${L(`goals.lead`)}</p>
        <div class="step-options">
          ${Nd({name:`goals`,type:`checkbox`,legend:L(`goals.title`),options:Zf.map(e=>({value:e,label:L(`goals.options.${e}`)})),selected:F().goals})}
        </div>`,footer:K`
        ${X({label:L(`common.continue`),type:`submit`,block:!0})}
        ${X({label:L(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onSubmit(e){Vt({goals:new FormData(e).getAll(`goals`)}),a(Yf(Xf).next)},actions:{skip(){a(Yf(Xf).next)}}},$f=`/start/condition`,ep=[`vestibular_migraine`,`migraine`,`other_vestibular`,`unsure`],tp={render(){let{step:e,total:t,prev:n}=Yf($f);return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`condition.title`)}</h1>
        <p class="screen-lead">${L(`condition.lead`)}</p>
        <div class="step-options">
          ${Nd({name:`condition`,legend:L(`condition.title`),options:ep.map(e=>({value:e,label:L(`condition.options.${e}`)})),selected:F().condition??`vestibular_migraine`})}
        </div>`,footer:K`
        ${X({label:L(`common.continue`),type:`submit`,block:!0})}
        ${X({label:L(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onSubmit(e){Vt({condition:new FormData(e).get(`condition`)}),a(Yf($f).next)},actions:{skip(){a(Yf($f).next)}}},np=`/start/cycle`;function rp(){let{cycleTracking:e}=F();return e===!0?`yes`:e===!1?`no`:null}var ip={render(){let{step:e,total:t,prev:n}=Yf(np),r=rp();return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`cycle.title`)}</h1>
        <p class="screen-lead">${L(`cycle.lead`)}</p>
        <div class="step-options">
          ${Nd({name:`cycle`,legend:L(`cycle.title`),options:[{value:`yes`,label:L(`cycle.yes`)},{value:`no`,label:L(`cycle.no`)}],selected:r})}
        </div>`,footer:K`
        ${X({label:L(`common.continue`),type:`submit`,block:!0,id:`cycle-continue`,disabled:!r})}
        ${X({label:L(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onChange(e){e.name===`cycle`&&(document.getElementById(`cycle-continue`).disabled=!1)},onSubmit(e){let t=new FormData(e).get(`cycle`);t&&(Vt({cycleTracking:t===`yes`}),a(Yf(np).next))},actions:{skip(){a(Yf(np).next)}}},ap=`/start/medications`;function op(e){return[L(`medications.types.${e.type}`),e.dose,e.frequency].filter(Boolean).join(` · `)}var sp={render(){let{step:e,total:t,prev:n}=Yf(ap),r=Wt(),i=r.length>0;return J({header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`medications.title`)}</h1>
        <p class="screen-lead">${L(`medications.lead`)}</p>
        ${i?K`
              <h2 class="visually-hidden">${L(`medications.added`)}</h2>
              <ul class="med-list">
                ${r.map(e=>K`
                    <li class="med">
                      <span class="med__main">
                        <span class="med__name">${e.name}</span>
                        <span class="med__meta">${op(e)}</span>
                      </span>
                      <button type="button" class="icon-btn" data-action="remove" data-id="${e.id}"
                        aria-label="${L(`medications.remove`,{name:e.name})}">
                        ${q(`x`,{size:20})}
                      </button>
                    </li>`)}
              </ul>`:Gf({symbol:`pill`,size:240})}
        <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`medications.disclaimer`)}</span></p>`,footer:i?K`
            ${X({label:L(`common.continue`),action:`next`,block:!0})}
            ${X({label:L(`medications.addAnother`),variant:`secondary`,action:`add`,iconName:`plus`,block:!0})}`:K`
            ${X({label:L(`medications.add`),action:`add`,iconName:`plus`,block:!0})}
            ${X({label:L(`common.skip`),variant:`ghost`,action:`next`,block:!0})}`})},actions:{add(){a(`/start/medications/new`)},async remove(e,t){e.disabled=!0,await Wc(e.closest(`.med`)),Yt(e.dataset.id),t.rerender()},next(){a(Yf(ap).next)}}},cp=`/start/reminders`,lp={render(){let{step:e,total:t,prev:n}=Yf(cp),{reminder:r}=F();return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`reminders.title`)}</h1>
        <p class="screen-lead">${L(`reminders.lead`)}</p>
        ${Gf({symbol:`bell`,size:180})}
        <div class="step-options">
          ${Nd({name:`reminder`,legend:L(`reminders.title`),options:[{value:`yes`,label:L(`reminders.yes`)},{value:`no`,label:L(`reminders.no`)}],selected:r.enabled?`yes`:null})}
        </div>
        <!-- Zobrazí sa iba pri „Áno“ (CSS :has), bez prekresľovania obrazovky -->
        <div class="reminder-extra">
          ${Z({label:L(`reminders.time`),name:`time`,type:`time`,value:r.time})}
          <p class="field__hint">${L(`reminders.permission`)}</p>
        </div>`,footer:X({label:L(`common.continue`),type:`submit`,block:!0})})},onChange(e){e.name===`reminder`&&e.value===`yes`&&Uc(document.querySelector(`.reminder-extra`))},async onSubmit(e){let t=new FormData(e),n=t.get(`reminder`)===`yes`,r=String(t.get(`time`)||F().reminder.time);Vt({reminder:{enabled:n&&await jf(),time:r}}),Pf(),ll()}};function Q(e,{actionLabel:t,onAction:n,duration:r}={}){let i=document.getElementById(`toast-region`),a=document.createElement(`div`);a.className=`toast`;let o=document.createElement(`span`);o.textContent=e,a.append(o);let s=setTimeout(c,r??(t?6e3:3500));function c(){clearTimeout(s),Kc(a,()=>a.remove())}if(t){let e=document.createElement(`button`);e.type=`button`,e.className=`toast__action`,e.textContent=t,e.addEventListener(`click`,()=>{c(),n?.()}),a.append(e)}i.replaceChildren(a),Gc(a)}function up({title:e,text:t,closeLabel:n=L(`common.close`)}){let r=document.getElementById(`dialog`);return r.setAttribute(`aria-labelledby`,`dialog-title`),r.innerHTML=String(K`
    <h2 class="dialog__title" id="dialog-title">${e}</h2>
    ${t?K`<p class="dialog__text">${t}</p>`:``}
    <form method="dialog" class="dialog__actions">
      <button class="btn btn--primary btn--block" value="close" autofocus>${n}</button>
    </form>`),new Promise(e=>{let t=!1,n=()=>{t||(t=!0,e())};r.querySelector(`form`).addEventListener(`submit`,n),r.addEventListener(`close`,n,{once:!0}),r.showModal(),qc(r)})}function dp({title:e,text:t,choices:n,cancelLabel:r=L(`common.cancel`)}){let i=document.getElementById(`dialog`),a=[t].flat().filter(Boolean);i.setAttribute(`aria-labelledby`,`dialog-title`),i.innerHTML=String(K`
    <h2 class="dialog__title" id="dialog-title">${e}</h2>
    ${a.map(e=>K`<p class="dialog__text">${e}</p>`)}
    <form method="dialog" class="dialog__actions">
      ${n.map(({value:e,label:t,variant:n=`primary`})=>K`<button class="btn btn--${n} btn--block" value="${e}">${t}</button>`)}
      <button class="btn btn--ghost btn--block" value="cancel" autofocus>${r}</button>
    </form>`);let o=n.map(e=>e.value),s=e=>o.includes(e)?e:null;return new Promise(e=>{let t=!1,n=n=>{t||(t=!0,e(n))};i.returnValue=``,i.querySelector(`form`).addEventListener(`submit`,e=>n(s(e.submitter?.value))),i.addEventListener(`close`,()=>n(s(i.returnValue)),{once:!0}),i.showModal(),qc(i)})}async function fp({title:e,text:t,confirmLabel:n,cancelLabel:r}){return await dp({title:e,text:t,choices:[{value:`confirm`,label:n}],cancelLabel:r})===`confirm`}var pp={name:``,type:`preventive`,dose:``,frequency:``,note:``,startDate:``};function mp({returnTo:e}){let t=t=>typeof e==`function`?e(t):e;return{render(e){let n=e.params.id?Gt(e.params.id):null,r={...pp,...n??{}};return J({form:!0,header:Y({back:t(e)}),body:K`
          <h1 class="screen-title" tabindex="-1">${L(n?`treatment.edit`:`medForm.title`)}</h1>
          <div class="form-stack">
            ${Z({label:L(`medForm.name`),name:`name`,value:r.name,placeholder:L(`medForm.namePlaceholder`),required:!0})}
            <div class="field">
              <span class="field__label" aria-hidden="true">${L(`medForm.type`)}</span>
              ${Pd({name:`type`,legend:L(`medForm.type`),selected:r.type,options:[{value:`preventive`,label:L(`medications.types.preventive`)},{value:`acute`,label:L(`medications.types.acute`)}]})}
            </div>
            ${Z({label:L(`medForm.dose`),name:`dose`,value:r.dose,placeholder:L(`medForm.dosePlaceholder`),optional:!0})}
            ${Z({label:L(`medForm.frequency`),name:`frequency`,value:r.frequency,placeholder:L(`medForm.frequencyPlaceholder`),optional:!0})}
            ${Z({label:L(`medForm.startDate`),name:`startDate`,type:`date`,value:r.startDate??``,optional:!0,hint:L(`medForm.startDateHint`)})}
            ${Z({label:L(`medForm.note`),name:`note`,value:r.note,multiline:!0,optional:!0})}
            <p class="disclaimer">${L(`medications.disclaimer`)}</p>
          </div>`,footer:X({label:L(`medForm.submit`),type:`submit`,block:!0})})},onSubmit(e,n){let r=new FormData(e),i=String(r.get(`name`)??``).trim();if(!i){Fd(e,`name`,L(`medForm.nameRequired`));return}let a={name:i,type:r.get(`type`),dose:String(r.get(`dose`)??``),frequency:String(r.get(`frequency`)??``),note:String(r.get(`note`)??``),startDate:String(r.get(`startDate`)??``)||null};n.params.id&&Gt(n.params.id)?(Jt(n.params.id,a),Q(L(`profile.saved`))):Q(L(`medForm.saved`,{name:qt(a).name})),s(t(n))}}}var hp=[{key:`dizziness`,icon:`orbit`,info:!0},{key:`vertigo`,icon:`rotate3d`,info:!0},{key:`rocking`,icon:`sailboat`,info:!0},{key:`floating`,icon:`cloud`,info:!0},{key:`unsteadiness`,icon:`footprints`,info:!0},{key:`nausea`,icon:`waves`},{key:`vomiting`,icon:`droplets`},{key:`light_sensitivity`,icon:`sun`},{key:`sound_sensitivity`,icon:`volume`},{key:`visual_sensitivity`,icon:`eye`,info:!0},{key:`tinnitus`,icon:`audioWave`,info:!0},{key:`ear_pressure`,icon:`ear`},{key:`headache`,icon:`zap`},{key:`brain_fog`,icon:`cloudFog`,info:!0},{key:`fatigue`,icon:`battery`}],gp=[`moment`,`under_1h`,`1_3h`,`3_6h`,`6_12h`,`over_12h`],_p=[`vestibular`,`migraine_headache`,`other`,`unsure`],vp=[`poor_sleep`,`long_sleep`,`stress`,`skipped_meal`,`dehydration`,`caffeine`,`alcohol`,`exertion`,`illness`,`visual_stimulation`,`bright_light`,`strong_smells`,`screen_time`,`neck_pain`,`weather_change`,`menstrual_cycle`,`allergy`,`travel`,`other`],yp={poor_sleep:`bed`,long_sleep:`moon`,stress:`brain`,skipped_meal:`utensils`,dehydration:`glassWater`,caffeine:`coffee`,alcohol:`wine`,exertion:`dumbbell`,illness:`thermometer`,visual_stimulation:`eye`,bright_light:`sun`,strong_smells:`wind`,screen_time:`monitor`,neck_pain:`bone`,weather_change:`cloud`,menstrual_cycle:`droplet`,allergy:`flower`,travel:`car`,other:`ellipsis`},bp=[`rest`,`sleep`,`dark_room`,`hydration`,`relaxation`,`cold_compress`,`warm_compress`,`shower`,`food`,`other`],xp=[`work_study`,`sleep`,`daily_activities`,`social`,`movement`,`rest`,`other`,`none`],Sp=[`helped`,`partly`,`not_helped`,`unknown`];function Cp(e){return e==null?null:e===0?`none`:e<=3?`mild`:e<=6?`moderate`:`severe`}var wp=`custom:`,Tp=e=>e.startsWith(wp);function Ep(e){return Tp(e)?pn(e)?.label??L(`symptoms.unknown`):L(`symptoms.${e}`)}var Dp=e=>hp.find(t=>t.key===e)?.icon??`sparkles`;function Op(e){return e==null?L(`intensity.notSet`):L(`intensity.value`,{value:e,level:L(`intensity.${Cp(e)}`)})}function kp(e){return e.symptoms.map(e=>e.intensity==null?Ep(e.key):`${Ep(e.key)} ${e.intensity}`).join(`, `)}var Ap=e=>L(`durations.${e}`),jp=e=>L(`effects.${e}`),Mp=e=>L(`triggers.${e}`),Np=e=>L(`episodeTypes.${e}`),Pp=e=>L(`relief.${e}`),Fp=e=>L(`impact.${e}`),Ip=e=>L(`sleep.qualities.${e}`);function Lp({href:e,iconName:t,title:n,meta:r,badge:i}){return K`
    <li>
      <a class="entry" href="${e}">
        ${q(t)}
        <span class="entry__main">
          <span class="entry__title">${n}${i??``}</span>
          <span class="entry__meta">${r}</span>
        </span>
        ${q(`chevronRight`,{size:20})}
      </a>
    </li>`}function Rp(e){return Lp({href:`#/episode/${e.id}`,iconName:`timer`,title:L(`episode.title`),badge:e.endedAt?``:Rd(L(`episode.statusOngoing`),{live:!0}),meta:e.endedAt?`${Ud(e.startedAt)} – ${Hd(e.endedAt)} · ${Xd(e.startedAt,e.endedAt)}`:L(`episode.since`,{time:Ud(e.startedAt)})})}function zp(e){let t=dn(e);return Lp({href:`#/symptom/${e.id}`,iconName:`activity`,title:kp(e),meta:[Hd(e.occurredAt),t==null?``:L(`intensity.highest`,{value:Op(t)})].filter(Boolean).join(` · `)})}function Bp(e){let t=Gt(e.medicationId);return Lp({href:`#/intake/${e.id}`,iconName:`pill`,title:[t?.name??L(`today.intakeTitle`),e.dose].filter(Boolean).join(` `),meta:[Hd(e.takenAt),e.effect?jp(e.effect):``].filter(Boolean).join(` · `)})}function Vp(e){return Lp({href:`#/sleep?date=${e.date}`,iconName:`bed`,title:L(`sleep.entry`,{duration:Yd(e.minutes)}),meta:[e.quality?Ip(e.quality):L(`sleep.title`),e.source&&e.source!==`manual`?L(`plus.health.providers.${e.source}`):``].filter(Boolean).join(` · `)})}function Hp({episodes:e=[],symptomLogs:t=[],intakes:n=[],sleep:r=null}){return K`<ul class="entries">${[...e.map(e=>({at:e.startedAt,render:()=>Rp(e)})),...t.map(e=>({at:e.occurredAt,render:()=>zp(e)})),...n.map(e=>({at:e.takenAt,render:()=>Bp(e)})),...r?[{at:r.wakeTime??Tt(r.date,`06:00`),render:()=>Vp(r)}]:[]].sort((e,t)=>t.at.localeCompare(e.at)).map(e=>e.render())}</ul>`}var Up=`vestie-backup`,Wp=5e6,Gp=30,Kp=14;async function qp(e){let t=await ve(qn(),e);return JSON.stringify({format:Up,version:1,createdAt:new Date().toISOString(),...t},null,2)}var Jp=e=>e?.format===Up&&typeof e.kdf?.salt==`string`&&Number.isInteger(e.kdf?.iterations)&&e.kdf.iterations>0&&e.kdf.iterations<=Wp&&typeof e.cipher?.iv==`string`&&typeof e.cipher?.data==`string`;function Yp(e){let t;try{t=JSON.parse(e)}catch{return null}return Jp(t)?{kind:`encrypted`,backup:t,createdAt:t.createdAt??null}:ar(t)?{kind:`newer`}:or(t)?{kind:`plain`,records:t}:null}async function Xp(e,t){try{let n=await ye(e,t);return ar(n)?`newer`:or(n)?n:null}catch{return null}}function Zp(){let{episodes:e,symptomLogs:t,sleepLogs:n}=qn(),r=[...e.map(e=>e.startedAt),...t.map(e=>e.occurredAt),...n.map(e=>`${e.date}T12:00:00`)].map(e=>new Date(e).getTime()).filter(Number.isFinite);return r.length?Math.min(...r):null}function Qp(e=new Date){let{remind:t,lastAt:n,snoozedUntil:r}=F().backup;if(!t||r&&new Date(r)>e)return!1;if(n)return M(new Date(n),Gp)<=e;let i=Zp();return i!=null&&M(new Date(i),Kp)<=e}var $p=null;function em({logId:e=null,date:t=null}={}){let n=e?on(e):null,r=n?new Date(n.occurredAt):new Date;return $p={id:n?.id??null,symptoms:n?n.symptoms.map(e=>({...e,pending:!1})):[],vertigoType:n?.vertigoType??null,duration:n?.duration??null,note:n?.note??``,date:n?A(r):t??A(r),time:wt(r),episodeId:n?.episodeId??null,linkEpisode:!n||!!n.episodeId},$p}var tm=()=>$p;function nm(){$p=null}function rm(){return[`/log/symptoms`,`/log/intensity`,`/log/details`]}function im(e){let t=rm(),n=t.indexOf(e);return{step:n+1,total:t.length,prev:t[n-1]??null,next:t[n+1]??null}}var am=e=>e.intensity??(e.pending?5:null);function om(e,t){e.intensity=t,e.pending=!1}function sm(e){e.pending&&om(e,5)}function cm({index:e,label:t,value:n,iconName:r}){let i=`int-${e}`;return K`
    <div class="intensity ${n==null?`is-unset`:``}" data-index="${e}">
      <div class="intensity__head">
        ${r?K`<span class="intensity__icon">${q(r,{size:22})}</span>`:``}
        <label class="intensity__label" for="${i}">${t}</label>
      </div>
      <output class="intensity__value" for="${i}">${Op(n)}</output>
      <input class="range" type="range" id="${i}" data-index="${e}" min="0" max="10" step="1"
        value="${n??5}" aria-valuetext="${Op(n)}" />
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
    </div>`}function lm(e,t){let n=document.querySelector(`.intensity[data-index="${e}"]`),r=t==null;n.classList.toggle(`is-unset`,r),n.querySelector(`.intensity__value`).textContent=Op(t),n.querySelector(`[data-action="clear"]`).hidden=r,n.querySelector(`[data-action="restore"]`).hidden=!r;let i=n.querySelector(`input[type="range"]`);i.setAttribute(`aria-valuetext`,Op(t)),r&&(i.value=5)}var um=e=>e.normalize(`NFD`).replace(/\p{Diacritic}/gu,``).toLowerCase();function dm(){return[...hp.map(e=>({key:e.key,icon:e.icon,label:Ep(e.key),info:!!e.info})),...fn().map(e=>({key:e.key,icon:`sparkles`,label:e.label}))]}function fm({name:e,legend:t,items:n,selected:r,search:i=!1}){return K`
    <fieldset class="sym-grid">
      <legend class="visually-hidden">${t}</legend>
      ${n.map(t=>K`
          <div class="sym-cell ${t.info?`sym-cell--info`:``}"${i?K` data-search="${um(t.label)}"`:``}>
            <label class="sym-tile">
              <input type="checkbox" name="${e}" value="${t.key}" id="${e}-${t.key}"${r.includes(t.key)?K` checked`:``} />
              <span class="sym-tile__icon">${q(t.icon,{size:22})}</span>
              <span class="sym-tile__label">${t.label}</span>
              <span class="sym-tile__check">${q(`check`,{size:14,strokeWidth:3})}</span>
            </label>
            ${t.info?K`<button type="button" class="sym-tile__info" data-action="symptomInfo" data-key="${t.key}"
                  aria-label="${L(`symptomInfo.open`,{name:t.label})}">${q(`info`,{size:20})}</button>`:``}
          </div>`)}
    </fieldset>`}var pm={symptomInfo(e){let{key:t}=e.dataset;up({title:Ep(t),text:L(`symptomInfo.${t}`),closeLabel:L(`symptomInfo.close`)}).then(()=>e.focus())}};function mm(e){let{startedAt:t,endedAt:n}=e,r=n?Et(t,n)?Hd(n):Ud(n):L(`episode.statusOngoing`);return`${Ud(t)} – ${r} · ${Xd(t,n??new Date)}`}function hm(e=[],t,n){let r=e.filter(e=>e!==`other`).map(t);return e.includes(`other`)&&r.push(n?.trim()||t(`other`)),r.length?r.join(`, `):null}function gm(e){let t=xn(e.id);return t.length?t.map(e=>[Gt(e.medicationId)?.name,e.dose,Hd(e.takenAt)].filter(Boolean).join(` · `)).join(`, `):null}function _m(e,{withTime:t=!0}={}){return[{key:`type`,step:`type`,value:e.type?Np(e.type):null},{key:`intensity`,step:`type`,value:e.intensity==null?null:Op(e.intensity)},t&&{key:`time`,value:mm(e)},{key:`symptoms`,step:`symptoms`,value:e.symptoms?.length?kp(e):null},{key:`triggers`,step:`triggers`,value:hm(e.triggers,Mp,e.triggerOther)},{key:`meds`,step:`meds`,value:gm(e)},{key:`helped`,step:`meds`,value:e.helped?jp(e.helped):null},{key:`relief`,step:`relief`,value:hm(e.relief,Pp,e.reliefOther)},{key:`impact`,step:`impact`,value:hm(e.impact,Fp,e.impactOther)}].filter(Boolean)}var vm=e=>_m(e,{withTime:!1}).some(e=>e.value);function ym(e,{editable:t=!1}={}){return t?K`
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
    </dl>`}var $=null;function bm(e){let t=new Date(e.startedAt),n=e.endedAt&&new Date(e.endedAt)?t:new Date;return{episodeId:e.id,type:e.type??null,overall:{intensity:e.intensity??null,pending:e.intensity==null&&!vm(e)},symptoms:(e.symptoms??[]).map(e=>({...e,pending:!1})),triggers:[...e.triggers??[]],triggerOther:e.triggerOther??``,medIds:[],medDate:A(n),medTime:wt(n),helped:e.helped??null,relief:[...e.relief??[]],reliefOther:e.reliefOther??``,impact:[...e.impact??[]],impactOther:e.impactOther??``}}function xm(e){return $=bm(e),`/episode/${e.id}/details/${vm(e)?`summary`:`type`}`}function Sm(){return[`type`,`symptoms`,...$.symptoms.length?[`intensity`]:[],`triggers`,`meds`,`relief`,`impact`,`summary`]}var Cm=(e,t,n)=>n?[...new Set([...e,t])]:e.filter(e=>e!==t);function wm(e,t){return Fd(document.querySelector(`.screen`),e,t),!1}function Tm(e){let t=new Date(e);return t.setSeconds(0,0),t}function Em(){let e=$.episodeId;bn(e,{type:$.type,intensity:$.overall.intensity,symptoms:$.symptoms.map(({key:e,intensity:t})=>({key:e,intensity:t})),triggers:[...$.triggers],triggerOther:$.triggers.includes(`other`)?$.triggerOther.trim():``,helped:$.helped,relief:[...$.relief],reliefOther:$.relief.includes(`other`)?$.reliefOther.trim():``,impact:[...$.impact],impactOther:$.impact.includes(`other`)?$.impactOther.trim():``})}function Dm(){let e=hn($.episodeId),t=new Date(e.startedAt).getTime(),n=e.endedAt?new Date(e.endedAt).getTime():Date.now(),r=new Date(Math.min(Math.max(new Date(Tt($.medDate,$.medTime)).getTime(),t),n)).toISOString();for(let e of Wt().filter(e=>$.medIds.includes(e.id)))tn({medicationId:e.id,takenAt:r,dose:e.dose,effect:$.helped});$.medIds=[];let i=xn($.episodeId);if($.helped)for(let e of i.filter(e=>!e.effect))nn(e.id,{effect:$.helped});bn($.episodeId,{medicationIntakeIds:i.map(e=>e.id)})}var Om=(e,t,n)=>K`
  <div class="field-row">
    ${Z({label:L(`episodeFlow.date`),name:`${e}Date`,type:`date`,value:t})}
    ${Z({label:L(`episodeFlow.time`),name:`${e}Time`,type:`time`,value:n})}
  </div>`,km=(e,t,n)=>K`
  <div class="form-section" id="${e}-wrap"${t.includes(`other`)?``:K` hidden`}>
    ${Z({label:L(`episodeFlow.${e}`),name:e,value:n,placeholder:L(`episodeFlow.${e}Placeholder`),maxlength:80})}
  </div>`,Am={type:{title:()=>L(`episodeFlow.typeTitle`),lead:()=>L(`episodeFlow.typeLead`),body:()=>K`
      <div class="step-options">
        ${Nd({name:`episodeType`,legend:L(`episodeFlow.sections.type`),options:[..._p,...$.type&&!_p.includes($.type)?[$.type]:[]].map(e=>({value:e,label:Np(e)})),selected:$.type})}
      </div>
      <div class="intensity-list form-section">
        ${cm({index:`overall`,label:L(`episodeFlow.intensity`),value:am($.overall)})}
      </div>`,onChange(e){e.name===`episodeType`&&($.type=e.value)},confirm:()=>sm($.overall)},symptoms:{title:()=>L(`episodeFlow.symptomsTitle`),lead:()=>L(`episodeFlow.symptomsLead`),body:()=>K`
      ${fm({name:`symptom`,legend:L(`episodeFlow.symptomsTitle`),items:dm(),selected:$.symptoms.map(e=>e.key)})}
      <form class="custom-add" data-form="custom">
        <label class="field__label" for="custom-symptom">${L(`log.custom`)}</label>
        <div class="custom-add__row">
          <input class="field__input" id="custom-symptom" name="custom" maxlength="40" autocomplete="off"
            placeholder="${L(`log.customPlaceholder`)}" />
          <button type="submit" class="btn btn--secondary btn--compact">${q(`plus`,{size:20})}<span>${L(`log.customAdd`)}</span></button>
        </div>
      </form>`,onChange(e){e.name===`symptom`&&(e.checked?$.symptoms.push({key:e.value,intensity:null,pending:!0}):$.symptoms=$.symptoms.filter(t=>t.key!==e.value))}},intensity:{title:()=>L(`log.intensityTitle`),lead:()=>L(`log.intensityLead`),body:()=>K`
      <div class="intensity-list">
        ${$.symptoms.map((e,t)=>cm({index:t,label:Ep(e.key),value:am(e),iconName:Dp(e.key)}))}
      </div>`,confirm:()=>$.symptoms.forEach(sm)},triggers:{title:()=>L(`episodeFlow.triggersTitle`),lead:()=>L(`episodeFlow.triggersLead`),body:()=>K`
      ${fm({name:`trigger`,legend:L(`episodeFlow.triggersTitle`),items:vp.map(e=>({key:e,icon:yp[e],label:Mp(e)})),selected:$.triggers})}
      <div class="form-section" id="trigger-other"${$.triggers.includes(`other`)?``:K` hidden`}>
        ${Z({label:L(`episodeFlow.triggerOther`),name:`triggerOther`,value:$.triggerOther,placeholder:L(`episodeFlow.triggerOtherPlaceholder`),maxlength:80})}
      </div>`,onChange(e){e.name===`trigger`&&($.triggers=Cm($.triggers,e.value,e.checked),e.value===`other`&&(document.getElementById(`trigger-other`).hidden=!e.checked))},onInput(e){e.name===`triggerOther`&&($.triggerOther=e.value)}},meds:{title:()=>L(`episodeFlow.medsTitle`),lead:()=>L(`episodeFlow.medsLead`),body:()=>{let e=Wt(),t=xn($.episodeId);return K`
        ${t.length?K`<section class="form-section" aria-labelledby="meds-logged">
              <h2 class="section-title" id="meds-logged">${L(`episodeFlow.medsLogged`)}</h2>
              ${Hp({intakes:t})}
            </section>`:``}
        ${e.length?K`
              <div class="step-options">
                ${Nd({name:`med`,type:`checkbox`,legend:L(`episodeFlow.medsTitle`),options:e.map(e=>({value:e.id,label:[e.name,e.dose].filter(Boolean).join(` · `)})),selected:$.medIds})}
              </div>
              <fieldset class="form-section" id="med-when"${$.medIds.length?``:K` hidden`}>
                <legend class="section-title">${L(`episodeFlow.medsWhen`)}</legend>
                ${Om(`med`,$.medDate,$.medTime)}
              </fieldset>`:K`<p class="empty form-section">${L(`episodeFlow.medsNone`)}</p>`}
        <div class="form-section">
          ${X({label:L(`episodeFlow.addMed`),iconName:`plus`,variant:`secondary`,action:`addMed`,block:!0})}
        </div>
        ${e.length||t.length?K`<fieldset class="form-section">
              <legend class="section-title">${L(`episodeFlow.helped`)}</legend>
              ${Nd({name:`helped`,legend:L(`episodeFlow.helped`),options:Sp.map(e=>({value:e,label:jp(e)})),selected:$.helped})}
            </fieldset>`:``}`},onChange(e){e.name===`med`&&($.medIds=Cm($.medIds,e.value,e.checked),document.getElementById(`med-when`).hidden=!$.medIds.length),e.name===`helped`&&($.helped=e.value),[`medDate`,`medTime`].includes(e.name)&&e.value&&($[e.name]=e.value)},validate(){if(!$.medIds.length)return!0;let e=hn($.episodeId),t=new Date(Tt($.medDate,$.medTime));return t>=Tm(e.startedAt)&&t<=Tm(e.endedAt??new Date)||wm(`medTime`,L(`episodeFlow.medsOutside`))},afterCommit:Dm},relief:{title:()=>L(`episodeFlow.reliefTitle`),lead:()=>L(`episodeFlow.reliefLead`),body:()=>K`
      <div class="step-options">
        ${Nd({name:`relief`,type:`checkbox`,legend:L(`episodeFlow.reliefTitle`),options:bp.map(e=>({value:e,label:Pp(e)})),selected:$.relief})}
      </div>
      ${km(`reliefOther`,$.relief,$.reliefOther)}`,onChange(e){e.name===`relief`&&($.relief=Cm($.relief,e.value,e.checked),e.value===`other`&&(document.getElementById(`reliefOther-wrap`).hidden=!e.checked))},onInput(e){e.name===`reliefOther`&&($.reliefOther=e.value)}},impact:{title:()=>L(`episodeFlow.impactTitle`),lead:()=>L(`episodeFlow.impactLead`),body:()=>K`
      <div class="step-options">
        ${Nd({name:`impact`,type:`checkbox`,legend:L(`episodeFlow.impactTitle`),options:xp.map(e=>({value:e,label:Fp(e)})),selected:$.impact})}
      </div>
      ${km(`impactOther`,$.impact,$.impactOther)}`,onChange(e){if(e.name!==`impact`)return;$.impact=Cm($.impact,e.value,e.checked);let t=$.impact.filter(e=>e!==`none`);if(e.checked&&(e.value===`none`?t.length:$.impact.includes(`none`))){$.impact=e.value===`none`?[`none`]:t;for(let e of document.querySelectorAll(`input[name="impact"]`))e.checked=$.impact.includes(e.value)}document.getElementById(`impactOther-wrap`).hidden=!$.impact.includes(`other`)},onInput(e){e.name===`impactOther`&&($.impactOther=e.value)}},summary:{title:()=>L(`episodeFlow.summaryTitle`),lead:()=>L(`episodeFlow.summaryLead`),body:e=>{let t=_m(e),n=t.filter(e=>!e.value);return K`
        <div class="summary-status">
          ${e.endedAt?Rd(L(`episode.statusEnded`),{neutral:!0}):Rd(L(`episode.statusOngoing`),{live:!0})}
        </div>
        ${ym(t.filter(e=>e.value),{editable:!0})}
        ${n.length?K`<section class="summary-missing" aria-labelledby="missing-title">
              <h2 class="section-title" id="missing-title">${L(`episodeFlow.summaryMissing`)}</h2>
              <div class="summary-missing__list">
                ${n.map(e=>K`<button type="button" class="chip-btn" data-action="edit" data-step="${e.step}">
                    ${q(`plus`,{size:16})}${L(`episodeFlow.sections.${e.key}`)}
                  </button>`)}
              </div>
            </section>`:``}`}}};function jm(){return J({header:Y({back:`/today`}),body:K`<h1 class="screen-title" tabindex="-1">${L(`episode.title`)}</h1>
      <p class="screen-lead">${L(`episode.notFound`)}</p>`})}var Mm=e=>Am[e.params.step]&&Sm().includes(e.params.step)?e.params.step:`type`;function Nm(e){let t=Am[Mm(e)];return t.validate&&!t.validate()?!1:(Em(),t.afterCommit?.(),!0)}var Pm=(e,t)=>`/episode/${e.params.id}/details/${t}`,Fm=e=>e===`overall`?$.overall:$.symptoms[Number(e)],Im={render(e){let t=hn(e.params.id);if(!t)return jm();(!$||$.episodeId!==t.id)&&($=bm(t));let n=Mm(e),r=Am[n],i=Sm();return J({header:Y({backAction:`prevStep`,step:i.indexOf(n)+1,total:i.length}),body:K`
        <h1 class="screen-title" tabindex="-1">${r.title(t)}</h1>
        ${r.lead?K`<p class="screen-lead">${r.lead(t)}</p>`:``}
        ${r.body(t)}`,footer:n===`summary`?X({label:L(`episodeFlow.save`),iconName:`check`,action:`save`,block:!0}):K`
              ${X({label:L(`common.continue`),action:`next`,block:!0})}
              ${X({label:L(`episode.saveLater`),variant:`ghost`,action:`later`,block:!0})}`})},onChange(e,t){if(e.type===`range`)return this.onInput(e,t);Am[Mm(t)].onChange?.(e)},onInput(e,t){if(e.type===`range`){let t=Number(e.value);om(Fm(e.dataset.index),t),lm(e.dataset.index,t)}else Am[Mm(t)].onInput?.(e)},onSubmit(e,t){if(e.dataset.form!==`custom`)return;let n=mn(e.elements.custom.value);n&&($.symptoms.some(e=>e.key===n.key)||$.symptoms.push({key:n.key,intensity:null,pending:!0}),t.rerender())},actions:{...pm,clear(e){let{index:t}=e.dataset;om(Fm(t),null),lm(t,null),document.querySelector(`[data-action="restore"][data-index="${t}"]`).focus()},restore(e){let{index:t}=e.dataset;om(Fm(t),5),lm(t,5),document.getElementById(`int-${t}`).focus()},next(e,t){if(Am[Mm(t)].confirm?.(),!Nm(t))return;let n=Sm(),r=n[n.indexOf(Mm(t))+1],i=t.query.from===`summary`,o=i&&r!==`intensity`?`summary`:r;a(`${Pm(t,o)}${i&&o!==`summary`?`?from=summary`:``}`,{replace:!0})},prevStep(e,t){if(!Nm(t))return;let n=Sm(),r=n.indexOf(Mm(t));t.query.from===`summary`?a(Pm(t,`summary`),{replace:!0}):a(r>0?Pm(t,n[r-1]):`/episode/${t.params.id}`,{replace:!0})},later(e,t){Nm(t)&&($=null,a(`/today`,{replace:!0}),Q(L(`episode.savedLater`)))},save(){Em(),$=null,a(`/today`,{replace:!0}),Q(L(`episodeFlow.saved`))},edit(e,t){a(`${Pm(t,e.dataset.step)}?from=summary`,{replace:!0})},addMed(e,t){Nm(t)&&a(`/treatment/new`)}}};function Lm(e){return K`
    <section class="card card--accent episode-live" aria-labelledby="live-title">
      <div class="episode-live__head">
        ${Rd(L(`episode.statusOngoing`),{live:!0})}
        <span class="muted small">${L(`episode.since`,{time:Ud(e.startedAt)})}</span>
      </div>
      <div>
        <h2 class="card__title" id="live-title">${L(`episode.title`)}</h2>
        <p class="muted">${L(`episode.lasting`,{duration:Xd(e.startedAt)})}</p>
      </div>
      <div class="btn-row">
        ${X({label:L(`episode.addDetails`),variant:`secondary`,action:`details`,compact:!0})}
        ${X({label:L(`episode.end`),variant:`secondary`,action:`endEpisode`,data:{id:e.id},compact:!0})}
      </div>
    </section>`}function Rm(e,t,n,{href:r,add:i,empty:a=!1}={}){let o=K`
    <span class="tile__label">${q(e,{size:18})}${t}</span>
    <span class="tile__value${a?` tile__value--empty`:``}">${n}</span>`;return r?K`<a class="tile tile--link" href="${r}">${o}</a>`:i?K`
    <div class="tile tile--with-add">
      ${o}
      <a class="tile__add" href="${i.href}" aria-label="${i.label}" title="${i.label}">${q(`plus`,{size:22,strokeWidth:2.25})}</a>
    </div>`:K`<div class="tile">${o}</div>`}var zm=(e,t,n)=>Rm(e,t,K`<span class="tile__lock">${q(`lock`,{size:14})}${L(`plus.name`)}</span>`,{href:`#/plus?from=${n}`});function Bm(){let e=L(`today.pressure`),t=L(`today.steps`);if(!I())return[zm(`gauge`,e,`weather`),zm(`footprints`,t,`health`)];let{weather:n,health:r}=F(),i=n.enabled?Ln(A()):null,a=r.connected&&r.types.includes(`steps`)?Vn(A()):null;return[i?Rm(`gauge`,e,[nf(i.pressure),i.pressureChange==null?``:of(i.pressureChange)].filter(Boolean).join(` · `),{href:`#/plus/weather`}):Rm(`gauge`,e,L(`today.turnOn`),{href:`#/plus/weather`,empty:!0}),a?.steps==null?Rm(`footprints`,t,Wl()?L(`today.connect`):L(`today.mobileOnly`),{href:`#/plus/health`,empty:!0}):Rm(`footprints`,t,lf(a.steps),{href:`#/plus/health`})]}function Vm(e){let t=new Map;for(let n of e)for(let e of n.symptoms){let n=t.get(e.key);t.set(e.key,n==null?e.intensity:Math.max(n,e.intensity??n))}return K`
    <ul class="sym-chips" aria-label="${L(`today.symptomsToday`)}">
      ${[...t].map(([e,t])=>K`<li class="sym-chip">${Ep(e)}${t==null?``:K` <strong>${t}</strong>`}</li>`)}
    </ul>`}function Hm(){if(!Qp())return``;let{lastAt:e}=F().backup;return K`
    <section class="card backup-card" aria-labelledby="backup-title">
      <div class="backup-card__head">
        ${q(`backup`,{size:22})}
        <h2 class="card__title" id="backup-title">${L(`backup.card.title`)}</h2>
      </div>
      <p class="muted">${e?L(`backup.card.textOld`,{date:Gd(e)}):L(`backup.card.textNever`)}</p>
      <div class="btn-row">
        ${X({label:L(`backup.card.action`),variant:`secondary`,action:`openBackup`,compact:!0})}
        ${X({label:L(`backup.card.later`),variant:`ghost`,action:`snoozeBackup`,compact:!0})}
      </div>
    </section>`}function Um(){let e=K`<span class="visually-hidden">${L(`community.external`)}</span>`,t=(t,n)=>{let r=K`
      ${q(n)}
      <span class="list__text">
        <span class="list__label">${L(`community.${t}`)}</span>
        <span class="list__hint">${L(`community.${t}Hint`)}</span>
      </span>`;return xe[t]?K`
      <a class="list__row" href="${xe[t]}" target="_blank" rel="noopener noreferrer">
        ${r}
        <span class="community__ext">${q(`externalLink`,{size:18})}</span>
        ${e}
      </a>`:K`<div class="list__row">${r}${Rd(L(`community.soon`),{neutral:!0})}</div>`};return K`
    <section class="section" aria-labelledby="community-title">
      <h2 class="section-title" id="community-title">${L(`community.title`)}</h2>
      <p class="community__lead">${L(`community.lead`)}</p>
      <div class="list">${t(`facebook`,`users`)}${t(`instagram`,`camera`)}${t(`discord`,`messages`)}</div>
      <div class="community-web">
        <h3 class="community-web__title">${L(`community.webTitle`)}</h3>
        <p class="muted">${L(`community.webText`)}</p>
        <a class="community-web__link" href="${xe.web}" target="_blank" rel="noopener noreferrer">
          ${L(`community.webUrl`)}${q(`externalLink`,{size:18})}${e}
        </a>
      </div>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`community.note`)}</span></p>
    </section>`}var Wm={render(){let{name:e}=F(),t=Yn(),n=gn(),r=t.episodes.length+t.symptomLogs.length+t.intakes.length>0||!!t.sleep,i=t.sleep?[Yd(t.sleep.minutes),t.sleep.quality?Ip(t.sleep.quality):``].filter(Boolean).join(` · `):``,a=`#/sleep?date=${A()}`,o=L(`today.nothingYet`);return Ed(`today`,K`
      <header class="today-header">
        <h1 class="screen-title today-title" tabindex="-1">
          ${e?L(`today.greetingName`,{name:e}):L(`today.greeting`)}
        </h1>
        ${jd()}
        <p class="today-date">${Vd()}</p>
      </header>

      ${n?Lm(n):``}

      <section class="card feeling" aria-labelledby="feeling-title">
        <h2 class="card__title" id="feeling-title">${L(`today.howAreYou`)}</h2>
        ${t.symptomLogs.length?Vm(t.symptomLogs):K`${Gf({size:150})}<p class="muted">${L(`today.noEntries`)}</p>`}
        <div class="btn-row">
          ${X({label:L(`today.addSymptom`),iconName:`plus`,action:`addSymptom`,compact:!0})}
        </div>
      </section>

      ${n?``:Sf()}

      <section class="section" aria-labelledby="overview-title">
        <h2 class="section-title" id="overview-title">${L(`today.overview`)}</h2>
        <div class="tiles tiles--grid">
          ${t.sleep?Rm(`bed`,L(`today.sleep`),i,{href:a}):Rm(`bed`,L(`today.sleep`),o,{empty:!0,add:{href:a,label:L(`sleep.add`)}})}
          ${Rm(`pill`,L(`today.meds`),t.intakes.length?R(`plural.entries`,t.intakes.length):o,{empty:!t.intakes.length,add:{href:`#/medication-intake`,label:L(`today.logIntake`)}})}
          ${Bm()}
        </div>
        ${r?Hp(t):K`<p class="empty">${L(`today.entriesEmpty`)}</p>`}
      </section>

      ${n?``:Hm()}

      ${Um()}`)},mount(e,t){if(!gn())return null;let n=setInterval(()=>t.rerender(),3e4);return()=>clearInterval(n)},actions:{addSymptom(){em(),a(`/log/symptoms`)},details(){a(xm(gn()))},openBackup(){a(`/backup`)},async snoozeBackup(e,t){await Wc(e.closest(`.backup-card`)),ur(14),t.rerender()},async endEpisode(e,t){let{id:n}=e.dataset;e.disabled=!0,await Wc(e.closest(`.episode-live`)),yn(n),t.rerender(),Q(L(`episode.endedToast`),{actionLabel:L(`common.undo`),onAction:()=>{Sn(n),t.rerender()}})}}};function Gm(){return J({header:Y({back:`/today`}),body:K`<h1 class="screen-title" tabindex="-1">${L(`episode.title`)}</h1>
      <p class="screen-lead">${L(`episode.notFound`)}</p>`})}function Km(e){return J({variant:`screen--center`,header:Y({back:`/today`}),body:K`
      <div class="episode-started">
        ${zd(`timer`,{large:!0})}
        <h1 class="screen-title" tabindex="-1">${L(`episode.started`)}</h1>
        <p class="big-time">
          <span class="big-time__label">${L(`episode.startedAt`)}</span>
          <time datetime="${e.startedAt}">${Hd(e.startedAt)}</time>
        </p>
        <p class="muted">${L(`episode.detailsLater`)}</p>
      </div>`,footer:K`
      ${X({label:L(`episode.addDetails`),action:`addDetails`,block:!0})}
      ${X({label:L(`episode.finishLater`),variant:`outline`,action:`finishLater`,block:!0})}
      <p class="mistake">
        <span>${L(`episode.mistake`)}</span>
        <button type="button" class="link-btn" data-action="cancelNew">${L(`episode.cancel`)}</button>
      </p>`})}function qm(e){let t=sn(e.id),n=Zt().filter(t=>t.episodeId===e.id);return K`
    ${t.length?K`<section class="section"><h2 class="section-title">${L(`episode.linkedSymptoms`)}</h2>${Hp({symptomLogs:t})}</section>`:``}
    ${n.length?K`<section class="section"><h2 class="section-title">${L(`episode.linkedIntakes`)}</h2>${Hp({intakes:n})}</section>`:``}`}function Jm(e){let t=!e.endedAt,n=vm(e),r=_m(e,{withTime:!1}).filter(e=>e.value);return J({header:Y({back:`/today`}),body:K`
      <div class="episode-head">
        <h1 class="screen-title" tabindex="-1">${L(`episode.title`)}</h1>
        ${t?Rd(L(`episode.statusOngoing`),{live:!0}):Rd(L(`episode.statusEnded`),{neutral:!0})}
      </div>
      <p class="screen-lead">${Vd(new Date(e.startedAt))}</p>
      <dl class="facts">
        <div class="fact">
          <dt>${L(`episode.startedAt`)}</dt>
          <dd>${Hd(e.startedAt)}</dd>
        </div>
        <div class="fact">
          <dt>${L(`episode.endedAt`)}</dt>
          <dd>${t?`—`:Hd(e.endedAt)}</dd>
        </div>
        <div class="fact">
          <dt>${L(`episode.duration`)}</dt>
          <dd>${Xd(e.startedAt,e.endedAt??new Date)}</dd>
        </div>
      </dl>
      ${n?K`<section class="section" aria-labelledby="details-title">
            <h2 class="section-title" id="details-title">${L(`episode.details`)}</h2>
            ${ym(r)}
          </section>`:``}
      ${gf(A(e.startedAt))?K`<section class="section" aria-labelledby="context-title">
            <h2 class="section-title" id="context-title">${L(`plus.weather.episodeDay`)}</h2>
            ${gf(A(e.startedAt))}
          </section>`:``}
      ${qm(e)}`,footer:K`
      ${t?X({label:L(`episode.end`),action:`end`,block:!0}):``}
      ${X({label:L(n?`episode.editDetails`:`episode.addDetails`),variant:t?`secondary`:`primary`,action:`addDetails`,block:!0})}
      ${t||n?``:X({label:L(`episode.saveLater`),variant:`secondary`,action:`saveLater`,block:!0})}
      ${X({label:L(`episode.delete`),variant:`danger`,action:`delete`,block:!0})}`})}var Ym={render(e){let t=hn(e.params.id);return t?e.query.new===`1`&&!t.endedAt?Km(t):Jm(t):Gm()},actions:{addDetails(e,t){a(xm(hn(t.params.id)),{replace:t.query.new===`1`})},saveLater(){a(`/today`,{replace:!0}),Q(L(`episode.savedLater`))},finishLater(){a(`/today`,{replace:!0})},cancelNew(e,t){let n=Cn(t.params.id);a(`/today`,{replace:!0}),Q(L(`episode.cancelledToast`),{actionLabel:L(`common.undo`),onAction:()=>{wn(n),t.rerender()}})},end(e,t){let{id:n}=t.params;yn(n),t.rerender(),Q(L(`episode.endedToast`),{actionLabel:L(`common.undo`),onAction:()=>{Sn(n),t.rerender()}})},async delete(e,t){if(!await fp({title:L(`episode.deleteTitle`),text:L(`episode.deleteText`),confirmLabel:L(`episode.delete`)}))return;let n=Cn(t.params.id);s(`/today`),Q(L(`episode.deletedToast`),{actionLabel:L(`common.undo`),onAction:()=>{wn(n),t.rerender()}})}}};function Xm(e){return K`
    <li>
      <a class="entry" href="#/treatment/${e.id}/intake" data-replace>
        <span class="entry__main">
          <span class="entry__title">${[e.name,e.dose].filter(Boolean).join(` · `)}</span>
          ${e.frequency?K`<span class="entry__meta">${e.frequency}</span>`:``}
        </span>
        ${q(`chevronRight`,{size:20})}
      </a>
    </li>`}function Zm(e,t){let n=t.filter(t=>t.type===e);return n.length?K`
    <section class="section" aria-labelledby="pick-${e}">
      <h2 class="section-title" id="pick-${e}">${L(`treatment.${e}`)}</h2>
      <ul class="entries">${n.map(Xm)}</ul>
    </section>`:``}var Qm={render(){let e=Wt();return J({header:Y({back:`/today`}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`quickIntake.title`)}</h1>
        ${e.length?K`<p class="screen-lead">${L(`quickIntake.lead`)}</p>${Zm(`acute`,e)}${Zm(`preventive`,e)}`:K`<p class="screen-lead">${L(`quickIntake.empty`)}</p>`}`,footer:X({label:L(`quickIntake.add`),iconName:`plus`,variant:e.length?`secondary`:`primary`,action:`add`,block:!0})})},actions:{add(){a(`/treatment/new`)}}};function $m(){return tl(()=>Be(`${A()}.json`,JSON.stringify(qn(),null,2)))}async function eh({title:e,text:t,confirmLabel:n,offerBackup:r=!0}){let i=await dp({title:e,text:[t,I()&&!F().plus.simulated?L(`privacy.plusNotCancelled`,{store:mu()}):``],choices:[{value:`erase`,label:n},...r?[{value:`backup`,label:L(`privacy.backupFirst`),variant:`outline`}]:[]]});return i===`backup`&&a(`/backup`),i===`erase`&&(Rf(),Ve(),dr(),Ic(),a(`/start/language`,{replace:!0}),!0)}var th=[0,1,5,15];function nh(e){let t=at();return K`
    <section class="profile-section" aria-labelledby="security-title">
      <h2 id="security-title">${L(`security.title`)}</h2>
      <div class="list">
        ${Ld({name:`appLock`,label:L(`security.pin`),hint:L(t?`security.pinOnHint`:`security.pinOffHint`),checked:t,iconName:`lock`})}
        ${t?K`
              <a class="list__row" href="#/security/pin?mode=change">
                ${q(`keyRound`)}<span class="list__label">${L(`security.changePin`)}</span>${q(`chevronRight`,{size:20})}
              </a>
              <div class="list__field">
                <label class="field__label" for="f-autoLock">${L(`security.autoLock`)}</label>
                <select class="field__input" id="f-autoLock" name="autoLock">
                  ${th.map(t=>K`<option value="${t}"${t===(e.autoLockMinutes??1)?K` selected`:``}>
                      ${L(`security.autoLockOptions.m${t}`)}
                    </option>`)}
                </select>
              </div>`:``}
        ${je()?``:K`<label class="list__row list__row--switch is-disabled" for="f-biometrics">
              ${q(`scanFace`)}
              <span class="list__text">
                <span class="list__label">${L(`security.biometrics`)}</span>
                <span class="list__hint" id="f-biometrics-hint">${L(`security.biometricsHint`)}</span>
              </span>
              <input class="switch" type="checkbox" role="switch" id="f-biometrics" disabled aria-describedby="f-biometrics-hint" />
            </label>`}
      </div>
    </section>`}var rh={render(){let e=F();return Ed(`profile`,K`
      <h1 class="screen-title" tabindex="-1">${L(`profile.title`)}</h1>

      ${K`<section class="profile-section" aria-labelledby="demo-title">
            <h2 id="demo-title">${L(`profile.demoSection`)}</h2>
            <div class="list">
              ${Ld({name:`demoEnabled`,label:L(`profile.demoFill`),hint:L(`profile.demoFillHint`),checked:e.demoEnabled,iconName:`sparkles`})}
              ${Ld({name:`demoPlus`,label:L(`profile.demoPlus`),hint:L(`profile.demoPlusHint`),checked:I(),iconName:`lock`})}
            </div>
          </section>`}

      <section class="profile-section" aria-labelledby="plus-title">
        <h2 id="plus-title">${L(`plus.name`)}</h2>
        <div class="list">
          <a class="list__row" href="#/plus">
            ${q(`sparkles`)}
            <span class="list__text">
              <span class="list__label">${L(I()?`profile.plusActive`:`profile.plusTry`)}</span>
              <span class="list__hint">${Pn()?L(`plus.manage.trialUntil`,{date:Gd(Pn())}):L(`profile.plusHint`)}</span>
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
          ${wr.map(t=>K`<option value="${t}" lang="${t}"${t===e.language?K` selected`:``}>${jr(t,`language.${t}`)}</option>`)}
        </select>
      </section>

      <section class="profile-section" aria-labelledby="tracking-title">
        <h2 id="tracking-title">${L(`profile.tracking`)}</h2>
        <div class="list">
          ${Ld({name:`cycleTracking`,label:L(`profile.cycle`),checked:e.cycleTracking===!0,iconName:`calendar`})}
          ${Ld({name:`reminderEnabled`,label:L(`profile.reminders`),checked:e.reminder.enabled,iconName:`bell`})}
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
            ${Pd({name:`theme`,legend:L(`profile.appearance`),selected:e.theme??`system`,options:Jc.map(e=>({value:e,label:L(`profile.themes.${e}`)}))})}
          </div>
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

      ${nh(e)}

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
              <span class="list__hint">${e.backup.lastAt?L(`backup.lastAt`,{date:Gd(e.backup.lastAt)}):L(`backup.profileHint`)}</span>
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
          <a class="list__row" href="#/terms">
            ${q(`fileText`)}
            <span class="list__label">${L(`terms.title`)}</span>
            ${q(`chevronRight`,{size:20})}
          </a>
          <div class="list__row">
            ${q(`shield`)}
            <span class="list__text">
              <span class="list__label">${L(`privacy.consent`)}</span>
              <span class="list__hint">
                ${e.consent?.healthDataAt?L(`privacy.consentGiven`,{date:Gd(e.consent.healthDataAt)}):``}
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

      <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`profile.disclaimer`)}</span></p>`,{header:Y({back:`/today`})})},async onChange(e,t){let{reminder:n}=F();switch(e.name){case`name`:Vt({name:e.value.trim(),nameSetAt:e.value.trim()?new Date().toISOString():null}),Q(L(`profile.saved`));break;case`language`:Dr(e.value),Vt({language:e.value}),lt({language:e.value}),Lf(),t.rerender();break;case`theme`:Vt({theme:e.value}),lt({theme:e.value}),Zc(e.value);break;case`demoEnabled`:e.checked?$n(Sr()):er(),t.rerender(),Q(L(e.checked?`profile.demoFillOn`:`profile.demoFillOff`));break;case`demoPlus`:e.checked?Su(`yearly`):Ou(),t.rerender();break;case`appLock`:a(`/security/pin?mode=${e.checked?`set`:`disable`}`);break;case`autoLock`:Vt({autoLockMinutes:Number(e.value)}),Q(L(`profile.saved`));break;case`cycleTracking`:Vt({cycleTracking:e.checked});break;case`reminderEnabled`:{let r=e.checked&&await jf();e.checked&&!r&&Q(L(`notifications.denied`)),Vt({reminder:{...n,enabled:r}}),Pf(),t.rerender(),r&&Uc(document.querySelector(`.list__field`));break}case`reminderTime`:e.value&&(Vt({reminder:{...n,time:e.value}}),Pf())}},actions:{async demoReset(e,t){await fp({title:L(`profile.demoResetTitle`),text:L(`profile.demoResetText`),confirmLabel:L(`profile.demoResetConfirm`)})&&($n(Sr()),t.rerender(),Q(L(`profile.demoResetDone`)))},onboardingAgain(){Vt({onboardingCompletedAt:null}),a(`/start/welcome`,{replace:!0})},async exportData(e,t){try{if(!await $m())return;cr(),t.rerender(),Q(L(`privacy.exportDone`))}catch(e){console.error(`[profile] Export sa nepodaril`,e),Q(L(`privacy.exportFailed`))}},async logout(){at()?ol():await fp({title:L(`profile.logoutNoPinTitle`),text:L(`profile.logoutNoPinText`),confirmLabel:L(`profile.logoutNoPinConfirm`)})&&a(`/security/pin?mode=set&logout=1`)},withdrawConsent(){return eh({title:L(`privacy.withdrawTitle`),text:L(`privacy.withdrawText`),confirmLabel:L(`privacy.withdrawConfirm`)})},deleteAll(){return eh({title:L(`profile.deleteAllTitle`),text:L(`profile.deleteAllText`),confirmLabel:L(`profile.deleteAllConfirm`)})}}},ih=null;function ah(){let{lastAt:e,remind:t}=F().backup;return J({header:Y({back:`/profile`}),form:!0,body:K`
      <h1 class="screen-title" tabindex="-1">${L(`backup.title`)}</h1>
      <p class="screen-lead">${L(`backup.lead`)}</p>
      <p class="backup-status">
        ${q(e?`check`:`info`,{size:20})}
        <span>${e?L(`backup.lastAt`,{date:Gd(e)}):L(`backup.never`)}</span>
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
        <div class="list">${Ld({name:`remind`,label:L(`backup.reminder`),hint:L(`backup.reminderHint`),checked:t,iconName:`bell`})}</div>
      </section>

      <p class="disclaimer">${q(`shield`,{size:20})}<span>${L(`backup.privacy`)}</span></p>`})}function oh(){return J({header:Y({backAction:`cancelRestore`}),form:!0,body:K`
      <h1 class="screen-title" tabindex="-1">${L(`backup.restoreTitle`)}</h1>
      <p class="screen-lead">${ih.createdAt?L(`backup.restoreLeadDate`,{date:Gd(ih.createdAt)}):L(`backup.restoreLead`)}</p>
      ${Z({label:L(`backup.password`),name:`restorePassword`,type:`password`,autocomplete:`current-password`})}
      <p class="info-note">${q(`info`,{size:20})}<span>${L(`privacy.importText`)}</span></p>`,footer:K`
      ${X({label:L(`backup.restoreSubmit`),iconName:`upload`,type:`submit`,block:!0,id:`backup-restore`})}
      ${X({label:L(`common.cancel`),variant:`ghost`,action:`cancelRestore`,block:!0})}`})}function sh(e){sr(e),ih=null,Lf(),Q(L(`privacy.importDone`)),a(`/today`,{replace:!0})}async function ch(e,t){let n=new FormData(e),r=String(n.get(`password`)??``);if(r.length<8){Fd(e,`password`,L(`backup.errors.tooShort`,{n:8}));return}if(r!==String(n.get(`passwordRepeat`)??``)){Fd(e,`passwordRepeat`,L(`backup.errors.mismatch`));return}let i=e.querySelector(`#backup-create`);i.disabled=!0,Q(L(`backup.creating`));try{let e=await qp(r);if(!await tl(()=>Be(`${L(`backup.fileName`)}-${A()}.json`,e))){i.disabled=!1;return}cr(),t.rerender(),Q(L(`backup.created`))}catch(e){console.error(`[backup] Zálohu sa nepodarilo vytvoriť`,e),i.disabled=!1,Q(L(`backup.failed`))}}async function lh(e){let t=String(new FormData(e).get(`restorePassword`)??``);if(!t){Fd(e,`restorePassword`,L(`backup.errors.passwordRequired`));return}let n=e.querySelector(`#backup-restore`);n.disabled=!0;let r=await Xp(ih.backup,t);n.disabled=!1,!r||r===`newer`?Fd(e,`restorePassword`,L(r?`backup.errors.newerVersion`:`backup.errors.wrongPassword`)):await fp({title:L(`privacy.importTitle`),text:L(`privacy.importText`),confirmLabel:L(`privacy.importConfirm`)})&&sh(r)}var uh={render(e){return e.query.restore||(ih=null),ih?oh():ah()},onSubmit(e,t){return ih?lh(e):ch(e,t)},onChange(e){e.name===`remind`&&lr(e.checked)},actions:{async pickBackup(e,t){let n=await tl(()=>He(`application/json,.json`));if(!n)return;let r=Yp(await n.text());!r||r.kind===`newer`?Q(L(r?`backup.errors.newerVersion`:`backup.errors.invalidFile`)):r.kind===`plain`?await fp({title:L(`privacy.importTitle`),text:L(`privacy.importText`),confirmLabel:L(`privacy.importConfirm`)})&&sh(r.records):(ih=r,o(`/backup?restore=1`),t.rerender(),document.getElementById(`f-restorePassword`)?.focus())},cancelRestore(e,t){ih=null,o(`/backup`),t.rerender()}}},dh=[[`--color-bg`,`Pozadie`],[`--color-blob`,`Organické tvary`],[`--color-surface`,`Karty`],[`--color-surface-tint`,`Zvolené / sekundárne`],[`--color-border`,`Okraje`],[`--color-border-strong`,`Výrazné okraje`],[`--color-coral`,`Korálová – akcent`],[`--color-coral-soft`,`Korálová jemná`],[`--color-cta`,`Tlačidlá`],[`--color-cta-pressed`,`Tlačidlá – stlačené`],[`--color-text`,`Text`],[`--color-text-muted`,`Text tlmený`]],fh=(e,t)=>K`
  <section class="sg-section">
    <h2 class="section-title">${e}</h2>
    ${t}
  </section>`,ph={render(){return J({header:Y({back:`/profile`}),body:K`
        <h1 class="screen-title" tabindex="-1">Dizajn systém</h1>
        <p class="screen-lead">Farby a písma sú v <code>src/styles/tokens.css</code>, logo v
          <code>src/assets/brand/vm-logo.svg</code>. Ilustrácie sú zatiaľ zástupné v <code>src/ui/placeholders.js</code>.</p>

        ${fh(`Farby`,K`<div class="sg-swatches">
            ${dh.map(([e,t])=>K`
                <div class="sg-swatch">
                  <span class="sg-swatch__color" style="background:var(${e})"></span>
                  <span class="sg-swatch__label">${t}</span>
                  <code class="sg-swatch__token">${e}</code>
                </div>`)}
          </div>`)}

        ${fh(`Typografia`,K`<div class="stack">
            <p class="sg-type sg-type--3xl">Nadpis úvodu 38</p>
            <p class="sg-type sg-type--2xl">Nadpis obrazovky 32</p>
            <p class="sg-type sg-type--xl">Nadpis dialógu 26</p>
            <p class="sg-type sg-type--lg">Nadpis sekcie a karty 20</p>
            <p>Bežný text 17 – Zaznamenávajte svoje symptómy, hľadajte možné súvislosti.</p>
            <p class="muted small">Doplnkový text 15 – tlmená farba pre vysvetlivky.</p>
          </div>`)}

        ${fh(`Tlačidlá`,K`<div class="stack">
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

        ${fh(`Výber možností`,K`<div class="stack">
            ${Nd({name:`sg-radio`,legend:`Jedna možnosť`,options:[{value:`a`,label:`Vestibulárna migréna`},{value:`b`,label:`Migréna`}],selected:`a`})}
            ${Nd({name:`sg-check`,type:`checkbox`,legend:`Viac možností`,options:[{value:`a`,label:`Sledovať moje symptómy`},{value:`b`,label:`Zaznamenávať možné spúšťače`}],selected:[`a`]})}
            ${Pd({name:`sg-seg`,legend:`Segment`,selected:`a`,options:[{value:`a`,label:`Preventívny`},{value:`b`,label:`Akútny`}]})}
          </div>`)}

        ${fh(`Polia a prepínače`,K`<div class="stack">
            ${Z({label:`Názov lieku`,name:`sg-name`,placeholder:`napr. Betahistín`})}
            ${Z({label:`Poznámka`,name:`sg-note`,multiline:!0,optional:!0})}
            <div class="list">${Ld({name:`sg-switch`,label:`Denná pripomienka`,checked:!0,iconName:`bell`})}</div>
          </div>`)}

        ${fh(`Karty a štítky`,K`<div class="stack">
            <div class="card">
              <h3 class="card__title">Karta</h3>
              <p class="muted">Zaoblená plocha s jemným tieňom.</p>
            </div>
            <div class="card card--accent">
              <h3 class="card__title">Zvýraznená karta</h3>
              <p class="muted">Napríklad prebiehajúca epizóda.</p>
            </div>
            <div class="btn-row">${Rd(`Prebieha`,{live:!0})} ${Rd(`Ukončená`,{neutral:!0})}</div>
          </div>`)}

        ${fh(`Ikony (Lucide)`,K`<div class="sg-icons">
            ${Sd.map(e=>K`<span class="sg-icon" title="${e}">${q(e)}</span>`)}
          </div>
          <div class="btn-row" style="margin-top:16px">${zd(`timer`)} ${zd(`pill`,{large:!0})}</div>`)}

        ${fh(`Logo a ilustrácie (ilustrácie sú zástupné)`,K`<div class="stack">
            ${Wf()}
            ${Wf({large:!0})}
            ${Gf({size:220})}
            ${Gf({symbol:`bell`,size:160})}
          </div>`)}`})},actions:{demo(){Q(`Toto je upozornenie (toast)`,{actionLabel:`Vrátiť`,onAction:()=>{}})}}},mh=`/log/symptoms`;function hh(){let e=tm().symptoms.length,t=document.getElementById(`log-continue`);t.disabled=e===0,t.querySelector(`span`).textContent=e?L(`log.continueCount`,{n:e}):L(`common.continue`)}var gh={render(){let e=tm(),{step:t,total:n}=im(mh),r=e.symptoms.map(e=>e.key),i=r.length;return J({header:Y({back:`/today`,step:t,total:n}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`log.symptomsTitle`)}</h1>
        <p class="screen-lead">${L(`log.symptomsLead`)}</p>

        <div class="search">
          ${q(`search`,{size:20})}
          <input class="field__input search__input" type="search" id="symptom-search" autocomplete="off"
            placeholder="${L(`log.search`)}" aria-label="${L(`log.search`)}" />
        </div>

        ${fm({name:`symptom`,legend:L(`log.symptomsTitle`),items:dm(),selected:r,search:!0})}
        <p class="empty" id="sym-empty" hidden>${L(`log.noMatch`)}</p>

        <form class="custom-add" data-form="custom">
          <label class="field__label" for="custom-symptom">${L(`log.custom`)}</label>
          <div class="custom-add__row">
            <input class="field__input" id="custom-symptom" name="custom" maxlength="40" autocomplete="off"
              placeholder="${L(`log.customPlaceholder`)}" />
            <button type="submit" class="btn btn--secondary btn--compact">${q(`plus`,{size:20})}<span>${L(`log.customAdd`)}</span></button>
          </div>
        </form>`,footer:X({label:i?L(`log.continueCount`,{n:i}):L(`common.continue`),action:`next`,id:`log-continue`,disabled:i===0,block:!0})})},onInput(e){if(e.id!==`symptom-search`)return;let t=um(e.value.trim()),n=0;for(let e of document.querySelectorAll(`.sym-cell`)){let r=!t||e.dataset.search.includes(t);e.hidden=!r,r&&(n+=1)}document.getElementById(`sym-empty`).hidden=n>0},onChange(e){if(e.name!==`symptom`)return;let t=tm();e.checked?t.symptoms.push({key:e.value,intensity:null,pending:!0}):t.symptoms=t.symptoms.filter(t=>t.key!==e.value),hh()},onSubmit(e,t){if(e.dataset.form!==`custom`)return;let n=mn(e.elements.custom.value);if(!n)return;let r=tm();r.symptoms.some(e=>e.key===n.key)||r.symptoms.push({key:n.key,intensity:null,pending:!0}),t.rerender(),document.getElementById(`custom-symptom`).value=``},actions:{...pm,next(){tm().symptoms.length&&a(im(mh).next,{replace:!0})}}},_h=`/log/intensity`,vh={render(){let{symptoms:e}=tm(),{step:t,total:n}=im(_h);return J({header:Y({backAction:`prevStep`,step:t,total:n}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`log.intensityTitle`)}</h1>
        <p class="screen-lead">${L(`log.intensityLead`)}</p>
        <div class="intensity-list">
          ${e.map((e,t)=>cm({index:t,label:Ep(e.key),value:am(e),iconName:Dp(e.key)}))}
        </div>`,footer:K`
        ${X({label:L(`common.continue`),action:`next`,block:!0})}
        ${X({label:L(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onInput(e){if(e.type!==`range`)return;let t=Number(e.dataset.index);om(tm().symptoms[t],Number(e.value)),lm(t,Number(e.value))},onChange(e){this.onInput(e)},actions:{clear(e){let t=Number(e.dataset.index);om(tm().symptoms[t],null),lm(t,null),document.querySelector(`[data-action="restore"][data-index="${t}"]`).focus()},restore(e){let t=Number(e.dataset.index);om(tm().symptoms[t],5),lm(t,5),document.getElementById(`int-${t}`).focus()},next(){tm().symptoms.forEach(sm),a(im(_h).next,{replace:!0})},skip(){for(let e of tm().symptoms)om(e,null);a(im(_h).next,{replace:!0})},prevStep(){a(im(_h).prev,{replace:!0})}}},yh=`/log/details`;function bh(e){return e.episodeId?hn(e.episodeId):Dt(e.date)?gn():null}function xh(e){return Dt(j(e.date))?L(`log.whenToday`,{time:e.time}):L(`log.whenOn`,{date:Vd(j(e.date)),time:e.time})}var Sh={render(){let e=tm(),{step:t,total:n}=im(yh),r=bh(e);return J({header:Y({backAction:`prevStep`,step:t,total:n}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`log.detailsTitle`)}</h1>
        <p class="screen-lead">${L(`log.detailsLead`)}</p>
        <div class="step-options">
          ${Nd({name:`duration`,legend:L(`log.detailsTitle`),options:gp.map(e=>({value:e,label:Ap(e)})),selected:e.duration})}
        </div>

        <fieldset class="form-section">
          <legend class="section-title">${L(`log.when`)}</legend>
          <!-- Čas je predvyplnený (teraz alebo deň z kalendára); polia sa ukážu až na požiadanie -->
          <div class="when-summary"${e.editTime?K` hidden`:``}>
            <span>${xh(e)}</span>
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
          ${r?Nd({name:`linkEpisode`,type:`checkbox`,legend:L(`log.linkEpisode`),options:[{value:`yes`,label:`${L(`log.linkEpisode`)} (${L(`episode.since`,{time:Hd(r.startedAt)})})`}],selected:e.linkEpisode?`yes`:null}):``}
        </fieldset>

        <div class="form-section">
          ${Z({label:L(`log.note`),name:`note`,value:e.note,multiline:!0,optional:!0})}
        </div>`,footer:X({label:L(`log.save`),action:`save`,iconName:`check`,block:!0})})},onChange(e){let t=tm();e.name===`duration`&&(t.duration=e.value),e.name===`date`&&e.value&&(t.date=e.value),e.name===`time`&&e.value&&(t.time=e.value),e.name===`linkEpisode`&&(t.linkEpisode=e.checked)},onInput(e){e.name===`note`&&(tm().note=e.value)},actions:{changeTime(){tm().editTime=!0,document.querySelector(`.when-summary`).hidden=!0,document.getElementById(`when-fields`).hidden=!1,document.getElementById(`f-date`).focus()},save(){let e=tm(),t=bh(e);cn({id:e.id,occurredAt:Tt(e.date,e.time),symptoms:e.symptoms,vertigoType:e.vertigoType,duration:e.duration,note:e.note,episodeId:t&&e.linkEpisode?t.id:null}),nm(),s(`/today`),Q(L(`log.saved`))},prevStep(){a(im(yh).prev,{replace:!0})}}};function Ch(e){return K`
    <ul class="sym-rows">
      ${e.symptoms.map(e=>K`
          <li class="sym-row">
            <span class="icon-badge">${q(Dp(e.key),{size:22})}</span>
            <span class="sym-row__label">${Ep(e.key)}</span>
            <span class="sym-row__value ${e.intensity==null?`muted`:``}">${Op(e.intensity)}</span>
          </li>`)}
    </ul>`}var wh={render(e){let t=on(e.params.id);if(!t)return J({header:Y({back:`/today`}),body:K`<h1 class="screen-title" tabindex="-1">${L(`symptomLog.title`)}</h1>
          <p class="screen-lead">${L(`symptomLog.notFound`)}</p>`});let n=t.episodeId?hn(t.episodeId):null;return J({header:Y({back:`/today`}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`symptomLog.title`)}</h1>
        <p class="screen-lead">${Vd(new Date(t.occurredAt))} · ${Hd(t.occurredAt)}</p>
        ${Ch(t)}
        <dl class="facts">
          ${t.duration?K`<div class="fact"><dt>${L(`symptomLog.duration`)}</dt><dd>${Ap(t.duration)}</dd></div>`:``}
          ${n?K`<div class="fact"><dt>${L(`symptomLog.episode`)}</dt>
                <dd><a href="#/episode/${n.id}">${L(`episode.since`,{time:Hd(n.startedAt)})}</a></dd></div>`:``}
        </dl>
        ${t.note?K`<h2 class="section-title section">${L(`symptomLog.note`)}</h2><p class="note-text">${t.note}</p>`:``}`,footer:K`
        ${X({label:L(`symptomLog.edit`),variant:`secondary`,iconName:`pencil`,action:`edit`,block:!0})}
        ${X({label:L(`symptomLog.delete`),variant:`danger`,action:`delete`,block:!0})}`})},actions:{edit(e,t){em({logId:t.params.id}),a(`/log/symptoms`)},async delete(e,t){if(!await fp({title:L(`symptomLog.deleteTitle`),text:L(`symptomLog.deleteText`),confirmLabel:L(`symptomLog.delete`)}))return;let n=ln(t.params.id);s(`/today`),Q(L(`symptomLog.deletedToast`),{actionLabel:L(`common.undo`),onAction:()=>{un(n),t.rerender()}})}}};function Th(e){let t=Zt(e.id)[0];return K`
    <li>
      <a class="entry" href="#/treatment/${e.id}">
        <span class="entry__main">
          <span class="entry__title">${[e.name,e.dose].filter(Boolean).join(` · `)}</span>
          <span class="entry__meta">
            ${[e.frequency,t?L(`treatment.lastTaken`,{when:Ud(t.takenAt)}):L(`treatment.neverTaken`)].filter(Boolean).join(` · `)}
          </span>
        </span>
        ${q(`chevronRight`,{size:20})}
      </a>
    </li>`}function Eh(e,t){let n=t.filter(t=>t.type===e);return K`
    <section class="section" aria-labelledby="group-${e}">
      <h2 class="section-title" id="group-${e}">${L(`treatment.${e}`)}</h2>
      ${n.length?K`<ul class="entries">${n.map(Th)}</ul>`:K`<p class="empty">${L(`treatment.noneOfType`)}</p>`}
    </section>`}var Dh={render(){let e=Wt();return Ed(`treatment`,K`
        ${Md(L(`treatment.title`))}
        <p class="screen-lead">${L(`treatment.lead`)}</p>
        ${e.length?K`<p class="treatment-hint">${L(`treatment.hint`)}</p>`:``}
        ${e.length?K`${Eh(`preventive`,e)}${Eh(`acute`,e)}`:K`<p class="empty section">${L(`treatment.empty`)}</p>`}
        <div class="section">
          ${X({label:L(`treatment.add`),iconName:`plus`,variant:e.length?`secondary`:`primary`,action:`add`,block:!0})}
        </div>
        <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`treatment.disclaimer`)}</span></p>`)},actions:{add(){a(`/treatment/new`)}}},Oh=20,kh=(e,t)=>t?K`<div class="fact"><dt>${e}</dt><dd>${t}</dd></div>`:``;function Ah(e){let t=[e.dose,e.effect?jp(e.effect):L(`treatment.effectMissing`),e.episodeId?L(`treatment.inEpisode`):``].filter(Boolean);return K`
    <li>
      <a class="entry" href="#/intake/${e.id}">
        <span class="entry__main">
          <span class="entry__title">${Wd(e.takenAt)}</span>
          <span class="entry__meta">${t.join(` · `)}</span>
        </span>
        ${q(`chevronRight`,{size:20})}
      </a>
    </li>`}var jh={render(e){let t=Gt(e.params.id);if(!t)return J({header:Y({back:`/treatment`}),body:K`<h1 class="screen-title" tabindex="-1">${L(`treatment.title`)}</h1>
          <p class="screen-lead">${L(`treatment.notFound`)}</p>`});let n=Zt(t.id),r=e.query.all===`1`,i=Sp.map(e=>({key:e,count:n.filter(t=>t.effect===e).length})).filter(e=>e.count);return J({header:Y({back:`/treatment`}),body:K`
        <div class="episode-head">
          <h1 class="screen-title" tabindex="-1">${t.name}</h1>
          ${Rd(L(`medications.types.${t.type}`),{neutral:!0})}
        </div>
        <dl class="facts">
          ${kh(L(`treatment.dose`),t.dose)}
          ${kh(L(`treatment.frequency`),t.frequency)}
          ${kh(L(`treatment.taken`),R(`plural.times`,n.length))}
        </dl>
        ${t.note?K`<p class="note-text section-sm">${t.note}</p>`:``}

        ${i.length?K`<section class="section" aria-labelledby="effect-title">
              <h2 class="section-title" id="effect-title">${L(`treatment.effectSummary`)}</h2>
              <ul class="sym-chips sym-chips--start">
                ${i.map(e=>K`<li class="sym-chip">${jp(e.key)} <strong>${R(`plural.times`,e.count)}</strong></li>`)}
              </ul>
            </section>`:``}

        <section class="section" aria-labelledby="history-title">
          <h2 class="section-title" id="history-title">${L(`treatment.history`)}</h2>
          ${n.length?K`<ul class="entries">${(r?n:n.slice(0,Oh)).map(Ah)}</ul>
                ${!r&&n.length>Oh?K`<button type="button" class="link-btn section-sm" id="show-all" data-action="showAll">
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
        <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`treatment.disclaimer`)}</span></p>`,footer:X({label:L(`treatment.logIntake`),iconName:`plus`,action:`logIntake`,block:!0})})},actions:{showAll(e,t){o(`/treatment/${t.params.id}?all=1`),t.rerender()},logIntake(e,t){a(`/treatment/${t.params.id}/intake`)},async delete(e,t){if(!await fp({title:L(`treatment.deleteTitle`),text:L(`treatment.deleteText`),confirmLabel:L(`treatment.delete`)}))return;let n=Yt(t.params.id);s(`/treatment`),Q(L(`treatment.deletedToast`),{actionLabel:L(`common.undo`),onAction:()=>{Xt(n),t.rerender()}})}}};function Mh(e,t){if(t===`edit`){let t=Qt(e.params.id);return{intake:t,medication:t?Gt(t.medicationId):null}}return{intake:null,medication:Gt(e.params.id)}}function Nh({mode:e}){return{render(t){let{intake:n,medication:r}=Mh(t,e),i=r?`/treatment/${r.id}`:`/treatment`;if(!r||e===`edit`&&!n)return J({header:Y({back:i}),body:K`<h1 class="screen-title" tabindex="-1">${L(`intake.title`)}</h1>
            <p class="screen-lead">${L(`intake.notFound`)}</p>`});let a=n?new Date(n.takenAt):new Date,o=n?A(a):t.query.date??A(a);return J({form:!0,header:Y({back:i}),body:K`
          <h1 class="screen-title" tabindex="-1">${L(n?`intake.editTitle`:`intake.title`)}</h1>
          <p class="screen-lead">${[r.name,r.dose].filter(Boolean).join(` · `)}</p>
          <div class="form-stack">
            <div class="field-row">
              ${Z({label:L(`intake.date`),name:`date`,type:`date`,value:o})}
              ${Z({label:L(`intake.time`),name:`time`,type:`time`,value:wt(a)})}
            </div>
            ${Z({label:L(`intake.dose`),name:`dose`,value:n?.dose??r.dose,optional:!0})}
            <fieldset class="form-section form-section--tight">
              <legend class="field__label">${L(`intake.effect`)}</legend>
              <p class="field__hint">${L(`intake.effectHint`)}</p>
              ${Nd({name:`effect`,legend:L(`intake.effect`),options:Sp.map(e=>({value:e,label:jp(e)})),selected:n?.effect})}
            </fieldset>
            ${Z({label:L(`intake.note`),name:`note`,value:n?.note??``,multiline:!0,optional:!0})}
          </div>`,footer:K`
          ${X({label:L(`intake.save`),type:`submit`,iconName:`check`,block:!0})}
          ${n?X({label:L(`intake.delete`),variant:`danger`,action:`delete`,block:!0}):``}`})},onSubmit(t,n){let{intake:r,medication:i}=Mh(n,e);if(!i)return;let a=new FormData(t),o=String(a.get(`date`)||A()),c={medicationId:i.id,takenAt:Tt(o,String(a.get(`time`)||wt())),dose:String(a.get(`dose`)??``),effect:a.get(`effect`),note:String(a.get(`note`)??``)};r?nn(r.id,c):tn(c),Q(L(`intake.saved`)),s(`/treatment/${i.id}`)},actions:{async delete(t,n){let{intake:r,medication:i}=Mh(n,e);if(!await fp({title:L(`intake.deleteTitle`),text:L(`intake.deleteText`),confirmLabel:L(`intake.delete`)}))return;let a=rn(r.id);s(`/treatment/${i.id}`),Q(L(`intake.deletedToast`),{actionLabel:L(`common.undo`),onAction:()=>{an(a),n.rerender()}})}}}}function Ph(e){let t=Jn(e);return{entries:t,count:t.symptomLogs.length+t.episodes.length,episode:t.episodes.length>0,symptoms:t.symptomLogs.length>0,period:t.period}}function Fh(){let e=new Date(2024,0,1),t=new Intl.DateTimeFormat(Or(),{weekday:`short`});return Array.from({length:7},(n,r)=>{let i=t.format(M(e,r)).replace(`.`,``);return i.charAt(0).toLocaleUpperCase(Or())+i.slice(1)})}function Ih(e,t,{isToday:n,isSelected:r}){let i=[Vd(j(e))];return n&&i.push(L(`calendar.today`)),t.episode&&i.push(L(`calendar.summaryEpisode`)),t.count&&i.push(L(`calendar.summaryEntries`,{n:t.count})),t.period&&i.push(L(`calendar.summaryPeriod`)),!t.count&&!t.period&&i.push(L(`calendar.summaryNone`)),r&&i.push(L(`calendar.selected`)),i.join(`, `)}function Lh(e,{inMonth:t,selectedKey:n,todayKey:r,cycleOn:i}){let a=Ph(e),o=e===r,s=e===n;return K`
    <button type="button" class="${[`cal-day`,t?``:`cal-day--outside`,a.episode?`cal-day--episode`:``,o?`cal-day--today`:``,s?`cal-day--selected`:``].filter(Boolean).join(` `)}" id="day-${e}" data-action="selectDay" data-day="${e}"
      aria-label="${Ih(e,a,{isToday:o,isSelected:s})}"${s?K` aria-pressed="true"`:K` aria-pressed="false"`}>
      <span class="cal-day__num" aria-hidden="true">${Number(e.slice(8))}</span>
      <span class="cal-day__marks" aria-hidden="true">${a.symptoms?K`<span class="cal-dot"></span>`:``}</span>
      ${i&&a.period?K`<span class="cal-period" aria-hidden="true"></span>`:``}
    </button>`}function Rh(e,t,n){let r=kt(e),i=(r.getDay()+6)%7,a=M(r,-i),o=A(),s=Math.ceil((i+new Date(r.getFullYear(),r.getMonth()+1,0).getDate())/7),c=Array.from({length:s*7},(e,t)=>A(M(a,t)));return K`
    <div class="cal">
      <div class="cal-weekdays" aria-hidden="true">${Fh().map(e=>K`<span>${e}</span>`)}</div>
      <div class="cal-grid">
        ${c.map(r=>Lh(r,{inMonth:r.startsWith(e),selectedKey:t,todayKey:o,cycleOn:n}))}
      </div>
    </div>`}function zh(e,t){let{entries:n,count:r}=Ph(e),i=r+n.intakes.length>0||!!n.sleep,a=e>A();return K`
    <section class="section cal-detail" aria-labelledby="day-title">
      <h2 class="section-title" id="day-title">${Vd(j(e))}</h2>
      ${gf(e)}
      ${i?Hp(n):K`<p class="empty">${L(`calendar.dayEmpty`)}</p>`}
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
    </section>`}var Bh={render(e){let t=A(),n=e.query.day??t,r=e.query.month??n.slice(0,7),i=F().cycleTracking===!0,a=r===Ot();return Ed(`calendar`,K`
        ${Md(L(`calendar.title`))}
        <div class="cal-head">
          <button type="button" class="icon-btn" id="cal-prev" data-action="month" data-month="${At(r,-1)}" aria-label="${L(`calendar.prev`)}">
            ${q(`chevronLeft`)}
          </button>
          <h2 class="cal-head__title" aria-live="polite">${Kd(kt(r))}</h2>
          <button type="button" class="icon-btn" id="cal-next" data-action="month" data-month="${At(r,1)}" aria-label="${L(`calendar.next`)}">
            ${q(`chevronRight`)}
          </button>
        </div>
        ${a?``:K`<button type="button" class="link-btn cal-today-link" data-action="goToday">${L(`calendar.backToday`)}</button>`}
        ${Rh(r,n,i)}
        <ul class="cal-legend" aria-label="${L(`calendar.legend`)}">
          <li><span class="cal-legend__mark cal-legend__mark--episode" aria-hidden="true"></span>${L(`calendar.legendEpisode`)}</li>
          <li><span class="cal-legend__mark" aria-hidden="true"><span class="cal-dot"></span></span>${L(`calendar.legendSymptoms`)}</li>
          ${i?K`<li><span class="cal-legend__mark" aria-hidden="true"><span class="cal-period cal-period--legend"></span></span>${L(`calendar.legendPeriod`)}</li>`:``}
        </ul>
        ${zh(n,i)}`)},onChange(e,t){e.name===`period`&&(En(e.dataset.day),t.rerender())},actions:{month(e,t){let n=t.query.day;o(`/calendar?month=${e.dataset.month}${n?`&day=${n}`:``}`),t.rerender()},goToday(e,t){o(`/calendar`),t.rerender(),document.getElementById(`day-${A()}`)?.focus()},selectDay(e,t){let n=e.dataset.day;o(`/calendar?month=${n.slice(0,7)}&day=${n}`),t.rerender(),document.getElementById(`day-title`)?.scrollIntoView({block:`nearest`})},addSymptom(e){em({date:e.dataset.day}),a(`/log/symptoms`)},addSleep(e){a(`/sleep?date=${e.dataset.day}`)}}},Vh=[30,60,90];function Hh(e,t){let n=Math.max(...e.map(e=>e.count),1);return K`
    <ul class="bars">
      ${e.map(e=>K`
          <li class="bars__row">
            <span class="bars__label">${t(e.key)}</span>
            <span class="bars__value">${R(`plural.times`,e.count)}</span>
            <span class="bars__track" aria-hidden="true"><span class="bars__fill" style="width:${Math.max(e.count/n*100,4)}%"></span></span>
          </li>`)}
    </ul>`}var Uh=(e,t,{empty:n=!1}={})=>K`
  <div class="stat">
    <span class="stat__value ${n?`stat__value--empty`:``}">${t}</span>
    <span class="stat__label">${e}</span>
  </div>`,Wh={render(e){let t=Vh.includes(Number(e.query.days))?Number(e.query.days):30,n=Fu(Mu(t)),r=L(`insights.noValue`),i=K`
      ${Md(L(`insights.title`))}
      <div class="insights-period">
        ${Pd({name:`days`,legend:L(`insights.periodLabel`),selected:String(t),options:Vh.map(e=>({value:String(e),label:R(`plural.days`,e)}))})}
      </div>`;return!n.recordCount&&!n.intakes.length&&!n.sleeps.length?Ed(`insights`,K`${i}
          <div class="coming">
            ${Gf({symbol:`chart`,size:200})}
            <p class="muted">${L(`insights.empty`)}</p>
          </div>
          ${X({label:L(`insights.report`),iconName:`fileText`,variant:`secondary`,action:`report`,block:!0})}
          ${hf()}`):Ed(`insights`,K`${i}
        <section class="section" aria-labelledby="ov-title">
          <h2 class="section-title" id="ov-title">${L(`insights.overview`)}</h2>
          <div class="stats">
            ${Uh(L(`insights.symptomDays`),n.symptomDays)}
            ${Uh(L(`insights.episodes`),n.episodeCount)}
            ${Uh(L(`insights.avgIntensity`),n.avgIntensity==null?r:qd(n.avgIntensity),{empty:n.avgIntensity==null})}
            ${Uh(L(`insights.avgDuration`),n.avgDurationMinutes==null?r:Yd(n.avgDurationMinutes),{empty:n.avgDurationMinutes==null})}
          </div>
        </section>

        ${hf()}

        <section class="section" aria-labelledby="sym-title">
          <h2 class="section-title" id="sym-title">${L(`insights.topSymptoms`)}</h2>
          <p class="muted small">${L(`insights.topSymptomsLead`)}</p>
          ${n.symptoms.length?Hh(n.symptoms.slice(0,6),Ep):K`<p class="muted">${L(`insights.empty`)}</p>`}
        </section>

        <section class="section" aria-labelledby="trig-title">
          <h2 class="section-title" id="trig-title">${L(`insights.topTriggers`)}</h2>
          ${n.triggers.length?Hh(n.triggers.slice(0,6),Mp):K`<p class="muted">${L(`insights.triggersEmpty`)}</p>`}
        </section>

        <section class="section" aria-labelledby="sleep-title">
          <h2 class="section-title" id="sleep-title">${L(`sleep.title`)}</h2>
          ${n.sleeps.length?K`<div class="stats">
                  ${Uh(L(`sleep.avg`),Yd(n.avgSleepMinutes))}
                  ${Uh(L(`sleep.nights`),n.sleeps.length)}
                </div>
                ${n.sleepQuality.length?Hh(n.sleepQuality,Ip):``}`:K`<p class="muted">${L(`report.sleepNone`)}</p>`}
        </section>

        <section class="section" aria-labelledby="meds-title">
          <h2 class="section-title" id="meds-title">${L(`insights.meds`)}</h2>
          ${n.meds.length?K`<ul class="med-stats">
                ${n.meds.map(e=>K`
                    <li class="med-stats__row">
                      <a href="#/treatment/${e.medication.id}" class="med-stats__name">${e.medication.name}</a>
                      <span class="med-stats__count">${R(`plural.times`,e.count)}</span>
                      ${e.effects.length?K`<span class="med-stats__effects">${e.effects.map(e=>`${jp(e.key)} ${R(`plural.times`,e.count)}`).join(` · `)}</span>`:``}
                    </li>`)}
              </ul>`:K`<p class="muted">${L(`insights.medsEmpty`)}</p>`}
        </section>

        <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`insights.interpretation`)}</span></p>
        <div class="section">
          ${X({label:L(`insights.report`),iconName:`fileText`,action:`report`,block:!0})}
        </div>`)},onChange(e,t){e.name===`days`&&(o(`/insights?days=${e.value}`),t.rerender())},actions:{report(e,t){a(`/report?days=${t.query.days??30}`)}}},Gh={render(e){let t=Vh.includes(Number(e.query.days))?String(e.query.days):`30`,n=Mu(30);return J({form:!0,header:Y({back:`/insights`}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`report.title`)}</h1>
        <p class="screen-lead">${L(`report.lead`)}</p>
        <div class="step-options">
          ${Nd({name:`range`,legend:L(`report.period`),options:[...Vh.map(e=>({value:String(e),label:R(`plural.days`,e)})),{value:`custom`,label:L(`report.custom`)}],selected:t})}
        </div>
        <!-- Zobrazí sa iba pri „Vlastné obdobie“ (CSS :has) -->
        <div class="report-custom field-row">
          ${Z({label:L(`report.from`),name:`from`,type:`date`,value:n.from})}
          ${Z({label:L(`report.to`),name:`to`,type:`date`,value:n.to})}
        </div>
        ${I()?``:K`<a class="report-plus-hint" href="#/plus?from=report">
              ${q(`lock`,{size:16})}<span>${L(`report.plusHint`)}</span>
            </a>`}`,footer:X({label:L(`report.create`),type:`submit`,iconName:`fileText`,block:!0})})},onSubmit(e){let t=new FormData(e),n=t.get(`range`),r,i;if(n===`custom`){if(r=String(t.get(`from`)||``),i=String(t.get(`to`)||A()),!r||r>i){Fd(e,`from`,L(`report.invalidRange`));return}}else({from:r,to:i}=Mu(Number(n)));a(`/report/view?from=${r}&to=${i}`)}},Kh=5;function qh({from:e,to:t}){if(!I())return``;let{weather:n,health:r}=F(),i=hd({from:e,to:t}),a=nd({days:365}),o=a.enough?a.factors.filter(e=>e.strength===`strong`||e.strength===`possible`):[];return K`
    ${n.enabled&&i.rows.length?K`<section>
          <h3>${L(`report.weather`)}</h3>
          <p>${L(`report.weatherSummary`,{drops:i.drops,total:i.rows.length})}</p>
          <table class="report-table">
            <thead><tr><th>${L(`plus.weather.colDay`)}</th><th>${L(`plus.weather.colPressure`)}</th><th>${L(`plus.weather.colChange`)}</th><th>${L(`plus.weather.condition`)}</th></tr></thead>
            <tbody>
              ${i.rows.map(e=>K`<tr>
                  <td>${Gd(e.episode.startedAt)}</td>
                  <td>${nf(e.weather.pressure)}${bl(e.weather)?` (${L(`plus.weather.estimateWord`)})`:``}</td>
                  <td>${e.weather.pressureChange==null?`–`:of(e.weather.pressureChange)}</td>
                  <td>${cf(e.weather.condition)}</td>
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
    ${r.connected&&(i.avgSteps!=null||i.workoutTracked)?K`<section>
          <h3>${L(`report.activity`)}</h3>
          <table class="report-table">
            <tbody>
              ${i.avgSteps==null?``:K`<tr><td>${L(`report.avgSteps`)}</td><td class="num">${lf(i.avgSteps)}</td></tr>`}
              ${i.workoutTracked?K`<tr><td>${L(`report.workoutDays`)}</td><td class="num">${L(`report.workoutDaysValue`,{a:i.workoutDays,b:i.workoutTracked})}</td></tr>`:``}
              ${i.workoutTypes.length?K`<tr><td>${L(`report.workoutTypes`)}</td><td>${i.workoutTypes.map(e=>`${L(`plus.health.workouts.${e.key}`)} ${R(`plural.times`,e.count)}`).join(`, `)}</td></tr>`:``}
            </tbody>
          </table>
        </section>`:``}`}function Jh(e,t){return e.length?K`
    <table class="report-table">
      <tbody>
        ${e.map(e=>K`<tr><td>${t(e.key)}</td><td class="num">${R(`plural.times`,e.count)}</td></tr>`)}
      </tbody>
    </table>`:K`<p class="report-none">${L(`report.none`)}</p>`}function Yh(e){let t=[...e.logs.map(e=>{let t=dn(e);return{at:e.occurredAt,entry:L(`symptomLog.title`),detail:[kp(e),t==null?``:L(`intensity.highest`,{value:Op(t)}),e.duration?Ap(e.duration):``].filter(Boolean).join(` · `)}}),...e.episodes.map(e=>({at:e.startedAt,entry:L(`episode.title`),detail:e.endedAt?`${Wd(e.startedAt)} – ${Wd(e.endedAt)}`:L(`episode.statusOngoing`)})),...e.intakes.filter(e=>Gt(e.medicationId)?.type===`acute`||e.effect||e.episodeId).map(e=>({at:e.takenAt,entry:Gt(e.medicationId)?.name??L(`today.intakeTitle`),detail:[e.dose,e.effect?jp(e.effect):``].filter(Boolean).join(` · `)})),...e.sleeps.map(e=>({at:e.wakeTime??Tt(e.date,`06:00`),dateOnly:!0,entry:L(`sleep.title`),detail:[Yd(e.minutes),e.quality?Ip(e.quality):``].filter(Boolean).join(` · `)}))].sort((e,t)=>e.at.localeCompare(t.at));return t.length?K`
    <table class="report-table report-table--timeline">
      <thead><tr><th>${L(`report.colDate`)}</th><th>${L(`report.colEntry`)}</th><th>${L(`report.colDetail`)}</th></tr></thead>
      <tbody>${t.map(e=>K`<tr><td>${e.dateOnly?Gd(e.at):Wd(e.at)}</td><td>${e.entry}</td><td>${e.detail}</td></tr>`)}</tbody>
    </table>`:K`<p class="report-none">${L(`report.none`)}</p>`}var Xh={render(e){let t=e.query.from??A(),n=e.query.to??A(),r=Fu({from:t,to:n}),i=F().cycleTracking===!0,a=r.logs.filter(e=>e.note),o=L(`insights.noValue`);return J({variant:`screen--report`,header:Y({back:`/insights`}),body:K`
        <h1 class="visually-hidden" tabindex="-1">${L(`report.title`)}</h1>
        <p class="report-hint">${L(`report.printHint`)}</p>
        <article class="report-doc">
          <header class="report-doc__head">
            <p class="report-doc__app">${L(`app.name`)}</p>
            <h2 class="report-doc__title screen-title" tabindex="-1">${L(`report.docTitle`)}</h2>
            <dl class="report-meta">
              <div><dt>${L(`report.period`)}</dt><dd>${Gd(j(t))} – ${Gd(j(n))}</dd></div>
              <div><dt>${L(`report.created`)}</dt><dd>${Gd(new Date)}</dd></div>
            </dl>
            <p class="report-disclaimer">${L(`report.disclaimer`)}</p>
            ${r.recordCount<Kh?K`<p class="report-warning">${L(`report.fewData`)}</p>`:``}
          </header>

          <section>
            <h3>${L(`report.summary`)}</h3>
            <table class="report-table">
              <tbody>
                <tr><td>${L(`insights.symptomDays`)}</td><td class="num">${r.symptomDays}</td></tr>
                <tr><td>${L(`insights.episodes`)}</td><td class="num">${r.episodeCount}</td></tr>
                <tr><td>${L(`insights.avgIntensity`)}</td><td class="num">${r.avgIntensity==null?o:qd(r.avgIntensity)}</td></tr>
                <tr><td>${L(`insights.avgDuration`)}</td><td class="num">${r.avgDurationMinutes==null?o:Yd(r.avgDurationMinutes)}</td></tr>
              </tbody>
            </table>
          </section>

          <section>
            <h3>${L(`report.symptoms`)}</h3>
            ${Jh(r.symptoms,Ep)}
          </section>

          <section>
            <h3>${L(`report.triggers`)}</h3>
            ${Jh(r.triggers,Mp)}
          </section>

          <section>
            <h3>${L(`report.meds`)}</h3>
            ${r.meds.length?K`<table class="report-table">
                  <tbody>
                    ${r.meds.map(e=>K`<tr>
                        <td>${[e.medication.name,e.medication.dose].filter(Boolean).join(` `)}<br /><span class="report-sub">${L(`medications.types.${e.medication.type}`)}</span></td>
                        <td class="num">${R(`plural.times`,e.count)}</td>
                        <td>${e.effects.map(e=>`${jp(e.key)} ${R(`plural.times`,e.count)}`).join(`, `)||L(`treatment.effectMissing`)}</td>
                      </tr>`)}
                  </tbody>
                </table>`:K`<p class="report-none">${L(`report.none`)}</p>`}
          </section>

          <section>
            <h3>${L(`report.sleep`)}</h3>
            ${r.sleeps.length?K`<table class="report-table">
                  <tbody>
                    <tr><td>${L(`sleep.avg`)}</td><td class="num">${Yd(r.avgSleepMinutes)}</td></tr>
                    <tr><td>${L(`sleep.nights`)}</td><td class="num">${r.sleeps.length}</td></tr>
                    ${r.sleepQuality.map(e=>K`<tr><td>${L(`report.sleepQuality`)}: ${Ip(e.key)}</td><td class="num">${R(`plural.times`,e.count)}</td></tr>`)}
                  </tbody>
                </table>`:K`<p class="report-none">${L(`report.sleepNone`)}</p>`}
          </section>

          ${i?K`<section>
                <h3>${L(`report.cycle`)}</h3>
                <p>${L(`report.cycleDays`)}: <strong>${r.periodDays}</strong></p>
              </section>`:``}

          ${qh({from:t,to:n})}

          ${a.length?K`<section>
                <h3>${L(`report.notes`)}</h3>
                <ul class="report-notes">
                  ${a.map(e=>K`<li><strong>${Wd(e.occurredAt)}:</strong> ${e.note}</li>`)}
                </ul>
              </section>`:``}

          <section>
            <h3>${L(`report.timeline`)}</h3>
            ${Yh(r)}
          </section>
        </article>`,footer:X({label:L(`report.print`),iconName:`printer`,action:`print`,block:!0})})},actions:{print(){tl(()=>Re(`${L(`app.name`)} ${A()}`))}}},Zh=[`good`,`fair`,`poor`],Qh=Array.from({length:17},(e,t)=>t),$h=Array.from({length:12},(e,t)=>t*5);function eg({name:e,label:t,values:n,selected:r,suffix:i=``}){return K`
    <div class="field">
      <label class="field__label" for="f-${e}">${t}</label>
      <select class="field__input" id="f-${e}" name="${e}" aria-describedby="f-${e}-error">
        ${n.map(e=>K`<option value="${e}"${e===r?K` selected`:``}>${e}${i}</option>`)}
      </select>
    </div>`}var tg={render(e){let t=e.query.date??A(),n=Dn(t),r=n?Math.floor(n.minutes/60):7,i=n?Math.min(55,Math.round(n.minutes%60/5)*5):0;return J({form:!0,header:Y({back:`/today`}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`sleep.formTitle`)}</h1>
        <p class="screen-lead">${L(`sleep.lead`)}</p>
        <div class="form-stack">
          ${Z({label:L(`sleep.date`),name:`date`,type:`date`,value:t})}
          <fieldset class="form-section form-section--tight">
            <legend class="field__label">${L(`sleep.duration`)}</legend>
            <div class="field-row">
              ${eg({name:`hours`,label:L(`sleep.hours`),values:Qh,selected:r,suffix:` h`})}
              ${eg({name:`minutes`,label:L(`sleep.minutes`),values:$h,selected:i,suffix:` min`})}
            </div>
            <p class="field__error" id="f-hours-error" hidden></p>
          </fieldset>
          <fieldset class="form-section form-section--tight">
            <legend class="field__label">${L(`sleep.quality`)} <span class="field__optional">(${L(`common.optional`)})</span></legend>
            ${Nd({name:`quality`,legend:L(`sleep.quality`),options:Zh.map(e=>({value:e,label:L(`sleep.qualities.${e}`)})),selected:n?.quality})}
          </fieldset>
          ${Z({label:L(`sleep.note`),name:`note`,value:n?.note??``,multiline:!0,optional:!0})}
        </div>`,footer:K`
        ${X({label:L(`sleep.save`),type:`submit`,iconName:`check`,block:!0})}
        ${n?X({label:L(`sleep.delete`),variant:`danger`,action:`delete`,block:!0}):``}`})},onSubmit(e){let t=new FormData(e),n=Number(t.get(`hours`))*60+Number(t.get(`minutes`));n<=0?Fd(e,`hours`,L(`sleep.durationRequired`)):(On({date:String(t.get(`date`)||A()),minutes:n,quality:t.get(`quality`),note:String(t.get(`note`)??``)}),Q(L(`sleep.saved`)),s(`/today`))},actions:{async delete(e,t){let n=t.query.date??A();if(!await fp({title:L(`sleep.deleteTitle`),text:L(`sleep.deleteText`),confirmLabel:L(`sleep.delete`)}))return;let r=kn(n);s(`/today`),Q(L(`sleep.deletedToast`),{actionLabel:L(`common.undo`),onAction:()=>{An(r),t.rerender()}})}}},ng=`2026-11`,rg=[`controller`,`data`,`storage`,`weather`,`health`,`purchases`,`links`,`purpose`,`legal`,`retention`,`rights`,`contact`,`security`,`backup`,`age`,`changes`],ig=`2026-11`,ag=[`provider`,`app`,`health`,`use`,`plus`,`payment`,`cancel`,`withdrawal`,`data`,`services`,`liability`,`changes`,`complaints`,`law`];function og(){let e=F().consent;return!!e?.healthDataAt&&e.policyVersion===`2026-11`}var sg=[[`smartphone`,`consent.factDevice`],[`shield`,`consent.factNoServer`],[`lock`,`consent.factPin`],[`download`,`consent.factControl`]];function cg(){let e=document.querySelectorAll(`input[name="consent"]:checked`).length;document.getElementById(`consent-submit`).disabled=e<2}function lg({onboarding:e}){let t=`/start/privacy`;return{render(){let n=og(),r=!n&&!!F().consent?.healthDataAt,i=e?Yf(t):null;return J({form:!0,header:e?Y({back:i.prev,step:i.step,total:i.total}):``,variant:e?``:`screen--tab`,body:K`
          <h1 class="screen-title" tabindex="-1">${L(`consent.title`)}</h1>
          <p class="screen-lead">${L(r?`consent.updatedLead`:`consent.lead`)}</p>
          <ul class="facts-list">
            ${sg.map(([e,t])=>K`<li>${q(e,{size:22})}<span>${L(t)}</span></li>`)}
          </ul>
          <div class="step-options">
            ${Nd({name:`consent`,type:`checkbox`,legend:L(`consent.title`),options:[{value:`health`,label:L(`consent.health`)},{value:`age`,label:L(`consent.age`)}],selected:n?[`health`,`age`]:[]})}
          </div>
          <p class="section-sm"><a href="#/privacy-policy">${L(`consent.policyLink`)}</a></p>`,footer:K`
          ${X({label:L(`consent.submit`),type:`submit`,id:`consent-submit`,disabled:!n,block:!0})}
          ${e?``:X({label:L(`consent.decline`),variant:`ghost`,action:`decline`,block:!0})}`})},actions:{async decline(){let e=await dp({title:L(`consent.declineTitle`),text:L(`consent.declineText`),choices:[{value:`export`,label:L(`privacy.export`)},{value:`erase`,label:L(`profile.deleteAll`),variant:`outline`}]});if(e===`export`)try{await $m()&&Q(L(`privacy.exportDone`))}catch(e){console.error(`[consent] Export sa nepodaril`,e),Q(L(`privacy.exportFailed`))}e===`erase`&&await eh({title:L(`profile.deleteAllTitle`),text:L(`profile.deleteAllText`),confirmLabel:L(`profile.deleteAllConfirm`),offerBackup:!1})}},onChange(e){e.name===`consent`&&cg()},onSubmit(n){let r=new FormData(n).getAll(`consent`);if(!r.includes(`health`)||!r.includes(`age`))return;let i=new Date().toISOString();Vt({consent:{healthDataAt:i,ageConfirmedAt:i,policyVersion:ng}}),a(e?Yf(t).next:`/today`,{replace:!e})}}}function ug({key:e,sections:t,version:n}){return{render(){return J({header:Y({back:`/profile`}),body:K`
          <h1 class="screen-title" tabindex="-1">${L(`${e}.title`)}</h1>
          <p class="screen-lead">${Rd(L(`${e}.draft`),{neutral:!0})} ${L(`${e}.version`,{version:n})}</p>
          <p class="field__hint section-sm">${L(`${e}.draftNote`)}</p>
          <div class="policy">
            ${t.map(t=>K`
                <section>
                  <h2 class="section-title">${L(`${e}.${t}Title`)}</h2>
                  <p>${L(`${e}.${t}Text`)}</p>
                </section>`)}
          </div>`})}}}var dg=`/start/profile`,fg={render(){let{step:e,total:t,prev:n}=Yf(dg);return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`profileSetup.title`)}</h1>
        <p class="screen-lead">${L(`profileSetup.lead`)}</p>
        <div class="form-stack">
          ${Z({label:L(`profileSetup.nameLabel`),name:`name`,value:F().name,placeholder:L(`profileSetup.namePlaceholder`),hint:L(`profileSetup.nameHint`),autocomplete:`given-name`,maxlength:40})}
          <div class="card card--accent pin-offer">
            <div class="pin-offer__head">${q(`lock`,{size:22})}<h2 class="card__title">${L(`profileSetup.pinTitle`)}</h2></div>
            <p class="muted">${L(at()?`profileSetup.pinAlready`:`profileSetup.pinText`)}</p>
          </div>
        </div>`,footer:X({label:L(`common.continue`),type:`submit`,block:!0})})},onSubmit(e){let t=String(new FormData(e).get(`name`)??``).trim();Vt({name:t,nameSetAt:t?new Date().toISOString():null});let n=Yf(dg).next;at()?a(n):a(`/security/pin?mode=set&next=${encodeURIComponent(n)}`)}};function pg(){return K`
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
    </div>`}function mg({onComplete:e}){let t=``,n=!1;function r(){let e=document.getElementById(`pin-dots`);e&&([...e.children].forEach((e,n)=>e.classList.toggle(`is-filled`,n<t.length)),e.setAttribute(`aria-label`,L(`pin.progress`,{n:t.length,total:6})))}let i={async digit(a){if(!(n||t.length>=6)&&(t+=a,r(),t.length===6)){let a=t;n=!0,i.setDisabled(!0);try{await e(a)}finally{n=!1,t=``,r(),i.setDisabled(!1)}}},backspace(){n||(t=t.slice(0,-1),r())},status(e,{error:t=!1}={}){let n=document.getElementById(`pin-status`);n&&(n.textContent=e??``,n.classList.toggle(`pin__status--error`,t))},setDisabled(e){document.querySelectorAll(`.pinpad__key`).forEach(t=>{t.disabled=e})},listenToKeyboard(){let e=e=>{/^[0-9]$/.test(e.key)?i.digit(e.key):e.key===`Backspace`&&i.backspace()};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)}};return i}function hg(e,t){let n=Math.ceil((e-Date.now())/1e3);return n<=120?L(`pin.blockedSeconds`,{n:Math.max(n,1)}):L(`pin.blocked`,{time:t(e)})}function gg(e){if(/^(\d)\1+$/.test(e))return!0;let t=[...e].slice(1).map((t,n)=>Number(t)-Number(e[n]));return t.every(e=>e===1)||t.every(e=>e===-1)}var _g={set:`new`,change:`current`,disable:`current`},vg=null,yg=null;function bg(){return L(`pin.prompt.${vg.step}`)}function xg(){let e=document.querySelector(`.pin-setup__prompt`);e&&(e.textContent=bg())}function Sg(e){return e?.blockedUntil?hg(e.blockedUntil,Hd):L(`pin.wrong`)}var Cg={render(e){let t=[`set`,`change`,`disable`].includes(e.query.mode)?e.query.mode:`set`;return vg={mode:t,step:_g[t],first:null},J({variant:`screen--pin`,header:Y({back:e.query.next?`/start/profile`:`/profile`}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`pin.title.${t}`)}</h1>
        ${t===`set`?K`<p class="screen-lead">${L(`pin.setLead`)}</p>`:``}
        <p class="pin-setup__prompt">${bg()}</p>
        ${pg()}`})},mount(e,t){return yg=mg({onComplete:async e=>{if(yg.status(``),vg.step===`current`){yg.status(L(`pin.checking`));try{await _t(e)}catch(e){yg.status(Sg(e),{error:!0});return}if(vg.mode===`disable`){await bt(qn()),Q(L(`pin.disabled`)),s(`/profile`);return}vg.step=`new`,yg.status(``),xg()}else if(vg.step===`new`){if(gg(e)){yg.status(L(`pin.weak`),{error:!0});return}vg.first=e,vg.step=`confirm`,xg()}else e===vg.first?(yg.status(L(`pin.saving`)),vg.mode===`set`?await vt(e,qn(),{language:F().language,theme:F().theme}):await yt(e),Q(L(vg.mode===`set`?`pin.enabled`:`pin.changed`)),t.query.logout?ol():t.query.next?a(t.query.next,{replace:!0}):s(`/profile`)):(vg.step=`new`,vg.first=null,xg(),yg.status(L(`pin.mismatch`),{error:!0}))}}),yg.listenToKeyboard()},actions:{pinDigit(e){yg?.digit(e.dataset.digit)},pinBackspace(){yg?.backspace()}}},wg=null;function Tg(){let e=ut();return e>Date.now()&&(wg.setDisabled(!0),wg.status(hg(e,Hd),{error:!0}),!0)}var Eg={render(){return J({variant:`screen--pin screen--lock`,body:K`
        <div class="lock">
          ${Wf()}
          <h1 class="screen-title lock__title" tabindex="-1">${L(`lock.title`)}</h1>
          <p class="pin-setup__prompt">${L(`lock.lead`)}</p>
          ${pg()}
          <button type="button" class="link-btn lock__forgot" data-action="forgot">${L(`lock.forgot`)}</button>
        </div>`})},mount(){wg=mg({onComplete:async e=>{wg.status(L(`pin.checking`));try{let t=await gt(e);wg.status(``),nl(t),a(cl(),{replace:!0})}catch(e){e?.code===`blocked`||e?.blockedUntil?wg.status(hg(e.blockedUntil,Hd),{error:!0}):wg.status(L(`pin.wrong`),{error:!0})}}});let e=Tg(),t=setInterval(()=>{let t=Tg();!t&&e&&(wg.setDisabled(!1),wg.status(``)),e=t},1e3),n=wg.listenToKeyboard();return()=>{clearInterval(t),n()}},actions:{pinDigit(e){ut()<=Date.now()&&wg?.digit(e.dataset.digit)},pinBackspace(){wg?.backspace()},async forgot(){await fp({title:L(`lock.forgotTitle`),text:L(`lock.forgotText`),confirmLabel:L(`lock.forgotConfirm`)})&&(Rf(),Ve(),St(),It(),a(`/start/language`,{replace:!0}))}}},Dg=su[0],Og=`idle`,kg=e=>e.price??Jd(e.amount,e.currency);function Ag(e){let t=e?.trial?e.trialPeriod:null;return t?R(`plural.${t.unit}s`,t.count):null}function jg(e){let t=bu()?.[e];if(!t)return L(Og===`failed`?`plus.paywall.retryPrices`:`plus.paywall.loadingPrices`);let n=Ag(t);return n?L(`plus.plans.${e}.cta`,{trial:n}):L(`plus.plans.${e}.ctaNoTrial`,{price:kg(t)})}function Mg(e){let t=bu()?.[e];if(!t)return Og===`failed`?L(`plus.paywall.pricesFailed`):``;let n=Ag(t);return L(`plus.plans.${e}.${n?`terms`:`termsNoTrial`}`,{trial:n,price:kg(t),store:mu()})}function Ng(e){let t=bu()?.[e];if(t?.amount==null)return``;let n=e===`yearly`?Jd(t.amount/12,t.currency):null,r=Ag(t);return L(`plus.plans.${e}.${r?`hint`:`hintNoTrial`}`,{monthly:n,trial:r})}function Pg(){let{yearly:e,monthly:t}=bu()??{};if(!e?.amount||!t?.amount||e.currency!==t.currency)return null;let n=Math.floor((1-e.amount/(t.amount*12))*100);return n>0?n:null}function Fg(e,t){let n=bu()?.[e],r=e===`yearly`?Pg():null;return K`
    <label class="option option--radio plan">
      <input type="radio" name="plan" value="${e}" id="plan-${e}"${t?K` checked`:``} />
      <span class="option__control">${q(`check`,{size:16,strokeWidth:3})}</span>
      <span class="plan__text">
        <span class="plan__name">${L(`plus.plans.${e}.name`)}${r?Rd(L(`plus.plans.yearly.badge`,{percent:r})):``}</span>
        <span class="plan__hint">${Ng(e)}</span>
      </span>
      <!-- Pri sume je vždy obdobie, aby ročná cena nevyzerala ako mesačná (pravidlá Google Play o predplatnom). -->
      <span class="plan__price">${n?K`${kg(n)}<span class="plan__per">${L(`plus.plans.${e}.per`)}</span>`:``}</span>
    </label>`}function Ig(e){let t=Zd.includes(e.query.from)?e.query.from:null,n=t?[t,...Zd.filter(e=>e!==t)]:Zd;return J({variant:`screen--paywall`,form:!0,header:Y({back:`/today`}),body:K`
      <p class="plus-mark" aria-hidden="true">${L(`app.name`)}<span>+</span></p>
      <h1 class="screen-title" tabindex="-1">${L(`plus.paywall.title`)}</h1>
      <p class="screen-lead">${L(`plus.paywall.lead`)}</p>

      <ul class="plus-features">
        ${n.map(e=>K`
            <li class="plus-feature">
              ${zd(Qd[e])}
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
          ${su.map(e=>Fg(e,e===Dg))}
        </fieldset>
        <p class="plus-note">${L(`plus.paywall.renewal`,{store:mu()})}</p>
        <!-- Poučenie o odstúpení pred nákupom (§ 15 zákona č. 108/2024 Z. z.), podrobnosti sú v podmienkach. -->
        <p class="plus-note">${L(`plus.paywall.withdrawal`)}</p>
      </section>

      <section class="plus-free" aria-labelledby="free-title">
        <h2 class="section-title" id="free-title">${L(`plus.paywall.freeTitle`)}</h2>
        <p class="muted">${L(`plus.paywall.freeText`)}</p>
      </section>

      ${K`<p class="plus-demo">${Rd(L(`plus.demoChip`),{neutral:!0})}<span>${L(`plus.paywall.demoNote`)}</span></p>`}

      <div class="plus-links">
        <button type="button" class="link-btn" data-action="restore">${L(`plus.paywall.restore`)}</button>
        <a class="link-btn" href="#/terms">${L(`terms.title`)}</a>
        <a class="link-btn" href="#/privacy-policy">${L(`privacyPolicy.title`)}</a>
      </div>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`plus.paywall.disclaimer`)}</span></p>`,footer:K`
      <p class="plus-terms" id="plus-terms" aria-live="polite">${Mg(Dg)}</p>
      ${X({label:jg(Dg),action:bu()||Og!==`failed`?`buy`:`retryPrices`,id:`plus-buy`,block:!0,disabled:!bu()&&Og!==`failed`})}
      ${X({label:L(`plus.paywall.notNow`),variant:`ghost`,action:`notNow`,block:!0})}`})}function Lg(e){let{plus:t}=F(),n=e.query.welcome===`1`;return J({header:Y({back:`/profile`}),body:K`
      <h1 class="screen-title" tabindex="-1">${L(n?`plus.manage.welcomeTitle`:`plus.manage.title`)}</h1>
      <p class="screen-lead">${L(n?`plus.manage.welcomeLead`:`plus.manage.lead`)}</p>

      <section class="section" aria-labelledby="features-title">
        <h2 class="section-title" id="features-title">${L(`plus.manage.features`)}</h2>
        <div class="list">${Zd.map(e=>pf(e,{status:mf(e)}))}</div>
      </section>

      <section class="section" aria-labelledby="sub-title">
        <h2 class="section-title" id="sub-title">${L(`plus.manage.subscription`)}</h2>
        <div class="list">
          <div class="list__row">
            ${q(`sparkles`)}
            <span class="list__text">
              <!-- Plán je známy iba z nákupu v tomto telefóne; po obnovení nákupu ho obchod neprezradí. -->
              <span class="list__label">${t.plan?L(`plus.plans.${t.plan}.name`):L(`plus.name`)}${t.plan&&bu()?.[t.plan]?` · ${kg(bu()[t.plan])}`:``}</span>
              <span class="list__hint">${Pn()?L(`plus.manage.trialUntil`,{date:Gd(Pn())}):L(`plus.manage.since`,{date:Gd(t.startedAt)})}</span>
            </span>
            ${t.simulated?Rd(L(`plus.demoChip`),{neutral:!0}):``}
          </div>
          <button type="button" class="list__row" data-action="cancel">
            ${q(`x`)}
            <span class="list__text">
              <span class="list__label">${L(pu()?`plus.manage.manageStore`:`plus.manage.cancel`)}</span>
              <span class="list__hint">${L(pu()?`plus.manage.manageStoreHint`:`plus.manage.cancelHint`)}</span>
            </span>
          </button>
          <!-- Funkcia na odstúpenie od zmluvy musí byť zreteľne a nepretržite dostupná počas celej lehoty (§ 20a zákona č. 108/2024 Z. z.). -->
          ${Fn()?K`<a class="list__row" href="#/plus/withdraw">
                ${q(`undo`)}
                <span class="list__text">
                  <span class="list__label">${L(`plus.withdraw.row`)}</span>
                  <span class="list__hint">${L(`plus.withdraw.rowHint`,{date:Gd(Fn())})}</span>
                </span>
                ${q(`chevronRight`,{size:20})}
              </a>`:``}
        </div>
      </section>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`plus.paywall.disclaimer`)}</span></p>`,footer:n?K`
          ${F().weather.enabled?``:X({label:L(`plus.manage.enableWeather`),iconName:`mapPin`,action:`toWeather`,block:!0})}
          ${X({label:L(`plus.manage.toToday`),variant:F().weather.enabled?`primary`:`ghost`,action:`toToday`,block:!0})}`:``})}var Rg={render(e){return I()?Lg(e):Ig(e)},mount(e,t){I()||!pu()||hu()||Og!==`idle`||(Og=`loading`,xu().then(e=>{Og=e?`idle`:`failed`,!I()&&r().path===`/plus`&&t.rerender()}))},onChange(e){if(e.name!==`plan`)return;Dg=e.value;let t=document.querySelector(`#plus-buy span`);t&&(t.textContent=jg(e.value));let n=document.getElementById(`plus-terms`);n&&(n.textContent=Mg(e.value))},actions:{async buy(){let e=document.querySelector(`input[name="plan"]:checked`)?.value??su[0];if(!bu()?.[e])return;let t=await Su(e);t===`done`?a(`/plus?welcome=1`,{replace:!0}):t===`restored`?(Q(L(`plus.paywall.restored`)),a(`/plus`,{replace:!0})):t===`unavailable`?Q(L(`plus.paywall.nativeOnly`)):t===`pending`?Q(L(`plus.paywall.purchasePending`)):t===`failed`&&Q(L(`plus.paywall.purchaseFailed`))},notNow(){s(`/today`)},retryPrices(e,t){Og=`idle`,t.rerender()},async restore(e,t){await Eu()?t.rerender():Q(L(`plus.paywall.nothingToRestore`))},toToday(){a(`/today`,{replace:!0})},toWeather(){a(`/plus/weather`,{replace:!0})},async cancel(e,t){pu()?await Du():await fp({title:L(`plus.manage.cancelTitle`),text:L(`plus.manage.cancelText`),confirmLabel:L(`plus.manage.cancelConfirm`)})&&(Ou(),t.rerender(),Q(L(`plus.manage.cancelled`)))}}},zg=327,Bg=190,Vg={top:12,right:8,bottom:26,left:42};function Hg({points:e,todayKey:t,label:n,legend:r,table:i}){let a=e.map(e=>e.pressure),o=Math.floor(Math.min(...a)/5)*5,s=Math.ceil(Math.max(...a)/5)*5,c=s-o>30?10:5,l=[];for(let e=o;e<=s;e+=c)l.push(e);let u=zg-Vg.left-Vg.right,d=Bg-Vg.top-Vg.bottom,f=e=>Date.parse(`${e.date}T00:00:00Z`)/864e5,p=e.map(t=>({...t,index:f(t)-f(e[0])})),m=Math.max(p[p.length-1].index,1),h=e=>Vg.left+e/m*u,g=e=>Vg.top+(1-(e-o)/Math.max(s-o,1))*d,_=e=>e.map((t,n)=>{let r=`${h(t.index).toFixed(1)} ${g(t.pressure).toFixed(1)}`;return n&&t.index-e[n-1].index===1?`L${r}`:`M${r} L${r}`}).join(` `),v=Math.max(p.findIndex(e=>e.date===t),0),y=p.slice(0,v+1),b=p.slice(v),x=p[v],S=x.index,C=u/m,w=[0,v,e.length-1].filter((e,t,n)=>n.indexOf(e)===t&&(e===v||Math.abs(p[e].index-S)*C>44));return K`
    <div class="chart">
      <p class="chart__readout" aria-live="polite">${x.readout}</p>
      <svg class="chart__svg" viewBox="0 0 ${zg} ${Bg}" role="img" aria-label="${n}">
        ${l.map(e=>K`
            <line class="chart__grid" x1="${Vg.left}" x2="${zg-Vg.right}" y1="${g(e).toFixed(1)}" y2="${g(e).toFixed(1)}"></line>
            <text class="chart__tick" x="${Vg.left-6}" y="${(g(e)+4).toFixed(1)}" text-anchor="end">${e}</text>`)}
        ${w.map(t=>K`<text class="chart__tick" x="${h(p[t].index).toFixed(1)}" y="${182}" text-anchor="${t===0?`start`:t===e.length-1?`end`:`middle`}">${p[t].tickLabel}</text>`)}
        <line class="chart__today" x1="${h(S).toFixed(1)}" x2="${h(S).toFixed(1)}" y1="${Vg.top}" y2="${Bg-Vg.bottom}"></line>
        <path class="chart__line" d="${_(y)}"></path>
        ${b.length>1?K`<path class="chart__line chart__line--forecast" d="${_(b)}"></path>`:``}
        ${p.filter(e=>e.episode).map(e=>K`<circle class="chart__dot" cx="${h(e.index).toFixed(1)}" cy="${g(e.pressure).toFixed(1)}" r="5"></circle>`)}
        <line class="chart__cross" x1="${h(S).toFixed(1)}" x2="${h(S).toFixed(1)}" y1="${Vg.top}" y2="${Bg-Vg.bottom}"></line>
        <circle class="chart__selected" cx="${h(S).toFixed(1)}" cy="${g(x.pressure).toFixed(1)}" r="5"></circle>
        ${p.map(e=>K`<rect class="chart__hit" x="${(h(e.index)-C/2).toFixed(1)}" y="0" width="${C.toFixed(1)}" height="${Bg-Vg.bottom}"
            data-readout="${e.readout}" data-x="${h(e.index).toFixed(1)}" data-y="${g(e.pressure).toFixed(1)}"></rect>`)}
      </svg>
      <ul class="chart__legend" aria-label="${L(`plus.charts.legend`)}">
        ${r.map(e=>K`<li><span class="chart__key chart__key--${e.key}" aria-hidden="true"></span>${e.label}</li>`)}
      </ul>
      ${i}
    </div>`}function Ug({items:e,label:t,table:n,selected:r=e.length-1}){let i=Math.max(...e.map(e=>e.value),1),a=e.findIndex(e=>e.value===i);return K`
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
    </div>`}function Wg({head:e,rows:t}){return K`
    <details class="chart__table">
      <summary>${L(`plus.charts.showTable`)}</summary>
      <table class="data-table">
        <thead><tr>${e.map(e=>K`<th scope="col">${e}</th>`)}</tr></thead>
        <tbody>${t.map(e=>K`<tr>${e.map(e=>K`<td>${e}</td>`)}</tr>`)}</tbody>
      </table>
    </details>`}function Gg({grid:e,rowLabels:t,colLabels:n,label:r}){let i=Math.max(...e.flat(),1),a=e=>e===0?0:Math.ceil(e/i*3);return K`
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
    </div>`}function Kg(e){let t=t=>{let n=document.elementFromPoint(t.clientX,t.clientY)?.closest?.(`[data-readout]`);if(!n||!e.contains(n))return;let r=n.closest(`.chart`);if(r.querySelector(`.chart__readout`).textContent=n.dataset.readout,n.matches(`.cols__col`)){r.querySelector(`.cols__col.is-selected`)?.classList.remove(`is-selected`),n.classList.add(`is-selected`);return}let i=r.querySelector(`.chart__cross`),a=r.querySelector(`.chart__selected`);i.setAttribute(`x1`,n.dataset.x),i.setAttribute(`x2`,n.dataset.x),a.setAttribute(`cx`,n.dataset.x),a.setAttribute(`cy`,n.dataset.y)};return e.addEventListener(`pointermove`,t),e.addEventListener(`click`,t),()=>{e.removeEventListener(`pointermove`,t),e.removeEventListener(`click`,t)}}var qg=new URL(`openweather-logo-DYDLtN4d.png`,import.meta.url).href,Jg=new URL(`openweather-logo-negative-ajDAZS8x.png`,import.meta.url).href,Yg=[14,30,90],Xg=`https://openweathermap.org/`;function Zg(){return J({header:Y({back:`/plus`}),body:K`
      ${zd(`gauge`,{large:!0})}
      <h1 class="screen-title plus-after-badge" tabindex="-1">${L(`plus.features.weather.title`)}</h1>
      <p class="screen-lead">${L(`plus.weather.offLead`)}</p>
      <ul class="facts-list">${[[`gauge`,`plus.weather.factRecord`],[`mapPin`,`plus.weather.factLocation`],[`shield`,`plus.weather.factHealth`],[`x`,`plus.weather.factOff`]].map(([e,t])=>K`<li>${q(e,{size:22})}<span>${L(t)}</span></li>`)}</ul>`,footer:X({label:L(`plus.weather.enable`),iconName:`mapPin`,action:`useLocation`,id:`weather-enable`,block:!0})})}function Qg(e){let t=e.pressureChange,n=t==null||Math.abs(t)<1?`minus`:t<0?`arrowDown`:`arrowUp`;return K`
    <section class="card weather-now" aria-labelledby="now-title">
      <h2 class="visually-hidden" id="now-title">${L(`plus.weather.today`)}</h2>
      <div class="weather-now__main">
        <span class="weather-now__pressure">${nf(e.pressure)}</span>
        ${t==null?``:K`<span class="weather-now__change">${q(n,{size:18})}${L(`plus.weather.changeShort`,{value:of(t)})}</span>`}
      </div>
      <p class="weather-now__band">${L(`plus.weather.bands.${af(e.pressure)}`)}</p>
      <dl class="weather-now__facts">
        <div><dt>${q($d[e.condition]??`cloud`,{size:18})}<span class="visually-hidden">${L(`plus.weather.condition`)}</span></dt><dd>${cf(e.condition)}</dd></div>
        <div><dt>${q(`thermometer`,{size:18})}<span class="visually-hidden">${L(`plus.weather.temperature`)}</span></dt><dd>${sf(e)}</dd></div>
        ${e.humidity==null?``:K`<div><dt>${q(`droplets`,{size:18})}<span class="visually-hidden">${L(`plus.weather.humidity`)}</span></dt><dd>${L(`plus.weather.humidityValue`,{value:e.humidity})}</dd></div>`}
      </dl>
    </section>`}function $g(e){return K`
    <details class="pressure-scale">
      <summary>${L(`plus.weather.bandTitle`)}</summary>
      <ul class="pressure-scale__list">
        ${rf.map(({key:t})=>K`
            <li class="pressure-scale__row${t===e?` is-current`:``}">
              <span class="pressure-scale__label">
                ${L(`plus.weather.bands.${t}`)}
                ${t===e?K`<span class="pressure-scale__now">${L(`plus.weather.bandNow`)}</span>`:``}
              </span>
              <span class="pressure-scale__range">${L(`plus.weather.bandRanges.${t}`)}</span>
            </li>`)}
      </ul>
      <p class="muted small">${L(`plus.weather.bandNote`)}</p>
    </details>`}function e_(e){let t=A(),n=md({from:A(M(new Date,-(e-1))),to:A(M(new Date,7))});if(n.length<2)return``;let r=e=>[e.date===t?L(`plus.forecast.today`):`${ff(e.date)} ${df(j(e.date))}`,nf(e.pressure),e.pressureChange==null?``:L(`plus.weather.changeShort`,{value:of(e.pressureChange)}),e.date>t?L(`plus.weather.forecastWord`):``,e.estimated?L(`plus.weather.estimateWord`):``,e.episode?L(`plus.weather.episodeWord`):``].filter(Boolean).join(` · `),i=n.map(e=>({date:e.date,pressure:e.pressure,episode:e.episode,tickLabel:e.date===t?L(`plus.forecast.today`):df(j(e.date)),readout:r(e)}));return K`
    <section class="section" aria-labelledby="chart-title">
      <h2 class="section-title" id="chart-title">${L(`plus.weather.chartTitle`)}</h2>
      ${Pd({name:`range`,legend:L(`insights.periodLabel`),selected:String(e),options:Yg.map(e=>({value:String(e),label:L(`plus.weather.rangeDays`,{n:e})}))})}
      ${Hg({points:i,todayKey:t,label:L(`plus.weather.chartLabel`,{n:e}),legend:[{key:`line`,label:L(`plus.weather.legendPressure`)},{key:`forecast`,label:L(`plus.weather.legendForecast`)},{key:`dot`,label:L(`plus.weather.legendEpisode`)}],table:Wg({head:[L(`plus.weather.colDay`),L(`plus.weather.colPressure`),L(`plus.weather.colChange`),L(`plus.weather.colEpisode`)],rows:[...n].reverse().map(e=>[df(j(e.date)),e.estimated?`${nf(e.pressure)} (${L(`plus.weather.estimateWord`)})`:nf(e.pressure),e.pressureChange==null?`–`:of(e.pressureChange),e.episode?L(`common.yes`):`–`])})})}
    </section>`}function t_(){let e=[1,2,3,4,5,6,7].map(e=>Ln(A(M(new Date,e)))).filter(Boolean);return e.length?K`
    <section class="section" aria-labelledby="fc-title">
      <h2 class="section-title" id="fc-title">${L(`plus.weather.forecastTitle`)}</h2>
      <ul class="weather-days">
        ${e.map(e=>K`
            <li class="weather-day">
              ${q($d[e.condition]??`cloud`,{size:22})}
              <span class="weather-day__main">
                <span class="weather-day__name">${ff(e.date)}</span>
                <span class="weather-day__meta">${cf(e.condition)} · ${sf(e)}</span>
              </span>
              <span class="weather-day__pressure">
                <span>${nf(e.pressure)}</span>
                ${e.pressureChange==null?``:K`<span class="weather-day__change">${of(e.pressureChange)}</span>`}
              </span>
            </li>`)}
      </ul>
    </section>`:``}function n_(){let e=nd({days:365}),t=e.enough?e.factors.find(e=>e.key===`pressure_drop`):null;return K`
    <section class="section" aria-labelledby="link-title">
      <h2 class="section-title" id="link-title">${L(`plus.weather.linkTitle`)}</h2>
      <p class="muted">${t?yf({stat:t}):L(`plus.forecast.evidenceFew`)}</p>
      <div class="section-sm">${X({label:L(`plus.weather.openFinder`),iconName:`search`,variant:`secondary`,action:`openFinder`,block:!0})}</div>
    </section>`}function r_(e){let t=F().weather,n=Yg.includes(Number(e.query.range))?Number(e.query.range):14,r=Ln(A());return J({header:Y({back:`/plus`}),body:K`
      <h1 class="screen-title" tabindex="-1">${L(`plus.features.weather.title`)}</h1>
      <p class="weather-place">${q(`mapPin`,{size:18})}<span>${L(`plus.weather.myLocation`)}</span></p>
      <p class="muted small">${L(Nl()?`plus.weather.updated`:`plus.weather.stale`,{time:Ud(t.updatedAt)})}</p>
      ${r?Qg(r):K`<p class="empty section-sm">${L(`plus.weather.noData`)}</p>`}
      ${$g(r?af(r.pressure):null)}
      ${e_(n)}
      ${t_()}
      ${n_()}

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
        <a class="weather-source" href="${Xg}" target="_blank" rel="noopener noreferrer">
          <img class="weather-source__logo weather-source__logo--light" src="${qg}" alt="" width="196" height="84">
          <img class="weather-source__logo weather-source__logo--dark" src="${Jg}" alt="" width="197" height="84">
          <span>${L(`plus.weather.attribution`)}</span>
        </a>
      </p>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`plus.weather.disclaimer`)}</span></p>`})}var i_={render(e){return F().weather.enabled?r_(e):Zg()},mount(e){return Kg(e)},onChange(e,t){e.name===`range`&&(o(`/plus/weather?range=${e.value}`),t.rerender())},actions:{async useLocation(e,t){e.disabled=!0,Q(L(`plus.weather.loading`));try{let{position:e,days:n}=await jl();F().weather.enabled||Rn({source:ul,...e}),Bn(n,e),t.rerender(),Q(L(`plus.weather.enabled`))}catch(t){e.disabled=!1,Q(L(`plus.weather.errors.${[`denied`,`unavailable`,`setup`].includes(t.message)?t.message:`network`}`))}},openFinder(){a(`/plus/finder`)},async turnOff(e,t){await fp({title:L(`plus.weather.turnOffTitle`),text:L(`plus.weather.turnOffText`),confirmLabel:L(`plus.weather.turnOff`)})&&(zn(),If(),t.rerender())}}},a_={sleep:`bed`,steps:`footprints`,workouts:`dumbbell`};function o_(){return J({header:Y({back:`/plus`}),body:K`
      ${zd(`watch`,{large:!0})}
      <h1 class="screen-title plus-after-badge" tabindex="-1">${L(`plus.features.health.title`)}</h1>
      <p class="screen-lead">${L(`plus.health.lead`)}</p>
      <p class="plus-free section-sm">${L(`plus.health.browserOnly`)}</p>
      <p class="disclaimer">${q(`shield`,{size:20})}<span>${L(`plus.health.privacy`)}</span></p>`})}function s_(){return J({form:!0,header:Y({back:`/plus`}),body:K`
      ${zd(`watch`,{large:!0})}
      <h1 class="screen-title plus-after-badge" tabindex="-1">${L(`plus.features.health.title`)}</h1>
      <p class="screen-lead">${L(`plus.health.lead`)}</p>
      <section class="section" aria-labelledby="types-title">
        <h2 class="section-title" id="types-title">${L(`plus.health.typesTitle`)}</h2>
        <div class="list">
          ${Fl.map(e=>Ld({name:`type-${e}`,label:L(`plus.health.types.${e}`),checked:!0,iconName:a_[e]}))}
        </div>
        <p class="muted small section-sm">${L(`plus.health.typesHint`)}</p>
      </section>
      <p class="disclaimer">${q(`shield`,{size:20})}<span>${L(`plus.health.privacy`)}</span></p>`,footer:X({label:L(`plus.health.connectTo.${Gl()}`),iconName:`watch`,action:`connect`,id:`health-connect`,block:!0})})}function c_(e){return Array.from({length:e},(t,n)=>A(M(new Date,-(e-1-n))))}function l_(){let{health:e}=F(),t=A(),n=Vn(t),r=Dn(t),i=c_(7),a=t=>e.types.includes(t),o=e=>`${ff(e)} ${df(j(e))}`,s=L(`plus.health.noValue`),c=i.map(e=>{let t=Vn(e)?.steps??null;return{label:uf(j(e)).slice(0,2),value:t??0,display:t==null?``:lf(t),readout:`${o(e)} · ${t==null?s:L(`plus.health.stepsValue`,{value:lf(t)})}`}}),l=i.map(e=>{let t=Dn(e)?.minutes??0;return{label:uf(j(e)).slice(0,2),value:t,display:t?qd(t/60):``,readout:`${o(e)} · ${t?Yd(t):s}`}}),u=[...i].reverse().map(e=>({date:e,workouts:Vn(e)?.workouts??[]})).filter(e=>e.workouts.length);return J({header:Y({back:`/plus`}),body:K`
      <h1 class="screen-title" tabindex="-1">${L(`plus.features.health.title`)}</h1>
      <p class="weather-place">${q(`watch`,{size:18})}<span>${L(`plus.health.providers.${e.provider}`)}</span></p>
      ${e.lastSyncAt?K`<p class="muted small">${L(`plus.health.lastSync`,{time:Ud(e.lastSyncAt)})}</p>`:``}

      <div class="stats section-sm">
        ${a(`steps`)?K`<div class="stat"><span class="stat__value">${n?.steps==null?`–`:lf(n.steps)}</span><span class="stat__label">${L(`plus.health.stepsToday`)}</span></div>`:``}
        ${a(`sleep`)?K`<div class="stat"><span class="stat__value">${r?Yd(r.minutes):`–`}</span><span class="stat__label">${L(`plus.health.sleepToday`)}</span></div>`:``}
      </div>

      ${a(`steps`)?K`<section class="section" aria-labelledby="steps-title">
            <h2 class="section-title" id="steps-title">${L(`plus.health.stepsWeek`)}</h2>
            ${Ug({items:c,label:L(`plus.health.stepsWeek`),table:Wg({head:[L(`plus.weather.colDay`),L(`plus.health.types.steps`)],rows:c.map(e=>[e.readout.split(` · `)[0],e.display||s])})})}
          </section>`:``}
      ${a(`sleep`)?K`<section class="section" aria-labelledby="sleep-title">
            <h2 class="section-title" id="sleep-title">${L(`plus.health.sleepWeek`)}</h2>
            ${Ug({items:l,label:L(`plus.health.sleepWeek`),table:Wg({head:[L(`plus.weather.colDay`),L(`plus.health.types.sleep`)],rows:l.map(e=>e.readout.split(` · `))})})}
          </section>`:``}
      ${a(`workouts`)?K`<section class="section" aria-labelledby="workouts-title">
            <h2 class="section-title" id="workouts-title">${L(`plus.health.workoutsWeek`)}</h2>
            ${u.length?K`<ul class="day-context">
                  ${u.map(e=>K`<li>${q(`dumbbell`,{size:20})}<span><strong>${o(e.date)}</strong> · ${e.workouts.map(_f).join(`, `)}</span></li>`)}
                </ul>`:K`<p class="muted small">${L(`plus.health.workoutsNone`)}</p>`}
          </section>`:``}

      <section class="section" aria-labelledby="types-title">
        <h2 class="section-title" id="types-title">${L(`plus.health.typesTitle`)}</h2>
        <div class="list">
          ${Fl.map(t=>Ld({name:`type-${t}`,label:L(`plus.health.types.${t}`),checked:e.types.includes(t),iconName:a_[t]}))}
        </div>
        <p class="muted small section-sm">${L(`plus.health.typesHint`)}</p>
      </section>

      <p class="disclaimer">${q(`shield`,{size:20})}<span>${L(`plus.health.privacy`)}</span></p>
      <div class="section">${X({label:L(`plus.health.disconnect`),variant:`outline`,iconName:`x`,action:`disconnect`,block:!0})}</div>`})}var u_={render(){return Wl()?F().health.connected?l_():s_():o_()},mount(e){return Kg(e)},async onChange(e,t){if(!e.name?.startsWith(`type-`)||!F().health.connected)return;let n=e.name.slice(5),{types:r}=F().health;if(!e.checked)Wn(r.filter(e=>e!==n)),t.rerender();else{e.disabled=!0;try{await Ql(n)}catch{Q(L(`plus.health.errors.denied`))}t.rerender()}},actions:{async connect(e,t){let n=Fl.filter(e=>document.getElementById(`f-type-${e}`)?.checked);e.disabled=!0;try{await Zl(n),t.rerender(),Q(L(`plus.health.connectedToast`))}catch(t){e.disabled=!1,Q(L(t.message===`unavailable`?`plus.health.errors.unavailable`:`plus.health.errors.denied`))}},async disconnect(e,t){await fp({title:L(`plus.health.disconnectTitle`),text:[L(`plus.health.disconnectText`),L(`plus.health.revokeHint.${Gl()}`)],confirmLabel:L(`plus.health.disconnect`)})&&(Un(),t.rerender(),Q(L(`plus.health.disconnectedToast`),Kl()?{actionLabel:L(`plus.health.openSettings`),onAction:ql}:{}))}}},d_=e=>Math.round(e*100);function f_(e,t,n,r,i){return K`
    <div class="compare__row">
      <span class="compare__label">${e}</span>
      <span class="compare__value">${L(`plus.finder.ofDays`,{a:t,b:n})} · ${L(`plus.finder.percent`,{n:d_(r)})}</span>
      <span class="bars__track" aria-hidden="true"><span class="bars__fill compare__fill--${i}" style="width:${Math.max(r*100,2)}%"></span></span>
    </div>`}function p_(e){return K`
    <li class="finder-factor">
      <div class="finder-factor__head">
        ${q(e.icon,{size:22})}
        <h3 class="finder-factor__title">${L(`plus.finder.factors.${e.key}`)}</h3>
        <span class="strength strength--${e.strength}">${L(`plus.finder.strength.${e.strength}`)}</span>
      </div>
      ${e.strength===`few`?K`<p class="muted small">${L(`plus.finder.fewFactor`,{n:e.withDays})}</p>`:K`<div class="compare">
            ${f_(L(`plus.finder.after`),e.withHard,e.withDays,e.rateWith,`with`)}
            ${f_(L(`plus.finder.otherDays`),e.withoutHard,e.withoutDays,e.rateWithout,`without`)}
          </div>`}
    </li>`}var m_={render(e){let t=Gu.includes(Number(e.query.days))?Number(e.query.days):180,n=nd({days:t}),{weather:r,health:i}=F(),a=[r.enabled?null:{key:`weather`,href:`#/plus/weather`},i.connected?null:{key:`health`,href:`#/plus/health`}].filter(Boolean);return J({header:Y({back:`/insights`}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`plus.features.finder.title`)}</h1>
        <p class="screen-lead">${L(`plus.finder.lead`,{intensity:5})}</p>
        <p class="info-note">${q(`info`,{size:20})}<span>${L(`plus.finder.moreRecords`)}</span></p>
        <div class="insights-period">
          ${Pd({name:`days`,legend:L(`insights.periodLabel`),selected:String(t),options:Gu.map(e=>({value:String(e),label:L(`plus.periods.d${e}`)}))})}
        </div>

        ${n.enough?K`
              ${F().demoEnabled&&r.enabled?K`<p class="plus-summary">${L(`plus.demoSymptoms`)}</p>`:``}
              <p class="plus-summary">${L(`plus.finder.summary`,{hard:R(`plural.hardDays`,n.hardDays),days:R(`plural.days`,n.trackedDays)})}</p>
              <ul class="finder-factors">${n.factors.map(p_)}</ul>`:K`
              <div class="coming">
                ${q(`search`,{size:40})}
                <p class="muted">${L(`plus.finder.notEnough`,{days:R(`plural.days`,n.trackedDays),hard:R(`plural.hardDays`,n.hardDays)})}</p>
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
              ${Hh(n.logged.slice(0,6),Mp)}
            </section>`:``}

        <section class="section" aria-labelledby="how-title">
          <h2 class="section-title" id="how-title">${L(`plus.finder.howTitle`)}</h2>
          <p class="muted small">${L(`plus.finder.howText`)}</p>
        </section>

        <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`plus.finder.disclaimer`)}</span></p>
        ${F().forecast.enabled?``:K`<div class="section">${X({label:L(`plus.finder.toForecast`),iconName:`bellRing`,variant:`secondary`,action:`toForecast`,block:!0})}</div>`}`})},onChange(e,t){e.name===`days`&&(o(`/plus/finder?days=${e.value}`),t.rerender())},actions:{toForecast(){a(`/plus/forecast`)}}};async function h_(){let e=await jf();return e||Q(L(`notifications.denied`)),e}function g_(){return J({header:Y({back:`/plus`}),body:K`
      ${zd(`bellRing`,{large:!0})}
      <h1 class="screen-title plus-after-badge" tabindex="-1">${L(`plus.features.forecast.title`)}</h1>
      <p class="screen-lead">${L(`plus.forecast.offLead`)}</p>
      <ul class="facts-list">${[[`gauge`,`plus.forecast.factWeather`],[`check`,`plus.forecast.factRecords`],[`bellRing`,`plus.forecast.factNotify`],[`x`,`plus.forecast.factOff`]].map(([e,t])=>K`<li>${q(e,{size:22})}<span>${L(t)}</span></li>`)}</ul>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`plus.forecast.disclaimer`)}</span></p>`,footer:X({label:L(`plus.forecast.enable`),iconName:`bellRing`,action:`enable`,block:!0})})}function __(e){return K`
    <li class="outlook-day">
      <div class="outlook-day__head">
        <span class="outlook-day__name">${ff(e.date)}<span class="outlook-day__date">${df(j(e.date))}</span></span>
        ${xf(e.level)}
      </div>
      ${e.signals.length?K`<ul class="outlook-signals">
            ${e.signals.slice(0,2).map(e=>K`<li><strong>${vf(e)}</strong> ${yf(e)}</li>`)}
          </ul>`:K`<p class="muted small">${L(`plus.forecast.calmText`)}</p>`}
    </li>`}function v_(e){return K`
    <section class="section" aria-labelledby="alerts-title">
      <h2 class="section-title" id="alerts-title">${L(`plus.forecast.alertsTitle`)}</h2>
      ${Nd({name:`alerts`,type:`checkbox`,legend:L(`plus.forecast.alertsTitle`),options:rd.map(e=>({value:e,label:L(`plus.forecast.alerts.${e}`)})),selected:e})}
      ${e.length?``:K`<p class="plus-summary">${L(`plus.forecast.alertsNone`)}</p>`}
    </section>`}function y_(){let{forecast:e,weather:t,demoEnabled:n}=F(),r=ad(),i=r.next,a=i?bf(i):null;return J({header:Y({back:`/plus`}),body:K`
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
      ${t.enabled&&!Nl()?K`<p class="plus-summary">${L(`plus.forecast.staleForecast`)}</p>`:``}
      ${n&&t.enabled?K`<p class="plus-summary">${L(`plus.demoSymptoms`)}</p>`:``}

      <ul class="outlook-days">${r.days.map(__)}</ul>

      ${v_(e.alerts)}

      <section class="section" aria-labelledby="notify-title">
        <h2 class="section-title" id="notify-title">${L(`plus.forecast.notifyTitle`)}</h2>
        <div class="list">
          ${Ld({name:`notify`,label:L(`plus.forecast.notify`),hint:L(`plus.forecast.notifyHint`),checked:e.notify,iconName:`bell`})}
          ${e.notify?K`<div class="list__field">${Z({label:L(`plus.forecast.notifyTime`),name:`notifyTime`,type:`time`,value:e.time})}</div>`:``}
        </div>
        ${e.notify&&!a&&e.alerts.length?K`<p class="plus-summary">${L(`plus.forecast.nothingToNotify`)}</p>`:``}
        ${e.notify&&a?K`<div class="notif-preview">
              <p class="notif-preview__label">${L(`plus.forecast.previewLabel`)}</p>
              <div class="notif">
                <span class="notif__head">${q(`bellRing`,{size:18})}<strong>${L(`app.name`)}</strong><span>${e.time}</span></span>
                <strong class="notif__title">${L(`plus.forecast.cardTitle`,{day:ff(i.date)})}</strong>
                <span>${vf(a)}</span>
              </div>
            </div>`:``}
      </section>

      <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`plus.forecast.disclaimer`)}</span></p>
      <div class="section">${X({label:L(`plus.forecast.disable`),variant:`outline`,iconName:`x`,action:`disable`,block:!0})}</div>`})}var b_={render(){return F().forecast.enabled?y_():g_()},async onChange(e,t){if(e.name===`alerts`){let e=new Set([...document.querySelectorAll(`input[name="alerts"]:checked`)].map(e=>e.value));Kn({alerts:rd.filter(t=>e.has(t))}),If(),t.rerender()}if(e.name===`notify`){let n=e.checked&&await h_();Kn({notify:n}),If(),t.rerender(),n&&Uc(document.querySelector(`.notif-preview`))}e.name===`notifyTime`&&e.value&&(Kn({time:e.value}),If(),t.rerender())},actions:{async enable(e,t){Kn({enabled:!0,notify:F().forecast.notify&&await h_()}),If(),t.rerender(),F().weather.enabled||Q(L(`plus.forecast.weatherOff`))},disable(){Kn({enabled:!1}),If(),a(`/plus`,{replace:!0})}}};function x_(e,t,n){if(e==null||t==null)return L(`plus.stats.noCompare`);let r=e-t;return Math.abs(r)<.05?L(`plus.stats.same`):L(r<0?`plus.stats.less`:`plus.stats.more`,{value:n(Math.abs(r))})}function S_(e){let{current:t,previous:n}=od(e),r=e=>String(Math.round(e)),i=[{key:`symptomDays`,now:t.symptomDays,before:n.symptomDays,format:r},{key:`episodes`,now:t.episodeCount,before:n.episodeCount,format:r},{key:`avgIntensity`,now:t.avgIntensity,before:n.avgIntensity,format:qd},{key:`avgDuration`,now:t.avgDurationMinutes,before:n.avgDurationMinutes,format:Yd}];return K`
    <section class="section" aria-labelledby="cmp-title">
      <h2 class="section-title" id="cmp-title">${L(`plus.stats.compareTitle`)}</h2>
      <p class="muted small">${L(`plus.stats.compareLead`,{days:R(`plural.days`,e)})}</p>
      <ul class="compare-list">
        ${i.map(e=>{let t=e.now==null||e.before==null||Math.abs(e.now-e.before)<.05?`minus`:e.now<e.before?`arrowDown`:`arrowUp`;return K`
            <li class="compare-item">
              <span class="compare-item__label">${L(`insights.${e.key}`)}</span>
              <span class="compare-item__value${e.now==null?` compare-item__value--empty`:``}">${e.now==null?L(`insights.noValue`):e.format(e.now)}</span>
              <span class="compare-item__trend">${q(t,{size:16})}${x_(e.now,e.before,e.format)}</span>
            </li>`})}
      </ul>
    </section>`}function C_(){let e=sd(12),t=new Intl.DateTimeFormat(Or(),{month:`narrow`}),n=e.map(e=>({label:t.format(e.month),value:e.symptomDays,readout:`${Kd(e.month)} · ${L(`plus.stats.symptomDaysValue`,{n:e.symptomDays})} · ${R(`plural.episodes`,e.episodes)}`}));return K`
    <section class="section" aria-labelledby="trend-title">
      <h2 class="section-title" id="trend-title">${L(`plus.stats.trendTitle`)}</h2>
      ${Ug({items:n,label:L(`plus.stats.trendLabel`),table:Wg({head:[L(`plus.stats.colMonth`),L(`insights.symptomDays`),L(`insights.episodes`)],rows:[...e].reverse().map(e=>[Kd(e.month),e.symptomDays,e.episodes])})})}
    </section>`}function w_(e){let{grid:t,total:n}=ud(e);if(n<3)return``;let r=new Date(2024,0,1),i=new Intl.DateTimeFormat(Or(),{weekday:`short`}),a=Array.from({length:7},(e,t)=>{let n=i.format(M(r,t)).replace(`.`,``);return n.charAt(0).toLocaleUpperCase(Or())+n.slice(1)});return K`
    <section class="section" aria-labelledby="rhythm-title">
      <h2 class="section-title" id="rhythm-title">${L(`plus.stats.rhythmTitle`)}</h2>
      <p class="muted small">${L(`plus.stats.rhythmLead`,{n:R(`plural.episodes`,n)})}</p>
      ${Gg({grid:t,rowLabels:a,colLabels:cd.map(e=>L(`plus.stats.parts.${e}`)),label:L(`plus.stats.rhythmTitle`)})}
    </section>`}function T_(e){if(F().cycleTracking!==!0)return``;let{items:t,total:n,starts:r}=dd(e);if(n<3||r<2)return``;let i=e=>e===0?L(`plus.stats.cycleStart`):L(`plus.stats.cycleOffset`,{n:e>0?`+${e}`:`−${Math.abs(e)}`}),a=t.map(e=>({label:e.offset===0?`1.`:e.offset>0?`+${e.offset}`:`−${Math.abs(e.offset)}`,value:e.count,readout:`${i(e.offset)} · ${R(`plural.episodes`,e.count)}`}));return K`
    <section class="section" aria-labelledby="cycle-title">
      <h2 class="section-title" id="cycle-title">${L(`plus.stats.cycleTitle`)}</h2>
      <p class="muted small">${L(`plus.stats.cycleLead`,{n:r})}</p>
      ${Ug({items:a,selected:t.findIndex(e=>e.offset===0),label:L(`plus.stats.cycleTitle`),table:Wg({head:[L(`plus.stats.colCycleDay`),L(`insights.episodes`)],rows:t.map(e=>[i(e.offset),e.count])})})}
    </section>`}function E_(e){let{relief:t,impact:n}=fd(e);return K`
    ${t.length?K`<section class="section" aria-labelledby="relief-title">
          <h2 class="section-title" id="relief-title">${L(`plus.stats.reliefTitle`)}</h2>
          ${Hh(t.slice(0,5),Pp)}
        </section>`:``}
    ${n.length?K`<section class="section" aria-labelledby="impact-title">
          <h2 class="section-title" id="impact-title">${L(`plus.stats.impactTitle`)}</h2>
          ${Hh(n.slice(0,5),Fp)}
        </section>`:``}`}function D_(e){let t=pd(e);if(!t.length)return``;let n=new Intl.DateTimeFormat(Or(),{month:`narrow`}),r=e=>Gd(j(e));return K`
    <section class="section" aria-labelledby="med-title">
      <h2 class="section-title" id="med-title">${L(`plus.stats.medTitle`)}</h2>
      <p class="muted small">${L(`plus.stats.medLead`)}</p>
      <ul class="med-timeline">
        ${t.map(e=>{let t=e.months.map(e=>({label:n.format(e.month),value:e.count,display:String(e.count),readout:`${Kd(e.month)} · ${R(`plural.times`,e.count)}`})),i=[e.medication.startDate?L(`plus.stats.medSince`,{date:r(e.medication.startDate)}):``,L(`plus.stats.medTotal`,{count:R(`plural.times`,e.total),date:r(e.last)})].filter(Boolean);return K`
            <li class="med-timeline__item">
              <span class="med-timeline__name">${e.medication.name}</span>
              <span class="muted small">${i.join(` · `)}</span>
              ${Ug({items:t,label:`${L(`plus.stats.medTitle`)} · ${e.medication.name}`,table:Wg({head:[L(`plus.stats.colMonth`),L(`plus.stats.colCount`)],rows:[...e.months].reverse().map(e=>[Kd(e.month),e.count])})})}
            </li>`})}
      </ul>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`plus.stats.medDisclaimer`)}</span></p>
    </section>`}var O_={render(e){let t=Ku.includes(Number(e.query.days))?Number(e.query.days):180,n=Mu(t);return Fu(Mu(365)).recordCount?J({header:Y({back:`/insights`}),body:K`
        <h1 class="screen-title" tabindex="-1">${L(`plus.features.stats.title`)}</h1>
        <div class="insights-period">
          ${Pd({name:`days`,legend:L(`insights.periodLabel`),selected:String(t),options:Ku.map(e=>({value:String(e),label:L(`plus.periods.d${e}`)}))})}
        </div>
        ${S_(t)}
        ${C_()}
        ${w_(n)}
        ${T_(n)}
        ${E_(n)}
        ${D_(n)}
        <p class="disclaimer">${q(`info`,{size:20})}<span>${L(`insights.interpretation`)}</span></p>`}):J({header:Y({back:`/insights`}),body:K`
          <h1 class="screen-title" tabindex="-1">${L(`plus.features.stats.title`)}</h1>
          <div class="coming">
            ${q(`chart`,{size:40})}
            <p class="muted">${L(`plus.stats.empty`)}</p>
          </div>`})},mount(e){return Kg(e)},onChange(e,t){e.name===`days`&&(o(`/plus/stats?days=${e.value}`),t.rerender())}},k_=null,A_=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);function j_(){let e=Fn();return J({form:!0,header:Y({back:`/plus`}),body:K`
      <h1 class="screen-title" tabindex="-1">${L(`plus.withdraw.title`)}</h1>
      <p class="screen-lead">${e?L(`plus.withdraw.lead`,{date:Gd(e)}):L(`plus.withdraw.leadLate`)}</p>
      ${Z({label:L(`plus.withdraw.name`),name:`fullName`,autocomplete:`name`,required:!0})}
      ${Z({label:L(`plus.withdraw.order`),name:`order`,value:F().plus.orderId??``,hint:L(`plus.withdraw.orderHint`),required:!0})}
      ${Z({label:L(`plus.withdraw.email`),name:`email`,type:`email`,autocomplete:`email`,hint:L(`plus.withdraw.emailHint`),required:!0})}
      <p class="info-note">${q(`info`,{size:20})}<span>${L(`plus.withdraw.note`,{address:be})}</span></p>`,footer:K`
      ${X({label:L(`plus.withdraw.submit`),type:`submit`,block:!0,id:`withdraw-submit`})}
      ${X({label:L(`common.cancel`),variant:`ghost`,action:`cancel`,block:!0})}`})}function M_(){return J({header:Y({back:`/plus`}),body:K`
      <h1 class="screen-title" tabindex="-1">${L(`plus.withdraw.sentTitle`)}</h1>
      <p class="screen-lead">${L(`plus.withdraw.sentText`,{email:k_.email})}</p>
      <section class="section" aria-labelledby="withdraw-text-title">
        <h2 class="section-title" id="withdraw-text-title">${L(`plus.withdraw.sentFallback`,{address:be})}</h2>
        <p class="withdraw-text" id="withdraw-text">${k_.text}</p>
        ${X({label:L(`plus.withdraw.copy`),variant:`secondary`,iconName:`copy`,action:`copy`,block:!0})}
      </section>`,footer:X({label:L(`plus.withdraw.done`),action:`done`,block:!0})})}function N_(e,t){let n=new FormData(e),r=String(n.get(`fullName`)??``).trim(),i=String(n.get(`order`)??``).trim(),a=String(n.get(`email`)??``).trim();if(r.length<3)return Fd(e,`fullName`,L(`plus.withdraw.errors.name`));if(!i)return Fd(e,`order`,L(`plus.withdraw.errors.order`));if(!A_(a))return Fd(e,`email`,L(`plus.withdraw.errors.email`));k_={email:a,text:L(`plus.withdraw.mailBody`,{name:r,order:i,email:a,time:Wd(new Date)})},Q(L(`plus.withdraw.demoNote`)),t.rerender(),document.querySelector(`.screen-title`)?.focus({preventScroll:!0})}n(`/start/language`,Kf),n(`/start/welcome`,qf),n(`/start/privacy`,lg({onboarding:!0})),n(`/start/goals`,Qf),n(`/start/condition`,tp),n(`/start/cycle`,ip),n(`/start/medications`,sp),n(`/start/medications/new`,mp({returnTo:`/start/medications`})),n(`/start/reminders`,lp),n(`/start/profile`,fg),n(`/consent`,lg({onboarding:!1})),n(`/privacy-policy`,ug({key:`privacyPolicy`,sections:rg,version:ng})),n(`/terms`,ug({key:`terms`,sections:ag,version:ig})),n(`/security/pin`,Cg),n(`/lock`,Eg),n(`/today`,Wm),n(`/episode/:id`,Ym),n(`/episode/:id/details/:step`,Im),n(`/log/symptoms`,gh),n(`/log/intensity`,vh),n(`/log/details`,Sh),n(`/symptom/:id`,wh),n(`/calendar`,Bh),n(`/insights`,Wh),n(`/report`,Gh),n(`/report/view`,Xh),n(`/sleep`,tg),n(`/treatment`,Dh),n(`/treatment/new`,mp({returnTo:`/treatment`})),n(`/treatment/:id`,jh),n(`/treatment/:id/edit`,mp({returnTo:e=>`/treatment/${e.params.id}`})),n(`/treatment/:id/intake`,Nh({mode:`new`})),n(`/intake/:id`,Nh({mode:`edit`})),n(`/medication-intake`,Qm),n(`/profile`,rh),n(`/backup`,uh),n(`/styleguide`,ph),n(`/plus`,Rg),n(`/plus/weather`,i_),n(`/plus/health`,u_),n(`/plus/finder`,m_),n(`/plus/forecast`,b_),n(`/plus/stats`,O_),n(`/plus/withdraw`,{render(){return k_?M_():j_()},onSubmit(e,t){N_(e,t)},actions:{cancel(){a(`/plus`,{replace:!0})},async copy(){try{await navigator.clipboard.writeText(k_.text),Q(L(`plus.withdraw.copied`))}catch{let e=document.createRange();e.selectNodeContents(document.getElementById(`withdraw-text`));let t=window.getSelection();t.removeAllRanges(),t.addRange(e)}},done(){k_=null,a(`/plus`,{replace:!0})}}});var P_=[`/privacy-policy`,`/security/pin`];function F_(e){return il()?e===`/lock`?`/today`:e===`/styleguide`?null:F().language?Ht()?e===`/`||e.startsWith(`/start/`)?`/today`:og()?e.startsWith(`/log/`)&&!tm()?`/today`:e.startsWith(`/plus/`)&&!I()?`/plus?from=${e.split(`/`)[2]}`:null:e===`/consent`||e===`/privacy-policy`?null:`/consent`:e.startsWith(`/start/`)||P_.includes(e)?null:`/start/welcome`:e===`/start/language`?null:`/start/language`:(sl(e),e===`/lock`?null:`/lock`)}var I_=document.getElementById(`app`),L_=null,R_={render:()=>J({body:K`
        <h1 class="screen-title" tabindex="-1">${L(`failure.title`)}</h1>
        <p class="screen-lead">${L(`failure.text`)}</p>`,footer:K`
        ${X({label:L(`failure.retry`),action:`retry`,block:!0})}
        ${X({label:L(`failure.backup`),variant:`secondary`,action:`toBackup`,block:!0})}
        ${X({label:L(`failure.home`),variant:`ghost`,action:`toHome`,block:!0})}`}),actions:{retry:()=>z_(),toBackup:()=>r().path===`/backup`?z_():a(`/backup`),toHome:()=>r().path===`/today`?z_():a(`/today`,{replace:!0})}};function z_({navigation:e=!0}={}){let{path:t,query:n}=r(),o=F_(t);if(o)return a(o,{replace:!0});let s=i(t);if(!s)return a(`/today`,{replace:!0});let c=e?null:document.activeElement?.id,l=e?0:I_.querySelector(`.screen__body`)?.scrollTop??0;L_?.cleanup?.();let u=document.getElementById(`dialog`);e&&u.open&&u.close();let d={params:s.params,query:n,rerender:()=>z_({navigation:!1})},f=s.screen,p;try{p=String(f.render(d))}catch(e){console.error(`[main] Obrazovku ${t} sa nepodarilo vykresliť`,e),f=R_,p=String(f.render(d))}I_.innerHTML=p,L_={screen:f,ctx:d,cleanup:f.mount?.(I_,d)};let m=I_.querySelector(`.screen__body`);m&&(m.scrollTop=l),e?(I_.querySelector(`.screen-title`)?.focus({preventScroll:!0}),Vc(I_)):c&&document.getElementById(c)?.focus({preventScroll:!0}),e&&U_()}var B_=[`/today`,`/calendar`,`/profile`,`/plus`,`/plus/weather`,`/plus/health`,`/plus/forecast`],V_=!1,H_=!1;async function U_(){if(V_||!il()||!Ht()||!og())return;V_=!0;let e=!1,t=!1,n=!1;try{e=await Tu(),I()&&([t,n]=await Promise.all([Ml(),$l()]))}catch(e){console.error(`[main] Aktuálne údaje sa nepodarilo obnoviť`,e)}finally{V_=!1}il()&&((!H_||e||t)&&(H_=!0,Lf()),(e||t||n)&&B_.includes(r().path)&&z_({navigation:!1}))}var W_={back:e=>s(e.dataset.fallback||`/today`),startEpisode:()=>{a(`/episode/${_n().id}?new=1`)}};I_.addEventListener(`click`,e=>{let t=e.target.closest(`a[target="_blank"]`);if(t&&je()){e.preventDefault(),Le(t.href);return}let n=e.target.closest(`a[href^="#/"]`);if(n){e.preventDefault(),a(n.getAttribute(`href`).slice(1),{replace:n.hasAttribute(`data-replace`)});return}let r=e.target.closest(`[data-action]`);if(!r||!L_)return;let i=L_.screen.actions?.[r.dataset.action]??W_[r.dataset.action];i&&(e.preventDefault(),i(r,L_.ctx,e))}),I_.addEventListener(`submit`,e=>{e.preventDefault(),L_?.screen.onSubmit?.(e.target,L_.ctx,e)}),I_.addEventListener(`change`,e=>{e.target.matches(`.option input`)&&Hc(e.target),L_?.screen.onChange?.(e.target,L_.ctx,e)}),I_.addEventListener(`input`,e=>{Id(e.target),L_?.screen.onInput?.(e.target,L_.ctx,e)});var G_=0,K_=null;function q_(){clearTimeout(K_),G_=0,al(r().path),a(`/lock`,{replace:!0})}function J_(e){if(e&&U_(),clearTimeout(K_),el()){G_=0;return}if(!at()||!il())return;let t=F().autoLockMinutes??1;e?G_&&Date.now()-G_>=t*6e4?q_():G_=0:(G_=Date.now(),t===0?q_():K_=setTimeout(()=>G_&&il()&&q_(),t*6e4))}document.addEventListener(`visibilitychange`,()=>J_(!document.hidden));var Y_=[`/today`,`/lock`,`/consent`,`/start/language`];function X_(){let e=document.getElementById(`dialog`);e.open?e.close():Y_.includes(r().path)?ku.exitApp():s(`/today`)}je()&&(ku.addListener(`appStateChange`,({isActive:e})=>J_(e)),ku.addListener(`backButton`,X_));async function Z_(){await nt(),rl(),history.state||history.replaceState({index:0},``,location.href),c(()=>z_()),Ve()}Z_();export{h as n,S as r,De as t};