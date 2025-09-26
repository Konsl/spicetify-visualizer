var visualizer=(()=>{var e,t,P=Object.create,a=Object.defineProperty,I=Object.getOwnPropertyDescriptor,U=Object.getOwnPropertyNames,N=Object.getPrototypeOf,O=Object.prototype.hasOwnProperty,M=(t,r,i,n)=>{if(r&&"object"==typeof r||"function"==typeof r)for(let e of U(r))O.call(t,e)||e===i||a(t,e,{get:()=>r[e],enumerable:!(n=I(r,e))||n.enumerable});return t},r=(e,t,r)=>(r=null!=e?P(N(e)):{},M(!t&&e&&e.__esModule?r:a(r,"default",{value:e,enumerable:!0}),e)),i=(e={"external-global-plugin:react"(e,t){t.exports=Spicetify.React}},function(){return t||(0,e[U(e)[0]])((t={exports:{}}).exports,t),t.exports}),B={},g=(((e,t)=>{for(var r in t)a(e,r,{get:t[r],enumerable:!0})})(B,{default:()=>function(){return Re.default.createElement(Te,null)}}),r(i())),y={main_menu_button:"app-module__main_menu_button___wQmMP_visualizer",error_container:"app-module__error_container___8JcIQ_visualizer",error_message:"app-module__error_message___soZdL_visualizer"},n=r(i());function k(){return n.default.createElement("svg",{width:"100px",height:"100px",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid"},n.default.createElement("circle",{cx:"50",cy:"50",r:"0",fill:"none",stroke:"currentColor","stroke-width":"2"},n.default.createElement("animate",{attributeName:"r",repeatCount:"indefinite",dur:"1s",values:"0;40",keyTimes:"0;1",keySplines:"0 0.2 0.8 1",calcMode:"spline",begin:"0s"}),n.default.createElement("animate",{attributeName:"opacity",repeatCount:"indefinite",dur:"1s",values:"1;0",keyTimes:"0;1",keySplines:"0.2 0 0.8 1",calcMode:"spline",begin:"0s"})),n.default.createElement("circle",{cx:"50",cy:"50",r:"0",fill:"none",stroke:"currentColor","stroke-width":"2"},n.default.createElement("animate",{attributeName:"r",repeatCount:"indefinite",dur:"1s",values:"0;40",keyTimes:"0;1",keySplines:"0 0.2 0.8 1",calcMode:"spline",begin:"-0.5s"}),n.default.createElement("animate",{attributeName:"opacity",repeatCount:"indefinite",dur:"1s",values:"1;0",keyTimes:"0;1",keySplines:"0.2 0 0.8 1",calcMode:"spline",begin:"-0.5s"})))}var o=r(i()),h=r(i());function s(n){let{contextType:a,onInit:o,onResize:s,onRender:u,style:e,data:l,isEnabled:t}=n,c=(0,h.useRef)(null),[f,d]=(0,h.useState)(null),m=(0,h.useCallback)((e,t)=>{var r=Math.round(e.clientWidth*window.devicePixelRatio),i=Math.round(e.clientHeight*window.devicePixelRatio),{width:r,height:i}=n.sizeConstraint?.(r,i)??{width:r,height:i};e.width===r&&e.height===i||(e.width=r,e.height=i)},[]);return(0,h.useEffect)(()=>{if(o){var e=c.current;if(e){var t,r,i=e.ownerDocument.defaultView;if(i)return t=e.getContext(a),r=o(t),m(e,i),s(t,r),d(r),()=>d(null)}}},[a,o]),(0,h.useEffect)(()=>{if(t&&f&&u){var e=c.current;if(e){let n=e.ownerDocument.defaultView;if(n){let t=e.getContext(a),r=0,i=e=>{f&&(u(t,l,f,e),r=n.requestAnimationFrame(i))};return r=n.requestAnimationFrame(i),()=>{r&&n.cancelAnimationFrame(r)}}}}},[a,u,l,f,t]),(0,h.useEffect)(()=>{if(c.current){var t=c.current.ownerDocument.defaultView;if(t){let e=new t.ResizeObserver(()=>{var e,t=c.current;t&&(e=t.ownerDocument.defaultView)&&(m(t,e),e=t.getContext(a))&&f&&s(e,f)});return e.observe(c.current),()=>e.disconnect()}}},[a,s,f]),h.default.createElement("canvas",{ref:c,style:{...e||{},...t?{}:{visibility:"hidden"}}})}function R(e,t,r){let i=0,n=e.length;for(;1<n-i;){var a=Math.floor((n+i)/2);t(e[a],a)<=r?i=a:n=a}return i}function S(e){return Math.min(Math.max(Math.pow(10,e/20),0),1)}function z(e){return e*e*(3-2*e)}function _(e,t,r,i,n){return e=(e=(e-t)/(r-t))*(n-i)+i}function m(e,t){return-.5*(e.x-t.x)*(e.y+t.y)}function w(e,t,r,i,n){var a,o=R(e,t,n),s=e[o];return e.length-2<o?r(s,o):(e=e[o+1],n=n,a=t(s,o),t=t(e,o+1),i=i,s=r(s,o),r=r(e,o+1),n=(n=i(n=(n-a)/(t-a)))*(r-s)+s)}var p=(0,r(i()).createContext)(()=>{});var v=class{static init(){let t=(window.webpackChunkclient_web??window.webpackChunkopen).push([[Symbol()],{},e=>e]);var e=Object.keys(t.m).map(e=>t(e));this.modules=e.filter(e=>"object"==typeof e).map(e=>{try{return Object.values(e)}catch{}}).flat()}static getValue(e,t){this.modules||this.init(),e in this.loadedModules||(1===(t=this.modules.filter(t)).length?this.loadedModules[e]={state:"succeeded",value:t[0]}:this.loadedModules[e]={state:"failed"});t=this.loadedModules[e];return"failed"===t.state?null:"succeeded"===t.state?t.value:void 0}static getMetadataService(){return this.getValue("metadataService",e=>e&&"function"==typeof e&&"SERVICE_ID"in e&&"spotify.mdata_esperanto.proto.MetadataService"===e.SERVICE_ID)}static getCreateTransport(){return this.getValue("createTransport",e=>e&&"function"==typeof e&&e.toString().includes("executeEsperantoCall")&&e.toString().includes("cancelEsperantoCall"))}static getStyleSheetManager(){return this.getValue("styleSheetManager",e=>e&&"function"==typeof e&&e.toString().includes("stylisPlugins")&&e.toString().includes("reconstructWithOptions")&&e.toString().includes("disableCSSOMInjection")&&e.toString().includes("disableVendorPrefixes"))}},V=(v.modules=null,v.loadedModules={},(e=>(e[e.UNKNOWN=0]="UNKNOWN",e[e.OK=1]="OK",e[e.NOT_RESOLVED=2]="NOT_RESOLVED",e[e.NOT_FOUND=3]="NOT_FOUND",e[e.UNAVAILABLE_FOR_LEGAL_REASONS=4]="UNAVAILABLE_FOR_LEGAL_REASONS",e))(V||{})),X=class{constructor(){var e=v.getMetadataService(),t=v.getCreateTransport();e&&t&&(this.serviceDescriptor=e,this.service=new this.serviceDescriptor(t()))}fetch(e,t){return new Promise((r,i)=>{this.service&&this.serviceDescriptor||i(0);let n=this.service.observe(this.serviceDescriptor.METHODS.observe.requestType.fromPartial({extensionQuery:[{entityUri:t,extensionKind:e}]}),e=>{var t;e.pendingResponse||(n.cancel(),1===e.extensionResult[0].status?(t=e.extensionResult[0].extensionData,r(t)):(t=e.extensionResult[0].details.cacheStatus,i(t)))})})}},G=class{constructor(e){e instanceof DataView&&(e=new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),this.buffer=e,this.offset=0}getVarIntView(){let e=this.offset;for(;e<this.buffer.length-1&&128&this.buffer[e];)e++;return e++,this.getView(e-this.offset)}getVarInt(){if(this.isExhausted())return 0n;let e=0n,t=0n;for(var r;r=BigInt(this.buffer[this.offset++]),e|=(0x7fn&r)<<t,t+=7n,0x80n&r&&!this.isExhausted(););return e}getArray(e){var e=Math.min(e,this.buffer.length-this.offset),t=this.buffer.slice(this.offset,this.offset+e);return this.offset+=e,t}getView(e){var e=Math.min(e,this.buffer.length-this.offset),t=new DataView(this.buffer.buffer,this.buffer.byteOffset+this.offset,e);return this.offset+=e,t}has(e){return this.buffer.length-this.offset>=e}isExhausted(){return!this.has(1)}};function j(e,t){return e&1n<<BigInt(8*t-1)?e-(1n<<BigInt(8*t)):e}function u(t,r){return[t[0],e=>r(t[1](e))]}var l=[0,e=>new G(e).getVarInt()],c=u(l,e=>!!e),f=u(l,Number);u(l,e=>Number(j(e,4))),u(l,e=>j(e,8));function d(e,t){return{id:e,value:t}}function H(t){return[3,e=>{for(var r=new G(e),i={},n=Object.entries(t).map(([e,t])=>({name:e,...t}));!r.isExhausted();){let t=Number(r.getVarInt());var a=n.find(e=>e.id==t>>3);if(!a||!((e,t)=>{switch(t){case 0:return 0==(7&e);case 1:return 5==(7&e);case 2:return 1==(7&e);case 3:return 2==(7&e)}})(t,a.value[0]))break;var o=a.value,[s,u]=((e,t)=>{switch(t[0]){case 1:return e.has(4)?[!0,t[1](e.getView(4))]:[!1,void 0];case 2:return e.has(8)?[!0,t[1](e.getView(8))]:[!1,void 0];case 0:return[!0,t[1](e.getVarIntView())];case 3:var r=Number(e.getVarInt());return[!0,t[1](e.getView(r))]}})(r,o);if(!s)break;o[2]?(i[a.name]||(i[a.name]=[]),i[a.name].push(u)):i[a.name]=u}return i}]}function $(e,t){for(var r=new b(31),i=0;i<31;++i)r[i]=t+=1<<e[i-1];for(var n=new J(r[30]),i=1;i<30;++i)for(var a=r[i];a<r[i+1];++a)n[a]=a-r[i]<<5|i;return{b:r,r:n}}var E,l=H({rgb:d(1,f),isFallback:d(2,c)}),K=H({colorRaw:d(1,l),colorLight:d(2,l),colorDark:d(3,l)}),x=r(i()),W=Uint8Array,b=Uint16Array,J=Int32Array,Z=new W([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ee=new W([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),te=new W([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),f=$(Z,2),re=f.b,c=(f.r[re[28]=258]=28,$(ee,0)),ie=c.b,ne=new b(32768);for(A=0;A<32768;++A)ne[A]=((65280&(E=(61680&(E=(52428&(E=(43690&A)>>1|(21845&A)<<1))>>2|(13107&E)<<2))>>4|(3855&E)<<4))>>8|(255&E)<<8)>>1;var Y=function(e,t,r){for(var i=e.length,n=0,a=new b(t);n<i;++n)e[n]&&++a[e[n]-1];var o=new b(t);for(n=1;n<t;++n)o[n]=o[n-1]+a[n-1]<<1;if(r){for(var s=new b(1<<t),u=15-t,n=0;n<i;++n)if(e[n])for(var l=n<<4|e[n],c=t-e[n],f=o[e[n]-1]++<<c,d=f|(1<<c)-1;f<=d;++f)s[ne[f]>>u]=l}else for(s=new b(i),n=0;n<i;++n)e[n]&&(s[n]=ne[o[e[n]-1]++]>>15-e[n]);return s},T=new W(288);for(A=0;A<144;++A)T[A]=8;for(A=144;A<256;++A)T[A]=9;for(A=256;A<280;++A)T[A]=7;for(A=280;A<288;++A)T[A]=8;var A,ae=new W(32);for(A=0;A<32;++A)ae[A]=5;var oe=Y(T,9,1),se=Y(ae,5,1),ue=function(e){for(var t=e[0],r=1;r<e.length;++r)t<e[r]&&(t=e[r]);return t},q=function(e,t,r){var i=t/8|0;return(e[i]|e[1+i]<<8)>>(7&t)&r},le=function(e,t){var r=t/8|0;return(e[r]|e[1+r]<<8|e[2+r]<<16)>>(7&t)},ce=function(e){return(e+7)/8|0},fe=function(e,t,r){return(null==r||r>e.length)&&(r=e.length),new W(e.subarray(t=null==t||t<0?0:t,r))},de=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Q=function(e,t,r){t=new Error(t||de[e]);if(t.code=e,Error.captureStackTrace&&Error.captureStackTrace(t,Q),r)return t;throw t},me=function(e,t,r,i){var n=e.length,O=i?i.length:0;if(!n||t.f&&!t.l)return r||new W(0);function a(e){var t=r.length;t<e&&((t=new W(Math.max(2*t,e))).set(r),r=t)}var o=!r,s=o||2!=t.i,u=t.i,l=(o&&(r=new W(3*n)),t.f||0),c=t.p||0,f=t.b||0,d=t.l,m=t.d,h=t.m,g=t.n,y=8*n;do{if(!d){var l=q(e,c,1),p=q(e,c+1,3);if(c+=3,!p){var v=e[(_=ce(c)+4)-4]|e[_-3]<<8,E=_+v;if(n<E){u&&Q(0);break}s&&a(f+v),r.set(e.subarray(_,E),f),t.b=f+=v,t.p=c=8*E,t.f=l;continue}if(1==p)d=oe,m=se,h=9,g=5;else if(2==p){for(var v=q(e,c,31)+257,x=q(e,c+10,15)+4,b=v+q(e,c+5,31)+1,T=(c+=14,new W(b)),R=new W(19),S=0;S<x;++S)R[te[S]]=q(e,c+3*S,7);c+=3*x;for(var E=ue(R),M=(1<<E)-1,B=Y(R,E,1),S=0;S<b;){var _,w=B[q(e,c,M)];if(c+=15&w,(_=w>>4)<16)T[S++]=_;else{var A=0,C=0;for(16==_?(C=3+q(e,c,3),c+=2,A=T[S-1]):17==_?(C=3+q(e,c,7),c+=3):18==_&&(C=11+q(e,c,127),c+=7);C--;)T[S++]=A}}var D=T.subarray(0,v),L=T.subarray(v),h=ue(D),g=ue(L),d=Y(D,h,1),m=Y(L,g,1)}else Q(1);if(y<c){u&&Q(0);break}}s&&a(f+131072);for(var k=(1<<h)-1,z=(1<<g)-1,F=c;;F=c){var P=(A=d[le(e,c)&k])>>4;if(y<(c+=15&A)){u&&Q(0);break}if(A||Q(2),P<256)r[f++]=P;else{if(256==P){F=c,d=null;break}var I,U=P-254,P=(264<P&&(I=Z[S=P-257],U=q(e,c,(1<<I)-1)+re[S],c+=I),m[le(e,c)&z]),N=P>>4,L=(P||Q(3),c+=15&P,ie[N]);if(3<N&&(I=ee[N],L+=le(e,c)&(1<<I)-1,c+=I),y<c){u&&Q(0);break}s&&a(f+131072);var V=f+U;if(f<L){var X=O-L,G=Math.min(L,V);for(X+f<0&&Q(3);f<G;++f)r[f]=i[X+f]}for(;f<V;++f)r[f]=r[f-L]}}t.l=d,t.p=F,t.b=f,t.f=l,d&&(l=1,t.m=h,t.d=m,t.n=g)}while(!l);return f!=r.length&&o?fe(r,0,f):r.subarray(0,f)},l=new W(0),he=function(e,t){return(8!=(15&e[0])||7<e[0]>>4||(e[0]<<8|e[1])%31)&&Q(6,"invalid zlib data"),(e[1]>>5&1)==+!t&&Q(6,"invalid zlib data: "+(32&e[1]?"need":"unexpected")+" dictionary"),2+(e[1]>>3&4)};f="undefined"!=typeof TextDecoder&&new TextDecoder;try{f.decode(l,{stream:!0})}catch(e){}function ge(e){e=e.replace(/-/g,"+").replace(/_/g,"/");var e=new Uint8Array(atob(e).split("").map(e=>e.charCodeAt(0))),e=me(e.subarray(he(e,i&&i.dictionary),-4),{i:2},i&&i.out,i&&i.dictionary),t=(new TextDecoder).decode(e).split(" ").map(e=>parseInt(e)),r=[];if(!(t.length<3)){var i=t.shift(),n=t.shift()/i,a=t.shift();if(!(t.length<a))for(let e=0;e<a;e++){var o=[],s=t.shift();if(t.length<s+(a-e-1))return r;for(let e=0;e<s;e++){var u=t.shift()*n;o.push(0==e?u:o[e-1]+u)}r.push(o)}}return r}var ye=[1,2],pe=[{name:"Beats",layer:"background",render:(t,r,i,n)=>{var a=R(r.analysis.beats,e=>e.start,i.start),o=R(r.analysis.beats,e=>e.start,i.end);t.lineWidth=1,t.strokeStyle="#FFFFFF33",t.beginPath();for(let e=a;e<=o;e++){var s=_(r.analysis.beats[e].start,i.start,i.end,n.x,n.x+n.width);t.moveTo(s,n.y),t.lineTo(s,n.y+n.height)}t.stroke()}},{name:"Bars",layer:"background",render:(t,r,i,n)=>{var a=R(r.analysis.bars,e=>e.start,i.start),o=R(r.analysis.bars,e=>e.start,i.end);t.lineWidth=3,t.strokeStyle="#FFFFFF66",t.beginPath();for(let e=a;e<=o;e++){var s=_(r.analysis.bars[e].start,i.start,i.end,n.x,n.x+n.width);t.moveTo(s,n.y),t.lineTo(s,n.y+n.height)}t.stroke()}},{name:"Position",layer:"overlay",render:(e,t,r,i)=>{e.lineWidth=5,e.strokeStyle=e.fillStyle="white",e.beginPath();r=_(r.current,r.start,r.end,i.x,i.x+i.width);e.moveTo(r,i.y),e.lineTo(r,i.y+i.height),e.stroke();e.beginPath(),e.moveTo(r-10,i.y),e.lineTo(r+10,i.y),e.lineTo(r,i.y+10),e.lineTo(r-10,i.y),e.moveTo(r-10,i.y+i.height),e.lineTo(r+10,i.y+i.height),e.lineTo(r,i.y+i.height-10),e.lineTo(r-10,i.y+i.height),e.fill()}},{name:"Loudness",layer:"content",height:1,render:(t,r,i,n)=>{var a=R(r.analysis.segments,e=>e.start,i.start),o=R(r.analysis.segments,e=>e.start,i.end),s=e=>S(e);t.lineWidth=2,t.strokeStyle="white",t.beginPath();for(let e=a;e<=o+1&&e<r.analysis.segments.length;e++){var u=r.analysis.segments[e],l=_(u.start,i.start,i.end,n.x,n.x+n.width),c=_(s(u.loudness_start),0,1,n.y+n.height,n.y),f=_(u.start+u.loudness_max_time,i.start,i.end,n.x,n.x+n.width),d=_(s(u.loudness_max),0,1,n.y+n.height,n.y);e===a?t.moveTo(l,c):t.lineTo(l,c),t.lineTo(f,d),e===r.analysis.segments.length-1&&(l=_(u.start+u.duration,i.start,i.end,n.x,n.x+n.width),c=_(s(u.loudness_end),0,1,n.y+n.height,n.y),t.lineTo(l,c))}t.stroke()}},{name:"Confidence",layer:"content",height:.25,render:(t,r,i,n)=>{var a=R(r.analysis.segments,e=>e.start,i.start),o=R(r.analysis.segments,e=>e.start,i.end);t.beginPath();for(let e=a;e<=o;e++){var s=r.analysis.segments[e],u=_(s.start,i.start,i.end,n.x,n.x+n.width),l=_(s.start+s.duration,i.start,i.end,n.x,n.x+n.width);t.fillStyle=`rgba(255, 255, 255, ${s.confidence})`,t.fillRect(u,n.y,l-u,n.height)}t.fill()}},{name:"Timbre",layer:"content",height:1.5,render:(r,i,n,a)=>{var o=a.height/12,s=R(i.analysis.segments,e=>e.start,n.start),u=R(i.analysis.segments,e=>e.start,n.end);for(let t=0;t<12;t++){var e=(Math.sqrt(5)-1)/2,l=t*e;r.beginPath();for(let e=s;e<=u;e++){var c=i.analysis.segments[e],f=_(Math.tanh(.02*c.timbre[t]),-1,1,0,1),d=_(c.start,n.start,n.end,a.x,a.x+a.width),c=_(c.start+c.duration,n.start,n.end,a.x,a.x+a.width),m=a.y+t/12*a.height;r.fillStyle=`hsla(${360*l}, 100%, 70%, ${f})`,r.fillRect(d,m,c-d,o)}r.fill()}}},{name:"Pitches",layer:"content",height:1.5,render:(r,i,n,a)=>{var o=a.height/12,s=R(i.analysis.segments,e=>e.start,n.start),u=R(i.analysis.segments,e=>e.start,n.end);for(let t=0;t<12;t++){var l=t/12;r.beginPath();for(let e=s;e<=u;e++){var c=i.analysis.segments[e],f=_(c.start,n.start,n.end,a.x,a.x+a.width),d=_(c.start+c.duration,n.start,n.end,a.x,a.x+a.width),m=a.y+t/12*a.height;r.fillStyle=`hsla(${360*l}, 100%, 70%, ${c.pitches[t]})`,r.fillRect(f,m,d-f,o)}r.fill()}}},{name:"Rhythm",layer:"content",height:.5,render:(r,i,n,a)=>{var o=a.height/i.rhythm.length,s=Math.min(o,20),e=s/2/a.width*(n.end-n.start);r.fillStyle="white",r.beginPath();for(let t=i.rhythm.length-1;0<=t;t--){var u=R(i.rhythm[t],e=>e,n.start-e),l=R(i.rhythm[t],e=>e,n.end+e);for(let e=u;e<=l;e++){var c=_(i.rhythm[t][e],n.start,n.end,a.x,a.x+a.width),f=a.y+t*o;r.rect(c-s/2,f,s,o)}}r.fill()}}];var C=r(i());var D=r(i()),L=D.default.memo(e=>D.default.createElement(Spicetify.ReactComponent.IconComponent,{semanticColor:"textBase",dangerouslySetInnerHTML:{__html:"empty"!==e.name?Spicetify.SVGIcons[e.name]:void 0},iconSize:e.size})),ve=D.default.memo(t=>D.default.createElement(Spicetify.ReactComponent.Menu,null,D.default.createElement(Spicetify.ReactComponent.MenuSubMenuItem,{displayText:"Renderer"},t.renderers.map(e=>D.default.createElement(Spicetify.ReactComponent.MenuItem,{onClick:()=>t.onSelectRenderer(e.id),leadingIcon:D.default.createElement(L,{name:e.id===t.currentRendererId?"check":"empty",size:16})},e.name))),D.default.createElement(Spicetify.ReactComponent.MenuItem,{onClick:()=>t.isFullscreen?t.onExitFullscreen():t.onEnterFullscreen(),trailingIcon:D.default.createElement(L,{name:t.isFullscreen?"minimize":"fullscreen",size:16})},t.isFullscreen?"Exit Fullscreen":"Enter Fullscreen"),D.default.createElement(Spicetify.ReactComponent.MenuItem,{onClick:()=>t.onOpenWindow(),trailingIcon:D.default.createElement(L,{name:"external-link",size:16})},"Open Window"))),Ee=D.default.memo(e=>D.default.createElement(Spicetify.ReactComponent.ContextMenu,{trigger:"click",renderInline:e.renderInline,menu:D.default.createElement(ve,{...e})},D.default.createElement(Spicetify.ReactComponent.ButtonSecondary,{"aria-label":"menu",className:e.className,iconOnly:()=>D.default.createElement(L,{name:"menu",size:16})}))),F=r(i());var xe=r(i());var be=[{id:"ncs",name:"NCS",renderer:function(n){let M=(0,o.useContext)(p);var e=(0,o.useMemo)(()=>{if(!n.audioAnalysis)return[{x:0,y:0}];var e=n.audioAnalysis.segments,t=e.flatMap(e=>e.loudness_max_time?[{x:e.start,y:S(e.loudness_start)},{x:e.start+e.loudness_max_time,y:S(e.loudness_max)}]:[{x:e.start,y:S(e.loudness_start)}]);if(e.length){t[0].accumulatedIntegral=0;for(let e=1;e<t.length;e++){var r=t[e-1],i=t[e];i.accumulatedIntegral=(r.accumulatedIntegral??0)+m(r,i)}e=e[e.length-1];t.push({x:e.start+e.duration,y:S(e.loudness_end)})}return t},[n.audioAnalysis]),t=n.audioAnalysis?.meta.timestamp??0,r=(0,o.useCallback)(n=>{if(!n)return M("Error: WebGL2 is not supported",2),{isError:!0};if(!n.getExtension("EXT_color_buffer_float"))return M("Error: Rendering to floating-point textures is not supported",2),{isError:!0};var e=(e,t,r)=>{e=n.createShader(e);return n.shaderSource(e,t),n.compileShader(e),n.getShaderParameter(e,n.COMPILE_STATUS)||n.isContextLost()?e:(t=`Error: Failed to compile '${r}' shader`,r=n.getShaderInfoLog(e),console.error("[Visualizer] "+t,r),M(t,2),null)},t=(e,t,r)=>{var i=n.createProgram();return n.attachShader(i,e),n.attachShader(i,t),n.linkProgram(i),n.getProgramParameter(i,n.LINK_STATUS)||n.isContextLost()?i:(e=`Error: Failed to link '${r}' shader`,t=n.getProgramInfoLog(i),console.error("[Visualizer] "+e,t),M(e,2),null)},r=e=>{var t=n.createFramebuffer(),r=(n.bindFramebuffer(n.FRAMEBUFFER,t),n.createTexture());return n.bindTexture(n.TEXTURE_2D,r),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,e),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,e),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,r,0),{framebuffer:t,texture:r}},i=e(n.VERTEX_SHADER,`#version 300 es

in vec2 inPosition;
out vec2 fragUV;

void main() {
    gl_Position = vec4(inPosition, 0.0, 1.0);
    fragUV = (inPosition + 1.0) / 2.0;
}
`,"particle vertex");if(!i)return{isError:!0};var a=e(n.FRAGMENT_SHADER,`#version 300 es
precision highp float;

uniform float uNoiseOffset;
uniform float uAmplitude;
uniform int uSeed;

uniform float uDotSpacing;
uniform float uDotOffset;

uniform float uSphereRadius;
uniform float uFeather;

uniform float uNoiseFrequency;
uniform float uNoiseAmplitude;

in vec2 fragUV;
out vec2 outColor;

// https://github.com/Auburn/FastNoiseLite

const float FREQUENCY = 0.01;

const float GAIN = 0.5;
const float LACUNARITY = 1.5;
const float FRACTAL_BOUNDING = 1.0 / 1.75;

const ivec3 PRIMES = ivec3(501125321, 1136930381, 1720413743);

const float GRADIENTS_3D[] = float[](
    0., 1., 1., 0.,  0.,-1., 1., 0.,  0., 1.,-1., 0.,  0.,-1.,-1., 0.,
    1., 0., 1., 0., -1., 0., 1., 0.,  1., 0.,-1., 0., -1., 0.,-1., 0.,
    1., 1., 0., 0., -1., 1., 0., 0.,  1.,-1., 0., 0., -1.,-1., 0., 0.,
    0., 1., 1., 0.,  0.,-1., 1., 0.,  0., 1.,-1., 0.,  0.,-1.,-1., 0.,
    1., 0., 1., 0., -1., 0., 1., 0.,  1., 0.,-1., 0., -1., 0.,-1., 0.,
    1., 1., 0., 0., -1., 1., 0., 0.,  1.,-1., 0., 0., -1.,-1., 0., 0.,
    0., 1., 1., 0.,  0.,-1., 1., 0.,  0., 1.,-1., 0.,  0.,-1.,-1., 0.,
    1., 0., 1., 0., -1., 0., 1., 0.,  1., 0.,-1., 0., -1., 0.,-1., 0.,
    1., 1., 0., 0., -1., 1., 0., 0.,  1.,-1., 0., 0., -1.,-1., 0., 0.,
    0., 1., 1., 0.,  0.,-1., 1., 0.,  0., 1.,-1., 0.,  0.,-1.,-1., 0.,
    1., 0., 1., 0., -1., 0., 1., 0.,  1., 0.,-1., 0., -1., 0.,-1., 0.,
    1., 1., 0., 0., -1., 1., 0., 0.,  1.,-1., 0., 0., -1.,-1., 0., 0.,
    0., 1., 1., 0.,  0.,-1., 1., 0.,  0., 1.,-1., 0.,  0.,-1.,-1., 0.,
    1., 0., 1., 0., -1., 0., 1., 0.,  1., 0.,-1., 0., -1., 0.,-1., 0.,
    1., 1., 0., 0., -1., 1., 0., 0.,  1.,-1., 0., 0., -1.,-1., 0., 0.,
    1., 1., 0., 0.,  0.,-1., 1., 0., -1., 1., 0., 0.,  0.,-1.,-1., 0.
);

float smootherStep(float t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}
vec3 smootherStep(vec3 coord) {
    return vec3(smootherStep(coord.x), smootherStep(coord.y), smootherStep(coord.z));
}

int hash(int seed, ivec3 primed) {
    return (seed ^ primed.x ^ primed.y ^ primed.z) * 0x27d4eb2d;
}

float gradCoord(int seed, ivec3 primed, vec3 d) {
    int hash = hash(seed, primed);
    hash ^= hash >> 15;
    hash &= 63 << 2;
    return d.x * GRADIENTS_3D[hash] + d.y * GRADIENTS_3D[hash | 1] + d.z * GRADIENTS_3D[hash | 2];
}

float perlinSingle(int seed, vec3 coord) {
    ivec3 coord0 = ivec3(floor(coord));
    vec3 d0 = coord - vec3(coord0);
    vec3 d1 = d0 - 1.0;
    vec3 s = smootherStep(d0);
    coord0 *= PRIMES;
    ivec3 coord1 = coord0 + PRIMES;
    float xf00 = mix(gradCoord(seed,                              coord0,                     d0), gradCoord(seed,          ivec3(coord1.x, coord0.yz),      vec3(d1.x, d0.yz)), s.x);
    float xf10 = mix(gradCoord(seed, ivec3(coord0.x, coord1.y, coord0.z), vec3(d0.x, d1.y, d0.z)), gradCoord(seed,          ivec3(coord1.xy, coord0.z),      vec3(d1.xy, d0.z)), s.x);
    float xf01 = mix(gradCoord(seed,          ivec3(coord0.xy, coord1.z),      vec3(d0.xy, d1.z)), gradCoord(seed, ivec3(coord1.x, coord0.y, coord1.z), vec3(d1.x, d0.y, d1.z)), s.x);
    float xf11 = mix(gradCoord(seed,          ivec3(coord0.x, coord1.yz),      vec3(d0.x, d1.yz)), gradCoord(seed,                              coord1,                     d1), s.x);
    float yf0 = mix(xf00, xf10, s.y);
    float yf1 = mix(xf01, xf11, s.y);
    return mix(yf0, yf1, s.z) * 0.964921414852142333984375f;
}

float fractalNoise(vec3 coord) {
    return perlinSingle(uSeed, coord) * FRACTAL_BOUNDING
        + perlinSingle(uSeed + 1, coord * LACUNARITY) * FRACTAL_BOUNDING * GAIN
        + perlinSingle(uSeed + 2, coord * LACUNARITY * LACUNARITY) * FRACTAL_BOUNDING * GAIN * GAIN;
}

void main() {
    float noise = fractalNoise(vec3(fragUV * uNoiseFrequency, uNoiseOffset)) * uNoiseAmplitude;
    vec3 dotCenter = vec3(fragUV * uDotSpacing + uDotOffset + noise, (noise + 0.5 * uNoiseAmplitude) * uAmplitude * 0.4);
    
    float distanceFromCenter = length(dotCenter);
    dotCenter /= distanceFromCenter;
    distanceFromCenter = min(uSphereRadius, distanceFromCenter);
    dotCenter *= distanceFromCenter;

    float featherRadius = uSphereRadius - uFeather;
    float featherStrength = 1.0 - clamp((distanceFromCenter - featherRadius) / uFeather, 0.0, 1.0);
    dotCenter *= featherStrength * (uSphereRadius / distanceFromCenter - 1.0) + 1.0;

    dotCenter.y *= -1.0;
    outColor = dotCenter.xy;
}
`,"particle fragment");if(!a)return{isError:!0};var o,s,u,l,c,f,d,m,h,g,y,p,v,E,x,b,T,R,S,_,w,A,C,D,L,F,P,I,U,O,N,i=t(i,a,"particle");if(i)return a=n.getAttribLocation(i,"inPosition"),o=n.getUniformLocation(i,"uNoiseOffset"),s=n.getUniformLocation(i,"uAmplitude"),u=n.getUniformLocation(i,"uSeed"),l=n.getUniformLocation(i,"uDotSpacing"),c=n.getUniformLocation(i,"uDotOffset"),f=n.getUniformLocation(i,"uSphereRadius"),d=n.getUniformLocation(i,"uFeather"),m=n.getUniformLocation(i,"uNoiseFrequency"),h=n.getUniformLocation(i,"uNoiseAmplitude"),(g=e(n.VERTEX_SHADER,`#version 300 es

uniform int uDotCount;
uniform float uDotRadius;
uniform float uDotRadiusPX;

uniform sampler2D uParticleTexture;

in vec2 inPosition;

out vec2 fragUV;
out float fragDotRadiusPX;

void main() {
    ivec2 dotIndex = ivec2(gl_InstanceID % uDotCount, gl_InstanceID / uDotCount);
    vec2 dotCenter = texelFetch(uParticleTexture, dotIndex, 0).xy;

    gl_Position = vec4(dotCenter + inPosition * uDotRadius * (1.0 + 1.0 / uDotRadiusPX), 0.0, 1.0);
    fragUV = inPosition;
    fragDotRadiusPX = uDotRadiusPX + 1.0;
}
`,"dot vertex"))&&(y=e(n.FRAGMENT_SHADER,`#version 300 es
precision highp float;

in vec2 fragUV;
in float fragDotRadiusPX;
out float outColor;

void main() {
    float t = clamp((1.0 - length(fragUV)) * fragDotRadiusPX, 0.0, 1.0);
    outColor = t;
}
`,"dot fragment"))&&(g=t(g,y,"dot"))&&(y=n.getAttribLocation(g,"inPosition"),p=n.getUniformLocation(g,"uDotCount"),v=n.getUniformLocation(g,"uDotRadius"),E=n.getUniformLocation(g,"uDotRadiusPX"),x=n.getUniformLocation(g,"uParticleTexture"),b=e(n.VERTEX_SHADER,`#version 300 es

uniform float uBlurRadius;
uniform vec2 uBlurDirection;

in vec2 inPosition;

out vec2 fragUV;
flat out vec2 fragBlurDirection;
flat out int fragSupport;
flat out vec3 fragGaussCoefficients;

float calculateGaussianTotal(int support, vec3 fragGaussCoefficients) {
    float total = fragGaussCoefficients.x;
    for (int i = 1; i < support; i++) {
        fragGaussCoefficients.xy *= fragGaussCoefficients.yz;
        total += 2.0 * fragGaussCoefficients.x;
    }
    return total;
}

void main() {
    fragSupport = int(ceil(1.5 * uBlurRadius)) * 2;
    fragGaussCoefficients = vec3(1.0 / (sqrt(2.0 * 3.14159265) * uBlurRadius), exp(-0.5 / (uBlurRadius * uBlurRadius)), 0.0);
    fragGaussCoefficients.z = fragGaussCoefficients.y * fragGaussCoefficients.y;
    fragGaussCoefficients.x /= calculateGaussianTotal(fragSupport, fragGaussCoefficients);

    gl_Position = vec4(inPosition, 0.0, 1.0);
    fragUV = (inPosition + 1.0) / 2.0;
    fragBlurDirection = uBlurDirection;
}
`,"blur vertex"))&&(T=e(n.FRAGMENT_SHADER,`#version 300 es
precision highp float;

uniform sampler2D uInputTexture;

in vec2 fragUV;
flat in vec2 fragBlurDirection;
flat in int fragSupport;
flat in vec3 fragGaussCoefficients;

out float outColor;

void main() {
    vec3 gaussCoefficients = fragGaussCoefficients;
    outColor = gaussCoefficients.x * texture(uInputTexture, fragUV).r;

    for (int i = 1; i < fragSupport; i += 2) {
        gaussCoefficients.xy *= gaussCoefficients.yz;
        float coefficientSum = gaussCoefficients.x;
        gaussCoefficients.xy *= gaussCoefficients.yz;
        coefficientSum += gaussCoefficients.x;

        float pixelRatio = gaussCoefficients.x / coefficientSum;
        vec2 offset = (float(i) + pixelRatio) * fragBlurDirection;

        outColor += coefficientSum * (texture(uInputTexture, fragUV + offset).r + texture(uInputTexture, fragUV - offset).r);
    }
}
`,"blur fragment"))&&(b=t(b,T,"blur"))&&(T=n.getAttribLocation(b,"inPosition"),R=n.getUniformLocation(b,"uBlurRadius"),S=n.getUniformLocation(b,"uBlurDirection"),_=n.getUniformLocation(b,"uInputTexture"),w=e(n.VERTEX_SHADER,`#version 300 es

uniform vec3 uOutputColor;
in vec2 inPosition;

out vec2 fragUV;
out vec3 fragOutputColor;

void main() {
    gl_Position = vec4(inPosition, 0.0, 1.0);
    fragUV = (inPosition + 1.0) / 2.0;
    fragOutputColor = uOutputColor;
}
`,"finalize vertex"))&&(e=e(n.FRAGMENT_SHADER,`#version 300 es
precision highp float;

uniform sampler2D uBlurredTexture;
uniform sampler2D uOriginalTexture;

in vec2 fragUV;
in vec3 fragOutputColor;

out vec4 outColor;

void main() {
    float value = max(texture(uBlurredTexture, fragUV).r, texture(uOriginalTexture, fragUV).r);
    outColor = vec4(fragOutputColor * value, value);
}
`,"finalize fragment"))&&(t=t(w,e,"finalize"))?(w=n.getAttribLocation(t,"inPosition"),e=n.getUniformLocation(t,"uOutputColor"),A=n.getUniformLocation(t,"uBlurredTexture"),C=n.getUniformLocation(t,"uOriginalTexture"),{framebuffer:D,texture:L}=r(n.NEAREST),{framebuffer:F,texture:P}=r(n.NEAREST),{framebuffer:I,texture:U}=r(n.LINEAR),{framebuffer:r,texture:O}=r(n.NEAREST),N=n.createBuffer(),n.bindBuffer(n.ARRAY_BUFFER,N),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),n.STATIC_DRAW),n.enable(n.BLEND),n.blendEquation(n.MAX),{isError:!1,particleShader:i,dotShader:g,blurShader:b,finalizeShader:t,viewportSize:0,particleTextureSize:0,inPositionLoc:a,inPositionLocDot:y,inPositionLocBlur:T,inPositionLocFinalize:w,uNoiseOffsetLoc:o,uAmplitudeLoc:s,uSeedLoc:u,uDotSpacingLoc:l,uDotOffsetLoc:c,uSphereRadiusLoc:f,uFeatherLoc:d,uNoiseFrequencyLoc:m,uNoiseAmplitudeLoc:h,uDotCountLoc:p,uDotRadiusLoc:v,uDotRadiusPXLoc:E,uParticleTextureLoc:x,uBlurRadiusLoc:R,uBlurDirectionLoc:S,uBlurInputTextureLoc:_,uOutputColorLoc:e,uBlurredTextureLoc:A,uOriginalTextureLoc:C,quadBuffer:N,particleFramebuffer:D,particleTexture:L,dotFramebuffer:F,dotTexture:P,blurXFramebuffer:I,blurXTexture:U,blurYFramebuffer:r,blurYTexture:O}):{isError:!0};return{isError:!0}},[]),i=(0,o.useCallback)((e,t)=>{!t.isError&&e&&(t.viewportSize=Math.min(e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.bindTexture(e.TEXTURE_2D,t.dotTexture),e.texImage2D(e.TEXTURE_2D,0,e.R8,t.viewportSize,t.viewportSize,0,e.RED,e.UNSIGNED_BYTE,null),e.bindTexture(e.TEXTURE_2D,t.blurXTexture),e.texImage2D(e.TEXTURE_2D,0,e.R8,t.viewportSize,t.viewportSize,0,e.RED,e.UNSIGNED_BYTE,null),e.bindTexture(e.TEXTURE_2D,t.blurYTexture),e.texImage2D(e.TEXTURE_2D,0,e.R8,t.viewportSize,t.viewportSize,0,e.RED,e.UNSIGNED_BYTE,null))},[]),a=(0,o.useCallback)((a,e,t)=>{if(!t.isError&&a){let i=null,n=[];if(window.do_ncs_perf_test){i=a.getExtension("EXT_disjoint_timer_query_webgl2");for(let e=0;e<4;e++)n[e]=a.createQuery()}var r=Spicetify.Player.getProgress()/1e3,o=75*(.5*r+(l=e.amplitudeCurve,o=R(l,e=>e.x,s=r),u=l[o],l.length<=o+1?(u.accumulatedIntegral??0)+u.y*(s-u.x):(l={x:s,y:_(s,u.x,(s=l[o+1]).x,u.y,s.y)},(u.accumulatedIntegral??0)+m(u,l))))*.01,s=((i,e,t)=>{if(0==t)return w(i,e=>e.x,e=>e.y,e=>e,e);var r,n=e-t/2,e=e+t/2,a=R(i,e=>e.x,n),o=R(i,e=>e.x,e);let s=0;if(a==o)return u=i[a],i.length-2<a?u.y:(_(n,u.x,(r=i[a+1]).x,u.y,r.y)+_(e,u.x,r.x,u.y,r.y))/2;{let t=i[a],r=i[a+1];var u={x:n,y:_(n,t.x,r.x,t.y,r.y)};s=m(u,r);for(let e=a+1;e<o;e++)t=r,r=i[e+1],s+=m(t,r);t=r,i.length-2<o?s+=t.y*(e-t.x):(r=i[o+1],u={x:e,y:_(e,t.x,r.x,t.y,r.y)},s+=m(t,u))}return s/t})(e.amplitudeCurve,r,.15),u=e.seed,l=322,r=.9/l,c=.5*r*t.viewportSize,f=_(s,0,1,.675,.9),d=Math.pow(s+3,2)*(45/1568);if(t.particleTextureSize!==l&&(t.particleTextureSize=l,a.bindTexture(a.TEXTURE_2D,t.particleTexture),a.texImage2D(a.TEXTURE_2D,0,a.RG32F,l,l,0,a.RG,a.FLOAT,null)),window.do_ncs_perf_test&&a.beginQuery(i.TIME_ELAPSED_EXT,n[0]),a.disable(a.BLEND),a.bindFramebuffer(a.FRAMEBUFFER,t.particleFramebuffer),a.viewport(0,0,l,l),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.useProgram(t.particleShader),a.uniform1f(t.uNoiseOffsetLoc,o),a.uniform1f(t.uAmplitudeLoc,s),a.uniform1i(t.uSeedLoc,u),a.uniform1f(t.uDotSpacingLoc,.9),a.uniform1f(t.uDotOffsetLoc,-.45),a.uniform1f(t.uSphereRadiusLoc,f),a.uniform1f(t.uFeatherLoc,d),a.uniform1f(t.uNoiseFrequencyLoc,4),a.uniform1f(t.uNoiseAmplitudeLoc,.32*.9),a.bindBuffer(a.ARRAY_BUFFER,t.quadBuffer),a.enableVertexAttribArray(t.inPositionLoc),a.vertexAttribPointer(t.inPositionLoc,2,a.FLOAT,!1,0,0),a.drawArrays(a.TRIANGLE_FAN,0,4),window.do_ncs_perf_test&&(a.endQuery(i.TIME_ELAPSED_EXT),a.beginQuery(i.TIME_ELAPSED_EXT,n[1])),a.enable(a.BLEND),a.bindFramebuffer(a.FRAMEBUFFER,t.dotFramebuffer),a.viewport(0,0,t.viewportSize,t.viewportSize),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.useProgram(t.dotShader),a.uniform1i(t.uDotCountLoc,l),a.uniform1f(t.uDotRadiusLoc,r),a.uniform1f(t.uDotRadiusPXLoc,c),a.uniform1i(t.uParticleTextureLoc,0),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,t.particleTexture),a.bindBuffer(a.ARRAY_BUFFER,t.quadBuffer),a.enableVertexAttribArray(t.inPositionLocDot),a.vertexAttribPointer(t.inPositionLocDot,2,a.FLOAT,!1,0,0),a.drawArraysInstanced(a.TRIANGLE_FAN,0,4,l*l),window.do_ncs_perf_test&&(a.endQuery(i.TIME_ELAPSED_EXT),a.beginQuery(i.TIME_ELAPSED_EXT,n[2])),a.bindFramebuffer(a.FRAMEBUFFER,t.blurXFramebuffer),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.useProgram(t.blurShader),a.uniform1f(t.uBlurRadiusLoc,.01*t.viewportSize),a.uniform2f(t.uBlurDirectionLoc,1/t.viewportSize,0),a.uniform1i(t.uBlurInputTextureLoc,0),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,t.dotTexture),a.bindBuffer(a.ARRAY_BUFFER,t.quadBuffer),a.enableVertexAttribArray(t.inPositionLocBlur),a.vertexAttribPointer(t.inPositionLocBlur,2,a.FLOAT,!1,0,0),a.drawArrays(a.TRIANGLE_FAN,0,4),a.bindFramebuffer(a.FRAMEBUFFER,t.blurYFramebuffer),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.uniform2f(t.uBlurDirectionLoc,0,1/t.viewportSize),a.bindTexture(a.TEXTURE_2D,t.blurXTexture),a.drawArrays(a.TRIANGLE_FAN,0,4),a.bindFramebuffer(a.FRAMEBUFFER,null),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),window.do_ncs_perf_test&&(a.endQuery(i.TIME_ELAPSED_EXT),a.beginQuery(i.TIME_ELAPSED_EXT,n[3])),a.useProgram(t.finalizeShader),a.uniform3f(t.uOutputColorLoc,e.themeColor.rgb.r/255,e.themeColor.rgb.g/255,e.themeColor.rgb.b/255),a.uniform1i(t.uBlurredTextureLoc,0),a.uniform1i(t.uOriginalTextureLoc,1),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,t.blurYTexture),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,t.dotTexture),a.bindBuffer(a.ARRAY_BUFFER,t.quadBuffer),a.enableVertexAttribArray(t.inPositionLocFinalize),a.vertexAttribPointer(t.inPositionLocFinalize,2,a.FLOAT,!1,0,0),a.drawArrays(a.TRIANGLE_FAN,0,4),window.do_ncs_perf_test){a.endQuery(i.TIME_ELAPSED_EXT),window.do_ncs_perf_test=!1;let r=()=>{var e,t;0!==n.length&&(t=a.getParameter(i.GPU_DISJOINT_EXT),e=n.map(e=>a.getQueryParameter(e,a.QUERY_RESULT_AVAILABLE)).reduce((e,t)=>e&&t,!0),t?(n.map(e=>a.deleteQuery(e)),console.log("NCS PERF RESULT: FAILED (disjoint)"),n.length=0):e?(t=n.map(e=>a.getQueryParameter(e,a.QUERY_RESULT)),console.log("NCS PERF RESULT: ",t),window.ncs_perf_test_out||(window.ncs_perf_test_out=[]),window.ncs_perf_test_out.push(t),n.length=0):window.requestAnimationFrame(r))};r()}}},[]);return o.default.createElement(s,{isEnabled:n.isEnabled,data:{themeColor:n.themeColor,seed:t,amplitudeCurve:e},contextType:"webgl2",onInit:r,onResize:i,onRender:a,style:{width:"100%",height:"100%",objectFit:"contain"},sizeConstraint:(e,t)=>{e=Math.min(e,t);return{width:e,height:e}}})}},{id:"spectrum",name:"Spectrum (very WIP)",renderer:function(e){let t=(0,C.useContext)(p);var r=(0,C.useMemo)(()=>{if(!e.audioAnalysis)return[];if(1!==e.audioAnalysis.track.rhythm_version)return t("Error: Unsupported rhythmstring version "+e.audioAnalysis.track.rhythm_version,1),[];var o=e.audioAnalysis.segments,s=ge(e.audioAnalysis.track.rhythmstring);if(0===o.length||0===s.length)return[];var u=.4/Math.sqrt(2)*8,l=12*s.length;let c=[];for(let e=0;e<o.length;e++){var f=o[e];let t=S(f.loudness_start),r=S(f.loudness_max),i=f.start+f.loudness_max_time;var d=f.pitches;let n=i-u,a=i+u;var m=s.map(e=>{var t=R(e,e=>e,n),r=R(e,e=>e,a);return e.slice(t,r).map(e=>Math.exp(-Math.pow((e-i)/.4,2))).reduce((e,t)=>e+t,0)+.2}),h=Math.max(...m);for(let e=0;e<m.length;e++)m[e]/=h;var g=Array(l);for(let t=0;t<m.length;t++){var y=_(t,0,m.length-1,.2,.6);for(let e=0;e<12;e++){var p=w([...m.entries()],e=>e[0],e=>e[1],z,t+e/12),v=d.reduce((e,t)=>e+t,0)/d.length,v=d[e]*y+v*(1-y);g[12*t+e]=p*v}}if(c.push([f.start,...g.map(e=>e*t)]),c.push([i,...g.map(e=>e*r)]),e==o.length-1){let t=S(f.loudness_end);c.push([f.start+f.duration,...g.map(e=>e*t)])}}var a=Array(l).fill(0).map(e=>Array(c.length));for(let n=0;n<l;n++){let t=0,r={x:0,y:0},i={x:0,y:0};for(let e=0;e<c.length;e++){var E,x,b,T={x:c[e][0],y:c[e][n+1]};i.x+i.y/.4<T.x+T.y/.4&&(i.x!==r.x&&(E=(T.y-r.y)/(T.x-r.x),x=r.y-E*r.x,b=(i.y- -.4*i.x-x)/(E+.4),a[n][t]={x:b,y:E*b+x},t++),i=T,a[n][t]=T,t++),r=T}a[n].length=t}return a},[e.audioAnalysis]),i=(0,C.useCallback)(e=>e?{isError:!1}:(t("Error: 2D rendering is not supported",2),{isError:!0}),[]),n=(0,C.useCallback)((e,t)=>{t.isError},[]),a=(0,C.useCallback)((t,r,e)=>{if(!e.isError&&t){var i=Spicetify.Player.getProgress()/1e3,n=(t.clearRect(0,0,t.canvas.width,t.canvas.height),t.fillStyle=r.themeColor.toCSS(Spicetify.Color.CSSFormat.HEX),r.spectrumData.length),a=t.canvas.width/n*.7,o=(t.canvas.width-a*n)/(n+1);for(let e=0;e<n;e++){var s=w(r.spectrumData[e],e=>e.x,e=>e.y,e=>e,i);t.fillRect(o*(e+1)+a*e,t.canvas.height-s*t.canvas.height,a,s*t.canvas.height)}}},[]);return C.default.createElement(s,{isEnabled:e.isEnabled,data:{themeColor:e.themeColor,spectrumData:r},contextType:"2d",onInit:i,onResize:n,onRender:a,style:{width:"100%",height:"100%"}})}},{id:"debug",name:"DEBUG",renderer:function(e){let t=(0,x.useContext)(p);var r=(0,x.useMemo)(()=>e.audioAnalysis?e.audioAnalysis.bars.reduce((e,t)=>e+t.duration,0)/e.audioAnalysis.bars.length:1,[e.audioAnalysis]),i=(0,x.useMemo)(()=>e.audioAnalysis?ge(e.audioAnalysis.track.rhythmstring):null,[e.audioAnalysis]),n=(0,x.useCallback)(e=>e?{isError:!1}:(t("Error: 2D rendering is not supported",2),{isError:!0}),[]),a=(0,x.useCallback)((e,t)=>{t.isError},[]),o=(0,x.useCallback)((i,n,a)=>{if(!a.isError&&i&&n.audioAnalysis&&n.rhythmString){i.clearRect(0,0,i.canvas.width,i.canvas.height);a=Spicetify.Player.getProgress()/1e3;let r={start:a-ye[0]*n.barDuration,end:a+ye[1]*n.barDuration,current:a};var o,s=(e,t)=>{i.save(),i.beginPath(),i.rect(t.x,t.y,t.width,t.height),i.clip(),e.render(i,{analysis:n.audioAnalysis,rhythm:n.rhythmString},r,t),i.restore()};for(o of pe)"background"===o.layer&&s(o,{x:30,y:0,width:i.canvas.width-20-10,height:i.canvas.height});var u,l,c,f,d=pe.filter(e=>"content"===e.layer),m=i.canvas.height-20*(d.length-1),h=d.reduce((e,t)=>e+t.height,0);let e=0,t=0;for(u of d){var g=_(e,0,h,0,m)+20*t,y=_(e+u.height,0,h,0,m)+20*t;e+=u.height,t++,s(u,{x:30,y:g,width:i.canvas.width-20-10,height:y-g}),l=u.name,c=y-(g=g),i.save(),i.font="20px sans-serif",i.textAlign="center",i.fillStyle="white",i.rotate(3*Math.PI/2),i.fillText(l,-(g+c/2),20,c),i.restore(),t<d.length&&(i.lineWidth=1,i.strokeStyle="#AAAAAA",i.beginPath(),i.moveTo(10,y+10),i.lineTo(i.canvas.width-10,y+10),i.stroke())}for(f of pe)"overlay"===f.layer&&s(f,{x:30,y:0,width:i.canvas.width-20-10,height:i.canvas.height})}},[]);return x.default.createElement(s,{isEnabled:e.isEnabled,data:{audioAnalysis:e.audioAnalysis,rhythmString:i,barDuration:r},contextType:"2d",onInit:n,onResize:a,onRender:o,style:{width:"100%",height:"100%"}})}}];function Te(e){let[t,r]=(0,g.useState)(e.initialRenderer||"ncs");var i=be.find(e=>e.id===t)?.renderer;let n=(0,g.useRef)(null);n.current&&!n.current.ownerDocument.defaultView&&e.onWindowDestroyed?.();var a=!!(t=>{let[e,r]=(0,xe.useState)(t?.fullscreenElement??null);return(0,xe.useEffect)(()=>{if(t){let e=()=>r(t.fullscreenElement);return t.addEventListener("fullscreenchange",e),()=>t.removeEventListener("fullscreenchange",e)}},[t]),e})(n.current?.ownerDocument);let[o,s]=(0,g.useState)({state:"loading"}),[u,l]=(0,g.useState)({themeColor:Spicetify.Color.fromHex("#535353")}),c=(0,g.useCallback)(t=>s(e=>"error"===e.state&&2===e.errorData.recovery?e:t),[]),f=(0,g.useCallback)((e,t)=>{c({state:"error",errorData:{message:e,recovery:t}})},[]),d="error"===o.state&&2===o.errorData.recovery,m=(0,g.useMemo)(()=>new X,[]),h=(0,g.useCallback)(async e=>{e=e?.item;if(e){var t=Spicetify.URI.fromString(e.uri);if(t.type!==Spicetify.URI.Type.TRACK)f("Error: The type of track you're listening to is currently not supported",1);else{c({state:"loading"});var r,i,t=`https://spclient.wg.spotify.com/audio-attributes/v1/audio-analysis/${t.id}?format=json`,[t,e]=await Promise.all([Spicetify.CosmosAsync.get(t).catch(e=>console.error("[Visualizer]",e)),m.fetch(23,e.metadata.image_url).catch(e=>console.error("[Visualizer] Could not load extracted color metadata. Status: "+V[e])).then(e=>{var t;return e&&0!==e.value.length&&"type.googleapis.com/spotify.context_track_color.ColorResult"===e.typeUrl?(e=e.value,t=K,e=new DataView(e.buffer,e.byteOffset,e.byteLength),t=t[1](e).colorLight?.rgb?.toString(16).padStart(6,"0")??"535353",Spicetify.Color.fromHex("#"+t)):Spicetify.Color.fromHex("#535353")})]);if(t)if("object"!=typeof t)f(`Invalid audio analysis data (${t})`,0);else{if(!("track"in t&&"segments"in t))return r="error"in t&&t.error?t.error:"message"in t&&t.message?t.message:"Unknown error",null!==(i="code"in t?t.code:null)?void f(`Error ${i}: `+r,0):void f(r,0);l({audioAnalysis:t,themeColor:e}),c({state:"running"})}else f("Error: The audio analysis could not be loaded, please check your internet connection",0)}}else f("Start playing a song to see the visualization!",1)},[m]);return(0,g.useEffect)(()=>{if(!d){let e=e=>{e?.data&&h(e.data)};return Spicetify.Player.addEventListener("songchange",e),h(Spicetify.Player.data),()=>Spicetify.Player.removeEventListener("songchange",e)}},[d,h]),g.default.createElement("div",{className:"visualizer-container",ref:n},!d&&g.default.createElement(g.default.Fragment,null,g.default.createElement(p.Provider,{value:f},i&&g.default.createElement(i,{isEnabled:"running"===o.state,audioAnalysis:u.audioAnalysis,themeColor:u.themeColor})),g.default.createElement(Ee,{className:y.main_menu_button,renderInline:e.isSecondaryWindow||a,renderers:be,currentRendererId:t,isFullscreen:a,onEnterFullscreen:()=>{n.current?.requestFullscreen()},onExitFullscreen:()=>{n.current?.ownerDocument.exitFullscreen()},onOpenWindow:()=>(async r=>{try{let e=window.open();if(!e){let t="fallback PiP API is not available";if(window.documentPictureInPicture&&(window.documentPictureInPicture.window?t="cannot open another PiP window":e=await window.documentPictureInPicture.requestWindow().catch(e=>(t=e?""+e:"unknown error",null))),!e)return void Spicetify.showNotification(F.default.createElement("span",null,"Failed to open window: ",t,". Try with devtools using"," ",F.default.createElement("code",{style:{fontSize:"12px",background:"rgba(0 0 0 / 0.2)",borderRadius:"4px",padding:"2px"}},"spicetify enable-devtools"),"."),!0)}let t=e.document;Array.from(document.styleSheets).forEach(e=>{e.ownerNode&&"tagName"in e.ownerNode&&(e=e.ownerNode,e=t.importNode(e,!0),t.head.appendChild(e))}),t.documentElement.className=document.documentElement.className,t.body.className=document.body.className;var i=v.getStyleSheetManager(),n=Spicetify.ReactDOM.unmountComponentAtNode(t.body),a=F.default.createElement(Te,{isSecondaryWindow:!0,onWindowDestroyed:n,initialRenderer:r});i?Spicetify.ReactDOM.render(F.default.createElement(i,{target:t.head},a),t.body):(Spicetify.showNotification("[Visualizer] Could not find StyleSheetManager. Styles in popup window propably won't work.",!0),Spicetify.ReactDOM.render(a,t.body))}catch(e){console.error("[Visualizer]","error opening popup window",e);let t=e?""+e:"unknown error";Spicetify.showNotification("Failed to open window: "+t,!0)}})(t),onSelectRenderer:e=>r(e)})),"loading"===o.state?g.default.createElement(k,null):"error"===o.state?g.default.createElement("div",{className:y.error_container},g.default.createElement("div",{className:y.error_message},o.errorData.message),0===o.errorData.recovery&&g.default.createElement(Spicetify.ReactComponent.ButtonPrimary,{onClick:()=>h(Spicetify.Player.data)},"Try again")):null)}var Re=r(i());return c=B,M(a({},"__esModule",{value:!0}),c)})();let render=()=>visualizer.default();