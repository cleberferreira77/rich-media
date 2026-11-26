(function(){
  function valid(value){
    if(typeof value!=="string"||!value.trim())return null;
    try{var u=new URL(value);return(u.protocol==="https:"||u.protocol==="http:")?value:null;}catch(e){return null;}
  }
  function exact(name){return new URLSearchParams(window.location.search).get(name);}
  function bind(){
    var link=document.querySelector(".click-area");if(!link)return;
    var supplied=valid(exact("clickTag"))||valid(exact("clickTAG"))||valid(window.clickTag)||valid(window.clickTAG);
    var fallback=valid("https://www.segurosbantrab.com.gt/seguros/nutricion-psicologia");
    var isPrefix=supplied&&/(?:[?&])r=$/.test(supplied);
    var destination=isPrefix?(fallback?supplied+fallback:null):(supplied||fallback);
    if(!destination){link.removeAttribute("href");return;}
    link.href=destination;link.target="_blank";link.rel="noopener noreferrer";
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();