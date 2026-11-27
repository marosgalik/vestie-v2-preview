(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[],t=()=>{};function n(t,n){let r=[],i=t.replace(/:(\w+)/g,(e,t)=>(r.push(t),`([^/]+)`));e.push({regex:RegExp(`^${i}$`),keys:r,screen:n})}function r(){let[e,t=``]=(location.hash.slice(1)||`/`).split(`?`);return{path:e,query:Object.fromEntries(new URLSearchParams(t))}}function i(t){for(let n of e){let e=n.regex.exec(t);if(e){let t=Object.fromEntries(n.keys.map((t,n)=>[t,decodeURIComponent(e[n+1])]));return{screen:n.screen,params:t}}}return null}function a(e,{replace:n=!1}={}){let r=history.state?.index??0;n?history.replaceState({index:r},``,`#${e}`):history.pushState({index:r+1},``,`#${e}`),t()}function o(e){history.replaceState(history.state,``,`#${e}`)}function s(e){(history.state?.index??0)>0?history.back():a(e,{replace:!0})}function c(e){t=e,window.addEventListener(`popstate`,()=>e()),e()}var l;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(l||={});var u=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},d=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,f=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?d(e):t.name,a=()=>i()!==`web`,o=e=>!!(f.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),f=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=f.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),d=s(e),p,m=async()=>(!p&&c in a?p=p=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!p&&`web`in a&&(p=p=typeof a.web==`function`?await a.web():a.web),p),h=(t,r)=>{if(d){let i=d?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new u(`"${e}" plugin is not implemented on ${c}`,l.Unimplemented)},g=t=>{let n,r=(...r)=>{let i=m().then(i=>{let a=h(i,t);if(a){let e=a(...r);return n=e?.remove,e}throw new u(`"${e}.${t}()" is not implemented on ${c}`,l.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,"name",{value:t,writable:!1,configurable:!1}),r},_=g(`addListener`),v=g(`removeListener`),y=(e,t)=>{let n=_({eventName:e},t),r=async()=>{let r=await n;v({eventName:e,callbackId:r},t)},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},b=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return d?y:_;case`removeListener`:return v;default:return g(t)}}});return r[e]=b,f.set(e,{name:e,proxy:b,platforms:new Set([...Object.keys(a),...d?[c]:[]])}),b},n.Exception=u,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},p=(e=>e.Capacitor=f(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),m=p.registerPlugin,h=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new p.Exception(e,l.Unimplemented)}unavailable(e=`not available`){return new p.Exception(e,l.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},g=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),_=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),v=class extends h{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=_(n).trim(),r=_(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=g(e.key),n=g(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};m(`CapacitorCookies`,{web:()=>new v});var y=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),b=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},x=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,S=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=b(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},C=class extends h{async request(e){let t=S(e,e.webFetchExtra),n=x(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await y(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};m(`CapacitorHttp`,{web:()=>new C});var w;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(w||={});var T;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(T||={});var E=class extends h{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};m(`SystemBars`,{web:()=>new E});var D=`modulepreload`,ee=function(e,t){return new URL(e,t).href},te={},ne=function(e){return e.pathname.endsWith(`.css`)},re=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},O=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=ee(t,n);let r=s(t),i=ne(r);return re(te,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:D,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},ie=m(`Preferences`,{web:()=>O(()=>import(`./web-CuXy5JVp.js`).then(e=>new e.PreferencesWeb),[],import.meta.url)}),ae=new TextEncoder,oe=new TextDecoder,se=6e5;function ce(e){let t=new Uint8Array(e),n=``;for(let e=0;e<t.length;e+=32768)n+=String.fromCharCode(...t.subarray(e,e+32768));return btoa(n)}var le=e=>Uint8Array.from(atob(e),e=>e.charCodeAt(0)),ue=e=>crypto.getRandomValues(new Uint8Array(e)),de=()=>ce(ue(16));async function fe(e,t,n=se){let r=typeof e==`string`?ae.encode(e):e,i=await crypto.subtle.importKey(`raw`,r,`PBKDF2`,!1,[`deriveKey`]);return crypto.subtle.deriveKey({name:`PBKDF2`,salt:le(t),iterations:n,hash:`SHA-256`},i,{name:`AES-GCM`,length:256},!1,[`wrapKey`,`unwrapKey`])}var pe=()=>crypto.subtle.generateKey({name:`AES-GCM`,length:256},!0,[`encrypt`,`decrypt`]);async function me(e,t){let n=ue(12),r=await crypto.subtle.wrapKey(`raw`,e,t,{name:`AES-GCM`,iv:n});return{iv:ce(n),key:ce(r)}}function he(e,t){return crypto.subtle.unwrapKey(`raw`,le(e.key),t,{name:`AES-GCM`,iv:le(e.iv)},{name:`AES-GCM`,length:256},!0,[`encrypt`,`decrypt`])}async function ge(e,t){let n=ue(12),r=await crypto.subtle.encrypt({name:`AES-GCM`,iv:n},t,ae.encode(JSON.stringify(e)));return{enc:1,iv:ce(n),data:ce(r)}}async function _e(e,t){let n=await crypto.subtle.decrypt({name:`AES-GCM`,iv:le(e.iv)},t,le(e.data));return JSON.parse(oe.decode(n))}async function ve(e,t,n){let r=await crypto.subtle.importKey(`raw`,ae.encode(e),`PBKDF2`,!1,[`deriveKey`]);return crypto.subtle.deriveKey({name:`PBKDF2`,salt:le(t),iterations:n,hash:`SHA-256`},r,{name:`AES-GCM`,length:256},!1,[`encrypt`,`decrypt`])}async function ye(e,t){let n=de(),r=await ve(t,n,se);return{kdf:{name:`PBKDF2-SHA-256`,salt:n,iterations:se},cipher:{name:`AES-256-GCM`,...await ge(e,r)}}}async function be({kdf:e,cipher:t},n){return _e(t,await ve(n,e.salt,e.iterations))}var xe=`support@vestibularnamigrena.sk`,Se={facebook:`https://www.facebook.com/groups/3261623930593764`,instagram:`https://www.instagram.com/vestibularnamigrena/`,discord:`https://discord.gg/AMz5vd5HRr`,web:`https://www.vestibularnamigrena.sk/`},Ce=m(`App`,{web:()=>O(()=>import(`./web-DyMeDBqc.js`).then(e=>new e.AppWeb),[],import.meta.url)}),we=m(`Browser`,{web:()=>O(()=>import(`./web-CmUFKC4C.js`).then(e=>new e.BrowserWeb),[],import.meta.url)});function Te(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,n){return new Proxy({},{get(t,r){return(t,i,a)=>{let o=e.Capacitor.Plugins[n];o===void 0?a(Error(`Capacitor plugin ${n} not found`)):typeof o[r]==`function`?(async()=>{try{i(await o[r](t))}catch(e){a(e)}})():a(Error(`Method ${r} not found in Capacitor plugin ${n}`))}}})}})}function Ee(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,n){return e.cordova.plugins[n]}})}function De(e=!1){typeof window>`u`||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?Te(window):window.cordova!==void 0&&Ee(window))}var Oe;(function(e){e.Documents=`DOCUMENTS`,e.Data=`DATA`,e.Library=`LIBRARY`,e.Cache=`CACHE`,e.External=`EXTERNAL`,e.ExternalStorage=`EXTERNAL_STORAGE`,e.ExternalCache=`EXTERNAL_CACHE`,e.LibraryNoCloud=`LIBRARY_NO_CLOUD`,e.Temporary=`TEMPORARY`})(Oe||={});var ke;(function(e){e.UTF8=`utf8`,e.ASCII=`ascii`,e.UTF16=`utf16`})(ke||={});var Ae=m(`Filesystem`,{web:()=>O(()=>import(`./web-DxGm7SGV.js`).then(e=>new e.FilesystemWeb),[],import.meta.url)});De();var je=m(`PrivacyScreen`,{web:()=>O(()=>import(`./web-CuWXBIfc-BneTvakr.js`).then(e=>new e.PrivacyScreenWeb),[],import.meta.url)}),Me=m(`Share`,{web:()=>O(()=>import(`./web-BUkWsn4l.js`).then(e=>new e.ShareWeb),[],import.meta.url)}),Ne=()=>p.isNativePlatform();async function Pe(){if(!Ne())return`0.1.0`;let{version:e,build:t}=await Ce.getInfo();return`${e} (${t})`}var Fe=m(`VestiePrint`),Ie=m(`VestieLocation`),Le=m(`VestieKeystore`),Re=`vestie-`,ze=()=>p.getPlatform()===`android`;async function Be(e,{create:t=!1}={}){try{let{mac:n}=await Le.mac({data:e,create:t});return n}catch(e){throw Object.assign(Error(`keystore`),{code:e?.code===`MISSING`?`missing`:`unavailable`})}}async function Ve(){try{return(await Le.hasKey()).hasKey}catch{return null}}async function He(){if(ze())try{await Le.remove()}catch(e){console.error(`[native] Kľúč v Keystore sa nepodarilo zmazať`,e)}}var Ue=()=>p.getPlatform()===`android`;async function We({ask:e=!0}={}){try{return await Ie.getCurrentPosition({ask:e})}catch(e){throw Error(e?.code===`DENIED`?`denied`:`unavailable`)}}function Ge(e){return we.open({url:e})}async function Ke(e){Ne()?await Fe.print({name:e}):window.print()}async function qe(e,t){let{uri:n}=await Ae.writeFile({path:`${Re}${e}`,data:t,directory:Oe.Cache,encoding:ke.UTF8});try{return await Me.share({files:[n]}),!0}catch{return!1}}async function Je(e,t,n=`application/json`){if(Ne())return qe(e,t);let r=URL.createObjectURL(new Blob([t],{type:n})),i=document.createElement(`a`);return i.href=r,i.download=`${Re}${e}`,document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3),!0}async function Ye(){if(Ne())try{let{files:e}=await Ae.readdir({path:``,directory:Oe.Cache}),t=e.filter(e=>e.name.startsWith(Re));await Promise.all(t.map(e=>Ae.deleteFile({path:e.name,directory:Oe.Cache})))}catch(e){console.error(`[native] Dočasné súbory sa nepodarilo vymazať`,e)}}function Xe(e){return new Promise(t=>{let n=document.createElement(`input`);n.type=`file`,n.accept=e,n.addEventListener(`change`,()=>t(n.files[0]??null),{once:!0}),n.addEventListener(`cancel`,()=>t(null),{once:!0}),n.click()})}async function Ze(e){if(Ne())try{e?await je.enable():await je.disable()}catch(e){console.error(`[native] Ochranu obrazovky sa nepodarilo nastaviť`,e)}}var Qe=`vm2:data`,$e=`vm2:lock`,et=5,tt=3e4,nt=9e5,rt=null,it=Promise.resolve(),at=new Map;function ot(e){return Ne()?at.get(e)??null:localStorage.getItem(e)}function st(e){e().catch(e=>console.error(`[storage] Dáta sa nepodarilo uložiť`,e))}function ct(e,t){Ne()?(at.set(e,t),st(()=>ie.set({key:e,value:t}))):localStorage.setItem(e,t)}function lt(e){Ne()?(at.delete(e),st(()=>ie.remove({key:e}))):localStorage.removeItem(e)}async function ut(){if(Ne())for(let e of[Qe,$e]){let{value:t}=await ie.get({key:e}),n=t===null?localStorage.getItem(e):null;n!==null&&(await ie.set({key:e,value:n}),localStorage.removeItem(e));let r=t??n;r!==null&&at.set(e,r)}await Ze(pt())}function dt(e){try{let t=ot(e);return t?JSON.parse(t):null}catch(e){return console.error(`[storage] Dáta sa nepodarilo načítať`,e),null}}function ft(e,t){try{ct(e,JSON.stringify(t))}catch(e){console.error(`[storage] Dáta sa nepodarilo uložiť`,e)}}var pt=()=>!!dt($e),mt=()=>!pt()||!!rt,ht=()=>dt($e)?.language??null,gt=()=>dt($e)?.theme??null;function _t({language:e,theme:t}){let n=dt($e);n&&ft($e,{...n,...e?{language:e}:{},...t?{theme:t}:{}})}var vt=()=>dt($e)?.blockedUntil??0;function yt(e){let t=(e.failed??0)+1,n=t-et,r=n>=0?Date.now()+Math.min(tt*2**n,nt):0;return ft($e,{...e,failed:t,blockedUntil:r}),{failed:t,blockedUntil:r,remaining:Math.max(et-t,0)}}var bt=class extends Error{constructor(e,t={}){super(e),this.code=e,Object.assign(this,t)}},xt=new TextEncoder,St=!1;async function Ct(e,t,n,{create:r=!1}={}){return n?le(await Be(ce(xt.encode(`${t}:${e}`)),{create:r})):e}async function wt(e,t){let n=de(),r=ze()&&!St,i=e;if(r)try{i=await Ct(e,n,!0,{create:!0})}catch(e){console.error(`[storage] Keystore nie je dostupný, PIN sa nenaviaže na telefón`,e),St=!0,r=!1}let a=await me(t,await fe(i,n));return{v:r?2:1,ks:r,salt:n,iterations:se,wrapped:a}}async function Tt(e){let t=dt($e);if(!t)throw new bt(`wrong`);if(t.blockedUntil&&t.blockedUntil>Date.now())throw new bt(`blocked`,{blockedUntil:t.blockedUntil});let n;try{n=await Ct(e,t.salt,t.ks)}catch(e){throw new bt(e?.code===`missing`?`moved`:`device`)}try{let e=await fe(n,t.salt,t.iterations),r=await he(t.wrapped,e);return ft($e,{...t,failed:0,blockedUntil:0}),{key:r,meta:t}}catch{throw new bt(`wrong`,yt(dt($e)))}}async function Et(e,t){if(ze()&&!St)try{let n=await wt(e,t);n.ks&&ft($e,{...dt($e),...n,failed:0,blockedUntil:0})}catch(e){console.error(`[storage] PIN sa nepodarilo naviazať na telefón`,e)}}async function Dt(){return!dt($e)?.ks||!ze()?!1:await Ve()===!1}function Ot(){if(pt())return null;let e=dt(Qe);return e?.enc?null:e}function kt(e){if(!pt()){ft(Qe,e);return}if(!rt)return;let t=ge(e,rt);it=it.then(()=>t).then(e=>ft(Qe,e)).catch(e=>console.error(`[storage] Dáta sa nepodarilo zašifrovať`,e))}async function At(e){let{key:t,meta:n}=await Tt(e),r=dt(Qe),i=r?.enc?await _e(r,t):r;return rt=t,n.ks||await Et(e,t),i}async function jt(e){return await Tt(e),!0}async function Mt(e,t,{language:n,theme:r}={}){let i=await pe(),a=await wt(e,i),o=await ge(t,i);await it,ft($e,{...a,language:n,theme:r,failed:0,blockedUntil:0}),ft(Qe,o),rt=i,await Ze(!0)}async function Nt(e){if(!dt($e)||!rt)return;let t=await wt(e,rt);ft($e,{...dt($e),...t,failed:0,blockedUntil:0})}async function Pt(e){await it,ft(Qe,e),lt($e),rt=null,await He(),await Ze(!1)}function Ft(){rt=null}function It(){rt=null;try{lt(Qe),lt($e)}catch(e){console.error(`[storage] Dáta sa nepodarilo vymazať`,e)}He(),Ze(!1)}var Lt=e=>String(e).padStart(2,`0`);function k(e=new Date){let t=new Date(e);return`${t.getFullYear()}-${Lt(t.getMonth()+1)}-${Lt(t.getDate())}`}function A(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function Rt(e=new Date){let t=new Date(e);return`${Lt(t.getHours())}:${Lt(t.getMinutes())}`}function zt(e,t=`12:00`){let n=A(e),[r,i]=t.split(`:`).map(Number);return n.setHours(r||0,i||0,0,0),n.toISOString()}function j(e,t){let n=new Date(e);return n.setDate(n.getDate()+t),n}var Bt=(e,t)=>k(e)===k(t),Vt=e=>Bt(e,new Date),Ht=(e=new Date)=>k(e).slice(0,7);function Ut(e){let[t,n]=e.split(`-`).map(Number);return new Date(t,n-1,1)}function Wt(e,t){let n=Ut(e);return n.setMonth(n.getMonth()+t),Ht(n)}function Gt(e,t){let n=[];for(let r=A(e);k(r)<=t;r=j(r,1))n.push(k(r));return n}var Kt=1;function qt(){return{schemaVersion:Kt,settings:{language:null,onboardingCompletedAt:null,name:``,nameSetAt:null,goals:[],condition:null,cycleTracking:null,reminder:{enabled:!1,time:`20:00`},theme:`system`,demoSeededAt:null,demoEnabled:!0,consent:null,autoLockMinutes:1,plus:{active:!1,plan:null,startedAt:null,trialEndsAt:null,simulated:!1,storeLinked:!1,orderId:null,confirmation:null},weather:{enabled:!1,source:null,lat:null,lon:null,placeLabel:``,consentAt:null,updatedAt:null},health:{connected:!1,provider:null,types:[],consentAt:null,lastSyncAt:null},forecast:{enabled:!1,notify:!0,time:`19:00`,alerts:[`pressure_drop`]},backup:{lastAt:null,remind:!0,snoozedUntil:null}},medications:[],medicationIntakes:[],episodes:[],symptomLogs:[],sleepLogs:[],cycleEntries:[],customSymptoms:[],customTriggers:[],weatherDays:[],healthDays:[]}}function Jt(e){let t=qt();if(!e)return t;let n={...t,...e,schemaVersion:Kt,settings:{...t.settings,...e.settings}};return n.weatherDays=n.weatherDays.filter(e=>e.source!==`demo`),n.healthDays=n.healthDays.filter(e=>!String(e.id).startsWith(`demo-`)),n.sleepLogs=n.sleepLogs.map(e=>String(e.id).startsWith(`demo-`)?{...e,source:`manual`,bedtime:null,wakeTime:null,externalId:null}:e),n.settings.weather.source===`demo`&&(n.settings.weather=t.settings.weather),n.settings.health.simulated&&(n.settings.health=t.settings.health),n.healthDays=n.healthDays.map(({restingHr:e,...t})=>t),n.settings.health={...n.settings.health,types:(n.settings.health.types??[]).filter(e=>e!==`restingHr`)},n.settings.forecast={...t.settings.forecast,...n.settings.forecast},n}var M=qt();function Yt(e){M=Jt(e)}function Xt(){Zt+=1,M=qt()}var Zt=0,Qt=()=>Zt;function N(){kt(M)}var $t=()=>globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`,en=()=>new Date().toISOString();function tn(e){let t=en();return{id:$t(),createdAt:t,updatedAt:t,...e}}var nn=e=>(t,n)=>n[e].localeCompare(t[e]),P=()=>M.settings;function rn(e){M.settings={...M.settings,...e},N()}var an=()=>!!M.settings.onboardingCompletedAt;function on(){rn({onboardingCompletedAt:en()})}var sn=()=>M.medications,cn=e=>M.medications.find(t=>t.id===e)??null;function ln({name:e=``,type:t,dose:n=``,frequency:r=``,note:i=``,startDate:a=null,endDate:o=null}){return{name:String(e).trim(),type:t===`acute`?`acute`:`preventive`,dose:String(n).trim(),frequency:String(r).trim(),note:String(i).trim(),startDate:a||null,endDate:o||null}}function un(e){let t=tn(ln(e));return M.medications.push(t),N(),t}function dn(e,t){let n=cn(e);return n?(Object.assign(n,ln({...n,...t}),{updatedAt:en()}),N(),n):null}function fn(e){let t={medication:cn(e),intakes:M.medicationIntakes.filter(t=>t.medicationId===e)};return M.medications=M.medications.filter(t=>t.id!==e),M.medicationIntakes=M.medicationIntakes.filter(t=>t.medicationId!==e),N(),t}function pn(e){e?.medication&&!cn(e.medication.id)&&(M.medications.push(e.medication),M.medicationIntakes.push(...e.intakes),N())}function mn(e){return M.medicationIntakes.filter(t=>!e||t.medicationId===e).sort(nn(`takenAt`))}var hn=e=>M.medicationIntakes.find(t=>t.id===e)??null;function gn(e){return M.episodes.find(t=>t.startedAt<=e&&(!t.endedAt||t.endedAt>=e))??null}function _n({medicationId:e,takenAt:t,dose:n=``,effect:r=null,note:i=``}){return{medicationId:e,takenAt:t,dose:String(n).trim(),effect:r||null,note:String(i).trim(),episodeId:gn(t)?.id??null}}function vn(e){let t=tn(_n(e));return M.medicationIntakes.push(t),N(),t}function yn(e,t){let n=hn(e);return n?(Object.assign(n,_n({...n,...t}),{updatedAt:en()}),N(),n):null}function bn(e){let t=hn(e);return M.medicationIntakes=M.medicationIntakes.filter(t=>t.id!==e),N(),t}function xn(e){e&&!hn(e.id)&&(M.medicationIntakes.push(e),N())}var Sn=e=>M.symptomLogs.find(t=>t.id===e)??null,Cn=e=>M.symptomLogs.filter(t=>t.episodeId===e).sort(nn(`occurredAt`));function wn({id:e,occurredAt:t,symptoms:n,vertigoType:r=null,duration:i=null,note:a=``,episodeId:o=null}){let s={occurredAt:t,symptoms:n.map(({key:e,intensity:t})=>({key:e,intensity:t??null})),vertigoType:r,duration:i,note:String(a).trim(),episodeId:o},c=e?Sn(e):null;if(c)return Object.assign(c,s,{updatedAt:en()}),N(),c;let l=tn(s);return M.symptomLogs.push(l),N(),l}function Tn(e){let t=Sn(e);return M.symptomLogs=M.symptomLogs.filter(t=>t.id!==e),N(),t}function En(e){e&&!Sn(e.id)&&(M.symptomLogs.push(e),N())}function Dn(e){let t=e.symptoms.map(e=>e.intensity).filter(e=>e!=null);return t.length?Math.max(...t):null}var On=()=>M.customSymptoms,kn=e=>M.customSymptoms.find(t=>t.key===e)??null;function An(e){let t=String(e).trim().slice(0,40);if(!t)return null;let n=M.customSymptoms.find(e=>e.label.toLocaleLowerCase()===t.toLocaleLowerCase());if(n)return n;let r={key:`custom:${$t()}`,label:t,createdAt:en()};return M.customSymptoms.push(r),N(),r}var jn=e=>M.episodes.find(t=>t.id===e)??null;function Mn(){return M.episodes.filter(e=>!e.endedAt).sort(nn(`startedAt`))[0]??null}function Nn(){let e=tn({startedAt:en(),endedAt:null,type:null,intensity:null,symptoms:[],vertigoTypes:[],triggers:[],triggerOther:``,medicationIntakeIds:[],helped:null,relief:[],reliefOther:``,impact:[],impactOther:``,note:``});return M.episodes.push(e),N(),e}function Pn(e,t){let n=jn(e);return n?(Object.assign(n,t,{updatedAt:en()}),N(),n):null}var Fn=e=>Pn(e,{endedAt:en()}),In=(e,t)=>Pn(e,t),Ln=e=>mn().filter(t=>t.episodeId===e),Rn=e=>Pn(e,{endedAt:null});function zn(e){let t=jn(e);return M.episodes=M.episodes.filter(t=>t.id!==e),N(),t}function Bn(e){e&&!jn(e.id)&&(M.episodes.push(e),N())}var Vn=e=>M.cycleEntries.some(t=>t.date===e&&t.type===`period`);function Hn(e){return Vn(e)?M.cycleEntries=M.cycleEntries.filter(t=>t.date!==e||t.type!==`period`):M.cycleEntries.push({id:$t(),date:e,type:`period`,createdAt:en()}),N(),Vn(e)}var Un=e=>M.sleepLogs.find(t=>t.date===e)??null;function Wn({date:e,minutes:t,quality:n=null,note:r=``}){let i={date:e,minutes:Math.max(0,Math.round(t)),quality:n||null,note:String(r).trim(),source:`manual`},a=Un(e);if(a)return Object.assign(a,i,{updatedAt:en()}),N(),a;let o=tn({...i,bedtime:null,wakeTime:null,externalId:null});return M.sleepLogs.push(o),N(),o}function Gn(e){let t=Un(e);return M.sleepLogs=M.sleepLogs.filter(t=>t.date!==e),N(),t}function Kn(e){e&&!Un(e.date)&&(M.sleepLogs.push(e),N())}var F=()=>!!M.settings.plus.active;function qn({plan:e,simulated:t=!1,trialEndsAt:n=null,startedAt:r=null,orderId:i=null}){M.settings.plus={...M.settings.plus,active:!0,plan:e,startedAt:r??new Date().toISOString(),trialEndsAt:n,simulated:t,orderId:i,confirmation:M.settings.plus.active&&M.settings.plus.orderId===i?M.settings.plus.confirmation??null:null},N()}var Jn=()=>!!M.settings.plus.storeLinked;function Yn(){Jn()||(M.settings.plus={...M.settings.plus,storeLinked:!0},N())}function Xn(){let{active:e,trialEndsAt:t}=M.settings.plus;return e&&t&&new Date(t)>new Date?t:null}function Zn(e=new Date){if(!M.settings.plus.active)return null;let t=Qn();return t&&t>=e?t:null}function Qn(){let{startedAt:e}=M.settings.plus;if(!e)return null;let t=j(new Date(e),14);return t.setHours(23,59,59,999),t}function $n(){M.settings.plus={...qt().settings.plus,storeLinked:Jn()},M.settings.weather={...qt().settings.weather},N()}function er({text:e,termsVersion:t}){M.settings.plus.active&&!M.settings.plus.confirmation&&(M.settings.plus={...M.settings.plus,confirmation:{text:e,savedAt:en(),termsVersion:t}},N())}var tr=e=>M.weatherDays.find(t=>t.date===e)??null;function nr({source:e,lat:t=null,lon:n=null,placeLabel:r=``}){M.settings.weather={enabled:!0,source:e,lat:t,lon:n,placeLabel:r,consentAt:en(),updatedAt:en()},N()}function rr(){M.settings.weather={...qt().settings.weather},N()}function ir(e,t=null){let n=new Map(M.weatherDays.map(e=>[e.date,e]));for(let t of e){let e=n.get(t.date);n.set(t.date,e?{...e,...t,updatedAt:en()}:tn(t))}M.weatherDays=[...n.values()],M.settings.weather={...M.settings.weather,...t??{},updatedAt:en()},N()}var ar=e=>M.healthDays.find(t=>t.date===e)??null;function or({provider:e,types:t}){M.settings.health={connected:!0,provider:e,types:t,consentAt:en(),lastSyncAt:null},N()}function sr(){M.settings.health={...qt().settings.health},N()}function cr(e){M.settings.health={...M.settings.health,types:e},N()}function lr({sleepLogs:e=[],healthDays:t=[]}){for(let t of e){let e=Un(t.date);(!e||e.source!==`manual`||hr(e))&&(e&&!hr(e)?Object.assign(e,t,{updatedAt:en()}):(e&&(M.sleepLogs=M.sleepLogs.filter(t=>t!==e)),M.sleepLogs.push(tn({quality:null,note:``,...t}))))}for(let e of t){let t=ar(e.date);t?Object.assign(t,e,{updatedAt:en()}):M.healthDays.push(tn(e))}M.settings.health={...M.settings.health,lastSyncAt:en()},N()}function ur(e){M.settings.forecast={...M.settings.forecast,...e},N()}var dr=()=>M;function fr(e){return{episodes:M.episodes.filter(t=>k(t.startedAt)===e).sort(nn(`startedAt`)),symptomLogs:M.symptomLogs.filter(t=>k(t.occurredAt)===e).sort(nn(`occurredAt`)),intakes:M.medicationIntakes.filter(t=>k(t.takenAt)===e).sort(nn(`takenAt`)),sleep:Un(e),period:Vn(e)}}function pr(e=new Date){let t=fr(k(e)),n=Mn();return n&&!t.episodes.includes(n)&&t.episodes.unshift(n),t}var mr=[`medications`,`episodes`,`symptomLogs`,`medicationIntakes`,`sleepLogs`,`cycleEntries`],hr=e=>String(e.id).startsWith(`demo-`);function gr(){M.settings.name!==`Simona`||M.settings.nameSetAt||(M.settings={...M.settings,name:``},N())}function _r({records:e}){for(let t of mr)M[t]=[...M[t].filter(e=>!hr(e)),...e[t]];M.settings={...M.settings,demoSeededAt:k(),demoEnabled:!0},gr(),N()}function vr(){for(let e of mr)M[e]=M[e].filter(e=>!hr(e));M.medicationIntakes=M.medicationIntakes.filter(e=>!String(e.medicationId).startsWith(`demo-`)),M.settings={...M.settings,demoEnabled:!1},N()}var yr=e=>typeof e==`string`&&Number.isFinite(new Date(e).getTime()),br=e=>typeof e==`string`&&/^\d{4}-\d{2}-\d{2}$/.test(e),xr={medications:e=>typeof e.name==`string`,medicationIntakes:e=>yr(e.takenAt),episodes:e=>yr(e.startedAt)&&(e.endedAt==null||yr(e.endedAt)),symptomLogs:e=>yr(e.occurredAt)&&Array.isArray(e.symptoms),sleepLogs:e=>br(e.date)&&Number.isFinite(e.minutes),cycleEntries:e=>br(e.date),customSymptoms:e=>typeof e.key==`string`&&typeof e.label==`string`,weatherDays:e=>br(e.date),healthDays:e=>br(e.date)},Sr=e=>!!e&&typeof e==`object`&&typeof e.schemaVersion==`number`&&!!e.settings&&typeof e.settings==`object`,Cr=e=>Sr(e)&&e.schemaVersion>Kt;function wr(e){if(!Sr(e)||e.schemaVersion>Kt)return!1;let t=qt();return Object.keys(t).filter(e=>Array.isArray(t[e])).every(t=>{if(e[t]===void 0)return!0;if(!Array.isArray(e[t]))return!1;let n=xr[t];return e[t].every(e=>!!e&&typeof e==`object`&&(!n||n(e)))})}function Tr(e){let t=Jt(e),{plus:n,consent:r,health:i,weather:a,autoLockMinutes:o,onboardingCompletedAt:s,language:c,backup:l}=M.settings;M={...t,settings:{...t.settings,plus:n,consent:r,health:i,weather:a,autoLockMinutes:o,onboardingCompletedAt:s,language:t.settings.language??c,backup:{...l,lastAt:en(),snoozedUntil:null}}},N()}function Er(){M.settings.backup={...M.settings.backup,lastAt:en(),snoozedUntil:null},N()}function Dr(e){M.settings.backup={...M.settings.backup,remind:e,snoozedUntil:null},N()}function Or(e){M.settings.backup={...M.settings.backup,snoozedUntil:j(new Date,e).toISOString()},N()}function kr(){Zt+=1,It(),M=qt()}var Ar=365,jr=56,Mr=[2,9,16,24,33,41,50],Nr=[{key:`betahistine`,name:`Betahistín`,type:`preventive`,dose:`24 mg`,frequency:`2× denne`,since:95,cs:{name:`Betahistin`,frequency:`2× denně`},en:{name:`Betahistine`,frequency:`twice a day`}},{key:`magnesium`,name:`Magnézium`,type:`preventive`,dose:`300 mg`,frequency:`1× denne večer`,since:60,cs:{name:`Hořčík`,frequency:`1× denně večer`},en:{name:`Magnesium`,frequency:`once a day, evening`}},{key:`ibuprofen`,name:`Ibuprofén`,type:`acute`,dose:`400 mg`,frequency:`podľa potreby`,cs:{name:`Ibuprofen`,frequency:`podle potřeby`},en:{name:`Ibuprofen`,frequency:`as needed`}},{key:`dimenhydrinate`,name:`Dimenhydrinát`,type:`acute`,dose:`50 mg`,frequency:`pri nevoľnosti`,cs:{name:`Dimenhydrinát`,frequency:`při nevolnosti`},en:{name:`Dimenhydrinate`,frequency:`for nausea`}}],Pr={sk:[`Začalo v obchode pri regáloch, pomohlo ľahnúť si do tmy.`,`Celý deň pri počítači, večer sa to rozbehlo.`,`Pred tým som zle spala.`,``,``],cs:[`Začalo to v obchodě mezi regály, pomohlo lehnout si do tmy.`,`Celý den u počítače, večer se to rozjelo.`,`Předtím jsem špatně spala.`,``,``],en:[`It started in a shop between the shelves, lying down in the dark helped.`,`All day at the computer, it got going in the evening.`,`I slept badly the night before.`,``,``]},Fr=[[`dizziness`,2,4],[`brain_fog`,2,4],[`fatigue`,3,4],[`unsteadiness`,2,4],[`tinnitus`,1,3],[`ear_pressure`,2,3],[`rocking`,2,4],[`floating`,2,3],[`headache`,2,4]],Ir=[`weather_change`,`stress`,`screen_time`,`skipped_meal`,`visual_stimulation`,`dehydration`,`bright_light`,`neck_pain`,`long_sleep`],Lr=[7,9,11,13,14,15,16,16,17,17,18,18,19,20,21];function Rr(e){return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function zr(e){let t=[];for(let n=20;n<Ar;){for(let e=0;e<4;e++)t.push(n-e);n+=n===20?28:27+Math.floor(e()*4)}return t}function Br(e=new Date,t=`sk`){let n=e=>e[t]??e,r=Rr(20261019),i=(e,t)=>Math.round(e+r()*(t-e)),a=e=>r()<e,o=e=>e[Math.floor(r()*e.length)],s=0,c=e=>`demo-${e}-${++s}`,l=(t,n,r=0)=>{let i=j(e,-t);return i.setHours(n,r,0,0),i<=e?i:null},u=(e,t)=>new Date(e.getTime()+t*6e4),d=e=>({createdAt:e.toISOString(),updatedAt:e.toISOString()}),f=t=>k(j(e,-t)),p=Nr.map(t=>{let r=j(e,-(t.since??90));return{id:`demo-med-${t.key}`,...d(r),name:n(t).name,type:t.type,dose:t.dose,frequency:n(t).frequency,note:``,startDate:t.since?k(r):null,endDate:null}}),m=e=>p.find(t=>t.id===`demo-med-${e}`),h=Rr(20261102),g=Rr(20261103),_=e=>h()<e,v=(e,t)=>Math.round(e+h()*(t-e)),y=zr(g),b=e=>y.some(t=>Math.abs(t-e)<=1),x=new Map;for(let e=0;e<Ar;e++){if(e>3&&!_(.88))continue;let t=Mr.includes(e)?_(.6):_(e<jr?.08:.14);x.set(e,t?v(60,71)*5:v(74,100)*5)}let S=[];for(let e=364;e>=jr;e--){if(S.at(-1)===e+1)continue;let t=(x.get(e)??450)<360,n=.07;t&&(n+=.25),b(e)&&(n+=.12),e>95&&(n*=1.25),g()<n&&S.push(e)}let C=[...S,...[...Mr].reverse()],w=[],T=Rr(20261026),E=e=>e[Math.floor(T()*e.length)],D=(e,t)=>[...new Set(Array.from({length:1+Math.floor(T()*t)},()=>E(e)))],ee=e=>({type:E([`vestibular`,`vestibular`,`vestibular`,`migraine_headache`,`migraine_headache`]),helped:e,relief:D([`rest`,`sleep`,`dark_room`,`dark_room`,`hydration`,`relaxation`,`cold_compress`,`shower`],2),impact:D([`work_study`,`daily_activities`,`daily_activities`,`social`,`movement`,`sleep`,`rest`],2)}),te=[],ne=[],re=[],O=(e,t,{effect:n=null,episodeId:r=null}={})=>{t&&ne.push({id:c(`intake`),...d(t),medicationId:e.id,takenAt:t.toISOString(),dose:e.dose,effect:n,note:``,episodeId:r})},ie=(e,t,n={})=>{e&&te.push({id:c(`log`),...d(e),occurredAt:e.toISOString(),symptoms:t,vertigoType:null,duration:null,note:``,episodeId:null,...n})};for(let n of C){let r=l(n,n<jr?i(13,19):o(Lr),o([0,15,30,45]));if(!r)continue;let s=i(18,66)*5,f=u(r,s),p=i(5,8),h=new Set([o(Ir)]);a(.45)&&h.add(o(Ir)),(x.get(n)??450)<360&&a(.7)&&h.add(`poor_sleep`),b(n)&&h.add(`menstrual_cycle`);let g=c(`episode`),_={id:g,...d(r),startedAt:r.toISOString(),endedAt:f<=e?f.toISOString():null,type:null,intensity:p,symptoms:[],vertigoTypes:[],triggers:[...h],triggerOther:``,medicationIntakeIds:[],helped:null,relief:[],impact:[],note:``};w.push(_);let v=i(3,6),y=[{key:`vertigo`,intensity:p},{key:`nausea`,intensity:v}];a(.6)&&y.push(o([{key:`light_sensitivity`,intensity:i(3,6)},{key:`headache`,intensity:i(3,7)},{key:`sound_sensitivity`,intensity:i(2,5)}])),ie(u(r,10),y,{episodeId:g,duration:s<180?`1_3h`:s<360?`3_6h`:`6_12h`,note:o(Pr[t]??Pr.sk)}),a(.4)&&f<=e&&ie(u(f,-20),[{key:`fatigue`,intensity:i(4,6)},{key:`brain_fog`,intensity:i(3,5)}],{episodeId:g});let S=o([`helped`,`partly`,`helped`,`not_helped`,`partly`]);O(m(v>=4?`dimenhydrinate`:`ibuprofen`),u(r,35),{effect:S,episodeId:g}),n!==Mr[0]&&Object.assign(_,ee(S))}for(let t=0;t<Ar;t++){let n=f(t),r=C.includes(t),s=x.get(t);if(s!=null){let r=s>=430?a(.85)?`good`:`fair`:s>=380?`fair`:`poor`,i=j(e,-t);i.setHours(6,30,0,0),re.push({id:c(`sleep`),...d(i<=e?i:e),date:n,minutes:s,quality:r,note:``,bedtime:null,wakeTime:null,source:`manual`,externalId:null})}if(t===0)ie(l(0,9,15)??u(e,-20),[{key:`brain_fog`,intensity:3},{key:`fatigue`,intensity:4}]);else if(!r&&a(.32)){let e=a(.35)?2:1,n=[];for(;n.length<e;){let[e,t,r]=o(Fr);n.some(t=>t.key===e)||n.push({key:e,intensity:a(.8)?i(t,r):null})}ie(l(t,i(8,20),o([0,10,20,30,40,50])),n,{duration:a(.6)?o([`moment`,`under_1h`,`under_1h`,`1_3h`]):null})}t<95&&a(.65)&&O(m(`betahistine`),l(t,8,i(0,40))),t<95&&a(.35)&&O(m(`betahistine`),l(t,20,i(0,30))),t<60&&a(.4)&&O(m(`magnesium`),l(t,21,i(0,30)))}return{records:{medications:p,episodes:w,symptomLogs:te,medicationIntakes:ne,sleepLogs:re,cycleEntries:y.map(t=>({id:c(`cycle`),date:f(t),type:`period`,createdAt:j(e,-t).toISOString()}))}}}var Vr={sk:{app:{name:`Vestie`,logo:`Vestie – Vestibulárna migréna`},common:{continue:`Pokračovať`,skip:`Preskočiť`,back:`Späť`,save:`Uložiť`,cancel:`Zrušiť`,close:`Zavrieť`,yes:`Áno`,undo:`Vrátiť`,optional:`nepovinné`,on:`Zapnuté`,off:`Vypnuté`,stepOf:`Krok {step} z {total}`},language:{title:`Vyber si jazyk`,sk:`Slovenčina`,cs:`Čeština`,en:`English`},welcome:{title:`Tvoj denník príznakov`,text:`Zapisuj príznaky, epizódy, lieky a spánok. Appka ich zoradí do kalendára a prehľadov a pripraví report, ktorý môžeš ukázať lekárovi.`,cta:`Začať`},goals:{title:`Na čo chceš aplikáciu používať?`,lead:`Vyber, čo je pre teba dôležité. Môžeš zvoliť viac možností alebo pokračovať bez výberu.`,options:{symptoms:`Zaznamenávať príznaky`,triggers:`Zaznamenávať možné spúšťače`,patterns:`Porozumieť svojim ťažkostiam`,doctor:`Pripraviť prehľad pre lekára`}},condition:{title:`Čo chceš sledovať?`,lead:`Výber slúži len na prispôsobenie obsahu, nejde o diagnózu. Môžeš ho kedykoľvek zmeniť v Profile.`,options:{vestibular_migraine:`Vestibulárna migréna`,migraine:`Migréna`,other_vestibular:`Iné vestibulárne ochorenie`,unsure:`Nie som si istý/istá`}},cycle:{title:`Chceš sledovať menštruačný cyklus?`,lead:`Táto funkcia je voliteľná. Neskôr ju môžeš zapnúť alebo vypnúť v nastaveniach.`,yes:`Áno`,no:`Nie`},medications:{title:`Chceš pridať svoje lieky?`,lead:`Môžeš pridať lieky, ktoré užívaš preventívne alebo pri akútnych ťažkostiach. Tento krok môžeš vynechať a lieky pridať neskôr.`,add:`Pridať lieky`,addAnother:`Pridať ďalší liek`,added:`Pridané lieky`,remove:`Odstrániť liek {name}`,disclaimer:`Aplikácia neodporúča dávkovanie ani nemení tvoju liečbu.`,types:{preventive:`Preventívny`,acute:`Akútny`}},medForm:{title:`Nový liek`,name:`Názov lieku`,namePlaceholder:`Názov z krabičky`,nameRequired:`Zadaj názov lieku.`,type:`Typ lieku`,dose:`Dávka`,dosePlaceholder:`napr. 1 tableta`,frequency:`Frekvencia`,frequencyPlaceholder:`Ako ti ho predpísal lekár`,note:`Poznámka`,submit:`Uložiť liek`,saved:`Liek {name} bol pridaný`,startDate:`Začiatok užívania`,startDateHint:`Pomôže tebe aj lekárovi vidieť, odkedy liek užívaš.`},reminders:{title:`Chceš si nastaviť pripomienku?`,lead:`Každý deň ti v čase, ktorý si zvolíš, pripomenieme, aby si si zaznamenal/a svoje príznaky a to, ako sa cítiš.`,yes:`Áno`,no:`Nie, zatiaľ nie`,time:`Kedy ti ju máme pripomenúť?`,permission:`Telefón ťa potom požiada o povolenie posielať upozornenia. Pripomienku môžeš kedykoľvek vypnúť v profile.`},today:{greeting:`Ahoj`,greetingName:`Ahoj, {name}`,howAreYou:`Ako sa dnes cítiš?`,noEntries:`Dnes zatiaľ nemáš zaznamenané žiadne príznaky.`,addSymptom:`Pridať príznak`,overview:`Dnes`,sleep:`Spánok`,meds:`Lieky`,nothingYet:`Zatiaľ nič`,entriesEmpty:`Zatiaľ tu nič nie je. Príznak pridáš tlačidlom vyššie, epizódu spustíš v strede spodného menu.`,symptomsToday:`Dnes zaznamenané príznaky`,intakeTitle:`Liek`,logIntake:`Zaznamenať liek`,pressure:`Tlak`,steps:`Kroky`,turnOn:`Zapnúť`,connect:`Prepojiť`,mobileOnly:`V mobilnej appke`},episode:{title:`Epizóda`,ongoing:`Prebieha epizóda`,statusOngoing:`Prebieha`,statusEnded:`Ukončená`,started:`Epizóda bola spustená`,startedAt:`Začiatok`,endedAt:`Koniec`,duration:`Trvanie`,since:`od {time}`,lasting:`trvá {duration}`,detailsLater:`Podrobnosti môžeš doplniť teraz alebo kedykoľvek neskôr. Epizóda zostane uložená, aj keď aplikáciu zavrieš.`,addDetails:`Pridať podrobnosti`,finishLater:`Dokončiť neskôr`,end:`Ukončiť epizódu`,endedToast:`Epizóda bola ukončená`,mistake:`Spustená omylom?`,cancel:`Zrušiť epizódu`,cancelledToast:`Epizóda bola zrušená`,delete:`Vymazať epizódu`,deleteTitle:`Vymazať epizódu?`,deleteText:`Záznam sa natrvalo odstráni z tohto zariadenia.`,deletedToast:`Epizóda bola vymazaná`,notFound:`Táto epizóda už neexistuje.`,linkedSymptoms:`Príznaky zaznamenané počas epizódy`,linkedIntakes:`Lieky užité počas epizódy`,editDetails:`Upraviť podrobnosti`,saveLater:`Uložiť a doplniť neskôr`,savedLater:`Epizóda je uložená. Podrobnosti doplníš kedykoľvek v jej detaile.`,details:`Podrobnosti`},duration:{underMinute:`menej ako minúta`,minutes:`{m} min`,hours:`{h} h`,hoursMinutes:`{h} h {m} min`},nav:{label:`Hlavná navigácia`,today:`Domov`,calendar:`Kalendár`,insights:`Prehľady`,treatment:`Liečba`,profile:`Profil`,startEpisode:`Spustiť epizódu`},profile:{title:`Profil`,me:`Môj profil`,name:`Meno`,namePlaceholder:`Nepovinné`,nameHint:`Použijeme ho iba na pozdrav na domovskej obrazovke.`,language:`Jazyk`,tracking:`Sledovanie`,condition:`Čo sledujem`,conditionNone:`Nevybraté`,cycle:`Menštruačný cyklus`,reminders:`Denná pripomienka`,reminderTime:`Čas pripomienky`,display:`Zobrazenie`,privacy:`Súkromie`,deleteAll:`Vymazať všetky dáta`,deleteAllTitle:`Vymazať všetky dáta?`,deleteAllText:`Odstránia sa všetky záznamy, lieky a nastavenia v tomto zariadení. Túto akciu nie je možné vrátiť. Zálohy a exporty, ktoré máš uložené mimo appky, a povolenia v nastaveniach telefónu ostávajú.`,deleteAllConfirm:`Áno, vymazať`,saved:`Uložené`,disclaimer:`Aplikácia slúži na osobné zaznamenávanie a nie je zdravotníckou pomôckou. Neposkytuje diagnózu ani liečbu a nenahrádza konzultáciu s lekárom. Pri náhlych, silných alebo nezvyčajných ťažkostiach vyhľadaj lekársku pomoc alebo volaj 155 či 112.`,integrations:`Prepojenia`,health:`Smart hodinky a zdravotné údaje`,healthHint:`Spánok, kroky a tréningy z Health Connect, aj z tvojich hodiniek.`,healthHintIos:`Spánok, kroky a tréningy z Apple Zdravia, aj z tvojich hodiniek.`,logout:`Odhlásiť sa`,logoutNoPinTitle:`Najprv si nastav PIN`,logoutNoPinText:`Bez PIN-u by sa do appky po odhlásení dostal ktokoľvek s tvojím telefónom. Po nastavení PIN-u ťa hneď odhlásime.`,logoutNoPinConfirm:`Nastaviť PIN`,appearance:`Vzhľad`,themes:{light:`Svetlý`,dark:`Tmavý`,system:`Podľa telefónu`},demoSection:`Ukážka appky`,demoFill:`Vyplnená appka`,demoFillHint:`Vypni a uvidíš prázdnu appku ako nový človek.`,demoFillOn:`Ukážkové dáta sú zapnuté`,demoFillOff:`Ukážkové dáta sú vypnuté, appka je prázdna`,weatherHint:`Tlak a počasie podľa polohy sa zapisujú každý deň.`,demoPlus:`Vestie+ zapnuté`,demoPlusHint:`Prepni a uvidíš appku s predplatným alebo bez neho.`,plusActive:`Moje Vestie+`,plusTry:`Vyskúšať Vestie+`,plusHint:`Počasie a tlak, upozornenia na počasie, hľadač súvislostí a ďalšie.`,help:`Pomoc`,reportBug:`Nahlásiť chybu`,reportBugHint:`E-mail s verziou appky a telefónu, bez záznamov z denníka`},bugReport:{title:`Nahlásiť chybu`,open:`Otvorí sa e-mail na {email}. Napíš doň, čo sa stalo a čo si práve robil/a. Pomôže aj snímka obrazovky.`,details:`Pribalíme iba verziu appky, systém a model telefónu ({details}). Záznamy z denníka nie. E-mail pred odoslaním uvidíš a môžeš ho upraviť.`,health:`Prosím, nepíš doň viac údajov o zdraví, než treba.`,confirm:`Otvoriť e-mail`,subject:`{app} – chyba ({version})`,body:`Čo sa stalo:


Kde v appke a čo som práve robil/a:


Deje sa to vždy, alebo iba niekedy:


---
Verzia appky: {version}
Systém: {system}
Telefón: {device}`},symptoms:{dizziness:`Závrat`,vertigo:`Vertigo`,rocking:`Hojdanie / kolísanie`,floating:`Pocit vznášania`,unsteadiness:`Nestabilita / neistota pri chôdzi`,nausea:`Nevoľnosť`,vomiting:`Vracanie`,light_sensitivity:`Citlivosť na svetlo`,sound_sensitivity:`Citlivosť na zvuk`,visual_sensitivity:`Vizuálna citlivosť`,tinnitus:`Tinnitus / pískanie v ušiach`,ear_pressure:`Tlak v ušiach`,headache:`Bolesť hlavy`,brain_fog:`Mozgová hmla`,fatigue:`Únava`,unknown:`Neznámy príznak`},durations:{just_started:`Práve začali`,under_1h:`Menej ako 1 hodinu`,"1_3h":`1–3 hodiny`,"3_6h":`3–6 hodín`,"6_12h":`6–12 hodín`,over_12h:`Viac ako 12 hodín`,ongoing:`Stále pretrvávajú`,moment:`Chvíľu (sekundy až minúty)`},triggers:{poor_sleep:`Nekvalitný / krátky spánok`,stress:`Stres`,skipped_meal:`Vynechané jedlo`,dehydration:`Dehydratácia`,caffeine:`Kofeín`,alcohol:`Alkohol`,exertion:`Fyzická námaha`,illness:`Choroba / infekcia`,visual_stimulation:`Vizuálna stimulácia`,screen_time:`Dlhý čas pred obrazovkou`,weather_change:`Zmena počasia`,menstrual_cycle:`Menštruačný cyklus`,travel:`Cestovanie / pohyb`,other:`Iné`,long_sleep:`Príliš dlhý spánok`,bright_light:`Ostré svetlo / slnečné žiarenie`,strong_smells:`Silné pachy`,neck_pain:`Bolesť alebo napätie krku`,allergy:`Alergia`},effects:{helped:`Pomohlo`,partly:`Čiastočne`,not_helped:`Nepomohlo`,unknown:`Neviem`},intensity:{none:`žiadna`,mild:`mierna`,moderate:`stredná`,severe:`silná`,notSet:`Nezadané`,value:`{value} – {level}`,highest:`najvyššia intenzita {value}`},log:{symptomsTitle:`Aké príznaky zaznamenávaš?`,symptomsLead:`Vyber jeden alebo viac príznakov.`,search:`Hľadať príznak`,noMatch:`Žiadny príznak nezodpovedá hľadaniu. Môžeš pridať vlastný.`,custom:`Vlastný príznak`,customPlaceholder:`Napíš názov príznaku`,customAdd:`Pridať`,continueCount:`Pokračovať ({n})`,intensityTitle:`Aká silná je intenzita?`,intensityLead:`0 = žiadna, 10 = najhoršia. Posuvník začína na 5 – posuň ho podľa toho, ako sa cítiš. Ktorýkoľvek príznak môžeš vynechať.`,clear:`Vynechať`,detailsTitle:`Ako dlho tieto príznaky trvajú?`,detailsLead:`Všetko na tejto obrazovke je nepovinné.`,when:`Kedy začali`,date:`Dátum`,time:`Čas`,note:`Poznámka`,linkEpisode:`Priradiť k prebiehajúcej epizóde`,save:`Uložiť záznam`,saved:`Záznam bol uložený`,whenToday:`Dnes o {time}`,whenOn:`{date} o {time}`,changeTime:`Zmeniť čas`,clearLabel:`Vynechať intenzitu: {name}`,restore:`Zadať intenzitu`},symptomLog:{title:`Príznaky`,duration:`Trvanie`,note:`Poznámka`,episode:`Súčasť epizódy`,edit:`Upraviť záznam`,delete:`Vymazať záznam`,deleteTitle:`Vymazať záznam?`,deleteText:`Záznam sa natrvalo odstráni z tohto zariadenia.`,deletedToast:`Záznam bol vymazaný`,notFound:`Tento záznam už neexistuje.`},treatment:{title:`Liečba`,lead:`Tvoje lieky, ich užívanie a či ti podľa teba pomohli.`,preventive:`Preventívne`,acute:`Akútne`,add:`Pridať liek`,empty:`Zatiaľ nemáš pridané žiadne lieky.`,noneOfType:`Žiadne lieky v tejto skupine.`,lastTaken:`Naposledy {when}`,neverTaken:`Zatiaľ bez záznamu užitia`,disclaimer:`Aplikácia nepredpisuje lieky ani nenavrhuje zmenu dávkovania. O liečbe sa rozhoduj so svojím lekárom.`,type:`Typ`,dose:`Dávka`,frequency:`Frekvencia`,note:`Poznámka`,logIntake:`Zaznamenať užitie`,history:`História užitia`,historyEmpty:`Zatiaľ tu nie je žiadne užitie.`,taken:`Užité`,effectSummary:`Účinok podľa teba`,edit:`Upraviť liek`,delete:`Odstrániť liek`,deleteTitle:`Odstrániť liek?`,deleteText:`Odstráni sa liek aj celá história jeho užitia.`,deletedToast:`Liek bol odstránený`,notFound:`Tento liek už neexistuje.`,inEpisode:`počas epizódy`,effectMissing:`účinok nezadaný`,showAll:`Zobraziť celú históriu ({n})`,hint:`Klikni na liek a zapíšeš jeho užitie aj to, či ti podľa teba pomohol.`},intake:{title:`Užitie lieku`,editTitle:`Upraviť užitie`,date:`Dátum`,time:`Čas`,dose:`Dávka`,effect:`Pomohlo to?`,effectHint:`Ak ešte nevieš, doplň to neskôr.`,note:`Poznámka`,save:`Uložiť užitie`,saved:`Užitie bolo uložené`,delete:`Vymazať užitie`,deleteTitle:`Vymazať užitie?`,deleteText:`Záznam o užití sa natrvalo odstráni.`,deletedToast:`Užitie bolo vymazané`,notFound:`Tento záznam už neexistuje.`},calendar:{title:`Kalendár`,prev:`Predchádzajúci mesiac`,next:`Nasledujúci mesiac`,backToday:`Dnes`,legend:`Vysvetlivky`,legendPeriod:`Menštruácia`,dayEmpty:`V tento deň nemáš žiadne záznamy.`,addSymptom:`Pridať príznak`,periodMark:`Zaznamenať menštruáciu v tento deň`,summaryEntries:`počet záznamov {n}`,summaryPeriod:`menštruácia`,summaryNone:`bez záznamov`,selected:`vybraný deň`,today:`dnes`,legendEpisode:`Deň s epizódou`,legendSymptoms:`Zaznamenané príznaky`,summaryEpisode:`epizóda`},insights:{title:`Prehľady`,periodLabel:`Obdobie`,empty:`Prehľad sa skladá z tvojich záznamov. Keď budeš mať zapísané príznaky z viacerých dní, uvidíš tu, čo sa opakuje.`,overview:`Súhrn`,symptomDays:`Dni s príznakmi`,episodes:`Epizódy`,avgIntensity:`Priemerná intenzita`,avgDuration:`Priemerné trvanie epizódy`,noValue:`nezadané`,topSymptoms:`Najčastejšie príznaky`,topSymptomsLead:`Počet záznamov, v ktorých sa príznak objavil.`,topTriggers:`Najčastejšie možné spúšťače`,triggersEmpty:`Zatiaľ tu nie sú žiadne možné spúšťače. Pribudnú s podrobnosťami epizódy.`,meds:`Lieky`,medsEmpty:`V tomto období nie je zaznamenané žiadne užitie lieku.`,interpretation:`Zaznamenaná súvislosť nie je dôkazom príčiny. Prehľad počíta iba so zadanými údajmi.`,report:`Vytvoriť report pre lekára`},report:{title:`Report pre lekára`,lead:`Vyber obdobie. Report zhrnie tvoje záznamy do prehľadu, ktorý môžeš ukázať lekárovi.`,custom:`Vlastné obdobie`,from:`Od`,to:`Do`,create:`Vytvoriť report`,invalidRange:`Dátum „Od“ musí byť skôr alebo v ten istý deň ako „Do“.`,docTitle:`Zaznamenané príznaky a liečba`,period:`Obdobie`,created:`Vytvorené`,disclaimer:`Údaje zaznamenal používateľ v aplikácii Vestie. Aplikácia nie je zdravotnícka pomôcka. Nejde o diagnózu, lekársky záznam ani odporúčanie liečby.`,fewData:`V tomto období je zaznamenaných málo údajov, prehľad nemusí byť reprezentatívny.`,summary:`Súhrn`,symptoms:`Najčastejšie príznaky`,triggers:`Zaznamenané možné spúšťače`,meds:`Lieky a účinok podľa používateľa`,sleep:`Spánok`,sleepNone:`V tomto období nebol zaznamenaný spánok.`,cycle:`Menštruačný cyklus`,cycleDays:`Zaznamenané dni menštruácie`,notes:`Poznámky`,timeline:`Časová os`,colDate:`Dátum a čas`,colEntry:`Záznam`,colDetail:`Podrobnosti`,none:`Bez záznamov.`,print:`Uložiť ako PDF`,printHint:`V okne tlače zvoľ „Uložiť ako PDF“.`,sleepQuality:`Kvalita spánku`,plusHint:`S Vestie+ pribudne v reporte tlak pri epizódach, možné súvislosti a aktivita.`,weather:`Počasie a tlak pri epizódach`,weatherSummary:`Epizódy v dňoch s poklesom tlaku o 6 hPa a viac: {drops} z {total}.`,patterns:`Možné súvislosti podľa záznamov`,patternsOther:`inak {a} z {b}`,patternsNote:`Počet ťažších dní po dni s daným faktorom. Ide o možné súvislosti zo záznamov používateľa za posledný rok, nie o dôkaz príčiny.`,activity:`Aktivita`,avgSteps:`Priemerný počet krokov za deň`,workoutDays:`Dni s tréningom`,workoutDaysValue:`{a} z {b}`,workoutTypes:`Najčastejšie tréningy`},sleep:{title:`Spánok`,formTitle:`Ako sa ti spalo?`,lead:`Zaznamenaj dĺžku spánku. Kvalitu a poznámku môžeš vynechať.`,date:`Deň prebudenia`,duration:`Dĺžka spánku`,hours:`Hodiny`,minutes:`Minúty`,durationRequired:`Zadaj dĺžku spánku.`,quality:`Kvalita spánku`,qualities:{good:`Dobrá`,fair:`Priemerná`,poor:`Zlá`},note:`Poznámka`,save:`Uložiť spánok`,saved:`Spánok bol uložený`,add:`Zaznamenať spánok`,entry:`Spánok {duration}`,delete:`Vymazať záznam spánku`,deleteTitle:`Vymazať záznam spánku?`,deleteText:`Záznam sa natrvalo odstráni z tohto zariadenia.`,deletedToast:`Záznam spánku bol vymazaný`,avg:`Priemerný spánok`,nights:`Zaznamenané noci`},consent:{title:`Tvoje záznamy zostávajú v tvojom telefóne`,lead:`Skôr než začneš, pozri sa, ako s tvojimi údajmi zaobchádzame.`,updatedLead:`Zásady ochrany súkromia sa zmenili. Prečítaj si ich a potvrď súhlas znova, potom môžeš appku používať ďalej.`,factDevice:`Appka ukladá záznamy o zdraví iba do tohto telefónu.`,factNoServer:`Appka nemá účet na internete, záznamy o zdraví nikam neodosiela a nemá reklamy ani vlastnú analytiku.`,factPin:`Prihlasovať sa budeš PIN kódom. Kým je PIN zapnutý, údaje sú v telefóne zašifrované.`,factControl:`Údaje môžeš kedykoľvek exportovať do súboru alebo natrvalo vymazať.`,health:`Súhlasím, aby IronPhysique s. r. o. ako prevádzkovateľ appky Vestie spracúvala v tomto telefóne údaje o mojom zdraví, ktoré do appky zapíšem alebo si nechám načítať (príznaky, epizódy, lieky, spánok, prípadne menštruačný cyklus), na účely môjho osobného sledovania. Súhlas môžem kedykoľvek odvolať v Profile, údaje sa tým vymažú.`,age:`Mám aspoň 16 rokov.`,policyLink:`Prečítať zásady ochrany súkromia`,termsNote:`Používaním appky prijímaš {terms}.`,termsLink:`podmienky používania`,submit:`Súhlasím a pokračujem`,decline:`Nesúhlasím`,declineTitle:`Bez súhlasu appka nemôže pokračovať`,declineText:`Tvoje záznamy ostávajú v telefóne. Môžeš si ich exportovať do súboru alebo ich natrvalo vymazať. Kým nesúhlasíš, appka ich iba uchováva a ďalej s nimi nepracuje.`,factNotMedical:`Vestie je osobný denník, nie zdravotnícka pomôcka. Nediagnostikuje, nelieči a nenahrádza lekára. Pri náhlych, silných alebo nezvyčajných ťažkostiach vyhľadaj lekársku pomoc alebo volaj 155 či 112.`},privacyPolicy:JSON.parse(`{"title":"Zásady ochrany súkromia","version":"Verzia {version}","controllerTitle":"Kto je prevádzkovateľ","controllerText":"Prevádzkovateľom je IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, IČO 47321547. Kontakt pre otázky o osobných údajoch: support@vestibularnamigrena.sk, tel. +421 902 811 486.","dataTitle":"Aké údaje appka spracúva","dataText":"To, čo do nej zadáš: čo chceš sledovať (napríklad vestibulárnu migrénu), príznaky a ich intenzitu, epizódy a ich možné spúšťače, lieky a to, ako hodnotíš ich účinok, spánok, poznámky, voliteľne menštruačný cyklus a meno na pozdrav. S Vestie+ aj počasie a tlak vzduchu podľa približnej polohy a údaje zo zdravotných appiek, ak si to zapneš. Appka si v telefóne ukladá aj nastavenia, záznam o tvojom súhlase (čas a verzia zásad), stav predplatného s číslom objednávky a pri zapnutom počasí poslednú zaokrúhlenú polohu. Ide o údaje o zdraví, preto ich chránime osobitne.","storageTitle":"Kde sú tvoje údaje","storageText":"Záznamy z appky sú iba v tomto telefóne. Appka nemá server ani účet na internete, záznamy o zdraví nikam neodosiela a nemá reklamy ani vlastnú analytiku. K záznamom v appke prevádzkovateľ nemá prístup. Mimo telefónu sa dostanú iba vtedy, keď to urobíš ty (export, záloha, report) alebo pri zálohe a prenose celého telefónu, ako opisuje časť Zálohovanie. Google Play môže podľa nastavení tvojho telefónu zbierať súhrnné údaje o pádoch appky. Z nich nevieme zistiť, o koho ide.","purposeTitle":"Na čo slúžia","purposeText":"Na tvoje osobné sledovanie ťažkostí a na prehľad alebo report, ktorý môžeš ukázať lekárovi. Report sa vytvorí v telefóne a ty rozhodneš, komu ho dáš. Appka v telefóne ukazuje možné súvislosti v tvojich záznamoch, ale nerobí o tebe žiadne automatizované rozhodnutia s právnymi ani podobne závažnými účinkami.","legalTitle":"Na akom základe","legalText":"Záznamy v appke vrátane údajov o zdraví spracúvame na základe tvojho výslovného súhlasu (čl. 6 ods. 1 písm. a) a čl. 9 ods. 2 písm. a) GDPR). Platí to aj pre spánok, kroky a tréningy, ktoré si necháš načítať z Apple Zdravia alebo Health Connect. Súhlas môžeš kedykoľvek odvolať v Profile, údaje sa tým vymažú. Odvolanie nemá vplyv na zákonnosť spracúvania pred ním. Polohu na počasie appka posiela na základe tvojho súhlasu, ktorý dáš zapnutím funkcie a odvoláš jej vypnutím (čl. 6 ods. 1 písm. a) GDPR). Údaje o predplatnom Vestie+ (číslo objednávky, plán, dátumy) spracúvame, aby sme splnili zmluvu s tebou (čl. 6 ods. 1 písm. b) GDPR), a účtovné doklady preto, lebo nám to ukladá zákon (čl. 6 ods. 1 písm. c) GDPR). Na e-maily odpovedáme na základe oprávneného záujmu vybaviť tvoju otázku (čl. 6 ods. 1 písm. f) GDPR). Oznámenie o odstúpení od zmluvy a reklamácie vybavujeme, lebo nám to ukladá zákon (čl. 6 ods. 1 písm. c) GDPR), a po vybavení ich uchovávame na základe oprávneného záujmu brániť sa v prípadnom spore (čl. 6 ods. 1 písm. f) GDPR). Ak nám v e-maile sám/sama napíšeš niečo o svojom zdraví a na vybavenie to potrebujeme, opýtame sa ťa na výslovný súhlas (čl. 9 ods. 2 písm. a) GDPR). Pri reklamácii alebo odstúpení od zmluvy ich spracúvame aj na preukazovanie, uplatňovanie alebo obhajovanie právnych nárokov (čl. 9 ods. 2 písm. f) GDPR).","rightsTitle":"Tvoje práva","rightsText":"Máš právo na prístup k údajom, ich opravu a vymazanie, obmedzenie spracúvania, prenosnosť, právo namietať a právo kedykoľvek odvolať súhlas. Záznamy sú iba v tvojom telefóne a my k nim nemáme prístup, preto väčšinu práv uplatníš priamo v appke: údaje si pozrieš, upravíš, exportuješ do súboru alebo natrvalo vymažeš (Profil → Súkromie). S ostatným, napríklad s e-mailmi, ktoré si nám poslal/a, ti pomôžeme na support@vestibularnamigrena.sk. Máš aj právo podať sťažnosť na Úrad na ochranu osobných údajov Slovenskej republiky (dataprotection.gov.sk) alebo na dozorný úrad v krajine EÚ, kde žiješ.","securityTitle":"Zabezpečenie","securityText":"Pri prvom spustení si nastavíš 6-miestny PIN. Kým je PIN zapnutý, záznamy sú v telefóne uložené zašifrované (AES-256) a appka ich bez PIN-u neotvorí. Ak PIN v Profile vypneš, záznamy zašifrované nie sú. V Androide je šifrovanie navyše naviazané na kľúč uložený v zabezpečenej časti telefónu (Android Keystore), ktorý sa z telefónu nedá skopírovať. Kópia údajov sa preto mimo tvojho telefónu nedá otvoriť ani skúšaním PIN-ov. Žiadne zabezpečenie nie je stopercentné, preto si zvoľ PIN, ktorý sa nedá ľahko uhádnuť, a telefón maj chránený aj zámkou obrazovky. Čitateľný export z Profilu zašifrovaný nie je, zašifrovaná je iba záloha chránená heslom. Ak PIN zabudneš, údaje nie je možné obnoviť.","backupTitle":"Zálohovanie","backupText":"Údaje sú iba v telefóne a appka nemá server. V Androide sa nezálohujú na Google Disk. Na iPhone sú súčasťou zálohy celého telefónu v iCloude alebo v počítači, ak ju máš zapnutú. V Profile si môžeš vytvoriť zálohu chránenú heslom a uložiť ju, kam chceš. Heslo k zálohe nepoznáme, preto ho nevieme ani obnoviť. Pri nastavovaní nového telefónu môže Android preniesť údaje appky priamo zo starého telefónu (káblom alebo cez Wi-Fi). Ak máš zapnutý PIN, údaje sú v zálohe telefónu aj pri prenose zašifrované. V Androide sa však prenesené údaje s PIN-om v novom telefóne neotvoria, lebo šifrovanie je naviazané na starý telefón. Pred výmenou telefónu si preto vytvor zálohu chránenú heslom, alebo pred prenosom PIN vypni a v novom telefóne ho znova zapni. Bez zálohy alebo prenosu sa pri strate či výmene telefónu údaje stratia.","ageTitle":"Vek","ageText":"Appka je určená pre ľudí od 16 rokov.","changesTitle":"Zmeny zásad","changesText":"O zmenách týchto zásad ťa upozorníme priamo v appke. Pri podstatnej zmene ťa požiadame o nový súhlas. Staršie znenia ti na požiadanie pošleme.","weatherTitle":"Počasie a tlak (Vestie+)","weatherText":"Ak si túto funkciu zapneš, appka pri aktualizácii počasia (pri otvorení appky, najviac raz za 3 hodiny, alebo keď o ňu požiadaš) pošle poskytovateľovi počasia polohu zaokrúhlenú na približne 10 km, aby získala skutočné počasie a tlak vzduchu. Poskytovateľom je OpenWeather Ltd., 30 St Mary Axe, Londýn, Spojené kráľovstvo. Pre Spojené kráľovstvo má EÚ rozhodnutie o primeranej ochrane osobných údajov. Poskytovateľ pritom technicky vidí aj tvoju IP adresu, ako pri každej požiadavke na internet. Podľa svojich zásad ochrany súkromia (openweather.co.uk/privacy-policy) IP adresu ani polohu z týchto požiadaviek neukladá. Žiadne tvoje záznamy sa neodosielajú. Poslednú zaokrúhlenú polohu si appka pamätá v telefóne, kým funkciu nevypneš alebo kým neskončí Vestie+. Funkciu môžeš kedykoľvek vypnúť.","healthTitle":"Prepojenie s aplikáciami zdravia (Vestie+)","healthText":"Ak prepojíš Apple Zdravie alebo Health Connect, appka z nich iba číta vybrané údaje do tohto telefónu: spánok (čas zaspatia, prebudenia a dĺžku), kroky po dňoch a tréningy (iba druh, čas a trvanie). Pri prepojení načíta aj posledných 90 dní. Nič do nich nezapisuje a nikam ich neodosiela. Tieto údaje nepoužívame na reklamu, nepredávame ich a nikomu ich neposkytujeme. Prepojenie môžeš kedykoľvek zrušiť. To, čo sa už načítalo, ostane v tvojich záznamoch, kým to nevymažeš, a povolenie odoberieš v nastaveniach telefónu.","purchasesTitle":"Predplatné","purchasesText":"Platbu za Vestie+ vybavuje Google Play alebo Apple ako samostatný prevádzkovateľ podľa svojich podmienok a zásad a môže pri tom údaje spracúvať aj mimo EÚ. Tvoje platobné údaje nevidíme. Appka sa od obchodu dozvie, či je predplatné aktívne, kedy sa začalo a číslo objednávky (GPA.), a uloží si to v telefóne. My vidíme v účte vývojára v Google Play údaje o objednávke, ktoré nám sprístupní obchod (najmä číslo objednávky, dátum, sumu a krajinu), nie záznamy z appky. Používame ich na vrátenie peňazí a na účtovníctvo. Účtovné doklady uchovávame 10 rokov, ako ukladá zákon o účtovníctve, a vidí ich náš účtovník. Knižnica Google Play, cez ktorú appka predplatné kupuje a overuje, pošle pri tom Googlu aj technické údaje o tom, či nákup a spojenie fungujú (diagnostika). Appka ju zapne iba pri ponuke Vestie+, nákupe, obnovení nákupu a overení predplatného. Nie je v nich nič o tvojom zdraví.","linksTitle":"Odkazy na web a komunitu","linksText":"Appka obsahuje odkazy na web vestibularnamigrena.sk a na komunitu na Facebooku, Instagrame a Discorde. Nič im neodosiela. Keď odkaz otvoríš, opustíš appku a platia pravidlá a zásady danej služby.","retentionTitle":"Ako dlho","retentionText":"Záznamy sú v telefóne, kým ich nevymažeš, neodvoláš súhlas alebo neodinštaluješ appku. Zálohu a exporty máš u seba ty a sám/sama rozhoduješ, kedy ich zmažeš. Číslo objednávky si appka pamätá, kým je predplatné aktívne. Lehoty pre e-maily sú v časti Keď nám napíšeš a pre účtovné doklady v časti Predplatné.","contactTitle":"Keď nám napíšeš","contactText":"Ak napíšeš na support@vestibularnamigrena.sk, spracúvame tvoju e-mailovú adresu a obsah správy iba na to, aby sme ti odpovedali. Bežnú správu vymažeme najneskôr 1 rok po vybavení. Oznámenie o odstúpení a reklamáciu (meno, číslo objednávky, e-mail) uchovávame 3 roky, kým sa z nich dajú uplatniť nároky. Formulár na odstúpenie na našom webe (vestibularnamigrena.sk/vestie/odstupenie) pošle meno, e-mail a číslo objednávky e-mailom nám a potvrdenie tebe. Do databázy nič neukladá. Na ochranu pred zneužitím si server najviac hodinu pamätá odtlačok IP adresy, z ktorého sa adresa nedá zistiť. E-maily sú uložené u poskytovateľa našej e-mailovej schránky a webu na Slovensku, ktorý ich pre nás spracúva ako sprostredkovateľ. Pri vrátení peňazí použijeme číslo objednávky v Google Play. Do správy prosím nepíš viac údajov o zdraví, než treba. Ak ich napíšeš, použijeme ich iba na odpoveď tebe.","requiredTitle":"Musíš údaje poskytnúť?","requiredText":"Nie, zákon ani zmluva ti to neukladajú. Bez súhlasu so spracúvaním údajov o zdraví však appka nemôže fungovať, lebo denník bez nich nevznikne. Všetko ostatné je dobrovoľné: meno, menštruačný cyklus, počasie podľa polohy aj prepojenie so zdravotnými appkami môžeš vynechať a appka funguje ďalej. Pri odstúpení od zmluvy alebo reklamácii potrebujeme tvoje meno a e-mail, a ak ho vieš, aj číslo objednávky, inak ich nevieme vybaviť."}`),terms:JSON.parse(`{"title":"Podmienky používania","version":"Verzia {version}","providerTitle":"Kto appku poskytuje","providerText":"Appku Vestie a predplatné Vestie+ poskytuje IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, IČO 47321547, DIČ 2023812813, IČ DPH SK2023812813 (registrácia podľa § 7a zákona o DPH, nie sme platiteľ DPH), zapísaná v Obchodnom registri Mestského súdu Bratislava III, oddiel Sro, vložka č. 90506/B. Kontakt: support@vestibularnamigrena.sk, tel. +421 902 811 486.\\nTieto podmienky upravujú používanie appky a predplatného Vestie+. Ako zaobchádzame s tvojimi údajmi, opisujú samostatné Zásady ochrany súkromia.","appTitle":"Čo appka je","appText":"Vestie je osobný denník. Zapisuješ si doň príznaky, epizódy, lieky, spánok a ďalšie údaje a appka z nich ukazuje prehľady, možné súvislosti a report, ktorý môžeš ukázať lekárovi. Základná verzia je zadarmo. Appka je určená pre ľudí od 16 rokov. Vestie+ si môže predplatiť plnoletý človek alebo neplnoletý so súhlasom zákonného zástupcu.","healthTitle":"Appka nie je zdravotnícka pomôcka","healthText":"Appka nediagnostikuje, nelieči, neodporúča lieky ani ich dávkovanie a nenahrádza lekára. Možné súvislosti vychádzajú iba z tvojich záznamov, nie z lekárskeho posúdenia, a môžu byť náhodné. Upozornenia na počasie vychádzajú iba z predpovede počasia a zo zmien, ktoré máš v appke zvolené. Nehovoria nič o tvojom zdraví. O liečbe sa vždy raď s lekárom. Pri náhlych, silných alebo nezvyčajných ťažkostiach vyhľadaj lekársku pomoc alebo volaj 155 či 112.","useTitle":"Ako môžeš appku používať","useText":"Appku môžeš používať pre svoju osobnú potrebu. Appka, jej texty a ilustrácie aj značky Vestie a Vestibulárna migréna sú chránené. Patria ich majiteľom a my ich používame s ich súhlasom. Nesmieš ich kopírovať, upravovať ani šíriť ďalej bez povolenia, okrem prípadov, ktoré dovoľuje zákon. Nesmieš obchádzať predplatné ani zasahovať do fungovania appky.","plusTitle":"Čo obsahuje Vestie+","plusText":"Vestie+ pridáva k bezplatnej verzii počasie a tlak vzduchu podľa približnej polohy, upozornenia na počasie, hľadač súvislostí, pokročilé štatistiky, prepojenie s aplikáciami zdravia (spánok, kroky a tréningy) a rozšírený report pre lekára. Aktuálny rozsah je opísaný v ponuke Vestie+ v appke. Funkcie, ktoré potrebujú internet alebo iné appky, fungujú iba vtedy, keď sú dostupné (pozri Služby iných poskytovateľov).\\nVestie+ funguje v telefónoch s Androidom 8.0 alebo novším. Počasie a tlak vzduchu potrebujú pripojenie na internet a povolenie približnej polohy, prepojenie so zdravím appku Health Connect. Appka nemá technickú ochranu proti kopírovaniu.","paymentTitle":"Cena, platba a obnovovanie","paymentText":"Vestie+ si predplácaš na mesiac alebo na rok. Cenu vrátane DPH vidíš v appke a v obchode ešte pred nákupom. Platbu vybavuje Google Play (na iPhone App Store) podľa svojich podmienok, tvoje platobné údaje nevidíme.\\nZmluva sa uzatvára na zvolené obdobie a na jeho konci sa predplatné samo obnoví o ďalšie rovnaké obdobie a znova zaplatí, kým ho nezrušíš. Cenu môžeme zmeniť. O zvýšení sa dozvieš vopred a nová cena sa ťa týka až vtedy, keď ju v Google Play (na iPhone v App Store) odsúhlasíš. Ak ju neodsúhlasíš, predplatné sa na konci aktuálneho obdobia skončí a nič ďalšie nezaplatíš. Ak sa platba nepodarí, obchod môže predplatné po opakovaných pokusoch ukončiť.\\nAk ponuka obsahuje skúšobnú dobu zadarmo, prvá platba prebehne až po jej skončení. Ak predplatné počas skúšobnej doby zrušíš, nezaplatíš nič. Skúšobnú dobu ponúka obchod iba raz na jeden účet, spolu pre oba plány. Promo kód môže dať skúšobnú dobu inej dĺžky, a to aj tomu, kto ju už mal. Platí dĺžka, ktorú ti Google Play ukáže pred potvrdením, a po jej skončení sa predplatné obnovuje a platí rovnako.","contractTitle":"Uzavretie zmluvy a jazyk","contractText":"Zmluvu o Vestie+ uzavrieš v nákupnom okne Google Play, keď potvrdíš predplatné. Pri promo kóde uplatnenom v Obchode Play ju uzavrieš potvrdením tam a potvrdenie od appky dostaneš po návrate do nej. Pred potvrdením môžeš plán zmeniť alebo nákup zrušiť. Potvrdenie objednávky ti pošle Google Play e-mailom. Hneď po nákupe ti appka ukáže potvrdenie s hlavnými podmienkami a lehotou na odstúpenie, ktoré si môžeš uložiť do súboru. Nájdeš ho aj neskôr cez Vestie+ → Potvrdenie predplatného. Tieto podmienky sú vždy v appke aj na webe vestibularnamigrena.sk/vestie/podmienky.\\nZmluvu uzatváraš v slovenčine, češtine alebo angličtine podľa jazyka appky a rozhodujúce je znenie v tomto jazyku.","cancelTitle":"Zrušenie predplatného","cancelText":"Predplatné zrušíš kedykoľvek v nastaveniach predplatných v obchode. Z appky sa tam dostaneš cez Vestie+ → Spravovať v Google Play. Odinštalovaním appky ani vymazaním údajov sa predplatné nezruší.\\nPo zrušení ti Vestie+ ostane do konca zaplateného obdobia alebo skúšobnej doby a ďalšia platba už neprebehne. Potom sa appka vráti do bezplatnej verzie a všetky tvoje záznamy ostanú v telefóne.","withdrawalTitle":"Odstúpenie od zmluvy a vrátenie peňazí","withdrawalText":"Ako spotrebiteľ môžeš od zmluvy o Vestie+ odstúpiť bez uvedenia dôvodu do 14 dní od jej uzavretia, teda od začiatku predplatného. Ak predplatné začína skúšobnou dobou, lehota zahŕňa aj ju: pri 7-dňovej skúšobnej dobe ti po prvej platbe ostáva ešte najmenej 7 dní. Pri dlhšej skúšobnej dobe z promo kódu môže lehota uplynúť ešte počas nej, predplatné však môžeš do konca skúšobnej doby kedykoľvek bezplatne zrušiť. Odstúpiť môžeš formulárom na vestibularnamigrena.sk/vestie/odstupenie, ktorý otvoríš aj z appky cez Vestie+ → Odstúpiť od zmluvy tu. Vyplníš meno a e-mail (číslo objednávky z potvrdenia od Google Play, ktoré sa začína GPA., iba ak ho vieš) a potvrdíš tlačidlom „Potvrdiť odstúpenie od zmluvy“. Oznámenie sa odošle hneď a na tvoj e-mail príde potvrdenie s jeho textom, dátumom a časom. Formulár funguje bez prihlásenia, aj keď appku už nemáš. Odstúpiť môžeš aj správou na support@vestibularnamigrena.sk alebo vzorovým formulárom nižšie; aj vtedy ti doručenie bezodkladne potvrdíme e-mailom. Lehota je dodržaná, ak oznámenie odošleš najneskôr v jej posledný deň. Ak odstúpiš počas skúšobnej doby, predplatné zrušíme a nič nezaplatíš. Ak už prebehla platba, vrátime ti celú sumu cez Google Play na rovnaký spôsob platby, najneskôr do 14 dní od doručenia tvojho oznámenia. Vestie+ môžeš používať hneď a aj tak dostaneš späť celú sumu, za dni používania nič nestrhávame. Vestie+ sa po odstúpení vypne.\\nPo uplynutí 14 dní sa za začaté obdobie peniaze nevracajú. Automatické obnovenie predplatného nie je nová zmluva, preto pri ňom nová lehota nevzniká. Výnimkou sú iba prípady podľa častí Zmeny appky a podmienok a Reklamácie a spory. Nezávisle od toho môže Google Play podľa svojich pravidiel vrátiť peniaze aj sám, napríklad pri žiadosti krátko po platbe.","formTitle":"Vzorový formulár na odstúpenie od zmluvy","formText":"Vyplň a pošli tento formulár iba vtedy, ak chceš od zmluvy odstúpiť.\\nKomu: IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, support@vestibularnamigrena.sk\\nTýmto oznamujem, že odstupujem od zmluvy o poskytnutí tejto služby: predplatné Vestie+\\nDátum objednania:\\nČíslo objednávky (GPA.):\\nMeno a priezvisko:\\nAdresa:\\nPodpis (iba ak sa formulár podáva v listinnej podobe):\\nDátum:","dataTitle":"Tvoje záznamy","dataText":"Tvoje záznamy sú iba v tvojom telefóne. Nemáme k nim prístup, preto ich nevieme obnoviť, preniesť ani vrátiť. O zálohu sa staráš ty (Profil → Záloha údajov). Ak zabudneš PIN alebo heslo k zálohe, údaje sa obnoviť nedajú.","servicesTitle":"Služby iných poskytovateľov","servicesText":"Počasie a tlak poskytuje OpenWeather, spánok, kroky a tréningy číta appka z Health Connect alebo Apple Zdravia a platby vybavuje Google Play alebo App Store. Ich dostupnosť ani presnosť neovplyvníme a predpoveď počasia sa môže mýliť. Keď služba nie je dostupná, appka ukáže posledné skutočné údaje s časom, odkedy sú, alebo povie, že údaje nemá. Odkazy na web a komunitu (Facebook, Instagram, Discord) vedú mimo appky, kde platia pravidlá danej služby.","liabilityTitle":"Zodpovednosť","liabilityText":"Appku pripravujeme starostlivo, no nevieme zaručiť, že bude vždy bez chýb a bez prerušenia. Ak Vestie+ nefunguje, ako má, máš práva podľa časti Reklamácie a spory. Za škodu zodpovedáme podľa zákona, nie však za stratu údajov, ktorú sme nespôsobili, napríklad pri strate telefónu bez zálohy. Appka nenahrádza lekára, preto rozhodnutia o liečbe vždy konzultuj s ním. Týmto nie sú dotknuté tvoje zákonné práva spotrebiteľa ani zodpovednosť za škodu spôsobenú úmyselne alebo na zdraví.","changesTitle":"Zmeny appky a podmienok","changesText":"Appku môžeme meniť a vylepšovať, ak je na to dôvod, napríklad bezpečnosť, zmena zákona, zmena služby iného poskytovateľa alebo lepšie fungovanie appky. Za zmenu nič nedoplácaš. Ak by zmena tvoj prístup k Vestie+ alebo jeho používanie viac než málo zhoršila alebo ak by sme Vestie+ ukončili, upozorníme ťa v appke vopred. Do 30 dní od upozornenia alebo od zmeny, podľa toho, čo nastane neskôr, môžeš zmluvu bezplatne ukončiť a vrátime ti peniaze za nevyužitú časť zaplateného obdobia. O zmenách týchto podmienok ťa upozorníme v appke. Ak s nimi nesúhlasíš, môžeš predplatné zrušiť a do konca zaplateného obdobia pre teba platia pôvodné podmienky.","complaintsTitle":"Reklamácie a spory","complaintsText":"Ak Vestie+ nefunguje, ako má, napíš na support@vestibularnamigrena.sk, čo sa deje. Prijatie reklamácie ti potvrdíme e-mailom, chybu odstránime bez zbytočného odkladu a reklamáciu vybavíme najneskôr do 30 dní. Výsledok ti pošleme e-mailom, a ak reklamáciu zamietneme, napíšeme aj dôvod. Ak chybu v primeranom čase neodstránime alebo je taká závažná, že nemožno čakať, máš nárok na primeranú zľavu alebo môžeš zmluvu ukončiť. Pri ukončení ti vrátime peniaze za obdobie, keď Vestie+ nefungovalo, aj za nevyužitú časť zaplateného obdobia, najneskôr do 14 dní od doručenia tvojho oznámenia. Práva z vád máš po celý čas, kým ti Vestie+ poskytujeme.\\nAktualizácie potrebné na to, aby Vestie+ fungovalo v súlade so zmluvou, sprístupníme v obchode. Ak si ich napriek upozorneniu nenainštaluješ, nezodpovedáme za chybu, ktorú by aktualizácia odstránila.\\nAk nie si spokojný/spokojná s vybavením alebo si myslíš, že sme porušili tvoje práva, môžeš nás na support@vestibularnamigrena.sk požiadať o nápravu. Ak tvoju žiadosť zamietneme alebo na ňu do 30 dní neodpovieme, môžeš podať návrh na alternatívne riešenie sporu Slovenskej obchodnej inšpekcii (soi.sk) alebo inému subjektu zo zoznamu Ministerstva hospodárstva SR (mhsr.sk). Dozor nad ochranou spotrebiteľa vykonáva Slovenská obchodná inšpekcia.","lawTitle":"Rozhodné právo","lawText":"Tieto podmienky sa riadia právom Slovenskej republiky. Ak žiješ v inej krajine Európskej únie, ostáva ti aj ochrana, ktorú ti dávajú záväzné predpisy tvojej krajiny."}`),dataDeletion:{title:`Vymazanie údajov`,version:`Verzia {version}`,appTitle:`Čoho sa to týka`,appText:`Vestie je denník pri vestibulárnej migréne a závratoch. Vydáva ho IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava. Appka nemá účet ani prihlásenie. Tvoje záznamy sú iba v tvojom telefóne a my k nim nemáme prístup, preto ich vymažeš priamo v appke.`,inAppTitle:`Vymazanie záznamov v appke`,inAppText:`1. Otvor Vestie a ťukni na ikonu profilu vpravo hore.
2. V časti Súkromie ťukni na Vymazať všetky dáta a potvrď.
Natrvalo sa vymažú všetky záznamy, nastavenia aj PIN v tomto telefóne. Rovnako to urobí Odvolať súhlas v tej istej časti alebo odinštalovanie appky. Zálohy a exporty, ktoré si uložil/a mimo appky, zmaž tam, kde sú uložené.`,emailTitle:`Vymazanie údajov, ktoré máme my`,emailText:`Ak si nám písal/a, napíš na support@vestibularnamigrena.sk, že chceš vymazať svoje údaje. Vymažeme tvoje e-maily a ostatné údaje o tebe, ktoré nemusíme uchovávať, a do jedného mesiaca ti to potvrdíme. Približnú polohu na počasie posiela appka priamo poskytovateľovi počasia OpenWeather, my ju nedostávame. Technické údaje o nákupe (diagnostiku) spracúva Google.`,keptTitle:`Čo uchovávame aj po žiadosti`,keptText:`Oznámenie o odstúpení od zmluvy a reklamáciu (meno, číslo objednávky, e-mail) uchovávame 3 roky, kým sa z nich dajú uplatniť nároky. Účtovné doklady k predplatnému Vestie+ uchovávame 10 rokov, ako ukladá zákon o účtovníctve. Potom ich vymažeme. Predplatné zrušíš a históriu nákupov spravuješ v Google Play.`,moreTitle:`Viac informácií`,moreText:`Podrobnosti sú v zásadách ochrany súkromia: https://www.vestibularnamigrena.sk/vestie/zasady/`},profileSetup:{title:`Vytvor si profil`,lead:`Profil existuje iba v tomto telefóne – bez e-mailu a hesla na internete. Prihlasovať sa budeš PIN kódom.`,pinTitle:`Prihlasovací PIN`,pinText:`V ďalšom kroku si nastavíš 6-miestny PIN. Budeš sa ním prihlasovať a zároveň zašifruje tvoje údaje v telefóne.`,nameLabel:`Ako ťa máme oslovovať?`,namePlaceholder:`Tvoje meno`,nameHint:`Nepovinné. Uvidíš ho v pozdrave na domovskej obrazovke.`,pinAlready:`PIN už máš nastavený. Zmeniť ho môžeš v Profile → Zabezpečenie.`},pin:{progress:`Zadané {n} z {total} číslic`,keypad:`Klávesnica na PIN`,delete:`Zmazať číslicu`,prompt:{current:`Zadaj svoj súčasný PIN`,new:`Zvoľ si 6-miestny PIN`,confirm:`Zopakuj PIN pre kontrolu`},title:{set:`Nastav si prihlasovací PIN`,change:`Zmena PIN-u`,disable:`Vypnutie PIN-u`},setLead:`Budeš sa ním prihlasovať a zároveň zašifruje tvoje údaje v telefóne. Ak ho zabudneš, údaje nie je možné obnoviť – my k nim nemáme prístup.`,checking:`Overujem…`,wrong:`Nesprávny PIN. Skús to znova.`,blocked:`Príliš veľa nesprávnych pokusov. Skús to znova o {time}.`,weak:`Tento PIN sa dá ľahko uhádnuť. Zvoľ iný.`,mismatch:`PIN-y sa nezhodujú. Zvoľ si PIN znova.`,saving:`Šifrujem údaje…`,enabled:`PIN je nastavený, údaje sú zašifrované`,changed:`PIN bol zmenený`,disabled:`PIN je vypnutý`,blockedSeconds:`Príliš veľa nesprávnych pokusov. Skús to znova o {n} s.`,deviceError:`PIN sa teraz nepodarilo overiť. Skús to znova.`},lock:{title:`Prihlás sa`,lead:`Zadaj svoj PIN`,forgot:`Zabudnutý PIN?`,forgotTitle:`Zabudnutý PIN`,forgotText:`PIN nie je možné obnoviť – tvoje údaje sú zašifrované iba v tomto telefóne a my k nim nemáme kľúč. Môžeš ich iba vymazať a začať odznova.`,forgotConfirm:`Vymazať všetko a začať odznova`,moved:{title:`Údaje sú z iného telefónu`,text:`Keď je zapnutý PIN, údaje sa dajú otvoriť iba v telefóne, v ktorom vznikli. Po prenose do nového telefónu sa preto neotvoria ani so správnym PIN-om.`,backup:`Ak máš zálohu, začni odznova a po úvode ju obnov v Profile → Záloha údajov. Ak ešte máš starý telefón, vytvor zálohu v ňom. Údaje v ňom ostali tak, ako boli.`,action:`Začať odznova`,confirmTitle:`Začať odznova?`,confirmText:`Údaje prenesené z iného telefónu sa z tohto telefónu vymažú. Záznamy potom obnovíš zo zálohy.`,confirm:`Vymazať a začať odznova`}},security:{title:`Zabezpečenie`,pin:`Prihlasovanie PIN-om`,pinOnHint:`Údaje sú v telefóne zašifrované a appka ich bez PIN-u neotvorí.`,pinOffHint:`Bez PIN-u sa do appky dostane ktokoľvek s tvojím telefónom a údaje nie sú zašifrované.`,changePin:`Zmeniť PIN`,autoLock:`Automaticky odhlásiť`,autoLockOptions:{m0:`Hneď po odchode z appky`,m1:`Po 1 minúte`,m5:`Po 5 minútach`,m15:`Po 15 minútach`},biometrics:`Odomykanie tvárou alebo odtlačkom`,biometricsHint:`Dostupné v mobilnej aplikácii.`},privacy:{deviceOnly:`Záznamy sú iba v tomto telefóne`,deviceOnlyHint:`Appka záznamy o zdraví nikam neodosiela a my k záznamom v appke nemáme prístup.`,export:`Exportovať moje údaje`,exportHint:`Čitateľný súbor JSON so všetkými záznamami, napríklad na prenos inam. Nie je zašifrovaný.`,exportDone:`Súbor s údajmi je pripravený`,consent:`Súhlas so spracovaním údajov`,consentGiven:`Udelený {date}`,withdraw:`Odvolať súhlas`,withdrawTitle:`Odvolať súhlas?`,withdrawText:`Bez súhlasu appka nemôže uchovávať tvoje údaje o zdraví. Odvolaním sa natrvalo vymažú všetky údaje v tomto telefóne. Zálohy a exporty, ktoré máš uložené inde, a povolenia v nastaveniach telefónu ostávajú.`,withdrawConfirm:`Odvolať a vymazať údaje`,backupFirst:`Najprv urobiť zálohu`,plusNotCancelled:`Predplatné Vestie+ sa tým nezruší. Ak ho už nechceš, zruš ho v {store}, inak sa bude ďalej obnovovať.`,exportFailed:`Súbor sa nepodarilo vytvoriť. Skús to znova.`,importTitle:`Obnoviť údaje zo súboru?`,importText:`Všetky záznamy v tomto telefóne sa nahradia záznamami zo súboru. Predplatné a PIN sa nezmenia.`,importConfirm:`Obnoviť`,importDone:`Údaje sú obnovené`},backup:{title:`Záloha údajov`,profileHint:`Súbor chránený heslom. Z neho obnovíš záznamy, napríklad v novom telefóne.`,lead:`Appka nemá server, tvoje záznamy sú iba v tomto telefóne. Zálohu si ulož mimo neho, napríklad na Google Disk alebo do počítača. Keď telefón vymeníš alebo stratíš, obnovíš z nej všetky záznamy. Ak máš zapnutý PIN, priamy prenos do nového telefónu s Androidom nestačí, záznamy v ňom otvoríš iba zo zálohy.`,lastAt:`Posledná záloha: {date}`,never:`Zatiaľ si zálohu nevytvoril/a.`,createTitle:`Vytvoriť zálohu`,password:`Heslo k zálohe`,passwordHint:`Aspoň {n} znakov. Nepoužívaj svoj PIN.`,passwordRepeat:`Zopakuj heslo`,passwordWarning:`Heslo si zapamätaj alebo zapíš na bezpečné miesto. Bez neho sa záloha nedá otvoriť ani obnoviť a nikto ti ho nevie zistiť.`,create:`Vytvoriť zálohu`,creating:`Vytváram zálohu…`,created:`Záloha je hotová. Ulož si ju mimo telefónu.`,failed:`Zálohu sa nepodarilo vytvoriť. Skús to znova.`,fileName:`zaloha`,restoreTitle:`Obnoviť zo zálohy`,restore:`Vybrať súbor so zálohou`,restoreHint:`Napríklad v novom telefóne. Záznamy v tomto telefóne sa nahradia záznamami zo zálohy.`,restoreLead:`Záloha je zašifrovaná. Zadaj heslo, ktoré si k nej zvolil/a.`,restoreLeadDate:`Záloha z {date} je zašifrovaná. Zadaj heslo, ktoré si k nej zvolil/a.`,restoreSubmit:`Obnoviť`,reminderTitle:`Pripomienka`,reminder:`Pripomínať zálohu`,reminderHint:`Raz za mesiac sa na obrazovke Dnes ukáže krátka pripomienka.`,privacy:`Záloha nikam neodchádza sama. Kam ju uložíš, rozhoduješ ty. Je zašifrovaná heslom, ktoré poznáš iba ty.`,errors:{tooShort:`Heslo musí mať aspoň {n} znakov.`,mismatch:`Heslá sa nezhodujú.`,passwordRequired:`Zadaj heslo k zálohe.`,wrongPassword:`Nesprávne heslo alebo poškodený súbor.`,invalidFile:`Tento súbor sa nedá načítať. Vyber zálohu alebo export z appky.`,newerVersion:`Táto záloha je z novšej verzie appky. Aktualizuj appku a obnov ju znova.`},card:{title:`Zálohuj si svoje záznamy`,textNever:`Záznamy sú iba v tomto telefóne. Ak ho stratíš alebo vymeníš, bez zálohy o ne prídeš.`,textOld:`Posledná záloha je z {date}. Vytvor si novú, nech máš v bezpečí aj novšie záznamy.`,action:`Vytvoriť zálohu`,later:`Teraz nie`}},plural:{entries:{one:`{n} záznam`,few:`{n} záznamy`,other:`{n} záznamov`},times:{other:`{n}×`},days:{one:`{n} deň`,few:`{n} dni`,other:`{n} dní`},weeks:{one:`{n} týždeň`,few:`{n} týždne`,other:`{n} týždňov`},months:{one:`{n} mesiac`,few:`{n} mesiace`,other:`{n} mesiacov`},years:{one:`{n} rok`,few:`{n} roky`,other:`{n} rokov`},episodes:{one:`{n} epizóda`,few:`{n} epizódy`,other:`{n} epizód`},hardDays:{one:`{n} ťažší deň`,few:`{n} ťažšie dni`,other:`{n} ťažších dní`}},community:{title:`Komunita a podpora`,lead:`Nemusíš na to byť osamote. V našej komunite zdieľame vlastné skúsenosti, podržíme sa a odporúčame si špecialistov.`,facebook:`Facebook skupina`,facebookHint:`Skúsenosti, otázky a vzájomná podpora`,instagram:`Instagram`,instagramHint:`@vestibularnamigrena`,discord:`Discord`,discordHint:`Rozhovory s komunitou v reálnom čase`,webTitle:`Články na našom webe`,webText:`O diagnóze, liečbe a živote s vestibulárnou migrénou.`,webUrl:`www.vestibularnamigrena.sk`,external:`(otvorí sa mimo aplikácie)`,note:`Skúsenosti a odporúčania z komunity nenahrádzajú vyšetrenie a radu lekára.`,soon:`Čoskoro`},episodeTypes:{vestibular:`Vestibulárna epizóda`,migraine_headache:`Migréna s bolesťou hlavy`,migraine_no_headache:`Migréna bez bolesti hlavy`,other:`Iné`,unsure:`Neviem`},relief:{rest:`Oddych`,sleep:`Spánok`,dark_room:`Oddych v tmavej miestnosti`,hydration:`Pitie vody`,relaxation:`Relaxácia alebo meditácia`,cold_compress:`Studený obklad`,warm_compress:`Teplý obklad`,shower:`Sprcha`,food:`Jedlo`,other:`Iné`},impact:{work_study:`Práca alebo štúdium`,sleep:`Spánok`,daily_activities:`Bežné denné činnosti`,social:`Kontakt s rodinou a priateľmi`,movement:`Pohyb a fyzické aktivity`,rest:`Oddych a relaxácia`,other:`Iné`,none:`Epizóda ma výrazne neobmedzila`},episodeFlow:{typeTitle:`Aká to bola epizóda?`,typeLead:`Všetko v podrobnostiach je nepovinné. Čo nevieš, preskoč a doplň neskôr.`,intensity:`Celková intenzita`,symptomsTitle:`Aké príznaky sa objavili?`,symptomsLead:`Vyber jeden alebo viac. Silu každého zadáš v ďalšom kroku.`,date:`Dátum`,time:`Čas`,triggersTitle:`Čo ju mohlo spustiť?`,triggersLead:`Vyber všetko, čo sa ťa týka. Ide o možné súvislosti, nie potvrdené príčiny. Môžeš vybrať viac možností.`,triggerOther:`Iný spúšťač`,triggerOtherPlaceholder:`Napíš, čo to bolo`,medsTitle:`Užil/a si počas epizódy liek?`,medsLead:`Označ lieky a kedy si ich užil/a. Užitie sa uloží aj do Liečby.`,medsLogged:`Už zaznamenané počas epizódy`,medsNone:`Zatiaľ nemáš pridané žiadne lieky.`,addMed:`Pridať liek`,medsWhen:`Kedy si ich užil/a`,medsOutside:`Čas musí byť počas epizódy.`,helped:`Pomohlo to?`,reliefTitle:`Čo ti prinieslo úľavu?`,summaryTitle:`Zhrnutie epizódy`,summaryLead:`Skontroluj, čo si vyplnil/a. Každú časť môžeš upraviť.`,summaryMissing:`Ešte môžeš doplniť`,save:`Uložiť epizódu`,saved:`Epizóda bola uložená`,edit:`Upraviť`,sections:{type:`Typ`,intensity:`Intenzita`,time:`Čas`,symptoms:`Príznaky`,triggers:`Možné spúšťače`,meds:`Lieky`,helped:`Pomohlo to?`,relief:`Úľava`,impact:`Obmedzenia`},reliefLead:`Môžeš vybrať viac možností.`,reliefOther:`Čo ešte ti pomohlo?`,reliefOtherPlaceholder:`Napíš, čo to bolo`,impactTitle:`Ako ťa epizóda obmedzila?`,impactLead:`V ktorých oblastiach každodenného života si pocítil/a jej vplyv?`,impactOther:`Čo ešte epizóda ovplyvnila?`,impactOtherPlaceholder:`Napíš, čo to bolo`},symptomInfo:{open:`Čo znamená {name}?`,close:`Rozumiem`,dizziness:`Pocit omámenia, neistoty alebo straty rovnováhy. Môžeš mať pocit, že sa ti zatočila hlava, cítiš sa na odpadnutie alebo nemáš istotu pri státí či chôdzi.`,vertigo:`Falošný pocit pohybu, hoci sa v skutočnosti nehýbeš. Môžeš mať pocit, že sa točíš ty, že sa otáča miestnosť alebo že sa okolité prostredie pohybuje.`,brain_fog:`Stav, pri ktorom máš problém sústrediť sa, jasne premýšľať alebo spracovávať informácie. Môžeš mať pocit, že ti to myslí pomalšie, ťažšie hľadáš slová alebo sa horšie orientuješ v myšlienkach.`,visual_sensitivity:`Zvýšená citlivosť na vizuálne podnety. Pohybujúce sa obrazy, rušné prostredie, vzory, davy ľudí alebo obrazovky môžu vyvolávať závrat, nevoľnosť alebo dezorientáciu.`,tinnitus:`Vnímanie zvuku v jednom alebo oboch ušiach, hoci v okolí nie je žiadny skutočný zdroj zvuku. Môže ísť o pískanie, hučanie, bzučanie alebo šumenie.`,rocking:`Pocit, akoby sa tvoje telo alebo okolie jemne hojdalo, kolísalo zo strany na stranu alebo pohybovalo dopredu a dozadu, podobne ako na lodi.`,floating:`Pocit, akoby si sa nadnášal/a, nemal/a pevný kontakt so zemou.`,unsteadiness:`Pocit neistoty pri státí alebo chôdzi, akoby si strácal/a rovnováhu, vychyľoval/a sa do strán alebo potreboval/a oporu pri pohybe.`},quickIntake:{title:`Ktorý liek si užil/a?`,lead:`Vyber liek. V ďalšom kroku zadáš čas a či ti pomohol.`,add:`Pridať nový liek`,empty:`Zatiaľ nemáš pridané žiadne lieky. Pridaj liek a potom zaznamenáš jeho užitie.`},plus:JSON.parse(`{"name":"Vestie+","lockedLabel":"Súčasť Vestie+","tryChip":"Vyskúšať","demoChip":"Ukážka","features":{"weather":{"title":"Počasie a tlak","text":"Počasie a atmosférický tlak sa automaticky zaznamenávajú podľa tvojej polohy."},"forecast":{"title":"Upozornenia na počasie","text":"Vopred ťa upozorní na predpovedané výraznejšie zmeny atmosférického tlaku, teploty alebo vlhkosti."},"finder":{"title":"Hľadač súvislostí","text":"Porovná dni s ťažkosťami a bez nich a ukáže možné súvislosti."},"stats":{"title":"Pokročilé štatistiky","text":"Sleduj dlhodobý vývoj, časy výskytu epizód a prehľad užívania liekov po mesiacoch."},"health":{"title":"Prepojenie s aplikáciami zdravia","text":"Automatické zaznamenávanie spánku, krokov a tréningov cez Health Connect vrátane údajov z podporovaných hodiniek.","textIos":"Automatické zaznamenávanie spánku, krokov a tréningov cez Apple Zdravie vrátane údajov z podporovaných hodiniek."},"report":{"title":"Rozšírený report pre lekára","text":"Rozšírený report s údajmi o počasí, atmosférickom tlaku, fyzickej aktivite a možných súvislostiach."}},"periods":{"d90":"90 dní","d180":"6 mesiacov","d365":"12 mesiacov"},"plans":{"yearly":{"name":"Ročne","per":"ročne","hint":"V prepočte {monthly} mesačne, {trial} zadarmo","hintNoTrial":"V prepočte {monthly} mesačne","badge":"Ušetríš {percent} %","cta":"Vyskúšať {trial} zadarmo","ctaNoTrial":"Predplatiť za {price} ročne","terms":"{trial} zadarmo, potom {price} ročne. Predplatné sa obnovuje automaticky. Ak ho v {store} zrušíš pred koncom skúšky, nič nezaplatíš.","termsNoTrial":"{price} ročne. Predplatné sa obnovuje automaticky, kým ho v {store} nezrušíš."},"monthly":{"name":"Mesačne","per":"mesačne","hint":"{trial} zadarmo, zrušíš kedykoľvek","hintNoTrial":"Zrušíš kedykoľvek","cta":"Vyskúšať {trial} zadarmo","ctaNoTrial":"Predplatiť za {price} mesačne","terms":"{trial} zadarmo, potom {price} mesačne. Predplatné sa obnovuje automaticky. Ak ho v {store} zrušíš pred koncom skúšky, nič nezaplatíš.","termsNoTrial":"{price} mesačne. Predplatné sa obnovuje automaticky, kým ho v {store} nezrušíš."}},"paywall":{"title":"Viac údajov k tvojim záznamom","lead":"Vestie+ pridáva zápis počasia a tlaku vzduchu, upozornenia na zmeny počasia a porovnanie, ktoré ukáže možné súvislosti v tvojich záznamoch. Základný denník zostáva zadarmo.","choosePlan":"Vyber si predplatné","renewal":"Ceny sú vrátane DPH. Platbu vybaví {store}. Predplatné môžeš kedykoľvek zrušiť v nastaveniach {store}. Zrušenie platí ku koncu zaplateného obdobia alebo skúšobnej doby a Vestie+ ti dovtedy ostane.","withdrawal":"Od zmluvy môžeš odstúpiť bez uvedenia dôvodu do 14 dní od začiatku predplatného, aj keď začína skúšobnou dobou, a vrátime ti celú sumu. Odstúpiť môžeš z appky (Vestie+ → Odstúpiť od zmluvy tu) formulárom na našom webe. Podrobnosti sú v podmienkach používania.","acceptTerms":"Pokračovaním prijímaš {terms}.","acceptTermsLink":"podmienky používania","loadingPrices":"Načítavam ceny…","pricesFailed":"Ceny sa nepodarilo načítať. Skontroluj pripojenie na internet a skús to znova.","retryPrices":"Skúsiť znova","restored":"Predplatné už máš, Vestie+ je znova zapnuté.","freeTitle":"Základný denník ostáva zadarmo","freeText":"Záznamy príznakov a epizód, kalendár, prehľady, lieky, spánok aj report pre lekára. Keď predplatné skončí, tvoje záznamy ostanú tvoje.","demoNote":"V tomto náhľade sa nič neplatí.","restore":"Obnoviť nákup","redeem":"Mám promo kód","disclaimer":"Vestie+ nie je zdravotnícka pomôcka. Neposkytuje diagnózu ani liečbu a nenahrádza konzultáciu s lekárom.","notNow":"Teraz nie","nativeOnly":"Nákup bude dostupný v mobilnej appke.","nothingToRestore":"Nenašli sme žiadny nákup na obnovenie.","purchaseFailed":"Nákup sa nepodaril. Skús to znova neskôr.","purchasePending":"Platba sa ešte spracúva. Vestie+ sa zapne, keď ju obchod potvrdí.","provider":"Poskytovateľ: IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, IČO 47321547, support@vestibularnamigrena.sk."},"redeem":{"title":"Promo kód","single":"Kód na jedno použitie zadáš v {store}: ťukni na tlačidlo nižšie, zadaj kód a potvrď. Keď sa vrátiš do appky, Vestie+ sa zapne samo.","promo":"Kód akcie, napríklad z komunity, zadáš pri nákupe: vyber plán, pokračuj na nákup a v okne {store} ťukni na spôsob platby a potom na Uplatniť kód.","trial":"Aj s kódom ide o skúšku zadarmo, po ktorej sa predplatné obnovuje a platí. Jej dĺžku ti {store} ukáže pred potvrdením.","open":"Otvoriť {store}","preview":"V náhľade sa kód neuplatňuje. V appke sa otvorí {store}."},"manage":{"title":"Tvoje Vestie+","lead":"Všetko na jednom mieste. Každú funkciu môžeš kedykoľvek zapnúť alebo vypnúť.","welcomeTitle":"Vitaj vo Vestie+","welcomeLead":"Počasie a tlak si zapni ako prvé. Ostatné funkcie nájdeš v zozname.","features":"Funkcie","subscription":"Predplatné","trialUntil":"Skúšobná doba do {date}","since":"Aktívne od {date}","cancel":"Zrušiť predplatné","cancelHint":"Tvoje záznamy ostanú v telefóne.","cancelTitle":"Zrušiť Vestie+?","cancelText":"Funkcie Vestie+ sa uzamknú. Všetky záznamy vrátane zapísaného počasia a tlaku ti ostanú.","cancelConfirm":"Zrušiť predplatné","cancelled":"Vestie+ je zrušené","toToday":"Pokračovať na Domov","enableWeather":"Zapnúť počasie a tlak","manageStore":"Spravovať v Google Play","manageStoreHint":"Tu predplatné zmeníš alebo zrušíš. Tvoje záznamy ostanú v telefóne."},"withdraw":{"row":"Odstúpiť od zmluvy tu","rowHint":"Bez uvedenia dôvodu do {date}. Vrátime ti celú sumu.","rowHintTrial":"Bez uvedenia dôvodu do {date}. Počas skúšky nič nezaplatíš.","title":"Odstúpenie od zmluvy","lead":"Od zmluvy o predplatnom Vestie+ môžeš odstúpiť bez uvedenia dôvodu do {date}. Odstúpenie odošleš formulárom na našom webe, ktorý sa otvorí v prehliadači.","leadLate":"Lehota 14 dní na odstúpenie bez uvedenia dôvodu už uplynula. Ak si myslíš, že máš na odstúpenie nárok z iného dôvodu, môžeš použiť formulár alebo nám napísať.","note":"Appka pri tom nič neodosiela ani neukladá. Odstúpiť môžeš aj e-mailom na {address} alebo vzorovým formulárom z podmienok používania. Formulár je aj na vestibularnamigrena.sk/vestie/odstupenie, keby si appku už nemal/a.","demoNote":"V tomto náhľade sa formulár neotvára a nič sa neodosiela.","stepForm":"Vo formulári vyplň meno a e-mail. Číslo objednávky doplníme za teba, ak ho appka pozná.","stepConfirm":"Potvrď tlačidlom „Potvrdiť odstúpenie od zmluvy“. Oznámenie sa odošle hneď a potvrdenie s dátumom a časom ti príde e-mailom.","stepAfter":"Vrátime ti celú sumu cez Google Play do 14 dní a Vestie+ sa vypne. Tvoje záznamy ostanú v telefóne.","stepAfterTrial":"Si v skúšobnej dobe, preto predplatné zrušíme a nič nezaplatíš. Vestie+ sa potom vypne a tvoje záznamy ostanú v telefóne.","openForm":"Pokračovať na formulár","openFailed":"Formulár sa nepodarilo otvoriť. Napíš nám na {address}."},"confirmation":{"row":"Potvrdenie predplatného","rowHint":"Hlavné podmienky a lehota na odstúpenie","title":"Potvrdenie predplatného","lead":"Hlavné podmienky tvojej zmluvy o Vestie+. Appka si potvrdenie uložila v znení z dňa, keď vzniklo, a už ho nemení. Ulož si ho aj do súboru, nech ho máš aj po odinštalovaní appky.","plan":"Predplatné","price":"Cena","priceUnknown":"Podľa potvrdenia od {store}","started":"Začiatok","trialEnd":"Skúšobná doba do","order":"Číslo objednávky","withdrawUntil":"Odstúpiť možno do","providerTitle":"Poskytovateľ","providerText":"IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, IČO 47321547, DIČ 2023812813, IČ DPH SK2023812813 (registrácia podľa § 7a zákona o DPH, nie sme platiteľ DPH), zapísaná v Obchodnom registri Mestského súdu Bratislava III, oddiel Sro, vložka č. 90506/B. Kontakt: {email}, tel. +421 902 811 486.","renewalTitle":"Obnovovanie a zrušenie","renewalText":"Ceny sú vrátane DPH. Predplatné sa na konci každého obdobia samo obnoví a znova zaplatí, kým ho nezrušíš. Ak začína skúšobnou dobou, prvá platba prebehne až po jej skončení a ak ho zrušíš skôr, nezaplatíš nič. Zrušíš ho kedykoľvek v nastaveniach predplatných v {store} (Vestie+ → {manage}). Vestie+ ti potom ostane do konca zaplateného obdobia alebo skúšobnej doby.","withdrawalTitle":"Odstúpenie od zmluvy","withdrawalText":"Od zmluvy môžeš odstúpiť bez uvedenia dôvodu do {date}, teda do 14 dní od začiatku predplatného vrátane skúšobnej doby. Odstúpiť môžeš formulárom na vestibularnamigrena.sk/vestie/odstupenie (z appky cez Vestie+ → {row}), e-mailom na {email} alebo vzorovým formulárom nižšie. Ak odstúpiš počas skúšobnej doby, predplatné zrušíme a nič nezaplatíš. Ak už prebehla platba, vrátime ti celú sumu cez {store} najneskôr do 14 dní od doručenia oznámenia. Za dni, keď si Vestie+ používal/a, nič nestrhávame.","termsText":"Zmluva sa riadi podmienkami používania vo verzii {version}. Ich celé znenie z dňa, keď potvrdenie vzniklo, je súčasťou uloženého potvrdenia.","termsOpen":"Otvoriť podmienky používania","save":"Uložiť potvrdenie","saved":"Potvrdenie je uložené","saveFailed":"Potvrdenie sa nepodarilo uložiť. Skús to znova.","fileName":"plus-potvrdenie","created":"Vytvorené {time}","demoNote":"V tomto náhľade je predplatné iba ukážkové a nič sa neplatí.","snapshotNote":"Znenie uložené {time}"},"charts":{"legend":"Vysvetlivky grafu","showTable":"Zobraziť ako tabuľku"},"weather":{"hpa":"{value} hPa","temps":"{min} až {max} °C","changeShort":"{value} oproti predošlému dňu","conditions":{"clear":"Jasno","partly":"Polojasno","cloudy":"Oblačno","fog":"Hmla","rain":"Dážď","snow":"Sneh","storm":"Búrka"},"offLead":"Aplikácia bude každý deň zapisovať počasie a atmosférický tlak, aby si ich mal/a pri svojich záznamoch a mohol/mohla ich s nimi porovnať.","factRecord":"Od zapnutia sa zapisuje tlak, teplota, vlhkosť a počasie každého dňa. Zapísané dni ostávajú v telefóne. Dni pred zapnutím sa nedopĺňajú.","factLocation":"Pri každej aktualizácii sa spoločnosti OpenWeather Ltd. (Spojené kráľovstvo) odošle iba poloha zaokrúhlená na približne 10 km. Technicky pri tom vidí aj tvoju IP adresu.","factHealth":"Žiadne tvoje záznamy sa nikdy neodosielajú.","factOff":"Kedykoľvek to môžeš vypnúť.","enable":"Povoliť polohu a zapnúť","today":"Dnes","condition":"Počasie","temperature":"Teplota","humidity":"Vlhkosť","humidityValue":"Vlhkosť {value} %","forecastWord":"predpoveď","estimateWord":"odhad","episodeWord":"epizóda","chartTitle":"Tlak v čase","rangeDays":"{n} dní","chartLabel":"Graf barometrického tlaku za posledných {n} dní a predpoveď na najbližšie dni. Bodky označujú dni s epizódou.","legendPressure":"Tlak","legendForecast":"Predpoveď","legendEpisode":"Deň s epizódou","colDay":"Deň","colPressure":"Tlak","colChange":"Zmena","colEpisode":"Epizóda","forecastTitle":"Predpoveď na najbližšie dni","linkTitle":"Tlak a tvoje záznamy","linkText":"V Hľadači súvislostí si môžeš porovnať tlak so svojimi záznamami.","openFinder":"Otvoriť hľadač súvislostí","myLocation":"Podľa tvojej polohy","noData":"Pre dnešok zatiaľ nie sú údaje o počasí.","settings":"Nastavenia","updateLocation":"Aktualizovať teraz","turnOff":"Vypnúť počasie a tlak","turnOffHint":"Zapísané dni ostanú.","turnOffTitle":"Vypnúť počasie a tlak?","turnOffText":"Appka prestane zisťovať počasie a zabudne tvoju polohu. Dni, ktoré sa už zapísali, ostanú.","attribution":"Údaje o počasí poskytuje OpenWeather","disclaimer":"Údaje sú z meteorologických modelov pre tvoju približnú polohu a predpoveď sa môže líšiť od skutočnosti. Dni, keď si appku neotvoril/a, sú odhad z poslednej predpovede. Súvislosť s počasím nie je dôkazom príčiny.","loading":"Zisťujem počasie…","enabled":"Počasie a tlak sú zapnuté","errors":{"denied":"Bez povolenia polohy to nepôjde. Povoľ ju v nastaveniach telefónu alebo prehliadača.","unavailable":"Polohu sa nepodarilo zistiť. Skús to znova.","network":"Počasie sa nepodarilo načítať. Skontroluj pripojenie na internet.","setup":"Počasie v tejto verzii zatiaľ nie je nastavené. Skús to neskôr."},"episodeDay":"Počasie a aktivita v ten deň","updated":"Aktualizované {time}. Údaje sa obnovujú samy.","stale":"Bez pripojenia. Posledné údaje sú z {time}.","bands":{"low":"Nízky tlak","normal":"Bežný tlak","high":"Vyšší tlak","veryHigh":"Veľmi vysoký tlak"},"bandRanges":{"low":"menej ako 1000 hPa","normal":"1000 až 1020 hPa","high":"1021 až 1029 hPa","veryHigh":"1030 hPa a viac"},"bandTitle":"Čo znamenajú hodnoty tlaku","bandNow":"teraz","bandNote":"Hodnoty sú orientačné. Tlak je prepočítaný na hladinu mora rovnako ako v predpovediach počasia, preto sa dá porovnať aj vo vyššej nadmorskej výške. Okrem samotnej hodnoty appka ukazuje aj zmenu oproti predošlému dňu a hľadač súvislostí porovnáva dni, keď sa tlak zmenil o 6 hPa a viac."},"health":{"connected":"Prepojené","notConnected":"Neprepojené","stepsValue":"{value} krokov","lead":"Spánok, kroky a tréningy sa môžu načítavať priamo z telefónu cez Health Connect. Zapisujú tam aj hodinky ako Garmin, Samsung či Fitbit.","leadIos":"Spánok, kroky a tréningy sa môžu načítavať priamo z telefónu cez Apple Zdravie. Zapisujú tam aj hodinky ako Apple Watch či Garmin.","providers":{"apple_health":"Apple Zdravie","health_connect":"Health Connect"},"typesTitle":"Čo načítavať","types":{"sleep":"Spánok","steps":"Kroky","workouts":"Tréningy"},"privacy":"Údaje sa iba načítajú do tohto telefónu a nikam sa neodosielajú. Ručne zapísaný spánok sa neprepíše.","lastSync":"Naposledy načítané {time}","stepsToday":"Kroky dnes","sleepToday":"Spánok dnes v noci","stepsWeek":"Kroky za posledných 7 dní","sleepWeek":"Spánok za posledných 7 nocí (hodiny)","noValue":"bez záznamu","disconnect":"Odpojiť","disconnectTitle":"Odpojiť zdravotnú appku?","disconnectText":"Appka prestane načítavať nové údaje. To, čo sa už načítalo, ostane v tvojich záznamoch.","revokeHint":{"health_connect":"Povolenie na čítanie údajov zrušíš v nastaveniach Health Connect.","apple_health":"Povolenie na čítanie údajov zrušíš v appke Zdravie v časti Zdieľanie."},"disconnectedToast":"Odpojené","openSettings":"Nastavenia","connectedToast":"Prepojené","connectTo":{"apple_health":"Prepojiť s Apple Zdravím","health_connect":"Prepojiť s Health Connect"},"browserOnly":"Webový prehliadač k týmto údajom nemá prístup. Prepojenie funguje iba v mobilnej appke, kde sa údaje po povolení načítavajú samy. V tomto náhľade preto nič neukazujeme, aby tu neboli vymyslené čísla.","errors":{"denied":"Bez povolenia sa údaje načítať nedajú. Povoľ ich v nastaveniach telefónu.","unavailable":"Zdravotná appka nie je v tomto telefóne dostupná. Na Androide si nainštaluj Health Connect."},"typesHint":"Pri tréningoch sa načíta iba druh a trvanie, napríklad bicykel, hokej alebo posilňovanie. Chôdza sa počíta v krokoch.","workouts":{"cycling":"Bicykel","running":"Beh","walking":"Chôdza","hiking":"Turistika","swimming":"Plávanie","strength":"Posilňovanie","hockey":"Hokej","soccer":"Futbal","basketball":"Basketbal","volleyball":"Volejbal","teamSport":"Kolektívny šport","tennis":"Tenis","racket":"Raketový šport","yoga":"Joga a strečing","dance":"Tanec","skiing":"Lyžovanie","skating":"Korčuľovanie","climbing":"Lezenie","rowing":"Veslovanie","cardio":"Kardio","combat":"Bojové športy","other":"Iná aktivita"},"workoutsWeek":"Tréningy za posledných 7 dní","workoutsNone":"Za posledných 7 dní tu nie je žiadny tréning."},"finder":{"ofDays":"{a} z {b}","percent":"{n} %","factors":{"pressure_drop":"Deň s poklesom tlaku o 6 hPa a viac","pressure_rise":"Deň s nárastom tlaku o 6 hPa a viac","humid":"Deň s vysokou vlhkosťou (85 % a viac)","temp_swing":"Deň so zmenou teploty o 8 °C a viac","short_sleep":"Noc kratšia ako 6 hodín","poor_sleep":"Noc so zlou kvalitou spánku","high_steps":"Deň s 12 000 krokmi a viac","low_steps":"Deň s menej ako 3 000 krokmi","period":"Obdobie okolo menštruácie","workout":"Deň s tréningom 30 min a viac"},"strength":{"strong":"Výraznejší rozdiel","possible":"Možná súvislosť","none":"Bez výrazného rozdielu","few":"Málo údajov"},"fewFactor":"Zatiaľ to nastalo {n}-krát, na porovnanie je to málo.","after":"Ťažší deň v ten deň alebo na druhý deň","otherDays":"V ostatných dňoch","lead":"Aplikácia porovnáva, ako často je ťažší deň v ten istý alebo nasledujúci deň po tom, čo sa daný faktor objavil, a ako často inokedy. Za ťažší deň sa považuje deň s epizódou alebo príznakom s intenzitou aspoň {intensity}.","summary":"V tomto období je to {hard} z celkom {days}.","notEnough":"Zatiaľ máš zaznamenané {days} a {hard}. Na porovnanie treba aspoň 30 dní a 5 ťažších dní.","moreTitle":"Čo ešte porovnať","more":{"weather":"Zapni ich a porovnáme aj tlak, vlhkosť a teplotu.","health":"Prepoj ho a porovnáme aj kroky."},"loggedTitle":"Čo si sám/sama označil/a pri epizódach","loggedLead":"Tieto možné spúšťače zapisuješ iba pri epizódach, preto sa nedajú porovnať s dňami bez ťažkostí. Ukazujeme iba, koľkokrát si ich označil/a.","howTitle":"Ako to počítame","howText":"Ťažší deň hľadáme v ten istý deň a na druhý deň (pri krokoch iba na druhý deň). Deň bez záznamu sa počíta ako deň bez ťažkostí, chýbajúci spánok alebo tlak sa nedopĺňa. Rozdiel označíme, až keď je dosť veľký a dní na porovnanie je dosť. Aj tak môže byť náhodný, najmä pri označení „Možná súvislosť“.","disclaimer":"Možná súvislosť nie je dôkazom príčiny. Výsledok sa môže zmeniť s ďalšími záznamami. Ak chceš niečo zmeniť v liečbe, poraď sa s lekárom.","toForecast":"Zapnúť upozornenia na počasie","toForecastNote":"Upozornenia hlásia iba predpoveď počasia. Nehovoria nič o tom, ako sa budeš cítiť.","moreRecords":"Čím viac dní zapíšeš, tým viac dní sa dá porovnať. Výsledky ber ako orientačné, najmä kým máš záznamov málo."},"forecast":{"today":"Dnes","tomorrow":"Zajtra","signals":{"pressure_drop":"Hlásia pokles tlaku o {amount} hPa.","pressure_rise":"Hlásia nárast tlaku o {amount} hPa.","humid":"Hlásia vysokú vlhkosť ({amount} %).","temp_swing":"Hlásia zmenu teploty o {amount} °C."},"levels":{"change":"Hlásia výraznú zmenu","calm":"Bez výrazných zmien"},"cardTitle":"Zmena počasia · {day}","factWeather":"Sleduj predpoveď atmosférického tlaku, vlhkosti a teploty na najbližšie dni.","factRecords":"Vyber si, na ktoré zmeny ťa má aplikácia upozorniť. Predvolený je pokles tlaku a výber môžeš kedykoľvek zmeniť.","factNotify":"Upozornenie dostaneš večer pred dňom, na ktorý sa predpovedá vybraná zmena.","factOff":"Upozornenia môžeš kedykoľvek vypnúť, ak ti nevyhovujú.","offLead":"Aplikácia ťa vopred upozorní na výrazné zmeny počasia očakávané na nasledujúci deň. Vyberieš si, na ktoré zmeny chceš byť upozornený/á.","disclaimer":"Upozornenia hlásia iba predpoveď počasia z meteorologických modelov pre tvoju približnú polohu a skutočnosť sa môže líšiť. Nehovoria nič o tom, ako sa budeš cítiť, a nie sú zdravotnou radou. Lieky ani liečbu podľa nich nemeň.","enable":"Zapnúť upozornenia na počasie","calmText":"Žiadna zo sledovaných zmien sa nehlási.","lead":"Výrazné zmeny počasia na dnes a najbližšie tri dni.","weatherOff":"Zapni počasie a tlak","weatherOffHint":"Upozornenia potrebujú predpoveď počasia.","notifyTitle":"Upozornenia","notify":"Upozorniť ma vopred","notifyHint":"Večer pred dňom s vybranou zmenou. Vychádza z predpovede pri poslednom otvorení appky.","notifyTime":"Kedy ma upozorniť","previewLabel":"Takto bude vyzerať upozornenie v telefóne:","disable":"Vypnúť upozornenia na počasie","staleForecast":"Predpoveď je staršia ako deň, preto na ňu teraz neupozorňujeme. Skontroluj pripojenie na internet.","nothingToNotify":"Podľa aktuálnej predpovede teraz nie je na čo upozorniť.","alertsTitle":"Na čo ma upozorniť","alerts":{"pressure_drop":"Pokles tlaku","pressure_rise":"Nárast tlaku","humid":"Vysoká vlhkosť","temp_swing":"Prudká zmena teploty"},"alertsNone":"Vyber aspoň jednu zmenu, inak appka nebude na nič upozorňovať."},"stats":{"empty":"Štatistiky sa skladajú z tvojich záznamov. Keď budeš mať zapísané príznaky alebo epizódy, uvidíš ich tu.","noCompare":"bez porovnania","same":"rovnako ako predtým","less":"o {value} menej","more":"o {value} viac","compareTitle":"Oproti predošlému obdobiu","compareLead":"Posledných {days} oproti rovnako dlhému obdobiu predtým.","symptomDaysValue":"dni s príznakmi: {n}","trendTitle":"Dni s príznakmi po mesiacoch","trendLabel":"Stĺpcový graf počtu dní s príznakmi za posledných 12 mesiacov.","colMonth":"Mesiac","rhythmTitle":"Kedy epizódy začínajú","rhythmLead":"Spolu {n} podľa dňa v týždni a časti dňa.","parts":{"morning":"Ráno","afternoon":"Popol.","evening":"Večer","night":"Noc"},"cycleStart":"Prvý deň menštruácie","cycleOffset":"Deň {n} od začiatku","cycleTitle":"Epizódy okolo menštruácie","cycleLead":"Z {n} zapísaných menštruácií. Ďalšiu menštruáciu appka nepredpovedá.","colCycleDay":"Deň","reliefTitle":"Čo si najčastejšie zapísal/a ako úľavu","impactTitle":"Čo epizódy najčastejšie obmedzili","medTitle":"Užívanie liekov po mesiacoch","medLead":"Koľkokrát si liek zapísal/a v jednotlivých mesiacoch zvoleného obdobia.","medSince":"Užívaš od {date}","medDisclaimer":"Je to iba prehľad tvojich záznamov, nie hodnotenie lieku. O liečbe sa rozhoduj so svojím lekárom.","medTotal":"Spolu {count}, naposledy {date}","colCount":"Počet"},"demoSymptoms":"V tejto ukážke sú príznaky a epizódy vymyslené, počasie je skutočné. Či sa ukáže možná súvislosť s tlakom, bude vidno až z tvojich vlastných záznamov."}`),failure:{title:`Túto obrazovku sa nepodarilo zobraziť`,text:`Tvoje záznamy ostali uložené. Skús to znova. Ak to nepomôže, vytvor si zálohu alebo obnov údaje zo zálohy.`,retry:`Skúsiť znova`,backup:`Záloha a obnovenie`,home:`Na Domov`},notifications:{channelReminders:`Denná pripomienka`,channelForecast:`Zmeny počasia`,reminderBody:`Ako sa dnes máš? Zapíš si, ako sa cítiš.`,denied:`Telefón upozornenia nepovolil. Zapneš ich v nastaveniach telefónu.`},about:{title:`O aplikácii`,row:`O aplikácii a licencie`,appVersion:`Verzia {version}`,publisherTitle:`Kto appku vydáva`,publisherText:`Vestie vydáva IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, IČO 47321547, DIČ 2023812813, IČ DPH SK2023812813 (registrácia podľa § 7a zákona o DPH, nie sme platiteľ DPH), zapísaná v Obchodnom registri Mestského súdu Bratislava III, oddiel Sro, vložka č. 90506/B.
Podpora a otázky o osobných údajoch: support@vestibularnamigrena.sk, tel. +421 902 811 486.`,medicalTitle:`Appka nie je zdravotnícka pomôcka`,medicalText:`Vestie je osobný denník. Nediagnostikuje, nelieči, nevylieči ani nepredchádza žiadnemu ochoreniu, neodporúča lieky ani ich dávkovanie a nenahrádza lekára. Pri náhlych, silných alebo nezvyčajných ťažkostiach vyhľadaj lekársku pomoc alebo volaj 155 či 112.`,weatherTitle:`Údaje o počasí`,weatherText:`Počasie a tlak vzduchu vo Vestie+ poskytuje OpenWeather (openweathermap.org).`,licensesTitle:`Licencie open-source`,licensesText:`Vestie používa tieto knižnice a písma. Ďakujeme ich autorom.
DM Sans a DM Serif Display – © The DM Sans Project Authors, © Google Inc., licencia SIL Open Font License 1.1 (openfontlicense.org)
Lucide – © Lucide Contributors, licencia ISC (lucide.dev/license)
Capacitor a jeho doplnky – © Ionic Team, licencia MIT (github.com/ionic-team/capacitor)
Capacitor Health a Native Purchases – © Capgo, Martin Donadieu, licencia MPL 2.0, zdrojový kód na github.com/Cap-go
GSAP – © GreenSock, štandardná bezplatná licencia (gsap.com/standard-license)
fontsource – © Fontsource Authors, licencia MIT
Plné znenie licencií je na uvedených adresách.`}},cs:{app:{name:`Vestie`,logo:`Vestie – Vestibulárna migréna`},common:{continue:`Pokračovat`,skip:`Přeskočit`,back:`Zpět`,save:`Uložit`,cancel:`Zrušit`,close:`Zavřít`,yes:`Ano`,undo:`Vrátit`,optional:`nepovinné`,on:`Zapnuto`,off:`Vypnuto`,stepOf:`Krok {step} z {total}`},language:{title:`Vyber si jazyk`,sk:`Slovenčina`,cs:`Čeština`,en:`English`},welcome:{title:`Tvůj deník příznaků`,text:`Zapisuj příznaky, epizody, léky a spánek. Appka je seřadí do kalendáře a přehledů a připraví report, který můžeš ukázat lékaři.`,cta:`Začít`},goals:{title:`K čemu chceš aplikaci používat?`,lead:`Vyber, co je pro tebe důležité. Můžeš zvolit více možností nebo pokračovat bez výběru.`,options:{symptoms:`Zaznamenávat příznaky`,triggers:`Zaznamenávat možné spouštěče`,patterns:`Porozumět svým potížím`,doctor:`Připravit přehled pro lékaře`}},condition:{title:`Co chceš sledovat?`,lead:`Výběr slouží jen k přizpůsobení obsahu, nejde o diagnózu. Můžeš ho kdykoli změnit v Profilu.`,options:{vestibular_migraine:`Vestibulární migréna`,migraine:`Migréna`,other_vestibular:`Jiné vestibulární onemocnění`,unsure:`Nejsem si jistý/jistá`}},cycle:{title:`Chceš sledovat menstruační cyklus?`,lead:`Tato funkce je volitelná. Později ji můžeš zapnout nebo vypnout v nastavení.`,yes:`Ano`,no:`Ne`},medications:{title:`Chceš přidat své léky?`,lead:`Můžeš přidat léky, které užíváš preventivně nebo při akutních potížích. Tento krok můžeš vynechat a léky přidat později.`,add:`Přidat léky`,addAnother:`Přidat další lék`,added:`Přidané léky`,remove:`Odebrat lék {name}`,disclaimer:`Aplikace nedoporučuje dávkování ani nemění tvou léčbu.`,types:{preventive:`Preventivní`,acute:`Akutní`}},medForm:{title:`Nový lék`,name:`Název léku`,namePlaceholder:`Název z krabičky`,nameRequired:`Zadej název léku.`,type:`Typ léku`,dose:`Dávka`,dosePlaceholder:`např. 1 tableta`,frequency:`Frekvence`,frequencyPlaceholder:`Jak ti ho předepsal lékař`,note:`Poznámka`,submit:`Uložit lék`,saved:`Lék {name} byl přidán`,startDate:`Začátek užívání`,startDateHint:`Pomůže tobě i lékaři vidět, odkdy lék užíváš.`},reminders:{title:`Chceš si nastavit připomínku?`,lead:`Každý den ti v čase, který si zvolíš, připomeneme, abys zaznamenal/a své příznaky a to, jak se cítíš.`,yes:`Ano`,no:`Ne, zatím ne`,time:`Kdy ti ji máme připomenout?`,permission:`Telefon tě pak požádá o povolení posílat upozornění. Připomínku můžeš kdykoli vypnout v profilu.`},today:{greeting:`Ahoj`,greetingName:`Ahoj, {name}`,howAreYou:`Jak se dnes cítíš?`,noEntries:`Dnes zatím nemáš zaznamenané žádné příznaky.`,addSymptom:`Přidat příznak`,overview:`Dnes`,sleep:`Spánek`,meds:`Léky`,nothingYet:`Zatím nic`,entriesEmpty:`Zatím tu nic není. Příznak přidáš tlačítkem výše, epizodu spustíš uprostřed spodního menu.`,symptomsToday:`Dnes zaznamenané příznaky`,intakeTitle:`Lék`,logIntake:`Zaznamenat lék`,pressure:`Tlak`,steps:`Kroky`,turnOn:`Zapnout`,connect:`Propojit`,mobileOnly:`V mobilní appce`},episode:{title:`Epizoda`,ongoing:`Probíhá epizoda`,statusOngoing:`Probíhá`,statusEnded:`Ukončená`,started:`Epizoda byla spuštěna`,startedAt:`Začátek`,endedAt:`Konec`,duration:`Trvání`,since:`od {time}`,lasting:`trvá {duration}`,detailsLater:`Podrobnosti můžeš doplnit teď nebo kdykoli později. Epizoda zůstane uložená, i když aplikaci zavřeš.`,addDetails:`Přidat podrobnosti`,finishLater:`Dokončit později`,end:`Ukončit epizodu`,endedToast:`Epizoda byla ukončena`,mistake:`Spuštěná omylem?`,cancel:`Zrušit epizodu`,cancelledToast:`Epizoda byla zrušena`,delete:`Smazat epizodu`,deleteTitle:`Smazat epizodu?`,deleteText:`Záznam se natrvalo odstraní z tohoto zařízení.`,deletedToast:`Epizoda byla smazána`,notFound:`Tato epizoda už neexistuje.`,linkedSymptoms:`Příznaky zaznamenané během epizody`,linkedIntakes:`Léky užité během epizody`,editDetails:`Upravit podrobnosti`,saveLater:`Uložit a doplnit později`,savedLater:`Epizoda je uložená. Podrobnosti doplníš kdykoli v jejím detailu.`,details:`Podrobnosti`},duration:{underMinute:`méně než minuta`,minutes:`{m} min`,hours:`{h} h`,hoursMinutes:`{h} h {m} min`},nav:{label:`Hlavní navigace`,today:`Domů`,calendar:`Kalendář`,insights:`Přehledy`,treatment:`Léčba`,profile:`Profil`,startEpisode:`Spustit epizodu`},profile:{title:`Profil`,me:`Můj profil`,name:`Jméno`,namePlaceholder:`Nepovinné`,nameHint:`Použijeme ho jen k pozdravu na domovské obrazovce.`,language:`Jazyk`,tracking:`Sledování`,condition:`Co sleduji`,conditionNone:`Nevybráno`,cycle:`Menstruační cyklus`,reminders:`Denní připomínka`,reminderTime:`Čas připomínky`,display:`Zobrazení`,privacy:`Soukromí`,deleteAll:`Smazat všechna data`,deleteAllTitle:`Smazat všechna data?`,deleteAllText:`Odstraní se všechny záznamy, léky a nastavení v tomto zařízení. Tuto akci nelze vrátit. Zálohy a exporty, které máš uložené mimo appku, a oprávnění v nastavení telefonu zůstávají.`,deleteAllConfirm:`Ano, smazat`,saved:`Uloženo`,disclaimer:`Aplikace slouží k osobnímu zaznamenávání a není zdravotnickým prostředkem. Neposkytuje diagnózu ani léčbu a nenahrazuje konzultaci s lékařem. Při náhlých, silných nebo neobvyklých potížích vyhledej lékařskou pomoc nebo volej 155 či 112.`,integrations:`Propojení`,health:`Chytré hodinky a zdravotní údaje`,healthHint:`Spánek, kroky a tréninky z Health Connect, i z tvých hodinek.`,healthHintIos:`Spánek, kroky a tréninky z Apple Zdraví, i z tvých hodinek.`,logout:`Odhlásit se`,logoutNoPinTitle:`Nejdřív si nastav PIN`,logoutNoPinText:`Bez PINu by se do appky po odhlášení dostal kdokoli s tvým telefonem. Po nastavení PINu tě hned odhlásíme.`,logoutNoPinConfirm:`Nastavit PIN`,appearance:`Vzhled`,themes:{light:`Světlý`,dark:`Tmavý`,system:`Podle telefonu`},demoSection:`Ukázka appky`,demoFill:`Vyplněná appka`,demoFillHint:`Vypni a uvidíš prázdnou appku jako nový uživatel.`,demoFillOn:`Ukázková data jsou zapnutá`,demoFillOff:`Ukázková data jsou vypnutá, appka je prázdná`,weatherHint:`Tlak a počasí podle polohy se zapisují každý den.`,demoPlus:`Vestie+ zapnuto`,demoPlusHint:`Přepni a uvidíš appku s předplatným nebo bez něj.`,plusActive:`Moje Vestie+`,plusTry:`Vyzkoušet Vestie+`,plusHint:`Počasí a tlak, upozornění na počasí, hledač souvislostí a další.`,help:`Pomoc`,reportBug:`Nahlásit chybu`,reportBugHint:`E-mail s verzí appky a telefonu, bez záznamů z deníku`},bugReport:{title:`Nahlásit chybu`,open:`Otevře se e-mail na {email}. Napiš do něj, co se stalo a co jsi právě dělal/a. Pomůže i snímek obrazovky.`,details:`Přibalíme jen verzi appky, systém a model telefonu ({details}). Záznamy z deníku ne. E-mail před odesláním uvidíš a můžeš ho upravit.`,health:`Prosím, nepiš do něj víc údajů o zdraví, než je nutné.`,confirm:`Otevřít e-mail`,subject:`{app} – chyba ({version})`,body:`Co se stalo:


Kde v appce a co jsem právě dělal/a:


Děje se to vždy, nebo jen někdy:


---
Verze appky: {version}
Systém: {system}
Telefon: {device}`},symptoms:{dizziness:`Závrať`,vertigo:`Vertigo`,rocking:`Houpání / kolébání`,floating:`Pocit vznášení`,unsteadiness:`Nestabilita / nejistota při chůzi`,nausea:`Nevolnost`,vomiting:`Zvracení`,light_sensitivity:`Citlivost na světlo`,sound_sensitivity:`Citlivost na zvuk`,visual_sensitivity:`Zraková citlivost`,tinnitus:`Tinnitus / pískání v uších`,ear_pressure:`Tlak v uších`,headache:`Bolest hlavy`,brain_fog:`Mozková mlha`,fatigue:`Únava`,unknown:`Neznámý příznak`},durations:{just_started:`Právě začaly`,under_1h:`Méně než 1 hodinu`,"1_3h":`1–3 hodiny`,"3_6h":`3–6 hodin`,"6_12h":`6–12 hodin`,over_12h:`Více než 12 hodin`,ongoing:`Stále přetrvávají`,moment:`Chvíli (sekundy až minuty)`},triggers:{poor_sleep:`Nekvalitní / krátký spánek`,stress:`Stres`,skipped_meal:`Vynechané jídlo`,dehydration:`Dehydratace`,caffeine:`Kofein`,alcohol:`Alkohol`,exertion:`Fyzická námaha`,illness:`Nemoc / infekce`,visual_stimulation:`Zraková stimulace`,screen_time:`Dlouhý čas u obrazovky`,weather_change:`Změna počasí`,menstrual_cycle:`Menstruační cyklus`,travel:`Cestování / pohyb`,other:`Jiné`,long_sleep:`Příliš dlouhý spánek`,bright_light:`Ostré světlo / sluneční záření`,strong_smells:`Silné pachy`,neck_pain:`Bolest nebo napětí krku`,allergy:`Alergie`},effects:{helped:`Pomohlo`,partly:`Částečně`,not_helped:`Nepomohlo`,unknown:`Nevím`},intensity:{none:`žádná`,mild:`mírná`,moderate:`střední`,severe:`silná`,notSet:`Nezadáno`,value:`{value} – {level}`,highest:`nejvyšší intenzita {value}`},log:{symptomsTitle:`Jaké příznaky zaznamenáváš?`,symptomsLead:`Vyber jeden nebo více příznaků.`,search:`Hledat příznak`,noMatch:`Hledání neodpovídá žádný příznak. Můžeš přidat vlastní.`,custom:`Vlastní příznak`,customPlaceholder:`Napiš název příznaku`,customAdd:`Přidat`,continueCount:`Pokračovat ({n})`,intensityTitle:`Jak silná je intenzita?`,intensityLead:`0 = žádná, 10 = nejhorší. Posuvník začíná na 5 – posuň ho podle toho, jak se cítíš. Kterýkoli příznak můžeš vynechat.`,clear:`Vynechat`,detailsTitle:`Jak dlouho tyto příznaky trvají?`,detailsLead:`Všechno na této obrazovce je nepovinné.`,when:`Kdy začaly`,date:`Datum`,time:`Čas`,note:`Poznámka`,linkEpisode:`Přiřadit k probíhající epizodě`,save:`Uložit záznam`,saved:`Záznam byl uložen`,whenToday:`Dnes v {time}`,whenOn:`{date} v {time}`,changeTime:`Změnit čas`,clearLabel:`Vynechat intenzitu: {name}`,restore:`Zadat intenzitu`},symptomLog:{title:`Příznaky`,duration:`Trvání`,note:`Poznámka`,episode:`Součást epizody`,edit:`Upravit záznam`,delete:`Smazat záznam`,deleteTitle:`Smazat záznam?`,deleteText:`Záznam se natrvalo odstraní z tohoto zařízení.`,deletedToast:`Záznam byl smazán`,notFound:`Tento záznam už neexistuje.`},treatment:{title:`Léčba`,lead:`Tvé léky, jejich užívání a jestli ti podle tebe pomohly.`,preventive:`Preventivní`,acute:`Akutní`,add:`Přidat lék`,empty:`Zatím nemáš přidané žádné léky.`,noneOfType:`Žádné léky v této skupině.`,lastTaken:`Naposledy {when}`,neverTaken:`Zatím bez záznamu užití`,disclaimer:`Aplikace nepředepisuje léky ani nenavrhuje změnu dávkování. O léčbě se rozhoduj se svým lékařem.`,type:`Typ`,dose:`Dávka`,frequency:`Frekvence`,note:`Poznámka`,logIntake:`Zaznamenat užití`,history:`Historie užití`,historyEmpty:`Zatím tu není žádné užití.`,taken:`Užito`,effectSummary:`Účinek podle tebe`,edit:`Upravit lék`,delete:`Odebrat lék`,deleteTitle:`Odebrat lék?`,deleteText:`Odebere se lék i celá historie jeho užití.`,deletedToast:`Lék byl odebrán`,notFound:`Tento lék už neexistuje.`,inEpisode:`během epizody`,effectMissing:`účinek nezadán`,showAll:`Zobrazit celou historii ({n})`,hint:`Klikni na lék a zapíšeš jeho užití i to, jestli ti podle tebe pomohl.`},intake:{title:`Užití léku`,editTitle:`Upravit užití`,date:`Datum`,time:`Čas`,dose:`Dávka`,effect:`Pomohlo to?`,effectHint:`Pokud ještě nevíš, doplň to později.`,note:`Poznámka`,save:`Uložit užití`,saved:`Užití bylo uloženo`,delete:`Smazat užití`,deleteTitle:`Smazat užití?`,deleteText:`Záznam o užití se natrvalo odstraní.`,deletedToast:`Užití bylo smazáno`,notFound:`Tento záznam už neexistuje.`},calendar:{title:`Kalendář`,prev:`Předchozí měsíc`,next:`Následující měsíc`,backToday:`Dnes`,legend:`Vysvětlivky`,legendPeriod:`Menstruace`,dayEmpty:`V tento den nemáš žádné záznamy.`,addSymptom:`Přidat příznak`,periodMark:`Zaznamenat menstruaci v tento den`,summaryEntries:`počet záznamů {n}`,summaryPeriod:`menstruace`,summaryNone:`bez záznamů`,selected:`vybraný den`,today:`dnes`,legendEpisode:`Den s epizodou`,legendSymptoms:`Zaznamenané příznaky`,summaryEpisode:`epizoda`},insights:{title:`Přehledy`,periodLabel:`Období`,empty:`Přehled se skládá z tvých záznamů. Až budeš mít zapsané příznaky z více dní, uvidíš tu, co se opakuje.`,overview:`Souhrn`,symptomDays:`Dny s příznaky`,episodes:`Epizody`,avgIntensity:`Průměrná intenzita`,avgDuration:`Průměrné trvání epizody`,noValue:`nezadáno`,topSymptoms:`Nejčastější příznaky`,topSymptomsLead:`Počet záznamů, ve kterých se příznak objevil.`,topTriggers:`Nejčastější možné spouštěče`,triggersEmpty:`Zatím tu nejsou žádné možné spouštěče. Přibudou s podrobnostmi epizody.`,meds:`Léky`,medsEmpty:`V tomto období není zaznamenané žádné užití léku.`,interpretation:`Zaznamenaná souvislost není důkazem příčiny. Přehled počítá jen se zadanými údaji.`,report:`Vytvořit report pro lékaře`},report:{title:`Report pro lékaře`,lead:`Vyber období. Report shrne tvé záznamy do přehledu, který můžeš ukázat lékaři.`,custom:`Vlastní období`,from:`Od`,to:`Do`,create:`Vytvořit report`,invalidRange:`Datum „Od“ musí být dříve nebo ve stejný den jako „Do“.`,docTitle:`Zaznamenané příznaky a léčba`,period:`Období`,created:`Vytvořeno`,disclaimer:`Údaje zaznamenal uživatel v aplikaci Vestie. Aplikace není zdravotnický prostředek. Nejde o diagnózu, lékařský záznam ani doporučení léčby.`,fewData:`V tomto období je zaznamenáno málo údajů, přehled nemusí být reprezentativní.`,summary:`Souhrn`,symptoms:`Nejčastější příznaky`,triggers:`Zaznamenané možné spouštěče`,meds:`Léky a účinek podle uživatele`,sleep:`Spánek`,sleepNone:`V tomto období nebyl zaznamenán spánek.`,cycle:`Menstruační cyklus`,cycleDays:`Zaznamenané dny menstruace`,notes:`Poznámky`,timeline:`Časová osa`,colDate:`Datum a čas`,colEntry:`Záznam`,colDetail:`Podrobnosti`,none:`Bez záznamů.`,print:`Uložit jako PDF`,printHint:`V okně tisku zvol „Uložit jako PDF“.`,sleepQuality:`Kvalita spánku`,plusHint:`S Vestie+ přibude v reportu tlak při epizodách, možné souvislosti a aktivita.`,weather:`Počasí a tlak při epizodách`,weatherSummary:`Epizody ve dnech s poklesem tlaku o 6 hPa a více: {drops} z {total}.`,patterns:`Možné souvislosti podle záznamů`,patternsOther:`jinak {a} z {b}`,patternsNote:`Počet těžších dní po dni s daným faktorem. Jde o možné souvislosti ze záznamů uživatele za poslední rok, ne o důkaz příčiny.`,activity:`Aktivita`,avgSteps:`Průměrný počet kroků za den`,workoutDays:`Dny s tréninkem`,workoutDaysValue:`{a} z {b}`,workoutTypes:`Nejčastější tréninky`},sleep:{title:`Spánek`,formTitle:`Jak se ti spalo?`,lead:`Zaznamenej délku spánku. Kvalitu a poznámku můžeš vynechat.`,date:`Den probuzení`,duration:`Délka spánku`,hours:`Hodiny`,minutes:`Minuty`,durationRequired:`Zadej délku spánku.`,quality:`Kvalita spánku`,qualities:{good:`Dobrá`,fair:`Průměrná`,poor:`Špatná`},note:`Poznámka`,save:`Uložit spánek`,saved:`Spánek byl uložen`,add:`Zaznamenat spánek`,entry:`Spánek {duration}`,delete:`Smazat záznam spánku`,deleteTitle:`Smazat záznam spánku?`,deleteText:`Záznam se natrvalo odstraní z tohoto zařízení.`,deletedToast:`Záznam spánku byl smazán`,avg:`Průměrný spánek`,nights:`Zaznamenané noci`},consent:{title:`Tvé záznamy zůstávají v tvém telefonu`,lead:`Než začneš, podívej se, jak s tvými údaji zacházíme.`,updatedLead:`Zásady ochrany soukromí se změnily. Přečti si je a potvrď souhlas znovu, pak můžeš appku používat dál.`,factDevice:`Appka ukládá záznamy o zdraví jen do tohoto telefonu.`,factNoServer:`Appka nemá účet na internetu, záznamy o zdraví nikam neodesílá a nemá reklamy ani vlastní analytiku.`,factPin:`Přihlašovat se budeš PIN kódem. Dokud je PIN zapnutý, údaje jsou v telefonu zašifrované.`,factControl:`Údaje můžeš kdykoli exportovat do souboru nebo natrvalo smazat.`,health:`Souhlasím, aby IronPhysique s. r. o. jako správce appky Vestie zpracovávala v tomto telefonu údaje o mém zdraví, které do appky zapíšu nebo si nechám načíst (příznaky, epizody, léky, spánek, případně menstruační cyklus), pro účely mého osobního sledování. Souhlas mohu kdykoli odvolat v Profilu, údaje se tím smažou.`,age:`Je mi alespoň 16 let.`,policyLink:`Přečíst zásady ochrany soukromí`,termsNote:`Používáním appky přijímáš {terms}.`,termsLink:`podmínky používání`,submit:`Souhlasím a pokračuji`,decline:`Nesouhlasím`,declineTitle:`Bez souhlasu appka nemůže pokračovat`,declineText:`Tvé záznamy zůstávají v telefonu. Můžeš si je exportovat do souboru nebo je natrvalo smazat. Dokud nesouhlasíš, appka je jen uchovává a dál s nimi nepracuje.`,factNotMedical:`Vestie je osobní deník, ne zdravotnický prostředek. Nediagnostikuje, neléčí a nenahrazuje lékaře. Při náhlých, silných nebo neobvyklých potížích vyhledej lékařskou pomoc nebo volej 155 či 112.`},privacyPolicy:JSON.parse(`{"title":"Zásady ochrany soukromí","version":"Verze {version}","controllerTitle":"Kdo je správce","controllerText":"Správcem je IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, IČO 47321547. Kontakt pro dotazy k osobním údajům: support@vestibularnamigrena.sk, tel. +421 902 811 486.","dataTitle":"Jaké údaje appka zpracovává","dataText":"To, co do ní zadáš: co chceš sledovat (například vestibulární migrénu), příznaky a jejich intenzitu, epizody a jejich možné spouštěče, léky a to, jak hodnotíš jejich účinek, spánek, poznámky, volitelně menstruační cyklus a jméno k pozdravu. S Vestie+ i počasí a tlak vzduchu podle přibližné polohy a údaje ze zdravotních aplikací, pokud si to zapneš. Appka si v telefonu ukládá i nastavení, záznam o tvém souhlasu (čas a verzi zásad), stav předplatného s číslem objednávky a při zapnutém počasí poslední zaokrouhlenou polohu. Jde o údaje o zdraví, proto je chráníme zvlášť.","storageTitle":"Kde jsou tvé údaje","storageText":"Záznamy z appky jsou jen v tomto telefonu. Appka nemá server ani účet na internetu, záznamy o zdraví nikam neodesílá a nemá reklamy ani vlastní analytiku. Správce k záznamům v appce nemá přístup. Mimo telefon se dostanou jen tehdy, když to uděláš ty (export, záloha, report), nebo při záloze a přenosu celého telefonu, jak popisuje část Zálohování. Google Play může podle nastavení tvého telefonu sbírat souhrnné údaje o pádech appky. Z nich nedokážeme zjistit, o koho jde.","purposeTitle":"K čemu slouží","purposeText":"K tvému osobnímu sledování potíží a k přehledu nebo reportu, který můžeš ukázat lékaři. Report se vytvoří v telefonu a ty rozhodneš, komu ho dáš. Appka v telefonu ukazuje možné souvislosti v tvých záznamech, ale nedělá o tobě žádná automatizovaná rozhodnutí s právními ani podobně závažnými účinky.","legalTitle":"Na jakém základě","legalText":"Záznamy v appce včetně údajů o zdraví zpracováváme na základě tvého výslovného souhlasu (čl. 6 odst. 1 písm. a) a čl. 9 odst. 2 písm. a) GDPR). Platí to i pro spánek, kroky a tréninky, které si necháš načíst z Apple Zdraví nebo Health Connect. Souhlas můžeš kdykoli odvolat v Profilu, údaje se tím smažou. Odvolání nemá vliv na zákonnost zpracování před ním. Polohu pro počasí appka posílá na základě tvého souhlasu, který dáš zapnutím funkce a odvoláš jejím vypnutím (čl. 6 odst. 1 písm. a) GDPR). Údaje o předplatném Vestie+ (číslo objednávky, plán, data) zpracováváme, abychom splnili smlouvu s tebou (čl. 6 odst. 1 písm. b) GDPR), a účetní doklady proto, že nám to ukládá zákon (čl. 6 odst. 1 písm. c) GDPR). Na e-maily odpovídáme na základě oprávněného zájmu vyřídit tvůj dotaz (čl. 6 odst. 1 písm. f) GDPR). Oznámení o odstoupení od smlouvy a reklamace vyřizujeme, protože nám to ukládá zákon (čl. 6 odst. 1 písm. c) GDPR), a po vyřízení je uchováváme na základě oprávněného zájmu bránit se v případném sporu (čl. 6 odst. 1 písm. f) GDPR). Pokud nám v e-mailu sám/sama napíšeš něco o svém zdraví a k vyřízení to potřebujeme, zeptáme se tě na výslovný souhlas (čl. 9 odst. 2 písm. a) GDPR). Při reklamaci nebo odstoupení od smlouvy je zpracováváme i k prokazování, uplatňování nebo obhajobě právních nároků (čl. 9 odst. 2 písm. f) GDPR).","rightsTitle":"Tvá práva","rightsText":"Máš právo na přístup k údajům, jejich opravu a výmaz, omezení zpracování, přenositelnost, právo vznést námitku a právo kdykoli odvolat souhlas. Záznamy jsou jen v tvém telefonu a my k nim nemáme přístup, proto většinu práv uplatníš přímo v appce: údaje si prohlédneš, upravíš, exportuješ do souboru nebo natrvalo smažeš (Profil → Soukromí). S ostatním, například s e-maily, které jsi nám poslal/a, ti pomůžeme na support@vestibularnamigrena.sk. Máš také právo podat stížnost u Úřadu pro ochranu osobních údajů Slovenské republiky (dataprotection.gov.sk) nebo u dozorového úřadu v zemi EU, kde žiješ.","securityTitle":"Zabezpečení","securityText":"Při prvním spuštění si nastavíš 6místný PIN. Dokud je PIN zapnutý, záznamy jsou v telefonu uložené zašifrované (AES-256) a appka je bez PINu neotevře. Pokud PIN v Profilu vypneš, záznamy zašifrované nejsou. V Androidu je šifrování navíc navázané na klíč uložený v zabezpečené části telefonu (Android Keystore), který se z telefonu nedá zkopírovat. Kopie údajů se proto mimo tvůj telefon nedá otevřít ani zkoušením PINů. Žádné zabezpečení není stoprocentní, proto si zvol PIN, který se nedá snadno uhodnout, a telefon měj chráněný i zámkem obrazovky. Čitelný export z Profilu zašifrovaný není, zašifrovaná je jen záloha chráněná heslem. Pokud PIN zapomeneš, údaje nelze obnovit.","backupTitle":"Zálohování","backupText":"Údaje jsou jen v telefonu a appka nemá server. V Androidu se nezálohují na Disk Google. Na iPhonu jsou součástí zálohy celého telefonu v iCloudu nebo v počítači, pokud ji máš zapnutou. V Profilu si můžeš vytvořit zálohu chráněnou heslem a uložit ji, kam chceš. Heslo k záloze neznáme, proto ho nedokážeme ani obnovit. Při nastavování nového telefonu může Android přenést údaje appky přímo ze starého telefonu (kabelem nebo přes Wi-Fi). Pokud máš zapnutý PIN, údaje jsou v záloze telefonu i při přenosu zašifrované. V Androidu se však přenesené údaje s PINem v novém telefonu neotevřou, protože šifrování je navázané na starý telefon. Před výměnou telefonu si proto vytvoř zálohu chráněnou heslem, nebo před přenosem PIN vypni a v novém telefonu ho znovu zapni. Bez zálohy nebo přenosu se při ztrátě či výměně telefonu údaje ztratí.","ageTitle":"Věk","ageText":"Appka je určená pro lidi od 16 let.","changesTitle":"Změny zásad","changesText":"O změnách těchto zásad tě upozorníme přímo v appce. Při podstatné změně tě požádáme o nový souhlas. Starší znění ti na požádání pošleme.","weatherTitle":"Počasí a tlak (Vestie+)","weatherText":"Pokud si tuto funkci zapneš, appka při aktualizaci počasí (při otevření appky, nejvýše jednou za 3 hodiny, nebo když o ni požádáš) pošle poskytovateli počasí polohu zaokrouhlenou na přibližně 10 km, aby získala skutečné počasí a tlak vzduchu. Poskytovatelem je OpenWeather Ltd., 30 St Mary Axe, Londýn, Spojené království. Pro Spojené království má EU rozhodnutí o odpovídající ochraně osobních údajů. Poskytovatel přitom technicky vidí i tvou IP adresu, jako při každém požadavku na internet. Podle svých zásad ochrany soukromí (openweather.co.uk/privacy-policy) IP adresu ani polohu z těchto požadavků neukládá. Žádné tvé záznamy se neodesílají. Poslední zaokrouhlenou polohu si appka pamatuje v telefonu, dokud funkci nevypneš nebo dokud neskončí Vestie+. Funkci můžeš kdykoli vypnout.","healthTitle":"Propojení se zdravotními aplikacemi (Vestie+)","healthText":"Pokud propojíš Apple Zdraví nebo Health Connect, appka z nich jen čte vybrané údaje do tohoto telefonu: spánek (čas usnutí, probuzení a délku), kroky po dnech a tréninky (jen druh, čas a trvání). Při propojení načte i posledních 90 dní. Nic do nich nezapisuje a nikam je neodesílá. Tyto údaje nepoužíváme k reklamě, neprodáváme je a nikomu je neposkytujeme. Propojení můžeš kdykoli zrušit. To, co se už načetlo, zůstane v tvých záznamech, dokud to nesmažeš, a oprávnění odebereš v nastavení telefonu.","purchasesTitle":"Předplatné","purchasesText":"Platbu za Vestie+ vyřizuje Google Play nebo Apple jako samostatný správce podle svých podmínek a zásad a může přitom údaje zpracovávat i mimo EU. Tvé platební údaje nevidíme. Appka se od obchodu dozví, jestli je předplatné aktivní, kdy začalo, a číslo objednávky (GPA.), a uloží si to v telefonu. My vidíme v účtu vývojáře v Google Play údaje o objednávce, které nám zpřístupní obchod (zejména číslo objednávky, datum, částku a zemi), ne záznamy z appky. Používáme je k vrácení peněz a k účetnictví. Účetní doklady uchováváme 10 let, jak ukládá zákon o účetnictví, a vidí je náš účetní. Knihovna Google Play, přes kterou appka předplatné kupuje a ověřuje, přitom pošle Googlu i technické údaje o tom, jestli nákup a spojení fungují (diagnostika). Appka ji zapne jen při nabídce Vestie+, nákupu, obnovení nákupu a ověření předplatného. Není v nich nic o tvém zdraví.","linksTitle":"Odkazy na web a komunitu","linksText":"Appka obsahuje odkazy na web vestibularnamigrena.sk a na komunitu na Facebooku, Instagramu a Discordu. Nic jim neodesílá. Když odkaz otevřeš, opustíš appku a platí pravidla a zásady dané služby.","retentionTitle":"Jak dlouho","retentionText":"Záznamy jsou v telefonu, dokud je nesmažeš, neodvoláš souhlas nebo neodinstaluješ appku. Zálohu a exporty máš u sebe ty a sám/sama rozhoduješ, kdy je smažeš. Číslo objednávky si appka pamatuje, dokud je předplatné aktivní. Lhůty pro e-maily jsou v části Když nám napíšeš a pro účetní doklady v části Předplatné.","contactTitle":"Když nám napíšeš","contactText":"Pokud napíšeš na support@vestibularnamigrena.sk, zpracováváme tvou e-mailovou adresu a obsah zprávy jen proto, abychom ti odpověděli. Běžnou zprávu smažeme nejpozději 1 rok po vyřízení. Oznámení o odstoupení a reklamaci (jméno, číslo objednávky, e-mail) uchováváme 3 roky, dokud se z nich dají uplatnit nároky. Formulář pro odstoupení na našem webu (vestibularnamigrena.sk/vestie/odstupenie) pošle jméno, e-mail a číslo objednávky e-mailem nám a potvrzení tobě. Do databáze nic neukládá. K ochraně před zneužitím si server nejvýše hodinu pamatuje otisk IP adresy, ze kterého se adresa nedá zjistit. E-maily jsou uložené u poskytovatele naší e-mailové schránky a webu na Slovensku, který je pro nás zpracovává jako zpracovatel. Při vrácení peněz použijeme číslo objednávky v Google Play. Do zprávy prosím nepiš víc údajů o zdraví, než je nutné. Pokud je napíšeš, použijeme je jen k odpovědi tobě.","requiredTitle":"Musíš údaje poskytnout?","requiredText":"Ne, zákon ani smlouva ti to neukládají. Bez souhlasu se zpracováním údajů o zdraví však appka nemůže fungovat, protože deník bez nich nevznikne. Všechno ostatní je dobrovolné: jméno, menstruační cyklus, počasí podle polohy i propojení se zdravotními aplikacemi můžeš vynechat a appka funguje dál. Při odstoupení od smlouvy nebo reklamaci potřebujeme tvé jméno a e-mail, a pokud ho znáš, i číslo objednávky, jinak je nedokážeme vyřídit."}`),terms:JSON.parse(`{"title":"Podmínky používání","version":"Verze {version}","providerTitle":"Kdo appku poskytuje","providerText":"Appku Vestie a předplatné Vestie+ poskytuje IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, IČO 47321547, DIČ 2023812813, IČ DPH SK2023812813 (registrace podle § 7a slovenského zákona o DPH, nejsme plátcem DPH), zapsaná v obchodním rejstříku Městského soudu Bratislava III, oddíl Sro, vložka č. 90506/B. Kontakt: support@vestibularnamigrena.sk, tel. +421 902 811 486.\\nTyto podmínky upravují používání appky a předplatného Vestie+. Jak zacházíme s tvými údaji, popisují samostatné Zásady ochrany soukromí.","appTitle":"Co appka je","appText":"Vestie je osobní deník. Zapisuješ si do něj příznaky, epizody, léky, spánek a další údaje a appka z nich ukazuje přehledy, možné souvislosti a report, který můžeš ukázat lékaři. Základní verze je zdarma. Appka je určená pro lidi od 16 let. Vestie+ si může předplatit zletilý člověk nebo nezletilý se souhlasem zákonného zástupce.","healthTitle":"Appka není zdravotnický prostředek","healthText":"Appka nediagnostikuje, neléčí, nedoporučuje léky ani jejich dávkování a nenahrazuje lékaře. Možné souvislosti vycházejí jen z tvých záznamů, ne z lékařského posouzení, a mohou být náhodné. Upozornění na počasí vycházejí jen z předpovědi počasí a ze změn, které máš v appce zvolené. Neříkají nic o tvém zdraví. O léčbě se vždy raď s lékařem. Při náhlých, silných nebo neobvyklých potížích vyhledej lékařskou pomoc nebo volej 155 či 112.","useTitle":"Jak můžeš appku používat","useText":"Appku můžeš používat pro svou osobní potřebu. Appka, její texty a ilustrace i značky Vestie a Vestibulárna migréna jsou chráněné. Patří jejich vlastníkům a my je používáme s jejich souhlasem. Nesmíš je kopírovat, upravovat ani dál šířit bez povolení, kromě případů, které dovoluje zákon. Nesmíš obcházet předplatné ani zasahovat do fungování appky.","plusTitle":"Co obsahuje Vestie+","plusText":"Vestie+ přidává k bezplatné verzi počasí a tlak vzduchu podle přibližné polohy, upozornění na počasí, hledač souvislostí, pokročilé statistiky, propojení se zdravotními aplikacemi (spánek, kroky a tréninky) a rozšířený report pro lékaře. Aktuální rozsah je popsaný v nabídce Vestie+ v appce. Funkce, které potřebují internet nebo jiné aplikace, fungují jen tehdy, když jsou dostupné (viz Služby jiných poskytovatelů).\\nVestie+ funguje v telefonech s Androidem 8.0 nebo novějším. Počasí a tlak vzduchu potřebují připojení k internetu a povolení přibližné polohy, propojení se zdravím aplikaci Health Connect. Appka nemá technickou ochranu proti kopírování.","paymentTitle":"Cena, platba a obnovování","paymentText":"Vestie+ si předplácíš na měsíc nebo na rok. Cenu včetně DPH vidíš v appce a v obchodě ještě před nákupem. Platbu vyřizuje Google Play (na iPhonu App Store) podle svých podmínek, tvé platební údaje nevidíme.\\nSmlouva se uzavírá na zvolené období a na jeho konci se předplatné samo obnoví o další stejné období a znovu zaplatí, dokud ho nezrušíš. Cenu můžeme změnit. O zvýšení se dozvíš předem a nová cena se tě týká až tehdy, když ji v Google Play (na iPhonu v App Store) odsouhlasíš. Pokud ji neodsouhlasíš, předplatné na konci aktuálního období skončí a nic dalšího nezaplatíš. Pokud se platba nepodaří, obchod může předplatné po opakovaných pokusech ukončit.\\nPokud nabídka obsahuje zkušební dobu zdarma, první platba proběhne až po jejím skončení. Pokud předplatné během zkušební doby zrušíš, nezaplatíš nic. Zkušební dobu nabízí obchod jen jednou na jeden účet, společně pro oba plány. Promo kód může dát zkušební dobu jiné délky, a to i tomu, kdo ji už měl. Platí délka, kterou ti Google Play ukáže před potvrzením, a po jejím skončení se předplatné obnovuje a platí stejně.","contractTitle":"Uzavření smlouvy a jazyk","contractText":"Smlouvu o Vestie+ uzavřeš v nákupním okně Google Play, když potvrdíš předplatné. U promo kódu uplatněného v Obchodě Play ji uzavřeš potvrzením tam a potvrzení od appky dostaneš po návratu do ní. Před potvrzením můžeš plán změnit nebo nákup zrušit. Potvrzení objednávky ti pošle Google Play e-mailem. Hned po nákupu ti appka ukáže potvrzení s hlavními podmínkami a lhůtou pro odstoupení, které si můžeš uložit do souboru. Najdeš ho i později přes Vestie+ → Potvrzení předplatného. Tyto podmínky jsou vždy v appce i na webu vestibularnamigrena.sk/vestie/podmienky.\\nSmlouvu uzavíráš ve slovenštině, češtině nebo angličtině podle jazyka appky a rozhodující je znění v tomto jazyce.","cancelTitle":"Zrušení předplatného","cancelText":"Předplatné zrušíš kdykoli v nastavení předplatných v obchodě. Z appky se tam dostaneš přes Vestie+ → Spravovat v Google Play. Odinstalováním appky ani smazáním údajů se předplatné nezruší.\\nPo zrušení ti Vestie+ zůstane do konce zaplaceného období nebo zkušební doby a další platba už neproběhne. Pak se appka vrátí do bezplatné verze a všechny tvé záznamy zůstanou v telefonu.","withdrawalTitle":"Odstoupení od smlouvy a vrácení peněz","withdrawalText":"Jako spotřebitel můžeš od smlouvy o Vestie+ odstoupit bez udání důvodu do 14 dní od jejího uzavření, tedy od začátku předplatného. Pokud předplatné začíná zkušební dobou, lhůta zahrnuje i ji: při 7denní zkušební době ti po první platbě zbývá ještě nejméně 7 dní. Při delší zkušební době z promo kódu může lhůta uplynout ještě během ní, předplatné však můžeš do konce zkušební doby kdykoli bezplatně zrušit. Odstoupit můžeš formulářem na vestibularnamigrena.sk/vestie/odstupenie, který otevřeš i z appky přes Vestie+ → Odstoupit od smlouvy zde. Vyplníš jméno a e-mail (číslo objednávky z potvrzení od Google Play, které začíná GPA., jen pokud ho znáš) a potvrdíš tlačítkem „Potvrdiť odstúpenie od zmluvy“. Oznámení se odešle hned a na tvůj e-mail přijde potvrzení s jeho textem, datem a časem. Formulář funguje bez přihlášení, i když appku už nemáš. Odstoupit můžeš i zprávou na support@vestibularnamigrena.sk nebo vzorovým formulářem níže; i tehdy ti doručení bez zbytečného odkladu potvrdíme e-mailem. Lhůta je dodržena, pokud oznámení odešleš nejpozději v její poslední den. Pokud odstoupíš během zkušební doby, předplatné zrušíme a nic nezaplatíš. Pokud už proběhla platba, vrátíme ti celou částku přes Google Play stejným způsobem platby, nejpozději do 14 dní od doručení tvého oznámení. Vestie+ můžeš používat hned a přesto dostaneš zpět celou částku, za dny používání nic nestrháváme. Vestie+ se po odstoupení vypne.\\nPo uplynutí 14 dní se za započaté období peníze nevracejí. Automatické obnovení předplatného není nová smlouva, proto při něm nová lhůta nevzniká. Výjimkou jsou jen případy podle částí Změny appky a podmínek a Reklamace a spory. Nezávisle na tom může Google Play podle svých pravidel vrátit peníze i sám, například při žádosti krátce po platbě.","formTitle":"Vzorový formulář pro odstoupení od smlouvy","formText":"Vyplň a pošli tento formulář jen tehdy, pokud chceš od smlouvy odstoupit.\\nKomu: IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, support@vestibularnamigrena.sk\\nTímto oznamuji, že odstupuji od smlouvy o poskytnutí této služby: předplatné Vestie+\\nDatum objednání:\\nČíslo objednávky (GPA.):\\nJméno a příjmení:\\nAdresa:\\nPodpis (jen pokud se formulář podává v listinné podobě):\\nDatum:","dataTitle":"Tvé záznamy","dataText":"Tvé záznamy jsou jen v tvém telefonu. Nemáme k nim přístup, proto je nedokážeme obnovit, přenést ani vrátit. O zálohu se staráš ty (Profil → Záloha údajů). Pokud zapomeneš PIN nebo heslo k záloze, údaje obnovit nelze.","servicesTitle":"Služby jiných poskytovatelů","servicesText":"Počasí a tlak poskytuje OpenWeather, spánek, kroky a tréninky čte appka z Health Connect nebo Apple Zdraví a platby vyřizuje Google Play nebo App Store. Jejich dostupnost ani přesnost neovlivníme a předpověď počasí se může mýlit. Když služba není dostupná, appka ukáže poslední skutečné údaje s časem, odkdy jsou, nebo řekne, že údaje nemá. Odkazy na web a komunitu (Facebook, Instagram, Discord) vedou mimo appku, kde platí pravidla dané služby.","liabilityTitle":"Odpovědnost","liabilityText":"Appku připravujeme pečlivě, ale nemůžeme zaručit, že bude vždy bez chyb a bez přerušení. Pokud Vestie+ nefunguje, jak má, máš práva podle části Reklamace a spory. Za škodu odpovídáme podle zákona, ne však za ztrátu údajů, kterou jsme nezpůsobili, například při ztrátě telefonu bez zálohy. Appka nenahrazuje lékaře, proto rozhodnutí o léčbě vždy konzultuj s ním. Tím nejsou dotčena tvá zákonná práva spotřebitele ani odpovědnost za škodu způsobenou úmyslně nebo na zdraví.","changesTitle":"Změny appky a podmínek","changesText":"Appku můžeme měnit a vylepšovat, pokud je k tomu důvod, například bezpečnost, změna zákona, změna služby jiného poskytovatele nebo lepší fungování appky. Za změnu nic nedoplácíš. Pokud by změna tvůj přístup k Vestie+ nebo jeho používání více než nepatrně zhoršila nebo pokud bychom Vestie+ ukončili, upozorníme tě v appce předem. Do 30 dní od upozornění nebo od změny, podle toho, co nastane později, můžeš smlouvu bezplatně ukončit a vrátíme ti peníze za nevyužitou část zaplaceného období. O změnách těchto podmínek tě upozorníme v appce. Pokud s nimi nesouhlasíš, můžeš předplatné zrušit a do konce zaplaceného období pro tebe platí původní podmínky.","complaintsTitle":"Reklamace a spory","complaintsText":"Pokud Vestie+ nefunguje, jak má, napiš na support@vestibularnamigrena.sk, co se děje. Přijetí reklamace ti potvrdíme e-mailem, chybu odstraníme bez zbytečného odkladu a reklamaci vyřídíme nejpozději do 30 dní. Výsledek ti pošleme e-mailem, a pokud reklamaci zamítneme, napíšeme i důvod. Pokud chybu v přiměřené době neodstraníme nebo je tak závažná, že nelze čekat, máš nárok na přiměřenou slevu nebo můžeš smlouvu ukončit. Při ukončení ti vrátíme peníze za období, kdy Vestie+ nefungovalo, i za nevyužitou část zaplaceného období, nejpozději do 14 dní od doručení tvého oznámení. Práva z vad máš po celou dobu, kdy ti Vestie+ poskytujeme.\\nAktualizace potřebné k tomu, aby Vestie+ fungovalo v souladu se smlouvou, zpřístupníme v obchodě. Pokud si je navzdory upozornění nenainstaluješ, neodpovídáme za chybu, kterou by aktualizace odstranila.\\nPokud nejsi spokojený/spokojená s vyřízením nebo si myslíš, že jsme porušili tvá práva, můžeš nás na support@vestibularnamigrena.sk požádat o nápravu. Pokud tvou žádost zamítneme nebo na ni do 30 dní neodpovíme, můžeš podat návrh na alternativní řešení sporu Slovenské obchodní inspekci (soi.sk) nebo jinému subjektu ze seznamu Ministerstva hospodářství SR (mhsr.sk). Dozor nad ochranou spotřebitele vykonává Slovenská obchodní inspekce.","lawTitle":"Rozhodné právo","lawText":"Tyto podmínky se řídí právem Slovenské republiky. Pokud žiješ v jiné zemi Evropské unie, zůstává ti i ochrana, kterou ti dávají závazné předpisy tvé země."}`),dataDeletion:{title:`Smazání údajů`,version:`Verze {version}`,appTitle:`Čeho se to týká`,appText:`Vestie je deník pro vestibulární migrénu a závratě. Vydává ho IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava. Appka nemá účet ani přihlášení. Tvé záznamy jsou jen v tvém telefonu a my k nim nemáme přístup, proto je smažeš přímo v appce.`,inAppTitle:`Smazání záznamů v appce`,inAppText:`1. Otevři Vestie a ťukni na ikonu profilu vpravo nahoře.
2. V části Soukromí ťukni na Smazat všechna data a potvrď.
Natrvalo se smažou všechny záznamy, nastavení i PIN v tomto telefonu. Stejně to udělá Odvolat souhlas ve stejné části nebo odinstalování appky. Zálohy a exporty, které sis uložil/a mimo appku, smaž tam, kde jsou uložené.`,emailTitle:`Smazání údajů, které máme my`,emailText:`Pokud jsi nám psal/a, napiš na support@vestibularnamigrena.sk, že chceš smazat své údaje. Smažeme tvé e-maily a ostatní údaje o tobě, které nemusíme uchovávat, a do jednoho měsíce ti to potvrdíme. Přibližnou polohu pro počasí posílá appka přímo poskytovateli počasí OpenWeather, my ji nedostáváme. Technické údaje o nákupu (diagnostiku) zpracovává Google.`,keptTitle:`Co uchováváme i po žádosti`,keptText:`Oznámení o odstoupení od smlouvy a reklamaci (jméno, číslo objednávky, e-mail) uchováváme 3 roky, dokud se z nich dají uplatnit nároky. Účetní doklady k předplatnému Vestie+ uchováváme 10 let, jak ukládá zákon o účetnictví. Pak je smažeme. Předplatné zrušíš a historii nákupů spravuješ v Google Play.`,moreTitle:`Více informací`,moreText:`Podrobnosti jsou v zásadách ochrany soukromí: https://www.vestibularnamigrena.sk/vestie/zasady/`},profileSetup:{title:`Vytvoř si profil`,lead:`Profil existuje jen v tomto telefonu – bez e-mailu a hesla na internetu. Přihlašovat se budeš PIN kódem.`,pinTitle:`Přihlašovací PIN`,pinText:`V dalším kroku si nastavíš 6místný PIN. Budeš se jím přihlašovat a zároveň zašifruje tvé údaje v telefonu.`,nameLabel:`Jak ti máme říkat?`,namePlaceholder:`Tvé jméno`,nameHint:`Nepovinné. Uvidíš ho v pozdravu na domovské obrazovce.`,pinAlready:`PIN už máš nastavený. Změnit ho můžeš v Profil → Zabezpečení.`},pin:{progress:`Zadáno {n} z {total} číslic`,keypad:`Klávesnice pro PIN`,delete:`Smazat číslici`,prompt:{current:`Zadej svůj současný PIN`,new:`Zvol si 6místný PIN`,confirm:`Zopakuj PIN pro kontrolu`},title:{set:`Nastav si přihlašovací PIN`,change:`Změna PINu`,disable:`Vypnutí PINu`},setLead:`Budeš se jím přihlašovat a zároveň zašifruje tvé údaje v telefonu. Pokud ho zapomeneš, údaje nelze obnovit – my k nim nemáme přístup.`,checking:`Ověřuji…`,wrong:`Nesprávný PIN. Zkus to znovu.`,blocked:`Příliš mnoho nesprávných pokusů. Zkus to znovu za {time}.`,weak:`Tento PIN se dá snadno uhodnout. Zvol jiný.`,mismatch:`PINy se neshodují. Zvol si PIN znovu.`,saving:`Šifruji údaje…`,enabled:`PIN je nastavený, údaje jsou zašifrované`,changed:`PIN byl změněn`,disabled:`PIN je vypnutý`,blockedSeconds:`Příliš mnoho nesprávných pokusů. Zkus to znovu za {n} s.`,deviceError:`PIN se teď nepodařilo ověřit. Zkus to znovu.`},lock:{title:`Přihlas se`,lead:`Zadej svůj PIN`,forgot:`Zapomenutý PIN?`,forgotTitle:`Zapomenutý PIN`,forgotText:`PIN nelze obnovit – tvé údaje jsou zašifrované jen v tomto telefonu a my k nim nemáme klíč. Můžeš je jen smazat a začít znovu.`,forgotConfirm:`Smazat vše a začít znovu`,moved:{title:`Údaje jsou z jiného telefonu`,text:`Když je zapnutý PIN, údaje se dají otevřít jen v telefonu, ve kterém vznikly. Po přenosu do nového telefonu se proto neotevřou ani se správným PINem.`,backup:`Pokud máš zálohu, začni znovu a po úvodu ji obnov v Profil → Záloha údajů. Pokud ještě máš starý telefon, vytvoř zálohu v něm. Údaje v něm zůstaly tak, jak byly.`,action:`Začít znovu`,confirmTitle:`Začít znovu?`,confirmText:`Údaje přenesené z jiného telefonu se z tohoto telefonu smažou. Záznamy pak obnovíš ze zálohy.`,confirm:`Smazat a začít znovu`}},security:{title:`Zabezpečení`,pin:`Přihlašování PINem`,pinOnHint:`Údaje jsou v telefonu zašifrované a appka je bez PINu neotevře.`,pinOffHint:`Bez PINu se do appky dostane kdokoli s tvým telefonem a údaje nejsou zašifrované.`,changePin:`Změnit PIN`,autoLock:`Automaticky odhlásit`,autoLockOptions:{m0:`Hned po odchodu z appky`,m1:`Po 1 minutě`,m5:`Po 5 minutách`,m15:`Po 15 minutách`},biometrics:`Odemykání obličejem nebo otiskem prstu`,biometricsHint:`Dostupné v mobilní aplikaci.`},privacy:{deviceOnly:`Záznamy jsou jen v tomto telefonu`,deviceOnlyHint:`Appka záznamy o zdraví nikam neodesílá a my k záznamům v appce nemáme přístup.`,export:`Exportovat moje údaje`,exportHint:`Čitelný soubor JSON se všemi záznamy, například pro přenos jinam. Není zašifrovaný.`,exportDone:`Soubor s údaji je připravený`,consent:`Souhlas se zpracováním údajů`,consentGiven:`Udělen {date}`,withdraw:`Odvolat souhlas`,withdrawTitle:`Odvolat souhlas?`,withdrawText:`Bez souhlasu appka nemůže uchovávat tvé údaje o zdraví. Odvoláním se natrvalo smažou všechny údaje v tomto telefonu. Zálohy a exporty, které máš uložené jinde, a oprávnění v nastavení telefonu zůstávají.`,withdrawConfirm:`Odvolat a smazat údaje`,backupFirst:`Nejdřív udělat zálohu`,plusNotCancelled:`Předplatné Vestie+ se tím nezruší. Pokud ho už nechceš, zruš ho v {store}, jinak se bude dál obnovovat.`,exportFailed:`Soubor se nepodařilo vytvořit. Zkus to znovu.`,importTitle:`Obnovit údaje ze souboru?`,importText:`Všechny záznamy v tomto telefonu se nahradí záznamy ze souboru. Předplatné a PIN se nezmění.`,importConfirm:`Obnovit`,importDone:`Údaje jsou obnovené`},backup:{title:`Záloha údajů`,profileHint:`Soubor chráněný heslem. Z něj obnovíš záznamy, například v novém telefonu.`,lead:`Appka nemá server, tvé záznamy jsou jen v tomto telefonu. Zálohu si ulož mimo něj, například na Disk Google nebo do počítače. Když telefon vyměníš nebo ztratíš, obnovíš z ní všechny záznamy. Pokud máš zapnutý PIN, přímý přenos do nového telefonu s Androidem nestačí, záznamy v něm otevřeš jen ze zálohy.`,lastAt:`Poslední záloha: {date}`,never:`Zatím sis zálohu nevytvořil/a.`,createTitle:`Vytvořit zálohu`,password:`Heslo k záloze`,passwordHint:`Alespoň {n} znaků. Nepoužívej svůj PIN.`,passwordRepeat:`Zopakuj heslo`,passwordWarning:`Heslo si zapamatuj nebo zapiš na bezpečné místo. Bez něj se záloha nedá otevřít ani obnovit a nikdo ti ho nedokáže zjistit.`,create:`Vytvořit zálohu`,creating:`Vytvářím zálohu…`,created:`Záloha je hotová. Ulož si ji mimo telefon.`,failed:`Zálohu se nepodařilo vytvořit. Zkus to znovu.`,fileName:`zaloha`,restoreTitle:`Obnovit ze zálohy`,restore:`Vybrat soubor se zálohou`,restoreHint:`Například v novém telefonu. Záznamy v tomto telefonu se nahradí záznamy ze zálohy.`,restoreLead:`Záloha je zašifrovaná. Zadej heslo, které sis k ní zvolil/a.`,restoreLeadDate:`Záloha z {date} je zašifrovaná. Zadej heslo, které sis k ní zvolil/a.`,restoreSubmit:`Obnovit`,reminderTitle:`Připomínka`,reminder:`Připomínat zálohu`,reminderHint:`Jednou za měsíc se na obrazovce Dnes ukáže krátká připomínka.`,privacy:`Záloha nikam neodchází sama. Kam ji uložíš, rozhoduješ ty. Je zašifrovaná heslem, které znáš jen ty.`,errors:{tooShort:`Heslo musí mít alespoň {n} znaků.`,mismatch:`Hesla se neshodují.`,passwordRequired:`Zadej heslo k záloze.`,wrongPassword:`Nesprávné heslo nebo poškozený soubor.`,invalidFile:`Tento soubor se nedá načíst. Vyber zálohu nebo export z appky.`,newerVersion:`Tato záloha je z novější verze appky. Aktualizuj appku a obnov ji znovu.`},card:{title:`Zálohuj si své záznamy`,textNever:`Záznamy jsou jen v tomto telefonu. Pokud ho ztratíš nebo vyměníš, bez zálohy o ně přijdeš.`,textOld:`Poslední záloha je z {date}. Vytvoř si novou, ať máš v bezpečí i novější záznamy.`,action:`Vytvořit zálohu`,later:`Teď ne`}},plural:{entries:{one:`{n} záznam`,few:`{n} záznamy`,other:`{n} záznamů`},times:{other:`{n}×`},days:{one:`{n} den`,few:`{n} dny`,other:`{n} dní`},weeks:{one:`{n} týden`,few:`{n} týdny`,other:`{n} týdnů`},months:{one:`{n} měsíc`,few:`{n} měsíce`,other:`{n} měsíců`},years:{one:`{n} rok`,few:`{n} roky`,other:`{n} let`},episodes:{one:`{n} epizoda`,few:`{n} epizody`,other:`{n} epizod`},hardDays:{one:`{n} těžší den`,few:`{n} těžší dny`,other:`{n} těžších dní`}},community:{title:`Komunita a podpora`,lead:`Nemusíš na to být sám/sama. V naší komunitě sdílíme vlastní zkušenosti, podržíme se a doporučujeme si specialisty.`,facebook:`Facebooková skupina`,facebookHint:`Zkušenosti, otázky a vzájemná podpora`,instagram:`Instagram`,instagramHint:`@vestibularnamigrena`,discord:`Discord`,discordHint:`Rozhovory s komunitou v reálném čase`,webTitle:`Články na našem webu`,webText:`O diagnóze, léčbě a životě s vestibulární migrénou.`,webUrl:`www.vestibularnamigrena.sk`,external:`(otevře se mimo aplikaci)`,note:`Zkušenosti a doporučení z komunity nenahrazují vyšetření a radu lékaře.`,soon:`Brzy`},episodeTypes:{vestibular:`Vestibulární epizoda`,migraine_headache:`Migréna s bolestí hlavy`,migraine_no_headache:`Migréna bez bolesti hlavy`,other:`Jiné`,unsure:`Nevím`},relief:{rest:`Odpočinek`,sleep:`Spánek`,dark_room:`Odpočinek v tmavé místnosti`,hydration:`Pití vody`,relaxation:`Relaxace nebo meditace`,cold_compress:`Studený obklad`,warm_compress:`Teplý obklad`,shower:`Sprcha`,food:`Jídlo`,other:`Jiné`},impact:{work_study:`Práce nebo studium`,sleep:`Spánek`,daily_activities:`Běžné denní činnosti`,social:`Kontakt s rodinou a přáteli`,movement:`Pohyb a fyzické aktivity`,rest:`Odpočinek a relaxace`,other:`Jiné`,none:`Epizoda mě výrazně neomezila`},episodeFlow:{typeTitle:`Jaká to byla epizoda?`,typeLead:`Všechno v podrobnostech je nepovinné. Co nevíš, přeskoč a doplň později.`,intensity:`Celková intenzita`,symptomsTitle:`Jaké příznaky se objevily?`,symptomsLead:`Vyber jeden nebo více. Sílu každého zadáš v dalším kroku.`,date:`Datum`,time:`Čas`,triggersTitle:`Co ji mohlo spustit?`,triggersLead:`Vyber všechno, co se tě týká. Jde o možné souvislosti, ne potvrzené příčiny. Můžeš vybrat více možností.`,triggerOther:`Jiný spouštěč`,triggerOtherPlaceholder:`Napiš, co to bylo`,medsTitle:`Užil/a jsi během epizody lék?`,medsLead:`Označ léky a kdy jsi je užil/a. Užití se uloží i do Léčby.`,medsLogged:`Už zaznamenané během epizody`,medsNone:`Zatím nemáš přidané žádné léky.`,addMed:`Přidat lék`,medsWhen:`Kdy jsi je užil/a`,medsOutside:`Čas musí být během epizody.`,helped:`Pomohlo to?`,reliefTitle:`Co ti přineslo úlevu?`,summaryTitle:`Shrnutí epizody`,summaryLead:`Zkontroluj, co jsi vyplnil/a. Každou část můžeš upravit.`,summaryMissing:`Ještě můžeš doplnit`,save:`Uložit epizodu`,saved:`Epizoda byla uložena`,edit:`Upravit`,sections:{type:`Typ`,intensity:`Intenzita`,time:`Čas`,symptoms:`Příznaky`,triggers:`Možné spouštěče`,meds:`Léky`,helped:`Pomohlo to?`,relief:`Úleva`,impact:`Omezení`},reliefLead:`Můžeš vybrat více možností.`,reliefOther:`Co ti ještě pomohlo?`,reliefOtherPlaceholder:`Napiš, co to bylo`,impactTitle:`Jak tě epizoda omezila?`,impactLead:`Ve kterých oblastech každodenního života jsi pocítil/a její vliv?`,impactOther:`Co ještě epizoda ovlivnila?`,impactOtherPlaceholder:`Napiš, co to bylo`},symptomInfo:{open:`Co znamená {name}?`,close:`Rozumím`,dizziness:`Pocit omámení, nejistoty nebo ztráty rovnováhy. Můžeš mít pocit, že se ti zatočila hlava, cítíš se na omdlení nebo si nejsi jistý/jistá při stání či chůzi.`,vertigo:`Falešný pocit pohybu, i když se ve skutečnosti nehýbeš. Můžeš mít pocit, že se točíš ty, že se otáčí místnost nebo že se okolní prostředí pohybuje.`,brain_fog:`Stav, kdy máš problém soustředit se, jasně přemýšlet nebo zpracovávat informace. Můžeš mít pocit, že ti to myslí pomaleji, hůř hledáš slova nebo se hůř orientuješ v myšlenkách.`,visual_sensitivity:`Zvýšená citlivost na zrakové podněty. Pohybující se obrazy, rušné prostředí, vzory, davy lidí nebo obrazovky mohou vyvolávat závrať, nevolnost nebo dezorientaci.`,tinnitus:`Vnímání zvuku v jednom nebo obou uších, i když v okolí není žádný skutečný zdroj zvuku. Může jít o pískání, hučení, bzučení nebo šumění.`,rocking:`Pocit, jako by se tvé tělo nebo okolí jemně houpalo, kolébalo ze strany na stranu nebo pohybovalo dopředu a dozadu, podobně jako na lodi.`,floating:`Pocit, jako by ses vznášel/a a neměl/a pevný kontakt se zemí.`,unsteadiness:`Pocit nejistoty při stání nebo chůzi, jako bys ztrácel/a rovnováhu, vychyloval/a se do stran nebo potřeboval/a oporu při pohybu.`},quickIntake:{title:`Který lék jsi užil/a?`,lead:`Vyber lék. V dalším kroku zadáš čas a jestli ti pomohl.`,add:`Přidat nový lék`,empty:`Zatím nemáš přidané žádné léky. Přidej lék a pak zaznamenáš jeho užití.`},plus:JSON.parse(`{"name":"Vestie+","lockedLabel":"Součást Vestie+","tryChip":"Vyzkoušet","demoChip":"Ukázka","features":{"weather":{"title":"Počasí a tlak","text":"Počasí a atmosférický tlak se automaticky zaznamenávají podle tvé polohy."},"forecast":{"title":"Upozornění na počasí","text":"Předem tě upozorní na předpovídané výraznější změny atmosférického tlaku, teploty nebo vlhkosti."},"finder":{"title":"Hledač souvislostí","text":"Porovná dny s potížemi a bez nich a ukáže možné souvislosti."},"stats":{"title":"Pokročilé statistiky","text":"Sleduj dlouhodobý vývoj, časy výskytu epizod a přehled užívání léků po měsících."},"health":{"title":"Propojení se zdravotními aplikacemi","text":"Automatické zaznamenávání spánku, kroků a tréninků přes Health Connect včetně údajů z podporovaných hodinek.","textIos":"Automatické zaznamenávání spánku, kroků a tréninků přes Apple Zdraví včetně údajů z podporovaných hodinek."},"report":{"title":"Rozšířený report pro lékaře","text":"Rozšířený report s údaji o počasí, atmosférickém tlaku, fyzické aktivitě a možných souvislostech."}},"periods":{"d90":"90 dní","d180":"6 měsíců","d365":"12 měsíců"},"plans":{"yearly":{"name":"Ročně","per":"ročně","hint":"V přepočtu {monthly} měsíčně, {trial} zdarma","hintNoTrial":"V přepočtu {monthly} měsíčně","badge":"Ušetříš {percent} %","cta":"Vyzkoušet {trial} zdarma","ctaNoTrial":"Předplatit za {price} ročně","terms":"{trial} zdarma, pak {price} ročně. Předplatné se obnovuje automaticky. Pokud ho v {store} zrušíš před koncem zkušební doby, nic nezaplatíš.","termsNoTrial":"{price} ročně. Předplatné se obnovuje automaticky, dokud ho v {store} nezrušíš."},"monthly":{"name":"Měsíčně","per":"měsíčně","hint":"{trial} zdarma, zrušíš kdykoli","hintNoTrial":"Zrušíš kdykoli","cta":"Vyzkoušet {trial} zdarma","ctaNoTrial":"Předplatit za {price} měsíčně","terms":"{trial} zdarma, pak {price} měsíčně. Předplatné se obnovuje automaticky. Pokud ho v {store} zrušíš před koncem zkušební doby, nic nezaplatíš.","termsNoTrial":"{price} měsíčně. Předplatné se obnovuje automaticky, dokud ho v {store} nezrušíš."}},"paywall":{"title":"Více údajů k tvým záznamům","lead":"Vestie+ přidává zápis počasí a tlaku vzduchu, upozornění na změny počasí a porovnání, které ukáže možné souvislosti v tvých záznamech. Základní deník zůstává zdarma.","choosePlan":"Vyber si předplatné","renewal":"Ceny jsou včetně DPH. Platbu vyřídí {store}. Předplatné můžeš kdykoli zrušit v nastavení {store}. Zrušení platí ke konci zaplaceného období nebo zkušební doby a Vestie+ ti do té doby zůstane.","withdrawal":"Od smlouvy můžeš odstoupit bez udání důvodu do 14 dní od začátku předplatného, i když začíná zkušební dobou, a vrátíme ti celou částku. Odstoupit můžeš z appky (Vestie+ → Odstoupit od smlouvy zde) formulářem na našem webu. Podrobnosti jsou v podmínkách používání.","acceptTerms":"Pokračováním přijímáš {terms}.","acceptTermsLink":"podmínky používání","loadingPrices":"Načítám ceny…","pricesFailed":"Ceny se nepodařilo načíst. Zkontroluj připojení k internetu a zkus to znovu.","retryPrices":"Zkusit znovu","restored":"Předplatné už máš, Vestie+ je znovu zapnuté.","freeTitle":"Základní deník zůstává zdarma","freeText":"Záznamy příznaků a epizod, kalendář, přehledy, léky, spánek i report pro lékaře. Když předplatné skončí, tvé záznamy zůstanou tvé.","demoNote":"V tomto náhledu se nic neplatí.","restore":"Obnovit nákup","redeem":"Mám promo kód","disclaimer":"Vestie+ není zdravotnický prostředek. Neposkytuje diagnózu ani léčbu a nenahrazuje konzultaci s lékařem.","notNow":"Teď ne","nativeOnly":"Nákup bude dostupný v mobilní appce.","nothingToRestore":"Nenašli jsme žádný nákup k obnovení.","purchaseFailed":"Nákup se nepodařil. Zkus to znovu později.","purchasePending":"Platba se ještě zpracovává. Vestie+ se zapne, až ji obchod potvrdí.","provider":"Poskytovatel: IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, IČO 47321547, support@vestibularnamigrena.sk."},"redeem":{"title":"Promo kód","single":"Kód na jedno použití zadáš v {store}: ťukni na tlačítko níže, zadej kód a potvrď. Když se vrátíš do appky, Vestie+ se zapne samo.","promo":"Kód akce, například z komunity, zadáš při nákupu: vyber plán, pokračuj k nákupu a v okně {store} ťukni na způsob platby a pak na Uplatnit kód.","trial":"I s kódem jde o zkušební dobu zdarma, po které se předplatné obnovuje a platí. Její délku ti {store} ukáže před potvrzením.","open":"Otevřít {store}","preview":"V náhledu se kód neuplatňuje. V appce se otevře {store}."},"manage":{"title":"Tvoje Vestie+","lead":"Všechno na jednom místě. Každou funkci můžeš kdykoli zapnout nebo vypnout.","welcomeTitle":"Vítej ve Vestie+","welcomeLead":"Počasí a tlak si zapni jako první. Ostatní funkce najdeš v seznamu.","features":"Funkce","subscription":"Předplatné","trialUntil":"Zkušební doba do {date}","since":"Aktivní od {date}","cancel":"Zrušit předplatné","cancelHint":"Tvé záznamy zůstanou v telefonu.","cancelTitle":"Zrušit Vestie+?","cancelText":"Funkce Vestie+ se uzamknou. Všechny záznamy včetně zapsaného počasí a tlaku ti zůstanou.","cancelConfirm":"Zrušit předplatné","cancelled":"Vestie+ je zrušené","toToday":"Pokračovat na Domů","enableWeather":"Zapnout počasí a tlak","manageStore":"Spravovat v Google Play","manageStoreHint":"Tady předplatné změníš nebo zrušíš. Tvé záznamy zůstanou v telefonu."},"withdraw":{"row":"Odstoupit od smlouvy zde","rowHint":"Bez udání důvodu do {date}. Vrátíme ti celou částku.","rowHintTrial":"Bez udání důvodu do {date}. Během zkušební doby nic nezaplatíš.","title":"Odstoupení od smlouvy","lead":"Od smlouvy o předplatném Vestie+ můžeš odstoupit bez udání důvodu do {date}. Odstoupení odešleš formulářem na našem webu, který se otevře v prohlížeči.","leadLate":"Lhůta 14 dní pro odstoupení bez udání důvodu už uplynula. Pokud si myslíš, že máš na odstoupení nárok z jiného důvodu, můžeš použít formulář nebo nám napsat.","note":"Appka přitom nic neodesílá ani neukládá. Odstoupit můžeš i e-mailem na {address} nebo vzorovým formulářem z podmínek používání. Formulář je i na vestibularnamigrena.sk/vestie/odstupenie, kdybys appku už neměl/a.","demoNote":"V tomto náhledu se formulář neotevírá a nic se neodesílá.","stepForm":"Ve formuláři vyplň jméno a e-mail. Číslo objednávky doplníme za tebe, pokud ho appka zná.","stepConfirm":"Potvrď tlačítkem „Potvrdiť odstúpenie od zmluvy“. Oznámení se odešle hned a potvrzení s datem a časem ti přijde e-mailem.","stepAfter":"Vrátíme ti celou částku přes Google Play do 14 dní a Vestie+ se vypne. Tvé záznamy zůstanou v telefonu.","stepAfterTrial":"Jsi ve zkušební době, proto předplatné zrušíme a nic nezaplatíš. Vestie+ se pak vypne a tvé záznamy zůstanou v telefonu.","openForm":"Pokračovat na formulář","openFailed":"Formulář se nepodařilo otevřít. Napiš nám na {address}."},"confirmation":{"row":"Potvrzení předplatného","rowHint":"Hlavní podmínky a lhůta pro odstoupení","title":"Potvrzení předplatného","lead":"Hlavní podmínky tvé smlouvy o Vestie+. Appka si potvrzení uložila ve znění ze dne, kdy vzniklo, a už ho nemění. Ulož si ho i do souboru, ať ho máš i po odinstalování appky.","plan":"Předplatné","price":"Cena","priceUnknown":"Podle potvrzení od {store}","started":"Začátek","trialEnd":"Zkušební doba do","order":"Číslo objednávky","withdrawUntil":"Odstoupit lze do","providerTitle":"Poskytovatel","providerText":"IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, IČO 47321547, DIČ 2023812813, IČ DPH SK2023812813 (registrace podle § 7a slovenského zákona o DPH, nejsme plátcem DPH), zapsaná v obchodním rejstříku Městského soudu Bratislava III, oddíl Sro, vložka č. 90506/B. Kontakt: {email}, tel. +421 902 811 486.","renewalTitle":"Obnovování a zrušení","renewalText":"Ceny jsou včetně DPH. Předplatné se na konci každého období samo obnoví a znovu zaplatí, dokud ho nezrušíš. Pokud začíná zkušební dobou, první platba proběhne až po jejím skončení, a pokud ho zrušíš dřív, nezaplatíš nic. Zrušíš ho kdykoli v nastavení předplatných v {store} (Vestie+ → {manage}). Vestie+ ti pak zůstane do konce zaplaceného období nebo zkušební doby.","withdrawalTitle":"Odstoupení od smlouvy","withdrawalText":"Od smlouvy můžeš odstoupit bez udání důvodu do {date}, tedy do 14 dní od začátku předplatného včetně zkušební doby. Odstoupit můžeš formulářem na vestibularnamigrena.sk/vestie/odstupenie (z appky přes Vestie+ → {row}), e-mailem na {email} nebo vzorovým formulářem níže. Pokud odstoupíš během zkušební doby, předplatné zrušíme a nic nezaplatíš. Pokud už proběhla platba, vrátíme ti celou částku přes {store} nejpozději do 14 dní od doručení oznámení. Za dny, kdy jsi Vestie+ používal/a, nic nestrháváme.","termsText":"Smlouva se řídí podmínkami používání ve verzi {version}. Jejich celé znění ze dne, kdy potvrzení vzniklo, je součástí uloženého potvrzení.","termsOpen":"Otevřít podmínky používání","save":"Uložit potvrzení","saved":"Potvrzení je uložené","saveFailed":"Potvrzení se nepodařilo uložit. Zkus to znovu.","fileName":"plus-potvrzeni","created":"Vytvořeno {time}","demoNote":"V tomto náhledu je předplatné jen ukázkové a nic se neplatí.","snapshotNote":"Znění uložené {time}"},"charts":{"legend":"Vysvětlivky grafu","showTable":"Zobrazit jako tabulku"},"weather":{"hpa":"{value} hPa","temps":"{min} až {max} °C","changeShort":"{value} oproti předchozímu dni","conditions":{"clear":"Jasno","partly":"Polojasno","cloudy":"Oblačno","fog":"Mlha","rain":"Déšť","snow":"Sníh","storm":"Bouřka"},"offLead":"Aplikace bude každý den zapisovat počasí a atmosférický tlak, abys je měl/a u svých záznamů a mohl/a je s nimi porovnat.","factRecord":"Od zapnutí se zapisuje tlak, teplota, vlhkost a počasí každého dne. Zapsané dny zůstávají v telefonu. Dny před zapnutím se nedoplňují.","factLocation":"Při každé aktualizaci se společnosti OpenWeather Ltd. (Spojené království) odešle jen poloha zaokrouhlená na přibližně 10 km. Technicky přitom vidí i tvou IP adresu.","factHealth":"Žádné tvé záznamy se nikdy neodesílají.","factOff":"Kdykoli to můžeš vypnout.","enable":"Povolit polohu a zapnout","today":"Dnes","condition":"Počasí","temperature":"Teplota","humidity":"Vlhkost","humidityValue":"Vlhkost {value} %","forecastWord":"předpověď","estimateWord":"odhad","episodeWord":"epizoda","chartTitle":"Tlak v čase","rangeDays":"{n} dní","chartLabel":"Graf barometrického tlaku za posledních {n} dní a předpověď na nejbližší dny. Tečky označují dny s epizodou.","legendPressure":"Tlak","legendForecast":"Předpověď","legendEpisode":"Den s epizodou","colDay":"Den","colPressure":"Tlak","colChange":"Změna","colEpisode":"Epizoda","forecastTitle":"Předpověď na nejbližší dny","linkTitle":"Tlak a tvé záznamy","linkText":"V Hledači souvislostí si můžeš porovnat tlak se svými záznamy.","openFinder":"Otevřít hledač souvislostí","myLocation":"Podle tvé polohy","noData":"Pro dnešek zatím nejsou údaje o počasí.","settings":"Nastavení","updateLocation":"Aktualizovat teď","turnOff":"Vypnout počasí a tlak","turnOffHint":"Zapsané dny zůstanou.","turnOffTitle":"Vypnout počasí a tlak?","turnOffText":"Appka přestane zjišťovat počasí a zapomene tvou polohu. Dny, které se už zapsaly, zůstanou.","attribution":"Údaje o počasí poskytuje OpenWeather","disclaimer":"Údaje jsou z meteorologických modelů pro tvou přibližnou polohu a předpověď se může lišit od skutečnosti. Dny, kdy jsi appku neotevřel/a, jsou odhad z poslední předpovědi. Souvislost s počasím není důkazem příčiny.","loading":"Zjišťuji počasí…","enabled":"Počasí a tlak jsou zapnuté","errors":{"denied":"Bez povolení polohy to nepůjde. Povol ji v nastavení telefonu nebo prohlížeče.","unavailable":"Polohu se nepodařilo zjistit. Zkus to znovu.","network":"Počasí se nepodařilo načíst. Zkontroluj připojení k internetu.","setup":"Počasí v této verzi zatím není nastavené. Zkus to později."},"episodeDay":"Počasí a aktivita v ten den","updated":"Aktualizováno {time}. Údaje se obnovují samy.","stale":"Bez připojení. Poslední údaje jsou z {time}.","bands":{"low":"Nízký tlak","normal":"Běžný tlak","high":"Vyšší tlak","veryHigh":"Velmi vysoký tlak"},"bandRanges":{"low":"méně než 1000 hPa","normal":"1000 až 1020 hPa","high":"1021 až 1029 hPa","veryHigh":"1030 hPa a více"},"bandTitle":"Co znamenají hodnoty tlaku","bandNow":"teď","bandNote":"Hodnoty jsou orientační. Tlak je přepočítaný na hladinu moře stejně jako v předpovědích počasí, proto se dá porovnat i ve vyšší nadmořské výšce. Kromě samotné hodnoty appka ukazuje i změnu oproti předchozímu dni a hledač souvislostí porovnává dny, kdy se tlak změnil o 6 hPa a více."},"health":{"connected":"Propojeno","notConnected":"Nepropojeno","stepsValue":"{value} kroků","lead":"Spánek, kroky a tréninky se mohou načítat přímo z telefonu přes Health Connect. Zapisují tam i hodinky jako Garmin, Samsung či Fitbit.","leadIos":"Spánek, kroky a tréninky se mohou načítat přímo z telefonu přes Apple Zdraví. Zapisují tam i hodinky jako Apple Watch či Garmin.","providers":{"apple_health":"Apple Zdraví","health_connect":"Health Connect"},"typesTitle":"Co načítat","types":{"sleep":"Spánek","steps":"Kroky","workouts":"Tréninky"},"privacy":"Údaje se jen načtou do tohoto telefonu a nikam se neodesílají. Ručně zapsaný spánek se nepřepíše.","lastSync":"Naposledy načteno {time}","stepsToday":"Kroky dnes","sleepToday":"Spánek dnes v noci","stepsWeek":"Kroky za posledních 7 dní","sleepWeek":"Spánek za posledních 7 nocí (hodiny)","noValue":"bez záznamu","disconnect":"Odpojit","disconnectTitle":"Odpojit zdravotní aplikaci?","disconnectText":"Appka přestane načítat nové údaje. To, co se už načetlo, zůstane v tvých záznamech.","revokeHint":{"health_connect":"Oprávnění ke čtení údajů zrušíš v nastavení Health Connect.","apple_health":"Oprávnění ke čtení údajů zrušíš v aplikaci Zdraví v části Sdílení."},"disconnectedToast":"Odpojeno","openSettings":"Nastavení","connectedToast":"Propojeno","connectTo":{"apple_health":"Propojit s Apple Zdraví","health_connect":"Propojit s Health Connect"},"browserOnly":"Webový prohlížeč k těmto údajům nemá přístup. Propojení funguje jen v mobilní appce, kde se údaje po povolení načítají samy. V tomto náhledu proto nic neukazujeme, aby tu nebyla vymyšlená čísla.","errors":{"denied":"Bez povolení se údaje načíst nedají. Povol je v nastavení telefonu.","unavailable":"Zdravotní aplikace není v tomto telefonu dostupná. Na Androidu si nainstaluj Health Connect."},"typesHint":"U tréninků se načte jen druh a trvání, například kolo, hokej nebo posilování. Chůze se počítá v krocích.","workouts":{"cycling":"Kolo","running":"Běh","walking":"Chůze","hiking":"Turistika","swimming":"Plavání","strength":"Posilování","hockey":"Hokej","soccer":"Fotbal","basketball":"Basketbal","volleyball":"Volejbal","teamSport":"Kolektivní sport","tennis":"Tenis","racket":"Raketový sport","yoga":"Jóga a strečink","dance":"Tanec","skiing":"Lyžování","skating":"Bruslení","climbing":"Lezení","rowing":"Veslování","cardio":"Kardio","combat":"Bojové sporty","other":"Jiná aktivita"},"workoutsWeek":"Tréninky za posledních 7 dní","workoutsNone":"Za posledních 7 dní tu není žádný trénink."},"finder":{"ofDays":"{a} z {b}","percent":"{n} %","factors":{"pressure_drop":"Den s poklesem tlaku o 6 hPa a více","pressure_rise":"Den s nárůstem tlaku o 6 hPa a více","humid":"Den s vysokou vlhkostí (85 % a více)","temp_swing":"Den se změnou teploty o 8 °C a více","short_sleep":"Noc kratší než 6 hodin","poor_sleep":"Noc se špatnou kvalitou spánku","high_steps":"Den s 12 000 kroky a více","low_steps":"Den s méně než 3 000 kroky","period":"Období kolem menstruace","workout":"Den s tréninkem 30 min a více"},"strength":{"strong":"Výraznější rozdíl","possible":"Možná souvislost","none":"Bez výrazného rozdílu","few":"Málo údajů"},"fewFactor":"Zatím to nastalo {n}×, k porovnání je to málo.","after":"Těžší den v ten den nebo druhý den","otherDays":"V ostatních dnech","lead":"Aplikace porovnává, jak často je těžší den ve stejný nebo následující den poté, co se daný faktor objevil, a jak často jindy. Za těžší den se považuje den s epizodou nebo příznakem s intenzitou alespoň {intensity}.","summary":"V tomto období je to {hard} z celkem {days}.","notEnough":"Zatím máš zaznamenáno {days} a {hard}. K porovnání je potřeba alespoň 30 dní a 5 těžších dní.","moreTitle":"Co ještě porovnat","more":{"weather":"Zapni je a porovnáme i tlak, vlhkost a teplotu.","health":"Propoj ho a porovnáme i kroky."},"loggedTitle":"Co sis sám/sama označil/a u epizod","loggedLead":"Tyto možné spouštěče zapisuješ jen u epizod, proto se nedají porovnat se dny bez potíží. Ukazujeme jen, kolikrát sis je označil/a.","howTitle":"Jak to počítáme","howText":"Těžší den hledáme ve stejný den a druhý den (u kroků jen druhý den). Den bez záznamu se počítá jako den bez potíží, chybějící spánek nebo tlak se nedoplňuje. Rozdíl označíme, až když je dost velký a dní k porovnání je dost. I tak může být náhodný, zejména u označení „Možná souvislost“.","disclaimer":"Možná souvislost není důkazem příčiny. Výsledek se může změnit s dalšími záznamy. Pokud chceš něco změnit v léčbě, poraď se s lékařem.","toForecast":"Zapnout upozornění na počasí","toForecastNote":"Upozornění hlásí jen předpověď počasí. Neříkají nic o tom, jak se budeš cítit.","moreRecords":"Čím víc dní zapíšeš, tím víc dní se dá porovnat. Výsledky ber jako orientační, zejména dokud máš záznamů málo."},"forecast":{"today":"Dnes","tomorrow":"Zítra","signals":{"pressure_drop":"Hlásí pokles tlaku o {amount} hPa.","pressure_rise":"Hlásí nárůst tlaku o {amount} hPa.","humid":"Hlásí vysokou vlhkost ({amount} %).","temp_swing":"Hlásí změnu teploty o {amount} °C."},"levels":{"change":"Hlásí výraznou změnu","calm":"Bez výrazných změn"},"cardTitle":"Změna počasí · {day}","factWeather":"Sleduj předpověď atmosférického tlaku, vlhkosti a teploty na nejbližší dny.","factRecords":"Vyber si, na které změny tě má aplikace upozornit. Výchozí je pokles tlaku a výběr můžeš kdykoli změnit.","factNotify":"Upozornění dostaneš večer před dnem, na který se předpovídá vybraná změna.","factOff":"Upozornění můžeš kdykoli vypnout, pokud ti nevyhovují.","offLead":"Aplikace tě předem upozorní na výrazné změny počasí očekávané na následující den. Vybereš si, na které změny chceš být upozorněn/a.","disclaimer":"Upozornění hlásí jen předpověď počasí z meteorologických modelů pro tvou přibližnou polohu a skutečnost se může lišit. Neříkají nic o tom, jak se budeš cítit, a nejsou zdravotní radou. Léky ani léčbu podle nich neměň.","enable":"Zapnout upozornění na počasí","calmText":"Žádná ze sledovaných změn se nehlásí.","lead":"Výrazné změny počasí na dnes a nejbližší tři dny.","weatherOff":"Zapni počasí a tlak","weatherOffHint":"Upozornění potřebují předpověď počasí.","notifyTitle":"Upozornění","notify":"Upozornit mě předem","notifyHint":"Večer před dnem s vybranou změnou. Vychází z předpovědi při posledním otevření appky.","notifyTime":"Kdy mě upozornit","previewLabel":"Takhle bude vypadat upozornění v telefonu:","disable":"Vypnout upozornění na počasí","staleForecast":"Předpověď je starší než den, proto na ni teď neupozorňujeme. Zkontroluj připojení k internetu.","nothingToNotify":"Podle aktuální předpovědi teď není na co upozornit.","alertsTitle":"Na co mě upozornit","alerts":{"pressure_drop":"Pokles tlaku","pressure_rise":"Nárůst tlaku","humid":"Vysoká vlhkost","temp_swing":"Prudká změna teploty"},"alertsNone":"Vyber alespoň jednu změnu, jinak appka nebude na nic upozorňovat."},"stats":{"empty":"Statistiky se skládají z tvých záznamů. Až budeš mít zapsané příznaky nebo epizody, uvidíš je tady.","noCompare":"bez porovnání","same":"stejně jako předtím","less":"o {value} méně","more":"o {value} více","compareTitle":"Oproti předchozímu období","compareLead":"Posledních {days} oproti stejně dlouhému období předtím.","symptomDaysValue":"dny s příznaky: {n}","trendTitle":"Dny s příznaky po měsících","trendLabel":"Sloupcový graf počtu dní s příznaky za posledních 12 měsíců.","colMonth":"Měsíc","rhythmTitle":"Kdy epizody začínají","rhythmLead":"Celkem {n} podle dne v týdnu a části dne.","parts":{"morning":"Ráno","afternoon":"Odpol.","evening":"Večer","night":"Noc"},"cycleStart":"První den menstruace","cycleOffset":"Den {n} od začátku","cycleTitle":"Epizody kolem menstruace","cycleLead":"Z {n} zapsaných menstruací. Další menstruaci appka nepředpovídá.","colCycleDay":"Den","reliefTitle":"Co sis nejčastěji zapsal/a jako úlevu","impactTitle":"Co epizody nejčastěji omezily","medTitle":"Užívání léků po měsících","medLead":"Kolikrát sis lék zapsal/a v jednotlivých měsících zvoleného období.","medSince":"Užíváš od {date}","medDisclaimer":"Je to jen přehled tvých záznamů, ne hodnocení léku. O léčbě se rozhoduj se svým lékařem.","medTotal":"Celkem {count}, naposledy {date}","colCount":"Počet"},"demoSymptoms":"V této ukázce jsou příznaky a epizody vymyšlené, počasí je skutečné. Jestli se ukáže možná souvislost s tlakem, bude vidět až z tvých vlastních záznamů."}`),failure:{title:`Tuto obrazovku se nepodařilo zobrazit`,text:`Tvé záznamy zůstaly uložené. Zkus to znovu. Pokud to nepomůže, vytvoř si zálohu nebo obnov údaje ze zálohy.`,retry:`Zkusit znovu`,backup:`Záloha a obnovení`,home:`Na Domů`},notifications:{channelReminders:`Denní připomínka`,channelForecast:`Změny počasí`,reminderBody:`Jak se dnes máš? Zapiš si, jak se cítíš.`,denied:`Telefon upozornění nepovolil. Zapneš je v nastavení telefonu.`},about:{title:`O aplikaci`,row:`O aplikaci a licence`,appVersion:`Verze {version}`,publisherTitle:`Kdo appku vydává`,publisherText:`Vestie vydává IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, IČO 47321547, DIČ 2023812813, IČ DPH SK2023812813 (registrace podle § 7a slovenského zákona o DPH, nejsme plátcem DPH), zapsaná v obchodním rejstříku Městského soudu Bratislava III, oddíl Sro, vložka č. 90506/B.
Podpora a dotazy k osobním údajům: support@vestibularnamigrena.sk, tel. +421 902 811 486.`,medicalTitle:`Appka není zdravotnický prostředek`,medicalText:`Vestie je osobní deník. Nediagnostikuje, neléčí, nevyléčí ani nepředchází žádnému onemocnění, nedoporučuje léky ani jejich dávkování a nenahrazuje lékaře. Při náhlých, silných nebo neobvyklých potížích vyhledej lékařskou pomoc nebo volej 155 či 112.`,weatherTitle:`Údaje o počasí`,weatherText:`Počasí a tlak vzduchu ve Vestie+ poskytuje OpenWeather (openweathermap.org).`,licensesTitle:`Licence open source`,licensesText:`Vestie používá tyto knihovny a písma. Děkujeme jejich autorům.
DM Sans a DM Serif Display – © The DM Sans Project Authors, © Google Inc., licence SIL Open Font License 1.1 (openfontlicense.org)
Lucide – © Lucide Contributors, licence ISC (lucide.dev/license)
Capacitor a jeho doplňky – © Ionic Team, licence MIT (github.com/ionic-team/capacitor)
Capacitor Health a Native Purchases – © Capgo, Martin Donadieu, licence MPL 2.0, zdrojový kód na github.com/Cap-go
GSAP – © GreenSock, standardní bezplatná licence (gsap.com/standard-license)
fontsource – © Fontsource Authors, licence MIT
Plné znění licencí je na uvedených adresách.`}},en:{app:{name:`Vestie`,logo:`Vestie – Vestibular Migraine`},common:{continue:`Continue`,skip:`Skip`,back:`Back`,save:`Save`,cancel:`Cancel`,close:`Close`,yes:`Yes`,undo:`Undo`,optional:`optional`,on:`On`,off:`Off`,stepOf:`Step {step} of {total}`},language:{title:`Choose your language`,sk:`Slovenčina`,cs:`Čeština`,en:`English`},welcome:{title:`Your symptom diary`,text:`Log symptoms, episodes, medication and sleep. The app arranges them into a calendar and insights and prepares a report you can show your doctor.`,cta:`Get started`},goals:{title:`What do you want to use the app for?`,lead:`Choose what matters to you. You can pick several options or continue without choosing.`,options:{symptoms:`Log symptoms`,triggers:`Log possible triggers`,patterns:`Understand my difficulties`,doctor:`Prepare an overview for my doctor`}},condition:{title:`What would you like to track?`,lead:`This only tailors the content – it is not a diagnosis. You can change it at any time in Profile.`,options:{vestibular_migraine:`Vestibular migraine`,migraine:`Migraine`,other_vestibular:`Other vestibular condition`,unsure:`I'm not sure`}},cycle:{title:`Would you like to track your menstrual cycle?`,lead:`This feature is optional. You can turn it on or off later in settings.`,yes:`Yes`,no:`No`},medications:{title:`Would you like to add your medications?`,lead:`You can add medications you take preventively or for acute symptoms. You can skip this and add them later.`,add:`Add medications`,addAnother:`Add another medication`,added:`Added medications`,remove:`Remove medication {name}`,disclaimer:`The app does not recommend doses or change your treatment.`,types:{preventive:`Preventive`,acute:`Acute`}},medForm:{title:`New medication`,name:`Medication name`,namePlaceholder:`Name on the box`,nameRequired:`Please enter the medication name.`,type:`Type`,dose:`Dose`,dosePlaceholder:`e.g. 1 tablet`,frequency:`Frequency`,frequencyPlaceholder:`As prescribed by your doctor`,note:`Note`,submit:`Save medication`,saved:`{name} was added`,startDate:`Started taking`,startDateHint:`Helps you and your doctor see since when you take the medication.`},reminders:{title:`Would you like to set a reminder?`,lead:`Every day, at a time you choose, we'll remind you to log your symptoms and how you feel.`,yes:`Yes`,no:`No, not now`,time:`When should we remind you?`,permission:`Your phone will then ask for permission to send notifications. You can turn the reminder off in your profile at any time.`},today:{greeting:`Hello`,greetingName:`Hello, {name}`,howAreYou:`How are you feeling today?`,noEntries:`You haven't logged any symptoms today yet.`,addSymptom:`Add symptom`,overview:`Today`,sleep:`Sleep`,meds:`Medications`,nothingYet:`Nothing yet`,entriesEmpty:`Nothing here yet. Add a symptom with the button above, start an episode in the middle of the bottom menu.`,symptomsToday:`Symptoms logged today`,intakeTitle:`Medication`,logIntake:`Log medication`,pressure:`Pressure`,steps:`Steps`,turnOn:`Turn on`,connect:`Connect`,mobileOnly:`In the mobile app`},episode:{title:`Episode`,ongoing:`Episode in progress`,statusOngoing:`In progress`,statusEnded:`Ended`,started:`Episode started`,startedAt:`Started`,endedAt:`Ended`,duration:`Duration`,since:`since {time}`,lasting:`lasting {duration}`,detailsLater:`You can add details now or at any time later. The episode stays saved even if you close the app.`,addDetails:`Add details`,finishLater:`Finish later`,end:`End episode`,endedToast:`Episode ended`,mistake:`Started it by mistake?`,cancel:`Cancel episode`,cancelledToast:`Episode cancelled`,delete:`Delete episode`,deleteTitle:`Delete this episode?`,deleteText:`The entry will be permanently removed from this device.`,deletedToast:`Episode deleted`,notFound:`This episode no longer exists.`,linkedSymptoms:`Symptoms logged during the episode`,linkedIntakes:`Medications taken during the episode`,editDetails:`Edit details`,saveLater:`Save and finish later`,savedLater:`The episode is saved. You can add details any time in its detail view.`,details:`Details`},duration:{underMinute:`less than a minute`,minutes:`{m} min`,hours:`{h} h`,hoursMinutes:`{h} h {m} min`},nav:{label:`Main navigation`,today:`Today`,calendar:`Calendar`,insights:`Insights`,treatment:`Treatment`,profile:`Profile`,startEpisode:`Start episode`},profile:{title:`Profile`,me:`My profile`,name:`Name`,namePlaceholder:`Optional`,nameHint:`Used only to greet you on the home screen.`,language:`Language`,tracking:`Tracking`,condition:`What I track`,conditionNone:`Not chosen`,cycle:`Menstrual cycle`,reminders:`Daily reminder`,reminderTime:`Reminder time`,display:`Display`,privacy:`Privacy`,deleteAll:`Delete all data`,deleteAllTitle:`Delete all data?`,deleteAllText:`All entries, medications and settings on this device will be removed. This cannot be undone. Backups and exports you saved outside the app and permissions in your phone's settings remain.`,deleteAllConfirm:`Yes, delete`,saved:`Saved`,disclaimer:`This app is for personal tracking and is not a medical device. It does not provide a diagnosis or treatment and does not replace consulting a doctor. If you have sudden, severe or unusual symptoms, seek medical help or call 155 or 112.`,integrations:`Connections`,health:`Smartwatch and health data`,healthHint:`Sleep, steps and workouts from Health Connect, including your watch.`,healthHintIos:`Sleep, steps and workouts from Apple Health, including your watch.`,logout:`Sign out`,logoutNoPinTitle:`Set a PIN first`,logoutNoPinText:`Without a PIN, anyone with your phone could open the app after you sign out. Once you set a PIN, we will sign you out right away.`,logoutNoPinConfirm:`Set a PIN`,appearance:`Appearance`,themes:{light:`Light`,dark:`Dark`,system:`Automatic`},demoSection:`App preview`,demoFill:`Filled app`,demoFillHint:`Turn off to see the empty app, as a new person would.`,demoFillOn:`Sample data is on`,demoFillOff:`Sample data is off, the app is empty`,weatherHint:`Pressure and weather for your location are recorded every day.`,demoPlus:`Vestie+ on`,demoPlusHint:`Switch to see the app with or without a subscription.`,plusActive:`My Vestie+`,plusTry:`Try Vestie+`,plusHint:`Weather and pressure, weather alerts, pattern finder and more.`,help:`Help`,reportBug:`Report a bug`,reportBugHint:`An email with the app and phone version, no diary entries`},bugReport:{title:`Report a bug`,open:`This opens an email to {email}. Describe what happened and what you were doing. A screenshot helps too.`,details:`We only include the app version, system and phone model ({details}). No diary entries. You will see the email before sending and can edit it.`,health:`Please don’t include more health information than needed.`,confirm:`Open email`,subject:`{app} – bug ({version})`,body:`What happened:


Where in the app and what I was doing:


Does it happen every time or only sometimes:


---
App version: {version}
System: {system}
Phone: {device}`},symptoms:{dizziness:`Dizziness`,vertigo:`Vertigo`,rocking:`Rocking / swaying`,floating:`Floating sensation`,unsteadiness:`Unsteadiness when walking`,nausea:`Nausea`,vomiting:`Vomiting`,light_sensitivity:`Sensitivity to light`,sound_sensitivity:`Sensitivity to sound`,visual_sensitivity:`Visual sensitivity`,tinnitus:`Tinnitus / ringing in the ears`,ear_pressure:`Ear pressure`,headache:`Headache`,brain_fog:`Brain fog`,fatigue:`Fatigue`,unknown:`Unknown symptom`},durations:{just_started:`Just started`,under_1h:`Less than 1 hour`,"1_3h":`1–3 hours`,"3_6h":`3–6 hours`,"6_12h":`6–12 hours`,over_12h:`More than 12 hours`,ongoing:`Still ongoing`,moment:`A moment (seconds to minutes)`},triggers:{poor_sleep:`Poor / insufficient sleep`,stress:`Stress`,skipped_meal:`Skipped meal`,dehydration:`Dehydration`,caffeine:`Caffeine`,alcohol:`Alcohol`,exertion:`Physical exertion`,illness:`Illness / infection`,visual_stimulation:`Visual stimulation`,screen_time:`Extended screen time`,weather_change:`Weather change`,menstrual_cycle:`Menstrual cycle`,travel:`Travel / motion`,other:`Other`,long_sleep:`Too much sleep`,bright_light:`Bright light / sunlight`,strong_smells:`Strong smells`,neck_pain:`Neck pain or tension`,allergy:`Allergy`},effects:{helped:`Helped`,partly:`Partly`,not_helped:`Didn't help`,unknown:`Not sure`},intensity:{none:`none`,mild:`mild`,moderate:`moderate`,severe:`severe`,notSet:`Not set`,value:`{value} – {level}`,highest:`highest intensity {value}`},log:{symptomsTitle:`Which symptoms are you logging?`,symptomsLead:`Choose one or more symptoms.`,search:`Search symptoms`,noMatch:`No symptom matches your search. You can add your own.`,custom:`Custom symptom`,customPlaceholder:`Type the symptom name`,customAdd:`Add`,continueCount:`Continue ({n})`,intensityTitle:`How intense is it?`,intensityLead:`0 = none, 10 = worst. The slider starts at 5 – move it to match how you feel. You can skip any symptom.`,clear:`Skip`,detailsTitle:`How long have these symptoms lasted?`,detailsLead:`Everything on this screen is optional.`,when:`When they started`,date:`Date`,time:`Time`,note:`Note`,linkEpisode:`Add to the ongoing episode`,save:`Save entry`,saved:`Entry saved`,whenToday:`Today at {time}`,whenOn:`{date} at {time}`,changeTime:`Change time`,clearLabel:`Skip intensity: {name}`,restore:`Rate intensity`},symptomLog:{title:`Symptoms`,duration:`Duration`,note:`Note`,episode:`Part of an episode`,edit:`Edit entry`,delete:`Delete entry`,deleteTitle:`Delete this entry?`,deleteText:`The entry will be permanently removed from this device.`,deletedToast:`Entry deleted`,notFound:`This entry no longer exists.`},treatment:{title:`Treatment`,lead:`Your medications, when you take them and whether you felt they helped.`,preventive:`Preventive`,acute:`Acute`,add:`Add medication`,empty:`You haven't added any medications yet.`,noneOfType:`No medications in this group.`,lastTaken:`Last taken {when}`,neverTaken:`No intake logged yet`,disclaimer:`The app does not prescribe medications or suggest dose changes. Decide on treatment with your doctor.`,type:`Type`,dose:`Dose`,frequency:`Frequency`,note:`Note`,logIntake:`Log intake`,history:`Intake history`,historyEmpty:`You haven't logged any intake yet.`,taken:`Taken`,effectSummary:`Effect as you rated it`,edit:`Edit medication`,delete:`Remove medication`,deleteTitle:`Remove this medication?`,deleteText:`The medication and its whole intake history will be removed.`,deletedToast:`Medication removed`,notFound:`This medication no longer exists.`,inEpisode:`during an episode`,effectMissing:`effect not rated`,showAll:`Show full history ({n})`,hint:`Tap a medication to log when you take it and whether you felt it helped.`},intake:{title:`Medication intake`,editTitle:`Edit intake`,date:`Date`,time:`Time`,dose:`Dose`,effect:`Did it help?`,effectHint:`If you don't know yet, add it later.`,note:`Note`,save:`Save intake`,saved:`Intake saved`,delete:`Delete intake`,deleteTitle:`Delete this intake?`,deleteText:`The intake record will be permanently removed.`,deletedToast:`Intake deleted`,notFound:`This entry no longer exists.`},calendar:{title:`Calendar`,prev:`Previous month`,next:`Next month`,backToday:`Today`,legend:`Legend`,legendPeriod:`Period`,dayEmpty:`You have no entries on this day.`,addSymptom:`Add symptom`,periodMark:`Log period on this day`,summaryEntries:`{n} entries`,summaryPeriod:`period`,summaryNone:`no entries`,selected:`selected day`,today:`today`,legendEpisode:`Day with an episode`,legendSymptoms:`Symptoms logged`,summaryEpisode:`episode`},insights:{title:`Insights`,periodLabel:`Period`,empty:`Insights are built from your entries. Once you've logged symptoms on several days, you'll see here what keeps coming back.`,overview:`Summary`,symptomDays:`Days with symptoms`,episodes:`Episodes`,avgIntensity:`Average intensity`,avgDuration:`Average episode duration`,noValue:`not entered`,topSymptoms:`Most frequent symptoms`,topSymptomsLead:`Number of entries in which the symptom appeared.`,topTriggers:`Most frequent possible triggers`,triggersEmpty:`You haven't logged any possible triggers yet. They will come with episode details.`,meds:`Medications`,medsEmpty:`You didn't log any medication intake in this period.`,interpretation:`A recorded connection is not proof of a cause. The overview only uses data you entered.`,report:`Create a report for your doctor`},report:{title:`Report for your doctor`,lead:`Choose a period. The report summarises your entries so you can show them to your doctor.`,custom:`Custom period`,from:`From`,to:`To`,create:`Create report`,invalidRange:`The “From” date must be on or before the “To” date.`,docTitle:`Recorded symptoms and treatment`,period:`Period`,created:`Created`,disclaimer:`Data recorded by the user in the Vestie app. The app is not a medical device. This is not a diagnosis, a medical record or a treatment recommendation.`,fewData:`Few entries were recorded in this period, so the overview may not be representative.`,summary:`Summary`,symptoms:`Most frequent symptoms`,triggers:`Recorded possible triggers`,meds:`Medications and effect as rated by the user`,sleep:`Sleep`,sleepNone:`No sleep was recorded in this period.`,cycle:`Menstrual cycle`,cycleDays:`Recorded period days`,notes:`Notes`,timeline:`Timeline`,colDate:`Date and time`,colEntry:`Entry`,colDetail:`Details`,none:`No entries.`,print:`Save as PDF`,printHint:`In the print window, choose “Save as PDF”.`,sleepQuality:`Sleep quality`,plusHint:`With Vestie+ the report also shows pressure during episodes, possible patterns and activity.`,weather:`Weather and pressure during episodes`,weatherSummary:`Episodes on days when pressure dropped by 6 hPa or more: {drops} of {total}.`,patterns:`Possible patterns from the entries`,patternsOther:`otherwise {a} of {b}`,patternsNote:`Number of harder days after a day with this factor. These are possible patterns from the user's entries over the past year, not proof of a cause.`,activity:`Activity`,avgSteps:`Average steps per day`,workoutDays:`Days with a workout`,workoutDaysValue:`{a} of {b}`,workoutTypes:`Most frequent workouts`},sleep:{title:`Sleep`,formTitle:`How did you sleep?`,lead:`Log how long you slept. Quality and a note are optional.`,date:`Day you woke up`,duration:`Sleep duration`,hours:`Hours`,minutes:`Minutes`,durationRequired:`Please enter how long you slept.`,quality:`Sleep quality`,qualities:{good:`Good`,fair:`Fair`,poor:`Poor`},note:`Note`,save:`Save sleep`,saved:`Sleep saved`,add:`Log sleep`,entry:`Sleep {duration}`,delete:`Delete sleep entry`,deleteTitle:`Delete this sleep entry?`,deleteText:`The entry will be permanently removed from this device.`,deletedToast:`Sleep entry deleted`,avg:`Average sleep`,nights:`Nights recorded`},consent:{title:`Your entries stay on your phone`,lead:`Before you start, here is how we handle your data.`,updatedLead:`The privacy policy has changed. Please read it and confirm your consent again to keep using the app.`,factDevice:`The app stores your health entries only on this phone.`,factNoServer:`The app has no online account, sends no health entries anywhere and has no ads or analytics of its own.`,factPin:`You will sign in with a PIN. While the PIN is on, your data is encrypted on the phone.`,factControl:`You can export your data to a file or delete it permanently at any time.`,health:`I agree that IronPhysique s. r. o., as the controller of the Vestie app, processes on this phone the health data I enter or choose to import (symptoms, episodes, medications, sleep and, if I choose, my menstrual cycle) for my personal tracking. I can withdraw this consent at any time in Profile; my data will then be deleted.`,age:`I am at least 16 years old.`,policyLink:`Read the privacy policy`,termsNote:`By using the app, you accept the {terms}.`,termsLink:`terms of use`,submit:`Agree and continue`,decline:`I don't agree`,declineTitle:`The app can't continue without your consent`,declineText:`Your entries stay on your phone. You can export them to a file or delete them permanently. Until you agree, the app only keeps them and does nothing else with them.`,factNotMedical:`Vestie is a personal diary, not a medical device. It does not diagnose, treat or replace a doctor. If you have sudden, severe or unusual symptoms, seek medical help or call 155 or 112.`},privacyPolicy:JSON.parse(`{"title":"Privacy policy","version":"Version {version}","controllerTitle":"Who is the controller","controllerText":"The controller is IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, Slovakia, company ID 47321547. Contact for questions about personal data: support@vestibularnamigrena.sk, phone +421 902 811 486.","dataTitle":"What data the app processes","dataText":"What you enter: what you want to track (for example vestibular migraine), symptoms and their intensity, episodes and their possible triggers, medications and how you rate their effect, sleep, notes, optionally your menstrual cycle and a name for the greeting. With Vestie+ also weather and air pressure for your approximate location and data from health apps, if you turn them on. The app also stores on the phone your settings, a record of your consent (time and policy version), the subscription status with the order number and, when weather is on, your last rounded location. This is health data, so we protect it specially.","storageTitle":"Where your data is","storageText":"Entries from the app are only on this phone. The app has no server or online account, sends no health entries anywhere and has no ads or analytics of its own. The controller has no access to the entries in the app. They leave the phone only when you do it yourself (export, backup, report) or with a backup or transfer of the whole phone, as described under Backups. Depending on your phone's settings, Google Play may collect aggregated data about app crashes. We cannot tell from it who you are.","purposeTitle":"What it is for","purposeText":"For your personal tracking and for an overview or report you can show your doctor. The report is created on the phone and you decide who gets it. The app shows possible connections in your entries on the phone, but makes no automated decisions about you with legal or similarly significant effects.","legalTitle":"Legal basis","legalText":"We process the entries in the app, including health data, on the basis of your explicit consent (Art. 6(1)(a) and Art. 9(2)(a) GDPR). This also covers sleep, steps and workouts you choose to import from Apple Health or Health Connect. You can withdraw your consent at any time in your Profile; your data will then be deleted. Withdrawal does not affect the lawfulness of processing before it. The app sends your location for weather on the basis of your consent, which you give by turning the feature on and withdraw by turning it off (Art. 6(1)(a) GDPR). We process Vestie+ subscription data (order number, plan, dates) to perform our contract with you (Art. 6(1)(b) GDPR), and accounting records because the law requires us to (Art. 6(1)(c) GDPR). We answer e-mails on the basis of our legitimate interest in dealing with your request (Art. 6(1)(f) GDPR). We handle notices of withdrawal from the contract and complaints because the law requires us to (Art. 6(1)(c) GDPR), and after handling them we keep them on the basis of our legitimate interest in defending ourselves in a possible dispute (Art. 6(1)(f) GDPR). If you tell us something about your health in an email yourself and we need it to deal with your request, we will ask for your explicit consent (Art. 9(2)(a) GDPR). In a complaint or a withdrawal from the contract, we also process it to establish, exercise or defend legal claims (Art. 9(2)(f) GDPR).","rightsTitle":"Your rights","rightsText":"You have the right to access your data, to have it corrected and erased, to restrict its processing, to data portability, to object and to withdraw your consent at any time. Your entries exist only on your phone and we have no access to them, so you exercise most of these rights directly in the app: you can view, edit, export or permanently delete your data (Profile → Privacy). For anything else, for example e-mails you have sent us, we will help at support@vestibularnamigrena.sk. You also have the right to lodge a complaint with the Office for Personal Data Protection of the Slovak Republic (dataprotection.gov.sk) or with the data protection authority in the EU country where you live.","securityTitle":"Security","securityText":"On first launch you set a 6-digit PIN. While the PIN is on, your entries are stored encrypted on the phone (AES-256) and the app won't open them without the PIN. If you turn the PIN off in Profile, the entries are not encrypted. On Android, encryption is also tied to a key kept in a protected part of the phone (Android Keystore) that cannot be copied off the phone. A copy of your data therefore can't be opened outside your phone, not even by guessing PINs. No protection is 100% secure, so choose a PIN that isn't easy to guess and keep your phone protected with a screen lock as well. The readable export from Profile is not encrypted; only the password-protected backup is. If you forget the PIN, the data cannot be recovered.","backupTitle":"Backup","backupText":"Your data exists only on your phone and the app has no server. On Android it is not backed up to Google Drive. On iPhone it is part of your whole-phone backup in iCloud or on your computer, if you have it turned on. In Profile you can create a password-protected backup and save it wherever you like. We don't know your backup password, so we can't recover it either. When you set up a new phone, Android may transfer the app's data directly from the old phone (by cable or over Wi-Fi). If your PIN is on, the data stays encrypted both in phone backups and during a transfer. On Android, however, data transferred with a PIN won't open on the new phone, because the encryption is tied to the old phone. So before you change phones, create a password-protected backup, or turn the PIN off before the transfer and turn it back on on the new phone. Without a backup or a transfer, your data is lost if you lose or change your phone.","ageTitle":"Age","ageText":"The app is intended for people aged 16 and over.","changesTitle":"Changes to this policy","changesText":"We will let you know about changes to this policy directly in the app. For a material change we will ask for your consent again. We will send you earlier versions on request.","weatherTitle":"Weather and pressure (Vestie+)","weatherText":"If you turn this feature on, when the weather is updated (when you open the app, at most once every 3 hours, or when you ask for it) the app sends your location, rounded to about 10 km, to the weather provider to get real weather and air pressure. The provider is OpenWeather Ltd., 30 St Mary Axe, London, United Kingdom. The EU has an adequacy decision for the United Kingdom. The provider technically also sees your IP address, as with any internet request. According to its privacy policy (openweather.co.uk/privacy-policy), it does not store the IP address or location from these requests. None of your entries are sent. The app remembers your last rounded location on the phone until you turn the feature off or Vestie+ ends. You can turn this off at any time.","healthTitle":"Health apps connection (Vestie+)","healthText":"If you connect Apple Health or Health Connect, the app only reads selected data from them into this phone: sleep (bedtime, wake time and duration), daily steps and workouts (type, time and duration only). When you connect, it also reads the last 90 days. It writes nothing to them and sends nothing anywhere. We do not use this data for advertising, sell it or share it with anyone. You can remove the connection at any time. What has already been read stays in your entries until you delete it, and you remove the permission in your phone's settings.","purchasesTitle":"Subscription","purchasesText":"Payment for Vestie+ is handled by Google Play or Apple as a separate controller under their own terms and policies, and they may process data outside the EU when doing so. We never see your payment details. The app learns from the store whether the subscription is active, when it started and the order number (GPA.), and stores this on the phone. In our Google Play developer account we see the order data the store makes available to us (mainly the order number, date, amount and country), not your entries from the app. We use it for refunds and accounting. We keep accounting records for 10 years, as required by the Accounting Act, and our accountant sees them. The Google Play library the app uses to buy and verify the subscription also sends Google technical data about whether the purchase and connection work (diagnostics). The app turns it on only for the Vestie+ offer, a purchase, restoring a purchase and verifying the subscription. It contains nothing about your health.","linksTitle":"Links to the website and community","linksText":"The app contains links to the vestibularnamigrena.sk website and to the community on Facebook, Instagram and Discord. It sends them nothing. When you open a link, you leave the app and the rules and policies of that service apply.","retentionTitle":"How long","retentionText":"Entries stay on the phone until you delete them, withdraw your consent or uninstall the app. You keep the backup and exports yourself and decide when to delete them. The app remembers the order number while the subscription is active. Periods for e-mails are under When you write to us and for accounting records under Subscription.","contactTitle":"When you write to us","contactText":"If you write to support@vestibularnamigrena.sk, we process your e-mail address and the content of your message only to reply to you. We delete an ordinary message no later than 1 year after dealing with it. We keep a notice of withdrawal or a complaint (name, order number, e-mail) for 3 years, while claims can still be made based on it. The withdrawal form on our website (vestibularnamigrena.sk/vestie/odstupenie) sends your name, e-mail and order number by e-mail to us and a confirmation to you. It stores nothing in a database. To prevent abuse, the server remembers for at most an hour a fingerprint of the IP address from which the address cannot be recovered. E-mails are stored with the provider of our mailbox and website in Slovakia, which processes them for us as a processor. For a refund we use the order number in Google Play. Please do not include more health information than necessary. If you do, we use it only to reply to you.","requiredTitle":"Do you have to provide data?","requiredText":"No. Neither the law nor a contract requires it. However, the app cannot work without your consent to the processing of health data, because there is no diary without it. Everything else is optional: you can skip your name, menstrual cycle, location-based weather and the health apps connection, and the app keeps working. For a withdrawal from the contract or a complaint we need your name and e-mail and, if you know it, the order number, otherwise we cannot handle it."}`),terms:JSON.parse(`{"title":"Terms of use","version":"Version {version}","providerTitle":"Who provides the app","providerText":"The Vestie app and the Vestie+ subscription are provided by IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, Slovakia, company ID 47321547, tax ID 2023812813, VAT ID SK2023812813 (registered under Section 7a of the Slovak VAT Act, not a VAT payer), registered in the Commercial Register of the Municipal Court Bratislava III, section Sro, file no. 90506/B. Contact: support@vestibularnamigrena.sk, phone +421 902 811 486.\\nThese terms govern the use of the app and the Vestie+ subscription. How we handle your data is described in the separate Privacy Policy.","appTitle":"What the app is","appText":"Vestie is a personal diary. You record symptoms, episodes, medications, sleep and other details, and the app shows overviews, possible patterns and a report you can show your doctor. The basic version is free. The app is intended for people aged 16 and over. Vestie+ can be subscribed to by an adult, or by a minor with the consent of a parent or legal guardian.","healthTitle":"The app is not a medical device","healthText":"The app does not diagnose, treat, or recommend medications or dosages, and it does not replace a doctor. Possible patterns are based only on your own entries, not on a medical assessment, and may be due to chance. Weather alerts are based only on the weather forecast and on the changes you have selected in the app. They say nothing about your health. Always talk to your doctor about treatment. If you have sudden, severe or unusual symptoms, seek medical help or call 155 or 112.","useTitle":"How you may use the app","useText":"You may use the app for your own personal needs. The app, its texts and illustrations, and the Vestie and Vestibulárna migréna brands are protected. They belong to their owners, and we use them with their permission. You may not copy, modify or distribute them without permission, except where the law allows. You may not get around the subscription or interfere with how the app works.","plusTitle":"What Vestie+ includes","plusText":"Vestie+ adds to the free version weather and air pressure based on your approximate location, weather alerts, the pattern finder, advanced statistics, the health apps connection (sleep, steps and workouts) and an extended report for your doctor. The current scope is described in the Vestie+ offer in the app. Features that need the internet or other apps only work when they are available (see Services of other providers).\\nVestie+ works on phones running Android 8.0 or later. Weather and air pressure need an internet connection and the approximate location permission; the health connection needs the Health Connect app. The app has no technical copy protection.","paymentTitle":"Price, payment and renewal","paymentText":"Vestie+ is a monthly or yearly subscription. You see the price including VAT in the app and in the store before you buy. Payment is handled by Google Play (App Store on iPhone) under its own terms; we never see your payment details.\\nThe contract is for the period you choose, and at its end the subscription renews for another period of the same length and is charged again automatically until you cancel it. We may change the price. You will learn about an increase in advance, and the new price applies to you only once you accept it in Google Play (App Store on iPhone). If you do not accept it, the subscription ends at the end of the current period and you pay nothing more. If a payment fails, the store may end the subscription after repeated attempts.\\nIf the offer includes a free trial, the first payment is taken only after the trial ends. If you cancel during the trial, you pay nothing. The store offers the trial only once per account, for both plans together. A promo code may give a trial of a different length, even to someone who has already had one. The length Google Play shows you before you confirm applies, and after it ends the subscription renews and is charged in the same way.","contractTitle":"Concluding the contract and language","contractText":"You conclude the Vestie+ contract in the Google Play purchase window when you confirm the subscription. With a promo code redeemed in the Play Store, you conclude it by confirming there, and the app shows you its confirmation when you come back to it. Before you confirm, you can change the plan or cancel the purchase. Google Play sends you the order confirmation by email. Right after the purchase, the app shows you a confirmation with the main terms and the withdrawal period, which you can save to a file. You can also find it later under Vestie+ → Subscription confirmation. These terms are always available in the app and on the web at vestibularnamigrena.sk/vestie/podmienky.\\nYou conclude the contract in Slovak, Czech or English, depending on the app language, and the version in that language is decisive.","cancelTitle":"Cancelling the subscription","cancelText":"You can cancel the subscription at any time in the store's subscription settings. From the app you get there via Vestie+ → Manage in Google Play. Uninstalling the app or deleting your data does not cancel the subscription.\\nAfter you cancel, you keep Vestie+ until the end of the paid period or the free trial and no further payment is taken. The app then returns to the free version and all your entries stay on your phone.","withdrawalTitle":"Right of withdrawal and refunds","withdrawalText":"As a consumer, you may withdraw from the Vestie+ contract without giving a reason within 14 days of concluding it, that is, from the start of the subscription. If the subscription starts with a free trial, the period includes the trial: with a 7-day trial, you still have at least 7 days after the first payment. With a longer trial from a promo code, the period may end during the trial, but you can cancel the subscription free of charge at any time before the trial ends. You can withdraw with the form at vestibularnamigrena.sk/vestie/odstupenie, which you can also open from the app under Vestie+ → Withdraw from the contract here. You enter your name and email (the order number from your Google Play receipt, which starts with GPA., only if you know it) and confirm with the “Confirm withdrawal from the contract” button. Your notice is sent immediately and a confirmation with its text, date and time is sent to your email. The form works without signing in, even if you no longer have the app. You can also withdraw by emailing support@vestibularnamigrena.sk or with the model form below; in that case too, we will confirm receipt by email without delay. The deadline is met if you send the notice on its last day at the latest. If you withdraw during the free trial, we will cancel the subscription and you will pay nothing. If a payment has already been made, we will refund the full amount through Google Play to the same payment method no later than 14 days after we receive your notice. You can use Vestie+ right away and you still get the full amount back; we do not deduct anything for the days you used it. Vestie+ is switched off after you withdraw.\\nAfter the 14 days, there are no refunds for a period that has already started. An automatic renewal is not a new contract, so it does not start a new withdrawal period. The only exceptions are described in Changes to the app and these terms and in Complaints and disputes. Independently of this, Google Play may refund a payment itself under its own rules, for example when asked shortly after the payment.","formTitle":"Model withdrawal form","formText":"Complete and return this form only if you wish to withdraw from the contract.\\nTo: IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, Slovakia, support@vestibularnamigrena.sk\\nI hereby give notice that I withdraw from my contract for the provision of the following service: Vestie+ subscription\\nOrdered on:\\nOrder number (GPA.):\\nName:\\nAddress:\\nSignature (only if this form is sent on paper):\\nDate:","dataTitle":"Your entries","dataText":"Your entries are stored only on your phone. We have no access to them, so we cannot restore, transfer or return them. Backups are up to you (Profile → Data backup). If you forget your PIN or your backup password, your data cannot be recovered.","servicesTitle":"Services of other providers","servicesText":"Weather and pressure come from OpenWeather, sleep, steps and workouts are read from Health Connect or Apple Health, and payments are handled by Google Play or the App Store. We cannot control their availability or accuracy, and weather forecasts can be wrong. When a service is unavailable, the app shows the last real data with the time it is from, or says it has no data. Links to the website and the community (Facebook, Instagram, Discord) lead outside the app, where that service's rules apply.","liabilityTitle":"Liability","liabilityText":"We build the app with care, but we cannot guarantee that it will always be free of errors or available without interruption. If Vestie+ does not work as it should, you have the rights described in Complaints and disputes. We are liable for damage as provided by law, but not for loss of data we did not cause, for example when you lose your phone without a backup. The app does not replace a doctor, so always discuss decisions about treatment with your doctor. This does not affect your statutory consumer rights or liability for damage caused intentionally or to health.","changesTitle":"Changes to the app and these terms","changesText":"We may change and improve the app when there is a reason to do so, for example security, a change in the law, a change in another provider's service, or making the app work better. You do not pay anything extra for a change. If a change would make your access to or use of Vestie+ more than slightly worse, or if we discontinued Vestie+, we will let you know in the app in advance. Within 30 days of that notice or of the change, whichever is later, you may end the contract free of charge and we will refund the unused part of the paid period. We will tell you about changes to these terms in the app. If you do not agree with them, you can cancel the subscription, and the original terms continue to apply to you until the end of the paid period.","complaintsTitle":"Complaints and disputes","complaintsText":"If Vestie+ does not work as it should, email support@vestibularnamigrena.sk and describe what is happening. We will confirm receipt of your complaint by email, fix the problem without undue delay and deal with the complaint within 30 days at the latest. We will email you the outcome and, if we reject the complaint, the reason. If we do not fix the problem within a reasonable time, or it is so serious that you cannot be expected to wait, you are entitled to an appropriate price reduction or you may end the contract. If you end it, we will refund you for the period when Vestie+ did not work and for the unused part of the paid period, no later than 14 days after we receive your notice. You have rights for defects for the whole time we provide Vestie+.\\nWe make updates needed to keep Vestie+ in line with the contract available in the store. If you do not install them despite being told to, we are not liable for a defect the update would have fixed.\\nIf you are not satisfied with how we dealt with it, or you believe we have breached your rights, you can ask us for redress at support@vestibularnamigrena.sk. If we reject your request or do not reply within 30 days, you can file a proposal for alternative dispute resolution with the Slovak Trade Inspection (Slovenská obchodná inšpekcia, soi.sk) or another body on the list kept by the Slovak Ministry of Economy (mhsr.sk). Consumer protection is supervised by the Slovak Trade Inspection.","lawTitle":"Governing law","lawText":"These terms are governed by the law of the Slovak Republic. If you live in another country of the European Union, you also keep the protection given to you by the mandatory laws of your country."}`),dataDeletion:{title:`Data deletion`,version:`Version {version}`,appTitle:`What this covers`,appText:`Vestie is a diary for vestibular migraine and dizziness, published by IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, Slovakia. The app has no account or sign-in. Your entries exist only on your phone and we have no access to them, so you delete them directly in the app.`,inAppTitle:`Deleting your entries in the app`,inAppText:`1. Open Vestie and tap the profile icon in the top right corner.
2. Under Privacy, tap Delete all data and confirm.
All entries, settings and the PIN on this phone are permanently deleted. Withdraw consent in the same section or uninstalling the app does the same. Delete any backups and exports you saved outside the app wherever you stored them.`,emailTitle:`Deleting data we hold`,emailText:`If you have written to us, email support@vestibularnamigrena.sk and say that you want your data deleted. We will delete your emails and any other data about you that we are not required to keep, and confirm it within one month. The app sends your approximate location for weather directly to the weather provider OpenWeather; we never receive it. Technical purchase data (diagnostics) is processed by Google.`,keptTitle:`What we keep after a request`,keptText:`We keep withdrawal notices and complaints (name, order number, email) for 3 years, while claims can still be made. We keep accounting records for the Vestie+ subscription for 10 years, as required by the Accounting Act. After that we delete them. You cancel the subscription and manage your purchase history in Google Play.`,moreTitle:`More information`,moreText:`Details are in the privacy policy: https://www.vestibularnamigrena.sk/vestie/zasady/`},profileSetup:{title:`Create your profile`,lead:`Your profile exists only on this phone – no online e-mail or password. You will sign in with a PIN.`,pinTitle:`Sign-in PIN`,pinText:`In the next step you will set a 6-digit PIN. You will use it to sign in and it also encrypts your data on the phone.`,nameLabel:`What should we call you?`,namePlaceholder:`Your name`,nameHint:`Optional. You will see it in the greeting on the home screen.`,pinAlready:`You already have a PIN. You can change it in Profile → Security.`},pin:{progress:`{n} of {total} digits entered`,keypad:`PIN keypad`,delete:`Delete digit`,prompt:{current:`Enter your current PIN`,new:`Choose a 6-digit PIN`,confirm:`Enter the PIN again to confirm`},title:{set:`Set your sign-in PIN`,change:`Change PIN`,disable:`Turn off PIN`},setLead:`You will use it to sign in and it also encrypts your data on the phone. If you forget it, the data cannot be recovered – we have no access to it.`,checking:`Checking…`,wrong:`Wrong PIN. Please try again.`,blocked:`Too many wrong attempts. Try again at {time}.`,weak:`This PIN is easy to guess. Please choose another one.`,mismatch:`The PINs don't match. Please choose your PIN again.`,saving:`Encrypting your data…`,enabled:`PIN set, your data is encrypted`,changed:`PIN changed`,disabled:`PIN turned off`,blockedSeconds:`Too many wrong attempts. Try again in {n} s.`,deviceError:`Your PIN couldn't be checked right now. Please try again.`},lock:{title:`Sign in`,lead:`Enter your PIN`,forgot:`Forgot your PIN?`,forgotTitle:`Forgotten PIN`,forgotText:`The PIN cannot be recovered – your data is encrypted only on this phone and we don't have the key. You can only delete it and start over.`,forgotConfirm:`Delete everything and start over`,moved:{title:`Your data comes from another phone`,text:`When the PIN is on, your data can only be opened on the phone where it was created. After a transfer to a new phone, it won't open even with the correct PIN.`,backup:`If you have a backup, start over and restore it after setup in Profile → Data backup. If you still have the old phone, create a backup there. Your data on it is unchanged.`,action:`Start over`,confirmTitle:`Start over?`,confirmText:`The data transferred from another phone will be deleted from this phone. You can then restore your entries from a backup.`,confirm:`Delete and start over`}},security:{title:`Security`,pin:`Sign in with PIN`,pinOnHint:`Your data is encrypted on the phone and the app won't open it without the PIN.`,pinOffHint:`Without a PIN, anyone with your phone can open the app and your data is not encrypted.`,changePin:`Change PIN`,autoLock:`Sign out automatically`,autoLockOptions:{m0:`Right after leaving the app`,m1:`After 1 minute`,m5:`After 5 minutes`,m15:`After 15 minutes`},biometrics:`Unlock with face or fingerprint`,biometricsHint:`Available in the mobile app.`},privacy:{deviceOnly:`Your entries are only on this phone`,deviceOnlyHint:`The app sends no health entries anywhere and we have no access to the entries in the app.`,export:`Export my data`,exportHint:`A readable JSON file with all your entries, for example to move them elsewhere. It is not encrypted.`,exportDone:`Your data file is ready`,consent:`Consent to data processing`,consentGiven:`Given on {date}`,withdraw:`Withdraw consent`,withdrawTitle:`Withdraw consent?`,withdrawText:`Without consent the app cannot keep your health data. Withdrawing will permanently delete all data on this phone. Backups and exports you saved elsewhere and permissions in your phone's settings remain.`,withdrawConfirm:`Withdraw and delete data`,backupFirst:`Make a backup first`,plusNotCancelled:`This does not cancel your Vestie+ subscription. If you no longer want it, cancel it in {store}, otherwise it will keep renewing.`,exportFailed:`The file could not be created. Please try again.`,importTitle:`Restore data from this file?`,importText:`All records on this phone will be replaced by the records in the file. Your subscription and PIN stay the same.`,importConfirm:`Restore`,importDone:`Your data has been restored`},backup:{title:`Data backup`,profileHint:`A password-protected file you can restore your entries from, for example on a new phone.`,lead:`The app has no server; your entries exist only on this phone. Save a backup somewhere else, such as Google Drive or a computer. If you change or lose your phone, you can restore all your entries from it. If your PIN is on, a direct transfer to a new Android phone isn't enough; your entries will only open there from a backup.`,lastAt:`Last backup: {date}`,never:`You haven't created a backup yet.`,createTitle:`Create a backup`,password:`Backup password`,passwordHint:`At least {n} characters. Don't use your PIN.`,passwordRepeat:`Repeat the password`,passwordWarning:`Remember the password or write it down somewhere safe. Without it the backup can't be opened or restored, and nobody can recover it for you.`,create:`Create backup`,creating:`Creating the backup…`,created:`The backup is ready. Save it somewhere other than this phone.`,failed:`The backup couldn't be created. Please try again.`,fileName:`backup`,restoreTitle:`Restore from a backup`,restore:`Choose a backup file`,restoreHint:`For example on a new phone. The entries on this phone will be replaced with the ones from the backup.`,restoreLead:`The backup is encrypted. Enter the password you chose for it.`,restoreLeadDate:`The backup from {date} is encrypted. Enter the password you chose for it.`,restoreSubmit:`Restore`,reminderTitle:`Reminder`,reminder:`Remind me to back up`,reminderHint:`Once a month, a short reminder appears on the Today screen.`,privacy:`The backup never goes anywhere on its own. You decide where to save it. It is encrypted with a password only you know.`,errors:{tooShort:`The password must have at least {n} characters.`,mismatch:`The passwords don't match.`,passwordRequired:`Enter the backup password.`,wrongPassword:`Wrong password or a damaged file.`,invalidFile:`This file can't be read. Choose a backup or an export from the app.`,newerVersion:`This backup is from a newer version of the app. Update the app and restore it again.`},card:{title:`Back up your entries`,textNever:`Your entries exist only on this phone. If you lose or change it, you'll lose them without a backup.`,textOld:`Your last backup is from {date}. Create a new one to keep your newer entries safe too.`,action:`Create backup`,later:`Not now`}},plural:{entries:{one:`{n} entry`,other:`{n} entries`},times:{other:`{n}×`},days:{one:`{n} day`,other:`{n} days`},weeks:{one:`{n} week`,other:`{n} weeks`},months:{one:`{n} month`,other:`{n} months`},years:{one:`{n} year`,other:`{n} years`},episodes:{one:`{n} episode`,other:`{n} episodes`},hardDays:{one:`{n} harder day`,other:`{n} harder days`}},community:{title:`Community & support`,lead:`You don't have to face it alone. In our community we share our own experiences, support each other and recommend specialists.`,facebook:`Facebook group`,facebookHint:`Experiences, questions and mutual support`,instagram:`Instagram`,instagramHint:`@vestibularnamigrena`,discord:`Discord`,discordHint:`Real-time conversations with the community`,webTitle:`Articles on our website`,webText:`About the diagnosis, treatment and living with vestibular migraine (in Slovak).`,webUrl:`www.vestibularnamigrena.sk`,external:`(opens outside the app)`,note:`Experiences and recommendations from the community don't replace a doctor's examination and advice.`,soon:`Coming soon`},episodeTypes:{vestibular:`Vestibular episode`,migraine_headache:`Migraine with headache`,migraine_no_headache:`Migraine without headache`,other:`Other`,unsure:`I don't know`},relief:{rest:`Rest`,sleep:`Sleep`,dark_room:`Resting in a dark room`,hydration:`Drinking water`,relaxation:`Relaxation or meditation`,cold_compress:`Cold compress`,warm_compress:`Warm compress`,shower:`Shower`,food:`Food`,other:`Other`},impact:{work_study:`Work or study`,sleep:`Sleep`,daily_activities:`Everyday activities`,social:`Contact with family and friends`,movement:`Movement and physical activity`,rest:`Rest and relaxation`,other:`Other`,none:`The episode didn't limit me much`},episodeFlow:{typeTitle:`What kind of episode was it?`,typeLead:`Every detail is optional. Skip what you don't know and add it later.`,intensity:`Overall intensity`,symptomsTitle:`Which symptoms appeared?`,symptomsLead:`Choose one or more. You'll rate each one in the next step.`,date:`Date`,time:`Time`,triggersTitle:`What might have triggered it?`,triggersLead:`Choose everything that applies. These are possible links, not confirmed causes. You can choose more than one.`,triggerOther:`Other trigger`,triggerOtherPlaceholder:`Describe what it was`,medsTitle:`Did you take any medication during the episode?`,medsLead:`Tick the medication and when you took it. It will also be saved in Treatment.`,medsLogged:`Already logged during the episode`,medsNone:`You haven't added any medication yet.`,addMed:`Add medication`,medsWhen:`When you took it`,medsOutside:`The time must be during the episode.`,helped:`Did it help?`,reliefTitle:`What brought you relief?`,summaryTitle:`Episode summary`,summaryLead:`Check what you filled in. You can edit any part.`,summaryMissing:`You can still add`,save:`Save episode`,saved:`The episode was saved`,edit:`Edit`,sections:{type:`Type`,intensity:`Intensity`,time:`Time`,symptoms:`Symptoms`,triggers:`Possible triggers`,meds:`Medication`,helped:`Did it help?`,relief:`Relief`,impact:`Limitations`},reliefLead:`You can choose more than one.`,reliefOther:`What else helped?`,reliefOtherPlaceholder:`Describe what it was`,impactTitle:`How did the episode limit you?`,impactLead:`Which areas of everyday life did it affect?`,impactOther:`What else did the episode affect?`,impactOtherPlaceholder:`Describe what it was`},symptomInfo:{open:`What does {name} mean?`,close:`Got it`,dizziness:`A feeling of lightheadedness, unsteadiness or loss of balance. You may feel your head is spinning, feel faint or feel unsure when standing or walking.`,vertigo:`A false sense of movement even though you aren't moving. You may feel that you are spinning, that the room is turning or that your surroundings are moving.`,brain_fog:`A state in which it is hard to concentrate, think clearly or process information. Your thinking may feel slower, words may be harder to find or your thoughts harder to follow.`,visual_sensitivity:`Increased sensitivity to visual stimuli. Moving images, busy environments, patterns, crowds or screens can trigger dizziness, nausea or disorientation.`,tinnitus:`Hearing a sound in one or both ears even though there is no real source of sound around you. It may be ringing, humming, buzzing or hissing.`,rocking:`A feeling as if your body or surroundings are gently rocking, swaying from side to side or moving back and forth, like on a boat.`,floating:`A feeling as if you are floating, without firm contact with the ground.`,unsteadiness:`A feeling of unsteadiness when standing or walking, as if you are losing your balance, drifting to the sides or need support to move.`},quickIntake:{title:`Which medication did you take?`,lead:`Choose a medication. Next you'll enter the time and whether it helped.`,add:`Add a new medication`,empty:`You haven't added any medication yet. Add one and then log taking it.`},plus:JSON.parse(`{"name":"Vestie+","lockedLabel":"Part of Vestie+","tryChip":"Try it","demoChip":"Sample","features":{"weather":{"title":"Weather and pressure","text":"Weather and atmospheric pressure are recorded automatically based on your location."},"forecast":{"title":"Weather alerts","text":"Alerts you in advance about forecast larger changes in atmospheric pressure, temperature or humidity."},"finder":{"title":"Pattern finder","text":"Compares days with and without symptoms and shows possible patterns."},"stats":{"title":"Advanced statistics","text":"Follow long-term trends, when episodes occur and an overview of medication use by month."},"health":{"title":"Health apps connection","text":"Automatic recording of sleep, steps and workouts through Health Connect, including data from supported watches.","textIos":"Automatic recording of sleep, steps and workouts through Apple Health, including data from supported watches."},"report":{"title":"Extended report for your doctor","text":"An extended report with weather, atmospheric pressure, physical activity and possible patterns."}},"periods":{"d90":"90 days","d180":"6 months","d365":"12 months"},"plans":{"yearly":{"name":"Yearly","per":"per year","hint":"Works out at {monthly} a month, {trial} free","hintNoTrial":"Works out at {monthly} a month","badge":"Save {percent}%","cta":"Try {trial} free","ctaNoTrial":"Subscribe for {price} a year","terms":"{trial} free, then {price} a year. The subscription renews automatically. Cancel it in {store} before the trial ends and you pay nothing.","termsNoTrial":"{price} a year. The subscription renews automatically until you cancel it in {store}."},"monthly":{"name":"Monthly","per":"per month","hint":"{trial} free, cancel any time","hintNoTrial":"Cancel any time","cta":"Try {trial} free","ctaNoTrial":"Subscribe for {price} a month","terms":"{trial} free, then {price} a month. The subscription renews automatically. Cancel it in {store} before the trial ends and you pay nothing.","termsNoTrial":"{price} a month. The subscription renews automatically until you cancel it in {store}."}},"paywall":{"title":"More data alongside your entries","lead":"Vestie+ adds weather and air-pressure recording, alerts about weather changes and a comparison that shows possible patterns in your entries. The basic diary stays free.","choosePlan":"Choose your subscription","renewal":"Prices include VAT. {store} handles the payment. You can cancel the subscription at any time in {store} settings. Cancellation takes effect at the end of the paid period or the free trial, and you keep Vestie+ until then.","withdrawal":"You can withdraw from the contract without giving a reason within 14 days of the start of the subscription, even if it starts with a free trial, and we will refund the full amount. You can withdraw from the app (Vestie+ → Withdraw from the contract here) with a form on our website. Details are in the terms of use.","acceptTerms":"By continuing, you accept the {terms}.","acceptTermsLink":"terms of use","loadingPrices":"Loading prices…","pricesFailed":"Prices could not be loaded. Check your internet connection and try again.","retryPrices":"Try again","restored":"You already have a subscription. Vestie+ is on again.","freeTitle":"The basic diary stays free","freeText":"Symptom and episode entries, calendar, insights, medications, sleep and the doctor's report. When a subscription ends, your entries stay yours.","demoNote":"Nothing is charged in this preview.","restore":"Restore purchase","redeem":"I have a promo code","disclaimer":"Vestie+ is not a medical device. It does not provide a diagnosis or treatment and does not replace seeing a doctor.","notNow":"Not now","nativeOnly":"Purchases will be available in the mobile app.","nothingToRestore":"We found no purchase to restore.","purchaseFailed":"The purchase did not go through. Please try again later.","purchasePending":"The payment is still processing. Vestie+ turns on once the store confirms it.","provider":"Provider: IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, Slovakia, company ID 47321547, support@vestibularnamigrena.sk."},"redeem":{"title":"Promo code","single":"Enter a single-use code in {store}: tap the button below, enter the code and confirm. When you come back to the app, Vestie+ turns on by itself.","promo":"Enter a promotion code, for example from the community, when you subscribe: choose a plan, continue to the purchase, and in the {store} window tap the payment method and then Redeem code.","trial":"Even with a code, it is a free trial after which the subscription renews and is charged. {store} shows you its length before you confirm.","open":"Open {store}","preview":"Codes cannot be redeemed in this preview. In the app, {store} opens."},"manage":{"title":"Your Vestie+","lead":"Everything in one place. You can turn any feature on or off at any time.","welcomeTitle":"Welcome to Vestie+","welcomeLead":"Turn on weather and pressure first. You will find the other features in the list.","features":"Features","subscription":"Subscription","trialUntil":"Free trial until {date}","since":"Active since {date}","cancel":"Cancel subscription","cancelHint":"Your entries stay on your phone.","cancelTitle":"Cancel Vestie+?","cancelText":"Vestie+ features will be locked. All your entries, including recorded weather and pressure, stay with you.","cancelConfirm":"Cancel subscription","cancelled":"Vestie+ is cancelled","toToday":"Continue to Home","enableWeather":"Turn on weather and pressure","manageStore":"Manage in Google Play","manageStoreHint":"Change or cancel your subscription here. Your records stay on your phone."},"withdraw":{"row":"Withdraw from the contract here","rowHint":"No reason needed until {date}. We refund the full amount.","rowHintTrial":"No reason needed until {date}. During the trial you pay nothing.","title":"Withdrawal from the contract","lead":"You can withdraw from the Vestie+ subscription contract without giving a reason until {date}. You send the withdrawal with a form on our website, which opens in your browser.","leadLate":"The 14-day period for withdrawing without giving a reason has passed. If you believe you are entitled to withdraw for another reason, you can use the form or write to us.","note":"The app sends and stores nothing in the process. You can also withdraw by emailing {address} or with the model form in the terms of use. The form is also at vestibularnamigrena.sk/vestie/odstupenie, in case you no longer have the app.","demoNote":"In this preview the form does not open and nothing is sent.","stepForm":"In the form, enter your name and email. We fill in the order number for you if the app knows it.","stepConfirm":"Confirm with the “Confirm withdrawal from the contract” button. Your notice is sent immediately and you receive a confirmation with the date and time by email.","stepAfter":"We refund the full amount through Google Play within 14 days and Vestie+ is switched off. Your entries stay on your phone.","stepAfterTrial":"You are in the free trial, so we cancel the subscription and you pay nothing. Vestie+ is then switched off and your entries stay on your phone.","openForm":"Continue to the form","openFailed":"The form could not be opened. Write to us at {address}."},"confirmation":{"row":"Subscription confirmation","rowHint":"Main terms and withdrawal period","title":"Subscription confirmation","lead":"The main terms of your Vestie+ contract. The app stored this confirmation as it read on the day it was created and no longer changes it. Also save it to a file, so you still have it if you uninstall the app.","plan":"Subscription","price":"Price","priceUnknown":"As in your {store} receipt","started":"Start","trialEnd":"Free trial until","order":"Order number","withdrawUntil":"Withdrawal possible until","providerTitle":"Provider","providerText":"IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, Slovakia, company ID 47321547, tax ID 2023812813, VAT ID SK2023812813 (registered under Section 7a of the Slovak VAT Act, not a VAT payer), registered in the Commercial Register of the Municipal Court Bratislava III, section Sro, file no. 90506/B. Contact: {email}, phone +421 902 811 486.","renewalTitle":"Renewal and cancellation","renewalText":"Prices include VAT. The subscription renews and is charged automatically at the end of each period until you cancel it. If it starts with a free trial, the first payment is taken only after the trial ends, and if you cancel earlier, you pay nothing. You can cancel at any time in the subscription settings in {store} (Vestie+ → {manage}). You then keep Vestie+ until the end of the paid period or the free trial.","withdrawalTitle":"Withdrawal from the contract","withdrawalText":"You may withdraw from the contract without giving a reason until {date}, that is, within 14 days of the start of the subscription, including the free trial. You can withdraw with the form at vestibularnamigrena.sk/vestie/odstupenie (from the app under Vestie+ → {row}), by emailing {email}, or with the model form below. If you withdraw during the free trial, we will cancel the subscription and you will pay nothing. If a payment has already been made, we will refund the full amount through {store} no later than 14 days after we receive your notice. We do not deduct anything for the days you used Vestie+.","termsText":"The contract is governed by the terms of use, version {version}. Their full text as of the day the confirmation was created is part of the saved confirmation.","termsOpen":"Open the terms of use","save":"Save confirmation","saved":"Confirmation saved","saveFailed":"The confirmation could not be saved. Please try again.","fileName":"plus-confirmation","created":"Created {time}","demoNote":"In this preview, the subscription is only a demo and nothing is charged.","snapshotNote":"Text stored {time}"},"charts":{"legend":"Chart legend","showTable":"Show as a table"},"weather":{"hpa":"{value} hPa","temps":"{min} to {max} °C","changeShort":"{value} from the day before","conditions":{"clear":"Clear","partly":"Partly cloudy","cloudy":"Cloudy","fog":"Fog","rain":"Rain","snow":"Snow","storm":"Storm"},"offLead":"The app will record the weather and atmospheric pressure every day so you have them alongside your entries and can compare them.","factRecord":"From the moment you turn this on, pressure, temperature, humidity and weather are recorded for each day. Recorded days stay on your phone. Days before that are not filled in.","factLocation":"Each update sends OpenWeather Ltd. (United Kingdom) only your location, rounded to about 10 km. Technically it also sees your IP address.","factHealth":"None of your entries are ever sent.","factOff":"You can turn this off at any time.","enable":"Allow location and turn on","today":"Today","condition":"Weather","temperature":"Temperature","humidity":"Humidity","humidityValue":"Humidity {value}%","forecastWord":"forecast","estimateWord":"estimate","episodeWord":"episode","chartTitle":"Pressure over time","rangeDays":"{n} days","chartLabel":"Chart of barometric pressure over the last {n} days and the forecast for the coming days. Dots mark days with an episode.","legendPressure":"Pressure","legendForecast":"Forecast","legendEpisode":"Day with an episode","colDay":"Day","colPressure":"Pressure","colChange":"Change","colEpisode":"Episode","forecastTitle":"Forecast for the coming days","linkTitle":"Pressure and your entries","linkText":"In the pattern finder you can compare pressure with your own entries.","openFinder":"Open pattern finder","myLocation":"For your location","noData":"There is no weather data for today yet.","settings":"Settings","updateLocation":"Update now","turnOff":"Turn off weather and pressure","turnOffHint":"Recorded days will stay.","turnOffTitle":"Turn off weather and pressure?","turnOffText":"The app will stop checking the weather and forget your location. Days already recorded will stay.","attribution":"Weather data provided by OpenWeather","disclaimer":"Data comes from weather models for your approximate location and forecasts can differ from reality. Days when you didn't open the app are an estimate from the latest forecast. A link with weather is not proof of a cause.","loading":"Checking the weather…","enabled":"Weather and pressure are on","errors":{"denied":"This won't work without location access. Allow it in your phone or browser settings.","unavailable":"We couldn't find your location. Please try again.","network":"We couldn't load the weather. Check your internet connection.","setup":"Weather isn't set up in this version yet. Please try again later."},"episodeDay":"Weather and activity that day","updated":"Updated {time}. Data refreshes by itself.","stale":"No connection. The latest data is from {time}.","bands":{"low":"Low pressure","normal":"Normal pressure","high":"Higher pressure","veryHigh":"Very high pressure"},"bandRanges":{"low":"below 1000 hPa","normal":"1000 to 1020 hPa","high":"1021 to 1029 hPa","veryHigh":"1030 hPa and above"},"bandTitle":"What the pressure values mean","bandNow":"now","bandNote":"The values are a rough guide. Pressure is converted to sea level, the same as in weather forecasts, so it can be compared at higher altitudes too. Besides the value itself, the app shows the change from the previous day, and the pattern finder compares days when pressure changed by 6 hPa or more."},"health":{"connected":"Connected","notConnected":"Not connected","stepsValue":"{value} steps","lead":"Sleep, steps and workouts can be read directly from your phone through Health Connect. Watches such as Garmin, Samsung or Fitbit write there too.","leadIos":"Sleep, steps and workouts can be read directly from your phone through Apple Health. Watches such as Apple Watch or Garmin write there too.","providers":{"apple_health":"Apple Health","health_connect":"Health Connect"},"typesTitle":"What to read","types":{"sleep":"Sleep","steps":"Steps","workouts":"Workouts"},"privacy":"Data is only read onto this phone and is not sent anywhere. Sleep you entered by hand is not overwritten.","lastSync":"Last read {time}","stepsToday":"Steps today","sleepToday":"Sleep last night","stepsWeek":"Steps over the last 7 days","sleepWeek":"Sleep over the last 7 nights (hours)","noValue":"no entry","disconnect":"Disconnect","disconnectTitle":"Disconnect the health app?","disconnectText":"The app will stop reading new data. What has already been read stays in your entries.","revokeHint":{"health_connect":"You can revoke read access in the Health Connect settings.","apple_health":"You can revoke read access in the Health app under Sharing."},"disconnectedToast":"Disconnected","openSettings":"Settings","connectedToast":"Connected","connectTo":{"apple_health":"Connect to Apple Health","health_connect":"Connect to Health Connect"},"browserOnly":"A web browser cannot access this data. The connection only works in the mobile app, where data is read automatically once you allow it. So this preview shows nothing here rather than made-up numbers.","errors":{"denied":"Data can't be read without permission. Allow it in your phone settings.","unavailable":"The health app isn't available on this phone. On Android, install Health Connect."},"typesHint":"For workouts, only the type and duration are read, for example cycling, hockey or strength training. Walking counts in steps.","workouts":{"cycling":"Cycling","running":"Running","walking":"Walking","hiking":"Hiking","swimming":"Swimming","strength":"Strength training","hockey":"Hockey","soccer":"Football","basketball":"Basketball","volleyball":"Volleyball","teamSport":"Team sport","tennis":"Tennis","racket":"Racket sport","yoga":"Yoga and stretching","dance":"Dance","skiing":"Skiing","skating":"Skating","climbing":"Climbing","rowing":"Rowing","cardio":"Cardio","combat":"Combat sports","other":"Other activity"},"workoutsWeek":"Workouts in the last 7 days","workoutsNone":"No workouts in the last 7 days."},"finder":{"ofDays":"{a} of {b}","percent":"{n}%","factors":{"pressure_drop":"Day with a pressure drop of 6 hPa or more","pressure_rise":"Day with a pressure rise of 6 hPa or more","humid":"Day with high humidity (85% or more)","temp_swing":"Day with a temperature change of 8 °C or more","short_sleep":"Night shorter than 6 hours","poor_sleep":"Night with poor sleep quality","high_steps":"Day with 12,000 steps or more","low_steps":"Day with fewer than 3,000 steps","period":"Days around your period","workout":"Day with a workout of 30 min or more"},"strength":{"strong":"Clearer difference","possible":"Possible pattern","none":"No clear difference","few":"Not enough data"},"fewFactor":"This has happened {n} times so far, which is too few to compare.","after":"Harder day that day or the next","otherDays":"On other days","lead":"The app compares how often a harder day falls on the same or the next day after a factor appeared, and how often otherwise. A harder day is a day with an episode or a symptom of intensity {intensity} or more.","summary":"In this period that's {hard} out of {days} in total.","notEnough":"So far you have {days} and {hard} recorded. Comparing needs at least 30 days and 5 harder days.","moreTitle":"What else to compare","more":{"weather":"Turn them on and we'll also compare pressure, humidity and temperature.","health":"Connect it and we'll also compare steps."},"loggedTitle":"What you marked during episodes","loggedLead":"You only record these possible triggers during episodes, so they can't be compared with days without symptoms. We only show how many times you marked them.","howTitle":"How we calculate this","howText":"We look for a harder day on the same day and the next day (for steps, only the next day). A day without entries counts as a day without symptoms; missing sleep or pressure is not filled in. We only flag a difference when it is large enough and there are enough days to compare. It can still be due to chance, especially when labelled “Possible pattern”.","disclaimer":"A possible pattern is not proof of a cause. Results can change as you add entries. If you want to change anything about your treatment, talk to your doctor.","toForecast":"Turn on weather alerts","toForecastNote":"The alerts only report the weather forecast. They say nothing about how you will feel.","moreRecords":"The more days you record, the more days there are to compare. Treat the results as a rough guide, especially while you have only a few entries."},"forecast":{"today":"Today","tomorrow":"Tomorrow","signals":{"pressure_drop":"A pressure drop of {amount} hPa is forecast.","pressure_rise":"A pressure rise of {amount} hPa is forecast.","humid":"High humidity is forecast ({amount}%).","temp_swing":"A temperature change of {amount} °C is forecast."},"levels":{"change":"Notable change forecast","calm":"No major changes"},"cardTitle":"Weather change · {day}","factWeather":"Follow the forecast of atmospheric pressure, humidity and temperature for the coming days.","factRecords":"Choose which changes the app should alert you about. Pressure drop is preselected and you can change the selection at any time.","factNotify":"You get the alert in the evening before the day the chosen change is forecast for.","factOff":"You can turn the alerts off at any time if they do not suit you.","offLead":"The app alerts you in advance about notable weather changes expected the next day. You choose which changes you want to be alerted about.","disclaimer":"The alerts only report the weather forecast from meteorological models for your approximate location, and reality may differ. They say nothing about how you will feel and are not health advice. Don't change medication or treatment because of them.","enable":"Turn on weather alerts","calmText":"None of the changes we follow are forecast.","lead":"Notable weather changes for today and the next three days.","weatherOff":"Turn on weather and pressure","weatherOffHint":"Alerts need the weather forecast.","notifyTitle":"Notifications","notify":"Alert me ahead of time","notifyHint":"The evening before a day with a chosen change. Based on the forecast from when you last opened the app.","notifyTime":"When to alert me","previewLabel":"This is how the notification will look on your phone:","disable":"Turn off weather alerts","staleForecast":"The forecast is more than a day old, so we're not alerting from it right now. Check your internet connection.","nothingToNotify":"The current forecast gives nothing to alert you about right now.","alertsTitle":"What to alert me about","alerts":{"pressure_drop":"Pressure drop","pressure_rise":"Pressure rise","humid":"High humidity","temp_swing":"Sharp temperature change"},"alertsNone":"Choose at least one change, otherwise the app won't alert you about anything."},"stats":{"empty":"Statistics are built from your entries. Once you have recorded symptoms or episodes, you'll see them here.","noCompare":"no comparison","same":"same as before","less":"{value} less","more":"{value} more","compareTitle":"Compared with the previous period","compareLead":"The last {days} compared with the same length of time before.","symptomDaysValue":"days with symptoms: {n}","trendTitle":"Days with symptoms by month","trendLabel":"Column chart of the number of days with symptoms over the last 12 months.","colMonth":"Month","rhythmTitle":"When episodes start","rhythmLead":"{n} in total, by day of the week and part of the day.","parts":{"morning":"Morn.","afternoon":"Aft.","evening":"Eve.","night":"Night"},"cycleStart":"First day of your period","cycleOffset":"Day {n} from the start","cycleTitle":"Episodes around your period","cycleLead":"From {n} recorded periods. The app does not predict your next period.","colCycleDay":"Day","reliefTitle":"What you most often recorded as relief","impactTitle":"What episodes limited most often","medTitle":"Medication use by month","medLead":"How many times you logged each medication in each month of the chosen period.","medSince":"Taking since {date}","medDisclaimer":"This is only an overview of your records, not an assessment of the medication. Make treatment decisions with your doctor.","medTotal":"{count} in total, last on {date}","colCount":"Count"},"demoSymptoms":"In this sample the symptoms and episodes are made up, while the weather is real. Whether a possible link with pressure shows up will only be seen from your own entries."}`),failure:{title:`This screen couldn't be shown`,text:`Your entries are still saved. Try again. If that doesn't help, create a backup or restore your data from a backup.`,retry:`Try again`,backup:`Backup and restore`,home:`Go to Home`},notifications:{channelReminders:`Daily reminder`,channelForecast:`Weather changes`,reminderBody:`How are you today? Note down how you feel.`,denied:`Your phone did not allow notifications. You can turn them on in the phone settings.`},about:{title:`About`,row:`About and licences`,appVersion:`Version {version}`,publisherTitle:`Who publishes the app`,publisherText:`Vestie is published by IronPhysique s. r. o., Rovniankova 1691/24, 851 02 Bratislava, Slovakia, company ID 47321547, tax ID 2023812813, VAT ID SK2023812813 (registered under Section 7a of the Slovak VAT Act, not a VAT payer), registered in the Commercial Register of the Municipal Court Bratislava III, section Sro, file no. 90506/B.
Support and questions about personal data: support@vestibularnamigrena.sk, phone +421 902 811 486.`,medicalTitle:`The app is not a medical device`,medicalText:`Vestie is a personal diary. It does not diagnose, treat, cure or prevent any disease, does not recommend medications or dosages and does not replace a doctor. If you have sudden, severe or unusual symptoms, seek medical help or call 155 or 112.`,weatherTitle:`Weather data`,weatherText:`Weather and air pressure in Vestie+ are provided by OpenWeather (openweathermap.org).`,licensesTitle:`Open-source licences`,licensesText:`Vestie uses these libraries and fonts. Thank you to their authors.
DM Sans and DM Serif Display – © The DM Sans Project Authors, © Google Inc., SIL Open Font License 1.1 (openfontlicense.org)
Lucide – © Lucide Contributors, ISC licence (lucide.dev/license)
Capacitor and its plugins – © Ionic Team, MIT licence (github.com/ionic-team/capacitor)
Capacitor Health and Native Purchases – © Capgo, Martin Donadieu, MPL 2.0 licence, source code at github.com/Cap-go
GSAP – © GreenSock, standard no-charge licence (gsap.com/standard-license)
fontsource – © Fontsource Authors, MIT licence
The full licence texts are at the addresses given.`}}},Hr=[`sk`,`cs`,`en`],Ur={sk:`sk-SK`,cs:`cs-CZ`,en:`en-GB`},Wr=`sk`;function Gr(e){Wr=Vr[e]?e:`sk`,document.documentElement.lang=Wr}var Kr=()=>Wr,qr=()=>Ur[Wr];function Jr(e,t){return t.split(`.`).reduce((e,t)=>e?.[t],e)}function Yr(e,t){return t?e.replace(/\{(\w+)\}/g,(e,n)=>t[n]??``):e}function Xr(e,t,n){let r=Jr(Vr[e],t)??Jr(Vr.sk,t);return typeof r==`string`?Yr(r,n):(console.warn(`[i18n] Chýba preklad: ${t}`),t)}var I=(e,t)=>Xr(Wr,e,t);function L(e,t){let n=new Intl.PluralRules(qr()).select(t),r=Jr(Vr[Wr],e)??{};return Yr(r[n]??r.other??e,{n:t})}function Zr(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function Qr(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var $r={autoSleep:120,force3D:`auto`,nullTargetWarn:1,units:{lineHeight:``}},ei={duration:.5,overwrite:!1,delay:0},ti,ni,R,ri=1e8,z=1/ri,ii=Math.PI*2,ai=ii/4,oi=0,si=Math.sqrt,ci=Math.cos,li=Math.sin,ui=function(e){return typeof e==`string`},B=function(e){return typeof e==`function`},di=function(e){return typeof e==`number`},fi=function(e){return e===void 0},pi=function(e){return typeof e==`object`},mi=function(e){return e!==!1},hi=function(){return typeof window<`u`},gi=function(e){return B(e)||ui(e)},_i=typeof ArrayBuffer==`function`&&ArrayBuffer.isView||function(){},vi=Array.isArray,yi=/random\([^)]+\)/g,bi=/,\s*/g,xi=/(?:-?\.?\d|\.)+/gi,Si=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ci=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,wi=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Ti=/[+-]=-?[.\d]+/,Ei=/[^,'"\[\]\s]+/gi,Di=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,V,Oi,ki,Ai,ji={},Mi={},Ni,Pi=function(e){return(Mi=da(e,ji))&&ks},Fi=function(e,t){return console.warn(`Invalid property`,e,`set to`,t,`Missing plugin? gsap.registerPlugin()`)},Ii=function(e,t){return!t&&console.warn(e)},Li=function(e,t){return e&&(ji[e]=t)&&Mi&&(Mi[e]=t)||ji},Ri=function(){return 0},zi={suppressEvents:!0,isStart:!0,kill:!1},Bi={suppressEvents:!0,kill:!1},Vi={suppressEvents:!0},Hi={},Ui=[],Wi={},Gi,Ki={},qi={},Ji=30,Yi=[],Xi=``,Zi=function(e){var t=e[0],n,r;if(pi(t)||B(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=Yi.length;r--&&!Yi[r].targetTest(t););n=Yi[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new zo(e[r],n)))||e.splice(r,1);return e},Qi=function(e){return e._gsap||Zi(Ja(e))[0]._gsap},$i=function(e,t,n){return(n=e[t])&&B(n)?e[t]():fi(n)&&e.getAttribute&&e.getAttribute(t)||n},ea=function(e,t){return(e=e.split(`,`)).forEach(t)||e},ta=function(e){return Math.round(e*1e5)/1e5||0},H=function(e){return Math.round(e*1e7)/1e7||0},na=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n===`+`?e+r:n===`-`?e-r:n===`*`?e*r:e/r},ra=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},ia=function(){var e=Ui.length,t=Ui.slice(0),n,r;for(Wi={},Ui.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},aa=function(e){return!!(e._initted||e._startAt||e.add)},oa=function(e,t,n,r){Ui.length&&!ni&&ia(),e.render(t,n,r||!!(ni&&t<0&&aa(e))),Ui.length&&!ni&&ia()},sa=function(e){var t=parseFloat(e);return(t||t===0)&&(e+``).match(Ei).length<2?t:ui(e)?e.trim():e},ca=function(e){return e},la=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},ua=function(e){return function(t,n){for(var r in n)r in t||r===`duration`&&e||r===`ease`||(t[r]=n[r])}},da=function(e,t){for(var n in t)e[n]=t[n];return e},fa=function e(t,n){for(var r in n)r!==`__proto__`&&r!==`constructor`&&r!==`prototype`&&(t[r]=pi(n[r])?e(t[r]||(t[r]={}),n[r]):n[r]);return t},pa=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},ma=function(e){var t=e.parent||V,n=e.keyframes?ua(vi(e.keyframes)):la;if(mi(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},ha=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},ga=function(e,t,n,r,i){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var a=e[r],o;if(i)for(o=t[i];a&&a[i]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},_a=function(e,t,n,r){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var i=t._prev,a=t._next;i?i._next=a:e[n]===t&&(e[n]=a),a?a._prev=i:e[r]===t&&(e[r]=i),t._next=t._prev=t.parent=null},va=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},ya=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},ba=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},xa=function(e,t,n,r){return e._startAt&&(ni?e._startAt.revert(Bi):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},Sa=function e(t){return!t||t._ts&&e(t.parent)},Ca=function(e){return e._repeat?wa(e._tTime,e=e.duration()+e._rDelay)*e:0},wa=function(e,t){var n=Math.floor(e=H(e/t));return e&&n===e?n-1:n},Ta=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Ea=function(e){return e._end=H(e._start+(e._tDur/Math.abs(e._ts||e._rts||z)||0))},Da=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=H(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Ea(e),n._dirty||ya(n,e)),e},Oa=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Ta(e.rawTime(),t),(!t._dur||Ha(0,t.totalDuration(),n)-t._tTime>z)&&t.render(n,!0)),ya(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-z}},ka=function(e,t,n,r){return t.parent&&va(t),t._start=H((di(n)?n:n||e!==V?za(e,n,t):e._time)+t._delay),t._end=H(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),ga(e,t,`_first`,`_last`,e._sort?`_start`:0),Na(t)||(e._recent=t),r||Oa(e,t),e._ts<0&&Da(e,e._tTime),e},Aa=function(e,t){return(ji.ScrollTrigger||Fi(`scrollTrigger`,t))&&ji.ScrollTrigger.create(t,e)},ja=function(e,t,n,r,i){if(Jo(e,t,i),!e._initted)return 1;if(!n&&e._pt&&!ni&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Gi!==Eo.frame)return Ui.push(e),e._lazy=[i,r],1},Ma=function e(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||e(n))},Na=function(e){var t=e.data;return t===`isFromStart`||t===`isStart`},Pa=function(e,t,n,r){var i=e.ratio,a=t<0||!t&&(!e._start&&Ma(e)&&(e._initted||!Na(e))||(e._ts<0||e._dp._ts<0)&&!Na(e))?0:1,o=e._rDelay,s=0,c,l,u;if(o&&e._repeat&&(s=Ha(0,e._tDur,t),l=wa(s,o),e._yoyo&&l&1&&(a=1-a),l!==wa(e._tTime,o)&&(i=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==i||ni||r||e._zTime===z||!t&&e._zTime){if(!e._initted&&ja(e,t,r,n,s))return;for(u=e._zTime,e._zTime=t||(n?z:0),n||=t&&!u,e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=s,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&xa(e,t,n,!0),e._onUpdate&&!n&&fo(e,`onUpdate`),s&&e._repeat&&!n&&e.parent&&fo(e,`onRepeat`),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&va(e,1),!n&&!ni&&(fo(e,a?`onComplete`:`onReverseComplete`,!0),e._prom&&e._prom()))}else e._zTime||=t},Fa=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data===`isPause`&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data===`isPause`&&r._start<t)return r;r=r._prev}},Ia=function(e,t,n,r){var i=e._repeat,a=H(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=i?i<0?1e10:H(a*(i+1)+e._rDelay*i):a,o>0&&!r&&Da(e,e._tTime=e._tDur*o),e.parent&&Ea(e),n||ya(e.parent,e),e},La=function(e){return e instanceof Vo?ya(e):Ia(e,e._dur)},Ra={_start:0,endTime:Ri,totalDuration:Ri},za=function e(t,n,r){var i=t.labels,a=t._recent||Ra,o=t.duration()>=ri?a.endTime(!1):t._dur,s,c,l;return ui(n)&&(isNaN(n)||n in i)?(c=n.charAt(0),l=n.substr(-1)===`%`,s=n.indexOf(`=`),c===`<`||c===`>`?(s>=0&&(n=n.replace(/=/,``)),(c===`<`?a._start:a.endTime(a._repeat>=0))+(parseFloat(n.substr(1))||0)*(l?(s<0?a:r).totalDuration()/100:1)):s<0?(n in i||(i[n]=o),i[n]):(c=parseFloat(n.charAt(s-1)+n.substr(s+1)),l&&r&&(c=c/100*(vi(r)?r[0]:r).totalDuration()),s>1?e(t,n.substr(0,s-1),r)+c:o+c)):n==null?o:+n},Ba=function(e,t,n){var r=di(t[1]),i=(r?2:1)+(e<2?0:1),a=t[i],o,s;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,s=n;s&&!(`immediateRender`in o);)o=s.vars.defaults||{},s=mi(s.vars.inherit)&&s.parent;a.immediateRender=mi(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[i-1]}return new ts(t[0],a,t[i+1])},Va=function(e,t){return e||e===0?t(e):t},Ha=function(e,t,n){return n<e?e:n>t?t:n},Ua=function(e,t){return!ui(e)||!(t=Di.exec(e))?``:t[1]},Wa=function(e,t,n){return Va(n,function(n){return Ha(e,t,n)})},Ga=[].slice,Ka=function(e,t){return e&&pi(e)&&`length`in e&&(!t&&!e.length||e.length-1 in e&&pi(e[0]))&&!e.nodeType&&e!==Oi},qa=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(e){var r;return ui(e)&&!t||Ka(e,1)?(r=n).push.apply(r,Ja(e)):n.push(e)})||n},Ja=function(e,t,n){return R&&!t&&R.selector?R.selector(e):ui(e)&&!n&&(ki||!Do())?Ga.call((t||Ai).querySelectorAll(e),0):vi(e)?qa(e,n):Ka(e)?Ga.call(e,0):e?[e]:[]},Ya=function(e){return e=Ja(e)[0]||Ii(`Invalid scope`)||{},function(t){var n=e.current||e.nativeElement||e;return Ja(t,n.querySelectorAll?n:n===e?Ii(`Invalid scope`)||Ai.createElement(`div`):e)}},Xa=function(e){return e.sort(function(){return .5-Math.random()})},Za=function(e){if(B(e))return e;var t=pi(e)?e:{each:e},n=Po(t.ease),r=t.from||0,i=parseFloat(t.base)||0,a={},o=r>0&&r<1,s=isNaN(r)||o,c=t.axis,l=r,u=r;return ui(r)?l=u={center:.5,edges:.5,end:1}[r]||0:!o&&s&&(l=r[0],u=r[1]),function(e,o,d){var f=(d||t).length,p=a[f],m,h,g,_,v,y,b,x,S;if(!p){if(S=t.grid===`auto`?0:(t.grid||[1,ri])[1],!S){for(b=-ri;b<(b=d[S++].getBoundingClientRect().left)&&S<f;);S<f&&S--}for(p=a[f]=[],m=s?Math.min(S,f)*l-.5:r%S,h=S===ri?0:s?f*u/S-.5:r/S|0,b=0,x=ri,y=0;y<f;y++)g=y%S-m,_=h-(y/S|0),p[y]=v=c?Math.abs(c===`y`?_:g):si(g*g+_*_),v>b&&(b=v),v<x&&(x=v);r===`random`&&Xa(p),p.max=b-x,p.min=x,p.v=f=(parseFloat(t.amount)||parseFloat(t.each)*(S>f?f-1:c?c===`y`?f/S:S:Math.max(S,f/S))||0)*(r===`edges`?-1:1),p.b=f<0?i-f:i,p.u=Ua(t.amount||t.each)||0,n=n&&f<0?No(n):n}return f=(p[e]-p.min)/p.max||0,H(p.b+(n?n(f):f)*p.v)+p.u}},Qa=function(e){var t=10**((e+``).split(`.`)[1]||``).length;return function(n){var r=H(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(di(n)?0:Ua(n))}},$a=function(e,t){var n=vi(e),r,i;return!n&&pi(e)&&(r=n=e.radius||ri,e.values?(e=Ja(e.values),(i=!di(e[0]))&&(r*=r)):e=Qa(e.increment)),Va(t,n?B(e)?function(t){return i=e(t),Math.abs(i-t)<=r?i:t}:function(t){for(var n=parseFloat(i?t.x:t),a=parseFloat(i?t.y:0),o=ri,s=0,c=e.length,l,u;c--;)i?(l=e[c].x-n,u=e[c].y-a,l=l*l+u*u):l=Math.abs(e[c]-n),l<o&&(o=l,s=c);return s=!r||o<=r?e[s]:t,i||s===t||di(t)?s:s+Ua(t)}:Qa(e))},eo=function(e,t,n,r){return Va(vi(e)?!t:n===!0?!!(n=0):!r,function(){return vi(e)?e[~~(Math.random()*e.length)]:(n||=1e-5)&&(r=n<1?10**((n+``).length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},to=function(){var e=[...arguments];return function(t){return e.reduce(function(e,t){return t(e)},t)}},no=function(e,t){return function(n){return e(parseFloat(n))+(t||Ua(n))}},ro=function(e,t,n){return co(e,t,0,1,n)},io=function(e,t,n){return Va(n,function(n){return e[~~t(n)]})},ao=function e(t,n,r){var i=n-t;return vi(t)?io(t,e(0,t.length),n):Va(r,function(e){return(i+(e-t)%i)%i+t})},oo=function e(t,n,r){var i=n-t,a=i*2;return vi(t)?io(t,e(0,t.length-1),n):Va(r,function(e){return e=(a+(e-t)%a)%a||0,t+(e>i?a-e:e)})},so=function(e){return e.replace(yi,function(e){var t=e.indexOf(`[`)+1,n=e.substring(t||7,t?e.indexOf(`]`):e.length-1).split(bi);return eo(t?n:+n[0],t?0:+n[1],+n[2]||1e-5)})},co=function(e,t,n,r,i){var a=t-e,o=r-n;return Va(i,function(t){return n+((t-e)/a*o||0)})},lo=function e(t,n,r,i){var a=isNaN(t+n)?0:function(e){return(1-e)*t+e*n};if(!a){var o=ui(t),s={},c,l,u,d,f;if(r===!0&&(i=1)&&(r=null),o)t={p:t},n={p:n};else if(vi(t)&&!vi(n)){for(u=[],d=t.length,f=d-2,l=1;l<d;l++)u.push(e(t[l-1],t[l]));d--,a=function(e){e*=d;var t=Math.min(f,~~e);return u[t](e-t)},r=n}else i||(t=da(vi(t)?[]:{},t));if(!u){for(c in n)Uo.call(s,t,c,`get`,n[c]);a=function(e){return us(e,s)||(o?t.p:t)}}}return Va(r,a)},uo=function(e,t,n){var r=e.labels,i=ri,a,o,s;for(a in r)o=r[a]-t,o<0==!!n&&o&&i>(o=Math.abs(o))&&(s=a,i=o);return s},fo=function(e,t,n){var r=e.vars,i=r[t],a=R,o=e._ctx,s,c,l;if(i)return s=r[t+`Params`],c=r.callbackScope||e,n&&Ui.length&&ia(),o&&(R=o),l=s?i.apply(c,s):i.call(c),R=a,l},po=function(e){return va(e),e.scrollTrigger&&e.scrollTrigger.kill(!!ni),e.progress()<1&&fo(e,`onInterrupt`),e},mo,ho=[],go=function(e){if(e){if(e=!e.name&&e.default||e,hi()||e.headless){var t=e.name,n=B(e),r=t&&!n&&e.init?function(){this._props=[]}:e,i={init:Ri,render:us,add:Uo,kill:fs,modifier:ds,rawVars:0},a={targetTest:0,get:0,getSetter:os,aliases:{},register:0};if(Do(),e!==r){if(Ki[t])return;la(r,la(pa(e,i),a)),da(r.prototype,da(i,pa(e,a))),Ki[r.prop=t]=r,e.targetTest&&(Yi.push(r),Hi[t]=1),t=(t===`css`?`CSS`:t.charAt(0).toUpperCase()+t.substr(1))+`Plugin`}Li(t,r),e.register&&e.register(ks,r,hs)}else ho.push(e)}},U=255,_o={aqua:[0,U,U],lime:[0,U,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,U],navy:[0,0,128],white:[U,U,U],olive:[128,128,0],yellow:[U,U,0],orange:[U,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[U,0,0],pink:[U,192,203],cyan:[0,U,U],transparent:[U,U,U,0]},vo=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*U+.5|0},yo=function(e,t,n){var r=e?di(e)?[e>>16,e>>8&U,e&U]:0:_o.black,i,a,o,s,c,l,u,d,f,p;if(!r){if(e.substr(-1)===`,`&&(e=e.substr(0,e.length-1)),_o[e])r=_o[e];else if(e.charAt(0)===`#`){if(e.length<6&&(i=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e=`#`+i+i+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):``)),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&U,r&U,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&U,e&U]}else if(e.substr(0,3)===`hsl`){if(r=p=e.match(xi),!t)s=r[0]%360/360,c=r[1]/100,l=r[2]/100,a=l<=.5?l*(c+1):l+c-l*c,i=l*2-a,r.length>3&&(r[3]*=1),r[0]=vo(s+1/3,i,a),r[1]=vo(s,i,a),r[2]=vo(s-1/3,i,a);else if(~e.indexOf(`=`))return r=e.match(Si),n&&r.length<4&&(r[3]=1),r}else r=e.match(xi)||_o.transparent;r=r.map(Number)}return t&&!p&&(i=r[0]/U,a=r[1]/U,o=r[2]/U,u=Math.max(i,a,o),d=Math.min(i,a,o),l=(u+d)/2,u===d?s=c=0:(f=u-d,c=l>.5?f/(2-u-d):f/(u+d),s=u===i?(a-o)/f+(a<o?6:0):u===a?(o-i)/f+2:(i-a)/f+4,s*=60),r[0]=~~(s+.5),r[1]=~~(c*100+.5),r[2]=~~(l*100+.5)),n&&r.length<4&&(r[3]=1),r},bo=function(e){var t=[],n=[],r=-1;return e.split(So).forEach(function(e){var i=e.match(Ci)||[];t.push.apply(t,i),n.push(r+=i.length+1)}),t.c=n,t},xo=function(e,t,n){var r=``,i=(e+r).match(So),a=t?`hsla(`:`rgba(`,o=0,s,c,l,u;if(!i)return e;if(i=i.map(function(e){return(e=yo(e,t,1))&&a+(t?e[0]+`,`+e[1]+`%,`+e[2]+`%,`+e[3]:e.join(`,`))+`)`}),n&&(l=bo(e),s=n.c,s.join(r)!==l.c.join(r)))for(c=e.replace(So,`1`).split(Ci),u=c.length-1;o<u;o++)r+=c[o]+(~s.indexOf(o)?i.shift()||a+`0,0,0,0)`:(l.length?l:i.length?i:n).shift());if(!c)for(c=e.split(So),u=c.length-1;o<u;o++)r+=c[o]+i[o];return r+c[u]},So=function(){var e=`(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b`,t;for(t in _o)e+=`|`+t+`\\b`;return RegExp(e+`)`,`gi`)}(),Co=/hsl[a]?\(/,wo=function(e){var t=e.join(` `),n;if(So.lastIndex=0,So.test(t))return n=Co.test(t),e[1]=xo(e[1],n),e[0]=xo(e[0],n,bo(e[1])),!0},To,Eo=function(){var e=Date.now,t=500,n=33,r=e(),i=r,a=1e3/240,o=a,s=[],c,l,u,d,f,p,m=function u(m){var h=e()-i,g=m===!0,_,v,y,b;if((h>t||h<0)&&(r+=h-n),i+=h,y=i-r,_=y-o,(_>0||g)&&(b=++d.frame,f=y-d.time*1e3,d.time=y/=1e3,o+=_+(_>=a?4:a-_),v=1),g||(c=l(u)),v)for(p=0;p<s.length;p++)s[p](y,f,b,m)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(e){return f/(1e3/(e||60))},wake:function(){Ni&&(!ki&&hi()&&(Oi=ki=window,Ai=Oi.document||{},ji.gsap=ks,(Oi.gsapVersions||(Oi.gsapVersions=[])).push(ks.version),Pi(Mi||Oi.GreenSockGlobals||!Oi.gsap&&Oi||{}),ho.forEach(go)),u=typeof requestAnimationFrame<`u`&&requestAnimationFrame,c&&d.sleep(),l=u||function(e){return setTimeout(e,o-d.time*1e3+1|0)},To=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),To=0,l=Ri},lagSmoothing:function(e,r){t=e||1/0,n=Math.min(r||33,t)},fps:function(e){a=1e3/(e||240),o=d.time*1e3+a},add:function(e,t,n){var r=t?function(t,n,i,a){e(t,n,i,a),d.remove(r)}:e;return d.remove(e),s[n?`unshift`:`push`](r),Do(),r},remove:function(e,t){~(t=s.indexOf(e))&&s.splice(t,1)&&p>=t&&p--},_listeners:s},d}(),Do=function(){return!To&&Eo.wake()},W={},Oo=/^[\d.\-M][\d.\-,\s]/,ko=/["']/g,Ao=function(e){for(var t={},n=e.substr(1,e.length-3).split(`:`),r=n[0],i=1,a=n.length,o,s,c;i<a;i++)s=n[i],o=i===a-1?s.length:s.lastIndexOf(`,`),c=s.substr(0,o),t[r]=isNaN(c)?c.replace(ko,``).trim():+c,r=s.substr(o+1).trim();return t},jo=function(e){var t=e.indexOf(`(`)+1,n=e.indexOf(`)`),r=e.indexOf(`(`,t);return e.substring(t,~r&&r<n?e.indexOf(`)`,n+1):n)},Mo=function(e){var t=(e+``).split(`(`),n=W[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf(`{`)?[Ao(t[1])]:jo(e).split(`,`).map(sa)):W._CE&&Oo.test(e)?W._CE(``,e):n},No=function(e){return function(t){return 1-e(1-t)}},Po=function(e,t){return e&&(B(e)?e:W[e]||Mo(e))||t},Fo=function(e,t,n,r){n===void 0&&(n=function(e){return 1-t(1-e)}),r===void 0&&(r=function(e){return e<.5?t(e*2)/2:1-t((1-e)*2)/2});var i={easeIn:t,easeOut:n,easeInOut:r},a;return ea(e,function(e){for(var t in W[e]=ji[e]=i,W[a=e.toLowerCase()]=n,i)W[a+(t===`easeIn`?`.in`:t===`easeOut`?`.out`:`.inOut`)]=W[e+`.`+t]=i[t]}),i},Io=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Lo=function e(t,n,r){var i=n>=1?n:1,a=(r||(t?.3:.45))/(n<1?n:1),o=a/ii*(Math.asin(1/i)||0),s=function(e){return e===1?1:i*2**(-10*e)*li((e-o)*a)+1},c=t===`out`?s:t===`in`?function(e){return 1-s(1-e)}:Io(s);return a=ii/a,c.config=function(n,r){return e(t,n,r)},c},Ro=function e(t,n){n===void 0&&(n=1.70158);var r=function(e){return e?--e*e*((n+1)*e+n)+1:0},i=t===`out`?r:t===`in`?function(e){return 1-r(1-e)}:Io(r);return i.config=function(n){return e(t,n)},i};ea(`Linear,Quad,Cubic,Quart,Quint,Strong`,function(e,t){var n=t<5?t+1:t;Fo(e+`,Power`+(n-1),t?function(e){return e**+n}:function(e){return e},function(e){return 1-(1-e)**n},function(e){return e<.5?(e*2)**n/2:1-((1-e)*2)**n/2})}),W.Linear.easeNone=W.none=W.Linear.easeIn,Fo(`Elastic`,Lo(`in`),Lo(`out`),Lo()),(function(e,t){var n=1/t,r=2*n,i=2.5*n,a=function(a){return a<n?e*a*a:a<r?e*(a-1.5/t)**2+.75:a<i?e*(a-=2.25/t)*a+.9375:e*(a-2.625/t)**2+.984375};Fo(`Bounce`,function(e){return 1-a(1-e)},a)})(7.5625,2.75),Fo(`Expo`,function(e){return 2**(10*(e-1))*e+e*e*e*e*e*e*(1-e)}),Fo(`Circ`,function(e){return-(si(1-e*e)-1)}),Fo(`Sine`,function(e){return e===1?1:-ci(e*ai)+1}),Fo(`Back`,Ro(`in`),Ro(`out`),Ro()),W.SteppedEase=W.steps=ji.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+ +!t,i=+!!t,a=1-z;return function(e){return((r*Ha(0,a,e)|0)+i)*n}}},ei.ease=W[`quad.out`],ea(`onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt`,function(e){return Xi+=e+`,`+e+`Params,`});var zo=function(e,t){this.id=oi++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:$i,this.set=t?t.getSetter:os},Bo=function(){function e(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Ia(this,+e.duration,1,1),this.data=e.data,R&&(this._ctx=R,R.data.push(this)),To||Eo.wake()}var t=e.prototype;return t.delay=function(e){return e||e===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+e-this._delay),this._delay=e,this):this._delay},t.duration=function(e){return arguments.length?this.totalDuration(this._repeat>0?e+(e+this._rDelay)*this._repeat:e):this.totalDuration()&&this._dur},t.totalDuration=function(e){return arguments.length?(this._dirty=0,Ia(this,this._repeat<0?e:(e-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(e,t){if(Do(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for(Da(this,e),!n._dp||n.parent||Oa(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&e<this._tDur||this._ts<0&&e>0||!this._tDur&&!e)&&ka(this._dp,this,this._start-this._delay)}return(this._tTime!==e||!this._dur&&!t||this._initted&&Math.abs(this._zTime)===z||!this._initted&&this._dur&&e||!e&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=e),oa(this,e,t)),this},t.time=function(e,t){return arguments.length?this.totalTime(Math.min(this.totalDuration(),e+Ca(this))%(this._dur+this._rDelay)||(e?this._dur:0),t):this._time},t.totalProgress=function(e,t){return arguments.length?this.totalTime(this.totalDuration()*e,t):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(e,t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-e:e)+Ca(this),t):this.duration()?Math.min(1,this._time/this._dur):+(this.rawTime()>0)},t.iteration=function(e,t){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(e-1)*n,t):this._repeat?wa(this._tTime,n)+1:1},t.timeScale=function(e,t){if(!arguments.length)return this._rts===-z?0:this._rts;if(this._rts===e)return this;var n=this.parent&&this._ts?Ta(this.parent._time,this):this._tTime;return this._rts=+e||0,this._ts=this._ps||e===-z?0:this._rts,this.totalTime(Ha(-Math.abs(this._delay),this.totalDuration(),n),t!==!1),Ea(this),ba(this)},t.paused=function(e){return arguments.length?(this._ps!==e&&(this._ps=e,e?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Do(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==z&&(this._tTime-=z)))),this):this._ps},t.startTime=function(e){if(arguments.length){this._start=H(e);var t=this.parent||this._dp;return t&&(t._sort||!this.parent)&&ka(t,this,this._start-this._delay),this}return this._start},t.endTime=function(e){return this._start+(mi(e)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(e){var t=this.parent||this._dp;return t?e&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ta(t.rawTime(e),this):this._tTime:this._tTime},t.revert=function(e){e===void 0&&(e=Vi);var t=ni;return ni=e,aa(this)&&(this.timeline&&this.timeline.revert(e),this.totalTime(-.01,e.suppressEvents)),this.data!==`nested`&&e.kill!==!1&&this.kill(),ni=t,this},t.globalTime=function(e){for(var t=this,n=arguments.length?e:t.rawTime();t;)n=t._start+n/(Math.abs(t._ts)||1),t=t._dp;return!this.parent&&this._sat?this._sat.globalTime(e):n},t.repeat=function(e){return arguments.length?(this._repeat=e===1/0?-2:e,La(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(e){if(arguments.length){var t=this._time;return this._rDelay=e,La(this),t?this.time(t):this}return this._rDelay},t.yoyo=function(e){return arguments.length?(this._yoyo=e,this):this._yoyo},t.seek=function(e,t){return this.totalTime(za(this,e),mi(t))},t.restart=function(e,t){return this.play().totalTime(e?-this._delay:0,mi(t)),this._dur||(this._zTime=-z),this},t.play=function(e,t){return e!=null&&this.seek(e,t),this.reversed(!1).paused(!1)},t.reverse=function(e,t){return e!=null&&this.seek(e||this.totalDuration(),t),this.reversed(!0).paused(!1)},t.pause=function(e,t){return e!=null&&this.seek(e,t),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(e){return arguments.length?(!!e!==this.reversed()&&this.timeScale(-this._rts||(e?-z:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-z,this},t.isActive=function(){var e=this.parent||this._dp,t=this._start,n;return!!(!e||this._ts&&this._initted&&e.isActive()&&(n=e.rawTime(!0))>=t&&n<this.endTime(!0)-z)},t.eventCallback=function(e,t,n){var r=this.vars;return arguments.length>1?(t?(r[e]=t,n&&(r[e+`Params`]=n),e===`onUpdate`&&(this._onUpdate=t)):delete r[e],this):r[e]},t.then=function(e){var t=this,n=t._prom;return new Promise(function(r){var i=B(e)?e:ca,a=function(){var e=t.then;t.then=null,n&&n(),B(i)&&(i=i(t))&&(i.then||i===t)&&(t.then=e),r(i),t.then=e};t._initted&&t.totalProgress()===1&&t._ts>=0||!t._tTime&&t._ts<0?a():t._prom=a})},t.kill=function(){po(this)},e}();la(Bo.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-z,_prom:0,_ps:!1,_rts:1});var Vo=function(e){Qr(t,e);function t(t,n){var r;return t===void 0&&(t={}),r=e.call(this,t)||this,r.labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=mi(t.sortChildren),V&&ka(t.parent||V,Zr(r),n),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&Aa(Zr(r),t.scrollTrigger),r}var n=t.prototype;return n.to=function(e,t,n){return Ba(0,arguments,this),this},n.from=function(e,t,n){return Ba(1,arguments,this),this},n.fromTo=function(e,t,n,r){return Ba(2,arguments,this),this},n.set=function(e,t,n){return t.duration=0,t.parent=this,ma(t).repeatDelay||(t.repeat=0),t.immediateRender=!!t.immediateRender,new ts(e,t,za(this,n),1),this},n.call=function(e,t,n){return ka(this,ts.delayedCall(0,e,t),n)},n.staggerTo=function(e,t,n,r,i,a,o){return n.duration=t,n.stagger=n.stagger||r,n.onComplete=a,n.onCompleteParams=o,n.parent=this,new ts(e,n,za(this,i)),this},n.staggerFrom=function(e,t,n,r,i,a,o){return n.runBackwards=1,ma(n).immediateRender=mi(n.immediateRender),this.staggerTo(e,t,n,r,i,a,o)},n.staggerFromTo=function(e,t,n,r,i,a,o,s){return r.startAt=n,ma(r).immediateRender=mi(r.immediateRender),this.staggerTo(e,t,r,i,a,o,s)},n.render=function(e,t,n){var r=this._time,i=this._dirty?this.totalDuration():this._tDur,a=this._dur,o=e<=0?0:H(e),s=this._zTime<0!=e<0&&(this._initted||!a),c,l,u,d,f,p,m,h,g,_,v,y;if(this!==V&&o>i&&e>=0&&(o=i),o!==this._tTime||n||s){if(r!==this._time&&a&&(o+=this._time-r,e+=this._time-r),c=o,g=this._start,h=this._ts,p=!h,s&&(a||(r=this._zTime),(e||!t)&&(this._zTime=e)),this._repeat){if(v=this._yoyo,f=a+this._rDelay,this._repeat<-1&&e<0)return this.totalTime(f*100+e,t,n);if(c=H(o%f),o===i?(d=this._repeat,c=a):(_=H(o/f),d=~~_,d&&d===_&&(c=a,d--),c>a&&(c=a)),_=wa(this._tTime,f),!r&&this._tTime&&_!==d&&this._tTime-_*f-this._dur<=0&&(_=d),v&&d&1&&(c=a-c,y=1),d!==_&&!this._lock){var b=v&&_&1,x=b===(v&&d&1);if(d<_&&(b=!b),r=b?0:o%a?a:o,this._lock=1,this.render(r||(y?0:H(d*f)),t,!a)._lock=0,this._tTime=o,!t&&this.parent&&fo(this,`onRepeat`),this.vars.repeatRefresh&&!y&&(this.invalidate()._lock=1,_=d),r&&r!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act||(a=this._dur,i=this._tDur,x&&(this._lock=2,r=b?a:-1e-4,this.render(r,!0),this.vars.repeatRefresh&&!y&&this.invalidate()),this._lock=0,!this._ts&&!p))return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(m=Fa(this,H(r),H(c)),m&&(o-=c-(c=m._start))),this._tTime=o,this._time=c,this._act=!!h,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=e,r=0),!r&&o&&a&&!t&&!_&&(fo(this,`onStart`),this._tTime!==o))return this;if(c>=r&&e>=0)for(l=this._first;l;){if(u=l._next,(l._act||c>=l._start)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(c-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(c-l._start)*l._ts,t,n),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=-z);break}}l=u}else{l=this._last;for(var S=e<0?e:c;l;){if(u=l._prev,(l._act||S<=l._end)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(S-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(S-l._start)*l._ts,t,n||ni&&aa(l)),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=S?-z:z);break}}l=u}}if(m&&!t&&(this.pause(),m.render(c>=r?0:-z)._zTime=c>=r?1:-1,this._ts))return this._start=g,Ea(this),this.render(e,t,n);this._onUpdate&&!t&&fo(this,`onUpdate`,!0),(o===i&&this._tTime>=this.totalDuration()||!o&&r)&&(g===this._start||Math.abs(h)!==Math.abs(this._ts))&&(this._lock||((e||!a)&&(o===i&&this._ts>0||!o&&this._ts<0)&&va(this,1),!t&&!(e<0&&!r)&&(o||r||!i)&&(fo(this,o===i&&e>=0?`onComplete`:`onReverseComplete`,!0),this._prom&&!(o<i&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(e,t){var n=this;if(di(t)||(t=za(this,t,e)),!(e instanceof Bo)){if(vi(e))return e.forEach(function(e){return n.add(e,t)}),this;if(ui(e))return this.addLabel(e,t);if(B(e))e=ts.delayedCall(0,e);else return this}return this===e?this:ka(this,e,t)},n.getChildren=function(e,t,n,r){e===void 0&&(e=!0),t===void 0&&(t=!0),n===void 0&&(n=!0),r===void 0&&(r=-ri);for(var i=[],a=this._first;a;)a._start>=r&&(a instanceof ts?t&&i.push(a):(n&&i.push(a),e&&i.push.apply(i,a.getChildren(!0,t,n)))),a=a._next;return i},n.getById=function(e){for(var t=this.getChildren(1,1,1),n=t.length;n--;)if(t[n].vars.id===e)return t[n]},n.remove=function(e){return ui(e)?this.removeLabel(e):B(e)?this.killTweensOf(e):(e.parent===this&&_a(this,e),e===this._recent&&(this._recent=this._last),ya(this))},n.totalTime=function(t,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=H(Eo.time-(this._ts>0?t/this._ts:(this.totalDuration()-t)/-this._ts))),e.prototype.totalTime.call(this,t,n),this._forcing=0,this):this._tTime},n.addLabel=function(e,t){return this.labels[e]=za(this,t),this},n.removeLabel=function(e){return delete this.labels[e],this},n.addPause=function(e,t,n){var r=ts.delayedCall(0,t||Ri,n);return r.data=`isPause`,this._hasPause=1,ka(this,r,za(this,e))},n.removePause=function(e){var t=this._first;for(e=za(this,e);t;)t._start===e&&t.data===`isPause`&&va(t),t=t._next},n.killTweensOf=function(e,t,n){for(var r=this.getTweensOf(e,n),i=r.length;i--;)Ko!==r[i]&&r[i].kill(e,t);return this},n.getTweensOf=function(e,t){for(var n=[],r=Ja(e),i=this._first,a=di(t),o;i;)i instanceof ts?ra(i._targets,r)&&(a?(!Ko||i._initted&&i._ts)&&i.globalTime(0)<=t&&i.globalTime(i.totalDuration())>t:!t||i.isActive())&&n.push(i):(o=i.getTweensOf(r,t)).length&&n.push.apply(n,o),i=i._next;return n},n.tweenTo=function(e,t){t||={};var n=this,r=za(n,e),i=t,a=i.startAt,o=i.onStart,s=i.onStartParams,c=i.immediateRender,l,u=ts.to(n,la({ease:t.ease||`none`,lazy:!1,immediateRender:!1,time:r,overwrite:`auto`,duration:t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale())||z,onStart:function(){if(n.pause(),!l){var e=t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale());u._dur!==e&&Ia(u,e,0,1).render(u._time,!0,!0),l=1}o&&o.apply(u,s||[])}},t));return c?u.render(0):u},n.tweenFromTo=function(e,t,n){return this.tweenTo(t,la({startAt:{time:za(this,e)}},n))},n.recent=function(){return this._recent},n.nextLabel=function(e){return e===void 0&&(e=this._time),uo(this,za(this,e))},n.previousLabel=function(e){return e===void 0&&(e=this._time),uo(this,za(this,e),1)},n.currentLabel=function(e){return arguments.length?this.seek(e,!0):this.previousLabel(this._time+z)},n.shiftChildren=function(e,t,n){n===void 0&&(n=0);var r=this._first,i=this.labels,a;for(e=H(e);r;)r._start>=n&&(r._start+=e,r._end+=e),r=r._next;if(t)for(a in i)i[a]>=n&&(i[a]+=e);return ya(this)},n.invalidate=function(t){var n=this._first;for(this._lock=0;n;)n.invalidate(t),n=n._next;return e.prototype.invalidate.call(this,t)},n.clear=function(e){e===void 0&&(e=!0);for(var t=this._first,n;t;)n=t._next,this.remove(t),t=n;return this._dp&&(this._time=this._tTime=this._pTime=0),e&&(this.labels={}),ya(this)},n.totalDuration=function(e){var t=0,n=this,r=n._last,i=ri,a,o,s;if(arguments.length)return n.timeScale((n._repeat<0?n.duration():n.totalDuration())/(n.reversed()?-e:e));if(n._dirty){for(s=n.parent;r;)a=r._prev,r._dirty&&r.totalDuration(),o=r._start,o>i&&n._sort&&r._ts&&!n._lock?(n._lock=1,ka(n,r,o-r._delay,1)._lock=0):i=o,o<0&&r._ts&&(t-=o,(!s&&!n._dp||s&&s.smoothChildTiming)&&(n._start+=H(o/n._ts),n._time-=o,n._tTime-=o),n.shiftChildren(-o,!1,-1/0),i=0),r._end>t&&r._ts&&(t=r._end),r=a;Ia(n,n===V&&n._time>t?n._time:t,1,1),n._dirty=0}return n._tDur},t.updateRoot=function(e){if(V._ts&&(oa(V,Ta(e,V)),Gi=Eo.frame),Eo.frame>=Ji){Ji+=$r.autoSleep||120;var t=V._first;if((!t||!t._ts)&&$r.autoSleep&&Eo._listeners.length<2){for(;t&&!t._ts;)t=t._next;t||Eo.sleep()}}},t}(Bo);la(Vo.prototype,{_lock:0,_hasPause:0,_forcing:0});var Ho=function(e,t,n,r,i,a,o){var s=new hs(this._pt,e,t,0,1,ls,null,i),c=0,l=0,u,d,f,p,m,h,g,_;for(s.b=n,s.e=r,n+=``,r+=``,(g=~r.indexOf(`random(`))&&(r=so(r)),a&&(_=[n,r],a(_,e,t),n=_[0],r=_[1]),d=n.match(wi)||[];u=wi.exec(r);)p=u[0],m=r.substring(c,u.index),f?f=(f+1)%5:m.substr(-5)===`rgba(`&&(f=1),p!==d[l++]&&(h=parseFloat(d[l-1])||0,s._pt={_next:s._pt,p:m||l===1?m:`,`,s:h,c:p.charAt(1)===`=`?na(h,p)-h:parseFloat(p)-h,m:f&&f<4?Math.round:0},c=wi.lastIndex);return s.c=c<r.length?r.substring(c,r.length):``,s.fp=o,(Ti.test(r)||g)&&(s.e=0),this._pt=s,s},Uo=function(e,t,n,r,i,a,o,s,c,l){B(r)&&(r=r(i||0,e,a));var u=e[t],d=n===`get`?B(u)?c?e[t.indexOf(`set`)||!B(e[`get`+t.substr(3)])?t:`get`+t.substr(3)](c):e[t]():u:n,f=B(u)?c?is:rs:ns,p;if(ui(r)&&(~r.indexOf(`random(`)&&(r=so(r)),r.charAt(1)===`=`&&(p=na(d,r)+(Ua(d)||0),(p||p===0)&&(r=p))),!l||d!==r||qo)return!isNaN(d*r)&&r!==``?(p=new hs(this._pt,e,t,+d||0,r-(d||0),typeof u==`boolean`?cs:ss,0,f),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!u&&!(t in e)&&Fi(t,r),Ho.call(this,e,t,d,r,f,s||$r.stringFilter,c))},Wo=function(e,t,n,r,i){if(B(e)&&(e=Qo(e,i,t,n,r)),!pi(e)||e.style&&e.nodeType||vi(e)||_i(e))return ui(e)?Qo(e,i,t,n,r):e;var a={},o;for(o in e)a[o]=Qo(e[o],i,t,n,r);return a},Go=function(e,t,n,r,i,a){var o,s,c,l;if(Ki[e]&&(o=new Ki[e]).init(i,o.rawVars?t[e]:Wo(t[e],r,i,a,n),n,r,a)!==!1&&(n._pt=s=new hs(n._pt,i,e,0,1,o.render,o,0,o.priority),n!==mo))for(c=n._ptLookup[n._targets.indexOf(i)],l=o._props.length;l--;)c[o._props[l]]=s;return o},Ko,qo,Jo=function e(t,n,r){var i=t.vars,a=i.ease,o=i.startAt,s=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,p=i.autoRevert,m=t._dur,h=t._startAt,g=t._targets,_=t.parent,v=_&&_.data===`nested`?_.vars.targets:g,y=t._overwrite===`auto`&&!ti,b=t.timeline,x=i.easeReverse||d,S,C,w,T,E,D,ee,te,ne,re,O,ie,ae;if(b&&(!f||!a)&&(a=`none`),t._ease=Po(a,ei.ease),t._rEase=x&&(Po(x)||t._ease),t._from=!b&&!!i.runBackwards,t._from&&(t.ratio=1),!b||f&&!i.stagger){if(te=g[0]?Qi(g[0]).harness:0,ie=te&&i[te.prop],S=pa(i,Hi),h&&(h._zTime<0&&h.progress(1),n<0&&u&&s&&!p?h.render(-1,!0):h.revert(u&&m?Bi:zi),h._lazy=0),o){if(va(t._startAt=ts.set(g,la({data:`isStart`,overwrite:!1,parent:_,immediateRender:!0,lazy:!h&&mi(c),startAt:null,delay:0,onUpdate:l&&function(){return fo(t,`onUpdate`)},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,n<0&&(ni||!s&&!p)&&t._startAt.revert(Bi),s&&m&&n<=0&&r<=0){n&&(t._zTime=n);return}}else if(u&&m&&!h){if(n&&(s=!1),w=la({overwrite:!1,data:`isFromStart`,lazy:s&&!h&&mi(c),immediateRender:s,stagger:0,parent:_},S),ie&&(w[te.prop]=ie),va(t._startAt=ts.set(g,w)),t._startAt._dp=0,t._startAt._sat=t,n<0&&(ni?t._startAt.revert(Bi):t._startAt.render(-1,!0)),t._zTime=n,!s)e(t._startAt,z,z);else if(!n)return}for(t._pt=t._ptCache=0,c=m&&mi(c)||c&&!m,C=0;C<g.length;C++){if(E=g[C],ee=E._gsap||Zi(g)[C]._gsap,t._ptLookup[C]=re={},Wi[ee.id]&&Ui.length&&ia(),O=v===g?C:v.indexOf(E),te&&(ne=new te).init(E,ie||S,t,O,v)!==!1&&(t._pt=T=new hs(t._pt,E,ne.name,0,1,ne.render,ne,0,ne.priority),ne._props.forEach(function(e){re[e]=T}),ne.priority&&(D=1)),!te||ie)for(w in S)Ki[w]&&(ne=Go(w,S,t,O,E,v))?ne.priority&&(D=1):re[w]=T=Uo.call(t,E,w,`get`,S[w],O,v,0,i.stringFilter);t._op&&t._op[C]&&t.kill(E,t._op[C]),y&&t._pt&&(Ko=t,V.killTweensOf(E,re,t.globalTime(n)),ae=!t.parent,Ko=0),t._pt&&c&&(Wi[ee.id]=1)}D&&ms(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!ae,f&&n<=0&&b.render(ri,!0,!0)},Yo=function(e,t,n,r,i,a,o,s){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],l,u,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(l=d[f][t],l&&l.d&&l.d._pt)for(l=l.d._pt;l&&l.p!==t&&l.fp!==t;)l=l._next;if(!l)return qo=1,e.vars[t]=`+=0`,Jo(e,o),qo=0,s?Ii(t+` not eligible for reset. Try splitting into individual properties`):1;c.push(l)}for(f=c.length;f--;)u=c[f],l=u._pt||u,l.s=(r||r===0)&&!i?r:l.s+(r||0)+a*l.c,l.c=n-l.s,u.e&&(u.e=ta(n)+Ua(u.e)),u.b&&(u.b=l.s+Ua(u.b))},Xo=function(e,t){var n=e[0]?Qi(e[0]).harness:0,r=n&&n.aliases,i,a,o,s;if(!r)return t;for(a in i=da({},t),r)if(a in i)for(s=r[a].split(`,`),o=s.length;o--;)i[s[o]]=i[a];return i},Zo=function(e,t,n,r){var i=t.ease||r||`power1.inOut`,a,o;if(vi(t))o=n[e]||(n[e]=[]),t.forEach(function(e,n){return o.push({t:n/(t.length-1)*100,v:e,e:i})});else for(a in t)o=n[a]||(n[a]=[]),a===`ease`||o.push({t:parseFloat(e),v:t[a],e:i})},Qo=function(e,t,n,r,i){return B(e)?e.call(t,n,r,i):ui(e)&&~e.indexOf(`random(`)?so(e):e},$o=Xi+`repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert`,es={};ea($o+`,id,stagger,delay,duration,paused,scrollTrigger`,function(e){return es[e]=1});var ts=function(e){Qr(t,e);function t(t,n,r,i){var a;typeof n==`number`&&(r.duration=n,n=r,r=null),a=e.call(this,i?n:ma(n))||this;var o=a.vars,s=o.duration,c=o.delay,l=o.immediateRender,u=o.stagger,d=o.overwrite,f=o.keyframes,p=o.defaults,m=o.scrollTrigger,h=n.parent||V,g=(vi(t)||_i(t)?di(t[0]):`length`in n)?[t]:Ja(t),_,v,y,b,x,S,C,w;if(a._targets=g.length?Zi(g):Ii(`GSAP target `+t+` not found. https://gsap.com`,!$r.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,f||u||gi(s)||gi(c)){n=a.vars;var T=n.easeReverse||n.yoyoEase;if(_=a.timeline=new Vo({data:`nested`,defaults:p||{},targets:h&&h.data===`nested`?h.vars.targets:g}),_.kill(),_.parent=_._dp=Zr(a),_._start=0,u||gi(s)||gi(c)){if(b=g.length,C=u&&Za(u),pi(u))for(x in u)~$o.indexOf(x)&&(w||={},w[x]=u[x]);for(v=0;v<b;v++)y=pa(n,es),y.stagger=0,T&&(y.easeReverse=T),w&&da(y,w),S=g[v],y.duration=+Qo(s,Zr(a),v,S,g),y.delay=(+Qo(c,Zr(a),v,S,g)||0)-a._delay,!u&&b===1&&y.delay&&(a._delay=c=y.delay,a._start+=c,y.delay=0),_.to(S,y,C?C(v,S,g):0),_._ease=W.none;_.duration()?s=c=0:a.timeline=0}else if(f){ma(la(_.vars.defaults,{ease:`none`})),_._ease=Po(f.ease||n.ease||`none`);var E=0,D,ee,te;if(vi(f))f.forEach(function(e){return _.to(g,e,`>`)}),_.duration();else{for(x in y={},f)x===`ease`||x===`easeEach`||Zo(x,f[x],y,f.easeEach);for(x in y)for(D=y[x].sort(function(e,t){return e.t-t.t}),E=0,v=0;v<D.length;v++)ee=D[v],te={ease:ee.e,duration:(ee.t-(v?D[v-1].t:0))/100*s},te[x]=ee.v,_.to(g,te,E),E+=te.duration;_.duration()<s&&_.to({},{duration:s-_.duration()})}}s||a.duration(s=_.duration())}else a.timeline=0;return d===!0&&!ti&&(Ko=Zr(a),V.killTweensOf(g),Ko=0),ka(h,Zr(a),r),n.reversed&&a.reverse(),n.paused&&a.paused(!0),(l||!s&&!f&&a._start===H(h._time)&&mi(l)&&Sa(Zr(a))&&h.data!==`nested`)&&(a._tTime=-z,a.render(Math.max(0,-c)||0)),m&&Aa(Zr(a),m),a}var n=t.prototype;return n.render=function(e,t,n){var r=this._time,i=this._tDur,a=this._dur,o=e<0,s=e>i-z&&!o?i:e<z?0:e,c,l,u,d,f,p,m,h;if(!a)Pa(this,e,t,n);else if(s!==this._tTime||!e||n||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==o||this._lazy){if(c=s,h=this.timeline,this._repeat){if(d=a+this._rDelay,this._repeat<-1&&o)return this.totalTime(d*100+e,t,n);if(c=H(s%d),s===i?(u=this._repeat,c=a):(f=H(s/d),u=~~f,u&&u===f?(c=a,u--):c>a&&(c=a)),p=this._yoyo&&u&1,p&&(c=a-c),f=wa(this._tTime,d),c===r&&!n&&this._initted&&u===f)return this._tTime=s,this;u!==f&&this.vars.repeatRefresh&&!p&&!this._lock&&c!==d&&this._initted&&(this._lock=n=1,this.render(H(d*u),!0).invalidate()._lock=0)}if(!this._initted){if(ja(this,o?e:c,n,t,s))return this._tTime=0,this;if(r!==this._time&&!(n&&this.vars.repeatRefresh&&u!==f))return this;if(a!==this._dur)return this.render(e,t,n)}if(this._rEase){var g=c<r;if(g!==this._inv){var _=g?r:a-r;this._inv=g,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=r,this._invRecip=_?(g?-1:1)/_:0,this._invScale=g?-this.ratio:1-this.ratio,this._invEase=g?this._rEase:this._ease}this.ratio=m=this._invRatio+this._invScale*this._invEase((c-this._invTime)*this._invRecip)}else this.ratio=m=this._ease(c/a);if(this._from&&(this.ratio=m=1-m),this._tTime=s,this._time=c,!this._act&&this._ts&&(this._act=1,this._lazy=0),!r&&s&&!t&&!f&&(fo(this,`onStart`),this._tTime!==s))return this;for(l=this._pt;l;)l.r(m,l.d),l=l._next;h&&h.render(e<0?e:h._dur*h._ease(c/this._dur),t,n)||this._startAt&&(this._zTime=e),this._onUpdate&&!t&&(o&&xa(this,e,t,n),fo(this,`onUpdate`)),this._repeat&&u!==f&&this.vars.onRepeat&&!t&&this.parent&&fo(this,`onRepeat`),(s===this._tDur||!s)&&this._tTime===s&&(o&&!this._onUpdate&&xa(this,e,!0,!0),(e||!a)&&(s===this._tDur&&this._ts>0||!s&&this._ts<0)&&va(this,1),!t&&(!o||r)&&(s||r||p)&&(fo(this,s===i?`onComplete`:`onReverseComplete`,!0),this._prom&&!(s<i&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(t){return(!t||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),e.prototype.invalidate.call(this,t)},n.resetTo=function(e,t,n,r,i){To||Eo.wake(),this._ts||this.play();var a=Math.min(this._dur,(this._dp._time-this._start)*this._ts),o;return this._initted||Jo(this,a),o=this._ease(a/this._dur),Yo(this,e,t,n,r,o,a,i)?this.resetTo(e,t,n,r,1):(Da(this,0),this.parent||ga(this._dp,this,`_first`,`_last`,this._dp._sort?`_start`:0),this.render(0))},n.kill=function(e,t){if(t===void 0&&(t=`all`),!e&&(!t||t===`all`))return this._lazy=this._pt=0,this.parent?po(this):this.scrollTrigger&&this.scrollTrigger.kill(!!ni),this;if(this.timeline){var n=this.timeline.totalDuration();return this.timeline.killTweensOf(e,t,Ko&&Ko.vars.overwrite!==!0)._first||po(this),this.parent&&n!==this.timeline.totalDuration()&&Ia(this,this._dur*this.timeline._tDur/n,0,1),this}var r=this._targets,i=e?Ja(e):r,a=this._ptLookup,o=this._pt,s,c,l,u,d,f,p;if((!t||t===`all`)&&ha(r,i))return t===`all`&&(this._pt=0),po(this);for(s=this._op=this._op||[],t!==`all`&&(ui(t)&&(d={},ea(t,function(e){return d[e]=1}),t=d),t=Xo(r,t)),p=r.length;p--;)if(~i.indexOf(r[p]))for(d in c=a[p],t===`all`?(s[p]=t,u=c,l={}):(l=s[p]=s[p]||{},u=t),u)f=c&&c[d],f&&((!(`kill`in f.d)||f.d.kill(d)===!0)&&_a(this,f,`_pt`),delete c[d]),l!==`all`&&(l[d]=1);return this._initted&&!this._pt&&o&&po(this),this},t.to=function(e,n){return new t(e,n,arguments[2])},t.from=function(e,t){return Ba(1,arguments)},t.delayedCall=function(e,n,r,i){return new t(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:e,onComplete:n,onReverseComplete:n,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},t.fromTo=function(e,t,n){return Ba(2,arguments)},t.set=function(e,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new t(e,n)},t.killTweensOf=function(e,t,n){return V.killTweensOf(e,t,n)},t}(Bo);la(ts.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),ea(`staggerTo,staggerFrom,staggerFromTo`,function(e){ts[e]=function(){var t=new Vo,n=Ga.call(arguments,0);return n.splice(e===`staggerFromTo`?5:4,0,0),t[e].apply(t,n)}});var ns=function(e,t,n){return e[t]=n},rs=function(e,t,n){return e[t](n)},is=function(e,t,n,r){return e[t](r.fp,n)},as=function(e,t,n){return e.setAttribute(t,n)},os=function(e,t){return B(e[t])?rs:fi(e[t])&&e.setAttribute?as:ns},ss=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},cs=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},ls=function(e,t){var n=t._pt,r=``;if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},us=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},ds=function(e,t,n,r){for(var i=this._pt,a;i;)a=i._next,i.p===r&&i.modifier(e,t,n),i=a},fs=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?_a(this,t,`_pt`):t.dep||(n=1),t=r;return!n},ps=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},ms=function(e){for(var t=e._pt,n,r,i,a;t;){for(n=t._next,r=i;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:i=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=i},hs=function(){function e(e,t,n,r,i,a,o,s,c){this.t=t,this.s=r,this.c=i,this.p=n,this.r=a||ss,this.d=o||this,this.set=s||ns,this.pr=c||0,this._next=e,e&&(e._prev=this)}var t=e.prototype;return t.modifier=function(e,t,n){this.mSet=this.mSet||this.set,this.set=ps,this.m=e,this.mt=n,this.tween=t},e}();ea(Xi+`parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse`,function(e){return Hi[e]=1}),ji.TweenMax=ji.TweenLite=ts,ji.TimelineLite=ji.TimelineMax=Vo,V=new Vo({sortChildren:!1,defaults:ei,autoRemoveChildren:!0,id:`root`,smoothChildTiming:!0}),$r.stringFilter=wo;var gs=[],_s={},vs=[],ys=0,bs=0,xs=function(e){return(_s[e]||vs).map(function(e){return e()})},Ss=function(){var e=Date.now(),t=[];e-ys>2&&(xs(`matchMediaInit`),gs.forEach(function(e){var n=e.queries,r=e.conditions,i,a,o,s;for(a in n)i=Oi.matchMedia(n[a]).matches,i&&(o=1),i!==r[a]&&(r[a]=i,s=1);s&&(e.revert(),o&&t.push(e))}),xs(`matchMediaRevert`),t.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),ys=e,xs(`matchMedia`))},Cs=function(){function e(e,t){this.selector=t&&Ya(t),this.data=[],this._r=[],this.isReverted=!1,this.id=bs++,e&&this.add(e)}var t=e.prototype;return t.add=function(e,t,n){B(e)&&(n=t,t=e,e=B);var r=this,i=function(){var e=R,i=r.selector,a;return e&&e!==r&&e.data.push(r),n&&(r.selector=Ya(n)),R=r,a=t.apply(r,arguments),B(a)&&r._r.push(a),R=e,r.selector=i,r.isReverted=!1,a};return r.last=i,e===B?i(r,function(e){return r.add(null,e)}):e?r[e]=i:i},t.ignore=function(e){var t=R;R=null,e(this),R=t},t.getTweens=function(){var t=[];return this.data.forEach(function(n){return n instanceof e?t.push.apply(t,n.getTweens()):n instanceof ts&&!(n.parent&&n.parent.data===`nested`)&&t.push(n)}),t},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(e,t){var n=this;if(e?(function(){for(var t=n.getTweens(),r=n.data.length,i;r--;)i=n.data[r],i.data===`isFlip`&&(i.revert(),i.getChildren(!0,!0,!1).forEach(function(e){return t.splice(t.indexOf(e),1)}));for(t.map(function(e){return{g:e._dur||e._delay||e._sat&&!e._sat.vars.immediateRender?e.globalTime(0):-1/0,t:e}}).sort(function(e,t){return t.g-e.g||-1/0}).forEach(function(t){return t.t.revert(e)}),r=n.data.length;r--;)i=n.data[r],i instanceof Vo?i.data!==`nested`&&(i.scrollTrigger&&i.scrollTrigger.revert(),i.kill()):!(i instanceof ts)&&i.revert&&i.revert(e);n._r.forEach(function(t){return t(e,n)}),n.isReverted=!0})():this.data.forEach(function(e){return e.kill&&e.kill()}),this.clear(),t)for(var r=gs.length;r--;)gs[r].id===this.id&&gs.splice(r,1)},t.revert=function(e){this.kill(e||{})},e}(),ws=function(){function e(e){this.contexts=[],this.scope=e,R&&R.data.push(this)}var t=e.prototype;return t.add=function(e,t,n){pi(e)||(e={matches:e});var r=new Cs(0,n||this.scope),i=r.conditions={},a,o,s;for(o in R&&!r.selector&&(r.selector=R.selector),this.contexts.push(r),t=r.add(`onMatch`,t),r.queries=e,e)o===`all`?s=1:(a=Oi.matchMedia(e[o]),a&&(gs.indexOf(r)<0&&gs.push(r),(i[o]=a.matches)&&(s=1),a.addListener?a.addListener(Ss):a.addEventListener(`change`,Ss)));return s&&t(r,function(e){return r.add(null,e)}),this},t.revert=function(e){this.kill(e||{})},t.kill=function(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},e}(),Ts={registerPlugin:function(){[...arguments].forEach(function(e){return go(e)})},timeline:function(e){return new Vo(e)},getTweensOf:function(e,t){return V.getTweensOf(e,t)},getProperty:function(e,t,n,r){ui(e)&&(e=Ja(e)[0]);var i=Qi(e||{}).get,a=n?ca:sa;return n===`native`&&(n=``),e&&(t?a((Ki[t]&&Ki[t].get||i)(e,t,n,r)):function(t,n,r){return a((Ki[t]&&Ki[t].get||i)(e,t,n,r))})},quickSetter:function(e,t,n){if(e=Ja(e),e.length>1){var r=e.map(function(e){return ks.quickSetter(e,t,n)}),i=r.length;return function(e){for(var t=i;t--;)r[t](e)}}e=e[0]||{};var a=Ki[t],o=Qi(e),s=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(t){var r=new a;mo._pt=0,r.init(e,n?t+n:t,mo,0,[e]),r.render(1,r),mo._pt&&us(1,mo)}:o.set(e,s);return a?c:function(t){return c(e,s,n?t+n:t,o,1)}},quickTo:function(e,t,n){var r,i=ks.to(e,la((r={},r[t]=`+=0.1`,r.paused=!0,r.stagger=0,r),n||{})),a=function(e,n,r){return i.resetTo(t,e,n,r)};return a.tween=i,a},isTweening:function(e){return V.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Po(e.ease,ei.ease)),fa(ei,e||{})},config:function(e){return fa($r,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,i=e.defaults,a=e.extendTimeline;(r||``).split(`,`).forEach(function(e){return e&&!Ki[e]&&!ji[e]&&Ii(t+` effect requires `+e+` plugin.`)}),qi[t]=function(e,t,r){return n(Ja(e),la(t||{},i),r)},a&&(Vo.prototype[t]=function(e,n,r){return this.add(qi[t](e,pi(n)?n:(r=n)&&{},this),r)})},registerEase:function(e,t){W[e]=Po(t)},parseEase:function(e,t){return arguments.length?Po(e,t):W},getById:function(e){return V.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Vo(e),r,i;for(n.smoothChildTiming=mi(e.smoothChildTiming),V.remove(n),n._dp=0,n._time=n._tTime=V._time,r=V._first;r;)i=r._next,(t||!(!r._dur&&r instanceof ts&&r.vars.onComplete===r._targets[0]))&&ka(n,r,r._start-r._delay),r=i;return ka(V,n,0),n},context:function(e,t){return e?new Cs(e,t):R},matchMedia:function(e){return new ws(e)},matchMediaRefresh:function(){return gs.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||Ss()},addEventListener:function(e,t){var n=_s[e]||(_s[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=_s[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:ao,wrapYoyo:oo,distribute:Za,random:eo,snap:$a,normalize:ro,getUnit:Ua,clamp:Wa,splitColor:yo,toArray:Ja,selector:Ya,mapRange:co,pipe:to,unitize:no,interpolate:lo,shuffle:Xa},install:Pi,effects:qi,ticker:Eo,updateRoot:Vo.updateRoot,plugins:Ki,globalTimeline:V,core:{PropTween:hs,globals:Li,Tween:ts,Timeline:Vo,Animation:Bo,getCache:Qi,_removeLinkedListItem:_a,reverting:function(){return ni},context:function(e){return e&&R&&(R.data.push(e),e._ctx=R),R},suppressOverwrites:function(e){return ti=e}}};ea(`to,from,fromTo,delayedCall,set,killTweensOf`,function(e){return Ts[e]=ts[e]}),Eo.add(Vo.updateRoot),mo=Ts.to({},{duration:0});var Es=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},Ds=function(e,t){var n=e._targets,r,i,a;for(r in t)for(i=n.length;i--;)a=e._ptLookup[i][r],(a&&=a.d)&&(a._pt&&(a=Es(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[i],r))},Os=function(e,t){return{name:e,headless:1,rawVars:1,init:function(e,n,r){r._onInit=function(e){var r,i;if(ui(n)&&(r={},ea(n,function(e){return r[e]=1}),n=r),t){for(i in r={},n)r[i]=t(n[i]);n=r}Ds(e,n)}}}},ks=Ts.registerPlugin({name:`attr`,init:function(e,t,n,r,i){var a,o,s;for(a in this.tween=n,t)s=e.getAttribute(a)||``,o=this.add(e,`setAttribute`,(s||0)+``,t[a],r,i,0,0,a),o.op=a,o.b=s,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)ni?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:`endArray`,headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Os(`roundProps`,Qa),Os(`modifiers`),Os(`snap`,$a))||Ts;ts.version=Vo.version=ks.version=`3.15.0`,Ni=1,hi()&&Do(),W.Power0,W.Power1,W.Power2,W.Power3,W.Power4,W.Linear,W.Quad,W.Cubic,W.Quart,W.Quint,W.Strong,W.Elastic,W.Back,W.SteppedEase,W.Bounce,W.Sine,W.Expo,W.Circ;var As,js,Ms,Ns,Ps,Fs,Is,Ls=function(){return typeof window<`u`},Rs={},zs=180/Math.PI,Bs=Math.PI/180,Vs=Math.atan2,Hs=1e8,Us=/([A-Z])/g,Ws=/(left|right|width|margin|padding|x)/i,Gs=/[\s,\(]\S/,Ks={autoAlpha:`opacity,visibility`,scale:`scaleX,scaleY`,alpha:`opacity`},qs=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Js=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Ys=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Xs=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Zs=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Qs=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},$s=function(e,t){return t.set(t.t,t.p,e===1?t.e:t.b,t)},ec=function(e,t,n){return e.style[t]=n},tc=function(e,t,n){return e.style.setProperty(t,n)},nc=function(e,t,n){return e._gsap[t]=n},rc=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},ic=function(e,t,n,r,i){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(i,a)},ac=function(e,t,n,r,i){var a=e._gsap;a[t]=n,a.renderTransform(i,a)},G=`transform`,oc=G+`Origin`,sc=function e(t,n){var r=this,i=this.target,a=i.style,o=i._gsap;if(t in Rs&&a){if(this.tfm=this.tfm||{},t!==`transform`)t=Ks[t]||t,~t.indexOf(`,`)?t.split(`,`).forEach(function(e){return r.tfm[e]=Ec(i,e)}):this.tfm[t]=o.x?o[t]:Ec(i,t),t===oc&&(this.tfm.zOrigin=o.zOrigin);else return Ks.transform.split(`,`).forEach(function(t){return e.call(r,t,n)});if(this.props.indexOf(G)>=0)return;o.svg&&(this.svgo=i.getAttribute(`data-svg-origin`),this.props.push(oc,n,``)),t=G}(a||n)&&this.props.push(t,n,a[t])},cc=function(e){e.translate&&(e.removeProperty(`translate`),e.removeProperty(`scale`),e.removeProperty(`rotate`))},lc=function(){for(var e=this.props,t=this.target,n=t.style,r=t._gsap,i=0,a;i<e.length;i+=3)e[i+1]?e[i+1]===2?t[e[i]](e[i+2]):t[e[i]]=e[i+2]:e[i+2]?n[e[i]]=e[i+2]:n.removeProperty(e[i].substr(0,2)===`--`?e[i]:e[i].replace(Us,`-$1`).toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute(`data-svg-origin`,this.svgo||``)),i=Is(),(!i||!i.isStart)&&!n[G]&&(cc(n),r.zOrigin&&n[oc]&&(n[oc]+=` `+r.zOrigin+`px`,r.zOrigin=0,r.renderTransform()),r.uncache=1)}},uc=function(e,t){var n={target:e,props:[],revert:lc,save:sc};return e._gsap||ks.core.getCache(e),t&&e.style&&e.nodeType&&t.split(`,`).forEach(function(e){return n.save(e)}),n},dc,fc=function(e,t){var n=js.createElementNS?js.createElementNS((t||`http://www.w3.org/1999/xhtml`).replace(/^https/,`http`),e):js.createElement(e);return n&&n.style?n:js.createElement(e)},pc=function e(t,n,r){var i=getComputedStyle(t);return i[n]||i.getPropertyValue(n.replace(Us,`-$1`).toLowerCase())||i.getPropertyValue(n)||!r&&e(t,hc(n)||n,1)||``},mc=`O,Moz,ms,Ms,Webkit`.split(`,`),hc=function(e,t,n){var r=(t||Ps).style,i=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);i--&&!(mc[i]+e in r););return i<0?null:(i===3?`ms`:i>=0?mc[i]:``)+e},gc=function(){Ls()&&window.document&&(As=window,js=As.document,Ms=js.documentElement,Ps=fc(`div`)||{style:{}},fc(`div`),G=hc(G),oc=G+`Origin`,Ps.style.cssText=`border-width:0;line-height:0;position:absolute;padding:0`,dc=!!hc(`perspective`),Is=ks.core.reverting,Ns=1)},_c=function(e){var t=e.ownerSVGElement,n=fc(`svg`,t&&t.getAttribute(`xmlns`)||`http://www.w3.org/2000/svg`),r=e.cloneNode(!0),i;r.style.display=`block`,n.appendChild(r),Ms.appendChild(n);try{i=r.getBBox()}catch{}return n.removeChild(r),Ms.removeChild(n),i},vc=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},yc=function(e){var t,n;try{t=e.getBBox()}catch{t=_c(e),n=1}return t&&(t.width||t.height)||n||(t=_c(e)),t&&!t.width&&!t.x&&!t.y?{x:+vc(e,[`x`,`cx`,`x1`])||0,y:+vc(e,[`y`,`cy`,`y1`])||0,width:0,height:0}:t},bc=function(e){return!(!e.getCTM||e.parentNode&&!e.ownerSVGElement||!yc(e))},xc=function(e,t){if(t){var n=e.style,r;t in Rs&&t!==oc&&(t=G),n.removeProperty?(r=t.substr(0,2),(r===`ms`||t.substr(0,6)===`webkit`)&&(t=`-`+t),n.removeProperty(r===`--`?t:t.replace(Us,`-$1`).toLowerCase())):n.removeAttribute(t)}},Sc=function(e,t,n,r,i,a){var o=new hs(e._pt,t,n,0,1,a?$s:Qs);return e._pt=o,o.b=r,o.e=i,e._props.push(n),o},Cc={deg:1,rad:1,turn:1},wc={grid:1,flex:1},Tc=function e(t,n,r,i){var a=parseFloat(r)||0,o=(r+``).trim().substr((a+``).length)||`px`,s=Ps.style,c=Ws.test(n),l=t.tagName.toLowerCase()===`svg`,u=(l?`client`:`offset`)+(c?`Width`:`Height`),d=100,f=i===`px`,p=i===`%`,m,h,g,_;if(i===o||!a||Cc[i]||Cc[o])return a;if(o!==`px`&&!f&&(a=e(t,n,r,`px`)),_=t.getCTM&&bc(t),(p||o===`%`)&&(Rs[n]||~n.indexOf(`adius`)))return m=_?t.getBBox()[c?`width`:`height`]:t[u],ta(p?a/m*d:a/100*m);if(s[c?`width`:`height`]=d+(f?o:i),h=i!==`rem`&&~n.indexOf(`adius`)||i===`em`&&t.appendChild&&!l?t:t.parentNode,_&&(h=(t.ownerSVGElement||{}).parentNode),(!h||h===js||!h.appendChild)&&(h=js.body),g=h._gsap,g&&p&&g.width&&c&&g.time===Eo.time&&!g.uncache)return ta(a/g.width*d);if(p&&(n===`height`||n===`width`)){var v=t.style[n];t.style[n]=d+i,m=t[u],v?t.style[n]=v:xc(t,n)}else(p||o===`%`)&&!wc[pc(h,`display`)]&&(s.position=pc(t,`position`)),h===t&&(s.position=`static`),h.appendChild(Ps),m=Ps[u],h.removeChild(Ps),s.position=`absolute`;return c&&p&&(g=Qi(h),g.time=Eo.time,g.width=h[u]),ta(f?m*a/d:m&&a?d/m*a:0)},Ec=function(e,t,n,r){var i;return Ns||gc(),t in Ks&&t!==`transform`&&(t=Ks[t],~t.indexOf(`,`)&&(t=t.split(`,`)[0])),Rs[t]&&t!==`transform`?(i=Rc(e,r),i=t===`transformOrigin`?i.svg?i.origin:zc(pc(e,oc))+` `+i.zOrigin+`px`:i[t]):(i=e.style[t],(!i||i===`auto`||r||~(i+``).indexOf(`calc(`))&&(i=jc[t]&&jc[t](e,t,n)||pc(e,t)||$i(e,t)||+(t===`opacity`))),n&&!~(i+``).trim().indexOf(` `)?Tc(e,t,i,n)+n:i},Dc=function(e,t,n,r){if(!n||n===`none`){var i=hc(t,e,1),a=i&&pc(e,i,1);a&&a!==n?(t=i,n=a):t===`borderColor`&&(n=pc(e,`borderTopColor`))}var o=new hs(this._pt,e.style,t,0,1,ls),s=0,c=0,l,u,d,f,p,m,h,g,_,v,y,b;if(o.b=n,o.e=r,n+=``,r+=``,r.substring(0,6)===`var(--`&&(r=pc(e,r.substring(4,r.indexOf(`)`)))),r===`auto`&&(m=e.style[t],e.style[t]=r,r=pc(e,t)||r,m?e.style[t]=m:xc(e,t)),l=[n,r],wo(l),n=l[0],r=l[1],d=n.match(Ci)||[],b=r.match(Ci)||[],b.length){for(;u=Ci.exec(r);)h=u[0],_=r.substring(s,u.index),p?p=(p+1)%5:(_.substr(-5)===`rgba(`||_.substr(-5)===`hsla(`)&&(p=1),h!==(m=d[c++]||``)&&(f=parseFloat(m)||0,y=m.substr((f+``).length),h.charAt(1)===`=`&&(h=na(f,h)+y),g=parseFloat(h),v=h.substr((g+``).length),s=Ci.lastIndex-v.length,v||(v=v||$r.units[t]||y,s===r.length&&(r+=v,o.e+=v)),y!==v&&(f=Tc(e,t,m,v)||0),o._pt={_next:o._pt,p:_||c===1?_:`,`,s:f,c:g-f,m:p&&p<4||t===`zIndex`?Math.round:0});o.c=s<r.length?r.substring(s,r.length):``}else o.r=t===`display`&&r===`none`?$s:Qs;return Ti.test(r)&&(o.e=0),this._pt=o,o},Oc={top:`0%`,bottom:`100%`,left:`0%`,right:`100%`,center:`50%`},kc=function(e){var t=e.split(` `),n=t[0],r=t[1]||`50%`;return(n===`top`||n===`bottom`||r===`left`||r===`right`)&&(e=n,n=r,r=e),t[0]=Oc[n]||n,t[1]=Oc[r]||r,t.join(` `)},Ac=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,i=t.u,a=n._gsap,o,s,c;if(i===`all`||i===!0)r.cssText=``,s=1;else for(i=i.split(`,`),c=i.length;--c>-1;)o=i[c],Rs[o]&&(s=1,o=o===`transformOrigin`?oc:G),xc(n,o);s&&(xc(n,G),a&&(a.svg&&n.removeAttribute(`transform`),r.scale=r.rotate=r.translate=`none`,Rc(n,1),a.uncache=1,cc(r)))}},jc={clearProps:function(e,t,n,r,i){if(i.data!==`isFromStart`){var a=e._pt=new hs(e._pt,t,n,0,0,Ac);return a.u=r,a.pr=-10,a.tween=i,e._props.push(n),1}}},Mc=[1,0,0,1,0,0],Nc={},Pc=function(e){return e===`matrix(1, 0, 0, 1, 0, 0)`||e===`none`||!e},Fc=function(e){var t=pc(e,G);return Pc(t)?Mc:t.substr(7).match(Si).map(ta)},Ic=function(e,t){var n=e._gsap||Qi(e),r=e.style,i=Fc(e),a,o,s,c;return n.svg&&e.getAttribute(`transform`)?(s=e.transform.baseVal.consolidate().matrix,i=[s.a,s.b,s.c,s.d,s.e,s.f],i.join(`,`)===`1,0,0,1,0,0`?Mc:i):(i===Mc&&!e.offsetParent&&e!==Ms&&!n.svg&&(s=r.display,r.display=`block`,a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,Ms.appendChild(e)),i=Fc(e),s?r.display=s:xc(e,`display`),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):Ms.removeChild(e))),t&&i.length>6?[i[0],i[1],i[4],i[5],i[12],i[13]]:i)},Lc=function(e,t,n,r,i,a){var o=e._gsap,s=i||Ic(e,!0),c=o.xOrigin||0,l=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,f=s[0],p=s[1],m=s[2],h=s[3],g=s[4],_=s[5],v=t.split(` `),y=parseFloat(v[0])||0,b=parseFloat(v[1])||0,x,S,C,w;n?s!==Mc&&(S=f*h-p*m)&&(C=h/S*y+b*(-m/S)+(m*_-h*g)/S,w=y*(-p/S)+f/S*b-(f*_-p*g)/S,y=C,b=w):(x=yc(e),y=x.x+(~v[0].indexOf(`%`)?y/100*x.width:y),b=x.y+(~(v[1]||v[0]).indexOf(`%`)?b/100*x.height:b)),r||r!==!1&&o.smooth?(g=y-c,_=b-l,o.xOffset=u+(g*f+_*m)-g,o.yOffset=d+(g*p+_*h)-_):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=b,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[oc]=`0px 0px`,a&&(Sc(a,o,`xOrigin`,c,y),Sc(a,o,`yOrigin`,l,b),Sc(a,o,`xOffset`,u,o.xOffset),Sc(a,o,`yOffset`,d,o.yOffset)),e.setAttribute(`data-svg-origin`,y+` `+b)},Rc=function(e,t){var n=e._gsap||new zo(e);if(`x`in n&&!t&&!n.uncache)return n;var r=e.style,i=n.scaleX<0,a=`px`,o=`deg`,s=getComputedStyle(e),c=pc(e,oc)||`0`,l=u=d=m=h=g=_=v=y=0,u,d,f=p=1,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,ee,te,ne,re,O,ie,ae,oe,se,ce,le,ue,de;return n.svg=!!(e.getCTM&&bc(e)),s.translate&&((s.translate!==`none`||s.scale!==`none`||s.rotate!==`none`)&&(r[G]=(s.translate===`none`?``:`translate3d(`+(s.translate+` 0 0`).split(` `).slice(0,3).join(`, `)+`) `)+(s.rotate===`none`?``:`rotate(`+s.rotate+`) `)+(s.scale===`none`?``:`scale(`+s.scale.split(` `).join(`,`)+`) `)+(s[G]===`none`?``:s[G])),r.scale=r.rotate=r.translate=`none`),S=Ic(e,n.svg),n.svg&&(n.uncache?(ie=e.getBBox(),c=n.xOrigin-ie.x+`px `+(n.yOrigin-ie.y)+`px`,O=``):O=!t&&e.getAttribute(`data-svg-origin`),Lc(e,O||c,!!O||n.originIsAbsolute,n.smooth!==!1,S)),b=n.xOrigin||0,x=n.yOrigin||0,S!==Mc&&(E=S[0],D=S[1],ee=S[2],te=S[3],l=ne=S[4],u=re=S[5],S.length===6?(f=Math.sqrt(E*E+D*D),p=Math.sqrt(te*te+ee*ee),m=E||D?Vs(D,E)*zs:0,_=ee||te?Vs(ee,te)*zs+m:0,_&&(p*=Math.abs(Math.cos(_*Bs))),n.svg&&(l-=b-(b*E+x*ee),u-=x-(b*D+x*te))):(de=S[6],le=S[7],oe=S[8],se=S[9],ce=S[10],ue=S[11],l=S[12],u=S[13],d=S[14],C=Vs(de,ce),h=C*zs,C&&(w=Math.cos(-C),T=Math.sin(-C),O=ne*w+oe*T,ie=re*w+se*T,ae=de*w+ce*T,oe=ne*-T+oe*w,se=re*-T+se*w,ce=de*-T+ce*w,ue=le*-T+ue*w,ne=O,re=ie,de=ae),C=Vs(-ee,ce),g=C*zs,C&&(w=Math.cos(-C),T=Math.sin(-C),O=E*w-oe*T,ie=D*w-se*T,ae=ee*w-ce*T,ue=te*T+ue*w,E=O,D=ie,ee=ae),C=Vs(D,E),m=C*zs,C&&(w=Math.cos(C),T=Math.sin(C),O=E*w+D*T,ie=ne*w+re*T,D=D*w-E*T,re=re*w-ne*T,E=O,ne=ie),h&&Math.abs(h)+Math.abs(m)>359.9&&(h=m=0,g=180-g),f=ta(Math.sqrt(E*E+D*D+ee*ee)),p=ta(Math.sqrt(re*re+de*de)),C=Vs(ne,re),_=Math.abs(C)>2e-4?C*zs:0,y=ue?1/(ue<0?-ue:ue):0),n.svg&&(O=e.getAttribute(`transform`),n.forceCSS=e.setAttribute(`transform`,``)||!Pc(pc(e,G)),O&&e.setAttribute(`transform`,O))),Math.abs(_)>90&&Math.abs(_)<270&&(i?(f*=-1,_+=m<=0?180:-180,m+=m<=0?180:-180):(p*=-1,_+=_<=0?180:-180)),t||=n.uncache,n.x=l-((n.xPercent=l&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-l)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=ta(f),n.scaleY=ta(p),n.rotation=ta(m)+o,n.rotationX=ta(h)+o,n.rotationY=ta(g)+o,n.skewX=_+o,n.skewY=v+o,n.transformPerspective=y+a,(n.zOrigin=parseFloat(c.split(` `)[2])||!t&&n.zOrigin||0)&&(r[oc]=zc(c)),n.xOffset=n.yOffset=0,n.force3D=$r.force3D,n.renderTransform=n.svg?Kc:dc?Gc:Vc,n.uncache=0,n},zc=function(e){return(e=e.split(` `))[0]+` `+e[1]},Bc=function(e,t,n){var r=Ua(t);return ta(parseFloat(t)+parseFloat(Tc(e,`x`,n+`px`,r)))+r},Vc=function(e,t){t.z=`0px`,t.rotationY=t.rotationX=`0deg`,t.force3D=0,Gc(e,t)},Hc=`0deg`,Uc=`0px`,Wc=`) `,Gc=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.z,c=n.rotation,l=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,p=n.scaleX,m=n.scaleY,h=n.transformPerspective,g=n.force3D,_=n.target,v=n.zOrigin,y=``,b=g===`auto`&&e&&e!==1||g===!0;if(v&&(u!==Hc||l!==Hc)){var x=parseFloat(l)*Bs,S=Math.sin(x),C=Math.cos(x),w;x=parseFloat(u)*Bs,w=Math.cos(x),a=Bc(_,a,S*w*-v),o=Bc(_,o,-Math.sin(x)*-v),s=Bc(_,s,C*w*-v+v)}h!==Uc&&(y+=`perspective(`+h+Wc),(r||i)&&(y+=`translate(`+r+`%, `+i+`%) `),(b||a!==Uc||o!==Uc||s!==Uc)&&(y+=s!==Uc||b?`translate3d(`+a+`, `+o+`, `+s+`) `:`translate(`+a+`, `+o+Wc),c!==Hc&&(y+=`rotate(`+c+Wc),l!==Hc&&(y+=`rotateY(`+l+Wc),u!==Hc&&(y+=`rotateX(`+u+Wc),(d!==Hc||f!==Hc)&&(y+=`skew(`+d+`, `+f+Wc),(p!==1||m!==1)&&(y+=`scale(`+p+`, `+m+Wc),_.style[G]=y||`translate(0, 0)`},Kc=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.rotation,c=n.skewX,l=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,p=n.xOrigin,m=n.yOrigin,h=n.xOffset,g=n.yOffset,_=n.forceCSS,v=parseFloat(a),y=parseFloat(o),b,x,S,C,w;s=parseFloat(s),c=parseFloat(c),l=parseFloat(l),l&&(l=parseFloat(l),c+=l,s+=l),s||c?(s*=Bs,c*=Bs,b=Math.cos(s)*u,x=Math.sin(s)*u,S=Math.sin(s-c)*-d,C=Math.cos(s-c)*d,c&&(l*=Bs,w=Math.tan(c-l),w=Math.sqrt(1+w*w),S*=w,C*=w,l&&(w=Math.tan(l),w=Math.sqrt(1+w*w),b*=w,x*=w)),b=ta(b),x=ta(x),S=ta(S),C=ta(C)):(b=u,C=d,x=S=0),(v&&!~(a+``).indexOf(`px`)||y&&!~(o+``).indexOf(`px`))&&(v=Tc(f,`x`,a,`px`),y=Tc(f,`y`,o,`px`)),(p||m||h||g)&&(v=ta(v+p-(p*b+m*S)+h),y=ta(y+m-(p*x+m*C)+g)),(r||i)&&(w=f.getBBox(),v=ta(v+r/100*w.width),y=ta(y+i/100*w.height)),w=`matrix(`+b+`,`+x+`,`+S+`,`+C+`,`+v+`,`+y+`)`,f.setAttribute(`transform`,w),_&&(f.style[G]=w)},qc=function(e,t,n,r,i){var a=360,o=ui(i),s=parseFloat(i)*(o&&~i.indexOf(`rad`)?zs:1)-r,c=r+s+`deg`,l,u;return o&&(l=i.split(`_`)[1],l===`short`&&(s%=a,s!==s%(a/2)&&(s+=s<0?a:-a)),l===`cw`&&s<0?s=(s+a*Hs)%a-~~(s/a)*a:l===`ccw`&&s>0&&(s=(s-a*Hs)%a-~~(s/a)*a)),e._pt=u=new hs(e._pt,t,n,r,s,Js),u.e=c,u.u=`deg`,e._props.push(n),u},Jc=function(e,t){for(var n in t)e[n]=t[n];return e},Yc=function(e,t,n){var r=Jc({},n._gsap),i=`perspective,force3D,transformOrigin,svgOrigin`,a=n.style,o,s,c,l,u,d,f,p;for(s in r.svg?(c=n.getAttribute(`transform`),n.setAttribute(`transform`,``),a[G]=t,o=Rc(n,1),xc(n,G),n.setAttribute(`transform`,c)):(c=getComputedStyle(n)[G],a[G]=t,o=Rc(n,1),a[G]=c),Rs)c=r[s],l=o[s],c!==l&&i.indexOf(s)<0&&(f=Ua(c),p=Ua(l),u=f===p?parseFloat(c):Tc(n,s,c,p),d=parseFloat(l),e._pt=new hs(e._pt,o,s,u,d-u,qs),e._pt.u=p||0,e._props.push(s));Jc(o,r)};ea(`padding,margin,Width,Radius`,function(e,t){var n=`Top`,r=`Right`,i=`Bottom`,a=`Left`,o=(t<3?[n,r,i,a]:[n+a,n+r,i+r,i+a]).map(function(n){return t<2?e+n:`border`+n+e});jc[t>1?`border`+e:e]=function(e,t,n,r,i){var a,s;if(arguments.length<4)return a=o.map(function(t){return Ec(e,t,n)}),s=a.join(` `),s.split(a[0]).length===5?a[0]:s;a=(r+``).split(` `),s={},o.forEach(function(e,t){return s[e]=a[t]=a[t]||a[(t-1)/2|0]}),e.init(t,s,i)}});var Xc={name:`css`,register:gc,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,i){var a=this._props,o=e.style,s=n.vars.startAt,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;for(m in Ns||gc(),this.styles=this.styles||uc(e),C=this.styles.props,this.tween=n,t)if(m!==`autoRound`&&(l=t[m],!(Ki[m]&&Go(m,t,n,r,e,i)))){if(f=typeof l,p=jc[m],f===`function`&&(l=l.call(n,r,e,i),f=typeof l),f===`string`&&~l.indexOf(`random(`)&&(l=so(l)),p)p(this,e,m,l,n)&&(S=1);else if(m.substr(0,2)===`--`)c=(getComputedStyle(e).getPropertyValue(m)+``).trim(),l+=``,So.lastIndex=0,So.test(c)||(h=Ua(c),g=Ua(l),g?h!==g&&(c=Tc(e,m,c,g)+g):h&&(l+=h)),this.add(o,`setProperty`,c,l,r,i,0,0,m),a.push(m),C.push(m,0,o[m]);else if(f!==`undefined`){if(s&&m in s?(c=typeof s[m]==`function`?s[m].call(n,r,e,i):s[m],ui(c)&&~c.indexOf(`random(`)&&(c=so(c)),Ua(c+``)||c===`auto`||(c+=$r.units[m]||Ua(Ec(e,m))||``),(c+``).charAt(1)===`=`&&(c=Ec(e,m))):c=Ec(e,m),d=parseFloat(c),_=f===`string`&&l.charAt(1)===`=`&&l.substr(0,2),_&&(l=l.substr(2)),u=parseFloat(l),m in Ks&&(m===`autoAlpha`&&(d===1&&Ec(e,`visibility`)===`hidden`&&u&&(d=0),C.push(`visibility`,0,o.visibility),Sc(this,o,`visibility`,d?`inherit`:`hidden`,u?`inherit`:`hidden`,!u)),m!==`scale`&&m!==`transform`&&(m=Ks[m],~m.indexOf(`,`)&&(m=m.split(`,`)[0]))),v=m in Rs,v){if(this.styles.save(m),w=l,f===`string`&&l.substring(0,6)===`var(--`){if(l=pc(e,l.substring(4,l.indexOf(`)`))),l.substring(0,5)===`calc(`){var T=e.style.perspective;e.style.perspective=l,l=pc(e,`perspective`),T?e.style.perspective=T:xc(e,`perspective`)}u=parseFloat(l)}if(y||(b=e._gsap,b.renderTransform&&!t.parseTransform||Rc(e,t.parseTransform),x=t.smoothOrigin!==!1&&b.smooth,y=this._pt=new hs(this._pt,o,G,0,1,b.renderTransform,b,0,-1),y.dep=1),m===`scale`)this._pt=new hs(this._pt,b,`scaleY`,b.scaleY,(_?na(b.scaleY,_+u):u)-b.scaleY||0,qs),this._pt.u=0,a.push(`scaleY`,m),m+=`X`;else if(m===`transformOrigin`){C.push(oc,0,o[oc]),l=kc(l),b.svg?Lc(e,l,0,x,0,this):(g=parseFloat(l.split(` `)[2])||0,g!==b.zOrigin&&Sc(this,b,`zOrigin`,b.zOrigin,g),Sc(this,o,m,zc(c),zc(l)));continue}else if(m===`svgOrigin`){Lc(e,l,1,x,0,this);continue}else if(m in Nc){qc(this,b,m,d,_?na(d,_+l):l);continue}else if(m===`smoothOrigin`){Sc(this,b,`smooth`,b.smooth,l);continue}else if(m===`force3D`){b[m]=l;continue}else if(m===`transform`){Yc(this,l,e);continue}}else m in o||(m=hc(m)||m);if(v||(u||u===0)&&(d||d===0)&&!Gs.test(l)&&m in o)h=(c+``).substr((d+``).length),u||=0,g=Ua(l)||(m in $r.units?$r.units[m]:h),h!==g&&(d=Tc(e,m,c,g)),this._pt=new hs(this._pt,v?b:o,m,d,(_?na(d,_+u):u)-d,!v&&(g===`px`||m===`zIndex`)&&t.autoRound!==!1?Zs:qs),this._pt.u=g||0,v&&w!==l?(this._pt.b=c,this._pt.e=w,this._pt.r=Xs):h!==g&&g!==`%`&&(this._pt.b=c,this._pt.r=Ys);else if(m in o)Dc.call(this,e,m,c,_?_+l:l);else if(m in e)this.add(e,m,c||e[m],_?_+l:l,r,i);else if(m!==`parseTransform`){Fi(m,l);continue}v||(m in o?C.push(m,0,o[m]):typeof e[m]==`function`?C.push(m,2,e[m]()):C.push(m,1,c||e[m])),a.push(m)}}S&&ms(this)},render:function(e,t){if(t.tween._time||!Is())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Ec,aliases:Ks,getSetter:function(e,t,n){var r=Ks[t];return r&&r.indexOf(`,`)<0&&(t=r),t in Rs&&t!==oc&&(e._gsap.x||Ec(e,`x`))?n&&Fs===n?t===`scale`?rc:nc:(Fs=n||{})&&(t===`scale`?ic:ac):e.style&&!fi(e.style[t])?ec:~t.indexOf(`-`)?tc:os(e,t)},core:{_removeProperty:xc,_getMatrix:Ic}};ks.utils.checkPrefix=hc,ks.core.getStyleSaver=uc,(function(e,t,n,r){var i=ea(e+`,`+t+`,`+n,function(e){Rs[e]=1});ea(t,function(e){$r.units[e]=`deg`,Nc[e]=1}),Ks[i[13]]=e+`,`+t,ea(r,function(e){var t=e.split(`:`);Ks[t[1]]=i[t[0]]})})(`x,y,z,scale,scaleX,scaleY,xPercent,yPercent`,`rotation,rotationX,rotationY,skewX,skewY`,`transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective`,`0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY`),ea(`x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective`,function(e){$r.units[e]=`px`}),ks.registerPlugin(Xc);var Zc=ks.registerPlugin(Xc)||ks;Zc.core.Tween,Zc.defaults({duration:.32,ease:`power2.out`});var Qc=window.matchMedia(`(prefers-reduced-motion: reduce)`),$c=()=>!Qc.matches;function el(){document.documentElement.classList.toggle(`reduce-motion`,!$c())}Qc.addEventListener(`change`,el);var tl=[`.language`,`.welcome`,`.step-options`,`.options`,`.med-list`,`.section`,`.tiles`,`.entries`,`.coming`,`.episode-started`,`.profile-section`,`.form-stack`,`.stack`,`.intensity-list`,`.sym-rows`].join(`,`);function nl(e){let t=[];for(let n of e.children)n.matches(`legend, .visually-hidden`)||(n.matches(tl)?t.push(...nl(n)):t.push(n));return t}var rl=0,il=null;function al(e){let t=e.querySelector(`.screen`);if(!t)return;let n=t.querySelectorAll(`.progress__seg.is-done`),r=t.querySelector(`.tabbar__item[aria-current]`),i=rl,a=il;if(rl=n.length,il=r?.getAttribute(`href`)??null,!$c())return;let o=t.querySelector(`.screen__body`),s=o?nl(o):[];Zc.from(s,{opacity:0,y:10,duration:.4,stagger:Math.min(.05,.4/Math.max(s.length,1)),clearProps:`transform,opacity`});let c=t.querySelectorAll(`.screen__footer > *`);c.length&&Zc.from(c,{opacity:0,delay:.12,stagger:.05,clearProps:`opacity`}),n.length>i&&Zc.from([...n].slice(i),{scaleX:0,transformOrigin:`left center`,duration:.45,ease:`power2.inOut`,clearProps:`transform`}),r&&a!==il&&Zc.from(r.querySelector(`.tabbar__icon`),{scaleX:.5,autoAlpha:0,duration:.28,clearProps:`all`});let l=t.querySelector(`.episode-started .icon-badge`);l&&Zc.from(l,{scale:.7,duration:.5,ease:`back.out(1.4)`,clearProps:`transform`})}function ol(e){if(!$c()||!e.checked)return;let t=e.closest(`.option`)?.querySelector(`.option__control`);t&&Zc.fromTo(t,{scale:.75},{scale:1,duration:.3,ease:`back.out(2)`,clearProps:`transform`})}function sl(e){$c()&&e&&Zc.from(e,{autoAlpha:0,y:-6,duration:.3,clearProps:`transform,opacity,visibility`})}function cl(e){return!$c()||!e?Promise.resolve():new Promise(t=>{Zc.to(e,{autoAlpha:0,scale:.98,duration:.22,ease:`power1.in`,onComplete:t})})}function ll(e){$c()&&Zc.from(e,{autoAlpha:0,y:12,duration:.28,clearProps:`transform,opacity,visibility`})}function ul(e,t){if(!$c())return t();Zc.to(e,{autoAlpha:0,y:8,duration:.2,ease:`power1.in`,onComplete:t})}function dl(e){$c()&&Zc.fromTo(e,{opacity:0,y:8,scale:.97},{opacity:1,y:0,scale:1,duration:.25,clearProps:`transform,opacity`})}var fl=[`light`,`dark`,`system`],pl=window.matchMedia(`(prefers-color-scheme: dark)`),ml=`system`;function hl(e=ml){ml=fl.includes(e)?e:`system`;let t=ml===`system`?pl.matches?`dark`:`light`:ml;document.documentElement.dataset.theme=t;let n=getComputedStyle(document.documentElement).getPropertyValue(`--color-bg`).trim();document.querySelector(`meta[name="theme-color"]`)?.setAttribute(`content`,n)}pl.addEventListener(`change`,()=>{ml===`system`&&hl()});var gl=null,_l=0,vl=()=>_l>0;async function yl(e){_l+=1;try{return await e()}finally{--_l}}function bl(e){Yt(e),Gr(P().language??ht()??`sk`),hl(P().theme),el(),gr(),an()&&P().demoEnabled&&P().demoSeededAt!==k()&&_r(Br(new Date,Kr()))}function xl(){pt()?(Gr(ht()??`sk`),hl(gt()??`system`),el()):bl(Ot())}var Sl=()=>mt();function Cl(e){pt()&&(gl=e&&e!==`/lock`?e:gl,Ft(),Xt())}function wl(){Cl(`/today`),a(`/lock`,{replace:!0})}function Tl(e){e&&e!==`/lock`&&(gl=e)}function El(){let e=gl??`/today`;return gl=null,e}function Dl(){on(),P().demoEnabled&&_r(Br(new Date,Kr())),a(`/today`,{replace:!0})}var Ol=`openweather`,kl=`643a83902695d6996a8b0ea69776c634`,Al=`https://api.openweathermap.org/data/2.5/weather`,jl=`https://api.openweathermap.org/data/2.5/forecast`,Ml=6,Nl=108e5,Pl=864e5,Fl=e=>Math.round(e*10)/10;function Il(e){return e>=200&&e<300?`storm`:e>=600&&e<700?`snow`:e>=700&&e<800?`fog`:e===800?`clear`:e===801||e===802?`partly`:e>802?`cloudy`:`rain`}var Ll=[`clear`,`partly`,`cloudy`,`fog`,`rain`,`snow`,`storm`],Rl=(e,t=k())=>!!e.forecast&&e.date<t,zl=({latitude:e,longitude:t})=>({lat:Fl(e),lon:Fl(t)});async function Bl({ask:e=!0}={}){return Ue()?zl(await(e?yl(()=>We({ask:e})):We({ask:e}))):new Promise((e,t)=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(({coords:t})=>e(zl(t)),e=>t(Error(e.code===e.PERMISSION_DENIED?`denied`:`unavailable`)),{enableHighAccuracy:!1,maximumAge:6e5,timeout:15e3}):t(Error(`unavailable`))})}async function Vl({lat:e,lon:t}){try{if(p.isNativePlatform()||(await navigator.permissions?.query({name:`geolocation`}))?.state===`granted`)return await Bl({ask:!1})}catch{}return{lat:e,lon:t}}var Hl=e=>e.reduce((e,t)=>e+t,0)/e.length,Ul=e=>Math.round(e*10)/10,Wl=(e,t)=>({pressure:e.main?.sea_level??e.main?.pressure??null,temp:e.main?.temp??null,humidity:e.main?.humidity??null,precipitation:(e.rain?.[t]??0)+(e.snow?.[t]??0),condition:e.weather?.[0]?.id==null?null:Il(e.weather[0].id)});function Gl(e,t,n=k()){let r=t.city?.timezone??e.timezone??0,i=new Map([[n,[Wl(e,`1h`)]]]);for(let e of t.list){let t=new Date((e.dt+r)*1e3).toISOString().slice(0,10);t>=n&&i.set(t,[...i.get(t)??[],Wl(e,`3h`)])}let a=[];for(let[e,t]of i){let r=t.filter(e=>e.pressure!=null&&e.temp!=null&&e.condition!=null);if(!r.length||e>n&&r.length<Ml)continue;let i=r.map(e=>e.temp),o=r.map(e=>e.humidity).filter(e=>e!=null);a.push({date:e,pressure:Ul(Hl(r.map(e=>e.pressure))),pressureChange:null,tempMin:Math.round(Math.min(...i)),tempMax:Math.round(Math.max(...i)),humidity:o.length?Math.round(Hl(o)):null,precipitation:Ul(r.reduce((e,t)=>e+t.precipitation,0)),condition:e===n?r[0].condition:r.map(e=>e.condition).sort((e,t)=>Ll.indexOf(t)-Ll.indexOf(e))[0],forecast:e>n,source:Ol})}return a}async function Kl(e,t){let n=await fetch(`${e}?${new URLSearchParams(t)}`);if(n.status===401)throw Error(`setup`);if(!n.ok)throw Error(`network`);return n.json()}function ql(e,t){let n=[...e].sort((e,t)=>e.date.localeCompare(t.date));return n.map((e,r)=>{let i=r?n[r-1]:null,a=i&&k(j(A(i.date),1))===e.date?i.pressure:t(e.date);return{...e,pressureChange:a==null?null:Ul(e.pressure-a)}})}async function Jl({lat:e,lon:t}){let n={lat:String(e),lon:String(t),units:`metric`,appid:kl},[r,i]=await Promise.all([Kl(Al,n),Kl(jl,n)]),a=k(),o=Gl(r,i,a),s=tr(a),c=o.find(e=>e.date===a);return s&&c&&(c.tempMin=Math.min(c.tempMin,s.tempMin),c.tempMax=Math.max(c.tempMax,s.tempMax)),ql(o,e=>tr(k(j(A(e),-1)))?.pressure??null)}async function Yl(){let e=await Bl();return{position:e,days:await Jl(e)}}async function Xl(){let e=P().weather;if(!e.enabled||e.lat==null||e.updatedAt&&Date.now()-new Date(e.updatedAt).getTime()<Nl)return!1;let t=Qt();try{let n=await Vl(e),r=await Jl(n);return t===Qt()&&(ir(r,n),!0)}catch{return!1}}function Zl(){let{enabled:e,updatedAt:t}=P().weather;return e&&!!t&&Date.now()-new Date(t).getTime()<Pl}var Ql=m(`Health`,{web:()=>O(()=>import(`./web-B-JGBWCr.js`).then(e=>new e.HealthWeb),[],import.meta.url)}),$l=[`sleep`,`steps`,`workouts`],eu={sleep:`sleep`,steps:`steps`,workouts:`workouts`},tu=new Map(Object.entries({cycling:[`cycling`,`bikingStationary`,`handCycling`],running:[`running`,`runningTreadmill`,`trackAndField`],walking:[`walking`],hiking:[`hiking`,`snowshoeing`],swimming:[`swimming`,`swimmingPool`,`swimmingOpenWater`,`waterFitness`,`waterPolo`],strength:`strengthTraining.traditionalStrengthTraining.functionalStrengthTraining.weightlifting.crossTraining.coreTraining.calisthenics.bootCamp.highIntensityIntervalTraining.exerciseClass.backExtension.barbellShoulderPress.benchPress.benchSitUp.burpee.crunch.deadlift.dumbbellCurlLeftArm.dumbbellCurlRightArm.dumbbellFrontRaise.dumbbellLateralRaise.dumbbellTricepsExtensionLeftArm.dumbbellTricepsExtensionRightArm.dumbbellTricepsExtensionTwoArm.jumpingJack.latPullDown.lunge.plank.forwardTwist.upperTwist`.split(`.`),hockey:[`hockey`,`iceHockey`,`rollerHockey`],soccer:[`soccer`],basketball:[`basketball`],volleyball:[`volleyball`],teamSport:[`americanFootball`,`australianFootball`,`baseball`,`cricket`,`handball`,`lacrosse`,`rugby`,`softball`],tennis:[`tennis`],racket:[`badminton`,`pickleball`,`racquetball`,`squash`,`tableTennis`],yoga:[`yoga`,`pilates`,`flexibility`,`stretching`,`mindAndBody`,`taiChi`,`barre`],dance:[`dance`,`dancing`,`cardioDance`,`socialDance`],skiing:[`skiing`,`downhillSkiing`,`crossCountrySkiing`,`snowboarding`,`snowSports`],skating:[`skating`,`iceSkating`,`skatingSports`],climbing:[`climbing`,`rockClimbing`],rowing:[`rowing`,`rowingMachine`,`paddling`,`paddleSports`],cardio:[`elliptical`,`stairClimbing`,`stairClimbingMachine`,`stairs`,`stepTraining`,`mixedCardio`,`jumpRope`],combat:[`boxing`,`kickboxing`,`martialArts`,`wrestling`,`fencing`]}).flatMap(([e,t])=>t.map(t=>[t,e]))),nu=e=>tu.get(e)??`other`,ru=1e3,iu=90,au=7,ou=9e5,su=[`awake`,`inBed`],cu=()=>p.isNativePlatform(),lu=()=>p.getPlatform()===`ios`?`apple_health`:`health_connect`,uu=()=>p.getPlatform()===`android`,du=()=>yl(()=>Ql.openHealthConnectSettings()).catch(e=>console.error(`[health] Nastavenia sa nepodarilo otvoriť`,e));function fu(e){let t=new Map;for(let n of e){let e=(n.stages?.length?n.stages.map(e=>({state:e.stage,minutes:e.durationMinutes})):[{state:n.sleepState,minutes:n.value}]).filter(e=>!su.includes(e.state)).reduce((e,t)=>e+t.minutes,0);if(e<=0)continue;let r=k(n.endDate),i=n.sourceId??n.sourceName??`unknown`;t.has(r)||t.set(r,new Map);let a=t.get(r).get(i)??{minutes:0,bedtime:n.startDate,wakeTime:n.endDate};a.minutes+=e,n.startDate<a.bedtime&&(a.bedtime=n.startDate),n.endDate>a.wakeTime&&(a.wakeTime=n.endDate),t.get(r).set(i,a)}return[...t].map(([e,t])=>({date:e,...[...t.values()].sort((e,t)=>t.minutes-e.minutes)[0]}))}var pu=({startDate:e})=>new Date(new Date(e).getTime()+432e5);async function mu(e,t){let n=new Date,r=j(n,-t);r.setHours(0,0,0,0);let i={startDate:r.toISOString(),endDate:n.toISOString()},a=lu(),o=new Map,s=e=>(o.has(e)||o.set(e,{date:e,source:a,externalId:null}),o.get(e));if(e.includes(`steps`)){let{samples:e}=await Ql.queryAggregated({dataType:`steps`,...i,bucket:`day`,aggregation:`sum`});for(let t of e)s(k(pu(t))).steps=Math.round(t.value)}if(e.includes(`workouts`)){for(let e of Gt(k(r),k(n)))s(e).workouts=[];let e,t=0;do{let n=await Ql.queryWorkouts({...i,limit:200,ascending:!0,...e?{anchor:e}:{}});for(let e of n.workouts){let t=Math.round(e.duration/60);t<1||s(k(e.startDate)).workouts.push({type:nu(e.workoutType),minutes:t,startedAt:e.startDate})}t+=n.workouts.length,e=n.anchor}while(e&&t<ru)}let c=[];if(e.includes(`sleep`)){let{samples:e}=await Ql.readSamples({dataType:`sleep`,...i,limit:t*40,ascending:!0});c=fu(e).map(e=>({date:e.date,minutes:Math.round(e.minutes),bedtime:e.bedtime,wakeTime:e.wakeTime,source:a,externalId:`${a}-${e.date}`}))}return{sleepLogs:c,healthDays:[...o.values()]}}async function hu(e){let{available:t}=await Ql.isAvailable();if(!t)throw Error(`unavailable`);let n=await yl(()=>Ql.requestAuthorization({read:e.map(e=>eu[e]),write:[],requestHistoryAccess:!0})),r=e.filter(e=>n.readAuthorized?.includes(eu[e]));if(!r.length)throw Error(`denied`);or({provider:lu(),types:r}),lr(await mu(r,iu))}async function gu(e){if(!(await yl(()=>Ql.requestAuthorization({read:[eu[e]],write:[],requestHistoryAccess:!0}))).readAuthorized?.includes(eu[e]))throw Error(`denied`);cr([...new Set([...P().health.types,e])]),lr(await mu([e],iu))}async function _u(){let{connected:e,types:t,lastSyncAt:n}=P().health;if(!cu()||!e||n&&Date.now()-new Date(n).getTime()<ou)return!1;let r=Qt();try{let e=await mu(t,au);return r===Qt()&&(lr(e),!0)}catch{return!1}}var vu;(function(e){e[e.APPLE_SEARCH_ADS=0]=`APPLE_SEARCH_ADS`,e[e.ADJUST=1]=`ADJUST`,e[e.APPSFLYER=2]=`APPSFLYER`,e[e.BRANCH=3]=`BRANCH`,e[e.TENJIN=4]=`TENJIN`,e[e.FACEBOOK=5]=`FACEBOOK`})(vu||={});var yu;(function(e){e.INAPP=`inapp`,e.SUBS=`subs`})(yu||={});var bu;(function(e){e[e.SUBSCRIPTIONS=0]=`SUBSCRIPTIONS`,e[e.SUBSCRIPTIONS_UPDATE=1]=`SUBSCRIPTIONS_UPDATE`,e[e.IN_APP_ITEMS_ON_VR=2]=`IN_APP_ITEMS_ON_VR`,e[e.SUBSCRIPTIONS_ON_VR=3]=`SUBSCRIPTIONS_ON_VR`,e[e.PRICE_CHANGE_CONFIRMATION=4]=`PRICE_CHANGE_CONFIRMATION`})(bu||={});var xu;(function(e){e[e.UNKNOWN_SUBSCRIPTION_UPGRADE_DOWNGRADE_POLICY=0]=`UNKNOWN_SUBSCRIPTION_UPGRADE_DOWNGRADE_POLICY`,e[e.IMMEDIATE_WITH_TIME_PRORATION=1]=`IMMEDIATE_WITH_TIME_PRORATION`,e[e.IMMEDIATE_AND_CHARGE_PRORATED_PRICE=2]=`IMMEDIATE_AND_CHARGE_PRORATED_PRICE`,e[e.IMMEDIATE_WITHOUT_PRORATION=3]=`IMMEDIATE_WITHOUT_PRORATION`,e[e.DEFERRED=4]=`DEFERRED`})(xu||={});var Su;(function(e){e.UNKNOWN=`UNKNOWN`,e.CUSTOM=`CUSTOM`,e.LIFETIME=`LIFETIME`,e.ANNUAL=`ANNUAL`,e.SIX_MONTH=`SIX_MONTH`,e.THREE_MONTH=`THREE_MONTH`,e.TWO_MONTH=`TWO_MONTH`,e.MONTHLY=`MONTHLY`,e.WEEKLY=`WEEKLY`})(Su||={});var Cu;(function(e){e[e.INTRO_ELIGIBILITY_STATUS_UNKNOWN=0]=`INTRO_ELIGIBILITY_STATUS_UNKNOWN`,e[e.INTRO_ELIGIBILITY_STATUS_INELIGIBLE=1]=`INTRO_ELIGIBILITY_STATUS_INELIGIBLE`,e[e.INTRO_ELIGIBILITY_STATUS_ELIGIBLE=2]=`INTRO_ELIGIBILITY_STATUS_ELIGIBLE`})(Cu||={});var wu=m(`NativePurchases`,{web:()=>O(()=>import(`./web-D7zGKa2G.js`).then(e=>new e.NativePurchasesWeb),[],import.meta.url)}),Tu=[`yearly`,`monthly`],Eu=`vestie_plus`,Du=`1`,Ou=36e5,ku=`https://play.google.com/redeem`,Au=null,ju=0,Mu=!1,Nu=null,Pu=()=>Ne()&&!1,Fu=()=>p.getPlatform()===`ios`?`App Store`:`Google Play`,Iu=()=>Au,Lu={yearly:{amount:29.99,currency:`EUR`,trial:!0,trialPeriod:{unit:`day`,count:7}},monthly:{amount:3.99,currency:`EUR`,trial:!0,trialPeriod:{unit:`day`,count:7}}},Ru=[`day`,`week`,`month`,`year`];function zu(e){if(e?.price!==0)return null;let{numberOfUnits:t,unit:n,unitString:r}=e.subscriptionPeriod??{},i=Ru.includes(r)?r:Ru[n],a=(t??0)*Math.max(1,e.numberOfPeriods??1);return i&&a>0?{unit:i,count:a}:null}function Bu(e,t){if(!t)return null;let n=new Date(e);return t.unit===`day`?n.setDate(n.getDate()+t.count):t.unit===`week`?n.setDate(n.getDate()+7*t.count):t.unit===`month`?n.setMonth(n.getMonth()+t.count):n.setFullYear(n.getFullYear()+t.count),n.toISOString()}var Vu=()=>Pu()?Au:Lu;async function Hu(){if(!Pu()||Au)return Au;try{let{products:e}=await wu.getProducts({productIdentifiers:[Eu],productType:yu.SUBS}),t={};for(let n of e){let e=Tu.includes(n.identifier)?n.identifier:null;if(!e||n.planIdentifier&&n.planIdentifier!==Eu)continue;let r=t[e]?.trialPeriod??zu(n.introductoryPrice);t[e]={price:n.priceString,amount:typeof n.price==`number`?n.price:null,currency:n.currencyCode,trial:!!(t[e]?.trial||n.introductoryPrice?.price===0),trialPeriod:r}}Tu.every(e=>t[e])&&(Au=t)}catch(e){console.error(`[purchases] Ceny sa nepodarilo načítať`,e)}return Au}async function Uu(e){return qn({plan:e,simulated:!0,trialEndsAt:Bu(new Date,Lu[e].trialPeriod),orderId:`GPA.3341-2290-5718-46203`}),`done`}function Wu(){return Nu??=(async()=>{let{purchases:e}=await wu.getPurchases({productType:yu.SUBS}),t=e.find(e=>e.productIdentifier===Eu&&e.purchaseState===Du);return t&&t.isAcknowledged===!1&&await wu.acknowledgePurchase({purchaseToken:t.purchaseToken}),t??null})().finally(()=>{Nu=null}),Nu}function Gu(e){let{plus:t}=P();if(!e)return F()?($n(),!0):!1;let n=e.orderId??null;if(F()&&t.orderId===n)return!1;let r=F()&&t.orderId==null;return qn({plan:r?t.plan:null,startedAt:r?t.startedAt:e.purchaseDate,trialEndsAt:r?t.trialEndsAt:null,orderId:n}),!0}async function Ku(){if(!Pu()||!(F()||Jn())||Date.now()-ju<Ou)return!1;ju=Date.now();try{let e=await Wu();return mt()?Gu(e):!1}catch(e){return console.error(`[purchases] Stav predplatného sa nepodarilo zistiť`,e),!1}}async function qu(){if(Pu()){Yn();try{Gu(await Wu())}catch(e){console.error(`[purchases] Nákup sa nepodarilo obnoviť`,e)}}return F()}var Ju=()=>p.getPlatform()!==`ios`;function Yu(){return!Pu()||!Ju()?!1:(Yn(),ju=0,Mu=!0,window.location.assign(ku),!0)}function Xu(){return!Mu||!F()?!1:(Mu=!1,!0)}async function Zu(){ju=0,await wu.manageSubscriptions()}function Qu(){let{simulated:e}=P().plus;$n(),e&&(rr(),sr(),ur({enabled:!1}))}var $u;(function(e){e[e.Sunday=1]=`Sunday`,e[e.Monday=2]=`Monday`,e[e.Tuesday=3]=`Tuesday`,e[e.Wednesday=4]=`Wednesday`,e[e.Thursday=5]=`Thursday`,e[e.Friday=6]=`Friday`,e[e.Saturday=7]=`Saturday`})($u||={});var ed=m(`LocalNotifications`,{web:()=>O(()=>import(`./web-nQN3wKG0.js`).then(e=>new e.LocalNotificationsWeb),[],import.meta.url)});function td(e){return{from:k(j(new Date,-(e-1))),to:k()}}function nd(e){let t=new Map;for(let n of e)t.set(n,(t.get(n)??0)+1);return[...t].map(([e,t])=>({key:e,count:t})).sort((e,t)=>t.count-e.count)}var rd=e=>e.length?e.reduce((e,t)=>e+t,0)/e.length:null;function id({from:e,to:t}){let{symptomLogs:n,episodes:r,medicationIntakes:i,medications:a,cycleEntries:o,sleepLogs:s}=dr(),c=s.filter(n=>n.date>=e&&n.date<=t).sort((e,t)=>e.date.localeCompare(t.date)),l=n=>{let r=k(n);return r>=e&&r<=t},u=n.filter(e=>l(e.occurredAt)).sort((e,t)=>e.occurredAt.localeCompare(t.occurredAt)),d=r.filter(e=>l(e.startedAt)).sort((e,t)=>e.startedAt.localeCompare(t.startedAt)),f=i.filter(e=>l(e.takenAt)).sort((e,t)=>e.takenAt.localeCompare(t.takenAt)),p=new Set([...u.map(e=>k(e.occurredAt)),...d.map(e=>k(e.startedAt))]),m=[...u.map(Dn),...d.map(e=>e.intensity)].filter(e=>e!=null),h=d.filter(e=>e.endedAt).map(e=>(new Date(e.endedAt)-new Date(e.startedAt))/6e4),g=a.map(e=>{let t=f.filter(t=>t.medicationId===e.id);return{medication:e,count:t.length,effects:nd(t.map(e=>e.effect).filter(Boolean))}}).filter(e=>e.count>0).sort((e,t)=>t.count-e.count);return{from:e,to:t,logs:u,episodes:d,intakes:f,recordCount:u.length+d.length,symptomDays:p.size,episodeCount:d.length,avgIntensity:rd(m),avgDurationMinutes:rd(h),symptoms:nd([...u.flatMap(e=>e.symptoms.map(e=>e.key)),...d.flatMap(e=>(e.symptoms??[]).map(e=>e.key??e))]),triggers:nd(d.flatMap(e=>(e.triggers??[]).map(e=>e.key??e))),meds:g,periodDays:o.filter(n=>n.type===`period`&&n.date>=e&&n.date<=t).length,sleeps:c,avgSleepMinutes:rd(c.map(e=>e.minutes)),sleepQuality:nd(c.map(e=>e.quality).filter(Boolean))}}var ad=85,od=8,sd=3e3,cd=12e3,ld=30,ud=5,dd=10,fd=30,pd=5,md=[90,180,365],hd=[90,180,365],gd=[{key:`pressure_drop`,group:`weather`,icon:`trendingDown`,lags:[0,1],test:e=>e.pressureChange==null?null:e.pressureChange<=-6},{key:`pressure_rise`,group:`weather`,icon:`trendingUp`,lags:[0,1],test:e=>e.pressureChange==null?null:e.pressureChange>=6},{key:`humid`,group:`weather`,icon:`droplets`,lags:[0,1],test:e=>e.humidity==null?null:e.humidity>=ad},{key:`temp_swing`,group:`weather`,icon:`thermometer`,lags:[0,1],test:e=>e.tempChange==null?null:Math.abs(e.tempChange)>=od},{key:`short_sleep`,group:`sleep`,icon:`bed`,lags:[0,1],test:e=>e.sleep==null?null:e.sleep<360},{key:`poor_sleep`,group:`sleep`,icon:`moon`,lags:[0,1],test:e=>e.sleepQuality==null?null:e.sleepQuality===`poor`},{key:`high_steps`,group:`health`,icon:`dumbbell`,lags:[1],test:e=>e.steps==null?null:e.steps>=cd},{key:`low_steps`,group:`health`,icon:`footprints`,lags:[1],test:e=>e.steps==null?null:e.steps<sd},{key:`workout`,group:`workouts`,icon:`dumbbell`,lags:[0,1],test:e=>e.workoutMinutes==null?null:e.workoutMinutes>=ld},{key:`period`,group:`cycle`,icon:`droplet`,lags:[0,1],test:e=>!!e.periodWindow}];function _d(){let{weather:e,health:t,cycleTracking:n}=P();return{weather:e.enabled,sleep:!0,health:t.connected&&t.types.includes(`steps`),workouts:t.connected&&t.types.includes(`workouts`),cycle:n===!0}}function vd(){let{episodes:e,symptomLogs:t,sleepLogs:n,healthDays:r,weatherDays:i,cycleEntries:a}=dr(),o=new Map,s=e=>(o.has(e)||o.set(e,{date:e,hard:!1,record:!1}),o.get(e));for(let t of e){let e=s(k(t.startedAt));e.hard=!0,e.record=!0}for(let e of t){let t=s(k(e.occurredAt));t.record=!0,(Dn(e)??0)>=5&&(t.hard=!0)}for(let e of n){let t=s(e.date);t.sleep=e.minutes,t.sleepQuality=e.quality??null,e.source===`manual`&&(t.record=!0)}for(let e of r){let t=s(e.date);t.steps=e.steps??null,t.workoutMinutes=e.workouts==null?null:e.workouts.filter(e=>e.type!==`walking`).reduce((e,t)=>e+t.minutes,0)}for(let e of i){let t=s(e.date);t.pressureChange=e.pressureChange,t.humidity=e.humidity,t.tempMax=e.tempMax}for(let e of o.values()){let t=o.get(k(j(A(e.date),-1)));e.tempChange=e.tempMax!=null&&t?.tempMax!=null?e.tempMax-t.tempMax:null}for(let e of a)if(e.type===`period`)for(let t=-2;t<=2;t++)s(k(j(A(e.date),t))).periodWindow=!0;return o}var yd=[0];function bd(e){for(let t=yd.length;t<=e;t++)yd[t]=yd[t-1]+Math.log(t);return yd[e]}var xd=(e,t)=>bd(e)-bd(t)-bd(e-t);function Sd(e,t,n,r){let i=t+r,a=e+n,o=0;for(let n=e;n<=Math.min(t,a);n++)o+=Math.exp(xd(a,n)+xd(i-a,t-n)-xd(i,t));return o}function Cd(e,t,n,r){let i=0,a=0,o=0,s=0;for(let c of t){let t=e.test(c);if(t==null)continue;let l=e.lags.map(e=>k(j(A(c.date),e)));if(l.at(-1)>r)continue;let u=l.some(e=>n.get(e)?.hard);t?(i++,u&&a++):(o++,u&&s++)}let c=i?a/i:0,l=o?s/o:0,u=c-l,d=`none`;if(i<ud||o<dd)d=`few`;else{let e=Sd(a,i,s,o);u>=.15&&c>=l*1.5&&e<.05?d=`strong`:u>=.08&&c>=l*1.25&&e<.2&&(d=`possible`)}return{key:e.key,group:e.group,icon:e.icon,withDays:i,withHard:a,withoutDays:o,withoutHard:s,rateWith:c,rateWithout:l,difference:u,strength:d}}var wd={strong:0,possible:1,none:2,few:3};function Td({days:e=180,now:t=new Date}={}){let n=k(t),r=k(j(t,-(e-1))),i=vd(),a=[...i.values()].filter(e=>e.record).map(e=>e.date).sort()[0],o=a&&a>r?a:r,s=a?Gt(o,n).map(e=>i.get(e)??{date:e,hard:!1}):[],c=s.length,l=s.filter(e=>e.hard).length,u=_d(),d=gd.filter(e=>u[e.group]).map(e=>Cd(e,s,i,n)).filter(e=>e.withDays>0).sort((e,t)=>wd[e.strength]-wd[t.strength]||t.difference-e.difference),{episodes:f}=dr(),p=f.filter(e=>k(e.startedAt)>=o);return{period:e,trackedDays:c,hardDays:l,enough:c>=fd&&l>=pd,factors:d,logged:nd(p.flatMap(e=>(e.triggers??[]).map(e=>e.key??e)))}}var Ed=[`pressure_drop`,`pressure_rise`,`humid`,`temp_swing`];function Dd(e,{days:t,weather:n,alerts:r}){if(!n)return[];let i=t.get(e)??{},a=[];return i.pressureChange!=null&&i.pressureChange<=-6&&a.push({key:`pressure_drop`,amount:Math.round(-i.pressureChange)}),i.pressureChange!=null&&i.pressureChange>=6&&a.push({key:`pressure_rise`,amount:Math.round(i.pressureChange)}),i.humidity!=null&&i.humidity>=ad&&a.push({key:`humid`,amount:i.humidity}),i.tempChange!=null&&Math.abs(i.tempChange)>=od&&a.push({key:`temp_swing`,amount:Math.abs(i.tempChange)}),a.filter(e=>r.includes(e.key))}function Od({now:e=new Date}={}){let t=vd(),n=Zl(),r=P().forecast.alerts??[],i=[0,1,2,3].map(i=>{let a=k(j(e,i)),o=Dd(a,{days:t,weather:n,alerts:r});return{date:a,offset:i,signals:o,level:o.length?`change`:`calm`}});return{days:i,next:i.find(e=>e.offset>0&&e.level===`change`)??null}}function kd(e,t=new Date){let n=td(e),r=j(t,-e),i={from:k(j(r,-(e-1))),to:k(r)};return{current:id(n),previous:id(i)}}function Ad(e=12,t=new Date){let n=[];for(let r=e-1;r>=0;r--){let e=new Date(t.getFullYear(),t.getMonth()-r,1),i=new Date(t.getFullYear(),t.getMonth()-r+1,0),a=id({from:k(e),to:k(i)});n.push({month:e,symptomDays:a.symptomDays,episodes:a.episodeCount})}return n}var jd=[`morning`,`afternoon`,`evening`,`night`],Md=e=>e>=5&&e<12?0:e>=12&&e<17?1:e>=17&&e<22?2:3;function Nd({from:e,to:t}){let n=Array.from({length:7},()=>[0,0,0,0]),r=0;for(let i of dr().episodes){let a=k(i.startedAt);if(a<e||a>t)continue;let o=new Date(i.startedAt);n[(o.getDay()+6)%7][Md(o.getHours())]++,r++}return{grid:n,total:r}}function Pd({from:e,to:t},n=[-3,7]){let{cycleEntries:r,episodes:i}=dr(),a=new Set(r.filter(e=>e.type===`period`).map(e=>e.date)),o=[...a].filter(e=>!a.has(k(j(A(e),-1)))).map(e=>A(e).getTime()),s=new Map;for(let e=n[0];e<=n[1];e++)s.set(e,0);let c=0;for(let n of i){let r=k(n.startedAt);if(r<e||r>t)continue;let i=A(r).getTime();for(let e of o){let t=Math.round((i-e)/864e5);if(s.has(t)){s.set(t,s.get(t)+1),c++;break}}}return{items:[...s].map(([e,t])=>({offset:e,count:t})),total:c,starts:o.length}}function Fd({from:e,to:t}){let n=dr().episodes.filter(n=>{let r=k(n.startedAt);return r>=e&&r<=t});return{relief:nd(n.flatMap(e=>e.relief??[])),impact:nd(n.flatMap(e=>e.impact??[]).filter(e=>e!==`none`))}}function Id({from:e,to:t}){let{medications:n,medicationIntakes:r}=dr(),i=A(e),a=A(t),o=[];for(let e=new Date(i.getFullYear(),i.getMonth(),1);e<=a;e=new Date(e.getFullYear(),e.getMonth()+1,1))o.push(e);let s=e=>{let t=A(e);return(t.getFullYear()-o[0].getFullYear())*12+t.getMonth()-o[0].getMonth()};return n.map(n=>{let i=r.filter(e=>e.medicationId===n.id).map(e=>k(e.takenAt)).filter(n=>n>=e&&n<=t).sort();if(!i.length)return null;let a=o.map(()=>0);for(let e of i)a[s(e)]++;return{medication:n,total:i.length,last:i.at(-1),months:o.map((e,t)=>({month:e,count:a[t]}))}}).filter(Boolean).sort((e,t)=>t.total-e.total)}function Ld({from:e,to:t}){let{weatherDays:n,episodes:r}=dr(),i=new Set(r.map(e=>k(e.startedAt)));return n.filter(n=>n.date>=e&&n.date<=t).sort((e,t)=>e.date.localeCompare(t.date)).map(e=>({...e,episode:i.has(e.date),estimated:Rl(e)}))}function Rd({from:e,to:t}){let{episodes:n,weatherDays:r,healthDays:i}=dr(),a=new Map(r.map(e=>[e.date,e])),o=n.filter(n=>{let r=k(n.startedAt);return r>=e&&r<=t}).sort((e,t)=>e.startedAt.localeCompare(t.startedAt)).map(e=>({episode:e,weather:a.get(k(e.startedAt))??null})).filter(e=>e.weather),s=i.filter(n=>n.date>=e&&n.date<=t),c=e=>e.length?e.reduce((e,t)=>e+t,0)/e.length:null,l=s.filter(e=>e.workouts!=null),u=e=>e.workouts.filter(e=>e.type!==`walking`);return{rows:o,drops:o.filter(e=>e.weather.pressureChange!=null&&e.weather.pressureChange<=-6).length,avgSteps:c(s.map(e=>e.steps).filter(e=>e!=null)),workoutTracked:l.length,workoutDays:l.filter(e=>u(e).length).length,workoutTypes:nd(l.flatMap(e=>u(e).map(e=>e.type))).slice(0,3)}}var zd=class{constructor(e){this.value=e}toString(){return this.value}},Bd={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},Vd=e=>String(e).replace(/[&<>"']/g,e=>Bd[e]),Hd=e=>new zd(String(e??``));function Ud(e){return e==null||e===!1||e===!0?``:e instanceof zd?e.value:Array.isArray(e)?e.map(Ud).join(``):Vd(e)}function K(e,...t){let n=e[0];for(let r=0;r<t.length;r++)n+=Ud(t[r])+e[r+1];return new zd(n)}var Wd={activity:`
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
`,bug:`
<svg
  class="lucide lucide-bug"
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
  <path d="M12 20v-9" />
  <path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z" />
  <path d="M14.12 3.88 16 2" />
  <path d="M21 21a4 4 0 0 0-3.81-4" />
  <path d="M21 5a4 4 0 0 1-3.55 3.97" />
  <path d="M22 13h-4" />
  <path d="M3 21a4 4 0 0 1 3.81-4" />
  <path d="M3 5a4 4 0 0 0 3.55 3.97" />
  <path d="M6 13H2" />
  <path d="m8 2 1.88 1.88" />
  <path d="M9 7.13V6a3 3 0 1 1 6 0v1.13" />
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
`};Object.keys(Wd);function q(e,{size:t=24,label:n,strokeWidth:r=1.75}={}){let i=Wd[e];if(!i)return console.warn(`[icons] Neznáma ikona: ${e}`),Hd(``);let a=n?`role="img" aria-label="${Vd(n)}"`:`aria-hidden="true" focusable="false"`;return Hd(i.trim().replace(`<svg`,`<svg ${a}`).replace(`class="lucide`,`class="icon lucide`).replace(`width="24"`,`width="${t}"`).replace(`height="24"`,`height="${t}"`).replace(`stroke-width="2"`,`stroke-width="${r}"`))}var Gd=(e,t)=>t==null||t===!1?``:K` ${Hd(e)}="${t}"`,Kd=(e,t)=>t?Hd(` ${e}`):``;function qd(e={}){return Hd(Object.entries(e).map(([e,t])=>` data-${e}="${Vd(t)}"`).join(``))}function J({header:e=``,body:t,footer:n=``,nav:r=``,variant:i=``,form:a=!1}){let o=K`
    ${e}
    <div class="screen__body">${t}</div>
    ${n?K`<div class="screen__footer">${n}</div>`:``}
    ${r}`;return a?K`<form class="screen ${i}" novalidate>${o}</form>`:K`<div class="screen ${i}">${o}</div>`}var Jd=(e,t,{header:n}={})=>J({variant:n?``:`screen--tab`,header:n,body:t,nav:Qd(e)});function Y({back:e,backAction:t,step:n,total:r}={}){return K`
    <header class="screen__header">
      ${e||t?K`<button type="button" class="icon-btn" data-action="${t??`back`}"${Gd(`data-fallback`,e)} aria-label="${I(`common.back`)}">
            ${q(`chevronLeft`)}
          </button>`:K`<span class="topbar__spacer"></span>`}
      ${n?K`<div class="progress">
            <span class="visually-hidden">${I(`common.stepOf`,{step:n,total:r})}</span>
            ${Array.from({length:r},(e,t)=>K`<span class="progress__seg ${t<n?`is-done`:``}" aria-hidden="true"></span>`)}
          </div>`:K`<span class="progress"></span>`}
      <span class="topbar__spacer"></span>
    </header>`}var Yd=[{key:`today`,path:`/today`,icon:`home`},{key:`calendar`,path:`/calendar`,icon:`calendar`},{key:`insights`,path:`/insights`,icon:`chart`},{key:`treatment`,path:`/treatment`,icon:`pill`}],Xd=(e,t)=>K`
  <a class="tabbar__item" href="#${e.path}" data-replace${e.key===t?Hd(` aria-current="page"`):``}>
    <span class="tabbar__icon">${q(e.icon)}</span>
    ${I(`nav.${e.key}`)}
  </a>`;function Zd(){let e=Mn();return e?K`
      <a class="tabbar__fab tabbar__fab--live" href="#/episode/${e.id}" aria-label="${I(`episode.ongoing`)}">
        <span class="tabbar__fab-circle" aria-hidden="true">${q(`timer`,{size:30})}</span>
        <span class="tabbar__fab-label" aria-hidden="true">${I(`episode.statusOngoing`)}</span>
      </a>`:K`
    <button type="button" class="tabbar__fab" data-action="startEpisode">
      <span class="tabbar__fab-circle" aria-hidden="true">${q(`play`,{size:28,strokeWidth:2.5})}</span>
      <span class="tabbar__fab-label">${I(`nav.startEpisode`)}</span>
    </button>`}function Qd(e){let[t,n,r,i]=Yd;return K`
    <nav class="tabbar" aria-label="${I(`nav.label`)}">
      ${Xd(t,e)}${Xd(n,e)}${Zd()}${Xd(r,e)}${Xd(i,e)}
    </nav>`}var $d=()=>K`<a href="#/profile" class="icon-btn" aria-label="${I(`nav.profile`)}">${q(`user`)}</a>`,ef=e=>K`
  <header class="tab-title">
    <h1 class="screen-title" tabindex="-1">${e}</h1>
    ${$d()}
  </header>`;function X({label:e,variant:t=`primary`,action:n,type:r=`button`,iconName:i,block:a=!1,compact:o=!1,disabled:s=!1,data:c,id:l}){return K`<button type="${r}" class="${[`btn`,`btn--${t}`,a&&`btn--block`,o&&`btn--compact`].filter(Boolean).join(` `)}"${Gd(`id`,l)}${Gd(`data-action`,n)}${qd(c)}${Kd(`disabled`,s)}>
    ${i?q(i,{size:20}):``}<span>${e}</span>
  </button>`}function tf({name:e,type:t=`radio`,options:n,selected:r,legend:i}){let a=new Set([].concat(r??[]));return K`
    <fieldset class="options">
      ${i?K`<legend class="visually-hidden">${i}</legend>`:``}
      ${n.map(n=>K`
          <label class="option option--${t}">
            <input type="${t}" name="${e}" value="${n.value}" id="${e}-${n.value}"${Kd(`checked`,a.has(n.value))} />
            <span class="option__control">${q(`check`,{size:16,strokeWidth:3})}</span>
            <span class="option__label">${n.label}</span>
          </label>`)}
    </fieldset>`}function nf({name:e,options:t,selected:n,legend:r}){return K`
    <fieldset class="segmented">
      ${r?K`<legend class="visually-hidden">${r}</legend>`:``}
      ${t.map(t=>K`
          <label class="segmented__item">
            <input type="radio" name="${e}" value="${t.value}" id="${e}-${t.value}"${Kd(`checked`,t.value===n)} />
            <span>${t.label}</span>
          </label>`)}
    </fieldset>`}function Z({label:e,name:t,type:n=`text`,value:r=``,placeholder:i,hint:a,optional:o=!1,required:s=!1,multiline:c=!1,autocomplete:l=`off`,maxlength:u=120}){let d=`f-${t}`,f=[a&&`${d}-hint`,`${d}-error`].filter(Boolean).join(` `),p=c?K`<textarea class="field__input" id="${d}" name="${t}"${Gd(`placeholder`,i)} maxlength="1000" aria-describedby="${f}">${r}</textarea>`:K`<input class="field__input" id="${d}" name="${t}" type="${n}" value="${r}"${Gd(`placeholder`,i)}${Gd(`autocomplete`,l)}${n===`text`?Gd(`maxlength`,u):``}${Kd(`required`,s)} aria-describedby="${f}" />`;return K`
    <div class="field">
      <label class="field__label" for="${d}">
        ${e}${o?K` <span class="field__optional">(${I(`common.optional`)})</span>`:``}
      </label>
      ${p}
      ${a?K`<p class="field__hint" id="${d}-hint">${a}</p>`:``}
      <p class="field__error" id="${d}-error" hidden></p>
    </div>`}function rf(e,t,n){let r=e.querySelector(`#f-${t}`),i=e.querySelector(`#f-${t}-error`);i&&(i.textContent=n,i.hidden=!1),r?.setAttribute(`aria-invalid`,`true`),r?.focus()}function af(e){if(e?.getAttribute?.(`aria-invalid`)!==`true`)return;e.removeAttribute(`aria-invalid`);let t=document.getElementById(`${e.id}-error`);t&&(t.hidden=!0)}function of({name:e,label:t,hint:n,checked:r,iconName:i}){return K`
    <label class="list__row list__row--switch" for="f-${e}">
      ${i?q(i):``}
      <span class="list__text">
        <span class="list__label">${t}</span>
        ${n?K`<span class="list__hint" id="f-${e}-hint">${n}</span>`:``}
      </span>
      <input class="switch" type="checkbox" role="switch" id="f-${e}" name="${e}"${Kd(`checked`,r)}${n?K` aria-describedby="f-${e}-hint"`:``} />
    </label>`}var sf=(e,{live:t=!1,neutral:n=!1}={})=>K`<span class="chip ${t?`chip--live`:``} ${n?`chip--neutral`:``}">${e}</span>`;function cf(e,t,{href:n,label:r}){let[i,a=``]=e.split(`{${t}}`);return K`${i}<a href="${n}">${r}</a>${a}`}var lf=(e,{large:t=!1}={})=>K`<span class="icon-badge ${t?`icon-badge--lg`:``}">${q(e,{size:t?34:22})}</span>`,uf=e=>e.charAt(0).toLocaleUpperCase(qr())+e.slice(1);function df(e=new Date){return uf(new Intl.DateTimeFormat(qr(),{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}).format(e))}function ff(e){return new Intl.DateTimeFormat(qr(),{hour:`2-digit`,minute:`2-digit`}).format(new Date(e))}function pf(e){let t=new Date(e),n=new Date;return t.toDateString()===n.toDateString()?ff(t):new Intl.DateTimeFormat(qr(),{day:`numeric`,month:`numeric`,hour:`2-digit`,minute:`2-digit`}).format(t)}function mf(e){return new Intl.DateTimeFormat(qr(),{day:`numeric`,month:`short`,year:`numeric`,hour:`2-digit`,minute:`2-digit`}).format(new Date(e))}function hf(e){return new Intl.DateTimeFormat(qr(),{day:`numeric`,month:`numeric`,year:`numeric`}).format(new Date(e))}function gf(e){return uf(new Intl.DateTimeFormat(qr(),{month:`long`,year:`numeric`}).format(e))}function _f(e){return new Intl.NumberFormat(qr(),{minimumFractionDigits:1,maximumFractionDigits:1}).format(e)}function vf(e,t){return new Intl.NumberFormat(qr(),{style:`currency`,currency:t}).format(e)}function yf(e){return bf(0,Math.round(e)*6e4)}function bf(e,t=new Date){let n=Math.max(0,Math.floor((new Date(t)-new Date(e))/6e4));if(n<1)return I(`duration.underMinute`);if(n<60)return I(`duration.minutes`,{m:n});let r=Math.floor(n/60),i=n%60;return i?I(`duration.hoursMinutes`,{h:r,m:i}):I(`duration.hours`,{h:r})}var xf=e=>e.price??vf(e.amount,e.currency),Sf=[`weather`,`forecast`,`finder`,`stats`,`health`,`report`],Cf={weather:`gauge`,forecast:`bellRing`,finder:`search`,stats:`chart`,health:`watch`,report:`fileText`},wf={clear:`sun`,partly:`cloudSun`,cloudy:`cloud`,fog:`cloudFog`,rain:`cloudRain`,snow:`snowflake`,storm:`cloudLightning`},Tf=e=>e.charAt(0).toLocaleUpperCase(qr())+e.slice(1);function Ef(e){let t=Math.round(e);return t>0?`+${t}`:t<0?`−${Math.abs(t)}`:`0`}var Df=e=>I(`plus.weather.hpa`,{value:Math.round(e)}),Of=[{key:`low`,below:1e3},{key:`normal`,below:1021},{key:`high`,below:1030},{key:`veryHigh`,below:1/0}],kf=e=>Of.find(t=>Math.round(e)<t.below).key,Af=e=>I(`plus.weather.hpa`,{value:Ef(e)}),jf=e=>I(`plus.weather.temps`,{min:e.tempMin,max:e.tempMax}),Mf=e=>I(`plus.weather.conditions.${e}`),Nf=e=>new Intl.NumberFormat(qr()).format(Math.round(e)),Pf=e=>Tf(new Intl.DateTimeFormat(qr(),{weekday:`long`}).format(e)),Ff=e=>new Intl.DateTimeFormat(qr(),{day:`numeric`,month:`numeric`}).format(e);function If(e){return e===k()?I(`plus.forecast.today`):e===k(j(new Date,1))?I(`plus.forecast.tomorrow`):Pf(A(e))}var Lf=e=>lu()===`apple_health`?`${e}Ios`:e,Rf=e=>I(e===`health`?Lf(`plus.features.health.text`):`plus.features.${e}.text`);function zf(e,{status:t}={}){let n=F(),r=e===`report`?`#/report`:`#/plus/${e}`;return K`
    <a class="list__row" href="${n?r:`#/plus?from=${e}`}">
      ${q(Cf[e])}
      <span class="list__text">
        <span class="list__label">${I(`plus.features.${e}.title`)}</span>
        ${n?``:K`<span class="list__hint">${Rf(e)}</span>`}
      </span>
      ${n&&t?K`<span class="list__value">${t}</span>`:``}
      ${n?``:q(`lock`,{size:18,label:I(`plus.lockedLabel`)})}
      ${q(`chevronRight`,{size:20})}
    </a>`}function Bf(e){let{weather:t,forecast:n,health:r}=P();return e===`weather`?I(t.enabled?`common.on`:`common.off`):e===`forecast`?I(n.enabled?`common.on`:`common.off`):e===`health`?I(r.connected?`plus.health.connected`:`plus.health.notConnected`):``}function Vf(){return K`
    <section class="section" aria-labelledby="plus-title">
      <h2 class="section-title plus-title" id="plus-title">${I(`plus.name`)}${F()?``:sf(I(`plus.tryChip`))}</h2>
      <div class="list">${[`forecast`,`finder`,`stats`,`weather`].map(e=>zf(e,{status:Bf(e)}))}</div>
    </section>`}function Hf(e){if(!F())return``;let{weather:t,health:n}=P(),r=t.enabled?tr(e):null,i=n.connected?ar(e):null,a=i?.steps!=null||i?.workouts?.length?i:null;return!r&&!a?``:K`
    <ul class="day-context">
      ${r?K`<li>
            ${q(wf[r.condition]??`cloud`,{size:20})}
            <span>${[Df(r.pressure),r.pressureChange==null?``:I(`plus.weather.changeShort`,{value:Af(r.pressureChange)}),Mf(r.condition),jf(r),Rl(r)?I(`plus.weather.estimateWord`):``].filter(Boolean).join(` · `)}</span>
          </li>`:``}
      ${a?.steps==null?``:K`<li>${q(`footprints`,{size:20})}<span>${I(`plus.health.stepsValue`,{value:Nf(a.steps)})}</span></li>`}
      ${a?.workouts?.length?K`<li>${q(`dumbbell`,{size:20})}<span>${a.workouts.map(Uf).join(`, `)}</span></li>`:``}
    </ul>`}var Uf=e=>`${I(`plus.health.workouts.${e.type}`)} ${yf(e.minutes)}`,Wf=e=>I(`plus.forecast.signals.${e.key}`,{amount:e.amount}),Gf=e=>e.signals[0];function Kf(e){return K`<span class="level level--${e}">${q(e===`calm`?`check`:`bellRing`,{size:16})}${I(`plus.forecast.levels.${e}`)}</span>`}function qf(){if(!F()||!P().forecast.enabled)return``;let{next:e}=Od();if(!e)return``;let t=Gf(e);return K`
    <a class="card forecast-card forecast-card--${e.level}" href="#/plus/forecast">
      <span class="forecast-card__head">
        <span class="forecast-card__title">${I(`plus.forecast.cardTitle`,{day:If(e.date)})}</span>
        ${Kf(e.level)}
      </span>
      <span class="forecast-card__text">${Wf(t)}</span>
    </a>`}var Jf=1,Yf=[2,3],Xf=`reminders`,Zf=`forecast-private`,Qf=[`forecast`],$f=3,ep=0,tp=e=>{let[t,n]=e.split(`:`).map(Number);return{hour:t,minute:n}};async function np(){if(!Ne())return!0;let{display:e}=await ed.checkPermissions();return e===`granted`||(await yl(()=>ed.requestPermissions())).display===`granted`}async function rp(){return(await ed.checkPermissions()).display===`granted`}async function ip(){await ed.createChannel({id:Xf,name:I(`notifications.channelReminders`),importance:$f}),await ed.createChannel({id:Zf,name:I(`notifications.channelForecast`),importance:$f,visibility:ep}),await Promise.all(Qf.map(e=>ed.deleteChannel({id:e}).catch(()=>{})))}async function ap(){if(Ne())try{await ed.cancel({notifications:[{id:Jf}]});let{reminder:e}=P();if(!e.enabled||!await rp())return;await ip(),await ed.schedule({notifications:[{id:Jf,channelId:Xf,title:I(`app.name`),body:I(`notifications.reminderBody`),isExactNotification:!1,schedule:{on:tp(e.time),allowWhileIdle:!0}}]})}catch(e){console.error(`[notifications] Pripomienku sa nepodarilo naplánovať`,e)}}function op(){let{hour:e,minute:t}=tp(P().forecast.time),n=new Date;return Od().days.filter(e=>(e.offset===1||e.offset===2)&&e.level===`change`).map(n=>{let r=j(A(n.date),-1);return r.setHours(e,t,0,0),{day:n,at:r}}).filter(({at:e})=>e>n).map(({day:e,at:t})=>({id:Yf[e.offset-1],channelId:Zf,title:I(`plus.forecast.cardTitle`,{day:I(`plus.forecast.tomorrow`)}),body:Wf(Gf(e)),isExactNotification:!1,schedule:{at:t,allowWhileIdle:!0}}))}async function sp(){if(Ne())try{await ed.cancel({notifications:Yf.map(e=>({id:e}))});let{forecast:e,weather:t}=P();if(!F()||!e.enabled||!e.notify||!t.enabled||!Zl()||!await rp())return;let n=op();if(!n.length)return;await ip(),await ed.schedule({notifications:n})}catch(e){console.error(`[notifications] Upozornenie sa nepodarilo naplánovať`,e)}}var cp=()=>Promise.all([ap(),sp()]);async function lp(){if(Ne())try{await ed.cancel({notifications:[Jf,...Yf].map(e=>({id:e}))})}catch(e){console.error(`[notifications] Upozornenia sa nepodarilo zrušiť`,e)}}var up=`<?xml version="1.0" encoding="UTF-8"?>
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
</svg>`,dp=(e,t)=>[...up.matchAll(RegExp(`<path class="${e}" d="([^"]+)"`,`g`))].map(e=>`<path class="logo__${t}" d="${e[1]}"/>`).join(``),fp=dp(`cls-1`,`mark`),pp=dp(`cls-2`,`word`),mp=up.match(/viewBox="([^"]+)"/)[1];function hp({large:e=!1}={}){return K`
    <div class="logo ${e?`logo--large`:``}" role="img" aria-label="${I(`app.logo`)}">
      <span class="logo__name">${I(`app.name`)}</span>
      ${Hd(`<svg class="logo__svg" viewBox="${mp}" aria-hidden="true" focusable="false">${fp}${pp}</svg>`)}
    </div>`}function gp({symbol:e,size:t=280}={}){return K`
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
      ${Hd(e?String(q(e,{size:64,strokeWidth:1.4})).replace(`<svg`,`<svg x="108" y="86"`):`
      <circle cx="140" cy="118" r="34" fill="var(--color-coral-soft)" opacity="0.55" />
      <circle cx="140" cy="118" r="18" fill="var(--color-coral)" opacity="0.5" />`)}
    </svg>`}var _p={render(){let e=Hr.map(e=>({lang:e,text:Xr(e,`language.title`)})).filter((e,t,n)=>n.findIndex(t=>t.text===e.text)===t);return J({variant:`screen--language`,body:K`
        <div class="language">
          ${hp({large:!0})}
          ${gp({size:220})}
          <h1 class="screen-title language__title" tabindex="-1">
            ${e.map(({lang:e,text:t},n)=>K`<span${n?K` class="language__alt"`:``} lang="${e}">${t}</span>`)}
          </h1>
          <div class="stack">
            ${Hr.map(e=>K`
                <button type="button" class="choice" data-action="choose" data-lang="${e}" lang="${e}">
                  <span class="choice__badge" aria-hidden="true">${e.toUpperCase()}</span>
                  <span>${Xr(e,`language.${e}`)}</span>
                  <span class="choice__end">${q(`chevronRight`)}</span>
                </button>`)}
          </div>
        </div>`})},actions:{choose(e){let{lang:t}=e.dataset;Gr(t),rn({language:t}),a(`/start/welcome`)}}},vp={render(){return J({variant:`screen--welcome`,header:Y({back:`/start/language`}),body:K`
        <div class="welcome">
          ${hp()}
          <h1 class="screen-title welcome__title" tabindex="-1">${I(`welcome.title`)}</h1>
          <p class="screen-lead">${I(`welcome.text`)}</p>
          ${gp()}
        </div>`,footer:X({label:I(`welcome.cta`),action:`start`,block:!0})})},actions:{start(){a(`/start/privacy`)}}},yp=[`/start/privacy`,`/start/profile`,`/start/goals`,`/start/condition`,`/start/cycle`,`/start/medications`,`/start/reminders`];function bp(e){let t=yp.indexOf(e);return{step:t+1,total:yp.length,prev:yp[t-1]??`/start/welcome`,next:yp[t+1]??`/today`}}var xp=`/start/goals`,Sp=[`symptoms`,`triggers`,`patterns`,`doctor`],Cp={render(){let{step:e,total:t,prev:n}=bp(xp);return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${I(`goals.title`)}</h1>
        <p class="screen-lead">${I(`goals.lead`)}</p>
        <div class="step-options">
          ${tf({name:`goals`,type:`checkbox`,legend:I(`goals.title`),options:Sp.map(e=>({value:e,label:I(`goals.options.${e}`)})),selected:P().goals})}
        </div>`,footer:K`
        ${X({label:I(`common.continue`),type:`submit`,block:!0})}
        ${X({label:I(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onSubmit(e){rn({goals:new FormData(e).getAll(`goals`)}),a(bp(xp).next)},actions:{skip(){a(bp(xp).next)}}};function Q(e,{actionLabel:t,onAction:n,duration:r}={}){let i=document.getElementById(`toast-region`),a=document.createElement(`div`);a.className=`toast`;let o=document.createElement(`span`);o.textContent=e,a.append(o);let s=setTimeout(c,r??(t?6e3:3500));function c(){clearTimeout(s),ul(a,()=>a.remove())}if(t){let e=document.createElement(`button`);e.type=`button`,e.className=`toast__action`,e.textContent=t,e.addEventListener(`click`,()=>{c(),n?.()}),a.append(e)}i.replaceChildren(a),ll(a)}function wp({title:e,text:t,closeLabel:n=I(`common.close`)}){let r=document.getElementById(`dialog`);return r.setAttribute(`aria-labelledby`,`dialog-title`),r.innerHTML=String(K`
    <h2 class="dialog__title" id="dialog-title">${e}</h2>
    ${t?K`<p class="dialog__text">${t}</p>`:``}
    <form method="dialog" class="dialog__actions">
      <button class="btn btn--primary btn--block" value="close" autofocus>${n}</button>
    </form>`),new Promise(e=>{let t=!1,n=()=>{t||(t=!0,e())};r.querySelector(`form`).addEventListener(`submit`,n),r.addEventListener(`close`,n,{once:!0}),r.showModal(),dl(r)})}function Tp({title:e,text:t,choices:n,cancelLabel:r=I(`common.cancel`)}){let i=document.getElementById(`dialog`),a=[t].flat().filter(Boolean);i.setAttribute(`aria-labelledby`,`dialog-title`),i.innerHTML=String(K`
    <h2 class="dialog__title" id="dialog-title">${e}</h2>
    ${a.map(e=>K`<p class="dialog__text">${e}</p>`)}
    <form method="dialog" class="dialog__actions">
      ${n.map(({value:e,label:t,variant:n=`primary`})=>K`<button class="btn btn--${n} btn--block" value="${e}">${t}</button>`)}
      <button class="btn btn--ghost btn--block" value="cancel" autofocus>${r}</button>
    </form>`);let o=n.map(e=>e.value),s=e=>o.includes(e)?e:null;return new Promise(e=>{let t=!1,n=n=>{t||(t=!0,e(n))};i.returnValue=``,i.querySelector(`form`).addEventListener(`submit`,e=>n(s(e.submitter?.value))),i.addEventListener(`close`,()=>n(s(i.returnValue)),{once:!0}),i.showModal(),dl(i)})}async function Ep({title:e,text:t,confirmLabel:n,cancelLabel:r}){return await Tp({title:e,text:t,choices:[{value:`confirm`,label:n}],cancelLabel:r})===`confirm`}var Dp=`/start/condition`,Op=[`vestibular_migraine`,`migraine`,`other_vestibular`,`unsure`];function kp({edit:e}){return{render(){let{step:t,total:n,prev:r}=bp(Dp);return J({form:!0,header:Y(e?{back:`/profile`}:{back:r,step:t,total:n}),body:K`
          <h1 class="screen-title" tabindex="-1">${I(`condition.title`)}</h1>
          <p class="screen-lead">${I(`condition.lead`)}</p>
          <div class="step-options">
            ${tf({name:`condition`,legend:I(`condition.title`),options:Op.map(e=>({value:e,label:I(`condition.options.${e}`)})),selected:P().condition??`vestibular_migraine`})}
          </div>`,footer:e?X({label:I(`common.save`),type:`submit`,block:!0}):K`
          ${X({label:I(`common.continue`),type:`submit`,block:!0})}
          ${X({label:I(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onSubmit(t){if(rn({condition:new FormData(t).get(`condition`)}),!e)return a(bp(Dp).next);Q(I(`profile.saved`)),a(`/profile`,{replace:!0})},actions:{skip(){a(bp(Dp).next)}}}}var Ap=kp({edit:!1}),jp=kp({edit:!0}),Mp=`/start/cycle`;function Np(){let{cycleTracking:e}=P();return e===!0?`yes`:e===!1?`no`:null}var Pp={render(){let{step:e,total:t,prev:n}=bp(Mp),r=Np();return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${I(`cycle.title`)}</h1>
        <p class="screen-lead">${I(`cycle.lead`)}</p>
        <div class="step-options">
          ${tf({name:`cycle`,legend:I(`cycle.title`),options:[{value:`yes`,label:I(`cycle.yes`)},{value:`no`,label:I(`cycle.no`)}],selected:r})}
        </div>`,footer:K`
        ${X({label:I(`common.continue`),type:`submit`,block:!0,id:`cycle-continue`,disabled:!r})}
        ${X({label:I(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onChange(e){e.name===`cycle`&&(document.getElementById(`cycle-continue`).disabled=!1)},onSubmit(e){let t=new FormData(e).get(`cycle`);t&&(rn({cycleTracking:t===`yes`}),a(bp(Mp).next))},actions:{skip(){a(bp(Mp).next)}}},Fp=`/start/medications`;function Ip(e){return[I(`medications.types.${e.type}`),e.dose,e.frequency].filter(Boolean).join(` · `)}var Lp={render(){let{step:e,total:t,prev:n}=bp(Fp),r=sn(),i=r.length>0;return J({header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${I(`medications.title`)}</h1>
        <p class="screen-lead">${I(`medications.lead`)}</p>
        ${i?K`
              <h2 class="visually-hidden">${I(`medications.added`)}</h2>
              <ul class="med-list">
                ${r.map(e=>K`
                    <li class="med">
                      <span class="med__main">
                        <span class="med__name">${e.name}</span>
                        <span class="med__meta">${Ip(e)}</span>
                      </span>
                      <button type="button" class="icon-btn" data-action="remove" data-id="${e.id}"
                        aria-label="${I(`medications.remove`,{name:e.name})}">
                        ${q(`x`,{size:20})}
                      </button>
                    </li>`)}
              </ul>`:gp({symbol:`pill`,size:240})}
        <p class="disclaimer">${q(`info`,{size:20})}<span>${I(`medications.disclaimer`)}</span></p>`,footer:i?K`
            ${X({label:I(`common.continue`),action:`next`,block:!0})}
            ${X({label:I(`medications.addAnother`),variant:`secondary`,action:`add`,iconName:`plus`,block:!0})}`:K`
            ${X({label:I(`medications.add`),action:`add`,iconName:`plus`,block:!0})}
            ${X({label:I(`common.skip`),variant:`ghost`,action:`next`,block:!0})}`})},actions:{add(){a(`/start/medications/new`)},async remove(e,t){e.disabled=!0,await cl(e.closest(`.med`)),fn(e.dataset.id),t.rerender()},next(){a(bp(Fp).next)}}},Rp=`/start/reminders`,zp={render(){let{step:e,total:t,prev:n}=bp(Rp),{reminder:r}=P();return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${I(`reminders.title`)}</h1>
        <p class="screen-lead">${I(`reminders.lead`)}</p>
        ${gp({symbol:`bell`,size:180})}
        <div class="step-options">
          ${tf({name:`reminder`,legend:I(`reminders.title`),options:[{value:`yes`,label:I(`reminders.yes`)},{value:`no`,label:I(`reminders.no`)}],selected:r.enabled?`yes`:null})}
        </div>
        <!-- Zobrazí sa iba pri „Áno“ (CSS :has), bez prekresľovania obrazovky -->
        <div class="reminder-extra">
          ${Z({label:I(`reminders.time`),name:`time`,type:`time`,value:r.time})}
          <p class="field__hint">${I(`reminders.permission`)}</p>
        </div>`,footer:X({label:I(`common.continue`),type:`submit`,block:!0})})},onChange(e){e.name===`reminder`&&e.value===`yes`&&sl(document.querySelector(`.reminder-extra`))},async onSubmit(e){let t=new FormData(e),n=t.get(`reminder`)===`yes`,r=String(t.get(`time`)||P().reminder.time);rn({reminder:{enabled:n&&await np(),time:r}}),ap(),Dl()}},Bp={name:``,type:`preventive`,dose:``,frequency:``,note:``,startDate:``};function Vp({returnTo:e}){let t=t=>typeof e==`function`?e(t):e;return{render(e){let n=e.params.id?cn(e.params.id):null,r={...Bp,...n??{}};return J({form:!0,header:Y({back:t(e)}),body:K`
          <h1 class="screen-title" tabindex="-1">${I(n?`treatment.edit`:`medForm.title`)}</h1>
          <div class="form-stack">
            ${Z({label:I(`medForm.name`),name:`name`,value:r.name,placeholder:I(`medForm.namePlaceholder`),required:!0})}
            <div class="field">
              <span class="field__label" aria-hidden="true">${I(`medForm.type`)}</span>
              ${nf({name:`type`,legend:I(`medForm.type`),selected:r.type,options:[{value:`preventive`,label:I(`medications.types.preventive`)},{value:`acute`,label:I(`medications.types.acute`)}]})}
            </div>
            ${Z({label:I(`medForm.dose`),name:`dose`,value:r.dose,placeholder:I(`medForm.dosePlaceholder`),optional:!0})}
            ${Z({label:I(`medForm.frequency`),name:`frequency`,value:r.frequency,placeholder:I(`medForm.frequencyPlaceholder`),optional:!0})}
            ${Z({label:I(`medForm.startDate`),name:`startDate`,type:`date`,value:r.startDate??``,optional:!0,hint:I(`medForm.startDateHint`)})}
            ${Z({label:I(`medForm.note`),name:`note`,value:r.note,multiline:!0,optional:!0})}
            <p class="disclaimer">${I(`medications.disclaimer`)}</p>
          </div>`,footer:X({label:I(`medForm.submit`),type:`submit`,block:!0})})},onSubmit(e,n){let r=new FormData(e),i=String(r.get(`name`)??``).trim();if(!i){rf(e,`name`,I(`medForm.nameRequired`));return}let a={name:i,type:r.get(`type`),dose:String(r.get(`dose`)??``),frequency:String(r.get(`frequency`)??``),note:String(r.get(`note`)??``),startDate:String(r.get(`startDate`)??``)||null};n.params.id&&cn(n.params.id)?(dn(n.params.id,a),Q(I(`profile.saved`))):Q(I(`medForm.saved`,{name:un(a).name})),s(t(n))}}}var Hp=[{key:`dizziness`,icon:`orbit`,info:!0},{key:`vertigo`,icon:`rotate3d`,info:!0},{key:`rocking`,icon:`sailboat`,info:!0},{key:`floating`,icon:`cloud`,info:!0},{key:`unsteadiness`,icon:`footprints`,info:!0},{key:`nausea`,icon:`waves`},{key:`vomiting`,icon:`droplets`},{key:`light_sensitivity`,icon:`sun`},{key:`sound_sensitivity`,icon:`volume`},{key:`visual_sensitivity`,icon:`eye`,info:!0},{key:`tinnitus`,icon:`audioWave`,info:!0},{key:`ear_pressure`,icon:`ear`},{key:`headache`,icon:`zap`},{key:`brain_fog`,icon:`cloudFog`,info:!0},{key:`fatigue`,icon:`battery`}],Up=[`moment`,`under_1h`,`1_3h`,`3_6h`,`6_12h`,`over_12h`],Wp=[`vestibular`,`migraine_headache`,`other`,`unsure`],Gp=[`poor_sleep`,`long_sleep`,`stress`,`skipped_meal`,`dehydration`,`caffeine`,`alcohol`,`exertion`,`illness`,`visual_stimulation`,`bright_light`,`strong_smells`,`screen_time`,`neck_pain`,`weather_change`,`menstrual_cycle`,`allergy`,`travel`,`other`],Kp={poor_sleep:`bed`,long_sleep:`moon`,stress:`brain`,skipped_meal:`utensils`,dehydration:`glassWater`,caffeine:`coffee`,alcohol:`wine`,exertion:`dumbbell`,illness:`thermometer`,visual_stimulation:`eye`,bright_light:`sun`,strong_smells:`wind`,screen_time:`monitor`,neck_pain:`bone`,weather_change:`cloud`,menstrual_cycle:`droplet`,allergy:`flower`,travel:`car`,other:`ellipsis`},qp=[`rest`,`sleep`,`dark_room`,`hydration`,`relaxation`,`cold_compress`,`warm_compress`,`shower`,`food`,`other`],Jp=[`work_study`,`sleep`,`daily_activities`,`social`,`movement`,`rest`,`other`,`none`],Yp=[`helped`,`partly`,`not_helped`,`unknown`];function Xp(e){return e==null?null:e===0?`none`:e<=3?`mild`:e<=6?`moderate`:`severe`}var Zp=`custom:`,Qp=e=>e.startsWith(Zp);function $p(e){return Qp(e)?kn(e)?.label??I(`symptoms.unknown`):I(`symptoms.${e}`)}var em=e=>Hp.find(t=>t.key===e)?.icon??`sparkles`;function tm(e){return e==null?I(`intensity.notSet`):I(`intensity.value`,{value:e,level:I(`intensity.${Xp(e)}`)})}function nm(e){return e.symptoms.map(e=>e.intensity==null?$p(e.key):`${$p(e.key)} ${e.intensity}`).join(`, `)}var rm=e=>I(`durations.${e}`),im=e=>I(`effects.${e}`),am=e=>I(`triggers.${e}`),om=e=>I(`episodeTypes.${e}`),sm=e=>I(`relief.${e}`),cm=e=>I(`impact.${e}`),lm=e=>I(`sleep.qualities.${e}`);function um({href:e,iconName:t,title:n,meta:r,badge:i}){return K`
    <li>
      <a class="entry" href="${e}">
        ${q(t)}
        <span class="entry__main">
          <span class="entry__title">${n}${i??``}</span>
          <span class="entry__meta">${r}</span>
        </span>
        ${q(`chevronRight`,{size:20})}
      </a>
    </li>`}function dm(e){return um({href:`#/episode/${e.id}`,iconName:`timer`,title:I(`episode.title`),badge:e.endedAt?``:sf(I(`episode.statusOngoing`),{live:!0}),meta:e.endedAt?`${pf(e.startedAt)} – ${ff(e.endedAt)} · ${bf(e.startedAt,e.endedAt)}`:I(`episode.since`,{time:pf(e.startedAt)})})}function fm(e){let t=Dn(e);return um({href:`#/symptom/${e.id}`,iconName:`activity`,title:nm(e),meta:[ff(e.occurredAt),t==null?``:I(`intensity.highest`,{value:tm(t)})].filter(Boolean).join(` · `)})}function pm(e){let t=cn(e.medicationId);return um({href:`#/intake/${e.id}`,iconName:`pill`,title:[t?.name??I(`today.intakeTitle`),e.dose].filter(Boolean).join(` `),meta:[ff(e.takenAt),e.effect?im(e.effect):``].filter(Boolean).join(` · `)})}function mm(e){return um({href:`#/sleep?date=${e.date}`,iconName:`bed`,title:I(`sleep.entry`,{duration:yf(e.minutes)}),meta:[e.quality?lm(e.quality):I(`sleep.title`),e.source&&e.source!==`manual`?I(`plus.health.providers.${e.source}`):``].filter(Boolean).join(` · `)})}function hm({episodes:e=[],symptomLogs:t=[],intakes:n=[],sleep:r=null}){return K`<ul class="entries">${[...e.map(e=>({at:e.startedAt,render:()=>dm(e)})),...t.map(e=>({at:e.occurredAt,render:()=>fm(e)})),...n.map(e=>({at:e.takenAt,render:()=>pm(e)})),...r?[{at:r.wakeTime??zt(r.date,`06:00`),render:()=>mm(r)}]:[]].sort((e,t)=>t.at.localeCompare(e.at)).map(e=>e.render())}</ul>`}var gm=`vestie-backup`,_m=5e6,vm=30,ym=14;async function bm(e){let t=await ye(dr(),e);return JSON.stringify({format:gm,version:1,createdAt:new Date().toISOString(),...t},null,2)}var xm=e=>e?.format===gm&&typeof e.kdf?.salt==`string`&&Number.isInteger(e.kdf?.iterations)&&e.kdf.iterations>0&&e.kdf.iterations<=_m&&typeof e.cipher?.iv==`string`&&typeof e.cipher?.data==`string`;function Sm(e){let t;try{t=JSON.parse(e)}catch{return null}return xm(t)?{kind:`encrypted`,backup:t,createdAt:t.createdAt??null}:Cr(t)?{kind:`newer`}:wr(t)?{kind:`plain`,records:t}:null}async function Cm(e,t){try{let n=await be(e,t);return Cr(n)?`newer`:wr(n)?n:null}catch{return null}}function wm(){let{episodes:e,symptomLogs:t,sleepLogs:n}=dr(),r=[...e.map(e=>e.startedAt),...t.map(e=>e.occurredAt),...n.map(e=>`${e.date}T12:00:00`)].map(e=>new Date(e).getTime()).filter(Number.isFinite);return r.length?Math.min(...r):null}function Tm(e=new Date){let{remind:t,lastAt:n,snoozedUntil:r}=P().backup;if(!t||r&&new Date(r)>e)return!1;if(n)return j(new Date(n),vm)<=e;let i=wm();return i!=null&&j(new Date(i),ym)<=e}var Em=null;function Dm({logId:e=null,date:t=null}={}){let n=e?Sn(e):null,r=n?new Date(n.occurredAt):new Date;return Em={id:n?.id??null,symptoms:n?n.symptoms.map(e=>({...e,pending:!1})):[],vertigoType:n?.vertigoType??null,duration:n?.duration??null,note:n?.note??``,date:n?k(r):t??k(r),time:Rt(r),episodeId:n?.episodeId??null,linkEpisode:!n||!!n.episodeId},Em}var Om=()=>Em;function km(){Em=null}function Am(){return[`/log/symptoms`,`/log/intensity`,`/log/details`]}function jm(e){let t=Am(),n=t.indexOf(e);return{step:n+1,total:t.length,prev:t[n-1]??null,next:t[n+1]??null}}var Mm=e=>e.intensity??(e.pending?5:null);function Nm(e,t){e.intensity=t,e.pending=!1}function Pm(e){e.pending&&Nm(e,5)}function Fm({index:e,label:t,value:n,iconName:r}){let i=`int-${e}`;return K`
    <div class="intensity ${n==null?`is-unset`:``}" data-index="${e}">
      <div class="intensity__head">
        ${r?K`<span class="intensity__icon">${q(r,{size:22})}</span>`:``}
        <label class="intensity__label" for="${i}">${t}</label>
      </div>
      <output class="intensity__value" for="${i}">${tm(n)}</output>
      <input class="range" type="range" id="${i}" data-index="${e}" min="0" max="10" step="1"
        value="${n??5}" aria-valuetext="${tm(n)}" />
      <div class="intensity__scale" aria-hidden="true"><span>0</span><span>5</span><span>10</span></div>
      <!-- Vynechať a späť zadať: jedno z dvoch tlačidiel je vždy viditeľné -->
      <div class="intensity__actions">
        <button type="button" class="pill-btn" data-action="clear" data-index="${e}" aria-label="${I(`log.clearLabel`,{name:t})}"${n==null?K` hidden`:``}>
          ${q(`x`,{size:16,strokeWidth:2.25})}${I(`log.clear`)}
        </button>
        <button type="button" class="pill-btn pill-btn--accent" data-action="restore" data-index="${e}"${n==null?``:K` hidden`}>
          ${q(`plus`,{size:16,strokeWidth:2.25})}${I(`log.restore`)}
        </button>
      </div>
    </div>`}function Im(e,t){let n=document.querySelector(`.intensity[data-index="${e}"]`),r=t==null;n.classList.toggle(`is-unset`,r),n.querySelector(`.intensity__value`).textContent=tm(t),n.querySelector(`[data-action="clear"]`).hidden=r,n.querySelector(`[data-action="restore"]`).hidden=!r;let i=n.querySelector(`input[type="range"]`);i.setAttribute(`aria-valuetext`,tm(t)),r&&(i.value=5)}var Lm=e=>e.normalize(`NFD`).replace(/\p{Diacritic}/gu,``).toLowerCase();function Rm(){return[...Hp.map(e=>({key:e.key,icon:e.icon,label:$p(e.key),info:!!e.info})),...On().map(e=>({key:e.key,icon:`sparkles`,label:e.label}))]}function zm({name:e,legend:t,items:n,selected:r,search:i=!1}){return K`
    <fieldset class="sym-grid">
      <legend class="visually-hidden">${t}</legend>
      ${n.map(t=>K`
          <div class="sym-cell ${t.info?`sym-cell--info`:``}"${i?K` data-search="${Lm(t.label)}"`:``}>
            <label class="sym-tile">
              <input type="checkbox" name="${e}" value="${t.key}" id="${e}-${t.key}"${r.includes(t.key)?K` checked`:``} />
              <span class="sym-tile__icon">${q(t.icon,{size:22})}</span>
              <span class="sym-tile__label">${t.label}</span>
              <span class="sym-tile__check">${q(`check`,{size:14,strokeWidth:3})}</span>
            </label>
            ${t.info?K`<button type="button" class="sym-tile__info" data-action="symptomInfo" data-key="${t.key}"
                  aria-label="${I(`symptomInfo.open`,{name:t.label})}">${q(`info`,{size:20})}</button>`:``}
          </div>`)}
    </fieldset>`}var Bm={symptomInfo(e){let{key:t}=e.dataset;wp({title:$p(t),text:I(`symptomInfo.${t}`),closeLabel:I(`symptomInfo.close`)}).then(()=>e.focus())}};function Vm(e){let{startedAt:t,endedAt:n}=e,r=n?Bt(t,n)?ff(n):pf(n):I(`episode.statusOngoing`);return`${pf(t)} – ${r} · ${bf(t,n??new Date)}`}function Hm(e=[],t,n){let r=e.filter(e=>e!==`other`).map(t);return e.includes(`other`)&&r.push(n?.trim()||t(`other`)),r.length?r.join(`, `):null}function Um(e){let t=Ln(e.id);return t.length?t.map(e=>[cn(e.medicationId)?.name,e.dose,ff(e.takenAt)].filter(Boolean).join(` · `)).join(`, `):null}function Wm(e,{withTime:t=!0}={}){return[{key:`type`,step:`type`,value:e.type?om(e.type):null},{key:`intensity`,step:`type`,value:e.intensity==null?null:tm(e.intensity)},t&&{key:`time`,value:Vm(e)},{key:`symptoms`,step:`symptoms`,value:e.symptoms?.length?nm(e):null},{key:`triggers`,step:`triggers`,value:Hm(e.triggers,am,e.triggerOther)},{key:`meds`,step:`meds`,value:Um(e)},{key:`helped`,step:`meds`,value:e.helped?im(e.helped):null},{key:`relief`,step:`relief`,value:Hm(e.relief,sm,e.reliefOther)},{key:`impact`,step:`impact`,value:Hm(e.impact,cm,e.impactOther)}].filter(Boolean)}var Gm=e=>Wm(e,{withTime:!1}).some(e=>e.value);function Km(e,{editable:t=!1}={}){return t?K`
      <ul class="summary-list">
        ${e.map(e=>{let t=I(`episodeFlow.sections.${e.key}`);return e.step?K`
            <li>
              <button type="button" class="summary-row summary-row--edit" data-action="edit" data-step="${e.step}">
                <span class="summary-row__text">
                  <span class="summary-row__label">${t}</span>
                  <span class="summary-row__value">${e.value}</span>
                </span>
                <span class="summary-row__edit" aria-hidden="true">${q(`pencil`,{size:18})}</span>
                <span class="visually-hidden">${I(`episodeFlow.edit`)}</span>
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
            <dt class="summary-row__label">${I(`episodeFlow.sections.${e.key}`)}</dt>
            <dd class="summary-row__value">${e.value}</dd>
          </div>`)}
    </dl>`}var $=null;function qm(e){let t=new Date(e.startedAt),n=e.endedAt&&new Date(e.endedAt)?t:new Date;return{episodeId:e.id,type:e.type??null,overall:{intensity:e.intensity??null,pending:e.intensity==null&&!Gm(e)},symptoms:(e.symptoms??[]).map(e=>({...e,pending:!1})),triggers:[...e.triggers??[]],triggerOther:e.triggerOther??``,medIds:[],medDate:k(n),medTime:Rt(n),helped:e.helped??null,relief:[...e.relief??[]],reliefOther:e.reliefOther??``,impact:[...e.impact??[]],impactOther:e.impactOther??``}}function Jm(e){return $=qm(e),`/episode/${e.id}/details/${Gm(e)?`summary`:`type`}`}function Ym(){return[`type`,`symptoms`,...$.symptoms.length?[`intensity`]:[],`triggers`,`meds`,`relief`,`impact`,`summary`]}var Xm=(e,t,n)=>n?[...new Set([...e,t])]:e.filter(e=>e!==t);function Zm(e,t){return rf(document.querySelector(`.screen`),e,t),!1}function Qm(e){let t=new Date(e);return t.setSeconds(0,0),t}function $m(){let e=$.episodeId;In(e,{type:$.type,intensity:$.overall.intensity,symptoms:$.symptoms.map(({key:e,intensity:t})=>({key:e,intensity:t})),triggers:[...$.triggers],triggerOther:$.triggers.includes(`other`)?$.triggerOther.trim():``,helped:$.helped,relief:[...$.relief],reliefOther:$.relief.includes(`other`)?$.reliefOther.trim():``,impact:[...$.impact],impactOther:$.impact.includes(`other`)?$.impactOther.trim():``})}function eh(){let e=jn($.episodeId),t=new Date(e.startedAt).getTime(),n=e.endedAt?new Date(e.endedAt).getTime():Date.now(),r=new Date(Math.min(Math.max(new Date(zt($.medDate,$.medTime)).getTime(),t),n)).toISOString();for(let e of sn().filter(e=>$.medIds.includes(e.id)))vn({medicationId:e.id,takenAt:r,dose:e.dose,effect:$.helped});$.medIds=[];let i=Ln($.episodeId);if($.helped)for(let e of i.filter(e=>!e.effect))yn(e.id,{effect:$.helped});In($.episodeId,{medicationIntakeIds:i.map(e=>e.id)})}var th=(e,t,n)=>K`
  <div class="field-row">
    ${Z({label:I(`episodeFlow.date`),name:`${e}Date`,type:`date`,value:t})}
    ${Z({label:I(`episodeFlow.time`),name:`${e}Time`,type:`time`,value:n})}
  </div>`,nh=(e,t,n)=>K`
  <div class="form-section" id="${e}-wrap"${t.includes(`other`)?``:K` hidden`}>
    ${Z({label:I(`episodeFlow.${e}`),name:e,value:n,placeholder:I(`episodeFlow.${e}Placeholder`),maxlength:80})}
  </div>`,rh={type:{title:()=>I(`episodeFlow.typeTitle`),lead:()=>I(`episodeFlow.typeLead`),body:()=>K`
      <div class="step-options">
        ${tf({name:`episodeType`,legend:I(`episodeFlow.sections.type`),options:[...Wp,...$.type&&!Wp.includes($.type)?[$.type]:[]].map(e=>({value:e,label:om(e)})),selected:$.type})}
      </div>
      <div class="intensity-list form-section">
        ${Fm({index:`overall`,label:I(`episodeFlow.intensity`),value:Mm($.overall)})}
      </div>`,onChange(e){e.name===`episodeType`&&($.type=e.value)},confirm:()=>Pm($.overall)},symptoms:{title:()=>I(`episodeFlow.symptomsTitle`),lead:()=>I(`episodeFlow.symptomsLead`),body:()=>K`
      ${zm({name:`symptom`,legend:I(`episodeFlow.symptomsTitle`),items:Rm(),selected:$.symptoms.map(e=>e.key)})}
      <form class="custom-add" data-form="custom">
        <label class="field__label" for="custom-symptom">${I(`log.custom`)}</label>
        <div class="custom-add__row">
          <input class="field__input" id="custom-symptom" name="custom" maxlength="40" autocomplete="off"
            placeholder="${I(`log.customPlaceholder`)}" />
          <button type="submit" class="btn btn--secondary btn--compact">${q(`plus`,{size:20})}<span>${I(`log.customAdd`)}</span></button>
        </div>
      </form>`,onChange(e){e.name===`symptom`&&(e.checked?$.symptoms.push({key:e.value,intensity:null,pending:!0}):$.symptoms=$.symptoms.filter(t=>t.key!==e.value))}},intensity:{title:()=>I(`log.intensityTitle`),lead:()=>I(`log.intensityLead`),body:()=>K`
      <div class="intensity-list">
        ${$.symptoms.map((e,t)=>Fm({index:t,label:$p(e.key),value:Mm(e),iconName:em(e.key)}))}
      </div>`,confirm:()=>$.symptoms.forEach(Pm)},triggers:{title:()=>I(`episodeFlow.triggersTitle`),lead:()=>I(`episodeFlow.triggersLead`),body:()=>K`
      ${zm({name:`trigger`,legend:I(`episodeFlow.triggersTitle`),items:Gp.map(e=>({key:e,icon:Kp[e],label:am(e)})),selected:$.triggers})}
      <div class="form-section" id="trigger-other"${$.triggers.includes(`other`)?``:K` hidden`}>
        ${Z({label:I(`episodeFlow.triggerOther`),name:`triggerOther`,value:$.triggerOther,placeholder:I(`episodeFlow.triggerOtherPlaceholder`),maxlength:80})}
      </div>`,onChange(e){e.name===`trigger`&&($.triggers=Xm($.triggers,e.value,e.checked),e.value===`other`&&(document.getElementById(`trigger-other`).hidden=!e.checked))},onInput(e){e.name===`triggerOther`&&($.triggerOther=e.value)}},meds:{title:()=>I(`episodeFlow.medsTitle`),lead:()=>I(`episodeFlow.medsLead`),body:()=>{let e=sn(),t=Ln($.episodeId);return K`
        ${t.length?K`<section class="form-section" aria-labelledby="meds-logged">
              <h2 class="section-title" id="meds-logged">${I(`episodeFlow.medsLogged`)}</h2>
              ${hm({intakes:t})}
            </section>`:``}
        ${e.length?K`
              <div class="step-options">
                ${tf({name:`med`,type:`checkbox`,legend:I(`episodeFlow.medsTitle`),options:e.map(e=>({value:e.id,label:[e.name,e.dose].filter(Boolean).join(` · `)})),selected:$.medIds})}
              </div>
              <fieldset class="form-section" id="med-when"${$.medIds.length?``:K` hidden`}>
                <legend class="section-title">${I(`episodeFlow.medsWhen`)}</legend>
                ${th(`med`,$.medDate,$.medTime)}
              </fieldset>`:K`<p class="empty form-section">${I(`episodeFlow.medsNone`)}</p>`}
        <div class="form-section">
          ${X({label:I(`episodeFlow.addMed`),iconName:`plus`,variant:`secondary`,action:`addMed`,block:!0})}
        </div>
        ${e.length||t.length?K`<fieldset class="form-section">
              <legend class="section-title">${I(`episodeFlow.helped`)}</legend>
              ${tf({name:`helped`,legend:I(`episodeFlow.helped`),options:Yp.map(e=>({value:e,label:im(e)})),selected:$.helped})}
            </fieldset>`:``}`},onChange(e){e.name===`med`&&($.medIds=Xm($.medIds,e.value,e.checked),document.getElementById(`med-when`).hidden=!$.medIds.length),e.name===`helped`&&($.helped=e.value),[`medDate`,`medTime`].includes(e.name)&&e.value&&($[e.name]=e.value)},validate(){if(!$.medIds.length)return!0;let e=jn($.episodeId),t=new Date(zt($.medDate,$.medTime));return t>=Qm(e.startedAt)&&t<=Qm(e.endedAt??new Date)||Zm(`medTime`,I(`episodeFlow.medsOutside`))},afterCommit:eh},relief:{title:()=>I(`episodeFlow.reliefTitle`),lead:()=>I(`episodeFlow.reliefLead`),body:()=>K`
      <div class="step-options">
        ${tf({name:`relief`,type:`checkbox`,legend:I(`episodeFlow.reliefTitle`),options:qp.map(e=>({value:e,label:sm(e)})),selected:$.relief})}
      </div>
      ${nh(`reliefOther`,$.relief,$.reliefOther)}`,onChange(e){e.name===`relief`&&($.relief=Xm($.relief,e.value,e.checked),e.value===`other`&&(document.getElementById(`reliefOther-wrap`).hidden=!e.checked))},onInput(e){e.name===`reliefOther`&&($.reliefOther=e.value)}},impact:{title:()=>I(`episodeFlow.impactTitle`),lead:()=>I(`episodeFlow.impactLead`),body:()=>K`
      <div class="step-options">
        ${tf({name:`impact`,type:`checkbox`,legend:I(`episodeFlow.impactTitle`),options:Jp.map(e=>({value:e,label:cm(e)})),selected:$.impact})}
      </div>
      ${nh(`impactOther`,$.impact,$.impactOther)}`,onChange(e){if(e.name!==`impact`)return;$.impact=Xm($.impact,e.value,e.checked);let t=$.impact.filter(e=>e!==`none`);if(e.checked&&(e.value===`none`?t.length:$.impact.includes(`none`))){$.impact=e.value===`none`?[`none`]:t;for(let e of document.querySelectorAll(`input[name="impact"]`))e.checked=$.impact.includes(e.value)}document.getElementById(`impactOther-wrap`).hidden=!$.impact.includes(`other`)},onInput(e){e.name===`impactOther`&&($.impactOther=e.value)}},summary:{title:()=>I(`episodeFlow.summaryTitle`),lead:()=>I(`episodeFlow.summaryLead`),body:e=>{let t=Wm(e),n=t.filter(e=>!e.value);return K`
        <div class="summary-status">
          ${e.endedAt?sf(I(`episode.statusEnded`),{neutral:!0}):sf(I(`episode.statusOngoing`),{live:!0})}
        </div>
        ${Km(t.filter(e=>e.value),{editable:!0})}
        ${n.length?K`<section class="summary-missing" aria-labelledby="missing-title">
              <h2 class="section-title" id="missing-title">${I(`episodeFlow.summaryMissing`)}</h2>
              <div class="summary-missing__list">
                ${n.map(e=>K`<button type="button" class="chip-btn" data-action="edit" data-step="${e.step}">
                    ${q(`plus`,{size:16})}${I(`episodeFlow.sections.${e.key}`)}
                  </button>`)}
              </div>
            </section>`:``}`}}};function ih(){return J({header:Y({back:`/today`}),body:K`<h1 class="screen-title" tabindex="-1">${I(`episode.title`)}</h1>
      <p class="screen-lead">${I(`episode.notFound`)}</p>`})}var ah=e=>rh[e.params.step]&&Ym().includes(e.params.step)?e.params.step:`type`;function oh(e){let t=rh[ah(e)];return t.validate&&!t.validate()?!1:($m(),t.afterCommit?.(),!0)}var sh=(e,t)=>`/episode/${e.params.id}/details/${t}`,ch=e=>e===`overall`?$.overall:$.symptoms[Number(e)],lh={render(e){let t=jn(e.params.id);if(!t)return ih();(!$||$.episodeId!==t.id)&&($=qm(t));let n=ah(e),r=rh[n],i=Ym();return J({header:Y({backAction:`prevStep`,step:i.indexOf(n)+1,total:i.length}),body:K`
        <h1 class="screen-title" tabindex="-1">${r.title(t)}</h1>
        ${r.lead?K`<p class="screen-lead">${r.lead(t)}</p>`:``}
        ${r.body(t)}`,footer:n===`summary`?X({label:I(`episodeFlow.save`),iconName:`check`,action:`save`,block:!0}):K`
              ${X({label:I(`common.continue`),action:`next`,block:!0})}
              ${X({label:I(`episode.saveLater`),variant:`ghost`,action:`later`,block:!0})}`})},onChange(e,t){if(e.type===`range`)return this.onInput(e,t);rh[ah(t)].onChange?.(e)},onInput(e,t){if(e.type===`range`){let t=Number(e.value);Nm(ch(e.dataset.index),t),Im(e.dataset.index,t)}else rh[ah(t)].onInput?.(e)},onSubmit(e,t){if(e.dataset.form!==`custom`)return;let n=An(e.elements.custom.value);n&&($.symptoms.some(e=>e.key===n.key)||$.symptoms.push({key:n.key,intensity:null,pending:!0}),t.rerender())},actions:{...Bm,clear(e){let{index:t}=e.dataset;Nm(ch(t),null),Im(t,null),document.querySelector(`[data-action="restore"][data-index="${t}"]`).focus()},restore(e){let{index:t}=e.dataset;Nm(ch(t),5),Im(t,5),document.getElementById(`int-${t}`).focus()},next(e,t){if(rh[ah(t)].confirm?.(),!oh(t))return;let n=Ym(),r=n[n.indexOf(ah(t))+1],i=t.query.from===`summary`,o=i&&r!==`intensity`?`summary`:r;a(`${sh(t,o)}${i&&o!==`summary`?`?from=summary`:``}`,{replace:!0})},prevStep(e,t){if(!oh(t))return;let n=Ym(),r=n.indexOf(ah(t));t.query.from===`summary`?a(sh(t,`summary`),{replace:!0}):a(r>0?sh(t,n[r-1]):`/episode/${t.params.id}`,{replace:!0})},later(e,t){oh(t)&&($=null,a(`/today`,{replace:!0}),Q(I(`episode.savedLater`)))},save(){$m(),$=null,a(`/today`,{replace:!0}),Q(I(`episodeFlow.saved`))},edit(e,t){a(`${sh(t,e.dataset.step)}?from=summary`,{replace:!0})},addMed(e,t){oh(t)&&a(`/treatment/new`)}}};function uh(e){return K`
    <section class="card card--accent episode-live" aria-labelledby="live-title">
      <div class="episode-live__head">
        ${sf(I(`episode.statusOngoing`),{live:!0})}
        <span class="muted small">${I(`episode.since`,{time:pf(e.startedAt)})}</span>
      </div>
      <div>
        <h2 class="card__title" id="live-title">${I(`episode.title`)}</h2>
        <p class="muted">${I(`episode.lasting`,{duration:bf(e.startedAt)})}</p>
      </div>
      <div class="btn-row">
        ${X({label:I(`episode.addDetails`),variant:`secondary`,action:`details`,compact:!0})}
        ${X({label:I(`episode.end`),variant:`secondary`,action:`endEpisode`,data:{id:e.id},compact:!0})}
      </div>
    </section>`}function dh(e,t,n,{href:r,add:i,empty:a=!1}={}){let o=K`
    <span class="tile__label">${q(e,{size:18})}${t}</span>
    <span class="tile__value${a?` tile__value--empty`:``}">${n}</span>`;return r?K`<a class="tile tile--link" href="${r}">${o}</a>`:i?K`
    <div class="tile tile--with-add">
      ${o}
      <a class="tile__add" href="${i.href}" aria-label="${i.label}" title="${i.label}">${q(`plus`,{size:22,strokeWidth:2.25})}</a>
    </div>`:K`<div class="tile">${o}</div>`}var fh=(e,t,n)=>dh(e,t,K`<span class="tile__lock">${q(`lock`,{size:14})}${I(`plus.name`)}</span>`,{href:`#/plus?from=${n}`});function ph(){let e=I(`today.pressure`),t=I(`today.steps`);if(!F())return[fh(`gauge`,e,`weather`),fh(`footprints`,t,`health`)];let{weather:n,health:r}=P(),i=n.enabled?tr(k()):null,a=r.connected&&r.types.includes(`steps`)?ar(k()):null;return[i?dh(`gauge`,e,[Df(i.pressure),i.pressureChange==null?``:Af(i.pressureChange)].filter(Boolean).join(` · `),{href:`#/plus/weather`}):dh(`gauge`,e,I(`today.turnOn`),{href:`#/plus/weather`,empty:!0}),a?.steps==null?dh(`footprints`,t,cu()?I(`today.connect`):I(`today.mobileOnly`),{href:`#/plus/health`,empty:!0}):dh(`footprints`,t,Nf(a.steps),{href:`#/plus/health`})]}function mh(e){let t=new Map;for(let n of e)for(let e of n.symptoms){let n=t.get(e.key);t.set(e.key,n==null?e.intensity:Math.max(n,e.intensity??n))}return K`
    <ul class="sym-chips" aria-label="${I(`today.symptomsToday`)}">
      ${[...t].map(([e,t])=>K`<li class="sym-chip">${$p(e)}${t==null?``:K` <strong>${t}</strong>`}</li>`)}
    </ul>`}function hh(){if(!Tm())return``;let{lastAt:e}=P().backup;return K`
    <section class="card backup-card" aria-labelledby="backup-title">
      <div class="backup-card__head">
        ${q(`backup`,{size:22})}
        <h2 class="card__title" id="backup-title">${I(`backup.card.title`)}</h2>
      </div>
      <p class="muted">${e?I(`backup.card.textOld`,{date:hf(e)}):I(`backup.card.textNever`)}</p>
      <div class="btn-row">
        ${X({label:I(`backup.card.action`),variant:`secondary`,action:`openBackup`,compact:!0})}
        ${X({label:I(`backup.card.later`),variant:`ghost`,action:`snoozeBackup`,compact:!0})}
      </div>
    </section>`}function gh(){let e=K`<span class="visually-hidden">${I(`community.external`)}</span>`,t=(t,n)=>{let r=K`
      ${q(n)}
      <span class="list__text">
        <span class="list__label">${I(`community.${t}`)}</span>
        <span class="list__hint">${I(`community.${t}Hint`)}</span>
      </span>`;return Se[t]?K`
      <a class="list__row" href="${Se[t]}" target="_blank" rel="noopener noreferrer">
        ${r}
        <span class="community__ext">${q(`externalLink`,{size:18})}</span>
        ${e}
      </a>`:K`<div class="list__row">${r}${sf(I(`community.soon`),{neutral:!0})}</div>`};return K`
    <section class="section" aria-labelledby="community-title">
      <h2 class="section-title" id="community-title">${I(`community.title`)}</h2>
      <p class="community__lead">${I(`community.lead`)}</p>
      <div class="list">${t(`facebook`,`users`)}${t(`instagram`,`camera`)}${t(`discord`,`messages`)}</div>
      <div class="community-web">
        <h3 class="community-web__title">${I(`community.webTitle`)}</h3>
        <p class="muted">${I(`community.webText`)}</p>
        <a class="community-web__link" href="${Se.web}" target="_blank" rel="noopener noreferrer">
          ${I(`community.webUrl`)}${q(`externalLink`,{size:18})}${e}
        </a>
      </div>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${I(`community.note`)}</span></p>
    </section>`}var _h={render(){let{name:e}=P(),t=pr(),n=Mn(),r=t.episodes.length+t.symptomLogs.length+t.intakes.length>0||!!t.sleep,i=t.sleep?[yf(t.sleep.minutes),t.sleep.quality?lm(t.sleep.quality):``].filter(Boolean).join(` · `):``,a=`#/sleep?date=${k()}`,o=I(`today.nothingYet`);return Jd(`today`,K`
      <header class="today-header">
        <h1 class="screen-title today-title" tabindex="-1">
          ${e?I(`today.greetingName`,{name:e}):I(`today.greeting`)}
        </h1>
        ${$d()}
        <p class="today-date">${df()}</p>
      </header>

      ${n?uh(n):``}

      <section class="card feeling" aria-labelledby="feeling-title">
        <h2 class="card__title" id="feeling-title">${I(`today.howAreYou`)}</h2>
        ${t.symptomLogs.length?mh(t.symptomLogs):K`${gp({size:150})}<p class="muted">${I(`today.noEntries`)}</p>`}
        <div class="btn-row">
          ${X({label:I(`today.addSymptom`),iconName:`plus`,action:`addSymptom`,compact:!0})}
        </div>
      </section>

      ${n?``:qf()}

      <section class="section" aria-labelledby="overview-title">
        <h2 class="section-title" id="overview-title">${I(`today.overview`)}</h2>
        <div class="tiles tiles--grid">
          ${t.sleep?dh(`bed`,I(`today.sleep`),i,{href:a}):dh(`bed`,I(`today.sleep`),o,{empty:!0,add:{href:a,label:I(`sleep.add`)}})}
          ${dh(`pill`,I(`today.meds`),t.intakes.length?L(`plural.entries`,t.intakes.length):o,{empty:!t.intakes.length,add:{href:`#/medication-intake`,label:I(`today.logIntake`)}})}
          ${ph()}
        </div>
        ${r?hm(t):K`<p class="empty">${I(`today.entriesEmpty`)}</p>`}
      </section>

      ${n?``:hh()}

      ${gh()}`)},mount(e,t){if(!Mn())return null;let n=setInterval(()=>t.rerender(),3e4);return()=>clearInterval(n)},actions:{addSymptom(){Dm(),a(`/log/symptoms`)},details(){a(Jm(Mn()))},openBackup(){a(`/backup`)},async snoozeBackup(e,t){await cl(e.closest(`.backup-card`)),Or(14),t.rerender()},async endEpisode(e,t){let{id:n}=e.dataset;e.disabled=!0,await cl(e.closest(`.episode-live`)),Fn(n),t.rerender(),Q(I(`episode.endedToast`),{actionLabel:I(`common.undo`),onAction:()=>{Rn(n),t.rerender()}})}}};function vh(){return J({header:Y({back:`/today`}),body:K`<h1 class="screen-title" tabindex="-1">${I(`episode.title`)}</h1>
      <p class="screen-lead">${I(`episode.notFound`)}</p>`})}function yh(e){return J({variant:`screen--center`,header:Y({back:`/today`}),body:K`
      <div class="episode-started">
        ${lf(`timer`,{large:!0})}
        <h1 class="screen-title" tabindex="-1">${I(`episode.started`)}</h1>
        <p class="big-time">
          <span class="big-time__label">${I(`episode.startedAt`)}</span>
          <time datetime="${e.startedAt}">${ff(e.startedAt)}</time>
        </p>
        <p class="muted">${I(`episode.detailsLater`)}</p>
      </div>`,footer:K`
      ${X({label:I(`episode.addDetails`),action:`addDetails`,block:!0})}
      ${X({label:I(`episode.finishLater`),variant:`outline`,action:`finishLater`,block:!0})}
      <p class="mistake">
        <span>${I(`episode.mistake`)}</span>
        <button type="button" class="link-btn" data-action="cancelNew">${I(`episode.cancel`)}</button>
      </p>`})}function bh(e){let t=Cn(e.id),n=mn().filter(t=>t.episodeId===e.id);return K`
    ${t.length?K`<section class="section"><h2 class="section-title">${I(`episode.linkedSymptoms`)}</h2>${hm({symptomLogs:t})}</section>`:``}
    ${n.length?K`<section class="section"><h2 class="section-title">${I(`episode.linkedIntakes`)}</h2>${hm({intakes:n})}</section>`:``}`}function xh(e){let t=!e.endedAt,n=Gm(e),r=Wm(e,{withTime:!1}).filter(e=>e.value);return J({header:Y({back:`/today`}),body:K`
      <div class="episode-head">
        <h1 class="screen-title" tabindex="-1">${I(`episode.title`)}</h1>
        ${t?sf(I(`episode.statusOngoing`),{live:!0}):sf(I(`episode.statusEnded`),{neutral:!0})}
      </div>
      <p class="screen-lead">${df(new Date(e.startedAt))}</p>
      <dl class="facts">
        <div class="fact">
          <dt>${I(`episode.startedAt`)}</dt>
          <dd>${ff(e.startedAt)}</dd>
        </div>
        <div class="fact">
          <dt>${I(`episode.endedAt`)}</dt>
          <dd>${t?`—`:ff(e.endedAt)}</dd>
        </div>
        <div class="fact">
          <dt>${I(`episode.duration`)}</dt>
          <dd>${bf(e.startedAt,e.endedAt??new Date)}</dd>
        </div>
      </dl>
      ${n?K`<section class="section" aria-labelledby="details-title">
            <h2 class="section-title" id="details-title">${I(`episode.details`)}</h2>
            ${Km(r)}
          </section>`:``}
      ${Hf(k(e.startedAt))?K`<section class="section" aria-labelledby="context-title">
            <h2 class="section-title" id="context-title">${I(`plus.weather.episodeDay`)}</h2>
            ${Hf(k(e.startedAt))}
          </section>`:``}
      ${bh(e)}`,footer:K`
      ${t?X({label:I(`episode.end`),action:`end`,block:!0}):``}
      ${X({label:I(n?`episode.editDetails`:`episode.addDetails`),variant:t?`secondary`:`primary`,action:`addDetails`,block:!0})}
      ${t||n?``:X({label:I(`episode.saveLater`),variant:`secondary`,action:`saveLater`,block:!0})}
      ${X({label:I(`episode.delete`),variant:`danger`,action:`delete`,block:!0})}`})}var Sh={render(e){let t=jn(e.params.id);return t?e.query.new===`1`&&!t.endedAt?yh(t):xh(t):vh()},actions:{addDetails(e,t){a(Jm(jn(t.params.id)),{replace:t.query.new===`1`})},saveLater(){a(`/today`,{replace:!0}),Q(I(`episode.savedLater`))},finishLater(){a(`/today`,{replace:!0})},cancelNew(e,t){let n=zn(t.params.id);a(`/today`,{replace:!0}),Q(I(`episode.cancelledToast`),{actionLabel:I(`common.undo`),onAction:()=>{Bn(n),t.rerender()}})},end(e,t){let{id:n}=t.params;Fn(n),t.rerender(),Q(I(`episode.endedToast`),{actionLabel:I(`common.undo`),onAction:()=>{Rn(n),t.rerender()}})},async delete(e,t){if(!await Ep({title:I(`episode.deleteTitle`),text:I(`episode.deleteText`),confirmLabel:I(`episode.delete`)}))return;let n=zn(t.params.id);s(`/today`),Q(I(`episode.deletedToast`),{actionLabel:I(`common.undo`),onAction:()=>{Bn(n),t.rerender()}})}}};function Ch(e){return K`
    <li>
      <a class="entry" href="#/treatment/${e.id}/intake" data-replace>
        <span class="entry__main">
          <span class="entry__title">${[e.name,e.dose].filter(Boolean).join(` · `)}</span>
          ${e.frequency?K`<span class="entry__meta">${e.frequency}</span>`:``}
        </span>
        ${q(`chevronRight`,{size:20})}
      </a>
    </li>`}function wh(e,t){let n=t.filter(t=>t.type===e);return n.length?K`
    <section class="section" aria-labelledby="pick-${e}">
      <h2 class="section-title" id="pick-${e}">${I(`treatment.${e}`)}</h2>
      <ul class="entries">${n.map(Ch)}</ul>
    </section>`:``}var Th={render(){let e=sn();return J({header:Y({back:`/today`}),body:K`
        <h1 class="screen-title" tabindex="-1">${I(`quickIntake.title`)}</h1>
        ${e.length?K`<p class="screen-lead">${I(`quickIntake.lead`)}</p>${wh(`acute`,e)}${wh(`preventive`,e)}`:K`<p class="screen-lead">${I(`quickIntake.empty`)}</p>`}`,footer:X({label:I(`quickIntake.add`),iconName:`plus`,variant:e.length?`secondary`:`primary`,action:`add`,block:!0})})},actions:{add(){a(`/treatment/new`)}}};function Eh(){return yl(()=>Je(`${k()}.json`,JSON.stringify(dr(),null,2)))}async function Dh({title:e,text:t,confirmLabel:n,offerBackup:r=!0}){let i=await Tp({title:e,text:[t,F()&&!P().plus.simulated?I(`privacy.plusNotCancelled`,{store:Fu()}):``],choices:[{value:`erase`,label:n},...r?[{value:`backup`,label:I(`privacy.backupFirst`),variant:`outline`}]:[]]});return i===`backup`&&a(`/backup`),i===`erase`&&(lp(),Ye(),kr(),el(),a(`/start/language`,{replace:!0}),!0)}function Oh(e=navigator.userAgent){let t=(e.match(/\(([^)]*)\)/)?.[1]??``).split(`;`).map(e=>e.trim()).filter(Boolean),n=t.findIndex(e=>/^Android\b/.test(e));if(n>=0){let e=(t[n+1]??``).replace(/\s*Build\/.*$/,``);return{system:t[n],device:e&&e!==`wv`&&e!==`K`?e:``}}let r=e.match(/(iPhone|iPad)[^)]*?OS ([\d_]+)/);return r?{system:`iOS ${r[2].replace(/_/g,`.`)}`,device:r[1]}:{system:t[0]??``,device:``}}async function kh(){let e=await Pe().catch(()=>``),{system:t,device:n}=Oh();return{version:e,system:t,device:n}}function Ah({version:e,system:t,device:n}){let r=I(`app.name`),i=I(`bugReport.subject`,{app:r,version:e}),a=I(`bugReport.body`,{app:r,version:e,system:t||`–`,device:n||`–`}).replace(/\r?\n/g,`\r
`);return`mailto:${xe}?subject=${encodeURIComponent(i)}&body=${encodeURIComponent(a)}`}var jh=[0,1,5,15];function Mh(e){let t=pt();return K`
    <section class="profile-section" aria-labelledby="security-title">
      <h2 id="security-title">${I(`security.title`)}</h2>
      <div class="list">
        ${of({name:`appLock`,label:I(`security.pin`),hint:I(t?`security.pinOnHint`:`security.pinOffHint`),checked:t,iconName:`lock`})}
        ${t?K`
              <a class="list__row" href="#/security/pin?mode=change">
                ${q(`keyRound`)}<span class="list__label">${I(`security.changePin`)}</span>${q(`chevronRight`,{size:20})}
              </a>
              <div class="list__field">
                <label class="field__label" for="f-autoLock">${I(`security.autoLock`)}</label>
                <select class="field__input" id="f-autoLock" name="autoLock">
                  ${jh.map(t=>K`<option value="${t}"${t===(e.autoLockMinutes??1)?K` selected`:``}>
                      ${I(`security.autoLockOptions.m${t}`)}
                    </option>`)}
                </select>
              </div>`:``}
        ${Ne()?``:K`<label class="list__row list__row--switch is-disabled" for="f-biometrics">
              ${q(`scanFace`)}
              <span class="list__text">
                <span class="list__label">${I(`security.biometrics`)}</span>
                <span class="list__hint" id="f-biometrics-hint">${I(`security.biometricsHint`)}</span>
              </span>
              <input class="switch" type="checkbox" role="switch" id="f-biometrics" disabled aria-describedby="f-biometrics-hint" />
            </label>`}
      </div>
    </section>`}var Nh={render(){let e=P();return Jd(`profile`,K`
      <h1 class="screen-title" tabindex="-1">${I(`profile.title`)}</h1>

      ${K`<section class="profile-section" aria-labelledby="demo-title">
            <h2 id="demo-title">${I(`profile.demoSection`)}</h2>
            <div class="list">
              ${of({name:`demoEnabled`,label:I(`profile.demoFill`),hint:I(`profile.demoFillHint`),checked:e.demoEnabled,iconName:`sparkles`})}
              ${of({name:`demoPlus`,label:I(`profile.demoPlus`),hint:I(`profile.demoPlusHint`),checked:F(),iconName:`lock`})}
            </div>
          </section>`}

      <section class="profile-section" aria-labelledby="plus-title">
        <h2 id="plus-title">${I(`plus.name`)}</h2>
        <div class="list">
          <a class="list__row" href="#/plus">
            ${q(`sparkles`)}
            <span class="list__text">
              <span class="list__label">${I(F()?`profile.plusActive`:`profile.plusTry`)}</span>
              <span class="list__hint">${Xn()?I(`plus.manage.trialUntil`,{date:hf(Xn())}):I(`profile.plusHint`)}</span>
            </span>
            ${q(`chevronRight`,{size:20})}
          </a>
        </div>
      </section>

      <section class="profile-section" aria-labelledby="me-title">
        <h2 id="me-title">${I(`profile.me`)}</h2>
        ${Z({label:I(`profile.name`),name:`name`,value:e.name,placeholder:I(`profile.namePlaceholder`),hint:I(`profile.nameHint`),autocomplete:`given-name`,maxlength:40})}
      </section>

      <section class="profile-section" aria-labelledby="lang-title">
        <h2 id="lang-title">${I(`profile.language`)}</h2>
        <label class="visually-hidden" for="f-language">${I(`profile.language`)}</label>
        <select class="field__input" id="f-language" name="language">
          ${Hr.map(t=>K`<option value="${t}" lang="${t}"${t===e.language?K` selected`:``}>${Xr(t,`language.${t}`)}</option>`)}
        </select>
      </section>

      <section class="profile-section" aria-labelledby="tracking-title">
        <h2 id="tracking-title">${I(`profile.tracking`)}</h2>
        <div class="list">
          <a class="list__row" href="#/profile/condition">
            ${q(`activity`)}
            <span class="list__text">
              <span class="list__label">${I(`profile.condition`)}</span>
              <span class="list__hint">${e.condition?I(`condition.options.${e.condition}`):I(`profile.conditionNone`)}</span>
            </span>
            ${q(`chevronRight`,{size:20})}
          </a>
          ${of({name:`cycleTracking`,label:I(`profile.cycle`),checked:e.cycleTracking===!0,iconName:`calendar`})}
          ${of({name:`reminderEnabled`,label:I(`profile.reminders`),checked:e.reminder.enabled,iconName:`bell`})}
          ${e.reminder.enabled?K`<div class="list__field">
                ${Z({label:I(`profile.reminderTime`),name:`reminderTime`,type:`time`,value:e.reminder.time})}
              </div>`:``}
        </div>
      </section>

      <section class="profile-section" aria-labelledby="display-title">
        <h2 id="display-title">${I(`profile.display`)}</h2>
        <div class="list">
          <div class="list__field list__field--first">
            <span class="field__label" aria-hidden="true">${I(`profile.appearance`)}</span>
            ${nf({name:`theme`,legend:I(`profile.appearance`),selected:e.theme??`system`,options:fl.map(e=>({value:e,label:I(`profile.themes.${e}`)}))})}
          </div>
        </div>
      </section>

      <section class="profile-section" aria-labelledby="integrations-title">
        <h2 id="integrations-title">${I(`profile.integrations`)}</h2>
        <div class="list">
          <a class="list__row" href="${F()?`#/plus/health`:`#/plus?from=health`}">
            ${q(`watch`)}
            <span class="list__text">
              <span class="list__label">${I(`profile.health`)}</span>
              <span class="list__hint">${I(Lf(`profile.healthHint`))}</span>
            </span>
            ${F()?``:q(`lock`,{size:18,label:I(`plus.lockedLabel`)})}
            ${q(`chevronRight`,{size:20})}
          </a>
          <a class="list__row" href="${F()?`#/plus/weather`:`#/plus?from=weather`}">
            ${q(`gauge`)}
            <span class="list__text">
              <span class="list__label">${I(`plus.features.weather.title`)}</span>
              <span class="list__hint">${I(`profile.weatherHint`)}</span>
            </span>
            ${F()?``:q(`lock`,{size:18,label:I(`plus.lockedLabel`)})}
            ${q(`chevronRight`,{size:20})}
          </a>
        </div>
      </section>

      ${Mh(e)}

      <section class="profile-section" aria-labelledby="privacy-title">
        <h2 id="privacy-title">${I(`profile.privacy`)}</h2>
        <div class="list">
          <div class="list__row">
            ${q(`smartphone`)}
            <span class="list__text">
              <span class="list__label">${I(`privacy.deviceOnly`)}</span>
              <span class="list__hint">${I(`privacy.deviceOnlyHint`)}</span>
            </span>
          </div>
          <a class="list__row" href="#/backup">
            ${q(`backup`)}
            <span class="list__text">
              <span class="list__label">${I(`backup.title`)}</span>
              <span class="list__hint">${e.backup.lastAt?I(`backup.lastAt`,{date:hf(e.backup.lastAt)}):I(`backup.profileHint`)}</span>
            </span>
            ${q(`chevronRight`,{size:20})}
          </a>
          <button type="button" class="list__row" data-action="exportData">
            ${q(`download`)}
            <span class="list__text">
              <span class="list__label">${I(`privacy.export`)}</span>
              <span class="list__hint">${I(`privacy.exportHint`)}</span>
            </span>
          </button>
          <a class="list__row" href="#/privacy-policy">
            ${q(`fileText`)}
            <span class="list__label">${I(`privacyPolicy.title`)}</span>
            ${q(`chevronRight`,{size:20})}
          </a>
          <a class="list__row" href="#/terms">
            ${q(`fileText`)}
            <span class="list__label">${I(`terms.title`)}</span>
            ${q(`chevronRight`,{size:20})}
          </a>
          <a class="list__row" href="#/about">
            ${q(`info`)}
            <span class="list__label">${I(`about.row`)}</span>
            ${q(`chevronRight`,{size:20})}
          </a>
          <div class="list__row">
            ${q(`shield`)}
            <span class="list__text">
              <span class="list__label">${I(`privacy.consent`)}</span>
              <span class="list__hint">
                ${e.consent?.healthDataAt?I(`privacy.consentGiven`,{date:hf(e.consent.healthDataAt)}):``}
              </span>
              <button type="button" class="link-btn list__chip" data-action="withdrawConsent">${I(`privacy.withdraw`)}</button>
            </span>
          </div>
          <button type="button" class="list__row list__row--danger" data-action="deleteAll">
            ${q(`trash`)}
            <span class="list__label">${I(`profile.deleteAll`)}</span>
          </button>
        </div>
      </section>

      <section class="profile-section" aria-labelledby="help-title">
        <h2 id="help-title">${I(`profile.help`)}</h2>
        <div class="list">
          <button type="button" class="list__row" data-action="reportBug">
            ${q(`bug`)}
            <span class="list__text">
              <span class="list__label">${I(`profile.reportBug`)}</span>
              <span class="list__hint">${I(`profile.reportBugHint`)}</span>
            </span>
          </button>
        </div>
      </section>

      <div class="section">
        ${X({label:I(`profile.logout`),variant:`outline`,iconName:`logOut`,action:`logout`,block:!0})}
      </div>

      <p class="disclaimer">${q(`info`,{size:20})}<span>${I(`profile.disclaimer`)}</span></p>`,{header:Y({back:`/today`})})},async onChange(e,t){let{reminder:n}=P();switch(e.name){case`name`:rn({name:e.value.trim(),nameSetAt:e.value.trim()?new Date().toISOString():null}),Q(I(`profile.saved`));break;case`language`:Gr(e.value),rn({language:e.value}),_t({language:e.value}),cp(),t.rerender();break;case`theme`:rn({theme:e.value}),_t({theme:e.value}),hl(e.value);break;case`demoEnabled`:e.checked?_r(Br(new Date,Kr())):vr(),t.rerender(),Q(I(e.checked?`profile.demoFillOn`:`profile.demoFillOff`));break;case`demoPlus`:e.checked?Uu(`yearly`):Qu(),t.rerender();break;case`appLock`:a(`/security/pin?mode=${e.checked?`set`:`disable`}`);break;case`autoLock`:rn({autoLockMinutes:Number(e.value)}),Q(I(`profile.saved`));break;case`cycleTracking`:rn({cycleTracking:e.checked});break;case`reminderEnabled`:{let r=e.checked&&await np();e.checked&&!r&&Q(I(`notifications.denied`)),rn({reminder:{...n,enabled:r}}),ap(),t.rerender(),r&&sl(document.querySelector(`.list__field`));break}case`reminderTime`:e.value&&(rn({reminder:{...n,time:e.value}}),ap())}},actions:{async exportData(e,t){try{if(!await Eh())return;Er(),t.rerender(),Q(I(`privacy.exportDone`))}catch(e){console.error(`[profile] Export sa nepodaril`,e),Q(I(`privacy.exportFailed`))}},async logout(){pt()?wl():await Ep({title:I(`profile.logoutNoPinTitle`),text:I(`profile.logoutNoPinText`),confirmLabel:I(`profile.logoutNoPinConfirm`)})&&a(`/security/pin?mode=set&logout=1`)},async reportBug(){let e=await kh();await Ep({title:I(`bugReport.title`),text:[I(`bugReport.open`,{email:`support@vestibularnamigrena.sk`}),I(`bugReport.details`,{details:[e.version,e.system,e.device].filter(Boolean).join(`, `)}),I(`bugReport.health`)],confirmLabel:I(`bugReport.confirm`),cancelLabel:I(`common.close`)})&&(window.location.href=Ah(e))},withdrawConsent(){return Dh({title:I(`privacy.withdrawTitle`),text:I(`privacy.withdrawText`),confirmLabel:I(`privacy.withdrawConfirm`)})},deleteAll(){return Dh({title:I(`profile.deleteAllTitle`),text:I(`profile.deleteAllText`),confirmLabel:I(`profile.deleteAllConfirm`)})}}},Ph=null;function Fh(){let{lastAt:e,remind:t}=P().backup;return J({header:Y({back:`/profile`}),form:!0,body:K`
      <h1 class="screen-title" tabindex="-1">${I(`backup.title`)}</h1>
      <p class="screen-lead">${I(`backup.lead`)}</p>
      <p class="backup-status">
        ${q(e?`check`:`info`,{size:20})}
        <span>${e?I(`backup.lastAt`,{date:hf(e)}):I(`backup.never`)}</span>
      </p>

      <section class="section" aria-labelledby="create-title">
        <h2 class="section-title" id="create-title">${I(`backup.createTitle`)}</h2>
        ${Z({label:I(`backup.password`),name:`password`,type:`password`,autocomplete:`new-password`,hint:I(`backup.passwordHint`,{n:8})})}
        ${Z({label:I(`backup.passwordRepeat`),name:`passwordRepeat`,type:`password`,autocomplete:`new-password`})}
        <p class="info-note">${q(`info`,{size:20})}<span>${I(`backup.passwordWarning`)}</span></p>
        <div class="section-sm">${X({label:I(`backup.create`),iconName:`fileLock`,type:`submit`,block:!0,id:`backup-create`})}</div>
      </section>

      <section class="section" aria-labelledby="restore-title">
        <h2 class="section-title" id="restore-title">${I(`backup.restoreTitle`)}</h2>
        <div class="list">
          <button type="button" class="list__row" data-action="pickBackup">
            ${q(`upload`)}
            <span class="list__text">
              <span class="list__label">${I(`backup.restore`)}</span>
              <span class="list__hint">${I(`backup.restoreHint`)}</span>
            </span>
          </button>
        </div>
      </section>

      <section class="section" aria-labelledby="remind-title">
        <h2 class="section-title" id="remind-title">${I(`backup.reminderTitle`)}</h2>
        <div class="list">${of({name:`remind`,label:I(`backup.reminder`),hint:I(`backup.reminderHint`),checked:t,iconName:`bell`})}</div>
      </section>

      <p class="disclaimer">${q(`shield`,{size:20})}<span>${I(`backup.privacy`)}</span></p>`})}function Ih(){return J({header:Y({backAction:`cancelRestore`}),form:!0,body:K`
      <h1 class="screen-title" tabindex="-1">${I(`backup.restoreTitle`)}</h1>
      <p class="screen-lead">${Ph.createdAt?I(`backup.restoreLeadDate`,{date:hf(Ph.createdAt)}):I(`backup.restoreLead`)}</p>
      ${Z({label:I(`backup.password`),name:`restorePassword`,type:`password`,autocomplete:`current-password`})}
      <p class="info-note">${q(`info`,{size:20})}<span>${I(`privacy.importText`)}</span></p>`,footer:K`
      ${X({label:I(`backup.restoreSubmit`),iconName:`upload`,type:`submit`,block:!0,id:`backup-restore`})}
      ${X({label:I(`common.cancel`),variant:`ghost`,action:`cancelRestore`,block:!0})}`})}function Lh(e){Tr(e),Ph=null,cp(),Q(I(`privacy.importDone`)),a(`/today`,{replace:!0})}async function Rh(e,t){let n=new FormData(e),r=String(n.get(`password`)??``);if(r.length<8){rf(e,`password`,I(`backup.errors.tooShort`,{n:8}));return}if(r!==String(n.get(`passwordRepeat`)??``)){rf(e,`passwordRepeat`,I(`backup.errors.mismatch`));return}let i=e.querySelector(`#backup-create`);i.disabled=!0,Q(I(`backup.creating`));try{let e=await bm(r);if(!await yl(()=>Je(`${I(`backup.fileName`)}-${k()}.json`,e))){i.disabled=!1;return}Er(),t.rerender(),Q(I(`backup.created`))}catch(e){console.error(`[backup] Zálohu sa nepodarilo vytvoriť`,e),i.disabled=!1,Q(I(`backup.failed`))}}async function zh(e){let t=String(new FormData(e).get(`restorePassword`)??``);if(!t){rf(e,`restorePassword`,I(`backup.errors.passwordRequired`));return}let n=e.querySelector(`#backup-restore`);n.disabled=!0;let r=await Cm(Ph.backup,t);n.disabled=!1,!r||r===`newer`?rf(e,`restorePassword`,I(r?`backup.errors.newerVersion`:`backup.errors.wrongPassword`)):await Ep({title:I(`privacy.importTitle`),text:I(`privacy.importText`),confirmLabel:I(`privacy.importConfirm`)})&&Lh(r)}var Bh={render(e){return e.query.restore||(Ph=null),Ph?Ih():Fh()},onSubmit(e,t){return Ph?zh(e):Rh(e,t)},onChange(e){e.name===`remind`&&Dr(e.checked)},actions:{async pickBackup(e,t){let n=await yl(()=>Xe(`application/json,.json`));if(!n)return;let r=Sm(await n.text());!r||r.kind===`newer`?Q(I(r?`backup.errors.newerVersion`:`backup.errors.invalidFile`)):r.kind===`plain`?await Ep({title:I(`privacy.importTitle`),text:I(`privacy.importText`),confirmLabel:I(`privacy.importConfirm`)})&&Lh(r.records):(Ph=r,o(`/backup?restore=1`),t.rerender(),document.getElementById(`f-restorePassword`)?.focus())},cancelRestore(e,t){Ph=null,o(`/backup`),t.rerender()}}},Vh=`/log/symptoms`;function Hh(){let e=Om().symptoms.length,t=document.getElementById(`log-continue`);t.disabled=e===0,t.querySelector(`span`).textContent=e?I(`log.continueCount`,{n:e}):I(`common.continue`)}var Uh={render(){let e=Om(),{step:t,total:n}=jm(Vh),r=e.symptoms.map(e=>e.key),i=r.length;return J({header:Y({back:`/today`,step:t,total:n}),body:K`
        <h1 class="screen-title" tabindex="-1">${I(`log.symptomsTitle`)}</h1>
        <p class="screen-lead">${I(`log.symptomsLead`)}</p>

        <div class="search">
          ${q(`search`,{size:20})}
          <input class="field__input search__input" type="search" id="symptom-search" autocomplete="off"
            placeholder="${I(`log.search`)}" aria-label="${I(`log.search`)}" />
        </div>

        ${zm({name:`symptom`,legend:I(`log.symptomsTitle`),items:Rm(),selected:r,search:!0})}
        <p class="empty" id="sym-empty" hidden>${I(`log.noMatch`)}</p>

        <form class="custom-add" data-form="custom">
          <label class="field__label" for="custom-symptom">${I(`log.custom`)}</label>
          <div class="custom-add__row">
            <input class="field__input" id="custom-symptom" name="custom" maxlength="40" autocomplete="off"
              placeholder="${I(`log.customPlaceholder`)}" />
            <button type="submit" class="btn btn--secondary btn--compact">${q(`plus`,{size:20})}<span>${I(`log.customAdd`)}</span></button>
          </div>
        </form>`,footer:X({label:i?I(`log.continueCount`,{n:i}):I(`common.continue`),action:`next`,id:`log-continue`,disabled:i===0,block:!0})})},onInput(e){if(e.id!==`symptom-search`)return;let t=Lm(e.value.trim()),n=0;for(let e of document.querySelectorAll(`.sym-cell`)){let r=!t||e.dataset.search.includes(t);e.hidden=!r,r&&(n+=1)}document.getElementById(`sym-empty`).hidden=n>0},onChange(e){if(e.name!==`symptom`)return;let t=Om();e.checked?t.symptoms.push({key:e.value,intensity:null,pending:!0}):t.symptoms=t.symptoms.filter(t=>t.key!==e.value),Hh()},onSubmit(e,t){if(e.dataset.form!==`custom`)return;let n=An(e.elements.custom.value);if(!n)return;let r=Om();r.symptoms.some(e=>e.key===n.key)||r.symptoms.push({key:n.key,intensity:null,pending:!0}),t.rerender(),document.getElementById(`custom-symptom`).value=``},actions:{...Bm,next(){Om().symptoms.length&&a(jm(Vh).next,{replace:!0})}}},Wh=`/log/intensity`,Gh={render(){let{symptoms:e}=Om(),{step:t,total:n}=jm(Wh);return J({header:Y({backAction:`prevStep`,step:t,total:n}),body:K`
        <h1 class="screen-title" tabindex="-1">${I(`log.intensityTitle`)}</h1>
        <p class="screen-lead">${I(`log.intensityLead`)}</p>
        <div class="intensity-list">
          ${e.map((e,t)=>Fm({index:t,label:$p(e.key),value:Mm(e),iconName:em(e.key)}))}
        </div>`,footer:K`
        ${X({label:I(`common.continue`),action:`next`,block:!0})}
        ${X({label:I(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onInput(e){if(e.type!==`range`)return;let t=Number(e.dataset.index);Nm(Om().symptoms[t],Number(e.value)),Im(t,Number(e.value))},onChange(e){this.onInput(e)},actions:{clear(e){let t=Number(e.dataset.index);Nm(Om().symptoms[t],null),Im(t,null),document.querySelector(`[data-action="restore"][data-index="${t}"]`).focus()},restore(e){let t=Number(e.dataset.index);Nm(Om().symptoms[t],5),Im(t,5),document.getElementById(`int-${t}`).focus()},next(){Om().symptoms.forEach(Pm),a(jm(Wh).next,{replace:!0})},skip(){for(let e of Om().symptoms)Nm(e,null);a(jm(Wh).next,{replace:!0})},prevStep(){a(jm(Wh).prev,{replace:!0})}}},Kh=`/log/details`;function qh(e){return e.episodeId?jn(e.episodeId):Vt(e.date)?Mn():null}function Jh(e){return Vt(A(e.date))?I(`log.whenToday`,{time:e.time}):I(`log.whenOn`,{date:df(A(e.date)),time:e.time})}var Yh={render(){let e=Om(),{step:t,total:n}=jm(Kh),r=qh(e);return J({header:Y({backAction:`prevStep`,step:t,total:n}),body:K`
        <h1 class="screen-title" tabindex="-1">${I(`log.detailsTitle`)}</h1>
        <p class="screen-lead">${I(`log.detailsLead`)}</p>
        <div class="step-options">
          ${tf({name:`duration`,legend:I(`log.detailsTitle`),options:Up.map(e=>({value:e,label:rm(e)})),selected:e.duration})}
        </div>

        <fieldset class="form-section">
          <legend class="section-title">${I(`log.when`)}</legend>
          <!-- Čas je predvyplnený (teraz alebo deň z kalendára); polia sa ukážu až na požiadanie -->
          <div class="when-summary"${e.editTime?K` hidden`:``}>
            <span>${Jh(e)}</span>
            <button type="button" class="link-btn" data-action="changeTime" aria-controls="when-fields">${I(`log.changeTime`)}</button>
          </div>
          <div class="field-row" id="when-fields"${e.editTime?``:K` hidden`}>
            <div class="field">
              <label class="field__label" for="f-date">${I(`log.date`)}</label>
              <input class="field__input" type="date" id="f-date" name="date" value="${e.date}" max="${k()}" required />
            </div>
            <div class="field">
              <label class="field__label" for="f-time">${I(`log.time`)}</label>
              <input class="field__input" type="time" id="f-time" name="time" value="${e.time}" required />
            </div>
          </div>
          ${r?tf({name:`linkEpisode`,type:`checkbox`,legend:I(`log.linkEpisode`),options:[{value:`yes`,label:`${I(`log.linkEpisode`)} (${I(`episode.since`,{time:ff(r.startedAt)})})`}],selected:e.linkEpisode?`yes`:null}):``}
        </fieldset>

        <div class="form-section">
          ${Z({label:I(`log.note`),name:`note`,value:e.note,multiline:!0,optional:!0})}
        </div>`,footer:X({label:I(`log.save`),action:`save`,iconName:`check`,block:!0})})},onChange(e){let t=Om();e.name===`duration`&&(t.duration=e.value),e.name===`date`&&e.value&&(t.date=e.value),e.name===`time`&&e.value&&(t.time=e.value),e.name===`linkEpisode`&&(t.linkEpisode=e.checked)},onInput(e){e.name===`note`&&(Om().note=e.value)},actions:{changeTime(){Om().editTime=!0,document.querySelector(`.when-summary`).hidden=!0,document.getElementById(`when-fields`).hidden=!1,document.getElementById(`f-date`).focus()},save(){let e=Om(),t=qh(e);wn({id:e.id,occurredAt:zt(e.date,e.time),symptoms:e.symptoms,vertigoType:e.vertigoType,duration:e.duration,note:e.note,episodeId:t&&e.linkEpisode?t.id:null}),km(),s(`/today`),Q(I(`log.saved`))},prevStep(){a(jm(Kh).prev,{replace:!0})}}};function Xh(e){return K`
    <ul class="sym-rows">
      ${e.symptoms.map(e=>K`
          <li class="sym-row">
            <span class="icon-badge">${q(em(e.key),{size:22})}</span>
            <span class="sym-row__label">${$p(e.key)}</span>
            <span class="sym-row__value ${e.intensity==null?`muted`:``}">${tm(e.intensity)}</span>
          </li>`)}
    </ul>`}var Zh={render(e){let t=Sn(e.params.id);if(!t)return J({header:Y({back:`/today`}),body:K`<h1 class="screen-title" tabindex="-1">${I(`symptomLog.title`)}</h1>
          <p class="screen-lead">${I(`symptomLog.notFound`)}</p>`});let n=t.episodeId?jn(t.episodeId):null;return J({header:Y({back:`/today`}),body:K`
        <h1 class="screen-title" tabindex="-1">${I(`symptomLog.title`)}</h1>
        <p class="screen-lead">${df(new Date(t.occurredAt))} · ${ff(t.occurredAt)}</p>
        ${Xh(t)}
        <dl class="facts">
          ${t.duration?K`<div class="fact"><dt>${I(`symptomLog.duration`)}</dt><dd>${rm(t.duration)}</dd></div>`:``}
          ${n?K`<div class="fact"><dt>${I(`symptomLog.episode`)}</dt>
                <dd><a href="#/episode/${n.id}">${I(`episode.since`,{time:ff(n.startedAt)})}</a></dd></div>`:``}
        </dl>
        ${t.note?K`<h2 class="section-title section">${I(`symptomLog.note`)}</h2><p class="note-text">${t.note}</p>`:``}`,footer:K`
        ${X({label:I(`symptomLog.edit`),variant:`secondary`,iconName:`pencil`,action:`edit`,block:!0})}
        ${X({label:I(`symptomLog.delete`),variant:`danger`,action:`delete`,block:!0})}`})},actions:{edit(e,t){Dm({logId:t.params.id}),a(`/log/symptoms`)},async delete(e,t){if(!await Ep({title:I(`symptomLog.deleteTitle`),text:I(`symptomLog.deleteText`),confirmLabel:I(`symptomLog.delete`)}))return;let n=Tn(t.params.id);s(`/today`),Q(I(`symptomLog.deletedToast`),{actionLabel:I(`common.undo`),onAction:()=>{En(n),t.rerender()}})}}};function Qh(e){let t=mn(e.id)[0];return K`
    <li>
      <a class="entry" href="#/treatment/${e.id}">
        <span class="entry__main">
          <span class="entry__title">${[e.name,e.dose].filter(Boolean).join(` · `)}</span>
          <span class="entry__meta">
            ${[e.frequency,t?I(`treatment.lastTaken`,{when:pf(t.takenAt)}):I(`treatment.neverTaken`)].filter(Boolean).join(` · `)}
          </span>
        </span>
        ${q(`chevronRight`,{size:20})}
      </a>
    </li>`}function $h(e,t){let n=t.filter(t=>t.type===e);return K`
    <section class="section" aria-labelledby="group-${e}">
      <h2 class="section-title" id="group-${e}">${I(`treatment.${e}`)}</h2>
      ${n.length?K`<ul class="entries">${n.map(Qh)}</ul>`:K`<p class="empty">${I(`treatment.noneOfType`)}</p>`}
    </section>`}var eg={render(){let e=sn();return Jd(`treatment`,K`
        ${ef(I(`treatment.title`))}
        <p class="screen-lead">${I(`treatment.lead`)}</p>
        ${e.length?K`<p class="treatment-hint">${I(`treatment.hint`)}</p>`:``}
        ${e.length?K`${$h(`preventive`,e)}${$h(`acute`,e)}`:K`<p class="empty section">${I(`treatment.empty`)}</p>`}
        <div class="section">
          ${X({label:I(`treatment.add`),iconName:`plus`,variant:e.length?`secondary`:`primary`,action:`add`,block:!0})}
        </div>
        <p class="disclaimer">${q(`info`,{size:20})}<span>${I(`treatment.disclaimer`)}</span></p>`)},actions:{add(){a(`/treatment/new`)}}},tg=20,ng=(e,t)=>t?K`<div class="fact"><dt>${e}</dt><dd>${t}</dd></div>`:``;function rg(e){let t=[e.dose,e.effect?im(e.effect):I(`treatment.effectMissing`),e.episodeId?I(`treatment.inEpisode`):``].filter(Boolean);return K`
    <li>
      <a class="entry" href="#/intake/${e.id}">
        <span class="entry__main">
          <span class="entry__title">${mf(e.takenAt)}</span>
          <span class="entry__meta">${t.join(` · `)}</span>
        </span>
        ${q(`chevronRight`,{size:20})}
      </a>
    </li>`}var ig={render(e){let t=cn(e.params.id);if(!t)return J({header:Y({back:`/treatment`}),body:K`<h1 class="screen-title" tabindex="-1">${I(`treatment.title`)}</h1>
          <p class="screen-lead">${I(`treatment.notFound`)}</p>`});let n=mn(t.id),r=e.query.all===`1`,i=Yp.map(e=>({key:e,count:n.filter(t=>t.effect===e).length})).filter(e=>e.count);return J({header:Y({back:`/treatment`}),body:K`
        <div class="episode-head">
          <h1 class="screen-title" tabindex="-1">${t.name}</h1>
          ${sf(I(`medications.types.${t.type}`),{neutral:!0})}
        </div>
        <dl class="facts">
          ${ng(I(`treatment.dose`),t.dose)}
          ${ng(I(`treatment.frequency`),t.frequency)}
          ${ng(I(`treatment.taken`),L(`plural.times`,n.length))}
        </dl>
        ${t.note?K`<p class="note-text section-sm">${t.note}</p>`:``}

        ${i.length?K`<section class="section" aria-labelledby="effect-title">
              <h2 class="section-title" id="effect-title">${I(`treatment.effectSummary`)}</h2>
              <ul class="sym-chips sym-chips--start">
                ${i.map(e=>K`<li class="sym-chip">${im(e.key)} <strong>${L(`plural.times`,e.count)}</strong></li>`)}
              </ul>
            </section>`:``}

        <section class="section" aria-labelledby="history-title">
          <h2 class="section-title" id="history-title">${I(`treatment.history`)}</h2>
          ${n.length?K`<ul class="entries">${(r?n:n.slice(0,tg)).map(rg)}</ul>
                ${!r&&n.length>tg?K`<button type="button" class="link-btn section-sm" id="show-all" data-action="showAll">
                      ${I(`treatment.showAll`,{n:n.length})}
                    </button>`:``}`:K`<p class="empty">${I(`treatment.historyEmpty`)}</p>`}
        </section>

        <div class="list section">
          <a class="list__row" href="#/treatment/${t.id}/edit">
            ${q(`pencil`)}<span class="list__label">${I(`treatment.edit`)}</span>${q(`chevronRight`,{size:20})}
          </a>
          <button type="button" class="list__row list__row--danger" data-action="delete">
            ${q(`trash`)}<span class="list__label">${I(`treatment.delete`)}</span>
          </button>
        </div>
        <p class="disclaimer">${q(`info`,{size:20})}<span>${I(`treatment.disclaimer`)}</span></p>`,footer:X({label:I(`treatment.logIntake`),iconName:`plus`,action:`logIntake`,block:!0})})},actions:{showAll(e,t){o(`/treatment/${t.params.id}?all=1`),t.rerender()},logIntake(e,t){a(`/treatment/${t.params.id}/intake`)},async delete(e,t){if(!await Ep({title:I(`treatment.deleteTitle`),text:I(`treatment.deleteText`),confirmLabel:I(`treatment.delete`)}))return;let n=fn(t.params.id);s(`/treatment`),Q(I(`treatment.deletedToast`),{actionLabel:I(`common.undo`),onAction:()=>{pn(n),t.rerender()}})}}};function ag(e,t){if(t===`edit`){let t=hn(e.params.id);return{intake:t,medication:t?cn(t.medicationId):null}}return{intake:null,medication:cn(e.params.id)}}function og({mode:e}){return{render(t){let{intake:n,medication:r}=ag(t,e),i=r?`/treatment/${r.id}`:`/treatment`;if(!r||e===`edit`&&!n)return J({header:Y({back:i}),body:K`<h1 class="screen-title" tabindex="-1">${I(`intake.title`)}</h1>
            <p class="screen-lead">${I(`intake.notFound`)}</p>`});let a=n?new Date(n.takenAt):new Date,o=n?k(a):t.query.date??k(a);return J({form:!0,header:Y({back:i}),body:K`
          <h1 class="screen-title" tabindex="-1">${I(n?`intake.editTitle`:`intake.title`)}</h1>
          <p class="screen-lead">${[r.name,r.dose].filter(Boolean).join(` · `)}</p>
          <div class="form-stack">
            <div class="field-row">
              ${Z({label:I(`intake.date`),name:`date`,type:`date`,value:o})}
              ${Z({label:I(`intake.time`),name:`time`,type:`time`,value:Rt(a)})}
            </div>
            ${Z({label:I(`intake.dose`),name:`dose`,value:n?.dose??r.dose,optional:!0})}
            <fieldset class="form-section form-section--tight">
              <legend class="field__label">${I(`intake.effect`)}</legend>
              <p class="field__hint">${I(`intake.effectHint`)}</p>
              ${tf({name:`effect`,legend:I(`intake.effect`),options:Yp.map(e=>({value:e,label:im(e)})),selected:n?.effect})}
            </fieldset>
            ${Z({label:I(`intake.note`),name:`note`,value:n?.note??``,multiline:!0,optional:!0})}
          </div>`,footer:K`
          ${X({label:I(`intake.save`),type:`submit`,iconName:`check`,block:!0})}
          ${n?X({label:I(`intake.delete`),variant:`danger`,action:`delete`,block:!0}):``}`})},onSubmit(t,n){let{intake:r,medication:i}=ag(n,e);if(!i)return;let a=new FormData(t),o=String(a.get(`date`)||k()),c={medicationId:i.id,takenAt:zt(o,String(a.get(`time`)||Rt())),dose:String(a.get(`dose`)??``),effect:a.get(`effect`),note:String(a.get(`note`)??``)};r?yn(r.id,c):vn(c),Q(I(`intake.saved`)),s(`/treatment/${i.id}`)},actions:{async delete(t,n){let{intake:r,medication:i}=ag(n,e);if(!await Ep({title:I(`intake.deleteTitle`),text:I(`intake.deleteText`),confirmLabel:I(`intake.delete`)}))return;let a=bn(r.id);s(`/treatment/${i.id}`),Q(I(`intake.deletedToast`),{actionLabel:I(`common.undo`),onAction:()=>{xn(a),n.rerender()}})}}}}function sg(e){let t=fr(e);return{entries:t,count:t.symptomLogs.length+t.episodes.length,episode:t.episodes.length>0,symptoms:t.symptomLogs.length>0,period:t.period}}function cg(){let e=new Date(2024,0,1),t=new Intl.DateTimeFormat(qr(),{weekday:`short`});return Array.from({length:7},(n,r)=>{let i=t.format(j(e,r)).replace(`.`,``);return i.charAt(0).toLocaleUpperCase(qr())+i.slice(1)})}function lg(e,t,{isToday:n,isSelected:r}){let i=[df(A(e))];return n&&i.push(I(`calendar.today`)),t.episode&&i.push(I(`calendar.summaryEpisode`)),t.count&&i.push(I(`calendar.summaryEntries`,{n:t.count})),t.period&&i.push(I(`calendar.summaryPeriod`)),!t.count&&!t.period&&i.push(I(`calendar.summaryNone`)),r&&i.push(I(`calendar.selected`)),i.join(`, `)}function ug(e,{inMonth:t,selectedKey:n,todayKey:r,cycleOn:i}){let a=sg(e),o=e===r,s=e===n;return K`
    <button type="button" class="${[`cal-day`,t?``:`cal-day--outside`,a.episode?`cal-day--episode`:``,o?`cal-day--today`:``,s?`cal-day--selected`:``].filter(Boolean).join(` `)}" id="day-${e}" data-action="selectDay" data-day="${e}"
      aria-label="${lg(e,a,{isToday:o,isSelected:s})}"${s?K` aria-pressed="true"`:K` aria-pressed="false"`}>
      <span class="cal-day__num" aria-hidden="true">${Number(e.slice(8))}</span>
      <span class="cal-day__marks" aria-hidden="true">${a.symptoms?K`<span class="cal-dot"></span>`:``}</span>
      ${i&&a.period?K`<span class="cal-period" aria-hidden="true"></span>`:``}
    </button>`}function dg(e,t,n){let r=Ut(e),i=(r.getDay()+6)%7,a=j(r,-i),o=k(),s=Math.ceil((i+new Date(r.getFullYear(),r.getMonth()+1,0).getDate())/7),c=Array.from({length:s*7},(e,t)=>k(j(a,t)));return K`
    <div class="cal">
      <div class="cal-weekdays" aria-hidden="true">${cg().map(e=>K`<span>${e}</span>`)}</div>
      <div class="cal-grid">
        ${c.map(r=>ug(r,{inMonth:r.startsWith(e),selectedKey:t,todayKey:o,cycleOn:n}))}
      </div>
    </div>`}function fg(e,t){let{entries:n,count:r}=sg(e),i=r+n.intakes.length>0||!!n.sleep,a=e>k();return K`
    <section class="section cal-detail" aria-labelledby="day-title">
      <h2 class="section-title" id="day-title">${df(A(e))}</h2>
      ${Hf(e)}
      ${i?hm(n):K`<p class="empty">${I(`calendar.dayEmpty`)}</p>`}
      ${t?K`<div class="list cal-period-toggle">
            <label class="list__row list__row--switch" for="f-period">
              ${q(`droplet`)}
              <span class="list__label">${I(`calendar.periodMark`)}</span>
              <input class="switch" type="checkbox" role="switch" id="f-period" name="period" data-day="${e}"${n.period?K` checked`:``} />
            </label>
          </div>`:``}
      ${a?``:K`<div class="cal-detail__actions">
            ${X({label:I(`calendar.addSymptom`),iconName:`plus`,variant:`secondary`,action:`addSymptom`,data:{day:e},block:!0})}
            ${n.sleep?``:X({label:I(`sleep.add`),iconName:`bed`,variant:`secondary`,action:`addSleep`,data:{day:e},block:!0})}
          </div>`}
    </section>`}var pg={render(e){let t=k(),n=e.query.day??t,r=e.query.month??n.slice(0,7),i=P().cycleTracking===!0,a=r===Ht();return Jd(`calendar`,K`
        ${ef(I(`calendar.title`))}
        <div class="cal-head">
          <button type="button" class="icon-btn" id="cal-prev" data-action="month" data-month="${Wt(r,-1)}" aria-label="${I(`calendar.prev`)}">
            ${q(`chevronLeft`)}
          </button>
          <h2 class="cal-head__title" aria-live="polite">${gf(Ut(r))}</h2>
          <button type="button" class="icon-btn" id="cal-next" data-action="month" data-month="${Wt(r,1)}" aria-label="${I(`calendar.next`)}">
            ${q(`chevronRight`)}
          </button>
        </div>
        ${a?``:K`<button type="button" class="link-btn cal-today-link" data-action="goToday">${I(`calendar.backToday`)}</button>`}
        ${dg(r,n,i)}
        <ul class="cal-legend" aria-label="${I(`calendar.legend`)}">
          <li><span class="cal-legend__mark cal-legend__mark--episode" aria-hidden="true"></span>${I(`calendar.legendEpisode`)}</li>
          <li><span class="cal-legend__mark" aria-hidden="true"><span class="cal-dot"></span></span>${I(`calendar.legendSymptoms`)}</li>
          ${i?K`<li><span class="cal-legend__mark" aria-hidden="true"><span class="cal-period cal-period--legend"></span></span>${I(`calendar.legendPeriod`)}</li>`:``}
        </ul>
        ${fg(n,i)}`)},onChange(e,t){e.name===`period`&&(Hn(e.dataset.day),t.rerender())},actions:{month(e,t){let n=t.query.day;o(`/calendar?month=${e.dataset.month}${n?`&day=${n}`:``}`),t.rerender()},goToday(e,t){o(`/calendar`),t.rerender(),document.getElementById(`day-${k()}`)?.focus()},selectDay(e,t){let n=e.dataset.day;o(`/calendar?month=${n.slice(0,7)}&day=${n}`),t.rerender(),document.getElementById(`day-title`)?.scrollIntoView({block:`nearest`})},addSymptom(e){Dm({date:e.dataset.day}),a(`/log/symptoms`)},addSleep(e){a(`/sleep?date=${e.dataset.day}`)}}},mg=[30,60,90];function hg(e,t){let n=Math.max(...e.map(e=>e.count),1);return K`
    <ul class="bars">
      ${e.map(e=>K`
          <li class="bars__row">
            <span class="bars__label">${t(e.key)}</span>
            <span class="bars__value">${L(`plural.times`,e.count)}</span>
            <span class="bars__track" aria-hidden="true"><span class="bars__fill" style="width:${Math.max(e.count/n*100,4)}%"></span></span>
          </li>`)}
    </ul>`}var gg=(e,t,{empty:n=!1}={})=>K`
  <div class="stat">
    <span class="stat__value ${n?`stat__value--empty`:``}">${t}</span>
    <span class="stat__label">${e}</span>
  </div>`,_g={render(e){let t=mg.includes(Number(e.query.days))?Number(e.query.days):30,n=id(td(t)),r=I(`insights.noValue`),i=K`
      ${ef(I(`insights.title`))}
      <div class="insights-period">
        ${nf({name:`days`,legend:I(`insights.periodLabel`),selected:String(t),options:mg.map(e=>({value:String(e),label:L(`plural.days`,e)}))})}
      </div>`;return!n.recordCount&&!n.intakes.length&&!n.sleeps.length?Jd(`insights`,K`${i}
          <div class="coming">
            ${gp({symbol:`chart`,size:200})}
            <p class="muted">${I(`insights.empty`)}</p>
          </div>
          ${X({label:I(`insights.report`),iconName:`fileText`,variant:`secondary`,action:`report`,block:!0})}
          ${Vf()}`):Jd(`insights`,K`${i}
        <section class="section" aria-labelledby="ov-title">
          <h2 class="section-title" id="ov-title">${I(`insights.overview`)}</h2>
          <div class="stats">
            ${gg(I(`insights.symptomDays`),n.symptomDays)}
            ${gg(I(`insights.episodes`),n.episodeCount)}
            ${gg(I(`insights.avgIntensity`),n.avgIntensity==null?r:_f(n.avgIntensity),{empty:n.avgIntensity==null})}
            ${gg(I(`insights.avgDuration`),n.avgDurationMinutes==null?r:yf(n.avgDurationMinutes),{empty:n.avgDurationMinutes==null})}
          </div>
        </section>

        ${Vf()}

        <section class="section" aria-labelledby="sym-title">
          <h2 class="section-title" id="sym-title">${I(`insights.topSymptoms`)}</h2>
          <p class="muted small">${I(`insights.topSymptomsLead`)}</p>
          ${n.symptoms.length?hg(n.symptoms.slice(0,6),$p):K`<p class="muted">${I(`insights.empty`)}</p>`}
        </section>

        <section class="section" aria-labelledby="trig-title">
          <h2 class="section-title" id="trig-title">${I(`insights.topTriggers`)}</h2>
          ${n.triggers.length?hg(n.triggers.slice(0,6),am):K`<p class="muted">${I(`insights.triggersEmpty`)}</p>`}
        </section>

        <section class="section" aria-labelledby="sleep-title">
          <h2 class="section-title" id="sleep-title">${I(`sleep.title`)}</h2>
          ${n.sleeps.length?K`<div class="stats">
                  ${gg(I(`sleep.avg`),yf(n.avgSleepMinutes))}
                  ${gg(I(`sleep.nights`),n.sleeps.length)}
                </div>
                ${n.sleepQuality.length?hg(n.sleepQuality,lm):``}`:K`<p class="muted">${I(`report.sleepNone`)}</p>`}
        </section>

        <section class="section" aria-labelledby="meds-title">
          <h2 class="section-title" id="meds-title">${I(`insights.meds`)}</h2>
          ${n.meds.length?K`<ul class="med-stats">
                ${n.meds.map(e=>K`
                    <li class="med-stats__row">
                      <a href="#/treatment/${e.medication.id}" class="med-stats__name">${e.medication.name}</a>
                      <span class="med-stats__count">${L(`plural.times`,e.count)}</span>
                      ${e.effects.length?K`<span class="med-stats__effects">${e.effects.map(e=>`${im(e.key)} ${L(`plural.times`,e.count)}`).join(` · `)}</span>`:``}
                    </li>`)}
              </ul>`:K`<p class="muted">${I(`insights.medsEmpty`)}</p>`}
        </section>

        <p class="disclaimer">${q(`info`,{size:20})}<span>${I(`insights.interpretation`)}</span></p>
        <div class="section">
          ${X({label:I(`insights.report`),iconName:`fileText`,action:`report`,block:!0})}
        </div>`)},onChange(e,t){e.name===`days`&&(o(`/insights?days=${e.value}`),t.rerender())},actions:{report(e,t){a(`/report?days=${t.query.days??30}`)}}},vg={render(e){let t=mg.includes(Number(e.query.days))?String(e.query.days):`30`,n=td(30);return J({form:!0,header:Y({back:`/insights`}),body:K`
        <h1 class="screen-title" tabindex="-1">${I(`report.title`)}</h1>
        <p class="screen-lead">${I(`report.lead`)}</p>
        <div class="step-options">
          ${tf({name:`range`,legend:I(`report.period`),options:[...mg.map(e=>({value:String(e),label:L(`plural.days`,e)})),{value:`custom`,label:I(`report.custom`)}],selected:t})}
        </div>
        <!-- Zobrazí sa iba pri „Vlastné obdobie“ (CSS :has) -->
        <div class="report-custom field-row">
          ${Z({label:I(`report.from`),name:`from`,type:`date`,value:n.from})}
          ${Z({label:I(`report.to`),name:`to`,type:`date`,value:n.to})}
        </div>
        ${F()?``:K`<a class="report-plus-hint" href="#/plus?from=report">
              ${q(`lock`,{size:16})}<span>${I(`report.plusHint`)}</span>
            </a>`}`,footer:X({label:I(`report.create`),type:`submit`,iconName:`fileText`,block:!0})})},onSubmit(e){let t=new FormData(e),n=t.get(`range`),r,i;if(n===`custom`){if(r=String(t.get(`from`)||``),i=String(t.get(`to`)||k()),!r||r>i){rf(e,`from`,I(`report.invalidRange`));return}}else({from:r,to:i}=td(Number(n)));a(`/report/view?from=${r}&to=${i}`)}},yg=5,bg=[`meds`,`helped`];function xg({from:e,to:t}){if(!F())return``;let{weather:n,health:r}=P(),i=Rd({from:e,to:t}),a=Td({days:365}),o=a.enough?a.factors.filter(e=>e.strength===`strong`||e.strength===`possible`):[];return K`
    ${n.enabled&&i.rows.length?K`<section>
          <h3>${I(`report.weather`)}</h3>
          <p>${I(`report.weatherSummary`,{drops:i.drops,total:i.rows.length})}</p>
          <table class="report-table">
            <thead><tr><th>${I(`plus.weather.colDay`)}</th><th>${I(`plus.weather.colPressure`)}</th><th>${I(`plus.weather.colChange`)}</th><th>${I(`plus.weather.condition`)}</th></tr></thead>
            <tbody>
              ${i.rows.map(e=>K`<tr>
                  <td>${hf(e.episode.startedAt)}</td>
                  <td>${Df(e.weather.pressure)}${Rl(e.weather)?` (${I(`plus.weather.estimateWord`)})`:``}</td>
                  <td>${e.weather.pressureChange==null?`–`:Af(e.weather.pressureChange)}</td>
                  <td>${Mf(e.weather.condition)}</td>
                </tr>`)}
            </tbody>
          </table>
          <p class="report-sub">${I(`plus.weather.attribution`)}</p>
        </section>`:``}
    ${o.length?K`<section>
          <h3>${I(`report.patterns`)}</h3>
          <table class="report-table">
            <tbody>
              ${o.map(e=>K`<tr>
                  <td>${I(`plus.finder.factors.${e.key}`)}</td>
                  <td class="num">${I(`plus.finder.ofDays`,{a:e.withHard,b:e.withDays})}</td>
                  <td class="num">${I(`report.patternsOther`,{a:e.withoutHard,b:e.withoutDays})}</td>
                </tr>`)}
            </tbody>
          </table>
          <p class="report-sub">${I(`report.patternsNote`)}</p>
        </section>`:``}
    ${r.connected&&(i.avgSteps!=null||i.workoutTracked)?K`<section>
          <h3>${I(`report.activity`)}</h3>
          <table class="report-table">
            <tbody>
              ${i.avgSteps==null?``:K`<tr><td>${I(`report.avgSteps`)}</td><td class="num">${Nf(i.avgSteps)}</td></tr>`}
              ${i.workoutTracked?K`<tr><td>${I(`report.workoutDays`)}</td><td class="num">${I(`report.workoutDaysValue`,{a:i.workoutDays,b:i.workoutTracked})}</td></tr>`:``}
              ${i.workoutTypes.length?K`<tr><td>${I(`report.workoutTypes`)}</td><td>${i.workoutTypes.map(e=>`${I(`plus.health.workouts.${e.key}`)} ${L(`plural.times`,e.count)}`).join(`, `)}</td></tr>`:``}
            </tbody>
          </table>
        </section>`:``}`}function Sg(e,t){return e.length?K`
    <table class="report-table">
      <tbody>
        ${e.map(e=>K`<tr><td>${t(e.key)}</td><td class="num">${L(`plural.times`,e.count)}</td></tr>`)}
      </tbody>
    </table>`:K`<p class="report-none">${I(`report.none`)}</p>`}function Cg(e){let t=[...e.logs.map(e=>{let t=Dn(e);return{at:e.occurredAt,entry:I(`symptomLog.title`),detail:[nm(e),t==null?``:I(`intensity.highest`,{value:tm(t)}),e.duration?rm(e.duration):``].filter(Boolean).join(` · `)}}),...e.episodes.map(e=>({at:e.startedAt,entry:I(`episode.title`),detail:[e.endedAt?`${mf(e.startedAt)} – ${Bt(e.startedAt,e.endedAt)?ff(e.endedAt):mf(e.endedAt)}`:I(`episode.statusOngoing`),...Wm(e,{withTime:!1}).filter(e=>e.value&&!bg.includes(e.key)).map(e=>`${I(`episodeFlow.sections.${e.key}`)}: ${e.value}`)].join(` · `)})),...e.intakes.filter(e=>cn(e.medicationId)?.type===`acute`||e.effect||e.episodeId).map(e=>({at:e.takenAt,entry:cn(e.medicationId)?.name??I(`today.intakeTitle`),detail:[e.dose,e.effect?im(e.effect):``].filter(Boolean).join(` · `)})),...e.sleeps.map(e=>({at:e.wakeTime??zt(e.date,`06:00`),dateOnly:!0,entry:I(`sleep.title`),detail:[yf(e.minutes),e.quality?lm(e.quality):``].filter(Boolean).join(` · `)}))].sort((e,t)=>e.at.localeCompare(t.at));return t.length?K`
    <table class="report-table report-table--timeline">
      <thead><tr><th>${I(`report.colDate`)}</th><th>${I(`report.colEntry`)}</th><th>${I(`report.colDetail`)}</th></tr></thead>
      <tbody>${t.map(e=>K`<tr><td>${e.dateOnly?hf(e.at):mf(e.at)}</td><td>${e.entry}</td><td>${e.detail}</td></tr>`)}</tbody>
    </table>`:K`<p class="report-none">${I(`report.none`)}</p>`}var wg={render(e){let t=e.query.from??k(),n=e.query.to??k(),r=id({from:t,to:n}),i=P().cycleTracking===!0,a=[...r.logs.filter(e=>e.note).map(e=>({at:e.occurredAt,note:e.note})),...r.episodes.filter(e=>e.note?.trim()).map(e=>({at:e.startedAt,note:e.note}))].sort((e,t)=>e.at.localeCompare(t.at)),o=I(`insights.noValue`);return J({variant:`screen--report`,header:Y({back:`/insights`}),body:K`
        <h1 class="visually-hidden" tabindex="-1">${I(`report.title`)}</h1>
        <p class="report-hint">${I(`report.printHint`)}</p>
        <article class="report-doc">
          <header class="report-doc__head">
            <p class="report-doc__app">${I(`app.name`)}</p>
            <h2 class="report-doc__title screen-title" tabindex="-1">${I(`report.docTitle`)}</h2>
            <dl class="report-meta">
              <div><dt>${I(`report.period`)}</dt><dd>${hf(A(t))} – ${hf(A(n))}</dd></div>
              <div><dt>${I(`report.created`)}</dt><dd>${hf(new Date)}</dd></div>
            </dl>
            <p class="report-disclaimer">${I(`report.disclaimer`)}</p>
            ${r.recordCount<yg?K`<p class="report-warning">${I(`report.fewData`)}</p>`:``}
          </header>

          <section>
            <h3>${I(`report.summary`)}</h3>
            <table class="report-table">
              <tbody>
                <tr><td>${I(`insights.symptomDays`)}</td><td class="num">${r.symptomDays}</td></tr>
                <tr><td>${I(`insights.episodes`)}</td><td class="num">${r.episodeCount}</td></tr>
                <tr><td>${I(`insights.avgIntensity`)}</td><td class="num">${r.avgIntensity==null?o:_f(r.avgIntensity)}</td></tr>
                <tr><td>${I(`insights.avgDuration`)}</td><td class="num">${r.avgDurationMinutes==null?o:yf(r.avgDurationMinutes)}</td></tr>
              </tbody>
            </table>
          </section>

          <section>
            <h3>${I(`report.symptoms`)}</h3>
            ${Sg(r.symptoms,$p)}
          </section>

          <section>
            <h3>${I(`report.triggers`)}</h3>
            ${Sg(r.triggers,am)}
          </section>

          <section>
            <h3>${I(`report.meds`)}</h3>
            ${r.meds.length?K`<table class="report-table">
                  <tbody>
                    ${r.meds.map(e=>K`<tr>
                        <td>${[e.medication.name,e.medication.dose].filter(Boolean).join(` `)}<br /><span class="report-sub">${I(`medications.types.${e.medication.type}`)}</span></td>
                        <td class="num">${L(`plural.times`,e.count)}</td>
                        <td>${e.effects.map(e=>`${im(e.key)} ${L(`plural.times`,e.count)}`).join(`, `)||I(`treatment.effectMissing`)}</td>
                      </tr>`)}
                  </tbody>
                </table>`:K`<p class="report-none">${I(`report.none`)}</p>`}
          </section>

          <section>
            <h3>${I(`report.sleep`)}</h3>
            ${r.sleeps.length?K`<table class="report-table">
                  <tbody>
                    <tr><td>${I(`sleep.avg`)}</td><td class="num">${yf(r.avgSleepMinutes)}</td></tr>
                    <tr><td>${I(`sleep.nights`)}</td><td class="num">${r.sleeps.length}</td></tr>
                    ${r.sleepQuality.map(e=>K`<tr><td>${I(`report.sleepQuality`)}: ${lm(e.key)}</td><td class="num">${L(`plural.times`,e.count)}</td></tr>`)}
                  </tbody>
                </table>`:K`<p class="report-none">${I(`report.sleepNone`)}</p>`}
          </section>

          ${i?K`<section>
                <h3>${I(`report.cycle`)}</h3>
                <p>${I(`report.cycleDays`)}: <strong>${r.periodDays}</strong></p>
              </section>`:``}

          ${xg({from:t,to:n})}

          ${a.length?K`<section>
                <h3>${I(`report.notes`)}</h3>
                <ul class="report-notes">
                  ${a.map(e=>K`<li><strong>${mf(e.at)}:</strong> ${e.note}</li>`)}
                </ul>
              </section>`:``}

          <section>
            <h3>${I(`report.timeline`)}</h3>
            ${Cg(r)}
          </section>
        </article>`,footer:X({label:I(`report.print`),iconName:`printer`,action:`print`,block:!0})})},actions:{print(){yl(()=>Ke(`${I(`app.name`)} ${k()}`))}}},Tg=[`good`,`fair`,`poor`],Eg=Array.from({length:17},(e,t)=>t),Dg=Array.from({length:12},(e,t)=>t*5);function Og({name:e,label:t,values:n,selected:r,suffix:i=``}){return K`
    <div class="field">
      <label class="field__label" for="f-${e}">${t}</label>
      <select class="field__input" id="f-${e}" name="${e}" aria-describedby="f-${e}-error">
        ${n.map(e=>K`<option value="${e}"${e===r?K` selected`:``}>${e}${i}</option>`)}
      </select>
    </div>`}var kg={render(e){let t=e.query.date??k(),n=Un(t),r=n?Math.floor(n.minutes/60):7,i=n?Math.min(55,Math.round(n.minutes%60/5)*5):0;return J({form:!0,header:Y({back:`/today`}),body:K`
        <h1 class="screen-title" tabindex="-1">${I(`sleep.formTitle`)}</h1>
        <p class="screen-lead">${I(`sleep.lead`)}</p>
        <div class="form-stack">
          ${Z({label:I(`sleep.date`),name:`date`,type:`date`,value:t})}
          <fieldset class="form-section form-section--tight">
            <legend class="field__label">${I(`sleep.duration`)}</legend>
            <div class="field-row">
              ${Og({name:`hours`,label:I(`sleep.hours`),values:Eg,selected:r,suffix:` h`})}
              ${Og({name:`minutes`,label:I(`sleep.minutes`),values:Dg,selected:i,suffix:` min`})}
            </div>
            <p class="field__error" id="f-hours-error" hidden></p>
          </fieldset>
          <fieldset class="form-section form-section--tight">
            <legend class="field__label">${I(`sleep.quality`)} <span class="field__optional">(${I(`common.optional`)})</span></legend>
            ${tf({name:`quality`,legend:I(`sleep.quality`),options:Tg.map(e=>({value:e,label:I(`sleep.qualities.${e}`)})),selected:n?.quality})}
          </fieldset>
          ${Z({label:I(`sleep.note`),name:`note`,value:n?.note??``,multiline:!0,optional:!0})}
        </div>`,footer:K`
        ${X({label:I(`sleep.save`),type:`submit`,iconName:`check`,block:!0})}
        ${n?X({label:I(`sleep.delete`),variant:`danger`,action:`delete`,block:!0}):``}`})},onSubmit(e){let t=new FormData(e),n=Number(t.get(`hours`))*60+Number(t.get(`minutes`));n<=0?rf(e,`hours`,I(`sleep.durationRequired`)):(Wn({date:String(t.get(`date`)||k()),minutes:n,quality:t.get(`quality`),note:String(t.get(`note`)??``)}),Q(I(`sleep.saved`)),s(`/today`))},actions:{async delete(e,t){let n=t.query.date??k();if(!await Ep({title:I(`sleep.deleteTitle`),text:I(`sleep.deleteText`),confirmLabel:I(`sleep.delete`)}))return;let r=Gn(n);s(`/today`),Q(I(`sleep.deletedToast`),{actionLabel:I(`common.undo`),onAction:()=>{Kn(r),t.rerender()}})}}},Ag=`2026-11-23`,jg=[`controller`,`data`,`storage`,`weather`,`health`,`purchases`,`links`,`purpose`,`legal`,`required`,`retention`,`rights`,`contact`,`security`,`backup`,`age`,`changes`],Mg=`2026-11-27`,Ng=[`publisher`,`medical`,`weather`,`licenses`],Pg=[`provider`,`app`,`health`,`use`,`plus`,`payment`,`contract`,`cancel`,`withdrawal`,`form`,`data`,`services`,`liability`,`changes`,`complaints`,`law`];function Fg(){let e=P().consent;return!!e?.healthDataAt&&e.policyVersion===`2026-11-23`}var Ig=[[`smartphone`,`consent.factDevice`],[`shield`,`consent.factNoServer`],[`lock`,`consent.factPin`],[`download`,`consent.factControl`],[`info`,`consent.factNotMedical`]];function Lg(){let e=document.querySelectorAll(`input[name="consent"]:checked`).length;document.getElementById(`consent-submit`).disabled=e<2}function Rg({onboarding:e}){let t=`/start/privacy`;return{render(){let n=Fg(),r=!n&&!!P().consent?.healthDataAt,i=e?bp(t):null;return J({form:!0,header:e?Y({back:i.prev,step:i.step,total:i.total}):``,variant:e?``:`screen--tab`,body:K`
          <h1 class="screen-title" tabindex="-1">${I(`consent.title`)}</h1>
          <p class="screen-lead">${I(r?`consent.updatedLead`:`consent.lead`)}</p>
          <ul class="facts-list">
            ${Ig.filter(([,t])=>e||pt()||t!==`consent.factPin`).map(([e,t])=>K`<li>${q(e,{size:22})}<span>${I(t)}</span></li>`)}
          </ul>
          <div class="step-options">
            ${tf({name:`consent`,type:`checkbox`,legend:I(`consent.title`),options:[{value:`health`,label:I(`consent.health`)},{value:`age`,label:I(`consent.age`)}],selected:n?[`health`,`age`]:[]})}
          </div>
          <p class="section-sm"><a href="#/privacy-policy">${I(`consent.policyLink`)}</a></p>
          <!-- Podmienky sa prijímajú používaním appky, oddelene od súhlasu so spracúvaním údajov o zdraví (ten má vlastné políčko). -->
          <p class="muted small section-sm">${cf(I(`consent.termsNote`),`terms`,{href:`#/terms`,label:I(`consent.termsLink`)})}</p>`,footer:K`
          ${X({label:I(`consent.submit`),type:`submit`,id:`consent-submit`,disabled:!n,block:!0})}
          ${e?``:X({label:I(`consent.decline`),variant:`ghost`,action:`decline`,block:!0})}`})},actions:{async decline(){let e=await Tp({title:I(`consent.declineTitle`),text:I(`consent.declineText`),choices:[{value:`export`,label:I(`privacy.export`)},{value:`erase`,label:I(`profile.deleteAll`),variant:`outline`}]});if(e===`export`)try{await Eh()&&Q(I(`privacy.exportDone`))}catch(e){console.error(`[consent] Export sa nepodaril`,e),Q(I(`privacy.exportFailed`))}e===`erase`&&await Dh({title:I(`profile.deleteAllTitle`),text:I(`profile.deleteAllText`),confirmLabel:I(`profile.deleteAllConfirm`),offerBackup:!1})}},onChange(e){e.name===`consent`&&Lg()},onSubmit(n){let r=new FormData(n).getAll(`consent`);if(!r.includes(`health`)||!r.includes(`age`))return;let i=new Date().toISOString();rn({consent:{healthDataAt:i,ageConfirmedAt:i,policyVersion:Ag}}),a(e?bp(t).next:`/today`,{replace:!e})}}}var zg=null;function Bg({key:e,sections:t,version:n,showAppVersion:r=!1}){return{render(){return J({header:Y({back:`/profile`}),body:K`
          <h1 class="screen-title" tabindex="-1">${I(`${e}.title`)}</h1>
          ${n?K`<p class="screen-lead">${I(`${e}.version`,{version:n})}</p>`:``}
          ${r?K`<p class="screen-lead" id="app-version">${zg?I(`about.appVersion`,{version:zg}):``}</p>`:``}
          <div class="policy">
            ${t.map(t=>K`
                <section>
                  <h2 class="section-title">${I(`${e}.${t}Title`)}</h2>
                  <p>${I(`${e}.${t}Text`)}</p>
                </section>`)}
          </div>`})},mount(e){r&&!zg&&Pe().then(t=>{zg=t;let n=e.querySelector(`#app-version`);n&&(n.textContent=I(`about.appVersion`,{version:t}))}).catch(e=>console.error(`[about] Verziu sa nepodarilo zistiť`,e))}}}var Vg=`/start/profile`,Hg={render(){let{step:e,total:t,prev:n}=bp(Vg);return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${I(`profileSetup.title`)}</h1>
        <p class="screen-lead">${I(`profileSetup.lead`)}</p>
        <div class="form-stack">
          ${Z({label:I(`profileSetup.nameLabel`),name:`name`,value:P().name,placeholder:I(`profileSetup.namePlaceholder`),hint:I(`profileSetup.nameHint`),autocomplete:`given-name`,maxlength:40})}
          <div class="card card--accent pin-offer">
            <div class="pin-offer__head">${q(`lock`,{size:22})}<h2 class="card__title">${I(`profileSetup.pinTitle`)}</h2></div>
            <p class="muted">${I(pt()?`profileSetup.pinAlready`:`profileSetup.pinText`)}</p>
          </div>
        </div>`,footer:X({label:I(`common.continue`),type:`submit`,block:!0})})},onSubmit(e){let t=String(new FormData(e).get(`name`)??``).trim();rn({name:t,nameSetAt:t?new Date().toISOString():null});let n=bp(Vg).next;pt()?a(n):a(`/security/pin?mode=set&next=${encodeURIComponent(n)}`)}};function Ug(){return K`
    <div class="pin">
      <div class="pin__dots" id="pin-dots" role="img" aria-label="${I(`pin.progress`,{n:0,total:6})}">
        ${Array.from({length:6},()=>K`<span class="pin__dot"></span>`)}
      </div>
      <p class="pin__status" id="pin-status" role="status" aria-live="polite"></p>
      <div class="pinpad" role="group" aria-label="${I(`pin.keypad`)}">
        ${[1,2,3,4,5,6,7,8,9].map(e=>K`<button type="button" class="pinpad__key" data-action="pinDigit" data-digit="${e}">${e}</button>`)}
        <span></span>
        <button type="button" class="pinpad__key" data-action="pinDigit" data-digit="0">0</button>
        <button type="button" class="pinpad__key pinpad__key--icon" data-action="pinBackspace" aria-label="${I(`pin.delete`)}">
          ${q(`delete`,{size:26})}
        </button>
      </div>
    </div>`}function Wg({onComplete:e}){let t=``,n=!1;function r(){let e=document.getElementById(`pin-dots`);e&&([...e.children].forEach((e,n)=>e.classList.toggle(`is-filled`,n<t.length)),e.setAttribute(`aria-label`,I(`pin.progress`,{n:t.length,total:6})))}let i={async digit(a){if(!(n||t.length>=6)&&(t+=a,r(),t.length===6)){let a=t;n=!0,i.setDisabled(!0);try{await e(a)}finally{n=!1,t=``,r(),i.setDisabled(!1)}}},backspace(){n||(t=t.slice(0,-1),r())},status(e,{error:t=!1}={}){let n=document.getElementById(`pin-status`);n&&(n.textContent=e??``,n.classList.toggle(`pin__status--error`,t))},setDisabled(e){document.querySelectorAll(`.pinpad__key`).forEach(t=>{t.disabled=e})},listenToKeyboard(){let e=e=>{/^[0-9]$/.test(e.key)?i.digit(e.key):e.key===`Backspace`&&i.backspace()};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)}};return i}function Gg(e,t){let n=Math.ceil((e-Date.now())/1e3);return n<=120?I(`pin.blockedSeconds`,{n:Math.max(n,1)}):I(`pin.blocked`,{time:t(e)})}function Kg(e){if(/^(\d)\1+$/.test(e))return!0;let t=[...e].slice(1).map((t,n)=>Number(t)-Number(e[n]));return t.every(e=>e===1)||t.every(e=>e===-1)}var qg={set:`new`,change:`current`,disable:`current`},Jg=null,Yg=null;function Xg(){return I(`pin.prompt.${Jg.step}`)}function Zg(){let e=document.querySelector(`.pin-setup__prompt`);e&&(e.textContent=Xg())}function Qg(e){return e?.blockedUntil?Gg(e.blockedUntil,ff):e?.code===`device`||e?.code===`moved`?I(`pin.deviceError`):I(`pin.wrong`)}var $g={render(e){let t=[`set`,`change`,`disable`].includes(e.query.mode)?e.query.mode:`set`;return Jg={mode:t,step:qg[t],first:null},J({variant:`screen--pin`,header:Y({back:e.query.next?`/start/profile`:`/profile`}),body:K`
        <h1 class="screen-title" tabindex="-1">${I(`pin.title.${t}`)}</h1>
        ${t===`set`?K`<p class="screen-lead">${I(`pin.setLead`)}</p>`:``}
        <p class="pin-setup__prompt">${Xg()}</p>
        ${Ug()}`})},mount(e,t){return Yg=Wg({onComplete:async e=>{if(Yg.status(``),Jg.step===`current`){Yg.status(I(`pin.checking`));try{await jt(e)}catch(e){Yg.status(Qg(e),{error:!0});return}if(Jg.mode===`disable`){await Pt(dr()),Q(I(`pin.disabled`)),s(`/profile`);return}Jg.step=`new`,Yg.status(``),Zg()}else if(Jg.step===`new`){if(Kg(e)){Yg.status(I(`pin.weak`),{error:!0});return}Jg.first=e,Jg.step=`confirm`,Zg()}else e===Jg.first?(Yg.status(I(`pin.saving`)),Jg.mode===`set`?await Mt(e,dr(),{language:P().language,theme:P().theme}):await Nt(e),Q(I(Jg.mode===`set`?`pin.enabled`:`pin.changed`)),t.query.logout?wl():t.query.next?a(t.query.next,{replace:!0}):s(`/profile`)):(Jg.step=`new`,Jg.first=null,Zg(),Yg.status(I(`pin.mismatch`),{error:!0}))}}),Yg.listenToKeyboard()},actions:{pinDigit(e){Yg?.digit(e.dataset.digit)},pinBackspace(){Yg?.backspace()}}},e_=null,t_=!1;function n_(){let e=vt();return e>Date.now()&&(e_.setDisabled(!0),e_.status(Gg(e,ff),{error:!0}),!0)}function r_(){t_=!0;let e=document.querySelector(`.lock__pin`),t=document.querySelector(`.lock__moved`);e&&t&&(e.hidden=!0,t.hidden=!1,t.querySelector(`h1`)?.focus())}function i_(){lp(),Ye(),Xt(),It(),a(`/start/language`,{replace:!0})}var a_={render(){return J({variant:`screen--pin screen--lock`,body:K`
        <div class="lock">
          ${hp()}
          <div class="lock__pin">
            <h1 class="screen-title lock__title" tabindex="-1">${I(`lock.title`)}</h1>
            <p class="pin-setup__prompt">${I(`lock.lead`)}</p>
            ${Ug()}
            <button type="button" class="link-btn lock__forgot" data-action="forgot">${I(`lock.forgot`)}</button>
          </div>
          <div class="lock__moved" hidden>
            <h1 class="screen-title lock__title" tabindex="-1">${I(`lock.moved.title`)}</h1>
            <p class="lock__text">${I(`lock.moved.text`)}</p>
            <p class="info-note">${q(`info`,{size:20})}<span>${I(`lock.moved.backup`)}</span></p>
            <div class="lock__actions">${X({label:I(`lock.moved.action`),variant:`secondary`,action:`movedStartOver`,block:!0})}</div>
          </div>
        </div>`})},mount(){t_=!1,e_=Wg({onComplete:async e=>{e_.status(I(`pin.checking`));try{let t=await At(e);e_.status(``),bl(t),a(El(),{replace:!0})}catch(e){e?.code===`moved`?(e_.status(``),r_()):e?.code===`device`?e_.status(I(`pin.deviceError`),{error:!0}):e?.code===`blocked`||e?.blockedUntil?e_.status(Gg(e.blockedUntil,ff),{error:!0}):e_.status(I(`pin.wrong`),{error:!0})}}}),Dt().then(e=>{e&&r_()});let e=n_(),t=setInterval(()=>{let t=n_();!t&&e&&(e_.setDisabled(!1),e_.status(``)),e=t},1e3),n=e_.listenToKeyboard();return()=>{clearInterval(t),n()}},actions:{pinDigit(e){!t_&&vt()<=Date.now()&&e_?.digit(e.dataset.digit)},pinBackspace(){e_?.backspace()},async forgot(){await Ep({title:I(`lock.forgotTitle`),text:I(`lock.forgotText`),confirmLabel:I(`lock.forgotConfirm`)})&&i_()},async movedStartOver(){await Ep({title:I(`lock.moved.confirmTitle`),text:I(`lock.moved.confirmText`),confirmLabel:I(`lock.moved.confirm`)})&&i_()}}},o_=Tu[0],s_=`idle`;function c_(e){let t=e?.trial?e.trialPeriod:null;return t?L(`plural.${t.unit}s`,t.count):null}function l_(e){let t=Vu()?.[e];if(!t)return I(s_===`failed`?`plus.paywall.retryPrices`:`plus.paywall.loadingPrices`);let n=c_(t);return n?I(`plus.plans.${e}.cta`,{trial:n}):I(`plus.plans.${e}.ctaNoTrial`,{price:xf(t)})}function u_(e){let t=Vu()?.[e];if(!t)return s_===`failed`?I(`plus.paywall.pricesFailed`):``;let n=c_(t);return I(`plus.plans.${e}.${n?`terms`:`termsNoTrial`}`,{trial:n,price:xf(t),store:Fu()})}function d_(e){let t=Vu()?.[e];if(t?.amount==null)return``;let n=e===`yearly`?vf(t.amount/12,t.currency):null,r=c_(t);return I(`plus.plans.${e}.${r?`hint`:`hintNoTrial`}`,{monthly:n,trial:r})}function f_(){let{yearly:e,monthly:t}=Vu()??{};if(!e?.amount||!t?.amount||e.currency!==t.currency)return null;let n=Math.floor((1-e.amount/(t.amount*12))*100);return n>0?n:null}function p_(e,t){let n=Vu()?.[e],r=e===`yearly`?f_():null;return K`
    <label class="option option--radio plan">
      <input type="radio" name="plan" value="${e}" id="plan-${e}"${t?K` checked`:``} />
      <span class="option__control">${q(`check`,{size:16,strokeWidth:3})}</span>
      <span class="plan__text">
        <span class="plan__name">${I(`plus.plans.${e}.name`)}${r?sf(I(`plus.plans.yearly.badge`,{percent:r})):``}</span>
        <span class="plan__hint">${d_(e)}</span>
      </span>
      <!-- Pri sume je vždy obdobie, aby ročná cena nevyzerala ako mesačná (pravidlá Google Play o predplatnom). -->
      <span class="plan__price">${n?K`${xf(n)}<span class="plan__per">${I(`plus.plans.${e}.per`)}</span>`:``}</span>
    </label>`}function m_(e){let t=Sf.includes(e.query.from)?e.query.from:null,n=t?[t,...Sf.filter(e=>e!==t)]:Sf;return J({variant:`screen--paywall`,form:!0,header:Y({back:`/today`}),body:K`
      <p class="plus-mark" aria-hidden="true">${I(`app.name`)}<span>+</span></p>
      <h1 class="screen-title" tabindex="-1">${I(`plus.paywall.title`)}</h1>
      <p class="screen-lead">${I(`plus.paywall.lead`)}</p>

      <ul class="plus-features">
        ${n.map(e=>K`
            <li class="plus-feature">
              ${lf(Cf[e])}
              <span>
                <strong>${I(`plus.features.${e}.title`)}</strong>
                <span class="plus-feature__text">${Rf(e)}</span>
              </span>
            </li>`)}
      </ul>

      <section class="section" aria-labelledby="plans-title">
        <h2 class="section-title" id="plans-title">${I(`plus.paywall.choosePlan`)}</h2>
        <fieldset class="options">
          <legend class="visually-hidden">${I(`plus.paywall.choosePlan`)}</legend>
          ${Tu.map(e=>p_(e,e===o_))}
        </fieldset>
        <p class="plus-note">${I(`plus.paywall.renewal`,{store:Fu()})}</p>
        <!-- Poučenie o odstúpení pred nákupom (§ 15 zákona č. 108/2024 Z. z.), podrobnosti sú v podmienkach. -->
        <p class="plus-note">${I(`plus.paywall.withdrawal`)}</p>
        <!-- Kto predáva, má byť vidno ešte pred nákupom (§ 15), nielen v podmienkach. -->
        <p class="plus-note">${I(`plus.paywall.provider`)}</p>
      </section>

      <section class="plus-free" aria-labelledby="free-title">
        <h2 class="section-title" id="free-title">${I(`plus.paywall.freeTitle`)}</h2>
        <p class="muted">${I(`plus.paywall.freeText`)}</p>
      </section>

      ${K`<p class="plus-demo">${sf(I(`plus.demoChip`),{neutral:!0})}<span>${I(`plus.paywall.demoNote`)}</span></p>`}

      <div class="plus-links">
        <button type="button" class="link-btn" data-action="restore">${I(`plus.paywall.restore`)}</button>
        ${Ju()?K`<button type="button" class="link-btn" data-action="redeem">${I(`plus.paywall.redeem`)}</button>`:``}
        <a class="link-btn" href="#/terms">${I(`terms.title`)}</a>
        <a class="link-btn" href="#/privacy-policy">${I(`privacyPolicy.title`)}</a>
      </div>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${I(`plus.paywall.disclaimer`)}</span></p>`,footer:K`
      <p class="plus-terms" id="plus-terms" aria-live="polite">${u_(o_)}</p>
      <!-- Podmienky zaväzujú, keď ich človek pred nákupom môže vidieť a vie, že platia. Zaškrtávanie netreba. -->
      <p class="plus-terms">${cf(I(`plus.paywall.acceptTerms`),`terms`,{href:`#/terms`,label:I(`plus.paywall.acceptTermsLink`)})}</p>
      ${X({label:l_(o_),action:Vu()||s_!==`failed`?`buy`:`retryPrices`,id:`plus-buy`,block:!0,disabled:!Vu()&&s_!==`failed`})}
      ${X({label:I(`plus.paywall.notNow`),variant:`ghost`,action:`notNow`,block:!0})}`})}function h_(e){let{plus:t}=P(),n=e.query.welcome===`1`;return J({header:Y({back:`/profile`}),body:K`
      <h1 class="screen-title" tabindex="-1">${I(n?`plus.manage.welcomeTitle`:`plus.manage.title`)}</h1>
      <p class="screen-lead">${I(n?`plus.manage.welcomeLead`:`plus.manage.lead`)}</p>

      <section class="section" aria-labelledby="features-title">
        <h2 class="section-title" id="features-title">${I(`plus.manage.features`)}</h2>
        <div class="list">${Sf.map(e=>zf(e,{status:Bf(e)}))}</div>
      </section>

      <section class="section" aria-labelledby="sub-title">
        <h2 class="section-title" id="sub-title">${I(`plus.manage.subscription`)}</h2>
        <div class="list">
          <div class="list__row">
            ${q(`sparkles`)}
            <span class="list__text">
              <!-- Plán je známy iba z nákupu v tomto telefóne; po obnovení nákupu ho obchod neprezradí. -->
              <span class="list__label">${t.plan?I(`plus.plans.${t.plan}.name`):I(`plus.name`)}${t.plan&&Vu()?.[t.plan]?` · ${xf(Vu()[t.plan])}`:``}</span>
              <span class="list__hint">${Xn()?I(`plus.manage.trialUntil`,{date:hf(Xn())}):I(`plus.manage.since`,{date:hf(t.startedAt)})}</span>
            </span>
            ${t.simulated?sf(I(`plus.demoChip`),{neutral:!0}):``}
          </div>
          <button type="button" class="list__row" data-action="cancel">
            ${q(`x`)}
            <span class="list__text">
              <span class="list__label">${I(Pu()?`plus.manage.manageStore`:`plus.manage.cancel`)}</span>
              <span class="list__hint">${I(Pu()?`plus.manage.manageStoreHint`:`plus.manage.cancelHint`)}</span>
            </span>
          </button>
          <!-- Funkcia na odstúpenie od zmluvy musí byť zreteľne a nepretržite dostupná počas celej lehoty (§ 20a zákona č. 108/2024 Z. z.). -->
          ${Zn()?K`<a class="list__row" href="#/plus/withdraw">
                ${q(`undo`)}
                <span class="list__text">
                  <span class="list__label">${I(`plus.withdraw.row`)}</span>
                  <span class="list__hint">${I(Xn()?`plus.withdraw.rowHintTrial`:`plus.withdraw.rowHint`,{date:hf(Zn())})}</span>
                </span>
                ${q(`chevronRight`,{size:20})}
              </a>`:``}
          <a class="list__row" href="#/plus/confirmation">
            ${q(`fileText`)}
            <span class="list__text">
              <span class="list__label">${I(`plus.confirmation.row`)}</span>
              <span class="list__hint">${I(`plus.confirmation.rowHint`)}</span>
            </span>
            ${q(`chevronRight`,{size:20})}
          </a>
        </div>
      </section>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${I(`plus.paywall.disclaimer`)}</span></p>`,footer:n?K`
          ${P().weather.enabled?``:X({label:I(`plus.manage.enableWeather`),iconName:`mapPin`,action:`toWeather`,block:!0})}
          ${X({label:I(`plus.manage.toToday`),variant:P().weather.enabled?`primary`:`ghost`,action:`toToday`,block:!0})}`:``})}var g_={render(e){return F()?h_(e):m_(e)},mount(e,t){F()||!Pu()||Iu()||s_!==`idle`||(s_=`loading`,Hu().then(e=>{s_=e?`idle`:`failed`,!F()&&r().path===`/plus`&&t.rerender()}))},onChange(e){if(e.name!==`plan`)return;o_=e.value;let t=document.querySelector(`#plus-buy span`);t&&(t.textContent=l_(e.value));let n=document.getElementById(`plus-terms`);n&&(n.textContent=u_(e.value))},actions:{async buy(){let e=document.querySelector(`input[name="plan"]:checked`)?.value??Tu[0];if(!Vu()?.[e])return;let t=await Uu(e);t===`done`?a(`/plus/confirmation?welcome=1`,{replace:!0}):t===`restored`?(Q(I(`plus.paywall.restored`)),a(`/plus`,{replace:!0})):t===`unavailable`?Q(I(`plus.paywall.nativeOnly`)):t===`pending`?Q(I(`plus.paywall.purchasePending`)):t===`failed`&&Q(I(`plus.paywall.purchaseFailed`))},notNow(){s(`/today`)},retryPrices(e,t){s_=`idle`,t.rerender()},async restore(e,t){await qu()?t.rerender():Q(I(`plus.paywall.nothingToRestore`))},async redeem(){let e=Fu();await Ep({title:I(`plus.redeem.title`),text:[I(`plus.redeem.single`,{store:e}),I(`plus.redeem.promo`,{store:e}),I(`plus.redeem.trial`,{store:e})],confirmLabel:I(`plus.redeem.open`,{store:e}),cancelLabel:I(`common.close`)})&&!Yu()&&Q(I(`plus.redeem.preview`,{store:e}))},toToday(){a(`/today`,{replace:!0})},toWeather(){a(`/plus/weather`,{replace:!0})},async cancel(e,t){Pu()?await Zu():await Ep({title:I(`plus.manage.cancelTitle`),text:I(`plus.manage.cancelText`),confirmLabel:I(`plus.manage.cancelConfirm`)})&&(Qu(),t.rerender(),Q(I(`plus.manage.cancelled`)))}}},__=327,v_=190,y_={top:12,right:8,bottom:26,left:42};function b_({points:e,todayKey:t,label:n,legend:r,table:i}){let a=e.map(e=>e.pressure),o=Math.floor(Math.min(...a)/5)*5,s=Math.ceil(Math.max(...a)/5)*5,c=s-o>30?10:5,l=[];for(let e=o;e<=s;e+=c)l.push(e);let u=__-y_.left-y_.right,d=v_-y_.top-y_.bottom,f=e=>Date.parse(`${e.date}T00:00:00Z`)/864e5,p=e.map(t=>({...t,index:f(t)-f(e[0])})),m=Math.max(p[p.length-1].index,1),h=e=>y_.left+e/m*u,g=e=>y_.top+(1-(e-o)/Math.max(s-o,1))*d,_=e=>e.map((t,n)=>{let r=`${h(t.index).toFixed(1)} ${g(t.pressure).toFixed(1)}`;return n&&t.index-e[n-1].index===1?`L${r}`:`M${r} L${r}`}).join(` `),v=Math.max(p.findIndex(e=>e.date===t),0),y=p.slice(0,v+1),b=p.slice(v),x=p[v],S=x.index,C=u/m,w=[0,v,e.length-1].filter((e,t,n)=>n.indexOf(e)===t&&(e===v||Math.abs(p[e].index-S)*C>44));return K`
    <div class="chart">
      <p class="chart__readout" aria-live="polite">${x.readout}</p>
      <svg class="chart__svg" viewBox="0 0 ${__} ${v_}" role="img" aria-label="${n}">
        ${l.map(e=>K`
            <line class="chart__grid" x1="${y_.left}" x2="${__-y_.right}" y1="${g(e).toFixed(1)}" y2="${g(e).toFixed(1)}"></line>
            <text class="chart__tick" x="${y_.left-6}" y="${(g(e)+4).toFixed(1)}" text-anchor="end">${e}</text>`)}
        ${w.map(t=>K`<text class="chart__tick" x="${h(p[t].index).toFixed(1)}" y="${182}" text-anchor="${t===0?`start`:t===e.length-1?`end`:`middle`}">${p[t].tickLabel}</text>`)}
        <line class="chart__today" x1="${h(S).toFixed(1)}" x2="${h(S).toFixed(1)}" y1="${y_.top}" y2="${v_-y_.bottom}"></line>
        <path class="chart__line" d="${_(y)}"></path>
        ${b.length>1?K`<path class="chart__line chart__line--forecast" d="${_(b)}"></path>`:``}
        ${p.filter(e=>e.episode).map(e=>K`<circle class="chart__dot" cx="${h(e.index).toFixed(1)}" cy="${g(e.pressure).toFixed(1)}" r="5"></circle>`)}
        <line class="chart__cross" x1="${h(S).toFixed(1)}" x2="${h(S).toFixed(1)}" y1="${y_.top}" y2="${v_-y_.bottom}"></line>
        <circle class="chart__selected" cx="${h(S).toFixed(1)}" cy="${g(x.pressure).toFixed(1)}" r="5"></circle>
        ${p.map(e=>K`<rect class="chart__hit" x="${(h(e.index)-C/2).toFixed(1)}" y="0" width="${C.toFixed(1)}" height="${v_-y_.bottom}"
            data-readout="${e.readout}" data-x="${h(e.index).toFixed(1)}" data-y="${g(e.pressure).toFixed(1)}"></rect>`)}
      </svg>
      <ul class="chart__legend" aria-label="${I(`plus.charts.legend`)}">
        ${r.map(e=>K`<li><span class="chart__key chart__key--${e.key}" aria-hidden="true"></span>${e.label}</li>`)}
      </ul>
      ${i}
    </div>`}function x_({items:e,label:t,table:n,selected:r=e.length-1}){let i=Math.max(...e.map(e=>e.value),1),a=e.findIndex(e=>e.value===i);return K`
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
    </div>`}function S_({head:e,rows:t}){return K`
    <details class="chart__table">
      <summary>${I(`plus.charts.showTable`)}</summary>
      <table class="data-table">
        <thead><tr>${e.map(e=>K`<th scope="col">${e}</th>`)}</tr></thead>
        <tbody>${t.map(e=>K`<tr>${e.map(e=>K`<td>${e}</td>`)}</tr>`)}</tbody>
      </table>
    </details>`}function C_({grid:e,rowLabels:t,colLabels:n,label:r}){let i=Math.max(...e.flat(),1),a=e=>e===0?0:Math.ceil(e/i*3);return K`
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
    </div>`}function w_(e){let t=t=>{let n=document.elementFromPoint(t.clientX,t.clientY)?.closest?.(`[data-readout]`);if(!n||!e.contains(n))return;let r=n.closest(`.chart`);if(r.querySelector(`.chart__readout`).textContent=n.dataset.readout,n.matches(`.cols__col`)){r.querySelector(`.cols__col.is-selected`)?.classList.remove(`is-selected`),n.classList.add(`is-selected`);return}let i=r.querySelector(`.chart__cross`),a=r.querySelector(`.chart__selected`);i.setAttribute(`x1`,n.dataset.x),i.setAttribute(`x2`,n.dataset.x),a.setAttribute(`cx`,n.dataset.x),a.setAttribute(`cy`,n.dataset.y)};return e.addEventListener(`pointermove`,t),e.addEventListener(`click`,t),()=>{e.removeEventListener(`pointermove`,t),e.removeEventListener(`click`,t)}}var T_=new URL(`openweather-logo-DYDLtN4d.png`,import.meta.url).href,E_=new URL(`openweather-logo-negative-ajDAZS8x.png`,import.meta.url).href,D_=[14,30,90],O_=`https://openweathermap.org/`;function k_(){return J({header:Y({back:`/plus`}),body:K`
      ${lf(`gauge`,{large:!0})}
      <h1 class="screen-title plus-after-badge" tabindex="-1">${I(`plus.features.weather.title`)}</h1>
      <p class="screen-lead">${I(`plus.weather.offLead`)}</p>
      <ul class="facts-list">${[[`gauge`,`plus.weather.factRecord`],[`mapPin`,`plus.weather.factLocation`],[`shield`,`plus.weather.factHealth`],[`x`,`plus.weather.factOff`]].map(([e,t])=>K`<li>${q(e,{size:22})}<span>${I(t)}</span></li>`)}</ul>
      <p class="section-sm"><a href="#/privacy-policy">${I(`consent.policyLink`)}</a></p>`,footer:X({label:I(`plus.weather.enable`),iconName:`mapPin`,action:`useLocation`,id:`weather-enable`,block:!0})})}function A_(e){let t=e.pressureChange,n=t==null||Math.abs(t)<1?`minus`:t<0?`arrowDown`:`arrowUp`;return K`
    <section class="card weather-now" aria-labelledby="now-title">
      <h2 class="visually-hidden" id="now-title">${I(`plus.weather.today`)}</h2>
      <div class="weather-now__main">
        <span class="weather-now__pressure">${Df(e.pressure)}</span>
        ${t==null?``:K`<span class="weather-now__change">${q(n,{size:18})}${I(`plus.weather.changeShort`,{value:Af(t)})}</span>`}
      </div>
      <p class="weather-now__band">${I(`plus.weather.bands.${kf(e.pressure)}`)}</p>
      <dl class="weather-now__facts">
        <div><dt>${q(wf[e.condition]??`cloud`,{size:18})}<span class="visually-hidden">${I(`plus.weather.condition`)}</span></dt><dd>${Mf(e.condition)}</dd></div>
        <div><dt>${q(`thermometer`,{size:18})}<span class="visually-hidden">${I(`plus.weather.temperature`)}</span></dt><dd>${jf(e)}</dd></div>
        ${e.humidity==null?``:K`<div><dt>${q(`droplets`,{size:18})}<span class="visually-hidden">${I(`plus.weather.humidity`)}</span></dt><dd>${I(`plus.weather.humidityValue`,{value:e.humidity})}</dd></div>`}
      </dl>
    </section>`}function j_(e){return K`
    <details class="pressure-scale">
      <summary>${I(`plus.weather.bandTitle`)}</summary>
      <ul class="pressure-scale__list">
        ${Of.map(({key:t})=>K`
            <li class="pressure-scale__row${t===e?` is-current`:``}">
              <span class="pressure-scale__label">
                ${I(`plus.weather.bands.${t}`)}
                ${t===e?K`<span class="pressure-scale__now">${I(`plus.weather.bandNow`)}</span>`:``}
              </span>
              <span class="pressure-scale__range">${I(`plus.weather.bandRanges.${t}`)}</span>
            </li>`)}
      </ul>
      <p class="muted small">${I(`plus.weather.bandNote`)}</p>
    </details>`}function M_(e){let t=k(),n=Ld({from:k(j(new Date,-(e-1))),to:k(j(new Date,7))});if(n.length<2)return``;let r=e=>[e.date===t?I(`plus.forecast.today`):`${If(e.date)} ${Ff(A(e.date))}`,Df(e.pressure),e.pressureChange==null?``:I(`plus.weather.changeShort`,{value:Af(e.pressureChange)}),e.date>t?I(`plus.weather.forecastWord`):``,e.estimated?I(`plus.weather.estimateWord`):``,e.episode?I(`plus.weather.episodeWord`):``].filter(Boolean).join(` · `),i=n.map(e=>({date:e.date,pressure:e.pressure,episode:e.episode,tickLabel:e.date===t?I(`plus.forecast.today`):Ff(A(e.date)),readout:r(e)}));return K`
    <section class="section" aria-labelledby="chart-title">
      <h2 class="section-title" id="chart-title">${I(`plus.weather.chartTitle`)}</h2>
      ${nf({name:`range`,legend:I(`insights.periodLabel`),selected:String(e),options:D_.map(e=>({value:String(e),label:I(`plus.weather.rangeDays`,{n:e})}))})}
      ${b_({points:i,todayKey:t,label:I(`plus.weather.chartLabel`,{n:e}),legend:[{key:`line`,label:I(`plus.weather.legendPressure`)},{key:`forecast`,label:I(`plus.weather.legendForecast`)},{key:`dot`,label:I(`plus.weather.legendEpisode`)}],table:S_({head:[I(`plus.weather.colDay`),I(`plus.weather.colPressure`),I(`plus.weather.colChange`),I(`plus.weather.colEpisode`)],rows:[...n].reverse().map(e=>[Ff(A(e.date)),e.estimated?`${Df(e.pressure)} (${I(`plus.weather.estimateWord`)})`:Df(e.pressure),e.pressureChange==null?`–`:Af(e.pressureChange),e.episode?I(`common.yes`):`–`])})})}
    </section>`}function N_(){let e=[1,2,3,4,5,6,7].map(e=>tr(k(j(new Date,e)))).filter(Boolean);return e.length?K`
    <section class="section" aria-labelledby="fc-title">
      <h2 class="section-title" id="fc-title">${I(`plus.weather.forecastTitle`)}</h2>
      <ul class="weather-days">
        ${e.map(e=>K`
            <li class="weather-day">
              ${q(wf[e.condition]??`cloud`,{size:22})}
              <span class="weather-day__main">
                <span class="weather-day__name">${If(e.date)}</span>
                <span class="weather-day__meta">${Mf(e.condition)} · ${jf(e)}</span>
              </span>
              <span class="weather-day__pressure">
                <span>${Df(e.pressure)}</span>
                ${e.pressureChange==null?``:K`<span class="weather-day__change">${Af(e.pressureChange)}</span>`}
              </span>
            </li>`)}
      </ul>
    </section>`:``}function P_(){return K`
    <section class="section" aria-labelledby="link-title">
      <h2 class="section-title" id="link-title">${I(`plus.weather.linkTitle`)}</h2>
      <p class="muted">${I(`plus.weather.linkText`)}</p>
      <div class="section-sm">${X({label:I(`plus.weather.openFinder`),iconName:`search`,variant:`secondary`,action:`openFinder`,block:!0})}</div>
    </section>`}function F_(e){let t=P().weather,n=D_.includes(Number(e.query.range))?Number(e.query.range):14,r=tr(k());return J({header:Y({back:`/plus`}),body:K`
      <h1 class="screen-title" tabindex="-1">${I(`plus.features.weather.title`)}</h1>
      <p class="weather-place">${q(`mapPin`,{size:18})}<span>${I(`plus.weather.myLocation`)}</span></p>
      <p class="muted small">${I(Zl()?`plus.weather.updated`:`plus.weather.stale`,{time:pf(t.updatedAt)})}</p>
      ${r?A_(r):K`<p class="empty section-sm">${I(`plus.weather.noData`)}</p>`}
      ${j_(r?kf(r.pressure):null)}
      ${M_(n)}
      ${N_()}
      ${P_()}

      <section class="section" aria-labelledby="ws-title">
        <h2 class="section-title" id="ws-title">${I(`plus.weather.settings`)}</h2>
        <div class="list">
          <button type="button" class="list__row" data-action="useLocation">
            ${q(`refresh`)}
            <span class="list__text">
              <span class="list__label">${I(`plus.weather.updateLocation`)}</span>
              <span class="list__hint">${I(`plus.weather.factLocation`)}</span>
            </span>
          </button>
          <button type="button" class="list__row list__row--danger" data-action="turnOff">
            ${q(`x`)}
            <span class="list__text">
              <span class="list__label">${I(`plus.weather.turnOff`)}</span>
              <span class="list__hint">${I(`plus.weather.turnOffHint`)}</span>
            </span>
          </button>
        </div>
      </section>
      <p class="plus-source">
        <a class="weather-source" href="${O_}" target="_blank" rel="noopener noreferrer">
          <img class="weather-source__logo weather-source__logo--light" src="${T_}" alt="" width="196" height="84">
          <img class="weather-source__logo weather-source__logo--dark" src="${E_}" alt="" width="197" height="84">
          <span>${I(`plus.weather.attribution`)}</span>
        </a>
      </p>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${I(`plus.weather.disclaimer`)}</span></p>`})}var I_={render(e){return P().weather.enabled?F_(e):k_()},mount(e){return w_(e)},onChange(e,t){e.name===`range`&&(o(`/plus/weather?range=${e.value}`),t.rerender())},actions:{async useLocation(e,t){e.disabled=!0,Q(I(`plus.weather.loading`));try{let{position:e,days:n}=await Yl();P().weather.enabled||nr({source:Ol,...e}),ir(n,e),t.rerender(),Q(I(`plus.weather.enabled`))}catch(t){e.disabled=!1,Q(I(`plus.weather.errors.${[`denied`,`unavailable`,`setup`].includes(t.message)?t.message:`network`}`))}},openFinder(){a(`/plus/finder`)},async turnOff(e,t){await Ep({title:I(`plus.weather.turnOffTitle`),text:I(`plus.weather.turnOffText`),confirmLabel:I(`plus.weather.turnOff`)})&&(rr(),sp(),t.rerender())}}},L_={sleep:`bed`,steps:`footprints`,workouts:`dumbbell`};function R_(){return J({header:Y({back:`/plus`}),body:K`
      ${lf(`watch`,{large:!0})}
      <h1 class="screen-title plus-after-badge" tabindex="-1">${I(`plus.features.health.title`)}</h1>
      <p class="screen-lead">${I(Lf(`plus.health.lead`))}</p>
      <p class="plus-free section-sm">${I(`plus.health.browserOnly`)}</p>
      <p class="disclaimer">${q(`shield`,{size:20})}<span>${I(`plus.health.privacy`)}</span></p>`})}function z_(){return J({form:!0,header:Y({back:`/plus`}),body:K`
      ${lf(`watch`,{large:!0})}
      <h1 class="screen-title plus-after-badge" tabindex="-1">${I(`plus.features.health.title`)}</h1>
      <p class="screen-lead">${I(Lf(`plus.health.lead`))}</p>
      <section class="section" aria-labelledby="types-title">
        <h2 class="section-title" id="types-title">${I(`plus.health.typesTitle`)}</h2>
        <div class="list">
          ${$l.map(e=>of({name:`type-${e}`,label:I(`plus.health.types.${e}`),checked:!0,iconName:L_[e]}))}
        </div>
        <p class="muted small section-sm">${I(`plus.health.typesHint`)}</p>
      </section>
      <p class="disclaimer">${q(`shield`,{size:20})}<span>${I(`plus.health.privacy`)}</span></p>`,footer:X({label:I(`plus.health.connectTo.${lu()}`),iconName:`watch`,action:`connect`,id:`health-connect`,block:!0})})}function B_(e){return Array.from({length:e},(t,n)=>k(j(new Date,-(e-1-n))))}function V_(){let{health:e}=P(),t=k(),n=ar(t),r=Un(t),i=B_(7),a=t=>e.types.includes(t),o=e=>`${If(e)} ${Ff(A(e))}`,s=I(`plus.health.noValue`),c=i.map(e=>{let t=ar(e)?.steps??null;return{label:Pf(A(e)).slice(0,2),value:t??0,display:t==null?``:Nf(t),readout:`${o(e)} · ${t==null?s:I(`plus.health.stepsValue`,{value:Nf(t)})}`}}),l=i.map(e=>{let t=Un(e)?.minutes??0;return{label:Pf(A(e)).slice(0,2),value:t,display:t?_f(t/60):``,readout:`${o(e)} · ${t?yf(t):s}`}}),u=[...i].reverse().map(e=>({date:e,workouts:ar(e)?.workouts??[]})).filter(e=>e.workouts.length);return J({header:Y({back:`/plus`}),body:K`
      <h1 class="screen-title" tabindex="-1">${I(`plus.features.health.title`)}</h1>
      <p class="weather-place">${q(`watch`,{size:18})}<span>${I(`plus.health.providers.${e.provider}`)}</span></p>
      ${e.lastSyncAt?K`<p class="muted small">${I(`plus.health.lastSync`,{time:pf(e.lastSyncAt)})}</p>`:``}

      <div class="stats section-sm">
        ${a(`steps`)?K`<div class="stat"><span class="stat__value">${n?.steps==null?`–`:Nf(n.steps)}</span><span class="stat__label">${I(`plus.health.stepsToday`)}</span></div>`:``}
        ${a(`sleep`)?K`<div class="stat"><span class="stat__value">${r?yf(r.minutes):`–`}</span><span class="stat__label">${I(`plus.health.sleepToday`)}</span></div>`:``}
      </div>

      ${a(`steps`)?K`<section class="section" aria-labelledby="steps-title">
            <h2 class="section-title" id="steps-title">${I(`plus.health.stepsWeek`)}</h2>
            ${x_({items:c,label:I(`plus.health.stepsWeek`),table:S_({head:[I(`plus.weather.colDay`),I(`plus.health.types.steps`)],rows:c.map(e=>[e.readout.split(` · `)[0],e.display||s])})})}
          </section>`:``}
      ${a(`sleep`)?K`<section class="section" aria-labelledby="sleep-title">
            <h2 class="section-title" id="sleep-title">${I(`plus.health.sleepWeek`)}</h2>
            ${x_({items:l,label:I(`plus.health.sleepWeek`),table:S_({head:[I(`plus.weather.colDay`),I(`plus.health.types.sleep`)],rows:l.map(e=>e.readout.split(` · `))})})}
          </section>`:``}
      ${a(`workouts`)?K`<section class="section" aria-labelledby="workouts-title">
            <h2 class="section-title" id="workouts-title">${I(`plus.health.workoutsWeek`)}</h2>
            ${u.length?K`<ul class="day-context">
                  ${u.map(e=>K`<li>${q(`dumbbell`,{size:20})}<span><strong>${o(e.date)}</strong> · ${e.workouts.map(Uf).join(`, `)}</span></li>`)}
                </ul>`:K`<p class="muted small">${I(`plus.health.workoutsNone`)}</p>`}
          </section>`:``}

      <section class="section" aria-labelledby="types-title">
        <h2 class="section-title" id="types-title">${I(`plus.health.typesTitle`)}</h2>
        <div class="list">
          ${$l.map(t=>of({name:`type-${t}`,label:I(`plus.health.types.${t}`),checked:e.types.includes(t),iconName:L_[t]}))}
        </div>
        <p class="muted small section-sm">${I(`plus.health.typesHint`)}</p>
      </section>

      <p class="disclaimer">${q(`shield`,{size:20})}<span>${I(`plus.health.privacy`)}</span></p>
      <div class="section">${X({label:I(`plus.health.disconnect`),variant:`outline`,iconName:`x`,action:`disconnect`,block:!0})}</div>`})}var H_={render(){return cu()?P().health.connected?V_():z_():R_()},mount(e){return w_(e)},async onChange(e,t){if(!e.name?.startsWith(`type-`)||!P().health.connected)return;let n=e.name.slice(5),{types:r}=P().health;if(!e.checked)cr(r.filter(e=>e!==n)),t.rerender();else{e.disabled=!0;try{await gu(n)}catch{Q(I(`plus.health.errors.denied`))}t.rerender()}},actions:{async connect(e,t){let n=$l.filter(e=>document.getElementById(`f-type-${e}`)?.checked);e.disabled=!0;try{await hu(n),t.rerender(),Q(I(`plus.health.connectedToast`))}catch(t){e.disabled=!1,Q(I(t.message===`unavailable`?`plus.health.errors.unavailable`:`plus.health.errors.denied`))}},async disconnect(e,t){await Ep({title:I(`plus.health.disconnectTitle`),text:[I(`plus.health.disconnectText`),I(`plus.health.revokeHint.${lu()}`)],confirmLabel:I(`plus.health.disconnect`)})&&(sr(),t.rerender(),Q(I(`plus.health.disconnectedToast`),uu()?{actionLabel:I(`plus.health.openSettings`),onAction:du}:{}))}}},U_=e=>Math.round(e*100);function W_(e,t,n,r,i){return K`
    <div class="compare__row">
      <span class="compare__label">${e}</span>
      <span class="compare__value">${I(`plus.finder.ofDays`,{a:t,b:n})} · ${I(`plus.finder.percent`,{n:U_(r)})}</span>
      <span class="bars__track" aria-hidden="true"><span class="bars__fill compare__fill--${i}" style="width:${Math.max(r*100,2)}%"></span></span>
    </div>`}function G_(e){return K`
    <li class="finder-factor">
      <div class="finder-factor__head">
        ${q(e.icon,{size:22})}
        <h3 class="finder-factor__title">${I(`plus.finder.factors.${e.key}`)}</h3>
        <span class="strength strength--${e.strength}">${I(`plus.finder.strength.${e.strength}`)}</span>
      </div>
      ${e.strength===`few`?K`<p class="muted small">${I(`plus.finder.fewFactor`,{n:e.withDays})}</p>`:K`<div class="compare">
            ${W_(I(`plus.finder.after`),e.withHard,e.withDays,e.rateWith,`with`)}
            ${W_(I(`plus.finder.otherDays`),e.withoutHard,e.withoutDays,e.rateWithout,`without`)}
          </div>`}
    </li>`}var K_={render(e){let t=md.includes(Number(e.query.days))?Number(e.query.days):180,n=Td({days:t}),{weather:r,health:i}=P(),a=[r.enabled?null:{key:`weather`,href:`#/plus/weather`},i.connected?null:{key:`health`,href:`#/plus/health`}].filter(Boolean);return J({header:Y({back:`/insights`}),body:K`
        <h1 class="screen-title" tabindex="-1">${I(`plus.features.finder.title`)}</h1>
        <p class="screen-lead">${I(`plus.finder.lead`,{intensity:5})}</p>
        <p class="info-note">${q(`info`,{size:20})}<span>${I(`plus.finder.moreRecords`)}</span></p>
        <div class="insights-period">
          ${nf({name:`days`,legend:I(`insights.periodLabel`),selected:String(t),options:md.map(e=>({value:String(e),label:I(`plus.periods.d${e}`)}))})}
        </div>

        ${n.enough?K`
              ${P().demoEnabled&&r.enabled?K`<p class="plus-summary">${I(`plus.demoSymptoms`)}</p>`:``}
              <p class="plus-summary">${I(`plus.finder.summary`,{hard:L(`plural.hardDays`,n.hardDays),days:L(`plural.days`,n.trackedDays)})}</p>
              <ul class="finder-factors">${n.factors.map(G_)}</ul>`:K`
              <div class="coming">
                ${q(`search`,{size:40})}
                <p class="muted">${I(`plus.finder.notEnough`,{days:L(`plural.days`,n.trackedDays),hard:L(`plural.hardDays`,n.hardDays)})}</p>
              </div>`}

        ${a.length?K`<section class="section" aria-labelledby="more-title">
              <h2 class="section-title" id="more-title">${I(`plus.finder.moreTitle`)}</h2>
              <div class="list">
                ${a.map(e=>K`
                    <a class="list__row" href="${e.href}">
                      ${q(e.key===`weather`?`gauge`:`watch`)}
                      <span class="list__text">
                        <span class="list__label">${I(`plus.features.${e.key}.title`)}</span>
                        <span class="list__hint">${I(`plus.finder.more.${e.key}`)}</span>
                      </span>
                      ${q(`chevronRight`,{size:20})}
                    </a>`)}
              </div>
            </section>`:``}

        ${n.logged.length?K`<section class="section" aria-labelledby="logged-title">
              <h2 class="section-title" id="logged-title">${I(`plus.finder.loggedTitle`)}</h2>
              <p class="muted small">${I(`plus.finder.loggedLead`)}</p>
              ${hg(n.logged.slice(0,6),am)}
            </section>`:``}

        <section class="section" aria-labelledby="how-title">
          <h2 class="section-title" id="how-title">${I(`plus.finder.howTitle`)}</h2>
          <p class="muted small">${I(`plus.finder.howText`)}</p>
        </section>

        <p class="disclaimer">${q(`info`,{size:20})}<span>${I(`plus.finder.disclaimer`)}</span></p>
        ${P().forecast.enabled?``:K`<div class="section">
              <p class="muted small">${I(`plus.finder.toForecastNote`)}</p>
              <div class="section-sm">${X({label:I(`plus.finder.toForecast`),iconName:`bellRing`,variant:`secondary`,action:`toForecast`,block:!0})}</div>
            </div>`}`})},onChange(e,t){e.name===`days`&&(o(`/plus/finder?days=${e.value}`),t.rerender())},actions:{toForecast(){a(`/plus/forecast`)}}};async function q_(){let e=await np();return e||Q(I(`notifications.denied`)),e}function J_(){return J({header:Y({back:`/plus`}),body:K`
      ${lf(`bellRing`,{large:!0})}
      <h1 class="screen-title plus-after-badge" tabindex="-1">${I(`plus.features.forecast.title`)}</h1>
      <p class="screen-lead">${I(`plus.forecast.offLead`)}</p>
      <ul class="facts-list">${[[`gauge`,`plus.forecast.factWeather`],[`check`,`plus.forecast.factRecords`],[`bellRing`,`plus.forecast.factNotify`],[`x`,`plus.forecast.factOff`]].map(([e,t])=>K`<li>${q(e,{size:22})}<span>${I(t)}</span></li>`)}</ul>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${I(`plus.forecast.disclaimer`)}</span></p>`,footer:X({label:I(`plus.forecast.enable`),iconName:`bellRing`,action:`enable`,block:!0})})}function Y_(e){return K`
    <li class="outlook-day">
      <div class="outlook-day__head">
        <span class="outlook-day__name">${If(e.date)}<span class="outlook-day__date">${Ff(A(e.date))}</span></span>
        ${Kf(e.level)}
      </div>
      ${e.signals.length?K`<ul class="outlook-signals">
            ${e.signals.slice(0,2).map(e=>K`<li><strong>${Wf(e)}</strong></li>`)}
          </ul>`:K`<p class="muted small">${I(`plus.forecast.calmText`)}</p>`}
    </li>`}function X_(e){return K`
    <section class="section" aria-labelledby="alerts-title">
      <h2 class="section-title" id="alerts-title">${I(`plus.forecast.alertsTitle`)}</h2>
      ${tf({name:`alerts`,type:`checkbox`,legend:I(`plus.forecast.alertsTitle`),options:Ed.map(e=>({value:e,label:I(`plus.forecast.alerts.${e}`)})),selected:e})}
      ${e.length?``:K`<p class="plus-summary">${I(`plus.forecast.alertsNone`)}</p>`}
    </section>`}function Z_(){let{forecast:e,weather:t}=P(),n=Od(),r=n.next,i=r?Gf(r):null;return J({header:Y({back:`/plus`}),body:K`
      <h1 class="screen-title" tabindex="-1">${I(`plus.features.forecast.title`)}</h1>
      <p class="screen-lead">${I(`plus.forecast.lead`)}</p>

      ${t.enabled?``:K`<a class="list section-sm plus-prompt" href="#/plus/weather">
            <span class="list__row">
              ${q(`gauge`)}
              <span class="list__text">
                <span class="list__label">${I(`plus.forecast.weatherOff`)}</span>
                <span class="list__hint">${I(`plus.forecast.weatherOffHint`)}</span>
              </span>
              ${q(`chevronRight`,{size:20})}
            </span>
          </a>`}
      ${t.enabled&&!Zl()?K`<p class="plus-summary">${I(`plus.forecast.staleForecast`)}</p>`:``}

      <ul class="outlook-days">${n.days.map(Y_)}</ul>

      ${X_(e.alerts)}

      <section class="section" aria-labelledby="notify-title">
        <h2 class="section-title" id="notify-title">${I(`plus.forecast.notifyTitle`)}</h2>
        <div class="list">
          ${of({name:`notify`,label:I(`plus.forecast.notify`),hint:I(`plus.forecast.notifyHint`),checked:e.notify,iconName:`bell`})}
          ${e.notify?K`<div class="list__field">${Z({label:I(`plus.forecast.notifyTime`),name:`notifyTime`,type:`time`,value:e.time})}</div>`:``}
        </div>
        ${e.notify&&!i&&e.alerts.length?K`<p class="plus-summary">${I(`plus.forecast.nothingToNotify`)}</p>`:``}
        ${e.notify&&i?K`<div class="notif-preview">
              <p class="notif-preview__label">${I(`plus.forecast.previewLabel`)}</p>
              <div class="notif">
                <span class="notif__head">${q(`bellRing`,{size:18})}<strong>${I(`app.name`)}</strong><span>${e.time}</span></span>
                <strong class="notif__title">${I(`plus.forecast.cardTitle`,{day:If(r.date)})}</strong>
                <span>${Wf(i)}</span>
              </div>
            </div>`:``}
      </section>

      <p class="disclaimer">${q(`info`,{size:20})}<span>${I(`plus.forecast.disclaimer`)}</span></p>
      <div class="section">${X({label:I(`plus.forecast.disable`),variant:`outline`,iconName:`x`,action:`disable`,block:!0})}</div>`})}var Q_={render(){return P().forecast.enabled?Z_():J_()},async onChange(e,t){if(e.name===`alerts`){let e=new Set([...document.querySelectorAll(`input[name="alerts"]:checked`)].map(e=>e.value));ur({alerts:Ed.filter(t=>e.has(t))}),sp(),t.rerender()}if(e.name===`notify`){let n=e.checked&&await q_();ur({notify:n}),sp(),t.rerender(),n&&sl(document.querySelector(`.notif-preview`))}e.name===`notifyTime`&&e.value&&(ur({time:e.value}),sp(),t.rerender())},actions:{async enable(e,t){ur({enabled:!0,notify:P().forecast.notify&&await q_()}),sp(),t.rerender(),P().weather.enabled||Q(I(`plus.forecast.weatherOff`))},disable(){ur({enabled:!1}),sp(),a(`/plus`,{replace:!0})}}};function $_(e,t,n){if(e==null||t==null)return I(`plus.stats.noCompare`);let r=e-t;return Math.abs(r)<.05?I(`plus.stats.same`):I(r<0?`plus.stats.less`:`plus.stats.more`,{value:n(Math.abs(r))})}function ev(e){let{current:t,previous:n}=kd(e),r=e=>String(Math.round(e)),i=[{key:`symptomDays`,now:t.symptomDays,before:n.symptomDays,format:r},{key:`episodes`,now:t.episodeCount,before:n.episodeCount,format:r},{key:`avgIntensity`,now:t.avgIntensity,before:n.avgIntensity,format:_f},{key:`avgDuration`,now:t.avgDurationMinutes,before:n.avgDurationMinutes,format:yf}];return K`
    <section class="section" aria-labelledby="cmp-title">
      <h2 class="section-title" id="cmp-title">${I(`plus.stats.compareTitle`)}</h2>
      <p class="muted small">${I(`plus.stats.compareLead`,{days:L(`plural.days`,e)})}</p>
      <ul class="compare-list">
        ${i.map(e=>{let t=e.now==null||e.before==null||Math.abs(e.now-e.before)<.05?`minus`:e.now<e.before?`arrowDown`:`arrowUp`;return K`
            <li class="compare-item">
              <span class="compare-item__label">${I(`insights.${e.key}`)}</span>
              <span class="compare-item__value${e.now==null?` compare-item__value--empty`:``}">${e.now==null?I(`insights.noValue`):e.format(e.now)}</span>
              <span class="compare-item__trend">${q(t,{size:16})}${$_(e.now,e.before,e.format)}</span>
            </li>`})}
      </ul>
    </section>`}function tv(){let e=Ad(12),t=new Intl.DateTimeFormat(qr(),{month:`narrow`}),n=e.map(e=>({label:t.format(e.month),value:e.symptomDays,readout:`${gf(e.month)} · ${I(`plus.stats.symptomDaysValue`,{n:e.symptomDays})} · ${L(`plural.episodes`,e.episodes)}`}));return K`
    <section class="section" aria-labelledby="trend-title">
      <h2 class="section-title" id="trend-title">${I(`plus.stats.trendTitle`)}</h2>
      ${x_({items:n,label:I(`plus.stats.trendLabel`),table:S_({head:[I(`plus.stats.colMonth`),I(`insights.symptomDays`),I(`insights.episodes`)],rows:[...e].reverse().map(e=>[gf(e.month),e.symptomDays,e.episodes])})})}
    </section>`}function nv(e){let{grid:t,total:n}=Nd(e);if(n<3)return``;let r=new Date(2024,0,1),i=new Intl.DateTimeFormat(qr(),{weekday:`short`}),a=Array.from({length:7},(e,t)=>{let n=i.format(j(r,t)).replace(`.`,``);return n.charAt(0).toLocaleUpperCase(qr())+n.slice(1)});return K`
    <section class="section" aria-labelledby="rhythm-title">
      <h2 class="section-title" id="rhythm-title">${I(`plus.stats.rhythmTitle`)}</h2>
      <p class="muted small">${I(`plus.stats.rhythmLead`,{n:L(`plural.episodes`,n)})}</p>
      ${C_({grid:t,rowLabels:a,colLabels:jd.map(e=>I(`plus.stats.parts.${e}`)),label:I(`plus.stats.rhythmTitle`)})}
    </section>`}function rv(e){if(P().cycleTracking!==!0)return``;let{items:t,total:n,starts:r}=Pd(e);if(n<3||r<2)return``;let i=e=>e===0?I(`plus.stats.cycleStart`):I(`plus.stats.cycleOffset`,{n:e>0?`+${e}`:`−${Math.abs(e)}`}),a=t.map(e=>({label:e.offset===0?`1.`:e.offset>0?`+${e.offset}`:`−${Math.abs(e.offset)}`,value:e.count,readout:`${i(e.offset)} · ${L(`plural.episodes`,e.count)}`}));return K`
    <section class="section" aria-labelledby="cycle-title">
      <h2 class="section-title" id="cycle-title">${I(`plus.stats.cycleTitle`)}</h2>
      <p class="muted small">${I(`plus.stats.cycleLead`,{n:r})}</p>
      ${x_({items:a,selected:t.findIndex(e=>e.offset===0),label:I(`plus.stats.cycleTitle`),table:S_({head:[I(`plus.stats.colCycleDay`),I(`insights.episodes`)],rows:t.map(e=>[i(e.offset),e.count])})})}
    </section>`}function iv(e){let{relief:t,impact:n}=Fd(e);return K`
    ${t.length?K`<section class="section" aria-labelledby="relief-title">
          <h2 class="section-title" id="relief-title">${I(`plus.stats.reliefTitle`)}</h2>
          ${hg(t.slice(0,5),sm)}
        </section>`:``}
    ${n.length?K`<section class="section" aria-labelledby="impact-title">
          <h2 class="section-title" id="impact-title">${I(`plus.stats.impactTitle`)}</h2>
          ${hg(n.slice(0,5),cm)}
        </section>`:``}`}function av(e){let t=Id(e);if(!t.length)return``;let n=new Intl.DateTimeFormat(qr(),{month:`narrow`}),r=e=>hf(A(e));return K`
    <section class="section" aria-labelledby="med-title">
      <h2 class="section-title" id="med-title">${I(`plus.stats.medTitle`)}</h2>
      <p class="muted small">${I(`plus.stats.medLead`)}</p>
      <ul class="med-timeline">
        ${t.map(e=>{let t=e.months.map(e=>({label:n.format(e.month),value:e.count,display:String(e.count),readout:`${gf(e.month)} · ${L(`plural.times`,e.count)}`})),i=[e.medication.startDate?I(`plus.stats.medSince`,{date:r(e.medication.startDate)}):``,I(`plus.stats.medTotal`,{count:L(`plural.times`,e.total),date:r(e.last)})].filter(Boolean);return K`
            <li class="med-timeline__item">
              <span class="med-timeline__name">${e.medication.name}</span>
              <span class="muted small">${i.join(` · `)}</span>
              ${x_({items:t,label:`${I(`plus.stats.medTitle`)} · ${e.medication.name}`,table:S_({head:[I(`plus.stats.colMonth`),I(`plus.stats.colCount`)],rows:[...e.months].reverse().map(e=>[gf(e.month),e.count])})})}
            </li>`})}
      </ul>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${I(`plus.stats.medDisclaimer`)}</span></p>
    </section>`}var ov={render(e){let t=hd.includes(Number(e.query.days))?Number(e.query.days):180,n=td(t);return id(td(365)).recordCount?J({header:Y({back:`/insights`}),body:K`
        <h1 class="screen-title" tabindex="-1">${I(`plus.features.stats.title`)}</h1>
        <div class="insights-period">
          ${nf({name:`days`,legend:I(`insights.periodLabel`),selected:String(t),options:hd.map(e=>({value:String(e),label:I(`plus.periods.d${e}`)}))})}
        </div>
        ${ev(t)}
        ${tv()}
        ${nv(n)}
        ${rv(n)}
        ${iv(n)}
        ${av(n)}
        <p class="disclaimer">${q(`info`,{size:20})}<span>${I(`insights.interpretation`)}</span></p>`}):J({header:Y({back:`/insights`}),body:K`
          <h1 class="screen-title" tabindex="-1">${I(`plus.features.stats.title`)}</h1>
          <div class="coming">
            ${q(`chart`,{size:40})}
            <p class="muted">${I(`plus.stats.empty`)}</p>
          </div>`})},mount(e){return w_(e)},onChange(e,t){e.name===`days`&&(o(`/plus/stats?days=${e.value}`),t.rerender())}},sv={render(){let e=Zn(),t=[`plus.withdraw.stepForm`,`plus.withdraw.stepConfirm`,Xn()?`plus.withdraw.stepAfterTrial`:`plus.withdraw.stepAfter`];return J({header:Y({back:`/plus`}),body:K`
        <h1 class="screen-title" tabindex="-1">${I(`plus.withdraw.title`)}</h1>
        <p class="screen-lead">${e?I(`plus.withdraw.lead`,{date:hf(e)}):I(`plus.withdraw.leadLate`)}</p>
        <ol class="steps-list">
          ${t.map(e=>K`<li>${I(e)}</li>`)}
        </ol>
        <p class="info-note">${q(`info`,{size:20})}<span>${I(`plus.withdraw.note`,{address:xe})}</span></p>`,footer:K`
        ${X({label:I(`plus.withdraw.openForm`),iconName:`externalLink`,action:`openForm`,block:!0,id:`withdraw-open`})}
        ${X({label:I(`common.cancel`),variant:`ghost`,action:`cancel`,block:!0})}`})},actions:{async openForm(){Q(I(`plus.withdraw.demoNote`))},cancel(){a(`/plus`,{replace:!0})}}},cv=!1,lv=!1;function uv(){let{plus:e}=P();e.active&&!e.confirmation&&(!Pu()||Iu()||lv)&&er({text:pv(),termsVersion:Mg})}function dv(){let{plus:e}=P(),t=e.plan?Vu()?.[e.plan]:null,n=e.trialEndsAt,r=Qn();return[[I(`plus.confirmation.plan`),e.plan?`${I(`plus.name`)} · ${I(`plus.plans.${e.plan}.name`)}`:I(`plus.name`)],[I(`plus.confirmation.price`),t?`${xf(t)} ${I(`plus.plans.${e.plan}.per`)}`:I(`plus.confirmation.priceUnknown`,{store:Fu()})],e.startedAt&&[I(`plus.confirmation.started`),hf(e.startedAt)],n&&[I(`plus.confirmation.trialEnd`),hf(n)],e.orderId&&[I(`plus.confirmation.order`),e.orderId],r&&[I(`plus.confirmation.withdrawUntil`),hf(r)]].filter(Boolean)}function fv(){let e=Fu(),t=Qn();return[[I(`plus.confirmation.providerTitle`),I(`plus.confirmation.providerText`,{email:xe})],[I(`plus.confirmation.renewalTitle`),I(`plus.confirmation.renewalText`,{store:e,manage:I(`plus.manage.manageStore`)})],[I(`plus.confirmation.withdrawalTitle`),I(`plus.confirmation.withdrawalText`,{date:t?hf(t):``,row:I(`plus.withdraw.row`),email:xe,store:e})],[I(`terms.formTitle`),I(`terms.formText`)]]}function pv(){let e=e=>e.toLocaleUpperCase(),t=`${I(`terms.title`)} (${I(`terms.version`,{version:Mg})})`;return[`${I(`plus.confirmation.title`)} – ${I(`plus.name`)}`,I(`plus.confirmation.created`,{time:mf(new Date)}),I(`plus.confirmation.demoNote`),``,...dv().map(([e,t])=>`${e}: ${t}`),...fv().flatMap(([t,n])=>[``,e(t),n]),``,``,e(t),...Pg.flatMap(t=>[``,e(I(`terms.${t}Title`)),I(`terms.${t}Text`)]),``].filter(e=>e!==null).join(`
`)}n(`/start/language`,_p),n(`/start/welcome`,vp),n(`/start/privacy`,Rg({onboarding:!0})),n(`/start/goals`,Cp),n(`/start/condition`,Ap),n(`/profile/condition`,jp),n(`/start/cycle`,Pp),n(`/start/medications`,Lp),n(`/start/medications/new`,Vp({returnTo:`/start/medications`})),n(`/start/reminders`,zp),n(`/start/profile`,Hg),n(`/consent`,Rg({onboarding:!1})),n(`/privacy-policy`,Bg({key:`privacyPolicy`,sections:jg,version:Ag})),n(`/terms`,Bg({key:`terms`,sections:Pg,version:Mg})),n(`/about`,Bg({key:`about`,sections:Ng,showAppVersion:!0})),n(`/security/pin`,$g),n(`/lock`,a_),n(`/today`,_h),n(`/episode/:id`,Sh),n(`/episode/:id/details/:step`,lh),n(`/log/symptoms`,Uh),n(`/log/intensity`,Gh),n(`/log/details`,Yh),n(`/symptom/:id`,Zh),n(`/calendar`,pg),n(`/insights`,_g),n(`/report`,vg),n(`/report/view`,wg),n(`/sleep`,kg),n(`/treatment`,eg),n(`/treatment/new`,Vp({returnTo:`/treatment`})),n(`/treatment/:id`,ig),n(`/treatment/:id/edit`,Vp({returnTo:e=>`/treatment/${e.params.id}`})),n(`/treatment/:id/intake`,og({mode:`new`})),n(`/intake/:id`,og({mode:`edit`})),n(`/medication-intake`,Th),n(`/profile`,Nh),n(`/backup`,Bh),n(`/plus`,g_),n(`/plus/weather`,I_),n(`/plus/health`,H_),n(`/plus/finder`,K_),n(`/plus/forecast`,Q_),n(`/plus/stats`,ov),n(`/plus/withdraw`,sv),n(`/plus/confirmation`,{render(e){let t=e.query.welcome===`1`,n=`/plus?welcome=1`,r=P().plus.confirmation;return J({header:Y({back:t?n:`/plus`}),body:K`
        <h1 class="screen-title" tabindex="-1">${I(`plus.confirmation.title`)}</h1>
        <p class="screen-lead">${I(`plus.confirmation.lead`)}</p>
        ${r?K`<p class="muted small">${I(`plus.confirmation.snapshotNote`,{time:mf(new Date(r.savedAt))})}</p>`:``}
        ${P().plus.simulated?K`<p class="plus-demo">${sf(I(`plus.demoChip`),{neutral:!0})}<span>${I(`plus.confirmation.demoNote`)}</span></p>`:``}
        <dl class="facts">
          ${dv().map(([e,t])=>K`<div class="fact"><dt>${e}</dt><dd>${t}</dd></div>`)}
        </dl>
        <div class="policy">
          ${fv().map(([e,t],n)=>K`
              <section>
                <h2 class="section-title">${e}</h2>
                <p class="${n===3?`withdraw-text`:``}">${t}</p>
              </section>`)}
          <section>
            <h2 class="section-title">${I(`terms.title`)}</h2>
            <p>${I(`plus.confirmation.termsText`,{version:r?.termsVersion??`2026-11-27`})}</p>
            <p><a href="#/terms">${I(`plus.confirmation.termsOpen`)}</a></p>
          </section>
        </div>`,footer:K`
        ${X({label:I(`plus.confirmation.save`),variant:t?`secondary`:`primary`,iconName:`download`,action:`save`,block:!0})}
        ${t?X({label:I(`common.continue`),action:`continue`,data:{to:n},block:!0}):``}`})},mount(e,t){uv(),!(!Pu()||Iu()||cv)&&(cv=!0,Hu().then(e=>{lv=!0,uv(),e&&r().path===`/plus/confirmation`&&t.rerender()}))},actions:{async save(){try{let e=`${I(`plus.confirmation.fileName`)}-${k()}.txt`;await yl(()=>Je(e,P().plus.confirmation?.text??pv(),`text/plain;charset=utf-8`))&&Q(I(`plus.confirmation.saved`))}catch(e){console.error(`[confirmation] Potvrdenie sa nepodarilo uložiť`,e),Q(I(`plus.confirmation.saveFailed`))}},continue(e){a(e.dataset.to,{replace:!0})}}});var mv=[`/privacy-policy`,`/terms`,`/security/pin`],hv=[`/consent`,`/privacy-policy`,`/terms`];function gv(e){return Sl()?e===`/lock`?`/today`:P().language?an()?e===`/`||e.startsWith(`/start/`)?`/today`:Fg()?e.startsWith(`/log/`)&&!Om()?`/today`:e.startsWith(`/plus/`)&&!F()?`/plus?from=${e.split(`/`)[2]}`:null:hv.includes(e)?null:`/consent`:e.startsWith(`/start/`)||mv.includes(e)?null:`/start/welcome`:e===`/start/language`?null:`/start/language`:(Tl(e),e===`/lock`?null:`/lock`)}var _v=document.getElementById(`app`),vv=null,yv={render:()=>J({body:K`
        <h1 class="screen-title" tabindex="-1">${I(`failure.title`)}</h1>
        <p class="screen-lead">${I(`failure.text`)}</p>`,footer:K`
        ${X({label:I(`failure.retry`),action:`retry`,block:!0})}
        ${X({label:I(`failure.backup`),variant:`secondary`,action:`toBackup`,block:!0})}
        ${X({label:I(`failure.home`),variant:`ghost`,action:`toHome`,block:!0})}`}),actions:{retry:()=>bv(),toBackup:()=>r().path===`/backup`?bv():a(`/backup`),toHome:()=>r().path===`/today`?bv():a(`/today`,{replace:!0})}};function bv({navigation:e=!0}={}){let{path:t,query:n}=r(),o=gv(t);if(o)return a(o,{replace:!0});let s=i(t);if(!s)return a(`/today`,{replace:!0});let c=e?null:document.activeElement?.id,l=e?0:_v.querySelector(`.screen__body`)?.scrollTop??0;vv?.cleanup?.();let u=document.getElementById(`dialog`);e&&u.open&&u.close();let d={params:s.params,query:n,rerender:()=>bv({navigation:!1})},f=s.screen,p;try{p=String(f.render(d))}catch(e){console.error(`[main] Obrazovku ${t} sa nepodarilo vykresliť`,e),f=yv,p=String(f.render(d))}_v.innerHTML=p,vv={screen:f,ctx:d,cleanup:f.mount?.(_v,d)};let m=_v.querySelector(`.screen__body`);m&&(m.scrollTop=l),e?(_v.querySelector(`.screen-title`)?.focus({preventScroll:!0}),al(_v)):c&&document.getElementById(c)?.focus({preventScroll:!0}),e&&wv()}var xv=[`/today`,`/calendar`,`/profile`,`/plus`,`/plus/weather`,`/plus/health`,`/plus/forecast`],Sv=!1,Cv=!1;async function wv(){if(Sv||!Sl()||!an()||!Fg())return;Sv=!0;let e=!1,t=!1,n=!1;try{e=await Ku(),F()&&([t,n]=await Promise.all([Xl(),_u()]))}catch(e){console.error(`[main] Aktuálne údaje sa nepodarilo obnoviť`,e)}finally{Sv=!1}Sl()&&((!Cv||e||t)&&(Cv=!0,cp()),e&&Xu()?a(`/plus/confirmation?welcome=1`,{replace:!0}):(e||t||n)&&xv.includes(r().path)&&bv({navigation:!1}))}var Tv={back:e=>s(e.dataset.fallback||`/today`),startEpisode:()=>{a(`/episode/${Nn().id}?new=1`)}};_v.addEventListener(`click`,e=>{let t=e.target.closest(`a[target="_blank"]`);if(t&&Ne()){e.preventDefault(),Ge(t.href);return}let n=e.target.closest(`a[href^="#/"]`);if(n){e.preventDefault(),a(n.getAttribute(`href`).slice(1),{replace:n.hasAttribute(`data-replace`)});return}let r=e.target.closest(`[data-action]`);if(!r||!vv)return;let i=vv.screen.actions?.[r.dataset.action]??Tv[r.dataset.action];i&&(e.preventDefault(),i(r,vv.ctx,e))}),_v.addEventListener(`submit`,e=>{e.preventDefault(),vv?.screen.onSubmit?.(e.target,vv.ctx,e)}),_v.addEventListener(`change`,e=>{e.target.matches(`.option input`)&&ol(e.target),vv?.screen.onChange?.(e.target,vv.ctx,e)}),_v.addEventListener(`input`,e=>{af(e.target),vv?.screen.onInput?.(e.target,vv.ctx,e)});var Ev=0,Dv=null;function Ov(){clearTimeout(Dv),Ev=0,Cl(r().path),Ye(),a(`/lock`,{replace:!0})}function kv(e){if(e&&wv(),clearTimeout(Dv),vl()){Ev=0;return}if(!pt()||!Sl())return;let t=P().autoLockMinutes??1;e?Ev&&Date.now()-Ev>=t*6e4?Ov():Ev=0:(Ev=Date.now(),t===0?Ov():Dv=setTimeout(()=>Ev&&Sl()&&Ov(),t*6e4))}document.addEventListener(`visibilitychange`,()=>kv(!document.hidden));var Av=[`/today`,`/lock`,`/consent`,`/start/language`];function jv(){let e=document.getElementById(`dialog`);e.open?e.close():Av.includes(r().path)?Ce.exitApp():s(`/today`)}Ne()&&(Ce.addListener(`appStateChange`,({isActive:e})=>kv(e)),Ce.addListener(`backButton`,jv));async function Mv(){await ut(),xl(),history.state||history.replaceState({index:0},``,location.href),c(()=>bv()),Ye()}Mv();export{h as n,S as r,ke as t};