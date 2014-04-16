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

/**
 * FontDetect - A simple library to detect if an internal font is present or an external font got loaded.
 * 
 * TO USE: 
 *     Include jQuery. This was developed using jQuery 1.7.
 *     Include this file. If desired, you can load this file after the BODY.
 *     Create a new fontdetect().
 *     After you load the fonts you want to test, call either of these methods:
 *     
 *	       fontDetect = new fontdetect();
 *	       
 *	       // Checks that the font is loaded now.
 *	       isLoaded = fontDetect.isFontLoaded(fontname);
 *     
 *         // Polls for the font getting loaded and calls a callback when it does.
 *	       fontDetect.onFontLoaded(fontname, callback [, {onFail: xxx, msInterval: yyy, msTimeout: zzz}]);
 *     
 *     Note: For externally loaded fonts, you may have to wait for more than a second to get a reliable 
 *     answer. Internal browser fonts can be detected immediately.
 *     
 *         // Determines which font in the font stack is being used for a given element.
 *	       sFontname = fontDetect.whichFont(element);
 *     
 * @author		Jennifer Simonds
 * @copyright	2012 Jennifer Simonds
 * @license	MIT License http://opensource.org/licenses/MIT
 * 
 * @version 1.0  2012-04-11	Created.
 * 
 * @version 1.0  2012-04-12	Refined the algorithm to use fewer helper elements, more reference fonts,
 *								and quicker detection of a nonexistent font.
 * 
 * @version 2.0  2012-06-01	Added onFontLoaded for a callback to execute as soon as the font is 
 *								detected or when a timeout has passed without loading. Added whichFont
 *								to determine which font actually loaded. Changed the license from BSD 
 *								3-clause to MIT.
 *								
 * @version 2.1  2012-08-12	Fixed a bug that caused horizontal scrollbar to show up in FF & IE.
 *                              (Thanks to Geoff Beaumont for the bug report & fix)
 */
fontdetect = function()
{
	// The private parts
	var _isInitialized = false;
	var _aFallbackFonts = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy'];
	
	function _init ()
	{
		if (_isInitialized)
		{	return;
		}

		_isInitialized = true;

		$('body > :first-child').before(
			'<div id="fontdetectHelper"><span>abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ</span></div>'
		);
		$('#fontdetectHelper').css({
			'position': 'absolute',
			'visibility': 'hidden',
			'top': '-200px',
			'left': '-100000px',
			'width': '100000px',
			'height': '200px',
			'font-size': '100px'
		});
	}

	
	// The public interface
	return	{
		/**
		 * Polls 10 times/second until a font gets loaded or until it times out. (Default = 2 secs) It 
		 * calls a callback on load, & optionally calls another function if it times out without loading.
		 * 
		 * NOTE: You must specify at least one callback - for success or failure.
		 * 
		 * @param string		The font name to check for.
		 * @param function		The function to call if it gets loaded within the timeout period.
		 * @param options		An optional object with named parameters:
		 *     @param onFail       The function to call if the font doesn't load within the timeout period.
		 *     @param msInterval   How many milliseconds for the polling interval. Default = 100.
		 *     @param msTimeout    How many milliseconds until we time out & call onFail. Default = 2000.
		 */
		onFontLoaded: function (p_cssFontName, p_onLoad, p_onFail, p_options)
		{
			if (!p_cssFontName)
			{	return;
			}
			
			// Our hashtable of optional params.
			var msInterval = (p_options && p_options.msInterval) ? p_options.msInterval : 100;
			var msTimeout  = (p_options && p_options.msTimeout) ? p_options.msTimeout : 2000;

			if (!p_onLoad && !p_onFail)
			{	// Caller must specify at least one callback.
				return;
			}
			
			if (!_isInitialized)
			{	_init ();
			}
			
			if (this.isFontLoaded(p_cssFontName))
			{	// It's already here, so no need to poll.
				if (p_onLoad)
				{	p_onLoad(p_cssFontName);
				}
				return;
			}
			
			// At this point we know the font hasn't loaded yet. Add it to the list of fonts to monitor.
			
			// Set up an interval using msInterval. The callback calls isFontLoaded(), & if true
			// it closes the interval & calls p_onLoad, else if the current time has timed out
			// it closes the interval & calls onFail if there is one.
			var outerThis = this;
			var utStart = new Date().getTime();
			var idInterval = setInterval (
				function()
				{
					if (outerThis.isFontLoaded(p_cssFontName))
					{	// It's now loaded.
						clearInterval (idInterval);
						p_onLoad(p_cssFontName);
						return;
					}
					else
					{	// Still not loaded.
						var utNow = new Date().getTime();
						if ((utNow - utStart) > msTimeout)
						{
							clearInterval (idInterval);
							if (p_onFail)
							{	p_onFail(p_cssFontName);
							}
						}
					}
				},
				msInterval
			);
		},


		/**
		 * Determines if a font has gotten loaded.
		 * 
		 * @param string		The font name to check for.
		 * 
		 * @returns bool		true if it's loaded, else false if the browser had to use a fallback font.
		 */
		isFontLoaded: function (p_cssFontName)
		{
			var wThisFont = 0;
			var wPrevFont = 0;

			if (!_isInitialized)
			{	_init ();
			}
			
			for(var ix = 0; ix < _aFallbackFonts.length; ++ix)
			{
				var $helperSpan = $('#fontdetectHelper > SPAN');
				$helperSpan.css('font-family', p_cssFontName + ',' + _aFallbackFonts[ix]);
				wThisFont = $helperSpan.width();
				if (ix > 0 && wThisFont != wPrevFont)
				{// This iteration's font was different than the previous iteration's font, so it must
				//  have fallen back on a generic font. So our font must not exist.
					return false;
				}

				wPrevFont = wThisFont;
			}

			// The widths were all the same, therefore the browser must have rendered the text in the same
			// font every time. So unless all the generic fonts are identical widths (highly unlikely), it 
			// couldn't have fallen back to a generic font. It's our font.
			return true;
		},


		/**
		 * Determines which font is being used for a given element.
		 * 
		 * @param string/object		The element to examine. If it's a string, it's a jQuery selector. If it's 
		 *							an object, it's taken as a DOM element.
		 * 
		 * @returns string			The name of the font that's being used - either one of the fonts 
		 *							listed in the element's font-family css value, or null.
		 */
		whichFont: function (p_element)
		{
			var sStack = $(p_element).css('font-family');
			var aStack = sStack.split(',');
			
			var sFont = aStack.shift();
			while (sFont)
			{
				sFont = sFont.replace(/^\s*['"]?\s*([^'"]*)\s*['"]?\s*$/, '$1');
				
				if (this.isFontLoaded(sFont))
				{	return sFont;
				}
				sFont = aStack.shift();
			}
			
			return null;
		}
	};
}();

/**
 * @preserve  textfill
 * @name      jquery.textfill.js
 * @author    Russ Painter
 * @author    Yu-Jie Lin
 * @version   0.4.0
 * @date      2013-08-16
 * @copyright (c) 2012-2013 Yu-Jie Lin
 * @copyright (c) 2009 Russ Painter
 * @license   MIT License
 * @homepage  https://github.com/jquery-textfill/jquery-textfill
 * @example   http://jquery-textfill.github.io/jquery-textfill/index.html
*/
; (function($) {
  /**
  * Resizes an inner element's font so that the inner element completely fills the outer element.
  * @param {Object} Options which are maxFontPixels (default=40), innerTag (default='span')
  * @return All outer elements processed
  */
  $.fn.textfill = function(options) {
    var defaults = {
      debug: false,
      maxFontPixels: 40,
      minFontPixels: 4,
      innerTag: 'span',
      widthOnly: false,
      success: null,          // callback when a resizing is done
      callback: null,         // callback when a resizing is done (deprecated, use success)
      fail: null,             // callback when a resizing is failed
      complete: null,         // callback when all is done
      explicitWidth: null,
      explicitHeight: null
    };
    var Opts = $.extend(defaults, options);

    function _sizing(prefix, ourText, func, max, maxHeight, maxWidth, minFontPixels, maxFontPixels) {
      while (minFontPixels < maxFontPixels - 1) {
        var fontSize = Math.floor((minFontPixels + maxFontPixels) / 2)
        ourText.css('font-size', fontSize);
        if (func.call(ourText) <= max) {
          minFontPixels = fontSize;
          if (func.call(ourText) == max) {
            break;
          }
        } else {
          maxFontPixels = fontSize;
        }
      }
      ourText.css('font-size', maxFontPixels);
      if (func.call(ourText) <= max) {
        minFontPixels = maxFontPixels;
      }
      return minFontPixels;
    }

    this.each(function() {
      var ourText = $(Opts.innerTag + ':visible:first', this);
      // Use explicit dimensions when specified
      var maxHeight = Opts.explicitHeight || $(this).height();
      var maxWidth = Opts.explicitWidth || $(this).width();
      var oldFontSize = ourText.css('font-size');
      var fontSize;
      var minFontPixels = Opts.minFontPixels;
      var maxFontPixels = Opts.maxFontPixels <= 0 ? maxHeight : Opts.maxFontPixels;
      var HfontSize = undefined;

      if (!Opts.widthOnly) {
        HfontSize = _sizing('H', ourText, $.fn.height, maxHeight, maxHeight, maxWidth, minFontPixels, maxFontPixels);
      }
      var WfontSize = _sizing('W', ourText, $.fn.width, maxWidth, maxHeight, maxWidth, minFontPixels, maxFontPixels);

      if (Opts.widthOnly) {
        ourText.css('font-size', WfontSize);
      } else {
        ourText.css('font-size', Math.min(HfontSize, WfontSize));
      }

      if (ourText.width()  > maxWidth 
      || (ourText.height() > maxHeight && !Opts.widthOnly)
      ) {
        ourText.css('font-size', oldFontSize);
        if (Opts.fail) {
          Opts.fail(this);
        }
      } else if (Opts.success) {
        Opts.success(this);
      } else if (Opts.callback) {
        // call callback on each result
        Opts.callback(this);
      }
    });

    // call complete when all is complete
    if (Opts.complete) Opts.complete(this);

    return this;
  };
})(window.jQuery);

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
 
 function loadJPlayer() {
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
}


/*!
 * Paper.js v0.8 - The Swiss Army Knife of Vector Graphics Scripting.
 * http://paperjs.org/
 *
 * Copyright (c) 2011 - 2013, Juerg Lehni & Jonathan Puckey
 * http://lehni.org/ & http://jonathanpuckey.com/
 *
 * Distributed under the MIT license. See LICENSE file for details.
 *
 * All rights reserved.
 *
 * Date: Sat Mar 23 17:08:17 2013 -0700
 *
 ***
 *
 * Bootstrap.js JavaScript Inheritance Micro-Framework
 * Copyright (c) 2006 - 2013 Juerg Lehni
 * http://lehni.org/
 *
 * Distributed under the MIT license.
 *
 ***
 *
 * Acorn.js
 * http://marijnhaverbeke.nl/acorn/
 *
 * Acorn is a tiny, fast JavaScript parser written in JavaScript,
 * created by Marijn Haverbeke and released under an MIT license.
 *
 */
function loadPaper() {
window.paper = new function() {

  var Base = new function() { 
    var hidden = /^(statics|generics|preserve|enumerable|prototype|toString|valueOf)$/,
      proto = Object.prototype,
      toString = proto.toString,
      proto = Array.prototype,
      isArray = Array.isArray = Array.isArray || function(obj) {
        return toString.call(obj) === '[object Array]';
      },
      slice = proto.slice,
      forEach = proto.forEach || function(iter, bind) {
        for (var i = 0, l = this.length; i < l; i++)
          iter.call(bind, this[i], i, this);
      },
      forIn = function(iter, bind) {
        for (var i in this)
          if (this.hasOwnProperty(i))
            iter.call(bind, this[i], i, this);
      },
      create = Object.create || function(proto) {
        return { __proto__: proto };
      },
      _define = Object.defineProperty,
      _describe = Object.getOwnPropertyDescriptor;

    function define(obj, name, desc) {
      if (_define) {
        try {
          delete obj[name];
          return _define(obj, name, desc);
        } catch (e) {}
      }
      if ((desc.get || desc.set) && obj.__defineGetter__) {
        desc.get && obj.__defineGetter__(name, desc.get);
        desc.set && obj.__defineSetter__(name, desc.set);
      } else {
        obj[name] = desc.value;
      }
      return obj;
    }

    function describe(obj, name) {
      if (_describe) {
        try {
          return _describe(obj, name);
        } catch (e) {}
      }
      var get = obj.__lookupGetter__ && obj.__lookupGetter__(name);
      return get
        ? { get: get, set: obj.__lookupSetter__(name), enumerable: true,
            configurable: true }
        : obj.hasOwnProperty(name)
          ? { value: obj[name], enumerable: true, configurable: true,
              writable: true }
          : null;
    }

    function inject(dest, src, enumerable, base, preserve, generics) {
      var beans, bean;

      function field(name, val, dontCheck, generics) {
        var val = val || (val = describe(src, name))
            && (val.get ? val : val.value),
          func = typeof val === 'function',
          res = val,
          prev = preserve || func
            ? (val && val.get ? name in dest : dest[name]) : null;
        if ((dontCheck || val !== undefined && src.hasOwnProperty(name))
            && (!preserve || !prev)) {
          if (func) {
            if (prev && /\bthis\.base\b/.test(val)) {
              var fromBase = base && base[name] == prev;
              res = function() {
                var tmp = describe(this, 'base');
                define(this, 'base', { value: fromBase
                  ? base[name] : prev, configurable: true });
                try {
                  return val.apply(this, arguments);
                } finally {
                  tmp ? define(this, 'base', tmp)
                    : delete this.base;
                }
              };
              res.toString = function() {
                return val.toString();
              };
              res.valueOf = function() {
                return val.valueOf();
              };
            }
            if (beans && val.length === 0
                && (bean = name.match(/^(get|is)(([A-Z])(.*))$/)))
              beans.push([ bean[3].toLowerCase() + bean[4], bean[2] ]);
          }
          if (!res || func || !res.get)
            res = { value: res, writable: true };
          if ((describe(dest, name)
              || { configurable: true }).configurable) {
            res.configurable = true;
            res.enumerable = enumerable;
          }
          define(dest, name, res);
        }
        if (generics && func && (!preserve || !generics[name])) {
          generics[name] = function(bind) {
            return bind && dest[name].apply(bind,
                slice.call(arguments, 1));
          };
        }
      }
      if (src) {
        beans = [];
        for (var name in src)
          if (src.hasOwnProperty(name) && !hidden.test(name))
            field(name, null, true, generics);
        field('toString');
        field('valueOf');
        for (var i = 0, l = beans && beans.length; i < l; i++)
          try {
            var bean = beans[i], part = bean[1];
            field(bean[0], {
              get: dest['get' + part] || dest['is' + part],
              set: dest['set' + part]
            }, true);
          } catch (e) {}
      }
      return dest;
    }

    function each(obj, iter, bind, asArray) {
      try {
        if (obj)
          (asArray || asArray === undefined && isArray(obj)
            ? forEach : forIn).call(obj, iter, bind = bind || obj);
      } catch (e) {
        if (e !== Base.stop) throw e;
      }
      return bind;
    }

    function clone(obj) {
      return each(obj, function(val, i) {
        this[i] = val;
      }, new obj.constructor());
    }

    return inject(function() {}, {
      inject: function(src) {
        if (src) {
          var proto = this.prototype,
            base = Object.getPrototypeOf(proto).constructor,
            statics = src.statics === true ? src : src.statics;
          if (statics != src)
            inject(proto, src, src.enumerable, base && base.prototype,
                src.preserve, src.generics && this);
          inject(this, statics, true, base, src.preserve);
        }
        for (var i = 1, l = arguments.length; i < l; i++)
          this.inject(arguments[i]);
        return this;
      },

      extend: function(src) {
        var ctor = function() {
          if (this.initialize)
            return this.initialize.apply(this, arguments);
        };
        ctor.prototype = create(this.prototype);
        ctor.toString = function() {
          return (this.prototype.initialize || function() {}).toString();
        };
        define(ctor.prototype, 'constructor',
            { value: ctor, writable: true, configurable: true });
        inject(ctor, this, true);
        return arguments.length ? this.inject.apply(ctor, arguments) : ctor;
      }
    }, true).inject({
      inject: function() {
        for (var i = 0, l = arguments.length; i < l; i++)
          inject(this, arguments[i], arguments[i].enumerable);
        return this;
      },

      extend: function() {
        var res = create(this);
        return res.inject.apply(res, arguments);
      },

      each: function(iter, bind) {
        return each(this, iter, bind);
      },

      clone: function() {
        return clone(this);
      },

      statics: {
        each: each,
        clone: clone,
        define: define,
        describe: describe,

        create: function(ctor) {
          return create(ctor.prototype);
        },

        isPlainObject: function(obj) {
          var proto = obj !== null && typeof obj === 'object'
            && Object.getPrototypeOf(obj);
          return proto && (proto === Object.prototype
              || proto === Base.prototype);
        },

        check: function(obj) {
          return !!(obj || obj === 0);
        },

        pick: function() {
          for (var i = 0, l = arguments.length; i < l; i++)
            if (arguments[i] !== undefined)
              return arguments[i];
          return null;
        },

        stop: {}
      }
    });
  };

  this.Base = Base.inject({
    generics: true,

    clone: function() {
      return new this.constructor(this);
    },

    toString: function() {
      return this._id != null
        ?  (this._type || 'Object') + (this._name
          ? " '" + this._name + "'"
          : ' @' + this._id)
        : '{ ' + Base.each(this, function(value, key) {
          if (!/^_/.test(key)) {
            var type = typeof value;
            this.push(key + ': ' + (type === 'number'
                ? Format.number(value)
                : type === 'string' ? "'" + value + "'" : value));
          }
        }, []).join(', ') + ' }';
    },

    exportJson: function(options) {
      return Base.exportJson(this, options);
    },

    toJSON: function() {
      return Base.serialize(this);
    },

    _set: function(props) {
      if (Base.isPlainObject(props)) {
        for (var key in props)
          if (props.hasOwnProperty(key) && key in this)
            this[key] = props[key];
        return true;
      }
    },

    statics: {

      _types: {},

      _uid: 0,

      extend: function(src) {
        var res = this.base.apply(this, arguments);
        if (src._type)
          Base._types[src._type] = res;
        return res;
      },

      equals: function(obj1, obj2) {
        function checkKeys(o1, o2) {
          for (var i in o1)
            if (o1.hasOwnProperty(i) && typeof o2[i] === 'undefined')
              return false;
          return true;
        }
        if (obj1 == obj2)
          return true;
        if (obj1 && obj1.equals)
          return obj1.equals(obj2);
        if (obj2 && obj2.equals)
          return obj2.equals(obj1);
        if (Array.isArray(obj1) && Array.isArray(obj2)) {
          if (obj1.length !== obj2.length)
            return false;
          for (var i = 0, l = obj1.length; i < l; i++) {
            if (!Base.equals(obj1[i], obj2[i]))
              return false;
          }
          return true;
        }
        if (obj1 && typeof obj1 === 'object'
            && obj2 && typeof obj2 === 'object') {
          if (!checkKeys(obj1, obj2) || !checkKeys(obj2, obj1))
            return false;
          for (var i in obj1) {
            if (obj1.hasOwnProperty(i) && !Base.equals(obj1[i], obj2[i]))
              return false;
          }
          return true;
        }
        return false;
      },

      read: function(list, start, length, clone, readNull) {
        if (this === Base) {
          var value = this.peek(list, start);
          list._index++;
          list._read = 1;
          return value;
        }
        var proto = this.prototype,
          readIndex = proto._readIndex,
          index = start || readIndex && list._index || 0;
        if (!length)
          length = list.length - index;
        var obj = list[index];
        if (obj instanceof this
          || (proto._readNull || readNull) && obj == null && length <= 1) {
          if (readIndex)
            list._index = index + 1;
          return obj && clone ? obj.clone() : obj;
        }
        obj = Base.create(this);
        if (readIndex)
          obj._read = true;
        obj = obj.initialize.apply(obj, index > 0 || length < list.length
          ? Array.prototype.slice.call(list, index, index + length)
          : list) || obj;
        if (readIndex) {
          list._index = index + obj._read;
          list._read = obj._read;
          delete obj._read;
        }
        return obj;
      },

      peek: function(list, start) {
        return list[list._index = start || list._index || 0];
      },

      readAll: function(list, start, clone) {
        var res = [], entry;
        for (var i = start || 0, l = list.length; i < l; i++) {
          res.push(Array.isArray(entry = list[i])
            ? this.read(entry, 0, 0, clone) 
            : this.read(list, i, 1, clone));
        }
        return res;
      },

      readNamed: function(list, name) {
        var value = this.getNamed(list, name);
        return this.read(value != null ? [value] : list);
      },

      getNamed: function(list, name) {
        var arg = list[0];
        if (list._hasObject === undefined)
          list._hasObject = list.length === 1 && Base.isPlainObject(arg);
        if (list._hasObject)
          return name ? arg[name] : arg;
      },

      hasNamed: function(list, name) {
        return !!this.getNamed(list, name);
      },

      serialize: function(obj, options, compact, dictionary) {
        options = options || {};
        var root = !dictionary,
          res;
        if (root) {
          dictionary = {
            length: 0,
            definitions: {},
            references: {},
            add: function(item, create) {
              var id = '#' + item._id,
                ref = this.references[id];
              if (!ref) {
                this.length++;
                this.definitions[id] = create.call(item);
                ref = this.references[id] = [id];
              }
              return ref;
            }
          };
        }
        if (obj && obj._serialize) {
          res = obj._serialize(options, dictionary);
          if (obj._type && !compact && res[0] !== obj._type)
            res.unshift(obj._type);
        } else if (Array.isArray(obj)) {
          res = [];
          for (var i = 0, l = obj.length; i < l; i++)
            res[i] = Base.serialize(obj[i], options, compact,
                dictionary);
        } else if (Base.isPlainObject(obj)) {
          res = {};
          for (var i in obj)
            if (obj.hasOwnProperty(i))
              res[i] = Base.serialize(obj[i], options, compact,
                  dictionary);
        } else if (typeof obj === 'number') {
          res = Format.number(obj, options.precision);
        } else {
          res = obj;
        }
        return root && dictionary.length > 0
            ? [['dictionary', dictionary.definitions], res]
            : res;
      },

      deserialize: function(obj, data) {
        var res = obj;
        data = data || {};
        if (Array.isArray(obj)) {
          var type = obj[0],
            isDictionary = type === 'dictionary';
          if (!isDictionary) {
            if (data.dictionary && obj.length == 1 && /^#/.test(type))
              return data.dictionary[type];
            type = Base._types[type];
          }
          res = [];
          for (var i = type ? 1 : 0, l = obj.length; i < l; i++)
            res.push(Base.deserialize(obj[i], data));
          if (isDictionary) {
            data.dictionary = res[0];
          } else if (type) {
            var args = res;
            res = Base.create(type);
            res.initialize.apply(res, args);
          }
        } else if (Base.isPlainObject(obj)) {
          res = {};
          for (var key in obj)
            res[key] = Base.deserialize(obj[key], data);
        }
        return res;
      },

      exportJson: function(obj, options) {
        return JSON.stringify(Base.serialize(obj, options));
      },

      importJson: function(json) {
        return Base.deserialize(JSON.parse(json));
      },

      splice: function(list, items, index, remove) {
        var amount = items && items.length,
          append = index === undefined;
        index = append ? list.length : index;
        if (index > list.length)
          index = list.length;
        for (var i = 0; i < amount; i++)
          items[i]._index = index + i;
        if (append) {
          list.push.apply(list, items);
          return [];
        } else {
          var args = [index, remove];
          if (items)
            args.push.apply(args, items);
          var removed = list.splice.apply(list, args);
          for (var i = 0, l = removed.length; i < l; i++)
            delete removed[i]._index;
          for (var i = index + amount, l = list.length; i < l; i++)
            list[i]._index = i;
          return removed;
        }
      },

      merge: function() {
        return Base.each(arguments, function(hash) {
          Base.each(hash, function(value, key) {
            this[key] = value;
          }, this);
        }, new Base(), true); 
      },

      capitalize: function(str) {
        return str.replace(/\b[a-z]/g, function(match) {
          return match.toUpperCase();
        });
      },

      camelize: function(str) {
        return str.replace(/-(.)/g, function(all, chr) {
          return chr.toUpperCase();
        });
      },

      hyphenate: function(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      }
    }
  });

  var Callback = {
    attach: function(type, func) {
      if (typeof type !== 'string') {
        Base.each(type, function(value, key) {
          this.attach(key, value);
        }, this);
        return;
      }
      var entry = this._eventTypes[type];
      if (entry) {
        var handlers = this._handlers = this._handlers || {};
        handlers = handlers[type] = handlers[type] || [];
        if (handlers.indexOf(func) == -1) { 
          handlers.push(func);
          if (entry.install && handlers.length == 1)
            entry.install.call(this, type);
        }
      }
    },

    detach: function(type, func) {
      if (typeof type !== 'string') {
        Base.each(type, function(value, key) {
          this.detach(key, value);
        }, this);
        return;
      }
      var entry = this._eventTypes[type],
        handlers = this._handlers && this._handlers[type],
        index;
      if (entry && handlers) {
        if (!func || (index = handlers.indexOf(func)) != -1
            && handlers.length == 1) {
          if (entry.uninstall)
            entry.uninstall.call(this, type);
          delete this._handlers[type];
        } else if (index != -1) {
          handlers.splice(index, 1);
        }
      }
    },

    fire: function(type, event) {
      var handlers = this._handlers && this._handlers[type];
      if (!handlers)
        return false;
      var args = [].slice.call(arguments, 1);
      Base.each(handlers, function(func) {
        if (func.apply(this, args) === false && event && event.stop)
          event.stop();
      }, this);
      return true;
    },

    responds: function(type) {
      return !!(this._handlers && this._handlers[type]);
    },

    statics: {
      inject: function() {
        for (var i = 0, l = arguments.length; i < l; i++) {
          var src = arguments[i],
            events = src._events;
          if (events) {
            var types = {};
            Base.each(events, function(entry, key) {
              var isString = typeof entry === 'string',
                name = isString ? entry : key,
                part = Base.capitalize(name),
                type = name.substring(2).toLowerCase();
              types[type] = isString ? {} : entry;
              name = '_' + name;
              src['get' + part] = function() {
                return this[name];
              };
              src['set' + part] = function(func) {
                if (func) {
                  this.attach(type, func);
                } else if (this[name]) {
                  this.detach(type, this[name]);
                }
                this[name] = func;
              };
            });
            src._eventTypes = types;
          }
          this.base(src);
        }
        return this;
      }
    }
  };

  var PaperScope = this.PaperScope = Base.extend({

    initialize: function(script) {
      paper = this;
      this.project = null;
      this.projects = [];
      this.tools = [];
      this.palettes = [];
      this._id = script && (script.getAttribute('id') || script.src)
          || ('paperscope-' + (PaperScope._id++));
      if (script)
        script.setAttribute('id', this._id);
      PaperScope._scopes[this._id] = this;
      if (!this.support) {
        var ctx = CanvasProvider.getContext(1, 1);
        PaperScope.prototype.support = {
          nativeDash: 'setLineDash' in ctx || 'mozDash' in ctx || 'webkitLineDash' in ctx
        };
        CanvasProvider.release(ctx);
      }
    },

    version: 0.8,

    getView: function() {
      return this.project && this.project.view;
    },

    getTool: function() {
      if (!this._tool)
        this._tool = new Tool();
      return this._tool;
    },

    evaluate: function(code) {
      var res = PaperScript.evaluate(code, this);
      View.updateFocus();
      return res;
    },

    install: function(scope) {
      var that = this;
      Base.each(['project', 'view', 'tool'], function(key) {
        Base.define(scope, key, {
          configurable: true,
          writable: true,
          get: function() {
            return that[key];
          }
        });
      });
      for (var key in this) {
        if (!/^(version|_id)/.test(key) && !(key in scope))
          scope[key] = this[key];
      }
    },

    setup: function(canvas) {
      paper = this;
      this.project = new Project(canvas);
      return this;
    },

    clear: function() {
      for (var i = this.projects.length - 1; i >= 0; i--)
        this.projects[i].remove();
      for (var i = this.tools.length - 1; i >= 0; i--)
        this.tools[i].remove();
      for (var i = this.palettes.length - 1; i >= 0; i--)
        this.palettes[i].remove();
    },

    remove: function() {
      this.clear();
      delete PaperScope._scopes[this._id];
    },

    statics: {
      _scopes: {},
      _id: 0,

      get: function(id) {
        if (typeof id === 'object')
          id = id.getAttribute('id');
        return this._scopes[id] || null;
      }
    }
  });

  var PaperScopeItem = Base.extend(Callback, {

    initialize: function(activate) {
      this._scope = paper;
      this._index = this._scope[this._list].push(this) - 1;
      if (activate || !this._scope[this._reference])
        this.activate();
    },

    activate: function() {
      if (!this._scope)
        return false;
      var prev = this._scope[this._reference];
      if (prev && prev != this)
        prev.fire('deactivate');
      this._scope[this._reference] = this;
      this.fire('activate', prev);
      return true;
    },

    isActive: function() {
      return this._scope[this._reference] === this;
    },

    remove: function() {
      if (this._index == null)
        return false;
      Base.splice(this._scope[this._list], null, this._index, 1);
      if (this._scope[this._reference] == this)
        this._scope[this._reference] = null;
      this._scope = null;
      return true;
    }
  });

  var Point = this.Point = Base.extend({
    _type: 'Point',
    _readIndex: true,

    initialize: function(arg0, arg1) {
      var type = typeof arg0;
      if (type === 'number') {
        var hasY = typeof arg1 === 'number';
        this.x = arg0;
        this.y = hasY ? arg1 : arg0;
        if (this._read)
          this._read = hasY ? 2 : 1;
      } else if (type === 'undefined' || arg0 === null) {
        this.x = this.y = 0;
        if (this._read)
          this._read = arg0 === null ? 1 : 0;
      } else {
        if (Array.isArray(arg0)) {
          this.x = arg0[0];
          this.y = arg0.length > 1 ? arg0[1] : arg0[0];
        } else if (arg0.x != null) {
          this.x = arg0.x;
          this.y = arg0.y;
        } else if (arg0.width != null) {
          this.x = arg0.width;
          this.y = arg0.height;
        } else if (arg0.angle != null) {
          this.x = arg0.length;
          this.y = 0;
          this.setAngle(arg0.angle);
        } else {
          this.x = this.y = 0;
          if (this._read)
            this._read = 0;
        }
        if (this._read)
          this._read = 1;
      }
    },

    set: function(x, y) {
      this.x = x;
      this.y = y;
      return this;
    },

    equals: function(point) {
      point = Point.read(arguments);
      return this.x == point.x && this.y == point.y;
    },

    clone: function() {
      return Point.create(this.x, this.y);
    },

    toString: function() {
      var format = Format.number;
      return '{ x: ' + format(this.x) + ', y: ' + format(this.y) + ' }';
    },

    _serialize: function(options) {
      var format = Format.number,
        precision = options.precision;
      return [format(this.x, precision),
          format(this.y, precision)];
    },

    add: function(point) {
      point = Point.read(arguments);
      return Point.create(this.x + point.x, this.y + point.y);
    },

    subtract: function(point) {
      point = Point.read(arguments);
      return Point.create(this.x - point.x, this.y - point.y);
    },

    multiply: function(point) {
      point = Point.read(arguments);
      return Point.create(this.x * point.x, this.y * point.y);
    },

    divide: function(point) {
      point = Point.read(arguments);
      return Point.create(this.x / point.x, this.y / point.y);
    },

    modulo: function(point) {
      point = Point.read(arguments);
      return Point.create(this.x % point.x, this.y % point.y);
    },

    negate: function() {
      return Point.create(-this.x, -this.y);
    },

    transform: function(matrix) {
      return matrix ? matrix._transformPoint(this) : this;
    },

    getDistance: function(point, squared) {
      point = Point.read(arguments);
      var x = point.x - this.x,
        y = point.y - this.y,
        d = x * x + y * y;
      return squared ? d : Math.sqrt(d);
    },

    getLength: function() {
      var l = this.x * this.x + this.y * this.y;
      return arguments.length && arguments[0] ? l : Math.sqrt(l);
    },

    setLength: function(length) {
      if (this.isZero()) {
        var angle = this._angle || 0;
        this.set(
          Math.cos(angle) * length,
          Math.sin(angle) * length
        );
      } else {
        var scale = length / this.getLength();
        if (scale == 0)
          this.getAngle();
        this.set(
          this.x * scale,
          this.y * scale
        );
      }
      return this;
    },

    normalize: function(length) {
      if (length === undefined)
        length = 1;
      var current = this.getLength(),
        scale = current != 0 ? length / current : 0,
        point = Point.create(this.x * scale, this.y * scale);
      point._angle = this._angle;
      return point;
    },

    getAngle: function() {
      return this.getAngleInRadians(arguments[0]) * 180 / Math.PI;
    },

    setAngle: function(angle) {
      angle = this._angle = angle * Math.PI / 180;
      if (!this.isZero()) {
        var length = this.getLength();
        this.set(
          Math.cos(angle) * length,
          Math.sin(angle) * length
        );
      }
      return this;
    },

    getAngleInRadians: function() {
      if (arguments[0] === undefined) {
        if (this._angle == null)
          this._angle = Math.atan2(this.y, this.x);
        return this._angle;
      } else {
        var point = Point.read(arguments),
          div = this.getLength() * point.getLength();
        if (Numerical.isZero(div)) {
          return NaN;
        } else {
          return Math.acos(this.dot(point) / div);
        }
      }
    },

    getAngleInDegrees: function() {
      return this.getAngle(arguments[0]);
    },

    getQuadrant: function() {
      return this.x >= 0 ? this.y >= 0 ? 1 : 4 : this.y >= 0 ? 2 : 3;
    },

    getDirectedAngle: function(point) {
      point = Point.read(arguments);
      return Math.atan2(this.cross(point), this.dot(point)) * 180 / Math.PI;
    },

    rotate: function(angle, center) {
      if (angle === 0)
        return this.clone();
      angle = angle * Math.PI / 180;
      var point = center ? this.subtract(center) : this,
        s = Math.sin(angle),
        c = Math.cos(angle);
      point = Point.create(
        point.x * c - point.y * s,
        point.y * c + point.x * s
      );
      return center ? point.add(center) : point;
    },

    isInside: function(rect) {
      return rect.contains(this);
    },

    isClose: function(point, tolerance) {
      return this.getDistance(point) < tolerance;
    },

    isColinear: function(point) {
      return this.cross(point) < 0.00001;
    },

    isOrthogonal: function(point) {
      return this.dot(point) < 0.00001;
    },

    isZero: function() {
      return Numerical.isZero(this.x) && Numerical.isZero(this.y);
    },

    isNaN: function() {
      return isNaN(this.x) || isNaN(this.y);
    },

    dot: function(point) {
      point = Point.read(arguments);
      return this.x * point.x + this.y * point.y;
    },

    cross: function(point) {
      point = Point.read(arguments);
      return this.x * point.y - this.y * point.x;
    },

    project: function(point) {
      point = Point.read(arguments);
      if (point.isZero()) {
        return Point.create(0, 0);
      } else {
        var scale = this.dot(point) / point.dot(point);
        return Point.create(
          point.x * scale,
          point.y * scale
        );
      }
    },

    statics: {
      create: function(x, y) {
        var point = Base.create(Point);
        point.x = x;
        point.y = y;
        return point;
      },

      min: function(point1, point2) {
        var _point1 = Point.read(arguments);
          _point2 = Point.read(arguments);
        return Point.create(
          Math.min(_point1.x, _point2.x),
          Math.min(_point1.y, _point2.y)
        );
      },

      max: function(point1, point2) {
        var _point1 = Point.read(arguments);
          _point2 = Point.read(arguments);
        return Point.create(
          Math.max(_point1.x, _point2.x),
          Math.max(_point1.y, _point2.y)
        );
      },

      random: function() {
        return Point.create(Math.random(), Math.random());
      }
    }
  }, new function() { 

    return Base.each(['round', 'ceil', 'floor', 'abs'], function(name) {
      var op = Math[name];
      this[name] = function() {
        return Point.create(op(this.x), op(this.y));
      };
    }, {});
  });

  var LinkedPoint = Point.extend({
    set: function(x, y, dontNotify) {
      this._x = x;
      this._y = y;
      if (!dontNotify)
        this._owner[this._setter](this);
      return this;
    },

    getX: function() {
      return this._x;
    },

    setX: function(x) {
      this._x = x;
      this._owner[this._setter](this);
    },

    getY: function() {
      return this._y;
    },

    setY: function(y) {
      this._y = y;
      this._owner[this._setter](this);
    },

    statics: {
      create: function(owner, setter, x, y, dontLink) {
        if (dontLink)
          return Point.create(x, y);
        var point = Base.create(LinkedPoint);
        point._x = x;
        point._y = y;
        point._owner = owner;
        point._setter = setter;
        return point;
      }
    }
  });

  var Size = this.Size = Base.extend({
    _type: 'Size',
    _readIndex: true,

    initialize: function(arg0, arg1) {
      var type = typeof arg0;
      if (type === 'number') {
        var hasHeight = typeof arg1 === 'number';
        this.width = arg0;
        this.height = hasHeight ? arg1 : arg0;
        if (this._read)
          this._read = hasHeight ? 2 : 1;
      } else if (type === 'undefined' || arg0 === null) {
        this.width = this.height = 0;
        if (this._read)
          this._read = arg0 === null ? 1 : 0;
      } else {
        if (Array.isArray(arg0)) {
          this.width = arg0[0];
          this.height = arg0.length > 1 ? arg0[1] : arg0[0];
        } else if (arg0.width != null) {
          this.width = arg0.width;
          this.height = arg0.height;
        } else if (arg0.x != null) {
          this.width = arg0.x;
          this.height = arg0.y;
        } else {
          this.width = this.height = 0;
          if (this._read)
            this._read = 0;
        }
        if (this._read)
          this._read = 1;
      }
    },

    set: function(width, height) {
      this.width = width;
      this.height = height;
      return this;
    },

    equals: function(size) {
      size = Size.read(arguments);
      return this.width == size.width && this.height == size.height;
    },

    clone: function() {
      return Size.create(this.width, this.height);
    },

    toString: function() {
      var format = Format.number;
      return '{ width: ' + format(this.width)
          + ', height: ' + format(this.height) + ' }';
    },

    _serialize: function(options) {
      var format = Format.number,
        precision = options.precision;
      return [format(this.width, precision),
          format(this.height, precision)];
    },

    add: function(size) {
      size = Size.read(arguments);
      return Size.create(this.width + size.width, this.height + size.height);
    },

    subtract: function(size) {
      size = Size.read(arguments);
      return Size.create(this.width - size.width, this.height - size.height);
    },

    multiply: function(size) {
      size = Size.read(arguments);
      return Size.create(this.width * size.width, this.height * size.height);
    },

    divide: function(size) {
      size = Size.read(arguments);
      return Size.create(this.width / size.width, this.height / size.height);
    },

    modulo: function(size) {
      size = Size.read(arguments);
      return Size.create(this.width % size.width, this.height % size.height);
    },

    negate: function() {
      return Size.create(-this.width, -this.height);
    },

    isZero: function() {
      return Numerical.isZero(this.width) && Numerical.isZero(this.height);
    },

    isNaN: function() {
      return isNaN(this.width) || isNaN(this.height);
    },

    statics: {
      create: function(width, height) {
        return Base.create(Size).set(width, height);
      },

      min: function(size1, size2) {
        return Size.create(
          Math.min(size1.width, size2.width),
          Math.min(size1.height, size2.height));
      },

      max: function(size1, size2) {
        return Size.create(
          Math.max(size1.width, size2.width),
          Math.max(size1.height, size2.height));
      },

      random: function() {
        return Size.create(Math.random(), Math.random());
      }
    }
  }, new function() { 

    return Base.each(['round', 'ceil', 'floor', 'abs'], function(name) {
      var op = Math[name];
      this[name] = function() {
        return Size.create(op(this.width), op(this.height));
      };
    }, {});
  });

  var LinkedSize = Size.extend({
    set: function(width, height, dontNotify) {
      this._width = width;
      this._height = height;
      if (!dontNotify)
        this._owner[this._setter](this);
      return this;
    },

    getWidth: function() {
      return this._width;
    },

    setWidth: function(width) {
      this._width = width;
      this._owner[this._setter](this);
    },

    getHeight: function() {
      return this._height;
    },

    setHeight: function(height) {
      this._height = height;
      this._owner[this._setter](this);
    },

    statics: {
      create: function(owner, setter, width, height, dontLink) {
        if (dontLink)
          return Size.create(width, height);
        var size = Base.create(LinkedSize);
        size._width = width;
        size._height = height;
        size._owner = owner;
        size._setter = setter;
        return size;
      }
    }
  });

  var Rectangle = this.Rectangle = Base.extend({
    _type: 'Rectangle',
    _readIndex: true,

    initialize: function(arg0, arg1, arg2, arg3) {
      var type = typeof arg0,
        read = 0;
      if (type === 'number') {
        this.x = arg0;
        this.y = arg1;
        this.width = arg2;
        this.height = arg3;
        read = 4;
      } else if (type === 'undefined' || arg0 === null) {
        this.x = this.y = this.width = this.height = 0;
        read = arg0 === null ? 1 : 0;
      } else if (arguments.length === 1) {
        if (Array.isArray(arg0)) {
          this.x = arg0[0];
          this.y = arg0[1];
          this.width = arg0[2];
          this.height = arg0[3];
          read = 1;
        } else if (arg0.x !== undefined || arg0.width !== undefined) {
          this.x = arg0.x || 0;
          this.y = arg0.y || 0;
          this.width = arg0.width || 0;
          this.height = arg0.height || 0;
          read = 1;
        } else if (arg0.from === undefined && arg0.to === undefined) {
          this.x = this.y = this.width = this.height = 0;
          this._set(arg0);
          read = 1;
        }
      }
      if (!read) {
        var point = Point.readNamed(arguments, 'from'),
          next = Base.peek(arguments);
        this.x = point.x;
        this.y = point.y;
        if (next && next.x !== undefined || Base.hasNamed(arguments, 'to')) {
          var to = Point.readNamed(arguments, 'to');
          this.width = to.x - point.x;
          this.height = to.y - point.y;
          if (this.width < 0) {
            this.x = to.x;
            this.width = -this.width;
          }
          if (this.height < 0) {
            this.y = to.y;
            this.height = -this.height;
          }
        } else {
          var size = Size.read(arguments);
          this.width = size.width;
          this.height = size.height;
        }
        read = arguments._index;
      }
      if (this._read)
        this._read = read;
    },

    set: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      return this;
    },

    clone: function() {
      return Rectangle.create(this.x, this.y, this.width, this.height);
    },

    equals: function(rect) {
      rect = Rectangle.read(arguments);
      return this.x == rect.x && this.y == rect.y
          && this.width == rect.width && this.height == rect.height;
    },

    toString: function() {
      var format = Format.number;
      return '{ x: ' + format(this.x)
          + ', y: ' + format(this.y)
          + ', width: ' + format(this.width)
          + ', height: ' + format(this.height)
          + ' }';
    },

    _serialize: function(options) {
      var format = Format.number,
        precision = options.precision;
      return [format(this.x, precision),
          format(this.y, precision),
          format(this.width, precision),
          format(this.height, precision)];
    },

    getPoint: function() {
      return LinkedPoint.create(this, 'setPoint', this.x, this.y, arguments[0]);
    },

    setPoint: function(point) {
      point = Point.read(arguments);
      this.x = point.x;
      this.y = point.y;
    },

    getSize: function() {
      return LinkedSize.create(this, 'setSize', this.width, this.height,
          arguments[0]);
    },

    setSize: function(size) {
      size = Size.read(arguments);
      this.width = size.width;
      this.height = size.height;
    },

    getLeft: function() {
      return this.x;
    },

    setLeft: function(left) {
      this.width -= left - this.x;
      this.x = left;
    },

    getTop: function() {
      return this.y;
    },

    setTop: function(top) {
      this.height -= top - this.y;
      this.y = top;
    },

    getRight: function() {
      return this.x + this.width;
    },

    setRight: function(right) {
      this.width = right - this.x;
    },

    getBottom: function() {
      return this.y + this.height;
    },

    setBottom: function(bottom) {
      this.height = bottom - this.y;
    },

    getCenterX: function() {
      return this.x + this.width * 0.5;
    },

    setCenterX: function(x) {
      this.x = x - this.width * 0.5;
    },

    getCenterY: function() {
      return this.y + this.height * 0.5;
    },

    setCenterY: function(y) {
      this.y = y - this.height * 0.5;
    },

    getCenter: function() {
      return LinkedPoint.create(this, 'setCenter',
          this.getCenterX(), this.getCenterY(), arguments[0]);
    },

    setCenter: function(point) {
      point = Point.read(arguments);
      this.setCenterX(point.x);
      this.setCenterY(point.y);
      return this;
    },

    isEmpty: function() {
      return this.width == 0 || this.height == 0;
    },

    contains: function(arg) {
      return arg && arg.width !== undefined
          || (Array.isArray(arg) ? arg : arguments).length == 4
          ? this._containsRectangle(Rectangle.read(arguments))
          : this._containsPoint(Point.read(arguments));
    },

    _containsPoint: function(point) {
      var x = point.x,
        y = point.y;
      return x >= this.x && y >= this.y
          && x <= this.x + this.width
          && y <= this.y + this.height;
    },

    _containsRectangle: function(rect) {
      var x = rect.x,
        y = rect.y;
      return x >= this.x && y >= this.y
          && x + rect.width <= this.x + this.width
          && y + rect.height <= this.y + this.height;
    },

    intersects: function(rect) {
      rect = Rectangle.read(arguments);
      return rect.x + rect.width > this.x
          && rect.y + rect.height > this.y
          && rect.x < this.x + this.width
          && rect.y < this.y + this.height;
    },

    intersect: function(rect) {
      rect = Rectangle.read(arguments);
      var x1 = Math.max(this.x, rect.x),
        y1 = Math.max(this.y, rect.y),
        x2 = Math.min(this.x + this.width, rect.x + rect.width),
        y2 = Math.min(this.y + this.height, rect.y + rect.height);
      return Rectangle.create(x1, y1, x2 - x1, y2 - y1);
    },

    unite: function(rect) {
      rect = Rectangle.read(arguments);
      var x1 = Math.min(this.x, rect.x),
        y1 = Math.min(this.y, rect.y),
        x2 = Math.max(this.x + this.width, rect.x + rect.width),
        y2 = Math.max(this.y + this.height, rect.y + rect.height);
      return Rectangle.create(x1, y1, x2 - x1, y2 - y1);
    },

    include: function(point) {
      point = Point.read(arguments);
      var x1 = Math.min(this.x, point.x),
        y1 = Math.min(this.y, point.y),
        x2 = Math.max(this.x + this.width, point.x),
        y2 = Math.max(this.y + this.height, point.y);
      return Rectangle.create(x1, y1, x2 - x1, y2 - y1);
    },

    expand: function(hor, ver) {
      if (ver === undefined)
        ver = hor;
      return Rectangle.create(this.x - hor / 2, this.y - ver / 2,
          this.width + hor, this.height + ver);
    },

    scale: function(hor, ver) {
      return this.expand(this.width * hor - this.width,
          this.height * (ver === undefined ? hor : ver) - this.height);
    },

    statics: {
      create: function(x, y, width, height) {
        return Base.create(Rectangle).set(x, y, width, height);
      }
    }
  }, new function() {
    return Base.each([
        ['Top', 'Left'], ['Top', 'Right'],
        ['Bottom', 'Left'], ['Bottom', 'Right'],
        ['Left', 'Center'], ['Top', 'Center'],
        ['Right', 'Center'], ['Bottom', 'Center']
      ],
      function(parts, index) {
        var part = parts.join('');
        var xFirst = /^[RL]/.test(part);
        if (index >= 4)
          parts[1] += xFirst ? 'Y' : 'X';
        var x = parts[xFirst ? 0 : 1],
          y = parts[xFirst ? 1 : 0],
          getX = 'get' + x,
          getY = 'get' + y,
          setX = 'set' + x,
          setY = 'set' + y,
          get = 'get' + part,
          set = 'set' + part;
        this[get] = function() {
          return LinkedPoint.create(this, set,
              this[getX](), this[getY](), arguments[0]);
        };
        this[set] = function(point) {
          point = Point.read(arguments);
          this[setX](point.x);
          this[setY](point.y);
        };
      }, {});
  });

  var LinkedRectangle = Rectangle.extend({
    set: function(x, y, width, height, dontNotify) {
      this._x = x;
      this._y = y;
      this._width = width;
      this._height = height;
      if (!dontNotify)
        this._owner[this._setter](this);
      return this;
    },

    statics: {
      create: function(owner, setter, x, y, width, height) {
        var rect = Base.create(LinkedRectangle).set(x, y, width, height, true);
        rect._owner = owner;
        rect._setter = setter;
        return rect;
      }
    }
  }, new function() {
    var proto = Rectangle.prototype;

    return Base.each(['x', 'y', 'width', 'height'], function(key) {
      var part = Base.capitalize(key);
      var internal = '_' + key;
      this['get' + part] = function() {
        return this[internal];
      };

      this['set' + part] = function(value) {
        this[internal] = value;
        if (!this._dontNotify)
          this._owner[this._setter](this);
      };
    }, Base.each(['Point', 'Size', 'Center',
        'Left', 'Top', 'Right', 'Bottom', 'CenterX', 'CenterY',
        'TopLeft', 'TopRight', 'BottomLeft', 'BottomRight',
        'LeftCenter', 'TopCenter', 'RightCenter', 'BottomCenter'],
      function(key) {
        var name = 'set' + key;
        this[name] = function(value) {
          this._dontNotify = true;
          proto[name].apply(this, arguments);
          delete this._dontNotify;
          this._owner[this._setter](this);
        };
      }, {
        isSelected: function() {
          return this._owner._boundsSelected;
        },

        setSelected: function(selected) {
          var owner = this._owner;
          if (owner.setSelected) {
            owner._boundsSelected = selected;
            owner.setSelected(selected || owner._selectedSegmentState > 0);
          }
        }
      })
    );
  });

  var Matrix = this.Matrix = Base.extend({
    _type: 'Matrix',

    initialize: function(arg) {
      var count = arguments.length,
        ok = true;
      if (count == 6) {
        this.set.apply(this, arguments);
      } else if (count == 1) {
        if (arg instanceof Matrix) {
          this.set(arg._a, arg._c, arg._b, arg._d, arg._tx, arg._ty);
        } else if (Array.isArray(arg)) {
          this.set.apply(this, arg);
        } else {
          ok = false;
        }
      } else if (count == 0) {
        this.reset();
      } else {
        ok = false;
      }
      if (!ok)
        throw new Error('Unsupported matrix parameters');
    },

    set: function(a, c, b, d, tx, ty) {
      this._a = a;
      this._c = c;
      this._b = b;
      this._d = d;
      this._tx = tx;
      this._ty = ty;
      return this;
    },

    _serialize: function(options) {
      return Base.serialize(this.getValues(), options);
    },

    clone: function() {
      return Matrix.create(this._a, this._c, this._b, this._d,
          this._tx, this._ty);
    },

    equals: function(mx) {
      return mx && this._a == mx._a && this._b == mx._b && this._c == mx._c
          && this._d == mx._d && this._tx == mx._tx && this._ty == mx._ty;
    },

    toString: function() {
      var format = Format.number;
      return '[[' + [format(this._a), format(this._b),
            format(this._tx)].join(', ') + '], ['
          + [format(this._c), format(this._d),
            format(this._ty)].join(', ') + ']]';
    },

    reset: function() {
      this._a = this._d = 1;
      this._c = this._b = this._tx = this._ty = 0;
      return this;
    },

    scale: function(scale, center) {
      var _scale = Point.read(arguments),
        _center = Point.read(arguments, 0, 0, false, true); 
      if (_center)
        this.translate(_center);
      this._a *= _scale.x;
      this._c *= _scale.x;
      this._b *= _scale.y;
      this._d *= _scale.y;
      if (_center)
        this.translate(_center.negate());
      return this;
    },

    translate: function(point) {
      point = Point.read(arguments);
      var x = point.x,
        y = point.y;
      this._tx += x * this._a + y * this._b;
      this._ty += x * this._c + y * this._d;
      return this;
    },

    rotate: function(angle, center) {
      center = Point.read(arguments, 1);
      angle = angle * Math.PI / 180;
      var x = center.x,
        y = center.y,
        cos = Math.cos(angle),
        sin = Math.sin(angle),
        tx = x - x * cos + y * sin,
        ty = y - x * sin - y * cos,
        a = this._a,
        b = this._b,
        c = this._c,
        d = this._d;
      this._a = cos * a + sin * b;
      this._b = -sin * a + cos * b;
      this._c = cos * c + sin * d;
      this._d = -sin * c + cos * d;
      this._tx += tx * a + ty * b;
      this._ty += tx * c + ty * d;
      return this;
    },

    shear: function(point, center) {
      var _point = Point.read(arguments),
        _center = Point.read(arguments);
      if (_center)
        this.translate(_center);
      var a = this._a,
        c = this._c;
      this._a += _point.y * this._b;
      this._c += _point.y * this._d;
      this._b += _point.x * a;
      this._d += _point.x * c;
      if (_center)
        this.translate(_center.negate());
      return this;
    },

    isIdentity: function() {
      return this._a == 1 && this._c == 0 && this._b == 0 && this._d == 1
          && this._tx == 0 && this._ty == 0;
    },

    isInvertible: function() {
      return !!this._getDeterminant();
    },

    isSingular: function() {
      return !this._getDeterminant();
    },

    concatenate: function(mx) {
      var a = this._a,
        b = this._b,
        c = this._c,
        d = this._d;
      this._a = mx._a * a + mx._c * b;
      this._b = mx._b * a + mx._d * b;
      this._c = mx._a * c + mx._c * d;
      this._d = mx._b * c + mx._d * d;
      this._tx += mx._tx * a + mx._ty * b;
      this._ty += mx._tx * c + mx._ty * d;
      return this;
    },

    preConcatenate: function(mx) {
      var a = this._a,
        b = this._b,
        c = this._c,
        d = this._d,
        tx = this._tx,
        ty = this._ty;
      this._a = mx._a * a + mx._b * c;
      this._b = mx._a * b + mx._b * d;
      this._c = mx._c * a + mx._d * c;
      this._d = mx._c * b + mx._d * d;
      this._tx = mx._a * tx + mx._b * ty + mx._tx;
      this._ty = mx._c * tx + mx._d * ty + mx._ty;
      return this;
    },

    transform: function( src, srcOff, dst, dstOff, numPts) {
      return arguments.length < 5
        ? this._transformPoint(Point.read(arguments))
        : this._transformCoordinates(src, srcOff, dst, dstOff, numPts);
    },

    _transformPoint: function(point, dest, dontNotify) {
      var x = point.x,
        y = point.y;
      if (!dest)
        dest = Base.create(Point);
      return dest.set(
        x * this._a + y * this._b + this._tx,
        x * this._c + y * this._d + this._ty,
        dontNotify
      );
    },

    _transformCoordinates: function(src, srcOff, dst, dstOff, numPts) {
      var i = srcOff, j = dstOff,
        srcEnd = srcOff + 2 * numPts;
      while (i < srcEnd) {
        var x = src[i++],
          y = src[i++];
        dst[j++] = x * this._a + y * this._b + this._tx;
        dst[j++] = x * this._c + y * this._d + this._ty;
      }
      return dst;
    },

    _transformCorners: function(rect) {
      var x1 = rect.x,
        y1 = rect.y,
        x2 = x1 + rect.width,
        y2 = y1 + rect.height,
        coords = [ x1, y1, x2, y1, x2, y2, x1, y2 ];
      return this._transformCoordinates(coords, 0, coords, 0, 4);
    },

    _transformBounds: function(bounds, dest, dontNotify) {
      var coords = this._transformCorners(bounds),
        min = coords.slice(0, 2),
        max = coords.slice(0);
      for (var i = 2; i < 8; i++) {
        var val = coords[i],
          j = i & 1;
        if (val < min[j])
          min[j] = val;
        else if (val > max[j])
          max[j] = val;
      }
      if (!dest)
        dest = Base.create(Rectangle);
      return dest.set(min[0], min[1], max[0] - min[0], max[1] - min[1],
          dontNotify);
    },

    inverseTransform: function(point) {
      return this._inverseTransform(Point.read(arguments));
    },

    _getDeterminant: function() {
      var det = this._a * this._d - this._b * this._c;
      return isFinite(det) && !Numerical.isZero(det)
          && isFinite(this._tx) && isFinite(this._ty)
          ? det : null;
    },

    _inverseTransform: function(point, dest, dontNotify) {
      var det = this._getDeterminant();
      if (!det)
        return null;
      var x = point.x - this._tx,
        y = point.y - this._ty;
      if (!dest)
        dest = Base.create(Point);
      return dest.set(
        (x * this._d - y * this._b) / det,
        (y * this._a - x * this._c) / det,
        dontNotify
      );
    },

    decompose: function() {
      var a = this._a, b = this._b, c = this._c, d = this._d;
      if (Numerical.isZero(a * d - b * c))
        return null;

      var scaleX = Math.sqrt(a * a + b * b);
      a /= scaleX;
      b /= scaleX;

      var shear = a * c + b * d;
      c -= a * shear;
      d -= b * shear;

      var scaleY = Math.sqrt(c * c + d * d);
      c /= scaleY;
      d /= scaleY;
      shear /= scaleY;

      if (a * d < b * c) {
        a = -a;
        b = -b;
        shear = -shear;
        scaleX = -scaleX;
      }

      return {
        translation: this.getTranslation(),
        scaling: Point.create(scaleX, scaleY),
        rotation: -Math.atan2(b, a) * 180 / Math.PI,
        shearing: shear
      };
    },

    getValues: function() {
      return [ this._a, this._c, this._b, this._d, this._tx, this._ty ];
    },

    getTranslation: function() {
      return Point.create(this._tx, this._ty);
    },

    getScaling: function() {
      return (this.decompose() || {}).scaling;
    },

    getRotation: function() {
      return (this.decompose() || {}).rotation;
    },

    inverted: function() {
      var det = this._getDeterminant();
      return det && Matrix.create(
          this._d / det,
          -this._c / det,
          -this._b / det,
          this._a / det,
          (this._b * this._ty - this._d * this._tx) / det,
          (this._c * this._tx - this._a * this._ty) / det);
    },

    shiftless: function() {
      return Matrix.create(this._a, this._c, this._b, this._d, 0, 0);
    },

    applyToContext: function(ctx) {
      ctx.transform(this._a, this._c, this._b, this._d, this._tx, this._ty);
    },

    statics: {
      create: function(a, c, b, d, tx, ty) {
        return Base.create(Matrix).set(a, c, b, d, tx, ty);
      }
    }
  }, new function() {
    return Base.each({
      scaleX: '_a',
      scaleY: '_d',
      translateX: '_tx',
      translateY: '_ty',
      shearX: '_b',
      shearY: '_c'
    }, function(prop, name) {
      name = Base.capitalize(name);
      this['get' + name] = function() {
        return this[prop];
      };
      this['set' + name] = function(value) {
        this[prop] = value;
      };
    }, {});
  });

  var Line = this.Line = Base.extend({
    initialize: function(point1, point2, infinite) {
      var _point1 = Point.read(arguments),
        _point2 = Point.read(arguments),
        _infinite = Base.read(arguments);
      if (_infinite !== undefined) {
        this.point = _point1;
        this.vector = _point2.subtract(_point1);
        this.infinite = _infinite;
      } else {
        this.point = _point1;
        this.vector = _point2;
        this.infinite = true;
      }
    },

    intersect: function(line) {
      var cross = this.vector.cross(line.vector);
      if (Numerical.isZero(cross))
        return null;
      var v = line.point.subtract(this.point),
        t1 = v.cross(line.vector) / cross,
        t2 = v.cross(this.vector) / cross;
      return (this.infinite || 0 <= t1 && t1 <= 1)
          && (line.infinite || 0 <= t2 && t2 <= 1)
        ? this.point.add(this.vector.multiply(t1)) : null;
    },

    getSide: function(point) {
      var v1 = this.vector,
        v2 = point.subtract(this.point),
        ccw = v2.cross(v1);
      if (ccw === 0) {
        ccw = v2.dot(v1);
        if (ccw > 0) {
          ccw = v2.subtract(v1).dot(v1);
          if (ccw < 0)
              ccw = 0;
        }
      }
      return ccw < 0 ? -1 : ccw > 0 ? 1 : 0;
    },

    getDistance: function(point) {
      var m = this.vector.y / this.vector.x, 
        b = this.point.y - (m * this.point.x); 
      var dist = Math.abs(point.y - (m * point.x) - b) / Math.sqrt(m * m + 1);
      return this.infinite ? dist : Math.min(dist,
          point.getDistance(this.point),
          point.getDistance(this.point.add(this.vector)));
    }
  });

  var Project = this.Project = PaperScopeItem.extend({
    _list: 'projects',
    _reference: 'project',

    initialize: function(view) {
      this.base(true);
      this.layers = [];
      this.symbols = [];
      this.activeLayer = new Layer();
      if (view)
        this.view = view instanceof View ? view : View.create(view);
      this._currentStyle = new PathStyle();
      this._selectedItems = {};
      this._selectedItemCount = 0;
      this._drawCount = 0;
      this.options = {};
    },

    _serialize: function(options, dictionary) {
      return Base.serialize(this.layers, options, false, dictionary);
    },

    _needsRedraw: function() {
      if (this.view)
        this.view._redrawNeeded = true;
    },

    remove: function() {
      if (!this.base())
        return false;
      if (this.view)
        this.view.remove();
      return true;
    },

    getCurrentStyle: function() {
      return this._currentStyle;
    },

    setCurrentStyle: function(style) {
      this._currentStyle.initialize(style);
    },

    getIndex: function() {
      return this._index;
    },

    getSelectedItems: function() {
      var items = [];
      for (var id in this._selectedItems) {
        var item = this._selectedItems[id];
        if (item._drawCount === this._drawCount)
          items.push(item);
      }
      return items;
    },

    _updateSelection: function(item) {
      if (item._selected) {
        this._selectedItemCount++;
        this._selectedItems[item._id] = item;
        if (item.isInserted())
          item._drawCount = this._drawCount;
      } else {
        this._selectedItemCount--;
        delete this._selectedItems[item._id];
      }
    },

    selectAll: function() {
      for (var i = 0, l = this.layers.length; i < l; i++)
        this.layers[i].setSelected(true);
    },

    deselectAll: function() {
      for (var i in this._selectedItems)
        this._selectedItems[i].setSelected(false);
    },

    hitTest: function(point, options) {
      point = Point.read(arguments);
      options = HitResult.getOptions(Base.read(arguments));
      for (var i = this.layers.length - 1; i >= 0; i--) {
        var res = this.layers[i].hitTest(point, options);
        if (res) return res;
      }
      return null;
    },

    importJson: function(json) {
      return Base.importJson(json);
    },

    draw: function(ctx, matrix) {
      var matrices = {};
      function getGlobalMatrix(item, mx, cached) {
        var cache = cached && matrices[item._id];
        if (cache)
          return cache.clone();
        if (item._parent)
          mx = getGlobalMatrix(item._parent, mx, true);
        if (!item._matrix.isIdentity())
          mx.concatenate(item._matrix);
        if (cached)
          matrices[item._id] = mx.clone();
        return mx;
      }

      this._drawCount++;
      ctx.save();
      if (!matrix.isIdentity())
        matrix.applyToContext(ctx);
      var param = { offset: new Point(0, 0) };
      for (var i = 0, l = this.layers.length; i < l; i++)
        Item.draw(this.layers[i], ctx, param);
      ctx.restore();

      if (this._selectedItemCount > 0) {
        ctx.save();
        ctx.strokeWidth = 1;
        ctx.strokeStyle = ctx.fillStyle = '#009dec';
        for (var id in this._selectedItems) {
          var item = this._selectedItems[id];
          if (item._drawCount === this._drawCount
              && (item.drawSelected || item._boundsSelected)) {
            var mx = getGlobalMatrix(item, matrix.clone());
            if (item.drawSelected)
              item.drawSelected(ctx, mx);
            if (item._boundsSelected)
              Item.drawSelectedBounds(item._getBounds('getBounds'),
                  ctx, mx);
          }
        }
        ctx.restore();
      }
    }
  });

  var Symbol = this.Symbol = Base.extend({
    _type: 'Symbol',

    initialize: function(item, dontCenter) {
      this._id = ++Base._uid;
      this.project = paper.project;
      this.project.symbols.push(this);
      if (item)
        this.setDefinition(item, dontCenter);
      this._instances = {};
    },

    _serialize: function(options, dictionary) {
      return dictionary.add(this, function() {
        return Base.serialize([this._type, this._definition],
            options, false, dictionary);
      });
    },

    _changed: function(flags) {
      Base.each(this._instances, function(item) {
        item._changed(flags);
      });
    },

    getDefinition: function() {
      return this._definition;
    },

    setDefinition: function(item ) {
      if (item._parentSymbol)
        item = item.clone();
      if (this._definition)
        delete this._definition._parentSymbol;
      this._definition = item;
      item.remove();
      item.setSelected(false);
      if (!arguments[1])
        item.setPosition(new Point());
      item._parentSymbol = this;
      this._changed(5);
    },

    place: function(position) {
      return new PlacedSymbol(this, position);
    },

    clone: function() {
      return new Symbol(this._definition.clone());
    }
  });

  var Item = this.Item = Base.extend(Callback, {
    statics: {
      extend: function(src) {
        if (src._serializeFields)
          src._serializeFields = Base.merge(
              this.prototype._serializeFields, src._serializeFields);
        return this.base.apply(this, arguments);
      }
    }
  }, {
    _boundsSelected: false,
    _serializeFields: {
      name: null,
      matrix: new Matrix(),
      locked: false,
      visible: true,
      blendMode: 'normal',
      opacity: 1,
      guide: false,
      clipMask: false,
      data: {}
    },

    initialize: function(point) {
      this._id = ++Base._uid;
      if (!this._project)
        paper.project.activeLayer.addChild(this);
      if (!this._style)
        this._style = PathStyle.create(this);
      this.setStyle(this._project.getCurrentStyle());
      this._matrix = new Matrix();
      if (point)
        this._matrix.translate(point);
    },

    _events: new function() {

      var mouseFlags = {
        mousedown: {
          mousedown: 1,
          mousedrag: 1,
          click: 1,
          doubleclick: 1
        },
        mouseup: {
          mouseup: 1,
          mousedrag: 1,
          click: 1,
          doubleclick: 1
        },
        mousemove: {
          mousedrag: 1,
          mousemove: 1,
          mouseenter: 1,
          mouseleave: 1
        }
      };

      var mouseEvent = {
        install: function(type) {
          var counters = this._project.view._eventCounters;
          if (counters) {
            for (var key in mouseFlags) {
              counters[key] = (counters[key] || 0)
                  + (mouseFlags[key][type] || 0);
            }
          }
        },
        uninstall: function(type) {
          var counters = this._project.view._eventCounters;
          if (counters) {
            for (var key in mouseFlags)
              counters[key] -= mouseFlags[key][type] || 0;
          }
        }
      };

      return Base.each(['onMouseDown', 'onMouseUp', 'onMouseDrag', 'onClick',
        'onDoubleClick', 'onMouseMove', 'onMouseEnter', 'onMouseLeave'],
        function(name) {
          this[name] = mouseEvent;
        }, {
          onFrame: {
            install: function() {
              this._project.view._animateItem(this, true);
            },
            uninstall: function() {
              this._project.view._animateItem(this, false);
            }
          },

          onLoad: {}
        }
      );
    },

    _serialize: function(options, dictionary) {
      var props = {},
        that = this;

      function serialize(fields, compact) {
        for (var key in fields) {
          var value = that[key];
          if (!Base.equals(value, fields[key]))
            props[key] = Base.serialize(value, options,
                compact && key !== 'data', dictionary);
        }
      }

      serialize(this._serializeFields, true);
      if (!(this instanceof Group))
        serialize(this._style._defaults, false);
      return [ this._type, props ];
    },

    _changed: function(flags) {
      if (flags & 4) {
        delete this._bounds;
        delete this._position;
      }
      if (this._parent
          && (flags & (4 | 8))) {
        this._parent._clearBoundsCache();
      }
      if (flags & 2) {
        this._clearBoundsCache();
      }
      if (flags & 1) {
        this._project._needsRedraw();
      }
      if (this._parentSymbol)
        this._parentSymbol._changed(flags);
      if (this._project._changes) {
        var entry = this._project._changesById[this._id];
        if (entry) {
          entry.flags |= flags;
        } else {
          entry = { item: this, flags: flags };
          this._project._changesById[this._id] = entry;
          this._project._changes.push(entry);
        }
      }
    },

    set: function(props) {
      this._set(props);
      return this;
    },

    getId: function() {
      return this._id;
    },

    getType: function() {
      return this._type;
    },

    getName: function() {
      return this._name;
    },

    setName: function(name, unique) {

      if (this._name)
        this._removeFromNamed();
      if (name && this._parent) {
        var children = this._parent._children,
          namedChildren = this._parent._namedChildren,
          orig = name,
          i = 1;
        while (unique && children[name])
          name = orig + ' ' + (i++);
        (namedChildren[name] = namedChildren[name] || []).push(this);
        children[name] = this;
      }
      this._name = name || undefined;
      this._changed(32);
    }

  }, Base.each(['locked', 'visible', 'blendMode', 'opacity', 'guide'],
    function(name) {
      var part = Base.capitalize(name),
        name = '_' + name;
      this['get' + part] = function() {
        return this[name];
      };
      this['set' + part] = function(value) {
        if (value != this[name]) {
          this[name] = value;
          this._changed(name === '_locked'
              ? 32 : 33);
        }
      };
  }, {}), {

    _locked: false,

    _visible: true,

    _blendMode: 'normal',

    _opacity: 1,

    _guide: false,

    applyMatrix: false,

    isSelected: function() {
      if (this._children) {
        for (var i = 0, l = this._children.length; i < l; i++)
          if (this._children[i].isSelected())
            return true;
      }
      return this._selected;
    },

    setSelected: function(selected ) {
      if (this._children && !arguments[1]) {
        for (var i = 0, l = this._children.length; i < l; i++)
          this._children[i].setSelected(selected);
      }
      if ((selected = !!selected) != this._selected) {
        this._selected = selected;
        this._project._updateSelection(this);
        this._changed(33);
      }
    },

    _selected: false,

    isFullySelected: function() {
      if (this._children && this._selected) {
        for (var i = 0, l = this._children.length; i < l; i++)
          if (!this._children[i].isFullySelected())
            return false;
        return true;
      }
      return this._selected;
    },

    setFullySelected: function(selected) {
      if (this._children) {
        for (var i = 0, l = this._children.length; i < l; i++)
          this._children[i].setFullySelected(selected);
      }
      this.setSelected(selected, true);
    },

    isClipMask: function() {
      return this._clipMask;
    },

    setClipMask: function(clipMask) {
      if (this._clipMask != (clipMask = !!clipMask)) {
        this._clipMask = clipMask;
        if (clipMask) {
          this.setFillColor(null);
          this.setStrokeColor(null);
        }
        this._changed(33);
        if (this._parent)
          this._parent._changed(256);
      }
    },

    _clipMask: false,

    getData: function() {
      if (!this._data)
        this._data = {};
      return this._data;
    },

    setData: function(data) {
      this._data = data;    
    },

    getPosition: function() {
      var pos = this._position
          || (this._position = this.getBounds().getCenter(true));
      return arguments[0] ? pos
          : LinkedPoint.create(this, 'setPosition', pos.x, pos.y);
    },

    setPosition: function(point) {
      this.translate(Point.read(arguments).subtract(this.getPosition(true)));
    },

    getMatrix: function() {
      return this._matrix;
    },

    setMatrix: function(matrix) {
      this._matrix.initialize(matrix);
      this._changed(5);
    },

    isEmpty: function() {
      return this._children.length == 0;
    }
  }, Base.each(['getBounds', 'getStrokeBounds', 'getHandleBounds', 'getRoughBounds'],
    function(name) {
      this[name] = function() {
        var getter = this._boundsGetter,
          bounds = this._getCachedBounds(typeof getter == 'string'
              ? getter : getter && getter[name] || name, arguments[0]);
        return name == 'getBounds'
            ? LinkedRectangle.create(this, 'setBounds',
                bounds.x, bounds.y, bounds.width, bounds.height) 
            : bounds;
      };
    },
  {
    _getCachedBounds: function(getter, matrix, cacheItem) {
      var cache = (!matrix || matrix.equals(this._matrix)) && getter;
      if (cacheItem && this._parent) {
        var id = cacheItem._id,
          ref = this._parent._boundsCache
            = this._parent._boundsCache || {
          ids: {},
          list: []
        };
        if (!ref.ids[id]) {
          ref.list.push(cacheItem);
          ref.ids[id] = cacheItem;
        }
      }
      if (cache && this._bounds && this._bounds[cache])
        return this._bounds[cache].clone();
      var identity = this._matrix.isIdentity();
      matrix = !matrix || matrix.isIdentity()
          ? identity ? null : this._matrix
          : identity ? matrix : matrix.clone().concatenate(this._matrix);
      var bounds = this._getBounds(getter, matrix, cache ? this : cacheItem);
      if (cache) {
        if (!this._bounds)
          this._bounds = {};
        this._bounds[cache] = bounds.clone();
      }
      return bounds;
    },

    _clearBoundsCache: function() {
      if (this._boundsCache) {
        for (var i = 0, list = this._boundsCache.list, l = list.length;
            i < l; i++) {
          var item = list[i];
          delete item._bounds;
          if (item != this && item._boundsCache)
            item._clearBoundsCache();
        }
        delete this._boundsCache;
      }
    },

    _getBounds: function(getter, matrix, cacheItem) {
      var children = this._children;
      if (!children || children.length == 0)
        return new Rectangle();
      var x1 = Infinity,
        x2 = -x1,
        y1 = x1,
        y2 = x2;
      for (var i = 0, l = children.length; i < l; i++) {
        var child = children[i];
        if (child._visible && !child.isEmpty()) {
          var rect = child._getCachedBounds(getter, matrix, cacheItem);
          x1 = Math.min(rect.x, x1);
          y1 = Math.min(rect.y, y1);
          x2 = Math.max(rect.x + rect.width, x2);
          y2 = Math.max(rect.y + rect.height, y2);
        }
      }
      return Rectangle.create(x1, y1, x2 - x1, y2 - y1);
    },

    setBounds: function(rect) {
      rect = Rectangle.read(arguments);
      var bounds = this.getBounds(),
        matrix = new Matrix(),
        center = rect.getCenter();
      matrix.translate(center);
      if (rect.width != bounds.width || rect.height != bounds.height) {
        matrix.scale(
            bounds.width != 0 ? rect.width / bounds.width : 1,
            bounds.height != 0 ? rect.height / bounds.height : 1);
      }
      center = bounds.getCenter();
      matrix.translate(-center.x, -center.y);
      this.transform(matrix);
    }

  }), {
    getProject: function() {
      return this._project;
    },

    _setProject: function(project) {
      if (this._project != project) {
        this._project = project;
        if (this._children) {
          for (var i = 0, l = this._children.length; i < l; i++) {
            this._children[i]._setProject(project);
          }
        }
      }
    },

    getLayer: function() {
      var parent = this;
      while (parent = parent._parent) {
        if (parent instanceof Layer)
          return parent;
      }
      return null;
    },

    getParent: function() {
      return this._parent;
    },

    setParent: function(item) {
      return item.addChild(this);
    },

    getChildren: function() {
      return this._children;
    },

    setChildren: function(items) {
      this.removeChildren();
      this.addChildren(items);
    },

    getFirstChild: function() {
      return this._children && this._children[0] || null;
    },

    getLastChild: function() {
      return this._children && this._children[this._children.length - 1]
          || null;
    },

    getNextSibling: function() {
      return this._parent && this._parent._children[this._index + 1] || null;
    },

    getPreviousSibling: function() {
      return this._parent && this._parent._children[this._index - 1] || null;
    },

    getIndex: function() {
      return this._index;
    },

    isInserted: function() {
      return this._parent ? this._parent.isInserted() : false;
    },

    clone: function() {
      return this._clone(new this.constructor());
    },

    _clone: function(copy) {
      copy.setStyle(this._style);
      if (this._children) {
        for (var i = 0, l = this._children.length; i < l; i++)
          copy.addChild(this._children[i].clone(), true);
      }
      var keys = ['_locked', '_visible', '_blendMode', '_opacity',
          '_clipMask', '_guide', 'applyMatrix'];
      for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        if (this.hasOwnProperty(key))
          copy[key] = this[key];
      }
      copy._matrix.initialize(this._matrix);
      copy.setSelected(this._selected);
      if (this._name)
        copy.setName(this._name, true);
      return copy;
    },

    copyTo: function(itemOrProject) {
      var copy = this.clone();
      if (itemOrProject.layers) {
        itemOrProject.activeLayer.addChild(copy);
      } else {
        itemOrProject.addChild(copy);
      }
      return copy;
    },

    rasterize: function(resolution) {
      var bounds = this.getStrokeBounds(),
        scale = (resolution || 72) / 72,
        canvas = CanvasProvider.getCanvas(bounds.getSize().multiply(scale)),
        ctx = canvas.getContext('2d');
      ctx.save();
      new Matrix().scale(scale).translate(-bounds.x, -bounds.y)
        .applyToContext(ctx);
      Item.draw(this, ctx, {});
      var raster = new Raster(canvas);
      raster.setBounds(bounds);
      ctx.restore();
      return raster;
    },

    hitTest: function(point, options) {
      function checkBounds(type, part) {
        var pt = bounds['get' + part]();
        if (point.getDistance(pt) < options.tolerance)
          return new HitResult(type, that,
              { name: Base.hyphenate(part), point: pt });
      }

      if (this._locked)
        return null;

      point = Point.read(arguments);
      options = HitResult.getOptions(Base.read(arguments));
      if (!this._children && !this.getRoughBounds()
          .expand(options.tolerance)._containsPoint(point))
        return null;
      point = this._matrix._inverseTransform(point);
      if ((options.center || options.bounds) &&
          !(this instanceof Layer && !this._parent)) {
        var bounds = this.getBounds(),
          that = this,
          points = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight',
          'LeftCenter', 'TopCenter', 'RightCenter', 'BottomCenter'],
          res;
        if (options.center && (res = checkBounds('center', 'Center')))
          return res;
        if (options.bounds) {
          for (var i = 0; i < 8; i++)
            if (res = checkBounds('bounds', points[i]))
              return res;
        }
      }

      return this._children || !(options.guides && !this._guide
          || options.selected && !this._selected)
            ? this._hitTest(point, options) : null;
    },

    _hitTest: function(point, options) {
      if (this._children) {
        for (var i = this._children.length - 1; i >= 0; i--) {
          var res = this._children[i].hitTest(point, options);
          if (res) return res;
        }
      }
    },

    addChild: function(item, _cloning) {
      return this.insertChild(undefined, item, _cloning);
    },

    insertChild: function(index, item, _cloning) {
      if (this._children) {
        item._remove(true);
        Base.splice(this._children, [item], index, 0);
        item._parent = this;
        item._setProject(this._project);
        if (item._name)
          item.setName(item._name);
        this._changed(3);
        return item;
      }
      return null;
    },

    addChildren: function(items, _cloning) {
      return this.insertChildren(this._children.length, items, _cloning);
    },

    insertChildren: function(index, items, _cloning) {
      items = items && Array.prototype.slice.apply(items);
      var children = this._children,
        length = children.length,
        i = index;
      for (var j = 0, l = items && items.length; j < l; j++) {
        if (this.insertChild(i, items[j], _cloning)) {
          var newLength = children.length;
          i += newLength - length;
          length = newLength;
        }
      }
      return i != index;
    },

    insertAbove: function(item, _cloning) {
      var index = item._index;
      if (item._parent == this._parent && index < this._index)
         index++;
      return item._parent.insertChild(index, this, _cloning);
    },

    insertBelow: function(item, _cloning) {
      var index = item._index;
      if (item._parent == this._parent && index > this._index)
         index--;
      return item._parent.insertChild(index, this, _cloning);
    },

    sendToBack: function() {
      return this._parent.insertChild(0, this);
    },

    bringToFront: function() {
      return this._parent.addChild(this);
    },

    appendTop: function(item) {
      return this.addChild(item);
    },

    appendBottom: function(item) {
      return this.insertChild(0, item);
    },

    moveAbove: function(item) {
      return this.insertAbove(item);
    },

    moveBelow: function(item) {
      return this.insertBelow(item);
    },

    _removeFromNamed: function() {
      var children = this._parent._children,
        namedChildren = this._parent._namedChildren,
        name = this._name,
        namedArray = namedChildren[name],
        index = namedArray ? namedArray.indexOf(this) : -1;
      if (index == -1)
        return;
      if (children[name] == this)
        delete children[name];
      namedArray.splice(index, 1);
      if (namedArray.length) {
        children[name] = namedArray[namedArray.length - 1];
      } else {
        delete namedChildren[name];
      }
    },

    _remove: function(notify) {
      if (this._parent) {
        if (this._name)
          this._removeFromNamed();
        if (this._index != null)
          Base.splice(this._parent._children, null, this._index, 1);
        if (notify)
          this._parent._changed(3);
        this._parent = null;
        return true;
      }
      return false;
    },

    remove: function() {
      return this._remove(true);
    },

    removeChildren: function(from, to) {
      if (!this._children)
        return null;
      from = from || 0;
      to = Base.pick(to, this._children.length);
      var removed = Base.splice(this._children, null, from, to - from);
      for (var i = removed.length - 1; i >= 0; i--)
        removed[i]._remove(false);
      if (removed.length > 0)
        this._changed(3);
      return removed;
    },

    reverseChildren: function() {
      if (this._children) {
        this._children.reverse();
        for (var i = 0, l = this._children.length; i < l; i++)
          this._children[i]._index = i;
        this._changed(3);
      }
    },

    isEditable: function() {
      var item = this;
      while (item) {
        if (!item._visible || item._locked)
          return false;
        item = item._parent;
      }
      return true;
    },

    _getOrder: function(item) {
      function getList(item) {
        var list = [];
        do {
          list.unshift(item);
        } while (item = item._parent);
        return list;
      }
      var list1 = getList(this),
        list2 = getList(item);
      for (var i = 0, l = Math.min(list1.length, list2.length); i < l; i++) {
        if (list1[i] != list2[i]) {
          return list1[i]._index < list2[i]._index ? 1 : -1;
        }
      }
      return 0;
    },

    hasChildren: function() {
      return this._children && this._children.length > 0;
    },

    isAbove: function(item) {
      return this._getOrder(item) == -1;
    },

    isBelow: function(item) {
      return this._getOrder(item) == 1;
    },

    isParent: function(item) {
      return this._parent == item;
    },

    isChild: function(item) {
      return item && item._parent == this;
    },

    isDescendant: function(item) {
      var parent = this;
      while (parent = parent._parent) {
        if (parent == item)
          return true;
      }
      return false;
    },

    isAncestor: function(item) {
      return item ? item.isDescendant(this) : false;
    },

    isGroupedWith: function(item) {
      var parent = this._parent;
      while (parent) {
        if (parent._parent
          && (parent instanceof Group || parent instanceof CompoundPath)
          && item.isDescendant(parent))
            return true;
        parent = parent._parent;
      }
      return false;
    },

    scale: function(hor, ver , center) {
      if (arguments.length < 2 || typeof ver === 'object') {
        center = ver;
        ver = hor;
      }
      return this.transform(new Matrix().scale(hor, ver,
          center || this.getPosition(true)));
    },

    translate: function(delta) {
      var mx = new Matrix();
      return this.transform(mx.translate.apply(mx, arguments));
    },

    rotate: function(angle, center) {
      return this.transform(new Matrix().rotate(angle,
          center || this.getPosition(true)));
    },

    shear: function(hor, ver, center) {
      if (arguments.length < 2 || typeof ver === 'object') {
        center = ver;
        ver = hor;
      }
      return this.transform(new Matrix().shear(hor, ver,
          center || this.getPosition(true)));
    },

    transform: function(matrix ) {
      var bounds = this._bounds,
        position = this._position;
      this._matrix.preConcatenate(matrix);
      if (this._transform)
        this._transform(matrix);
      if ((this.applyMatrix || arguments[1])
          && this._applyMatrix(this._matrix))
        this._matrix.reset();
      this._changed(5);
      if (bounds && matrix.getRotation() % 90 === 0) {
        for (var key in bounds) {
          var rect = bounds[key];
          matrix._transformBounds(rect, rect);
        }
        var getter = this._boundsGetter,
          rect = bounds[getter && getter.getBounds || getter || 'getBounds'];
        if (rect)
          this._position = rect.getCenter(true);
        this._bounds = bounds;
      } else if (position) {
        this._position = matrix._transformPoint(position, position);
      }
      return this;
    },

    _applyMatrix: function(matrix) {
      if (this._children) {
        for (var i = 0, l = this._children.length; i < l; i++)
          this._children[i].transform(matrix, true);
        return true;
      }
    },

    fitBounds: function(rectangle, fill) {
      rectangle = Rectangle.read(arguments);
      var bounds = this.getBounds(),
        itemRatio = bounds.height / bounds.width,
        rectRatio = rectangle.height / rectangle.width,
        scale = (fill ? itemRatio > rectRatio : itemRatio < rectRatio)
            ? rectangle.width / bounds.width
            : rectangle.height / bounds.height,
        newBounds = new Rectangle(new Point(),
            Size.create(bounds.width * scale, bounds.height * scale));
      newBounds.setCenter(rectangle.getCenter());
      this.setBounds(newBounds);
    },

    importJson: function(json) {
      return this.addChild(Base.importJson(json));
    },

    _setStyles: function(ctx) {
      var style = this._style,
        width = style._strokeWidth,
        join = style._strokeJoin,
        cap = style._strokeCap,
        limit = style._miterLimit,
        fillColor = style._fillColor,
        strokeColor = style._strokeColor,
        dashArray = style._dashArray,
        dashOffset = style._dashOffset;

      if (width != null)
        ctx.lineWidth = width;
      if (join)
        ctx.lineJoin = join;
      if (cap)
        ctx.lineCap = cap;
      if (limit)
        ctx.miterLimit = limit;
      if (fillColor)
        ctx.fillStyle = fillColor.toCanvasStyle(ctx);
      if (strokeColor) {
        ctx.strokeStyle = strokeColor.toCanvasStyle(ctx);
        if (paper.support.nativeDash && dashArray && dashArray.length) {
          if ('setLineDash' in ctx) {
            ctx.setLineDash(dashArray);
            ctx.lineDashOffset = dashOffset;
          } else if('mozDash' in ctx) {
            ctx.mozDash = dashArray;
            ctx.mozDashOffset = dashOffset;
          } else if('webkitLineDash' in ctx) {
            ctx.webkitLineDash = dashArray;
            ctx.webkitLineDashOffset = dashOffset;
          }
        }
      }
      if (!fillColor || !strokeColor)
        ctx.globalAlpha = this._opacity;
    },

    statics: {
      drawSelectedBounds: function(bounds, ctx, matrix) {
        var coords = matrix._transformCorners(bounds);
        ctx.beginPath();
        for (var i = 0; i < 8; i++)
          ctx[i == 0 ? 'moveTo' : 'lineTo'](coords[i], coords[++i]);
        ctx.closePath();
        ctx.stroke();
        for (var i = 0; i < 8; i++) {
          ctx.beginPath();
          ctx.rect(coords[i] - 2, coords[++i] - 2, 4, 4);
          ctx.fill();
        }
      },

      draw: function(item, ctx, param) {
        if (!item._visible || item._opacity == 0)
          return;
        item._drawCount = item._project._drawCount;
        var parentCtx, itemOffset, prevOffset;
        if (item._blendMode !== 'normal' || item._opacity < 1
            && item._type !== 'Raster' && (item._type !== 'Path'
              || item.getFillColor() && item.getStrokeColor())) {
          var bounds = item.getStrokeBounds();
          if (!bounds.width || !bounds.height)
            return;
          prevOffset = param.offset;
          itemOffset = param.offset = bounds.getTopLeft().floor();
          parentCtx = ctx;
          ctx = CanvasProvider.getContext(
              bounds.getSize().ceil().add(Size.create(1, 1)));
        }
        if (!param.clipping)
          ctx.save();
        if (parentCtx)
          ctx.translate(-itemOffset.x, -itemOffset.y);
        item._matrix.applyToContext(ctx);
        item.draw(ctx, param);
        if (!param.clipping)
          ctx.restore();
        if (parentCtx) {
          param.offset = prevOffset;
          if (item._blendMode !== 'normal') {
            BlendMode.process(item._blendMode, ctx, parentCtx,
              item._opacity, itemOffset.subtract(prevOffset));
          } else {
            parentCtx.save();
            parentCtx.globalAlpha = item._opacity;
            parentCtx.drawImage(ctx.canvas, itemOffset.x, itemOffset.y);
            parentCtx.restore();
          }
          CanvasProvider.release(ctx);
        }
      }
    }
  }, Base.each(['down', 'drag', 'up', 'move'], function(name) {
    this['removeOn' + Base.capitalize(name)] = function() {
      var hash = {};
      hash[name] = true;
      return this.removeOn(hash);
    };
  }, {

    removeOn: function(obj) {
      for (var name in obj) {
        if (obj[name]) {
          var key = 'mouse' + name,
            sets = Tool._removeSets = Tool._removeSets || {};
          sets[key] = sets[key] || {};
          sets[key][this._id] = this;
        }
      }
      return this;
    }
  }));

  var Group = this.Group = Item.extend({
    _type: 'Group',
    _serializeFields: {
      children: []
    },

    initialize: function(arg) {
      this.base();
      this._children = [];
      this._namedChildren = {};
      if (!this._set(arg))
        this.addChildren(Array.isArray(arg) ? arg : arguments);
    },

    _changed: function(flags) {
      Item.prototype._changed.call(this, flags);
      if (flags & (2 | 256)) {
        delete this._clipItem;
      }
    },

    _getClipItem: function() {
      if (this._clipItem !== undefined)
        return this._clipItem;
      for (var i = 0, l = this._children.length; i < l; i++) {
        var child = this._children[i];
        if (child._clipMask)
          return this._clipItem = child;
      }
      return this._clipItem = null;
    },

    isClipped: function() {
      return !!this._getClipItem();
    },

    setClipped: function(clipped) {
      var child = this.getFirstChild();
      if (child)
        child.setClipMask(clipped);
    },

    draw: function(ctx, param) {
      var clipItem = this._getClipItem();
      if (clipItem) {
        param.clipping = true;
        Item.draw(clipItem, ctx, param);
        delete param.clipping;
      }
      for (var i = 0, l = this._children.length; i < l; i++) {
        var item = this._children[i];
        if (item != clipItem)
          Item.draw(item, ctx, param);
      }
    }
  });

  var Layer = this.Layer = Group.extend({
    _type: 'Layer',
    initialize: function(items) {
      this._project = paper.project;
      this._index = this._project.layers.push(this) - 1;
      this.base.apply(this, arguments);
      this.activate();
    },

    _remove: function(notify) {
      if (this._parent)
        return this.base(notify);
      if (this._index != null) {
        Base.splice(this._project.layers, null, this._index, 1);
        this._project._needsRedraw();
        return true;
      }
      return false;
    },

    getNextSibling: function() {
      return this._parent ? this.base()
          : this._project.layers[this._index + 1] || null;
    },

    getPreviousSibling: function() {
      return this._parent ? this.base()
          : this._project.layers[this._index - 1] || null;
    },

    isInserted: function() {
      return this._index != null;
    },

    activate: function() {
      this._project.activeLayer = this;
    }
  }, new function () {
    function insert(above) {
      return function(item) {
        if (item instanceof Layer && !item._parent
              && this._remove(true)) {
          Base.splice(item._project.layers, [this],
              item._index + (above ? 1 : 0), 0);
          this._setProject(item._project);
          return true;
        }
        return this.base(item);
      };
    }

    return {
      insertAbove: insert(true),

      insertBelow: insert(false)
    };
  });

  var PlacedItem = this.PlacedItem = Item.extend({
    _boundsGetter: { getBounds: 'getStrokeBounds' },

    _hitTest: function(point, options, matrix) {
      var result = this._symbol._definition._hitTest(point, options, matrix);
      if (result)
        result.item = this;
      return result;
    }
  });

  var Raster = this.Raster = PlacedItem.extend({
    _type: 'Raster',
    _boundsSelected: true,
    _serializeFields: {
      source: null
    },
    _boundsGetter: 'getBounds',

    initialize: function(object, position) {
      this.base(position !== undefined && Point.read(arguments, 1));
      if (object && !this._set(object)) {
        if (object.getContext) {
          this.setCanvas(object);
        } else if (typeof object === 'string') {
          this.setSource(object);
        } else {
          this.setImage(object);
        }
      }
      if (!this._size)
        this._size = new Size();
    },

    clone: function() {
      var element = this._image;
      if (!element) {
        element = CanvasProvider.getCanvas(this._size);
        element.getContext('2d').drawImage(this._canvas, 0, 0);
      }
      var copy = new Raster(element);
      return this._clone(copy);
    },

    getSize: function() {
      return this._size;
    },

    setSize: function() {
      var size = Size.read(arguments);
      if (!this._size.equals(size)) {
        var element = this.getElement();
        this.setCanvas(CanvasProvider.getCanvas(size));
        if (element)
          this.getContext(true).drawImage(element, 0, 0,
              size.width, size.height);
      }
    },

    getWidth: function() {
      return this._size.width;
    },

    getHeight: function() {
      return this._size.height;
    },

    isEmpty: function() {
      return this._size.width == 0 && this._size.height == 0;
    },

    getPpi: function() {
      var matrix = this._matrix,
        orig = new Point(0, 0).transform(matrix),
        u = new Point(1, 0).transform(matrix).subtract(orig),
        v = new Point(0, 1).transform(matrix).subtract(orig);
      return Size.create(
        72 / u.getLength(),
        72 / v.getLength()
      );
    },

    getContext: function() {
      if (!this._context)
        this._context = this.getCanvas().getContext('2d');
      if (arguments[0]) {
        this._image = null;
        this._changed(129);
      }
      return this._context;
    },

    setContext: function(context) {
      this._context = context;
    },

    getCanvas: function() {
      if (!this._canvas) {
        var ctx = CanvasProvider.getContext(this._size);
        try {
          if (this._image)
            ctx.drawImage(this._image, 0, 0);
          this._canvas = ctx.canvas;
        } catch (e) {
          CanvasProvider.release(ctx);
        }
      }
      return this._canvas;
    },

    setCanvas: function(canvas) {
      if (this._canvas)
        CanvasProvider.release(this._canvas);
      this._canvas = canvas;
      this._size = Size.create(canvas.width, canvas.height);
      this._image = null;
      this._context = null;
      this._changed(5 | 129);
    },

    getImage: function() {
      return this._image;
    },

    setImage: function(image) {
      if (this._canvas)
        CanvasProvider.release(this._canvas);
      this._image = image;
      this._size = Size.create(image.naturalWidth, image.naturalHeight);
      this._canvas = null;
      this._context = null;
      this._changed(5);
    },

    getSource: function() {
      return this._image && this._image.src || this.toDataURL();
    },

    setSource: function(src) {
      var that = this,
        image = document.getElementById(src) || new Image();
      function loaded() {
        that.fire('load');
        if (that._project.view)
          that._project.view.draw(true);
      }
      DomEvent.add(image, {
        load: function() {
          that.setImage(image);
          loaded();
        }
      });
      if (image.width && image.height) {
        setTimeout(loaded, 0);
      } else if (!image.src) {
        image.src = src;
      }
      this.setImage(image);
    },

    getElement: function() {
      return this._canvas || this._image;
    },

    getSubImage: function(rect) {
      rect = Rectangle.read(arguments);
      var ctx = CanvasProvider.getContext(rect.getSize());
      ctx.drawImage(this.getCanvas(), rect.x, rect.y,
          rect.width, rect.height, 0, 0, rect.width, rect.height);
      return ctx.canvas;
    },

    toDataURL: function() {
      var src = this._image && this._image.src;
      if (/^data:/.test(src))
        return src;
      var canvas = this.getCanvas();
      return canvas ? canvas.toDataURL() : null;
    },

    drawImage: function(image, point) {
      point = Point.read(arguments, 1);
      this.getContext(true).drawImage(image, point.x, point.y);
    },

    getAverageColor: function(object) {
      var bounds, path;
      if (!object) {
        bounds = this.getBounds();
      } else if (object instanceof PathItem) {
        path = object;
        bounds = object.getBounds();
      } else if (object.width) {
        bounds = new Rectangle(object);
      } else if (object.x) {
        bounds = Rectangle.create(object.x - 0.5, object.y - 0.5, 1, 1);
      }
      var sampleSize = 32,
        width = Math.min(bounds.width, sampleSize),
        height = Math.min(bounds.height, sampleSize);
      var ctx = Raster._sampleContext;
      if (!ctx) {
        ctx = Raster._sampleContext = CanvasProvider.getContext(
            new Size(sampleSize));
      } else {
        ctx.clearRect(0, 0, sampleSize + 1, sampleSize + 1);
      }
      ctx.save();
      ctx.scale(width / bounds.width, height / bounds.height);
      ctx.translate(-bounds.x, -bounds.y);
      if (path)
        path.draw(ctx, { clip: true });
      this._matrix.applyToContext(ctx);
      ctx.drawImage(this.getElement(),
          -this._size.width / 2, -this._size.height / 2);
      ctx.restore();
      var pixels = ctx.getImageData(0.5, 0.5, Math.ceil(width),
          Math.ceil(height)).data,
        channels = [0, 0, 0],
        total = 0;
      for (var i = 0, l = pixels.length; i < l; i += 4) {
        var alpha = pixels[i + 3];
        total += alpha;
        alpha /= 255;
        channels[0] += pixels[i] * alpha;
        channels[1] += pixels[i + 1] * alpha;
        channels[2] += pixels[i + 2] * alpha;
      }
      for (var i = 0; i < 3; i++)
        channels[i] /= total;
      return total ? Color.read(channels) : null;
    },

    getPixel: function(point) {
      point = Point.read(arguments);
      var pixels = this.getContext().getImageData(point.x, point.y, 1, 1).data,
        channels = new Array(4);
      for (var i = 0; i < 4; i++)
        channels[i] = pixels[i] / 255;
      return RgbColor.read(channels);
    },

    setPixel: function(point, color) {
      var _point = Point.read(arguments),
        _color = Color.read(arguments);
      var ctx = this.getContext(true),
        imageData = ctx.createImageData(1, 1),
        alpha = _color.getAlpha();
      imageData.data[0] = _color.getRed() * 255;
      imageData.data[1] = _color.getGreen() * 255;
      imageData.data[2] = _color.getBlue() * 255;
      imageData.data[3] = alpha != null ? alpha * 255 : 255;
      ctx.putImageData(imageData, _point.x, _point.y);
    },

    createImageData: function(size) {
      size = Size.read(arguments);
      return this.getContext().createImageData(size.width, size.height);
    },

    getImageData: function(rect) {
      rect = Rectangle.read(arguments);
      if (rect.isEmpty())
        rect = new Rectangle(this.getSize());
      return this.getContext().getImageData(rect.x, rect.y,
          rect.width, rect.height);
    },

    setImageData: function(data, point) {
      point = Point.read(arguments, 1);
      this.getContext(true).putImageData(data, point.x, point.y);
    },

    _getBounds: function(getter, matrix) {
      var rect = new Rectangle(this._size).setCenter(0, 0);
      return matrix ? matrix._transformBounds(rect) : rect;
    },

    _hitTest: function(point, options) {
      if (point.isInside(this._getBounds())) {
        var that = this;
        return new HitResult('pixel', that, {
          offset: point.add(that._size.divide(2)).round(),
          color: {
            get: function() {
              return that.getPixel(this.offset);
            }
          }
        });
      }
    },

    draw: function(ctx, param) {
      var element = this.getElement();
      if (element) {
        ctx.globalAlpha = this._opacity;
        ctx.drawImage(element,
            -this._size.width / 2, -this._size.height / 2);
      }
    }
  });

  var PlacedSymbol = this.PlacedSymbol = PlacedItem.extend({
    _type: 'PlacedSymbol',
    _boundsSelected: true,
    _serializeFields: {
      symbol: null
    },

    initialize: function(arg0, arg1) {
      this.base(arg1 !== undefined && Point.read(arguments, 1));
      if (!this._set(arg0))
        this.setSymbol(arg0 instanceof Symbol ? arg0 : new Symbol(arg0));
    },

    getSymbol: function() {
      return this._symbol;
    },

    setSymbol: function(symbol) {
      if (this._symbol)
        delete this._symbol._instances[this._id];
      this._symbol = symbol;
      symbol._instances[this._id] = this;
    },

    clone: function() {
      return this._clone(new PlacedSymbol(this.symbol));
    },

    isEmpty: function() {
      return this._symbol._definition.isEmpty();
    },

    _getBounds: function(getter, matrix) {
      return this.symbol._definition._getCachedBounds(getter, matrix);
    },

    draw: function(ctx, param) {
      Item.draw(this.symbol._definition, ctx, param);
    }

  });

  var HitResult = this.HitResult = Base.extend({
    initialize: function(type, item, values) {
      this.type = type;
      this.item = item;
      if (values) {
        values.enumerable = true;
        this.inject(values);
      }
    },

    statics: {
      getOptions: function(options) {
        return options && options._merged ? options : Base.merge({
          type: null,
          tolerance: paper.project.options.hitTolerance || 2,
          fill: !options,
          stroke: !options,
          segments: !options,
          handles: false,
          ends: false,
          center: false,
          bounds: false,
          guides: false,
          selected: false,
          _merged: true
        }, options);
      }
    }
  });

  var Segment = this.Segment = Base.extend({
    _type: 'Segment',

    initialize: function(arg0, arg1, arg2, arg3, arg4, arg5) {
      var count = arguments.length,
        createPoint = SegmentPoint.create,
        point, handleIn, handleOut;
      if (count == 0) {
      } else if (count == 1) {
        if (arg0.point) {
          point = arg0.point;
          handleIn = arg0.handleIn;
          handleOut = arg0.handleOut;
        } else {
          point = arg0;
        }
      } else if (count < 6) {
        if (count == 2 && arg1.x === undefined) {
          point = [ arg0, arg1 ];
        } else {
          point = arg0;
          handleIn = arg1;
          handleOut = arg2;
        }
      } else if (count == 6) {
        point = [ arg0, arg1 ];
        handleIn = [ arg2, arg3 ];
        handleOut = [ arg4, arg5 ];
      }
      createPoint(this, '_point', point);
      createPoint(this, '_handleIn', handleIn);
      createPoint(this, '_handleOut', handleOut);
    },

    _serialize: function(options) {
      return Base.serialize(this._handleIn.isZero() && this._handleOut.isZero()
          ? this._point
          : [this._point, this._handleIn, this._handleOut], options, true);
    },

    _changed: function(point) {
      if (!this._path)
        return;
      var curve = this._path._curves && this.getCurve(),
        other;
      if (curve) {
        curve._changed();
        if (other = (curve[point == this._point
            || point == this._handleIn && curve._segment1 == this
            ? 'getPrevious' : 'getNext']())) {
          other._changed();
        }
      }
      this._path._changed(5);
    },

    getPoint: function() {
      return this._point;
    },

    setPoint: function(point) {
      point = Point.read(arguments);
      this._point.set(point.x, point.y);
    },

    getHandleIn: function() {
      return this._handleIn;
    },

    setHandleIn: function(point) {
      point = Point.read(arguments);
      this._handleIn.set(point.x, point.y);
    },

    getHandleOut: function() {
      return this._handleOut;
    },

    setHandleOut: function(point) {
      point = Point.read(arguments);
      this._handleOut.set(point.x, point.y);
    },

    isLinear: function() {
      return this._handleIn.isZero() && this._handleOut.isZero();
    },

    setLinear: function() {
      this._handleIn.set(0, 0);
      this._handleOut.set(0, 0);
    },

    _isSelected: function(point) {
      var state = this._selectionState;
      return point == this._point ? !!(state & 4)
        : point == this._handleIn ? !!(state & 1)
        : point == this._handleOut ? !!(state & 2)
        : false;
    },

    _setSelected: function(point, selected) {
      var path = this._path,
        selected = !!selected, 
        state = this._selectionState || 0,
        selection = [
          !!(state & 4),
          !!(state & 1),
          !!(state & 2)
        ];
      if (point == this._point) {
        if (selected) {
          selection[1] = selection[2] = false;
        } else {
          var previous = this.getPrevious(),
            next = this.getNext();
          selection[1] = previous && (previous._point.isSelected()
              || previous._handleOut.isSelected());
          selection[2] = next && (next._point.isSelected()
              || next._handleIn.isSelected());
        }
        selection[0] = selected;
      } else {
        var index = point == this._handleIn ? 1 : 2;
        if (selection[index] != selected) {
          if (selected)
            selection[0] = false;
          selection[index] = selected;
        }
      }
      this._selectionState = (selection[0] ? 4 : 0)
          | (selection[1] ? 1 : 0)
          | (selection[2] ? 2 : 0);
      if (path && state != this._selectionState) {
        path._updateSelection(this, state, this._selectionState);
        path._changed(33);
      }
    },

    isSelected: function() {
      return this._isSelected(this._point);
    },

    setSelected: function(selected) {
      this._setSelected(this._point, selected);
    },

    getIndex: function() {
      return this._index !== undefined ? this._index : null;
    },

    getPath: function() {
      return this._path || null;
    },

    getCurve: function() {
      if (this._path) {
        var index = this._index;
        if (!this._path._closed && index == this._path._segments.length - 1)
          index--;
        return this._path.getCurves()[index] || null;
      }
      return null;
    },

    getNext: function() {
      var segments = this._path && this._path._segments;
      return segments && (segments[this._index + 1]
          || this._path._closed && segments[0]) || null;
    },

    getPrevious: function() {
      var segments = this._path && this._path._segments;
      return segments && (segments[this._index - 1]
          || this._path._closed && segments[segments.length - 1]) || null;
    },

    reverse: function() {
      return new Segment(this._point, this._handleOut, this._handleIn);
    },

    remove: function() {
      return this._path ? !!this._path.removeSegment(this._index) : false;
    },

    clone: function() {
      return new Segment(this._point, this._handleIn, this._handleOut);
    },

    equals: function(segment) {
      return segment == this || segment
          && this._point.equals(segment._point)
          && this._handleIn.equals(segment._handleIn)
          && this._handleOut.equals(segment._handleOut);
    },

    toString: function() {
      var parts = [ 'point: ' + this._point ];
      if (!this._handleIn.isZero())
        parts.push('handleIn: ' + this._handleIn);
      if (!this._handleOut.isZero())
        parts.push('handleOut: ' + this._handleOut);
      return '{ ' + parts.join(', ') + ' }';
    },

    _transformCoordinates: function(matrix, coords, change) {
      var point = this._point,
        handleIn =  !change || !this._handleIn.isZero()
            ? this._handleIn : null,
        handleOut = !change || !this._handleOut.isZero()
            ? this._handleOut : null,
        x = point._x,
        y = point._y,
        i = 2;
      coords[0] = x;
      coords[1] = y;
      if (handleIn) {
        coords[i++] = handleIn._x + x;
        coords[i++] = handleIn._y + y;
      }
      if (handleOut) {
        coords[i++] = handleOut._x + x;
        coords[i++] = handleOut._y + y;
      }
      if (matrix) {
        matrix._transformCoordinates(coords, 0, coords, 0, i / 2);
        x = coords[0];
        y = coords[1];
        if (change) {
          point._x = x;
          point._y = y;
          i  = 2;
          if (handleIn) {
            handleIn._x = coords[i++] - x;
            handleIn._y = coords[i++] - y;
          }
          if (handleOut) {
            handleOut._x = coords[i++] - x;
            handleOut._y = coords[i++] - y;
          }
        } else {
          if (!handleIn) {
            coords[i++] = x;
            coords[i++] = y;
          }
          if (!handleOut) {
            coords[i++] = x;
            coords[i++] = y;
          }
        }
      }
      return coords;
      nop().nop();
    }
  });

  var SegmentPoint = Point.extend({
    set: function(x, y) {
      this._x = x;
      this._y = y;
      this._owner._changed(this);
      return this;
    },

    getX: function() {
      return this._x;
    },

    setX: function(x) {
      this._x = x;
      this._owner._changed(this);
    },

    getY: function() {
      return this._y;
    },

    setY: function(y) {
      this._y = y;
      this._owner._changed(this);
    },

    isZero: function() {
      return Numerical.isZero(this._x) && Numerical.isZero(this._y);
    },

    setSelected: function(selected) {
      this._owner._setSelected(this, selected);
    },

    isSelected: function() {
      return this._owner._isSelected(this);
    },

    statics: {
      create: function(segment, key, pt) {
        var point = Base.create(SegmentPoint),
          x, y, selected;
        if (!pt) {
          x = y = 0;
        } else if ((x = pt[0]) !== undefined) { 
          y = pt[1];
        } else {
          if ((x = pt.x) === undefined) {
            pt = Point.read(arguments, 2);
            x = pt.x;
          }
          y = pt.y;
          selected = pt.selected;
        }
        point._x = x;
        point._y = y;
        point._owner = segment;
        segment[key] = point;
        if (selected)
          point.setSelected(true);
        return point;
      }
    }
  });

  var Curve = this.Curve = Base.extend({
    initialize: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
      var count = arguments.length;
      if (count == 0) {
        this._segment1 = new Segment();
        this._segment2 = new Segment();
      } else if (count == 1) {
        this._segment1 = new Segment(arg0.segment1);
        this._segment2 = new Segment(arg0.segment2);
      } else if (count == 2) {
        this._segment1 = new Segment(arg0);
        this._segment2 = new Segment(arg1);
      } else {
        var point1, handle1, handle2, point2;
        if (count == 4) {
          point1 = arg0;
          handle1 = arg1;
          handle2 = arg2;
          point2 = arg3;
        } else if (count == 8) {
          point1 = [arg0, arg1];
          point2 = [arg6, arg7];
          handle1 = [arg2 - arg0, arg7 - arg1];
          handle2 = [arg4 - arg6, arg5 - arg7];
        }
        this._segment1 = new Segment(point1, null, handle1);
        this._segment2 = new Segment(point2, handle2, null);
      }
    },

    _changed: function() {
      delete this._length;
      delete this._bounds;
    },

    getPoint1: function() {
      return this._segment1._point;
    },

    setPoint1: function(point) {
      point = Point.read(arguments);
      this._segment1._point.set(point.x, point.y);
    },

    getPoint2: function() {
      return this._segment2._point;
    },

    setPoint2: function(point) {
      point = Point.read(arguments);
      this._segment2._point.set(point.x, point.y);
    },

    getHandle1: function() {
      return this._segment1._handleOut;
    },

    setHandle1: function(point) {
      point = Point.read(arguments);
      this._segment1._handleOut.set(point.x, point.y);
    },

    getHandle2: function() {
      return this._segment2._handleIn;
    },

    setHandle2: function(point) {
      point = Point.read(arguments);
      this._segment2._handleIn.set(point.x, point.y);
    },

    getSegment1: function() {
      return this._segment1;
    },

    getSegment2: function() {
      return this._segment2;
    },

    getPath: function() {
      return this._path;
    },

    getIndex: function() {
      return this._segment1._index;
    },

    getNext: function() {
      var curves = this._path && this._path._curves;
      return curves && (curves[this._segment1._index + 1]
          || this._path._closed && curves[0]) || null;
    },

    getPrevious: function() {
      var curves = this._path && this._path._curves;
      return curves && (curves[this._segment1._index - 1]
          || this._path._closed && curves[curves.length - 1]) || null;
    },

    isSelected: function() {
      return this.getHandle1().isSelected() && this.getHandle2().isSelected();
    },

    setSelected: function(selected) {
      this.getHandle1().setSelected(selected);
      this.getHandle2().setSelected(selected);
    },

    getValues: function() {
      return Curve.getValues(this._segment1, this._segment2);
    },

    getPoints: function() {
      var coords = this.getValues(),
        points = [];
      for (var i = 0; i < 8; i += 2)
        points.push(Point.create(coords[i], coords[i + 1]));
      return points;
    },

    getLength: function() {
      var from = arguments[0],
        to = arguments[1],
        fullLength = arguments.length == 0 || from == 0 && to == 1;
      if (fullLength && this._length != null)
        return this._length;
      var length = Curve.getLength(this.getValues(), from, to);
      if (fullLength)
        this._length = length;
      return length;
    },

    getPart: function(from, to) {
      return new Curve(Curve.getPart(this.getValues(), from, to));
    },

    isLinear: function() {
      return this._segment1._handleOut.isZero()
          && this._segment2._handleIn.isZero();
    },

    getIntersections: function(curve) {
      return Curve._addIntersections(this.getValues(), curve.getValues(),
          this, []);
    },

    getCrossings: function(point, roots) {
      var vals = this.getValues(),
        count = Curve.solveCubic(vals, 1, point.y, roots),
        crossings = 0;
      for (var i = 0; i < count; i++) {
        var t = roots[i];
        if (t >= 0 && t < 1 && Curve.evaluate(vals, t, true, 0).x > point.x) {
          if (t < 0.00001
            && Curve.evaluate(this.getPrevious().getValues(), 1, true, 1).y
              * Curve.evaluate(vals, t, true, 1).y
                >= 0.00001)
            continue;
          crossings++;
        }
      }
      return crossings;
    },

    reverse: function() {
      return new Curve(this._segment2.reverse(), this._segment1.reverse());
    },

    divide: function(parameter) {
      var res = null;
      if (parameter && parameter.curve === this)
        parameter = parameter.parameter;
      if (parameter > 0 && parameter < 1) {
        var parts = Curve.subdivide(this.getValues(), parameter),
          isLinear = this.isLinear(),
          left = parts[0],
          right = parts[1],
          point1 = this._segment1._point,
          point2 = this._segment2._point;
        if (!isLinear) {
          this._segment1._handleOut.set(left[2] - point1._x,
              left[3] - point1._y);
          this._segment2._handleIn.set(right[4] - point2._x,
              right[5] - point2._y);
        }

        var x = left[6], y = left[7],
          segment = new Segment(Point.create(x, y),
              isLinear ? null : Point.create(left[4] - x, left[5] - y),
              isLinear ? null : Point.create(right[2] - x, right[3] - y));
        if (this._path) {
          if (this._segment1._index > 0 && this._segment2._index === 0) {
            this._path.add(segment);
          } else {
            this._path.insert(this._segment2._index, segment);
          }
          res = this;
        } else {
          var end = this._segment2;
          this._segment2 = segment;
          res = new Curve(segment, end);
        }
      }
      return res;
    },

    split: function(parameter) {
      return this._path
        ? this._path.split(this._segment1._index, parameter)
        : null;
    },

    clone: function() {
      return new Curve(this._segment1, this._segment2);
    },

    toString: function() {
      var parts = [ 'point1: ' + this._segment1._point ];
      if (!this._segment1._handleOut.isZero())
        parts.push('handle1: ' + this._segment1._handleOut);
      if (!this._segment2._handleIn.isZero())
        parts.push('handle2: ' + this._segment2._handleIn);
      parts.push('point2: ' + this._segment2._point);
      return '{ ' + parts.join(', ') + ' }';
    },

  statics: {
    create: function(path, segment1, segment2) {
      var curve = Base.create(Curve);
      curve._path = path;
      curve._segment1 = segment1;
      curve._segment2 = segment2;
      return curve;
    },

    getValues: function(segment1, segment2) {
      var p1 = segment1._point,
        h1 = segment1._handleOut,
        h2 = segment2._handleIn,
        p2 = segment2._point;
      return [
        p1._x, p1._y,
        p1._x + h1._x, p1._y + h1._y,
        p2._x + h2._x, p2._y + h2._y,
        p2._x, p2._y
      ];
    },

    evaluate: function(v, offset, isParameter, type) {
      var t = isParameter ? offset : Curve.getParameterAt(v, offset, 0),
        p1x = v[0], p1y = v[1],
        c1x = v[2], c1y = v[3],
        c2x = v[4], c2y = v[5],
        p2x = v[6], p2y = v[7],
        x, y;

      if (type == 0 && (t == 0 || t == 1)) {
        x = t == 0 ? p1x : p2x;
        y = t == 0 ? p1y : p2y;
      } else {
        var tMin = 0.00001;
        if (t < tMin && c1x == p1x && c1y == p1y)
          t = tMin;
        else if (t > 1 - tMin && c2x == p2x && c2y == p2y)
          t = 1 - tMin;
        var cx = 3 * (c1x - p1x),
          bx = 3 * (c2x - c1x) - cx,
          ax = p2x - p1x - cx - bx,

          cy = 3 * (c1y - p1y),
          by = 3 * (c2y - c1y) - cy,
          ay = p2y - p1y - cy - by;

        switch (type) {
        case 0: 
          x = ((ax * t + bx) * t + cx) * t + p1x;
          y = ((ay * t + by) * t + cy) * t + p1y;
          break;
        case 1: 
        case 2: 
          x = (3 * ax * t + 2 * bx) * t + cx;
          y = (3 * ay * t + 2 * by) * t + cy;
          break;
        }
      }
      return type == 2 ? new Point(y, -x) : new Point(x, y);
    },

    subdivide: function(v, t) {
      var p1x = v[0], p1y = v[1],
        c1x = v[2], c1y = v[3],
        c2x = v[4], c2y = v[5],
        p2x = v[6], p2y = v[7];
      if (t === undefined)
        t = 0.5;
      var u = 1 - t,
        p3x = u * p1x + t * c1x, p3y = u * p1y + t * c1y,
        p4x = u * c1x + t * c2x, p4y = u * c1y + t * c2y,
        p5x = u * c2x + t * p2x, p5y = u * c2y + t * p2y,
        p6x = u * p3x + t * p4x, p6y = u * p3y + t * p4y,
        p7x = u * p4x + t * p5x, p7y = u * p4y + t * p5y,
        p8x = u * p6x + t * p7x, p8y = u * p6y + t * p7y;
      return [
        [p1x, p1y, p3x, p3y, p6x, p6y, p8x, p8y], 
        [p8x, p8y, p7x, p7y, p5x, p5y, p2x, p2y] 
      ];
    },

    solveCubic: function (v, coord, val, roots) {
      var p1 = v[coord],
        c1 = v[coord + 2],
        c2 = v[coord + 4],
        p2 = v[coord + 6],
        c = 3 * (c1 - p1),
        b = 3 * (c2 - c1) - c,
        a = p2 - p1 - c - b;
      return Numerical.solveCubic(a, b, c, p1 - val, roots,
          0.00001);
    },

    getParameterOf: function(v, x, y) {
      if (Math.abs(v[0] - x) < 0.00001
          && Math.abs(v[1] - y) < 0.00001)
        return 0;
      if (Math.abs(v[6] - x) < 0.00001
          && Math.abs(v[7] - y) < 0.00001)
        return 1;
      var txs = [],
        tys = [],
        sx = Curve.solveCubic(v, 0, x, txs),
        sy = Curve.solveCubic(v, 1, y, tys),
        tx, ty;
      for (var cx = 0;  sx == -1 || cx < sx;) {
        if (sx == -1 || (tx = txs[cx++]) >= 0 && tx <= 1) {
          for (var cy = 0; sy == -1 || cy < sy;) {
            if (sy == -1 || (ty = tys[cy++]) >= 0 && ty <= 1) {
              if (sx == -1) tx = ty;
              else if (sy == -1) ty = tx;
              if (Math.abs(tx - ty) < 0.00001)
                return (tx + ty) * 0.5;
            }
          }
          if (sx == -1)
            break;
        }
      }
      return null;
    },

    getPart: function(v, from, to) {
      if (from > 0)
        v = Curve.subdivide(v, from)[1]; 
      if (to < 1)
        v = Curve.subdivide(v, (to - from) / (1 - from))[0]; 
      return v;
    },

    isFlatEnough: function(v, tolerance) {
      var p1x = v[0], p1y = v[1],
        c1x = v[2], c1y = v[3],
        c2x = v[4], c2y = v[5],
        p2x = v[6], p2y = v[7],
        ux = 3 * c1x - 2 * p1x - p2x,
        uy = 3 * c1y - 2 * p1y - p2y,
        vx = 3 * c2x - 2 * p2x - p1x,
        vy = 3 * c2y - 2 * p2y - p1y;
      return Math.max(ux * ux, vx * vx) + Math.max(uy * uy, vy * vy)
          < 16 * tolerance * tolerance;
    },

    getBounds: function(v) {
      var min = v.slice(0, 2), 
        max = min.slice(0), 
        roots = new Array(2);
      for (var i = 0; i < 2; i++)
        Curve._addBounds(v[i], v[i + 2], v[i + 4], v[i + 6],
            i, 0, min, max, roots);
      return Rectangle.create(min[0], min[1], max[0] - min[0], max[1] - min[1]);
    },

    _addBounds: function(v0, v1, v2, v3, coord, padding, min, max, roots) {
      function add(value, padding) {
        var left = value - padding,
          right = value + padding;
        if (left < min[coord])
          min[coord] = left;
        if (right > max[coord])
          max[coord] = right;
      }
      var a = 3 * (v1 - v2) - v0 + v3,
        b = 2 * (v0 + v2) - 4 * v1,
        c = v1 - v0,
        count = Numerical.solveQuadratic(a, b, c, roots,
            0.00001),
        tMin = 0.00001,
        tMax = 1 - tMin;
      add(v3, 0);
      for (var j = 0; j < count; j++) {
        var t = roots[j],
          u = 1 - t;
        if (tMin < t && t < tMax)
          add(u * u * u * v0
            + 3 * u * u * t * v1
            + 3 * u * t * t * v2
            + t * t * t * v3,
            padding);
      }
    },

    _addIntersections: function(v1, v2, curve, locations) {
      var bounds1 = Curve.getBounds(v1),
        bounds2 = Curve.getBounds(v2);
      if (bounds1.x + bounds1.width >= bounds2.x
          && bounds1.y + bounds1.height >= bounds2.y
          && bounds1.x < bounds2.x + bounds2.width
          && bounds1.y < bounds2.y + bounds2.height) {
        if (Curve.isFlatEnough(v1, 0.00001)
            && Curve.isFlatEnough(v2, 0.00001)) {
          var point = new Line(v1[0], v1[1], v1[6], v1[7], false)
              .intersect(new Line(v2[0], v2[1], v2[6], v2[7], false));
          if (point)
            locations.push(new CurveLocation(curve, null, point));
        } else {
          var v1s = Curve.subdivide(v1),
            v2s = Curve.subdivide(v2);
          for (var i = 0; i < 2; i++)
            for (var j = 0; j < 2; j++)
              this._addIntersections(v1s[i], v2s[j], curve, locations);
        }
      }
      return locations;
    }
  }}, Base.each(['getBounds', 'getStrokeBounds', 'getHandleBounds', 'getRoughBounds'],
    function(name) {
      this[name] = function() {
        if (!this._bounds)
          this._bounds = {};
        var bounds = this._bounds[name];
        if (!bounds) {
          bounds = this._bounds[name] = Path[name](
            [this._segment1, this._segment2], false, this._path._style);
        }
        return bounds.clone();
      };
    },
  {

  }), Base.each(['getPoint', 'getTangent', 'getNormal'],
    function(name, index) {
      this[name + 'At'] = function(offset, isParameter) {
        return Curve.evaluate(this.getValues(), offset, isParameter, index);
      };
      this[name] = function(parameter) {
        return Curve.evaluate(this.getValues(), parameter, true, index);
      };
    },
  {
    getParameterAt: function(offset, start) {
      return Curve.getParameterAt(this.getValues(), offset,
          start !== undefined ? start : offset < 0 ? 1 : 0);
    },

    getParameterOf: function(point) {
      point = Point.read(arguments);
      return Curve.getParameterOf(this.getValues(), point.x, point.y);
    },

    getLocationAt: function(offset, isParameter) {
      if (!isParameter)
        offset = this.getParameterAt(offset);
      return new CurveLocation(this, offset);
    },

    getLocationOf: function(point) {
      var t = this.getParameterOf.apply(this, arguments);
      return t != null ? new CurveLocation(this, t) : null;
    }

  }),
  new function() { 

    function getLengthIntegrand(v) {
      var p1x = v[0], p1y = v[1],
        c1x = v[2], c1y = v[3],
        c2x = v[4], c2y = v[5],
        p2x = v[6], p2y = v[7],

        ax = 9 * (c1x - c2x) + 3 * (p2x - p1x),
        bx = 6 * (p1x + c2x) - 12 * c1x,
        cx = 3 * (c1x - p1x),

        ay = 9 * (c1y - c2y) + 3 * (p2y - p1y),
        by = 6 * (p1y + c2y) - 12 * c1y,
        cy = 3 * (c1y - p1y);

      return function(t) {
        var dx = (ax * t + bx) * t + cx,
          dy = (ay * t + by) * t + cy;
        return Math.sqrt(dx * dx + dy * dy);
      };
    }

    function getIterations(a, b) {
      return Math.max(2, Math.min(16, Math.ceil(Math.abs(b - a) * 32)));
    }

    return {
      statics: true,

      getLength: function(v, a, b) {
        if (a === undefined)
          a = 0;
        if (b === undefined)
          b = 1;
        if (v[0] == v[2] && v[1] == v[3] && v[6] == v[4] && v[7] == v[5]) {
          var dx = v[6] - v[0], 
            dy = v[7] - v[1]; 
          return (b - a) * Math.sqrt(dx * dx + dy * dy);
        }
        var ds = getLengthIntegrand(v);
        return Numerical.integrate(ds, a, b, getIterations(a, b));
      },

      getParameterAt: function(v, offset, start) {
        if (offset == 0)
          return start;
        var forward = offset > 0,
          a = forward ? start : 0,
          b = forward ? 1 : start,
          offset = Math.abs(offset),
          ds = getLengthIntegrand(v),
          rangeLength = Numerical.integrate(ds, a, b,
              getIterations(a, b));
        if (offset >= rangeLength)
          return forward ? b : a;
        var guess = offset / rangeLength,
          length = 0;
        function f(t) {
          var count = getIterations(start, t);
          length += start < t
              ? Numerical.integrate(ds, start, t, count)
              : -Numerical.integrate(ds, t, start, count);
          start = t;
          return length - offset;
        }
        return Numerical.findRoot(f, ds,
            forward ? a + guess : b - guess, 
            a, b, 16, 0.00001);
      }
    };
  }, new function() { 

    var maxDepth = 32,
      epsilon = Math.pow(2, -maxDepth - 1);

    var zCubic = [
      [1.0, 0.6, 0.3, 0.1],
      [0.4, 0.6, 0.6, 0.4],
      [0.1, 0.3, 0.6, 1.0]
    ];

    var xAxis = new Line(new Point(0, 0), new Point(1, 0));

    function toBezierForm(v, point) {
      var n = 3, 
        degree = 5, 
        c = [],
        d = [],
        cd = [],
        w = [];
      for(var i = 0; i <= n; i++) {
        c[i] = v[i].subtract(point);
        if (i < n)
          d[i] = v[i + 1].subtract(v[i]).multiply(n);
      }

      for (var row = 0; row < n; row++) {
        cd[row] = [];
        for (var column = 0; column <= n; column++)
          cd[row][column] = d[row].dot(c[column]);
      }

      for (var i = 0; i <= degree; i++)
        w[i] = new Point(i / degree, 0);

      for (var k = 0; k <= degree; k++) {
        var lb = Math.max(0, k - n + 1),
          ub = Math.min(k, n);
        for (var i = lb; i <= ub; i++) {
          var j = k - i;
          w[k].y += cd[j][i] * zCubic[j][i];
        }
      }

      return w;
    }

    function findRoots(w, depth) {
      switch (countCrossings(w)) {
      case 0:
        return [];
      case 1:
        if (depth >= maxDepth)
          return [0.5 * (w[0].x + w[5].x)];
        if (isFlatEnough(w)) {
          var line = new Line(w[0], w[5], true);
          return [ Numerical.isZero(line.vector.getLength(true))
              ? line.point.x
              : xAxis.intersect(line).x ];
        }
      }

      var p = [[]],
        left = [],
        right = [];
      for (var j = 0; j <= 5; j++)
        p[0][j] = new Point(w[j]);

      for (var i = 1; i <= 5; i++) {
        p[i] = [];
        for (var j = 0 ; j <= 5 - i; j++)
          p[i][j] = p[i - 1][j].add(p[i - 1][j + 1]).multiply(0.5);
      }
      for (var j = 0; j <= 5; j++) {
        left[j]  = p[j][0];
        right[j] = p[5 - j][j];
      }

      return findRoots(left, depth + 1).concat(findRoots(right, depth + 1));
    }

    function countCrossings(v) {
      var crossings = 0,
        prevSign = null;
      for (var i = 0, l = v.length; i < l; i++)  {
        var sign = v[i].y < 0 ? -1 : 1;
        if (prevSign != null && sign != prevSign)
          crossings++;
        prevSign = sign;
      }
      return crossings;
    }

    function isFlatEnough(v) {

      var n = v.length - 1,
        a = v[0].y - v[n].y,
        b = v[n].x - v[0].x,
        c = v[0].x * v[n].y - v[n].x * v[0].y,
        maxAbove = 0,
        maxBelow = 0;
      for (var i = 1; i < n; i++) {
        var val = a * v[i].x + b * v[i].y + c,
          dist = val * val;
        if (val < 0 && dist > maxBelow) {
          maxBelow = dist;
        } else if (dist > maxAbove) {
          maxAbove = dist;
        }
      }
      return Math.abs((maxAbove + maxBelow) / (2 * a * (a * a + b * b)))
          < epsilon;
    }

    return {
      getNearestLocation: function(point) {
        var w = toBezierForm(this.getPoints(), point);
        var roots = findRoots(w, 0).concat([0, 1]);
        var minDist = Infinity,
          minT,
          minPoint;
        for (var i = 0; i < roots.length; i++) {
          var pt = this.getPointAt(roots[i], true),
            dist = point.getDistance(pt, true);
          if (dist < minDist) {
            minDist = dist;
            minT = roots[i];
            minPoint = pt;
          }
        }
        return new CurveLocation(this, minT, minPoint, Math.sqrt(minDist));
      },

      getNearestPoint: function(point) {
        return this.getNearestLocation(point).getPoint();
      }
    };
  });

  var CurveLocation = this.CurveLocation = Base.extend({
    initialize: function(curve, parameter, point, distance) {
      this._curve = curve;
      this._segment1 = curve._segment1;
      this._segment2 = curve._segment2;
      this._parameter = parameter;
      this._point = point;
      this._distance = distance;
    },

    getSegment: function() {
      if (!this._segment) {
        var curve = this.getCurve(),
          parameter = this.getParameter();
        if (parameter == 0) {
          this._segment = curve._segment1;
        } else if (parameter == 1) {
          this._segment = curve._segment2;
        } else if (parameter == null) {
          return null;
        } else {
          this._segment = curve.getLength(0, parameter)
            < curve.getLength(parameter, 1)
              ? curve._segment1
              : curve._segment2;
        }
      }
      return this._segment;
    },

    getCurve: function() {
      if (!this._curve || arguments[0]) {
        this._curve = this._segment1.getCurve();
        if (this._curve.getParameterOf(this._point) == null)
          this._curve = this._segment2.getPrevious().getCurve();
      }
      return this._curve;
    },

    getPath: function() {
      var curve = this.getCurve();
      return curve && curve._path;
    },

    getIndex: function() {
      var curve = this.getCurve();
      return curve && curve.getIndex();
    },

    getOffset: function() {
      var path = this.getPath();
      return path && path._getOffset(this);
    },

    getCurveOffset: function() {
      var curve = this.getCurve(),
        parameter = this.getParameter();
      return parameter != null && curve && curve.getLength(0, parameter);
    },

    getParameter: function() {
      if ((this._parameter == null || arguments[0]) && this._point) {
        var curve = this.getCurve(arguments[0] && this._point);
        this._parameter = curve && curve.getParameterOf(this._point);
      }
      return this._parameter;
    },

    getPoint: function() {
      if (!this._point && this._parameter != null) {
        var curve = this.getCurve();
        this._point = curve && curve.getPointAt(this._parameter, true);
      }
      return this._point;
    },

    getTangent: function() {
      var parameter = this.getParameter(),
        curve = this.getCurve();
      return parameter != null && curve && curve.getTangentAt(parameter, true);
    },

    getNormal: function() {
      var parameter = this.getParameter(),
        curve = this.getCurve();
      return parameter != null && curve && curve.getNormalAt(parameter, true);
    },

    getDistance: function() {
      return this._distance;
    },

    divide: function() {
      var curve = this.getCurve(true);
      return curve && curve.divide(this.getParameter(true));
    },

    split: function() {
      var curve = this.getCurve(true);
      return curve && curve.split(this.getParameter(true));
    },

    toString: function() {
      var parts = [],
        point = this.getPoint();
      if (point)
        parts.push('point: ' + point);
      var index = this.getIndex();
      if (index != null)
        parts.push('index: ' + index);
      var parameter = this.getParameter();
      if (parameter != null)
        parts.push('parameter: ' + Format.number(parameter));
      if (this._distance != null)
        parts.push('distance: ' + Format.number(this._distance));
      return '{ ' + parts.join(', ') + ' }';
    }
  });

  var PathItem = this.PathItem = Item.extend({

    getIntersections: function(path) {
      if (!this.getBounds().intersects(path.getBounds()))
        return [];
      var locations = [],
        curves1 = this.getCurves(),
        curves2 = path.getCurves(),
        length2 = curves2.length,
        values2 = [];
      for (var i = 0; i < length2; i++)
        values2[i] = curves2[i].getValues();
      for (var i = 0, l = curves1.length; i < l; i++) {
        var curve = curves1[i],
          values1 = curve.getValues();
        for (var j = 0; j < length2; j++)
          Curve._addIntersections(values1, values2[j], curve, locations);
      }
      return locations;
    },

    setPathData: function(data) {

      var parts = data.match(/[a-z][^a-z]*/ig),
        coords,
        relative = false,
        control,
        current = new Point(); 

      function getCoord(index, coord, update) {
        var val = parseFloat(coords[index]); 
        if (relative)
          val += current[coord];
        if (update)
          current[coord] = val;
        return val;
      }

      function getPoint(index, update) {
        return new Point(
          getCoord(index, 'x', update),
          getCoord(index + 1, 'y', update)
        );
      }

      if (this._type === 'Path')
        this.removeSegments();
      else
        this.removeChildren();

      for (var i = 0, l = parts.length; i < l; i++) {
        var part = parts[i];
          cmd = part[0],
          lower = cmd.toLowerCase();
        coords = part.slice(1).trim().split(/[\s,]+|(?=[+-])/);
        relative = cmd === lower;
        switch (lower) {
        case 'm':
        case 'l':
          for (var j = 0; j < coords.length; j += 2)
            this[j === 0 && lower === 'm' ? 'moveTo' : 'lineTo'](
                getPoint(j, true));
          break;
        case 'h':
        case 'v':
          var coord = lower == 'h' ? 'x' : 'y';
          for (var j = 0; j < coords.length; j++) {
            getCoord(j, coord, true);
            this.lineTo(current);
          }
          break;
        case 'c':
          this.cubicCurveTo(
              getPoint(0),
              control = getPoint(2),
              getPoint(4, true));
          break;
        case 's':
          this.cubicCurveTo(
              current.multiply(2).subtract(control),
              control = getPoint(0),
              getPoint(2, true));
          break;
        case 'q':
          this.quadraticCurveTo(
              control = getPoint(0),
              getPoint(2, true));
          break;
        case 't':
          for (var j = 0; j < coords.length; j += 2) {
            this.quadraticCurveTo(
                control = current.multiply(2).subtract(control),
                getPoint(j, true));
          }
          break;
        case 'a':
          break;
        case 'z':
          this.closePath();
          break;
        }
      }
    }

  });

  var Path = this.Path = PathItem.extend({
    _type: 'Path',
    _serializeFields: {
      segments: [],
      closed: false
    },

    initialize: function(arg) {
      this._closed = false;
      this._segments = [];
      this.base();
      var segments = Array.isArray(arg)
        ? typeof arg[0] === 'object'
          ? arg
          : arguments
        : arg && (arg.point !== undefined || arg.x !== undefined)
          ? arguments
          : null;
      this.setSegments(segments || []);
      if (!segments)
        this._set(arg);
    },

    clone: function() {
      var copy = this._clone(new Path(this._segments));
      copy._closed = this._closed;
      if (this._clockwise !== undefined)
        copy._clockwise = this._clockwise;
      return copy;
    },

    _changed: function(flags) {
      Item.prototype._changed.call(this, flags);
      if (flags & 4) {
        delete this._length;
        delete this._clockwise;
        if (this._curves) {
          for (var i = 0, l = this._curves.length; i < l; i++) {
            this._curves[i]._changed(5);
          }
        }
      } else if (flags & 8) {
        delete this._bounds;
      }
    },

    getSegments: function() {
      return this._segments;
    },

    setSegments: function(segments) {
      this._selectedSegmentState = 0;
      this._segments.length = 0;
      delete this._curves;
      this._add(Segment.readAll(segments));
    },

    getFirstSegment: function() {
      return this._segments[0];
    },

    getLastSegment: function() {
      return this._segments[this._segments.length - 1];
    },

    getCurves: function() {
      var curves = this._curves,
        segments = this._segments;
      if (!curves) {
        var length = this._countCurves();
        curves = this._curves = new Array(length);
        for (var i = 0; i < length; i++)
          curves[i] = Curve.create(this, segments[i],
            segments[i + 1] || segments[0]);
      }
      return curves;
    },

    getFirstCurve: function() {
      return this.getCurves()[0];
    },

    getLastCurve: function() {
      var curves = this.getCurves();
      return curves[curves.length - 1];
    },

    getPathData: function() {
      var segments = this._segments,
        style = this._style,
        format = Format.point,
        precision = arguments[0],
        parts = [];

      function addCurve(seg1, seg2, skipLine) {
        var point1 = seg1._point,
          point2 = seg2._point,
          handle1 = seg1._handleOut,
          handle2 = seg2._handleIn;
        if (handle1.isZero() && handle2.isZero()) {
          if (!skipLine) {
            parts.push('L' + format(point2, precision));
          }
        } else {
          var end = point2.subtract(point1);
          parts.push('c' + format(handle1, precision)
              + ' ' + format(end.add(handle2), precision)
              + ' ' + format(end, precision));
        }
      }

      if (segments.length === 0)
        return '';
      parts.push('M' + format(segments[0]._point));
      for (i = 0, l = segments.length  - 1; i < l; i++)
        addCurve(segments[i], segments[i + 1], false);
      if (this._closed && style._strokeColor || style._fillColor)
        addCurve(segments[segments.length - 1], segments[0], true);
      if (this._closed)
        parts.push('z');
      return parts.join('');
    },

    isClosed: function() {
      return this._closed;
    },

    setClosed: function(closed) {
      if (this._closed != (closed = !!closed)) {
        this._closed = closed;
        if (this._curves) {
          var length = this._curves.length = this._countCurves();
          if (closed)
            this._curves[length - 1] = Curve.create(this,
              this._segments[length - 1], this._segments[0]);
        }
        this._changed(5);
      }
    },

    isEmpty: function() {
      return this._segments.length === 0;
    },

    isPolygon: function() {
      for (var i = 0, l = this._segments.length; i < l; i++) {
        if (!this._segments[i].isLinear())
          return false;
      }
      return true;
    },

    applyMatrix: true,

    _applyMatrix: function(matrix) {
      var coords = new Array(6);
      for (var i = 0, l = this._segments.length; i < l; i++) {
        this._segments[i]._transformCoordinates(matrix, coords, true);
      }
      var style = this._style,
        fillColor = style._fillColor,
        strokeColor = style._strokeColor;
      if (fillColor && fillColor.transform)
        fillColor.transform(matrix);
      if (strokeColor && strokeColor.transform)
        strokeColor.transform(matrix);
      return true;
    },

    _add: function(segs, index) {
      var segments = this._segments,
        curves = this._curves,
        amount = segs.length,
        append = index == null,
        index = append ? segments.length : index,
        fullySelected = this.isFullySelected();
      for (var i = 0; i < amount; i++) {
        var segment = segs[i];
        if (segment._path)
          segment = segs[i] = segment.clone();
        segment._path = this;
        segment._index = index + i;
        if (fullySelected)
          segment._selectionState = 4;
        if (segment._selectionState)
          this._updateSelection(segment, 0, segment._selectionState);
      }
      if (append) {
        segments.push.apply(segments, segs);
      } else {
        segments.splice.apply(segments, [index, 0].concat(segs));
        for (var i = index + amount, l = segments.length; i < l; i++)
          segments[i]._index = i;
      }
      if (curves || segs._curves) {
        if (!curves)
          curves = this._curves = [];
        var from = index > 0 ? index - 1 : index,
          start = from,
          to = Math.min(from + amount, this._countCurves());
        if (segs._curves) {
          curves.splice.apply(curves, [from, 0].concat(segs._curves));
          start += segs._curves.length;
        }
        for (var i = start; i < to; i++)
          curves.splice(i, 0, Base.create(Curve));
        this._adjustCurves(from, to);
      }
      this._changed(5);
      return segs;
    },

    _adjustCurves: function(from, to) {
      var segments = this._segments,
        curves = this._curves,
        curve;
      for (var i = from; i < to; i++) {
        curve = curves[i];
        curve._path = this;
        curve._segment1 = segments[i];
        curve._segment2 = segments[i + 1] || segments[0];
      }
      if (curve = curves[this._closed && from === 0 ? segments.length - 1
          : from - 1])
        curve._segment2 = segments[from] || segments[0];
      if (curve = curves[to])
        curve._segment1 = segments[to];
    },

    _countCurves: function() {
      var length = this._segments.length;
      return !this._closed && length > 0 ? length - 1 : length;
    },

    add: function(segment1 ) {
      return arguments.length > 1 && typeof segment1 !== 'number'
        ? this._add(Segment.readAll(arguments))
        : this._add([ Segment.read(arguments) ])[0];
    },

    insert: function(index, segment1 ) {
      return arguments.length > 2 && typeof segment1 !== 'number'
        ? this._add(Segment.readAll(arguments, 1), index)
        : this._add([ Segment.read(arguments, 1) ], index)[0];
    },

    addSegment: function(segment) {
      return this._add([ Segment.read(arguments) ])[0];
    },

    insertSegment: function(index, segment) {
      return this._add([ Segment.read(arguments, 1) ], index)[0];
    },

    addSegments: function(segments) {
      return this._add(Segment.readAll(segments));
    },

    insertSegments: function(index, segments) {
      return this._add(Segment.readAll(segments), index);
    },

    removeSegment: function(index) {
      return this.removeSegments(index, index + 1)[0] || null;
    },

    removeSegments: function(from, to) {
      from = from || 0;
      to = Base.pick(to, this._segments.length);
      var segments = this._segments,
        curves = this._curves,
        count = segments.length, 
        removed = segments.splice(from, to - from),
        amount = removed.length;
      if (!amount)
        return removed;
      for (var i = 0; i < amount; i++) {
        var segment = removed[i];
        if (segment._selectionState)
          this._updateSelection(segment, segment._selectionState, 0);
        delete segment._index;
        delete segment._path;
      }
      for (var i = from, l = segments.length; i < l; i++)
        segments[i]._index = i;
      if (curves) {
        var index = to == count + (this._closed ? 1 : 0) ? from - 1 : from,
          curves = curves.splice(index, amount);
        if (arguments[2])
          removed._curves = curves.slice(1);
        this._adjustCurves(index, index);
      }
      this._changed(5);
      return removed;
    },

    isFullySelected: function() {
      return this._selected && this._selectedSegmentState
          == this._segments.length * 4;
    },

    setFullySelected: function(selected) {
      if (selected)
        this._selectSegments(true);
      this.setSelected(selected);
    },

    setSelected: function(selected) {
      if (!selected)
        this._selectSegments(false);
      this.base(selected);
    },

    _selectSegments: function(selected) {
      var length = this._segments.length;
      this._selectedSegmentState = selected
          ? length * 4 : 0;
      for (var i = 0; i < length; i++)
        this._segments[i]._selectionState = selected
            ? 4 : 0;
    },

    _updateSelection: function(segment, oldState, newState) {
      segment._selectionState = newState;
      var total = this._selectedSegmentState += newState - oldState;
      if (total > 0)
        this.setSelected(true);
    },

    flatten: function(maxDistance) {
      var flattener = new PathFlattener(this),
        pos = 0,
        step = flattener.length / Math.ceil(flattener.length / maxDistance),
        end = flattener.length + (this._closed ? -step : step) / 2;
      var segments = [];
      while (pos <= end) {
        segments.push(new Segment(flattener.evaluate(pos, 0)));
        pos += step;
      }
      this.setSegments(segments);
    },

    simplify: function(tolerance) {
      if (this._segments.length > 2) {
        var fitter = new PathFitter(this, tolerance || 2.5);
        this.setSegments(fitter.fit());
      }
    },

    split: function(index, parameter) {
      if (parameter === null)
        return;
      if (arguments.length == 1) {
        var arg = index;
        if (typeof arg === 'number')
          arg = this.getLocationAt(arg);
        index = arg.index;
        parameter = arg.parameter;
      }
      if (parameter >= 1) {
        index++;
        parameter--;
      }
      var curves = this.getCurves();
      if (index >= 0 && index < curves.length) {
        if (parameter > 0) {
          curves[index++].divide(parameter);
        }
        var segs = this.removeSegments(index, this._segments.length, true),
          path;
        if (this._closed) {
          this.setClosed(false);
          path = this;
        } else if (index > 0) {
          path = this._clone(new Path().insertAbove(this, true));
        }
        path._add(segs, 0);
        this.addSegment(segs[0]);
        return path;
      }
      return null;
    },

    isClockwise: function() {
      if (this._clockwise !== undefined)
        return this._clockwise;
      var sum = 0,
        xPre, yPre;
      function edge(x, y) {
        if (xPre !== undefined)
          sum += (xPre - x) * (y + yPre);
        xPre = x;
        yPre = y;
      }
      for (var i = 0, l = this._segments.length; i < l; i++) {
        var seg1 = this._segments[i],
          seg2 = this._segments[i + 1 < l ? i + 1 : 0],
          point1 = seg1._point,
          handle1 = seg1._handleOut,
          handle2 = seg2._handleIn,
          point2 = seg2._point;
        edge(point1._x, point1._y);
        edge(point1._x + handle1._x, point1._y + handle1._y);
        edge(point2._x + handle2._x, point2._y + handle2._y);
        edge(point2._x, point2._y);
      }
      return sum > 0;
    },

    setClockwise: function(clockwise) {
      if (this.isClockwise() != (clockwise = !!clockwise)) {
        this.reverse();
      }
      this._clockwise = clockwise;
    },

    reverse: function() {
      this._segments.reverse();
      for (var i = 0, l = this._segments.length; i < l; i++) {
        var segment = this._segments[i];
        var handleIn = segment._handleIn;
        segment._handleIn = segment._handleOut;
        segment._handleOut = handleIn;
        segment._index = i;
      }
      if (this._clockwise !== undefined)
        this._clockwise = !this._clockwise;
    },

    join: function(path) {
      if (path) {
        var segments = path._segments,
          last1 = this.getLastSegment(),
          last2 = path.getLastSegment();
        if (last1._point.equals(last2._point))
          path.reverse();
        var first2 = path.getFirstSegment();
        if (last1._point.equals(first2._point)) {
          last1.setHandleOut(first2._handleOut);
          this._add(segments.slice(1));
        } else {
          var first1 = this.getFirstSegment();
          if (first1._point.equals(first2._point))
            path.reverse();
          last2 = path.getLastSegment();
          if (first1._point.equals(last2._point)) {
            first1.setHandleIn(last2._handleIn);
            this._add(segments.slice(0, segments.length - 1), 0);
          } else {
            this._add(segments.slice(0));
          }
        }
        path.remove();
        var first1 = this.getFirstSegment();
        last1 = this.getLastSegment();
        if (last1._point.equals(first1._point)) {
          first1.setHandleIn(last1._handleIn);
          last1.remove();
          this.setClosed(true);
        }
        this._changed(5);
        return true;
      }
      return false;
    },

    reduce: function() {
      return this;
    },

    getLength: function() {
      if (this._length == null) {
        var curves = this.getCurves();
        this._length = 0;
        for (var i = 0, l = curves.length; i < l; i++)
          this._length += curves[i].getLength();
      }
      return this._length;
    },

    _getOffset: function(location) {
      var index = location && location.getIndex();
      if (index != null) {
        var curves = this.getCurves(),
          offset = 0;
        for (var i = 0; i < index; i++)
          offset += curves[i].getLength();
        var curve = curves[index];
        return offset + curve.getLength(0, location.getParameter());
      }
      return null;
    },

    getLocationOf: function(point) {
      point = Point.read(arguments);
      var curves = this.getCurves();
      for (var i = 0, l = curves.length; i < l; i++) {
        var loc = curves[i].getLocationOf(point);
        if (loc)
          return loc;
      }
      return null;
    },

    getLocationAt: function(offset, isParameter) {
      var curves = this.getCurves(),
        length = 0;
      if (isParameter) {
        var index = ~~offset; 
        return curves[index].getLocationAt(offset - index, true);
      }
      for (var i = 0, l = curves.length; i < l; i++) {
        var start = length,
          curve = curves[i];
        length += curve.getLength();
        if (length >= offset) {
          return curve.getLocationAt(offset - start);
        }
      }
      if (offset <= this.getLength())
        return new CurveLocation(curves[curves.length - 1], 1);
      return null;
    },

    getPointAt: function(offset, isParameter) {
      var loc = this.getLocationAt(offset, isParameter);
      return loc && loc.getPoint();
    },

    getTangentAt: function(offset, isParameter) {
      var loc = this.getLocationAt(offset, isParameter);
      return loc && loc.getTangent();
    },

    getNormalAt: function(offset, isParameter) {
      var loc = this.getLocationAt(offset, isParameter);
      return loc && loc.getNormal();
    },

    getNearestLocation: function(point) {
      var curves = this.getCurves(),
        minDist = Infinity,
        minLoc = null;
      for (var i = 0, l = curves.length; i < l; i++) {
        var loc = curves[i].getNearestLocation(point);
        if (loc._distance < minDist) {
          minDist = loc._distance;
          minLoc = loc;
        }
      }
      return minLoc;
    },

    getNearestPoint: function(point) {
      return this.getNearestLocation(point).getPoint();
    },

    hasFill: function() {
      return this._style._fillColor || this._parent instanceof CompoundPath
          && this._parent._style._fillColor;
    },

    contains: function(point) {
      point = Point.read(arguments);
      var hasFill = this.hasFill();
      if (!this._closed && !hasFill
          || !this.getRoughBounds()._containsPoint(point))
        return false;
      var curves = this.getCurves(),
        segments = this._segments,
        crossings = 0,
        roots = new Array(3);
      for (var i = 0, l = curves.length; i < l; i++)
        crossings += curves[i].getCrossings(point, roots);
      if (!this._closed && hasFill)
        crossings += Curve.create(this, segments[segments.length - 1],
            segments[0]).getCrossings(point, roots);
      return (crossings & 1) == 1;
    },

    _hitTest: function(point, options) {
      var style = this._style,
        tolerance = options.tolerance || 0,
        radius = (options.stroke && style._strokeColor
            ? style._strokeWidth / 2 : 0) + tolerance,
        loc,
        res;
      var coords = [],
        that = this;
      function checkPoint(seg, pt, name) {
        if (point.getDistance(pt) < tolerance)
          return new HitResult(name, that, { segment: seg, point: pt });
      }
      function checkSegment(seg, ends) {
        var point = seg._point;
        return (ends || options.segments)
            && checkPoint(seg, point, 'segment')
          || (!ends && options.handles) && (
            checkPoint(seg, point.add(seg._handleIn), 'handle-in') ||
            checkPoint(seg, point.add(seg._handleOut), 'handle-out'));
      }
      if (options.ends && !options.segments && !this._closed) {
        if (res = checkSegment(this.getFirstSegment(), true)
            || checkSegment(this.getLastSegment(), true))
          return res;
      } else if (options.segments || options.handles) {
        for (var i = 0, l = this._segments.length; i < l; i++) {
          if (res = checkSegment(this._segments[i]))
            return res;
        }
      }
      if (options.stroke && radius > 0)
        loc = this.getNearestLocation(point);
      if (!(loc && loc._distance <= radius) && options.fill
          && this.hasFill() && this.contains(point))
        return new HitResult('fill', this);
      if (!loc && options.stroke && radius > 0)
        loc = this.getNearestLocation(point);
      if (loc && loc._distance <= radius)
        return options.stroke
            ? new HitResult('stroke', this, { location: loc })
            : new HitResult('fill', this);
    }

  }, new function() { 

    function drawHandles(ctx, segments, matrix, size) {
      var half = size / 2;

      function drawHandle(index) {
        var hX = coords[index],
          hY = coords[index + 1];
        if (pX != hX || pY != hY) {
          ctx.beginPath();
          ctx.moveTo(pX, pY);
          ctx.lineTo(hX, hY);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(hX, hY, half, 0, Math.PI * 2, true);
          ctx.fill();
        }
      }

      var coords = new Array(6);
      for (var i = 0, l = segments.length; i < l; i++) {
        var segment = segments[i];
        segment._transformCoordinates(matrix, coords, false);
        var state = segment._selectionState,
          selected = state & 4,
          pX = coords[0],
          pY = coords[1];
        if (selected || (state & 1))
          drawHandle(2);
        if (selected || (state & 2))
          drawHandle(4);
        ctx.save();

        ctx.beginPath();
        //ctx.rect(pX - half - 1, pY - half - 1, size + 2, size + 2);
        ctx.arc(pX, pY, 10, 0 , 2 * Math.PI, false);
        ctx.fillStyle = '#fff';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pX, pY, 8, 0 , 2 * Math.PI, false);
        if (window.editing_mode) {
          ctx.fillStyle = '#ff0000';
        } else {
          ctx.fillStyle = '#000';
        }
        
        ctx.fill();

        if (window.editing_mode) {
          ctx.beginPath();
          ctx.moveTo(pX - 2, pY);
          ctx.lineTo(pX + 2, pY);
          ctx.fillStyle = '#fff';
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(pX, pY, 4, 0 , 2 * Math.PI, false);
          ctx.fillStyle = '#fff';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pX, pY, 2, 0 , 2 * Math.PI, false);
          ctx.fillStyle = '#000';
          ctx.fill();
        }

        

        /*ctx.beginPath();
        ctx.rect(pX - half, pY - half, size, size);
        ctx.fillStyle = '#000';
        ctx.fill();
        if (!selected) {
          ctx.beginPath();
          ctx.arc(pX, pY, 3, 0 , 2 * Math.PI, false);
          ctx.fillStyle = '#fff';
          ctx.fill();
        }*/
        ctx.restore();
      }
    }

    function drawSegments(ctx, path, matrix) {
      var segments = path._segments,
        length = segments.length,
        coords = new Array(6),
        first = true,
        curX, curY,
        prevX, prevY,
        inX, inY,
        outX, outY;

      function drawSegment(i) {
        ctx.fillStyle = '#000'
        var segment = segments[i];
        if (matrix) {
          segment._transformCoordinates(matrix, coords, false);
          curX = coords[0];
          curY = coords[1];
        } else {
          var point = segment._point;
          curX = point._x;
          curY = point._y;
        }
        if (first) {
          ctx.moveTo(curX, curY);
          first = false;
        } else {
          if (matrix) {
            inX = coords[2];
            inY = coords[3];
          } else {
            var handle = segment._handleIn;
            inX = curX + handle._x;
            inY = curY + handle._y;
          }
          if (inX == curX && inY == curY && outX == prevX && outY == prevY) {
            ctx.lineTo(curX, curY);
          } else {
            ctx.bezierCurveTo(outX, outY, inX, inY, curX, curY);
          }
        }
        prevX = curX;
        prevY = curY;
        if (matrix) {
          outX = coords[4];
          outY = coords[5];
        } else {
          var handle = segment._handleOut;
          outX = prevX + handle._x;
          outY = prevY + handle._y;
        }
      }

      for (var i = 0; i < length; i++)
        drawSegment(i);
      if (path._closed && length > 1)
        drawSegment(0);
    }

    return {
      draw: function(ctx, param) {
        if (!param.compound)
          ctx.beginPath();

        var style = this._style,
          fillColor = '#fff',
          strokeColor = style._strokeColor,
          dashArray = style._dashArray,
          drawDash = !paper.support.nativeDash && strokeColor
              && dashArray && dashArray.length,
          clip = param.clip || this._clipMask;

        if (param.compound || clip || fillColor || strokeColor
            && !drawDash)
          drawSegments(ctx, this);

        if (this._closed)
          ctx.closePath();

        if (clip) {
          ctx.clip();
        } else if (!param.compound && (fillColor || strokeColor)) {
          this._setStyles(ctx);
          if (fillColor)
            ctx.fill();
          if (strokeColor) {
            if (drawDash) {
              ctx.beginPath();
              var flattener = new PathFlattener(this),
                from = style._dashOffset, to,
                i = 0;
              while (from < flattener.length) {
                to = from + dashArray[(i++) % dashArray.length];
                flattener.drawPart(ctx, from, to);
                from = to + dashArray[(i++) % dashArray.length];
              }
            }
            ctx.stroke();
          }
        }
      },

      drawSelected: function(ctx, matrix) {
        ctx.beginPath();
        drawSegments(ctx, this, matrix);
        ctx.fillStyle =  '#fff';
        ctx.strokeStyle = '#fff';

        var dash = 'setLineDash' in ctx;

        if (dash) {
          ctx.setLineDash([12, 6]);
        }

        ctx.lineWidth = 2;

        ctx.stroke();


        //TODO very very bad hack
        if (!window.drawmode) {
          drawHandles(ctx, this._segments, matrix,
            this._project.options.handleSize || (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0)) ? 22 : 11);
        }
        
      }
    };
  }, new function() { 

    function getFirstControlPoints(rhs) {
      var n = rhs.length,
        x = [], 
        tmp = [], 
        b = 2;
      x[0] = rhs[0] / b;
      for (var i = 1; i < n; i++) {
        tmp[i] = 1 / b;
        b = (i < n - 1 ? 4 : 2) - tmp[i];
        x[i] = (rhs[i] - x[i - 1]) / b;
      }
      for (var i = 1; i < n; i++) {
        x[n - i - 1] -= tmp[n - i] * x[n - i];
      }
      return x;
    }

    return {
      smooth: function() {
        var segments = this._segments,
          size = segments.length,
          n = size,
          overlap;

        if (size <= 2)
          return;

        if (this._closed) {
          overlap = Math.min(size, 4);
          n += Math.min(size, overlap) * 2;
        } else {
          overlap = 0;
        }
        var knots = [];
        for (var i = 0; i < size; i++)
          knots[i + overlap] = segments[i]._point;
        if (this._closed) {
          for (var i = 0; i < overlap; i++) {
            knots[i] = segments[i + size - overlap]._point;
            knots[i + size + overlap] = segments[i]._point;
          }
        } else {
          n--;
        }
        var rhs = [];

        for (var i = 1; i < n - 1; i++)
          rhs[i] = 4 * knots[i]._x + 2 * knots[i + 1]._x;
        rhs[0] = knots[0]._x + 2 * knots[1]._x;
        rhs[n - 1] = 3 * knots[n - 1]._x;
        var x = getFirstControlPoints(rhs);

        for (var i = 1; i < n - 1; i++)
          rhs[i] = 4 * knots[i]._y + 2 * knots[i + 1]._y;
        rhs[0] = knots[0]._y + 2 * knots[1]._y;
        rhs[n - 1] = 3 * knots[n - 1]._y;
        var y = getFirstControlPoints(rhs);

        if (this._closed) {
          for (var i = 0, j = size; i < overlap; i++, j++) {
            var f1 = i / overlap,
              f2 = 1 - f1,
              ie = i + overlap,
              je = j + overlap;
            x[j] = x[i] * f1 + x[j] * f2;
            y[j] = y[i] * f1 + y[j] * f2;
            x[je] = x[ie] * f2 + x[je] * f1;
            y[je] = y[ie] * f2 + y[je] * f1;
          }
          n--;
        }
        var handleIn = null;
        for (var i = overlap; i <= n - overlap; i++) {
          var segment = segments[i - overlap];
          if (handleIn)
            segment.setHandleIn(handleIn.subtract(segment._point));
          if (i < n) {
            segment.setHandleOut(
                Point.create(x[i], y[i]).subtract(segment._point));
            if (i < n - 1)
              handleIn = Point.create(
                  2 * knots[i + 1]._x - x[i + 1],
                  2 * knots[i + 1]._y - y[i + 1]);
            else
              handleIn = Point.create(
                  (knots[n]._x + x[n - 1]) / 2,
                  (knots[n]._y + y[n - 1]) / 2);
          }
        }
        if (this._closed && handleIn) {
          var segment = this._segments[0];
          segment.setHandleIn(handleIn.subtract(segment._point));
        }
      }
    };
  }, new function() { 
    function getCurrentSegment(that) {
      var segments = that._segments;
      if (segments.length == 0)
        throw new Error('Use a moveTo() command first');
      return segments[segments.length - 1];
    }

    return {
      moveTo: function(point) {
        if (this._segments.length === 1)
          this.removeSegment(0);
        if (!this._segments.length)
          this._add([ new Segment(Point.read(arguments)) ]);
      },

      moveBy: function(point) {
        throw new Error('moveBy() is unsupported on Path items.');
      },

      lineTo: function(point) {
        this._add([ new Segment(Point.read(arguments)) ]);
      },

      cubicCurveTo: function(handle1, handle2, to) {
        var _handle1 = Point.read(arguments),
          _handle2 = Point.read(arguments),
          _to = Point.read(arguments);
        var current = getCurrentSegment(this);
        current.setHandleOut(_handle1.subtract(current._point));
        this._add([ new Segment(_to, _handle2.subtract(to)) ]);
      },

      quadraticCurveTo: function(handle, to) {
        var _handle = Point.read(arguments),
          to = Point.read(arguments);
        var current = getCurrentSegment(this)._point;
        this.cubicCurveTo(
          _handle.add(current.subtract(_handle).multiply(1 / 3)),
          _handle.add(to.subtract(_handle).multiply(1 / 3)),
          to
        );
      },

      curveTo: function(through, to, parameter) {
        var _through = Point.read(arguments),
          _to = Point.read(arguments),
          t = Base.pick(Base.read(arguments), 0.5),
          t1 = 1 - t,
          current = getCurrentSegment(this)._point,
          handle = _through.subtract(current.multiply(t1 * t1))
            .subtract(_to.multiply(t * t)).divide(2 * t * t1);
        if (handle.isNaN())
          throw new Error(
            'Cannot put a curve through points with parameter = ' + t);
        this.quadraticCurveTo(handle, _to);
      },

      arcTo: function(to, clockwise ) {
        var current = getCurrentSegment(this),
          from = current._point,
          through,
          point = Point.read(arguments),
          next = Base.pick(Base.peek(arguments), true);
        if (typeof next === 'boolean') {
          to = point;
          clockwise = next;
          var middle = from.add(to).divide(2),
          through = middle.add(middle.subtract(from).rotate(
              clockwise ? -90 : 90));
        } else {
          through = point;
          to = Point.read(arguments);
        }
        var l1 = new Line(from.add(through).divide(2),
            through.subtract(from).rotate(90)),
          l2 = new Line(through.add(to).divide(2),
            to.subtract(through).rotate(90)),
          center = l1.intersect(l2),
          line = new Line(from, to, true),
          throughSide = line.getSide(through);
        if (!center) {
          if (!throughSide)
            return this.lineTo(to);
          throw new Error("Cannot put an arc through the given points: "
            + [from, through, to]);
        }
        var vector = from.subtract(center),
          radius = vector.getLength(),
          extent = vector.getDirectedAngle(to.subtract(center)),
          centerSide = line.getSide(center);
        if (centerSide == 0) {
          extent = throughSide * Math.abs(extent);
        } else if (throughSide == centerSide) {
          extent -= 360 * (extent < 0 ? -1 : 1);
        }
        var ext = Math.abs(extent),
          count =  ext >= 360 ? 4 : Math.ceil(ext / 90),
          inc = extent / count,
          half = inc * Math.PI / 360,
          z = 4 / 3 * Math.sin(half) / (1 + Math.cos(half)),
          segments = [];
        for (var i = 0; i <= count; i++) {
          var pt = i < count ? center.add(vector) : to;
          var out = i < count ? vector.rotate(90).multiply(z) : null;
          if (i == 0) {
            current.setHandleOut(out);
          } else {
            segments.push(
              new Segment(pt, vector.rotate(-90).multiply(z), out));
          }
          vector = vector.rotate(inc);
        }
        this._add(segments);
      },

      lineBy: function(vector) {
        vector = Point.read(arguments);
        var current = getCurrentSegment(this);
        this.lineTo(current._point.add(vector));
      },

      curveBy: function(throughVector, toVector, parameter) {
        throughVector = Point.read(throughVector);
        toVector = Point.read(toVector);
        var current = getCurrentSegment(this)._point;
        this.curveTo(current.add(throughVector), current.add(toVector),
            parameter);
      },

      arcBy: function(throughVector, toVector) {
        throughVector = Point.read(throughVector);
        toVector = Point.read(toVector);
        var current = getCurrentSegment(this)._point;
        this.arcBy(current.add(throughVector), current.add(toVector));
      },

      closePath: function() {
        var first = this.getFirstSegment(),
          last = this.getLastSegment();
        if (first._point.equals(last._point)) {
          first.setHandleIn(last._handleIn);
          last.remove();
        }
        this.setClosed(true);
      }
    };
  }, {  

    _getBounds: function(getter, matrix) {
      return Path[getter](this._segments, this._closed, this._style, matrix);
    },

  statics: {
    getBounds: function(segments, closed, style, matrix, strokePadding) {
      var first = segments[0];
      if (!first)
        return new Rectangle();
      var coords = new Array(6),
        prevCoords = first._transformCoordinates(matrix, new Array(6), false),
        min = prevCoords.slice(0, 2), 
        max = min.slice(0), 
        roots = new Array(2);

      function processSegment(segment) {
        segment._transformCoordinates(matrix, coords, false);
        for (var i = 0; i < 2; i++) {
          Curve._addBounds(
            prevCoords[i], 
            prevCoords[i + 4], 
            coords[i + 2], 
            coords[i], 
            i, strokePadding ? strokePadding[i] : 0, min, max, roots);
        }
        var tmp = prevCoords;
        prevCoords = coords;
        coords = tmp;
      }

      for (var i = 1, l = segments.length; i < l; i++)
        processSegment(segments[i]);
      if (closed)
        processSegment(first);
      return Rectangle.create(min[0], min[1], max[0] - min[0], max[1] - min[1]);
    },

    getStrokeBounds: function(segments, closed, style, matrix) {
      function getPenPadding(radius, matrix) {
        if (!matrix)
          return [radius, radius];
        var mx = matrix.shiftless(),
          hor = mx.transform(Point.create(radius, 0)),
          ver = mx.transform(Point.create(0, radius)),
          phi = hor.getAngleInRadians(),
          a = hor.getLength(),
          b = ver.getLength();
        var sin = Math.sin(phi),
          cos = Math.cos(phi),
          tan = Math.tan(phi),
          tx = -Math.atan(b * tan / a),
          ty = Math.atan(b / (tan * a));
        return [Math.abs(a * Math.cos(tx) * cos - b * Math.sin(tx) * sin),
            Math.abs(b * Math.sin(ty) * cos + a * Math.cos(ty) * sin)];
      }

      if (!style._strokeColor || !style._strokeWidth)
        return Path.getBounds(segments, closed, style, matrix);
      var radius = style._strokeWidth / 2,
        padding = getPenPadding(radius, matrix),
        bounds = Path.getBounds(segments, closed, style, matrix, padding),
        join = style._strokeJoin,
        cap = style._strokeCap,
        miter = style._miterLimit * style._strokeWidth / 2;
      var joinBounds = new Rectangle(new Size(padding).multiply(2));

      function add(point) {
        bounds = bounds.include(matrix
          ? matrix._transformPoint(point, point) : point);
      }

      function addBevelJoin(curve, t) {
        var point = curve.getPointAt(t, true),
          normal = curve.getNormalAt(t, true).normalize(radius);
        add(point.add(normal));
        add(point.subtract(normal));
      }

      function addJoin(segment, join) {
        if (join === 'round' || !segment._handleIn.isZero()
            && !segment._handleOut.isZero()) {
          bounds = bounds.unite(joinBounds.setCenter(matrix
            ? matrix._transformPoint(segment._point) : segment._point));
        } else if (join == 'bevel') {
          var curve = segment.getCurve();
          addBevelJoin(curve, 0);
          addBevelJoin(curve.getPrevious(), 1);
        } else if (join == 'miter') {
          var curve2 = segment.getCurve(),
            curve1 = curve2.getPrevious(),
            point = curve2.getPointAt(0, true),
            normal1 = curve1.getNormalAt(1, true).normalize(radius),
            normal2 = curve2.getNormalAt(0, true).normalize(radius),
            line1 = new Line(point.subtract(normal1),
                Point.create(-normal1.y, normal1.x)),
            line2 = new Line(point.subtract(normal2),
                Point.create(-normal2.y, normal2.x)),
            corner = line1.intersect(line2);
          if (!corner || point.getDistance(corner) > miter) {
            addJoin(segment, 'bevel');
          } else {
            add(corner);
          }
        }
      }

      function addCap(segment, cap, t) {
        switch (cap) {
        case 'round':
          return addJoin(segment, cap);
        case 'butt':
        case 'square':
          var curve = segment.getCurve(),
            point = curve.getPointAt(t, true),
            normal = curve.getNormalAt(t, true).normalize(radius);
          if (cap === 'square')
            point = point.add(normal.rotate(t == 0 ? -90 : 90));
          add(point.add(normal));
          add(point.subtract(normal));
          break;
        }
      }

      for (var i = 1, l = segments.length - (closed ? 0 : 1); i < l; i++)
        addJoin(segments[i], join);
      if (closed) {
        addJoin(segments[0], join);
      } else {
        addCap(segments[0], cap, 0);
        addCap(segments[segments.length - 1], cap, 1);
      }
      return bounds;
    },

    getHandleBounds: function(segments, closed, style, matrix, strokePadding,
        joinPadding) {
      var coords = new Array(6),
        x1 = Infinity,
        x2 = -x1,
        y1 = x1,
        y2 = x2;
      strokePadding = strokePadding / 2 || 0;
      joinPadding = joinPadding / 2 || 0;
      for (var i = 0, l = segments.length; i < l; i++) {
        var segment = segments[i];
        segment._transformCoordinates(matrix, coords, false);
        for (var j = 0; j < 6; j += 2) {
          var padding = j == 0 ? joinPadding : strokePadding,
            x = coords[j],
            y = coords[j + 1],
            xn = x - padding,
            xx = x + padding,
            yn = y - padding,
            yx = y + padding;
          if (xn < x1) x1 = xn;
          if (xx > x2) x2 = xx;
          if (yn < y1) y1 = yn;
          if (yx > y2) y2 = yx;
        }
      }
      return Rectangle.create(x1, y1, x2 - x1, y2 - y1);
    },

    getRoughBounds: function(segments, closed, style, matrix) {
      var strokeWidth = style._strokeColor ? style._strokeWidth : 0;
      return Path.getHandleBounds(segments, closed, style, matrix,
          strokeWidth,
          style._strokeJoin == 'miter'
            ? strokeWidth * style._miterLimit
            : strokeWidth);
    }
  }});

  Path.inject({ statics: new function() {

    function createPath(args) {
      return new Path().set(Base.getNamed(args));
    }

    function createRectangle() {
      var rect = Rectangle.readNamed(arguments, 'rectangle'),
        left = rect.getLeft(),
        top = rect.getTop(),
        right = rect.getRight(),
        bottom = rect.getBottom(),
        path = createPath(arguments);
      path._add([
        new Segment(Point.create(left, bottom)),
        new Segment(Point.create(left, top)),
        new Segment(Point.create(right, top)),
        new Segment(Point.create(right, bottom))
      ]);
      path._closed = true;
      return path;
    }

    var kappa = 2 * (Math.sqrt(2) - 1) / 3;

    var ellipseSegments = [
      new Segment([0, 0.5], [0, kappa ], [0, -kappa]),
      new Segment([0.5, 0], [-kappa, 0], [kappa, 0 ]),
      new Segment([1, 0.5], [0, -kappa], [0, kappa ]),
      new Segment([0.5, 1], [kappa, 0 ], [-kappa, 0])
    ];

    function createEllipse() {
      var rect = Rectangle.readNamed(arguments, 'rectangle'),
        path = createPath(arguments),
        point = rect.getPoint(true),
        size = rect.getSize(true),
        segments = new Array(4);
      for (var i = 0; i < 4; i++) {
        var segment = ellipseSegments[i];
        segments[i] = new Segment(
          segment._point.multiply(size).add(point),
          segment._handleIn.multiply(size),
          segment._handleOut.multiply(size)
        );
      }
      path._add(segments);
      path._closed = true;
      return path;
    }

    return {
      Line: function() {
        return new Path(
          Point.readNamed(arguments, 'from'),
          Point.readNamed(arguments, 'to')
        ).set(Base.getNamed(arguments));
      },

      Rectangle: createRectangle,

      RoundRectangle: function() {
        var rect = Rectangle.readNamed(arguments, 'rectangle'),
          radius = Size.readNamed(arguments, 'radius');
        if (radius.isZero())
          return createRectangle(rect);
        radius = Size.min(radius, rect.getSize(true).divide(2));
        var bl = rect.getBottomLeft(true),
          tl = rect.getTopLeft(true),
          tr = rect.getTopRight(true),
          br = rect.getBottomRight(true),
          h = radius.multiply(kappa * 2), 
          path = createPath(arguments);
        path._add([
          new Segment(bl.add(radius.width, 0), null, [-h.width, 0]),
          new Segment(bl.subtract(0, radius.height), [0, h.height], null),

          new Segment(tl.add(0, radius.height), null, [0, -h.height]),
          new Segment(tl.add(radius.width, 0), [-h.width, 0], null),

          new Segment(tr.subtract(radius.width, 0), null, [h.width, 0]),
          new Segment(tr.add(0, radius.height), [0, -h.height], null),

          new Segment(br.subtract(0, radius.height), null, [0, h.height]),
          new Segment(br.subtract(radius.width, 0), [h.width, 0], null)
        ]);
        path._closed = true;
        return path;
      },

      Ellipse: createEllipse,

      Oval: createEllipse,

      Circle: function() {
        var center = Point.readNamed(arguments, 'center'),
          radius = Base.readNamed(arguments, 'radius');
        return createEllipse(new Rectangle(center.subtract(radius),
            Size.create(radius * 2, radius * 2)))
            .set(Base.getNamed(arguments));
      },

      Arc: function() {
        var from = Point.readNamed(arguments, 'from'),
          through = Point.readNamed(arguments, 'through'),
          to = Point.readNamed(arguments, 'to'),
          path = createPath(arguments);
        path.moveTo(from);
        path.arcTo(through, to);
        return path;
      },

      RegularPolygon: function() {
        var center = Point.readNamed(arguments, 'center'),
          sides = Base.readNamed(arguments, 'sides'),
          radius = Base.readNamed(arguments, 'radius'),
          path = createPath(arguments),
          step = 360 / sides,
          three = !(sides % 3),
          vector = new Point(0, three ? -radius : radius),
          offset = three ? -1 : 0.5,
          segments = new Array(sides);
        for (var i = 0; i < sides; i++) {
          segments[i] = new Segment(center.add(
            vector.rotate((i + offset) * step)));
        }
        path._add(segments);
        path._closed = true;
        return path;
      },

      Star: function() {
        var center = Point.readNamed(arguments, 'center'),
          points = Base.readNamed(arguments, 'points') * 2,
          radius1 = Base.readNamed(arguments, 'radius1'),
          radius2 = Base.readNamed(arguments, 'radius2'),
          path = createPath(arguments),
          step = 360 / points,
          vector = new Point(0, -1),
          segments = new Array(points);
        for (var i = 0; i < points; i++) {
          segments[i] = new Segment(center.add(
            vector.rotate(step * i).multiply(i % 2 ? radius2 : radius1)));
        }
        path._add(segments);
        path._closed = true;
        return path;
      }
    };
  }});

  var CompoundPath = this.CompoundPath = PathItem.extend({
    _type: 'CompoundPath',
    _serializeFields: {
      pathData: ''
    },

    initialize: function(arg) {
      this.base();
      this._children = [];
      this._namedChildren = {};
      if (!this._set(arg))
        this.addChildren(Array.isArray(arg) ? arg : arguments);
    },

    insertChild: function(index, item, _cloning) {
      if (item._type !== 'Path')
        return null;
      item = this.base(index, item);
      if (!_cloning && item && item._clockwise === undefined)
        item.setClockwise(item._index == 0);
      return item;
    },

    reduce: function() {
      if (this._children.length == 1) {
        var child = this._children[0];
        child.insertAbove(this);
        this.remove();
        return child;
      }
      return this;
    },

    smooth: function() {
      for (var i = 0, l = this._children.length; i < l; i++)
        this._children[i].smooth();
    },

    getFirstSegment: function() {
      var first = this.getFirstChild();
      return first && first.getFirstSegment();
    },

    getLastSegment: function() {
      var last = this.getLastChild();
      return last && last.getLastSegment();
    },

    getCurves: function() {
      var children = this._children,
        curves = [];
      for (var i = 0, l = children.length; i < l; i++)
        curves = curves.concat(children[i].getCurves());
      return curves;
    },

    getFirstCurve: function() {
      var first = this.getFirstChild();
      return first && first.getFirstCurve();
    },

    getLastCurve: function() {
      var last = this.getLastChild();
      return last && last.getFirstCurve();
    },

    getPathData: function() {
      var children = this._children,
        paths = [];
      for (var i = 0, l = children.length; i < l; i++)
        paths.push(children[i].getPathData(arguments[0]));
      return paths.join(' ');
    },

    _contains: function(point) {
      var children = [];
      for (var i = 0, l = this._children.length; i < l; i++) {
        var child = this._children[i];
        if (child.contains(point))
          children.push(child);
      }
      return (children.length & 1) == 1 && children;
    },

    contains: function(point) {
      return !!this._contains(Point.read(arguments));
    },

    _hitTest: function(point, options) {
      var res = this.base(point, Base.merge(options, { fill: false }));
      if (!res && options.fill && this._style._fillColor) {
        res = this._contains(point);
        res = res ? new HitResult('fill', res[0]) : null;
      }
      return res;
    },

    draw: function(ctx, param) {
      var children = this._children,
        style = this._style;
      if (children.length == 0)
        return;
      ctx.beginPath();
      param.compound = true;
      for (var i = 0, l = children.length; i < l; i++)
        Item.draw(children[i], ctx, param);
      param.compound = false;
      if (param.clip || this._clipMask) {
        ctx.clip();
      } else {
        this._setStyles(ctx);
        if (style._fillColor)
          ctx.fill();
        if (style._strokeColor)
          ctx.stroke();
      }
    }
  }, new function() { 
    function getCurrentPath(that) {
      if (!that._children.length)
        throw new Error('Use a moveTo() command first');
      return that._children[that._children.length - 1];
    }

    var fields = {
      moveTo: function(point) {
        var path = new Path();
        this.addChild(path);
        path.moveTo.apply(path, arguments);
      },

      moveBy: function(point) {
        this.moveTo(getCurrentPath(this).getLastSegment()._point.add(
            Point.read(arguments)));
      },

      closePath: function() {
        getCurrentPath(this).closePath();
      }
    };

    Base.each(['lineTo', 'cubicCurveTo', 'quadraticCurveTo', 'curveTo',
        'arcTo', 'lineBy', 'curveBy', 'arcBy'], function(key) {
      fields[key] = function() {
        var path = getCurrentPath(this);
        path[key].apply(path, arguments);
      };
    });

    return fields;
  });

  var PathFlattener = Base.extend({
    initialize: function(path) {
      this.curves = []; 
      this.parts = []; 
      this.length = 0; 
      this.index = 0;

      var segments = path._segments,
        segment1 = segments[0],
        segment2,
        that = this;

      function addCurve(segment1, segment2) {
        var curve = Curve.getValues(segment1, segment2);
        that.curves.push(curve);
        that._computeParts(curve, segment1._index, 0, 1);
      }

      for (var i = 1, l = segments.length; i < l; i++) {
        segment2 = segments[i];
        addCurve(segment1, segment2);
        segment1 = segment2;
      }
      if (path._closed)
        addCurve(segment2, segments[0]);
    },

    _computeParts: function(curve, index, minT, maxT) {
      if ((maxT - minT) > 1 / 32 && !Curve.isFlatEnough(curve, 0.25)) {
        var curves = Curve.subdivide(curve);
        var halfT = (minT + maxT) / 2;
        this._computeParts(curves[0], index, minT, halfT);
        this._computeParts(curves[1], index, halfT, maxT);
      } else {
        var x = curve[6] - curve[0],
          y = curve[7] - curve[1],
          dist = Math.sqrt(x * x + y * y);
        if (dist > 0.00001) {
          this.length += dist;
          this.parts.push({
            offset: this.length,
            value: maxT,
            index: index
          });
        }
      }
    },

    getParameterAt: function(offset) {
      var i, j = this.index;
      for (;;) {
        i = j;
        if (j == 0 || this.parts[--j].offset < offset)
          break;
      }
      for (var l = this.parts.length; i < l; i++) {
        var part = this.parts[i];
        if (part.offset >= offset) {
          this.index = i;
          var prev = this.parts[i - 1];
          var prevVal = prev && prev.index == part.index ? prev.value : 0,
            prevLen = prev ? prev.offset : 0;
          return {
            value: prevVal + (part.value - prevVal)
              * (offset - prevLen) /  (part.offset - prevLen),
            index: part.index
          };
        }
      }
      var part = this.parts[this.parts.length - 1];
      return {
        value: 1,
        index: part.index
      };
    },

    evaluate: function(offset, type) {
      var param = this.getParameterAt(offset);
      return Curve.evaluate(this.curves[param.index], param.value, true, type);
    },

    drawPart: function(ctx, from, to) {
      from = this.getParameterAt(from);
      to = this.getParameterAt(to);
      for (var i = from.index; i <= to.index; i++) {
        var curve = Curve.getPart(this.curves[i],
            i == from.index ? from.value : 0,
            i == to.index ? to.value : 1);
        if (i == from.index)
          ctx.moveTo(curve[0], curve[1]);
        ctx.bezierCurveTo.apply(ctx, curve.slice(2));
      }
    }
  });

  var PathFitter = Base.extend({
    initialize: function(path, error) {
      this.points = [];
      var segments = path._segments,
        prev;
      for (var i = 0, l = segments.length; i < l; i++) {
        var point = segments[i].point.clone();
        if (!prev || !prev.equals(point)) {
          this.points.push(point);
          prev = point;
        }
      }
      this.error = error;
    },

    fit: function() {
      var points = this.points,
        length = points.length;
      this.segments = length > 0 ? [new Segment(points[0])] : [];
      if (length > 1)
        this.fitCubic(0, length - 1,
          points[1].subtract(points[0]).normalize(),
          points[length - 2].subtract(points[length - 1]).normalize());
      return this.segments;
    },

    fitCubic: function(first, last, tan1, tan2) {
      if (last - first == 1) {
        var pt1 = this.points[first],
          pt2 = this.points[last],
          dist = pt1.getDistance(pt2) / 3;
        this.addCurve([pt1, pt1.add(tan1.normalize(dist)),
            pt2.add(tan2.normalize(dist)), pt2]);
        return;
      }
      var uPrime = this.chordLengthParameterize(first, last),
        maxError = Math.max(this.error, this.error * this.error),
        error,
        split;
      for (var i = 0; i <= 4; i++) {
        var curve = this.generateBezier(first, last, uPrime, tan1, tan2);
        var max = this.findMaxError(first, last, curve, uPrime);
        if (max.error < this.error) {
          this.addCurve(curve);
          return;
        }
        split = max.index;
        if (max.error >= maxError)
          break;
        this.reparameterize(first, last, uPrime, curve);
        maxError = max.error;
      }
      var V1 = this.points[split - 1].subtract(this.points[split]),
        V2 = this.points[split].subtract(this.points[split + 1]),
        tanCenter = V1.add(V2).divide(2).normalize();
      this.fitCubic(first, split, tan1, tanCenter);
      this.fitCubic(split, last, tanCenter.negate(), tan2);
    },

    addCurve: function(curve) {
      var prev = this.segments[this.segments.length - 1];
      prev.setHandleOut(curve[1].subtract(curve[0]));
      this.segments.push(
          new Segment(curve[3], curve[2].subtract(curve[3])));
    },

    generateBezier: function(first, last, uPrime, tan1, tan2) {
      var epsilon = 1e-11,
        pt1 = this.points[first],
        pt2 = this.points[last],
        C = [[0, 0], [0, 0]],
        X = [0, 0];

      for (var i = 0, l = last - first + 1; i < l; i++) {
        var u = uPrime[i],
          t = 1 - u,
          b = 3 * u * t,
          b0 = t * t * t,
          b1 = b * t,
          b2 = b * u,
          b3 = u * u * u,
          a1 = tan1.normalize(b1),
          a2 = tan2.normalize(b2),
          tmp = this.points[first + i]
            .subtract(pt1.multiply(b0 + b1))
            .subtract(pt2.multiply(b2 + b3));
        C[0][0] += a1.dot(a1);
        C[0][1] += a1.dot(a2);
        C[1][0] = C[0][1];
        C[1][1] += a2.dot(a2);
        X[0] += a1.dot(tmp);
        X[1] += a2.dot(tmp);
      }

      var detC0C1 = C[0][0] * C[1][1] - C[1][0] * C[0][1],
        alpha1, alpha2;
      if (Math.abs(detC0C1) > epsilon) {
        var detC0X  = C[0][0] * X[1]    - C[1][0] * X[0],
          detXC1  = X[0]    * C[1][1] - X[1]    * C[0][1];
        alpha1 = detXC1 / detC0C1;
        alpha2 = detC0X / detC0C1;
      } else {
        var c0 = C[0][0] + C[0][1],
          c1 = C[1][0] + C[1][1];
        if (Math.abs(c0) > epsilon) {
          alpha1 = alpha2 = X[0] / c0;
        } else if (Math.abs(c1) > epsilon) {
          alpha1 = alpha2 = X[1] / c1;
        } else {
          alpha1 = alpha2 = 0;
        }
      }

      var segLength = pt2.getDistance(pt1);
      epsilon *= segLength;
      if (alpha1 < epsilon || alpha2 < epsilon) {
        alpha1 = alpha2 = segLength / 3;
      }

      return [pt1, pt1.add(tan1.normalize(alpha1)),
          pt2.add(tan2.normalize(alpha2)), pt2];
    },

    reparameterize: function(first, last, u, curve) {
      for (var i = first; i <= last; i++) {
        u[i - first] = this.findRoot(curve, this.points[i], u[i - first]);
      }
    },

    findRoot: function(curve, point, u) {
      var curve1 = [],
        curve2 = [];
      for (var i = 0; i <= 2; i++) {
        curve1[i] = curve[i + 1].subtract(curve[i]).multiply(3);
      }
      for (var i = 0; i <= 1; i++) {
        curve2[i] = curve1[i + 1].subtract(curve1[i]).multiply(2);
      }
      var pt = this.evaluate(3, curve, u),
        pt1 = this.evaluate(2, curve1, u),
        pt2 = this.evaluate(1, curve2, u),
        diff = pt.subtract(point),
        df = pt1.dot(pt1) + diff.dot(pt2);
      if (Math.abs(df) < 0.00001)
        return u;
      return u - diff.dot(pt1) / df;
    },

    evaluate: function(degree, curve, t) {
      var tmp = curve.slice();
      for (var i = 1; i <= degree; i++) {
        for (var j = 0; j <= degree - i; j++) {
          tmp[j] = tmp[j].multiply(1 - t).add(tmp[j + 1].multiply(t));
        }
      }
      return tmp[0];
    },

    chordLengthParameterize: function(first, last) {
      var u = [0];
      for (var i = first + 1; i <= last; i++) {
        u[i - first] = u[i - first - 1]
            + this.points[i].getDistance(this.points[i - 1]);
      }
      for (var i = 1, m = last - first; i <= m; i++) {
        u[i] /= u[m];
      }
      return u;
    },

    findMaxError: function(first, last, curve, u) {
      var index = Math.floor((last - first + 1) / 2),
        maxDist = 0;
      for (var i = first + 1; i < last; i++) {
        var P = this.evaluate(3, curve, u[i - first]);
        var v = P.subtract(this.points[i]);
        var dist = v.x * v.x + v.y * v.y; 
        if (dist >= maxDist) {
          maxDist = dist;
          index = i;
        }
      }
      return {
        error: maxDist,
        index: index
      };
    }
  });

  var TextItem = this.TextItem = Item.extend({
    _boundsSelected: true,
    _serializeFields: {
      content: null
    },
    _boundsGetter: 'getBounds',

    initialize: function(arg) {
      this._style = CharacterStyle.create(this);
      this._paragraphStyle = ParagraphStyle.create(this);
      var hasProperties = Base.isPlainObject(arg)
          && arg.x === undefined && arg.y === undefined;
      this.base(hasProperties ? null : Point.read(arguments));
      this.setParagraphStyle();
      this._content = '';
      this._lines = [];
      if (hasProperties) {
        this._set(arg);
      }
    },

    _clone: function(copy) {
      copy.setContent(this._content);
      copy.setParagraphStyle(this._paragraphStyle);
      return this.base(copy);
    },

    getContent: function() {
      return this._content;
    },

    setContent: function(content) {
      this._content = '' + content;
      this._lines = this._content.split(/\r\n|\n|\r/mg);
      this._changed(69);
    },

    isEmpty: function() {
      return !this._content;
    },

    getCharacterStyle: function() {
      return this.getStyle();
    },

    setCharacterStyle: function(style) {
      this.setStyle(style);
    }

  });

  var PointText = this.PointText = TextItem.extend({
    _type: 'PointText',

    clone: function() {
      return this._clone(new PointText());
    },

    getPoint: function() {
      var point = this._matrix.getTranslation();
      return LinkedPoint.create(this, 'setPoint', point.x, point.y);
    },

    setPoint: function(point) {
      this.translate(Point.read(arguments).subtract(
          this._matrix.getTranslation()));
    },

    draw: function(ctx) {
      if (!this._content)
        return;
      this._setStyles(ctx);
      var style = this._style,
        leading = this.getLeading(),
        lines = this._lines;
      ctx.font = style.getFontStyle();
      ctx.textAlign = this.getJustification();
      for (var i = 0, l = lines.length; i < l; i++) {
        var line = lines[i];
        if (style._fillColor)
          ctx.fillText(line, 0, 0);
        if (style._strokeColor)
          ctx.strokeText(line, 0, 0);
        ctx.translate(0, leading);
      }
    }
  }, new function() {
    var measureCtx = null;

    return {
      _getBounds: function(getter, matrix) {
        if (!measureCtx)
          measureCtx = CanvasProvider.getContext(1, 1);
        var justification = this.getJustification(),
          x = 0;
        measureCtx.font = this._style.getFontStyle();
        var width = 0;
        for (var i = 0, l = this._lines.length; i < l; i++)
          width = Math.max(width, measureCtx.measureText(
              this._lines[i]).width);
        if (justification !== 'left')
          x -= width / (justification === 'center' ? 2: 1);
        var leading = this.getLeading(),
          count = this._lines.length,
          bounds = Rectangle.create(x,
              count ? leading / 4 + (count - 1) * leading : 0,
              width, -count * leading);
        return matrix ? matrix._transformBounds(bounds, bounds) : bounds;
      }
    };
  });

  var Style = Base.extend({
    initialize: function(style) {
      var clone = style instanceof Style;
      return Base.each(this._defaults, function(value, key) {
        value = style && style[key] || value;
        this[key] = value && clone && value.clone
            ? value.clone() : value;
      }, this);
    },

    _getChildren: function() {
      return this._item instanceof Group && this._item._children;
    },

    statics: {
      create: function(item) {
        var style = Base.create(this);
        style._item = item;
        return style;
      },

      extend: function(src) {
        var styleKey = '_' + src._style,
          stylePart = Base.capitalize(src._style),
          flags = src._flags || {},
          owner = {};

        owner['get' + stylePart] = function() {
          return this[styleKey];
        };

        owner['set' + stylePart] = function(style) {
          this[styleKey].initialize(style);
        };

        Base.each(src._defaults, function(value, key) {
          var isColor = /Color$/.test(key),
            part = Base.capitalize(key),
            set = 'set' + part,
            get = 'get' + part;
          src[set] = function(value) {
            var children = this._getChildren();
            value = isColor ? Color.read(arguments, 0, 0, true) : value;
            if (children && children.length > 0) {
              for (var i = 0, l = children.length; i < l; i++)
                children[i][styleKey][set](value);
            } else {
              var old = this['_' + key];
              if (!Base.equals(old, value)) {
                if (isColor) {
                  if (old)
                    delete old._owner;
                  if (value) {
                    value._owner = this._item;
                  }
                }
                this['_' + key] = value;
                if (this._item)
                  this._item._changed(flags[key] || 17);
              }
            }
          };
          src[get] = function() {
            var children = this._getChildren(),
              style;
            if (!children || children.length === 0)
              return this['_' + key];
            for (var i = 0, l = children.length; i < l; i++) {
              var childStyle = children[i][styleKey][get]();
              if (!style) {
                style = childStyle;
              } else if (!Base.equals(style, childStyle)) {
                return undefined;
              }
            }
            return style;
          };
          owner[get] = function() {
            return this[styleKey][get]();
          };
          owner[set] = function(value) {
            this[styleKey][set](value);
          };
        });
        src._owner.inject(owner);
        return this.base.apply(this, arguments);
      }
    }
  });

  var PathStyle = this.PathStyle = Style.extend({
    _owner: Item,
    _style: 'style',
    _defaults: {
      fillColor: undefined,
      strokeColor: undefined,
      strokeWidth: 1,
      strokeCap: 'butt',
      strokeJoin: 'miter',
      miterLimit: 10,
      dashOffset: 0,
      dashArray: []
    },
    _flags: {
      strokeWidth: 25,
      strokeCap: 25,
      strokeJoin: 25,
      miterLimit: 25
    }

  });

  var ParagraphStyle = this.ParagraphStyle = Style.extend({
    _owner: TextItem,
    _style: 'paragraphStyle',
    _defaults: {
      justification: 'left'
    },
    _flags: {
      justification: 5
    }

  });

  var CharacterStyle = this.CharacterStyle = PathStyle.extend({
    _owner: TextItem,
    _style: 'style',
    _defaults: Base.merge(PathStyle.prototype._defaults, {
      fillColor: 'black',
      fontSize: 12,
      leading: null,
      font: 'sans-serif'
    }),
    _flags: {
      fontSize: 5,
      leading: 5,
      font: 5
    }

  }, {
    getLeading: function() {
      var leading = this.base();
      return leading != null ? leading : this.getFontSize() * 1.2;
    },

    getFontStyle: function() {
      var size = this._fontSize;
      return (/[a-z]/i.test(size) ? size + ' ' : size + 'px ') + this._font;
    }
  });

  var Color = this.Color = Base.extend(new function() {

    var components = {
      gray: ['gray'],
      rgb: ['red', 'green', 'blue'],
      hsl: ['hue', 'saturation', 'lightness'],
      hsb: ['hue', 'saturation', 'brightness']
    };

    var colorCache = {},
      colorCtx;

    function nameToRgbColor(name) {
      var color = colorCache[name];
      if (color)
        return color.clone();
      if (!colorCtx) {
        colorCtx = CanvasProvider.getContext(1, 1);
        colorCtx.globalCompositeOperation = 'copy';
      }
      colorCtx.fillStyle = 'rgba(0,0,0,0)';
      colorCtx.fillStyle = name;
      colorCtx.fillRect(0, 0, 1, 1);
      var data = colorCtx.getImageData(0, 0, 1, 1).data,
        rgb = [data[0] / 255, data[1] / 255, data[2] / 255];
      return (colorCache[name] = RgbColor.read(rgb)).clone();
    }

    function hexToRgbColor(string) {
      var hex = string.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
      if (hex.length >= 4) {
        var rgb = new Array(3);
        for (var i = 0; i < 3; i++) {
          var channel = hex[i + 1];
          rgb[i] = parseInt(channel.length == 1
              ? channel + channel : channel, 16) / 255;
        }
        return RgbColor.read(rgb);
      }
    }

    var hsbIndices = [
      [0, 3, 1], 
      [2, 0, 1], 
      [1, 0, 3], 
      [1, 2, 0], 
      [3, 1, 0], 
      [0, 1, 2]  
    ];

    var converters = {
      'rgb-hsb': function(color) {
        var r = color._red,
          g = color._green,
          b = color._blue,
          max = Math.max(r, g, b),
          min = Math.min(r, g, b),
          delta = max - min,
          h = delta == 0 ? 0
            :   ( max == r ? (g - b) / delta + (g < b ? 6 : 0)
              : max == g ? (b - r) / delta + 2
              :            (r - g) / delta + 4) * 60, 
          s = max == 0 ? 0 : delta / max,
          v = max; 
        return new HsbColor(h, s, v, color._alpha);
      },

      'hsb-rgb': function(color) {
        var h = (color._hue / 60) % 6, 
          s = color._saturation,
          b = color._brightness,
          i = Math.floor(h), 
          f = h - i,
          i = hsbIndices[i],
          v = [
            b,            
            b * (1 - s),      
            b * (1 - s * f),    
            b * (1 - s * (1 - f)) 
          ];
        return new RgbColor(v[i[0]], v[i[1]], v[i[2]], color._alpha);
      },

      'rgb-hsl': function(color) {
        var r = color._red,
          g = color._green,
          b = color._blue,
          max = Math.max(r, g, b),
          min = Math.min(r, g, b),
          delta = max - min,
          achromatic = delta == 0,
          h = achromatic ? 0
            :   ( max == r ? (g - b) / delta + (g < b ? 6 : 0)
              : max == g ? (b - r) / delta + 2
              :            (r - g) / delta + 4) * 60, 
          l = (max + min) / 2,
          s = achromatic ? 0 : l < 0.5
              ? delta / (max + min)
              : delta / (2 - max - min);
        return new HslColor(h, s, l, color._alpha);
      },

      'hsl-rgb': function(color) {
        var s = color._saturation,
          h = color._hue / 360,
          l = color._lightness;
        if (s == 0)
          return new RgbColor(l, l, l, color._alpha);
        var t3s = [ h + 1 / 3, h, h - 1 / 3 ],
          t2 = l < 0.5 ? l * (1 + s) : l + s - l * s,
          t1 = 2 * l - t2,
          c = [];
        for (var i = 0; i < 3; i++) {
          var t3 = t3s[i];
          if (t3 < 0) t3 += 1;
          if (t3 > 1) t3 -= 1;
          c[i] = 6 * t3 < 1
            ? t1 + (t2 - t1) * 6 * t3
            : 2 * t3 < 1
              ? t2
              : 3 * t3 < 2
                ? t1 + (t2 - t1) * ((2 / 3) - t3) * 6
                : t1;
        }
        return new RgbColor(c[0], c[1], c[2], color._alpha);
      },

      'rgb-gray': function(color) {
        return new GrayColor(1 - (color._red * 0.2989 + color._green * 0.587
            + color._blue * 0.114), color._alpha);
      },

      'gray-rgb': function(color) {
        var comp = 1 - color._gray;
        return new RgbColor(comp, comp, comp, color._alpha);
      },

      'gray-hsb': function(color) {
        return new HsbColor(0, 0, 1 - color._gray, color._alpha);
      },

      'gray-hsl': function(color) {
        return new HslColor(0, 0, 1 - color._gray, color._alpha);
      }
    };

    var fields = {
      _readNull: true,
      _readIndex: true,

      initialize: function(arg) {
        var isArray = Array.isArray(arg),
          type = this._type,
          res;
        if (typeof arg === 'object' && !isArray) {
          if (!type) {
            res = arg.red !== undefined
              ? new RgbColor(arg.red, arg.green, arg.blue, arg.alpha)
              : arg.gray !== undefined
              ? new GrayColor(arg.gray, arg.alpha)
              : arg.lightness !== undefined
              ? new HslColor(arg.hue, arg.saturation, arg.lightness,
                  arg.alpha)
              : arg.hue !== undefined
              ? new HsbColor(arg.hue, arg.saturation, arg.brightness,
                  arg.alpha)
              : new RgbColor(); 
            if (this._read)
              res._read = 1;
          } else {
            res = Color.read(arguments).convert(type);
            if (this._read)
              res._read = arguments._read;
          }
        } else if (typeof arg === 'string') {
          var rgbColor = arg.match(/^#[0-9a-f]{3,6}$/i)
              ? hexToRgbColor(arg)
              : nameToRgbColor(arg);
          res = type
              ? rgbColor.convert(type)
              : rgbColor;
          if (this._read)
            res._read = 1;
        } else {
          var components = isArray ? arg
              : Array.prototype.slice.call(arguments);
          if (!type) {
            var ctor = components.length >= 3
                ? RgbColor
                : GrayColor;
            res = new ctor(components);
          } else {
            res = Base.each(this._components,
              function(name, i) {
                var value = components[i];
                this['_' + name] = value !== undefined
                    ? value : null;
              },
            this);
          }
          if (this._read)
            res._read = res._components.length;
        }
        return res;
      },

      _serialize: function(options) {
        var res = [ this._type ];
        for (var i = 0, l = this._components.length; i < l; i++) {
          var component = this._components[i],
            value = this['_' + component];
          if (component !== 'alpha' || value != null && value < 1)
            res.push(Format.number(value, options.precision));
        }
        return res;
      },

      clone: function() {
        var copy = Base.create(this.constructor),
          components = this._components;
        for (var i = 0, l = components.length; i < l; i++) {
          var key = '_' + components[i];
          copy[key] = this[key];
        }
        return copy;
      },

      convert: function(type) {
        var converter;
        return this._type == type
            ? this.clone()
            : (converter = converters[this._type + '-' + type])
              ? converter(this)
              : converters['rgb-' + type](
                  converters[this._type + '-rgb'](this));
      },

      statics: {
        extend: function(src) {
          var comps = components[src._type];
          if (comps) {
            src._components = comps.concat(['alpha']);
            Base.each(comps, function(name) {
              var isHue = name === 'hue',
                part = Base.capitalize(name),
                name = '_' + name;
              this['get' + part] = function() {
                return this[name];
              };
              this['set' + part] = function(value) {
                this[name] = isHue
                  ? ((value % 360) + 360) % 360
                  : Math.min(Math.max(value, 0), 1);
                this._changed();
              };
            }, src);
          }
          return this.base.apply(this, arguments);
        },

        random: function() {
          return new RgbColor(Math.random(), Math.random(), Math.random());
        }
      }
    };

    Base.each(components, function(comps, type) {
      Base.each(comps, function(component) {
        var part = Base.capitalize(component);
        fields['get' + part] = function() {
          return this.convert(type)[component];
        };
        fields['set' + part] = function(value) {
          var color = this.convert(type);
          color[component] = value;
          color = color.convert(this._type);
          for (var i = 0, l = this._components.length; i < l; i++) {
            var key = this._components[i];
            this[key] = color[key];
          }
        };
      });
    });

    return fields;
  }, {

    _changed: function() {
      this._css = null;
      if (this._owner)
        this._owner._changed(17);
    },

    getType: function() {
      return this._type;
    },

    getComponents: function() {
      var length = this._components.length;
      var comps = new Array(length);
      for (var i = 0; i < length; i++)
        comps[i] = this['_' + this._components[i]];
      return comps;
    },

    getAlpha: function() {
      return this._alpha != null ? this._alpha : 1;
    },

    setAlpha: function(alpha) {
      this._alpha = alpha == null ? null : Math.min(Math.max(alpha, 0), 1);
      this._changed();
    },

    hasAlpha: function() {
      return this._alpha != null;
    },

    equals: function(color) {
      if (color && color._type === this._type) {
        for (var i = 0, l = this._components.length; i < l; i++) {
          var component = '_' + this._components[i];
          if (this[component] !== color[component])
            return false;
        }
        return true;
      }
      return false;
    },

    toString: function() {
      var parts = [],
        format = Format.number;
      for (var i = 0, l = this._components.length; i < l; i++) {
        var component = this._components[i],
          value = this['_' + component];
        if (component === 'alpha' && value == null)
          value = 1;
        parts.push(component + ': ' + format(value));
      }
      return '{ ' + parts.join(', ') + ' }';
    },

    toCss: function(noAlpha) {
      var css = this._css;
      if (!css || noAlpha) {
        var color = this.convert('rgb'),
          alpha = noAlpha ? 1 : color.getAlpha(),
          components = [
            Math.round(color._red * 255),
            Math.round(color._green * 255),
            Math.round(color._blue * 255)
          ];
        if (alpha < 1)
          components.push(alpha);
        var css = (components.length == 4 ? 'rgba(' : 'rgb(')
            + components.join(', ') + ')';
        if (!noAlpha)
          this._css = css;
      }
      return css;
    },

    toCanvasStyle: function() {
      return this.toCss();
    }

  });

  var GrayColor = this.GrayColor = Color.extend({

    _type: 'gray'
  });

  var RgbColor = this.RgbColor = this.RGBColor = Color.extend({

    _type: 'rgb'
  });

  var HsbColor = this.HsbColor = this.HSBColor = Color.extend({

    _type: 'hsb'
  });

  var HslColor = this.HslColor = this.HSLColor = Color.extend({

    _type: 'hsl'
  });

  var GradientColor = this.GradientColor = Color.extend({
    _type: 'gradient',

    initialize: function(gradient, origin, destination, hilite) {
      this._id = ++Base._uid;
      if (!this._set(gradient)) {
        this.setGradient(gradient || new LinearGradient());
        this.setOrigin(origin);
        this.setDestination(destination);
        if (hilite)
          this.setHilite(hilite);
      }
    },

    clone: function() {
      return new GradientColor(this._gradient, this._origin,
          this._destination, this._hilite);
    },

    _serialize: function(options, dictionary) {
      var values = [ this._gradient, this._origin, this._destination ];
      if (this._hilite)
        values.push(this._hilite);
      return Base.serialize(values, options, true, dictionary);
    },

    getGradient: function() {
      return this._gradient;
    },

    setGradient: function(gradient) {
      this._gradient = gradient;
      gradient._addOwner(this);
      this._changed();
    },

    getOrigin: function() {
      return this._origin;
    },

    setOrigin: function(origin) {
      origin = Point.read(arguments, 0, 0, true); 
      this._origin = origin;
      if (this._destination)
        this._radius = this._destination.getDistance(this._origin);
      this._changed();
    },

    getDestination: function() {
      return this._destination;
    },

    setDestination: function(destination) {
      destination = Point.read(arguments, 0, 0, true); 
      this._destination = destination;
      this._radius = this._destination.getDistance(this._origin);
      this._changed();
    },

    getHilite: function() {
      return this._hilite;
    },

    setHilite: function(hilite) {
      hilite = Point.read(arguments, 0, 0, true); 
      var vector = hilite.subtract(this._origin);
      if (vector.getLength() > this._radius) {
        this._hilite = this._origin.add(
            vector.normalize(this._radius - 0.1));
      } else {
        this._hilite = hilite;
      }
      this._changed();
    },

    toCanvasStyle: function(ctx) {
      var gradient,
        stops = this._gradient._stops;
      if (this._gradient._type === 'LinearGradient') {
        gradient = ctx.createLinearGradient(this._origin.x, this._origin.y,
            this._destination.x, this._destination.y);
      } else {
        var origin = this._hilite || this._origin;
        gradient = ctx.createRadialGradient(origin.x, origin.y,
            0, this._origin.x, this._origin.y, this._radius);
      }
      for (var i = 0, l = stops.length; i < l; i++) {
        var stop = stops[i];
        gradient.addColorStop(stop._rampPoint, stop._color.toCss());
      }
      return gradient;
    },

    equals: function(color) {
      return color === this || color && color._type === this._type
          && this._gradient.equals(color._gradient)
          && this._origin.equals(color._origin)
          && this._destination.equals(color._destination);
    },

    transform: function(matrix) {
      matrix._transformPoint(this._origin, this._origin, true);
      matrix._transformPoint(this._destination, this._destination, true);
      if (this._hilite)
        matrix._transformPoint(this._hilite, this._hilite, true);
      this._radius = this._destination.getDistance(this._origin);
    }
  });

  var Gradient = this.Gradient = Base.extend({

    initialize: function(stops, _type) {
      if (this.constructor === Gradient)
        return new (_type === 'radial' ? RadialGradient : LinearGradient)(
            stops);
      this._id = ++Base._uid;
      this.setStops((arguments.length > 1 ? arguments : stops)
          || ['white', 'black']);
    },

    _serialize: function(options, dictionary) {
      return dictionary.add(this, function() {
        return Base.serialize([this._type, this._stops],
            options, true, dictionary);
      });
    },

    _changed: function() {
      for (var i = 0, l = this._owners && this._owners.length; i < l; i++)
        this._owners[i]._changed();
    },

    _addOwner: function(color) {
      if (!this._owners)
        this._owners = [];
      this._owners.push(color);
    },

    _removeOwner: function(color) {
      var index = this._owners ? this._owners.indexOf(color) : -1;
      if (index != -1) {
        this._owners.splice(index, 1);
        if (this._owners.length == 0)
          delete this._owners;
      }
    },

    clone: function() {
      var stops = [];
      for (var i = 0, l = this._stops.length; i < l; i++)
        stops[i] = this._stops[i].clone();
      return new this.constructor(stops);
    },

    getStops: function() {
      return this._stops;
    },

    setStops: function(stops) {
      if (this.stops) {
        for (var i = 0, l = this._stops.length; i < l; i++)
          delete this._stops[i]._owner;
      }
      if (stops.length < 2)
        throw new Error(
            'Gradient stop list needs to contain at least two stops.');
      this._stops = GradientStop.readAll(stops, 0, true); 
      for (var i = 0, l = this._stops.length; i < l; i++) {
        var stop = this._stops[i];
        stop._owner = this;
        if (stop._defaultRamp)
          stop.setRampPoint(i / (l - 1));
      }
      this._changed();
    },

    equals: function(gradient) {
      if (gradient && gradient.constructor == this.constructor
          && this._stops.length == gradient._stops.length) {
        for (var i = 0, l = this._stops.length; i < l; i++) {
          if (!this._stops[i].equals(gradient._stops[i]))
            return false;
        }
        return true;
      }
      return false;
    }
  });

  var LinearGradient = this.LinearGradient = Gradient.extend({
    _type: 'LinearGradient'

  });

  var RadialGradient = this.RadialGradient = Gradient.extend({
    _type: 'RadialGradient'

  });

  var GradientStop = this.GradientStop = Base.extend({
    initialize: function(arg0, arg1) {
      if (arg0) {
        var color, rampPoint;
        if (arg1 === undefined && Array.isArray(arg0)) {
          color = arg0[0];
          rampPoint = arg0[1];
        } else if (arg0.color) {
          color = arg0.color;
          rampPoint = arg0.rampPoint;
        } else {
          color = arg0;
          rampPoint = arg1;
        }
        this.setColor(color);
        this.setRampPoint(rampPoint);
      }
    },

    clone: function() {
      return new GradientStop(this._color.clone(), this._rampPoint);
    },

    _serialize: function(options, dictionary) {
      return Base.serialize([this._color, this._rampPoint], options, false, 
          dictionary);
    },

    _changed: function() {
      if (this._owner)
        this._owner._changed(17);
    },

    getRampPoint: function() {
      return this._rampPoint;
    },

    setRampPoint: function(rampPoint) {
      this._defaultRamp = rampPoint == null;
      this._rampPoint = rampPoint || 0;
      this._changed();
    },

    getColor: function() {
      return this._color;
    },

    setColor: function(color) {
      this._color = Color.read(arguments);
      if (this._color === color)
        this._color = color.clone();
      this._color._owner = this;
      this._changed();
    },

    equals: function(stop) {
      return stop == this || stop instanceof GradientStop
          && this._color.equals(stop._color)
          && this._rampPoint == stop._rampPoint;
    }
  });

  var DomElement = new function() {

    var special = /^(checked|value|selected|disabled)$/i,
      translated = { text: 'textContent', html: 'innerHTML' },
      unitless = { lineHeight: 1, zoom: 1, zIndex: 1, opacity: 1 };

    function create(nodes, parent) {
      var res = [];
      for (var i =  0, l = nodes && nodes.length; i < l;) {
        var el = nodes[i++];
        if (typeof el === 'string') {
          el = document.createElement(el);
        } else if (!el || !el.nodeType) {
          continue;
        }
        if (Base.isPlainObject(nodes[i]))
          DomElement.set(el, nodes[i++]);
        if (Array.isArray(nodes[i]))
          create(nodes[i++], el);
        if (parent)
          parent.appendChild(el);
        res.push(el);
      }
      return res;
    }

    return {
      create: function(nodes, parent) {
        var isArray = Array.isArray(nodes),
          res = create(isArray ? nodes : arguments, isArray ? parent : null);
        return res.length == 1 ? res[0] : res;
      },

      find: function(selector, root) {
        return (root || document).querySelector(selector);
      },

      findAll: function(selector, root) {
        return (root || document).querySelectorAll(selector);
      },

      get: function(el, key) {
        return el
          ? special.test(key)
            ? key === 'value' || typeof el[key] !== 'string'
              ? el[key]
              : true
            : key in translated
              ? el[translated[key]]
              : el.getAttribute(key)
          : null;
      },

      set: function(el, key, value) {
        if (typeof key !== 'string') {
          for (var name in key)
            if (key.hasOwnProperty(name))
              this.set(el, name, key[name]);
        } else if (!el || value === undefined) {
          return el;
        } else if (special.test(key)) {
          el[key] = value;
        } else if (key in translated) {
          el[translated[key]] = value;
        } else if (key === 'style') {
          this.setStyle(el, value);
        } else if (key === 'events') {
          DomEvent.add(el, value);
        } else {
          el.setAttribute(key, value);
        }
        return el;
      },

      getStyles: function(el) {
        var view = el && el.ownerDocument.defaultView;
        return view && view.getComputedStyle(el, '');
      },

      getStyle: function(el, key) {
        return el && el.style[key] || this.getStyles(el)[key] || null;
      },

      setStyle: function(el, key, value) {
        if (typeof key !== 'string') {
          for (var name in key)
            if (key.hasOwnProperty(name))
              this.setStyle(el, name, key[name]);
        } else {
          if (/^-?[\d\.]+$/.test(value) && !(key in unitless))
            value += 'px';
          el.style[key] = value;
        }
        return el;
      },

      hasClass: function(el, cls) {
        return new RegExp('\\s*' + cls + '\\s*').test(el.className);
      },

      addClass: function(el, cls) {
        el.className = (el.className + ' ' + cls).trim();
      },

      removeClass: function(el, cls) {
        el.className = el.className.replace(
          new RegExp('\\s*' + cls + '\\s*'), ' ').trim();
      },

      remove: function(el) {
        if (el.parentNode)
          el.parentNode.removeChild(el);
      },

      removeChildren: function(el) {
        while (el.firstChild)
          el.removeChild(el.firstChild);
      },

      getBounds: function(el, viewport) {
        var rect = el.getBoundingClientRect(),
          doc = el.ownerDocument,
          body = doc.body,
          html = doc.documentElement,
          x = rect.left - (html.clientLeft || body.clientLeft || 0),
          y = rect.top - (html.clientTop  || body.clientTop  || 0);
        if (!viewport) {
          var view = doc.defaultView;
          x += view.pageXOffset || html.scrollLeft || body.scrollLeft;
          y += view.pageYOffset || html.scrollTop || body.scrollTop;
        }
        return new Rectangle(x, y, rect.width, rect.height);
      },

      getViewportBounds: function(el) {
        var doc = el.ownerDocument,
          view = doc.defaultView,
          html = doc.documentElement;
        return Rectangle.create(0, 0, 
          view.innerWidth || html.clientWidth,
          view.innerHeight || html.clientHeight
        );
      },

      getOffset: function(el, viewport) {
        return this.getBounds(el, viewport).getPoint();
      },

      getSize: function(el) {
        return this.getBounds(el, true).getSize();
      },

      isInvisible: function(el) {
        return this.getSize(el).equals([0, 0]);
      },

      isInView: function(el) {
        return !this.isInvisible(el) && this.getViewportBounds(el).intersects(
            this.getBounds(el, true));
      }
    };
  };

  var DomEvent = {
    add: function(el, events) {
      for (var type in events) {
        var func = events[type];
        if (el.addEventListener) {
          el.addEventListener(type, func, false);
        } else if (el.attachEvent) {
          el.attachEvent('on' + type, func.bound = function() {
            func.call(el, window.event);
          });
        }
      }
    },

    remove: function(el, events) {
      for (var type in events) {
        var func = events[type];
        if (el.removeEventListener) {
          el.removeEventListener(type, func, false);
        } else if (el.detachEvent) {
          el.detachEvent('on' + type, func.bound);
        }
      }
    },

    getPoint: function(event) {
      var pos = event.targetTouches ? (event.targetTouches.length ? event.targetTouches[0] : event.changedTouches[0]) : event;
      return Point.create(
        pos.pageX || pos.clientX + document.documentElement.scrollLeft,
        pos.pageY || pos.clientY + document.documentElement.scrollTop
      );
    },

    getTarget: function(event) {
      return event.target || event.srcElement;
    },

    getOffset: function(event, target) {
      return DomEvent.getPoint(event).subtract(DomElement.getOffset(
          target || DomEvent.getTarget(event)));
    },

    preventDefault: function(event) {
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    },

    stopPropagation: function(event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    },

    stop: function(event) {
      DomEvent.stopPropagation(event);
      DomEvent.preventDefault(event);
    }
  };

  DomEvent.requestAnimationFrame = new function() {
    var part = 'equestAnimationFrame',
      request = window['r' + part] || window['webkitR' + part]
        || window['mozR' + part] || window['oR' + part]
        || window['msR' + part];
    if (request) {
      request(function(time) {
        if (time == null)
          request = null;
      });
    }

    var callbacks = [],
      focused = true,
      timer;

    DomEvent.add(window, {
      focus: function() {
        focused = true;
      },
      blur: function() {
        focused = false;
      }
    });

    return function(callback, element) {
      if (request)
        return request(callback, element);
      callbacks.push([callback, element]);
      if (timer)
        return;
      timer = setInterval(function() {
        for (var i = callbacks.length - 1; i >= 0; i--) {
          var entry = callbacks[i],
            func = entry[0],
            el = entry[1];
          if (!el || (PaperScript.getAttribute(el, 'keepalive') == 'true'
              || focused) && DomElement.isInView(el)) {
            callbacks.splice(i, 1);
            func(Date.now());
          }
        }
      }, 1000 / 60);
    };
  };

  var View = this.View = Base.extend(Callback, {
    initialize: function(element) {
      this._scope = paper;
      this._project = paper.project;
      this._element = element;
      var size;
      this._id = element.getAttribute('id');
      if (this._id == null)
        element.setAttribute('id', this._id = 'view-' + View._id++);
      DomEvent.add(element, this._viewHandlers);
      if (PaperScript.hasAttribute(element, 'resize')) {
        var offset = DomElement.getOffset(element, true),
          that = this;
        size = DomElement.getViewportBounds(element)
            .getSize().subtract(offset);
        this._windowHandlers = {
          resize: function(event) {
            if (!DomElement.isInvisible(element))
              offset = DomElement.getOffset(element, true);
            that.setViewSize(DomElement.getViewportBounds(element)
                .getSize().subtract(offset));
          }
        };
        DomEvent.add(window, this._windowHandlers);
      } else {
        size = Size.create(parseInt(element.getAttribute('width'), 10),
              parseInt(element.getAttribute('height'), 10));
        if (size.isNaN())
          size = DomElement.getSize(element);
      }
      element.width = size.width;
      element.height = size.height;
      if (PaperScript.hasAttribute(element, 'stats')) {
        this._stats = new Stats();
        var stats = this._stats.domElement,
          style = stats.style,
          offset = DomElement.getOffset(element);
        style.position = 'absolute';
        style.left = offset.x + 'px';
        style.top = offset.y + 'px';
        document.body.appendChild(stats);
      }
      View._views.push(this);
      View._viewsById[this._id] = this;
      this._viewSize = LinkedSize.create(this, 'setViewSize',
          size.width, size.height);
      this._matrix = new Matrix();
      this._zoom = 1;
      if (!View._focused)
        View._focused = this;
      this._frameItems = {};
      this._frameItemCount = 0;
    },

    remove: function() {
      if (!this._project)
        return false;
      if (View._focused == this)
        View._focused = null;
      View._views.splice(View._views.indexOf(this), 1);
      delete View._viewsById[this._id];
      if (this._project.view == this)
        this._project.view = null;
      DomEvent.remove(this._element, this._viewHandlers);
      DomEvent.remove(window, this._windowHandlers);
      this._element = this._project = null;
      this.detach('frame');
      this._frameItems = {};
      return true;
    },

    _events: {
      onFrame: {
        install: function() {
          if (!this._requested) {
            this._animate = true;
            this._handleFrame(true);
          }
        },

        uninstall: function() {
          this._animate = false;
        }
      },

      onResize: {}
    },

    _animate: false,
    _time: 0,
    _count: 0,

    _handleFrame: function(request) {
      this._requested = false;
      if (!this._animate)
        return;
      paper = this._scope;
      if (request) {
        this._requested = true;
        var that = this;
        DomEvent.requestAnimationFrame(function() {
          that._handleFrame(true);
        }, this._element);
      }
      var now = Date.now() / 1000,
        delta = this._before ? now - this._before : 0;
      this._before = now;
      this.fire('frame', Base.merge({
        delta: delta,
        time: this._time += delta,
        count: this._count++
      }));
      if (this._stats)
        this._stats.update();
      this.draw(true);
    },

    _animateItem: function(item, animate) {
      var items = this._frameItems;
      if (animate) {
        items[item._id] = {
          item: item,
          time: 0,
          count: 0
        };
        if (++this._frameItemCount == 1)
          this.attach('frame', this._handleFrameItems);
      } else {
        delete items[item._id];
        if (--this._frameItemCount == 0) {
          this.detach('frame', this._handleFrameItems);
        }
      }
    },

    _handleFrameItems: function(event) {
      for (var i in this._frameItems) {
        var entry = this._frameItems[i];
        entry.item.fire('frame', Base.merge(event, {
          time: entry.time += event.delta,
          count: entry.count++
        }));
      }
    },

    _redraw: function() {
      this._redrawNeeded = true;
      if (this._animate) {
        this._handleFrame();
      } else {
        this.draw();
      }
    },

    _transform: function(matrix) {
      this._matrix.concatenate(matrix);
      this._bounds = null;
      this._inverse = null;
      this._redraw();
    },

    getElement: function() {
      return this._element;
    },

    getViewSize: function() {
      return this._viewSize;
    },

    setViewSize: function(size) {
      size = Size.read(arguments);
      var delta = size.subtract(this._viewSize);
      if (delta.isZero())
        return;
      this._element.width = size.width;
      this._element.height = size.height;
      this._viewSize.set(size.width, size.height, true);
      this._bounds = null; 
      this.fire('resize', {
        size: size,
        delta: delta
      });
      this._redraw();
    },

    getBounds: function() {
      if (!this._bounds)
        this._bounds = this._getInverse()._transformBounds(
            new Rectangle(new Point(), this._viewSize));
      return this._bounds;
    },

    getSize: function() {
      return this.getBounds().getSize();
    },

    getCenter: function() {
      return this.getBounds().getCenter();
    },

    setCenter: function(center) {
      this.scrollBy(Point.read(arguments).subtract(this.getCenter()));
    },

    getZoom: function() {
      return this._zoom;
    },

    setZoom: function(zoom) {
      this._transform(new Matrix().scale(zoom / this._zoom,
        this.getCenter()));
      this._zoom = zoom;
    },

    isVisible: function() {
      return DomElement.isInView(this._element);
    },

    scrollBy: function(point) {
      this._transform(new Matrix().translate(Point.read(arguments).negate()));
    },

    projectToView: function(point) {
      return this._matrix._transformPoint(Point.read(arguments));
    },

    viewToProject: function(point) {
      return this._getInverse()._transformPoint(Point.read(arguments));
    },

    _getInverse: function() {
      if (!this._inverse)
        this._inverse = this._matrix.inverted();
      return this._inverse;
    }

  }, {
    statics: {
      _views: [],
      _viewsById: {},
      _id: 0,

      create: function(element) {
        if (typeof element === 'string')
          element = document.getElementById(element);
        return new CanvasView(element);
      }
    }
  }, new function() {
    var tool,
      prevFocus,
      tempFocus,
      dragging = false;

    function getView(event) {
      var target = DomEvent.getTarget(event);
      return target.getAttribute && View._viewsById[target.getAttribute('id')];
    }

    function viewToProject(view, event) {
      return view.viewToProject(DomEvent.getOffset(event, view._element));
    }

    function updateFocus() {
      if (!View._focused || !View._focused.isVisible()) {
        for (var i = 0, l = View._views.length; i < l; i++) {
          var view = View._views[i];
          if (view && view.isVisible()) {
            View._focused = tempFocus = view;
            break;
          }
        }
      }
    }

    function mousedown(event) {
      if(event.type.toString().substr(0,5) === "mouse" && (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0))) {
        return;
      }
      var view = View._focused = getView(event),
        point = viewToProject(view, event);
      dragging = true;
      if (view._onMouseDown)
        view._onMouseDown(event, point);
      if (tool = view._scope._tool)
        tool._onHandleEvent('mousedown', point, event);
      view.draw(true);
    }

    function mousemove(event) {
      if(event.type.toString().substr(0,5) === "mouse" && (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0))) {
        return;
      }
      var view;
      if (!dragging) {
        view = getView(event);
        if (view) {
          prevFocus = View._focused;
          View._focused = tempFocus = view;
        } else if (tempFocus && tempFocus == View._focused) {
          View._focused = prevFocus;
          updateFocus();
        }
      }
      if (!(view = view || View._focused))
        return;
      var point = event && viewToProject(view, event);
      if (view._onMouseMove)
        view._onMouseMove(event, point);
      if (tool = view._scope._tool) {
        if (tool._onHandleEvent(dragging && tool.responds('mousedrag')
            ? 'mousedrag' : 'mousemove', point, event))
          DomEvent.stop(event);
      }
      view.draw(true);
    }

    function mouseup(event) {
      if(event.type.toString().substr(0,5) === "mouse" && (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0))) {
        return;
      }
      var view = View._focused;
      if (!view || !dragging)
        return;
      var point = viewToProject(view, event);
      curPoint = null;
      dragging = false;
      if (view._onMouseUp)
        view._onMouseUp(event, point);
      if (tool && tool._onHandleEvent('mouseup', point, event))
        DomEvent.stop(event);
      view.draw(true);
    }

    function selectstart(event) {
      if (dragging)
        DomEvent.stop(event);
    }

    DomEvent.add(document, {
      mousemove: mousemove,
      mouseup: mouseup,
      touchmove: mousemove,
      touchend: mouseup,
      selectstart: selectstart,
      scroll: updateFocus
    });

    DomEvent.add(window, {
      load: updateFocus
    });

    return {
      _viewHandlers: {
        mousedown: mousedown,
        touchstart: mousedown,
        selectstart: selectstart
      },

      statics: {
        updateFocus: updateFocus
      }
    };
  });

  var CanvasView = View.extend({
    initialize: function(canvas) {
      if (!(canvas instanceof HTMLCanvasElement)) {
        var size = Size.read(arguments, 1);
        if (size.isZero())
          size = Size.create(1024, 768);
        canvas = CanvasProvider.getCanvas(size);
      }
      this._context = canvas.getContext('2d');
      this._eventCounters = {};
      this.base(canvas);
    },

    draw: function(checkRedraw) {
      if (checkRedraw && !this._redrawNeeded)
        return false;
      var ctx = this._context,
        size = this._viewSize;
      ctx.clearRect(0, 0, size._width + 1, size._height + 1);
      this._project.draw(ctx, this._matrix);
      this._redrawNeeded = false;
      return true;
    }
  }, new function() { 

    var downPoint,
      lastPoint,
      overPoint,
      downItem,
      lastItem,
      overItem,
      hasDrag,
      doubleClick,
      clickTime;

    function callEvent(type, event, point, target, lastPoint, bubble) {
      var item = target,
        mouseEvent;
      while (item) {
        if (item.responds(type)) {
          if (!mouseEvent)
            mouseEvent = new MouseEvent(type, event, point, target,
                lastPoint ? point.subtract(lastPoint) : null);
          if (item.fire(type, mouseEvent)
              && (!bubble || mouseEvent._stopped))
            return false;
        }
        item = item.getParent();
      }
      return true;
    }

    function handleEvent(view, type, event, point, lastPoint) {
      if (view._eventCounters[type]) {
        var project = view._project,
          hit = project.hitTest(point, {
            tolerance: project.options.hitTolerance || 0,
            fill: true,
            stroke: true
          }),
          item = hit && hit.item;
        if (item) {
          if (type === 'mousemove' && item != overItem)
            lastPoint = point;
          if (type !== 'mousemove' || !hasDrag)
            callEvent(type, event, point, item, lastPoint);
          return item;
        }
      }
    }

    return {
      _onMouseDown: function(event, point) {
        var item = handleEvent(this, 'mousedown', event, point);
        doubleClick = lastItem == item && (Date.now() - clickTime < 300);
        downItem = lastItem = item;
        downPoint = lastPoint = overPoint = point;
        hasDrag = downItem && downItem.responds('mousedrag');
      },

      _onMouseUp: function(event, point) {
        var item = handleEvent(this, 'mouseup', event, point);
        if (hasDrag) {
          if (lastPoint && !lastPoint.equals(point))
            callEvent('mousedrag', event, point, downItem, lastPoint);
          if (item != downItem) {
            overPoint = point;
            callEvent('mousemove', event, point, item, overPoint);
          }
        }
        if (item === downItem) {
          clickTime = Date.now();
          if (!doubleClick
              || callEvent('doubleclick', event, downPoint, item))
            callEvent('click', event, downPoint, item);
          doubleClick = false;
        }
        downItem = null;
        hasDrag = false;
      },

      _onMouseMove: function(event, point) {
        if (downItem)
          callEvent('mousedrag', event, point, downItem, lastPoint);
        var item = handleEvent(this, 'mousemove', event, point, overPoint);
        lastPoint = overPoint = point;
        if (item !== overItem) {
          callEvent('mouseleave', event, point, overItem);
          overItem = item;
          callEvent('mouseenter', event, point, item);
        }
      }
    };
  });

  var Event = this.Event = Base.extend({
    initialize: function(event) {
      this.event = event;
    },

    preventDefault: function() {
      this._prevented = true;
      DomEvent.preventDefault(this.event);
    },

    stopPropagation: function() {
      this._stopped = true;
      DomEvent.stopPropagation(this.event);
    },

    stop: function() {
      this.stopPropagation();
      this.preventDefault();
    },

    getModifiers: function() {
      return Key.modifiers;
    }
  });

  var KeyEvent = this.KeyEvent = Event.extend({
    initialize: function(down, key, character, event) {
      this.base(event);
      this.type = down ? 'keydown' : 'keyup';
      this.key = key;
      this.character = character;
    },

    toString: function() {
      return "{ type: '" + this.type
          + "', key: '" + this.key
          + "', character: '" + this.character
          + "', modifiers: " + this.getModifiers()
          + " }";
    }
  });

  var Key = this.Key = new function() {

    var keys = {
      8: 'backspace',
      9: 'tab',
      13: 'enter',
      16: 'shift',
      17: 'control',
      18: 'option',
      19: 'pause',
      20: 'caps-lock',
      27: 'escape',
      32: 'space',
      35: 'end',
      36: 'home',
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
      46: 'delete',
      91: 'command',
      93: 'command', 
      224: 'command'  
    },

    modifiers = Base.merge({
      shift: false,
      control: false,
      option: false,
      command: false,
      capsLock: false,
      space: false
    }),

    charCodeMap = {}, 
    keyMap = {}, 
    downCode; 

    function handleKey(down, keyCode, charCode, event) {
      var character = String.fromCharCode(charCode),
        key = keys[keyCode] || character.toLowerCase(),
        type = down ? 'keydown' : 'keyup',
        view = View._focused,
        scope = view && view.isVisible() && view._scope,
        tool = scope && scope._tool;
      keyMap[key] = down;
      if (tool && tool.responds(type)) {
        tool.fire(type, new KeyEvent(down, key, character, event));
        if (view)
          view.draw(true);
      }
    }

    DomEvent.add(document, {
      keydown: function(event) {
        var code = event.which || event.keyCode;
        var key = keys[code], name;
        if (key) {
          if ((name = Base.camelize(key)) in modifiers)
            modifiers[name] = true;
          charCodeMap[code] = 0;
          handleKey(true, code, null, event);
        } else {
          downCode = code;
        }
      },

      keypress: function(event) {
        if (downCode != null) {
          var code = event.which || event.keyCode;
          charCodeMap[downCode] = code;
          handleKey(true, downCode, code, event);
          downCode = null;
        }
      },

      keyup: function(event) {
        var code = event.which || event.keyCode,
          key = keys[code], name;
        if (key && (name = Base.camelize(key)) in modifiers)
          modifiers[name] = false;
        if (charCodeMap[code] != null) {
          handleKey(false, code, charCodeMap[code], event);
          delete charCodeMap[code];
        }
      }
    });

    return {
      modifiers: modifiers,

      isDown: function(key) {
        return !!keyMap[key];
      }
    };
  };

  var MouseEvent = this.MouseEvent = Event.extend({
    initialize: function(type, event, point, target, delta) {
      this.base(event);
      this.type = type;
      this.point = point;
      this.target = target;
      this.delta = delta;
    },

    toString: function() {
      return "{ type: '" + this.type
          + "', point: " + this.point
          + ', target: ' + this.target
          + (this.delta ? ', delta: ' + this.delta : '')
          + ', modifiers: ' + this.getModifiers()
          + ' }';
    }
  });

  var Palette = this.Palette = Base.extend(Callback, {
    _events: [ 'onChange' ],

    initialize: function(title, components, values) {
      var parent = DomElement.find('.palettejs-panel')
        || DomElement.find('body').appendChild(
          DomElement.create('div', { 'class': 'palettejs-panel' }));
      this._element = parent.appendChild(
        DomElement.create('table', { 'class': 'palettejs-pane' })),
      this._title = title;
      if (!values)
        values = {};
      for (var name in (this._components = components)) {
        var component = components[name];
        if (!(component instanceof Component)) {
          if (component.value == null)
            component.value = values[name];
          component.name = name;
          component = components[name] = new Component(component);
        }
        this._element.appendChild(component._element);
        component._palette = this;
        if (values[name] === undefined)
          values[name] = component.value;
      }
      this._values = Base.each(values, function(value, name) {
        var component = components[name];
        if (component) {
          Base.define(values, name, {
            enumerable: true,
            configurable: true,
            writable: true,
            get: function() {
              return component._value;
            },
            set: function(val) {
              component.setValue(val);
            }
          });
        }
      });
      if (window.paper)
        paper.palettes.push(this);
    },

    reset: function() {
      for (var i in this._components)
        this._components[i].reset();
    },

    remove: function() {
      DomElement.remove(this._element);
    }
  });

  var Component = this.Component = Base.extend(Callback, {
    _events: [ 'onChange', 'onClick' ],

    _types: {
      'boolean': {
        type: 'checkbox',
        value: 'checked'
      },

      string: {
        type: 'text'
      },

      number: {
        type: 'number',
        number: true
      },

      button: {
        type: 'button'
      },

      text: {
        tag: 'div',
        value: 'text'
      },

      slider: {
        type: 'range',
        number: true
      },

      list: {
        tag: 'select',

        options: function() {
          DomElement.removeChildren(this._inputItem);
          DomElement.create(Base.each(this._options, function(option) {
            this.push('option', { value: option, text: option });
          }, []), this._inputItem);
        }
      }
    },

    initialize: function(obj) {
      this._type = obj.type in this._types
        ? obj.type
        : 'options' in obj
          ? 'list'
          : 'onClick' in obj
            ? 'button'
            : typeof obj.value;
      this._info = this._types[this._type] || { type: this._type };
      var that = this,
        fireChange = false;
      this._inputItem = DomElement.create(this._info.tag || 'input', {
        type: this._info.type,
        events: {
          change: function() {
            that.setValue(
              DomElement.get(this, that._info.value || 'value'));
            if (fireChange) {
              that._palette.fire('change', that, that.name, that._value);
              that.fire('change', that._value);
            }
          },
          click: function() {
            that.fire('click');
          }
        }
      });
      this._element = DomElement.create('tr', [
        this._labelItem = DomElement.create('td'),
        'td', [this._inputItem]
      ]);
      Base.each(obj, function(value, key) {
        this[key] = value;
      }, this);
      this._defaultValue = this._value;
      fireChange = true;
    },

    getType: function() {
      return this._type;
    },

    getLabel: function() {
      return this._label;
    },

    setLabel: function(label) {
      this._label = label;
      DomElement.set(this._labelItem, 'text', label + ':');
    },

    getOptions: function() {
      return this._options;
    },

    setOptions: function(options) {
      this._options = options;
      if (this._info.options)
        this._info.options.call(this);
    },

    getValue: function() {
      return this._value;
    },

    setValue: function(value) {
      var key = this._info.value || 'value';
      DomElement.set(this._inputItem, key, value);
      value = DomElement.get(this._inputItem, key);
      this._value = this._info.number ? parseFloat(value, 10) : value;
    },

    getRange: function() {
      return [parseFloat(DomElement.get(this._inputItem, 'min')),
          parseFloat(DomElement.get(this._inputItem, 'max'))];
    },

    setRange: function(min, max) {
      var range = Array.isArray(min) ? min : [min, max];
      DomElement.set(this._inputItem, { min: range[0], max: range[1] });
    },

    getMin: function() {
      return this.getRange()[0];
    },

    setMin: function(min) {
      this.setRange(min, this.getMax());
    },

    getMax: function() {
      return this.getRange()[1];
    },

    setMax: function(max) {
      this.setRange(this.getMin(), max);
    },

    getStep: function() {
      return parseFloat(DomElement.get(this._inputItem, 'step'));
    },

    setStep: function(step) {
      DomElement.set(this._inputItem, 'step', step);
    },

    reset: function() {
      this.setValue(this._defaultValue);
    }
  });

  var ToolEvent = this.ToolEvent = Event.extend({
    _item: null,

    initialize: function(tool, type, event) {
      this.tool = tool;
      this.type = type;
      this.event = event;
    },

    _choosePoint: function(point, toolPoint) {
      return point ? point : toolPoint ? toolPoint.clone() : null;
    },

    getPoint: function() {
      return this._choosePoint(this._point, this.tool._point);
    },

    setPoint: function(point) {
      this._point = point;
    },

    getLastPoint: function() {
      return this._choosePoint(this._lastPoint, this.tool._lastPoint);
    },

    setLastPoint: function(lastPoint) {
      this._lastPoint = lastPoint;
    },

    getDownPoint: function() {
      return this._choosePoint(this._downPoint, this.tool._downPoint);
    },

    setDownPoint: function(downPoint) {
      this._downPoint = downPoint;
    },

    getMiddlePoint: function() {
      if (!this._middlePoint && this.tool._lastPoint) {
        return this.tool._point.add(this.tool._lastPoint).divide(2);
      }
      return this.middlePoint;
    },

    setMiddlePoint: function(middlePoint) {
      this._middlePoint = middlePoint;
    },

    getDelta: function() {
      return !this._delta && this.tool._lastPoint
          ? this.tool._point.subtract(this.tool._lastPoint)
          : this._delta;
    },

    setDelta: function(delta) {
      this._delta = delta;
    },

    getCount: function() {
      return /^mouse(down|up)$/.test(this.type)
          ? this.tool._downCount
          : this.tool._count;
    },

    setCount: function(count) {
      this.tool[/^mouse(down|up)$/.test(this.type) ? 'downCount' : 'count']
        = count;
    },

    getItem: function() {
      if (!this._item) {
        var result = this.tool._scope.project.hitTest(this.getPoint());
        if (result) {
          var item = result.item,
            parent = item._parent;
          while ((parent instanceof Group && !(parent instanceof Layer))
              || parent instanceof CompoundPath) {
            item = parent;
            parent = parent._parent;
          }
          this._item = item;
        }
      }
      return this._item;
    },
    setItem: function(item) {
      this._item = item;
    },

    toString: function() {
      return '{ type: ' + this.type
          + ', point: ' + this.getPoint()
          + ', count: ' + this.getCount()
          + ', modifiers: ' + this.getModifiers()
          + ' }';
    }
  });

  var Tool = this.Tool = PaperScopeItem.extend({
    _list: 'tools',
    _reference: '_tool', 
    _events: [ 'onActivate', 'onDeactivate', 'onEditOptions',
        'onMouseDown', 'onMouseUp', 'onMouseDrag', 'onMouseMove',
        'onKeyDown', 'onKeyUp' ],

    initialize: function(props) {
      this.base();
      this._firstMove = true;
      this._count = 0;
      this._downCount = 0;
      this._set(props);
    },

    getMinDistance: function() {
      return this._minDistance;
    },

    setMinDistance: function(minDistance) {
      this._minDistance = minDistance;
      if (this._minDistance != null && this._maxDistance != null
          && this._minDistance > this._maxDistance) {
        this._maxDistance = this._minDistance;
      }
    },

    getMaxDistance: function() {
      return this._maxDistance;
    },

    setMaxDistance: function(maxDistance) {
      this._maxDistance = maxDistance;
      if (this._minDistance != null && this._maxDistance != null
          && this._maxDistance < this._minDistance) {
        this._minDistance = maxDistance;
      }
    },

    getFixedDistance: function() {
      return this._minDistance == this._maxDistance
        ? this._minDistance : null;
    },

    setFixedDistance: function(distance) {
      this._minDistance = distance;
      this._maxDistance = distance;
    },

    _updateEvent: function(type, point, minDistance, maxDistance, start,
        needsChange, matchMaxDistance) {
      if (!start) {
        if (minDistance != null || maxDistance != null) {
          var minDist = minDistance != null ? minDistance : 0,
            vector = point.subtract(this._point),
            distance = vector.getLength();
          if (distance < minDist)
            return false;
          var maxDist = maxDistance != null ? maxDistance : 0;
          if (maxDist != 0) {
            if (distance > maxDist) {
              point = this._point.add(vector.normalize(maxDist));
            } else if (matchMaxDistance) {
              return false;
            }
          }
        }
        if (needsChange && point.equals(this._point))
          return false;
      }
      this._lastPoint = start && type == 'mousemove' ? point : this._point;
      this._point = point;
      switch (type) {
      case 'mousedown':
        this._lastPoint = this._downPoint;
        this._downPoint = this._point;
        this._downCount++;
        break;
      case 'mouseup':
        this._lastPoint = this._downPoint;
        break;
      }
      this._count = start ? 0 : this._count + 1;
      return true;
    },

    fire: function(type, event) {
      var sets = Tool._removeSets;
      if (sets) {
        if (type === 'mouseup')
          sets.mousedrag = null;
        var set = sets[type];
        if (set) {
          for (var id in set) {
            var item = set[id];
            for (var key in sets) {
              var other = sets[key];
              if (other && other != set)
                delete other[item._id];
            }
            item.remove();
          }
          sets[type] = null;
        }
      }
      return this.base(type, event);
    },

    _onHandleEvent: function(type, point, event) {
      paper = this._scope;
      var called = false;
      switch (type) {
      case 'mousedown':
        this._updateEvent(type, point, null, null, true, false, false);
        if (this.responds(type))
          called = this.fire(type, new ToolEvent(this, type, event));
        break;
      case 'mousedrag':
        var needsChange = false,
          matchMaxDistance = false;
        while (this._updateEvent(type, point, this.minDistance,
            this.maxDistance, false, needsChange, matchMaxDistance)) {
          if (this.responds(type))
            called = this.fire(type, new ToolEvent(this, type, event));
          needsChange = true;
          matchMaxDistance = true;
        }
        break;
      case 'mouseup':
        if (!point.equals(this._point)
            && this._updateEvent('mousedrag', point, this.minDistance,
                this.maxDistance, false, false, false)) {
          if (this.responds('mousedrag'))
            called = this.fire('mousedrag',
                new ToolEvent(this, type, event));
        }
        this._updateEvent(type, point, null, this.maxDistance, false,
            false, false);
        if (this.responds(type))
          called = this.fire(type, new ToolEvent(this, type, event));
        this._updateEvent(type, point, null, null, true, false, false);
        this._firstMove = true;
        break;
      case 'mousemove':
        while (this._updateEvent(type, point, this.minDistance,
            this.maxDistance, this._firstMove, true, false)) {
          if (this.responds(type))
            called = this.fire(type, new ToolEvent(this, type, event));
          this._firstMove = false;
        }
        break;
      }
      return called;
    }

  });

  var Format = new function() {
    var precisions = {};

    function number(val, prec) {
      prec = prec
          ? precisions[prec] || (precisions[prec] = Math.pow(10, prec))
          : 100000; 
      return Math.round(val * prec) / prec;
    }

    function point(val, prec, separator) {
      return number(val.x, prec) + (separator || ',') + number(val.y, prec);
    }

    function size(val, prec, separator) {
      return number(val.width, prec) + (separator || ',')
          + number(val.height, prec);
    }

    function rectangle(val, prec, separator) {
      return point(val, prec, separator) + (separator || ',')
          + size(val, prec, separator);
    }

    return {
      number: number,
      point: point,
      size: size,
      rectangle: rectangle
    };
  };

  var CanvasProvider = {
    canvases: [],

    getCanvas: function(width, height) {
      var size = height === undefined ? width : Size.create(width, height);
      if (this.canvases.length) {
        var canvas = this.canvases.pop();
        if ((canvas.width != size.width)
            || (canvas.height != size.height)) {
          canvas.width = size.width;
          canvas.height = size.height;
        } else {
          canvas.getContext('2d').clearRect(0, 0,
              size.width + 1, size.height + 1);
        }
        return canvas;
      } else {
        var canvas = document.createElement('canvas');
        canvas.width = size.width;
        canvas.height = size.height;
        return canvas;
      }
    },

    getContext: function(width, height) {
      return this.getCanvas(width, height).getContext('2d');
    },

    release: function(obj) {
      this.canvases.push(obj.canvas ? obj.canvas : obj);
    }
  };

  var Numerical = new function() {

    var abscissas = [
      [  0.5773502691896257645091488],
      [0,0.7745966692414833770358531],
      [  0.3399810435848562648026658,0.8611363115940525752239465],
      [0,0.5384693101056830910363144,0.9061798459386639927976269],
      [  0.2386191860831969086305017,0.6612093864662645136613996,0.9324695142031520278123016],
      [0,0.4058451513773971669066064,0.7415311855993944398638648,0.9491079123427585245261897],
      [  0.1834346424956498049394761,0.5255324099163289858177390,0.7966664774136267395915539,0.9602898564975362316835609],
      [0,0.3242534234038089290385380,0.6133714327005903973087020,0.8360311073266357942994298,0.9681602395076260898355762],
      [  0.1488743389816312108848260,0.4333953941292471907992659,0.6794095682990244062343274,0.8650633666889845107320967,0.9739065285171717200779640],
      [0,0.2695431559523449723315320,0.5190961292068118159257257,0.7301520055740493240934163,0.8870625997680952990751578,0.9782286581460569928039380],
      [  0.1252334085114689154724414,0.3678314989981801937526915,0.5873179542866174472967024,0.7699026741943046870368938,0.9041172563704748566784659,0.9815606342467192506905491],
      [0,0.2304583159551347940655281,0.4484927510364468528779129,0.6423493394403402206439846,0.8015780907333099127942065,0.9175983992229779652065478,0.9841830547185881494728294],
      [  0.1080549487073436620662447,0.3191123689278897604356718,0.5152486363581540919652907,0.6872929048116854701480198,0.8272013150697649931897947,0.9284348836635735173363911,0.9862838086968123388415973],
      [0,0.2011940939974345223006283,0.3941513470775633698972074,0.5709721726085388475372267,0.7244177313601700474161861,0.8482065834104272162006483,0.9372733924007059043077589,0.9879925180204854284895657],
      [  0.0950125098376374401853193,0.2816035507792589132304605,0.4580167776572273863424194,0.6178762444026437484466718,0.7554044083550030338951012,0.8656312023878317438804679,0.9445750230732325760779884,0.9894009349916499325961542]
    ];

    var weights = [
      [1],
      [0.8888888888888888888888889,0.5555555555555555555555556],
      [0.6521451548625461426269361,0.3478548451374538573730639],
      [0.5688888888888888888888889,0.4786286704993664680412915,0.2369268850561890875142640],
      [0.4679139345726910473898703,0.3607615730481386075698335,0.1713244923791703450402961],
      [0.4179591836734693877551020,0.3818300505051189449503698,0.2797053914892766679014678,0.1294849661688696932706114],
      [0.3626837833783619829651504,0.3137066458778872873379622,0.2223810344533744705443560,0.1012285362903762591525314],
      [0.3302393550012597631645251,0.3123470770400028400686304,0.2606106964029354623187429,0.1806481606948574040584720,0.0812743883615744119718922],
      [0.2955242247147528701738930,0.2692667193099963550912269,0.2190863625159820439955349,0.1494513491505805931457763,0.0666713443086881375935688],
      [0.2729250867779006307144835,0.2628045445102466621806889,0.2331937645919904799185237,0.1862902109277342514260976,0.1255803694649046246346943,0.0556685671161736664827537],
      [0.2491470458134027850005624,0.2334925365383548087608499,0.2031674267230659217490645,0.1600783285433462263346525,0.1069393259953184309602547,0.0471753363865118271946160],
      [0.2325515532308739101945895,0.2262831802628972384120902,0.2078160475368885023125232,0.1781459807619457382800467,0.1388735102197872384636018,0.0921214998377284479144218,0.0404840047653158795200216],
      [0.2152638534631577901958764,0.2051984637212956039659241,0.1855383974779378137417166,0.1572031671581935345696019,0.1215185706879031846894148,0.0801580871597602098056333,0.0351194603317518630318329],
      [0.2025782419255612728806202,0.1984314853271115764561183,0.1861610000155622110268006,0.1662692058169939335532009,0.1395706779261543144478048,0.1071592204671719350118695,0.0703660474881081247092674,0.0307532419961172683546284],
      [0.1894506104550684962853967,0.1826034150449235888667637,0.1691565193950025381893121,0.1495959888165767320815017,0.1246289712555338720524763,0.0951585116824927848099251,0.0622535239386478928628438,0.0271524594117540948517806]
    ];

    var abs = Math.abs,
      sqrt = Math.sqrt,
      pow = Math.pow,
      cos = Math.cos,
      PI = Math.PI;

    function cbrt(x) {
      return x > 0 ? pow(x, 1 / 3) : x < 0 ? -pow(-x, 1 / 3) : 0;
    }

    return {
      TOLERANCE: 10e-6,
      EPSILON: 10e-12,

      isZero: function(val) {
        return abs(val) <= this.EPSILON;
      },

      integrate: function(f, a, b, n) {
        var x = abscissas[n - 2],
          w = weights[n - 2],
          A = 0.5 * (b - a),
          B = A + a,
          i = 0,
          m = (n + 1) >> 1,
          sum = n & 1 ? w[i++] * f(B) : 0; 
        while (i < m) {
          var Ax = A * x[i];
          sum += w[i++] * (f(B + Ax) + f(B - Ax));
        }
        return A * sum;
      },

      findRoot: function(f, df, x, a, b, n, tolerance) {
        for (var i = 0; i < n; i++) {
          var fx = f(x),
            dx = fx / df(x);
          if (abs(dx) < tolerance)
            return x;
          var nx = x - dx;
          if (fx > 0) {
            b = x;
            x = nx <= a ? 0.5 * (a + b) : nx;
          } else {
            a = x;
            x = nx >= b ? 0.5 * (a + b) : nx;
          }
        }
      },

      solveQuadratic: function(a, b, c, roots, tolerance) {
        if (abs(a) < tolerance) {
          if (abs(b) >= tolerance) {
            roots[0] = -c / b;
            return 1;
          }
          return abs(c) < tolerance ? -1 : 0; 
        }
        var q = b * b - 4 * a * c;
        if (q < 0)
          return 0; 
        q = sqrt(q);
        a *= 2; 
        var n = 0;
        roots[n++] = (-b - q) / a;
        if (q > 0)
          roots[n++] = (-b + q) / a;
        return n; 
      },

      solveCubic: function(a, b, c, d, roots, tolerance) {
        if (abs(a) < tolerance)
          return Numerical.solveQuadratic(b, c, d, roots, tolerance);
        b /= a;
        c /= a;
        d /= a;
        var bb = b * b,
          p = 1 / 3 * (-1 / 3 * bb + c),
          q = 1 / 2 * (2 / 27 * b * bb - 1 / 3 * b * c + d),
          ppp = p * p * p,
          D = q * q + ppp;
        b /= 3;
        if (abs(D) < tolerance) {
            if (abs(q) < tolerance) { 
                roots[0] = - b;
                return 1;
            } else { 
                var u = cbrt(-q);
                roots[0] = 2 * u - b;
                roots[1] = - u - b;
                return 2;
            }
        } else if (D < 0) { 
            var phi = 1 / 3 * Math.acos(-q / sqrt(-ppp));
            var t = 2 * sqrt(-p);
            roots[0] =   t * cos(phi) - b;
            roots[1] = - t * cos(phi + PI / 3) - b;
            roots[2] = - t * cos(phi - PI / 3) - b;
            return 3;
        } else { 
            D = sqrt(D);
            roots[0] = cbrt(D - q) - cbrt(D + q) - b;
            return 1;
        }
      }
    };
  };

  var BlendMode = {
    process: function(blendMode, srcContext, dstContext, alpha, offset) {
      var srcCanvas = srcContext.canvas,
        dstData = dstContext.getImageData(offset.x, offset.y,
            srcCanvas.width, srcCanvas.height),
        dst  = dstData.data,
        src  = srcContext.getImageData(0, 0,
            srcCanvas.width, srcCanvas.height).data,
        min = Math.min,
        max = Math.max,
        abs = Math.abs,
        sr, sg, sb, sa, 
        br, bg, bb, ba, 
        dr, dg, db;     

      function getLum(r, g, b) {
        return 0.2989 * r + 0.587 * g + 0.114 * b;
      }

      function setLum(r, g, b, l) {
        var d = l - getLum(r, g, b);
        dr = r + d;
        dg = g + d;
        db = b + d;
        var l = getLum(dr, dg, db),
          mn = min(dr, dg, db),
          mx = max(dr, dg, db);
        if (mn < 0) {
          var lmn = l - mn;
          dr = l + (dr - l) * l / lmn;
          dg = l + (dg - l) * l / lmn;
          db = l + (db - l) * l / lmn;
        }
        if (mx > 255) {
          var ln = 255 - l, mxl = mx - l;
          dr = l + (dr - l) * ln / mxl;
          dg = l + (dg - l) * ln / mxl;
          db = l + (db - l) * ln / mxl;
        }
      }

      function getSat(r, g, b) {
        return max(r, g, b) - min(r, g, b);
      }

      function setSat(r, g, b, s) {
        var col = [r, g, b],
          mx = max(r, g, b), 
          mn = min(r, g, b), 
          md; 
        mn = mn == r ? 0 : mn == g ? 1 : 2;
        mx = mx == r ? 0 : mx == g ? 1 : 2;
        md = min(mn, mx) == 0 ? max(mn, mx) == 1 ? 2 : 1 : 0;
        if (col[mx] > col[mn]) {
          col[md] = (col[md] - col[mn]) * s / (col[mx] - col[mn]);
          col[mx] = s;
        } else {
          col[md] = col[mx] = 0;
        }
        col[mn] = 0;
        dr = col[0];
        dg = col[1];
        db = col[2];
      }

      var modes = {
        multiply: function() {
          dr = br * sr / 255;
          dg = bg * sg / 255;
          db = bb * sb / 255;
        },

        screen: function() {
          dr = 255 - (255 - br) * (255 - sr) / 255;
          dg = 255 - (255 - bg) * (255 - sg) / 255;
          db = 255 - (255 - bb) * (255 - sb) / 255;
        },

        overlay: function() {
          dr = br < 128 ? 2 * br * sr / 255 : 255 - 2 * (255 - br) * (255 - sr) / 255;
          dg = bg < 128 ? 2 * bg * sg / 255 : 255 - 2 * (255 - bg) * (255 - sg) / 255;
          db = bb < 128 ? 2 * bb * sb / 255 : 255 - 2 * (255 - bb) * (255 - sb) / 255;
        },

        'soft-light': function() {
          var t = sr * br / 255;
          dr = t + br * (255 - (255 - br) * (255 - sr) / 255 - t) / 255;
          t = sg * bg / 255;
          dg = t + bg * (255 - (255 - bg) * (255 - sg) / 255 - t) / 255;
          t = sb * bb / 255;
          db = t + bb * (255 - (255 - bb) * (255 - sb) / 255 - t) / 255;
        },

        'hard-light': function() {
          dr = sr < 128 ? 2 * sr * br / 255 : 255 - 2 * (255 - sr) * (255 - br) / 255;
          dg = sg < 128 ? 2 * sg * bg / 255 : 255 - 2 * (255 - sg) * (255 - bg) / 255;
          db = sb < 128 ? 2 * sb * bb / 255 : 255 - 2 * (255 - sb) * (255 - bb) / 255;
        },

        'color-dodge': function() {
          dr = sr == 255 ? sr : min(255, br * 255 / (255 - sr));
          dg = sg == 255 ? sg : min(255, bg * 255 / (255 - sg));
          db = sb == 255 ? sb : min(255, bb * 255 / (255 - sb));
        },

        'color-burn': function() {
          dr = sr == 0 ? 0 : max(255 - ((255 - br) * 255) / sr, 0);
          dg = sg == 0 ? 0 : max(255 - ((255 - bg) * 255) / sg, 0);
          db = sb == 0 ? 0 : max(255 - ((255 - bb) * 255) / sb, 0);
        },

        darken: function() {
          dr = br < sr ? br : sr;
          dg = bg < sg ? bg : sg;
          db = bb < sb ? bb : sb;
        },

        lighten: function() {
          dr = br > sr ? br : sr;
          dg = bg > sg ? bg : sg;
          db = bb > sb ? bb : sb;
        },

        difference: function() {
          dr = br - sr;
          if (dr < 0)
            dr = -dr;
          dg = bg - sg;
          if (dg < 0)
            dg = -dg;
          db = bb - sb;
          if (db < 0)
            db = -db;
        },

        exclusion: function() {
          dr = br + sr * (255 - br - br) / 255;
          dg = bg + sg * (255 - bg - bg) / 255;
          db = bb + sb * (255 - bb - bb) / 255;
        },

        hue: function() {
          setSat(sr, sg, sb, getSat(br, bg, bb));
          setLum(dr, dg, db, getLum(br, bg, bb));
        },

        saturation: function() {
          setSat(br, bg, bb, getSat(sr, sg, sb));
          setLum(dr, dg, db, getLum(br, bg, bb));
        },

        luminosity: function() {
          setLum(br, bg, bb, getLum(sr, sg, sb));
        },

        color: function() {
          setLum(sr, sg, sb, getLum(br, bg, bb));
        },

        add: function() {
          dr = min(br + sr, 255);
          dg = min(bg + sg, 255);
          db = min(bb + sb, 255);
        },

        subtract: function() {
          dr = max(br - sr, 0);
          dg = max(bg - sg, 0);
          db = max(bb - sb, 0);
        },

        average: function() {
          dr = (br + sr) / 2;
          dg = (bg + sg) / 2;
          db = (bb + sb) / 2;
        },

        negation: function() {
          dr = 255 - abs(255 - sr - br);
          dg = 255 - abs(255 - sg - bg);
          db = 255 - abs(255 - sb - bb);
        }
      };

      var process = modes[blendMode];
      if (!process)
        return;

      for (var i = 0, l = dst.length; i < l; i += 4) {
        sr = src[i];
        br = dst[i];
        sg = src[i + 1];
        bg = dst[i + 1];
        sb = src[i + 2];
        bb = dst[i + 2];
        sa = src[i + 3];
        ba = dst[i + 3];
        process();
        var a1 = sa * alpha / 255,
          a2 = 1 - a1;
        dst[i] = a1 * dr + a2 * br;
        dst[i + 1] = a1 * dg + a2 * bg;
        dst[i + 2] = a1 * db + a2 * bb;
        dst[i + 3] = sa * alpha + a2 * ba;
      }
      dstContext.putImageData(dstData, offset.x, offset.y);
    }
  };

  var SvgStyles = Base.each({
    fillColor: ['fill', 'color'],
    strokeColor: ['stroke', 'color'],
    strokeWidth: ['stroke-width', 'number'],
    strokeCap: ['stroke-linecap', 'string'],
    strokeJoin: ['stroke-linejoin', 'string'],
    miterLimit: ['stroke-miterlimit', 'number'],
    dashArray: ['stroke-dasharray', 'array'],
    dashOffset: ['stroke-dashoffset', 'number']
  }, function(entry, key) {
    var part = Base.capitalize(key);
    this[key] = {
      type: entry[1],
      property: key,
      attribute: entry[0],
      get: 'get' + part,
      set: 'set' + part
    };
  }, {});

  new function() {
    var format = Format.number,
      namespaces = {
        href: 'http://www.w3.org/1999/xlink'
      };

    function setAttributes(node, attrs) {
      for (var key in attrs) {
        var val = attrs[key],
          namespace = namespaces[key];
        if (typeof val === 'number')
          val = format(val);
        if (namespace) {
          node.setAttributeNS(namespace, key, val);
        } else {
          node.setAttribute(key, val);
        }
      }
      return node;
    }

    function createElement(tag, attrs) {
      return setAttributes(
        document.createElementNS('http://www.w3.org/2000/svg', tag), attrs);
    }

    function getDistance(segments, index1, index2) {
      return segments[index1]._point.getDistance(segments[index2]._point);
    }

    function getTransform(item, coordinates) {
      var matrix = item._matrix,
        trans = matrix.getTranslation(),
        attrs = {};
      if (coordinates) {
        matrix = matrix.shiftless();
        var point = matrix._inverseTransform(trans);
        attrs.x = point.x;
        attrs.y = point.y;
        trans = null;
      }
      if (matrix.isIdentity())
        return attrs;
      var decomposed = matrix.decompose();
      if (decomposed && !decomposed.shearing) {
        var parts = [],
          angle = decomposed.rotation,
          scale = decomposed.scaling;
        if (trans && !trans.isZero())
          parts.push('translate(' + Format.point(trans) + ')');
        if (!Numerical.isZero(scale.x - 1) || !Numerical.isZero(scale.y - 1))
          parts.push('scale(' + Format.point(scale) +')');
        if (angle)
          parts.push('rotate(' + format(angle) + ')');
        attrs.transform = parts.join(' ');
      } else {
        attrs.transform = 'matrix(' + matrix.getValues().join(',') + ')';
      }
      return attrs;
    }

    function determineAngle(path, segments, type, center) {
      var topCenter = type === 'rect'
          ? segments[1]._point.add(segments[2]._point).divide(2)
          : type === 'roundrect'
          ? segments[3]._point.add(segments[4]._point).divide(2)
          : type === 'circle' || type === 'ellipse'
          ? segments[1]._point
          : null;
      var angle = topCenter && topCenter.subtract(center).getAngle() + 90;
      return Numerical.isZero(angle || 0) ? 0 : angle;
    }

    function determineType(path, segments) {
      function isColinear(i, j) {
        var seg1 = segments[i],
          seg2 = seg1.getNext(),
          seg3 = segments[j],
          seg4 = seg3.getNext();
        return seg1._handleOut.isZero() && seg2._handleIn.isZero()
            && seg3._handleOut.isZero() && seg4._handleIn.isZero()
            && seg2._point.subtract(seg1._point).isColinear(
              seg4._point.subtract(seg3._point));
      }

      var kappa = 4 * (Math.sqrt(2) - 1) / 3;

      function isArc(i) {
        var segment = segments[i],
          next = segment.getNext(),
          handle1 = segment._handleOut,
          handle2 = next._handleIn;
        if (handle1.isOrthogonal(handle2)) {
          var from = segment._point,
            to = next._point,
            corner = new Line(from, handle1).intersect(
                new Line(to, handle2));
          return corner && Numerical.isZero(handle1.getLength() /
              corner.subtract(from).getLength() - kappa)
            && Numerical.isZero(handle2.getLength() /
              corner.subtract(to).getLength() - kappa);
        }
      }

      if (path.isPolygon()) {
        return  segments.length === 4 && path._closed
            && isColinear(0, 2) && isColinear(1, 3)
            ? 'rect'
            : segments.length === 0
              ? 'empty'
              : segments.length >= 3
                ? path._closed ? 'polygon' : 'polyline'
                : 'line';
      } else if (path._closed) {
        if (segments.length === 8
            && isArc(0) && isArc(2) && isArc(4) && isArc(6)
            && isColinear(1, 5) && isColinear(3, 7)) {
          return 'roundrect';
        } else if (segments.length === 4
            && isArc(0) && isArc(1) && isArc(2) && isArc(3)) {
          return Numerical.isZero(getDistance(segments, 0, 2)
              - getDistance(segments, 1, 3))
              ? 'circle'
              : 'ellipse';
        } 
      }
      return 'path';
    }

    function exportGroup(item) {
      var attrs = getTransform(item),
        children = item._children;
      attrs.fill = 'none';
      var node = createElement('g', attrs);
      for (var i = 0, l = children.length; i < l; i++) {
        var child = exportSvg(children[i]);
        if (child)
          node.appendChild(child);
      }
      return node;
    }

    function exportRaster(item) {
      var attrs = getTransform(item, true),
        size = item.getSize();
      attrs.x -= size.width / 2;
      attrs.y -= size.height / 2;
      attrs.width = size.width;
      attrs.height = size.height;
      attrs.href = item.toDataURL();
      return createElement('image', attrs);
    }

    function exportText(item) {
      var attrs = getTransform(item, true),
        style = item._style;
      if (style._font != null)
        attrs['font-family'] = style._font;
      if (style._fontSize != null)
        attrs['font-size'] = style._fontSize;
      var node = createElement('text', attrs);
      node.textContent = item._content;
      return node;
    }

    function exportPath(item) {
      var segments = item._segments,
        center = item.getPosition(true),
        type = determineType(item, segments),
        angle = determineAngle(item, segments, type, center),
        attrs;
      switch (type) {
      case 'empty':
        return null;
      case 'path':
        var data = item.getPathData();
        attrs = data && { d: data };
        break;
      case 'polyline':
      case 'polygon':
        var parts = [];
        for(i = 0, l = segments.length; i < l; i++)
          parts.push(Format.point(segments[i]._point));
        attrs = {
          points: parts.join(' ')
        };
        break;
      case 'rect':
        var width = getDistance(segments, 0, 3),
          height = getDistance(segments, 0, 1),
          point = segments[1]._point.rotate(-angle, center);
        attrs = {
          x: point.x,
          y: point.y,
          width: width,
          height: height
        };
        break;
      case 'roundrect':
        type = 'rect';
        var width = getDistance(segments, 1, 6),
          height = getDistance(segments, 0, 3),
          rx = (width - getDistance(segments, 0, 7)) / 2,
          ry = (height - getDistance(segments, 1, 2)) / 2,
          left = segments[3]._point, 
          right = segments[4]._point, 
          point = left.subtract(right.subtract(left).normalize(rx))
              .rotate(-angle, center);
        attrs = {
          x: point.x,
          y: point.y,
          width: width,
          height: height,
          rx: rx,
          ry: ry
        };
        break;
      case'line':
        var first = segments[0]._point,
          last = segments[segments.length - 1]._point;
        attrs = {
          x1: first._x,
          y1: first._y,
          x2: last._x,
          y2: last._y
        };
        break;
      case 'circle':
        var radius = getDistance(segments, 0, 2) / 2;
        attrs = {
          cx: center.x,
          cy: center.y,
          r: radius
        };
        break;
      case 'ellipse':
        var rx = getDistance(segments, 2, 0) / 2,
          ry = getDistance(segments, 3, 1) / 2;
        attrs = {
          cx: center.x,
          cy: center.y,
          rx: rx,
          ry: ry
        };
        break;
      }
      if (angle) {
        attrs.transform = 'rotate(' + format(angle) + ','
            + Format.point(center) + ')';
        item._gradientMatrix = new Matrix().rotate(-angle, center);
      }
      return createElement(type, attrs);
    }

    function exportCompoundPath(item) {
      var attrs = getTransform(item, true);
      var data = item.getPathData();
      if (data)
        attrs.d = data;
      return createElement('path', attrs);
    }

    function exportPlacedSymbol(item) {
      var attrs = getTransform(item, true),
        symbol = item.getSymbol(),
        symbolNode = getDefinition(symbol);
        definition = symbol.getDefinition(),
        bounds = definition.getBounds();
      if (!symbolNode) {
        symbolNode = createElement('symbol', {
          viewBox: Format.rectangle(bounds)
        });
        symbolNode.appendChild(exportSvg(definition));
        setDefinition(symbol, symbolNode);
      }
      attrs.href = '#' + symbolNode.id;
      attrs.x += bounds.x;
      attrs.y += bounds.y;
      attrs.width = format(bounds.width);
      attrs.height = format(bounds.height);
      return createElement('use', attrs);
    }

    function exportGradient(color, item) {
      var gradientNode = getDefinition(color);
      if (!gradientNode) {
        var gradient = color.gradient,
          type = gradient._type,
          matrix = item._gradientMatrix,
          origin = color._origin.transform(matrix),
          destination = color._destination.transform(matrix),
          highlight = color._hilite && color._hilite.transform(matrix),
          attrs;
          if (type == 'RadialGradient') {
            attrs = {
              cx: origin.x,
              cy: origin.y,
              r: origin.getDistance(destination)
            };
            if (highlight) {
              attrs.fx = highlight.x;
              attrs.fy = highlight.y;
            }
          } else {
            attrs = {
              x1: origin.x,
              y1: origin.y,
              x2: destination.x,
              y2: destination.y
            };
          }
        attrs.gradientUnits = 'userSpaceOnUse';
        gradientNode = createElement(type[0].toLowerCase() + type.slice(1),
            attrs);
        var stops = gradient._stops;
        for (var i = 0, l = stops.length; i < l; i++) {
          var stop = stops[i],
            stopColor = stop._color;
          attrs = {
            offset: stop._rampPoint,
            'stop-color': stopColor.toCss(true)
          };
          if (stopColor.getAlpha() < 1)
            attrs['stop-opacity'] = stopColor._alpha;
          gradientNode.appendChild(createElement('stop', attrs));
        }
        setDefinition(color, gradientNode);
      }
      return 'url(#' + gradientNode.id + ')';
    }

    var exporters = {
      Group: exportGroup,
      Layer: exportGroup,
      Raster: exportRaster,
      PointText: exportText,
      PlacedSymbol: exportPlacedSymbol,
      Path: exportPath,
      CompoundPath: exportCompoundPath
    };

    function applyStyle(item, node) {
      var attrs = {},
        style = item._style,
        parent = item.getParent(),
        parentStyle = parent && parent._style;

      if (item._name != null)
        attrs.id = item._name;

      Base.each(SvgStyles, function(entry) {
        var value = style[entry.get]();
        if (!parentStyle || !Base.equals(parentStyle[entry.get](), value)) {
          if (entry.type === 'color' && value != null && value.getAlpha() < 1)
            attrs[entry.attribute + '-opacity'] = value._alpha;
          attrs[entry.attribute] = value == null
            ? 'none'
            : entry.type === 'color'
              ? value.gradient
                ? exportGradient(value, item)
                : value.toCss(true) 
              : entry.type === 'array'
                ? value.join(',')
                : entry.type === 'number'
                  ? format(value)
                  : value;
        }
      });

      if (item._opacity != null && item._opacity < 1)
        attrs.opacity = item._opacity;

      if (item._visibility != null && !item._visibility)
        attrs.visibility = 'hidden';

      delete item._gradientMatrix; 
      return setAttributes(node, attrs);
    }

    var definitions;
    function getDefinition(item) {
      if (!definitions)
        definitions = { ids: {}, svgs: {} };
      return definitions.svgs[item._id];
    }

    function setDefinition(item, node) {
      var type = item._type,
        id = definitions.ids[type] = (definitions.ids[type] || 0) + 1;
      node.id = type + '-' + id;
      definitions.svgs[item._id] = node;
    }

    function exportDefinitions(node) {
      if (!definitions)
        return node;
      var container = node.nodeName == 'svg' && node,
        firstChild = container ? container.firstChild : node;
      for (var i in definitions.svgs) {
        if (!container) {
          container = createElement('svg');
          container.appendChild(node);
        }
        container.insertBefore(definitions.svgs[i], firstChild);
      }
      definitions = null;
      return container;
    }

    function exportSvg(item) {
      var exporter = exporters[item._type],
        node = exporter && exporter(item, item._type);
      return node && applyStyle(item, node);
    }

    Item.inject({
      exportSvg: function() {
        var node = exportSvg(this);
        return exportDefinitions(node);
      }
    });

    Project.inject({
      exportSvg: function() {
        var node = createElement('svg'),
          layers = this.layers;
        for (var i = 0, l = layers.length; i < l; i++)
          node.appendChild(exportSvg(layers[i]));
        return exportDefinitions(node);
      }
    });
  };

  new function() {

    function getValue(node, key, allowNull, index) {
      var base = (!allowNull || node.getAttribute(key) != null)
          && node[key] && node[key].baseVal;
      return base
          ? index !== undefined
            ? index < base.numberOfItems
              ? Base.pick((base = base.getItem(index)).value, base)
              : null
            : Base.pick(base.value, base)
          : null;
    }

    function getPoint(node, x, y, allowNull, index) {
      x = getValue(node, x, allowNull, index);
      y = getValue(node, y, allowNull, index);
      return allowNull && x == null && y == null ? null
          : Point.create(x || 0, y || 0);
    }

    function getSize(node, w, h, allowNull, index) {
      w = getValue(node, w, allowNull, index);
      h = getValue(node, h, allowNull, index);
      return allowNull && w == null && h == null ? null
          : Size.create(w || 0, h || 0);
    }

    function convertValue(value, type) {
      return value === 'none'
          ? null
          : type === 'number'
            ? parseFloat(value)
            : type === 'array'
              ? value ? value.split(/[\s,]+/g).map(parseFloat) : []
              : type === 'color' && getDefinition(value)
                || value;
    }

    function importGroup(node, type) {
      var nodes = node.childNodes,
        clip = type === 'clipPath',
        item = clip ? new CompoundPath() : new Group(),
        project = item._project,
        currentStyle = project._currentStyle;
      item.setFillColor('black');
      if (!clip) {
        item = applyAttributes(item, node);
        project._currentStyle = item._style.clone();
      }
      for (var i = 0, l = nodes.length; i < l; i++) {
        var childNode = nodes[i],
          child;
        if (childNode.nodeType == 1 && (child = importSvg(childNode))) {
          if (clip && child instanceof CompoundPath) {
            item.addChildren(child.removeChildren());
            child.remove();
          } else if (!(child instanceof Symbol)) {
            item.addChild(child);
          }
        }
      }
      if (clip)
        item = applyAttributes(item.reduce(), node);
      project._currentStyle = currentStyle;
      if (clip || type === 'defs') {
        item.remove();
        item = null;
      }
      return item;
    }

    function importPoly(node, type) {
      var path = new Path(),
        points = node.points;
      path.moveTo(points.getItem(0));
      for (var i = 1, l = points.numberOfItems; i < l; i++)
        path.lineTo(points.getItem(i));
      if (type === 'polygon')
        path.closePath();
      return path;
    }

    function importPath(node) {
      var data = node.getAttribute('d'),
        path = data.match(/m/gi).length > 1
            ? new CompoundPath()
            : new Path();
      path.setPathData(data);
      return path;
    }

    function importGradient(node, type) {
      var nodes = node.childNodes,
        stops = [];
      for (var i = 0, l = nodes.length; i < l; i++) {
        var child = nodes[i];
        if (child.nodeType == 1)
          stops.push(applyAttributes(new GradientStop(), child));
      }
      var isRadial = type === 'radialGradient',
        gradient = new (isRadial ? RadialGradient : LinearGradient)(stops),
        origin, destination, highlight;
      if (isRadial) {
        origin = getPoint(node, 'cx', 'cy');
        destination = origin.add(getValue(node, 'r'), 0);
        highlight = getPoint(node, 'fx', 'fy', true);
      } else {
        origin = getPoint(node, 'x1', 'y1');
        destination = getPoint(node, 'x2', 'y2');
      }
      applyAttributes(
        new GradientColor(gradient, origin, destination, highlight), node);
      return null;
    }

    var importers = {
      g: importGroup,
      svg: importGroup,
      clipPath: importGroup,
      polygon: importPoly,
      polyline: importPoly,
      path: importPath,
      linearGradient: importGradient,
      radialGradient: importGradient,

      image: function (node) {
        var raster = new Raster(getValue(node, 'href'));
        raster.attach('load', function() {
          var size = getSize(node, 'width', 'height');
          this.setSize(size);
          this.translate(getPoint(node, 'x', 'y').add(size.divide(2)));
        });
        return raster;
      },

      symbol: function(node, type) {
        return new Symbol(importGroup(node, type), true);
      },

      defs: importGroup,

      use: function(node, type) {
        var id = (getValue(node, 'href') || '').substring(1),
          definition = definitions[id],
          point = getPoint(node, 'x', 'y');
        return definition
            ? definition instanceof Symbol
              ? definition.place(point)
              : definition.clone().translate(point)
            : null;
      },

      circle: function(node) {
        return new Path.Circle(getPoint(node, 'cx', 'cy'),
            getValue(node, 'r'));
      },

      ellipse: function(node) {
        var center = getPoint(node, 'cx', 'cy'),
          radius = getSize(node, 'rx', 'ry');
        return new Path.Ellipse(new Rectangle(center.subtract(radius),
            center.add(radius)));
      },

      rect: function(node) {
        var point = getPoint(node, 'x', 'y'),
          size = getSize(node, 'width', 'height'),
          radius = getSize(node, 'rx', 'ry');
        return new Path.RoundRectangle(new Rectangle(point, size), radius);
      },

      line: function(node) {
        return new Path.Line(getPoint(node, 'x1', 'y1'),
            getPoint(node, 'x2', 'y2'));
      },

      text: function(node) {
        var text = new PointText(getPoint(node, 'x', 'y', false, 0)
            .add(getPoint(node, 'dx', 'dy', false, 0)));
        text.setContent(node.textContent.trim() || '');
        return text;
      }
    };

    function applyTransform(item, value, name, node) {
      var transforms = node[name].baseVal,
        matrix = new Matrix();
      for (var i = 0, l = transforms.numberOfItems; i < l; i++) {
        var mx = transforms.getItem(i).matrix;
        matrix.concatenate(
          new Matrix(mx.a, mx.b, mx.c, mx.d, mx.e, mx.f));
      }
      item.transform(matrix);
    }

    function applyOpacity(item, value, name) {
      var color = item._style[name === 'fill-opacity' ? 'getFillColor'
          : 'getStrokeColor']();
      if (color)
        color.setAlpha(parseFloat(value));
    }

    function applyTextAttribute(item, apply) {
      if (item instanceof TextItem) {
        apply(item);
      } else if (item instanceof Group) {
        var children = item._children;
        for (var i = 0, l = children.length; i < l; i++)
          apply(children[i]);
      }
    }

    var attributes = Base.each(SvgStyles, function(entry) {
      this[entry.attribute] = function(item, value, name, node) {
        item._style[entry.set](convertValue(value, entry.type));
      };
    }, {
      id: function(item, value) {
        definitions[value] = item;
        if (item.setName)
          item.setName(value);
      },

      'clip-path': function(item, value) {
        var clip = getDefinition(value);
        if (clip) {
          clip = clip.clone();
          clip.setClipMask(true);
          return new Group(clip, item);
        }
      },

      gradientTransform: applyTransform,
      transform: applyTransform,

      opacity: function(item, value) {
        item.setOpacity(parseFloat(value));
      },

      'fill-opacity': applyOpacity,
      'stroke-opacity': applyOpacity,

      'font-family': function(item, value) {
        applyTextAttribute(item, function(item) {
          item.setFont(value.split(',')[0].replace(/^\s+|\s+$/g, ''));
        });
      },

      'font-size': function(item, value) {
        applyTextAttribute(item, function(item) {
          item.setFontSize(parseFloat(value));
        });
      },

      'text-anchor': function(item, value) {
        applyTextAttribute(item, function(item) {
          item.setJustification({
            start: 'left',
            middle: 'center',
            end: 'right'
          }[value]);
        });
      },

      visibility: function(item, value) {
        item.setVisible(value === 'visible');
      },

      'stop-color': function(item, value) {
        item.setColor(value);
      },

      'stop-opacity': function(item, value) {
        if (item._color)
          item._color.setAlpha(parseFloat(value));
      },

      offset: function(item, value) {
        var percentage = value.match(/(.*)%$/);
        item.setRampPoint(percentage ? percentage[1] / 100 : value);
      },

      viewBox: function(item, value, name, node, styles) {
        var rect = Rectangle.create.apply(this, convertValue(value, 'array')),
          size = getSize(node, 'width', 'height', true);
        if (item instanceof Group) {
          var scale = size ? rect.getSize().divide(size) : 1,
            matrix = new Matrix().translate(rect.getPoint()).scale(scale);
          item.transform(matrix.inverted());
        } else if (item instanceof Symbol) {
          if (size)
            rect.setSize(size);
          var clip = getAttribute(node, 'overflow', styles) != 'visible',
            group = item._definition;
          if (clip && !rect.contains(group.getBounds())) {
            clip = new Path.Rectangle(rect).transform(group._matrix);
            clip.setClipMask(true);
            group.addChild(clip);
          }
        }
      }
    });

    function getAttribute(node, name, styles) {
      var attr = node.attributes[name],
        value = attr && attr.value;
      if (!value) {
        var style = Base.camelize(name);
        value = node.style[style];
        if (!value && styles.node[style] !== styles.parent[style])
          value = styles.node[style];
      }
      return !value
          ? undefined
          : value === 'none'
            ? null
            : value;
    }

    function applyAttributes(item, node) {
      var styles = {
        node: DomElement.getStyles(node) || {},
        parent: DomElement.getStyles(node.parentNode) || {}
      };
      Base.each(attributes, function(apply, name) {
        var value = getAttribute(node, name, styles);
        if (value !== undefined)
          item = Base.pick(apply(item, value, name, node, styles), item);
      });
      return item;
    }

    var definitions = {};
    function getDefinition(value) {
      var match = value && value.match(/\((?:#|)([^)']+)/);
          return match && definitions[match[1]];
    }

    function importSvg(node, clearDefs) {
      var type = node.nodeName,
        importer = importers[type],
        item = importer && importer(node, type);
      // See importGroup() for an explanation of this filtering:
      if (item && item._type !== 'Group')
        item = applyAttributes(item, node);
      // Clear definitions at the end of import?
      if (clearDefs)
        definitions = {};
      return item;
    }

    Item.inject(/** @lends Item# */{
      /**
       * Converts the passed node node into a Paper.js item and adds it to the
       * children of this item.
       *
       * @param {SVGSVGElement} node the SVG DOM node to convert
       * @return {Item} the converted Paper.js item
       */
      importSvg: function(node) {
        return this.addChild(importSvg(node, true));
      }
    });

    Project.inject(/** @lends Project# */{
      /**
       * Converts the passed node node into a Paper.js item and adds it to the
       * active layer of this project.
       *
       * @param {SVGSVGElement} node the SVG DOM node to convert
       * @return {Item} the converted Paper.js item
       */
      importSvg: function(node) {
        this.activate();
        return importSvg(node, true);
      }
    });
  };

  /*
   * Paper.js - The Swiss Army Knife of Vector Graphics Scripting.
   * http://paperjs.org/
   *
   * Copyright (c) 2011 - 2013, Juerg Lehni & Jonathan Puckey
   * http://lehni.org/ & http://jonathanpuckey.com/
   *
   * Distributed under the MIT license. See LICENSE file for details.
   *
   * All rights reserved.
   */

  /**
   * @name PaperScript
   * @namespace
   */

  (function(e){"use strict";function r(e){dr=e||{};for(var r in br)dr.hasOwnProperty(r)||(dr[r]=br[r]);vr=dr.sourceFile||null}function t(e,r){var t=yr(hr,e);r+=" ("+t.line+":"+t.column+")";var n=new SyntaxError(r);throw n.pos=e,n.loc=t,n.raisedAt=gr,n}function n(e){function r(e){if(1==e.length)return t+="return str === "+JSON.stringify(e[0])+";";t+="switch(str){";for(var r=0;e.length>r;++r)t+="case "+JSON.stringify(e[r])+":";t+="return true}return false;"}e=e.split(" ");var t="",n=[];e:for(var a=0;e.length>a;++a){for(var o=0;n.length>o;++o)if(n[o][0].length==e[a].length){n[o].push(e[a]);continue e}n.push([e[a]])}if(n.length>3){n.sort(function(e,r){return r.length-e.length}),t+="switch(str.length){";for(var a=0;n.length>a;++a){var i=n[a];t+="case "+i[0].length+":",r(i)}t+="}"}else r(e);return Function("str",t)}function a(e){return 65>e?36===e:91>e?!0:97>e?95===e:123>e?!0:e>=170&&Ht.test(String.fromCharCode(e))}function o(e){return 48>e?36===e:58>e?!0:65>e?!1:91>e?!0:97>e?95===e:123>e?!0:e>=170&&Kt.test(String.fromCharCode(e))}function i(){this.line=Ir,this.column=gr-Lr}function s(){Ir=1,gr=Lr=0,Sr=!0,f()}function c(e,r){kr=gr,dr.locations&&(Cr=new i),Er=e,f(),Ar=r,Sr=e.beforeExpr}function u(){var e=dr.onComment&&dr.locations&&new i,r=gr,n=hr.indexOf("*/",gr+=2);if(-1===n&&t(gr-2,"Unterminated comment"),gr=n+2,dr.locations){Yt.lastIndex=r;for(var a;(a=Yt.exec(hr))&&gr>a.index;)++Ir,Lr=a.index+a[0].length}dr.onComment&&dr.onComment(!0,hr.slice(r+2,n),r,gr,e,dr.locations&&new i)}function l(){for(var e=gr,r=dr.onComment&&dr.locations&&new i,t=hr.charCodeAt(gr+=2);mr>gr&&10!==t&&13!==t&&8232!==t&&8329!==t;)++gr,t=hr.charCodeAt(gr);dr.onComment&&dr.onComment(!1,hr.slice(e+2,gr),e,gr,r,dr.locations&&new i)}function f(){for(;mr>gr;){var e=hr.charCodeAt(gr);if(32===e)++gr;else if(13===e){++gr;var r=hr.charCodeAt(gr);10===r&&++gr,dr.locations&&(++Ir,Lr=gr)}else if(10===e)++gr,++Ir,Lr=gr;else if(14>e&&e>8)++gr;else if(47===e){var r=hr.charCodeAt(gr+1);if(42===r)u();else{if(47!==r)break;l()}}else if(14>e&&e>8||32===e||160===e)++gr;else{if(!(e>=5760&&Pt.test(String.fromCharCode(e))))break;++gr}}}function p(){var e=hr.charCodeAt(gr+1);return e>=48&&57>=e?S(!0):(++gr,c(kt))}function d(){var e=hr.charCodeAt(gr+1);return Sr?(++gr,C()):61===e?w(At,2):w(Ct,1)}function h(){var e=hr.charCodeAt(gr+1);return 61===e?w(At,2):w(Bt,1)}function m(e){var r=hr.charCodeAt(gr+1);return r===e?w(124===e?Ut:Rt,2):61===r?w(At,2):w(124===e?Tt:qt,1)}function v(){var e=hr.charCodeAt(gr+1);return 61===e?w(At,2):w(Vt,1)}function b(e){var r=hr.charCodeAt(gr+1);return r===e?w(It,2):61===r?w(At,2):w(St,1)}function y(e){var r=hr.charCodeAt(gr+1),t=1;return r===e?(t=62===e&&62===hr.charCodeAt(gr+2)?3:2,61===hr.charCodeAt(gr+t)?w(At,t+1):w(Ot,t)):(61===r&&(t=61===hr.charCodeAt(gr+2)?3:2),w(Dt,t))}function g(e){var r=hr.charCodeAt(gr+1);return 61===r?w(Ft,61===hr.charCodeAt(gr+2)?3:2):w(61===e?Et:Lt,1)}function x(e){switch(e){case 46:return p();case 40:return++gr,c(vt);case 41:return++gr,c(bt);case 59:return++gr,c(gt);case 44:return++gr,c(yt);case 91:return++gr,c(pt);case 93:return++gr,c(dt);case 123:return++gr,c(ht);case 125:return++gr,c(mt);case 58:return++gr,c(xt);case 63:return++gr,c(wt);case 48:var r=hr.charCodeAt(gr+1);if(120===r||88===r)return A();case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return S(!1);case 34:case 39:return I(e);case 47:return d(e);case 37:case 42:return h();case 124:case 38:return m(e);case 94:return v();case 43:case 45:return b(e);case 60:case 62:return y(e);case 61:case 33:return g(e);case 126:return w(Lt,1)}return!1}function k(e){if(xr=gr,dr.locations&&(wr=new i),e)return C();if(gr>=mr)return c(Mr);var r=hr.charCodeAt(gr);if(a(r)||92===r)return R();var n=x(r);if(n===!1){var o=String.fromCharCode(r);if("\\"===o||Ht.test(o))return R();t(gr,"Unexpected character '"+o+"'")}return n}function w(e,r){var t=hr.slice(gr,gr+r);gr+=r,c(e,t)}function C(){for(var e,r,n="",a=gr;;){gr>=mr&&t(a,"Unterminated regular expression");var o=hr.charAt(gr);if(Qt.test(o)&&t(a,"Unterminated regular expression"),e)e=!1;else{if("["===o)r=!0;else if("]"===o&&r)r=!1;else if("/"===o&&!r)break;e="\\"===o}++gr}var n=hr.slice(a,gr);++gr;var i=U();return i&&!/^[gmsiy]*$/.test(i)&&t(a,"Invalid regexp flag"),c(Or,RegExp(n,i))}function E(e,r){for(var t=gr,n=0,a=0,o=null==r?1/0:r;o>a;++a){var i,s=hr.charCodeAt(gr);if(i=s>=97?s-97+10:s>=65?s-65+10:s>=48&&57>=s?s-48:1/0,i>=e)break;++gr,n=n*e+i}return gr===t||null!=r&&gr-t!==r?null:n}function A(){gr+=2;var e=E(16);return null==e&&t(xr+2,"Expected hexadecimal number"),a(hr.charCodeAt(gr))&&t(gr,"Identifier directly after number"),c(Dr,e)}function S(e){var r=gr,n=!1,o=48===hr.charCodeAt(gr);e||null!==E(10)||t(r,"Invalid number"),46===hr.charCodeAt(gr)&&(++gr,E(10),n=!0);var i=hr.charCodeAt(gr);(69===i||101===i)&&(i=hr.charCodeAt(++gr),(43===i||45===i)&&++gr,null===E(10)&&t(r,"Invalid number"),n=!0),a(hr.charCodeAt(gr))&&t(gr,"Identifier directly after number");var s,u=hr.slice(r,gr);return n?s=parseFloat(u):o&&1!==u.length?/[89]/.test(u)||Fr?t(r,"Invalid number"):s=parseInt(u,8):s=parseInt(u,10),c(Dr,s)}function I(e){gr++;for(var r="";;){gr>=mr&&t(xr,"Unterminated string constant");var n=hr.charCodeAt(gr);if(n===e)return++gr,c(Br,r);if(92===n){n=hr.charCodeAt(++gr);var a=/^[0-7]+/.exec(hr.slice(gr,gr+3));for(a&&(a=a[0]);a&&parseInt(a,8)>255;)a=a.slice(0,a.length-1);if("0"===a&&(a=null),++gr,a)Fr&&t(gr-2,"Octal literal in strict mode"),r+=String.fromCharCode(parseInt(a,8)),gr+=a.length-1;else switch(n){case 110:r+="\n";break;case 114:r+="\r";break;case 120:r+=String.fromCharCode(L(2));break;case 117:r+=String.fromCharCode(L(4));break;case 85:r+=String.fromCharCode(L(8));break;case 116:r+=" ";break;case 98:r+="\b";break;case 118:r+="";break;case 102:r+="\f";break;case 48:r+="\0";break;case 13:10===hr.charCodeAt(gr)&&++gr;case 10:dr.locations&&(Lr=gr,++Ir);break;default:r+=String.fromCharCode(n)}}else(13===n||10===n||8232===n||8329===n)&&t(xr,"Unterminated string constant"),r+=String.fromCharCode(n),++gr}}function L(e){var r=E(16,e);return null===r&&t(xr,"Bad character escape sequence"),r}function U(){Mt=!1;for(var e,r=!0,n=gr;;){var i=hr.charCodeAt(gr);if(o(i))Mt&&(e+=hr.charAt(gr)),++gr;else{if(92!==i)break;Mt||(e=hr.slice(n,gr)),Mt=!0,117!=hr.charCodeAt(++gr)&&t(gr,"Expecting Unicode escape sequence \\uXXXX"),++gr;var s=L(4),c=String.fromCharCode(s);c||t(gr-1,"Invalid Unicode escape"),(r?a(s):o(s))||t(gr-4,"Invalid Unicode escape"),e+=c}r=!1}return Mt?e:hr.slice(n,gr)}function R(){var e=U(),r=jr;return Mt||(Jt(e)?r=ft[e]:(dr.forbidReserved&&(3===dr.ecmaVersion?zt:Xt)(e)||Fr&&Nt(e))&&t(xr,"The keyword '"+e+"' is reserved")),c(r,e)}function T(){Ur=xr,Rr=kr,Tr=Cr,k()}function V(e){Fr=e,gr=Rr,f(),k()}function q(){this.type=null,this.start=xr,this.end=null}function F(){this.start=wr,this.end=null,null!==vr&&(this.source=vr)}function D(){var e=new q;return dr.locations&&(e.loc=new F),dr.ranges&&(e.range=[xr,0]),e}function O(e){var r=new q;return r.start=e.start,dr.locations&&(r.loc=new F,r.loc.start=e.loc.start),dr.ranges&&(r.range=[e.range[0],0]),r}function B(e,r){return e.type=r,e.end=Rr,dr.locations&&(e.loc.end=Tr),dr.ranges&&(e.range[1]=Rr),e}function j(e){return dr.ecmaVersion>=5&&"ExpressionStatement"===e.type&&"Literal"===e.expression.type&&"use strict"===e.expression.value}function M(e){return Er===e?(T(),!0):void 0}function z(){return!dr.strictSemicolons&&(Er===Mr||Er===mt||Qt.test(hr.slice(Rr,xr)))}function X(){M(gt)||z()||W()}function N(e){Er===e?T():W()}function W(){t(xr,"Unexpected token")}function J(e){"Identifier"!==e.type&&"MemberExpression"!==e.type&&t(e.start,"Assigning to rvalue"),Fr&&"Identifier"===e.type&&Wt(e.name)&&t(e.start,"Assigning to "+e.name+" in strict mode")}function P(e){Ur=Rr=gr,dr.locations&&(Tr=new i),Vr=Fr=null,qr=[],k();var r=e||D(),t=!0;for(e||(r.body=[]);Er!==Mr;){var n=$();r.body.push(n),t&&j(n)&&V(!0),t=!1}return B(r,"Program")}function $(){Er===Ct&&k(!0);var e=Er,r=D();switch(e){case zr:case Wr:T();var n=e===zr;M(gt)||z()?r.label=null:Er!==jr?W():(r.label=pr(),X());for(var a=0;qr.length>a;++a){var o=qr[a];if(null==r.label||o.name===r.label.name){if(null!=o.kind&&(n||"loop"===o.kind))break;if(r.label&&n)break}}return a===qr.length&&t(r.start,"Unsyntactic "+e.keyword),B(r,n?"BreakStatement":"ContinueStatement");case Jr:return T(),X(),B(r,"DebuggerStatement");case $r:return T(),qr.push(Zt),r.body=$(),qr.pop(),N(nt),r.test=G(),X(),B(r,"DoWhileStatement");case Kr:if(T(),qr.push(Zt),N(vt),Er===gt)return K(r,null);if(Er===tt){var i=D();return T(),Y(i,!0),1===i.declarations.length&&M(lt)?Q(r,i):K(r,i)}var i=Z(!1,!0);return M(lt)?(J(i),Q(r,i)):K(r,i);case Qr:return T(),lr(r,!0);case Yr:return T(),r.test=G(),r.consequent=$(),r.alternate=M(Gr)?$():null,B(r,"IfStatement");case Zr:return Vr||t(xr,"'return' outside of function"),T(),M(gt)||z()?r.argument=null:(r.argument=Z(),X()),B(r,"ReturnStatement");case _r:T(),r.discriminant=G(),r.cases=[],N(ht),qr.push(_t);for(var s,c;Er!=mt;)if(Er===Xr||Er===Pr){var u=Er===Xr;s&&B(s,"SwitchCase"),r.cases.push(s=D()),s.consequent=[],T(),u?s.test=Z():(c&&t(Ur,"Multiple default clauses"),c=!0,s.test=null),N(xt)}else s||W(),s.consequent.push($());return s&&B(s,"SwitchCase"),T(),qr.pop(),B(r,"SwitchStatement");case et:return T(),Qt.test(hr.slice(Rr,xr))&&t(Rr,"Illegal newline after throw"),r.argument=Z(),X(),B(r,"ThrowStatement");case rt:for(T(),r.block=H(),r.handlers=[];Er===Nr;){var l=D();T(),N(vt),l.param=pr(),Fr&&Wt(l.param.name)&&t(l.param.start,"Binding "+l.param.name+" in strict mode"),N(bt),l.guard=null,l.body=H(),r.handlers.push(B(l,"CatchClause"))}return r.finalizer=M(Hr)?H():null,r.handlers.length||r.finalizer||t(r.start,"Missing catch or finally clause"),B(r,"TryStatement");case tt:return T(),r=Y(r),X(),r;case nt:return T(),r.test=G(),qr.push(Zt),r.body=$(),qr.pop(),B(r,"WhileStatement");case at:return Fr&&t(xr,"'with' in strict mode"),T(),r.object=G(),r.body=$(),B(r,"WithStatement");case ht:return H();case gt:return T(),B(r,"EmptyStatement");default:var f=Ar,p=Z();if(e===jr&&"Identifier"===p.type&&M(xt)){for(var a=0;qr.length>a;++a)qr[a].name===f&&t(p.start,"Label '"+f+"' is already declared");var d=Er.isLoop?"loop":Er===_r?"switch":null;return qr.push({name:f,kind:d}),r.body=$(),qr.pop(),r.label=p,B(r,"LabeledStatement")}return r.expression=p,X(),B(r,"ExpressionStatement")}}function G(){N(vt);var e=Z();return N(bt),e}function H(){var e,r=D(),t=!0,n=!1;for(r.body=[],N(ht);!M(mt);){var a=$();r.body.push(a),t&&j(a)&&(e=n,V(n=!0)),t=!1}return n&&!e&&V(!1),B(r,"BlockStatement")}function K(e,r){return e.init=r,N(gt),e.test=Er===gt?null:Z(),N(gt),e.update=Er===bt?null:Z(),N(bt),e.body=$(),qr.pop(),B(e,"ForStatement")}function Q(e,r){return e.left=r,e.right=Z(),N(bt),e.body=$(),qr.pop(),B(e,"ForInStatement")}function Y(e,r){for(e.declarations=[],e.kind="var";;){var n=D();if(n.id=pr(),Fr&&Wt(n.id.name)&&t(n.id.start,"Binding "+n.id.name+" in strict mode"),n.init=M(Et)?Z(!0,r):null,e.declarations.push(B(n,"VariableDeclarator")),!M(yt))break}return B(e,"VariableDeclaration")}function Z(e,r){var t=_(r);if(!e&&Er===yt){var n=O(t);for(n.expressions=[t];M(yt);)n.expressions.push(_(r));return B(n,"SequenceExpression")}return t}function _(e){var r=er(e);if(Er.isAssign){var t=O(r);return t.operator=Ar,t.left=r,T(),t.right=_(e),J(r),B(t,"AssignmentExpression")}return r}function er(e){var r=rr(e);if(M(wt)){var t=O(r);return t.test=r,t.consequent=Z(!0),N(xt),t.alternate=Z(!0,e),B(t,"ConditionalExpression")}return r}function rr(e){return tr(nr(e),-1,e)}function tr(e,r,t){var n=Er.binop;if(null!=n&&(!t||Er!==lt)&&n>r){var a=O(e);a.left=e,a.operator=Ar,T(),a.right=tr(nr(t),n,t);var a=B(a,/&&|\|\|/.test(a.operator)?"LogicalExpression":"BinaryExpression");return tr(a,r,t)}return e}function nr(e){if(Er.prefix){var r=D(),n=Er.isUpdate;return r.operator=Ar,r.prefix=!0,T(),r.argument=nr(e),n?J(r.argument):Fr&&"delete"===r.operator&&"Identifier"===r.argument.type&&t(r.start,"Deleting local variable in strict mode"),B(r,n?"UpdateExpression":"UnaryExpression")}for(var a=ar();Er.postfix&&!z();){var r=O(a);r.operator=Ar,r.prefix=!1,r.argument=a,J(a),T(),a=B(r,"UpdateExpression")}return a}function ar(){return or(ir())}function or(e,r){if(M(kt)){var t=O(e);return t.object=e,t.property=pr(!0),t.computed=!1,or(B(t,"MemberExpression"),r)}if(M(pt)){var t=O(e);return t.object=e,t.property=Z(),t.computed=!0,N(dt),or(B(t,"MemberExpression"),r)}if(!r&&M(vt)){var t=O(e);return t.callee=e,t.arguments=fr(bt,!1),or(B(t,"CallExpression"),r)}return e}function ir(){switch(Er){case it:var e=D();return T(),B(e,"ThisExpression");case jr:return pr();case Dr:case Br:case Or:var e=D();return e.value=Ar,e.raw=hr.slice(xr,kr),T(),B(e,"Literal");case st:case ct:case ut:var e=D();return e.value=Er.atomValue,e.raw=Er.keyword,T(),B(e,"Literal");case vt:var r=wr,t=xr;T();var n=Z();return n.start=t,n.end=kr,dr.locations&&(n.loc.start=r,n.loc.end=Cr),dr.ranges&&(n.range=[t,kr]),N(bt),n;case pt:var e=D();return T(),e.elements=fr(dt,!0,!0),B(e,"ArrayExpression");case ht:return cr();case Qr:var e=D();return T(),lr(e,!1);case ot:return sr();default:W()}}function sr(){var e=D();return T(),e.callee=or(ir(),!0),e.arguments=M(vt)?fr(bt,!1):[],B(e,"NewExpression")}function cr(){var e=D(),r=!0,n=!1;for(e.properties=[],T();!M(mt);){if(r)r=!1;else if(N(yt),dr.allowTrailingCommas&&M(mt))break;var a,o={key:ur()},i=!1;if(M(xt)?(o.value=Z(!0),a=o.kind="init"):dr.ecmaVersion>=5&&"Identifier"===o.key.type&&("get"===o.key.name||"set"===o.key.name)?(i=n=!0,a=o.kind=o.key.name,o.key=ur(),Er!==vt&&W(),o.value=lr(D(),!1)):W(),"Identifier"===o.key.type&&(Fr||n))for(var s=0;e.properties.length>s;++s){var c=e.properties[s];if(c.key.name===o.key.name){var u=a==c.kind||i&&"init"===c.kind||"init"===a&&("get"===c.kind||"set"===c.kind);u&&!Fr&&"init"===a&&"init"===c.kind&&(u=!1),u&&t(o.key.start,"Redefinition of property")}}e.properties.push(o)}return B(e,"ObjectExpression")}function ur(){return Er===Dr||Er===Br?ir():pr(!0)}function lr(e,r){Er===jr?e.id=pr():r?W():e.id=null,e.params=[];var n=!0;for(N(vt);!M(bt);)n?n=!1:N(yt),e.params.push(pr());var a=Vr,o=qr;if(Vr=!0,qr=[],e.body=H(!0),Vr=a,qr=o,Fr||e.body.body.length&&j(e.body.body[0]))for(var i=e.id?-1:0;e.params.length>i;++i){var s=0>i?e.id:e.params[i];if((Nt(s.name)||Wt(s.name))&&t(s.start,"Defining '"+s.name+"' in strict mode"),i>=0)for(var c=0;i>c;++c)s.name===e.params[c].name&&t(s.start,"Argument name clash in strict mode")}return B(e,r?"FunctionDeclaration":"FunctionExpression")}function fr(e,r,t){for(var n=[],a=!0;!M(e);){if(a)a=!1;else if(N(yt),r&&dr.allowTrailingCommas&&M(e))break;t&&Er===yt?n.push(null):n.push(Z(!0))}return n}function pr(e){var r=D();return r.name=Er===jr?Ar:e&&!dr.forbidReserved&&Er.keyword||W(),T(),B(r,"Identifier")}e.version="0.1.01";var dr,hr,mr,vr;e.parse=function(e,t){return hr=e+"",mr=hr.length,r(t),s(),P(dr.program)};var br=e.defaultOptions={ecmaVersion:5,strictSemicolons:!1,allowTrailingCommas:!0,forbidReserved:!1,locations:!1,onComment:null,ranges:!1,program:null,sourceFile:null},yr=e.getLineInfo=function(e,r){for(var t=1,n=0;;){Yt.lastIndex=n;var a=Yt.exec(e);if(!(a&&r>a.index))break;++t,n=a.index+a[0].length}return{line:t,column:r-n}};e.tokenize=function(e,t){function n(e){return k(e),a.start=xr,a.end=kr,a.startLoc=wr,a.endLoc=Cr,a.type=Er,a.value=Ar,a}hr=e+"",mr=hr.length,r(t),s();var a={};return n.jumpTo=function(e,r){if(gr=e,dr.locations){Ir=Lr=Yt.lastIndex=0;for(var t;(t=Yt.exec(hr))&&e>t.index;)++Ir,Lr=t.index+t[0].length}hr.charAt(e-1),Sr=r,f()},n};var gr,xr,kr,wr,Cr,Er,Ar,Sr,Ir,Lr,Ur,Rr,Tr,Vr,qr,Fr,Dr={type:"num"},Or={type:"regexp"},Br={type:"string"},jr={type:"name"},Mr={type:"eof"},zr={keyword:"break"},Xr={keyword:"case",beforeExpr:!0},Nr={keyword:"catch"},Wr={keyword:"continue"},Jr={keyword:"debugger"},Pr={keyword:"default"},$r={keyword:"do",isLoop:!0},Gr={keyword:"else",beforeExpr:!0},Hr={keyword:"finally"},Kr={keyword:"for",isLoop:!0},Qr={keyword:"function"},Yr={keyword:"if"},Zr={keyword:"return",beforeExpr:!0},_r={keyword:"switch"},et={keyword:"throw",beforeExpr:!0},rt={keyword:"try"},tt={keyword:"var"},nt={keyword:"while",isLoop:!0},at={keyword:"with"},ot={keyword:"new",beforeExpr:!0},it={keyword:"this"},st={keyword:"null",atomValue:null},ct={keyword:"true",atomValue:!0},ut={keyword:"false",atomValue:!1},lt={keyword:"in",binop:7,beforeExpr:!0},ft={"break":zr,"case":Xr,"catch":Nr,"continue":Wr,"debugger":Jr,"default":Pr,"do":$r,"else":Gr,"finally":Hr,"for":Kr,"function":Qr,"if":Yr,"return":Zr,"switch":_r,"throw":et,"try":rt,"var":tt,"while":nt,"with":at,"null":st,"true":ct,"false":ut,"new":ot,"in":lt,"instanceof":{keyword:"instanceof",binop:7,beforeExpr:!0},"this":it,"typeof":{keyword:"typeof",prefix:!0,beforeExpr:!0},"void":{keyword:"void",prefix:!0,beforeExpr:!0},"delete":{keyword:"delete",prefix:!0,beforeExpr:!0}},pt={type:"[",beforeExpr:!0},dt={type:"]"},ht={type:"{",beforeExpr:!0},mt={type:"}"},vt={type:"(",beforeExpr:!0},bt={type:")"},yt={type:",",beforeExpr:!0},gt={type:";",beforeExpr:!0},xt={type:":",beforeExpr:!0},kt={type:"."},wt={type:"?",beforeExpr:!0},Ct={binop:10,beforeExpr:!0},Et={isAssign:!0,beforeExpr:!0},At={isAssign:!0,beforeExpr:!0},St={binop:9,prefix:!0,beforeExpr:!0},It={postfix:!0,prefix:!0,isUpdate:!0},Lt={prefix:!0,beforeExpr:!0},Ut={binop:1,beforeExpr:!0},Rt={binop:2,beforeExpr:!0},Tt={binop:3,beforeExpr:!0},Vt={binop:4,beforeExpr:!0},qt={binop:5,beforeExpr:!0},Ft={binop:6,beforeExpr:!0},Dt={binop:7,beforeExpr:!0},Ot={binop:8,beforeExpr:!0},Bt={binop:10,beforeExpr:!0};e.tokTypes={bracketL:pt,bracketR:dt,braceL:ht,braceR:mt,parenL:vt,parenR:bt,comma:yt,semi:gt,colon:xt,dot:kt,question:wt,slash:Ct,eq:Et,name:jr,eof:Mr,num:Dr,regexp:Or,string:Br};for(var jt in ft)e.tokTypes[jt]=ft[jt];var Mt,zt=n("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile"),Xt=n("class enum extends super const export import"),Nt=n("implements interface let package private protected public static yield"),Wt=n("eval arguments"),Jt=n("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this"),Pt=/[\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]/,$t="\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc",Gt="\u0371-\u0374\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f",Ht=RegExp("["+$t+"]"),Kt=RegExp("["+$t+Gt+"]"),Qt=/[\n\r\u2028\u2029]/,Yt=/\r\n|[\n\r\u2028\u2029]/g,Zt={kind:"loop"},_t={kind:"switch"}})("undefined"==typeof exports?self.acorn={}:exports);

  var PaperScript = this.PaperScript = new function() {
    // Operators to overload

    var binaryOperators = {
      '+': 'add',
      '-': 'subtract',
      '*': 'multiply',
      '/': 'divide',
      '%': 'modulo',
      '==': 'equals',
      '!=': 'equals'
    };

    var unaryOperators = {
      '-': 'negate',
      '+': null
    };

    // Use very short name for the binary operator (_$_) as well as the
    // unary operator ($_), as operations will be replaced with then.
    // The underscores stands for the values, and the $ for the operators.

    // Binary Operator Handler
    function _$_(left, operator, right) {
      var handler = binaryOperators[operator];
      if (left && left[handler]) {
        var res = left[handler](right);
        return operator === '!=' ? !res : res;
      }
      switch (operator) {
      case '+': return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/': return left / right;
      case '%': return left % right;
      case '==': return left == right;
      case '!=': return left != right;
      }
    }

    // Unary Operator Handler
    function $_(operator, value) {
      var handler = unaryOperators[operator];
      if (handler && value && value[handler])
        return value[handler]();
      switch (operator) {
      case '+': return +value;
      case '-': return -value;
      }
    }

    // AST Helpers

    /**
     * Compiles PaperScript code into JavaScript code.
     *
     * @name PaperScript.compile
     * @function
     * @param {String} code The PaperScript code.
     * @return {String} The compiled PaperScript as JavaScript code.
     */
    function compile(code) {
      // Use Acorn or Esprima to translate the code into an AST structure
      // which is then walked and parsed for operators to overload.
      // Instead of modifying the AST and converting back to code, we directly
      // change the source code based on the parser's range information, so we

      var insertions = [];

      function getOffset(offset) {
        var start = offset;
        for (var i = 0, l = insertions.length; i < l; i++) {
          var insertion = insertions[i];
          if (insertion[0] >= offset)
            break;
          offset += insertion[1];
        }
        return offset;
      }

      function getCode(node) {
        return code.substring(getOffset(node.range[0]),
            getOffset(node.range[1]));
      }

      function replaceCode(node, str) {
        var start = getOffset(node.range[0]),
          end = getOffset(node.range[1]);
        var insert = 0;
        for (var i = insertions.length - 1; i >= 0; i--) {
          if (start > insertions[i][0]) {
            insert = i + 1;
            break;
          }
        }
        insertions.splice(insert, 0, [start, str.length - end + start]);
        code = code.substring(0, start) + str + code.substring(end);
      }

      function walkAst(node) {
        for (var key in node) {
          if (key === 'range')
            continue;
          var value = node[key];
          if (Array.isArray(value)) {
            for (var i = 0, l = value.length; i < l; i++)
              walkAst(value[i]);
          } else if (value && typeof value === 'object') {
            walkAst(value);
          }
        }
        switch (node && node.type) {
        case 'BinaryExpression':
          if (node.operator in binaryOperators
              && node.left.type !== 'Literal') {
            var left = getCode(node.left),
              right = getCode(node.right);
            replaceCode(node, '_$_(' + left + ', "' + node.operator
                + '", ' + right + ')');
          }
          break;
        case 'AssignmentExpression':
          if (/^.=$/.test(node.operator)
              && node.left.type !== 'Literal') {
            var left = getCode(node.left),
              right = getCode(node.right);
            replaceCode(node, left + ' = _$_(' + left + ', "'
                + node.operator[0] + '", ' + right + ')');
          }
          break;
        case 'UpdateExpression':
          if (!node.prefix) {
            var arg = getCode(node.argument);
            replaceCode(node, arg + ' = _$_(' + arg + ', "'
                + node.operator[0] + '", 1)');
          }
          break;
        case 'UnaryExpression':
          if (node.operator in unaryOperators
              && node.argument.type !== 'Literal') {
            var arg = getCode(node.argument);
            replaceCode(node, '$_("' + node.operator + '", '
                + arg + ')');
          }
          break;
        }
      }
      walkAst(acorn.parse(code, { ranges: true }));
      return code;
    }

    function evaluate(code, scope) {
      paper = scope;
      var view = scope.project && scope.project.view,
        res;
      with (scope) {
        (function() {
          var onActivate, onDeactivate, onEditOptions,
            onMouseDown, onMouseUp, onMouseDrag, onMouseMove,
            onKeyDown, onKeyUp, onFrame, onResize;
          res = eval(compile(code));
          if (/on(?:Key|Mouse)(?:Up|Down|Move|Drag)/.test(code)) {
            Base.each(Tool.prototype._events, function(key) {
              var value = eval(key);
              if (value) {
                scope.getTool()[key] = value;
              }
            });
          }
          if (view) {
            view.setOnResize(onResize);
            view.fire('resize', {
              size: view.size,
              delta: new Point()
            });
            view.setOnFrame(onFrame);
            view.draw();
          }
        }).call(scope);
      }
      return res;
    }

    function request(url, scope) {
      var xhr = new (window.ActiveXObject || XMLHttpRequest)(
          'Microsoft.XMLHTTP');
      xhr.open('GET', url, true);
      if (xhr.overrideMimeType)
        xhr.overrideMimeType('text/plain');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          return evaluate(xhr.responseText, scope);
        }
      };
      return xhr.send(null);
    }

    function load() {
      var scripts = document.getElementsByTagName('script');
      for (var i = 0, l = scripts.length; i < l; i++) {
        var script = scripts[i];
        if (/^text\/(?:x-|)paperscript$/.test(script.type)
            && !script.getAttribute('data-paper-ignore')) {
          var canvas = PaperScript.getAttribute(script, 'canvas'),
            scope = PaperScope.get(canvas)
                || new PaperScope(script).setup(canvas);
          if (script.src) {
            request(script.src, scope);
          } else {
            evaluate(script.innerHTML, scope);
          }
          script.setAttribute('data-paper-ignore', true);
        }
      }
    }

    if (document.readyState === 'complete') {
      setTimeout(load);
    } else {
      DomEvent.add(window, { load: load });
    }

    function handleAttribute(name) {
      name += 'Attribute';
      return function(el, attr) {
        return el[name](attr) || el[name]('data-paper-' + attr);
      };
    }

    return {
      compile: compile,
      evaluate: evaluate,
      load: load,
      getAttribute: handleAttribute('get'),
      hasAttribute: handleAttribute('has')
    };

  };

  this.enumerable = true;
  return new (PaperScope.inject(this));
  };
}

function loadFroogaLoop() {

  window.Froogaloop=function(){function e(a){return new e.fn.init(a)}function h(a,c,b){if(!b.contentWindow.postMessage)return!1;var f=b.getAttribute("src").split("?")[0],a=JSON.stringify({method:a,value:c});"//"===f.substr(0,2)&&(f=window.location.protocol+f);b.contentWindow.postMessage(a,f)}function j(a){var c,b;try{c=JSON.parse(a.data),b=c.event||c.method}catch(f){}"ready"==b&&!i&&(i=!0);if(a.origin!=k)return!1;var a=c.value,e=c.data,g=""===g?null:c.player_id;c=g?d[g][b]:d[b];b=[];if(!c)return!1;void 0!==
  a&&b.push(a);e&&b.push(e);g&&b.push(g);return 0<b.length?c.apply(null,b):c.call()}function l(a,c,b){b?(d[b]||(d[b]={}),d[b][a]=c):d[a]=c}var d={},i=!1,k="";e.fn=e.prototype={element:null,init:function(a){"string"===typeof a&&(a=document.getElementById(a));this.element=a;a=this.element.getAttribute("src");"//"===a.substr(0,2)&&(a=window.location.protocol+a);for(var a=a.split("/"),c="",b=0,f=a.length;b<f;b++){if(3>b)c+=a[b];else break;2>b&&(c+="/")}k=c;return this},api:function(a,c){if(!this.element||
  !a)return!1;var b=this.element,f=""!==b.id?b.id:null,d=!c||!c.constructor||!c.call||!c.apply?c:null,e=c&&c.constructor&&c.call&&c.apply?c:null;e&&l(a,e,f);h(a,d,b);return this},addEvent:function(a,c){if(!this.element)return!1;var b=this.element,d=""!==b.id?b.id:null;l(a,c,d);"ready"!=a?h("addEventListener",a,b):"ready"==a&&i&&c.call(null,d);return this},removeEvent:function(a){if(!this.element)return!1;var c=this.element,b;a:{if((b=""!==c.id?c.id:null)&&d[b]){if(!d[b][a]){b=!1;break a}d[b][a]=null}else{if(!d[a]){b=
  !1;break a}d[a]=null}b=!0}"ready"!=a&&b&&h("removeEventListener",a,c)}};e.fn.init.prototype=e.fn;window.addEventListener?window.addEventListener("message",j,!1):window.attachEvent("onmessage",j);return window.Froogaloop=window.$f=e}();

}
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



i18n.load('ar', {
  'add_image' : 'إضافة صورة',
  'add_sound' : 'إضافة مقطع صوتي',
  'add_video' : 'إضافة مقطع فيديو',
  'edit'      : 'تحرير',
  'remove'    : 'إزالة',
  'rotate'    : 'تدوير',
  'resize'    : 'تغيير الحجم',
  'error'     : 'حدث خطأ',
  'error_timeout_sound' : "المعذرة، هذا المقطع الصوتي غير متوفر",
  'error_nolibrary_sound' : "المعذرة، هذه المكتبة غير متوفرة"
});

i18n.load('de', {
  'add_image' : 'Bild hinzufügen',
  'add_sound' : 'Sound hinzufügen',
  'add_video' : 'Video hinzufügen',
  'edit'      : 'Bearbeiten',
  'remove'    : 'Entfernen',
  'rotate'    : 'Drehen',
  'resize'    : 'Grösse verändern',
  'error'     : 'Fehler aufgetreten',
  'error_timeout_sound' : "Sorry, dieser Sound ist nicht verfügbar",
  'error_nolibrary_sound' : "Sorry, die Bibliothek ist nicht verfügbar"
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


i18n.load('es', {
  'add_image' : 'Agregar imagen',
  'add_sound' : 'Agregar sonido',
  'add_video' : 'Agregar video',
  'edit'      : 'Editar',
  'remove'    : 'Eliminar',
  'rotate'    : 'Rotar',
  'resize'    : 'Cambiar tamaño',
  'error'     : 'Ocurrió un error',
  'error_timeout_sound' : "Lo siento, este sonido no está disponible",
  'error_nolibrary_sound' : "Lo siento, la librería no está disponible"
});

i18n.load('fr', {
  'add_image' : 'Ajouter une image',
  'add_sound' : 'Ajouter un son',
  'add_video' : 'Ajouter une vidéo',
  'edit'      : 'Modifier',
  'remove'    : 'Supprimer',
  'rotate'    : 'Rotation',
  'resize'    : 'Redimensionner',
  'error'     : 'Une erreur est survenue',
  'error_timeout_sound' : "Désolé, ce son n’est pas disponible",
  'error_nolibrary_sound' : "Désolé, la librairie n’est pas disponible"
});

i18n.load('hi', {
  'add_image' : "चित्र जोड़ें",
  'add_sound' : "ध्वनि जोड़ें",
  'add_video' : "वीडियो जोड़े",
  'edit'      : "संपादित करें",
  'remove'    : "हटाएँ",
  'rotate'    : "घुमाओ",
  'resize'    : "आकार बदलो",
  'error'     : "एक त्रुटि आ गई है",
  'error_timeout_sound' : "क्षमा करें, यह ध्वनि उपलब्ध नही है",
  'error_nolibrary_sound' : "क्षमा करें, यह लाइब्रेरी उपलब्ध नही है"
});

i18n.load('it', {
  'add_image' : 'Aggiungi immagine',
  'add_sound' : 'Aggiungi suono',
  'add_video' : 'Aggiungi video',
  'edit'      : 'Modifica',
  'remove'    : 'Rimuovi',
  'rotate'    : 'Ruota',
  'resize'    : 'Ridimensiona',
  'error'     : 'Si è verificato un errore',
  'error_timeout_sound' : "Spiacenti, questo suono non è disponibile",
  'error_nolibrary_sound' : "Spiacenti, la libreria non è disponibile"
});

i18n.load('nl', {
  'add_image' : 'Afbeelding toevoegen',
  'add_sound' : 'Geluid toevoegen',
  'add_video' : 'Video toevoegen',
  'edit'      : 'Bewerken',
  'remove'    : 'Verwijderen',
  'rotate'    : 'Roteren',
  'resize'    : 'Formaat wijzigen',
  'error'     : 'Fout opgetreden',
  'error_timeout_sound' : "Sorry, dit geluid is niet beschikbaar",
  'error_nolibrary_sound' : "Sorry, deze bibliotheek is niet beschikbaar"
});

i18n.load('pt', {
  'add_image' : 'Adicionar imagem',
  'add_sound' : 'Adicionar som',
  'add_video' : 'Adicionar vídeo',
  'edit'      : 'Editar',
  'remove'    : 'Remover',
  'rotate'    : 'Rotacionar',
  'resize'    : 'Redimensionar',
  'error'     : 'Um erro ocorreu',
  'error_timeout_sound' : "Desculpe, esse som está indisponível",
  'error_nolibrary_sound' : "Desculpe, a biblioteca está indisponível"
});

i18n.load('ru', {
  'add_image' : 'Добавить изображение',
  'add_sound' : 'Добавить звук',
  'add_video' : 'Добавить видео',
  'edit'      : 'Редактировать',
  'remove'    : 'Передвинуть',
  'rotate'    : 'Вращать',
  'resize'    : 'Изменить размер',
  'error'     : 'Произошла ошибка',
  'error_timeout_sound' : "К сожалению, этот звук не доступен",
  'error_nolibrary_sound' : "К сожалению, библиотека не доступна"
});


i18n.load('th', {
  'add_image' : 'เพิ่มรูป',
  'add_sound' : 'เพิ่มเสียง',
  'add_video' : 'เพิ่มวิดีโอ',
  'edit'      : 'ตัดแต่ง',
  'remove'    : 'ลบออก',
  'rotate'    : 'หมุน',
  'resize'    : 'ปรับขนาด',
  'error'     : 'เกิดข้อผิดพลาด',
  'error_timeout_sound' : "ขอโทษ ไม่สามารถใช้เสียงนี้ได้",
  'error_nolibrary_sound' : "ขอโทษ ไม่สามารถใช้ห้องสมุดนี้ได้"
});

i18n.load('zh', {
  'add_image' : '添加图片',
  'add_sound' : '添加声音',
  'add_video' : '添加视频',
  'edit'      : '编辑',
  'remove'    : '清除',
  'rotate'    : '旋转',
  'resize'    : '改变尺寸',
  'error'     : '发生错误',
  'error_timeout_sound' : "对不起,这个声音不可用",
  'error_nolibrary_sound' : "对不起,搜索结果面板不可用"
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
    return states && states.apiVersion || '1.3.4-alpha26';
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

    postInstance.track('expression - loaded', {});
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
      
      this.track('expression - dialog start', {dialog : type});

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
        _this.track('expression - dialog over', {dialog : type});
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
     * Push a navigation state for right button (next)
     * @param  {String}   state    The state to push : 'default', 'back', 'cancel'
     * @param  {Function} callback The function called when this state is clicked
     */
    var pushNavigationRight = this.pushNavigationRight = function(state, callback) {
      UT.Expression._callAPI('container.pushNavigationRight', [state], callback);
    };


    /**
     * Pop the current right navigation state
     */
    var popNavigationRight = this.popNavigationRight = function() {
      UT.Expression._callAPI('container.popNavigationRight');
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

    var isNativeApp = this.isNativeApp = function() {
      // Mobiel hotfix
      if (states.behaviors.navigate.browseStrategy === 'api') {
        return true;
      }
      return false;
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


    /*
      For A/B Testing
     */
    var track = this.track = function (eventName, eventParams) { 
      if (!eventParams) {
        eventParams = {};
      }
      eventParams.expression = states.expression_system_name;
      eventParams.expressionAPI = states.expression_api_version;
      eventParams.expression = states.expression_system_name;
      
      UT.Expression._callAPI('document.track', [eventName, eventParams], function(){});
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
function loadFilterUTImage() {
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

            amplitudeR: filter.parameters.amplitudeR || 1.0,
            amplitudeG: filter.parameters.amplitudeG || 1.0,
            amplitudeB: filter.parameters.amplitudeB || 1.0,
          

            exponentR: filter.parameters.exponentR || 1.0,
            exponentG: filter.parameters.exponentG || 1.0,
            exponentB: filter.parameters.exponentB || 1.0,
          

            vignette:   filter.parameters.vignette
          };
        }
        var filtersStr =
          '<filter id="blackAndWhite" x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">' +
            '<feColorMatrix id="saturation-0" result="flt1" values="'+ filterValues.saturation+'"/>' +
            '<feComponentTransfer in="flt1" result="flt2">' +
            '<feFuncR type="gamma" id="redChannel-0"   amplitude="' + filterValues.amplitudeR + '" exponent="' + filterValues.exponentR + '" offset="'+ filterValues.gammaR+'"/>' +
            '<feFuncG type="gamma" id="greenChannel-0" amplitude="' + filterValues.amplitudeG + '" exponent="' + filterValues.exponentG + '" offset="'+ filterValues.gammaG+'"/>' +
            '<feFuncB type="gamma" id="blueChannel-0"  amplitude="' + filterValues.amplitudeB + '" exponent="' + filterValues.exponentB + '" offset="'+ filterValues.gammaB+'"/>' +
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
                amplitudeR: filterData.parameters.amplitudeR,
                exponentR: filterData.parameters.exponentR,
                offsetR: filterData.parameters.gammaR,
                amplitudeG: filterData.parameters.amplitudeG,
                exponentG: filterData.parameters.exponentG,
                offsetG: filterData.parameters.gammaG,
                amplitudeB: filterData.parameters.amplitudeB,
                exponentB: filterData.parameters.exponentB,
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
}
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

function loadUTImage() {
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
}

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

function loadUTAudio() {
// DEPENDENCIES
loadJPlayer();
loadUTAudioEngine();


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
            add:         "add sound",
            change:      "",
            error:       "Error occurred",
            dialogLabel: undefined
          }
        };

        if(!that.post && UT && UT.Expression && UT.Expression.ready){
          UT.Expression.ready(function(post){
            that.post = post;
            if(that.initialized) {
              setTimeout(function() {
                that.update();
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

        that.seek = function(pos) {
          if(that.currents.state === 'play' || that.currents.state === 'pause'){
            $that.utAudioEngine("seek", pos);
          }
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
              duration:    data.duration,
              artist:      (data.user && data.user.username ? data.user.username : ""),
              trackName:   data.title
            };
          } else if(that.getServiceName() === 'itunes') {
            that.currents.serviceData = {
              title:       data.artistName + ' - ' + data.trackName,
              source:      data.trackViewUrl,
              artwork_url: (data.artworkUrl100 ? data.artworkUrl100 : '').replace("100x100","600x600"),
              duration:    30000,
              artist:      data.artistName,
              trackName:   data.trackName
            };
          }
          that.currents.serviceData.service_name = that.getServiceName();
        };

        that.requestServiceData = function(callback) {
          var errorTimeOut = setTimeout(function(){
            if(that && (!that.currents || !that.currents.serviceData)){
              that.setState('error', "We can't get data to play this track in 15 sec");
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
//            autoPause: that.options.styles.autoPause,
            onReady: function() {
              that.setPlayPos(0);
            },
            onPlay: function() {
//              if(that.post && that.post.stopAllOther && that.options.styles.autoPause) {
//                that.post.stopAllOther();
//              }
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
//                if(that.post && that.post.stopAllOther && that.options.styles.autoPause) {
//                  that.post.stopAllOther();
//                }
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
            that.setState("error", "Sound Player !!! The library not found.");
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
                                .html(that.options.i18n.add)
                                .appendTo(that.ui.container)
                                .on('click', that.onAddClick);
            that.ui.remove  = $('<a class="'+that.uiNS+'-remove icon_trash"></a>')
                                .html(that.options.i18n.change)
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
          if(that.post && that.post.stopAllOther && that.options.styles.autoPause) {
            that.post.stopAllOther();
          }

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

        that.initialized = true;
        if(that.post) {
          setTimeout(function() {
            that.update();
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

    seek: function(pos) {
      this.each(function() {
        if(this.utAudio) {
          this.utAudio.seek.call(this, pos);
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
}

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

function loadUTAudioEngine() {
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
            supplied: that.options.type,
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
              if(that.options.autoPlay) {
                if(that.environment.flash){
                  that.player.jPlayer('play');
                } else {
                  that.doOnCanPlay = function(){
                    that.player.jPlayer('play');
                  };
                }
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
}

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

function loadUTVideo() {
  loadFroogaLoop();
(function (UT, $) {
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

        that.options = $.extend(true, defaults, opts);
        if(that.options.manualMode) {
          that.options.editable = false;
          that.options.styles.listenMedia = false;
          that.post = {
            storage: [],
            on: function() {},
            off: function() {},
            save: function() {},
            context: {player:true}
          };
        }

        if(!that.post && window.UT && UT.Expression && UT.Expression.ready) {
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
        // TODO do it for all touch devices now :P
        that.isMobileSafari = that.isTouch;//!!(window.navigator.userAgent.match(/(iPod|iPhone|iPad)/) && window.navigator.userAgent.match(/AppleWebKit/));
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
            that.autoplay = that.options.autoPlay || !that.isMobileSafari;

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
                    if(that.autoplay) { /*!that.isMobileSafari*/
                      event.target.playVideo();
                    }
                  };

                  that.onPlayerStateChange = function(event) {
                    if (event.data === window.YT.PlayerState.PLAYING) {
//                      that.pauseOtherPlayers();
                      $that.trigger(events.play);
                      that.setState("play");
                    }

                    if (event.data === window.YT.PlayerState.ENDED) {
                      that.utStop();
                      player.stopVideo();
                      player.destroy();
                      player = null;
                      $that.trigger(events.finish);
                    }

                    if (event.data === window.YT.PlayerState.PAUSED) {
                      $that.trigger(events.pause);
                      that.setState("pause");
                    }

//                    if (event.data === window.YT.PlayerState.BUFFERING) {}
                  };


                  var playerVars = that.options.ui.playing?null:{controls:0,showinfo:0};

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
//                    that.pauseOtherPlayers();
                    $that.trigger(events.play);
                  });

                  window.Froogaloop(playerID).addEvent('finish', function () {
                    $that.trigger(events.finish);
                    that.utStop();
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
                that.ui.video.empty();
                var container = jQuery("<div>").appendTo(that.ui.video);
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
//                    that.pauseOtherPlayers();
                    if(that.autoplay) {
                      $that.trigger(events.play);
                    }
                    e.target.addEventListener("ended", function () {
                      $that.trigger(events.finish);
                      that.utStop();
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
                  var thumbs = data["media$group"]["media$thumbnail"];
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
                  param.views = ((data["yt$statistics"] && data["yt$statistics"].viewCount) ? data["yt$statistics"].viewCount : 0);
                  param.title = data.title ? data.title["$t"] : "";
                  param.author = data.author && data.author[0] && data.author[0].name && data.author[0].name["$t"] ? data.author[0].name["$t"] : "";
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
                  param.author = data.user_name || "";
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
                  param.author = data.author_name || "";
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
                    param.author = data.author_name || "";
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
//          var list = $(".ut-video");
//          $.each(list, function(i, v) {
//            if(v !== $that[0]) {
//              $(v).utVideo("pause");
//            }
//          });
          if(that.post && that.post.stopAllOther) {
            that.post.stopAllOther();
          }
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
            if(that.isMobileSafari){
              that.utPlay();
            } else {
              that.updatePreViewVideoData();
              if(!that.autoplay) {
                that.setState('launch');
              }
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
          that.pauseOtherPlayers();
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
            label: that.options.i18n.dialogLabel
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
})(UT, window.$ || window.Zepto || window.jq);
}

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

function loadUTText() {
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
}
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
function loadUTSticker() {
(function( UT, $, window, document, undefined ) {
  "use strict";

  var ___UT_STICKER_MANIPULATED = false;

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
              UT.Expression._postInstance().track('sticker - added sticker', {});
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
              .addClass("ut-sticker-button ut-sticker-button-rotate icon_fullscreen")
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

        that.preventButtonEvents = null;
        that.onButtonDown = function(e) {
          that.preventButtonEvents = $(this).attr("data-bkey");
          e.stopPropagation();
        };

        that.onButtonUp = function(e) {
          if(!that.preventButtonEvents || that.preventButtonEvents !== $(this).attr("data-bkey")) {
            that.preventButtonEvents = null;
            return;
          }
          that.preventButtonEvents = null;
          if(e.type === "mouseup") {
            e.stopPropagation();
          }
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
          UT.Expression._postInstance().track('sticker - destroyed', {});
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
            if((nww / that.pos.ratio) < nhh) {
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
            left: that.pos.left * that.data.parentWidth,
            top: that.pos.top * that.data.parentHeight,
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

            if (!___UT_STICKER_MANIPULATED) {
              ___UT_STICKER_MANIPULATED = true;
              UT.Expression._postInstance().track('sticker - manipulated', {});
            }
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
            UT.Expression._postInstance().track('sticker - changed', {});
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

            if (!___UT_STICKER_MANIPULATED) {
              ___UT_STICKER_MANIPULATED = true;
              UT.Expression._postInstance().track('sticker - manipulated', {});
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

            if (!___UT_STICKER_MANIPULATED) {
              ___UT_STICKER_MANIPULATED = true;
              UT.Expression._postInstance().track('sticker - manipulated', {});
            }

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

            if (!___UT_STICKER_MANIPULATED) {
              ___UT_STICKER_MANIPULATED = true;
              UT.Expression._postInstance().track('sticker - manipulated', {});
            }
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
          
          if(that.options.styles.topOnFocus && isChangeZIndex) {
            that.pos.zIndex = window.utStickerLastZIndex++;
            $that[0].style.zIndex = that.pos.zIndex;
            $content.trigger(events.change, that._getCurrentData());
          }

          $that.trigger(events.focus, that.options.id);
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
}
function loadAntiScroll() {

  /*
  ANTISCROLL
  https://github.com/LearnBoost/antiscroll

  CUSTOM VERSION BY
  Benoît Burgener

  Look for "CUSTOM" in the code.
  */

  (function ($) {

    /**
     * Augment jQuery prototype.
     */

    $.fn.antiscroll = function (options) {
      return this.each(function () {
        // CUSTOM
        // Rebuild and return instead of Destroy
        if ($(this).data('antiscroll')) {
          $(this).data('antiscroll').rebuild();
          return;
        }

        $(this).data('antiscroll', new $.Antiscroll(this, options));
      });
    };

    /**
     * Expose constructor.
     */

    $.Antiscroll = Antiscroll;

    /**
     * Antiscroll pane constructor.
     *
     * @param {Element|jQuery} main pane
     * @parma {Object} options
     * @api public
     */

    function Antiscroll (el, opts) {
      this.el = $(el);
      this.options = opts || {};

      // CUSTOM
      // this.x = (false !== this.options.x) || this.options.forceHorizontal;
      this.x = false; // Always hide horizontal scroll
      this.y = (false !== this.options.y) || this.options.forceVertical;
      this.autoHide = false !== this.options.autoHide;
      this.padding = undefined === this.options.padding ? 2 : this.options.padding;

      this.inner = this.el.find('.antiscroll-inner');
      /* CUSTOM */
      /* Don't add space to hide scrollbar multiple times */
      if (this.inner.outerWidth() <= this.el.outerWidth()) {
        this.inner.css({
          'width':  '+=' + (this.y ? scrollbarSize() : 0)
          // 'height': '+=' + (this.x ? scrollbarSize() : 0)
        });
      }

      var cssMap = {};
      if (this.x) cssMap.width = '+=' + scrollbarSize();
      // if (this.y) cssMap.height = '+=' + scrollbarSize();
      this.inner.css(cssMap);

      this.refresh();
    }

    /**
     * refresh scrollbars
     *
     * @api public
     */

    Antiscroll.prototype.refresh = function() {
      var needHScroll = this.inner.get(0).scrollWidth > this.el.width() + (this.y ? scrollbarSize() : 0),
          needVScroll = this.inner.get(0).scrollHeight > this.el.height() + (this.x ? scrollbarSize() : 0);

      if (this.x) {
        if (!this.horizontal && needHScroll) {
          this.horizontal = new Scrollbar.Horizontal(this);
        } else if (this.horizontal && !needHScroll)  {
          this.horizontal.destroy();
          this.horizontal = null;
        } else if (this.horizontal) {
          this.horizontal.update();
        }
      }

      if (this.y) {
        if (!this.vertical && needVScroll) {
          this.vertical = new Scrollbar.Vertical(this);
        } else if (this.vertical && !needVScroll)  {
          this.vertical.destroy();
          this.vertical = null;
        } else if (this.vertical) {
          this.vertical.update();
        }
      }
    };

    /**
     * Cleans up.
     *
     * @return {Antiscroll} for chaining
     * @api public
     */

    Antiscroll.prototype.destroy = function () {
      if (this.horizontal) {
        this.horizontal.destroy();
        this.horizontal = null;
      }
      if (this.vertical) {
        this.vertical.destroy();
        this.vertical = null;
      }
      return this;
    };

    /**
     * Rebuild Antiscroll.
     *
     * @return {Antiscroll} for chaining
     * @api public
     */

    Antiscroll.prototype.rebuild = function () {
      this.destroy();
      // CUSTOM
      // this.inner.attr('style', '');
      Antiscroll.call(this, this.el, this.options);
      return this;
    };

    /**
     * Scrollbar constructor.
     *
     * @param {Element|jQuery} element
     * @api public
     */

    function Scrollbar (pane) {
      this.pane = pane;
      this.pane.el.append(this.el);
      this.innerEl = this.pane.inner.get(0);

      this.dragging = false;
      this.enter = false;
      this.shown = false;

      // hovering
      this.pane.el.mouseenter($.proxy(this, 'mouseenter'));
      this.pane.el.mouseleave($.proxy(this, 'mouseleave'));

      // dragging
      this.el.mousedown($.proxy(this, 'mousedown'));

      // scrolling
      this.innerPaneScrollListener = $.proxy(this, 'scroll');
      this.pane.inner.scroll(this.innerPaneScrollListener);

      // wheel -optional-
      this.innerPaneMouseWheelListener = $.proxy(this, 'mousewheel');
      this.pane.inner.bind('mousewheel', this.innerPaneMouseWheelListener);

      // show
      var initialDisplay = this.pane.options.initialDisplay;

      if (initialDisplay !== false) {
        this.show();
        if (this.pane.autoHide) {
            this.hiding = setTimeout($.proxy(this, 'hide'), parseInt(initialDisplay, 10) || 3000);
        }
      }
    }

    /**
     * Cleans up.
     *
     * @return {Scrollbar} for chaining
     * @api public
     */

    Scrollbar.prototype.destroy = function () {
      this.el.remove();
      this.pane.inner.unbind('scroll', this.innerPaneScrollListener);
      this.pane.inner.unbind('mousewheel', this.innerPaneMouseWheelListener);
      return this;
    };

    /**
     * Called upon mouseenter.
     *
     * @api private
     */

    Scrollbar.prototype.mouseenter = function () {
      this.enter = true;
      this.show();
    };

    /**
     * Called upon mouseleave.
     *
     * @api private
     */

    Scrollbar.prototype.mouseleave = function () {
      this.enter = false;

      if (!this.dragging) {
        if (this.pane.autoHide) {
          this.hide();
        }
      }
    };

    /**
     * Called upon wrap scroll.
     *
     * @api private
     */

    Scrollbar.prototype.scroll = function () {
      if (!this.shown) {
        this.show();
        if (!this.enter && !this.dragging) {
          if (this.pane.autoHide) {
              this.hiding = setTimeout($.proxy(this, 'hide'), 1500);
          }
        }
      }

      this.update();
    };

    /**
     * Called upon scrollbar mousedown.
     *
     * @api private
     */

    Scrollbar.prototype.mousedown = function (ev) {
      ev.preventDefault();

      this.dragging = true;

      this.startPageY = ev.pageY - parseInt(this.el.css('top'), 10);
      this.startPageX = ev.pageX - parseInt(this.el.css('left'), 10);

      // prevent crazy selections on IE
      this.el[0].ownerDocument.onselectstart = function () { return false; };

      var pane = this.pane,
          move = $.proxy(this, 'mousemove'),
          self = this;

      $(this.el[0].ownerDocument)
        .mousemove(move)
        .mouseup(function () {
          self.dragging = false;
          this.onselectstart = null;

          $(this).unbind('mousemove', move);

          if (!self.enter) {
            self.hide();
          }
        });
    };

    /**
     * Show scrollbar.
     *
     * @api private
     */

    Scrollbar.prototype.show = function (duration) {
      if (!this.shown && this.update()) {
        this.el.addClass('antiscroll-scrollbar-shown');
        if (this.hiding) {
          clearTimeout(this.hiding);
          this.hiding = null;
        }
        this.shown = true;
      }
    };

    /**
     * Hide scrollbar.
     *
     * @api private
     */

    Scrollbar.prototype.hide = function () {
      if (this.pane.autoHide !== false && this.shown) {
        // check for dragging
        this.el.removeClass('antiscroll-scrollbar-shown');
        this.shown = false;
      }
    };

    /**
     * Horizontal scrollbar constructor
     *
     * @api private
     */

    Scrollbar.Horizontal = function (pane) {
      this.el = $('<div class="antiscroll-scrollbar antiscroll-scrollbar-horizontal">', pane.el);
      Scrollbar.call(this, pane);
    };

    /**
     * Inherits from Scrollbar.
     */

    inherits(Scrollbar.Horizontal, Scrollbar);

    /**
     * Updates size/position of scrollbar.
     *
     * @api private
     */

    Scrollbar.Horizontal.prototype.update = function () {
      var paneWidth = this.pane.el.width(),
          trackWidth = paneWidth - this.pane.padding * 2,
          innerEl = this.pane.inner.get(0);

      this.el
        .css('width', trackWidth * paneWidth / innerEl.scrollWidth)
        .css('left', trackWidth * innerEl.scrollLeft / innerEl.scrollWidth);

      return paneWidth < innerEl.scrollWidth;
    };

    /**
     * Called upon drag.
     *
     * @api private
     */

    Scrollbar.Horizontal.prototype.mousemove = function (ev) {
      var trackWidth = this.pane.el.width() - this.pane.padding * 2,
          pos = ev.pageX - this.startPageX,
          barWidth = this.el.width(),
          innerEl = this.pane.inner.get(0);

      // minimum top is 0, maximum is the track height
      var y = Math.min(Math.max(pos, 0), trackWidth - barWidth);

      innerEl.scrollLeft = (innerEl.scrollWidth - this.pane.el.width()) * y / (trackWidth - barWidth);
    };

    /**
     * Called upon container mousewheel.
     *
     * @api private
     */

    Scrollbar.Horizontal.prototype.mousewheel = function (ev, delta, x, y) {
      if ((x < 0 && 0 === this.pane.inner.get(0).scrollLeft) || (x > 0 && (this.innerEl.scrollLeft + Math.ceil(this.pane.el.width()) == this.innerEl.scrollWidth))) {
        ev.preventDefault();
        return false;
      }
    };

    /**
     * Vertical scrollbar constructor
     *
     * @api private
     */

    Scrollbar.Vertical = function (pane) {
      this.el = $('<div class="antiscroll-scrollbar antiscroll-scrollbar-vertical">', pane.el);
      Scrollbar.call(this, pane);
    };

    /**
     * Inherits from Scrollbar.
     */

    inherits(Scrollbar.Vertical, Scrollbar);

    /**
     * Updates size/position of scrollbar.
     *
     * @api private
     */

    Scrollbar.Vertical.prototype.update = function () {
      var paneHeight = this.pane.el.height(),
        trackHeight = paneHeight - this.pane.padding * 2,
      innerEl = this.innerEl;

      var scrollbarHeight = trackHeight * paneHeight / innerEl.scrollHeight;
      scrollbarHeight = scrollbarHeight < 20 ? 20 : scrollbarHeight;

      var topPos = trackHeight * innerEl.scrollTop / innerEl.scrollHeight;

      if((topPos + scrollbarHeight) > trackHeight) {
          var diff = (topPos + scrollbarHeight) - trackHeight;
          topPos = topPos - diff - 3;
      }

      this.el
        .css('height', scrollbarHeight)
        .css('top', topPos);

      return paneHeight < innerEl.scrollHeight;
    };

    /**
     * Called upon drag.
     *
     * @api private
     */

    Scrollbar.Vertical.prototype.mousemove = function (ev) {
      var paneHeight = this.pane.el.height(),
        trackHeight = paneHeight - this.pane.padding * 2,
        pos = ev.pageY - this.startPageY,
        barHeight = this.el.height(),
        innerEl = this.innerEl,
        y = Math.min(Math.max(pos, 0), trackHeight - barHeight);

      innerEl.scrollTop = (innerEl.scrollHeight - paneHeight) * y / (trackHeight - barHeight);
    };

    /**
     * Called upon container mousewheel.
     *
     * @api private
     */

    Scrollbar.Vertical.prototype.mousewheel = function (ev, delta, x, y) {
      // CUSTOM
      // Increment this.pane.el.height() of 1 pixel to fix bug
      if ((y > 0 && 0 === this.innerEl.scrollTop) || (y < 0 && (this.innerEl.scrollTop + Math.ceil(this.pane.el.height()+1) >= this.innerEl.scrollHeight))) {
        ev.preventDefault();
        return false;
      }
    };

    /**
     * Cross-browser inheritance.
     *
     * @param {Function} constructor
     * @param {Function} constructor we inherit from
     * @api private
     */

    function inherits (ctorA, ctorB) {
      function f() {}
      f.prototype = ctorB.prototype;
      ctorA.prototype = new f();
    }

    /**
     * Scrollbar size detection.
     */

    var size;

    function scrollbarSize () {
      if (size === undefined) {
        var div = $(
            '<div class="antiscroll-inner" style="width:50px;height:50px;overflow-y:scroll;' + 'position:absolute;top:-200px;left:-200px;"><div style="height:100px;width:100%">' + '</div>'
        );

        $('body').append(div);
        var w1 = $(div).innerWidth();
        var w2 = $('div', div).innerWidth();
        $(div).remove();

        size = w1 - w2;
      }

      return size;
    }

  })(jQuery);

}

function loadMediaPlayer() {

  /**
   * params {Object} -- init parameters, where:
   * - parent {String|DOM} -- the parent element to attach player
   * - style {String} -- the player UI working mode
   *   full -- full working mode (default)
   *   circle -- player always as circle
   */
  (function(window) {
    "use strict";

    function MediaPlayer(params) {
      this._parent = jQuery(params.parent ? params.parent : "body");
      this._trackData = null;
      this._trackService = "";
      this._trackType = "";
      this._trackDuration = 0;
      this._curState = "loading";
      this._curStyle = "circle";
      this._sourceLink = "";
      this._isNeedShowAnim = true;
      this._isTouch = (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0));
      this.onExpand = null;
      this.onReady = null;
      this.post = null;

      var that = this;
      if(window.UT && UT.Expression && UT.Expression.ready) {
        UT.Expression.ready(function(p){
          that.post = p;
          that.post.on("publish", function(){
            if(that._curState === "playing") {
              that.stop();
            }
          });
        });
      }

      this.player = null;
      this.view = {};
      this.view.container = jQuery("<div>", {"class":"media-player mp-container"}).appendTo(this._parent);
      // hide for prevent animation
      this.view.container.css("display", "none");
      this.view.back = jQuery("<div>", {"class":"mp-ui-back"}).appendTo(this.view.container);
      this.view.trackInfo = jQuery("<div>", {"class":"mp-ui-track-info"}).appendTo(this.view.container);
      this.view.trackAuthor = jQuery("<div>", {"class":"mp-ui-track-author"}).appendTo(this.view.trackInfo);
      this.view.trackName = jQuery("<div>", {"class":"mp-ui-track-name"}).appendTo(this.view.trackInfo);
      this.view.artworkContainer = jQuery("<div>", {"class":"mp-ui-art-cont","target":"_blank"}).appendTo(this.view.back);
      this.view.artworkImage = jQuery("<div>", {"class":"mp-ui-art-image"}).appendTo(this.view.artworkContainer);
      this.view.artworkOverlay = jQuery("<div>", {"class":"mp-ui-art-overlay"}).appendTo(this.view.artworkContainer);
      this.view.button = jQuery("<div>", {"class":"mp-ui-ctrl-button"}).appendTo(this.view.back);
      this.view.buttonBack = jQuery("<div>", {"class":"mp-ui-ctrl-button-back"}).appendTo(this.view.button);
      this.view.buttonIcons = jQuery("<div>", {"class":"mp-ui-ctrl-button-icons"}).appendTo(this.view.button);
      jQuery("<span>", {"class":"mp-button-icon mp-play icon_play"}).appendTo(this.view.buttonIcons);
      jQuery("<span>", {"class":"mp-button-icon mp-pause icon_pause"}).appendTo(this.view.buttonIcons);
      jQuery("<span>", {"class":"mp-button-icon mp-wait icon_spinner"}).appendTo(this.view.buttonIcons);
      jQuery("<span>", {"class":"mp-button-icon mp-close icon_delete_alt"}).appendTo(this.view.buttonIcons);
      jQuery("<span>", {"class":"mp-button-icon mp-error icon_error"}).appendTo(this.view.buttonIcons).html("!");
      this.view.buttonOverlay = jQuery("<div>", {"class":"mp-ui-ctrl-button-overlay"}).appendTo(this.view.button);

      var str = "";
      str += '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="-2 -2 54 54" >';
      str += '<g>';
      str += '<path class="waitStatusLine" d="M26,2" stroke-linecap="round" fill="none" stroke="#ffffff" stroke-width="4"/>';
      str += '<path class="playStatusLine" d="M26,2" stroke-linecap="round" fill="none" stroke="#d2523e" stroke-width="4"/>';
      str += '</g>';
      str += '</svg>';
      this.view.buttonOverlay.html(str);

      this.setZIndex(params.zIndex);
      this.setStyle(params.style ? params.style : "circle");
      this.setState("loading");

      this.view.trackInfo.on("click", ".source", this._onSourceClick.bind(this));
      this.view.button.on("click", this._onButtonClick.bind(this));
    }

    MediaPlayer.prototype._onSourceClick =  function() {
      this.stop();
    };

    MediaPlayer.prototype.Load = function(data) {
      if(typeof(data) === "string") {
        if(data.toLowerCase().indexOf('soundcloud') !== -1) {
          data = {service:"soundcloud", url:data};
        } else if(data.toLowerCase().indexOf('itunes.apple') !== -1) {
          data = {service:"itunes", pageUrl:data};
        } else {
          data.service = "unknown";
        }
      }

      if(typeof(data.service) === "undefined") {
        return;
      }

      this.view.container.removeClass("mp-audio mp-video");
      var trackService = data.service.toLowerCase();
      if(trackService === "itunes" || trackService === "soundcloud") {
        this._trackService = trackService;
        this._trackData = data;
        this._trackType = "audio";
        this.view.container.addClass("mp-audio");
        this.initAudioPlayer();
      } else {
        this._trackService = trackService;
        this._trackData = data;
        this._trackType = "video";
        this.view.container.addClass("mp-video");
        this.initVideoPlayer();
      }
      // show player
      this.view.container.css("display", "");
    };

    MediaPlayer.prototype.initAudioPlayer = function() {
      if(this.player) {
        this.player.remove();
        this.player = null;
      }

      var that = this;
      that.setState("loading");

      var playerId = "mp_player_"+Math.floor(Math.random()*100000).toString();
      that.player = jQuery("<div>", {"class":"mp-player","id":playerId}).appendTo(that.view.container);

      that.player.on("utAudio:change",function(){
      });

      that.player.on("utAudio:ready",function(e){
        if(that._curState === "loading") {
          that.setState("launched");
        }
      });

      that.player.on("utAudio:mediaReady",function(e, data) {
        var timeStr = "";
        if(data.duration > 0) {
          that._trackDuration = data.duration;
          var ts = Math.floor(that._trackDuration/1000) % 60;
          var tm = Math.floor(that._trackDuration/60000);
          timeStr = tm + "."+that.zeroPad(ts,2,"0") + " - ";
        } else {
          that._trackDuration = 0;
        }

        // updating artist name and title
        if(!that._trackData.artist && data.artist) {
          that._trackData.artist = data.artist;
        }
        if(!that._trackData.title && data.trackName) {
          that._trackData.title = data.trackName;
        }
        if(!that._trackData.cover && data.artwork_url) {
          that._trackData.cover = data.artwork_url;
          that.setCoverUrl(that._trackData.cover);
        }

        // display artist name
        if(that._trackService === "itunes") {
          that.view.trackAuthor.html((that._trackData.artist || "") + " - " + timeStr + '<a target="_blank" class="source">iTunes</a>');
        } else {
          that.view.trackAuthor.html((that._trackData.artist || "") + " - " + timeStr + '<a target="_blank" class="source">SoundCloud</a>');
        }
        that.view.trackName.html(that._trackData.title || "");

        if(that._sourceLink) {
          that.view.trackAuthor.find(".source").attr("href", that._sourceLink);
        }

        if(that.onReady) {
          that.onReady();
        }
      });

      that.player.on("utAudio:play",function() {
        that.setState("playing");
      });

      that.player.on("utAudio:pause", function() {
        that.setState("paused");
        that._isNeedShowAnim = false;
      });

      that.player.on("utAudio:stop", function() {
        that.setState("finished");
        that.showProgress(0);
        that._isNeedShowAnim = true;
      });

      that.player.on("utAudio:finish", function() {
        that.setState("finished");
        that.showProgress(0);
        that._isNeedShowAnim = true;
      });

      that.player.on("utAudio:timeUpdate", function(e,s) {
  //      if(that._curState !== "playing") {
  //        that.setState("playing");
  //      }
        if(that._trackDuration > 0) {
          that.showProgress(s*1000/that._trackDuration);
        } else {
          that.showProgress(0);
        }
      });

      that.player.on("utAudio:seek", function(){
        that.setState("seeking");
      });

      var data = jQuery.extend(true, {}, that._trackData);
      var prm = {
        data: data,
        skin: "tiny-bottom",
        ui:{
          play:    false,
          progress:false,
          time:    false,
          title:   false,
          source:  false,
          artwork: false
        },
        editable: false
      };

      if(that._trackService === "itunes" && data.url && data.pageUrl) {
        data.appData = {
          previewUrl: data.url,
          artistName: data.artist,
          trackName: data.title,
          artworkUrl100: data.cover
        };
        data.link = data.url;
        data.url = data.pageUrl;
        that.view.trackAuthor.html((data.artist ? data.artist + ' - ' : "") + '<a target="_blank" class="source">iTunes</a>');
      } else if(that._trackService === "itunes" && data.pageUrl) {
        data.url = data.pageUrl;
        that.view.trackAuthor.html((data.artist ? data.artist + ' - ' : "") + '<a target="_blank" class="source">iTunes</a>');
      } else {
        that.view.trackAuthor.html((data.artist ? data.artist + ' - ' : "") + '<a target="_blank" class="source">SoundCloud</a>');
      }
      if(that._sourceLink) {
        that.view.trackAuthor.find(".source").attr("href", that._sourceLink);
      }
      that.view.trackName.html(data.title || "");

      if(data.cover) {
        that.setCoverUrl(data.cover);
      } else {
        that.setCoverUrl("");
      }

      if(data.pageUrl) {
        that.setSourceLink(data.pageUrl);
      } else {
        that.setSourceLink("");
      }

      that.player.utAudio(prm);
    };

    MediaPlayer.prototype.initVideoPlayer = function() {
      if(this.player) {
        this.player.remove();
        this.player = null;
      }

      var that = this;
      that.setState("loading");

      var playerId = "mp_player_"+Math.floor(Math.random()*100000).toString();
      that.player = jQuery("<div>", {"class":"mp-player","id":playerId}).appendTo(that.view.container);

      that.player.on("utVideo:ready", function(event, data) {
        if(that._curState === "loading") {
          that.setState("launched");
        }
      });

      that.player.on("utVideo:mediaReady", function(event, data) {
        var author = data.author ? data.author + " - " : "";
        var title = data.title ? data.title : that._trackData.artist;
        var timeStr = "";
        if(data.duration > 0) {
          that._trackDuration = data.duration * 1000;
          var ts = Math.floor(that._trackDuration/1000) % 60;
          var tm = Math.floor(that._trackDuration/60000);
          timeStr = tm + "."+that.zeroPad(ts,2,"0") + " - ";
        } else {
          that._trackDuration = 0;
        }

        that.view.trackAuthor.html(author + timeStr + '<a target="_blank" class="source">' + data.service_name + "</a>");
        that.view.trackName.html(title);
        if(that._sourceLink) {
          that.view.trackAuthor.find(".source").attr("href", that._sourceLink);
        }

        if(that.onReady) {
          that.onReady();
        }
      });

      that.player.on("utVideo:play", function() {
        that.setState("playing");
      });
      that.player.on("utVideo:pause", function() {
  //      that.setState("paused");
      });
      that.player.on("utVideo:stop", function() {
        that.setState("finished");
      });
      that.player.on("utVideo:finish", function() {
        that.setState("finished");
      });
      that.player.on("utVideo:error", function() {
        that.setState("error");
      });

      that.view.trackAuthor.html(that._trackData.artist || "");
      that.view.trackName.html(that._trackData.title || "");

      if(that._trackData.cover) {
        that.setCoverUrl(that._trackData.cover);
      } else {
        that.setCoverUrl("");
      }

      if(that._trackData.pageUrl || that._trackData.url) {
        that.setSourceLink(that._trackData.pageUrl || that._trackData.url);
      } else {
        that.setSourceLink("");
      }
      window.ppp = that.player;
      that.player.utVideo({
        editable: false,
        data: that._trackData.url,
        autoPlay: false
      });
    };

    MediaPlayer.prototype.setZIndex = function(zIndex) {
      if(zIndex) {
        this.view.container.css("z-index", zIndex);
      }
    };

    MediaPlayer.prototype.setStyle = function(style) {
      var modes = [
        "mp-style-full",
        "mp-style-full_m",
        "mp-style-circle",
        "mp-style-circle_m"
      ];
  //    this.view.container.removeClass(modes.join(" ")).addClass("mp-style-" + style + (this._isTouch ? "_m" : ""));
      this.view.container.removeClass(modes.join(" ")).addClass("mp-style-" + style);
      this._curStyle = style;
    };

    MediaPlayer.prototype.setState = function(mode) {
      var modes = [
        "mp-mode-loading",
        "mp-mode-launched",
        "mp-mode-seeking",
        "mp-mode-playing",
        "mp-mode-paused",
        "mp-mode-finished",
        "mp-mode-error"
      ];
      this.view.container.removeClass(modes.join(" ")).addClass("mp-mode-" + mode);
      if(mode === "playing") {
        if(!this.view.container.hasClass("mp-expand")) {
          this.view.container.addClass("mp-expand");
          if(this._isNeedShowAnim) {
            this.whiteAnim();
            this._isNeedShowAnim = false;
          }
          if(this._isTouch && this._curStyle !== "circle") {
            var ww = Math.min(this._parent.width() - 20, 320); /* limit size to 320px */
            this.view.container.css("width", ww + "px");
            this.view.back.css("width", ww + "px");
            this.view.container.find(".mp-player").css("width", ww + "px");
          }
          if(this.onExpand) {
            this.onExpand.call(this, true);
          }
        }
      } else {
        if(this._isTouch) {
          this.view.container.css("width", "");
          this.view.back.css("width", "");
        }
        if(this.view.container.hasClass("mp-expand")) {
          this.view.container.removeClass("mp-expand");
          if(this._trackService !== "itunes" && this._trackService !== "soundcloud") {
            this.whiteAnim2();
            this._isNeedShowAnim = true;
          }
          if(this.onExpand) {
            this.onExpand.call(this, false);
          }
        }
      }
      this._curState = mode;
    };

    MediaPlayer.prototype._onButtonClick = function(event) {
      event.stopPropagation();
      if(this._trackType === "audio") {
        if(this._curState === "playing") {
          this.stop();
        } else if(this._curState === "launched" || this._curState === "paused" || this._curState === "finished") {
          this.play();
        } else if(this._curState === "error") {
          // try to recreate player when error
          this.initAudioPlayer();
        }
      } else if(this._trackType === "video") {
        if(this._curState === "playing") {
          this.stop();
        } else if(this._curState === "launched" || this._curState === "paused" || this._curState === "finished") {
          this.play();
        } else if(this._curState === "error") {
          // try to recreate player when error
          this.initVideoPlayer();
        }
      }
    };

    MediaPlayer.prototype.play = function() {
      if(this._curState === "playing") {
        return;
      }

      if(this._trackType === "audio") {
        this.setState("seeking");
        this.player.utAudio("play");
      } else {
        this.setState("playing");
        this.player.utVideo("play");
      }
    };

    MediaPlayer.prototype.stop = function() {
      if(this._curState !== "playing") {
        return;
      }

      if(this._trackType === "audio") {
        this.player.utAudio("pause");
      } else {
        this.player.utVideo("stop");
      }
    };

    MediaPlayer.prototype.setCoverUrl = function(url) {
      if(url) {
        this.view.artworkImage.css("background-image", "url("+url+")");
      } else {
        this.view.artworkImage.css("background-image");
      }
    };

    MediaPlayer.prototype.zeroPad = function(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };

    MediaPlayer.prototype.setSourceLink = function(url) {
      if(url) {
        this._sourceLink = url;
        if(this.view.container) {
          this.view.container.find(".source").attr("href", url);
        }
      } else {
        this._sourceLink = "";
        if(this.view.container) {
          this.view.container.find(".source").removeAttr("href");
        }
      }
    };

    MediaPlayer.prototype.showProgress = function(posInPercent, color) {
      posInPercent = posInPercent > 1 ? 1 : (posInPercent < 0 ? 0 : posInPercent);
      var aaa = 2*Math.PI*posInPercent - Math.PI/2;
      var cx = 25;
      var cy = 25;
      var rr = 24.5;
      var dx = Math.cos(aaa)*rr;
      var dy = Math.sin(aaa)*rr;
      var obj = this.view.buttonOverlay.find(color ? ".waitStatusLine" : ".playStatusLine");
      var tmp = obj && obj[0] ? obj[0] : null;

      if(tmp) {
        if(dx > 0) {
          tmp.setAttribute("d", "M"+cx+","+(cy-rr)+" a"+rr+","+rr+" 0 0,1 "+dx+","+(rr+dy)+""); //z
        } else {
          tmp.setAttribute("d", "M"+cx+","+(cy-rr)+" a"+rr+","+rr+" 0 1,1 "+dx+","+(rr+dy)+""); //z
        }
      }
    };

    MediaPlayer.prototype.whiteAnim = function() {
      var intNum = 0;
      var stTime = (new Date()).getTime();
      var that = this;
      that.showProgress(1, true);
      intNum = setInterval(function() {
        var curTime = (new Date()).getTime();
        if((curTime - stTime) > 200) {
          that.showProgress(0, true);
          clearInterval(intNum);
          return;
        }
        that.showProgress(1-(curTime - stTime)/200, true);
      }, 1);
    };

    MediaPlayer.prototype.whiteAnim2 = function() {
      var intNum = 0;
      var stTime = (new Date()).getTime();
      var that = this;
      that.showProgress(0, true);
      intNum = setInterval(function() {
        var curTime = (new Date()).getTime();
        if((curTime - stTime) < 200) {
          return;
        }
        if((curTime - stTime) > 500) {
          that.showProgress(1, true);
          clearInterval(intNum);
          return;
        }
        that.showProgress((curTime - stTime - 200)/300, true);
      }, 1);
    };

    window.MediaPlayer = MediaPlayer;
  })(window);
}
function loadCutOut() {
  
  loadPaper();

  /* global paper:true, Tool:true, Raster:true, view, Path, RgbColor, Point, Segment, project */
  (function(UT,$) {
    "use strict";

    paper.install(window);
    var __MOVEPOINT_TRACKED = false;
    var __ADDPOINT_TRACKED = false;
    var __MOVEPATH_TRACKED = false;
    
    var methods = {
      init: function(options) {
        this.each(function() {

          var tool = new paper.Tool();
          tool.activate();

          var defaults = {
            UT: false,
            imageData: {},
            segments: [],
            i18n: {
              back: "Back",
              edit: "Edit",
              done: "Done",
              pointTip: "Shift + Click to remove",
              doCutOut: "Cut-out your<br>sticker",
              fullImage: "Or use full image",
              reset: "Reset",
              doneEdit: "Done editing",
              pen: "PEN",
              addPoint: "Add point"
            },
            onCuted: function(data) {},
            onReady: function() {}
          };

          var $that = $(this);
          var that = {};
          this.utCut = that;
          that.options = $.extend(true, defaults, options);

          that.isTouch = ('ontouchstart' in window) || (window.navigator.msMaxTouchPoints > 0);
          if(navigator.userAgent.toLowerCase().indexOf('android') !== -1) {
            $("body").addClass("android-fix");
          }

          var hitOptions = {
            segments: true,
            stroke: true,
            fill: true,
            tolerance: that.isTouch ? 21 : 15
          };

          that.hide = function() {
            $that.hide();
          };

          that.show = function() {
            $that.show();
          };

          that.pathBackup = [];

          that.resize = function() {
            that.pathBackup = that.getSegments();

            var oldSize = {
              width: width,
              height: height
            };

            contWidth = canvasCont.width();
            contHeight = canvasCont.height();

            width = Math.floor(imgWidth * (contHeight / imgHeight));
            height = Math.floor(imgHeight * (contWidth / imgWidth));

            if (height <= contHeight) {
              width = imgWidth * (height / imgHeight);
              canvasCont.find('.ut-cut-canvas1, .ut-cut-canvas2, .ut-cut-bg, .ut-cut-bg-img').css({
                marginTop: -height / 2 + 'px',
                marginLeft: -width / 2 + 'px',
                top: '50%',
                left: '50%'
              });
            } else {
              height = imgHeight * (width / imgWidth);
              canvasCont.find('.ut-cut-canvas1, .ut-cut-canvas2, .ut-cut-bg, .ut-cut-bg-img').css({
                marginTop: -height / 2 + 'px',
                marginLeft: -width / 2 + 'px',
                left: '50%',
                top: '50%'
              });
            }

            mobileTooltip.css({
              top: (contHeight - height) / 2 + 20,
              left: (contWidth - width) / 2 + 20
            });

            tooltip1.css({
              width: width,
              height: height,
              marginLeft: -width / 2 + 'px',
              marginTop: -height / 2 + 'px'
            });

            canvas1.width = canvas2.width = canvas3.width = width;
            canvas1.height = canvas2.height = canvas3.height = height;

            grayCover.width(width).height(height);
            backImg.width(width).height(height);

            ctx1.drawImage(tmp, 0, 0, width, height);

            paper.setup(canvas2);

            var stickerRaster = new paper.Raster(canvas1);
            stickerRaster.position = paper.view.center;

            stickerPath = new paper.Path.Circle(paper.view.center, 50);
            stickerPath.style = {
              fillColor: new paper.RgbColor(0, 0, 0, 0),
              strokeColor: 'black',
              strokeWidth: 2
            };

            stickerPath.selected = true;
            stickerPath.clipMask = true;
            stickerPath.clipped = true;

            stickerPath.removeSegments();

            var sizeOffset = {
              width: oldSize.width / width,
              height: oldSize.height / height
            };

            for (var i = 0; i < that.pathBackup.length; i++) {
              that.pathBackup[i].point.x = that.pathBackup[i].point.x / sizeOffset.width;
              that.pathBackup[i].point.y = that.pathBackup[i].point.y / sizeOffset.height;

              that.pathBackup[i].handleIn.x = that.pathBackup[i].handleIn.x / sizeOffset.width;
              that.pathBackup[i].handleIn.y = that.pathBackup[i].handleIn.y / sizeOffset.height;

              that.pathBackup[i].handleOut.x = that.pathBackup[i].handleOut.x / sizeOffset.width;
              that.pathBackup[i].handleOut.y = that.pathBackup[i].handleOut.y / sizeOffset.height;
            }

            that.restorePath(that.pathBackup);

            if (!that.isTouch) {
              var btnTopPos = height + (contHeight - height) / 2 - 47,
                btnXPos = (contWidth - width) / 2 + 10;
              resetBtn.css({
                top: btnTopPos,
                left: btnXPos + rmPointsBtn.width() + 30
              });
              saveButton.css({
                top: btnTopPos,
                left: 'auto',
                right: btnXPos
              });
              useFullImgBtn.css({
                top: btnTopPos + 15,
                left: 'auto',
                right: btnXPos,
                display : none
              });
              if (window.editing_mode) {
                rmPointsBtn.css({
                  top: btnTopPos,
                  left: btnXPos
                });
              } else {
                rmPointsBtn.css({
                  top: btnTopPos,
                  left: btnXPos
                });
              }
            } else {
              container.removeClass('ut-cut-hide-all-controls');

              rmPointsBtn.css({
                left: '10px'
              });
            }

            if (height > width && contHeight / height >= 5) {
              mobileTooltip.addClass('landscape');
            } else {
              mobileTooltip.removeClass('landscape');
            }

            rotateTooltip.hide();

            paper.view.draw();
          };

          var container = $('<div class="ut-cut-container"></div>').appendTo($(this));
          var canvasCont = $('<div class="ut-cut-canvas"></div>').appendTo(container);

          if(that.isTouch) {
            container.addClass('ut-cut-mobile');
          }

          var canvas1 = document.createElement('canvas');
          var canvas2 = document.createElement('canvas');
          var canvas3 = document.createElement('canvas');

          canvasCont.append(canvas1);
          var backImg = $('<div class="ut-cut-bg-img"></div>').appendTo(canvasCont);
          var grayCover = $('<div class="ut-cut-bg"></div>').appendTo(canvasCont);
          canvasCont.append(canvas2);

          canvasCont.append(canvas3);

          canvas1.className = 'ut-cut-canvas1';
          canvas2.className = 'ut-cut-canvas2';
          canvas3.className = 'ut-cut-canvas3';

          var canvasHover = false;

          $(canvas2).on('mouseenter',function() {
            canvasHover = true;
          });
          $(canvas2).on('mouseleave', function() {
            canvasHover = false;
          });

          var stickerPath, width, height;

          var cancelButton = $('<a class="ut-cut-cancel-button ut-edit-button icon_point_left"> '+that.options.i18n.back+'</a>').appendTo(container);
          cancelButton.on('click', function() {
            $that.hide();
          });

          var saveButton = $('<a class="ut-cut-save-button ut-edit-button icon_check"> '+that.options.i18n.done+'</a>').appendTo(container);
          
          
          function saveContour() {

            UT.Expression._postInstance().track('cut-out - completed', {});

            stickerPath.selected = false;

            paper.view.draw();

            var data = canvas2.getContext('2d').getImageData(0, 0, width, height);

            var bounds = stickerPath.bounds;

            var offsetW = -bounds.x, offsetH = -bounds.y, newWidth = bounds.width, newHeight = bounds.height;

            if (bounds.x + bounds.width > width) {
              if (bounds.x < 0) {
                offsetW = 0;
                newWidth = width;
              } else {
                newWidth = width - bounds.x;
              }
            } else if (bounds.x < 0) {
              offsetW = 0;
              newWidth = bounds.width + bounds.x;
            }

            if (bounds.y + bounds.height > height) {
              if (bounds.y < 0) {
                offsetH = 0;
                newHeight = height;
              } else {
                newHeight = height - bounds.y;
              }
            } else if (bounds.y < 0) {
              offsetH = 0;
              newHeight = bounds.height + bounds.y;
            }

            canvas1.width = newWidth;
            canvas1.height = newHeight;

            var ctx1 = canvas1.getContext('2d');

            ctx1.putImageData(data, offsetW, offsetH);

            var url = canvas1.toDataURL();

            var newImage = new that.options.UT.Image(url);

            canvas1.width = width;
            canvas1.height = height;

            ctx1.drawImage(tmp, 0, 0, width, height);

            stickerPath.selected = true;

            paper.view.draw();

            that.options.onCuted({
              image: newImage,
              segments: that.getSegments()
            });

            that.destroy();

          }

          UT.Expression._postInstance().pushNavigationRight('next', saveContour);

          // Hide savebutton for A B Test
          // saveButton.hide();
          saveButton.on('click', function() { UT.Expression._postInstance().popNavigationRight(); saveContour();});

          var useFullImgBtn = $('<a style="display:none" class="ut-cut-full-img-button">Or use full image <span class="icon_arrow_right"></span></a>').appendTo(container);

          function useFullImage() {
            UT.Expression._postInstance().track('cut-out - use full image', {});
            UT.Expression._postInstance().popNavigationRight();
            var url = canvas1.toDataURL();

            var newImage = new that.options.UT.Image(url);

            that.options.onCuted({
              image: newImage,
              segments: []
            });

            tooltip1.hide();
          }

          // Add F I shortcut to full image
          var lastKey = 0;
          var _ShortUsed = 0;
          $('body').on('keyup', function(e) {
            if (!_ShortUsed && e.keyCode === 73 && lastKey === 70) {
              _ShortUsed = 1;
              useFullImage();
            }
            lastKey = e.keyCode;
          });



          var resetBtn = $('<a class="ut-cut-reset-button ut-edit-button icon_refresh"> '+that.options.i18n.reset+'</a>').appendTo(container);
          resetBtn.on('click', function() {
            UT.Expression._postInstance().track('cut-out - reset', {});
            saveButton.hide();
            resetBtn.hide();
            rmPointsBtn.hide();
            tooltip1.show();

            stickerPath.removeSegments();
            stickerPath.selected = false;
            stickerPath.closed = false;

            if (!that.isTouch) {
              mode = 'draw';
              window.drawmode = true;
            } else {
              paper.setup(canvas2);

               var stickerRaster = new paper.Raster(canvas1);
               stickerRaster.position = paper.view.center;

              stickerPath = new paper.Path.Circle(view.center, 50);
              stickerPath.style = {
                fillColor: new paper.RgbColor(0, 0, 0, 0),
                strokeColor: 'black',
                strokeWidth: 2
              };

              stickerPath.selected = true;
              stickerPath.clipMask = true;
              stickerPath.clipped = true;

              mobileTooltip.show();

            }

            window.editing_mode = false;
            rmPointsBtn.removeClass('icon_check').addClass('icon_edit').html('&nbsp;'+that.options.i18n.edit);

            paper.view.draw();

          });

          // resetBtn.show();

          //Global variable for paper.js
          window.editing_mode = false;

          var rmPointsBtn = $('<a class="ut-cut-rm-points-button ut-edit-button icon_edit"> '+that.options.i18n.edit+'</a>').appendTo(container);
          rmPointsBtn.on('click', function() {


            UT.Expression._postInstance().track('cut-out - clicked edit', {});
            var curState = that.getSegments();

            stickerPath.removeSegments();

            var btnTopPos = height + (contHeight - height) / 2 - 47,
              btnXPos = (contWidth - width) / 2 + 10;

            if (!window.editing_mode) {
              window.editing_mode = true;
              saveButton.hide();
              resetBtn.show();
              rmPointsBtn.removeClass('icon_edit').addClass('icon_check').html('&nbsp;'+that.options.i18n.doneEdit);
            } else {
              window.editing_mode = false;
              saveButton.show();
              resetBtn.hide();
              rmPointsBtn.removeClass('icon_check').addClass('icon_edit').html('&nbsp;'+that.options.i18n.edit);
            }

            if (that.isTouch) {
              rmPointsBtn.css({
                left: '10px'
              });
              resetBtn.css({
                left: '170px'
              });
            } else {
              rmPointsBtn.css({
                top: btnTopPos,
                left: btnXPos
              });
              resetBtn.css({
                top: btnTopPos,
                left: btnXPos + rmPointsBtn.width() + 30
              });
            }

            that.restorePath(curState);

            paper.view.draw();

          });

          that.getSegments = function() {
            return (stickerPath && stickerPath.segments.length) ? stickerPath.segments.slice() : [];
          };

          that.restorePath = function(segments) {
            stickerPath.closed = true;

            // Select the path, so we can see its segments:
            mode = 'static';
            window.drawmode = false;
            for (var i = 0; i < segments.length; i++) {
              // Add a segment with handles:
              var point = new paper.Point(segments[i].point.x, segments[i].point.y);
              var handleIn = new paper.Point(segments[i].handleIn.x, segments[i].handleIn.y);
              var handleOut = new paper.Point(segments[i].handleOut.x, segments[i].handleOut.y);
              var added = stickerPath.add(new Segment(point, handleIn, handleOut));
            }

            paper.view.draw();

            stickerPath.fullySelected = false;
            stickerPath.selected = true;
          };

          that.destroy = function() {
            paper.project.remove();
            tool.remove();
            $that.remove();
          };

          var mode = 'static';

          var pen = $('<button class="ut-cut-pen">'+that.options.i18n.pen+'</button>').appendTo(container);
          pen.on('click', function() {
            mode = 'draw';
            stickerPath.removeSegments();
            stickerPath.selected = false;
            stickerPath.closed = false;

            paper.view.draw();
          });

          var tooltip = $('<div class="ut-cut-tooltip">'+that.options.i18n.addPoint+'</div>').appendTo(container);
          var tooltip1 = $('<div class="ut-cut-tooltip-1"><span>'+that.options.i18n.doCutOut+'</span></div>').appendTo(canvasCont);
          tooltip1.on('click', function() {
            $(this).hide();
          });

          var mobileTooltip = $('<div class="ut-cut-mobile-tooltip"><span>'+that.options.i18n.doCutOut+'</span></div>').appendTo(canvasCont);
          mobileTooltip.on('click', function() {
            $(this).hide();
          });

          var rotateTooltip = $('<div class="ut-cut-rotate-tooltip"></div>').appendTo(canvasCont);
          var closeRotateTooltip = $('<div class="ut-cut-rotate-tooltip-close icon_delete"></div>').appendTo(rotateTooltip);
          closeRotateTooltip.on('click', function(){
            rotateTooltip.hide();
            container.removeClass('ut-cut-hide-all-controls');
          });

          var ctx1 = canvas1.getContext('2d');
          var ctx2 = canvas2.getContext('2d');
          var ctx3 = canvas3.getContext('2d');

          var contWidth = canvasCont.width();
          var contHeight = canvasCont.height();

          var imgWidth = this.width;
          var imgHeight = this.height;

          var tmp = new Image();
        

          var tmpLoaded = function() {
            imgWidth = this.width;
            imgHeight = this.height;
            backImg.css("background-image", "url("+this.src+")");

            width = Math.floor(imgWidth * (contHeight / imgHeight));
            height = Math.floor(imgHeight * (contWidth / imgWidth));

            if (height <= contHeight) {
              width = imgWidth * (height / imgHeight);
              canvasCont.find('.ut-cut-canvas1, .ut-cut-canvas2, .ut-cut-bg, .ut-cut-bg-img').css({
                marginTop: -height / 2 + 'px',
                top: '50%'
              });
            } else {
              height = imgHeight * (width / imgWidth);
              canvasCont.find('.ut-cut-canvas1, .ut-cut-canvas2, .ut-cut-bg, .ut-cut-bg-img').css({
                marginLeft: -width / 2 + 'px',
                left: '50%'
              });
            }

            tooltip1.css({
              width: width,
              height: height,
              marginLeft: -width / 2 + 'px',
              marginTop: -height / 2 + 'px'
            });

            tooltip1.show();

            mobileTooltip.css({
              top: (contHeight - height) / 2 + 20,
              left: (contWidth - width) / 2 + 20
            });

            if (height > width && contHeight / height >= 5) {
              mobileTooltip.addClass('landscape');
            } else {
              mobileTooltip.removeClass('landscape');
            }

            if(!that.isTouch) {
              var btnTopPos = height + (contHeight - height) / 2 - 47;
              var btnXPos = (contWidth - width) / 2 + 10;
              resetBtn.css({
                top: btnTopPos,
                left: btnXPos + rmPointsBtn.width() + 10
              });
              saveButton.css({
                top: btnTopPos,
                left: 'auto',
                right: btnXPos
              });
              useFullImgBtn.css({
                top: btnTopPos + 15,
                left: 'auto',
                right: btnXPos
              });
              if (window.editing_mode) {
                rmPointsBtn.css({
                  top: btnTopPos,
                  left: btnXPos
                });
              } else {
                rmPointsBtn.css({
                  top: btnTopPos,
                  left: btnXPos
                });
              }

            } else {


              rmPointsBtn.css({
                left: '10px'
              });
            }

            canvas1.width = canvas2.width = canvas3.width = width;
            canvas1.height = canvas2.height = canvas3.height = height;

            grayCover.width(width).height(height);
            backImg.width(width).height(height);


            /* 
              Ugly fix for FF that crash with no reasons :
              see http://stackoverflow.com/a/18580878/1705736
            */
            try {
              ctx1.drawImage(tmp, 0, 0, width, height);
            }
            catch (e) {
              setTimeout(tmpLoaded, 10);
              return;
            }

            paper.setup(canvas2);

            var stickerRaster = new paper.Raster(canvas1);
            stickerRaster.position = paper.view.center;

            var segment;
            var movePath = false;

            stickerPath = new paper.Path.Circle(paper.view.center, 50);
            stickerPath.style = {
              fillColor: new paper.RgbColor(0, 0, 0, 0),
              strokeColor: 'black',
              strokeWidth: 2
            };

            stickerPath.selected = true;
            stickerPath.clipMask = true;
            stickerPath.clipped = true;

            UT.Expression._postInstance().track('cut-out - start', {});

            tool.onMouseDown = function(event) {
              mobileTooltip.hide();
              container.addClass('ut-cut-hide-all-controls');
              tooltip1.hide();

              if(mode === 'static') {
                var data = ctx2.getImageData(0, 0, width, height);
                ctx3.putImageData(data, 0, 0);

                var tmpRaster = new paper.Raster(canvas3);
                var inPath = tmpRaster.getPixel(event.point).alpha !== 0;
                tmpRaster.remove();

                segment = null;
                var hitResult = paper.project.hitTest(event.point, hitOptions);

                if(event.modifiers.shift || window.editing_mode) {
                  if(hitResult.type === 'segment' && stickerPath.segments.length > 3) {
                    hitResult.segment.remove();
                  }
                  return;
                }

                if(hitResult) {
                  if (hitResult.item.type !== 'Raster') {
                    stickerPath = hitResult.item;
                  }
                  if (hitResult.type === 'segment') {
                    segment = hitResult.segment;
                  } else if (hitResult.type === 'stroke'/* && !$.browser.mobile*/) {
                    var location = hitResult.location;
                    segment = stickerPath.insert(location.index + 1, event.point);
                    if (!__ADDPOINT_TRACKED) {
                      __ADDPOINT_TRACKED = true;
                      UT.Expression._postInstance().track('cut-out - add point', {});
                    }
                  }
                }
                movePath = inPath && !segment;

                if(movePath) {
                  paper.project.activeLayer.addChild(stickerPath);
                }
              }

              paper.view.draw();
            };

            tool.onMouseMove = function(event) {
              stickerPath.selected = true;
              stickerPath.clipMask = true;
              stickerPath.clipped = true;
              if (that.isTouch || $that.css('display') === 'none') {
                return;
              }

              var data = ctx2.getImageData(0, 0, width, height);
              ctx3.putImageData(data, 0, 0);

              var tmpRaster = new paper.Raster(canvas3);
              var inPath = tmpRaster.getPixel(event.point).alpha !== 0;
              tmpRaster.remove();

              if(mode === 'static' && canvasHover && !window.editing_mode) {
                var hitResult = paper.project.hitTest(event.point, hitOptions);
                if(!hitResult) {
                  return;
                }
                if(hitResult.type === 'segment') {
                  if (!__MOVEPOINT_TRACKED) {
                    __MOVEPOINT_TRACKED = true;
                    UT.Expression._postInstance().track('cut-out - move point', {});
                  }
                  canvasCont.css('cursor', 'default');
                  tooltip.css("width", "auto"); //119
                  tooltip.html(that.options.i18n.pointTip);
                  tooltip.show().css({
                    left: event.point.x + (contWidth - width) / 2 - tooltip.width() / 2 - 5,
                    top: event.point.y + (contHeight - height) / 2 - tooltip.height() / 2 - 35
                  });
                } else if(hitResult.type === 'stroke') {
                  canvasCont.css('cursor', 'default');
                  tooltip.width("width", "auto"); //52
                  tooltip.html(that.options.i18n.addPoint);
                  tooltip.show().css({
                    left: event.point.x + (contWidth - width) / 2 - tooltip.width() / 2 - 5,
                    top: event.point.y + (contHeight - height) / 2 - tooltip.height() / 2 - 35
                  });
                } else {
                  if (!__MOVEPATH_TRACKED) {
                    __MOVEPATH_TRACKED = true;
                    UT.Expression._postInstance().track('cut-out - move path', {});
                  }
                  canvasCont.css("cursor", inPath ? "move" : "default");
                  tooltip.hide();
                }
              } else {
                tooltip.hide();
                canvasCont.css('cursor', 'default');
              }
            };

            function bezierOnSegment(seg) {
              var x = (seg.next.point.x - seg.previous.point.x) / 2;
              var y = (seg.next.point.y - seg.previous.point.y) / 2;
              var c = Math.sqrt(Math.pow(seg.next.point.x - seg.previous.point.x, 2) + Math.pow(seg.next.point.y - seg.previous.point.y, 2));
              var a = Math.sqrt(Math.pow(seg.next.point.y - seg.previous.point.y, 2));

              var sin = a / c;
              var newC = c / 2 * 0.5;
              var newA = sin * c / 2 * 0.5;
              var newB = Math.sqrt(Math.pow(newC, 2) - Math.pow(newA, 2));
              var x1 = newB, y1 = newA, x2 = -newB, y2 = -newA;

              
              //path.fullySelected = true;
              seg.handleOut.x = x > 0 ? x1 : -x1;
              seg.handleOut.y = y > 0 ? y1 : -y1;
              seg.handleIn.x = x > 0 ? x2 : -x2;
              seg.handleIn.y = y > 0 ? y2 : -y2;
            }

            tool.onMouseDrag = function(event) {
              container.addClass('ut-cut-hide-all-controls');
              if(mode === 'static') {
                tooltip.hide();
                if (segment) {
                  bezierOnSegment(segment);
                  segment.point = event.point;
                }

                if (segment && segment.next) {
                  bezierOnSegment(segment.next);
                }

                if (segment && segment.previous) {
                  bezierOnSegment(segment.previous);
                }

                if(movePath) {
                  stickerPath.position = stickerPath.position.add(event.delta);
                }
              } else {
                window.drawmode = true;
                stickerPath.add(event.point);
              }

              $(canvas2).css("opacity", "0.99");
              setTimeout(function() {
                $(canvas2).css("opacity", "1");
              }, 5);
            };

            tool.onMouseUp = function(event) {
              container.removeClass('ut-cut-hide-all-controls');
              if (mode === 'draw') {
                // When the mouse is released, simplify it:
                stickerPath.simplify(10);
                stickerPath.closed = true;
                stickerPath.fullySelected = false;
                stickerPath.selected = true;

                // Select the path, so we can see its segments:
                mode = 'static';
                window.drawmode = false;

                if(stickerPath.segments.length < 3) {
                  stickerPath.removeSegments();
                  stickerPath.selected = false;
                  stickerPath.closed = false;

                  mode = 'draw';
                  window.drawmode = true;
                } else {
                  UT.Expression._postInstance().track('cut-out - path drawed');
                  useFullImgBtn.hide();
                  saveButton.show();
                  resetBtn.hide();
                  rmPointsBtn.show();
                }

                paper.view.draw();

                stickerPath.fullySelected = false;
                stickerPath.selected = true;
              } else if(that.isTouch) {
                if(!window.editing_mode) {
                  saveButton.show();
                  resetBtn.hide();
                  useFullImgBtn.hide();
                  rmPointsBtn.show();
                }
              }
              $(canvas2).css("opacity", "0.99");
              setTimeout(function() {
                $(canvas2).css("opacity", "1");
              }, 5);
            };

            that.update = function() {
              tool.activate();

              $(canvas2).css("opacity", "0.99");
              setTimeout(function() {
                $(canvas2).css("opacity", "1");
              }, 5);
            };

            if(!that.isTouch) {
              pen.trigger('click');
            }

            if(that.options.segments.length) {
              stickerPath.removeSegments();
              that.restorePath(that.options.segments);
              useFullImgBtn.hide();
              saveButton.show();
              resetBtn.hide();
              rmPointsBtn.show();
              tooltip1.hide();
            } else {
              if (that.isTouch) {
                mobileTooltip.show();
              }
            }

            paper.view.draw();

            that.options.onReady();
          };

          tmp.onload = tmpLoaded;

          console.log("!!!--load:" + options.imageData.url);
          tmp.src = options.imageData.url;
        });
        return this;
      },

      update: function() {
        this.each(function() {
          if (this.utCut) {
            this.utCut.update();
          }
        });
        return this;
      },


      hide: function() {
        this.each(function() {
          if (this.utCut) {
            this.utCut.hide();
          }
        });
        return this;
      },

      show: function() {
        this.each(function() {
          if (this.utCut) {
            this.utCut.show();
          }
        });
        return this;
      },

      resize: function() {
        this.each(function() {
          if (this.utCut) {
            this.utCut.resize();
          }
        });
        return this;
      }
    };

    $.fn.utCut = function(method) {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || !method) {
        methods.init.apply(this, arguments);
      } else {
        $.error('Method ' + method + ' does not exist on $.utCut');
      }
      return this;
    };
  })(UT, window.jQuery || window.Zepto || window.jq);
}
/*jshint -W065 */

function loadJqueryEx () {
  (function($) {
    // fix for IE if window.console not defined
    if(!window.console) {
      window.console = {};
      if(!window.console.log) {
        window.console.log = function(){};
      }
      if(!window.console.error) {
        window.console.error = function(){};
      }
    }

    if(!$.isMouseLeave) {
      $.isMouseLeave = function(e) {
        if(e.type != "mouseout") return false;
        if(!e.toElement || !e.currentTarget) return true;
        return !(e.currentTarget === e.toElement || e.currentTarget.contains(e.toElement));
      };
    }
    if(!$.fn.fullWidth) {
      $.fn.fullWidth = function() {
        return parseFloat(this.css("width")) + parseFloat(this.css("paddingLeft")) 
          + parseInt(this.css("paddingRight"))
          + parseFloat(this.css("borderLeftWidth")) + parseInt(this.css("borderRightWidth"));
      };
    }
    if(!$.fn.fullHeight) {
      $.fn.fullHeight = function() {
        return parseFloat(this.css("height"))
          + parseFloat(this.css("paddingTop")) + parseInt(this.css("paddingBottom"))
          + parseFloat(this.css("borderTopWidth")) + parseInt(this.css("borderBottomWidth"));
      };
    }
    if(!$.fn.posLeft) {
      $.fn.posLeft = function(n) {
        if(typeof(n) == "undefined") return parseFloat(this.css("left"));
        this.css("left", parseFloat(n) + "px");
        return this;
      };
    }
    if(!$.fn.posTop) {
      $.fn.posTop = function(n) {
        if(typeof(n) == "undefined") return parseFloat(this.css("top"));
        this.css("top", parseFloat(n) + "px");
        return this;
      };
    }

    if(!$.fn.scrollWidth) {
      $.fn.scrollWidth = function() {
        return (this[0] ? this[0].scrollWidth : 0);
      };
    }

    if(!$.fn.scrollHeight) {
      $.fn.scrollHeight = function() {
        return (this[0] ? this[0].scrollHeight : 0);
      };
    }

    if(!$.fn.clientWidth) {
      $.fn.clientWidth = function() {
        return (this[0] ? this[0].clientWidth : 0);
      };
    }

    if(!$.fn.clientHeight) {
      $.fn.clientHeight = function() {
        return (this[0] ? this[0].clientHeight : 0);
      };
    }

    if(!$.fn.getBounds) {
      $.fn.getBounds = function(transformObject, refObject) {
        var bounds = {
          left: Number.POSITIVE_INFINITY,
          top: Number.POSITIVE_INFINITY,
          right: Number.NEGATIVE_INFINITY,
          bottom: Number.NEGATIVE_INFINITY,
          width: Number.NaN,
          height: Number.NaN
        };
        if(this.length <= 0) {
          return { left:0,top:0,right:0,bottom:0,width:0,height:0 };
        }
        if(typeof(transformObject) == "undefined" || transformObject === null || transformObject === false) transformObject = this;

        var dx = 0;
        var dy = 0;
        var item,wdt,hgt,trData;
        for(var qq = 0; qq < this.length; qq++) {
          var obj = $(this[qq]);
          var off = obj.offset();
          off.left += dx;
          off.top += dy;
          var ww = obj.width();
          var hh = obj.height();
          if(obj.css("boxSizing") == "border-box" || obj.css("WebkitBoxSizing") == "border-box" || obj.css("OBoxSizing") == "border-box" || obj.css("msBoxSizing") == "border-box" || obj.css("MozBoxSizing") == "border-box") {
            ww += parseInt(obj.css("borderLeftWidth")) + parseInt(obj.css("borderRightWidth")) + parseInt(obj.css("paddingLeft")) + parseInt(obj.css("paddingRight"));
            hh += parseInt(obj.css("borderTopWidth")) + parseInt(obj.css("borderBottomWidth")) + parseInt(obj.css("paddingTop")) + parseInt(obj.css("paddingBottom"));
          }

          var dd = $(transformObject).css("transform");
          /* 'none' -- opera fix */
          if(!dd || dd === "" || dd === "none") dd = $(transformObject).css("OTtransform");
          if(!dd || dd === "" || dd === "none") dd = $(transformObject).css("msTransform");
          if(!dd || dd === "" || dd === "none") dd = $(transformObject).css("MozTransform");
          if(!dd || dd === "" || dd === "none") dd = $(transformObject).css("WebkitTransform");
          if(dd && dd != "none") trData = dd.match(/matrix\([0-9e\.\,\s\+\-]+\)/);
          if(trData) {
            if(trData[0]) trData = trData[0];
            if(trData) trData = trData.substr(7,dd.length - 8);
            if(trData) trData = trData.split(",");
            if(trData) {
              wdt = Math.abs(ww*parseFloat(trData[0])) + Math.abs(hh*parseFloat(trData[1]));
              hgt = Math.abs(ww*parseFloat(trData[2])) + Math.abs(hh*parseFloat(trData[3]));
            } else {
              wdt = ww;
              hgt = hh;
            }
          } else {
            //rotateZ(0.706688234676948rad)
            trData = dd.match(/rotateZ\(([0-9\.\+\-]+)rad\)/);
            if(trData && trData[1]) {
              wdt = Math.abs(ww*Math.cos(parseFloat(trData[1]))) + Math.abs(hh*Math.sin(parseFloat(trData[1])));
              hgt = Math.abs(ww*Math.sin(parseFloat(trData[1]))) + Math.abs(hh*Math.cos(parseFloat(trData[1])));
            } else {
              wdt = ww;
              hgt = hh;
            }
          }

          // calculate object with full width and height
          off.right = off.left + wdt;
          off.bottom = off.top + hgt;
          if(bounds.left > off.left)     bounds.left = off.left;
          if(bounds.top > off.top)       bounds.top = off.top;
          if(bounds.right < off.right)   bounds.right = off.right;
          if(bounds.bottom < off.bottom) bounds.bottom = off.bottom;
        }
        bounds.width = bounds.right - bounds.left;
        bounds.height = bounds.bottom - bounds.top;
        if(refObject) {
          var rooff = $(refObject).offset();
          bounds.left -= rooff.left;
          bounds.right -= rooff.left;
          bounds.top -= rooff.top;
          bounds.bottom -= rooff.top;
        }
        return bounds;
      };
    }

    if(!$.isHidden) {
      $.isHidden = function(elem) {
        var width = elem.offsetWidth, height = elem.offsetHeight;
        return (width === 0 && height === 0) || (((elem.style && elem.style.display) || $(elem).css("display")) === "none");
      };
    }
    if(!$.isVisible) {
      $.isVisible = function(elem) {
        return !$.isHidden(elem);
      };
    }

    if(!$.fn.filterByVisible) {
      $.fn.filterByVisible = function(){
        var res = $([]);
        for(var qq = 0; qq < this.length; qq++) {
          if($.isVisible(this[qq])) res.push(this[qq]);
        }
        return res;
      };
    }

    /********************************************************************************
     * updated version on on("click", ...) for mobile
     ********************************************************************************/
    if(!$.fn.onExClick) {
      $.fn.onExClick = function(callback) {
        if(!$.browser.mobile) {
          if(callback) this.on("click", callback);
          else this.off("click");
        } else {
          var _touchMove = function(){
            this.removeEventListener("touchmove", _touchMove);
            this.removeEventListener("touchend", _touchEnd);
            this.removeEventListener("touchcancel", _touchCancel);
          };
          var _touchEnd = function(e){
            this.removeEventListener("touchmove", _touchMove);
            this.removeEventListener("touchend", _touchEnd);
            this.removeEventListener("touchcancel", _touchCancel);
            if (callback) {
              callback.call(this, e);
            }
          };
          var _touchCancel = function(e){
            this.removeEventListener("touchmove", _touchMove);
            this.removeEventListener("touchend", _touchEnd);
            this.removeEventListener("touchcancel", _touchCancel);
          };
          var _touchStart = function() {
            this.addEventListener("touchmove", _touchMove, false);
            this.addEventListener("touchend", _touchEnd, false);
            this.addEventListener("touchcancel", _touchCancel, false);
          };
          if(callback) {
            this.each(function(){
              this.addEventListener("touchstart", _touchStart, true);
            });
          } else {
            this.each(function(){
              this.removeEventListener("touchstart", _touchStart);
            });
          }
        }
      };
    }

    /********************************************************************************
     * user's browser detect
     ********************************************************************************/
    jQuery.browser = {
      browserName: "",
      browserVersion: 0,
      mozilla: false,
      webkit: false,
      msie: false,
      safari: false,
      opera: false,
      iPhone: false,
      iPod: false,
      iPad: false,
      Android: false,
      mobile: false,
      urMobileApp: false,
      isTouchDevice: false,

      detect: function() {
        var browserCheck = false;
        var brData = [
          {"name":"Chrome","key":"Chrome","ver":"Chrome/", "check":6},
          {"name":"Firefox","key":"Firefox","ver":"Firefox/", "check":4},
          {"name":"Opera","key":"Opera","ver":"Version/", "check":10.6},
          {"name":"MSIE","key":"MSIE","ver":"MSIE ", "check":9},
          {"name":"Safari","key":"Safari","ver":"Version/", "check":5}];

        // detect browser
        var qq,ww;
        for(qq = 0; brData[qq] !== null; qq++) {
          if(navigator.userAgent.indexOf(brData[qq].key) != -1) {
            this.browserName = brData[qq].name;
            this.msie = (this.browserName == "MSIE");
            this.mozilla = (this.browserName == "Firefox");
            this.safari = (this.browserName == "Safari");
            this.webkit = (this.browserName == "Chrome" || this.safari);
            this.opera = (this.browserName == "Opera");
            ww = navigator.userAgent.indexOf(brData[qq].ver);
            if(ww >= 0) this.browserVersion = parseFloat(navigator.userAgent.substr(ww + brData[qq].ver.length)); //.match(/[0-9]+\.[0-9]+/)
            if(this.browserVersion >= brData[qq].check) browserCheck = true;
            break;
          }
        }

        // check for urturn mobile app
        this.urMobileApp = /(urturn)/i.test(navigator.userAgent);

        // check for mobile device
        this.iPhone = (navigator.userAgent.toLowerCase().indexOf('iphone') != -1);
        this.iPod = (navigator.userAgent.toLowerCase().indexOf('ipod') != -1);
        this.iPad = (navigator.userAgent.toLowerCase().indexOf('ipad') != -1);
        this.Android = (navigator.userAgent.toLowerCase().indexOf('android') != -1);
        var mobile = (navigator.userAgent.toLowerCase().indexOf('mobile') != -1);
        this.isTouchDevice = 'ontouchstart' in document.documentElement;
        this.mobile = !!(this.iPhone || this.iPod || this.iPad || this.Android || mobile || this.isTouchDevice || this.urMobileApp);
      }
    };
    jQuery.browser.detect();

    if(!$.fn.alterClass) {

      $.fn.alterClass = function ( removals, additions ) {

        var self = this;

        if ( removals.indexOf( '*' ) === -1 ) {
          self.removeClass( removals );
          return !additions ? self : self.addClass( additions );
        }

        var patt = new RegExp( '\\s' +
          removals.
          replace( /\*/g, '[A-Za-z0-9-_]+' ).
          split( ' ' ).
          join( '\\s|\\s' ) +
          '\\s', 'g' );

        self.each( function ( i, it ) {
          var cn = ' ' + it.className + ' ';
          while ( patt.test( cn ) ) {
            cn = cn.replace( patt, ' ' );
          }
          it.className = cn.trim();
        });

        return !additions ? self : self.addClass( additions );
      };
    }

    if(!$.fn.has3d) {
      $.fn.has3d = function () {

        var el = document.createElement('p'),
        has3d,
        transforms = {
            'webkitTransform':'-webkit-transform',
            'OTransform':'-o-transform',
            'msTransform':'-ms-transform',
            'MozTransform':'-moz-transform',
            'transform':'transform'
        };

        // Add it to the body to get the computed style
        document.body.insertBefore(el, null);

        for(var t in transforms){
            if( el.style[t] !== undefined ){
                el.style[t] = 'translate3d(1px,1px,1px)';
                has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
        }

        document.body.removeChild(el);

        return (has3d !== undefined && has3d.length > 0 && has3d !== "none");

      };
    }

  })(window.jq || window.Zepto || window.jQuery);
}
