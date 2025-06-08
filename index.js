var visualizer=(()=>{var e,t,L=Object.create,n=Object.defineProperty,F=Object.getOwnPropertyDescriptor,U=Object.getOwnPropertyNames,P=Object.getPrototypeOf,N=Object.prototype.hasOwnProperty,I=(t,r,i,a)=>{if(r&&"object"==typeof r||"function"==typeof r)for(let e of U(r))N.call(t,e)||e===i||n(t,e,{get:()=>r[e],enumerable:!(a=F(r,e))||a.enumerable});return t},r=(e,t,r)=>(r=null!=e?L(P(e)):{},I(!t&&e&&e.__esModule?r:n(r,"default",{value:e,enumerable:!0}),e)),i=(e={"external-global-plugin:react"(e,t){t.exports=Spicetify.React}},function(){return t||(0,e[U(e)[0]])((t={exports:{}}).exports,t),t.exports}),O={},m=(((e,t)=>{for(var r in t)n(e,r,{get:t[r],enumerable:!0})})(O,{default:()=>function(){return be.default.createElement(Ee,null)}}),r(i())),h={main_menu_button:"app-module__main_menu_button___wQmMP_visualizer",error_container:"app-module__error_container___8JcIQ_visualizer",error_message:"app-module__error_message___soZdL_visualizer"},a=r(i());function B(){return a.default.createElement("svg",{width:"100px",height:"100px",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid"},a.default.createElement("circle",{cx:"50",cy:"50",r:"0",fill:"none",stroke:"currentColor","stroke-width":"2"},a.default.createElement("animate",{attributeName:"r",repeatCount:"indefinite",dur:"1s",values:"0;40",keyTimes:"0;1",keySplines:"0 0.2 0.8 1",calcMode:"spline",begin:"0s"}),a.default.createElement("animate",{attributeName:"opacity",repeatCount:"indefinite",dur:"1s",values:"1;0",keyTimes:"0;1",keySplines:"0.2 0 0.8 1",calcMode:"spline",begin:"0s"})),a.default.createElement("circle",{cx:"50",cy:"50",r:"0",fill:"none",stroke:"currentColor","stroke-width":"2"},a.default.createElement("animate",{attributeName:"r",repeatCount:"indefinite",dur:"1s",values:"0;40",keyTimes:"0;1",keySplines:"0 0.2 0.8 1",calcMode:"spline",begin:"-0.5s"}),a.default.createElement("animate",{attributeName:"opacity",repeatCount:"indefinite",dur:"1s",values:"1;0",keyTimes:"0;1",keySplines:"0.2 0 0.8 1",calcMode:"spline",begin:"-0.5s"})))}var o=r(i()),g=r(i());function s(a){let{contextType:n,onInit:o,onResize:s,onRender:u,style:e,data:l,isEnabled:t}=a,f=(0,g.useRef)(null),[c,d]=(0,g.useState)(null),m=(0,g.useCallback)((e,t)=>{var r=Math.round(e.clientWidth*window.devicePixelRatio),i=Math.round(e.clientHeight*window.devicePixelRatio),{width:r,height:i}=a.sizeConstraint?.(r,i)??{width:r,height:i};e.width===r&&e.height===i||(e.width=r,e.height=i)},[]);return(0,g.useEffect)(()=>{if(o){var e=f.current;if(e){var t,r,i=e.ownerDocument.defaultView;if(i)return t=e.getContext(n),r=o(t),m(e,i),s(t,r),d(r),()=>d(null)}}},[n,o]),(0,g.useEffect)(()=>{if(t&&c&&u){var e=f.current;if(e){let a=e.ownerDocument.defaultView;if(a){let t=e.getContext(n),r=0,i=e=>{c&&(u(t,l,c,e),r=a.requestAnimationFrame(i))};return r=a.requestAnimationFrame(i),()=>{r&&a.cancelAnimationFrame(r)}}}}},[n,u,l,c,t]),(0,g.useEffect)(()=>{if(f.current){var t=f.current.ownerDocument.defaultView;if(t){let e=new t.ResizeObserver(()=>{var e,t=f.current;t&&(e=t.ownerDocument.defaultView)&&(m(t,e),e=t.getContext(n))&&c&&s(e,c)});return e.observe(f.current),()=>e.disconnect()}}},[n,s,c]),g.default.createElement("canvas",{ref:f,style:{...e||{},...t?{}:{visibility:"hidden"}}})}function R(e,t,r){let i=0,a=e.length;for(;1<a-i;){var n=Math.floor((a+i)/2);t(e[n],n)<=r?i=n:a=n}return i}function S(e){return Math.min(Math.max(Math.pow(10,e/20),0),1)}function k(e){return e*e*(3-2*e)}function A(e,t,r,i,a){return e=(e=(e-t)/(r-t))*(a-i)+i}function c(e,t){return-.5*(e.x-t.x)*(e.y+t.y)}function C(e,t,r,i,a){var n,o=R(e,t,a),s=e[o];return e.length-2<o?r(s,o):(e=e[o+1],a=a,n=t(s,o),t=t(e,o+1),i=i,s=r(s,o),r=r(e,o+1),a=(a=i(a=(a-n)/(t-n)))*(r-s)+s)}var y=(0,r(i()).createContext)(()=>{});var z=(e=>(e[e.UNKNOWN=0]="UNKNOWN",e[e.OK=1]="OK",e[e.NOT_RESOLVED=2]="NOT_RESOLVED",e[e.NOT_FOUND=3]="NOT_FOUND",e[e.UNAVAILABLE_FOR_LEGAL_REASONS=4]="UNAVAILABLE_FOR_LEGAL_REASONS",e))(z||{}),M=class{constructor(){let t=(window.webpackChunkclient_web??window.webpackChunkopen).push([[Symbol()],{},e=>e]);var e=Object.keys(t.m).map(e=>t(e)).filter(e=>"object"==typeof e).map(e=>{try{return Object.values(e)}catch{}}).flat(),r=e.filter(e=>e&&"function"==typeof e&&"SERVICE_ID"in e&&"spotify.mdata_esperanto.proto.MetadataService"===e.SERVICE_ID),e=e.filter(e=>e&&"function"==typeof e&&e.toString().includes("executeEsperantoCall")&&e.toString().includes("cancelEsperantoCall"));1===r.length&&1===e.length&&(this.serviceDescriptor=r[0],this.service=new this.serviceDescriptor(e[0]()))}fetch(e,t){return new Promise((r,i)=>{let a=this.service.observe(this.serviceDescriptor.METHODS.observe.requestType.fromPartial({extensionQuery:[{entityUri:t,extensionKind:e}]}),e=>{var t;e.pendingResponse||(a.cancel(),1===e.extensionResult[0].status?(t=e.extensionResult[0].extensionData,r(t)):(t=e.extensionResult[0].details.cacheStatus,i(t)))})})}},V=class{constructor(e){e instanceof DataView&&(e=new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),this.buffer=e,this.offset=0}getVarIntView(){let e=this.offset;for(;e<this.buffer.length-1&&128&this.buffer[e];)e++;return e++,this.getView(e-this.offset)}getVarInt(){if(this.isExhausted())return 0n;let e=0n,t=0n;for(var r;r=BigInt(this.buffer[this.offset++]),e|=(0x7fn&r)<<t,t+=7n,0x80n&r&&!this.isExhausted(););return e}getArray(e){var e=Math.min(e,this.buffer.length-this.offset),t=this.buffer.slice(this.offset,this.offset+e);return this.offset+=e,t}getView(e){var e=Math.min(e,this.buffer.length-this.offset),t=new DataView(this.buffer.buffer,this.buffer.byteOffset+this.offset,e);return this.offset+=e,t}has(e){return this.buffer.length-this.offset>=e}isExhausted(){return!this.has(1)}};function G(e,t){return e&1n<<BigInt(8*t-1)?e-(1n<<BigInt(8*t)):e}function u(t,r){return[t[0],e=>r(t[1](e))]}var l=[0,e=>new V(e).getVarInt()],f=u(l,e=>!!e),d=u(l,Number);u(l,e=>Number(G(e,4))),u(l,e=>G(e,8));function v(e,t){return{id:e,value:t}}function X(t){return[3,e=>{for(var r=new V(e),i={},a=Object.entries(t).map(([e,t])=>({name:e,...t}));!r.isExhausted();){let t=Number(r.getVarInt());var n=a.find(e=>e.id==t>>3);if(!n||!((e,t)=>{switch(t){case 0:return 0==(7&e);case 1:return 5==(7&e);case 2:return 1==(7&e);case 3:return 2==(7&e)}})(t,n.value[0]))break;var o=n.value,[s,u]=((e,t)=>{switch(t[0]){case 1:return e.has(4)?[!0,t[1](e.getView(4))]:[!1,void 0];case 2:return e.has(8)?[!0,t[1](e.getView(8))]:[!1,void 0];case 0:return[!0,t[1](e.getVarIntView())];case 3:var r=Number(e.getVarInt());return[!0,t[1](e.getView(r))]}})(r,o);if(!s)break;o[2]?(i[n.name]||(i[n.name]=[]),i[n.name].push(u)):i[n.name]=u}return i}]}function K(e,t){for(var r=new E(31),i=0;i<31;++i)r[i]=t+=1<<e[i-1];for(var a=new J(r[30]),i=1;i<30;++i)for(var n=r[i];n<r[i+1];++n)a[n]=n-r[i]<<5|i;return{b:r,r:a}}var p,l=X({rgb:v(1,d),isFallback:v(2,f)}),Q=X({colorRaw:v(1,l),colorLight:v(2,l),colorDark:v(3,l)}),x=r(i()),Y=Uint8Array,E=Uint16Array,J=Int32Array,Z=new Y([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ee=new Y([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),te=new Y([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),d=K(Z,2),re=d.b,f=(d.r[re[28]=258]=28,K(ee,0)),ie=f.b,b=new E(32768);for(_=0;_<32768;++_)b[_]=((65280&(p=(61680&(p=(52428&(p=(43690&_)>>1|(21845&_)<<1))>>2|(13107&p)<<2))>>4|(3855&p)<<4))>>8|(255&p)<<8)>>1;var q=function(e,t,r){for(var i=e.length,a=0,n=new E(t);a<i;++a)e[a]&&++n[e[a]-1];var o=new E(t);for(a=1;a<t;++a)o[a]=o[a-1]+n[a-1]<<1;if(r){for(var s=new E(1<<t),u=15-t,a=0;a<i;++a)if(e[a])for(var l=a<<4|e[a],f=t-e[a],c=o[e[a]-1]++<<f,d=c|(1<<f)-1;c<=d;++c)s[b[c]>>u]=l}else for(s=new E(i),a=0;a<i;++a)e[a]&&(s[a]=b[o[e[a]-1]++]>>15-e[a]);return s},T=new Y(288);for(_=0;_<144;++_)T[_]=8;for(_=144;_<256;++_)T[_]=9;for(_=256;_<280;++_)T[_]=7;for(_=280;_<288;++_)T[_]=8;var _,ae=new Y(32);for(_=0;_<32;++_)ae[_]=5;var ne=q(T,9,1),oe=q(ae,5,1),W=function(e){for(var t=e[0],r=1;r<e.length;++r)t<e[r]&&(t=e[r]);return t},H=function(e,t,r){var i=t/8|0;return(e[i]|e[1+i]<<8)>>(7&t)&r},j=function(e,t){var r=t/8|0;return(e[r]|e[1+r]<<8|e[2+r]<<16)>>(7&t)},se=function(e){return(e+7)/8|0},ue=function(e,t,r){return(null==r||r>e.length)&&(r=e.length),new Y(e.subarray(t=null==t||t<0?0:t,r))},le=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],$=function(e,t,r){t=new Error(t||le[e]);if(t.code=e,Error.captureStackTrace&&Error.captureStackTrace(t,$),r)return t;throw t},fe=function(e,t,r,i){var a=e.length,O=i?i.length:0;if(!a||t.f&&!t.l)return r||new Y(0);function n(e){var t=r.length;t<e&&((t=new Y(Math.max(2*t,e))).set(r),r=t)}var o=!r,s=o||2!=t.i,u=t.i,l=(o&&(r=new Y(3*a)),t.f||0),f=t.p||0,c=t.b||0,d=t.l,m=t.d,h=t.m,g=t.n,y=8*a;do{if(!d){var l=H(e,f,1),v=H(e,f+1,3);if(f+=3,!v){var p=e[(A=se(f)+4)-4]|e[A-3]<<8,x=A+p;if(a<x){u&&$(0);break}s&&n(c+p),r.set(e.subarray(A,x),c),t.b=c+=p,t.p=f=8*x,t.f=l;continue}if(1==v)d=ne,m=oe,h=9,g=5;else if(2==v){for(var p=H(e,f,31)+257,E=H(e,f+10,15)+4,b=p+H(e,f+5,31)+1,T=(f+=14,new Y(b)),R=new Y(19),S=0;S<E;++S)R[te[S]]=H(e,f+3*S,7);f+=3*E;for(var x=W(R),B=(1<<x)-1,k=q(R,x,1),S=0;S<b;){var A,C=k[H(e,f,B)];if(f+=15&C,(A=C>>4)<16)T[S++]=A;else{var _=0,w=0;for(16==A?(w=3+H(e,f,3),f+=2,_=T[S-1]):17==A?(w=3+H(e,f,7),f+=3):18==A&&(w=11+H(e,f,127),f+=7);w--;)T[S++]=_}}var D=T.subarray(0,p),L=T.subarray(p),h=W(D),g=W(L),d=q(D,h,1),m=q(L,g,1)}else $(1);if(y<f){u&&$(0);break}}s&&n(c+131072);for(var z=(1<<h)-1,M=(1<<g)-1,F=f;;F=f){var U=(_=d[j(e,f)&z])>>4;if(y<(f+=15&_)){u&&$(0);break}if(_||$(2),U<256)r[c++]=U;else{if(256==U){F=f,d=null;break}var P,N=U-254,U=(264<U&&(P=Z[S=U-257],N=H(e,f,(1<<P)-1)+re[S],f+=P),m[j(e,f)&M]),I=U>>4,L=(U||$(3),f+=15&U,ie[I]);if(3<I&&(P=ee[I],L+=j(e,f)&(1<<P)-1,f+=P),y<f){u&&$(0);break}s&&n(c+131072);var V=c+N;if(c<L){var G=O-L,X=Math.min(L,V);for(G+c<0&&$(3);c<X;++c)r[c]=i[G+c]}for(;c<V;++c)r[c]=r[c-L]}}t.l=d,t.p=F,t.b=c,t.f=l,d&&(l=1,t.m=h,t.d=m,t.n=g)}while(!l);return c!=r.length&&o?ue(r,0,c):r.subarray(0,c)},l=new Y(0),ce=function(e,t){return(8!=(15&e[0])||7<e[0]>>4||(e[0]<<8|e[1])%31)&&$(6,"invalid zlib data"),(e[1]>>5&1)==+!t&&$(6,"invalid zlib data: "+(32&e[1]?"need":"unexpected")+" dictionary"),2+(e[1]>>3&4)};d="undefined"!=typeof TextDecoder&&new TextDecoder;try{d.decode(l,{stream:!0})}catch(e){}function de(e){e=e.replace(/-/g,"+").replace(/_/g,"/");var e=new Uint8Array(atob(e).split("").map(e=>e.charCodeAt(0))),e=fe(e.subarray(ce(e,i&&i.dictionary),-4),{i:2},i&&i.out,i&&i.dictionary),t=(new TextDecoder).decode(e).split(" ").map(e=>parseInt(e)),r=[];if(!(t.length<3)){var i=t.shift(),a=t.shift()/i,n=t.shift();if(!(t.length<n))for(let e=0;e<n;e++){var o=[],s=t.shift();if(t.length<s+(n-e-1))return r;for(let e=0;e<s;e++){var u=t.shift()*a;o.push(0==e?u:o[e-1]+u)}r.push(o)}}return r}var me=[1,2],he=[{name:"Beats",layer:"background",render:(t,r,i,a)=>{var n=R(r.analysis.beats,e=>e.start,i.start),o=R(r.analysis.beats,e=>e.start,i.end);t.lineWidth=1,t.strokeStyle="#FFFFFF33",t.beginPath();for(let e=n;e<=o;e++){var s=A(r.analysis.beats[e].start,i.start,i.end,a.x,a.x+a.width);t.moveTo(s,a.y),t.lineTo(s,a.y+a.height)}t.stroke()}},{name:"Bars",layer:"background",render:(t,r,i,a)=>{var n=R(r.analysis.bars,e=>e.start,i.start),o=R(r.analysis.bars,e=>e.start,i.end);t.lineWidth=3,t.strokeStyle="#FFFFFF66",t.beginPath();for(let e=n;e<=o;e++){var s=A(r.analysis.bars[e].start,i.start,i.end,a.x,a.x+a.width);t.moveTo(s,a.y),t.lineTo(s,a.y+a.height)}t.stroke()}},{name:"Position",layer:"overlay",render:(e,t,r,i)=>{e.lineWidth=5,e.strokeStyle=e.fillStyle="white",e.beginPath();r=A(r.current,r.start,r.end,i.x,i.x+i.width);e.moveTo(r,i.y),e.lineTo(r,i.y+i.height),e.stroke();e.beginPath(),e.moveTo(r-10,i.y),e.lineTo(r+10,i.y),e.lineTo(r,i.y+10),e.lineTo(r-10,i.y),e.moveTo(r-10,i.y+i.height),e.lineTo(r+10,i.y+i.height),e.lineTo(r,i.y+i.height-10),e.lineTo(r-10,i.y+i.height),e.fill()}},{name:"Loudness",layer:"content",height:1,render:(t,r,i,a)=>{var n=R(r.analysis.segments,e=>e.start,i.start),o=R(r.analysis.segments,e=>e.start,i.end),s=e=>S(e);t.lineWidth=2,t.strokeStyle="white",t.beginPath();for(let e=n;e<=o+1&&e<r.analysis.segments.length;e++){var u=r.analysis.segments[e],l=A(u.start,i.start,i.end,a.x,a.x+a.width),f=A(s(u.loudness_start),0,1,a.y+a.height,a.y),c=A(u.start+u.loudness_max_time,i.start,i.end,a.x,a.x+a.width),d=A(s(u.loudness_max),0,1,a.y+a.height,a.y);e===n?t.moveTo(l,f):t.lineTo(l,f),t.lineTo(c,d),e===r.analysis.segments.length-1&&(l=A(u.start+u.duration,i.start,i.end,a.x,a.x+a.width),f=A(s(u.loudness_end),0,1,a.y+a.height,a.y),t.lineTo(l,f))}t.stroke()}},{name:"Confidence",layer:"content",height:.25,render:(t,r,i,a)=>{var n=R(r.analysis.segments,e=>e.start,i.start),o=R(r.analysis.segments,e=>e.start,i.end);t.beginPath();for(let e=n;e<=o;e++){var s=r.analysis.segments[e],u=A(s.start,i.start,i.end,a.x,a.x+a.width),l=A(s.start+s.duration,i.start,i.end,a.x,a.x+a.width);t.fillStyle=`rgba(255, 255, 255, ${s.confidence})`,t.fillRect(u,a.y,l-u,a.height)}t.fill()}},{name:"Timbre",layer:"content",height:1.5,render:(r,i,a,n)=>{var o=n.height/12,s=R(i.analysis.segments,e=>e.start,a.start),u=R(i.analysis.segments,e=>e.start,a.end);for(let t=0;t<12;t++){var e=(Math.sqrt(5)-1)/2,l=t*e;r.beginPath();for(let e=s;e<=u;e++){var f=i.analysis.segments[e],c=A(Math.tanh(.02*f.timbre[t]),-1,1,0,1),d=A(f.start,a.start,a.end,n.x,n.x+n.width),f=A(f.start+f.duration,a.start,a.end,n.x,n.x+n.width),m=n.y+t/12*n.height;r.fillStyle=`hsla(${360*l}, 100%, 70%, ${c})`,r.fillRect(d,m,f-d,o)}r.fill()}}},{name:"Pitches",layer:"content",height:1.5,render:(r,i,a,n)=>{var o=n.height/12,s=R(i.analysis.segments,e=>e.start,a.start),u=R(i.analysis.segments,e=>e.start,a.end);for(let t=0;t<12;t++){var l=t/12;r.beginPath();for(let e=s;e<=u;e++){var f=i.analysis.segments[e],c=A(f.start,a.start,a.end,n.x,n.x+n.width),d=A(f.start+f.duration,a.start,a.end,n.x,n.x+n.width),m=n.y+t/12*n.height;r.fillStyle=`hsla(${360*l}, 100%, 70%, ${f.pitches[t]})`,r.fillRect(c,m,d-c,o)}r.fill()}}},{name:"Rhythm",layer:"content",height:.5,render:(r,i,a,n)=>{var o=n.height/i.rhythm.length,s=Math.min(o,20),e=s/2/n.width*(a.end-a.start);r.fillStyle="white",r.beginPath();for(let t=i.rhythm.length-1;0<=t;t--){var u=R(i.rhythm[t],e=>e,a.start-e),l=R(i.rhythm[t],e=>e,a.end+e);for(let e=u;e<=l;e++){var f=A(i.rhythm[t][e],a.start,a.end,n.x,n.x+n.width),c=n.y+t*o;r.rect(f-s/2,c,s,o)}}r.fill()}}];var w=r(i());var D=r(i()),ge=D.default.memo(e=>D.default.createElement(Spicetify.ReactComponent.IconComponent,{semanticColor:"textBase",dangerouslySetInnerHTML:{__html:Spicetify.SVGIcons[e.name]},iconSize:e.size})),ye=D.default.memo(t=>D.default.createElement(Spicetify.ReactComponent.Menu,null,D.default.createElement(Spicetify.ReactComponent.MenuSubMenuItem,{displayText:"Renderer"},t.renderers.map(e=>D.default.createElement(Spicetify.ReactComponent.MenuItem,{onClick:()=>t.onSelectRenderer(e.id)},e.name))),D.default.createElement(Spicetify.ReactComponent.MenuItem,{onClick:()=>t.onOpenWindow(),trailingIcon:D.default.createElement(ge,{name:"external-link",size:16})},"Open Window"))),ve=D.default.memo(e=>D.default.createElement(Spicetify.ReactComponent.ContextMenu,{trigger:"click",menu:D.default.createElement(ye,{...e})},D.default.createElement(Spicetify.ReactComponent.ButtonSecondary,{"aria-label":"menu",className:e.className,iconOnly:()=>D.default.createElement(ge,{name:"menu",size:16})}))),pe=r(i());var xe=[{id:"ncs",name:"NCS",renderer:function(a){let B=(0,o.useContext)(y);var e=(0,o.useMemo)(()=>{if(!a.audioAnalysis)return[{x:0,y:0}];var e=a.audioAnalysis.segments,t=e.flatMap(e=>e.loudness_max_time?[{x:e.start,y:S(e.loudness_start)},{x:e.start+e.loudness_max_time,y:S(e.loudness_max)}]:[{x:e.start,y:S(e.loudness_start)}]);if(e.length){t[0].accumulatedIntegral=0;for(let e=1;e<t.length;e++){var r=t[e-1],i=t[e];i.accumulatedIntegral=(r.accumulatedIntegral??0)+c(r,i)}e=e[e.length-1];t.push({x:e.start+e.duration,y:S(e.loudness_end)})}return t},[a.audioAnalysis]),t=a.audioAnalysis?.meta.timestamp??0,r=(0,o.useCallback)(a=>{if(!a)return B("Error: WebGL2 is not supported",2),{isError:!0};if(!a.getExtension("EXT_color_buffer_float"))return B("Error: Rendering to floating-point textures is not supported",2),{isError:!0};var e=(e,t,r)=>{e=a.createShader(e);return a.shaderSource(e,t),a.compileShader(e),a.getShaderParameter(e,a.COMPILE_STATUS)||a.isContextLost()?e:(t=`Error: Failed to compile '${r}' shader`,r=a.getShaderInfoLog(e),console.error("[Visualizer] "+t,r),B(t,2),null)},t=(e,t,r)=>{var i=a.createProgram();return a.attachShader(i,e),a.attachShader(i,t),a.linkProgram(i),a.getProgramParameter(i,a.LINK_STATUS)||a.isContextLost()?i:(e=`Error: Failed to link '${r}' shader`,t=a.getProgramInfoLog(i),console.error("[Visualizer] "+e,t),B(e,2),null)},r=e=>{var t=a.createFramebuffer(),r=(a.bindFramebuffer(a.FRAMEBUFFER,t),a.createTexture());return a.bindTexture(a.TEXTURE_2D,r),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,e),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,e),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,r,0),{framebuffer:t,texture:r}},i=e(a.VERTEX_SHADER,`#version 300 es

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
`,"particle fragment");if(!n)return{isError:!0};var o,s,u,l,f,c,d,m,h,g,y,v,p,x,E,b,T,R,S,A,C,_,w,D,L,F,U,P,N,O,I,i=t(i,n,"particle");if(i)return n=a.getAttribLocation(i,"inPosition"),o=a.getUniformLocation(i,"uNoiseOffset"),s=a.getUniformLocation(i,"uAmplitude"),u=a.getUniformLocation(i,"uSeed"),l=a.getUniformLocation(i,"uDotSpacing"),f=a.getUniformLocation(i,"uDotOffset"),c=a.getUniformLocation(i,"uSphereRadius"),d=a.getUniformLocation(i,"uFeather"),m=a.getUniformLocation(i,"uNoiseFrequency"),h=a.getUniformLocation(i,"uNoiseAmplitude"),(g=e(a.VERTEX_SHADER,`#version 300 es

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
`,"dot fragment"))&&(g=t(g,y,"dot"))&&(y=a.getAttribLocation(g,"inPosition"),v=a.getUniformLocation(g,"uDotCount"),p=a.getUniformLocation(g,"uDotRadius"),x=a.getUniformLocation(g,"uDotRadiusPX"),E=a.getUniformLocation(g,"uParticleTexture"),b=e(a.VERTEX_SHADER,`#version 300 es

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
`,"blur fragment"))&&(b=t(b,T,"blur"))&&(T=a.getAttribLocation(b,"inPosition"),R=a.getUniformLocation(b,"uBlurRadius"),S=a.getUniformLocation(b,"uBlurDirection"),A=a.getUniformLocation(b,"uInputTexture"),C=e(a.VERTEX_SHADER,`#version 300 es

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
`,"finalize fragment"))&&(t=t(C,e,"finalize"))?(C=a.getAttribLocation(t,"inPosition"),e=a.getUniformLocation(t,"uOutputColor"),_=a.getUniformLocation(t,"uBlurredTexture"),w=a.getUniformLocation(t,"uOriginalTexture"),{framebuffer:D,texture:L}=r(a.NEAREST),{framebuffer:F,texture:U}=r(a.NEAREST),{framebuffer:P,texture:N}=r(a.LINEAR),{framebuffer:r,texture:O}=r(a.NEAREST),I=a.createBuffer(),a.bindBuffer(a.ARRAY_BUFFER,I),a.bufferData(a.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),a.STATIC_DRAW),a.enable(a.BLEND),a.blendEquation(a.MAX),{isError:!1,particleShader:i,dotShader:g,blurShader:b,finalizeShader:t,viewportSize:0,particleTextureSize:0,inPositionLoc:n,inPositionLocDot:y,inPositionLocBlur:T,inPositionLocFinalize:C,uNoiseOffsetLoc:o,uAmplitudeLoc:s,uSeedLoc:u,uDotSpacingLoc:l,uDotOffsetLoc:f,uSphereRadiusLoc:c,uFeatherLoc:d,uNoiseFrequencyLoc:m,uNoiseAmplitudeLoc:h,uDotCountLoc:v,uDotRadiusLoc:p,uDotRadiusPXLoc:x,uParticleTextureLoc:E,uBlurRadiusLoc:R,uBlurDirectionLoc:S,uBlurInputTextureLoc:A,uOutputColorLoc:e,uBlurredTextureLoc:_,uOriginalTextureLoc:w,quadBuffer:I,particleFramebuffer:D,particleTexture:L,dotFramebuffer:F,dotTexture:U,blurXFramebuffer:P,blurXTexture:N,blurYFramebuffer:r,blurYTexture:O}):{isError:!0};return{isError:!0}},[]),i=(0,o.useCallback)((e,t)=>{!t.isError&&e&&(t.viewportSize=Math.min(e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.bindTexture(e.TEXTURE_2D,t.dotTexture),e.texImage2D(e.TEXTURE_2D,0,e.R8,t.viewportSize,t.viewportSize,0,e.RED,e.UNSIGNED_BYTE,null),e.bindTexture(e.TEXTURE_2D,t.blurXTexture),e.texImage2D(e.TEXTURE_2D,0,e.R8,t.viewportSize,t.viewportSize,0,e.RED,e.UNSIGNED_BYTE,null),e.bindTexture(e.TEXTURE_2D,t.blurYTexture),e.texImage2D(e.TEXTURE_2D,0,e.R8,t.viewportSize,t.viewportSize,0,e.RED,e.UNSIGNED_BYTE,null))},[]),n=(0,o.useCallback)((e,t,r)=>{var i,a,n,o,s,u,l,f;!r.isError&&e&&(i=75*(.5*(s=Spicetify.Player.getProgress()/1e3)+(o=t.amplitudeCurve,i=R(o,e=>e.x,a=s),n=o[i],o.length<=i+1?(n.accumulatedIntegral??0)+n.y*(a-n.x):(o={x:a,y:A(a,n.x,(a=o[i+1]).x,n.y,a.y)},(n.accumulatedIntegral??0)+c(n,o))))*.01,a=((i,e,t)=>{if(0==t)return C(i,e=>e.x,e=>e.y,e=>e,e);var r,a=e-t/2,e=e+t/2,n=R(i,e=>e.x,a),o=R(i,e=>e.x,e);let s=0;if(n==o)return u=i[n],i.length-2<n?u.y:(A(a,u.x,(r=i[n+1]).x,u.y,r.y)+A(e,u.x,r.x,u.y,r.y))/2;{let t=i[n],r=i[n+1];var u={x:a,y:A(a,t.x,r.x,t.y,r.y)};s=c(u,r);for(let e=n+1;e<o;e++)t=r,r=i[e+1],s+=c(t,r);t=r,i.length-2<o?s+=t.y*(e-t.x):(r=i[o+1],u={x:e,y:A(e,t.x,r.x,t.y,r.y)},s+=c(t,u))}return s/t})(t.amplitudeCurve,s,.15),n=t.seed,u=.5*(s=.9/(o=322))*r.viewportSize,l=A(a,0,1,.675,.9),f=Math.pow(a+3,2)*(45/1568),r.particleTextureSize!==o&&(r.particleTextureSize=o,e.bindTexture(e.TEXTURE_2D,r.particleTexture),e.texImage2D(e.TEXTURE_2D,0,e.RG32F,o,o,0,e.RG,e.FLOAT,null)),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,r.particleFramebuffer),e.viewport(0,0,o,o),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(r.particleShader),e.uniform1f(r.uNoiseOffsetLoc,i),e.uniform1f(r.uAmplitudeLoc,a),e.uniform1i(r.uSeedLoc,n),e.uniform1f(r.uDotSpacingLoc,.9),e.uniform1f(r.uDotOffsetLoc,-.45),e.uniform1f(r.uSphereRadiusLoc,l),e.uniform1f(r.uFeatherLoc,f),e.uniform1f(r.uNoiseFrequencyLoc,4),e.uniform1f(r.uNoiseAmplitudeLoc,.32*.9),e.bindBuffer(e.ARRAY_BUFFER,r.quadBuffer),e.enableVertexAttribArray(r.inPositionLoc),e.vertexAttribPointer(r.inPositionLoc,2,e.FLOAT,!1,0,0),e.drawArrays(e.TRIANGLE_FAN,0,4),e.enable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,r.dotFramebuffer),e.viewport(0,0,r.viewportSize,r.viewportSize),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(r.dotShader),e.uniform1i(r.uDotCountLoc,o),e.uniform1f(r.uDotRadiusLoc,s),e.uniform1f(r.uDotRadiusPXLoc,u),e.uniform1i(r.uParticleTextureLoc,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,r.particleTexture),e.bindBuffer(e.ARRAY_BUFFER,r.quadBuffer),e.enableVertexAttribArray(r.inPositionLocDot),e.vertexAttribPointer(r.inPositionLocDot,2,e.FLOAT,!1,0,0),e.drawArraysInstanced(e.TRIANGLE_FAN,0,4,o*o),e.bindFramebuffer(e.FRAMEBUFFER,r.blurXFramebuffer),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(r.blurShader),e.uniform1f(r.uBlurRadiusLoc,.01*r.viewportSize),e.uniform2f(r.uBlurDirectionLoc,1/r.viewportSize,0),e.uniform1i(r.uBlurInputTextureLoc,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,r.dotTexture),e.bindBuffer(e.ARRAY_BUFFER,r.quadBuffer),e.enableVertexAttribArray(r.inPositionLocBlur),e.vertexAttribPointer(r.inPositionLocBlur,2,e.FLOAT,!1,0,0),e.drawArrays(e.TRIANGLE_FAN,0,4),e.bindFramebuffer(e.FRAMEBUFFER,r.blurYFramebuffer),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.uniform2f(r.uBlurDirectionLoc,0,1/r.viewportSize),e.bindTexture(e.TEXTURE_2D,r.blurXTexture),e.drawArrays(e.TRIANGLE_FAN,0,4),e.bindFramebuffer(e.FRAMEBUFFER,null),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(r.finalizeShader),e.uniform3f(r.uOutputColorLoc,t.themeColor.rgb.r/255,t.themeColor.rgb.g/255,t.themeColor.rgb.b/255),e.uniform1i(r.uBlurredTextureLoc,0),e.uniform1i(r.uOriginalTextureLoc,1),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,r.blurYTexture),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,r.dotTexture),e.bindBuffer(e.ARRAY_BUFFER,r.quadBuffer),e.enableVertexAttribArray(r.inPositionLocFinalize),e.vertexAttribPointer(r.inPositionLocFinalize,2,e.FLOAT,!1,0,0),e.drawArrays(e.TRIANGLE_FAN,0,4))},[]);return o.default.createElement(s,{isEnabled:a.isEnabled,data:{themeColor:a.themeColor,seed:t,amplitudeCurve:e},contextType:"webgl2",onInit:r,onResize:i,onRender:n,style:{width:"100%",height:"100%",objectFit:"contain"},sizeConstraint:(e,t)=>{e=Math.min(e,t);return{width:e,height:e}}})}},{id:"spectrum",name:"Spectrum (very WIP)",renderer:function(e){let t=(0,w.useContext)(y);var r=(0,w.useMemo)(()=>{if(!e.audioAnalysis)return[];if(1!==e.audioAnalysis.track.rhythm_version)return t("Error: Unsupported rhythmstring version "+e.audioAnalysis.track.rhythm_version,1),[];var o=e.audioAnalysis.segments,s=de(e.audioAnalysis.track.rhythmstring);if(0===o.length||0===s.length)return[];var u=.4/Math.sqrt(2)*8,l=12*s.length;let f=[];for(let e=0;e<o.length;e++){var c=o[e];let t=S(c.loudness_start),r=S(c.loudness_max),i=c.start+c.loudness_max_time;var d=c.pitches;let a=i-u,n=i+u;var m=s.map(e=>{var t=R(e,e=>e,a),r=R(e,e=>e,n);return e.slice(t,r).map(e=>Math.exp(-Math.pow((e-i)/.4,2))).reduce((e,t)=>e+t,0)+.2}),h=Math.max(...m);for(let e=0;e<m.length;e++)m[e]/=h;var g=Array(l);for(let t=0;t<m.length;t++){var y=A(t,0,m.length-1,.2,.6);for(let e=0;e<12;e++){var v=C([...m.entries()],e=>e[0],e=>e[1],k,t+e/12),p=d.reduce((e,t)=>e+t,0)/d.length,p=d[e]*y+p*(1-y);g[12*t+e]=v*p}}if(f.push([c.start,...g.map(e=>e*t)]),f.push([i,...g.map(e=>e*r)]),e==o.length-1){let t=S(c.loudness_end);f.push([c.start+c.duration,...g.map(e=>e*t)])}}var n=Array(l).fill(0).map(e=>Array(f.length));for(let a=0;a<l;a++){let t=0,r={x:0,y:0},i={x:0,y:0};for(let e=0;e<f.length;e++){var x,E,b,T={x:f[e][0],y:f[e][a+1]};i.x+i.y/.4<T.x+T.y/.4&&(i.x!==r.x&&(x=(T.y-r.y)/(T.x-r.x),E=r.y-x*r.x,b=(i.y- -.4*i.x-E)/(x+.4),n[a][t]={x:b,y:x*b+E},t++),i=T,n[a][t]=T,t++),r=T}n[a].length=t}return n},[e.audioAnalysis]),i=(0,w.useCallback)(e=>e?{isError:!1}:(t("Error: 2D rendering is not supported",2),{isError:!0}),[]),a=(0,w.useCallback)((e,t)=>{t.isError},[]),n=(0,w.useCallback)((t,r,e)=>{if(!e.isError&&t){var i=Spicetify.Player.getProgress()/1e3,a=(t.clearRect(0,0,t.canvas.width,t.canvas.height),t.fillStyle=r.themeColor.toCSS(Spicetify.Color.CSSFormat.HEX),r.spectrumData.length),n=t.canvas.width/a*.7,o=(t.canvas.width-n*a)/(a+1);for(let e=0;e<a;e++){var s=C(r.spectrumData[e],e=>e.x,e=>e.y,e=>e,i);t.fillRect(o*(e+1)+n*e,t.canvas.height-s*t.canvas.height,n,s*t.canvas.height)}}},[]);return w.default.createElement(s,{isEnabled:e.isEnabled,data:{themeColor:e.themeColor,spectrumData:r},contextType:"2d",onInit:i,onResize:a,onRender:n,style:{width:"100%",height:"100%"}})}},{id:"debug",name:"DEBUG",renderer:function(e){let t=(0,x.useContext)(y);var r=(0,x.useMemo)(()=>e.audioAnalysis?e.audioAnalysis.bars.reduce((e,t)=>e+t.duration,0)/e.audioAnalysis.bars.length:1,[e.audioAnalysis]),i=(0,x.useMemo)(()=>e.audioAnalysis?de(e.audioAnalysis.track.rhythmstring):null,[e.audioAnalysis]),a=(0,x.useCallback)(e=>e?{isError:!1}:(t("Error: 2D rendering is not supported",2),{isError:!0}),[]),n=(0,x.useCallback)((e,t)=>{t.isError},[]),o=(0,x.useCallback)((i,a,n)=>{if(!n.isError&&i&&a.audioAnalysis&&a.rhythmString){i.clearRect(0,0,i.canvas.width,i.canvas.height);n=Spicetify.Player.getProgress()/1e3;let r={start:n-me[0]*a.barDuration,end:n+me[1]*a.barDuration,current:n};var o,s=(e,t)=>{i.save(),i.beginPath(),i.rect(t.x,t.y,t.width,t.height),i.clip(),e.render(i,{analysis:a.audioAnalysis,rhythm:a.rhythmString},r,t),i.restore()};for(o of he)"background"===o.layer&&s(o,{x:30,y:0,width:i.canvas.width-20-10,height:i.canvas.height});var u,l,f,c,d=he.filter(e=>"content"===e.layer),m=i.canvas.height-20*(d.length-1),h=d.reduce((e,t)=>e+t.height,0);let e=0,t=0;for(u of d){var g=A(e,0,h,0,m)+20*t,y=A(e+u.height,0,h,0,m)+20*t;e+=u.height,t++,s(u,{x:30,y:g,width:i.canvas.width-20-10,height:y-g}),l=u.name,f=y-(g=g),i.save(),i.font="20px sans-serif",i.textAlign="center",i.fillStyle="white",i.rotate(3*Math.PI/2),i.fillText(l,-(g+f/2),20,f),i.restore(),t<d.length&&(i.lineWidth=1,i.strokeStyle="#AAAAAA",i.beginPath(),i.moveTo(10,y+10),i.lineTo(i.canvas.width-10,y+10),i.stroke())}for(c of he)"overlay"===c.layer&&s(c,{x:30,y:0,width:i.canvas.width-20-10,height:i.canvas.height})}},[]);return x.default.createElement(s,{isEnabled:e.isEnabled,data:{audioAnalysis:e.audioAnalysis,rhythmString:i,barDuration:r},contextType:"2d",onInit:a,onResize:n,onRender:o,style:{width:"100%",height:"100%"}})}}];function Ee(e){let[t,r]=(0,m.useState)(e.initialRenderer||"ncs");var i=xe.find(e=>e.id===t)?.renderer;let[a,n]=(0,m.useState)({state:"loading"}),[o,s]=(0,m.useState)({themeColor:Spicetify.Color.fromHex("#535353")}),u=(0,m.useCallback)(t=>n(e=>"error"===e.state&&2===e.errorData.recovery?e:t),[]),l=(0,m.useCallback)((e,t)=>{u({state:"error",errorData:{message:e,recovery:t}})},[]),f="error"===a.state&&2===a.errorData.recovery,c=(0,m.useMemo)(()=>new M,[]),d=(0,m.useCallback)(async e=>{e=e?.item;if(e){var t=Spicetify.URI.fromString(e.uri);if(t.type!==Spicetify.URI.Type.TRACK)l("Error: The type of track you're listening to is currently not supported",1);else{u({state:"loading"});var r,i,t=`https://spclient.wg.spotify.com/audio-attributes/v1/audio-analysis/${t.id}?format=json`,[t,e]=await Promise.all([Spicetify.CosmosAsync.get(t).catch(e=>console.error("[Visualizer]",e)),c.fetch(23,e.metadata.image_url).catch(e=>console.error("[Visualizer] Could not load extracted color metadata. Status: "+z[e])).then(e=>{var t;return e&&0!==e.value.length&&"type.googleapis.com/spotify.context_track_color.ColorResult"===e.typeUrl?(e=e.value,t=Q,e=new DataView(e.buffer,e.byteOffset,e.byteLength),t=t[1](e).colorLight?.rgb?.toString(16).padStart(6,"0")??"535353",Spicetify.Color.fromHex("#"+t)):Spicetify.Color.fromHex("#535353")})]);if(t)if("object"!=typeof t)l(`Invalid audio analysis data (${t})`,0);else{if(!("track"in t&&"segments"in t))return r="error"in t&&t.error?t.error:"message"in t&&t.message?t.message:"Unknown error",null!==(i="code"in t?t.code:null)?void l(`Error ${i}: `+r,0):void l(r,0);s({audioAnalysis:t,themeColor:e}),u({state:"running"})}else l("Error: The audio analysis could not be loaded, please check your internet connection",0)}}else l("Start playing a song to see the visualization!",1)},[c]);return(0,m.useEffect)(()=>{if(!f){let e=e=>{e?.data&&d(e.data)};return Spicetify.Player.addEventListener("songchange",e),d(Spicetify.Player.data),()=>Spicetify.Player.removeEventListener("songchange",e)}},[f,d]),m.default.createElement("div",{className:"visualizer-container"},!f&&m.default.createElement(m.default.Fragment,null,m.default.createElement(y.Provider,{value:l},i&&m.default.createElement(i,{isEnabled:"running"===a.state,audioAnalysis:o.audioAnalysis,themeColor:o.themeColor})),e.isSecondaryWindow||m.default.createElement(ve,{className:h.main_menu_button,renderers:xe,onOpenWindow:()=>{(e=>{try{let r=window.open();return r?(document.querySelectorAll("link[rel=stylesheet]").forEach(e=>{var t=r.document.createElement("link");t.setAttribute("rel","stylesheet"),t.setAttribute("href",e.href),r.document.head.appendChild(t)}),document.querySelectorAll("style").forEach(e=>{var t=r.document.createElement("style");t.innerText=e.innerText,r.document.head.appendChild(t)}),r.document.documentElement.className=document.documentElement.className,r.document.body.className=document.body.className,Spicetify.ReactDOM.render(pe.default.createElement(Ee,{isSecondaryWindow:!0,initialRenderer:e}),r.document.body),1):void 0}catch{}})(t)||Spicetify.showNotification("Failed to open a new window",!0)},onSelectRenderer:e=>r(e)})),"loading"===a.state?m.default.createElement(B,null):"error"===a.state?m.default.createElement("div",{className:h.error_container},m.default.createElement("div",{className:h.error_message},a.errorData.message),0===a.errorData.recovery&&m.default.createElement(Spicetify.ReactComponent.ButtonPrimary,{onClick:()=>d(Spicetify.Player.data)},"Try again")):null)}var be=r(i());return f=O,I(n({},"__esModule",{value:!0}),f)})();let render=()=>visualizer.default();