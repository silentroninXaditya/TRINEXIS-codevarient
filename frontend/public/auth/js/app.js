/* ---------- City street (inline SVG, 1100×640) ---------- */
(function(){
  var seed=11;function r(){seed=(seed*16807)%2147483647;return seed/2147483647}
  var lerp=function(a,b,t){return a+(b-a)*t},VX=550,VY=300;
  function P(s,t,h){var x=lerp(s<0?-90:1190,VX,t),yb=lerp(560,VY,t),yt=lerp(-260,VY,t);return[x,lerp(yb,yt,h)]}
  function quad(s,t0,t1,h0,h1){return[P(s,t0,h1),P(s,t1,h1),P(s,t1,h0),P(s,t0,h0)].map(function(p){return p[0].toFixed(0)+","+p[1].toFixed(0)}).join(" ")}
  var cols=["#3478F6","#8B5CF6","#35D8FF","#6E4BEA","#5B8CFF"],out="",neon="",refl="";
  var T=[0,.2,.37,.52,.65,.76,.86,.94,1];
  [-1,1].forEach(function(s){
    for(var i=0;i<T.length-1;i++){
      var t0=T[i],t1=T[i+1],top=.78+r()*.22;
      out+='<polygon points="'+quad(s,t0,t1,0,top)+'" fill="url(#'+(s<0?'bl':'br')+')" stroke="#0a0f2e"/>';
      var nc=Math.max(2,Math.round(5*(1-t0))),nr=Math.round(14*top);
      for(var c=0;c<nc;c++)for(var k=0;k<nr;k++){
        if(r()<.64)continue;
        out+='<polygon points="'+quad(s,lerp(t0,t1,(c+.2)/nc),lerp(t0,t1,(c+.75)/nc),(k+.25)/14,(k+.65)/14)+'" fill="'+cols[Math.floor(r()*5)]+'" opacity="'+(.25+r()*.55).toFixed(2)+'"/>';
      }
      if(i%2===0||r()<.4){
        var col=cols[(i+(s<0?0:2))%5],a=lerp(t0,t1,.15),b=lerp(t0,t1,.85),h0=.42+r()*.2;
        neon+='<polygon points="'+quad(s,a,b,h0,h0+.07+r()*.05)+'" fill="'+col+'"/>';
        var base=P(s,(a+b)/2,0);
        refl+='<rect x="'+(base[0]-6*(1-t0)-2).toFixed(0)+'" y="'+base[1].toFixed(0)+'" width="'+(12*(1-t0)+4).toFixed(0)+'" height="'+(130*(1-t0)+25).toFixed(0)+'" fill="'+col+'" opacity=".5"/>';
      }
      neon+='<polygon points="'+quad(s,t0+.004,t0+.012,.08,.5+r()*.45)+'" fill="'+cols[Math.floor(r()*5)]+'"/>';
    }
  });
  var far="";for(var i=0;i<16;i++){var w=10+r()*18,h=20+r()*70;far+='<rect x="'+(VX-135+i*17+r()*6).toFixed(0)+'" y="'+(VY-h).toFixed(0)+'" width="'+w.toFixed(0)+'" height="'+h.toFixed(0)+'" fill="#0D1428"/>'}
  var rain="";for(var i=0;i<90;i++){var x=r()*1100,y=r()*640;rain+='<line x1="'+x.toFixed(0)+'" y1="'+y.toFixed(0)+'" x2="'+(x-5).toFixed(0)+'" y2="'+(y+22).toFixed(0)+'"/>'}
  var lanes="";[-200,250,550,850,1300].forEach(function(x){lanes+='<line x1="'+VX+'" y1="'+VY+'" x2="'+x+'" y2="700"/>'});
  document.getElementById("cityHost").outerHTML='<svg viewBox="0 0 1100 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs>'+
  '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070B18"/><stop offset=".4" stop-color="#0D1634"/><stop offset=".55" stop-color="#1E2F7A"/><stop offset="1" stop-color="#4B3FC0"/></linearGradient>'+
  '<linearGradient id="bl" x1="0" x2="1"><stop offset="0" stop-color="#070B18"/><stop offset="1" stop-color="#16225A"/></linearGradient>'+
  '<linearGradient id="br" x1="1" x2="0"><stop offset="0" stop-color="#070B18"/><stop offset="1" stop-color="#16225A"/></linearGradient>'+
  '<linearGradient id="st" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B2A6B"/><stop offset=".3" stop-color="#0D1428"/><stop offset="1" stop-color="#05080F"/></linearGradient>'+
  '<radialGradient id="hz"><stop offset="0" stop-color="#8B5CF6" stop-opacity=".75"/><stop offset=".4" stop-color="#3478F6" stop-opacity=".35"/><stop offset="1" stop-color="#3478F6" stop-opacity="0"/></radialGradient>'+
  '<filter id="g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7"/></filter><filter id="g2"><feGaussianBlur stdDeviation="8 16"/></filter></defs>'+
  '<rect width="1100" height="640" fill="url(#sky)"/><ellipse cx="550" cy="300" rx="380" ry="210" fill="url(#hz)"/>'+far+
  '<polygon points="-90,560 550,300 1190,560 1190,640 -90,640" fill="url(#st)"/>'+
  '<g filter="url(#g2)" opacity=".4">'+refl+'<ellipse cx="550" cy="400" rx="50" ry="80" fill="#8B5CF6" opacity=".5"/></g>'+
  '<g stroke="#8fb0ff" stroke-width="2" opacity=".18" stroke-dasharray="14 18">'+lanes+'</g>'+
  out+'<g filter="url(#g)" opacity=".22">'+neon+'</g><g>'+neon+'</g><g stroke="#bcd0ff" stroke-width=".8" opacity=".18">'+rain+'</g></svg>';
})();

