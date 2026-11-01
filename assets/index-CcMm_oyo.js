(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[],t=()=>{};function n(t,n){let r=[],i=t.replace(/:(\w+)/g,(e,t)=>(r.push(t),`([^/]+)`));e.push({regex:RegExp(`^${i}$`),keys:r,screen:n})}function r(){let[e,t=``]=(location.hash.slice(1)||`/`).split(`?`);return{path:e,query:Object.fromEntries(new URLSearchParams(t))}}function i(t){for(let n of e){let e=n.regex.exec(t);if(e){let t=Object.fromEntries(n.keys.map((t,n)=>[t,decodeURIComponent(e[n+1])]));return{screen:n.screen,params:t}}}return null}function a(e,{replace:n=!1}={}){let r=history.state?.index??0;n?history.replaceState({index:r},``,`#${e}`):history.pushState({index:r+1},``,`#${e}`),t()}function o(e){history.replaceState(history.state,``,`#${e}`)}function s(e){(history.state?.index??0)>0?history.back():a(e,{replace:!0})}function c(e){t=e,window.addEventListener(`popstate`,()=>e()),e()}var l=new TextEncoder,u=new TextDecoder,d=6e5;function f(e){let t=new Uint8Array(e),n=``;for(let e=0;e<t.length;e+=32768)n+=String.fromCharCode(...t.subarray(e,e+32768));return btoa(n)}var p=e=>Uint8Array.from(atob(e),e=>e.charCodeAt(0)),m=e=>crypto.getRandomValues(new Uint8Array(e)),h=()=>f(m(16));async function g(e,t,n=d){let r=await crypto.subtle.importKey(`raw`,l.encode(e),`PBKDF2`,!1,[`deriveKey`]);return crypto.subtle.deriveKey({name:`PBKDF2`,salt:p(t),iterations:n,hash:`SHA-256`},r,{name:`AES-GCM`,length:256},!1,[`wrapKey`,`unwrapKey`])}var _=()=>crypto.subtle.generateKey({name:`AES-GCM`,length:256},!0,[`encrypt`,`decrypt`]);async function v(e,t){let n=m(12),r=await crypto.subtle.wrapKey(`raw`,e,t,{name:`AES-GCM`,iv:n});return{iv:f(n),key:f(r)}}function y(e,t){return crypto.subtle.unwrapKey(`raw`,p(e.key),t,{name:`AES-GCM`,iv:p(e.iv)},{name:`AES-GCM`,length:256},!0,[`encrypt`,`decrypt`])}async function b(e,t){let n=m(12),r=await crypto.subtle.encrypt({name:`AES-GCM`,iv:n},t,l.encode(JSON.stringify(e)));return{enc:1,iv:f(n),data:f(r)}}async function x(e,t){let n=await crypto.subtle.decrypt({name:`AES-GCM`,iv:p(e.iv)},t,p(e.data));return JSON.parse(u.decode(n))}var S={facebook:`https://www.facebook.com/groups/3261623930593764`,instagram:`https://www.instagram.com/vestibularnamigrena/`,discord:`https://discord.gg/AMz5vd5HRr`,web:`https://www.vestibularnamigrena.sk/`},C=`vm2:data`,w=`vm2:lock`,T=5,E=3e4,D=9e5,O=null,k=Promise.resolve();function A(e){try{let t=localStorage.getItem(e);return t?JSON.parse(t):null}catch(e){return console.error(`[storage] Dáta sa nepodarilo načítať`,e),null}}function j(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(e){console.error(`[storage] Dáta sa nepodarilo uložiť`,e)}}var M=()=>!!A(w),ee=()=>!M()||!!O,te=()=>A(w)?.language??null,ne=()=>A(w)?.theme??null;function re({language:e,theme:t}){let n=A(w);n&&j(w,{...n,...e?{language:e}:{},...t?{theme:t}:{}})}var ie=()=>A(w)?.blockedUntil??0;function ae(e){let t=(e.failed??0)+1,n=t-T,r=n>=0?Date.now()+Math.min(E*2**n,D):0;return j(w,{...e,failed:t,blockedUntil:r}),{failed:t,blockedUntil:r,remaining:Math.max(T-t,0)}}var oe=class extends Error{constructor(e,t={}){super(e),this.code=e,Object.assign(this,t)}};async function se(e){let t=A(w);if(!t)throw new oe(`wrong`);if(t.blockedUntil&&t.blockedUntil>Date.now())throw new oe(`blocked`,{blockedUntil:t.blockedUntil});try{let n=await g(e,t.salt,t.iterations),r=await y(t.wrapped,n);return j(w,{...t,failed:0,blockedUntil:0}),r}catch{throw new oe(`wrong`,ae(A(w)))}}function ce(){if(M())return null;let e=A(C);return e?.enc?null:e}function le(e){if(!M()){j(C,e);return}if(!O)return;let t=b(e,O);k=k.then(()=>t).then(e=>j(C,e)).catch(e=>console.error(`[storage] Dáta sa nepodarilo zašifrovať`,e))}async function ue(e){let t=await se(e),n=A(C),r=n?.enc?await x(n,t):n;return O=t,r}async function de(e){return await se(e),!0}async function fe(e,t,{language:n,theme:r}={}){let i=h(),a=await g(e,i),o=await _(),s=await v(o,a),c=await b(t,o);await k,j(w,{v:1,salt:i,iterations:d,wrapped:s,language:n,theme:r,failed:0,blockedUntil:0}),j(C,c),O=o}async function pe(e){let t=A(w);if(!t||!O)return;let n=h(),r=await g(e,n),i=await v(O,r);j(w,{...t,salt:n,iterations:d,wrapped:i,failed:0,blockedUntil:0})}async function me(e){await k,localStorage.removeItem(w),O=null,j(C,e)}function he(){O=null}function ge(){O=null;try{localStorage.removeItem(C),localStorage.removeItem(w)}catch(e){console.error(`[storage] Dáta sa nepodarilo vymazať`,e)}}var _e=e=>String(e).padStart(2,`0`);function N(e=new Date){let t=new Date(e);return`${t.getFullYear()}-${_e(t.getMonth()+1)}-${_e(t.getDate())}`}function P(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function ve(e=new Date){let t=new Date(e);return`${_e(t.getHours())}:${_e(t.getMinutes())}`}function ye(e,t=`12:00`){let n=P(e),[r,i]=t.split(`:`).map(Number);return n.setHours(r||0,i||0,0,0),n.toISOString()}function F(e,t){let n=new Date(e);return n.setDate(n.getDate()+t),n}var be=(e,t)=>N(e)===N(t),xe=e=>be(e,new Date),Se=(e=new Date)=>N(e).slice(0,7);function Ce(e){let[t,n]=e.split(`-`).map(Number);return new Date(t,n-1,1)}function we(e,t){let n=Ce(e);return n.setMonth(n.getMonth()+t),Se(n)}function Te(e,t){let n=[];for(let r=P(e);N(r)<=t;r=F(r,1))n.push(N(r));return n}var Ee=1;function De(){return{schemaVersion:Ee,settings:{language:null,onboardingCompletedAt:null,name:``,nameSetAt:null,goals:[],condition:null,cycleTracking:null,reminder:{enabled:!1,time:`20:00`},theme:`system`,reduceMotion:!1,demoSeededAt:null,demoEnabled:!0,consent:null,autoLockMinutes:1,plus:{active:!1,plan:null,startedAt:null,trialEndsAt:null,simulated:!1},weather:{enabled:!1,source:null,lat:null,lon:null,placeLabel:``,consentAt:null,updatedAt:null},health:{connected:!1,provider:null,types:[],consentAt:null,lastSyncAt:null},forecast:{enabled:!1,notify:!0,time:`19:00`}},medications:[],medicationIntakes:[],episodes:[],symptomLogs:[],sleepLogs:[],cycleEntries:[],customSymptoms:[],customTriggers:[],weatherDays:[],healthDays:[]}}function Oe(e){let t=De();if(!e)return t;let n={...t,...e,schemaVersion:Ee,settings:{...t.settings,...e.settings}};return n.weatherDays=n.weatherDays.filter(e=>e.source!==`demo`),n.healthDays=n.healthDays.filter(e=>!String(e.id).startsWith(`demo-`)),n.sleepLogs=n.sleepLogs.map(e=>String(e.id).startsWith(`demo-`)?{...e,source:`manual`,bedtime:null,wakeTime:null,externalId:null}:e),n.settings.weather.source===`demo`&&(n.settings.weather=t.settings.weather),n.settings.health.simulated&&(n.settings.health=t.settings.health),n}var I=De();function ke(e){I=Oe(e)}function Ae(){I=De()}function L(){le(I)}var je=()=>globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`,Me=()=>new Date().toISOString();function Ne(e){let t=Me();return{id:je(),createdAt:t,updatedAt:t,...e}}var Pe=e=>(t,n)=>n[e].localeCompare(t[e]),R=()=>I.settings;function Fe(e){I.settings={...I.settings,...e},L()}var Ie=()=>!!I.settings.onboardingCompletedAt;function Le(){Fe({onboardingCompletedAt:Me()})}var Re=()=>I.medications,ze=e=>I.medications.find(t=>t.id===e)??null;function Be({name:e=``,type:t,dose:n=``,frequency:r=``,note:i=``,startDate:a=null,endDate:o=null}){return{name:String(e).trim(),type:t===`acute`?`acute`:`preventive`,dose:String(n).trim(),frequency:String(r).trim(),note:String(i).trim(),startDate:a||null,endDate:o||null}}function Ve(e){let t=Ne(Be(e));return I.medications.push(t),L(),t}function He(e,t){let n=ze(e);return n?(Object.assign(n,Be({...n,...t}),{updatedAt:Me()}),L(),n):null}function Ue(e){let t={medication:ze(e),intakes:I.medicationIntakes.filter(t=>t.medicationId===e)};return I.medications=I.medications.filter(t=>t.id!==e),I.medicationIntakes=I.medicationIntakes.filter(t=>t.medicationId!==e),L(),t}function We(e){e?.medication&&!ze(e.medication.id)&&(I.medications.push(e.medication),I.medicationIntakes.push(...e.intakes),L())}function Ge(e){return I.medicationIntakes.filter(t=>!e||t.medicationId===e).sort(Pe(`takenAt`))}var Ke=e=>I.medicationIntakes.find(t=>t.id===e)??null;function qe(e){return I.episodes.find(t=>t.startedAt<=e&&(!t.endedAt||t.endedAt>=e))??null}function Je({medicationId:e,takenAt:t,dose:n=``,effect:r=null,note:i=``}){return{medicationId:e,takenAt:t,dose:String(n).trim(),effect:r||null,note:String(i).trim(),episodeId:qe(t)?.id??null}}function Ye(e){let t=Ne(Je(e));return I.medicationIntakes.push(t),L(),t}function Xe(e,t){let n=Ke(e);return n?(Object.assign(n,Je({...n,...t}),{updatedAt:Me()}),L(),n):null}function Ze(e){let t=Ke(e);return I.medicationIntakes=I.medicationIntakes.filter(t=>t.id!==e),L(),t}function Qe(e){e&&!Ke(e.id)&&(I.medicationIntakes.push(e),L())}var $e=e=>I.symptomLogs.find(t=>t.id===e)??null,et=e=>I.symptomLogs.filter(t=>t.episodeId===e).sort(Pe(`occurredAt`));function tt({id:e,occurredAt:t,symptoms:n,vertigoType:r=null,duration:i=null,note:a=``,episodeId:o=null}){let s={occurredAt:t,symptoms:n.map(({key:e,intensity:t})=>({key:e,intensity:t??null})),vertigoType:r,duration:i,note:String(a).trim(),episodeId:o},c=e?$e(e):null;if(c)return Object.assign(c,s,{updatedAt:Me()}),L(),c;let l=Ne(s);return I.symptomLogs.push(l),L(),l}function nt(e){let t=$e(e);return I.symptomLogs=I.symptomLogs.filter(t=>t.id!==e),L(),t}function rt(e){e&&!$e(e.id)&&(I.symptomLogs.push(e),L())}function it(e){let t=e.symptoms.map(e=>e.intensity).filter(e=>e!=null);return t.length?Math.max(...t):null}var at=()=>I.customSymptoms,ot=e=>I.customSymptoms.find(t=>t.key===e)??null;function st(e){let t=String(e).trim().slice(0,40);if(!t)return null;let n=I.customSymptoms.find(e=>e.label.toLocaleLowerCase()===t.toLocaleLowerCase());if(n)return n;let r={key:`custom:${je()}`,label:t,createdAt:Me()};return I.customSymptoms.push(r),L(),r}var ct=e=>I.episodes.find(t=>t.id===e)??null;function lt(){return I.episodes.filter(e=>!e.endedAt).sort(Pe(`startedAt`))[0]??null}function ut(){let e=Ne({startedAt:Me(),endedAt:null,type:null,intensity:null,symptoms:[],vertigoTypes:[],triggers:[],triggerOther:``,medicationIntakeIds:[],helped:null,relief:[],reliefOther:``,impact:[],impactOther:``,note:``});return I.episodes.push(e),L(),e}function dt(e,t){let n=ct(e);return n?(Object.assign(n,t,{updatedAt:Me()}),L(),n):null}var ft=e=>dt(e,{endedAt:Me()}),pt=(e,t)=>dt(e,t),mt=e=>Ge().filter(t=>t.episodeId===e),ht=e=>dt(e,{endedAt:null});function gt(e){let t=ct(e);return I.episodes=I.episodes.filter(t=>t.id!==e),L(),t}function _t(e){e&&!ct(e.id)&&(I.episodes.push(e),L())}var vt=e=>I.cycleEntries.some(t=>t.date===e&&t.type===`period`);function yt(e){return vt(e)?I.cycleEntries=I.cycleEntries.filter(t=>t.date!==e||t.type!==`period`):I.cycleEntries.push({id:je(),date:e,type:`period`,createdAt:Me()}),L(),vt(e)}var bt=e=>I.sleepLogs.find(t=>t.date===e)??null;function xt({date:e,minutes:t,quality:n=null,note:r=``}){let i={date:e,minutes:Math.max(0,Math.round(t)),quality:n||null,note:String(r).trim(),source:`manual`},a=bt(e);if(a)return Object.assign(a,i,{updatedAt:Me()}),L(),a;let o=Ne({...i,bedtime:null,wakeTime:null,externalId:null});return I.sleepLogs.push(o),L(),o}function St(e){let t=bt(e);return I.sleepLogs=I.sleepLogs.filter(t=>t.date!==e),L(),t}function Ct(e){e&&!bt(e.date)&&(I.sleepLogs.push(e),L())}var wt=()=>!!I.settings.plus.active;function Tt({plan:e,simulated:t=!1}){let n=new Date;I.settings.plus={active:!0,plan:e,startedAt:n.toISOString(),trialEndsAt:e===`yearly`?F(n,7).toISOString():null,simulated:t},L()}function Et(){I.settings.plus=De().settings.plus,L()}var Dt=e=>I.weatherDays.find(t=>t.date===e)??null;function Ot({source:e,lat:t=null,lon:n=null,placeLabel:r=``}){I.settings.weather={enabled:!0,source:e,lat:t,lon:n,placeLabel:r,consentAt:Me(),updatedAt:Me()},L()}function kt(){I.settings.weather={...De().settings.weather},L()}function At(){let e=N(),t=I.weatherDays.filter(t=>t.date<=e&&(!t.forecast||t.date===e)).map(e=>e.date);return t.length?t.reduce((e,t)=>e>t?e:t):null}function jt(e,t=null){let n=new Map(I.weatherDays.map(e=>[e.date,e]));for(let t of e){let e=n.get(t.date);n.set(t.date,e?{...e,...t,updatedAt:Me()}:Ne(t))}I.weatherDays=[...n.values()],I.settings.weather={...I.settings.weather,...t??{},updatedAt:Me()},L()}var Mt=e=>I.healthDays.find(t=>t.date===e)??null;function Nt({provider:e,types:t}){I.settings.health={connected:!0,provider:e,types:t,consentAt:Me(),lastSyncAt:null},L()}function Pt(){I.settings.health={...De().settings.health},L()}function Ft(e){I.settings.health={...I.settings.health,types:e},L()}function It({sleepLogs:e=[],healthDays:t=[]}){for(let t of e){let e=bt(t.date);(!e||e.source!==`manual`||Ht(e))&&(e&&!Ht(e)?Object.assign(e,t,{updatedAt:Me()}):(e&&(I.sleepLogs=I.sleepLogs.filter(t=>t!==e)),I.sleepLogs.push(Ne({quality:null,note:``,...t}))))}for(let e of t){let t=Mt(e.date);t?Object.assign(t,e,{updatedAt:Me()}):I.healthDays.push(Ne(e))}I.settings.health={...I.settings.health,lastSyncAt:Me()},L()}function Lt(e){I.settings.forecast={...I.settings.forecast,...e},L()}var Rt=()=>I;function zt(e){return{episodes:I.episodes.filter(t=>N(t.startedAt)===e).sort(Pe(`startedAt`)),symptomLogs:I.symptomLogs.filter(t=>N(t.occurredAt)===e).sort(Pe(`occurredAt`)),intakes:I.medicationIntakes.filter(t=>N(t.takenAt)===e).sort(Pe(`takenAt`)),sleep:bt(e),period:vt(e)}}function Bt(e=new Date){let t=zt(N(e)),n=lt();return n&&!t.episodes.includes(n)&&t.episodes.unshift(n),t}var Vt=[`medications`,`episodes`,`symptomLogs`,`medicationIntakes`,`sleepLogs`,`cycleEntries`],Ht=e=>String(e.id).startsWith(`demo-`);function Ut(){I.settings.name!==`Simona`||I.settings.nameSetAt||(I.settings={...I.settings,name:``},L())}function Wt({records:e}){for(let t of Vt)I[t]=[...I[t].filter(e=>!Ht(e)),...e[t]];I.settings={...I.settings,demoSeededAt:N(),demoEnabled:!0},Ut(),L()}function Gt(){for(let e of Vt)I[e]=I[e].filter(e=>!Ht(e));I.medicationIntakes=I.medicationIntakes.filter(e=>!String(e.medicationId).startsWith(`demo-`)),I.settings={...I.settings,demoEnabled:!1},L()}function Kt(){ge(),I=De()}var qt;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(qt||={});var Jt=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},Yt=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,Xt=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?Yt(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),p=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new Jt(`"${e}" plugin is not implemented on ${c}`,qt.Unimplemented)},m=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=p(i,t);if(a){let e=a(...r);return n=e?.remove,e}throw new Jt(`"${e}.${t}()" is not implemented on ${c}`,qt.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,"name",{value:t,writable:!1,configurable:!1}),r},h=m(`addListener`),g=m(`removeListener`),_=(e,t)=>{let n=h({eventName:e},t),r=async()=>{let r=await n;g({eventName:e,callbackId:r},t)},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},v=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?_:h;case`removeListener`:return g;default:return m(t)}}});return r[e]=v,l.set(e,{name:e,proxy:v,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),v},n.Exception=Jt,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},Zt=(e=>e.Capacitor=Xt(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),Qt=Zt.registerPlugin,$t=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new Zt.Exception(e,qt.Unimplemented)}unavailable(e=`not available`){return new Zt.Exception(e,qt.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},en=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),tn=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),nn=class extends $t{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=tn(n).trim(),r=tn(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=en(e.key),n=en(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};Qt(`CapacitorCookies`,{web:()=>new nn});var rn=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),an=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},on=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,sn=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=an(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},cn=class extends $t{async request(e){let t=sn(e,e.webFetchExtra),n=on(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await rn(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};Qt(`CapacitorHttp`,{web:()=>new cn});var ln;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(ln||={});var un;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(un||={});var dn=class extends $t{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};Qt(`SystemBars`,{web:()=>new dn});var fn=`https://api.open-meteo.com/v1/forecast`,pn=`https://archive-api.open-meteo.com/v1/archive`,mn=`pressure_msl,relative_humidity_2m`,hn=`weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum`,gn=7,_n=36e5,vn=864e5,yn=e=>Math.round(e*10)/10;function bn(e){return e<=1?`clear`:e===2?`partly`:e===3?`cloudy`:e===45||e===48?`fog`:e>=71&&e<=77||e===85||e===86?`snow`:e>=95?`storm`:`rain`}function xn(){return new Promise((e,t)=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(({coords:t})=>e({lat:yn(t.latitude),lon:yn(t.longitude)}),e=>t(Error(e.code===e.PERMISSION_DENIED?`denied`:`unavailable`)),{enableHighAccuracy:!1,maximumAge:6e5,timeout:15e3}):t(Error(`unavailable`))})}async function Sn({lat:e,lon:t}){try{if(Zt.isNativePlatform()||(await navigator.permissions?.query({name:`geolocation`}))?.state===`granted`)return await xn()}catch{}return{lat:e,lon:t}}var Cn=e=>e.reduce((e,t)=>e+t,0)/e.length,wn=e=>Math.round(e*10)/10;function Tn(e,t=N()){let{hourly:n,daily:r}=e,i=new Map,a=new Map;n.time.forEach((e,t)=>{let r=e.slice(0,10);n.pressure_msl[t]!=null&&i.set(r,[...i.get(r)??[],n.pressure_msl[t]]),n.relative_humidity_2m[t]!=null&&a.set(r,[...a.get(r)??[],n.relative_humidity_2m[t]])});let o=[];return r.time.forEach((e,n)=>{let s=r.temperature_2m_max[n],c=r.temperature_2m_min[n],l=r.weather_code[n];i.has(e)&&s!=null&&c!=null&&l!=null&&o.push({date:e,pressure:wn(Cn(i.get(e))),pressureChange:null,tempMin:Math.round(c),tempMax:Math.round(s),humidity:a.has(e)?Math.round(Cn(a.get(e))):null,precipitation:r.precipitation_sum[n]??0,condition:bn(l),forecast:e>t,source:`open_meteo`})}),o}async function En(e,t){let n=await fetch(`${e}?${new URLSearchParams(t)}`);if(!n.ok)throw Error(`network`);return Tn(await n.json())}function Dn(e,t,n){let r=new Map;for(let t of e)for(let e of t)r.set(e.date,e);let i=[...r.values()].sort((e,t)=>e.date.localeCompare(t.date)).filter(e=>e.date>=t);return i.map((e,t)=>{let r=t?i[t-1]:null,a=r&&N(F(P(r.date),1))===e.date?r.pressure:n(e.date);return{...e,pressureChange:a==null?null:wn(e.pressure-a)}})}async function On({lat:e,lon:t}){let n=new Date,r=At()??N(F(n,-365)),i={latitude:String(e),longitude:String(t),hourly:mn,daily:hn,timezone:`auto`},a=[];if(r<N(F(n,-40)))try{a.push(await En(pn,{...i,start_date:r,end_date:N(F(n,-1))}))}catch{}return a.push(await En(fn,{...i,past_days:`45`,forecast_days:String(gn)})),Dn(a,r,e=>Dt(N(F(P(e),-1)))?.pressure??null)}async function kn(){let e=await xn();return{position:e,days:await On(e)}}async function An(){let e=R().weather;if(!e.enabled||e.lat==null||e.updatedAt&&Date.now()-new Date(e.updatedAt).getTime()<_n)return!1;try{let t=await Sn(e);return jt(await On(t),t),!0}catch{return!1}}function jn(){let{enabled:e,updatedAt:t}=R().weather;return e&&!!t&&Date.now()-new Date(t).getTime()<vn}var Mn=`modulepreload`,Nn=function(e,t){return new URL(e,t).href},Pn={},Fn=function(e){return e.pathname.endsWith(`.css`)},In=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},Ln=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Nn(t,n);let r=s(t),i=Fn(r);return In(Pn,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Mn,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Rn=Qt(`Health`,{web:()=>Ln(()=>import(`./web-BVQ3pV5y.js`).then(e=>new e.HealthWeb),[],import.meta.url)}),zn=365,Bn=56,Vn=[2,9,16,24,33,41,50],Hn=[{key:`betahistine`,name:`Betahistín`,type:`preventive`,dose:`24 mg`,frequency:`2× denne`,since:95},{key:`magnesium`,name:`Magnézium`,type:`preventive`,dose:`300 mg`,frequency:`1× denne večer`,since:60},{key:`ibuprofen`,name:`Ibuprofén`,type:`acute`,dose:`400 mg`,frequency:`podľa potreby`},{key:`dimenhydrinate`,name:`Dimenhydrinát`,type:`acute`,dose:`50 mg`,frequency:`pri nevoľnosti`}],Un=[`Začalo v obchode pri regáloch, pomohlo ľahnúť si do tmy.`,`Celý deň pri počítači, večer sa to rozbehlo.`,`Pred tým som zle spala.`,``,``],Wn=[[`dizziness`,2,4],[`brain_fog`,2,4],[`fatigue`,3,4],[`unsteadiness`,2,4],[`tinnitus`,1,3],[`ear_pressure`,2,3],[`rocking`,2,4],[`floating`,2,3],[`headache`,2,4]],Gn=[`weather_change`,`stress`,`screen_time`,`skipped_meal`,`visual_stimulation`,`dehydration`,`bright_light`,`neck_pain`,`long_sleep`],Kn=[7,9,11,13,14,15,16,16,17,17,18,18,19,20,21];function qn(e){return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Jn(e){let t=[];for(let n=20;n<zn;){for(let e=0;e<4;e++)t.push(n-e);n+=n===20?28:27+Math.floor(e()*4)}return t}function Yn(e=new Date){let t=qn(20261019),n=(e,n)=>Math.round(e+t()*(n-e)),r=e=>t()<e,i=e=>e[Math.floor(t()*e.length)],a=0,o=e=>`demo-${e}-${++a}`,s=(t,n,r=0)=>{let i=F(e,-t);return i.setHours(n,r,0,0),i<=e?i:null},c=(e,t)=>new Date(e.getTime()+t*6e4),l=e=>({createdAt:e.toISOString(),updatedAt:e.toISOString()}),u=t=>N(F(e,-t)),d=Hn.map(t=>{let n=F(e,-(t.since??90));return{id:`demo-med-${t.key}`,...l(n),name:t.name,type:t.type,dose:t.dose,frequency:t.frequency,note:``,startDate:t.since?N(n):null,endDate:null}}),f=e=>d.find(t=>t.id===`demo-med-${e}`),p=qn(20261102),m=qn(20261103),h=e=>p()<e,g=(e,t)=>Math.round(e+p()*(t-e)),_=Jn(m),v=e=>_.some(t=>Math.abs(t-e)<=1),y=new Map;for(let e=0;e<zn;e++){if(e>3&&!h(.88))continue;let t=Vn.includes(e)?h(.6):h(e<Bn?.08:.14);y.set(e,t?g(60,71)*5:g(74,100)*5)}let b=[];for(let e=364;e>=Bn;e--){if(b.at(-1)===e+1)continue;let t=(y.get(e)??450)<360,n=.07;t&&(n+=.25),v(e)&&(n+=.12),e>95&&(n*=1.25),m()<n&&b.push(e)}let x=[...b,...[...Vn].reverse()],S=[],C=qn(20261026),w=e=>e[Math.floor(C()*e.length)],T=(e,t)=>[...new Set(Array.from({length:1+Math.floor(C()*t)},()=>w(e)))],E=e=>({type:w([`vestibular`,`vestibular`,`vestibular`,`migraine_no_headache`,`migraine_headache`]),helped:e,relief:T([`rest`,`sleep`,`dark_room`,`dark_room`,`hydration`,`relaxation`,`cold_compress`,`shower`],2),impact:T([`work_study`,`daily_activities`,`daily_activities`,`social`,`movement`,`sleep`,`rest`],2)}),D=[],O=[],k=[],A=(e,t,{effect:n=null,episodeId:r=null}={})=>{t&&O.push({id:o(`intake`),...l(t),medicationId:e.id,takenAt:t.toISOString(),dose:e.dose,effect:n,note:``,episodeId:r})},j=(e,t,n={})=>{e&&D.push({id:o(`log`),...l(e),occurredAt:e.toISOString(),symptoms:t,vertigoType:null,duration:null,note:``,episodeId:null,...n})};for(let t of x){let a=s(t,t<Bn?n(13,19):i(Kn),i([0,15,30,45]));if(!a)continue;let u=n(18,66)*5,d=c(a,u),p=n(5,8),m=new Set([i(Gn)]);r(.45)&&m.add(i(Gn)),(y.get(t)??450)<360&&r(.7)&&m.add(`poor_sleep`),v(t)&&m.add(`menstrual_cycle`);let h=o(`episode`),g={id:h,...l(a),startedAt:a.toISOString(),endedAt:d<=e?d.toISOString():null,type:null,intensity:p,symptoms:[],vertigoTypes:[],triggers:[...m],triggerOther:``,medicationIntakeIds:[],helped:null,relief:[],impact:[],note:``};S.push(g);let _=n(3,6),b=[{key:`vertigo`,intensity:p},{key:`nausea`,intensity:_}];r(.6)&&b.push(i([{key:`light_sensitivity`,intensity:n(3,6)},{key:`headache`,intensity:n(3,7)},{key:`sound_sensitivity`,intensity:n(2,5)}])),j(c(a,10),b,{episodeId:h,duration:u<180?`1_3h`:u<360?`3_6h`:`6_12h`,note:i(Un)}),r(.4)&&d<=e&&j(c(d,-20),[{key:`fatigue`,intensity:n(4,6)},{key:`brain_fog`,intensity:n(3,5)}],{episodeId:h});let x=i([`helped`,`partly`,`helped`,`not_helped`,`partly`]);A(f(_>=4?`dimenhydrinate`:`ibuprofen`),c(a,35),{effect:x,episodeId:h}),t!==Vn[0]&&Object.assign(g,E(x))}for(let t=0;t<zn;t++){let a=u(t),d=x.includes(t),p=y.get(t);if(p!=null){let n=p>=430?r(.85)?`good`:`fair`:p>=380?`fair`:`poor`,i=F(e,-t);i.setHours(6,30,0,0),k.push({id:o(`sleep`),...l(i<=e?i:e),date:a,minutes:p,quality:n,note:``,bedtime:null,wakeTime:null,source:`manual`,externalId:null})}if(t===0)j(s(0,9,15)??c(e,-20),[{key:`brain_fog`,intensity:3},{key:`fatigue`,intensity:4}]);else if(!d&&r(.32)){let e=r(.35)?2:1,a=[];for(;a.length<e;){let[e,t,o]=i(Wn);a.some(t=>t.key===e)||a.push({key:e,intensity:r(.8)?n(t,o):null})}j(s(t,n(8,20),i([0,10,20,30,40,50])),a,{duration:r(.6)?i([`moment`,`under_1h`,`under_1h`,`1_3h`]):null})}t<95&&r(.65)&&A(f(`betahistine`),s(t,8,n(0,40))),t<95&&r(.35)&&A(f(`betahistine`),s(t,20,n(0,30))),t<60&&r(.4)&&A(f(`magnesium`),s(t,21,n(0,30)))}return{records:{medications:d,episodes:S,symptomLogs:D,medicationIntakes:O,sleepLogs:k,cycleEntries:_.map(t=>({id:o(`cycle`),date:u(t),type:`period`,createdAt:F(e,-t).toISOString()}))}}}var Xn={sk:{app:{name:`Vestie`,logo:`Vestie – Vestibulárna migréna`},common:{continue:`Pokračovať`,skip:`Preskočiť`,back:`Späť`,save:`Uložiť`,cancel:`Zrušiť`,close:`Zavrieť`,yes:`Áno`,undo:`Vrátiť`,optional:`nepovinné`,on:`Zapnuté`,off:`Vypnuté`,stepOf:`Krok {step} z {total}`,edit:`Upraviť`,delete:`Vymazať`},language:{title:`Vyber si jazyk`,sk:`Slovenčina`,en:`English`},welcome:{title:`Tvoj denník príznakov`,text:`Zapisuj príznaky, epizódy, lieky a spánok. Appka ich zoradí do kalendára a prehľadov a pripraví report, ktorý môžeš ukázať lekárovi.`,cta:`Začať`},goals:{title:`S čím ti môže aplikácia pomôcť?`,lead:`Vyber, čo je pre teba dôležité. Môžeš zvoliť viac možností alebo pokračovať bez výberu.`,options:{symptoms:`Zaznamenávať príznaky`,triggers:`Zaznamenávať možné spúšťače`,patterns:`Porozumieť svojim ťažkostiam`,doctor:`Pripraviť prehľad pre lekára`}},condition:{title:`Čo chceš sledovať?`,lead:`Výber slúži len na prispôsobenie obsahu, nejde o diagnózu. Môžeš ho kedykoľvek zmeniť.`,options:{vestibular_migraine:`Vestibulárna migréna`,migraine:`Migréna`,other_vestibular:`Iné vestibulárne ochorenie`,unsure:`Nie som si istý/istá`}},cycle:{title:`Chceš sledovať menštruačný cyklus?`,lead:`Táto funkcia je voliteľná. Neskôr ju môžeš zapnúť alebo vypnúť v nastaveniach.`,yes:`Áno`,no:`Nie`},medications:{title:`Chceš pridať svoje lieky?`,lead:`Môžeš pridať lieky, ktoré užívaš preventívne alebo pri akútnych ťažkostiach. Tento krok môžeš vynechať a lieky pridať neskôr.`,add:`Pridať lieky`,addAnother:`Pridať ďalší liek`,added:`Pridané lieky`,remove:`Odstrániť liek {name}`,disclaimer:`Aplikácia neodporúča dávkovanie ani nemení tvoju liečbu.`,types:{preventive:`Preventívny`,acute:`Akútny`}},medForm:{title:`Nový liek`,name:`Názov lieku`,namePlaceholder:`napr. Betahistín`,nameRequired:`Zadaj názov lieku.`,type:`Typ lieku`,dose:`Dávka`,dosePlaceholder:`napr. 24 mg`,frequency:`Frekvencia`,frequencyPlaceholder:`napr. 2× denne`,note:`Poznámka`,submit:`Uložiť liek`,saved:`Liek {name} bol pridaný`,startDate:`Začiatok užívania`,startDateHint:`Pomôže porovnať záznamy pred liekom a po ňom.`},reminders:{title:`Chceš si nastaviť pripomienku?`,lead:`Každý deň ti v čase, ktorý si zvolíš, pripomenieme, aby si si zaznamenal/a svoje príznaky a to, ako sa cítiš.`,yes:`Áno`,no:`Nie, zatiaľ nie`,time:`Kedy ti ju máme pripomenúť?`,permission:`Telefón ťa potom požiada o povolenie posielať upozornenia. Pripomienku môžeš kedykoľvek vypnúť v profile.`},today:{greeting:`Ahoj`,greetingName:`Ahoj, {name}`,howAreYou:`Ako sa dnes cítiš?`,noEntries:`Dnes zatiaľ nemáš zaznamenané žiadne príznaky.`,loggedToday:`Dnes zaznamenané`,addSymptom:`Pridať príznak`,startEpisode:`Spustiť epizódu`,overview:`Dnes`,sleep:`Spánok`,meds:`Lieky`,nothingYet:`Zatiaľ nič`,entriesEmpty:`Zatiaľ tu nič nie je. Príznak pridáš tlačidlom vyššie, epizódu spustíš v strede spodného menu.`,symptomsToday:`Dnes zaznamenané príznaky`,intakeTitle:`Liek`,logIntake:`Zaznamenať liek`,pressure:`Tlak`,steps:`Kroky`,turnOn:`Zapnúť`,connect:`Prepojiť`,mobileOnly:`V mobilnej appke`},episode:{title:`Epizóda`,ongoing:`Prebieha epizóda`,statusOngoing:`Prebieha`,statusEnded:`Ukončená`,started:`Epizóda bola spustená`,startedAt:`Začiatok`,endedAt:`Koniec`,duration:`Trvanie`,since:`od {time}`,lasting:`trvá {duration}`,detailsLater:`Podrobnosti môžeš doplniť teraz alebo kedykoľvek neskôr. Epizóda zostane uložená, aj keď aplikáciu zavrieš.`,addDetails:`Pridať podrobnosti`,finishLater:`Dokončiť neskôr`,end:`Ukončiť epizódu`,endedToast:`Epizóda bola ukončená`,mistake:`Spustená omylom?`,cancel:`Zrušiť epizódu`,cancelledToast:`Epizóda bola zrušená`,delete:`Vymazať epizódu`,deleteTitle:`Vymazať epizódu?`,deleteText:`Záznam sa natrvalo odstráni z tohto zariadenia.`,deletedToast:`Epizóda bola vymazaná`,notFound:`Táto epizóda už neexistuje.`,linkedSymptoms:`Príznaky zaznamenané počas epizódy`,linkedIntakes:`Lieky užité počas epizódy`,editDetails:`Upraviť podrobnosti`,saveLater:`Uložiť a doplniť neskôr`,savedLater:`Epizóda je uložená. Podrobnosti doplníš kedykoľvek v jej detaile.`,details:`Podrobnosti`},duration:{underMinute:`menej ako minúta`,minutes:`{m} min`,hours:`{h} h`,hoursMinutes:`{h} h {m} min`},nav:{label:`Hlavná navigácia`,today:`Domov`,calendar:`Kalendár`,insights:`Prehľady`,treatment:`Liečba`,profile:`Profil`,startEpisode:`Spustiť epizódu`},profile:{title:`Profil`,me:`Môj profil`,name:`Meno`,namePlaceholder:`Nepovinné`,nameHint:`Použijeme ho iba na pozdrav na domovskej obrazovke.`,language:`Jazyk`,tracking:`Sledovanie`,cycle:`Menštruačný cyklus`,reminders:`Denná pripomienka`,reminderTime:`Čas pripomienky`,display:`Zobrazenie`,reduceMotion:`Obmedziť animácie`,reduceMotionHint:`Vhodné pri citlivosti na pohyb. Ak máš obmedzenie pohybu zapnuté v telefóne, animácie sú vypnuté automaticky.`,privacy:`Súkromie`,deleteAll:`Vymazať všetky dáta`,deleteAllTitle:`Vymazať všetky dáta?`,deleteAllText:`Odstránia sa všetky záznamy, lieky a nastavenia v tomto zariadení. Túto akciu nie je možné vrátiť.`,deleteAllConfirm:`Áno, vymazať`,dev:`Pre vývoj`,styleguide:`Dizajn systém`,saved:`Uložené`,disclaimer:`Aplikácia slúži na osobné zaznamenávanie. Neposkytuje diagnózu ani liečbu a nenahrádza konzultáciu s lekárom.`,integrations:`Prepojenia`,health:`Smart hodinky a zdravotné údaje`,healthHint:`Spánok, kroky a pulz z Apple Zdravia alebo Health Connect, aj z tvojich hodiniek.`,comingSoon:`Pripravujeme`,demoReset:`Obnoviť ukážkové dáta`,demoResetTitle:`Obnoviť ukážkové dáta?`,demoResetText:`Ukážkové záznamy za posledný rok sa vrátia do pôvodného stavu. Tvoje vlastné záznamy zostanú.`,demoResetConfirm:`Obnoviť`,demoResetDone:`Ukážkové dáta sú obnovené`,onboardingAgain:`Prejsť úvodom znova`,logout:`Odhlásiť sa`,logoutNoPinTitle:`Najprv si nastav PIN`,logoutNoPinText:`Bez PIN-u by sa do appky po odhlásení dostal ktokoľvek s tvojím telefónom. Po nastavení PIN-u ťa hneď odhlásime.`,logoutNoPinConfirm:`Nastaviť PIN`,appearance:`Vzhľad`,themes:{light:`Svetlý`,dark:`Tmavý`,system:`Podľa telefónu`},demoSection:`Ukážka appky`,demoFill:`Vyplnená appka`,demoFillHint:`Vypni a uvidíš prázdnu appku ako nový človek.`,demoFillOn:`Ukážkové dáta sú zapnuté`,demoFillOff:`Ukážkové dáta sú vypnuté, appka je prázdna`,weatherHint:`Tlak a počasie podľa polohy sa zapisujú každý deň.`,demoPlus:`Vestie+ zapnuté`,demoPlusHint:`Prepni a uvidíš appku s predplatným alebo bez neho.`,plusActive:`Moje Vestie+`,plusTry:`Vyskúšať Vestie+`,plusHint:`Počasie a tlak, výhľad rizika, hľadač spúšťačov a ďalšie.`},symptoms:{dizziness:`Závrat`,vertigo:`Vertigo`,rocking:`Hojdanie / kolísanie`,floating:`Pocit vznášania`,unsteadiness:`Nestabilita / neistota pri chôdzi`,nausea:`Nevoľnosť`,vomiting:`Vracanie`,light_sensitivity:`Citlivosť na svetlo`,sound_sensitivity:`Citlivosť na zvuk`,visual_sensitivity:`Vizuálna citlivosť`,tinnitus:`Tinnitus / pískanie v ušiach`,ear_pressure:`Tlak v ušiach`,headache:`Bolesť hlavy`,brain_fog:`Mozgová hmla`,fatigue:`Únava`,unknown:`Neznámy príznak`},durations:{just_started:`Práve začali`,under_1h:`Menej ako 1 hodinu`,"1_3h":`1–3 hodiny`,"3_6h":`3–6 hodín`,"6_12h":`6–12 hodín`,over_12h:`Viac ako 12 hodín`,ongoing:`Stále pretrvávajú`,moment:`Chvíľu (sekundy až minúty)`},triggers:{poor_sleep:`Nekvalitný / krátky spánok`,stress:`Stres`,skipped_meal:`Vynechané jedlo`,dehydration:`Dehydratácia`,caffeine:`Kofeín`,alcohol:`Alkohol`,exertion:`Fyzická námaha`,illness:`Choroba / infekcia`,visual_stimulation:`Vizuálna stimulácia`,screen_time:`Dlhý čas pred obrazovkou`,weather_change:`Zmena počasia`,menstrual_cycle:`Menštruačný cyklus`,travel:`Cestovanie / pohyb`,other:`Iné`,long_sleep:`Príliš dlhý spánok`,bright_light:`Ostré svetlo / slnečné žiarenie`,strong_smells:`Silné pachy`,neck_pain:`Bolesť alebo napätie krku`,allergy:`Alergia`},effects:{helped:`Pomohlo`,partly:`Čiastočne`,not_helped:`Nepomohlo`,unknown:`Neviem`},intensity:{none:`žiadna`,mild:`mierna`,moderate:`stredná`,severe:`silná`,notSet:`Nezadané`,value:`{value} – {level}`,highest:`najvyššia intenzita {value}`},log:{symptomsTitle:`Aké príznaky zaznamenávaš?`,symptomsLead:`Vyber jeden alebo viac príznakov.`,search:`Hľadať príznak`,noMatch:`Žiadny príznak nezodpovedá hľadaniu. Môžeš pridať vlastný.`,custom:`Vlastný príznak`,customPlaceholder:`Napíš názov príznaku`,customAdd:`Pridať`,continueCount:`Pokračovať ({n})`,intensityTitle:`Aká silná je intenzita?`,intensityLead:`0 = žiadna, 10 = najhoršia. Posuvník začína na 5 – posuň ho podľa toho, ako sa cítiš. Ktorýkoľvek príznak môžeš vynechať.`,clear:`Vynechať`,detailsTitle:`Ako dlho tieto príznaky trvajú?`,detailsLead:`Všetko na tejto obrazovke je nepovinné.`,when:`Kedy začali`,date:`Dátum`,time:`Čas`,note:`Poznámka`,linkEpisode:`Priradiť k prebiehajúcej epizóde`,save:`Uložiť záznam`,saved:`Záznam bol uložený`,whenToday:`Dnes o {time}`,whenOn:`{date} o {time}`,changeTime:`Zmeniť čas`,clearLabel:`Vynechať intenzitu: {name}`,restore:`Zadať intenzitu`},symptomLog:{title:`Príznaky`,duration:`Trvanie`,note:`Poznámka`,episode:`Súčasť epizódy`,openEpisode:`Otvoriť epizódu`,edit:`Upraviť záznam`,delete:`Vymazať záznam`,deleteTitle:`Vymazať záznam?`,deleteText:`Záznam sa natrvalo odstráni z tohto zariadenia.`,deletedToast:`Záznam bol vymazaný`,notFound:`Tento záznam už neexistuje.`},treatment:{title:`Liečba`,lead:`Tvoje lieky, ich užívanie a ako ti podľa teba pomáhajú.`,preventive:`Preventívne`,acute:`Akútne`,add:`Pridať liek`,empty:`Zatiaľ nemáš pridané žiadne lieky.`,noneOfType:`Žiadne lieky v tejto skupine.`,lastTaken:`Naposledy {when}`,neverTaken:`Zatiaľ bez záznamu užitia`,disclaimer:`Aplikácia nepredpisuje lieky ani nenavrhuje zmenu dávkovania. O liečbe sa rozhoduj so svojím lekárom.`,type:`Typ`,dose:`Dávka`,frequency:`Frekvencia`,note:`Poznámka`,logIntake:`Zaznamenať užitie`,history:`História užitia`,historyEmpty:`Zatiaľ tu nie je žiadne užitie.`,taken:`Užité`,effectSummary:`Účinok podľa teba`,edit:`Upraviť liek`,delete:`Odstrániť liek`,deleteTitle:`Odstrániť liek?`,deleteText:`Odstráni sa liek aj celá história jeho užitia.`,deletedToast:`Liek bol odstránený`,notFound:`Tento liek už neexistuje.`,inEpisode:`počas epizódy`,effectMissing:`účinok nezadaný`,showAll:`Zobraziť celú históriu ({n})`,hint:`Kliknutím na liek môžeš zaznamenať jeho užitie a sledovať, ako ti pomáha.`},intake:{title:`Užitie lieku`,editTitle:`Upraviť užitie`,date:`Dátum`,time:`Čas`,dose:`Dávka`,effect:`Pomohlo to?`,effectHint:`Ak ešte nevieš, doplň to neskôr.`,note:`Poznámka`,save:`Uložiť užitie`,saved:`Užitie bolo uložené`,delete:`Vymazať užitie`,deleteTitle:`Vymazať užitie?`,deleteText:`Záznam o užití sa natrvalo odstráni.`,deletedToast:`Užitie bolo vymazané`,notFound:`Tento záznam už neexistuje.`},calendar:{title:`Kalendár`,prev:`Predchádzajúci mesiac`,next:`Nasledujúci mesiac`,backToday:`Dnes`,legend:`Vysvetlivky`,legendPeriod:`Menštruácia`,dayEmpty:`V tento deň nemáš žiadne záznamy.`,addSymptom:`Pridať príznak`,period:`Menštruácia`,periodMark:`Zaznamenať menštruáciu v tento deň`,summaryEntries:`počet záznamov {n}`,summaryPeriod:`menštruácia`,summaryNone:`bez záznamov`,selected:`vybraný deň`,today:`dnes`,legendEpisode:`Deň s epizódou`,legendSymptoms:`Zaznamenané príznaky`,summaryEpisode:`epizóda`},insights:{title:`Prehľady`,periodLabel:`Obdobie`,empty:`Prehľad sa skladá z tvojich záznamov. Keď budeš mať zapísané príznaky z viacerých dní, uvidíš tu, čo sa opakuje.`,overview:`Súhrn`,symptomDays:`Dni s príznakmi`,episodes:`Epizódy`,avgIntensity:`Priemerná intenzita`,avgDuration:`Priemerné trvanie epizódy`,noValue:`nezadané`,topSymptoms:`Najčastejšie príznaky`,topSymptomsLead:`Počet záznamov, v ktorých sa príznak objavil.`,topTriggers:`Najčastejšie možné spúšťače`,triggersEmpty:`Zatiaľ tu nie sú žiadne možné spúšťače. Pribudnú s podrobnosťami epizódy.`,meds:`Lieky`,medsEmpty:`V tomto období nie je zaznamenané žiadne užitie lieku.`,interpretation:`Zaznamenaná súvislosť nie je dôkazom príčiny. Prehľad počíta iba so zadanými údajmi.`,report:`Vytvoriť report pre lekára`},report:{title:`Report pre lekára`,lead:`Vyber obdobie. Report zhrnie tvoje záznamy do prehľadu, ktorý môžeš ukázať lekárovi.`,custom:`Vlastné obdobie`,from:`Od`,to:`Do`,create:`Vytvoriť report`,invalidRange:`Dátum „Od“ musí byť skôr alebo v ten istý deň ako „Do“.`,docTitle:`Zaznamenané príznaky a liečba`,period:`Obdobie`,created:`Vytvorené`,disclaimer:`Údaje zaznamenal používateľ v aplikácii Vestie. Nejde o diagnózu ani lekársky záznam.`,fewData:`V tomto období je zaznamenaných málo údajov, prehľad nemusí byť reprezentatívny.`,summary:`Súhrn`,symptoms:`Najčastejšie príznaky`,triggers:`Zaznamenané možné spúšťače`,meds:`Lieky a účinok podľa používateľa`,sleep:`Spánok`,sleepNone:`V tomto období nebol zaznamenaný spánok.`,cycle:`Menštruačný cyklus`,cycleDays:`Zaznamenané dni menštruácie`,notes:`Poznámky`,timeline:`Časová os`,colDate:`Dátum a čas`,colEntry:`Záznam`,colDetail:`Podrobnosti`,none:`Bez záznamov.`,print:`Uložiť ako PDF`,printHint:`V okne tlače zvoľ „Uložiť ako PDF“.`,sleepQuality:`Kvalita spánku`,plusHint:`S Vestie+ pribudne v reporte tlak pri epizódach, možné súvislosti a aktivita.`,weather:`Počasie a tlak pri epizódach`,weatherSummary:`Epizódy v dňoch s poklesom tlaku o 6 hPa a viac: {drops} z {total}.`,patterns:`Možné súvislosti podľa záznamov`,patternsOther:`inak {a} z {b}`,patternsNote:`Počet ťažších dní po dni s daným faktorom. Ide o možné súvislosti zo záznamov používateľa za posledný rok, nie o dôkaz príčiny.`,activity:`Aktivita`,avgSteps:`Priemerný počet krokov za deň`,avgPulse:`Priemerný pokojový pulz`},sleep:{title:`Spánok`,formTitle:`Ako sa ti spalo?`,lead:`Zaznamenaj dĺžku spánku. Kvalitu a poznámku môžeš vynechať.`,date:`Deň prebudenia`,duration:`Dĺžka spánku`,hours:`Hodiny`,minutes:`Minúty`,durationRequired:`Zadaj dĺžku spánku.`,quality:`Kvalita spánku`,qualities:{good:`Dobrá`,fair:`Priemerná`,poor:`Zlá`},note:`Poznámka`,save:`Uložiť spánok`,saved:`Spánok bol uložený`,add:`Zaznamenať spánok`,entry:`Spánok {duration}`,delete:`Vymazať záznam spánku`,deleteTitle:`Vymazať záznam spánku?`,deleteText:`Záznam sa natrvalo odstráni z tohto zariadenia.`,deletedToast:`Záznam spánku bol vymazaný`,avg:`Priemerný spánok`,nights:`Zaznamenané noci`},consent:{title:`Tvoje údaje zostávajú v tvojom telefóne`,lead:`Skôr než začneš, pozri sa, ako s tvojimi údajmi zaobchádzame.`,factDevice:`Záznamy o zdraví sa ukladajú iba v tomto telefóne.`,factNoServer:`Appka nemá účet na internete, záznamy o zdraví nikam neodosiela a nepoužíva reklamy ani analytické nástroje.`,factPin:`Prihlasovať sa budeš PIN kódom a tvoje údaje budú zašifrované.`,factControl:`Údaje môžeš kedykoľvek exportovať do súboru alebo natrvalo vymazať.`,health:`Súhlasím so spracovaním mojich údajov o zdraví v tomto telefóne na účely osobného sledovania.`,age:`Mám aspoň 16 rokov.`,policyLink:`Prečítať zásady ochrany súkromia`,submit:`Súhlasím a pokračujem`},privacyPolicy:{title:`Zásady ochrany súkromia`,draft:`Návrh`,version:`Verzia {version}`,draftNote:`Pracovný návrh na pripomienkovanie. Pred vydaním ho skontroluje právnik a doplnia sa údaje prevádzkovateľa.`,controllerTitle:`Kto je prevádzkovateľ`,controllerText:`[Názov prevádzkovateľa, sídlo, IČO – doplniť]. Kontakt pre otázky o osobných údajoch: [e-mail – doplniť].`,dataTitle:`Aké údaje appka spracúva`,dataText:`Iba to, čo do nej zadáš: príznaky a ich intenzitu, epizódy, lieky a ich účinok, spánok, voliteľne menštruačný cyklus a meno na pozdrav. S Vestie+ aj počasie a tlak podľa približnej polohy a údaje zo zdravotných appiek, ak si to zapneš. Ide o údaje o zdraví, preto ich chránime osobitne.`,storageTitle:`Kde sú tvoje údaje`,storageText:`Iba v tomto telefóne. Appka nemá server ani účet na internete, záznamy o zdraví nikam neodosiela a nepoužíva reklamné ani analytické nástroje. Prevádzkovateľ k tvojim údajom nemá prístup.`,purposeTitle:`Na čo slúžia`,purposeText:`Na tvoje osobné sledovanie ťažkostí a na prehľad alebo report, ktorý môžeš ukázať lekárovi. Report sa vytvorí v telefóne a ty rozhodneš, komu ho dáš.`,legalTitle:`Na akom základe`,legalText:`Na základe tvojho výslovného súhlasu so spracovaním údajov o zdraví (čl. 9 ods. 2 písm. a) GDPR). Súhlas môžeš kedykoľvek odvolať v Profile – údaje sa tým vymažú.`,rightsTitle:`Tvoje práva`,rightsText:`Údaje si môžeš kedykoľvek pozrieť, upraviť, exportovať do súboru alebo natrvalo vymazať priamo v appke (Profil → Súkromie). Máš aj právo podať sťažnosť na Úrad na ochranu osobných údajov SR.`,securityTitle:`Zabezpečenie`,securityText:`Do appky sa prihlasuješ 6-miestnym PIN-om. Kým je PIN zapnutý, všetky údaje v telefóne sú zašifrované (AES-256) a bez neho sa k nim nedá dostať. Ak PIN zabudneš, údaje nie je možné obnoviť.`,backupTitle:`Zálohovanie`,backupText:`Keďže údaje sú iba v telefóne, pri strate alebo výmene telefónu sa stratia, ak si ich predtým neexportuješ.`,ageTitle:`Vek`,ageText:`Appka je určená pre ľudí od 16 rokov.`,changesTitle:`Zmeny zásad`,changesText:`O zmenách týchto zásad ťa upozorníme priamo v appke.`,weatherTitle:`Počasie a tlak (Vestie+)`,weatherText:`Ak si túto funkciu zapneš, appka pošle poskytovateľovi počasia (zatiaľ Open-Meteo) polohu zaokrúhlenú na približne 10 km, aby získala skutočné počasie a tlak. Robí to vždy, keď appku otvoríš, aby boli údaje aktuálne. Poskytovateľ pritom vidí aj IP adresu, ako pri každej požiadavke na internet. Nič o tvojom zdraví sa neodosiela. Funkciu môžeš kedykoľvek vypnúť.`,healthTitle:`Prepojenie so zdravím (Vestie+)`,healthText:`Ak prepojíš Apple Zdravie alebo Health Connect, appka načíta vybrané údaje (spánok, kroky, pokojový pulz) do tohto telefónu. Nikam ich neodosiela a prepojenie môžeš kedykoľvek zrušiť.`,purchasesTitle:`Predplatné`,purchasesText:`Platbu vybavuje Apple alebo Google podľa svojich podmienok. Appka sa od nich dozvie iba to, či je predplatné aktívne.`},profileSetup:{title:`Vytvor si profil`,lead:`Profil existuje iba v tomto telefóne – bez e-mailu a hesla na internete. Prihlasovať sa budeš PIN kódom.`,pinTitle:`Prihlasovací PIN`,pinText:`V ďalšom kroku si nastavíš 6-miestny PIN. Budeš sa ním prihlasovať a zároveň zašifruje tvoje údaje v telefóne.`,nameLabel:`Ako ťa máme oslovovať?`,namePlaceholder:`Tvoje meno`,nameHint:`Nepovinné. Uvidíš ho v pozdrave na domovskej obrazovke.`,pinAlready:`PIN už máš nastavený. Zmeniť ho môžeš v Profile → Zabezpečenie.`},pin:{progress:`Zadané {n} z {total} číslic`,keypad:`Klávesnica na PIN`,delete:`Zmazať číslicu`,prompt:{current:`Zadaj svoj súčasný PIN`,new:`Zvoľ si 6-miestny PIN`,confirm:`Zopakuj PIN pre kontrolu`},title:{set:`Nastav si prihlasovací PIN`,change:`Zmena PIN-u`,disable:`Vypnutie PIN-u`},setLead:`Budeš sa ním prihlasovať a zároveň zašifruje tvoje údaje v telefóne. Ak ho zabudneš, údaje nie je možné obnoviť – nikto iný k nim nemá prístup.`,checking:`Overujem…`,wrong:`Nesprávny PIN. Skús to znova.`,blocked:`Príliš veľa nesprávnych pokusov. Skús to znova o {time}.`,weak:`Tento PIN sa dá ľahko uhádnuť. Zvoľ iný.`,mismatch:`PIN-y sa nezhodujú. Zvoľ si PIN znova.`,saving:`Šifrujem údaje…`,enabled:`PIN je nastavený, údaje sú zašifrované`,changed:`PIN bol zmenený`,disabled:`PIN je vypnutý`,blockedSeconds:`Príliš veľa nesprávnych pokusov. Skús to znova o {n} s.`},lock:{title:`Prihlás sa`,lead:`Zadaj svoj PIN`,forgot:`Zabudnutý PIN?`,forgotTitle:`Zabudnutý PIN`,forgotText:`PIN nie je možné obnoviť – tvoje údaje sú zašifrované iba v tomto telefóne a nikto iný k nim nemá kľúč. Môžeš ich iba vymazať a začať odznova.`,forgotConfirm:`Vymazať všetko a začať odznova`},security:{title:`Zabezpečenie`,pin:`Prihlasovanie PIN-om`,pinOnHint:`Údaje sú v telefóne zašifrované. Bez PIN-u sa k nim nedá dostať.`,pinOffHint:`Bez PIN-u sa do appky dostane ktokoľvek s tvojím telefónom a údaje nie sú zašifrované.`,changePin:`Zmeniť PIN`,autoLock:`Automaticky odhlásiť`,autoLockOptions:{m0:`Hneď po odchode z appky`,m1:`Po 1 minúte`,m5:`Po 5 minútach`,m15:`Po 15 minútach`},biometrics:`Odomykanie tvárou alebo odtlačkom`,biometricsHint:`Dostupné v mobilnej aplikácii.`},privacy:{deviceOnly:`Záznamy sú iba v tomto telefóne`,deviceOnlyHint:`Appka záznamy o zdraví nikam neodosiela a nemá k nim prístup nikto iný.`,export:`Exportovať moje údaje`,exportHint:`Stiahne všetky záznamy do súboru (JSON).`,exportDone:`Súbor s údajmi je pripravený`,consent:`Súhlas so spracovaním údajov`,consentGiven:`Udelený {date}`,withdraw:`Odvolať súhlas`,withdrawTitle:`Odvolať súhlas?`,withdrawText:`Bez súhlasu appka nemôže uchovávať tvoje údaje o zdraví. Odvolaním sa natrvalo vymažú všetky údaje v tomto telefóne.`,withdrawConfirm:`Odvolať a vymazať údaje`},plural:{entries:{one:`{n} záznam`,few:`{n} záznamy`,other:`{n} záznamov`},times:{other:`{n}×`},days:{one:`{n} deň`,few:`{n} dni`,other:`{n} dní`},episodes:{one:`{n} epizóda`,few:`{n} epizódy`,other:`{n} epizód`},hardDays:{one:`{n} ťažší deň`,few:`{n} ťažšie dni`,other:`{n} ťažších dní`}},community:{title:`Komunita a podpora`,lead:`Nemusíš na to byť osamote. V našej komunite zdieľame vlastné skúsenosti, podržíme sa a odporúčame si špecialistov.`,facebook:`Facebook skupina`,facebookHint:`Skúsenosti, otázky a vzájomná podpora`,instagram:`Instagram`,instagramHint:`@vestibularnamigrena`,discord:`Discord`,discordHint:`Rozhovory s komunitou v reálnom čase`,webTitle:`Články na našom webe`,webText:`O diagnóze, liečbe a živote s vestibulárnou migrénou.`,webUrl:`www.vestibularnamigrena.sk`,external:`(otvorí sa mimo aplikácie)`,note:`Skúsenosti a odporúčania z komunity nenahrádzajú vyšetrenie a radu lekára.`,soon:`Čoskoro`},episodeTypes:{vestibular:`Vestibulárna epizóda`,migraine_headache:`Migréna s bolesťou hlavy`,migraine_no_headache:`Migréna bez bolesti hlavy`,other:`Iné`,unsure:`Neviem`},relief:{rest:`Oddych`,sleep:`Spánok`,dark_room:`Oddych v tmavej miestnosti`,hydration:`Pitie vody`,relaxation:`Relaxácia alebo meditácia`,cold_compress:`Studený obklad`,warm_compress:`Teplý obklad`,shower:`Sprcha`,food:`Jedlo`,other:`Iné`},impact:{work_study:`Práca alebo štúdium`,sleep:`Spánok`,daily_activities:`Bežné denné činnosti`,social:`Kontakt s rodinou a priateľmi`,movement:`Pohyb a fyzické aktivity`,rest:`Oddych a relaxácia`,other:`Iné`,none:`Epizóda ma výrazne neobmedzila`},episodeFlow:{typeTitle:`Aká to bola epizóda?`,typeLead:`Všetko v podrobnostiach je nepovinné. Čo nevieš, preskoč a doplň neskôr.`,intensity:`Celková intenzita`,symptomsTitle:`Aké príznaky sa objavili?`,symptomsLead:`Vyber jeden alebo viac. Silu každého zadáš v ďalšom kroku.`,date:`Dátum`,time:`Čas`,triggersTitle:`Čo ju mohlo spustiť?`,triggersLead:`Vyber všetko, čo sa ťa týka. Ide o možné súvislosti, nie potvrdené príčiny. Môžeš vybrať viac možností.`,triggerOther:`Iný spúšťač`,triggerOtherPlaceholder:`Napíš, čo to bolo`,medsTitle:`Užil/a si počas epizódy liek?`,medsLead:`Označ lieky a kedy si ich užil/a. Užitie sa uloží aj do Liečby.`,medsLogged:`Už zaznamenané počas epizódy`,medsNone:`Zatiaľ nemáš pridané žiadne lieky.`,addMed:`Pridať liek`,medsWhen:`Kedy si ich užil/a`,medsOutside:`Čas musí byť počas epizódy.`,helped:`Pomohlo to?`,reliefTitle:`Čo ti prinieslo úľavu?`,summaryTitle:`Zhrnutie epizódy`,summaryLead:`Skontroluj, čo si vyplnil/a. Každú časť môžeš upraviť.`,summaryMissing:`Ešte môžeš doplniť`,save:`Uložiť epizódu`,saved:`Epizóda bola uložená`,edit:`Upraviť`,sections:{type:`Typ`,intensity:`Intenzita`,time:`Čas`,symptoms:`Príznaky`,triggers:`Možné spúšťače`,meds:`Lieky`,helped:`Pomohlo to?`,relief:`Úľava`,impact:`Obmedzenia`},reliefLead:`Môžeš vybrať viac možností.`,reliefOther:`Čo ešte ti pomohlo?`,reliefOtherPlaceholder:`Napíš, čo to bolo`,impactTitle:`Ako ťa epizóda obmedzila?`,impactLead:`V ktorých oblastiach každodenného života si pocítil/a jej vplyv?`,impactOther:`Čo ešte epizóda ovplyvnila?`,impactOtherPlaceholder:`Napíš, čo to bolo`},symptomInfo:{open:`Čo znamená {name}?`,close:`Rozumiem`,dizziness:`Pocit omámenia, neistoty alebo straty rovnováhy. Môžeš mať pocit, že sa ti zatočila hlava, cítiš sa na odpadnutie alebo nemáš istotu pri státí či chôdzi.`,vertigo:`Falošný pocit pohybu, hoci sa v skutočnosti nehýbeš. Môžeš mať pocit, že sa točíš ty, že sa otáča miestnosť alebo že sa okolité prostredie pohybuje.`,brain_fog:`Stav, pri ktorom máš problém sústrediť sa, jasne premýšľať alebo spracovávať informácie. Môžeš mať pocit, že ti to myslí pomalšie, ťažšie hľadáš slová alebo sa horšie orientuješ v myšlienkach.`,visual_sensitivity:`Zvýšená citlivosť na vizuálne podnety. Pohybujúce sa obrazy, rušné prostredie, vzory, davy ľudí alebo obrazovky môžu vyvolávať závrat, nevoľnosť alebo dezorientáciu.`,tinnitus:`Vnímanie zvuku v jednom alebo oboch ušiach, hoci v okolí nie je žiadny skutočný zdroj zvuku. Môže ísť o pískanie, hučanie, bzučanie alebo šumenie.`,rocking:`Pocit, akoby sa tvoje telo alebo okolie jemne hojdalo, kolísalo zo strany na stranu alebo pohybovalo dopredu a dozadu, podobne ako na lodi.`,floating:`Pocit, akoby si sa nadnášal/a, nemal/a pevný kontakt so zemou.`,unsteadiness:`Pocit neistoty pri státí alebo chôdzi, akoby si strácal/a rovnováhu, vychyľoval/a sa do strán alebo potreboval/a oporu pri pohybe.`},quickIntake:{title:`Ktorý liek si užil/a?`,lead:`Vyber liek. V ďalšom kroku zadáš čas a či ti pomohol.`,add:`Pridať nový liek`,empty:`Zatiaľ nemáš pridané žiadne lieky. Pridaj liek a potom zaznamenáš jeho užitie.`},plus:JSON.parse(`{"name":"Vestie+","lockedLabel":"Súčasť Vestie+","tryChip":"Vyskúšať","demoChip":"Ukážka","features":{"weather":{"title":"Počasie a tlak","text":"Každý deň sa zapíše počasie a barometrický tlak podľa tvojej polohy."},"forecast":{"title":"Výhľad rizika","text":"Vopred ťa upozorní na dni, keď môže byť riziko epizódy vyššie, napríklad keď hlásia prudký pokles tlaku."},"finder":{"title":"Hľadač spúšťačov","text":"Porovná dni s ťažkosťami a bez nich a ukáže možné súvislosti."},"stats":{"title":"Pokročilé štatistiky","text":"Trendy za celý rok, kedy epizódy začínajú, čo pomáha a záznamy pred liekom a po ňom."},"health":{"title":"Prepojenie so zdravím","text":"Spánok, kroky a pulz z Apple Zdravia alebo Health Connect, aj z tvojich hodiniek."},"report":{"title":"Bohatší report pre lekára","text":"Pribudne tlak pri epizódach, možné súvislosti a aktivita."}},"periods":{"d90":"90 dní","d180":"6 mesiacov","d365":"12 mesiacov"},"plans":{"yearly":{"name":"Ročne","hint":"2,50 € mesačne, prvých 7 dní zadarmo","price":"29,99 €","cta":"Vyskúšať 7 dní zadarmo","badge":"Ušetríš 37 %"},"monthly":{"name":"Mesačne","hint":"Zrušíš kedykoľvek","price":"3,99 €","cta":"Predplatiť za 3,99 € mesačne"}},"paywall":{"title":"Viac porozumenia z tvojich záznamov","lead":"Vestie+ pridáva počasie a tlak, upozornenia vopred a hlbšie súvislosti. Základný denník ostáva zadarmo.","choosePlan":"Vyber si predplatné","renewal":"Platbu vybaví App Store alebo Google Play. Predplatné sa obnovuje automaticky, kým ho nezrušíš v nastaveniach obchodu, najneskôr 24 hodín pred koncom obdobia.","freeTitle":"Zadarmo ostáva všetko, čo máš teraz","freeText":"Záznamy príznakov a epizód, kalendár, prehľady, lieky, spánok aj report pre lekára. Keď predplatné skončí, tvoje záznamy ostanú tvoje.","demoNote":"V tomto náhľade sa nič neplatí a ceny sú zatiaľ iba návrh.","restore":"Obnoviť nákup","terms":"Podmienky používania","termsText":"Podmienky používania doplníme pred vydaním appky po kontrole právnikom.","disclaimer":"Vestie+ neposkytuje diagnózu ani liečbu a nenahrádza konzultáciu s lekárom.","notNow":"Teraz nie","nativeOnly":"Nákup bude dostupný v mobilnej appke.","nothingToRestore":"Nenašli sme žiadny nákup na obnovenie."},"manage":{"title":"Tvoje Vestie+","lead":"Všetko na jednom mieste. Každú funkciu môžeš kedykoľvek zapnúť alebo vypnúť.","welcomeTitle":"Vitaj vo Vestie+","welcomeLead":"Počasie a tlak si zapni ako prvé. Ostatné funkcie nájdeš v zozname.","features":"Funkcie","subscription":"Predplatné","trialUntil":"Skúšobná doba do {date}","since":"Aktívne od {date}","cancel":"Zrušiť predplatné","cancelHint":"Tvoje záznamy ostanú v telefóne.","cancelTitle":"Zrušiť Vestie+?","cancelText":"Funkcie Vestie+ sa uzamknú. Všetky záznamy vrátane zapísaného počasia a tlaku ti ostanú.","cancelConfirm":"Zrušiť predplatné","cancelled":"Vestie+ je zrušené","toToday":"Pokračovať na Domov","enableWeather":"Zapnúť počasie a tlak"},"charts":{"legend":"Vysvetlivky grafu","showTable":"Zobraziť ako tabuľku"},"weather":{"hpa":"{value} hPa","temps":"{min} až {max} °C","changeShort":"{value} oproti predošlému dňu","conditions":{"clear":"Jasno","partly":"Polojasno","cloudy":"Oblačno","fog":"Hmla","rain":"Dážď","snow":"Sneh","storm":"Búrka"},"offLead":"Počasie a tlak môžu súvisieť s vestibulárnou migrénou. Appka si ich bude každý deň zapisovať k tvojim záznamom, aby si videl/a, či sa u teba niečo opakuje.","factRecord":"Zapisuje sa skutočný tlak, teplota, vlhkosť a počasie každého dňa, aj rok dozadu. Zapísané dni ostávajú v telefóne.","factLocation":"Poskytovateľovi počasia sa pri každej aktualizácii odošle iba poloha zaokrúhlená na približne 10 km.","factHealth":"Nikdy sa neodosiela nič o tvojom zdraví.","factOff":"Kedykoľvek to môžeš vypnúť.","enable":"Povoliť polohu a zapnúť","today":"Dnes","condition":"Počasie","temperature":"Teplota","humidity":"Vlhkosť","humidityValue":"Vlhkosť {value} %","forecastWord":"predpoveď","episodeWord":"epizóda","chartTitle":"Tlak v čase","rangeDays":"{n} dní","chartLabel":"Graf barometrického tlaku za posledných {n} dní a predpoveď na týždeň. Bodky označujú dni s epizódou.","legendPressure":"Tlak","legendForecast":"Predpoveď","legendEpisode":"Deň s epizódou","colDay":"Deň","colPressure":"Tlak","colChange":"Zmena","colEpisode":"Epizóda","forecastTitle":"Predpoveď na týždeň","linkTitle":"Tlak a tvoje záznamy","openFinder":"Otvoriť hľadač spúšťačov","myLocation":"Podľa tvojej polohy","noData":"Pre dnešok zatiaľ nie sú údaje o počasí.","settings":"Nastavenia","updateLocation":"Aktualizovať teraz","turnOff":"Vypnúť počasie a tlak","turnOffHint":"Zapísané dni ostanú.","turnOffTitle":"Vypnúť počasie a tlak?","turnOffText":"Appka prestane zisťovať počasie a zabudne tvoju polohu. Dni, ktoré sa už zapísali, ostanú.","attribution":"Údaje o počasí: Open-Meteo.com (CC BY 4.0)","disclaimer":"Údaje sú z meteorologických modelov pre tvoju približnú polohu a predpoveď sa môže líšiť od skutočnosti. Súvislosť s počasím nie je dôkazom príčiny.","loading":"Zisťujem počasie…","enabled":"Počasie a tlak sú zapnuté","errors":{"denied":"Bez povolenia polohy to nepôjde. Povoľ ju v nastaveniach telefónu alebo prehliadača.","unavailable":"Polohu sa nepodarilo zistiť. Skús to znova.","network":"Počasie sa nepodarilo načítať. Skontroluj pripojenie na internet."},"episodeDay":"Počasie a aktivita v ten deň","updated":"Aktualizované {time}. Údaje sa obnovujú samy.","stale":"Bez pripojenia. Posledné údaje sú z {time}."},"health":{"connected":"Prepojené","notConnected":"Neprepojené","stepsValue":"{value} krokov","pulseValue":"pokojový pulz {value}","lead":"Spánok, kroky a pokojový pulz sa môžu načítavať priamo z telefónu. Zapisujú tam aj hodinky ako Apple Watch, Garmin, Samsung či Fitbit.","providers":{"apple_health":"Apple Zdravie","health_connect":"Health Connect"},"typesTitle":"Čo načítavať","types":{"sleep":"Spánok","steps":"Kroky","restingHr":"Pokojový pulz"},"privacy":"Údaje sa iba načítajú do tohto telefónu a nikam sa neodosielajú. Ručne zapísaný spánok sa neprepíše.","lastSync":"Naposledy načítané {time}","stepsToday":"Kroky dnes","sleepToday":"Spánok dnes v noci","pulseToday":"Pokojový pulz","stepsWeek":"Kroky za posledných 7 dní","sleepWeek":"Spánok za posledných 7 nocí (hodiny)","noValue":"bez záznamu","disconnect":"Odpojiť","disconnectTitle":"Odpojiť zdravotnú appku?","disconnectText":"Appka prestane načítavať nové údaje. To, čo sa už načítalo, ostane v tvojich záznamoch.","connectedToast":"Prepojené","connectTo":{"apple_health":"Prepojiť s Apple Zdravím","health_connect":"Prepojiť s Health Connect"},"browserOnly":"Webový prehliadač k týmto údajom nemá prístup. Prepojenie funguje iba v mobilnej appke, kde sa údaje po povolení načítavajú samy. V tomto náhľade preto nič neukazujeme, aby tu neboli vymyslené čísla.","errors":{"denied":"Bez povolenia sa údaje načítať nedajú. Povoľ ich v nastaveniach telefónu.","unavailable":"Zdravotná appka nie je v tomto telefóne dostupná. Na Androide si nainštaluj Health Connect."}},"finder":{"ofDays":"{a} z {b}","percent":"{n} %","factors":{"pressure_drop":"Deň s poklesom tlaku o 6 hPa a viac","pressure_rise":"Deň s nárastom tlaku o 6 hPa a viac","humid":"Deň s vysokou vlhkosťou (85 % a viac)","temp_swing":"Deň so zmenou teploty o 8 °C a viac","short_sleep":"Noc kratšia ako 6 hodín","poor_sleep":"Noc so zlou kvalitou spánku","high_steps":"Deň s 12 000 krokmi a viac","low_steps":"Deň s menej ako 3 000 krokmi","period":"Obdobie okolo menštruácie"},"strength":{"strong":"Výraznejší rozdiel","possible":"Možná súvislosť","none":"Bez výrazného rozdielu","few":"Málo údajov"},"fewFactor":"Zatiaľ to nastalo {n}-krát, na porovnanie je to málo.","after":"Ťažší deň potom","otherDays":"V ostatných dňoch","lead":"Porovnávame, ako často prišiel ťažší deň po dni s daným faktorom a bez neho. Ťažší deň je deň s epizódou alebo príznakom s intenzitou aspoň {intensity}.","summary":"V tomto období je to {hard} z celkom {days}.","notEnough":"Zatiaľ máš zaznamenané {days} a {hard}. Na porovnanie treba aspoň 30 dní a 5 ťažších dní.","moreTitle":"Čo ešte porovnať","more":{"weather":"Zapni ich a porovnáme aj tlak, vlhkosť a teplotu.","health":"Prepoj ho a porovnáme aj kroky."},"loggedTitle":"Čo si sám/sama označil/a pri epizódach","loggedLead":"Tieto spúšťače zapisuješ iba pri epizódach, preto sa nedajú porovnať s dňami bez ťažkostí. Ukazujeme iba ich počet.","howTitle":"Ako to počítame","howText":"Ťažší deň hľadáme v ten istý deň a na druhý deň (pri krokoch iba na druhý deň). Deň bez záznamu sa počíta ako deň bez ťažkostí, chýbajúci spánok alebo tlak sa nedopĺňa. Rozdiel označíme až vtedy, keď je malá šanca, že vznikol náhodou.","disclaimer":"Možná súvislosť nie je dôkazom príčiny. Výsledok sa môže zmeniť s ďalšími záznamami. Ak chceš niečo zmeniť v liečbe, poraď sa s lekárom.","toForecast":"Zapnúť výhľad rizika"},"forecast":{"today":"Dnes","tomorrow":"Zajtra","signals":{"pressure_drop":"Hlásia pokles tlaku o {amount} hPa.","pressure_rise":"Hlásia nárast tlaku o {amount} hPa.","humid":"Hlásia vysokú vlhkosť ({amount} %).","temp_swing":"Hlásia zmenu teploty o {amount} °C.","short_sleep":"Posledná noc bola kratšia ako 6 hodín.","period":"Si v období okolo menštruácie."},"evidence":"Po podobných dňoch prišiel ťažší deň v {a} z {b} prípadov, inak v {c} z {d}.","evidenceFew":"Zatiaľ nemáme dosť tvojich záznamov, aby sme vedeli, či to na teba vplýva.","evidenceNone":"V tvojich záznamoch sa pri tom zatiaľ rozdiel neukazuje.","levels":{"elevated":"Riziko môže byť vyššie","watch":"Možná zmena","calm":"Bez výrazných zmien"},"cardTitle":"Výhľad rizika · {day}","care":"Daj si pozor a nechaj si viac priestoru, ak to ide.","factWeather":"Sleduje predpoveď tlaku, vlhkosti a teploty na najbližšie dni.","factRecords":"Porovná ju s tým, čo sa dialo v tvojich záznamoch pri podobných zmenách.","factNotify":"Večer pred takým dňom ťa upozorní.","factOff":"Kedykoľvek to môžeš vypnúť. Niektorým ľuďom je bez upozornení lepšie.","offLead":"Výhľad ti vopred povie, keď sa blíži deň, v ktorom môže byť riziko epizódy vyššie.","disclaimer":"Výhľad nie je diagnóza ani istá predpoveď. Porovnáva predpoveď počasia s tvojimi záznamami. Ťažkosti môžu prísť aj bez upozornenia a upozornenie neznamená, že prídu. Lieky ani dávky podľa neho nemeň, o liečbe sa rozhoduj so svojím lekárom.","enable":"Zapnúť výhľad rizika","calmText":"Žiadna zo sledovaných zmien sa nehlási.","lead":"Predpoveď počasia porovnaná s tvojimi záznamami.","weatherOff":"Zapni počasie a tlak","weatherOffHint":"Bez nich výhľad vidí iba spánok a cyklus.","learning":"Zatiaľ sa učíme z tvojich záznamov. Zmeny ukážeme, ale o tom, či na teba vplývajú, ešte nevieme povedať veľa.","notifyTitle":"Upozornenia","notify":"Upozorniť ma vopred","notifyHint":"Deň vopred, iba keď je na čo upozorniť.","notifyTime":"Kedy ma upozorniť","previewLabel":"Takto bude vyzerať upozornenie v telefóne:","disable":"Vypnúť výhľad rizika","staleForecast":"Predpoveď je staršia ako deň, preto na ňu teraz neupozorňujeme. Skontroluj pripojenie na internet.","nothingToNotify":"Podľa aktuálnej predpovede teraz nie je na čo upozorniť."},"stats":{"empty":"Štatistiky sa skladajú z tvojich záznamov. Keď budeš mať zapísané príznaky alebo epizódy, uvidíš ich tu.","noCompare":"bez porovnania","same":"rovnako ako predtým","less":"o {value} menej","more":"o {value} viac","compareTitle":"Oproti predošlému obdobiu","compareLead":"Posledných {days} oproti rovnako dlhému obdobiu predtým.","symptomDaysValue":"dni s príznakmi: {n}","trendTitle":"Dni s príznakmi po mesiacoch","trendLabel":"Stĺpcový graf počtu dní s príznakmi za posledných 12 mesiacov.","colMonth":"Mesiac","rhythmTitle":"Kedy epizódy začínajú","rhythmLead":"Spolu {n} podľa dňa v týždni a časti dňa.","parts":{"morning":"Ráno","afternoon":"Popol.","evening":"Večer","night":"Noc"},"cycleStart":"Prvý deň menštruácie","cycleOffset":"Deň {n} od začiatku","cycleTitle":"Epizódy okolo menštruácie","cycleLead":"Z {n} zapísaných menštruácií. Ďalšiu menštruáciu appka nepredpovedá.","colCycleDay":"Deň","reliefTitle":"Čo najčastejšie prinieslo úľavu","impactTitle":"Čo epizódy najčastejšie obmedzili","medValue":"{days} dní s príznakmi, {episodes} epizód za 30 dní","medTitle":"Záznamy pred preventívnym liekom a po ňom","medLead":"Prepočítané na 30 dní.","medSince":"Od {date}, porovnaných {days} pred a po","medBefore":"Pred začiatkom","medAfter":"Po začiatku","medDisclaimer":"Je to iba popis tvojich záznamov, nie hodnotenie lieku. Zmena môže mať aj iné dôvody. O liečbe sa rozhoduj so svojím lekárom."},"demoSymptoms":"V tejto ukážke sú príznaky a epizódy vymyslené, počasie je skutočné. Súvislosť s tlakom sa preto ukáže až z tvojich vlastných záznamov."}`)},en:{app:{name:`Vestie`,logo:`Vestie – Vestibular Migraine`},common:{continue:`Continue`,skip:`Skip`,back:`Back`,save:`Save`,cancel:`Cancel`,close:`Close`,yes:`Yes`,undo:`Undo`,optional:`optional`,on:`On`,off:`Off`,stepOf:`Step {step} of {total}`,edit:`Edit`,delete:`Delete`},language:{title:`Choose your language`,sk:`Slovenčina`,en:`English`},welcome:{title:`Your symptom diary`,text:`Log symptoms, episodes, medication and sleep. The app arranges them into a calendar and insights and prepares a report you can show your doctor.`,cta:`Get started`},goals:{title:`What can the app help you with?`,lead:`Choose what matters to you. You can pick several options or continue without choosing.`,options:{symptoms:`Log symptoms`,triggers:`Log possible triggers`,patterns:`Understand my difficulties`,doctor:`Prepare an overview for my doctor`}},condition:{title:`What would you like to track?`,lead:`This only tailors the content – it is not a diagnosis. You can change it at any time.`,options:{vestibular_migraine:`Vestibular migraine`,migraine:`Migraine`,other_vestibular:`Other vestibular condition`,unsure:`I'm not sure`}},cycle:{title:`Would you like to track your menstrual cycle?`,lead:`This feature is optional. You can turn it on or off later in settings.`,yes:`Yes`,no:`No`},medications:{title:`Would you like to add your medications?`,lead:`You can add medications you take preventively or for acute symptoms. You can skip this and add them later.`,add:`Add medications`,addAnother:`Add another medication`,added:`Added medications`,remove:`Remove medication {name}`,disclaimer:`The app does not recommend doses or change your treatment.`,types:{preventive:`Preventive`,acute:`Acute`}},medForm:{title:`New medication`,name:`Medication name`,namePlaceholder:`e.g. Betahistine`,nameRequired:`Please enter the medication name.`,type:`Type`,dose:`Dose`,dosePlaceholder:`e.g. 24 mg`,frequency:`Frequency`,frequencyPlaceholder:`e.g. twice a day`,note:`Note`,submit:`Save medication`,saved:`{name} was added`,startDate:`Started taking`,startDateHint:`Helps compare your entries before and after this medication.`},reminders:{title:`Would you like to set a reminder?`,lead:`Every day, at a time you choose, we'll remind you to log your symptoms and how you feel.`,yes:`Yes`,no:`No, not now`,time:`When should we remind you?`,permission:`Your phone will then ask for permission to send notifications. You can turn the reminder off in your profile at any time.`},today:{greeting:`Hello`,greetingName:`Hello, {name}`,howAreYou:`How are you feeling today?`,noEntries:`You haven't logged any symptoms today yet.`,loggedToday:`Logged today`,addSymptom:`Add symptom`,startEpisode:`Start episode`,overview:`Today`,sleep:`Sleep`,meds:`Medications`,nothingYet:`Nothing yet`,entriesEmpty:`Nothing here yet. Add a symptom with the button above, start an episode in the middle of the bottom menu.`,symptomsToday:`Symptoms logged today`,intakeTitle:`Medication`,logIntake:`Log medication`,pressure:`Pressure`,steps:`Steps`,turnOn:`Turn on`,connect:`Connect`,mobileOnly:`In the mobile app`},episode:{title:`Episode`,ongoing:`Episode in progress`,statusOngoing:`In progress`,statusEnded:`Ended`,started:`Episode started`,startedAt:`Started`,endedAt:`Ended`,duration:`Duration`,since:`since {time}`,lasting:`lasting {duration}`,detailsLater:`You can add details now or at any time later. The episode stays saved even if you close the app.`,addDetails:`Add details`,finishLater:`Finish later`,end:`End episode`,endedToast:`Episode ended`,mistake:`Started it by mistake?`,cancel:`Cancel episode`,cancelledToast:`Episode cancelled`,delete:`Delete episode`,deleteTitle:`Delete this episode?`,deleteText:`The entry will be permanently removed from this device.`,deletedToast:`Episode deleted`,notFound:`This episode no longer exists.`,linkedSymptoms:`Symptoms logged during the episode`,linkedIntakes:`Medications taken during the episode`,editDetails:`Edit details`,saveLater:`Save and finish later`,savedLater:`The episode is saved. You can add details any time in its detail view.`,details:`Details`},duration:{underMinute:`less than a minute`,minutes:`{m} min`,hours:`{h} h`,hoursMinutes:`{h} h {m} min`},nav:{label:`Main navigation`,today:`Today`,calendar:`Calendar`,insights:`Insights`,treatment:`Treatment`,profile:`Profile`,startEpisode:`Start episode`},profile:{title:`Profile`,me:`My profile`,name:`Name`,namePlaceholder:`Optional`,nameHint:`Used only to greet you on the home screen.`,language:`Language`,tracking:`Tracking`,cycle:`Menstrual cycle`,reminders:`Daily reminder`,reminderTime:`Reminder time`,display:`Display`,reduceMotion:`Reduce animations`,reduceMotionHint:`Helpful if motion bothers you. If reduced motion is turned on in your phone settings, animations are already off.`,privacy:`Privacy`,deleteAll:`Delete all data`,deleteAllTitle:`Delete all data?`,deleteAllText:`All entries, medications and settings on this device will be removed. This cannot be undone.`,deleteAllConfirm:`Yes, delete`,dev:`For development`,styleguide:`Design system`,saved:`Saved`,disclaimer:`This app is for personal tracking. It does not provide a diagnosis or treatment and does not replace consulting a doctor.`,integrations:`Connections`,health:`Smartwatch and health data`,healthHint:`Sleep, steps and pulse from Apple Health or Health Connect, including from your watch.`,comingSoon:`Coming soon`,demoReset:`Reset sample data`,demoResetTitle:`Reset sample data?`,demoResetText:`Sample entries for the last year will be restored. Entries you added yourself will stay.`,demoResetConfirm:`Reset`,demoResetDone:`Sample data has been reset`,onboardingAgain:`Go through the intro again`,logout:`Sign out`,logoutNoPinTitle:`Set a PIN first`,logoutNoPinText:`Without a PIN, anyone with your phone could open the app after you sign out. Once you set a PIN, we will sign you out right away.`,logoutNoPinConfirm:`Set a PIN`,appearance:`Appearance`,themes:{light:`Light`,dark:`Dark`,system:`Automatic`},demoSection:`App preview`,demoFill:`Filled app`,demoFillHint:`Turn off to see the empty app, as a new person would.`,demoFillOn:`Sample data is on`,demoFillOff:`Sample data is off, the app is empty`,weatherHint:`Pressure and weather for your location are recorded every day.`,demoPlus:`Vestie+ on`,demoPlusHint:`Switch to see the app with or without a subscription.`,plusActive:`My Vestie+`,plusTry:`Try Vestie+`,plusHint:`Weather and pressure, risk outlook, trigger finder and more.`},symptoms:{dizziness:`Dizziness`,vertigo:`Vertigo`,rocking:`Rocking / swaying`,floating:`Floating sensation`,unsteadiness:`Unsteadiness when walking`,nausea:`Nausea`,vomiting:`Vomiting`,light_sensitivity:`Sensitivity to light`,sound_sensitivity:`Sensitivity to sound`,visual_sensitivity:`Visual sensitivity`,tinnitus:`Tinnitus / ringing in the ears`,ear_pressure:`Ear pressure`,headache:`Headache`,brain_fog:`Brain fog`,fatigue:`Fatigue`,unknown:`Unknown symptom`},durations:{just_started:`Just started`,under_1h:`Less than 1 hour`,"1_3h":`1–3 hours`,"3_6h":`3–6 hours`,"6_12h":`6–12 hours`,over_12h:`More than 12 hours`,ongoing:`Still ongoing`,moment:`A moment (seconds to minutes)`},triggers:{poor_sleep:`Poor / insufficient sleep`,stress:`Stress`,skipped_meal:`Skipped meal`,dehydration:`Dehydration`,caffeine:`Caffeine`,alcohol:`Alcohol`,exertion:`Physical exertion`,illness:`Illness / infection`,visual_stimulation:`Visual stimulation`,screen_time:`Extended screen time`,weather_change:`Weather change`,menstrual_cycle:`Menstrual cycle`,travel:`Travel / motion`,other:`Other`,long_sleep:`Too much sleep`,bright_light:`Bright light / sunlight`,strong_smells:`Strong smells`,neck_pain:`Neck pain or tension`,allergy:`Allergy`},effects:{helped:`Helped`,partly:`Partly`,not_helped:`Didn't help`,unknown:`Not sure`},intensity:{none:`none`,mild:`mild`,moderate:`moderate`,severe:`severe`,notSet:`Not set`,value:`{value} – {level}`,highest:`highest intensity {value}`},log:{symptomsTitle:`Which symptoms are you logging?`,symptomsLead:`Choose one or more symptoms.`,search:`Search symptoms`,noMatch:`No symptom matches your search. You can add your own.`,custom:`Custom symptom`,customPlaceholder:`Type the symptom name`,customAdd:`Add`,continueCount:`Continue ({n})`,intensityTitle:`How intense is it?`,intensityLead:`0 = none, 10 = worst. The slider starts at 5 – move it to match how you feel. You can skip any symptom.`,clear:`Skip`,detailsTitle:`How long have these symptoms lasted?`,detailsLead:`Everything on this screen is optional.`,when:`When they started`,date:`Date`,time:`Time`,note:`Note`,linkEpisode:`Add to the ongoing episode`,save:`Save entry`,saved:`Entry saved`,whenToday:`Today at {time}`,whenOn:`{date} at {time}`,changeTime:`Change time`,clearLabel:`Skip intensity: {name}`,restore:`Rate intensity`},symptomLog:{title:`Symptoms`,duration:`Duration`,note:`Note`,episode:`Part of an episode`,openEpisode:`Open episode`,edit:`Edit entry`,delete:`Delete entry`,deleteTitle:`Delete this entry?`,deleteText:`The entry will be permanently removed from this device.`,deletedToast:`Entry deleted`,notFound:`This entry no longer exists.`},treatment:{title:`Treatment`,lead:`Your medications, when you take them and how they seem to help.`,preventive:`Preventive`,acute:`Acute`,add:`Add medication`,empty:`You haven't added any medications yet.`,noneOfType:`No medications in this group.`,lastTaken:`Last taken {when}`,neverTaken:`No intake logged yet`,disclaimer:`The app does not prescribe medications or suggest dose changes. Decide on treatment with your doctor.`,type:`Type`,dose:`Dose`,frequency:`Frequency`,note:`Note`,logIntake:`Log intake`,history:`Intake history`,historyEmpty:`You haven't logged any intake yet.`,taken:`Taken`,effectSummary:`Effect as you rated it`,edit:`Edit medication`,delete:`Remove medication`,deleteTitle:`Remove this medication?`,deleteText:`The medication and its whole intake history will be removed.`,deletedToast:`Medication removed`,notFound:`This medication no longer exists.`,inEpisode:`during an episode`,effectMissing:`effect not rated`,showAll:`Show full history ({n})`,hint:`Tap a medication to log when you take it and see how it helps you.`},intake:{title:`Medication intake`,editTitle:`Edit intake`,date:`Date`,time:`Time`,dose:`Dose`,effect:`Did it help?`,effectHint:`If you don't know yet, add it later.`,note:`Note`,save:`Save intake`,saved:`Intake saved`,delete:`Delete intake`,deleteTitle:`Delete this intake?`,deleteText:`The intake record will be permanently removed.`,deletedToast:`Intake deleted`,notFound:`This entry no longer exists.`},calendar:{title:`Calendar`,prev:`Previous month`,next:`Next month`,backToday:`Today`,legend:`Legend`,legendPeriod:`Period`,dayEmpty:`You have no entries on this day.`,addSymptom:`Add symptom`,period:`Period`,periodMark:`Log period on this day`,summaryEntries:`{n} entries`,summaryPeriod:`period`,summaryNone:`no entries`,selected:`selected day`,today:`today`,legendEpisode:`Day with an episode`,legendSymptoms:`Symptoms logged`,summaryEpisode:`episode`},insights:{title:`Insights`,periodLabel:`Period`,empty:`Insights are built from your entries. Once you've logged symptoms on several days, you'll see here what keeps coming back.`,overview:`Summary`,symptomDays:`Days with symptoms`,episodes:`Episodes`,avgIntensity:`Average intensity`,avgDuration:`Average episode duration`,noValue:`not entered`,topSymptoms:`Most frequent symptoms`,topSymptomsLead:`Number of entries in which the symptom appeared.`,topTriggers:`Most frequent possible triggers`,triggersEmpty:`You haven't logged any possible triggers yet. They will come with episode details.`,meds:`Medications`,medsEmpty:`You didn't log any medication intake in this period.`,interpretation:`A recorded connection is not proof of a cause. The overview only uses data you entered.`,report:`Create a report for your doctor`},report:{title:`Report for your doctor`,lead:`Choose a period. The report summarises your entries so you can show them to your doctor.`,custom:`Custom period`,from:`From`,to:`To`,create:`Create report`,invalidRange:`The “From” date must be on or before the “To” date.`,docTitle:`Recorded symptoms and treatment`,period:`Period`,created:`Created`,disclaimer:`Data recorded by the user in the Vestie app. This is not a diagnosis or a medical record.`,fewData:`Few entries were recorded in this period, so the overview may not be representative.`,summary:`Summary`,symptoms:`Most frequent symptoms`,triggers:`Recorded possible triggers`,meds:`Medications and effect as rated by the user`,sleep:`Sleep`,sleepNone:`No sleep was recorded in this period.`,cycle:`Menstrual cycle`,cycleDays:`Recorded period days`,notes:`Notes`,timeline:`Timeline`,colDate:`Date and time`,colEntry:`Entry`,colDetail:`Details`,none:`No entries.`,print:`Save as PDF`,printHint:`In the print window, choose “Save as PDF”.`,sleepQuality:`Sleep quality`,plusHint:`With Vestie+ the report also shows pressure during episodes, possible patterns and activity.`,weather:`Weather and pressure during episodes`,weatherSummary:`Episodes on days when pressure dropped by 6 hPa or more: {drops} of {total}.`,patterns:`Possible patterns from the entries`,patternsOther:`otherwise {a} of {b}`,patternsNote:`Number of harder days after a day with this factor. These are possible patterns from the user's entries over the past year, not proof of a cause.`,activity:`Activity`,avgSteps:`Average steps per day`,avgPulse:`Average resting pulse`},sleep:{title:`Sleep`,formTitle:`How did you sleep?`,lead:`Log how long you slept. Quality and a note are optional.`,date:`Day you woke up`,duration:`Sleep duration`,hours:`Hours`,minutes:`Minutes`,durationRequired:`Please enter how long you slept.`,quality:`Sleep quality`,qualities:{good:`Good`,fair:`Fair`,poor:`Poor`},note:`Note`,save:`Save sleep`,saved:`Sleep saved`,add:`Log sleep`,entry:`Sleep {duration}`,delete:`Delete sleep entry`,deleteTitle:`Delete this sleep entry?`,deleteText:`The entry will be permanently removed from this device.`,deletedToast:`Sleep entry deleted`,avg:`Average sleep`,nights:`Nights recorded`},consent:{title:`Your data stays on your phone`,lead:`Before you start, here is how we handle your data.`,factDevice:`Health entries are stored only on this phone.`,factNoServer:`The app has no online account, sends no health entries anywhere and uses no ads or analytics.`,factPin:`You will sign in with a PIN and your data will be encrypted.`,factControl:`You can export your data to a file or delete it permanently at any time.`,health:`I agree to the processing of my health data on this phone for personal tracking.`,age:`I am at least 16 years old.`,policyLink:`Read the privacy policy`,submit:`Agree and continue`},privacyPolicy:{title:`Privacy policy`,draft:`Draft`,version:`Version {version}`,draftNote:`Working draft for review. Before release it will be checked by a lawyer and the controller details will be added.`,controllerTitle:`Who is the controller`,controllerText:`[Controller name, address, company ID – to be added]. Contact for personal data questions: [e-mail – to be added].`,dataTitle:`What data the app processes`,dataText:`Only what you enter yourself: symptoms and their intensity, episodes, medications and their effect, sleep, optionally your menstrual cycle and a name for the greeting. With Vestie+ also weather and pressure for your approximate location and data from health apps, if you turn them on. This is health data, so we protect it specially.`,storageTitle:`Where your data is`,storageText:`Only on this phone. The app has no server or online account, sends no health entries anywhere and uses no advertising or analytics tools. The controller has no access to your data.`,purposeTitle:`What it is for`,purposeText:`For your personal tracking and for an overview or report you can show your doctor. The report is created on the phone and you decide who gets it.`,legalTitle:`Legal basis`,legalText:`Your explicit consent to the processing of health data (Art. 9(2)(a) GDPR). You can withdraw it at any time in your Profile – your data will then be deleted.`,rightsTitle:`Your rights`,rightsText:`You can view, edit, export or permanently delete your data at any time in the app (Profile → Privacy). You also have the right to lodge a complaint with the data protection authority.`,securityTitle:`Security`,securityText:`You sign in to the app with a 6-digit PIN. While the PIN is on, all data on the phone is encrypted (AES-256) and cannot be accessed without it. If you forget the PIN, the data cannot be recovered.`,backupTitle:`Backup`,backupText:`Because your data is only on this phone, it will be lost if you lose or replace the phone without exporting it first.`,ageTitle:`Age`,ageText:`The app is intended for people aged 16 and over.`,changesTitle:`Changes to this policy`,changesText:`We will let you know about changes directly in the app.`,weatherTitle:`Weather and pressure (Vestie+)`,weatherText:`If you turn this feature on, the app sends your location, rounded to about 10 km, to the weather provider (currently Open-Meteo) to get real weather and pressure. It does this each time you open the app, so the data stays current. The provider also sees your IP address, as with any internet request. Nothing about your health is sent. You can turn this off at any time.`,healthTitle:`Health connection (Vestie+)`,healthText:`If you connect Apple Health or Health Connect, the app reads the selected data (sleep, steps, resting pulse) onto this phone. It sends none of it anywhere and you can disconnect at any time.`,purchasesTitle:`Subscription`,purchasesText:`Payment is handled by Apple or Google under their terms. The app only learns whether the subscription is active.`},profileSetup:{title:`Create your profile`,lead:`Your profile exists only on this phone – no online e-mail or password. You will sign in with a PIN.`,pinTitle:`Sign-in PIN`,pinText:`In the next step you will set a 6-digit PIN. You will use it to sign in and it also encrypts your data on the phone.`,nameLabel:`What should we call you?`,namePlaceholder:`Your name`,nameHint:`Optional. You will see it in the greeting on the home screen.`,pinAlready:`You already have a PIN. You can change it in Profile → Security.`},pin:{progress:`{n} of {total} digits entered`,keypad:`PIN keypad`,delete:`Delete digit`,prompt:{current:`Enter your current PIN`,new:`Choose a 6-digit PIN`,confirm:`Enter the PIN again to confirm`},title:{set:`Set your sign-in PIN`,change:`Change PIN`,disable:`Turn off PIN`},setLead:`You will use it to sign in and it also encrypts your data on the phone. If you forget it, the data cannot be recovered – nobody else has access to it.`,checking:`Checking…`,wrong:`Wrong PIN. Please try again.`,blocked:`Too many wrong attempts. Try again at {time}.`,weak:`This PIN is easy to guess. Please choose another one.`,mismatch:`The PINs don't match. Please choose your PIN again.`,saving:`Encrypting your data…`,enabled:`PIN set, your data is encrypted`,changed:`PIN changed`,disabled:`PIN turned off`,blockedSeconds:`Too many wrong attempts. Try again in {n} s.`},lock:{title:`Sign in`,lead:`Enter your PIN`,forgot:`Forgot your PIN?`,forgotTitle:`Forgotten PIN`,forgotText:`The PIN cannot be recovered – your data is encrypted only on this phone and nobody else has the key. You can only delete it and start over.`,forgotConfirm:`Delete everything and start over`},security:{title:`Security`,pin:`Sign in with PIN`,pinOnHint:`Your data is encrypted on the phone and cannot be accessed without the PIN.`,pinOffHint:`Without a PIN, anyone with your phone can open the app and your data is not encrypted.`,changePin:`Change PIN`,autoLock:`Sign out automatically`,autoLockOptions:{m0:`Right after leaving the app`,m1:`After 1 minute`,m5:`After 5 minutes`,m15:`After 15 minutes`},biometrics:`Unlock with face or fingerprint`,biometricsHint:`Available in the mobile app.`},privacy:{deviceOnly:`Your entries are only on this phone`,deviceOnlyHint:`The app sends no health entries anywhere and nobody else can access them.`,export:`Export my data`,exportHint:`Downloads all entries to a file (JSON).`,exportDone:`Your data file is ready`,consent:`Consent to data processing`,consentGiven:`Given on {date}`,withdraw:`Withdraw consent`,withdrawTitle:`Withdraw consent?`,withdrawText:`Without consent the app cannot keep your health data. Withdrawing will permanently delete all data on this phone.`,withdrawConfirm:`Withdraw and delete data`},plural:{entries:{one:`{n} entry`,other:`{n} entries`},times:{other:`{n}×`},days:{one:`{n} day`,other:`{n} days`},episodes:{one:`{n} episode`,other:`{n} episodes`},hardDays:{one:`{n} harder day`,other:`{n} harder days`}},community:{title:`Community & support`,lead:`You don't have to face it alone. In our community we share our own experiences, support each other and recommend specialists.`,facebook:`Facebook group`,facebookHint:`Experiences, questions and mutual support`,instagram:`Instagram`,instagramHint:`@vestibularnamigrena`,discord:`Discord`,discordHint:`Real-time conversations with the community`,webTitle:`Articles on our website`,webText:`About the diagnosis, treatment and living with vestibular migraine (in Slovak).`,webUrl:`www.vestibularnamigrena.sk`,external:`(opens outside the app)`,note:`Experiences and recommendations from the community don't replace a doctor's examination and advice.`,soon:`Coming soon`},episodeTypes:{vestibular:`Vestibular episode`,migraine_headache:`Migraine with headache`,migraine_no_headache:`Migraine without headache`,other:`Other`,unsure:`I don't know`},relief:{rest:`Rest`,sleep:`Sleep`,dark_room:`Resting in a dark room`,hydration:`Drinking water`,relaxation:`Relaxation or meditation`,cold_compress:`Cold compress`,warm_compress:`Warm compress`,shower:`Shower`,food:`Food`,other:`Other`},impact:{work_study:`Work or study`,sleep:`Sleep`,daily_activities:`Everyday activities`,social:`Contact with family and friends`,movement:`Movement and physical activity`,rest:`Rest and relaxation`,other:`Other`,none:`The episode didn't limit me much`},episodeFlow:{typeTitle:`What kind of episode was it?`,typeLead:`Every detail is optional. Skip what you don't know and add it later.`,intensity:`Overall intensity`,symptomsTitle:`Which symptoms appeared?`,symptomsLead:`Choose one or more. You'll rate each one in the next step.`,date:`Date`,time:`Time`,triggersTitle:`What might have triggered it?`,triggersLead:`Choose everything that applies. These are possible links, not confirmed causes. You can choose more than one.`,triggerOther:`Other trigger`,triggerOtherPlaceholder:`Describe what it was`,medsTitle:`Did you take any medication during the episode?`,medsLead:`Tick the medication and when you took it. It will also be saved in Treatment.`,medsLogged:`Already logged during the episode`,medsNone:`You haven't added any medication yet.`,addMed:`Add medication`,medsWhen:`When you took it`,medsOutside:`The time must be during the episode.`,helped:`Did it help?`,reliefTitle:`What brought you relief?`,summaryTitle:`Episode summary`,summaryLead:`Check what you filled in. You can edit any part.`,summaryMissing:`You can still add`,save:`Save episode`,saved:`The episode was saved`,edit:`Edit`,sections:{type:`Type`,intensity:`Intensity`,time:`Time`,symptoms:`Symptoms`,triggers:`Possible triggers`,meds:`Medication`,helped:`Did it help?`,relief:`Relief`,impact:`Limitations`},reliefLead:`You can choose more than one.`,reliefOther:`What else helped?`,reliefOtherPlaceholder:`Describe what it was`,impactTitle:`How did the episode limit you?`,impactLead:`Which areas of everyday life did it affect?`,impactOther:`What else did the episode affect?`,impactOtherPlaceholder:`Describe what it was`},symptomInfo:{open:`What does {name} mean?`,close:`Got it`,dizziness:`A feeling of lightheadedness, unsteadiness or loss of balance. You may feel your head is spinning, feel faint or feel unsure when standing or walking.`,vertigo:`A false sense of movement even though you aren't moving. You may feel that you are spinning, that the room is turning or that your surroundings are moving.`,brain_fog:`A state in which it is hard to concentrate, think clearly or process information. Your thinking may feel slower, words may be harder to find or your thoughts harder to follow.`,visual_sensitivity:`Increased sensitivity to visual stimuli. Moving images, busy environments, patterns, crowds or screens can trigger dizziness, nausea or disorientation.`,tinnitus:`Hearing a sound in one or both ears even though there is no real source of sound around you. It may be ringing, humming, buzzing or hissing.`,rocking:`A feeling as if your body or surroundings are gently rocking, swaying from side to side or moving back and forth, like on a boat.`,floating:`A feeling as if you are floating, without firm contact with the ground.`,unsteadiness:`A feeling of unsteadiness when standing or walking, as if you are losing your balance, drifting to the sides or need support to move.`},quickIntake:{title:`Which medication did you take?`,lead:`Choose a medication. Next you'll enter the time and whether it helped.`,add:`Add a new medication`,empty:`You haven't added any medication yet. Add one and then log taking it.`},plus:JSON.parse(`{"name":"Vestie+","lockedLabel":"Part of Vestie+","tryChip":"Try it","demoChip":"Sample","features":{"weather":{"title":"Weather and pressure","text":"Weather and barometric pressure for your location are recorded every day."},"forecast":{"title":"Risk outlook","text":"Warns you ahead of days when the risk of an episode may be higher, for example when a sharp pressure drop is forecast."},"finder":{"title":"Trigger finder","text":"Compares days with and without symptoms and shows possible patterns."},"stats":{"title":"Advanced statistics","text":"Year-long trends, when episodes start, what helps, and your entries before and after a medication."},"health":{"title":"Health connection","text":"Sleep, steps and pulse from Apple Health or Health Connect, including from your watch."},"report":{"title":"Richer doctor's report","text":"Adds pressure during episodes, possible patterns and activity."}},"periods":{"d90":"90 days","d180":"6 months","d365":"12 months"},"plans":{"yearly":{"name":"Yearly","hint":"€2.50 a month, first 7 days free","price":"€29.99","cta":"Try free for 7 days","badge":"Save 37%"},"monthly":{"name":"Monthly","hint":"Cancel any time","price":"€3.99","cta":"Subscribe for €3.99 a month"}},"paywall":{"title":"Understand more from your entries","lead":"Vestie+ adds weather and pressure, advance warnings and deeper patterns. The basic diary stays free.","choosePlan":"Choose your subscription","renewal":"Payment is handled by the App Store or Google Play. The subscription renews automatically unless you cancel it in your store settings at least 24 hours before the period ends.","freeTitle":"Everything you have now stays free","freeText":"Symptom and episode entries, calendar, insights, medications, sleep and the doctor's report. When a subscription ends, your entries stay yours.","demoNote":"Nothing is charged in this preview and the prices are only a proposal so far.","restore":"Restore purchase","terms":"Terms of use","termsText":"The terms of use will be added before release, after legal review.","disclaimer":"Vestie+ does not provide a diagnosis or treatment and does not replace seeing a doctor.","notNow":"Not now","nativeOnly":"Purchases will be available in the mobile app.","nothingToRestore":"We found no purchase to restore."},"manage":{"title":"Your Vestie+","lead":"Everything in one place. You can turn any feature on or off at any time.","welcomeTitle":"Welcome to Vestie+","welcomeLead":"Turn on weather and pressure first. You will find the other features in the list.","features":"Features","subscription":"Subscription","trialUntil":"Free trial until {date}","since":"Active since {date}","cancel":"Cancel subscription","cancelHint":"Your entries stay on your phone.","cancelTitle":"Cancel Vestie+?","cancelText":"Vestie+ features will be locked. All your entries, including recorded weather and pressure, stay with you.","cancelConfirm":"Cancel subscription","cancelled":"Vestie+ is cancelled","toToday":"Continue to Home","enableWeather":"Turn on weather and pressure"},"charts":{"legend":"Chart legend","showTable":"Show as a table"},"weather":{"hpa":"{value} hPa","temps":"{min} to {max} °C","changeShort":"{value} from the day before","conditions":{"clear":"Clear","partly":"Partly cloudy","cloudy":"Cloudy","fog":"Fog","rain":"Rain","snow":"Snow","storm":"Storm"},"offLead":"Weather and pressure may be linked to vestibular migraine. The app will record them next to your entries every day, so you can see whether anything repeats for you.","factRecord":"Real pressure, temperature, humidity and weather are recorded for each day, going back a year. Recorded days stay on your phone.","factLocation":"Each update sends the weather provider only your location, rounded to about 10 km.","factHealth":"Nothing about your health is ever sent.","factOff":"You can turn this off at any time.","enable":"Allow location and turn on","today":"Today","condition":"Weather","temperature":"Temperature","humidity":"Humidity","humidityValue":"Humidity {value}%","forecastWord":"forecast","episodeWord":"episode","chartTitle":"Pressure over time","rangeDays":"{n} days","chartLabel":"Chart of barometric pressure over the last {n} days and the forecast for the week. Dots mark days with an episode.","legendPressure":"Pressure","legendForecast":"Forecast","legendEpisode":"Day with an episode","colDay":"Day","colPressure":"Pressure","colChange":"Change","colEpisode":"Episode","forecastTitle":"Forecast for the week","linkTitle":"Pressure and your entries","openFinder":"Open trigger finder","myLocation":"For your location","noData":"There is no weather data for today yet.","settings":"Settings","updateLocation":"Update now","turnOff":"Turn off weather and pressure","turnOffHint":"Recorded days will stay.","turnOffTitle":"Turn off weather and pressure?","turnOffText":"The app will stop checking the weather and forget your location. Days already recorded will stay.","attribution":"Weather data: Open-Meteo.com (CC BY 4.0)","disclaimer":"Data comes from weather models for your approximate location and forecasts can differ from reality. A link with weather is not proof of a cause.","loading":"Checking the weather…","enabled":"Weather and pressure are on","errors":{"denied":"This won't work without location access. Allow it in your phone or browser settings.","unavailable":"We couldn't find your location. Please try again.","network":"We couldn't load the weather. Check your internet connection."},"episodeDay":"Weather and activity that day","updated":"Updated {time}. Data refreshes by itself.","stale":"No connection. The latest data is from {time}."},"health":{"connected":"Connected","notConnected":"Not connected","stepsValue":"{value} steps","pulseValue":"resting pulse {value}","lead":"Sleep, steps and resting pulse can be read directly from your phone. Watches such as Apple Watch, Garmin, Samsung or Fitbit write there too.","providers":{"apple_health":"Apple Health","health_connect":"Health Connect"},"typesTitle":"What to read","types":{"sleep":"Sleep","steps":"Steps","restingHr":"Resting pulse"},"privacy":"Data is only read onto this phone and is not sent anywhere. Sleep you entered by hand is not overwritten.","lastSync":"Last read {time}","stepsToday":"Steps today","sleepToday":"Sleep last night","pulseToday":"Resting pulse","stepsWeek":"Steps over the last 7 days","sleepWeek":"Sleep over the last 7 nights (hours)","noValue":"no entry","disconnect":"Disconnect","disconnectTitle":"Disconnect the health app?","disconnectText":"The app will stop reading new data. What has already been read stays in your entries.","connectedToast":"Connected","connectTo":{"apple_health":"Connect to Apple Health","health_connect":"Connect to Health Connect"},"browserOnly":"A web browser cannot access this data. The connection only works in the mobile app, where data is read automatically once you allow it. So this preview shows nothing here rather than made-up numbers.","errors":{"denied":"Data can't be read without permission. Allow it in your phone settings.","unavailable":"The health app isn't available on this phone. On Android, install Health Connect."}},"finder":{"ofDays":"{a} of {b}","percent":"{n}%","factors":{"pressure_drop":"Day with a pressure drop of 6 hPa or more","pressure_rise":"Day with a pressure rise of 6 hPa or more","humid":"Day with high humidity (85% or more)","temp_swing":"Day with a temperature change of 8 °C or more","short_sleep":"Night shorter than 6 hours","poor_sleep":"Night with poor sleep quality","high_steps":"Day with 12,000 steps or more","low_steps":"Day with fewer than 3,000 steps","period":"Days around your period"},"strength":{"strong":"Clearer difference","possible":"Possible pattern","none":"No clear difference","few":"Not enough data"},"fewFactor":"This has happened {n} times so far, which is too few to compare.","after":"Harder day afterwards","otherDays":"On other days","lead":"We compare how often a harder day came after a day with this factor and without it. A harder day is one with an episode or a symptom of intensity {intensity} or more.","summary":"In this period that's {hard} out of {days} in total.","notEnough":"So far you have {days} and {hard} recorded. Comparing needs at least 30 days and 5 harder days.","moreTitle":"What else to compare","more":{"weather":"Turn them on and we'll also compare pressure, humidity and temperature.","health":"Connect it and we'll also compare steps."},"loggedTitle":"What you marked during episodes","loggedLead":"You only record these triggers during episodes, so they can't be compared with days without symptoms. We only show how often they appear.","howTitle":"How we calculate this","howText":"We look for a harder day on the same day and the next day (for steps, only the next day). A day without entries counts as a day without symptoms; missing sleep or pressure is not filled in. We only flag a difference when it is unlikely to be due to chance.","disclaimer":"A possible pattern is not proof of a cause. Results can change as you add entries. If you want to change anything about your treatment, talk to your doctor.","toForecast":"Turn on risk outlook"},"forecast":{"today":"Today","tomorrow":"Tomorrow","signals":{"pressure_drop":"A pressure drop of {amount} hPa is forecast.","pressure_rise":"A pressure rise of {amount} hPa is forecast.","humid":"High humidity is forecast ({amount}%).","temp_swing":"A temperature change of {amount} °C is forecast.","short_sleep":"Last night was shorter than 6 hours.","period":"You are in the days around your period."},"evidence":"After similar days a harder day came in {a} of {b} cases, otherwise in {c} of {d}.","evidenceFew":"We don't have enough of your entries yet to know whether this affects you.","evidenceNone":"Your entries don't show a difference for this so far.","levels":{"elevated":"Risk may be higher","watch":"Possible change","calm":"No major changes"},"cardTitle":"Risk outlook · {day}","care":"Take care and leave yourself more room if you can.","factWeather":"Follows the forecast for pressure, humidity and temperature over the next days.","factRecords":"Compares it with what happened in your entries during similar changes.","factNotify":"Warns you the evening before such a day.","factOff":"You can turn this off at any time. Some people feel better without warnings.","offLead":"The outlook tells you ahead of time when a day is coming on which the risk of an episode may be higher.","disclaimer":"The outlook is not a diagnosis or a certain prediction. It compares the weather forecast with your entries. Symptoms can come without a warning and a warning doesn't mean they will come. Don't change medication or doses because of it; make treatment decisions with your doctor.","enable":"Turn on risk outlook","calmText":"None of the changes we follow are forecast.","lead":"The weather forecast compared with your entries.","weatherOff":"Turn on weather and pressure","weatherOffHint":"Without them the outlook only sees sleep and your cycle.","learning":"We're still learning from your entries. We'll show changes, but can't say much yet about whether they affect you.","notifyTitle":"Notifications","notify":"Warn me ahead of time","notifyHint":"A day ahead, only when there's something to flag.","notifyTime":"When to warn me","previewLabel":"This is how the notification will look on your phone:","disable":"Turn off risk outlook","staleForecast":"The forecast is more than a day old, so we are not warning from it now. Check your internet connection.","nothingToNotify":"The current forecast gives nothing to warn about right now."},"stats":{"empty":"Statistics are built from your entries. Once you have recorded symptoms or episodes, you'll see them here.","noCompare":"no comparison","same":"same as before","less":"{value} less","more":"{value} more","compareTitle":"Compared with the previous period","compareLead":"The last {days} compared with the same length of time before.","symptomDaysValue":"days with symptoms: {n}","trendTitle":"Days with symptoms by month","trendLabel":"Column chart of the number of days with symptoms over the last 12 months.","colMonth":"Month","rhythmTitle":"When episodes start","rhythmLead":"{n} in total, by day of the week and part of the day.","parts":{"morning":"Morn.","afternoon":"Aft.","evening":"Eve.","night":"Night"},"cycleStart":"First day of your period","cycleOffset":"Day {n} from the start","cycleTitle":"Episodes around your period","cycleLead":"From {n} recorded periods. The app does not predict your next period.","colCycleDay":"Day","reliefTitle":"What brought relief most often","impactTitle":"What episodes limited most often","medValue":"{days} days with symptoms, {episodes} episodes per 30 days","medTitle":"Entries before and after a preventive medication","medLead":"Converted to 30 days.","medSince":"Since {date}, comparing {days} before and after","medBefore":"Before starting","medAfter":"After starting","medDisclaimer":"This only describes your entries and does not rate the medication. A change can have other causes. Make treatment decisions with your doctor."},"demoSymptoms":"In this sample the symptoms and episodes are made up, while the weather is real. Any link with pressure will only show from your own entries."}`)}},Zn=[`sk`,`en`],Qn={sk:`sk-SK`,en:`en-GB`},$n=`sk`;function er(e){$n=Xn[e]?e:`sk`,document.documentElement.lang=$n}var tr=()=>Qn[$n];function nr(e,t){return t.split(`.`).reduce((e,t)=>e?.[t],e)}function rr(e,t){return t?e.replace(/\{(\w+)\}/g,(e,n)=>t[n]??``):e}function ir(e,t,n){let r=nr(Xn[e],t)??nr(Xn.sk,t);return typeof r==`string`?rr(r,n):(console.warn(`[i18n] Chýba preklad: ${t}`),t)}var z=(e,t)=>ir($n,e,t);function ar(e,t){let n=new Intl.PluralRules(tr()).select(t),r=nr(Xn[$n],e)??{};return rr(r[n]??r.other??e,{n:t})}function or(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function sr(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var cr={autoSleep:120,force3D:`auto`,nullTargetWarn:1,units:{lineHeight:``}},lr={duration:.5,overwrite:!1,delay:0},ur,dr,B,fr=1e8,V=1/fr,pr=Math.PI*2,mr=pr/4,hr=0,gr=Math.sqrt,_r=Math.cos,vr=Math.sin,yr=function(e){return typeof e==`string`},br=function(e){return typeof e==`function`},xr=function(e){return typeof e==`number`},Sr=function(e){return e===void 0},Cr=function(e){return typeof e==`object`},wr=function(e){return e!==!1},Tr=function(){return typeof window<`u`},Er=function(e){return br(e)||yr(e)},Dr=typeof ArrayBuffer==`function`&&ArrayBuffer.isView||function(){},Or=Array.isArray,kr=/random\([^)]+\)/g,Ar=/,\s*/g,jr=/(?:-?\.?\d|\.)+/gi,Mr=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Nr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Pr=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Fr=/[+-]=-?[.\d]+/,Ir=/[^,'"\[\]\s]+/gi,Lr=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,H,Rr,zr,Br,Vr={},Hr={},Ur,Wr=function(e){return(Hr=xi(e,Vr))&&zo},Gr=function(e,t){return console.warn(`Invalid property`,e,`set to`,t,`Missing plugin? gsap.registerPlugin()`)},Kr=function(e,t){return!t&&console.warn(e)},qr=function(e,t){return e&&(Vr[e]=t)&&Hr&&(Hr[e]=t)||Vr},Jr=function(){return 0},Yr={suppressEvents:!0,isStart:!0,kill:!1},Xr={suppressEvents:!0,kill:!1},Zr={suppressEvents:!0},Qr={},$r=[],ei={},ti,ni={},ri={},ii=30,ai=[],oi=``,si=function(e){var t=e[0],n,r;if(Cr(t)||br(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=ai.length;r--&&!ai[r].targetTest(t););n=ai[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Ja(e[r],n)))||e.splice(r,1);return e},ci=function(e){return e._gsap||si(ia(e))[0]._gsap},li=function(e,t,n){return(n=e[t])&&br(n)?e[t]():Sr(n)&&e.getAttribute&&e.getAttribute(t)||n},ui=function(e,t){return(e=e.split(`,`)).forEach(t)||e},di=function(e){return Math.round(e*1e5)/1e5||0},U=function(e){return Math.round(e*1e7)/1e7||0},fi=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n===`+`?e+r:n===`-`?e-r:n===`*`?e*r:e/r},pi=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},mi=function(){var e=$r.length,t=$r.slice(0),n,r;for(ei={},$r.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},hi=function(e){return!!(e._initted||e._startAt||e.add)},gi=function(e,t,n,r){$r.length&&!dr&&mi(),e.render(t,n,r||!!(dr&&t<0&&hi(e))),$r.length&&!dr&&mi()},_i=function(e){var t=parseFloat(e);return(t||t===0)&&(e+``).match(Ir).length<2?t:yr(e)?e.trim():e},vi=function(e){return e},yi=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},bi=function(e){return function(t,n){for(var r in n)r in t||r===`duration`&&e||r===`ease`||(t[r]=n[r])}},xi=function(e,t){for(var n in t)e[n]=t[n];return e},Si=function e(t,n){for(var r in n)r!==`__proto__`&&r!==`constructor`&&r!==`prototype`&&(t[r]=Cr(n[r])?e(t[r]||(t[r]={}),n[r]):n[r]);return t},Ci=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},wi=function(e){var t=e.parent||H,n=e.keyframes?bi(Or(e.keyframes)):yi;if(wr(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},Ti=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},Ei=function(e,t,n,r,i){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var a=e[r],o;if(i)for(o=t[i];a&&a[i]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},Di=function(e,t,n,r){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var i=t._prev,a=t._next;i?i._next=a:e[n]===t&&(e[n]=a),a?a._prev=i:e[r]===t&&(e[r]=i),t._next=t._prev=t.parent=null},Oi=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},ki=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Ai=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},ji=function(e,t,n,r){return e._startAt&&(dr?e._startAt.revert(Xr):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},Mi=function e(t){return!t||t._ts&&e(t.parent)},Ni=function(e){return e._repeat?Pi(e._tTime,e=e.duration()+e._rDelay)*e:0},Pi=function(e,t){var n=Math.floor(e=U(e/t));return e&&n===e?n-1:n},Fi=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Ii=function(e){return e._end=U(e._start+(e._tDur/Math.abs(e._ts||e._rts||V)||0))},Li=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=U(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Ii(e),n._dirty||ki(n,e)),e},Ri=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Fi(e.rawTime(),t),(!t._dur||Qi(0,t.totalDuration(),n)-t._tTime>V)&&t.render(n,!0)),ki(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-V}},zi=function(e,t,n,r){return t.parent&&Oi(t),t._start=U((xr(n)?n:n||e!==H?Yi(e,n,t):e._time)+t._delay),t._end=U(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Ei(e,t,`_first`,`_last`,e._sort?`_start`:0),Ui(t)||(e._recent=t),r||Ri(e,t),e._ts<0&&Li(e,e._tTime),e},Bi=function(e,t){return(Vr.ScrollTrigger||Gr(`scrollTrigger`,t))&&Vr.ScrollTrigger.create(t,e)},Vi=function(e,t,n,r,i){if(ro(e,t,i),!e._initted)return 1;if(!n&&e._pt&&!dr&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&ti!==Fa.frame)return $r.push(e),e._lazy=[i,r],1},Hi=function e(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||e(n))},Ui=function(e){var t=e.data;return t===`isFromStart`||t===`isStart`},Wi=function(e,t,n,r){var i=e.ratio,a=t<0||!t&&(!e._start&&Hi(e)&&(e._initted||!Ui(e))||(e._ts<0||e._dp._ts<0)&&!Ui(e))?0:1,o=e._rDelay,s=0,c,l,u;if(o&&e._repeat&&(s=Qi(0,e._tDur,t),l=Pi(s,o),e._yoyo&&l&1&&(a=1-a),l!==Pi(e._tTime,o)&&(i=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==i||dr||r||e._zTime===V||!t&&e._zTime){if(!e._initted&&Vi(e,t,r,n,s))return;for(u=e._zTime,e._zTime=t||(n?V:0),n||=t&&!u,e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=s,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&ji(e,t,n,!0),e._onUpdate&&!n&&xa(e,`onUpdate`),s&&e._repeat&&!n&&e.parent&&xa(e,`onRepeat`),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&Oi(e,1),!n&&!dr&&(xa(e,a?`onComplete`:`onReverseComplete`,!0),e._prom&&e._prom()))}else e._zTime||=t},Gi=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data===`isPause`&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data===`isPause`&&r._start<t)return r;r=r._prev}},Ki=function(e,t,n,r){var i=e._repeat,a=U(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=i?i<0?1e10:U(a*(i+1)+e._rDelay*i):a,o>0&&!r&&Li(e,e._tTime=e._tDur*o),e.parent&&Ii(e),n||ki(e.parent,e),e},qi=function(e){return e instanceof Xa?ki(e):Ki(e,e._dur)},Ji={_start:0,endTime:Jr,totalDuration:Jr},Yi=function e(t,n,r){var i=t.labels,a=t._recent||Ji,o=t.duration()>=fr?a.endTime(!1):t._dur,s,c,l;return yr(n)&&(isNaN(n)||n in i)?(c=n.charAt(0),l=n.substr(-1)===`%`,s=n.indexOf(`=`),c===`<`||c===`>`?(s>=0&&(n=n.replace(/=/,``)),(c===`<`?a._start:a.endTime(a._repeat>=0))+(parseFloat(n.substr(1))||0)*(l?(s<0?a:r).totalDuration()/100:1)):s<0?(n in i||(i[n]=o),i[n]):(c=parseFloat(n.charAt(s-1)+n.substr(s+1)),l&&r&&(c=c/100*(Or(r)?r[0]:r).totalDuration()),s>1?e(t,n.substr(0,s-1),r)+c:o+c)):n==null?o:+n},Xi=function(e,t,n){var r=xr(t[1]),i=(r?2:1)+(e<2?0:1),a=t[i],o,s;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,s=n;s&&!(`immediateRender`in o);)o=s.vars.defaults||{},s=wr(s.vars.inherit)&&s.parent;a.immediateRender=wr(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[i-1]}return new uo(t[0],a,t[i+1])},Zi=function(e,t){return e||e===0?t(e):t},Qi=function(e,t,n){return n<e?e:n>t?t:n},$i=function(e,t){return!yr(e)||!(t=Lr.exec(e))?``:t[1]},ea=function(e,t,n){return Zi(n,function(n){return Qi(e,t,n)})},ta=[].slice,na=function(e,t){return e&&Cr(e)&&`length`in e&&(!t&&!e.length||e.length-1 in e&&Cr(e[0]))&&!e.nodeType&&e!==Rr},ra=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(e){var r;return yr(e)&&!t||na(e,1)?(r=n).push.apply(r,ia(e)):n.push(e)})||n},ia=function(e,t,n){return B&&!t&&B.selector?B.selector(e):yr(e)&&!n&&(zr||!Ia())?ta.call((t||Br).querySelectorAll(e),0):Or(e)?ra(e,n):na(e)?ta.call(e,0):e?[e]:[]},aa=function(e){return e=ia(e)[0]||Kr(`Invalid scope`)||{},function(t){var n=e.current||e.nativeElement||e;return ia(t,n.querySelectorAll?n:n===e?Kr(`Invalid scope`)||Br.createElement(`div`):e)}},oa=function(e){return e.sort(function(){return .5-Math.random()})},sa=function(e){if(br(e))return e;var t=Cr(e)?e:{each:e},n=Ua(t.ease),r=t.from||0,i=parseFloat(t.base)||0,a={},o=r>0&&r<1,s=isNaN(r)||o,c=t.axis,l=r,u=r;return yr(r)?l=u={center:.5,edges:.5,end:1}[r]||0:!o&&s&&(l=r[0],u=r[1]),function(e,o,d){var f=(d||t).length,p=a[f],m,h,g,_,v,y,b,x,S;if(!p){if(S=t.grid===`auto`?0:(t.grid||[1,fr])[1],!S){for(b=-fr;b<(b=d[S++].getBoundingClientRect().left)&&S<f;);S<f&&S--}for(p=a[f]=[],m=s?Math.min(S,f)*l-.5:r%S,h=S===fr?0:s?f*u/S-.5:r/S|0,b=0,x=fr,y=0;y<f;y++)g=y%S-m,_=h-(y/S|0),p[y]=v=c?Math.abs(c===`y`?_:g):gr(g*g+_*_),v>b&&(b=v),v<x&&(x=v);r===`random`&&oa(p),p.max=b-x,p.min=x,p.v=f=(parseFloat(t.amount)||parseFloat(t.each)*(S>f?f-1:c?c===`y`?f/S:S:Math.max(S,f/S))||0)*(r===`edges`?-1:1),p.b=f<0?i-f:i,p.u=$i(t.amount||t.each)||0,n=n&&f<0?Ha(n):n}return f=(p[e]-p.min)/p.max||0,U(p.b+(n?n(f):f)*p.v)+p.u}},ca=function(e){var t=10**((e+``).split(`.`)[1]||``).length;return function(n){var r=U(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(xr(n)?0:$i(n))}},la=function(e,t){var n=Or(e),r,i;return!n&&Cr(e)&&(r=n=e.radius||fr,e.values?(e=ia(e.values),(i=!xr(e[0]))&&(r*=r)):e=ca(e.increment)),Zi(t,n?br(e)?function(t){return i=e(t),Math.abs(i-t)<=r?i:t}:function(t){for(var n=parseFloat(i?t.x:t),a=parseFloat(i?t.y:0),o=fr,s=0,c=e.length,l,u;c--;)i?(l=e[c].x-n,u=e[c].y-a,l=l*l+u*u):l=Math.abs(e[c]-n),l<o&&(o=l,s=c);return s=!r||o<=r?e[s]:t,i||s===t||xr(t)?s:s+$i(t)}:ca(e))},ua=function(e,t,n,r){return Zi(Or(e)?!t:n===!0?!!(n=0):!r,function(){return Or(e)?e[~~(Math.random()*e.length)]:(n||=1e-5)&&(r=n<1?10**((n+``).length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},da=function(){var e=[...arguments];return function(t){return e.reduce(function(e,t){return t(e)},t)}},fa=function(e,t){return function(n){return e(parseFloat(n))+(t||$i(n))}},pa=function(e,t,n){return va(e,t,0,1,n)},ma=function(e,t,n){return Zi(n,function(n){return e[~~t(n)]})},ha=function e(t,n,r){var i=n-t;return Or(t)?ma(t,e(0,t.length),n):Zi(r,function(e){return(i+(e-t)%i)%i+t})},ga=function e(t,n,r){var i=n-t,a=i*2;return Or(t)?ma(t,e(0,t.length-1),n):Zi(r,function(e){return e=(a+(e-t)%a)%a||0,t+(e>i?a-e:e)})},_a=function(e){return e.replace(kr,function(e){var t=e.indexOf(`[`)+1,n=e.substring(t||7,t?e.indexOf(`]`):e.length-1).split(Ar);return ua(t?n:+n[0],t?0:+n[1],+n[2]||1e-5)})},va=function(e,t,n,r,i){var a=t-e,o=r-n;return Zi(i,function(t){return n+((t-e)/a*o||0)})},ya=function e(t,n,r,i){var a=isNaN(t+n)?0:function(e){return(1-e)*t+e*n};if(!a){var o=yr(t),s={},c,l,u,d,f;if(r===!0&&(i=1)&&(r=null),o)t={p:t},n={p:n};else if(Or(t)&&!Or(n)){for(u=[],d=t.length,f=d-2,l=1;l<d;l++)u.push(e(t[l-1],t[l]));d--,a=function(e){e*=d;var t=Math.min(f,~~e);return u[t](e-t)},r=n}else i||(t=xi(Or(t)?[]:{},t));if(!u){for(c in n)Qa.call(s,t,c,`get`,n[c]);a=function(e){return bo(e,s)||(o?t.p:t)}}}return Zi(r,a)},ba=function(e,t,n){var r=e.labels,i=fr,a,o,s;for(a in r)o=r[a]-t,o<0==!!n&&o&&i>(o=Math.abs(o))&&(s=a,i=o);return s},xa=function(e,t,n){var r=e.vars,i=r[t],a=B,o=e._ctx,s,c,l;if(i)return s=r[t+`Params`],c=r.callbackScope||e,n&&$r.length&&mi(),o&&(B=o),l=s?i.apply(c,s):i.call(c),B=a,l},Sa=function(e){return Oi(e),e.scrollTrigger&&e.scrollTrigger.kill(!!dr),e.progress()<1&&xa(e,`onInterrupt`),e},Ca,wa=[],Ta=function(e){if(e){if(e=!e.name&&e.default||e,Tr()||e.headless){var t=e.name,n=br(e),r=t&&!n&&e.init?function(){this._props=[]}:e,i={init:Jr,render:bo,add:Qa,kill:So,modifier:xo,rawVars:0},a={targetTest:0,get:0,getSetter:go,aliases:{},register:0};if(Ia(),e!==r){if(ni[t])return;yi(r,yi(Ci(e,i),a)),xi(r.prototype,xi(i,Ci(e,a))),ni[r.prop=t]=r,e.targetTest&&(ai.push(r),Qr[t]=1),t=(t===`css`?`CSS`:t.charAt(0).toUpperCase()+t.substr(1))+`Plugin`}qr(t,r),e.register&&e.register(zo,r,To)}else wa.push(e)}},W=255,Ea={aqua:[0,W,W],lime:[0,W,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,W],navy:[0,0,128],white:[W,W,W],olive:[128,128,0],yellow:[W,W,0],orange:[W,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[W,0,0],pink:[W,192,203],cyan:[0,W,W],transparent:[W,W,W,0]},Da=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*W+.5|0},Oa=function(e,t,n){var r=e?xr(e)?[e>>16,e>>8&W,e&W]:0:Ea.black,i,a,o,s,c,l,u,d,f,p;if(!r){if(e.substr(-1)===`,`&&(e=e.substr(0,e.length-1)),Ea[e])r=Ea[e];else if(e.charAt(0)===`#`){if(e.length<6&&(i=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e=`#`+i+i+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):``)),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&W,r&W,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&W,e&W]}else if(e.substr(0,3)===`hsl`){if(r=p=e.match(jr),!t)s=r[0]%360/360,c=r[1]/100,l=r[2]/100,a=l<=.5?l*(c+1):l+c-l*c,i=l*2-a,r.length>3&&(r[3]*=1),r[0]=Da(s+1/3,i,a),r[1]=Da(s,i,a),r[2]=Da(s-1/3,i,a);else if(~e.indexOf(`=`))return r=e.match(Mr),n&&r.length<4&&(r[3]=1),r}else r=e.match(jr)||Ea.transparent;r=r.map(Number)}return t&&!p&&(i=r[0]/W,a=r[1]/W,o=r[2]/W,u=Math.max(i,a,o),d=Math.min(i,a,o),l=(u+d)/2,u===d?s=c=0:(f=u-d,c=l>.5?f/(2-u-d):f/(u+d),s=u===i?(a-o)/f+(a<o?6:0):u===a?(o-i)/f+2:(i-a)/f+4,s*=60),r[0]=~~(s+.5),r[1]=~~(c*100+.5),r[2]=~~(l*100+.5)),n&&r.length<4&&(r[3]=1),r},ka=function(e){var t=[],n=[],r=-1;return e.split(ja).forEach(function(e){var i=e.match(Nr)||[];t.push.apply(t,i),n.push(r+=i.length+1)}),t.c=n,t},Aa=function(e,t,n){var r=``,i=(e+r).match(ja),a=t?`hsla(`:`rgba(`,o=0,s,c,l,u;if(!i)return e;if(i=i.map(function(e){return(e=Oa(e,t,1))&&a+(t?e[0]+`,`+e[1]+`%,`+e[2]+`%,`+e[3]:e.join(`,`))+`)`}),n&&(l=ka(e),s=n.c,s.join(r)!==l.c.join(r)))for(c=e.replace(ja,`1`).split(Nr),u=c.length-1;o<u;o++)r+=c[o]+(~s.indexOf(o)?i.shift()||a+`0,0,0,0)`:(l.length?l:i.length?i:n).shift());if(!c)for(c=e.split(ja),u=c.length-1;o<u;o++)r+=c[o]+i[o];return r+c[u]},ja=function(){var e=`(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b`,t;for(t in Ea)e+=`|`+t+`\\b`;return RegExp(e+`)`,`gi`)}(),Ma=/hsl[a]?\(/,Na=function(e){var t=e.join(` `),n;if(ja.lastIndex=0,ja.test(t))return n=Ma.test(t),e[1]=Aa(e[1],n),e[0]=Aa(e[0],n,ka(e[1])),!0},Pa,Fa=function(){var e=Date.now,t=500,n=33,r=e(),i=r,a=1e3/240,o=a,s=[],c,l,u,d,f,p,m=function u(m){var h=e()-i,g=m===!0,_,v,y,b;if((h>t||h<0)&&(r+=h-n),i+=h,y=i-r,_=y-o,(_>0||g)&&(b=++d.frame,f=y-d.time*1e3,d.time=y/=1e3,o+=_+(_>=a?4:a-_),v=1),g||(c=l(u)),v)for(p=0;p<s.length;p++)s[p](y,f,b,m)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(e){return f/(1e3/(e||60))},wake:function(){Ur&&(!zr&&Tr()&&(Rr=zr=window,Br=Rr.document||{},Vr.gsap=zo,(Rr.gsapVersions||(Rr.gsapVersions=[])).push(zo.version),Wr(Hr||Rr.GreenSockGlobals||!Rr.gsap&&Rr||{}),wa.forEach(Ta)),u=typeof requestAnimationFrame<`u`&&requestAnimationFrame,c&&d.sleep(),l=u||function(e){return setTimeout(e,o-d.time*1e3+1|0)},Pa=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),Pa=0,l=Jr},lagSmoothing:function(e,r){t=e||1/0,n=Math.min(r||33,t)},fps:function(e){a=1e3/(e||240),o=d.time*1e3+a},add:function(e,t,n){var r=t?function(t,n,i,a){e(t,n,i,a),d.remove(r)}:e;return d.remove(e),s[n?`unshift`:`push`](r),Ia(),r},remove:function(e,t){~(t=s.indexOf(e))&&s.splice(t,1)&&p>=t&&p--},_listeners:s},d}(),Ia=function(){return!Pa&&Fa.wake()},G={},La=/^[\d.\-M][\d.\-,\s]/,Ra=/["']/g,za=function(e){for(var t={},n=e.substr(1,e.length-3).split(`:`),r=n[0],i=1,a=n.length,o,s,c;i<a;i++)s=n[i],o=i===a-1?s.length:s.lastIndexOf(`,`),c=s.substr(0,o),t[r]=isNaN(c)?c.replace(Ra,``).trim():+c,r=s.substr(o+1).trim();return t},Ba=function(e){var t=e.indexOf(`(`)+1,n=e.indexOf(`)`),r=e.indexOf(`(`,t);return e.substring(t,~r&&r<n?e.indexOf(`)`,n+1):n)},Va=function(e){var t=(e+``).split(`(`),n=G[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf(`{`)?[za(t[1])]:Ba(e).split(`,`).map(_i)):G._CE&&La.test(e)?G._CE(``,e):n},Ha=function(e){return function(t){return 1-e(1-t)}},Ua=function(e,t){return e&&(br(e)?e:G[e]||Va(e))||t},Wa=function(e,t,n,r){n===void 0&&(n=function(e){return 1-t(1-e)}),r===void 0&&(r=function(e){return e<.5?t(e*2)/2:1-t((1-e)*2)/2});var i={easeIn:t,easeOut:n,easeInOut:r},a;return ui(e,function(e){for(var t in G[e]=Vr[e]=i,G[a=e.toLowerCase()]=n,i)G[a+(t===`easeIn`?`.in`:t===`easeOut`?`.out`:`.inOut`)]=G[e+`.`+t]=i[t]}),i},Ga=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Ka=function e(t,n,r){var i=n>=1?n:1,a=(r||(t?.3:.45))/(n<1?n:1),o=a/pr*(Math.asin(1/i)||0),s=function(e){return e===1?1:i*2**(-10*e)*vr((e-o)*a)+1},c=t===`out`?s:t===`in`?function(e){return 1-s(1-e)}:Ga(s);return a=pr/a,c.config=function(n,r){return e(t,n,r)},c},qa=function e(t,n){n===void 0&&(n=1.70158);var r=function(e){return e?--e*e*((n+1)*e+n)+1:0},i=t===`out`?r:t===`in`?function(e){return 1-r(1-e)}:Ga(r);return i.config=function(n){return e(t,n)},i};ui(`Linear,Quad,Cubic,Quart,Quint,Strong`,function(e,t){var n=t<5?t+1:t;Wa(e+`,Power`+(n-1),t?function(e){return e**+n}:function(e){return e},function(e){return 1-(1-e)**n},function(e){return e<.5?(e*2)**n/2:1-((1-e)*2)**n/2})}),G.Linear.easeNone=G.none=G.Linear.easeIn,Wa(`Elastic`,Ka(`in`),Ka(`out`),Ka()),(function(e,t){var n=1/t,r=2*n,i=2.5*n,a=function(a){return a<n?e*a*a:a<r?e*(a-1.5/t)**2+.75:a<i?e*(a-=2.25/t)*a+.9375:e*(a-2.625/t)**2+.984375};Wa(`Bounce`,function(e){return 1-a(1-e)},a)})(7.5625,2.75),Wa(`Expo`,function(e){return 2**(10*(e-1))*e+e*e*e*e*e*e*(1-e)}),Wa(`Circ`,function(e){return-(gr(1-e*e)-1)}),Wa(`Sine`,function(e){return e===1?1:-_r(e*mr)+1}),Wa(`Back`,qa(`in`),qa(`out`),qa()),G.SteppedEase=G.steps=Vr.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+ +!t,i=+!!t,a=1-V;return function(e){return((r*Qi(0,a,e)|0)+i)*n}}},lr.ease=G[`quad.out`],ui(`onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt`,function(e){return oi+=e+`,`+e+`Params,`});var Ja=function(e,t){this.id=hr++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:li,this.set=t?t.getSetter:go},Ya=function(){function e(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Ki(this,+e.duration,1,1),this.data=e.data,B&&(this._ctx=B,B.data.push(this)),Pa||Fa.wake()}var t=e.prototype;return t.delay=function(e){return e||e===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+e-this._delay),this._delay=e,this):this._delay},t.duration=function(e){return arguments.length?this.totalDuration(this._repeat>0?e+(e+this._rDelay)*this._repeat:e):this.totalDuration()&&this._dur},t.totalDuration=function(e){return arguments.length?(this._dirty=0,Ki(this,this._repeat<0?e:(e-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(e,t){if(Ia(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for(Li(this,e),!n._dp||n.parent||Ri(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&e<this._tDur||this._ts<0&&e>0||!this._tDur&&!e)&&zi(this._dp,this,this._start-this._delay)}return(this._tTime!==e||!this._dur&&!t||this._initted&&Math.abs(this._zTime)===V||!this._initted&&this._dur&&e||!e&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=e),gi(this,e,t)),this},t.time=function(e,t){return arguments.length?this.totalTime(Math.min(this.totalDuration(),e+Ni(this))%(this._dur+this._rDelay)||(e?this._dur:0),t):this._time},t.totalProgress=function(e,t){return arguments.length?this.totalTime(this.totalDuration()*e,t):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(e,t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-e:e)+Ni(this),t):this.duration()?Math.min(1,this._time/this._dur):+(this.rawTime()>0)},t.iteration=function(e,t){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(e-1)*n,t):this._repeat?Pi(this._tTime,n)+1:1},t.timeScale=function(e,t){if(!arguments.length)return this._rts===-V?0:this._rts;if(this._rts===e)return this;var n=this.parent&&this._ts?Fi(this.parent._time,this):this._tTime;return this._rts=+e||0,this._ts=this._ps||e===-V?0:this._rts,this.totalTime(Qi(-Math.abs(this._delay),this.totalDuration(),n),t!==!1),Ii(this),Ai(this)},t.paused=function(e){return arguments.length?(this._ps!==e&&(this._ps=e,e?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ia(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==V&&(this._tTime-=V)))),this):this._ps},t.startTime=function(e){if(arguments.length){this._start=U(e);var t=this.parent||this._dp;return t&&(t._sort||!this.parent)&&zi(t,this,this._start-this._delay),this}return this._start},t.endTime=function(e){return this._start+(wr(e)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(e){var t=this.parent||this._dp;return t?e&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Fi(t.rawTime(e),this):this._tTime:this._tTime},t.revert=function(e){e===void 0&&(e=Zr);var t=dr;return dr=e,hi(this)&&(this.timeline&&this.timeline.revert(e),this.totalTime(-.01,e.suppressEvents)),this.data!==`nested`&&e.kill!==!1&&this.kill(),dr=t,this},t.globalTime=function(e){for(var t=this,n=arguments.length?e:t.rawTime();t;)n=t._start+n/(Math.abs(t._ts)||1),t=t._dp;return!this.parent&&this._sat?this._sat.globalTime(e):n},t.repeat=function(e){return arguments.length?(this._repeat=e===1/0?-2:e,qi(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(e){if(arguments.length){var t=this._time;return this._rDelay=e,qi(this),t?this.time(t):this}return this._rDelay},t.yoyo=function(e){return arguments.length?(this._yoyo=e,this):this._yoyo},t.seek=function(e,t){return this.totalTime(Yi(this,e),wr(t))},t.restart=function(e,t){return this.play().totalTime(e?-this._delay:0,wr(t)),this._dur||(this._zTime=-V),this},t.play=function(e,t){return e!=null&&this.seek(e,t),this.reversed(!1).paused(!1)},t.reverse=function(e,t){return e!=null&&this.seek(e||this.totalDuration(),t),this.reversed(!0).paused(!1)},t.pause=function(e,t){return e!=null&&this.seek(e,t),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(e){return arguments.length?(!!e!==this.reversed()&&this.timeScale(-this._rts||(e?-V:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-V,this},t.isActive=function(){var e=this.parent||this._dp,t=this._start,n;return!!(!e||this._ts&&this._initted&&e.isActive()&&(n=e.rawTime(!0))>=t&&n<this.endTime(!0)-V)},t.eventCallback=function(e,t,n){var r=this.vars;return arguments.length>1?(t?(r[e]=t,n&&(r[e+`Params`]=n),e===`onUpdate`&&(this._onUpdate=t)):delete r[e],this):r[e]},t.then=function(e){var t=this,n=t._prom;return new Promise(function(r){var i=br(e)?e:vi,a=function(){var e=t.then;t.then=null,n&&n(),br(i)&&(i=i(t))&&(i.then||i===t)&&(t.then=e),r(i),t.then=e};t._initted&&t.totalProgress()===1&&t._ts>=0||!t._tTime&&t._ts<0?a():t._prom=a})},t.kill=function(){Sa(this)},e}();yi(Ya.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-V,_prom:0,_ps:!1,_rts:1});var Xa=function(e){sr(t,e);function t(t,n){var r;return t===void 0&&(t={}),r=e.call(this,t)||this,r.labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=wr(t.sortChildren),H&&zi(t.parent||H,or(r),n),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&Bi(or(r),t.scrollTrigger),r}var n=t.prototype;return n.to=function(e,t,n){return Xi(0,arguments,this),this},n.from=function(e,t,n){return Xi(1,arguments,this),this},n.fromTo=function(e,t,n,r){return Xi(2,arguments,this),this},n.set=function(e,t,n){return t.duration=0,t.parent=this,wi(t).repeatDelay||(t.repeat=0),t.immediateRender=!!t.immediateRender,new uo(e,t,Yi(this,n),1),this},n.call=function(e,t,n){return zi(this,uo.delayedCall(0,e,t),n)},n.staggerTo=function(e,t,n,r,i,a,o){return n.duration=t,n.stagger=n.stagger||r,n.onComplete=a,n.onCompleteParams=o,n.parent=this,new uo(e,n,Yi(this,i)),this},n.staggerFrom=function(e,t,n,r,i,a,o){return n.runBackwards=1,wi(n).immediateRender=wr(n.immediateRender),this.staggerTo(e,t,n,r,i,a,o)},n.staggerFromTo=function(e,t,n,r,i,a,o,s){return r.startAt=n,wi(r).immediateRender=wr(r.immediateRender),this.staggerTo(e,t,r,i,a,o,s)},n.render=function(e,t,n){var r=this._time,i=this._dirty?this.totalDuration():this._tDur,a=this._dur,o=e<=0?0:U(e),s=this._zTime<0!=e<0&&(this._initted||!a),c,l,u,d,f,p,m,h,g,_,v,y;if(this!==H&&o>i&&e>=0&&(o=i),o!==this._tTime||n||s){if(r!==this._time&&a&&(o+=this._time-r,e+=this._time-r),c=o,g=this._start,h=this._ts,p=!h,s&&(a||(r=this._zTime),(e||!t)&&(this._zTime=e)),this._repeat){if(v=this._yoyo,f=a+this._rDelay,this._repeat<-1&&e<0)return this.totalTime(f*100+e,t,n);if(c=U(o%f),o===i?(d=this._repeat,c=a):(_=U(o/f),d=~~_,d&&d===_&&(c=a,d--),c>a&&(c=a)),_=Pi(this._tTime,f),!r&&this._tTime&&_!==d&&this._tTime-_*f-this._dur<=0&&(_=d),v&&d&1&&(c=a-c,y=1),d!==_&&!this._lock){var b=v&&_&1,x=b===(v&&d&1);if(d<_&&(b=!b),r=b?0:o%a?a:o,this._lock=1,this.render(r||(y?0:U(d*f)),t,!a)._lock=0,this._tTime=o,!t&&this.parent&&xa(this,`onRepeat`),this.vars.repeatRefresh&&!y&&(this.invalidate()._lock=1,_=d),r&&r!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act||(a=this._dur,i=this._tDur,x&&(this._lock=2,r=b?a:-1e-4,this.render(r,!0),this.vars.repeatRefresh&&!y&&this.invalidate()),this._lock=0,!this._ts&&!p))return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(m=Gi(this,U(r),U(c)),m&&(o-=c-(c=m._start))),this._tTime=o,this._time=c,this._act=!!h,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=e,r=0),!r&&o&&a&&!t&&!_&&(xa(this,`onStart`),this._tTime!==o))return this;if(c>=r&&e>=0)for(l=this._first;l;){if(u=l._next,(l._act||c>=l._start)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(c-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(c-l._start)*l._ts,t,n),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=-V);break}}l=u}else{l=this._last;for(var S=e<0?e:c;l;){if(u=l._prev,(l._act||S<=l._end)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(S-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(S-l._start)*l._ts,t,n||dr&&hi(l)),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=S?-V:V);break}}l=u}}if(m&&!t&&(this.pause(),m.render(c>=r?0:-V)._zTime=c>=r?1:-1,this._ts))return this._start=g,Ii(this),this.render(e,t,n);this._onUpdate&&!t&&xa(this,`onUpdate`,!0),(o===i&&this._tTime>=this.totalDuration()||!o&&r)&&(g===this._start||Math.abs(h)!==Math.abs(this._ts))&&(this._lock||((e||!a)&&(o===i&&this._ts>0||!o&&this._ts<0)&&Oi(this,1),!t&&!(e<0&&!r)&&(o||r||!i)&&(xa(this,o===i&&e>=0?`onComplete`:`onReverseComplete`,!0),this._prom&&!(o<i&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(e,t){var n=this;if(xr(t)||(t=Yi(this,t,e)),!(e instanceof Ya)){if(Or(e))return e.forEach(function(e){return n.add(e,t)}),this;if(yr(e))return this.addLabel(e,t);if(br(e))e=uo.delayedCall(0,e);else return this}return this===e?this:zi(this,e,t)},n.getChildren=function(e,t,n,r){e===void 0&&(e=!0),t===void 0&&(t=!0),n===void 0&&(n=!0),r===void 0&&(r=-fr);for(var i=[],a=this._first;a;)a._start>=r&&(a instanceof uo?t&&i.push(a):(n&&i.push(a),e&&i.push.apply(i,a.getChildren(!0,t,n)))),a=a._next;return i},n.getById=function(e){for(var t=this.getChildren(1,1,1),n=t.length;n--;)if(t[n].vars.id===e)return t[n]},n.remove=function(e){return yr(e)?this.removeLabel(e):br(e)?this.killTweensOf(e):(e.parent===this&&Di(this,e),e===this._recent&&(this._recent=this._last),ki(this))},n.totalTime=function(t,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=U(Fa.time-(this._ts>0?t/this._ts:(this.totalDuration()-t)/-this._ts))),e.prototype.totalTime.call(this,t,n),this._forcing=0,this):this._tTime},n.addLabel=function(e,t){return this.labels[e]=Yi(this,t),this},n.removeLabel=function(e){return delete this.labels[e],this},n.addPause=function(e,t,n){var r=uo.delayedCall(0,t||Jr,n);return r.data=`isPause`,this._hasPause=1,zi(this,r,Yi(this,e))},n.removePause=function(e){var t=this._first;for(e=Yi(this,e);t;)t._start===e&&t.data===`isPause`&&Oi(t),t=t._next},n.killTweensOf=function(e,t,n){for(var r=this.getTweensOf(e,n),i=r.length;i--;)to!==r[i]&&r[i].kill(e,t);return this},n.getTweensOf=function(e,t){for(var n=[],r=ia(e),i=this._first,a=xr(t),o;i;)i instanceof uo?pi(i._targets,r)&&(a?(!to||i._initted&&i._ts)&&i.globalTime(0)<=t&&i.globalTime(i.totalDuration())>t:!t||i.isActive())&&n.push(i):(o=i.getTweensOf(r,t)).length&&n.push.apply(n,o),i=i._next;return n},n.tweenTo=function(e,t){t||={};var n=this,r=Yi(n,e),i=t,a=i.startAt,o=i.onStart,s=i.onStartParams,c=i.immediateRender,l,u=uo.to(n,yi({ease:t.ease||`none`,lazy:!1,immediateRender:!1,time:r,overwrite:`auto`,duration:t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale())||V,onStart:function(){if(n.pause(),!l){var e=t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale());u._dur!==e&&Ki(u,e,0,1).render(u._time,!0,!0),l=1}o&&o.apply(u,s||[])}},t));return c?u.render(0):u},n.tweenFromTo=function(e,t,n){return this.tweenTo(t,yi({startAt:{time:Yi(this,e)}},n))},n.recent=function(){return this._recent},n.nextLabel=function(e){return e===void 0&&(e=this._time),ba(this,Yi(this,e))},n.previousLabel=function(e){return e===void 0&&(e=this._time),ba(this,Yi(this,e),1)},n.currentLabel=function(e){return arguments.length?this.seek(e,!0):this.previousLabel(this._time+V)},n.shiftChildren=function(e,t,n){n===void 0&&(n=0);var r=this._first,i=this.labels,a;for(e=U(e);r;)r._start>=n&&(r._start+=e,r._end+=e),r=r._next;if(t)for(a in i)i[a]>=n&&(i[a]+=e);return ki(this)},n.invalidate=function(t){var n=this._first;for(this._lock=0;n;)n.invalidate(t),n=n._next;return e.prototype.invalidate.call(this,t)},n.clear=function(e){e===void 0&&(e=!0);for(var t=this._first,n;t;)n=t._next,this.remove(t),t=n;return this._dp&&(this._time=this._tTime=this._pTime=0),e&&(this.labels={}),ki(this)},n.totalDuration=function(e){var t=0,n=this,r=n._last,i=fr,a,o,s;if(arguments.length)return n.timeScale((n._repeat<0?n.duration():n.totalDuration())/(n.reversed()?-e:e));if(n._dirty){for(s=n.parent;r;)a=r._prev,r._dirty&&r.totalDuration(),o=r._start,o>i&&n._sort&&r._ts&&!n._lock?(n._lock=1,zi(n,r,o-r._delay,1)._lock=0):i=o,o<0&&r._ts&&(t-=o,(!s&&!n._dp||s&&s.smoothChildTiming)&&(n._start+=U(o/n._ts),n._time-=o,n._tTime-=o),n.shiftChildren(-o,!1,-1/0),i=0),r._end>t&&r._ts&&(t=r._end),r=a;Ki(n,n===H&&n._time>t?n._time:t,1,1),n._dirty=0}return n._tDur},t.updateRoot=function(e){if(H._ts&&(gi(H,Fi(e,H)),ti=Fa.frame),Fa.frame>=ii){ii+=cr.autoSleep||120;var t=H._first;if((!t||!t._ts)&&cr.autoSleep&&Fa._listeners.length<2){for(;t&&!t._ts;)t=t._next;t||Fa.sleep()}}},t}(Ya);yi(Xa.prototype,{_lock:0,_hasPause:0,_forcing:0});var Za=function(e,t,n,r,i,a,o){var s=new To(this._pt,e,t,0,1,yo,null,i),c=0,l=0,u,d,f,p,m,h,g,_;for(s.b=n,s.e=r,n+=``,r+=``,(g=~r.indexOf(`random(`))&&(r=_a(r)),a&&(_=[n,r],a(_,e,t),n=_[0],r=_[1]),d=n.match(Pr)||[];u=Pr.exec(r);)p=u[0],m=r.substring(c,u.index),f?f=(f+1)%5:m.substr(-5)===`rgba(`&&(f=1),p!==d[l++]&&(h=parseFloat(d[l-1])||0,s._pt={_next:s._pt,p:m||l===1?m:`,`,s:h,c:p.charAt(1)===`=`?fi(h,p)-h:parseFloat(p)-h,m:f&&f<4?Math.round:0},c=Pr.lastIndex);return s.c=c<r.length?r.substring(c,r.length):``,s.fp=o,(Fr.test(r)||g)&&(s.e=0),this._pt=s,s},Qa=function(e,t,n,r,i,a,o,s,c,l){br(r)&&(r=r(i||0,e,a));var u=e[t],d=n===`get`?br(u)?c?e[t.indexOf(`set`)||!br(e[`get`+t.substr(3)])?t:`get`+t.substr(3)](c):e[t]():u:n,f=br(u)?c?mo:po:fo,p;if(yr(r)&&(~r.indexOf(`random(`)&&(r=_a(r)),r.charAt(1)===`=`&&(p=fi(d,r)+($i(d)||0),(p||p===0)&&(r=p))),!l||d!==r||no)return!isNaN(d*r)&&r!==``?(p=new To(this._pt,e,t,+d||0,r-(d||0),typeof u==`boolean`?vo:_o,0,f),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!u&&!(t in e)&&Gr(t,r),Za.call(this,e,t,d,r,f,s||cr.stringFilter,c))},$a=function(e,t,n,r,i){if(br(e)&&(e=so(e,i,t,n,r)),!Cr(e)||e.style&&e.nodeType||Or(e)||Dr(e))return yr(e)?so(e,i,t,n,r):e;var a={},o;for(o in e)a[o]=so(e[o],i,t,n,r);return a},eo=function(e,t,n,r,i,a){var o,s,c,l;if(ni[e]&&(o=new ni[e]).init(i,o.rawVars?t[e]:$a(t[e],r,i,a,n),n,r,a)!==!1&&(n._pt=s=new To(n._pt,i,e,0,1,o.render,o,0,o.priority),n!==Ca))for(c=n._ptLookup[n._targets.indexOf(i)],l=o._props.length;l--;)c[o._props[l]]=s;return o},to,no,ro=function e(t,n,r){var i=t.vars,a=i.ease,o=i.startAt,s=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,p=i.autoRevert,m=t._dur,h=t._startAt,g=t._targets,_=t.parent,v=_&&_.data===`nested`?_.vars.targets:g,y=t._overwrite===`auto`&&!ur,b=t.timeline,x=i.easeReverse||d,S,C,w,T,E,D,O,k,A,j,M,ee,te;if(b&&(!f||!a)&&(a=`none`),t._ease=Ua(a,lr.ease),t._rEase=x&&(Ua(x)||t._ease),t._from=!b&&!!i.runBackwards,t._from&&(t.ratio=1),!b||f&&!i.stagger){if(k=g[0]?ci(g[0]).harness:0,ee=k&&i[k.prop],S=Ci(i,Qr),h&&(h._zTime<0&&h.progress(1),n<0&&u&&s&&!p?h.render(-1,!0):h.revert(u&&m?Xr:Yr),h._lazy=0),o){if(Oi(t._startAt=uo.set(g,yi({data:`isStart`,overwrite:!1,parent:_,immediateRender:!0,lazy:!h&&wr(c),startAt:null,delay:0,onUpdate:l&&function(){return xa(t,`onUpdate`)},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,n<0&&(dr||!s&&!p)&&t._startAt.revert(Xr),s&&m&&n<=0&&r<=0){n&&(t._zTime=n);return}}else if(u&&m&&!h){if(n&&(s=!1),w=yi({overwrite:!1,data:`isFromStart`,lazy:s&&!h&&wr(c),immediateRender:s,stagger:0,parent:_},S),ee&&(w[k.prop]=ee),Oi(t._startAt=uo.set(g,w)),t._startAt._dp=0,t._startAt._sat=t,n<0&&(dr?t._startAt.revert(Xr):t._startAt.render(-1,!0)),t._zTime=n,!s)e(t._startAt,V,V);else if(!n)return}for(t._pt=t._ptCache=0,c=m&&wr(c)||c&&!m,C=0;C<g.length;C++){if(E=g[C],O=E._gsap||si(g)[C]._gsap,t._ptLookup[C]=j={},ei[O.id]&&$r.length&&mi(),M=v===g?C:v.indexOf(E),k&&(A=new k).init(E,ee||S,t,M,v)!==!1&&(t._pt=T=new To(t._pt,E,A.name,0,1,A.render,A,0,A.priority),A._props.forEach(function(e){j[e]=T}),A.priority&&(D=1)),!k||ee)for(w in S)ni[w]&&(A=eo(w,S,t,M,E,v))?A.priority&&(D=1):j[w]=T=Qa.call(t,E,w,`get`,S[w],M,v,0,i.stringFilter);t._op&&t._op[C]&&t.kill(E,t._op[C]),y&&t._pt&&(to=t,H.killTweensOf(E,j,t.globalTime(n)),te=!t.parent,to=0),t._pt&&c&&(ei[O.id]=1)}D&&wo(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!te,f&&n<=0&&b.render(fr,!0,!0)},io=function(e,t,n,r,i,a,o,s){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],l,u,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(l=d[f][t],l&&l.d&&l.d._pt)for(l=l.d._pt;l&&l.p!==t&&l.fp!==t;)l=l._next;if(!l)return no=1,e.vars[t]=`+=0`,ro(e,o),no=0,s?Kr(t+` not eligible for reset. Try splitting into individual properties`):1;c.push(l)}for(f=c.length;f--;)u=c[f],l=u._pt||u,l.s=(r||r===0)&&!i?r:l.s+(r||0)+a*l.c,l.c=n-l.s,u.e&&(u.e=di(n)+$i(u.e)),u.b&&(u.b=l.s+$i(u.b))},ao=function(e,t){var n=e[0]?ci(e[0]).harness:0,r=n&&n.aliases,i,a,o,s;if(!r)return t;for(a in i=xi({},t),r)if(a in i)for(s=r[a].split(`,`),o=s.length;o--;)i[s[o]]=i[a];return i},oo=function(e,t,n,r){var i=t.ease||r||`power1.inOut`,a,o;if(Or(t))o=n[e]||(n[e]=[]),t.forEach(function(e,n){return o.push({t:n/(t.length-1)*100,v:e,e:i})});else for(a in t)o=n[a]||(n[a]=[]),a===`ease`||o.push({t:parseFloat(e),v:t[a],e:i})},so=function(e,t,n,r,i){return br(e)?e.call(t,n,r,i):yr(e)&&~e.indexOf(`random(`)?_a(e):e},co=oi+`repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert`,lo={};ui(co+`,id,stagger,delay,duration,paused,scrollTrigger`,function(e){return lo[e]=1});var uo=function(e){sr(t,e);function t(t,n,r,i){var a;typeof n==`number`&&(r.duration=n,n=r,r=null),a=e.call(this,i?n:wi(n))||this;var o=a.vars,s=o.duration,c=o.delay,l=o.immediateRender,u=o.stagger,d=o.overwrite,f=o.keyframes,p=o.defaults,m=o.scrollTrigger,h=n.parent||H,g=(Or(t)||Dr(t)?xr(t[0]):`length`in n)?[t]:ia(t),_,v,y,b,x,S,C,w;if(a._targets=g.length?si(g):Kr(`GSAP target `+t+` not found. https://gsap.com`,!cr.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,f||u||Er(s)||Er(c)){n=a.vars;var T=n.easeReverse||n.yoyoEase;if(_=a.timeline=new Xa({data:`nested`,defaults:p||{},targets:h&&h.data===`nested`?h.vars.targets:g}),_.kill(),_.parent=_._dp=or(a),_._start=0,u||Er(s)||Er(c)){if(b=g.length,C=u&&sa(u),Cr(u))for(x in u)~co.indexOf(x)&&(w||={},w[x]=u[x]);for(v=0;v<b;v++)y=Ci(n,lo),y.stagger=0,T&&(y.easeReverse=T),w&&xi(y,w),S=g[v],y.duration=+so(s,or(a),v,S,g),y.delay=(+so(c,or(a),v,S,g)||0)-a._delay,!u&&b===1&&y.delay&&(a._delay=c=y.delay,a._start+=c,y.delay=0),_.to(S,y,C?C(v,S,g):0),_._ease=G.none;_.duration()?s=c=0:a.timeline=0}else if(f){wi(yi(_.vars.defaults,{ease:`none`})),_._ease=Ua(f.ease||n.ease||`none`);var E=0,D,O,k;if(Or(f))f.forEach(function(e){return _.to(g,e,`>`)}),_.duration();else{for(x in y={},f)x===`ease`||x===`easeEach`||oo(x,f[x],y,f.easeEach);for(x in y)for(D=y[x].sort(function(e,t){return e.t-t.t}),E=0,v=0;v<D.length;v++)O=D[v],k={ease:O.e,duration:(O.t-(v?D[v-1].t:0))/100*s},k[x]=O.v,_.to(g,k,E),E+=k.duration;_.duration()<s&&_.to({},{duration:s-_.duration()})}}s||a.duration(s=_.duration())}else a.timeline=0;return d===!0&&!ur&&(to=or(a),H.killTweensOf(g),to=0),zi(h,or(a),r),n.reversed&&a.reverse(),n.paused&&a.paused(!0),(l||!s&&!f&&a._start===U(h._time)&&wr(l)&&Mi(or(a))&&h.data!==`nested`)&&(a._tTime=-V,a.render(Math.max(0,-c)||0)),m&&Bi(or(a),m),a}var n=t.prototype;return n.render=function(e,t,n){var r=this._time,i=this._tDur,a=this._dur,o=e<0,s=e>i-V&&!o?i:e<V?0:e,c,l,u,d,f,p,m,h;if(!a)Wi(this,e,t,n);else if(s!==this._tTime||!e||n||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==o||this._lazy){if(c=s,h=this.timeline,this._repeat){if(d=a+this._rDelay,this._repeat<-1&&o)return this.totalTime(d*100+e,t,n);if(c=U(s%d),s===i?(u=this._repeat,c=a):(f=U(s/d),u=~~f,u&&u===f?(c=a,u--):c>a&&(c=a)),p=this._yoyo&&u&1,p&&(c=a-c),f=Pi(this._tTime,d),c===r&&!n&&this._initted&&u===f)return this._tTime=s,this;u!==f&&this.vars.repeatRefresh&&!p&&!this._lock&&c!==d&&this._initted&&(this._lock=n=1,this.render(U(d*u),!0).invalidate()._lock=0)}if(!this._initted){if(Vi(this,o?e:c,n,t,s))return this._tTime=0,this;if(r!==this._time&&!(n&&this.vars.repeatRefresh&&u!==f))return this;if(a!==this._dur)return this.render(e,t,n)}if(this._rEase){var g=c<r;if(g!==this._inv){var _=g?r:a-r;this._inv=g,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=r,this._invRecip=_?(g?-1:1)/_:0,this._invScale=g?-this.ratio:1-this.ratio,this._invEase=g?this._rEase:this._ease}this.ratio=m=this._invRatio+this._invScale*this._invEase((c-this._invTime)*this._invRecip)}else this.ratio=m=this._ease(c/a);if(this._from&&(this.ratio=m=1-m),this._tTime=s,this._time=c,!this._act&&this._ts&&(this._act=1,this._lazy=0),!r&&s&&!t&&!f&&(xa(this,`onStart`),this._tTime!==s))return this;for(l=this._pt;l;)l.r(m,l.d),l=l._next;h&&h.render(e<0?e:h._dur*h._ease(c/this._dur),t,n)||this._startAt&&(this._zTime=e),this._onUpdate&&!t&&(o&&ji(this,e,t,n),xa(this,`onUpdate`)),this._repeat&&u!==f&&this.vars.onRepeat&&!t&&this.parent&&xa(this,`onRepeat`),(s===this._tDur||!s)&&this._tTime===s&&(o&&!this._onUpdate&&ji(this,e,!0,!0),(e||!a)&&(s===this._tDur&&this._ts>0||!s&&this._ts<0)&&Oi(this,1),!t&&(!o||r)&&(s||r||p)&&(xa(this,s===i?`onComplete`:`onReverseComplete`,!0),this._prom&&!(s<i&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(t){return(!t||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),e.prototype.invalidate.call(this,t)},n.resetTo=function(e,t,n,r,i){Pa||Fa.wake(),this._ts||this.play();var a=Math.min(this._dur,(this._dp._time-this._start)*this._ts),o;return this._initted||ro(this,a),o=this._ease(a/this._dur),io(this,e,t,n,r,o,a,i)?this.resetTo(e,t,n,r,1):(Li(this,0),this.parent||Ei(this._dp,this,`_first`,`_last`,this._dp._sort?`_start`:0),this.render(0))},n.kill=function(e,t){if(t===void 0&&(t=`all`),!e&&(!t||t===`all`))return this._lazy=this._pt=0,this.parent?Sa(this):this.scrollTrigger&&this.scrollTrigger.kill(!!dr),this;if(this.timeline){var n=this.timeline.totalDuration();return this.timeline.killTweensOf(e,t,to&&to.vars.overwrite!==!0)._first||Sa(this),this.parent&&n!==this.timeline.totalDuration()&&Ki(this,this._dur*this.timeline._tDur/n,0,1),this}var r=this._targets,i=e?ia(e):r,a=this._ptLookup,o=this._pt,s,c,l,u,d,f,p;if((!t||t===`all`)&&Ti(r,i))return t===`all`&&(this._pt=0),Sa(this);for(s=this._op=this._op||[],t!==`all`&&(yr(t)&&(d={},ui(t,function(e){return d[e]=1}),t=d),t=ao(r,t)),p=r.length;p--;)if(~i.indexOf(r[p]))for(d in c=a[p],t===`all`?(s[p]=t,u=c,l={}):(l=s[p]=s[p]||{},u=t),u)f=c&&c[d],f&&((!(`kill`in f.d)||f.d.kill(d)===!0)&&Di(this,f,`_pt`),delete c[d]),l!==`all`&&(l[d]=1);return this._initted&&!this._pt&&o&&Sa(this),this},t.to=function(e,n){return new t(e,n,arguments[2])},t.from=function(e,t){return Xi(1,arguments)},t.delayedCall=function(e,n,r,i){return new t(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:e,onComplete:n,onReverseComplete:n,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},t.fromTo=function(e,t,n){return Xi(2,arguments)},t.set=function(e,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new t(e,n)},t.killTweensOf=function(e,t,n){return H.killTweensOf(e,t,n)},t}(Ya);yi(uo.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),ui(`staggerTo,staggerFrom,staggerFromTo`,function(e){uo[e]=function(){var t=new Xa,n=ta.call(arguments,0);return n.splice(e===`staggerFromTo`?5:4,0,0),t[e].apply(t,n)}});var fo=function(e,t,n){return e[t]=n},po=function(e,t,n){return e[t](n)},mo=function(e,t,n,r){return e[t](r.fp,n)},ho=function(e,t,n){return e.setAttribute(t,n)},go=function(e,t){return br(e[t])?po:Sr(e[t])&&e.setAttribute?ho:fo},_o=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},vo=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},yo=function(e,t){var n=t._pt,r=``;if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},bo=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},xo=function(e,t,n,r){for(var i=this._pt,a;i;)a=i._next,i.p===r&&i.modifier(e,t,n),i=a},So=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Di(this,t,`_pt`):t.dep||(n=1),t=r;return!n},Co=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},wo=function(e){for(var t=e._pt,n,r,i,a;t;){for(n=t._next,r=i;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:i=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=i},To=function(){function e(e,t,n,r,i,a,o,s,c){this.t=t,this.s=r,this.c=i,this.p=n,this.r=a||_o,this.d=o||this,this.set=s||fo,this.pr=c||0,this._next=e,e&&(e._prev=this)}var t=e.prototype;return t.modifier=function(e,t,n){this.mSet=this.mSet||this.set,this.set=Co,this.m=e,this.mt=n,this.tween=t},e}();ui(oi+`parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse`,function(e){return Qr[e]=1}),Vr.TweenMax=Vr.TweenLite=uo,Vr.TimelineLite=Vr.TimelineMax=Xa,H=new Xa({sortChildren:!1,defaults:lr,autoRemoveChildren:!0,id:`root`,smoothChildTiming:!0}),cr.stringFilter=Na;var Eo=[],Do={},Oo=[],ko=0,Ao=0,jo=function(e){return(Do[e]||Oo).map(function(e){return e()})},Mo=function(){var e=Date.now(),t=[];e-ko>2&&(jo(`matchMediaInit`),Eo.forEach(function(e){var n=e.queries,r=e.conditions,i,a,o,s;for(a in n)i=Rr.matchMedia(n[a]).matches,i&&(o=1),i!==r[a]&&(r[a]=i,s=1);s&&(e.revert(),o&&t.push(e))}),jo(`matchMediaRevert`),t.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),ko=e,jo(`matchMedia`))},No=function(){function e(e,t){this.selector=t&&aa(t),this.data=[],this._r=[],this.isReverted=!1,this.id=Ao++,e&&this.add(e)}var t=e.prototype;return t.add=function(e,t,n){br(e)&&(n=t,t=e,e=br);var r=this,i=function(){var e=B,i=r.selector,a;return e&&e!==r&&e.data.push(r),n&&(r.selector=aa(n)),B=r,a=t.apply(r,arguments),br(a)&&r._r.push(a),B=e,r.selector=i,r.isReverted=!1,a};return r.last=i,e===br?i(r,function(e){return r.add(null,e)}):e?r[e]=i:i},t.ignore=function(e){var t=B;B=null,e(this),B=t},t.getTweens=function(){var t=[];return this.data.forEach(function(n){return n instanceof e?t.push.apply(t,n.getTweens()):n instanceof uo&&!(n.parent&&n.parent.data===`nested`)&&t.push(n)}),t},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(e,t){var n=this;if(e?(function(){for(var t=n.getTweens(),r=n.data.length,i;r--;)i=n.data[r],i.data===`isFlip`&&(i.revert(),i.getChildren(!0,!0,!1).forEach(function(e){return t.splice(t.indexOf(e),1)}));for(t.map(function(e){return{g:e._dur||e._delay||e._sat&&!e._sat.vars.immediateRender?e.globalTime(0):-1/0,t:e}}).sort(function(e,t){return t.g-e.g||-1/0}).forEach(function(t){return t.t.revert(e)}),r=n.data.length;r--;)i=n.data[r],i instanceof Xa?i.data!==`nested`&&(i.scrollTrigger&&i.scrollTrigger.revert(),i.kill()):!(i instanceof uo)&&i.revert&&i.revert(e);n._r.forEach(function(t){return t(e,n)}),n.isReverted=!0})():this.data.forEach(function(e){return e.kill&&e.kill()}),this.clear(),t)for(var r=Eo.length;r--;)Eo[r].id===this.id&&Eo.splice(r,1)},t.revert=function(e){this.kill(e||{})},e}(),Po=function(){function e(e){this.contexts=[],this.scope=e,B&&B.data.push(this)}var t=e.prototype;return t.add=function(e,t,n){Cr(e)||(e={matches:e});var r=new No(0,n||this.scope),i=r.conditions={},a,o,s;for(o in B&&!r.selector&&(r.selector=B.selector),this.contexts.push(r),t=r.add(`onMatch`,t),r.queries=e,e)o===`all`?s=1:(a=Rr.matchMedia(e[o]),a&&(Eo.indexOf(r)<0&&Eo.push(r),(i[o]=a.matches)&&(s=1),a.addListener?a.addListener(Mo):a.addEventListener(`change`,Mo)));return s&&t(r,function(e){return r.add(null,e)}),this},t.revert=function(e){this.kill(e||{})},t.kill=function(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},e}(),Fo={registerPlugin:function(){[...arguments].forEach(function(e){return Ta(e)})},timeline:function(e){return new Xa(e)},getTweensOf:function(e,t){return H.getTweensOf(e,t)},getProperty:function(e,t,n,r){yr(e)&&(e=ia(e)[0]);var i=ci(e||{}).get,a=n?vi:_i;return n===`native`&&(n=``),e&&(t?a((ni[t]&&ni[t].get||i)(e,t,n,r)):function(t,n,r){return a((ni[t]&&ni[t].get||i)(e,t,n,r))})},quickSetter:function(e,t,n){if(e=ia(e),e.length>1){var r=e.map(function(e){return zo.quickSetter(e,t,n)}),i=r.length;return function(e){for(var t=i;t--;)r[t](e)}}e=e[0]||{};var a=ni[t],o=ci(e),s=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(t){var r=new a;Ca._pt=0,r.init(e,n?t+n:t,Ca,0,[e]),r.render(1,r),Ca._pt&&bo(1,Ca)}:o.set(e,s);return a?c:function(t){return c(e,s,n?t+n:t,o,1)}},quickTo:function(e,t,n){var r,i=zo.to(e,yi((r={},r[t]=`+=0.1`,r.paused=!0,r.stagger=0,r),n||{})),a=function(e,n,r){return i.resetTo(t,e,n,r)};return a.tween=i,a},isTweening:function(e){return H.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Ua(e.ease,lr.ease)),Si(lr,e||{})},config:function(e){return Si(cr,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,i=e.defaults,a=e.extendTimeline;(r||``).split(`,`).forEach(function(e){return e&&!ni[e]&&!Vr[e]&&Kr(t+` effect requires `+e+` plugin.`)}),ri[t]=function(e,t,r){return n(ia(e),yi(t||{},i),r)},a&&(Xa.prototype[t]=function(e,n,r){return this.add(ri[t](e,Cr(n)?n:(r=n)&&{},this),r)})},registerEase:function(e,t){G[e]=Ua(t)},parseEase:function(e,t){return arguments.length?Ua(e,t):G},getById:function(e){return H.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Xa(e),r,i;for(n.smoothChildTiming=wr(e.smoothChildTiming),H.remove(n),n._dp=0,n._time=n._tTime=H._time,r=H._first;r;)i=r._next,(t||!(!r._dur&&r instanceof uo&&r.vars.onComplete===r._targets[0]))&&zi(n,r,r._start-r._delay),r=i;return zi(H,n,0),n},context:function(e,t){return e?new No(e,t):B},matchMedia:function(e){return new Po(e)},matchMediaRefresh:function(){return Eo.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||Mo()},addEventListener:function(e,t){var n=Do[e]||(Do[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Do[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:ha,wrapYoyo:ga,distribute:sa,random:ua,snap:la,normalize:pa,getUnit:$i,clamp:ea,splitColor:Oa,toArray:ia,selector:aa,mapRange:va,pipe:da,unitize:fa,interpolate:ya,shuffle:oa},install:Wr,effects:ri,ticker:Fa,updateRoot:Xa.updateRoot,plugins:ni,globalTimeline:H,core:{PropTween:To,globals:qr,Tween:uo,Timeline:Xa,Animation:Ya,getCache:ci,_removeLinkedListItem:Di,reverting:function(){return dr},context:function(e){return e&&B&&(B.data.push(e),e._ctx=B),B},suppressOverwrites:function(e){return ur=e}}};ui(`to,from,fromTo,delayedCall,set,killTweensOf`,function(e){return Fo[e]=uo[e]}),Fa.add(Xa.updateRoot),Ca=Fo.to({},{duration:0});var Io=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},Lo=function(e,t){var n=e._targets,r,i,a;for(r in t)for(i=n.length;i--;)a=e._ptLookup[i][r],(a&&=a.d)&&(a._pt&&(a=Io(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[i],r))},Ro=function(e,t){return{name:e,headless:1,rawVars:1,init:function(e,n,r){r._onInit=function(e){var r,i;if(yr(n)&&(r={},ui(n,function(e){return r[e]=1}),n=r),t){for(i in r={},n)r[i]=t(n[i]);n=r}Lo(e,n)}}}},zo=Fo.registerPlugin({name:`attr`,init:function(e,t,n,r,i){var a,o,s;for(a in this.tween=n,t)s=e.getAttribute(a)||``,o=this.add(e,`setAttribute`,(s||0)+``,t[a],r,i,0,0,a),o.op=a,o.b=s,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)dr?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:`endArray`,headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Ro(`roundProps`,ca),Ro(`modifiers`),Ro(`snap`,la))||Fo;uo.version=Xa.version=zo.version=`3.15.0`,Ur=1,Tr()&&Ia(),G.Power0,G.Power1,G.Power2,G.Power3,G.Power4,G.Linear,G.Quad,G.Cubic,G.Quart,G.Quint,G.Strong,G.Elastic,G.Back,G.SteppedEase,G.Bounce,G.Sine,G.Expo,G.Circ;var Bo,Vo,Ho,Uo,Wo,Go,Ko,qo=function(){return typeof window<`u`},Jo={},Yo=180/Math.PI,Xo=Math.PI/180,Zo=Math.atan2,Qo=1e8,$o=/([A-Z])/g,es=/(left|right|width|margin|padding|x)/i,ts=/[\s,\(]\S/,ns={autoAlpha:`opacity,visibility`,scale:`scaleX,scaleY`,alpha:`opacity`},rs=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},is=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},as=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},os=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},ss=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},cs=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},ls=function(e,t){return t.set(t.t,t.p,e===1?t.e:t.b,t)},us=function(e,t,n){return e.style[t]=n},ds=function(e,t,n){return e.style.setProperty(t,n)},fs=function(e,t,n){return e._gsap[t]=n},ps=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},ms=function(e,t,n,r,i){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(i,a)},hs=function(e,t,n,r,i){var a=e._gsap;a[t]=n,a.renderTransform(i,a)},gs=`transform`,_s=gs+`Origin`,vs=function e(t,n){var r=this,i=this.target,a=i.style,o=i._gsap;if(t in Jo&&a){if(this.tfm=this.tfm||{},t!==`transform`)t=ns[t]||t,~t.indexOf(`,`)?t.split(`,`).forEach(function(e){return r.tfm[e]=Ls(i,e)}):this.tfm[t]=o.x?o[t]:Ls(i,t),t===_s&&(this.tfm.zOrigin=o.zOrigin);else return ns.transform.split(`,`).forEach(function(t){return e.call(r,t,n)});if(this.props.indexOf(gs)>=0)return;o.svg&&(this.svgo=i.getAttribute(`data-svg-origin`),this.props.push(_s,n,``)),t=gs}(a||n)&&this.props.push(t,n,a[t])},ys=function(e){e.translate&&(e.removeProperty(`translate`),e.removeProperty(`scale`),e.removeProperty(`rotate`))},bs=function(){for(var e=this.props,t=this.target,n=t.style,r=t._gsap,i=0,a;i<e.length;i+=3)e[i+1]?e[i+1]===2?t[e[i]](e[i+2]):t[e[i]]=e[i+2]:e[i+2]?n[e[i]]=e[i+2]:n.removeProperty(e[i].substr(0,2)===`--`?e[i]:e[i].replace($o,`-$1`).toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute(`data-svg-origin`,this.svgo||``)),i=Ko(),(!i||!i.isStart)&&!n[gs]&&(ys(n),r.zOrigin&&n[_s]&&(n[_s]+=` `+r.zOrigin+`px`,r.zOrigin=0,r.renderTransform()),r.uncache=1)}},xs=function(e,t){var n={target:e,props:[],revert:bs,save:vs};return e._gsap||zo.core.getCache(e),t&&e.style&&e.nodeType&&t.split(`,`).forEach(function(e){return n.save(e)}),n},Ss,Cs=function(e,t){var n=Vo.createElementNS?Vo.createElementNS((t||`http://www.w3.org/1999/xhtml`).replace(/^https/,`http`),e):Vo.createElement(e);return n&&n.style?n:Vo.createElement(e)},ws=function e(t,n,r){var i=getComputedStyle(t);return i[n]||i.getPropertyValue(n.replace($o,`-$1`).toLowerCase())||i.getPropertyValue(n)||!r&&e(t,Es(n)||n,1)||``},Ts=`O,Moz,ms,Ms,Webkit`.split(`,`),Es=function(e,t,n){var r=(t||Wo).style,i=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);i--&&!(Ts[i]+e in r););return i<0?null:(i===3?`ms`:i>=0?Ts[i]:``)+e},Ds=function(){qo()&&window.document&&(Bo=window,Vo=Bo.document,Ho=Vo.documentElement,Wo=Cs(`div`)||{style:{}},Cs(`div`),gs=Es(gs),_s=gs+`Origin`,Wo.style.cssText=`border-width:0;line-height:0;position:absolute;padding:0`,Ss=!!Es(`perspective`),Ko=zo.core.reverting,Uo=1)},Os=function(e){var t=e.ownerSVGElement,n=Cs(`svg`,t&&t.getAttribute(`xmlns`)||`http://www.w3.org/2000/svg`),r=e.cloneNode(!0),i;r.style.display=`block`,n.appendChild(r),Ho.appendChild(n);try{i=r.getBBox()}catch{}return n.removeChild(r),Ho.removeChild(n),i},ks=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},As=function(e){var t,n;try{t=e.getBBox()}catch{t=Os(e),n=1}return t&&(t.width||t.height)||n||(t=Os(e)),t&&!t.width&&!t.x&&!t.y?{x:+ks(e,[`x`,`cx`,`x1`])||0,y:+ks(e,[`y`,`cy`,`y1`])||0,width:0,height:0}:t},js=function(e){return!(!e.getCTM||e.parentNode&&!e.ownerSVGElement||!As(e))},Ms=function(e,t){if(t){var n=e.style,r;t in Jo&&t!==_s&&(t=gs),n.removeProperty?(r=t.substr(0,2),(r===`ms`||t.substr(0,6)===`webkit`)&&(t=`-`+t),n.removeProperty(r===`--`?t:t.replace($o,`-$1`).toLowerCase())):n.removeAttribute(t)}},Ns=function(e,t,n,r,i,a){var o=new To(e._pt,t,n,0,1,a?ls:cs);return e._pt=o,o.b=r,o.e=i,e._props.push(n),o},Ps={deg:1,rad:1,turn:1},Fs={grid:1,flex:1},Is=function e(t,n,r,i){var a=parseFloat(r)||0,o=(r+``).trim().substr((a+``).length)||`px`,s=Wo.style,c=es.test(n),l=t.tagName.toLowerCase()===`svg`,u=(l?`client`:`offset`)+(c?`Width`:`Height`),d=100,f=i===`px`,p=i===`%`,m,h,g,_;if(i===o||!a||Ps[i]||Ps[o])return a;if(o!==`px`&&!f&&(a=e(t,n,r,`px`)),_=t.getCTM&&js(t),(p||o===`%`)&&(Jo[n]||~n.indexOf(`adius`)))return m=_?t.getBBox()[c?`width`:`height`]:t[u],di(p?a/m*d:a/100*m);if(s[c?`width`:`height`]=d+(f?o:i),h=i!==`rem`&&~n.indexOf(`adius`)||i===`em`&&t.appendChild&&!l?t:t.parentNode,_&&(h=(t.ownerSVGElement||{}).parentNode),(!h||h===Vo||!h.appendChild)&&(h=Vo.body),g=h._gsap,g&&p&&g.width&&c&&g.time===Fa.time&&!g.uncache)return di(a/g.width*d);if(p&&(n===`height`||n===`width`)){var v=t.style[n];t.style[n]=d+i,m=t[u],v?t.style[n]=v:Ms(t,n)}else(p||o===`%`)&&!Fs[ws(h,`display`)]&&(s.position=ws(t,`position`)),h===t&&(s.position=`static`),h.appendChild(Wo),m=Wo[u],h.removeChild(Wo),s.position=`absolute`;return c&&p&&(g=ci(h),g.time=Fa.time,g.width=h[u]),di(f?m*a/d:m&&a?d/m*a:0)},Ls=function(e,t,n,r){var i;return Uo||Ds(),t in ns&&t!==`transform`&&(t=ns[t],~t.indexOf(`,`)&&(t=t.split(`,`)[0])),Jo[t]&&t!==`transform`?(i=Ys(e,r),i=t===`transformOrigin`?i.svg?i.origin:Xs(ws(e,_s))+` `+i.zOrigin+`px`:i[t]):(i=e.style[t],(!i||i===`auto`||r||~(i+``).indexOf(`calc(`))&&(i=Hs[t]&&Hs[t](e,t,n)||ws(e,t)||li(e,t)||+(t===`opacity`))),n&&!~(i+``).trim().indexOf(` `)?Is(e,t,i,n)+n:i},Rs=function(e,t,n,r){if(!n||n===`none`){var i=Es(t,e,1),a=i&&ws(e,i,1);a&&a!==n?(t=i,n=a):t===`borderColor`&&(n=ws(e,`borderTopColor`))}var o=new To(this._pt,e.style,t,0,1,yo),s=0,c=0,l,u,d,f,p,m,h,g,_,v,y,b;if(o.b=n,o.e=r,n+=``,r+=``,r.substring(0,6)===`var(--`&&(r=ws(e,r.substring(4,r.indexOf(`)`)))),r===`auto`&&(m=e.style[t],e.style[t]=r,r=ws(e,t)||r,m?e.style[t]=m:Ms(e,t)),l=[n,r],Na(l),n=l[0],r=l[1],d=n.match(Nr)||[],b=r.match(Nr)||[],b.length){for(;u=Nr.exec(r);)h=u[0],_=r.substring(s,u.index),p?p=(p+1)%5:(_.substr(-5)===`rgba(`||_.substr(-5)===`hsla(`)&&(p=1),h!==(m=d[c++]||``)&&(f=parseFloat(m)||0,y=m.substr((f+``).length),h.charAt(1)===`=`&&(h=fi(f,h)+y),g=parseFloat(h),v=h.substr((g+``).length),s=Nr.lastIndex-v.length,v||(v=v||cr.units[t]||y,s===r.length&&(r+=v,o.e+=v)),y!==v&&(f=Is(e,t,m,v)||0),o._pt={_next:o._pt,p:_||c===1?_:`,`,s:f,c:g-f,m:p&&p<4||t===`zIndex`?Math.round:0});o.c=s<r.length?r.substring(s,r.length):``}else o.r=t===`display`&&r===`none`?ls:cs;return Fr.test(r)&&(o.e=0),this._pt=o,o},zs={top:`0%`,bottom:`100%`,left:`0%`,right:`100%`,center:`50%`},Bs=function(e){var t=e.split(` `),n=t[0],r=t[1]||`50%`;return(n===`top`||n===`bottom`||r===`left`||r===`right`)&&(e=n,n=r,r=e),t[0]=zs[n]||n,t[1]=zs[r]||r,t.join(` `)},Vs=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,i=t.u,a=n._gsap,o,s,c;if(i===`all`||i===!0)r.cssText=``,s=1;else for(i=i.split(`,`),c=i.length;--c>-1;)o=i[c],Jo[o]&&(s=1,o=o===`transformOrigin`?_s:gs),Ms(n,o);s&&(Ms(n,gs),a&&(a.svg&&n.removeAttribute(`transform`),r.scale=r.rotate=r.translate=`none`,Ys(n,1),a.uncache=1,ys(r)))}},Hs={clearProps:function(e,t,n,r,i){if(i.data!==`isFromStart`){var a=e._pt=new To(e._pt,t,n,0,0,Vs);return a.u=r,a.pr=-10,a.tween=i,e._props.push(n),1}}},Us=[1,0,0,1,0,0],Ws={},Gs=function(e){return e===`matrix(1, 0, 0, 1, 0, 0)`||e===`none`||!e},Ks=function(e){var t=ws(e,gs);return Gs(t)?Us:t.substr(7).match(Mr).map(di)},qs=function(e,t){var n=e._gsap||ci(e),r=e.style,i=Ks(e),a,o,s,c;return n.svg&&e.getAttribute(`transform`)?(s=e.transform.baseVal.consolidate().matrix,i=[s.a,s.b,s.c,s.d,s.e,s.f],i.join(`,`)===`1,0,0,1,0,0`?Us:i):(i===Us&&!e.offsetParent&&e!==Ho&&!n.svg&&(s=r.display,r.display=`block`,a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,Ho.appendChild(e)),i=Ks(e),s?r.display=s:Ms(e,`display`),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):Ho.removeChild(e))),t&&i.length>6?[i[0],i[1],i[4],i[5],i[12],i[13]]:i)},Js=function(e,t,n,r,i,a){var o=e._gsap,s=i||qs(e,!0),c=o.xOrigin||0,l=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,f=s[0],p=s[1],m=s[2],h=s[3],g=s[4],_=s[5],v=t.split(` `),y=parseFloat(v[0])||0,b=parseFloat(v[1])||0,x,S,C,w;n?s!==Us&&(S=f*h-p*m)&&(C=h/S*y+b*(-m/S)+(m*_-h*g)/S,w=y*(-p/S)+f/S*b-(f*_-p*g)/S,y=C,b=w):(x=As(e),y=x.x+(~v[0].indexOf(`%`)?y/100*x.width:y),b=x.y+(~(v[1]||v[0]).indexOf(`%`)?b/100*x.height:b)),r||r!==!1&&o.smooth?(g=y-c,_=b-l,o.xOffset=u+(g*f+_*m)-g,o.yOffset=d+(g*p+_*h)-_):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=b,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[_s]=`0px 0px`,a&&(Ns(a,o,`xOrigin`,c,y),Ns(a,o,`yOrigin`,l,b),Ns(a,o,`xOffset`,u,o.xOffset),Ns(a,o,`yOffset`,d,o.yOffset)),e.setAttribute(`data-svg-origin`,y+` `+b)},Ys=function(e,t){var n=e._gsap||new Ja(e);if(`x`in n&&!t&&!n.uncache)return n;var r=e.style,i=n.scaleX<0,a=`px`,o=`deg`,s=getComputedStyle(e),c=ws(e,_s)||`0`,l=u=d=m=h=g=_=v=y=0,u,d,f=p=1,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,ee,te,ne,re,ie,ae,oe,se;return n.svg=!!(e.getCTM&&js(e)),s.translate&&((s.translate!==`none`||s.scale!==`none`||s.rotate!==`none`)&&(r[gs]=(s.translate===`none`?``:`translate3d(`+(s.translate+` 0 0`).split(` `).slice(0,3).join(`, `)+`) `)+(s.rotate===`none`?``:`rotate(`+s.rotate+`) `)+(s.scale===`none`?``:`scale(`+s.scale.split(` `).join(`,`)+`) `)+(s[gs]===`none`?``:s[gs])),r.scale=r.rotate=r.translate=`none`),S=qs(e,n.svg),n.svg&&(n.uncache?(ee=e.getBBox(),c=n.xOrigin-ee.x+`px `+(n.yOrigin-ee.y)+`px`,M=``):M=!t&&e.getAttribute(`data-svg-origin`),Js(e,M||c,!!M||n.originIsAbsolute,n.smooth!==!1,S)),b=n.xOrigin||0,x=n.yOrigin||0,S!==Us&&(E=S[0],D=S[1],O=S[2],k=S[3],l=A=S[4],u=j=S[5],S.length===6?(f=Math.sqrt(E*E+D*D),p=Math.sqrt(k*k+O*O),m=E||D?Zo(D,E)*Yo:0,_=O||k?Zo(O,k)*Yo+m:0,_&&(p*=Math.abs(Math.cos(_*Xo))),n.svg&&(l-=b-(b*E+x*O),u-=x-(b*D+x*k))):(se=S[6],ae=S[7],ne=S[8],re=S[9],ie=S[10],oe=S[11],l=S[12],u=S[13],d=S[14],C=Zo(se,ie),h=C*Yo,C&&(w=Math.cos(-C),T=Math.sin(-C),M=A*w+ne*T,ee=j*w+re*T,te=se*w+ie*T,ne=A*-T+ne*w,re=j*-T+re*w,ie=se*-T+ie*w,oe=ae*-T+oe*w,A=M,j=ee,se=te),C=Zo(-O,ie),g=C*Yo,C&&(w=Math.cos(-C),T=Math.sin(-C),M=E*w-ne*T,ee=D*w-re*T,te=O*w-ie*T,oe=k*T+oe*w,E=M,D=ee,O=te),C=Zo(D,E),m=C*Yo,C&&(w=Math.cos(C),T=Math.sin(C),M=E*w+D*T,ee=A*w+j*T,D=D*w-E*T,j=j*w-A*T,E=M,A=ee),h&&Math.abs(h)+Math.abs(m)>359.9&&(h=m=0,g=180-g),f=di(Math.sqrt(E*E+D*D+O*O)),p=di(Math.sqrt(j*j+se*se)),C=Zo(A,j),_=Math.abs(C)>2e-4?C*Yo:0,y=oe?1/(oe<0?-oe:oe):0),n.svg&&(M=e.getAttribute(`transform`),n.forceCSS=e.setAttribute(`transform`,``)||!Gs(ws(e,gs)),M&&e.setAttribute(`transform`,M))),Math.abs(_)>90&&Math.abs(_)<270&&(i?(f*=-1,_+=m<=0?180:-180,m+=m<=0?180:-180):(p*=-1,_+=_<=0?180:-180)),t||=n.uncache,n.x=l-((n.xPercent=l&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-l)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=di(f),n.scaleY=di(p),n.rotation=di(m)+o,n.rotationX=di(h)+o,n.rotationY=di(g)+o,n.skewX=_+o,n.skewY=v+o,n.transformPerspective=y+a,(n.zOrigin=parseFloat(c.split(` `)[2])||!t&&n.zOrigin||0)&&(r[_s]=Xs(c)),n.xOffset=n.yOffset=0,n.force3D=cr.force3D,n.renderTransform=n.svg?rc:Ss?nc:Qs,n.uncache=0,n},Xs=function(e){return(e=e.split(` `))[0]+` `+e[1]},Zs=function(e,t,n){var r=$i(t);return di(parseFloat(t)+parseFloat(Is(e,`x`,n+`px`,r)))+r},Qs=function(e,t){t.z=`0px`,t.rotationY=t.rotationX=`0deg`,t.force3D=0,nc(e,t)},$s=`0deg`,ec=`0px`,tc=`) `,nc=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.z,c=n.rotation,l=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,p=n.scaleX,m=n.scaleY,h=n.transformPerspective,g=n.force3D,_=n.target,v=n.zOrigin,y=``,b=g===`auto`&&e&&e!==1||g===!0;if(v&&(u!==$s||l!==$s)){var x=parseFloat(l)*Xo,S=Math.sin(x),C=Math.cos(x),w;x=parseFloat(u)*Xo,w=Math.cos(x),a=Zs(_,a,S*w*-v),o=Zs(_,o,-Math.sin(x)*-v),s=Zs(_,s,C*w*-v+v)}h!==ec&&(y+=`perspective(`+h+tc),(r||i)&&(y+=`translate(`+r+`%, `+i+`%) `),(b||a!==ec||o!==ec||s!==ec)&&(y+=s!==ec||b?`translate3d(`+a+`, `+o+`, `+s+`) `:`translate(`+a+`, `+o+tc),c!==$s&&(y+=`rotate(`+c+tc),l!==$s&&(y+=`rotateY(`+l+tc),u!==$s&&(y+=`rotateX(`+u+tc),(d!==$s||f!==$s)&&(y+=`skew(`+d+`, `+f+tc),(p!==1||m!==1)&&(y+=`scale(`+p+`, `+m+tc),_.style[gs]=y||`translate(0, 0)`},rc=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.rotation,c=n.skewX,l=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,p=n.xOrigin,m=n.yOrigin,h=n.xOffset,g=n.yOffset,_=n.forceCSS,v=parseFloat(a),y=parseFloat(o),b,x,S,C,w;s=parseFloat(s),c=parseFloat(c),l=parseFloat(l),l&&(l=parseFloat(l),c+=l,s+=l),s||c?(s*=Xo,c*=Xo,b=Math.cos(s)*u,x=Math.sin(s)*u,S=Math.sin(s-c)*-d,C=Math.cos(s-c)*d,c&&(l*=Xo,w=Math.tan(c-l),w=Math.sqrt(1+w*w),S*=w,C*=w,l&&(w=Math.tan(l),w=Math.sqrt(1+w*w),b*=w,x*=w)),b=di(b),x=di(x),S=di(S),C=di(C)):(b=u,C=d,x=S=0),(v&&!~(a+``).indexOf(`px`)||y&&!~(o+``).indexOf(`px`))&&(v=Is(f,`x`,a,`px`),y=Is(f,`y`,o,`px`)),(p||m||h||g)&&(v=di(v+p-(p*b+m*S)+h),y=di(y+m-(p*x+m*C)+g)),(r||i)&&(w=f.getBBox(),v=di(v+r/100*w.width),y=di(y+i/100*w.height)),w=`matrix(`+b+`,`+x+`,`+S+`,`+C+`,`+v+`,`+y+`)`,f.setAttribute(`transform`,w),_&&(f.style[gs]=w)},ic=function(e,t,n,r,i){var a=360,o=yr(i),s=parseFloat(i)*(o&&~i.indexOf(`rad`)?Yo:1)-r,c=r+s+`deg`,l,u;return o&&(l=i.split(`_`)[1],l===`short`&&(s%=a,s!==s%(a/2)&&(s+=s<0?a:-a)),l===`cw`&&s<0?s=(s+a*Qo)%a-~~(s/a)*a:l===`ccw`&&s>0&&(s=(s-a*Qo)%a-~~(s/a)*a)),e._pt=u=new To(e._pt,t,n,r,s,is),u.e=c,u.u=`deg`,e._props.push(n),u},ac=function(e,t){for(var n in t)e[n]=t[n];return e},oc=function(e,t,n){var r=ac({},n._gsap),i=`perspective,force3D,transformOrigin,svgOrigin`,a=n.style,o,s,c,l,u,d,f,p;for(s in r.svg?(c=n.getAttribute(`transform`),n.setAttribute(`transform`,``),a[gs]=t,o=Ys(n,1),Ms(n,gs),n.setAttribute(`transform`,c)):(c=getComputedStyle(n)[gs],a[gs]=t,o=Ys(n,1),a[gs]=c),Jo)c=r[s],l=o[s],c!==l&&i.indexOf(s)<0&&(f=$i(c),p=$i(l),u=f===p?parseFloat(c):Is(n,s,c,p),d=parseFloat(l),e._pt=new To(e._pt,o,s,u,d-u,rs),e._pt.u=p||0,e._props.push(s));ac(o,r)};ui(`padding,margin,Width,Radius`,function(e,t){var n=`Top`,r=`Right`,i=`Bottom`,a=`Left`,o=(t<3?[n,r,i,a]:[n+a,n+r,i+r,i+a]).map(function(n){return t<2?e+n:`border`+n+e});Hs[t>1?`border`+e:e]=function(e,t,n,r,i){var a,s;if(arguments.length<4)return a=o.map(function(t){return Ls(e,t,n)}),s=a.join(` `),s.split(a[0]).length===5?a[0]:s;a=(r+``).split(` `),s={},o.forEach(function(e,t){return s[e]=a[t]=a[t]||a[(t-1)/2|0]}),e.init(t,s,i)}});var sc={name:`css`,register:Ds,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,i){var a=this._props,o=e.style,s=n.vars.startAt,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;for(m in Uo||Ds(),this.styles=this.styles||xs(e),C=this.styles.props,this.tween=n,t)if(m!==`autoRound`&&(l=t[m],!(ni[m]&&eo(m,t,n,r,e,i)))){if(f=typeof l,p=Hs[m],f===`function`&&(l=l.call(n,r,e,i),f=typeof l),f===`string`&&~l.indexOf(`random(`)&&(l=_a(l)),p)p(this,e,m,l,n)&&(S=1);else if(m.substr(0,2)===`--`)c=(getComputedStyle(e).getPropertyValue(m)+``).trim(),l+=``,ja.lastIndex=0,ja.test(c)||(h=$i(c),g=$i(l),g?h!==g&&(c=Is(e,m,c,g)+g):h&&(l+=h)),this.add(o,`setProperty`,c,l,r,i,0,0,m),a.push(m),C.push(m,0,o[m]);else if(f!==`undefined`){if(s&&m in s?(c=typeof s[m]==`function`?s[m].call(n,r,e,i):s[m],yr(c)&&~c.indexOf(`random(`)&&(c=_a(c)),$i(c+``)||c===`auto`||(c+=cr.units[m]||$i(Ls(e,m))||``),(c+``).charAt(1)===`=`&&(c=Ls(e,m))):c=Ls(e,m),d=parseFloat(c),_=f===`string`&&l.charAt(1)===`=`&&l.substr(0,2),_&&(l=l.substr(2)),u=parseFloat(l),m in ns&&(m===`autoAlpha`&&(d===1&&Ls(e,`visibility`)===`hidden`&&u&&(d=0),C.push(`visibility`,0,o.visibility),Ns(this,o,`visibility`,d?`inherit`:`hidden`,u?`inherit`:`hidden`,!u)),m!==`scale`&&m!==`transform`&&(m=ns[m],~m.indexOf(`,`)&&(m=m.split(`,`)[0]))),v=m in Jo,v){if(this.styles.save(m),w=l,f===`string`&&l.substring(0,6)===`var(--`){if(l=ws(e,l.substring(4,l.indexOf(`)`))),l.substring(0,5)===`calc(`){var T=e.style.perspective;e.style.perspective=l,l=ws(e,`perspective`),T?e.style.perspective=T:Ms(e,`perspective`)}u=parseFloat(l)}if(y||(b=e._gsap,b.renderTransform&&!t.parseTransform||Ys(e,t.parseTransform),x=t.smoothOrigin!==!1&&b.smooth,y=this._pt=new To(this._pt,o,gs,0,1,b.renderTransform,b,0,-1),y.dep=1),m===`scale`)this._pt=new To(this._pt,b,`scaleY`,b.scaleY,(_?fi(b.scaleY,_+u):u)-b.scaleY||0,rs),this._pt.u=0,a.push(`scaleY`,m),m+=`X`;else if(m===`transformOrigin`){C.push(_s,0,o[_s]),l=Bs(l),b.svg?Js(e,l,0,x,0,this):(g=parseFloat(l.split(` `)[2])||0,g!==b.zOrigin&&Ns(this,b,`zOrigin`,b.zOrigin,g),Ns(this,o,m,Xs(c),Xs(l)));continue}else if(m===`svgOrigin`){Js(e,l,1,x,0,this);continue}else if(m in Ws){ic(this,b,m,d,_?fi(d,_+l):l);continue}else if(m===`smoothOrigin`){Ns(this,b,`smooth`,b.smooth,l);continue}else if(m===`force3D`){b[m]=l;continue}else if(m===`transform`){oc(this,l,e);continue}}else m in o||(m=Es(m)||m);if(v||(u||u===0)&&(d||d===0)&&!ts.test(l)&&m in o)h=(c+``).substr((d+``).length),u||=0,g=$i(l)||(m in cr.units?cr.units[m]:h),h!==g&&(d=Is(e,m,c,g)),this._pt=new To(this._pt,v?b:o,m,d,(_?fi(d,_+u):u)-d,!v&&(g===`px`||m===`zIndex`)&&t.autoRound!==!1?ss:rs),this._pt.u=g||0,v&&w!==l?(this._pt.b=c,this._pt.e=w,this._pt.r=os):h!==g&&g!==`%`&&(this._pt.b=c,this._pt.r=as);else if(m in o)Rs.call(this,e,m,c,_?_+l:l);else if(m in e)this.add(e,m,c||e[m],_?_+l:l,r,i);else if(m!==`parseTransform`){Gr(m,l);continue}v||(m in o?C.push(m,0,o[m]):typeof e[m]==`function`?C.push(m,2,e[m]()):C.push(m,1,c||e[m])),a.push(m)}}S&&wo(this)},render:function(e,t){if(t.tween._time||!Ko())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Ls,aliases:ns,getSetter:function(e,t,n){var r=ns[t];return r&&r.indexOf(`,`)<0&&(t=r),t in Jo&&t!==_s&&(e._gsap.x||Ls(e,`x`))?n&&Go===n?t===`scale`?ps:fs:(Go=n||{})&&(t===`scale`?ms:hs):e.style&&!Sr(e.style[t])?us:~t.indexOf(`-`)?ds:go(e,t)},core:{_removeProperty:Ms,_getMatrix:qs}};zo.utils.checkPrefix=Es,zo.core.getStyleSaver=xs,(function(e,t,n,r){var i=ui(e+`,`+t+`,`+n,function(e){Jo[e]=1});ui(t,function(e){cr.units[e]=`deg`,Ws[e]=1}),ns[i[13]]=e+`,`+t,ui(r,function(e){var t=e.split(`:`);ns[t[1]]=i[t[0]]})})(`x,y,z,scale,scaleX,scaleY,xPercent,yPercent`,`rotation,rotationX,rotationY,skewX,skewY`,`transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective`,`0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY`),ui(`x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective`,function(e){cr.units[e]=`px`}),zo.registerPlugin(sc);var cc=zo.registerPlugin(sc)||zo;cc.core.Tween,cc.defaults({duration:.32,ease:`power2.out`});var lc=window.matchMedia(`(prefers-reduced-motion: reduce)`),uc=()=>!lc.matches&&!R().reduceMotion;function dc(){document.documentElement.classList.toggle(`reduce-motion`,!uc())}lc.addEventListener(`change`,dc);var fc=[`.language`,`.welcome`,`.step-options`,`.options`,`.med-list`,`.section`,`.tiles`,`.entries`,`.coming`,`.episode-started`,`.profile-section`,`.form-stack`,`.stack`,`.intensity-list`,`.sym-rows`].join(`,`);function pc(e){let t=[];for(let n of e.children)n.matches(`legend, .visually-hidden`)||(n.matches(fc)?t.push(...pc(n)):t.push(n));return t}var mc=0,hc=null;function gc(e){let t=e.querySelector(`.screen`);if(!t)return;let n=t.querySelectorAll(`.progress__seg.is-done`),r=t.querySelector(`.tabbar__item[aria-current]`),i=mc,a=hc;if(mc=n.length,hc=r?.getAttribute(`href`)??null,!uc())return;let o=t.querySelector(`.screen__body`),s=o?pc(o):[];cc.from(s,{opacity:0,y:10,duration:.4,stagger:Math.min(.05,.4/Math.max(s.length,1)),clearProps:`transform,opacity`});let c=t.querySelectorAll(`.screen__footer > *`);c.length&&cc.from(c,{opacity:0,delay:.12,stagger:.05,clearProps:`opacity`}),n.length>i&&cc.from([...n].slice(i),{scaleX:0,transformOrigin:`left center`,duration:.45,ease:`power2.inOut`,clearProps:`transform`}),r&&a!==hc&&cc.from(r.querySelector(`.tabbar__icon`),{scaleX:.5,autoAlpha:0,duration:.28,clearProps:`all`});let l=t.querySelector(`.episode-started .icon-badge`);l&&cc.from(l,{scale:.7,duration:.5,ease:`back.out(1.4)`,clearProps:`transform`})}function _c(e){if(!uc()||!e.checked)return;let t=e.closest(`.option`)?.querySelector(`.option__control`);t&&cc.fromTo(t,{scale:.75},{scale:1,duration:.3,ease:`back.out(2)`,clearProps:`transform`})}function vc(e){uc()&&e&&cc.from(e,{autoAlpha:0,y:-6,duration:.3,clearProps:`transform,opacity,visibility`})}function yc(e){return!uc()||!e?Promise.resolve():new Promise(t=>{cc.to(e,{autoAlpha:0,scale:.98,duration:.22,ease:`power1.in`,onComplete:t})})}function bc(e){uc()&&cc.from(e,{autoAlpha:0,y:12,duration:.28,clearProps:`transform,opacity,visibility`})}function xc(e,t){if(!uc())return t();cc.to(e,{autoAlpha:0,y:8,duration:.2,ease:`power1.in`,onComplete:t})}function Sc(e){uc()&&cc.fromTo(e,{opacity:0,y:8,scale:.97},{opacity:1,y:0,scale:1,duration:.25,clearProps:`transform,opacity`})}var Cc=[`light`,`dark`,`system`],wc=window.matchMedia(`(prefers-color-scheme: dark)`),Tc=`system`;function Ec(e=Tc){Tc=Cc.includes(e)?e:`system`;let t=Tc===`system`?wc.matches?`dark`:`light`:Tc;document.documentElement.dataset.theme=t;let n=getComputedStyle(document.documentElement).getPropertyValue(`--color-bg`).trim();document.querySelector(`meta[name="theme-color"]`)?.setAttribute(`content`,n)}wc.addEventListener(`change`,()=>{Tc===`system`&&Ec()});var Dc=null,Oc=0,kc=()=>Oc>0;async function Ac(e){Oc+=1;try{return await e()}finally{--Oc}}function jc(e){ke(e),er(R().language??te()??`sk`),Ec(R().theme),dc(),Ut(),Ie()&&R().demoEnabled&&R().demoSeededAt!==N()&&Wt(Yn())}function Mc(){M()?(er(te()??`sk`),Ec(ne()??`system`),dc()):jc(ce())}var Nc=()=>ee();function Pc(e){M()&&(Dc=e&&e!==`/lock`?e:Dc,he(),Ae())}function Fc(){Pc(`/today`),a(`/lock`,{replace:!0})}function Ic(e){e&&e!==`/lock`&&(Dc=e)}function Lc(){let e=Dc??`/today`;return Dc=null,e}function Rc(){Le(),R().demoEnabled&&Wt(Yn()),a(`/today`,{replace:!0})}var zc=[`sleep`,`steps`,`restingHr`],Bc={sleep:`sleep`,steps:`steps`,restingHr:`restingHeartRate`},Vc=90,Hc=7,Uc=9e5,Wc=[`awake`,`inBed`],Gc=()=>Zt.isNativePlatform(),Kc=()=>Zt.getPlatform()===`ios`?`apple_health`:`health_connect`;function qc(e){let t=new Map;for(let n of e){let e=(n.stages?.length?n.stages.map(e=>({state:e.stage,minutes:e.durationMinutes})):[{state:n.sleepState,minutes:n.value}]).filter(e=>!Wc.includes(e.state)).reduce((e,t)=>e+t.minutes,0);if(e<=0)continue;let r=N(n.endDate),i=n.sourceId??n.sourceName??`unknown`;t.has(r)||t.set(r,new Map);let a=t.get(r).get(i)??{minutes:0,bedtime:n.startDate,wakeTime:n.endDate};a.minutes+=e,n.startDate<a.bedtime&&(a.bedtime=n.startDate),n.endDate>a.wakeTime&&(a.wakeTime=n.endDate),t.get(r).set(i,a)}return[...t].map(([e,t])=>({date:e,...[...t.values()].sort((e,t)=>t.minutes-e.minutes)[0]}))}async function Jc(e,t){let n=new Date,r=F(n,-t);r.setHours(0,0,0,0);let i={startDate:r.toISOString(),endDate:n.toISOString()},a=Kc(),o=new Map,s=e=>(o.has(e)||o.set(e,{date:e,steps:null,restingHr:null,source:a,externalId:null}),o.get(e));if(e.includes(`steps`)){let{samples:e}=await Rn.queryAggregated({dataType:`steps`,...i,bucket:`day`,aggregation:`sum`});for(let t of e)s(N(t.startDate)).steps=Math.round(t.value)}if(e.includes(`restingHr`)){let{samples:e}=await Rn.queryAggregated({dataType:`restingHeartRate`,...i,bucket:`day`,aggregation:`average`});for(let t of e)s(N(t.startDate)).restingHr=Math.round(t.value)}let c=[];if(e.includes(`sleep`)){let{samples:e}=await Rn.readSamples({dataType:`sleep`,...i,limit:t*40,ascending:!0});c=qc(e).map(e=>({date:e.date,minutes:Math.round(e.minutes),bedtime:e.bedtime,wakeTime:e.wakeTime,source:a,externalId:`${a}-${e.date}`}))}return{sleepLogs:c,healthDays:[...o.values()]}}async function Yc(e){let{available:t}=await Rn.isAvailable();if(!t)throw Error(`unavailable`);if(!(await Ac(()=>Rn.requestAuthorization({read:e.map(e=>Bc[e]),write:[],requestHistoryAccess:!0}))).readAuthorized?.length)throw Error(`denied`);Nt({provider:Kc(),types:e}),It(await Jc(e,Vc))}async function Xc(){let{connected:e,types:t,lastSyncAt:n}=R().health;if(!Gc()||!e||n&&Date.now()-new Date(n).getTime()<Uc)return!1;try{return It(await Jc(t,Hc)),!0}catch{return!1}}var Zc=class{constructor(e){this.value=e}toString(){return this.value}},Qc={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},$c=e=>String(e).replace(/[&<>"']/g,e=>Qc[e]),el=e=>new Zc(String(e??``));function tl(e){return e==null||e===!1||e===!0?``:e instanceof Zc?e.value:Array.isArray(e)?e.map(tl).join(``):$c(e)}function K(e,...t){let n=e[0];for(let r=0;r<t.length;r++)n+=tl(t[r])+e[r+1];return new Zc(n)}var nl={activity:`
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
`,heartPulse:`
<svg
  class="lucide lucide-heart-pulse"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
  <path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
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
`},rl=Object.keys(nl);function q(e,{size:t=24,label:n,strokeWidth:r=1.75}={}){let i=nl[e];if(!i)return console.warn(`[icons] Neznáma ikona: ${e}`),el(``);let a=n?`role="img" aria-label="${$c(n)}"`:`aria-hidden="true" focusable="false"`;return el(i.trim().replace(`<svg`,`<svg ${a}`).replace(`class="lucide`,`class="icon lucide`).replace(`width="24"`,`width="${t}"`).replace(`height="24"`,`height="${t}"`).replace(`stroke-width="2"`,`stroke-width="${r}"`))}var il=(e,t)=>t==null||t===!1?``:K` ${el(e)}="${t}"`,al=(e,t)=>t?el(` ${e}`):``;function ol(e={}){return el(Object.entries(e).map(([e,t])=>` data-${e}="${$c(t)}"`).join(``))}function J({header:e=``,body:t,footer:n=``,nav:r=``,variant:i=``,form:a=!1}){let o=K`
    ${e}
    <div class="screen__body">${t}</div>
    ${n?K`<div class="screen__footer">${n}</div>`:``}
    ${r}`;return a?K`<form class="screen ${i}" novalidate>${o}</form>`:K`<div class="screen ${i}">${o}</div>`}var sl=(e,t,{header:n}={})=>J({variant:n?``:`screen--tab`,header:n,body:t,nav:dl(e)});function Y({back:e,backAction:t,step:n,total:r}={}){return K`
    <header class="screen__header">
      ${e||t?K`<button type="button" class="icon-btn" data-action="${t??`back`}"${il(`data-fallback`,e)} aria-label="${z(`common.back`)}">
            ${q(`chevronLeft`)}
          </button>`:K`<span class="topbar__spacer"></span>`}
      ${n?K`<div class="progress">
            <span class="visually-hidden">${z(`common.stepOf`,{step:n,total:r})}</span>
            ${Array.from({length:r},(e,t)=>K`<span class="progress__seg ${t<n?`is-done`:``}" aria-hidden="true"></span>`)}
          </div>`:K`<span class="progress"></span>`}
      <span class="topbar__spacer"></span>
    </header>`}var cl=[{key:`today`,path:`/today`,icon:`home`},{key:`calendar`,path:`/calendar`,icon:`calendar`},{key:`insights`,path:`/insights`,icon:`chart`},{key:`treatment`,path:`/treatment`,icon:`pill`}],ll=(e,t)=>K`
  <a class="tabbar__item" href="#${e.path}" data-replace${e.key===t?el(` aria-current="page"`):``}>
    <span class="tabbar__icon">${q(e.icon)}</span>
    ${z(`nav.${e.key}`)}
  </a>`;function ul(){let e=lt();return e?K`
      <a class="tabbar__fab tabbar__fab--live" href="#/episode/${e.id}" aria-label="${z(`episode.ongoing`)}">
        <span class="tabbar__fab-circle" aria-hidden="true">${q(`timer`,{size:30})}</span>
        <span class="tabbar__fab-label" aria-hidden="true">${z(`episode.statusOngoing`)}</span>
      </a>`:K`
    <button type="button" class="tabbar__fab" data-action="startEpisode">
      <span class="tabbar__fab-circle" aria-hidden="true">${q(`play`,{size:28,strokeWidth:2.5})}</span>
      <span class="tabbar__fab-label">${z(`nav.startEpisode`)}</span>
    </button>`}function dl(e){let[t,n,r,i]=cl;return K`
    <nav class="tabbar" aria-label="${z(`nav.label`)}">
      ${ll(t,e)}${ll(n,e)}${ul()}${ll(r,e)}${ll(i,e)}
    </nav>`}var fl=()=>K`<a href="#/profile" class="icon-btn" aria-label="${z(`nav.profile`)}">${q(`user`)}</a>`,pl=e=>K`
  <header class="tab-title">
    <h1 class="screen-title" tabindex="-1">${e}</h1>
    ${fl()}
  </header>`;function X({label:e,variant:t=`primary`,action:n,type:r=`button`,iconName:i,block:a=!1,compact:o=!1,disabled:s=!1,data:c,id:l}){return K`<button type="${r}" class="${[`btn`,`btn--${t}`,a&&`btn--block`,o&&`btn--compact`].filter(Boolean).join(` `)}"${il(`id`,l)}${il(`data-action`,n)}${ol(c)}${al(`disabled`,s)}>
    ${i?q(i,{size:20}):``}<span>${e}</span>
  </button>`}function ml({name:e,type:t=`radio`,options:n,selected:r,legend:i}){let a=new Set([].concat(r??[]));return K`
    <fieldset class="options">
      ${i?K`<legend class="visually-hidden">${i}</legend>`:``}
      ${n.map(n=>K`
          <label class="option option--${t}">
            <input type="${t}" name="${e}" value="${n.value}" id="${e}-${n.value}"${al(`checked`,a.has(n.value))} />
            <span class="option__control">${q(`check`,{size:16,strokeWidth:3})}</span>
            <span class="option__label">${n.label}</span>
          </label>`)}
    </fieldset>`}function hl({name:e,options:t,selected:n,legend:r}){return K`
    <fieldset class="segmented">
      ${r?K`<legend class="visually-hidden">${r}</legend>`:``}
      ${t.map(t=>K`
          <label class="segmented__item">
            <input type="radio" name="${e}" value="${t.value}" id="${e}-${t.value}"${al(`checked`,t.value===n)} />
            <span>${t.label}</span>
          </label>`)}
    </fieldset>`}function Z({label:e,name:t,type:n=`text`,value:r=``,placeholder:i,hint:a,optional:o=!1,required:s=!1,multiline:c=!1,autocomplete:l=`off`,maxlength:u=120}){let d=`f-${t}`,f=[a&&`${d}-hint`,`${d}-error`].filter(Boolean).join(` `),p=c?K`<textarea class="field__input" id="${d}" name="${t}"${il(`placeholder`,i)} maxlength="1000" aria-describedby="${f}">${r}</textarea>`:K`<input class="field__input" id="${d}" name="${t}" type="${n}" value="${r}"${il(`placeholder`,i)}${il(`autocomplete`,l)}${n===`text`?il(`maxlength`,u):``}${al(`required`,s)} aria-describedby="${f}" />`;return K`
    <div class="field">
      <label class="field__label" for="${d}">
        ${e}${o?K` <span class="field__optional">(${z(`common.optional`)})</span>`:``}
      </label>
      ${p}
      ${a?K`<p class="field__hint" id="${d}-hint">${a}</p>`:``}
      <p class="field__error" id="${d}-error" hidden></p>
    </div>`}function gl(e,t,n){let r=e.querySelector(`#f-${t}`),i=e.querySelector(`#f-${t}-error`);i&&(i.textContent=n,i.hidden=!1),r?.setAttribute(`aria-invalid`,`true`),r?.focus()}function _l(e){if(e?.getAttribute?.(`aria-invalid`)!==`true`)return;e.removeAttribute(`aria-invalid`);let t=document.getElementById(`${e.id}-error`);t&&(t.hidden=!0)}function vl({name:e,label:t,hint:n,checked:r,iconName:i}){return K`
    <label class="list__row list__row--switch" for="f-${e}">
      ${i?q(i):``}
      <span class="list__text">
        <span class="list__label">${t}</span>
        ${n?K`<span class="list__hint" id="f-${e}-hint">${n}</span>`:``}
      </span>
      <input class="switch" type="checkbox" role="switch" id="f-${e}" name="${e}"${al(`checked`,r)}${n?K` aria-describedby="f-${e}-hint"`:``} />
    </label>`}var yl=(e,{live:t=!1,neutral:n=!1}={})=>K`<span class="chip ${t?`chip--live`:``} ${n?`chip--neutral`:``}">${e}</span>`,bl=(e,{large:t=!1}={})=>K`<span class="icon-badge ${t?`icon-badge--lg`:``}">${q(e,{size:t?34:22})}</span>`,xl=`<?xml version="1.0" encoding="UTF-8"?>
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
</svg>`,Sl=(e,t)=>[...xl.matchAll(RegExp(`<path class="${e}" d="([^"]+)"`,`g`))].map(e=>`<path class="logo__${t}" d="${e[1]}"/>`).join(``),Cl=Sl(`cls-1`,`mark`),wl=Sl(`cls-2`,`word`),Tl=xl.match(/viewBox="([^"]+)"/)[1];function El({large:e=!1}={}){return K`
    <div class="logo ${e?`logo--large`:``}" role="img" aria-label="${z(`app.logo`)}">
      <span class="logo__name">${z(`app.name`)}</span>
      ${el(`<svg class="logo__svg" viewBox="${Tl}" aria-hidden="true" focusable="false">${Cl}${wl}</svg>`)}
    </div>`}function Dl({symbol:e,size:t=280}={}){return K`
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
      ${el(e?String(q(e,{size:64,strokeWidth:1.4})).replace(`<svg`,`<svg x="108" y="86"`):`
      <circle cx="140" cy="118" r="34" fill="var(--color-coral-soft)" opacity="0.55" />
      <circle cx="140" cy="118" r="18" fill="var(--color-coral)" opacity="0.5" />`)}
    </svg>`}var Ol={render(){return J({variant:`screen--language`,body:K`
        <div class="language">
          ${El({large:!0})}
          ${Dl({size:220})}
          <h1 class="screen-title language__title" tabindex="-1">
            <span lang="sk">${ir(`sk`,`language.title`)}</span>
            <span class="language__alt" lang="en">${ir(`en`,`language.title`)}</span>
          </h1>
          <div class="stack">
            ${Zn.map(e=>K`
                <button type="button" class="choice" data-action="choose" data-lang="${e}" lang="${e}">
                  <span class="choice__badge" aria-hidden="true">${e.toUpperCase()}</span>
                  <span>${ir(e,`language.${e}`)}</span>
                  <span class="choice__end">${q(`chevronRight`)}</span>
                </button>`)}
          </div>
        </div>`})},actions:{choose(e){let{lang:t}=e.dataset;er(t),Fe({language:t}),a(`/start/welcome`)}}},kl={render(){return J({variant:`screen--welcome`,header:Y({back:`/start/language`}),body:K`
        <div class="welcome">
          ${El()}
          <h1 class="screen-title welcome__title" tabindex="-1">${z(`welcome.title`)}</h1>
          <p class="screen-lead">${z(`welcome.text`)}</p>
          ${Dl()}
        </div>`,footer:X({label:z(`welcome.cta`),action:`start`,block:!0})})},actions:{start(){a(`/start/privacy`)}}},Al=[`/start/privacy`,`/start/profile`,`/start/goals`,`/start/condition`,`/start/cycle`,`/start/medications`,`/start/reminders`];function jl(e){let t=Al.indexOf(e);return{step:t+1,total:Al.length,prev:Al[t-1]??`/start/welcome`,next:Al[t+1]??`/today`}}var Ml=`/start/goals`,Nl=[`symptoms`,`triggers`,`patterns`,`doctor`],Pl={render(){let{step:e,total:t,prev:n}=jl(Ml);return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${z(`goals.title`)}</h1>
        <p class="screen-lead">${z(`goals.lead`)}</p>
        <div class="step-options">
          ${ml({name:`goals`,type:`checkbox`,legend:z(`goals.title`),options:Nl.map(e=>({value:e,label:z(`goals.options.${e}`)})),selected:R().goals})}
        </div>`,footer:K`
        ${X({label:z(`common.continue`),type:`submit`,block:!0})}
        ${X({label:z(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onSubmit(e){Fe({goals:new FormData(e).getAll(`goals`)}),a(jl(Ml).next)},actions:{skip(){a(jl(Ml).next)}}},Fl=`/start/condition`,Il=[`vestibular_migraine`,`migraine`,`other_vestibular`,`unsure`],Ll={render(){let{step:e,total:t,prev:n}=jl(Fl);return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${z(`condition.title`)}</h1>
        <p class="screen-lead">${z(`condition.lead`)}</p>
        <div class="step-options">
          ${ml({name:`condition`,legend:z(`condition.title`),options:Il.map(e=>({value:e,label:z(`condition.options.${e}`)})),selected:R().condition??`vestibular_migraine`})}
        </div>`,footer:K`
        ${X({label:z(`common.continue`),type:`submit`,block:!0})}
        ${X({label:z(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onSubmit(e){Fe({condition:new FormData(e).get(`condition`)}),a(jl(Fl).next)},actions:{skip(){a(jl(Fl).next)}}},Rl=`/start/cycle`;function zl(){let{cycleTracking:e}=R();return e===!0?`yes`:e===!1?`no`:null}var Bl={render(){let{step:e,total:t,prev:n}=jl(Rl),r=zl();return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${z(`cycle.title`)}</h1>
        <p class="screen-lead">${z(`cycle.lead`)}</p>
        <div class="step-options">
          ${ml({name:`cycle`,legend:z(`cycle.title`),options:[{value:`yes`,label:z(`cycle.yes`)},{value:`no`,label:z(`cycle.no`)}],selected:r})}
        </div>`,footer:K`
        ${X({label:z(`common.continue`),type:`submit`,block:!0,id:`cycle-continue`,disabled:!r})}
        ${X({label:z(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onChange(e){e.name===`cycle`&&(document.getElementById(`cycle-continue`).disabled=!1)},onSubmit(e){let t=new FormData(e).get(`cycle`);t&&(Fe({cycleTracking:t===`yes`}),a(jl(Rl).next))},actions:{skip(){a(jl(Rl).next)}}},Vl=`/start/medications`;function Hl(e){return[z(`medications.types.${e.type}`),e.dose,e.frequency].filter(Boolean).join(` · `)}var Ul={render(){let{step:e,total:t,prev:n}=jl(Vl),r=Re(),i=r.length>0;return J({header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${z(`medications.title`)}</h1>
        <p class="screen-lead">${z(`medications.lead`)}</p>
        ${i?K`
              <h2 class="visually-hidden">${z(`medications.added`)}</h2>
              <ul class="med-list">
                ${r.map(e=>K`
                    <li class="med">
                      <span class="med__main">
                        <span class="med__name">${e.name}</span>
                        <span class="med__meta">${Hl(e)}</span>
                      </span>
                      <button type="button" class="icon-btn" data-action="remove" data-id="${e.id}"
                        aria-label="${z(`medications.remove`,{name:e.name})}">
                        ${q(`x`,{size:20})}
                      </button>
                    </li>`)}
              </ul>`:Dl({symbol:`pill`,size:240})}
        <p class="disclaimer">${q(`info`,{size:20})}<span>${z(`medications.disclaimer`)}</span></p>`,footer:i?K`
            ${X({label:z(`common.continue`),action:`next`,block:!0})}
            ${X({label:z(`medications.addAnother`),variant:`secondary`,action:`add`,iconName:`plus`,block:!0})}`:K`
            ${X({label:z(`medications.add`),action:`add`,iconName:`plus`,block:!0})}
            ${X({label:z(`common.skip`),variant:`ghost`,action:`next`,block:!0})}`})},actions:{add(){a(`/start/medications/new`)},async remove(e,t){e.disabled=!0,await yc(e.closest(`.med`)),Ue(e.dataset.id),t.rerender()},next(){a(jl(Vl).next)}}},Wl=`/start/reminders`,Gl={render(){let{step:e,total:t,prev:n}=jl(Wl),{reminder:r}=R();return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${z(`reminders.title`)}</h1>
        <p class="screen-lead">${z(`reminders.lead`)}</p>
        ${Dl({symbol:`bell`,size:180})}
        <div class="step-options">
          ${ml({name:`reminder`,legend:z(`reminders.title`),options:[{value:`yes`,label:z(`reminders.yes`)},{value:`no`,label:z(`reminders.no`)}],selected:r.enabled?`yes`:null})}
        </div>
        <!-- Zobrazí sa iba pri „Áno“ (CSS :has), bez prekresľovania obrazovky -->
        <div class="reminder-extra">
          ${Z({label:z(`reminders.time`),name:`time`,type:`time`,value:r.time})}
          <p class="field__hint">${z(`reminders.permission`)}</p>
        </div>`,footer:X({label:z(`common.continue`),type:`submit`,block:!0})})},onChange(e){e.name===`reminder`&&e.value===`yes`&&vc(document.querySelector(`.reminder-extra`))},onSubmit(e){let t=new FormData(e);Fe({reminder:{enabled:t.get(`reminder`)===`yes`,time:String(t.get(`time`)||R().reminder.time)}}),Rc()}};function Q(e,{actionLabel:t,onAction:n,duration:r}={}){let i=document.getElementById(`toast-region`),a=document.createElement(`div`);a.className=`toast`;let o=document.createElement(`span`);o.textContent=e,a.append(o);let s=setTimeout(c,r??(t?6e3:3500));function c(){clearTimeout(s),xc(a,()=>a.remove())}if(t){let e=document.createElement(`button`);e.type=`button`,e.className=`toast__action`,e.textContent=t,e.addEventListener(`click`,()=>{c(),n?.()}),a.append(e)}i.replaceChildren(a),bc(a)}function Kl({title:e,text:t,closeLabel:n=z(`common.close`)}){let r=document.getElementById(`dialog`);return r.setAttribute(`aria-labelledby`,`dialog-title`),r.innerHTML=String(K`
    <h2 class="dialog__title" id="dialog-title">${e}</h2>
    ${t?K`<p class="dialog__text">${t}</p>`:``}
    <form method="dialog" class="dialog__actions">
      <button class="btn btn--primary btn--block" value="close" autofocus>${n}</button>
    </form>`),new Promise(e=>{let t=!1,n=()=>{t||(t=!0,e())};r.querySelector(`form`).addEventListener(`submit`,n),r.addEventListener(`close`,n,{once:!0}),r.showModal(),Sc(r)})}function ql({title:e,text:t,confirmLabel:n,cancelLabel:r=z(`common.cancel`)}){let i=document.getElementById(`dialog`);return i.setAttribute(`aria-labelledby`,`dialog-title`),i.innerHTML=String(K`
    <h2 class="dialog__title" id="dialog-title">${e}</h2>
    ${t?K`<p class="dialog__text">${t}</p>`:``}
    <form method="dialog" class="dialog__actions">
      <button class="btn btn--primary btn--block" value="confirm">${n}</button>
      <button class="btn btn--ghost btn--block" value="cancel" autofocus>${r}</button>
    </form>`),new Promise(e=>{let t=!1,n=n=>{t||(t=!0,e(n))};i.returnValue=``,i.querySelector(`form`).addEventListener(`submit`,e=>n(e.submitter?.value===`confirm`)),i.addEventListener(`close`,()=>n(i.returnValue===`confirm`),{once:!0}),i.showModal(),Sc(i)})}var Jl={name:``,type:`preventive`,dose:``,frequency:``,note:``,startDate:``};function Yl({returnTo:e}){let t=t=>typeof e==`function`?e(t):e;return{render(e){let n=e.params.id?ze(e.params.id):null,r={...Jl,...n??{}};return J({form:!0,header:Y({back:t(e)}),body:K`
          <h1 class="screen-title" tabindex="-1">${z(n?`treatment.edit`:`medForm.title`)}</h1>
          <div class="form-stack">
            ${Z({label:z(`medForm.name`),name:`name`,value:r.name,placeholder:z(`medForm.namePlaceholder`),required:!0})}
            <div class="field">
              <span class="field__label" aria-hidden="true">${z(`medForm.type`)}</span>
              ${hl({name:`type`,legend:z(`medForm.type`),selected:r.type,options:[{value:`preventive`,label:z(`medications.types.preventive`)},{value:`acute`,label:z(`medications.types.acute`)}]})}
            </div>
            ${Z({label:z(`medForm.dose`),name:`dose`,value:r.dose,placeholder:z(`medForm.dosePlaceholder`),optional:!0})}
            ${Z({label:z(`medForm.frequency`),name:`frequency`,value:r.frequency,placeholder:z(`medForm.frequencyPlaceholder`),optional:!0})}
            ${Z({label:z(`medForm.startDate`),name:`startDate`,type:`date`,value:r.startDate??``,optional:!0,hint:z(`medForm.startDateHint`)})}
            ${Z({label:z(`medForm.note`),name:`note`,value:r.note,multiline:!0,optional:!0})}
            <p class="disclaimer">${z(`medications.disclaimer`)}</p>
          </div>`,footer:X({label:z(`medForm.submit`),type:`submit`,block:!0})})},onSubmit(e,n){let r=new FormData(e),i=String(r.get(`name`)??``).trim();if(!i){gl(e,`name`,z(`medForm.nameRequired`));return}let a={name:i,type:r.get(`type`),dose:String(r.get(`dose`)??``),frequency:String(r.get(`frequency`)??``),note:String(r.get(`note`)??``),startDate:String(r.get(`startDate`)??``)||null};n.params.id&&ze(n.params.id)?(He(n.params.id,a),Q(z(`profile.saved`))):Q(z(`medForm.saved`,{name:Ve(a).name})),s(t(n))}}}var Xl=e=>e.charAt(0).toLocaleUpperCase(tr())+e.slice(1);function Zl(e=new Date){return Xl(new Intl.DateTimeFormat(tr(),{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}).format(e))}function Ql(e){return new Intl.DateTimeFormat(tr(),{hour:`2-digit`,minute:`2-digit`}).format(new Date(e))}function $l(e){let t=new Date(e),n=new Date;return t.toDateString()===n.toDateString()?Ql(t):new Intl.DateTimeFormat(tr(),{day:`numeric`,month:`numeric`,hour:`2-digit`,minute:`2-digit`}).format(t)}function eu(e){return new Intl.DateTimeFormat(tr(),{day:`numeric`,month:`short`,year:`numeric`,hour:`2-digit`,minute:`2-digit`}).format(new Date(e))}function tu(e){return new Intl.DateTimeFormat(tr(),{day:`numeric`,month:`numeric`,year:`numeric`}).format(new Date(e))}function nu(e){return Xl(new Intl.DateTimeFormat(tr(),{month:`long`,year:`numeric`}).format(e))}function ru(e){return new Intl.NumberFormat(tr(),{minimumFractionDigits:1,maximumFractionDigits:1}).format(e)}function iu(e){return au(0,Math.round(e)*6e4)}function au(e,t=new Date){let n=Math.max(0,Math.floor((new Date(t)-new Date(e))/6e4));if(n<1)return z(`duration.underMinute`);if(n<60)return z(`duration.minutes`,{m:n});let r=Math.floor(n/60),i=n%60;return i?z(`duration.hoursMinutes`,{h:r,m:i}):z(`duration.hours`,{h:r})}var ou=[{key:`dizziness`,icon:`orbit`,info:!0},{key:`vertigo`,icon:`rotate3d`,info:!0},{key:`rocking`,icon:`sailboat`,info:!0},{key:`floating`,icon:`cloud`,info:!0},{key:`unsteadiness`,icon:`footprints`,info:!0},{key:`nausea`,icon:`waves`},{key:`vomiting`,icon:`droplets`},{key:`light_sensitivity`,icon:`sun`},{key:`sound_sensitivity`,icon:`volume`},{key:`visual_sensitivity`,icon:`eye`,info:!0},{key:`tinnitus`,icon:`audioWave`,info:!0},{key:`ear_pressure`,icon:`ear`},{key:`headache`,icon:`zap`},{key:`brain_fog`,icon:`cloudFog`,info:!0},{key:`fatigue`,icon:`battery`}],su=[`moment`,`under_1h`,`1_3h`,`3_6h`,`6_12h`,`over_12h`],cu=[`vestibular`,`migraine_headache`,`migraine_no_headache`,`other`,`unsure`],lu=[`poor_sleep`,`long_sleep`,`stress`,`skipped_meal`,`dehydration`,`caffeine`,`alcohol`,`exertion`,`illness`,`visual_stimulation`,`bright_light`,`strong_smells`,`screen_time`,`neck_pain`,`weather_change`,`menstrual_cycle`,`allergy`,`travel`,`other`],uu={poor_sleep:`bed`,long_sleep:`moon`,stress:`brain`,skipped_meal:`utensils`,dehydration:`glassWater`,caffeine:`coffee`,alcohol:`wine`,exertion:`dumbbell`,illness:`thermometer`,visual_stimulation:`eye`,bright_light:`sun`,strong_smells:`wind`,screen_time:`monitor`,neck_pain:`bone`,weather_change:`cloud`,menstrual_cycle:`droplet`,allergy:`flower`,travel:`car`,other:`ellipsis`},du=[`rest`,`sleep`,`dark_room`,`hydration`,`relaxation`,`cold_compress`,`warm_compress`,`shower`,`food`,`other`],fu=[`work_study`,`sleep`,`daily_activities`,`social`,`movement`,`rest`,`other`,`none`],pu=[`helped`,`partly`,`not_helped`,`unknown`];function mu(e){return e==null?null:e===0?`none`:e<=3?`mild`:e<=6?`moderate`:`severe`}var hu=`custom:`,gu=e=>e.startsWith(hu);function _u(e){return gu(e)?ot(e)?.label??z(`symptoms.unknown`):z(`symptoms.${e}`)}var vu=e=>ou.find(t=>t.key===e)?.icon??`sparkles`;function yu(e){return e==null?z(`intensity.notSet`):z(`intensity.value`,{value:e,level:z(`intensity.${mu(e)}`)})}function bu(e){return e.symptoms.map(e=>e.intensity==null?_u(e.key):`${_u(e.key)} ${e.intensity}`).join(`, `)}var xu=e=>z(`durations.${e}`),Su=e=>z(`effects.${e}`),Cu=e=>z(`triggers.${e}`),wu=e=>z(`episodeTypes.${e}`),Tu=e=>z(`relief.${e}`),Eu=e=>z(`impact.${e}`),Du=e=>z(`sleep.qualities.${e}`);function Ou({href:e,iconName:t,title:n,meta:r,badge:i}){return K`
    <li>
      <a class="entry" href="${e}">
        ${q(t)}
        <span class="entry__main">
          <span class="entry__title">${n}${i??``}</span>
          <span class="entry__meta">${r}</span>
        </span>
        ${q(`chevronRight`,{size:20})}
      </a>
    </li>`}function ku(e){return Ou({href:`#/episode/${e.id}`,iconName:`timer`,title:z(`episode.title`),badge:e.endedAt?``:yl(z(`episode.statusOngoing`),{live:!0}),meta:e.endedAt?`${$l(e.startedAt)} – ${Ql(e.endedAt)} · ${au(e.startedAt,e.endedAt)}`:z(`episode.since`,{time:$l(e.startedAt)})})}function Au(e){let t=it(e);return Ou({href:`#/symptom/${e.id}`,iconName:`activity`,title:bu(e),meta:[Ql(e.occurredAt),t==null?``:z(`intensity.highest`,{value:yu(t)})].filter(Boolean).join(` · `)})}function ju(e){let t=ze(e.medicationId);return Ou({href:`#/intake/${e.id}`,iconName:`pill`,title:[t?.name??z(`today.intakeTitle`),e.dose].filter(Boolean).join(` `),meta:[Ql(e.takenAt),e.effect?Su(e.effect):``].filter(Boolean).join(` · `)})}function Mu(e){return Ou({href:`#/sleep?date=${e.date}`,iconName:`bed`,title:z(`sleep.entry`,{duration:iu(e.minutes)}),meta:[e.quality?Du(e.quality):z(`sleep.title`),e.source&&e.source!==`manual`?z(`plus.health.providers.${e.source}`):``].filter(Boolean).join(` · `)})}function Nu({episodes:e=[],symptomLogs:t=[],intakes:n=[],sleep:r=null}){return K`<ul class="entries">${[...e.map(e=>({at:e.startedAt,render:()=>ku(e)})),...t.map(e=>({at:e.occurredAt,render:()=>Au(e)})),...n.map(e=>({at:e.takenAt,render:()=>ju(e)})),...r?[{at:r.wakeTime??ye(r.date,`06:00`),render:()=>Mu(r)}]:[]].sort((e,t)=>t.at.localeCompare(e.at)).map(e=>e.render())}</ul>`}function Pu(e){return{from:N(F(new Date,-(e-1))),to:N()}}function Fu(e){let t=new Map;for(let n of e)t.set(n,(t.get(n)??0)+1);return[...t].map(([e,t])=>({key:e,count:t})).sort((e,t)=>t.count-e.count)}var Iu=e=>e.length?e.reduce((e,t)=>e+t,0)/e.length:null;function Lu({from:e,to:t}){let{symptomLogs:n,episodes:r,medicationIntakes:i,medications:a,cycleEntries:o,sleepLogs:s}=Rt(),c=s.filter(n=>n.date>=e&&n.date<=t).sort((e,t)=>e.date.localeCompare(t.date)),l=n=>{let r=N(n);return r>=e&&r<=t},u=n.filter(e=>l(e.occurredAt)).sort((e,t)=>e.occurredAt.localeCompare(t.occurredAt)),d=r.filter(e=>l(e.startedAt)).sort((e,t)=>e.startedAt.localeCompare(t.startedAt)),f=i.filter(e=>l(e.takenAt)).sort((e,t)=>e.takenAt.localeCompare(t.takenAt)),p=new Set([...u.map(e=>N(e.occurredAt)),...d.map(e=>N(e.startedAt))]),m=[...u.map(it),...d.map(e=>e.intensity)].filter(e=>e!=null),h=d.filter(e=>e.endedAt).map(e=>(new Date(e.endedAt)-new Date(e.startedAt))/6e4),g=a.map(e=>{let t=f.filter(t=>t.medicationId===e.id);return{medication:e,count:t.length,effects:Fu(t.map(e=>e.effect).filter(Boolean))}}).filter(e=>e.count>0).sort((e,t)=>t.count-e.count);return{from:e,to:t,logs:u,episodes:d,intakes:f,recordCount:u.length+d.length,symptomDays:p.size,episodeCount:d.length,avgIntensity:Iu(m),avgDurationMinutes:Iu(h),symptoms:Fu([...u.flatMap(e=>e.symptoms.map(e=>e.key)),...d.flatMap(e=>(e.symptoms??[]).map(e=>e.key??e))]),triggers:Fu(d.flatMap(e=>(e.triggers??[]).map(e=>e.key??e))),meds:g,periodDays:o.filter(n=>n.type===`period`&&n.date>=e&&n.date<=t).length,sleeps:c,avgSleepMinutes:Iu(c.map(e=>e.minutes)),sleepQuality:Fu(c.map(e=>e.quality).filter(Boolean))}}var Ru=85,zu=8,Bu=3e3,Vu=12e3,Hu=5,Uu=10,Wu=30,Gu=5,Ku=[90,180,365],qu=[90,180,365],Ju=[{key:`pressure_drop`,group:`weather`,icon:`trendingDown`,lags:[0,1],test:e=>e.pressureChange==null?null:e.pressureChange<=-6},{key:`pressure_rise`,group:`weather`,icon:`trendingUp`,lags:[0,1],test:e=>e.pressureChange==null?null:e.pressureChange>=6},{key:`humid`,group:`weather`,icon:`droplets`,lags:[0,1],test:e=>e.humidity==null?null:e.humidity>=Ru},{key:`temp_swing`,group:`weather`,icon:`thermometer`,lags:[0,1],test:e=>e.tempChange==null?null:Math.abs(e.tempChange)>=zu},{key:`short_sleep`,group:`sleep`,icon:`bed`,lags:[0,1],test:e=>e.sleep==null?null:e.sleep<360},{key:`poor_sleep`,group:`sleep`,icon:`moon`,lags:[0,1],test:e=>e.sleepQuality==null?null:e.sleepQuality===`poor`},{key:`high_steps`,group:`health`,icon:`dumbbell`,lags:[1],test:e=>e.steps==null?null:e.steps>=Vu},{key:`low_steps`,group:`health`,icon:`footprints`,lags:[1],test:e=>e.steps==null?null:e.steps<Bu},{key:`period`,group:`cycle`,icon:`droplet`,lags:[0,1],test:e=>!!e.periodWindow}];function Yu(){let{weather:e,health:t,cycleTracking:n}=R();return{weather:e.enabled,sleep:!0,health:t.connected&&t.types.includes(`steps`),cycle:n===!0}}function Xu(){let{episodes:e,symptomLogs:t,sleepLogs:n,healthDays:r,weatherDays:i,cycleEntries:a}=Rt(),o=new Map,s=e=>(o.has(e)||o.set(e,{date:e,hard:!1,record:!1}),o.get(e));for(let t of e){let e=s(N(t.startedAt));e.hard=!0,e.record=!0}for(let e of t){let t=s(N(e.occurredAt));t.record=!0,(it(e)??0)>=5&&(t.hard=!0)}for(let e of n){let t=s(e.date);t.sleep=e.minutes,t.sleepQuality=e.quality??null,e.source===`manual`&&(t.record=!0)}for(let e of r){let t=s(e.date);t.steps=e.steps??null}let c=N();for(let e of i){if(e.forecast&&e.date<c)continue;let t=s(e.date);t.pressureChange=e.pressureChange,t.humidity=e.humidity,t.tempMax=e.tempMax}for(let e of o.values()){let t=o.get(N(F(P(e.date),-1)));e.tempChange=e.tempMax!=null&&t?.tempMax!=null?e.tempMax-t.tempMax:null}for(let e of a)if(e.type===`period`)for(let t=-2;t<=2;t++)s(N(F(P(e.date),t))).periodWindow=!0;return o}var Zu=[0];function Qu(e){for(let t=Zu.length;t<=e;t++)Zu[t]=Zu[t-1]+Math.log(t);return Zu[e]}var $u=(e,t)=>Qu(e)-Qu(t)-Qu(e-t);function ed(e,t,n,r){let i=t+r,a=e+n,o=0;for(let n=e;n<=Math.min(t,a);n++)o+=Math.exp($u(a,n)+$u(i-a,t-n)-$u(i,t));return o}function td(e,t,n,r){let i=0,a=0,o=0,s=0;for(let c of t){let t=e.test(c);if(t==null)continue;let l=e.lags.map(e=>N(F(P(c.date),e)));if(l.at(-1)>r)continue;let u=l.some(e=>n.get(e)?.hard);t?(i++,u&&a++):(o++,u&&s++)}let c=i?a/i:0,l=o?s/o:0,u=c-l,d=`none`;if(i<Hu||o<Uu)d=`few`;else{let e=ed(a,i,s,o);u>=.15&&c>=l*1.5&&e<.05?d=`strong`:u>=.08&&c>=l*1.25&&e<.2&&(d=`possible`)}return{key:e.key,group:e.group,icon:e.icon,withDays:i,withHard:a,withoutDays:o,withoutHard:s,rateWith:c,rateWithout:l,difference:u,strength:d}}var nd={strong:0,possible:1,none:2,few:3};function rd({days:e=180,now:t=new Date}={}){let n=N(t),r=N(F(t,-(e-1))),i=Xu(),a=[...i.values()].filter(e=>e.record).map(e=>e.date).sort()[0],o=a&&a>r?a:r,s=a?Te(o,n).map(e=>i.get(e)??{date:e,hard:!1}):[],c=s.length,l=s.filter(e=>e.hard).length,u=Yu(),d=Ju.filter(e=>u[e.group]).map(e=>td(e,s,i,n)).filter(e=>e.withDays>0).sort((e,t)=>nd[e.strength]-nd[t.strength]||t.difference-e.difference),{episodes:f}=Rt(),p=f.filter(e=>N(e.startedAt)>=o);return{period:e,trackedDays:c,hardDays:l,enough:c>=Wu&&l>=Gu,factors:d,logged:Fu(p.flatMap(e=>(e.triggers??[]).map(e=>e.key??e)))}}function id(e,t,{days:n,weather:r}){let i=n.get(e)??{},a=[];return r&&(i.pressureChange!=null&&i.pressureChange<=-6&&a.push({key:`pressure_drop`,amount:Math.round(-i.pressureChange)}),i.pressureChange!=null&&i.pressureChange>=6&&a.push({key:`pressure_rise`,amount:Math.round(i.pressureChange)}),i.humidity!=null&&i.humidity>=Ru&&a.push({key:`humid`,amount:i.humidity}),i.tempChange!=null&&Math.abs(i.tempChange)>=zu&&a.push({key:`temp_swing`,amount:Math.abs(i.tempChange)})),t===0&&(i.sleep!=null&&i.sleep<360&&a.push({key:`short_sleep`}),R().cycleTracking===!0&&i.periodWindow&&a.push({key:`period`})),a}function ad(e){if(!e.length)return`calm`;let t=e.map(e=>e.stat?.strength??`few`);return t.includes(`strong`)||t.filter(e=>e===`possible`).length>=2?`elevated`:t.every(e=>e===`none`)?`calm`:`watch`}function od({now:e=new Date}={}){let t=rd({days:365,now:e}),n=new Map(t.factors.map(e=>[e.key,e])),r=Xu(),i=jn(),a=[0,1,2,3].map(a=>{let o=N(F(e,a)),s=id(o,a,{days:r,weather:i}).map(e=>({...e,stat:t.enough?n.get(e.key):null}));return s.sort((e,t)=>nd[e.stat?.strength??`few`]-nd[t.stat?.strength??`few`]),{date:o,offset:a,signals:s,level:ad(s)}}),o=a.filter(e=>e.offset>0);return{enough:t.enough,days:a,next:o.find(e=>e.level===`elevated`)??o.find(e=>e.level===`watch`)??null}}function sd(e,t=new Date){let n=Pu(e),r=F(t,-e),i={from:N(F(r,-(e-1))),to:N(r)};return{current:Lu(n),previous:Lu(i)}}function cd(e=12,t=new Date){let n=[];for(let r=e-1;r>=0;r--){let e=new Date(t.getFullYear(),t.getMonth()-r,1),i=new Date(t.getFullYear(),t.getMonth()-r+1,0),a=Lu({from:N(e),to:N(i)});n.push({month:e,symptomDays:a.symptomDays,episodes:a.episodeCount})}return n}var ld=[`morning`,`afternoon`,`evening`,`night`],ud=e=>e>=5&&e<12?0:e>=12&&e<17?1:e>=17&&e<22?2:3;function dd({from:e,to:t}){let n=Array.from({length:7},()=>[0,0,0,0]),r=0;for(let i of Rt().episodes){let a=N(i.startedAt);if(a<e||a>t)continue;let o=new Date(i.startedAt);n[(o.getDay()+6)%7][ud(o.getHours())]++,r++}return{grid:n,total:r}}function fd({from:e,to:t},n=[-3,7]){let{cycleEntries:r,episodes:i}=Rt(),a=new Set(r.filter(e=>e.type===`period`).map(e=>e.date)),o=[...a].filter(e=>!a.has(N(F(P(e),-1)))).map(e=>P(e).getTime()),s=new Map;for(let e=n[0];e<=n[1];e++)s.set(e,0);let c=0;for(let n of i){let r=N(n.startedAt);if(r<e||r>t)continue;let i=P(r).getTime();for(let e of o){let t=Math.round((i-e)/864e5);if(s.has(t)){s.set(t,s.get(t)+1),c++;break}}}return{items:[...s].map(([e,t])=>({offset:e,count:t})),total:c,starts:o.length}}function pd({from:e,to:t}){let n=Rt().episodes.filter(n=>{let r=N(n.startedAt);return r>=e&&r<=t});return{relief:Fu(n.flatMap(e=>e.relief??[])),impact:Fu(n.flatMap(e=>e.impact??[]).filter(e=>e!==`none`))}}var md=28;function hd(e=new Date){let{medications:t,medicationIntakes:n,episodes:r,symptomLogs:i}=Rt(),a=[...r.map(e=>N(e.startedAt)),...i.map(e=>N(e.occurredAt))].sort()[0];if(!a)return[];let o=N(e);return t.filter(e=>e.type===`preventive`).map(e=>{let t=n.filter(t=>t.medicationId===e.id).map(e=>N(e.takenAt)).sort()[0],r=e.startDate??t;if(!r)return null;let i=P(r),s=Te(r,o).length,c=a<r?Te(a,N(F(i,-1))).length:0,l=Math.min(90,c,s);if(l<md)return null;let u=e=>e/l*30,d=Lu({from:N(F(i,-l)),to:N(F(i,-1))}),f=Lu({from:r,to:N(F(i,l-1))});return{medication:e,start:r,window:l,before:{symptomDays:u(d.symptomDays),episodes:u(d.episodeCount)},after:{symptomDays:u(f.symptomDays),episodes:u(f.episodeCount)}}}).filter(Boolean)}function gd({from:e,to:t}){let{weatherDays:n,episodes:r}=Rt(),i=new Set(r.map(e=>N(e.startedAt))),a=N();return n.filter(n=>n.date>=e&&n.date<=t&&!(n.forecast&&n.date<a)).sort((e,t)=>e.date.localeCompare(t.date)).map(e=>({...e,episode:i.has(e.date)}))}function _d({from:e,to:t}){let{episodes:n,weatherDays:r,healthDays:i}=Rt(),a=new Map(r.map(e=>[e.date,e])),o=n.filter(n=>{let r=N(n.startedAt);return r>=e&&r<=t}).sort((e,t)=>e.startedAt.localeCompare(t.startedAt)).map(e=>({episode:e,weather:a.get(N(e.startedAt))??null})).filter(e=>e.weather),s=i.filter(n=>n.date>=e&&n.date<=t),c=e=>e.length?e.reduce((e,t)=>e+t,0)/e.length:null;return{rows:o,drops:o.filter(e=>e.weather.pressureChange!=null&&e.weather.pressureChange<=-6).length,avgSteps:c(s.map(e=>e.steps).filter(e=>e!=null)),avgRestingHr:c(s.map(e=>e.restingHr).filter(e=>e!=null))}}var vd=[`weather`,`forecast`,`finder`,`stats`,`health`,`report`],yd={weather:`gauge`,forecast:`bellRing`,finder:`search`,stats:`chart`,health:`watch`,report:`fileText`},bd={clear:`sun`,partly:`cloudSun`,cloudy:`cloud`,fog:`cloudFog`,rain:`cloudRain`,snow:`snowflake`,storm:`cloudLightning`},xd=e=>e.charAt(0).toLocaleUpperCase(tr())+e.slice(1);function Sd(e){let t=Math.round(e);return t>0?`+${t}`:t<0?`−${Math.abs(t)}`:`0`}var Cd=e=>z(`plus.weather.hpa`,{value:Math.round(e)}),wd=e=>z(`plus.weather.hpa`,{value:Sd(e)}),Td=e=>z(`plus.weather.temps`,{min:e.tempMin,max:e.tempMax}),Ed=e=>z(`plus.weather.conditions.${e}`),Dd=e=>new Intl.NumberFormat(tr()).format(Math.round(e)),Od=e=>xd(new Intl.DateTimeFormat(tr(),{weekday:`long`}).format(e)),kd=e=>new Intl.DateTimeFormat(tr(),{day:`numeric`,month:`numeric`}).format(e);function Ad(e){return e===N()?z(`plus.forecast.today`):e===N(F(new Date,1))?z(`plus.forecast.tomorrow`):Od(P(e))}function jd(e,{status:t}={}){let n=wt(),r=e===`report`?`#/report`:`#/plus/${e}`;return K`
    <a class="list__row" href="${n?r:`#/plus?from=${e}`}">
      ${q(yd[e])}
      <span class="list__text">
        <span class="list__label">${z(`plus.features.${e}.title`)}</span>
        ${n?``:K`<span class="list__hint">${z(`plus.features.${e}.text`)}</span>`}
      </span>
      ${n&&t?K`<span class="list__value">${t}</span>`:``}
      ${n?``:q(`lock`,{size:18,label:z(`plus.lockedLabel`)})}
      ${q(`chevronRight`,{size:20})}
    </a>`}function Md(e){let{weather:t,forecast:n,health:r}=R();return e===`weather`?z(t.enabled?`common.on`:`common.off`):e===`forecast`?z(n.enabled?`common.on`:`common.off`):e===`health`?z(r.connected?`plus.health.connected`:`plus.health.notConnected`):``}function Nd(){return K`
    <section class="section" aria-labelledby="plus-title">
      <h2 class="section-title plus-title" id="plus-title">${z(`plus.name`)}${wt()?``:yl(z(`plus.tryChip`))}</h2>
      <div class="list">${[`forecast`,`finder`,`stats`,`weather`].map(e=>jd(e,{status:Md(e)}))}</div>
    </section>`}function Pd(e){if(!wt())return``;let{weather:t,health:n}=R(),r=t.enabled?Dt(e):null,i=n.connected?Mt(e):null;return!r&&!i?``:K`
    <ul class="day-context">
      ${r?K`<li>
            ${q(bd[r.condition]??`cloud`,{size:20})}
            <span>${[Cd(r.pressure),r.pressureChange==null?``:z(`plus.weather.changeShort`,{value:wd(r.pressureChange)}),Ed(r.condition),Td(r)].filter(Boolean).join(` · `)}</span>
          </li>`:``}
      ${i?.steps==null?``:K`<li>${q(`footprints`,{size:20})}<span>${[z(`plus.health.stepsValue`,{value:Dd(i.steps)}),i.restingHr==null?``:z(`plus.health.pulseValue`,{value:i.restingHr})].filter(Boolean).join(` · `)}</span></li>`}
    </ul>`}var Fd=e=>z(`plus.forecast.signals.${e.key}`,{amount:e.amount});function Id(e){let{stat:t}=e;return!t||t.strength===`few`?z(`plus.forecast.evidenceFew`):t.strength===`none`?z(`plus.forecast.evidenceNone`):z(`plus.forecast.evidence`,{a:t.withHard,b:t.withDays,c:t.withoutHard,d:t.withoutDays})}var Ld=e=>e.signals[0];function Rd(e){return K`<span class="level level--${e}">${q(e===`calm`?`check`:e===`elevated`?`bellRing`:`info`,{size:16})}${z(`plus.forecast.levels.${e}`)}</span>`}function zd(){if(!wt()||!R().forecast.enabled)return``;let{next:e}=od();if(!e)return``;let t=Ld(e);return K`
    <a class="card forecast-card forecast-card--${e.level}" href="#/plus/forecast">
      <span class="forecast-card__head">
        <span class="forecast-card__title">${z(`plus.forecast.cardTitle`,{day:Ad(e.date)})}</span>
        ${Rd(e.level)}
      </span>
      <span class="forecast-card__text">${Fd(t)} ${Id(t)}</span>
      ${e.level===`elevated`?K`<span class="forecast-card__care">${z(`plus.forecast.care`)}</span>`:``}
    </a>`}var Bd=null;function Vd({logId:e=null,date:t=null}={}){let n=e?$e(e):null,r=n?new Date(n.occurredAt):new Date;return Bd={id:n?.id??null,symptoms:n?n.symptoms.map(e=>({...e,pending:!1})):[],vertigoType:n?.vertigoType??null,duration:n?.duration??null,note:n?.note??``,date:n?N(r):t??N(r),time:ve(r),episodeId:n?.episodeId??null,linkEpisode:!n||!!n.episodeId},Bd}var Hd=()=>Bd;function Ud(){Bd=null}function Wd(){return[`/log/symptoms`,`/log/intensity`,`/log/details`]}function Gd(e){let t=Wd(),n=t.indexOf(e);return{step:n+1,total:t.length,prev:t[n-1]??null,next:t[n+1]??null}}var Kd=e=>e.intensity??(e.pending?5:null);function qd(e,t){e.intensity=t,e.pending=!1}function Jd(e){e.pending&&qd(e,5)}function Yd({index:e,label:t,value:n,iconName:r}){let i=`int-${e}`;return K`
    <div class="intensity ${n==null?`is-unset`:``}" data-index="${e}">
      <div class="intensity__head">
        ${r?K`<span class="intensity__icon">${q(r,{size:22})}</span>`:``}
        <label class="intensity__label" for="${i}">${t}</label>
      </div>
      <output class="intensity__value" for="${i}">${yu(n)}</output>
      <input class="range" type="range" id="${i}" data-index="${e}" min="0" max="10" step="1"
        value="${n??5}" aria-valuetext="${yu(n)}" />
      <div class="intensity__scale" aria-hidden="true"><span>0</span><span>5</span><span>10</span></div>
      <!-- Vynechať a späť zadať: jedno z dvoch tlačidiel je vždy viditeľné -->
      <div class="intensity__actions">
        <button type="button" class="pill-btn" data-action="clear" data-index="${e}" aria-label="${z(`log.clearLabel`,{name:t})}"${n==null?K` hidden`:``}>
          ${q(`x`,{size:16,strokeWidth:2.25})}${z(`log.clear`)}
        </button>
        <button type="button" class="pill-btn pill-btn--accent" data-action="restore" data-index="${e}"${n==null?``:K` hidden`}>
          ${q(`plus`,{size:16,strokeWidth:2.25})}${z(`log.restore`)}
        </button>
      </div>
    </div>`}function Xd(e,t){let n=document.querySelector(`.intensity[data-index="${e}"]`),r=t==null;n.classList.toggle(`is-unset`,r),n.querySelector(`.intensity__value`).textContent=yu(t),n.querySelector(`[data-action="clear"]`).hidden=r,n.querySelector(`[data-action="restore"]`).hidden=!r;let i=n.querySelector(`input[type="range"]`);i.setAttribute(`aria-valuetext`,yu(t)),r&&(i.value=5)}var Zd=e=>e.normalize(`NFD`).replace(/\p{Diacritic}/gu,``).toLowerCase();function Qd(){return[...ou.map(e=>({key:e.key,icon:e.icon,label:_u(e.key),info:!!e.info})),...at().map(e=>({key:e.key,icon:`sparkles`,label:e.label}))]}function $d({name:e,legend:t,items:n,selected:r,search:i=!1}){return K`
    <fieldset class="sym-grid">
      <legend class="visually-hidden">${t}</legend>
      ${n.map(t=>K`
          <div class="sym-cell ${t.info?`sym-cell--info`:``}"${i?K` data-search="${Zd(t.label)}"`:``}>
            <label class="sym-tile">
              <input type="checkbox" name="${e}" value="${t.key}" id="${e}-${t.key}"${r.includes(t.key)?K` checked`:``} />
              <span class="sym-tile__icon">${q(t.icon,{size:22})}</span>
              <span class="sym-tile__label">${t.label}</span>
              <span class="sym-tile__check">${q(`check`,{size:14,strokeWidth:3})}</span>
            </label>
            ${t.info?K`<button type="button" class="sym-tile__info" data-action="symptomInfo" data-key="${t.key}"
                  aria-label="${z(`symptomInfo.open`,{name:t.label})}">${q(`info`,{size:20})}</button>`:``}
          </div>`)}
    </fieldset>`}var ef={symptomInfo(e){let{key:t}=e.dataset;Kl({title:_u(t),text:z(`symptomInfo.${t}`),closeLabel:z(`symptomInfo.close`)}).then(()=>e.focus())}};function tf(e){let{startedAt:t,endedAt:n}=e,r=n?be(t,n)?Ql(n):$l(n):z(`episode.statusOngoing`);return`${$l(t)} – ${r} · ${au(t,n??new Date)}`}function nf(e=[],t,n){let r=e.filter(e=>e!==`other`).map(t);return e.includes(`other`)&&r.push(n?.trim()||t(`other`)),r.length?r.join(`, `):null}function rf(e){let t=mt(e.id);return t.length?t.map(e=>[ze(e.medicationId)?.name,e.dose,Ql(e.takenAt)].filter(Boolean).join(` · `)).join(`, `):null}function af(e,{withTime:t=!0}={}){return[{key:`type`,step:`type`,value:e.type?wu(e.type):null},{key:`intensity`,step:`type`,value:e.intensity==null?null:yu(e.intensity)},t&&{key:`time`,value:tf(e)},{key:`symptoms`,step:`symptoms`,value:e.symptoms?.length?bu(e):null},{key:`triggers`,step:`triggers`,value:nf(e.triggers,Cu,e.triggerOther)},{key:`meds`,step:`meds`,value:rf(e)},{key:`helped`,step:`meds`,value:e.helped?Su(e.helped):null},{key:`relief`,step:`relief`,value:nf(e.relief,Tu,e.reliefOther)},{key:`impact`,step:`impact`,value:nf(e.impact,Eu,e.impactOther)}].filter(Boolean)}var of=e=>af(e,{withTime:!1}).some(e=>e.value);function sf(e,{editable:t=!1}={}){return t?K`
      <ul class="summary-list">
        ${e.map(e=>{let t=z(`episodeFlow.sections.${e.key}`);return e.step?K`
            <li>
              <button type="button" class="summary-row summary-row--edit" data-action="edit" data-step="${e.step}">
                <span class="summary-row__text">
                  <span class="summary-row__label">${t}</span>
                  <span class="summary-row__value">${e.value}</span>
                </span>
                <span class="summary-row__edit" aria-hidden="true">${q(`pencil`,{size:18})}</span>
                <span class="visually-hidden">${z(`episodeFlow.edit`)}</span>
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
            <dt class="summary-row__label">${z(`episodeFlow.sections.${e.key}`)}</dt>
            <dd class="summary-row__value">${e.value}</dd>
          </div>`)}
    </dl>`}var $=null;function cf(e){let t=new Date(e.startedAt),n=e.endedAt&&new Date(e.endedAt)?t:new Date;return{episodeId:e.id,type:e.type??null,overall:{intensity:e.intensity??null,pending:e.intensity==null&&!of(e)},symptoms:(e.symptoms??[]).map(e=>({...e,pending:!1})),triggers:[...e.triggers??[]],triggerOther:e.triggerOther??``,medIds:[],medDate:N(n),medTime:ve(n),helped:e.helped??null,relief:[...e.relief??[]],reliefOther:e.reliefOther??``,impact:[...e.impact??[]],impactOther:e.impactOther??``}}function lf(e){return $=cf(e),`/episode/${e.id}/details/${of(e)?`summary`:`type`}`}function uf(){return[`type`,`symptoms`,...$.symptoms.length?[`intensity`]:[],`triggers`,`meds`,`relief`,`impact`,`summary`]}var df=(e,t,n)=>n?[...new Set([...e,t])]:e.filter(e=>e!==t);function ff(e,t){return gl(document.querySelector(`.screen`),e,t),!1}function pf(e){let t=new Date(e);return t.setSeconds(0,0),t}function mf(){let e=$.episodeId;pt(e,{type:$.type,intensity:$.overall.intensity,symptoms:$.symptoms.map(({key:e,intensity:t})=>({key:e,intensity:t})),triggers:[...$.triggers],triggerOther:$.triggers.includes(`other`)?$.triggerOther.trim():``,helped:$.helped,relief:[...$.relief],reliefOther:$.relief.includes(`other`)?$.reliefOther.trim():``,impact:[...$.impact],impactOther:$.impact.includes(`other`)?$.impactOther.trim():``})}function hf(){let e=ct($.episodeId),t=new Date(e.startedAt).getTime(),n=e.endedAt?new Date(e.endedAt).getTime():Date.now(),r=new Date(Math.min(Math.max(new Date(ye($.medDate,$.medTime)).getTime(),t),n)).toISOString();for(let e of Re().filter(e=>$.medIds.includes(e.id)))Ye({medicationId:e.id,takenAt:r,dose:e.dose,effect:$.helped});$.medIds=[];let i=mt($.episodeId);if($.helped)for(let e of i.filter(e=>!e.effect))Xe(e.id,{effect:$.helped});pt($.episodeId,{medicationIntakeIds:i.map(e=>e.id)})}var gf=(e,t,n)=>K`
  <div class="field-row">
    ${Z({label:z(`episodeFlow.date`),name:`${e}Date`,type:`date`,value:t})}
    ${Z({label:z(`episodeFlow.time`),name:`${e}Time`,type:`time`,value:n})}
  </div>`,_f=(e,t,n)=>K`
  <div class="form-section" id="${e}-wrap"${t.includes(`other`)?``:K` hidden`}>
    ${Z({label:z(`episodeFlow.${e}`),name:e,value:n,placeholder:z(`episodeFlow.${e}Placeholder`),maxlength:80})}
  </div>`,vf={type:{title:()=>z(`episodeFlow.typeTitle`),lead:()=>z(`episodeFlow.typeLead`),body:()=>K`
      <div class="step-options">
        ${ml({name:`episodeType`,legend:z(`episodeFlow.sections.type`),options:cu.map(e=>({value:e,label:wu(e)})),selected:$.type})}
      </div>
      <div class="intensity-list form-section">
        ${Yd({index:`overall`,label:z(`episodeFlow.intensity`),value:Kd($.overall)})}
      </div>`,onChange(e){e.name===`episodeType`&&($.type=e.value)},confirm:()=>Jd($.overall)},symptoms:{title:()=>z(`episodeFlow.symptomsTitle`),lead:()=>z(`episodeFlow.symptomsLead`),body:()=>K`
      ${$d({name:`symptom`,legend:z(`episodeFlow.symptomsTitle`),items:Qd(),selected:$.symptoms.map(e=>e.key)})}
      <form class="custom-add" data-form="custom">
        <label class="field__label" for="custom-symptom">${z(`log.custom`)}</label>
        <div class="custom-add__row">
          <input class="field__input" id="custom-symptom" name="custom" maxlength="40" autocomplete="off"
            placeholder="${z(`log.customPlaceholder`)}" />
          <button type="submit" class="btn btn--secondary btn--compact">${q(`plus`,{size:20})}<span>${z(`log.customAdd`)}</span></button>
        </div>
      </form>`,onChange(e){e.name===`symptom`&&(e.checked?$.symptoms.push({key:e.value,intensity:null,pending:!0}):$.symptoms=$.symptoms.filter(t=>t.key!==e.value))}},intensity:{title:()=>z(`log.intensityTitle`),lead:()=>z(`log.intensityLead`),body:()=>K`
      <div class="intensity-list">
        ${$.symptoms.map((e,t)=>Yd({index:t,label:_u(e.key),value:Kd(e),iconName:vu(e.key)}))}
      </div>`,confirm:()=>$.symptoms.forEach(Jd)},triggers:{title:()=>z(`episodeFlow.triggersTitle`),lead:()=>z(`episodeFlow.triggersLead`),body:()=>K`
      ${$d({name:`trigger`,legend:z(`episodeFlow.triggersTitle`),items:lu.map(e=>({key:e,icon:uu[e],label:Cu(e)})),selected:$.triggers})}
      <div class="form-section" id="trigger-other"${$.triggers.includes(`other`)?``:K` hidden`}>
        ${Z({label:z(`episodeFlow.triggerOther`),name:`triggerOther`,value:$.triggerOther,placeholder:z(`episodeFlow.triggerOtherPlaceholder`),maxlength:80})}
      </div>`,onChange(e){e.name===`trigger`&&($.triggers=df($.triggers,e.value,e.checked),e.value===`other`&&(document.getElementById(`trigger-other`).hidden=!e.checked))},onInput(e){e.name===`triggerOther`&&($.triggerOther=e.value)}},meds:{title:()=>z(`episodeFlow.medsTitle`),lead:()=>z(`episodeFlow.medsLead`),body:()=>{let e=Re(),t=mt($.episodeId);return K`
        ${t.length?K`<section class="form-section" aria-labelledby="meds-logged">
              <h2 class="section-title" id="meds-logged">${z(`episodeFlow.medsLogged`)}</h2>
              ${Nu({intakes:t})}
            </section>`:``}
        ${e.length?K`
              <div class="step-options">
                ${ml({name:`med`,type:`checkbox`,legend:z(`episodeFlow.medsTitle`),options:e.map(e=>({value:e.id,label:[e.name,e.dose].filter(Boolean).join(` · `)})),selected:$.medIds})}
              </div>
              <fieldset class="form-section" id="med-when"${$.medIds.length?``:K` hidden`}>
                <legend class="section-title">${z(`episodeFlow.medsWhen`)}</legend>
                ${gf(`med`,$.medDate,$.medTime)}
              </fieldset>`:K`<p class="empty form-section">${z(`episodeFlow.medsNone`)}</p>`}
        <div class="form-section">
          ${X({label:z(`episodeFlow.addMed`),iconName:`plus`,variant:`secondary`,action:`addMed`,block:!0})}
        </div>
        ${e.length||t.length?K`<fieldset class="form-section">
              <legend class="section-title">${z(`episodeFlow.helped`)}</legend>
              ${ml({name:`helped`,legend:z(`episodeFlow.helped`),options:pu.map(e=>({value:e,label:Su(e)})),selected:$.helped})}
            </fieldset>`:``}`},onChange(e){e.name===`med`&&($.medIds=df($.medIds,e.value,e.checked),document.getElementById(`med-when`).hidden=!$.medIds.length),e.name===`helped`&&($.helped=e.value),[`medDate`,`medTime`].includes(e.name)&&e.value&&($[e.name]=e.value)},validate(){if(!$.medIds.length)return!0;let e=ct($.episodeId),t=new Date(ye($.medDate,$.medTime));return t>=pf(e.startedAt)&&t<=pf(e.endedAt??new Date)||ff(`medTime`,z(`episodeFlow.medsOutside`))},afterCommit:hf},relief:{title:()=>z(`episodeFlow.reliefTitle`),lead:()=>z(`episodeFlow.reliefLead`),body:()=>K`
      <div class="step-options">
        ${ml({name:`relief`,type:`checkbox`,legend:z(`episodeFlow.reliefTitle`),options:du.map(e=>({value:e,label:Tu(e)})),selected:$.relief})}
      </div>
      ${_f(`reliefOther`,$.relief,$.reliefOther)}`,onChange(e){e.name===`relief`&&($.relief=df($.relief,e.value,e.checked),e.value===`other`&&(document.getElementById(`reliefOther-wrap`).hidden=!e.checked))},onInput(e){e.name===`reliefOther`&&($.reliefOther=e.value)}},impact:{title:()=>z(`episodeFlow.impactTitle`),lead:()=>z(`episodeFlow.impactLead`),body:()=>K`
      <div class="step-options">
        ${ml({name:`impact`,type:`checkbox`,legend:z(`episodeFlow.impactTitle`),options:fu.map(e=>({value:e,label:Eu(e)})),selected:$.impact})}
      </div>
      ${_f(`impactOther`,$.impact,$.impactOther)}`,onChange(e){if(e.name!==`impact`)return;$.impact=df($.impact,e.value,e.checked);let t=$.impact.filter(e=>e!==`none`);if(e.checked&&(e.value===`none`?t.length:$.impact.includes(`none`))){$.impact=e.value===`none`?[`none`]:t;for(let e of document.querySelectorAll(`input[name="impact"]`))e.checked=$.impact.includes(e.value)}document.getElementById(`impactOther-wrap`).hidden=!$.impact.includes(`other`)},onInput(e){e.name===`impactOther`&&($.impactOther=e.value)}},summary:{title:()=>z(`episodeFlow.summaryTitle`),lead:()=>z(`episodeFlow.summaryLead`),body:e=>{let t=af(e),n=t.filter(e=>!e.value);return K`
        <div class="summary-status">
          ${e.endedAt?yl(z(`episode.statusEnded`),{neutral:!0}):yl(z(`episode.statusOngoing`),{live:!0})}
        </div>
        ${sf(t.filter(e=>e.value),{editable:!0})}
        ${n.length?K`<section class="summary-missing" aria-labelledby="missing-title">
              <h2 class="section-title" id="missing-title">${z(`episodeFlow.summaryMissing`)}</h2>
              <div class="summary-missing__list">
                ${n.map(e=>K`<button type="button" class="chip-btn" data-action="edit" data-step="${e.step}">
                    ${q(`plus`,{size:16})}${z(`episodeFlow.sections.${e.key}`)}
                  </button>`)}
              </div>
            </section>`:``}`}}};function yf(){return J({header:Y({back:`/today`}),body:K`<h1 class="screen-title" tabindex="-1">${z(`episode.title`)}</h1>
      <p class="screen-lead">${z(`episode.notFound`)}</p>`})}var bf=e=>vf[e.params.step]&&uf().includes(e.params.step)?e.params.step:`type`;function xf(e){let t=vf[bf(e)];return t.validate&&!t.validate()?!1:(mf(),t.afterCommit?.(),!0)}var Sf=(e,t)=>`/episode/${e.params.id}/details/${t}`,Cf=e=>e===`overall`?$.overall:$.symptoms[Number(e)],wf={render(e){let t=ct(e.params.id);if(!t)return yf();(!$||$.episodeId!==t.id)&&($=cf(t));let n=bf(e),r=vf[n],i=uf();return J({header:Y({backAction:`prevStep`,step:i.indexOf(n)+1,total:i.length}),body:K`
        <h1 class="screen-title" tabindex="-1">${r.title(t)}</h1>
        ${r.lead?K`<p class="screen-lead">${r.lead(t)}</p>`:``}
        ${r.body(t)}`,footer:n===`summary`?X({label:z(`episodeFlow.save`),iconName:`check`,action:`save`,block:!0}):K`
              ${X({label:z(`common.continue`),action:`next`,block:!0})}
              ${X({label:z(`episode.saveLater`),variant:`ghost`,action:`later`,block:!0})}`})},onChange(e,t){if(e.type===`range`)return this.onInput(e,t);vf[bf(t)].onChange?.(e)},onInput(e,t){if(e.type===`range`){let t=Number(e.value);qd(Cf(e.dataset.index),t),Xd(e.dataset.index,t)}else vf[bf(t)].onInput?.(e)},onSubmit(e,t){if(e.dataset.form!==`custom`)return;let n=st(e.elements.custom.value);n&&($.symptoms.some(e=>e.key===n.key)||$.symptoms.push({key:n.key,intensity:null,pending:!0}),t.rerender())},actions:{...ef,clear(e){let{index:t}=e.dataset;qd(Cf(t),null),Xd(t,null),document.querySelector(`[data-action="restore"][data-index="${t}"]`).focus()},restore(e){let{index:t}=e.dataset;qd(Cf(t),5),Xd(t,5),document.getElementById(`int-${t}`).focus()},next(e,t){if(vf[bf(t)].confirm?.(),!xf(t))return;let n=uf(),r=n[n.indexOf(bf(t))+1],i=t.query.from===`summary`,o=i&&r!==`intensity`?`summary`:r;a(`${Sf(t,o)}${i&&o!==`summary`?`?from=summary`:``}`,{replace:!0})},prevStep(e,t){if(!xf(t))return;let n=uf(),r=n.indexOf(bf(t));t.query.from===`summary`?a(Sf(t,`summary`),{replace:!0}):a(r>0?Sf(t,n[r-1]):`/episode/${t.params.id}`,{replace:!0})},later(e,t){xf(t)&&($=null,a(`/today`,{replace:!0}),Q(z(`episode.savedLater`)))},save(){mf(),$=null,a(`/today`,{replace:!0}),Q(z(`episodeFlow.saved`))},edit(e,t){a(`${Sf(t,e.dataset.step)}?from=summary`,{replace:!0})},addMed(e,t){xf(t)&&a(`/treatment/new`)}}};function Tf(e){return K`
    <section class="card card--accent episode-live" aria-labelledby="live-title">
      <div class="episode-live__head">
        ${yl(z(`episode.statusOngoing`),{live:!0})}
        <span class="muted small">${z(`episode.since`,{time:$l(e.startedAt)})}</span>
      </div>
      <div>
        <h2 class="card__title" id="live-title">${z(`episode.title`)}</h2>
        <p class="muted">${z(`episode.lasting`,{duration:au(e.startedAt)})}</p>
      </div>
      <div class="btn-row">
        ${X({label:z(`episode.addDetails`),variant:`secondary`,action:`details`,compact:!0})}
        ${X({label:z(`episode.end`),variant:`secondary`,action:`endEpisode`,data:{id:e.id},compact:!0})}
      </div>
    </section>`}function Ef(e,t,n,{href:r,add:i,empty:a=!1}={}){let o=K`
    <span class="tile__label">${q(e,{size:18})}${t}</span>
    <span class="tile__value${a?` tile__value--empty`:``}">${n}</span>`;return r?K`<a class="tile tile--link" href="${r}">${o}</a>`:i?K`
    <div class="tile tile--with-add">
      ${o}
      <a class="tile__add" href="${i.href}" aria-label="${i.label}" title="${i.label}">${q(`plus`,{size:22,strokeWidth:2.25})}</a>
    </div>`:K`<div class="tile">${o}</div>`}var Df=(e,t,n)=>Ef(e,t,K`<span class="tile__lock">${q(`lock`,{size:14})}${z(`plus.name`)}</span>`,{href:`#/plus?from=${n}`});function Of(){let e=z(`today.pressure`),t=z(`today.steps`);if(!wt())return[Df(`gauge`,e,`weather`),Df(`footprints`,t,`health`)];let{weather:n,health:r}=R(),i=n.enabled?Dt(N()):null,a=r.connected&&r.types.includes(`steps`)?Mt(N()):null;return[i?Ef(`gauge`,e,[Cd(i.pressure),i.pressureChange==null?``:wd(i.pressureChange)].filter(Boolean).join(` · `),{href:`#/plus/weather`}):Ef(`gauge`,e,z(`today.turnOn`),{href:`#/plus/weather`,empty:!0}),a?.steps==null?Ef(`footprints`,t,Gc()?z(`today.connect`):z(`today.mobileOnly`),{href:`#/plus/health`,empty:!0}):Ef(`footprints`,t,Dd(a.steps),{href:`#/plus/health`})]}function kf(e){let t=new Map;for(let n of e)for(let e of n.symptoms){let n=t.get(e.key);t.set(e.key,n==null?e.intensity:Math.max(n,e.intensity??n))}return K`
    <ul class="sym-chips" aria-label="${z(`today.symptomsToday`)}">
      ${[...t].map(([e,t])=>K`<li class="sym-chip">${_u(e)}${t==null?``:K` <strong>${t}</strong>`}</li>`)}
    </ul>`}function Af(){let e=K`<span class="visually-hidden">${z(`community.external`)}</span>`,t=(t,n)=>{let r=K`
      ${q(n)}
      <span class="list__text">
        <span class="list__label">${z(`community.${t}`)}</span>
        <span class="list__hint">${z(`community.${t}Hint`)}</span>
      </span>`;return S[t]?K`
      <a class="list__row" href="${S[t]}" target="_blank" rel="noopener noreferrer">
        ${r}
        <span class="community__ext">${q(`externalLink`,{size:18})}</span>
        ${e}
      </a>`:K`<div class="list__row">${r}${yl(z(`community.soon`),{neutral:!0})}</div>`};return K`
    <section class="section" aria-labelledby="community-title">
      <h2 class="section-title" id="community-title">${z(`community.title`)}</h2>
      <p class="community__lead">${z(`community.lead`)}</p>
      <div class="list">${t(`facebook`,`users`)}${t(`instagram`,`camera`)}${t(`discord`,`messages`)}</div>
      <div class="community-web">
        <h3 class="community-web__title">${z(`community.webTitle`)}</h3>
        <p class="muted">${z(`community.webText`)}</p>
        <a class="community-web__link" href="${S.web}" target="_blank" rel="noopener noreferrer">
          ${z(`community.webUrl`)}${q(`externalLink`,{size:18})}${e}
        </a>
      </div>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${z(`community.note`)}</span></p>
    </section>`}var jf={render(){let{name:e}=R(),t=Bt(),n=lt(),r=t.episodes.length+t.symptomLogs.length+t.intakes.length>0||!!t.sleep,i=t.sleep?[iu(t.sleep.minutes),t.sleep.quality?Du(t.sleep.quality):``].filter(Boolean).join(` · `):``,a=`#/sleep?date=${N()}`,o=z(`today.nothingYet`);return sl(`today`,K`
      <header class="today-header">
        <h1 class="screen-title today-title" tabindex="-1">
          ${e?z(`today.greetingName`,{name:e}):z(`today.greeting`)}
        </h1>
        ${fl()}
        <p class="today-date">${Zl()}</p>
      </header>

      ${n?Tf(n):``}

      <section class="card feeling" aria-labelledby="feeling-title">
        <h2 class="card__title" id="feeling-title">${z(`today.howAreYou`)}</h2>
        ${t.symptomLogs.length?kf(t.symptomLogs):K`${Dl({size:150})}<p class="muted">${z(`today.noEntries`)}</p>`}
        <div class="btn-row">
          ${X({label:z(`today.addSymptom`),iconName:`plus`,action:`addSymptom`,compact:!0})}
        </div>
      </section>

      ${n?``:zd()}

      <section class="section" aria-labelledby="overview-title">
        <h2 class="section-title" id="overview-title">${z(`today.overview`)}</h2>
        <div class="tiles tiles--grid">
          ${t.sleep?Ef(`bed`,z(`today.sleep`),i,{href:a}):Ef(`bed`,z(`today.sleep`),o,{empty:!0,add:{href:a,label:z(`sleep.add`)}})}
          ${Ef(`pill`,z(`today.meds`),t.intakes.length?ar(`plural.entries`,t.intakes.length):o,{empty:!t.intakes.length,add:{href:`#/medication-intake`,label:z(`today.logIntake`)}})}
          ${Of()}
        </div>
        ${r?Nu(t):K`<p class="empty">${z(`today.entriesEmpty`)}</p>`}
      </section>

      ${Af()}`)},mount(e,t){if(!lt())return null;let n=setInterval(()=>t.rerender(),3e4);return()=>clearInterval(n)},actions:{addSymptom(){Vd(),a(`/log/symptoms`)},details(){a(lf(lt()))},async endEpisode(e,t){let{id:n}=e.dataset;e.disabled=!0,await yc(e.closest(`.episode-live`)),ft(n),t.rerender(),Q(z(`episode.endedToast`),{actionLabel:z(`common.undo`),onAction:()=>{ht(n),t.rerender()}})}}};function Mf(){return J({header:Y({back:`/today`}),body:K`<h1 class="screen-title" tabindex="-1">${z(`episode.title`)}</h1>
      <p class="screen-lead">${z(`episode.notFound`)}</p>`})}function Nf(e){return J({variant:`screen--center`,header:Y({back:`/today`}),body:K`
      <div class="episode-started">
        ${bl(`timer`,{large:!0})}
        <h1 class="screen-title" tabindex="-1">${z(`episode.started`)}</h1>
        <p class="big-time">
          <span class="big-time__label">${z(`episode.startedAt`)}</span>
          <time datetime="${e.startedAt}">${Ql(e.startedAt)}</time>
        </p>
        <p class="muted">${z(`episode.detailsLater`)}</p>
      </div>`,footer:K`
      ${X({label:z(`episode.addDetails`),action:`addDetails`,block:!0})}
      ${X({label:z(`episode.finishLater`),variant:`outline`,action:`finishLater`,block:!0})}
      <p class="mistake">
        <span>${z(`episode.mistake`)}</span>
        <button type="button" class="link-btn" data-action="cancelNew">${z(`episode.cancel`)}</button>
      </p>`})}function Pf(e){let t=et(e.id),n=Ge().filter(t=>t.episodeId===e.id);return K`
    ${t.length?K`<section class="section"><h2 class="section-title">${z(`episode.linkedSymptoms`)}</h2>${Nu({symptomLogs:t})}</section>`:``}
    ${n.length?K`<section class="section"><h2 class="section-title">${z(`episode.linkedIntakes`)}</h2>${Nu({intakes:n})}</section>`:``}`}function Ff(e){let t=!e.endedAt,n=of(e),r=af(e,{withTime:!1}).filter(e=>e.value);return J({header:Y({back:`/today`}),body:K`
      <div class="episode-head">
        <h1 class="screen-title" tabindex="-1">${z(`episode.title`)}</h1>
        ${t?yl(z(`episode.statusOngoing`),{live:!0}):yl(z(`episode.statusEnded`),{neutral:!0})}
      </div>
      <p class="screen-lead">${Zl(new Date(e.startedAt))}</p>
      <dl class="facts">
        <div class="fact">
          <dt>${z(`episode.startedAt`)}</dt>
          <dd>${Ql(e.startedAt)}</dd>
        </div>
        <div class="fact">
          <dt>${z(`episode.endedAt`)}</dt>
          <dd>${t?`—`:Ql(e.endedAt)}</dd>
        </div>
        <div class="fact">
          <dt>${z(`episode.duration`)}</dt>
          <dd>${au(e.startedAt,e.endedAt??new Date)}</dd>
        </div>
      </dl>
      ${n?K`<section class="section" aria-labelledby="details-title">
            <h2 class="section-title" id="details-title">${z(`episode.details`)}</h2>
            ${sf(r)}
          </section>`:``}
      ${Pd(N(e.startedAt))?K`<section class="section" aria-labelledby="context-title">
            <h2 class="section-title" id="context-title">${z(`plus.weather.episodeDay`)}</h2>
            ${Pd(N(e.startedAt))}
          </section>`:``}
      ${Pf(e)}`,footer:K`
      ${t?X({label:z(`episode.end`),action:`end`,block:!0}):``}
      ${X({label:z(n?`episode.editDetails`:`episode.addDetails`),variant:t?`secondary`:`primary`,action:`addDetails`,block:!0})}
      ${t||n?``:X({label:z(`episode.saveLater`),variant:`secondary`,action:`saveLater`,block:!0})}
      ${X({label:z(`episode.delete`),variant:`danger`,action:`delete`,block:!0})}`})}var If={render(e){let t=ct(e.params.id);return t?e.query.new===`1`&&!t.endedAt?Nf(t):Ff(t):Mf()},actions:{addDetails(e,t){a(lf(ct(t.params.id)),{replace:t.query.new===`1`})},saveLater(){a(`/today`,{replace:!0}),Q(z(`episode.savedLater`))},finishLater(){a(`/today`,{replace:!0})},cancelNew(e,t){let n=gt(t.params.id);a(`/today`,{replace:!0}),Q(z(`episode.cancelledToast`),{actionLabel:z(`common.undo`),onAction:()=>{_t(n),t.rerender()}})},end(e,t){let{id:n}=t.params;ft(n),t.rerender(),Q(z(`episode.endedToast`),{actionLabel:z(`common.undo`),onAction:()=>{ht(n),t.rerender()}})},async delete(e,t){if(!await ql({title:z(`episode.deleteTitle`),text:z(`episode.deleteText`),confirmLabel:z(`episode.delete`)}))return;let n=gt(t.params.id);s(`/today`),Q(z(`episode.deletedToast`),{actionLabel:z(`common.undo`),onAction:()=>{_t(n),t.rerender()}})}}};function Lf(e){return K`
    <li>
      <a class="entry" href="#/treatment/${e.id}/intake" data-replace>
        <span class="entry__main">
          <span class="entry__title">${[e.name,e.dose].filter(Boolean).join(` · `)}</span>
          ${e.frequency?K`<span class="entry__meta">${e.frequency}</span>`:``}
        </span>
        ${q(`chevronRight`,{size:20})}
      </a>
    </li>`}function Rf(e,t){let n=t.filter(t=>t.type===e);return n.length?K`
    <section class="section" aria-labelledby="pick-${e}">
      <h2 class="section-title" id="pick-${e}">${z(`treatment.${e}`)}</h2>
      <ul class="entries">${n.map(Lf)}</ul>
    </section>`:``}var zf={render(){let e=Re();return J({header:Y({back:`/today`}),body:K`
        <h1 class="screen-title" tabindex="-1">${z(`quickIntake.title`)}</h1>
        ${e.length?K`<p class="screen-lead">${z(`quickIntake.lead`)}</p>${Rf(`acute`,e)}${Rf(`preventive`,e)}`:K`<p class="screen-lead">${z(`quickIntake.empty`)}</p>`}`,footer:X({label:z(`quickIntake.add`),iconName:`plus`,variant:e.length?`secondary`:`primary`,action:`add`,block:!0})})},actions:{add(){a(`/treatment/new`)}}},Bf=[`yearly`,`monthly`];function Vf(e){return Tt({plan:e,simulated:!0}),!0}function Hf(){return wt()}function Uf(){let{simulated:e}=R().plus;Et(),e&&(kt(),Pt(),Lt({enabled:!1}))}var Wf=[0,1,5,15];function Gf(e){let t=M();return K`
    <section class="profile-section" aria-labelledby="security-title">
      <h2 id="security-title">${z(`security.title`)}</h2>
      <div class="list">
        ${vl({name:`appLock`,label:z(`security.pin`),hint:z(t?`security.pinOnHint`:`security.pinOffHint`),checked:t,iconName:`lock`})}
        ${t?K`
              <a class="list__row" href="#/security/pin?mode=change">
                ${q(`keyRound`)}<span class="list__label">${z(`security.changePin`)}</span>${q(`chevronRight`,{size:20})}
              </a>
              <div class="list__field">
                <label class="field__label" for="f-autoLock">${z(`security.autoLock`)}</label>
                <select class="field__input" id="f-autoLock" name="autoLock">
                  ${Wf.map(t=>K`<option value="${t}"${t===(e.autoLockMinutes??1)?K` selected`:``}>
                      ${z(`security.autoLockOptions.m${t}`)}
                    </option>`)}
                </select>
              </div>`:``}
        <label class="list__row list__row--switch is-disabled" for="f-biometrics">
          ${q(`scanFace`)}
          <span class="list__text">
            <span class="list__label">${z(`security.biometrics`)}</span>
            <span class="list__hint" id="f-biometrics-hint">${z(`security.biometricsHint`)}</span>
          </span>
          <input class="switch" type="checkbox" role="switch" id="f-biometrics" disabled aria-describedby="f-biometrics-hint" />
        </label>
      </div>
    </section>`}function Kf(){let e=new Blob([JSON.stringify(Rt(),null,2)],{type:`application/json`}),t=URL.createObjectURL(e),n=document.createElement(`a`);n.href=t,n.download=`vestie-${N()}.json`,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(t),1e3)}var qf={render(){let e=R();return sl(`profile`,K`
      <h1 class="screen-title" tabindex="-1">${z(`profile.title`)}</h1>

      ${K`<section class="profile-section" aria-labelledby="demo-title">
            <h2 id="demo-title">${z(`profile.demoSection`)}</h2>
            <div class="list">
              ${vl({name:`demoEnabled`,label:z(`profile.demoFill`),hint:z(`profile.demoFillHint`),checked:e.demoEnabled,iconName:`sparkles`})}
              ${vl({name:`demoPlus`,label:z(`profile.demoPlus`),hint:z(`profile.demoPlusHint`),checked:wt(),iconName:`lock`})}
            </div>
          </section>`}

      <section class="profile-section" aria-labelledby="plus-title">
        <h2 id="plus-title">${z(`plus.name`)}</h2>
        <div class="list">
          <a class="list__row" href="#/plus">
            ${q(`sparkles`)}
            <span class="list__text">
              <span class="list__label">${z(wt()?`profile.plusActive`:`profile.plusTry`)}</span>
              <span class="list__hint">${wt()&&e.plus.trialEndsAt?z(`plus.manage.trialUntil`,{date:tu(e.plus.trialEndsAt)}):z(`profile.plusHint`)}</span>
            </span>
            ${q(`chevronRight`,{size:20})}
          </a>
        </div>
      </section>

      <section class="profile-section" aria-labelledby="me-title">
        <h2 id="me-title">${z(`profile.me`)}</h2>
        ${Z({label:z(`profile.name`),name:`name`,value:e.name,placeholder:z(`profile.namePlaceholder`),hint:z(`profile.nameHint`),autocomplete:`given-name`,maxlength:40})}
      </section>

      <section class="profile-section" aria-labelledby="lang-title">
        <h2 id="lang-title">${z(`profile.language`)}</h2>
        <label class="visually-hidden" for="f-language">${z(`profile.language`)}</label>
        <select class="field__input" id="f-language" name="language">
          ${Zn.map(t=>K`<option value="${t}" lang="${t}"${t===e.language?K` selected`:``}>${ir(t,`language.${t}`)}</option>`)}
        </select>
      </section>

      <section class="profile-section" aria-labelledby="tracking-title">
        <h2 id="tracking-title">${z(`profile.tracking`)}</h2>
        <div class="list">
          ${vl({name:`cycleTracking`,label:z(`profile.cycle`),checked:e.cycleTracking===!0,iconName:`calendar`})}
          ${vl({name:`reminderEnabled`,label:z(`profile.reminders`),checked:e.reminder.enabled,iconName:`bell`})}
          ${e.reminder.enabled?K`<div class="list__field">
                ${Z({label:z(`profile.reminderTime`),name:`reminderTime`,type:`time`,value:e.reminder.time})}
              </div>`:``}
        </div>
      </section>

      <section class="profile-section" aria-labelledby="display-title">
        <h2 id="display-title">${z(`profile.display`)}</h2>
        <div class="list">
          <div class="list__field list__field--first">
            <span class="field__label" aria-hidden="true">${z(`profile.appearance`)}</span>
            ${hl({name:`theme`,legend:z(`profile.appearance`),selected:e.theme??`system`,options:Cc.map(e=>({value:e,label:z(`profile.themes.${e}`)}))})}
          </div>
          ${vl({name:`reduceMotion`,label:z(`profile.reduceMotion`),hint:z(`profile.reduceMotionHint`),checked:e.reduceMotion,iconName:`sparkles`})}
        </div>
      </section>

      <section class="profile-section" aria-labelledby="integrations-title">
        <h2 id="integrations-title">${z(`profile.integrations`)}</h2>
        <div class="list">
          <a class="list__row" href="${wt()?`#/plus/health`:`#/plus?from=health`}">
            ${q(`watch`)}
            <span class="list__text">
              <span class="list__label">${z(`profile.health`)}</span>
              <span class="list__hint">${z(`profile.healthHint`)}</span>
            </span>
            ${wt()?``:q(`lock`,{size:18,label:z(`plus.lockedLabel`)})}
            ${q(`chevronRight`,{size:20})}
          </a>
          <a class="list__row" href="${wt()?`#/plus/weather`:`#/plus?from=weather`}">
            ${q(`gauge`)}
            <span class="list__text">
              <span class="list__label">${z(`plus.features.weather.title`)}</span>
              <span class="list__hint">${z(`profile.weatherHint`)}</span>
            </span>
            ${wt()?``:q(`lock`,{size:18,label:z(`plus.lockedLabel`)})}
            ${q(`chevronRight`,{size:20})}
          </a>
        </div>
      </section>

      ${Gf(e)}

      <section class="profile-section" aria-labelledby="privacy-title">
        <h2 id="privacy-title">${z(`profile.privacy`)}</h2>
        <div class="list">
          <div class="list__row">
            ${q(`smartphone`)}
            <span class="list__text">
              <span class="list__label">${z(`privacy.deviceOnly`)}</span>
              <span class="list__hint">${z(`privacy.deviceOnlyHint`)}</span>
            </span>
          </div>
          <button type="button" class="list__row" data-action="exportData">
            ${q(`download`)}
            <span class="list__text">
              <span class="list__label">${z(`privacy.export`)}</span>
              <span class="list__hint">${z(`privacy.exportHint`)}</span>
            </span>
          </button>
          <a class="list__row" href="#/privacy-policy">
            ${q(`fileText`)}
            <span class="list__label">${z(`privacyPolicy.title`)}</span>
            ${q(`chevronRight`,{size:20})}
          </a>
          <div class="list__row">
            ${q(`shield`)}
            <span class="list__text">
              <span class="list__label">${z(`privacy.consent`)}</span>
              <span class="list__hint">
                ${e.consent?.healthDataAt?z(`privacy.consentGiven`,{date:tu(e.consent.healthDataAt)}):``}
              </span>
              <button type="button" class="link-btn list__chip" data-action="withdrawConsent">${z(`privacy.withdraw`)}</button>
            </span>
          </div>
          <button type="button" class="list__row list__row--danger" data-action="deleteAll">
            ${q(`trash`)}
            <span class="list__label">${z(`profile.deleteAll`)}</span>
          </button>
        </div>
      </section>

      <section class="profile-section" aria-labelledby="dev-title">
        <h2 id="dev-title">${z(`profile.dev`)}</h2>
        <div class="list">
          ${K`
                ${e.demoEnabled?K`<button type="button" class="list__row" data-action="demoReset">
                      ${q(`sparkles`)}<span class="list__label">${z(`profile.demoReset`)}</span>
                    </button>`:``}
                <button type="button" class="list__row" data-action="onboardingAgain">
                  ${q(`arrowRight`)}<span class="list__label">${z(`profile.onboardingAgain`)}</span>
                </button>`}
          <a class="list__row" href="#/styleguide">
            ${q(`palette`)}
            <span class="list__label">${z(`profile.styleguide`)}</span>
            ${q(`chevronRight`,{size:20})}
          </a>
        </div>
      </section>

      <div class="section">
        ${X({label:z(`profile.logout`),variant:`outline`,iconName:`logOut`,action:`logout`,block:!0})}
      </div>

      <p class="disclaimer">${q(`info`,{size:20})}<span>${z(`profile.disclaimer`)}</span></p>`,{header:Y({back:`/today`})})},onChange(e,t){let{reminder:n}=R();switch(e.name){case`name`:Fe({name:e.value.trim(),nameSetAt:e.value.trim()?new Date().toISOString():null}),Q(z(`profile.saved`));break;case`language`:er(e.value),Fe({language:e.value}),re({language:e.value}),t.rerender();break;case`theme`:Fe({theme:e.value}),re({theme:e.value}),Ec(e.value);break;case`demoEnabled`:e.checked?Wt(Yn()):Gt(),t.rerender(),Q(z(e.checked?`profile.demoFillOn`:`profile.demoFillOff`));break;case`demoPlus`:e.checked?Vf(`yearly`):Uf(),t.rerender();break;case`appLock`:a(`/security/pin?mode=${e.checked?`set`:`disable`}`);break;case`autoLock`:Fe({autoLockMinutes:Number(e.value)}),Q(z(`profile.saved`));break;case`cycleTracking`:Fe({cycleTracking:e.checked});break;case`reminderEnabled`:Fe({reminder:{...n,enabled:e.checked}}),t.rerender(),e.checked&&vc(document.querySelector(`.list__field`));break;case`reduceMotion`:Fe({reduceMotion:e.checked}),dc();break;case`reminderTime`:e.value&&Fe({reminder:{...n,time:e.value}})}},actions:{async demoReset(e,t){await ql({title:z(`profile.demoResetTitle`),text:z(`profile.demoResetText`),confirmLabel:z(`profile.demoResetConfirm`)})&&(Wt(Yn()),t.rerender(),Q(z(`profile.demoResetDone`)))},onboardingAgain(){Fe({onboardingCompletedAt:null}),a(`/start/welcome`,{replace:!0})},exportData(){Kf(),Q(z(`privacy.exportDone`))},async logout(){M()?Fc():await ql({title:z(`profile.logoutNoPinTitle`),text:z(`profile.logoutNoPinText`),confirmLabel:z(`profile.logoutNoPinConfirm`)})&&a(`/security/pin?mode=set&logout=1`)},async withdrawConsent(){await ql({title:z(`privacy.withdrawTitle`),text:z(`privacy.withdrawText`),confirmLabel:z(`privacy.withdrawConfirm`)})&&(Kt(),dc(),a(`/start/language`,{replace:!0}))},async deleteAll(){await ql({title:z(`profile.deleteAllTitle`),text:z(`profile.deleteAllText`),confirmLabel:z(`profile.deleteAllConfirm`)})&&(Kt(),dc(),a(`/start/language`,{replace:!0}))}}},Jf=[[`--color-bg`,`Pozadie`],[`--color-blob`,`Organické tvary`],[`--color-surface`,`Karty`],[`--color-surface-tint`,`Zvolené / sekundárne`],[`--color-border`,`Okraje`],[`--color-border-strong`,`Výrazné okraje`],[`--color-coral`,`Korálová – akcent`],[`--color-coral-soft`,`Korálová jemná`],[`--color-cta`,`Tlačidlá`],[`--color-cta-pressed`,`Tlačidlá – stlačené`],[`--color-text`,`Text`],[`--color-text-muted`,`Text tlmený`]],Yf=(e,t)=>K`
  <section class="sg-section">
    <h2 class="section-title">${e}</h2>
    ${t}
  </section>`,Xf={render(){return J({header:Y({back:`/profile`}),body:K`
        <h1 class="screen-title" tabindex="-1">Dizajn systém</h1>
        <p class="screen-lead">Farby a písma sú v <code>src/styles/tokens.css</code>, logo v
          <code>src/assets/brand/vm-logo.svg</code>. Ilustrácie sú zatiaľ zástupné v <code>src/ui/placeholders.js</code>.</p>

        ${Yf(`Farby`,K`<div class="sg-swatches">
            ${Jf.map(([e,t])=>K`
                <div class="sg-swatch">
                  <span class="sg-swatch__color" style="background:var(${e})"></span>
                  <span class="sg-swatch__label">${t}</span>
                  <code class="sg-swatch__token">${e}</code>
                </div>`)}
          </div>`)}

        ${Yf(`Typografia`,K`<div class="stack">
            <p class="sg-type sg-type--3xl">Nadpis úvodu 38</p>
            <p class="sg-type sg-type--2xl">Nadpis obrazovky 32</p>
            <p class="sg-type sg-type--xl">Nadpis dialógu 26</p>
            <p class="sg-type sg-type--lg">Nadpis sekcie a karty 20</p>
            <p>Bežný text 17 – Zaznamenávajte svoje symptómy, hľadajte možné súvislosti.</p>
            <p class="muted small">Doplnkový text 15 – tlmená farba pre vysvetlivky.</p>
          </div>`)}

        ${Yf(`Tlačidlá`,K`<div class="stack">
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

        ${Yf(`Výber možností`,K`<div class="stack">
            ${ml({name:`sg-radio`,legend:`Jedna možnosť`,options:[{value:`a`,label:`Vestibulárna migréna`},{value:`b`,label:`Migréna`}],selected:`a`})}
            ${ml({name:`sg-check`,type:`checkbox`,legend:`Viac možností`,options:[{value:`a`,label:`Sledovať moje symptómy`},{value:`b`,label:`Zaznamenávať možné spúšťače`}],selected:[`a`]})}
            ${hl({name:`sg-seg`,legend:`Segment`,selected:`a`,options:[{value:`a`,label:`Preventívny`},{value:`b`,label:`Akútny`}]})}
          </div>`)}

        ${Yf(`Polia a prepínače`,K`<div class="stack">
            ${Z({label:`Názov lieku`,name:`sg-name`,placeholder:`napr. Betahistín`})}
            ${Z({label:`Poznámka`,name:`sg-note`,multiline:!0,optional:!0})}
            <div class="list">${vl({name:`sg-switch`,label:`Denná pripomienka`,checked:!0,iconName:`bell`})}</div>
          </div>`)}

        ${Yf(`Karty a štítky`,K`<div class="stack">
            <div class="card">
              <h3 class="card__title">Karta</h3>
              <p class="muted">Zaoblená plocha s jemným tieňom.</p>
            </div>
            <div class="card card--accent">
              <h3 class="card__title">Zvýraznená karta</h3>
              <p class="muted">Napríklad prebiehajúca epizóda.</p>
            </div>
            <div class="btn-row">${yl(`Prebieha`,{live:!0})} ${yl(`Ukončená`,{neutral:!0})}</div>
          </div>`)}

        ${Yf(`Ikony (Lucide)`,K`<div class="sg-icons">
            ${rl.map(e=>K`<span class="sg-icon" title="${e}">${q(e)}</span>`)}
          </div>
          <div class="btn-row" style="margin-top:16px">${bl(`timer`)} ${bl(`pill`,{large:!0})}</div>`)}

        ${Yf(`Logo a ilustrácie (ilustrácie sú zástupné)`,K`<div class="stack">
            ${El()}
            ${El({large:!0})}
            ${Dl({size:220})}
            ${Dl({symbol:`bell`,size:160})}
          </div>`)}`})},actions:{demo(){Q(`Toto je upozornenie (toast)`,{actionLabel:`Vrátiť`,onAction:()=>{}})}}},Zf=`/log/symptoms`;function Qf(){let e=Hd().symptoms.length,t=document.getElementById(`log-continue`);t.disabled=e===0,t.querySelector(`span`).textContent=e?z(`log.continueCount`,{n:e}):z(`common.continue`)}var $f={render(){let e=Hd(),{step:t,total:n}=Gd(Zf),r=e.symptoms.map(e=>e.key),i=r.length;return J({header:Y({back:`/today`,step:t,total:n}),body:K`
        <h1 class="screen-title" tabindex="-1">${z(`log.symptomsTitle`)}</h1>
        <p class="screen-lead">${z(`log.symptomsLead`)}</p>

        <div class="search">
          ${q(`search`,{size:20})}
          <input class="field__input search__input" type="search" id="symptom-search" autocomplete="off"
            placeholder="${z(`log.search`)}" aria-label="${z(`log.search`)}" />
        </div>

        ${$d({name:`symptom`,legend:z(`log.symptomsTitle`),items:Qd(),selected:r,search:!0})}
        <p class="empty" id="sym-empty" hidden>${z(`log.noMatch`)}</p>

        <form class="custom-add" data-form="custom">
          <label class="field__label" for="custom-symptom">${z(`log.custom`)}</label>
          <div class="custom-add__row">
            <input class="field__input" id="custom-symptom" name="custom" maxlength="40" autocomplete="off"
              placeholder="${z(`log.customPlaceholder`)}" />
            <button type="submit" class="btn btn--secondary btn--compact">${q(`plus`,{size:20})}<span>${z(`log.customAdd`)}</span></button>
          </div>
        </form>`,footer:X({label:i?z(`log.continueCount`,{n:i}):z(`common.continue`),action:`next`,id:`log-continue`,disabled:i===0,block:!0})})},onInput(e){if(e.id!==`symptom-search`)return;let t=Zd(e.value.trim()),n=0;for(let e of document.querySelectorAll(`.sym-cell`)){let r=!t||e.dataset.search.includes(t);e.hidden=!r,r&&(n+=1)}document.getElementById(`sym-empty`).hidden=n>0},onChange(e){if(e.name!==`symptom`)return;let t=Hd();e.checked?t.symptoms.push({key:e.value,intensity:null,pending:!0}):t.symptoms=t.symptoms.filter(t=>t.key!==e.value),Qf()},onSubmit(e,t){if(e.dataset.form!==`custom`)return;let n=st(e.elements.custom.value);if(!n)return;let r=Hd();r.symptoms.some(e=>e.key===n.key)||r.symptoms.push({key:n.key,intensity:null,pending:!0}),t.rerender(),document.getElementById(`custom-symptom`).value=``},actions:{...ef,next(){Hd().symptoms.length&&a(Gd(Zf).next,{replace:!0})}}},ep=`/log/intensity`,tp={render(){let{symptoms:e}=Hd(),{step:t,total:n}=Gd(ep);return J({header:Y({backAction:`prevStep`,step:t,total:n}),body:K`
        <h1 class="screen-title" tabindex="-1">${z(`log.intensityTitle`)}</h1>
        <p class="screen-lead">${z(`log.intensityLead`)}</p>
        <div class="intensity-list">
          ${e.map((e,t)=>Yd({index:t,label:_u(e.key),value:Kd(e),iconName:vu(e.key)}))}
        </div>`,footer:K`
        ${X({label:z(`common.continue`),action:`next`,block:!0})}
        ${X({label:z(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onInput(e){if(e.type!==`range`)return;let t=Number(e.dataset.index);qd(Hd().symptoms[t],Number(e.value)),Xd(t,Number(e.value))},onChange(e){this.onInput(e)},actions:{clear(e){let t=Number(e.dataset.index);qd(Hd().symptoms[t],null),Xd(t,null),document.querySelector(`[data-action="restore"][data-index="${t}"]`).focus()},restore(e){let t=Number(e.dataset.index);qd(Hd().symptoms[t],5),Xd(t,5),document.getElementById(`int-${t}`).focus()},next(){Hd().symptoms.forEach(Jd),a(Gd(ep).next,{replace:!0})},skip(){for(let e of Hd().symptoms)qd(e,null);a(Gd(ep).next,{replace:!0})},prevStep(){a(Gd(ep).prev,{replace:!0})}}},np=`/log/details`;function rp(e){return e.episodeId?ct(e.episodeId):xe(e.date)?lt():null}function ip(e){return xe(P(e.date))?z(`log.whenToday`,{time:e.time}):z(`log.whenOn`,{date:Zl(P(e.date)),time:e.time})}var ap={render(){let e=Hd(),{step:t,total:n}=Gd(np),r=rp(e);return J({header:Y({backAction:`prevStep`,step:t,total:n}),body:K`
        <h1 class="screen-title" tabindex="-1">${z(`log.detailsTitle`)}</h1>
        <p class="screen-lead">${z(`log.detailsLead`)}</p>
        <div class="step-options">
          ${ml({name:`duration`,legend:z(`log.detailsTitle`),options:su.map(e=>({value:e,label:xu(e)})),selected:e.duration})}
        </div>

        <fieldset class="form-section">
          <legend class="section-title">${z(`log.when`)}</legend>
          <!-- Čas je predvyplnený (teraz alebo deň z kalendára); polia sa ukážu až na požiadanie -->
          <div class="when-summary"${e.editTime?K` hidden`:``}>
            <span>${ip(e)}</span>
            <button type="button" class="link-btn" data-action="changeTime" aria-controls="when-fields">${z(`log.changeTime`)}</button>
          </div>
          <div class="field-row" id="when-fields"${e.editTime?``:K` hidden`}>
            <div class="field">
              <label class="field__label" for="f-date">${z(`log.date`)}</label>
              <input class="field__input" type="date" id="f-date" name="date" value="${e.date}" max="${N()}" required />
            </div>
            <div class="field">
              <label class="field__label" for="f-time">${z(`log.time`)}</label>
              <input class="field__input" type="time" id="f-time" name="time" value="${e.time}" required />
            </div>
          </div>
          ${r?ml({name:`linkEpisode`,type:`checkbox`,legend:z(`log.linkEpisode`),options:[{value:`yes`,label:`${z(`log.linkEpisode`)} (${z(`episode.since`,{time:Ql(r.startedAt)})})`}],selected:e.linkEpisode?`yes`:null}):``}
        </fieldset>

        <div class="form-section">
          ${Z({label:z(`log.note`),name:`note`,value:e.note,multiline:!0,optional:!0})}
        </div>`,footer:X({label:z(`log.save`),action:`save`,iconName:`check`,block:!0})})},onChange(e){let t=Hd();e.name===`duration`&&(t.duration=e.value),e.name===`date`&&e.value&&(t.date=e.value),e.name===`time`&&e.value&&(t.time=e.value),e.name===`linkEpisode`&&(t.linkEpisode=e.checked)},onInput(e){e.name===`note`&&(Hd().note=e.value)},actions:{changeTime(){Hd().editTime=!0,document.querySelector(`.when-summary`).hidden=!0,document.getElementById(`when-fields`).hidden=!1,document.getElementById(`f-date`).focus()},save(){let e=Hd(),t=rp(e);tt({id:e.id,occurredAt:ye(e.date,e.time),symptoms:e.symptoms,vertigoType:e.vertigoType,duration:e.duration,note:e.note,episodeId:t&&e.linkEpisode?t.id:null}),Ud(),s(`/today`),Q(z(`log.saved`))},prevStep(){a(Gd(np).prev,{replace:!0})}}};function op(e){return K`
    <ul class="sym-rows">
      ${e.symptoms.map(e=>K`
          <li class="sym-row">
            <span class="icon-badge">${q(vu(e.key),{size:22})}</span>
            <span class="sym-row__label">${_u(e.key)}</span>
            <span class="sym-row__value ${e.intensity==null?`muted`:``}">${yu(e.intensity)}</span>
          </li>`)}
    </ul>`}var sp={render(e){let t=$e(e.params.id);if(!t)return J({header:Y({back:`/today`}),body:K`<h1 class="screen-title" tabindex="-1">${z(`symptomLog.title`)}</h1>
          <p class="screen-lead">${z(`symptomLog.notFound`)}</p>`});let n=t.episodeId?ct(t.episodeId):null;return J({header:Y({back:`/today`}),body:K`
        <h1 class="screen-title" tabindex="-1">${z(`symptomLog.title`)}</h1>
        <p class="screen-lead">${Zl(new Date(t.occurredAt))} · ${Ql(t.occurredAt)}</p>
        ${op(t)}
        <dl class="facts">
          ${t.duration?K`<div class="fact"><dt>${z(`symptomLog.duration`)}</dt><dd>${xu(t.duration)}</dd></div>`:``}
          ${n?K`<div class="fact"><dt>${z(`symptomLog.episode`)}</dt>
                <dd><a href="#/episode/${n.id}">${z(`episode.since`,{time:Ql(n.startedAt)})}</a></dd></div>`:``}
        </dl>
        ${t.note?K`<h2 class="section-title section">${z(`symptomLog.note`)}</h2><p class="note-text">${t.note}</p>`:``}`,footer:K`
        ${X({label:z(`symptomLog.edit`),variant:`secondary`,iconName:`pencil`,action:`edit`,block:!0})}
        ${X({label:z(`symptomLog.delete`),variant:`danger`,action:`delete`,block:!0})}`})},actions:{edit(e,t){Vd({logId:t.params.id}),a(`/log/symptoms`)},async delete(e,t){if(!await ql({title:z(`symptomLog.deleteTitle`),text:z(`symptomLog.deleteText`),confirmLabel:z(`symptomLog.delete`)}))return;let n=nt(t.params.id);s(`/today`),Q(z(`symptomLog.deletedToast`),{actionLabel:z(`common.undo`),onAction:()=>{rt(n),t.rerender()}})}}};function cp(e){let t=Ge(e.id)[0];return K`
    <li>
      <a class="entry" href="#/treatment/${e.id}">
        <span class="entry__main">
          <span class="entry__title">${[e.name,e.dose].filter(Boolean).join(` · `)}</span>
          <span class="entry__meta">
            ${[e.frequency,t?z(`treatment.lastTaken`,{when:$l(t.takenAt)}):z(`treatment.neverTaken`)].filter(Boolean).join(` · `)}
          </span>
        </span>
        ${q(`chevronRight`,{size:20})}
      </a>
    </li>`}function lp(e,t){let n=t.filter(t=>t.type===e);return K`
    <section class="section" aria-labelledby="group-${e}">
      <h2 class="section-title" id="group-${e}">${z(`treatment.${e}`)}</h2>
      ${n.length?K`<ul class="entries">${n.map(cp)}</ul>`:K`<p class="empty">${z(`treatment.noneOfType`)}</p>`}
    </section>`}var up={render(){let e=Re();return sl(`treatment`,K`
        ${pl(z(`treatment.title`))}
        <p class="screen-lead">${z(`treatment.lead`)}</p>
        ${e.length?K`<p class="treatment-hint">${z(`treatment.hint`)}</p>`:``}
        ${e.length?K`${lp(`preventive`,e)}${lp(`acute`,e)}`:K`<p class="empty section">${z(`treatment.empty`)}</p>`}
        <div class="section">
          ${X({label:z(`treatment.add`),iconName:`plus`,variant:e.length?`secondary`:`primary`,action:`add`,block:!0})}
        </div>
        <p class="disclaimer">${q(`info`,{size:20})}<span>${z(`treatment.disclaimer`)}</span></p>`)},actions:{add(){a(`/treatment/new`)}}},dp=20,fp=(e,t)=>t?K`<div class="fact"><dt>${e}</dt><dd>${t}</dd></div>`:``;function pp(e){let t=[e.dose,e.effect?Su(e.effect):z(`treatment.effectMissing`),e.episodeId?z(`treatment.inEpisode`):``].filter(Boolean);return K`
    <li>
      <a class="entry" href="#/intake/${e.id}">
        <span class="entry__main">
          <span class="entry__title">${eu(e.takenAt)}</span>
          <span class="entry__meta">${t.join(` · `)}</span>
        </span>
        ${q(`chevronRight`,{size:20})}
      </a>
    </li>`}var mp={render(e){let t=ze(e.params.id);if(!t)return J({header:Y({back:`/treatment`}),body:K`<h1 class="screen-title" tabindex="-1">${z(`treatment.title`)}</h1>
          <p class="screen-lead">${z(`treatment.notFound`)}</p>`});let n=Ge(t.id),r=e.query.all===`1`,i=pu.map(e=>({key:e,count:n.filter(t=>t.effect===e).length})).filter(e=>e.count);return J({header:Y({back:`/treatment`}),body:K`
        <div class="episode-head">
          <h1 class="screen-title" tabindex="-1">${t.name}</h1>
          ${yl(z(`medications.types.${t.type}`),{neutral:!0})}
        </div>
        <dl class="facts">
          ${fp(z(`treatment.dose`),t.dose)}
          ${fp(z(`treatment.frequency`),t.frequency)}
          ${fp(z(`treatment.taken`),ar(`plural.times`,n.length))}
        </dl>
        ${t.note?K`<p class="note-text section-sm">${t.note}</p>`:``}

        ${i.length?K`<section class="section" aria-labelledby="effect-title">
              <h2 class="section-title" id="effect-title">${z(`treatment.effectSummary`)}</h2>
              <ul class="sym-chips sym-chips--start">
                ${i.map(e=>K`<li class="sym-chip">${Su(e.key)} <strong>${ar(`plural.times`,e.count)}</strong></li>`)}
              </ul>
            </section>`:``}

        <section class="section" aria-labelledby="history-title">
          <h2 class="section-title" id="history-title">${z(`treatment.history`)}</h2>
          ${n.length?K`<ul class="entries">${(r?n:n.slice(0,dp)).map(pp)}</ul>
                ${!r&&n.length>dp?K`<button type="button" class="link-btn section-sm" id="show-all" data-action="showAll">
                      ${z(`treatment.showAll`,{n:n.length})}
                    </button>`:``}`:K`<p class="empty">${z(`treatment.historyEmpty`)}</p>`}
        </section>

        <div class="list section">
          <a class="list__row" href="#/treatment/${t.id}/edit">
            ${q(`pencil`)}<span class="list__label">${z(`treatment.edit`)}</span>${q(`chevronRight`,{size:20})}
          </a>
          <button type="button" class="list__row list__row--danger" data-action="delete">
            ${q(`trash`)}<span class="list__label">${z(`treatment.delete`)}</span>
          </button>
        </div>
        <p class="disclaimer">${q(`info`,{size:20})}<span>${z(`treatment.disclaimer`)}</span></p>`,footer:X({label:z(`treatment.logIntake`),iconName:`plus`,action:`logIntake`,block:!0})})},actions:{showAll(e,t){o(`/treatment/${t.params.id}?all=1`),t.rerender()},logIntake(e,t){a(`/treatment/${t.params.id}/intake`)},async delete(e,t){if(!await ql({title:z(`treatment.deleteTitle`),text:z(`treatment.deleteText`),confirmLabel:z(`treatment.delete`)}))return;let n=Ue(t.params.id);s(`/treatment`),Q(z(`treatment.deletedToast`),{actionLabel:z(`common.undo`),onAction:()=>{We(n),t.rerender()}})}}};function hp(e,t){if(t===`edit`){let t=Ke(e.params.id);return{intake:t,medication:t?ze(t.medicationId):null}}return{intake:null,medication:ze(e.params.id)}}function gp({mode:e}){return{render(t){let{intake:n,medication:r}=hp(t,e),i=r?`/treatment/${r.id}`:`/treatment`;if(!r||e===`edit`&&!n)return J({header:Y({back:i}),body:K`<h1 class="screen-title" tabindex="-1">${z(`intake.title`)}</h1>
            <p class="screen-lead">${z(`intake.notFound`)}</p>`});let a=n?new Date(n.takenAt):new Date,o=n?N(a):t.query.date??N(a);return J({form:!0,header:Y({back:i}),body:K`
          <h1 class="screen-title" tabindex="-1">${z(n?`intake.editTitle`:`intake.title`)}</h1>
          <p class="screen-lead">${[r.name,r.dose].filter(Boolean).join(` · `)}</p>
          <div class="form-stack">
            <div class="field-row">
              ${Z({label:z(`intake.date`),name:`date`,type:`date`,value:o})}
              ${Z({label:z(`intake.time`),name:`time`,type:`time`,value:ve(a)})}
            </div>
            ${Z({label:z(`intake.dose`),name:`dose`,value:n?.dose??r.dose,optional:!0})}
            <fieldset class="form-section form-section--tight">
              <legend class="field__label">${z(`intake.effect`)}</legend>
              <p class="field__hint">${z(`intake.effectHint`)}</p>
              ${ml({name:`effect`,legend:z(`intake.effect`),options:pu.map(e=>({value:e,label:Su(e)})),selected:n?.effect})}
            </fieldset>
            ${Z({label:z(`intake.note`),name:`note`,value:n?.note??``,multiline:!0,optional:!0})}
          </div>`,footer:K`
          ${X({label:z(`intake.save`),type:`submit`,iconName:`check`,block:!0})}
          ${n?X({label:z(`intake.delete`),variant:`danger`,action:`delete`,block:!0}):``}`})},onSubmit(t,n){let{intake:r,medication:i}=hp(n,e);if(!i)return;let a=new FormData(t),o=String(a.get(`date`)||N()),c={medicationId:i.id,takenAt:ye(o,String(a.get(`time`)||ve())),dose:String(a.get(`dose`)??``),effect:a.get(`effect`),note:String(a.get(`note`)??``)};r?Xe(r.id,c):Ye(c),Q(z(`intake.saved`)),s(`/treatment/${i.id}`)},actions:{async delete(t,n){let{intake:r,medication:i}=hp(n,e);if(!await ql({title:z(`intake.deleteTitle`),text:z(`intake.deleteText`),confirmLabel:z(`intake.delete`)}))return;let a=Ze(r.id);s(`/treatment/${i.id}`),Q(z(`intake.deletedToast`),{actionLabel:z(`common.undo`),onAction:()=>{Qe(a),n.rerender()}})}}}}function _p(e){let t=zt(e);return{entries:t,count:t.symptomLogs.length+t.episodes.length,episode:t.episodes.length>0,symptoms:t.symptomLogs.length>0,period:t.period}}function vp(){let e=new Date(2024,0,1),t=new Intl.DateTimeFormat(tr(),{weekday:`short`});return Array.from({length:7},(n,r)=>{let i=t.format(F(e,r)).replace(`.`,``);return i.charAt(0).toLocaleUpperCase(tr())+i.slice(1)})}function yp(e,t,{isToday:n,isSelected:r}){let i=[Zl(P(e))];return n&&i.push(z(`calendar.today`)),t.episode&&i.push(z(`calendar.summaryEpisode`)),t.count&&i.push(z(`calendar.summaryEntries`,{n:t.count})),t.period&&i.push(z(`calendar.summaryPeriod`)),!t.count&&!t.period&&i.push(z(`calendar.summaryNone`)),r&&i.push(z(`calendar.selected`)),i.join(`, `)}function bp(e,{inMonth:t,selectedKey:n,todayKey:r,cycleOn:i}){let a=_p(e),o=e===r,s=e===n;return K`
    <button type="button" class="${[`cal-day`,t?``:`cal-day--outside`,a.episode?`cal-day--episode`:``,o?`cal-day--today`:``,s?`cal-day--selected`:``].filter(Boolean).join(` `)}" id="day-${e}" data-action="selectDay" data-day="${e}"
      aria-label="${yp(e,a,{isToday:o,isSelected:s})}"${s?K` aria-pressed="true"`:K` aria-pressed="false"`}>
      <span class="cal-day__num" aria-hidden="true">${Number(e.slice(8))}</span>
      <span class="cal-day__marks" aria-hidden="true">${a.symptoms?K`<span class="cal-dot"></span>`:``}</span>
      ${i&&a.period?K`<span class="cal-period" aria-hidden="true"></span>`:``}
    </button>`}function xp(e,t,n){let r=Ce(e),i=(r.getDay()+6)%7,a=F(r,-i),o=N(),s=Math.ceil((i+new Date(r.getFullYear(),r.getMonth()+1,0).getDate())/7),c=Array.from({length:s*7},(e,t)=>N(F(a,t)));return K`
    <div class="cal">
      <div class="cal-weekdays" aria-hidden="true">${vp().map(e=>K`<span>${e}</span>`)}</div>
      <div class="cal-grid">
        ${c.map(r=>bp(r,{inMonth:r.startsWith(e),selectedKey:t,todayKey:o,cycleOn:n}))}
      </div>
    </div>`}function Sp(e,t){let{entries:n,count:r}=_p(e),i=r+n.intakes.length>0||!!n.sleep,a=e>N();return K`
    <section class="section cal-detail" aria-labelledby="day-title">
      <h2 class="section-title" id="day-title">${Zl(P(e))}</h2>
      ${Pd(e)}
      ${i?Nu(n):K`<p class="empty">${z(`calendar.dayEmpty`)}</p>`}
      ${t?K`<div class="list cal-period-toggle">
            <label class="list__row list__row--switch" for="f-period">
              ${q(`droplet`)}
              <span class="list__label">${z(`calendar.periodMark`)}</span>
              <input class="switch" type="checkbox" role="switch" id="f-period" name="period" data-day="${e}"${n.period?K` checked`:``} />
            </label>
          </div>`:``}
      ${a?``:K`<div class="cal-detail__actions">
            ${X({label:z(`calendar.addSymptom`),iconName:`plus`,variant:`secondary`,action:`addSymptom`,data:{day:e},block:!0})}
            ${n.sleep?``:X({label:z(`sleep.add`),iconName:`bed`,variant:`secondary`,action:`addSleep`,data:{day:e},block:!0})}
          </div>`}
    </section>`}var Cp={render(e){let t=N(),n=e.query.day??t,r=e.query.month??n.slice(0,7),i=R().cycleTracking===!0,a=r===Se();return sl(`calendar`,K`
        ${pl(z(`calendar.title`))}
        <div class="cal-head">
          <button type="button" class="icon-btn" id="cal-prev" data-action="month" data-month="${we(r,-1)}" aria-label="${z(`calendar.prev`)}">
            ${q(`chevronLeft`)}
          </button>
          <h2 class="cal-head__title" aria-live="polite">${nu(Ce(r))}</h2>
          <button type="button" class="icon-btn" id="cal-next" data-action="month" data-month="${we(r,1)}" aria-label="${z(`calendar.next`)}">
            ${q(`chevronRight`)}
          </button>
        </div>
        ${a?``:K`<button type="button" class="link-btn cal-today-link" data-action="goToday">${z(`calendar.backToday`)}</button>`}
        ${xp(r,n,i)}
        <ul class="cal-legend" aria-label="${z(`calendar.legend`)}">
          <li><span class="cal-legend__mark cal-legend__mark--episode" aria-hidden="true"></span>${z(`calendar.legendEpisode`)}</li>
          <li><span class="cal-legend__mark" aria-hidden="true"><span class="cal-dot"></span></span>${z(`calendar.legendSymptoms`)}</li>
          ${i?K`<li><span class="cal-legend__mark" aria-hidden="true"><span class="cal-period cal-period--legend"></span></span>${z(`calendar.legendPeriod`)}</li>`:``}
        </ul>
        ${Sp(n,i)}`)},onChange(e,t){e.name===`period`&&(yt(e.dataset.day),t.rerender())},actions:{month(e,t){let n=t.query.day;o(`/calendar?month=${e.dataset.month}${n?`&day=${n}`:``}`),t.rerender()},goToday(e,t){o(`/calendar`),t.rerender(),document.getElementById(`day-${N()}`)?.focus()},selectDay(e,t){let n=e.dataset.day;o(`/calendar?month=${n.slice(0,7)}&day=${n}`),t.rerender(),document.getElementById(`day-title`)?.scrollIntoView({block:`nearest`})},addSymptom(e){Vd({date:e.dataset.day}),a(`/log/symptoms`)},addSleep(e){a(`/sleep?date=${e.dataset.day}`)}}},wp=[30,60,90];function Tp(e,t){let n=Math.max(...e.map(e=>e.count),1);return K`
    <ul class="bars">
      ${e.map(e=>K`
          <li class="bars__row">
            <span class="bars__label">${t(e.key)}</span>
            <span class="bars__value">${ar(`plural.times`,e.count)}</span>
            <span class="bars__track" aria-hidden="true"><span class="bars__fill" style="width:${Math.max(e.count/n*100,4)}%"></span></span>
          </li>`)}
    </ul>`}var Ep=(e,t,{empty:n=!1}={})=>K`
  <div class="stat">
    <span class="stat__value ${n?`stat__value--empty`:``}">${t}</span>
    <span class="stat__label">${e}</span>
  </div>`,Dp={render(e){let t=wp.includes(Number(e.query.days))?Number(e.query.days):30,n=Lu(Pu(t)),r=z(`insights.noValue`),i=K`
      ${pl(z(`insights.title`))}
      <div class="insights-period">
        ${hl({name:`days`,legend:z(`insights.periodLabel`),selected:String(t),options:wp.map(e=>({value:String(e),label:ar(`plural.days`,e)}))})}
      </div>`;return!n.recordCount&&!n.intakes.length&&!n.sleeps.length?sl(`insights`,K`${i}
          <div class="coming">
            ${Dl({symbol:`chart`,size:200})}
            <p class="muted">${z(`insights.empty`)}</p>
          </div>
          ${X({label:z(`insights.report`),iconName:`fileText`,variant:`secondary`,action:`report`,block:!0})}
          ${Nd()}`):sl(`insights`,K`${i}
        <section class="section" aria-labelledby="ov-title">
          <h2 class="section-title" id="ov-title">${z(`insights.overview`)}</h2>
          <div class="stats">
            ${Ep(z(`insights.symptomDays`),n.symptomDays)}
            ${Ep(z(`insights.episodes`),n.episodeCount)}
            ${Ep(z(`insights.avgIntensity`),n.avgIntensity==null?r:ru(n.avgIntensity),{empty:n.avgIntensity==null})}
            ${Ep(z(`insights.avgDuration`),n.avgDurationMinutes==null?r:iu(n.avgDurationMinutes),{empty:n.avgDurationMinutes==null})}
          </div>
        </section>

        ${Nd()}

        <section class="section" aria-labelledby="sym-title">
          <h2 class="section-title" id="sym-title">${z(`insights.topSymptoms`)}</h2>
          <p class="muted small">${z(`insights.topSymptomsLead`)}</p>
          ${n.symptoms.length?Tp(n.symptoms.slice(0,6),_u):K`<p class="muted">${z(`insights.empty`)}</p>`}
        </section>

        <section class="section" aria-labelledby="trig-title">
          <h2 class="section-title" id="trig-title">${z(`insights.topTriggers`)}</h2>
          ${n.triggers.length?Tp(n.triggers.slice(0,6),Cu):K`<p class="muted">${z(`insights.triggersEmpty`)}</p>`}
        </section>

        <section class="section" aria-labelledby="sleep-title">
          <h2 class="section-title" id="sleep-title">${z(`sleep.title`)}</h2>
          ${n.sleeps.length?K`<div class="stats">
                  ${Ep(z(`sleep.avg`),iu(n.avgSleepMinutes))}
                  ${Ep(z(`sleep.nights`),n.sleeps.length)}
                </div>
                ${n.sleepQuality.length?Tp(n.sleepQuality,Du):``}`:K`<p class="muted">${z(`report.sleepNone`)}</p>`}
        </section>

        <section class="section" aria-labelledby="meds-title">
          <h2 class="section-title" id="meds-title">${z(`insights.meds`)}</h2>
          ${n.meds.length?K`<ul class="med-stats">
                ${n.meds.map(e=>K`
                    <li class="med-stats__row">
                      <a href="#/treatment/${e.medication.id}" class="med-stats__name">${e.medication.name}</a>
                      <span class="med-stats__count">${ar(`plural.times`,e.count)}</span>
                      ${e.effects.length?K`<span class="med-stats__effects">${e.effects.map(e=>`${Su(e.key)} ${ar(`plural.times`,e.count)}`).join(` · `)}</span>`:``}
                    </li>`)}
              </ul>`:K`<p class="muted">${z(`insights.medsEmpty`)}</p>`}
        </section>

        <p class="disclaimer">${q(`info`,{size:20})}<span>${z(`insights.interpretation`)}</span></p>
        <div class="section">
          ${X({label:z(`insights.report`),iconName:`fileText`,action:`report`,block:!0})}
        </div>`)},onChange(e,t){e.name===`days`&&(o(`/insights?days=${e.value}`),t.rerender())},actions:{report(e,t){a(`/report?days=${t.query.days??30}`)}}},Op={render(e){let t=wp.includes(Number(e.query.days))?String(e.query.days):`30`,n=Pu(30);return J({form:!0,header:Y({back:`/insights`}),body:K`
        <h1 class="screen-title" tabindex="-1">${z(`report.title`)}</h1>
        <p class="screen-lead">${z(`report.lead`)}</p>
        <div class="step-options">
          ${ml({name:`range`,legend:z(`report.period`),options:[...wp.map(e=>({value:String(e),label:ar(`plural.days`,e)})),{value:`custom`,label:z(`report.custom`)}],selected:t})}
        </div>
        <!-- Zobrazí sa iba pri „Vlastné obdobie“ (CSS :has) -->
        <div class="report-custom field-row">
          ${Z({label:z(`report.from`),name:`from`,type:`date`,value:n.from})}
          ${Z({label:z(`report.to`),name:`to`,type:`date`,value:n.to})}
        </div>
        ${wt()?``:K`<a class="report-plus-hint" href="#/plus?from=report">
              ${q(`lock`,{size:16})}<span>${z(`report.plusHint`)}</span>
            </a>`}`,footer:X({label:z(`report.create`),type:`submit`,iconName:`fileText`,block:!0})})},onSubmit(e){let t=new FormData(e),n=t.get(`range`),r,i;if(n===`custom`){if(r=String(t.get(`from`)||``),i=String(t.get(`to`)||N()),!r||r>i){gl(e,`from`,z(`report.invalidRange`));return}}else({from:r,to:i}=Pu(Number(n)));a(`/report/view?from=${r}&to=${i}`)}},kp=5;function Ap({from:e,to:t}){if(!wt())return``;let{weather:n,health:r}=R(),i=_d({from:e,to:t}),a=rd({days:365}),o=a.enough?a.factors.filter(e=>e.strength===`strong`||e.strength===`possible`):[];return K`
    ${n.enabled&&i.rows.length?K`<section>
          <h3>${z(`report.weather`)}</h3>
          <p>${z(`report.weatherSummary`,{drops:i.drops,total:i.rows.length})}</p>
          <table class="report-table">
            <thead><tr><th>${z(`plus.weather.colDay`)}</th><th>${z(`plus.weather.colPressure`)}</th><th>${z(`plus.weather.colChange`)}</th><th>${z(`plus.weather.condition`)}</th></tr></thead>
            <tbody>
              ${i.rows.map(e=>K`<tr>
                  <td>${tu(e.episode.startedAt)}</td>
                  <td>${Cd(e.weather.pressure)}</td>
                  <td>${e.weather.pressureChange==null?`–`:wd(e.weather.pressureChange)}</td>
                  <td>${Ed(e.weather.condition)}</td>
                </tr>`)}
            </tbody>
          </table>
        </section>`:``}
    ${o.length?K`<section>
          <h3>${z(`report.patterns`)}</h3>
          <table class="report-table">
            <tbody>
              ${o.map(e=>K`<tr>
                  <td>${z(`plus.finder.factors.${e.key}`)}</td>
                  <td class="num">${z(`plus.finder.ofDays`,{a:e.withHard,b:e.withDays})}</td>
                  <td class="num">${z(`report.patternsOther`,{a:e.withoutHard,b:e.withoutDays})}</td>
                </tr>`)}
            </tbody>
          </table>
          <p class="report-sub">${z(`report.patternsNote`)}</p>
        </section>`:``}
    ${r.connected&&i.avgSteps!=null?K`<section>
          <h3>${z(`report.activity`)}</h3>
          <table class="report-table">
            <tbody>
              <tr><td>${z(`report.avgSteps`)}</td><td class="num">${Dd(i.avgSteps)}</td></tr>
              ${i.avgRestingHr==null?``:K`<tr><td>${z(`report.avgPulse`)}</td><td class="num">${Math.round(i.avgRestingHr)}</td></tr>`}
            </tbody>
          </table>
        </section>`:``}`}function jp(e,t){return e.length?K`
    <table class="report-table">
      <tbody>
        ${e.map(e=>K`<tr><td>${t(e.key)}</td><td class="num">${ar(`plural.times`,e.count)}</td></tr>`)}
      </tbody>
    </table>`:K`<p class="report-none">${z(`report.none`)}</p>`}function Mp(e){let t=[...e.logs.map(e=>{let t=it(e);return{at:e.occurredAt,entry:z(`symptomLog.title`),detail:[bu(e),t==null?``:z(`intensity.highest`,{value:yu(t)}),e.duration?xu(e.duration):``].filter(Boolean).join(` · `)}}),...e.episodes.map(e=>({at:e.startedAt,entry:z(`episode.title`),detail:e.endedAt?`${eu(e.startedAt)} – ${eu(e.endedAt)}`:z(`episode.statusOngoing`)})),...e.intakes.filter(e=>ze(e.medicationId)?.type===`acute`||e.effect||e.episodeId).map(e=>({at:e.takenAt,entry:ze(e.medicationId)?.name??z(`today.intakeTitle`),detail:[e.dose,e.effect?Su(e.effect):``].filter(Boolean).join(` · `)})),...e.sleeps.map(e=>({at:e.wakeTime??ye(e.date,`06:00`),dateOnly:!0,entry:z(`sleep.title`),detail:[iu(e.minutes),e.quality?Du(e.quality):``].filter(Boolean).join(` · `)}))].sort((e,t)=>e.at.localeCompare(t.at));return t.length?K`
    <table class="report-table report-table--timeline">
      <thead><tr><th>${z(`report.colDate`)}</th><th>${z(`report.colEntry`)}</th><th>${z(`report.colDetail`)}</th></tr></thead>
      <tbody>${t.map(e=>K`<tr><td>${e.dateOnly?tu(e.at):eu(e.at)}</td><td>${e.entry}</td><td>${e.detail}</td></tr>`)}</tbody>
    </table>`:K`<p class="report-none">${z(`report.none`)}</p>`}var Np={render(e){let t=e.query.from??N(),n=e.query.to??N(),r=Lu({from:t,to:n}),i=R().cycleTracking===!0,a=r.logs.filter(e=>e.note),o=z(`insights.noValue`);return J({variant:`screen--report`,header:Y({back:`/insights`}),body:K`
        <h1 class="visually-hidden" tabindex="-1">${z(`report.title`)}</h1>
        <p class="report-hint">${z(`report.printHint`)}</p>
        <article class="report-doc">
          <header class="report-doc__head">
            <p class="report-doc__app">${z(`app.name`)}</p>
            <h2 class="report-doc__title screen-title" tabindex="-1">${z(`report.docTitle`)}</h2>
            <dl class="report-meta">
              <div><dt>${z(`report.period`)}</dt><dd>${tu(P(t))} – ${tu(P(n))}</dd></div>
              <div><dt>${z(`report.created`)}</dt><dd>${tu(new Date)}</dd></div>
            </dl>
            <p class="report-disclaimer">${z(`report.disclaimer`)}</p>
            ${r.recordCount<kp?K`<p class="report-warning">${z(`report.fewData`)}</p>`:``}
          </header>

          <section>
            <h3>${z(`report.summary`)}</h3>
            <table class="report-table">
              <tbody>
                <tr><td>${z(`insights.symptomDays`)}</td><td class="num">${r.symptomDays}</td></tr>
                <tr><td>${z(`insights.episodes`)}</td><td class="num">${r.episodeCount}</td></tr>
                <tr><td>${z(`insights.avgIntensity`)}</td><td class="num">${r.avgIntensity==null?o:ru(r.avgIntensity)}</td></tr>
                <tr><td>${z(`insights.avgDuration`)}</td><td class="num">${r.avgDurationMinutes==null?o:iu(r.avgDurationMinutes)}</td></tr>
              </tbody>
            </table>
          </section>

          <section>
            <h3>${z(`report.symptoms`)}</h3>
            ${jp(r.symptoms,_u)}
          </section>

          <section>
            <h3>${z(`report.triggers`)}</h3>
            ${jp(r.triggers,Cu)}
          </section>

          <section>
            <h3>${z(`report.meds`)}</h3>
            ${r.meds.length?K`<table class="report-table">
                  <tbody>
                    ${r.meds.map(e=>K`<tr>
                        <td>${[e.medication.name,e.medication.dose].filter(Boolean).join(` `)}<br /><span class="report-sub">${z(`medications.types.${e.medication.type}`)}</span></td>
                        <td class="num">${ar(`plural.times`,e.count)}</td>
                        <td>${e.effects.map(e=>`${Su(e.key)} ${ar(`plural.times`,e.count)}`).join(`, `)||z(`treatment.effectMissing`)}</td>
                      </tr>`)}
                  </tbody>
                </table>`:K`<p class="report-none">${z(`report.none`)}</p>`}
          </section>

          <section>
            <h3>${z(`report.sleep`)}</h3>
            ${r.sleeps.length?K`<table class="report-table">
                  <tbody>
                    <tr><td>${z(`sleep.avg`)}</td><td class="num">${iu(r.avgSleepMinutes)}</td></tr>
                    <tr><td>${z(`sleep.nights`)}</td><td class="num">${r.sleeps.length}</td></tr>
                    ${r.sleepQuality.map(e=>K`<tr><td>${z(`report.sleepQuality`)}: ${Du(e.key)}</td><td class="num">${ar(`plural.times`,e.count)}</td></tr>`)}
                  </tbody>
                </table>`:K`<p class="report-none">${z(`report.sleepNone`)}</p>`}
          </section>

          ${i?K`<section>
                <h3>${z(`report.cycle`)}</h3>
                <p>${z(`report.cycleDays`)}: <strong>${r.periodDays}</strong></p>
              </section>`:``}

          ${Ap({from:t,to:n})}

          ${a.length?K`<section>
                <h3>${z(`report.notes`)}</h3>
                <ul class="report-notes">
                  ${a.map(e=>K`<li><strong>${eu(e.occurredAt)}:</strong> ${e.note}</li>`)}
                </ul>
              </section>`:``}

          <section>
            <h3>${z(`report.timeline`)}</h3>
            ${Mp(r)}
          </section>
        </article>`,footer:X({label:z(`report.print`),iconName:`printer`,action:`print`,block:!0})})},actions:{print(){window.print()}}},Pp=[`good`,`fair`,`poor`],Fp=Array.from({length:17},(e,t)=>t),Ip=Array.from({length:12},(e,t)=>t*5);function Lp({name:e,label:t,values:n,selected:r,suffix:i=``}){return K`
    <div class="field">
      <label class="field__label" for="f-${e}">${t}</label>
      <select class="field__input" id="f-${e}" name="${e}" aria-describedby="f-${e}-error">
        ${n.map(e=>K`<option value="${e}"${e===r?K` selected`:``}>${e}${i}</option>`)}
      </select>
    </div>`}var Rp={render(e){let t=e.query.date??N(),n=bt(t),r=n?Math.floor(n.minutes/60):7,i=n?Math.min(55,Math.round(n.minutes%60/5)*5):0;return J({form:!0,header:Y({back:`/today`}),body:K`
        <h1 class="screen-title" tabindex="-1">${z(`sleep.formTitle`)}</h1>
        <p class="screen-lead">${z(`sleep.lead`)}</p>
        <div class="form-stack">
          ${Z({label:z(`sleep.date`),name:`date`,type:`date`,value:t})}
          <fieldset class="form-section form-section--tight">
            <legend class="field__label">${z(`sleep.duration`)}</legend>
            <div class="field-row">
              ${Lp({name:`hours`,label:z(`sleep.hours`),values:Fp,selected:r,suffix:` h`})}
              ${Lp({name:`minutes`,label:z(`sleep.minutes`),values:Ip,selected:i,suffix:` min`})}
            </div>
            <p class="field__error" id="f-hours-error" hidden></p>
          </fieldset>
          <fieldset class="form-section form-section--tight">
            <legend class="field__label">${z(`sleep.quality`)} <span class="field__optional">(${z(`common.optional`)})</span></legend>
            ${ml({name:`quality`,legend:z(`sleep.quality`),options:Pp.map(e=>({value:e,label:z(`sleep.qualities.${e}`)})),selected:n?.quality})}
          </fieldset>
          ${Z({label:z(`sleep.note`),name:`note`,value:n?.note??``,multiline:!0,optional:!0})}
        </div>`,footer:K`
        ${X({label:z(`sleep.save`),type:`submit`,iconName:`check`,block:!0})}
        ${n?X({label:z(`sleep.delete`),variant:`danger`,action:`delete`,block:!0}):``}`})},onSubmit(e){let t=new FormData(e),n=Number(t.get(`hours`))*60+Number(t.get(`minutes`));n<=0?gl(e,`hours`,z(`sleep.durationRequired`)):(xt({date:String(t.get(`date`)||N()),minutes:n,quality:t.get(`quality`),note:String(t.get(`note`)??``)}),Q(z(`sleep.saved`)),s(`/today`))},actions:{async delete(e,t){let n=t.query.date??N();if(!await ql({title:z(`sleep.deleteTitle`),text:z(`sleep.deleteText`),confirmLabel:z(`sleep.delete`)}))return;let r=St(n);s(`/today`),Q(z(`sleep.deletedToast`),{actionLabel:z(`common.undo`),onAction:()=>{Ct(r),t.rerender()}})}}},zp=`2026-11`,Bp=[[`smartphone`,`consent.factDevice`],[`shield`,`consent.factNoServer`],[`lock`,`consent.factPin`],[`download`,`consent.factControl`]];function Vp(){let e=document.querySelectorAll(`input[name="consent"]:checked`).length;document.getElementById(`consent-submit`).disabled=e<2}function Hp({onboarding:e}){let t=`/start/privacy`;return{render(){let n=!!R().consent?.healthDataAt,r=e?jl(t):null;return J({form:!0,header:e?Y({back:r.prev,step:r.step,total:r.total}):``,variant:e?``:`screen--tab`,body:K`
          <h1 class="screen-title" tabindex="-1">${z(`consent.title`)}</h1>
          <p class="screen-lead">${z(`consent.lead`)}</p>
          <ul class="facts-list">
            ${Bp.map(([e,t])=>K`<li>${q(e,{size:22})}<span>${z(t)}</span></li>`)}
          </ul>
          <div class="step-options">
            ${ml({name:`consent`,type:`checkbox`,legend:z(`consent.title`),options:[{value:`health`,label:z(`consent.health`)},{value:`age`,label:z(`consent.age`)}],selected:n?[`health`,`age`]:[]})}
          </div>
          <p class="section-sm"><a href="#/privacy-policy">${z(`consent.policyLink`)}</a></p>`,footer:X({label:z(`consent.submit`),type:`submit`,id:`consent-submit`,disabled:!n,block:!0})})},onChange(e){e.name===`consent`&&Vp()},onSubmit(n){let r=new FormData(n).getAll(`consent`);if(!r.includes(`health`)||!r.includes(`age`))return;let i=new Date().toISOString();Fe({consent:{healthDataAt:i,ageConfirmedAt:i,policyVersion:zp}}),a(e?jl(t).next:`/today`,{replace:!e})}}}var Up=[`controller`,`data`,`storage`,`weather`,`health`,`purchases`,`purpose`,`legal`,`rights`,`security`,`backup`,`age`,`changes`],Wp={render(){return J({header:Y({back:`/profile`}),body:K`
        <h1 class="screen-title" tabindex="-1">${z(`privacyPolicy.title`)}</h1>
        <p class="screen-lead">${yl(z(`privacyPolicy.draft`),{neutral:!0})} ${z(`privacyPolicy.version`,{version:zp})}</p>
        <p class="field__hint section-sm">${z(`privacyPolicy.draftNote`)}</p>
        <div class="policy">
          ${Up.map(e=>K`
              <section>
                <h2 class="section-title">${z(`privacyPolicy.${e}Title`)}</h2>
                <p>${z(`privacyPolicy.${e}Text`)}</p>
              </section>`)}
        </div>`})}},Gp=`/start/profile`,Kp={render(){let{step:e,total:t,prev:n}=jl(Gp);return J({form:!0,header:Y({back:n,step:e,total:t}),body:K`
        <h1 class="screen-title" tabindex="-1">${z(`profileSetup.title`)}</h1>
        <p class="screen-lead">${z(`profileSetup.lead`)}</p>
        <div class="form-stack">
          ${Z({label:z(`profileSetup.nameLabel`),name:`name`,value:R().name,placeholder:z(`profileSetup.namePlaceholder`),hint:z(`profileSetup.nameHint`),autocomplete:`given-name`,maxlength:40})}
          <div class="card card--accent pin-offer">
            <div class="pin-offer__head">${q(`lock`,{size:22})}<h2 class="card__title">${z(`profileSetup.pinTitle`)}</h2></div>
            <p class="muted">${z(M()?`profileSetup.pinAlready`:`profileSetup.pinText`)}</p>
          </div>
        </div>`,footer:X({label:z(`common.continue`),type:`submit`,block:!0})})},onSubmit(e){let t=String(new FormData(e).get(`name`)??``).trim();Fe({name:t,nameSetAt:t?new Date().toISOString():null});let n=jl(Gp).next;M()?a(n):a(`/security/pin?mode=set&next=${encodeURIComponent(n)}`)}};function qp(){return K`
    <div class="pin">
      <div class="pin__dots" id="pin-dots" role="img" aria-label="${z(`pin.progress`,{n:0,total:6})}">
        ${Array.from({length:6},()=>K`<span class="pin__dot"></span>`)}
      </div>
      <p class="pin__status" id="pin-status" role="status" aria-live="polite"></p>
      <div class="pinpad" role="group" aria-label="${z(`pin.keypad`)}">
        ${[1,2,3,4,5,6,7,8,9].map(e=>K`<button type="button" class="pinpad__key" data-action="pinDigit" data-digit="${e}">${e}</button>`)}
        <span></span>
        <button type="button" class="pinpad__key" data-action="pinDigit" data-digit="0">0</button>
        <button type="button" class="pinpad__key pinpad__key--icon" data-action="pinBackspace" aria-label="${z(`pin.delete`)}">
          ${q(`delete`,{size:26})}
        </button>
      </div>
    </div>`}function Jp({onComplete:e}){let t=``,n=!1;function r(){let e=document.getElementById(`pin-dots`);e&&([...e.children].forEach((e,n)=>e.classList.toggle(`is-filled`,n<t.length)),e.setAttribute(`aria-label`,z(`pin.progress`,{n:t.length,total:6})))}let i={async digit(a){if(!(n||t.length>=6)&&(t+=a,r(),t.length===6)){let a=t;n=!0,i.setDisabled(!0);try{await e(a)}finally{n=!1,t=``,r(),i.setDisabled(!1)}}},backspace(){n||(t=t.slice(0,-1),r())},status(e,{error:t=!1}={}){let n=document.getElementById(`pin-status`);n&&(n.textContent=e??``,n.classList.toggle(`pin__status--error`,t))},setDisabled(e){document.querySelectorAll(`.pinpad__key`).forEach(t=>{t.disabled=e})},listenToKeyboard(){let e=e=>{/^[0-9]$/.test(e.key)?i.digit(e.key):e.key===`Backspace`&&i.backspace()};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)}};return i}function Yp(e,t){let n=Math.ceil((e-Date.now())/1e3);return n<=120?z(`pin.blockedSeconds`,{n:Math.max(n,1)}):z(`pin.blocked`,{time:t(e)})}function Xp(e){if(/^(\d)\1+$/.test(e))return!0;let t=[...e].slice(1).map((t,n)=>Number(t)-Number(e[n]));return t.every(e=>e===1)||t.every(e=>e===-1)}var Zp={set:`new`,change:`current`,disable:`current`},Qp=null,$p=null;function em(){return z(`pin.prompt.${Qp.step}`)}function tm(){let e=document.querySelector(`.pin-setup__prompt`);e&&(e.textContent=em())}function nm(e){return e?.blockedUntil?Yp(e.blockedUntil,Ql):z(`pin.wrong`)}var rm={render(e){let t=[`set`,`change`,`disable`].includes(e.query.mode)?e.query.mode:`set`;return Qp={mode:t,step:Zp[t],first:null},J({variant:`screen--pin`,header:Y({back:e.query.next?`/start/profile`:`/profile`}),body:K`
        <h1 class="screen-title" tabindex="-1">${z(`pin.title.${t}`)}</h1>
        ${t===`set`?K`<p class="screen-lead">${z(`pin.setLead`)}</p>`:``}
        <p class="pin-setup__prompt">${em()}</p>
        ${qp()}`})},mount(e,t){return $p=Jp({onComplete:async e=>{if($p.status(``),Qp.step===`current`){$p.status(z(`pin.checking`));try{await de(e)}catch(e){$p.status(nm(e),{error:!0});return}if(Qp.mode===`disable`){await me(Rt()),Q(z(`pin.disabled`)),s(`/profile`);return}Qp.step=`new`,$p.status(``),tm()}else if(Qp.step===`new`){if(Xp(e)){$p.status(z(`pin.weak`),{error:!0});return}Qp.first=e,Qp.step=`confirm`,tm()}else e===Qp.first?($p.status(z(`pin.saving`)),Qp.mode===`set`?await fe(e,Rt(),{language:R().language,theme:R().theme}):await pe(e),Q(z(Qp.mode===`set`?`pin.enabled`:`pin.changed`)),t.query.logout?Fc():t.query.next?a(t.query.next,{replace:!0}):s(`/profile`)):(Qp.step=`new`,Qp.first=null,tm(),$p.status(z(`pin.mismatch`),{error:!0}))}}),$p.listenToKeyboard()},actions:{pinDigit(e){$p?.digit(e.dataset.digit)},pinBackspace(){$p?.backspace()}}},im=null;function am(){let e=ie();return e>Date.now()&&(im.setDisabled(!0),im.status(Yp(e,Ql),{error:!0}),!0)}var om={render(){return J({variant:`screen--pin screen--lock`,body:K`
        <div class="lock">
          ${El()}
          <h1 class="screen-title lock__title" tabindex="-1">${z(`lock.title`)}</h1>
          <p class="pin-setup__prompt">${z(`lock.lead`)}</p>
          ${qp()}
          <button type="button" class="link-btn lock__forgot" data-action="forgot">${z(`lock.forgot`)}</button>
        </div>`})},mount(){im=Jp({onComplete:async e=>{im.status(z(`pin.checking`));try{let t=await ue(e);im.status(``),jc(t),a(Lc(),{replace:!0})}catch(e){e?.code===`blocked`||e?.blockedUntil?im.status(Yp(e.blockedUntil,Ql),{error:!0}):im.status(z(`pin.wrong`),{error:!0})}}});let e=am(),t=setInterval(()=>{let t=am();!t&&e&&(im.setDisabled(!1),im.status(``)),e=t},1e3),n=im.listenToKeyboard();return()=>{clearInterval(t),n()}},actions:{pinDigit(e){ie()<=Date.now()&&im?.digit(e.dataset.digit)},pinBackspace(){im?.backspace()},async forgot(){await ql({title:z(`lock.forgotTitle`),text:z(`lock.forgotText`),confirmLabel:z(`lock.forgotConfirm`)})&&(ge(),Ae(),a(`/start/language`,{replace:!0}))}}},sm=e=>z(`plus.plans.${e}.cta`);function cm(e,t){return K`
    <label class="option option--radio plan">
      <input type="radio" name="plan" value="${e}" id="plan-${e}"${t?K` checked`:``} />
      <span class="option__control">${q(`check`,{size:16,strokeWidth:3})}</span>
      <span class="plan__text">
        <span class="plan__name">${z(`plus.plans.${e}.name`)}${e===`yearly`?yl(z(`plus.plans.yearly.badge`)):``}</span>
        <span class="plan__hint">${z(`plus.plans.${e}.hint`)}</span>
      </span>
      <span class="plan__price">${z(`plus.plans.${e}.price`)}</span>
    </label>`}function lm(e){let t=vd.includes(e.query.from)?e.query.from:null,n=t?[t,...vd.filter(e=>e!==t)]:vd;return J({variant:`screen--paywall`,form:!0,header:Y({back:`/today`}),body:K`
      <p class="plus-mark" aria-hidden="true">${z(`app.name`)}<span>+</span></p>
      <h1 class="screen-title" tabindex="-1">${z(`plus.paywall.title`)}</h1>
      <p class="screen-lead">${z(`plus.paywall.lead`)}</p>

      <ul class="plus-features">
        ${n.map(e=>K`
            <li class="plus-feature">
              ${bl(yd[e])}
              <span>
                <strong>${z(`plus.features.${e}.title`)}</strong>
                <span class="plus-feature__text">${z(`plus.features.${e}.text`)}</span>
              </span>
            </li>`)}
      </ul>

      <section class="section" aria-labelledby="plans-title">
        <h2 class="section-title" id="plans-title">${z(`plus.paywall.choosePlan`)}</h2>
        <fieldset class="options">
          <legend class="visually-hidden">${z(`plus.paywall.choosePlan`)}</legend>
          ${Bf.map((e,t)=>cm(e,t===0))}
        </fieldset>
        <p class="plus-note">${z(`plus.paywall.renewal`)}</p>
      </section>

      <section class="plus-free" aria-labelledby="free-title">
        <h2 class="section-title" id="free-title">${z(`plus.paywall.freeTitle`)}</h2>
        <p class="muted">${z(`plus.paywall.freeText`)}</p>
      </section>

      ${K`<p class="plus-demo">${yl(z(`plus.demoChip`),{neutral:!0})}<span>${z(`plus.paywall.demoNote`)}</span></p>`}

      <div class="plus-links">
        <button type="button" class="link-btn" data-action="restore">${z(`plus.paywall.restore`)}</button>
        <button type="button" class="link-btn" data-action="terms">${z(`plus.paywall.terms`)}</button>
        <a class="link-btn" href="#/privacy-policy">${z(`privacyPolicy.title`)}</a>
      </div>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${z(`plus.paywall.disclaimer`)}</span></p>`,footer:K`
      ${X({label:sm(Bf[0]),action:`buy`,id:`plus-buy`,block:!0})}
      ${X({label:z(`plus.paywall.notNow`),variant:`ghost`,action:`notNow`,block:!0})}`})}function um(e){let{plus:t}=R(),n=e.query.welcome===`1`;return J({header:Y({back:`/profile`}),body:K`
      <h1 class="screen-title" tabindex="-1">${z(n?`plus.manage.welcomeTitle`:`plus.manage.title`)}</h1>
      <p class="screen-lead">${z(n?`plus.manage.welcomeLead`:`plus.manage.lead`)}</p>

      <section class="section" aria-labelledby="features-title">
        <h2 class="section-title" id="features-title">${z(`plus.manage.features`)}</h2>
        <div class="list">${vd.map(e=>jd(e,{status:Md(e)}))}</div>
      </section>

      <section class="section" aria-labelledby="sub-title">
        <h2 class="section-title" id="sub-title">${z(`plus.manage.subscription`)}</h2>
        <div class="list">
          <div class="list__row">
            ${q(`sparkles`)}
            <span class="list__text">
              <span class="list__label">${z(`plus.plans.${t.plan}.name`)} · ${z(`plus.plans.${t.plan}.price`)}</span>
              <span class="list__hint">${t.trialEndsAt?z(`plus.manage.trialUntil`,{date:tu(t.trialEndsAt)}):z(`plus.manage.since`,{date:tu(t.startedAt)})}</span>
            </span>
            ${t.simulated?yl(z(`plus.demoChip`),{neutral:!0}):``}
          </div>
          <button type="button" class="list__row" data-action="cancel">
            ${q(`x`)}
            <span class="list__text">
              <span class="list__label">${z(`plus.manage.cancel`)}</span>
              <span class="list__hint">${z(`plus.manage.cancelHint`)}</span>
            </span>
          </button>
        </div>
      </section>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${z(`plus.paywall.disclaimer`)}</span></p>`,footer:n?K`
          ${R().weather.enabled?``:X({label:z(`plus.manage.enableWeather`),iconName:`mapPin`,action:`toWeather`,block:!0})}
          ${X({label:z(`plus.manage.toToday`),variant:R().weather.enabled?`primary`:`ghost`,action:`toToday`,block:!0})}`:``})}var dm={render(e){return wt()?um(e):lm(e)},onChange(e){if(e.name!==`plan`)return;let t=document.querySelector(`#plus-buy span`);t&&(t.textContent=sm(e.value))},actions:{buy(){Vf(document.querySelector(`input[name="plan"]:checked`)?.value??Bf[0])?a(`/plus?welcome=1`,{replace:!0}):Q(z(`plus.paywall.nativeOnly`))},notNow(){s(`/today`)},restore(e,t){Hf()?t.rerender():Q(z(`plus.paywall.nothingToRestore`))},terms(){Kl({title:z(`plus.paywall.terms`),text:z(`plus.paywall.termsText`)})},toToday(){a(`/today`,{replace:!0})},toWeather(){a(`/plus/weather`,{replace:!0})},async cancel(e,t){await ql({title:z(`plus.manage.cancelTitle`),text:z(`plus.manage.cancelText`),confirmLabel:z(`plus.manage.cancelConfirm`)})&&(Uf(),t.rerender(),Q(z(`plus.manage.cancelled`)))}}},fm=327,pm=190,mm={top:12,right:8,bottom:26,left:42};function hm({points:e,todayKey:t,label:n,legend:r,table:i}){let a=e.map(e=>e.pressure),o=Math.floor(Math.min(...a)/5)*5,s=Math.ceil(Math.max(...a)/5)*5,c=s-o>30?10:5,l=[];for(let e=o;e<=s;e+=c)l.push(e);let u=fm-mm.left-mm.right,d=pm-mm.top-mm.bottom,f=t=>mm.left+t/Math.max(e.length-1,1)*u,p=e=>mm.top+(1-(e-o)/Math.max(s-o,1))*d,m=e=>e.map((e,t)=>`${t?`L`:`M`}${f(e.index).toFixed(1)} ${p(e.pressure).toFixed(1)}`).join(` `),h=e.map((e,t)=>({...e,index:t})),g=Math.max(h.findIndex(e=>e.date===t),0),_=h.slice(0,g+1),v=h.slice(g),y=h[g],b=u/Math.max(e.length-1,1),x=[0,g,e.length-1].filter((e,t,n)=>n.indexOf(e)===t&&(e===g||Math.abs(e-g)*b>44));return K`
    <div class="chart">
      <p class="chart__readout" aria-live="polite">${y.readout}</p>
      <svg class="chart__svg" viewBox="0 0 ${fm} ${pm}" role="img" aria-label="${n}">
        ${l.map(e=>K`
            <line class="chart__grid" x1="${mm.left}" x2="${fm-mm.right}" y1="${p(e).toFixed(1)}" y2="${p(e).toFixed(1)}"></line>
            <text class="chart__tick" x="${mm.left-6}" y="${(p(e)+4).toFixed(1)}" text-anchor="end">${e}</text>`)}
        ${x.map(t=>K`<text class="chart__tick" x="${f(t).toFixed(1)}" y="${182}" text-anchor="${t===0?`start`:t===e.length-1?`end`:`middle`}">${h[t].tickLabel}</text>`)}
        <line class="chart__today" x1="${f(g).toFixed(1)}" x2="${f(g).toFixed(1)}" y1="${mm.top}" y2="${pm-mm.bottom}"></line>
        <path class="chart__line" d="${m(_)}"></path>
        ${v.length>1?K`<path class="chart__line chart__line--forecast" d="${m(v)}"></path>`:``}
        ${h.filter(e=>e.episode).map(e=>K`<circle class="chart__dot" cx="${f(e.index).toFixed(1)}" cy="${p(e.pressure).toFixed(1)}" r="5"></circle>`)}
        <line class="chart__cross" x1="${f(g).toFixed(1)}" x2="${f(g).toFixed(1)}" y1="${mm.top}" y2="${pm-mm.bottom}"></line>
        <circle class="chart__selected" cx="${f(g).toFixed(1)}" cy="${p(y.pressure).toFixed(1)}" r="5"></circle>
        ${h.map(e=>K`<rect class="chart__hit" x="${(f(e.index)-b/2).toFixed(1)}" y="0" width="${b.toFixed(1)}" height="${pm-mm.bottom}"
            data-readout="${e.readout}" data-x="${f(e.index).toFixed(1)}" data-y="${p(e.pressure).toFixed(1)}"></rect>`)}
      </svg>
      <ul class="chart__legend" aria-label="${z(`plus.charts.legend`)}">
        ${r.map(e=>K`<li><span class="chart__key chart__key--${e.key}" aria-hidden="true"></span>${e.label}</li>`)}
      </ul>
      ${i}
    </div>`}function gm({items:e,label:t,table:n,selected:r=e.length-1}){let i=Math.max(...e.map(e=>e.value),1),a=e.findIndex(e=>e.value===i);return K`
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
    </div>`}function _m({head:e,rows:t}){return K`
    <details class="chart__table">
      <summary>${z(`plus.charts.showTable`)}</summary>
      <table class="data-table">
        <thead><tr>${e.map(e=>K`<th scope="col">${e}</th>`)}</tr></thead>
        <tbody>${t.map(e=>K`<tr>${e.map(e=>K`<td>${e}</td>`)}</tr>`)}</tbody>
      </table>
    </details>`}function vm({grid:e,rowLabels:t,colLabels:n,label:r}){let i=Math.max(...e.flat(),1),a=e=>e===0?0:Math.ceil(e/i*3);return K`
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
    </div>`}function ym(e){let t=t=>{let n=document.elementFromPoint(t.clientX,t.clientY)?.closest?.(`[data-readout]`);if(!n||!e.contains(n))return;let r=n.closest(`.chart`);if(r.querySelector(`.chart__readout`).textContent=n.dataset.readout,n.matches(`.cols__col`)){r.querySelector(`.cols__col.is-selected`)?.classList.remove(`is-selected`),n.classList.add(`is-selected`);return}let i=r.querySelector(`.chart__cross`),a=r.querySelector(`.chart__selected`);i.setAttribute(`x1`,n.dataset.x),i.setAttribute(`x2`,n.dataset.x),a.setAttribute(`cx`,n.dataset.x),a.setAttribute(`cy`,n.dataset.y)};return e.addEventListener(`pointermove`,t),e.addEventListener(`click`,t),()=>{e.removeEventListener(`pointermove`,t),e.removeEventListener(`click`,t)}}var bm=[14,30,90],xm=`https://open-meteo.com/`;function Sm(){return J({header:Y({back:`/plus`}),body:K`
      ${bl(`gauge`,{large:!0})}
      <h1 class="screen-title plus-after-badge" tabindex="-1">${z(`plus.features.weather.title`)}</h1>
      <p class="screen-lead">${z(`plus.weather.offLead`)}</p>
      <ul class="facts-list">${[[`gauge`,`plus.weather.factRecord`],[`mapPin`,`plus.weather.factLocation`],[`shield`,`plus.weather.factHealth`],[`x`,`plus.weather.factOff`]].map(([e,t])=>K`<li>${q(e,{size:22})}<span>${z(t)}</span></li>`)}</ul>`,footer:X({label:z(`plus.weather.enable`),iconName:`mapPin`,action:`useLocation`,id:`weather-enable`,block:!0})})}function Cm(e){let t=e.pressureChange,n=t==null||Math.abs(t)<1?`minus`:t<0?`arrowDown`:`arrowUp`;return K`
    <section class="card weather-now" aria-labelledby="now-title">
      <h2 class="visually-hidden" id="now-title">${z(`plus.weather.today`)}</h2>
      <div class="weather-now__main">
        <span class="weather-now__pressure">${Cd(e.pressure)}</span>
        ${t==null?``:K`<span class="weather-now__change">${q(n,{size:18})}${z(`plus.weather.changeShort`,{value:wd(t)})}</span>`}
      </div>
      <dl class="weather-now__facts">
        <div><dt>${q(bd[e.condition]??`cloud`,{size:18})}<span class="visually-hidden">${z(`plus.weather.condition`)}</span></dt><dd>${Ed(e.condition)}</dd></div>
        <div><dt>${q(`thermometer`,{size:18})}<span class="visually-hidden">${z(`plus.weather.temperature`)}</span></dt><dd>${Td(e)}</dd></div>
        ${e.humidity==null?``:K`<div><dt>${q(`droplets`,{size:18})}<span class="visually-hidden">${z(`plus.weather.humidity`)}</span></dt><dd>${z(`plus.weather.humidityValue`,{value:e.humidity})}</dd></div>`}
      </dl>
    </section>`}function wm(e){let t=N(),n=gd({from:N(F(new Date,-(e-1))),to:N(F(new Date,7))});if(n.length<2)return``;let r=e=>[e.date===t?z(`plus.forecast.today`):`${Ad(e.date)} ${kd(P(e.date))}`,Cd(e.pressure),e.pressureChange==null?``:z(`plus.weather.changeShort`,{value:wd(e.pressureChange)}),e.date>t?z(`plus.weather.forecastWord`):``,e.episode?z(`plus.weather.episodeWord`):``].filter(Boolean).join(` · `),i=n.map(e=>({date:e.date,pressure:e.pressure,episode:e.episode,tickLabel:e.date===t?z(`plus.forecast.today`):kd(P(e.date)),readout:r(e)}));return K`
    <section class="section" aria-labelledby="chart-title">
      <h2 class="section-title" id="chart-title">${z(`plus.weather.chartTitle`)}</h2>
      ${hl({name:`range`,legend:z(`insights.periodLabel`),selected:String(e),options:bm.map(e=>({value:String(e),label:z(`plus.weather.rangeDays`,{n:e})}))})}
      ${hm({points:i,todayKey:t,label:z(`plus.weather.chartLabel`,{n:e}),legend:[{key:`line`,label:z(`plus.weather.legendPressure`)},{key:`forecast`,label:z(`plus.weather.legendForecast`)},{key:`dot`,label:z(`plus.weather.legendEpisode`)}],table:_m({head:[z(`plus.weather.colDay`),z(`plus.weather.colPressure`),z(`plus.weather.colChange`),z(`plus.weather.colEpisode`)],rows:[...n].reverse().map(e=>[kd(P(e.date)),Cd(e.pressure),e.pressureChange==null?`–`:wd(e.pressureChange),e.episode?z(`common.yes`):`–`])})})}
    </section>`}function Tm(){let e=[1,2,3,4,5,6,7].map(e=>Dt(N(F(new Date,e)))).filter(Boolean);return e.length?K`
    <section class="section" aria-labelledby="fc-title">
      <h2 class="section-title" id="fc-title">${z(`plus.weather.forecastTitle`)}</h2>
      <ul class="weather-days">
        ${e.map(e=>K`
            <li class="weather-day">
              ${q(bd[e.condition]??`cloud`,{size:22})}
              <span class="weather-day__main">
                <span class="weather-day__name">${Ad(e.date)}</span>
                <span class="weather-day__meta">${Ed(e.condition)} · ${Td(e)}</span>
              </span>
              <span class="weather-day__pressure">
                <span>${Cd(e.pressure)}</span>
                ${e.pressureChange==null?``:K`<span class="weather-day__change">${wd(e.pressureChange)}</span>`}
              </span>
            </li>`)}
      </ul>
    </section>`:``}function Em(){let e=rd({days:365}),t=e.enough?e.factors.find(e=>e.key===`pressure_drop`):null;return K`
    <section class="section" aria-labelledby="link-title">
      <h2 class="section-title" id="link-title">${z(`plus.weather.linkTitle`)}</h2>
      <p class="muted">${t?Id({stat:t}):z(`plus.forecast.evidenceFew`)}</p>
      <div class="section-sm">${X({label:z(`plus.weather.openFinder`),iconName:`search`,variant:`secondary`,action:`openFinder`,block:!0})}</div>
    </section>`}function Dm(e){let t=R().weather,n=bm.includes(Number(e.query.range))?Number(e.query.range):14,r=Dt(N());return J({header:Y({back:`/plus`}),body:K`
      <h1 class="screen-title" tabindex="-1">${z(`plus.features.weather.title`)}</h1>
      <p class="weather-place">${q(`mapPin`,{size:18})}<span>${z(`plus.weather.myLocation`)}</span></p>
      <p class="muted small">${z(jn()?`plus.weather.updated`:`plus.weather.stale`,{time:$l(t.updatedAt)})}</p>
      ${r?Cm(r):K`<p class="empty section-sm">${z(`plus.weather.noData`)}</p>`}
      ${wm(n)}
      ${Tm()}
      ${Em()}

      <section class="section" aria-labelledby="ws-title">
        <h2 class="section-title" id="ws-title">${z(`plus.weather.settings`)}</h2>
        <div class="list">
          <button type="button" class="list__row" data-action="useLocation">
            ${q(`refresh`)}
            <span class="list__text">
              <span class="list__label">${z(`plus.weather.updateLocation`)}</span>
              <span class="list__hint">${z(`plus.weather.factLocation`)}</span>
            </span>
          </button>
          <button type="button" class="list__row list__row--danger" data-action="turnOff">
            ${q(`x`)}
            <span class="list__text">
              <span class="list__label">${z(`plus.weather.turnOff`)}</span>
              <span class="list__hint">${z(`plus.weather.turnOffHint`)}</span>
            </span>
          </button>
        </div>
      </section>
      <p class="plus-source"><a href="${xm}" target="_blank" rel="noopener noreferrer">${z(`plus.weather.attribution`)}</a></p>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${z(`plus.weather.disclaimer`)}</span></p>`})}var Om={render(e){return R().weather.enabled?Dm(e):Sm()},mount(e){return ym(e)},onChange(e,t){e.name===`range`&&(o(`/plus/weather?range=${e.value}`),t.rerender())},actions:{async useLocation(e,t){e.disabled=!0,Q(z(`plus.weather.loading`));try{let{position:e,days:n}=await kn();R().weather.enabled||Ot({source:`open_meteo`,...e}),jt(n,e),t.rerender(),Q(z(`plus.weather.enabled`))}catch(t){e.disabled=!1,Q(z(`plus.weather.errors.${[`denied`,`unavailable`].includes(t.message)?t.message:`network`}`))}},openFinder(){a(`/plus/finder`)},async turnOff(e,t){await ql({title:z(`plus.weather.turnOffTitle`),text:z(`plus.weather.turnOffText`),confirmLabel:z(`plus.weather.turnOff`)})&&(kt(),t.rerender())}}},km={sleep:`bed`,steps:`footprints`,restingHr:`heartPulse`};function Am(){return J({header:Y({back:`/plus`}),body:K`
      ${bl(`watch`,{large:!0})}
      <h1 class="screen-title plus-after-badge" tabindex="-1">${z(`plus.features.health.title`)}</h1>
      <p class="screen-lead">${z(`plus.health.lead`)}</p>
      <p class="plus-free section-sm">${z(`plus.health.browserOnly`)}</p>
      <p class="disclaimer">${q(`shield`,{size:20})}<span>${z(`plus.health.privacy`)}</span></p>`})}function jm(){return J({form:!0,header:Y({back:`/plus`}),body:K`
      ${bl(`watch`,{large:!0})}
      <h1 class="screen-title plus-after-badge" tabindex="-1">${z(`plus.features.health.title`)}</h1>
      <p class="screen-lead">${z(`plus.health.lead`)}</p>
      <section class="section" aria-labelledby="types-title">
        <h2 class="section-title" id="types-title">${z(`plus.health.typesTitle`)}</h2>
        <div class="list">
          ${zc.map(e=>vl({name:`type-${e}`,label:z(`plus.health.types.${e}`),checked:!0,iconName:km[e]}))}
        </div>
      </section>
      <p class="disclaimer">${q(`shield`,{size:20})}<span>${z(`plus.health.privacy`)}</span></p>`,footer:X({label:z(`plus.health.connectTo.${Kc()}`),iconName:`watch`,action:`connect`,id:`health-connect`,block:!0})})}function Mm(e){return Array.from({length:e},(t,n)=>N(F(new Date,-(e-1-n))))}function Nm(){let{health:e}=R(),t=N(),n=Mt(t),r=bt(t),i=Mm(7),a=t=>e.types.includes(t),o=e=>`${Ad(e)} ${kd(P(e))}`,s=z(`plus.health.noValue`),c=i.map(e=>{let t=Mt(e)?.steps??null;return{label:Od(P(e)).slice(0,2),value:t??0,display:t==null?``:Dd(t),readout:`${o(e)} · ${t==null?s:z(`plus.health.stepsValue`,{value:Dd(t)})}`}}),l=i.map(e=>{let t=bt(e)?.minutes??0;return{label:Od(P(e)).slice(0,2),value:t,display:t?ru(t/60):``,readout:`${o(e)} · ${t?iu(t):s}`}});return J({header:Y({back:`/plus`}),body:K`
      <h1 class="screen-title" tabindex="-1">${z(`plus.features.health.title`)}</h1>
      <p class="weather-place">${q(`watch`,{size:18})}<span>${z(`plus.health.providers.${e.provider}`)}</span></p>
      ${e.lastSyncAt?K`<p class="muted small">${z(`plus.health.lastSync`,{time:$l(e.lastSyncAt)})}</p>`:``}

      <div class="stats section-sm">
        ${a(`steps`)?K`<div class="stat"><span class="stat__value">${n?.steps==null?`–`:Dd(n.steps)}</span><span class="stat__label">${z(`plus.health.stepsToday`)}</span></div>`:``}
        ${a(`sleep`)?K`<div class="stat"><span class="stat__value">${r?iu(r.minutes):`–`}</span><span class="stat__label">${z(`plus.health.sleepToday`)}</span></div>`:``}
        ${a(`restingHr`)?K`<div class="stat"><span class="stat__value">${n?.restingHr??`–`}</span><span class="stat__label">${z(`plus.health.pulseToday`)}</span></div>`:``}
      </div>

      ${a(`steps`)?K`<section class="section" aria-labelledby="steps-title">
            <h2 class="section-title" id="steps-title">${z(`plus.health.stepsWeek`)}</h2>
            ${gm({items:c,label:z(`plus.health.stepsWeek`),table:_m({head:[z(`plus.weather.colDay`),z(`plus.health.types.steps`)],rows:c.map(e=>[e.readout.split(` · `)[0],e.display||s])})})}
          </section>`:``}
      ${a(`sleep`)?K`<section class="section" aria-labelledby="sleep-title">
            <h2 class="section-title" id="sleep-title">${z(`plus.health.sleepWeek`)}</h2>
            ${gm({items:l,label:z(`plus.health.sleepWeek`),table:_m({head:[z(`plus.weather.colDay`),z(`plus.health.types.sleep`)],rows:l.map(e=>e.readout.split(` · `))})})}
          </section>`:``}

      <section class="section" aria-labelledby="types-title">
        <h2 class="section-title" id="types-title">${z(`plus.health.typesTitle`)}</h2>
        <div class="list">
          ${zc.map(t=>vl({name:`type-${t}`,label:z(`plus.health.types.${t}`),checked:e.types.includes(t),iconName:km[t]}))}
        </div>
      </section>

      <p class="disclaimer">${q(`shield`,{size:20})}<span>${z(`plus.health.privacy`)}</span></p>
      <div class="section">${X({label:z(`plus.health.disconnect`),variant:`outline`,iconName:`x`,action:`disconnect`,block:!0})}</div>`})}var Pm={render(){return Gc()?R().health.connected?Nm():jm():Am()},mount(e){return ym(e)},onChange(e,t){if(!e.name?.startsWith(`type-`)||!R().health.connected)return;let n=e.name.slice(5),{types:r}=R().health;Ft(e.checked?[...new Set([...r,n])]:r.filter(e=>e!==n)),t.rerender()},actions:{async connect(e,t){let n=zc.filter(e=>document.getElementById(`f-type-${e}`)?.checked);e.disabled=!0;try{await Yc(n),t.rerender(),Q(z(`plus.health.connectedToast`))}catch(t){e.disabled=!1,Q(z(t.message===`unavailable`?`plus.health.errors.unavailable`:`plus.health.errors.denied`))}},async disconnect(e,t){await ql({title:z(`plus.health.disconnectTitle`),text:z(`plus.health.disconnectText`),confirmLabel:z(`plus.health.disconnect`)})&&(Pt(),t.rerender())}}},Fm=e=>Math.round(e*100);function Im(e,t,n,r,i){return K`
    <div class="compare__row">
      <span class="compare__label">${e}</span>
      <span class="compare__value">${z(`plus.finder.ofDays`,{a:t,b:n})} · ${z(`plus.finder.percent`,{n:Fm(r)})}</span>
      <span class="bars__track" aria-hidden="true"><span class="bars__fill compare__fill--${i}" style="width:${Math.max(r*100,2)}%"></span></span>
    </div>`}function Lm(e){return K`
    <li class="finder-factor">
      <div class="finder-factor__head">
        ${q(e.icon,{size:22})}
        <h3 class="finder-factor__title">${z(`plus.finder.factors.${e.key}`)}</h3>
        <span class="strength strength--${e.strength}">${z(`plus.finder.strength.${e.strength}`)}</span>
      </div>
      ${e.strength===`few`?K`<p class="muted small">${z(`plus.finder.fewFactor`,{n:e.withDays})}</p>`:K`<div class="compare">
            ${Im(z(`plus.finder.after`),e.withHard,e.withDays,e.rateWith,`with`)}
            ${Im(z(`plus.finder.otherDays`),e.withoutHard,e.withoutDays,e.rateWithout,`without`)}
          </div>`}
    </li>`}var Rm={render(e){let t=Ku.includes(Number(e.query.days))?Number(e.query.days):180,n=rd({days:t}),{weather:r,health:i}=R(),a=[r.enabled?null:{key:`weather`,href:`#/plus/weather`},i.connected?null:{key:`health`,href:`#/plus/health`}].filter(Boolean);return J({header:Y({back:`/insights`}),body:K`
        <h1 class="screen-title" tabindex="-1">${z(`plus.features.finder.title`)}</h1>
        <p class="screen-lead">${z(`plus.finder.lead`,{intensity:5})}</p>
        <div class="insights-period">
          ${hl({name:`days`,legend:z(`insights.periodLabel`),selected:String(t),options:Ku.map(e=>({value:String(e),label:z(`plus.periods.d${e}`)}))})}
        </div>

        ${n.enough?K`
              ${R().demoEnabled&&r.enabled?K`<p class="plus-summary">${z(`plus.demoSymptoms`)}</p>`:``}
              <p class="plus-summary">${z(`plus.finder.summary`,{hard:ar(`plural.hardDays`,n.hardDays),days:ar(`plural.days`,n.trackedDays)})}</p>
              <ul class="finder-factors">${n.factors.map(Lm)}</ul>`:K`
              <div class="coming">
                ${q(`search`,{size:40})}
                <p class="muted">${z(`plus.finder.notEnough`,{days:ar(`plural.days`,n.trackedDays),hard:ar(`plural.hardDays`,n.hardDays)})}</p>
              </div>`}

        ${a.length?K`<section class="section" aria-labelledby="more-title">
              <h2 class="section-title" id="more-title">${z(`plus.finder.moreTitle`)}</h2>
              <div class="list">
                ${a.map(e=>K`
                    <a class="list__row" href="${e.href}">
                      ${q(e.key===`weather`?`gauge`:`watch`)}
                      <span class="list__text">
                        <span class="list__label">${z(`plus.features.${e.key}.title`)}</span>
                        <span class="list__hint">${z(`plus.finder.more.${e.key}`)}</span>
                      </span>
                      ${q(`chevronRight`,{size:20})}
                    </a>`)}
              </div>
            </section>`:``}

        ${n.logged.length?K`<section class="section" aria-labelledby="logged-title">
              <h2 class="section-title" id="logged-title">${z(`plus.finder.loggedTitle`)}</h2>
              <p class="muted small">${z(`plus.finder.loggedLead`)}</p>
              ${Tp(n.logged.slice(0,6),Cu)}
            </section>`:``}

        <section class="section" aria-labelledby="how-title">
          <h2 class="section-title" id="how-title">${z(`plus.finder.howTitle`)}</h2>
          <p class="muted small">${z(`plus.finder.howText`)}</p>
        </section>

        <p class="disclaimer">${q(`info`,{size:20})}<span>${z(`plus.finder.disclaimer`)}</span></p>
        ${R().forecast.enabled?``:K`<div class="section">${X({label:z(`plus.finder.toForecast`),iconName:`bellRing`,variant:`secondary`,action:`toForecast`,block:!0})}</div>`}`})},onChange(e,t){e.name===`days`&&(o(`/plus/finder?days=${e.value}`),t.rerender())},actions:{toForecast(){a(`/plus/forecast`)}}};function zm(){return J({header:Y({back:`/plus`}),body:K`
      ${bl(`bellRing`,{large:!0})}
      <h1 class="screen-title plus-after-badge" tabindex="-1">${z(`plus.features.forecast.title`)}</h1>
      <p class="screen-lead">${z(`plus.forecast.offLead`)}</p>
      <ul class="facts-list">${[[`gauge`,`plus.forecast.factWeather`],[`search`,`plus.forecast.factRecords`],[`bellRing`,`plus.forecast.factNotify`],[`x`,`plus.forecast.factOff`]].map(([e,t])=>K`<li>${q(e,{size:22})}<span>${z(t)}</span></li>`)}</ul>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${z(`plus.forecast.disclaimer`)}</span></p>`,footer:X({label:z(`plus.forecast.enable`),iconName:`bellRing`,action:`enable`,block:!0})})}function Bm(e){let t=e.signals.length?Ld(e):null;return K`
    <li class="outlook-day">
      <div class="outlook-day__head">
        <span class="outlook-day__name">${Ad(e.date)}<span class="outlook-day__date">${kd(P(e.date))}</span></span>
        ${Rd(e.level)}
      </div>
      ${t?K`<ul class="outlook-signals">
            ${e.signals.slice(0,2).map(e=>K`<li><strong>${Fd(e)}</strong> ${Id(e)}</li>`)}
          </ul>`:K`<p class="muted small">${z(`plus.forecast.calmText`)}</p>`}
      ${e.level===`elevated`?K`<p class="outlook-day__care">${z(`plus.forecast.care`)}</p>`:``}
    </li>`}function Vm(){let{forecast:e,weather:t,demoEnabled:n}=R(),r=od(),i=r.next,a=i?Ld(i):null;return J({header:Y({back:`/plus`}),body:K`
      <h1 class="screen-title" tabindex="-1">${z(`plus.features.forecast.title`)}</h1>
      <p class="screen-lead">${z(`plus.forecast.lead`)}</p>

      ${t.enabled?``:K`<a class="list section-sm plus-prompt" href="#/plus/weather">
            <span class="list__row">
              ${q(`gauge`)}
              <span class="list__text">
                <span class="list__label">${z(`plus.forecast.weatherOff`)}</span>
                <span class="list__hint">${z(`plus.forecast.weatherOffHint`)}</span>
              </span>
              ${q(`chevronRight`,{size:20})}
            </span>
          </a>`}
      ${t.enabled&&!jn()?K`<p class="plus-summary">${z(`plus.forecast.staleForecast`)}</p>`:``}
      ${r.enough?``:K`<p class="plus-summary">${z(`plus.forecast.learning`)}</p>`}
      ${n&&t.enabled?K`<p class="plus-summary">${z(`plus.demoSymptoms`)}</p>`:``}

      <ul class="outlook-days">${r.days.map(Bm)}</ul>

      <section class="section" aria-labelledby="notify-title">
        <h2 class="section-title" id="notify-title">${z(`plus.forecast.notifyTitle`)}</h2>
        <div class="list">
          ${vl({name:`notify`,label:z(`plus.forecast.notify`),hint:z(`plus.forecast.notifyHint`),checked:e.notify,iconName:`bell`})}
          ${e.notify?K`<div class="list__field">${Z({label:z(`plus.forecast.notifyTime`),name:`notifyTime`,type:`time`,value:e.time})}</div>`:``}
        </div>
        ${e.notify&&!a?K`<p class="plus-summary">${z(`plus.forecast.nothingToNotify`)}</p>`:``}
        ${e.notify&&a?K`<div class="notif-preview">
              <p class="notif-preview__label">${z(`plus.forecast.previewLabel`)}</p>
              <div class="notif">
                <span class="notif__head">${q(`bellRing`,{size:18})}<strong>${z(`app.name`)}</strong><span>${e.time}</span></span>
                <strong class="notif__title">${z(`plus.forecast.cardTitle`,{day:Ad(i.date)})}</strong>
                <span>${Fd(a)} ${Id(a)}${i.level===`elevated`?` ${z(`plus.forecast.care`)}`:``}</span>
              </div>
            </div>`:``}
      </section>

      <p class="disclaimer">${q(`info`,{size:20})}<span>${z(`plus.forecast.disclaimer`)}</span></p>
      <div class="section">${X({label:z(`plus.forecast.disable`),variant:`outline`,iconName:`x`,action:`disable`,block:!0})}</div>`})}var Hm={render(){return R().forecast.enabled?Vm():zm()},onChange(e,t){e.name===`notify`&&(Lt({notify:e.checked}),t.rerender(),e.checked&&vc(document.querySelector(`.notif-preview`))),e.name===`notifyTime`&&e.value&&(Lt({time:e.value}),t.rerender())},actions:{enable(e,t){Lt({enabled:!0}),t.rerender(),R().weather.enabled||Q(z(`plus.forecast.weatherOff`))},disable(){Lt({enabled:!1}),a(`/plus`,{replace:!0})}}};function Um(e,t,n){if(e==null||t==null)return z(`plus.stats.noCompare`);let r=e-t;return Math.abs(r)<.05?z(`plus.stats.same`):z(r<0?`plus.stats.less`:`plus.stats.more`,{value:n(Math.abs(r))})}function Wm(e){let{current:t,previous:n}=sd(e),r=e=>String(Math.round(e)),i=[{key:`symptomDays`,now:t.symptomDays,before:n.symptomDays,format:r},{key:`episodes`,now:t.episodeCount,before:n.episodeCount,format:r},{key:`avgIntensity`,now:t.avgIntensity,before:n.avgIntensity,format:ru},{key:`avgDuration`,now:t.avgDurationMinutes,before:n.avgDurationMinutes,format:iu}];return K`
    <section class="section" aria-labelledby="cmp-title">
      <h2 class="section-title" id="cmp-title">${z(`plus.stats.compareTitle`)}</h2>
      <p class="muted small">${z(`plus.stats.compareLead`,{days:ar(`plural.days`,e)})}</p>
      <ul class="compare-list">
        ${i.map(e=>{let t=e.now==null||e.before==null||Math.abs(e.now-e.before)<.05?`minus`:e.now<e.before?`arrowDown`:`arrowUp`;return K`
            <li class="compare-item">
              <span class="compare-item__label">${z(`insights.${e.key}`)}</span>
              <span class="compare-item__value${e.now==null?` compare-item__value--empty`:``}">${e.now==null?z(`insights.noValue`):e.format(e.now)}</span>
              <span class="compare-item__trend">${q(t,{size:16})}${Um(e.now,e.before,e.format)}</span>
            </li>`})}
      </ul>
    </section>`}function Gm(){let e=cd(12),t=new Intl.DateTimeFormat(tr(),{month:`narrow`}),n=e.map(e=>({label:t.format(e.month),value:e.symptomDays,readout:`${nu(e.month)} · ${z(`plus.stats.symptomDaysValue`,{n:e.symptomDays})} · ${ar(`plural.episodes`,e.episodes)}`}));return K`
    <section class="section" aria-labelledby="trend-title">
      <h2 class="section-title" id="trend-title">${z(`plus.stats.trendTitle`)}</h2>
      ${gm({items:n,label:z(`plus.stats.trendLabel`),table:_m({head:[z(`plus.stats.colMonth`),z(`insights.symptomDays`),z(`insights.episodes`)],rows:[...e].reverse().map(e=>[nu(e.month),e.symptomDays,e.episodes])})})}
    </section>`}function Km(e){let{grid:t,total:n}=dd(e);if(n<3)return``;let r=new Date(2024,0,1),i=new Intl.DateTimeFormat(tr(),{weekday:`short`}),a=Array.from({length:7},(e,t)=>{let n=i.format(F(r,t)).replace(`.`,``);return n.charAt(0).toLocaleUpperCase(tr())+n.slice(1)});return K`
    <section class="section" aria-labelledby="rhythm-title">
      <h2 class="section-title" id="rhythm-title">${z(`plus.stats.rhythmTitle`)}</h2>
      <p class="muted small">${z(`plus.stats.rhythmLead`,{n:ar(`plural.episodes`,n)})}</p>
      ${vm({grid:t,rowLabels:a,colLabels:ld.map(e=>z(`plus.stats.parts.${e}`)),label:z(`plus.stats.rhythmTitle`)})}
    </section>`}function qm(e){if(R().cycleTracking!==!0)return``;let{items:t,total:n,starts:r}=fd(e);if(n<3||r<2)return``;let i=e=>e===0?z(`plus.stats.cycleStart`):z(`plus.stats.cycleOffset`,{n:e>0?`+${e}`:`−${Math.abs(e)}`}),a=t.map(e=>({label:e.offset===0?`1.`:e.offset>0?`+${e.offset}`:`−${Math.abs(e.offset)}`,value:e.count,readout:`${i(e.offset)} · ${ar(`plural.episodes`,e.count)}`}));return K`
    <section class="section" aria-labelledby="cycle-title">
      <h2 class="section-title" id="cycle-title">${z(`plus.stats.cycleTitle`)}</h2>
      <p class="muted small">${z(`plus.stats.cycleLead`,{n:r})}</p>
      ${gm({items:a,selected:t.findIndex(e=>e.offset===0),label:z(`plus.stats.cycleTitle`),table:_m({head:[z(`plus.stats.colCycleDay`),z(`insights.episodes`)],rows:t.map(e=>[i(e.offset),e.count])})})}
    </section>`}function Jm(e){let{relief:t,impact:n}=pd(e);return K`
    ${t.length?K`<section class="section" aria-labelledby="relief-title">
          <h2 class="section-title" id="relief-title">${z(`plus.stats.reliefTitle`)}</h2>
          ${Tp(t.slice(0,5),Tu)}
        </section>`:``}
    ${n.length?K`<section class="section" aria-labelledby="impact-title">
          <h2 class="section-title" id="impact-title">${z(`plus.stats.impactTitle`)}</h2>
          ${Tp(n.slice(0,5),Eu)}
        </section>`:``}`}function Ym(){let e=hd();if(!e.length)return``;let t=e=>z(`plus.stats.medValue`,{days:ru(e.symptomDays),episodes:ru(e.episodes)});return K`
    <section class="section" aria-labelledby="med-title">
      <h2 class="section-title" id="med-title">${z(`plus.stats.medTitle`)}</h2>
      <p class="muted small">${z(`plus.stats.medLead`)}</p>
      <ul class="med-timeline">
        ${e.map(e=>K`
            <li class="med-timeline__item">
              <span class="med-timeline__name">${e.medication.name}</span>
              <span class="muted small">${z(`plus.stats.medSince`,{date:tu(P(e.start)),days:ar(`plural.days`,e.window)})}</span>
              <dl class="med-timeline__facts">
                <div><dt>${z(`plus.stats.medBefore`)}</dt><dd>${t(e.before)}</dd></div>
                <div><dt>${z(`plus.stats.medAfter`)}</dt><dd>${t(e.after)}</dd></div>
              </dl>
            </li>`)}
      </ul>
      <p class="disclaimer">${q(`info`,{size:20})}<span>${z(`plus.stats.medDisclaimer`)}</span></p>
    </section>`}n(`/start/language`,Ol),n(`/start/welcome`,kl),n(`/start/privacy`,Hp({onboarding:!0})),n(`/start/goals`,Pl),n(`/start/condition`,Ll),n(`/start/cycle`,Bl),n(`/start/medications`,Ul),n(`/start/medications/new`,Yl({returnTo:`/start/medications`})),n(`/start/reminders`,Gl),n(`/start/profile`,Kp),n(`/consent`,Hp({onboarding:!1})),n(`/privacy-policy`,Wp),n(`/security/pin`,rm),n(`/lock`,om),n(`/today`,jf),n(`/episode/:id`,If),n(`/episode/:id/details/:step`,wf),n(`/log/symptoms`,$f),n(`/log/intensity`,tp),n(`/log/details`,ap),n(`/symptom/:id`,sp),n(`/calendar`,Cp),n(`/insights`,Dp),n(`/report`,Op),n(`/report/view`,Np),n(`/sleep`,Rp),n(`/treatment`,up),n(`/treatment/new`,Yl({returnTo:`/treatment`})),n(`/treatment/:id`,mp),n(`/treatment/:id/edit`,Yl({returnTo:e=>`/treatment/${e.params.id}`})),n(`/treatment/:id/intake`,gp({mode:`new`})),n(`/intake/:id`,gp({mode:`edit`})),n(`/medication-intake`,zf),n(`/profile`,qf),n(`/styleguide`,Xf),n(`/plus`,dm),n(`/plus/weather`,Om),n(`/plus/health`,Pm),n(`/plus/finder`,Rm),n(`/plus/forecast`,Hm),n(`/plus/stats`,{render(e){let t=qu.includes(Number(e.query.days))?Number(e.query.days):180,n=Pu(t);return Lu(Pu(365)).recordCount?J({header:Y({back:`/insights`}),body:K`
        <h1 class="screen-title" tabindex="-1">${z(`plus.features.stats.title`)}</h1>
        <div class="insights-period">
          ${hl({name:`days`,legend:z(`insights.periodLabel`),selected:String(t),options:qu.map(e=>({value:String(e),label:z(`plus.periods.d${e}`)}))})}
        </div>
        ${Wm(t)}
        ${Gm()}
        ${Km(n)}
        ${qm(n)}
        ${Jm(n)}
        ${Ym()}
        <p class="disclaimer">${q(`info`,{size:20})}<span>${z(`insights.interpretation`)}</span></p>`}):J({header:Y({back:`/insights`}),body:K`
          <h1 class="screen-title" tabindex="-1">${z(`plus.features.stats.title`)}</h1>
          <div class="coming">
            ${q(`chart`,{size:40})}
            <p class="muted">${z(`plus.stats.empty`)}</p>
          </div>`})},mount(e){return ym(e)},onChange(e,t){e.name===`days`&&(o(`/plus/stats?days=${e.value}`),t.rerender())}});var Xm=[`/privacy-policy`,`/security/pin`];function Zm(e){return Nc()?e===`/lock`?`/today`:e===`/styleguide`?null:R().language?Ie()?e===`/`||e.startsWith(`/start/`)?`/today`:R().consent?.healthDataAt?e.startsWith(`/log/`)&&!Hd()?`/today`:e.startsWith(`/plus/`)&&!wt()?`/plus?from=${e.split(`/`)[2]}`:null:e===`/consent`||e===`/privacy-policy`?null:`/consent`:e.startsWith(`/start/`)||Xm.includes(e)?null:`/start/welcome`:e===`/start/language`?null:`/start/language`:(Ic(e),e===`/lock`?null:`/lock`)}var Qm=document.getElementById(`app`),$m=null;function eh({navigation:e=!0}={}){let{path:t,query:n}=r(),o=Zm(t);if(o)return a(o,{replace:!0});let s=i(t);if(!s)return a(`/today`,{replace:!0});let c=e?null:document.activeElement?.id,l=e?0:Qm.querySelector(`.screen__body`)?.scrollTop??0;$m?.cleanup?.();let u=document.getElementById(`dialog`);e&&u.open&&u.close();let d={params:s.params,query:n,rerender:()=>eh({navigation:!1})};Qm.innerHTML=String(s.screen.render(d)),$m={screen:s.screen,ctx:d,cleanup:s.screen.mount?.(Qm,d)};let f=Qm.querySelector(`.screen__body`);f&&(f.scrollTop=l),e?(Qm.querySelector(`.screen-title`)?.focus({preventScroll:!0}),gc(Qm)):c&&document.getElementById(c)?.focus({preventScroll:!0}),e&&rh()}var th=[`/today`,`/calendar`,`/plus/weather`,`/plus/health`,`/plus/forecast`],nh=!1;async function rh(){if(nh||!Nc()||!Ie()||!wt())return;nh=!0;let[e,t]=await Promise.all([An(),Xc()]);nh=!1,(e||t)&&th.includes(r().path)&&eh({navigation:!1})}var ih={back:e=>s(e.dataset.fallback||`/today`),startEpisode:()=>{a(`/episode/${ut().id}?new=1`)}};Qm.addEventListener(`click`,e=>{let t=e.target.closest(`a[href^="#/"]`);if(t){e.preventDefault(),a(t.getAttribute(`href`).slice(1),{replace:t.hasAttribute(`data-replace`)});return}let n=e.target.closest(`[data-action]`);if(!n||!$m)return;let r=$m.screen.actions?.[n.dataset.action]??ih[n.dataset.action];r&&(e.preventDefault(),r(n,$m.ctx,e))}),Qm.addEventListener(`submit`,e=>{e.preventDefault(),$m?.screen.onSubmit?.(e.target,$m.ctx,e)}),Qm.addEventListener(`change`,e=>{e.target.matches(`.option input`)&&_c(e.target),$m?.screen.onChange?.(e.target,$m.ctx,e)}),Qm.addEventListener(`input`,e=>{_l(e.target),$m?.screen.onInput?.(e.target,$m.ctx,e)});var ah=0;function oh(){Pc(r().path),a(`/lock`,{replace:!0})}document.addEventListener(`visibilitychange`,()=>{if(document.hidden||rh(),kc()){ah=0;return}if(!M()||!Nc())return;let e=R().autoLockMinutes??1;document.hidden?(ah=Date.now(),e===0&&oh()):ah&&Date.now()-ah>=e*6e4&&oh()}),Mc(),history.state||history.replaceState({index:0},``,location.href),c(()=>eh());export{$t as t};