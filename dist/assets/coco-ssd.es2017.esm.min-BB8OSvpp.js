function uo(t,e){return e.forEach(function(n){n&&typeof n!="string"&&!Array.isArray(n)&&Object.keys(n).forEach(function(r){if(r!=="default"&&!(r in t)){var s=Object.getOwnPropertyDescriptor(n,r);Object.defineProperty(t,r,s.get?s:{enumerable:!0,get:function(){return n[r]}})}})}),Object.freeze(t)}var ht=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function lo(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function cs(t){if(t.__esModule)return t;var e=t.default;if(typeof e=="function"){var n=function r(){return this instanceof r?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};n.prototype=e.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(t).forEach(function(r){var s=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(n,r,s.get?s:{enumerable:!0,get:function(){return t[r]}})}),n}var Dr={exports:{}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Uh=1e-7,Gh=1e-4;class jh{constructor(e,n){this.backend=e,this.dataMover=n,this.data=new WeakMap,this.dataIdsCount=0}get(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)}set(e,n){this.dataIdsCount++,this.data.set(e,n)}has(e){return this.data.has(e)}delete(e){return this.dataIdsCount--,this.data.delete(e)}numDataIds(){return this.dataIdsCount}}class co{refCount(e){return me("refCount")}incRef(e){return me("incRef")}timerAvailable(){return!0}time(e){return me("time")}read(e){return me("read")}readSync(e){return me("readSync")}readToGPU(e,n){return me("readToGPU")}numDataIds(){return me("numDataIds")}disposeData(e,n){return me("disposeData")}write(e,n,r){return me("write")}move(e,n,r,s,a){return me("move")}createTensorFromGPUData(e,n,r){return me("createTensorFromGPUData")}memory(){return me("memory")}floatPrecision(){return me("floatPrecision")}epsilon(){return this.floatPrecision()===32?Uh:Gh}dispose(){return me("dispose")}}function me(t){throw new Error(`'${t}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function po(t){let e=t.length,n=0;for(;e>0;)n=Math.random()*e|0,e--,Gn(t,e,n)}function Hh(t,e){if(t.length!==e.length)throw new Error(`Array sizes must match to be shuffled together First array length was ${t.length}Second array length was ${e.length}`);let n=t.length,r=0;for(;n>0;)r=Math.random()*n|0,n--,Gn(t,n,r),Gn(e,n,r)}function pn(t,e,n){return Math.max(t,Math.min(e,n))}function Kh(t){return t%2===0?t:t+1}function Gn(t,e,n){const r=t[e];t[e]=t[n],t[n]=r}function Xh(t){let e=0;for(let n=0;n<t.length;n++)e+=t[n];return e}function Zh(t,e){const n=Math.random();return e*n+(1-n)*t}function Jh(t,e){let n=0;for(let r=0;r<t.length;r++){const s=Number(t[r])-Number(e[r]);n+=s*s}return n}function g(t,e){if(!t)throw new Error(typeof e=="string"?e:e())}function fe(t,e,n=""){g(Ce(t,e),()=>n+` Shapes ${t} and ${e} must match`)}function Ft(t){g(t!=null,()=>"The input to the tensor constructor must be a non-null value.")}function q(t){if(t.length===0)return 1;let e=t[0];for(let n=1;n<t.length;n++)e*=t[n];return e}function Yh(t){return t.length===0}function ho(t,e){if(t===e)return!0;if(t==null||e==null||t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n]!==null&&e[n]!==null&&t[n]!==e[n])return!1;return!0}function Ce(t,e){if(t===e)return!0;if(t==null||e==null||t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n]!==e[n])return!1;return!0}function Gt(t){return t%1===0}function Qh(t){if(Math.tanh!=null)return Math.tanh(t);if(t===1/0)return 1;if(t===-1/0)return-1;{const e=Math.exp(2*t);return(e-1)/(e+1)}}function ef(t){const e=Math.ceil(Math.sqrt(t));return[e,Math.ceil(t/e)]}function tf(t){const e=new Uint32Array(t);for(let n=0;n<t;++n)e[n]=n;return po(e),e}function ln(t,e){return e<=t.length?t:t+" ".repeat(e-t.length)}function nf(t,e=s=>0,n,r){return new Promise((s,a)=>{let o=0;const i=()=>{if(t()){s();return}o++;const u=e(o);if(n!=null&&o>=n){a();return}r!=null?r(i,u):setTimeout(i,u)};i()})}function rf(t,e){let n=1,r=-1;for(let a=0;a<t.length;++a)if(t[a]>=0)n*=t[a];else if(t[a]===-1){if(r!==-1)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${r} and dim ${a}`);r=a}else if(t[a]<0)throw Error(`Shapes can not be < 0. Found ${t[a]} at dim ${a}`);if(r===-1){if(e>0&&e!==n)throw Error(`Size(${e}) must match the product of shape ${t}`);return t}if(n===0)throw Error(`Cannot infer the missing size in [${t}] when there are 0 elements`);if(e%n!==0)throw Error(`The implicit shape can't be a fractional number. Got ${e} / ${n}`);const s=t.slice();return s[r]=e/n,s}function $n(t,e){const n=e.length;return t=t==null?e.map((r,s)=>s):[].concat(t),g(t.every(r=>r>=-n&&r<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${t}`),g(t.every(r=>Gt(r)),()=>`All values in axis param must be integers but got axis ${t}`),t.map(r=>r<0?n+r:r)}function fo(t,e){const n=[],r=[],s=e!=null&&Array.isArray(e)&&e.length===0,a=e==null||s?null:$n(e,t).sort();let o=0;for(let i=0;i<t.length;++i){if(a!=null){if(a[o]===i&&t[i]!==1)throw new Error(`Can't squeeze axis ${i} since its dim '${t[i]}' is not 1`);(a[o]==null||a[o]>i)&&t[i]===1&&(n.push(t[i]),r.push(i)),a[o]<=i&&o++}t[i]!==1&&(n.push(t[i]),r.push(i))}return{newShape:n,keptDims:r}}function mo(t,e){return ps(t,e)}function ps(t,e){let n=null;if(t==null||t==="float32")n=new Float32Array(e);else if(t==="int32")n=new Int32Array(e);else if(t==="bool")n=new Uint8Array(e);else if(t==="string")n=new Array(e);else throw new Error(`Unknown data type ${t}`);return n}function go(t,e){for(let n=0;n<t.length;n++){const r=t[n];if(isNaN(r)||!isFinite(r))throw Error(`A tensor of type ${e} being uploaded contains ${r}.`)}}function yo(t){return t==="bool"||t==="complex64"||t==="float32"||t==="int32"||t==="string"}function sf(t,e){return!(e==="complex64"||e==="float32"&&t!=="complex64"||e==="int32"&&t!=="float32"&&t!=="complex64"||e==="bool"&&t==="bool")}function jn(t){if(t==="float32"||t==="int32")return 4;if(t==="complex64")return 8;if(t==="bool")return 1;throw new Error(`Unknown dtype ${t}`)}function bo(t){if(t==null)return 0;let e=0;return t.forEach(n=>e+=n.length),e}function nt(t){return typeof t=="string"||t instanceof String}function wo(t){return typeof t=="boolean"}function No(t){return typeof t=="number"}function kn(t){return Array.isArray(t)?kn(t[0]):t instanceof Float32Array?"float32":t instanceof Int32Array||t instanceof Uint8Array||t instanceof Uint8ClampedArray?"int32":No(t)?"float32":nt(t)?"string":wo(t)?"bool":"float32"}function ot(t){return!!(t&&t.constructor&&t.call&&t.apply)}function Hn(t,e){for(let n=e;n<t;++n)if(t%n===0)return n;return t}function en(t){const e=t.length;if(e<2)return[];const n=new Array(e-1);n[e-2]=t[e-1];for(let r=e-3;r>=0;--r)n[r]=n[r+1]*t[r+1];return n}function So(t,e,n,r=!1){const s=new Array;if(e.length===1){const a=e[0]*(r?2:1);for(let o=0;o<a;o++)s[o]=n[t+o]}else{const a=e[0],o=e.slice(1),i=o.reduce((u,l)=>u*l)*(r?2:1);for(let u=0;u<a;u++)s[u]=So(t+u*i,o,n,r)}return s}function Et(t,e,n=!1){if(t.length===0)return e[0];const r=t.reduce((s,a)=>s*a)*(n?2:1);if(r===0)return[];if(r!==e.length)throw new Error(`[${t}] does not match the input size ${e.length}${n?" for a complex tensor":""}.`);return So(0,t,e,n)}function af(t,e){if(Array.isArray(t))return t;if(e==="float32")return t instanceof Float32Array?t:new Float32Array(t);if(e==="int32")return t instanceof Int32Array?t:new Int32Array(t);if(e==="bool"||e==="string")return Uint8Array.from(new Int32Array(t));throw new Error(`Unknown dtype ${e}`)}function hs(t,e){const n=or(t,e);for(let r=0;r<n.length;r++)n[r]=1;return n}function or(t,e){if(e==null||e==="float32"||e==="complex64")return new Float32Array(t);if(e==="int32")return new Int32Array(t);if(e==="bool")return new Uint8Array(t);throw new Error(`Unknown data type ${e}`)}function of(t,e){const n=t.reduce((r,s)=>r*s,1);if(e==null||e==="float32")return Et(t,new Float32Array(n));if(e==="int32")return Et(t,new Int32Array(n));if(e==="bool")return Et(t,new Uint8Array(n));throw new Error(`Unknown data type ${e}`)}function Se(t){t.forEach(e=>{g(Number.isInteger(e)&&e>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${t}].`)})}function uf(t,e,n){if(e===0)return 0;if(e===1)return t[0];let r=t[t.length-1];for(let s=0;s<t.length-1;++s)r+=n[s]*t[s];return r}function lf(t,e,n){if(e===0)return[];if(e===1)return[t];const r=new Array(e);for(let s=0;s<r.length-1;++s)r[s]=Math.floor(t/n[s]),t-=r[s]*n[s];return r[r.length-1]=t,r}function it(t){return t&&t.then&&typeof t.then=="function"}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Oa="tfjsflags";class To{constructor(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=cf,this.populateURLFlags()}setPlatform(e,n){this.platform!=null&&(C().getBool("IS_TEST")||C().getBool("PROD")||console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${e}.`)),this.platformName=e,this.platform=n}registerFlag(e,n,r){if(this.flagRegistry[e]={evaluationFn:n,setHook:r},this.urlFlags[e]!=null){const s=this.urlFlags[e];C().getBool("IS_TEST")||C().getBool("PROD")||console.warn(`Setting feature override from URL ${e}: ${s}.`),this.set(e,s)}}async getAsync(e){return e in this.flags?this.flags[e]:(this.flags[e]=await this.evaluateFlag(e),this.flags[e])}get(e){if(e in this.flags)return this.flags[e];const n=this.evaluateFlag(e);if(it(n))throw new Error(`Flag ${e} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[e]=n,this.flags[e]}getNumber(e){return this.get(e)}getBool(e){return this.get(e)}getString(e){return this.get(e)}getFlags(){return this.flags}get features(){return this.flags}set(e,n){if(this.flagRegistry[e]==null)throw new Error(`Cannot set flag ${e} as it has not been registered.`);this.flags[e]=n,this.flagRegistry[e].setHook!=null&&this.flagRegistry[e].setHook(n)}evaluateFlag(e){if(this.flagRegistry[e]==null)throw new Error(`Cannot evaluate flag '${e}': no evaluation function found.`);return this.flagRegistry[e].evaluationFn()}setFlags(e){this.flags=Object.assign({},e)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(typeof this.global>"u"||typeof this.global.location>"u"||typeof this.global.location.search>"u")return;const e=this.getQueryParams(this.global.location.search);Oa in e&&e[Oa].split(",").forEach(r=>{const[s,a]=r.split(":");this.urlFlags[s]=hf(s,a)})}}function cf(t){const e={};return t.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(n,...r)=>(pf(e,r[0],r[1]),r.join("="))),e}function pf(t,e,n){t[decodeURIComponent(e)]=decodeURIComponent(n||"")}function hf(t,e){const n=e.toLowerCase();return n==="true"||n==="false"?n==="true":`${+n}`===n?+n:e}function C(){return fs}let fs=null;function ff(t){fs=t}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let vr;function Eo(){if(vr==null){let t;if(typeof window<"u")t=window;else if(typeof global<"u")t=global;else if(typeof process<"u")t=process;else if(typeof self<"u")t=self;else throw new Error("Could not find a global object");vr=t}return vr}function df(){const t=Eo();return t._tfGlobals==null&&(t._tfGlobals=new Map),t._tfGlobals}function ds(t,e){const n=df();if(n.has(t))return n.get(t);{const r=e();return n.set(t,r),n.get(t)}}const vo="Abs",$o="Acos",ko="Acosh",ms="Add",_o="AddN",xo="All",Io="Any",Ao="ArgMax",Do="ArgMin",Oo="Asin",Fo="Asinh",Ro="Atan",Co="Atanh",Bo="Atan2",Lo="AvgPool",mf="AvgPoolGrad",Po="AvgPool3D",gf="AvgPool3DGrad",zo="BatchMatMul",Vo="BatchToSpaceND",Mo="Bincount",Wo="BitwiseAnd",yf="BroadcastTo",qo="BroadcastArgs",gs="Cast",Uo="Ceil",Go="ClipByValue",jo="Complex",Ho="ComplexAbs",Ko="Concat",Xo="Conv2D",Zo="Conv2DBackpropFilter",Jo="Conv2DBackpropInput",Yo="Conv3D",bf="Conv3DBackpropFilterV2",Qo="Conv3DBackpropInputV2",ei="Cos",ti="Cosh",ni="Cumprod",ri="Cumsum",si="CropAndResize",ai="DenseBincount",oi="DepthToSpace",ii="DepthwiseConv2dNative",ui="DepthwiseConv2dNativeBackpropFilter",li="DepthwiseConv2dNativeBackpropInput",ci="Diag",pi="Dilation2D",wf="Dilation2DBackpropInput",Nf="Dilation2DBackpropFilter",ys="Draw",hi="RealDiv",fi="Einsum",di="Elu",Sf="EluGrad",mi="Erf",gi="Equal",yi="Exp",bi="ExpandDims",wi="Expm1",Ni="FFT",Si="Fill",Ti="FlipLeftRight",Ei="Floor",vi="FloorDiv",$i="FusedBatchNorm",ki="GatherV2",_i="GatherNd",xi="Greater",Ii="GreaterEqual",bs="Identity",Ai="IFFT",Di="Imag",Oi="IsFinite",Fi="IsInf",Ri="IsNan",Ci="LeakyRelu",Bi="Less",Li="LessEqual",Pi="LinSpace",zi="Log",Vi="Log1p",Mi="LogicalAnd",Wi="LogicalNot",qi="LogicalOr",Tf="LogicalXor",Ef="LogSoftmax",vf="LowerBound",Ui="LRN",$f="LRNGrad",kf="MatrixBandPart",Gi="Max",ji="Maximum",Hi="MaxPool",_f="MaxPoolGrad",Ki="MaxPool3D",xf="MaxPool3DGrad",Xi="MaxPoolWithArgmax",Zi="Mean",Ji="Min",Yi="Minimum",Qi="MirrorPad",eu="Mod",tu="Multinomial",nu="Multiply",ru="Neg",su="NotEqual",au="NonMaxSuppressionV3",ou="NonMaxSuppressionV4",iu="NonMaxSuppressionV5",uu="OnesLike",lu="OneHot",cu="Pack",pu="PadV2",If="Pool",hu="Pow",fu="Prelu",du="Prod",mu="RaggedGather",gu="RaggedRange",yu="RaggedTensorToTensor",bu="Range",wu="Real",Nu="Reciprocal",Su="Relu",Tu="Reshape",Eu="ResizeNearestNeighbor",Af="ResizeNearestNeighborGrad",vu="ResizeBilinear",Df="ResizeBilinearGrad",$u="Relu6",ku="Reverse",_u="Round",xu="Rsqrt",Iu="ScatterNd",Au="TensorScatterUpdate",Du="SearchSorted",Ou="Select",Fu="Selu",Ru="Slice",Cu="Sin",Bu="Sinh",Lu="Sign",Pu="Sigmoid",zu="Softplus",Vu="Sqrt",Mu="Sum",Wu="SpaceToBatchND",qu="SplitV",Uu="Softmax",Gu="SparseFillEmptyRows",ju="SparseReshape",Hu="SparseSegmentMean",Ku="SparseSegmentSum",Xu="SparseToDense",Zu="SquaredDifference",Of="Square",Ju="StaticRegexReplace",Yu="StridedSlice",Qu="StringNGrams",el="StringSplit",tl="StringToHashBucketFast",nl="Sub",rl="Tan",sl="Tanh",ws="Tile",al="TopK",ol="Transform",Mn="Transpose",il="Unique",ul="Unpack",ll="UnsortedSegmentSum",Ff="UpperBound",cl="ZerosLike",pl="Step",Or="FromPixels",hl="RotateWithOffset",Fr="_FusedMatMul",Rr="FusedConv2D",Cr="FusedDepthwiseConv2D";/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function et(...t){C().getBool("IS_TEST")||C().getBool("PROD")||console.warn(...t)}function Rf(...t){C().getBool("IS_TEST")||C().getBool("PROD")||console.log(...t)}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const jt=ds("kernelRegistry",()=>new Map),hn=ds("gradRegistry",()=>new Map);function fn(t,e){const n=Ns(t,e);return jt.get(n)}function Br(t){return hn.get(t)}function Kn(t){const e=jt.entries(),n=[];for(;;){const{done:r,value:s}=e.next();if(r)break;const[a,o]=s,[i]=a.split("_");i===t&&n.push(o)}return n}function fl(t){const{kernelName:e,backendName:n}=t,r=Ns(e,n);jt.has(r)&&et(`The kernel '${e}' for backend '${n}' is already registered`),jt.set(r,t)}function Cf(t){const{kernelName:e}=t;hn.has(e)&&C().getBool("DEBUG")&&et(`Overriding the gradient for '${e}'`),hn.set(e,t)}function Bf(t,e){const n=Ns(t,e);if(!jt.has(n))throw new Error(`The kernel '${t}' for backend '${e}' is not registered`);jt.delete(n)}function Lf(t){if(!hn.has(t))throw new Error(`The gradient '${t}' for backend is not registered`);hn.delete(t)}function Pf(t,e){Kn(t).forEach(r=>{const s=Object.assign({},r,{backendName:e});fl(s)})}function Ns(t,e){return`${e}_${t}`}/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function dl(t){return t instanceof Float32Array||t instanceof Int32Array||t instanceof Uint8Array||t instanceof Uint8ClampedArray}var ml=Z,ke=null;try{ke=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function Z(t,e,n){this.low=t|0,this.high=e|0,this.unsigned=!!n}Z.prototype.__isLong__;Object.defineProperty(Z.prototype,"__isLong__",{value:!0});function Te(t){return(t&&t.__isLong__)===!0}Z.isLong=Te;var Fa={},Ra={};function Rt(t,e){var n,r,s;return e?(t>>>=0,(s=0<=t&&t<256)&&(r=Ra[t],r)?r:(n=J(t,(t|0)<0?-1:0,!0),s&&(Ra[t]=n),n)):(t|=0,(s=-128<=t&&t<128)&&(r=Fa[t],r)?r:(n=J(t,t<0?-1:0,!1),s&&(Fa[t]=n),n))}Z.fromInt=Rt;function _e(t,e){if(isNaN(t))return e?St:xe;if(e){if(t<0)return St;if(t>=gl)return wl}else{if(t<=-Ba)return we;if(t+1>=Ba)return bl}return t<0?_e(-t,e).neg():J(t%Ht|0,t/Ht|0,e)}Z.fromNumber=_e;function J(t,e,n){return new Z(t,e,n)}Z.fromBits=J;var Xn=Math.pow;function Ss(t,e,n){if(t.length===0)throw Error("empty string");if(t==="NaN"||t==="Infinity"||t==="+Infinity"||t==="-Infinity")return xe;if(typeof e=="number"?(n=e,e=!1):e=!!e,n=n||10,n<2||36<n)throw RangeError("radix");var r;if((r=t.indexOf("-"))>0)throw Error("interior hyphen");if(r===0)return Ss(t.substring(1),e,n).neg();for(var s=_e(Xn(n,8)),a=xe,o=0;o<t.length;o+=8){var i=Math.min(8,t.length-o),u=parseInt(t.substring(o,o+i),n);if(i<8){var l=_e(Xn(n,i));a=a.mul(l).add(_e(u))}else a=a.mul(s),a=a.add(_e(u))}return a.unsigned=e,a}Z.fromString=Ss;function Be(t,e){return typeof t=="number"?_e(t,e):typeof t=="string"?Ss(t,e):J(t.low,t.high,typeof e=="boolean"?e:t.unsigned)}Z.fromValue=Be;var Ca=65536,zf=1<<24,Ht=Ca*Ca,gl=Ht*Ht,Ba=gl/2,La=Rt(zf),xe=Rt(0);Z.ZERO=xe;var St=Rt(0,!0);Z.UZERO=St;var Vt=Rt(1);Z.ONE=Vt;var yl=Rt(1,!0);Z.UONE=yl;var Lr=Rt(-1);Z.NEG_ONE=Lr;var bl=J(-1,2147483647,!1);Z.MAX_VALUE=bl;var wl=J(-1,-1,!0);Z.MAX_UNSIGNED_VALUE=wl;var we=J(0,-2147483648,!1);Z.MIN_VALUE=we;var x=Z.prototype;x.toInt=function(){return this.unsigned?this.low>>>0:this.low};x.toNumber=function(){return this.unsigned?(this.high>>>0)*Ht+(this.low>>>0):this.high*Ht+(this.low>>>0)};x.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(we)){var n=_e(e),r=this.div(n),s=r.mul(n).sub(this);return r.toString(e)+s.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var a=_e(Xn(e,6),this.unsigned),o=this,i="";;){var u=o.div(a),l=o.sub(u.mul(a)).toInt()>>>0,p=l.toString(e);if(o=u,o.isZero())return p+i;for(;p.length<6;)p="0"+p;i=""+p+i}};x.getHighBits=function(){return this.high};x.getHighBitsUnsigned=function(){return this.high>>>0};x.getLowBits=function(){return this.low};x.getLowBitsUnsigned=function(){return this.low>>>0};x.getNumBitsAbs=function(){if(this.isNegative())return this.eq(we)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,n=31;n>0&&!(e&1<<n);n--);return this.high!=0?n+33:n+1};x.isZero=function(){return this.high===0&&this.low===0};x.eqz=x.isZero;x.isNegative=function(){return!this.unsigned&&this.high<0};x.isPositive=function(){return this.unsigned||this.high>=0};x.isOdd=function(){return(this.low&1)===1};x.isEven=function(){return(this.low&1)===0};x.equals=function(e){return Te(e)||(e=Be(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};x.eq=x.equals;x.notEquals=function(e){return!this.eq(e)};x.neq=x.notEquals;x.ne=x.notEquals;x.lessThan=function(e){return this.comp(e)<0};x.lt=x.lessThan;x.lessThanOrEqual=function(e){return this.comp(e)<=0};x.lte=x.lessThanOrEqual;x.le=x.lessThanOrEqual;x.greaterThan=function(e){return this.comp(e)>0};x.gt=x.greaterThan;x.greaterThanOrEqual=function(e){return this.comp(e)>=0};x.gte=x.greaterThanOrEqual;x.ge=x.greaterThanOrEqual;x.compare=function(e){if(Te(e)||(e=Be(e)),this.eq(e))return 0;var n=this.isNegative(),r=e.isNegative();return n&&!r?-1:!n&&r?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};x.comp=x.compare;x.negate=function(){return!this.unsigned&&this.eq(we)?we:this.not().add(Vt)};x.neg=x.negate;x.add=function(e){Te(e)||(e=Be(e));var n=this.high>>>16,r=this.high&65535,s=this.low>>>16,a=this.low&65535,o=e.high>>>16,i=e.high&65535,u=e.low>>>16,l=e.low&65535,p=0,c=0,f=0,d=0;return d+=a+l,f+=d>>>16,d&=65535,f+=s+u,c+=f>>>16,f&=65535,c+=r+i,p+=c>>>16,c&=65535,p+=n+o,p&=65535,J(f<<16|d,p<<16|c,this.unsigned)};x.subtract=function(e){return Te(e)||(e=Be(e)),this.add(e.neg())};x.sub=x.subtract;x.multiply=function(e){if(this.isZero())return xe;if(Te(e)||(e=Be(e)),ke){var n=ke.mul(this.low,this.high,e.low,e.high);return J(n,ke.get_high(),this.unsigned)}if(e.isZero())return xe;if(this.eq(we))return e.isOdd()?we:xe;if(e.eq(we))return this.isOdd()?we:xe;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(La)&&e.lt(La))return _e(this.toNumber()*e.toNumber(),this.unsigned);var r=this.high>>>16,s=this.high&65535,a=this.low>>>16,o=this.low&65535,i=e.high>>>16,u=e.high&65535,l=e.low>>>16,p=e.low&65535,c=0,f=0,d=0,y=0;return y+=o*p,d+=y>>>16,y&=65535,d+=a*p,f+=d>>>16,d&=65535,d+=o*l,f+=d>>>16,d&=65535,f+=s*p,c+=f>>>16,f&=65535,f+=a*l,c+=f>>>16,f&=65535,f+=o*u,c+=f>>>16,f&=65535,c+=r*p+s*l+a*u+o*i,c&=65535,J(d<<16|y,c<<16|f,this.unsigned)};x.mul=x.multiply;x.divide=function(e){if(Te(e)||(e=Be(e)),e.isZero())throw Error("division by zero");if(ke){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var n=(this.unsigned?ke.div_u:ke.div_s)(this.low,this.high,e.low,e.high);return J(n,ke.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?St:xe;var r,s,a;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return St;if(e.gt(this.shru(1)))return yl;a=St}else{if(this.eq(we)){if(e.eq(Vt)||e.eq(Lr))return we;if(e.eq(we))return Vt;var o=this.shr(1);return r=o.div(e).shl(1),r.eq(xe)?e.isNegative()?Vt:Lr:(s=this.sub(e.mul(r)),a=r.add(s.div(e)),a)}else if(e.eq(we))return this.unsigned?St:xe;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();a=xe}for(s=this;s.gte(e);){r=Math.max(1,Math.floor(s.toNumber()/e.toNumber()));for(var i=Math.ceil(Math.log(r)/Math.LN2),u=i<=48?1:Xn(2,i-48),l=_e(r),p=l.mul(e);p.isNegative()||p.gt(s);)r-=u,l=_e(r,this.unsigned),p=l.mul(e);l.isZero()&&(l=Vt),a=a.add(l),s=s.sub(p)}return a};x.div=x.divide;x.modulo=function(e){if(Te(e)||(e=Be(e)),ke){var n=(this.unsigned?ke.rem_u:ke.rem_s)(this.low,this.high,e.low,e.high);return J(n,ke.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};x.mod=x.modulo;x.rem=x.modulo;x.not=function(){return J(~this.low,~this.high,this.unsigned)};x.and=function(e){return Te(e)||(e=Be(e)),J(this.low&e.low,this.high&e.high,this.unsigned)};x.or=function(e){return Te(e)||(e=Be(e)),J(this.low|e.low,this.high|e.high,this.unsigned)};x.xor=function(e){return Te(e)||(e=Be(e)),J(this.low^e.low,this.high^e.high,this.unsigned)};x.shiftLeft=function(e){return Te(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?J(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):J(0,this.low<<e-32,this.unsigned)};x.shl=x.shiftLeft;x.shiftRight=function(e){return Te(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?J(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):J(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};x.shr=x.shiftRight;x.shiftRightUnsigned=function(e){if(Te(e)&&(e=e.toInt()),e&=63,e===0)return this;var n=this.high;if(e<32){var r=this.low;return J(r>>>e|n<<32-e,n>>>e,this.unsigned)}else return e===32?J(n,0,this.unsigned):J(n>>>e-32,0,this.unsigned)};x.shru=x.shiftRightUnsigned;x.shr_u=x.shiftRightUnsigned;x.toSigned=function(){return this.unsigned?J(this.low,this.high,!1):this};x.toUnsigned=function(){return this.unsigned?this:J(this.low,this.high,!0)};x.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};x.toBytesLE=function(){var e=this.high,n=this.low;return[n&255,n>>>8&255,n>>>16&255,n>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};x.toBytesBE=function(){var e=this.high,n=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,n>>>24,n>>>16&255,n>>>8&255,n&255]};Z.fromBytes=function(e,n,r){return r?Z.fromBytesLE(e,n):Z.fromBytesBE(e,n)};Z.fromBytesLE=function(e,n){return new Z(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,n)};Z.fromBytesBE=function(e,n){return new Z(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],n)};var Nl=lo(ml),Vf=uo({__proto__:null,default:Nl},[ml]);/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const bt=Nl||Vf;function _n(t){return bt.fromString(t,!0,16)}const Sl=_n("c3a5c85c97cb3127"),yt=_n("b492b66fbe98f273"),ce=_n("9ae16a3b2f90404f");function Pr(t){return t.xor(t.shru(47))}function Tl(t,e,n){const r=t.slice(e,e+n);return bt.fromBytes(Array.from(r),!0,!0)}function j(t,e){return Tl(t,e,8)}function Pa(t,e){return Tl(t,e,4)}function se(t,e){return e===0?t:t.shru(e).or(t.shl(64-e))}function at(t,e,n=_n("9ddfea08eb382d69")){let r=t.xor(e).mul(n);r=r.xor(r.shru(47));let s=e.xor(r).mul(n);return s=s.xor(s.shru(47)),s=s.mul(n),s}function Mf(t,e,n,r,s,a){s=s.add(t),a=se(a.add(s).add(r),21);const o=s;return s=s.add(e),s=s.add(n),a=a.add(se(s,44)),[s.add(r),a.add(o)]}function Pn(t,e,n,r){return Mf(j(t,e),j(t,e+8),j(t,e+16),j(t,e+24),n,r)}function Wf(t,e=t.length){if(e>=8){const n=ce.add(e*2),r=j(t,0).add(ce),s=j(t,e-8),a=se(s,37).mul(n).add(r),o=se(r,25).add(s).mul(n);return at(a,o,n)}if(e>=4){const n=ce.add(e*2),r=Pa(t,0);return at(r.shl(3).add(e),Pa(t,e-4),n)}if(e>0){const n=t[0],r=t[e>>1],s=t[e-1],a=n+(r<<8),o=e+(s<<2);return Pr(ce.mul(a).xor(Sl.mul(o))).mul(ce)}return ce}function qf(t,e=t.length){const n=ce.add(e*2),r=j(t,0).mul(yt),s=j(t,8),a=j(t,e-8).mul(n),o=j(t,e-16).mul(ce);return at(se(r.add(s),43).add(se(a,30)).add(o),r.add(se(s.add(ce),18)).add(a),n)}function Uf(t,e=t.length){const n=ce.add(e*2),r=j(t,0).mul(ce),s=j(t,8),a=j(t,e-8).mul(n),o=j(t,e-16).mul(ce),i=se(r.add(s),43).add(se(a,30)).add(o),u=at(i,r.add(se(s.add(ce),18)).add(a),n),l=j(t,16).mul(n),p=j(t,24),c=i.add(j(t,e-32)).mul(n),f=u.add(j(t,e-24)).mul(n);return at(se(l.add(p),43).add(se(c,30)).add(f),l.add(se(p.add(r),18)).add(c),n)}function Gf(t,e=t.length){const n=bt.fromNumber(81,!0);if(e<=32)return e<=16?Wf(t,e):qf(t,e);if(e<=64)return Uf(t,e);let r=n,s=n.mul(yt).add(113),a=Pr(s.mul(ce).add(113)).mul(ce),o=[bt.UZERO,bt.UZERO],i=[bt.UZERO,bt.UZERO];r=r.mul(ce).add(j(t,0));let u=0;const l=(e-1>>6)*64,p=l+(e-1&63)-63;do r=se(r.add(s).add(o[0]).add(j(t,u+8)),37).mul(yt),s=se(s.add(o[1]).add(j(t,u+48)),42).mul(yt),r=r.xor(i[1]),s=s.add(o[0]).add(j(t,u+40)),a=se(a.add(i[0]),33).mul(yt),o=Pn(t,u,o[1].mul(yt),r.add(i[0])),i=Pn(t,u+32,a.add(i[1]),s.add(j(t,u+16))),[a,r]=[r,a],u+=64;while(u!==l);const c=yt.add(a.and(255).shl(1));return u=p,i[0]=i[0].add(e-1&63),o[0]=o[0].add(i[0]),i[0]=i[0].add(o[0]),r=se(r.add(s).add(o[0]).add(j(t,u+8)),37).mul(c),s=se(s.add(o[1]).add(j(t,u+48)),42).mul(c),r=r.xor(i[1].mul(9)),s=s.add(o[0].mul(9).add(j(t,u+40))),a=se(a.add(i[0]),33).mul(c),o=Pn(t,u,o[1].mul(c),r.add(i[0])),i=Pn(t,u+32,a.add(i[1]),s.add(j(t,u+16))),[a,r]=[r,a],at(at(o[0],i[0],c).add(Pr(s).mul(Sl)).add(a),at(o[1],i[1],c).add(r),c)}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jf(t,e){return e==="string"?xn(t):ir([t],e)}function Hf(t,e){return t instanceof Float32Array&&e==="float32"||t instanceof Int32Array&&e==="int32"||t instanceof Uint8Array&&e==="bool"}function ir(t,e){if(e==="string")throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(t)&&(t=ut(t)),C().getBool("DEBUG")&&go(t,e),Hf(t,e))return t;if(e==null||e==="float32"||e==="complex64")return new Float32Array(t);if(e==="int32")return new Int32Array(t);if(e==="bool"){const n=new Uint8Array(t.length);for(let r=0;r<n.length;++r)Math.round(t[r])!==0&&(n[r]=1);return n}else throw new Error(`Unknown data type ${e}`)}function dn(){return C().platform.now()}function Kf(t,e){return C().platform.fetch(t,e)}function xn(t,e="utf-8"){return e=e||"utf-8",C().platform.encode(t,e)}function Zn(t,e="utf-8"){return e=e||"utf-8",C().platform.decode(t,e)}function ae(t){return C().platform.isTypedArray!=null?C().platform.isTypedArray(t):dl(t)}function ut(t,e=[],n=!1){if(e==null&&(e=[]),typeof t=="boolean"||typeof t=="number"||typeof t=="string"||it(t)||t==null||ae(t)&&n)e.push(t);else if(Array.isArray(t)||ae(t))for(let r=0;r<t.length;++r)ut(t[r],e,n);else{let r=-1;for(const s of Object.keys(t))/^([1-9]+[0-9]*|0)$/.test(s)&&(r=Math.max(r,Number(s)));for(let s=0;s<=r;s++)ut(t[s],e,n)}return e}var Xf=Object.freeze({__proto__:null,arraysEqual:Ce,arraysEqualWithNull:ho,assert:g,assertNonNegativeIntegerDimensions:Se,assertNonNull:Ft,assertShapesMatch:fe,bytesFromStringArray:bo,bytesPerElement:jn,checkConversionForErrors:go,clamp:pn,computeStrides:en,convertBackendValuesAndArrayBuffer:af,createScalarValue:jf,createShuffledIndices:tf,decodeString:Zn,distSquared:Jh,encodeString:xn,fetch:Kf,fingerPrint64:Gf,flatten:ut,getArrayFromDType:ps,getTypedArrayFromDType:mo,hasEncodingLoss:sf,hexToLong:_n,indexToLoc:lf,inferDtype:kn,inferFromImplicitShape:rf,isBoolean:wo,isFunction:ot,isInt:Gt,isNumber:No,isPromise:it,isScalarShape:Yh,isString:nt,isTypedArray:ae,isValidDtype:yo,locToIndex:uf,makeOnesTypedArray:hs,makeZerosNestedTypedArray:of,makeZerosTypedArray:or,nearestDivisor:Hn,nearestLargerEven:Kh,now:dn,parseAxisParam:$n,randUniform:Zh,repeatedTry:nf,rightPad:ln,shuffle:po,shuffleCombo:Hh,sizeFromShape:q,sizeToSquarishShape:ef,squeezeShape:fo,sum:Xh,swap:Gn,tanh:Qh,toNestedArray:Et,toTypedArray:ir});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Zf{constructor(e,n){this.backendTimer=e,this.logger=n,n==null&&(this.logger=new Yf)}profileKernel(e,n,r){let s;const a=()=>{s=r()};let o;const i=dn();if(this.backendTimer.timerAvailable())o=this.backendTimer.time(a);else{a();for(const l of s)l.dataSync();o=Promise.resolve({kernelMs:dn()-i})}if(C().getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(let l=0;l<s.length;l++){const p=s[l];p.data().then(c=>{Jf(c,p.dtype,e)})}return{kernelName:e,outputs:s,inputs:n,timeMs:o.then(l=>l.kernelMs),extraInfo:o.then(l=>l.getExtraProfileInfo!=null?l.getExtraProfileInfo():"")}}logKernelProfile(e){const{kernelName:n,outputs:r,timeMs:s,inputs:a,extraInfo:o}=e;r.forEach(i=>{Promise.all([i.data(),s,o]).then(u=>{this.logger.logKernelProfile(n,i,u[0],u[1],a,u[2])})})}}function Jf(t,e,n){if(e!=="float32")return!1;for(let r=0;r<t.length;r++){const s=t[r];if(isNaN(s)||!isFinite(s))return console.warn(`Found ${s} in the result of '${n}'`),!0}return!1}class Yf{logKernelProfile(e,n,r,s,a,o){const i=typeof s=="number"?ln(`${s}ms`,9):s.error,u=ln(e,25),l=n.rank,p=n.size,c=ln(n.shape.toString(),14);let f="";for(const d in a){const y=a[d];if(y!=null){const S=y.shape||n.shape,b=S.length;f+=`${d}: ${b}D ${b>0?S:""} `}}console.log(`%c${u}	%c${i}	%c${l}D ${c}	%c${p}	%c${f}	%c${o}`,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")}}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qf(t,e,n){const r={},s={};for(let u=0;u<e.length;u++)r[e[u].id]=!0;for(let u=0;u<t.length;u++){const l=t[u],p=l.inputs;for(const c in p){const f=p[c];let d=!1;for(let y=0;y<e.length;y++)if(r[f.id]){l.outputs.forEach(S=>r[S.id]=!0),d=!0,s[l.id]=!0;break}if(d)break}}const a={};a[n.id]=!0;const o={};for(let u=t.length-1;u>=0;u--){const l=t[u],p=l.inputs;for(let c=0;c<l.outputs.length;c++)if(a[l.outputs[c].id]){for(const f in p)a[p[f].id]=!0,o[l.id]=!0;break}}const i=[];for(let u=0;u<t.length;u++){const l=t[u];if(s[l.id]&&o[l.id]){const p={};for(const f in l.inputs){const d=l.inputs[f];r[d.id]&&(p[f]=d)}const c=Object.assign({},l);c.inputs=p,c.outputs=l.outputs,i.push(c)}}return i}function ed(t,e,n,r){for(let s=e.length-1;s>=0;s--){const a=e[s],o=[];if(a.outputs.forEach(u=>{const l=t[u.id];l!=null?o.push(l):o.push(null)}),a.gradient==null)throw new Error(`Cannot compute gradient: gradient function not found for ${a.kernelName}.`);const i=a.gradient(o);for(const u in a.inputs){if(!(u in i))throw new Error(`Cannot backprop through input ${u}. Available gradients found: ${Object.keys(i)}.`);const l=n(()=>i[u]());if(l.dtype!=="float32")throw new Error(`Error in gradient for op ${a.kernelName}. The gradient of input ${u} must have 'float32' dtype, but has '${l.dtype}'`);const p=a.inputs[u];if(!Ce(l.shape,p.shape))throw new Error(`Error in gradient for op ${a.kernelName}. The gradient of input '${u}' has shape '${l.shape}', which does not match the shape of the input '${p.shape}'`);if(t[p.id]==null)t[p.id]=l;else{const c=t[p.id];t[p.id]=r(c,l),c.dispose()}}}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const za=20,sn=3,$r=7;function td(t,e,n,r){const s=en(e),a=nd(t,e,n,s),o=e.length,i=Wn(t,e,n,s,a),u=["Tensor"];return r&&(u.push(`  dtype: ${n}`),u.push(`  rank: ${o}`),u.push(`  shape: [${e}]`),u.push("  values:")),u.push(i.map(l=>"    "+l).join(`
`)),u.join(`
`)}function nd(t,e,n,r){const s=q(e),a=r[r.length-1],o=new Array(a).fill(0),i=e.length,u=n==="complex64"?un(t):t;if(i>1)for(let l=0;l<s/a;l++){const p=l*a;for(let c=0;c<a;c++)o[c]=Math.max(o[c],on(u[p+c],0,n).length)}return o}function on(t,e,n){let r;return Array.isArray(t)?r=`${parseFloat(t[0].toFixed($r))} + ${parseFloat(t[1].toFixed($r))}j`:nt(t)?r=`'${t}'`:n==="bool"?r=El(t):r=parseFloat(t.toFixed($r)).toString(),ln(r,e)}function El(t){return t===0?"false":"true"}function Wn(t,e,n,r,s,a=!0){const o=n==="complex64"?2:1,i=e[0],u=e.length;if(u===0){if(n==="complex64"){const S=un(t);return[on(S[0],0,n)]}return n==="bool"?[El(t[0])]:[t[0].toString()]}if(u===1){if(i>za){const b=sn*o;let T=Array.from(t.slice(0,b)),A=Array.from(t.slice((i-sn)*o,i*o));return n==="complex64"&&(T=un(T),A=un(A)),["["+T.map((E,v)=>on(E,s[v],n)).join(", ")+", ..., "+A.map((E,v)=>on(E,s[i-sn+v],n)).join(", ")+"]"]}return["["+(n==="complex64"?un(t):Array.from(t)).map((b,T)=>on(b,s[T],n)).join(", ")+"]"]}const l=e.slice(1),p=r.slice(1),c=r[0]*o,f=[];if(i>za){for(let S=0;S<sn;S++){const b=S*c,T=b+c;f.push(...Wn(t.slice(b,T),l,n,p,s,!1))}f.push("...");for(let S=i-sn;S<i;S++){const b=S*c,T=b+c;f.push(...Wn(t.slice(b,T),l,n,p,s,S===i-1))}}else for(let S=0;S<i;S++){const b=S*c,T=b+c;f.push(...Wn(t.slice(b,T),l,n,p,s,S===i-1))}const d=u===2?",":"";f[0]="["+(i>0?f[0]+d:"");for(let S=1;S<f.length-1;S++)f[S]=" "+f[S]+d;let y=`,
`;for(let S=2;S<u;S++)y+=`
`;return f[f.length-1]=" "+f[f.length-1]+"]"+(a?"":y),f}function un(t){const e=[];for(let n=0;n<t.length;n+=2)e.push([t[n],t[n+1]]);return e}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Jn{constructor(e,n,r){if(this.dtype=n,this.shape=e.slice(),this.size=q(e),r!=null){const s=r.length;g(s===this.size,()=>`Length of values '${s}' does not match the size inferred by the shape '${this.size}'.`)}if(n==="complex64")throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=r||ps(n,this.size),this.strides=en(e)}set(e,...n){n.length===0&&(n=[0]),g(n.length===this.rank,()=>`The number of provided coordinates (${n.length}) must match the rank (${this.rank})`);const r=this.locToIndex(n);this.values[r]=e}get(...e){e.length===0&&(e=[0]);let n=0;for(const s of e){if(s<0||s>=this.shape[n]){const a=`Requested out of range element at ${e}.   Buffer shape=${this.shape}`;throw new Error(a)}n++}let r=e[e.length-1];for(let s=0;s<e.length-1;++s)r+=this.strides[s]*e[s];return this.values[r]}locToIndex(e){if(this.rank===0)return 0;if(this.rank===1)return e[0];let n=e[e.length-1];for(let r=0;r<e.length-1;++r)n+=this.strides[r]*e[r];return n}indexToLoc(e){if(this.rank===0)return[];if(this.rank===1)return[e];const n=new Array(this.shape.length);for(let r=0;r<n.length-1;++r)n[r]=Math.floor(e/this.strides[r]),e-=n[r]*this.strides[r];return n[n.length-1]=e,n}get rank(){return this.shape.length}toTensor(){return De().makeTensor(this.values,this.shape,this.dtype)}}let De=null,Pt=null;function rd(t){De=t}function sd(t){Pt=t}class te{constructor(e,n,r,s){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=n||"float32",this.size=q(e),this.strides=en(e),this.dataId=r,this.id=s,this.rankType=this.rank<5?this.rank.toString():"higher"}get rank(){return this.shape.length}async buffer(){const e=await this.data();return Pt.buffer(this.shape,this.dtype,e)}bufferSync(){return Pt.buffer(this.shape,this.dtype,this.dataSync())}async array(){const e=await this.data();return Et(this.shape,e,this.dtype==="complex64")}arraySync(){return Et(this.shape,this.dataSync(),this.dtype==="complex64")}async data(){this.throwIfDisposed();const e=De().read(this.dataId);if(this.dtype==="string"){const n=await e;try{return n.map(r=>Zn(r))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}}return e}dataToGPU(e){return this.throwIfDisposed(),De().readToGPU(this.dataId,e)}dataSync(){this.throwIfDisposed();const e=De().readSync(this.dataId);if(this.dtype==="string")try{return e.map(n=>Zn(n))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return e}async bytes(){this.throwIfDisposed();const e=await De().read(this.dataId);return this.dtype==="string"?e:new Uint8Array(e.buffer)}dispose(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),De().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw new Error("Tensor is disposed.")}print(e=!1){return Pt.print(this,e)}clone(){return this.throwIfDisposed(),Pt.clone(this)}toString(e=!1){const n=this.dataSync();return td(n,this.shape,this.dtype,e)}cast(e){return this.throwIfDisposed(),Pt.cast(this,e)}variable(e=!0,n,r){return this.throwIfDisposed(),De().makeVariable(this,e,n,r)}}Object.defineProperty(te,Symbol.hasInstance,{value:t=>!!t&&t.data!=null&&t.dataSync!=null&&t.throwIfDisposed!=null});function vl(){return ds("Tensor",()=>te)}vl();class mn extends te{constructor(e,n,r,s){super(e.shape,e.dtype,e.dataId,s),this.trainable=n,this.name=r}assign(e){if(e.dtype!==this.dtype)throw new Error(`dtype of the new value (${e.dtype}) and previous value (${this.dtype}) must match`);if(!Ce(e.shape,this.shape))throw new Error(`shape of the new value (${e.shape}) and previous value (${this.shape}) must match`);De().disposeTensor(this),this.dataId=e.dataId,De().incRef(this,null)}dispose(){De().disposeVariable(this),this.isDisposedInternal=!0}}Object.defineProperty(mn,Symbol.hasInstance,{value:t=>t instanceof te&&t.assign!=null&&t.assign instanceof Function});/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var zr;(function(t){t.R0="R0",t.R1="R1",t.R2="R2",t.R3="R3",t.R4="R4",t.R5="R5",t.R6="R6"})(zr||(zr={}));var Vr;(function(t){t.float32="float32",t.int32="int32",t.bool="int32",t.complex64="complex64"})(Vr||(Vr={}));var Mr;(function(t){t.float32="float32",t.int32="int32",t.bool="bool",t.complex64="complex64"})(Mr||(Mr={}));var Wr;(function(t){t.float32="float32",t.int32="float32",t.bool="float32",t.complex64="complex64"})(Wr||(Wr={}));var qr;(function(t){t.float32="complex64",t.int32="complex64",t.bool="complex64",t.complex64="complex64"})(qr||(qr={}));const ad={float32:Wr,int32:Vr,bool:Mr,complex64:qr};function ur(t,e){if(t==="string"||e==="string"){if(t==="string"&&e==="string")return"string";throw new Error(`Can not upcast ${t} with ${e}`)}return ad[t][e]}function od(t){return ur(t,"int32")}function $l(t){return t!=null&&typeof t=="object"&&"texture"in t&&t.texture instanceof WebGLTexture}function kl(t){return typeof GPUBuffer<"u"&&t!=null&&typeof t=="object"&&"buffer"in t&&t.buffer instanceof GPUBuffer}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ee(t,e){if(t.dtype===e.dtype)return[t,e];const n=ur(t.dtype,e.dtype);return[t.cast(n),e.cast(n)]}function _l(t,e){g(t.dtype===e.dtype,()=>`The dtypes of the first(${t.dtype}) and second(${e.dtype}) input must match`)}function id(t,e){return e.some(n=>n.id===t.id)}function Ts(t){const e=[];return xl(t,e,new Set),e}function xl(t,e,n){if(t==null)return;if(t instanceof te){e.push(t);return}if(!ud(t))return;const r=t;for(const s in r){const a=r[s];n.has(a)||(n.add(a),xl(a,e,n))}}function ud(t){return Array.isArray(t)||typeof t=="object"}var ld=Object.freeze({__proto__:null,assertTypesMatch:_l,getTensorsInContainer:Ts,isTensorInList:id,makeTypesMatch:ee});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function kr(t){return t.kernelName!=null}class Va{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(e=>e.name)))}}}dispose(){for(const e in this.registeredVariables)this.registeredVariables[e].dispose()}}class Kt{constructor(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new Va}async ready(){if(this.pendingBackendInit!=null)return this.pendingBackendInit.then(()=>{});if(this.backendInstance!=null)return;const e=this.getSortedBackends();for(let n=0;n<e.length;n++){const r=e[n];if(await this.initializeBackend(r).success){await this.setBackend(r);return}}throw new Error("Could not initialize any backends, all backend initializations failed.")}get backend(){if(this.pendingBackendInit!=null)throw new Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(this.backendInstance==null){const{name:e,asyncInit:n}=this.initializeBackendsAndReturnBest();if(n)throw new Error(`The highest priority backend '${e}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(e)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(e){if(!(e in this.registry))if(e in this.registryFactory){const{asyncInit:n}=this.initializeBackend(e);if(n)return null}else return null;return this.registry[e]}findBackendFactory(e){return e in this.registryFactory?this.registryFactory[e].factory:null}registerBackend(e,n,r=1){return e in this.registryFactory?(et(`${e} backend was already registered. Reusing existing backend factory.`),!1):(this.registryFactory[e]={factory:n,priority:r},!0)}async setBackend(e){if(this.registryFactory[e]==null)throw new Error(`Backend name '${e}' not found in registry`);if(this.backendName=e,this.registry[e]==null){this.backendInstance=null;const{success:n,asyncInit:r}=this.initializeBackend(e);if(!(r?await n:n))return!1}return this.backendInstance=this.registry[e],this.setupRegisteredKernels(),this.profiler=new Zf(this.backendInstance),!0}setupRegisteredKernels(){Kn(this.backendName).forEach(n=>{n.setupFunc!=null&&n.setupFunc(this.backendInstance)})}disposeRegisteredKernels(e){Kn(e).forEach(r=>{r.disposeFunc!=null&&r.disposeFunc(this.registry[e])})}initializeBackend(e){const n=this.registryFactory[e];if(n==null)throw new Error(`Cannot initialize backend ${e}, no registration found.`);try{const r=n.factory();if(r&&!(r instanceof co)&&typeof r.then=="function"){const s=++this.pendingBackendInitId,a=r.then(o=>s<this.pendingBackendInitId?!1:(this.registry[e]=o,this.pendingBackendInit=null,!0)).catch(o=>(s<this.pendingBackendInitId||(this.pendingBackendInit=null,et(`Initialization of backend ${e} failed`),et(o.stack||o.message)),!1));return this.pendingBackendInit=a,{success:a,asyncInit:!0}}else return this.registry[e]=r,{success:!0,asyncInit:!1}}catch(r){return et(`Initialization of backend ${e} failed`),et(r.stack||r.message),{success:!1,asyncInit:!1}}}removeBackend(e){if(!(e in this.registryFactory))throw new Error(`${e} backend not found in registry`);this.backendName===e&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(Object.keys(this.registryFactory).length===0)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((e,n)=>this.registryFactory[n].priority-this.registryFactory[e].priority)}initializeBackendsAndReturnBest(){const e=this.getSortedBackends();for(let n=0;n<e.length;n++){const r=e[n],{success:s,asyncInit:a}=this.initializeBackend(r);if(a||s)return{name:r,asyncInit:a}}throw new Error("Could not initialize any backends, all backend initializations failed.")}moveData(e,n){const r=this.state.tensorInfo.get(n),s=r.backend,a=this.readSync(n),o=s.refCount(n);s.disposeData(n,!0),r.backend=e,e.move(n,a,r.shape,r.dtype,o),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(e,n){let r=null;if(n==null){if(typeof e!="function")throw new Error("Please provide a function to tidy()");n=e}else{if(typeof e!="string"&&!(e instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if(typeof n!="function")throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");r=e}let s;return this.scopedRun(()=>this.startScope(r),()=>this.endScope(s),()=>(s=n(),s instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),s))}scopedRun(e,n,r){e();try{const s=r();return n(),s}catch(s){throw n(),s}}nextTensorId(){return Kt.nextTensorId++}nextVariableId(){return Kt.nextVariableId++}clone(e){const n=N.runKernel(bs,{x:e}),r={x:e},s=o=>({x:()=>{const i="float32",u={x:o},l={dtype:i};return N.runKernel(gs,u,l)}}),a=[];return this.addTapeNode(this.state.activeScope.name,r,[n],s,a,{}),n}runKernel(e,n,r){if(this.backendName==null&&this.backend,!(fn(e,this.backendName)!=null))throw new Error(`Kernel '${e}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:e,inputs:n,attrs:r})}shouldCheckForMemLeaks(){return this.ENV.getBool("IS_TEST")}checkKernelForMemLeak(e,n,r){const s=this.backend.numDataIds();let a=0;r.forEach(u=>{a+=u.dtype==="complex64"?3:1});const o=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],i=s-n-a-o;if(i>0)throw new Error(`Backend '${this.backendName}' has an internal memory leak (${i} data ids) after running '${e}'`)}runKernelFunc(e){let n,r=[];const s=this.isTapeOn(),a=this.state.numBytes,o=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);let i;this.backendName==null&&this.backend;let u;const l=kr(e)?e.kernelName:this.state.activeScope!=null?this.state.activeScope.name:"";if(kr(e)){const{kernelName:y,inputs:S,attrs:b}=e;this.backendName==null&&this.backend;const T=fn(y,this.backendName);g(T!=null,()=>`Cannot find registered kernel '${y}' for backend '${this.backendName}'`),i=()=>{const A=this.backend.numDataIds();u=T.kernelFunc({inputs:S,attrs:b,backend:this.backend});const E=Array.isArray(u)?u:[u];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(y,A,E);const v=E.map(k=>k.rank!=null?k:this.makeTensorFromTensorInfo(k));if(s){const k=this.getTensorsForGradient(y,S,v);r=this.saveTensorsForBackwardMode(k)}return v}}else{const{forwardFunc:y}=e,S=b=>{s&&(r=b.map(T=>this.keep(this.clone(T))))};i=()=>{const b=this.backend.numDataIds();u=this.tidy(()=>y(this.backend,S));const T=Array.isArray(u)?u:[u];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(l,b,T),T}}const{inputs:p,attrs:c}=e,f=kr(e)?null:e.backwardsFunc;let d;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{!this.ENV.getBool("DEBUG")&&!this.state.profiling?n=i():(d=this.profiler.profileKernel(l,p,()=>i()),this.ENV.getBool("DEBUG")&&this.profiler.logKernelProfile(d),n=d.outputs)}),s&&this.addTapeNode(l,p,n,f,r,c),this.state.profiling&&this.state.activeProfile.kernels.push({name:l,bytesAdded:this.state.numBytes-a,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-o,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(p).map(y=>p[y]!=null?p[y].shape:null),outputShapes:n.map(y=>y.shape),kernelTimeMs:d.timeMs,extraInfo:d.extraInfo}),Array.isArray(u)?n:n[0]}saveTensorsForBackwardMode(e){return e.map(r=>this.keep(this.clone(r)))}getTensorsForGradient(e,n,r){const s=Br(e);if(s!=null){const a=s.inputsToSave||[],o=s.outputsToSave||[];let i;s.saveAllInputs?(g(Array.isArray(n),()=>"saveAllInputs is true, expected inputs to be an array."),i=Object.keys(n).map(l=>n[l])):i=a.map(l=>n[l]);const u=r.filter((l,p)=>o[p]);return i.concat(u)}return[]}makeTensor(e,n,r,s){if(e==null)throw new Error("Values passed to engine.makeTensor() are null");r=r||"float32",s=s||this.backend;let a=e;r==="string"&&nt(e[0])&&(a=e.map(u=>xn(u)));const o=s.write(a,n,r),i=new te(n,r,o,this.nextTensorId());if(this.trackTensor(i,s),r==="string"){const u=this.state.tensorInfo.get(o),l=bo(a);this.state.numBytes+=l-u.bytes,u.bytes=l}return i}makeTensorFromDataId(e,n,r,s){r=r||"float32";const a={dataId:e,shape:n,dtype:r};return this.makeTensorFromTensorInfo(a,s)}makeTensorFromTensorInfo(e,n){const{dataId:r,shape:s,dtype:a}=e,o=new te(s,a,r,this.nextTensorId());return this.trackTensor(o,n),o}makeVariable(e,n=!0,r,s){r=r||this.nextVariableId().toString(),s!=null&&s!==e.dtype&&(e=e.cast(s));const a=new mn(e,n,r,this.nextTensorId());if(this.state.registeredVariables[a.name]!=null)throw new Error(`Variable with name ${a.name} was already registered`);return this.state.registeredVariables[a.name]=a,this.incRef(a,this.backend),a}trackTensor(e,n){this.state.numTensors++,e.dtype==="string"&&this.state.numStringTensors++;let r=0;e.dtype!=="complex64"&&e.dtype!=="string"&&(r=e.size*jn(e.dtype)),this.state.numBytes+=r,this.state.tensorInfo.has(e.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(e.dataId,{backend:n||this.backend,dtype:e.dtype,shape:e.shape,bytes:r})),e instanceof mn||this.track(e)}incRef(e,n){this.trackTensor(e,n),this.backend.incRef(e.dataId)}removeDataId(e,n){this.state.tensorInfo.has(e)&&this.state.tensorInfo.get(e).backend===n&&(this.state.tensorInfo.delete(e),this.state.numDataBuffers--)}disposeTensor(e){if(!this.state.tensorInfo.has(e.dataId))return;const n=this.state.tensorInfo.get(e.dataId);if(this.state.numTensors--,e.dtype==="string"&&(this.state.numStringTensors--,this.state.numBytes-=n.bytes),e.dtype!=="complex64"&&e.dtype!=="string"){const r=e.size*jn(e.dtype);this.state.numBytes-=r}n.backend.disposeData(e.dataId)&&this.removeDataId(e.dataId,n.backend)}disposeVariables(){for(const e in this.state.registeredVariables){const n=this.state.registeredVariables[e];this.disposeVariable(n)}}disposeVariable(e){this.disposeTensor(e),this.state.registeredVariables[e.name]!=null&&delete this.state.registeredVariables[e.name]}memory(){const e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(e.unreliable=!0,e.reasons==null&&(e.reasons=[]),e.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),e}async profile(e){this.state.profiling=!0;const n=this.state.numBytes,r=this.state.numTensors;this.state.activeProfile.kernels=[],this.state.activeProfile.result=await e(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(s=>s.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-n,this.state.activeProfile.newTensors=this.state.numTensors-r;for(const s of this.state.activeProfile.kernels)s.kernelTimeMs=await s.kernelTimeMs,s.extraInfo=await s.extraInfo;return this.state.activeProfile}isTapeOn(){return this.state.gradientDepth>0&&this.state.kernelDepth===0}addTapeNode(e,n,r,s,a,o){const i={id:this.state.nextTapeNodeId++,kernelName:e,inputs:n,outputs:r,saved:a},u=Br(e);u!=null&&(s=u.gradFunc),s!=null&&(i.gradient=l=>(l=l.map((p,c)=>{if(p==null){const f=r[c],d=or(f.size,f.dtype);return this.makeTensor(d,f.shape,f.dtype)}return p}),s(l.length>1?l:l[0],a,o))),this.state.activeTape.push(i)}keep(e){return e.kept=!0,e}startTape(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(e){const n={track:[],name:"unnamed scope",id:this.state.nextScopeId++};e&&(n.name=e),this.state.scopeStack.push(n),this.state.activeScope=n}endScope(e){const n=Ts(e),r=new Set(n.map(a=>a.id));for(let a=0;a<this.state.activeScope.track.length;a++){const o=this.state.activeScope.track[a];!o.kept&&!r.has(o.id)&&o.dispose()}const s=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],n.forEach(a=>{!a.kept&&a.scopeId===s.id&&this.track(a)})}gradients(e,n,r,s=!1){if(g(n.length>0,()=>"gradients() received an empty list of xs."),r!=null&&r.dtype!=="float32")throw new Error(`dy must have 'float32' dtype, but has '${r.dtype}'`);const a=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy("forward",e));g(a instanceof te,()=>"The result y returned by f() must be a tensor.");const o=Qf(this.state.activeTape,n,a);if(!s&&o.length===0&&n.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",()=>{const i={};i[a.id]=r??cd(a.shape),ed(i,o,l=>this.tidy(l),pd);const u=n.map(l=>i[l.id]);return this.state.gradientDepth===0&&(this.state.activeTape.forEach(l=>{for(const p of l.saved)p.dispose()}),this.state.activeTape=null),{value:a,grads:u}})}customGrad(e){return g(ot(e),()=>"The f passed in customGrad(f) must be a function."),(...n)=>{g(n.every(i=>i instanceof te),()=>"The args passed in customGrad(f)(x1, x2,...) must all be tensors");let r;const s={};n.forEach((i,u)=>{s[u]=i});const a=(i,u)=>(r=e(...n,u),g(r.value instanceof te,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),g(ot(r.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),r.value),o=(i,u)=>{const l=r.gradFunc(i,u),p=Array.isArray(l)?l:[l];g(p.length===n.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),g(p.every(f=>f instanceof te),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");const c={};return p.forEach((f,d)=>{c[d]=()=>f}),c};return this.runKernelFunc({forwardFunc:a,backwardsFunc:o,inputs:s})}}readSync(e){return this.state.tensorInfo.get(e).backend.readSync(e)}read(e){return this.state.tensorInfo.get(e).backend.read(e)}readToGPU(e,n){return this.state.tensorInfo.get(e).backend.readToGPU(e,n)}async time(e){const n=dn(),r=await this.backend.time(e);return r.wallMs=dn()-n,r}track(e){return this.state.activeScope!=null&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e}get registeredVariables(){return this.state.registeredVariables}reset(){this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new Va;for(const e in this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}}Kt.nextTensorId=0;Kt.nextVariableId=0;function cd(t){const e=hs(q(t),"float32");return N.makeTensor(e,t,"float32")}function Il(){const t=Eo();if(t._tfengine==null){const e=new To(t);t._tfengine=new Kt(e)}return ff(t._tfengine.ENV),rd(()=>t._tfengine),t._tfengine}const N=Il();function pd(t,e){const n={a:t,b:e};return N.runKernel(ms,n)}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function hd(){return typeof navigator<"u"&&navigator!=null}let Ur;function fd(t){Ur=t}function dd(t){if(Ur!==void 0)return Ur;if(t||hd()){if(t||(t=navigator),t.product==="ReactNative")return!0;const e=t.userAgent||t.vendor||(typeof window<"u"?window.opera:"");if(!e){const n=t;return n.userAgentData&&n.userAgentData.mobile}return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4))}return!1}function Al(){return typeof window<"u"&&window.document!=null||typeof WorkerGlobalScope<"u"}var md=Object.freeze({__proto__:null,isBrowser:Al,isMobile:dd,mockIsMobile:fd});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const de=C();de.registerFlag("DEBUG",()=>!1,t=>{t&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")});de.registerFlag("IS_BROWSER",()=>Al());de.registerFlag("IS_NODE",()=>typeof process<"u"&&typeof process.versions<"u"&&typeof process.versions.node<"u");de.registerFlag("IS_CHROME",()=>typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor));de.registerFlag("IS_SAFARI",()=>typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor));de.registerFlag("PROD",()=>!1);de.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",()=>de.getBool("DEBUG"));de.registerFlag("DEPRECATION_WARNINGS_ENABLED",()=>!0);de.registerFlag("IS_TEST",()=>!1);de.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",()=>de.getBool("DEBUG"));de.registerFlag("WRAP_TO_IMAGEBITMAP",()=>!1);de.registerFlag("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU",()=>!1);de.registerFlag("USE_SETTIMEOUTCUSTOM",()=>!1);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ze(t,e){let n=t;if(ae(t))return e==="string"?[]:[t.length];if($l(t)){const s=t.channels||"RGBA";return[t.height,t.width*s.length]}else if(kl(t))return[t.buffer.size/(e==null?4:jn(e))];if(!Array.isArray(t))return[];const r=[];for(;Array.isArray(n)||ae(n)&&e!=="string";)r.push(n.length),n=n[0];return Array.isArray(t)&&C().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&Dl(t,r,[]),r}function Dl(t,e,n){if(n=n||[],!Array.isArray(t)&&!ae(t)){g(e.length===0,()=>`Element arr[${n.join("][")}] is a primitive, but should be an array/TypedArray of ${e[0]} elements`);return}g(e.length>0,()=>`Element arr[${n.join("][")}] should be a primitive, but is an array of ${t.length} elements`),g(t.length===e[0],()=>`Element arr[${n.join("][")}] should have ${e[0]} elements, but has ${t.length} elements`);const r=e.slice(1);for(let s=0;s<t.length;++s)Dl(t[s],r,n.concat(s))}function Ma(t,e,n,r){if(t!=="string_or_numeric"){if(t==null)throw new Error("Expected dtype cannot be null.");if(t!=="numeric"&&t!==e||t==="numeric"&&e==="string")throw new Error(`Argument '${n}' passed to '${r}' must be ${t} tensor, but got ${e} tensor`)}}function m(t,e,n,r="numeric"){if(t instanceof vl())return Ma(r,t.dtype,e,n),t;let s=kn(t);if(s!=="string"&&["bool","int32","float32"].indexOf(r)>=0&&(s=r),Ma(r,s,e,n),t==null||!ae(t)&&!Array.isArray(t)&&typeof t!="number"&&typeof t!="boolean"&&typeof t!="string"){const u=t==null?"null":t.constructor.name;throw new Error(`Argument '${e}' passed to '${n}' must be a Tensor or TensorLike, but got '${u}'`)}const a=ze(t,s);!ae(t)&&!Array.isArray(t)&&(t=[t]);const i=s!=="string"?ir(t,s):ut(t,[],!0);return N.makeTensor(i,a,s)}function gn(t,e,n,r="numeric"){if(!Array.isArray(t))throw new Error(`Argument ${e} passed to ${n} must be a \`Tensor[]\` or \`TensorLike[]\``);return t.map((a,o)=>m(a,`${e}[${o}]`,n,r))}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Es="__op";function w(t){const e=Object.keys(t);if(e.length!==1)throw new Error(`Please provide an object with a single key (operation name) mapping to a function. Got an object with ${e.length} keys.`);let n=e[0];const r=t[n];n.endsWith("_")&&(n=n.substring(0,n.length-1)),n=n+Es;const s=(...a)=>{N.startScope(n);try{const o=r(...a);return it(o)&&console.error("Cannot return a Promise inside of tidy."),N.endScope(o),o}catch(o){throw N.endScope(null),o}};return Object.defineProperty(s,"name",{value:n,configurable:!0}),s}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function gd(t,e){const n=m(t,"real","complex"),r=m(e,"imag","complex");fe(n.shape,r.shape,`real and imag shapes, ${n.shape} and ${r.shape}, must match in call to tf.complex().`);const s={real:n,imag:r};return N.runKernel(jo,s)}const Je=w({complex_:gd});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ft(t,e,n,r){if(r==null)r=kn(t);else if(r==="complex64")throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(kl(t)||$l(t)){if(r!=="float32"&&r!=="int32")throw new Error(`Creating tensor from GPU data only supports 'float32'|'int32' dtype, while the dtype is ${r}.`);return N.backend.createTensorFromGPUData(t,e||n,r)}if(!ae(t)&&!Array.isArray(t)&&typeof t!="number"&&typeof t!="boolean"&&typeof t!="string")throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(e!=null){Se(e);const s=q(e),a=q(n);g(s===a,()=>`Based on the provided shape, [${e}], the tensor should have ${s} values but has ${a}`);for(let o=0;o<n.length;++o){const i=n[o],u=o===n.length-1?i!==q(e.slice(o)):!0;g(n[o]===e[o]||!u,()=>`Error creating a new Tensor. Inferred shape (${n}) does not match the provided shape (${e}). `)}}return!ae(t)&&!Array.isArray(t)&&(t=[t]),e=e||n,t=r!=="string"?ir(t,r):ut(t,[],!0),N.makeTensor(t,e,r)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Fe(t,e,n){const r=ze(t,n);return ft(t,e,r,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const kt={float32:4,float16:2,int32:4,uint16:2,uint8:1,bool:1,complex64:8};class Le{static join(e){return new Le(e).slice()}constructor(e){if(this.shards=[],this.previousShardIndex=0,e==null||(e instanceof Array||(e=[e]),e=e.map(r=>ae(r)?r.buffer:r),e.length===0))return;this.bufferUniformSize=e[0].byteLength;let n=0;for(let r=0;r<e.length;r++){const s=e[r];r!==e.length-1&&s.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);const a=n+s.byteLength;this.shards.push({buffer:s,start:n,end:a}),n=a}this.shards.length===0&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}slice(e=0,n=this.byteLength){if(this.shards.length===0)return new ArrayBuffer(0);if(e=isNaN(Number(e))?0:e,n=isNaN(Number(n))?0:n,e=Math.max(0,e),n=Math.min(this.byteLength,n),n<=e)return new ArrayBuffer(0);const r=this.findShardForByte(e);if(r===-1)throw new Error(`Could not find start shard for byte ${e}`);const s=n-e,a=new ArrayBuffer(s),o=new Uint8Array(a);let i=0;for(let u=r;u<this.shards.length;u++){const l=this.shards[u],c=e+i-l.start,f=i,y=Math.min(n,l.end)-l.start,S=new Uint8Array(l.buffer,c,y-c);if(o.set(S,f),i+=S.length,n<l.end)break}return a}findShardForByte(e){if(this.shards.length===0||e<0||e>=this.byteLength)return-1;if(this.bufferUniformSize!=null)return this.previousShardIndex=Math.floor(e/this.bufferUniformSize),this.previousShardIndex;function n(s){return e<s.start?-1:e>=s.end?1:0}if(n(this.shards[this.previousShardIndex])===0)return this.previousShardIndex;const r=yd(this.shards,n);return r===-1?-1:(this.previousShardIndex=r,this.previousShardIndex)}}function yd(t,e){let n=0,r=t.length;for(;n<=r;){const s=Math.floor((r-n)/2)+n,a=e(t[s]);if(a===0)return s;a<0?r=s:n=s+1}return-1}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bd(){C().set("PROD",!0)}function wd(){C().set("DEBUG",!0)}function Nd(){C().set("DEPRECATION_WARNINGS_ENABLED",!1),console.warn("TensorFlow.js deprecation warnings have been disabled.")}function Sd(t){C().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(t+" You can disable deprecation warnings with tf.disableDeprecationWarnings().")}function Td(){N.disposeVariables()}function Ed(){return N}function vd(){return N.memory()}function $d(t){return N.profile(t)}function M(t,e){return N.tidy(t,e)}function he(t){Ts(t).forEach(n=>n.dispose())}function Oe(t){return N.keep(t)}function kd(t){return N.time(t)}function _d(t){return N.setBackend(t)}function xd(){return N.ready()}function Ol(){return N.backendName}function Id(t){N.removeBackend(t)}function Ad(t){return N.findBackend(t)}function Dd(t){return N.findBackendFactory(t)}function Od(t,e,n=1){return N.registerBackend(t,e,n)}function Fl(){return N.backend}function Fd(t,e){C().setPlatform(t,e)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const lt=4;async function Rd(t,e){const n=[],r=[],s=Array.isArray(t)?t.map(o=>o.name):Object.keys(t);for(let o=0;o<s.length;++o){const i=s[o],u=Array.isArray(t)?t[o].tensor:t[i];if(u.dtype!=="float32"&&u.dtype!=="int32"&&u.dtype!=="bool"&&u.dtype!=="string"&&u.dtype!=="complex64")throw new Error(`Unsupported dtype in weight '${i}': ${u.dtype}`);const l={name:i,shape:u.shape,dtype:u.dtype};if(u.dtype==="string"){const p=new Promise(async c=>{const f=await u.bytes(),d=f.reduce((b,T)=>b+T.length,0)+lt*f.length,y=new Uint8Array(d);let S=0;for(let b=0;b<f.length;b++){const T=f[b],A=new Uint8Array(new Uint32Array([T.length]).buffer);y.set(A,S),S+=lt,y.set(T,S),S+=T.length}c(y)});r.push(p)}else r.push(u.data());e!=null&&(l.group=e),n.push(l)}const a=await Promise.all(r);return{data:Ld(a),specs:n}}function Rl(t,e){const n=new Le(t),r={};let s=0;for(const a of e){const o=Cd(a,(i,u)=>n.slice(s+i,s+u));r[a.name]=Cl(a,n.slice(s,s+o)),s+=o}return r}function Cd(t,e){const n=q(t.shape);let r;if("quantization"in t){const s=t.quantization;r=kt[s.dtype]}else if(t.dtype==="string"){let s=0;for(let a=0;a<n;a++)s+=lt+new Uint32Array(e(s,s+lt))[0];return s}else r=kt[t.dtype];return n*r}async function Bd(t,e){const n=q(t.shape);let r;if("quantization"in t){const s=t.quantization;r=kt[s.dtype]}else if(t.dtype==="string"){let s=0;for(let a=0;a<n;a++)s+=lt+new Uint32Array(await e(s,s+lt))[0];return s}else r=kt[t.dtype];return n*r}function Cl(t,e){const n=t.name,r=t.dtype,s=t.shape,a=q(s);let o,i=0;if("quantization"in t){const u=t.quantization;if(u.dtype==="uint8"||u.dtype==="uint16"){if(!("min"in u&&"scale"in u))throw new Error(`Weight ${t.name} with quantization ${u.dtype} doesn't have corresponding metadata min and scale.`)}else if(u.dtype==="float16"){if(r!=="float32")throw new Error(`Weight ${t.name} is quantized with ${u.dtype} which only supports weights of type float32 not ${r}.`)}else throw new Error(`Weight ${t.name} has unknown quantization dtype ${u.dtype}. Supported quantization dtypes are: 'uint8', 'uint16', and 'float16'.`);const l=kt[u.dtype],p=u.dtype==="uint8"?new Uint8Array(e):new Uint16Array(e);if(r==="float32")if(u.dtype==="uint8"||u.dtype==="uint16"){o=new Float32Array(p.length);for(let c=0;c<p.length;c++){const f=p[c];o[c]=f*u.scale+u.min}}else if(u.dtype==="float16")o=Ud()(p);else throw new Error(`Unsupported quantization type ${u.dtype} for weight type float32.`);else if(r==="int32"){if(u.dtype!=="uint8"&&u.dtype!=="uint16")throw new Error(`Unsupported quantization type ${u.dtype} for weight type int32.`);o=new Int32Array(p.length);for(let c=0;c<p.length;c++){const f=p[c];o[c]=Math.round(f*u.scale+u.min)}}else throw new Error(`Unsupported dtype in weight '${n}': ${r}`);i+=a*l}else if(r==="string"){const u=q(t.shape);o=[];for(let l=0;l<u;l++){const p=new Uint32Array(e.slice(i,i+lt))[0];i+=lt;const c=new Uint8Array(e.slice(i,i+p));o.push(c),i+=p}}else{const u=kt[r];if(r==="float32")o=new Float32Array(e);else if(r==="int32")o=new Int32Array(e);else if(r==="bool")o=new Uint8Array(e);else if(r==="complex64"){o=new Float32Array(e);const l=new Float32Array(o.length/2),p=new Float32Array(o.length/2);for(let y=0;y<l.length;y++)l[y]=o[y*2],p[y]=o[y*2+1];const c=Fe(l,s,"float32"),f=Fe(p,s,"float32"),d=Je(c,f);return c.dispose(),f.dispose(),d}else throw new Error(`Unsupported dtype in weight '${n}': ${r}`);i+=a*u}return Fe(o,s,r)}async function Wa(t,e,n){let r=new Uint8Array(e);for(;r.byteLength<n;){const{done:s,value:a}=await t.read();if(s&&a==null){const i=n-r.byteLength;throw new Error(`Reader is done but ${i} bytes are still expected`)}const o=new Uint8Array(r.length+a.byteLength);o.set(r,0),o.set(new Uint8Array(a),r.length),r=o}return r.buffer}async function Bl(t,e){const n={},r=t.getReader();let s=new ArrayBuffer(0);for(const a of e){const o=await Bd(a,async(l,p)=>(s=await Wa(r,s,p),s.slice(l,p)));s=await Wa(r,s,o);const i=s.slice(0,o);s=s.slice(o);const u=Cl(a,i);if(n[a.name]=u,Ol()==="webgpu"){const l=Fl();"uploadToGPU"in l&&q(u.shape)>=C().get("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD")&&l.uploadToGPU(u.dataId)}}return n}function Ld(t){if(t===null)throw new Error(`Invalid input value: ${JSON.stringify(t)}`);let e=0;const n=[];t.forEach(a=>{if(e+=a.byteLength,n.push(a.byteLength===a.buffer.byteLength?a:new a.constructor(a)),!(a instanceof Float32Array||a instanceof Int32Array||a instanceof Uint8Array))throw new Error(`Unsupported TypedArray subtype: ${a.constructor.name}`)});const r=new Uint8Array(e);let s=0;return n.forEach(a=>{r.set(new Uint8Array(a.buffer),s),s+=a.byteLength}),r.buffer}const vs=typeof Buffer<"u"&&(typeof Blob>"u"||typeof atob>"u"||typeof btoa>"u");function qa(t){return vs?Buffer.byteLength(t,"utf8"):new Blob([t]).size}function Pd(t){if(vs)return Buffer.from(t).toString("base64");const e=new Uint8Array(t);let n="";for(let r=0,s=e.length;r<s;r++)n+=String.fromCharCode(e[r]);return btoa(n)}function zd(t){if(vs){const r=Buffer.from(t,"base64");return r.buffer.slice(r.byteOffset,r.byteOffset+r.byteLength)}const e=atob(t),n=new Uint8Array(e.length);for(let r=0;r<e.length;++r)n.set([e.charCodeAt(r)],r);return n.buffer}function Vd(t){return Le.join(t)}function Ua(t){const e="/";for(t=t.trim();t.endsWith(e);)t=t.slice(0,t.length-1);const n=t.split(e);return n[n.length-1]}function Ll(t,e){const n={modelTopology:t.modelTopology,format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,weightsManifest:e};return t.signature!=null&&(n.signature=t.signature),t.userDefinedMetadata!=null&&(n.userDefinedMetadata=t.userDefinedMetadata),t.modelInitializer!=null&&(n.modelInitializer=t.modelInitializer),t.initializerSignature!=null&&(n.initializerSignature=t.initializerSignature),t.trainingConfig!=null&&(n.trainingConfig=t.trainingConfig),n}function $s(t,e,n){const r={modelTopology:t.modelTopology,format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy};if(t.trainingConfig!=null&&(r.trainingConfig=t.trainingConfig),t.weightsManifest!=null){if(!e)throw new Error("modelJSON has weightsManifest but weightSpecs is null");if(!n)throw new Error("modelJSON has weightsManifest but weightData is null");r.weightSpecs=e,r.weightData=n}return t.signature!=null&&(r.signature=t.signature),t.userDefinedMetadata!=null&&(r.userDefinedMetadata=t.userDefinedMetadata),t.modelInitializer!=null&&(r.modelInitializer=t.modelInitializer),t.initializerSignature!=null&&(r.initializerSignature=t.initializerSignature),r}async function ks(t,e){let n,r;return t.weightsManifest!=null&&([n,r]=await e(t.weightsManifest)),$s(t,n,r)}function In(t){if(t.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:t.modelTopology==null?0:qa(JSON.stringify(t.modelTopology)),weightSpecsBytes:t.weightSpecs==null?0:qa(JSON.stringify(t.weightSpecs)),weightDataBytes:t.weightData==null?0:new Le(t.weightData).byteLength}}function Yn(t){const e=[];for(const n of t)e.push(...n.weights);return e}function Md(){const t=n=>{let r=n<<13,s=0;for(;!(r&8388608);)s-=8388608,r<<=1;return r&=-8388609,s+=947912704,r|s},e=new Uint32Array(2048);e[0]=0;for(let n=1;n<1024;n++)e[n]=t(n);for(let n=1024;n<2048;n++)e[n]=939524096+(n-1024<<13);return e}function Wd(){const t=new Uint32Array(64);t[0]=0,t[31]=1199570944,t[32]=2147483648,t[63]=3347054592;for(let e=1;e<31;e++)t[e]=e<<23;for(let e=33;e<63;e++)t[e]=2147483648+(e-32<<23);return t}function qd(){const t=new Uint32Array(64);for(let e=0;e<64;e++)t[e]=1024;return t[0]=t[32]=0,t}function Ud(){const t=Md(),e=Wd(),n=qd();return r=>{const s=new ArrayBuffer(4*r.length),a=new Uint32Array(s);for(let o=0;o<r.length;o++){const i=r[o],u=t[n[i>>10]+(i&1023)]+e[i>>10];a[o]=u}return new Float32Array(s)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Q{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return Q.instance==null&&(Q.instance=new Q),Q.instance}static registerSaveRouter(e){Q.getInstance().saveRouters.push(e)}static registerLoadRouter(e){Q.getInstance().loadRouters.push(e)}static getSaveHandlers(e){return Q.getHandlers(e,"save")}static getLoadHandlers(e,n){return Q.getHandlers(e,"load",n)}static getHandlers(e,n,r){const s=[];return(n==="load"?Q.getInstance().loadRouters:Q.getInstance().saveRouters).forEach(o=>{const i=o(e,r);i!==null&&s.push(i)}),s}}const Gd=t=>Q.registerSaveRouter(t),jd=t=>Q.registerLoadRouter(t),Hd=t=>Q.getSaveHandlers(t),Kd=(t,e)=>Q.getLoadHandlers(t,e);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Gr="tensorflowjs",jr=1,Tt="models_store",rt="model_info_store";function Pl(){if(!C().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");const t=typeof window>"u"?self:window,e=t.indexedDB||t.mozIndexedDB||t.webkitIndexedDB||t.msIndexedDB||t.shimIndexedDB;if(e==null)throw new Error("The current browser does not appear to support IndexedDB.");return e}function Hr(t){const e=t.result;e.createObjectStore(Tt,{keyPath:"modelPath"}),e.createObjectStore(rt,{keyPath:"modelPath"})}class _t{constructor(e){if(this.indexedDB=Pl(),e==null||!e)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=e}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return this.databaseAction(this.modelPath,e)}async load(){return this.databaseAction(this.modelPath)}databaseAction(e,n){return new Promise((r,s)=>{const a=this.indexedDB.open(Gr,jr);a.onupgradeneeded=()=>Hr(a),a.onsuccess=()=>{const o=a.result;if(n==null){const i=o.transaction(Tt,"readonly"),l=i.objectStore(Tt).get(this.modelPath);l.onsuccess=()=>{if(l.result==null)return o.close(),s(new Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));r(l.result.modelArtifacts)},l.onerror=p=>(o.close(),s(l.error)),i.oncomplete=()=>o.close()}else{n.weightData=Le.join(n.weightData);const i=In(n),u=o.transaction(rt,"readwrite");let l=u.objectStore(rt),p;try{p=l.put({modelPath:this.modelPath,modelArtifactsInfo:i})}catch(f){return s(f)}let c;p.onsuccess=()=>{c=o.transaction(Tt,"readwrite");const f=c.objectStore(Tt);let d;try{d=f.put({modelPath:this.modelPath,modelArtifacts:n,modelArtifactsInfo:i})}catch(y){return s(y)}d.onsuccess=()=>r({modelArtifactsInfo:i}),d.onerror=y=>{l=u.objectStore(rt);const S=l.delete(this.modelPath);S.onsuccess=()=>(o.close(),s(d.error)),S.onerror=b=>(o.close(),s(d.error))}},p.onerror=f=>(o.close(),s(p.error)),u.oncomplete=()=>{c==null?o.close():c.oncomplete=()=>o.close()}}},a.onerror=o=>s(a.error)})}}_t.URL_SCHEME="indexeddb://";const zl=t=>C().getBool("IS_BROWSER")&&!Array.isArray(t)&&t.startsWith(_t.URL_SCHEME)?Xd(t.slice(_t.URL_SCHEME.length)):null;Q.registerSaveRouter(zl);Q.registerLoadRouter(zl);function Xd(t){return new _t(t)}function Zd(t){return t.startsWith(_t.URL_SCHEME)?t.slice(_t.URL_SCHEME.length):t}class Jd{constructor(){this.indexedDB=Pl()}async listModels(){return new Promise((e,n)=>{const r=this.indexedDB.open(Gr,jr);r.onupgradeneeded=()=>Hr(r),r.onsuccess=()=>{const s=r.result,a=s.transaction(rt,"readonly"),i=a.objectStore(rt).getAll();i.onsuccess=()=>{const u={};for(const l of i.result)u[l.modelPath]=l.modelArtifactsInfo;e(u)},i.onerror=u=>(s.close(),n(i.error)),a.oncomplete=()=>s.close()},r.onerror=s=>n(r.error)})}async removeModel(e){return e=Zd(e),new Promise((n,r)=>{const s=this.indexedDB.open(Gr,jr);s.onupgradeneeded=()=>Hr(s),s.onsuccess=()=>{const a=s.result,o=a.transaction(rt,"readwrite"),i=o.objectStore(rt),u=i.get(e);let l;u.onsuccess=()=>{if(u.result==null)return a.close(),r(new Error(`Cannot find model with path '${e}' in IndexedDB.`));{const p=i.delete(e),c=()=>{l=a.transaction(Tt,"readwrite");const d=l.objectStore(Tt).delete(e);d.onsuccess=()=>n(u.result.modelArtifactsInfo),d.onerror=y=>r(u.error)};p.onsuccess=c,p.onerror=f=>(c(),a.close(),r(u.error))}},u.onerror=p=>(a.close(),r(u.error)),o.oncomplete=()=>{l==null?a.close():l.oncomplete=()=>a.close()}},s.onerror=a=>r(s.error)})}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ke="/",zt="tensorflowjs_models",Vl="info",Yd="model_topology",Qd="weight_specs",em="weight_data",tm="model_metadata";function Ml(t){return{info:[zt,t,Vl].join(Ke),topology:[zt,t,Yd].join(Ke),weightSpecs:[zt,t,Qd].join(Ke),weightData:[zt,t,em].join(Ke),modelMetadata:[zt,t,tm].join(Ke)}}function Wl(t){for(const e of Object.values(t))window.localStorage.removeItem(e)}function nm(t){const e=t.split(Ke);if(e.length<3)throw new Error(`Invalid key format: ${t}`);return e.slice(1,e.length-1).join(Ke)}function rm(t){return t.startsWith(xt.URL_SCHEME)?t.slice(xt.URL_SCHEME.length):t}class xt{constructor(e){if(!C().getBool("IS_BROWSER")||typeof window>"u"||typeof window.localStorage>"u")throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,e==null||!e)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=e,this.keys=Ml(this.modelPath)}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");{const n=JSON.stringify(e.modelTopology),r=JSON.stringify(e.weightSpecs),s=In(e),a=Le.join(e.weightData);try{this.LS.setItem(this.keys.info,JSON.stringify(s)),this.LS.setItem(this.keys.topology,n),this.LS.setItem(this.keys.weightSpecs,r),this.LS.setItem(this.keys.weightData,Pd(a));const o={format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,signature:e.signature!=null?e.signature:void 0,userDefinedMetadata:e.userDefinedMetadata!=null?e.userDefinedMetadata:void 0,modelInitializer:e.modelInitializer!=null?e.modelInitializer:void 0,initializerSignature:e.initializerSignature!=null?e.initializerSignature:void 0,trainingConfig:e.trainingConfig!=null?e.trainingConfig:void 0};return this.LS.setItem(this.keys.modelMetadata,JSON.stringify(o)),{modelArtifactsInfo:s}}catch{throw Wl(this.keys),new Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${s.modelTopologyBytes}, weightSpecsBytes=${s.weightSpecsBytes}, weightDataBytes=${s.weightDataBytes}.`)}}}async load(){const e=JSON.parse(this.LS.getItem(this.keys.info));if(e==null)throw new Error(`In local storage, there is no model with name '${this.modelPath}'`);if(e.modelTopologyType!=="JSON")throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");const n={},r=JSON.parse(this.LS.getItem(this.keys.topology));if(r==null)throw new Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);n.modelTopology=r;const s=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(s==null)throw new Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);n.weightSpecs=s;const a=this.LS.getItem(this.keys.modelMetadata);if(a!=null){const i=JSON.parse(a);n.format=i.format,n.generatedBy=i.generatedBy,n.convertedBy=i.convertedBy,i.signature!=null&&(n.signature=i.signature),i.userDefinedMetadata!=null&&(n.userDefinedMetadata=i.userDefinedMetadata),i.modelInitializer!=null&&(n.modelInitializer=i.modelInitializer),i.initializerSignature!=null&&(n.initializerSignature=i.initializerSignature),i.trainingConfig!=null&&(n.trainingConfig=i.trainingConfig)}const o=this.LS.getItem(this.keys.weightData);if(o==null)throw new Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return n.weightData=zd(o),n}}xt.URL_SCHEME="localstorage://";const ql=t=>C().getBool("IS_BROWSER")&&!Array.isArray(t)&&t.startsWith(xt.URL_SCHEME)?sm(t.slice(xt.URL_SCHEME.length)):null;Q.registerSaveRouter(ql);Q.registerLoadRouter(ql);function sm(t){return new xt(t)}class am{constructor(){g(C().getBool("IS_BROWSER"),()=>"Current environment is not a web browser"),g(typeof window>"u"||typeof window.localStorage<"u",()=>"Current browser does not appear to support localStorage"),this.LS=window.localStorage}async listModels(){const e={},n=zt+Ke,r=Ke+Vl;for(let s=0;s<this.LS.length;++s){const a=this.LS.key(s);if(a.startsWith(n)&&a.endsWith(r)){const o=nm(a);e[o]=JSON.parse(this.LS.getItem(a))}}return e}async removeModel(e){e=rm(e);const n=Ml(e);if(this.LS.getItem(n.info)==null)throw new Error(`Cannot find model at path '${e}'`);const r=JSON.parse(this.LS.getItem(n.info));return Wl(n),r}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Mt="://";class le{constructor(){this.managers={}}static getInstance(){return le.instance==null&&(le.instance=new le),le.instance}static registerManager(e,n){g(e!=null,()=>"scheme must not be undefined or null."),e.endsWith(Mt)&&(e=e.slice(0,e.indexOf(Mt))),g(e.length>0,()=>"scheme must not be an empty string.");const r=le.getInstance();g(r.managers[e]==null,()=>`A model store manager is already registered for scheme '${e}'.`),r.managers[e]=n}static getManager(e){const n=le.getInstance().managers[e];if(n==null)throw new Error(`Cannot find model manager for scheme '${e}'`);return n}static getSchemes(){return Object.keys(le.getInstance().managers)}}function qn(t){if(t.indexOf(Mt)===-1)throw new Error(`The url string provided does not contain a scheme. Supported schemes are: ${le.getSchemes().join(",")}`);return{scheme:t.split(Mt)[0],path:t.split(Mt)[1]}}async function Ul(t,e,n=!1){g(t!==e,()=>`Old path and new path are the same: '${t}'`);const r=Q.getLoadHandlers(t);g(r.length>0,()=>`Copying failed because no load handler is found for source URL ${t}.`),g(r.length<2,()=>`Copying failed because more than one (${r.length}) load handlers for source URL ${t}.`);const s=r[0],a=Q.getSaveHandlers(e);g(a.length>0,()=>`Copying failed because no save handler is found for destination URL ${e}.`),g(a.length<2,()=>`Copying failed because more than one (${r.length}) save handlers for destination URL ${e}.`);const o=a[0],i=qn(t).scheme,u=qn(t).path,l=i===qn(t).scheme,p=await s.load();n&&l&&await le.getManager(i).removeModel(u);const c=await o.save(p);return n&&!l&&await le.getManager(i).removeModel(u),c.modelArtifactsInfo}async function om(){const t=le.getSchemes(),e={};for(const n of t){const r=await le.getManager(n).listModels();for(const s in r){const a=n+Mt+s;e[a]=r[s]}}return e}async function im(t){const e=qn(t);return le.getManager(e.scheme).removeModel(e.path)}async function um(t,e){return Ul(t,e,!1)}async function lm(t,e){return Ul(t,e,!0)}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class cm{constructor(){this.messageName="setTimeoutCustom",this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}fetch(e,n){return fetch(e,n)}now(){return performance.now()}encode(e,n){if(n!=="utf-8"&&n!=="utf8")throw new Error(`Browser's encoder only supports utf-8, but got ${n}`);return this.textEncoder==null&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(e)}decode(e,n){return new TextDecoder(n).decode(e)}setTimeoutCustom(e,n){if(typeof window>"u"||!C().getBool("USE_SETTIMEOUTCUSTOM")){setTimeout(e,n);return}this.functionRefs.push(e),setTimeout(()=>{window.postMessage({name:this.messageName,index:this.functionRefs.length-1},"*")},n),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener("message",r=>{if(r.source===window&&r.data.name===this.messageName){r.stopPropagation();const s=this.functionRefs[r.data.index];s(),this.handledMessageCount++,this.handledMessageCount===this.functionRefs.length&&(this.functionRefs=[],this.handledMessageCount=0)}},!0))}isTypedArray(e){return dl(e)}}if(C().get("IS_BROWSER")){C().setPlatform("browser",new cm);try{le.registerManager(xt.URL_SCHEME,new am)}catch{}try{le.registerManager(_t.URL_SCHEME,new Jd)}catch{}}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const pm={importFetch:()=>require("node-fetch")};let _r;class hm{constructor(){this.util=require("util"),this.textEncoder=new this.util.TextEncoder}fetch(e,n){return C().global.fetch!=null?C().global.fetch(e,n):(_r==null&&(_r=pm.importFetch()),_r(e,n))}now(){const e=process.hrtime();return e[0]*1e3+e[1]/1e6}encode(e,n){if(n!=="utf-8"&&n!=="utf8")throw new Error(`Node built-in encoder only supports utf-8, but got ${n}`);return this.textEncoder.encode(e)}decode(e,n){return e.length===0?"":new this.util.TextDecoder(n).decode(e)}isTypedArray(e){return this.util.types.isFloat32Array(e)||this.util.types.isInt32Array(e)||this.util.types.isUint8Array(e)||this.util.types.isUint8ClampedArray(e)}}C().get("IS_NODE")&&!C().get("IS_BROWSER")&&C().setPlatform("node",new hm);/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ve(t,e="float32",n){return e=e||"float32",Se(t),new Jn(t,e,n)}/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fm(t,e){const n=m(t,"x","cast");if(!yo(e))throw new Error(`Failed to cast to unknown dtype ${e}`);if(e==="string"&&n.dtype!=="string"||e!=="string"&&n.dtype==="string")throw new Error("Only strings can be casted to strings");const r={x:n},s={dtype:e};return N.runKernel(gs,r,s)}const X=w({cast_:fm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function dm(t){const n={x:m(t,"x","clone","string_or_numeric")};return N.runKernel(bs,n)}const Xe=w({clone_:dm});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _s(t,e=!1){console.log(t.toString(e))}/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Il();const mm={buffer:Ve,cast:X,clone:Xe,print:_s};sd(mm);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function gm(t,e){let n=m(t,"a","add"),r=m(e,"b","add");[n,r]=ee(n,r);const s={a:n,b:r};return N.runKernel(ms,s)}const R=w({add_:gm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ym(t,e){let n=m(t,"a","floorDiv"),r=m(e,"b","floorDiv");[n,r]=ee(n,r);const s={a:n,b:r};return N.runKernel(vi,s)}const xs=w({floorDiv_:ym});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bm(t,e){let n=m(t,"a","div"),r=m(e,"b","div");if([n,r]=ee(n,r),n.dtype==="int32"&&r.dtype==="int32")return xs(n,r);const s={a:n,b:r},a={};return N.runKernel(hi,s,a)}const K=w({div_:bm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function wm(t,e){let n=m(t,"a","mul"),r=m(e,"b","mul");[n,r]=ee(n,r);const s={a:n,b:r};return N.runKernel(nu,s)}const I=w({mul_:wm});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Nm(t){const e=m(t,"x","abs");if(e.dtype==="complex64"){const n={x:e};return N.runKernel(Ho,n)}else{const n={x:e};return N.runKernel(vo,n)}}const be=w({abs_:Nm});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Sm(t){const n={x:m(t,"x","acos")};return N.runKernel($o,n)}const Gl=w({acos_:Sm});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Tm(t){const n={x:m(t,"x","acosh")};return N.runKernel(ko,n)}const jl=w({acosh_:Tm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Em(t){g(Array.isArray(t),()=>"The argument passed to tf.addN() must be a list of tensors"),g(t.length>=1,()=>`Must pass at least one tensor to tf.addN(), but got ${t.length}`);const e=t.map((s,a)=>m(s,`tensors${a}`,"addN")),n=e[0];e.forEach(s=>{if(s.dtype!==n.dtype)throw new Error("All tensors passed to tf.addN() must have the same dtype")}),e.forEach(s=>{if(!Ce(s.shape,n.shape))throw new Error("All tensors passed to tf.addN() must have the same shape")});const r=e;return N.runKernel(_o,r)}const Hl=w({addN_:Em});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function vm(t,e=null,n=!1){const s={x:m(t,"x","all","bool")},a={axis:e,keepDims:n};return N.runKernel(xo,s,a)}const Kl=w({all_:vm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $m(t,e=null,n=!1){const s={x:m(t,"x","any","bool")},a={axis:e,keepDims:n};return N.runKernel(Io,s,a)}const Xl=w({any_:$m});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function km(t,e=0){const r={x:m(t,"x","argMax")},s={axis:e};return N.runKernel(Ao,r,s)}const Zl=w({argMax_:km});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _m(t,e=0){const r={x:m(t,"x","argMin")},s={axis:e};return N.runKernel(Do,r,s)}const Jl=w({argMin_:_m});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function xm(t){const n={x:m(t,"x","asin")};return N.runKernel(Oo,n)}const Yl=w({asin_:xm});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Im(t){const n={x:m(t,"x","asinh")};return N.runKernel(Fo,n)}const Ql=w({asinh_:Im});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Am(t){const n={x:m(t,"x","atan")};return N.runKernel(Ro,n)}const ec=w({atan_:Am});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Dm(t,e){let n=m(t,"a","atan2"),r=m(e,"b","atan2");[n,r]=ee(n,r);const s={a:n,b:r};return N.runKernel(Bo,s)}const tc=w({atan2_:Dm});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Om(t){const n={x:m(t,"x","atanh")};return N.runKernel(Co,n)}const nc=w({atanh_:Om});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Fm(t,e,n,r,s="NHWC",a){const o=t[3],i=[...e,o],u=ac(s);return An(t,i,n,a,r,null,null,u)}function rc(t,e,n,r,s,a,o="channelsLast"){const[i,u]=yn(e);let l;if(o==="channelsLast")l=[i,u,t[3],t[3]];else if(o==="channelsFirst")l=[i,u,t[1],t[1]];else throw new Error(`Unknown dataFormat ${o}`);return An(t,l,n,r,s,a,!1,o)}function Rm(t,e,n,r,s,a,o="NDHWC"){const[i,u,l]=Kr(e);let p,c;if(o==="NDHWC")c="channelsLast",p=[i,u,l,t[4],t[4]];else if(o==="NCDHW")c="channelsFirst",p=[i,u,l,t[1],t[1]];else throw new Error(`Unknown dataFormat ${o}`);return sc(t,p,n,r,s,!1,c,a)}function An(t,e,n,r,s,a,o=!1,i="channelsLast"){let[u,l,p,c]=[-1,-1,-1,-1];if(i==="channelsLast")[u,l,p,c]=t;else if(i==="channelsFirst")[u,c,l,p]=t;else throw new Error(`Unknown dataFormat ${i}`);const[f,d,,y]=e,[S,b]=yn(n),[T,A]=yn(r),E=Wt(f,T),v=Wt(d,A),{padInfo:k,outHeight:_,outWidth:D}=Lm(s,l,p,S,b,E,v,a,i),O=o?y*c:y;let F;return i==="channelsFirst"?F=[u,O,_,D]:i==="channelsLast"&&(F=[u,_,D,O]),{batchSize:u,dataFormat:i,inHeight:l,inWidth:p,inChannels:c,outHeight:_,outWidth:D,outChannels:O,padInfo:k,strideHeight:S,strideWidth:b,filterHeight:f,filterWidth:d,effectiveFilterHeight:E,effectiveFilterWidth:v,dilationHeight:T,dilationWidth:A,inShape:t,outShape:F,filterShape:e}}function sc(t,e,n,r,s,a=!1,o="channelsLast",i){let[u,l,p,c,f]=[-1,-1,-1,-1,-1];if(o==="channelsLast")[u,l,p,c,f]=t;else if(o==="channelsFirst")[u,f,l,p,c]=t;else throw new Error(`Unknown dataFormat ${o}`);const[d,y,S,,b]=e,[T,A,E]=Kr(n),[v,k,_]=Kr(r),D=Wt(d,v),O=Wt(y,k),F=Wt(S,_),{padInfo:L,outDepth:B,outHeight:W,outWidth:U}=Pm(s,l,p,c,T,A,E,D,O,F,i),Y=a?b*f:b;let re;return o==="channelsFirst"?re=[u,Y,B,W,U]:o==="channelsLast"&&(re=[u,B,W,U,Y]),{batchSize:u,dataFormat:o,inDepth:l,inHeight:p,inWidth:c,inChannels:f,outDepth:B,outHeight:W,outWidth:U,outChannels:Y,padInfo:L,strideDepth:T,strideHeight:A,strideWidth:E,filterDepth:d,filterHeight:y,filterWidth:S,effectiveFilterDepth:D,effectiveFilterHeight:O,effectiveFilterWidth:F,dilationDepth:v,dilationHeight:k,dilationWidth:_,inShape:t,outShape:re,filterShape:e}}function Cm(t,e,n,r,s){r==null&&(r=Is(t,e,n));const a=t[0],o=t[1],i=bn((a-e+2*r)/n+1,s),u=bn((o-e+2*r)/n+1,s);return[i,u]}function Bm(t,e,n,r,s,a){s==null&&(s=Is(t,e[0],r[0]));const o=[0,0,0,n];for(let i=0;i<3;i++)t[i]+2*s>=e[i]&&(o[i]=bn((t[i]-e[i]+2*s)/r[i]+1,a));return o}function Is(t,e,n,r=1){const s=Wt(e,r);return Math.floor((t[0]*(n-1)-n+s)/2)}function yn(t){return typeof t=="number"?[t,t,t]:t.length===2?[t[0],t[1],1]:t}function Kr(t){return typeof t=="number"?[t,t,t]:t}function Wt(t,e){return e<=1?t:t+(t-1)*(e-1)}function Lm(t,e,n,r,s,a,o,i,u){let l,p,c;if(typeof t=="number"){l={top:t,bottom:t,left:t,right:t,type:t===0?"VALID":"NUMBER"};const d=Cm([e,n],a,r,t,i);p=d[0],c=d[1]}else if(t==="same"){p=Math.ceil(e/r),c=Math.ceil(n/s);const f=Math.max(0,(p-1)*r+a-e),d=Math.max(0,(c-1)*s+o-n),y=Math.floor(f/2),S=f-y,b=Math.floor(d/2),T=d-b;l={top:y,bottom:S,left:b,right:T,type:"SAME"}}else if(t==="valid")l={top:0,bottom:0,left:0,right:0,type:"VALID"},p=Math.ceil((e-a+1)/r),c=Math.ceil((n-o+1)/s);else if(typeof t=="object"){const f=u==="channelsLast"?t[1][0]:t[2][0],d=u==="channelsLast"?t[1][1]:t[2][1],y=u==="channelsLast"?t[2][0]:t[3][0],S=u==="channelsLast"?t[2][1]:t[3][1];l={top:f,bottom:d,left:y,right:S,type:f===0&&d===0&&y===0&&S===0?"VALID":"EXPLICIT"},p=bn((e-a+f+d)/r+1,i),c=bn((n-o+y+S)/s+1,i)}else throw Error(`Unknown padding parameter: ${t}`);return{padInfo:l,outHeight:p,outWidth:c}}function Pm(t,e,n,r,s,a,o,i,u,l,p){let c,f,d,y;if(t==="valid"&&(t=0),typeof t=="number"){c={top:t,bottom:t,left:t,right:t,front:t,back:t,type:t===0?"VALID":"NUMBER"};const b=Bm([e,n,r,1],[i,u,l],1,[s,a,o],t,p);f=b[0],d=b[1],y=b[2]}else if(t==="same"){f=Math.ceil(e/s),d=Math.ceil(n/a),y=Math.ceil(r/o);const S=(f-1)*s+i-e,b=(d-1)*a+u-n,T=(y-1)*o+l-r,A=Math.floor(S/2),E=S-A,v=Math.floor(b/2),k=b-v,_=Math.floor(T/2),D=T-_;c={top:v,bottom:k,left:_,right:D,front:A,back:E,type:"SAME"}}else throw Error(`Unknown padding parameter: ${t}`);return{padInfo:c,outDepth:f,outHeight:d,outWidth:y}}function bn(t,e){if(!e)return Math.trunc(t);switch(e){case"round":return Math.round(t);case"ceil":return Math.ceil(t);case"floor":return Math.floor(t);default:throw new Error(`Unknown roundingMode ${e}`)}}function wn(t){const[e,n,r]=yn(t);return e===1&&n===1&&r===1}function Ye(t,e){return wn(t)||wn(e)}function It(t){return yn(t).every(e=>e>0)}function ac(t){if(t==="NHWC")return"channelsLast";if(t==="NCHW")return"channelsFirst";throw new Error(`Unknown dataFormat ${t}`)}function Ae(t,e,n){if(n!=null){if(typeof e=="string")throw Error(`Error in ${t}: pad must be an integer when using dimRoundingMode ${n} but got pad ${e}.`);if(typeof e=="number")g(Gt(e),()=>`Error in ${t}: pad must be an integer when using dimRoundingMode ${n} but got pad ${e}.`);else if(typeof e=="object")e.forEach(r=>{r.forEach(s=>{g(Gt(s),()=>`Error in ${t}: pad must be an integer when using dimRoundingMode ${n} but got pad ${s}.`)})});else throw Error(`Error in ${t}: Unknown padding parameter: ${e}`)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zm(t,e){const r={x:m(t,"x","reshape","string_or_numeric")},s={shape:e};return N.runKernel(Tu,r,s)}const $=w({reshape_:zm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Vm(t,e,n,r,s){const a=m(t,"x","avgPool","float32"),o=1;g(Ye(n,o),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${n} and dilations '${o}'`);let i=a,u=!1;a.rank===3&&(u=!0,i=$(a,[1,a.shape[0],a.shape[1],a.shape[2]])),g(i.rank===4,()=>`Error in avgPool: x must be rank 4 but got rank ${i.rank}.`),Ae("avgPool",r,s);const l={x:i},p={filterSize:e,strides:n,pad:r,dimRoundingMode:s};let c=N.runKernel(Lo,l,p);return c=X(c,a.dtype),u?$(c,[c.shape[1],c.shape[2],c.shape[3]]):c}const As=w({avgPool_:Vm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Mm(t,e,n,r,s,a="NDHWC"){const o=m(t,"x","avgPool3d","float32");let i=o,u=!1;o.rank===4&&(u=!0,i=$(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),g(i.rank===5,()=>`Error in avgPool3d: x must be rank 5 but got rank ${i.rank}.`),g(a==="NDHWC",()=>`Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of ${a}`),g(typeof n=="number"&&n>0||Array.isArray(n)&&n[0]>0&&n[1]>0&&n[2]>0,()=>`Error in avgPool3d: Stride must be > 0, but got '${n}'`),Ae("avgPool3d",r,s);const l={x:i},p={filterSize:e,strides:n,pad:r,dimRoundingMode:s,dataFormat:a};let c=N.runKernel(Po,l,p);return c=X(c,i.dtype),u?$(c,[c.shape[1],c.shape[2],c.shape[3],c.shape[4]]):c}const oc=w({avgPool3d_:Mm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Wm(t,e=0){g(t.length>=1,()=>"Pass at least one tensor to concat");const n=gn(t,"tensors","concat","string_or_numeric");if(n[0].dtype==="complex64"&&n.forEach(a=>{if(a.dtype!=="complex64")throw new Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype ${a.dtype}. `)}),n.length===1)return Xe(n[0]);const r=n,s={axis:e};return N.runKernel(Ko,r,s)}const ue=w({concat_:Wm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qm(t,e,n=!1,r=!1){let s=m(t,"a","matMul"),a=m(e,"b","matMul");[s,a]=ee(s,a);const o={a:s,b:a},i={transposeA:n,transposeB:r};return N.runKernel(zo,o,i)}const V=w({matMul_:qm});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Um(t){const n={x:m(t,"x","sigmoid","float32")};return N.runKernel(Pu,n)}const vt=w({sigmoid_:Um});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Gm(t,e,n){const r=m(t,"x","slice","string_or_numeric");if(r.rank===0)throw new Error("Slicing scalar is not possible");const s={x:r},a={begin:e,size:n};return N.runKernel(Ru,s,a)}const G=w({slice_:Gm});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jm(t){const n={x:m(t,"x","tanh","float32")};return N.runKernel(sl,n)}const Qn=w({tanh_:jm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Hm(t,e,n,r,s,a){const o=m(t,"forgetBias","basicLSTMCell"),i=m(e,"lstmKernel","basicLSTMCell"),u=m(n,"lstmBias","basicLSTMCell"),l=m(r,"data","basicLSTMCell"),p=m(s,"c","basicLSTMCell"),c=m(a,"h","basicLSTMCell"),f=ue([l,c],1),d=V(f,i),y=R(d,u),S=y.shape[0],b=y.shape[1]/4,T=[S,b],A=G(y,[0,0],T),E=G(y,[0,b],T),v=G(y,[0,b*2],T),k=G(y,[0,b*3],T),_=R(I(vt(A),Qn(E)),I(p,vt(R(o,v)))),D=I(Qn(_),vt(k));return[_,D]}const ic=w({basicLSTMCell_:Hm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Km(t,e,n){const r=m(t,"x","batchToSpaceND"),s=e.reduce((i,u)=>i*u);g(r.rank>=1+e.length,()=>`input rank is ${r.rank} but should be > than blockShape.length ${e.length}`),g(n.length===e.length,()=>`crops.length is ${n.length} but should be equal to blockShape.length  ${e.length}`),g(r.shape[0]%s===0,()=>`input tensor batch is ${r.shape[0]} but is not divisible by the product of the elements of blockShape ${e.join(" * ")} === ${s}`);const a={x:r},o={blockShape:e,crops:n};return N.runKernel(Vo,a,o)}const Ds=w({batchToSpaceND_:Km});function Xm(t){let e;return t.rank===0||t.rank===1?e=$(t,[1,1,1,t.size]):t.rank===2?e=$(t,[1,1,t.shape[0],t.shape[1]]):t.rank===3?e=$(t,[1,t.shape[0],t.shape[1],t.shape[2]]):e=t,e}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Zm(t,e,n,r,s,a){a==null&&(a=.001);const o=m(t,"x","batchNorm"),i=m(e,"mean","batchNorm"),u=m(n,"variance","batchNorm");let l;s!=null&&(l=m(s,"scale","batchNorm"));let p;r!=null&&(p=m(r,"offset","batchNorm")),g(i.rank===u.rank,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),g(p==null||i.rank===p.rank,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),g(l==null||i.rank===l.rank,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");const f={x:Xm(o),scale:l,offset:p,mean:i,variance:u},d={varianceEpsilon:a},y=N.runKernel($i,f,d);return $(y,o.shape)}const Dn=w({batchNorm_:Zm});function Jm(t,e,n,r,s,a){const o=m(t,"x","batchNorm"),i=m(e,"mean","batchNorm"),u=m(n,"variance","batchNorm");let l;s!=null&&(l=m(s,"scale","batchNorm"));let p;return r!=null&&(p=m(r,"offset","batchNorm")),g(o.rank===2,()=>`Error in batchNorm2D: x must be rank 2 but got rank ${o.rank}.`),g(i.rank===2||i.rank===1,()=>`Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank ${i.rank}.`),g(u.rank===2||u.rank===1,()=>`Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank ${u.rank}.`),l!=null&&g(l.rank===2||l.rank===1,()=>`Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank ${l.rank}.`),p!=null&&g(p.rank===2||p.rank===1,()=>`Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank ${p.rank}.`),Dn(o,i,u,p,l,a)}const uc=w({batchNorm2d_:Jm});function Ym(t,e,n,r,s,a){const o=m(t,"x","batchNorm"),i=m(e,"mean","batchNorm"),u=m(n,"variance","batchNorm");let l;s!=null&&(l=m(s,"scale","batchNorm"));let p;return r!=null&&(p=m(r,"offset","batchNorm")),g(o.rank===3,()=>`Error in batchNorm3D: x must be rank 3 but got rank ${o.rank}.`),g(i.rank===3||i.rank===1,()=>`Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank ${i.rank}.`),g(u.rank===3||u.rank===1,()=>`Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank ${u.rank}.`),l!=null&&g(l.rank===3||l.rank===1,()=>`Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank ${l.rank}.`),p!=null&&g(p.rank===3||p.rank===1,()=>`Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank ${p.rank}.`),Dn(o,i,u,p,l,a)}const lc=w({batchNorm3d_:Ym});function Qm(t,e,n,r,s,a){const o=m(t,"x","batchNorm"),i=m(e,"mean","batchNorm"),u=m(n,"variance","batchNorm");let l;s!=null&&(l=m(s,"scale","batchNorm"));let p;return r!=null&&(p=m(r,"offset","batchNorm")),g(o.rank===4,()=>`Error in batchNorm4D: x must be rank 4 but got rank ${o.rank}.`),g(i.rank===4||i.rank===1,()=>`Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank ${i.rank}.`),g(u.rank===4||u.rank===1,()=>`Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank ${u.rank}.`),l!=null&&g(l.rank===4||l.rank===1,()=>`Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank ${l.rank}.`),p!=null&&g(p.rank===4||p.rank===1,()=>`Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank ${p.rank}.`),Dn(o,i,u,p,l,a)}const cc=w({batchNorm4d_:Qm});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function eg(t,e,n){const r=m(t,"x","bincount"),s=m(e,"weights","bincount");g(r.dtype==="int32",()=>`Error in bincount: input dtype must be int32, but got ${r.dtype}`),g(n>=0,()=>`size must be non-negative, but got ${n}.`),g(s.size===r.size||s.size===0,()=>`Error in bincount: weights must have the same size as input or0-length, but got input shape: ${r.shape}, weights shape: ${s.shape}.`);const a={x:r,weights:s},o={size:n};return N.runKernel(Mo,a,o)}const Os=w({bincount_:eg});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tg(t,e){const n=m(t,"x","bitwiseAnd"),r=m(e,"y","bitwiseAnd");if(!Ce(n.shape,r.shape))throw new Error(`BitwiseAnd: Tensors must have the same shape. x: ${n.shape}, y: ${r.shape}`);if(n.dtype!=="int32"||r.dtype!=="int32")throw new Error(`BitwiseAnd: Only supports 'int32' values in tensor, found type of x: ${n.dtype} and type of y: ${r.dtype}`);const s={a:n,b:r};return N.runKernel(Wo,s)}const pc=w({bitwiseAnd_:tg});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ng(t,e){const n=m(t,"s0","broadcastArgs","int32"),r=m(e,"s1","broadcastArgs","int32");if(n.rank!==1)throw new Error(`broadcastArgs(): first input must be a vector (rank=1). Has rank ${n.rank}`);if(r.rank!==1)throw new Error(`broadcastArgs(): second input must be a vector (rank=1). Has rank ${r.rank}`);const s={s0:n,s1:r};return N.runKernel(qo,s)}const hc=w({broadcastArgs_:ng});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rg(t,e){let n=m(t,"broadcastTo","x");const r=n.shape;if(Se(e),e.length<n.rank)throw new Error(`broadcastTo(): shape.length=${e.length} < input.rank=${n.rank}.`);if(e.length>n.rank){const l=n.shape.slice();for(;l.length<e.length;)l.unshift(1);n=$(n,l)}const s=n.shape,a=Array.from(e);for(let l=e.length-1;l>=0;l--)if(s[l]===e[l])a[l]=1;else if(n.shape[l]!==1)throw new Error(`broadcastTo(): [${r}] cannot be broadcast to [${e}].`);if(a.map((l,p)=>l>1?p:-1).filter(l=>l>=0).length===0)return Xe(n);const i={x:n},u={reps:a};return N.runKernel(ws,i,u)}const cn=w({broadcastTo_:rg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sg(t){const n={x:m(t,"x","ceil","float32")};return N.runKernel(Uo,n)}const fc=w({ceil_:sg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tn(t,e,n){Se(t),n=n||kn(e);const r={shape:t,value:e,dtype:n};return N.runKernel(Si,{},r)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ag(t,e,n){const r=m(t,"x","clipByValue");if(g(e<=n,()=>`Error in clip: min (${e}) must be less than or equal to max (${n}).`),e===n)return tn(r.shape,e,r.dtype);const s={x:r},a={clipValueMin:e,clipValueMax:n};return N.runKernel(Go,s,a)}const dc=w({clipByValue_:ag});function og(t){return ue(t,0)}const mc=w({concat1d_:og});function ig(t,e){return ue(t,e)}const gc=w({concat2d_:ig});function ug(t,e){return ue(t,e)}const yc=w({concat3d_:ug});function lg(t,e){return ue(t,e)}const bc=w({concat4d_:lg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function cg(t,e,n,r,s="NHWC",a=[1,1],o){const i=m(t,"x","conv2d","float32"),u=m(e,"filter","conv2d","float32");let l=i,p=!1;i.rank===3&&(p=!0,l=$(i,[1,i.shape[0],i.shape[1],i.shape[2]])),g(l.rank===4,()=>`Error in conv2d: input must be rank 4, but got rank ${l.rank}.`),g(u.rank===4,()=>`Error in conv2d: filter must be rank 4, but got rank ${u.rank}.`),Ae("conv2d",r,o);const c=s==="NHWC"?l.shape[3]:l.shape[1];g(c===u.shape[2],()=>`Error in conv2d: depth of input (${c}) must match input depth for filter ${u.shape[2]}.`),g(Ye(n,a),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`),g(It(a),()=>"Error in conv2D: Dilated rates should be larger than 0."),g(It(n),()=>"Error in conv2D: Strides should be larger than 0.");const f={x:l,filter:u},d={strides:n,pad:r,dataFormat:s,dilations:a,dimRoundingMode:o},y=N.runKernel(Xo,f,d);return p?$(y,[y.shape[1],y.shape[2],y.shape[3]]):y}const On=w({conv2d_:cg});function pg(t,e,n,r,s="NWC",a=1,o){const i=m(t,"x","conv1d"),u=m(e,"filter","conv1d");let l=i,p=!1;i.rank===2&&(p=!0,l=$(i,[1,i.shape[0],i.shape[1]])),g(l.rank===3,()=>`Error in conv1d: input must be rank 3, but got rank ${l.rank}.`),g(u.rank===3,()=>`Error in conv1d: filter must be rank 3, but got rank ${u.rank}.`),Ae("conv1d",r,o),g(l.shape[2]===u.shape[1],()=>`Error in conv1d: depth of input (${l.shape[2]}) must match input depth for filter ${u.shape[1]}.`),g(Ye(n,a),()=>`Error in conv1D: Either stride or dilation must be 1. Got stride ${n} and dilation '${a}'`),g(It(a),()=>"Error in conv1D: Dilated rates should be larger than 0."),g(It(n),()=>"Error in conv1D: Stride should be larger than 0."),g(s==="NWC",()=>`Error in conv1d: got dataFormat of ${s} but only NWC is currently supported.`);const c=$(u,[1,u.shape[0],u.shape[1],u.shape[2]]),f=$(l,[l.shape[0],1,l.shape[1],l.shape[2]]),b=On(f,c,[1,n],r,"NHWC",[1,a],o);return p?$(b,[b.shape[2],b.shape[3]]):$(b,[b.shape[0],b.shape[2],b.shape[3]])}const wc=w({conv1d_:pg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function hg(t,e,n,r,s,a="NHWC",o){g(t.length===e.rank,()=>`Length of inShape (${t.length}) and rank of dy (${e.rank}) must match`);let i=t,u=e,l=!1;e.rank===3&&(l=!0,u=$(e,[1,e.shape[0],e.shape[1],e.shape[2]]),i=[1,t[0],t[1],t[2]]),g(i.length===4,()=>`Error in conv2dDerInput: inShape must be length 4, but got length ${i.length}.`),g(u.rank===4,()=>`Error in conv2dDerInput: dy must be rank 4, but got rank ${u.rank}`),g(n.rank===4,()=>`Error in conv2dDerInput: filter must be rank 4, but got rank ${n.rank}`);const p=a==="NHWC"?i[3]:i[1],c=a==="NHWC"?u.shape[3]:u.shape[1];g(p===n.shape[2],()=>`Error in conv2dDerInput: depth of input (${p}) must match input depth for filter ${n.shape[2]}.`),g(c===n.shape[3],()=>`Error in conv2dDerInput: depth of output (${c}) must match output depth for filter ${n.shape[3]}.`),Ae("conv2dDerInput",s,o);const f={dy:u,filter:n},d={strides:r,pad:s,dataFormat:a,dimRoundingMode:o,inputShape:i},y=N.runKernel(Jo,f,d);return l?$(y,[y.shape[1],y.shape[2],y.shape[3]]):y}const Nc=w({conv2DBackpropInput_:hg});function fg(t,e,n,r,s,a){const o=m(t,"x","conv2dTranspose"),i=m(e,"filter","conv2dTranspose");return Nc(n,o,i,r,s,"NHWC",a)}const Sc=w({conv2dTranspose_:fg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function dg(t,e,n,r,s="NDHWC",a=[1,1,1]){const o=m(t,"x","conv3d"),i=m(e,"filter","conv3d");let u=o,l=!1;o.rank===4&&(l=!0,u=$(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),g(u.rank===5,()=>`Error in conv3d: input must be rank 5, but got rank ${u.rank}.`),g(i.rank===5,()=>`Error in conv3d: filter must be rank 5, but got rank ${i.rank}.`),g(u.shape[4]===i.shape[3],()=>`Error in conv3d: depth of input (${u.shape[4]}) must match input depth for filter ${i.shape[3]}.`),g(Ye(n,a),()=>`Error in conv3D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`),g(s==="NDHWC",()=>`Error in conv3d: got dataFormat of ${s} but only NDHWC is currently supported.`),g(It(a),()=>"Error in conv3D: Dilated rates should be larger than 0."),g(It(n),()=>"Error in conv3D: Strides should be larger than 0.");const p={x:u,filter:i},c={strides:n,pad:r,dataFormat:s,dilations:a},f=N.runKernel(Yo,p,c);return l?$(f,[f.shape[1],f.shape[2],f.shape[3],f.shape[4]]):f}const Tc=w({conv3d_:dg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function mg(t,e,n,r,s){g(t.length===e.rank,()=>`Length of inShape (${t.length}) and rank of dy (${e.rank}) must match`);let a=t,o=e,i=!1;e.rank===4&&(i=!0,o=$(e,[1,e.shape[0],e.shape[1],e.shape[2],e.shape[3]]),a=[1,t[0],t[1],t[2],t[3]]);const u=a[4],l=o.shape[4];g(a.length===5,()=>`Error in conv3dDerInput: inShape must be length 5, but got length ${a.length}.`),g(o.rank===5,()=>`Error in conv3dDerInput: dy must be rank 5, but got rank ${o.rank}`),g(n.rank===5,()=>`Error in conv3dDerInput: filter must be rank 5, but got rank ${n.rank}`),g(u===n.shape[3],()=>`Error in conv3dDerInput: depth of input (${u}) must match input depth for filter ${n.shape[3]}.`),g(l===n.shape[4],()=>`Error in conv3dDerInput: depth of output (${l}) must match output depth for filter ${n.shape[4]}.`);const p={dy:o,filter:n},c={pad:s,strides:r,inputShape:a},f=N.runKernel(Qo,p,c);return i?$(f,[f.shape[1],f.shape[2],f.shape[3],f.shape[4]]):f}const gg=w({conv3DBackpropInput_:mg});function yg(t,e,n,r,s){const a=m(t,"x","conv3dTranspose"),o=m(e,"filter","conv3dTranspose");return gg(n,a,o,r,s)}const Ec=w({conv3dTranspose_:yg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bg(t){const n={x:m(t,"x","cos","float32")};return N.runKernel(ei,n)}const vc=w({cos_:bg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function wg(t){const n={x:m(t,"x","cosh","float32")};return N.runKernel(ti,n)}const $c=w({cosh_:wg});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ng(t,e=0,n=!1,r=!1){const a={x:m(t,"x","cumprod")},o={axis:e,exclusive:n,reverse:r};return N.runKernel(ni,a,o)}const kc=w({cumprod_:Ng});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Sg(t,e=0,n=!1,r=!1){const a={x:m(t,"x","cumsum")},o={axis:e,exclusive:n,reverse:r};return N.runKernel(ri,a,o)}const _c=w({cumsum_:Sg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Tg(t,e,n,r=!1){const s=m(t,"x","denseBincount"),a=m(e,"weights","denseBincount");g(s.dtype==="int32",()=>`Error in denseBincount: input dtype must be int32, but got ${s.dtype}`),g(s.rank<=2,()=>`Error in denseBincount: input must be at most rank 2, but got rank ${s.rank}.`),g(n>=0,()=>`size must be non-negative, but got ${n}.`),g(a.size===s.size||a.size===0,()=>`Error in denseBincount: weights must have the same shape as x or 0-length, but got x shape: ${s.shape}, weights shape: ${a.shape}.`);const o={x:s,weights:a},i={size:n,binaryOutput:r};return N.runKernel(ai,o,i)}const xc=w({denseBincount_:Tg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Eg(t,e,n="NHWC"){const r=m(t,"x","depthToSpace","float32"),s=n==="NHWC"?r.shape[1]:r.shape[2],a=n==="NHWC"?r.shape[2]:r.shape[3],o=n==="NHWC"?r.shape[3]:r.shape[1];g(e>1,()=>`blockSize should be > 1 for depthToSpace, but was: ${e}`),g(s*e>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${s} and ${e}  for depthToSpace with input shape
    ${r.shape}`),g(a*e>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${a} and ${e} for depthToSpace with input shape
        ${r.shape}`),g(o%(e*e)===0,()=>`Dimension size must be evenly divisible by ${e*e} but is ${o} for depthToSpace with input shape ${r.shape}`);const i={x:r},u={blockSize:e,dataFormat:n};return N.runKernel(oi,i,u)}const Ic=w({depthToSpace_:Eg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function vg(t,e,n,r,s="NHWC",a=[1,1],o){const i=m(t,"x","depthwiseConv2d","float32"),u=m(e,"filter","depthwiseConv2d","float32");let l=i,p=!1;i.rank===3&&(p=!0,l=$(i,[1,i.shape[0],i.shape[1],i.shape[2]])),g(l.rank===4,()=>`Error in depthwiseConv2d: input must be rank 4, but got rank ${l.rank}.`),g(u.rank===4,()=>`Error in depthwiseConv2d: filter must be rank 4, but got rank ${u.rank}.`);const c=s==="NHWC"?l.shape[3]:l.shape[1];g(c===u.shape[2],()=>`Error in depthwiseConv2d: number of input channels (${c}) must match the inChannels dimension in filter ${u.shape[2]}.`),Ae("depthwiseConv2d",r,o);const f={x:l,filter:u},d={strides:n,pad:r,dataFormat:s,dilations:a,dimRoundingMode:o},y=N.runKernel(ii,f,d);return p?$(y,[y.shape[1],y.shape[2],y.shape[3]]):y}const lr=w({depthwiseConv2d_:vg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $g(t){const n={x:m(t,"x","diag")};return N.runKernel(ci,n)}const Ac=w({diag_:$g});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function kg(t,e,n,r,s=[1,1],a="NHWC"){const o=m(t,"x","dilation2d"),i=m(e,"filter","dilation2d");g(o.rank===3||o.rank===4,()=>`Error in dilation2d: input must be rank 3 or 4, but got rank ${o.rank}.`),g(i.rank===3,()=>`Error in dilation2d: filter must be rank 3, but got rank ${i.rank}.`),g(a==="NHWC",()=>`Error in dilation2d: Only NHWC is currently supported, but got dataFormat of ${a}`);let u=o,l=!1;o.rank===3&&(u=$(o,[1,o.shape[0],o.shape[1],o.shape[2]]),l=!0),g(u.shape[3]===i.shape[2],()=>`Error in dilation2d:  input and filter must have the same depth: ${u.shape[3]} vs ${i.shape[2]}`);const p={x:u,filter:i},c={strides:n,pad:r,dilations:s},f=N.runKernel(pi,p,c);return l?$(f,[f.shape[1],f.shape[2],f.shape[3]]):f}const Dc=w({dilation2d_:kg});/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Oc(t,e){const n=t.length,r=[];for(let s=0;s<n;s++){const a=n-1-s,o=t[a]||1;(e[e.length-1-s]||1)>1&&o===1&&r.unshift(a)}return r}function Fs(t,e){const n=[];for(let r=0;r<e.length;r++){const s=t[t.length-r-1],a=e.length-r-1,o=e[a];(s==null||s===1&&o>1)&&n.unshift(a)}return n}function ne(t,e){const n=Math.max(t.length,e.length),r=new Array(n);for(let s=0;s<n;s++){let a=t[t.length-s-1];a==null&&(a=1);let o=e[e.length-s-1];if(o==null&&(o=1),a===1)r[n-s-1]=o;else if(o===1)r[n-s-1]=a;else if(a!==o){const i=`Operands could not be broadcast together with shapes ${t} and ${e}.`;throw Error(i)}else r[n-s-1]=a}return r}var _g=Object.freeze({__proto__:null,assertAndGetBroadcastShape:ne,getBroadcastDims:Oc,getReductionAxes:Fs});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function xg(t,e){let n=m(t,"a","equal","string_or_numeric"),r=m(e,"b","equal","string_or_numeric");[n,r]=ee(n,r),ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(gi,s)}const Rs=w({equal_:xg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ig(t,e,n){const r=m(e,"a","where"),s=m(n,"b","where"),a=m(t,"condition","where","bool"),o=ne(ne(a.shape,r.shape),s.shape),i=cn(a,o),u=cn(r,o),l=cn(s,o),p={condition:i,t:u,e:l};return N.runKernel(Ou,p)}const Ze=w({where_:Ig});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ag(t){const n={x:m(t,"x","zerosLike")};return N.runKernel(cl,n)}const Ne=w({zerosLike_:Ag});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Dg(t,e){let n=m(t,"a","div"),r=m(e,"b","div");[n,r]=ee(n,r);const s=K(n,r),a=Ne(s),o=Rs(r,a);return Ze(o,a,s)}const Fc=w({divNoNan_:Dg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Og(t,e){const n=m(t,"t1","dot"),r=m(e,"t2","dot");g((n.rank===1||n.rank===2)&&(r.rank===1||r.rank===2),()=>`Error in dot: inputs must all be rank 1 or 2, but got ranks ${n.rank} and ${r.rank}.`);const s=n.rank===1?n.size:n.shape[1],a=r.rank===1?r.size:r.shape[0];if(g(s===a,()=>`Error in dot: inner dimensions of inputs must match, but got ${s} and ${a}.`),n.rank===1&&r.rank===1){const o=$(n,[1,-1]),i=$(r,[-1,1]),u=V(o,i);return $(u,[])}else if(n.rank===1&&r.rank===2){const o=$(n,[1,-1]),i=$(r,[r.shape[0],r.shape[1]]),u=V(o,i);return $(u,[u.size])}else if(n.rank===2&&r.rank===1){const o=$(r,[-1,1]),i=V(n,o);return $(i,[i.size])}else{const o=$(r,[r.shape[0],r.shape[1]]);return V(n,o)}}const Rc=w({dot_:Og});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Fg(t,...e){const n=e.map((s,a)=>m(s,`tensors${a}`,"einsum")),r={equation:t};return N.runKernel(fi,n,r)}const wt=w({einsum_:Fg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Rg(t){const n={x:m(t,"x","elu","float32")};return N.runKernel(di,n)}const Cs=w({elu_:Rg});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Cg(t,e){const n=m(t,"x","ensureShape","string_or_numeric");if(!ho(n.shape,e))throw new Error(`EnsureShape: Shape of tensor ${n.shape} is not compatible with expected shape ${e}`);return t}const Cc=w({ensureShape_:Cg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Bg(t){let e=m(t,"x","erf");g(e.dtype==="int32"||e.dtype==="float32",()=>"Input dtype must be `int32` or `float32`."),e.dtype==="int32"&&(e=X(e,"float32"));const n={x:e};return N.runKernel(mi,n)}const Bc=w({erf_:Bg});/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Bs(t,e){for(let n=0;n<t.length;++n)if(t[t.length-n-1]!==e-1-n)return!1;return!0}function Lc(t,e,n){const r=t.length+e.length,s=[];let a=0,o=0;for(let i=0;i<r;i++)n.indexOf(i)===-1?s.push(t[a++]):s.push(e[o++]);return s}function Lg(t,e){const n=[],r=t.length;for(let a=0;a<r;a++)e.indexOf(a)===-1&&n.push(t[a]);const s=e.map(a=>t[a]);return[n,s]}function Fn(t,e){const n=e.map(r=>1);return Lc(t,n,e)}function Pg(t,e,n){g(Bs(e,n),()=>`${t} supports only inner-most axes for now. Got axes ${e} and rank-${n} input.`)}function zg(t,e){if(Bs(t,e))return null;const n=[];for(let r=0;r<e;++r)t.indexOf(r)===-1&&n.push(r);return t.forEach(r=>n.push(r)),n}function Vg(t){return t.map((e,n)=>[n,e]).sort((e,n)=>e[1]-n[1]).map(e=>e[0])}function Mg(t,e){const n=[];for(let r=e-t;r<e;++r)n.push(r);return n}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Wg(t,e=null,n=!1){const s={x:m(t,"x","max")},a={reductionIndices:e,keepDims:n};return N.runKernel(Gi,s,a)}const $t=w({max_:Wg});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qg(t,e=null,n=!1){const s={x:m(t,"x","min")},a={axis:e,keepDims:n};return N.runKernel(Ji,s,a)}const er=w({min_:qg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ug(t,e){let n=m(t,"base","pow"),r=m(e,"exp","pow");[n,r]=ee(n,r);const s={a:n,b:r};return N.runKernel(hu,s)}const Xt=w({pow_:Ug});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function z(t,e){if((ae(t)&&e!=="string"||Array.isArray(t))&&e!=="complex64")throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if(e==="string"&&ae(t)&&!(t instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return ft(t,[],[],e)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Gg(t){const n={x:m(t,"x","sqrt","float32")};return N.runKernel(Vu,n)}const Me=w({sqrt_:Gg});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jg(t){const e=m(t,"x","square"),n={};return N.runKernel("Square",{x:e},n)}const Ie=w({square_:jg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Hg(t,e=null,n=!1){let r=m(t,"x","sum");r.dtype==="bool"&&(r=X(r,"int32"));const s={x:r},a={axis:e,keepDims:n};return N.runKernel(Mu,s,a)}const H=w({sum_:Hg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Kg(t,e="euclidean",n=null,r=!1){t=m(t,"x","norm");const s=Pc(t,e,n);let a=s.shape;if(r){const o=$n(n,t.shape);a=Fn(s.shape,o)}return $(s,a)}function Pc(t,e,n=null){if(t.rank===0)return be(t);if(t.rank!==1&&n===null)return Pc($(t,[-1]),e,n);if(t.rank===1||typeof n=="number"||Array.isArray(n)&&n.length===1){if(e===1)return H(be(t),n);if(e===1/0)return $t(be(t),n);if(e===-1/0)return er(be(t),n);if(e==="euclidean"||e===2)return Me(H(Xt(be(t),z(2,"int32")),n));throw new Error(`Error in norm: invalid ord value: ${e}`)}if(Array.isArray(n)&&n.length===2){if(e===1)return $t(H(be(t),n[0]),n[1]-1);if(e===1/0)return $t(H(be(t),n[1]),n[0]);if(e===-1/0)return er(H(be(t),n[1]),n[0]);if(e==="fro"||e==="euclidean")return Me(H(Ie(t),n));throw new Error(`Error in norm: invalid ord value: ${e}`)}throw new Error(`Error in norm: invalid axis: ${n}`)}const Rn=w({norm_:Kg});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Xg(t,e=null,n=!1){return Rn(t,"euclidean",e,n)}const zc=w({euclideanNorm_:Xg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Zg(t){const n={x:m(t,"x","exp")};return N.runKernel(yi,n)}const ct=w({exp_:Zg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Jg(t,e=0){const n=m(t,"x","expandDims","string_or_numeric");g(e<=n.rank,()=>"Axis must be <= rank of the tensor");const r={input:n},s={dim:e};return N.runKernel(bi,r,s)}const Ge=w({expandDims_:Jg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Yg(t){const n={x:m(t,"x","expm1")};return N.runKernel(wi,n)}const Vc=w({expm1_:Yg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qg(t,e){const n=m(t,"x","tile","string_or_numeric");g(n.rank===e.length,()=>`Error in transpose: rank of input ${n.rank} must match length of reps ${e}.`);const r={x:n},s={reps:e};return N.runKernel(ws,r,s)}const qt=w({tile_:Qg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ey(t,e,n,r="float32"){e==null&&(e=t);const s=Ve([t,e],r),a=t<=e?t:e;for(let i=0;i<a;++i)s.set(1,i,i);const o=$(s.toTensor(),[t,e]);if(n==null)return o;if(n.length===1)return qt(Ge(o,0),[n[0],1,1]);if(n.length===2)return qt(Ge(Ge(o,0),0),[n[0],n[1],1,1]);if(n.length===3)return qt(Ge(Ge(Ge(o,0),0),0),[n[0],n[1],n[2],1,1]);throw new Error(`eye() currently supports only 1D and 2D batchShapes, but received ${n.length}D.`)}const Ls=w({eye_:ey});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ty(t){const n={x:m(t,"x","floor","float32")};return N.runKernel(Ei,n)}const Ps=w({floor_:ty});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ny(t,e,n=0,r=0){const s=m(t,"x","gather"),a=m(e,"indices","gather","int32"),o={x:s,indices:a},i={axis:n,batchDims:r};return N.runKernel(ki,o,i)}const zs=w({gather_:ny});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ry(t,e){let n=m(t,"a","greater","string_or_numeric"),r=m(e,"b","greater","string_or_numeric");[n,r]=ee(n,r),ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(xi,s)}const Cn=w({greater_:ry});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sy(t,e){let n=m(t,"a","greaterEqual","string_or_numeric"),r=m(e,"b","greaterEqual","string_or_numeric");[n,r]=ee(n,r),ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(Ii,s)}const Vs=w({greaterEqual_:sy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ay(t){const n={input:m(t,"input","imag")};return N.runKernel(Di,n)}const Bn=w({imag_:ay});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function oy(t){const n={x:m(t,"x","isFinite")};return N.runKernel(Oi,n)}const Mc=w({isFinite_:oy});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function iy(t){const n={x:m(t,"x","isInf")};return N.runKernel(Fi,n)}const Wc=w({isInf_:iy});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function uy(t){const n={x:m(t,"x","isNaN")};return N.runKernel(Ri,n)}const qc=w({isNaN_:uy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ly(t,e=.2){const r={x:m(t,"x","leakyRelu")},s={alpha:e};return N.runKernel(Ci,r,s)}const Ms=w({leakyRelu_:ly});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function cy(t,e){let n=m(t,"a","less","string_or_numeric"),r=m(e,"b","less","string_or_numeric");[n,r]=ee(n,r),ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(Bi,s)}const tr=w({less_:cy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function py(t,e){let n=m(t,"a","lessEqual","string_or_numeric"),r=m(e,"b","lessEqual","string_or_numeric");[n,r]=ee(n,r),ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(Li,s)}const cr=w({lessEqual_:py});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Uc(t,e,n){if(n<=0)throw new Error("The number of values should be positive.");const r={start:t,stop:e,num:n};return N.runKernel(Pi,{},r)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function hy(t,e=5,n=1,r=1,s=.5){const a=m(t,"x","localResponseNormalization");g(a.rank===4||a.rank===3,()=>`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank ${a.rank}.`),g(Gt(e),()=>`Error in localResponseNormalization: depthRadius must be an integer but got depthRadius ${e}.`);let o=a,i=!1;a.rank===3&&(i=!0,o=$(a,[1,a.shape[0],a.shape[1],a.shape[2]]));const u={x:o},l={depthRadius:e,bias:n,alpha:r,beta:s},p=N.runKernel(Ui,u,l);return i?$(p,[p.shape[1],p.shape[2],p.shape[3]]):p}const Gc=w({localResponseNormalization_:hy});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fy(t){const n={x:m(t,"x","log","float32")};return N.runKernel(zi,n)}const Zt=w({log_:fy});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function dy(t){const n={x:m(t,"x","log1p")};return N.runKernel(Vi,n)}const Ws=w({log1p_:dy});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function my(t){return g(ot(t),()=>"The f passed in grad(f) must be a function"),(e,n)=>{const r=m(e,"x","tf.grad","string_or_numeric"),s=n!=null?m(n,"dy","tf.grad"):null;return N.tidy(()=>{const{value:a,grads:o}=N.gradients(()=>t(r),[r],s);return s!=null&&fe(a.shape,s.shape,"The shape of dy passed in grad(f)(x, dy) must match the shape returned by f(x)"),pr(o),o[0]})}}function gy(t){return g(ot(t),()=>"The f passed in grads(f) must be a function"),(e,n)=>{g(Array.isArray(e),()=>"The args passed in grads(f)(args) must be an array of `Tensor`s or `TensorLike`s");const r=gn(e,"args","tf.grads","string_or_numeric"),s=n!=null?m(n,"dy","tf.grads"):null;return N.tidy(()=>{const{value:a,grads:o}=N.gradients(()=>t(...r),r,s);return s!=null&&fe(a.shape,s.shape,"The shape of dy passed in grads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),pr(o),o})}}function yy(t){return g(ot(t),()=>"The f passed in valueAndGrad(f) must be a function"),(e,n)=>{g(e instanceof te,()=>"The x passed in valueAndGrad(f)(x) must be a tensor"),g(n==null||n instanceof te,()=>"The dy passed in valueAndGrad(f)(x, dy) must be a tensor");const{grads:r,value:s}=N.gradients(()=>t(e),[e],n);return pr(r),{grad:r[0],value:s}}}function by(t){return g(ot(t),()=>"The f passed in valueAndGrads(f) must be a function"),(e,n)=>{g(Array.isArray(e)&&e.every(s=>s instanceof te),()=>"The args passed in valueAndGrads(f)(args) must be array of tensors"),g(n==null||n instanceof te,()=>"The dy passed in valueAndGrads(f)(args, dy) must be a tensor");const r=N.gradients(()=>t(...e),e,n);return n!=null&&fe(r.value.shape,n.shape,"The shape of dy passed in valueAndGrads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),pr(r.grads),r}}function jc(t,e){g(ot(t),()=>"The f passed in variableGrads(f) must be a function"),g(e==null||Array.isArray(e)&&e.every(l=>l instanceof mn),()=>"The varList passed in variableGrads(f, varList) must be an array of variables");const n=e!=null;if(!n){e=[];for(const l in N.registeredVariables)e.push(N.registeredVariables[l])}const r=n?e.filter(l=>!l.trainable):null,s=e.length;e=e.filter(l=>l.trainable),g(e.length>0,()=>`variableGrads() expects at least one of the input variables to be trainable, but none of the ${s} variables is trainable.`);const a=!0,{value:o,grads:i}=N.gradients(t,e,null,a);g(i.some(l=>l!=null),()=>"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."),g(o.rank===0,()=>`The f passed in variableGrads(f) must return a scalar, but it returned a rank-${o.rank} tensor`);const u={};return e.forEach((l,p)=>{i[p]!=null&&(u[l.name]=i[p])}),r?.forEach(l=>u[l.name]=null),{value:o,grads:u}}function We(t){return N.customGrad(t)}function pr(t){if(t.filter(n=>n==null).length>0)throw new Error(`Cannot compute gradient of y=f(x) with respect to x. Make sure that
    the f you passed encloses all operations that lead from x to y.`)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function wy(t){const n={x:m(t,"x","neg")};return N.runKernel(ru,n)}const Re=w({neg_:wy});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ny(t){const n={x:m(t,"x","softplus")};return N.runKernel(zu,n)}const qs=w({softplus_:Ny});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Sy(t){const e=m(t,"x","logSigmoid");return We(r=>({value:Re(qs(Re(r))),gradFunc:o=>I(o,vt(Re(r)))}))(e)}const Hc=w({logSigmoid_:Sy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ty(t,e){let n=m(t,"a","sub"),r=m(e,"b","sub");[n,r]=ee(n,r);const s={a:n,b:r};return N.runKernel(nl,s)}const P=w({sub_:Ty});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ey(t,e=-1){const n=m(t,"logits","logSoftmax");if(e===-1&&(e=n.rank-1),e!==n.rank-1)throw Error(`Log Softmax along a non-last dimension is not yet supported. Logits was rank ${n.rank} and axis was ${e}`);return We((s,a)=>{const i=$t(s,e,!0),u=P(s,i),l=P(X(u,"float32"),Zt(H(ct(u),e,!0)));return a([l]),{value:l,gradFunc:(c,f)=>{const[d]=f,y=!0,S=ct(d);return P(c,I(H(c,e,y),S))}}})(n)}const Kc=w({logSoftmax_:Ey});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function vy(t,e=null,n=!1){const r=m(t,"x","logSumExp"),s=$n(e,r.shape),a=$t(r,s,!0),o=P(r,a),i=ct(o),u=H(i,s),l=Zt(u),p=R($(a,l.shape),l);if(n){const c=Fn(p.shape,s);return $(p,c)}return p}const Us=w({logSumExp_:vy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $y(t,e){const n=m(t,"a","logicalAnd","bool"),r=m(e,"b","logicalAnd","bool");ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(Mi,s)}const Nn=w({logicalAnd_:$y});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ky(t){const n={x:m(t,"x","logicalNot","bool")};return N.runKernel(Wi,n)}const Gs=w({logicalNot_:ky});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _y(t,e){const n=m(t,"a","logicalOr","bool"),r=m(e,"b","logicalOr","bool");ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(qi,s)}const js=w({logicalOr_:_y});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function xy(t,e){const n=m(t,"a","logicalXor","bool"),r=m(e,"b","logicalXor","bool");return ne(n.shape,r.shape),Nn(js(t,e),Gs(Nn(t,e)))}const Xc=w({logicalXor_:xy});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zn=2147483648;function Iy(t,e,n="left"){const r=m(t,"sortedSequence","searchSorted"),s=m(e,"values","searchSorted"),a=r.shape[r.shape.length-1],o=s.shape[s.shape.length-1],i=$(r,[-1,a]),u=$(s,[-1,o]);if(i.rank<2)throw new Error("Sorted input argument must be at least 2-dimensional");if(i.shape[0]!==u.shape[0])throw new Error("Leading dimension of 'sortedSequence' and 'values' must match.");if(q(u.shape)>=zn)throw new Error(`values tensor size must less than ${zn}`);if(i.shape[1]>=zn)throw new Error(`trailing dim_size must less than ${zn} for int32 output type, was ${i.shape[1]}`);const l={sortedSequence:i,values:u},p={side:n};return N.runKernel(Du,l,p)}const hr=w({searchSorted_:Iy});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Zc(t,e){return hr(t,e,"left")}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ay(t,e,n,r,s){const a=m(t,"x","maxPool"),o=1;let i=a,u=!1;a.rank===3&&(u=!0,i=$(a,[1,a.shape[0],a.shape[1],a.shape[2]])),g(i.rank===4,()=>`Error in maxPool: input must be rank 4 but got rank ${i.rank}.`),g(Ye(n,o),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${n} and dilations '${o}'`),Ae("maxPool",r,s);const l={x:i},p={filterSize:e,strides:n,pad:r,dimRoundingMode:s},c=N.runKernel(Hi,l,p);return u?$(c,[c.shape[1],c.shape[2],c.shape[3]]):c}const Hs=w({maxPool_:Ay});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Dy(t,e=[1,1,1],n,r,s,a="NDHWC"){const o=m(t,"x","maxPool3d");let i=o,u=!1;o.rank===4&&(u=!0,i=$(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),g(i.rank===5,()=>`Error in maxPool3d: x must be rank 5 but got rank ${i.rank}.`),g(a==="NDHWC",()=>`Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of ${a}`),Ae("maxPool3d",r,s);const l={x:i},p={filterSize:e,strides:n,pad:r,dimRoundingMode:s,dataFormat:a},c=N.runKernel(Ki,l,p);return u?$(c,[c.shape[1],c.shape[2],c.shape[3],c.shape[4]]):c}const Jc=w({maxPool3d_:Dy});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Oy(t,e,n,r,s=!1){const o={x:m(t,"x","maxPoolWithArgmax")},i={filterSize:e,strides:n,pad:r,includeBatchInIndex:s},u=N.runKernel(Xi,o,i);return{result:u[0],indexes:u[1]}}const Yc=w({maxPoolWithArgmax_:Oy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Fy(t,e){let n=m(t,"a","maximum"),r=m(e,"b","maximum");[n,r]=ee(n,r),n.dtype==="bool"&&(n=X(n,"int32"),r=X(r,"int32")),ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(ji,s)}const Ks=w({maximum_:Fy});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ry(t,e=null,n=!1){const s={x:m(t,"x","mean")},a={axis:e,keepDims:n};return N.runKernel(Zi,s,a)}const Sn=w({mean_:Ry});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function At(t,e="float32"){if(Se(t),e==="complex64"){const r=At(t,"float32"),s=At(t,"float32");return Je(r,s)}const n=or(q(t),e);return N.makeTensor(n,t,e)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function st(t,e="float32"){if(Se(t),e==="complex64"){const r=st(t,"float32"),s=At(t,"float32");return Je(r,s)}const n=hs(q(t),e);return N.makeTensor(n,t,e)}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qc(t,e,{indexing:n="xy"}={}){if(n!=="xy"&&n!=="ij")throw new TypeError(`${n} is not a valid third argument to meshgrid`);if(t===void 0)return[];let r=m(t,"x","meshgrid",t instanceof te?t.dtype:"float32");if(e===void 0)return[r];let s=m(e,"y","meshgrid",e instanceof te?e.dtype:"float32");const a=q(r.shape),o=q(s.shape);return n==="xy"?(r=$(r,[1,-1]),s=$(s,[-1,1]),[V(st([o,1],r.dtype),r),V(s,st([1,a],s.dtype))]):(r=$(r,[-1,1]),s=$(s,[1,-1]),[V(r,st([1,o],r.dtype)),V(st([a,1],s.dtype),s)])}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Cy(t,e){let n=m(t,"a","minimum"),r=m(e,"b","minimum");[n,r]=ee(n,r),n.dtype==="bool"&&(n=X(n,"int32"),r=X(r,"int32")),ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(Yi,s)}const Tn=w({minimum_:Cy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function By(t,e,n){g(n==="reflect"||n==="symmetric",()=>`Invalid mode. Mode must be either reflect or symmetric. Got ${n}.`);const r=m(t,"x","mirrorPad");if(r.rank===0)throw new Error("mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad");g(e.length===r.rank,()=>`Padding doesn't match input. Must be ${r.rank}. Got ${e.length}.`);const s=n==="reflect"?1:0;for(let i=0;i<r.rank;i++)g(e[i].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),g(e[i][0]>=0&&e[i][0]<=r.shape[i]-s&&e[i][1]>=0&&e[i][1]<=r.shape[i]-s,()=>`Padding in dimension ${i} cannot be greater than or equal to ${r.shape[i]-s} or less than 0 for input of shape ${r.shape}`);const a={paddings:e,mode:n},o={x:r};return N.runKernel(Qi,o,a)}const ep=w({mirrorPad_:By});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ly(t,e){let n=m(t,"a","mod"),r=m(e,"b","mod");[n,r]=ee(n,r);const s={a:n,b:r};return N.runKernel(eu,s)}const tp=w({mod_:Ly});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Py(t,e=null,n=!1){t=m(t,"x","moments");const r=$n(e,t.shape),s=Sn(t,r,n);let a=s.shape;n||(a=Fn(s.shape,r));const o=Ie(P(X(t,"float32"),$(s,a))),i=Sn(o,r,n);return{mean:s,variance:i}}const np=w({moments_:Py});function zy(t,e,n,r){const s=m(e,"data","multiRNNCell"),a=gn(n,"c","multiRNNCell"),o=gn(r,"h","multiRNNCell");let i=s;const u=[];for(let c=0;c<t.length;c++){const f=t[c](i,a[c],o[c]);u.push(f[0]),u.push(f[1]),i=f[1]}const l=[],p=[];for(let c=0;c<u.length;c+=2)l.push(u[c]),p.push(u[c+1]);return[l,p]}const rp=w({multiRNNCell_:zy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Vy(t,e,n,r=!1){const s=m(t,"logits","multinomial"),a=s.size,o=s.rank;if(a<2)throw new Error(`Error in multinomial: you need at least 2 outcomes, but got ${a}.`);if(o>2)throw new Error(`Rank of probabilities must be 1 or 2, but is ${o}`);n=n||Math.random();const u={logits:o===1?$(s,[1,-1]):s},l={numSamples:e,seed:n,normalized:r},p=N.runKernel(tu,u,l);return o===1?$(p,[p.size]):p}const sp=w({multinomial_:Vy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function My(t,e){let n=m(t,"a","notEqual","string_or_numeric"),r=m(e,"b","notEqual","string_or_numeric");[n,r]=ee(n,r),ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(su,s)}const Xs=w({notEqual_:My});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Wy(t,e,n=1,r=0,s="int32"){if(e<2)throw new Error(`Error in oneHot: depth must be >=2, but it is ${e}`);const o={indices:m(t,"indices","oneHot","int32")},i={dtype:s,depth:e,onValue:n,offValue:r};return N.runKernel(lu,o,i)}const nr=w({oneHot_:Wy});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qy(t){const n={x:m(t,"x","onesLike")};return N.runKernel(uu,n)}const ap=w({onesLike_:qy});function Uy(t,e){const n=m(t,"v1","outerProduct"),r=m(e,"v2","outerProduct");g(n.rank===1&&r.rank===1,()=>`Error in outerProduct: inputs must be rank 1, but got ranks ${n.rank} and ${r.rank}.`);const s=$(n,[-1,1]),a=$(r,[1,-1]);return V(s,a)}const op=w({outerProduct_:Uy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Gy(t,e,n=0){const r=m(t,"x","pad");if(r.rank===0)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");const s={paddings:e,constantValue:n},a={x:r};return N.runKernel(pu,a,s)}const nn=w({pad_:Gy});function jy(t,e,n=0){return g(e.length===2,()=>"Invalid number of paddings. Must be length of 2."),nn(t,[e],n)}const ip=w({pad1d_:jy});function Hy(t,e,n=0){return g(e.length===2&&e[0].length===2&&e[1].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),nn(t,e,n)}const up=w({pad2d_:Hy});function Ky(t,e,n=0){return g(e.length===3&&e[0].length===2&&e[1].length===2&&e[2].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),nn(t,e,n)}const lp=w({pad3d_:Ky});function Xy(t,e,n=0){return g(e.length===4&&e[0].length===2&&e[1].length===2&&e[2].length===2&&e[3].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),nn(t,e,n)}const cp=w({pad4d_:Xy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Zy(t,e,n){const r=m(t,"x","spaceToBatchND");g(r.rank>=1+e.length,()=>`input rank ${r.rank} should be > than [blockShape] ${e.length}`),g(n.length===e.length,()=>`paddings.shape[0] ${n.length} must be equal to [blockShape] ${e.length}`),g(r.shape.reduce((o,i,u)=>u>0&&u<=e.length?o&&(i+n[u-1][0]+n[u-1][1])%e[u-1]===0:o,!0),()=>`input spatial dimensions ${r.shape.slice(1)} with paddings ${n.toString()} must be divisible by blockShapes ${e.toString()}`);const s={x:r},a={blockShape:e,paddings:n};return N.runKernel(Wu,s,a)}const Zs=w({spaceToBatchND_:Zy});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Jy(t,e,n,r,s,a,o){s==null&&(s=[1,1]),a==null&&(a=1),r===0&&(r="valid");const i=m(t,"x","maxPool");let u=i,l=!1;i.rank===3&&(l=!0,u=$(i,[1,i.shape[0],i.shape[1],i.shape[2]])),g(Ye(a,s),()=>`Error in pool: Either strides or dilations must be 1. Got strides ${a} and dilations '${s}'`);const p=rc(u.shape,e,a,s,r),c=[p.dilationHeight,p.dilationWidth];let f;r==="same"?f=Qy([p.filterHeight,p.filterWidth],c):f=[[0,0],[0,0]];const d=c[0]===1&&c[1]===1,[y,S]=Yy([p.inHeight,p.inWidth],c,f),b=d?r:"valid",T=d?u:Zs(u,c,y),E=(n==="avg"?()=>As(T,e,a,b,o):()=>Hs(T,e,a,b,o))(),v=d?E:Ds(E,c,S);return l?$(v,[v.shape[1],v.shape[2],v.shape[3]]):v}function Yy(t,e,n){const r=n.map(p=>p[0]),s=n.map(p=>p[1]),a=t.concat(r,s),o=e.map((p,c)=>(p-a[c]%p)%p),i=s.map((p,c)=>p+o[c]),u=e.map((p,c)=>[r[c],i[c]]),l=e.map((p,c)=>[0,o[c]]);return[u,l]}function Qy(t,e){const r=t.map((o,i)=>o+(o-1)*(e[i]-1)).map(o=>o-1),s=r.map(o=>Math.floor(o/2)),a=r.map((o,i)=>o-s[i]);return r.map((o,i)=>[s[i],a[i]])}const pp=w({pool_:Jy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function eb(t,e){const n=m(t,"x","prelu"),r=m(e,"alpha","prelu"),s={x:n,alpha:r};return N.runKernel(fu,s)}const Js=w({prelu_:eb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tb(t,e=null,n=!1){let r=m(t,"x","prod");r.dtype==="bool"&&(r=X(r,"int32"));const s={x:r},a={axis:e,keepDims:n};return N.runKernel(du,s,a)}const hp=w({prod_:tb});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function nb(t,e,n,r){const s=t.map((p,c)=>m(p,`tensors${c}`,"raggedGather","int32")),a=m(e,"paramsDenseValues","raggedGather"),o=m(n,"indices","raggedGather","int32"),i={paramsNestedSplits:s,paramsDenseValues:a,indices:o},u={outputRaggedRank:r},l=N.runKernel(mu,i,u);return{outputNestedSplits:l.slice(0,l.length-1),outputDenseValues:l[l.length-1]}}const fp=w({raggedGather_:nb});/**
 * @license
 * Copyright 2022 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rb(t,e,n){const r=m(t,"starts","raggedRange"),s=m(e,"limits","raggedRange",r.dtype),a=m(n,"deltas","raggedRange",r.dtype),o={starts:r,limits:s,deltas:a},i=N.runKernel(gu,o);return{rtNestedSplits:i[0],rtDenseValues:i[1]}}const dp=w({raggedRange_:rb});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sb(t,e,n,r,s){const a=m(t,"shape","raggedTensorToTensor","int32"),o=m(e,"values","raggedTensorToTensor"),i=m(n,"defaultValue","raggedTensorToTensor",o.dtype),u=r.map((c,f)=>m(c,`tensors${f}`,"raggedTensorToTensor","int32")),l={shape:a,values:o,defaultValue:i,rowPartitionTensors:u},p={rowPartitionTypes:s};return N.runKernel(yu,l,p)}const mp=w({raggedTensorToTensor_:sb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ab(t,e,n){Se(t);const r=q(t);let s=null;if(n==null||n==="float32")s=new Float32Array(r);else if(n==="int32")s=new Int32Array(r);else if(n==="bool")s=new Uint8Array(r);else throw new Error(`Unknown data type ${n}`);for(let a=0;a<r;a++)s[a]=e();return N.makeTensor(s,t,n)}const gp=w({rand_:ab});var Ys={exports:{}};Ys.exports;(function(t){(function(e,n,r){function s(u){var l=this,p=i();l.next=function(){var c=2091639*l.s0+l.c*23283064365386963e-26;return l.s0=l.s1,l.s1=l.s2,l.s2=c-(l.c=c|0)},l.c=1,l.s0=p(" "),l.s1=p(" "),l.s2=p(" "),l.s0-=p(u),l.s0<0&&(l.s0+=1),l.s1-=p(u),l.s1<0&&(l.s1+=1),l.s2-=p(u),l.s2<0&&(l.s2+=1),p=null}function a(u,l){return l.c=u.c,l.s0=u.s0,l.s1=u.s1,l.s2=u.s2,l}function o(u,l){var p=new s(u),c=l&&l.state,f=p.next;return f.int32=function(){return p.next()*4294967296|0},f.double=function(){return f()+(f()*2097152|0)*11102230246251565e-32},f.quick=f,c&&(typeof c=="object"&&a(c,p),f.state=function(){return a(p,{})}),f}function i(){var u=4022871197,l=function(p){p=String(p);for(var c=0;c<p.length;c++){u+=p.charCodeAt(c);var f=.02519603282416938*u;u=f>>>0,f-=u,f*=u,u=f>>>0,f-=u,u+=f*4294967296}return(u>>>0)*23283064365386963e-26};return l}n&&n.exports?n.exports=o:this.alea=o})(ht,t)})(Ys);var ob=Ys.exports,Qs={exports:{}};Qs.exports;(function(t){(function(e,n,r){function s(i){var u=this,l="";u.x=0,u.y=0,u.z=0,u.w=0,u.next=function(){var c=u.x^u.x<<11;return u.x=u.y,u.y=u.z,u.z=u.w,u.w^=u.w>>>19^c^c>>>8},i===(i|0)?u.x=i:l+=i;for(var p=0;p<l.length+64;p++)u.x^=l.charCodeAt(p)|0,u.next()}function a(i,u){return u.x=i.x,u.y=i.y,u.z=i.z,u.w=i.w,u}function o(i,u){var l=new s(i),p=u&&u.state,c=function(){return(l.next()>>>0)/4294967296};return c.double=function(){do var f=l.next()>>>11,d=(l.next()>>>0)/4294967296,y=(f+d)/(1<<21);while(y===0);return y},c.int32=l.next,c.quick=c,p&&(typeof p=="object"&&a(p,l),c.state=function(){return a(l,{})}),c}n&&n.exports?n.exports=o:this.xor128=o})(ht,t)})(Qs);var ib=Qs.exports,ea={exports:{}};ea.exports;(function(t){(function(e,n,r){function s(i){var u=this,l="";u.next=function(){var c=u.x^u.x>>>2;return u.x=u.y,u.y=u.z,u.z=u.w,u.w=u.v,(u.d=u.d+362437|0)+(u.v=u.v^u.v<<4^(c^c<<1))|0},u.x=0,u.y=0,u.z=0,u.w=0,u.v=0,i===(i|0)?u.x=i:l+=i;for(var p=0;p<l.length+64;p++)u.x^=l.charCodeAt(p)|0,p==l.length&&(u.d=u.x<<10^u.x>>>4),u.next()}function a(i,u){return u.x=i.x,u.y=i.y,u.z=i.z,u.w=i.w,u.v=i.v,u.d=i.d,u}function o(i,u){var l=new s(i),p=u&&u.state,c=function(){return(l.next()>>>0)/4294967296};return c.double=function(){do var f=l.next()>>>11,d=(l.next()>>>0)/4294967296,y=(f+d)/(1<<21);while(y===0);return y},c.int32=l.next,c.quick=c,p&&(typeof p=="object"&&a(p,l),c.state=function(){return a(l,{})}),c}n&&n.exports?n.exports=o:this.xorwow=o})(ht,t)})(ea);var ub=ea.exports,ta={exports:{}};ta.exports;(function(t){(function(e,n,r){function s(i){var u=this;u.next=function(){var p=u.x,c=u.i,f,d;return f=p[c],f^=f>>>7,d=f^f<<24,f=p[c+1&7],d^=f^f>>>10,f=p[c+3&7],d^=f^f>>>3,f=p[c+4&7],d^=f^f<<7,f=p[c+7&7],f=f^f<<13,d^=f^f<<9,p[c]=d,u.i=c+1&7,d};function l(p,c){var f,d=[];if(c===(c|0))d[0]=c;else for(c=""+c,f=0;f<c.length;++f)d[f&7]=d[f&7]<<15^c.charCodeAt(f)+d[f+1&7]<<13;for(;d.length<8;)d.push(0);for(f=0;f<8&&d[f]===0;++f);for(f==8?d[7]=-1:d[f],p.x=d,p.i=0,f=256;f>0;--f)p.next()}l(u,i)}function a(i,u){return u.x=i.x.slice(),u.i=i.i,u}function o(i,u){i==null&&(i=+new Date);var l=new s(i),p=u&&u.state,c=function(){return(l.next()>>>0)/4294967296};return c.double=function(){do var f=l.next()>>>11,d=(l.next()>>>0)/4294967296,y=(f+d)/(1<<21);while(y===0);return y},c.int32=l.next,c.quick=c,p&&(p.x&&a(p,l),c.state=function(){return a(l,{})}),c}n&&n.exports?n.exports=o:this.xorshift7=o})(ht,t)})(ta);var lb=ta.exports,na={exports:{}};na.exports;(function(t){(function(e,n,r){function s(i){var u=this;u.next=function(){var p=u.w,c=u.X,f=u.i,d,y;return u.w=p=p+1640531527|0,y=c[f+34&127],d=c[f=f+1&127],y^=y<<13,d^=d<<17,y^=y>>>15,d^=d>>>12,y=c[f]=y^d,u.i=f,y+(p^p>>>16)|0};function l(p,c){var f,d,y,S,b,T=[],A=128;for(c===(c|0)?(d=c,c=null):(c=c+"\0",d=0,A=Math.max(A,c.length)),y=0,S=-32;S<A;++S)c&&(d^=c.charCodeAt((S+32)%c.length)),S===0&&(b=d),d^=d<<10,d^=d>>>15,d^=d<<4,d^=d>>>13,S>=0&&(b=b+1640531527|0,f=T[S&127]^=d+b,y=f==0?y+1:0);for(y>=128&&(T[(c&&c.length||0)&127]=-1),y=127,S=4*128;S>0;--S)d=T[y+34&127],f=T[y=y+1&127],d^=d<<13,f^=f<<17,d^=d>>>15,f^=f>>>12,T[y]=d^f;p.w=b,p.X=T,p.i=y}l(u,i)}function a(i,u){return u.i=i.i,u.w=i.w,u.X=i.X.slice(),u}function o(i,u){i==null&&(i=+new Date);var l=new s(i),p=u&&u.state,c=function(){return(l.next()>>>0)/4294967296};return c.double=function(){do var f=l.next()>>>11,d=(l.next()>>>0)/4294967296,y=(f+d)/(1<<21);while(y===0);return y},c.int32=l.next,c.quick=c,p&&(p.X&&a(p,l),c.state=function(){return a(l,{})}),c}n&&n.exports?n.exports=o:this.xor4096=o})(ht,t)})(na);var cb=na.exports,ra={exports:{}};ra.exports;(function(t){(function(e,n,r){function s(i){var u=this,l="";u.next=function(){var c=u.b,f=u.c,d=u.d,y=u.a;return c=c<<25^c>>>7^f,f=f-d|0,d=d<<24^d>>>8^y,y=y-c|0,u.b=c=c<<20^c>>>12^f,u.c=f=f-d|0,u.d=d<<16^f>>>16^y,u.a=y-c|0},u.a=0,u.b=0,u.c=-1640531527,u.d=1367130551,i===Math.floor(i)?(u.a=i/4294967296|0,u.b=i|0):l+=i;for(var p=0;p<l.length+20;p++)u.b^=l.charCodeAt(p)|0,u.next()}function a(i,u){return u.a=i.a,u.b=i.b,u.c=i.c,u.d=i.d,u}function o(i,u){var l=new s(i),p=u&&u.state,c=function(){return(l.next()>>>0)/4294967296};return c.double=function(){do var f=l.next()>>>11,d=(l.next()>>>0)/4294967296,y=(f+d)/(1<<21);while(y===0);return y},c.int32=l.next,c.quick=c,p&&(typeof p=="object"&&a(p,l),c.state=function(){return a(l,{})}),c}n&&n.exports?n.exports=o:this.tychei=o})(ht,t)})(ra);var pb=ra.exports,yp={exports:{}},hb={},fb=Object.freeze({__proto__:null,default:hb}),db=cs(fb);(function(t){(function(e,n,r){var s=256,a=6,o=52,i="random",u=r.pow(s,a),l=r.pow(2,o),p=l*2,c=s-1,f;function d(v,k,_){var D=[];k=k==!0?{entropy:!0}:k||{};var O=T(b(k.entropy?[v,E(n)]:v??A(),3),D),F=new y(D),L=function(){for(var B=F.g(a),W=u,U=0;B<l;)B=(B+U)*s,W*=s,U=F.g(1);for(;B>=p;)B/=2,W/=2,U>>>=1;return(B+U)/W};return L.int32=function(){return F.g(4)|0},L.quick=function(){return F.g(4)/4294967296},L.double=L,T(E(F.S),n),(k.pass||_||function(B,W,U,Y){return Y&&(Y.S&&S(Y,F),B.state=function(){return S(F,{})}),U?(r[i]=B,W):B})(L,O,"global"in k?k.global:this==r,k.state)}function y(v){var k,_=v.length,D=this,O=0,F=D.i=D.j=0,L=D.S=[];for(_||(v=[_++]);O<s;)L[O]=O++;for(O=0;O<s;O++)L[O]=L[F=c&F+v[O%_]+(k=L[O])],L[F]=k;(D.g=function(B){for(var W,U=0,Y=D.i,re=D.j,ve=D.S;B--;)W=ve[Y=c&Y+1],U=U*s+ve[c&(ve[Y]=ve[re=c&re+W])+(ve[re]=W)];return D.i=Y,D.j=re,U})(s)}function S(v,k){return k.i=v.i,k.j=v.j,k.S=v.S.slice(),k}function b(v,k){var _=[],D=typeof v,O;if(k&&D=="object")for(O in v)try{_.push(b(v[O],k-1))}catch{}return _.length?_:D=="string"?v:v+"\0"}function T(v,k){for(var _=v+"",D,O=0;O<_.length;)k[c&O]=c&(D^=k[c&O]*19)+_.charCodeAt(O++);return E(k)}function A(){try{var v;return f&&(v=f.randomBytes)?v=v(s):(v=new Uint8Array(s),(e.crypto||e.msCrypto).getRandomValues(v)),E(v)}catch{var k=e.navigator,_=k&&k.plugins;return[+new Date,e,_,e.screen,E(n)]}}function E(v){return String.fromCharCode.apply(0,v)}if(T(r.random(),n),t.exports){t.exports=d;try{f=db}catch{}}else r["seed"+i]=d})(typeof self<"u"?self:ht,[],Math)})(yp);var mb=yp.exports,gb=ob,yb=ib,bb=ub,wb=lb,Nb=cb,Sb=pb,Ct=mb;Ct.alea=gb;Ct.xor128=yb;Ct.xorwow=bb;Ct.xorshift7=wb;Ct.xor4096=Nb;Ct.tychei=Sb;var sa=Ct;/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Tb=.001,bp=.1;function Eb(t,e,n){return n==null&&(n=aa()),Xr(t,e,(r,s)=>oa(r,s,n))}function aa(){return N.backend.floatPrecision()===32?Tb:bp}function Xr(t,e,n){let r=!0;if((ae(t)||ae(e))&&(r=!1),ae(t)&&ae(e)&&(r=!0),r){const o=t.constructor.name,i=e.constructor.name;if(o!==i)throw new Error(`Arrays are of different type. Actual: ${o}. Expected: ${i}`)}if(Array.isArray(t)&&Array.isArray(e)){const o=ze(t),i=ze(e);if(!Ce(o,i))throw new Error(`Arrays have different shapes. Actual: [${o}]. Expected: [${i}]`)}const s=ae(t)?t:ut(t),a=ae(e)?e:ut(e);if(s.length!==a.length)throw new Error(`Arrays have different lengths actual: ${s.length} vs expected: ${a.length}.
Actual:   ${s}.
Expected: ${a}.`);for(let o=0;o<a.length;++o){const i=s[o],u=a[o];if(!n(i,u))throw new Error(`Arrays differ: actual[${o}] = ${i}, expected[${o}] = ${u}.
Actual:   ${s}.
Expected: ${a}.`)}typeof expect<"u"&&expect().nothing()}function vb(t,e){t().then(()=>e.fail(),()=>e()),typeof expect<"u"&&expect().nothing()}function $b(t,e){const n=typeof e=="string"||typeof e=="number"||typeof e=="boolean"?[e]:e;return nt(t)||nt(t[0])||nt(e)||nt(e[0])?Xr(t,n,(r,s)=>r==s):Xr(t,e,(r,s)=>oa(r,s,0))}function kb(t,e,n){if(n==null&&(n=aa()),!oa(t,e,n))throw new Error(`Numbers differ: actual === ${t}, expected === ${e}`);typeof expect<"u"&&expect().nothing()}function oa(t,e,n){return!isFinite(t)&&!isFinite(e)?!0:!(isNaN(t)||isNaN(e)||Math.abs(t-e)>n)}function _b(t,e,n){for(let r=0;r<t.length;r++)if(t[r]<e||t[r]>n)throw new Error(`Value out of range:${t[r]} low: ${e}, high: ${n}`)}function xb(t,e){const n=new Float32Array(t),r=new Float32Array(e);if(n.length!==r.length)throw new Error(`Expected ArrayBuffer to be of length ${r.length}, but it was ${n.length}`);for(let s=0;s<r.length;s++)if(n[s]!==r[s])throw new Error(`Expected ArrayBuffer value at ${s} to be ${r[s]} but got ${n[s]} instead`)}function wp(t){for(let e=0;e<t.length;e++){const n=t[e];Array.isArray(n)?wp(n):t[e]=xn(n)}return t}function Ib(t){const e=document.createElement("video");return"playsInline"in e&&(e.playsInline=!0),e.muted=!0,e.loop=!0,e.style.position="fixed",e.style.left="0px",e.style.top="0px",e.preload="auto",e.appendChild(t),new Promise(n=>{e.addEventListener("loadeddata",r=>n(e)),e.load()})}async function Ab(t){await t.play(),"requestVideoFrameCallback"in t&&await new Promise(e=>{t.requestVideoFrameCallback(e)})}var Db=Object.freeze({__proto__:null,TEST_EPSILON_FLOAT16:bp,createVideoElement:Ib,encodeStrings:wp,expectArrayBuffersEqual:xb,expectArraysClose:Eb,expectArraysEqual:$b,expectNumbersClose:kb,expectPromiseToFail:vb,expectValuesInRange:_b,play:Ab,testEpsilon:aa});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ia{constructor(e,n,r,s,a){this.mean=e,this.stdDev=n,this.dtype=r,this.nextVal=NaN,this.truncated=s,this.truncated&&(this.upper=this.mean+this.stdDev*2,this.lower=this.mean-this.stdDev*2);const o=a||Math.random();this.random=sa.alea(o.toString())}nextValue(){if(!isNaN(this.nextVal)){const s=this.nextVal;return this.nextVal=NaN,s}let e,n,r=!1;for(;!r;){let s,a,o;do s=2*this.random()-1,a=2*this.random()-1,o=s*s+a*a;while(o>=1||o===0);const i=Math.sqrt(-2*Math.log(o)/o);e=this.mean+this.stdDev*s*i,n=this.mean+this.stdDev*a*i,(!this.truncated||this.isValidTruncated(e))&&(r=!0)}return(!this.truncated||this.isValidTruncated(n))&&(this.nextVal=this.convertValue(n)),this.convertValue(e)}convertValue(e){return this.dtype==null||this.dtype==="float32"?e:Math.round(e)}isValidTruncated(e){return e<=this.upper&&e>=this.lower}}class Ob{constructor(e,n,r,s){this.alpha=e,this.beta=1/n,this.dtype=r;const a=s||Math.random();this.randu=sa.alea(a.toString()),this.randn=new ia(0,1,r,!1,this.randu()),e<1?this.d=e+2/3:this.d=e-1/3,this.c=1/Math.sqrt(9*this.d)}nextValue(){let e,n,r,s,a,o;for(;;){do s=this.randn.nextValue(),o=1+this.c*s;while(o<=0);if(o*=o*o,e=s*s,n=1-.331*e*e,r=.5*e+this.d*(1-o+Math.log(o)),a=this.randu(),a<n||Math.log(a)<r)break}return o=1/this.beta*this.d*o,this.alpha<1&&(o*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(o)}convertValue(e){return this.dtype==="float32"?e:Math.round(e)}}class Fb{constructor(e=0,n=1,r,s){if(this.canReturnFloat=()=>this.dtype==null||this.dtype==="float32",this.min=e,this.range=n-e,this.dtype=r,s==null&&(s=Math.random()),typeof s=="number"&&(s=s.toString()),!this.canReturnFloat()&&this.range<=1)throw new Error(`The difference between ${e} - ${n} <= 1 and dtype is not float`);this.random=sa.alea(s)}convertValue(e){return this.canReturnFloat()?e:Math.round(e)}nextValue(){return this.convertValue(this.min+this.range*this.random())}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Rb(t,e,n=1,r="float32",s){if(Se(t),n==null&&(n=1),r==null&&(r="float32"),r!=="float32"&&r!=="int32")throw new Error(`Unsupported data type ${r}`);const a=new Ob(e,n,r,s),o=Ve(t,r);for(let i=0;i<o.values.length;i++)o.values[i]=a.nextValue();return o.toTensor()}const Np=w({randomGamma_:Rb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Cb(t,e=0,n=1,r,s){if(Se(t),r!=null&&r==="bool")throw new Error(`Unsupported data type ${r}`);const a=new ia(e,n,r,!1,s),o=Ve(t,r);for(let i=0;i<o.values.length;i++)o.values[i]=a.nextValue();return o.toTensor()}const ua=w({randomNormal_:Cb});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Bb(t,e,n){if(e!=null&&e==="bool")throw new Error(`Unsupported data type ${e}`);return ua(t,0,1,e,n)}const Sp=w({randomStandardNormal_:Bb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Lb(t,e=0,n=1,r="float32",s){Se(t);const a=Ve(t,r),o=new Fb(e,n,null,s);for(let i=0;i<a.values.length;i++)a.values[i]=o.nextValue();return a.toTensor()}const fr=w({randomUniform_:Lb});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Pb(t,e,n,r){return fr(t,e,n,"int32",r)}const Tp=w({randomUniformInt_:Pb});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Jt(t,e,n=1,r="float32"){if(n===0)throw new Error("Cannot have a step of zero");const s={start:t,stop:e,step:n,dtype:r};return N.runKernel(bu,{},s)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zb(t){const n={input:m(t,"input","real")};return N.runKernel(wu,n)}const Yt=w({real_:zb});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Vb(t){const n={x:m(t,"x","reciprocal")};return N.runKernel(Nu,n)}const Ep=w({reciprocal_:Vb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Mb(t){const n={x:m(t,"x","relu")};return N.runKernel(Su,n)}const Ln=w({relu_:Mb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Wb(t){const n={x:m(t,"x","relu6")};return N.runKernel($u,n)}const la=w({relu6_:Wb});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qb(t,e){const r={x:m(t,"x","reverse")},s={dims:e};return N.runKernel(ku,r,s)}const pt=w({reverse_:qb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ub(t){const e=m(t,"x","reverse");return g(e.rank===1,()=>`Error in reverse1D: x must be rank 1 but got rank ${e.rank}.`),pt(e,0)}const vp=w({reverse1d_:Ub});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Gb(t,e){const n=m(t,"x","reverse");return g(n.rank===2,()=>`Error in reverse2D: x must be rank 2 but got rank ${n.rank}.`),pt(n,e)}const $p=w({reverse2d_:Gb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jb(t,e){const n=m(t,"x","reverse");return g(n.rank===3,()=>`Error in reverse3D: x must be rank 3 but got rank ${n.rank}.`),pt(n,e)}const kp=w({reverse3d_:jb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Hb(t,e){const n=m(t,"x","reverse");return g(n.rank===4,()=>`Error in reverse4D: x must be rank 4 but got rank ${n.rank}.`),pt(n,e)}const _p=w({reverse4d_:Hb});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Kb(t){const n={x:m(t,"x","round")};return N.runKernel(_u,n)}const ca=w({round_:Kb});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Xb(t){const n={x:m(t,"x","rsqrt","float32")};return N.runKernel(xu,n)}const xp=w({rsqrt_:Xb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Zb(t){const n={x:m(t,"x","selu")};return N.runKernel(Fu,n)}const Ip=w({selu_:Zb});function Jb(t,e,n,r,s,a=[1,1],o="NHWC"){const i=m(t,"x","separableConv2d"),u=m(e,"depthwiseFilter","separableConv2d"),l=m(n,"pointwiseFilter","separableConv2d");let p=i,c=!1;if(i.rank===3&&(c=!0,p=$(i,[1,i.shape[0],i.shape[1],i.shape[2]])),o==="NCHW")throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");g(p.rank===4,()=>`Error in separableConv2d: input must be rank 4, but got rank ${p.rank}.`),g(u.rank===4,()=>`Error in separableConv2d: depthwise filter must be rank 4, but got rank ${u.rank}.`),g(l.rank===4,()=>`Error in separableConv2d: pointwise filter must be rank 4, but got rank ${u.rank}.`),g(l.shape[0]===1,()=>`Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got ${l.shape[0]}.`),g(l.shape[1]===1,()=>`Error in separableConv2d: the second dimension of pointwise filter must be 1, but got ${l.shape[1]}.`);const f=u.shape[2],d=u.shape[3];g(l.shape[2]===f*d,()=>`Error in separableConv2d: the third dimension of pointwise filter must be ${f*d}, but got ${l.shape[2]}.`);const y=lr(p,u,r,s,o,a),b=On(y,l,1,"valid",o);return c?$(b,[b.shape[1],b.shape[2],b.shape[3]]):b}const Ap=w({separableConv2d_:Jb});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function Yb(t,e){const n=m(t,"x","setdiff1d"),r=m(e,"y","setdiff1d");g(n.dtype===r.dtype,()=>`x and y should have the same dtype, but got x (${n.dtype}) and y (${r.dtype}).`),g(n.rank===1,()=>`x should be 1D tensor, but got x (${n.shape}).`),g(r.rank===1,()=>`y should be 1D tensor, but got y (${r.shape}).`);const s=await n.data(),a=await r.data(),o=new Set(a);let i=0;for(let p=0;p<s.length;p++)o.has(s[p])||i++;const u=new Jn([i],n.dtype),l=new Jn([i],"int32");for(let p=0,c=0;p<s.length;p++)o.has(s[p])||(u.values[c]=s[p],l.values[c]=p,c++);return[u.toTensor(),l.toTensor()]}const Dp=Yb;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qb(t){const n={x:m(t,"x","sign")};return N.runKernel(Lu,n)}const Op=w({sign_:Qb});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function e0(t){const n={x:m(t,"x","sin","float32")};return N.runKernel(Cu,n)}const Fp=w({sin_:e0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function t0(t){const n={x:m(t,"x","sinh")};return N.runKernel(Bu,n)}const Rp=w({sinh_:t0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function n0(t,e,n){const r=m(t,"x","slice1d");return g(r.rank===1,()=>`slice1d expects a rank-1 tensor, but got a rank-${r.rank} tensor`),G(r,[e],[n])}const Cp=w({slice1d_:n0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function r0(t,e,n){const r=m(t,"x","slice2d");return g(r.rank===2,()=>`slice2d expects a rank-2 tensor, but got a rank-${r.rank} tensor`),G(r,e,n)}const Bp=w({slice2d_:r0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function s0(t,e,n){const r=m(t,"x","slice3d");return g(r.rank===3,()=>`slice3d expects a rank-3 tensor, but got a rank-${r.rank} tensor`),G(r,e,n)}const Lp=w({slice3d_:s0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function a0(t,e,n){const r=m(t,"x","slice4d");return g(r.rank===4,()=>`slice4d expects a rank-4 tensor, but got a rank-${r.rank} tensor`),G(r,e,n)}const Pp=w({slice4d_:a0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function o0(t,e=-1){const n=m(t,"logits","softmax","float32");if(e===-1&&(e=n.rank-1),e!==n.rank-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${n.rank} and dim was ${e}`);const r={logits:n},s={dim:e};return N.runKernel(Uu,r,s)}const zp=w({softmax_:o0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function i0(t){g(t.dtype==="complex64",()=>`The dtype for tf.spectral.fft() must be complex64 but got ${t.dtype}.`);const e={input:t};return N.runKernel(Ni,e)}const dr=w({fft_:i0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function u0(t){g(t.dtype==="complex64",()=>`The dtype for tf.spectral.ifft() must be complex64 but got ${t.dtype}.`);const e={input:t};return N.runKernel(Ai,e)}const En=w({ifft_:u0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function l0(t){const e=t.shape[t.shape.length-1],n=t.size/e;let r;if(e<=2){const s=$(t,[n,e]);r=En(s)}else{const s=[n,2*(e-1)],a=$(Yt(t),[n,e]),o=$(Bn(t),[n,e]),i=pt(G(a,[0,1],[n,e-2]),1),u=I(pt(G(o,[0,1],[n,e-2]),1),z(-1)),l=ue([a,i],1),p=ue([o,u],1),c=$(Je(l,p),[s[0],s[1]]);r=En(c)}if(r=Yt(r),t.rank===3&&t.shape[0]!==0){const s=r,a=t.shape[0];r=$(r,[a,r.shape[0]/a,r.shape[1]]),s.dispose()}return r}const pa=w({irfft_:l0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function c0(t,e,n=0){const s={x:m(t,"x","split")},a={numOrSizeSplits:e,axis:n};return N.runKernel(qu,s,a)}const Qt=w({split_:c0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function p0(t,e){g(t.dtype==="float32",()=>`The dtype for rfft() must be real value but got ${t.dtype}`);let n=t.shape[t.shape.length-1];const r=t.size/n;let s;if(e!=null&&e<n){const y=t.shape.map(b=>0),S=t.shape.map(b=>b);S[t.shape.length-1]=e,s=G(t,y,S),n=e}else if(e!=null&&e>n){const y=t.shape.map(S=>S);y[t.shape.length-1]=e-n,s=ue([t,At(y)],t.shape.length-1),n=e}else s=t;const a=Ne(s),o=$(Je(s,a),[r,n]),i=dr(o),u=Math.floor(n/2)+1,l=Yt(i),p=Bn(i),c=Qt(l,[u,n-u],l.shape.length-1),f=Qt(p,[u,n-u],p.shape.length-1),d=s.shape.slice();return d[s.shape.length-1]=u,$(Je(c[0],f[0]),d)}const mr=w({rfft_:p0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function h0(t,e){let n=m(t,"a","squaredDifference"),r=m(e,"b","squaredDifference");[n,r]=ee(n,r),ne(n.shape,r.shape);const s={a:n,b:r},a={};return N.runKernel(Zu,s,a)}const ha=w({squaredDifference_:h0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function f0(t,e){const n=m(t,"x","squeeze","string_or_numeric");return $(n,fo(n.shape,e).newShape)}const gr=w({squeeze_:f0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function d0(t,e=0){const n=gn(t,"tensors","stack","string_or_numeric");g(n.length>=1,()=>"Pass at least one tensor to tf.stack"),n.length>0&&g(e<=n[0].rank,()=>"Axis must be <= rank of the tensor");const r=n,s={axis:e};return N.runKernel(cu,r,s)}const qe=w({stack_:d0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function m0(t,e=0){const r={x:m(t,"x","step")},s={alpha:e};return N.runKernel(pl,r,s)}const fa=w({step_:m0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function g0(t,e,n,r,s=0,a=0,o=0,i=0,u=0){const p={x:m(t,"x","stridedSlice","string_or_numeric")},c={begin:e,end:n,strides:r,beginMask:s,endMask:a,ellipsisMask:o,newAxisMask:i,shrinkAxisMask:u};return N.runKernel(Yu,p,c)}const Vp=w({stridedSlice_:g0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function y0(t){const n={x:m(t,"x","tan","float32")};return N.runKernel(rl,n)}const Mp=w({tan_:y0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ee(t,e){Ft(t);const n=ze(t,e);if(n.length!==1)throw new Error("tensor1d() requires values to be a flat/TypedArray");return ft(t,null,n,e)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ut(t,e,n){if(Ft(t),e!=null&&e.length!==2)throw new Error("tensor2d() requires shape to have two numbers");const r=ze(t,n);if(r.length!==2&&r.length!==1)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(r.length===1&&e==null)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return ft(t,e,r,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function da(t,e,n){if(Ft(t),e!=null&&e.length!==3)throw new Error("tensor3d() requires shape to have three numbers");const r=ze(t,n);if(r.length!==3&&r.length!==1)throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(r.length===1&&e==null)throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");return ft(t,e,r,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Wp(t,e,n){if(Ft(t),e!=null&&e.length!==4)throw new Error("tensor4d() requires shape to have four numbers");const r=ze(t,n);if(r.length!==4&&r.length!==1)throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(r.length===1&&e==null)throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return ft(t,e,r,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qp(t,e,n){if(Ft(t),e!=null&&e.length!==5)throw new Error("tensor5d() requires shape to have five numbers");const r=ze(t,n);if(r.length!==5&&r.length!==1)throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(r.length===1&&e==null)throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return ft(t,e,r,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Up(t,e,n){if(Ft(t),e!=null&&e.length!==6)throw new Error("tensor6d() requires shape to have six numbers");const r=ze(t,n);if(r.length!==6&&r.length!==1)throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(r.length===1&&e==null)throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return e=e||r,ft(t,e,r,n)}function ma(t,e,n){const r=e.rank>1?e.shape[e.rank-1]:1,s=e.rank>1?e.rank-1:1,a=`Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: ${n.shape}, indices.shape: ${e.shape}, shape: ${t}, sliceDim: ${r}, and batchDim: ${s}.`;if(n.rank<s)throw new Error(a+` update.rank < ${s}. `);if(t.length<r+(n.rank-s))throw new Error(a+` Output shape length < ${r+(n.rank-s)}`);if(n.rank!==s+t.length-r)throw new Error(a+` update.rank != ${s+t.length-r}`);for(let o=0;o<s;++o)if(n.shape[o]!==e.shape[o])throw new Error(a+` updates.shape[${o}] (${n.shape[o]}) != indices.shape[${o}] (${e.shape[o]}).`);for(let o=0;o<n.rank-s;++o)if(n.shape[o+s]!==t[o+r])throw new Error(a+` updates.shape[${o+s}] (${n.shape[o+s]}) != shape[${o+s}] (${t[o+s]})`)}function yr(t,e,n){if(e.rank<1)throw new Error(`tf.scatterND() expects the indices to be rank 1 or higher, but the rank was ${e.rank}.`);if(t.rank<1)throw new Error(`tf.scatterND() expects the updates to be rank 1 or higher, but the rank was ${t.rank}.`);if(e.dtype!=="int32")throw new Error(`The dtype of 'indices' should be int32, but got dtype: ${e.dtype}`);if(n.length<1)throw new Error(`Output rank must be greater or equal to 1, but got shape: ${n}`);if(n.length===0){if(e.size===0)throw new Error(`Indices specified for empty output. indices shape: ${e.shape}`);if(t.size===0)throw new Error(`Updates specified for empty output. updates shape: ${t.shape}`)}ma(n,e,t)}function Gp(t,e,n){const r=e.shape.length,s=r>1?e.shape[r-1]:1,a=n.length;let o=1;for(let c=s;c<a;++c)o*=n[c];const i=s<1?1:s,u=q(e.shape)/i,l=[...en(n.slice(0,s)),1],p=q(n);return{sliceRank:s,numUpdates:u,sliceSize:o,strides:l,outputSize:p}}var b0=Object.freeze({__proto__:null,calculateShapes:Gp,validateInput:yr,validateUpdateShape:ma});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function w0(t,e,n){const r=m(t,"tensor","tensorScatterupdate"),s=m(e,"indices","tensorScatterupdate","int32"),a=m(n,"updates","tensorScatterupdate");if(yr(a,s,r.shape),r.dtype!==a.dtype)throw new Error(`tensor and updates must have the same dtype, instead they are ${r.dtype} and ${a.dtype}.`);const o={tensor:r,indices:s,updates:a},i={};return N.runKernel(Au,o,i)}const jp=w({tensorScatterUpdate_:w0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function N0(t,e=1,n=!0){const r=m(t,"x","topk");if(r.rank===0)throw new Error("topk() expects the input to be of rank 1 or higher");const s=r.shape[r.shape.length-1];if(e<0)throw new Error(`'k' passed to topk() must be >= 0 but got ${e}`);if(e>s)throw new Error(`'k' passed to topk() must be <= the last dimension (${s}) but got ${e}`);const a={x:r},o={k:e,sorted:n},[i,u]=N.runKernel(al,a,o);return{values:i,indices:u}}const Hp=w({topk_:N0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function S0(t,e=0,n=1,r,s){if(Se(t),r!=null&&r==="bool")throw new Error("Unsupported data type $ { dtype }");const a=new ia(e,n,r,!0,s),o=Ve(t,r);for(let i=0;i<o.values.length;i++)o.values[i]=a.nextValue();return o.toTensor()}const Kp=w({truncatedNormal_:S0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function T0(t,e=0){const n=m(t,"x","unique","string_or_numeric");g(n.rank>0,()=>"The input tensor must be at least 1D");const r={x:n},s={axis:e},[a,o]=N.runKernel(il,r,s);return{values:a,indices:o}}const Xp=w({unique_:T0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function E0(t,e,n){const r=m(t,"x","unsortedSegmentSum"),s=m(e,"segmentIds","unsortedSegmentSum","int32");g(Gt(n),()=>"numSegments must be of dtype int");const a={x:r,segmentIds:s},o={numSegments:n};return N.runKernel(ll,a,o)}const Zp=w({unsortedSegmentSum_:E0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function v0(t,e=0){const n=m(t,"x","unstack","string_or_numeric");g(e>=-n.shape.length&&e<n.shape.length,()=>`Axis = ${e} is not in [-${n.shape.length}, ${n.shape.length})`);const r={value:n},s={axis:e};return N.runKernel(ul,r,s)}const dt=w({unstack_:v0});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Jp(t,e){return hr(t,e,"right")}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Yp(t,e=!0,n,r){return N.makeVariable(t,e,n,r)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qp(t,e){const n=[];for(let a=0;a<e.length;a++)e[a]&&n.push(a);const r=Ve(t,"int32"),s=Ve([n.length,t.length],"int32");for(let a=0;a<n.length;a++){const o=r.indexToLoc(n[a]),i=a*t.length;s.values.set(o,i)}return s.toTensor()}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function $0(t){const e=m(t,"condition","whereAsync","bool"),n=await e.data(),r=Qp(e.shape,n);return t!==e&&e.dispose(),r}const ga=$0;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function k0(t,e,n){const r=m(t,"tensor","boolMask"),s=m(e,"mask","boolMask","bool"),a=n??0,o=s.rank,i=r.shape;g(o>0,()=>"mask cannot be scalar"),fe(i.slice(a,a+o),s.shape,"mask's shape must match the first K dimensions of tensor's shape,");let u=1;for(let S=a;S<a+o;S++)u*=i[S];const l=i.slice(0,a).concat([u],i.slice(a+o)),p=$(r,l),c=$(s,[-1]),f=await ga(c),d=gr(f,[1]),y=zs(p,d,a);return t!==r&&r.dispose(),e!==s&&s.dispose(),d.dispose(),p.dispose(),c.dispose(),f.dispose(),y}const eh=k0;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _0(t,e,n){const r=m(t,"x","transpose");if(e==null&&(e=r.shape.map((o,i)=>i).reverse()),g(r.rank===e.length,()=>`Error in transpose: rank of input ${r.rank} must match length of perm ${e}.`),e.forEach(o=>{g(o>=0&&o<r.rank,()=>`All entries in 'perm' must be between 0 and ${r.rank-1} but got ${e}`)}),r.rank<=1)return r.clone();const s={x:r},a={perm:e};return r.dtype==="complex64"?M(()=>{let o=Yt(r),i=Bn(r);return o=N.runKernel(Mn,{x:o},a),i=N.runKernel(Mn,{x:i},a),n&&(i=Re(i)),Je(o,i)}):N.runKernel(Mn,s,a)}const vn=w({transpose_:_0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function x0(t,e,n,r,s=!0){const a=m(t,"v","movingAverage"),o=m(e,"x","movingAverage"),i=m(n,"decay","movingAverage");_l(a,o),g(Ce(a.shape,o.shape),()=>"Shape mismatch in v and x");const u=z(1),l=P(u,i);let p=I(P(o,a),l);if(s){g(r!=null,()=>"When using zeroDebias: true, step is required.");const c=m(r,"step","movingAverage");p=K(p,P(u,Xt(i,c)))}return R(a,p)}const th=w({movingAverage_:x0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function I0(t,e,n){Se(n);const r=m(t,"indices","scatterND","int32"),s=m(e,"updates","scatterND");yr(s,r,n);const a={indices:r,updates:s},o={shape:n};return N.runKernel(Iu,a,o)}const nh=w({scatterND_:I0});function A0(t,e,n,r){if(t.dtype!=="int32")throw new Error(`tf.sparseToDense() expects the indices to be int32 type, but the dtype was ${t.dtype}.`);if(t.rank>2)throw new Error(`sparseIndices should be a scalar, vector, or matrix, but got shape ${t.shape}.`);const s=t.rank>0?t.shape[0]:1,a=t.rank>1?t.shape[1]:1;if(n.length!==a)throw new Error(`outputShape has incorrect number of elements:, ${n.length}, should be: ${a}.`);const o=e.size;if(!(e.rank===0||e.rank===1&&o===s))throw new Error(`sparseValues has incorrect shape ${e.shape}, should be [] or [${s}]`);if(e.dtype!==r.dtype)throw new Error("sparseValues.dtype must match defaultValues.dtype")}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function D0(t,e,n,r=0){Se(n);const s=m(t,"sparseIndices","sparseToDense","int32"),a=m(e,"sparseValues","sparseToDense","string_or_numeric"),o=m(r,"defaultValue","sparseToDense",a.dtype);A0(s,a,n,o);const i={sparseIndices:s,sparseValues:a,defaultValue:o},u={outputShape:n};return N.runKernel(Xu,i,u)}const rh=w({sparseToDense_:D0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function O0(t,e){const n=m(e,"indices","gatherND","int32"),s={params:m(t,"x","gatherND","string_or_numeric"),indices:n};return N.runKernel(_i,s)}const sh=w({gatherND_:O0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function F0(t,e){if(e==null)return t.shape.slice();if(Ce(t.shape,e))return e;if(t.shape.length===e.length){const n=[];for(let r=0;r<t.shape.length;r++)e[r]==null&&t.shape[r]!=null?n.push(t.shape[r]):n.push(e[r]);return n}return e}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function R0(t,e,n,r){const s=m(t,"x","dropout");if(g(s.dtype==="float32",()=>`x has to be a floating point tensor since it's going to be scaled, but got a ${s.dtype} tensor instead.`),g(e>=0&&e<1,()=>`rate must be a float in the range [0, 1), but got ${e}.`),e===0)return t instanceof te?s.clone():s;const a=F0(s,n),o=1-e,i=K(Ps(R(fr(a,0,1,"float32",r),o)),o);return I(s,i)}const ah=w({dropout_:R0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ya(t){return Math.floor(Math.pow(2,Math.ceil(Math.log(t)/Math.log(2))))}function br(t,e,n){const r=1-t%2,s=new Float32Array(t);for(let a=0;a<t;++a){const o=2*Math.PI*a/(t+r-1);s[a]=e-n*Math.cos(o)}return Ee(s,"float32")}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function C0(t,e,n=1){const r=m(t,"predictions","inTopK"),s=m(e,"targets","inTopK");g(r.rank>1,()=>`inTopK() expects the predictions to be of rank 2 or higher, but got ${r.rank}`),g(r.rank-1===s.rank,()=>`predictions rank should be 1 larger than targets rank, but got predictions rank ${r.rank} and targets rank ${s.rank}`),fe(r.shape.slice(0,r.shape.length-1),s.shape,"predictions's shape should be align with the targets' shape, except the last dimension.");const a=r.shape[r.shape.length-1];g(n>0&&n<=a,()=>`'k' passed to inTopK() must be > 0 && <= the predictions last dimension (${a}), but got ${n}`);const o=await r.data(),i=await s.data(),[u,l]=[o.length/a,a],p=mo("bool",u);for(let c=0;c<u;c++){const f=c*l,d=o.subarray(f,f+l),y=[];for(let S=0;S<d.length;S++)y.push({value:d[S],index:S});y.sort((S,b)=>b.value-S.value),p[c]=0;for(let S=0;S<n;S++)if(y[S].index===i[c]){p[c]=1;break}}return t!==r&&r.dispose(),e!==s&&s.dispose(),Fe(p,s.shape,"bool")}const oh=C0;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function B0(t,e,n,r,s,a="NHWC",o){let i=t;t.rank===3&&(i=$(t,[1,t.shape[0],t.shape[1],t.shape[2]]));let u=e;u.rank===3&&(u=$(e,[1,e.shape[0],e.shape[1],e.shape[2]])),g(i.rank===4,()=>`Error in conv2dDerFilter: input must be rank 4, but got shape ${i.shape}.`),g(u.rank===4,()=>`Error in conv2dDerFilter: dy must be rank 4, but got shape ${u.shape}.`),g(n.length===4,()=>`Error in conv2dDerFilter: filterShape must be length 4, but got ${n}.`);const l=a==="NHWC"?i.shape[3]:i.shape[1],p=a==="NHWC"?u.shape[3]:u.shape[1];g(l===n[2],()=>`Error in conv2dDerFilter: depth of input ${l}) must match input depth in filter (${n[2]}.`),g(p===n[3],()=>`Error in conv2dDerFilter: depth of dy (${p}) must match output depth for filter (${n[3]}).`),Ae("conv2dDerFilter",s,o);const c={x:i,dy:u},f={strides:r,pad:s,dataFormat:a,dimRoundingMode:o,filterShape:n};return N.runKernel(Zo,c,f)}const L0=w({conv2DBackpropFilter_:B0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function wr(t,e,n){if(n==null||n==="linear")return t;if(n==="relu")return I(t,fa(e));throw new Error(`Cannot compute gradient for fused activation ${n}.`)}function Nr(t,e){let n=e;const r=Fs(t.shape,e.shape);return r.length>0&&(n=H(n,r)),$(n,t.shape)}function Sr(t,e,n,r){if(e==="linear")return t;if(e==="relu")return Ln(t);if(e==="elu")return Cs(t);if(e==="relu6")return la(t);if(e==="prelu")return Js(t,n);if(e==="leakyrelu")return Ms(t,r);if(e==="sigmoid")return vt(t);throw new Error(`Unknown fused activation ${e}.`)}const Tr=(t,e)=>!(t>0)||e==="linear";/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function P0({x:t,filter:e,strides:n,pad:r,dataFormat:s="NHWC",dilations:a=[1,1],dimRoundingMode:o,bias:i,activation:u="linear",preluActivationWeights:l,leakyreluAlpha:p}){if(u=u||"linear",Tr(N.state.gradientDepth,u)===!1){g(s==="NHWC",()=>`Error in fused conv2d: got dataFormat of ${s} but only NHWC is currently supported for the case of gradient depth is 0 and the activation is not linear.`);let _=On(t,e,n,r,s,a,o);return i!=null&&(_=R(_,i)),Sr(_,u,l,p)}const c=m(t,"x","conv2d","float32"),f=m(e,"filter","conv2d","float32");let d=c,y=!1;c.rank===3&&(y=!0,d=$(c,[1,c.shape[0],c.shape[1],c.shape[2]])),g(d.rank===4,()=>`Error in fused conv2d: input must be rank 4, but got rank ${d.rank}.`),g(f.rank===4,()=>`Error in fused conv2d: filter must be rank 4, but got rank ${f.rank}.`),Ae("fused conv2d",r,o);const S=s==="NHWC"?d.shape[3]:d.shape[1];g(f.shape[2]===S,()=>`Error in conv2d: depth of input (${S}) must match input depth for filter ${f.shape[2]}.`),g(Ye(n,a),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`);const b=An(d.shape,f.shape,n,a,r,o);let T;i!=null&&(T=m(i,"bias","fused conv2d"),[T]=ee(T,c),s==="NHWC"?ne(b.outShape,T.shape):(g(T.shape.length<=1,()=>`Error in fused conv2d: only supports scalar or 1-D Tensor bias for NCHW format but got the bias of rank-${T.shape.length}.`),g(T.shape.length===0||T.shape[0]===b.outChannels||T.shape[0]===1,()=>`Error in fused conv2d: bias shape (${T.shape}) is not compatible with the number of output channels (${b.outChannels})`)));let A;if(l!=null){const _=l.shape;if(g(_.length<=1||_.length===3,()=>`Error in fused conv2d: only supports scalar, 1-D Tensor or 3-D Tensor PReLU activation weights but got a tensor of rank-${_.length}.`),_.length===1)g(_[0]===1||_[0]===b.outChannels,()=>`Error in fused conv2d: PReLU activation weights (${_}) is not compatible with the number of output channels (${b.outChannels}).`);else if(_.length===3)try{ne(_,b.outShape)}catch{const O=`Error in fused conv2d: PReLU activation weights (${_}) is not compatible with the output shape of the conv2d (${b.outShape}).`;throw Error(O)}A=m(l,"prelu weights","fused conv2d")}const E=(_,D)=>{g(s==="NHWC",()=>`Error in gradient of fused conv2D: got dataFormat of ${s} but only NHWC is currently supported.`);const[O,F,L,B]=D,W=wr(_,L,u);g(wn(a),()=>`Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${a}'`);const U=Nc(F.shape,W,O,n,r),Y=L0(F,W,O.shape,n,r),re=[U,Y];if(B!=null){const ve=Nr(B,W);re.push(ve)}return re},v={x:d,filter:f,bias:T,preluActivationWeights:A},k={strides:n,pad:r,dataFormat:s,dilations:a,dimRoundingMode:o,activation:u,leakyreluAlpha:p};return i==null?We((D,O,F)=>{let L=N.runKernel(Rr,v,k);return F([O,D,L]),y&&(L=$(L,[L.shape[1],L.shape[2],L.shape[3]])),{value:L,gradFunc:E}})(d,f):We((D,O,F,L)=>{let B=N.runKernel(Rr,v,k);return L([O,D,B,F]),y&&(B=$(B,[B.shape[1],B.shape[2],B.shape[3]])),{value:B,gradFunc:E}})(d,f,T)}const z0=w({fusedConv2d_:P0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function V0(t,e,n,r,s,a=[1,1],o){let i=t;t.rank===3&&(i=$(t,[1,t.shape[0],t.shape[1],t.shape[2]]));let u=e;u.rank===3&&(u=$(e,[1,e.shape[0],e.shape[1],e.shape[2]]));const l={x:i,dy:u},p={strides:r,pad:s,dimRoundingMode:o,dilations:a,filterShape:n};return N.runKernel(ui,l,p)}const M0=w({depthwiseConv2dNativeBackpropFilter_:V0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function W0(t,e,n,r,s,a=[1,1],o){let i=e,u=!1;e.rank===3&&(u=!0,i=$(e,[1,e.shape[0],e.shape[1],e.shape[2]]));const l={dy:i,filter:n},p={strides:r,pad:s,dimRoundingMode:o,dilations:a,inputShape:t},c=N.runKernel(li,l,p);return u?$(c,[c.shape[1],c.shape[2],c.shape[3]]):c}const q0=w({depthwiseConv2dNativeBackpropInput_:W0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function U0({x:t,filter:e,strides:n,pad:r,dataFormat:s="NHWC",dilations:a=[1,1],dimRoundingMode:o,bias:i,activation:u="linear",preluActivationWeights:l,leakyreluAlpha:p}){if(Tr(N.state.gradientDepth,u)===!1){let k=lr(t,e,n,r,s,a,o);return i!=null&&(k=R(k,i)),Sr(k,u,l,p)}const c=m(t,"x","depthwiseConv2d","float32"),f=m(e,"filter","depthwiseConv2d","float32");let d=c,y=!1;c.rank===3&&(y=!0,d=$(c,[1,c.shape[0],c.shape[1],c.shape[2]])),g(d.rank===4,()=>`Error in fused depthwiseConv2d: input must be rank 4, but got rank ${d.rank}.`),g(f.rank===4,()=>`Error in fused depthwiseConv2d: filter must be rank 4, but got rank ${f.rank}.`),g(d.shape[3]===f.shape[2],()=>`Error in fused depthwiseConv2d: number of input channels (${d.shape[3]}) must match the inChannels dimension in filter ${f.shape[2]}.`),a==null&&(a=[1,1]),g(Ye(n,a),()=>`Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`),Ae("fused depthwiseConv2d",r,o);const S=An(d.shape,f.shape,n,a,r,o,!0);let b;i!=null&&(b=m(i,"bias","fused conv2d"),[b]=ee(b,c),ne(S.outShape,b.shape));let T;l!=null&&(T=m(l,"prelu weights","fused depthwiseConv2d"));const A=(k,_)=>{g(wn(a),()=>`Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '${a}'`);const[D,O,F,L]=_,B=wr(k,F,u),W=q0(O.shape,B,D,n,r,a,o),U=M0(O,B,D.shape,n,r,a,o);if(L!=null){const Y=Nr(b,B);return[W,U,Y]}return[W,U]},E={x:d,filter:f,bias:b,preluActivationWeights:T},v={strides:n,pad:r,dataFormat:s,dilations:a,dimRoundingMode:o,activation:u,leakyreluAlpha:p};return i==null?We((_,D,O)=>{let F=N.runKernel(Cr,E,v);return O([D,_,F]),y&&(F=$(F,[F.shape[1],F.shape[2],F.shape[3]])),{value:F,gradFunc:A}})(d,f):We((_,D,O,F)=>{let L=N.runKernel(Cr,E,v);return F([D,_,L,O]),y&&(L=$(L,[L.shape[1],L.shape[2],L.shape[3]])),{value:L,gradFunc:A}})(d,f,b)}const G0=w({fusedDepthwiseConv2d_:U0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function j0({a:t,b:e,transposeA:n=!1,transposeB:r=!1,bias:s,activation:a="linear",preluActivationWeights:o,leakyreluAlpha:i=.2}){if(Tr(N.state.gradientDepth,a)===!1){let B=V(t,e,n,r);return s!=null&&(B=R(B,s)),Sr(B,a,o,i)}let u=m(t,"a","fused matMul"),l=m(e,"b","fused matMul");[u,l]=ee(u,l);const p=n?u.shape[u.rank-2]:u.shape[u.rank-1],c=r?l.shape[l.rank-1]:l.shape[l.rank-2],f=n?u.shape[u.rank-1]:u.shape[u.rank-2],d=r?l.shape[l.rank-2]:l.shape[l.rank-1],y=u.shape.slice(0,-2),S=l.shape.slice(0,-2),b=q(y),T=q(S);g(p===c,()=>`Error in fused matMul: inner shapes (${p}) and (${c}) of Tensors with shapes ${u.shape} and ${l.shape} and transposeA=${n} and transposeB=${r} must match.`);const E=ne(u.shape.slice(0,-2),l.shape.slice(0,-2)).concat([f,d]),v=n?$(u,[b,p,f]):$(u,[b,f,p]),k=r?$(l,[T,d,c]):$(l,[T,c,d]);let _;s!=null&&(_=m(s,"bias","fused matMul"),[_]=ee(_,u),ne(E,_.shape));let D;o!=null&&(D=m(o,"prelu weights","fused matMul"));const O=(B,W)=>{const[U,Y,re,ve]=W,Ue=wr($(B,re.shape),re,a);let Bt,Lt;if(!n&&!r?(Bt=V(Ue,Y,!1,!0),Lt=V(U,Ue,!0,!1)):!n&&r?(Bt=V(Ue,Y,!1,!1),Lt=V(Ue,U,!0,!1)):n&&!r?(Bt=V(Y,Ue,!1,!0),Lt=V(U,Ue,!1,!1)):(Bt=V(Y,Ue,!0,!0),Lt=V(Ue,U,!0,!0)),s!=null){const qh=Nr(ve,Ue);return[Bt,Lt,qh]}else return[Bt,Lt]},F={a:v,b:k,bias:_,preluActivationWeights:D},L={transposeA:n,transposeB:r,activation:a,leakyreluAlpha:i};return s==null?We((W,U,Y)=>{const re=N.runKernel(Fr,F,L);return Y([W,U,re]),{value:$(re,E),gradFunc:O}})(v,k):We((W,U,Y,re)=>{const ve=N.runKernel(Fr,F,L);return re([W,U,ve,Y]),{value:$(ve,E),gradFunc:O}})(v,k,_)}const H0=w({fusedMatMul_:j0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var ih=Object.freeze({__proto__:null,conv2d:z0,depthwiseConv2d:G0,matMul:H0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function K0(t){return br(t,.54,.46)}const X0=w({hammingWindow_:K0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Z0(t){return br(t,.5,.5)}const uh=w({hannWindow_:Z0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function J0(t,e,n,r=!1,s=0){let a=0;const o=[];for(;a+e<=t.size;)o.push(G(t,a,e)),a+=n;if(r)for(;a<t.size;){const i=a+e-t.size,u=ue([G(t,a,e-i),tn([i],s)]);o.push(u),a+=n}return o.length===0?Ut([],[0,e]):$(ue(o),[o.length,e])}const lh=w({frame_:J0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Y0(t,e,n,r,s=uh){r==null&&(r=ya(e));const a=lh(t,e,n),o=I(a,s(e));return mr(o,r)}const Q0=w({stft_:Y0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ew(t,e,n,r,s="bilinear",a=0){const o=m(t,"image","cropAndResize"),i=m(e,"boxes","cropAndResize","float32"),u=m(n,"boxInd","cropAndResize","int32"),l=i.shape[0];g(o.rank===4,()=>`Error in cropAndResize: image must be rank 4,but got rank ${o.rank}.`),g(i.rank===2&&i.shape[1]===4,()=>`Error in cropAndResize: boxes must be have size [${l},4] but had shape ${i.shape}.`),g(u.rank===1&&u.shape[0]===l,()=>`Error in cropAndResize: boxInd must be have size [${l}] but had shape ${i.shape}.`),g(r.length===2,()=>`Error in cropAndResize: cropSize must be of length 2, but got length ${r.length}.`),g(r[0]>=1&&r[1]>=1,()=>`cropSize must be atleast [1,1], but was ${r}`),g(s==="bilinear"||s==="nearest",()=>`method must be bilinear or nearest, but was ${s}`);const p={image:o,boxes:i,boxInd:u},c={method:s,extrapolationValue:a,cropSize:r};return N.runKernel(si,p,c)}const tw=w({cropAndResize_:ew});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function nw(t){const e=m(t,"image","flipLeftRight","float32");g(e.rank===4,()=>`Error in flipLeftRight: image must be rank 4,but got rank ${e.rank}.`);const n={image:e};return N.runKernel(Ti,n,{})}const rw=w({flipLeftRight_:nw});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sw(t){const e=m(t,"image","grayscaleToRGB"),n=e.rank-1,r=e.shape[n];g(e.rank>=2,()=>`Error in grayscaleToRGB: images must be at least rank 2, but got rank ${e.rank}.`),g(r===1,()=>`Error in grayscaleToRGB: last dimension of a grayscale image should be size 1, but got size ${r}.`);const s=new Array(e.rank);return s.fill(1,0,n),s[n]=3,qt(e,s)}const aw=w({grayscaleToRGB_:sw});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ow(t){const e=m(t,"image","RGBToGrayscale"),n=e.rank-1,r=e.shape[n];g(e.rank>=2,()=>`Error in RGBToGrayscale: images must be at least rank 2, but got rank ${e.rank}.`),g(r===3,()=>`Error in RGBToGrayscale: last dimension of an RGB image should be size 3, but got size ${r}.`);const s=e.dtype,a=X(e,"float32"),o=Ee([.2989,.587,.114]);let i;switch(e.rank){case 2:i=wt("ij,j->i",a,o);break;case 3:i=wt("ijk,k->ij",a,o);break;case 4:i=wt("ijkl,l->ijk",a,o);break;case 5:i=wt("ijklm,m->ijkl",a,o);break;case 6:i=wt("ijklmn,n->ijklm",a,o);break;default:throw new Error("Not a valid tensor rank.")}return i=Ge(i,-1),X(i,s)}const iw=w({rgbToGrayscale_:ow});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function uw(t,e,n=0,r=.5){const s=m(t,"image","rotateWithOffset","float32");g(s.rank===4,()=>`Error in rotateWithOffset: image must be rank 4,but got rank ${s.rank}.`);const a={image:s},o={radians:e,fillValue:n,center:r};return N.runKernel(hl,a,o)}const lw=w({rotateWithOffset_:uw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rn(t,e,n,r,s,a){r==null&&(r=.5),s==null&&(s=Number.NEGATIVE_INFINITY),a==null&&(a=0);const o=t.shape[0];return n=Math.min(n,o),g(0<=r&&r<=1,()=>`iouThreshold must be in [0, 1], but was '${r}'`),g(t.rank===2,()=>`boxes must be a 2D tensor, but was of rank '${t.rank}'`),g(t.shape[1]===4,()=>`boxes must have 4 columns, but 2nd dimension was ${t.shape[1]}`),g(e.rank===1,()=>"scores must be a 1D tensor"),g(e.shape[0]===o,()=>`scores has incompatible shape with boxes. Expected ${o}, but was ${e.shape[0]}`),g(0<=a&&a<=1,()=>`softNmsSigma must be in [0, 1], but was '${a}'`),{maxOutputSize:n,iouThreshold:r,scoreThreshold:s,softNmsSigma:a}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function cw(t,e,n,r=.5,s=Number.NEGATIVE_INFINITY){const a=m(t,"boxes","nonMaxSuppression","float32"),o=m(e,"scores","nonMaxSuppression","float32"),i=rn(a,o,n,r,s);n=i.maxOutputSize,r=i.iouThreshold,s=i.scoreThreshold;const u={maxOutputSize:n,iouThreshold:r,scoreThreshold:s};return N.runKernel(au,{boxes:a,scores:o},u)}const pw=w({nonMaxSuppression_:cw});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function hw(t,e,n){const r=fw(t,e,n),s=r<0?-(r+1):r;t.splice(s,0,e)}function fw(t,e,n){return mw(t,e,n||dw)}function dw(t,e){return t>e?1:t<e?-1:0}function mw(t,e,n){let r=0,s=t.length,a=0,o=!1;for(;r<s;){a=r+(s-r>>>1);const i=n(e,t[a]);i>0?r=a+1:(s=a,o=!i)}return o?r:-r-1}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ch(t,e,n,r,s){return ba(t,e,n,r,s,0)}function ph(t,e,n,r,s,a){return ba(t,e,n,r,s,0,!1,a,!0)}function hh(t,e,n,r,s,a){return ba(t,e,n,r,s,a,!0)}function ba(t,e,n,r,s,a,o=!1,i=!1,u=!1){const l=[];for(let b=0;b<e.length;b++)e[b]>s&&l.push({score:e[b],boxIndex:b,suppressBeginIndex:0});l.sort(Ga);const p=a>0?-.5/a:0,c=[],f=[];for(;c.length<n&&l.length>0;){const b=l.pop(),{score:T,boxIndex:A,suppressBeginIndex:E}=b;if(T<s)break;let v=!1;for(let k=c.length-1;k>=E;--k){const _=gw(t,A,c[k]);if(_>=r){v=!0;break}if(b.score=b.score*yw(r,p,_),b.score<=s)break}b.suppressBeginIndex=c.length,v||(b.score===T?(c.push(A),f.push(b.score)):b.score>s&&hw(l,b,Ga))}const d=c.length,y=n-d;i&&y>0&&(c.push(...new Array(y).fill(0)),f.push(...new Array(y).fill(0)));const S={selectedIndices:c};return o&&(S.selectedScores=f),u&&(S.validOutputs=d),S}function gw(t,e,n){const r=t.subarray(e*4,e*4+4),s=t.subarray(n*4,n*4+4),a=Math.min(r[0],r[2]),o=Math.min(r[1],r[3]),i=Math.max(r[0],r[2]),u=Math.max(r[1],r[3]),l=Math.min(s[0],s[2]),p=Math.min(s[1],s[3]),c=Math.max(s[0],s[2]),f=Math.max(s[1],s[3]),d=(i-a)*(u-o),y=(c-l)*(f-p);if(d<=0||y<=0)return 0;const S=Math.max(a,l),b=Math.max(o,p),T=Math.min(i,c),A=Math.min(u,f),E=Math.max(T-S,0)*Math.max(A-b,0);return E/(d+y-E)}function yw(t,e,n){const r=Math.exp(e*n*n);return n<=t?r:0}function Ga(t,e){return t.score-e.score||t.score===e.score&&e.boxIndex-t.boxIndex}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function bw(t,e,n,r=.5,s=Number.NEGATIVE_INFINITY){const a=m(t,"boxes","nonMaxSuppressionAsync"),o=m(e,"scores","nonMaxSuppressionAsync"),i=rn(a,o,n,r,s);n=i.maxOutputSize,r=i.iouThreshold,s=i.scoreThreshold;const u=await Promise.all([a.data(),o.data()]),l=u[0],p=u[1],{selectedIndices:c}=ch(l,p,n,r,s);return a!==t&&a.dispose(),o!==e&&o.dispose(),Ee(c,"int32")}const ww=bw;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Nw(t,e,n,r=.5,s=Number.NEGATIVE_INFINITY,a=0){const o=m(t,"boxes","nonMaxSuppression"),i=m(e,"scores","nonMaxSuppression"),u=rn(o,i,n,r,s,a);n=u.maxOutputSize,r=u.iouThreshold,s=u.scoreThreshold,a=u.softNmsSigma;const l={boxes:o,scores:i},p={maxOutputSize:n,iouThreshold:r,scoreThreshold:s,softNmsSigma:a},c=N.runKernel(iu,l,p);return{selectedIndices:c[0],selectedScores:c[1]}}const Sw=w({nonMaxSuppressionWithScore_:Nw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function Tw(t,e,n,r=.5,s=Number.NEGATIVE_INFINITY,a=0){const o=m(t,"boxes","nonMaxSuppressionAsync"),i=m(e,"scores","nonMaxSuppressionAsync"),u=rn(o,i,n,r,s,a);n=u.maxOutputSize,r=u.iouThreshold,s=u.scoreThreshold,a=u.softNmsSigma;const l=await Promise.all([o.data(),i.data()]),p=l[0],c=l[1],{selectedIndices:f,selectedScores:d}=hh(p,c,n,r,s,a);return o!==t&&o.dispose(),i!==e&&i.dispose(),{selectedIndices:Ee(f,"int32"),selectedScores:Ee(d)}}const Ew=Tw;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function vw(t,e,n,r=.5,s=Number.NEGATIVE_INFINITY,a=!1){const o=m(t,"boxes","nonMaxSuppression"),i=m(e,"scores","nonMaxSuppression"),u=rn(o,i,n,r,s,null),l=u.maxOutputSize,p=u.iouThreshold,c=u.scoreThreshold,f={boxes:o,scores:i},d={maxOutputSize:l,iouThreshold:p,scoreThreshold:c,padToMaxOutputSize:a},y=N.runKernel(ou,f,d);return{selectedIndices:y[0],validOutputs:y[1]}}const $w=w({nonMaxSuppressionPadded_:vw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function kw(t,e,n,r=.5,s=Number.NEGATIVE_INFINITY,a=!1){const o=m(t,"boxes","nonMaxSuppressionAsync"),i=m(e,"scores","nonMaxSuppressionAsync"),u=rn(o,i,n,r,s,null),l=u.maxOutputSize,p=u.iouThreshold,c=u.scoreThreshold,[f,d]=await Promise.all([o.data(),i.data()]),{selectedIndices:y,validOutputs:S}=ph(f,d,l,p,c,a);return o!==t&&o.dispose(),i!==e&&i.dispose(),{selectedIndices:Ee(y,"int32"),validOutputs:z(S,"int32")}}const _w=kw;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function xw(t,e,n=!1,r=!1){const s=m(t,"images","resizeBilinear");g(s.rank===3||s.rank===4,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${s.rank}.`),g(e.length===2,()=>`Error in resizeBilinear: new shape must 2D, but got shape ${e}.`),g(r===!1||n===!1,()=>"Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.");let a=s,o=!1;s.rank===3&&(o=!0,a=$(s,[1,s.shape[0],s.shape[1],s.shape[2]]));const i={images:a},u={alignCorners:n,halfPixelCenters:r,size:e},l=N.runKernel(vu,i,u);return o?$(l,[l.shape[1],l.shape[2],l.shape[3]]):l}const Iw=w({resizeBilinear_:xw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Aw(t,e,n=!1,r=!1){const s=m(t,"images","resizeNearestNeighbor");g(s.rank===3||s.rank===4,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${s.rank}.`),g(e.length===2,()=>`Error in resizeNearestNeighbor: new shape must 2D, but got shape ${e}.`),g(s.dtype==="float32"||s.dtype==="int32",()=>"`images` must have `int32` or `float32` as dtype"),g(r===!1||n===!1,()=>"Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.");let a=s,o=!1;s.rank===3&&(o=!0,a=$(s,[1,s.shape[0],s.shape[1],s.shape[2]]));const i={images:a},u={alignCorners:n,halfPixelCenters:r,size:e},l=N.runKernel(Eu,i,u);return o?$(l,[l.shape[1],l.shape[2],l.shape[3]]):l}const Dw=w({resizeNearestNeighbor_:Aw});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ow(t,e="binary",n=!1,r=.5){const s=m(t,"image","threshold"),a=.2989,o=.587,i=.114,u=s.shape[0]*s.shape[1];let l=I(Ee([r]),255),p,c,f,d;if(g(s.rank===3,()=>`Error in threshold: image must be rank 3,but got rank ${s.rank}.`),g(s.shape[2]===3||s.shape[2]===1,()=>`Error in threshold: image color channel must be equal to 3 or 1but got ${s.shape[2]}.`),g(s.dtype==="int32"||s.dtype==="float32",()=>`Error in dtype: image dtype must be int32 or float32,but got dtype ${s.dtype}.`),g(e==="otsu"||e==="binary",()=>`Method must be binary or otsu, but was ${e}`),s.shape[2]===3){[p,c,f]=Qt(s,[1,1,1],-1);const b=I(p,a),T=I(c,o),A=I(f,i);d=R(R(b,T),A)}else d=t;if(e==="otsu"){const b=Os(X(ca(d),"int32"),Fe([]),256);l=Fw(b,u)}const y=n?cr(d,l):Cn(d,l);return X(I(y,255),"int32")}function Fw(t,e){let n=Ee([-1]),r=Ee([0]),s=Ee([0]),a,o,i,u,l,p;for(let c=0;c<t.size-1;c++){a=G(t,0,c+1),o=G(t,c+1),l=K(H(a),e),p=K(H(o),e);const f=H(I(a,Jt(0,a.size)));i=K(f,H(a));const d=tn(o.shape,a.size),y=R(Jt(0,o.size),d),S=I(o,y);u=K(H(S),H(o));const b=P(i,u),T=P(i,u),A=I(l,p);s=I(I(A,b),T);const E=Cn(s,r);r=Ze(E,s,r),n=Ze(E,Ee([c]),n)}return n}const Rw=w({threshold_:Ow});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Cw(t,e,n="nearest",r="constant",s=0,a){const o=m(t,"image","transform","float32"),i=m(e,"transforms","transform","float32");g(o.rank===4,()=>`Error in transform: image must be rank 4,but got rank ${o.rank}.`),g(i.rank===2&&(i.shape[0]===o.shape[0]||i.shape[0]===1)&&i.shape[1]===8,()=>"Error in transform: Input transform should be batch x 8 or 1 x 8"),g(a==null||a.length===2,()=>`Error in transform: outputShape must be [height, width] or null, but got ${a}.`);const u={image:o,transforms:i},l={interpolation:n,fillMode:r,fillValue:s,outputShape:a};return N.runKernel(ol,u,l)}const Bw=w({transform_:Cw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Lw(t,e,n){const r=m(t,"a","bandPart");g(r.rank>=2,()=>`bandPart(): Rank must be at least 2, got ${r.rank}.`);const s=r.shape,[a,o]=r.shape.slice(-2);let i,u;typeof e=="number"?(g(e%1===0,()=>`bandPart(): numLower must be an integer, got ${e}.`),g(e<=a,()=>`bandPart(): numLower (${e}) must not be greater than the number of rows (${a}).`),i=m(e<0?a:e,"numLower","bandPart")):(g(e.dtype==="int32",()=>"bandPart(): numLower's dtype must be an int32."),i=Ze(tr(e,0),a,Tn(e,a))),typeof n=="number"?(g(n%1===0,()=>`bandPart(): numUpper must be an integer, got ${n}.`),g(n<=o,()=>`bandPart(): numUpper (${n}) must not be greater than the number of columns (${o}).`),u=m(n<0?o:n,"numUpper","bandPart")):(g(n.dtype==="int32",()=>"bandPart(): numUpper's dtype must be an int32."),u=Ze(tr(n,0),o,Tn(n,o)));const l=$(Jt(0,a,1,"int32"),[-1,1]),p=Jt(0,o,1,"int32"),c=P(l,p),f=Nn(cr(c,i),Vs(c,Re(u))),d=At([a,o],r.dtype);return $(qe(dt($(r,[-1,a,o])).map(y=>Ze(f,y,d))),s)}const Pw=w({bandPart_:Lw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zw(t){let e;if(Array.isArray(t)){e=!1,g(t!=null&&t.length>0,()=>"Gram-Schmidt process: input must not be null, undefined, or empty");const s=t[0].shape[0];for(let a=1;a<t.length;++a)g(t[a].shape[0]===s,()=>`Gram-Schmidt: Non-unique lengths found in the input vectors: (${t[a].shape[0]} vs. ${s})`)}else e=!0,t=Qt(t,t.shape[0],0).map(s=>gr(s,[0]));g(t.length<=t[0].shape[0],()=>`Gram-Schmidt: Number of vectors (${t.length}) exceeds number of dimensions (${t[0].shape[0]}).`);const n=[],r=t;for(let s=0;s<t.length;++s)n.push(N.tidy(()=>{let a=r[s];if(s>0)for(let o=0;o<s;++o){const i=I(H(I(n[o],a)),n[o]);a=P(a,i)}return K(a,Rn(a,"euclidean"))}));return e?qe(n,0):n}const Vw=w({gramSchmidt_:zw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Mw(t,e=!1){if(g(t.rank>=2,()=>`qr() requires input tensor to have a rank >= 2, but got rank ${t.rank}`),t.rank===2)return ja(t,e);{const n=t.shape.slice(0,t.shape.length-2).reduce((u,l)=>u*l),r=dt($(t,[n,t.shape[t.shape.length-2],t.shape[t.shape.length-1]]),0),s=[],a=[];r.forEach(u=>{const[l,p]=ja(u,e);s.push(l),a.push(p)});const o=$(qe(s,0),t.shape),i=$(qe(a,0),t.shape);return[o,i]}}function ja(t,e=!1){return N.tidy(()=>{g(t.shape.length===2,()=>`qr2d() requires a 2D Tensor, but got a ${t.shape.length}D Tensor.`);const n=t.shape[0],r=t.shape[1];let s=Ls(n),a=Xe(t);const o=Ut([[1]],[1,1]);let i=Xe(o);const u=n>=r?r:n;for(let l=0;l<u;++l){const p=a,c=i,f=s;[i,a,s]=N.tidy(()=>{const d=G(a,[l,l],[n-l,1]),y=Rn(d),S=G(a,[l,l],[1,1]),b=Ze(Cn(S,0),Ut([[-1]]),Ut([[1]])),T=P(S,I(b,y)),A=K(d,T);A.shape[0]===1?i=Xe(o):i=ue([o,G(A,[1,0],[A.shape[0]-1,A.shape[1]])],0);const E=Re(K(V(b,T),y)),v=G(a,[l,0],[n-l,r]),k=I(E,i),_=vn(i);if(l===0)a=P(v,V(k,V(_,v)));else{const F=P(v,V(k,V(_,v)));a=ue([G(a,[0,0],[l,r]),F],0)}const D=vn(k),O=G(s,[0,l],[n,s.shape[1]-l]);if(l===0)s=P(O,V(V(O,i),D));else{const F=P(O,V(V(O,i),D));s=ue([G(s,[0,0],[n,l]),F],1)}return[i,a,s]}),he([p,c,f])}return!e&&n>r&&(s=G(s,[0,0],[n,r]),a=G(a,[0,0],[r,r])),[s,a]})}const Ww=w({qr_:Mw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var pe;(function(t){t[t.NONE=0]="NONE",t[t.MEAN=1]="MEAN",t[t.SUM=2]="SUM",t[t.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"})(pe||(pe={}));function qw(t,e,n=pe.SUM_BY_NONZERO_WEIGHTS){const r=m(t,"losses","computeWeightedLoss");let s=null;e!=null&&(s=m(e,"weights","computeWeightedLoss"));const a=s==null?r:I(r,s);if(n===pe.NONE)return a;if(n===pe.SUM)return H(a);if(n===pe.MEAN){if(s==null)return Sn(a);{const o=r.size/s.size,i=K(H(a),H(s));return o>1?K(i,z(o)):i}}if(n===pe.SUM_BY_NONZERO_WEIGHTS){if(s==null)return K(H(a),z(r.size));{const o=I(s,st(r.shape)),i=X(H(Xs(o,z(0))),"float32");return K(H(a),i)}}throw Error(`Unknown reduction: ${n}`)}const Qe=w({computeWeightedLoss_:qw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Uw(t,e,n,r=pe.SUM_BY_NONZERO_WEIGHTS){const s=m(t,"labels","absoluteDifference"),a=m(e,"predictions","absoluteDifference");let o=null;n!=null&&(o=m(n,"weights","absoluteDifference")),fe(s.shape,a.shape,"Error in absoluteDifference: ");const i=be(P(s,a));return Qe(i,o,r)}const Gw=w({absoluteDifference_:Uw});function jw(t,e,n,r,s=pe.SUM_BY_NONZERO_WEIGHTS){const a=m(t,"labels","cosineDistance"),o=m(e,"predictions","cosineDistance");let i=null;r!=null&&(i=m(r,"weights","cosineDistance")),fe(a.shape,o.shape,"Error in cosineDistance: ");const u=z(1),l=P(u,H(I(a,o),n,!0));return Qe(l,i,s)}const Hw=w({cosineDistance_:jw});function Kw(t,e,n,r=pe.SUM_BY_NONZERO_WEIGHTS){let s=m(t,"labels","hingeLoss");const a=m(e,"predictions","hingeLoss");let o=null;n!=null&&(o=m(n,"weights","hingeLoss")),fe(s.shape,a.shape,"Error in hingeLoss: ");const i=z(1);s=P(I(z(2),s),i);const u=Ln(P(i,I(s,a)));return Qe(u,o,r)}const Xw=w({hingeLoss_:Kw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Zw(t,e,n,r=1,s=pe.SUM_BY_NONZERO_WEIGHTS){const a=m(t,"labels","huberLoss"),o=m(e,"predictions","huberLoss");let i=null;n!=null&&(i=m(n,"weights","huberLoss")),fe(a.shape,o.shape,"Error in huberLoss: ");const u=z(r),l=be(P(o,a)),p=Tn(l,u),c=P(l,p),f=R(I(z(.5),Ie(p)),I(u,c));return Qe(f,i,s)}const Jw=w({huberLoss_:Zw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Yw(t,e,n,r=1e-7,s=pe.SUM_BY_NONZERO_WEIGHTS){const a=m(t,"labels","logLoss"),o=m(e,"predictions","logLoss");let i=null;n!=null&&(i=m(n,"weights","logLoss")),fe(a.shape,o.shape,"Error in logLoss: ");const u=z(1),l=z(r),p=Re(I(a,Zt(R(o,l)))),c=I(P(u,a),Zt(R(P(u,o),l))),f=P(p,c);return Qe(f,i,s)}const Qw=w({logLoss_:Yw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function e1(t,e,n,r=pe.SUM_BY_NONZERO_WEIGHTS){const s=m(t,"labels","meanSquaredError"),a=m(e,"predictions","meanSquaredError");let o=null;n!=null&&(o=m(n,"weights","meanSquaredError")),fe(s.shape,a.shape,"Error in meanSquaredError: ");const i=ha(s,a);return Qe(i,o,r)}const t1=w({meanSquaredError_:e1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function n1(t,e){const n=m(t,"labels","sigmoidCrossEntropyWithLogits"),r=m(e,"logits","sigmoidCrossEntropyWithLogits");fe(n.shape,r.shape,"Error in sigmoidCrossEntropyWithLogits: ");const s=Ln(r),a=I(r,n),o=Ws(ct(Re(be(r))));return R(P(s,a),o)}function r1(t,e,n,r=0,s=pe.SUM_BY_NONZERO_WEIGHTS){let a=m(t,"multiClassLabels","sigmoidCrossEntropy");const o=m(e,"logits","sigmoidCrossEntropy");let i=null;if(n!=null&&(i=m(n,"weights","sigmoidCrossEntropy")),fe(a.shape,o.shape,"Error in sigmoidCrossEntropy: "),r>0){const l=z(r),p=z(1),c=z(.5);a=R(I(a,P(p,l)),I(c,l))}const u=n1(a,o);return Qe(u,i,s)}const s1=w({sigmoidCrossEntropy_:r1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function a1(t,e,n=-1){if(n===-1&&(n=e.rank-1),n!==e.rank-1)throw Error(`Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank ${e.rank} and dim was ${n}`);return We((s,a,o)=>{const u=Us(a,[n],!0),l=P(X(a,"float32"),u);o([s,l]);const p=Re(I(l,s));return{value:H(p,[n]),gradFunc:(d,y)=>{const[S,b]=y,T=Fn(d.shape,[n]);return[I($(d,T),P(X(S,"float32"),ct(b))),I($(d,T),P(ct(b),X(S,"float32")))]}}})(t,e)}function o1(t,e,n,r=0,s=pe.SUM_BY_NONZERO_WEIGHTS){let a=m(t,"onehotLabels","softmaxCrossEntropy");const o=m(e,"logits","softmaxCrossEntropy");let i=null;if(n!=null&&(i=m(n,"weights","softmaxCrossEntropy")),fe(a.shape,o.shape,"Error in softmaxCrossEntropy: "),r>0){const l=z(r),p=z(1),c=z(a.shape[1]);a=R(I(a,P(p,l)),K(l,c))}const u=a1(a,o);return Qe(u,i,s)}const i1=w({softmaxCrossEntropy_:o1});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function u1(t,e,n,r){const s=m(t,"indices","sparseFillEmptyRows","int32"),a=m(e,"values","sparseFillEmptyRows"),o=m(n,"denseShape","sparseFillEmptyRows","int32"),i=m(r,"defaultValue","sparseFillEmptyRows",a.dtype);if(s.rank!==2)throw new Error(`Indices should be Tensor2D but received shape
        ${s.shape}`);if(a.rank!==1)throw new Error(`Values should be Tensor1D but received shape ${a.shape}`);if(o.rank!==1)throw new Error(`Dense shape should be Tensor1D but received shape ${o.shape}`);if(i.rank!==0)throw new Error(`Default value should be a scalar but received shape ${i.shape}`);const u={indices:s,values:a,denseShape:o,defaultValue:i},l=N.runKernel(Gu,u);return{outputIndices:l[0],outputValues:l[1],emptyRowIndicator:l[2],reverseIndexMap:l[3]}}const l1=w({sparseFillEmptyRows_:u1});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function c1(t,e,n){const r=m(t,"inputIndices","sparseReshape","int32"),s=m(e,"inputShape","sparseReshape","int32"),a=m(n,"newShape","sparseReshape","int32");if(r.rank!==2)throw new Error(`Input indices should be Tensor2D but received shape
        ${r.shape}`);if(s.rank!==1)throw new Error(`Input shape should be Tensor1D but received shape ${s.shape}`);if(a.rank!==1)throw new Error(`New shape should be Tensor1D but received shape ${a.shape}`);const o={inputIndices:r,inputShape:s,newShape:a},i=N.runKernel(ju,o);return{outputIndices:i[0],outputShape:i[1]}}const p1=w({sparseReshape_:c1});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function h1(t,e,n){const r=m(t,"data","sparseSegmentMean"),s=m(e,"indices","sparseSegmentMean","int32"),a=m(n,"segmentIds","sparseSegmentMean","int32");if(r.rank<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(s.rank!==1)throw new Error(`Indices should be Tensor1D but received shape
          ${s.shape}`);if(a.rank!==1)throw new Error(`Segment ids should be Tensor1D but received shape
          ${a.shape}`);const o={data:r,indices:s,segmentIds:a};return N.runKernel(Hu,o)}const f1=w({sparseSegmentMean_:h1});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function d1(t,e,n){const r=m(t,"data","sparseSegmentSum"),s=m(e,"indices","sparseSegmentSum","int32"),a=m(n,"segmentIds","sparseSegmentSum","int32");if(r.rank<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(s.rank!==1)throw new Error(`Indices should be Tensor1D but received shape
         ${s.shape}`);if(a.rank!==1)throw new Error(`Segment ids should be Tensor1D but received shape
         ${a.shape}`);const o={data:r,indices:s,segmentIds:a};return N.runKernel(Ku,o)}const m1=w({sparseSegmentSum_:d1});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function g1(t,e,n,r,s,a,o,i){const u=m(t,"data","stringNGrams","string");if(u.dtype!=="string")throw new Error("Data must be of datatype string");if(u.shape.length!==1)throw new Error(`Data must be a vector, saw: ${u.shape}`);const l=m(e,"dataSplits","stringNGrams");if(l.dtype!=="int32")throw new Error("Data splits must be of datatype int32");const p={separator:n,nGramWidths:r,leftPad:s,rightPad:a,padWidth:o,preserveShortSequences:i},c={data:u,dataSplits:l},f=N.runKernel(Qu,c,p);return{nGrams:f[0],nGramsSplits:f[1]}}const y1=w({stringNGrams_:g1});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function b1(t,e,n=!0){const r=m(t,"input","stringSplit","string"),s=m(e,"delimiter","stringSplit","string");if(r.rank!==1)throw new Error(`Input should be Tensor1D but received shape ${r.shape}`);if(s.rank!==0)throw new Error(`Delimiter should be a scalar but received shape ${s.shape}`);const a={skipEmpty:n},o={input:r,delimiter:s},i=N.runKernel(el,o,a);return{indices:i[0],values:i[1],shape:i[2]}}const w1=w({stringSplit_:b1});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function N1(t,e){const n=m(t,"input","stringToHashBucketFast","string"),r={numBuckets:e};if(e<=0)throw new Error("Number of buckets must be at least 1");const s={input:n};return N.runKernel(tl,s,r)}const S1=w({stringToHashBucketFast_:N1});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function T1(t,e,n,r=!0){const s=m(t,"input","staticRegexReplace","string"),a={pattern:e,rewrite:n,replaceGlobal:r};return N.runKernel(Ju,{x:s},a)}const E1=w({staticRegexReplace_:T1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fh={fft:dr,ifft:En,rfft:mr,irfft:pa},dh={hammingWindow:X0,hannWindow:uh,frame:lh,stft:Q0},mh={flipLeftRight:rw,grayscaleToRGB:aw,resizeNearestNeighbor:Dw,resizeBilinear:Iw,rgbToGrayscale:iw,rotateWithOffset:lw,cropAndResize:tw,nonMaxSuppression:pw,nonMaxSuppressionAsync:ww,nonMaxSuppressionWithScore:Sw,nonMaxSuppressionWithScoreAsync:Ew,nonMaxSuppressionPadded:$w,nonMaxSuppressionPaddedAsync:_w,threshold:Rw,transform:Bw},gh={bandPart:Pw,gramSchmidt:Vw,qr:Ww},yh={absoluteDifference:Gw,computeWeightedLoss:Qe,cosineDistance:Hw,hingeLoss:Xw,huberLoss:Jw,logLoss:Qw,meanSquaredError:t1,sigmoidCrossEntropy:s1,softmaxCrossEntropy:i1},bh={sparseFillEmptyRows:l1,sparseReshape:p1,sparseSegmentMean:f1,sparseSegmentSum:m1},wh={stringNGrams:y1,stringSplit:w1,stringToHashBucketFast:S1,staticRegexReplace:E1};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const v1=new Map,Zr=new Map;class Nh{getClassName(){return this.constructor.className}static fromConfig(e,n){return new e(n)}}class tt{constructor(){this.classNameMap={}}static getMap(){return tt.instance==null&&(tt.instance=new tt),tt.instance}static register(e){tt.getMap().classNameMap[e.className]=[e,e.fromConfig]}}function Sh(t,e,n){g(t.className!=null,()=>"Class being registered does not have the static className property defined."),g(typeof t.className=="string",()=>"className is required to be a string, but got type "+typeof t.className),g(t.className.length>0,()=>"Class being registered has an empty-string as its className, which is disallowed."),typeof e>"u"&&(e="Custom"),typeof n>"u"&&(n=t.className);const r=n,s=e+">"+r;return tt.register(t),v1.set(s,t),Zr.set(t,s),t}function $1(t){return Zr.has(t)?Zr.get(t):t.className}var k1=Object.freeze({__proto__:null,Serializable:Nh,SerializationMap:tt,getRegisteredName:$1,registerClass:Sh});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class mt extends Nh{minimize(e,n=!1,r){const{value:s,grads:a}=this.computeGradients(e,r);if(r!=null){const o=r.map(i=>({name:i.name,tensor:a[i.name]}));this.applyGradients(o)}else this.applyGradients(a);return he(a),n?s:(s.dispose(),null)}get iterations(){return this.iterations_==null&&(this.iterations_=0),this.iterations_}incrementIterations(){this.iterations_=this.iterations+1}computeGradients(e,n){return jc(e,n)}dispose(){this.iterations_!=null&&he(this.iterations_)}async saveIterations(){return this.iterations_==null&&(this.iterations_=0),{name:"iter",tensor:z(this.iterations_,"int32")}}async getWeights(){throw new Error("getWeights() is not implemented for this optimizer yet.")}async setWeights(e){throw new Error(`setWeights() is not implemented for this optimizer class ${this.getClassName()}`)}async extractIterations(e){return this.iterations_=(await e[0].tensor.data())[0],e.slice(1)}}Object.defineProperty(mt,Symbol.hasInstance,{value:t=>t.minimize!=null&&t.computeGradients!=null&&t.applyGradients!=null});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class wa extends mt{static get className(){return"Adadelta"}constructor(e,n,r=null){super(),this.learningRate=e,this.rho=n,this.epsilon=r,this.accumulatedGrads=[],this.accumulatedUpdates=[],r==null&&(this.epsilon=N.backend.epsilon())}applyGradients(e){(Array.isArray(e)?e.map(r=>r.name):Object.keys(e)).forEach((r,s)=>{const a=N.registeredVariables[r],o=!1;this.accumulatedGrads[s]==null&&(this.accumulatedGrads[s]={originalName:`${r}/accum_grad`,variable:M(()=>Ne(a).variable(o))}),this.accumulatedUpdates[s]==null&&(this.accumulatedUpdates[s]={originalName:`${r}/accum_var`,variable:M(()=>Ne(a).variable(o))});const i=Array.isArray(e)?e[s].tensor:e[r];if(i==null)return;const u=this.accumulatedGrads[s].variable,l=this.accumulatedUpdates[s].variable;M(()=>{const p=R(I(u,this.rho),I(Ie(i),1-this.rho)),c=I(K(Me(R(l,this.epsilon)),Me(R(u,this.epsilon))),i),f=R(I(l,this.rho),I(Ie(c),1-this.rho));u.assign(p),l.assign(f);const d=R(I(c,-this.learningRate),a);a.assign(d)})}),this.incrementIterations()}dispose(){this.accumulatedUpdates!=null&&(he(this.accumulatedGrads.map(e=>e.variable)),he(this.accumulatedUpdates.map(e=>e.variable)))}async getWeights(){const e=[...this.accumulatedGrads,...this.accumulatedUpdates];return[await this.saveIterations()].concat(e.map(n=>({name:n.originalName,tensor:n.variable})))}async setWeights(e){e=await this.extractIterations(e);const n=e.length/2,r=!1;this.accumulatedGrads=e.slice(0,n).map(s=>({originalName:s.name,variable:s.tensor.variable(r)})),this.accumulatedUpdates=e.slice(n,n*2).map(s=>({originalName:s.name,variable:s.tensor.variable(r)}))}getConfig(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}}static fromConfig(e,n){return new e(n.learningRate,n.rho,n.epsilon)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Na extends mt{static get className(){return"Adagrad"}constructor(e,n=.1){super(),this.learningRate=e,this.initialAccumulatorValue=n,this.accumulatedGrads=[]}applyGradients(e){(Array.isArray(e)?e.map(r=>r.name):Object.keys(e)).forEach((r,s)=>{const a=N.registeredVariables[r];this.accumulatedGrads[s]==null&&(this.accumulatedGrads[s]={originalName:`${r}/accumulator`,variable:M(()=>tn(a.shape,this.initialAccumulatorValue).variable(!1))});const o=Array.isArray(e)?e[s].tensor:e[r];if(o==null)return;const i=this.accumulatedGrads[s].variable;M(()=>{const u=R(i,Ie(o));i.assign(u);const l=R(I(K(o,Me(R(u,N.backend.epsilon()))),-this.learningRate),a);a.assign(l)})}),this.incrementIterations()}dispose(){this.accumulatedGrads!=null&&he(this.accumulatedGrads.map(e=>e.variable))}async getWeights(){return[await this.saveIterations()].concat(this.accumulatedGrads.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);const n=!1;this.accumulatedGrads=e.map(r=>({originalName:r.name,variable:r.tensor.variable(n)}))}getConfig(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}}static fromConfig(e,n){return new e(n.learningRate,n.initialAccumulatorValue)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Sa extends mt{static get className(){return"Adam"}constructor(e,n,r,s=null){super(),this.learningRate=e,this.beta1=n,this.beta2=r,this.epsilon=s,this.accumulatedFirstMoment=[],this.accumulatedSecondMoment=[],M(()=>{this.accBeta1=z(n).variable(),this.accBeta2=z(r).variable()}),s==null&&(this.epsilon=N.backend.epsilon())}applyGradients(e){const n=Array.isArray(e)?e.map(r=>r.name):Object.keys(e);M(()=>{const r=P(1,this.accBeta1),s=P(1,this.accBeta2);n.forEach((a,o)=>{const i=N.registeredVariables[a],u=!1;this.accumulatedFirstMoment[o]==null&&(this.accumulatedFirstMoment[o]={originalName:`${a}/m`,variable:M(()=>Ne(i).variable(u))}),this.accumulatedSecondMoment[o]==null&&(this.accumulatedSecondMoment[o]={originalName:`${a}/v`,variable:M(()=>Ne(i).variable(u))});const l=Array.isArray(e)?e[o].tensor:e[a];if(l==null)return;const p=this.accumulatedFirstMoment[o].variable,c=this.accumulatedSecondMoment[o].variable,f=R(I(p,this.beta1),I(l,1-this.beta1)),d=R(I(c,this.beta2),I(Ie(l),1-this.beta2)),y=K(f,r),S=K(d,s);p.assign(f),c.assign(d);const b=R(I(K(y,R(Me(S),this.epsilon)),-this.learningRate),i);i.assign(b)}),this.accBeta1.assign(I(this.accBeta1,this.beta1)),this.accBeta2.assign(I(this.accBeta2,this.beta2))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.accBeta2.dispose(),this.accumulatedFirstMoment!=null&&he(this.accumulatedFirstMoment.map(e=>e.variable)),this.accumulatedSecondMoment!=null&&he(this.accumulatedSecondMoment.map(e=>e.variable))}async getWeights(){const e=[...this.accumulatedFirstMoment,...this.accumulatedSecondMoment];return[await this.saveIterations()].concat(e.map(n=>({name:n.originalName,tensor:n.variable})))}async setWeights(e){e=await this.extractIterations(e),M(()=>{this.accBeta1.assign(Xt(this.beta1,this.iterations_+1)),this.accBeta2.assign(Xt(this.beta2,this.iterations_+1))});const n=e.length/2,r=!1;this.accumulatedFirstMoment=e.slice(0,n).map(s=>({originalName:s.name,variable:s.tensor.variable(r)})),this.accumulatedSecondMoment=e.slice(n,n*2).map(s=>({originalName:s.name,variable:s.tensor.variable(r)}))}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}}static fromConfig(e,n){return new e(n.learningRate,n.beta1,n.beta2,n.epsilon)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Ta extends mt{static get className(){return"Adamax"}constructor(e,n,r,s=null,a=0){super(),this.learningRate=e,this.beta1=n,this.beta2=r,this.epsilon=s,this.decay=a,this.accumulatedFirstMoment=[],this.accumulatedWeightedInfNorm=[],M(()=>{this.iteration=z(0).variable(),this.accBeta1=z(n).variable()}),s==null&&(this.epsilon=N.backend.epsilon())}applyGradients(e){const n=Array.isArray(e)?e.map(r=>r.name):Object.keys(e);M(()=>{const r=P(1,this.accBeta1),s=K(-this.learningRate,R(I(this.iteration,this.decay),1));n.forEach((a,o)=>{const i=N.registeredVariables[a],u=!1;this.accumulatedFirstMoment[o]==null&&(this.accumulatedFirstMoment[o]={originalName:`${a}/m`,variable:Ne(i).variable(u)}),this.accumulatedWeightedInfNorm[o]==null&&(this.accumulatedWeightedInfNorm[o]={originalName:`${a}/v`,variable:Ne(i).variable(u)});const l=Array.isArray(e)?e[o].tensor:e[a];if(l==null)return;const p=this.accumulatedFirstMoment[o].variable,c=this.accumulatedWeightedInfNorm[o].variable,f=R(I(p,this.beta1),I(l,1-this.beta1)),d=I(c,this.beta2),y=be(l),S=Ks(d,y);p.assign(f),c.assign(S);const b=R(I(K(s,r),K(f,R(S,this.epsilon))),i);i.assign(b)}),this.iteration.assign(R(this.iteration,1)),this.accBeta1.assign(I(this.accBeta1,this.beta1))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.iteration.dispose(),this.accumulatedFirstMoment!=null&&he(this.accumulatedFirstMoment.map(e=>e.variable)),this.accumulatedWeightedInfNorm!=null&&he(this.accumulatedWeightedInfNorm.map(e=>e.variable))}async getWeights(){throw new Error("getWeights() is not implemented for Adamax yet.")}async setWeights(e){throw new Error("setWeights() is not implemented for Adamax yet.")}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}}static fromConfig(e,n){return new e(n.learningRate,n.beta1,n.beta2,n.epsilon,n.decay)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Er extends mt{static get className(){return"SGD"}constructor(e){super(),this.learningRate=e,this.setLearningRate(e)}applyGradients(e){(Array.isArray(e)?e.map(r=>r.name):Object.keys(e)).forEach((r,s)=>{const a=Array.isArray(e)?e[s].tensor:e[r];if(a==null)return;const o=N.registeredVariables[r];M(()=>{const i=R(I(this.c,a),o);o.assign(i)})}),this.incrementIterations()}setLearningRate(e){this.learningRate=e,this.c!=null&&this.c.dispose(),this.c=Oe(z(-e))}dispose(){this.c.dispose()}async getWeights(){return[await this.saveIterations()]}async setWeights(e){if(e=await this.extractIterations(e),e.length!==0)throw new Error("SGD optimizer does not have settable weights.")}getConfig(){return{learningRate:this.learningRate}}static fromConfig(e,n){return new e(n.learningRate)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Ea extends Er{static get className(){return"Momentum"}constructor(e,n,r=!1){super(e),this.learningRate=e,this.momentum=n,this.useNesterov=r,this.accumulations=[],this.m=z(this.momentum)}applyGradients(e){(Array.isArray(e)?e.map(r=>r.name):Object.keys(e)).forEach((r,s)=>{const a=N.registeredVariables[r];this.accumulations[s]==null&&(this.accumulations[s]={originalName:`${r}/momentum`,variable:M(()=>Ne(a).variable(!1))});const o=this.accumulations[s].variable,i=Array.isArray(e)?e[s].tensor:e[r];i!=null&&M(()=>{let u;const l=R(I(this.m,o),i);this.useNesterov?u=R(I(this.c,R(i,I(l,this.m))),a):u=R(I(this.c,l),a),o.assign(l),a.assign(u)})}),this.incrementIterations()}dispose(){this.m.dispose(),this.accumulations!=null&&he(this.accumulations.map(e=>e.variable))}setMomentum(e){this.momentum=e}async getWeights(){return[await this.saveIterations()].concat(this.accumulations.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);const n=!1;this.accumulations=e.map(r=>({originalName:r.name,variable:r.tensor.variable(n)}))}getConfig(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}}static fromConfig(e,n){return new e(n.learningRate,n.momentum,n.useNesterov)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class va extends mt{static get className(){return"RMSProp"}constructor(e,n=.9,r=0,s=null,a=!1){if(super(),this.learningRate=e,this.decay=n,this.momentum=r,this.epsilon=s,this.accumulatedMeanSquares=[],this.accumulatedMoments=[],this.accumulatedMeanGrads=[],this.centered=a,s==null&&(this.epsilon=N.backend.epsilon()),e==null)throw new Error("learningRate for RMSPropOptimizer must be defined.")}applyGradients(e){(Array.isArray(e)?e.map(r=>r.name):Object.keys(e)).forEach((r,s)=>{const a=N.registeredVariables[r],o=!1;this.accumulatedMeanSquares[s]==null&&(this.accumulatedMeanSquares[s]={originalName:`${r}/rms`,variable:M(()=>Ne(a).variable(o))}),this.accumulatedMoments[s]==null&&(this.accumulatedMoments[s]={originalName:`${r}/momentum`,variable:M(()=>Ne(a).variable(o))}),this.accumulatedMeanGrads[s]==null&&this.centered&&(this.accumulatedMeanGrads[s]={originalName:`${r}/mg`,variable:M(()=>Ne(a).variable(o))});const i=Array.isArray(e)?e[s].tensor:e[r];if(i==null)return;const u=this.accumulatedMeanSquares[s].variable,l=this.accumulatedMoments[s].variable;M(()=>{const p=R(I(u,this.decay),I(Ie(i),1-this.decay));if(this.centered){const c=this.accumulatedMeanGrads[s].variable,f=R(I(c,this.decay),I(i,1-this.decay)),d=K(I(i,this.learningRate),Me(P(p,R(Ie(f),this.epsilon)))),y=R(I(l,this.momentum),d);u.assign(p),c.assign(f),l.assign(y);const S=P(a,y);a.assign(S)}else{const c=R(I(u,this.decay),I(Ie(i),1-this.decay)),f=R(I(l,this.momentum),K(I(i,this.learningRate),Me(R(c,this.epsilon))));u.assign(c),l.assign(f);const d=P(a,f);a.assign(d)}})}),this.incrementIterations()}dispose(){this.accumulatedMeanSquares!=null&&he(this.accumulatedMeanSquares.map(e=>e.variable)),this.accumulatedMeanGrads!=null&&this.centered&&he(this.accumulatedMeanGrads.map(e=>e.variable)),this.accumulatedMoments!=null&&he(this.accumulatedMoments.map(e=>e.variable))}async getWeights(){const e=[...this.accumulatedMeanSquares,...this.accumulatedMoments];return this.centered&&e.push(...this.accumulatedMeanGrads),[await this.saveIterations()].concat(e.map(n=>({name:n.originalName,tensor:n.variable})))}async setWeights(e){e=await this.extractIterations(e);const n=this.centered?e.length/3:e.length/2,r=!1;this.accumulatedMeanSquares=e.slice(0,n).map(s=>({originalName:s.name,variable:s.tensor.variable(r)})),this.accumulatedMoments=e.slice(n,n*2).map(s=>({originalName:s.name,variable:s.tensor.variable(r)})),this.centered&&(this.accumulatedMeanGrads=e.slice(n*2,n*3).map(s=>({originalName:s.name,variable:s.tensor.variable(r)})))}getConfig(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}}static fromConfig(e,n){return new e(n.learningRate,n.decay,n.momentum,n.epsilon,n.centered)}}/**
 * @license
 * Copyright 2022 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _1=[wa,Na,Sa,Ta,Ea,va,Er];function x1(){for(const t of _1)Sh(t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const I1="model",A1=".json",D1=".weights.bin";function Ha(t){return new Promise(e=>setTimeout(e)).then(t)}class Dt{constructor(e){if(!C().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(Dt.URL_SCHEME)&&(e=e.slice(Dt.URL_SCHEME.length)),(e==null||e.length===0)&&(e=I1),this.modelJsonFileName=e+A1,this.weightDataFileName=e+D1}async save(e){if(typeof document>"u")throw new Error("Browser downloads are not supported in this environment since `document` is not present");const n=Le.join(e.weightData),r=window.URL.createObjectURL(new Blob([n],{type:"application/octet-stream"}));if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{const s=[{paths:["./"+this.weightDataFileName],weights:e.weightSpecs}],a=Ll(e,s),o=window.URL.createObjectURL(new Blob([JSON.stringify(a)],{type:"application/json"})),i=this.modelJsonAnchor==null?document.createElement("a"):this.modelJsonAnchor;if(i.download=this.modelJsonFileName,i.href=o,await Ha(()=>i.dispatchEvent(new MouseEvent("click"))),e.weightData!=null){const u=this.weightDataAnchor==null?document.createElement("a"):this.weightDataAnchor;u.download=this.weightDataFileName,u.href=r,await Ha(()=>u.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:In(e)}}}}Dt.URL_SCHEME="downloads://";class O1{constructor(e){if(e==null||e.length<1)throw new Error(`When calling browserFiles, at least 1 file is required, but received ${e}`);this.jsonFile=e[0],this.weightsFiles=e.slice(1)}async load(){return new Promise((e,n)=>{const r=new FileReader;r.onload=s=>{const a=JSON.parse(s.target.result),o=a.modelTopology;if(o==null){n(new Error(`modelTopology field is missing from file ${this.jsonFile.name}`));return}if(a.weightsManifest==null){n(new Error(`weightManifest field is missing from file ${this.jsonFile.name}`));return}if(this.weightsFiles.length===0){e({modelTopology:o});return}const u=ks(a,l=>this.loadWeights(l));e(u)},r.onerror=s=>n(`Failed to read model topology and weights manifest JSON from file '${this.jsonFile.name}'. BrowserFiles supports loading Keras-style tf.Model artifacts only.`),r.readAsText(this.jsonFile)})}loadWeights(e){const n=[],r=[];for(const o of e)n.push(...o.weights),r.push(...o.paths);const s=this.checkManifestAndWeightFiles(e),a=r.map(o=>this.loadWeightsFile(o,s[o]));return Promise.all(a).then(o=>[n,o])}loadWeightsFile(e,n){return new Promise((r,s)=>{const a=new FileReader;a.onload=o=>{const i=o.target.result;r(i)},a.onerror=o=>s(`Failed to weights data from file of path '${e}'.`),a.readAsArrayBuffer(n)})}checkManifestAndWeightFiles(e){const n=[],r=this.weightsFiles.map(a=>Ua(a.name)),s={};for(const a of e)a.paths.forEach(o=>{const i=Ua(o);if(n.indexOf(i)!==-1)throw new Error(`Duplicate file basename found in weights manifest: '${i}'`);if(n.push(i),r.indexOf(i)===-1)throw new Error(`Weight file with basename '${i}' is not provided.`);s[o]=this.weightsFiles[r.indexOf(i)]});if(n.length!==this.weightsFiles.length)throw new Error(`Mismatch in the number of files in weights manifest (${n.length}) and the number of weight files provided (${this.weightsFiles.length}).`);return s}}const F1=t=>C().getBool("IS_BROWSER")&&!Array.isArray(t)&&t.startsWith(Dt.URL_SCHEME)?R1(t.slice(Dt.URL_SCHEME.length)):null;Q.registerSaveRouter(F1);function R1(t="model"){return new Dt(t)}function C1(t){return new O1(t)}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ka(t,e,n,r){o(t),n=n??0,r=r??1,i(n,r);let s=0;const a=u=>(u.then(l=>{const p=n+ ++s/t.length*(r-n);return e(p),l}),u);function o(u){g(u!=null&&Array.isArray(u)&&u.length>0,()=>"promises must be a none empty array")}function i(u,l){g(u>=0&&u<=1,()=>`Progress fraction must be in range [0, 1], but got startFraction ${u}`),g(l>=0&&l<=1,()=>`Progress fraction must be in range [0, 1], but got endFraction ${l}`),g(l>=u,()=>`startFraction must be no more than endFraction, but got startFraction ${u} and endFraction ${l}`)}return Promise.all(t.map(a))}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function Th(t,e){e==null&&(e={});const n=e.fetchFunc==null?C().platform.fetch:e.fetchFunc,r=t.map(c=>n(c,e.requestInit,{isBinary:!0})),i=(e.onProgress==null?await Promise.all(r):await Ka(r,e.onProgress,0,.5)).map(c=>c.arrayBuffer());return e.onProgress==null?await Promise.all(i):await Ka(i,e.onProgress,.5,1)}function B1(t,e){var n;const r=e.fetchFunc==null?C().platform.fetch:e.fetchFunc;let s=0,a;return(n=e.onProgress)===null||n===void 0||n.call(e,0),new ReadableStream({pull:async o=>{for(var i;s<t.length;){a||(a=(await r(t[s],e.requestInit,{isBinary:!0})).body.getReader());const{done:u,value:l}=await a.read();if(u){s++,a=void 0,(i=e.onProgress)===null||i===void 0||i.call(e,s/t.length);continue}o.enqueue(l);return}o.close()}})}async function L1(t,e="",n,r){return Eh(o=>Th(o,{requestInit:r}))(t,e,n)}function Eh(t){return async(e,n="",r)=>{const s=e.map(()=>!1),a={},o=r!=null?r.map(()=>!1):[],i=[];if(e.forEach((d,y)=>{let S=0;d.weights.forEach(b=>{const T="quantization"in b?b.quantization.dtype:b.dtype,A=kt[T]*q(b.shape),E=()=>{s[y]=!0,a[y]==null&&(a[y]=[]),a[y].push({manifestEntry:b,groupOffset:S,sizeBytes:A})};r!=null?r.forEach((v,k)=>{v===b.name&&(E(),o[k]=!0)}):E(),i.push(b.name),S+=A})}),!o.every(d=>d)){const d=r.filter((y,S)=>!o[S]);throw new Error(`Could not find weights in manifest with names: ${d.join(", ")}. 
Manifest JSON has weights with names: ${i.join(", ")}.`)}const u=s.reduce((d,y,S)=>(y&&d.push(S),d),[]),l=[];u.forEach(d=>{e[d].paths.forEach(y=>{const S=n+(n.endsWith("/")?"":"/")+y;l.push(S)})});const p=await t(l),c={};let f=0;return u.forEach(d=>{const y=e[d].paths.length,S=new Le(p.slice(f,f+y));a[d].forEach(T=>{const A=S.slice(T.groupOffset,T.groupOffset+T.sizeBytes),E=Rl(A,[T.manifestEntry]);for(const v in E)c[v]=E[v]}),f+=y}),c}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const P1="application/octet-stream",z1="application/json";class $a{constructor(e,n){if(this.DEFAULT_METHOD="POST",n==null&&(n={}),this.weightPathPrefix=n.weightPathPrefix,this.weightUrlConverter=n.weightUrlConverter,n.fetchFunc!=null?(g(typeof n.fetchFunc=="function",()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=n.fetchFunc):this.fetch=C().platform.fetch,g(e!=null&&e.length>0,()=>"URL path for http must not be null, undefined or empty."),Array.isArray(e)&&g(e.length===2,()=>`URL paths for http must have a length of 2, (actual length is ${e.length}).`),this.path=e,n.requestInit!=null&&n.requestInit.body!=null)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=n.requestInit||{},this.loadOptions=n}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");const n=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);n.body=new FormData;const r=[{paths:["./model.weights.bin"],weights:e.weightSpecs}],s=Ll(e,r);if(n.body.append("model.json",new Blob([JSON.stringify(s)],{type:z1}),"model.json"),e.weightData!=null){const o=Le.join(e.weightData);n.body.append("model.weights.bin",new Blob([o],{type:P1}),"model.weights.bin")}const a=await this.fetch(this.path,n);if(a.ok)return{modelArtifactsInfo:In(e),responses:[a]};throw new Error(`BrowserHTTPRequest.save() failed due to HTTP response status ${a.status}.`)}async loadModelJSON(){const e=await this.fetch(this.path,this.requestInit);if(!e.ok)throw new Error(`Request to ${this.path} failed with status code ${e.status}. Please verify this URL points to the model JSON of the model to load.`);let n;try{n=await e.json()}catch{let o=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(".pb")?o+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":o+=" Please make sure the server is serving valid JSON for this request.",new Error(o)}const r=n.modelTopology,s=n.weightsManifest;if(r==null&&s==null)throw new Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);return n}async load(){if(this.loadOptions.streamWeights)return this.loadStream();const e=await this.loadModelJSON();return ks(e,n=>this.loadWeights(n))}async loadStream(){const e=await this.loadModelJSON(),n=await this.getWeightUrls(e.weightsManifest),r=Yn(e.weightsManifest),s=()=>B1(n,this.loadOptions);return Object.assign(Object.assign({},e),{weightSpecs:r,getWeightStream:s})}async getWeightUrls(e){const n=Array.isArray(this.path)?this.path[1]:this.path,[r,s]=V1(n),a=this.weightPathPrefix||r,o=[],i=[];for(const u of e)for(const l of u.paths)this.weightUrlConverter!=null?i.push(this.weightUrlConverter(l)):o.push(a+l+s);return this.weightUrlConverter&&o.push(...await Promise.all(i)),o}async loadWeights(e){const n=await this.getWeightUrls(e),r=Yn(e),s=await Th(n,this.loadOptions);return[r,s]}}$a.URL_SCHEME_REGEX=/^https?:\/\//;function V1(t){const e=t.lastIndexOf("/"),n=t.lastIndexOf("?"),r=t.substring(0,e),s=n>e?t.substring(n):"";return[r+"/",s]}function Jr(t){return t.match($a.URL_SCHEME_REGEX)!=null}const vh=(t,e)=>{if(typeof fetch>"u"&&(e==null||e.fetchFunc==null))return null;{let n=!0;if(Array.isArray(t)?n=t.every(r=>Jr(r)):n=Jr(t),n)return ka(t,e)}return null};Q.registerSaveRouter(vh);Q.registerLoadRouter(vh);function ka(t,e){return new $a(t,e)}function M1(t,e){return ka(t,e)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class xr{constructor(e){this.modelArtifacts=e}load(){return this.modelArtifacts}}class $h{constructor(e){this.saveHandler=e}save(e){return this.saveHandler(e)}}class W1{constructor(e){e.load&&(this.load=()=>Promise.resolve(e.load())),e.save&&(this.save=n=>Promise.resolve(e.save(n)))}}function q1(t,e,n,r){const s=arguments;return new W1(rr(...s))}function rr(t,e,n,r){return arguments.length===1?t.modelTopology!=null||t.weightSpecs!=null?new xr(t):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new xr({modelTopology:t})):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new xr({modelTopology:t,weightSpecs:e,weightData:n,trainingConfig:r}))}function U1(t){return new $h(t)}function G1(t){return new $h(t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var _a=Object.freeze({__proto__:null,CompositeArrayBuffer:Le,browserFiles:C1,browserHTTPRequest:M1,concatenateArrayBuffers:Vd,copyModel:um,decodeWeights:Rl,decodeWeightsStream:Bl,encodeWeights:Rd,fromMemory:q1,fromMemorySync:rr,getLoadHandlers:Kd,getModelArtifactsForJSON:ks,getModelArtifactsForJSONSync:$s,getModelArtifactsInfoForJSON:In,getSaveHandlers:Hd,getWeightSpecs:Yn,http:ka,isHTTPScheme:Jr,listModels:om,loadWeights:L1,moveModel:lm,registerLoadRouter:jd,registerSaveRouter:Gd,removeModel:im,weightsLoaderFactory:Eh,withSaveHandler:U1,withSaveHandlerSync:G1});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function j1(t,e,n){const r=m(t,"labels","confusionMatrix"),s=m(e,"predictions","confusionMatrix");g(n==null||n>0&&Number.isInteger(n),()=>`If provided, numClasses must be a positive integer, but got ${n}`),g(r.rank===1,()=>`Expected the rank of labels to be 1, but got ${r.rank}`),g(s.rank===1,()=>`Expected the rank of predictions to be 1, but got ${s.rank}`),g(r.shape[0]===s.shape[0],()=>`Mismatch in the number of examples: ${r.shape[0]} vs. ${s.shape[0]}. Labels and predictions should have the same number of elements.`),g(n>0&&Number.isInteger(n),()=>`numClasses is required to be a positive integer, but got ${n}`);const a=nr(X(r,"int32"),n),o=nr(X(s,"int32"),n),i=vn(a),u=V(i,o);return X(u,"int32")}const H1=w({confusionMatrix_:j1});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var K1=Object.freeze({__proto__:null,confusionMatrix:H1});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let gt,Xa=!1;function kh(t,e=3){if(e>4)throw new Error("Cannot construct Tensor with more than 4 channels from pixels.");if(t==null)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");let n=!1,r=!1,s=!1,a=!1,o=!1,i=!1;if(t.data instanceof Uint8Array)n=!0;else if(typeof ImageData<"u"&&t instanceof ImageData)r=!0;else if(typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement)s=!0;else if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement)a=!0;else if(t.getContext!=null)o=!0;else if(typeof ImageBitmap<"u"&&t instanceof ImageBitmap)i=!0;else throw new Error(`pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, but was ${t.constructor.name}`);if(fn(Or,N.backendName)!=null){const y={pixels:t},S={numChannels:e};return N.runKernel(Or,y,S)}const[l,p]=s?[t.videoWidth,t.videoHeight]:[t.width,t.height];let c;if(o)c=t.getContext("2d").getImageData(0,0,l,p).data;else if(r||n)c=t.data;else if(a||s||i){if(gt==null)if(typeof document>"u")if(typeof OffscreenCanvas<"u"&&typeof OffscreenCanvasRenderingContext2D<"u")gt=new OffscreenCanvas(1,1).getContext("2d");else throw new Error("Cannot parse input in current context. Reason: OffscreenCanvas Context2D rendering is not supported.");else gt=document.createElement("canvas").getContext("2d",{willReadFrequently:!0});gt.canvas.width=l,gt.canvas.height=p,gt.drawImage(t,0,0,l,p),c=gt.getImageData(0,0,l,p).data}let f;if(e===4)f=new Int32Array(c);else{const y=l*p;f=new Int32Array(y*e);for(let S=0;S<y;S++)for(let b=0;b<e;++b)f[S*e+b]=c[S*4+b]}return da(f,[p,l,e],"int32")}function X1(t){return t!=null&&t.data instanceof Uint8Array}function Z1(){return typeof window<"u"&&typeof ImageBitmap<"u"&&window.hasOwnProperty("createImageBitmap")}function J1(t){return t!=null&&t.width!==0&&t.height!==0}function Y1(t){return Z1()&&!(t instanceof ImageBitmap)&&J1(t)&&!X1(t)}async function Q1(t,e=3){let n=null;if(C().getBool("WRAP_TO_IMAGEBITMAP")&&Y1(t)){let r;try{r=await createImageBitmap(t,{premultiplyAlpha:"none"})}catch{r=null}r!=null&&r.width===t.width&&r.height===t.height?n=r:n=t}else n=t;return kh(n,e)}function _h(t){if(t.rank!==2&&t.rank!==3)throw new Error(`toPixels only supports rank 2 or 3 tensors, got rank ${t.rank}.`);const e=t.rank===2?1:t.shape[2];if(e>4||e===2)throw new Error(`toPixels only supports depth of size 1, 3 or 4 but got ${e}`);if(t.dtype!=="float32"&&t.dtype!=="int32")throw new Error(`Unsupported type for toPixels: ${t.dtype}. Please use float32 or int32 tensors.`)}function eN(t){const e=t?.alpha||1;if(e>1||e<0)throw new Error(`Alpha value ${e} is suppoed to be in range [0 - 1].`)}async function tN(t,e){let n=m(t,"img","toPixels");if(!(t instanceof te)){const l=n;n=X(l,"int32"),l.dispose()}_h(n);const[r,s]=n.shape.slice(0,2),a=n.rank===2?1:n.shape[2],o=await n.data(),i=n.dtype==="float32"?255:1,u=new Uint8ClampedArray(s*r*4);for(let l=0;l<r*s;++l){const p=[0,0,0,255];for(let f=0;f<a;f++){const d=o[l*a+f];if(n.dtype==="float32"){if(d<0||d>1)throw new Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${d}.`)}else if(n.dtype==="int32"&&(d<0||d>255))throw new Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${d}.`);a===1?(p[0]=d*i,p[1]=d*i,p[2]=d*i):p[f]=d*i}const c=l*4;u[c+0]=Math.round(p[0]),u[c+1]=Math.round(p[1]),u[c+2]=Math.round(p[2]),u[c+3]=Math.round(p[3])}if(e!=null){Xa||fn(ys,N.backendName)!=null&&(console.warn("tf.browser.toPixels is not efficient to draw tensor on canvas. Please try tf.browser.draw instead."),Xa=!0),e.width=s,e.height=r;const l=e.getContext("2d"),p=new ImageData(u,s,r);l.putImageData(p,0,0)}return n!==t&&n.dispose(),u}function nN(t,e,n){let r=m(t,"img","draw");if(!(t instanceof te)){const o=r;r=X(o,"int32"),o.dispose()}_h(r),eN(n?.imageOptions);const s={image:r},a={canvas:e,options:n};N.runKernel(ys,s,a)}const rN=w({fromPixels_:kh});var sN=Object.freeze({__proto__:null,draw:nN,fromPixels:rN,fromPixelsAsync:Q1,toPixels:tN});function xh(t,e){const n=t.shape.length,r=e.shape.length;if(n<1)throw new Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${n}.`);if(r<1)throw new Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${r}.`);if(e.dtype!=="int32")throw new Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${e.dtype}.`);if(e.shape[r-1]>n)throw new Error(`index innermost dimension length must be <= tensor rank; saw: ${e.shape[r-1]} vs. ${n}`);if(q(t.shape)===0)throw new Error(`Requested more than 0 entries, but input is empty. Input shape: ${t.shape}.`);const s=e.shape,a=s[s.length-1];let o=1;for(let c=0;c<s.length-1;++c)o*=s[c];const i=t.shape,u=s.slice();u.pop();let l=1;for(let c=a;c<n;++c)l*=i[c],u.push(i[c]);const p=[...en(t.shape).map(c=>c/l),1].slice(0,a);return[u,o,l,p]}var aN=Object.freeze({__proto__:null,prepareAndValidate:xh});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Yr=-2,oN=-1;function iN(t,e,n){const r=t.shape.length;g(r===e.length,()=>`Error in slice${r}D: Length of begin ${e} must match the rank of the array (${r}).`),g(r===n.length,()=>`Error in slice${r}D: Length of size ${n} must match the rank of the array (${r}).`);for(let s=0;s<r;++s)g(e[s]+n[s]<=t.shape[s],()=>`Error in slice${r}D: begin[${s}] + size[${s}] (${e[s]+n[s]}) would overflow input.shape[${s}] (${t.shape[s]})`)}function uN(t){const e=[];let n=0;for(;t>0;)t&1&&e.push(n),t/=2,n++;return e}function lN(t,e,n){const r=[];for(let s=0;s<t.length;s++)r[s]=Math.ceil((e[s]-t[s])/n[s]);return r}function Ih(t,e,n,r){const s=[...t];for(let a=s.length;a<r.length;a++)s.push(1);for(let a=0;a<n;a++)a===0?s[e]=1:(s.splice(e,0,1),s.pop());return s}function Ah(t,e,n){return n<=t?n:n-(e-1)}function Dh(t,e){const n=[];for(let r=0;r<t;r++)n.push(e+r);return n}function cN(t,e,n,r,s,a,o,i,u){const l=t.length;let p=new Array(l),c=new Array(l),f=new Array(l);if(e.length&&n>0){const d=e[0],y=n+1;p=Oh(o,d,y,r,t),c=Fh(i,d,y,s,t),f=Ih(a,d,y,t)}else for(let d=0;d<l;d++)p[d]=Ch(o,r,a,t,d,u),c[d]=Bh(i,s,a,t,d,u),f[d]=Rh(a,d,u);return{begin:p,end:c,strides:f}}function Oh(t,e,n,r,s){const a=[...s],o=Dh(n,e);for(let i=0;i<a.length;i++)if(o.indexOf(i)>-1)a[i]=0;else{const u=Ah(e,n,i);let l=r[u];t&1<<u&&(l=0),a[i]=l}return a}function Fh(t,e,n,r,s){const a=[...s],o=Dh(n,e);for(let i=0;i<a.length;i++)if(o.indexOf(i)>-1)a[i]=Number.MAX_SAFE_INTEGER;else{const u=Ah(e,n,i);let l=r[u];t&1<<u&&(l=Number.MAX_SAFE_INTEGER),a[i]=l}for(let i=0;i<a.length;i++){const u=s[i];a[i]<0&&(a[i]+=u),a[i]=pn(0,a[i],s[i])}return a}function Rh(t,e,n){let r=t[e];return(n&1<<e||r==null)&&(r=1),r}function Ch(t,e,n,r,s,a){let o=e[s];const i=n[s]||1;(t&1<<s||a&1<<s||o==null)&&(i>0?o=Number.MIN_SAFE_INTEGER:o=Number.MAX_SAFE_INTEGER);const u=r[s];return o<0&&(o+=u),o=pn(0,o,u-1),o}function Bh(t,e,n,r,s,a){let o=e[s];const i=n[s]||1;(t&1<<s||a&1<<s||o==null)&&(i>0?o=Number.MAX_SAFE_INTEGER:o=Number.MIN_SAFE_INTEGER);const u=r[s];return o<0&&(o+=u),i>0?o=pn(0,o,u):o=pn(-1,o,u-1),o}function pN(t,e,n){let r=n.length;for(let s=0;s<n.length;s++)if(n[s]>1){r=s;break}for(let s=r+1;s<n.length;s++)if(e[s]>0||n[s]!==t[s])return!1;return!0}function hN(t,e){let n=t.length>0?t[t.length-1]:1;for(let r=0;r<t.length-1;r++)n+=t[r]*e[r];return n}function fN(t,e,n){let r;const s=t.shape.length;typeof e=="number"?r=[e,...new Array(s-1).fill(0)]:e.length<s?r=e.concat(new Array(s-e.length).fill(0)):r=e.slice(),r.forEach(o=>{g(o!==-1,()=>"slice() does not support negative begin indexing.")});let a;return n==null?a=new Array(s).fill(-1):typeof n=="number"?a=[n,...new Array(s-1).fill(-1)]:n.length<s?a=n.concat(new Array(s-n.length).fill(-1)):a=n,a=a.map((o,i)=>o>=0?o:(g(o===-1,()=>`Negative size values should be exactly -1 but got ${o} for the slice() size at index ${i}.`),t.shape[i]-r[i])),[r,a]}function dN(t,e,n,r,s,a,o,i,u){let l;if(r==null?(l=new Array(e.length),l.fill(1)):l=r,o!=null&&o&o-1)throw new Error("Multiple ellipses in slice is not allowed.");let p=!1;const c={dims:l.length,numAddAxisAfterEllipsis:0,begin:e.slice(),end:n.slice(),strides:l.slice(),beginMask:s,endMask:a,ellipsisMask:o,newAxisMask:i,shrinkAxisMask:u};for(let E=0;E<c.dims;E++)p&&1<<E&i&&c.numAddAxisAfterEllipsis++,1<<E&o&&(p=!0);p||(c.ellipsisMask|=1<<c.dims,c.dims++);const f={dims:t.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};mN(c,f);let d=!0,y=!0,S=!0;const b=[],T=[];for(let E=0;E<t.length;++E){if(f.strides[E]===0)throw Error(`strides[${E}] must be non-zero`);const v=!!(f.shrinkAxisMask&1<<E),k=t[E];if(k===-1){b.push(v?1:-1);continue}const _=[f.beginMask&1<<E,f.endMask&1<<E],D=[f.strides[E]>0?0:-1,f.strides[E]>0?k:k-1];if(v&&f.strides[E]<=0)throw Error("only stride 1 allowed on non-range indexing.");S=S&&f.strides[E]===1;const O=!!(f.beginMask&1<<E&&f.endMask&1<<E);if(f.beginValid&&f.endValid){if(v){const W=f.begin[E]<0?k+f.begin[E]:f.begin[E];if(f.begin[E]=W,f.end[E]=f.begin[E]+1,W<0||W>=k)throw Error(`slice index ${f.begin[E]} of dimension ${E} out of bounds.`)}else f.begin[E]=Za(f.begin[E],0,f.strides[E],k,_,D),f.end[E]=Za(f.end[E],1,f.strides[E],k,_,D);const B=f.strides[E]===1&&f.begin[E]===0&&f.end[E]===k;d=d&&B,y=y&&(E===0&&f.strides[E]===1||B)}else d=d&&f.strides[E]===1&&O,y=y&&(E===0&&f.strides[E]===1||O);let F,L=!1;if(f.beginValid&&f.endValid?(F=f.end[E]-f.begin[E],L=!0):v?(F=1,L=!0):O&&k>=0&&(f.strides[E]<0?F=-k:F=k,L=!0),L){let B;F===0||F<0!=f.strides[E]<0?B=0:B=Math.trunc(F/f.strides[E])+(F%f.strides[E]!==0?1:0),b.push(B)}else b.push(-1)}for(let E=0;E<f.finalShapeGatherIndices.length;++E){const v=f.finalShapeGatherIndices[E];v>=0?T.push(b[v]):v===Yr&&T.push(1)}return{finalShapeSparse:T.filter((E,v)=>f.finalShapeGatherIndices[v]!==Yr),finalShape:T,isIdentity:d,sliceDim0:y,isSimpleSlice:S,begin:f.begin,end:f.end,strides:f.strides}}function mN(t,e){e.beginMask=0,e.endMask=0,e.shrinkAxisMask=0;let n=0;e.beginValid=t.begin!=null,e.endValid=t.end!=null,e.begin=new Array(e.dims),e.end=new Array(e.dims),e.strides=new Array(e.dims),e.finalShapeGatherIndices=[],e.finalShapeGatherIndicesSparse=[],e.inputShapeGatherIndicesSparse=new Array(e.dims);for(let r=0;r<t.dims;r++)if(1<<r&t.ellipsisMask){const s=Math.min(e.dims-(t.dims-r)+1+t.numAddAxisAfterEllipsis,e.dims);for(;n<s;n++)e.begin[n]=0,e.end[n]=0,e.strides[n]=1,e.beginMask|=1<<n,e.endMask|=1<<n,e.finalShapeGatherIndices.push(n),e.finalShapeGatherIndicesSparse.push(-1),e.inputShapeGatherIndicesSparse[n]=r}else if(1<<r&t.newAxisMask)e.finalShapeGatherIndices.push(Yr),e.finalShapeGatherIndicesSparse.push(-1);else{if(n===e.begin.length)throw Error(`Index out of range using input dim ${n}; input has only ${e.dims} dims, ${e.begin.length}.`);t.begin!=null&&(e.begin[n]=t.begin[r]),t.end!=null&&(e.end[n]=t.end[r]),e.strides[n]=t.strides[r],t.beginMask&1<<r&&(e.beginMask|=1<<n),t.endMask&1<<r&&(e.endMask|=1<<n),t.shrinkAxisMask&1<<r?(e.finalShapeGatherIndices.push(oN),e.finalShapeGatherIndicesSparse.push(-1),e.shrinkAxisMask|=1<<n):(e.finalShapeGatherIndices.push(n),e.finalShapeGatherIndicesSparse.push(r)),e.inputShapeGatherIndicesSparse[n]=r,n++}}function Za(t,e,n,r,s,a){if(s[e])return n>0?a[e]:a[e+1&1];{const o=t<0?r+t:t;return o<a[0]?a[0]:o>a[1]?a[1]:o}}var Lh=Object.freeze({__proto__:null,assertParamsValid:iN,computeFlatOffset:hN,computeOutShape:lN,getNormalizedAxes:cN,isSliceContinous:pN,maskToAxes:uN,parseSliceParams:fN,sliceInfo:dN,startForAxis:Ch,startIndicesWithElidedDims:Oh,stopForAxis:Bh,stopIndicesWithElidedDims:Fh,stridesForAxis:Rh,stridesWithElidedDims:Ih});/** @license See the LICENSE file. */const gN="4.22.0";/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Ph{static sgd(e){return new Er(e)}static momentum(e,n,r=!1){return new Ea(e,n,r)}static rmsprop(e,n=.9,r=0,s=null,a=!1){return new va(e,n,r,s,a)}static adam(e=.001,n=.9,r=.999,s=null){return new Sa(e,n,r,s)}static adadelta(e=.001,n=.95,r=null){return new wa(e,n,r)}static adamax(e=.002,n=.9,r=.999,s=null,a=0){return new Ta(e,n,r,s,a)}static adagrad(e,n=.1){return new Na(e,n)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const yN=Ph;/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const bN=typeof requestAnimationFrame<"u"?requestAnimationFrame:typeof setImmediate<"u"?setImmediate:t=>t();function wN(){return new Promise(t=>bN(()=>t()))}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function NN(t,e){const n=t[0].length;t.forEach((s,a)=>{g(s.length===n,()=>`Error in concat${n}D: rank of tensors[${a}] must be the same as the rank of the rest (${n})`)}),g(e>=0&&e<n,()=>`Error in concat${n}D: axis must be between 0 and ${n-1}.`);const r=t[0];t.forEach((s,a)=>{for(let o=0;o<n;o++)g(o===e||s[o]===r[o],()=>`Error in concat${n}D: Shape of tensors[${a}] (${s}) does not match the shape of the rest (${r}) along the non-concatenated axis ${a}.`)})}function SN(t,e){const n=t[0].slice();for(let r=1;r<t.length;r++)n[e]+=t[r][e];return n}/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var Pe;(function(t){t[t.FIRST_DIM_SIZE=0]="FIRST_DIM_SIZE",t[t.VALUE_ROWIDS=1]="VALUE_ROWIDS",t[t.ROW_LENGTHS=2]="ROW_LENGTHS",t[t.ROW_SPLITS=3]="ROW_SPLITS",t[t.ROW_LIMITS=4]="ROW_LIMITS",t[t.ROW_STARTS=5]="ROW_STARTS"})(Pe||(Pe={}));function TN(t,e,n){let r=new Array;if(n==null&&e==null)return r;if(e==null)for(;r.length<t+n.length;)r.push(-1);else r=e.slice();if(n==null)return r;if(t+n.length!==r.length)throw new Error(`rt input.shape and shape=${e} are incompatible: rt input.rank = ${t+n.length}, but shape.rank = ${r.length}`);for(let s=1;s<n.length;++s){const a=n[s],o=r[r.length-n.length+s],i=r[o];if(a>=0)if(i>=0){if(i!==a)throw new Error(`rt input.shape and shape=${e} are incompatible: rt input.shape[${s+t}] = ${a} but shape[${s+t}] = ${i}`)}else r[o]=a}return r}function EN(t){const e={FIRST_DIM_SIZE:Pe.FIRST_DIM_SIZE,VALUE_ROWIDS:Pe.VALUE_ROWIDS,ROW_LENGTHS:Pe.ROW_LENGTHS,ROW_SPLITS:Pe.ROW_SPLITS,ROW_LIMITS:Pe.ROW_LIMITS,ROW_STARTS:Pe.ROW_STARTS},n=[];for(const r of t)if(r in e)n.push(e[r]);else break;return n}function vN(t){return t.length===0?0:t[0]===Pe.FIRST_DIM_SIZE?t.length-1:t.length}function $N(t,e){if(t==null||e==null)return;const n=t.length,r=e.length;if(n>=r)throw new Error(`defaultValue.shape=${t} and ragged tensor flatValues.shape=${e}, are incompatible: defaultValue.rank = ${n} must be less than ragged tensor input flatValues.rank = ${r})`);for(let s=0;s<Math.min(n,r-1);++s){const a=t[s],o=e[s+1];if(a>=0&&o>=0&&a!==1&&a!==o)throw new Error(`defaultValue.shape=${t}, and ragged tensor input flatValues.shape=${e} are incompatible: defaultValue.shape[${s-t.length}] = ${a} but ragged tensor input.flatValues.shape[${s-t.length}] = ${o}`)}}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const xa=30;function kN(t){return t<=xa?t:Hn(t,Math.floor(Math.sqrt(t)))}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _N(t,e,n){const r=n*(typeof t=="number"?t:t[0]),s=e*(typeof t=="number"?t:t[1]);return[r,s]}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function xN(t,e,n,r=!0){let s=[];if(r)s=s.concat(e.slice(0)),s.push(t[0]/n),s=s.concat(t.slice(1));else{s=s.concat(t[0]);const a=e.length;for(let o=0;o<a;++o)s=s.concat([t[o+1]/e[o],e[o]]);s=s.concat(t.slice(a+1))}return s}function IN(t,e,n=!0){const r=[];if(n){r.push(e);for(let s=e+1;s<t;++s)s<=2*e?(r.push(s),r.push(s-(e+1))):r.push(s)}else{const s=[],a=[];for(let o=1;o<t;++o)o>=e*2+1||o%2===1?a.push(o):s.push(o);r.push(...s),r.push(0),r.push(...a)}return r}function AN(t,e,n,r=!0){const s=[];r?s.push(t[0]/n):s.push(t[0]*n);for(let a=1;a<t.length;++a)a<=e.length?r?s.push(e[a-1]*t[a]):s.push(t[a]/e[a-1]):s.push(t[a]);return s}function DN(t,e){const n=[0];for(let r=0;r<e;++r)n.push(t[r][0]);return n}function ON(t,e,n){const r=t.slice(0,1);for(let s=0;s<n;++s)r.push(t[s+1]-e[s][0]-e[s][1]);return r}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const FN=1.7580993408473768,RN=1.0507009873554805;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const CN=.3275911,BN=.254829592,LN=-.284496736,PN=1.421413741,zN=-1.453152027,VN=1.061405429;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function MN(t,e){if(t.length!==e.length)throw new Error(`Cannot merge real and imag arrays of different lengths. real:${t.length}, imag: ${e.length}.`);const n=new Float32Array(t.length*2);for(let r=0;r<n.length;r+=2)n[r]=t[r/2],n[r+1]=e[r/2];return n}function WN(t){const e=new Float32Array(t.length/2),n=new Float32Array(t.length/2);for(let r=0;r<t.length;r+=2)e[r/2]=t[r],n[r/2]=t[r+1];return{real:e,imag:n}}function qN(t){const e=Math.ceil(t.length/4),n=new Float32Array(e),r=new Float32Array(e);for(let s=0;s<t.length;s+=4)n[Math.floor(s/4)]=t[s],r[Math.floor(s/4)]=t[s+1];return{real:n,imag:r}}function UN(t){const e=Math.floor(t.length/4),n=new Float32Array(e),r=new Float32Array(e);for(let s=2;s<t.length;s+=4)n[Math.floor(s/4)]=t[s],r[Math.floor(s/4)]=t[s+1];return{real:n,imag:r}}function GN(t,e){const n=t[e*2],r=t[e*2+1];return{real:n,imag:r}}function jN(t,e,n,r){t[r*2]=e,t[r*2+1]=n}function HN(t,e){const n=new Float32Array(t/2),r=new Float32Array(t/2);for(let s=0;s<Math.ceil(t/2);s++){const a=(e?2:-2)*Math.PI*(s/t);n[s]=Math.cos(a),r[s]=Math.sin(a)}return{real:n,imag:r}}function KN(t,e,n){const r=(n?2:-2)*Math.PI*(t/e),s=Math.cos(r),a=Math.sin(r);return{real:s,imag:a}}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ir="->",XN=/->/g,Ja=",",Ya="...";function ZN(t,e){t=t.replace(/\s/g,"");const n=(t.length-t.replace(XN,"").length)/Ir.length;if(n<1)throw new Error("Equations without an arrow are not supported.");if(n>1)throw new Error(`Equation must contain exactly one arrow ("${Ir}").`);const[r,s]=t.split(Ir);g(r.indexOf(Ya)===-1,()=>`The ellipsis notation ("${Ya}") is not supported yet.`);const a=r.split(Ja),o=a.length;if(e!==o)throw new Error(`Expected ${o} input tensors, received ${e}`);if(o>2)throw new Error("Support for more than 2 input tensors is not implemented yet.");const i=[];for(let f=0;f<s.length;++f){const d=s[f];if(!a.some(y=>y.indexOf(d)!==-1))throw new Error(`Output subscripts contain the label ${d} not present in the input subscripts.`);i.indexOf(d)===-1&&i.push(d)}for(let f=0;f<r.length;++f){const d=r[f];i.indexOf(d)===-1&&d!==Ja&&i.push(d)}const u=new Array(a.length);for(let f=0;f<o;++f){if(new Set(a[f].split("")).size!==a[f].length)throw new Error(`Found duplicate axes in input component ${a[f]}. Support for duplicate axes in input is not implemented yet.`);u[f]=[];for(let d=0;d<a[f].length;++d)u[f].push(i.indexOf(a[f][d]))}const l=i.length,p=s.length,c=[];for(let f=p;f<l;++f)c.push(f);return{allDims:i,summedDims:c,idDims:u}}function JN(t,e){let n=new Array(t);n.fill(-1);for(let s=0;s<e.length;++s)n[e[s]]=s;const r=[];for(let s=0;s<t;++s)n[s]===-1&&r.push(s);return n=n.filter(s=>s!==-1),{permutationIndices:n,expandDims:r}}function YN(t,e,n){const r=new Array(t);for(let s=0;s<n.length;++s){const a=n[s].shape;for(let o=0;o<e[s].length;++o)r[e[s][o]]===void 0?r[e[s][o]]=a[o]:g(r[e[s][o]]===a[o],()=>`Expected dimension ${r[e[s][o]]} at axis ${o} of input shaped ${JSON.stringify(a)}, but got dimension ${a[o]}`)}}function QN(t,e){const n=t,r=[];let s=0;t.length===0&&n.push(-1),s=t.length+1;for(let o=0;o<s;++o)r.push([]);const a=[];for(let o=0;o<n.length;++o){const i=n[o],u=tS(e,i);for(const l of u)a.indexOf(l)===-1&&(r[o].push(l),a.push(l))}return{path:n,steps:r}}function eS(t){return t.every((e,n)=>e===n)}function tS(t,e){const n=[];for(let r=0;r<t.length;++r)(t[r].length===0||t[r].indexOf(e)!==-1||e===-1)&&n.push(r);return n}function nS(t,e,n=0){let r=[];if(typeof e=="number")g(t.shape[n]%e===0,()=>"Number of splits must evenly divide the axis."),r=new Array(e).fill(t.shape[n]/e);else{const s=e.reduce((o,i)=>(i===-1&&(o+=1),o),0);g(s<=1,()=>"There should be only one negative value in split array.");const a=e.indexOf(-1);if(a!==-1){const o=e.reduce((i,u)=>u>0?i+u:i);e[a]=t.shape[n]-o}g(t.shape[n]===e.reduce((o,i)=>o+i),()=>"The sum of sizes must match the size of the axis dimension."),r=e}return r}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rS(t){return`Received SparseTensor with denseShape[0] = 0 but
  indices.shape[0] = ${t}`}function sS(t,e){return`indices(${t}, 0) is invalid: ${e} < 0`}function aS(t,e,n){return`indices(${t}, 0) is invalid: ${e} >= ${n}`}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function oS(t,e){return`only one output dimension may be -1, not both ${t} and ${e}`}function iS(t,e){return`size ${t} must be non-negative, not ${e}`}function uS(){return"reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero"}function lS(t,e){const n=q(t),r=q(e);return`Input to reshape is a SparseTensor with ${n}
  dense values, but the requested shape requires a multiple of ${r}. inputShape=${t} outputShape= ${e}`}function cS(t,e){const n=q(t),r=q(e);return`Input to reshape is a tensor with ${n} dense values, but the requested shape has ${r}. inputShape=${t} outputShape=${e}`}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function pS(){return"segment ids must be >= 0"}function hS(){return"segment ids are not increasing"}function fS(t,e){return`Segment id ${t} out of range [0, ${e}), possibly because segmentIds input is not sorted.`}function dS(t,e,n){return`Bad: indices[${t}] == ${e} out of range [0, ${n})`}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function mS(t,e){let n=!1,r;for(t<=xa?(r=t,n=!0):r=Hn(t,Math.floor(Math.sqrt(t)));!n;)r>e||r===t?n=!0:r=Hn(t,r+1);return r}function gS(t,e,n){const r=[],s=t.length;for(let a=0;a<s;a++)a!==e?r.push(t[a]):r.push(n);return r}function yS(t,e,n,r){const s=e.shape.length,a=t.shape.length;if(r!==0&&(r<-s||r>s))throw new Error(`Expect batchDims in the range of [-${s}, ${s}], but got ${r}`);if(r<0&&(r+=s),r>a)throw new Error(`batchDims (${r}) must be less than rank(x) (
    ${a}).`);if(n<r)throw new Error(`batchDims (${r}) must be less than or equal to axis (${n}).`);for(let c=0;c<r;++c)if(t.shape[c]!==e.shape[c])throw new Error(`x.shape[${c}]: ${t.shape[c]} should be equal to indices.shape[${c}]: ${e.shape[c]}.`);const o=t.shape[n],i=[];let u=1,l=1,p=1;for(let c=0;c<r;++c)i.push(t.shape[c]),u*=t.shape[c];for(let c=r;c<n;c++)i.push(t.shape[c]),l*=t.shape[c];for(let c=r;c<s;c++)i.push(e.shape[c]);for(let c=n+1;c<a;c++)i.push(t.shape[c]),p*=t.shape[c];return{batchSize:u,sliceSize:p,outerSize:l,dimSize:o,outputShape:i}}var bS=Object.freeze({__proto__:null,collectGatherOpShapeInfo:yS,computeOutShape:gS,segOpComputeOptimalWindowSize:mS});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function wS(t){try{return t.map(e=>Zn(e))}catch(e){throw new Error(`Failed to decode encoded string bytes into utf-8, error: ${e}`)}}function NS(t){return t.map(e=>xn(e))}var SS=Object.freeze({__proto__:null,ERF_A1:BN,ERF_A2:LN,ERF_A3:PN,ERF_A4:zN,ERF_A5:VN,ERF_P:CN,PARALLELIZE_THRESHOLD:xa,get RowPartitionType(){return Pe},SELU_SCALE:RN,SELU_SCALEALPHA:FN,applyActivation:Sr,assertAndGetBroadcastShape:ne,assertAxesAreInnerMostDims:Pg,assertParamsConsistent:NN,assignToTypedArray:jN,axesAreInnerMostDims:Bs,calculateShapes:Gp,checkEinsumDimSizes:YN,checkPadOnDimRoundingMode:Ae,combineLocations:Lc,combineRaggedTensorToTensorShapes:TN,complexWithEvenIndex:qN,complexWithOddIndex:UN,computeConv2DInfo:An,computeConv3DInfo:sc,computeDefaultPad:Is,computeDilation2DInfo:Fm,computeOptimalWindowSize:kN,computeOutAndReduceShapes:Lg,computeOutShape:SN,computePool2DInfo:rc,computePool3DInfo:Rm,convertConv2DDataFormat:ac,decodeEinsumEquation:ZN,eitherStridesOrDilationsAreOne:Ye,expandShapeToKeepDim:Fn,exponent:KN,exponents:HN,fromStringArrayToUint8:NS,fromUint8ToStringArray:wS,getAxesPermutation:zg,getBroadcastDims:Oc,getComplexWithIndex:GN,getEinsumComputePath:QN,getEinsumPermutation:JN,getFusedBiasGradient:Nr,getFusedDyActivation:wr,getImageCenter:_N,getInnerMostAxes:Mg,getPermuted:IN,getRaggedRank:vN,getReductionAxes:Fs,getReshaped:xN,getReshapedPermuted:AN,getRowPartitionTypesHelper:EN,getSliceBeginCoords:DN,getSliceSize:ON,getSparseFillEmptyRowsIndicesDenseShapeMismatch:rS,getSparseFillEmptyRowsNegativeIndexErrorMessage:sS,getSparseFillEmptyRowsOutOfRangeIndexErrorMessage:aS,getSparseReshapeEmptyTensorZeroOutputDimErrorMessage:uS,getSparseReshapeInputOutputMismatchErrorMessage:cS,getSparseReshapeInputOutputMultipleErrorMessage:lS,getSparseReshapeMultipleNegativeOneOutputDimErrorMessage:oS,getSparseReshapeNegativeOutputDimErrorMessage:iS,getSparseSegmentReductionIndicesOutOfRangeErrorMessage:dS,getSparseSegmentReductionNegativeSegmentIdsErrorMessage:pS,getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage:hS,getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage:fS,getUndoAxesPermutation:Vg,isIdentityPermutation:eS,log:Rf,mergeRealAndImagArrays:MN,prepareAndValidate:xh,prepareSplitSize:nS,segment_util:bS,shouldFuse:Tr,slice_util:Lh,splitRealAndImagArrays:WN,stridesOrDilationsArePositive:It,tupleValuesAreOne:wn,upcastType:ur,validateDefaultValueShape:$N,validateInput:yr,validateUpdateShape:ma,warn:et});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var TS=Object.freeze({__proto__:null,nonMaxSuppressionV3Impl:ch,nonMaxSuppressionV4Impl:ph,nonMaxSuppressionV5Impl:hh,whereImpl:Qp});/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */x1();var ES=Object.freeze({__proto__:null,Abs:vo,Acos:$o,Acosh:ko,AdadeltaOptimizer:wa,AdagradOptimizer:Na,AdamOptimizer:Sa,AdamaxOptimizer:Ta,Add:ms,AddN:_o,All:xo,Any:Io,ArgMax:Ao,ArgMin:Do,Asin:Oo,Asinh:Fo,Atan:Ro,Atan2:Bo,Atanh:Co,AvgPool:Lo,AvgPool3D:Po,AvgPool3DGrad:gf,AvgPoolGrad:mf,BatchMatMul:zo,BatchToSpaceND:Vo,Bincount:Mo,BitwiseAnd:Wo,BroadcastArgs:qo,BroadcastTo:yf,Cast:gs,Ceil:Uo,ClipByValue:Go,Complex:jo,ComplexAbs:Ho,Concat:Ko,Conv2D:Xo,Conv2DBackpropFilter:Zo,Conv2DBackpropInput:Jo,Conv3D:Yo,Conv3DBackpropFilterV2:bf,Conv3DBackpropInputV2:Qo,Cos:ei,Cosh:ti,CropAndResize:si,Cumprod:ni,Cumsum:ri,DataStorage:jh,DenseBincount:ai,DepthToSpace:oi,DepthwiseConv2dNative:ii,DepthwiseConv2dNativeBackpropFilter:ui,DepthwiseConv2dNativeBackpropInput:li,Diag:ci,Dilation2D:pi,Dilation2DBackpropFilter:Nf,Dilation2DBackpropInput:wf,Draw:ys,get ENV(){return fs},Einsum:fi,Elu:di,EluGrad:Sf,Environment:To,Equal:gi,Erf:mi,Exp:yi,ExpandDims:bi,Expm1:wi,FFT:Ni,Fill:Si,FlipLeftRight:Ti,Floor:Ei,FloorDiv:vi,FromPixels:Or,FusedBatchNorm:$i,FusedConv2D:Rr,FusedDepthwiseConv2D:Cr,GatherNd:_i,GatherV2:ki,Greater:xi,GreaterEqual:Ii,IFFT:Ai,Identity:bs,Imag:Di,IsFinite:Oi,IsInf:Fi,IsNan:Ri,KernelBackend:co,LRN:Ui,LRNGrad:$f,LeakyRelu:Ci,Less:Bi,LessEqual:Li,LinSpace:Pi,Log:zi,Log1p:Vi,LogSoftmax:Ef,LogicalAnd:Mi,LogicalNot:Wi,LogicalOr:qi,LogicalXor:Tf,LowerBound:vf,MatrixBandPart:kf,Max:Gi,MaxPool:Hi,MaxPool3D:Ki,MaxPool3DGrad:xf,MaxPoolGrad:_f,MaxPoolWithArgmax:Xi,Maximum:ji,Mean:Zi,Min:Ji,Minimum:Yi,MirrorPad:Qi,Mod:eu,MomentumOptimizer:Ea,Multinomial:tu,Multiply:nu,Neg:ru,NonMaxSuppressionV3:au,NonMaxSuppressionV4:ou,NonMaxSuppressionV5:iu,NotEqual:su,OP_SCOPE_SUFFIX:Es,OneHot:lu,OnesLike:uu,Optimizer:mt,OptimizerConstructors:Ph,Pack:cu,PadV2:pu,Pool:If,Pow:hu,Prelu:fu,Prod:du,RMSPropOptimizer:va,RaggedGather:mu,RaggedRange:gu,RaggedTensorToTensor:yu,Range:bu,get Rank(){return zr},Real:wu,RealDiv:hi,Reciprocal:Nu,get Reduction(){return pe},Relu:Su,Relu6:$u,Reshape:Tu,ResizeBilinear:vu,ResizeBilinearGrad:Df,ResizeNearestNeighbor:Eu,ResizeNearestNeighborGrad:Af,Reverse:ku,RotateWithOffset:hl,Round:_u,Rsqrt:xu,SGDOptimizer:Er,ScatterNd:Iu,SearchSorted:Du,Select:Ou,Selu:Fu,Sigmoid:Pu,Sign:Lu,Sin:Cu,Sinh:Bu,Slice:Ru,Softmax:Uu,Softplus:zu,SpaceToBatchND:Wu,SparseFillEmptyRows:Gu,SparseReshape:ju,SparseSegmentMean:Hu,SparseSegmentSum:Ku,SparseToDense:Xu,SplitV:qu,Sqrt:Vu,Square:Of,SquaredDifference:Zu,StaticRegexReplace:Ju,Step:pl,StridedSlice:Yu,StringNGrams:Qu,StringSplit:el,StringToHashBucketFast:tl,Sub:nl,Sum:Mu,Tan:rl,Tanh:sl,Tensor:te,TensorBuffer:Jn,TensorScatterUpdate:Au,Tile:ws,TopK:al,Transform:ol,Transpose:Mn,Unique:il,Unpack:ul,UnsortedSegmentSum:ll,UpperBound:Ff,Variable:mn,ZerosLike:cl,_FusedMatMul:Fr,abs:be,acos:Gl,acosh:jl,add:R,addN:Hl,all:Kl,any:Xl,argMax:Zl,argMin:Jl,asin:Yl,asinh:Ql,atan:ec,atan2:tc,atanh:nc,avgPool:As,avgPool3d:oc,backend:Fl,backend_util:SS,basicLSTMCell:ic,batchNorm:Dn,batchNorm2d:uc,batchNorm3d:lc,batchNorm4d:cc,batchToSpaceND:Ds,bincount:Os,bitwiseAnd:pc,booleanMaskAsync:eh,broadcastArgs:hc,broadcastTo:cn,broadcast_util:_g,browser:sN,buffer:Ve,cast:X,ceil:fc,clipByValue:dc,clone:Xe,complex:Je,concat:ue,concat1d:mc,concat2d:gc,concat3d:yc,concat4d:bc,conv1d:wc,conv2d:On,conv2dTranspose:Sc,conv3d:Tc,conv3dTranspose:Ec,copyRegisteredKernels:Pf,cos:vc,cosh:$c,cosineWindow:br,cumprod:kc,cumsum:_c,customGrad:We,denseBincount:xc,deprecationWarn:Sd,depthToSpace:Ic,depthwiseConv2d:lr,device_util:md,diag:Ac,dilation2d:Dc,disableDeprecationWarnings:Nd,dispose:he,disposeVariables:Td,div:K,divNoNan:Fc,dot:Rc,dropout:ah,einsum:wt,elu:Cs,enableDebugMode:wd,enableProdMode:bd,enclosingPowerOfTwo:ya,engine:Ed,ensureShape:Cc,env:C,equal:Rs,erf:Bc,euclideanNorm:zc,exp:ct,expandDims:Ge,expm1:Vc,eye:Ls,fft:dr,fill:tn,findBackend:Ad,findBackendFactory:Dd,floor:Ps,floorDiv:xs,fused:ih,gather:zs,gatherND:sh,gather_util:aN,getBackend:Ol,getGradient:Br,getKernel:fn,getKernelsForBackend:Kn,grad:my,grads:gy,greater:Cn,greaterEqual:Vs,ifft:En,imag:Bn,image:mh,inTopKAsync:oh,io:_a,irfft:pa,isFinite:Mc,isInf:Wc,isNaN:qc,keep:Oe,kernel_impls:TS,leakyRelu:Ms,less:tr,lessEqual:cr,linalg:gh,linspace:Uc,localResponseNormalization:Gc,log:Zt,log1p:Ws,logSigmoid:Hc,logSoftmax:Kc,logSumExp:Us,logicalAnd:Nn,logicalNot:Gs,logicalOr:js,logicalXor:Xc,losses:yh,lowerBound:Zc,matMul:V,math:K1,max:$t,maxPool:Hs,maxPool3d:Jc,maxPoolWithArgmax:Yc,maximum:Ks,mean:Sn,memory:vd,meshgrid:Qc,min:er,minimum:Tn,mirrorPad:ep,mod:tp,moments:np,movingAverage:th,mul:I,multiRNNCell:rp,multinomial:sp,neg:Re,nextFrame:wN,norm:Rn,notEqual:Xs,oneHot:nr,ones:st,onesLike:ap,op:w,outerProduct:op,pad:nn,pad1d:ip,pad2d:up,pad3d:lp,pad4d:cp,pool:pp,pow:Xt,prelu:Js,print:_s,prod:hp,profile:$d,raggedGather:fp,raggedRange:dp,raggedTensorToTensor:mp,rand:gp,randomGamma:Np,randomNormal:ua,randomStandardNormal:Sp,randomUniform:fr,randomUniformInt:Tp,range:Jt,ready:xd,real:Yt,reciprocal:Ep,registerBackend:Od,registerGradient:Cf,registerKernel:fl,relu:Ln,relu6:la,removeBackend:Id,reshape:$,reverse:pt,reverse1d:vp,reverse2d:$p,reverse3d:kp,reverse4d:_p,rfft:mr,round:ca,rsqrt:xp,scalar:z,scatterND:nh,scatter_util:b0,searchSorted:hr,selu:Ip,separableConv2d:Ap,serialization:k1,setBackend:_d,setPlatform:Fd,setdiff1dAsync:Dp,sigmoid:vt,sign:Op,signal:dh,sin:Fp,sinh:Rp,slice:G,slice1d:Cp,slice2d:Bp,slice3d:Lp,slice4d:Pp,slice_util:Lh,softmax:zp,softplus:qs,spaceToBatchND:Zs,sparse:bh,sparseToDense:rh,spectral:fh,split:Qt,sqrt:Me,square:Ie,squaredDifference:ha,squeeze:gr,stack:qe,step:fa,stridedSlice:Vp,string:wh,sub:P,sum:H,sumOutType:od,tan:Mp,tanh:Qn,tensor:Fe,tensor1d:Ee,tensor2d:Ut,tensor3d:da,tensor4d:Wp,tensor5d:qp,tensor6d:Up,tensorScatterUpdate:jp,tensor_util:ld,test_util:Db,tidy:M,tile:qt,time:kd,topk:Hp,train:yN,transpose:vn,truncatedNormal:Kp,unique:Xp,unregisterGradient:Lf,unregisterKernel:Bf,unsortedSegmentSum:Zp,unstack:dt,upcastType:ur,upperBound:Jp,util:Xf,valueAndGrad:yy,valueAndGrads:by,variable:Yp,variableGrads:jc,version_core:gN,where:Ze,whereAsync:ga,zeros:At,zerosLike:Ne});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vS=C();vS.registerFlag("KEEP_INTERMEDIATE_TENSORS",()=>!1,t=>{t&&console.warn("Keep intermediate tensors is ON. This will print the values of all intermediate tensors during model inference. Not all models support this mode. For details, check e2e/benchmarks/ model_config.js. This significantly impacts performance.")});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */var ge;(function(t){t[t.DT_INVALID=0]="DT_INVALID",t[t.DT_FLOAT=1]="DT_FLOAT",t[t.DT_DOUBLE=2]="DT_DOUBLE",t[t.DT_INT32=3]="DT_INT32",t[t.DT_UINT8=4]="DT_UINT8",t[t.DT_INT16=5]="DT_INT16",t[t.DT_INT8=6]="DT_INT8",t[t.DT_STRING=7]="DT_STRING",t[t.DT_COMPLEX64=8]="DT_COMPLEX64",t[t.DT_INT64=9]="DT_INT64",t[t.DT_BOOL=10]="DT_BOOL",t[t.DT_QINT8=11]="DT_QINT8",t[t.DT_QUINT8=12]="DT_QUINT8",t[t.DT_QINT32=13]="DT_QINT32",t[t.DT_BFLOAT16=14]="DT_BFLOAT16",t[t.DT_QINT16=15]="DT_QINT16",t[t.DT_QUINT16=16]="DT_QUINT16",t[t.DT_UINT16=17]="DT_UINT16",t[t.DT_COMPLEX128=18]="DT_COMPLEX128",t[t.DT_HALF=19]="DT_HALF",t[t.DT_RESOURCE=20]="DT_RESOURCE",t[t.DT_VARIANT=21]="DT_VARIANT",t[t.DT_UINT32=22]="DT_UINT32",t[t.DT_UINT64=23]="DT_UINT64",t[t.DT_FLOAT_REF=101]="DT_FLOAT_REF",t[t.DT_DOUBLE_REF=102]="DT_DOUBLE_REF",t[t.DT_INT32_REF=103]="DT_INT32_REF",t[t.DT_UINT8_REF=104]="DT_UINT8_REF",t[t.DT_INT16_REF=105]="DT_INT16_REF",t[t.DT_INT8_REF=106]="DT_INT8_REF",t[t.DT_STRING_REF=107]="DT_STRING_REF",t[t.DT_COMPLEX64_REF=108]="DT_COMPLEX64_REF",t[t.DT_INT64_REF=109]="DT_INT64_REF",t[t.DT_BOOL_REF=110]="DT_BOOL_REF",t[t.DT_QINT8_REF=111]="DT_QINT8_REF",t[t.DT_QUINT8_REF=112]="DT_QUINT8_REF",t[t.DT_QINT32_REF=113]="DT_QINT32_REF",t[t.DT_BFLOAT16_REF=114]="DT_BFLOAT16_REF",t[t.DT_QINT16_REF=115]="DT_QINT16_REF",t[t.DT_QUINT16_REF=116]="DT_QUINT16_REF",t[t.DT_UINT16_REF=117]="DT_UINT16_REF",t[t.DT_COMPLEX128_REF=118]="DT_COMPLEX128_REF",t[t.DT_HALF_REF=119]="DT_HALF_REF",t[t.DT_RESOURCE_REF=120]="DT_RESOURCE_REF",t[t.DT_VARIANT_REF=121]="DT_VARIANT_REF",t[t.DT_UINT32_REF=122]="DT_UINT32_REF",t[t.DT_UINT64_REF=123]="DT_UINT64_REF"})(ge||(ge={}));var Qa;(function(t){(function(e){e[e.LEGACY=0]="LEGACY",e[e.V1=1]="V1",e[e.V2=2]="V2"})(t.CheckpointFormatVersion||(t.CheckpointFormatVersion={}))})(Qa||(Qa={}));/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ia={};function $S(t,e){const n={tfOpName:t,category:"custom",inputs:[],attrs:[],customExecutor:e};Ia[t]=n}function zh(t){return Ia[t]}function kS(t){delete Ia[t]}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function h(t,e,n,r,s){const a=e.inputParams[t];if(a&&a.inputIndexStart!==void 0){const i=a.inputIndexStart,u=a.inputIndexEnd===0?void 0:a.inputIndexEnd===void 0?i+1:a.inputIndexEnd,l=i<0?e.inputNames.length+i:i;if(a.type==="tensor")return oe(e.inputNames[l],n,r,s);if(a.type==="tensors"){const f=e.inputs.slice(i,u);return e.inputNames.slice(i,u).filter((y,S)=>{var b;return((b=f[S])===null||b===void 0?void 0:b.op)!=="NoOp"}).map(y=>oe(y,n,r,s))}const p=oe(e.inputNames[l],n,r,s),c=p.dataSync();return a.type==="number"?c[0]:Et(p.shape,c)}const o=e.attrParams[t];return o&&o.value}function oe(t,e,n,r){const[s,a]=ye(t,n);if(r!=null){const i=r.getHashTableHandleByName(s);if(i!=null)return i}const o=n.currentContextIds.find(i=>!!e[sr(s,i)]);return o!==void 0?e[sr(s,o)][a]:void 0}function eo(t,e,n){return e[sr(t,n.currentContextId)]}function je(t,e){const[n,r,s]=ye(t,e);return[sr(n,e&&e.currentContextId),r,s]}function sr(t,e){return e?`${t}-${e}`:t}function ye(t,e){if(t==="")return["",0,void 0];const n=e!=null&&e.parseNodeNameCache!=null;if(n){const a=e.parseNodeNameCache.get(t);if(a!=null)return a}const r=t.split(":");let s;if(r.length===1)s=[t,0,void 0];else{const a=r[0],o=r.length===3?r[1]:void 0,i=Number(r[r.length-1]);s=[a,i,o]}return n&&e.parseNodeNameCache.set(t,s),s}function Un(t,e,n){let r=h("pad",t,e,n);if(r==="explicit"){r=h("explicitPaddings",t,e,n);const s=[[0,0],[0,0],[0,0],[0,0]];for(let a=0;a<4;a++)s[a][0]=r[a*2],s[a][1]=r[a*2+1];return s}return r}function He(t){return t.kept?t:Xe(t)}/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _S=[{tfOpName:"Add",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddV2",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddN",category:"arithmetic",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"BiasAdd",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"Sub",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"RealDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Div",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"DivNoNan",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mul",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Maximum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Minimum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Pow",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SquaredDifference",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorMod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}];var xS=Object.freeze({__proto__:null,json:_S});/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const IS=[{tfOpName:"Abs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan2",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Ceil",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ClipByValue",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"clipValueMin",type:"number"},{start:2,name:"clipValueMax",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Complex",category:"basic_math",inputs:[{start:0,name:"real",type:"tensor"},{start:1,name:"imag",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ComplexAbs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Elu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Exp",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Floor",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Imag",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Neg",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Real",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Prelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"alpha",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu6",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Selu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sigmoid",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Rsqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Square",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sign",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Round",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Expm1",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log1p",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Reciprocal",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Softplus",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Erf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LeakyRelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"alpha",name:"alpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsNan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsFinite",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsInf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}];var AS=Object.freeze({__proto__:null,json:IS});/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const DS=[{tfOpName:"EmptyTensorList",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"maxNumElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"LoopCond",category:"control",inputs:[{start:0,name:"pred",type:"tensor"}]},{tfOpName:"Switch",category:"control",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"pred",type:"tensor"}]},{tfOpName:"Merge",category:"control",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"Enter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"frame_name",name:"frameName",type:"string"},{tfName:"is_constant",name:"isConstant",type:"bool"}]},{tfOpName:"Exit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NextIteration",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayV3",category:"control",inputs:[{start:0,name:"size",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"dynamic_size",name:"dynamicSize",type:"bool"},{tfName:"clear_after_read",name:"clearAfterRead",type:"bool"},{tfName:"identical_element_shapes",name:"identicalElementShapes",type:"bool"},{tfName:"tensor_array_name",name:"name",type:"string"}]},{tfOpName:"TensorArrayWriteV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayReadV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayGatherV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"}]},{tfOpName:"TensorArrayScatterV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArrayConcatV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape_except0",name:"elementShapeExcept0",type:"shape",notSupported:!0}]},{tfOpName:"TensorArraySplitV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"tensor",type:"tensor"},{start:2,name:"lengths",type:"number[]"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArraySizeV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}]},{tfOpName:"TensorArrayCloseV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"}]},{tfOpName:"StatelessIf",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"If",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"StatelessWhile",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"While",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"TensorListScatter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListScatterV2",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"},{start:3,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGather",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListSetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListReserve",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListFromTensor",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListStack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"},{tfName:"num_elements",name:"numElements",type:"dtype"}]},{tfOpName:"TensorListSplit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"},{start:2,name:"lengths",type:"number[]"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcat",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcatV2",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPopBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPushBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListLength",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}]},{tfOpName:"TensorListResize",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"size",type:"number"}]}];var OS=Object.freeze({__proto__:null,json:DS});/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const FS=[{tfOpName:"AvgPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[],notSupported:!0},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPoolWithArgmax",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"include_batch_in_index",name:"includeBatchInIndex",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AvgPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Conv1D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"stride",name:"stride",type:"number"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NWC"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"dilation",name:"dilation",type:"number",defaultValue:1}]},{tfOpName:"Conv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"useCudnnOnGpu",name:"useCudnnOnGpu",type:"bool"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"_FusedConv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"use_cudnn_on_gpu",name:"useCudnnOnGpu",type:"bool",defaultValue:!0},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2}]},{tfOpName:"Conv2DBackpropInput",category:"convolution",inputs:[{start:2,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:0,name:"outputShape",type:"number[]"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]",notSupported:!0}]},{tfOpName:"DepthwiseConv2d",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"DepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"FusedDepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]}]},{tfOpName:"Conv3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"Dilation2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"rates",name:"dilations",type:"number[]"},{tfName:"padding",name:"pad",type:"string"}]}];var RS=Object.freeze({__proto__:null,json:FS});/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const CS=[{tfOpName:"Fill",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"},{start:1,name:"value",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"LinSpace",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"num",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"OneHot",category:"creation",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"depth",type:"number"},{start:2,name:"onValue",type:"number",defaultValue:1},{start:3,name:"offValue",type:"number",defaultValue:0}],attrs:[{tfName:"axis",name:"axis",type:"number",notSupported:!0},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Ones",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"OnesLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"RandomStandardNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniform",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number",defaultValue:0},{tfName:"maxval",name:"maxval",type:"number",defaultValue:1},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniformInt",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number"},{tfName:"maxval",name:"maxval",type:"number"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Range",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"step",type:"number",defaultValue:0}],attrs:[{tfName:"Tidx",name:"dtype",type:"dtype"}]},{tfOpName:"TruncatedNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"means",name:"mean",type:"number",defaultValue:0},{tfName:"stddev",name:"stdDev",type:"number",defaultValue:1},{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"Zeros",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"ZerosLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Multinomial",category:"creation",inputs:[{start:0,name:"logits",type:"tensor"},{start:1,name:"numSamples",type:"number"}],attrs:[{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number"},{tfName:"T",name:"dtype",type:"dtype"},{tfName:"output_dtype",name:"output_dtype",type:"dtype"}]}];var BS=Object.freeze({__proto__:null,json:CS});/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const LS=[{tfOpName:"NonMaxSuppressionV2",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV3",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV4",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"T_threshold",name:"threshold",type:"dtype",notSupported:!0},{tfName:"pad_to_max_output_size",name:"padToMaxOutputSize",type:"bool"}]},{tfOpName:"NonMaxSuppressionV5",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"},{start:5,name:"softNmsSigma",type:"number"}]},{tfOpName:"Where",category:"dynamic",inputs:[{start:0,name:"condition",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ListDiff",category:"dynamic",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}];var PS=Object.freeze({__proto__:null,json:LS});/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zS=[{tfOpName:"LowerBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"TopKV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"k",type:"number"}],attrs:[{tfName:"sorted",name:"sorted",type:"bool"}]},{tfOpName:"UpperBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"Unique",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"UniqueV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]}];var VS=Object.freeze({__proto__:null,json:zS});/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const MS=[{tfOpName:"PlaceholderWithDefault",category:"graph",inputs:[{start:0,name:"default",type:"tensor"}],attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Placeholder",category:"graph",attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Const",category:"graph"},{tfOpName:"Identity",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IdentityN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Snapshot",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Rank",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Size",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Shape",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"ShapeN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Print",category:"graph",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"data",type:"tensors"}],attrs:[{tfName:"message",name:"message",type:"string"},{tfName:"first_n",name:"firstN",type:"number",notSupported:!0},{tfName:"summarize",name:"summarize",type:"number",defaultValue:3}]},{tfOpName:"NoOp",category:"graph",inputs:[]},{tfOpName:"StopGradient",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"FakeQuantWithMinMaxVars",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"min",name:"min",type:"number"},{tfName:"max",name:"max",type:"number"}]}];var WS=Object.freeze({__proto__:null,json:MS});/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const qS=[{tfOpName:"HashTable",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"HashTableV2",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"LookupTableImport",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableImportV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFind",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFindV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableSize",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"LookupTableSizeV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"InitializeTable",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]},{tfOpName:"InitializeTableV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]}];var US=Object.freeze({__proto__:null,json:qS});/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const GS=[{tfOpName:"ResizeBilinear",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ResizeNearestNeighbor",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"CropAndResize",category:"image",inputs:[{start:0,name:"image",type:"tensor"},{start:1,name:"boxes",type:"tensor"},{start:2,name:"boxInd",type:"tensor"},{start:3,name:"cropSize",type:"number[]"}],attrs:[{tfName:"method",name:"method",type:"string"},{tfName:"extrapolation_value",name:"extrapolationValue",type:"number"}]},{tfOpName:"ImageProjectiveTransformV3",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"transforms",type:"tensor"},{start:2,name:"outputShape",type:"number[]"},{start:3,name:"fillValue",type:"number"}],attrs:[{tfName:"interpolation",name:"interpolation",type:"string"},{tfName:"fill_mode",name:"fillMode",type:"string"}]}];var jS=Object.freeze({__proto__:null,json:GS});/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const HS=[{tfOpName:"Equal",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NotEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Greater",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"GreaterEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Less",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LessEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalAnd",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalNot",category:"logical",inputs:[{start:0,name:"a",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalOr",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Select",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SelectV2",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BitwiseAnd",category:"logical",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}]}];var KS=Object.freeze({__proto__:null,json:HS});/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const XS=[{tfOpName:"_FusedMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMulV2",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Transpose",category:"matrices",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"perm",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Einsum",category:"matrices",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"equation",name:"equation",type:"string"},{tfName:"N",name:"n",type:"number",defaultValue:2},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"MatrixBandPart",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"numLower",type:"tensor"},{start:1,name:"numUpper",type:"tensor"}]}];var ZS=Object.freeze({__proto__:null,json:XS});/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const JS=[{tfOpName:"EuclideanNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool",defaultValue:!1}]},{tfOpName:"FusedBatchNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV2",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV3",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"LRN",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"depth_radius",name:"radius",type:"number",defaultValue:5},{tfName:"bias",name:"bias",type:"number",defaultValue:1},{tfName:"alpha",name:"alpha",type:"number",defaultValue:1},{tfName:"beta",name:"beta",type:"number",defaultValue:.5}]},{tfOpName:"Softmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"LogSoftmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]}];var YS=Object.freeze({__proto__:null,json:JS});/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const QS=[{tfOpName:"Bincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}]},{tfOpName:"DenseBincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}],attrs:[{tfName:"binary_output",name:"binaryOutput",type:"bool"}]},{tfOpName:"Max",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Mean",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Min",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Sum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"All",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Any",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"ArgMax",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"ArgMin",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"Prod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cumprod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]},{tfOpName:"Cumsum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]}];var eT=Object.freeze({__proto__:null,json:QS});/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const tT=[{tfOpName:"ConcatV2",category:"slice_join",inputs:[{start:0,end:-1,name:"tensors",type:"tensors"},{start:-1,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"Concat",category:"slice_join",inputs:[{start:1,end:0,name:"tensors",type:"tensors"},{start:0,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"GatherV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"axis",type:"number",defaultValue:0}],attrs:[{tfName:"batch_dims",name:"batchDims",type:"number",defaultValue:0}]},{tfOpName:"Gather",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",notSupported:!0}]},{tfOpName:"Reverse",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"dims",type:"bool[]"}]},{tfOpName:"ReverseV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}]},{tfOpName:"Slice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"size",type:"number[]"}]},{tfOpName:"StridedSlice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"end",type:"number[]"},{start:3,name:"strides",type:"number[]"}],attrs:[{tfName:"begin_mask",name:"beginMask",type:"number",defaultValue:0},{tfName:"end_mask",name:"endMask",type:"number",defaultValue:0},{tfName:"new_axis_mask",name:"newAxisMask",type:"number",defaultValue:0},{tfName:"ellipsis_mask",name:"ellipsisMask",type:"number",defaultValue:0},{tfName:"shrink_axis_mask",name:"shrinkAxisMask",type:"number",defaultValue:0}]},{tfOpName:"Pack",category:"slice_join",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0}]},{tfOpName:"Unpack",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0},{tfName:"num",name:"num",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Tile",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"reps",type:"number[]"}]},{tfOpName:"Split",category:"slice_join",inputs:[{start:0,name:"axis",type:"number",defaultValue:0},{start:1,name:"x",type:"tensor"}],attrs:[{tfName:"num_split",name:"numOrSizeSplits",type:"number",defaultValue:1}]},{tfOpName:"SplitV",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"numOrSizeSplits",type:"number[]"},{start:2,name:"axis",type:"number",defaultValue:0}]},{tfOpName:"ScatterNd",category:"slice_join",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"shape",type:"number[]"}]},{tfOpName:"GatherNd",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}]},{tfOpName:"SparseToDense",category:"slice_join",inputs:[{start:0,name:"sparseIndices",type:"tensor"},{start:1,name:"outputShape",type:"number[]"},{start:2,name:"sparseValues",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",defaultValue:!1,notSupported:!0}]},{tfOpName:"TensorScatterUpdate",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"values",type:"tensor"}]}];var nT=Object.freeze({__proto__:null,json:tT});/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const rT=[{tfOpName:"SparseFillEmptyRows",category:"sparse",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"denseShape",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}]},{tfOpName:"SparseReshape",category:"sparse",inputs:[{start:0,name:"inputIndices",type:"tensor"},{start:1,name:"inputShape",type:"tensor"},{start:2,name:"newShape",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SparseSegmentMean",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]},{tfOpName:"SparseSegmentSum",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]}];var sT=Object.freeze({__proto__:null,json:rT});/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const aT=[{tfOpName:"FFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"RFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]},{tfOpName:"IRFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]}];var oT=Object.freeze({__proto__:null,json:aT});/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const iT=[{tfOpName:"StaticRegexReplace",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"pattern",name:"pattern",type:"string"},{tfName:"rewrite",name:"rewrite",type:"string"},{tfName:"replace_global",name:"replaceGlobal",type:"bool"}]},{tfOpName:"StringNGrams",category:"string",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"dataSplits",type:"tensor"}],attrs:[{tfName:"separator",name:"separator",type:"string"},{tfName:"ngram_widths",name:"nGramWidths",type:"number[]"},{tfName:"left_pad",name:"leftPad",type:"string"},{tfName:"right_pad",name:"rightPad",type:"string"},{tfName:"pad_width",name:"padWidth",type:"number"},{tfName:"preserve_short_sequences",name:"preserveShortSequences",type:"bool"}],outputs:["ngrams","ngrams_splits"]},{tfOpName:"StringSplit",category:"string",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"delimiter",type:"tensor"}],attrs:[{tfName:"skip_empty",name:"skipEmpty",type:"bool"}],outputs:["indices","values","shape"]},{tfOpName:"StringToHashBucketFast",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"num_buckets",name:"numBuckets",type:"number"}]}];var uT=Object.freeze({__proto__:null,json:iT});/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const lT=[{tfOpName:"Cast",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"SrcT",name:"sdtype",type:"dtype",notSupported:!0},{tfName:"DstT",name:"dtype",type:"dtype"}]},{tfOpName:"ExpandDims",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"MirrorPad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"mode",name:"mode",type:"string"}]},{tfOpName:"Pad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"constant_value",name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"PadV2",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"},{start:2,name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"Reshape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"EnsureShape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"Squeeze",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"axis",tfDeprecatedName:"squeeze_dims",name:"axis",type:"number[]"}]},{tfOpName:"SpaceToBatchND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"paddings",type:"number[]"}]},{tfOpName:"BatchToSpaceND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"crops",type:"number[]"}]},{tfOpName:"DepthToSpace",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"block_size",name:"blockSize",type:"number"},{tfName:"data_format",name:"dataFormat",type:"string"}]},{tfOpName:"BroadcastTo",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}],attrs:[]},{tfOpName:"BroadcastArgs",category:"transformation",inputs:[{start:0,name:"s0",type:"tensor"},{start:1,name:"s1",type:"tensor"}],attrs:[]}];var cT=Object.freeze({__proto__:null,json:lT});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class to{static get Instance(){return this._instance||(this._instance=new this)}constructor(){const e=[xS,AS,OS,RS,BS,PS,VS,WS,US,jS,KS,ZS,YS,eT,nT,sT,oT,uT,cT],n=[].concat(...e.map(r=>r.json));this.opMappers=n.reduce((r,s)=>(r[s.tfOpName]=s,r),{})}transformGraph(e,n={}){const r=e.node,s=[],a=[],o=[],i=r.reduce((S,b)=>(S[b.name]=this.mapNode(b),b.op.startsWith("Placeholder")?s.push(S[b.name]):b.op==="Const"?a.push(S[b.name]):(b.input==null||b.input.length===0)&&o.push(S[b.name]),S),{});let u=[];const l=[];let p={},c={};n!=null&&(p=this.mapSignatureEntries(n.inputs),c=this.mapSignatureEntries(n.outputs));const f=Object.keys(i);f.forEach(S=>{const b=i[S];b.inputNames.forEach((T,A)=>{const[E,,v]=je(T),k=i[E];if(k.outputs!=null){const _=k.outputs.indexOf(v);if(_!==-1){const D=`${E}:${_}`;b.inputNames[A]=D}}b.inputs.push(k),k.children.push(b)})}),Object.keys(c).length===0?f.forEach(S=>{const b=i[S];b.children.length===0&&l.push(b)}):Object.keys(c).forEach(S=>{const[b]=je(S),T=i[b];T!=null&&(T.signatureKey=c[S],l.push(T))}),Object.keys(p).length>0?Object.keys(p).forEach(S=>{const[b]=je(S),T=i[b];T&&(T.signatureKey=p[S],u.push(T))}):u=s;let d={};e.library!=null&&e.library.function!=null&&(d=e.library.function.reduce((S,b)=>(S[b.signature.name]=this.mapFunction(b),S),{}));const y={nodes:i,inputs:u,outputs:l,weights:a,placeholders:s,signature:n,functions:d};return o.length>0&&(y.initNodes=o),y}mapSignatureEntries(e){return Object.keys(e||{}).reduce((n,r)=>(n[e[r].name]=r,n),{})}mapNode(e){const n=zh(e.op)||this.opMappers[e.op]||{};e.attr==null&&(e.attr={});const r={name:e.name,op:e.op,category:n.category,inputNames:(e.input||[]).map(s=>s.startsWith("^")?s.slice(1):s),inputs:[],children:[],inputParams:{},attrParams:{},rawAttrs:e.attr,outputs:n.outputs};return n.inputs!=null&&(r.inputParams=n.inputs.reduce((s,a)=>(s[a.name]={type:a.type,inputIndexStart:a.start,inputIndexEnd:a.end},s),{})),n.attrs!=null&&(r.attrParams=n.attrs.reduce((s,a)=>{const o=a.type;let i;switch(a.type){case"string":i=Qr(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=Qr(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"string[]":i=os(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=os(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"number":i=ts(e.attr,a.tfName,a.defaultValue||0),i===void 0&&a.tfDeprecatedName&&(i=ts(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"number[]":i=as(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=as(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"bool":i=es(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=es(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"bool[]":i=us(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=us(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"shape":i=ss(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=ss(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"shape[]":i=is(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=is(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"dtype":i=ns(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=ns(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"dtype[]":i=rs(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=rs(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"func":i=no(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=no(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"tensor":case"tensors":break;default:throw new Error(`Unsupported param type: ${a.type} for op: ${e.op}`)}return s[a.name]={value:i,type:o},s},{})),r}mapFunction(e){const n=e.nodeDef,r=[],s=[];let a={};n!=null&&(a=n.reduce((c,f)=>(c[f.name]=this.mapNode(f),f.op==="Const"&&s.push(c[f.name]),c),{}));const o=[],i=[];e.signature.inputArg.forEach(c=>{const[f]=je(c.name),d={name:f,op:"Placeholder",inputs:[],inputNames:[],category:"graph",inputParams:{},attrParams:{dtype:{value:Aa(c.type),type:"dtype"}},children:[]};d.signatureKey=c.name,o.push(d),a[f]=d}),Object.keys(a).forEach(c=>{const f=a[c];f.inputNames.forEach((d,y)=>{const[S,,b]=je(d),T=a[S];if(T.outputs!=null){const A=T.outputs.indexOf(b);if(A!==-1){const E=`${S}:${A}`;f.inputNames[y]=E}}f.inputs.push(T),T.children.push(f)})});const l=e.ret;e.signature.outputArg.forEach(c=>{const[f,d]=je(l[c.name]),y=a[f];y!=null&&(y.defaultOutput=d,i.push(y))});const p=this.mapArgsToSignature(e);return{nodes:a,inputs:o,outputs:i,weights:s,placeholders:r,signature:p}}mapArgsToSignature(e){return{methodName:e.signature.name,inputs:e.signature.inputArg.reduce((n,r)=>(n[r.name]=this.mapArgToTensorInfo(r),n),{}),outputs:e.signature.outputArg.reduce((n,r)=>(n[r.name]=this.mapArgToTensorInfo(r,e.ret),n),{})}}mapArgToTensorInfo(e,n){let r=e.name;return n!=null&&(r=n[r]),{name:r,dtype:e.type}}}function pT(t){const e=C().global;if(typeof e.atob<"u")return e.atob(t);if(typeof Buffer<"u")return new Buffer(t,"base64").toString();throw new Error("Unable to decode base64 in this environment. Missing built-in atob() or Buffer()")}function Vh(t,e){const n=Array.isArray(t)?String.fromCharCode.apply(null,t):pT(t);return e?n:n.toLowerCase()}function Qr(t,e,n,r=!1){const s=t[e];return s!=null?Vh(s.s,r):n}function es(t,e,n){const r=t[e];return r?r.b:n}function ts(t,e,n){const r=t[e]||{},s=r.i!=null?r.i:r.f!=null?r.f:n;return typeof s=="number"?s:parseInt(s,10)}function Aa(t){switch(typeof t=="string"&&(t=ge[t]),t){case ge.DT_FLOAT:case ge.DT_HALF:return"float32";case ge.DT_INT32:case ge.DT_INT64:case ge.DT_INT8:case ge.DT_UINT8:return"int32";case ge.DT_BOOL:return"bool";case ge.DT_DOUBLE:return"float32";case ge.DT_STRING:return"string";case ge.DT_COMPLEX64:case ge.DT_COMPLEX128:return"complex64";default:return null}}function no(t,e,n){const r=t[e];return r&&r.func?r.func.name:n}function ns(t,e,n){const r=t[e];return r&&r.type?Aa(r.type):n}function rs(t,e,n){const r=t[e];return r&&r.list&&r.list.type?r.list.type.map(s=>Aa(s)):n}function Mh(t){if(!t.unknownRank)return t.dim!=null?t.dim.map(e=>typeof e.size=="number"?e.size:parseInt(e.size,10)):[]}function ss(t,e,n){const r=t[e];return r&&r.shape?Mh(r.shape):n}function as(t,e,n){const r=t[e];return r?((r.list.f&&r.list.f.length?r.list.f:r.list.i)||[]).map(s=>typeof s=="number"?s:parseInt(s,10)):n}function os(t,e,n,r=!1){const s=t[e];return s&&s.list&&s.list.s?s.list.s.map(a=>Vh(a,r)):n}function is(t,e,n){const r=t[e];return r&&r.list&&r.list.shape?r.list.shape.map(s=>Mh(s)):n}function us(t,e,n){const r=t[e];return r&&r.list&&r.list.b?r.list.b:n}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class hT{constructor(e,n,r){this.node=e,this.tensorMap=n,this.context=r,this.inputs=[],this.attrs={},this.inputs=e.inputNames.map(s=>this.getInput(s)),e.rawAttrs!=null&&(this.attrs=Object.keys(e.rawAttrs).reduce((s,a)=>(s[a]=this.getAttr(a),s),{}))}getInput(e){return oe(e,this.tensorMap,this.context)}getAttr(e,n){const r=this.node.rawAttrs[e];if(r.tensor!=null)return oe(e,this.tensorMap,this.context);if(r.i!=null||r.f!=null)return ts(this.node.rawAttrs,e,n);if(r.s!=null)return Qr(this.node.rawAttrs,e,n);if(r.b!=null)return es(this.node.rawAttrs,e,n);if(r.shape!=null)return ss(this.node.rawAttrs,e,n);if(r.type!=null)return ns(this.node.rawAttrs,e,n);if(r.list!=null){if(r.list.i!=null||r.list.f!=null)return as(this.node.rawAttrs,e,n);if(r.list.s!=null)return os(this.node.rawAttrs,e,n);if(r.list.shape!=null)return is(this.node.rawAttrs,e,n);if(r.list.b!=null)return us(this.node.rawAttrs,e,n);if(r.list.type!=null)return rs(this.node.rawAttrs,e,n)}return n}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var ie=Object.freeze({__proto__:null,OP_SCOPE_SUFFIX:Es,abs:be,acos:Gl,acosh:jl,add:R,addN:Hl,all:Kl,any:Xl,argMax:Zl,argMin:Jl,asin:Yl,asinh:Ql,atan:ec,atan2:tc,atanh:nc,avgPool:As,avgPool3d:oc,basicLSTMCell:ic,batchNorm:Dn,batchNorm2d:uc,batchNorm3d:lc,batchNorm4d:cc,batchToSpaceND:Ds,bincount:Os,bitwiseAnd:pc,booleanMaskAsync:eh,broadcastArgs:hc,broadcastTo:cn,buffer:Ve,cast:X,ceil:fc,clipByValue:dc,clone:Xe,complex:Je,concat:ue,concat1d:mc,concat2d:gc,concat3d:yc,concat4d:bc,conv1d:wc,conv2d:On,conv2dTranspose:Sc,conv3d:Tc,conv3dTranspose:Ec,cos:vc,cosh:$c,cosineWindow:br,cumprod:kc,cumsum:_c,denseBincount:xc,depthToSpace:Ic,depthwiseConv2d:lr,diag:Ac,dilation2d:Dc,div:K,divNoNan:Fc,dot:Rc,dropout:ah,einsum:wt,elu:Cs,enclosingPowerOfTwo:ya,ensureShape:Cc,equal:Rs,erf:Bc,euclideanNorm:zc,exp:ct,expandDims:Ge,expm1:Vc,eye:Ls,fft:dr,fill:tn,floor:Ps,floorDiv:xs,fused:ih,gather:zs,gatherND:sh,greater:Cn,greaterEqual:Vs,ifft:En,imag:Bn,image:mh,inTopKAsync:oh,irfft:pa,isFinite:Mc,isInf:Wc,isNaN:qc,leakyRelu:Ms,less:tr,lessEqual:cr,linalg:gh,linspace:Uc,localResponseNormalization:Gc,log:Zt,log1p:Ws,logSigmoid:Hc,logSoftmax:Kc,logSumExp:Us,logicalAnd:Nn,logicalNot:Gs,logicalOr:js,logicalXor:Xc,losses:yh,lowerBound:Zc,matMul:V,max:$t,maxPool:Hs,maxPool3d:Jc,maxPoolWithArgmax:Yc,maximum:Ks,mean:Sn,meshgrid:Qc,min:er,minimum:Tn,mirrorPad:ep,mod:tp,moments:np,movingAverage:th,mul:I,multiRNNCell:rp,multinomial:sp,neg:Re,norm:Rn,notEqual:Xs,oneHot:nr,ones:st,onesLike:ap,op:w,outerProduct:op,pad:nn,pad1d:ip,pad2d:up,pad3d:lp,pad4d:cp,pool:pp,pow:Xt,prelu:Js,print:_s,prod:hp,raggedGather:fp,raggedRange:dp,raggedTensorToTensor:mp,rand:gp,randomGamma:Np,randomNormal:ua,randomStandardNormal:Sp,randomUniform:fr,randomUniformInt:Tp,range:Jt,real:Yt,reciprocal:Ep,relu:Ln,relu6:la,reshape:$,reverse:pt,reverse1d:vp,reverse2d:$p,reverse3d:kp,reverse4d:_p,rfft:mr,round:ca,rsqrt:xp,scalar:z,scatterND:nh,searchSorted:hr,selu:Ip,separableConv2d:Ap,setdiff1dAsync:Dp,sigmoid:vt,sign:Op,signal:dh,sin:Fp,sinh:Rp,slice:G,slice1d:Cp,slice2d:Bp,slice3d:Lp,slice4d:Pp,softmax:zp,softplus:qs,spaceToBatchND:Zs,sparse:bh,sparseToDense:rh,spectral:fh,split:Qt,sqrt:Me,square:Ie,squaredDifference:ha,squeeze:gr,stack:qe,step:fa,stridedSlice:Vp,string:wh,sub:P,sum:H,tan:Mp,tanh:Qn,tensor:Fe,tensor1d:Ee,tensor2d:Ut,tensor3d:da,tensor4d:Wp,tensor5d:qp,tensor6d:Up,tensorScatterUpdate:jp,tile:qt,topk:Hp,transpose:vn,truncatedNormal:Kp,unique:Xp,unsortedSegmentSum:Zp,unstack:dt,upperBound:Jp,variable:Yp,where:Ze,whereAsync:ga,zeros:At,zerosLike:Ne});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fT=(t,e,n,r=ie)=>{switch(t.op){case"BiasAdd":case"AddV2":case"Add":return[r.add(h("a",t,e,n),h("b",t,e,n))];case"AddN":return[r.addN(h("tensors",t,e,n))];case"FloorMod":case"Mod":return[r.mod(h("a",t,e,n),h("b",t,e,n))];case"Mul":return[r.mul(h("a",t,e,n),h("b",t,e,n))];case"RealDiv":case"Div":return[r.div(h("a",t,e,n),h("b",t,e,n))];case"DivNoNan":return[r.divNoNan(h("a",t,e,n),h("b",t,e,n))];case"FloorDiv":return[r.floorDiv(h("a",t,e,n),h("b",t,e,n))];case"Sub":return[r.sub(h("a",t,e,n),h("b",t,e,n))];case"Minimum":return[r.minimum(h("a",t,e,n),h("b",t,e,n))];case"Maximum":return[r.maximum(h("a",t,e,n),h("b",t,e,n))];case"Pow":return[r.pow(h("a",t,e,n),h("b",t,e,n))];case"SquaredDifference":return[r.squaredDifference(h("a",t,e,n),h("b",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const dT=(t,e,n,r=ie)=>{switch(t.op){case"Abs":case"ComplexAbs":return[r.abs(h("x",t,e,n))];case"Acos":return[r.acos(h("x",t,e,n))];case"Acosh":return[r.acosh(h("x",t,e,n))];case"Asin":return[r.asin(h("x",t,e,n))];case"Asinh":return[r.asinh(h("x",t,e,n))];case"Atan":return[r.atan(h("x",t,e,n))];case"Atan2":return[r.atan2(h("x",t,e,n),h("y",t,e,n))];case"Atanh":return[r.atanh(h("x",t,e,n))];case"Ceil":return[r.ceil(h("x",t,e,n))];case"Complex":return[r.complex(h("real",t,e,n),h("imag",t,e,n))];case"Cos":return[r.cos(h("x",t,e,n))];case"Cosh":return[r.cosh(h("x",t,e,n))];case"Elu":return[r.elu(h("x",t,e,n))];case"Erf":return[r.erf(h("x",t,e,n))];case"Exp":return[r.exp(h("x",t,e,n))];case"Expm1":return[r.expm1(h("x",t,e,n))];case"Floor":return[r.floor(h("x",t,e,n))];case"Log":return[r.log(h("x",t,e,n))];case"Log1p":return[r.log1p(h("x",t,e,n))];case"Imag":return[r.imag(h("x",t,e,n))];case"Neg":return[r.neg(h("x",t,e,n))];case"Reciprocal":return[r.reciprocal(h("x",t,e,n))];case"Real":return[r.real(h("x",t,e,n))];case"Relu":return[r.relu(h("x",t,e,n))];case"Round":return[r.round(h("x",t,e,n))];case"Selu":return[r.selu(h("x",t,e,n))];case"Sigmoid":return[r.sigmoid(h("x",t,e,n))];case"Sin":return[r.sin(h("x",t,e,n))];case"Sign":return[r.sign(h("x",t,e,n))];case"Sinh":return[r.sinh(h("x",t,e,n))];case"Softplus":return[r.softplus(h("x",t,e,n))];case"Sqrt":return[r.sqrt(h("x",t,e,n))];case"Square":return[r.square(h("x",t,e,n))];case"Tanh":return[r.tanh(h("x",t,e,n))];case"Tan":return[r.tan(h("x",t,e,n))];case"ClipByValue":return[r.clipByValue(h("x",t,e,n),h("clipValueMin",t,e,n),h("clipValueMax",t,e,n))];case"Relu6":return[r.relu6(h("x",t,e,n))];case"Rsqrt":return[r.rsqrt(oe(t.inputNames[0],e,n))];case"LeakyRelu":return[r.leakyRelu(h("x",t,e,n),h("alpha",t,e,n))];case"Prelu":return[r.prelu(h("x",t,e,n),h("alpha",t,e,n))];case"IsNan":return[r.isNaN(oe(t.inputNames[0],e,n))];case"IsInf":return[r.isInf(oe(t.inputNames[0],e,n))];case"IsFinite":return[r.isFinite(oe(t.inputNames[0],e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $e(t,e,n=""){if(!(typeof t=="number"||typeof e=="number")){g(t.length===e.length,()=>n+` Shapes ${t} and ${e} must match`);for(let r=0;r<t.length;r++){const s=t[r],a=e[r];g(s<0||a<0||s===a,()=>n+` Shapes ${t} and ${e} must match`)}}}function ro(t){return!(typeof t=="number"||t.some(e=>e<0))}function an(t,e,n){let r=ls(t,n);const s=!ro(r);if(s&&e.length===0)throw new Error(`Tried to calculate elements of an empty list with non-fully-defined elementShape: ${r}`);if(s&&e.forEach(a=>{r=ls(a.shape,r)}),!ro(r))throw new Error(`Non-fully-defined elementShape: ${r}`);return r}function ls(t,e){if(typeof t=="number")return e;if(typeof e=="number")return t;if(t.length!==e.length)throw new Error(`Incompatible ranks during merge: ${t} vs. ${e}`);const n=[];for(let r=0;r<t.length;++r){const s=t[r],a=e[r];if(s>=0&&a>=0&&s!==a)throw new Error(`Incompatible shape during merge: ${t} vs. ${e}`);n[r]=s>=0?s:a}return n}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class mT{constructor(e,n,r,s,a,o,i){this.name=e,this.dtype=n,this.maxSize=r,this.elementShape=s,this.identicalElementShapes=a,this.dynamicSize=o,this.clearAfterRead=i,this.tensors=[],this.closed_=!1,this.idTensor=z(0),Oe(this.idTensor)}get id(){return this.idTensor.id}get closed(){return this.closed_}clearAndClose(e){this.tensors.forEach(n=>{(e==null||!e.has(n.tensor.id))&&n.tensor.dispose()}),this.tensors=[],this.closed_=!0,this.idTensor.dispose()}size(){return this.tensors.length}read(e){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(e<0||e>=this.size())throw new Error(`Tried to read from index ${e}, but array size is: ${this.size()}`);const n=this.tensors[e];if(n.cleared)throw new Error(`TensorArray ${this.name}: Could not read index ${e} twice because it was cleared after a previous read (perhaps try setting clear_after_read = false?).`);return this.clearAfterRead&&(n.cleared=!0),n.read=!0,n.tensor}readMany(e){return e.map(n=>this.read(n))}write(e,n){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(e<0||!this.dynamicSize&&e>=this.maxSize)throw new Error(`Tried to write to index ${e}, but array is not resizeable and size is: ${this.maxSize}`);const r=this.tensors[e]||{};if(n.dtype!==this.dtype)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e},
          because the value dtype is ${n.dtype}, but TensorArray dtype is ${this.dtype}.`);if(this.size()===0&&(this.elementShape==null||this.elementShape.length===0)&&(this.elementShape=n.shape),$e(this.elementShape,n.shape,`TensorArray ${this.name}: Could not write to TensorArray index ${e}.`),r.read)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been read.`);if(r.written)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been written.`);r.tensor=n,Oe(n),r.written=!0,this.tensors[e]=r}writeMany(e,n){if(e.length!==n.length)throw new Error(`TensorArray ${this.name}: could not write multiple tensors,because the index size: ${e.length} is not the same as tensors size: ${n.length}.`);e.forEach((r,s)=>this.write(r,n[s]))}gather(e,n){if(n&&n!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but gather requested dtype ${n}`);if(e)e=e.slice(0,this.size());else{e=[];for(let s=0;s<this.size();s++)e.push(s)}if(e.length===0)return Fe([],[0].concat(this.elementShape));const r=this.readMany(e);return $e(this.elementShape,r[0].shape,"TensorArray shape mismatch: "),qe(r,0)}concat(e){if(e&&e!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but concat requested dtype ${e}`);if(this.size()===0)return Fe([],[0].concat(this.elementShape));const n=[];for(let s=0;s<this.size();s++)n.push(s);const r=this.readMany(n);return $e(this.elementShape,r[0].shape,`TensorArray shape mismatch: tensor array shape (${this.elementShape}) vs first tensor shape (${r[0].shape})`),ue(r,0)}scatter(e,n){if(n.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${n.dtype}`);if(e.length!==n.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${e.length} vs. ${n.shape[0]}`);const r=Math.max(...e);if(!this.dynamicSize&&r>=this.maxSize)throw new Error(`Max index must be < array size (${r}  vs. ${this.maxSize})`);this.writeMany(e,dt(n,0))}split(e,n){if(n.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${n.dtype}`);let r=0;const s=e.map(u=>(r+=u,r));if(r!==n.shape[0])throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${r}, and tensor's shape is: ${n.shape}`);if(!this.dynamicSize&&e.length!==this.maxSize)throw new Error(`TensorArray's size is not equal to the size of lengths (${this.maxSize} vs. ${e.length}), and the TensorArray is not marked as dynamically resizeable`);const a=r===0?0:n.size/r,o=[];M(()=>{n=$(n,[1,r,a]);for(let u=0;u<e.length;++u){const p=[0,u===0?0:s[u-1],0],c=[1,e[u],a];o[u]=$(G(n,p,c),this.elementShape)}return o});const i=[];for(let u=0;u<e.length;u++)i[u]=u;this.writeMany(i,o)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Ot{get id(){return this.idTensor.id}constructor(e,n,r,s=-1){this.tensors=e,this.elementShape=n,this.elementDtype=r,e?.forEach(a=>{if(r!==a.dtype)throw new Error(`Invalid data types; op elements ${r}, but list elements ${a.dtype}`);$e(n,a.shape,"TensorList shape mismatch: "),Oe(a)}),this.idTensor=z(0),this.maxNumElements=s,Oe(this.idTensor)}copy(){return new Ot([...this.tensors],this.elementShape,this.elementDtype)}clearAndClose(e){this.tensors.forEach(n=>{(e==null||!e.has(n.id))&&n.dispose()}),this.tensors.length=0,this.idTensor.dispose()}size(){return this.tensors.length}stack(e,n,r=-1){if(n!==this.elementDtype)throw new Error(`Invalid data types; op elements ${n}, but list elements ${this.elementDtype}`);if(r!==-1&&this.tensors.length!==r)throw new Error(`Operation expected a list with ${r} elements but got a list with ${this.tensors.length} elements.`);$e(e,this.elementShape,"TensorList shape mismatch: ");const s=an(this.elementShape,this.tensors,e);return M(()=>{const a=this.tensors.map(o=>$(o,s));return qe(a,0)})}popBack(e,n){if(n!==this.elementDtype)throw new Error(`Invalid data types; op elements ${n}, but list elements ${this.elementDtype}`);if(this.size()===0)throw new Error("Trying to pop from an empty list.");const r=an(this.elementShape,this.tensors,e),s=this.tensors.pop();return s.kept=!1,$e(s.shape,e,"TensorList shape mismatch: "),$(s,r)}pushBack(e){if(e.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${e.dtype}, but list elements ${this.elementDtype}`);if($e(e.shape,this.elementShape,"TensorList shape mismatch: "),this.maxNumElements===this.size())throw new Error("Trying to push element into a full list.");Oe(e),this.tensors.push(e)}resize(e){if(e<0)throw new Error(`TensorListResize expects size to be non-negative. Got: ${e}`);if(this.maxNumElements!==-1&&e>this.maxNumElements)throw new Error(`TensorListResize input size ${e} is greater maxNumElement ${this.maxNumElements}.`);const n=new Ot([],this.elementShape,this.elementDtype,this.maxNumElements);n.tensors.length=e;for(let r=0;r<Math.min(this.tensors.length,e);++r)n.tensors[r]=this.tensors[r];return n}getItem(e,n,r){if(r!==this.elementDtype)throw new Error(`Invalid data types; op elements ${r}, but list elements ${this.elementDtype}`);if(e<0||e>this.tensors.length)throw new Error(`Trying to access element ${e} in a list with ${this.tensors.length} elements.`);if(this.tensors[e]==null)throw new Error(`element at index ${e} is null.`);$e(this.tensors[e].shape,n,"TensorList shape mismatch: ");const s=an(this.elementShape,this.tensors,n);return $(this.tensors[e],s)}setItem(e,n){if(n.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${n.dtype}, but list elements ${this.elementDtype}`);if(e<0||this.maxNumElements!==-1&&e>=this.maxNumElements)throw new Error(`Trying to set element ${e} in a list with max ${this.maxNumElements} elements.`);$e(this.elementShape,n.shape,"TensorList shape mismatch: "),Oe(n),this.tensors[e]!=null&&(this.tensors[e].kept=!1),this.tensors[e]=n}gather(e,n,r){if(n!==this.elementDtype)throw new Error(`Invalid data types; op elements ${n}, but list elements ${this.elementDtype}`);$e(this.elementShape,r,"TensorList shape mismatch: "),e=e.slice(0,this.size());const s=an(this.elementShape,this.tensors,r);return e.length===0?Fe([],[0].concat(s)):M(()=>{const a=e.map(o=>$(this.tensors[o],s));return qe(a,0)})}concat(e,n){if(e&&e!==this.elementDtype)throw new Error(`TensorList dtype is ${this.elementDtype} but concat requested dtype ${e}`);$e(this.elementShape,n,"TensorList shape mismatch: ");const r=an(this.elementShape,this.tensors,n);return this.size()===0?Fe([],[0].concat(r)):M(()=>{const s=this.tensors.map(a=>$(a,r));return ue(s,0)})}}function gT(t,e,n){const r=t.dtype;if(t.shape.length<1)throw new Error(`Tensor must be at least a vector, but saw shape: ${t.shape}`);if(t.dtype!==n)throw new Error(`Invalid data types; op elements ${t.dtype}, but list elements ${n}`);const s=t.shape.slice(1);$e(s,e,"TensorList shape mismatch: ");const a=dt(t);return new Ot(a,e,r)}function yT(t,e,n,r){return new Ot([],t,e,r)}function bT(t,e,n,r){if(e.length!==t.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${e.length} vs. ${t.shape[0]}`);const s=Math.max(...e);if(r!=null&&r!==-1&&s>=r)throw new Error(`Max index must be < array size (${s}  vs. ${r})`);const a=new Ot([],n,t.dtype,r),o=dt(t,0);return e.forEach((i,u)=>{a.setItem(i,o[u])}),a}function wT(t,e,n){let r=0;const s=e.map(p=>(r+=p,r));if(r!==t.shape[0])throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${r}, and tensor's shape is: ${t.shape}`);const a=t.shape.slice(1),o=ls(a,n),i=r===0?0:t.size/r,u=M(()=>{const p=[];t=$(t,[1,r,i]);for(let c=0;c<e.length;++c){const d=[0,c===0?0:s[c-1],0],y=[1,e[c],i];p[c]=$(G(t,d,y),o)}return t.dispose(),p}),l=new Ot([],n,t.dtype,e.length);for(let p=0;p<u.length;p++)l.setItem(p,u[p]);return l}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const NT=async(t,e,n)=>{switch(t.op){case"If":case"StatelessIf":{const r=h("thenBranch",t,e,n),s=h("elseBranch",t,e,n),a=h("cond",t,e,n),o=h("args",t,e,n);return(await a.data())[0]?n.functionMap[r].executeFunctionAsync(o,n.tensorArrayMap,n.tensorListMap):n.functionMap[s].executeFunctionAsync(o,n.tensorArrayMap,n.tensorListMap)}case"While":case"StatelessWhile":{const r=h("body",t,e,n),s=h("cond",t,e,n),a=h("args",t,e,n),o=await n.functionMap[s].executeFunctionAsync(a,n.tensorArrayMap,n.tensorListMap),i=a.map(p=>p.id);let u=await o[0].data();o.forEach(p=>{!p.kept&&i.indexOf(p.id)===-1&&p.dispose()});let l=a;for(;u[0];){const p=l;l=await n.functionMap[r].executeFunctionAsync(l,n.tensorArrayMap,n.tensorListMap);const c=l.map(d=>d.id);p.forEach(d=>{!d.kept&&i.indexOf(d.id)===-1&&c.indexOf(d.id)===-1&&d.dispose()});const f=await n.functionMap[s].executeFunctionAsync(l,n.tensorArrayMap,n.tensorListMap);u=await f[0].data(),f.forEach(d=>{!d.kept&&i.indexOf(d.id)===-1&&c.indexOf(d.id)===-1&&d.dispose()})}return l}case"LoopCond":{const r=h("pred",t,e,n);return[He(r)]}case"Switch":{const r=h("pred",t,e,n);let s=h("data",t,e,n);return s.kept||(s=He(s)),(await r.data())[0]?[void 0,s]:[s,void 0]}case"Merge":{const r=t.inputNames.find(s=>oe(s,e,n)!==void 0);if(r){const s=oe(r,e,n);return[He(s)]}return}case"Enter":{const r=h("frameName",t,e,n),s=h("tensor",t,e,n);return n.enterFrame(r),[He(s)]}case"Exit":{const r=h("tensor",t,e,n);return n.exitFrame(),[He(r)]}case"NextIteration":{const r=h("tensor",t,e,n);return n.nextIteration(),[He(r)]}case"TensorArrayV3":{const r=h("size",t,e,n),s=h("dtype",t,e,n),a=h("elementShape",t,e,n),o=h("dynamicSize",t,e,n),i=h("clearAfterRead",t,e,n),u=h("identicalElementShapes",t,e,n),l=h("name",t,e,n),p=new mT(l,s,r,a,u,o,i);return n.addTensorArray(p),[p.idTensor,z(1)]}case"TensorArrayWriteV3":{const r=h("tensorArrayId",t,e,n),s=h("index",t,e,n),a=h("tensor",t,e,n),o=n.getTensorArray(r.id);return o.write(s,a),[o.idTensor]}case"TensorArrayReadV3":{const r=h("tensorArrayId",t,e,n),s=h("index",t,e,n);return[n.getTensorArray(r.id).read(s)]}case"TensorArrayGatherV3":{const r=h("tensorArrayId",t,e,n),s=h("indices",t,e,n),a=h("dtype",t,e,n);return[n.getTensorArray(r.id).gather(s,a)]}case"TensorArrayScatterV3":{const r=h("tensorArrayId",t,e,n),s=h("indices",t,e,n),a=h("tensor",t,e,n),o=n.getTensorArray(r.id);return o.scatter(s,a),[o.idTensor]}case"TensorArrayConcatV3":{const r=h("tensorArrayId",t,e,n),s=n.getTensorArray(r.id),a=h("dtype",t,e,n);return[s.concat(a)]}case"TensorArraySplitV3":{const r=h("tensorArrayId",t,e,n),s=h("tensor",t,e,n),a=h("lengths",t,e,n),o=n.getTensorArray(r.id);return o.split(a,s),[o.idTensor]}case"TensorArraySizeV3":{const r=h("tensorArrayId",t,e,n),s=n.getTensorArray(r.id);return[z(s.size(),"int32")]}case"TensorArrayCloseV3":{const r=h("tensorArrayId",t,e,n),s=n.getTensorArray(r.id);return s.clearAndClose(),[s.idTensor]}case"TensorListSetItem":{const r=h("tensorListId",t,e,n),s=h("index",t,e,n),a=h("tensor",t,e,n),o=n.getTensorList(r.id);return o.setItem(s,a),[o.idTensor]}case"TensorListGetItem":{const r=h("tensorListId",t,e,n),s=h("index",t,e,n),a=h("elementShape",t,e,n),o=h("elementDType",t,e,n);return[n.getTensorList(r.id).getItem(s,a,o)]}case"TensorListScatterV2":case"TensorListScatter":{const r=h("indices",t,e,n),s=h("tensor",t,e,n),a=h("elementShape",t,e,n),o=h("numElements",t,e,n),i=bT(s,r,a,o);return n.addTensorList(i),[i.idTensor]}case"TensorListReserve":case"EmptyTensorList":{const r=h("elementShape",t,e,n),s=h("elementDType",t,e,n);let a;t.op==="TensorListReserve"?a="numElements":a="maxNumElements";const o=h(a,t,e,n),i=t.op==="TensorListReserve"?-1:o,u=yT(r,s,o,i);return n.addTensorList(u),[u.idTensor]}case"TensorListGather":{const r=h("tensorListId",t,e,n),s=h("indices",t,e,n),a=h("elementShape",t,e,n),o=h("elementDType",t,e,n);return[n.getTensorList(r.id).gather(s,o,a)]}case"TensorListStack":{const r=h("tensorListId",t,e,n),s=h("elementShape",t,e,n),a=h("elementDType",t,e,n),o=h("numElements",t,e,n);return[n.getTensorList(r.id).stack(s,a,o)]}case"TensorListFromTensor":{const r=h("tensor",t,e,n),s=h("elementShape",t,e,n),a=h("elementDType",t,e,n),o=gT(r,s,a);return n.addTensorList(o),[o.idTensor]}case"TensorListConcat":case"TensorListConcatV2":{const r=h("tensorListId",t,e,n),s=n.getTensorList(r.id),a=h("dtype",t,e,n),o=h("elementShape",t,e,n);return[s.concat(a,o)]}case"TensorListPushBack":{const r=h("tensorListId",t,e,n),s=h("tensor",t,e,n),a=n.getTensorList(r.id);return a.pushBack(s),[a.idTensor]}case"TensorListPopBack":{const r=h("tensorListId",t,e,n),s=h("elementShape",t,e,n),a=h("elementDType",t,e,n);return[n.getTensorList(r.id).popBack(s,a)]}case"TensorListSplit":{const r=h("tensor",t,e,n),s=h("elementShape",t,e,n),a=h("lengths",t,e,n),o=wT(r,a,s);return n.addTensorList(o),[o.idTensor]}case"TensorListLength":{const r=h("tensorListId",t,e,n),s=n.getTensorList(r.id);return[z(s.size(),"int32")]}case"TensorListResize":{const r=h("tensorListId",t,e,n),s=h("size",t,e,n),o=n.getTensorList(r.id).resize(s);return n.addTensorList(o),[o.idTensor]}default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function so(t,e,n){const[r,s]=h("fusedOps",t,e,n),a=r==="biasadd",o=!a,i=s==="prelu",u=r==="fusedbatchnorm",l=h("numArgs",t,e,n);if(a){if(i&&l!==2)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&a&&l!==1)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd must have one extra argument: bias.")}if(u)throw new Error("FusedConv2d and DepthwiseConv2d with FusedBatchNorm is not supported");const p=h("strides",t,e,n),c=Un(t,e,n),f=h("dataFormat",t,e,n).toUpperCase(),d=h("dilations",t,e,n);let[y,S]=h("args",t,e,n);o&&(S=y,y=void 0);const b=h("leakyreluAlpha",t,e,n);return{stride:p,pad:c,dataFormat:f,dilations:d,biasArg:y,preluArg:S,activationFunc:s,leakyreluAlpha:b}}const ST=(t,e,n,r=ie)=>{switch(t.op){case"Conv1D":{const s=h("stride",t,e,n),a=h("pad",t,e,n),o=h("dataFormat",t,e,n).toUpperCase(),i=h("dilation",t,e,n);return[r.conv1d(h("x",t,e,n),h("filter",t,e,n),s,a,o,i)]}case"Conv2D":{const s=h("strides",t,e,n),a=Un(t,e,n),o=h("dataFormat",t,e,n).toUpperCase(),i=h("dilations",t,e,n);return[r.conv2d(h("x",t,e,n),h("filter",t,e,n),[s[1],s[2]],a,o,[i[1],i[2]])]}case"_FusedConv2D":{const{stride:s,pad:a,dataFormat:o,dilations:i,biasArg:u,preluArg:l,activationFunc:p,leakyreluAlpha:c}=so(t,e,n);return[r.fused.conv2d({x:h("x",t,e,n),filter:h("filter",t,e,n),strides:[s[1],s[2]],pad:a,dataFormat:o,dilations:[i[1],i[2]],bias:u,activation:p,preluActivationWeights:l,leakyreluAlpha:c})]}case"FusedDepthwiseConv2dNative":{const{stride:s,pad:a,dataFormat:o,dilations:i,biasArg:u,preluArg:l,activationFunc:p,leakyreluAlpha:c}=so(t,e,n);return[r.fused.depthwiseConv2d({x:h("x",t,e,n),filter:h("filter",t,e,n),strides:[s[1],s[2]],pad:a,dataFormat:o,dilations:[i[1],i[2]],bias:u,activation:p,preluActivationWeights:l,leakyreluAlpha:c})]}case"Conv2DBackpropInput":case"Conv2dTranspose":{const s=h("outputShape",t,e,n),a=h("strides",t,e,n),o=Un(t,e,n);return[r.conv2dTranspose(h("x",t,e,n),h("filter",t,e,n),s,[a[1],a[2]],o)]}case"DepthwiseConv2dNative":case"DepthwiseConv2d":{const s=h("strides",t,e,n),a=Un(t,e,n),o=h("dilations",t,e,n),i=h("dataFormat",t,e,n).toUpperCase();return[r.depthwiseConv2d(h("input",t,e,n),h("filter",t,e,n),[s[1],s[2]],a,i,[o[1],o[2]])]}case"Conv3D":{const s=h("strides",t,e,n),a=h("pad",t,e,n),o=h("dataFormat",t,e,n).toUpperCase(),i=h("dilations",t,e,n);return[r.conv3d(h("x",t,e,n),h("filter",t,e,n),[s[1],s[2],s[3]],a,o,[i[1],i[2],i[3]])]}case"AvgPool":{const s=h("strides",t,e,n),a=h("pad",t,e,n),o=h("kernelSize",t,e,n);return[r.avgPool(h("x",t,e,n),[o[1],o[2]],[s[1],s[2]],a)]}case"MaxPool":{const s=h("strides",t,e,n),a=h("pad",t,e,n),o=h("kernelSize",t,e,n);return[r.maxPool(h("x",t,e,n),[o[1],o[2]],[s[1],s[2]],a)]}case"MaxPoolWithArgmax":{const s=h("strides",t,e,n),a=h("pad",t,e,n),o=h("kernelSize",t,e,n),i=h("includeBatchInIndex",t,e,n),{result:u,indexes:l}=r.maxPoolWithArgmax(h("x",t,e,n),[o[1],o[2]],[s[1],s[2]],a,i);return[u,l]}case"AvgPool3D":{const s=h("strides",t,e,n),a=h("pad",t,e,n),o=h("kernelSize",t,e,n);return[r.avgPool3d(h("x",t,e,n),[o[1],o[2],o[3]],[s[1],s[2],s[3]],a)]}case"MaxPool3D":{const s=h("strides",t,e,n),a=h("pad",t,e,n),o=h("kernelSize",t,e,n);return[r.maxPool3d(h("x",t,e,n),[o[1],o[2],o[3]],[s[1],s[2],s[3]],a)]}case"Dilation2D":{const s=h("strides",t,e,n),a=h("pad",t,e,n),o=h("dilations",t,e,n),i=s[1],u=s[2],l=o[1],p=o[2];return[r.dilation2d(h("x",t,e,n),h("filter",t,e,n),[i,u],a,[l,p],"NHWC")]}default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const TT=(t,e,n,r=ie)=>{switch(t.op){case"Fill":{const s=h("shape",t,e,n),a=h("dtype",t,e,n),o=h("value",t,e,n);return[r.fill(s,o,a)]}case"LinSpace":{const s=h("start",t,e,n),a=h("stop",t,e,n),o=h("num",t,e,n);return[r.linspace(s,a,o)]}case"Multinomial":{const s=h("logits",t,e,n),a=h("numSamples",t,e,n),o=h("seed",t,e,n);return[r.multinomial(s,a,o)]}case"OneHot":{const s=h("indices",t,e,n),a=h("depth",t,e,n),o=h("onValue",t,e,n),i=h("offValue",t,e,n),u=h("dtype",t,e,n);return[r.oneHot(s,a,o,i,u)]}case"Ones":return[r.ones(h("shape",t,e,n),h("dtype",t,e,n))];case"OnesLike":return[r.onesLike(h("x",t,e,n))];case"RandomStandardNormal":return[r.randomStandardNormal(h("shape",t,e,n),h("dtype",t,e,n),h("seed",t,e,n))];case"RandomUniform":return[r.randomUniform(h("shape",t,e,n),h("minval",t,e,n),h("maxval",t,e,n),h("dtype",t,e,n))];case"RandomUniformInt":return[r.randomUniformInt(h("shape",t,e,n),h("minval",t,e,n),h("maxval",t,e,n),h("seed",t,e,n))];case"Range":{const s=h("start",t,e,n),a=h("stop",t,e,n),o=h("step",t,e,n);return[r.range(s,a,o,h("dtype",t,e,n))]}case"TruncatedNormal":{const s=h("shape",t,e,n),a=h("mean",t,e,n),o=h("stdDev",t,e,n),i=h("seed",t,e,n);return[r.truncatedNormal(s,a,o,h("dtype",t,e,n),i)]}case"Zeros":return[r.zeros(h("shape",t,e,n),h("dtype",t,e,n))];case"ZerosLike":return[r.zerosLike(h("x",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ar(t,e,n){const r=h("boxes",t,e,n),s=h("scores",t,e,n),a=h("maxOutputSize",t,e,n),o=h("iouThreshold",t,e,n),i=h("scoreThreshold",t,e,n),u=h("softNmsSigma",t,e,n);return{boxes:r,scores:s,maxOutputSize:a,iouThreshold:o,scoreThreshold:i,softNmsSigma:u}}const ET=async(t,e,n,r,s=ie)=>{switch(t.op){case"NonMaxSuppressionV5":{const{boxes:a,scores:o,maxOutputSize:i,iouThreshold:u,scoreThreshold:l,softNmsSigma:p}=Ar(t,e,n),c=await s.image.nonMaxSuppressionWithScoreAsync(a,o,i,u,l,p);return[c.selectedIndices,c.selectedScores]}case"NonMaxSuppressionV4":{const{boxes:a,scores:o,maxOutputSize:i,iouThreshold:u,scoreThreshold:l}=Ar(t,e,n),p=h("padToMaxOutputSize",t,e,n),c=await s.image.nonMaxSuppressionPaddedAsync(a,o,i,u,l,p);return[c.selectedIndices,c.validOutputs]}case"NonMaxSuppressionV3":case"NonMaxSuppressionV2":{const{boxes:a,scores:o,maxOutputSize:i,iouThreshold:u,scoreThreshold:l}=Ar(t,e,n);return[await s.image.nonMaxSuppressionAsync(a,o,i,u,l)]}case"Where":{const a=s.cast(h("condition",t,e,n),"bool"),o=[await s.whereAsync(a)];return a.dispose(),o}case"ListDiff":return s.setdiff1dAsync(h("x",t,e,n),h("y",t,e,n));default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vT=(t,e,n,r=ie)=>{switch(t.op){case"LowerBound":{const s=h("sortedSequence",t,e,n),a=h("values",t,e,n);return[r.lowerBound(s,a)]}case"TopKV2":{const s=h("x",t,e,n),a=h("k",t,e,n),o=h("sorted",t,e,n),i=r.topk(s,a,o);return[i.values,i.indices]}case"UpperBound":{const s=h("sortedSequence",t,e,n),a=h("values",t,e,n);return[r.upperBound(s,a)]}case"Unique":{const s=h("x",t,e,n),a=r.unique(s);return[a.values,a.indices]}case"UniqueV2":{const s=h("x",t,e,n),a=h("axis",t,e,n),o=r.unique(s,a);return[o.values,o.indices]}default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $T=(t,e,n,r=ie)=>{switch(t.op){case"Const":return e[t.name];case"PlaceholderWithDefault":const s=h("default",t,e,n);return[oe(t.name,e,n)||s];case"Placeholder":return[oe(t.name,e,n)];case"Identity":case"StopGradient":case"FakeQuantWithMinMaxVars":{const p=h("x",t,e,n);return[He(p)]}case"IdentityN":return h("x",t,e,n).map(p=>He(p));case"Snapshot":const a=h("x",t,e,n);return[He(a)];case"Shape":return[r.tensor1d(h("x",t,e,n).shape,"int32")];case"ShapeN":return h("x",t,e,n).map(p=>r.tensor1d(p.shape));case"Size":return[r.scalar(h("x",t,e,n).size,"int32")];case"Rank":return[r.scalar(h("x",t,e,n).rank,"int32")];case"NoOp":return[r.scalar(1)];case"Print":const o=h("x",t,e,n),i=h("data",t,e,n),u=h("message",t,e,n),l=h("summarize",t,e,n);console.warn("The graph has a tf.print() operation,usually used for debugging, which slows down performance."),console.log(u);for(let p=0;p<i.length;p++)console.log(Array.prototype.slice.call(i[p].dataSync()).slice(0,l));return[o];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class kT{get id(){return this.handle.id}constructor(e,n){this.keyDType=e,this.valueDType=n,this.handle=z(0),this.tensorMap=new Map,Oe(this.handle)}clearAndClose(){this.tensorMap.forEach(e=>e.dispose()),this.tensorMap.clear(),this.handle.dispose()}size(){return this.tensorMap.size}tensorSize(){return z(this.size(),"int32")}async import(e,n){this.checkKeyAndValueTensor(e,n);const r=await e.data();return this.tensorMap.forEach(s=>s.dispose()),this.tensorMap.clear(),M(()=>{const s=dt(n),a=r.length,o=s.length;g(a===o,()=>`The number of elements doesn't match, keys has ${a} elements, the values has ${o} elements.`);for(let i=0;i<a;i++){const u=r[i],l=s[i];Oe(l),this.tensorMap.set(u,l)}return this.handle})}async find(e,n){this.checkKeyAndValueTensor(e,n);const r=await e.data();return M(()=>{const s=[];for(let a=0;a<r.length;a++){const o=r[a],i=this.findWithDefault(o,n);s.push(i)}return qe(s)})}findWithDefault(e,n){const r=this.tensorMap.get(e);return r??n}checkKeyAndValueTensor(e,n){if(e.dtype!==this.keyDType)throw new Error(`Expect key dtype ${this.keyDType}, but got ${e.dtype}`);if(n.dtype!==this.valueDType)throw new Error(`Expect value dtype ${this.valueDType}, but got ${n.dtype}`)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _T=async(t,e,n,r)=>{switch(t.op){case"HashTable":case"HashTableV2":{const s=r.getHashTableHandleByName(t.name);if(s!=null)return[s];{const a=h("keyDType",t,e,n),o=h("valueDType",t,e,n),i=new kT(a,o);return r.addHashTable(t.name,i),[i.handle]}}case"InitializeTable":case"InitializeTableV2":case"LookupTableImport":case"LookupTableImportV2":{const s=h("tableHandle",t,e,n,r),a=h("keys",t,e,n),o=h("values",t,e,n);return[await r.getHashTableById(s.id).import(a,o)]}case"LookupTableFind":case"LookupTableFindV2":{const s=h("tableHandle",t,e,n,r),a=h("keys",t,e,n),o=h("defaultValue",t,e,n);return[await r.getHashTableById(s.id).find(a,o)]}case"LookupTableSize":case"LookupTableSizeV2":{const s=h("tableHandle",t,e,n,r);return[r.getHashTableById(s.id).tensorSize()]}default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const xT=(t,e,n,r=ie)=>{switch(t.op){case"ResizeBilinear":{const s=h("images",t,e,n),a=h("size",t,e,n),o=h("alignCorners",t,e,n),i=h("halfPixelCenters",t,e,n);return[r.image.resizeBilinear(s,[a[0],a[1]],o,i)]}case"ResizeNearestNeighbor":{const s=h("images",t,e,n),a=h("size",t,e,n),o=h("alignCorners",t,e,n),i=h("halfPixelCenters",t,e,n);return[r.image.resizeNearestNeighbor(s,[a[0],a[1]],o,i)]}case"CropAndResize":{const s=h("image",t,e,n),a=h("boxes",t,e,n),o=h("boxInd",t,e,n),i=h("cropSize",t,e,n),u=h("method",t,e,n),l=h("extrapolationValue",t,e,n);return[r.image.cropAndResize(s,a,o,i,u,l)]}case"ImageProjectiveTransformV3":{const s=h("images",t,e,n),a=h("transforms",t,e,n),o=h("outputShape",t,e,n),i=h("fillValue",t,e,n),u=h("interpolation",t,e,n),l=h("fillMode",t,e,n);return[r.image.transform(s,a,u.toLowerCase(),l.toLowerCase(),i,o)]}default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const IT=(t,e,n,r=ie)=>{switch(t.op){case"Equal":return[r.equal(h("a",t,e,n),h("b",t,e,n))];case"NotEqual":return[r.notEqual(h("a",t,e,n),h("b",t,e,n))];case"Greater":return[r.greater(h("a",t,e,n),h("b",t,e,n))];case"GreaterEqual":return[r.greaterEqual(h("a",t,e,n),h("b",t,e,n))];case"Less":return[r.less(h("a",t,e,n),h("b",t,e,n))];case"LessEqual":return[r.lessEqual(h("a",t,e,n),h("b",t,e,n))];case"LogicalAnd":return[r.logicalAnd(h("a",t,e,n),h("b",t,e,n))];case"LogicalNot":return[r.logicalNot(h("a",t,e,n))];case"LogicalOr":return[r.logicalOr(h("a",t,e,n),h("b",t,e,n))];case"Select":case"SelectV2":return[r.where(h("condition",t,e,n),h("a",t,e,n),h("b",t,e,n))];case"BitwiseAnd":return[r.bitwiseAnd(h("a",t,e,n),h("b",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const AT=(t,e,n,r=ie)=>{switch(t.op){case"BatchMatMul":case"BatchMatMulV2":case"MatMul":return[r.matMul(h("a",t,e,n),h("b",t,e,n),h("transposeA",t,e,n),h("transposeB",t,e,n))];case"Einsum":return[r.einsum(h("equation",t,e,n),...h("tensors",t,e,n))];case"Transpose":return[r.transpose(h("x",t,e,n),h("perm",t,e,n))];case"_FusedMatMul":const[s,a]=h("fusedOps",t,e,n),o=s==="biasadd",i=a==="prelu",u=h("numArgs",t,e,n),l=h("leakyreluAlpha",t,e,n);if(o){if(i&&u!==2)throw new Error("Fused MatMul with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&u!==1)throw new Error("Fused MatMul with BiasAdd must have one extra argument: bias.")}const[p,c]=h("args",t,e,n);return[r.fused.matMul({a:h("a",t,e,n),b:h("b",t,e,n),transposeA:h("transposeA",t,e,n),transposeB:h("transposeB",t,e,n),bias:p,activation:a,preluActivationWeights:c,leakyreluAlpha:l})];case"MatrixBandPart":return[r.linalg.bandPart(h("a",t,e,n),h("numLower",t,e,n),h("numUpper",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const DT=(t,e,n,r=ie)=>{switch(t.op){case"EuclideanNorm":return[r.euclideanNorm(h("x",t,e,n),h("axis",t,e,n),h("keepDims",t,e,n))];case"FusedBatchNorm":case"FusedBatchNormV2":return[r.batchNorm(h("x",t,e,n),h("mean",t,e,n),h("variance",t,e,n),h("offset",t,e,n),h("scale",t,e,n),h("epsilon",t,e,n))];case"FusedBatchNormV3":return[r.batchNorm(h("x",t,e,n),h("mean",t,e,n),h("variance",t,e,n),h("offset",t,e,n),h("scale",t,e,n),h("epsilon",t,e,n))];case"LRN":return[r.localResponseNormalization(h("x",t,e,n),h("radius",t,e,n),h("bias",t,e,n),h("alpha",t,e,n),h("beta",t,e,n))];case"Softmax":return[r.softmax(h("x",t,e,n))];case"LogSoftmax":return[r.logSoftmax(h("x",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const OT=(t,e,n,r=ie)=>{switch(t.op){case"RaggedGather":{const{outputNestedSplits:s,outputDenseValues:a}=r.raggedGather(h("paramsNestedSplits",t,e,n),h("paramsDenseValues",t,e,n),h("indices",t,e,n),h("outputRaggedRank",t,e,n));return s.concat(a)}case"RaggedRange":{const{rtNestedSplits:s,rtDenseValues:a}=r.raggedRange(h("starts",t,e,n),h("limits",t,e,n),h("splits",t,e,n));return[s,a]}case"RaggedTensorToTensor":return[r.raggedTensorToTensor(h("shape",t,e,n),h("values",t,e,n),h("defaultValue",t,e,n),h("rowPartitionTensors",t,e,n),h("rowPartitionTypes",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const FT=(t,e,n,r=ie)=>{switch(t.op){case"Max":{const i=h("axis",t,e,n),u=h("keepDims",t,e,n);return[r.max(h("x",t,e,n),i,u)]}case"Mean":{const i=h("axis",t,e,n),u=h("keepDims",t,e,n);return[r.mean(h("x",t,e,n),i,u)]}case"Min":{const i=h("axis",t,e,n),u=h("keepDims",t,e,n);return[r.min(h("x",t,e,n),i,u)]}case"Sum":{const i=h("axis",t,e,n),u=h("keepDims",t,e,n);return[r.sum(h("x",t,e,n),i,u)]}case"All":{const i=h("axis",t,e,n),u=h("keepDims",t,e,n);return[r.all(h("x",t,e,n),i,u)]}case"Any":{const i=h("axis",t,e,n),u=h("keepDims",t,e,n);return[r.any(h("x",t,e,n),i,u)]}case"ArgMax":{const i=h("axis",t,e,n);return[r.argMax(h("x",t,e,n),i)]}case"ArgMin":{const i=h("axis",t,e,n);return[r.argMin(h("x",t,e,n),i)]}case"Prod":{const i=h("axis",t,e,n),u=h("keepDims",t,e,n);return[r.prod(h("x",t,e,n),i,u)]}case"Cumprod":{const i=h("axis",t,e,n),u=h("exclusive",t,e,n),l=h("reverse",t,e,n);return[r.cumprod(h("x",t,e,n),i,u,l)]}case"Cumsum":{const i=h("axis",t,e,n),u=h("exclusive",t,e,n),l=h("reverse",t,e,n);return[r.cumsum(h("x",t,e,n),i,u,l)]}case"Bincount":const s=h("x",t,e,n),a=h("weights",t,e,n),o=h("size",t,e,n);return[r.bincount(s,a,o)];case"DenseBincount":{const i=h("x",t,e,n),u=h("weights",t,e,n),l=h("size",t,e,n),p=h("binaryOutput",t,e,n);return[r.denseBincount(i,u,l,p)]}default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const RT=(t,e,n,r=ie)=>{switch(t.op){case"ConcatV2":case"Concat":{const s=h("n",t,e,n),a=h("axis",t,e,n);let o=h("tensors",t,e,n);return o=o.slice(0,s),[r.concat(o,a)]}case"Gather":{const s=h("x",t,e,n),a=h("indices",t,e,n);return[r.gather(s,r.cast(a,"int32"),0)]}case"GatherV2":{const s=h("axis",t,e,n),a=h("batchDims",t,e,n),o=h("x",t,e,n),i=h("indices",t,e,n);return[r.gather(o,r.cast(i,"int32"),s,a)]}case"Reverse":{const s=h("dims",t,e,n),a=[];for(let i=0;i<s.length;i++)s[i]&&a.push(i);const o=h("x",t,e,n);return[r.reverse(o,a)]}case"ReverseV2":{const s=h("axis",t,e,n),a=h("x",t,e,n);return[r.reverse(a,s)]}case"Slice":{const s=h("begin",t,e,n),a=h("size",t,e,n);return[r.slice(h("x",t,e,n),s,a)]}case"StridedSlice":{const s=h("begin",t,e,n),a=h("end",t,e,n),o=h("strides",t,e,n),i=h("beginMask",t,e,n),u=h("endMask",t,e,n),l=h("ellipsisMask",t,e,n),p=h("newAxisMask",t,e,n),c=h("shrinkAxisMask",t,e,n),f=h("x",t,e,n);return[r.stridedSlice(f,s,a,o,i,u,l,p,c)]}case"Pack":return M(()=>{const s=h("axis",t,e,n),a=h("tensors",t,e,n),o=a[0].shape,i=r.squeeze(a[0]).shape,u=a.map(l=>{const p=Ce(l.shape,o);if(!p&&!Ce(r.squeeze(l).shape,i))throw new Error("the input tensors shape does not match");return p?l:r.reshape(l,o)});return[r.stack(u,s)]});case"Unpack":{const s=h("axis",t,e,n),a=h("tensor",t,e,n);return r.unstack(a,s)}case"Tile":{const s=h("reps",t,e,n);return[r.tile(h("x",t,e,n),s)]}case"Split":case"SplitV":{const s=h("axis",t,e,n),a=h("numOrSizeSplits",t,e,n),o=h("x",t,e,n);return r.split(o,a,s)}case"ScatterNd":{const s=h("indices",t,e,n),a=h("values",t,e,n),o=h("shape",t,e,n);return[r.scatterND(s,a,o)]}case"GatherNd":{const s=h("x",t,e,n),a=h("indices",t,e,n);return[r.gatherND(s,a)]}case"SparseToDense":{const s=h("sparseIndices",t,e,n),a=h("outputShape",t,e,n),o=h("sparseValues",t,e,n),i=h("defaultValue",t,e,n);return[r.sparseToDense(s,o,a,o.dtype===i.dtype?i:r.cast(i,o.dtype))]}case"TensorScatterUpdate":{const s=h("indices",t,e,n),a=h("values",t,e,n),o=h("tensor",t,e,n);return[r.tensorScatterUpdate(o,s,a)]}default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const CT=(t,e,n,r=ie)=>{switch(t.op){case"SparseFillEmptyRows":{const{outputIndices:s,outputValues:a,emptyRowIndicator:o,reverseIndexMap:i}=r.sparse.sparseFillEmptyRows(h("indices",t,e,n),h("values",t,e,n),h("denseShape",t,e,n),h("defaultValue",t,e,n));return[s,a,o,i]}case"SparseReshape":{const{outputIndices:s,outputShape:a}=r.sparse.sparseReshape(h("inputIndices",t,e,n),h("inputShape",t,e,n),h("newShape",t,e,n));return[s,a]}case"SparseSegmentMean":return[r.sparse.sparseSegmentMean(h("data",t,e,n),h("indices",t,e,n),h("segmentIds",t,e,n))];case"SparseSegmentSum":return[r.sparse.sparseSegmentSum(h("data",t,e,n),h("indices",t,e,n),h("segmentIds",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const BT=(t,e,n,r=ie)=>{switch(t.op){case"FFT":return[r.fft(h("x",t,e,n))];case"IFFT":return[r.ifft(h("x",t,e,n))];case"RFFT":return[r.rfft(h("x",t,e,n))];case"IRFFT":return[r.irfft(h("x",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const LT=(t,e,n,r=ie)=>{switch(t.op){case"StaticRegexReplace":return[r.string.staticRegexReplace(h("input",t,e,n),h("pattern",t,e,n),h("rewrite",t,e,n),h("replaceGlobal",t,e,n))];case"StringNGrams":{const{nGrams:s,nGramsSplits:a}=r.string.stringNGrams(h("data",t,e,n),h("dataSplits",t,e,n),h("separator",t,e,n),h("nGramWidths",t,e,n),h("leftPad",t,e,n),h("rightPad",t,e,n),h("padWidth",t,e,n),h("preserveShortSequences",t,e,n));return[s,a]}case"StringSplit":{const{indices:s,values:a,shape:o}=r.string.stringSplit(h("input",t,e,n),h("delimiter",t,e,n),h("skipEmpty",t,e,n));return[s,a,o]}case"StringToHashBucketFast":return[r.string.stringToHashBucketFast(h("input",t,e,n),h("numBuckets",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const PT=(t,e,n,r=ie)=>{switch(t.op){case"Cast":return[r.cast(h("x",t,e,n),h("dtype",t,e,n))];case"ExpandDims":{const s=h("axis",t,e,n);return[r.expandDims(h("x",t,e,n),s)]}case"Squeeze":{const s=h("axis",t,e,n);return[r.squeeze(h("x",t,e,n),s)]}case"Reshape":return[r.reshape(h("x",t,e,n),h("shape",t,e,n))];case"EnsureShape":return[r.ensureShape(h("x",t,e,n),h("shape",t,e,n))];case"MirrorPad":return[r.mirrorPad(h("x",t,e,n),h("padding",t,e,n),h("mode",t,e,n))];case"PadV2":case"Pad":return[r.pad(h("x",t,e,n),h("padding",t,e,n),h("constantValue",t,e,n))];case"SpaceToBatchND":{const s=h("blockShape",t,e,n),a=h("paddings",t,e,n);return[r.spaceToBatchND(h("x",t,e,n),s,a)]}case"BatchToSpaceND":{const s=h("blockShape",t,e,n),a=h("crops",t,e,n);return[r.batchToSpaceND(h("x",t,e,n),s,a)]}case"DepthToSpace":{const s=h("blockSize",t,e,n),a=h("dataFormat",t,e,n).toUpperCase();return[r.depthToSpace(h("x",t,e,n),s,a)]}case"BroadcastTo":return[r.broadcastTo(h("x",t,e,n),h("shape",t,e,n))];case"BroadcastArgs":return[r.broadcastArgs(h("s0",t,e,n),h("s1",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ao(t,e,n,r,s=M){const a=((o,i,u)=>{switch(o.category){case"arithmetic":return s(()=>fT(o,i,u));case"basic_math":return s(()=>dT(o,i,u));case"control":return NT(o,i,u);case"convolution":return s(()=>ST(o,i,u));case"creation":return s(()=>TT(o,i,u));case"dynamic":return ET(o,i,u);case"evaluation":return s(()=>vT(o,i,u));case"image":return s(()=>xT(o,i,u));case"graph":return s(()=>$T(o,i,u));case"logical":return s(()=>IT(o,i,u));case"matrices":return s(()=>AT(o,i,u));case"normalization":return s(()=>DT(o,i,u));case"ragged":return s(()=>OT(o,i,u));case"reduction":return s(()=>FT(o,i,u));case"slice_join":return s(()=>RT(o,i,u));case"sparse":return s(()=>CT(o,i,u));case"spectral":return s(()=>BT(o,i,u));case"string":return s(()=>LT(o,i,u));case"transformation":return s(()=>PT(o,i,u));case"hash_table":return _T(o,i,u,r);case"custom":const l=zh(o.op);if(l&&l.customExecutor)return l.customExecutor(new hT(o,i,u));throw TypeError(`Custom op ${o.op} is not registered.`);default:throw TypeError(`Unknown op '${o.op}'. File an issue at https://github.com/tensorflow/tfjs/issues so we can add it, or register a custom execution with tf.registerOp()`)}})(t,e,n);return it(a)?a.then(o=>[].concat(o)):[].concat(a)}class oo{constructor(e={},n={},r={},s={},a){this.weightMap=e,this.tensorArrayMap=n,this.tensorListMap=r,this.functionMap=s,this.parseNodeNameCache=a,this.rootContext={id:0,frameName:"",iterationId:0},this.contexts=[this.rootContext],this.lastId=0,this.generateCurrentContextIds()}newFrame(e,n){return{id:e,frameName:n,iterationId:0}}set currentContext(e){this.contexts!==e&&(this.contexts=e,this.generateCurrentContextIds())}get currentContext(){return this.contexts}get currentContextId(){return this._currentContextIds[0]}get currentContextIds(){return this._currentContextIds}generateCurrentContextIds(){const e=[];for(let n=0;n<this.contexts.length-1;n++){const r=this.contexts.slice(0,this.contexts.length-n);e.push(this.contextIdforContexts(r))}e.push(""),this._currentContextIds=e}contextIdforContexts(e){return e?e.map(n=>n.id===0&&n.iterationId===0?"":`${n.frameName}-${n.iterationId}`).join("/"):""}enterFrame(e){this.contexts&&(this.lastId++,this.contexts=this.contexts.slice(),this.contexts.push(this.newFrame(this.lastId,e)),this._currentContextIds.unshift(this.contextIdforContexts(this.contexts)))}exitFrame(){if(this.contexts&&this.contexts.length>1)this.contexts=this.contexts.slice(),this.contexts.splice(-1),this.currentContextIds.shift();else throw new Error("Cannot exit frame, the context is empty")}nextIteration(){if(this.contexts&&this.contexts.length>0){this.contexts=this.contexts.slice(),this.lastId++;const e=Object.assign({},this.contexts[this.contexts.length-1]);e.iterationId+=1,e.id=this.lastId,this.contexts.splice(-1,1,e),this._currentContextIds.splice(0,1,this.contextIdforContexts(this.contexts))}else throw new Error("Cannot increase frame iteration, the context is empty")}getWeight(e){return this.weightMap[e]}addTensorArray(e){this.tensorArrayMap[e.id]=e}getTensorArray(e){return this.tensorArrayMap[e]}addTensorList(e){this.tensorListMap[e.id]=e}getTensorList(e){return this.tensorListMap[e]}dispose(e){for(const n in this.tensorArrayMap)this.tensorArrayMap[n].clearAndClose(e);for(const n in this.tensorListMap)this.tensorListMap[n].clearAndClose(e)}}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function io(t,e,n,r){const s=new Set,a=[];let o=null,i=null;const u=new Set,l=new Set(Object.keys(t).map(f=>ye(f)[0]));r=r||[];const p=new Set(r.map(f=>ye(f.name)[0])),c=[...e];for(;c.length>0;){const f=c.pop();if((Nt(f)||jT(f)||HT(f))&&o==null&&(o=f,i=o.children.map(d=>d.name).filter(d=>s.has(d))),s.add(f.name),n[f.name]==null&&!l.has(f.name)&&!p.has(f.name)){if(f.inputs.length===0){a.push(f.name);continue}f.inputs.forEach(d=>{u.has(d.name)||(u.add(d.name),c.push(d))})}}return{inputs:t,outputs:e,usedNodes:s,missingInputs:a,dynamicNode:o,syncInputs:i}}function zT(t,e){const{usedNodes:n,inputs:r}=e,s=Object.keys(r).map(b=>ye(b)[0]).map(b=>t.nodes[b]),a=t.initNodes||[],o=b=>n.has(typeof b=="string"?b:b.name);function i(b){return[...new Map(b.map(T=>[T.name,T])).values()]}const u=i([...s,...t.weights,...a]).filter(o),l=i([...u,...Object.values(t.nodes)]).filter(o),p=new Map(l.map(b=>[b.name,b])),c={};for(const b of l){c[b.name]=c[b.name]||0;for(const T of b.children)o(T)||(c[T.name]=Number.POSITIVE_INFINITY),c[T.name]=(c[T.name]||0)+1}const f=Object.entries(c).filter(([,b])=>b===0).map(([b])=>b),d=[...f];for(;f.length>0;){const b=f.pop(),T=p.get(b);for(const A of T.children.filter(o))--c[A.name]===0&&(d.push(A.name),f.push(A.name))}const y=d.map(b=>p.get(b)),S=VT(y,u);return MT(S,u),S}function VT(t,e){const n=new Map(t.map(o=>[o.name,o])),r=e.map(o=>o.name),s=new Set(r);for(;r.length>0;){const o=r.pop(),i=n.get(o);for(const u of i.children)!n.has(u.name)||s.has(u.name)||(s.add(u.name),r.push(u.name))}return t.filter(o=>s.has(o.name))}class Vn extends Error{constructor(e){super(`NodesExecutionOrderError: ${e}`)}}function MT(t,e){const n=new Map(t.map((i,u)=>[i.name,u])),r=new Set(e.map(i=>i.name)),s=i=>r.has(typeof i=="string"?i:i.name),a=new Set(t.map(i=>i.name)),o=i=>a.has(typeof i=="string"?i:i.name);for(const i of t){for(const u of i.children.filter(o)){if(!n.has(u.name))throw new Vn(`Child ${u.name} of node ${i.name} is unreachable.`);if(n.get(i.name)>n.get(u.name))throw new Vn(`Node ${i.name} is scheduled to run after its child ${u.name}.`)}if(!s(i))for(const u of i.inputs){if(!n.has(u.name))throw new Vn(`Input ${u.name} of node ${i.name} is unreachable.`);if(n.get(u.name)>n.get(i.name))throw new Vn(`Node ${i.name} is scheduled to run before its input ${u.name}.`)}}}function WT(t){const e=new Map(t.map((i,u)=>[i.name,u])),n=Number.MAX_SAFE_INTEGER,r=t.map((i,u)=>Nt(i)?n:u),s=i=>{const u=r[e.get(i.name)];return u??-1},a=t.map((i,u)=>i.children.map(s).reduce((l,p)=>Math.max(l,p),r[u])),o=new Map;for(let i=0;i<t.length;++i){const u=a[i];if(u===n)continue;const l=t[i],p=t[u];o.has(p.name)||o.set(p.name,[]),o.get(p.name).push(l)}return o}const qT=new Set(["Switch","Merge","Enter","Exit","NextIteration","StatelessIf","StatelessWhile","if","While"]),UT=new Set(["NonMaxSuppressionV2","NonMaxSuppressionV3","NonMaxSuppressionV5","Where"]),GT=new Set(["HashTable","HashTableV2","LookupTableImport","LookupTableImportV2","LookupTableFind","LookupTableFindV2","LookupTableSize","LookupTableSizeV2"]);function Nt(t){return qT.has(t.op)}function jT(t){return UT.has(t.op)}function HT(t){return GT.has(t.op)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ar{get weightIds(){return this.parent?this.parent.weightIds:this._weightIds}get functionExecutorMap(){return this.parent?this.parent.functionExecutorMap:this._functionExecutorMap}get weightMap(){return this.parent?this.parent.weightMap:this._weightMap}set weightMap(e){const n=Object.keys(e).map(r=>e[r].map(s=>s.id));this._weightIds=[].concat(...n),this._weightMap=e}set resourceManager(e){this._resourceManager=e}get inputs(){return this._inputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get outputs(){return this._outputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get inputNodes(){return this._inputs.map(e=>e.signatureKey||e.name)}get outputNodes(){return this._outputs.map(e=>{const n=e.signatureKey||e.name;return e.defaultOutput?`${n}:${e.defaultOutput}`:n})}get functions(){return Object.keys(this._functions).reduce((e,n)=>(e[n]=this._functions[n].signature,e),{})}constructor(e,n){this.graph=e,this.parent=n,this.compiledMap=new Map,this.parseNodeNameCache=new Map,this._weightMap={},this.SEPARATOR=",",this._functions={},this._functionExecutorMap={},this.keepIntermediateTensors=!1,this._outputs=e.outputs,this._inputs=e.inputs,this._initNodes=e.initNodes,this._signature=e.signature,this._functions=e.functions,e.functions!=null&&Object.keys(e.functions).forEach(r=>{this._functionExecutorMap[r]=new ar(e.functions[r],this)})}getCompilationKey(e,n){const r=e.map(a=>a.name).sort(),s=n.map(a=>a.name).sort();return r.join(this.SEPARATOR)+"--"+s.join(this.SEPARATOR)}compile(e,n){const r=io(e,n,this.weightMap,this._initNodes),{missingInputs:s,dynamicNode:a,syncInputs:o}=r;if(a!=null)throw new Error(`This execution contains the node '${a.name}', which has the dynamic op '${a.op}'. Please use model.executeAsync() instead. Alternatively, to avoid the dynamic ops, specify the inputs [${o}]`);if(s.length>0){const l=n.map(c=>c.name),p=Object.keys(e);throw new Error(`Cannot compute the outputs [${l}] from the provided inputs [${p}]. Missing the following inputs: [${s}]`)}const i=zT(this.graph,r),u=WT(i);return{orderedNodes:i,nodeLiveUntilMap:u}}cloneAndKeepTensor(e){if(e==null)return null;const n=e.clone();return Oe(n),n}cloneTensorList(e){return e?e.map(r=>this.cloneAndKeepTensor(r)):null}cloneTensorMap(e){return Object.fromEntries(Object.entries(e).map(([n,r])=>[n,this.cloneTensorList(r)]))}execute(e,n){this.disposeIntermediateTensors(),e=this.mapInputs(e);const r=Object.keys(e).sort();this.checkInputs(e),this.checkInputShapeAndType(e),n=this.mapOutputs(n),this.checkOutputs(n);const s=r.map(f=>this.graph.nodes[ye(f)[0]]),a=n.map(f=>ye(f)[0]),o=new Set(a);let i=a.map(f=>this.graph.nodes[f]);i.length===0&&(i=this._outputs);const u=this.getCompilationKey(s,i);let l=this.compiledMap.get(u);l==null&&(l=this.compile(e,i),this.compiledMap.set(u,l));try{this.keepIntermediateTensors=C().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(f){this.keepIntermediateTensors=!1,console.warn(f.message)}const p={},c={};return M(()=>{const f=new oo(this.weightMap,p,c,this.functionExecutorMap,this.parseNodeNameCache),d=Object.assign({},this.weightMap);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap)),Object.keys(e).forEach(T=>{const[A,E]=ye(T,f),v=[];v[E]=e[T],d[A]=v,this.keepIntermediateTensors&&(this.clonedTensorsMap[A]=this.cloneTensorList(v))});const y=this.getFrozenTensorIds(d),{orderedNodes:S,nodeLiveUntilMap:b}=l;for(const T of S){if(d[T.name])continue;const A=ao(T,d,f,this._resourceManager);if(it(A))throw new Error(`The execution of the op '${T.op}' returned a promise. Please use model.executeAsync() instead.`);d[T.name]=A,this.keepIntermediateTensors&&(this.clonedTensorsMap[T.name]=this.cloneTensorList(A)),this.checkTensorForDisposalWithNodeLiveUntilInfo(T,d,f,y,o,b.get(T.name))}return this.parent==null&&f.dispose(y),n.map(T=>oe(T,d,f))})}getFrozenTensorIds(e){const n=[].concat.apply([],Object.keys(e).map(r=>e[r]).map(r=>r.map(s=>s.id)));return new Set(n)}checkTensorForDisposal(e,n,r,s,a,o,i){if(!(Nt(n)||o.has(e))){for(const u of r[e])u!=null&&(i[u.id]=(i[u.id]||0)+n.children.length);for(const u of n.inputs){if(Nt(u))continue;const l=eo(u.name,r,s);if(l!=null)for(const p of l){if(!p||p.kept||a.has(p.id))continue;const c=i[p.id];c===1?(p.dispose(),delete i[p.id]):c!=null&&i[p.id]--}}}}checkTensorForDisposalWithNodeLiveUntilInfo(e,n,r,s,a,o){function i(u){return Nt(u)||a.has(u.name)}if(!(Nt(e)||o==null))for(const u of o){if(i(u))continue;const l=eo(u.name,n,r);for(const p of l)!p||p.kept||s.has(p.id)||p.dispose()}}async executeAsync(e,n){return this._executeAsync(e,n)}disposeIntermediateTensors(){this.clonedTensorsMap&&(Object.values(this.clonedTensorsMap).forEach(e=>{for(const n of e)n&&!n.isDisposed&&n.dispose()}),this.clonedTensorsMap=null)}getIntermediateTensors(){return this.clonedTensorsMap}async _executeAsync(e,n,r=!1,s={},a={}){this.disposeIntermediateTensors(),r||(e=this.mapInputs(e),this.checkInputs(e),this.checkInputShapeAndType(e),n=this.mapOutputs(n),this.checkOutputs(n));try{this.keepIntermediateTensors=C().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(f){this.keepIntermediateTensors=!1,console.warn(f.message)}const o=new oo(this.weightMap,s,a,this.functionExecutorMap,this.parseNodeNameCache);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap));const i=await this.executeWithControlFlow(e,o,n,r),u=n.map(f=>oe(f,i,o)),l=u.map(f=>f.id),p=Object.keys(e).map(f=>e[f].id),c=new Set([...l,...p,...this.weightIds]);return Object.values(i).forEach(f=>{f.forEach(d=>{d&&!d.isDisposed&&!c.has(d.id)&&d.dispose()})}),this.parent==null&&o.dispose(c),u}async executeFunctionAsync(e,n,r){const s=e.reduce((a,o,i)=>(a[this.inputs[i].name]=o,a),{});return this._executeAsync(s,this.outputNodes,!0,n,r)}async executeWithControlFlow(e,n,r,s){const a=Object.keys(e),o=a.map(v=>this.graph.nodes[ye(v)[0]]),i=r.map(v=>ye(v)[0]),u=new Set(i);let l=i.map(v=>this.graph.nodes[v]);l.length===0&&(l=this._outputs);const{usedNodes:p,missingInputs:c,dynamicNode:f,syncInputs:d}=io(e,l,this.weightMap,this._initNodes),y=[...o,...this.graph.weights,...this._initNodes||[]].map(v=>({node:v,contexts:n.currentContext})),S=Object.assign({},this.weightMap);Object.keys(e).forEach(v=>{const[k,_]=ye(v),D=[];D[_]=e[v],S[k]=D});const b={},T=this.getFrozenTensorIds(S),A={};for(;y.length>0;){const v=this.processStack(o,y,n,S,A,T,u,b,p);await Promise.all(v)}f==null&&!s&&console.warn("This model execution did not contain any nodes with control flow or dynamic output shapes. You can use model.execute() instead.");const E=l.filter(v=>!Nt(v)&&!oe(v.name,S,n)).map(v=>v.name);if(E.length>0){let v="";throw f!=null&&(v=`Alternatively, to avoid the dynamic ops, use model.execute() and specify the inputs [${d}]`),new Error(`Cannot compute the outputs [${E}] from the provided inputs [${a}]. Consider providing the following inputs: [${c}]. ${v}`)}return S}processStack(e,n,r,s,a,o,i,u,l){const p=[];for(;n.length>0;){const c=n.pop();r.currentContext=c.contexts;let f="";if(c.node.op==="Enter"&&h("isConstant",c.node,s,r)&&([f]=je(c.node.name,r)),s[c.node.name]==null){const d=ao(c.node,s,r,this._resourceManager);f||([f]=je(c.node.name,r));const y=r.currentContext;it(d)?p.push(d.then(S=>(s[f]=S,this.keepIntermediateTensors&&(this.clonedTensorsMap[f]=this.cloneTensorList(S)),r.currentContext=y,this.checkTensorForDisposal(f,c.node,s,r,o,i,u),this.processChildNodes(c.node,n,r,s,a,l),S))):(s[f]=d,this.keepIntermediateTensors&&(this.clonedTensorsMap[f]=this.cloneTensorList(d)),this.checkTensorForDisposal(f,c.node,s,r,o,i,u),this.processChildNodes(c.node,n,r,s,a,l))}else this.processChildNodes(c.node,n,r,s,a,l)}return p}processChildNodes(e,n,r,s,a,o){e.children.forEach(i=>{const[u]=je(i.name,r);a[u]||!o.has(i.name)||(i.op==="Merge"?i.inputNames.some(l=>!!oe(l,s,r))&&(a[u]=!0,n.push({contexts:r.currentContext,node:i})):i.inputNames.every(l=>!!oe(l,s,r))&&(a[u]=!0,n.push({contexts:r.currentContext,node:i})))})}dispose(){Object.keys(this.weightMap).forEach(e=>this.weightMap[e].forEach(n=>n.dispose()))}checkInputShapeAndType(e){Object.keys(e).forEach(n=>{const r=e[n],[s]=ye(n),a=this.graph.nodes[s];if(a.attrParams.shape&&a.attrParams.shape.value){const o=a.attrParams.shape.value,i=o.length===r.shape.length&&r.shape.every((u,l)=>o[l]===-1||o[l]===u);g(i,()=>`The shape of dict['${a.name}'] provided in model.execute(dict) must be [${o}], but was [${r.shape}]`)}a.attrParams.dtype&&a.attrParams.dtype.value&&g(r.dtype===a.attrParams.dtype.value,()=>`The dtype of dict['${a.name}'] provided in model.execute(dict) must be ${a.attrParams.dtype.value}, but was ${r.dtype}`)})}mapInputs(e){var n,r;const s={};for(const a in e){const o=(r=(n=this._signature)===null||n===void 0?void 0:n.inputs)===null||r===void 0?void 0:r[a];o!=null?s[o.name]=e[a]:s[a]=e[a]}return s}checkInputs(e){const n=Object.keys(e).filter(r=>{const[s]=ye(r);return this.graph.nodes[s]==null});if(n.length>0)throw new Error(`The dict provided in model.execute(dict) has keys: [${n}] that are not part of graph`)}mapOutputs(e){return e.map(n=>{var r,s;const a=(s=(r=this._signature)===null||r===void 0?void 0:r.outputs)===null||s===void 0?void 0:s[n];return a!=null?a.name:n},{})}checkOutputs(e){e.forEach(n=>{const[r]=ye(n);if(!this.graph.nodes[r])throw new Error(`The output '${n}' is not found in the graph`)})}}class KT{constructor(e={},n={}){this.hashTableNameToHandle=e,this.hashTableMap=n}addHashTable(e,n){this.hashTableNameToHandle[e]=n.handle,this.hashTableMap[n.id]=n}getHashTableHandleByName(e){return this.hashTableNameToHandle[e]}getHashTableById(e){return this.hashTableMap[e]}dispose(){for(const e in this.hashTableMap)this.hashTableMap[e].clearAndClose(),delete this.hashTableMap[e];for(const e in this.hashTableNameToHandle)this.hashTableNameToHandle[e].dispose(),delete this.hashTableNameToHandle[e]}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const XT="?tfjs-format=file",ZT="model.json";class Da{get modelVersion(){return this.version}get inputNodes(){return this.executor.inputNodes}get outputNodes(){return this.executor.outputNodes}get inputs(){return this.executor.inputs}get outputs(){return this.executor.outputs}get weights(){return this.executor.weightMap}get metadata(){return this.artifacts.userDefinedMetadata}get modelSignature(){return this.signature}get modelStructuredOutputKeys(){return this.structuredOutputKeys}constructor(e,n={},r=_a){this.modelUrl=e,this.loadOptions=n,this.version="n/a",this.io=r,n==null&&(this.loadOptions={}),this.resourceManager=new KT}findIOHandler(){const e=this.modelUrl;if(e.load!=null)this.handler=e;else if(this.loadOptions.requestInit!=null)this.handler=this.io.browserHTTPRequest(e,this.loadOptions);else{const n=this.io.getLoadHandlers(e,this.loadOptions);if(n.length===0)n.push(this.io.browserHTTPRequest(e,this.loadOptions));else if(n.length>1)throw new Error(`Found more than one (${n.length}) load handlers for URL '${[e]}'`);this.handler=n[0]}}load(){if(this.findIOHandler(),this.handler.load==null)throw new Error("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");const e=this.handler.load();return it(e)?e.then(n=>n.getWeightStream==null?this.loadSync(n):this.loadStreaming(n)):this.loadSync(e)}loadSync(e){const n=this.io.decodeWeights(e.weightData,e.weightSpecs);return this.loadWithWeightMap(e,n)}async loadStreaming(e){if(e.getWeightStream==null)throw new Error("Model artifacts missing streamWeights function");const n=await Bl(e.getWeightStream(),e.weightSpecs);return this.loadWithWeightMap(e,n)}loadWithWeightMap(e,n){this.artifacts=e;const r=this.artifacts.modelTopology;let s=this.artifacts.signature;if(this.artifacts.userDefinedMetadata!=null){const a=this.artifacts.userDefinedMetadata;a.signature!=null&&(s=a.signature),a.structuredOutputKeys!=null&&(this.structuredOutputKeys=a.structuredOutputKeys)}if(this.signature=s,this.version=`${r.versions.producer}.${r.versions.minConsumer}`,this.executor=new ar(to.Instance.transformGraph(r,this.signature)),this.executor.weightMap=this.convertTensorMapToTensorsMap(n),this.executor.resourceManager=this.resourceManager,e.modelInitializer!=null&&e.modelInitializer.node!=null){const a=to.Instance.transformGraph(e.modelInitializer);this.initializer=new ar(a),this.initializer.weightMap=this.executor.weightMap,this.initializer.resourceManager=this.resourceManager,this.initializerSignature=e.initializerSignature}return!0}async save(e,n){if(typeof e=="string"){const r=this.io.getSaveHandlers(e);if(r.length===0)throw new Error(`Cannot find any save handlers for URL '${e}'`);if(r.length>1)throw new Error(`Found more than one (${r.length}) save handlers for URL '${e}'`);e=r[0]}if(e.save==null)throw new Error("GraphModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");return e.save(this.artifacts)}addStructuredOutputNames(e){if(this.structuredOutputKeys){const n=e instanceof te?[e]:e,r={};return n.forEach((s,a)=>r[this.structuredOutputKeys[a]]=s),r}return e}predict(e,n){const r=this.execute(e,this.outputNodes);return this.addStructuredOutputNames(r)}async predictAsync(e,n){const r=await this.executeAsync(e,this.outputNodes);return this.addStructuredOutputNames(r)}normalizeInputs(e){var n;if(!(e instanceof te)&&!Array.isArray(e)){const a=(n=this.signature)===null||n===void 0?void 0:n.inputs;if(a!=null)for(const o in a){const i=a[o];i.resourceId!=null&&(e[o]=this.resourceIdToCapturedInput[i.resourceId])}return e}e=Array.isArray(e)?e:[e];const r=Object.keys(this.resourceIdToCapturedInput).length;if(e.length+r!==this.inputNodes.length)throw new Error(`Input tensor count mismatch, the graph model has ${this.inputNodes.length-r} non-resource placeholders, while there are ${e.length} input tensors provided.`);let s=0;return this.inputNodes.reduce((a,o)=>{var i,u,l;const p=(l=(u=(i=this.signature)===null||i===void 0?void 0:i.inputs)===null||u===void 0?void 0:u[o])===null||l===void 0?void 0:l.resourceId;return p!=null?a[o]=this.resourceIdToCapturedInput[p]:a[o]=e[s++],a},{})}normalizeOutputs(e){return e=e||this.outputNodes,Array.isArray(e)?e:[e]}executeInitializerGraph(){return this.initializer==null?[]:this.initializerSignature==null?this.initializer.execute({},[]):this.initializer.execute({},Object.keys(this.initializerSignature.outputs))}async executeInitializerGraphAsync(){return this.initializer==null?[]:this.initializerSignature==null?this.initializer.executeAsync({},[]):this.initializer.executeAsync({},Object.keys(this.initializerSignature.outputs))}setResourceIdToCapturedInput(e){if(this.resourceIdToCapturedInput={},this.initializerSignature){const n=this.initializerSignature.outputs,r=Object.keys(n);for(let s=0;s<r.length;s++){const a=r[s],o=n[a];this.resourceIdToCapturedInput[o.resourceId]=e[s]}}}execute(e,n){this.resourceIdToCapturedInput==null&&this.setResourceIdToCapturedInput(this.executeInitializerGraph()),e=this.normalizeInputs(e),n=this.normalizeOutputs(n);const r=this.executor.execute(e,n);return r.length>1?r:r[0]}async executeAsync(e,n){this.resourceIdToCapturedInput==null&&this.setResourceIdToCapturedInput(await this.executeInitializerGraphAsync()),e=this.normalizeInputs(e),n=this.normalizeOutputs(n);const r=await this.executor.executeAsync(e,n);return r.length>1?r:r[0]}getIntermediateTensors(){return this.executor.getIntermediateTensors()}disposeIntermediateTensors(){this.executor.disposeIntermediateTensors()}convertTensorMapToTensorsMap(e){return Object.keys(e).reduce((n,r)=>(n[r]=[e[r]],n),{})}dispose(){this.executor.dispose(),this.initializer&&(this.initializer.dispose(),this.resourceIdToCapturedInput&&he(this.resourceIdToCapturedInput)),this.resourceManager.dispose()}}async function JT(t,e={},n=_a){if(t==null)throw new Error("modelUrl in loadGraphModel() cannot be null. Please provide a url or an IOHandler that loads the model");e==null&&(e={}),e.fromTFHub&&typeof t=="string"&&(t=QT(t));const r=new Da(t,e,n);return await r.load(),r}function YT(t){if(t==null)throw new Error("modelUrl in loadGraphModelSync() cannot be null. Please provide model artifacts or an IOHandler that loads the model");let e;if(t instanceof Array){const[r,s]=t;if(!r)throw new Error("modelJSON must be the first element of the array");if(!s||!(s instanceof ArrayBuffer))throw new Error("An ArrayBuffer of weights must be the second element of the array");if(!("modelTopology"in r))throw new Error("Model JSON is missing 'modelTopology'");if(!("weightsManifest"in r))throw new Error("Model JSON is missing 'weightsManifest'");const a=Yn(r.weightsManifest),o=$s(r,a,s);e=rr(o)}else if("load"in t)e=t;else if("modelTopology"in t&&"weightSpecs"in t&&"weightData"in t)e=rr(t);else throw new Error("Unknown model format");const n=new Da(e);return n.load(),n}function QT(t){return t.endsWith("/")||(t=t+"/"),`${t}${ZT}${XT}`}/** @license See the LICENSE file. */const eE="4.22.0";/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var tE=Object.freeze({__proto__:null,GraphModel:Da,deregisterOp:kS,loadGraphModel:JT,loadGraphModelSync:YT,registerOp:$S,version_converter:eE}),nE=cs(tE),rE=cs(ES);/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(function(t,e){(function(n,r){r(e,nE,rE)})(ht,function(n,r,s){const a={1:{name:"/m/01g317",id:1,displayName:"person"},2:{name:"/m/0199g",id:2,displayName:"bicycle"},3:{name:"/m/0k4j",id:3,displayName:"car"},4:{name:"/m/04_sv",id:4,displayName:"motorcycle"},5:{name:"/m/05czz6l",id:5,displayName:"airplane"},6:{name:"/m/01bjv",id:6,displayName:"bus"},7:{name:"/m/07jdr",id:7,displayName:"train"},8:{name:"/m/07r04",id:8,displayName:"truck"},9:{name:"/m/019jd",id:9,displayName:"boat"},10:{name:"/m/015qff",id:10,displayName:"traffic light"},11:{name:"/m/01pns0",id:11,displayName:"fire hydrant"},13:{name:"/m/02pv19",id:13,displayName:"stop sign"},14:{name:"/m/015qbp",id:14,displayName:"parking meter"},15:{name:"/m/0cvnqh",id:15,displayName:"bench"},16:{name:"/m/015p6",id:16,displayName:"bird"},17:{name:"/m/01yrx",id:17,displayName:"cat"},18:{name:"/m/0bt9lr",id:18,displayName:"dog"},19:{name:"/m/03k3r",id:19,displayName:"horse"},20:{name:"/m/07bgp",id:20,displayName:"sheep"},21:{name:"/m/01xq0k1",id:21,displayName:"cow"},22:{name:"/m/0bwd_0j",id:22,displayName:"elephant"},23:{name:"/m/01dws",id:23,displayName:"bear"},24:{name:"/m/0898b",id:24,displayName:"zebra"},25:{name:"/m/03bk1",id:25,displayName:"giraffe"},27:{name:"/m/01940j",id:27,displayName:"backpack"},28:{name:"/m/0hnnb",id:28,displayName:"umbrella"},31:{name:"/m/080hkjn",id:31,displayName:"handbag"},32:{name:"/m/01rkbr",id:32,displayName:"tie"},33:{name:"/m/01s55n",id:33,displayName:"suitcase"},34:{name:"/m/02wmf",id:34,displayName:"frisbee"},35:{name:"/m/071p9",id:35,displayName:"skis"},36:{name:"/m/06__v",id:36,displayName:"snowboard"},37:{name:"/m/018xm",id:37,displayName:"sports ball"},38:{name:"/m/02zt3",id:38,displayName:"kite"},39:{name:"/m/03g8mr",id:39,displayName:"baseball bat"},40:{name:"/m/03grzl",id:40,displayName:"baseball glove"},41:{name:"/m/06_fw",id:41,displayName:"skateboard"},42:{name:"/m/019w40",id:42,displayName:"surfboard"},43:{name:"/m/0dv9c",id:43,displayName:"tennis racket"},44:{name:"/m/04dr76w",id:44,displayName:"bottle"},46:{name:"/m/09tvcd",id:46,displayName:"wine glass"},47:{name:"/m/08gqpm",id:47,displayName:"cup"},48:{name:"/m/0dt3t",id:48,displayName:"fork"},49:{name:"/m/04ctx",id:49,displayName:"knife"},50:{name:"/m/0cmx8",id:50,displayName:"spoon"},51:{name:"/m/04kkgm",id:51,displayName:"bowl"},52:{name:"/m/09qck",id:52,displayName:"banana"},53:{name:"/m/014j1m",id:53,displayName:"apple"},54:{name:"/m/0l515",id:54,displayName:"sandwich"},55:{name:"/m/0cyhj_",id:55,displayName:"orange"},56:{name:"/m/0hkxq",id:56,displayName:"broccoli"},57:{name:"/m/0fj52s",id:57,displayName:"carrot"},58:{name:"/m/01b9xk",id:58,displayName:"hot dog"},59:{name:"/m/0663v",id:59,displayName:"pizza"},60:{name:"/m/0jy4k",id:60,displayName:"donut"},61:{name:"/m/0fszt",id:61,displayName:"cake"},62:{name:"/m/01mzpv",id:62,displayName:"chair"},63:{name:"/m/02crq1",id:63,displayName:"couch"},64:{name:"/m/03fp41",id:64,displayName:"potted plant"},65:{name:"/m/03ssj5",id:65,displayName:"bed"},67:{name:"/m/04bcr3",id:67,displayName:"dining table"},70:{name:"/m/09g1w",id:70,displayName:"toilet"},72:{name:"/m/07c52",id:72,displayName:"tv"},73:{name:"/m/01c648",id:73,displayName:"laptop"},74:{name:"/m/020lf",id:74,displayName:"mouse"},75:{name:"/m/0qjjc",id:75,displayName:"remote"},76:{name:"/m/01m2v",id:76,displayName:"keyboard"},77:{name:"/m/050k8",id:77,displayName:"cell phone"},78:{name:"/m/0fx9l",id:78,displayName:"microwave"},79:{name:"/m/029bxz",id:79,displayName:"oven"},80:{name:"/m/01k6s3",id:80,displayName:"toaster"},81:{name:"/m/0130jx",id:81,displayName:"sink"},82:{name:"/m/040b_t",id:82,displayName:"refrigerator"},84:{name:"/m/0bt_c3",id:84,displayName:"book"},85:{name:"/m/01x3z",id:85,displayName:"clock"},86:{name:"/m/02s195",id:86,displayName:"vase"},87:{name:"/m/01lsmm",id:87,displayName:"scissors"},88:{name:"/m/0kmg4",id:88,displayName:"teddy bear"},89:{name:"/m/03wvsk",id:89,displayName:"hair drier"},90:{name:"/m/012xff",id:90,displayName:"toothbrush"}};class o{constructor(u,l){this.modelPath=l||`https://storage.googleapis.com/tfjs-models/savedmodel/${this.getPrefix(u)}/model.json`}getPrefix(u){return u==="lite_mobilenet_v2"?`ssd${u}`:`ssd_${u}`}async load(){this.model=await r.loadGraphModel(this.modelPath);const u=s.zeros([1,300,300,3],"int32"),l=await this.model.executeAsync(u);await Promise.all(l.map(p=>p.data())),l.map(p=>p.dispose()),u.dispose()}async infer(u,l,p){const c=s.tidy(()=>(u instanceof s.Tensor||(u=s.browser.fromPixels(u)),s.expandDims(u))),f=c.shape[1],d=c.shape[2],y=await this.model.executeAsync(c),S=y[0].dataSync(),b=y[1].dataSync();c.dispose(),s.dispose(y);const[T,A]=this.calculateMaxScores(S,y[0].shape[1],y[0].shape[2]),E=s.getBackend();s.getBackend()==="webgl"&&s.setBackend("cpu");const v=s.tidy(()=>{const _=s.tensor2d(b,[y[1].shape[1],y[1].shape[3]]);return s.image.nonMaxSuppression(_,T,l,p,p)}),k=v.dataSync();return v.dispose(),E!==s.getBackend()&&s.setBackend(E),this.buildDetectedObjects(d,f,b,T,k,A)}buildDetectedObjects(u,l,p,c,f,d){const y=f.length,S=[];for(let b=0;b<y;b++){const T=[];for(let _=0;_<4;_++)T[_]=p[4*f[b]+_];const A=T[0]*l,E=T[1]*u,v=T[2]*l,k=T[3]*u;T[0]=E,T[1]=A,T[2]=k-E,T[3]=v-A,S.push({bbox:T,class:a[d[f[b]]+1].displayName,score:c[f[b]]})}return S}calculateMaxScores(u,l,p){const c=[],f=[];for(let d=0;d<l;d++){let y=Number.MIN_VALUE,S=-1;for(let b=0;b<p;b++)u[d*p+b]>y&&(y=u[d*p+b],S=b);c[d]=y,f[d]=S}return[c,f]}async detect(u,l=20,p=.5){return this.infer(u,l,p)}dispose(){this.model!=null&&this.model.dispose()}}n.ObjectDetection=o,n.load=async function(i={}){if(s==null)throw new Error("Cannot find TensorFlow.js. If you are using a <script> tag, please also include @tensorflow/tfjs on the page before using this model.");const u=i.base||"lite_mobilenet_v2",l=i.modelUrl;if(["mobilenet_v1","mobilenet_v2","lite_mobilenet_v2"].indexOf(u)===-1)throw new Error(`ObjectDetection constructed with invalid base model ${u}. Valid names are 'mobilenet_v1', 'mobilenet_v2' and 'lite_mobilenet_v2'.`);const p=new o(u,l);return await p.load(),p},n.version="2.2.3",Object.defineProperty(n,"__esModule",{value:!0})})})(Dr,Dr.exports);var Wh=Dr.exports,sE=lo(Wh),aE=uo({__proto__:null,default:sE},[Wh]);export{aE as c};
