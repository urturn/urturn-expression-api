/*! jQuery v2.1.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m=a.document,n="2.1.0",o=function(a,b){return new o.fn.init(a,b)},p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};o.fn=o.prototype={jquery:n,constructor:o,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=o.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return o.each(this,a,b)},map:function(a){return this.pushStack(o.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},o.extend=o.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||o.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(o.isPlainObject(d)||(e=o.isArray(d)))?(e?(e=!1,f=c&&o.isArray(c)?c:[]):f=c&&o.isPlainObject(c)?c:{},g[b]=o.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},o.extend({expando:"jQuery"+(n+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===o.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isPlainObject:function(a){if("object"!==o.type(a)||a.nodeType||o.isWindow(a))return!1;try{if(a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}return!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=o.trim(a),a&&(1===a.indexOf("use strict")?(b=m.createElement("script"),b.text=a,m.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":k.call(a)},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?o.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),o.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||o.guid++,f):void 0},now:Date.now,support:l}),o.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=o.type(a);return"function"===c||o.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);o.find=t,o.expr=t.selectors,o.expr[":"]=o.expr.pseudos,o.unique=t.uniqueSort,o.text=t.getText,o.isXMLDoc=t.isXML,o.contains=t.contains;var u=o.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(o.isFunction(b))return o.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return o.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return o.filter(b,a,c);b=o.filter(b,a)}return o.grep(a,function(a){return g.call(b,a)>=0!==c})}o.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?o.find.matchesSelector(d,a)?[d]:[]:o.find.matches(a,o.grep(b,function(a){return 1===a.nodeType}))},o.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(o(a).filter(function(){for(b=0;c>b;b++)if(o.contains(e[b],this))return!0}));for(b=0;c>b;b++)o.find(a,e[b],d);return d=this.pushStack(c>1?o.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?o(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=o.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof o?b[0]:b,o.merge(this,o.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:m,!0)),v.test(c[1])&&o.isPlainObject(b))for(c in b)o.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=m.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=m,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):o.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(o):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),o.makeArray(a,this))};A.prototype=o.fn,y=o(m);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};o.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&o(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),o.fn.extend({has:function(a){var b=o(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(o.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?o(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&o.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?o.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(o(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(o.unique(o.merge(this.get(),o(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}o.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return o.dir(a,"parentNode")},parentsUntil:function(a,b,c){return o.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return o.dir(a,"nextSibling")},prevAll:function(a){return o.dir(a,"previousSibling")},nextUntil:function(a,b,c){return o.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return o.dir(a,"previousSibling",c)},siblings:function(a){return o.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return o.sibling(a.firstChild)},contents:function(a){return a.contentDocument||o.merge([],a.childNodes)}},function(a,b){o.fn[a]=function(c,d){var e=o.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=o.filter(d,e)),this.length>1&&(C[a]||o.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return o.each(a.match(E)||[],function(a,c){b[c]=!0}),b}o.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):o.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){o.each(b,function(b,c){var d=o.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&o.each(arguments,function(a,b){var c;while((c=o.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?o.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},o.extend({Deferred:function(a){var b=[["resolve","done",o.Callbacks("once memory"),"resolved"],["reject","fail",o.Callbacks("once memory"),"rejected"],["notify","progress",o.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return o.Deferred(function(c){o.each(b,function(b,f){var g=o.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&o.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?o.extend(a,d):d}},e={};return d.pipe=d.then,o.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&o.isFunction(a.promise)?e:0,g=1===f?a:o.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&o.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;o.fn.ready=function(a){return o.ready.promise().done(a),this},o.extend({isReady:!1,readyWait:1,holdReady:function(a){a?o.readyWait++:o.ready(!0)},ready:function(a){(a===!0?--o.readyWait:o.isReady)||(o.isReady=!0,a!==!0&&--o.readyWait>0||(H.resolveWith(m,[o]),o.fn.trigger&&o(m).trigger("ready").off("ready")))}});function I(){m.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),o.ready()}o.ready.promise=function(b){return H||(H=o.Deferred(),"complete"===m.readyState?setTimeout(o.ready):(m.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},o.ready.promise();var J=o.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===o.type(c)){e=!0;for(h in c)o.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,o.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(o(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};o.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=o.expando+Math.random()}K.uid=1,K.accepts=o.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,o.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(o.isEmptyObject(f))o.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,o.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{o.isArray(b)?d=b.concat(b.map(o.camelCase)):(e=o.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!o.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?o.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}o.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),o.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;
while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=o.camelCase(d.slice(5)),P(f,d,e[d]));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=o.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),o.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||o.isArray(c)?d=L.access(a,b,o.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=o.queue(a,b),d=c.length,e=c.shift(),f=o._queueHooks(a,b),g=function(){o.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:o.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),o.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?o.queue(this[0],a):void 0===b?this:this.each(function(){var c=o.queue(this,a,b);o._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&o.dequeue(this,a)})},dequeue:function(a){return this.each(function(){o.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=o.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===o.css(a,"display")||!o.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=m.createDocumentFragment(),b=a.appendChild(m.createElement("div"));b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";l.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return m.activeElement}catch(a){}}o.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=o.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof o!==U&&o.event.triggered!==b.type?o.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n&&(l=o.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=o.event.special[n]||{},k=o.extend({type:n,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&o.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(n,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),o.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n){l=o.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||o.removeEvent(a,n,r.handle),delete i[n])}else for(n in i)o.event.remove(a,n+b[j],c,d,!0);o.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,p=[d||m],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||m,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+o.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[o.expando]?b:new o.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:o.makeArray(c,[b]),n=o.event.special[q]||{},e||!n.trigger||n.trigger.apply(d,c)!==!1)){if(!e&&!n.noBubble&&!o.isWindow(d)){for(i=n.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||m)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:n.bindType||q,l=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),l&&l.apply(g,c),l=k&&g[k],l&&l.apply&&o.acceptData(g)&&(b.result=l.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||n._default&&n._default.apply(p.pop(),c)!==!1||!o.acceptData(d)||k&&o.isFunction(d[q])&&!o.isWindow(d)&&(h=d[k],h&&(d[k]=null),o.event.triggered=q,d[q](),o.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=o.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=o.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=o.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((o.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?o(e,this).index(i)>=0:o.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||m,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[o.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new o.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=m),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&o.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return o.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=o.extend(new o.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?o.event.trigger(e,null,b):o.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},o.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},o.Event=function(a,b){return this instanceof o.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.getPreventDefault&&a.getPreventDefault()?Z:$):this.type=a,b&&o.extend(this,b),this.timeStamp=a&&a.timeStamp||o.now(),void(this[o.expando]=!0)):new o.Event(a,b)},o.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z,this.stopPropagation()}},o.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){o.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!o.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.focusinBubbles||o.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){o.event.simulate(b,a.target,o.event.fix(a),!0)};o.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),o.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return o().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=o.guid++)),this.each(function(){o.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,o(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){o.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){o.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?o.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return o.nodeName(a,"table")&&o.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)o.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=o.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&o.nodeName(a,b)?o.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}o.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=o.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||o.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,n=a.length;n>m;m++)if(e=a[m],e||0===e)if("object"===o.type(e))o.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;o.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===o.inArray(e,d))&&(i=o.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f,g,h=o.event.special,i=0;void 0!==(c=a[i]);i++){if(o.acceptData(c)&&(f=c[L.expando],f&&(b=L.cache[f]))){if(d=Object.keys(b.events||{}),d.length)for(g=0;void 0!==(e=d[g]);g++)h[e]?o.event.remove(c,e):o.removeEvent(c,e,b.handle);L.cache[f]&&delete L.cache[f]}delete M.cache[c[M.expando]]}}}),o.fn.extend({text:function(a){return J(this,function(a){return void 0===a?o.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?o.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||o.cleanData(ob(c)),c.parentNode&&(b&&o.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(o.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return o.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(o.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,o.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,n=k-1,p=a[0],q=o.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(c=o.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=o.map(ob(c,"script"),kb),g=f.length;k>j;j++)h=c,j!==n&&(h=o.clone(h,!0,!0),g&&o.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,o.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&o.contains(i,h)&&(h.src?o._evalUrl&&o._evalUrl(h.src):o.globalEval(h.textContent.replace(hb,"")))}return this}}),o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){o.fn[a]=function(a){for(var c,d=[],e=o(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),o(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d=o(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:o.css(d[0],"display");return d.detach(),e}function tb(a){var b=m,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||o("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||o.contains(a.ownerDocument,a)||(g=o.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",e=m.documentElement,f=m.createElement("div"),g=m.createElement("div");g.style.backgroundClip="content-box",g.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===g.style.backgroundClip,f.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",f.appendChild(g);function h(){g.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",e.appendChild(f);var d=a.getComputedStyle(g,null);b="1%"!==d.top,c="4px"===d.width,e.removeChild(f)}a.getComputedStyle&&o.extend(l,{pixelPosition:function(){return h(),b},boxSizingReliable:function(){return null==c&&h(),c},reliableMarginRight:function(){var b,c=g.appendChild(m.createElement("div"));return c.style.cssText=g.style.cssText=d,c.style.marginRight=c.style.width="0",g.style.width="1px",e.appendChild(f),b=!parseFloat(a.getComputedStyle(c,null).marginRight),e.removeChild(f),g.innerHTML="",b}})}(),o.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:0,fontWeight:400},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=o.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=o.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=o.css(a,"border"+R[f]+"Width",!0,e))):(g+=o.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=o.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===o.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):f[g]||(e=S(d),(c&&"none"!==c||!e)&&L.set(d,"olddisplay",e?c:o.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}o.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=o.camelCase(b),i=a.style;return b=o.cssProps[h]||(o.cssProps[h]=Fb(i,h)),g=o.cssHooks[b]||o.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(o.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||o.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]="",i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=o.camelCase(b);return b=o.cssProps[h]||(o.cssProps[h]=Fb(a.style,h)),g=o.cssHooks[b]||o.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||o.isNumeric(f)?f||0:e):e}}),o.each(["height","width"],function(a,b){o.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&zb.test(o.css(a,"display"))?o.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===o.css(a,"boxSizing",!1,e),e):0)}}}),o.cssHooks.marginRight=yb(l.reliableMarginRight,function(a,b){return b?o.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),o.each({margin:"",padding:"",border:"Width"},function(a,b){o.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(o.cssHooks[a+b].set=Gb)}),o.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(o.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=o.css(a,b[g],!1,d);return f}return void 0!==c?o.style(a,b,c):o.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?o(this).show():o(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}o.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(o.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?o.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=o.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){o.fx.step[a.prop]?o.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[o.cssProps[a.prop]]||o.cssHooks[a.prop])?o.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},o.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},o.fx=Kb.prototype.init,o.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(o.cssNumber[a]?"":"px"),g=(o.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(o.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,o.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=o.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k=this,l={},m=a.style,n=a.nodeType&&S(a),p=L.get(a,"fxshow");c.queue||(h=o._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,k.always(function(){k.always(function(){h.unqueued--,o.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],j=o.css(a,"display"),"none"===j&&(j=tb(a.nodeName)),"inline"===j&&"none"===o.css(a,"float")&&(m.display="inline-block")),c.overflow&&(m.overflow="hidden",k.always(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(n?"hide":"show")){if("show"!==e||!p||void 0===p[d])continue;n=!0}l[d]=p&&p[d]||o.style(a,d)}if(!o.isEmptyObject(l)){p?"hidden"in p&&(n=p.hidden):p=L.access(a,"fxshow",{}),f&&(p.hidden=!n),n?o(a).show():k.done(function(){o(a).hide()}),k.done(function(){var b;L.remove(a,"fxshow");for(b in l)o.style(a,b,l[b])});for(d in l)g=Ub(n?p[d]:0,d,k),d in p||(p[d]=g.start,n&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=o.camelCase(c),e=b[d],f=a[c],o.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=o.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=o.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:o.extend({},b),opts:o.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=o.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return o.map(k,Ub,j),o.isFunction(j.opts.start)&&j.opts.start.call(a,j),o.fx.timer(o.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}o.Animation=o.extend(Xb,{tweener:function(a,b){o.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),o.speed=function(a,b,c){var d=a&&"object"==typeof a?o.extend({},a):{complete:c||!c&&b||o.isFunction(a)&&a,duration:a,easing:c&&b||b&&!o.isFunction(b)&&b};return d.duration=o.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in o.fx.speeds?o.fx.speeds[d.duration]:o.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){o.isFunction(d.old)&&d.old.call(this),d.queue&&o.dequeue(this,d.queue)},d},o.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=o.isEmptyObject(a),f=o.speed(b,c,d),g=function(){var b=Xb(this,o.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=o.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&o.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=o.timers,g=d?d.length:0;for(c.finish=!0,o.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),o.each(["toggle","show","hide"],function(a,b){var c=o.fn[b];o.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),o.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){o.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),o.timers=[],o.fx.tick=function(){var a,b=0,c=o.timers;for(Lb=o.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||o.fx.stop(),Lb=void 0},o.fx.timer=function(a){o.timers.push(a),a()?o.fx.start():o.timers.pop()},o.fx.interval=13,o.fx.start=function(){Mb||(Mb=setInterval(o.fx.tick,o.fx.interval))},o.fx.stop=function(){clearInterval(Mb),Mb=null},o.fx.speeds={slow:600,fast:200,_default:400},o.fn.delay=function(a,b){return a=o.fx?o.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=m.createElement("input"),b=m.createElement("select"),c=b.appendChild(m.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=m.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var Yb,Zb,$b=o.expr.attrHandle;o.fn.extend({attr:function(a,b){return J(this,o.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){o.removeAttr(this,a)})}}),o.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?o.prop(a,b,c):(1===f&&o.isXMLDoc(a)||(b=b.toLowerCase(),d=o.attrHooks[b]||(o.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=o.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void o.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=o.propFix[c]||c,o.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&o.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?o.removeAttr(a,c):a.setAttribute(c,c),c}},o.each(o.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||o.find.attr;$b[b]=function(a,b,d){var e,f;
return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;o.fn.extend({prop:function(a,b){return J(this,o.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[o.propFix[a]||a]})}}),o.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!o.isXMLDoc(a),f&&(b=o.propFix[b]||b,e=o.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),l.optSelected||(o.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),o.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){o.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;o.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=o.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?o.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(o.isFunction(a)?function(c){o(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=o(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;o.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=o.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,o(this).val()):a,null==e?e="":"number"==typeof e?e+="":o.isArray(e)&&(e=o.map(e,function(a){return null==a?"":a+""})),b=o.valHooks[this.type]||o.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=o.valHooks[e.type]||o.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),o.extend({valHooks:{select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&o.nodeName(c.parentNode,"optgroup"))){if(b=o(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=o.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=o.inArray(o(d).val(),f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),o.each(["radio","checkbox"],function(){o.valHooks[this]={set:function(a,b){return o.isArray(b)?a.checked=o.inArray(o(a).val(),b)>=0:void 0}},l.checkOn||(o.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),o.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){o.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),o.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=o.now(),dc=/\?/;o.parseJSON=function(a){return JSON.parse(a+"")},o.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&o.error("Invalid XML: "+a),b};var ec,fc,gc=/#.*$/,hc=/([?&])_=[^&]*/,ic=/^(.*?):[ \t]*([^\r\n]*)$/gm,jc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,kc=/^(?:GET|HEAD)$/,lc=/^\/\//,mc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,nc={},oc={},pc="*/".concat("*");try{fc=location.href}catch(qc){fc=m.createElement("a"),fc.href="",fc=fc.href}ec=mc.exec(fc.toLowerCase())||[];function rc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(o.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function sc(a,b,c,d){var e={},f=a===oc;function g(h){var i;return e[h]=!0,o.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function tc(a,b){var c,d,e=o.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&o.extend(!0,a,d),a}function uc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function vc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}o.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:fc,type:"GET",isLocal:jc.test(ec[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":pc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":o.parseJSON,"text xml":o.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?tc(tc(a,o.ajaxSettings),b):tc(o.ajaxSettings,a)},ajaxPrefilter:rc(nc),ajaxTransport:rc(oc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=o.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?o(l):o.event,n=o.Deferred(),p=o.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=ic.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(n.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||fc)+"").replace(gc,"").replace(lc,ec[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=o.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=mc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===ec[1]&&h[2]===ec[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(ec[3]||("http:"===ec[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=o.param(k.data,k.traditional)),sc(nc,k,b,v),2===t)return v;i=k.global,i&&0===o.active++&&o.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!kc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=hc.test(d)?d.replace(hc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(o.lastModified[d]&&v.setRequestHeader("If-Modified-Since",o.lastModified[d]),o.etag[d]&&v.setRequestHeader("If-None-Match",o.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+pc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=sc(oc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=uc(k,v,f)),u=vc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(o.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(o.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?n.resolveWith(l,[r,x,v]):n.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--o.active||o.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return o.get(a,b,c,"json")},getScript:function(a,b){return o.get(a,void 0,b,"script")}}),o.each(["get","post"],function(a,b){o[b]=function(a,c,d,e){return o.isFunction(c)&&(e=e||d,d=c,c=void 0),o.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),o.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){o.fn[b]=function(a){return this.on(b,a)}}),o._evalUrl=function(a){return o.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},o.fn.extend({wrapAll:function(a){var b;return o.isFunction(a)?this.each(function(b){o(this).wrapAll(a.call(this,b))}):(this[0]&&(b=o(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(o.isFunction(a)?function(b){o(this).wrapInner(a.call(this,b))}:function(){var b=o(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=o.isFunction(a);return this.each(function(c){o(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){o.nodeName(this,"body")||o(this).replaceWith(this.childNodes)}).end()}}),o.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},o.expr.filters.visible=function(a){return!o.expr.filters.hidden(a)};var wc=/%20/g,xc=/\[\]$/,yc=/\r?\n/g,zc=/^(?:submit|button|image|reset|file)$/i,Ac=/^(?:input|select|textarea|keygen)/i;function Bc(a,b,c,d){var e;if(o.isArray(b))o.each(b,function(b,e){c||xc.test(a)?d(a,e):Bc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==o.type(b))d(a,b);else for(e in b)Bc(a+"["+e+"]",b[e],c,d)}o.param=function(a,b){var c,d=[],e=function(a,b){b=o.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=o.ajaxSettings&&o.ajaxSettings.traditional),o.isArray(a)||a.jquery&&!o.isPlainObject(a))o.each(a,function(){e(this.name,this.value)});else for(c in a)Bc(c,a[c],b,e);return d.join("&").replace(wc,"+")},o.fn.extend({serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=o.prop(this,"elements");return a?o.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!o(this).is(":disabled")&&Ac.test(this.nodeName)&&!zc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=o(this).val();return null==c?null:o.isArray(c)?o.map(c,function(a){return{name:b.name,value:a.replace(yc,"\r\n")}}):{name:b.name,value:c.replace(yc,"\r\n")}}).get()}}),o.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cc=0,Dc={},Ec={0:200,1223:204},Fc=o.ajaxSettings.xhr();a.ActiveXObject&&o(a).on("unload",function(){for(var a in Dc)Dc[a]()}),l.cors=!!Fc&&"withCredentials"in Fc,l.ajax=Fc=!!Fc,o.ajaxTransport(function(a){var b;return l.cors||Fc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Dc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Ec[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Dc[g]=b("abort"),f.send(a.hasContent&&a.data||null)},abort:function(){b&&b()}}:void 0}),o.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return o.globalEval(a),a}}}),o.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),o.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=o("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),m.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gc=[],Hc=/(=)\?(?=&|$)|\?\?/;o.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gc.pop()||o.expando+"_"+cc++;return this[a]=!0,a}}),o.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=o.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||o.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gc.push(e)),g&&o.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),o.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||m;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=o.buildFragment([a],b,e),e&&e.length&&o(e).remove(),o.merge([],d.childNodes))};var Ic=o.fn.load;o.fn.load=function(a,b,c){if("string"!=typeof a&&Ic)return Ic.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h),a=a.slice(0,h)),o.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&o.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?o("<div>").append(o.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},o.expr.filters.animated=function(a){return o.grep(o.timers,function(b){return a===b.elem}).length};var Jc=a.document.documentElement;function Kc(a){return o.isWindow(a)?a:9===a.nodeType&&a.defaultView}o.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=o.css(a,"position"),l=o(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=o.css(a,"top"),i=o.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),o.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},o.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){o.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,o.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Kc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===o.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),o.nodeName(a[0],"html")||(d=a.offset()),d.top+=o.css(a[0],"borderTopWidth",!0),d.left+=o.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-o.css(c,"marginTop",!0),left:b.left-d.left-o.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Jc;while(a&&!o.nodeName(a,"html")&&"static"===o.css(a,"position"))a=a.offsetParent;return a||Jc})}}),o.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;o.fn[b]=function(e){return J(this,function(b,e,f){var g=Kc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),o.each(["top","left"],function(a,b){o.cssHooks[b]=yb(l.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?o(a).position()[b]+"px":c):void 0})}),o.each({Height:"height",Width:"width"},function(a,b){o.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){o.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return o.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?o.css(b,c,g):o.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),o.fn.size=function(){return this.length},o.fn.andSelf=o.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return o});var Lc=a.jQuery,Mc=a.$;return o.noConflict=function(b){return a.$===o&&(a.$=Mc),b&&a.jQuery===o&&(a.jQuery=Lc),o},typeof b===U&&(a.jQuery=a.$=o),o});
/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 0.6.8
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */

/*jslint browser:true, node:true*/
/*global define, Event, Node*/


/**
 * Instantiate fast-clicking listeners on the specificed layer.
 *
 * @constructor
 * @param {Element} layer The layer to listen on
 */
function FastClick(layer) {
	'use strict';
	var oldOnClick, self = this;


	/**
	 * Whether a click is currently being tracked.
	 *
	 * @type boolean
	 */
	this.trackingClick = false;


	/**
	 * Timestamp for when when click tracking started.
	 *
	 * @type number
	 */
	this.trackingClickStart = 0;


	/**
	 * The element being tracked for a click.
	 *
	 * @type EventTarget
	 */
	this.targetElement = null;


	/**
	 * X-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartX = 0;


	/**
	 * Y-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartY = 0;


	/**
	 * ID of the last touch, retrieved from Touch.identifier.
	 *
	 * @type number
	 */
	this.lastTouchIdentifier = 0;


	/**
	 * Touchmove boundary, beyond which a click will be cancelled.
	 *
	 * @type number
	 */
	this.touchBoundary = 10;


	/**
	 * The FastClick layer.
	 *
	 * @type Element
	 */
	this.layer = layer;

	if (!layer || !layer.nodeType) {
		throw new TypeError('Layer must be a document node');
	}

	/** @type function() */
	this.onClick = function() { return FastClick.prototype.onClick.apply(self, arguments); };

	/** @type function() */
	this.onMouse = function() { return FastClick.prototype.onMouse.apply(self, arguments); };

	/** @type function() */
	this.onTouchStart = function() { return FastClick.prototype.onTouchStart.apply(self, arguments); };

	/** @type function() */
	this.onTouchEnd = function() { return FastClick.prototype.onTouchEnd.apply(self, arguments); };

	/** @type function() */
	this.onTouchCancel = function() { return FastClick.prototype.onTouchCancel.apply(self, arguments); };

	if (FastClick.notNeeded(layer)) {
		return;
	}

	// Set up event handlers as required
	if (this.deviceIsAndroid) {
		layer.addEventListener('mouseover', this.onMouse, true);
		layer.addEventListener('mousedown', this.onMouse, true);
		layer.addEventListener('mouseup', this.onMouse, true);
	}

	layer.addEventListener('click', this.onClick, true);
	layer.addEventListener('touchstart', this.onTouchStart, false);
	layer.addEventListener('touchend', this.onTouchEnd, false);
	layer.addEventListener('touchcancel', this.onTouchCancel, false);

	// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
	// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
	// layer when they are cancelled.
	if (!Event.prototype.stopImmediatePropagation) {
		layer.removeEventListener = function(type, callback, capture) {
			var rmv = Node.prototype.removeEventListener;
			if (type === 'click') {
				rmv.call(layer, type, callback.hijacked || callback, capture);
			} else {
				rmv.call(layer, type, callback, capture);
			}
		};

		layer.addEventListener = function(type, callback, capture) {
			var adv = Node.prototype.addEventListener;
			if (type === 'click') {
				adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
					if (!event.propagationStopped) {
						callback(event);
					}
				}), capture);
			} else {
				adv.call(layer, type, callback, capture);
			}
		};
	}

	// If a handler is already declared in the element's onclick attribute, it will be fired before
	// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
	// adding it as listener.
	if (typeof layer.onclick === 'function') {

		// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
		// - the old one won't work if passed to addEventListener directly.
		oldOnClick = layer.onclick;
		layer.addEventListener('click', function(event) {
			oldOnClick(event);
		}, false);
		layer.onclick = null;
	}
}


/**
 * Android requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;


/**
 * iOS requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);


/**
 * iOS 4 requires an exception for select elements.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


/**
 * iOS 6.0(+?) requires the target element to be manually derived
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);


/**
 * Determine whether a given element requires a native click.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element needs a native click
 */
FastClick.prototype.needsClick = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {

	// Don't send a synthetic click to disabled inputs (issue #62)
	case 'button':
	case 'select':
	case 'textarea':
		if (target.disabled) {
			return true;
		}

		break;
	case 'input':

		// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
		if ((this.deviceIsIOS && target.type === 'file') || target.disabled) {
			return true;
		}

		break;
	case 'label':
	case 'video':
		return true;
	}

	return (/\bneedsclick\b/).test(target.className);
};


/**
 * Determine whether a given element requires a call to focus to simulate click into element.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
 */
FastClick.prototype.needsFocus = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {
	case 'textarea':
	case 'select':
		return true;
	case 'input':
		switch (target.type) {
		case 'button':
		case 'checkbox':
		case 'file':
		case 'image':
		case 'radio':
		case 'submit':
			return false;
		}

		// No point in attempting to focus disabled inputs
		return !target.disabled && !target.readOnly;
	default:
		return (/\bneedsfocus\b/).test(target.className);
	}
};


/**
 * Send a click event to the specified element.
 *
 * @param {EventTarget|Element} targetElement
 * @param {Event} event
 */
FastClick.prototype.sendClick = function(targetElement, event) {
	'use strict';
	var clickEvent, touch;

	// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
	if (document.activeElement && document.activeElement !== targetElement) {
		document.activeElement.blur();
	}

	touch = event.changedTouches[0];

	// Synthesise a click event, with an extra attribute so it can be tracked
	clickEvent = document.createEvent('MouseEvents');
	clickEvent.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	clickEvent.forwardedTouchEvent = true;
	targetElement.dispatchEvent(clickEvent);
};


/**
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.focus = function(targetElement) {
	'use strict';
	var length;

	if (this.deviceIsIOS && targetElement.setSelectionRange) {
		length = targetElement.value.length;
		targetElement.setSelectionRange(length, length);
	} else {
		targetElement.focus();
	}
};


/**
 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
 *
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.updateScrollParent = function(targetElement) {
	'use strict';
	var scrollParent, parentElement;

	scrollParent = targetElement.fastClickScrollParent;

	// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
	// target element was moved to another parent.
	if (!scrollParent || !scrollParent.contains(targetElement)) {
		parentElement = targetElement;
		do {
			if (parentElement.scrollHeight > parentElement.offsetHeight) {
				scrollParent = parentElement;
				targetElement.fastClickScrollParent = parentElement;
				break;
			}

			parentElement = parentElement.parentElement;
		} while (parentElement);
	}

	// Always update the scroll top tracker if possible.
	if (scrollParent) {
		scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
	}
};


/**
 * @param {EventTarget} targetElement
 * @returns {Element|EventTarget}
 */
FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	'use strict';

	// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
	if (eventTarget.nodeType === Node.TEXT_NODE) {
		return eventTarget.parentNode;
	}

	return eventTarget;
};


/**
 * On touch start, record the position and scroll offset.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchStart = function(event) {
	'use strict';
	var targetElement, touch, selection;

	// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
	if (event.targetTouches.length > 1) {
		return true;
	}

	targetElement = this.getTargetElementFromEventTarget(event.target);
	touch = event.targetTouches[0];

	if (this.deviceIsIOS) {

		// Only trusted events will deselect text on iOS (issue #49)
		selection = window.getSelection();
		if (selection.rangeCount && !selection.isCollapsed) {
			return true;
		}

		if (!this.deviceIsIOS4) {

			// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
			// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
			// with the same identifier as the touch event that previously triggered the click that triggered the alert.
			// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
			// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
			if (touch.identifier === this.lastTouchIdentifier) {
				event.preventDefault();
				return false;
			}

			this.lastTouchIdentifier = touch.identifier;

			// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
			// 1) the user does a fling scroll on the scrollable layer
			// 2) the user stops the fling scroll with another tap
			// then the event.target of the last 'touchend' event will be the element that was under the user's finger
			// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
			// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
			this.updateScrollParent(targetElement);
		}
	}

	this.trackingClick = true;
	this.trackingClickStart = event.timeStamp;
	this.targetElement = targetElement;

	this.touchStartX = touch.pageX;
	this.touchStartY = touch.pageY;

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		event.preventDefault();
	}

	return true;
};


/**
 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.touchHasMoved = function(event) {
	'use strict';
	var touch = event.changedTouches[0], boundary = this.touchBoundary;

	if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
		return true;
	}

	return false;
};


/**
 * Attempt to find the labelled control for the given label element.
 *
 * @param {EventTarget|HTMLLabelElement} labelElement
 * @returns {Element|null}
 */
FastClick.prototype.findControl = function(labelElement) {
	'use strict';

	// Fast path for newer browsers supporting the HTML5 control attribute
	if (labelElement.control !== undefined) {
		return labelElement.control;
	}

	// All browsers under test that support touch events also support the HTML5 htmlFor attribute
	if (labelElement.htmlFor) {
		return document.getElementById(labelElement.htmlFor);
	}

	// If no for attribute exists, attempt to retrieve the first labellable descendant element
	// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
	return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};


/**
 * On touch end, determine whether to send a click event at once.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchEnd = function(event) {
	'use strict';
	var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

	// If the touch has moved, cancel the click tracking
	if (this.touchHasMoved(event)) {
		this.trackingClick = false;
		this.targetElement = null;
	}

	if (!this.trackingClick) {
		return true;
	}

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		this.cancelNextClick = true;
		return true;
	}

	this.lastClickTime = event.timeStamp;

	trackingClickStart = this.trackingClickStart;
	this.trackingClick = false;
	this.trackingClickStart = 0;

	// On some iOS devices, the targetElement supplied with the event is invalid if the layer
	// is performing a transition or scroll, and has to be re-detected manually. Note that
	// for this to function correctly, it must be called *after* the event target is checked!
	// See issue #57; also filed as rdar://13048589 .
	if (this.deviceIsIOSWithBadTarget) {
		touch = event.changedTouches[0];

		// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
		targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
		targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
	}

	targetTagName = targetElement.tagName.toLowerCase();
	if (targetTagName === 'label') {
		forElement = this.findControl(targetElement);
		if (forElement) {
			this.focus(targetElement);
			if (this.deviceIsAndroid) {
				return false;
			}

			targetElement = forElement;
		}
	} else if (this.needsFocus(targetElement)) {

		// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
		// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
		if ((event.timeStamp - trackingClickStart) > 100 || (this.deviceIsIOS && window.top !== window && targetTagName === 'input')) {
			this.targetElement = null;
			return false;
		}

		this.focus(targetElement);

		// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
		if (!this.deviceIsIOS4 || targetTagName !== 'select') {
			this.targetElement = null;
			event.preventDefault();
		}

		return false;
	}

	if (this.deviceIsIOS && !this.deviceIsIOS4) {

		// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
		// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
		scrollParent = targetElement.fastClickScrollParent;
		if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
			return true;
		}
	}

	// Prevent the actual click from going though - unless the target node is marked as requiring
	// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
	if (!this.needsClick(targetElement)) {
		event.preventDefault();
		this.sendClick(targetElement, event);
	}

	return false;
};


/**
 * On touch cancel, stop tracking the click.
 *
 * @returns {void}
 */
FastClick.prototype.onTouchCancel = function() {
	'use strict';
	this.trackingClick = false;
	this.targetElement = null;
};


/**
 * Determine mouse events which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onMouse = function(event) {
	'use strict';

	// If a target element was never set (because a touch event was never fired) allow the event
	if (!this.targetElement) {
		return true;
	}

	if (event.forwardedTouchEvent) {
		return true;
	}

	// Programmatically generated events targeting a specific element should be permitted
	if (!event.cancelable) {
		return true;
	}

	// Derive and check the target element to see whether the mouse event needs to be permitted;
	// unless explicitly enabled, prevent non-touch click events from triggering actions,
	// to prevent ghost/doubleclicks.
	if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

		// Prevent any user-added listeners declared on FastClick element from being fired.
		if (event.stopImmediatePropagation) {
			event.stopImmediatePropagation();
		} else {

			// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			event.propagationStopped = true;
		}

		// Cancel the event
		event.stopPropagation();
		event.preventDefault();

		return false;
	}

	// If the mouse event is permitted, return true for the action to go through.
	return true;
};


/**
 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
 * an actual click which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onClick = function(event) {
	'use strict';
	var permitted;

	// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
	if (this.trackingClick) {
		this.targetElement = null;
		this.trackingClick = false;
		return true;
	}

	// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
	if (event.target.type === 'submit' && event.detail === 0) {
		return true;
	}

	permitted = this.onMouse(event);

	// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
	if (!permitted) {
		this.targetElement = null;
	}

	// If clicks are permitted, return true for the action to go through.
	return permitted;
};


/**
 * Remove all FastClick's event listeners.
 *
 * @returns {void}
 */
FastClick.prototype.destroy = function() {
	'use strict';
	var layer = this.layer;

	if (this.deviceIsAndroid) {
		layer.removeEventListener('mouseover', this.onMouse, true);
		layer.removeEventListener('mousedown', this.onMouse, true);
		layer.removeEventListener('mouseup', this.onMouse, true);
	}

	layer.removeEventListener('click', this.onClick, true);
	layer.removeEventListener('touchstart', this.onTouchStart, false);
	layer.removeEventListener('touchend', this.onTouchEnd, false);
	layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};


/**
 * Check whether FastClick is needed.
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.notNeeded = function(layer) {
	'use strict';
	var metaViewport;

	// Devices that don't support touch don't need FastClick
	if (typeof window.ontouchstart === 'undefined') {
		return true;
	}

	if ((/Chrome\/[0-9]+/).test(navigator.userAgent)) {

		// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
		if (FastClick.prototype.deviceIsAndroid) {
			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && metaViewport.content.indexOf('user-scalable=no') !== -1) {
				return true;
			}

		// Chrome desktop doesn't need FastClick (issue #15)
		} else {
			return true;
		}
	}

	// IE10 with -ms-touch-action: none, which disables double-tap-to-zoom (issue #97)
	if (layer.style.msTouchAction === 'none') {
		return true;
	}

	return false;
};


/**
 * Factory method for creating a FastClick object
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.attach = function(layer) {
	'use strict';
	return new FastClick(layer);
};


if (typeof define !== 'undefined' && define.amd) {

	// AMD. Register as an anonymous module.
	define(function() {
		'use strict';
		return FastClick;
	});
} else if (typeof module !== 'undefined' && module.exports) {
	module.exports = FastClick.attach;
	module.exports.FastClick = FastClick;
} else {
	window.FastClick = FastClick;
}

fontdetect=function(){var _isInitialized=false;var _aFallbackFonts=["serif","sans-serif","monospace","cursive","fantasy"];function _init(){if(_isInitialized){return;}_isInitialized=true;$("body > :first-child").before('<div id="fontdetectHelper"><span>abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</span></div>');$("#fontdetectHelper").css({"position":"absolute","visibility":"hidden","top":"-200px","left":"-100000px","width":"100000px","height":"200px","font-size":"100px"});}return{onFontLoaded:function(p_cssFontName,p_onLoad,p_onFail,p_options){if(!p_cssFontName){return;}var msInterval=(p_options&&p_options.msInterval)?p_options.msInterval:100;var msTimeout=(p_options&&p_options.msTimeout)?p_options.msTimeout:2000;if(!p_onLoad&&!p_onFail){return;}if(!_isInitialized){_init();}if(this.isFontLoaded(p_cssFontName)){if(p_onLoad){p_onLoad(p_cssFontName);}return;}var outerThis=this;var utStart=new Date().getTime();var idInterval=setInterval(function(){if(outerThis.isFontLoaded(p_cssFontName)){clearInterval(idInterval);p_onLoad(p_cssFontName);return;}else{var utNow=new Date().getTime();if((utNow-utStart)>msTimeout){clearInterval(idInterval);if(p_onFail){p_onFail(p_cssFontName);}}}},msInterval);},isFontLoaded:function(p_cssFontName){var wThisFont=0;var wPrevFont=0;if(!_isInitialized){_init();}for(var ix=0;ix<_aFallbackFonts.length;++ix){var $helperSpan=$("#fontdetectHelper > SPAN");$helperSpan.css("font-family",p_cssFontName+","+_aFallbackFonts[ix]);wThisFont=$helperSpan.width();if(ix>0&&wThisFont!=wPrevFont){return false;}wPrevFont=wThisFont;}return true;},whichFont:function(p_element){var sStack=$(p_element).css("font-family");var aStack=sStack.split(",");var sFont=aStack.shift();while(sFont){sFont=sFont.replace(/^\s*['"]?\s*([^'"]*)\s*['"]?\s*$/,"$1");if(this.isFontLoaded(sFont)){return sFont;}sFont=aStack.shift();}return null;}};}();

/*
  textfill
 @name      jquery.textfill.js
 @author    Russ Painter
 @author    Yu-Jie Lin
 @version   0.4.0
 @date      2013-08-16
 @copyright (c) 2012-2013 Yu-Jie Lin
 @copyright (c) 2009 Russ Painter
 @license   MIT License
 @homepage  https://github.com/jquery-textfill/jquery-textfill
 @example   http://jquery-textfill.github.io/jquery-textfill/index.html
*/
(function(b){b.fn.textfill=function(k){function m(a,c,e,b,g,l,f,h){for(;f<h-1;)if(a=Math.floor((f+h)/2),c.css("font-size",a),e.call(c)<=b){if(f=a,e.call(c)==b)break}else h=a;c.css("font-size",h);e.call(c)<=b&&(f=h);return f}var a=b.extend({debug:!1,maxFontPixels:40,minFontPixels:4,innerTag:"span",widthOnly:!1,success:null,callback:null,fail:null,complete:null,explicitWidth:null,explicitHeight:null},k);this.each(function(){var d=b(a.innerTag+":visible:first",this),c=a.explicitHeight||b(this).height(),
e=a.explicitWidth||b(this).width(),k=d.css("font-size"),g=a.minFontPixels,l=0>=a.maxFontPixels?c:a.maxFontPixels,f=void 0;a.widthOnly||(f=m("H",d,b.fn.height,c,c,e,g,l));g=m("W",d,b.fn.width,e,c,e,g,l);a.widthOnly?d.css("font-size",g):d.css("font-size",Math.min(f,g));d.width()>e||d.height()>c&&!a.widthOnly?(d.css("font-size",k),a.fail&&a.fail(this)):a.success?a.success(this):a.callback&&a.callback(this)});a.complete&&a.complete(this);return this}})(window.jQuery);

var Froogaloop=function(){function e(a){return new e.fn.init(a)}function h(a,c,b){if(!b.contentWindow.postMessage)return!1;var f=b.getAttribute("src").split("?")[0],a=JSON.stringify({method:a,value:c});"//"===f.substr(0,2)&&(f=window.location.protocol+f);b.contentWindow.postMessage(a,f)}function j(a){var c,b;try{c=JSON.parse(a.data),b=c.event||c.method}catch(f){}"ready"==b&&!i&&(i=!0);if(a.origin!=k)return!1;var a=c.value,e=c.data,g=""===g?null:c.player_id;c=g?d[g][b]:d[b];b=[];if(!c)return!1;void 0!==
a&&b.push(a);e&&b.push(e);g&&b.push(g);return 0<b.length?c.apply(null,b):c.call()}function l(a,c,b){b?(d[b]||(d[b]={}),d[b][a]=c):d[a]=c}var d={},i=!1,k="";e.fn=e.prototype={element:null,init:function(a){"string"===typeof a&&(a=document.getElementById(a));this.element=a;a=this.element.getAttribute("src");"//"===a.substr(0,2)&&(a=window.location.protocol+a);for(var a=a.split("/"),c="",b=0,f=a.length;b<f;b++){if(3>b)c+=a[b];else break;2>b&&(c+="/")}k=c;return this},api:function(a,c){if(!this.element||
!a)return!1;var b=this.element,f=""!==b.id?b.id:null,d=!c||!c.constructor||!c.call||!c.apply?c:null,e=c&&c.constructor&&c.call&&c.apply?c:null;e&&l(a,e,f);h(a,d,b);return this},addEvent:function(a,c){if(!this.element)return!1;var b=this.element,d=""!==b.id?b.id:null;l(a,c,d);"ready"!=a?h("addEventListener",a,b):"ready"==a&&i&&c.call(null,d);return this},removeEvent:function(a){if(!this.element)return!1;var c=this.element,b;a:{if((b=""!==c.id?c.id:null)&&d[b]){if(!d[b][a]){b=!1;break a}d[b][a]=null}else{if(!d[a]){b=
!1;break a}d[a]=null}b=!0}"ready"!=a&&b&&h("removeEventListener",a,c)}};e.fn.init.prototype=e.fn;window.addEventListener?window.addEventListener("message",j,!1):window.attachEvent("onmessage",j);return window.Froogaloop=window.$f=e}();

/*
 * jPlayer Plugin for jQuery JavaScript Library
 * http://www.jplayer.org
 *
 * Copyright (c) 2009 - 2013 Happyworm Ltd
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 *
 * Author: Mark J Panaghiston
 * Version: 2.4.0
 * Date: 5th June 2013
 */
 
(function(b,f){"function"===typeof define&&define.amd?define(["jquery"],f):b.jQuery?f(b.jQuery):f(b.Zepto)})(this,function(b,f){b.fn.jPlayer=function(a){var c="string"===typeof a,d=Array.prototype.slice.call(arguments,1),e=this;a=!c&&d.length?b.extend.apply(null,[!0,a].concat(d)):a;if(c&&"_"===a.charAt(0))return e;c?this.each(function(){var c=b(this).data("jPlayer"),h=c&&b.isFunction(c[a])?c[a].apply(c,d):c;if(h!==c&&h!==f)return e=h,!1}):this.each(function(){var c=b(this).data("jPlayer");c?c.option(a||
{}):b(this).data("jPlayer",new b.jPlayer(a,this))});return e};b.jPlayer=function(a,c){if(arguments.length){this.element=b(c);this.options=b.extend(!0,{},this.options,a);var d=this;this.element.bind("remove.jPlayer",function(){d.destroy()});this._init()}};"function"!==typeof b.fn.stop&&(b.fn.stop=function(){});b.jPlayer.emulateMethods="load play pause";b.jPlayer.emulateStatus="src readyState networkState currentTime duration paused ended playbackRate";b.jPlayer.emulateOptions="muted volume";b.jPlayer.reservedEvent=
"ready flashreset resize repeat error warning";b.jPlayer.event={};b.each("ready flashreset resize repeat click error warning loadstart progress suspend abort emptied stalled play pause loadedmetadata loadeddata waiting playing canplay canplaythrough seeking seeked timeupdate ended ratechange durationchange volumechange".split(" "),function(){b.jPlayer.event[this]="jPlayer_"+this});b.jPlayer.htmlEvent="loadstart abort emptied stalled loadedmetadata loadeddata canplay canplaythrough ratechange".split(" ");
b.jPlayer.pause=function(){b.each(b.jPlayer.prototype.instances,function(a,c){c.data("jPlayer").status.srcSet&&c.jPlayer("pause")})};b.jPlayer.timeFormat={showHour:!1,showMin:!0,showSec:!0,padHour:!1,padMin:!0,padSec:!0,sepHour:":",sepMin:":",sepSec:""};var l=function(){this.init()};l.prototype={init:function(){this.options={timeFormat:b.jPlayer.timeFormat}},time:function(a){var c=new Date(1E3*(a&&"number"===typeof a?a:0)),b=c.getUTCHours();a=this.options.timeFormat.showHour?c.getUTCMinutes():c.getUTCMinutes()+
60*b;c=this.options.timeFormat.showMin?c.getUTCSeconds():c.getUTCSeconds()+60*a;b=this.options.timeFormat.padHour&&10>b?"0"+b:b;a=this.options.timeFormat.padMin&&10>a?"0"+a:a;c=this.options.timeFormat.padSec&&10>c?"0"+c:c;b=""+(this.options.timeFormat.showHour?b+this.options.timeFormat.sepHour:"");b+=this.options.timeFormat.showMin?a+this.options.timeFormat.sepMin:"";return b+=this.options.timeFormat.showSec?c+this.options.timeFormat.sepSec:""}};var m=new l;b.jPlayer.convertTime=function(a){return m.time(a)};
b.jPlayer.uaBrowser=function(a){a=a.toLowerCase();var b=/(opera)(?:.*version)?[ \/]([\w.]+)/,d=/(msie) ([\w.]+)/,e=/(mozilla)(?:.*? rv:([\w.]+))?/;a=/(webkit)[ \/]([\w.]+)/.exec(a)||b.exec(a)||d.exec(a)||0>a.indexOf("compatible")&&e.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}};b.jPlayer.uaPlatform=function(a){var b=a.toLowerCase(),d=/(android)/,e=/(mobile)/;a=/(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/.exec(b)||[];b=/(ipad|playbook)/.exec(b)||!e.exec(b)&&d.exec(b)||
[];a[1]&&(a[1]=a[1].replace(/\s/g,"_"));return{platform:a[1]||"",tablet:b[1]||""}};b.jPlayer.browser={};b.jPlayer.platform={};var j=b.jPlayer.uaBrowser(navigator.userAgent);j.browser&&(b.jPlayer.browser[j.browser]=!0,b.jPlayer.browser.version=j.version);j=b.jPlayer.uaPlatform(navigator.userAgent);j.platform&&(b.jPlayer.platform[j.platform]=!0,b.jPlayer.platform.mobile=!j.tablet,b.jPlayer.platform.tablet=!!j.tablet);b.jPlayer.getDocMode=function(){var a;b.jPlayer.browser.msie&&(document.documentMode?
a=document.documentMode:(a=5,document.compatMode&&"CSS1Compat"===document.compatMode&&(a=7)));return a};b.jPlayer.browser.documentMode=b.jPlayer.getDocMode();b.jPlayer.nativeFeatures={init:function(){var a=document,b=a.createElement("video"),d={w3c:"fullscreenEnabled fullscreenElement requestFullscreen exitFullscreen fullscreenchange fullscreenerror".split(" "),moz:"mozFullScreenEnabled mozFullScreenElement mozRequestFullScreen mozCancelFullScreen mozfullscreenchange mozfullscreenerror".split(" "),
webkit:" webkitCurrentFullScreenElement webkitRequestFullScreen webkitCancelFullScreen webkitfullscreenchange ".split(" "),webkitVideo:"webkitSupportsFullscreen webkitDisplayingFullscreen webkitEnterFullscreen webkitExitFullscreen  ".split(" ")},e=["w3c","moz","webkit","webkitVideo"],g,h;this.fullscreen=b={support:{w3c:!!a[d.w3c[0]],moz:!!a[d.moz[0]],webkit:"function"===typeof a[d.webkit[3]],webkitVideo:"function"===typeof b[d.webkitVideo[2]]},used:{}};g=0;for(h=e.length;g<h;g++){var f=e[g];if(b.support[f]){b.spec=
f;b.used[f]=!0;break}}if(b.spec){var k=d[b.spec];b.api={fullscreenEnabled:!0,fullscreenElement:function(b){b=b?b:a;return b[k[1]]},requestFullscreen:function(a){return a[k[2]]()},exitFullscreen:function(b){b=b?b:a;return b[k[3]]()}};b.event={fullscreenchange:k[4],fullscreenerror:k[5]}}else b.api={fullscreenEnabled:!1,fullscreenElement:function(){return null},requestFullscreen:function(){},exitFullscreen:function(){}},b.event={}}};b.jPlayer.nativeFeatures.init();b.jPlayer.focus=null;b.jPlayer.keyIgnoreElementNames=
"INPUT TEXTAREA";var n=function(a){var c=b.jPlayer.focus,d;c&&(b.each(b.jPlayer.keyIgnoreElementNames.split(/\s+/g),function(b,c){if(a.target.nodeName.toUpperCase()===c.toUpperCase())return d=!0,!1}),d||b.each(c.options.keyBindings,function(d,g){if(g&&a.which===g.key&&b.isFunction(g.fn))return a.preventDefault(),g.fn(c),!1}))};b.jPlayer.keys=function(a){b(document.documentElement).unbind("keydown.jPlayer");a&&b(document.documentElement).bind("keydown.jPlayer",n)};b.jPlayer.keys(!0);b.jPlayer.prototype=
{count:0,version:{script:"2.4.0",needFlash:"2.4.0",flash:"unknown"},options:{swfPath:"js",solution:"html, flash",supplied:"mp3",preload:"metadata",volume:0.8,muted:!1,wmode:"opaque",backgroundColor:"#000000",cssSelectorAncestor:"#jp_container_1",cssSelector:{videoPlay:".jp-video-play",play:".jp-play",pause:".jp-pause",stop:".jp-stop",seekBar:".jp-seek-bar",playBar:".jp-play-bar",mute:".jp-mute",unmute:".jp-unmute",volumeBar:".jp-volume-bar",volumeBarValue:".jp-volume-bar-value",volumeMax:".jp-volume-max",
currentTime:".jp-current-time",duration:".jp-duration",fullScreen:".jp-full-screen",restoreScreen:".jp-restore-screen",repeat:".jp-repeat",repeatOff:".jp-repeat-off",gui:".jp-gui",noSolution:".jp-no-solution"},smoothPlayBar:!1,fullScreen:!1,fullWindow:!1,autohide:{restored:!1,full:!0,fadeIn:200,fadeOut:600,hold:1E3},loop:!1,repeat:function(a){a.jPlayer.options.loop?b(this).unbind(".jPlayerRepeat").bind(b.jPlayer.event.ended+".jPlayer.jPlayerRepeat",function(){b(this).jPlayer("play")}):b(this).unbind(".jPlayerRepeat")},
nativeVideoControls:{},noFullWindow:{msie:/msie [0-6]\./,ipad:/ipad.*?os [0-4]\./,iphone:/iphone/,ipod:/ipod/,android_pad:/android [0-3]\.(?!.*?mobile)/,android_phone:/android.*?mobile/,blackberry:/blackberry/,windows_ce:/windows ce/,iemobile:/iemobile/,webos:/webos/},noVolume:{ipad:/ipad/,iphone:/iphone/,ipod:/ipod/,android_pad:/android(?!.*?mobile)/,android_phone:/android.*?mobile/,blackberry:/blackberry/,windows_ce:/windows ce/,iemobile:/iemobile/,webos:/webos/,playbook:/playbook/},timeFormat:{},
keyEnabled:!1,audioFullScreen:!1,keyBindings:{play:{key:32,fn:function(a){a.status.paused?a.play():a.pause()}},fullScreen:{key:13,fn:function(a){(a.status.video||a.options.audioFullScreen)&&a._setOption("fullScreen",!a.options.fullScreen)}},muted:{key:8,fn:function(a){a._muted(!a.options.muted)}},volumeUp:{key:38,fn:function(a){a.volume(a.options.volume+0.1)}},volumeDown:{key:40,fn:function(a){a.volume(a.options.volume-0.1)}}},verticalVolume:!1,idPrefix:"jp",noConflict:"jQuery",emulateHtml:!1,errorAlerts:!1,
warningAlerts:!1},optionsAudio:{size:{width:"0px",height:"0px",cssClass:""},sizeFull:{width:"0px",height:"0px",cssClass:""}},optionsVideo:{size:{width:"480px",height:"270px",cssClass:"jp-video-270p"},sizeFull:{width:"100%",height:"100%",cssClass:"jp-video-full"}},instances:{},status:{src:"",media:{},paused:!0,format:{},formatType:"",waitForPlay:!0,waitForLoad:!0,srcSet:!1,video:!1,seekPercent:0,currentPercentRelative:0,currentPercentAbsolute:0,currentTime:0,duration:0,videoWidth:0,videoHeight:0,readyState:0,
networkState:0,playbackRate:1,ended:0},internal:{ready:!1},solution:{html:!0,flash:!0},format:{mp3:{codec:'audio/mpeg; codecs="mp3"',flashCanPlay:!0,media:"audio"},m4a:{codec:'audio/mp4; codecs="mp4a.40.2"',flashCanPlay:!0,media:"audio"},oga:{codec:'audio/ogg; codecs="vorbis"',flashCanPlay:!1,media:"audio"},wav:{codec:'audio/wav; codecs="1"',flashCanPlay:!1,media:"audio"},webma:{codec:'audio/webm; codecs="vorbis"',flashCanPlay:!1,media:"audio"},fla:{codec:"audio/x-flv",flashCanPlay:!0,media:"audio"},
rtmpa:{codec:'audio/rtmp; codecs="rtmp"',flashCanPlay:!0,media:"audio"},m4v:{codec:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',flashCanPlay:!0,media:"video"},ogv:{codec:'video/ogg; codecs="theora, vorbis"',flashCanPlay:!1,media:"video"},webmv:{codec:'video/webm; codecs="vorbis, vp8"',flashCanPlay:!1,media:"video"},flv:{codec:"video/x-flv",flashCanPlay:!0,media:"video"},rtmpv:{codec:'video/rtmp; codecs="rtmp"',flashCanPlay:!0,media:"video"}},_init:function(){var a=this;this.element.empty();this.status=
b.extend({},this.status);this.internal=b.extend({},this.internal);this.options.timeFormat=b.extend({},b.jPlayer.timeFormat,this.options.timeFormat);this.internal.cmdsIgnored=b.jPlayer.platform.ipad||b.jPlayer.platform.iphone||b.jPlayer.platform.ipod;this.internal.domNode=this.element.get(0);this.options.keyEnabled&&!b.jPlayer.focus&&(b.jPlayer.focus=this);this.formats=[];this.solutions=[];this.require={};this.htmlElement={};this.html={};this.html.audio={};this.html.video={};this.flash={};this.css=
{};this.css.cs={};this.css.jq={};this.ancestorJq=[];this.options.volume=this._limitValue(this.options.volume,0,1);b.each(this.options.supplied.toLowerCase().split(","),function(c,d){var e=d.replace(/^\s+|\s+$/g,"");if(a.format[e]){var f=!1;b.each(a.formats,function(a,b){if(e===b)return f=!0,!1});f||a.formats.push(e)}});b.each(this.options.solution.toLowerCase().split(","),function(c,d){var e=d.replace(/^\s+|\s+$/g,"");if(a.solution[e]){var f=!1;b.each(a.solutions,function(a,b){if(e===b)return f=!0,
!1});f||a.solutions.push(e)}});this.internal.instance="jp_"+this.count;this.instances[this.internal.instance]=this.element;this.element.attr("id")||this.element.attr("id",this.options.idPrefix+"_jplayer_"+this.count);this.internal.self=b.extend({},{id:this.element.attr("id"),jq:this.element});this.internal.audio=b.extend({},{id:this.options.idPrefix+"_audio_"+this.count,jq:f});this.internal.video=b.extend({},{id:this.options.idPrefix+"_video_"+this.count,jq:f});this.internal.flash=b.extend({},{id:this.options.idPrefix+
"_flash_"+this.count,jq:f,swf:this.options.swfPath+(".swf"!==this.options.swfPath.toLowerCase().slice(-4)?(this.options.swfPath&&"/"!==this.options.swfPath.slice(-1)?"/":"")+"Jplayer.swf":"")});this.internal.poster=b.extend({},{id:this.options.idPrefix+"_poster_"+this.count,jq:f});b.each(b.jPlayer.event,function(b,c){a.options[b]!==f&&(a.element.bind(c+".jPlayer",a.options[b]),a.options[b]=f)});this.require.audio=!1;this.require.video=!1;b.each(this.formats,function(b,c){a.require[a.format[c].media]=
!0});this.options=this.require.video?b.extend(!0,{},this.optionsVideo,this.options):b.extend(!0,{},this.optionsAudio,this.options);this._setSize();this.status.nativeVideoControls=this._uaBlocklist(this.options.nativeVideoControls);this.status.noFullWindow=this._uaBlocklist(this.options.noFullWindow);this.status.noVolume=this._uaBlocklist(this.options.noVolume);b.jPlayer.nativeFeatures.fullscreen.api.fullscreenEnabled&&this._fullscreenAddEventListeners();this._restrictNativeVideoControls();this.htmlElement.poster=
document.createElement("img");this.htmlElement.poster.id=this.internal.poster.id;this.htmlElement.poster.onload=function(){(!a.status.video||a.status.waitForPlay)&&a.internal.poster.jq.show()};this.element.append(this.htmlElement.poster);this.internal.poster.jq=b("#"+this.internal.poster.id);this.internal.poster.jq.css({width:this.status.width,height:this.status.height});this.internal.poster.jq.hide();this.internal.poster.jq.bind("click.jPlayer",function(){a._trigger(b.jPlayer.event.click)});this.html.audio.available=
!1;this.require.audio&&(this.htmlElement.audio=document.createElement("audio"),this.htmlElement.audio.id=this.internal.audio.id,this.html.audio.available=!!this.htmlElement.audio.canPlayType&&this._testCanPlayType(this.htmlElement.audio));this.html.video.available=!1;this.require.video&&(this.htmlElement.video=document.createElement("video"),this.htmlElement.video.id=this.internal.video.id,this.html.video.available=!!this.htmlElement.video.canPlayType&&this._testCanPlayType(this.htmlElement.video));
this.flash.available=this._checkForFlash(10.1);this.html.canPlay={};this.flash.canPlay={};b.each(this.formats,function(b,c){a.html.canPlay[c]=a.html[a.format[c].media].available&&""!==a.htmlElement[a.format[c].media].canPlayType(a.format[c].codec);a.flash.canPlay[c]=a.format[c].flashCanPlay&&a.flash.available});this.html.desired=!1;this.flash.desired=!1;b.each(this.solutions,function(c,d){if(0===c)a[d].desired=!0;else{var e=!1,f=!1;b.each(a.formats,function(b,c){a[a.solutions[0]].canPlay[c]&&("video"===
a.format[c].media?f=!0:e=!0)});a[d].desired=a.require.audio&&!e||a.require.video&&!f}});this.html.support={};this.flash.support={};b.each(this.formats,function(b,c){a.html.support[c]=a.html.canPlay[c]&&a.html.desired;a.flash.support[c]=a.flash.canPlay[c]&&a.flash.desired});this.html.used=!1;this.flash.used=!1;b.each(this.solutions,function(c,d){b.each(a.formats,function(b,c){if(a[d].support[c])return a[d].used=!0,!1})});this._resetActive();this._resetGate();this._cssSelectorAncestor(this.options.cssSelectorAncestor);
!this.html.used&&!this.flash.used?(this._error({type:b.jPlayer.error.NO_SOLUTION,context:"{solution:'"+this.options.solution+"', supplied:'"+this.options.supplied+"'}",message:b.jPlayer.errorMsg.NO_SOLUTION,hint:b.jPlayer.errorHint.NO_SOLUTION}),this.css.jq.noSolution.length&&this.css.jq.noSolution.show()):this.css.jq.noSolution.length&&this.css.jq.noSolution.hide();if(this.flash.used){var c,d="jQuery="+encodeURI(this.options.noConflict)+"&id="+encodeURI(this.internal.self.id)+"&vol="+this.options.volume+
"&muted="+this.options.muted;if(b.jPlayer.browser.msie&&(9>Number(b.jPlayer.browser.version)||9>b.jPlayer.browser.documentMode)){d=['<param name="movie" value="'+this.internal.flash.swf+'" />','<param name="FlashVars" value="'+d+'" />','<param name="allowScriptAccess" value="always" />','<param name="bgcolor" value="'+this.options.backgroundColor+'" />','<param name="wmode" value="'+this.options.wmode+'" />'];c=document.createElement('<object id="'+this.internal.flash.id+'" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0" tabindex="-1"></object>');
for(var e=0;e<d.length;e++)c.appendChild(document.createElement(d[e]))}else e=function(a,b,c){var d=document.createElement("param");d.setAttribute("name",b);d.setAttribute("value",c);a.appendChild(d)},c=document.createElement("object"),c.setAttribute("id",this.internal.flash.id),c.setAttribute("name",this.internal.flash.id),c.setAttribute("data",this.internal.flash.swf),c.setAttribute("type","application/x-shockwave-flash"),c.setAttribute("width","1"),c.setAttribute("height","1"),c.setAttribute("tabindex",
"-1"),e(c,"flashvars",d),e(c,"allowscriptaccess","always"),e(c,"bgcolor",this.options.backgroundColor),e(c,"wmode",this.options.wmode);this.element.append(c);this.internal.flash.jq=b(c)}this.html.used&&(this.html.audio.available&&(this._addHtmlEventListeners(this.htmlElement.audio,this.html.audio),this.element.append(this.htmlElement.audio),this.internal.audio.jq=b("#"+this.internal.audio.id)),this.html.video.available&&(this._addHtmlEventListeners(this.htmlElement.video,this.html.video),this.element.append(this.htmlElement.video),
this.internal.video.jq=b("#"+this.internal.video.id),this.status.nativeVideoControls?this.internal.video.jq.css({width:this.status.width,height:this.status.height}):this.internal.video.jq.css({width:"0px",height:"0px"}),this.internal.video.jq.bind("click.jPlayer",function(){a._trigger(b.jPlayer.event.click)})));this.options.emulateHtml&&this._emulateHtmlBridge();this.html.used&&!this.flash.used&&setTimeout(function(){a.internal.ready=!0;a.version.flash="n/a";a._trigger(b.jPlayer.event.repeat);a._trigger(b.jPlayer.event.ready)},
100);this._updateNativeVideoControls();this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide();b.jPlayer.prototype.count++},destroy:function(){this.clearMedia();this._removeUiClass();this.css.jq.currentTime.length&&this.css.jq.currentTime.text("");this.css.jq.duration.length&&this.css.jq.duration.text("");b.each(this.css.jq,function(a,b){b.length&&b.unbind(".jPlayer")});this.internal.poster.jq.unbind(".jPlayer");this.internal.video.jq&&this.internal.video.jq.unbind(".jPlayer");this._fullscreenRemoveEventListeners();
this===b.jPlayer.focus&&(b.jPlayer.focus=null);this.options.emulateHtml&&this._destroyHtmlBridge();this.element.removeData("jPlayer");this.element.unbind(".jPlayer");this.element.empty();delete this.instances[this.internal.instance]},enable:function(){},disable:function(){},_testCanPlayType:function(a){try{return a.canPlayType(this.format.mp3.codec),!0}catch(b){return!1}},_uaBlocklist:function(a){var c=navigator.userAgent.toLowerCase(),d=!1;b.each(a,function(a,b){if(b&&b.test(c))return d=!0,!1});
return d},_restrictNativeVideoControls:function(){this.require.audio&&this.status.nativeVideoControls&&(this.status.nativeVideoControls=!1,this.status.noFullWindow=!0)},_updateNativeVideoControls:function(){this.html.video.available&&this.html.used&&(this.htmlElement.video.controls=this.status.nativeVideoControls,this._updateAutohide(),this.status.nativeVideoControls&&this.require.video?(this.internal.poster.jq.hide(),this.internal.video.jq.css({width:this.status.width,height:this.status.height})):
this.status.waitForPlay&&this.status.video&&(this.internal.poster.jq.show(),this.internal.video.jq.css({width:"0px",height:"0px"})))},_addHtmlEventListeners:function(a,c){var d=this;a.preload=this.options.preload;a.muted=this.options.muted;a.volume=this.options.volume;a.addEventListener("progress",function(){c.gate&&(d.internal.cmdsIgnored&&0<this.readyState&&(d.internal.cmdsIgnored=!1),d._getHtmlStatus(a),d._updateInterface(),d._trigger(b.jPlayer.event.progress))},!1);a.addEventListener("timeupdate",
function(){c.gate&&(d._getHtmlStatus(a),d._updateInterface(),d._trigger(b.jPlayer.event.timeupdate))},!1);a.addEventListener("durationchange",function(){c.gate&&(d._getHtmlStatus(a),d._updateInterface(),d._trigger(b.jPlayer.event.durationchange))},!1);a.addEventListener("play",function(){c.gate&&(d._updateButtons(!0),d._html_checkWaitForPlay(),d._trigger(b.jPlayer.event.play))},!1);a.addEventListener("playing",function(){c.gate&&(d._updateButtons(!0),d._seeked(),d._trigger(b.jPlayer.event.playing))},
!1);a.addEventListener("pause",function(){c.gate&&(d._updateButtons(!1),d._trigger(b.jPlayer.event.pause))},!1);a.addEventListener("waiting",function(){c.gate&&(d._seeking(),d._trigger(b.jPlayer.event.waiting))},!1);a.addEventListener("seeking",function(){c.gate&&(d._seeking(),d._trigger(b.jPlayer.event.seeking))},!1);a.addEventListener("seeked",function(){c.gate&&(d._seeked(),d._trigger(b.jPlayer.event.seeked))},!1);a.addEventListener("volumechange",function(){c.gate&&(d.options.volume=a.volume,
d.options.muted=a.muted,d._updateMute(),d._updateVolume(),d._trigger(b.jPlayer.event.volumechange))},!1);a.addEventListener("suspend",function(){c.gate&&(d._seeked(),d._trigger(b.jPlayer.event.suspend))},!1);a.addEventListener("ended",function(){c.gate&&(b.jPlayer.browser.webkit||(d.htmlElement.media.currentTime=0),d.htmlElement.media.pause(),d._updateButtons(!1),d._getHtmlStatus(a,!0),d._updateInterface(),d._trigger(b.jPlayer.event.ended))},!1);a.addEventListener("error",function(){c.gate&&(d._updateButtons(!1),
d._seeked(),d.status.srcSet&&(clearTimeout(d.internal.htmlDlyCmdId),d.status.waitForLoad=!0,d.status.waitForPlay=!0,d.status.video&&!d.status.nativeVideoControls&&d.internal.video.jq.css({width:"0px",height:"0px"}),d._validString(d.status.media.poster)&&!d.status.nativeVideoControls&&d.internal.poster.jq.show(),d.css.jq.videoPlay.length&&d.css.jq.videoPlay.show(),d._error({type:b.jPlayer.error.URL,context:d.status.src,message:b.jPlayer.errorMsg.URL,hint:b.jPlayer.errorHint.URL})))},!1);b.each(b.jPlayer.htmlEvent,
function(e,g){a.addEventListener(this,function(){c.gate&&d._trigger(b.jPlayer.event[g])},!1)})},_getHtmlStatus:function(a,b){var d=0,e=0,g=0,f=0;isFinite(a.duration)&&(this.status.duration=a.duration);d=a.currentTime;e=0<this.status.duration?100*d/this.status.duration:0;"object"===typeof a.seekable&&0<a.seekable.length?(g=0<this.status.duration?100*a.seekable.end(a.seekable.length-1)/this.status.duration:100,f=0<this.status.duration?100*a.currentTime/a.seekable.end(a.seekable.length-1):0):(g=100,
f=e);b&&(e=f=d=0);this.status.seekPercent=g;this.status.currentPercentRelative=f;this.status.currentPercentAbsolute=e;this.status.currentTime=d;this.status.videoWidth=a.videoWidth;this.status.videoHeight=a.videoHeight;this.status.readyState=a.readyState;this.status.networkState=a.networkState;this.status.playbackRate=a.playbackRate;this.status.ended=a.ended},_resetStatus:function(){this.status=b.extend({},this.status,b.jPlayer.prototype.status)},_trigger:function(a,c,d){a=b.Event(a);a.jPlayer={};
a.jPlayer.version=b.extend({},this.version);a.jPlayer.options=b.extend(!0,{},this.options);a.jPlayer.status=b.extend(!0,{},this.status);a.jPlayer.html=b.extend(!0,{},this.html);a.jPlayer.flash=b.extend(!0,{},this.flash);c&&(a.jPlayer.error=b.extend({},c));d&&(a.jPlayer.warning=b.extend({},d));this.element.trigger(a)},jPlayerFlashEvent:function(a,c){if(a===b.jPlayer.event.ready)if(this.internal.ready){if(this.flash.gate){if(this.status.srcSet){var d=this.status.currentTime,e=this.status.paused;this.setMedia(this.status.media);
0<d&&(e?this.pause(d):this.play(d))}this._trigger(b.jPlayer.event.flashreset)}}else this.internal.ready=!0,this.internal.flash.jq.css({width:"0px",height:"0px"}),this.version.flash=c.version,this.version.needFlash!==this.version.flash&&this._error({type:b.jPlayer.error.VERSION,context:this.version.flash,message:b.jPlayer.errorMsg.VERSION+this.version.flash,hint:b.jPlayer.errorHint.VERSION}),this._trigger(b.jPlayer.event.repeat),this._trigger(a);if(this.flash.gate)switch(a){case b.jPlayer.event.progress:this._getFlashStatus(c);
this._updateInterface();this._trigger(a);break;case b.jPlayer.event.timeupdate:this._getFlashStatus(c);this._updateInterface();this._trigger(a);break;case b.jPlayer.event.play:this._seeked();this._updateButtons(!0);this._trigger(a);break;case b.jPlayer.event.pause:this._updateButtons(!1);this._trigger(a);break;case b.jPlayer.event.ended:this._updateButtons(!1);this._trigger(a);break;case b.jPlayer.event.click:this._trigger(a);break;case b.jPlayer.event.error:this.status.waitForLoad=!0;this.status.waitForPlay=
!0;this.status.video&&this.internal.flash.jq.css({width:"0px",height:"0px"});this._validString(this.status.media.poster)&&this.internal.poster.jq.show();this.css.jq.videoPlay.length&&this.status.video&&this.css.jq.videoPlay.show();this.status.video?this._flash_setVideo(this.status.media):this._flash_setAudio(this.status.media);this._updateButtons(!1);this._error({type:b.jPlayer.error.URL,context:c.src,message:b.jPlayer.errorMsg.URL,hint:b.jPlayer.errorHint.URL});break;case b.jPlayer.event.seeking:this._seeking();
this._trigger(a);break;case b.jPlayer.event.seeked:this._seeked();this._trigger(a);break;case b.jPlayer.event.ready:break;default:this._trigger(a)}return!1},_getFlashStatus:function(a){this.status.seekPercent=a.seekPercent;this.status.currentPercentRelative=a.currentPercentRelative;this.status.currentPercentAbsolute=a.currentPercentAbsolute;this.status.currentTime=a.currentTime;this.status.duration=a.duration;this.status.videoWidth=a.videoWidth;this.status.videoHeight=a.videoHeight;this.status.readyState=
4;this.status.networkState=0;this.status.playbackRate=1;this.status.ended=!1},_updateButtons:function(a){a===f?a=!this.status.paused:this.status.paused=!a;this.css.jq.play.length&&this.css.jq.pause.length&&(a?(this.css.jq.play.hide(),this.css.jq.pause.show()):(this.css.jq.play.show(),this.css.jq.pause.hide()));this.css.jq.restoreScreen.length&&this.css.jq.fullScreen.length&&(this.status.noFullWindow?(this.css.jq.fullScreen.hide(),this.css.jq.restoreScreen.hide()):this.options.fullWindow?(this.css.jq.fullScreen.hide(),
this.css.jq.restoreScreen.show()):(this.css.jq.fullScreen.show(),this.css.jq.restoreScreen.hide()));this.css.jq.repeat.length&&this.css.jq.repeatOff.length&&(this.options.loop?(this.css.jq.repeat.hide(),this.css.jq.repeatOff.show()):(this.css.jq.repeat.show(),this.css.jq.repeatOff.hide()))},_updateInterface:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.width(this.status.seekPercent+"%");this.css.jq.playBar.length&&(this.options.smoothPlayBar?this.css.jq.playBar.stop().animate({width:this.status.currentPercentAbsolute+
"%"},250,"linear"):this.css.jq.playBar.width(this.status.currentPercentRelative+"%"));this.css.jq.currentTime.length&&this.css.jq.currentTime.text(this._convertTime(this.status.currentTime));this.css.jq.duration.length&&this.css.jq.duration.text(this._convertTime(this.status.duration))},_convertTime:l.prototype.time,_seeking:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.addClass("jp-seeking-bg")},_seeked:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.removeClass("jp-seeking-bg")},
_resetGate:function(){this.html.audio.gate=!1;this.html.video.gate=!1;this.flash.gate=!1},_resetActive:function(){this.html.active=!1;this.flash.active=!1},setMedia:function(a){var c=this,d=!1,e=this.status.media.poster!==a.poster;this._resetMedia();this._resetGate();this._resetActive();b.each(this.formats,function(e,f){var j="video"===c.format[f].media;b.each(c.solutions,function(b,e){if(c[e].support[f]&&c._validString(a[f])){var g="html"===e;j?(g?(c.html.video.gate=!0,c._html_setVideo(a),c.html.active=
!0):(c.flash.gate=!0,c._flash_setVideo(a),c.flash.active=!0),c.css.jq.videoPlay.length&&c.css.jq.videoPlay.show(),c.status.video=!0):(g?(c.html.audio.gate=!0,c._html_setAudio(a),c.html.active=!0):(c.flash.gate=!0,c._flash_setAudio(a),c.flash.active=!0),c.css.jq.videoPlay.length&&c.css.jq.videoPlay.hide(),c.status.video=!1);d=!0;return!1}});if(d)return!1});if(d){if((!this.status.nativeVideoControls||!this.html.video.gate)&&this._validString(a.poster))e?this.htmlElement.poster.src=a.poster:this.internal.poster.jq.show();
this.status.srcSet=!0;this.status.media=b.extend({},a);this._updateButtons(!1);this._updateInterface()}else this._error({type:b.jPlayer.error.NO_SUPPORT,context:"{supplied:'"+this.options.supplied+"'}",message:b.jPlayer.errorMsg.NO_SUPPORT,hint:b.jPlayer.errorHint.NO_SUPPORT})},_resetMedia:function(){this._resetStatus();this._updateButtons(!1);this._updateInterface();this._seeked();this.internal.poster.jq.hide();clearTimeout(this.internal.htmlDlyCmdId);this.html.active?this._html_resetMedia():this.flash.active&&
this._flash_resetMedia()},clearMedia:function(){this._resetMedia();this.html.active?this._html_clearMedia():this.flash.active&&this._flash_clearMedia();this._resetGate();this._resetActive()},load:function(){this.status.srcSet?this.html.active?this._html_load():this.flash.active&&this._flash_load():this._urlNotSetError("load")},focus:function(){this.options.keyEnabled&&(b.jPlayer.focus=this)},play:function(a){a="number"===typeof a?a:NaN;this.status.srcSet?(this.focus(),this.html.active?this._html_play(a):
this.flash.active&&this._flash_play(a)):this._urlNotSetError("play")},videoPlay:function(){this.play()},pause:function(a){a="number"===typeof a?a:NaN;this.status.srcSet?this.html.active?this._html_pause(a):this.flash.active&&this._flash_pause(a):this._urlNotSetError("pause")},pauseOthers:function(){var a=this;b.each(this.instances,function(b,d){a.element!==d&&d.data("jPlayer").status.srcSet&&d.jPlayer("pause")})},stop:function(){this.status.srcSet?this.html.active?this._html_pause(0):this.flash.active&&
this._flash_pause(0):this._urlNotSetError("stop")},playHead:function(a){a=this._limitValue(a,0,100);this.status.srcSet?this.html.active?this._html_playHead(a):this.flash.active&&this._flash_playHead(a):this._urlNotSetError("playHead")},_muted:function(a){this.options.muted=a;this.html.used&&this._html_mute(a);this.flash.used&&this._flash_mute(a);!this.html.video.gate&&!this.html.audio.gate&&(this._updateMute(a),this._updateVolume(this.options.volume),this._trigger(b.jPlayer.event.volumechange))},
mute:function(a){a=a===f?!0:!!a;this._muted(a)},unmute:function(a){a=a===f?!0:!!a;this._muted(!a)},_updateMute:function(a){a===f&&(a=this.options.muted);this.css.jq.mute.length&&this.css.jq.unmute.length&&(this.status.noVolume?(this.css.jq.mute.hide(),this.css.jq.unmute.hide()):a?(this.css.jq.mute.hide(),this.css.jq.unmute.show()):(this.css.jq.mute.show(),this.css.jq.unmute.hide()))},volume:function(a){a=this._limitValue(a,0,1);this.options.volume=a;this.html.used&&this._html_volume(a);this.flash.used&&
this._flash_volume(a);!this.html.video.gate&&!this.html.audio.gate&&(this._updateVolume(a),this._trigger(b.jPlayer.event.volumechange))},volumeBar:function(a){if(this.css.jq.volumeBar.length){var c=b(a.currentTarget),d=c.offset(),e=a.pageX-d.left,g=c.width();a=c.height()-a.pageY+d.top;c=c.height();this.options.verticalVolume?this.volume(a/c):this.volume(e/g)}this.options.muted&&this._muted(!1)},volumeBarValue:function(){},_updateVolume:function(a){a===f&&(a=this.options.volume);a=this.options.muted?
0:a;this.status.noVolume?(this.css.jq.volumeBar.length&&this.css.jq.volumeBar.hide(),this.css.jq.volumeBarValue.length&&this.css.jq.volumeBarValue.hide(),this.css.jq.volumeMax.length&&this.css.jq.volumeMax.hide()):(this.css.jq.volumeBar.length&&this.css.jq.volumeBar.show(),this.css.jq.volumeBarValue.length&&(this.css.jq.volumeBarValue.show(),this.css.jq.volumeBarValue[this.options.verticalVolume?"height":"width"](100*a+"%")),this.css.jq.volumeMax.length&&this.css.jq.volumeMax.show())},volumeMax:function(){this.volume(1);
this.options.muted&&this._muted(!1)},_cssSelectorAncestor:function(a){var c=this;this.options.cssSelectorAncestor=a;this._removeUiClass();this.ancestorJq=a?b(a):[];a&&1!==this.ancestorJq.length&&this._warning({type:b.jPlayer.warning.CSS_SELECTOR_COUNT,context:a,message:b.jPlayer.warningMsg.CSS_SELECTOR_COUNT+this.ancestorJq.length+" found for cssSelectorAncestor.",hint:b.jPlayer.warningHint.CSS_SELECTOR_COUNT});this._addUiClass();b.each(this.options.cssSelector,function(a,b){c._cssSelector(a,b)});
this._updateInterface();this._updateButtons();this._updateAutohide();this._updateVolume();this._updateMute()},_cssSelector:function(a,c){var d=this;"string"===typeof c?b.jPlayer.prototype.options.cssSelector[a]?(this.css.jq[a]&&this.css.jq[a].length&&this.css.jq[a].unbind(".jPlayer"),this.options.cssSelector[a]=c,this.css.cs[a]=this.options.cssSelectorAncestor+" "+c,this.css.jq[a]=c?b(this.css.cs[a]):[],this.css.jq[a].length&&this.css.jq[a].bind("click.jPlayer",function(c){c.preventDefault();d[a](c);
b(this).blur()}),c&&1!==this.css.jq[a].length&&this._warning({type:b.jPlayer.warning.CSS_SELECTOR_COUNT,context:this.css.cs[a],message:b.jPlayer.warningMsg.CSS_SELECTOR_COUNT+this.css.jq[a].length+" found for "+a+" method.",hint:b.jPlayer.warningHint.CSS_SELECTOR_COUNT})):this._warning({type:b.jPlayer.warning.CSS_SELECTOR_METHOD,context:a,message:b.jPlayer.warningMsg.CSS_SELECTOR_METHOD,hint:b.jPlayer.warningHint.CSS_SELECTOR_METHOD}):this._warning({type:b.jPlayer.warning.CSS_SELECTOR_STRING,context:c,
message:b.jPlayer.warningMsg.CSS_SELECTOR_STRING,hint:b.jPlayer.warningHint.CSS_SELECTOR_STRING})},seekBar:function(a){if(this.css.jq.seekBar.length){var c=b(a.currentTarget),d=c.offset();a=a.pageX-d.left;c=c.width();this.playHead(100*a/c)}},playBar:function(){},repeat:function(){this._loop(!0)},repeatOff:function(){this._loop(!1)},_loop:function(a){this.options.loop!==a&&(this.options.loop=a,this._updateButtons(),this._trigger(b.jPlayer.event.repeat))},currentTime:function(){},duration:function(){},
gui:function(){},noSolution:function(){},option:function(a,c){var d=a;if(0===arguments.length)return b.extend(!0,{},this.options);if("string"===typeof a){var e=a.split(".");if(c===f){for(var d=b.extend(!0,{},this.options),g=0;g<e.length;g++)if(d[e[g]]!==f)d=d[e[g]];else return this._warning({type:b.jPlayer.warning.OPTION_KEY,context:a,message:b.jPlayer.warningMsg.OPTION_KEY,hint:b.jPlayer.warningHint.OPTION_KEY}),f;return d}for(var g=d={},h=0;h<e.length;h++)h<e.length-1?(g[e[h]]={},g=g[e[h]]):g[e[h]]=
c}this._setOptions(d);return this},_setOptions:function(a){var c=this;b.each(a,function(a,b){c._setOption(a,b)});return this},_setOption:function(a,c){var d=this;switch(a){case "volume":this.volume(c);break;case "muted":this._muted(c);break;case "cssSelectorAncestor":this._cssSelectorAncestor(c);break;case "cssSelector":b.each(c,function(a,b){d._cssSelector(a,b)});break;case "fullScreen":if(this.options[a]!==c){var e=b.jPlayer.nativeFeatures.fullscreen.used.webkitVideo;if(!e||e&&!this.status.waitForPlay)e||
(this.options[a]=c),c?this._requestFullscreen():this._exitFullscreen(),e||this._setOption("fullWindow",c)}break;case "fullWindow":this.options[a]!==c&&(this._removeUiClass(),this.options[a]=c,this._refreshSize());break;case "size":!this.options.fullWindow&&this.options[a].cssClass!==c.cssClass&&this._removeUiClass();this.options[a]=b.extend({},this.options[a],c);this._refreshSize();break;case "sizeFull":this.options.fullWindow&&this.options[a].cssClass!==c.cssClass&&this._removeUiClass();this.options[a]=
b.extend({},this.options[a],c);this._refreshSize();break;case "autohide":this.options[a]=b.extend({},this.options[a],c);this._updateAutohide();break;case "loop":this._loop(c);break;case "nativeVideoControls":this.options[a]=b.extend({},this.options[a],c);this.status.nativeVideoControls=this._uaBlocklist(this.options.nativeVideoControls);this._restrictNativeVideoControls();this._updateNativeVideoControls();break;case "noFullWindow":this.options[a]=b.extend({},this.options[a],c);this.status.nativeVideoControls=
this._uaBlocklist(this.options.nativeVideoControls);this.status.noFullWindow=this._uaBlocklist(this.options.noFullWindow);this._restrictNativeVideoControls();this._updateButtons();break;case "noVolume":this.options[a]=b.extend({},this.options[a],c);this.status.noVolume=this._uaBlocklist(this.options.noVolume);this._updateVolume();this._updateMute();break;case "emulateHtml":this.options[a]!==c&&((this.options[a]=c)?this._emulateHtmlBridge():this._destroyHtmlBridge());break;case "timeFormat":this.options[a]=
b.extend({},this.options[a],c);break;case "keyEnabled":this.options[a]=c;!c&&this===b.jPlayer.focus&&(b.jPlayer.focus=null);break;case "keyBindings":this.options[a]=b.extend(!0,{},this.options[a],c);break;case "audioFullScreen":this.options[a]=c}return this},_refreshSize:function(){this._setSize();this._addUiClass();this._updateSize();this._updateButtons();this._updateAutohide();this._trigger(b.jPlayer.event.resize)},_setSize:function(){this.options.fullWindow?(this.status.width=this.options.sizeFull.width,
this.status.height=this.options.sizeFull.height,this.status.cssClass=this.options.sizeFull.cssClass):(this.status.width=this.options.size.width,this.status.height=this.options.size.height,this.status.cssClass=this.options.size.cssClass);this.element.css({width:this.status.width,height:this.status.height})},_addUiClass:function(){this.ancestorJq.length&&this.ancestorJq.addClass(this.status.cssClass)},_removeUiClass:function(){this.ancestorJq.length&&this.ancestorJq.removeClass(this.status.cssClass)},
_updateSize:function(){this.internal.poster.jq.css({width:this.status.width,height:this.status.height});!this.status.waitForPlay&&this.html.active&&this.status.video||this.html.video.available&&this.html.used&&this.status.nativeVideoControls?this.internal.video.jq.css({width:this.status.width,height:this.status.height}):!this.status.waitForPlay&&(this.flash.active&&this.status.video)&&this.internal.flash.jq.css({width:this.status.width,height:this.status.height})},_updateAutohide:function(){var a=
this,b=function(){a.css.jq.gui.fadeIn(a.options.autohide.fadeIn,function(){clearTimeout(a.internal.autohideId);a.internal.autohideId=setTimeout(function(){a.css.jq.gui.fadeOut(a.options.autohide.fadeOut)},a.options.autohide.hold)})};this.css.jq.gui.length&&(this.css.jq.gui.stop(!0,!0),clearTimeout(this.internal.autohideId),this.element.unbind(".jPlayerAutohide"),this.css.jq.gui.unbind(".jPlayerAutohide"),this.status.nativeVideoControls?this.css.jq.gui.hide():this.options.fullWindow&&this.options.autohide.full||
!this.options.fullWindow&&this.options.autohide.restored?(this.element.bind("mousemove.jPlayer.jPlayerAutohide",b),this.css.jq.gui.bind("mousemove.jPlayer.jPlayerAutohide",b),this.css.jq.gui.hide()):this.css.jq.gui.show())},fullScreen:function(){this._setOption("fullScreen",!0)},restoreScreen:function(){this._setOption("fullScreen",!1)},_fullscreenAddEventListeners:function(){var a=this,c=b.jPlayer.nativeFeatures.fullscreen;c.api.fullscreenEnabled&&c.event.fullscreenchange&&("function"!==typeof this.internal.fullscreenchangeHandler&&
(this.internal.fullscreenchangeHandler=function(){a._fullscreenchange()}),document.addEventListener(c.event.fullscreenchange,this.internal.fullscreenchangeHandler,!1))},_fullscreenRemoveEventListeners:function(){var a=b.jPlayer.nativeFeatures.fullscreen;this.internal.fullscreenchangeHandler&&document.addEventListener(a.event.fullscreenchange,this.internal.fullscreenchangeHandler,!1)},_fullscreenchange:function(){this.options.fullScreen&&!b.jPlayer.nativeFeatures.fullscreen.api.fullscreenElement()&&
this._setOption("fullScreen",!1)},_requestFullscreen:function(){var a=this.ancestorJq.length?this.ancestorJq[0]:this.element[0],c=b.jPlayer.nativeFeatures.fullscreen;c.used.webkitVideo&&(a=this.htmlElement.video);c.api.fullscreenEnabled&&c.api.requestFullscreen(a)},_exitFullscreen:function(){var a=b.jPlayer.nativeFeatures.fullscreen,c;a.used.webkitVideo&&(c=this.htmlElement.video);a.api.fullscreenEnabled&&a.api.exitFullscreen(c)},_html_initMedia:function(a){var c=b(this.htmlElement.media).empty();
b.each(a.track||[],function(a,b){var g=document.createElement("track");g.setAttribute("kind",b.kind?b.kind:"");g.setAttribute("src",b.src?b.src:"");g.setAttribute("srclang",b.srclang?b.srclang:"");g.setAttribute("label",b.label?b.label:"");b.def&&g.setAttribute("default",b.def);c.append(g)});this.htmlElement.media.src=this.status.src;"none"!==this.options.preload&&this._html_load();this._trigger(b.jPlayer.event.timeupdate)},_html_setFormat:function(a){var c=this;b.each(this.formats,function(b,e){if(c.html.support[e]&&
a[e])return c.status.src=a[e],c.status.format[e]=!0,c.status.formatType=e,!1})},_html_setAudio:function(a){this._html_setFormat(a);this.htmlElement.media=this.htmlElement.audio;this._html_initMedia(a)},_html_setVideo:function(a){this._html_setFormat(a);this.status.nativeVideoControls&&(this.htmlElement.video.poster=this._validString(a.poster)?a.poster:"");this.htmlElement.media=this.htmlElement.video;this._html_initMedia(a)},_html_resetMedia:function(){this.htmlElement.media&&(this.htmlElement.media.id===
this.internal.video.id&&!this.status.nativeVideoControls&&this.internal.video.jq.css({width:"0px",height:"0px"}),this.htmlElement.media.pause())},_html_clearMedia:function(){this.htmlElement.media&&(this.htmlElement.media.src="about:blank",this.htmlElement.media.load())},_html_load:function(){this.status.waitForLoad&&(this.status.waitForLoad=!1,this.htmlElement.media.load());clearTimeout(this.internal.htmlDlyCmdId)},_html_play:function(a){var b=this,d=this.htmlElement.media;this._html_load();if(isNaN(a))d.play();
else{this.internal.cmdsIgnored&&d.play();try{if(!d.seekable||"object"===typeof d.seekable&&0<d.seekable.length)d.currentTime=a,d.play();else throw 1;}catch(e){this.internal.htmlDlyCmdId=setTimeout(function(){b.play(a)},250);return}}this._html_checkWaitForPlay()},_html_pause:function(a){var b=this,d=this.htmlElement.media;0<a?this._html_load():clearTimeout(this.internal.htmlDlyCmdId);d.pause();if(!isNaN(a))try{if(!d.seekable||"object"===typeof d.seekable&&0<d.seekable.length)d.currentTime=a;else throw 1;
}catch(e){this.internal.htmlDlyCmdId=setTimeout(function(){b.pause(a)},250);return}0<a&&this._html_checkWaitForPlay()},_html_playHead:function(a){var b=this,d=this.htmlElement.media;this._html_load();try{if("object"===typeof d.seekable&&0<d.seekable.length)d.currentTime=a*d.seekable.end(d.seekable.length-1)/100;else if(0<d.duration&&!isNaN(d.duration))d.currentTime=a*d.duration/100;else throw"e";}catch(e){this.internal.htmlDlyCmdId=setTimeout(function(){b.playHead(a)},250);return}this.status.waitForLoad||
this._html_checkWaitForPlay()},_html_checkWaitForPlay:function(){this.status.waitForPlay&&(this.status.waitForPlay=!1,this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide(),this.status.video&&(this.internal.poster.jq.hide(),this.internal.video.jq.css({width:this.status.width,height:this.status.height})))},_html_volume:function(a){this.html.audio.available&&(this.htmlElement.audio.volume=a);this.html.video.available&&(this.htmlElement.video.volume=a)},_html_mute:function(a){this.html.audio.available&&
(this.htmlElement.audio.muted=a);this.html.video.available&&(this.htmlElement.video.muted=a)},_flash_setAudio:function(a){var c=this;try{b.each(this.formats,function(b,d){if(c.flash.support[d]&&a[d]){switch(d){case "m4a":case "fla":c._getMovie().fl_setAudio_m4a(a[d]);break;case "mp3":c._getMovie().fl_setAudio_mp3(a[d]);break;case "rtmpa":c._getMovie().fl_setAudio_rtmp(a[d])}c.status.src=a[d];c.status.format[d]=!0;c.status.formatType=d;return!1}}),"auto"===this.options.preload&&(this._flash_load(),
this.status.waitForLoad=!1)}catch(d){this._flashError(d)}},_flash_setVideo:function(a){var c=this;try{b.each(this.formats,function(b,d){if(c.flash.support[d]&&a[d]){switch(d){case "m4v":case "flv":c._getMovie().fl_setVideo_m4v(a[d]);break;case "rtmpv":c._getMovie().fl_setVideo_rtmp(a[d])}c.status.src=a[d];c.status.format[d]=!0;c.status.formatType=d;return!1}}),"auto"===this.options.preload&&(this._flash_load(),this.status.waitForLoad=!1)}catch(d){this._flashError(d)}},_flash_resetMedia:function(){this.internal.flash.jq.css({width:"0px",
height:"0px"});this._flash_pause(NaN)},_flash_clearMedia:function(){try{this._getMovie().fl_clearMedia()}catch(a){this._flashError(a)}},_flash_load:function(){try{this._getMovie().fl_load()}catch(a){this._flashError(a)}this.status.waitForLoad=!1},_flash_play:function(a){try{this._getMovie().fl_play(a)}catch(b){this._flashError(b)}this.status.waitForLoad=!1;this._flash_checkWaitForPlay()},_flash_pause:function(a){try{this._getMovie().fl_pause(a)}catch(b){this._flashError(b)}0<a&&(this.status.waitForLoad=
!1,this._flash_checkWaitForPlay())},_flash_playHead:function(a){try{this._getMovie().fl_play_head(a)}catch(b){this._flashError(b)}this.status.waitForLoad||this._flash_checkWaitForPlay()},_flash_checkWaitForPlay:function(){this.status.waitForPlay&&(this.status.waitForPlay=!1,this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide(),this.status.video&&(this.internal.poster.jq.hide(),this.internal.flash.jq.css({width:this.status.width,height:this.status.height})))},_flash_volume:function(a){try{this._getMovie().fl_volume(a)}catch(b){this._flashError(b)}},
_flash_mute:function(a){try{this._getMovie().fl_mute(a)}catch(b){this._flashError(b)}},_getMovie:function(){return document[this.internal.flash.id]},_getFlashPluginVersion:function(){var a=0,b;if(window.ActiveXObject)try{if(b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")){var d=b.GetVariable("$version");d&&(d=d.split(" ")[1].split(","),a=parseInt(d[0],10)+"."+parseInt(d[1],10))}}catch(e){}else navigator.plugins&&0<navigator.mimeTypes.length&&(b=navigator.plugins["Shockwave Flash"])&&(a=navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/,
"$1"));return 1*a},_checkForFlash:function(a){var b=!1;this._getFlashPluginVersion()>=a&&(b=!0);return b},_validString:function(a){return a&&"string"===typeof a},_limitValue:function(a,b,d){return a<b?b:a>d?d:a},_urlNotSetError:function(a){this._error({type:b.jPlayer.error.URL_NOT_SET,context:a,message:b.jPlayer.errorMsg.URL_NOT_SET,hint:b.jPlayer.errorHint.URL_NOT_SET})},_flashError:function(a){var c;c=this.internal.ready?"FLASH_DISABLED":"FLASH";this._error({type:b.jPlayer.error[c],context:this.internal.flash.swf,
message:b.jPlayer.errorMsg[c]+a.message,hint:b.jPlayer.errorHint[c]});this.internal.flash.jq.css({width:"1px",height:"1px"})},_error:function(a){this._trigger(b.jPlayer.event.error,a);this.options.errorAlerts&&this._alert("Error!"+(a.message?"\n\n"+a.message:"")+(a.hint?"\n\n"+a.hint:"")+"\n\nContext: "+a.context)},_warning:function(a){this._trigger(b.jPlayer.event.warning,f,a);this.options.warningAlerts&&this._alert("Warning!"+(a.message?"\n\n"+a.message:"")+(a.hint?"\n\n"+a.hint:"")+"\n\nContext: "+
a.context)},_alert:function(a){alert("jPlayer "+this.version.script+" : id='"+this.internal.self.id+"' : "+a)},_emulateHtmlBridge:function(){var a=this;b.each(b.jPlayer.emulateMethods.split(/\s+/g),function(b,d){a.internal.domNode[d]=function(b){a[d](b)}});b.each(b.jPlayer.event,function(c,d){var e=!0;b.each(b.jPlayer.reservedEvent.split(/\s+/g),function(a,b){if(b===c)return e=!1});e&&a.element.bind(d+".jPlayer.jPlayerHtml",function(){a._emulateHtmlUpdate();var b=document.createEvent("Event");b.initEvent(c,
!1,!0);a.internal.domNode.dispatchEvent(b)})})},_emulateHtmlUpdate:function(){var a=this;b.each(b.jPlayer.emulateStatus.split(/\s+/g),function(b,d){a.internal.domNode[d]=a.status[d]});b.each(b.jPlayer.emulateOptions.split(/\s+/g),function(b,d){a.internal.domNode[d]=a.options[d]})},_destroyHtmlBridge:function(){var a=this;this.element.unbind(".jPlayerHtml");b.each((b.jPlayer.emulateMethods+" "+b.jPlayer.emulateStatus+" "+b.jPlayer.emulateOptions).split(/\s+/g),function(b,d){delete a.internal.domNode[d]})}};
b.jPlayer.error={FLASH:"e_flash",FLASH_DISABLED:"e_flash_disabled",NO_SOLUTION:"e_no_solution",NO_SUPPORT:"e_no_support",URL:"e_url",URL_NOT_SET:"e_url_not_set",VERSION:"e_version"};b.jPlayer.errorMsg={FLASH:"jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ",FLASH_DISABLED:"jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: ",NO_SOLUTION:"No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",
NO_SUPPORT:"It is not possible to play any media format provided in setMedia() on this browser using your current options.",URL:"Media URL could not be loaded.",URL_NOT_SET:"Attempt to issue media playback commands, while no media url is set.",VERSION:"jPlayer "+b.jPlayer.prototype.version.script+" needs Jplayer.swf version "+b.jPlayer.prototype.version.needFlash+" but found "};b.jPlayer.errorHint={FLASH:"Check your swfPath option and that Jplayer.swf is there.",FLASH_DISABLED:"Check that you have not display:none; the jPlayer entity or any ancestor.",
NO_SOLUTION:"Review the jPlayer options: support and supplied.",NO_SUPPORT:"Video or audio formats defined in the supplied option are missing.",URL:"Check media URL is valid.",URL_NOT_SET:"Use setMedia() to set the media URL.",VERSION:"Update jPlayer files."};b.jPlayer.warning={CSS_SELECTOR_COUNT:"e_css_selector_count",CSS_SELECTOR_METHOD:"e_css_selector_method",CSS_SELECTOR_STRING:"e_css_selector_string",OPTION_KEY:"e_option_key"};b.jPlayer.warningMsg={CSS_SELECTOR_COUNT:"The number of css selectors found did not equal one: ",
CSS_SELECTOR_METHOD:"The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",CSS_SELECTOR_STRING:"The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",OPTION_KEY:"The option requested in jPlayer('option') is undefined."};b.jPlayer.warningHint={CSS_SELECTOR_COUNT:"Check your css selector and the ancestor.",CSS_SELECTOR_METHOD:"Check your method name.",CSS_SELECTOR_STRING:"Check your css selector is a string.",OPTION_KEY:"Check your option name."}});
/*
 * This source code is licensed under version 3 of the AGPL.
 *
 * Copyright (c) 2013 by urturn
 *
 * Addendum to the license AGPL-3:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Namespace of the Webdoc public API.
 */
var UT = {},
    WD = UT;

/**
 * i18nJs
 */

i18n = window.i18n || {};
__I18N__DEFAULT = 'en';


/**
 * Load a local dictionary
 * @param  {[type]} locale local code
 * @param  {[type]} data   dictionary
 */
i18n.load = function(locale, data) {
  this.data = this.data || {};
  
  var localeData = this.data[locale];
  if (localeData) {
    for (var key in localeData) {
      if (!data[key]) {
        data[key] = localeData[key];
      }
    }
  }
  this.data[locale] = data;
};

i18n.getLocale = function() {
  return this.locale || __I18N__DEFAULT;
};

i18n.setLocale = function(locale) {
  this.locale = locale;
};

i18n.get = function(key) {
  var locale = this.getLocale();

  if (this.data[locale] && this.data[locale][key]) {
    return this.data[locale][key];
  }
  else if (this.data[__I18N__DEFAULT]  && this.data[__I18N__DEFAULT][key]) {
    return this.data[__I18N__DEFAULT][key];
  }
  else {
    return key;
  }
};

/**
 * Locale for pluggins
 */


/**
 * German
 */

i18n.load('ar', {
  'add_image' : 'Add image',
  'add_sound' : 'Add sound',
  'add_video' : 'Add video',
  'edit'      : 'تحرير',
  'remove'    : 'حذف',
  'rotate'    : 'Rotate',
  'resize'    : 'Resize',
  'error'     : 'Error occurred',
  'error_timeout_sound' : "We can't get data to play this track in 15 sec",
  'error_nolibrary_sound' : "Sound Player !!! The library not found."
});

/**
 * German
 */

i18n.load('de', {
  'add_image' : 'Add image',
  'add_sound' : 'Add sound',
  'add_video' : 'Add video',
  'edit'      : 'Bearbeiten',
  'remove'    : 'Löschen',
  'rotate'    : 'Rotate',
  'resize'    : 'Resize',
  'error'     : 'Error occurred',
  'error_timeout_sound' : "We can't get data to play this track in 15 sec",
  'error_nolibrary_sound' : "Sound Player !!! The library not found."
});


i18n.load('en', {
  'add_image' : 'Add image',
  'add_sound' : 'Add sound',
  'add_video' : 'Add video',
  'edit'      : 'Edit',
  'remove'    : 'Remove',
  'rotate'    : 'Rotate',
  'resize'    : 'Resize',
  'error'     : 'Error occurred',
  'error_timeout_sound' : "We can't get data to play this track in 15 sec",
  'error_nolibrary_sound' : "Sound Player !!! The library not found."
});

/**
 * German
 */

i18n.load('es', {
  'add_image' : 'Add image',
  'add_sound' : 'Add sound',
  'add_video' : 'Add video',
  'edit'      : 'Editar',
  'remove'    : 'Eliminar',
  'rotate'    : 'Rotate',
  'resize'    : 'Resize',
  'error'     : 'Error occurred',
  'error_timeout_sound' : "We can't get data to play this track in 15 sec",
  'error_nolibrary_sound' : "Sound Player !!! The library not found."
});

/**
 * German
 */

i18n.load('fr', {
  'add_image' : 'Add image',
  'add_sound' : 'Add sound',
  'add_video' : 'Add video',
  'edit'      : 'Editer',
  'remove'    : 'Supprimer',
  'rotate'    : 'Rotate',
  'resize'    : 'Resize',
  'error'     : 'Error occurred',
  'error_timeout_sound' : "We can't get data to play this track in 15 sec",
  'error_nolibrary_sound' : "Sound Player !!! The library not found."
});

/**
 * German
 */

i18n.load('hi', {
  'add_image' : 'Add image',
  'add_sound' : 'Add sound',
  'add_video' : 'Add video',
  'edit'      : 'संपादित करें',
  'remove'    : 'हटाएँ',
  'rotate'    : 'Rotate',
  'resize'    : 'Resize',
  'error'     : 'Error occurred',
  'error_timeout_sound' : "We can't get data to play this track in 15 sec",
  'error_nolibrary_sound' : "Sound Player !!! The library not found."
});

/**
 * German
 */

i18n.load('it', {
  'add_image' : 'Add image',
  'add_sound' : 'Add sound',
  'add_video' : 'Add video',
  'edit'      : 'Modifica',
  'remove'    : 'Cancella',
  'rotate'    : 'Rotate',
  'resize'    : 'Resize',
  'error'     : 'Error occurred',
  'error_timeout_sound' : "We can't get data to play this track in 15 sec",
  'error_nolibrary_sound' : "Sound Player !!! The library not found."
});

/**
 * German
 */

i18n.load('nl', {
  'add_image' : 'Add image',
  'add_sound' : 'Add sound',
  'add_video' : 'Add video',
  'edit'      : 'Bewerken',
  'remove'    : 'Verwijderen',
  'rotate'    : 'Rotate',
  'resize'    : 'Resize',
  'error'     : 'Error occurred',
  'error_timeout_sound' : "We can't get data to play this track in 15 sec",
  'error_nolibrary_sound' : "Sound Player !!! The library not found."
});

/**
 * German
 */

i18n.load('pt', {
  'add_image' : 'Add image',
  'add_sound' : 'Add sound',
  'add_video' : 'Add video',
  'edit'      : 'Editar',
  'remove'    : 'Apagar',
  'rotate'    : 'Rotate',
  'resize'    : 'Resize',
  'error'     : 'Error occurred',
  'error_timeout_sound' : "We can't get data to play this track in 15 sec",
  'error_nolibrary_sound' : "Sound Player !!! The library not found."
});

/**
 * German
 */

i18n.load('ru', {
  'add_image' : 'Add image',
  'add_sound' : 'Add sound',
  'add_video' : 'Add video',
  'edit'      : 'Редактировать',
  'remove'    : 'Удалить',
  'rotate'    : 'Rotate',
  'resize'    : 'Resize',
  'error'     : 'Error occurred',
  'error_timeout_sound' : "We can't get data to play this track in 15 sec",
  'error_nolibrary_sound' : "Sound Player !!! The library not found."
});

/**
 * German
 */

i18n.load('th', {
  'add_image' : 'Add image',
  'add_sound' : 'Add sound',
  'add_video' : 'Add video',
  'edit'      : 'แก้ไข',
  'remove'    : 'ลบ',
  'rotate'    : 'Rotate',
  'resize'    : 'Resize',
  'error'     : 'Error occurred',
  'error_timeout_sound' : "We can't get data to play this track in 15 sec",
  'error_nolibrary_sound' : "Sound Player !!! The library not found."
});

/**
 * German
 */

i18n.load('zh', {
  'add_image' : 'Add image',
  'add_sound' : 'Add sound',
  'add_video' : 'Add video',
  'edit'      : '编辑',
  'remove'    : '删除',
  'rotate'    : 'Rotate',
  'resize'    : 'Resize',
  'error'     : 'Error occurred',
  'error_timeout_sound' : "We can't get data to play this track in 15 sec",
  'error_nolibrary_sound' : "Sound Player !!! The library not found."
});

// Generate Random UUID compliant with rfc4122 v4
// Fantastic piece of code from @broofa on:
// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
UT.uuid = function(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

UT.UUID = UT.uuid;
/**
 * Add Support to IE GEt/Set
 */
(function() {
  "use strict";
  try {
    if(!Object.prototype.__defineGetter__ && Object.defineProperty({}, "x", {
      get: function() {
        return true;
      }
    }).x) {
      Object.defineProperty(Object.prototype, "__defineGetter__", {
        enumerable: false,
        configurable: true,
        value: function(name, func) {
          Object.defineProperty(this, name, {
            get: func,
            enumerable: true,
            configurable: true
          });
        }
      });
      Object.defineProperty(Object.prototype, "__defineSetter__", {
        enumerable: false,
        configurable: true,
        value: function(name, func) {
          Object.defineProperty(this, name, {
            set: func,
            enumerable: true,
            configurable: true
          });
        }
      });
    }
  } catch(defPropException) { /* can't define __defineGetter__ and __defineSetter__. Certainly ie < 8*/
    throw new Error('Simple Storage API not Supported');
  }
}());

/**
 * Fix touch events with text input on iOS
 */
/**
 * Fix touch events with text input on iOS
 */
UT.touchEventFix = (function (global, isIframe) {
  "use strict";
  //Test if it is an iOS device and that we may swap the implementation
  if (!/(iPad|iPhone|iPod)/g.test(global.navigator.userAgent) || !Element.prototype.addEventListener) {
    return null;
  }

  var nativeAddEventListener = global.Element.prototype.addEventListener,
    nativeRemoveEventListener = global.Element.prototype.removeEventListener,
    uuid = 0,
    eventListeners = {},
    returnObj,
    touchEventsEnabled = true,
    debug = false;

  //Run the tweak
  swapEventListenerImplementation();

  //Default behaviour
  enableCapture();

  // log helpers
  var log = function(arg) {
    if (debug) {
      console.log(arg);
    }
  };
  var group = function(arg) {
    return debug && global.console && global.console.group && global.console.group(arg);
  };
  var groupEnd = function() {
    return debug && global.console && global.console.groupEnd && global.console.groupEnd();
  };

  function swapEventListenerImplementation() {
    var newAddEventListener = function () {
      var type = arguments[0],
        listener = arguments[1],
        shouldAddListener = true;

      if ((type === 'touchstart' || type === 'touchend' || type === 'touchcancel' || type === 'touchmove' || type === 'touchleave') &&
        typeof listener === 'function') {
        if (touchEventsEnabled) {
          this.__UT__uuid = this.__UT__uuid || getUUID();
          eventListeners[this.__UT__uuid] = eventListeners[this.__UT__uuid] || {};
          eventListeners[this.__UT__uuid][type] = {
            node: this,
            callback: listener
          };
        } else {
          shouldAddListener = false;
        }
      }

      log("_");
      log("->> Called addEventListener, type: " + type + ", in iframe: " + isIframe + ", will be added: " + shouldAddListener);

      if (shouldAddListener) {
        nativeAddEventListener.apply(this, arguments);
      }
    };

    var newRemoveEventListener = function () {
      var type = arguments[0],
        listener = arguments[1];

      if ((type === 'touchstart' || type === 'touchend' || type === 'touchcancel' || type === 'touchmove' || type === 'touchleave') &&
        typeof listener === 'function') {
        if (eventListeners[this.__UT__uuid] && eventListeners[this.__UT__uuid][type]) {
          delete eventListeners[this.__UT__uuid][type];
        }
      }

      nativeRemoveEventListener.apply(this, arguments);
    };

    global.Element.prototype.addEventListener = newAddEventListener;
    global.Element.prototype.removeEventListener = newRemoveEventListener;
    global.document.addEventListener = newAddEventListener;
    global.document.removeEventListener = newRemoveEventListener;
  }

  //Not public for now

  function restoreEventListenerImplementation() {
    global.Element.prototype.addEventListener = nativeAddEventListener;
    global.Element.prototype.removeEventListener = nativeRemoveEventListener;
    global.document.addEventListener = nativeAddEventListener;
    global.document.removeEventListener = nativeRemoveEventListener;
  }

  function onFocus(event) {
    if (global.document.activeElement.nodeName == 'TEXTAREA' ||
      global.document.activeElement.nodeName == 'INPUT' ||
      global.document.activeElement.getAttribute('contenteditable')) {
      disableTouchEvents();
    }
  }

  function enableTouchEvents() {
    var obj1, obj2, obj3, obj4, obj5;

    touchEventsEnabled = true;
    log("->> enableTouchEvents");

    if (isIframe) {
      global.top.postMessage('"touchevents-enable"', "*");
    }

    for (var key in eventListeners) {
      if (eventListeners.hasOwnProperty(key)) {
        obj1 = eventListeners[key].touchstart;
        obj2 = eventListeners[key].touchend;
        obj3 = eventListeners[key].touchcancel;
        obj4 = eventListeners[key].touchmove;
        obj5 = eventListeners[key].touchleave;

        if (obj1) {
          nativeAddEventListener.call(obj1.node, 'touchstart', obj1.callback, false);
        }
        if (obj2) {
          nativeAddEventListener.call(obj2.node, 'touchend', obj2.callback, false);
        }
        if (obj3) {
          nativeAddEventListener.call(obj3.node, 'touchcancel', obj3.callback, false);
        }
        if (obj4) {
          nativeAddEventListener.call(obj4.node, 'touchmove', obj4.callback, false);
        }
        if (obj5) {
          nativeAddEventListener.call(obj5.node, 'touchleave', obj5.callback, false);
        }
      }
    }
  }

  function disableTouchEvents() {
    var obj1, obj2, obj3, obj4, obj5;
    touchEventsEnabled = false;

    log("->> disableTouchEvents");

    if (isIframe) {
      global.top.postMessage('"touchevents-disable"', "*");
    }

    for (var key in eventListeners) {
      if (eventListeners.hasOwnProperty(key)) {
        obj1 = eventListeners[key].touchstart;
        obj2 = eventListeners[key].touchend;
        obj3 = eventListeners[key].touchcancel;
        obj4 = eventListeners[key].touchmove;
        obj5 = eventListeners[key].touchleave;

        if (obj1) {
          nativeRemoveEventListener.call(obj1.node, 'touchstart', obj1.callback, false);
        }
        if (obj2) {
          nativeRemoveEventListener.call(obj2.node, 'touchend', obj2.callback, false);
        }
        if (obj3) {
          nativeRemoveEventListener.call(obj3.node, 'touchcancel', obj3.callback, false);
        }
        if (obj4) {
          nativeRemoveEventListener.call(obj4.node, 'touchmove', obj4.callback, false);
        }
        if (obj5) {
          nativeRemoveEventListener.call(obj5.node, 'touchleave', obj5.callback, false);
        }
      }
    }
  }

  function enableCapture() {
    if (isIframe) {
      nativeAddEventListener.call(global.document, 'focus', onFocus, true);
      nativeAddEventListener.call(global.document, 'blur', enableTouchEvents, true);
    }
    global.addEventListener("message", didReceiveMessage, true);
  }

  function disableCapture() {
    if (isIframe) {
      nativeRemoveEventListener.call(global.document, 'focus', onFocus, true);
      nativeRemoveEventListener.call(global.document, 'blur', enableTouchEvents, true);
    }
    global.removeEventListener("message", didReceiveMessage, true);
  }

  function didReceiveMessage(event) {
    log("didReceiveMessage" + " " + event.data);

    if (event.data === "touchevents-enable") {
      enableTouchEvents();
    } else if (event.data === "touchevents-disable") {
      disableTouchEvents();
    }
  }

  function getUUID() {
    return parseInt(uuid++,10);
  }

  function getEventListenersDescription() {
    console.group("EventListeners description:");

    for (var key in eventListeners) {
      console.group("%s:", key);

      if (eventListeners.hasOwnProperty(key)) {
        log(eventListeners[key]);
      }

      console.groupEnd();
    }

    console.groupEnd();
  }

  returnObj = {
    enableCapture: enableCapture,
    disableCapture: disableCapture,
    enableTouchEvents: enableTouchEvents,
    disableTouchEvents: disableTouchEvents,
    getEventListenersDescription: getEventListenersDescription,
    didReceiveMessage : didReceiveMessage
  };

  return returnObj;
}(window, true));

__STACK_JQUERY_JS = null;

; (function(UT, window, document, undefined){
  "use strict";
  /**
   * valid options keys: data, delegate, currentUserId
   */
  UT.Collection = function(options) {
    var self = this;
    // PRIVATE Properties
    var currentUserId, delegate, data,
        items, cached_items,
        keys, dirtyKeys, boundKeys, count,
        operations;

    // PUBLIC Properties
    this.length = 0; // loded items count
    this.name = null;
    this.isPublic = function isPublic(){
      return false;
    };

    // Add or updated an item binded to a specific key
    var setItem = this.setItem = function(key, item) {
      if(!key) {
        throw new Error("InvalidKey", key);
      }
      if(UT.Collection.isReservedKey(key)) {
        throw new Error("ReservedKey", key);
      }
      var oldItem = items[key]; // Avoid getItem here as we want the copied value.
      var sanItem = sanitizeItem(key, item);

      if(!sanItem && !items[key]){
        // set null or undefined on an inexistant item
        // do not delete in this case.
        return sanItem;
      }
      if(oldItem && (sanItem === null || sanItem === undefined)) {
        // delete
        keys.splice(keys.indexOf(key), 1);
        count--;
        delete items[key];
      } else if(!oldItem && sanItem) {
        // insert
        count++;
        keys.push(key);
        items[key] = sanItem;
      } else {
        // update
        items[key] = sanItem;
      }
      // Add key to dirtyKeys
      if(dirtyKeys.indexOf(key) == -1) {
        dirtyKeys.push(key);
      }
      self.length = keys.length;
      cached_items[key] = item;
      return item;
    };

    var getItemFromBoundedKey = function(key){
      if(boundKeys.indexOf(key) === -1 && self[key] !== undefined){
        return self[key];
      }
    };

    var getItem = this.getItem = function(key, defaultValue) {
      if(!key) {
        return null;
      }
      var item = cached_items[key];
      if(!item){
        item = UT.Collection.buildItem(items[key]);
        if (item === undefined) {
          item = getItemFromBoundedKey(key);
        }
        if (item === undefined) {
          item = defaultValue;
        }
        cached_items[key] = item;
      }
      return item;
    };

    this.key = function(n) {
      if(n >= keys.length) {
        return null;
      }
      return keys[n];
    };

    /**
     * Without argument retrieve the total count
     * if filterKey is given, return the number
     * of item where this properties is defined and not null.
     * This last option is available only for field declared
     * in collection field.
     */
    this.count = function() {
      return count;
    };

    this.toString = function() {
      return '<Collection @name="' + self.name + '">';
    };

    this.save = function() {
      bindNewKeys();
      addDirtyObjects();
      var itemsToSave = {};
      if(dirtyKeys.length > 0) {
        for(var i = 0; i < dirtyKeys.length; i++) {
          itemsToSave[dirtyKeys[i]] = UT.Collection.marshallItem(items[dirtyKeys[i]]);
        }
        delegate.save(self.name, itemsToSave);
        dirtyKeys = [];
      }
    };

    /**
     * Retrieve a hash of data compatible with the one received.
     */
    this.getCurrentData = function() {
      var newData = {
        name: self.name,
        count: count,
        definition: data.definition,
        operations: [],
        items: [],
        public: false
      };

      if(data.operations) {
        for(var i = 0; i < data.operations.length; i++) {
          var operation = {
            operation: data.operations[i].operation,
            field: data.operations[i].field
          };
          opsToolbox[operation.operation].toJsonData(operations[operation.field], operation);
          newData.operations.push(operation);
        }
      }

      for (var k in items) {
        var item = items[k] ;
        item._key = k ;
        newData.items.push(item);
      }
      return newData;
    };

    this.refresh = function(json) {
      initialize.call(self, {currentUserId: currentUserId, delegate: delegate, data: json});
    };

    // Cleanup item to keep only authorized keys

    var sanitizeItem = UT.Collection.sanitizeItem;

    // constructor
    var initialize = function(options) {
      UT.Collection.validateOptions(options);
      operations = {}; // map of operations results
      keys = []; // all used keys
      dirtyKeys = []; // item keys to be saved
      boundKeys = [];

      currentUserId = options.currentUserId;
      delegate = options.delegate;
      data = options.data;
      self.name = data.name;
      count = data.count;
      initializeItems(data.items);
    };

    var initializeItems = function(dataItems) {
      items = {};
      cached_items = {};
      if(!dataItems) {
        return;
      }
      for(var j = 0; j < dataItems.length; j++) {
        var item = dataItems[j];
        var key = item._key;
        items[key] = item;
        bindItem(key, item);
        keys.push(key);
      }
      self.length = keys.length;
    };

    var bindItem = function(key, value) {
      if(boundKeys.indexOf(key) == -1 && !UT.Collection.isReservedKey(key)){
        boundKeys.push(key);
        self.__defineGetter__(key, function() {
          return getItem.call(self, key);
        });
        self.__defineSetter__(key, function(value) {
          return setItem.call(self, key, value);
        });
      }
    };

    // retrieve properties defined on this that
    // are not reserved keywords.
    var eachItemProperties = function(fn) {
      var keys = Object.keys(self);
      for(var i = keys.length - 1; i >= 0; i--) {
        var key = keys[i];
        if(!UT.Collection.isReservedKey(key)) {
          fn(key, self[key]);
        }
      }
    };

    var addDirtyObjects = function() {
      for (var i = self.length - 1; i >= 0; i--) {
        var k = self.key(i),
            v = self.getItem(k);

        if (v && v.hasOwnProperty('_dirty') && v._dirty && dirtyKeys.indexOf(k) === -1) {
          delete v._dirty;
          self.setItem(k, v);
        }
      }
    };

    var bindNewKeys = function() {
      eachItemProperties(function(k,v) {
        if (boundKeys.indexOf(k) === -1) {
          setItem(k, v);
          bindItem(k, v);
        }
      });
    };

    initialize(options);
  };

  UT.Collection.RESERVED_KEYS = [
    'refresh',
    'setItem',
    'getItem',
    'count',
    'sum',
    'key',
    'isPublic',
    'getUserItem',
    'setUserItem',
    'average',
    'toString',
    'size',
    'length',
    'name',
    'save',
    'fieldDefs',
    'sanitizedItem',
    'getCurrentData'
  ];
  UT.Collection.isReservedKey = function(key) {
    return UT.Collection.RESERVED_KEYS.indexOf(key) >= 0;
  };

  UT.Collection.validateOptions = function(options){
    if(!options.data) {
      throw new Error("ArgumentError", "missing data");
    }
    if(!options.data.name) {
      throw new Error("ArgumentError", "no name in data");
    }
    if(options.data.count === undefined) {
      throw new Error("ArgumentError", "no count in data");
    }
  };

  UT.Collection.marshallItem = function(item){
    if(item && item.toJSON){
      return item.toJSON();
    } else if(item !== undefined && item !== null) {
      return item;
    } else {
      return null; // item to delete
    }
  };

  /**
   * Send back a sanitized copy of the item.
   */
  UT.Collection.sanitizeItem = function(key, item) {
    if(typeof item === 'function'){
      throw new Error("ArgumentError cannot serialize function");
    }
    var result = UT.Collection.marshallItem(item);
    if(result !== null){
      // Convert built-in type to literal object.
      if(typeof(result) !== 'object' || [].constructor === result.constructor) {
        result = {
          _type: 'literal',
          value: result
        };
      }
      result._key = key;
      if(!result || result.constructor !== {}.constructor){
        throw new Error("Unserialisable object");
      }
      // Cloning this way is safe and only
      // 18% slower than manual cloning given jsPerf results.
      return JSON.parse(JSON.stringify(result));
    } else {
      return null;
    }
  };

  UT.Collection.buildItem = function(data) {
    if(data && data._type && UT.Collection.ItemBuilders[data._type]){
      return UT.Collection.ItemBuilders[data._type](data);
    } else {
      return data;
    }
  };

  UT.Collection.ItemBuilders = {
    image: function(data){
      return new UT.Image(data);
    },
    sound: function(data){
      return new UT.Sound(data);
    },
    video: function(data){
      return new UT.Video(data);
    },
    literal: function(data){
      return data.value;
    }
  };
})(UT, window, document, undefined);
// Create a store for containing collections defined in data
// mandatory options keys: data, currentUserId, delegate
UT.CollectionStore = function(options) {
  this.data = options.data;
  var delegate = options.delegate;
  delegate.store = this;
  var collections = {};

  for(var i = 0; i < this.data.length; i++) {
    var data = this.data[i];
    var name = data.name;
    if(!name) {
      throw new Error("ArgumentError", "data contains unamed collections.");
    }
    if(data.public){
      collections[name] = new UT.PublicCollection({
        data: data,
        postMessageApi: options.postMessageApi,
        currentUserId: options.currentUserId,
        delegate: delegate
      });
    } else {
      collections[name] = new UT.Collection({
        data: data,
        postMessageApi: options.postMessageApi,
        currentUserId: options.currentUserId,
        delegate: delegate
      });
    }
  }

  // Retrieve a collection given its name.
  this.get = function(name) {
    return collections[name];
  };

  this.set = function(collection) {
    collections[collection.name] = collection;
  };

  this.each = function(fn) {
    for(var k in collections){
      fn(collections[k]);
    }
  };

  // Ensure all the write operations are made against
  // ServerRequest.
  this.flush = function(collection) {
    delegate.flush();
  };

  /**
   * Retrieve all data for the current collections.
   */
  this.getCurrentData = function() {
    data = [];
    for(var k in collections) {
      data.push(collections[k].getCurrentData());
    }
    return data;
  };

  this.refresh = function(names, callback) {
    delegate.refreshCollections(names, callback);
  };
};

; (function(UT, window, document, undefined){
  "use strict";

  var VALID_FILTERS = ['recent', 'friends'];

  /**
   * valid options keys: data, delegate, currentUserId
   */
  UT.PublicCollection = function(options) {
    // PUBLIC Properties
    this.length = 0; // loded items count
    this.name = null;

    var userItem = null;
    var dirty = false;

    this.isPublic = function isPublic(){
      return true;
    };

    // PUBLIC Methods
    // Add an anonymous item (without a key).
    var setUserItem = this.setUserItem = function(item) {
      if(!currentUserId) {
        delegate.authenticate();
        throw new Error("ArgumentError", "No currentUserId defined");
      }
      var key = currentUserId;
      var sanItem = sanitizeItem(key, item);
      var oldItem = userItem;

      if(!sanItem && !oldItem){
        return sanItem;
      }
      recomputeOperations(oldItem, sanItem);

      if(oldItem && (sanItem === null || sanItem === undefined)) {
        // delete
        count--;
        userItem = null;
      } else if(!oldItem && sanItem) {
        // insert
        count++;
        userItem = sanItem;
      } else {
        // update
        userItem = sanItem;
      }
      dirty = true;
      return userItem;
    };

    var getUserItem = this.getUserItem = function(item) {
      if(!currentUserId) {
        return;
      }
      return userItem;
    };

    this.average = function(name) {
      if(!operations[name]) {
        return;
      }
      return operations[name].average;
    };

    this.sum = function(name) {
      if(!operations[name]) {
        return;
      }
      return operations[name].sum;
    };

    var sanitizeItem = function(key, item){
      var sanitizedItem = UT.Collection.sanitizeItem(key, item);
      var fieldDefs = data.definition.fields;
      if(item && fieldDefs && fieldDefs.length > 0) {
        var valid = false;
        for(var i = 0; i < fieldDefs.length; i++) {
          var fd = fieldDefs[i];
          if(item[fd.name] !== undefined) {
            valid = true;
            if(fd.type == 'string') {
              sanitizedItem[fd.name] = item[fd.name];
            } else if(fd.type == 'number') {
              var n = parseFloat(item[fd.name]);
              if(!isNaN(n) && isFinite(item[fd.name])) {
                sanitizedItem[fd.name] = n;
              } else {
                throw new Error('TypeError', 'Wrong value for field note');
              }
            } else if(fd.type == 'boolean'){
              sanitizedItem[fd.name] = !!item[fd.name];
            } else {
              throw new Error('TypeError', 'Unknown type ' + fd.type);
            }
          }
        }
        if(!valid){
          throw new Error('InvalidItemError no valid field specified');
        }
      }
      return sanitizedItem;
    };

    /**
     * Without argument retrieve the total count
     * if filterKey is given, return the number
     * of item where this properties is defined and not null.
     * This last option is available only for field declared
     * in collection field.
     */
    this.count = function(filterKey) {
      if(!filterKey){
        return count;
      } else if(!operations[filterKey]) {
        return;
      } else {
        if(operations[filterKey]){
          return operations[filterKey].count;
        }
      }
    };

    this.toString = function() {
      return '<PublicCollection @name="' + this.name + '">';
    };

    this.save = function() {
      if (!dirty){
        return;
      }
      var items = {};
      items[currentUserId] = UT.Collection.marshallItem(userItem);
      delegate.save(this.name, items);
      dirty = false;
    };

    /**
     * Retrieve a hash of data compatible with the one received.
     */
    this.getCurrentData = function() {
      var newData = {
        name: this.name,
        count: count,
        definition: data.definition,
        operations: [],
        items: [],
        public: true
      };

      if(data.operations) {
        for(var i = 0; i < data.operations.length; i++) {
          var operation = {
            operation: data.operations[i].operation,
            field: data.operations[i].field
          };
          opsToolbox[operation.operation].toJsonData(operations[operation.field], operation);
          newData.operations.push(operation);
        }
      }

      if (getUserItem()){
        userItem._key = currentUserId;
        newData.items.push(getUserItem());
      }
      for(var j = 0; j < data.items.length; j++){
        if(data.items[j]._key && data.items[j]._key != currentUserId){
          newData.items.push(data.items[j]);
        }
      }
      return newData;
    };

    /**
     * Let you find the latest items.
     *
     * @params [options] or a filter string
     * @params callback function
     */
    this.find = function(options, callback) {
      if(typeof options === 'function') {
        callback = options;
        options = {filters: {recent: true}};
      }
      if(typeof options === 'string') {
        if(VALID_FILTERS.indexOf(options) === -1){
          throw new Error('invalid filter ('+ options +')');
        }
        var filters = {};
        filters[options] = true;
        options = {filters: filters};
      }
      if(!callback || typeof callback !== 'function'){
        throw new Error('missing callback argument');
      }
      delegate.find(this.name, options, callback);
    };

    this.refresh = function(json) {
      initialize.call(this, {currentUserId: currentUserId, delegate: delegate, data: json});
    };

    // PRIVATE Properties
    var currentUserId, delegate, data, items,
        operations, count;

    var opsToolbox = {
      _transfer: function(source, dest /*, k1, k2, ..., kn*/){
        var keys = Array.prototype.slice.call(arguments, 2);
        for (var i = keys.length - 1; i >= 0; i--) {
          dest[keys[i]] = source[keys[i]];
        }
      },
      average: {
        fromJsonData: function(field, operation){
          if(operation.average === undefined || operation.average_count === undefined){
            field.average = -1;
            field.average_count = 0;
          } else {
            opsToolbox._transfer(operation, field, 'average', 'average_count');
          }
        },
        toJsonData: function(field, operation){
          opsToolbox._transfer(field, operation, 'average', 'average_count');
        },
        recompute: function(field, operation, oldItem, newItem){
          var count = field.average_count;
          if(oldItem && oldItem[operation.field] !== undefined) {
            if(count === 1){ // When we remove the only item.
              field.average = -1;
            } else {
              field.average = ((field.average * count) - oldItem[operation.field]) / parseFloat(count - 1);
            }
            count--;
          }
          if(newItem && newItem[operation.field] !== undefined) {
            field.average = ((field.average * count) + newItem[operation.field]) / parseFloat(count + 1);
            count++;
          }
          field.average_count = count;
        }
      },
      count: {
        fromJsonData: function(field, operation) {
          if(operation.count === undefined){
            field.count = 0;
          } else {
            opsToolbox._transfer(operation, field, 'count');
          }
        },
        toJsonData: function(field, operation) {
          opsToolbox._transfer(field, operation, 'count');
        },
        recompute: function(field, operation, oldItem, newItem) {
          if(oldItem && oldItem[operation.field] && oldItem[operation.field] !== undefined) {
            field.count = field.count -1;
          }
          if(newItem && newItem[operation.field] && newItem[operation.field] !== undefined) {
            field.count ++;
          }
        }
      },
      sum: {
        fromJsonData: function(field, operation) {
          if(operation.sum === undefined){
            field.sum = 0;
          } else {
            opsToolbox._transfer(operation, field, 'sum');
          }
        },
        toJsonData: function(field, operation) {
          opsToolbox._transfer(field, operation, 'sum');
        },
        recompute: function(field, operation, oldItem, newItem) {
          if(oldItem && oldItem[operation.field] && oldItem[operation.field] !== undefined) {
            field.sum = field.sum - oldItem[operation.field];
          }
          if(newItem && newItem[operation.field] && newItem[operation.field] !== undefined) {
            field.sum = field.sum + newItem[operation.field];
          }
        }
      }
    };


    // PRIVATE Methods
    // Recompute the operations results
    var recomputeOperations = function(oldItem, newItem) {
      if(data.operations) {
        for(var i = 0; i < data.operations.length; i++) {
          var operation = data.operations[i];
          if(newItem && newItem[operation.field] !== undefined || oldItem && oldItem[operation.field] !== undefined) {
            opsToolbox[operation.operation].recompute(operations[operation.field], operation, oldItem, newItem);
          }
        }
      }
    };

    // constructor
    var initialize = function(options) {
      UT.Collection.validateOptions(options);
      operations = {}; // map of operations results

      currentUserId = options.currentUserId;
      delegate = options.delegate;
      data = options.data;
      this.name = data.name;
      count = data.count;

      // Build a map of operations : {field_name: {average: 2, average_count: 2, ...}}
      if(data.operations) {
        for(var i = 0; i < data.operations.length; i++) {
          var operation = data.operations[i];
          operations[operation.field] = operations[operation.field] || {};
          opsToolbox[operation.operation].fromJsonData(operations[operation.field], operation);
        }
      }
      initializeItems.call(this, data.items);
    };

    var initializeItems = function(dataItems) {
      if(!dataItems) {
        return;
      }
      for(var j = 0; j < dataItems.length; j++) {
        var item = dataItems[j];
        var key = item._key;
        if(key == currentUserId){
          userItem = item;
        }
      }
    };

    initialize.call(this, options);
  };
})(UT, window, document, undefined);

; (function(UT, window, document, undefined){
  "use strict";
  // Scoped variables
  var readyListeners = []; // contains the various ready event callbacks
  var apiListeners = {}; // contains the various api callbacks keyed by uuid
  var isReady = false; // become true once the environment is ready
  var postInstance; // will contains the current post instance
  var states; // contains the expression state data

  /**
   * Expression static class is the wrapper between the client code, server code. It is responsible
   * to setup a proper environment and notify actor of global state changes.
   *
   * @throw StaticClass error if instantiated.
   */
  UT.Expression = function(){ throw new Error('StaticClass'); };

  /**
   * Register a new callback function to be called once the environment is ready.
   * @param callback {function} will be passed a Post instance
   */
  UT.Expression.ready = function(callback){
    if(isReady){
      callback.call(this, postInstance);
      _callAPI("changeCurrentState", ["initialized"]);
    } else {
      if(readyListeners.indexOf(callback) === -1){
        readyListeners.push(callback);
      }
    }
  };

  /**
   * Retrieve the API version of the current expression
   */
  UT.Expression.apiVersion = function() {
    return states && states.apiVersion || '1.3.0-beta10';
  };

  UT.Expression.version = function() {
    return states && states.version || null;
  };


  /**
   * Call the server API using post message
   *
   * @private
   * @param methodName {String} method of the APi to call
   * @param args {Array} arguments to the method
   * @param callBack {Function} the callback function that will contains the result of call
   */
  var _callAPI = UT.Expression._callAPI = function(methodName, args, callback){
    // For save we delay it until post is ready
    if (methodName == 'collections.save' && !postInstance.isDisplay()) {
      __callAPIStack.push({methodName : methodName, args : args, callback : function() {}});
      if (callback) {
          callback(); 
      }
      return;
    }
    var jsonMessage = {
      type:"ExpAPICall",
      methodName:methodName,
      args:args,
      expToken: states ? states.expToken : null
    };
    if(callback){
      // assign an id to the callback function
      var callbackId = UT.uuid().toString();
      apiListeners[callbackId] = callback;
      jsonMessage.callbackId = callbackId;
    }
    var json = JSON.stringify(jsonMessage);
    window.parent.postMessage(json, "*");
  };

  var __callAPIStack = [];

  var _resolveCallAPIStack = UT.Expression._resolveCallAPIStack = function () {
    var i = 0;
    while (i < __callAPIStack.length) {
      _callAPI(__callAPIStack[i].methodName, __callAPIStack[i].args, __callAPIStack[i].callback);
      ++i;
    }
    __callAPIStack = [];
  };

  /**
   * Events called when callback are received from post message.
   * @private
   * @param callBackUUID the uuid of the callback to call
   * @param result the result parameter to the caallback
   */
  var _receiveCallback = function(callbackUUID, result) {
    var callback = apiListeners[callbackUUID];
    if (callback) {
      if ( !(result && result instanceof Array )) {
        if(window.console && console.error){
          console.error('received result is not an array.', result);
        }
      }
      callback.apply(this, result);
      delete apiListeners[callbackUUID];
    }
  };

  var _ready = function(newStates) {
    states = newStates;
    isReady = true;
    // default ready to post state is false
    states.readyToPost = false;
    // create scoped post instance
    postInstance = new UT.Post(states);

    postInstance.on('scroll', function(newScrollValues) {
      states.scrollValues = newScrollValues;
    });
    for(var i = 0; i < readyListeners.length; i++){
      readyListeners[i].call(postInstance, postInstance);
    }
    readyListeners = [];
     _callAPI("changeCurrentState", ["initialized"]);
  };

  var _post = function() {
    postInstance.fire('publish');
    _callAPI("posted");
  };

  var _pause = function() {
    postInstance.fire('pause');
  };

  UT.Expression._dispatch = function(msg) {
    switch (msg.type) {
      case 'ready' :
        _ready(msg.options);
        break;
      case 'triggerEvent' :
        postInstance.fire.apply(postInstance, [msg.eventName].concat(msg.eventArgs));
        break;
      case 'callback' :
        _receiveCallback(msg.callbackId, msg.result);
        break;
      case 'post' :
        _post();
        break;
      case 'pause':
        _pause();
        break;
      case 'media' :
        postInstance.fire('media', msg.eventArgs[0]);
        break;
    }
  };

  /**
   * @private
   * Reset the current environment.
   */
  UT.Expression._reset = function(){
    readyListeners = [];
    apiListeners = [];
    postInstance = null;
    isReady = false;
    states = null;
  };

  /**
   * @private
   * Retrieve the post instance.
   */
  UT.Expression._postInstance = function(){
    postInstance = postInstance;
    return postInstance;
  };
})(UT, window, document, undefined);
; (function(UT){
  "use strict";

  UT.User = function(userDescriptor) {
    this.username = userDescriptor.username;
    this.avatar = function(){
      return userDescriptor.avatar;
    };
    // Might not be set
    this.uuid = userDescriptor.uuid;
    this.numberOfPost = userDescriptor.numberOfPost;
    this.numberOfUse = userDescriptor.numberOfUse;
  };

  UT.User.prototype.toJSON = function(){
    return { _type: 'user', uuid: this.uuid };
  };
})(UT);
;(function(UT, window, document, undefined){
  "use strict";

  UT.Post = function(states){
    if(!states || !states.collections){
      throw new Error("ArgumentError", "Missing collections in state arguments");
    }
    // quicker than bind
    var self = this;

    // scoped properties
    var currentSize = {height: 0, width: 0};
    var currentScroll = {scrollTop: 0, scrollBottom: 0};
    var queuedUpTickets = {};
    var eventTypesBindings = {}; // handle event bindings for each event type
    var isIOSApp = /(urturn)/i.test(navigator.userAgent);
    var collectionStore = new UT.CollectionStore({
      data: states.collections,
      currentUserId: states.currentUserId,
      delegate: {
        save: function(name, items, callback) {
          UT.Expression._callAPI('collections.save', [name, items], callback);
        },
        authenticate: function(callback) {
          UT.Expression._callAPI('authenticate');
        },
        find: function(name, options, callback) {
          UT.Expression._callAPI('collections.find', [name, options], callback);
        }
      }
    });

    /**
     * Retrieve Parent Post Datas.
     *
     * This is available only during the first edition of a post
     * if the expression is created from another one.
     */
    var parentCollection;
    if(states.parentData){
      var items = [];
      for(var k in states.parentData){
        try {
          // Safari6 bug with accessing _key using dot notation with 'use strict'
          /*jshint sub:true*/
          states.parentData[k]['_key'] = k;
        } catch(e) {
          if(window.console && console.log) {
            console.log('Unexpected Error: ' + e);
          }
        }
        items.push(states.parentData[k]);
      }
      parentCollection = new UT.Collection({
        data: {
          name: 'parent',
          items: items,
          count: items.length
        },
        delegate: {
          save: function(){
            throw new Error('ReadOnly collection');
          },
          authenticate: function(){
            throw new Error('ReadOnly collection');
          }
        },
        currentUserId: states.currentUserId
      });
    }


    var language = this.language = states.locale;

    if (i18n) {
      i18n.setLocale(language);
    }
    // Set parameters in states
    var parameters = this.parameters = states.parameters;

    if (parameters && parameters.filter && typeof(parameters.filter) === 'string') {
      parameters.filter = JSON.parse(parameters.filter);
    }
    // scoped functions

    var deprecated = function(methodName, sinceVersion, removeVersion, replacementCall) {
      if(window.console && console.log){
        console.log(methodName + ' has been deprecated since ' + sinceVersion +
          ' and will be removed in version ' + removeVersion + '.' +
          ' Use ' + replacementCall + ' instead.');
      }
    };

    var setNote = function(value){
      states.note = value;
      UT.Expression._callAPI('document.setNote', [states.note]);
      self.fire('noteUpdated');
      return value;
    };

    this.__defineGetter__('note', function() {
      return states.note;
    });
    this.__defineSetter__('note', function(value) {
      return setNote(value);
    });

    // Public Properties

    /**
     * context of the current editor
     * - player: true if in player mode
     * - editor: true if in editor mode
     * - thumbnail: true if in thumbnail mode
     * - privacy: one of 'private', 'unlisted' or 'public' the current state of the document publication.
     *
     * Those attributes should not be modified as the context is read-only.
     * read-only
     */
    var context = this.context = {
      player: false,
      editor: false,
      sandbox: false,
      thumbnail: false,
      privacy: null,
      mediaFirst : false
    };
    // set the proper context values
    if(states.mode == 'edit'){
      context.editor = true;
    } else if(states.mode == 'view'){
      context.player = true;
    }
    if (states.sandbox === true) {
      context.sandbox = true;
    }
    context.privacy = states.documentPrivacy;

    if (states.mediaFirst === true) {
      context.mediaFirst = true;
    }

    if (context.player) {
      __STACK_JQUERY_JS = [];
    }

    /**
     * Retrieve the public url of the document.
     *
     * read-only
     */
    var url = this.url = states.documentURL;

    /**
     * the expression outter dom node
     */
    var node = this.node = document.querySelector('.webdoc_expression_wrapper');
    if(!node){
      throw new Error('Missing wrapper node');
    }

    // Public Functions

    /**
     * Native text input for mobile.
     *
     * if options is passed, it might contains:
     * - value, the default value,
     * - max, the number of chars allowed,
     * - multiline, if true, allow for a multiline text input
     *
     * The callback will be passed the resulting string or null
     * if no value have been selected.
     *
     * XXX: Need to be supported on desktop as well
     */
    var textDialog = function(options, callback, errorCallback){
      if(typeof options == 'function'){
        callback = options;
        options = {};
      }
      UT.Expression._callAPI(
        'document.textInput',
        [options.value || null, options.max || null, options.multiline || false],
        callback
      );
    };

    var imageDialog = function(options, callback, errorCallback) {
      if (!callback) {
        return;
      }
      UT.Expression._callAPI(
        'medias.openImageChooser',
        [options],
        function(imageDescriptor) {
          if (imageDescriptor === null && arguments.length === 2 && arguments[1] === 'cameraNotFound') {
            if (errorCallback) {
              errorCallback({
                type : 'cameraNotFound',
                message : 'User camera can not be found.'
              });
            }
            else {
              callback(null);
            }
            return;
          }
          if (imageDescriptor === null) {
            if (errorCallback) {
              errorCallback({
                type : 'userQuitDialog',
                message : 'User quit the dialog without selecting a media.'
              });
            }
            else {
              callback(null);
            }
            return;
          }
          var image = new UT.Image();
          image.init(imageDescriptor);
          callback.call(self, image);
      });
    };

    var soundDialog = function(options, callback, errorCallback) {
      if (!callback) {
        return;
      }
      UT.Expression._callAPI(
        'medias.openSoundChooser',
        [options],
        function(soundDecriptor) {
           if (soundDecriptor === null) {
            if (errorCallback) {
              errorCallback({
                type : 'userQuitDialog',
                message : 'User quit the dialog without selecting a media.'
              });
            }
            else {
              callback(null);
            }
            return;
          }
          var sound = new UT.Sound(soundDecriptor);
          callback.call(self, sound);
      });
    };

    var videoDialog = function(options, callback, errorCallback) {
      UT.Expression._callAPI(
        'medias.openVideoChooser',
        [options],
        function(videoDescriptor) {
          if (videoDescriptor === null) {
            if (errorCallback) {
              errorCallback({
                type : 'userQuitDialog',
                message : 'User quit the dialog without selecting a media.'
              });
            }
            else {
              callback(null);
            }
            return;
          }
          var video = new UT.Video(videoDescriptor);
          callback.call(self, video);
      });
    };

    var cropDialog = function(options, callback, errorCallback) {
      if (options.image.descriptor) {
        options.image = options.image.descriptor;
      }
      UT.Expression._callAPI('medias.crop', [options],
        function(imageDescriptor) {
          if (imageDescriptor === null) {
            if (errorCallback) {
              errorCallback({
                type : 'userQuitDialog',
                message : 'User quit the dialog without selecting a media.'
              });
            }
            else {
              callback(null);
            }
            return;
          }
          var image = null;
          if (options.image.init) {
            options.image.init(imageDescriptor);
            image = options.image;
          }
          else {
            image = new UT.Image();
            image.init(imageDescriptor);
          }
          callback.call(self, image);
      });
    };

    // Send a request to list users with the given ids.
    var userListDialog = function(options, callback) {
      if(typeof options === 'function') {
        callback = options;
        options = {};
      }
      if(options.items) {
        options.users = options.users || [];
        for(var i = 0; i < options.items.length ; i++){
          options.users.push(options.items[i]._key);
        }
        delete options.items;
      }
      if(options.title) {
        options.label = options.title;
        delete options.title;
      }
      if (!self.context.player || !options.users || options.users.length === 0 ) {
        callback.apply(self);
      } else {
        UT.Expression._callAPI('dialog.users', [options], function(){
          callback.apply(self);
        });
      }
    };


    // Handler for the various dialog type
    var dialogHandler = {
      text: textDialog,
      image: imageDialog,
      sound: soundDialog,
      video: videoDialog,
      crop: cropDialog,
      users: userListDialog
    };



    var suggestRotationInfo = function(options) {
      UT.Expression._callAPI('dialog.suggestRotation', [options], function(){});
    };

    var notificationHandler = {
      suggestRotation : suggestRotationInfo
    };


    var notification = this.notification = function(type, options) {
      if(notificationHandler[type]){
        notificationHandler[type](options);
      } else {
        throw new Error('InvalidArgument', 'unknown notification type ' + type);
      }
    };




    /**
     * Calls all fns in the list for a given eventName. Passes arguments
     * through to the caller.
     * @params {String} eventName The eventName to fire
     */
    var fire = this.fire = function(eventName) {
      if(eventName === 'scrollChanged'){
        eventName = 'scroll';
      }

      var list = eventTypesBindings[eventName],
          promises = [],
          listLength,
          listIndex,
          callbackFunction,
          callbackArgs,
          callbackTarget,
          promise;

      if(eventName == 'scroll'){
        list = (list ? list.concat(eventTypesBindings['scrollChanged']) : eventTypesBindings['scrollChanged'] );
      }

      // Nothing to fire
      if (!list) {
        return;
      }

      callbackArgs = Array.prototype.slice.call(arguments, 1);
      callbackTarget = (callbackArgs.length !== 0 ? callbackArgs[0] : self);

      // convert to newer name and fire them as well.
      switch(eventName){
        case 'scroll':
          currentScroll.scrollTop = callbackArgs[0].scrollTop;
          currentScroll.scrollBottom = callbackArgs[0].scrollBottom;
        break;
        case 'image':
          var img = new UT.Image();
          img.init(callbackArgs[0]);
          callbackArgs[0] = img;
        break;
      }



      // We copy the list in case the original mutates while we're
      // looping over it. We take the arguments, lop of the first entry,
      // and pass the rest to the listeners when we call them.
      list = list.slice(0);
      listLength = list.length;
      listIndex = -1;

      while (++listIndex < listLength) {
        callbackFunction = list[listIndex];
        if(callbackFunction){
          promise = callbackFunction.apply(callbackTarget, callbackArgs);
          if(promise && typeof promise.then === 'function') {
            promises.push(promise);
          }
        }
      }

      var nextTrigger = 'after' + eventName.charAt(0).toUpperCase() + eventName.slice(1);
      if(promises.length > 0) {
        when.all(promises).then(function() {
          fire(nextTrigger);
        });
      }
      else {
        fire(nextTrigger);
      }
    };

    /**
     * Register a listener for the given eventName.
     *
     * Available events:
     *
     * publish callback()
     * ------------------
     * Fired when the user wants to post his content. The callback
     * will be called on the Post instance and receive no argument.
     * It must be runnable synchronously as the current context
     * will be destroyed after all callbacks as been processed.
     *
     * scroll callback(ScrollDataEvent)
     * --------------------------------
     * Fired every time the visible part of the iframe
     * on the page change.
     * the callback is passed the scrolling data.
     * XXX what are the scrolling data?
     *
     * resize callback(ResizeEvent)
     * ----------------------------
     * Fired when the content box size changed. The callback is
     * called on the event and will be passed the ResizeEvent instance.
     *
     * media callback(MediaEvent)
     * --------------------------
     * Fired when a media is incoming from an external action
     * like a bookmarklet adding a resource or a drag and drop.
     * The callback is called on the event and will be passed a
     * the MediaEvent instance.
     */
    var on = this.on = function(eventName, callback) {
      var list = eventTypesBindings[eventName] || (eventTypesBindings[eventName] = []);

      // This callback is not a function
      if (typeof callback !== 'function') {
        return;
      }

      list.push(callback);
    };

    /**
     * Removes the given callback for the given eventName.
     *
     * @param {String} eventName
     * @param {Function} callback to remove
     */
    var off = this.off = function(eventName, callback) {
      var list = eventTypesBindings[eventName],
      l;

      // Nothing to unbind
      if (!list) {
        return;
      }

      // No function specified, so unbind all by removing the list
      if (!callback) {
        delete eventTypesBindings[eventName];
        return;
      }

      // Remove all occurences of this function from the list
      l = list ? list.indexOf(callback) : -1;

      while (l !== -1) {
        list.splice(l, 1);
        l = list.indexOf(callback);
      }
    };

    /**
     * Flag a post as being valid or not.
     * A valid document can be posted synchronously at any time.
     *
     * @param flag {boolean} if provided, set the current validity state.
     * @return {boolean} the current validity flag
     */
    var valid = this.valid = function(flag){
      if(flag !== undefined && flag != states.readyToPost ){
        states.readyToPost = !!flag;
        UT.Expression._callAPI('document.readyToPost', [states.readyToPost]);
      }
      return states.readyToPost;
    };

    // XXX Test the replacement on('media').
    /**
     * on the callback function to the imageAdded event.
     * The function will receive the image and optional extraData param.
     * @param {Function} callback
     */
    var imageAdded = this.imageAdded = function(callback) {
      on('imageAdded', callback);
    };

    var showNode = function() {
        self.node.style.display = 'block';
    };

    var hideNodeOnDialog = function() {
      if (isIOSApp) {
        //  self.node.style.display = 'none';
      }
    };

    /**
     * Create the dialog of the given type using an options object and
     * retrieve the dialog output in the callback.
     */
    var dialog = this.dialog = function(type, options, callback) {
      if (callback === undefined && typeof(options) === 'function') {
        callback = options;
        options = {};
      }

      var errorCallback = null;
      if (arguments.length == 4 && typeof(arguments[3]) === 'function') {
        errorCallback = arguments[3];
      }

      // hide the body to avoid weird effect because of latency on mobile
      hideNodeOnDialog();

      var _scrollPositionTop = currentScroll.scrollTop;
      var _scrollPositionBottom = currentScroll.scrollBottom;
      var _this = this;

      var _callback = function () {
        // readd visibility
        showNode();
        if(callback){
         if (type !== 'text') {
            _this.scroll({
              scrollTop : _scrollPositionTop,
              scrollBottom : _scrollPositionBottom
            }, function () {});
          }
          else {
            // Hacky : on Mobile Web the keyboard disapear the the browser CENTER on the element
            // that was edited. If we directly scroll this has no effect
            setTimeout(function() {
             _this.scroll({
              scrollTop :  -1000,
              scrollBottom : 0
            }, function () {});
           }, 1);
          }
          callback.apply(this, arguments);
        }
      };

      var _errorCallback = null;
      if (errorCallback) {
        _errorCallback = function () {
          // readd visibility
          showNode();
          if(errorCallback){
            if (type !== 'text') {
              _this.scroll({
                scrollTop : _scrollPositionTop,
                scrollBottom : _scrollPositionBottom
              }, function () {});
            }
            else {
              // Hacky : on Mobile Web the keyboard disapear the the browser CENTER on the element
              // that was edited. If we directly scroll this has no effect
              setTimeout(function() {
               _this.scroll({
                scrollTop :  -1000,
                scrollBottom : 0
              }, function () {});
             }, 1);
            }
            errorCallback.apply(this, arguments);
          }
        };
      }
      if(dialogHandler[type]){
        dialogHandler[type](options, _callback, _errorCallback);
      } else {
        throw new Error('InvalidArgument', 'unknown dialog type ' + type);
      }
    };



    /**
     * Ask the container to resize to the given parameters or return the
     * current size without parameter.
     *
     * The asynchronous result of this function can be listened on
     * the DOM node event.
     * size can be one of:
     * - {height: Number} an object containing the height in pixels
     * - {height: '133px'} an object continaing the height in a css string
     * - Number the height in pixel
     * - 'auto' automatically resize to the actual content size
     */
    var size = this.size = function(sizeInfo, callback) {
      if(typeof sizeInfo === 'function'){
        callback = sizeInfo;
        sizeInfo = null;
      }
      if(sizeInfo){
        var height;
        if(typeof sizeInfo === 'number'){ // 99
          height = sizeInfo;
        } else if(sizeInfo && sizeInfo == 'auto'){
          height = node.offsetHeight;
        } else if (sizeInfo && sizeInfo.height){
          if(typeof sizeInfo.height === "string" && sizeInfo.height.match &&
              sizeInfo.height.match(/^[0-9]+px$/)){ // {height: '99px'}
            height = sizeInfo.height.substring(0, sizeInfo.height.length-2);
          } else { // {height: 99}
            height = sizeInfo.height;
          }
        }
        var fn = null;
        if(callback){
          fn = function(){
            callback(new UT.ResizeEvent(currentSize.width, currentSize.height));
          };
        }
        // true: here to ensure server side that we support display event.
        // Let him handle older version nicely.
        UT.Expression._callAPI('container.resizeHeight', [height, true], fn);
        return this;
      } else {
        var event = new UT.ResizeEvent(currentSize.width, currentSize.height);
        if(callback){
          callback(event);
          return this;
        } else {
          return event;
        }
      }
    };


    var _isDisplay = false;
    var isDisplay = this.isDisplay = function( ) {
      return _isDisplay;
    };
    /**
     * Display the post and call resize events
     */
    var display = this.display = function() {
      _isDisplay = true;
      UT.Expression._resolveCallAPIStack();
      UT.Expression._callAPI('container.display', [], function (){});

    };

    /**
     * Ask to the sdk to stop all other media in all other expressions!
     */
    var stopAllOther = this.stopAllOther = function() {
      UT.Expression._callAPI('document.stopAllOther', [], function() {});
    };

    /**
     * Ask the container to scroll to the top OR bottom position.
     *
     * @param {Object{scrollTop,scrollBottom}} position
     * @param callback receives a UT.ScrollEvent
     * @return this or scroll values if called without arguments
     */
    var scroll = this.scroll = function(position, callback){
      if(typeof position === 'function') {
        callback = position;
        position = null;
      }
      if(position) {
        UT.Expression._callAPI('container.scroll',
          [position.scrollTop||position.scrollBottom, (position.scrollTop?'top':'bottom')],
          function(scrollValues){
            currentScroll.scrollTop = scrollValues.scrollTop;
            currentScroll.scrollBottom = scrollValues.scrollBottom;
            if(callback){
              callback(new UT.ScrollEvent(scrollValues.scrollTop, scrollValues.scrollBottom));
            }
          }
        );
        return this;
      } else {
        var event = new UT.ScrollEvent(currentScroll.scrollTop, currentScroll.scrollBottom);
        if(callback) {
          callback(event);
          return this;
        } else {
          return event;
        }
      }
    };

    /**
     * Push a navigation state
     * @param  {String}   state    The state to push : 'default', 'back', 'cancel'
     * @param  {Function} callback The function called when this state is clicked
     */
    var pushNavigation = this.pushNavigation = function(state, callback) {
      UT.Expression._callAPI('container.pushNavigation', [state], callback);
    };

    /**
     * Pop the current navigation state
     */
    var popNavigation = this.popNavigation = function() {
      UT.Expression._callAPI('container.popNavigation');
    };

    /**
     * Retrieve a unique number for a given queue
     * name. This number would be the last attributed
     * number + one.
     *
     * @since 0.8.0
     */
    var queueUp = this.queueUp = function(name, callback) {
      if(!callback){
        return this;
      }
      var self = this;
      if (queuedUpTickets[name] !== undefined) {
        callback(queuedUpTickets[name]);
        return this;
      } else {
        queuedUpTickets[name] = -1;
        UT.Expression._callAPI('document.queueUp', [name], function(number){
          queuedUpTickets[name] = number;
          callback(number);
        });
        return this;
      }
    };

    /**
     * Let the user navigate to an other website
     * or to a particullar part of urturn
     * @param  {string} app     the app to use [optional]
     * @param  {string} target  Where to navigate
     */
    var navigate = this.navigate = function(app) {
      var options = {};
      if (arguments.length >= 2) {
        options = arguments[1];
      }
      else if (arguments.length === 1) {
        options = app;
        app = 'browse';
      }
      var opt = {
        app : app,
        parameters : options
      };
      // must trigger window.open synchronously.
      if (app === 'browse' && states.behaviors.navigate.browseStrategy === 'blank') {
        window.open(options, '_blank');
      } else {
        UT.Expression._callAPI('container.navigate', [opt]);
      }
    };

    /**
     * Retrieve a collection given its name.
     *
     * The name can be any public collection defined in expression.json,
     * 'default' for the default collection (aka post.storage)
     * or parent for this post parent default collection (this is available
     * only during the first edition of a post if the expression is created
     * from another one.)
     *
     * @param {String} name the collection name
     */
    var collection = this.collection = function(name){
      if(name == 'parent'){
        return parentCollection || null;
      } else {
        return collectionStore.get(name);
      }
    };

    /**
     * Save data in all collections.
     */
    var save = this.save = function(){
      collectionStore.each(function(c){
        if(context.editor || c.isPublic()){
          c.save();
        }
      });
    };


    /**
     * Enable or diable the rotation of screen on mobile devices
     * @param  {boolean} enable If true rotation is enable, if false rotatin is disable
     */
    var enableRotation = this.enableRotation = function(enable) {
      UT.Expression._callAPI('container.enableRotation', [enable], function(){});
    };

    /**
     * urturn
     * Make a urturn on this post
     * Param (Hash) :
     * - expressionFullSystemName : (String) ex : thefactory/pix
     * - documentId : UUID of document on wich the urturn is done
     * - creatorId : Id du createur a notifier
     * Callback : called with 0 as parameter if Urturn fail
     */
    var urturn = this.urturn = function (params, callback)  {
      UT.Expression._callAPI('document.urturn', [params], function(){});
    };

    /**
     * Post a post
     */
    var post = this.post = function(params) {
      UT.Expression._callAPI('document.post', [params], function(){});
    };


    var geoLocation = this.geoLocation = function(callback) {
      UT.Expression._callAPI('document.geoLocation', [], function(longitude, latitude) {
        callback(longitude, latitude);
      });
    };

    /**
     * Define if player of this post should be static
     * @param  {Boolean}  staticState
     */
    var __static_state = false;
    var isStatic = this.isStatic = function(staticState) {
      if (staticState !== undefined && this.context.editor) {
        __static_state = staticState;
        UT.Expression._callAPI('document.isStatic', [staticState], function() {
        });
      }
      return staticState || __static_state;
    };


    var setInteractionMap = this.setInteractionMap = function(map) {
      UT.Expression._callAPI('document.setInteractionMap', [map], function() {
      });
    };

    /**
     * autoLink
     * Parse text to convert @mentions and #hashtags
     * to html links
     *
     * @param {String}
     * @return {String} containing html
     */

    var autoLink = this.autoLink = function (text)  {

      var hashtagsRegex = /(^|\s|<br\/>|\.)#([A-Za-z0-9_\-ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþş]+)/g,
          mentionsRegex = /(^|\s|<br\/>|\.)@([A-Za-z0-9_\-.]+)/g,
          linkHashtagsPattern  = '$1<a href="search:#$2" class="ut-navigate-hashtag">#$2</a>',
          linkMentionsPattern  = '$1<a href="user:$2" class="ut-navigate-mention">@$2</a>';

      text = text.replace(hashtagsRegex, linkHashtagsPattern);
      text = text.replace(mentionsRegex, linkMentionsPattern);

      text = text.replace(
        /((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
        function(url){
            var full_url = url;
            if (!full_url.match('^https?:\/\/')) {
                full_url = 'http://' + full_url;
            }
            return '<a href="' + full_url + '" class="ut-navigate-url">' + url + '</a>';
        }
      );

      return text;
    };


    /**
     * Follow API
     */
    var follow = this.follow = function(uuid, username, callback) {
      UT.Expression._callAPI('dialog.follow', [uuid, username], function(){
          callback();
        });
    };

    var getFollowers = this.getFollowers = function(from, callback) {
        if (arguments.length == 1 && typeof (arguments[0]) === ' function') {
          callback = from;
          from = 0;
        }
         UT.Expression._callAPI('document.followship', ['follower', from], function(followerList){
          callback(followerList);
        });
    };

    var getFollowing = this.getFollowing = function(from, callback) {
        if (arguments.length == 1 && typeof (arguments[0]) === ' function') {
          callback = from;
          from = 0;
        }
         UT.Expression._callAPI('document.followship', ['following', from], function(followerList){
          callback(followerList);
        });
    };

    /**
     * Asynchronously retrieve an UT.User instance given an optional array of items.
     *
     * @param {object|Array} items from which to retrieve the user.
     * @param {Function} callback the callback is been passed a UT.User instance.
     */
    var users = this.users = function(items, callback) {
      if(typeof items === 'function'){
        callback = items;
        items = 'current';
      }
      if (!callback) {
        return;
      }
      if(items === 'current'){
        UT.Expression._callAPI('document.getUserData', [], function(userInfo){
          var user = (userInfo ? new UT.User(userInfo) : null);
          callback(user, null);
        });
      } else if (Object.prototype.toString.call(items) === '[object Array]') {
        var ids = [];
        for(var k = 0; k < items.length; k++) {
          if(items[k]._key){
            ids.push(items[k]._key);
          }
        }
        UT.Expression._callAPI('document.users', [ids], function(users){
          var validUsers = [];
          var validItems = [];
          for(var j = 0; j < items.length; j++){
            for(var i = 0; i < users.length; i++){
              if(items[j]._key == users[i].uuid){
                validUsers.push(new UT.User(users[i]));
                validItems.push(items[j]);
                break;
              }
            }
          }
          callback(validUsers, validItems);
        });
      } else  {
        UT.Expression._callAPI('document.users', [[items._key]], function(data){
          var userInfo = data[0];
          if(userInfo){
            callback(new UT.User(userInfo), items);
          } else { // Missing user
            callback(null, null);
          }
        });
      }
    };

    /**
     * true if the user is the post Owner
     */
    this.isOwner = function(user){
      return user.uuid == states.postUserId;
    };

    this.isCurrentUser = function(user){
      return user.uuid == states.currentUserId;
    };

    var updateSize = function(){
      currentSize.width = window.innerWidth;
      currentSize.height = window.innerHeight;
    };

    var updateScroll = function(values){
      currentScroll.scrollTop = values.scrollTop;
      currentScroll.scrollBottom = values.scrollBottom;
    };


    /**
     * Touchevents Fix
     */
    var enabletouchevents = null;
    var disabletouchevents = null;

    if (UT.touchEventFix) {
      enabletouchevents = UT.touchEventFix.enableTouchEvents;
      disabletouchevents =  UT.touchEventFix.disableTouchEvents;
    }

    this.on('enabletouchevents', enabletouchevents);
    this.on('disabletouchevents', disabletouchevents);

    /**
     * Respond on note modification event.
     */
    this.on('shouldUpdateNote', function(newNoteValue) {
      states.note = newNoteValue;
      self.fire('noteUpdated');
    });




    /**
     * The default, private collection
     */
    this.storage = collection('default');
    window.addEventListener('resize', function(){
      updateSize();
      self.fire('resize', new UT.ResizeEvent(currentSize.width, currentSize.height));
    }, false);
    updateSize();

    /**
    * listen to click to navigate
    */
    window.addEventListener('click', function(e){
      var url = e.target.getAttribute('href');

      if (url && url.match(/^(search|user|http)/gi)) {
        var app     = url.split(":")[0],
            target  = url.substring(url.indexOf(':')+1);

        if (app == 'http' || app == 'https') {
          app = 'browse';
          target = url;
        }

        e.preventDefault();
        self.navigate(app,target);
      }
    }, false);

  };
})(UT, window, document, undefined);

(function(document, window, undefined) {
  var RE_CSS_INJECTION_SELECTOR = /^((?:[\w\s#,.<>]|(?:\[[\w\:]+\=[\w\:'"]+\]))*)(?:\[([\w\:]+)\])?$/;
  var RE_DATA_URL_SVG = /data\:image\/svg\+xml;/;
  var SVG_NS_URL = "http://www.w3.org/2000/svg";
  var XMLNS_NS_URL = "http://www.w3.org/2000/xmlns/";
  var XLINK_NS_URL = "http://www.w3.org/1999/xlink";

  /**
   * An image object return by create('image');
   * Use it to manipulate an image (crop, filter, ...)
   * @param {object} imageDescriptor an object return by internal sdk
   */
  UT.Image = function(imageDescriptor) {
    /**
    * The url of the media
    * @type {String}
    */
    this.url = "";

    /**
     * In case the UT.Image has a filter or a svgTemplate,
     * a rasterized version might be created by our server to
     * be used in place of the current image + filters.
     */
    this.rasterUrl = null;

    /**
     * A set of metadata about this item
     * - source
     * - crop
     * @type {Object}
     */
    this.info = {};

    /**
     * A string containing the type of this media,
     * Aka "image" here
     * @type {String}
     */
    this.type = 'image';

    /**
     * Crop an image
     * @param {Object}   options  a hash of options :
     * {
     *  x : source X,
     *  y : source Y,
     *  w : source width,
     *  h : source height,
     *  width : dest Width,
     *  height : dest Height
     * }
     *
     * @param  {Function}   callback   The function called once image has been croped
     * @return {void}                Return nothing
     */
    this.crop = function(options , callback) {
     UT.Expression._callAPI('medias.recrop', [{
       size : options,
       image : this.descriptor
     }],
     function(imageDescriptor) {
       this.init(imageDescriptor);
       callback.call(this, this);
     }.bind(this));
    };

    /**
     * Autocrop the image to specified ratio
     * @param  {int}       width      desired width of image
     * @param  {int}       height    desired height of image
     * @param  {function}   callback   callback called when image has been croped
     * @return {void}
     */
    this.autocrop = function(width, height, callback) {
     UT.Expression._callAPI('medias.crop', [{
       size : {
         width : width,
         height : height,
         auto : true
       },
       image : this.descriptor
     }],
     function(imageDescriptor) {
       this.init(imageDescriptor);
       callback.call(this, this);
     }.bind(this));
    };

    /**
     * Apply Filters to an Image and retrieve a new UT.Image instance.
     * @param  {Array}     filters    An array of filter to apply to image
     * @param  {Function} callback  The function called once image has been filterd
     * @return {void}                Return nothing
     */
    this.filter = function(filters, callback) {
     UT.Expression._callAPI('medias.applyFilter', [{
       filter : filters,
       image : this.descriptor
     }],
     function(imageDescriptor) {
       this.init(imageDescriptor);
       callback.call(this, this);
     }.bind(this));
    };

    /**
     * Make this image editable.
     * You can use it inside a CANVAS without tainted it!
     * @return {String} A data:url of this image. Can be used inside a canvas;
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    this.editable = function(callback) {
     UT.Expression._callAPI(
      'medias.getEditableImage',
      [this.url],
      function(editableImageUrl) {
        console.log('editable image URL:', editableImageUrl);
        this.url = editableImageUrl;
        callback.call(this, this);
      }.bind(this)
     );
    };

    this.toJSON = function() {
      this.descriptor._type = 'image';
      if (this.svgTemplate) {
        this.descriptor.svgTemplate = this._svgTemplateString();
        this.descriptor.svgCssSelector = this.svgCssSelector;
      }
      return this.descriptor;
    };

    var _loadImage = function(url, callback) {
      var img = new Image();
      img.onload = function() {
        callback.call(this, img);
      };
      // Added in 1.2.12
      img.onerror = function() {
        callback.call(this, null, new Error("Unable to load image"));
      };
      img.src = url;
    };

    /**
     * Asynchronous function that retrieve a DOM Element to display
     * the picture.
     *
     * @param optional {String}type one of ('img'|'svg'|'canvas')
     * @param {function}callback receive (element, error)
     *
     * since 1.2.12
     *
     * Until 1.2.12, node accepted only the callback parameter
     * and always pass its an Image Element.
     * Instantiate an Image instance
     * since: 0.9.0
     */
    this.node = function(type, callback) {
      if (!callback) {
        callback = type;
        type = 'img';
      }
      try {
        return {
          img: function(callback) {
            if (this.rasterUrl) {
              _loadImage(this.rasterUrl, callback);
            } else if (this.svgTemplate) {
              callback(null, new Error('No Raster Image'));
            } else {
              _loadImage(this.url, callback);
            }
          },
          svg: function(callback) {
            this.svg(callback);
          }
        }[type].call(this, callback);
      }
      catch (ex) {
        callback(null, new Error('Invalid node type given: ' + type));
      }
    };

    /**
     * This method has two signatures:
     * - svg({function}callback)
     * - svg({string}template, {string}injectionCssSelector)
     * - svg({SVGElement}template, {string}injectionCssSelector)
     * It return this for chaining.
     * since: 1.2.12
     */
    this.svg = function() {
      var self = this;

      // Build an svg image tag.
      var _buildSVGImage = function(url, img) {
        var svgImage = document.createElementNS(SVG_NS_URL, 'image');
        svgImage.setAttributeNS(XLINK_NS_URL, 'xlink:href', url);
        svgImage.setAttribute('x', 0);
        svgImage.setAttribute('y', 0);
        svgImage.setAttribute('width', img.width);
        svgImage.setAttribute('height', img.height);
        return svgImage;
      };

      // return true if the image source is some kind of SVG.
      var _isSvgUrl = function() {
        return self.url && !!self.url.match(RE_DATA_URL_SVG);
      };

      // return the svg raw source as a string.
      //
      // You must ensure this is a SVG based image first.
      var _svgTextFromUrl = function() {
        return self.url.substring(19); // 19: string length.
      };

      /**
       * svg(callback):
       * Callback will be passed (svgElement, err) arguments.
       *
       * If no SVG tempalte has been set beforehand, svgElement will be null
       * and err.message will be 'No SVG Template'.
       *
       * This will mutate the URL to an editable one to avoid cross origin issues.
       *
       * If svgElement is an actual node, it will be retrieved by reference rather
       * than copied.
       */
      var _getSVG = function(callback) {
        var container = document.createElement('div');
        if (_isSvgUrl()) { // SVG Data URL to SVG Element
          container.innerHTML = _svgTextFromUrl();
          callback(container.children[0]);
          return;
        } else {
          self.editable(function(){
            _loadImage.call(self, self.url, function(img, err) {
              if (err) {
                return callback.call(self, null, err);
              }
              var svg;
              if (self.svgTemplate) { // SVG Text Template to SVG Element
                if (typeof self.svgTemplate === 'string') {
                  container = document.createElement('div');
                  container.innerHTML = self.svgTemplate;
                  self.svgTemplate = container.children[0];
                }
                svg = self.svgTemplate;
                self._injectImage(svg);
                callback.call(self, svg);
              } else {
                callback.call(self, null, new Error('No SVG Template'));
              }
            });
          });
        }
      };

      /**
       * SVG(template, cssSelector) define a new SVG template for this node,
       * where the cssSelector point either to a DOM Element or a DOM Attribute.
       * If the selector points to an element, an image tag will be injected inside ;
       * If the selector points to an attribute, the image URL will be injected in that attribute.
       */
      var _setSVG = function(template, cssSelector) {
        self.svgTemplate = template;
        self.svgCssSelector = cssSelector || 'image[xlink:href]';
        if (typeof self.svgTemplate !== 'string') {
          self._injectImage(self.svgTemplate);
        }
      };

      if (arguments[0] && typeof arguments[0] === 'function' ) {
        _getSVG.apply(this, arguments);
      } else {
        _setSVG.apply(this, arguments);
      }
      this._dirty = true;
      return this;
    };

    this._svgTemplateString = function() {
      if (typeof this.svgTemplate === 'string') {
        return this.svgTemplate;
      } else {
        var pn = this.svgTemplate.parentNode;
        c = document.createElement('div');
        this._removeInjectedImage(this.svgTemplate);
        c.appendChild(this.svgTemplate);
        var source = c.innerHTML;
        this._injectImage(this.svgTemplate);
        return source;
      }
    };

    this._injectImage = function(svg) {
      if (this.svgCssSelector) {
        var matches = this.svgCssSelector.match(RE_CSS_INJECTION_SELECTOR);
        if(!matches && window.console && console.log) {
          console.log('InvalidSelector:', this.svgCssSelector);
        } else {
          var element = matches[1] && svg.querySelector(matches[1]) || svg;
          var attribute = matches[2];
          if (attribute) {
            switch(attribute) {
              case 'xlink:href':
                element.setAttributeNS(XLINK_NS_URL, 'xlink:href', this.absoluteUrl());
                break;
              default:
                console.log('unsupported attribute', attribute);
            }
          } else {
            element.appendChild(_buildImage(this.absoluteUrl()));
          }
        }
      }
    };

    this.absoluteUrl = function() {
      // valid strings are (http:, https:, //, data:)
      if (this.url && this.url.match(/^((https?|data):|\/\/)/)) {
        return this.url;
      }
      if (this.url && this.url[0] != '/') {
        var parts = window.location.pathname.split('/');
        parts.pop();
        return window.location.protocol + '//' + window.location.host + parts.join('/') + '/' + this.url;
      }
      return window.location.protocol + '//' + window.location.host + this.url;
    };

    this._removeInjectedImage = function(svg) {
      if (this.svgCssSelector) {
        var matches = this.svgCssSelector.match(RE_CSS_INJECTION_SELECTOR);
        if(!matches && window.console && console.log) {
          console.log('InvalidSelector:', this.svgCssSelector);
        } else {
          var element = matches[1] && svg.querySelector(matches[1]) || svg;
          var attribute = matches[2];
          if (attribute) {
            element.removeAttribute(attribute, this.url);
          } else {
            element.removeChild(element.querySelector('image[xlink:href="'+this.url+'"]'));
          }
        }
      }
    };



    // Private methods
    // LOOK AWAY!

    // Accessed through UT.Post interface within Urturn API
    // supported signature:
    // - {string} that represent an URL
    // - {object} that contains `{string}url` key
    // - {object} that contains `{string|SVGElement}svg` key
    // in case of an object, `{object}info` and `{object}center`
    // are optional arguments.
    this.init = function(imageDescriptor) {
      if (!imageDescriptor) {
        return;
      }
      if (typeof(imageDescriptor) == 'string') {
        this.url = imageDescriptor;
        this.descriptor = {};
        this.descriptor.url = imageDescriptor;
        this.descriptor._type = 'image';
      }
      else {
        if (imageDescriptor.url) {
          this.url = imageDescriptor.url;
        } else if (imageDescriptor.svg) {
          // build using svg text or element
          if (typeof imageDescriptor.svg !== 'string') {
            var container = document.createElement('div');
            container.appendChild(imageDescriptor.svg);
            imageDescriptor.svg = container.innerHTML;
          }
          this.url = 'data:image/svg+xml;utf8,' + imageDescriptor.svg;
          imageDescriptor.svg = null;
        }
        if (imageDescriptor.svgTemplate) {
          this.svg(imageDescriptor.svgTemplate, imageDescriptor.svgCssSelector || 'image[xlink:href]');
        }
        this.rasterUrl = imageDescriptor.rasterUrl;

        // general descriptor and info
        this.descriptor = imageDescriptor;
        this.info = imageDescriptor.info;

        // crop center
        if (imageDescriptor.center) {
          this.info.crop = imageDescriptor.center;
        }
      }
    };

    this.descriptor = {};
    if(imageDescriptor){
      this.init(imageDescriptor);
    }
  };

}(document, window));
/**
 * An video object return by create('video');
 * Use it to manipulate a video (crop and filters comming in futur)
 * @param {object} videoDescriptor an object return by internal sdk
 */
UT.Video = function(videoDescriptor) {

	/**
	 * The url of the video
	 * @type {String}
	 */
	this.url = "";

	/**
	 * A string containing the type of this media,
	 * Aka "video" here
	 * @type {String}
	 */
	this.type = 'video';

	this.toJSON = function(){
		descriptor.url = this.url;
		descriptor._type = 'video';
		descriptor.appData = this.appData;
		return descriptor;
	};

	// Private methods
	// LOOK AWAY!
	// Use to on this interface with Urturn API
	function _buildVideo(videoDescriptor) {
		this.url = videoDescriptor.url;
		this.appData = videoDescriptor.appData;
		descriptor = videoDescriptor;
	}
	var descriptor = {};
	// init !
	_buildVideo.call(this, videoDescriptor);
};
/**
 * A sound object return by create('sound');
 * Use it to manipulate a sound (filter, ...)
 * @param {object} soundDescriptor an object return by internal sdk
 */
UT.Sound = function(soundDescriptor) {

	/**
	 * Name of the service in wich this sound is hosted
	 * Currently soundcloud or itunes
	 * @type {String}
	 */
	this.service = '';

	/**
	 * url of the sound on the service
	 * @type {URL}
	 */
	this.url = '';

	/**
	 * Title of the sound
	 * @type {String}
	 */
	this.title = '';

	/**
	 * Name of artist / author
	 * @type {String}
	 */
	this.artist = '';

	/**
	 * Link to an image representing the sound or the artist / author
	 * @type {URL}
	 */
	this.cover = '';

	/**
	 * Link to an image representing the artist / author of this sound
	 * @type {URL}
	 */
	this.artistCover = '';

	/**
	 * Link to an image representing this sound
	 * @type {URL}
	 */
	this.soundCover = '';

	/**
	 * Link to an image representing the waveForm of this sound;
	 * @type {URL}
	 */
	this.waveFormImage = '';

	/**
	 * Link to the sound page on the service
	 * @type {URL}
	 */
	this.link = '';

	/**
	 * Original data as we retrive them from the service
	 * @type {Object}
	 */
	this.appData = {};


	// Private methods
	// LOOK AWAY!
	// Use to on this interface with Urturn API
	function _buildSound(soundDescriptor) {
		descriptor = soundDescriptor;
		this.service = soundDescriptor.service;
		this.url = soundDescriptor.url;
		this.title = soundDescriptor.title;
		this.artist = soundDescriptor.artist;
		this.cover = soundDescriptor.cover;
		this.artistCover = soundDescriptor.artistCover;
		this.soundCover = soundDescriptor.soundCover;
		this.waveFormImage = soundDescriptor.waveFormImage;
		this.link = soundDescriptor.link;
		this.appData = soundDescriptor.appData;
	}

	this.toJSON = function(){
		return {
			_type: 'sound',
			service: this.service,
			url: this.url,
			title: this.title,
			artist: this.artist,
			cover: this.cover,
			artistCover: this.artistCover,
			soundCover: this.soundCover,
			waveFormImage: this.waveFormImage,
			link: this.link,
			appData: this.appData
		};
	};

	var descriptor = {};
	_buildSound.call(this, soundDescriptor);
};
; (function(UT){
  /**
   * This event is sent by the on('resize') producers.
   */
  UT.ResizeEvent = function(width, height){
    this.height = height;
    this.width = width;
  };

  UT.ScrollEvent = function(scrollTop, scrollBottom){
    this.scrollTop = scrollTop;
    this.scrollBottom = scrollBottom;
  };
})(UT);
/**
 * Initialization code
 */

// handle touch events
if ('ontouchstart' in window || 'onmsgesturechange' in window) {
  document.querySelector('html').className = document.querySelector('html').className + ' touch';

  if (typeof FastClick != 'undefined') {
    window.addEventListener('load', function() {
      new FastClick(document.body);
    }, false);
  }
}

/**
 * post message handler
 */
window.addEventListener("message", function (e) {
  // webdoc will always set json data so we parse it
  try {
      msgObj = JSON.parse(e.data);
  }
  catch (exception) {
      if (console && console.error) {
        console.error("received invalid message", e.data, exception.message) ;
      }
      msgObj = {};
  }
  UT.Expression._dispatch(msgObj);
}, false);

; (function(UT, window, document, undefined){
  "use strict";

  UT.preloader = {};

  UT.preloader.waitFor = function(keys, debug){
    if(typeof(debug) == 'undefined') debug = false;
    var that = this;
    var instance = {
      keys:{},
      callback:{
        loadstart: function(){},
        progress:function(){},
        load:function(){}
      }
    };

    var now = function(){
      return new Date().getTime();
    };

    var setKeys = function(keys){
      keys.map(function(key){instance.keys[key] = {ready:false, startTime:now()};});
    };

    var readyKey = function(key){
      var that = this;
      if(!instance.keys[key]) {console.error('wrong key, that was not defined for waitFor');return;}
      instance.keys[key].ready = true;
      instance.keys[key].endTime = now();
      instance.keys[key].delay = (instance.keys[key].endTime - instance.keys[key].startTime);
      if(debug && console && console.log) console.log(' -- waitFor:progress: key:'+key);
      instance.callback.progress.call(that,instance.keys);
      for(var i in instance.keys){
        if(!instance.keys[i].ready) {return;}
      }
      if(debug && console && console.group){
        console.group(' -- waitFor:load',instance.keys);
        for(var j in instance.keys){
          console.log(j,' = ',instance.keys[j].delay+'ms');
        }
        console.groupEnd();
      }
      instance.callback.load.call(that,instance.keys);
    };

    var cacheImage = function(key, url) {
      if(!url) {
        readyKey(key);
        if(console && console.warn) console.warn('You have to specify image url as a second parameter of readyImage(key, url).. currently url='+name);
        return;
      }
      var tmpImg = new Image();
      tmpImg.onload = function() {
        readyKey(key);
      };
      tmpImg.onerror = function() {
        readyKey(key);
      };
      instance.keys[key].startTime = now();
      instance.keys[key].url = url;
      tmpImg.src = url;
    };

    var cacheFont = function(key, name) {
      if(!name) {
        readyKey(key);
        if(console && console.warn) console.warn('You have to specify font name as a second parameter of readyFont(key, fontName).. currently fontname='+name);
        return;
      }
      instance.keys[key].startTime = now();
      instance.keys[key].fontName = name;
      fontdetect.onFontLoaded(name, function(){
        readyKey(key);
      }, function() {
        if(debug) console.error('We was not able to load the font "'+name+'" in 5 sec...');
        readyKey(key);
      }, {msInterval: 30, msTimeout: 5000});
    };

    instance.on = function(event,callback){
      instance.callback[event] = callback;
      return instance;
    };

    instance.ready = function(key){
      readyKey(key);
      return instance;
    };

    instance.readyImage = function(key, url){
      cacheImage(key, url);
      return instance;
    };

    instance.readyFont = function(key, fontName){
      cacheFont(key, fontName);
      return instance;
    };

    setKeys(keys);
    return instance;
  };
})(UT, window, document, undefined);
(function() {
  "use strict";

  window.filterUTImageData = function(post, data, filterData, callback) {
    if(!filterData || !filterData.parameters) {
      if(callback) {
        var tmp = new Image();
        tmp.onload = function() {
          callback($("<div>").css("background-image", "url(" + data.url + ")"), {w:this.width, h:this.height,d:data});
        };
        tmp.src = data.url;
      }
      return;
    }

    var getSaturationColorMatrix = function(s){
      s *= 1;
      var lumR = 0.3086;
      var lumG = 0.6094;
      var lumB = 0.0820;
      var sr = (1 - s) * lumR;
      var sg = (1 - s) * lumG;
      var sb = (1 - s) * lumB;
      var colorMatrix = [
        sr+s, sg,    sb,    0,   0,
        sr,   sg+s,  sb,    0,   0,
        sr,   sg,    sb+s,  0,   0,
        0,    0,     0,     1,   0
        //0,    0,     0,     0,   1
      ];
      return colorMatrix.join(' ');
    };

    var recalculateFilterStr = function(filter){
      var filterValues = {
        saturation: 0,
        gammaR:     0,
        gammaG:     0,
        gammaB:     0,
        vignette:   0
      };
      if(filter && filter.parameters) {
        filterValues = {
          saturation: getSaturationColorMatrix(filter.parameters.saturation),
          gammaR:     filter.parameters.gammaR,
          gammaG:     filter.parameters.gammaG,
          gammaB:     filter.parameters.gammaB,
          vignette:   filter.parameters.vignette
        };
      }
      var filtersStr =
        '<filter id="blackAndWhite" x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">' +
          '<feColorMatrix id="saturation-0" result="flt1" values="'+ filterValues.saturation+'"/>' +
          '<feComponentTransfer in="flt1" result="flt2">' +
          '<feFuncR type="gamma" id="redChannel-0"   amplitude="1.600000" exponent="1.300000" offset="'+ filterValues.gammaR+'"/>' +
          '<feFuncG type="gamma" id="greenChannel-0" amplitude="1.600000" exponent="1.300000" offset="'+ filterValues.gammaG+'"/>' +
          '<feFuncB type="gamma" id="blueChannel-0"  amplitude="1.600000" exponent="1.300000" offset="'+ filterValues.gammaB+'"/>' +
          '</feComponentTransfer>' +
          '</filter>';
      return filtersStr;
    };

    var onImageLoaded = function() {
      var ww = this.width;
      var hh = this.height;
      var flt = recalculateFilterStr(filterData);
      var svgText = '<svg class="ut-image-view" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ' + ww + ' ' + hh + '" enable-background="new 0 0 ' + ww + ' ' + hh + '" xml:space="preserve" preserveAspectRatio="none">' +
        '<defs>' + flt + '</defs>' +
        '<image filter="url(#blackAndWhite)" class="ut-image-view-svg-img" preserveAspectRatio="xMidYMid meet" width="' + ww + 'px" height="' + hh + 'px" xlink:href="{file}"/>' +
        '<g><radialGradient id="MyGradient"><stop offset="10%" stop-color="#000000" stop-opacity="0" /><stop offset="100%" stop-color="#000000" stop-opacity="'+filterData.parameters.vignette+'" id="vignette" /></radialGradient><ellipse fill="url(#MyGradient)" cx="50%" cy="50%" rx="100%" ry="100%"/></ellipse></g>' +
        '</svg>';

      data.svg(svgText.replace("{file}",""), 'image[xlink:href]');
      data.svg(function(svg, err) {
        post.save();
      });

      var isSupportFilter = !!(typeof(window.SVGFEColorMatrixElement) !== "undefined" && SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE === 2);
      if(isSupportFilter) {
        callback($(svgText.replace("{file}", data.url)), {w:ww, h:hh,d:data});
      } else {
        // Saturation is Parameter - 1 for filter SDK! 
        data.filter(
          [{
            filter: 'saturation',
            parameters: {
              strength: 1 - filterData.parameters.saturation
            }
          }, {
            filter: 'gammaRGB',
            parameters: {
              amplitudeR: 1.6,
              exponentR: 1.3,
              offsetR: filterData.parameters.gammaR,
              amplitudeG: 1.6,
              exponentG: 1.3,
              offsetG: filterData.parameters.gammaG,
              amplitudeB: 1.6,
              exponentB: 1.3,
              offsetB: filterData.parameters.gammaB
            }
          }, {
            filter: "vignette",
            parameters: {
              size: filterData.parameters.vignette/2,
              amount: 0.14,
              centerX: 0.5,
              centerY: 0.5,
              r: 0,
              g: 0,
              b: 0
            }
          }], function(filteredImageData) {
            setTimeout(function() {
              callback($("<div>").css("background-image", "url(" + filteredImageData.url + ")"), {w:ww, h:hh,d:data});
            }, 0);
          }
        );
      }
    };

    var img = new Image();
    img.onload = onImageLoaded;
    img.src = data.url;
  };

  window.filterUTImageDataView = function(data, callback) {
    var img = new Image();
    img.onload = function() {
      if(data.rasterUrl) {
        callback({obj:$("<div>").css("background-image", "url(" + this.src + ")"), w:this.width, h:this.height});
      } else if(data.svgTemplate && data.svgCssSelector) {
        var svg = data.svgTemplate.replace('<image ', '<image xlink:href="'+this.src+'" ');
        callback({obj:$(svg), w:this.width, h:this.height});
      } else {
        callback({obj:$("<div>").css("background-image", "url(" + this.src + ")"), w:this.width, h:this.height});
      }
    };
    img.src = data.rasterUrl || data.url;
  };
})();
/*
 * This source code is licensed under version 3 of the AGPL.
 *
 * Copyright (c) 2013 by urturn
 *
 * Addendum to the license AGPL-3:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */
/* global UT:true */
(function($, window, document, undefined) {
  "use strict";

  var methods = {
    nextPanelToAddImage: -1,
    init: function(options) {
      this.each(function() {
        if(this.utImage) {
          if(typeof(options) === "object") {
            this.utImage.options = $.extend(true, this.utImage.options, options);
            if(options && options.styles && options.styles.linkPosition) {
              this.utImage.options.styles.linkPosition = $.extend(true, {}, options.styles.linkPosition);
            }
            if(options && options.styles && options.styles.menuPosition) {
              this.utImage.options.styles.menuPosition = $.extend(true, {}, options.styles.menuPosition);
            }
            if(options.data) {
              this.utImage.firstTimeImageLoad();
            }
          }

          this.utImage.updateElement();
          this.utImage.createElements();
          this.utImage.resizeContainer();
          return;
        }

        var events = {
          ready: "utImage:ready",
          buttonClick: "utImage:buttonClick",
          mediaBeforeAdd: "utImage:mediaBeforeAdd",
          mediaAdd: "utImage:mediaAdd",
          mediaCrop: "utImage:mediaCrop",
          mediaRemove: "utImage:mediaRemove",
          mediaReady: "utImage:mediaReady",
          change: "utImage:change",
          focus: "utImage:focus",
          blur: "utImage:blur",
          destroy: "utImage:destroy",
          dialogOpen: "utImage:dialogOpen",
          dialogCancel: "utImage:dialogCancel",
          resize: "utImage:resize"
        };

        var defaults = {
          id: "",
          editable: true,
          ui: {
            add:true,
            edit:true,
            remove:true,
            source:false
          },
          type: "background", /* background, image, svg, canvas */
          data: null,
          autoSave: true,
          styles: {
            width: "auto",
            height: false,
            minHeight: undefined,
            maxHeight: undefined,
            minWidth: undefined,
            maxWidth: undefined,
            flexRatio: true,
            autoCrop: true,
            linkPosition: {}, // def: left:0, bottom:0;
            menuPosition: {}, // def: left:15, top:15
            filters: [],
            groupMode: false,
            autoResize: true,
            listenMedia: true,
            svgFilterName: "",
            svgFilterData: "",
            expandPreloader: false
          },
          i18n: {
            dialogLabel: undefined
          },
          dialog: {
            preferedFormat: false
          },
          reuse: false
        };

        var that = {};
        this.utImage = that;
        that.initialized = false;

        var $that = $(this);
        that.options = $.extend(true, defaults, options);
        that.isTouch = (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0));
        that.isEditMode = false;
        that.data = {
          pictureData: null,
          image: null,
          imageWidth: 0,
          imageHeight: 0,
          scrollTop: 0,
          scrollBottom: 0
        };
        that.view = {
          addButton: null,
          ctrlPanel: null,
          editButton: null,
          removeButton: null
        };

        /********************************************************************************
         * common
         ********************************************************************************/
        UT.Expression.ready(function(p) {
          that.post = p;
          that.isEditMode = p.context.editor;
          that.options.editable = that.isEditMode ? that.options.editable : false;
          if(that.initialized) {
            setTimeout(function() {
              $that.trigger(events.ready, { id:that.options.id, data:that.options.data || that.post.storage["utImage_" + that.options.id + "_img"] });
              if(that.options.styles.autoResize && that.post.storage["utImage_" + that.options.id + "_ratio"]) {
                var sz = {
                  width: $that.width(),
                  height: Math.round(that.width() / that.post.storage["utImage_" + that.options.id + "_ratio"]),
                  ratio: that.post.storage["utImage_" + that.options.id + "_ratio"]
                };
                if(sz.height !== $that.height()) {
                  $that.height(sz.height);
                  $that.trigger(events.resize, sz);
                }
              }
            }, 0);
            that.addMediaListener();
          }
          setTimeout(function() {
            $(".webdoc_expression_wrapper").on("touchmove", that.onTouchMove);
            that.post.on("scroll", that.onPostScroll);
          }, 0);
        });

        that.updateElement = function() {
          if(that.options.styles.groupMode) {
            $that.addClass("ut-image-in-group");
          } else {
            $that.removeClass("ut-image-in-group");
          }

          if($that.attr("id") === "" && that.options.id) {
            that.options.id = "image-" + UT.uuid();
          }
          if(that.options.id !== "") {
            $that.attr("id", that.options.id);
          } else {
            that.options.id = $that.attr("id");
          }
        };

        that.prepareElement = function(){
          $that.addClass("ut-image");
          that.updateElement();

          $that.on("click", function() {
            if(!$that.hasClass("ut-image-focus") || $that.hasClass("ut-image-inscroll")) {
              $that.removeClass("ut-image-inscroll");
              that.focus();
            } else if(that.options.styles.groupMode) { // && $(".ut-image").length <= 1
              that.blur();
            }
          });
        };

        that.createElements = function() {
          if(that.view.addButton) {
            that.view.addButton.remove();
            that.view.addButton = null;
          }
          if(that.view.ctrlPanel) {
            that.view.ctrlPanel.remove();
            that.view.ctrlPanel = null;
          }

          that.updateSourceLink();
          if(!that.options.editable) {
            $that.removeClass("ut-image-edit");
            return;
          }
          $that.addClass("ut-image-edit");

          if(that.options.ui.add) {
            that.view.addButton = $("<div>", {"class":"ut-image-button-add ut-button ut-media-button icon_camera"}).appendTo($that).html(i18n.get('add_image'));
            that.view.addButton.on("click",that.onAddButtonClick);
          }
          if(that.options.ui.edit || that.options.ui.remove) {
            that.view.ctrlPanel = $("<div>", {"class":"ut-image-control-panel"}).appendTo($that);
            if(that.options.ui.edit) {
              that.view.editButton = $("<div>", {"class":"ut-image-button-edit"}).appendTo(that.view.ctrlPanel);
              $("<span>").appendTo(that.view.editButton).html('<span class="icon_camera">&nbsp;</span>' + i18n.get('edit'));
              that.view.editButton.on("click", that.onEditButtonClick);
            }
            if(that.options.ui.remove) {
              that.view.removeButton = $("<div>", {"class":"ut-image-button-remove"}).appendTo(that.view.ctrlPanel);
              $("<span>").appendTo(that.view.removeButton).html('<span class="icon_trash"></span>');
              that.view.removeButton.on("click", that.onRemoveButtonClick);
            }
            if(typeof(that.options.styles.menuPosition.left) !== "undefined") {
              that.view.ctrlPanel.css({ "left":parseInt(that.options.styles.menuPosition.left ,10) + "px", "right":"auto" });
            } else if(typeof(that.options.styles.menuPosition.right) !== "undefined") {
              that.view.ctrlPanel.css({ "right":parseInt(that.options.styles.menuPosition.right ,10) + "px", "left":"auto" });
            } else {
              that.view.ctrlPanel.css({ "left":"15px", "right":"auto" });
            }
          }
          that.updateButtonsPosition();
        };

        that._onLinkTouch = function(event) {
          event.stopPropagation();
          if(that.data.srcLink.hasClass("showText")) {
            window.open(that.data.srcLink.attr("data-href"), "_blank");
          }
        };

        that._onImageTouch = function() {
          if(!that.data.srcLink.hasClass('show')) {
            $('.sourceLink').not(that.data.srcLink).removeClass('show').removeClass('showText');
            that.data.srcLink.addClass('show');
          } else {
            that.data.srcLink.removeClass('show').removeClass('showText');
          }
        };

        that._onIconTouch = function(event) {
          if(that.data.srcLink.hasClass('show')) {
            that.data.srcLink.addClass('showText');
            event.stopPropagation();
          }
        };

        that._onImageMouseEnter = function() {
          if(!that.data.srcLink.hasClass('show')) {
            that.data.srcLink.addClass('show');
          }
        };

        that._onImageMouseLeave = function() {
          that.data.srcLink.removeClass('show').removeClass('showText');
        };

        that._onLinkMouseEnter = function() {
          if(that.data.srcLink.hasClass('show')) {
            that.data.srcLink.addClass('showText');
          }
        };

        that._onLinkMouseLeave = function() {
          that.data.srcLink.removeClass('showText');
        };

        that._onLinkMouseClick = function(event) {
          if(that.data.srcLink.hasClass('showText')) {
            window.open(that.data.srcLink.attr('data-href'), '_blank');
          }
          event.stopPropagation();
          event.preventDefault();
        };

        that.updateSourceLink = function() {
          var removeLink = function() {
            if(that.data.srcLink) {
              if(that.isTouch) {
                that.data.srcLink.off('click', that._onLinkTouch);
                $that.find(".ut-image-source-link-icon").off('click', that._onIconTouch);
              } else {
                that.data.srcLink.off('mouseenter', that._onLinkMouseEnter).off('mouseleave', that._onLinkMouseLeave);
                that.data.srcLink.off('click', that._onLinkMouseClick);
              }
              that.data.srcLink.remove();
              that.data.srcLink = null;
            }
            if(that.isTouch) {
              $that.off('click', that._onImageTouch);
            } else {
              $that.off('mouseenter', that._onImageMouseEnter).off('mouseleave', that._onImageMouseLeave);
            }
          };
          removeLink();

          if(that.options.editable || !that.options.ui.source) {
            return;
          }
          if(!that.data.pictureData || !that.data.pictureData.info || !that.data.pictureData.info.source) {
            return;
          }

          var tmp = that.data.pictureData.info.source.match(/\/\/([^\/]+)\//i);
          if(!tmp || !tmp[0]) {
            tmp = that.data.pictureData.info.source.replace(/^http(s)?\:/i, "").match(/^([^\/]+)\//i);
            if(!tmp || !tmp[0]) {
              removeLink();
              return;
            }
          }

          var imgDomainName = (tmp[1] ? tmp[1] : tmp[0]).replace(/(^(\/\/)?www\.|\/)/g, "");
          if(imgDomainName.length <= 0 || imgDomainName.indexOf('urturn.com') !== -1) {
            removeLink();
            return;
          }

          var cLink = that.data.pictureData.info.source;
          if(!cLink.match(/^http\:\/\/|^https\:\/\/|^\/\//i)) {
            cLink = "//" + cLink;
          }

          if(!that.options.styles.linkPosition.direction) {
            if(
              (typeof(that.options.styles.linkPosition.left) !== "undefined" && parseInt(that.options.styles.linkPosition.left, 10) > ($that.width() / 2)) ||
              (typeof(that.options.styles.linkPosition.right) !== "undefined" && parseInt(that.options.styles.linkPosition.right, 10) < ($that.width() / 2))
                ) {
              that.options.styles.linkPosition.direction = "left";
            }
          }

          that.data.srcLink = $("<a>", {"class":"ut-image-source-link", "data-href":cLink}).appendTo($that);
          if(that.options.styles.linkPosition && that.options.styles.linkPosition.direction === "left") {
            that.data.srcLink.html('<span class="ut-image-source-link-text"><span><span>' + imgDomainName + '</span></span></span><span class="ut-image-source-link-icon icon_link"></span>');
            that.data.srcLink.addClass("left");
          } else {
            that.data.srcLink.html('<span class="ut-image-source-link-icon icon_link"></span><span class="ut-image-source-link-text"><span><span>' + imgDomainName + '</span></span></span>');
          }

          if(typeof(that.options.styles.linkPosition.top) !== "undefined") {
            that.data.srcLink.css("top", that.options.styles.linkPosition.top);
          } else if(typeof(that.options.styles.linkPosition.bottom) !== "undefined") {
            that.data.srcLink.css("bottom", that.options.styles.linkPosition.bottom);
          } else {
            that.data.srcLink.css("bottom", "0");
          }
          if(typeof(that.options.styles.linkPosition.left) !== "undefined") {
            that.data.srcLink.css("left", that.options.styles.linkPosition.left);
          } else if(typeof(that.options.styles.linkPosition.right) !== "undefined") {
            that.data.srcLink.css("right", that.options.styles.linkPosition.right);
          } else {
            that.data.srcLink.css("left", "0");
          }

          if(that.isTouch) {
            that.data.srcLink.on('click', that._onLinkTouch);
            $that.on('click', that._onImageTouch);
            $that.find(".ut-image-source-link-icon").on('click', that._onIconTouch);
          } else {
            $that.on('mouseenter', that._onImageMouseEnter).on('mouseleave', that._onImageMouseLeave);
            that.data.srcLink.on('mouseenter', that._onLinkMouseEnter).on('mouseleave', that._onLinkMouseLeave);
            that.data.srcLink.on('click', that._onLinkMouseClick);
          }

//          var checkSize =  function() {
//            var obj = $that.find('.ut-image-source-link-text');
//            if (obj.height() > 40) {
//              var text = obj.html();
//              text = text.substring(0, text.length - 1);
//              obj.html(text);
//              checkSize();
//            } else {
//              if (imgDomainName !== obj.html()) {
//                var tmp = obj.html();
//                tmp = tmp.substring(0, tmp.length - 3) + '...';
//                obj.html(tmp);
//              }
//            }
//          };
//          checkSize();
        };

        /**
         * retrieve size object for dialog
         * @returns {}
         */
        that.getSize = function(workData) {
          var options = {};
          if(typeof(workData.styles.width) === "undefined" || workData.styles.width === "auto") {
            options.width = $that.width();
            if(typeof(workData.styles.height) === "undefined" || workData.styles.height === "auto" || (workData.styles.height === false && workData.styles.flexRatio !== true)) {
              options.height = $that.height();
              if(that.post && (options.width <= 0 || options.height <= 0)) {
                options.width = $(that.post.node).width();
                options.height = $(that.post.node).height();
              }
            } else if(workData.styles.height !== false) {
              if(that.post && options.width <= 0) {
                options.width = $(that.post.node).width();
              }
              options.height = parseInt(workData.styles.height, 10);
            }
          } else if(workData.styles.width !== false) {
            options.width = parseInt(workData.styles.width, 10);
            if(typeof(workData.styles.height) === "undefined" || workData.styles.height === "auto" || (workData.styles.height === false && workData.styles.flexRatio !== true)) {
              if(that.post && $that.height() <= 0) {
                options.height = Math.floor(options.width * $(that.post.node).height() / $(that.post.node).width());
              } else {
                options.height = Math.floor(options.width * $that.height() / $that.width());
              }
            } else if(workData.styles.height !== false) {
              options.height = parseInt(workData.styles.height, 10);
            }
          }

          if(typeof(workData.styles.minHeight) !== "undefined") {
            options.minHeight = parseInt(workData.styles.minHeight, 10);
          }
          if(typeof(workData.styles.maxHeight) !== "undefined") {
            options.maxHeight = parseInt(workData.styles.maxHeight, 10);
          }
          if(typeof(workData.styles.minWidth) !== "undefined") {
            options.minWidth = parseInt(workData.styles.minWidth, 10);
          }
          if(typeof(workData.styles.maxWidth) !== "undefined") {
            options.maxWidth = parseInt(workData.styles.maxWidth, 10);
          }
          options.autoCrop = !!workData.styles.autoCrop;
          options.adaptUI = true; //!!workData.adaptUI;
          options.flexRatio = !!workData.styles.flexRatio;
          return options;
        };

        /**
         * processing click on "add" button
         * @param event
         */
        that.onAddButtonClick = function(event) {
          that.focus();
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "add");
          if(!ev.isDefaultPrevented()) {
            that.queryImage();
            event.stopPropagation();
            event.preventDefault();
          }
        };

        /**
         * processing click on "edit" button
         * @param event
         */
        that.onEditButtonClick = function(event) {
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "edit");
          if(!ev.isDefaultPrevented()) {
            that.focus();
            that.recropImage({autoCrop:false});
            event.stopPropagation();
            event.preventDefault();
          }
        };

        /**
         * processing click on "remove" button
         */
        that.onRemoveButtonClick = function() {
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "remove");
          if(!ev.isDefaultPrevented()) {
            that.queryImage();
//            that.removeImage();
          }
        };

        /**
         * prepare data and call API.dialog
         */
        that.queryImage = function(additionalData) {
          var options = {};
          var curData = $.extend(true, {}, that.options);
          curData = additionalData ? $.extend(true, curData, additionalData) : curData;
          options.size = that.getSize(curData);

          // add other parameters
          if(curData.styles.filters && curData.styles.filters.length > 0) {
            options.applyShaders = $.extend(true, [], curData.styles.filters);
          }

          options = $.extend(true, options, curData.dialog);

          if(curData.i18n.dialogLabel) {
            options.dialogLabel = curData.i18n.dialogLabel;
          }
          if(that.options.styles.expandPreloader) {
            that.showLoader();
          }
          $that.trigger(events.dialogOpen);
          that.post.dialog('image', options, function(data, error){
            if(error) {
              return;
            }
            if($.isEmptyObject(data) || !data.url) {
              that.hideLoader();
              $that.trigger(events.dialogCancel);
              return;
            }
            that.onImageAdded(data, false);
          }, function() {
            that.hideLoader();
            // error callback
            $that.trigger(events.dialogCancel, arguments);
          });
        };

        /**
         * show overlay with spin over image
         */
        that.showLoader = function() {
          var spin = $that.find(".ut-image-loading");
          if(spin && spin.length > 0) {
            return;
          }
          spin = $('<div class="ut-image-loading"></div>').appendTo($that).html('<div class="icon_spinner"></div>');
          $that.addClass("loading");
        };

        /**
         * hide overlay with spin over image
         */
        that.hideLoader = function() {
          var spin = $that.find(".ut-image-loading");
          if(spin && spin.length > 0) {
            spin.remove();
          }
          $that.removeClass("loading");
        };

        /**
         * build structure with sizes
         * @param imgSize - image size
         * @param contSize - container size
         * @returns {}
         */
        that.getImageSizeData = function(imgSize, contSize){
          return {
            width: imgSize.width,
            height: imgSize.height,
            containerWidth: contSize.width,
            containerHeight: contSize.height,
            desiredContainerWidth: Math.floor(imgSize.width*(contSize.height/imgSize.height)),
            desiredContainerHeight: Math.floor(imgSize.height*(contSize.width/imgSize.width))
          };
        };

        that.__setImage = function(imgData) {
          var tmp;
          if(typeof imgData === "undefined" || imgData === null || imgData === false) {
            if(that.options.type === "background") {
              tmp = $that[0].getAttribute("style") || "";
              tmp = tmp.replace(/background\-image\:([^\(;]+\([^\)]+\)+|[^;]*);?/ig, "");
              $that[0].setAttribute("style", tmp);
            } else if(that.options.type === "image") {
              $that.find(".ut-image-view").remove();
            } else if(that.options.type === "svg") {
              $that.find(".ut-image-view").remove();
            } else if(that.options.type === "canvas") {
              $that.find(".ut-image-view").remove();
            }
            $that.removeClass("ut-image-full");
          } else if(that.options.type === "background") {
            tmp = $that[0].getAttribute("style") || "";
            tmp = tmp.replace(/background\-image\:([^\(;]+\([^\)]+\)+|[^;]*);?/ig, "");
            $that[0].setAttribute("style", tmp + 'background-image:url("' + imgData.src + '")');
            $that.addClass("ut-image-full");
          } else if(that.options.type === "image") {
            $that.find(".ut-image-view").remove();
            $(imgData).addClass("ut-image-view").appendTo($that);
            $that.addClass("ut-image-full");
            that.__coverImage();
          } else if(that.options.type === "svg") {
            $that.find(".ut-image-view").remove();
            $that.append('<svg class="ut-image-view" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 ' + imgData.width + ' ' + imgData.height + '" enable-background="new 0 0 ' + imgData.width + ' ' + imgData.height + '" xml:space="preserve" preserveAspectRatio="none">' +
              '<defs>' + (that.options.styles.svgFilterData ? that.options.styles.svgFilterData : '') + '</defs>' +
              '<image ' + (that.options.styles.svgFilterName ? ('filter="url(#'+that.options.styles.svgFilterName+')" ') : '') + 'class="ut-image-view-svg-img" preserveAspectRatio="xMidYMid meet" width="' + imgData.width + 'px" height="' + imgData.height + 'px" xlink:href="' + imgData.src + '"/>' +
              '</svg>');
            $that.addClass("ut-image-full");
            that.__coverImage();
          }
        };

        that.__coverImage = function() {
          var obj = $that.find(".ut-image-view");
          if(obj.length <= 0) {
            return;
          }
          var ww = $that.width();
          var hh = $that.height();
          var sc = Math.max(ww/that.data.imageWidth, hh/that.data.imageHeight);
          var dx = (ww - that.data.imageWidth*sc)>>1;
          var dy = (hh - that.data.imageHeight*sc)>>1;
          obj.width((that.data.imageWidth*sc)|0).height((that.data.imageHeight*sc)|0);
          obj.css({"left":(dx|0)+'px', "top":(dy|0)+"px"});
        };

        /**
         * the image was added
         * @param data
         * @param isAfterRecrop
         */
        that.onImageAdded = function(data, isAfterRecrop) {
          if(!data) {
            return;
          }

          if(isAfterRecrop === false) {
            var ev = $.Event(events.mediaBeforeAdd);
            $that.trigger(ev, data);
            if(ev.isDefaultPrevented()) {
              return;
            }
          }

          if(!isAfterRecrop) {
            that.showLoader();
          }

          // loading and apply image
          var tmpImg = new Image();
          tmpImg.onload = function() {
            that.data.image = this;
            that.data.pictureData = data;
            that.options.data = data;
            that.data.imageWidth = tmpImg.width;
            that.data.imageHeight = tmpImg.height;
            that.saveData();

            that.__setImage(tmpImg);

            // inform about new image size
            that.hideLoader();
            that.updateSourceLink();
            var size = that.getImageSizeData({width:that.data.imageWidth, height:that.data.imageHeight}, {width:$that.width(), height:$that.height()});
            size.data = that.data.pictureData;
            if(isAfterRecrop === true || isAfterRecrop === false) {
              $that.trigger(isAfterRecrop ? events.mediaCrop : events.mediaAdd, size);
            }
            if(that.options.styles.autoResize) {
              that.resizeContainer();
            }
            $that.trigger(events.mediaReady, size);
            that.triggerChangeEvent();
          };
          tmpImg.onerror = function() {
            that.hideLoader();
          };
          tmpImg.src = data.url;
        };

        that.resizeContainer = function() {
          if(!that.options.styles.autoResize || !that.data.imageWidth || !that.data.imageHeight) {
            that.__coverImage();
            return;
          }

          // calculate new size
          var sz = {
            width: Math.round($that.width()),
            height: Math.round($that.width() * that.data.imageHeight / that.data.imageWidth),
            ratio: that.data.imageWidth / that.data.imageHeight
          };

          // resize object and dispatch event
          if(sz.width !== $that.width() || sz.height !== $that.height()) {
            $that.height(sz.height);
            that.updateButtonsPosition();
            that.__coverImage();
            $that.trigger(events.resize, sz);
          }
        };

        /**
         * call recrop function for image
         * @param params
         */
        that.recropImage = function(params) {
          if(!that.data.pictureData) {
            return;
          }

          var options = {};

          if(typeof(that.options.styles.width) === "undefined" || that.options.styles.width === "auto" || that.options.styles.width === false) {
            options.width = $that.width();
            if(typeof(that.options.styles.height) === "undefined" || that.options.styles.height === "auto" || that.options.styles.height === false) {
              options.height = $that.height();
              if(that.post && (options.width <= 0 || options.height <= 0)) {
                options.width = $(that.post.node).width();
                options.height = $(that.post.node).height();
              }
            } else {
              if(that.post && options.width <= 0) {
                options.width = $(that.post.node).width();
              }
              options.height = parseInt(that.options.styles.height, 10);
            }
          } else {
            options.width = parseInt(that.options.styles.width, 10);
            if(typeof(that.options.styles.height) === "undefined" || that.options.styles.height === "auto" || that.options.styles.height === false) {
              if(that.post && $that.height() <= 0) {
                options.height = Math.floor(options.width * $(that.post.node).height() / $(that.post.node).width());
              } else {
                options.height = Math.floor(options.width * $that.height() / $that.width());
              }
            } else {
              options.height = parseInt(that.options.styles.height, 10);
            }
          }

          if(typeof(that.options.styles.minHeight) !== "undefined") {
            options.minHeight = parseInt(that.options.styles.minHeight, 10);
          }
          if(typeof(that.options.styles.maxHeight) !== "undefined") {
            options.maxHeight = parseInt(that.options.styles.maxHeight, 10);
          }
          if(typeof(that.options.styles.minWidth) !== "undefined") {
            options.minWidth = parseInt(that.options.styles.minWidth, 10);
          }
          if(typeof(that.options.styles.maxWidth) !== "undefined") {
            options.maxWidth = parseInt(that.options.styles.maxWidth, 10);
          }
          options.autoCrop = !!that.options.styles.autoCrop;
          options.adaptUI = true; //!!tmpPrm.adaptUI;
          options.flexRatio = !!that.options.styles.flexRatio;

          options = $.extend(true, options, that.options.dialog);
          options = $.extend(true, options, params);

          if(that.options.styles.expandPreloader) {
            that.showLoader();
          }
          if(options.autoCrop !== true) {
            $that.trigger(events.dialogOpen);
          }
          that.post.dialog('crop',{'image':that.data.pictureData, 'size' : options}, function(data/*, error*/) {
            if($.isEmptyObject(data) || !data.url) {
              if(options.autoCrop !== true) {
                that.hideLoader();
                $that.trigger(events.dialogCancel);
              }
              return;
            }
            that.onImageAdded(data, true);
          }, function() {
            that.hideLoader();
            // error callback
            $that.trigger(events.dialogCancel, arguments);
          });
        };

        that.removeImage = function() {
          that.__setImage(null);
//          var tmp = $that[0].getAttribute("style") || "";
//          tmp = tmp.replace(/background\-image\:([^\(;]+\([^\)]+\)+|[^;]*);?/ig, "");
//          $that[0].setAttribute("style", tmp);
//          $that.removeClass("ut-image-full");
          that.data.pictureData = null;
          that.options.data = null;
          that.data.image = null;
          that.data.imageWidth = null;
          that.data.imageHeight = null;
          that.saveData();
          $that.trigger(events.mediaRemove);
          that.triggerChangeEvent();
        };

        /**
         * save image data to storage
         */
        that.saveData = function() {
          if(that.options.editable && that.options.autoSave) {
            that.post.storage["utImage_" + that.options.id + "_img"] = that.data.pictureData;
            that.post.storage["utImage_" + that.options.id + "_ratio"] = (that.data.pictureData && that.data.imageHeight ? that.data.imageWidth / that.data.imageHeight : null);
            that.post.save();
          }
        };

        /**
         * load image while component initializing
         */
        that.firstTimeImageLoad = function(withReuse) {
          var storageKey = "utImage_" + that.options.id + "_img";
          if(that.options.data && (typeof that.options.data === "string" || that.options.data.url)) {
            if(typeof(that.options.data) === "string") {
              that.options.data = { url:that.options.data };
            }
            that.onImageAdded(that.options.data);
          } else {
            var tmp = that.post.storage[storageKey];
            if(tmp && tmp.url) {
              that.options.data = tmp;
              that.onImageAdded(that.options.data);
            } else if(withReuse && (that.options.reuse || that.options.styles.reuse)) {
              if(that.post.collection('parent') && that.post.collection('parent')[storageKey]){
                that.options.data = that.post.collection('parent')[storageKey];
                that.onImageAdded(that.options.data);
              }
            } else {
              that.options.data = null;
            }
          }
        };

        that.onTouchMove = function() {
          $that.addClass("ut-image-inscroll");
        };

        /**
         * the post was scrolled
         * @param v {Object} - data with scroll paddings
         */
        that.onPostScroll = function(v) {
          that.data.scrollTop = parseInt(v.scrollTop, 10);
          that.data.scrollBottom = parseInt(v.scrollBottom, 10);
          that.updateButtonsPosition();
          $that.removeClass("ut-image-inscroll");
        };

        /**
         * update "add" and "edit" button position
         */
        that.updateButtonsPosition = function() {
          var fullHeight = $(that.post.node).height();
          var pos = $that.offset();
          pos.height = $that.height();
          pos.bottom = pos.top + pos.height;
          var tmp1 = Math.max(pos.top, that.data.scrollTop) - pos.top;
          var tmp2 = Math.max(fullHeight - pos.bottom, that.data.scrollBottom) - (fullHeight - pos.bottom);
          // to center
          if(that.view.addButton) {
            that.view.addButton.css("top", (tmp1 + (pos.height-tmp1-tmp2)/2) + "px");
          }
          if(that.view.ctrlPanel) {
            var topPos = 0;
            if(typeof(that.options.styles.menuPosition.top) !== "undefined") {
              topPos = (tmp1 + parseInt(that.options.styles.menuPosition.top, 10));
            } else if(typeof(that.options.styles.menuPosition.bottom) !== "undefined") {
              topPos = (pos.height - tmp2 - parseInt(that.options.styles.menuPosition.bottom, 10) - that.view.ctrlPanel.height());
            } else {
              topPos = (tmp1 + 15);
            }
            if(that.view.editButton) {
              if((topPos + that.view.editButton.height() / 2) > (tmp1 + $that.height() - tmp2) / 2) {
                that.view.editButton.addClass("top");
              } else {
                that.view.editButton.removeClass("top");
              }
            }
            that.view.ctrlPanel.css({"top": topPos + "px", "bottom":"auto"});
          }
        };

        that.addMediaListener = function() {
          if(methods.nextPanelToAddImage < 0 && that.options.styles.listenMedia) {
            var onMediaHandler = function(data) {
              var obj = $(that.post.node);
              var allPanels = obj.find(".ut-image");
              var tmp = null;
              for(var qq = 0; qq < allPanels.length; qq++) {
                var ww = (qq + methods.nextPanelToAddImage) % (allPanels.length);
                if(allPanels[ww] && allPanels[ww].utImage && (!allPanels[ww].utImage.data.pictureData || !allPanels[ww].utImage.data.pictureData.url)) {
                  tmp = allPanels[ww];
                  break;
                }
              }
              if(!tmp) {
                tmp = allPanels[(methods.nextPanelToAddImage++) % (allPanels.length)];
              }
              if(tmp) {
                tmp.utImage.onImageAdded.call(tmp, data, false);
              }
            };

            that.post.on('image', onMediaHandler);
            methods.nextPanelToAddImage = 0;
          }
        };

        that.getOptionsDifference = function(newOptions, oldOptions){
          var diff = {newValue:{},oldValue:{}};
          var noDiff = {newValue:undefined,oldValue:undefined};
          $.each(newOptions, function(i){
            if(!(newOptions[i] === oldOptions[i] || (typeof(newOptions[i]) === 'object' && typeof(oldOptions[i]) === 'object' && JSON.stringify(newOptions[i]) === JSON.stringify(oldOptions[i])))){
              diff.newValue[i] = newOptions[i];
              diff.oldValue[i] = oldOptions[i];
            }
          });
          return $.isEmptyObject(diff.newValue) ? noDiff : diff;
        };

        that.triggerChangeEvent = function(){
          var diff = that.getOptionsDifference(that.options, that.oldOptions);
          $that.trigger(events.change, [diff.newValue, diff.oldValue]);
          that.oldOptions = $.extend(true, {}, that.options);
        };

        /********************************************************************************
         * commands
         ********************************************************************************/
        that.hide = function() {
          $that.css("display", "none");
        };

        that.show = function() {
          $that.css("display", "");
        };

        that.focus = function() {
          if(!that.options.editable || $that.hasClass("ut-image-focus")) {
            return;
          }
          if(that.options.styles.groupMode) {
            $("body").find(".ut-image.ut-image-in-group").utImage("blur");
          }
          $that.addClass("ut-image-focus");
          $that.trigger(events.focus, that.options.id);
        };

        that.blur = function() {
          if(!$that.hasClass("ut-image-focus")) {
            return;
          }
          $that.removeClass("ut-image-focus");
          if(!that.options.editable) {
            return;
          }
          $that.trigger(events.blur, that.options.id);
        };

        that.destroy = function(){
          $that.trigger(events.destroy, that.options.id);
          if(that.options.editable && that.options.autoSave) {
            that.post.storage["utImage_" + that.options.id + "_img"] = null;
            that.post.storage["utImage_" + that.options.id + "_ratio"] = null;
            that.post.save();
          }
          $that.remove();
        };

        that.editable = function(data) {
          that.options.editable = data;
          that.createElements();
          if(!that.options.styles.groupMode) {
            that.focus();
          }
        };

        that.listenMedia =  function(isAllow) {
          if(isAllow) {
            that.options.styles.listenMedia = true;
            that.addMediaListener();
          } else {
            that.options.styles.listenMedia = false;
            that.post.off('media');
            that.post.off('image');
            methods.nextPanelToAddImage = -1;
          }
        };

        /********************************************************************************
         * init element
         ********************************************************************************/
        var isSetFocus = (jQuery(".ut-image").length <= 0);
        that.prepareElement();
        that.createElements();
        if(!that.options.styles.groupMode || isSetFocus) {
          that.focus();
        }
        that.firstTimeImageLoad(true);

        that.initialized = true;
        if(that.post) {
          setTimeout(function() {
            $that.trigger(events.ready, {id:that.options.id, data:that.options.data || that.post.storage["utImage_" + that.options.id + "_img"]});
            if(that.options.styles.autoResize && that.post.storage["utImage_" + that.options.id + "_ratio"]) {
              var sz = {
                width: $that.width(),
                height: Math.round($that.width() / that.post.storage["utImage_" + that.options.id + "_ratio"]),
                ratio: that.post.storage["utImage_" + that.options.id + "_ratio"]
              };
              if(sz.height !== $that.height()) {
                $that.height(sz.height);
                $that.trigger(events.resize, sz);
              }
            }
          }, 0);
          that.addMediaListener();
        }
        that.oldOptions = $.extend(true, {}, that.options);
      });
      return this;
    },

    show: function() {
      this.each(function() {
        if(this.utImage && this.utImage.show){
          this.utImage.show.call(this);
        }
      });
      return this;
    },

    hide: function() {
      this.each(function() {
        if(this.utImage && this.utImage.hide){
          this.utImage.hide.call(this);
        }
      });
      return this;
    },

    focus: function() {
      this.each(function() {
        if(this.utImage && this.utImage.focus){
          this.utImage.focus.call(this);
        }
      });
      return this;
    },

    blur: function() {
      this.each(function() {
        if(this.utImage && this.utImage.blur){
          this.utImage.blur.call(this);
        }
      });
      return this;
    },

    update: function(newParams) {
      methods.init.call(this, newParams);
      return this;
    },

    empty: function() {
      this.each(function() {
        if(this.utImage && this.utImage.removeImage){
          this.utImage.removeImage.call(this);
        }
      });
      return this;
    },

    remove: function() {
      return methods.destroy.apply(this);
    },

    destroy: function() {
      this.each(function() {
        if(this.utImage && this.utImage.destroy){
          this.utImage.destroy.call(this);
        }
      });
      return this;
    },

    data: function() {
      var res = null;
      if(this.length > 0) {
        if(this[0].utImage) {
          res = this[0].utImage.data.pictureData;
        }
      }
      return res;
    },

    image: function() {
      var res = null;
      if(this.length > 0) {
        if(this[0].utImage) {
          res = this[0].utImage.data.image;
        }
      }
      return res;
    },

    ratio: function() {
      var res = 0;
      if(this.length > 0) {
        if(this[0].utImage) {
          res = this[0].utImage.data.imageHeight > 0 ? (this[0].utImage.data.imageWidth/this[0].utImage.data.imageHeight) : 0;
        }
      }
      return res;
    },

    dialog: function(data) {
      if(this.length > 0) {
        if(this[0].utImage) {
          this[0].utImage.queryImage.call(this[0], data);
        }
      }
      return this;
    },

    crop: function(data) {
      if(this.length > 0) {
        if(this[0].utImage) {
          this[0].utImage.recropImage.call(this[0], data);
        }
      }
      return this;
    },

    editable: function(data) {
      this.each(function() {
        if(this.utImage && this.utImage.editable){
          this.utImage.editable.call(this, data);
        }
      });
      return this;
    },

    listenMedia: function(data) {
      this.each(function() {
        if(this.utImage && this.utImage.editable){
          this.utImage.listenMedia.call(this, data);
        }
      });
      return this;
    },

    showLoader: function() {
      this.each(function() {
        if(this.utImage && this.utImage.showLoader){
          this.utImage.showLoader.call(this);
        }
      });
      return this;
    },

    hideLoader: function() {
      this.each(function() {
        if(this.utImage && this.utImage.hideLoader){
          this.utImage.hideLoader.call(this);
        }
      });
      return this;
    }
  };

  $.fn.utImage = function(method) {
    if(typeof method === 'object' || !method) {
      methods.init.apply(this, arguments);
    } else if(methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      $.error('Method ' + method + ' does not exist on $.utImage');
    }
    return this;
  };
})(jQuery, window, document, undefined);

/*
 * This source code is licensed under version 3 of the AGPL.
 * Copyright (c) 2013 by webdoc SA
 * Addendum to the license AGPL-3:
 *
 * Can be used only in the context of urturn service such as creation of Expression,
 * improving the tools to create Expressions.
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function ($) {
  "use strict";
  var methods = {
    nextPlayerToAddSound: -1,

    init: function(options) {
      this.each(function() {
        var $that = $(this);
        var that = {};
        this.utAudio = that;

        var events = {
          ready: "utAudio:ready",
          change: "utAudio:change",
          buttonClick: "utAudio:buttonClick",
          mediaAdd: "utAudio:mediaAdd",
          mediaRemove: "utAudio:mediaRemove",
          mediaReady: "utAudio:mediaReady",
          timeUpdate: "utAudio:timeUpdate",
          play: "utAudio:play",
          pause: "utAudio:pause",
          stop: "utAudio:stop",
          finish: "utAudio:finish",
          seek: "utAudio:seek",
          error: "utAudio:error",
          dialogOpen: "utAudio:dialogOpen",
          dialogCancel: "utAudio:dialogCancel"
        };

        var defaults = {
          data: undefined,
          skin: 'bottom-over',
          id: false,
          ui: {
            play:    true,
            progress:true,
            time:    true,
            title:   true,
            source:  true,
            artwork: true
          },
          styles: {
            autoPause: true,
            listenMedia: true,
            staticLink: false
          },
          editable: true,
          i18n: {
            dialogLabel: undefined
          }
        };

        if(!that.post && UT && UT.Expression && UT.Expression.ready){
          UT.Expression.ready(function(post){
            that.post = post;
            if(that.initialized) {
              setTimeout(function() {
                $that.trigger(events.ready, {id:that.options.id, data:that.options.data});
              }, 0);
              that.addMediaListener();
            }
          });
        }

        that.options = $.extend(true, defaults, options);

        that.isTouch = (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0));
        that.sckey   = 'T8Yki6U2061gLUkWvLA';
        that.doNotMakeAnimationFlag = false;

        that.eventNS   = '';
        that.storageNS = 'utAudio_';
        that.stateNS   = "ut-audio-state";
        that.editableNS= "ut-audio-editable";
        that.uiNS      = "ut-audio-ui";
        that.modeNS    = "ut-audio-mode";
        that.skinNS    = "ut-audio-skin";
        that.serviceNS = "ut-audio-service";
        that.aspectNS  = "ut-audio-aspect";
        that.sizeNS    = "ut-audio-size";
        that.touchNS   = "ut-audio-touch";

        if(that.options.ui === false || that.options.ui === true){
          var v = that.options.ui;
          that.options.ui = {
            play:    v,
            progress:v,
            time:    v,
            title:   v,
            source:  v,
            artwork: v
          };
        }

        that.addMediaListener = function() {
          if(methods.nextPlayerToAddSound < 0 && that.options.styles.listenMedia) {
            that.post.on('sound',function(data) {
              var obj = $(that.post.node);
              var allPanels = obj.find(".ut-audio");
              var tmp = null;
              for(var qq = 0; qq < allPanels.length; qq++) {
                var ww = (qq + methods.nextPlayerToAddSound) % (allPanels.length);
                if(allPanels[ww] && allPanels[ww].utAudio && allPanels[ww].utAudio.options && !allPanels[ww].utAudio.options.data) {
                  tmp = allPanels[ww];
                  break;
                }
              }
              if(!tmp) {
                tmp = allPanels[(methods.nextPlayerToAddSound++) % (allPanels.length)];
              }
              if(tmp) {
                tmp.utAudio.options.data = data;
                tmp.utAudio.update();
              }
            });
            methods.nextPlayerToAddSound = 0;
          }
        };

        that.getOptionsDifference = function(newOptions, oldOptions) {
          var diff = {newValue:{},oldValue:{}};
          var noDiff = {newValue:undefined,oldValue:undefined};
          $.each(newOptions, function(i){
            if(!(newOptions[i] === oldOptions[i] || (typeof(newOptions[i]) === 'object' && typeof(oldOptions[i]) === 'object' && JSON.stringify(newOptions[i]) === JSON.stringify(oldOptions[i])))){
              diff.newValue[i] = newOptions[i];
              diff.oldValue[i] = oldOptions[i];
            }
          });
          return $.isEmptyObject(diff.newValue)?noDiff:diff;
        };

        that.triggerChangeEvent = function(){
          var diff = that.getOptionsDifference(that.options, that.oldOptions);
          $that.trigger(events.change, diff.newValue, diff.oldValue);
          that.oldOptions = $.extend(true, {}, that.options);
        };

        that.requestSoundcloudAboutAppData = function(url, callback) {
          var apiUrl = (document.location.protocol === 'https:' || (/^h ttps/i).test(url) ? 'https' : 'http') + '://api.soundcloud.com/resolve?url=' + url + '&format=json&consumer_key=' + that.sckey + '&callback=?';
          $.getJSON(apiUrl, function(data) {
            callback.call(this, data);
          });
        };

        that.requestItunesAboutAppData = function(url,callback) {
          var id = false;
          var parts = url.split('i=');
          if(parts[1]){
            id = parseInt(parts[1].split('&')[0].split('?')[0].split(':')[0],10);
          }

          var serchInStore = function(id, country, successCallback, errorCallback){
            var apiUrl = (document.location.protocol === 'https:' || (/^https/i).test(url) ? 'https' : 'http') + '://itunes.apple.com/lookup?media=music&country=' + country + '&id=' + id + '&callback=?';
            $.getJSON(apiUrl, function(data) {
              if(data && data.results && data.results[0]){
                successCallback.call(this, data.results[0]);
              } else {
                errorCallback.call(this, country);
              }
            });
          };

          var canNotFind = function(country){
            that.setState('error');
            if(console && console.warn){
              console.warn("utAaudio can't find the url=" + url + " with id=" + id + " in " + country + " itunes music store");
            }
          };

          var canFind = function(data){
            callback.call(this,data);
          };

          //here we search in UK and US stores

          serchInStore(id,'US',canFind,function(country){
            canNotFind(country);
            serchInStore(id,'GB',canFind,function(country){
              canNotFind(country);
            });
          });
        };

        that.setState = function(state) {
          that.currents.state = state;
          that.ui.container.removeClass().addClass(
            [
            that.uiNS,
            that.stateNS    + '-' + state,
            that.editableNS + '-' + ((that.options.editable && !that.post.context.player) ? "true" : "false"),
            (that.currents.serviceData?(that.serviceNS + "-" + that.currents.serviceData.service_name) : ""),
            that.skinNS     + '-' + that.options.skin,
            that.modeNS     + '-' +(that.post.context.player ? "player" : "editor"),
            that.aspectNS   + '-' + that.aspect,
            that.sizeNS     + '-' + that.size,
            that.touchNS    + '-' + (that.isTouch ? "true" : "false"),
            'ut-media-placeholder'
            ].join(' ')
            );
        };

        that.setPlayPos = function(ms, animationFlagSencitive) {
          if(that.doNotMakeAnimationFlag && animationFlagSencitive) {
            return false;
          }

          if(ms < 0 || !that.currents.serviceData) {
            return false;
          }

          if(ms > that.currents.serviceData.duration) {
            ms = that.currents.serviceData.duration;
          }

          if(that.ui.progress){
            that.ui.progress.find('.' + that.uiNS + '-progress-playing').css("width", ((ms / that.currents.serviceData.duration) * 100) + "%");
          }

          var timeInSeconds = Math.round(ms / 1000);
          if(ms > 0 || ms === -1){
            $that.trigger(events.timeUpdate, timeInSeconds);
          }

          if(that.currents.serviceData && that.currents.serviceData.duration) {
            var ts = '<span class="'+that.uiNS+'-progress-time-current">'+that.formatTime(ms) + '</span><span class="'+that.uiNS+'-progress-time-left">' + that.formatTime(that.currents.serviceData.duration) + '</span>';
            if(that.ui.time){
              that.ui.time.html(ts);
            }
          } else {
            if(that.ui.time){
              that.ui.time.html("");
            }
          }

          that.doNotMakeAnimationFlag = true;
          setTimeout(function(){
            if(that){
              that.doNotMakeAnimationFlag = false;
            }
          }, 1000);
          return true;
        };

        that.formatTime = function(ms) {
          var hms = {
            h: Math.floor(ms / (60 * 60 * 1000)),
            m: Math.floor((ms / 60000) % 60),
            s: Math.floor((ms / 1000) % 60)
          }, tc = [];
          if (hms.h > 0) {
            tc.push(hms.h);
          }
          tc.push((hms.m < 10 && hms.h > 0 ? '0' + hms.m : hms.m));
          tc.push((hms.s < 10 ? '0' + hms.s : hms.s));
          return tc.join(':');
        };

        that.updateUiContent = function() {
          var sed = that.currents.serviceData || {};

          if(that.ui.artwork && sed.artwork_url) {
            var img = new window.Image();
            img.onload = function(){
              that.ui.artwork.css("backgroundImage", "url(" + sed.artwork_url + ")");
            };
            img.src = sed.artwork_url;
          }

          if(that.ui.play) {
            that.ui.play.html('<span class="icon_spinner '+that.uiNS+'-seek-icon"></span><span class="icon_play '+that.uiNS+'-play-icon"></span><span class="icon_pause '+that.uiNS+'-pause-icon"></span>');
            that.ui.play.on('click',function() {
              if(that.currents.state !== 'launch' && that.currents.state !== 'finish' && that.currents.state !== 'pause'){
                that.utPause();
              } else {
                that.utPlay();
              }
            });
            that.ui.play.on('touchend',function(){});
            that.ui.play.on('touchstart',function(){});
          }

          if(that.ui.title) {
            that.ui.title.html(sed.title || '');
            that.ui.title.off('click').on('click', function (e) {
              e.stopPropagation();
            });
          }

          if(that.ui.error) {
            that.ui.error.html("<div>" + (that.options.i18n.error || "Error") + "</div>");
            that.ui.error.off('click').on('click', function (event) {
              event.stopPropagation();
              event.preventDefault();
              that.setState("launch");
            });
          }

          if(that.ui.progress) {
            that.ui.progress
            .html('<span class="'+that.uiNS+'-progress-playing"></span><span class="'+that.uiNS+'-progress-marker"><span class="'+that.uiNS+'-progress-marker-time"></span><span class="'+that.uiNS+'-progress-time">');
          }

          if(!that.isTouch && that.ui.progress) {
            that.ui.progress
            .off('mouseenter')
            .on('mouseenter', function(){
              if(that.currents.state === 'play' || that.currents.state === 'pause'){
                that.ui.progress.find('.'+that.uiNS+'-progress-marker').addClass(that.uiNS+'-progress-marker-visible');
              }
            })
            .off('mouseleave')
            .on('mouseleave', function(){
              that.ui.progress.find('.'+that.uiNS+'-progress-marker').removeClass(that.uiNS+'-progress-marker-visible');
            })
            .off('mousemove')
            .on('mousemove', function(e){
              var pos = e.pageX - that.ui.progress.offset().left;
              var time = (that.currents.serviceData.duration || 0)/that.ui.progress.width() * pos;
              that.ui.progress.find('.'+that.uiNS+'-progress-marker').css('left',pos + 'px');
              that.ui.progress.find('.'+that.uiNS+'-progress-marker-time').html(that.formatTime(time));
            });
          }

          var _seekPlay = function(e) {
            var oo = that.ui.progress.offset();
            var px = e.pageX ? e.pageX : (e.originalEvent && e.originalEvent.pageX ? e.originalEvent.pageX : (e.originalEvent.touches && e.originalEvent.touches[0] && e.originalEvent.touches[0].pageX ? e.originalEvent.touches[0].pageX : 0));
            var pos = (px - parseInt(oo.left, 10))/that.ui.progress.width();
            if(that.currents.state === 'play' || that.currents.state === 'pause'){
              $that.utAudioEngine("seek", pos);
            }
          };

          if(that.ui.progress){
            that.ui.progress.on("touchstart mousedown", function(e) {
              _seekPlay(e);
            });
          }

          if(that.ui.source) {
            that.ui.source
            .html('<span class="icon_'+sed.service_name +' '+that.uiNS+'-source-icon"></span>')
            .prop('target','_blank')
            .prop('title','listen on '+sed.service_name);
          }

          if(that.ui.source) {
            that.ui.source.prop('href',that.options.styles.staticLink ? that.options.styles.staticLink : sed.source);
          }

          that.setPlayPos(0);
        };

        that.getServiceName = function(){
          if(that.options.data && that.options.data.service) {
            return that.options.data.service;
          } else {
            if(that.options.data && that.options.data.url && that.options.data.url.toLowerCase().indexOf('soundcloud') !== -1) {
              return 'soundcloud';
            } else if(that.options.data && that.options.data.url && that.options.data.url.toLowerCase().indexOf('itunes.apple') !== -1) {
              return 'itunes';
            } else {
              var error = 'Something went wrong with defining service name that you want to play';
              console.error(error, that.options.data);
              that.setState('error', error);
              return false;
            }
          }
        };

        that.formatServiceData = function(data) {
          if (that.getServiceName() === 'soundcloud') {
            that.currents.serviceData = {
              title:       data.title,
              source:      data.permalink_url,
              artwork_url: (data.artwork_url ? data.artwork_url : '').replace(/\-large\./ig, "-t500x500."),
              duration:    data.duration
            };
          } else if(that.getServiceName() === 'itunes') {
            that.currents.serviceData = {
              title:       data.artistName + ' - ' + data.trackName,
              source:      data.trackViewUrl,
              artwork_url: (data.artworkUrl100 ? data.artworkUrl100 : '').replace("100x100","600x600"),
              duration:    30000
            };
          }
          that.currents.serviceData.service_name = that.getServiceName();
        };

        that.requestServiceData = function(callback) {
          var errorTimeOut = setTimeout(function(){
            if(that && (!that.currents || !that.currents.serviceData)){
              that.setState('error', i18n.get('error_timeout_sound'));
            }
          }, 15000);
          if(that.options.data.appData){
            clearTimeout(errorTimeOut);
            callback(that.options.data.appData);
          } else if (that.getServiceName() === 'soundcloud') {
            that.requestSoundcloudAboutAppData(that.options.data.url, function(data) {
              clearTimeout(errorTimeOut);
              callback(data);
            });
          } else if (that.getServiceName() === 'itunes') {
            that.requestItunesAboutAppData(that.options.data.url, function(data) {
              clearTimeout(errorTimeOut);
              callback(data);
            });
          }
        };

        that.setupServiceDataIntoPlayer = function(data) {
          var type, url;
          if (that.getServiceName() === 'soundcloud') {
            var uri = data.stream_url;// ? data.stream_url : data.uri;
            url = uri + (/\?/.test(uri) ? '&' : '?') + 'consumer_key=' + that.sckey;
            type = "mp3";
          } else {
            url = data.previewUrl;
            type = "m4a";
          }

          that.formatServiceData(data);

          that.utAudioEngineOptions = {
            duration: that.currents.serviceData && that.currents.serviceData.duration ? that.currents.serviceData.duration : false,
            url: url,
            type: type,
            autoPause: that.options.styles.autoPause,
            onReady: function() {
              that.setPlayPos(0);
            },
            onPlay: function() {
              that.setState('play');
              $that.trigger(events.play);
            },
            onPause: function() {
              that.setState('pause');
              $that.trigger(events.pause);
            },
            onStop: function() {
              that.setState('finish');
              $that.trigger(events.stop);
              that.setPlayPos(0);
            },
            onFinish: function() {
              that.setState('finish');
              $that.trigger(events.finish);
              that.setPlayPos(0);
            },
            onSeekStart: function() {
              if(that.currents.state !== "launch" && that.currents.state !== "finish" && that.currents.state !== "empty") {
                that.setState('seek');
                $that.trigger(events.seek);
              }
            },
            onSeekEnd: function() {
              if(that.currents.state !== "launch" && that.currents.state !== "finish" && that.currents.state !== "empty") {
                that.setState("play");
              }
            },
            onTimeUpdate: function(pos) {
              that.setPlayPos(pos, true);
            },
            onError: function(message) {
              $that.trigger(events.error, message);
              that.setState('error');
            }
          };

          that.updateUiContent();

          if($that.utAudioEngine) {
            that.setState('launch');
            $that.utAudioEngine(that.utAudioEngineOptions);
            setTimeout(function() {
              $that.trigger(events.mediaReady, that.currents.serviceData);
              that.triggerChangeEvent();
            }, 10);
          } else {
            that.setState("error", i18n.get('error_nolibrary_sound'));
          }
        };

        that.update = function(){
          that.currents = {
            id: that.options.id || $that.attr('id'),
            sourceEmbedData: null,
            state: 'loading'
          };

          $that.addClass("ut-audio");

          var storage_data = that.post.storage[that.storageNS+that.currents.id];
          if(storage_data && !that.options.data) {
            that.options.data = JSON.parse(storage_data);
          }

          if(typeof(that.options.data) === 'string') {
            that.options.data = {url:that.options.data};
          }

          if(!that.currents.id) {
            console.error('utAudio: Please specify an id of your audio container. Example: "<div id="myPlayer1"></div>"');
            return;
          } else if($('[id="'+that.currents.id+'"]').length > 1){
            console.error('utAudio: Your audio container should have unique id. Now, more then one element have id = ',that.currents.id);
            return;
          }

          if($that.utAudioEngine) {
            that.utStop();
          }

          that.ui = {};
          if($that.css('position') !== "relative" && $that.css('position') !== "absolute"){
            $that.css('position','relative');
            if(console && console.warn) {
              console.warn('Your container (id='+that.currents.id+') css position was set as "relative" as requirement of utAudio component. You can set it "absolute" or "relative" in the css to avoid this warning in console');
            }
          }
          $that.find('.'+that.uiNS).remove();
          that.ui.container = $('<div class="'+that.uiNS+'"></div>').appendTo($that);
          that.ui.error     = $('<div class="'+that.uiNS+'-error"></div>').appendTo(that.ui.container);
          that.ui.loading   = $('<div class="'+that.uiNS+'-loading"></div>').append('<div class="icon_spinner '+that.uiNS+'-error-icon"></div>').appendTo(that.ui.container);
          if(that.options.ui.artwork)  { that.ui.artwork  = $('<div class="'+that.uiNS+'-artwork">'      ).appendTo(that.ui.container);}
          if(that.options.ui.title)    { that.ui.title    = $('<div class="'+that.uiNS+'-title">'        ).appendTo(that.ui.container);}
          if(that.options.ui.play)     { that.ui.play     = $('<div class="'+that.uiNS+'-play needsclick">'         ).appendTo(that.ui.container);}
          if(that.options.ui.progress) { that.ui.progress = $('<div class="'+that.uiNS+'-progress">'     ).appendTo(that.ui.container);}
          if(that.options.ui.time)     { that.ui.time     = $('<div class="'+that.uiNS+'-time">'         ).appendTo(that.ui.container);}
          if(that.options.ui.source)   { that.ui.source   = $('<a class="'+that.uiNS+'-source">'         ).appendTo(that.ui.container);}
          if(that.options.editable) {
            that.ui.add     = $('<a class="'+that.uiNS+'-add icon_sound ut-media-button ut-button"></a>')
                                .html(i18n.get('add_sound'))
                                .appendTo(that.ui.container)
                                .on('click', that.onAddClick);
            that.ui.remove  = $('<a class="'+that.uiNS+'-remove icon_trash"></a>')
                                .html("")
                                .appendTo(that.ui.container)
                                .on('click', that.onRemoveClick);
          }

          that.aspect = 'square'; //TODO - make it more clear
          if($that.width() > $that.height()*1.25) { that.aspect = 'horizontal'; }
          if($that.width()*1.25 < $that.height()) { that.aspect = 'vertical'; }

          that.size = 'middle'; //TODO - make it more clear
          if($that.width() > 300 || $that.height() > 300)   { that.size = 'big'; }
          if($that.width() <= 200 || $that.height() <= 200) { that.size = 'small'; }

          if(that.post) {
            that.post.on('pause',that.utPause);
          }

          if(that.options.data && (that.options.data.appData || that.options.data.url)) {
            that.setState("loading");
            that.requestServiceData(that.setupServiceDataIntoPlayer);
          } else {
            that.setState("empty");
          }
        };

        that.onAddClick = function(event) {
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "add");
          if(!ev.isDefaultPrevented()) {
            that.utDialog({});
            event.stopPropagation();
            event.preventDefault();
          }
        };

        that.onRemoveClick = function(event) {
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "remove");
          if(!ev.isDefaultPrevented()) {
            event.stopPropagation();
            event.preventDefault();
            that.utDialog({});
          }
        };

        that.utEmpty = function() {
          that.post.storage[that.storageNS+that.currents.id] = null;
          that.post.save();
          that.options.data = null;
          that.update();
        };

        that.utPlay = function(v) {
          that.setState("seek");
          if($that.utAudioEngine) {
            $that.utAudioEngine("play", v);
          }
        };

        that.utPause = function() {
          if($that.utAudioEngine) {
            $that.utAudioEngine("pause");
          }
        };

        that.utStop = function() {
          if($that.utAudioEngine) {
            $that.utAudioEngine("stop");
          }
          that.setPlayPos(-1);
        };

        that.utVolume = function(v) {
          if($that.utAudioEngine) {
            $that.utAudioEngine("volume", v);
          }
        };

        that.utDestroy = function() {
          that.post.storage[that.storageNS+that.currents.id] = null;
          that.post.save();
          $that.empty();
          that = null;
        };

        that.utUpdate = function() {
          that.update();
        };

        that.utDialog = function(opt) {
          var options = {
            inputTypes: ['search'],
            label: that.options.i18n.dialogLabel
          };
          if(!$.isEmptyObject(opt)) {
            options = $.extend(true, options, opt);
          }

          $that.trigger(events.dialogOpen);
          that.post.dialog("sound", options, function(data) {
            if(!data){
              $that.trigger(events.dialogCancel);
            } else {
              that.options.data = data;
              that.update();
              that.post.storage[that.storageNS+that.currents.id] = JSON.stringify(data);
              that.post.save();
              $that.trigger(events.mediaAdd);
            }
          }, function(){
            $that.trigger(events.dialogCancel);
          });
        };

        that.listenMedia = function(isAllow) {
          if(isAllow) {
            that.options.styles.listenMedia = true;
            that.addMediaListener();
          } else {
            that.options.styles.listenMedia = false;
            that.post.off('sound');
            methods.nextPlayerToAddSound = -1;
          }
        };

        that.oldOptions = $.extend(true, {}, that.options);
        that.update();

        that.initialized = true;
        if(that.post) {
          setTimeout(function() {
            $that.trigger(events.ready, {id:that.options.id, data:that.options.data});
          }, 0);
          that.addMediaListener();
        }
      });
      return this;
    },

    empty: function() {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utEmpty.call(this);
        }
      });
      return this;
    },

    play: function(v) {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utPlay.call(this,v);
        }
      });
      return this;
    },

    pause: function() {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utPause.call(this);
        }
      });
      return this;
    },

    stop: function() {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utStop.call(this);
        }
      });
      return this;
    },

    volume: function(v) {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utVolume.call(this,v);
        }
      });
      return this;
    },

    update: function() {
      this.each(function() {
        if(this.utAudio && this.utAudio.utUpdate){
          this.utAudio.utUpdate.call(this);
        }
      });
      return this;
    },

    remove: function() {
      methods.destroy.apply(this, arguments);
    },

    destroy: function() {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utDestroy.call(this);
        }
      });
      return this;
    },

    dialog: function(options) {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.utDialog.call(this, options);
        }
      });
      return this;
    },

    listenMedia: function(isAllow) {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.listenMedia.call(this, isAllow);
        }
      });
      return this;
    }
  };

  $.fn.utAudio = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on $.utAudio');
    }
    return this;
  };
})(window.$ || window.Zepto || window.jq);

/*
 * This source code is licensed under version 3 of the AGPL.
 * Copyright (c) 2013 by webdoc SA
 * Addendum to the license AGPL-3:
 *
 * Can be used only in the context of urturn service such as creation of Expression,
 * improving the tools to create Expressions.
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function ($) {
  "use strict";

  var methods = {
    init: function(options) {
      this.each(function() {
        var defaults = {
          path: "http://ds4kgpk6gzsw2.cloudfront.net/expression/lib/urturn-expression-api/0.9.2/components/jquery.ut-audio/swf/",
          url: null,
          type: "mp3",
          duration: false,
          startBuffering: (window.navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? false : true),
          autoPlay: false,
          debug: false,
          autoPause: true,
          createPlayerBeforePlaying:true,//(window.navigator.userAgent.match(/(iPad|iPhone|iPod|android)/g) ? false : true),
          onReady:      function(){},
          onPlay:       function(){},
          onPause:      function(){},
          onStop:       function(){},
          onFinish:     function(){},
          onTimeUpdate: function(){},
          onSeekStart:  function(){},
          onSeekEnd:    function(){},
          onError:      function(){}
        };

        var $that = $(this);
        var that = {};
        this.utAudioEngine = that;
        that.options = $.extend(true, defaults, options);

        that.trackDuration = that.options.duration ? that.options.duration : 0 ;

        that.flagPlayerInitializing = false;
        that.flagPlayerInited = false;
        that.flagLoadedData = false;
        that.flagPlaying = false;

        that.globalUtAudioPauseEvent = "globalUtAudioPauseEvent";
        that.uid = Math.ceil((Math.random() * 1000000000)) + new Date().getTime();

        that.player = $("<div style='opacity: 0;'></div>").appendTo($that);
        /********************************************************************************
         * control functions
         ********************************************************************************/
        that.doOnCanPlay = function(){};
        that.doOnReady = function(){};

        that.initPlayer = function() {
          that.player.jPlayer({
            supplied: "mp3,m4a",
            swfPath: that.options.path,
            errorAlerts: false,
            warningAlerts: false,
            preload: that.options.startBuffering,
           // waitForPlay: false,
            ready: function(e) {
              that.environment = {
                flash:e.jPlayer.flash.used,
                html:e.jPlayer.html.used
              };
              that.flagPlayerReady = true;
              that.loadTrack(that.options.url);
              if(that.environment.flash){
                that.player.jPlayer('play');
              } else {
                that.doOnCanPlay = function(){
                  that.player.jPlayer('play');
                };
              }
              that.options.onReady();
            },
            loadeddata: function() {
              that.flagLoadedData = true;
            },
            progress:function(){
            },
            canplay:function(){
              that.flagCanPlay = true;
              if(that.flagPlaying) { //this
                setTimeout(function(){
                  that.doOnCanPlay(); // speciallly for ios
                }, 100);
              }
              that.options.onSeekEnd();
            },
            canplaythrough: function() {
            },
            seeking:function(){
              that.options.onSeekStart();

            },
            seeked:function(){
              that.options.onSeekEnd();
            },
            play: function() {
              that.flagPlaying = true;
              that.options.onPlay();
            },
            pause: function(e) {
              that.flagPlaying = false;
              if(e.jPlayer.status.currentTime === 0) {
                that.options.onStop();
              } else {
                that.options.onPause();
              }
            },
            ended: function() {
              that.flagPlaying = false;
              that.options.onFinish();
            },
            timeupdate: function(e){
              var time = e.jPlayer.status;
              if(that.trackDuration > 0) {
                var relative = that.trackDuration * 1000 > 0 ? (time.currentTime / that.trackDuration) : 0;
                that.options.onTimeUpdate(time.currentTime * 1000, relative, that.trackDuration * 1000);
              }
            },
            error: function(e) {
              that.flagPlaying = false;
              that.options.onError('error',e);
            }
          });
          that.flagPlayerInited = true;
        };

        that.play = function(v) {

          if(!that.flagPlayerInited) {
            that.options.onSeekStart();
            if(!that.options.createPlayerBeforePlaying) {
              that.initPlayer();
            }
          }
          if(that.flagPlayerReady){
            if(that.environment.flash){
              that.player.jPlayer('play',v);
            } else {
              if(that.flagCanPlay){
                that.player.jPlayer('play',v);
              } else {
                that.player.find('audio')[0].play();
              }
            }
          }
          that.flagPlaying = true;
          $('body').trigger(that.globalUtAudioPauseEvent, that.uid);
        };

        $('body').on(that.globalUtAudioPauseEvent, function(e, uid){
          if(that.uid === uid || !that.options.autoPause) {
            return;
          }
          that.pause();
        });

        that.pause = function() {
          that.flagPlaying = false;
          //that.options.onPause();
          if(that.flagSetMedia){
            that.player.jPlayer('pause');
          }
        };

        that.stop = function() {
          that.flagPlaying = false;
          if(that.flagPlayerInited){
            that.player.jPlayer('stop');
          }
        };

        that.volume = function(v) {
          that.player.jPlayer('volume',v);
        };

        that.seek = function(pos) {
          var time =that.trackDuration ? (pos * that.trackDuration/1000) : 0;
          setTimeout(function(){ that.player.jPlayer('play',time);}, 100);
        };

        that.loadTrack = function(url) {
          if(that.options.type === "m4a") {
            that.player.jPlayer("setMedia", {m4a:url});
          } else {
            that.player.jPlayer("setMedia", {mp3:url});
          }
          that.flagSetMedia = true;
        };

        that.killallhumans = function (){
          that.player.jPlayer("destroy");
        };

        if(that.options.createPlayerBeforePlaying){
          that.initPlayer();
          //this.utAudioEngine.stop();
        }


        /********************************************************************************
         * init player
         ********************************************************************************/
      });
      return this;
    },

    play: function(v) {
      this.each(function() {
        if(this.utAudioEngine && this.utAudioEngine.play) {
          this.utAudioEngine.play.call(this,v);
        }
      });
      return this;
    },

    pause: function() {
      this.each(function() {
        if(this.utAudioEngine && this.utAudioEngine.pause) {
          this.utAudioEngine.pause.call(this);
        }
      });
      return this;
    },

    stop: function() {
      this.each(function() {
        if(this.utAudioEngine && this.utAudioEngine.stop) {
          this.utAudioEngine.stop.call(this);
        }
      });
      return this;
    },

    seek: function (pos) {
      this.each(function () {
        if(this.utAudioEngine && this.utAudioEngine.seek) {
          this.utAudioEngine.seek.call(this,  pos);
        }
      });
      return this;
    },

    volume: function (v) {
      this.each(function () {
        if(this.utAudioEngine && this.utAudioEngine.volume) {
          this.utAudioEngine.volume.call(this, v);
        }
      });
      return this;
    },

    // loadTrack: function(url) {
    //   this.each(function () {
    //     if(this.utAudioEngine && this.utAudioEngine.loadTrack) {
    //       this.utAudioEngine.loadTrack.call(this, url);
    //     }
    //   });
    //   return this;
    // },

    killallhumans: function(data) {
      this.each(function () {
        if(this.utAudioEngine && this.utAudioEngine.killallhumans) {
          this.utAudioEngine.killallhumans.call(this, data);
        }
      });
      return this;
    }
  };

  $.fn.utAudioEngine = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on $.utAudioEngine');
    }
    return this;
  };

})(window.$ || window.Zepto || window.jq);

/*
 * This source code is licensed under version 3 of the AGPL.
 *
 * Copyright (c) 2013 by urturn
 *
 * Addendum to the license AGPL-3:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function ($) {
  "use strict";

  var methods = {
    nextPlayerToAddVideo: -1,

    init: function(opts) {
      this.each(function () {
        var $that = $(this);
        var that = {};
        this.utVideo = that;

        var events = {
          ready: "utVideo:ready",
          buttonClick: "utVideo:buttonClick",
          mediaAdd: "utVideo:mediaAdd",
          mediaRemove: "utVideo:mediaRemove",
          mediaReady: "utVideo:mediaReady",
          play: "utVideo:play",
          pause: "utVideo:pause",
          stop: "utVideo:stop",
          finish: "utVideo:finish",
          destroy: "utVideo:destroy",
          change: "utVideo:change",
          error: "utVideo:error",
          dialogOpen: "utVideo:dialogOpen",
          dialogCancel: "utVideo:dialogCancel"
        };

        var defaults = {
          id: false,
          data: undefined,
          editable: true,
          ui:{
            artwork:   true,
            loading:   true,
            play:      true,
            title:     true,
            source:    true,
            playing:   true
          },
          styles: {
            skin:'default',
            autoPause: true,
            listenMedia: true
          }
        };

        if(!that.post && UT && UT.Expression && UT.Expression.ready) {
          UT.Expression.ready(function(post) {
            that.post = post;
            if(that.initialized) {
              setTimeout(function() {
                $that.trigger(events.ready, {id:that.options.id, data:that.options.data});
              }, 0);
              that.addMediaListener();
            }
          });
        }

        that.isTouch = (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0));
        that.options = $.extend(true, defaults, opts);
        that.canplay = false;

        that.eventNS   = 'utVideo:';
        that.storageNS = 'utVideo_';
        that.stateNS   = "ut-video-state";
        that.editableNS= "ut-video-editable";
        that.uiNS      = "ut-video-ui";
        that.modeNS    = "ut-video-mode";
        that.skinNS    = "ut-video-skin";
        that.serviceNS = "ut-video-service";
        that.aspectNS  = "ut-video-aspect";
        that.sizeNS    = "ut-video-size";
        that.touchNS   = "ut-video-touch";

        if(that.options.ui === false || that.options.ui === true){
          var v = that.options.ui;
          that.options.ui = {
            artwork:  v,
            loading:  v,
            play:     v,
            title:    v,
            source:   v,
            playing:  v
          };
        }

        that.addMediaListener = function() {
          if(methods.nextPlayerToAddVideo < 0 && that.options.styles.listenMedia) {
            that.post.on('video',function(data) {
              var obj = $(that.post.node);
              var allPanels = obj.find(".ut-video");
              var tmp = null;
              for(var qq = 0; qq < allPanels.length; qq++) {
                var ww = (qq + methods.nextPlayerToAddVideo) % (allPanels.length);
                if(allPanels[ww] && allPanels[ww].utVideo && allPanels[ww].utVideo.options && !allPanels[ww].utVideo.options.data) {
                  tmp = allPanels[ww];
                  break;
                }
              }
              if(!tmp) {
                tmp = allPanels[(methods.nextPlayerToAddVideo++) % (allPanels.length)];
              }
              if(tmp) {
                tmp.utVideo.options.data = data;
                tmp.utVideo.update();
              }
            });
            methods.nextPlayerToAddVideo = 0;
          }
        };

        that.getOptionsDifference = function(newOptions, oldOptions){
          var diff = {newValue:{},oldValue:{}};
          var noDiff = {newValue:undefined,oldValue:undefined};
          $.each(newOptions, function(i){
            if(!(newOptions[i] === oldOptions[i] || (typeof(newOptions[i]) === 'object' && typeof(oldOptions[i]) === 'object' && JSON.stringify(newOptions[i]) === JSON.stringify(oldOptions[i])))){
              diff.newValue[i] = newOptions[i];
              diff.oldValue[i] = oldOptions[i];
            }
          });
          return $.isEmptyObject(diff.newValue)?noDiff:diff;
        };

        that.triggerChangeEvent = function(){
          var diff = that.getOptionsDifference(that.options, that.oldOptions);
          $that.trigger(events.change, [diff.newValue, diff.oldValue]);
          that.oldOptions = $.extend(true, {}, that.options);
        };

        /************************************************************/
        /* video.embedProcessor start
        /************************************************************/
        var embedProcessor = {
          debug:false,
          defaultWorker:'embedly',
          getVideoPlayerParameters:function (url, appData, options, callback) {
            var param = {};
            if (url.indexOf('youtu.be/') !== -1) {
              url = '//youtube.com?v=' + url.split('youtu.be/')[1];
            } // fix for short youtube url format

            param.url = url;
            param.appData = appData;
            param.source = this._getSourceNameByUrl(url);
            param.options = options;
            that.autoplay = !that.isTouch;

            if (!this._sources[param.source]) {
              param.worker = this.defaultWorker;
            } else {
              param.worker = this._sources[param.source].worker;
            }

            this._workers[param.worker](param, options, callback);
          },

          embedVideoByParameters:function (param, options) {
            if (param.url && param.status) {
              if (this._sources[param.source] && this._sources[param.source].embedVideo && typeof(this._sources[param.source].embedVideo) === 'function') {
                this._sources[param.source].embedVideo(param, options);
              } else {
                that.ui.video.html(param.html);
              }
            }
          },

          _sources:{
            'youtube':{
              urlPart:'youtube.com',
              worker:'youtube',
              getVideoId:function (url) {
                var id = '';
                if (url.indexOf("#") >= 0){
                  url = url.substr(0, url.indexOf("#"));
                }
                if (url.indexOf('v=') !== -1) {
                  id = url.split('v=')[1].split('&')[0];
                } else if (url.indexOf('video_ids=') !== -1) {
                  var ids = url.split('video_ids=')[1].split('%2C');
                  var index = (url.indexOf('index=') !== -1) ? url.split('index=')[1].split('&')[0] : 0;
                  id = ids[index].split('&')[0];
                } else if (url.indexOf('v%3D') !== -1) {
                  id = url.split('v%3D')[1].split('&')[0];
                } else {
                  var urlParts = url.split('/');
                  id = urlParts[urlParts.length - 1];
                }
                return id;
              },

              prepareEmbedCode:function (param) {
                param.id = this.getVideoId(param.url);
                return param;
              },

              embedVideo:function (param) {
                var container = that.ui.video.empty();
                var id = 'iframe_' + that.currents.id;
                $('<div id="' + id + '" width="100%" height="100%" frameborder="0"></div>').appendTo(container);
                function initYTPlayer() {
                  window.youtubeApiReady = true;

                  that.onPlayerReady = function(event) {
                    player.addEventListener('onStateChange', that.onPlayerStateChange);
                    if(!that.isTouch) {
                      event.target.playVideo();
                    }
                  };

                  that.onPlayerStateChange = function(event) {
                    if (event.data === window.YT.PlayerState.PLAYING) {
                      that.pauseOtherPlayers();
                      $that.trigger(events.play);
                    }

                    if (event.data === window.YT.PlayerState.ENDED) {
                      if(!that.isTouch){
                        that.utStop();
                        player.stopVideo();
                        player.destroy();
                        player = null;
                      }
                      $that.trigger(events.finish);
                    }

                    if (event.data === window.YT.PlayerState.PAUSED) {
                      $that.trigger(events.pause);
                      that.setState("pause");
                    }

//                    if (event.data === window.YT.PlayerState.BUFFERING) {}
                  };


                  var playerVars = that.options.ui.playing?{}:{controls:0,showinfo:0};
                  playerVars.rel = 0;

                  var player = new window.YT.Player(id, {
                    height:'100%',
                    width:'100%',
                    videoId: param.id,
                    playerVars: playerVars,
                    events:{'onReady':that.onPlayerReady}
                  });

                  container.off('continueAfterPause pauseVideo')
                  .on('continueAfterPause',function () {
                    player.playVideo();
                  }).on('pauseVideo', function () {
                    player.pauseVideo();
                  });
                }

                if (!window.youtubeApiReady) {
                  var tag = document.createElement('script');
                  tag.src = "//www.youtube.com/iframe_api";
                  var firstScriptTag = document.getElementsByTagName('script')[0];
                  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                } else {
                  initYTPlayer();
                }

                window.onYouTubeIframeAPIReady = function () {
                  initYTPlayer();
                };

              }
            },

            'vimeo':{
              urlPart:'vimeo.com',
              worker:'vimeo',
              getVideoId:function (url) {
                if (url.indexOf("#") >= 0){
                  url = url.substr(0, url.indexOf("#"));
                }
                return url.split('vimeo.com/')[1].split('/')[0].split('&')[0];
              },
              prepareEmbedCode: function(param) {
                return param;
              },

              embedVideo: function(param) {
                var container = that.ui.video.empty();
                var id = 'iframe_' + that.currents.id;
                var src = '//player.vimeo.com/video/' + this.getVideoId(param.url) + (that.autoplay ? '?autoplay=1&' : '?') + ' api=1&player_id=' + id;
                // src="'+src+'"
                var iframe = $('<iframe  id="' + id + '" allowfullscreen="1" width="100%" height="100%" frameborder="0"></iframe>').appendTo(container)[0];
                iframe.src = src;

                function ready(playerID) {
                  window.Froogaloop(playerID).addEvent('play', function () {
                    that.pauseOtherPlayers();
                    $that.trigger(events.play);
                  });

                  window.Froogaloop(playerID).addEvent('finish', function () {
                    $that.trigger(events.finish);
                    if(!that.isTouch){
                      that.utStop();
                    }
                  });

                  window.Froogaloop(playerID).addEvent('pause', function () {  //paleyerId
                    $that.trigger(events.pause);
                    that.setState("pause");
                  });

                  container.off('continueAfterPause pauseVideo').on('continueAfterPause',function () {
                    window.Froogaloop(playerID).api('play');
                  }).on('pauseVideo', function () {
                    window.Froogaloop(playerID).api('pause');
                  });
                }
                window.Froogaloop(iframe).addEvent('ready', ready);
              }
            },

            'dailymotion':{
              getVideoId:function (url) {
                var id;
                if (url.indexOf("#") >= 0) {
                  url = url.substr(0, url.indexOf("#"));
                }
                if (url.indexOf('request=%2F') !== -1) {
                  id = url.split('request=%2F')[1].split('video%2F')[1].split('_')[0];
                } else {
                  id = url.substr(url.lastIndexOf("/") + 1, url.length).split('_')[0];
                }
                return id;
              },
              urlPart:'dailymotion.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                var id = this.getVideoId(param.url);
                param.html = '<iframe frameborder="0" allowfullscreen="1" width="100%" height="100%" src="//www.dailymotion.com/embed/video/' + id + '"></iframe>';
                return param;
              },
              embedVideo:function (param) {
                var container = that.ui.video.empty();
                // This code loads the Dailymotion Javascript SDK asynchronously.
                (function () {
                  var e = document.createElement('script');
                  e.async = true;
                  e.src = document.location.protocol + '//api.dmcdn.net/all.js';
                  var s = document.getElementsByTagName('script')[0];
                  s.parentNode.insertBefore(e, s);
                }());

                // This function init the player once the SDK is loaded
                var self = this;
                var initDM = function () {
                  var id = 'video-ui-'+that.currents.id;
                  container.prop('id',id);
                  var prms = {video:self.getVideoId(param.url), width:"100%", height:"100%"};
                  if(that.autoplay) {
                    prms.params = {autoplay:1};
                  }
                  var player = window.DM.player(id, prms);

                  player.addEventListener("apiready", function (e) {
                    var prevE = e;
                    that.pauseOtherPlayers();
                    $that.trigger(events.play);
                    e.target.addEventListener("ended", function () {
                      $that.trigger(events.finish);
                      if(!that.isTouch){
                        that.utStop();
                      }
                    });

                    e.target.addEventListener("pause", function () {
                      $that.trigger(events.pause);
                      that.setState("pause");
                    });

                    container.off('continueAfterPause pauseVideo').on('continueAfterPause',function () {
                      prevE.target.play();
                    }).on('pauseVideo', function () {
                      prevE.target.pause();
                    });
                  });
                };

                window.dmAsyncInit = function () {
                  initDM();
                };

              }
            },

            // 'm4v':{
            //   urlPart:'.m4v',
            //   worker:'m4v',
            //   path:window.location.href.split(window.location.href.split(/[\/]+/).pop())[0]+"expcommon/utVideo/1.0/js",
            //   jwplayerLoaded:false,
            //   prepareEmbedCode:function (param) {
            //     return param;
            //   },
            //   embedVideo:function (containerId, param, options) {
            //     var that = this;
            //     (function () {
            //       if (that.jwplayerLoaded) {
            //         that.initJWPlayer(containerId, param, options);
            //         return;
            //       }
            //       var sc = document.createElement("script");
            //       sc.async = true;
            //       sc.src = that.path + "jwplayer/jwplayer.js";
            //       $("head")[0].appendChild(sc);
            //       sc.onload = function () {
            //         that.jwplayerLoaded = true;
            //         that.initJWPlayer(containerId, param, options);
            //       };
            //     })();
            //   },
            //   initJWPlayer: function(containerId, param, options) {
            //     var fileUrl;
            //     if (param.url.indexOf("#") >= 0) fileUrl = param.url.substr(0, param.url.indexOf("#"));
            //     else fileUrl = param.url;
            //     jwplayer(containerId).setup({
            //       "flashplayer":this.path + "jwplayer/player.swf",
            //       "id":containerId + "_jwplayer",
            //       "width":"100%",
            //       "height":"100%",
            //       "file":fileUrl,
            //       "events":{
            //         onReady:function () {
            //           var videoCont = $("#" + containerId);
            //           videoCont.parent().addClass("ut-video-player-state-video");
            //           jwplayer(containerId).play();
            //           $('#' + containerId).closest('.ut-video-player-ui').off('continueAfterPause pauseVideo').on('continueAfterPause',function (e) {
            //             jwplayer(containerId).play();
            //           }).on('pauseVideo', function (e) {
            //               jwplayer(containerId).pause();
            //             });
            //         },
            //         onPlay:function () {
            //           options.onPlay();
            //         },
            //         onPause:function () {
            //           options.onPause();
            //           $('#' + containerId).trigger('paused');
            //         },
            //         onComplete:function () {
            //           options.onFinish();
            //           $('#' + containerId).trigger('finished');
            //         }
            //       }
            //     })
            //   }
            // },

            // 'facebook':{
            //   urlPart:'fbcdn.net',
            //   worker:'m4v',
            //   path:window.location.href.split(window.location.href.split(/[\/]+/).pop())[0]+"expcommon/utVideo/1.0/js",      jwplayerLoaded:false,
            //   prepareEmbedCode:function (param) {
            //     return param;
            //   },
            //   embedVideo:function (containerId, param, options) {
            //     var that = this;
            //     (function () {
            //       if (that.jwplayerLoaded) {
            //         that.initJWPlayer(containerId, param, options);
            //         return;
            //       }
            //       var sc = document.createElement("script");
            //       sc.async = true;
            //       sc.src = that.path + "jwplayer/jwplayer.js";
            //       $("head")[0].appendChild(sc);
            //       sc.onload = function () {
            //         that.jwplayerLoaded = true;
            //         that.initJWPlayer(containerId, param, options);
            //       }
            //     })();
            //   },
            //   initJWPlayer:function (containerId, param, options) {
            //     var fileUrl;
            //     if (param.url.indexOf("#") >= 0) fileUrl = param.url.substr(0, param.url.indexOf("#"));
            //     else fileUrl = param.url;
            //     jwplayer(containerId).setup({
            //       "flashplayer":this.path + "jwplayer/player.swf",
            //       "id":containerId + "_jwplayer",
            //       "width":"100%",
            //       "height":"100%",
            //       "file":fileUrl,
            //       "events":{
            //         onReady:function () {
            //           var videoCont = $("#" + containerId);
            //           videoCont.parent().addClass("ut-video-player-state-video");
            //           jwplayer(containerId).play();
            //           $('#' + containerId).closest('.ut-video-player-ui').off('continueAfterPause pauseVideo').on('continueAfterPause',function (e) {
            //             jwplayer(containerId).play();
            //           }).on('pauseVideo', function (e) {
            //               jwplayer(containerId).pause();
            //             });
            //         },
            //         onPlay:function () {
            //           options.onPlay();
            //         },
            //         onPause:function () {
            //           options.onPause();
            //           $('#' + containerId).trigger('paused');
            //         },
            //         onComplete:function () {
            //           options.onFinish();
            //           $('#' + containerId).trigger('finished');
            //         }
            //       }
            //     })
            //   }
            // },

            'metacafe':{
              urlPart:'metacafe.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/<embed/ig, '<embed flashVars="playerVars=showStats=' + (param.details ? 'yes' : 'no') + '|' + ((that.autoplay) ? 'autoPlay=yes|' : '') + '"');
                return param;
              }
            },

            'myspace':{
              urlPart:'myspace.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/media\/embed.aspx\/(.*?)"/ig, 'media/embed.aspx/$1' + (that.autoplay ? ',ap=1' : '') + '"');
                return param;
              }
            },

            'veoh':{
              urlPart:'veoh.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/videoAutoPlay=(.*?)&/ig, 'videoAutoPlay=' + that.autoplay + '&');
                return param;
              }
            },

            'liveleak':{
              urlPart:'liveleak.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/<embed/ig, '<embed ' + (that.autoplay ? 'flashvars="autostart=true"' : ''));
                return param;
              }
            },

            'viddler':{
              urlPart:'viddler.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/<embed/ig, '<embed ' + (that.autoplay ? 'flashvars="autoplay=t"' : ''));
                return param;
              }
            },

            'blip':{
              urlPart:'blip.tv',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/src="(.*?)"/ig, 'src="$1?' + (that.autoplay ? 'autostart=true' : '') + '"');
                return param;
              }
            },

            'crackle':{
              urlPart:'crackle.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/<embed/ig, '<embed ' + (that.autoplay ? 'flashvars="autoplay=true"' : ''));
                return param;
              }
            },

            'ustream':{
              urlPart:'ustream.tv',
              worker:'ustream',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/autoplay=(.*?)&/ig, 'autoplay=' + (that.autoplay ? 'true' : 'false') + '&');
                return param;
              }
            },

            'revver':{
              urlPart:'revver.com',
              worker:'noworker',
              prepareEmbedCode:function (param) {
                var id = this.getVideoId(param.url);
                param.html = '<embed src="//flash.revver.com/player/1.0/player.swf" flashvars="mediaId=' + id + '" width="100%" height="100%" type="application/x-shockwave-flash" ></embed>';
                return param;
              }
            },

            'google':{
              urlPart:'video.google.com',
              worker:'embedly',
              prepareEmbedCode:function (param) {
                param.html = param.html.replace(/<embed/ig, '<embed flashvars="playerMode=' + param.gskins + (that.autoplay ? '&autoPlay=true' : '') + (param.loop ? '&loop=true' : ''));
                param.html = param.html.replace('&hl=en&fs=true', '');
                return param;
              }
            },

            'megavideo':{
              urlPart:'megavideo.com',
              worker:'noworker',
              getVideoId:function (url) {
                if (url.indexOf("#") >= 0){
                  url = url.substr(0, url.indexOf("#"));
                }
                return url.split('v=')[1].split('/')[0].split('&')[0];
              },
              prepareEmbedCode:function (param) {
                var id = this.getVideoId(param.url);
                param.html = '<object wmode="transparent" width="100%" height="100%"><param name="movie" value="//www.megavideo.com/v/' + id + '"/><param name="allowFullScreen" value="true"/><param name="wmode" value="transparent"/><embed wmode="transparent" src="//www.megavideo.com/v/' + id + '" type="application/x-shockwave-flash" allowfullscreen="true" width="100%" height="100%"></embed></object>';
                return param;
              }
            },

            'joost':{
              urlPart:'joost.com',
              worker:'noworker',
              getVideoId:function (url) {
                if (url.indexOf("#") >= 0) {
                  url = url.substr(0, url.indexOf("#"));
                }
                if (url.indexOf('container_info=') !== -1) {
                  return url.split('container_info=')[1].split('/')[0].split('&')[0];
                } else if (url.indexOf('joost.com/') !== -1) {
                  return url.split('joost.com/')[1].split('/')[0].split('&')[0];
                }
              },
              prepareEmbedCode:function (param) {
                var id = this.getVideoId(param.url);
                param.html = '<object width="100%" height="100%"><param name="movie" value="//www.joost.com/embed/' + id + (that.autoplay ? '?autoplay=true' : '') + '"></param><param name="allowFullScreen" value="true"/><param name="allowNetworking" value="all"/><param name="allowScriptAccess" value="always"/><embed src="//www.joost.com/embed/' + id + (that.autoplay ? '?autoplay=true' : '') + '" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" allownetworking="all" width="100%" height="100%"></embed></object>';
                return param;
              }
            }
          },

          _workers:{
            /**
             ** Youtube worker
             */
            'youtube':function (param, options, callback) {
              embedProcessor.log(param.worker + " started with parameters = ", param);
              var parser = function(data) {
                if (data) {
                  param.status = true;
                  param.duration = (data.media$group.yt$duration) ? parseInt(data.media$group.yt$duration.seconds,10) : 0;
                  param.duration_formatted = embedProcessor._timeConverter(param.duration);
                  var thumbs = data.media$group.media$thumbnail;
                  var selThumb = null;
                  if (thumbs && thumbs.length > 0){
                    for (var qq = 0; qq < thumbs.length; qq++){
                      if (!selThumb || selThumb.width < thumbs[qq].width){
                        selThumb = thumbs[qq];
                      }
                    }
                  }
                  param.thumbnail_url = selThumb ? selThumb.url : false;
                  param.favicon_url = "//www.youtube.com/favicon.ico";
                  param.service_name = "YouTube";
                  param.provider_url = "//youtube.com";
                  param.html = false;
                  param.views = ((data.yt$statistics && data.yt$statistics.viewCount) ? data.yt$statistics.viewCount : 0);
                  param.title = data.title ? data.title.$t : "";
                  param = embedProcessor._paramEmbedCodeNormalizer(embedProcessor._sources[param.source].prepareEmbedCode(param));
                } else {
                  param.status = false;
                }
                embedProcessor.log(param.worker + ' receive parameters = ', param);
                callback(param);
              };

              if(param.appData){
                parser(param.appData);
              } else {
                var videoId = embedProcessor._sources[param.source].getVideoId(param.url);
                var api_url = "//gdata.youtube.com/feeds/api/videos/" + videoId + "?alt=json-in-script&v=2&&callback=?";
                $.getJSON(api_url, function (data) {
                  parser(data.entry);
                });
              }
            },
            /**
             ** Vimeo worker
             */
            'vimeo':function (param, options, callback) {
              embedProcessor.log(param.worker + ' started with parameters = ', param);

              var parser = function(data){
                if (data) {
                  param.status = true;
                  param.duration = data.duration;
                  param.duration_formatted = embedProcessor._timeConverter(param.duration);
                  param.thumbnail_url = data.thumbnail_large || ((data.thumbnails && data.thumbnails.thumbnail && data.thumbnails.thumbnail[2])?data.thumbnails.thumbnail[2]._content:'');
                  param.favicon_url = '//vimeo.com/favicon.ico';
                  param.service_name = 'Vimeo';
                  param.provider_url = '//vimeo.com';
                  param.title = data.title || '';
                  param.html = false;
                  param.views = data.stats_number_of_plays;
                  param = embedProcessor._paramEmbedCodeNormalizer(embedProcessor._sources[param.source].prepareEmbedCode(param));
                } else {
                  param.status = false;
                }
                embedProcessor.log(param.worker + ' receive parameters = ', param);
                callback(param);
              };

              if(param.appData){

                parser(param.appData);
              } else {

                var videoId = embedProcessor._sources[param.source].getVideoId(param.url);
                var api_url = '//vimeo.com/api/v2/video/' + videoId + '.json?&callback=?';

                $.getJSON(api_url, function (data) {
                  parser(data[0]);
                });
              }
            },
            /**
             ** Embed.ly supported sites worker
             */
            'embedly':function (param, options, callback) {
              // dailymotion make call toservice every time einsted of vidmeo and youtube
              embedProcessor.log(param.worker + ' started with parameters = ', param);
              var sourceUrl = encodeURIComponent(param.url);
              var api_url = '//api.embed.ly/1/oembed?key=c6544dc839bd11e088ae4040f9f86dcd&url=' + sourceUrl + (that.autoplay ? "":"&autoplay=1") + '&callback=?';
              $.getJSON(api_url, function (data) {
                if(data && data.html) {
                  param.status = true;
                  param.duration = false;
                  param.duration_formatted = false;
                  param.thumbnail_url = data.thumbnail_url ? data.thumbnail_url : '';
                  param.favicon_url = data.favicon_url;
                  if (param.source === 'dailymotion') {
                    param.favicon_url = '//favicon.yandex.net/favicon/dailymotion.com';
                  }
                  param.service_name = data.provider_name;
                  param.provider_url = data.provider_url;
                  param.html = data.html;
                  param.title = data.title || '';
                  param.views = false;
                  if (embedProcessor._sources[param.source] && embedProcessor._sources[param.source].prepareEmbedCode) {
                    param = embedProcessor._sources[param.source].prepareEmbedCode(param);
                  }
                  param = embedProcessor._paramEmbedCodeNormalizer(param);
                } else {
                  /* prepare data from appData */
                  if(param.appData && param.appData.id && param.source === "dailymotion") {
                    param.status = true;
                    param.duration = false;
                    param.duration_formatted = false;
                    param.thumbnail_url = param.appData.thumbnail_small_url;
                    param.favicon_url = '//favicon.yandex.net/favicon/dailymotion.com';
                    param.service_name = "Dailymotion";
                    param.provider_url = "http://www.dailymotion.com";
                    param.html = '<iframe src="http://www.dailymotion.com/embed/video/' + param.appData.id + (that.autoplay ? "" : "?autoPlay=1") + '" width="480" height="301" frameborder="0"></iframe>';
                    param.title = param.appData.title || '';
                    param.views = false;
                    if (embedProcessor._sources[param.source] && embedProcessor._sources[param.source].prepareEmbedCode) {
                      param = embedProcessor._sources[param.source].prepareEmbedCode(param);
                    }
                    param = embedProcessor._paramEmbedCodeNormalizer(param);
                  } else {
                    param.status = false;
                  }
                }
                embedProcessor.log(param.worker + ' receive parameters = ', param);
                callback(param);
              });
            },
            /**
             ** ustream worker
             */

            'ustream':function (param, options, callback) {
              embedProcessor.log(param.worker + ' started with parameters = ', param);
              if (param.url.match(/\/channel\//) === null) {
                var video_id = param.url.split('/').pop();
                var api_url = '//api.ustream.tv/json/video/' + video_id + '/getInfo?key=CA8D42389DA4266B9489912DE63A817F&callback=?';
                $.getJSON(api_url, function (data) {
                  if (data) {
                    param.status = true;
                    param.duration = data.lengthInSecond;
                    param.duration_formatted = false;
                    param.thumbnail_url = data.imageUrl.medium || data.imageUrl.small || '';
                    param.title = data.title || '';
                    param.description = data.description || '';
                    param.rating = data.rating || '';
                    param.numberOf = data.numberOf || '';
                    param.html = data.embedTag;
                    if (embedProcessor._sources[param.source] && embedProcessor._sources[param.source].prepareEmbedCode) {
                      param = embedProcessor._sources[param.source].prepareEmbedCode(param);
                    }
                    param = embedProcessor._paramEmbedCodeNormalizer(param);
                  } else {
                    param.status = false;
                  }
                  embedProcessor.log(param.worker + ' receive parameters = ', param);
                  callback(param);
                });
              } else {
                this.embedly(param, options, callback);
              }
            },

            /**
             ** m4v worker
             */
            'm4v':function (param, options, callback) {
              var videoUrl = param.url;
              var thumbUrl = "m4v";
              var title = "Video";
              if (videoUrl.indexOf("#")) {
                var ii = videoUrl.match(/##webdoc,([^,]*)?,(.*)/ig);
                if (ii && ii.length > 0) {
                  ii = ii[0].split(",");
                  title = decodeURIComponent(ii[1]);
                  thumbUrl = decodeURIComponent(ii[2]);
                }
                videoUrl = videoUrl.substr(videoUrl.indexOf("#"));
              }
              embedProcessor.log(param.worker + ' started with parameters = ', param);
              param.status = true;
              param.duration = false;
              param.duration_formatted = false;
              param.thumbnail_url = thumbUrl;
              param.favicon_url = '';
              param.service_name = 'm4v';
              param.provider_url = 'm4v';
              param.html = false;
              param.service_name = '';
              param.provider_url = videoUrl;
              param.title = title;
              param.views = false;
              if (embedProcessor._sources[param.source] && embedProcessor._sources[param.source].prepareEmbedCode) {
                param = embedProcessor._sources[param.source].prepareEmbedCode(param);
              }
              param = embedProcessor._paramEmbedCodeNormalizer(param);
              embedProcessor.log(param.worker + ' receive parameters = ', param);
              callback(param);
            },
            /**
             ** Without any API worker
             */
            'noworker':function (param, options, callback) {
              embedProcessor.log(param.worker + ' started with parameters = ', param);
              param.status = true;
              param.duration = false;
              param.duration_formatted = false;
              param.thumbnail_url = false;
              param.favicon_url = '';
              param.service_name = '';
              param.provider_url = '';
              param.html = false;
              param.views = false;
              if (embedProcessor._sources[param.source] && embedProcessor._sources[param.source].prepareEmbedCode) {
                param = embedProcessor._sources[param.source].prepareEmbedCode(param);
              }
              param = embedProcessor._paramEmbedCodeNormalizer(param);
              embedProcessor.log(param.worker + ' receive parameters = ', param);
              callback(param);
            }
          },

          _getSourceNameByUrl:function (url) {
            for (var currentSource in this._sources) {
              if (url.indexOf(this._sources[currentSource].urlPart) !== -1) {
                return currentSource;
              }
            }
            return false;
          },

          _paramEmbedCodeNormalizer:function (param) {
            if (param.html) {
              param.html = param.html
                .replace(/width="(.*?)"/ig, "width='100%'")
                .replace(/height="(.*?)"/ig, "height='100%'")
                .replace(/width=(.*?)px/ig, "width='100%'")
                .replace(/height=(.*?)px/ig, "height='100%'")
                .replace('><embed', "><param name='wmode' value='transparent'/><embed ")
                .replace('<embed', "<embed wmode='transparent'")
                .replace('<object', "<object wmode='transparent'");
            }
            return param;
          },

          _timeConverter:function (time) {
            var minutes = 0;
            var seconds = 0;
            minutes = Math.floor(time / 60);
            seconds = Math.floor(time - minutes * 60);
            time = minutes + ":" + (seconds === 0 ? "00" : (seconds > 9 ? seconds : '0' + seconds));
            return time;
          },

          log:function (m1, m2, m3, m4, m5, m6, m7, m8) {
            if (this.debug) {
              console.log(' :::::: video.embedProcessor::debug::message --- >', m1 || '', m2 || '', m3 || '', m4 || '', m5 || '', m6 || '', m7 || '', m8 || '');
            }
          }
        };

        that.pauseOtherPlayers = function() {
          if(!that.options.styles.autoPause) {
            return;
          }
          var list = $(".ut-video");
          $.each(list, function(i, v) {
            if(v !== $that[0]) {
              $(v).utVideo("pause");
            }
          });
        };

        /************************************************************/
        /* video.embedProcessor end
        /************************************************************/

        that.updatePreViewVideoData = function() {
          var sed = that.currents.sourceEmbedData || {};

          if(that.ui.artwork) {
            that.ui.artwork.css("backgroundImage", "url(" + sed.thumbnail_url + ")");
          }

          if(that.ui.play) {
            that.ui.play.off("click");
            that.ui.play.html('<span class="icon_play '+that.uiNS+'-play-icon"></span>');
            that.ui.play.on("click", function(event){
              that.utPlay();
              event.stopPropagation();
              event.preventDefault();
            });
          }

          if(that.ui.title) {
            that.ui.title.html(sed.title || '');
            that.ui.title.on('click', function(event) {
              event.stopPropagation();
            });
          }

          if(that.ui.source) {
            that.ui.source.prop('href',sed.url);
            that.ui.source.prop('target','_blank');
            that.ui.source.prop('title','Watch on '+sed.service_name);
            that.ui.source.on('click', function(event) {
              event.stopPropagation();
            });

            if(sed.source === 'youtube' || sed.source === 'vimeo' || sed.source === 'dailymotion'){
              that.ui.source.html('<span class="icon_'+sed.source+' '+that.uiNS+'-source-icon"></span>');
            } else {
              that.ui.source.html(sed.favicon_url ? '<img src="' + sed.favicon_url + '" border=0 />' : '');
            }
          }

          /* auto-start */
          if(that.options.autoPlay) {
            that.utPlay();
          }

          that.currents.videoDataReceived = true;
        };

        that.processEmbedData = function(sourceEmbedData) {
          if(that._embedVideoByDataTO) {
            clearTimeout(that._embedVideoByDataTO);
            that._embedVideoByDataTO = 0;
          }
          that.currents.sourceEmbedData = sourceEmbedData;
          if(sourceEmbedData.source) {
            that.canplay = true;
            if(that.isTouch){
              that.utPlay();
            } else {
              that.updatePreViewVideoData();
              that.setState('launch');
            }
            setTimeout(function() {
              $that.trigger(events.mediaReady, sourceEmbedData);
              that.triggerChangeEvent();
            }, 10);
          } else {
            $that.trigger(events.error, [false, "sorry: utVideo can not play this source of video"]);
            that.setState('error');
          }
        };

        that.utDestroy = function() {
          that.options.data = null;
          that.post.storage[that.storageNS+that.currents.id] = null;
          that.post.save();
          $that.trigger(events.destroy);
          that.ui.container.remove();
          that = null;
        };

        that.utChange = function(data) {
          that.options.data = data;
          that.update();
        };

        that.utPlay = function() {
          if(!that.canplay) {return;}
          if(that.currents.state === 'pause') {
            that.ui.video.trigger('continueAfterPause');
          } else {
            that.setState("video");
            embedProcessor.embedVideoByParameters(that.currents.sourceEmbedData, that.options);
          }
        };

        that.utPause = function() {
          that.ui.video.trigger('pauseVideo');
        };

        that.utStop = function() {
          that.ui.video.find('iframe').prop('src','');
          that.ui.video.empty();
          $that.trigger(events.stop);
          that.setState('launch');
        };

        that.utUpdate = function() {
          that.update();
        };

        that.utDialog = function(opt) {
          var options = {
            inputTypes: ['search'],
            label: ''
          };
          if(!$.isEmptyObject(opt)) {
            options = $.extend(true, options, opt);
          }

          $that.trigger(events.dialogOpen);
          that.post.dialog('video', options, function(data) {
            if(!data){
              $that.trigger(events.dialogCancel);
            } else {
              that.options.data = data;
              that.update();
              that.post.storage[that.storageNS+that.currents.id] = JSON.stringify(data);
              that.post.save();
              $that.trigger(events.mediaAdd);
            }
          }, function() {
            // error callback
            $that.trigger(events.dialogCancel, arguments);
          });
        };

        that.setState = function(state) {
          that.currents.state = state;
          that.ui.container.removeClass().addClass(
            [
            that.uiNS,
            that.stateNS    + '-' + state,
            that.editableNS + '-' + ((that.options.editable && !that.post.context.player) ? 'true' : 'false'),
            (that.currents.serviceData?(that.serviceNS + '-' + that.currents.serviceData.service_name):''),
            that.skinNS     + '-' + that.options.styles.skin,
            that.modeNS     + '-' +(that.post.context.player?'player':'editor'),
            that.aspectNS   + '-' + that.aspect,
            that.sizeNS     + '-' + that.size,
            that.touchNS    + '-' + (that.isTouch?'true':'false'),
            'ut-media-placeholder'
            ].join(' ')
            );
        };

        that._embedVideoByDataTO = 0;
        that.embedVideoByData = function(data) {
          that._embedVideoByDataTO = 0;
          that.setState("loading");
          that._embedVideoByDataTO = setTimeout(function () {
            if(!that.currents.videoDataReceived && that.currents.state !== 'error' && that.options.data) {
              $that.trigger(events.error, [false, 'sorry: utVideo can not embed this video']);
              that.setState('error');
            }
          }, 15000);
          embedProcessor.getVideoPlayerParameters(data.url, data.appData || false, {}, that.processEmbedData);
        };

        that.update = function(){
          that.currents = {
            id: that.options.id || $that.attr('id'),
            videoDataReceived: false,
            sourceEmbedData: null,
            state: null
          };

          $that.addClass("ut-video");

          var storage_data = that.post.storage[that.storageNS + that.currents.id];
          if(storage_data && !that.options.data) {
            that.options.data = JSON.parse(storage_data);
          }

          if(typeof(that.options.data) === 'string') {
            that.options.data = {url:that.options.data};
          }

          if(!that.currents.id) {
            console.error('utVideo: Please specify an id of your video container. Example: "<div id="myPlayer1"></div>"');
            return;
          } else if($("#" + that.currents.id).length > 1) {
            console.error('utVideo: Your video container should have unique id. Now, more then one element have id = ',that.currents.id);
            return;
          }

          /* hack for firefox flash video */
          if (/Firefox[\/\s](\d+\.\d+)/.test(window.navigator.userAgent)) {
            $that.parents().each(function(){
              if ($(this).css('transform') !== "none" || $(this).css('-moz-transform') !== "none") {
                $(this).css({
                  '-moz-transform': 'none',
                  'transform': 'none'
                });
                if(console && console.warn) {
                  console.warn('WARNING!!! css property translate for firefox removed in order to avoid problems with FLASH');
                }
              }
            });
          }

          that.ui = {};
          if($that.css('position') !== "relative" && $that.css('position') !== "absolute") {
            $that.css('position', 'relative');
            if(console && console.warn) {
              console.warn('Your container (id=' + that.currents.id + ') css position was set as "relative" as requirement of utVideo component. You can set it "absolute" or "relative" in the css to avoid this warning in console');
            }
          }
          $that.find('.'+that.uiNS).remove();
          that.ui.container = $('<div class="'+that.uiNS+'"></div>').appendTo($that);
          that.ui.video     = $('<div class="'+that.uiNS+'-video"></div>'  ).appendTo(that.ui.container);
          that.ui.error     = $('<div class="'+that.uiNS+'-error"></div>').append($('<div>').html(i18n.get('error'))).appendTo( that.ui.container);
          if(that.options.ui.artwork) {that.ui.artwork = $('<div class="'+that.uiNS+'-artwork">'      ).appendTo(that.ui.container);}
          if(that.options.ui.loading) {that.ui.loading = $('<div class="'+that.uiNS+'-loading"></div>').append('<div class="icon_spinner '+that.uiNS+'-loading-icon"></div>').appendTo(that.ui.container);}
          if(that.options.ui.play)    {that.ui.play    = $('<div class="'+that.uiNS+'-play">'         ).appendTo(that.ui.container);}
          if(that.options.ui.title)   {that.ui.title   = $('<h1  class="'+that.uiNS+'-title"></h1>'   ).appendTo(that.ui.container);}
          if(that.options.ui.source)  {that.ui.source  = $('<a   class="'+that.uiNS+'-source"></a>'   ).appendTo(that.ui.container);}
          if(that.options.editable) {
            that.ui.add     = $('<a class="'+that.uiNS+'-add icon_video ut-media-button ut-button"></a>').html(i18n.get('add_video')).appendTo(that.ui.container);
            that.ui.remove  = $('<a class="'+that.uiNS+'-remove icon_trash"></a>').html(i18n.get('edit')).appendTo(that.ui.container);

            that.ui.add.on('click', that.onAddButtonClick);
            that.ui.remove.on('click', that.onRemoveButtonClick);
          }

          that.aspect = 'square'; //TODO - make it more clear
          if($that.width() > $that.height()*1.25) { that.aspect = 'horizontal'; }
          if($that.width()*1.25 < $that.height()) { that.aspect = 'vertical'; }

          that.size = 'middle'; //TODO - make it more clear
          if($that.width() > 300 || $that.height() > 300)   { that.size = 'big'; }
          if($that.width() <= 200 || $that.height() <= 200) { that.size = 'small'; }

          if(that.post){
            that.post.on('pause', that.utPause);
          }

          if(that.options.data && (that.options.data.appData || that.options.data.url)) {
            that.embedVideoByData(that.options.data);
          } else {
            that.setState("empty");
          }
        };

        that.onAddButtonClick = function(event) {
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "add");
          if(!ev.isDefaultPrevented()) {
            that.utDialog({});
            event.stopPropagation();
            event.preventDefault();
          }
        };

        that.onRemoveButtonClick = function(event) {
          var ev = $.Event(events.buttonClick);
          $that.trigger(ev, "remove");
          if(!ev.isDefaultPrevented()) {
            that.utDialog({});
//            that.removeVideo();
            event.stopPropagation();
            event.preventDefault();
          }
        };

        that.removeVideo = function() {
          that.options.data = null;
          that.post.storage[that.storageNS+that.currents.id] = null;
          that.post.save();
          $that.trigger(events.mediaRemove);
          that.triggerChangeEvent();
          that.update();
        };

        that.listenMedia = function(isAllow) {
          if(isAllow) {
            that.options.styles.listenMedia = true;
            that.addMediaListener();
          } else {
            that.options.styles.listenMedia = false;
            that.post.off('video');
            methods.nextPlayerToAddVideo = -1;
          }
        };

        that.oldOptions = $.extend(true, {}, that.options);
        that.update();

        that.initialized = true;
        if(that.post) {
          setTimeout(function() {
            $that.trigger(events.ready, {id:that.options.id, data:that.options.data});
          }, 0);
          that.addMediaListener();
        }
      });
      return this;
    },

    play: function() {
      this.each(function() {
        if(this.utVideo && this.utVideo.utPlay && this.utVideo.canplay) {
          this.utVideo.utPlay.call(this);
        }
      });
      return this;
    },

    pause: function() {
      this.each(function() {
        if(this.utVideo && this.utVideo.utPause && this.utVideo.canplay) {
          this.utVideo.utPause.call(this);
        }
      });
      return this;
    },

    stop: function() {
      this.each(function() {
        if(this.utVideo && this.utVideo.utStop && this.utVideo.canplay){
          this.utVideo.utStop.call(this);
        }
      });
      return this;
    },

    update: function() {
      this.each(function() {
        if(this.utVideo && this.utVideo.utUpdate){
          this.utVideo.utUpdate.call(this);
        }
      });
      return this;
    },

    destroy: function() {
      this.each(function() {
        if(this.utVideo && this.utVideo.utDestroy){
          this.utVideo.utDestroy.call(this);
        }
      });
      return this;
    },

    dialog: function(options) {
      this.each(function() {
        if(this.utVideo && this.utVideo.utDialog){
          this.utVideo.utDialog.call(this,options);
        }
      });
      return this;
    },

    data: function() {
      var res = null;
      if(this.length > 0 && this[0].utVideo && this[0].utVideo.options) {
        res = this[0].utVideo.options.data;
      }
      return res;
    },

    listenMedia: function(isAllow) {
      this.each(function() {
        if(this.utVideo) {
          this.utVideo.listenMedia.call(this, isAllow);
        }
      });
      return this;
    }
  };

  $.fn.utVideo = function (method) {
    if(typeof method === 'object' || !method) {
      methods.init.apply(this, arguments);
    } else if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      $.error('Method ' + method + ' does not exist on $.utVideo');
    }
    return this;
  };
})(window.$ || window.Zepto || window.jq);
/*global UT: true, jQuery: true, navigator: true, fontdetect: true */
/*
 * This source code is licensed under version 3 of the AGPL.
 *
 * Copyright (c) 2013 by urturn
 *
 * Addendum to the license AGPL-3:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */
;(function($) {
  "use strict";
  /**
   * Enhace the given domNode to make it an editable text field
   *
   * It can be fluid in size, adapt to his container, limit the
   * number of characters, and be mixed with an ut-image
   *
   * Data(the text) will be stored in that object in the collection:
   * - ut-text_[element.id]
   */

  function UtText(element, options) {
    options = $.extend({}, $.fn.utText.defaults, options);

    var el            = element,
      $el             = $(el),
      namespace       = 'utText',
      storageKey      = namespace+el.id,
      post            = options.post || {},
      storage         = post.storage,
      mode            = post.context,
      maxFontSize     = parseInt(options.maxFontSize,10) || null,
      minFontSize     = parseInt(options.minFontSize,10) || null,
      isUtimage       = $el.data('utImage'),
      isIosApp        = /(urturn)/i.test(navigator.userAgent),
      isIE            = /(msie)/i.test(navigator.userAgent),
      $contentDomNode,timer,$countdownDomNode,imageHeight,fontName,isFontLoaded;

    function init() {
      $contentDomNode = $('<div>').addClass('ut-text-content');

      // redifine mix/max font size if we are on mobile or other device
      if (options.fixedSize && $(post.node).width() < 576 && maxFontSize && minFontSize) {
        maxFontSize = Math.round($(post.node).width()/576*maxFontSize);
        minFontSize = Math.round($(post.node).width()/576*minFontSize);
      }

      $el
      .addClass('ut-text')
      .append($contentDomNode);

      checkFont();

      if (!options.fixedSize) {
        $el.addClass('ut-text-flex');
      } else {
        $el.addClass('ut-text-fixed');
      }

      if (mode && mode.editor === true) {
        $contentDomNode
        .attr('contentEditable',true)
        .attr('spellcheck',false);
        if (options.tabIndex) {
          $contentDomNode.attr('tabIndex',options.tabIndex);
        }
        bindEvents();
      }
      if (storage && storage[storageKey]) {
        if (mode && mode.player === true) {
          $contentDomNode.html(post.autoLink(storage[storageKey]));
        } else {
          $contentDomNode.text(storage[storageKey]);
        }
        $contentDomNode.attr('data-div-placeholder-content', 'true');
      }

      if (options.chars && mode && mode.editor === true) {
        $countdownDomNode = $('<div>').addClass('ut-text-countdown ut-action-button ut-small-button ut-button');
        $el.append($countdownDomNode);
        updateCharactersCounter();
      }
      
      if (isUtimage) {
        imageHeight = $el.height();
        $el.css({ backgroundSize: 'cover' });
      }

      if(options.reuse) {
        reuse();
      }

      if (options.fixedSize && maxFontSize && minFontSize) {
        adaptFontSize();
        post.on('resize', function() {
          adaptFontSize();
        });
      }

      if (charsCount() === 0) {
        $contentDomNode.html('<br/>');
      }

      trigger('ready');
    }

    /* 
      - check if font is loaded, and load it if not
    */
    function checkFont() {
      fontName      = fontdetect.whichFont($contentDomNode[0]);
      isFontLoaded  = fontdetect.isFontLoaded(fontName);

      if (!isFontLoaded) {
        $el.append(jQuery('<div/>').css('fontFamily',fontName).addClass('ut-font-detect'));
        fontdetect.onFontLoaded(fontName, function(){
          isFontLoaded = true;
          $('.ut-font-detect',$el).remove();
        }, function(){
          isFontLoaded = false;
          $('.ut-font-detect',$el).remove();
        }, {msInterval: 100, msTimeout: 10000});
      }
    }

    function trigger(name, data){
      $el.trigger(namespace+':'+name, data);
    }

    /*
      - Listen to events on the contenteditable field
      - use native text dialog if we are in the iOS app
      - handle copy-paste text
    */
    function bindEvents() {
      /* here is the meat and potates */
      $contentDomNode.attr('data-placeholder',options.placeholder);

      if (isIosApp) {
        $contentDomNode.on('touchstart',function() {
          post.dialog('text',{'value':cleanUpData(), 'max':options.chars || null, 'multiline':true}, function(text){
            $contentDomNode.html(text).trigger('input');
            trigger('mobileInput',text);
            if (text.length >= 1) {
              $contentDomNode.attr('data-div-placeholder-content', 'true');
            }
            adaptAndSave();
          });
        });
      } else {
        $contentDomNode.on('paste keypress keydown input',function(e) {
          if (mode && mode.editor === true) {
            if ($contentDomNode[0].textContent && charsCount() >= 1) {
              $contentDomNode.attr('data-div-placeholder-content', 'true');
            } else {
              $contentDomNode.removeAttr('data-div-placeholder-content');
            }
          }

          if (e.type === 'paste') {
            formatPaste();
          }

          if(e.which === 13 && isIE) {
            e.preventDefault();
          }

          //list of functional/control keys that you want to allow always
          var keys = [8, 9, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 144, 145];

          if( $.inArray(e.keyCode, keys) === -1) {
            if (options.chars && charsCount() >= options.chars && !e.metaKey) {
              e.preventDefault();
              e.stopPropagation();
            }
          }

          if(timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(adaptAndSave, 50);

        });
      }
    }

    /*
      Either the post, the font, or the ut-image object can adapt the height
      The font in the case we have a fixed element size
      The post when the size is free and as more as we type
      The ut-image when it's present, the image grow as we type
    */
    function sizeChange() {
      if (options.fixedSize) {
        adaptFontSize();
      } else {
        if (isUtimage) {
          adaptImageHeight();
        } else {
          adaptPostHeight();
        }
      }

      if (options.chars && mode && mode.editor === true) {
        updateCharactersCounter();
      }
    }

    function adaptImageHeight() {
      if ($contentDomNode.outerHeight()+10 > imageHeight) {
        $el.height($contentDomNode.outerHeight()+10);
      } else {
        $el.height(imageHeight);
      }
    }

    function adaptPostHeight() {
      post.size({'height':$('.webdoc_expression_wrapper').outerHeight()});
    }

    function adaptFontSize() {
      $el.textfill({
        debug: false,
        maxFontPixels: maxFontSize,
        minFontPixels: minFontSize,
        innerTag: '.ut-text-content'
      });
    }

    /* Adapt size and save */
    function adaptAndSave() {
      sizeChange();
      saveData();
    }

    /* Save the text in collection */
    function saveData() {
      storage[storageKey] = cleanUpData();
      post.save();

      trigger('save',cleanUpData());
    }

    function charsCount() {
      return $contentDomNode.text().replace(/<[^>]*>/g, "").length;
    }

    /* in the case we have a character limitation, display and update the counter */
    function updateCharactersCounter() {
      var remaining = options.chars - charsCount();
      if (remaining === 0) {
        $countdownDomNode.addClass('ut-text-countdown-max');
      } else {
        $countdownDomNode.removeClass('ut-text-countdown-max');
      }
      $countdownDomNode.text(remaining + ' / ' + options.chars);
    }

    /* Clean up the data that come from copy, paste, etc... before saving */
    function cleanUpData(){
      var v = $contentDomNode.html().replace(/<br\s*\/?>/mg,"\n");
      v = v.replace(/<div>/gi,"\n").replace(/<\/div>/gi,'');
      v = v.replace(/(<([^>]+)>)/ig,'');
      return $.trim(v.replace(/&nbsp;/ig,''));
    }

    function formatPaste() {
      setTimeout(function() {
        if(options.chars && charsCount() >= options.chars) {
          $contentDomNode.text(cleanUpData().substr(0, options.chars));
        } else {
          $contentDomNode.text(cleanUpData());
        }
      }, 50);
    }

    /* Reuse data from the parent post */
    function reuse() {
      if(!storage[storageKey] && post.collection('parent') && post.collection('parent')[storageKey]){
        $contentDomNode.html(post.collection('parent')[storageKey]);
        $contentDomNode.attr('data-div-placeholder-content', 'true');
        saveData();
      }
    }

    function destroy() {
      $el.each(function() {
        $el.trigger('destroy');
        $el
          .removeData('utText')
          .removeClass('ut-text ut-text-editable ut-text-placeholder')
          .remove('.ut-text-content');
        $contentDomNode.off();
      });
    }

    init();

    return {
      options:        options,
      destroy:        destroy,
      sizeChange:     sizeChange,
      adaptFontSize:  adaptFontSize,
      getText:        cleanUpData,
      saveText:       saveData
    };
  }

  $.fn.utText = function(options) {
    if (typeof arguments[0] === 'string') {
      var methodName = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1);
      var returnVal;
      this.each(function() {
        if ($.data(this, 'utText') && typeof $.data(this, 'utText')[methodName] === 'function') {
          returnVal = $.data(this, 'utText')[methodName].apply(this, args);
        } else {
          throw new Error('Method ' +  methodName + ' does not exist on jQuery.utText');
        }
      });
      if (returnVal !== undefined){
        return returnVal;
      } else {
        return this;
      }
    } else if (typeof options === "object" || !options) {
      return this.each(function() {
        if (!$.data(this, 'utText')) {
          if((!options || !options.post) && UT && UT.Expression && UT.Expression.ready){
            UT.Expression.ready(function(post){
              if (!options) {
                options = {};
              }
              options.post = post;
            });
          }
          $.data(this, 'utText', new UtText(this, options));
        }
      });
    }
  };

  $.expr[':'].utText = function(el) {
    return $(el).hasClass('ut-text');
  };

  $.fn.utText.defaults = {
    placeholder: 'Enter some text',
    fixedSize: false,
    chars: false,
    maxFontSize: false,
    minFontSize: false,
    reuse: false,
    tabIndex: false
  };

})(jQuery);
/* This source code is licensed under version 3 of the AGPL.
 *
 * Copyright (c) 2013 by urturn
 *
 * Addendum to the license AGPL-3:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */
/* global UT:true */
(function( UT, $, window, document, undefined ) {
  "use strict";

  var methods = {
    init: function(options) {
      this.each(function() {
        if(this.utSticker) {
          if(typeof(options) === "object") {
            this.utSticker.options = $.extend(true, this.utSticker.options, options);
          }
          if(this.utSticker.update) {
            this.utSticker.update.call(this, options && options.styles && options.styles.pos ? options.styles.pos : null);
          }
          return;
        }
        var events = {
          ready: "utSticker:ready",
          change: "utSticker:change",
          rotate: "utSticker:rotate",
          resize: "utSticker:resize",
          move: "utSticker:move",
          buttonClick: "utSticker:buttonClick",
          destroy: "utSticker:destroy",
          click: "utSticker:click",
          dblClick: "utSticker:dblClick",
          focus: "utSticker:focus",
          blur: "utSticker:blur"
        };

        var defaults = {
          id: "",
          editable: true,
          ui: {
            edit: false,
            resize: null,
            rotate: null,
            remove: true
            //custom: "class1"
          },
          i18n: {
            dialogLabel: undefined
          },
          styles: {
            proportional: true,
            autoflip: true,
            useBounds: true,
            pos: {
              width: undefined, //'30%',
              ratio: undefined, //1,
              height: undefined,
              cx: undefined, //'50%', // x-pos from center
              cy: undefined, //'50%', // y-pos from center
              left: undefined,
              right: undefined,
              top: undefined,
              bottom: undefined,
              rotation: 0,
              zIndex: undefined
            },
            parentIndent: {
              top: null,
              left: null,
              bottom: null,
              right: null
            },
            selfOutdent: {
              top: '0%',
              left: '0%',
              bottom: '0%',
              right: '0%'
            },
            sizeLimits: {
              minWidth: '10%',
              minHeight: '10%',
              maxWidth: '90%',
              maxHeight: '90%'
            },
            rotationLimits: {
              min: '-180',
              max: '180'
            },
            rotationSnap: {
              base: 90,
              precision: 3
            },
            topOnFocus: true,
            preventAutoRemove: false,
            preventEventsBubble: true // prevent default and stop propogation for click events on item and buttons
          }
        };

        var that = {};
        this.utSticker = that;
        that.initialized = false;
        var bound = this.getBoundingClientRect();

        var defWidth = parseInt(bound.width, 10);
        var defHeight = parseInt(bound.height, 10);
        var parentObj = this.parentNode;
        var $content = $(this);
        var $that = $("<div>").appendTo(parentObj);
        $content.detach();
        $that.append($content);
        $that[0].utSticker = this.utSticker;

        if(options && options.style && !options.styles) {
          console.warn("utSticker :: The 'styles' parameter not found, but 'style' present.");
        }

        that.options = $.extend(true, defaults, options);

        that.isTouch = (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0));
        that.isMSIE = window.navigator.userAgent.indexOf("MSIE") !== -1;
        that.data = {
          editable: true,
          // (updated width parent size)
          parentWidth: 0,
          parentHeight: 0,
          // (updated every time when sticker change size or position)
          curBounds: {},
          movable: false,
          rotatable: false,
          resizable: false,
          // rotation regions
          minAngle: -Math.PI,
          maxAngle: Math.PI,
          // (updated width parent size, px)
          parentIndent: {},
          // min and max sizes (updated width parent size, px)
          minWidth: 0,
          minHeight: 0,
          maxWidth: 10000,
          maxHeight: 10000,
          // (updated with sticker size, based on size or bounds, px)
          selfOutdent: {}
        };
        that.view = {};
        that.pos = {};
        that.post = null;
        that.isEditMode = false;
        if(typeof(window.utStickerLastZIndex) === "undefined") {
          window.utStickerLastZIndex = 10;
        }

        var testStyles = window.getComputedStyle(document.body, null);

        var transformStyle = "transform";
        if(typeof(testStyles.webkitTransform) !== "undefined") {
          transformStyle = "webkitTransform";
        } else if(typeof(testStyles.MozTransform) !== "undefined") {
          transformStyle = "MozTransform";
        } else if(typeof(testStyles.msTransform) !== "undefined") {
          transformStyle = "msTransform";
        } else if(typeof(testStyles.OTransform) !== "undefined") {
          transformStyle = "OTransform";
        }

        var mouseStart = that.isTouch ? "touchstart" : "mousedown";
        var mouseMove = that.isTouch ? "touchmove" : "mousemove";
        var mouseEnd = that.isTouch ? "touchend touchcancel" : "mouseup mouseleave";

        /********************************************************************************
         * common
         ********************************************************************************/
        UT.Expression.ready(function(p) {
          that.post = p;
          that.isEditMode = p.context.editor;
          that.options.editable = that.isEditMode ? that.options.editable : false;
          if(that.initialized) {
            setTimeout(function(){
              if(!that.post.storage["utSticker_" + that.options.id + "_pos"]) {
                that._savePosition();
              }
              $content.trigger(events.ready, {id:that.options.id, data:that._getCurrentData()});
            },0);
          }
        });

        that._updateParentSize = function() {
          var parentStyles = window.getComputedStyle(parentObj, null);

          if(parentStyles.position === "static") {
            parentObj.style.position = "relative";
          }
          var isChanged = false;
          var ww = parseInt(parentStyles.width, 10);
          var hh = parseInt(parentStyles.height, 10);
          if(ww && ww > 0 && ww !== that.data.parentWidth) {
            that.data.parentWidth = ww;
            isChanged = true;
          }
          if(hh && hh > 0 && hh !== that.data.parentHeight) {
            that.data.parentHeight = hh;
            isChanged = true;
          }
          if(ww === 0 || hh === 0) {
            console.warn("utSticker :: parent size has zero value");
          }
          return isChanged;
        };

        that.catchEvents = function(obj, callback) {
          var mStart = {};
          var mLast = {};
          var path = 0;
          var $body = $("body");
          var onDown = function(e) {
            path = 0;
            var mx = e.pageX ? e.pageX : (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageX : 0);
            var my = e.pageY ? e.pageY : (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageY : 0);
            mStart = { x:mx, y:my };
            mLast = { x:mx, y:my };
            $body.on(mouseMove, onMove);
            $body.on(mouseEnd, onUp);
            if(callback) {
              if(callback.call(obj, "down", {x:mx, y:my, offStart:{x:0, y:0}, offLast:{x:0, y:0}}) === false) {
                e.stopPropagation();
                if(that.options.styles.preventEventsBubble) {
                  e.preventDefault();
                }
              }
            }
          };
          var onUp = function(e) {
            var mx = e.pageX ? e.pageX : (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageX : 0);
            var my = e.pageY ? e.pageY : (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageY : 0);
            if(callback) {
              if(callback.call(obj, "up", {
                x: mx,
                y: my,
                offStart: {
                  x: mx - mStart.x,
                  y: my - mStart.y
                },
                offLast:{
                  x: mx - mLast.x,
                  y: my - mLast.y
                }
              }) === false) {
                e.stopPropagation();
                if(that.options.styles.preventEventsBubble) {
                  e.preventDefault();
                }
              }
            }
            if(path < 3 && that.options.styles.preventEventsBubble && that.isTouch) {
              obj.trigger("click");
            }
            mLast = { x:mx, y:my };
            $body.off(mouseMove, onMove);
            $body.off(mouseEnd, onUp);
          };
          var onMove = function(e) {
            var mx = e.pageX ? e.pageX : (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageX : 0);
            var my = e.pageY ? e.pageY : (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageY : 0);
            path += Math.abs(mx-mLast.x) + Math.abs(my-mLast.y);
            if(callback) {
              if(callback.call(obj, "move", {
                x: mx,
                y: my,
                offStart: {
                  x: mx-mStart.x,
                  y: my-mStart.y
                },
                offLast:{
                  x: mx-mLast.x,
                  y: my-mLast.y
                }
              }) === false) {
                e.stopPropagation();
                if(that.options.styles.preventEventsBubble) {
                  e.preventDefault();
                }
              }
            }
            mLast = { x:mx, y:my };
          };
          obj.on(mouseStart, onDown);
        };

        /********************************************************************************
         * sticker buttons
         ********************************************************************************/
        that.createButtons = function() {
          // get or create remove button
          $that.find(".ut-sticker-button").remove();
          that.view.remove = null;
          that.view.edit = null;
          that.view.rotate = null;
          that.view.resize = null;

          if(that.options.ui.remove) {
            that.view.remove = $("<a>").addClass("ut-sticker-button ut-sticker-button-remove icon_delete")
              .attr("data-bkey", "remove")
              .attr("title", i18n.get('remove'))
              .appendTo($that);
            that.view.remove.on(mouseStart, that.onButtonDown);
            that.view.remove.on(mouseEnd, that.onButtonUp);
            that.view.remove.on("click", that.onButtonClick);
          }

          if(that.options.ui.edit) {
            that.view.edit = $("<a>")
              .addClass("ut-sticker-button ut-sticker-button-edit icon_edit")
              .attr("data-bkey", "edit")
              .attr("title", i18n.get('edit')).appendTo($that);
            that.view.edit.on(mouseStart, that.onButtonDown);
            that.view.edit.on(mouseEnd, that.onButtonUp);
            that.view.edit.on("click", that.onButtonClick);
          }

          that.options.ui.rotate = that.data.rotatable ? that.options.ui.rotate : false;
          that.options.ui.resize = that.data.resizable ? that.options.ui.resize : false;

          if(that.options.ui.rotate === null) {
            if(that.options.styles.proportional) {
              that.options.ui.rotate = !that.options.ui.resize;
            } else {
              that.options.ui.rotate = true;
            }
          }
          if(that.options.ui.resize === null) {
            if(that.options.styles.proportional) {
              that.options.ui.resize = !that.options.ui.rotate;
            } else {
              that.options.ui.resize = true;
            }
          }

          // get or create rotate button
          if(that.options.ui.rotate) {
            that.view.rotate = $("<a>")
              .addClass("ut-sticker-button ut-sticker-button-rotate icon_rotate")
              .attr("title", i18n.get('rotate'))
              .appendTo($that);
            that.catchEvents(that.view.rotate, that.onElementRotate);
          }

          // get or create remove button
          if(that.options.ui.resize) {
            that.view.resize = $("<a>")
              .addClass("ut-sticker-button ut-sticker-button-resize icon_fullscreen")
              .attr("title", i18n.get('resize'))
              .appendTo($that);
            that.catchEvents(that.view.resize, that.onElementResize);
          }

          if((that.view.rotate && !that.view.resize) || (!that.view.rotate && that.view.resize)) {
            $that.addClass("ut-sticker-one-scale-size-button");
          } else {
            $that.removeClass("ut-sticker-one-scale-size-button");
          }

          for(var qq in that.options.ui) {
            if(that.options.ui[qq]) {
              if(qq === "edit" || qq === "resize" || qq === "rotate" || qq === "remove") {
                continue;
              }
              var className = that.options.ui[qq];
              var tmp = $("<a>").addClass("ut-sticker-button ut-sticker-button-custom " + className);
              if(i18n.get(qq)) {
                tmp.attr("title", i18n.get(qq));
              }
              tmp.appendTo($that);
              tmp.attr("data-bkey", qq);
              tmp.on(mouseStart, that.onButtonDown);
              tmp.on(mouseEnd, that.onButtonUp);
              tmp.on("click", that.onButtonClick);
            }
          }
        };

        that.onButtonDown = function(e) {
          that.preventButtonEvents = $(this).attr("data-bkey");
          e.stopPropagation();
        };

        that.onButtonUp = function(e) {
          if(that.preventButtonEvents !== $(this).attr("data-bkey")) {
            return;
          }
          e.stopPropagation();
        };

        that.onButtonClick = function(event) {
          var id = $(this).attr("data-bkey");
          var isStopEvent = false;
          var isBreakEvent = false;
          if(id === "remove" && !that.options.styles.preventAutoRemove) {
            that.removeElement();
          } else {
            var ev = $.Event(events.buttonClick);
            $content.trigger(ev, id);
            isStopEvent = ev.isPropagationStopped();
            isBreakEvent = ev.isDefaultPrevented();
          }
          if(isStopEvent || (that.options.styles.preventEventsBubble && that.isEditMode && that.data.editable)) {
            event.stopPropagation();
          }
          if(isBreakEvent || (that.options.styles.preventEventsBubble && that.isEditMode && that.data.editable)) {
            event.preventDefault();
          }
        };

        /********************************************************************************
         * prepare element
         ********************************************************************************/
        that.prepareElement = function() {
          $that.addClass("ut-sticker");
          if(that.isMSIE) {
            $that.addClass("msie");
          }

          $that[0].style.position = "absolute";
          $content.addClass("ut-sticker-content");

          if($content[0].getAttribute("id") === "" && that.options.id) {
            that.options.id = "sticker-" + UT.uuid();
            console.warn("utSticker :: element ID not found, generating new:", that.options.id);
          }
          if(that.options.id !== "") {
            $content[0].setAttribute("id", that.options.id);
          } else {
            that.options.id = $content[0].getAttribute("id");
          }

          $content[0].style.width = "100%";
          $content[0].style.height = "100%";

          if(that.isEditMode) {
            $that.addClass("ut-sticker-edit");
          }

          // attach events for move sticker and blur
          that.catchEvents($that, that.onElementMouse);
          // "click" event to ut-sticker-content
          $that.on("click", that.onElementClick);
          $("body").on(mouseStart, that.onBodyClick);
        };

        that.parseSizeValue = function(sss, size, def) {
          var tmp;
          tmp = sss.toString().match(/([+\-]?[0-9]*(\.[0-9]+)?)(px|%)?/i);
          if(tmp && (typeof(tmp[3]) === "undefined" || tmp[3] === null || tmp[3] === "px")) {
            return parseFloat(tmp[1]);
          } else if(tmp && tmp[3] === "%") {
            return parseFloat(tmp[1]) / 100 * size;
          }
          return (typeof(def) !== "undefined" ? def : null);
        };

        that.preparePosition = function() {
          that.pos = that.post.storage["utSticker_" + that.options.id + "_pos"] || {};
          var width = 0;
          var height = 0;

          if(typeof(that.pos.width) === "undefined" &&
            typeof(that.pos.ratio) === "undefined" &&
            (typeof(that.options.styles.pos.width) === "undefined" || that.options.styles.pos.width === null || that.options.styles.pos.width === false || that.options.styles.pos.width === "auto") &&
            (typeof(that.options.styles.pos.ratio) === "undefined" || that.options.styles.pos.ratio === null || that.options.styles.pos.ratio === false || that.options.styles.pos.ratio === "auto") &&
            (typeof(that.options.styles.pos.height) === "undefined" || that.options.styles.pos.height === null || that.options.styles.pos.height === false || that.options.styles.pos.height === "auto") &&
            defWidth && defHeight) {
            width = defWidth;
            height = defHeight;
            that.pos.width = width / that.data.parentWidth;
            that.pos.ratio = width / height;
          } else {
            // check width
            if(typeof(that.pos.width) === "undefined") {
              width = that.parseSizeValue(that.options.styles.pos.width, that.data.parentWidth, 0.3 * that.data.parentWidth);
              that.pos.width = width / that.data.parentWidth;
            } else {
              width = that.pos.width * that.data.parentWidth;
            }

            // check height
            if(typeof(that.pos.ratio) === "undefined") {
              if(that.options.styles.pos.ratio === "auto" || that.options.styles.pos.height === "auto") {
                that.pos.ratio = defWidth / defHeight;
              } else {
                if(typeof(that.options.styles.pos.ratio) !== "undefined" && that.options.styles.pos.ratio !== null && that.options.styles.pos.ratio !== false && that.options.styles.pos.ratio !== "auto") {
                  that.pos.ratio = parseFloat(that.options.styles.pos.ratio);
                  height = width / that.pos.ratio;
                } else if(typeof(that.options.styles.pos.height) !== "undefined" && that.options.styles.pos.height !== null && that.options.styles.pos.height !== false && that.options.styles.pos.height !== "auto") {
                  height = that.parseSizeValue(that.options.styles.pos.height, that.data.parentHeight, 0.3 * that.data.parentHeight);
                  that.pos.ratio = width / height;
                } else {
                  height = width;
                  that.pos.ratio = width / height;
                }
              }
            }
          }

          // check left
          if(typeof(that.pos.left) === "undefined") {
            if(typeof(that.options.styles.pos.cx) !== "undefined" && that.options.styles.pos.cx !== null && that.options.styles.pos.cx !== false) {
              that.pos.left = that.parseSizeValue(that.options.styles.pos.cx, that.data.parentWidth, 0.5 * that.data.parentWidth);
            } else if(typeof(that.options.styles.pos.left) !== "undefined" && that.options.styles.pos.left !== null && that.options.styles.pos.left !== false) {
              that.pos.left = that.parseSizeValue(that.options.styles.pos.left, that.data.parentWidth, 0.5 * that.data.parentWidth);
              that.pos.left += width / 2;
            } else if(typeof(that.options.styles.pos.right) !== "undefined" && that.options.styles.pos.right !== null && that.options.styles.pos.right !== false) {
              that.pos.left = that.data.parentWidth - that.parseSizeValue(that.options.styles.pos.right, that.data.parentWidth, 0.5 * that.data.parentWidth);
              that.pos.left -= width / 2;
            } else {
              that.pos.left = 0.5 * that.data.parentWidth;
            }
            that.pos.left = that.pos.left / that.data.parentWidth;
          }

          // check top
          if(typeof(that.pos.top) === "undefined") {
            if(typeof(that.options.styles.pos.cy) !== "undefined" && that.options.styles.pos.cy !== null && that.options.styles.pos.cy !== false) {
              that.pos.top = that.parseSizeValue(that.options.styles.pos.cy, that.data.parentHeight, 0.5 * that.data.parentHeight);
            } else if(typeof(that.options.styles.pos.top) !== "undefined" && that.options.styles.pos.top !== null && that.options.styles.pos.top !== false) {
              that.pos.top = that.parseSizeValue(that.options.styles.pos.top, that.data.parentHeight, 0.5 * that.data.parentHeight);
              that.pos.top += height / 2;
            } else if(typeof(that.options.styles.pos.bottom) !== "undefined" && that.options.styles.pos.bottom !== null && that.options.styles.pos.bottom !== false) {
              that.pos.top = that.data.parentHeight - that.parseSizeValue(that.options.styles.pos.bottom, that.data.parentHeight, 0.5 * that.data.parentHeight);
              that.pos.top -= height / 2;
            } else {
              that.pos.top = 0.5 * that.data.parentHeight;
            }
            that.pos.top = that.pos.top / that.data.parentHeight;
          }

          // check angle
          if(typeof(that.pos.angle) === "undefined") {
            if(typeof(that.options.styles.pos.rotation) === "undefined") {
              that.pos.angle = 0;
            } else {
              that.pos.angle = parseFloat(that.options.styles.pos.rotation) / 180 * Math.PI;
            }
          }

          // check zIndex
          if(typeof(that.pos.zIndex) === "undefined") {
            if(typeof(that.options.styles.pos.zIndex) === "undefined") {
              that.pos.zIndex = window.utStickerLastZIndex++;
            } else {
              that.pos.zIndex = parseInt(that.options.styles.pos.zIndex, 10);
            }
          }
          if(window.utStickerLastZIndex <= that.pos.zIndex) {
            window.utStickerLastZIndex = that.pos.zIndex + 1;
          }
        };

        that.applyNewPosition = function(pos) {
          var width, height, isChanged = false;
          if(typeof(pos.width) !== "undefined" && pos.width !== null && pos.width !== false && pos.width !== "auto") {
            width = that.parseSizeValue(pos.width, that.data.parentWidth, 0.3 * that.data.parentWidth);
            that.pos.width = width / that.data.parentWidth;
            isChanged = true;
          } else {
            width = that.pos.width * that.data.parentWidth;
          }

          if(typeof(pos.ratio) !== "undefined" && pos.ratio !== null && pos.ratio !== false && pos.ratio !== "auto") {
            that.pos.ratio = parseFloat(pos.ratio);
            height = width / that.pos.ratio;
            isChanged = true;
          } else if(typeof(pos.height) !== "undefined" && pos.height !== null && pos.height !== false && pos.height !== "auto") {
            height = that.parseSizeValue(pos.height, that.data.parentHeight, 0.3 * that.data.parentHeight);
            that.pos.ratio = width / height;
            isChanged = true;
          } else {
            height = width * that.data.parentWidth;
          }

          if(typeof(pos.cx) !== "undefined" && pos.cx !== null && pos.cx !== false) {
            that.pos.left = that.parseSizeValue(pos.cx, that.data.parentWidth, 0.5 * that.data.parentWidth);
            that.pos.left = that.pos.left / that.data.parentWidth;
            isChanged = true;
          } else if(typeof(pos.left) !== "undefined" && pos.left !== null && pos.left !== false) {
            that.pos.left = that.parseSizeValue(pos.left, that.data.parentWidth, 0.5 * that.data.parentWidth);
            that.pos.left += width / 2;
            that.pos.left = that.pos.left / that.data.parentWidth;
            isChanged = true;
          } else if(typeof(pos.right) !== "undefined" && pos.right !== null && pos.right !== false) {
            that.pos.left = that.data.parentWidth - that.parseSizeValue(pos.right, that.data.parentWidth, 0.5 * that.data.parentWidth);
            that.pos.left -= width / 2;
            that.pos.left = that.pos.left / that.data.parentWidth;
            isChanged = true;
          }

          if(typeof(pos.cy) !== "undefined" && pos.cy !== null && pos.cy !== false) {
            that.pos.top = that.parseSizeValue(pos.cy, that.data.parentHeight, 0.5 * that.data.parentHeight);
            that.pos.top = that.pos.top / that.data.parentHeight;
            isChanged = true;
          } else if(typeof(pos.top) !== "undefined" && pos.top !== null && pos.top !== false) {
            that.pos.top = that.parseSizeValue(pos.top, that.data.parentHeight, 0.5 * that.data.parentHeight);
            that.pos.top += height / 2;
            that.pos.top = that.pos.top / that.data.parentHeight;
            isChanged = true;
          } else if(typeof(pos.bottom) !== "undefined" && pos.bottom !== null && pos.bottom !== false) {
            that.pos.top = that.data.parentHeight - that.parseSizeValue(pos.bottom, that.data.parentHeight, 0.5 * that.data.parentHeight);
            that.pos.top -= height / 2;
            that.pos.top = that.pos.top / that.data.parentHeight;
            isChanged = true;
          }

          // check angle
          if(typeof(pos.rotation) !== "undefined" && pos.rotation !== null && pos.rotation !== false) {
            that.pos.angle = parseFloat(pos.rotation) / 180 * Math.PI;
            isChanged = true;
          }

          // check zIndex
          if(typeof(pos.zIndex) !== "undefined" && pos.zIndex !== null && pos.zIndex !== false) {
            that.pos.zIndex = parseInt(pos.zIndex, 10);
            isChanged = true;
          }
          return isChanged;
        };

        that.removeElement = function() {
          $content.trigger(events.destroy, that.options.id);
          $that.remove();
          if(that.post) {
            that.post.storage["utSticker_" + that.options.id + "_pos"] = null;
            that.post.save();
          }
        };

        /********************************************************************************
         * update element position, size, e.t.c.
         ********************************************************************************/
        that.updateAngleForSnap = function(ang) {
          var bb = parseFloat(that.options.styles.rotationSnap.base) / 180 * Math.PI;
          var pr = parseFloat(that.options.styles.rotationSnap.precision) / 180 * Math.PI;
          var da = that.pos.angle - Math.round(that.pos.angle/bb) * bb;
          if(Math.abs(da) < pr) {
            return Math.round(that.pos.angle/bb) * bb;
          }
          return ang;
        };

        that.updateAngle = function() {
          // update only rotation by css-transform
          var viewAngle = that.updateAngleForSnap(that.pos.angle);
          var tmpVal = "rotateZ("+viewAngle+"rad) rotateX(0)";
          if(that.isMSIE) {
            tmpVal = "rotate("+viewAngle+"rad)";
          }
          var obj = $that[0];
          obj.style[transformStyle] = tmpVal;

          that.updateButtonsAngle();
          if(that.options.styles.autoflip) {
            that.updateContentAngle();
          }
        };

        that.updateContentAngle = function() {
          var aa = that.updateAngleForSnap(that.pos.angle);
          aa=(aa / ( 2 * Math.PI) - Math.floor(aa / (2 * Math.PI))) * (2 * Math.PI);
          if(Math.abs(aa) > (Math.PI / 2) && Math.abs(aa) < (3 * Math.PI / 2)) {
            if($content[0].classList) {
              $content[0].classList.add("ut-sticker-flip");
            } else {
              $content.addClass("ut-sticker-flip");
            }
          } else {
            if($content[0].classList) {
              $content[0].classList.remove("ut-sticker-flip");
            } else {
              $content.removeClass("ut-sticker-flip");
            }
          }
        };

        that.updateButtonsAngle = function() {
          var viewAngle = that.updateAngleForSnap(that.pos.angle);
          viewAngle *= -1;
          var qq, obj, tmpVal, tmp = $that[0].getElementsByClassName("ut-sticker-button");
          if(tmp && tmp.length > 0) {
            tmpVal = "rotateZ("+viewAngle+"rad) rotateX(0)";
            if(that.isMSIE) {
              tmpVal = "rotate("+viewAngle+"rad)";
            }
            for(qq = 0; qq < tmp.length; ++qq) {
              obj = tmp[qq];
              obj.style[transformStyle] = tmpVal;
            }
          }
        };

        /**
         * change element size (and margins)
         */
        that.updateSize = function() {
          $that[0].style.width = Math.round(that.pos.width * that.data.parentWidth) + "px";
          $that[0].style.height = Math.round(that.pos.width / that.pos.ratio * that.data.parentWidth) + "px";
          $that[0].style.marginLeft = -Math.round(that.pos.width * that.data.parentWidth / 2) + "px";
          $that[0].style.marginTop = -Math.round(that.pos.width / that.pos.ratio * that.data.parentWidth / 2) + "px";
        };

        /**
         * change element position
         */
        that.updatePosition = function() {
          $that[0].style.left = Math.round(that.pos.left * that.data.parentWidth) + "px";
          $that[0].style.top = Math.round(that.pos.top * that.data.parentHeight) + "px";
          $that[0].style.zIndex = that.pos.zIndex;
        };

        that.getBounds = function(obj, transformObject, refObject) {
          var _obj = obj.jquery ? obj[0] : obj;
          var data = _obj.getBoundingClientRect();
          if(!data) {
            return { left:0, top:0, right:0, bottom:0, width:0, height:0 };
          }

          if(refObject) {
            refObject = refObject.jquery ? refObject[0] : refObject;
            var offset = refObject.getBoundingClientRect();
            return {
              left: data.left - offset.left,
              top: data.top - offset.top,
              right: data.left - offset.left + data.width,
              bottom: data.top - offset.top + data.height,
              width: data.width,
              height: data.height
            };
          }
          return {
            left: data.left,
            top: data.top,
            right: data.left + data.width,
            bottom: data.top + data.height,
            width: data.width,
            height: data.height
          };
        };

        /**
         * update item's bounds data (that.data.curBounds)
         * @warning DOM Element repainting by browser
         * @private
         */
        that._updateBoundsInfo = function() {
          if(!that.options.styles.useBounds) {
            return;
          }
          that.data.curBounds = that.getBounds($that, false, parentObj);
        };

        /********************************************************************************
         * validate object size by bounds rect
         * @change that.pos
         * @return {Boolean} -- 'true' is position updated, 'false' - if position not changed
         ********************************************************************************/
        that.validateSizeInBounds = function(allowUpdate) {
          var asc = Math.min(that.data.parentWidth/that.data.curBounds.width, that.data.parentHeight/that.data.curBounds.height);
          if(asc < 1) {
            if(allowUpdate !== false) {
              that.pos.width *= asc;
            }
            return true;
          }
          return false;
        };

        /**
         * check element size for min and max
         * using info from that.pos
         * @change that.pos
         * @returns {boolean} -- true if size was changed
         */
        that.validateSize = function() {
          var res = that.validateSizeInBounds();

          // size in px
          var ww = that.pos.width * that.data.parentWidth;
          var hh = ww / that.pos.ratio;

          var nww = Math.min(Math.max(that.data.minWidth, ww), that.data.maxWidth);
          var nhh = Math.min(Math.max(that.data.minHeight, hh), that.data.maxHeight);

          if(nww === ww && nhh === hh) {
            return res || false;
          }

          if(that.options.styles.proportional) {
            if((nww / that.pos.ratio) > nhh) {
              nww = nhh * that.pos.ratio;
            }
            that.pos.width = nww / that.data.parentWidth;
          } else {
            that.pos.ratio = nww / nhh;
            that.pos.width = nww / that.data.parentWidth;
          }
          return true;
        };

        /**
         * check element position by parentIndent and selfOutdent
         * using info from that.pos or that.data.curBounds
         * @change that.pos
         * @returns {boolean} -- true if position was changed
         */
        that.validatePosition = function() {
          var updatePos = false;

          // without using bounds
          if(!that.options.styles.useBounds) {
            var ww = that.pos.width * that.data.parentWidth;
            var hh = ww / that.pos.ratio;
            var ll = that.pos.left * that.data.parentWidth;
            var tt = that.pos.top * that.data.parentHeight;

            if(that.data.parentIndent.left !== null) {
              if((ll - ww / 2) < that.data.parentIndent.left - that.data.selfOutdent.left) {
                ll = that.data.parentIndent.left - that.data.selfOutdent.left + ww / 2;
                updatePos = true;
              }
            }
            if(that.data.parentIndent.top !== null) {
              if((tt - hh / 2) < that.data.parentIndent.top - that.data.selfOutdent.top) {
                tt = that.data.parentIndent.top - that.data.selfOutdent.top + hh / 2;
                updatePos = true;
              }
            }
            if(that.data.parentIndent.right !== null) {
              if((ll + ww / 2) > (that.data.parentWidth - that.data.parentIndent.right + that.data.selfOutdent.right)) {
                ll = (that.data.parentWidth - that.data.parentIndent.right + that.data.selfOutdent.right) - ww / 2;
                updatePos = true;
              }
            }
            if(that.data.parentIndent.bottom !== null) {
              if((tt + hh / 2) > (that.data.parentHeight - that.data.parentIndent.bottom + that.data.selfOutdent.bottom)) {
                tt = (that.data.parentHeight - that.data.parentIndent.bottom + that.data.selfOutdent.bottom) - hh / 2;
                updatePos = true;
              }
            }

            if(updatePos) {
              that.pos.left = ll / that.data.parentWidth;
              that.pos.top = tt / that.data.parentHeight;
            }
            return updatePos;
          }

          // check position
          if(that.data.parentIndent.left !== null) {
            if(that.data.curBounds.left < that.data.parentIndent.left - that.data.selfOutdent.left) {
              that.pos.left += (that.data.parentIndent.left - that.data.selfOutdent.left - that.data.curBounds.left) / that.data.parentWidth;
              updatePos = true;
            }
          }
          if(that.data.parentIndent.top !== null) {
            if(that.data.curBounds.top < that.data.parentIndent.top - that.data.selfOutdent.top) {
              that.pos.top += (that.data.parentIndent.top - that.data.selfOutdent.top - that.data.curBounds.top) / that.data.parentHeight;
              updatePos = true;
            }
          }
          if(that.data.parentIndent.right !== null) {
            if(that.data.curBounds.right > (that.data.parentWidth - that.data.parentIndent.right + that.data.selfOutdent.right)) {
              that.pos.left -= (that.data.curBounds.right - (that.data.parentWidth - that.data.parentIndent.right + that.data.selfOutdent.right)) / that.data.parentWidth;
              updatePos = true;
            }
          }
          if(that.data.parentIndent.bottom !== null) {
            if(that.data.curBounds.bottom > (that.data.parentHeight - that.data.parentIndent.bottom + that.data.selfOutdent.bottom)) {
              that.pos.top -= (that.data.curBounds.bottom - (that.data.parentHeight - that.data.parentIndent.bottom + that.data.selfOutdent.bottom)) / that.data.parentHeight;
              updatePos = true;
            }
          }
          return updatePos;
        };

        /**
         * check element angle
         * @change that.pos
         */
        that.validateAngle = function() {
          var res = false;
          var amin, amax;
          if(that.data.minAngle < that.data.maxAngle) {
            // check range
            if(that.pos.angle < that.data.minAngle || that.pos.angle > that.data.maxAngle) {
              amin = Math.abs(that.data.minAngle - that.pos.angle);
              if(amin > Math.PI) {
                amin = 2*Math.PI - amin;
              }
              amax = Math.abs(that.data.maxAngle - that.pos.angle);
              if(amax > Math.PI) {
                amax = 2*Math.PI - amax;
              }
              if(amin < amax) {
                that.pos.angle = that.data.minAngle;
                res = true;
              } else {
                that.pos.angle = that.data.maxAngle;
                res = true;
              }
            }
          } else {
            // check range
            if(that.pos.angle < that.data.minAngle && that.pos.angle > that.data.maxAngle) {
              amin = Math.abs(that.data.minAngle - that.pos.angle);
              if(amin > Math.PI) {
                amin = 2*Math.PI - amin;
              }
              amax = Math.abs(that.data.maxAngle - that.pos.angle);
              if(amax > Math.PI) {
                amax = 2*Math.PI - amax;
              }
              if(amin < amax) {
                that.pos.angle = that.data.minAngle;
                res = true;
              } else {
                that.pos.angle = that.data.maxAngle;
                res = true;
              }
            }
          }
          return res;
        };

        /**
         * update worked params from that.options structure
         * @param prm {Object} -- changes for that.options
         */
        that.updateParams = function() {
          var isChanged = false;
          if(that._updateParentSize()) {
            isChanged = true;
          }
          that._updateEditableState();
          that._updateRotationLimits();
          that._updateSizeLimits();
          that._updateParentIndent();
          return isChanged;
        };

        that._updateEditableState = function() {
          // prevent editable to view mode
          if(!that.isEditMode) {
            that.options.editable = false;
          }
          // prepare worked parameters
          if(that.options.editable === true || that.options.editable === false) {
            that.data.editable = that.data.movable = that.data.rotatable = that.data.resizable = (that.options.editable === true);
          } else if(typeof(that.options.editable) === "object") {
            that.data.movable = !!that.options.editable.movable;
            that.data.rotatable = !!that.options.editable.rotatable;
            that.data.resizable = !!that.options.editable.resizable;
            that.data.editable = that.data.movable || that.data.rotatable || that.data.resizable;
          }
          // drop focus
          if(that.data.editable === false && $that.hasClass("ut-sticker-focus")) {
            that.blur();
          }
        };

        that._updateRotationLimits = function() {
          if(that.options.styles.rotationLimits.min > 180) {
            that.options.styles.rotationLimits.min = 360 - that.options.styles.rotationLimits.min;
          }
          if(that.options.styles.rotationLimits.min < -180) {
            that.options.styles.rotationLimits.min = 360 + that.options.styles.rotationLimits.min;
          }
          if(that.options.styles.rotationLimits.max > 180) {
            that.options.styles.rotationLimits.max = 360 - that.options.styles.rotationLimits.max;
          }
          if(that.options.styles.rotationLimits.max < -180) {
            that.options.styles.rotationLimits.max = 360 + that.options.styles.rotationLimits.max;
          }
          that.data.minAngle = parseFloat(that.options.styles.rotationLimits.min) / 180 * Math.PI;
          that.data.maxAngle = parseFloat(that.options.styles.rotationLimits.max) / 180 * Math.PI;
        };

        that._updateSizeLimits = function() {
          that.data.minWidth = that.parseSizeValue(that.options.styles.sizeLimits.minWidth, that.data.parentWidth);
          if(that.data.minWidth === null) {
            that.data.minWidth = 0;
          }
          that.data.minHeight = that.parseSizeValue(that.options.styles.sizeLimits.minHeight, that.data.parentHeight);
          if(that.data.minHeight === null) {
            that.data.minHeight = 0;
          }
          that.data.maxWidth = that.parseSizeValue(that.options.styles.sizeLimits.maxWidth, that.data.parentWidth);
          if(that.data.maxWidth === null) {
            that.data.maxWidth = 0;
          }
          that.data.maxHeight = that.parseSizeValue(that.options.styles.sizeLimits.maxHeight, that.data.parentHeight);
          if(that.data.maxHeight === null) {
            that.data.maxHeight = 0;
          }
        };

        that._updateParentIndent = function() {
          if(typeof(that.options.styles.parentIndent) === "undefined" || that.options.styles.parentIndent === null || that.options.styles.parentIndent === false) {
            return;
          }

          if(typeof(that.options.styles.parentIndent) !== "object") {
            var tmp = that.parseSizeValue(that.options.styles.parentIndent, that.data.parentWidth, 0);
            that.data.parentIndent.left = that.data.parentIndent.right = tmp;

            tmp = that.parseSizeValue(that.options.styles.parentIndent, that.data.parentHeight, 0);
            that.data.parentIndent.top = that.data.parentIndent.bottom = tmp;
            return;
          }

          if(that.options.styles.parentIndent.left !== null) {
            that.data.parentIndent.left = that.parseSizeValue(that.options.styles.parentIndent.left, that.data.parentWidth, 0);
          } else {
            that.data.parentIndent.left = null;
          }

          if(that.options.styles.parentIndent.top !== null) {
            that.data.parentIndent.top = that.parseSizeValue(that.options.styles.parentIndent.top, that.data.parentHeight, 0);
          } else {
            that.data.parentIndent.top = null;
          }

          if(that.options.styles.parentIndent.right !== null) {
            that.data.parentIndent.right = that.parseSizeValue(that.options.styles.parentIndent.right, that.data.parentWidth, 0);
          } else {
            that.data.parentIndent.right = null;
          }

          if(that.options.styles.parentIndent.bottom !== null) {
            that.data.parentIndent.bottom = that.parseSizeValue(that.options.styles.parentIndent.bottom, that.data.parentHeight, 0);
          } else {
            that.data.parentIndent.bottom = null;
          }
        };

        /**
         * prepare outdent parameters for work
         * @change that.data.selfOutdent
         * @private
         */
        that._updateSelfOutdent = function() {
          if(typeof(that.options.styles.selfOutdent) === "undefined" || that.options.styles.selfOutdent === null || that.options.styles.selfOutdent === false) {
            return;
          }

          if(typeof(that.options.styles.selfOutdent) !== "object") {
            var tmp = that.parseSizeValue(that.options.styles.selfOutdent, $that.width(), 0);
            that.data.selfOutdent.left = that.data.selfOutdent.right = tmp;

            tmp = that.parseSizeValue(that.options.styles.selfOutdent, $that.height(), 0);
            that.data.selfOutdent.top = that.data.selfOutdent.bottom = tmp;
          } else {
            that.data.selfOutdent.left = that.parseSizeValue(that.options.styles.selfOutdent.left, $that.width(), 0);
            that.data.selfOutdent.top = that.parseSizeValue(that.options.styles.selfOutdent.top, $that.height(), 0);
            that.data.selfOutdent.right = that.parseSizeValue(that.options.styles.selfOutdent.right, $that.width(), 0);
            that.data.selfOutdent.bottom = that.parseSizeValue(that.options.styles.selfOutdent.bottom, $that.height(), 0);
          }
        };

        that._savePosition = function() {
          if(that.isEditMode && that.data.editable) {
            that.post.storage["utSticker_" + that.options.id + "_pos"] = that.pos;
            that.post.save();
          }
        };

        that._getCurrentData = function() {
          return {
            width: that.pos.width * that.data.parentWidth,
            height: that.pos.width/that.pos.ratio * that.data.parentWidth,
            rotation: that.pos.angle * 180 / Math.PI,
            zIndex: that.pos.zIndex
          };
        };

        /********************************************************************************
         * mouse and touch events
         ********************************************************************************/
        var itemWasMoved = false;
        var doubleClickTimeOut = 600;
        var lastClickTime = 0;
        that.onElementClick = function(event) {
          var eventType = events.click;
          var curTime = (new Date()).getTime();
          if((curTime - lastClickTime) < doubleClickTimeOut) {
            eventType = events.dblClick;
          }
          lastClickTime = curTime;
          var isStopEvent = false;
          var isBreakEvent = false;
          if(!that.isEditMode || !that.data.editable || !itemWasMoved) {
            var ev = $.Event(eventType);
            $content.trigger(ev);
            isStopEvent = ev.isPropagationStopped();
            isBreakEvent = ev.isDefaultPrevented();
          }
          if(isStopEvent || (that.options.styles.preventEventsBubble && that.isEditMode && that.data.editable)) {
            event.stopPropagation();
          }
          if(isBreakEvent || (that.options.styles.preventEventsBubble && that.isEditMode && that.data.editable)) {
            event.preventDefault();
          }
        };

        that.onElementMouse = function(type, data) {
          if(!that.isEditMode || !that.data.editable) {
            return true;
          }
          if(type === "down") {
            that.focus(true);
            itemWasMoved = false;
          } else if(type === "move" && that.data.movable) {
            if($that[0].classList) {
              $that[0].classList.add("ut-sticker-moving");
            } else {
              $that.addClass("ut-sticker-moving");
            }
            that.pos.left += data.offLast.x / that.data.parentWidth;
            that.pos.top += data.offLast.y / that.data.parentHeight;

            // change element position
            if(that.options.styles.useBounds) {
              that.updatePosition();
              $content.trigger(events.move, that._getCurrentData());
              that._updateBoundsInfo();
            }
            if(that.validatePosition() === true || !that.options.styles.useBounds) {
              that.updatePosition();
              $content.trigger(events.move, that._getCurrentData());
              that._updateBoundsInfo();
            }
            itemWasMoved = true;
          } else if(type === "up" && that.data.movable) {
            if($that[0].classList) {
              $that[0].classList.remove("ut-sticker-moving");
            } else {
              $that.removeClass("ut-sticker-moving");
            }
            that._savePosition();
            $content.trigger(events.change, that._getCurrentData());
          }
          return false;
        };

        that.onElementResize = function(type, data) {
          if(!that.isEditMode) {
            return;
          }

          if(that.data.rotatable && that.data.resizable && that.options.styles.proportional && !that.view.rotate) {
            return that.onElementRotateAndResize(type, data);
          }

          if(type === "down" && that.data.resizable) {
            that.focus(true);
            return false;
          } else if(type === "move" && that.data.resizable) {
            var tx = data.offLast.x * Math.cos(that.pos.angle) + data.offLast.y * Math.sin(that.pos.angle);
            var ty = -data.offLast.x * Math.sin(that.pos.angle) + data.offLast.y * Math.cos(that.pos.angle);
            // multiple to 2 cause scale was center
            var sx = tx * 2;
            var sy = ty * 2;
            var ow = that.pos.width * that.data.parentWidth;
            var oh = ow / that.pos.ratio;
            ow += sx;
            oh += sy;
            if(that.options.styles.proportional) {
              that.pos.width = ow / that.data.parentWidth;
            } else {
              that.pos.width = ow / that.data.parentWidth;
              that.pos.ratio = ow / oh;
            }

            // change element position
            that.validateSize();
            that.updateSize();
            $content.trigger(events.resize, that._getCurrentData());
            if(that.options.styles.useBounds) {
              that._updateBoundsInfo();
            }
            that._updateSelfOutdent();
            if(that.validatePosition() === true) {
              that.updatePosition();
              $content.trigger(events.move, that._getCurrentData());
              that._updateBoundsInfo();
            }
            return false;
          } else if(type === "up" && that.data.resizable) {
            that._savePosition();
            $content.trigger(events.change, that._getCurrentData());
            return false;
          }
        };

        that._fullOffsetLeft = function(obj) {
          var tmp = obj;
          var res = 0;
          while(tmp) {
            res += tmp.offsetLeft;
            tmp = tmp.offsetParent;
          }
          return res;
        };

        that._fullOffsetTop = function(obj) {
          var tmp = obj;
          var res = 0;
          while(tmp) {
            res += tmp.offsetTop;
            tmp = tmp.offsetParent;
          }
          return res;
        };

        that.onElementRotate = function(type, data) {
          if(!that.isEditMode) {
            return;
          }

          if(that.data.rotatable && that.data.resizable && that.options.styles.proportional && !that.view.resize) {
            return that.onElementRotateAndResize(type, data);
          }

          if(type === "down" && that.data.rotatable) {
            that.focus(true);
            return false;
          } else if(type === "move" && that.data.rotatable) {
            var ox = parseInt(that._fullOffsetLeft(parentObj), 10) + parseInt($that.css("left"), 10);
            var oy = parseInt(that._fullOffsetTop(parentObj), 10) + parseInt($that.css("top"), 10);
            var cx = data.x - ox;
            var cy = data.y - oy;

            var ang = Math.atan2(cy, cx);
            var tmpAng = Math.atan2(that.pos.width/that.pos.ratio, that.pos.width);

            that.pos.angle = ang - tmpAng;
            if(that.pos.angle > Math.PI) {
              that.pos.angle = that.pos.angle - 2 * Math.PI;
            }
            if(that.pos.angle < -Math.PI) {
              that.pos.angle = that.pos.angle + 2 * Math.PI;
            }

            that.validateAngle();

            // change element position
            that.updateAngle();
            $content.trigger(events.rotate, that._getCurrentData());
            if(that.options.styles.useBounds) {
              that._updateBoundsInfo();
              that._updateSelfOutdent();
            }
            if(that.validateSizeInBounds(false) === true) {
              that.validateSize();
              that.updateSize();
              $content.trigger(events.resize, that._getCurrentData());
              if(that.options.styles.useBounds) {
                that._updateBoundsInfo();
                that._updateSelfOutdent();
              }
            }
            if(that.validatePosition() === true) {
              that.updatePosition();
              $content.trigger(events.move, that._getCurrentData());
              that._updateBoundsInfo();
            }
            return false;
          } else if(type === "up" && that.data.rotatable) {
            that._savePosition();
            $content.trigger(events.change, that._getCurrentData());
            return false;
          }
        };

        that.onElementRotateAndResize = function(type, data) {
          if(type === "down") {
            that.focus(true);
            return false;
          } else if(type === "move") {
            // calc mouse offset by element center
            var ox = parseInt(that._fullOffsetLeft(parentObj), 10) + parseInt($that.css("left"), 10);
            var oy = parseInt(that._fullOffsetTop(parentObj), 10) + parseInt($that.css("top"), 10);
            var cx = data.x - ox;
            var cy = data.y - oy;

            var cl = Math.sqrt((cx - data.offLast.x)*(cx - data.offLast.x) + (cy - data.offLast.y)*(cy - data.offLast.y)) * 2;
            var nl = Math.sqrt(cx*cx + cy*cy) * 2;
            that.pos.width *= nl/cl;

            /* rotate element */
            var ang = Math.atan2(cy, cx);
            var tmpAng = Math.atan2(that.pos.width/that.pos.ratio, that.pos.width);

            that.pos.angle = ang - tmpAng;
            if(that.pos.angle > Math.PI) {
              that.pos.angle = that.pos.angle - 2 * Math.PI;
            }
            if(that.pos.angle < -Math.PI) {
              that.pos.angle = that.pos.angle + 2 * Math.PI;
            }

            that.validateAngle();

            /* change element position */
            that.updateAngle();
            that.validateSize();
            that.updateSize();
            $content.trigger(events.rotate, that._getCurrentData());
            $content.trigger(events.resize, that._getCurrentData());
            if(that.options.styles.useBounds) {
              that._updateBoundsInfo();
              that._updateSelfOutdent();
            }
            if(that.validatePosition() === true) {
              that.updatePosition();
              $content.trigger(events.move, that._getCurrentData());
              that._updateBoundsInfo();
            }
            return false;
          } else if(type === "up") {
            that._savePosition();
            $content.trigger(events.change, that._getCurrentData());
            return false;
          }
          return true;
        };

        that.onBodyClick = function() {
          if($that.hasClass("ut-sticker-focus") && $(this).closest(".ut-sticker").length <= 0) {
            that.blur();
          }
        };

        /********************************************************************************
         * commands
         ********************************************************************************/
        that.hide = function() {
          $that[0].style.display = "none";
          $content[0].style.display = "none";
        };

        that.show = function() {
          $that[0].style.display = "";
          $content[0].style.display = "";
        };

        that.focus = function(isChangeZIndex) {
          if(!that.data.editable || $that.hasClass("ut-sticker-focus")) {
            return;
          }
          var tmp = parentObj.getElementsByClassName("ut-sticker");
          if(tmp && tmp[0]) {
            $(tmp).utSticker("blur");
          }
          $that.addClass("ut-sticker-focus");
          $that.trigger(events.focus, that.options.id);
          if(that.options.styles.topOnFocus && isChangeZIndex) {
            that.pos.zIndex = window.utStickerLastZIndex++;
            $that[0].style.zIndex = that.pos.zIndex;
            $content.trigger(events.change, that._getCurrentData());
          }
        };

        that.blur = function() {
          if(!$that.hasClass("ut-sticker-focus")) {
            return;
          }
          $that.removeClass("ut-sticker-focus");
          $that.trigger(events.blur, that.options.id);
        };

        /**
         * update sticker size and position (need to call when parent size changed)
         */
        that.update = function(pos) {
          var isPosChanged = false;
          if(that.updateParams()) {
            isPosChanged = true;
          }
          that.createButtons();
          if(pos && that.applyNewPosition(pos)) {
            isPosChanged = true;
          }
          that.updateSize();
          that.updatePosition();
          if(!that.options.autoflip) {
            $content.removeClass("ut-sticker-flip");
          }
          that.validateAngle();
          that.updateAngle();
          that._updateBoundsInfo();
          that._updateSelfOutdent();
          if(that.data.resizable) {
            if(that.validateSize() === true) {
              isPosChanged = true;
              that.updateSize();
            }
          }
          if(that.data.movable) {
            if(that.validatePosition() === true) {
              isPosChanged = true;
              that.updatePosition();
            }
          }
          that._updateBoundsInfo();
          that._updateSelfOutdent();
          if(isPosChanged) {
            $content.trigger(events.change, that._getCurrentData());
            that._savePosition();
          }
        };

        /**
         * change editable state
         * @param data {boolean|object} -- turn on/off posibility for editable sticker. Can be object with {movable,rotatable,resizable}
         */
        that.editable = function(data) {
          if(typeof(data) === "object") {
            that.options.editable = $.extend(true, {}, data);
          } else {
            that.options.editable = data;
          }
          that._updateEditableState();
        };

        /********************************************************************************
         * init element
         ********************************************************************************/
        var isPosChanged = false;
        that.updateParams();
        that.prepareElement();
        that.createButtons();
        that.preparePosition();
        that.updateSize();
        that.updatePosition();
        that.updateAngle();
        that._updateBoundsInfo();
        that._updateSelfOutdent();
        if(that.data.resizable) {
          if(that.validateSize() === true) {
            that.updateSize();
            isPosChanged = true;
          }
        }
        if(that.data.movable) {
          if(that.validatePosition() === true) {
            that.updatePosition();
            isPosChanged = true;
          }
        }
        that._updateBoundsInfo();
        that._updateSelfOutdent();
        that.initialized = true;
        if(that.post) {
          setTimeout(function(){
            if(!that.post.storage["utSticker_" + that.options.id + "_pos"]) {
              that._savePosition();
            }
            $content.trigger(events.ready, {id:that.options.id, data:that._getCurrentData()});
          },0);
        }
        if(isPosChanged) {
          setTimeout(function(){
            $content.trigger(events.change, that._getCurrentData());
          },0);
          that._savePosition();
        }
      });
      return this;
    },

    hide: function() {
      this.each(function() {
        if(this.utSticker && this.utSticker.hide){
          this.utSticker.hide.call(this);
        }
      });
      return this;
    },

    show: function() {
      this.each(function() {
        if(this.utSticker && this.utSticker.show){
          this.utSticker.show.call(this);
        }
      });
      return this;
    },

    focus: function() {
      this.each(function() {
        if(this.utSticker && this.utSticker.focus){
          this.utSticker.focus.call(this);
        }
      });
      return this;
    },

    blur: function() {
      this.each(function() {
        if(this.utSticker && this.utSticker.blur){
          this.utSticker.blur.call(this);
        }
      });
      return this;
    },

    update: function() {
      this.each(function() {
        if(this.utSticker && this.utSticker.update){
          this.utSticker.update.call(this);
        }
      });
      return this;
    },

    editable: function(data) {
      this.each(function() {
        if(this.utSticker && this.utSticker.editable){
          this.utSticker.editable.call(this, data);
        }
      });
      return this;
    },

    remove: function() {
      this.each(function() {
        if(this.utSticker && this.utSticker.removeElement){
          this.utSticker.removeElement.call(this);
        }
      });
      return this;
    },

    destroy: function() {
      return methods.remove.apply(this);
    }
  };

  $.fn.utSticker = function(method) {
    if(typeof method === 'object' || !method) {
      methods.init.apply(this, arguments);
    } else if(methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      $.error('Method ' + method + ' does not exist on $.utSticker');
    }
    return this;
  };
}(UT, jQuery, window, document, undefined));