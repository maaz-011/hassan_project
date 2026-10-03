document.addEventListener('DOMContentLoaded',()=>{
const countEl=document.getElementById('visitorCount');
let count=Number(localStorage.getItem('albertoVisitors')||0)+1;
localStorage.setItem('albertoVisitors',count);
if(countEl)countEl.textContent=count;
const toggle=document.getElementById('menuToggle'),nav=document.getElementById('mainNav');
if(toggle)toggle.addEventListener('click',()=>nav.classList.toggle('open'));
const ticker=document.getElementById('tickerText');
function updateTicker(location='Location unavailable'){
 const d=new Date();
 const date=d.toLocaleDateString(undefined,{day:'2-digit',month:'long',year:'numeric'});
 const time=d.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit',second:'2-digit'});
 if(ticker)ticker.textContent=`📅 ${date}   •   🕒 ${time}   •   📍 ${location}   •   ALBERTO WATCH COMPANY`;
}
updateTicker('Detecting location...');
if(navigator.geolocation){
 navigator.geolocation.getCurrentPosition(pos=>{
   const lat=pos.coords.latitude.toFixed(2),lon=pos.coords.longitude.toFixed(2);
   updateTicker(`Lat ${lat}, Long ${lon}`);
 },()=>updateTicker('Location permission not granted'));
}else updateTicker('Geolocation not supported');
setInterval(()=>{ if(ticker){ const current=ticker.textContent; const loc=current.includes('📍')?current.split('📍')[1].split('   •')[0].trim():'Location unavailable'; updateTicker(loc);}},1000);

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
 const filter=btn.dataset.filter;
 document.querySelectorAll('.product-card').forEach(card=>card.style.display=(filter==='all'||card.dataset.category===filter)?'block':'none');
}));
const modal=document.getElementById('productModal');
document.querySelectorAll('.details-btn').forEach(btn=>btn.addEventListener('click',()=>{
 const card=btn.closest('.product-card');
 document.getElementById('modalName').textContent=card.dataset.name;
 document.getElementById('modalPrice').textContent=card.dataset.price;
 document.getElementById('modalCategory').textContent=card.dataset.category;
 document.getElementById('modalDescription').textContent=card.dataset.description;
 const modalIcon=document.getElementById('modalIcon'); const sourceImg=card.querySelector('.watch-img img'); if(sourceImg){modalIcon.innerHTML='<img src="'+sourceImg.src+'" alt="'+card.dataset.name+'">';}else{modalIcon.textContent=card.querySelector('.watch-img').textContent;}
 modal.classList.add('show');
}));
if(modal){
 modal.querySelector('.modal-close').addEventListener('click',()=>modal.classList.remove('show'));
 modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('show')});
}
const form=document.getElementById('contactForm');
if(form)form.addEventListener('submit',e=>{e.preventDefault();document.getElementById('formMessage').textContent='Thank you! Your message has been received in this demo form.';form.reset()});
});
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("open");
    });
}