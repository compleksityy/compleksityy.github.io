const $=x=>document.getElementById(x);
const input=$("input"),output=$("output"),method=$("method"),key=$("key"),status=$("status");
method.onchange=()=>key.style.display=["caesar","vigenere","xor"].includes(method.value)?"block":"none";

function rot(s,n){return [...s].map(c=>{let x=c.charCodeAt(0);if(x>=65&&x<=90)return String.fromCharCode((x-65+n+26)%26+65);if(x>=97&&x<=122)return String.fromCharCode((x-97+n+26)%26+97);return c}).join("")}
function atbash(s){return [...s].map(c=>{let x=c.charCodeAt(0);if(x>=65&&x<=90)return String.fromCharCode(90-x+65);if(x>=97&&x<=122)return String.fromCharCode(122-x+97);return c}).join("")}
function b64d(s){try{return decodeURIComponent(escape(atob(s.trim())))}catch{return atob(s.trim())}}
function b64e(s){return btoa(unescape(encodeURIComponent(s)))}
function hexd(s){s=s.replace(/0x/gi,"").replace(/\s/g,"");if(!/^[0-9a-f]+$/i.test(s)||s.length%2)return "";let r="";for(let i=0;i<s.length;i+=2)r+=String.fromCharCode(parseInt(s.slice(i,i+2),16));return r}
function hexe(s){return [...s].map(c=>c.charCodeAt(0).toString(16).padStart(2,"0")).join(" ")}
function bind(s){let a=s.trim().split(/\s+/);if(!a.length||!a.every(x=>/^[01]{8}$/.test(x)))return "";return a.map(x=>String.fromCharCode(parseInt(x,2))).join("")}
function bine(s){return [...s].map(c=>c.charCodeAt(0).toString(2).padStart(8,"0")).join(" ")}
function asciid(s){let a=s.trim().split(/[\s,]+/);if(!a.length||!a.every(x=>/^\d{1,3}$/.test(x)))return "";return a.map(x=>String.fromCharCode(+x)).join("")}
function asciie(s){return [...s].map(c=>c.charCodeAt(0)).join(" ")}
const morse={".-":"A","-...":"B","-.-.":"C","-..":"D",".":"E","..-.":"F","--.":"G","....":"H","..":"I",".---":"J","-.-":"K",".-..":"L","--":"M","-.":"N","---":"O",".--.":"P","--.-":"Q",".-.":"R","...":"S","-":"T","..-":"U","...-":"V",".--":"W","-..-":"X","-.--":"Y","--..":"Z","-----":"0",".----":"1","..---":"2","...--":"3","....-":"4",".....":"5","-....":"6","--...":"7","---..":"8","----.":"9"};
function morsed(s){return s.split(" / ").map(x=>x.split(/\s+/).map(y=>morse[y]||"?").join("")).join(" ")}
function morsee(s){let r=Object.fromEntries(Object.entries(morse).map(([a,b])=>[b,a]));return s.toUpperCase().split(/\s+/).map(w=>[...w].map(c=>r[c]||"?").join(" ")).join(" / ")}
function a1d(s){return s.trim().split(/[\s,-]+/).map(x=>String.fromCharCode(+x+64)).join("")}
function a1e(s){return [...s.toUpperCase()].map(c=>/[A-Z]/.test(c)?c.charCodeAt(0)-64:"").filter(Boolean).join(" ")}
function xor(s,k){if(!k)return "";let r="";for(let i=0;i<s.length;i++)r+=String.fromCharCode(s.charCodeAt(i)^k.charCodeAt(i%k.length));return r}
function vig(s,k,back){if(!k)return "";k=k.toUpperCase().replace(/[^A-Z]/g,"");if(!k)return "";let i=0;return [...s].map(c=>{if(!/[A-Za-z]/.test(c))return c;let n=k.charCodeAt(i++%k.length)-65;return rot(c,back?-n:n)}).join("")}
function bacon(s){let x=s.toLowerCase().replace(/[^ab]/g,""),r="";for(let i=0;i+4<x.length;i+=5){let n=parseInt(x.slice(i,i+5).replace(/a/g,"0").replace(/b/g,"1"),2);r+=n<26?String.fromCharCode(65+n):"?"}return r}
function b32d(s){const a="ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";s=s.toUpperCase().replace(/=+$/,"");let bits="",r="";for(let c of s){let n=a.indexOf(c);if(n<0)return "";bits+=n.toString(2).padStart(5,"0")}for(let i=0;i+8<=bits.length;i+=8)r+=String.fromCharCode(parseInt(bits.slice(i,i+8),2));return r}
function b32e(s){const a="ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";let bits=[...s].map(c=>c.charCodeAt(0).toString(2).padStart(8,"0")).join(""),r="";for(let i=0;i<bits.length;i+=5)r+=a[parseInt(bits.slice(i,i+5).padEnd(5,"0"),2)];return r}

