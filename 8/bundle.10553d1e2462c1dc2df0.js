(()=>{var e={10:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var i=n(537),s=n.n(i),r=n(645),o=n.n(r)()(s());o.push([e.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const a=o},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",i=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),i&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),i&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,i,s,r){"string"==typeof e&&(e=[[null,e,void 0]]);var o={};if(i)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var c=0;c<e.length;c++){var u=[].concat(e[c]);i&&o[u[0]]||(void 0!==r&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=r),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),s&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=s):u[4]="".concat(s)),t.push(u))}},t}},537:e=>{"use strict";e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),r="/*# ".concat(s," */");return[t].concat([r]).join("\n")}return[t].join("\n")}},484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",o="day",a="week",l="month",c="quarter",u="year",d="date",f="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},m=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},y={s:m,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,l),r=n-s<0,o=t.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-o:o-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:u,w:a,d:o,D:d,h:r,m:s,s:i,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},$="en",_={};_[$]=v;var g=function(e){return e instanceof E},b=function e(t,n,i){var s;if(!t)return $;if("string"==typeof t){var r=t.toLowerCase();_[r]&&(s=r),n&&(_[r]=n,s=r);var o=t.split("-");if(!s&&o.length>1)return e(o[0])}else{var a=t.name;_[a]=t,s=a}return!i&&s&&($=s),s||!i&&$},w=function(e,t){if(g(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new E(n)},M=y;M.l=b,M.i=g,M.w=function(e,t){return w(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var E=function(){function v(e){this.$L=b(e.locale,null,!0),this.parse(e)}var m=v.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(M.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(h);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return M},m.isValid=function(){return!(this.$d.toString()===f)},m.isSame=function(e,t){var n=w(e);return this.startOf(t)<=n&&n<=this.endOf(t)},m.isAfter=function(e,t){return w(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<w(e)},m.$g=function(e,t,n){return M.u(e)?this[t]:this.set(n,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var n=this,c=!!M.u(t)||t,f=M.p(e),h=function(e,t){var i=M.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?i:i.endOf(o)},p=function(e,t){return M.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},v=this.$W,m=this.$M,y=this.$D,$="set"+(this.$u?"UTC":"");switch(f){case u:return c?h(1,0):h(31,11);case l:return c?h(1,m):h(0,m+1);case a:var _=this.$locale().weekStart||0,g=(v<_?v+7:v)-_;return h(c?y-g:y+(6-g),m);case o:case d:return p($+"Hours",0);case r:return p($+"Minutes",1);case s:return p($+"Seconds",2);case i:return p($+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var a,c=M.p(e),f="set"+(this.$u?"UTC":""),h=(a={},a[o]=f+"Date",a[d]=f+"Date",a[l]=f+"Month",a[u]=f+"FullYear",a[r]=f+"Hours",a[s]=f+"Minutes",a[i]=f+"Seconds",a[n]=f+"Milliseconds",a)[c],p=c===o?this.$D+(t-this.$W):t;if(c===l||c===u){var v=this.clone().set(d,1);v.$d[h](p),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else h&&this.$d[h](p);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[M.p(e)]()},m.add=function(n,c){var d,f=this;n=Number(n);var h=M.p(c),p=function(e){var t=w(f);return M.w(t.date(t.date()+Math.round(e*n)),f)};if(h===l)return this.set(l,this.$M+n);if(h===u)return this.set(u,this.$y+n);if(h===o)return p(1);if(h===a)return p(7);var v=(d={},d[s]=e,d[r]=t,d[i]=1e3,d)[h]||1,m=this.$d.getTime()+n*v;return M.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=M.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,u=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},d=function(e){return M.s(r%12||12,e,"0")},h=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:M.s(a+1,2,"0"),MMM:u(n.monthsShort,a,c,3),MMMM:u(c,a),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,l,2),ddd:u(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:M.s(r,2,"0"),h:d(1),hh:d(2),a:h(r,o,!0),A:h(r,o,!1),m:String(o),mm:M.s(o,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:s};return i.replace(p,(function(e,t){return t||v[e]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,f){var h,p=M.p(d),v=w(n),m=(v.utcOffset()-this.utcOffset())*e,y=this-v,$=M.m(this,v);return $=(h={},h[u]=$/12,h[l]=$,h[c]=$/3,h[a]=(y-m)/6048e5,h[o]=(y-m)/864e5,h[r]=y/t,h[s]=y/e,h[i]=y/1e3,h)[p]||y,f?$:M.a($)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return _[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=b(e,t,!0);return i&&(n.$L=i),n},m.clone=function(){return M.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),T=E.prototype;return w.prototype=T,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",o],["$M",l],["$y",u],["$D",d]].forEach((function(e){T[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),w.extend=function(e,t){return e.$i||(e(t,E,w),e.$i=!0),w},w.locale=b,w.isDayjs=g,w.unix=function(e){return w(1e3*e)},w.en=_[$],w.Ls=_,w.p={},w}()},646:function(e){e.exports=function(){"use strict";var e,t,n=1e3,i=6e4,s=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,a=31536e6,l=2592e6,c=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,u={years:a,months:l,days:r,hours:s,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},d=function(e){return e instanceof $},f=function(e,t,n){return new $(e,n,t.$l)},h=function(e){return t.p(e)+"s"},p=function(e){return e<0},v=function(e){return p(e)?Math.ceil(e):Math.floor(e)},m=function(e){return Math.abs(e)},y=function(e,t){return e?p(e)?{negative:!0,format:""+m(e)+t}:{negative:!1,format:""+e+t}:{negative:!1,format:""}},$=function(){function p(e,t,n){var i=this;if(this.$d={},this.$l=n,void 0===e&&(this.$ms=0,this.parseFromMilliseconds()),t)return f(e*u[h(t)],this);if("number"==typeof e)return this.$ms=e,this.parseFromMilliseconds(),this;if("object"==typeof e)return Object.keys(e).forEach((function(t){i.$d[h(t)]=e[t]})),this.calMilliseconds(),this;if("string"==typeof e){var s=e.match(c);if(s){var r=s.slice(2).map((function(e){return null!=e?Number(e):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var m=p.prototype;return m.calMilliseconds=function(){var e=this;this.$ms=Object.keys(this.$d).reduce((function(t,n){return t+(e.$d[n]||0)*u[n]}),0)},m.parseFromMilliseconds=function(){var e=this.$ms;this.$d.years=v(e/a),e%=a,this.$d.months=v(e/l),e%=l,this.$d.days=v(e/r),e%=r,this.$d.hours=v(e/s),e%=s,this.$d.minutes=v(e/i),e%=i,this.$d.seconds=v(e/n),e%=n,this.$d.milliseconds=e},m.toISOString=function(){var e=y(this.$d.years,"Y"),t=y(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=y(n,"D"),s=y(this.$d.hours,"H"),r=y(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var a=y(o,"S"),l=e.negative||t.negative||i.negative||s.negative||r.negative||a.negative,c=s.format||r.format||a.format?"T":"",u=(l?"-":"")+"P"+e.format+t.format+i.format+c+s.format+r.format+a.format;return"P"===u||"-P"===u?"P0D":u},m.toJSON=function(){return this.toISOString()},m.format=function(e){var n=e||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:t.s(this.$d.years,2,"0"),YYYY:t.s(this.$d.years,4,"0"),M:this.$d.months,MM:t.s(this.$d.months,2,"0"),D:this.$d.days,DD:t.s(this.$d.days,2,"0"),H:this.$d.hours,HH:t.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:t.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:t.s(this.$d.seconds,2,"0"),SSS:t.s(this.$d.milliseconds,3,"0")};return n.replace(o,(function(e,t){return t||String(i[e])}))},m.as=function(e){return this.$ms/u[h(e)]},m.get=function(e){var t=this.$ms,n=h(e);return"milliseconds"===n?t%=1e3:t="weeks"===n?v(t/u[n]):this.$d[n],0===t?0:t},m.add=function(e,t,n){var i;return i=t?e*u[h(t)]:d(e)?e.$ms:f(e,this).$ms,f(this.$ms+i*(n?-1:1),this)},m.subtract=function(e,t){return this.add(e,t,!0)},m.locale=function(e){var t=this.clone();return t.$l=e,t},m.clone=function(){return f(this.$ms,this)},m.humanize=function(t){return e().add(this.$ms,"ms").locale(this.$l).fromNow(!t)},m.milliseconds=function(){return this.get("milliseconds")},m.asMilliseconds=function(){return this.as("milliseconds")},m.seconds=function(){return this.get("seconds")},m.asSeconds=function(){return this.as("seconds")},m.minutes=function(){return this.get("minutes")},m.asMinutes=function(){return this.as("minutes")},m.hours=function(){return this.get("hours")},m.asHours=function(){return this.as("hours")},m.days=function(){return this.get("days")},m.asDays=function(){return this.as("days")},m.weeks=function(){return this.get("weeks")},m.asWeeks=function(){return this.as("weeks")},m.months=function(){return this.get("months")},m.asMonths=function(){return this.as("months")},m.years=function(){return this.get("years")},m.asYears=function(){return this.as("years")},p}();return function(n,i,s){e=s,t=s().$utils(),s.duration=function(e,t){var n=s.locale();return f(e,{$l:n},t)},s.isDuration=d;var r=i.prototype.add,o=i.prototype.subtract;i.prototype.add=function(e,t){return d(e)&&(e=e.asMilliseconds()),r.bind(this)(e,t)},i.prototype.subtract=function(e,t){return d(e)&&(e=e.asMilliseconds()),o.bind(this)(e,t)}}}()},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,i=0;i<t.length;i++)if(t[i].identifier===e){n=i;break}return n}function i(e,i){for(var r={},o=[],a=0;a<e.length;a++){var l=e[a],c=i.base?l[0]+i.base:l[0],u=r[c]||0,d="".concat(c," ").concat(u);r[c]=u+1;var f=n(d),h={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==f)t[f].references++,t[f].updater(h);else{var p=s(h,i);i.byIndex=a,t.splice(a,0,{identifier:d,updater:p,references:1})}o.push(d)}return o}function s(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,s){var r=i(e=e||[],s=s||{});return function(e){e=e||[];for(var o=0;o<r.length;o++){var a=n(r[o]);t[a].references--}for(var l=i(e,s),c=0;c<r.length;c++){var u=n(r[c]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}r=l}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var i=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleTagTransform(i,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={id:i,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{"use strict";const e=[{id:1,basePrice:1100,dateFrom:"2023-03-11T16:45:56.845Z",dateTo:"2023-03-11T17:22:13.375Z",destination:1,isFavorite:!1,offers:[1],type:"taxi"},{id:2,basePrice:1120,dateFrom:"2023-04-10T11:55:56.845Z",dateTo:"2023-04-12T12:22:13.375Z",destination:2,isFavorite:!0,offers:[2],type:"drive"},{id:3,basePrice:1130,dateFrom:"2023-05-11T10:55:56.845Z",dateTo:"2023-05-11T11:22:13.375Z",destination:3,isFavorite:!1,offers:[15,16,17],type:"flight"}],t=[{id:1,description:"Moscow, is a beautiful city, a true asian pearl, with crowded streets.",name:"Moscow",pictures:[{src:"http://picsum.photos/300/200?r=0.0762563005163317",description:"Moscow parliament building"}]},{id:2,description:"London, is a beautiful city, a true asian pearl, with crowded streets.",name:"London",pictures:[{src:"http://picsum.photos/300/200?r=0.0762563005163317",description:"London parliament building"}]},{id:3,description:"Berlin, is a beautiful city, a true asian pearl, with crowded streets.",name:"Berlin",pictures:[{src:"http://picsum.photos/300/200?r=0.0762563005163317",description:"Berlin parliament building"}]}],i=[{type:"taxi",offers:[{id:1,title:"Taxi offer 1",price:20},{id:2,title:"Taxi offer 2",price:10},{id:3,title:"Taxi offer 3",price:10}]},{type:"bus",offers:[{id:4,title:"Bus offer 1",price:20},{id:5,title:"Bus offer 2",price:10},{id:5,title:"Bus offer 3",price:10}]},{type:"train",offers:[{id:6,title:"train offer 1",price:20},{id:7,title:"train offer 2",price:10},{id:8,title:"train offer 3",price:10}]},{type:"ship",offers:[{id:9,title:"ship offer 1",price:20},{id:10,title:"ship offer 2",price:10},{id:11,title:"ship offer 3",price:10}]},{type:"drive",offers:[{id:12,title:"drive offer 1",price:20},{id:13,title:"drive offer 2",price:10},{id:14,title:"drive offer 3",price:10}]},{type:"flight",offers:[{id:15,title:"flight offer 1",price:20},{id:16,title:"flight offer 2",price:12},{id:17,title:"flight offer 3",price:10}]},{type:"check-in",offers:[{id:18,title:"check-in offer 1",price:20},{id:19,title:"check-in offer 2",price:10},{id:20,title:"check-in offer 3",price:10}]},{type:"sightseeing",offers:[{id:21,title:"sightseeing offer 1",price:20},{id:22,title:"sightseeing offer 2",price:10},{id:23,title:"sightseeing offer 3",price:10}]},{type:"restaurant",offers:[{id:24,title:"restaurant offer 1",price:20},{id:25,title:"restaurant offer 2",price:10},{id:26,title:"restaurant offer 3",price:10}]}];var s=n(484),r=n.n(s);const o=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],a=["day","event","time","price","offers"],l=a[0],c={EVERYTHING:"everything",FUTURE:"future",PAST:"past",PRESENT:"present"},u=c[-1],d={[c.EVERYTHING]:"Click New Event to create your first point",[c.PAST]:"There are no past events now",[c.PRESENT]:"There are no present events now",[c.FUTURE]:"There are no future events now"},f="MMM DD",h="HH:mm",p="YYYY-MM-DDTHH:mm",v="YYYY-MM-DD",m="DD/MM/YY HH:mm",y="DD[D]",$="HH[H]",_="mm[M]",g="DEFAULT",b="EDIT";function w(e,t,n="beforeend"){if(!(e instanceof B))throw new Error("Can render only components");if(null===t)throw new Error("Container element doesn't exist");t.insertAdjacentElement(n,e.element)}function M(e,t){if(!(e instanceof B&&t instanceof B))throw new Error("Can replace only components");const n=e.element,i=t.element,s=i.parentElement;if(null===s)throw new Error("Parent element doesn't exist");s.replaceChild(n,i)}var E=n(379),T=n.n(E),S=n(795),k=n.n(S),D=n(569),C=n.n(D),A=n(565),x=n.n(A),H=n(216),F=n.n(H),Y=n(589),L=n.n(Y),O=n(10),V={};V.styleTagTransform=L(),V.setAttributes=x(),V.insert=C().bind(null,"head"),V.domAPI=k(),V.insertStyleElement=F(),T()(O.Z,V),O.Z&&O.Z.locals&&O.Z.locals;const I="shake";class B{#e=null;constructor(){if(new.target===B)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#e||(this.#e=function(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}(this.template)),this.#e}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#e=null}shake(e){this.element.classList.add(I),setTimeout((()=>{this.element.classList.remove(I),e?.()}),600)}}const P=Object.values(c);class j extends B{#t="";constructor({currentFilter:e}){super(),this.#t=e}get template(){return e=P,this.#t,`\n    <form class="trip-filters" action="#" method="get">\n    ${P.map((t=>{return`\n    <div class="trip-filters__filter">\n    <input id="filter-${i=t}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${i}" ${n=t===e,n?"checked":""}>\n    <label class="trip-filters__filter-label" for="filter-${i}">${i}</label>\n    </div>\n    `;var n,i})).join("")}\n    <button class="visually-hidden" type="submit">Accept filter</button>\n  </form>\n  `;var e}}class N extends B{get template(){return'\n    <section class="trip-main__trip-info  trip-info">\n    <div class="trip-info__main">\n      <h1 class="trip-info__title">Amsterdam — Chamonix — Geneva</h1>\n\n      <p class="trip-info__dates">18&nbsp;—&nbsp;20 Mar</p>\n    </div>\n\n    <p class="trip-info__cost">\n      Total: €&nbsp;<span class="trip-info__cost-value">1230</span>\n    </p>\n  </section>\n  '}}class U extends B{get template(){return"\n    <ul class='trip-events__list'></ul>\n    "}}class Z extends B{#n="";constructor({currentSortType:e}){super(),this.#n=e}get template(){return e=a,this.#n,`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    ${a.map((t=>function(e,t){return`\n    <div class="trip-sort__item  trip-sort__item--${e}">\n    <input id="sort-${e}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${e}" ${t?"checked":""}>\n    <label class="trip-sort__btn" for="sort-${e}">${e}</label>\n  </div>\n    `}(t,t===e))).join("")}\n  </form>`;var e}}class q extends B{#i="";constructor({filterType:e}){super(),this.#i=e}get template(){return e=this.#i,`<p class="trip-events__msg">${d[e]}</p>`;var e}}var W=n(646),R=n.n(W);function z(e,t){return r()(e).format(t)}r().extend(R());class J extends B{#s=null;#r=null;#o=null;#a=null;#l=null;#c=null;constructor({event:e,destinations:t,offers:n,onEditClick:i,onFavoriteClick:s}){super(),this.#s=e,this.#r=t,this.#o=n,this.#a=i,this.#c=s,this.#l=this.element.querySelector(".event__rollup-btn"),this.#l.addEventListener("click",this.#u),this.element.querySelector(".event__favorite-btn").addEventListener("click",this.#d)}get template(){return function(e,t,n){const{basePrice:i,dateFrom:s,dateTo:o,type:a,isFavorite:l}=e,c=t.find((t=>t.type===e.type)).offers.filter((t=>e.offers.includes(t.id))),u=n.find((t=>t.id===e.destination)),d=z(s,v),m=z(s,f),g=z(s,p),b=z(s,h),w=z(o,h),M=z(o,p),E=function(e,t){const n=r()(e),i=r()(t).diff(n),s=r().duration(i).days(),o=r().duration(i).hours(),a=r().duration(i).minutes(),l=[];if(s>0&&l.push(r()(i).format(y)),0===o&&s>0&&l.push(r()(i).format($)),a>=0)return l.push(r()(i).format(_)),l.join(" ")}(s,e.dateTo);return`\n    <li class="trip-events__item">\n              <div class="event">\n                <time class="event__date" datetime="${d}">${m}</time>\n                <div class="event__type">\n                  <img class="event__type-icon" width="42" height="42" src="img/icons/${a}.png" alt="Event type icon">\n                </div>\n                <h3 class="event__title">${a} ${u.name}</h3>\n                <div class="event__schedule">\n                  <p class="event__time">\n                    <time class="event__start-time" datetime="${g}">${b}</time>\n                    &mdash;\n                    <time class="event__end-time" datetime="${M}">${w}</time>\n                  </p>\n                  <p class="event__duration">${E}</p>\n                </div>\n                <p class="event__price">\n                  &euro;&nbsp;<span class="event__price-value">${i}</span>\n                </p>\n                <h4 class="visually-hidden">Offers:</h4>\n                <ul class="event__selected-offers">\n                ${c.map((e=>`<li class="event__offer">\n                    <span class="event__offer-title">${e.title}</span>\n                    &plus;&euro;&nbsp;\n                    <span class="event__offer-price">${e.price}</span>\n                  </li>`)).join("")}\n                </ul>\n                <button class="event__favorite-btn ${l?"event__favorite-btn--active":""}" type="button">\n                  <span class="visually-hidden">Add to favorite</span>\n                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n                  </svg>\n                </button>\n                <button class="event__rollup-btn" type="button">\n                  <span class="visually-hidden">Open event</span>\n                </button>\n              </div>\n            </li>\n    `}(this.#s,this.#o,this.#r)}removeElement(){super.removeElement(),this.#l.removeEventListener("click",this.#u)}#u=e=>{e.preventDefault(),this.#a()};#d=()=>{this.#c()}}class X extends B{#s=null;#r=null;#o=null;#f=null;#h=null;constructor({event:e,destinations:t,offers:n,onFormCancel:i,onFormSubmit:s}){super(),this.#s=e,this.#r=t,this.#o=n,this.#f=s,this.#h=i,this.element.addEventListener("submit",this.#p),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#v),this.element.querySelector(".event__reset-btn").addEventListener("click",this.#v)}get template(){return function(e,t,n){const{basePrice:i,dateFrom:s,dateTo:r,type:a}=e,l=n.find((t=>t.type===e.type)).offers,c=l.filter((t=>e.offers.includes(t.id))),u=t.find((t=>t.id===e.destination)),d=e.id,{name:f,description:h,pictures:p}=u||{},v=z(r,m),y=z(s,m);return`\n    <li class="trip-events__item">\n    <form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n        <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-${d}">\n            <span class="visually-hidden">Choose event type</span>\n            <img class="event__type-icon" width="17" height="17" src="img/icons/${a}.png" alt="Event type icon">\n          </label>\n          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${d}" type="checkbox">\n\n          <div class="event__type-list">\n            <fieldset class="event__type-group">\n              <legend class="visually-hidden">Event type</legend>\n\n              ${o.map((e=>{return`<div class="event__type-item">\n                <input id="event-type-${e}-${d}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}" ${e===a?"checked":""}>\n                <label class="event__type-label  event__type-label--${e}" for="event-type-taxi-1">${t=e,t.replace(t[0],t[0].toUpperCase())}</label>\n              </div>`;var t})).join("")}\n\n            </fieldset>\n          </div>\n        </div>\n\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-${d}">\n            ${a}\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-${d}" type="text" name="event-destination" value="${f||""}" list="destination-list-${d}">\n          <datalist id="destination-list-${d}">\n          ${t.map((e=>`<option value="${e.name}"></option>`)).join("")}\n          </datalist>\n        </div>\n\n        <div class="event__field-group  event__field-group--time">\n          <label class="visually-hidden" for="event-start-time-${d}">From</label>\n          <input class="event__input  event__input--time" id="event-start-time-${d}" type="text" name="event-start-time" value="${y}">\n          —\n          <label class="visually-hidden" for="event-end-time-${d}">To</label>\n          <input class="event__input  event__input--time" id="event-end-time-${d}" type="text" name="event-end-time" value="${v}">\n        </div>\n\n        <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-${d}">\n            <span class="visually-hidden">Price</span>\n            €\n          </label>\n          <input class="event__input  event__input--price" id="event-price-${d}" type="text" name="event-price" value="${i}">\n        </div>\n\n        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n        <button class="event__reset-btn" type="reset">${e.id?"Delete":"Cancel"}</button>\n        ${e.id?'<button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>':""}\n        \n      </header>\n      <section class="event__details">\n      ${l.length?`<section class="event__section  event__section--offers">\n      <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n      <div class="event__available-offers">\n      ${l.map((e=>`<div class="event__offer-selector">\n        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${e.title}-${d}" type="checkbox" name="event-offer-${e.title}" ${c.map((e=>e.id)).includes(e.id)?"checked":""}>\n        <label class="event__offer-label" for="event-offer-${e.title}-${d}">\n          <span class="event__offer-title">${e.title}</span>\n          +€&nbsp;\n          <span class="event__offer-price">${e.price}</span>\n        </label>\n      </div>`)).join("")}\n      </div>\n      </section>`:""}\n    ${u?`<section class="event__section  event__section--destination">\n      <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n      <p class="event__destination-description">${h}</p>\n    ${p.length?`<div class="event__photos-container">\n        <div class="event__photos-tape">\n          ${p.map((e=>`<img class="event__photo" src="${e.src}" alt="${e.description}">`))}\n        </div>\n      </div>`:""}\n    </section>`:""}\n      </section>\n    </form>\n  </li>`}(this.#s,this.#r,this.#o)}removeElement(){super.removeElement(),this.element.removeEventListener("submit",this.#p),this.element.querySelector(".event__rollup-btn").removeEventListener("click",this.#v),this.element.querySelector(".event__reset-btn").removeEventListener("click",this.#v)}#p=e=>{e.preventDefault(),this.#f()};#v=e=>{e.preventDefault(),this.#h()}}class K{#m=null;#y=null;#s=null;#$=null;#_=null;#g=null;#b=null;#w=g;constructor({container:e,eventModel:t,onEventUpdate:n,onEditMode:i}){this.#m=e,this.#y=t,this.#g=n,this.#b=i}init(e){this.#s=e,this.#M(e)}resetView(){this.#w===b&&this.#E()}#T(){this.#b(),M(this.#_,this.#$),document.addEventListener("keydown",this.#S),this.#w=b}#E(){M(this.#$,this.#_),document.removeEventListener("keydown",this.#S),this.#w=g}#S=e=>{"Escape"===e.key&&(e.preventDefault(),this.#E())};#M(e){const t=this.#y.destinations,n=this.#y.offers,i=this.#$;this.#$=new J({event:e,offers:n,destinations:t,onEditClick:()=>this.#T(),onFavoriteClick:()=>{const t=(n=e,i={isFavorite:!e.isFavorite},{...n,...i});var n,i;this.#g(t)}}),this.#_=new X({event:e,offers:n,destinations:t,onFormSubmit:()=>this.#E(),onFormCancel:()=>this.#E()}),null!==i?M(this.#$,i):w(this.#$,this.#m)}}const G=document.querySelector(".page-body"),Q=G.querySelector(".trip-main"),ee=Q.querySelector(".trip-controls__filters"),te=G.querySelector(".trip-events"),ne=new class{#k=e;#r=t;#o=i;#D=a;get events(){return this.#k}set events(e){this.#k=[...e]}get offers(){return this.#o}get destinations(){return this.#r}get sortTypes(){return this.#D}},ie=new class{#C=Object.values(c);get filterTypes(){return this.#C}},se=new class{#m=null;#y=null;#A=null;#x=new Map;#k=[];constructor({container:e,eventModel:t}){this.#m=e,this.#y=t,this.#A=new U}init(){this.#k=this.#y.events,this.#H(this.#y)}#F(){w(new Z({sortTypes:this.#y.sortTypes,currentSortType:l}),this.#m)}#Y(){w(new q({filterTypes:u}),this.#m)}#H(){0!==this.#k.length?(this.#F(),w(this.#A,this.#m),this.#k.forEach((e=>{const t=new K({event:e,eventModel:this.#y,container:this.#A.element,onEventUpdate:this.#L,onEditMode:this.#O});t.init(e),this.#x.set(e.id,t)}))):this.#Y()}#L=e=>{var t,n;this.#k=(t=this.#k,n=e,t.map((e=>e.id===n.id?n:e))),this.#x.get(e.id).init(e)};#O=()=>{this.#x.forEach((e=>e.resetView()))}}({container:te,eventModel:ne,filterModel:ie}),re=new class{#V=new N;#m=null;constructor({container:e}){this.#m=e}init(){w(this.#V,this.#m,"afterbegin")}}({container:Q}),oe=new class{#m=null;#I=null;constructor({container:e,filterModel:t}){this.#m=e,this.#I=t}#B(e){w(new j({filterTypes:e,currentFilter:u}),this.#m)}init(){this.#B(this.#I.filterTypes)}}({container:ee,filterModel:ie});se.init(),re.init(),oe.init()})()})();
//# sourceMappingURL=bundle.10553d1e2462c1dc2df0.js.map