/* ---------- Forms ---------- */
var I={
 user:'<path d="M20 21v-1a5 5 0 00-5-5H9a5 5 0 00-5 5v1"/><circle cx="12" cy="7" r="4"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
 eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'};
function svg(p){return'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'}
var GOOGLE='<svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.35 11.1H12v2.9h5.35c-.5 2.4-2.5 3.7-5.35 3.7a6 6 0 110-12c1.5 0 2.8.5 3.8 1.4l2.1-2.1A9 9 0 1012 21c5 0 9-3.5 9-9 0-.3 0-.6-.1-.9z"/></svg>';
var APPLE='<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.2-2.500 1.300-2.600-.1 0-2.500-1-2.500-3.900zM14.100 5.700c.6-.8 1.100-1.800.9-2.900-.9 0-2 .6-2.700 1.400-.6.700-1.100 1.800-1 2.800 1 .1 2.100-.5 2.800-1.300z"/></svg>';
var FORMS={
 login:{title:"Welcome back",cta:"Login",
  fields:[{id:"email",label:"Email address",type:"email",ac:"email",ico:"mail"},{id:"password",label:"Password",type:"password",ac:"current-password"}],
  extra:'<div class="row"><label class="chk"><input type="checkbox" name="remember"> Remember me</label><a href="#forgot" data-msg="Password reset needs a backend. This demo doesn’t send emails.">Forgot password?</a></div>',
  or:"Or sign in with",foot:'Don’t have an account? <button type="button" class="link" data-go="signup">Create account</button>'},
 signup:{title:"Create account",cta:"Create account",
  fields:[{id:"name",label:"Full name",type:"text",ac:"name",ico:"user"},{id:"email",label:"Email address",type:"email",ac:"email",ico:"mail"},{id:"password",label:"Password",type:"password",ac:"new-password",meter:1},{id:"confirm",label:"Confirm password",type:"password",ac:"new-password"}],
  extra:"",or:"Or sign up with",foot:'Already have an account? <button type="button" class="link" data-go="login">Sign in</button>'}
};
var RULES={
 name:function(v){return v.trim().length<2?"Enter your full name.":""},
 email:function(v){return!v?"Enter your email address.":!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)?"That email doesn’t look right. Try name@example.com.":""},
 password:function(v,f){if(!v)return"Enter your password.";if(f.dataset.kind==="signup"&&(v.length<8||!/\d/.test(v)))return"Use at least 8 characters, including a number.";return""},
 confirm:function(v,f){return!v?"Repeat your password.":v!==f.elements.password.value?"Passwords don’t match.":""}
};
function build(k){
 var c=FORMS[k],h='<section class="pane-form f-'+k+'" id="v-'+k+'"'+(k==="login"?"":" inert")+'><h1>'+c.title+'</h1><div class="status" role="status" aria-live="polite"></div><form novalidate data-kind="'+k+'">';
 c.fields.forEach(function(f){
  var id=k+"-"+f.id,pw=f.type==="password";
  h+='<div class="f"><div class="box"><input id="'+id+'" name="'+f.id+'" type="'+f.type+'" placeholder=" " autocomplete="'+f.ac+'" aria-describedby="'+id+'-e"><label for="'+id+'">'+f.label+'</label><span class="ul"></span>'+
  (pw?'<button type="button" class="eye" aria-label="Show password" aria-pressed="false">'+svg(I.eye)+'</button>':'<span class="ico">'+svg(I[f.ico])+'</span>')+'</div>'+
  (f.meter?'<div class="meter" aria-hidden="true"><i></i><i></i><i></i><i></i><span>Use 8 characters or more.</span></div>':'')+
  '<p class="err" id="'+id+'-e" aria-live="polite"></p></div>';
 });
 return h+c.extra+'<button class="btn" type="submit"><span class="spin" aria-hidden="true"></span><span class="lbl">'+c.cta+'</span></button></form>'+
 '<div class="or">'+c.or+'</div><div class="social"><button type="button" class="soc" data-provider="Google">'+GOOGLE+'Google</button><button type="button" class="soc" data-provider="Apple">'+APPLE+'Apple</button></div>'+
 '<button type="button" class="guest" data-guest>Skip now · Continue as guest</button><p class="foot">'+c.foot+'</p></section>';
}
var stage=document.getElementById("stage");
document.getElementById("forms").innerHTML=build("login")+build("signup");