function decodeValue(s,m){
switch(m){
case"base64":return b64d(s);case"base32":return b32d(s);case"hex":return hexd(s);case"url":return decodeURIComponent(s);
case"html":let e=document.createElement("textarea");e.innerHTML=s;return e.value;case"binary":return bind(s);case"ascii":return asciid(s);
case"rot13":return rot(s,13);case"rot47":return [...s].map(c=>{let x=c.charCodeAt(0);return x>=33&&x<=126?String.fromCharCode(33+(x-33+47)%94):c}).join("");
case"caesar":return rot(s,-(parseInt(key.value)||0));case"atbash":return atbash(s);case"morse":return morsed(s);case"a1z26":return a1d(s);
case"reverse":return [...s].reverse().join("");case"bacon":return bacon(s);case"vigenere":return vig(s,key.value,true);case"xor":return xor(s,key.value);default:return auto(s)[1]
}}

function encodeValue(s,m){
switch(m){
case"base64":return b64e(s);case"base32":return b32e(s);case"hex":return hexe(s);case"url":return encodeURIComponent(s);
case"html":let d=document.createElement("div");d.textContent=s;return d.innerHTML;case"binary":return bine(s);case"ascii":return asciie(s);
case"rot13":return rot(s,13);case"rot47":return [...s].map(c=>{let x=c.charCodeAt(0);return x>=33&&x<=126?String.fromCharCode(33+(x-33+47)%94):c}).join("");
case"caesar":return rot(s,parseInt(key.value)||0);case"atbash":return atbash(s);case"morse":return morsee(s);case"a1z26":return a1e(s);
case"reverse":return [...s].reverse().join("");case"vigenere":return vig(s,key.value,false);case"xor":return xor(s,key.value);default:return s
}}

function auto(s){
const checks=[
["base64",()=>/^[A-Za-z0-9+/]+={0,2}$/.test(s.trim())&&s.trim().length%4===0?b64d(s):""],
["hex",()=>/^(?:[0-9a-fA-F]{2}\s*)+$/.test(s)?hexd(s):""],
["binary",()=>/^(?:[01]{8}\s*)+$/.test(s)?bind(s):""],
["url",()=>/%[0-9a-fA-F]{2}/.test(s)?decodeURIComponent(s):""]
];
for(let [name,fn] of checks){try{let r=fn();if(r&&r!==s)return[name,r]}catch{}}
return["unknown",s]
}

function decode(){
if(!input.value)return;
try{let m=method.value,r;if(m==="auto"){[m,r]=auto(input.value);status.innerHTML=`detected: <b>${m}</b>`}else{r=decodeValue(input.value,m);status.textContent=m}output.textContent=r||"unable to decode"}catch{output.textContent="invalid input";status.textContent="error"}
}

function encode(){
if(!input.value)return;
try{output.textContent=encodeValue(input.value,method.value);status.textContent=method.value}catch{output.textContent="unable to encode";status.textContent="error"}
}

async function copy(){
if(!output.textContent)return;
await navigator.clipboard.writeText(output.textContent);
status.textContent="copied"
}
