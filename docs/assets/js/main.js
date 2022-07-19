"use strict";const input=document.querySelector(".js-input"),btnSearch=document.querySelector(".js-btn-search"),btnReset=document.querySelector(".js-btn-reset"),ulResults=document.querySelector(".js-result-list"),ulResultFavourites=document.querySelector(".js-result-favourites");let animes=[],favourites=[];function renderFavouriteList(e){let t="";for(const i of e){const e="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png",n="https://via.placeholder.com/210x295/ffffff/666666/?text=FAV-ANIME";t+=`<li class="list--favourite" id="${i.title}">`,i.images.jpg.image_url===e?t+=`<img\n          src=${n}\n          alt="img"\n          class="image js-img"/>`:t+=`<img\n          src=${i.images.jpg.image_url}\n          alt="img"\n          class="image js-img"\n        />`,t+=`<p class="js-title favtitle">${i.title}</p> <i class="js-icon fa-solid fa-circle-xmark icon" id=${i.mal_id}></i>\n    </li>`,t+="</li>"}if(""===e)ulResultFavourites.innerHTML="";else{ulResultFavourites.innerHTML='<h2 class="h2">Series favoritas:<h2>'+t;const e=document.querySelectorAll(".js-icon");console.log(e),addListenerIcons(e)}}function renderHTML(){let e="",t="";for(const i of animes){const n="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png",s="https://via.placeholder.com/210x295/ffffff/666666/?text=ANIME";-1!==favourites.findIndex(e=>i.title===e.title)?(t="--favourite",renderFavouriteList(favourites)):t="",e+=`<li class="list${t} js-list-anime" id="${i.title}">`,i.images.jpg.image_url===n?e+=`<img\n            src=${s}\n            alt="img"\n            class="image js-img"/>`:e+=`<img\n            src=${i.images.jpg.image_url}\n            alt="img"\n            class="image js-img"\n          />`,e+=`<p class="js-title">${i.title}</p>\n          </li>`,e+="</li>"}ulResults.innerHTML=""===e?"":`<h2 class="h2">Resultados:</h2><section class="container">${e}</section>`,listenerAnime()}function getDataFromApi(){let e=input.value;fetch("https://api.jikan.moe/v4/anime?q="+e).then(e=>e.json()).then(e=>{animes=e.data,console.log(animes),renderHTML()}),listenerAnime()}function setLs(e){localStorage.setItem("fav",JSON.stringify(e)),renderHTML(),listenerAnime()}function handleClick(e){e.preventDefault(),getDataFromApi()}function handleIconClick(e){const t=parseInt(e.currentTarget.id);console.log(t);const i=favourites.find(e=>e.mal_id===t);console.log(i);const n=favourites.findIndex(e=>e.mal_id===t);console.log(n),-1!==n&&favourites.splice(i,1),setLs(favourites),renderFavouriteList(favourites)}function handleFavouriteClick(e){const t=e.currentTarget.id;console.log("clique en "+e.currentTarget.id);const i=animes.find(e=>e.title===t),n=favourites.findIndex(e=>e.title===t);-1===n?favourites.push(i):favourites.splice(n,1),setLs(favourites),renderFavouriteList(favourites)}function listenerAnime(){const e=document.querySelectorAll(".js-list-anime");for(const t of e)t.addEventListener("click",handleFavouriteClick)}function handleReset(e){e.preventDefault(),ulResults.innerHTML=""}function addListenerIcons(e){for(const t of e)t.addEventListener("click",handleIconClick)}function onLoad(){const e=JSON.parse(localStorage.getItem("fav"));e&&e.length>0&&(favourites=e,renderFavouriteList(favourites),console.log("Hay cosas en el LS"))}onLoad(),btnSearch.addEventListener("click",handleClick),btnReset.addEventListener("click",handleReset);