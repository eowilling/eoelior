(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();function Kw(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Jg={exports:{}},$l={},Zg={exports:{}},re={};/**
* @license React
* react.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/var Aa=Symbol.for("react.element"),Gw=Symbol.for("react.portal"),Ww=Symbol.for("react.fragment"),Qw=Symbol.for("react.strict_mode"),Xw=Symbol.for("react.profiler"),Yw=Symbol.for("react.provider"),Jw=Symbol.for("react.context"),Zw=Symbol.for("react.forward_ref"),e1=Symbol.for("react.suspense"),t1=Symbol.for("react.memo"),n1=Symbol.for("react.lazy"),Ep=Symbol.iterator;function r1(t){return t===null||typeof t!="object"?null:(t=Ep&&t[Ep]||t["@@iterator"],typeof t=="function"?t:null)}var ey={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ty=Object.assign,ny={};function ai(t,e,n){this.props=t,this.context=e,this.refs=ny,this.updater=n||ey}ai.prototype.isReactComponent={};ai.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};ai.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function ry(){}ry.prototype=ai.prototype;function Kh(t,e,n){this.props=t,this.context=e,this.refs=ny,this.updater=n||ey}var Gh=Kh.prototype=new ry;Gh.constructor=Kh;ty(Gh,ai.prototype);Gh.isPureReactComponent=!0;var Sp=Array.isArray,sy=Object.prototype.hasOwnProperty,Wh={current:null},iy={key:!0,ref:!0,__self:!0,__source:!0};function ay(t,e,n){var r,s={},i=null,a=null;if(e!=null)for(r in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(i=""+e.key),e)sy.call(e,r)&&!iy.hasOwnProperty(r)&&(s[r]=e[r]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var u=Array(l),d=0;d<l;d++)u[d]=arguments[d+2];s.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)s[r]===void 0&&(s[r]=l[r]);return{$$typeof:Aa,type:t,key:i,ref:a,props:s,_owner:Wh.current}}function s1(t,e){return{$$typeof:Aa,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Qh(t){return typeof t=="object"&&t!==null&&t.$$typeof===Aa}function i1(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Ip=/\/+/g;function qu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?i1(""+t.key):e.toString(36)}function Lo(t,e,n,r,s){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(i){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case Aa:case Gw:a=!0}}if(a)return a=t,s=s(a),t=r===""?"."+qu(a,0):r,Sp(s)?(n="",t!=null&&(n=t.replace(Ip,"$&/")+"/"),Lo(s,e,n,"",function(d){return d})):s!=null&&(Qh(s)&&(s=s1(s,n+(!s.key||a&&a.key===s.key?"":(""+s.key).replace(Ip,"$&/")+"/")+t)),e.push(s)),1;if(a=0,r=r===""?".":r+":",Sp(t))for(var l=0;l<t.length;l++){i=t[l];var u=r+qu(i,l);a+=Lo(i,e,n,u,s)}else if(u=r1(t),typeof u=="function")for(t=u.call(t),l=0;!(i=t.next()).done;)i=i.value,u=r+qu(i,l++),a+=Lo(i,e,n,u,s);else if(i==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function co(t,e,n){if(t==null)return t;var r=[],s=0;return Lo(t,r,"","",function(i){return e.call(n,i,s++)}),r}function a1(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var wt={current:null},Mo={transition:null},o1={ReactCurrentDispatcher:wt,ReactCurrentBatchConfig:Mo,ReactCurrentOwner:Wh};function oy(){throw Error("act(...) is not supported in production builds of React.")}re.Children={map:co,forEach:function(t,e,n){co(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return co(t,function(){e++}),e},toArray:function(t){return co(t,function(e){return e})||[]},only:function(t){if(!Qh(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};re.Component=ai;re.Fragment=Ww;re.Profiler=Xw;re.PureComponent=Kh;re.StrictMode=Qw;re.Suspense=e1;re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=o1;re.act=oy;re.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=ty({},t.props),s=t.key,i=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(i=e.ref,a=Wh.current),e.key!==void 0&&(s=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)sy.call(e,u)&&!iy.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var d=0;d<u;d++)l[d]=arguments[d+2];r.children=l}return{$$typeof:Aa,type:t.type,key:s,ref:i,props:r,_owner:a}};re.createContext=function(t){return t={$$typeof:Jw,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Yw,_context:t},t.Consumer=t};re.createElement=ay;re.createFactory=function(t){var e=ay.bind(null,t);return e.type=t,e};re.createRef=function(){return{current:null}};re.forwardRef=function(t){return{$$typeof:Zw,render:t}};re.isValidElement=Qh;re.lazy=function(t){return{$$typeof:n1,_payload:{_status:-1,_result:t},_init:a1}};re.memo=function(t,e){return{$$typeof:t1,type:t,compare:e===void 0?null:e}};re.startTransition=function(t){var e=Mo.transition;Mo.transition={};try{t()}finally{Mo.transition=e}};re.unstable_act=oy;re.useCallback=function(t,e){return wt.current.useCallback(t,e)};re.useContext=function(t){return wt.current.useContext(t)};re.useDebugValue=function(){};re.useDeferredValue=function(t){return wt.current.useDeferredValue(t)};re.useEffect=function(t,e){return wt.current.useEffect(t,e)};re.useId=function(){return wt.current.useId()};re.useImperativeHandle=function(t,e,n){return wt.current.useImperativeHandle(t,e,n)};re.useInsertionEffect=function(t,e){return wt.current.useInsertionEffect(t,e)};re.useLayoutEffect=function(t,e){return wt.current.useLayoutEffect(t,e)};re.useMemo=function(t,e){return wt.current.useMemo(t,e)};re.useReducer=function(t,e,n){return wt.current.useReducer(t,e,n)};re.useRef=function(t){return wt.current.useRef(t)};re.useState=function(t){return wt.current.useState(t)};re.useSyncExternalStore=function(t,e,n){return wt.current.useSyncExternalStore(t,e,n)};re.useTransition=function(){return wt.current.useTransition()};re.version="18.3.1";Zg.exports=re;var fe=Zg.exports;const l1=Kw(fe);/**
* @license React
* react-jsx-runtime.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/var u1=fe,c1=Symbol.for("react.element"),h1=Symbol.for("react.fragment"),d1=Object.prototype.hasOwnProperty,f1=u1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p1={key:!0,ref:!0,__self:!0,__source:!0};function ly(t,e,n){var r,s={},i=null,a=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(a=e.ref);for(r in e)d1.call(e,r)&&!p1.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:c1,type:t,key:i,ref:a,props:s,_owner:f1.current}}$l.Fragment=h1;$l.jsx=ly;$l.jsxs=ly;Jg.exports=$l;var g=Jg.exports,Pc={},uy={exports:{}},Ft={},cy={exports:{}},hy={};/**
* @license React
* scheduler.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/(function(t){function e($,X){var te=$.length;$.push(X);e:for(;0<te;){var ye=te-1>>>1,he=$[ye];if(0<s(he,X))$[ye]=X,$[te]=he,te=ye;else break e}}function n($){return $.length===0?null:$[0]}function r($){if($.length===0)return null;var X=$[0],te=$.pop();if(te!==X){$[0]=te;e:for(var ye=0,he=$.length,Se=he>>>1;ye<Se;){var Qt=2*(ye+1)-1,Xt=$[Qt],Yt=Qt+1,Jt=$[Yt];if(0>s(Xt,te))Yt<he&&0>s(Jt,Xt)?($[ye]=Jt,$[Yt]=te,ye=Yt):($[ye]=Xt,$[Qt]=te,ye=Qt);else if(Yt<he&&0>s(Jt,te))$[ye]=Jt,$[Yt]=te,ye=Yt;else break e}}return X}function s($,X){var te=$.sortIndex-X.sortIndex;return te!==0?te:$.id-X.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var a=Date,l=a.now();t.unstable_now=function(){return a.now()-l}}var u=[],d=[],f=1,y=null,v=3,C=!1,A=!1,P=!1,M=typeof setTimeout=="function"?setTimeout:null,E=typeof clearTimeout=="function"?clearTimeout:null,x=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function S($){for(var X=n(d);X!==null;){if(X.callback===null)r(d);else if(X.startTime<=$)r(d),X.sortIndex=X.expirationTime,e(u,X);else break;X=n(d)}}function O($){if(P=!1,S($),!A)if(n(u)!==null)A=!0,Or(V);else{var X=n(d);X!==null&&Wt(O,X.startTime-$)}}function V($,X){A=!1,P&&(P=!1,E(m),m=-1),C=!0;var te=v;try{for(S(X),y=n(u);y!==null&&(!(y.expirationTime>X)||$&&!I());){var ye=y.callback;if(typeof ye=="function"){y.callback=null,v=y.priorityLevel;var he=ye(y.expirationTime<=X);X=t.unstable_now(),typeof he=="function"?y.callback=he:y===n(u)&&r(u),S(X)}else r(u);y=n(u)}if(y!==null)var Se=!0;else{var Qt=n(d);Qt!==null&&Wt(O,Qt.startTime-X),Se=!1}return Se}finally{y=null,v=te,C=!1}}var F=!1,w=null,m=-1,b=5,k=-1;function I(){return!(t.unstable_now()-k<b)}function T(){if(w!==null){var $=t.unstable_now();k=$;var X=!0;try{X=w(!0,$)}finally{X?_():(F=!1,w=null)}}else F=!1}var _;if(typeof x=="function")_=function(){x(T)};else if(typeof MessageChannel<"u"){var kt=new MessageChannel,xn=kt.port2;kt.port1.onmessage=T,_=function(){xn.postMessage(null)}}else _=function(){M(T,0)};function Or($){w=$,F||(F=!0,_())}function Wt($,X){m=M(function(){$(t.unstable_now())},X)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function($){$.callback=null},t.unstable_continueExecution=function(){A||C||(A=!0,Or(V))},t.unstable_forceFrameRate=function($){0>$||125<$?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):b=0<$?Math.floor(1e3/$):5},t.unstable_getCurrentPriorityLevel=function(){return v},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function($){switch(v){case 1:case 2:case 3:var X=3;break;default:X=v}var te=v;v=X;try{return $()}finally{v=te}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function($,X){switch($){case 1:case 2:case 3:case 4:case 5:break;default:$=3}var te=v;v=$;try{return X()}finally{v=te}},t.unstable_scheduleCallback=function($,X,te){var ye=t.unstable_now();switch(typeof te=="object"&&te!==null?(te=te.delay,te=typeof te=="number"&&0<te?ye+te:ye):te=ye,$){case 1:var he=-1;break;case 2:he=250;break;case 5:he=1073741823;break;case 4:he=1e4;break;default:he=5e3}return he=te+he,$={id:f++,callback:X,priorityLevel:$,startTime:te,expirationTime:he,sortIndex:-1},te>ye?($.sortIndex=te,e(d,$),n(u)===null&&$===n(d)&&(P?(E(m),m=-1):P=!0,Wt(O,te-ye))):($.sortIndex=he,e(u,$),A||C||(A=!0,Or(V))),$},t.unstable_shouldYield=I,t.unstable_wrapCallback=function($){var X=v;return function(){var te=v;v=X;try{return $.apply(this,arguments)}finally{v=te}}}})(hy);cy.exports=hy;var m1=cy.exports;/**
* @license React
* react-dom.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/var g1=fe,Ut=m1;function j(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var dy=new Set,sa={};function os(t,e){Hs(t,e),Hs(t+"Capture",e)}function Hs(t,e){for(sa[t]=e,t=0;t<e.length;t++)dy.add(e[t])}var On=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Rc=Object.prototype.hasOwnProperty,y1=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Cp={},Tp={};function v1(t){return Rc.call(Tp,t)?!0:Rc.call(Cp,t)?!1:y1.test(t)?Tp[t]=!0:(Cp[t]=!0,!1)}function b1(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function w1(t,e,n,r){if(e===null||typeof e>"u"||b1(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function xt(t,e,n,r,s,i,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=i,this.removeEmptyString=a}var tt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){tt[t]=new xt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];tt[e]=new xt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){tt[t]=new xt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){tt[t]=new xt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){tt[t]=new xt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){tt[t]=new xt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){tt[t]=new xt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){tt[t]=new xt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){tt[t]=new xt(t,5,!1,t.toLowerCase(),null,!1,!1)});var Xh=/[\-:]([a-z])/g;function Yh(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Xh,Yh);tt[e]=new xt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Xh,Yh);tt[e]=new xt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Xh,Yh);tt[e]=new xt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){tt[t]=new xt(t,1,!1,t.toLowerCase(),null,!1,!1)});tt.xlinkHref=new xt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){tt[t]=new xt(t,1,!1,t.toLowerCase(),null,!0,!0)});function Jh(t,e,n,r){var s=tt.hasOwnProperty(e)?tt[e]:null;(s!==null?s.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(w1(e,n,s,r)&&(n=null),r||s===null?v1(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):s.mustUseProperty?t[s.propertyName]=n===null?s.type===3?!1:"":n:(e=s.attributeName,r=s.attributeNamespace,n===null?t.removeAttribute(e):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var $n=g1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ho=Symbol.for("react.element"),ks=Symbol.for("react.portal"),_s=Symbol.for("react.fragment"),Zh=Symbol.for("react.strict_mode"),Oc=Symbol.for("react.profiler"),fy=Symbol.for("react.provider"),py=Symbol.for("react.context"),ed=Symbol.for("react.forward_ref"),Dc=Symbol.for("react.suspense"),Lc=Symbol.for("react.suspense_list"),td=Symbol.for("react.memo"),Jn=Symbol.for("react.lazy"),my=Symbol.for("react.offscreen"),Np=Symbol.iterator;function Ii(t){return t===null||typeof t!="object"?null:(t=Np&&t[Np]||t["@@iterator"],typeof t=="function"?t:null)}var Te=Object.assign,Hu;function Mi(t){if(Hu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Hu=e&&e[1]||""}return`
`+Hu+t}var Ku=!1;function Gu(t,e){if(!t||Ku)return"";Ku=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(d){var r=d}Reflect.construct(t,[],e)}else{try{e.call()}catch(d){r=d}t.call(e.prototype)}else{try{throw Error()}catch(d){r=d}t()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var s=d.stack.split(`
`),i=r.stack.split(`
`),a=s.length-1,l=i.length-1;1<=a&&0<=l&&s[a]!==i[l];)l--;for(;1<=a&&0<=l;a--,l--)if(s[a]!==i[l]){if(a!==1||l!==1)do if(a--,l--,0>l||s[a]!==i[l]){var u=`
`+s[a].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=a&&0<=l);break}}}finally{Ku=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Mi(t):""}function x1(t){switch(t.tag){case 5:return Mi(t.type);case 16:return Mi("Lazy");case 13:return Mi("Suspense");case 19:return Mi("SuspenseList");case 0:case 2:case 15:return t=Gu(t.type,!1),t;case 11:return t=Gu(t.type.render,!1),t;case 1:return t=Gu(t.type,!0),t;default:return""}}function Mc(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case _s:return"Fragment";case ks:return"Portal";case Oc:return"Profiler";case Zh:return"StrictMode";case Dc:return"Suspense";case Lc:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case py:return(t.displayName||"Context")+".Consumer";case fy:return(t._context.displayName||"Context")+".Provider";case ed:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case td:return e=t.displayName||null,e!==null?e:Mc(t.type)||"Memo";case Jn:e=t._payload,t=t._init;try{return Mc(t(e))}catch{}}return null}function k1(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Mc(e);case 8:return e===Zh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function kr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function gy(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function _1(t){var e=gy(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return s.call(this)},set:function(a){r=""+a,i.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function fo(t){t._valueTracker||(t._valueTracker=_1(t))}function yy(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=gy(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function nl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function jc(t,e){var n=e.checked;return Te({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Ap(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=kr(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function vy(t,e){e=e.checked,e!=null&&Jh(t,"checked",e,!1)}function Uc(t,e){vy(t,e);var n=kr(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Fc(t,e.type,n):e.hasOwnProperty("defaultValue")&&Fc(t,e.type,kr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Pp(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Fc(t,e,n){(e!=="number"||nl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var ji=Array.isArray;function Ls(t,e,n,r){if(t=t.options,e){e={};for(var s=0;s<n.length;s++)e["$"+n[s]]=!0;for(n=0;n<t.length;n++)s=e.hasOwnProperty("$"+t[n].value),t[n].selected!==s&&(t[n].selected=s),s&&r&&(t[n].defaultSelected=!0)}else{for(n=""+kr(n),e=null,s=0;s<t.length;s++){if(t[s].value===n){t[s].selected=!0,r&&(t[s].defaultSelected=!0);return}e!==null||t[s].disabled||(e=t[s])}e!==null&&(e.selected=!0)}}function Vc(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(j(91));return Te({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Rp(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(j(92));if(ji(n)){if(1<n.length)throw Error(j(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:kr(n)}}function by(t,e){var n=kr(e.value),r=kr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Op(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function wy(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function zc(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?wy(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var po,xy=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,s){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,s)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(po=po||document.createElement("div"),po.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=po.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function ia(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var qi={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},E1=["Webkit","ms","Moz","O"];Object.keys(qi).forEach(function(t){E1.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),qi[e]=qi[t]})});function ky(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||qi.hasOwnProperty(t)&&qi[t]?(""+e).trim():e+"px"}function _y(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=ky(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,s):t[n]=s}}var S1=Te({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function $c(t,e){if(e){if(S1[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(j(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(j(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(j(61))}if(e.style!=null&&typeof e.style!="object")throw Error(j(62))}}function Bc(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var qc=null;function nd(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Hc=null,Ms=null,js=null;function Dp(t){if(t=Oa(t)){if(typeof Hc!="function")throw Error(j(280));var e=t.stateNode;e&&(e=Gl(e),Hc(t.stateNode,t.type,e))}}function Ey(t){Ms?js?js.push(t):js=[t]:Ms=t}function Sy(){if(Ms){var t=Ms,e=js;if(js=Ms=null,Dp(t),e)for(t=0;t<e.length;t++)Dp(e[t])}}function Iy(t,e){return t(e)}function Cy(){}var Wu=!1;function Ty(t,e,n){if(Wu)return t(e,n);Wu=!0;try{return Iy(t,e,n)}finally{Wu=!1,(Ms!==null||js!==null)&&(Cy(),Sy())}}function aa(t,e){var n=t.stateNode;if(n===null)return null;var r=Gl(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(j(231,e,typeof n));return n}var Kc=!1;if(On)try{var Ci={};Object.defineProperty(Ci,"passive",{get:function(){Kc=!0}}),window.addEventListener("test",Ci,Ci),window.removeEventListener("test",Ci,Ci)}catch{Kc=!1}function I1(t,e,n,r,s,i,a,l,u){var d=Array.prototype.slice.call(arguments,3);try{e.apply(n,d)}catch(f){this.onError(f)}}var Hi=!1,rl=null,sl=!1,Gc=null,C1={onError:function(t){Hi=!0,rl=t}};function T1(t,e,n,r,s,i,a,l,u){Hi=!1,rl=null,I1.apply(C1,arguments)}function N1(t,e,n,r,s,i,a,l,u){if(T1.apply(this,arguments),Hi){if(Hi){var d=rl;Hi=!1,rl=null}else throw Error(j(198));sl||(sl=!0,Gc=d)}}function ls(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Ny(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Lp(t){if(ls(t)!==t)throw Error(j(188))}function A1(t){var e=t.alternate;if(!e){if(e=ls(t),e===null)throw Error(j(188));return e!==t?null:t}for(var n=t,r=e;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return Lp(s),t;if(i===r)return Lp(s),e;i=i.sibling}throw Error(j(188))}if(n.return!==r.return)n=s,r=i;else{for(var a=!1,l=s.child;l;){if(l===n){a=!0,n=s,r=i;break}if(l===r){a=!0,r=s,n=i;break}l=l.sibling}if(!a){for(l=i.child;l;){if(l===n){a=!0,n=i,r=s;break}if(l===r){a=!0,r=i,n=s;break}l=l.sibling}if(!a)throw Error(j(189))}}if(n.alternate!==r)throw Error(j(190))}if(n.tag!==3)throw Error(j(188));return n.stateNode.current===n?t:e}function Ay(t){return t=A1(t),t!==null?Py(t):null}function Py(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Py(t);if(e!==null)return e;t=t.sibling}return null}var Ry=Ut.unstable_scheduleCallback,Mp=Ut.unstable_cancelCallback,P1=Ut.unstable_shouldYield,R1=Ut.unstable_requestPaint,Le=Ut.unstable_now,O1=Ut.unstable_getCurrentPriorityLevel,rd=Ut.unstable_ImmediatePriority,Oy=Ut.unstable_UserBlockingPriority,il=Ut.unstable_NormalPriority,D1=Ut.unstable_LowPriority,Dy=Ut.unstable_IdlePriority,Bl=null,fn=null;function L1(t){if(fn&&typeof fn.onCommitFiberRoot=="function")try{fn.onCommitFiberRoot(Bl,t,void 0,(t.current.flags&128)===128)}catch{}}var an=Math.clz32?Math.clz32:U1,M1=Math.log,j1=Math.LN2;function U1(t){return t>>>=0,t===0?32:31-(M1(t)/j1|0)|0}var mo=64,go=4194304;function Ui(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function al(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,s=t.suspendedLanes,i=t.pingedLanes,a=n&268435455;if(a!==0){var l=a&~s;l!==0?r=Ui(l):(i&=a,i!==0&&(r=Ui(i)))}else a=n&~s,a!==0?r=Ui(a):i!==0&&(r=Ui(i));if(r===0)return 0;if(e!==0&&e!==r&&!(e&s)&&(s=r&-r,i=e&-e,s>=i||s===16&&(i&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-an(e),s=1<<n,r|=t[n],e&=~s;return r}function F1(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function V1(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,s=t.expirationTimes,i=t.pendingLanes;0<i;){var a=31-an(i),l=1<<a,u=s[a];u===-1?(!(l&n)||l&r)&&(s[a]=F1(l,e)):u<=e&&(t.expiredLanes|=l),i&=~l}}function Wc(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Ly(){var t=mo;return mo<<=1,!(mo&4194240)&&(mo=64),t}function Qu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Pa(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-an(e),t[e]=n}function z1(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var s=31-an(n),i=1<<s;e[s]=0,r[s]=-1,t[s]=-1,n&=~i}}function sd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-an(n),s=1<<r;s&e|t[r]&e&&(t[r]|=e),n&=~s}}var pe=0;function My(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var jy,id,Uy,Fy,Vy,Qc=!1,yo=[],ur=null,cr=null,hr=null,oa=new Map,la=new Map,er=[],$1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function jp(t,e){switch(t){case"focusin":case"focusout":ur=null;break;case"dragenter":case"dragleave":cr=null;break;case"mouseover":case"mouseout":hr=null;break;case"pointerover":case"pointerout":oa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":la.delete(e.pointerId)}}function Ti(t,e,n,r,s,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},e!==null&&(e=Oa(e),e!==null&&id(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),t)}function B1(t,e,n,r,s){switch(e){case"focusin":return ur=Ti(ur,t,e,n,r,s),!0;case"dragenter":return cr=Ti(cr,t,e,n,r,s),!0;case"mouseover":return hr=Ti(hr,t,e,n,r,s),!0;case"pointerover":var i=s.pointerId;return oa.set(i,Ti(oa.get(i)||null,t,e,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,la.set(i,Ti(la.get(i)||null,t,e,n,r,s)),!0}return!1}function zy(t){var e=Br(t.target);if(e!==null){var n=ls(e);if(n!==null){if(e=n.tag,e===13){if(e=Ny(n),e!==null){t.blockedOn=e,Vy(t.priority,function(){Uy(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function jo(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Xc(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);qc=r,n.target.dispatchEvent(r),qc=null}else return e=Oa(n),e!==null&&id(e),t.blockedOn=n,!1;e.shift()}return!0}function Up(t,e,n){jo(t)&&n.delete(e)}function q1(){Qc=!1,ur!==null&&jo(ur)&&(ur=null),cr!==null&&jo(cr)&&(cr=null),hr!==null&&jo(hr)&&(hr=null),oa.forEach(Up),la.forEach(Up)}function Ni(t,e){t.blockedOn===e&&(t.blockedOn=null,Qc||(Qc=!0,Ut.unstable_scheduleCallback(Ut.unstable_NormalPriority,q1)))}function ua(t){function e(s){return Ni(s,t)}if(0<yo.length){Ni(yo[0],t);for(var n=1;n<yo.length;n++){var r=yo[n];r.blockedOn===t&&(r.blockedOn=null)}}for(ur!==null&&Ni(ur,t),cr!==null&&Ni(cr,t),hr!==null&&Ni(hr,t),oa.forEach(e),la.forEach(e),n=0;n<er.length;n++)r=er[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<er.length&&(n=er[0],n.blockedOn===null);)zy(n),n.blockedOn===null&&er.shift()}var Us=$n.ReactCurrentBatchConfig,ol=!0;function H1(t,e,n,r){var s=pe,i=Us.transition;Us.transition=null;try{pe=1,ad(t,e,n,r)}finally{pe=s,Us.transition=i}}function K1(t,e,n,r){var s=pe,i=Us.transition;Us.transition=null;try{pe=4,ad(t,e,n,r)}finally{pe=s,Us.transition=i}}function ad(t,e,n,r){if(ol){var s=Xc(t,e,n,r);if(s===null)ic(t,e,r,ll,n),jp(t,r);else if(B1(s,t,e,n,r))r.stopPropagation();else if(jp(t,r),e&4&&-1<$1.indexOf(t)){for(;s!==null;){var i=Oa(s);if(i!==null&&jy(i),i=Xc(t,e,n,r),i===null&&ic(t,e,r,ll,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else ic(t,e,r,null,n)}}var ll=null;function Xc(t,e,n,r){if(ll=null,t=nd(r),t=Br(t),t!==null)if(e=ls(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Ny(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return ll=t,null}function $y(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(O1()){case rd:return 1;case Oy:return 4;case il:case D1:return 16;case Dy:return 536870912;default:return 16}default:return 16}}var ar=null,od=null,Uo=null;function By(){if(Uo)return Uo;var t,e=od,n=e.length,r,s="value"in ar?ar.value:ar.textContent,i=s.length;for(t=0;t<n&&e[t]===s[t];t++);var a=n-t;for(r=1;r<=a&&e[n-r]===s[i-r];r++);return Uo=s.slice(t,1<r?1-r:void 0)}function Fo(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function vo(){return!0}function Fp(){return!1}function Vt(t){function e(n,r,s,i,a){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=a,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?vo:Fp,this.isPropagationStopped=Fp,this}return Te(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=vo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=vo)},persist:function(){},isPersistent:vo}),e}var oi={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ld=Vt(oi),Ra=Te({},oi,{view:0,detail:0}),G1=Vt(Ra),Xu,Yu,Ai,ql=Te({},Ra,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ud,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ai&&(Ai&&t.type==="mousemove"?(Xu=t.screenX-Ai.screenX,Yu=t.screenY-Ai.screenY):Yu=Xu=0,Ai=t),Xu)},movementY:function(t){return"movementY"in t?t.movementY:Yu}}),Vp=Vt(ql),W1=Te({},ql,{dataTransfer:0}),Q1=Vt(W1),X1=Te({},Ra,{relatedTarget:0}),Ju=Vt(X1),Y1=Te({},oi,{animationName:0,elapsedTime:0,pseudoElement:0}),J1=Vt(Y1),Z1=Te({},oi,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),ex=Vt(Z1),tx=Te({},oi,{data:0}),zp=Vt(tx),nx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},rx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},sx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ix(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=sx[t])?!!e[t]:!1}function ud(){return ix}var ax=Te({},Ra,{key:function(t){if(t.key){var e=nx[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Fo(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?rx[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ud,charCode:function(t){return t.type==="keypress"?Fo(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Fo(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),ox=Vt(ax),lx=Te({},ql,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),$p=Vt(lx),ux=Te({},Ra,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ud}),cx=Vt(ux),hx=Te({},oi,{propertyName:0,elapsedTime:0,pseudoElement:0}),dx=Vt(hx),fx=Te({},ql,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),px=Vt(fx),mx=[9,13,27,32],cd=On&&"CompositionEvent"in window,Ki=null;On&&"documentMode"in document&&(Ki=document.documentMode);var gx=On&&"TextEvent"in window&&!Ki,qy=On&&(!cd||Ki&&8<Ki&&11>=Ki),Bp=" ",qp=!1;function Hy(t,e){switch(t){case"keyup":return mx.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ky(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Es=!1;function yx(t,e){switch(t){case"compositionend":return Ky(e);case"keypress":return e.which!==32?null:(qp=!0,Bp);case"textInput":return t=e.data,t===Bp&&qp?null:t;default:return null}}function vx(t,e){if(Es)return t==="compositionend"||!cd&&Hy(t,e)?(t=By(),Uo=od=ar=null,Es=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return qy&&e.locale!=="ko"?null:e.data;default:return null}}var bx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Hp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!bx[t.type]:e==="textarea"}function Gy(t,e,n,r){Ey(r),e=ul(e,"onChange"),0<e.length&&(n=new ld("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Gi=null,ca=null;function wx(t){sv(t,0)}function Hl(t){var e=Cs(t);if(yy(e))return t}function xx(t,e){if(t==="change")return e}var Wy=!1;if(On){var Zu;if(On){var ec="oninput"in document;if(!ec){var Kp=document.createElement("div");Kp.setAttribute("oninput","return;"),ec=typeof Kp.oninput=="function"}Zu=ec}else Zu=!1;Wy=Zu&&(!document.documentMode||9<document.documentMode)}function Gp(){Gi&&(Gi.detachEvent("onpropertychange",Qy),ca=Gi=null)}function Qy(t){if(t.propertyName==="value"&&Hl(ca)){var e=[];Gy(e,ca,t,nd(t)),Ty(wx,e)}}function kx(t,e,n){t==="focusin"?(Gp(),Gi=e,ca=n,Gi.attachEvent("onpropertychange",Qy)):t==="focusout"&&Gp()}function _x(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Hl(ca)}function Ex(t,e){if(t==="click")return Hl(e)}function Sx(t,e){if(t==="input"||t==="change")return Hl(e)}function Ix(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var un=typeof Object.is=="function"?Object.is:Ix;function ha(t,e){if(un(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!Rc.call(e,s)||!un(t[s],e[s]))return!1}return!0}function Wp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Qp(t,e){var n=Wp(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Wp(n)}}function Xy(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Xy(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Yy(){for(var t=window,e=nl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=nl(t.document)}return e}function hd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Cx(t){var e=Yy(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Xy(n.ownerDocument.documentElement,n)){if(r!==null&&hd(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!t.extend&&i>r&&(s=r,r=i,i=s),s=Qp(n,i);var a=Qp(n,r);s&&a&&(t.rangeCount!==1||t.anchorNode!==s.node||t.anchorOffset!==s.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(s.node,s.offset),t.removeAllRanges(),i>r?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Tx=On&&"documentMode"in document&&11>=document.documentMode,Ss=null,Yc=null,Wi=null,Jc=!1;function Xp(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Jc||Ss==null||Ss!==nl(r)||(r=Ss,"selectionStart"in r&&hd(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Wi&&ha(Wi,r)||(Wi=r,r=ul(Yc,"onSelect"),0<r.length&&(e=new ld("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=Ss)))}function bo(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Is={animationend:bo("Animation","AnimationEnd"),animationiteration:bo("Animation","AnimationIteration"),animationstart:bo("Animation","AnimationStart"),transitionend:bo("Transition","TransitionEnd")},tc={},Jy={};On&&(Jy=document.createElement("div").style,"AnimationEvent"in window||(delete Is.animationend.animation,delete Is.animationiteration.animation,delete Is.animationstart.animation),"TransitionEvent"in window||delete Is.transitionend.transition);function Kl(t){if(tc[t])return tc[t];if(!Is[t])return t;var e=Is[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Jy)return tc[t]=e[n];return t}var Zy=Kl("animationend"),ev=Kl("animationiteration"),tv=Kl("animationstart"),nv=Kl("transitionend"),rv=new Map,Yp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Nr(t,e){rv.set(t,e),os(e,[t])}for(var nc=0;nc<Yp.length;nc++){var rc=Yp[nc],Nx=rc.toLowerCase(),Ax=rc[0].toUpperCase()+rc.slice(1);Nr(Nx,"on"+Ax)}Nr(Zy,"onAnimationEnd");Nr(ev,"onAnimationIteration");Nr(tv,"onAnimationStart");Nr("dblclick","onDoubleClick");Nr("focusin","onFocus");Nr("focusout","onBlur");Nr(nv,"onTransitionEnd");Hs("onMouseEnter",["mouseout","mouseover"]);Hs("onMouseLeave",["mouseout","mouseover"]);Hs("onPointerEnter",["pointerout","pointerover"]);Hs("onPointerLeave",["pointerout","pointerover"]);os("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));os("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));os("onBeforeInput",["compositionend","keypress","textInput","paste"]);os("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));os("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));os("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Fi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Px=new Set("cancel close invalid load scroll toggle".split(" ").concat(Fi));function Jp(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,N1(r,e,void 0,t),t.currentTarget=null}function sv(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],s=r.event;r=r.listeners;e:{var i=void 0;if(e)for(var a=r.length-1;0<=a;a--){var l=r[a],u=l.instance,d=l.currentTarget;if(l=l.listener,u!==i&&s.isPropagationStopped())break e;Jp(s,l,d),i=u}else for(a=0;a<r.length;a++){if(l=r[a],u=l.instance,d=l.currentTarget,l=l.listener,u!==i&&s.isPropagationStopped())break e;Jp(s,l,d),i=u}}}if(sl)throw t=Gc,sl=!1,Gc=null,t}function xe(t,e){var n=e[rh];n===void 0&&(n=e[rh]=new Set);var r=t+"__bubble";n.has(r)||(iv(e,t,2,!1),n.add(r))}function sc(t,e,n){var r=0;e&&(r|=4),iv(n,t,r,e)}var wo="_reactListening"+Math.random().toString(36).slice(2);function da(t){if(!t[wo]){t[wo]=!0,dy.forEach(function(n){n!=="selectionchange"&&(Px.has(n)||sc(n,!1,t),sc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[wo]||(e[wo]=!0,sc("selectionchange",!1,e))}}function iv(t,e,n,r){switch($y(e)){case 1:var s=H1;break;case 4:s=K1;break;default:s=ad}n=s.bind(null,e,n,t),s=void 0,!Kc||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),r?s!==void 0?t.addEventListener(e,n,{capture:!0,passive:s}):t.addEventListener(e,n,!0):s!==void 0?t.addEventListener(e,n,{passive:s}):t.addEventListener(e,n,!1)}function ic(t,e,n,r,s){var i=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var l=r.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(a===4)for(a=r.return;a!==null;){var u=a.tag;if((u===3||u===4)&&(u=a.stateNode.containerInfo,u===s||u.nodeType===8&&u.parentNode===s))return;a=a.return}for(;l!==null;){if(a=Br(l),a===null)return;if(u=a.tag,u===5||u===6){r=i=a;continue e}l=l.parentNode}}r=r.return}Ty(function(){var d=i,f=nd(n),y=[];e:{var v=rv.get(t);if(v!==void 0){var C=ld,A=t;switch(t){case"keypress":if(Fo(n)===0)break e;case"keydown":case"keyup":C=ox;break;case"focusin":A="focus",C=Ju;break;case"focusout":A="blur",C=Ju;break;case"beforeblur":case"afterblur":C=Ju;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":C=Vp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":C=Q1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":C=cx;break;case Zy:case ev:case tv:C=J1;break;case nv:C=dx;break;case"scroll":C=G1;break;case"wheel":C=px;break;case"copy":case"cut":case"paste":C=ex;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":C=$p}var P=(e&4)!==0,M=!P&&t==="scroll",E=P?v!==null?v+"Capture":null:v;P=[];for(var x=d,S;x!==null;){S=x;var O=S.stateNode;if(S.tag===5&&O!==null&&(S=O,E!==null&&(O=aa(x,E),O!=null&&P.push(fa(x,O,S)))),M)break;x=x.return}0<P.length&&(v=new C(v,A,null,n,f),y.push({event:v,listeners:P}))}}if(!(e&7)){e:{if(v=t==="mouseover"||t==="pointerover",C=t==="mouseout"||t==="pointerout",v&&n!==qc&&(A=n.relatedTarget||n.fromElement)&&(Br(A)||A[Dn]))break e;if((C||v)&&(v=f.window===f?f:(v=f.ownerDocument)?v.defaultView||v.parentWindow:window,C?(A=n.relatedTarget||n.toElement,C=d,A=A?Br(A):null,A!==null&&(M=ls(A),A!==M||A.tag!==5&&A.tag!==6)&&(A=null)):(C=null,A=d),C!==A)){if(P=Vp,O="onMouseLeave",E="onMouseEnter",x="mouse",(t==="pointerout"||t==="pointerover")&&(P=$p,O="onPointerLeave",E="onPointerEnter",x="pointer"),M=C==null?v:Cs(C),S=A==null?v:Cs(A),v=new P(O,x+"leave",C,n,f),v.target=M,v.relatedTarget=S,O=null,Br(f)===d&&(P=new P(E,x+"enter",A,n,f),P.target=S,P.relatedTarget=M,O=P),M=O,C&&A)t:{for(P=C,E=A,x=0,S=P;S;S=ys(S))x++;for(S=0,O=E;O;O=ys(O))S++;for(;0<x-S;)P=ys(P),x--;for(;0<S-x;)E=ys(E),S--;for(;x--;){if(P===E||E!==null&&P===E.alternate)break t;P=ys(P),E=ys(E)}P=null}else P=null;C!==null&&Zp(y,v,C,P,!1),A!==null&&M!==null&&Zp(y,M,A,P,!0)}}e:{if(v=d?Cs(d):window,C=v.nodeName&&v.nodeName.toLowerCase(),C==="select"||C==="input"&&v.type==="file")var V=xx;else if(Hp(v))if(Wy)V=Sx;else{V=_x;var F=kx}else(C=v.nodeName)&&C.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(V=Ex);if(V&&(V=V(t,d))){Gy(y,V,n,f);break e}F&&F(t,v,d),t==="focusout"&&(F=v._wrapperState)&&F.controlled&&v.type==="number"&&Fc(v,"number",v.value)}switch(F=d?Cs(d):window,t){case"focusin":(Hp(F)||F.contentEditable==="true")&&(Ss=F,Yc=d,Wi=null);break;case"focusout":Wi=Yc=Ss=null;break;case"mousedown":Jc=!0;break;case"contextmenu":case"mouseup":case"dragend":Jc=!1,Xp(y,n,f);break;case"selectionchange":if(Tx)break;case"keydown":case"keyup":Xp(y,n,f)}var w;if(cd)e:{switch(t){case"compositionstart":var m="onCompositionStart";break e;case"compositionend":m="onCompositionEnd";break e;case"compositionupdate":m="onCompositionUpdate";break e}m=void 0}else Es?Hy(t,n)&&(m="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(m="onCompositionStart");m&&(qy&&n.locale!=="ko"&&(Es||m!=="onCompositionStart"?m==="onCompositionEnd"&&Es&&(w=By()):(ar=f,od="value"in ar?ar.value:ar.textContent,Es=!0)),F=ul(d,m),0<F.length&&(m=new zp(m,t,null,n,f),y.push({event:m,listeners:F}),w?m.data=w:(w=Ky(n),w!==null&&(m.data=w)))),(w=gx?yx(t,n):vx(t,n))&&(d=ul(d,"onBeforeInput"),0<d.length&&(f=new zp("onBeforeInput","beforeinput",null,n,f),y.push({event:f,listeners:d}),f.data=w))}sv(y,e)})}function fa(t,e,n){return{instance:t,listener:e,currentTarget:n}}function ul(t,e){for(var n=e+"Capture",r=[];t!==null;){var s=t,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=aa(t,n),i!=null&&r.unshift(fa(t,i,s)),i=aa(t,e),i!=null&&r.push(fa(t,i,s))),t=t.return}return r}function ys(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Zp(t,e,n,r,s){for(var i=e._reactName,a=[];n!==null&&n!==r;){var l=n,u=l.alternate,d=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&d!==null&&(l=d,s?(u=aa(n,i),u!=null&&a.unshift(fa(n,u,l))):s||(u=aa(n,i),u!=null&&a.push(fa(n,u,l)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var Rx=/\r\n?/g,Ox=/\u0000|\uFFFD/g;function em(t){return(typeof t=="string"?t:""+t).replace(Rx,`
`).replace(Ox,"")}function xo(t,e,n){if(e=em(e),em(t)!==e&&n)throw Error(j(425))}function cl(){}var Zc=null,eh=null;function th(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var nh=typeof setTimeout=="function"?setTimeout:void 0,Dx=typeof clearTimeout=="function"?clearTimeout:void 0,tm=typeof Promise=="function"?Promise:void 0,Lx=typeof queueMicrotask=="function"?queueMicrotask:typeof tm<"u"?function(t){return tm.resolve(null).then(t).catch(Mx)}:nh;function Mx(t){setTimeout(function(){throw t})}function ac(t,e){var n=e,r=0;do{var s=n.nextSibling;if(t.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){t.removeChild(s),ua(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);ua(e)}function dr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function nm(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var li=Math.random().toString(36).slice(2),dn="__reactFiber$"+li,pa="__reactProps$"+li,Dn="__reactContainer$"+li,rh="__reactEvents$"+li,jx="__reactListeners$"+li,Ux="__reactHandles$"+li;function Br(t){var e=t[dn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Dn]||n[dn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=nm(t);t!==null;){if(n=t[dn])return n;t=nm(t)}return e}t=n,n=t.parentNode}return null}function Oa(t){return t=t[dn]||t[Dn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Cs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(j(33))}function Gl(t){return t[pa]||null}var sh=[],Ts=-1;function Ar(t){return{current:t}}function ke(t){0>Ts||(t.current=sh[Ts],sh[Ts]=null,Ts--)}function ge(t,e){Ts++,sh[Ts]=t.current,t.current=e}var _r={},dt=Ar(_r),Tt=Ar(!1),Yr=_r;function Ks(t,e){var n=t.type.contextTypes;if(!n)return _r;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=e[i];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=s),s}function Nt(t){return t=t.childContextTypes,t!=null}function hl(){ke(Tt),ke(dt)}function rm(t,e,n){if(dt.current!==_r)throw Error(j(168));ge(dt,e),ge(Tt,n)}function av(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in e))throw Error(j(108,k1(t)||"Unknown",s));return Te({},n,r)}function dl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||_r,Yr=dt.current,ge(dt,t),ge(Tt,Tt.current),!0}function sm(t,e,n){var r=t.stateNode;if(!r)throw Error(j(169));n?(t=av(t,e,Yr),r.__reactInternalMemoizedMergedChildContext=t,ke(Tt),ke(dt),ge(dt,t)):ke(Tt),ge(Tt,n)}var Sn=null,Wl=!1,oc=!1;function ov(t){Sn===null?Sn=[t]:Sn.push(t)}function Fx(t){Wl=!0,ov(t)}function Pr(){if(!oc&&Sn!==null){oc=!0;var t=0,e=pe;try{var n=Sn;for(pe=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}Sn=null,Wl=!1}catch(s){throw Sn!==null&&(Sn=Sn.slice(t+1)),Ry(rd,Pr),s}finally{pe=e,oc=!1}}return null}var Ns=[],As=0,fl=null,pl=0,$t=[],Bt=0,Jr=null,In=1,Cn="";function Vr(t,e){Ns[As++]=pl,Ns[As++]=fl,fl=t,pl=e}function lv(t,e,n){$t[Bt++]=In,$t[Bt++]=Cn,$t[Bt++]=Jr,Jr=t;var r=In;t=Cn;var s=32-an(r)-1;r&=~(1<<s),n+=1;var i=32-an(e)+s;if(30<i){var a=s-s%5;i=(r&(1<<a)-1).toString(32),r>>=a,s-=a,In=1<<32-an(e)+s|n<<s|r,Cn=i+t}else In=1<<i|n<<s|r,Cn=t}function dd(t){t.return!==null&&(Vr(t,1),lv(t,1,0))}function fd(t){for(;t===fl;)fl=Ns[--As],Ns[As]=null,pl=Ns[--As],Ns[As]=null;for(;t===Jr;)Jr=$t[--Bt],$t[Bt]=null,Cn=$t[--Bt],$t[Bt]=null,In=$t[--Bt],$t[Bt]=null}var jt=null,Lt=null,_e=!1,sn=null;function uv(t,e){var n=qt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function im(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,jt=t,Lt=dr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,jt=t,Lt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Jr!==null?{id:In,overflow:Cn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=qt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,jt=t,Lt=null,!0):!1;default:return!1}}function ih(t){return(t.mode&1)!==0&&(t.flags&128)===0}function ah(t){if(_e){var e=Lt;if(e){var n=e;if(!im(t,e)){if(ih(t))throw Error(j(418));e=dr(n.nextSibling);var r=jt;e&&im(t,e)?uv(r,n):(t.flags=t.flags&-4097|2,_e=!1,jt=t)}}else{if(ih(t))throw Error(j(418));t.flags=t.flags&-4097|2,_e=!1,jt=t}}}function am(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;jt=t}function ko(t){if(t!==jt)return!1;if(!_e)return am(t),_e=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!th(t.type,t.memoizedProps)),e&&(e=Lt)){if(ih(t))throw cv(),Error(j(418));for(;e;)uv(t,e),e=dr(e.nextSibling)}if(am(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(j(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Lt=dr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Lt=null}}else Lt=jt?dr(t.stateNode.nextSibling):null;return!0}function cv(){for(var t=Lt;t;)t=dr(t.nextSibling)}function Gs(){Lt=jt=null,_e=!1}function pd(t){sn===null?sn=[t]:sn.push(t)}var Vx=$n.ReactCurrentBatchConfig;function Pi(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(j(309));var r=n.stateNode}if(!r)throw Error(j(147,t));var s=r,i=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===i?e.ref:(e=function(a){var l=s.refs;a===null?delete l[i]:l[i]=a},e._stringRef=i,e)}if(typeof t!="string")throw Error(j(284));if(!n._owner)throw Error(j(290,t))}return t}function _o(t,e){throw t=Object.prototype.toString.call(e),Error(j(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function om(t){var e=t._init;return e(t._payload)}function hv(t){function e(E,x){if(t){var S=E.deletions;S===null?(E.deletions=[x],E.flags|=16):S.push(x)}}function n(E,x){if(!t)return null;for(;x!==null;)e(E,x),x=x.sibling;return null}function r(E,x){for(E=new Map;x!==null;)x.key!==null?E.set(x.key,x):E.set(x.index,x),x=x.sibling;return E}function s(E,x){return E=gr(E,x),E.index=0,E.sibling=null,E}function i(E,x,S){return E.index=S,t?(S=E.alternate,S!==null?(S=S.index,S<x?(E.flags|=2,x):S):(E.flags|=2,x)):(E.flags|=1048576,x)}function a(E){return t&&E.alternate===null&&(E.flags|=2),E}function l(E,x,S,O){return x===null||x.tag!==6?(x=pc(S,E.mode,O),x.return=E,x):(x=s(x,S),x.return=E,x)}function u(E,x,S,O){var V=S.type;return V===_s?f(E,x,S.props.children,O,S.key):x!==null&&(x.elementType===V||typeof V=="object"&&V!==null&&V.$$typeof===Jn&&om(V)===x.type)?(O=s(x,S.props),O.ref=Pi(E,x,S),O.return=E,O):(O=Ko(S.type,S.key,S.props,null,E.mode,O),O.ref=Pi(E,x,S),O.return=E,O)}function d(E,x,S,O){return x===null||x.tag!==4||x.stateNode.containerInfo!==S.containerInfo||x.stateNode.implementation!==S.implementation?(x=mc(S,E.mode,O),x.return=E,x):(x=s(x,S.children||[]),x.return=E,x)}function f(E,x,S,O,V){return x===null||x.tag!==7?(x=Wr(S,E.mode,O,V),x.return=E,x):(x=s(x,S),x.return=E,x)}function y(E,x,S){if(typeof x=="string"&&x!==""||typeof x=="number")return x=pc(""+x,E.mode,S),x.return=E,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case ho:return S=Ko(x.type,x.key,x.props,null,E.mode,S),S.ref=Pi(E,null,x),S.return=E,S;case ks:return x=mc(x,E.mode,S),x.return=E,x;case Jn:var O=x._init;return y(E,O(x._payload),S)}if(ji(x)||Ii(x))return x=Wr(x,E.mode,S,null),x.return=E,x;_o(E,x)}return null}function v(E,x,S,O){var V=x!==null?x.key:null;if(typeof S=="string"&&S!==""||typeof S=="number")return V!==null?null:l(E,x,""+S,O);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case ho:return S.key===V?u(E,x,S,O):null;case ks:return S.key===V?d(E,x,S,O):null;case Jn:return V=S._init,v(E,x,V(S._payload),O)}if(ji(S)||Ii(S))return V!==null?null:f(E,x,S,O,null);_o(E,S)}return null}function C(E,x,S,O,V){if(typeof O=="string"&&O!==""||typeof O=="number")return E=E.get(S)||null,l(x,E,""+O,V);if(typeof O=="object"&&O!==null){switch(O.$$typeof){case ho:return E=E.get(O.key===null?S:O.key)||null,u(x,E,O,V);case ks:return E=E.get(O.key===null?S:O.key)||null,d(x,E,O,V);case Jn:var F=O._init;return C(E,x,S,F(O._payload),V)}if(ji(O)||Ii(O))return E=E.get(S)||null,f(x,E,O,V,null);_o(x,O)}return null}function A(E,x,S,O){for(var V=null,F=null,w=x,m=x=0,b=null;w!==null&&m<S.length;m++){w.index>m?(b=w,w=null):b=w.sibling;var k=v(E,w,S[m],O);if(k===null){w===null&&(w=b);break}t&&w&&k.alternate===null&&e(E,w),x=i(k,x,m),F===null?V=k:F.sibling=k,F=k,w=b}if(m===S.length)return n(E,w),_e&&Vr(E,m),V;if(w===null){for(;m<S.length;m++)w=y(E,S[m],O),w!==null&&(x=i(w,x,m),F===null?V=w:F.sibling=w,F=w);return _e&&Vr(E,m),V}for(w=r(E,w);m<S.length;m++)b=C(w,E,m,S[m],O),b!==null&&(t&&b.alternate!==null&&w.delete(b.key===null?m:b.key),x=i(b,x,m),F===null?V=b:F.sibling=b,F=b);return t&&w.forEach(function(I){return e(E,I)}),_e&&Vr(E,m),V}function P(E,x,S,O){var V=Ii(S);if(typeof V!="function")throw Error(j(150));if(S=V.call(S),S==null)throw Error(j(151));for(var F=V=null,w=x,m=x=0,b=null,k=S.next();w!==null&&!k.done;m++,k=S.next()){w.index>m?(b=w,w=null):b=w.sibling;var I=v(E,w,k.value,O);if(I===null){w===null&&(w=b);break}t&&w&&I.alternate===null&&e(E,w),x=i(I,x,m),F===null?V=I:F.sibling=I,F=I,w=b}if(k.done)return n(E,w),_e&&Vr(E,m),V;if(w===null){for(;!k.done;m++,k=S.next())k=y(E,k.value,O),k!==null&&(x=i(k,x,m),F===null?V=k:F.sibling=k,F=k);return _e&&Vr(E,m),V}for(w=r(E,w);!k.done;m++,k=S.next())k=C(w,E,m,k.value,O),k!==null&&(t&&k.alternate!==null&&w.delete(k.key===null?m:k.key),x=i(k,x,m),F===null?V=k:F.sibling=k,F=k);return t&&w.forEach(function(T){return e(E,T)}),_e&&Vr(E,m),V}function M(E,x,S,O){if(typeof S=="object"&&S!==null&&S.type===_s&&S.key===null&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case ho:e:{for(var V=S.key,F=x;F!==null;){if(F.key===V){if(V=S.type,V===_s){if(F.tag===7){n(E,F.sibling),x=s(F,S.props.children),x.return=E,E=x;break e}}else if(F.elementType===V||typeof V=="object"&&V!==null&&V.$$typeof===Jn&&om(V)===F.type){n(E,F.sibling),x=s(F,S.props),x.ref=Pi(E,F,S),x.return=E,E=x;break e}n(E,F);break}else e(E,F);F=F.sibling}S.type===_s?(x=Wr(S.props.children,E.mode,O,S.key),x.return=E,E=x):(O=Ko(S.type,S.key,S.props,null,E.mode,O),O.ref=Pi(E,x,S),O.return=E,E=O)}return a(E);case ks:e:{for(F=S.key;x!==null;){if(x.key===F)if(x.tag===4&&x.stateNode.containerInfo===S.containerInfo&&x.stateNode.implementation===S.implementation){n(E,x.sibling),x=s(x,S.children||[]),x.return=E,E=x;break e}else{n(E,x);break}else e(E,x);x=x.sibling}x=mc(S,E.mode,O),x.return=E,E=x}return a(E);case Jn:return F=S._init,M(E,x,F(S._payload),O)}if(ji(S))return A(E,x,S,O);if(Ii(S))return P(E,x,S,O);_o(E,S)}return typeof S=="string"&&S!==""||typeof S=="number"?(S=""+S,x!==null&&x.tag===6?(n(E,x.sibling),x=s(x,S),x.return=E,E=x):(n(E,x),x=pc(S,E.mode,O),x.return=E,E=x),a(E)):n(E,x)}return M}var Ws=hv(!0),dv=hv(!1),ml=Ar(null),gl=null,Ps=null,md=null;function gd(){md=Ps=gl=null}function yd(t){var e=ml.current;ke(ml),t._currentValue=e}function oh(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Fs(t,e){gl=t,md=Ps=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Ct=!0),t.firstContext=null)}function Kt(t){var e=t._currentValue;if(md!==t)if(t={context:t,memoizedValue:e,next:null},Ps===null){if(gl===null)throw Error(j(308));Ps=t,gl.dependencies={lanes:0,firstContext:t}}else Ps=Ps.next=t;return e}var qr=null;function vd(t){qr===null?qr=[t]:qr.push(t)}function fv(t,e,n,r){var s=e.interleaved;return s===null?(n.next=n,vd(e)):(n.next=s.next,s.next=n),e.interleaved=n,Ln(t,r)}function Ln(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Zn=!1;function bd(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function pv(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Rn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function fr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,ue&2){var s=r.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),r.pending=e,Ln(t,n)}return s=r.interleaved,s===null?(e.next=e,vd(r)):(e.next=s.next,s.next=e),r.interleaved=e,Ln(t,n)}function Vo(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,sd(t,n)}}function lm(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=a:i=i.next=a,n=n.next}while(n!==null);i===null?s=i=e:i=i.next=e}else s=i=e;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function yl(t,e,n,r){var s=t.updateQueue;Zn=!1;var i=s.firstBaseUpdate,a=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var u=l,d=u.next;u.next=null,a===null?i=d:a.next=d,a=u;var f=t.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==a&&(l===null?f.firstBaseUpdate=d:l.next=d,f.lastBaseUpdate=u))}if(i!==null){var y=s.baseState;a=0,f=d=u=null,l=i;do{var v=l.lane,C=l.eventTime;if((r&v)===v){f!==null&&(f=f.next={eventTime:C,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var A=t,P=l;switch(v=e,C=n,P.tag){case 1:if(A=P.payload,typeof A=="function"){y=A.call(C,y,v);break e}y=A;break e;case 3:A.flags=A.flags&-65537|128;case 0:if(A=P.payload,v=typeof A=="function"?A.call(C,y,v):A,v==null)break e;y=Te({},y,v);break e;case 2:Zn=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,v=s.effects,v===null?s.effects=[l]:v.push(l))}else C={eventTime:C,lane:v,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(d=f=C,u=y):f=f.next=C,a|=v;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;v=l,l=v.next,v.next=null,s.lastBaseUpdate=v,s.shared.pending=null}}while(!0);if(f===null&&(u=y),s.baseState=u,s.firstBaseUpdate=d,s.lastBaseUpdate=f,e=s.shared.interleaved,e!==null){s=e;do a|=s.lane,s=s.next;while(s!==e)}else i===null&&(s.shared.lanes=0);es|=a,t.lanes=a,t.memoizedState=y}}function um(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(j(191,s));s.call(r)}}}var Da={},pn=Ar(Da),ma=Ar(Da),ga=Ar(Da);function Hr(t){if(t===Da)throw Error(j(174));return t}function wd(t,e){switch(ge(ga,e),ge(ma,t),ge(pn,Da),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:zc(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=zc(e,t)}ke(pn),ge(pn,e)}function Qs(){ke(pn),ke(ma),ke(ga)}function mv(t){Hr(ga.current);var e=Hr(pn.current),n=zc(e,t.type);e!==n&&(ge(ma,t),ge(pn,n))}function xd(t){ma.current===t&&(ke(pn),ke(ma))}var Ie=Ar(0);function vl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var lc=[];function kd(){for(var t=0;t<lc.length;t++)lc[t]._workInProgressVersionPrimary=null;lc.length=0}var zo=$n.ReactCurrentDispatcher,uc=$n.ReactCurrentBatchConfig,Zr=0,Ce=null,Ue=null,He=null,bl=!1,Qi=!1,ya=0,zx=0;function it(){throw Error(j(321))}function _d(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!un(t[n],e[n]))return!1;return!0}function Ed(t,e,n,r,s,i){if(Zr=i,Ce=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,zo.current=t===null||t.memoizedState===null?Hx:Kx,t=n(r,s),Qi){i=0;do{if(Qi=!1,ya=0,25<=i)throw Error(j(301));i+=1,He=Ue=null,e.updateQueue=null,zo.current=Gx,t=n(r,s)}while(Qi)}if(zo.current=wl,e=Ue!==null&&Ue.next!==null,Zr=0,He=Ue=Ce=null,bl=!1,e)throw Error(j(300));return t}function Sd(){var t=ya!==0;return ya=0,t}function hn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return He===null?Ce.memoizedState=He=t:He=He.next=t,He}function Gt(){if(Ue===null){var t=Ce.alternate;t=t!==null?t.memoizedState:null}else t=Ue.next;var e=He===null?Ce.memoizedState:He.next;if(e!==null)He=e,Ue=t;else{if(t===null)throw Error(j(310));Ue=t,t={memoizedState:Ue.memoizedState,baseState:Ue.baseState,baseQueue:Ue.baseQueue,queue:Ue.queue,next:null},He===null?Ce.memoizedState=He=t:He=He.next=t}return He}function va(t,e){return typeof e=="function"?e(t):e}function cc(t){var e=Gt(),n=e.queue;if(n===null)throw Error(j(311));n.lastRenderedReducer=t;var r=Ue,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var a=s.next;s.next=i.next,i.next=a}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var l=a=null,u=null,d=i;do{var f=d.lane;if((Zr&f)===f)u!==null&&(u=u.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:t(r,d.action);else{var y={lane:f,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};u===null?(l=u=y,a=r):u=u.next=y,Ce.lanes|=f,es|=f}d=d.next}while(d!==null&&d!==i);u===null?a=r:u.next=l,un(r,e.memoizedState)||(Ct=!0),e.memoizedState=r,e.baseState=a,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){s=t;do i=s.lane,Ce.lanes|=i,es|=i,s=s.next;while(s!==t)}else s===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function hc(t){var e=Gt(),n=e.queue;if(n===null)throw Error(j(311));n.lastRenderedReducer=t;var r=n.dispatch,s=n.pending,i=e.memoizedState;if(s!==null){n.pending=null;var a=s=s.next;do i=t(i,a.action),a=a.next;while(a!==s);un(i,e.memoizedState)||(Ct=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,r]}function gv(){}function yv(t,e){var n=Ce,r=Gt(),s=e(),i=!un(r.memoizedState,s);if(i&&(r.memoizedState=s,Ct=!0),r=r.queue,Id(wv.bind(null,n,r,t),[t]),r.getSnapshot!==e||i||He!==null&&He.memoizedState.tag&1){if(n.flags|=2048,ba(9,bv.bind(null,n,r,s,e),void 0,null),Ke===null)throw Error(j(349));Zr&30||vv(n,e,s)}return s}function vv(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Ce.updateQueue,e===null?(e={lastEffect:null,stores:null},Ce.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function bv(t,e,n,r){e.value=n,e.getSnapshot=r,xv(e)&&kv(t)}function wv(t,e,n){return n(function(){xv(e)&&kv(t)})}function xv(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!un(t,n)}catch{return!0}}function kv(t){var e=Ln(t,1);e!==null&&on(e,t,1,-1)}function cm(t){var e=hn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:va,lastRenderedState:t},e.queue=t,t=t.dispatch=qx.bind(null,Ce,t),[e.memoizedState,t]}function ba(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=Ce.updateQueue,e===null?(e={lastEffect:null,stores:null},Ce.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function _v(){return Gt().memoizedState}function $o(t,e,n,r){var s=hn();Ce.flags|=t,s.memoizedState=ba(1|e,n,void 0,r===void 0?null:r)}function Ql(t,e,n,r){var s=Gt();r=r===void 0?null:r;var i=void 0;if(Ue!==null){var a=Ue.memoizedState;if(i=a.destroy,r!==null&&_d(r,a.deps)){s.memoizedState=ba(e,n,i,r);return}}Ce.flags|=t,s.memoizedState=ba(1|e,n,i,r)}function hm(t,e){return $o(8390656,8,t,e)}function Id(t,e){return Ql(2048,8,t,e)}function Ev(t,e){return Ql(4,2,t,e)}function Sv(t,e){return Ql(4,4,t,e)}function Iv(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Cv(t,e,n){return n=n!=null?n.concat([t]):null,Ql(4,4,Iv.bind(null,e,t),n)}function Cd(){}function Tv(t,e){var n=Gt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&_d(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function Nv(t,e){var n=Gt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&_d(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function Av(t,e,n){return Zr&21?(un(n,e)||(n=Ly(),Ce.lanes|=n,es|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Ct=!0),t.memoizedState=n)}function $x(t,e){var n=pe;pe=n!==0&&4>n?n:4,t(!0);var r=uc.transition;uc.transition={};try{t(!1),e()}finally{pe=n,uc.transition=r}}function Pv(){return Gt().memoizedState}function Bx(t,e,n){var r=mr(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Rv(t))Ov(e,n);else if(n=fv(t,e,n,r),n!==null){var s=vt();on(n,t,r,s),Dv(n,e,r)}}function qx(t,e,n){var r=mr(t),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Rv(t))Ov(e,s);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var a=e.lastRenderedState,l=i(a,n);if(s.hasEagerState=!0,s.eagerState=l,un(l,a)){var u=e.interleaved;u===null?(s.next=s,vd(e)):(s.next=u.next,u.next=s),e.interleaved=s;return}}catch{}finally{}n=fv(t,e,s,r),n!==null&&(s=vt(),on(n,t,r,s),Dv(n,e,r))}}function Rv(t){var e=t.alternate;return t===Ce||e!==null&&e===Ce}function Ov(t,e){Qi=bl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Dv(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,sd(t,n)}}var wl={readContext:Kt,useCallback:it,useContext:it,useEffect:it,useImperativeHandle:it,useInsertionEffect:it,useLayoutEffect:it,useMemo:it,useReducer:it,useRef:it,useState:it,useDebugValue:it,useDeferredValue:it,useTransition:it,useMutableSource:it,useSyncExternalStore:it,useId:it,unstable_isNewReconciler:!1},Hx={readContext:Kt,useCallback:function(t,e){return hn().memoizedState=[t,e===void 0?null:e],t},useContext:Kt,useEffect:hm,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,$o(4194308,4,Iv.bind(null,e,t),n)},useLayoutEffect:function(t,e){return $o(4194308,4,t,e)},useInsertionEffect:function(t,e){return $o(4,2,t,e)},useMemo:function(t,e){var n=hn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=hn();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=Bx.bind(null,Ce,t),[r.memoizedState,t]},useRef:function(t){var e=hn();return t={current:t},e.memoizedState=t},useState:cm,useDebugValue:Cd,useDeferredValue:function(t){return hn().memoizedState=t},useTransition:function(){var t=cm(!1),e=t[0];return t=$x.bind(null,t[1]),hn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=Ce,s=hn();if(_e){if(n===void 0)throw Error(j(407));n=n()}else{if(n=e(),Ke===null)throw Error(j(349));Zr&30||vv(r,e,n)}s.memoizedState=n;var i={value:n,getSnapshot:e};return s.queue=i,hm(wv.bind(null,r,i,t),[t]),r.flags|=2048,ba(9,bv.bind(null,r,i,n,e),void 0,null),n},useId:function(){var t=hn(),e=Ke.identifierPrefix;if(_e){var n=Cn,r=In;n=(r&~(1<<32-an(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=ya++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=zx++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Kx={readContext:Kt,useCallback:Tv,useContext:Kt,useEffect:Id,useImperativeHandle:Cv,useInsertionEffect:Ev,useLayoutEffect:Sv,useMemo:Nv,useReducer:cc,useRef:_v,useState:function(){return cc(va)},useDebugValue:Cd,useDeferredValue:function(t){var e=Gt();return Av(e,Ue.memoizedState,t)},useTransition:function(){var t=cc(va)[0],e=Gt().memoizedState;return[t,e]},useMutableSource:gv,useSyncExternalStore:yv,useId:Pv,unstable_isNewReconciler:!1},Gx={readContext:Kt,useCallback:Tv,useContext:Kt,useEffect:Id,useImperativeHandle:Cv,useInsertionEffect:Ev,useLayoutEffect:Sv,useMemo:Nv,useReducer:hc,useRef:_v,useState:function(){return hc(va)},useDebugValue:Cd,useDeferredValue:function(t){var e=Gt();return Ue===null?e.memoizedState=t:Av(e,Ue.memoizedState,t)},useTransition:function(){var t=hc(va)[0],e=Gt().memoizedState;return[t,e]},useMutableSource:gv,useSyncExternalStore:yv,useId:Pv,unstable_isNewReconciler:!1};function nn(t,e){if(t&&t.defaultProps){e=Te({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function lh(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:Te({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Xl={isMounted:function(t){return(t=t._reactInternals)?ls(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=vt(),s=mr(t),i=Rn(r,s);i.payload=e,n!=null&&(i.callback=n),e=fr(t,i,s),e!==null&&(on(e,t,s,r),Vo(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=vt(),s=mr(t),i=Rn(r,s);i.tag=1,i.payload=e,n!=null&&(i.callback=n),e=fr(t,i,s),e!==null&&(on(e,t,s,r),Vo(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=vt(),r=mr(t),s=Rn(n,r);s.tag=2,e!=null&&(s.callback=e),e=fr(t,s,r),e!==null&&(on(e,t,r,n),Vo(e,t,r))}};function dm(t,e,n,r,s,i,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,i,a):e.prototype&&e.prototype.isPureReactComponent?!ha(n,r)||!ha(s,i):!0}function Lv(t,e,n){var r=!1,s=_r,i=e.contextType;return typeof i=="object"&&i!==null?i=Kt(i):(s=Nt(e)?Yr:dt.current,r=e.contextTypes,i=(r=r!=null)?Ks(t,s):_r),e=new e(n,i),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Xl,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=s,t.__reactInternalMemoizedMaskedChildContext=i),e}function fm(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Xl.enqueueReplaceState(e,e.state,null)}function uh(t,e,n,r){var s=t.stateNode;s.props=n,s.state=t.memoizedState,s.refs={},bd(t);var i=e.contextType;typeof i=="object"&&i!==null?s.context=Kt(i):(i=Nt(e)?Yr:dt.current,s.context=Ks(t,i)),s.state=t.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(lh(t,e,i,n),s.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(e=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),e!==s.state&&Xl.enqueueReplaceState(s,s.state,null),yl(t,n,s,r),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308)}function Xs(t,e){try{var n="",r=e;do n+=x1(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:t,source:e,stack:s,digest:null}}function dc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function ch(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Wx=typeof WeakMap=="function"?WeakMap:Map;function Mv(t,e,n){n=Rn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){kl||(kl=!0,bh=r),ch(t,e)},n}function jv(t,e,n){n=Rn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var s=e.value;n.payload=function(){return r(s)},n.callback=function(){ch(t,e)}}var i=t.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){ch(t,e),typeof r!="function"&&(pr===null?pr=new Set([this]):pr.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function pm(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new Wx;var s=new Set;r.set(e,s)}else s=r.get(e),s===void 0&&(s=new Set,r.set(e,s));s.has(n)||(s.add(n),t=lk.bind(null,t,e,n),e.then(t,t))}function mm(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function gm(t,e,n,r,s){return t.mode&1?(t.flags|=65536,t.lanes=s,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Rn(-1,1),e.tag=2,fr(n,e,1))),n.lanes|=1),t)}var Qx=$n.ReactCurrentOwner,Ct=!1;function yt(t,e,n,r){e.child=t===null?dv(e,null,n,r):Ws(e,t.child,n,r)}function ym(t,e,n,r,s){n=n.render;var i=e.ref;return Fs(e,s),r=Ed(t,e,n,r,i,s),n=Sd(),t!==null&&!Ct?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Mn(t,e,s)):(_e&&n&&dd(e),e.flags|=1,yt(t,e,r,s),e.child)}function vm(t,e,n,r,s){if(t===null){var i=n.type;return typeof i=="function"&&!Ld(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=i,Uv(t,e,i,r,s)):(t=Ko(n.type,null,r,e,e.mode,s),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!(t.lanes&s)){var a=i.memoizedProps;if(n=n.compare,n=n!==null?n:ha,n(a,r)&&t.ref===e.ref)return Mn(t,e,s)}return e.flags|=1,t=gr(i,r),t.ref=e.ref,t.return=e,e.child=t}function Uv(t,e,n,r,s){if(t!==null){var i=t.memoizedProps;if(ha(i,r)&&t.ref===e.ref)if(Ct=!1,e.pendingProps=r=i,(t.lanes&s)!==0)t.flags&131072&&(Ct=!0);else return e.lanes=t.lanes,Mn(t,e,s)}return hh(t,e,n,r,s)}function Fv(t,e,n){var r=e.pendingProps,s=r.children,i=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ge(Os,Dt),Dt|=n;else{if(!(n&1073741824))return t=i!==null?i.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ge(Os,Dt),Dt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,ge(Os,Dt),Dt|=r}else i!==null?(r=i.baseLanes|n,e.memoizedState=null):r=n,ge(Os,Dt),Dt|=r;return yt(t,e,s,n),e.child}function Vv(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function hh(t,e,n,r,s){var i=Nt(n)?Yr:dt.current;return i=Ks(e,i),Fs(e,s),n=Ed(t,e,n,r,i,s),r=Sd(),t!==null&&!Ct?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Mn(t,e,s)):(_e&&r&&dd(e),e.flags|=1,yt(t,e,n,s),e.child)}function bm(t,e,n,r,s){if(Nt(n)){var i=!0;dl(e)}else i=!1;if(Fs(e,s),e.stateNode===null)Bo(t,e),Lv(e,n,r),uh(e,n,r,s),r=!0;else if(t===null){var a=e.stateNode,l=e.memoizedProps;a.props=l;var u=a.context,d=n.contextType;typeof d=="object"&&d!==null?d=Kt(d):(d=Nt(n)?Yr:dt.current,d=Ks(e,d));var f=n.getDerivedStateFromProps,y=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function";y||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==r||u!==d)&&fm(e,a,r,d),Zn=!1;var v=e.memoizedState;a.state=v,yl(e,r,a,s),u=e.memoizedState,l!==r||v!==u||Tt.current||Zn?(typeof f=="function"&&(lh(e,n,f,r),u=e.memoizedState),(l=Zn||dm(e,n,l,r,v,u,d))?(y||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),a.props=r,a.state=u,a.context=d,r=l):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{a=e.stateNode,pv(t,e),l=e.memoizedProps,d=e.type===e.elementType?l:nn(e.type,l),a.props=d,y=e.pendingProps,v=a.context,u=n.contextType,typeof u=="object"&&u!==null?u=Kt(u):(u=Nt(n)?Yr:dt.current,u=Ks(e,u));var C=n.getDerivedStateFromProps;(f=typeof C=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==y||v!==u)&&fm(e,a,r,u),Zn=!1,v=e.memoizedState,a.state=v,yl(e,r,a,s);var A=e.memoizedState;l!==y||v!==A||Tt.current||Zn?(typeof C=="function"&&(lh(e,n,C,r),A=e.memoizedState),(d=Zn||dm(e,n,d,r,v,A,u)||!1)?(f||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,A,u),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,A,u)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=A),a.props=r,a.state=A,a.context=u,r=d):(typeof a.componentDidUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=1024),r=!1)}return dh(t,e,n,r,i,s)}function dh(t,e,n,r,s,i){Vv(t,e);var a=(e.flags&128)!==0;if(!r&&!a)return s&&sm(e,n,!1),Mn(t,e,i);r=e.stateNode,Qx.current=e;var l=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&a?(e.child=Ws(e,t.child,null,i),e.child=Ws(e,null,l,i)):yt(t,e,l,i),e.memoizedState=r.state,s&&sm(e,n,!0),e.child}function zv(t){var e=t.stateNode;e.pendingContext?rm(t,e.pendingContext,e.pendingContext!==e.context):e.context&&rm(t,e.context,!1),wd(t,e.containerInfo)}function wm(t,e,n,r,s){return Gs(),pd(s),e.flags|=256,yt(t,e,n,r),e.child}var fh={dehydrated:null,treeContext:null,retryLane:0};function ph(t){return{baseLanes:t,cachePool:null,transitions:null}}function $v(t,e,n){var r=e.pendingProps,s=Ie.current,i=!1,a=(e.flags&128)!==0,l;if((l=a)||(l=t!==null&&t.memoizedState===null?!1:(s&2)!==0),l?(i=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(s|=1),ge(Ie,s&1),t===null)return ah(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=r.children,t=r.fallback,i?(r=e.mode,i=e.child,a={mode:"hidden",children:a},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=a):i=Zl(a,r,0,null),t=Wr(t,r,n,null),i.return=e,t.return=e,i.sibling=t,e.child=i,e.child.memoizedState=ph(n),e.memoizedState=fh,t):Td(e,a));if(s=t.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return Xx(t,e,a,r,l,s,n);if(i){i=r.fallback,a=e.mode,s=t.child,l=s.sibling;var u={mode:"hidden",children:r.children};return!(a&1)&&e.child!==s?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=gr(s,u),r.subtreeFlags=s.subtreeFlags&14680064),l!==null?i=gr(l,i):(i=Wr(i,a,n,null),i.flags|=2),i.return=e,r.return=e,r.sibling=i,e.child=r,r=i,i=e.child,a=t.child.memoizedState,a=a===null?ph(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},i.memoizedState=a,i.childLanes=t.childLanes&~n,e.memoizedState=fh,r}return i=t.child,t=i.sibling,r=gr(i,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function Td(t,e){return e=Zl({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Eo(t,e,n,r){return r!==null&&pd(r),Ws(e,t.child,null,n),t=Td(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Xx(t,e,n,r,s,i,a){if(n)return e.flags&256?(e.flags&=-257,r=dc(Error(j(422))),Eo(t,e,a,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(i=r.fallback,s=e.mode,r=Zl({mode:"visible",children:r.children},s,0,null),i=Wr(i,s,a,null),i.flags|=2,r.return=e,i.return=e,r.sibling=i,e.child=r,e.mode&1&&Ws(e,t.child,null,a),e.child.memoizedState=ph(a),e.memoizedState=fh,i);if(!(e.mode&1))return Eo(t,e,a,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var l=r.dgst;return r=l,i=Error(j(419)),r=dc(i,r,void 0),Eo(t,e,a,r)}if(l=(a&t.childLanes)!==0,Ct||l){if(r=Ke,r!==null){switch(a&-a){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|a)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,Ln(t,s),on(r,t,s,-1))}return Dd(),r=dc(Error(j(421))),Eo(t,e,a,r)}return s.data==="$?"?(e.flags|=128,e.child=t.child,e=uk.bind(null,t),s._reactRetry=e,null):(t=i.treeContext,Lt=dr(s.nextSibling),jt=e,_e=!0,sn=null,t!==null&&($t[Bt++]=In,$t[Bt++]=Cn,$t[Bt++]=Jr,In=t.id,Cn=t.overflow,Jr=e),e=Td(e,r.children),e.flags|=4096,e)}function xm(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),oh(t.return,e,n)}function fc(t,e,n,r,s){var i=t.memoizedState;i===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function Bv(t,e,n){var r=e.pendingProps,s=r.revealOrder,i=r.tail;if(yt(t,e,r.children,n),r=Ie.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&xm(t,n,e);else if(t.tag===19)xm(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(ge(Ie,r),!(e.mode&1))e.memoizedState=null;else switch(s){case"forwards":for(n=e.child,s=null;n!==null;)t=n.alternate,t!==null&&vl(t)===null&&(s=n),n=n.sibling;n=s,n===null?(s=e.child,e.child=null):(s=n.sibling,n.sibling=null),fc(e,!1,s,n,i);break;case"backwards":for(n=null,s=e.child,e.child=null;s!==null;){if(t=s.alternate,t!==null&&vl(t)===null){e.child=s;break}t=s.sibling,s.sibling=n,n=s,s=t}fc(e,!0,n,null,i);break;case"together":fc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Bo(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Mn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),es|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(j(153));if(e.child!==null){for(t=e.child,n=gr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=gr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Yx(t,e,n){switch(e.tag){case 3:zv(e),Gs();break;case 5:mv(e);break;case 1:Nt(e.type)&&dl(e);break;case 4:wd(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,s=e.memoizedProps.value;ge(ml,r._currentValue),r._currentValue=s;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(ge(Ie,Ie.current&1),e.flags|=128,null):n&e.child.childLanes?$v(t,e,n):(ge(Ie,Ie.current&1),t=Mn(t,e,n),t!==null?t.sibling:null);ge(Ie,Ie.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return Bv(t,e,n);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),ge(Ie,Ie.current),r)break;return null;case 22:case 23:return e.lanes=0,Fv(t,e,n)}return Mn(t,e,n)}var qv,mh,Hv,Kv;qv=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};mh=function(){};Hv=function(t,e,n,r){var s=t.memoizedProps;if(s!==r){t=e.stateNode,Hr(pn.current);var i=null;switch(n){case"input":s=jc(t,s),r=jc(t,r),i=[];break;case"select":s=Te({},s,{value:void 0}),r=Te({},r,{value:void 0}),i=[];break;case"textarea":s=Vc(t,s),r=Vc(t,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=cl)}$c(n,r);var a;n=null;for(d in s)if(!r.hasOwnProperty(d)&&s.hasOwnProperty(d)&&s[d]!=null)if(d==="style"){var l=s[d];for(a in l)l.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(sa.hasOwnProperty(d)?i||(i=[]):(i=i||[]).push(d,null));for(d in r){var u=r[d];if(l=s!=null?s[d]:void 0,r.hasOwnProperty(d)&&u!==l&&(u!=null||l!=null))if(d==="style")if(l){for(a in l)!l.hasOwnProperty(a)||u&&u.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in u)u.hasOwnProperty(a)&&l[a]!==u[a]&&(n||(n={}),n[a]=u[a])}else n||(i||(i=[]),i.push(d,n)),n=u;else d==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(i=i||[]).push(d,u)):d==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(d,""+u):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(sa.hasOwnProperty(d)?(u!=null&&d==="onScroll"&&xe("scroll",t),i||l===u||(i=[])):(i=i||[]).push(d,u))}n&&(i=i||[]).push("style",n);var d=i;(e.updateQueue=d)&&(e.flags|=4)}};Kv=function(t,e,n,r){n!==r&&(e.flags|=4)};function Ri(t,e){if(!_e)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function at(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=t,s=s.sibling;else for(s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=t,s=s.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function Jx(t,e,n){var r=e.pendingProps;switch(fd(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return at(e),null;case 1:return Nt(e.type)&&hl(),at(e),null;case 3:return r=e.stateNode,Qs(),ke(Tt),ke(dt),kd(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(ko(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,sn!==null&&(kh(sn),sn=null))),mh(t,e),at(e),null;case 5:xd(e);var s=Hr(ga.current);if(n=e.type,t!==null&&e.stateNode!=null)Hv(t,e,n,r,s),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(j(166));return at(e),null}if(t=Hr(pn.current),ko(e)){r=e.stateNode,n=e.type;var i=e.memoizedProps;switch(r[dn]=e,r[pa]=i,t=(e.mode&1)!==0,n){case"dialog":xe("cancel",r),xe("close",r);break;case"iframe":case"object":case"embed":xe("load",r);break;case"video":case"audio":for(s=0;s<Fi.length;s++)xe(Fi[s],r);break;case"source":xe("error",r);break;case"img":case"image":case"link":xe("error",r),xe("load",r);break;case"details":xe("toggle",r);break;case"input":Ap(r,i),xe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},xe("invalid",r);break;case"textarea":Rp(r,i),xe("invalid",r)}$c(n,i),s=null;for(var a in i)if(i.hasOwnProperty(a)){var l=i[a];a==="children"?typeof l=="string"?r.textContent!==l&&(i.suppressHydrationWarning!==!0&&xo(r.textContent,l,t),s=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&xo(r.textContent,l,t),s=["children",""+l]):sa.hasOwnProperty(a)&&l!=null&&a==="onScroll"&&xe("scroll",r)}switch(n){case"input":fo(r),Pp(r,i,!0);break;case"textarea":fo(r),Op(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=cl)}r=s,e.updateQueue=r,r!==null&&(e.flags|=4)}else{a=s.nodeType===9?s:s.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=wy(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=a.createElement(n,{is:r.is}):(t=a.createElement(n),n==="select"&&(a=t,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):t=a.createElementNS(t,n),t[dn]=e,t[pa]=r,qv(t,e,!1,!1),e.stateNode=t;e:{switch(a=Bc(n,r),n){case"dialog":xe("cancel",t),xe("close",t),s=r;break;case"iframe":case"object":case"embed":xe("load",t),s=r;break;case"video":case"audio":for(s=0;s<Fi.length;s++)xe(Fi[s],t);s=r;break;case"source":xe("error",t),s=r;break;case"img":case"image":case"link":xe("error",t),xe("load",t),s=r;break;case"details":xe("toggle",t),s=r;break;case"input":Ap(t,r),s=jc(t,r),xe("invalid",t);break;case"option":s=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},s=Te({},r,{value:void 0}),xe("invalid",t);break;case"textarea":Rp(t,r),s=Vc(t,r),xe("invalid",t);break;default:s=r}$c(n,s),l=s;for(i in l)if(l.hasOwnProperty(i)){var u=l[i];i==="style"?_y(t,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&xy(t,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&ia(t,u):typeof u=="number"&&ia(t,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(sa.hasOwnProperty(i)?u!=null&&i==="onScroll"&&xe("scroll",t):u!=null&&Jh(t,i,u,a))}switch(n){case"input":fo(t),Pp(t,r,!1);break;case"textarea":fo(t),Op(t);break;case"option":r.value!=null&&t.setAttribute("value",""+kr(r.value));break;case"select":t.multiple=!!r.multiple,i=r.value,i!=null?Ls(t,!!r.multiple,i,!1):r.defaultValue!=null&&Ls(t,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(t.onclick=cl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return at(e),null;case 6:if(t&&e.stateNode!=null)Kv(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(j(166));if(n=Hr(ga.current),Hr(pn.current),ko(e)){if(r=e.stateNode,n=e.memoizedProps,r[dn]=e,(i=r.nodeValue!==n)&&(t=jt,t!==null))switch(t.tag){case 3:xo(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&xo(r.nodeValue,n,(t.mode&1)!==0)}i&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[dn]=e,e.stateNode=r}return at(e),null;case 13:if(ke(Ie),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(_e&&Lt!==null&&e.mode&1&&!(e.flags&128))cv(),Gs(),e.flags|=98560,i=!1;else if(i=ko(e),r!==null&&r.dehydrated!==null){if(t===null){if(!i)throw Error(j(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(j(317));i[dn]=e}else Gs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;at(e),i=!1}else sn!==null&&(kh(sn),sn=null),i=!0;if(!i)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||Ie.current&1?Ve===0&&(Ve=3):Dd())),e.updateQueue!==null&&(e.flags|=4),at(e),null);case 4:return Qs(),mh(t,e),t===null&&da(e.stateNode.containerInfo),at(e),null;case 10:return yd(e.type._context),at(e),null;case 17:return Nt(e.type)&&hl(),at(e),null;case 19:if(ke(Ie),i=e.memoizedState,i===null)return at(e),null;if(r=(e.flags&128)!==0,a=i.rendering,a===null)if(r)Ri(i,!1);else{if(Ve!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=vl(t),a!==null){for(e.flags|=128,Ri(i,!1),r=a.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)i=n,t=r,i.flags&=14680066,a=i.alternate,a===null?(i.childLanes=0,i.lanes=t,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=a.childLanes,i.lanes=a.lanes,i.child=a.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=a.memoizedProps,i.memoizedState=a.memoizedState,i.updateQueue=a.updateQueue,i.type=a.type,t=a.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ge(Ie,Ie.current&1|2),e.child}t=t.sibling}i.tail!==null&&Le()>Ys&&(e.flags|=128,r=!0,Ri(i,!1),e.lanes=4194304)}else{if(!r)if(t=vl(a),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Ri(i,!0),i.tail===null&&i.tailMode==="hidden"&&!a.alternate&&!_e)return at(e),null}else 2*Le()-i.renderingStartTime>Ys&&n!==1073741824&&(e.flags|=128,r=!0,Ri(i,!1),e.lanes=4194304);i.isBackwards?(a.sibling=e.child,e.child=a):(n=i.last,n!==null?n.sibling=a:e.child=a,i.last=a)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Le(),e.sibling=null,n=Ie.current,ge(Ie,r?n&1|2:n&1),e):(at(e),null);case 22:case 23:return Od(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Dt&1073741824&&(at(e),e.subtreeFlags&6&&(e.flags|=8192)):at(e),null;case 24:return null;case 25:return null}throw Error(j(156,e.tag))}function Zx(t,e){switch(fd(e),e.tag){case 1:return Nt(e.type)&&hl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Qs(),ke(Tt),ke(dt),kd(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return xd(e),null;case 13:if(ke(Ie),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(j(340));Gs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ke(Ie),null;case 4:return Qs(),null;case 10:return yd(e.type._context),null;case 22:case 23:return Od(),null;case 24:return null;default:return null}}var So=!1,ct=!1,ek=typeof WeakSet=="function"?WeakSet:Set,q=null;function Rs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Pe(t,e,r)}else n.current=null}function Gv(t,e,n){try{n()}catch(r){Pe(t,e,r)}}var km=!1;function tk(t,e){if(Zc=ol,t=Yy(),hd(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var a=0,l=-1,u=-1,d=0,f=0,y=t,v=null;t:for(;;){for(var C;y!==n||s!==0&&y.nodeType!==3||(l=a+s),y!==i||r!==0&&y.nodeType!==3||(u=a+r),y.nodeType===3&&(a+=y.nodeValue.length),(C=y.firstChild)!==null;)v=y,y=C;for(;;){if(y===t)break t;if(v===n&&++d===s&&(l=a),v===i&&++f===r&&(u=a),(C=y.nextSibling)!==null)break;y=v,v=y.parentNode}y=C}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(eh={focusedElem:t,selectionRange:n},ol=!1,q=e;q!==null;)if(e=q,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,q=t;else for(;q!==null;){e=q;try{var A=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(A!==null){var P=A.memoizedProps,M=A.memoizedState,E=e.stateNode,x=E.getSnapshotBeforeUpdate(e.elementType===e.type?P:nn(e.type,P),M);E.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var S=e.stateNode.containerInfo;S.nodeType===1?S.textContent="":S.nodeType===9&&S.documentElement&&S.removeChild(S.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(j(163))}}catch(O){Pe(e,e.return,O)}if(t=e.sibling,t!==null){t.return=e.return,q=t;break}q=e.return}return A=km,km=!1,A}function Xi(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&t)===t){var i=s.destroy;s.destroy=void 0,i!==void 0&&Gv(e,n,i)}s=s.next}while(s!==r)}}function Yl(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function gh(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Wv(t){var e=t.alternate;e!==null&&(t.alternate=null,Wv(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[dn],delete e[pa],delete e[rh],delete e[jx],delete e[Ux])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Qv(t){return t.tag===5||t.tag===3||t.tag===4}function _m(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Qv(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function yh(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=cl));else if(r!==4&&(t=t.child,t!==null))for(yh(t,e,n),t=t.sibling;t!==null;)yh(t,e,n),t=t.sibling}function vh(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(vh(t,e,n),t=t.sibling;t!==null;)vh(t,e,n),t=t.sibling}var Xe=null,rn=!1;function Xn(t,e,n){for(n=n.child;n!==null;)Xv(t,e,n),n=n.sibling}function Xv(t,e,n){if(fn&&typeof fn.onCommitFiberUnmount=="function")try{fn.onCommitFiberUnmount(Bl,n)}catch{}switch(n.tag){case 5:ct||Rs(n,e);case 6:var r=Xe,s=rn;Xe=null,Xn(t,e,n),Xe=r,rn=s,Xe!==null&&(rn?(t=Xe,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Xe.removeChild(n.stateNode));break;case 18:Xe!==null&&(rn?(t=Xe,n=n.stateNode,t.nodeType===8?ac(t.parentNode,n):t.nodeType===1&&ac(t,n),ua(t)):ac(Xe,n.stateNode));break;case 4:r=Xe,s=rn,Xe=n.stateNode.containerInfo,rn=!0,Xn(t,e,n),Xe=r,rn=s;break;case 0:case 11:case 14:case 15:if(!ct&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,a=i.destroy;i=i.tag,a!==void 0&&(i&2||i&4)&&Gv(n,e,a),s=s.next}while(s!==r)}Xn(t,e,n);break;case 1:if(!ct&&(Rs(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Pe(n,e,l)}Xn(t,e,n);break;case 21:Xn(t,e,n);break;case 22:n.mode&1?(ct=(r=ct)||n.memoizedState!==null,Xn(t,e,n),ct=r):Xn(t,e,n);break;default:Xn(t,e,n)}}function Em(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new ek),e.forEach(function(r){var s=ck.bind(null,t,r);n.has(r)||(n.add(r),r.then(s,s))})}}function tn(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=t,a=e,l=a;e:for(;l!==null;){switch(l.tag){case 5:Xe=l.stateNode,rn=!1;break e;case 3:Xe=l.stateNode.containerInfo,rn=!0;break e;case 4:Xe=l.stateNode.containerInfo,rn=!0;break e}l=l.return}if(Xe===null)throw Error(j(160));Xv(i,a,s),Xe=null,rn=!1;var u=s.alternate;u!==null&&(u.return=null),s.return=null}catch(d){Pe(s,e,d)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Yv(e,t),e=e.sibling}function Yv(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(tn(e,t),cn(t),r&4){try{Xi(3,t,t.return),Yl(3,t)}catch(P){Pe(t,t.return,P)}try{Xi(5,t,t.return)}catch(P){Pe(t,t.return,P)}}break;case 1:tn(e,t),cn(t),r&512&&n!==null&&Rs(n,n.return);break;case 5:if(tn(e,t),cn(t),r&512&&n!==null&&Rs(n,n.return),t.flags&32){var s=t.stateNode;try{ia(s,"")}catch(P){Pe(t,t.return,P)}}if(r&4&&(s=t.stateNode,s!=null)){var i=t.memoizedProps,a=n!==null?n.memoizedProps:i,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&vy(s,i),Bc(l,a);var d=Bc(l,i);for(a=0;a<u.length;a+=2){var f=u[a],y=u[a+1];f==="style"?_y(s,y):f==="dangerouslySetInnerHTML"?xy(s,y):f==="children"?ia(s,y):Jh(s,f,y,d)}switch(l){case"input":Uc(s,i);break;case"textarea":by(s,i);break;case"select":var v=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var C=i.value;C!=null?Ls(s,!!i.multiple,C,!1):v!==!!i.multiple&&(i.defaultValue!=null?Ls(s,!!i.multiple,i.defaultValue,!0):Ls(s,!!i.multiple,i.multiple?[]:"",!1))}s[pa]=i}catch(P){Pe(t,t.return,P)}}break;case 6:if(tn(e,t),cn(t),r&4){if(t.stateNode===null)throw Error(j(162));s=t.stateNode,i=t.memoizedProps;try{s.nodeValue=i}catch(P){Pe(t,t.return,P)}}break;case 3:if(tn(e,t),cn(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ua(e.containerInfo)}catch(P){Pe(t,t.return,P)}break;case 4:tn(e,t),cn(t);break;case 13:tn(e,t),cn(t),s=t.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(Pd=Le())),r&4&&Em(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(ct=(d=ct)||f,tn(e,t),ct=d):tn(e,t),cn(t),r&8192){if(d=t.memoizedState!==null,(t.stateNode.isHidden=d)&&!f&&t.mode&1)for(q=t,f=t.child;f!==null;){for(y=q=f;q!==null;){switch(v=q,C=v.child,v.tag){case 0:case 11:case 14:case 15:Xi(4,v,v.return);break;case 1:Rs(v,v.return);var A=v.stateNode;if(typeof A.componentWillUnmount=="function"){r=v,n=v.return;try{e=r,A.props=e.memoizedProps,A.state=e.memoizedState,A.componentWillUnmount()}catch(P){Pe(r,n,P)}}break;case 5:Rs(v,v.return);break;case 22:if(v.memoizedState!==null){Im(y);continue}}C!==null?(C.return=v,q=C):Im(y)}f=f.sibling}e:for(f=null,y=t;;){if(y.tag===5){if(f===null){f=y;try{s=y.stateNode,d?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=y.stateNode,u=y.memoizedProps.style,a=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=ky("display",a))}catch(P){Pe(t,t.return,P)}}}else if(y.tag===6){if(f===null)try{y.stateNode.nodeValue=d?"":y.memoizedProps}catch(P){Pe(t,t.return,P)}}else if((y.tag!==22&&y.tag!==23||y.memoizedState===null||y===t)&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===t)break e;for(;y.sibling===null;){if(y.return===null||y.return===t)break e;f===y&&(f=null),y=y.return}f===y&&(f=null),y.sibling.return=y.return,y=y.sibling}}break;case 19:tn(e,t),cn(t),r&4&&Em(t);break;case 21:break;default:tn(e,t),cn(t)}}function cn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Qv(n)){var r=n;break e}n=n.return}throw Error(j(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(ia(s,""),r.flags&=-33);var i=_m(t);vh(t,i,s);break;case 3:case 4:var a=r.stateNode.containerInfo,l=_m(t);yh(t,l,a);break;default:throw Error(j(161))}}catch(u){Pe(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function nk(t,e,n){q=t,Jv(t)}function Jv(t,e,n){for(var r=(t.mode&1)!==0;q!==null;){var s=q,i=s.child;if(s.tag===22&&r){var a=s.memoizedState!==null||So;if(!a){var l=s.alternate,u=l!==null&&l.memoizedState!==null||ct;l=So;var d=ct;if(So=a,(ct=u)&&!d)for(q=s;q!==null;)a=q,u=a.child,a.tag===22&&a.memoizedState!==null?Cm(s):u!==null?(u.return=a,q=u):Cm(s);for(;i!==null;)q=i,Jv(i),i=i.sibling;q=s,So=l,ct=d}Sm(t)}else s.subtreeFlags&8772&&i!==null?(i.return=s,q=i):Sm(t)}}function Sm(t){for(;q!==null;){var e=q;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:ct||Yl(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!ct)if(n===null)r.componentDidMount();else{var s=e.elementType===e.type?n.memoizedProps:nn(e.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&um(e,i,r);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}um(e,a,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var d=e.alternate;if(d!==null){var f=d.memoizedState;if(f!==null){var y=f.dehydrated;y!==null&&ua(y)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(j(163))}ct||e.flags&512&&gh(e)}catch(v){Pe(e,e.return,v)}}if(e===t){q=null;break}if(n=e.sibling,n!==null){n.return=e.return,q=n;break}q=e.return}}function Im(t){for(;q!==null;){var e=q;if(e===t){q=null;break}var n=e.sibling;if(n!==null){n.return=e.return,q=n;break}q=e.return}}function Cm(t){for(;q!==null;){var e=q;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Yl(4,e)}catch(u){Pe(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var s=e.return;try{r.componentDidMount()}catch(u){Pe(e,s,u)}}var i=e.return;try{gh(e)}catch(u){Pe(e,i,u)}break;case 5:var a=e.return;try{gh(e)}catch(u){Pe(e,a,u)}}}catch(u){Pe(e,e.return,u)}if(e===t){q=null;break}var l=e.sibling;if(l!==null){l.return=e.return,q=l;break}q=e.return}}var rk=Math.ceil,xl=$n.ReactCurrentDispatcher,Nd=$n.ReactCurrentOwner,Ht=$n.ReactCurrentBatchConfig,ue=0,Ke=null,je=null,Ze=0,Dt=0,Os=Ar(0),Ve=0,wa=null,es=0,Jl=0,Ad=0,Yi=null,St=null,Pd=0,Ys=1/0,En=null,kl=!1,bh=null,pr=null,Io=!1,or=null,_l=0,Ji=0,wh=null,qo=-1,Ho=0;function vt(){return ue&6?Le():qo!==-1?qo:qo=Le()}function mr(t){return t.mode&1?ue&2&&Ze!==0?Ze&-Ze:Vx.transition!==null?(Ho===0&&(Ho=Ly()),Ho):(t=pe,t!==0||(t=window.event,t=t===void 0?16:$y(t.type)),t):1}function on(t,e,n,r){if(50<Ji)throw Ji=0,wh=null,Error(j(185));Pa(t,n,r),(!(ue&2)||t!==Ke)&&(t===Ke&&(!(ue&2)&&(Jl|=n),Ve===4&&tr(t,Ze)),At(t,r),n===1&&ue===0&&!(e.mode&1)&&(Ys=Le()+500,Wl&&Pr()))}function At(t,e){var n=t.callbackNode;V1(t,e);var r=al(t,t===Ke?Ze:0);if(r===0)n!==null&&Mp(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Mp(n),e===1)t.tag===0?Fx(Tm.bind(null,t)):ov(Tm.bind(null,t)),Lx(function(){!(ue&6)&&Pr()}),n=null;else{switch(My(r)){case 1:n=rd;break;case 4:n=Oy;break;case 16:n=il;break;case 536870912:n=Dy;break;default:n=il}n=a0(n,Zv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Zv(t,e){if(qo=-1,Ho=0,ue&6)throw Error(j(327));var n=t.callbackNode;if(Vs()&&t.callbackNode!==n)return null;var r=al(t,t===Ke?Ze:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=El(t,r);else{e=r;var s=ue;ue|=2;var i=t0();(Ke!==t||Ze!==e)&&(En=null,Ys=Le()+500,Gr(t,e));do try{ak();break}catch(l){e0(t,l)}while(!0);gd(),xl.current=i,ue=s,je!==null?e=0:(Ke=null,Ze=0,e=Ve)}if(e!==0){if(e===2&&(s=Wc(t),s!==0&&(r=s,e=xh(t,s))),e===1)throw n=wa,Gr(t,0),tr(t,r),At(t,Le()),n;if(e===6)tr(t,r);else{if(s=t.current.alternate,!(r&30)&&!sk(s)&&(e=El(t,r),e===2&&(i=Wc(t),i!==0&&(r=i,e=xh(t,i))),e===1))throw n=wa,Gr(t,0),tr(t,r),At(t,Le()),n;switch(t.finishedWork=s,t.finishedLanes=r,e){case 0:case 1:throw Error(j(345));case 2:zr(t,St,En);break;case 3:if(tr(t,r),(r&130023424)===r&&(e=Pd+500-Le(),10<e)){if(al(t,0)!==0)break;if(s=t.suspendedLanes,(s&r)!==r){vt(),t.pingedLanes|=t.suspendedLanes&s;break}t.timeoutHandle=nh(zr.bind(null,t,St,En),e);break}zr(t,St,En);break;case 4:if(tr(t,r),(r&4194240)===r)break;for(e=t.eventTimes,s=-1;0<r;){var a=31-an(r);i=1<<a,a=e[a],a>s&&(s=a),r&=~i}if(r=s,r=Le()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*rk(r/1960))-r,10<r){t.timeoutHandle=nh(zr.bind(null,t,St,En),r);break}zr(t,St,En);break;case 5:zr(t,St,En);break;default:throw Error(j(329))}}}return At(t,Le()),t.callbackNode===n?Zv.bind(null,t):null}function xh(t,e){var n=Yi;return t.current.memoizedState.isDehydrated&&(Gr(t,e).flags|=256),t=El(t,e),t!==2&&(e=St,St=n,e!==null&&kh(e)),t}function kh(t){St===null?St=t:St.push.apply(St,t)}function sk(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!un(i(),s))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function tr(t,e){for(e&=~Ad,e&=~Jl,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-an(e),r=1<<n;t[n]=-1,e&=~r}}function Tm(t){if(ue&6)throw Error(j(327));Vs();var e=al(t,0);if(!(e&1))return At(t,Le()),null;var n=El(t,e);if(t.tag!==0&&n===2){var r=Wc(t);r!==0&&(e=r,n=xh(t,r))}if(n===1)throw n=wa,Gr(t,0),tr(t,e),At(t,Le()),n;if(n===6)throw Error(j(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,zr(t,St,En),At(t,Le()),null}function Rd(t,e){var n=ue;ue|=1;try{return t(e)}finally{ue=n,ue===0&&(Ys=Le()+500,Wl&&Pr())}}function ts(t){or!==null&&or.tag===0&&!(ue&6)&&Vs();var e=ue;ue|=1;var n=Ht.transition,r=pe;try{if(Ht.transition=null,pe=1,t)return t()}finally{pe=r,Ht.transition=n,ue=e,!(ue&6)&&Pr()}}function Od(){Dt=Os.current,ke(Os)}function Gr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Dx(n)),je!==null)for(n=je.return;n!==null;){var r=n;switch(fd(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&hl();break;case 3:Qs(),ke(Tt),ke(dt),kd();break;case 5:xd(r);break;case 4:Qs();break;case 13:ke(Ie);break;case 19:ke(Ie);break;case 10:yd(r.type._context);break;case 22:case 23:Od()}n=n.return}if(Ke=t,je=t=gr(t.current,null),Ze=Dt=e,Ve=0,wa=null,Ad=Jl=es=0,St=Yi=null,qr!==null){for(e=0;e<qr.length;e++)if(n=qr[e],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var a=i.next;i.next=s,r.next=a}n.pending=r}qr=null}return t}function e0(t,e){do{var n=je;try{if(gd(),zo.current=wl,bl){for(var r=Ce.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}bl=!1}if(Zr=0,He=Ue=Ce=null,Qi=!1,ya=0,Nd.current=null,n===null||n.return===null){Ve=1,wa=e,je=null;break}e:{var i=t,a=n.return,l=n,u=e;if(e=Ze,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var d=u,f=l,y=f.tag;if(!(f.mode&1)&&(y===0||y===11||y===15)){var v=f.alternate;v?(f.updateQueue=v.updateQueue,f.memoizedState=v.memoizedState,f.lanes=v.lanes):(f.updateQueue=null,f.memoizedState=null)}var C=mm(a);if(C!==null){C.flags&=-257,gm(C,a,l,i,e),C.mode&1&&pm(i,d,e),e=C,u=d;var A=e.updateQueue;if(A===null){var P=new Set;P.add(u),e.updateQueue=P}else A.add(u);break e}else{if(!(e&1)){pm(i,d,e),Dd();break e}u=Error(j(426))}}else if(_e&&l.mode&1){var M=mm(a);if(M!==null){!(M.flags&65536)&&(M.flags|=256),gm(M,a,l,i,e),pd(Xs(u,l));break e}}i=u=Xs(u,l),Ve!==4&&(Ve=2),Yi===null?Yi=[i]:Yi.push(i),i=a;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var E=Mv(i,u,e);lm(i,E);break e;case 1:l=u;var x=i.type,S=i.stateNode;if(!(i.flags&128)&&(typeof x.getDerivedStateFromError=="function"||S!==null&&typeof S.componentDidCatch=="function"&&(pr===null||!pr.has(S)))){i.flags|=65536,e&=-e,i.lanes|=e;var O=jv(i,l,e);lm(i,O);break e}}i=i.return}while(i!==null)}r0(n)}catch(V){e=V,je===n&&n!==null&&(je=n=n.return);continue}break}while(!0)}function t0(){var t=xl.current;return xl.current=wl,t===null?wl:t}function Dd(){(Ve===0||Ve===3||Ve===2)&&(Ve=4),Ke===null||!(es&268435455)&&!(Jl&268435455)||tr(Ke,Ze)}function El(t,e){var n=ue;ue|=2;var r=t0();(Ke!==t||Ze!==e)&&(En=null,Gr(t,e));do try{ik();break}catch(s){e0(t,s)}while(!0);if(gd(),ue=n,xl.current=r,je!==null)throw Error(j(261));return Ke=null,Ze=0,Ve}function ik(){for(;je!==null;)n0(je)}function ak(){for(;je!==null&&!P1();)n0(je)}function n0(t){var e=i0(t.alternate,t,Dt);t.memoizedProps=t.pendingProps,e===null?r0(t):je=e,Nd.current=null}function r0(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=Zx(n,e),n!==null){n.flags&=32767,je=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ve=6,je=null;return}}else if(n=Jx(n,e,Dt),n!==null){je=n;return}if(e=e.sibling,e!==null){je=e;return}je=e=t}while(e!==null);Ve===0&&(Ve=5)}function zr(t,e,n){var r=pe,s=Ht.transition;try{Ht.transition=null,pe=1,ok(t,e,n,r)}finally{Ht.transition=s,pe=r}return null}function ok(t,e,n,r){do Vs();while(or!==null);if(ue&6)throw Error(j(327));n=t.finishedWork;var s=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(j(177));t.callbackNode=null,t.callbackPriority=0;var i=n.lanes|n.childLanes;if(z1(t,i),t===Ke&&(je=Ke=null,Ze=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Io||(Io=!0,a0(il,function(){return Vs(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Ht.transition,Ht.transition=null;var a=pe;pe=1;var l=ue;ue|=4,Nd.current=null,tk(t,n),Yv(n,t),Cx(eh),ol=!!Zc,eh=Zc=null,t.current=n,nk(n),R1(),ue=l,pe=a,Ht.transition=i}else t.current=n;if(Io&&(Io=!1,or=t,_l=s),i=t.pendingLanes,i===0&&(pr=null),L1(n.stateNode),At(t,Le()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)s=e[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(kl)throw kl=!1,t=bh,bh=null,t;return _l&1&&t.tag!==0&&Vs(),i=t.pendingLanes,i&1?t===wh?Ji++:(Ji=0,wh=t):Ji=0,Pr(),null}function Vs(){if(or!==null){var t=My(_l),e=Ht.transition,n=pe;try{if(Ht.transition=null,pe=16>t?16:t,or===null)var r=!1;else{if(t=or,or=null,_l=0,ue&6)throw Error(j(331));var s=ue;for(ue|=4,q=t.current;q!==null;){var i=q,a=i.child;if(q.flags&16){var l=i.deletions;if(l!==null){for(var u=0;u<l.length;u++){var d=l[u];for(q=d;q!==null;){var f=q;switch(f.tag){case 0:case 11:case 15:Xi(8,f,i)}var y=f.child;if(y!==null)y.return=f,q=y;else for(;q!==null;){f=q;var v=f.sibling,C=f.return;if(Wv(f),f===d){q=null;break}if(v!==null){v.return=C,q=v;break}q=C}}}var A=i.alternate;if(A!==null){var P=A.child;if(P!==null){A.child=null;do{var M=P.sibling;P.sibling=null,P=M}while(P!==null)}}q=i}}if(i.subtreeFlags&2064&&a!==null)a.return=i,q=a;else e:for(;q!==null;){if(i=q,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Xi(9,i,i.return)}var E=i.sibling;if(E!==null){E.return=i.return,q=E;break e}q=i.return}}var x=t.current;for(q=x;q!==null;){a=q;var S=a.child;if(a.subtreeFlags&2064&&S!==null)S.return=a,q=S;else e:for(a=x;q!==null;){if(l=q,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Yl(9,l)}}catch(V){Pe(l,l.return,V)}if(l===a){q=null;break e}var O=l.sibling;if(O!==null){O.return=l.return,q=O;break e}q=l.return}}if(ue=s,Pr(),fn&&typeof fn.onPostCommitFiberRoot=="function")try{fn.onPostCommitFiberRoot(Bl,t)}catch{}r=!0}return r}finally{pe=n,Ht.transition=e}}return!1}function Nm(t,e,n){e=Xs(n,e),e=Mv(t,e,1),t=fr(t,e,1),e=vt(),t!==null&&(Pa(t,1,e),At(t,e))}function Pe(t,e,n){if(t.tag===3)Nm(t,t,n);else for(;e!==null;){if(e.tag===3){Nm(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(pr===null||!pr.has(r))){t=Xs(n,t),t=jv(e,t,1),e=fr(e,t,1),t=vt(),e!==null&&(Pa(e,1,t),At(e,t));break}}e=e.return}}function lk(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=vt(),t.pingedLanes|=t.suspendedLanes&n,Ke===t&&(Ze&n)===n&&(Ve===4||Ve===3&&(Ze&130023424)===Ze&&500>Le()-Pd?Gr(t,0):Ad|=n),At(t,e)}function s0(t,e){e===0&&(t.mode&1?(e=go,go<<=1,!(go&130023424)&&(go=4194304)):e=1);var n=vt();t=Ln(t,e),t!==null&&(Pa(t,e,n),At(t,n))}function uk(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),s0(t,n)}function ck(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,s=t.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(j(314))}r!==null&&r.delete(e),s0(t,n)}var i0;i0=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Tt.current)Ct=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Ct=!1,Yx(t,e,n);Ct=!!(t.flags&131072)}else Ct=!1,_e&&e.flags&1048576&&lv(e,pl,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Bo(t,e),t=e.pendingProps;var s=Ks(e,dt.current);Fs(e,n),s=Ed(null,e,r,t,s,n);var i=Sd();return e.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Nt(r)?(i=!0,dl(e)):i=!1,e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,bd(e),s.updater=Xl,e.stateNode=s,s._reactInternals=e,uh(e,r,t,n),e=dh(null,e,r,!0,i,n)):(e.tag=0,_e&&i&&dd(e),yt(null,e,s,n),e=e.child),e;case 16:r=e.elementType;e:{switch(Bo(t,e),t=e.pendingProps,s=r._init,r=s(r._payload),e.type=r,s=e.tag=dk(r),t=nn(r,t),s){case 0:e=hh(null,e,r,t,n);break e;case 1:e=bm(null,e,r,t,n);break e;case 11:e=ym(null,e,r,t,n);break e;case 14:e=vm(null,e,r,nn(r.type,t),n);break e}throw Error(j(306,r,""))}return e;case 0:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:nn(r,s),hh(t,e,r,s,n);case 1:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:nn(r,s),bm(t,e,r,s,n);case 3:e:{if(zv(e),t===null)throw Error(j(387));r=e.pendingProps,i=e.memoizedState,s=i.element,pv(t,e),yl(e,r,null,n);var a=e.memoizedState;if(r=a.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){s=Xs(Error(j(423)),e),e=wm(t,e,r,n,s);break e}else if(r!==s){s=Xs(Error(j(424)),e),e=wm(t,e,r,n,s);break e}else for(Lt=dr(e.stateNode.containerInfo.firstChild),jt=e,_e=!0,sn=null,n=dv(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Gs(),r===s){e=Mn(t,e,n);break e}yt(t,e,r,n)}e=e.child}return e;case 5:return mv(e),t===null&&ah(e),r=e.type,s=e.pendingProps,i=t!==null?t.memoizedProps:null,a=s.children,th(r,s)?a=null:i!==null&&th(r,i)&&(e.flags|=32),Vv(t,e),yt(t,e,a,n),e.child;case 6:return t===null&&ah(e),null;case 13:return $v(t,e,n);case 4:return wd(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Ws(e,null,r,n):yt(t,e,r,n),e.child;case 11:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:nn(r,s),ym(t,e,r,s,n);case 7:return yt(t,e,e.pendingProps,n),e.child;case 8:return yt(t,e,e.pendingProps.children,n),e.child;case 12:return yt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,s=e.pendingProps,i=e.memoizedProps,a=s.value,ge(ml,r._currentValue),r._currentValue=a,i!==null)if(un(i.value,a)){if(i.children===s.children&&!Tt.current){e=Mn(t,e,n);break e}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var l=i.dependencies;if(l!==null){a=i.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=Rn(-1,n&-n),u.tag=2;var d=i.updateQueue;if(d!==null){d=d.shared;var f=d.pending;f===null?u.next=u:(u.next=f.next,f.next=u),d.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),oh(i.return,n,e),l.lanes|=n;break}u=u.next}}else if(i.tag===10)a=i.type===e.type?null:i.child;else if(i.tag===18){if(a=i.return,a===null)throw Error(j(341));a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),oh(a,n,e),a=i.sibling}else a=i.child;if(a!==null)a.return=i;else for(a=i;a!==null;){if(a===e){a=null;break}if(i=a.sibling,i!==null){i.return=a.return,a=i;break}a=a.return}i=a}yt(t,e,s.children,n),e=e.child}return e;case 9:return s=e.type,r=e.pendingProps.children,Fs(e,n),s=Kt(s),r=r(s),e.flags|=1,yt(t,e,r,n),e.child;case 14:return r=e.type,s=nn(r,e.pendingProps),s=nn(r.type,s),vm(t,e,r,s,n);case 15:return Uv(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:nn(r,s),Bo(t,e),e.tag=1,Nt(r)?(t=!0,dl(e)):t=!1,Fs(e,n),Lv(e,r,s),uh(e,r,s,n),dh(null,e,r,!0,t,n);case 19:return Bv(t,e,n);case 22:return Fv(t,e,n)}throw Error(j(156,e.tag))};function a0(t,e){return Ry(t,e)}function hk(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function qt(t,e,n,r){return new hk(t,e,n,r)}function Ld(t){return t=t.prototype,!(!t||!t.isReactComponent)}function dk(t){if(typeof t=="function")return Ld(t)?1:0;if(t!=null){if(t=t.$$typeof,t===ed)return 11;if(t===td)return 14}return 2}function gr(t,e){var n=t.alternate;return n===null?(n=qt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Ko(t,e,n,r,s,i){var a=2;if(r=t,typeof t=="function")Ld(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case _s:return Wr(n.children,s,i,e);case Zh:a=8,s|=8;break;case Oc:return t=qt(12,n,e,s|2),t.elementType=Oc,t.lanes=i,t;case Dc:return t=qt(13,n,e,s),t.elementType=Dc,t.lanes=i,t;case Lc:return t=qt(19,n,e,s),t.elementType=Lc,t.lanes=i,t;case my:return Zl(n,s,i,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case fy:a=10;break e;case py:a=9;break e;case ed:a=11;break e;case td:a=14;break e;case Jn:a=16,r=null;break e}throw Error(j(130,t==null?t:typeof t,""))}return e=qt(a,n,e,s),e.elementType=t,e.type=r,e.lanes=i,e}function Wr(t,e,n,r){return t=qt(7,t,r,e),t.lanes=n,t}function Zl(t,e,n,r){return t=qt(22,t,r,e),t.elementType=my,t.lanes=n,t.stateNode={isHidden:!1},t}function pc(t,e,n){return t=qt(6,t,null,e),t.lanes=n,t}function mc(t,e,n){return e=qt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function fk(t,e,n,r,s){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Qu(0),this.expirationTimes=Qu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Qu(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Md(t,e,n,r,s,i,a,l,u){return t=new fk(t,e,n,l,u),e===1?(e=1,i===!0&&(e|=8)):e=0,i=qt(3,null,null,e),t.current=i,i.stateNode=t,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},bd(i),t}function pk(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ks,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function o0(t){if(!t)return _r;t=t._reactInternals;e:{if(ls(t)!==t||t.tag!==1)throw Error(j(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Nt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(j(171))}if(t.tag===1){var n=t.type;if(Nt(n))return av(t,n,e)}return e}function l0(t,e,n,r,s,i,a,l,u){return t=Md(n,r,!0,t,s,i,a,l,u),t.context=o0(null),n=t.current,r=vt(),s=mr(n),i=Rn(r,s),i.callback=e??null,fr(n,i,s),t.current.lanes=s,Pa(t,s,r),At(t,r),t}function eu(t,e,n,r){var s=e.current,i=vt(),a=mr(s);return n=o0(n),e.context===null?e.context=n:e.pendingContext=n,e=Rn(i,a),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=fr(s,e,a),t!==null&&(on(t,s,a,i),Vo(t,s,a)),a}function Sl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Am(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function jd(t,e){Am(t,e),(t=t.alternate)&&Am(t,e)}function mk(){return null}var u0=typeof reportError=="function"?reportError:function(t){console.error(t)};function Ud(t){this._internalRoot=t}tu.prototype.render=Ud.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(j(409));eu(t,e,null,null)};tu.prototype.unmount=Ud.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;ts(function(){eu(null,t,null,null)}),e[Dn]=null}};function tu(t){this._internalRoot=t}tu.prototype.unstable_scheduleHydration=function(t){if(t){var e=Fy();t={blockedOn:null,target:t,priority:e};for(var n=0;n<er.length&&e!==0&&e<er[n].priority;n++);er.splice(n,0,t),n===0&&zy(t)}};function Fd(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function nu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Pm(){}function gk(t,e,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var d=Sl(a);i.call(d)}}var a=l0(e,r,t,0,null,!1,!1,"",Pm);return t._reactRootContainer=a,t[Dn]=a.current,da(t.nodeType===8?t.parentNode:t),ts(),a}for(;s=t.lastChild;)t.removeChild(s);if(typeof r=="function"){var l=r;r=function(){var d=Sl(u);l.call(d)}}var u=Md(t,0,!1,null,null,!1,!1,"",Pm);return t._reactRootContainer=u,t[Dn]=u.current,da(t.nodeType===8?t.parentNode:t),ts(function(){eu(e,u,n,r)}),u}function ru(t,e,n,r,s){var i=n._reactRootContainer;if(i){var a=i;if(typeof s=="function"){var l=s;s=function(){var u=Sl(a);l.call(u)}}eu(e,a,t,s)}else a=gk(n,e,t,s,r);return Sl(a)}jy=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Ui(e.pendingLanes);n!==0&&(sd(e,n|1),At(e,Le()),!(ue&6)&&(Ys=Le()+500,Pr()))}break;case 13:ts(function(){var r=Ln(t,1);if(r!==null){var s=vt();on(r,t,1,s)}}),jd(t,1)}};id=function(t){if(t.tag===13){var e=Ln(t,134217728);if(e!==null){var n=vt();on(e,t,134217728,n)}jd(t,134217728)}};Uy=function(t){if(t.tag===13){var e=mr(t),n=Ln(t,e);if(n!==null){var r=vt();on(n,t,e,r)}jd(t,e)}};Fy=function(){return pe};Vy=function(t,e){var n=pe;try{return pe=t,e()}finally{pe=n}};Hc=function(t,e,n){switch(e){case"input":if(Uc(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var s=Gl(r);if(!s)throw Error(j(90));yy(r),Uc(r,s)}}}break;case"textarea":by(t,n);break;case"select":e=n.value,e!=null&&Ls(t,!!n.multiple,e,!1)}};Iy=Rd;Cy=ts;var yk={usingClientEntryPoint:!1,Events:[Oa,Cs,Gl,Ey,Sy,Rd]},Oi={findFiberByHostInstance:Br,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},vk={bundleType:Oi.bundleType,version:Oi.version,rendererPackageName:Oi.rendererPackageName,rendererConfig:Oi.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:$n.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Ay(t),t===null?null:t.stateNode},findFiberByHostInstance:Oi.findFiberByHostInstance||mk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Co=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Co.isDisabled&&Co.supportsFiber)try{Bl=Co.inject(vk),fn=Co}catch{}}Ft.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=yk;Ft.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Fd(e))throw Error(j(200));return pk(t,e,null,n)};Ft.createRoot=function(t,e){if(!Fd(t))throw Error(j(299));var n=!1,r="",s=u0;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=Md(t,1,!1,null,null,n,!1,r,s),t[Dn]=e.current,da(t.nodeType===8?t.parentNode:t),new Ud(e)};Ft.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(j(188)):(t=Object.keys(t).join(","),Error(j(268,t)));return t=Ay(e),t=t===null?null:t.stateNode,t};Ft.flushSync=function(t){return ts(t)};Ft.hydrate=function(t,e,n){if(!nu(e))throw Error(j(200));return ru(null,t,e,!0,n)};Ft.hydrateRoot=function(t,e,n){if(!Fd(t))throw Error(j(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",a=u0;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=l0(e,null,t,1,n??null,s,!1,i,a),t[Dn]=e.current,da(t),r)for(t=0;t<r.length;t++)n=r[t],s=n._getVersion,s=s(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,s]:e.mutableSourceEagerHydrationData.push(n,s);return new tu(e)};Ft.render=function(t,e,n){if(!nu(e))throw Error(j(200));return ru(null,t,e,!1,n)};Ft.unmountComponentAtNode=function(t){if(!nu(t))throw Error(j(40));return t._reactRootContainer?(ts(function(){ru(null,null,t,!1,function(){t._reactRootContainer=null,t[Dn]=null})}),!0):!1};Ft.unstable_batchedUpdates=Rd;Ft.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!nu(n))throw Error(j(200));if(t==null||t._reactInternals===void 0)throw Error(j(38));return ru(t,e,n,!1,r)};Ft.version="18.3.1-next-f1338f8080-20240426";function c0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c0)}catch(t){console.error(t)}}c0(),uy.exports=Ft;var bk=uy.exports,Rm=bk;Pc.createRoot=Rm.createRoot,Pc.hydrateRoot=Rm.hydrateRoot;var Om={};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const h0=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},wk=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],a=t[n++],l=t[n++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=t[n++],a=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},d0={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],a=s+1<t.length,l=a?t[s+1]:0,u=s+2<t.length,d=u?t[s+2]:0,f=i>>2,y=(i&3)<<4|l>>4;let v=(l&15)<<2|d>>6,C=d&63;u||(C=64,a||(v=64)),r.push(n[f],n[y],n[v],n[C])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(h0(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):wk(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const l=s<t.length?n[t.charAt(s)]:64;++s;const u=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||a==null||l==null||u==null)throw new xk;const d=i<<2|a>>4;if(r.push(d),l!==64){const f=a<<4&240|l>>2;if(r.push(f),u!==64){const y=l<<6&192|u;r.push(y)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class xk extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const kk=function(t){const e=h0(t);return d0.encodeByteArray(e,!0)},Il=function(t){return kk(t).replace(/\./g,"")},f0=function(t){try{return d0.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function _k(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const Ek=()=>_k().__FIREBASE_DEFAULTS__,Sk=()=>{if(typeof process>"u"||typeof Om>"u")return;const t=Om.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Ik=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&f0(t[1]);return e&&JSON.parse(e)},su=()=>{try{return Ek()||Sk()||Ik()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},p0=t=>{var e,n;return(n=(e=su())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Ck=t=>{const e=p0(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},m0=()=>{var t;return(t=su())===null||t===void 0?void 0:t.config},g0=t=>{var e;return(e=su())===null||e===void 0?void 0:e[`_${t}`]};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Tk{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Nk(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Il(JSON.stringify(n)),Il(JSON.stringify(a)),""].join(".")}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function ft(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ak(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ft())}function Pk(){var t;const e=(t=su())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Rk(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Ok(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Dk(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Lk(){const t=ft();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Mk(){return!Pk()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function jk(){try{return typeof indexedDB=="object"}catch{return!1}}function Uk(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const Fk="FirebaseError";class Bn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Fk,Object.setPrototypeOf(this,Bn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,La.prototype.create)}}class La{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Vk(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new Bn(s,l,r)}}function Vk(t,e){return t.replace(zk,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const zk=/\{\$([^}]+)}/g;function $k(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Cl(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],a=e[s];if(Dm(i)&&Dm(a)){if(!Cl(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Dm(t){return t!==null&&typeof t=="object"}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Ma(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Bk(t,e){const n=new qk(t,e);return n.subscribe.bind(n)}class qk{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");Hk(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=gc),s.error===void 0&&(s.error=gc),s.complete===void 0&&(s.complete=gc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Hk(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function gc(){}/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Ge(t){return t&&t._delegate?t._delegate:t}class ns{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const $r="[DEFAULT]";/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Kk{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Tk;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Wk(e))try{this.getOrInitializeService({instanceIdentifier:$r})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=$r){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$r){return this.instances.has(e)}getOptions(e=$r){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&e(a,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Gk(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=$r){return this.component?this.component.multipleInstances?e:$r:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Gk(t){return t===$r?void 0:t}function Wk(t){return t.instantiationMode==="EAGER"}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Qk{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Kk(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ae;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ae||(ae={}));const Xk={debug:ae.DEBUG,verbose:ae.VERBOSE,info:ae.INFO,warn:ae.WARN,error:ae.ERROR,silent:ae.SILENT},Yk=ae.INFO,Jk={[ae.DEBUG]:"log",[ae.VERBOSE]:"log",[ae.INFO]:"info",[ae.WARN]:"warn",[ae.ERROR]:"error"},Zk=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=Jk[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Vd{constructor(e){this.name=e,this._logLevel=Yk,this._logHandler=Zk,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ae))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Xk[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ae.DEBUG,...e),this._logHandler(this,ae.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ae.VERBOSE,...e),this._logHandler(this,ae.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ae.INFO,...e),this._logHandler(this,ae.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ae.WARN,...e),this._logHandler(this,ae.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ae.ERROR,...e),this._logHandler(this,ae.ERROR,...e)}}const e_=(t,e)=>e.some(n=>t instanceof n);let Lm,Mm;function t_(){return Lm||(Lm=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function n_(){return Mm||(Mm=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const y0=new WeakMap,_h=new WeakMap,v0=new WeakMap,yc=new WeakMap,zd=new WeakMap;function r_(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",a)},i=()=>{n(yr(t.result)),s()},a=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",a)});return e.then(n=>{n instanceof IDBCursor&&y0.set(n,t)}).catch(()=>{}),zd.set(e,t),e}function s_(t){if(_h.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",a),t.removeEventListener("abort",a)},i=()=>{n(),s()},a=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",a),t.addEventListener("abort",a)});_h.set(t,e)}let Eh={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return _h.get(t);if(e==="objectStoreNames")return t.objectStoreNames||v0.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return yr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function i_(t){Eh=t(Eh)}function a_(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(vc(this),e,...n);return v0.set(r,e.sort?e.sort():[e]),yr(r)}:n_().includes(t)?function(...e){return t.apply(vc(this),e),yr(y0.get(this))}:function(...e){return yr(t.apply(vc(this),e))}}function o_(t){return typeof t=="function"?a_(t):(t instanceof IDBTransaction&&s_(t),e_(t,t_())?new Proxy(t,Eh):t)}function yr(t){if(t instanceof IDBRequest)return r_(t);if(yc.has(t))return yc.get(t);const e=o_(t);return e!==t&&(yc.set(t,e),zd.set(e,t)),e}const vc=t=>zd.get(t);function l_(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(t,e),l=yr(a);return r&&a.addEventListener("upgradeneeded",u=>{r(yr(a.result),u.oldVersion,u.newVersion,yr(a.transaction),u)}),n&&a.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const u_=["get","getKey","getAll","getAllKeys","count"],c_=["put","add","delete","clear"],bc=new Map;function jm(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(bc.get(e))return bc.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=c_.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||u_.includes(n)))return;const i=async function(a,...l){const u=this.transaction(a,s?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[n](...l),s&&u.done]))[0]};return bc.set(e,i),i}i_(t=>({...t,get:(e,n,r)=>jm(e,n)||t.get(e,n,r),has:(e,n)=>!!jm(e,n)||t.has(e,n)}));/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class h_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(d_(e)){const n=e.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(e=>e).join(" ")}}function d_(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Sh="@firebase/app",Um="0.10.13";/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const jn=new Vd("@firebase/app"),f_="@firebase/app-compat",p_="@firebase/analytics-compat",m_="@firebase/analytics",g_="@firebase/app-check-compat",y_="@firebase/app-check",v_="@firebase/auth",b_="@firebase/auth-compat",w_="@firebase/database",x_="@firebase/data-connect",k_="@firebase/database-compat",__="@firebase/functions",E_="@firebase/functions-compat",S_="@firebase/installations",I_="@firebase/installations-compat",C_="@firebase/messaging",T_="@firebase/messaging-compat",N_="@firebase/performance",A_="@firebase/performance-compat",P_="@firebase/remote-config",R_="@firebase/remote-config-compat",O_="@firebase/storage",D_="@firebase/storage-compat",L_="@firebase/firestore",M_="@firebase/vertexai-preview",j_="@firebase/firestore-compat",U_="firebase",F_="10.14.1";/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const Ih="[DEFAULT]",V_={[Sh]:"fire-core",[f_]:"fire-core-compat",[m_]:"fire-analytics",[p_]:"fire-analytics-compat",[y_]:"fire-app-check",[g_]:"fire-app-check-compat",[v_]:"fire-auth",[b_]:"fire-auth-compat",[w_]:"fire-rtdb",[x_]:"fire-data-connect",[k_]:"fire-rtdb-compat",[__]:"fire-fn",[E_]:"fire-fn-compat",[S_]:"fire-iid",[I_]:"fire-iid-compat",[C_]:"fire-fcm",[T_]:"fire-fcm-compat",[N_]:"fire-perf",[A_]:"fire-perf-compat",[P_]:"fire-rc",[R_]:"fire-rc-compat",[O_]:"fire-gcs",[D_]:"fire-gcs-compat",[L_]:"fire-fst",[j_]:"fire-fst-compat",[M_]:"fire-vertex","fire-js":"fire-js",[U_]:"fire-js-all"};/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const Tl=new Map,z_=new Map,Ch=new Map;function Fm(t,e){try{t.container.addComponent(e)}catch(n){jn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Js(t){const e=t.name;if(Ch.has(e))return jn.debug(`There were multiple attempts to register component ${e}.`),!1;Ch.set(e,t);for(const n of Tl.values())Fm(n,t);for(const n of z_.values())Fm(n,t);return!0}function $d(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Tn(t){return t.settings!==void 0}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const $_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},vr=new La("app","Firebase",$_);/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class B_{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ns("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw vr.create("app-deleted",{appName:this._name})}}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const ui=F_;function b0(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Ih,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw vr.create("bad-app-name",{appName:String(s)});if(n||(n=m0()),!n)throw vr.create("no-options");const i=Tl.get(s);if(i){if(Cl(n,i.options)&&Cl(r,i.config))return i;throw vr.create("duplicate-app",{appName:s})}const a=new Qk(s);for(const u of Ch.values())a.addComponent(u);const l=new B_(n,r,a);return Tl.set(s,l),l}function w0(t=Ih){const e=Tl.get(t);if(!e&&t===Ih&&m0())return b0();if(!e)throw vr.create("no-app",{appName:t});return e}function br(t,e,n){var r;let s=(r=V_[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),a=e.match(/\s|\//);if(i||a){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),jn.warn(l.join(" "));return}Js(new ns(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const q_="firebase-heartbeat-database",H_=1,xa="firebase-heartbeat-store";let wc=null;function x0(){return wc||(wc=l_(q_,H_,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(xa)}catch(n){console.warn(n)}}}}).catch(t=>{throw vr.create("idb-open",{originalErrorMessage:t.message})})),wc}async function K_(t){try{const e=(await x0()).transaction(xa),n=await e.objectStore(xa).get(k0(t));return await e.done,n}catch(e){if(e instanceof Bn)jn.warn(e.message);else{const n=vr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});jn.warn(n.message)}}}async function Vm(t,e){try{const n=(await x0()).transaction(xa,"readwrite");await n.objectStore(xa).put(e,k0(t)),await n.done}catch(n){if(n instanceof Bn)jn.warn(n.message);else{const r=vr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});jn.warn(r.message)}}}function k0(t){return`${t.name}!${t.options.appId}`}/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const G_=1024,W_=30*24*60*60*1e3;class Q_{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Y_(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=zm();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(i=>i.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:r}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(i=>{const a=new Date(i.date).valueOf();return Date.now()-a<=W_}),this._storage.overwrite(this._heartbeatsCache))}catch(r){jn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=zm(),{heartbeatsToSend:r,unsentEntries:s}=X_(this._heartbeatsCache.heartbeats),i=Il(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return jn.warn(n),""}}}function zm(){return new Date().toISOString().substring(0,10)}function X_(t,e=G_){const n=[];let r=t.slice();for(const s of t){const i=n.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),$m(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),$m(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Y_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return jk()?Uk().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await K_(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return Vm(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return Vm(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function $m(t){return Il(JSON.stringify({version:2,heartbeats:t})).length}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function J_(t){Js(new ns("platform-logger",e=>new h_(e),"PRIVATE")),Js(new ns("heartbeat",e=>new Q_(e),"PRIVATE")),br(Sh,Um,t),br(Sh,Um,"esm2017"),br("fire-js","")}J_("");var Z_="firebase",eE="10.14.1";/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/br(Z_,eE,"app");function Bd(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function _0(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const tE=_0,E0=new La("auth","Firebase",_0());/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const Nl=new Vd("@firebase/auth");function nE(t,...e){Nl.logLevel<=ae.WARN&&Nl.warn(`Auth (${ui}): ${t}`,...e)}function Go(t,...e){Nl.logLevel<=ae.ERROR&&Nl.error(`Auth (${ui}): ${t}`,...e)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Un(t,...e){throw qd(t,...e)}function mn(t,...e){return qd(t,...e)}function S0(t,e,n){const r=Object.assign(Object.assign({},tE()),{[e]:n});return new La("auth","Firebase",r).create(e,{appName:t.name})}function wr(t){return S0(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function qd(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return E0.create(t,...e)}function Y(t,e,...n){if(!t)throw qd(e,...n)}function Nn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Go(e),new Error(e)}function Fn(t,e){t||Nn(e)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Th(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function rE(){return Bm()==="http:"||Bm()==="https:"}function Bm(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function sE(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(rE()||Ok()||"connection"in navigator)?navigator.onLine:!0}function iE(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class ja{constructor(e,n){this.shortDelay=e,this.longDelay=n,Fn(n>e,"Short delay should be less than long delay!"),this.isMobile=Ak()||Dk()}get(){return sE()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Hd(t,e){Fn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class I0{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Nn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Nn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Nn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const aE={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const oE=new ja(3e4,6e4);function iu(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function ci(t,e,n,r,s={}){return C0(t,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const l=Ma(Object.assign({key:t.config.apiKey},a)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const d=Object.assign({method:e,headers:u},i);return Rk()||(d.referrerPolicy="no-referrer"),I0.fetch()(N0(t,t.config.apiHost,n,l),d)})}async function C0(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},aE),e);try{const s=new lE(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw To(t,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const l=i.ok?a.errorMessage:a.error.message,[u,d]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw To(t,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw To(t,"email-already-in-use",a);if(u==="USER_DISABLED")throw To(t,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw S0(t,f,d);Un(t,f)}}catch(s){if(s instanceof Bn)throw s;Un(t,"network-request-failed",{message:String(s)})}}async function T0(t,e,n,r,s={}){const i=await ci(t,e,n,r,s);return"mfaPendingCredential"in i&&Un(t,"multi-factor-auth-required",{_serverResponse:i}),i}function N0(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Hd(t.config,s):`${t.config.apiScheme}://${s}`}class lE{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(mn(this.auth,"network-request-failed")),oE.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function To(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=mn(t,e,r);return s.customData._tokenResponse=n,s}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function uE(t,e){return ci(t,"POST","/v1/accounts:delete",e)}async function A0(t,e){return ci(t,"POST","/v1/accounts:lookup",e)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Zi(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function cE(t,e=!1){const n=Ge(t),r=await n.getIdToken(e),s=Kd(r);Y(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Zi(xc(s.auth_time)),issuedAtTime:Zi(xc(s.iat)),expirationTime:Zi(xc(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function xc(t){return Number(t)*1e3}function Kd(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Go("JWT malformed, contained fewer than 3 sections"),null;try{const s=f0(n);return s?JSON.parse(s):(Go("Failed to decode base64 JWT payload"),null)}catch(s){return Go("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function qm(t){const e=Kd(t);return Y(e,"internal-error"),Y(typeof e.exp<"u","internal-error"),Y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function ka(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Bn&&hE(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function hE({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class dE{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const r=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Nh{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Zi(this.lastLoginAt),this.creationTime=Zi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function Al(t){var e;const n=t.auth,r=await t.getIdToken(),s=await ka(t,A0(n,{idToken:r}));Y(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const a=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?P0(i.providerUserInfo):[],l=pE(t.providerData,a),u=t.isAnonymous,d=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),f=u?d:!1,y={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new Nh(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(t,y)}async function fE(t){const e=Ge(t);await Al(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function pE(t,e){return[...t.filter(n=>!e.some(r=>r.providerId===n.providerId)),...e]}function P0(t){return t.map(e=>{var{providerId:n}=e,r=Bd(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function mE(t,e){const n=await C0(t,{},async()=>{const r=Ma({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,a=N0(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",I0.fetch()(a,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function gE(t,e){return ci(t,"POST","/v2/accounts:revokeToken",iu(t,e))}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class zs{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Y(e.idToken,"internal-error"),Y(typeof e.idToken<"u","internal-error"),Y(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):qm(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){Y(e.length!==0,"internal-error");const n=qm(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(Y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await mE(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,a=new zs;return r&&(Y(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(Y(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(Y(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new zs,this.toJSON())}_performRefresh(){return Nn("not implemented")}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Yn(t,e){Y(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class An{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=Bd(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new dE(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Nh(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await ka(this,this.stsTokenManager.getToken(this.auth,e));return Y(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return cE(this,e)}reload(){return fE(this)}_assign(e){this!==e&&(Y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new An(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){Y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Al(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Tn(this.auth.app))return Promise.reject(wr(this.auth));const e=await this.getIdToken();return await ka(this,uE(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,a,l,u,d,f;const y=(r=n.displayName)!==null&&r!==void 0?r:void 0,v=(s=n.email)!==null&&s!==void 0?s:void 0,C=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,A=(a=n.photoURL)!==null&&a!==void 0?a:void 0,P=(l=n.tenantId)!==null&&l!==void 0?l:void 0,M=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,E=(d=n.createdAt)!==null&&d!==void 0?d:void 0,x=(f=n.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:S,emailVerified:O,isAnonymous:V,providerData:F,stsTokenManager:w}=n;Y(S&&w,e,"internal-error");const m=zs.fromJSON(this.name,w);Y(typeof S=="string",e,"internal-error"),Yn(y,e.name),Yn(v,e.name),Y(typeof O=="boolean",e,"internal-error"),Y(typeof V=="boolean",e,"internal-error"),Yn(C,e.name),Yn(A,e.name),Yn(P,e.name),Yn(M,e.name),Yn(E,e.name),Yn(x,e.name);const b=new An({uid:S,auth:e,email:v,emailVerified:O,displayName:y,isAnonymous:V,photoURL:A,phoneNumber:C,tenantId:P,stsTokenManager:m,createdAt:E,lastLoginAt:x});return F&&Array.isArray(F)&&(b.providerData=F.map(k=>Object.assign({},k))),M&&(b._redirectEventId=M),b}static async _fromIdTokenResponse(e,n,r=!1){const s=new zs;s.updateFromServerResponse(n);const i=new An({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Al(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];Y(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?P0(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new zs;l.updateFromIdToken(r);const u=new An({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Nh(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,d),u}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const Hm=new Map;function Pn(t){Fn(t instanceof Function,"Expected a class definition");let e=Hm.get(t);return e?(Fn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Hm.set(t,e),e)}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class R0{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}R0.type="NONE";const Km=R0;/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Wo(t,e,n){return`firebase:${t}:${e}:${n}`}class $s{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Wo(this.userKey,s.apiKey,i),this.fullPersistenceKey=Wo("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?An._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new $s(Pn(Km),e,r);const s=(await Promise.all(n.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||Pn(Km);const a=Wo(r,e.config.apiKey,e.name);let l=null;for(const d of n)try{const f=await d._get(a);if(f){const y=An._fromJSON(e,f);d!==i&&(l=y),i=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new $s(i,e,r):(i=u[0],l&&await i._set(a,l.toJSON()),await Promise.all(n.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new $s(i,e,r))}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Gm(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(M0(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(O0(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(U0(e))return"Blackberry";if(F0(e))return"Webos";if(D0(e))return"Safari";if((e.includes("chrome/")||L0(e))&&!e.includes("edge/"))return"Chrome";if(j0(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function O0(t=ft()){return/firefox\//i.test(t)}function D0(t=ft()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function L0(t=ft()){return/crios\//i.test(t)}function M0(t=ft()){return/iemobile/i.test(t)}function j0(t=ft()){return/android/i.test(t)}function U0(t=ft()){return/blackberry/i.test(t)}function F0(t=ft()){return/webos/i.test(t)}function Gd(t=ft()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function yE(t=ft()){var e;return Gd(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function vE(){return Lk()&&document.documentMode===10}function V0(t=ft()){return Gd(t)||j0(t)||F0(t)||U0(t)||/windows phone/i.test(t)||M0(t)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function z0(t,e=[]){let n;switch(t){case"Browser":n=Gm(ft());break;case"Worker":n=`${Gm(ft())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ui}/${r}`}/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class bE{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((a,l)=>{try{const u=e(i);a(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function wE(t,e={}){return ci(t,"GET","/v2/passwordPolicy",iu(t,e))}/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const xE=6;class kE{constructor(e){var n,r,s,i;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=a.minPasswordLength)!==null&&n!==void 0?n:xE,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,a,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class _E{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Wm(this),this.idTokenSubscription=new Wm(this),this.beforeStateQueue=new bE(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=E0,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Pn(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await $s.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await A0(this,{idToken:e}),r=await An._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Tn(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===l)&&u!=null&&u.user&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return Y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Al(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=iE()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Tn(this.app))return Promise.reject(wr(this));const n=e?Ge(e):null;return n&&Y(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&Y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Tn(this.app)?Promise.reject(wr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Tn(this.app)?Promise.reject(wr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Pn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await wE(this),n=new kE(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new La("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await gE(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Pn(e)||this._popupRedirectResolver;Y(n,this,"argument-error"),this.redirectPersistenceManager=await $s.create(this,[Pn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(Y(l,this,"internal-error"),l.then(()=>{a||i(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(n);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=z0(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&nE(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function au(t){return Ge(t)}class Wm{constructor(e){this.auth=e,this.observer=null,this.addObserver=Bk(n=>this.observer=n)}get next(){return Y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/let Wd={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function EE(t){Wd=t}function SE(t){return Wd.loadJS(t)}function IE(){return Wd.gapiScript}function CE(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function TE(t,e){const n=$d(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),s=n.getOptions();if(Cl(s,e??{}))return r;Un(r,"already-initialized")}return n.initialize({options:e})}function NE(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Pn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function AE(t,e,n){const r=au(t);Y(r._canInitEmulator,r,"emulator-config-failed"),Y(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=$0(e),{host:a,port:l}=PE(e),u=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${a}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),RE()}function $0(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function PE(t){const e=$0(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Qm(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:Qm(a)}}}function Qm(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function RE(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class B0{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Nn("not implemented")}_getIdTokenResponse(e){return Nn("not implemented")}_linkToIdToken(e,n){return Nn("not implemented")}_getReauthenticationResolver(e){return Nn("not implemented")}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function Bs(t,e){return T0(t,"POST","/v1/accounts:signInWithIdp",iu(t,e))}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const OE="http://localhost";class rs extends B0{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new rs(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Un("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=Bd(n,["providerId","signInMethod"]);if(!r||!s)return null;const a=new rs(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const n=this.buildRequest();return Bs(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Bs(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Bs(e,n)}buildRequest(){const e={requestUri:OE,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Ma(n)}return e}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class q0{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Ua extends q0{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class nr extends Ua{constructor(){super("facebook.com")}static credential(e){return rs._fromParams({providerId:nr.PROVIDER_ID,signInMethod:nr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return nr.credentialFromTaggedObject(e)}static credentialFromError(e){return nr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return nr.credential(e.oauthAccessToken)}catch{return null}}}nr.FACEBOOK_SIGN_IN_METHOD="facebook.com";nr.PROVIDER_ID="facebook.com";/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class rr extends Ua{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return rs._fromParams({providerId:rr.PROVIDER_ID,signInMethod:rr.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return rr.credentialFromTaggedObject(e)}static credentialFromError(e){return rr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return rr.credential(n,r)}catch{return null}}}rr.GOOGLE_SIGN_IN_METHOD="google.com";rr.PROVIDER_ID="google.com";/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class sr extends Ua{constructor(){super("github.com")}static credential(e){return rs._fromParams({providerId:sr.PROVIDER_ID,signInMethod:sr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return sr.credentialFromTaggedObject(e)}static credentialFromError(e){return sr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return sr.credential(e.oauthAccessToken)}catch{return null}}}sr.GITHUB_SIGN_IN_METHOD="github.com";sr.PROVIDER_ID="github.com";/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class ir extends Ua{constructor(){super("twitter.com")}static credential(e,n){return rs._fromParams({providerId:ir.PROVIDER_ID,signInMethod:ir.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return ir.credentialFromTaggedObject(e)}static credentialFromError(e){return ir.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return ir.credential(n,r)}catch{return null}}}ir.TWITTER_SIGN_IN_METHOD="twitter.com";ir.PROVIDER_ID="twitter.com";/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function DE(t,e){return T0(t,"POST","/v1/accounts:signUp",iu(t,e))}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Er{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await An._fromIdTokenResponse(e,r,s),a=Xm(r);return new Er({user:i,providerId:a,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Xm(r);return new Er({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Xm(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function LE(t){var e;if(Tn(t.app))return Promise.reject(wr(t));const n=au(t);if(await n._initializationPromise,!((e=n.currentUser)===null||e===void 0)&&e.isAnonymous)return new Er({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await DE(n,{returnSecureToken:!0}),s=await Er._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(s.user),s}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Pl extends Bn{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Pl.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Pl(e,n,r,s)}}function H0(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Pl._fromErrorAndOperation(t,s,e,r):s})}async function ME(t,e,n=!1){const r=await ka(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Er._forOperation(t,"link",r)}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function jE(t,e,n=!1){const{auth:r}=t;if(Tn(r.app))return Promise.reject(wr(r));const s="reauthenticate";try{const i=await ka(t,H0(r,s,e,t),n);Y(i.idToken,r,"internal-error");const a=Kd(i.idToken);Y(a,r,"internal-error");const{sub:l}=a;return Y(t.uid===l,r,"user-mismatch"),Er._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Un(r,"user-mismatch"),i}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function UE(t,e,n=!1){if(Tn(t.app))return Promise.reject(wr(t));const r="signIn",s=await H0(t,r,e),i=await Er._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}function FE(t,e,n,r){return Ge(t).onIdTokenChanged(e,n,r)}function VE(t,e,n){return Ge(t).beforeAuthStateChanged(e,n)}function zE(t,e,n,r){return Ge(t).onAuthStateChanged(e,n,r)}const Rl="__sak";/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class K0{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Rl,"1"),this.storage.removeItem(Rl),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const $E=1e3,BE=10;class G0 extends K0{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=V0(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((a,l,u)=>{this.notifyListeners(a,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!n&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);vE()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,BE):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},$E)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}G0.type="LOCAL";const qE=G0;/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class W0 extends K0{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}W0.type="SESSION";const Q0=W0;/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function HE(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class ou{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new ou(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(a).map(async d=>d(n.origin,i)),u=await HE(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ou.receivers=[];/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Qd(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class KE{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((l,u)=>{const d=Qd("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(y){const v=y;if(v.data.eventId===d)switch(v.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(v.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:n},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function gn(){return window}function GE(t){gn().location.href=t}/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function X0(){return typeof gn().WorkerGlobalScope<"u"&&typeof gn().importScripts=="function"}async function WE(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function QE(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function XE(){return X0()?self:null}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const Y0="firebaseLocalStorageDb",YE=1,Ol="firebaseLocalStorage",J0="fbase_key";class Fa{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function lu(t,e){return t.transaction([Ol],e?"readwrite":"readonly").objectStore(Ol)}function JE(){const t=indexedDB.deleteDatabase(Y0);return new Fa(t).toPromise()}function Ah(){const t=indexedDB.open(Y0,YE);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Ol,{keyPath:J0})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Ol)?e(r):(r.close(),await JE(),e(await Ah()))})})}async function Ym(t,e,n){const r=lu(t,!0).put({[J0]:e,value:n});return new Fa(r).toPromise()}async function ZE(t,e){const n=lu(t,!1).get(e),r=await new Fa(n).toPromise();return r===void 0?null:r.value}function Jm(t,e){const n=lu(t,!0).delete(e);return new Fa(n).toPromise()}const eS=800,tS=3;class Z0{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ah(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>tS)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return X0()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ou._getInstance(XE()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await WE(),!this.activeServiceWorker)return;this.sender=new KE(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||QE()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ah();return await Ym(e,Rl,"1"),await Jm(e,Rl),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ym(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>ZE(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Jm(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=lu(s,!1).getAll();return new Fa(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),eS)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Z0.type="LOCAL";const nS=Z0;new ja(3e4,6e4);/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function rS(t,e){return e?Pn(e):(Y(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Xd extends B0{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Bs(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Bs(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Bs(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function sS(t){return UE(t.auth,new Xd(t),t.bypassAuthState)}function iS(t){const{auth:e,user:n}=t;return Y(n,e,"internal-error"),jE(n,new Xd(t),t.bypassAuthState)}async function aS(t){const{auth:e,user:n}=t;return Y(n,e,"internal-error"),ME(n,new Xd(t),t.bypassAuthState)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class eb{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:a,type:l}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return sS;case"linkViaPopup":case"linkViaRedirect":return aS;case"reauthViaPopup":case"reauthViaRedirect":return iS;default:Un(this.auth,"internal-error")}}resolve(e){Fn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Fn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const oS=new ja(2e3,1e4);class Ds extends eb{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Ds.currentPopupAction&&Ds.currentPopupAction.cancel(),Ds.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Y(e,this.auth,"internal-error"),e}async onExecution(){Fn(this.filter.length===1,"Popup operations only handle one event");const e=Qd();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(mn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(mn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ds.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(mn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,oS.get())};e()}}Ds.currentPopupAction=null;/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const lS="pendingRedirect",Qo=new Map;class uS extends eb{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Qo.get(this.auth._key());if(!e){try{const n=await cS(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(n){e=()=>Promise.reject(n)}Qo.set(this.auth._key(),e)}return this.bypassAuthState||Qo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function cS(t,e){const n=fS(e),r=dS(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function hS(t,e){Qo.set(t._key(),e)}function dS(t){return Pn(t._redirectPersistence)}function fS(t){return Wo(lS,t.config.apiKey,t.name)}async function pS(t,e,n=!1){if(Tn(t.app))return Promise.reject(wr(t));const r=au(t),s=rS(r,e),i=await new uS(r,s,n).execute();return i&&!n&&(delete i.user._redirectEventId,await r._persistUserIfCurrent(i.user),await r._setRedirectUser(null,e)),i}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const mS=10*60*1e3;class gS{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!yS(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!tb(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(mn(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=mS&&this.cachedEventUids.clear(),this.cachedEventUids.has(Zm(e))}saveEventToCache(e){this.cachedEventUids.add(Zm(e)),this.lastProcessedEventTime=Date.now()}}function Zm(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function tb({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function yS(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return tb(t);default:return!1}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function vS(t,e={}){return ci(t,"GET","/v1/projects",e)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const bS=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,wS=/^https?/;async function xS(t){if(t.config.emulator)return;const{authorizedDomains:e}=await vS(t);for(const n of e)try{if(kS(n))return}catch{}Un(t,"unauthorized-domain")}function kS(t){const e=Th(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const i=new URL(t);return i.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&i.hostname===r}if(!wS.test(n))return!1;if(bS.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const _S=new ja(3e4,6e4);function eg(){const t=gn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function ES(t){return new Promise((e,n)=>{var r,s,i;function a(){eg(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{eg(),n(mn(t,"network-request-failed"))},timeout:_S.get()})}if(!((s=(r=gn().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=gn().gapi)===null||i===void 0)&&i.load)a();else{const l=CE("iframefcb");return gn()[l]=()=>{gapi.load?a():n(mn(t,"network-request-failed"))},SE(`${IE()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw Xo=null,e})}let Xo=null;function SS(t){return Xo=Xo||ES(t),Xo}/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const IS=new ja(5e3,15e3),CS="__/auth/iframe",TS="emulator/auth/iframe",NS={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},AS=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function PS(t){const e=t.config;Y(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Hd(e,TS):`https://${t.config.authDomain}/${CS}`,r={apiKey:e.apiKey,appName:t.name,v:ui},s=AS.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${Ma(r).slice(1)}`}async function RS(t){const e=await SS(t),n=gn().gapi;return Y(n,t,"internal-error"),e.open({where:document.body,url:PS(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:NS,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=mn(t,"network-request-failed"),l=gn().setTimeout(()=>{i(a)},IS.get());function u(){gn().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const OS={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},DS=500,LS=600,MS="_blank",jS="http://localhost";class tg{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function US(t,e,n,r=DS,s=LS){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},OS),{width:r.toString(),height:s.toString(),top:i,left:a}),d=ft().toLowerCase();n&&(l=L0(d)?MS:n),O0(d)&&(e=e||jS,u.scrollbars="yes");const f=Object.entries(u).reduce((v,[C,A])=>`${v}${C}=${A},`,"");if(yE(d)&&l!=="_self")return FS(e||"",l),new tg(null);const y=window.open(e||"",l,f);Y(y,t,"popup-blocked");try{y.focus()}catch{}return new tg(y)}function FS(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const VS="__/auth/handler",zS="emulator/auth/handler",$S=encodeURIComponent("fac");async function ng(t,e,n,r,s,i){Y(t.config.authDomain,t,"auth-domain-config-required"),Y(t.config.apiKey,t,"invalid-api-key");const a={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:ui,eventId:s};if(e instanceof q0){e.setDefaultLanguage(t.languageCode),a.providerId=e.providerId||"",$k(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,y]of Object.entries({}))a[f]=y}if(e instanceof Ua){const f=e.getScopes().filter(y=>y!=="");f.length>0&&(a.scopes=f.join(","))}t.tenantId&&(a.tid=t.tenantId);const l=a;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await t._getAppCheckToken(),d=u?`#${$S}=${encodeURIComponent(u)}`:"";return`${BS(t)}?${Ma(l).slice(1)}${d}`}function BS({config:t}){return t.emulator?Hd(t,zS):`https://${t.authDomain}/${VS}`}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const kc="webStorageSupport";class qS{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Q0,this._completeRedirectFn=pS,this._overrideRedirectResult=hS}async _openPopup(e,n,r,s){var i;Fn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const a=await ng(e,n,r,Th(),s);return US(e,a,Qd())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await ng(e,n,r,Th(),s);return GE(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Fn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await RS(e),r=new gS(e);return n.register("authEvent",s=>(Y(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(kc,{type:kc},r=>{var s;const i=(s=r==null?void 0:r[0])===null||s===void 0?void 0:s[kc];i!==void 0&&n(!!i),Un(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=xS(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return V0()||D0()||Gd()}}const HS=qS;var rg="@firebase/auth",sg="1.7.9";/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class KS{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){Y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function GS(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function WS(t){Js(new ns("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;Y(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:z0(t)},d=new _E(r,s,i,u);return NE(d,n),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Js(new ns("auth-internal",e=>{const n=au(e.getProvider("auth").getImmediate());return(r=>new KS(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),br(rg,sg,GS(t)),br(rg,sg,"esm2017")}/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const QS=5*60,XS=g0("authIdTokenMaxAge")||QS;let ig=null;const YS=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>XS)return;const s=n==null?void 0:n.token;ig!==s&&(ig=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function JS(t=w0()){const e=$d(t,"auth");if(e.isInitialized())return e.getImmediate();const n=TE(t,{popupRedirectResolver:HS,persistence:[nS,qE,Q0]}),r=g0("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=YS(i.toString());VE(n,a,()=>a(n.currentUser)),FE(n,l=>a(l))}}const s=p0("auth");return s&&AE(n,`http://${s}`),n}function ZS(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}EE({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=mn("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",ZS().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});WS("Browser");var ag=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Qr,nb;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,m){function b(){}b.prototype=m.prototype,w.D=m.prototype,w.prototype=new b,w.prototype.constructor=w,w.C=function(k,I,T){for(var _=Array(arguments.length-2),kt=2;kt<arguments.length;kt++)_[kt-2]=arguments[kt];return m.prototype[I].apply(k,_)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,m,b){b||(b=0);var k=Array(16);if(typeof m=="string")for(var I=0;16>I;++I)k[I]=m.charCodeAt(b++)|m.charCodeAt(b++)<<8|m.charCodeAt(b++)<<16|m.charCodeAt(b++)<<24;else for(I=0;16>I;++I)k[I]=m[b++]|m[b++]<<8|m[b++]<<16|m[b++]<<24;m=w.g[0],b=w.g[1],I=w.g[2];var T=w.g[3],_=m+(T^b&(I^T))+k[0]+3614090360&4294967295;m=b+(_<<7&4294967295|_>>>25),_=T+(I^m&(b^I))+k[1]+3905402710&4294967295,T=m+(_<<12&4294967295|_>>>20),_=I+(b^T&(m^b))+k[2]+606105819&4294967295,I=T+(_<<17&4294967295|_>>>15),_=b+(m^I&(T^m))+k[3]+3250441966&4294967295,b=I+(_<<22&4294967295|_>>>10),_=m+(T^b&(I^T))+k[4]+4118548399&4294967295,m=b+(_<<7&4294967295|_>>>25),_=T+(I^m&(b^I))+k[5]+1200080426&4294967295,T=m+(_<<12&4294967295|_>>>20),_=I+(b^T&(m^b))+k[6]+2821735955&4294967295,I=T+(_<<17&4294967295|_>>>15),_=b+(m^I&(T^m))+k[7]+4249261313&4294967295,b=I+(_<<22&4294967295|_>>>10),_=m+(T^b&(I^T))+k[8]+1770035416&4294967295,m=b+(_<<7&4294967295|_>>>25),_=T+(I^m&(b^I))+k[9]+2336552879&4294967295,T=m+(_<<12&4294967295|_>>>20),_=I+(b^T&(m^b))+k[10]+4294925233&4294967295,I=T+(_<<17&4294967295|_>>>15),_=b+(m^I&(T^m))+k[11]+2304563134&4294967295,b=I+(_<<22&4294967295|_>>>10),_=m+(T^b&(I^T))+k[12]+1804603682&4294967295,m=b+(_<<7&4294967295|_>>>25),_=T+(I^m&(b^I))+k[13]+4254626195&4294967295,T=m+(_<<12&4294967295|_>>>20),_=I+(b^T&(m^b))+k[14]+2792965006&4294967295,I=T+(_<<17&4294967295|_>>>15),_=b+(m^I&(T^m))+k[15]+1236535329&4294967295,b=I+(_<<22&4294967295|_>>>10),_=m+(I^T&(b^I))+k[1]+4129170786&4294967295,m=b+(_<<5&4294967295|_>>>27),_=T+(b^I&(m^b))+k[6]+3225465664&4294967295,T=m+(_<<9&4294967295|_>>>23),_=I+(m^b&(T^m))+k[11]+643717713&4294967295,I=T+(_<<14&4294967295|_>>>18),_=b+(T^m&(I^T))+k[0]+3921069994&4294967295,b=I+(_<<20&4294967295|_>>>12),_=m+(I^T&(b^I))+k[5]+3593408605&4294967295,m=b+(_<<5&4294967295|_>>>27),_=T+(b^I&(m^b))+k[10]+38016083&4294967295,T=m+(_<<9&4294967295|_>>>23),_=I+(m^b&(T^m))+k[15]+3634488961&4294967295,I=T+(_<<14&4294967295|_>>>18),_=b+(T^m&(I^T))+k[4]+3889429448&4294967295,b=I+(_<<20&4294967295|_>>>12),_=m+(I^T&(b^I))+k[9]+568446438&4294967295,m=b+(_<<5&4294967295|_>>>27),_=T+(b^I&(m^b))+k[14]+3275163606&4294967295,T=m+(_<<9&4294967295|_>>>23),_=I+(m^b&(T^m))+k[3]+4107603335&4294967295,I=T+(_<<14&4294967295|_>>>18),_=b+(T^m&(I^T))+k[8]+1163531501&4294967295,b=I+(_<<20&4294967295|_>>>12),_=m+(I^T&(b^I))+k[13]+2850285829&4294967295,m=b+(_<<5&4294967295|_>>>27),_=T+(b^I&(m^b))+k[2]+4243563512&4294967295,T=m+(_<<9&4294967295|_>>>23),_=I+(m^b&(T^m))+k[7]+1735328473&4294967295,I=T+(_<<14&4294967295|_>>>18),_=b+(T^m&(I^T))+k[12]+2368359562&4294967295,b=I+(_<<20&4294967295|_>>>12),_=m+(b^I^T)+k[5]+4294588738&4294967295,m=b+(_<<4&4294967295|_>>>28),_=T+(m^b^I)+k[8]+2272392833&4294967295,T=m+(_<<11&4294967295|_>>>21),_=I+(T^m^b)+k[11]+1839030562&4294967295,I=T+(_<<16&4294967295|_>>>16),_=b+(I^T^m)+k[14]+4259657740&4294967295,b=I+(_<<23&4294967295|_>>>9),_=m+(b^I^T)+k[1]+2763975236&4294967295,m=b+(_<<4&4294967295|_>>>28),_=T+(m^b^I)+k[4]+1272893353&4294967295,T=m+(_<<11&4294967295|_>>>21),_=I+(T^m^b)+k[7]+4139469664&4294967295,I=T+(_<<16&4294967295|_>>>16),_=b+(I^T^m)+k[10]+3200236656&4294967295,b=I+(_<<23&4294967295|_>>>9),_=m+(b^I^T)+k[13]+681279174&4294967295,m=b+(_<<4&4294967295|_>>>28),_=T+(m^b^I)+k[0]+3936430074&4294967295,T=m+(_<<11&4294967295|_>>>21),_=I+(T^m^b)+k[3]+3572445317&4294967295,I=T+(_<<16&4294967295|_>>>16),_=b+(I^T^m)+k[6]+76029189&4294967295,b=I+(_<<23&4294967295|_>>>9),_=m+(b^I^T)+k[9]+3654602809&4294967295,m=b+(_<<4&4294967295|_>>>28),_=T+(m^b^I)+k[12]+3873151461&4294967295,T=m+(_<<11&4294967295|_>>>21),_=I+(T^m^b)+k[15]+530742520&4294967295,I=T+(_<<16&4294967295|_>>>16),_=b+(I^T^m)+k[2]+3299628645&4294967295,b=I+(_<<23&4294967295|_>>>9),_=m+(I^(b|~T))+k[0]+4096336452&4294967295,m=b+(_<<6&4294967295|_>>>26),_=T+(b^(m|~I))+k[7]+1126891415&4294967295,T=m+(_<<10&4294967295|_>>>22),_=I+(m^(T|~b))+k[14]+2878612391&4294967295,I=T+(_<<15&4294967295|_>>>17),_=b+(T^(I|~m))+k[5]+4237533241&4294967295,b=I+(_<<21&4294967295|_>>>11),_=m+(I^(b|~T))+k[12]+1700485571&4294967295,m=b+(_<<6&4294967295|_>>>26),_=T+(b^(m|~I))+k[3]+2399980690&4294967295,T=m+(_<<10&4294967295|_>>>22),_=I+(m^(T|~b))+k[10]+4293915773&4294967295,I=T+(_<<15&4294967295|_>>>17),_=b+(T^(I|~m))+k[1]+2240044497&4294967295,b=I+(_<<21&4294967295|_>>>11),_=m+(I^(b|~T))+k[8]+1873313359&4294967295,m=b+(_<<6&4294967295|_>>>26),_=T+(b^(m|~I))+k[15]+4264355552&4294967295,T=m+(_<<10&4294967295|_>>>22),_=I+(m^(T|~b))+k[6]+2734768916&4294967295,I=T+(_<<15&4294967295|_>>>17),_=b+(T^(I|~m))+k[13]+1309151649&4294967295,b=I+(_<<21&4294967295|_>>>11),_=m+(I^(b|~T))+k[4]+4149444226&4294967295,m=b+(_<<6&4294967295|_>>>26),_=T+(b^(m|~I))+k[11]+3174756917&4294967295,T=m+(_<<10&4294967295|_>>>22),_=I+(m^(T|~b))+k[2]+718787259&4294967295,I=T+(_<<15&4294967295|_>>>17),_=b+(T^(I|~m))+k[9]+3951481745&4294967295,w.g[0]=w.g[0]+m&4294967295,w.g[1]=w.g[1]+(I+(_<<21&4294967295|_>>>11))&4294967295,w.g[2]=w.g[2]+I&4294967295,w.g[3]=w.g[3]+T&4294967295}r.prototype.u=function(w,m){m===void 0&&(m=w.length);for(var b=m-this.blockSize,k=this.B,I=this.h,T=0;T<m;){if(I==0)for(;T<=b;)s(this,w,T),T+=this.blockSize;if(typeof w=="string"){for(;T<m;)if(k[I++]=w.charCodeAt(T++),I==this.blockSize){s(this,k),I=0;break}}else for(;T<m;)if(k[I++]=w[T++],I==this.blockSize){s(this,k),I=0;break}}this.h=I,this.o+=m},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var m=1;m<w.length-8;++m)w[m]=0;var b=8*this.o;for(m=w.length-8;m<w.length;++m)w[m]=b&255,b/=256;for(this.u(w),w=Array(16),m=b=0;4>m;++m)for(var k=0;32>k;k+=8)w[b++]=this.g[m]>>>k&255;return w};function i(w,m){var b=l;return Object.prototype.hasOwnProperty.call(b,w)?b[w]:b[w]=m(w)}function a(w,m){this.h=m;for(var b=[],k=!0,I=w.length-1;0<=I;I--){var T=w[I]|0;k&&T==m||(b[I]=T,k=!1)}this.g=b}var l={};function u(w){return-128<=w&&128>w?i(w,function(m){return new a([m|0],0>m?-1:0)}):new a([w|0],0>w?-1:0)}function d(w){if(isNaN(w)||!isFinite(w))return y;if(0>w)return M(d(-w));for(var m=[],b=1,k=0;w>=b;k++)m[k]=w/b|0,b*=4294967296;return new a(m,0)}function f(w,m){if(w.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(w.charAt(0)=="-")return M(f(w.substring(1),m));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var b=d(Math.pow(m,8)),k=y,I=0;I<w.length;I+=8){var T=Math.min(8,w.length-I),_=parseInt(w.substring(I,I+T),m);8>T?(T=d(Math.pow(m,T)),k=k.j(T).add(d(_))):(k=k.j(b),k=k.add(d(_)))}return k}var y=u(0),v=u(1),C=u(16777216);t=a.prototype,t.m=function(){if(P(this))return-M(this).m();for(var w=0,m=1,b=0;b<this.g.length;b++){var k=this.i(b);w+=(0<=k?k:4294967296+k)*m,m*=4294967296}return w},t.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(A(this))return"0";if(P(this))return"-"+M(this).toString(w);for(var m=d(Math.pow(w,6)),b=this,k="";;){var I=O(b,m).g;b=E(b,I.j(m));var T=((0<b.g.length?b.g[0]:b.h)>>>0).toString(w);if(b=I,A(b))return T+k;for(;6>T.length;)T="0"+T;k=T+k}},t.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function A(w){if(w.h!=0)return!1;for(var m=0;m<w.g.length;m++)if(w.g[m]!=0)return!1;return!0}function P(w){return w.h==-1}t.l=function(w){return w=E(this,w),P(w)?-1:A(w)?0:1};function M(w){for(var m=w.g.length,b=[],k=0;k<m;k++)b[k]=~w.g[k];return new a(b,~w.h).add(v)}t.abs=function(){return P(this)?M(this):this},t.add=function(w){for(var m=Math.max(this.g.length,w.g.length),b=[],k=0,I=0;I<=m;I++){var T=k+(this.i(I)&65535)+(w.i(I)&65535),_=(T>>>16)+(this.i(I)>>>16)+(w.i(I)>>>16);k=_>>>16,T&=65535,_&=65535,b[I]=_<<16|T}return new a(b,b[b.length-1]&-2147483648?-1:0)};function E(w,m){return w.add(M(m))}t.j=function(w){if(A(this)||A(w))return y;if(P(this))return P(w)?M(this).j(M(w)):M(M(this).j(w));if(P(w))return M(this.j(M(w)));if(0>this.l(C)&&0>w.l(C))return d(this.m()*w.m());for(var m=this.g.length+w.g.length,b=[],k=0;k<2*m;k++)b[k]=0;for(k=0;k<this.g.length;k++)for(var I=0;I<w.g.length;I++){var T=this.i(k)>>>16,_=this.i(k)&65535,kt=w.i(I)>>>16,xn=w.i(I)&65535;b[2*k+2*I]+=_*xn,x(b,2*k+2*I),b[2*k+2*I+1]+=T*xn,x(b,2*k+2*I+1),b[2*k+2*I+1]+=_*kt,x(b,2*k+2*I+1),b[2*k+2*I+2]+=T*kt,x(b,2*k+2*I+2)}for(k=0;k<m;k++)b[k]=b[2*k+1]<<16|b[2*k];for(k=m;k<2*m;k++)b[k]=0;return new a(b,0)};function x(w,m){for(;(w[m]&65535)!=w[m];)w[m+1]+=w[m]>>>16,w[m]&=65535,m++}function S(w,m){this.g=w,this.h=m}function O(w,m){if(A(m))throw Error("division by zero");if(A(w))return new S(y,y);if(P(w))return m=O(M(w),m),new S(M(m.g),M(m.h));if(P(m))return m=O(w,M(m)),new S(M(m.g),m.h);if(30<w.g.length){if(P(w)||P(m))throw Error("slowDivide_ only works with positive integers.");for(var b=v,k=m;0>=k.l(w);)b=V(b),k=V(k);var I=F(b,1),T=F(k,1);for(k=F(k,2),b=F(b,2);!A(k);){var _=T.add(k);0>=_.l(w)&&(I=I.add(b),T=_),k=F(k,1),b=F(b,1)}return m=E(w,I.j(m)),new S(I,m)}for(I=y;0<=w.l(m);){for(b=Math.max(1,Math.floor(w.m()/m.m())),k=Math.ceil(Math.log(b)/Math.LN2),k=48>=k?1:Math.pow(2,k-48),T=d(b),_=T.j(m);P(_)||0<_.l(w);)b-=k,T=d(b),_=T.j(m);A(T)&&(T=v),I=I.add(T),w=E(w,_)}return new S(I,w)}t.A=function(w){return O(this,w).h},t.and=function(w){for(var m=Math.max(this.g.length,w.g.length),b=[],k=0;k<m;k++)b[k]=this.i(k)&w.i(k);return new a(b,this.h&w.h)},t.or=function(w){for(var m=Math.max(this.g.length,w.g.length),b=[],k=0;k<m;k++)b[k]=this.i(k)|w.i(k);return new a(b,this.h|w.h)},t.xor=function(w){for(var m=Math.max(this.g.length,w.g.length),b=[],k=0;k<m;k++)b[k]=this.i(k)^w.i(k);return new a(b,this.h^w.h)};function V(w){for(var m=w.g.length+1,b=[],k=0;k<m;k++)b[k]=w.i(k)<<1|w.i(k-1)>>>31;return new a(b,w.h)}function F(w,m){var b=m>>5;m%=32;for(var k=w.g.length-b,I=[],T=0;T<k;T++)I[T]=0<m?w.i(T+b)>>>m|w.i(T+b+1)<<32-m:w.i(T+b);return new a(I,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,nb=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=f,Qr=a}).apply(typeof ag<"u"?ag:typeof self<"u"?self:typeof window<"u"?window:{});var No=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var rb,Vi,sb,Yo,Ph,ib,ab,ob;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,c,h){return o==Array.prototype||o==Object.prototype||(o[c]=h.value),o};function n(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof No=="object"&&No];for(var c=0;c<o.length;++c){var h=o[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=n(this);function s(o,c){if(c)e:{var h=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var N=o[p];if(!(N in h))break e;h=h[N]}o=o[o.length-1],p=h[o],c=c(p),c!=p&&c!=null&&e(h,o,{configurable:!0,writable:!0,value:c})}}function i(o,c){o instanceof String&&(o+="");var h=0,p=!1,N={next:function(){if(!p&&h<o.length){var R=h++;return{value:c(R,o[R]),done:!1}}return p=!0,{done:!0,value:void 0}}};return N[Symbol.iterator]=function(){return N},N}s("Array.prototype.values",function(o){return o||function(){return i(this,function(c,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function u(o){var c=typeof o;return c=c!="object"?c:o?Array.isArray(o)?"array":c:"null",c=="array"||c=="object"&&typeof o.length=="number"}function d(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function f(o,c,h){return o.call.apply(o.bind,arguments)}function y(o,c,h){if(!o)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var N=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(N,p),o.apply(c,N)}}return function(){return o.apply(c,arguments)}}function v(o,c,h){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:y,v.apply(null,arguments)}function C(o,c){var h=Array.prototype.slice.call(arguments,1);return function(){var p=h.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function A(o,c){function h(){}h.prototype=c.prototype,o.aa=c.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(p,N,R){for(var z=Array(arguments.length-2),we=2;we<arguments.length;we++)z[we-2]=arguments[we];return c.prototype[N].apply(p,z)}}function P(o){const c=o.length;if(0<c){const h=Array(c);for(let p=0;p<c;p++)h[p]=o[p];return h}return[]}function M(o,c){for(let h=1;h<arguments.length;h++){const p=arguments[h];if(u(p)){const N=o.length||0,R=p.length||0;o.length=N+R;for(let z=0;z<R;z++)o[N+z]=p[z]}else o.push(p)}}class E{constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function x(o){return/^[\s\xa0]*$/.test(o)}function S(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function O(o){return O[" "](o),o}O[" "]=function(){};var V=S().indexOf("Gecko")!=-1&&!(S().toLowerCase().indexOf("webkit")!=-1&&S().indexOf("Edge")==-1)&&!(S().indexOf("Trident")!=-1||S().indexOf("MSIE")!=-1)&&S().indexOf("Edge")==-1;function F(o,c,h){for(const p in o)c.call(h,o[p],p,o)}function w(o,c){for(const h in o)c.call(void 0,o[h],h,o)}function m(o){const c={};for(const h in o)c[h]=o[h];return c}const b="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function k(o,c){let h,p;for(let N=1;N<arguments.length;N++){p=arguments[N];for(h in p)o[h]=p[h];for(let R=0;R<b.length;R++)h=b[R],Object.prototype.hasOwnProperty.call(p,h)&&(o[h]=p[h])}}function I(o){var c=1;o=o.split(":");const h=[];for(;0<c&&o.length;)h.push(o.shift()),c--;return o.length&&h.push(o.join(":")),h}function T(o){l.setTimeout(()=>{throw o},0)}function _(){var o=X;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class kt{constructor(){this.h=this.g=null}add(c,h){const p=xn.get();p.set(c,h),this.h?this.h.next=p:this.g=p,this.h=p}}var xn=new E(()=>new Or,o=>o.reset());class Or{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let Wt,$=!1,X=new kt,te=()=>{const o=l.Promise.resolve(void 0);Wt=()=>{o.then(ye)}};var ye=()=>{for(var o;o=_();){try{o.h.call(o.g)}catch(h){T(h)}var c=xn;c.j(o),100>c.h&&(c.h++,o.next=c.g,c.g=o)}$=!1};function he(){this.s=this.s,this.C=this.C}he.prototype.s=!1,he.prototype.ma=function(){this.s||(this.s=!0,this.N())},he.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Se(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}Se.prototype.h=function(){this.defaultPrevented=!0};var Qt=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};l.addEventListener("test",h,c),l.removeEventListener("test",h,c)}catch{}return o}();function Xt(o,c){if(Se.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget){if(V){e:{try{O(c.nodeName);var N=!0;break e}catch{}N=!1}N||(c=null)}}else h=="mouseover"?c=o.fromElement:h=="mouseout"&&(c=o.toElement);this.relatedTarget=c,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Yt[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Xt.aa.h.call(this)}}A(Xt,Se);var Yt={2:"touch",3:"pen",4:"mouse"};Xt.prototype.h=function(){Xt.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Jt="closure_listenable_"+(1e6*Math.random()|0),Iu=0;function Cu(o,c,h,p,N){this.listener=o,this.proxy=null,this.src=c,this.type=h,this.capture=!!p,this.ha=N,this.key=++Iu,this.da=this.fa=!1}function U(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function H(o){this.src=o,this.g={},this.h=0}H.prototype.add=function(o,c,h,p,N){var R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);var z=B(o,c,p,N);return-1<z?(c=o[z],h||(c.fa=!1)):(c=new Cu(c,this.src,R,!!p,N),c.fa=h,o.push(c)),c};function G(o,c){var h=c.type;if(h in o.g){var p=o.g[h],N=Array.prototype.indexOf.call(p,c,void 0),R;(R=0<=N)&&Array.prototype.splice.call(p,N,1),R&&(U(c),o.g[h].length==0&&(delete o.g[h],o.h--))}}function B(o,c,h,p){for(var N=0;N<o.length;++N){var R=o[N];if(!R.da&&R.listener==c&&R.capture==!!h&&R.ha==p)return N}return-1}var ne="closure_lm_"+(1e6*Math.random()|0),ie={};function ve(o,c,h,p,N){if(Array.isArray(c)){for(var R=0;R<c.length;R++)ve(o,c[R],h,p,N);return null}return h=Hn(h),o&&o[Jt]?o.K(c,h,d(p)?!!p.capture:!1,N):zt(o,c,h,!1,p,N)}function zt(o,c,h,p,N,R){if(!c)throw Error("Invalid event type");var z=d(N)?!!N.capture:!!N,we=Dr(o);if(we||(o[ne]=we=new H(o)),h=we.add(c,h,p,z,R),h.proxy)return h;if(p=rt(),h.proxy=p,p.src=o,p.listener=h,o.addEventListener)Qt||(N=z),N===void 0&&(N=!1),o.addEventListener(c.toString(),p,N);else if(o.attachEvent)o.attachEvent(hs(c.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return h}function rt(){function o(h){return c.call(o.src,o.listener,h)}const c=qn;return o}function Re(o,c,h,p,N){if(Array.isArray(c))for(var R=0;R<c.length;R++)Re(o,c[R],h,p,N);else p=d(p)?!!p.capture:!!p,h=Hn(h),o&&o[Jt]?(o=o.i,c=String(c).toString(),c in o.g&&(R=o.g[c],h=B(R,h,p,N),-1<h&&(U(R[h]),Array.prototype.splice.call(R,h,1),R.length==0&&(delete o.g[c],o.h--)))):o&&(o=Dr(o))&&(c=o.g[c.toString()],o=-1,c&&(o=B(c,h,p,N)),(h=-1<o?c[o]:null)&&pt(h))}function pt(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[Jt])G(c.i,o);else{var h=o.type,p=o.proxy;c.removeEventListener?c.removeEventListener(h,p,o.capture):c.detachEvent?c.detachEvent(hs(h),p):c.addListener&&c.removeListener&&c.removeListener(p),(h=Dr(c))?(G(h,o),h.h==0&&(h.src=null,c[ne]=null)):U(o)}}}function hs(o){return o in ie?ie[o]:ie[o]="on"+o}function qn(o,c){if(o.da)o=!0;else{c=new Xt(c,this);var h=o.listener,p=o.ha||o.src;o.fa&&pt(o),o=h.call(p,c)}return o}function Dr(o){return o=o[ne],o instanceof H?o:null}var mt="__closure_events_fn_"+(1e9*Math.random()>>>0);function Hn(o){return typeof o=="function"?o:(o[mt]||(o[mt]=function(c){return o.handleEvent(c)}),o[mt])}function Be(){he.call(this),this.i=new H(this),this.M=this,this.F=null}A(Be,he),Be.prototype[Jt]=!0,Be.prototype.removeEventListener=function(o,c,h,p){Re(this,o,c,h,p)};function We(o,c){var h,p=o.F;if(p)for(h=[];p;p=p.F)h.push(p);if(o=o.M,p=c.type||c,typeof c=="string")c=new Se(c,o);else if(c instanceof Se)c.target=c.target||o;else{var N=c;c=new Se(p,o),k(c,N)}if(N=!0,h)for(var R=h.length-1;0<=R;R--){var z=c.g=h[R];N=ds(z,p,!0,c)&&N}if(z=c.g=o,N=ds(z,p,!0,c)&&N,N=ds(z,p,!1,c)&&N,h)for(R=0;R<h.length;R++)z=c.g=h[R],N=ds(z,p,!1,c)&&N}Be.prototype.N=function(){if(Be.aa.N.call(this),this.i){var o=this.i,c;for(c in o.g){for(var h=o.g[c],p=0;p<h.length;p++)U(h[p]);delete o.g[c],o.h--}}this.F=null},Be.prototype.K=function(o,c,h,p){return this.i.add(String(o),c,!1,h,p)},Be.prototype.L=function(o,c,h,p){return this.i.add(String(o),c,!0,h,p)};function ds(o,c,h,p){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();for(var N=!0,R=0;R<c.length;++R){var z=c[R];if(z&&!z.da&&z.capture==h){var we=z.listener,Qe=z.ha||z.src;z.fa&&G(o.i,z),N=we.call(Qe,p)!==!1&&N}}return N&&!p.defaultPrevented}function oe(o,c,h){if(typeof o=="function")h&&(o=v(o,h));else if(o&&typeof o.handleEvent=="function")o=v(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(o,c||0)}function Kn(o){o.g=oe(()=>{o.g=null,o.i&&(o.i=!1,Kn(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class Wa extends he{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Kn(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Zt(o){he.call(this),this.h=o,this.g={}}A(Zt,he);var Pf=[];function Rf(o){F(o.g,function(c,h){this.g.hasOwnProperty(h)&&pt(c)},o),o.g={}}Zt.prototype.N=function(){Zt.aa.N.call(this),Rf(this)},Zt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Tu=l.JSON.stringify,xw=l.JSON.parse,kw=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function Nu(){}Nu.prototype.h=null;function Of(o){return o.h||(o.h=o.i())}function Df(){}var pi={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Au(){Se.call(this,"d")}A(Au,Se);function Pu(){Se.call(this,"c")}A(Pu,Se);var Lr={},Lf=null;function Qa(){return Lf=Lf||new Be}Lr.La="serverreachability";function Mf(o){Se.call(this,Lr.La,o)}A(Mf,Se);function mi(o){const c=Qa();We(c,new Mf(c))}Lr.STAT_EVENT="statevent";function jf(o,c){Se.call(this,Lr.STAT_EVENT,o),this.stat=c}A(jf,Se);function gt(o){const c=Qa();We(c,new jf(c,o))}Lr.Ma="timingevent";function Uf(o,c){Se.call(this,Lr.Ma,o),this.size=c}A(Uf,Se);function gi(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},c)}function yi(){this.g=!0}yi.prototype.xa=function(){this.g=!1};function _w(o,c,h,p,N,R){o.info(function(){if(o.g)if(R)for(var z="",we=R.split("&"),Qe=0;Qe<we.length;Qe++){var de=we[Qe].split("=");if(1<de.length){var st=de[0];de=de[1];var _t=st.split("_");z=2<=_t.length&&_t[1]=="type"?z+(st+"="+de+"&"):z+(st+"=redacted&")}}else z=null;else z=R;return"XMLHTTP REQ ("+p+") [attempt "+N+"]: "+c+`
`+h+`
`+z})}function Ew(o,c,h,p,N,R,z){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+N+"]: "+c+`
`+h+`
`+R+" "+z})}function fs(o,c,h,p){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+Iw(o,h)+(p?" "+p:"")})}function Sw(o,c){o.info(function(){return"TIMEOUT: "+c})}yi.prototype.info=function(){};function Iw(o,c){if(!o.g)return c;if(!c)return null;try{var h=JSON.parse(c);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var p=h[o];if(!(2>p.length)){var N=p[1];if(Array.isArray(N)&&!(1>N.length)){var R=N[0];if(R!="noop"&&R!="stop"&&R!="close")for(var z=1;z<N.length;z++)N[z]=""}}}}return Tu(h)}catch{return c}}var Xa={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Ff={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ru;function Ya(){}A(Ya,Nu),Ya.prototype.g=function(){return new XMLHttpRequest},Ya.prototype.i=function(){return{}},Ru=new Ya;function Gn(o,c,h,p){this.j=o,this.i=c,this.l=h,this.R=p||1,this.U=new Zt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Vf}function Vf(){this.i=null,this.g="",this.h=!1}var zf={},Ou={};function Du(o,c,h){o.L=1,o.v=to(kn(c)),o.m=h,o.P=!0,$f(o,null)}function $f(o,c){o.F=Date.now(),Ja(o),o.A=kn(o.v);var h=o.A,p=o.R;Array.isArray(p)||(p=[String(p)]),np(h.i,"t",p),o.C=0,h=o.j.J,o.h=new Vf,o.g=wp(o.j,h?c:null,!o.m),0<o.O&&(o.M=new Wa(v(o.Y,o,o.g),o.O)),c=o.U,h=o.g,p=o.ca;var N="readystatechange";Array.isArray(N)||(N&&(Pf[0]=N.toString()),N=Pf);for(var R=0;R<N.length;R++){var z=ve(h,N[R],p||c.handleEvent,!1,c.h||c);if(!z)break;c.g[z.key]=z}c=o.H?m(o.H):{},o.m?(o.u||(o.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,c)):(o.u="GET",o.g.ea(o.A,o.u,null,c)),mi(),_w(o.i,o.u,o.A,o.l,o.R,o.m)}Gn.prototype.ca=function(o){o=o.target;const c=this.M;c&&_n(o)==3?c.j():this.Y(o)},Gn.prototype.Y=function(o){try{if(o==this.g)e:{const _t=_n(this.g);var c=this.g.Ba();const gs=this.g.Z();if(!(3>_t)&&(_t!=3||this.g&&(this.h.h||this.g.oa()||up(this.g)))){this.J||_t!=4||c==7||(c==8||0>=gs?mi(3):mi(2)),Lu(this);var h=this.g.Z();this.X=h;t:if(Bf(this)){var p=up(this.g);o="";var N=p.length,R=_n(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Mr(this),vi(this);var z="";break t}this.h.i=new l.TextDecoder}for(c=0;c<N;c++)this.h.h=!0,o+=this.h.i.decode(p[c],{stream:!(R&&c==N-1)});p.length=0,this.h.g+=o,this.C=0,z=this.h.g}else z=this.g.oa();if(this.o=h==200,Ew(this.i,this.u,this.A,this.l,this.R,_t,h),this.o){if(this.T&&!this.K){t:{if(this.g){var we,Qe=this.g;if((we=Qe.g?Qe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!x(we)){var de=we;break t}}de=null}if(h=de)fs(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Mu(this,h);else{this.o=!1,this.s=3,gt(12),Mr(this),vi(this);break e}}if(this.P){h=!0;let en;for(;!this.J&&this.C<z.length;)if(en=Cw(this,z),en==Ou){_t==4&&(this.s=4,gt(14),h=!1),fs(this.i,this.l,null,"[Incomplete Response]");break}else if(en==zf){this.s=4,gt(15),fs(this.i,this.l,z,"[Invalid Chunk]"),h=!1;break}else fs(this.i,this.l,en,null),Mu(this,en);if(Bf(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),_t!=4||z.length!=0||this.h.h||(this.s=1,gt(16),h=!1),this.o=this.o&&h,!h)fs(this.i,this.l,z,"[Invalid Chunked Response]"),Mr(this),vi(this);else if(0<z.length&&!this.W){this.W=!0;var st=this.j;st.g==this&&st.ba&&!st.M&&(st.j.info("Great, no buffering proxy detected. Bytes received: "+z.length),$u(st),st.M=!0,gt(11))}}else fs(this.i,this.l,z,null),Mu(this,z);_t==4&&Mr(this),this.o&&!this.J&&(_t==4?gp(this.j,this):(this.o=!1,Ja(this)))}else qw(this.g),h==400&&0<z.indexOf("Unknown SID")?(this.s=3,gt(12)):(this.s=0,gt(13)),Mr(this),vi(this)}}}catch{}finally{}};function Bf(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Cw(o,c){var h=o.C,p=c.indexOf(`
`,h);return p==-1?Ou:(h=Number(c.substring(h,p)),isNaN(h)?zf:(p+=1,p+h>c.length?Ou:(c=c.slice(p,p+h),o.C=p+h,c)))}Gn.prototype.cancel=function(){this.J=!0,Mr(this)};function Ja(o){o.S=Date.now()+o.I,qf(o,o.I)}function qf(o,c){if(o.B!=null)throw Error("WatchDog timer not null");o.B=gi(v(o.ba,o),c)}function Lu(o){o.B&&(l.clearTimeout(o.B),o.B=null)}Gn.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Sw(this.i,this.A),this.L!=2&&(mi(),gt(17)),Mr(this),this.s=2,vi(this)):qf(this,this.S-o)};function vi(o){o.j.G==0||o.J||gp(o.j,o)}function Mr(o){Lu(o);var c=o.M;c&&typeof c.ma=="function"&&c.ma(),o.M=null,Rf(o.U),o.g&&(c=o.g,o.g=null,c.abort(),c.ma())}function Mu(o,c){try{var h=o.j;if(h.G!=0&&(h.g==o||ju(h.h,o))){if(!o.K&&ju(h.h,o)&&h.G==3){try{var p=h.Da.g.parse(c)}catch{p=null}if(Array.isArray(p)&&p.length==3){var N=p;if(N[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)oo(h),io(h);else break e;zu(h),gt(18)}}else h.za=N[1],0<h.za-h.T&&37500>N[2]&&h.F&&h.v==0&&!h.C&&(h.C=gi(v(h.Za,h),6e3));if(1>=Gf(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else Ur(h,11)}else if((o.K||h.g==o)&&oo(h),!x(c))for(N=h.Da.g.parse(c),c=0;c<N.length;c++){let de=N[c];if(h.T=de[0],de=de[1],h.G==2)if(de[0]=="c"){h.K=de[1],h.ia=de[2];const st=de[3];st!=null&&(h.la=st,h.j.info("VER="+h.la));const _t=de[4];_t!=null&&(h.Aa=_t,h.j.info("SVER="+h.Aa));const gs=de[5];gs!=null&&typeof gs=="number"&&0<gs&&(p=1.5*gs,h.L=p,h.j.info("backChannelRequestTimeoutMs_="+p)),p=h;const en=o.g;if(en){const uo=en.g?en.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(uo){var R=p.h;R.g||uo.indexOf("spdy")==-1&&uo.indexOf("quic")==-1&&uo.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Uu(R,R.h),R.h=null))}if(p.D){const Bu=en.g?en.g.getResponseHeader("X-HTTP-Session-Id"):null;Bu&&(p.ya=Bu,be(p.I,p.D,Bu))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),p=h;var z=o;if(p.qa=bp(p,p.J?p.ia:null,p.W),z.K){Wf(p.h,z);var we=z,Qe=p.L;Qe&&(we.I=Qe),we.B&&(Lu(we),Ja(we)),p.g=z}else pp(p);0<h.i.length&&ao(h)}else de[0]!="stop"&&de[0]!="close"||Ur(h,7);else h.G==3&&(de[0]=="stop"||de[0]=="close"?de[0]=="stop"?Ur(h,7):Vu(h):de[0]!="noop"&&h.l&&h.l.ta(de),h.v=0)}}mi(4)}catch{}}var Tw=class{constructor(o,c){this.g=o,this.map=c}};function Hf(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Kf(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Gf(o){return o.h?1:o.g?o.g.size:0}function ju(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function Uu(o,c){o.g?o.g.add(c):o.h=c}function Wf(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}Hf.prototype.cancel=function(){if(this.i=Qf(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Qf(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const h of o.g.values())c=c.concat(h.D);return c}return P(o.i)}function Nw(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var c=[],h=o.length,p=0;p<h;p++)c.push(o[p]);return c}c=[],h=0;for(p in o)c[h++]=o[p];return c}function Aw(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var c=[];o=o.length;for(var h=0;h<o;h++)c.push(h);return c}c=[],h=0;for(const p in o)c[h++]=p;return c}}}function Xf(o,c){if(o.forEach&&typeof o.forEach=="function")o.forEach(c,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,c,void 0);else for(var h=Aw(o),p=Nw(o),N=p.length,R=0;R<N;R++)c.call(void 0,p[R],h&&h[R],o)}var Yf=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Pw(o,c){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var p=o[h].indexOf("="),N=null;if(0<=p){var R=o[h].substring(0,p);N=o[h].substring(p+1)}else R=o[h];c(R,N?decodeURIComponent(N.replace(/\+/g," ")):"")}}}function jr(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof jr){this.h=o.h,Za(this,o.j),this.o=o.o,this.g=o.g,eo(this,o.s),this.l=o.l;var c=o.i,h=new xi;h.i=c.i,c.g&&(h.g=new Map(c.g),h.h=c.h),Jf(this,h),this.m=o.m}else o&&(c=String(o).match(Yf))?(this.h=!1,Za(this,c[1]||"",!0),this.o=bi(c[2]||""),this.g=bi(c[3]||"",!0),eo(this,c[4]),this.l=bi(c[5]||"",!0),Jf(this,c[6]||"",!0),this.m=bi(c[7]||"")):(this.h=!1,this.i=new xi(null,this.h))}jr.prototype.toString=function(){var o=[],c=this.j;c&&o.push(wi(c,Zf,!0),":");var h=this.g;return(h||c=="file")&&(o.push("//"),(c=this.o)&&o.push(wi(c,Zf,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(wi(h,h.charAt(0)=="/"?Dw:Ow,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",wi(h,Mw)),o.join("")};function kn(o){return new jr(o)}function Za(o,c,h){o.j=h?bi(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function eo(o,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);o.s=c}else o.s=null}function Jf(o,c,h){c instanceof xi?(o.i=c,jw(o.i,o.h)):(h||(c=wi(c,Lw)),o.i=new xi(c,o.h))}function be(o,c,h){o.i.set(c,h)}function to(o){return be(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function bi(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function wi(o,c,h){return typeof o=="string"?(o=encodeURI(o).replace(c,Rw),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Rw(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Zf=/[#\/\?@]/g,Ow=/[#\?:]/g,Dw=/[#\?]/g,Lw=/[#\?@]/g,Mw=/#/g;function xi(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function Wn(o){o.g||(o.g=new Map,o.h=0,o.i&&Pw(o.i,function(c,h){o.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}t=xi.prototype,t.add=function(o,c){Wn(this),this.i=null,o=ps(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(c),this.h+=1,this};function ep(o,c){Wn(o),c=ps(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function tp(o,c){return Wn(o),c=ps(o,c),o.g.has(c)}t.forEach=function(o,c){Wn(this),this.g.forEach(function(h,p){h.forEach(function(N){o.call(c,N,p,this)},this)},this)},t.na=function(){Wn(this);const o=Array.from(this.g.values()),c=Array.from(this.g.keys()),h=[];for(let p=0;p<c.length;p++){const N=o[p];for(let R=0;R<N.length;R++)h.push(c[p])}return h},t.V=function(o){Wn(this);let c=[];if(typeof o=="string")tp(this,o)&&(c=c.concat(this.g.get(ps(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)c=c.concat(o[h])}return c},t.set=function(o,c){return Wn(this),this.i=null,o=ps(this,o),tp(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},t.get=function(o,c){return o?(o=this.V(o),0<o.length?String(o[0]):c):c};function np(o,c,h){ep(o,c),0<h.length&&(o.i=null,o.g.set(ps(o,c),P(h)),o.h+=h.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(var h=0;h<c.length;h++){var p=c[h];const R=encodeURIComponent(String(p)),z=this.V(p);for(p=0;p<z.length;p++){var N=R;z[p]!==""&&(N+="="+encodeURIComponent(String(z[p]))),o.push(N)}}return this.i=o.join("&")};function ps(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function jw(o,c){c&&!o.j&&(Wn(o),o.i=null,o.g.forEach(function(h,p){var N=p.toLowerCase();p!=N&&(ep(this,p),np(this,N,h))},o)),o.j=c}function Uw(o,c){const h=new yi;if(l.Image){const p=new Image;p.onload=C(Qn,h,"TestLoadImage: loaded",!0,c,p),p.onerror=C(Qn,h,"TestLoadImage: error",!1,c,p),p.onabort=C(Qn,h,"TestLoadImage: abort",!1,c,p),p.ontimeout=C(Qn,h,"TestLoadImage: timeout",!1,c,p),l.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else c(!1)}function Fw(o,c){const h=new yi,p=new AbortController,N=setTimeout(()=>{p.abort(),Qn(h,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:p.signal}).then(R=>{clearTimeout(N),R.ok?Qn(h,"TestPingServer: ok",!0,c):Qn(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(N),Qn(h,"TestPingServer: error",!1,c)})}function Qn(o,c,h,p,N){try{N&&(N.onload=null,N.onerror=null,N.onabort=null,N.ontimeout=null),p(h)}catch{}}function Vw(){this.g=new kw}function zw(o,c,h){const p=h||"";try{Xf(o,function(N,R){let z=N;d(N)&&(z=Tu(N)),c.push(p+R+"="+encodeURIComponent(z))})}catch(N){throw c.push(p+"type="+encodeURIComponent("_badmap")),N}}function no(o){this.l=o.Ub||null,this.j=o.eb||!1}A(no,Nu),no.prototype.g=function(){return new ro(this.l,this.j)},no.prototype.i=function(o){return function(){return o}}({});function ro(o,c){Be.call(this),this.D=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}A(ro,Be),t=ro.prototype,t.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=c,this.readyState=1,_i(this)},t.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(c.body=o),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ki(this)),this.readyState=0},t.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,_i(this)),this.g&&(this.readyState=3,_i(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;rp(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function rp(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}t.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?ki(this):_i(this),this.readyState==3&&rp(this)}},t.Ra=function(o){this.g&&(this.response=this.responseText=o,ki(this))},t.Qa=function(o){this.g&&(this.response=o,ki(this))},t.ga=function(){this.g&&ki(this)};function ki(o){o.readyState=4,o.l=null,o.j=null,o.v=null,_i(o)}t.setRequestHeader=function(o,c){this.u.append(o,c)},t.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=c.next();return o.join(`\r
`)};function _i(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ro.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function sp(o){let c="";return F(o,function(h,p){c+=p,c+=":",c+=h,c+=`\r
`}),c}function Fu(o,c,h){e:{for(p in h){var p=!1;break e}p=!0}p||(h=sp(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):be(o,c,h))}function Ae(o){Be.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}A(Ae,Be);var $w=/^https?$/i,Bw=["POST","PUT"];t=Ae.prototype,t.Ha=function(o){this.J=o},t.ea=function(o,c,h,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ru.g(),this.v=this.o?Of(this.o):Of(Ru),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(R){ip(this,R);return}if(o=h||"",h=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var N in p)h.set(N,p[N]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const R of p.keys())h.set(R,p.get(R));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(h.keys()).find(R=>R.toLowerCase()=="content-type"),N=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Bw,c,void 0))||p||N||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,z]of h)this.g.setRequestHeader(R,z);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{lp(this),this.u=!0,this.g.send(o),this.u=!1}catch(R){ip(this,R)}};function ip(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.m=5,ap(o),so(o)}function ap(o){o.A||(o.A=!0,We(o,"complete"),We(o,"error"))}t.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,We(this,"complete"),We(this,"abort"),so(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),so(this,!0)),Ae.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?op(this):this.bb())},t.bb=function(){op(this)};function op(o){if(o.h&&typeof a<"u"&&(!o.v[1]||_n(o)!=4||o.Z()!=2)){if(o.u&&_n(o)==4)oe(o.Ea,0,o);else if(We(o,"readystatechange"),_n(o)==4){o.h=!1;try{const z=o.Z();e:switch(z){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var h;if(!(h=c)){var p;if(p=z===0){var N=String(o.D).match(Yf)[1]||null;!N&&l.self&&l.self.location&&(N=l.self.location.protocol.slice(0,-1)),p=!$w.test(N?N.toLowerCase():"")}h=p}if(h)We(o,"complete"),We(o,"success");else{o.m=6;try{var R=2<_n(o)?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.Z()+"]",ap(o)}}finally{so(o)}}}}function so(o,c){if(o.g){lp(o);const h=o.g,p=o.v[0]?()=>{}:null;o.g=null,o.v=null,c||We(o,"ready");try{h.onreadystatechange=p}catch{}}}function lp(o){o.I&&(l.clearTimeout(o.I),o.I=null)}t.isActive=function(){return!!this.g};function _n(o){return o.g?o.g.readyState:0}t.Z=function(){try{return 2<_n(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),xw(c)}};function up(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function qw(o){const c={};o=(o.g&&2<=_n(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(x(o[p]))continue;var h=I(o[p]);const N=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const R=c[N]||[];c[N]=R,R.push(h)}w(c,function(p){return p.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ei(o,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||c}function cp(o){this.Aa=0,this.i=[],this.j=new yi,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ei("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ei("baseRetryDelayMs",5e3,o),this.cb=Ei("retryDelaySeedMs",1e4,o),this.Wa=Ei("forwardChannelMaxRetries",2,o),this.wa=Ei("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Hf(o&&o.concurrentRequestLimit),this.Da=new Vw,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=cp.prototype,t.la=8,t.G=1,t.connect=function(o,c,h,p){gt(0),this.W=o,this.H=c||{},h&&p!==void 0&&(this.H.OSID=h,this.H.OAID=p),this.F=this.X,this.I=bp(this,null,this.W),ao(this)};function Vu(o){if(hp(o),o.G==3){var c=o.U++,h=kn(o.I);if(be(h,"SID",o.K),be(h,"RID",c),be(h,"TYPE","terminate"),Si(o,h),c=new Gn(o,o.j,c),c.L=2,c.v=to(kn(h)),h=!1,l.navigator&&l.navigator.sendBeacon)try{h=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!h&&l.Image&&(new Image().src=c.v,h=!0),h||(c.g=wp(c.j,null),c.g.ea(c.v)),c.F=Date.now(),Ja(c)}vp(o)}function io(o){o.g&&($u(o),o.g.cancel(),o.g=null)}function hp(o){io(o),o.u&&(l.clearTimeout(o.u),o.u=null),oo(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function ao(o){if(!Kf(o.h)&&!o.s){o.s=!0;var c=o.Ga;Wt||te(),$||(Wt(),$=!0),X.add(c,o),o.B=0}}function Hw(o,c){return Gf(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=c.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=gi(v(o.Ga,o,c),yp(o,o.B)),o.B++,!0)}t.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const N=new Gn(this,this.j,o);let R=this.o;if(this.S&&(R?(R=m(R),k(R,this.S)):R=this.S),this.m!==null||this.O||(N.H=R,R=null),this.P)e:{for(var c=0,h=0;h<this.i.length;h++){t:{var p=this.i[h];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(c+=p,4096<c){c=h;break e}if(c===4096||h===this.i.length-1){c=h+1;break e}}c=1e3}else c=1e3;c=fp(this,N,c),h=kn(this.I),be(h,"RID",o),be(h,"CVER",22),this.D&&be(h,"X-HTTP-Session-Id",this.D),Si(this,h),R&&(this.O?c="headers="+encodeURIComponent(String(sp(R)))+"&"+c:this.m&&Fu(h,this.m,R)),Uu(this.h,N),this.Ua&&be(h,"TYPE","init"),this.P?(be(h,"$req",c),be(h,"SID","null"),N.T=!0,Du(N,h,null)):Du(N,h,c),this.G=2}}else this.G==3&&(o?dp(this,o):this.i.length==0||Kf(this.h)||dp(this))};function dp(o,c){var h;c?h=c.l:h=o.U++;const p=kn(o.I);be(p,"SID",o.K),be(p,"RID",h),be(p,"AID",o.T),Si(o,p),o.m&&o.o&&Fu(p,o.m,o.o),h=new Gn(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),c&&(o.i=c.D.concat(o.i)),c=fp(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Uu(o.h,h),Du(h,p,c)}function Si(o,c){o.H&&F(o.H,function(h,p){be(c,p,h)}),o.l&&Xf({},function(h,p){be(c,p,h)})}function fp(o,c,h){h=Math.min(o.i.length,h);var p=o.l?v(o.l.Na,o.l,o):null;e:{var N=o.i;let R=-1;for(;;){const z=["count="+h];R==-1?0<h?(R=N[0].g,z.push("ofs="+R)):R=0:z.push("ofs="+R);let we=!0;for(let Qe=0;Qe<h;Qe++){let de=N[Qe].g;const st=N[Qe].map;if(de-=R,0>de)R=Math.max(0,N[Qe].g-100),we=!1;else try{zw(st,z,"req"+de+"_")}catch{p&&p(st)}}if(we){p=z.join("&");break e}}}return o=o.i.splice(0,h),c.D=o,p}function pp(o){if(!o.g&&!o.u){o.Y=1;var c=o.Fa;Wt||te(),$||(Wt(),$=!0),X.add(c,o),o.v=0}}function zu(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=gi(v(o.Fa,o),yp(o,o.v)),o.v++,!0)}t.Fa=function(){if(this.u=null,mp(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=gi(v(this.ab,this),o)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,gt(10),io(this),mp(this))};function $u(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function mp(o){o.g=new Gn(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var c=kn(o.qa);be(c,"RID","rpc"),be(c,"SID",o.K),be(c,"AID",o.T),be(c,"CI",o.F?"0":"1"),!o.F&&o.ja&&be(c,"TO",o.ja),be(c,"TYPE","xmlhttp"),Si(o,c),o.m&&o.o&&Fu(c,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=to(kn(c)),h.m=null,h.P=!0,$f(h,o)}t.Za=function(){this.C!=null&&(this.C=null,io(this),zu(this),gt(19))};function oo(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function gp(o,c){var h=null;if(o.g==c){oo(o),$u(o),o.g=null;var p=2}else if(ju(o.h,c))h=c.D,Wf(o.h,c),p=1;else return;if(o.G!=0){if(c.o)if(p==1){h=c.m?c.m.length:0,c=Date.now()-c.F;var N=o.B;p=Qa(),We(p,new Uf(p,h)),ao(o)}else pp(o);else if(N=c.s,N==3||N==0&&0<c.X||!(p==1&&Hw(o,c)||p==2&&zu(o)))switch(h&&0<h.length&&(c=o.h,c.i=c.i.concat(h)),N){case 1:Ur(o,5);break;case 4:Ur(o,10);break;case 3:Ur(o,6);break;default:Ur(o,2)}}}function yp(o,c){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*c}function Ur(o,c){if(o.j.info("Error code "+c),c==2){var h=v(o.fb,o),p=o.Xa;const N=!p;p=new jr(p||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Za(p,"https"),to(p),N?Uw(p.toString(),h):Fw(p.toString(),h)}else gt(2);o.G=0,o.l&&o.l.sa(c),vp(o),hp(o)}t.fb=function(o){o?(this.j.info("Successfully pinged google.com"),gt(2)):(this.j.info("Failed to ping google.com"),gt(1))};function vp(o){if(o.G=0,o.ka=[],o.l){const c=Qf(o.h);(c.length!=0||o.i.length!=0)&&(M(o.ka,c),M(o.ka,o.i),o.h.i.length=0,P(o.i),o.i.length=0),o.l.ra()}}function bp(o,c,h){var p=h instanceof jr?kn(h):new jr(h);if(p.g!="")c&&(p.g=c+"."+p.g),eo(p,p.s);else{var N=l.location;p=N.protocol,c=c?c+"."+N.hostname:N.hostname,N=+N.port;var R=new jr(null);p&&Za(R,p),c&&(R.g=c),N&&eo(R,N),h&&(R.l=h),p=R}return h=o.D,c=o.ya,h&&c&&be(p,h,c),be(p,"VER",o.la),Si(o,p),p}function wp(o,c,h){if(c&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Ca&&!o.pa?new Ae(new no({eb:h})):new Ae(o.pa),c.Ha(o.J),c}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function xp(){}t=xp.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function lo(){}lo.prototype.g=function(o,c){return new Rt(o,c)};function Rt(o,c){Be.call(this),this.g=new cp(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(o?o["X-WebChannel-Client-Profile"]=c.va:o={"X-WebChannel-Client-Profile":c.va}),this.g.S=o,(o=c&&c.Sb)&&!x(o)&&(this.g.m=o),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!x(c)&&(this.g.D=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new ms(this)}A(Rt,Be),Rt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Rt.prototype.close=function(){Vu(this.g)},Rt.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=Tu(o),o=h);c.i.push(new Tw(c.Ya++,o)),c.G==3&&ao(c)},Rt.prototype.N=function(){this.g.l=null,delete this.j,Vu(this.g),delete this.g,Rt.aa.N.call(this)};function kp(o){Au.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(const h in c){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}A(kp,Au);function _p(){Pu.call(this),this.status=1}A(_p,Pu);function ms(o){this.g=o}A(ms,xp),ms.prototype.ua=function(){We(this.g,"a")},ms.prototype.ta=function(o){We(this.g,new kp(o))},ms.prototype.sa=function(o){We(this.g,new _p)},ms.prototype.ra=function(){We(this.g,"b")},lo.prototype.createWebChannel=lo.prototype.g,Rt.prototype.send=Rt.prototype.o,Rt.prototype.open=Rt.prototype.m,Rt.prototype.close=Rt.prototype.close,ob=function(){return new lo},ab=function(){return Qa()},ib=Lr,Ph={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Xa.NO_ERROR=0,Xa.TIMEOUT=8,Xa.HTTP_ERROR=6,Yo=Xa,Ff.COMPLETE="complete",sb=Ff,Df.EventType=pi,pi.OPEN="a",pi.CLOSE="b",pi.ERROR="c",pi.MESSAGE="d",Be.prototype.listen=Be.prototype.K,Vi=Df,Ae.prototype.listenOnce=Ae.prototype.L,Ae.prototype.getLastError=Ae.prototype.Ka,Ae.prototype.getLastErrorCode=Ae.prototype.Ba,Ae.prototype.getStatus=Ae.prototype.Z,Ae.prototype.getResponseJson=Ae.prototype.Oa,Ae.prototype.getResponseText=Ae.prototype.oa,Ae.prototype.send=Ae.prototype.ea,Ae.prototype.setWithCredentials=Ae.prototype.Ha,rb=Ae}).apply(typeof No<"u"?No:typeof self<"u"?self:typeof window<"u"?window:{});const og="@firebase/firestore";/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class ut{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ut.UNAUTHENTICATED=new ut(null),ut.GOOGLE_CREDENTIALS=new ut("google-credentials-uid"),ut.FIRST_PARTY=new ut("first-party-uid"),ut.MOCK_USER=new ut("mock-user");/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/let hi="10.14.0";/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const ss=new Vd("@firebase/firestore");function Di(){return ss.logLevel}function K(t,...e){if(ss.logLevel<=ae.DEBUG){const n=e.map(Yd);ss.debug(`Firestore (${hi}): ${t}`,...n)}}function Vn(t,...e){if(ss.logLevel<=ae.ERROR){const n=e.map(Yd);ss.error(`Firestore (${hi}): ${t}`,...n)}}function Zs(t,...e){if(ss.logLevel<=ae.WARN){const n=e.map(Yd);ss.warn(`Firestore (${hi}): ${t}`,...n)}}function Yd(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(t)}catch{return t}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function J(t="Unexpected state"){const e=`FIRESTORE (${hi}) INTERNAL ASSERTION FAILED: `+t;throw Vn(e),new Error(e)}function me(t,e){t||J()}function ee(t,e){return t}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const D={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class W extends Bn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Xr{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class lb{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class e2{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(ut.UNAUTHENTICATED))}shutdown(){}}class t2{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class n2{constructor(e){this.t=e,this.currentUser=ut.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){me(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let i=new Xr;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Xr,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{K("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(K("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Xr)}},0),a()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(K("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(me(typeof r.accessToken=="string"),new lb(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return me(e===null||typeof e=="string"),new ut(e)}}class r2{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=ut.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class s2{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new r2(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(ut.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class i2{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class a2{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){me(this.o===void 0);const r=i=>{i.error!=null&&K("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.R;return this.R=i.token,K("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{K("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):K("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(me(typeof n.token=="string"),this.R=n.token,new i2(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function o2(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class ub{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=o2(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function ce(t,e){return t<e?-1:t>e?1:0}function ei(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class ze{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new W(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new W(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new W(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new W(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ze.fromMillis(Date.now())}static fromDate(e){return ze.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new ze(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ce(this.nanoseconds,e.nanoseconds):ce(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Z{constructor(e){this.timestamp=e}static fromTimestamp(e){return new Z(e)}static min(){return new Z(new ze(0,0))}static max(){return new Z(new ze(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class _a{constructor(e,n,r){n===void 0?n=0:n>e.length&&J(),r===void 0?r=e.length-n:r>e.length-n&&J(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return _a.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof _a?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),a=n.get(s);if(i<a)return-1;if(i>a)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Ee extends _a{construct(e,n,r){return new Ee(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new W(D.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new Ee(n)}static emptyPath(){return new Ee([])}}const l2=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Je extends _a{construct(e,n,r){return new Je(e,n,r)}static isValidIdentifier(e){return l2.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Je.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Je(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new W(D.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new W(D.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new W(D.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new W(D.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Je(n)}static emptyPath(){return new Je([])}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Q{constructor(e){this.path=e}static fromPath(e){return new Q(Ee.fromString(e))}static fromName(e){return new Q(Ee.fromString(e).popFirst(5))}static empty(){return new Q(Ee.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ee.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Ee.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Q(new Ee(e.slice()))}}function u2(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=Z.fromTimestamp(r===1e9?new ze(n+1,0):new ze(n,r));return new Sr(s,Q.empty(),e)}function c2(t){return new Sr(t.readTime,t.key,-1)}class Sr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Sr(Z.min(),Q.empty(),-1)}static max(){return new Sr(Z.max(),Q.empty(),-1)}}function h2(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=Q.comparator(t.documentKey,e.documentKey),n!==0?n:ce(t.largestBatchId,e.largestBatchId))}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const d2="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class f2{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function Va(t){if(t.code!==D.FAILED_PRECONDITION||t.message!==d2)throw t;K("LocalStore","Unexpectedly lost primary lease")}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class L{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&J(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new L((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof L?n:L.resolve(n)}catch(n){return L.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):L.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):L.reject(n)}static resolve(e){return new L((n,r)=>{n(e)})}static reject(e){return new L((n,r)=>{r(e)})}static waitFor(e){return new L((n,r)=>{let s=0,i=0,a=!1;e.forEach(l=>{++s,l.next(()=>{++i,a&&i===s&&n()},u=>r(u))}),a=!0,i===s&&n()})}static or(e){let n=L.resolve(!1);for(const r of e)n=n.next(s=>s?L.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new L((r,s)=>{const i=e.length,a=new Array(i);let l=0;for(let u=0;u<i;u++){const d=u;n(e[d]).next(f=>{a[d]=f,++l,l===i&&r(a)},f=>s(f))}})}static doWhile(e,n){return new L((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function p2(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function za(t){return t.name==="IndexedDbTransactionError"}/**
* @license
* Copyright 2018 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Jd{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Jd.oe=-1;function uu(t){return t==null}function Dl(t){return t===0&&1/t==-1/0}function m2(t){return typeof t=="number"&&Number.isInteger(t)&&!Dl(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function lg(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function us(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function cb(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Ne{constructor(e,n){this.comparator=e,this.root=n||Ye.EMPTY}insert(e,n){return new Ne(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Ye.BLACK,null,null))}remove(e){return new Ne(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ye.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ao(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ao(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ao(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ao(this.root,e,this.comparator,!0)}}class Ao{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ye{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??Ye.RED,this.left=s??Ye.EMPTY,this.right=i??Ye.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new Ye(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ye.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return Ye.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ye.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ye.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw J();const e=this.left.check();if(e!==this.right.check())throw J();return e+(this.isRed()?0:1)}}Ye.EMPTY=null,Ye.RED=!0,Ye.BLACK=!1;Ye.EMPTY=new class{constructor(){this.size=0}get key(){throw J()}get value(){throw J()}get color(){throw J()}get left(){throw J()}get right(){throw J()}copy(t,e,n,r,s){return this}insert(t,e,n){return new Ye(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class et{constructor(e){this.comparator=e,this.data=new Ne(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new ug(this.data.getIterator())}getIteratorFrom(e){return new ug(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof et)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new et(this.comparator);return n.data=e,n}}class ug{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Mt{constructor(e){this.fields=e,e.sort(Je.comparator)}static empty(){return new Mt([])}unionWith(e){let n=new et(Je.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Mt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return ei(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class hb extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class nt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(r){try{return atob(r)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new hb("Invalid base64 string: "+s):s}}(e);return new nt(n)}static fromUint8Array(e){const n=function(r){let s="";for(let i=0;i<r.length;++i)s+=String.fromCharCode(r[i]);return s}(e);return new nt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let r=0;r<e.length;r++)n[r]=e.charCodeAt(r);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ce(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}nt.EMPTY_BYTE_STRING=new nt("");const g2=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ir(t){if(me(!!t),typeof t=="string"){let e=0;const n=g2.exec(t);if(me(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:De(t.seconds),nanos:De(t.nanos)}}function De(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function is(t){return typeof t=="string"?nt.fromBase64String(t):nt.fromUint8Array(t)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Zd(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function ef(t){const e=t.mapValue.fields.__previous_value__;return Zd(e)?ef(e):e}function Ea(t){const e=Ir(t.mapValue.fields.__local_write_time__.timestampValue);return new ze(e.seconds,e.nanos)}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class y2{constructor(e,n,r,s,i,a,l,u,d){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=d}}class Sa{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new Sa("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Sa&&e.projectId===this.projectId&&e.database===this.database}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const Po={mapValue:{}};function as(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Zd(t)?4:b2(t)?9007199254740991:v2(t)?10:11:J()}function bn(t,e){if(t===e)return!0;const n=as(t);if(n!==as(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Ea(t).isEqual(Ea(e));case 3:return function(r,s){if(typeof r.timestampValue=="string"&&typeof s.timestampValue=="string"&&r.timestampValue.length===s.timestampValue.length)return r.timestampValue===s.timestampValue;const i=Ir(r.timestampValue),a=Ir(s.timestampValue);return i.seconds===a.seconds&&i.nanos===a.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(r,s){return is(r.bytesValue).isEqual(is(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(r,s){return De(r.geoPointValue.latitude)===De(s.geoPointValue.latitude)&&De(r.geoPointValue.longitude)===De(s.geoPointValue.longitude)}(t,e);case 2:return function(r,s){if("integerValue"in r&&"integerValue"in s)return De(r.integerValue)===De(s.integerValue);if("doubleValue"in r&&"doubleValue"in s){const i=De(r.doubleValue),a=De(s.doubleValue);return i===a?Dl(i)===Dl(a):isNaN(i)&&isNaN(a)}return!1}(t,e);case 9:return ei(t.arrayValue.values||[],e.arrayValue.values||[],bn);case 10:case 11:return function(r,s){const i=r.mapValue.fields||{},a=s.mapValue.fields||{};if(lg(i)!==lg(a))return!1;for(const l in i)if(i.hasOwnProperty(l)&&(a[l]===void 0||!bn(i[l],a[l])))return!1;return!0}(t,e);default:return J()}}function Ia(t,e){return(t.values||[]).find(n=>bn(n,e))!==void 0}function ti(t,e){if(t===e)return 0;const n=as(t),r=as(e);if(n!==r)return ce(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return ce(t.booleanValue,e.booleanValue);case 2:return function(s,i){const a=De(s.integerValue||s.doubleValue),l=De(i.integerValue||i.doubleValue);return a<l?-1:a>l?1:a===l?0:isNaN(a)?isNaN(l)?0:-1:1}(t,e);case 3:return cg(t.timestampValue,e.timestampValue);case 4:return cg(Ea(t),Ea(e));case 5:return ce(t.stringValue,e.stringValue);case 6:return function(s,i){const a=is(s),l=is(i);return a.compareTo(l)}(t.bytesValue,e.bytesValue);case 7:return function(s,i){const a=s.split("/"),l=i.split("/");for(let u=0;u<a.length&&u<l.length;u++){const d=ce(a[u],l[u]);if(d!==0)return d}return ce(a.length,l.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,i){const a=ce(De(s.latitude),De(i.latitude));return a!==0?a:ce(De(s.longitude),De(i.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return hg(t.arrayValue,e.arrayValue);case 10:return function(s,i){var a,l,u,d;const f=s.fields||{},y=i.fields||{},v=(a=f.value)===null||a===void 0?void 0:a.arrayValue,C=(l=y.value)===null||l===void 0?void 0:l.arrayValue,A=ce(((u=v==null?void 0:v.values)===null||u===void 0?void 0:u.length)||0,((d=C==null?void 0:C.values)===null||d===void 0?void 0:d.length)||0);return A!==0?A:hg(v,C)}(t.mapValue,e.mapValue);case 11:return function(s,i){if(s===Po.mapValue&&i===Po.mapValue)return 0;if(s===Po.mapValue)return 1;if(i===Po.mapValue)return-1;const a=s.fields||{},l=Object.keys(a),u=i.fields||{},d=Object.keys(u);l.sort(),d.sort();for(let f=0;f<l.length&&f<d.length;++f){const y=ce(l[f],d[f]);if(y!==0)return y;const v=ti(a[l[f]],u[d[f]]);if(v!==0)return v}return ce(l.length,d.length)}(t.mapValue,e.mapValue);default:throw J()}}function cg(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ce(t,e);const n=Ir(t),r=Ir(e),s=ce(n.seconds,r.seconds);return s!==0?s:ce(n.nanos,r.nanos)}function hg(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=ti(n[s],r[s]);if(i)return i}return ce(n.length,r.length)}function ni(t){return Rh(t)}function Rh(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(e){const n=Ir(e);return`time(${n.seconds},${n.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(e){return is(e).toBase64()}(t.bytesValue):"referenceValue"in t?function(e){return Q.fromName(e).toString()}(t.referenceValue):"geoPointValue"in t?function(e){return`geo(${e.latitude},${e.longitude})`}(t.geoPointValue):"arrayValue"in t?function(e){let n="[",r=!0;for(const s of e.values||[])r?r=!1:n+=",",n+=Rh(s);return n+"]"}(t.arrayValue):"mapValue"in t?function(e){const n=Object.keys(e.fields||{}).sort();let r="{",s=!0;for(const i of n)s?s=!1:r+=",",r+=`${i}:${Rh(e.fields[i])}`;return r+"}"}(t.mapValue):J()}function Oh(t){return!!t&&"integerValue"in t}function tf(t){return!!t&&"arrayValue"in t}function dg(t){return!!t&&"nullValue"in t}function fg(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Jo(t){return!!t&&"mapValue"in t}function v2(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function ea(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return us(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=ea(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=ea(t.arrayValue.values[n]);return e}return Object.assign({},t)}function b2(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class It{constructor(e){this.value=e}static empty(){return new It({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Jo(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=ea(n)}setAll(e){let n=Je.emptyPath(),r={},s=[];e.forEach((a,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,s),r={},s=[],n=l.popLast()}a?r[l.lastSegment()]=ea(a):s.push(l.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());Jo(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return bn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];Jo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){us(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new It(ea(this.value))}}function db(t){const e=[];return us(t.fields,(n,r)=>{const s=new Je([n]);if(Jo(r)){const i=db(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new Mt(e)}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class ht{constructor(e,n,r,s,i,a,l){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(e){return new ht(e,0,Z.min(),Z.min(),Z.min(),It.empty(),0)}static newFoundDocument(e,n,r,s){return new ht(e,1,n,Z.min(),r,s,0)}static newNoDocument(e,n){return new ht(e,2,n,Z.min(),Z.min(),It.empty(),0)}static newUnknownDocument(e,n){return new ht(e,3,n,Z.min(),Z.min(),It.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(Z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=It.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=It.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ht&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ht(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Ll{constructor(e,n){this.position=e,this.inclusive=n}}function pg(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],a=t.position[s];if(i.field.isKeyField()?r=Q.comparator(Q.fromName(a.referenceValue),n.key):r=ti(a,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function mg(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!bn(t.position[n],e.position[n]))return!1;return!0}/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Ml{constructor(e,n="asc"){this.field=e,this.dir=n}}function w2(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class fb{}class Fe extends fb{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new k2(e,n,r):n==="array-contains"?new S2(e,r):n==="in"?new I2(e,r):n==="not-in"?new C2(e,r):n==="array-contains-any"?new T2(e,r):new Fe(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new _2(e,r):new E2(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(ti(n,this.value)):n!==null&&as(this.value)===as(n)&&this.matchesComparison(ti(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return J()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class wn extends fb{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new wn(e,n)}matches(e){return pb(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function pb(t){return t.op==="and"}function mb(t){return x2(t)&&pb(t)}function x2(t){for(const e of t.filters)if(e instanceof wn)return!1;return!0}function Dh(t){if(t instanceof Fe)return t.field.canonicalString()+t.op.toString()+ni(t.value);if(mb(t))return t.filters.map(e=>Dh(e)).join(",");{const e=t.filters.map(n=>Dh(n)).join(",");return`${t.op}(${e})`}}function gb(t,e){return t instanceof Fe?function(n,r){return r instanceof Fe&&n.op===r.op&&n.field.isEqual(r.field)&&bn(n.value,r.value)}(t,e):t instanceof wn?function(n,r){return r instanceof wn&&n.op===r.op&&n.filters.length===r.filters.length?n.filters.reduce((s,i,a)=>s&&gb(i,r.filters[a]),!0):!1}(t,e):void J()}function yb(t){return t instanceof Fe?function(e){return`${e.field.canonicalString()} ${e.op} ${ni(e.value)}`}(t):t instanceof wn?function(e){return e.op.toString()+" {"+e.getFilters().map(yb).join(" ,")+"}"}(t):"Filter"}class k2 extends Fe{constructor(e,n,r){super(e,n,r),this.key=Q.fromName(r.referenceValue)}matches(e){const n=Q.comparator(e.key,this.key);return this.matchesComparison(n)}}class _2 extends Fe{constructor(e,n){super(e,"in",n),this.keys=vb("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class E2 extends Fe{constructor(e,n){super(e,"not-in",n),this.keys=vb("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function vb(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>Q.fromName(r.referenceValue))}class S2 extends Fe{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return tf(n)&&Ia(n.arrayValue,this.value)}}class I2 extends Fe{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Ia(this.value.arrayValue,n)}}class C2 extends Fe{constructor(e,n){super(e,"not-in",n)}matches(e){if(Ia(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!Ia(this.value.arrayValue,n)}}class T2 extends Fe{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!tf(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Ia(this.value.arrayValue,r))}}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class N2{constructor(e,n=null,r=[],s=[],i=null,a=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.ue=null}}function gg(t,e=null,n=[],r=[],s=null,i=null,a=null){return new N2(t,e,n,r,s,i,a)}function nf(t){const e=ee(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Dh(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),uu(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>ni(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>ni(r)).join(",")),e.ue=n}return e.ue}function rf(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!w2(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!gb(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!mg(t.startAt,e.startAt)&&mg(t.endAt,e.endAt)}function Lh(t){return Q.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class cu{constructor(e,n=null,r=[],s=[],i=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function A2(t,e,n,r,s,i,a,l){return new cu(t,e,n,r,s,i,a,l)}function sf(t){return new cu(t)}function yg(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function P2(t){return t.collectionGroup!==null}function ta(t){const e=ee(t);if(e.ce===null){e.ce=[];const n=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),n.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(s){let i=new et(Je.comparator);return s.filters.forEach(a=>{a.getFlattenedFilters().forEach(l=>{l.isInequality()&&(i=i.add(l.field))})}),i})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.ce.push(new Ml(s,r))}),n.has(Je.keyField().canonicalString())||e.ce.push(new Ml(Je.keyField(),r))}return e.ce}function yn(t){const e=ee(t);return e.le||(e.le=R2(e,ta(t))),e.le}function R2(t,e){if(t.limitType==="F")return gg(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ml(s.field,i)});const n=t.endAt?new Ll(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Ll(t.startAt.position,t.startAt.inclusive):null;return gg(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Mh(t,e,n){return new cu(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function hu(t,e){return rf(yn(t),yn(e))&&t.limitType===e.limitType}function bb(t){return`${nf(yn(t))}|lt:${t.limitType}`}function bs(t){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(r=>yb(r)).join(", ")}]`),uu(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(r=>function(s){return`${s.field.canonicalString()} (${s.dir})`}(r)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>ni(r)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>ni(r)).join(",")),`Target(${n})`}(yn(t))}; limitType=${t.limitType})`}function du(t,e){return e.isFoundDocument()&&function(n,r){const s=r.key.path;return n.collectionGroup!==null?r.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(s):Q.isDocumentKey(n.path)?n.path.isEqual(s):n.path.isImmediateParentOf(s)}(t,e)&&function(n,r){for(const s of ta(n))if(!s.field.isKeyField()&&r.data.field(s.field)===null)return!1;return!0}(t,e)&&function(n,r){for(const s of n.filters)if(!s.matches(r))return!1;return!0}(t,e)&&function(n,r){return!(n.startAt&&!function(s,i,a){const l=pg(s,i,a);return s.inclusive?l<=0:l<0}(n.startAt,ta(n),r)||n.endAt&&!function(s,i,a){const l=pg(s,i,a);return s.inclusive?l>=0:l>0}(n.endAt,ta(n),r))}(t,e)}function O2(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function wb(t){return(e,n)=>{let r=!1;for(const s of ta(t)){const i=D2(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function D2(t,e,n){const r=t.field.isKeyField()?Q.comparator(e.key,n.key):function(s,i,a){const l=i.data.field(s),u=a.data.field(s);return l!==null&&u!==null?ti(l,u):J()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return J()}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class di{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){us(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return cb(this.inner)}size(){return this.innerSize}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const L2=new Ne(Q.comparator);function zn(){return L2}const xb=new Ne(Q.comparator);function zi(...t){let e=xb;for(const n of t)e=e.insert(n.key,n);return e}function kb(t){let e=xb;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Kr(){return na()}function _b(){return na()}function na(){return new di(t=>t.toString(),(t,e)=>t.isEqual(e))}const M2=new Ne(Q.comparator),j2=new et(Q.comparator);function se(...t){let e=j2;for(const n of t)e=e.add(n);return e}const U2=new et(ce);function F2(){return U2}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function af(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Dl(e)?"-0":e}}function Eb(t){return{integerValue:""+t}}function V2(t,e){return m2(e)?Eb(e):af(t,e)}/**
* @license
* Copyright 2018 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class fu{constructor(){this._=void 0}}function z2(t,e,n){return t instanceof Ca?function(r,s){const i={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return s&&Zd(s)&&(s=ef(s)),s&&(i.fields.__previous_value__=s),{mapValue:i}}(n,e):t instanceof Ta?Ib(t,e):t instanceof Na?Cb(t,e):function(r,s){const i=Sb(r,s),a=vg(i)+vg(r.Pe);return Oh(i)&&Oh(r.Pe)?Eb(a):af(r.serializer,a)}(t,e)}function $2(t,e,n){return t instanceof Ta?Ib(t,e):t instanceof Na?Cb(t,e):n}function Sb(t,e){return t instanceof jl?function(n){return Oh(n)||function(r){return!!r&&"doubleValue"in r}(n)}(e)?e:{integerValue:0}:null}class Ca extends fu{}class Ta extends fu{constructor(e){super(),this.elements=e}}function Ib(t,e){const n=Tb(e);for(const r of t.elements)n.some(s=>bn(s,r))||n.push(r);return{arrayValue:{values:n}}}class Na extends fu{constructor(e){super(),this.elements=e}}function Cb(t,e){let n=Tb(e);for(const r of t.elements)n=n.filter(s=>!bn(s,r));return{arrayValue:{values:n}}}class jl extends fu{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function vg(t){return De(t.integerValue||t.doubleValue)}function Tb(t){return tf(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class B2{constructor(e,n){this.field=e,this.transform=n}}function q2(t,e){return t.field.isEqual(e.field)&&function(n,r){return n instanceof Ta&&r instanceof Ta||n instanceof Na&&r instanceof Na?ei(n.elements,r.elements,bn):n instanceof jl&&r instanceof jl?bn(n.Pe,r.Pe):n instanceof Ca&&r instanceof Ca}(t.transform,e.transform)}class H2{constructor(e,n){this.version=e,this.transformResults=n}}class bt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new bt}static exists(e){return new bt(void 0,e)}static updateTime(e){return new bt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Zo(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class pu{}function Nb(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new mu(t.key,bt.none()):new $a(t.key,t.data,bt.none());{const n=t.data,r=It.empty();let s=new et(Je.comparator);for(let i of e.fields)if(!s.has(i)){let a=n.field(i);a===null&&i.length>1&&(i=i.popLast(),a=n.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Rr(t.key,r,new Mt(s.toArray()),bt.none())}}function K2(t,e,n){t instanceof $a?function(r,s,i){const a=r.value.clone(),l=wg(r.fieldTransforms,s,i.transformResults);a.setAll(l),s.convertToFoundDocument(i.version,a).setHasCommittedMutations()}(t,e,n):t instanceof Rr?function(r,s,i){if(!Zo(r.precondition,s))return void s.convertToUnknownDocument(i.version);const a=wg(r.fieldTransforms,s,i.transformResults),l=s.data;l.setAll(Ab(r)),l.setAll(a),s.convertToFoundDocument(i.version,l).setHasCommittedMutations()}(t,e,n):function(r,s,i){s.convertToNoDocument(i.version).setHasCommittedMutations()}(0,e,n)}function ra(t,e,n,r){return t instanceof $a?function(s,i,a,l){if(!Zo(s.precondition,i))return a;const u=s.value.clone(),d=xg(s.fieldTransforms,l,i);return u.setAll(d),i.convertToFoundDocument(i.version,u).setHasLocalMutations(),null}(t,e,n,r):t instanceof Rr?function(s,i,a,l){if(!Zo(s.precondition,i))return a;const u=xg(s.fieldTransforms,l,i),d=i.data;return d.setAll(Ab(s)),d.setAll(u),i.convertToFoundDocument(i.version,d).setHasLocalMutations(),a===null?null:a.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(f=>f.field))}(t,e,n,r):function(s,i,a){return Zo(s.precondition,i)?(i.convertToNoDocument(i.version).setHasLocalMutations(),null):a}(t,e,n)}function G2(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=Sb(r.transform,s||null);i!=null&&(n===null&&(n=It.empty()),n.set(r.field,i))}return n||null}function bg(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(n,r){return n===void 0&&r===void 0||!(!n||!r)&&ei(n,r,(s,i)=>q2(s,i))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class $a extends pu{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Rr extends pu{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Ab(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function wg(t,e,n){const r=new Map;me(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],a=i.transform,l=e.data.field(i.field);r.set(i.field,$2(a,l,n[s]))}return r}function xg(t,e,n){const r=new Map;for(const s of t){const i=s.transform,a=n.data.field(s.field);r.set(s.field,z2(i,a,e))}return r}class mu extends pu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class W2 extends pu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Q2{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&K2(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=ra(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=ra(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=_b();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=n.has(s.key)?null:l;const u=Nb(a,l);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(Z.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),se())}isEqual(e){return this.batchId===e.batchId&&ei(this.mutations,e.mutations,(n,r)=>bg(n,r))&&ei(this.baseMutations,e.baseMutations,(n,r)=>bg(n,r))}}class of{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){me(e.mutations.length===r.length);let s=function(){return M2}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new of(e,n,r,s)}}/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class X2{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Y2{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Me,le;function J2(t){switch(t){default:return J();case D.CANCELLED:case D.UNKNOWN:case D.DEADLINE_EXCEEDED:case D.RESOURCE_EXHAUSTED:case D.INTERNAL:case D.UNAVAILABLE:case D.UNAUTHENTICATED:return!1;case D.INVALID_ARGUMENT:case D.NOT_FOUND:case D.ALREADY_EXISTS:case D.PERMISSION_DENIED:case D.FAILED_PRECONDITION:case D.ABORTED:case D.OUT_OF_RANGE:case D.UNIMPLEMENTED:case D.DATA_LOSS:return!0}}function Pb(t){if(t===void 0)return Vn("GRPC error has no .code"),D.UNKNOWN;switch(t){case Me.OK:return D.OK;case Me.CANCELLED:return D.CANCELLED;case Me.UNKNOWN:return D.UNKNOWN;case Me.DEADLINE_EXCEEDED:return D.DEADLINE_EXCEEDED;case Me.RESOURCE_EXHAUSTED:return D.RESOURCE_EXHAUSTED;case Me.INTERNAL:return D.INTERNAL;case Me.UNAVAILABLE:return D.UNAVAILABLE;case Me.UNAUTHENTICATED:return D.UNAUTHENTICATED;case Me.INVALID_ARGUMENT:return D.INVALID_ARGUMENT;case Me.NOT_FOUND:return D.NOT_FOUND;case Me.ALREADY_EXISTS:return D.ALREADY_EXISTS;case Me.PERMISSION_DENIED:return D.PERMISSION_DENIED;case Me.FAILED_PRECONDITION:return D.FAILED_PRECONDITION;case Me.ABORTED:return D.ABORTED;case Me.OUT_OF_RANGE:return D.OUT_OF_RANGE;case Me.UNIMPLEMENTED:return D.UNIMPLEMENTED;case Me.DATA_LOSS:return D.DATA_LOSS;default:return J()}}(le=Me||(Me={}))[le.OK=0]="OK",le[le.CANCELLED=1]="CANCELLED",le[le.UNKNOWN=2]="UNKNOWN",le[le.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",le[le.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",le[le.NOT_FOUND=5]="NOT_FOUND",le[le.ALREADY_EXISTS=6]="ALREADY_EXISTS",le[le.PERMISSION_DENIED=7]="PERMISSION_DENIED",le[le.UNAUTHENTICATED=16]="UNAUTHENTICATED",le[le.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",le[le.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",le[le.ABORTED=10]="ABORTED",le[le.OUT_OF_RANGE=11]="OUT_OF_RANGE",le[le.UNIMPLEMENTED=12]="UNIMPLEMENTED",le[le.INTERNAL=13]="INTERNAL",le[le.UNAVAILABLE=14]="UNAVAILABLE",le[le.DATA_LOSS=15]="DATA_LOSS";/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Z2(){return new TextEncoder}/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const eI=new Qr([4294967295,4294967295],0);function kg(t){const e=Z2().encode(t),n=new nb;return n.update(e),new Uint8Array(n.digest())}function _g(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Qr([n,r],0),new Qr([s,i],0)]}class lf{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new $i(`Invalid padding: ${n}`);if(r<0)throw new $i(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new $i(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new $i(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=Qr.fromNumber(this.Ie)}Ee(e,n,r){let s=e.add(n.multiply(Qr.fromNumber(r)));return s.compare(eI)===1&&(s=new Qr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=kg(e),[r,s]=_g(n);for(let i=0;i<this.hashCount;i++){const a=this.Ee(r,s,i);if(!this.de(a))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new lf(i,s,n);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.Ie===0)return;const n=kg(e),[r,s]=_g(n);for(let i=0;i<this.hashCount;i++){const a=this.Ee(r,s,i);this.Ae(a)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class $i extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class gu{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,Ba.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new gu(Z.min(),s,new Ne(ce),zn(),se())}}class Ba{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Ba(r,n,se(),se(),se())}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class el{constructor(e,n,r,s){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=s}}class Rb{constructor(e,n){this.targetId=e,this.me=n}}class Ob{constructor(e,n,r=nt.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class Eg{constructor(){this.fe=0,this.ge=Ig(),this.pe=nt.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=se(),n=se(),r=se();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:J()}}),new Ba(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=Ig()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,me(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class tI{constructor(e){this.Le=e,this.Be=new Map,this.ke=zn(),this.qe=Sg(),this.Qe=new Ne(ce)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:J()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,s)=>{this.ze(s)&&n(s)})}He(e){const n=e.targetId,r=e.me.count,s=this.Je(n);if(s){const i=s.target;if(Lh(i))if(r===0){const a=new Q(i.path);this.Ue(n,a,ht.newNoDocument(a,Z.min()))}else me(r===1);else{const a=this.Ye(n);if(a!==r){const l=this.Ze(e),u=l?this.Xe(l,e,a):1;if(u!==0){this.je(n);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,d)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let a,l;try{a=is(r).toUint8Array()}catch(u){if(u instanceof hb)return Zs("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new lf(a,s,i)}catch(u){return Zs(u instanceof $i?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.Ie===0?null:l}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const a=this.Le.tt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Ue(n,i,null),s++)}),s}rt(e){const n=new Map;this.Be.forEach((i,a)=>{const l=this.Je(a);if(l){if(i.current&&Lh(l.target)){const u=new Q(l.target.path);this.ke.get(u)!==null||this.it(a,u)||this.Ue(a,u,ht.newNoDocument(u,e))}i.be&&(n.set(a,i.ve()),i.Ce())}});let r=se();this.qe.forEach((i,a)=>{let l=!0;a.forEachWhile(u=>{const d=this.Je(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.ke.forEach((i,a)=>a.setReadTime(e));const s=new gu(e,n,this.Qe,this.ke,r);return this.ke=zn(),this.qe=Sg(),this.Qe=new Ne(ce),s}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,n)?s.Fe(n,1):s.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new Eg,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new et(ce),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||K("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Eg),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function Sg(){return new Ne(Q.comparator)}function Ig(){return new Ne(Q.comparator)}const nI={asc:"ASCENDING",desc:"DESCENDING"},rI={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},sI={and:"AND",or:"OR"};class iI{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function jh(t,e){return t.useProto3Json||uu(e)?e:{value:e}}function Ul(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Db(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function aI(t,e){return Ul(t,e.toTimestamp())}function vn(t){return me(!!t),Z.fromTimestamp(function(e){const n=Ir(e);return new ze(n.seconds,n.nanos)}(t))}function uf(t,e){return Uh(t,e).canonicalString()}function Uh(t,e){const n=function(r){return new Ee(["projects",r.projectId,"databases",r.database])}(t).child("documents");return e===void 0?n:n.child(e)}function Lb(t){const e=Ee.fromString(t);return me(Vb(e)),e}function Fh(t,e){return uf(t.databaseId,e.path)}function _c(t,e){const n=Lb(e);if(n.get(1)!==t.databaseId.projectId)throw new W(D.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new W(D.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Q(jb(n))}function Mb(t,e){return uf(t.databaseId,e)}function oI(t){const e=Lb(t);return e.length===4?Ee.emptyPath():jb(e)}function Vh(t){return new Ee(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function jb(t){return me(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Cg(t,e,n){return{name:Fh(t,e),fields:n.value.mapValue.fields}}function lI(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:J()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(u,d){return u.useProto3Json?(me(d===void 0||typeof d=="string"),nt.fromBase64String(d||"")):(me(d===void 0||d instanceof Buffer||d instanceof Uint8Array),nt.fromUint8Array(d||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(u){const d=u.code===void 0?D.UNKNOWN:Pb(u.code);return new W(d,u.message||"")}(a);n=new Ob(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=_c(t,r.document.name),i=vn(r.document.updateTime),a=r.document.createTime?vn(r.document.createTime):Z.min(),l=new It({mapValue:{fields:r.document.fields}}),u=ht.newFoundDocument(s,i,a,l),d=r.targetIds||[],f=r.removedTargetIds||[];n=new el(d,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=_c(t,r.document),i=r.readTime?vn(r.readTime):Z.min(),a=ht.newNoDocument(s,i),l=r.removedTargetIds||[];n=new el([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=_c(t,r.document),i=r.removedTargetIds||[];n=new el([],i,s,null)}else{if(!("filter"in e))return J();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new Y2(s,i),l=r.targetId;n=new Rb(l,a)}}return n}function uI(t,e){let n;if(e instanceof $a)n={update:Cg(t,e.key,e.value)};else if(e instanceof mu)n={delete:Fh(t,e.key)};else if(e instanceof Rr)n={update:Cg(t,e.key,e.data),updateMask:vI(e.fieldMask)};else{if(!(e instanceof W2))return J();n={verify:Fh(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,i){const a=i.transform;if(a instanceof Ca)return{fieldPath:i.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof Ta)return{fieldPath:i.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof Na)return{fieldPath:i.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof jl)return{fieldPath:i.field.canonicalString(),increment:a.Pe};throw J()}(0,r))),e.precondition.isNone||(n.currentDocument=function(r,s){return s.updateTime!==void 0?{updateTime:aI(r,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:J()}(t,e.precondition)),n}function cI(t,e){return t&&t.length>0?(me(e!==void 0),t.map(n=>function(r,s){let i=r.updateTime?vn(r.updateTime):vn(s);return i.isEqual(Z.min())&&(i=vn(s)),new H2(i,r.transformResults||[])}(n,e))):[]}function hI(t,e){return{documents:[Mb(t,e.path)]}}function dI(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Mb(t,s);const i=function(u){if(u.length!==0)return Fb(wn.create(u,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const a=function(u){if(u.length!==0)return u.map(d=>function(f){return{field:ws(f.field),direction:mI(f.dir)}}(d))}(e.orderBy);a&&(n.structuredQuery.orderBy=a);const l=jh(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),{_t:n,parent:s}}function fI(t){let e=oI(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){me(r===1);const f=n.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];n.where&&(i=function(f){const y=Ub(f);return y instanceof wn&&mb(y)?y.getFilters():[y]}(n.where));let a=[];n.orderBy&&(a=function(f){return f.map(y=>function(v){return new Ml(xs(v.field),function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(v.direction))}(y))}(n.orderBy));let l=null;n.limit&&(l=function(f){let y;return y=typeof f=="object"?f.value:f,uu(y)?null:y}(n.limit));let u=null;n.startAt&&(u=function(f){const y=!!f.before,v=f.values||[];return new Ll(v,y)}(n.startAt));let d=null;return n.endAt&&(d=function(f){const y=!f.before,v=f.values||[];return new Ll(v,y)}(n.endAt)),A2(e,s,a,i,l,"F",u,d)}function pI(t,e){const n=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return J()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function Ub(t){return t.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=xs(e.unaryFilter.field);return Fe.create(n,"==",{doubleValue:NaN});case"IS_NULL":const r=xs(e.unaryFilter.field);return Fe.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=xs(e.unaryFilter.field);return Fe.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=xs(e.unaryFilter.field);return Fe.create(i,"!=",{nullValue:"NULL_VALUE"});default:return J()}}(t):t.fieldFilter!==void 0?function(e){return Fe.create(xs(e.fieldFilter.field),function(n){switch(n){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return J()}}(e.fieldFilter.op),e.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(e){return wn.create(e.compositeFilter.filters.map(n=>Ub(n)),function(n){switch(n){case"AND":return"and";case"OR":return"or";default:return J()}}(e.compositeFilter.op))}(t):J()}function mI(t){return nI[t]}function gI(t){return rI[t]}function yI(t){return sI[t]}function ws(t){return{fieldPath:t.canonicalString()}}function xs(t){return Je.fromServerFormat(t.fieldPath)}function Fb(t){return t instanceof Fe?function(e){if(e.op==="=="){if(fg(e.value))return{unaryFilter:{field:ws(e.field),op:"IS_NAN"}};if(dg(e.value))return{unaryFilter:{field:ws(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(fg(e.value))return{unaryFilter:{field:ws(e.field),op:"IS_NOT_NAN"}};if(dg(e.value))return{unaryFilter:{field:ws(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ws(e.field),op:gI(e.op),value:e.value}}}(t):t instanceof wn?function(e){const n=e.getFilters().map(r=>Fb(r));return n.length===1?n[0]:{compositeFilter:{op:yI(e.op),filters:n}}}(t):J()}function vI(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function Vb(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class lr{constructor(e,n,r,s,i=Z.min(),a=Z.min(),l=nt.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new lr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new lr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new lr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new lr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class bI{constructor(e){this.ct=e}}function wI(t){const e=fI({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Mh(e,e.limit,"L"):e}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class xI{constructor(){this.un=new kI}addToCollectionParentIndex(e,n){return this.un.add(n),L.resolve()}getCollectionParents(e,n){return L.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return L.resolve()}deleteFieldIndex(e,n){return L.resolve()}deleteAllFieldIndexes(e){return L.resolve()}createTargetIndexes(e,n){return L.resolve()}getDocumentsMatchingTarget(e,n){return L.resolve(null)}getIndexType(e,n){return L.resolve(0)}getFieldIndexes(e,n){return L.resolve([])}getNextCollectionGroupToUpdate(e){return L.resolve(null)}getMinOffset(e,n){return L.resolve(Sr.min())}getMinOffsetFromCollectionGroup(e,n){return L.resolve(Sr.min())}updateCollectionGroup(e,n,r){return L.resolve()}updateIndexEntries(e,n){return L.resolve()}}class kI{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new et(Ee.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new et(Ee.comparator)).toArray()}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class ri{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new ri(0)}static kn(){return new ri(-1)}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class _I{constructor(){this.changes=new di(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,ht.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?L.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*//**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class EI{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class SI{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&ra(r.mutation,s,Mt.empty(),ze.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,se()).next(()=>r))}getLocalViewOfDocuments(e,n,r=se()){const s=Kr();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let a=zi();return i.forEach((l,u)=>{a=a.insert(l,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,n){const r=Kr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,se()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,l)=>{n.set(a,l)})})}computeViews(e,n,r,s){let i=zn();const a=na(),l=function(){return na()}();return n.forEach((u,d)=>{const f=r.get(d.key);s.has(d.key)&&(f===void 0||f.mutation instanceof Rr)?i=i.insert(d.key,d):f!==void 0?(a.set(d.key,f.mutation.getFieldMask()),ra(f.mutation,d,f.mutation.getFieldMask(),ze.now())):a.set(d.key,Mt.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,f)=>a.set(d,f)),n.forEach((d,f)=>{var y;return l.set(d,new EI(f,(y=a.get(d))!==null&&y!==void 0?y:null))}),l))}recalculateAndSaveOverlays(e,n){const r=na();let s=new Ne((a,l)=>a-l),i=se();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(a=>{for(const l of a)l.keys().forEach(u=>{const d=n.get(u);if(d===null)return;let f=r.get(u)||Mt.empty();f=l.applyToLocalView(d,f),r.set(u,f);const y=(s.get(l.batchId)||se()).add(u);s=s.insert(l.batchId,y)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),d=u.key,f=u.value,y=_b();f.forEach(v=>{if(!i.has(v)){const C=Nb(n.get(v),r.get(v));C!==null&&y.set(v,C),i=i.add(v)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,y))}return L.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(i){return Q.isDocumentKey(i.path)&&i.collectionGroup===null&&i.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):P2(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):L.resolve(Kr());let l=-1,u=i;return a.next(d=>L.forEach(d,(f,y)=>(l<y.largestBatchId&&(l=y.largestBatchId),i.get(f)?L.resolve():this.remoteDocumentCache.getEntry(e,f).next(v=>{u=u.insert(f,v)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,se())).next(f=>({batchId:l,changes:kb(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new Q(n)).next(r=>{let s=zi();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let a=zi();return this.indexManager.getCollectionParents(e,i).next(l=>L.forEach(l,u=>{const d=function(f,y){return new cu(y,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)}(n,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(f=>{f.forEach((y,v)=>{a=a.insert(y,v)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(a=>{i.forEach((u,d)=>{const f=d.getKey();a.get(f)===null&&(a=a.insert(f,ht.newInvalidDocument(f)))});let l=zi();return a.forEach((u,d)=>{const f=i.get(u);f!==void 0&&ra(f.mutation,d,Mt.empty(),ze.now()),du(n,d)&&(l=l.insert(u,d))}),l})}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class II{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return L.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(r){return{id:r.id,version:r.version,createTime:vn(r.createTime)}}(n)),L.resolve()}getNamedQuery(e,n){return L.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(r){return{name:r.name,query:wI(r.bundledQuery),readTime:vn(r.readTime)}}(n)),L.resolve()}}/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class CI{constructor(){this.overlays=new Ne(Q.comparator),this.Ir=new Map}getOverlay(e,n){return L.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Kr();return L.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.ht(e,n,i)}),L.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(r)),L.resolve()}getOverlaysForCollection(e,n,r){const s=Kr(),i=n.length+1,a=new Q(n.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,d=u.getKey();if(!n.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return L.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new Ne((d,f)=>d-f);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===n&&d.largestBatchId>r){let f=i.get(d.largestBatchId);f===null&&(f=Kr(),i=i.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const l=Kr(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,f)=>l.set(d,f)),!(l.size()>=s)););return L.resolve(l)}ht(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new X2(n,r));let i=this.Ir.get(n);i===void 0&&(i=se(),this.Ir.set(n,i)),this.Ir.set(n,i.add(r.key))}}/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class TI{constructor(){this.sessionToken=nt.EMPTY_BYTE_STRING}getSessionToken(e){return L.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,L.resolve()}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class cf{constructor(){this.Tr=new et(qe.Er),this.dr=new et(qe.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new qe(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new qe(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new Q(new Ee([])),r=new qe(n,e),s=new qe(n,e+1),i=[];return this.dr.forEachInRange([r,s],a=>{this.Vr(a),i.push(a.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new Q(new Ee([])),r=new qe(n,e),s=new qe(n,e+1);let i=se();return this.dr.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const n=new qe(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class qe{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return Q.comparator(e.key,n.key)||ce(e.wr,n.wr)}static Ar(e,n){return ce(e.wr,n.wr)||Q.comparator(e.key,n.key)}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class NI{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new et(qe.Er)}checkEmpty(e){return L.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Q2(i,n,r,s);this.mutationQueue.push(a);for(const l of s)this.br=this.br.add(new qe(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return L.resolve(a)}lookupMutationBatch(e,n){return L.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.vr(r),i=s<0?0:s;return L.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return L.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return L.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new qe(n,0),s=new qe(n,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],a=>{const l=this.Dr(a.wr);i.push(l)}),L.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new et(ce);return n.forEach(s=>{const i=new qe(s,0),a=new qe(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,a],l=>{r=r.add(l.wr)})}),L.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;Q.isDocumentKey(i)||(i=i.child(""));const a=new qe(new Q(i),0);let l=new et(ce);return this.br.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(l=l.add(u.wr)),!0)},a),L.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){me(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return L.forEach(n.mutations,s=>{const i=new qe(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new qe(n,0),s=this.br.firstAfterOrEqual(r);return L.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,L.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class AI{constructor(e){this.Mr=e,this.docs=function(){return new Ne(Q.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,a=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return L.resolve(r?r.document.mutableCopy():ht.newInvalidDocument(n))}getEntries(e,n){let r=zn();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():ht.newInvalidDocument(s))}),L.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=zn();const a=n.path,l=new Q(a.child("")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||h2(c2(f),r)<=0||(s.has(f.key)||du(n,f))&&(i=i.insert(f.key,f.mutableCopy()))}return L.resolve(i)}getAllFromCollectionGroup(e,n,r,s){J()}Or(e,n){return L.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new PI(this)}getSize(e){return L.resolve(this.size)}}class PI extends _I{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),L.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class RI{constructor(e){this.persistence=e,this.Nr=new di(n=>nf(n),rf),this.lastRemoteSnapshotVersion=Z.min(),this.highestTargetId=0,this.Lr=0,this.Br=new cf,this.targetCount=0,this.kr=ri.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,s)=>n(s)),L.resolve()}getLastRemoteSnapshotVersion(e){return L.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return L.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),L.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),L.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new ri(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,L.resolve()}updateTargetData(e,n){return this.Kn(n),L.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,L.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.Nr.forEach((a,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(a),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),L.waitFor(i).next(()=>s)}getTargetCount(e){return L.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return L.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),L.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),L.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),L.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return L.resolve(r)}containsKey(e,n){return L.resolve(this.Br.containsKey(n))}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class OI{constructor(e,n){this.qr={},this.overlays={},this.Qr=new Jd(0),this.Kr=!1,this.Kr=!0,this.$r=new TI,this.referenceDelegate=e(this),this.Ur=new RI(this),this.indexManager=new xI,this.remoteDocumentCache=function(r){return new AI(r)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new bI(n),this.Gr=new II(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new CI,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new NI(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){K("MemoryPersistence","Starting transaction:",e);const s=new DI(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(e,n){return L.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class DI extends f2{constructor(e){super(),this.currentSequenceNumber=e}}class hf{constructor(e){this.persistence=e,this.Jr=new cf,this.Yr=null}static Zr(e){return new hf(e)}get Xr(){if(this.Yr)return this.Yr;throw J()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),L.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),L.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),L.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return L.forEach(this.Xr,r=>{const s=Q.fromPath(r);return this.ei(e,s).next(i=>{i||n.removeEntry(s,Z.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return L.or([()=>L.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class df{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=s}static Wi(e,n){let r=se(),s=se();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new df(e,n.fromCache,r,s)}}/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class LI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class MI{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return Mk()?8:p2(ft())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.Yi(e,n).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.Zi(e,n,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new LI;return this.Xi(e,n,a).next(l=>{if(i.result=l,this.zi)return this.es(e,n,a,l.size)})}).next(()=>i.result)}es(e,n,r,s){return r.documentReadCount<this.ji?(Di()<=ae.DEBUG&&K("QueryEngine","SDK will not create cache indexes for query:",bs(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),L.resolve()):(Di()<=ae.DEBUG&&K("QueryEngine","Query:",bs(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(Di()<=ae.DEBUG&&K("QueryEngine","The SDK decides to create cache indexes for query:",bs(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,yn(n))):L.resolve())}Yi(e,n){if(yg(n))return L.resolve(null);let r=yn(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=Mh(n,null,"F"),r=yn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=se(...i);return this.Ji.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.ts(n,l);return this.ns(n,d,a,u.readTime)?this.Yi(e,Mh(n,null,"F")):this.rs(e,d,n,u)}))})))}Zi(e,n,r,s){return yg(n)||s.isEqual(Z.min())?L.resolve(null):this.Ji.getDocuments(e,r).next(i=>{const a=this.ts(n,i);return this.ns(n,a,r,s)?L.resolve(null):(Di()<=ae.DEBUG&&K("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),bs(n)),this.rs(e,a,n,u2(s,-1)).next(l=>l))})}ts(e,n){let r=new et(wb(e));return n.forEach((s,i)=>{du(e,i)&&(r=r.add(i))}),r}ns(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,n,r){return Di()<=ae.DEBUG&&K("QueryEngine","Using full collection scan to execute query:",bs(n)),this.Ji.getDocumentsMatchingQuery(e,n,Sr.min(),r)}rs(e,n,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class jI{constructor(e,n,r,s){this.persistence=e,this.ss=n,this.serializer=s,this.os=new Ne(ce),this._s=new di(i=>nf(i),rf),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new SI(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function UI(t,e,n,r){return new jI(t,e,n,r)}async function zb(t,e){const n=ee(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],l=[];let u=se();for(const d of s){a.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of i){l.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return n.localDocuments.getDocuments(r,u).next(d=>({hs:d,removedBatchIds:a,addedBatchIds:l}))})})}function FI(t,e){const n=ee(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.cs.newChangeBuffer({trackRemovals:!0});return function(a,l,u,d){const f=u.batch,y=f.keys();let v=L.resolve();return y.forEach(C=>{v=v.next(()=>d.getEntry(l,C)).next(A=>{const P=u.docVersions.get(C);me(P!==null),A.version.compareTo(P)<0&&(f.applyToRemoteDocument(A,u),A.isValidDocument()&&(A.setReadTime(u.commitVersion),d.addEntry(A)))})}),v.next(()=>a.mutationQueue.removeMutationBatch(l,f))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(a){let l=se();for(let u=0;u<a.mutationResults.length;++u)a.mutationResults[u].transformResults.length>0&&(l=l.add(a.batch.mutations[u].key));return l}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function $b(t){const e=ee(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function VI(t,e){const n=ee(t),r=e.snapshotVersion;let s=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=n.cs.newChangeBuffer({trackRemovals:!0});s=n.os;const l=[];e.targetChanges.forEach((f,y)=>{const v=s.get(y);if(!v)return;l.push(n.Ur.removeMatchingKeys(i,f.removedDocuments,y).next(()=>n.Ur.addMatchingKeys(i,f.addedDocuments,y)));let C=v.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(y)!==null?C=C.withResumeToken(nt.EMPTY_BYTE_STRING,Z.min()).withLastLimboFreeSnapshotVersion(Z.min()):f.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(f.resumeToken,r)),s=s.insert(y,C),function(A,P,M){return A.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-A.snapshotVersion.toMicroseconds()>=3e8?!0:M.addedDocuments.size+M.modifiedDocuments.size+M.removedDocuments.size>0}(v,C,f)&&l.push(n.Ur.updateTargetData(i,C))});let u=zn(),d=se();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,f))}),l.push(zI(i,a,e.documentUpdates).next(f=>{u=f.Ps,d=f.Is})),!r.isEqual(Z.min())){const f=n.Ur.getLastRemoteSnapshotVersion(i).next(y=>n.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(f)}return L.waitFor(l).next(()=>a.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(n.os=s,i))}function zI(t,e,n){let r=se(),s=se();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let a=zn();return n.forEach((l,u)=>{const d=i.get(l);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual(Z.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):K("LocalStore","Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",u.version)}),{Ps:a,Is:s}})}function $I(t,e){const n=ee(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function BI(t,e){const n=ee(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Ur.getTargetData(r,e).next(i=>i?(s=i,L.resolve(s)):n.Ur.allocateTargetId(r).next(a=>(s=new lr(e,a,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function zh(t,e,n){const r=ee(t),s=r.os.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!za(a))throw a;K("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function Tg(t,e,n){const r=ee(t);let s=Z.min(),i=se();return r.persistence.runTransaction("Execute query","readwrite",a=>function(l,u,d){const f=ee(l),y=f._s.get(d);return y!==void 0?L.resolve(f.os.get(y)):f.Ur.getTargetData(u,d)}(r,a,yn(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(a,l.targetId).next(u=>{i=u})}).next(()=>r.ss.getDocumentsMatchingQuery(a,e,n?s:Z.min(),n?i:se())).next(l=>(qI(r,O2(e),l),{documents:l,Ts:i})))}function qI(t,e,n){let r=t.us.get(e)||Z.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.us.set(e,r)}class Ng{constructor(){this.activeTargetIds=F2()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class HI{constructor(){this.so=new Ng,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Ng,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class KI{_o(e){}shutdown(){}}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Ag{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){K("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){K("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/let Ro=null;function Ec(){return Ro===null?Ro=function(){return 268435456+Math.round(2147483648*Math.random())}():Ro++,"0x"+Ro.toString(16)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const GI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class WI{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const ot="WebChannelConnection";class QI extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=n+"://"+e.host,this.vo=`projects/${r}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${r}`:`project_id=${r}&database_id=${s}`}get Fo(){return!1}Mo(e,n,r,s,i){const a=Ec(),l=this.xo(e,n.toUriEncodedString());K("RestConnection",`Sending RPC '${e}' ${a}:`,l,r);const u={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(u,s,i),this.No(e,l,u,r).then(d=>(K("RestConnection",`Received RPC '${e}' ${a}: `,d),d),d=>{throw Zs("RestConnection",`RPC '${e}' ${a} failed with error: `,d,"url: ",l,"request:",r),d})}Lo(e,n,r,s,i,a){return this.Mo(e,n,r,s,i)}Oo(e,n,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+hi}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}xo(e,n){const r=GI[e];return`${this.Do}/v1/${n}:${r}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,s){const i=Ec();return new Promise((a,l)=>{const u=new rb;u.setWithCredentials(!0),u.listenOnce(sb.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Yo.NO_ERROR:const f=u.getResponseJson();K(ot,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(f)),a(f);break;case Yo.TIMEOUT:K(ot,`RPC '${e}' ${i} timed out`),l(new W(D.DEADLINE_EXCEEDED,"Request time out"));break;case Yo.HTTP_ERROR:const y=u.getStatus();if(K(ot,`RPC '${e}' ${i} failed with status:`,y,"response text:",u.getResponseText()),y>0){let v=u.getResponseJson();Array.isArray(v)&&(v=v[0]);const C=v==null?void 0:v.error;if(C&&C.status&&C.message){const A=function(P){const M=P.toLowerCase().replace(/_/g,"-");return Object.values(D).indexOf(M)>=0?M:D.UNKNOWN}(C.status);l(new W(A,C.message))}else l(new W(D.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new W(D.UNAVAILABLE,"Connection failed."));break;default:J()}}finally{K(ot,`RPC '${e}' ${i} completed.`)}});const d=JSON.stringify(s);K(ot,`RPC '${e}' ${i} sending request:`,s),u.send(n,"POST",d,r,15)})}Bo(e,n,r){const s=Ec(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=ob(),l=ab(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const f=i.join("");K(ot,`Creating RPC '${e}' stream ${s}: ${f}`,u);const y=a.createWebChannel(f,u);let v=!1,C=!1;const A=new WI({Io:M=>{C?K(ot,`Not sending because RPC '${e}' stream ${s} is closed:`,M):(v||(K(ot,`Opening RPC '${e}' stream ${s} transport.`),y.open(),v=!0),K(ot,`RPC '${e}' stream ${s} sending:`,M),y.send(M))},To:()=>y.close()}),P=(M,E,x)=>{M.listen(E,S=>{try{x(S)}catch(O){setTimeout(()=>{throw O},0)}})};return P(y,Vi.EventType.OPEN,()=>{C||(K(ot,`RPC '${e}' stream ${s} transport opened.`),A.yo())}),P(y,Vi.EventType.CLOSE,()=>{C||(C=!0,K(ot,`RPC '${e}' stream ${s} transport closed`),A.So())}),P(y,Vi.EventType.ERROR,M=>{C||(C=!0,Zs(ot,`RPC '${e}' stream ${s} transport errored:`,M),A.So(new W(D.UNAVAILABLE,"The operation could not be completed")))}),P(y,Vi.EventType.MESSAGE,M=>{var E;if(!C){const x=M.data[0];me(!!x);const S=x,O=S.error||((E=S[0])===null||E===void 0?void 0:E.error);if(O){K(ot,`RPC '${e}' stream ${s} received error:`,O);const V=O.status;let F=function(m){const b=Me[m];if(b!==void 0)return Pb(b)}(V),w=O.message;F===void 0&&(F=D.INTERNAL,w="Unknown error status: "+V+" with message "+O.message),C=!0,A.So(new W(F,w)),y.close()}else K(ot,`RPC '${e}' stream ${s} received:`,x),A.bo(x)}}),P(l,ib.STAT_EVENT,M=>{M.stat===Ph.PROXY?K(ot,`RPC '${e}' stream ${s} detected buffering proxy`):M.stat===Ph.NOPROXY&&K(ot,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{A.wo()},0),A}}function Sc(){return typeof document<"u"?document:null}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function yu(t){return new iI(t,!0)}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Bb{constructor(e,n,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,n-r);s>0&&K("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class qb{constructor(e,n,r,s,i,a,l,u){this.ui=e,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Bb(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===D.RESOURCE_EXHAUSTED?(Vn(n.toString()),Vn("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===D.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===n&&this.P_(r,s)},r=>{e(()=>{const s=new W(D.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return K("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(K("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class XI extends qb{constructor(e,n,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,a),this.serializer=i}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=lI(this.serializer,e),r=function(s){if(!("targetChange"in s))return Z.min();const i=s.targetChange;return i.targetIds&&i.targetIds.length?Z.min():i.readTime?vn(i.readTime):Z.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=Vh(this.serializer),n.addTarget=function(s,i){let a;const l=i.target;if(a=Lh(l)?{documents:hI(s,l)}:{query:dI(s,l)._t},a.targetId=i.targetId,i.resumeToken.approximateByteSize()>0){a.resumeToken=Db(s,i.resumeToken);const u=jh(s,i.expectedCount);u!==null&&(a.expectedCount=u)}else if(i.snapshotVersion.compareTo(Z.min())>0){a.readTime=Ul(s,i.snapshotVersion.toTimestamp());const u=jh(s,i.expectedCount);u!==null&&(a.expectedCount=u)}return a}(this.serializer,e);const r=pI(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=Vh(this.serializer),n.removeTarget=e,this.a_(n)}}class YI extends qb{constructor(e,n,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,a),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return me(!!e.streamToken),this.lastStreamToken=e.streamToken,me(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){me(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=cI(e.writeResults,e.commitTime),r=vn(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=Vh(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>uI(this.serializer,r))};this.a_(n)}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class JI extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new W(D.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Mo(e,Uh(n,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new W(D.UNKNOWN,i.toString())})}Lo(e,n,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Lo(e,Uh(n,r),s,a,l,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new W(D.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class ZI{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Vn(n),this.D_=!1):K("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class eC{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(a=>{r.enqueueAndForget(async()=>{cs(this)&&(K("RemoteStore","Restarting streams for network reachability change."),await async function(l){const u=ee(l);u.L_.add(4),await qa(u),u.q_.set("Unknown"),u.L_.delete(4),await vu(u)}(this))})}),this.q_=new ZI(r,s)}}async function vu(t){if(cs(t))for(const e of t.B_)await e(!0)}async function qa(t){for(const e of t.B_)await e(!1)}function Hb(t,e){const n=ee(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),gf(n)?mf(n):fi(n).r_()&&pf(n,e))}function ff(t,e){const n=ee(t),r=fi(n);n.N_.delete(e),r.r_()&&Kb(n,e),n.N_.size===0&&(r.r_()?r.o_():cs(n)&&n.q_.set("Unknown"))}function pf(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Z.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}fi(t).A_(e)}function Kb(t,e){t.Q_.xe(e),fi(t).R_(e)}function mf(t){t.Q_=new tI({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),fi(t).start(),t.q_.v_()}function gf(t){return cs(t)&&!fi(t).n_()&&t.N_.size>0}function cs(t){return ee(t).L_.size===0}function Gb(t){t.Q_=void 0}async function tC(t){t.q_.set("Online")}async function nC(t){t.N_.forEach((e,n)=>{pf(t,e)})}async function rC(t,e){Gb(t),gf(t)?(t.q_.M_(e),mf(t)):t.q_.set("Unknown")}async function sC(t,e,n){if(t.q_.set("Online"),e instanceof Ob&&e.state===2&&e.cause)try{await async function(r,s){const i=s.cause;for(const a of s.targetIds)r.N_.has(a)&&(await r.remoteSyncer.rejectListen(a,i),r.N_.delete(a),r.Q_.removeTarget(a))}(t,e)}catch(r){K("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Fl(t,r)}else if(e instanceof el?t.Q_.Ke(e):e instanceof Rb?t.Q_.He(e):t.Q_.We(e),!n.isEqual(Z.min()))try{const r=await $b(t.localStore);n.compareTo(r)>=0&&await function(s,i){const a=s.Q_.rt(i);return a.targetChanges.forEach((l,u)=>{if(l.resumeToken.approximateByteSize()>0){const d=s.N_.get(u);d&&s.N_.set(u,d.withResumeToken(l.resumeToken,i))}}),a.targetMismatches.forEach((l,u)=>{const d=s.N_.get(l);if(!d)return;s.N_.set(l,d.withResumeToken(nt.EMPTY_BYTE_STRING,d.snapshotVersion)),Kb(s,l);const f=new lr(d.target,l,u,d.sequenceNumber);pf(s,f)}),s.remoteSyncer.applyRemoteEvent(a)}(t,n)}catch(r){K("RemoteStore","Failed to raise snapshot:",r),await Fl(t,r)}}async function Fl(t,e,n){if(!za(e))throw e;t.L_.add(1),await qa(t),t.q_.set("Offline"),n||(n=()=>$b(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{K("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await vu(t)})}function Wb(t,e){return e().catch(n=>Fl(t,n,e))}async function bu(t){const e=ee(t),n=Cr(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;iC(e);)try{const s=await $I(e.localStore,r);if(s===null){e.O_.length===0&&n.o_();break}r=s.batchId,aC(e,s)}catch(s){await Fl(e,s)}Qb(e)&&Xb(e)}function iC(t){return cs(t)&&t.O_.length<10}function aC(t,e){t.O_.push(e);const n=Cr(t);n.r_()&&n.V_&&n.m_(e.mutations)}function Qb(t){return cs(t)&&!Cr(t).n_()&&t.O_.length>0}function Xb(t){Cr(t).start()}async function oC(t){Cr(t).p_()}async function lC(t){const e=Cr(t);for(const n of t.O_)e.m_(n.mutations)}async function uC(t,e,n){const r=t.O_.shift(),s=of.from(r,e,n);await Wb(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await bu(t)}async function cC(t,e){e&&Cr(t).V_&&await async function(n,r){if(function(s){return J2(s)&&s!==D.ABORTED}(r.code)){const s=n.O_.shift();Cr(n).s_(),await Wb(n,()=>n.remoteSyncer.rejectFailedWrite(s.batchId,r)),await bu(n)}}(t,e),Qb(t)&&Xb(t)}async function Pg(t,e){const n=ee(t);n.asyncQueue.verifyOperationInProgress(),K("RemoteStore","RemoteStore received new credentials");const r=cs(n);n.L_.add(3),await qa(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await vu(n)}async function hC(t,e){const n=ee(t);e?(n.L_.delete(2),await vu(n)):e||(n.L_.add(2),await qa(n),n.q_.set("Unknown"))}function fi(t){return t.K_||(t.K_=function(e,n,r){const s=ee(e);return s.w_(),new XI(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,r)}(t.datastore,t.asyncQueue,{Eo:tC.bind(null,t),Ro:nC.bind(null,t),mo:rC.bind(null,t),d_:sC.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),gf(t)?mf(t):t.q_.set("Unknown")):(await t.K_.stop(),Gb(t))})),t.K_}function Cr(t){return t.U_||(t.U_=function(e,n,r){const s=ee(e);return s.w_(),new YI(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,r)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:oC.bind(null,t),mo:cC.bind(null,t),f_:lC.bind(null,t),g_:uC.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await bu(t)):(await t.U_.stop(),t.O_.length>0&&(K("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class yf{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Xr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const a=Date.now()+r,l=new yf(e,n,a,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new W(D.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function vf(t,e){if(Vn("AsyncQueue",`${e}: ${t}`),za(t))return new W(D.UNAVAILABLE,`${e}: ${t}`);throw t}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class qs{constructor(e){this.comparator=e?(n,r)=>e(n,r)||Q.comparator(n.key,r.key):(n,r)=>Q.comparator(n.key,r.key),this.keyedMap=zi(),this.sortedSet=new Ne(this.comparator)}static emptySet(e){return new qs(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof qs)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new qs;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Rg{constructor(){this.W_=new Ne(Q.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):J():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class si{constructor(e,n,r,s,i,a,l,u,d){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,n,r,s,i){const a=[];return n.forEach(l=>{a.push({type:0,doc:l})}),new si(e,n,qs.emptySet(n),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&hu(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class dC{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class fC{constructor(){this.queries=Og(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(e,n){const r=ee(e),s=r.queries;r.queries=Og(),s.forEach((i,a)=>{for(const l of a.j_)l.onError(n)})})(this,new W(D.ABORTED,"Firestore shutting down"))}}function Og(){return new di(t=>bb(t),hu)}async function pC(t,e){const n=ee(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.H_()&&e.J_()&&(r=2):(i=new dC,r=e.J_()?0:1);try{switch(r){case 0:i.z_=await n.onListen(s,!0);break;case 1:i.z_=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(a){const l=vf(a,`Initialization of query '${bs(e.query)}' failed`);return void e.onError(l)}n.queries.set(s,i),i.j_.push(e),e.Z_(n.onlineState),i.z_&&e.X_(i.z_)&&bf(n)}async function mC(t,e){const n=ee(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const a=i.j_.indexOf(e);a>=0&&(i.j_.splice(a,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function gC(t,e){const n=ee(t);let r=!1;for(const s of e){const i=s.query,a=n.queries.get(i);if(a){for(const l of a.j_)l.X_(s)&&(r=!0);a.z_=s}}r&&bf(n)}function yC(t,e,n){const r=ee(t),s=r.queries.get(e);if(s)for(const i of s.j_)i.onError(n);r.queries.delete(e)}function bf(t){t.Y_.forEach(e=>{e.next()})}var $h,Dg;(Dg=$h||($h={})).ea="default",Dg.Cache="cache";class vC{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new si(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=si.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==$h.Cache}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Yb{constructor(e){this.key=e}}class Jb{constructor(e){this.key=e}}class bC{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=se(),this.mutatedKeys=se(),this.Aa=wb(e),this.Ra=new qs(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new Rg,s=n?n.Ra:this.Ra;let i=n?n.mutatedKeys:this.mutatedKeys,a=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,y)=>{const v=s.get(f),C=du(this.query,y)?y:null,A=!!v&&this.mutatedKeys.has(v.key),P=!!C&&(C.hasLocalMutations||this.mutatedKeys.has(C.key)&&C.hasCommittedMutations);let M=!1;v&&C?v.data.isEqual(C.data)?A!==P&&(r.track({type:3,doc:C}),M=!0):this.ga(v,C)||(r.track({type:2,doc:C}),M=!0,(u&&this.Aa(C,u)>0||d&&this.Aa(C,d)<0)&&(l=!0)):!v&&C?(r.track({type:0,doc:C}),M=!0):v&&!C&&(r.track({type:1,doc:v}),M=!0,(u||d)&&(l=!0)),M&&(C?(a=a.add(C),i=P?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{Ra:a,fa:r,ns:l,mutatedKeys:i}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const a=e.fa.G_();a.sort((f,y)=>function(v,C){const A=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return J()}};return A(v)-A(C)}(f.type,y.type)||this.Aa(f.doc,y.doc)),this.pa(r),s=s!=null&&s;const l=n&&!s?this.ya():[],u=this.da.size===0&&this.current&&!s?1:0,d=u!==this.Ea;return this.Ea=u,a.length!==0||d?{snapshot:new si(this.query,e.Ra,i,a,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Rg,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=se(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new Jb(r))}),this.da.forEach(r=>{e.has(r)||n.push(new Yb(r))}),n}ba(e){this.Ta=e.Ts,this.da=se();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return si.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class wC{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class xC{constructor(e){this.key=e,this.va=!1}}class kC{constructor(e,n,r,s,i,a){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new di(l=>bb(l),hu),this.Ma=new Map,this.xa=new Set,this.Oa=new Ne(Q.comparator),this.Na=new Map,this.La=new cf,this.Ba={},this.ka=new Map,this.qa=ri.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function _C(t,e,n=!0){const r=sw(t);let s;const i=r.Fa.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await Zb(r,e,n,!0),s}async function EC(t,e){const n=sw(t);await Zb(n,e,!0,!1)}async function Zb(t,e,n,r){const s=await BI(t.localStore,yn(e)),i=s.targetId,a=t.sharedClientState.addLocalQueryTarget(i,n);let l;return r&&(l=await SC(t,e,i,a==="current",s.resumeToken)),t.isPrimaryClient&&n&&Hb(t.remoteStore,s),l}async function SC(t,e,n,r,s){t.Ka=(y,v,C)=>async function(A,P,M,E){let x=P.view.ma(M);x.ns&&(x=await Tg(A.localStore,P.query,!1).then(({documents:F})=>P.view.ma(F,x)));const S=E&&E.targetChanges.get(P.targetId),O=E&&E.targetMismatches.get(P.targetId)!=null,V=P.view.applyChanges(x,A.isPrimaryClient,S,O);return Mg(A,P.targetId,V.wa),V.snapshot}(t,y,v,C);const i=await Tg(t.localStore,e,!0),a=new bC(e,i.Ts),l=a.ma(i.documents),u=Ba.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),d=a.applyChanges(l,t.isPrimaryClient,u);Mg(t,n,d.wa);const f=new wC(e,n,a);return t.Fa.set(e,f),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),d.snapshot}async function IC(t,e,n){const r=ee(t),s=r.Fa.get(e),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter(a=>!hu(a,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await zh(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&ff(r.remoteStore,s.targetId),Bh(r,s.targetId)}).catch(Va)):(Bh(r,s.targetId),await zh(r.localStore,s.targetId,!0))}async function CC(t,e){const n=ee(t),r=n.Fa.get(e),s=n.Ma.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),ff(n.remoteStore,r.targetId))}async function TC(t,e,n){const r=LC(t);try{const s=await function(i,a){const l=ee(i),u=ze.now(),d=a.reduce((v,C)=>v.add(C.key),se());let f,y;return l.persistence.runTransaction("Locally write mutations","readwrite",v=>{let C=zn(),A=se();return l.cs.getEntries(v,d).next(P=>{C=P,C.forEach((M,E)=>{E.isValidDocument()||(A=A.add(M))})}).next(()=>l.localDocuments.getOverlayedDocuments(v,C)).next(P=>{f=P;const M=[];for(const E of a){const x=G2(E,f.get(E.key).overlayedDocument);x!=null&&M.push(new Rr(E.key,x,db(x.value.mapValue),bt.exists(!0)))}return l.mutationQueue.addMutationBatch(v,u,M,a)}).next(P=>{y=P;const M=P.applyToLocalDocumentSet(f,A);return l.documentOverlayCache.saveOverlays(v,P.batchId,M)})}).then(()=>({batchId:y.batchId,changes:kb(f)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(i,a,l){let u=i.Ba[i.currentUser.toKey()];u||(u=new Ne(ce)),u=u.insert(a,l),i.Ba[i.currentUser.toKey()]=u}(r,s.batchId,n),await Ha(r,s.changes),await bu(r.remoteStore)}catch(s){const i=vf(s,"Failed to persist write");n.reject(i)}}async function ew(t,e){const n=ee(t);try{const r=await VI(n.localStore,e);e.targetChanges.forEach((s,i)=>{const a=n.Na.get(i);a&&(me(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.va=!0:s.modifiedDocuments.size>0?me(a.va):s.removedDocuments.size>0&&(me(a.va),a.va=!1))}),await Ha(n,r,e)}catch(r){await Va(r)}}function Lg(t,e,n){const r=ee(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Fa.forEach((i,a)=>{const l=a.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(i,a){const l=ee(i);l.onlineState=a;let u=!1;l.queries.forEach((d,f)=>{for(const y of f.j_)y.Z_(a)&&(u=!0)}),u&&bf(l)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function NC(t,e,n){const r=ee(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Na.get(e),i=s&&s.key;if(i){let a=new Ne(Q.comparator);a=a.insert(i,ht.newNoDocument(i,Z.min()));const l=se().add(i),u=new gu(Z.min(),new Map,new Ne(ce),a,l);await ew(r,u),r.Oa=r.Oa.remove(i),r.Na.delete(e),wf(r)}else await zh(r.localStore,e,!1).then(()=>Bh(r,e,n)).catch(Va)}async function AC(t,e){const n=ee(t),r=e.batch.batchId;try{const s=await FI(n.localStore,e);nw(n,r,null),tw(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Ha(n,s)}catch(s){await Va(s)}}async function PC(t,e,n){const r=ee(t);try{const s=await function(i,a){const l=ee(i);return l.persistence.runTransaction("Reject batch","readwrite-primary",u=>{let d;return l.mutationQueue.lookupMutationBatch(u,a).next(f=>(me(f!==null),d=f.keys(),l.mutationQueue.removeMutationBatch(u,f))).next(()=>l.mutationQueue.performConsistencyCheck(u)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(u,d,a)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,d)).next(()=>l.localDocuments.getDocuments(u,d))})}(r.localStore,e);nw(r,e,n),tw(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Ha(r,s)}catch(s){await Va(s)}}function tw(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function nw(t,e,n){const r=ee(t);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function Bh(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||rw(t,r)})}function rw(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(ff(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),wf(t))}function Mg(t,e,n){for(const r of n)r instanceof Yb?(t.La.addReference(r.key,e),RC(t,r)):r instanceof Jb?(K("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||rw(t,r.key)):J()}function RC(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(K("SyncEngine","New document in limbo: "+n),t.xa.add(r),wf(t))}function wf(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new Q(Ee.fromString(e)),r=t.qa.next();t.Na.set(r,new xC(n)),t.Oa=t.Oa.insert(n,r),Hb(t.remoteStore,new lr(yn(sf(n.path)),r,"TargetPurposeLimboResolution",Jd.oe))}}async function Ha(t,e,n){const r=ee(t),s=[],i=[],a=[];r.Fa.isEmpty()||(r.Fa.forEach((l,u)=>{a.push(r.Ka(u,e,n).then(d=>{var f;if((d||n)&&r.isPrimaryClient){const y=d?!d.fromCache:(f=n==null?void 0:n.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,y?"current":"not-current")}if(d){s.push(d);const y=df.Wi(u.targetId,d);i.push(y)}}))}),await Promise.all(a),r.Ca.d_(s),await async function(l,u){const d=ee(l);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",f=>L.forEach(u,y=>L.forEach(y.$i,v=>d.persistence.referenceDelegate.addReference(f,y.targetId,v)).next(()=>L.forEach(y.Ui,v=>d.persistence.referenceDelegate.removeReference(f,y.targetId,v)))))}catch(f){if(!za(f))throw f;K("LocalStore","Failed to update sequence numbers: "+f)}for(const f of u){const y=f.targetId;if(!f.fromCache){const v=d.os.get(y),C=v.snapshotVersion,A=v.withLastLimboFreeSnapshotVersion(C);d.os=d.os.insert(y,A)}}}(r.localStore,i))}async function OC(t,e){const n=ee(t);if(!n.currentUser.isEqual(e)){K("SyncEngine","User change. New user:",e.toKey());const r=await zb(n.localStore,e);n.currentUser=e,function(s,i){s.ka.forEach(a=>{a.forEach(l=>{l.reject(new W(D.CANCELLED,i))})}),s.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Ha(n,r.hs)}}function DC(t,e){const n=ee(t),r=n.Na.get(e);if(r&&r.va)return se().add(r.key);{let s=se();const i=n.Ma.get(e);if(!i)return s;for(const a of i){const l=n.Fa.get(a);s=s.unionWith(l.view.Va)}return s}}function sw(t){const e=ee(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=ew.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=DC.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=NC.bind(null,e),e.Ca.d_=gC.bind(null,e.eventManager),e.Ca.$a=yC.bind(null,e.eventManager),e}function LC(t){const e=ee(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=AC.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=PC.bind(null,e),e}class Vl{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=yu(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return UI(this.persistence,new MI,e.initialUser,this.serializer)}Ga(e){return new OI(hf.Zr,this.serializer)}Wa(e){return new HI}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Vl.provider={build:()=>new Vl};class qh{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Lg(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=OC.bind(null,this.syncEngine),await hC(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new fC}()}createDatastore(e){const n=yu(e.databaseInfo.databaseId),r=function(s){return new QI(s)}(e.databaseInfo);return function(s,i,a,l){return new JI(s,i,a,l)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(n,r,s,i,a){return new eC(n,r,s,i,a)}(this.localStore,this.datastore,e.asyncQueue,n=>Lg(this.syncEngine,n,0),function(){return Ag.D()?new Ag:new KI}())}createSyncEngine(e,n){return function(r,s,i,a,l,u,d){const f=new kC(r,s,i,a,l,u);return d&&(f.Qa=!0),f}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(r){const s=ee(r);K("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await qa(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}qh.provider={build:()=>new qh};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*//**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class MC{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Vn("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class jC{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=ut.UNAUTHENTICATED,this.clientId=ub.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{K("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(K("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Xr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=vf(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Ic(t,e){t.asyncQueue.verifyOperationInProgress(),K("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await zb(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function jg(t,e){t.asyncQueue.verifyOperationInProgress();const n=await UC(t);K("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>Pg(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>Pg(e.remoteStore,s)),t._onlineComponents=e}async function UC(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){K("FirestoreClient","Using user provided OfflineComponentProvider");try{await Ic(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(r){return r.name==="FirebaseError"?r.code===D.FAILED_PRECONDITION||r.code===D.UNIMPLEMENTED:!(typeof DOMException<"u"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11}(n))throw n;Zs("Error using user provided cache. Falling back to memory cache: "+n),await Ic(t,new Vl)}}else K("FirestoreClient","Using default OfflineComponentProvider"),await Ic(t,new Vl);return t._offlineComponents}async function iw(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(K("FirestoreClient","Using user provided OnlineComponentProvider"),await jg(t,t._uninitializedComponentsProvider._online)):(K("FirestoreClient","Using default OnlineComponentProvider"),await jg(t,new qh))),t._onlineComponents}function FC(t){return iw(t).then(e=>e.syncEngine)}async function Ug(t){const e=await iw(t),n=e.eventManager;return n.onListen=_C.bind(null,e.syncEngine),n.onUnlisten=IC.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=EC.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=CC.bind(null,e.syncEngine),n}/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function aw(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const Fg=new Map;/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function ow(t,e,n){if(!n)throw new W(D.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function VC(t,e,n,r){if(e===!0&&r===!0)throw new W(D.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Vg(t){if(!Q.isDocumentKey(t))throw new W(D.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function zg(t){if(Q.isDocumentKey(t))throw new W(D.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function xf(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":J()}function ln(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new W(D.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=xf(t);throw new W(D.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class $g{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new W(D.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new W(D.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}VC("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=aw((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new W(D.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new W(D.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new W(D.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(n,r){return n.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class wu{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new $g({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new W(D.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new W(D.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new $g(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new e2;switch(n.type){case"firstParty":return new s2(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new W(D.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=Fg.get(e);n&&(K("ComponentProvider","Removing Datastore"),Fg.delete(e),n.terminate())}(this),Promise.resolve()}}function zC(t,e,n,r={}){var s;const i=(t=ln(t,wu))._getSettings(),a=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==a&&Zs("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:a,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=ut.MOCK_USER;else{l=Nk(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new W(D.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new ut(d)}t._authCredentials=new t2(new lb(l,u))}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class xu{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new xu(this.firestore,e,this._query)}}class Pt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new xr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Pt(this.firestore,e,this._key)}}class xr extends xu{constructor(e,n,r){super(e,n,sf(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Pt(this.firestore,null,new Q(e))}withConverter(e){return new xr(this.firestore,e,this._path)}}function Oo(t,e,...n){if(t=Ge(t),ow("collection","path",e),t instanceof wu){const r=Ee.fromString(e,...n);return zg(r),new xr(t,null,r)}{if(!(t instanceof Pt||t instanceof xr))throw new W(D.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Ee.fromString(e,...n));return zg(r),new xr(t.firestore,null,r)}}function Et(t,e,...n){if(t=Ge(t),arguments.length===1&&(e=ub.newId()),ow("doc","path",e),t instanceof wu){const r=Ee.fromString(e,...n);return Vg(r),new Pt(t,null,new Q(r))}{if(!(t instanceof Pt||t instanceof xr))throw new W(D.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Ee.fromString(e,...n));return Vg(r),new Pt(t.firestore,t instanceof xr?t.converter:null,new Q(r))}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Bg{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Bb(this,"async_queue_retry"),this.Vu=()=>{const r=Sc();r&&K("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=Sc();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=Sc();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new Xr;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!za(e))throw e;K("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(i){let a=i.message||"";return i.stack&&(a=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),a}(r);throw Vn("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const s=yf.createAndSchedule(this,e,n,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&J()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}function qg(t){return function(e,n){if(typeof e!="object"||e===null)return!1;const r=e;for(const s of n)if(s in r&&typeof r[s]=="function")return!0;return!1}(t,["next","error","complete"])}class Tr extends wu{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new Bg,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Bg(e),this._firestoreClient=void 0,await e}}}function $C(t,e){const n=typeof t=="object"?t:w0(),r=typeof t=="string"?t:"(default)",s=$d(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Ck("firestore");i&&zC(s,...i)}return s}function kf(t){if(t._terminated)throw new W(D.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||BC(t),t._firestoreClient}function BC(t){var e,n,r;const s=t._freezeSettings(),i=function(a,l,u,d){return new y2(a,l,u,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,aw(d.experimentalLongPollingOptions),d.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new jC(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(a){const l=a==null?void 0:a._online.build();return{_offline:a==null?void 0:a._offline.build(l),_online:l}}(t._componentsProvider))}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class ii{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ii(nt.fromBase64String(e))}catch(n){throw new W(D.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new ii(nt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Ka{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new W(D.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Je(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class ku{constructor(e){this._methodName=e}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class _f{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new W(D.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new W(D.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ce(this._lat,e._lat)||ce(this._long,e._long)}}/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Ef{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(n,r){if(n.length!==r.length)return!1;for(let s=0;s<n.length;++s)if(n[s]!==r[s])return!1;return!0}(this._values,e._values)}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const qC=/^__.*__$/;class HC{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Rr(e,this.data,this.fieldMask,n,this.fieldTransforms):new $a(e,this.data,n,this.fieldTransforms)}}class lw{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Rr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function uw(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw J()}}class Sf{constructor(e,n,r,s,i,a){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Sf(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return zl(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(uw(this.Cu)&&qC.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class KC{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||yu(e)}Qu(e,n,r,s=!1){return new Sf({Cu:e,methodName:n,qu:r,path:Je.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function _u(t){const e=t._freezeSettings(),n=yu(t._databaseId);return new KC(t._databaseId,!!e.ignoreUndefinedProperties,n)}function If(t,e,n,r,s,i={}){const a=t.Qu(i.merge||i.mergeFields?2:0,e,n,s);Tf("Data must be an object, but it was:",a,r);const l=dw(r,a);let u,d;if(i.merge)u=new Mt(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const y of i.mergeFields){const v=Hh(e,y,n);if(!a.contains(v))throw new W(D.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);pw(f,v)||f.push(v)}u=new Mt(f),d=a.fieldTransforms.filter(y=>u.covers(y.field))}else u=null,d=a.fieldTransforms;return new HC(new It(l),u,d)}class Eu extends ku{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Eu}}class Cf extends ku{_toFieldTransform(e){return new B2(e.path,new Ca)}isEqual(e){return e instanceof Cf}}function cw(t,e,n,r){const s=t.Qu(1,e,n);Tf("Data must be an object, but it was:",s,r);const i=[],a=It.empty();us(r,(u,d)=>{const f=Nf(e,u,n);d=Ge(d);const y=s.Nu(f);if(d instanceof Eu)i.push(f);else{const v=Su(d,y);v!=null&&(i.push(f),a.set(f,v))}});const l=new Mt(i);return new lw(a,l,s.fieldTransforms)}function hw(t,e,n,r,s,i){const a=t.Qu(1,e,n),l=[Hh(e,r,n)],u=[s];if(i.length%2!=0)throw new W(D.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let v=0;v<i.length;v+=2)l.push(Hh(e,i[v])),u.push(i[v+1]);const d=[],f=It.empty();for(let v=l.length-1;v>=0;--v)if(!pw(d,l[v])){const C=l[v];let A=u[v];A=Ge(A);const P=a.Nu(C);if(A instanceof Eu)d.push(C);else{const M=Su(A,P);M!=null&&(d.push(C),f.set(C,M))}}const y=new Mt(d);return new lw(f,y,a.fieldTransforms)}function Su(t,e){if(fw(t=Ge(t)))return Tf("Unsupported field value:",e,t),dw(t,e);if(t instanceof ku)return function(n,r){if(!uw(r.Cu))throw r.Bu(`${n._methodName}() can only be used with update() and set()`);if(!r.path)throw r.Bu(`${n._methodName}() is not currently supported inside arrays`);const s=n._toFieldTransform(r);s&&r.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(n,r){const s=[];let i=0;for(const a of n){let l=Su(a,r.Lu(i));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),i++}return{arrayValue:{values:s}}}(t,e)}return function(n,r){if((n=Ge(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return V2(r.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const s=ze.fromDate(n);return{timestampValue:Ul(r.serializer,s)}}if(n instanceof ze){const s=new ze(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Ul(r.serializer,s)}}if(n instanceof _f)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof ii)return{bytesValue:Db(r.serializer,n._byteString)};if(n instanceof Pt){const s=r.databaseId,i=n.firestore._databaseId;if(!i.isEqual(s))throw r.Bu(`Document reference is for database ${i.projectId}/${i.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:uf(n.firestore._databaseId||r.databaseId,n._key.path)}}if(n instanceof Ef)return function(s,i){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:s.toArray().map(a=>{if(typeof a!="number")throw i.Bu("VectorValues must only contain numeric values.");return af(i.serializer,a)})}}}}}}(n,r);throw r.Bu(`Unsupported field value: ${xf(n)}`)}(t,e)}function dw(t,e){const n={};return cb(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):us(t,(r,s)=>{const i=Su(s,e.Mu(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function fw(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof ze||t instanceof _f||t instanceof ii||t instanceof Pt||t instanceof ku||t instanceof Ef)}function Tf(t,e,n){if(!fw(n)||!function(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}(n)){const r=xf(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function Hh(t,e,n){if((e=Ge(e))instanceof Ka)return e._internalPath;if(typeof e=="string")return Nf(t,e);throw zl("Field path arguments must be of type string or ",t,!1,void 0,n)}const GC=new RegExp("[~\\*/\\[\\]]");function Nf(t,e,n){if(e.search(GC)>=0)throw zl(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Ka(...e.split("."))._internalPath}catch{throw zl(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function zl(t,e,n,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new W(D.INVALID_ARGUMENT,l+t+u)}function pw(t,e){return t.some(n=>n.isEqual(e))}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class mw{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Pt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new WC(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(gw("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class WC extends mw{data(){return super.data()}}function gw(t,e){return typeof e=="string"?Nf(t,e):e instanceof Ka?e._internalPath:e._delegate._internalPath}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function QC(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new W(D.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class XC{convertValue(e,n="none"){switch(as(e)){case 0:return null;case 1:return e.booleanValue;case 2:return De(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(is(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw J()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return us(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){var n,r,s;const i=(s=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>De(a.doubleValue));return new Ef(i)}convertGeoPoint(e){return new _f(De(e.latitude),De(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=ef(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Ea(e));default:return null}}convertTimestamp(e){const n=Ir(e);return new ze(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Ee.fromString(e);me(Vb(r));const s=new Sa(r.get(1),r.get(3)),i=new Q(r.popFirst(5));return s.isEqual(n)||Vn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Af(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Bi{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class yw extends mw{constructor(e,n,r,s,i,a){super(e,n,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new tl(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(gw("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class tl extends yw{data(e={}){return super.data(e)}}class YC{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new Bi(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new tl(this._firestore,this._userDataWriter,r.key,r,new Bi(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new W(D.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(r,s){if(r._snapshot.oldDocs.isEmpty()){let i=0;return r._snapshot.docChanges.map(a=>{const l=new tl(r._firestore,r._userDataWriter,a.doc.key,a.doc,new Bi(r._snapshot.mutatedKeys.has(a.doc.key),r._snapshot.fromCache),r.query.converter);return a.doc,{type:"added",doc:l,oldIndex:-1,newIndex:i++}})}{let i=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(a=>s||a.type!==3).map(a=>{const l=new tl(r._firestore,r._userDataWriter,a.doc.key,a.doc,new Bi(r._snapshot.mutatedKeys.has(a.doc.key),r._snapshot.fromCache),r.query.converter);let u=-1,d=-1;return a.type!==0&&(u=i.indexOf(a.doc.key),i=i.delete(a.doc.key)),a.type!==1&&(i=i.add(a.doc),d=i.indexOf(a.doc.key)),{type:JC(a.type),doc:l,oldIndex:u,newIndex:d}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function JC(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return J()}}class vw extends XC{constructor(e){super(),this.firestore=e}convertBytes(e){return new ii(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Pt(this.firestore,null,n)}}function Hg(t,e,n){t=ln(t,Pt);const r=ln(t.firestore,Tr),s=Af(t.converter,e,n);return Ga(r,[If(_u(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,bt.none())])}function ZC(t,e,n,...r){t=ln(t,Pt);const s=ln(t.firestore,Tr),i=_u(s);let a;return a=typeof(e=Ge(e))=="string"||e instanceof Ka?hw(i,"updateDoc",t._key,e,n,r):cw(i,"updateDoc",t._key,e),Ga(s,[a.toMutation(t._key,bt.exists(!0))])}function eT(t){return Ga(ln(t.firestore,Tr),[new mu(t._key,bt.none())])}function tT(t,e){const n=ln(t.firestore,Tr),r=Et(t),s=Af(t.converter,e);return Ga(n,[If(_u(t.firestore),"addDoc",r._key,s,t.converter!==null,{}).toMutation(r._key,bt.exists(!1))]).then(()=>r)}function Cc(t,...e){var n,r,s;t=Ge(t);let i={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||qg(e[a])||(i=e[a],a++);const l={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(qg(e[a])){const y=e[a];e[a]=(n=y.next)===null||n===void 0?void 0:n.bind(y),e[a+1]=(r=y.error)===null||r===void 0?void 0:r.bind(y),e[a+2]=(s=y.complete)===null||s===void 0?void 0:s.bind(y)}let u,d,f;if(t instanceof Pt)d=ln(t.firestore,Tr),f=sf(t._key.path),u={next:y=>{e[a]&&e[a](nT(d,t,y))},error:e[a+1],complete:e[a+2]};else{const y=ln(t,xu);d=ln(y.firestore,Tr),f=y._query;const v=new vw(d);u={next:C=>{e[a]&&e[a](new YC(d,v,y,C))},error:e[a+1],complete:e[a+2]},QC(t._query)}return function(y,v,C,A){const P=new MC(A),M=new vC(v,P,C);return y.asyncQueue.enqueueAndForget(async()=>pC(await Ug(y),M)),()=>{P.Za(),y.asyncQueue.enqueueAndForget(async()=>mC(await Ug(y),M))}}(kf(d),f,l,u)}function Ga(t,e){return function(n,r){const s=new Xr;return n.asyncQueue.enqueueAndForget(async()=>TC(await FC(n),r,s)),s.promise}(kf(t),e)}function nT(t,e,n){const r=n.docs.get(e._key),s=new vw(t);return new yw(t,s,e._key,r,new Bi(n.hasPendingWrites,n.fromCache),e.converter)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class rT{constructor(e,n){this._firestore=e,this._commitHandler=n,this._mutations=[],this._committed=!1,this._dataReader=_u(e)}set(e,n,r){this._verifyNotCommitted();const s=Tc(e,this._firestore),i=Af(s.converter,n,r),a=If(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(a.toMutation(s._key,bt.none())),this}update(e,n,r,...s){this._verifyNotCommitted();const i=Tc(e,this._firestore);let a;return a=typeof(n=Ge(n))=="string"||n instanceof Ka?hw(this._dataReader,"WriteBatch.update",i._key,n,r,s):cw(this._dataReader,"WriteBatch.update",i._key,n),this._mutations.push(a.toMutation(i._key,bt.exists(!0))),this}delete(e){this._verifyNotCommitted();const n=Tc(e,this._firestore);return this._mutations=this._mutations.concat(new mu(n._key,bt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new W(D.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Tc(t,e){if((t=Ge(t)).firestore!==e)throw new W(D.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return t}function Kg(){return new Cf("serverTimestamp")}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Li(t){return kf(t=ln(t,Tr)),new rT(t,e=>Ga(t,e))}(function(t,e=!0){(function(n){hi=n})(ui),Js(new ns("firestore",(n,{instanceIdentifier:r,options:s})=>{const i=n.getProvider("app").getImmediate(),a=new Tr(new n2(n.getProvider("auth-internal")),new a2(n.getProvider("app-check-internal")),function(l,u){if(!Object.prototype.hasOwnProperty.apply(l.options,["projectId"]))throw new W(D.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Sa(l.options.projectId,u)}(i,r),i);return s=Object.assign({useFetchStreams:e},s),a._setSettings(s),a},"PUBLIC").setMultipleInstances(!0)),br(og,"4.7.3",t),br(og,"4.7.3","esm2017")})();/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/var sT={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const iT=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),$e=(t,e)=>{const n=fe.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:i=2,absoluteStrokeWidth:a,className:l="",children:u,...d},f)=>fe.createElement("svg",{ref:f,...sT,width:s,height:s,stroke:r,strokeWidth:a?Number(i)*24/Number(s):i,className:["lucide",`lucide-${iT(t)}`,l].join(" "),...d},[...e.map(([y,v])=>fe.createElement(y,v)),...Array.isArray(u)?u:[u]]));return n.displayName=`${t}`,n};/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const bw=$e("AlertTriangle",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"c3ski4"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const aT=$e("ArrowDown",[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]]);/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const Nc=$e("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const oT=$e("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]);/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const lT=$e("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const Fr=$e("Crown",[["path",{d:"m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14",key:"zkxr6b"}]]);/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const uT=$e("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const Ac=$e("Monitor",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const cT=$e("Pen",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}]]);/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const Gg=$e("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const Wg=$e("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const hT=$e("RefreshCcw",[["path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"14sxne"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",key:"1hlbsb"}],["path",{d:"M16 16h5v5",key:"ccwih5"}]]);/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const dT=$e("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const fT=$e("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]]);/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const pT=$e("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const Qg=$e("Ticket",[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"qn84l0"}],["path",{d:"M13 5v2",key:"dyzc3o"}],["path",{d:"M13 17v2",key:"1ont0d"}],["path",{d:"M13 11v2",key:"1wjjxi"}]]);/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const Xg=$e("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const vs=$e("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
* @license lucide-react v0.294.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const mT=$e("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),gT={apiKey:"AIzaSyDRjxIWJc5BabyvRbhR6uZ8ZaO3J70OKfc",authDomain:"eoelior-17bed.firebaseapp.com",projectId:"eoelior-17bed",storageBucket:"eoelior-17bed.firebasestorage.app",messagingSenderId:"722816989754",appId:"1:722816989754:web:e6ce3c57198d6bb7769303"},ww=b0(gT),Yg=JS(ww),Oe=$C(ww),lt="lottery-weare",Do=({children:t,className:e="",onClick:n})=>g.jsx("div",{onClick:n,className:`bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden ${e}`,children:t}),Ot=({children:t,onClick:e,variant:n="primary",disabled:r=!1,className:s="",size:i="md"})=>{const a=`rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${{sm:"px-3 py-1 text-sm",md:"px-4 py-2 text-base",lg:"px-8 py-4 text-xl tracking-widest",xl:"px-12 py-6 text-2xl font-black tracking-[0.2em]"}[i]}`,l={primary:"bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(8,145,178,0.4)] border border-cyan-400/20",secondary:"bg-slate-800 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-950/50 hover:border-cyan-400 hover:text-cyan-300",danger:"bg-red-950/30 text-red-400 border border-red-900/50 hover:bg-red-900/50 hover:text-red-300 hover:border-red-500/50",success:"bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]",ghost:"bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/50",gold:"bg-gradient-to-r from-yellow-600 to-amber-600 text-white hover:from-yellow-500 hover:to-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)] border border-yellow-400/30"};return g.jsx("button",{onClick:e,disabled:r,className:`${a} ${l[n]} ${s}`,children:t})},yT=({active:t})=>t?g.jsx("div",{className:"fixed inset-0 pointer-events-none z-[100] overflow-hidden",children:[...Array(70)].map((e,n)=>g.jsx("div",{className:"absolute animate-confetti",style:{left:`${Math.random()*100}%`,top:"-5%",backgroundColor:["#06b6d4","#3b82f6","#8b5cf6","#fbbf24","#f472b6"][Math.floor(Math.random()*5)],width:`${Math.random()*10+5}px`,height:`${Math.random()*20+10}px`,boxShadow:"0 0 15px currentColor",animationDuration:`${Math.random()*2+1.5}s`,animationDelay:`${Math.random()*1}s`}},n))}):null,vT=({isOpen:t,title:e,message:n,onConfirm:r,onCancel:s})=>t?g.jsx("div",{className:"fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200",children:g.jsxs("div",{className:"bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-sm w-full overflow-hidden scale-100 animate-in zoom-in-95 duration-200",children:[g.jsxs("div",{className:"p-6",children:[g.jsxs("h3",{className:"text-xl font-bold text-white mb-2 flex items-center gap-2",children:[g.jsx(bw,{className:"w-5 h-5 text-yellow-500"}),e]}),g.jsx("p",{className:"text-slate-300 leading-relaxed",children:n})]}),g.jsxs("div",{className:"bg-slate-800/50 p-4 flex justify-end gap-3 border-t border-slate-700",children:[g.jsx("button",{onClick:s,className:"px-4 py-2 text-slate-300 font-bold hover:bg-slate-700 rounded-lg transition-colors",children:"取消"}),g.jsx("button",{onClick:r,className:"px-4 py-2 bg-red-600 text-white font-bold hover:bg-red-700 rounded-lg shadow-md transition-colors",children:"確認執行"})]})]})}):null,bT=({isOpen:t,title:e,message:n,onClose:r})=>t?g.jsx("div",{className:"fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200",children:g.jsxs("div",{className:"bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-sm w-full overflow-hidden scale-100 animate-in zoom-in-95 duration-200",children:[g.jsxs("div",{className:"p-6",children:[g.jsxs("h3",{className:"text-xl font-bold text-white mb-2 flex items-center gap-2",children:[g.jsx(uT,{className:"w-5 h-5 text-cyan-500"}),e]}),g.jsx("p",{className:"text-slate-300 leading-relaxed",children:n})]}),g.jsx("div",{className:"bg-slate-800/50 p-4 flex justify-end border-t border-slate-700",children:g.jsx("button",{onClick:r,className:"px-6 py-2 bg-cyan-600 text-white font-bold hover:bg-cyan-700 rounded-lg shadow-md transition-colors",children:"確定"})})]})}):null;function wT(){const[t,e]=fe.useState(null),[n,r]=fe.useState("display"),[s,i]=fe.useState({title:"年末狂歡會"}),[a,l]=fe.useState([]),[u,d]=fe.useState([]),[f,y]=fe.useState("standby"),[v,C]=fe.useState(null),[A,P]=fe.useState(1),[M,E]=fe.useState([]),[x,S]=fe.useState(!1),[O,V]=fe.useState({isOpen:!1,title:"",message:"",onConfirm:()=>{}}),[F,w]=fe.useState({isOpen:!1,title:"",message:""});fe.useEffect(()=>((async()=>{try{await LE(Yg)}catch(U){console.error("Auth Error:",U)}})(),zE(Yg,e)),[]),fe.useEffect(()=>{if(!t)return;const U=Cc(Et(Oe,"artifacts",lt,"public","data","config","main"),B=>{B.exists()?i(B.data()):Hg(Et(Oe,"artifacts",lt,"public","data","config","main"),{title:"年末狂歡會"})}),H=Cc(Oo(Oe,"artifacts",lt,"public","data","prizes"),B=>{const ne=B.docs.map(ie=>({id:ie.id,...ie.data()}));ne.sort((ie,ve)=>(ie.order||0)-(ve.order||0)),l(ne)}),G=Cc(Oo(Oe,"artifacts",lt,"public","data","tickets"),B=>{const ne=B.docs.map(ie=>({id:ie.id,...ie.data()}));ne.sort((ie,ve)=>{const zt=parseInt(ie.number)||0,rt=parseInt(ve.number)||0;return zt-rt}),d(ne)});return()=>{U(),H(),G()}},[t]);const m=fe.useMemo(()=>u.filter(U=>!U.isWinner),[u]),b=(U,H,G)=>{V({isOpen:!0,title:U,message:H,onConfirm:async()=>{await G(),V(B=>({...B,isOpen:!1}))}})},k=(U,H)=>{w({isOpen:!0,title:U,message:H})},I=async U=>{t&&await Hg(Et(Oe,"artifacts",lt,"public","data","config","main"),{title:U},{merge:!0})},T=async(U,H)=>{if(!t)return;const G=Li(Oe),B=parseInt(U),ne=parseInt(H),ie=ne-B+1;if(ie>450){k("數量過多","一次最多只能生成 450 張彩票，請分批操作！");return}for(let ve=B;ve<=ne;ve++){const zt=ve.toString().padStart(3,"0");if(!u.find(rt=>rt.number===zt)){const rt=Et(Oo(Oe,"artifacts",lt,"public","data","tickets"));G.set(rt,{number:zt,isWinner:!1,createdAt:Kg()})}}await G.commit(),k("成功",`已生成 ${ie} 張彩票！`)},_=()=>{b("清空彩票","確定要刪除所有彩票嗎？此動作無法復原！",async()=>{const U=Li(Oe);u.slice(0,499).forEach(H=>U.delete(Et(Oe,"artifacts",lt,"public","data","tickets",H.id))),await U.commit()})},kt=()=>{b("重置系統","這將清空所有獎項的得主名單，並將所有彩票恢復為未中獎狀態。確定要執行嗎？",async()=>{const U=Li(Oe);a.forEach(H=>{const G=Et(Oe,"artifacts",lt,"public","data","prizes",H.id);U.update(G,{winners:[]})}),u.filter(H=>H.isWinner).forEach(H=>{const G=Et(Oe,"artifacts",lt,"public","data","tickets",H.id);U.update(G,{isWinner:!1,wonPrizeId:null})}),await U.commit()})},xn=async(U,H,G)=>{t&&await tT(Oo(Oe,"artifacts",lt,"public","data","prizes"),{name:U,quantity:parseInt(H),isGrandPrize:!!G,winners:[],order:Date.now(),createdAt:Kg()})},Or=async(U,H,G,B)=>{t&&(!H||G<=0||await ZC(Et(Oe,"artifacts",lt,"public","data","prizes",U),{name:H,quantity:parseInt(G),isGrandPrize:!!B}))},Wt=U=>{b("刪除獎項","確定要刪除此獎項嗎？已中獎的紀錄可能會受影響。",async()=>{await eT(Et(Oe,"artifacts",lt,"public","data","prizes",U))})},$=async(U,H)=>{if(U+H<0||U+H>=a.length)return;const G=a[U],B=a[U+H],ne=Li(Oe),ie=Et(Oe,"artifacts",lt,"public","data","prizes",G.id),ve=Et(Oe,"artifacts",lt,"public","data","prizes",B.id);ne.update(ie,{order:B.order||Date.now()}),ne.update(ve,{order:G.order||Date.now()}),await ne.commit()},X=()=>y("select-prize"),te=U=>{var H;C(U.id);const G=U.quantity-(((H=U.winners)==null?void 0:H.length)||0);P(G>0?1:0),y("config-qty")},ye=async()=>{const U=a.find(Re=>Re.id===v);if(!U)return;if(m.length===0){k("票池為空","目前沒有可用的彩票！請先至「後台管理」生成彩票。");return}if(m.length<A){k("票數不足",`剩餘有效票數僅有 ${m.length} 張，無法抽出 ${A} 位得主。`);return}if(A<=0){k("設定錯誤","抽獎數量必須大於 0");return}const H=[...m].sort(()=>.5-Math.random()).slice(0,A),G=H.map(Re=>Re.number),B=Li(Oe);H.forEach(Re=>{const pt=Et(Oe,"artifacts",lt,"public","data","tickets",Re.id);B.update(pt,{isWinner:!0,wonPrizeId:v})});const ne=Et(Oe,"artifacts",lt,"public","data","prizes",v),ie=[...U.winners||[],...G];B.update(ne,{winners:ie}),await B.commit(),y("drawing"),S(!1);let ve=Array.from({length:A},()=>({number:"000",locked:!1}));E(ve);const zt=setInterval(()=>{E(Re=>Re.map(pt=>pt.locked?pt:{number:Math.floor(Math.random()*999).toString().padStart(3,"0"),locked:!1}))},50),rt=Re=>new Promise(pt=>setTimeout(pt,Re));await rt(1500);for(let Re=0;Re<H.length;Re++){E(hs=>{const qn=[...hs];return qn[Re]={number:H[Re].number,locked:!0},qn});const pt=A>10?200:800;Re<H.length-1&&await rt(pt)}clearInterval(zt),await rt(1e3),E(H),y("result"),S(!0)},he=()=>{const U=a.filter(G=>G.isGrandPrize),H=a.filter(G=>!G.isGrandPrize);return g.jsxs("div",{className:"h-full w-full flex flex-col p-6 max-w-[95vw] mx-auto relative",children:[g.jsxs("div",{className:"text-center mb-6 flex-shrink-0 relative z-10",children:[g.jsx("h1",{className:"text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)] tracking-tighter mb-4",children:s.title}),g.jsxs("div",{className:"flex justify-center gap-6",children:[g.jsxs("div",{className:"flex items-center gap-2 text-cyan-400",children:[g.jsx(Qg,{className:"w-4 h-4"}),g.jsx("span",{className:"text-sm font-bold tracking-widest text-slate-400",children:"總票池"}),g.jsx("span",{className:"font-mono text-white",children:u.length})]}),g.jsx("div",{className:"w-px h-4 bg-slate-700 self-center"}),g.jsxs("div",{className:"flex items-center gap-2 text-emerald-400",children:[g.jsx(hT,{className:"w-4 h-4"}),g.jsx("span",{className:"text-sm font-bold tracking-widest text-slate-400",children:"待中獎"}),g.jsx("span",{className:"font-mono text-white",children:m.length})]})]})]}),g.jsxs("div",{onDoubleClick:()=>r("admin"),className:"flex-1 overflow-y-auto pb-32 scrollbar-none mask-image-gradient px-2 space-y-6",children:[a.length===0&&g.jsx("div",{className:"text-center text-slate-600 mt-20 font-mono tracking-widest",children:"NO PRIZES CONFIGURED"}),U.length>0&&g.jsxs("div",{className:"space-y-4 mb-8",children:[g.jsxs("div",{className:"flex items-center justify-center gap-3 text-yellow-500/80 mb-2",children:[g.jsx("div",{className:"h-px flex-1 bg-gradient-to-r from-transparent to-yellow-500/50"}),g.jsx(Fr,{className:"w-5 h-5"}),g.jsx("span",{className:"text-sm font-bold tracking-[0.2em] uppercase",children:"Grand Prize"}),g.jsx("div",{className:"h-px flex-1 bg-gradient-to-l from-transparent to-yellow-500/50"})]}),g.jsx("div",{className:"grid grid-cols-1 gap-4",children:U.map(G=>{var B;const ne=G.quantity-(((B=G.winners)==null?void 0:B.length)||0),ie=ne===0;return g.jsxs("div",{className:`group relative p-6 rounded-2xl border transition-all duration-500 ${ie?"bg-slate-900/40 border-slate-800 opacity-50 grayscale":"bg-gradient-to-br from-slate-900/90 via-yellow-900/10 to-slate-900/90 border-yellow-500/50 shadow-[0_0_40px_rgba(234,179,8,0.15)] hover:shadow-[0_0_60px_rgba(234,179,8,0.25)] hover:scale-[1.02]"}`,children:[!ie&&g.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer pointer-events-none rounded-2xl"}),g.jsxs("div",{className:"flex items-center justify-between",children:[g.jsxs("div",{className:"flex items-center gap-6",children:[g.jsx("div",{className:`w-16 h-16 flex items-center justify-center rounded-2xl ${ie?"bg-slate-800 text-slate-600":"bg-gradient-to-br from-yellow-400 to-amber-600 text-white shadow-lg shadow-amber-500/20"}`,children:g.jsx(vs,{className:"w-8 h-8"})}),g.jsxs("div",{children:[g.jsx("h3",{className:`text-4xl font-black tracking-wide ${ie?"text-slate-500":"text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-400"}`,children:G.name}),g.jsxs("div",{className:"text-sm text-yellow-500/60 font-mono mt-1 uppercase tracking-widest flex items-center gap-2",children:[g.jsx(Fr,{className:"w-3 h-3"})," Ultimate Reward"]})]})]}),g.jsxs("div",{className:"text-right",children:[g.jsx("div",{className:`text-5xl font-mono font-black leading-none ${ie?"text-slate-600":"text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]"}`,children:ne}),g.jsx("div",{className:"text-xs text-yellow-600/50 font-bold uppercase tracking-widest mt-1",children:"Remaining"})]})]}),ie&&g.jsx("div",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:g.jsx("span",{className:"px-6 py-2 bg-slate-950/90 rounded-lg border border-slate-700 text-slate-400 text-xl font-bold tracking-widest transform -rotate-6 shadow-2xl",children:"CLAIMED"})})]},G.id)})})]}),g.jsx("div",{className:"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3",children:H.map((G,B)=>{var ne;const ie=G.quantity-(((ne=G.winners)==null?void 0:ne.length)||0),ve=ie===0,zt=a.findIndex(rt=>rt.id===G.id);return g.jsxs("div",{className:`group relative p-3 rounded-xl border backdrop-blur-sm transition-all duration-300 ${ve?"bg-slate-900/40 border-slate-800 opacity-50 grayscale":"bg-slate-800/60 border-slate-700 hover:bg-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:scale-[1.02]"}`,children:[g.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[g.jsx("span",{className:`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg font-mono text-xs font-bold ${ve?"bg-slate-800 text-slate-600":"bg-cyan-950 text-cyan-400 border border-cyan-500/30"}`,children:zt+1}),g.jsx("h3",{className:`text-base font-bold tracking-wide leading-tight line-clamp-1 ${ve?"text-slate-500":"text-white"}`,children:G.name})]}),g.jsxs("div",{className:"flex items-end justify-between border-t border-slate-700/50 pt-1.5",children:[g.jsxs("div",{className:"text-[10px] text-slate-500 font-mono uppercase tracking-wider",children:["Total: ",G.quantity]}),g.jsxs("div",{className:"text-right",children:[g.jsx("div",{className:`text-xl font-mono font-black leading-none ${ve?"text-slate-600":"text-emerald-400"}`,children:ie}),g.jsx("div",{className:"text-[8px] text-slate-600 font-bold uppercase tracking-widest",children:"Left"})]})]}),ve&&g.jsx("div",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:g.jsx("span",{className:"px-2 py-0.5 bg-slate-950/80 rounded border border-slate-700 text-slate-400 text-[10px] font-bold tracking-widest transform -rotate-6 shadow-xl",children:"DONE"})})]},G.id)})})]}),g.jsx("div",{className:"fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-20 flex justify-center pointer-events-none",children:g.jsx("div",{className:"pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-full",children:g.jsxs(Ot,{onClick:X,size:"xl",variant:"primary",className:"animate-bounce-slow shadow-[0_0_40px_rgba(8,145,178,0.5)] border-2 border-cyan-400/30 hover:scale-105 active:scale-95",children:[g.jsx(Gg,{fill:"currentColor",className:"w-8 h-8 mr-4"})," 啟動中獎系統"]})})})]})},Se=()=>g.jsxs("div",{className:"h-full flex flex-col p-8",children:[g.jsxs("div",{className:"flex items-center justify-between mb-8 flex-shrink-0",children:[g.jsxs(Ot,{variant:"ghost",onClick:()=>y("standby"),children:[g.jsx(Nc,{className:"w-6 h-6 mr-2"})," 回首頁"]}),g.jsx("h2",{className:"text-3xl font-bold text-cyan-400 tracking-widest",children:"請選擇本次抽獎項目"}),g.jsx("div",{className:"w-24"})]}),g.jsx("div",{className:"flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto content-start pb-20",children:a.map(U=>{var H;const G=U.quantity-(((H=U.winners)==null?void 0:H.length)||0),B=G===0,ne=U.isGrandPrize;return g.jsxs("button",{onClick:()=>!B&&te(U),disabled:B,className:`relative group text-left p-8 rounded-2xl border-2 transition-all duration-300 ${B?"bg-slate-900/50 border-slate-800 grayscale cursor-not-allowed opacity-50":ne?"bg-gradient-to-br from-slate-900 via-yellow-900/10 to-slate-900 border-yellow-500/50 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]":"bg-slate-800/80 border-slate-700 hover:border-cyan-500 hover:bg-slate-800 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"} hover:-translate-y-1`,children:[B&&g.jsx("div",{className:"absolute inset-0 flex items-center justify-center z-10",children:g.jsx("span",{className:"bg-slate-900 text-slate-500 px-4 py-2 rounded-full border border-slate-700 font-bold tracking-widest transform -rotate-12",children:"COMPLETED"})}),g.jsxs("div",{className:"flex justify-between items-start mb-4",children:[ne?g.jsx(Fr,{className:`w-10 h-10 ${B?"text-slate-600":"text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"}`}):g.jsx(vs,{className:`w-10 h-10 ${B?"text-slate-600":"text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"}`}),g.jsxs("div",{className:"text-right",children:[g.jsx("div",{className:"text-sm text-slate-400",children:"剩餘名額"}),g.jsx("div",{className:`text-4xl font-mono font-black ${B?"text-slate-600":ne?"text-yellow-400":"text-emerald-400"}`,children:G})]})]}),g.jsx("h3",{className:`text-2xl font-bold ${B?"text-slate-600":ne?"text-yellow-100":"text-white"}`,children:U.name}),g.jsxs("div",{className:"mt-2 text-slate-500 text-sm font-mono",children:["TOTAL QTY: ",U.quantity]})]},U.id)})})]}),Qt=()=>{var U;const H=a.find(B=>B.id===v);if(!H)return null;const G=H.quantity-(((U=H.winners)==null?void 0:U.length)||0);return g.jsxs("div",{className:"h-full flex flex-col items-center justify-center p-8 relative",children:[g.jsxs(Ot,{variant:"ghost",onClick:()=>y("select-prize"),className:"absolute top-8 left-8",children:[g.jsx(Nc,{className:"w-6 h-6 mr-2"})," 重新選擇獎項"]}),g.jsxs("div",{className:"bg-slate-900/90 border border-slate-700 p-12 rounded-3xl shadow-2xl max-w-3xl w-full text-center relative overflow-hidden",children:[g.jsx("div",{className:`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${H.isGrandPrize?"from-yellow-500 via-amber-500 to-yellow-600":"from-cyan-500 to-purple-500"}`}),g.jsx("h2",{className:"text-slate-400 font-bold tracking-widest mb-2 uppercase",children:"Current Prize"}),g.jsx("h1",{className:`text-5xl font-black mb-8 ${H.isGrandPrize?"text-yellow-400":"text-white"}`,children:H.name}),g.jsxs("div",{className:"flex items-center justify-center gap-12 mb-10",children:[g.jsxs("div",{className:"text-center",children:[g.jsx("div",{className:"text-sm text-slate-500 mb-1",children:"剩餘名額"}),g.jsx("div",{className:`text-4xl font-mono font-bold ${H.isGrandPrize?"text-yellow-400":"text-emerald-400"}`,children:G})]}),g.jsx("div",{className:"w-px h-16 bg-slate-700"}),g.jsxs("div",{className:"text-center",children:[g.jsx("div",{className:"text-sm text-slate-500 mb-1",children:"票池剩餘"}),g.jsx("div",{className:`text-4xl font-mono font-bold ${m.length<A?"text-red-500":"text-cyan-400"}`,children:m.length})]}),g.jsx("div",{className:"w-px h-16 bg-slate-700"}),g.jsxs("div",{className:"text-center",children:[g.jsx("div",{className:"text-sm text-slate-500 mb-1",children:"本次抽出"}),g.jsxs("div",{className:"flex items-center gap-4",children:[g.jsx("button",{onClick:()=>P(Math.max(1,A-1)),className:"w-10 h-10 rounded-full bg-slate-800 text-white hover:bg-slate-700 flex items-center justify-center text-xl font-bold",children:"-"}),g.jsx("input",{type:"number",value:A,onChange:B=>{const ne=parseInt(B.target.value)||0;P(Math.min(ne,G))},className:"w-32 bg-slate-950 border-2 border-cyan-500/50 rounded-lg text-4xl text-center py-2 text-white font-mono focus:outline-none focus:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]"}),g.jsx("button",{onClick:()=>P(Math.min(G,A+1)),className:"w-10 h-10 rounded-full bg-slate-800 text-white hover:bg-slate-700 flex items-center justify-center text-xl font-bold",children:"+"})]})]})]}),g.jsx("div",{className:"grid grid-cols-4 gap-4 mb-10",children:[1,3,5,10].map(B=>g.jsxs("button",{onClick:()=>P(Math.min(B,G)),disabled:B>G,className:"bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed py-3 rounded-lg font-bold text-cyan-300 border border-slate-700",children:["抽 ",B," 個"]},B))}),g.jsxs("div",{className:"flex gap-4",children:[g.jsxs("button",{onClick:()=>P(G),className:"flex-1 bg-purple-900/50 hover:bg-purple-800/80 border border-purple-500/50 text-purple-300 py-4 rounded-xl font-bold tracking-widest text-lg transition-all",children:["ALL IN (梭哈 ",G,")"]}),g.jsxs(Ot,{onClick:ye,size:"lg",className:"flex-[2] bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-105 transform transition-transform shadow-[0_0_40px_rgba(8,145,178,0.5)]",children:[g.jsx(Gg,{fill:"currentColor",className:"w-6 h-6 mr-2"})," 開始抽獎"]})]})]})]})},Xt=()=>g.jsxs("div",{className:"h-full flex flex-col items-center justify-center relative bg-slate-950",children:[g.jsxs("div",{className:"absolute inset-0 bg-slate-950",children:[g.jsx("div",{className:"absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950"}),g.jsx("div",{className:"absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"})]}),g.jsx("div",{className:"relative z-10 flex-shrink-0 pt-10 pb-6",children:g.jsx("h2",{className:"text-4xl text-cyan-500 font-black tracking-[1em] animate-pulse",children:"DRAWING..."})}),g.jsx("div",{className:"relative z-10 flex-1 w-full overflow-y-auto px-4 pb-20 scrollbar-none",children:g.jsx("div",{className:"flex flex-wrap justify-center gap-6",children:M.map((U,H)=>g.jsx("div",{className:`
                            w-64 h-64 bg-slate-900/80 border-2 border-cyan-400/50 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.3)] backdrop-blur-xl 
                            ${U.locked?"animate-drop-in border-yellow-400/80 shadow-[0_0_50px_rgba(234,179,8,0.5)] bg-slate-800":"animate-bounce"}
                        `,style:U.locked?{}:{animationDuration:"0.5s",animationDelay:`${H*.05}s`},children:g.jsx("span",{className:`text-8xl font-black font-mono tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] ${U.locked?"text-yellow-400":"text-cyan-50"}`,children:U.number})},H))})})]}),Yt=()=>{const U=a.find(H=>H.id===v);return g.jsxs("div",{className:"h-full flex flex-col relative bg-slate-900/90 z-10",children:[g.jsx(yT,{active:!0}),g.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-slate-900 pointer-events-none"}),g.jsx("div",{className:"flex-1 overflow-y-auto scrollbar-none p-8",children:g.jsxs("div",{className:"flex flex-col items-center min-h-full",children:[g.jsxs("div",{className:`mb-8 inline-block px-8 py-3 rounded-full border-2 font-black tracking-widest text-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] animate-in zoom-in duration-300 ${U!=null&&U.isGrandPrize?"bg-yellow-500/20 border-yellow-500 text-yellow-400":"bg-cyan-500/20 border-cyan-500 text-cyan-400"}`,children:[U==null?void 0:U.name," 得主"]}),g.jsx("div",{className:"flex flex-wrap justify-center gap-6 w-full max-w-[90vw] animate-in slide-in-from-bottom-10 duration-500 delay-100 pb-32",children:M.map((H,G)=>g.jsxs("div",{className:"group relative",children:[g.jsx("div",{className:`absolute -inset-2 bg-gradient-to-r rounded-3xl blur opacity-40 group-hover:opacity-100 transition duration-500 animate-tilt ${U!=null&&U.isGrandPrize?"from-yellow-400 to-amber-600":"from-cyan-400 to-blue-600"}`}),g.jsxs("div",{className:`relative w-72 h-72 bg-slate-900 ring-2 rounded-2xl flex flex-col items-center justify-center shadow-2xl ${U!=null&&U.isGrandPrize?"ring-yellow-500/50":"ring-cyan-500/50"}`,children:[U!=null&&U.isGrandPrize?g.jsx(Fr,{className:"w-12 h-12 text-yellow-500 mb-4 opacity-50"}):g.jsx(vs,{className:"w-12 h-12 text-cyan-500 mb-4 opacity-50"}),g.jsx("div",{className:"text-8xl font-black text-white font-mono tracking-tighter drop-shadow-xl",children:H.number})]})]},G))})]})}),g.jsxs("div",{className:"flex-shrink-0 p-6 z-30 bg-gradient-to-t from-slate-950 via-slate-900/95 to-transparent flex justify-center gap-6 backdrop-blur-sm border-t border-slate-800/30",children:[g.jsxs(Ot,{onClick:()=>y("standby"),variant:"secondary",size:"lg",className:"shadow-lg hover:shadow-cyan-500/20",children:[g.jsx(Ac,{className:"w-5 h-5 mr-2"})," 回大螢幕首頁"]}),g.jsxs(Ot,{onClick:()=>y("select-prize"),variant:"primary",size:"lg",className:"shadow-lg hover:shadow-blue-500/20",children:[g.jsx(Nc,{className:"w-5 h-5 mr-2"})," 繼續抽其他獎項"]})]})]})},Jt=()=>{const U=a.filter(B=>B.isGrandPrize),H=a.filter(B=>!B.isGrandPrize),G=({prize:B})=>{var ne;return g.jsxs("div",{className:`p-4 rounded-xl border mb-4 ${B.isGrandPrize?"bg-yellow-900/10 border-yellow-500/30":"bg-slate-950/50 border-slate-800/50"}`,children:[g.jsxs("div",{className:"flex justify-between items-center mb-4",children:[g.jsxs("div",{className:"flex items-center gap-3",children:[B.isGrandPrize?g.jsx(Fr,{className:"w-6 h-6 text-yellow-500"}):g.jsx(vs,{className:"w-5 h-5 text-cyan-500"}),g.jsx("h3",{className:`text-xl font-bold ${B.isGrandPrize?"text-yellow-400":"text-white"}`,children:B.name})]}),g.jsxs("span",{className:"text-sm text-slate-500",children:[((ne=B.winners)==null?void 0:ne.length)||0," / ",B.quantity]})]}),B.winners&&B.winners.length>0?g.jsx("div",{className:"flex flex-wrap gap-2",children:B.winners.map((ie,ve)=>g.jsx("span",{className:`px-3 py-1 rounded font-mono font-bold text-lg ${B.isGrandPrize?"bg-yellow-500/20 text-yellow-300 border border-yellow-500/30":"bg-slate-800 text-cyan-300 border border-slate-700"}`,children:ie},ve))}):g.jsx("div",{className:"text-slate-600 text-sm italic",children:"尚未開獎"})]})};return g.jsxs("div",{className:"max-w-6xl mx-auto space-y-8 pb-20 pt-10 px-4",children:[g.jsxs("div",{className:"flex justify-between items-center mb-8",children:[g.jsx("h1",{className:"text-3xl font-bold text-white",children:"開獎結果一覽"}),g.jsxs(Ot,{variant:"ghost",onClick:()=>r("display"),children:[g.jsx(Ac,{className:"w-5 h-5 mr-2"})," 返回抽獎現場"]})]}),U.length>0&&g.jsxs("div",{className:"mb-8",children:[g.jsxs("h2",{className:"text-xl font-bold text-yellow-500 mb-4 flex items-center gap-2",children:[g.jsx(Fr,{className:"w-5 h-5"})," 年度大獎"]}),U.map(B=>g.jsx(G,{prize:B},B.id))]}),g.jsxs("div",{children:[g.jsxs("h2",{className:"text-xl font-bold text-cyan-500 mb-4 flex items-center gap-2",children:[g.jsx(vs,{className:"w-5 h-5"})," 常規獎項"]}),g.jsx("div",{className:"grid md:grid-cols-2 gap-4",children:H.map(B=>g.jsx(G,{prize:B},B.id))})]})]})},Iu=()=>{const[U,H]=fe.useState("1"),[G,B]=fe.useState("100"),[ne,ie]=fe.useState(""),[ve,zt]=fe.useState("1"),[rt,Re]=fe.useState(!1),[pt,hs]=fe.useState(s.title),[qn,Dr]=fe.useState(null),[mt,Hn]=fe.useState({name:"",quantity:"",isGrandPrize:!1}),Be=oe=>{Dr(oe.id),Hn({name:oe.name,quantity:oe.quantity,isGrandPrize:oe.isGrandPrize||!1})},We=()=>{Dr(null),Hn({name:"",quantity:"",isGrandPrize:!1})},ds=async()=>{if(!mt.name||mt.quantity<=0)return k("錯誤","請輸入有效的名稱與數量");try{await Or(qn,mt.name,mt.quantity,mt.isGrandPrize),Dr(null)}catch(oe){console.error(oe),k("失敗","更新失敗")}};return g.jsxs("div",{className:"max-w-4xl mx-auto space-y-8 pb-20 pt-10 px-4",children:[g.jsxs("div",{className:"flex justify-between items-center mb-8",children:[g.jsx("h1",{className:"text-3xl font-bold text-white",children:"後台控制台"}),g.jsxs(Ot,{variant:"ghost",onClick:()=>r("display"),children:[g.jsx(Ac,{className:"w-5 h-5 mr-2"})," 返回抽獎現場"]})]}),g.jsxs(Do,{className:"p-6",children:[g.jsxs("h2",{className:"text-xl font-bold mb-4 flex items-center gap-2 text-cyan-400",children:[g.jsx(pT,{className:"w-5 h-5"})," 系統設定"]}),g.jsxs("div",{className:"flex gap-4",children:[g.jsx("input",{type:"text",value:pt,onChange:oe=>hs(oe.target.value),className:"flex-1 bg-slate-950 border border-slate-700 text-white p-2 rounded focus:ring-2 focus:ring-cyan-500 outline-none placeholder-slate-600",placeholder:"輸入活動名稱"}),g.jsxs(Ot,{onClick:()=>I(pt),children:[g.jsx(fT,{className:"w-4 h-4"})," 更新標題"]})]})]}),g.jsxs(Do,{className:"p-6",children:[g.jsxs("h2",{className:"text-xl font-bold mb-4 flex items-center gap-2 text-cyan-400",children:[g.jsx(Qg,{className:"w-5 h-5"})," 彩票管理"]}),g.jsxs("div",{className:"grid md:grid-cols-2 gap-8",children:[g.jsxs("div",{className:"space-y-4",children:[g.jsx("h3",{className:"font-semibold text-slate-400",children:"批量產生彩票"}),g.jsxs("div",{className:"flex items-center gap-2 text-white",children:[g.jsx("input",{type:"number",value:U,onChange:oe=>H(oe.target.value),className:"w-24 bg-slate-950 border border-slate-700 p-2 rounded focus:border-cyan-500 outline-none",placeholder:"Start"}),g.jsx("span",{className:"text-slate-500",children:"to"}),g.jsx("input",{type:"number",value:G,onChange:oe=>B(oe.target.value),className:"w-24 bg-slate-950 border border-slate-700 p-2 rounded focus:border-cyan-500 outline-none",placeholder:"End"})]}),g.jsxs("div",{className:"flex gap-2",children:[g.jsxs(Ot,{onClick:()=>T(U,G),children:[g.jsx(Wg,{className:"w-4 h-4"})," 生成"]}),g.jsxs(Ot,{variant:"danger",onClick:_,children:[g.jsx(Xg,{className:"w-4 h-4"})," 清空"]})]})]}),g.jsxs("div",{className:"bg-slate-950/50 p-4 rounded-lg border border-slate-800",children:[g.jsx("div",{className:"text-sm text-slate-500 mb-2",children:"彩票池概況"}),g.jsxs("div",{className:"text-3xl font-bold text-white font-mono",children:[u.length," ",g.jsx("span",{className:"text-sm text-slate-600 font-sans",children:"TOTAL"})]}),g.jsxs("div",{className:"text-sm text-cyan-500 font-medium mt-1",children:["有效票：",m.length," 張"]})]})]})]}),g.jsxs(Do,{className:"p-6",children:[g.jsxs("h2",{className:"text-xl font-bold mb-4 flex items-center gap-2 text-cyan-400",children:[g.jsx(vs,{className:"w-5 h-5"})," 獎項設定"]}),g.jsxs("div",{className:"flex flex-wrap gap-2 mb-6 items-center",children:[g.jsx("input",{type:"text",placeholder:"獎項名稱 (如：特等獎)",className:"flex-1 bg-slate-950 border border-slate-700 text-white p-2 rounded focus:border-cyan-500 outline-none placeholder-slate-600",value:ne,onChange:oe=>ie(oe.target.value)}),g.jsx("input",{type:"number",placeholder:"數量",className:"w-24 bg-slate-950 border border-slate-700 text-white p-2 rounded focus:border-cyan-500 outline-none placeholder-slate-600",value:ve,onChange:oe=>zt(oe.target.value)}),g.jsxs("label",{className:"flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-2 rounded cursor-pointer select-none hover:bg-slate-800",children:[g.jsx("input",{type:"checkbox",checked:rt,onChange:oe=>Re(oe.target.checked),className:"w-4 h-4 rounded text-cyan-600 focus:ring-0"}),g.jsx("span",{className:"text-sm text-slate-300",children:"👑 設為最大獎"})]}),g.jsxs(Ot,{onClick:()=>{xn(ne,ve,rt),ie(""),Re(!1)},children:[g.jsx(Wg,{className:"w-4 h-4"})," 新增"]})]}),g.jsx("div",{className:"space-y-2",children:a.map((oe,Kn)=>{var Wa;return g.jsxs("div",{className:`flex items-center justify-between p-3 rounded border transition-colors ${oe.isGrandPrize?"bg-yellow-900/10 border-yellow-500/30":"bg-slate-950/50 border-slate-800/50 hover:border-cyan-500/30"}`,children:[g.jsxs("div",{className:"flex items-center gap-3 flex-1",children:[g.jsx("span",{className:`w-6 h-6 flex items-center justify-center rounded-full text-xs font-mono border ${oe.isGrandPrize?"bg-yellow-900 text-yellow-400 border-yellow-700":"bg-slate-800 text-cyan-400 border-slate-700"}`,children:Kn+1}),qn===oe.id?g.jsxs("div",{className:"flex items-center gap-2 flex-1",children:[g.jsx("input",{type:"text",value:mt.name,onChange:Zt=>Hn({...mt,name:Zt.target.value}),className:"flex-1 bg-slate-900 border border-slate-600 text-white px-2 py-1 rounded"}),g.jsx("input",{type:"number",value:mt.quantity,onChange:Zt=>Hn({...mt,quantity:Zt.target.value}),className:"w-20 bg-slate-900 border border-slate-600 text-white px-2 py-1 rounded"}),g.jsxs("label",{className:"flex items-center gap-1",children:[g.jsx("input",{type:"checkbox",checked:mt.isGrandPrize,onChange:Zt=>Hn({...mt,isGrandPrize:Zt.target.checked})}),g.jsx("span",{className:"text-xs text-slate-300",children:"最大獎"})]})]}):g.jsxs("div",{children:[g.jsxs("span",{className:`font-bold text-lg mr-2 flex items-center gap-2 ${oe.isGrandPrize?"text-yellow-400":"text-slate-200"}`,children:[oe.name,oe.isGrandPrize&&g.jsx(Fr,{className:"w-4 h-4 text-yellow-500"})]}),g.jsxs("span",{className:"text-sm text-slate-500",children:["x ",oe.quantity]})]})]}),g.jsx("div",{className:"flex items-center gap-4",children:qn===oe.id?g.jsxs("div",{className:"flex gap-2",children:[g.jsx("button",{onClick:ds,className:"text-emerald-400 hover:text-emerald-300",children:g.jsx(lT,{className:"w-5 h-5"})}),g.jsx("button",{onClick:We,className:"text-slate-400 hover:text-slate-300",children:g.jsx(mT,{className:"w-5 h-5"})})]}):g.jsxs(g.Fragment,{children:[g.jsxs("div",{className:"flex gap-1",children:[g.jsx("button",{onClick:()=>$(Kn,-1),disabled:Kn===0,className:"p-1 rounded hover:bg-slate-700 text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent",title:"上移",children:g.jsx(oT,{className:"w-4 h-4"})}),g.jsx("button",{onClick:()=>$(Kn,1),disabled:Kn===a.length-1,className:"p-1 rounded hover:bg-slate-700 text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent",title:"下移",children:g.jsx(aT,{className:"w-4 h-4"})})]}),g.jsxs("span",{className:"text-sm text-slate-500 font-mono",children:["DRAWN: ",((Wa=oe.winners)==null?void 0:Wa.length)||0]}),g.jsx("button",{onClick:()=>Be(oe),className:"text-cyan-400 hover:text-cyan-300 transition-colors",title:"編輯",children:g.jsx(cT,{className:"w-4 h-4"})}),g.jsx("button",{onClick:()=>Wt(oe.id),className:"text-slate-600 hover:text-red-500 transition-colors",title:"刪除",children:g.jsx(Xg,{className:"w-4 h-4"})})]})})]},oe.id)})})]}),g.jsxs(Do,{className:"p-6 border-red-900/50",children:[g.jsxs("h2",{className:"text-xl font-bold mb-4 flex items-center gap-2 text-red-400",children:[g.jsx(bw,{className:"w-5 h-5"})," 系統維護"]}),g.jsxs("div",{className:"flex items-center justify-between",children:[g.jsx("div",{className:"text-slate-400 text-sm",children:"注意：此操作將清空所有獎項的得主名單，並將彩票恢復為未中獎狀態。"}),g.jsxs(Ot,{variant:"danger",onClick:kt,children:[g.jsx(dT,{className:"w-4 h-4"})," 重置所有中獎結果"]})]})]})]})},Cu=()=>g.jsxs("div",{className:"fixed inset-0 bg-slate-950 text-white overflow-hidden",children:[g.jsxs("div",{className:"absolute inset-0 pointer-events-none",children:[g.jsx("div",{className:"absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_#1e293b_0%,_#020617_100%)]"}),g.jsx("div",{className:"absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-cyan-900/10 to-transparent"})]}),g.jsxs("div",{className:"relative z-10 w-full h-full",children:[f==="standby"&&g.jsx(he,{}),f==="select-prize"&&g.jsx(Se,{}),f==="config-qty"&&g.jsx(Qt,{}),f==="drawing"&&g.jsx(Xt,{}),f==="result"&&g.jsx(Yt,{})]})]});return t?g.jsxs("div",{className:"min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200",children:[g.jsx("style",{children:`
        @keyframes confetti {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
            animation-name: confetti;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;
        }
        .animate-tilt {
            animation: tilt 10s infinite linear;
        }
        @keyframes tilt {
            0%, 50%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(0.5deg); }
            75% { transform: rotate(-0.5deg); }
        }
        @keyframes bounce-slow {
             0%, 100% { transform: translateY(-5%); }
             50% { transform: translateY(5%); }
        }
        .animate-bounce-slow {
             animation: bounce-slow 2s infinite ease-in-out;
        }
        @keyframes shimmer {
            from { transform: translateX(-100%) skewX(-12deg); }
            to { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shimmer {
            animation: shimmer 2.5s infinite linear;
        }
        @keyframes drop-in {
            0% { transform: translateY(-100%); opacity: 0; }
            60% { transform: translateY(10%); opacity: 1; }
            100% { transform: translateY(0); }
        }
        .animate-drop-in {
            animation: drop-in 0.5s ease-out forwards;
        }
      `}),g.jsx("nav",{className:"fixed top-0 right-0 z-50 p-4 opacity-0 hover:opacity-100 transition-opacity",children:g.jsxs("div",{className:"bg-slate-900/90 border border-slate-700 rounded-lg p-2 flex gap-2",children:[g.jsx("button",{onClick:()=>r("display"),className:`px-3 py-1 text-xs font-bold rounded ${n==="display"?"bg-cyan-600 text-white":"text-slate-400"}`,children:"螢幕"}),g.jsx("button",{onClick:()=>r("results"),className:`px-3 py-1 text-xs font-bold rounded ${n==="results"?"bg-cyan-600 text-white":"text-slate-400"}`,children:"結果"}),g.jsx("button",{onClick:()=>r("admin"),className:`px-3 py-1 text-xs font-bold rounded ${n==="admin"?"bg-cyan-600 text-white":"text-slate-400"}`,children:"後台"})]})}),g.jsx("main",{className:"h-full w-full",children:n==="display"?g.jsx(Cu,{}):n==="results"?g.jsx(Jt,{}):g.jsx(Iu,{})}),g.jsx(vT,{isOpen:O.isOpen,title:O.title,message:O.message,onConfirm:O.onConfirm,onCancel:()=>V(U=>({...U,isOpen:!1}))}),g.jsx(bT,{isOpen:F.isOpen,title:F.title,message:F.message,onClose:()=>w(U=>({...U,isOpen:!1}))})]}):g.jsx("div",{className:"h-screen flex items-center justify-center bg-slate-950 text-cyan-500 font-mono animate-pulse",children:"INITIALIZING SYSTEM..."})}Pc.createRoot(document.getElementById("root")).render(g.jsx(l1.StrictMode,{children:g.jsx(wT,{})}));