function show(k,focus){
 stage.dataset.mode=k;
 ["login","signup"].forEach(function(m){
  document.getElementById("v-"+m).toggleAttribute("inert",m!==k);
  document.getElementById("t-"+m).setAttribute("aria-hidden",m!==k);
 });
 if(focus)setTimeout(function(){var i=document.querySelector("#v-"+k+" input");i&&i.focus({preventScroll:true})},900);
}
function setStatus(v,t,m){var s=v.querySelector(".status");s.className="status show "+t;s.textContent=m}
function fieldErr(i,m){i.setAttribute("aria-invalid",m?"true":"false");document.getElementById(i.id+"-e").textContent=m}
function check(i,f){var m=RULES[i.name]?RULES[i.name](i.value,f):"";fieldErr(i,m);return!m}
function meter(inp){
 var v=inp.value,s=(v.length>=8)+/\d/.test(v)+/[A-Z]/.test(v)+/[^A-Za-z0-9]/.test(v);if(!v)s=0;
 var m=inp.closest(".f").querySelector(".meter"),c=["","#E5484D","#F5A524","#2867E8","#2BB673"][s];
 m.querySelectorAll("i").forEach(function(b,n){b.style.background=n<s?c:""});
 m.querySelector("span").textContent=v?["","Weak","Okay","Good","Strong"][s]:"Use 8 characters or more.";
}
var ov=document.getElementById("guestOv");
document.addEventListener("click",function(e){
 var t=e.target.closest("button,a");if(!t)return;
 if(t.dataset.go)show(t.dataset.go,true);
 else if(t.classList.contains("eye")){var i=t.parentNode.querySelector("input"),o=i.type==="password";i.type=o?"text":"password";t.setAttribute("aria-pressed",o);t.setAttribute("aria-label",o?"Hide password":"Show password")}
 else if(t.dataset.provider)setStatus(t.closest(".pane-form"),"info",t.dataset.provider+" sign-in isn’t connected. A real build needs a provider such as Auth0, Supabase or Firebase.");
 else if(t.dataset.msg){e.preventDefault();setStatus(t.closest(".pane-form"),"info",t.dataset.msg)}
 else if(t.hasAttribute("data-guest")){
  ov.removeAttribute("inert");
  var gp = document.getElementById("guestProceed");
  if(gp) gp.focus();
 }
 else if(t.id==="guestProceed"){
  if(window.parent)window.parent.postMessage({ type: 'ENTER_APP', mode: 'guest' }, '*');
 }
 else if(t.id==="guestBack"){ov.setAttribute("inert","");show("login",true)}
});
document.querySelectorAll("form").forEach(function(form){
 form.addEventListener("focusout",function(e){var i=e.target;if(i.matches("input:not([type=checkbox])")&&i.value)check(i,form)});
 form.addEventListener("input",function(e){var i=e.target;if(i.name==="password"&&form.dataset.kind==="signup")meter(i);if(i.getAttribute("aria-invalid")==="true")check(i,form)});
 form.addEventListener("submit",function(e){
  e.preventDefault();
  var view=form.closest(".pane-form"),bad=null,btn=form.querySelector(".btn");
  form.querySelectorAll("input[name]").forEach(function(i){if(i.type!=="checkbox"&&!check(i,form)&&!bad)bad=i});
  if(bad){setStatus(view,"bad","Please fix the highlighted fields.");bad.focus();return}
  view.querySelector(".status").className="status";
  btn.classList.add("loading");btn.disabled=true;btn.querySelector(".lbl").textContent="Checking…";
  setTimeout(function(){
   btn.classList.remove("loading");btn.disabled=false;btn.querySelector(".lbl").textContent=FORMS[form.dataset.kind].cta;
   setStatus(view,"ok","Authenticated successfully. Entering The Project Graveyard…");
   setTimeout(function(){
     if(window.parent)window.parent.postMessage({ type: 'ENTER_APP', mode: 'user' }, '*');
   }, 600);
  },1000);
 });
});
var root=document.documentElement,tb=document.getElementById("themeBtn");
function setTheme(t,save){root.dataset.theme=t;tb.setAttribute("aria-pressed",t==="dark");tb.setAttribute("aria-label",t==="dark"?"Switch to light mode":"Switch to dark mode");if(save){try{localStorage.setItem("gw-theme",t)}catch(e){}}}
tb.addEventListener("click",function(){setTheme(root.dataset.theme==="dark"?"light":"dark",true)});
setTheme(root.dataset.theme||"light",false);
if(location.hash==="#signup")show("signup");
