var visualizer=(()=>{var e,t,o=Object.create,a=Object.defineProperty,n=Object.getOwnPropertyDescriptor,u=Object.getOwnPropertyNames,i=Object.getPrototypeOf,s=Object.prototype.hasOwnProperty,f=(t,r,o,i)=>{if(r&&"object"==typeof r||"function"==typeof r)for(let e of u(r))s.call(t,e)||e===o||a(t,e,{get:()=>r[e],enumerable:!(i=n(r,e))||i.enumerable});return t},r=(e,t,r)=>(r=null!=e?o(i(e)):{},f(!t&&e&&e.__esModule?r:a(r,"default",{value:e,enumerable:!0}),e)),l=(e={"external-global-plugin:react"(e,t){t.exports=Spicetify.React}},function(){return t||(0,e[u(e)[0]])((t={exports:{}}).exports,t),t.exports}),c={},d=(((e,t)=>{for(var r in t)a(e,r,{get:t[r],enumerable:!0})})(c,{default:()=>function(){return w.default.createElement(B,null)}}),r(l())),m={unavailable_message:"app-module__unavailable_message___HYGlM_visualizer"},g=r(l());function p(){return g.default.createElement("svg",{width:"100px",height:"100px",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid"},g.default.createElement("circle",{cx:"50",cy:"50",r:"0",fill:"none",stroke:"currentColor","stroke-width":"2"},g.default.createElement("animate",{attributeName:"r",repeatCount:"indefinite",dur:"1s",values:"0;40",keyTimes:"0;1",keySplines:"0 0.2 0.8 1",calcMode:"spline",begin:"0s"}),g.default.createElement("animate",{attributeName:"opacity",repeatCount:"indefinite",dur:"1s",values:"1;0",keyTimes:"0;1",keySplines:"0.2 0 0.8 1",calcMode:"spline",begin:"0s"})),g.default.createElement("circle",{cx:"50",cy:"50",r:"0",fill:"none",stroke:"currentColor","stroke-width":"2"},g.default.createElement("animate",{attributeName:"r",repeatCount:"indefinite",dur:"1s",values:"0;40",keyTimes:"0;1",keySplines:"0 0.2 0.8 1",calcMode:"spline",begin:"-0.5s"}),g.default.createElement("animate",{attributeName:"opacity",repeatCount:"indefinite",dur:"1s",values:"1;0",keyTimes:"0;1",keySplines:"0.2 0 0.8 1",calcMode:"spline",begin:"-0.5s"})))}var v=r(l()),E=r(l());function x(o){let{contextType:i,onInit:a,onResize:n,onRender:u,style:e,data:s,isEnabled:t}=o,f=(0,E.useRef)(null),[l,c]=(0,E.useState)(null),d=(0,E.useCallback)(e=>{var t=Math.round(e.clientWidth*window.devicePixelRatio),r=Math.round(e.clientHeight*window.devicePixelRatio),{width:t,height:r}=o.sizeConstraint?.(t,r)??{width:t,height:r};e.width===t&&e.height===r||(e.width=t,e.height=r)},[]);return(0,E.useEffect)(()=>{if(a){var e,t,r=f.current;if(r)return e=r.getContext(i),t=a(e),d(r),n(e,t),c(t),()=>c(null)}},[i,a]),(0,E.useEffect)(()=>{if(t&&l&&u){var e=f.current;if(e){let t=e.getContext(i),r=0,o=e=>{l&&(u(t,s,l,e),r=requestAnimationFrame(o))};return r=requestAnimationFrame(o),()=>{r&&cancelAnimationFrame(r)}}}},[i,u,s,l,t]),(0,E.useEffect)(()=>{if(f.current){let e=new ResizeObserver(()=>{var e=f.current;e&&(d(e),e=e.getContext(i))&&l&&n(e,l)});return e.observe(f.current),()=>e.disconnect()}},[i,n,l]),E.default.createElement("canvas",{ref:f,style:{...e||{},...t?{}:{visibility:"hidden"}}})}function h(e,t,r){let o=0,i=e.length;for(;1<i-o;){var a=Math.floor((i+o)/2);t(e[a],a)<=r?o=a:i=a}return o}function R(e){return Math.min(Math.max(Math.pow(10,e/20),0),1)}function T(e,t,r,o,i){return e=(e=(e-t)/(r-t))*(i-o)+o}function b(e,t){return-.5*(e.x-t.x)*(e.y+t.y)}function y(o,e,t){if(0==t)return d=e=>e.y,f=e=>e,s=h(u=o,a=e=>e.x,r=e),i=u[s],u.length-2<s?d(i,s):(u=u[s+1],r=r,n=a(i,s),a=a(u,s+1),f=f,i=d(i,s),d=d(u,s+1),r=(r=f(r=(r-n)/(a-n)))*(d-i)+i);var r,i,a,n,u=e-t/2,s=e+t/2,f=h(o,e=>e.x,u),l=h(o,e=>e.x,s);let c=0;if(f==l)return a=o[f],o.length-2<f?a.y:(T(u,a.x,(n=o[f+1]).x,a.y,n.y)+T(s,a.x,n.x,a.y,n.y))/2;{let t=o[f],r=o[f+1];var d={x:u,y:T(u,t.x,r.x,t.y,r.y)};c=b(d,r);for(let e=f+1;e<l;e++)t=r,r=o[e+1],c+=b(t,r);t=r,o.length-2<l?c+=t.y*(s-t.x):(r=o[l+1],d={x:s,y:T(s,t.x,r.x,t.y,r.y)},c+=b(t,d))}return c/t}var z=`#version 300 es

in vec2 inPosition;
out vec2 fragUV;

void main() {
    gl_Position = vec4(inPosition, 0.0, 1.0);
    fragUV = (inPosition + 1.0) / 2.0;
}
`,V=`#version 300 es
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
`,G=`#version 300 es

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
`,X=`#version 300 es
precision highp float;

in vec2 fragUV;
in float fragDotRadiusPX;
out float outColor;

void main() {
    float t = clamp((1.0 - length(fragUV)) * fragDotRadiusPX, 0.0, 1.0);
    outColor = t;
}
`,M=`#version 300 es

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
`,k=`#version 300 es
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
`,Y=`#version 300 es

uniform vec3 uOutputColor;
in vec2 inPosition;

out vec2 fragUV;
out vec3 fragOutputColor;

void main() {
    gl_Position = vec4(inPosition, 0.0, 1.0);
    fragUV = (inPosition + 1.0) / 2.0;
    fragOutputColor = uOutputColor;
}
`,q=`#version 300 es
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
`;function N(w){var e=(0,v.useMemo)(()=>{if(!w.audioAnalysis)return[{x:0,y:0}];var e=w.audioAnalysis.segments,t=e.flatMap(e=>e.loudness_max_time?[{x:e.start,y:R(e.loudness_start)},{x:e.start+e.loudness_max_time,y:R(e.loudness_max)}]:[{x:e.start,y:R(e.loudness_start)}]);if(e.length){t[0].accumulatedIntegral=0;for(let e=1;e<t.length;e++){var r=t[e-1],o=t[e];o.accumulatedIntegral=(r.accumulatedIntegral??0)+b(r,o)}e=e[e.length-1];t.push({x:e.start+e.duration,y:R(e.loudness_end)})}return t},[w.audioAnalysis]),t=w.audioAnalysis?.meta.timestamp??0,r=(0,v.useCallback)(i=>{if(!i)return w.onError("Error: WebGL2 is not supported"),{isError:!0};if(!i.getExtension("EXT_color_buffer_float"))return w.onError("Error: Rendering to floating-point textures is not supported"),{isError:!0};var e=(e,t,r)=>{e=i.createShader(e);return i.shaderSource(e,t),i.compileShader(e),i.getShaderParameter(e,i.COMPILE_STATUS)||i.isContextLost()?e:(t=`Error: Failed to compile ${r} shader`,r=i.getShaderInfoLog(e),console.error(t,r),w.onError(t),null)},t=(e,t,r)=>{var o=i.createProgram();return i.attachShader(o,e),i.attachShader(o,t),i.linkProgram(o),i.getProgramParameter(o,i.LINK_STATUS)||i.isContextLost()?o:(e=`Error: Failed to link ${r} shader`,t=i.getProgramInfoLog(o),console.error(e,t),w.onError(e),null)},r=e=>{var t=i.createFramebuffer(),r=(i.bindFramebuffer(i.FRAMEBUFFER,t),i.createTexture());return i.bindTexture(i.TEXTURE_2D,r),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,e),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,e),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,r,0),{framebuffer:t,texture:r}},o=e(i.VERTEX_SHADER,z,"particle vertex");if(!o)return{isError:!0};var a=e(i.FRAGMENT_SHADER,V,"particle fragment");if(!a)return{isError:!0};var n,u,s,f,l,c,d,m,g,p,v,E,x,h,R,T,b,y,A,C,S,L,_,D,F,U,N,P,I,B,O,o=t(o,a,"particle");if(o)return a=i.getAttribLocation(o,"inPosition"),n=i.getUniformLocation(o,"uNoiseOffset"),u=i.getUniformLocation(o,"uAmplitude"),s=i.getUniformLocation(o,"uSeed"),f=i.getUniformLocation(o,"uDotSpacing"),l=i.getUniformLocation(o,"uDotOffset"),c=i.getUniformLocation(o,"uSphereRadius"),d=i.getUniformLocation(o,"uFeather"),m=i.getUniformLocation(o,"uNoiseFrequency"),g=i.getUniformLocation(o,"uNoiseAmplitude"),(p=e(i.VERTEX_SHADER,G,"dot vertex"))&&(v=e(i.FRAGMENT_SHADER,X,"dot fragment"))&&(p=t(p,v,"dot"))&&(v=i.getAttribLocation(p,"inPosition"),E=i.getUniformLocation(p,"uDotCount"),x=i.getUniformLocation(p,"uDotRadius"),h=i.getUniformLocation(p,"uDotRadiusPX"),R=i.getUniformLocation(p,"uParticleTexture"),T=e(i.VERTEX_SHADER,M,"blur vertex"))&&(b=e(i.FRAGMENT_SHADER,k,"blur fragment"))&&(T=t(T,b,"blur"))&&(b=i.getAttribLocation(T,"inPosition"),y=i.getUniformLocation(T,"uBlurRadius"),A=i.getUniformLocation(T,"uBlurDirection"),C=i.getUniformLocation(T,"uInputTexture"),S=e(i.VERTEX_SHADER,Y,"finalize vertex"))&&(e=e(i.FRAGMENT_SHADER,q,"finalize fragment"))&&(t=t(S,e,"finalize"))?(S=i.getAttribLocation(t,"inPosition"),e=i.getUniformLocation(t,"uOutputColor"),L=i.getUniformLocation(t,"uBlurredTexture"),_=i.getUniformLocation(t,"uOriginalTexture"),{framebuffer:D,texture:F}=r(i.NEAREST),{framebuffer:U,texture:N}=r(i.NEAREST),{framebuffer:P,texture:I}=r(i.LINEAR),{framebuffer:r,texture:B}=r(i.NEAREST),O=i.createBuffer(),i.bindBuffer(i.ARRAY_BUFFER,O),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),i.STATIC_DRAW),i.enable(i.BLEND),i.blendEquation(i.MAX),{isError:!1,particleShader:o,dotShader:p,blurShader:T,finalizeShader:t,viewportSize:0,particleTextureSize:0,inPositionLoc:a,inPositionLocDot:v,inPositionLocBlur:b,inPositionLocFinalize:S,uNoiseOffsetLoc:n,uAmplitudeLoc:u,uSeedLoc:s,uDotSpacingLoc:f,uDotOffsetLoc:l,uSphereRadiusLoc:c,uFeatherLoc:d,uNoiseFrequencyLoc:m,uNoiseAmplitudeLoc:g,uDotCountLoc:E,uDotRadiusLoc:x,uDotRadiusPXLoc:h,uParticleTextureLoc:R,uBlurRadiusLoc:y,uBlurDirectionLoc:A,uBlurInputTextureLoc:C,uOutputColorLoc:e,uBlurredTextureLoc:L,uOriginalTextureLoc:_,quadBuffer:O,particleFramebuffer:D,particleTexture:F,dotFramebuffer:U,dotTexture:N,blurXFramebuffer:P,blurXTexture:I,blurYFramebuffer:r,blurYTexture:B}):{isError:!0};return{isError:!0}},[]),o=(0,v.useCallback)((e,t)=>{!t.isError&&e&&(t.viewportSize=Math.min(e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.bindTexture(e.TEXTURE_2D,t.dotTexture),e.texImage2D(e.TEXTURE_2D,0,e.R8,t.viewportSize,t.viewportSize,0,e.RED,e.UNSIGNED_BYTE,null),e.bindTexture(e.TEXTURE_2D,t.blurXTexture),e.texImage2D(e.TEXTURE_2D,0,e.R8,t.viewportSize,t.viewportSize,0,e.RED,e.UNSIGNED_BYTE,null),e.bindTexture(e.TEXTURE_2D,t.blurYTexture),e.texImage2D(e.TEXTURE_2D,0,e.R8,t.viewportSize,t.viewportSize,0,e.RED,e.UNSIGNED_BYTE,null))},[]),i=(0,v.useCallback)((e,t,r)=>{var o,i,a,n,u,s,f,l;!r.isError&&e&&(o=75*(.5*(u=Spicetify.Player.getProgress()/1e3)+(n=t.amplitudeCurve,o=h(n,e=>e.x,i=u),a=n[o],n.length<=o+1?(a.accumulatedIntegral??0)+a.y*(i-a.x):(n={x:i,y:T(i,a.x,(i=n[o+1]).x,a.y,i.y)},(a.accumulatedIntegral??0)+b(a,n))))*.01,i=y(t.amplitudeCurve,u,.15),a=t.seed,s=.5*(u=.9/(n=322))*r.viewportSize,f=T(i,0,1,.675,.9),l=Math.pow(i+3,2)*(45/1568),r.particleTextureSize!==n&&(r.particleTextureSize=n,e.bindTexture(e.TEXTURE_2D,r.particleTexture),e.texImage2D(e.TEXTURE_2D,0,e.RG32F,n,n,0,e.RG,e.FLOAT,null)),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,r.particleFramebuffer),e.viewport(0,0,n,n),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(r.particleShader),e.uniform1f(r.uNoiseOffsetLoc,o),e.uniform1f(r.uAmplitudeLoc,i),e.uniform1i(r.uSeedLoc,a),e.uniform1f(r.uDotSpacingLoc,.9),e.uniform1f(r.uDotOffsetLoc,-.45),e.uniform1f(r.uSphereRadiusLoc,f),e.uniform1f(r.uFeatherLoc,l),e.uniform1f(r.uNoiseFrequencyLoc,4),e.uniform1f(r.uNoiseAmplitudeLoc,.32*.9),e.bindBuffer(e.ARRAY_BUFFER,r.quadBuffer),e.enableVertexAttribArray(r.inPositionLoc),e.vertexAttribPointer(r.inPositionLoc,2,e.FLOAT,!1,0,0),e.drawArrays(e.TRIANGLE_FAN,0,4),e.enable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,r.dotFramebuffer),e.viewport(0,0,r.viewportSize,r.viewportSize),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(r.dotShader),e.uniform1i(r.uDotCountLoc,n),e.uniform1f(r.uDotRadiusLoc,u),e.uniform1f(r.uDotRadiusPXLoc,s),e.uniform1i(r.uParticleTextureLoc,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,r.particleTexture),e.bindBuffer(e.ARRAY_BUFFER,r.quadBuffer),e.enableVertexAttribArray(r.inPositionLocDot),e.vertexAttribPointer(r.inPositionLocDot,2,e.FLOAT,!1,0,0),e.drawArraysInstanced(e.TRIANGLE_FAN,0,4,n*n),e.bindFramebuffer(e.FRAMEBUFFER,r.blurXFramebuffer),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(r.blurShader),e.uniform1f(r.uBlurRadiusLoc,.01*r.viewportSize),e.uniform2f(r.uBlurDirectionLoc,1/r.viewportSize,0),e.uniform1i(r.uBlurInputTextureLoc,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,r.dotTexture),e.bindBuffer(e.ARRAY_BUFFER,r.quadBuffer),e.enableVertexAttribArray(r.inPositionLocBlur),e.vertexAttribPointer(r.inPositionLocBlur,2,e.FLOAT,!1,0,0),e.drawArrays(e.TRIANGLE_FAN,0,4),e.bindFramebuffer(e.FRAMEBUFFER,r.blurYFramebuffer),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.uniform2f(r.uBlurDirectionLoc,0,1/r.viewportSize),e.bindTexture(e.TEXTURE_2D,r.blurXTexture),e.drawArrays(e.TRIANGLE_FAN,0,4),e.bindFramebuffer(e.FRAMEBUFFER,null),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(r.finalizeShader),e.uniform3f(r.uOutputColorLoc,t.themeColor.rgb.r/255,t.themeColor.rgb.g/255,t.themeColor.rgb.b/255),e.uniform1i(r.uBlurredTextureLoc,0),e.uniform1i(r.uOriginalTextureLoc,1),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,r.blurYTexture),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,r.dotTexture),e.bindBuffer(e.ARRAY_BUFFER,r.quadBuffer),e.enableVertexAttribArray(r.inPositionLocFinalize),e.vertexAttribPointer(r.inPositionLocFinalize,2,e.FLOAT,!1,0,0),e.drawArrays(e.TRIANGLE_FAN,0,4))},[]);return v.default.createElement(x,{isEnabled:w.isEnabled,data:{themeColor:w.themeColor,seed:t,amplitudeCurve:e},contextType:"webgl2",onInit:r,onResize:o,onRender:i,style:{width:"100%",height:"100%",objectFit:"contain"},sizeConstraint:(e,t)=>{e=Math.min(e,t);return{width:e,height:e}}})}var A=(e=>(e[e.UNKNOWN=0]="UNKNOWN",e[e.OK=1]="OK",e[e.NOT_RESOLVED=2]="NOT_RESOLVED",e[e.NOT_FOUND=3]="NOT_FOUND",e[e.UNAVAILABLE_FOR_LEGAL_REASONS=4]="UNAVAILABLE_FOR_LEGAL_REASONS",e))(A||{}),P=class{constructor(){let t=(window.webpackChunkclient_web??window.webpackChunkopen).push([[Symbol()],{},e=>e]);var e=Object.keys(t.m).map(e=>t(e)).filter(e=>"object"==typeof e).map(e=>{try{return Object.values(e)}catch{}}).flat(),r=e.filter(e=>e&&"function"==typeof e&&"SERVICE_ID"in e&&"spotify.mdata_esperanto.proto.MetadataService"===e.SERVICE_ID),e=e.filter(e=>e&&"function"==typeof e&&e.toString().includes("executeEsperantoCall")&&e.toString().includes("cancelEsperantoCall"));1===r.length&&1===e.length&&(this.serviceDescriptor=r[0],this.service=new this.serviceDescriptor(e[0]()))}fetch(e,t){return new Promise((r,o)=>{let i=this.service.observe(this.serviceDescriptor.METHODS.observe.requestType.fromPartial({extensionQuery:[{entityUri:t,extensionKind:e}]}),e=>{var t;e.pendingResponse||(i.cancel(),1===e.extensionResult[0].status?(t=e.extensionResult[0].extensionData,r(t)):(t=e.extensionResult[0].details.cacheStatus,o(t)))})})}},C=class{constructor(e){e instanceof DataView&&(e=new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),this.buffer=e,this.offset=0}getVarIntView(){let e=this.offset;for(;e<this.buffer.length-1&&128&this.buffer[e];)e++;return e++,this.getView(e-this.offset)}getVarInt(){if(this.isExhausted())return 0n;let e=0n,t=0n;for(var r;r=BigInt(this.buffer[this.offset++]),e|=(0x7fn&r)<<t,t+=7n,0x80n&r&&!this.isExhausted(););return e}getArray(e){var e=Math.min(e,this.buffer.length-this.offset),t=this.buffer.slice(this.offset,this.offset+e);return this.offset+=e,t}getView(e){var e=Math.min(e,this.buffer.length-this.offset),t=new DataView(this.buffer.buffer,this.buffer.byteOffset+this.offset,e);return this.offset+=e,t}has(e){return this.buffer.length-this.offset>=e}isExhausted(){return!this.has(1)}};function S(e,t){return e&1n<<BigInt(8*t-1)?e-(1n<<BigInt(8*t)):e}function L(t,r){return[t[0],e=>r(t[1](e))]}var _=[0,e=>new C(e).getVarInt()],I=L(_,e=>!!e),D=L(_,Number);L(_,e=>Number(S(e,4))),L(_,e=>S(e,8));function F(e,t){return{id:e,value:t}}function U(t){return[3,e=>{for(var r=new C(e),o={},i=Object.entries(t).map(([e,t])=>({name:e,...t}));!r.isExhausted();){let t=Number(r.getVarInt());var a=i.find(e=>e.id==t>>3);if(!a||!function(e,t){switch(t){case 0:return 0==(7&e);case 1:return 5==(7&e);case 2:return 1==(7&e);case 3:return 2==(7&e)}}(t,a.value[0]))break;var n=a.value,[u,s]=function(e,t){switch(t[0]){case 1:return e.has(4)?[!0,t[1](e.getView(4))]:[!1,void 0];case 2:return e.has(8)?[!0,t[1](e.getView(8))]:[!1,void 0];case 0:return[!0,t[1](e.getVarIntView())];case 3:var r=Number(e.getVarInt());return[!0,t[1](e.getView(r))]}}(r,n);if(!u)break;n[2]?(o[a.name]||(o[a.name]=[]),o[a.name].push(s)):o[a.name]=s}return o}]}var _=U({rgb:F(1,D),isFallback:F(2,I)}),O=U({colorRaw:F(1,_),colorLight:F(2,_),colorDark:F(3,_)});function B(){let[e,i]=(0,d.useState)(0),[t,r]=(0,d.useState)(""),[o,a]=(0,d.useState)({themeColor:Spicetify.Color.fromHex("#535353")}),n=(0,d.useMemo)(()=>new P,[]),u=((0,d.useEffect)(()=>{let t=async e=>{e=e?.item;if(e){var t=Spicetify.URI.fromString(e.uri);if(t.type!==Spicetify.URI.Type.TRACK)i(3);else{i(0);var r,o,t=`https://spclient.wg.spotify.com/audio-attributes/v1/audio-analysis/${t.id}?format=json`,[t,e]=await Promise.all([Spicetify.CosmosAsync.get(t).catch(console.error),n.fetch(23,e.metadata.image_url).catch(e=>console.error("Could not load extracted color metadata. Status: "+A[e])).then(e=>{var t;return e&&0!==e.value.length&&"type.googleapis.com/spotify.context_track_color.ColorResult"===e.typeUrl?(e=e.value,t=O,e=new DataView(e.buffer,e.byteOffset,e.byteLength),t=t[1](e).colorLight?.rgb?.toString(16).padStart(6,"0")??"535353",Spicetify.Color.fromHex("#"+t)):Spicetify.Color.fromHex("#535353")})]);if(console.log("[Visualizer] Audio Analysis:",t),t)if("object"!=typeof t)u(`Invalid audio analysis data (${t})`);else{if(!("track"in t&&"segments"in t))return r="message"in t?t.message:"error"in t?t.error:"Unknown error",null!==(o="code"in t?t.code:null)?void u(`Error ${o}: `+r):void u(r);a({audioAnalysis:t,themeColor:e}),i(1)}else i(4)}}else i(2)},e=e=>{e?.data&&t(e.data)};return Spicetify.Player.addEventListener("songchange",e),t(Spicetify.Player.data),()=>Spicetify.Player.removeEventListener("songchange",e)},[]),(0,d.useCallback)(e=>{r(e),i(5)},[]));return d.default.createElement("div",{className:"visualizer-container"},d.default.createElement(N,{isEnabled:1==e,onError:u,audioAnalysis:o.audioAnalysis,themeColor:o.themeColor}),0==e?d.default.createElement(p,null):2==e?d.default.createElement("div",{className:m.unavailable_message},"Start playing a song to see the visualization!"):3==e?d.default.createElement("div",{className:m.unavailable_message},"Error: The type of track you're listening to is currently not supported"):4==e?d.default.createElement("div",{className:m.unavailable_message},"Error: The audio analysis could not be loaded, please check your internet connection"):5==e?d.default.createElement("div",{className:m.unavailable_message},t):null)}var w=r(l());return D=c,f(a({},"__esModule",{value:!0}),D)})();let render=()=>visualizer.default();