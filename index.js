var visualizer=(()=>{var e,t,P=Object.create,n=Object.defineProperty,I=Object.getOwnPropertyDescriptor,U=Object.getOwnPropertyNames,N=Object.getPrototypeOf,O=Object.prototype.hasOwnProperty,M=(t,r,i,a)=>{if(r&&"object"==typeof r||"function"==typeof r)for(let e of U(r))O.call(t,e)||e===i||n(t,e,{get:()=>r[e],enumerable:!(a=I(r,e))||a.enumerable});return t},r=(e,t,r)=>(r=null!=e?P(N(e)):{},M(!t&&e&&e.__esModule?r:n(r,"default",{value:e,enumerable:!0}),e)),i=(e={"external-global-plugin:react"(e,t){t.exports=Spicetify.React}},function(){return t||(0,e[U(e)[0]])((t={exports:{}}).exports,t),t.exports}),k={},g=(((e,t)=>{for(var r in t)n(e,r,{get:t[r],enumerable:!0})})(k,{default:()=>function(){return Se.default.createElement(Re,null)}}),r(i())),y={main_menu_button:"app-module__main_menu_button___wQmMP_visualizer",error_container:"app-module__error_container___8JcIQ_visualizer",error_message:"app-module__error_message___soZdL_visualizer"},a=r(i());function B(){return a.default.createElement("svg",{width:"100px",height:"100px",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid"},a.default.createElement("circle",{cx:"50",cy:"50",r:"0",fill:"none",stroke:"currentColor","stroke-width":"2"},a.default.createElement("animate",{attributeName:"r",repeatCount:"indefinite",dur:"1s",values:"0;40",keyTimes:"0;1",keySplines:"0 0.2 0.8 1",calcMode:"spline",begin:"0s"}),a.default.createElement("animate",{attributeName:"opacity",repeatCount:"indefinite",dur:"1s",values:"1;0",keyTimes:"0;1",keySplines:"0.2 0 0.8 1",calcMode:"spline",begin:"0s"})),a.default.createElement("circle",{cx:"50",cy:"50",r:"0",fill:"none",stroke:"currentColor","stroke-width":"2"},a.default.createElement("animate",{attributeName:"r",repeatCount:"indefinite",dur:"1s",values:"0;40",keyTimes:"0;1",keySplines:"0 0.2 0.8 1",calcMode:"spline",begin:"-0.5s"}),a.default.createElement("animate",{attributeName:"opacity",repeatCount:"indefinite",dur:"1s",values:"1;0",keyTimes:"0;1",keySplines:"0.2 0 0.8 1",calcMode:"spline",begin:"-0.5s"})))}var o=r(i()),m=r(i());function s(a){let{contextType:n,onInit:o,onResize:s,onRender:u,style:e,data:l,isEnabled:t}=a,c=(0,m.useRef)(null),[f,d]=(0,m.useState)(null),h=(0,m.useCallback)((e,t)=>{var r=Math.round(e.clientWidth*window.devicePixelRatio),i=Math.round(e.clientHeight*window.devicePixelRatio),{width:r,height:i}=a.sizeConstraint?.(r,i)??{width:r,height:i};e.width===r&&e.height===i||(e.width=r,e.height=i)},[]);return(0,m.useEffect)(()=>{if(o){var e=c.current;if(e){var t,r,i=e.ownerDocument.defaultView;if(i)return t=e.getContext(n),r=o(t),h(e,i),s(t,r),d(r),()=>d(null)}}},[n,o]),(0,m.useEffect)(()=>{if(t&&f&&u){var e=c.current;if(e){let a=e.ownerDocument.defaultView;if(a){let t=e.getContext(n),r=0,i=e=>{f&&(u(t,l,f,e),r=a.requestAnimationFrame(i))};return r=a.requestAnimationFrame(i),()=>{r&&a.cancelAnimationFrame(r)}}}}},[n,u,l,f,t]),(0,m.useEffect)(()=>{if(c.current){var t=c.current.ownerDocument.defaultView;if(t){let e=new t.ResizeObserver(()=>{var e,t=c.current;t&&(e=t.ownerDocument.defaultView)&&(h(t,e),e=t.getContext(n))&&f&&s(e,f)});return e.observe(c.current),()=>e.disconnect()}}},[n,s,f]),m.default.createElement("canvas",{ref:c,style:{...e||{},...t?{}:{visibility:"hidden"}}})}function R(e,t,r){let i=0,a=e.length;for(;1<a-i;){var n=Math.floor((a+i)/2);t(e[n],n)<=r?i=n:a=n}return i}function S(e){return Math.min(Math.max(Math.pow(10,e/20),0),1)}function V(e){return e*e*(3-2*e)}function w(e,t,r,i,a){return e=(e=(e-t)/(r-t))*(a-i)+i}function h(e,t){return-.5*(e.x-t.x)*(e.y+t.y)}function _(e,t,r,i,a){var n,o=R(e,t,a),s=e[o];return e.length-2<o?r(s,o):(e=e[o+1],a=a,n=t(s,o),t=t(e,o+1),i=i,s=r(s,o),r=r(e,o+1),a=(a=i(a=(a-n)/(t-n)))*(r-s)+s)}var p=(0,r(i()).createContext)(()=>{});function z(e,t){for(var r=new v(31),i=0;i<31;++i)r[i]=t+=1<<e[i-1];for(var a=new X(r[30]),i=1;i<30;++i)for(var n=r[i];n<r[i+1];++n)a[n]=n-r[i]<<5|i;return{b:r,r:a}}var u,l=r(i()),q=Uint8Array,v=Uint16Array,X=Int32Array,Q=new q([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),H=new q([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),$=new q([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),c=z(Q,2),K=c.b,c=(c.r[K[28]=258]=28,z(H,0)),J=c.b,G=new v(32768);for(d=0;d<32768;++d)G[d]=((65280&(u=(61680&(u=(52428&(u=(43690&d)>>1|(21845&d)<<1))>>2|(13107&u)<<2))>>4|(3855&u)<<4))>>8|(255&u)<<8)>>1;var W=function(e,t,r){for(var i=e.length,a=0,n=new v(t);a<i;++a)e[a]&&++n[e[a]-1];var o=new v(t);for(a=1;a<t;++a)o[a]=o[a-1]+n[a-1]<<1;if(r){for(var s=new v(1<<t),u=15-t,a=0;a<i;++a)if(e[a])for(var l=a<<4|e[a],c=t-e[a],f=o[e[a]-1]++<<c,d=f|(1<<c)-1;f<=d;++f)s[G[f]>>u]=l}else for(s=new v(i),a=0;a<i;++a)e[a]&&(s[a]=G[o[e[a]-1]++]>>15-e[a]);return s},f=new q(288);for(d=0;d<144;++d)f[d]=8;for(d=144;d<256;++d)f[d]=9;for(d=256;d<280;++d)f[d]=7;for(d=280;d<288;++d)f[d]=8;var d,Z=new q(32);for(d=0;d<32;++d)Z[d]=5;var ee=W(f,9,1),te=W(Z,5,1),re=function(e){for(var t=e[0],r=1;r<e.length;++r)t<e[r]&&(t=e[r]);return t},Y=function(e,t,r){var i=t/8|0;return(e[i]|e[1+i]<<8)>>(7&t)&r},ie=function(e,t){var r=t/8|0;return(e[r]|e[1+r]<<8|e[2+r]<<16)>>(7&t)},ae=function(e){return(e+7)/8|0},ne=function(e,t,r){return(null==r||r>e.length)&&(r=e.length),new q(e.subarray(t=null==t||t<0?0:t,r))},oe=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],j=function(e,t,r){t=new Error(t||oe[e]);if(t.code=e,Error.captureStackTrace&&Error.captureStackTrace(t,j),r)return t;throw t},se=function(e,t,r,i){var a=e.length,O=i?i.length:0;if(!a||t.f&&!t.l)return r||new q(0);function n(e){var t=r.length;t<e&&((t=new q(Math.max(2*t,e))).set(r),r=t)}var o=!r,s=o||2!=t.i,u=t.i,l=(o&&(r=new q(3*a)),t.f||0),c=t.p||0,f=t.b||0,d=t.l,h=t.d,m=t.m,g=t.n,y=8*a;do{if(!d){var l=Y(e,c,1),p=Y(e,c+1,3);if(c+=3,!p){var v=e[(w=ae(c)+4)-4]|e[w-3]<<8,E=w+v;if(a<E){u&&j(0);break}s&&n(f+v),r.set(e.subarray(w,E),f),t.b=f+=v,t.p=c=8*E,t.f=l;continue}if(1==p)d=ee,h=te,m=9,g=5;else if(2==p){for(var v=Y(e,c,31)+257,x=Y(e,c+10,15)+4,b=v+Y(e,c+5,31)+1,T=(c+=14,new q(b)),R=new q(19),S=0;S<x;++S)R[$[S]]=Y(e,c+3*S,7);c+=3*x;for(var E=re(R),M=(1<<E)-1,k=W(R,E,1),S=0;S<b;){var w,_=k[Y(e,c,M)];if(c+=15&_,(w=_>>4)<16)T[S++]=w;else{var A=0,C=0;for(16==w?(C=3+Y(e,c,3),c+=2,A=T[S-1]):17==w?(C=3+Y(e,c,7),c+=3):18==w&&(C=11+Y(e,c,127),c+=7);C--;)T[S++]=A}}var D=T.subarray(0,v),F=T.subarray(v),m=re(D),g=re(F),d=W(D,m,1),h=W(F,g,1)}else j(1);if(y<c){u&&j(0);break}}s&&n(f+131072);for(var B=(1<<m)-1,V=(1<<g)-1,L=c;;L=c){var P=(A=d[ie(e,c)&B])>>4;if(y<(c+=15&A)){u&&j(0);break}if(A||j(2),P<256)r[f++]=P;else{if(256==P){L=c,d=null;break}var I,U=P-254,P=(264<P&&(I=Q[S=P-257],U=Y(e,c,(1<<I)-1)+K[S],c+=I),h[ie(e,c)&V]),N=P>>4,F=(P||j(3),c+=15&P,J[N]);if(3<N&&(I=H[N],F+=ie(e,c)&(1<<I)-1,c+=I),y<c){u&&j(0);break}s&&n(f+131072);var z=f+U;if(f<F){var X=O-F,G=Math.min(F,z);for(X+f<0&&j(3);f<G;++f)r[f]=i[X+f]}for(;f<z;++f)r[f]=r[f-F]}}t.l=d,t.p=L,t.b=f,t.f=l,d&&(l=1,t.m=m,t.d=h,t.n=g)}while(!l);return f!=r.length&&o?ne(r,0,f):r.subarray(0,f)},c=new q(0),ue=function(e,t){return(8!=(15&e[0])||7<e[0]>>4||(e[0]<<8|e[1])%31)&&j(6,"invalid zlib data"),(e[1]>>5&1)==+!t&&j(6,"invalid zlib data: "+(32&e[1]?"need":"unexpected")+" dictionary"),2+(e[1]>>3&4)};var E="undefined"!=typeof TextDecoder&&new TextDecoder;try{E.decode(c,{stream:!0})}catch(e){}function le(e){e=e.replace(/-/g,"+").replace(/_/g,"/");var e=new Uint8Array(atob(e).split("").map(e=>e.charCodeAt(0))),e=se(e.subarray(ue(e,i&&i.dictionary),-4),{i:2},i&&i.out,i&&i.dictionary),t=(new TextDecoder).decode(e).split(" ").map(e=>parseInt(e)),r=[];if(!(t.length<3)){var i=t.shift(),a=t.shift()/i,n=t.shift();if(!(t.length<n))for(let e=0;e<n;e++){var o=[],s=t.shift();if(t.length<s+(n-e-1))return r;for(let e=0;e<s;e++){var u=t.shift()*a;o.push(0==e?u:o[e-1]+u)}r.push(o)}}return r}var ce=[1,2],fe=[{name:"Beats",layer:"background",render:(t,r,i,a)=>{var n=R(r.analysis.beats,e=>e.start,i.start),o=R(r.analysis.beats,e=>e.start,i.end);t.lineWidth=1,t.strokeStyle="#FFFFFF33",t.beginPath();for(let e=n;e<=o;e++){var s=w(r.analysis.beats[e].start,i.start,i.end,a.x,a.x+a.width);t.moveTo(s,a.y),t.lineTo(s,a.y+a.height)}t.stroke()}},{name:"Bars",layer:"background",render:(t,r,i,a)=>{var n=R(r.analysis.bars,e=>e.start,i.start),o=R(r.analysis.bars,e=>e.start,i.end);t.lineWidth=3,t.strokeStyle="#FFFFFF66",t.beginPath();for(let e=n;e<=o;e++){var s=w(r.analysis.bars[e].start,i.start,i.end,a.x,a.x+a.width);t.moveTo(s,a.y),t.lineTo(s,a.y+a.height)}t.stroke()}},{name:"Position",layer:"overlay",render:(e,t,r,i)=>{e.lineWidth=5,e.strokeStyle=e.fillStyle="white",e.beginPath();r=w(r.current,r.start,r.end,i.x,i.x+i.width);e.moveTo(r,i.y),e.lineTo(r,i.y+i.height),e.stroke();e.beginPath(),e.moveTo(r-10,i.y),e.lineTo(r+10,i.y),e.lineTo(r,i.y+10),e.lineTo(r-10,i.y),e.moveTo(r-10,i.y+i.height),e.lineTo(r+10,i.y+i.height),e.lineTo(r,i.y+i.height-10),e.lineTo(r-10,i.y+i.height),e.fill()}},{name:"Loudness",layer:"content",height:1,render:(t,r,i,a)=>{var n=R(r.analysis.segments,e=>e.start,i.start),o=R(r.analysis.segments,e=>e.start,i.end),s=e=>S(e);t.lineWidth=2,t.strokeStyle="white",t.beginPath();for(let e=n;e<=o+1&&e<r.analysis.segments.length;e++){var u=r.analysis.segments[e],l=w(u.start,i.start,i.end,a.x,a.x+a.width),c=w(s(u.loudness_start),0,1,a.y+a.height,a.y),f=w(u.start+u.loudness_max_time,i.start,i.end,a.x,a.x+a.width),d=w(s(u.loudness_max),0,1,a.y+a.height,a.y);e===n?t.moveTo(l,c):t.lineTo(l,c),t.lineTo(f,d),e===r.analysis.segments.length-1&&(l=w(u.start+u.duration,i.start,i.end,a.x,a.x+a.width),c=w(s(u.loudness_end),0,1,a.y+a.height,a.y),t.lineTo(l,c))}t.stroke()}},{name:"Confidence",layer:"content",height:.25,render:(t,r,i,a)=>{var n=R(r.analysis.segments,e=>e.start,i.start),o=R(r.analysis.segments,e=>e.start,i.end);t.beginPath();for(let e=n;e<=o;e++){var s=r.analysis.segments[e],u=w(s.start,i.start,i.end,a.x,a.x+a.width),l=w(s.start+s.duration,i.start,i.end,a.x,a.x+a.width);t.fillStyle=`rgba(255, 255, 255, ${s.confidence})`,t.fillRect(u,a.y,l-u,a.height)}t.fill()}},{name:"Timbre",layer:"content",height:1.5,render:(r,i,a,n)=>{var o=n.height/12,s=R(i.analysis.segments,e=>e.start,a.start),u=R(i.analysis.segments,e=>e.start,a.end);for(let t=0;t<12;t++){var e=(Math.sqrt(5)-1)/2,l=t*e;r.beginPath();for(let e=s;e<=u;e++){var c=i.analysis.segments[e],f=w(Math.tanh(.02*c.timbre[t]),-1,1,0,1),d=w(c.start,a.start,a.end,n.x,n.x+n.width),c=w(c.start+c.duration,a.start,a.end,n.x,n.x+n.width),h=n.y+t/12*n.height;r.fillStyle=`hsla(${360*l}, 100%, 70%, ${f})`,r.fillRect(d,h,c-d,o)}r.fill()}}},{name:"Pitches",layer:"content",height:1.5,render:(r,i,a,n)=>{var o=n.height/12,s=R(i.analysis.segments,e=>e.start,a.start),u=R(i.analysis.segments,e=>e.start,a.end);for(let t=0;t<12;t++){var l=t/12;r.beginPath();for(let e=s;e<=u;e++){var c=i.analysis.segments[e],f=w(c.start,a.start,a.end,n.x,n.x+n.width),d=w(c.start+c.duration,a.start,a.end,n.x,n.x+n.width),h=n.y+t/12*n.height;r.fillStyle=`hsla(${360*l}, 100%, 70%, ${c.pitches[t]})`,r.fillRect(f,h,d-f,o)}r.fill()}}},{name:"Rhythm",layer:"content",height:.5,render:(r,i,a,n)=>{var o=n.height/i.rhythm.length,s=Math.min(o,20),e=s/2/n.width*(a.end-a.start);r.fillStyle="white",r.beginPath();for(let t=i.rhythm.length-1;0<=t;t--){var u=R(i.rhythm[t],e=>e,a.start-e),l=R(i.rhythm[t],e=>e,a.end+e);for(let e=u;e<=l;e++){var c=w(i.rhythm[t][e],a.start,a.end,n.x,n.x+n.width),f=n.y+t*o;r.rect(c-s/2,f,s,o)}}r.fill()}}];var x=r(i());var b=r(i()),T=b.default.memo(e=>b.default.createElement(Spicetify.ReactComponent.IconComponent,{semanticColor:"textBase",dangerouslySetInnerHTML:{__html:"empty"!==e.name?Spicetify.SVGIcons[e.name]:void 0},iconSize:e.size})),de=b.default.memo(t=>b.default.createElement(Spicetify.ReactComponent.Menu,null,b.default.createElement(Spicetify.ReactComponent.MenuSubMenuItem,{displayText:"Renderer"},t.renderers.map(e=>b.default.createElement(Spicetify.ReactComponent.MenuItem,{onClick:()=>t.onSelectRenderer(e.id),leadingIcon:b.default.createElement(T,{name:e.id===t.currentRendererId?"check":"empty",size:16})},e.name))),b.default.createElement(Spicetify.ReactComponent.MenuItem,{onClick:()=>t.isFullscreen?t.onExitFullscreen():t.onEnterFullscreen(),trailingIcon:b.default.createElement(T,{name:t.isFullscreen?"minimize":"fullscreen",size:16})},t.isFullscreen?"Exit Fullscreen":"Enter Fullscreen"),b.default.createElement(Spicetify.ReactComponent.MenuItem,{onClick:()=>t.onOpenWindow(),trailingIcon:b.default.createElement(T,{name:"external-link",size:16})},"Open Window"))),he=b.default.memo(e=>b.default.createElement(Spicetify.ReactComponent.ContextMenu,{trigger:"click",renderInline:e.renderInline,menu:b.default.createElement(de,{...e})},b.default.createElement(Spicetify.ReactComponent.ButtonSecondary,{"aria-label":"menu",className:e.className,iconOnly:()=>b.default.createElement(T,{name:"menu",size:16})}))),A=r(i());function C(e,t){if("function"!=typeof e)return!1;let r=(e=>{try{return"function"==typeof e?Function.prototype.toString.call(e):String(e)}catch{return""}})(e);return t.every(e=>r.includes(e))}var D=class{static init(){this.webpack=window.webpackChunkclient_web??window.webpackChunkopen,this.require=this.webpack.push([[Symbol()],{},e=>e]),this.refreshModules()}static async loadFiles(e){this.require||this.init(),await Promise.allSettled(e.map(e=>this.require.e(e))),this.refreshModules()}static refreshModules(){this.require||this.init(),this.loadedModules={};var e=Object.keys(this.require.m).map(e=>{try{return this.require(e)}catch{}});this.modules=e.filter(e=>"object"==typeof e).map(e=>{try{return Object.values(e)}catch{}}).flat()}static getValue(e,t){this.require||this.init(),e in this.loadedModules||(this.loadedModules[e]=t());t=this.loadedModules[e];return"failed"===t.state?null:"succeeded"===t.state?t.value:void 0}static getValueFiltered(e,t){return this.getValue(e,()=>{var e=this.modules.filter(t);return 1===e.length?{state:"succeeded",value:e[0]}:{state:"failed"}})}static getMetadataService(){return this.getValueFiltered("metadataService",e=>e&&"function"==typeof e&&"SERVICE_ID"in e&&"spotify.mdata_esperanto.proto.MetadataService"===e.SERVICE_ID)}static getOfflinePlayableCache(){return this.getValueFiltered("offlinePlayableCache",e=>e&&"function"==typeof e&&"SERVICE_ID"in e&&"spotify.offline_playable_cache_esperanto.proto.OfflinePlayableCache"===e.SERVICE_ID)}static getCreateTransport(){return this.getValueFiltered("createTransport",e=>e&&C(e,["executeEsperantoCall","cancelEsperantoCall"]))}static getTrackList(){return this.getValueFiltered("trackList",e=>e&&"object"==typeof e&&e.$$typeof===Symbol.for("react.memo")&&C(e.type,["tracks","nrTracks","fetchTracks","itemsCache","initialItems"]))}static getTrackListItem(){return this.getValueFiltered("trackListItem",e=>e&&"object"==typeof e&&e.$$typeof===Symbol.for("react.memo")&&C(e.type,["displayedColumns","albumOrShow","associatedAudioUri"]))}static getCardRenderer(){return this.getValueFiltered("cardRenderer",e=>e&&"object"==typeof e&&"render"in e&&C(e.render,["card-title-","card-subtitle-"]))}static getStyleSheetManager(){return this.getValueFiltered("styleSheetManager",e=>e&&C(e,["stylisPlugins","reconstructWithOptions","disableCSSOMInjection","disableVendorPrefixes"]))}},me=(D.webpack=null,D.require=null,D.modules=null,D.loadedModules={},(e=>(e[e.UNKNOWN=0]="UNKNOWN",e[e.OK=1]="OK",e[e.NOT_RESOLVED=2]="NOT_RESOLVED",e[e.NOT_FOUND=3]="NOT_FOUND",e[e.UNAVAILABLE_FOR_LEGAL_REASONS=4]="UNAVAILABLE_FOR_LEGAL_REASONS",e))(me||{})),ge=class{constructor(){var e=D.getMetadataService(),t=D.getCreateTransport();e&&t&&(this.serviceDescriptor=e,this.service=new this.serviceDescriptor(t()))}fetch(e,t){return new Promise((i,a)=>{if(this.service&&this.serviceDescriptor){let r=this.service.observe(this.serviceDescriptor.METHODS.observe.requestType.fromPartial({extensionQuery:[{entityUri:t,extensionKind:e}]}),e=>{var t;e.pendingResponse||(r.cancel(),1===e.extensionResult[0].status?(t=e.extensionResult[0].extensionData,i(t)):(t=e.extensionResult[0].details.cacheStatus,a(t)))})}else a(0)})}fetchAll(i){return new Promise((r,e)=>{if(this.service&&this.serviceDescriptor){let t=this.service.observe(this.serviceDescriptor.METHODS.observe.requestType.fromPartial({extensionQuery:i.map(e=>({entityUri:e.uri,extensionKind:e.kind}))}),e=>{e.pendingResponse||(t.cancel(),r(e.extensionResult.map(e=>{var t=1===e.status,r={uri:e.entityUri,kind:e.extensionKind,success:t};return t?{...r,typeUrl:e.extensionData.typeUrl,value:e.extensionData.value}:{...r,status:e.details.cacheStatus}})))})}else e()})}},ye=class{constructor(e){e instanceof DataView&&(e=new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),this.buffer=e,this.offset=0}getVarIntView(){let e=this.offset;for(;e<this.buffer.length-1&&128&this.buffer[e];)e++;return e++,this.getView(e-this.offset)}getVarInt(){if(this.isExhausted())return 0n;let e=0n,t=0n;for(var r;r=BigInt(this.buffer[this.offset++]),e|=(0x7fn&r)<<t,t+=7n,0x80n&r&&!this.isExhausted(););return e}getArray(e){var e=Math.min(e,this.buffer.length-this.offset),t=this.buffer.slice(this.offset,this.offset+e);return this.offset+=e,t}getView(e){var e=Math.min(e,this.buffer.length-this.offset),t=new DataView(this.buffer.buffer,this.buffer.byteOffset+this.offset,e);return this.offset+=e,t}has(e){return this.buffer.length-this.offset>=e}isExhausted(){return!this.has(1)}};function pe(e,t){return e&1n<<BigInt(8*t-1)?e-(1n<<BigInt(8*t)):e}function F(t,r){return[t[0],e=>r(t[1](e))]}var E=[0,e=>new ye(e).getVarInt()],c=F(E,e=>!!e),ve=F(E,Number);F(E,e=>Number(pe(e,4))),F(E,e=>pe(e,8));function L(e,t){return{id:e,value:t}}function Ee(t){return[3,e=>{for(var r=new ye(e),i={},a=Object.entries(t).map(([e,t])=>({name:e,...t}));!r.isExhausted();){let t=Number(r.getVarInt());var n=a.find(e=>e.id==t>>3);if(n&&((e,t)=>{switch(t){case 0:return 0==(7&e);case 1:return 5==(7&e);case 2:return 1==(7&e);case 3:return 2==(7&e)}})(t,n.value[0])){var o=n.value,[s,u]=((e,t)=>{switch(t[0]){case 1:return e.has(4)?[!0,t[1](e.getView(4))]:[!1,void 0];case 2:return e.has(8)?[!0,t[1](e.getView(8))]:[!1,void 0];case 0:return[!0,t[1](e.getVarIntView())];case 3:var r=Number(e.getVarInt());return[!0,t[1](e.getView(r))]}})(r,o);if(!s)break;o[2]?(s=i[n.name]??[],i[n.name]=s.concat(u)):i[n.name]=u}else{c=o=l=void 0;var l=r,o=t;switch(7&o){case 5:l.getView(4);break;case 1:l.getView(8);break;case 0:l.getVarIntView();break;case 2:var c=Number(l.getVarInt());l.getView(c)}}}return i}]}var E=Ee({rgb:L(1,ve),isFallback:L(2,c)}),xe=Ee({colorRaw:L(1,E),colorLight:L(2,E),colorDark:L(3,E)});var be=r(i());var Te=[{id:"ncs",name:"NCS",renderer:function(a){let M=(0,o.useContext)(p);var e=(0,o.useMemo)(()=>{if(!a.audioAnalysis)return[{x:0,y:0}];var e=a.audioAnalysis.segments,t=e.flatMap(e=>e.loudness_max_time?[{x:e.start,y:S(e.loudness_start)},{x:e.start+e.loudness_max_time,y:S(e.loudness_max)}]:[{x:e.start,y:S(e.loudness_start)}]);if(e.length){t[0].accumulatedIntegral=0;for(let e=1;e<t.length;e++){var r=t[e-1],i=t[e];i.accumulatedIntegral=(r.accumulatedIntegral??0)+h(r,i)}e=e[e.length-1];t.push({x:e.start+e.duration,y:S(e.loudness_end)})}return t},[a.audioAnalysis]),t=a.audioAnalysis?.meta.timestamp??0,r=(0,o.useCallback)(a=>{if(!a)return M("Error: WebGL2 is not supported",2),{isError:!0};if(!a.getExtension("EXT_color_buffer_float"))return M("Error: Rendering to floating-point textures is not supported",2),{isError:!0};var e=(e,t,r)=>{e=a.createShader(e);return a.shaderSource(e,t),a.compileShader(e),a.getShaderParameter(e,a.COMPILE_STATUS)||a.isContextLost()?e:(t=`Error: Failed to compile '${r}' shader`,r=a.getShaderInfoLog(e),console.error("[Visualizer] "+t,r),M(t,2),null)},t=(e,t,r)=>{var i=a.createProgram();return a.attachShader(i,e),a.attachShader(i,t),a.linkProgram(i),a.getProgramParameter(i,a.LINK_STATUS)||a.isContextLost()?i:(e=`Error: Failed to link '${r}' shader`,t=a.getProgramInfoLog(i),console.error("[Visualizer] "+e,t),M(e,2),null)},r=e=>{var t=a.createFramebuffer(),r=(a.bindFramebuffer(a.FRAMEBUFFER,t),a.createTexture());return a.bindTexture(a.TEXTURE_2D,r),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,e),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,e),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,r,0),{framebuffer:t,texture:r}},i=e(a.VERTEX_SHADER,`#version 300 es

in vec2 inPosition;
out vec2 fragUV;

void main() {
    gl_Position = vec4(inPosition, 0.0, 1.0);
    fragUV = (inPosition + 1.0) / 2.0;
}
`,"particle vertex");if(!i)return{isError:!0};var n=e(a.FRAGMENT_SHADER,`#version 300 es
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
`,"particle fragment");if(!n)return{isError:!0};var o,s,u,l,c,f,d,h,m,g,y,p,v,E,x,b,T,R,S,w,_,A,C,D,F,L,P,I,U,O,N,i=t(i,n,"particle");if(i)return n=a.getAttribLocation(i,"inPosition"),o=a.getUniformLocation(i,"uNoiseOffset"),s=a.getUniformLocation(i,"uAmplitude"),u=a.getUniformLocation(i,"uSeed"),l=a.getUniformLocation(i,"uDotSpacing"),c=a.getUniformLocation(i,"uDotOffset"),f=a.getUniformLocation(i,"uSphereRadius"),d=a.getUniformLocation(i,"uFeather"),h=a.getUniformLocation(i,"uNoiseFrequency"),m=a.getUniformLocation(i,"uNoiseAmplitude"),(g=e(a.VERTEX_SHADER,`#version 300 es

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
`,"dot vertex"))&&(y=e(a.FRAGMENT_SHADER,`#version 300 es
precision highp float;

in vec2 fragUV;
in float fragDotRadiusPX;
out float outColor;

void main() {
    float t = clamp((1.0 - length(fragUV)) * fragDotRadiusPX, 0.0, 1.0);
    outColor = t;
}
`,"dot fragment"))&&(g=t(g,y,"dot"))&&(y=a.getAttribLocation(g,"inPosition"),p=a.getUniformLocation(g,"uDotCount"),v=a.getUniformLocation(g,"uDotRadius"),E=a.getUniformLocation(g,"uDotRadiusPX"),x=a.getUniformLocation(g,"uParticleTexture"),b=e(a.VERTEX_SHADER,`#version 300 es

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
`,"blur vertex"))&&(T=e(a.FRAGMENT_SHADER,`#version 300 es
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
`,"blur fragment"))&&(b=t(b,T,"blur"))&&(T=a.getAttribLocation(b,"inPosition"),R=a.getUniformLocation(b,"uBlurRadius"),S=a.getUniformLocation(b,"uBlurDirection"),w=a.getUniformLocation(b,"uInputTexture"),_=e(a.VERTEX_SHADER,`#version 300 es

uniform vec3 uOutputColor;
in vec2 inPosition;

out vec2 fragUV;
out vec3 fragOutputColor;

void main() {
    gl_Position = vec4(inPosition, 0.0, 1.0);
    fragUV = (inPosition + 1.0) / 2.0;
    fragOutputColor = uOutputColor;
}
`,"finalize vertex"))&&(e=e(a.FRAGMENT_SHADER,`#version 300 es
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
`,"finalize fragment"))&&(t=t(_,e,"finalize"))?(_=a.getAttribLocation(t,"inPosition"),e=a.getUniformLocation(t,"uOutputColor"),A=a.getUniformLocation(t,"uBlurredTexture"),C=a.getUniformLocation(t,"uOriginalTexture"),{framebuffer:D,texture:F}=r(a.NEAREST),{framebuffer:L,texture:P}=r(a.NEAREST),{framebuffer:I,texture:U}=r(a.LINEAR),{framebuffer:r,texture:O}=r(a.NEAREST),N=a.createBuffer(),a.bindBuffer(a.ARRAY_BUFFER,N),a.bufferData(a.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),a.STATIC_DRAW),a.enable(a.BLEND),a.blendEquation(a.MAX),{isError:!1,particleShader:i,dotShader:g,blurShader:b,finalizeShader:t,viewportSize:0,particleTextureSize:0,inPositionLoc:n,inPositionLocDot:y,inPositionLocBlur:T,inPositionLocFinalize:_,uNoiseOffsetLoc:o,uAmplitudeLoc:s,uSeedLoc:u,uDotSpacingLoc:l,uDotOffsetLoc:c,uSphereRadiusLoc:f,uFeatherLoc:d,uNoiseFrequencyLoc:h,uNoiseAmplitudeLoc:m,uDotCountLoc:p,uDotRadiusLoc:v,uDotRadiusPXLoc:E,uParticleTextureLoc:x,uBlurRadiusLoc:R,uBlurDirectionLoc:S,uBlurInputTextureLoc:w,uOutputColorLoc:e,uBlurredTextureLoc:A,uOriginalTextureLoc:C,quadBuffer:N,particleFramebuffer:D,particleTexture:F,dotFramebuffer:L,dotTexture:P,blurXFramebuffer:I,blurXTexture:U,blurYFramebuffer:r,blurYTexture:O}):{isError:!0};return{isError:!0}},[]),i=(0,o.useCallback)((e,t)=>{!t.isError&&e&&(t.viewportSize=Math.min(e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.bindTexture(e.TEXTURE_2D,t.dotTexture),e.texImage2D(e.TEXTURE_2D,0,e.R8,t.viewportSize,t.viewportSize,0,e.RED,e.UNSIGNED_BYTE,null),e.bindTexture(e.TEXTURE_2D,t.blurXTexture),e.texImage2D(e.TEXTURE_2D,0,e.R8,t.viewportSize,t.viewportSize,0,e.RED,e.UNSIGNED_BYTE,null),e.bindTexture(e.TEXTURE_2D,t.blurYTexture),e.texImage2D(e.TEXTURE_2D,0,e.R8,t.viewportSize,t.viewportSize,0,e.RED,e.UNSIGNED_BYTE,null))},[]),n=(0,o.useCallback)((n,e,t)=>{if(!t.isError&&n){let i=null,a=[];if(window.do_ncs_perf_test){i=n.getExtension("EXT_disjoint_timer_query_webgl2");for(let e=0;e<4;e++)a[e]=n.createQuery()}var r=Spicetify.Player.getProgress()/1e3,o=75*(.5*r+(l=e.amplitudeCurve,o=R(l,e=>e.x,s=r),u=l[o],l.length<=o+1?(u.accumulatedIntegral??0)+u.y*(s-u.x):(l={x:s,y:w(s,u.x,(s=l[o+1]).x,u.y,s.y)},(u.accumulatedIntegral??0)+h(u,l))))*.01,s=((i,e,t)=>{if(0==t)return _(i,e=>e.x,e=>e.y,e=>e,e);var r,a=e-t/2,e=e+t/2,n=R(i,e=>e.x,a),o=R(i,e=>e.x,e);let s=0;if(n==o)return u=i[n],i.length-2<n?u.y:(w(a,u.x,(r=i[n+1]).x,u.y,r.y)+w(e,u.x,r.x,u.y,r.y))/2;{let t=i[n],r=i[n+1];var u={x:a,y:w(a,t.x,r.x,t.y,r.y)};s=h(u,r);for(let e=n+1;e<o;e++)t=r,r=i[e+1],s+=h(t,r);t=r,i.length-2<o?s+=t.y*(e-t.x):(r=i[o+1],u={x:e,y:w(e,t.x,r.x,t.y,r.y)},s+=h(t,u))}return s/t})(e.amplitudeCurve,r,.15),u=e.seed,l=322,r=.9/l,c=.5*r*t.viewportSize,f=w(s,0,1,.675,.9),d=Math.pow(s+3,2)*(45/1568);if(t.particleTextureSize!==l&&(t.particleTextureSize=l,n.bindTexture(n.TEXTURE_2D,t.particleTexture),n.texImage2D(n.TEXTURE_2D,0,n.RG32F,l,l,0,n.RG,n.FLOAT,null)),window.do_ncs_perf_test&&n.beginQuery(i.TIME_ELAPSED_EXT,a[0]),n.disable(n.BLEND),n.bindFramebuffer(n.FRAMEBUFFER,t.particleFramebuffer),n.viewport(0,0,l,l),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.useProgram(t.particleShader),n.uniform1f(t.uNoiseOffsetLoc,o),n.uniform1f(t.uAmplitudeLoc,s),n.uniform1i(t.uSeedLoc,u),n.uniform1f(t.uDotSpacingLoc,.9),n.uniform1f(t.uDotOffsetLoc,-.45),n.uniform1f(t.uSphereRadiusLoc,f),n.uniform1f(t.uFeatherLoc,d),n.uniform1f(t.uNoiseFrequencyLoc,4),n.uniform1f(t.uNoiseAmplitudeLoc,.32*.9),n.bindBuffer(n.ARRAY_BUFFER,t.quadBuffer),n.enableVertexAttribArray(t.inPositionLoc),n.vertexAttribPointer(t.inPositionLoc,2,n.FLOAT,!1,0,0),n.drawArrays(n.TRIANGLE_FAN,0,4),window.do_ncs_perf_test&&(n.endQuery(i.TIME_ELAPSED_EXT),n.beginQuery(i.TIME_ELAPSED_EXT,a[1])),n.enable(n.BLEND),n.bindFramebuffer(n.FRAMEBUFFER,t.dotFramebuffer),n.viewport(0,0,t.viewportSize,t.viewportSize),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.useProgram(t.dotShader),n.uniform1i(t.uDotCountLoc,l),n.uniform1f(t.uDotRadiusLoc,r),n.uniform1f(t.uDotRadiusPXLoc,c),n.uniform1i(t.uParticleTextureLoc,0),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t.particleTexture),n.bindBuffer(n.ARRAY_BUFFER,t.quadBuffer),n.enableVertexAttribArray(t.inPositionLocDot),n.vertexAttribPointer(t.inPositionLocDot,2,n.FLOAT,!1,0,0),n.drawArraysInstanced(n.TRIANGLE_FAN,0,4,l*l),window.do_ncs_perf_test&&(n.endQuery(i.TIME_ELAPSED_EXT),n.beginQuery(i.TIME_ELAPSED_EXT,a[2])),n.bindFramebuffer(n.FRAMEBUFFER,t.blurXFramebuffer),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.useProgram(t.blurShader),n.uniform1f(t.uBlurRadiusLoc,.01*t.viewportSize),n.uniform2f(t.uBlurDirectionLoc,1/t.viewportSize,0),n.uniform1i(t.uBlurInputTextureLoc,0),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t.dotTexture),n.bindBuffer(n.ARRAY_BUFFER,t.quadBuffer),n.enableVertexAttribArray(t.inPositionLocBlur),n.vertexAttribPointer(t.inPositionLocBlur,2,n.FLOAT,!1,0,0),n.drawArrays(n.TRIANGLE_FAN,0,4),n.bindFramebuffer(n.FRAMEBUFFER,t.blurYFramebuffer),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.uniform2f(t.uBlurDirectionLoc,0,1/t.viewportSize),n.bindTexture(n.TEXTURE_2D,t.blurXTexture),n.drawArrays(n.TRIANGLE_FAN,0,4),n.bindFramebuffer(n.FRAMEBUFFER,null),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),window.do_ncs_perf_test&&(n.endQuery(i.TIME_ELAPSED_EXT),n.beginQuery(i.TIME_ELAPSED_EXT,a[3])),n.useProgram(t.finalizeShader),n.uniform3f(t.uOutputColorLoc,e.themeColor.rgb.r/255,e.themeColor.rgb.g/255,e.themeColor.rgb.b/255),n.uniform1i(t.uBlurredTextureLoc,0),n.uniform1i(t.uOriginalTextureLoc,1),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t.blurYTexture),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,t.dotTexture),n.bindBuffer(n.ARRAY_BUFFER,t.quadBuffer),n.enableVertexAttribArray(t.inPositionLocFinalize),n.vertexAttribPointer(t.inPositionLocFinalize,2,n.FLOAT,!1,0,0),n.drawArrays(n.TRIANGLE_FAN,0,4),window.do_ncs_perf_test){n.endQuery(i.TIME_ELAPSED_EXT),window.do_ncs_perf_test=!1;let r=()=>{var e,t;0!==a.length&&(t=n.getParameter(i.GPU_DISJOINT_EXT),e=a.map(e=>n.getQueryParameter(e,n.QUERY_RESULT_AVAILABLE)).reduce((e,t)=>e&&t,!0),t?(a.map(e=>n.deleteQuery(e)),console.log("NCS PERF RESULT: FAILED (disjoint)"),a.length=0):e?(t=a.map(e=>n.getQueryParameter(e,n.QUERY_RESULT)),console.log("NCS PERF RESULT: ",t),window.ncs_perf_test_out||(window.ncs_perf_test_out=[]),window.ncs_perf_test_out.push(t),a.length=0):window.requestAnimationFrame(r))};r()}}},[]);return o.default.createElement(s,{isEnabled:a.isEnabled,data:{themeColor:a.themeColor,seed:t,amplitudeCurve:e},contextType:"webgl2",onInit:r,onResize:i,onRender:n,style:{width:"100%",height:"100%",objectFit:"contain"},sizeConstraint:(e,t)=>{e=Math.min(e,t);return{width:e,height:e}}})}},{id:"spectrum",name:"Spectrum (very WIP)",renderer:function(e){let t=(0,x.useContext)(p);var r=(0,x.useMemo)(()=>{if(!e.audioAnalysis)return[];if(1!==e.audioAnalysis.track.rhythm_version)return t("Error: Unsupported rhythmstring version "+e.audioAnalysis.track.rhythm_version,1),[];var o=e.audioAnalysis.segments,s=le(e.audioAnalysis.track.rhythmstring);if(0===o.length||0===s.length)return[];var u=.4/Math.sqrt(2)*8,l=12*s.length;let c=[];for(let e=0;e<o.length;e++){var f=o[e];let t=S(f.loudness_start),r=S(f.loudness_max),i=f.start+f.loudness_max_time;var d=f.pitches;let a=i-u,n=i+u;var h=s.map(e=>{var t=R(e,e=>e,a),r=R(e,e=>e,n);return e.slice(t,r).map(e=>Math.exp(-Math.pow((e-i)/.4,2))).reduce((e,t)=>e+t,0)+.2}),m=Math.max(...h);for(let e=0;e<h.length;e++)h[e]/=m;var g=Array(l);for(let t=0;t<h.length;t++){var y=w(t,0,h.length-1,.2,.6);for(let e=0;e<12;e++){var p=_([...h.entries()],e=>e[0],e=>e[1],V,t+e/12),v=d.reduce((e,t)=>e+t,0)/d.length,v=d[e]*y+v*(1-y);g[12*t+e]=p*v}}if(c.push([f.start,...g.map(e=>e*t)]),c.push([i,...g.map(e=>e*r)]),e==o.length-1){let t=S(f.loudness_end);c.push([f.start+f.duration,...g.map(e=>e*t)])}}var n=Array(l).fill(0).map(e=>Array(c.length));for(let a=0;a<l;a++){let t=0,r={x:0,y:0},i={x:0,y:0};for(let e=0;e<c.length;e++){var E,x,b,T={x:c[e][0],y:c[e][a+1]};i.x+i.y/.4<T.x+T.y/.4&&(i.x!==r.x&&(E=(T.y-r.y)/(T.x-r.x),x=r.y-E*r.x,b=(i.y- -.4*i.x-x)/(E+.4),n[a][t]={x:b,y:E*b+x},t++),i=T,n[a][t]=T,t++),r=T}n[a].length=t}return n},[e.audioAnalysis]),i=(0,x.useCallback)(e=>e?{isError:!1}:(t("Error: 2D rendering is not supported",2),{isError:!0}),[]),a=(0,x.useCallback)((e,t)=>{t.isError},[]),n=(0,x.useCallback)((t,r,e)=>{if(!e.isError&&t){var i=Spicetify.Player.getProgress()/1e3,a=(t.clearRect(0,0,t.canvas.width,t.canvas.height),t.fillStyle=r.themeColor.toCSS(Spicetify.Color.CSSFormat.HEX),r.spectrumData.length),n=t.canvas.width/a*.7,o=(t.canvas.width-n*a)/(a+1);for(let e=0;e<a;e++){var s=_(r.spectrumData[e],e=>e.x,e=>e.y,e=>e,i);t.fillRect(o*(e+1)+n*e,t.canvas.height-s*t.canvas.height,n,s*t.canvas.height)}}},[]);return x.default.createElement(s,{isEnabled:e.isEnabled,data:{themeColor:e.themeColor,spectrumData:r},contextType:"2d",onInit:i,onResize:a,onRender:n,style:{width:"100%",height:"100%"}})}},{id:"debug",name:"DEBUG",renderer:function(e){let t=(0,l.useContext)(p);var r=(0,l.useMemo)(()=>e.audioAnalysis?e.audioAnalysis.bars.reduce((e,t)=>e+t.duration,0)/e.audioAnalysis.bars.length:1,[e.audioAnalysis]),i=(0,l.useMemo)(()=>e.audioAnalysis?le(e.audioAnalysis.track.rhythmstring):null,[e.audioAnalysis]),a=(0,l.useCallback)(e=>e?{isError:!1}:(t("Error: 2D rendering is not supported",2),{isError:!0}),[]),n=(0,l.useCallback)((e,t)=>{t.isError},[]),o=(0,l.useCallback)((i,a,n)=>{if(!n.isError&&i&&a.audioAnalysis&&a.rhythmString){i.clearRect(0,0,i.canvas.width,i.canvas.height);n=Spicetify.Player.getProgress()/1e3;let r={start:n-ce[0]*a.barDuration,end:n+ce[1]*a.barDuration,current:n};var o,s=(e,t)=>{i.save(),i.beginPath(),i.rect(t.x,t.y,t.width,t.height),i.clip(),e.render(i,{analysis:a.audioAnalysis,rhythm:a.rhythmString},r,t),i.restore()};for(o of fe)"background"===o.layer&&s(o,{x:30,y:0,width:i.canvas.width-20-10,height:i.canvas.height});var u,l,c,f,d=fe.filter(e=>"content"===e.layer),h=i.canvas.height-20*(d.length-1),m=d.reduce((e,t)=>e+t.height,0);let e=0,t=0;for(u of d){var g=w(e,0,m,0,h)+20*t,y=w(e+u.height,0,m,0,h)+20*t;e+=u.height,t++,s(u,{x:30,y:g,width:i.canvas.width-20-10,height:y-g}),l=u.name,c=y-(g=g),i.save(),i.font="20px sans-serif",i.textAlign="center",i.fillStyle="white",i.rotate(3*Math.PI/2),i.fillText(l,-(g+c/2),20,c),i.restore(),t<d.length&&(i.lineWidth=1,i.strokeStyle="#AAAAAA",i.beginPath(),i.moveTo(10,y+10),i.lineTo(i.canvas.width-10,y+10),i.stroke())}for(f of fe)"overlay"===f.layer&&s(f,{x:30,y:0,width:i.canvas.width-20-10,height:i.canvas.height})}},[]);return l.default.createElement(s,{isEnabled:e.isEnabled,data:{audioAnalysis:e.audioAnalysis,rhythmString:i,barDuration:r},contextType:"2d",onInit:a,onResize:n,onRender:o,style:{width:"100%",height:"100%"}})}}];function Re(e){let[t,r]=(0,g.useState)(e.initialRenderer||"ncs");var i=Te.find(e=>e.id===t)?.renderer;let a=(0,g.useRef)(null);a.current&&!a.current.ownerDocument.defaultView&&e.onWindowDestroyed?.();var n=!!(t=>{let[e,r]=(0,be.useState)(t?.fullscreenElement??null);return(0,be.useEffect)(()=>{if(t){let e=()=>r(t.fullscreenElement);return t.addEventListener("fullscreenchange",e),()=>t.removeEventListener("fullscreenchange",e)}},[t]),e})(a.current?.ownerDocument);let[o,s]=(0,g.useState)({state:"loading"}),[u,l]=(0,g.useState)({themeColor:Spicetify.Color.fromHex("#535353")}),c=(0,g.useCallback)(t=>s(e=>"error"===e.state&&2===e.errorData.recovery?e:t),[]),f=(0,g.useCallback)((e,t)=>{c({state:"error",errorData:{message:e,recovery:t}})},[]),d="error"===o.state&&2===o.errorData.recovery,h=(0,g.useMemo)(()=>new ge,[]),m=(0,g.useCallback)(async e=>{e=e?.item;if(e){var t=Spicetify.URI.fromString(e.uri);if(t.type!==Spicetify.URI.Type.TRACK)f("Error: The type of track you're listening to is currently not supported",1);else{c({state:"loading"});var r,i,t=`https://spclient.wg.spotify.com/audio-attributes/v1/audio-analysis/${t.id}?format=json`,[t,e]=await Promise.all([Spicetify.CosmosAsync.get(t).catch(e=>console.error("[Visualizer]",e)),h.fetch(23,e.metadata.image_url).catch(e=>console.error("[Visualizer] Could not load extracted color metadata. Status: "+me[e])).then(e=>{var t;return e&&0!==e.value.length&&"type.googleapis.com/spotify.context_track_color.ColorResult"===e.typeUrl?(e=e.value,t=xe,e=new DataView(e.buffer,e.byteOffset,e.byteLength),t=t[1](e).colorLight?.rgb?.toString(16).padStart(6,"0")??"535353",Spicetify.Color.fromHex("#"+t)):Spicetify.Color.fromHex("#535353")})]);if(t)if("object"!=typeof t)f(`Invalid audio analysis data (${t})`,0);else{if(!("track"in t&&"segments"in t))return r="error"in t&&t.error?t.error:"message"in t&&t.message?t.message:"Unknown error",null!==(i="code"in t?t.code:null)?void f(`Error ${i}: `+r,0):void f(r,0);l({audioAnalysis:t,themeColor:e}),c({state:"running"})}else f("Error: The audio analysis could not be loaded, please check your internet connection",0)}}else f("Start playing a song to see the visualization!",1)},[h]);return(0,g.useEffect)(()=>{if(!d){let e=e=>{e?.data&&m(e.data)};return Spicetify.Player.addEventListener("songchange",e),m(Spicetify.Player.data),()=>Spicetify.Player.removeEventListener("songchange",e)}},[d,m]),g.default.createElement("div",{className:"visualizer-container",ref:a},!d&&g.default.createElement(g.default.Fragment,null,g.default.createElement(p.Provider,{value:f},i&&g.default.createElement(i,{isEnabled:"running"===o.state,audioAnalysis:u.audioAnalysis,themeColor:u.themeColor})),g.default.createElement(he,{className:y.main_menu_button,renderInline:e.isSecondaryWindow||n,renderers:Te,currentRendererId:t,isFullscreen:n,onEnterFullscreen:()=>{a.current?.requestFullscreen()},onExitFullscreen:()=>{a.current?.ownerDocument.exitFullscreen()},onOpenWindow:()=>(async r=>{try{let e=window.open();if(!e){let t="fallback PiP API is not available";if(window.documentPictureInPicture&&(window.documentPictureInPicture.window?t="cannot open another PiP window":e=await window.documentPictureInPicture.requestWindow().catch(e=>(t=e?""+e:"unknown error",null))),!e)return void Spicetify.showNotification(A.default.createElement("span",null,"Failed to open window: ",t,". Try with devtools using"," ",A.default.createElement("code",{style:{fontSize:"12px",background:"rgba(0 0 0 / 0.2)",borderRadius:"4px",padding:"2px"}},"spicetify enable-devtools"),"."),!0)}let t=e.document;Array.from(document.styleSheets).forEach(e=>{e.ownerNode&&"tagName"in e.ownerNode&&(e=e.ownerNode,e=t.importNode(e,!0),t.head.appendChild(e))}),t.documentElement.className=document.documentElement.className,t.body.className=document.body.className;var i=D.getStyleSheetManager(),a=Spicetify.ReactDOM.unmountComponentAtNode(t.body),n=A.default.createElement(Re,{isSecondaryWindow:!0,onWindowDestroyed:a,initialRenderer:r});i?Spicetify.ReactDOM.render(A.default.createElement(i,{target:t.head},n),t.body):(Spicetify.showNotification("[Visualizer] Could not find StyleSheetManager. Styles in popup window probably won't work.",!0),Spicetify.ReactDOM.render(n,t.body))}catch(e){console.error("[Visualizer]","error opening popup window",e);let t=e?""+e:"unknown error";Spicetify.showNotification("Failed to open window: "+t,!0)}})(t),onSelectRenderer:e=>r(e)})),"loading"===o.state?g.default.createElement(B,null):"error"===o.state?g.default.createElement("div",{className:y.error_container},g.default.createElement("div",{className:y.error_message},o.errorData.message),0===o.errorData.recovery&&g.default.createElement(Spicetify.ReactComponent.ButtonPrimary,{onClick:()=>m(Spicetify.Player.data)},"Try again")):null)}var Se=r(i());return ve=k,M(n({},"__esModule",{value:!0}),ve)})();let render=()=>visualizer.default();