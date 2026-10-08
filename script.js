const menu=document.querySelector(".menu-toggle"), nav=document.querySelector(".nav");
menu?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",open)});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const modal=document.getElementById("bookingModal"), closeBtn=document.querySelector(".modal-close");
const openModal=()=>{modal.classList.add("show");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"};
const closeModal=()=>{modal.classList.remove("show");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""};
document.querySelectorAll(".open-booking").forEach(b=>b.addEventListener("click",openModal));
closeBtn?.addEventListener("click",closeModal);
modal?.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

document.querySelectorAll("[data-scroll]").forEach(b=>b.addEventListener("click",()=>document.querySelector(b.dataset.scroll)?.scrollIntoView({behavior:"smooth"})));
document.querySelectorAll(".service-card").forEach(card=>card.addEventListener("click",()=>{openModal();document.querySelector('[name="service"]').value=card.dataset.service}));

document.getElementById("bookingForm")?.addEventListener("submit",e=>{
 e.preventDefault(); closeModal(); const toast=document.getElementById("toast");toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),4200);e.target.reset();
});
document.getElementById("learnMore")?.addEventListener("click",()=>document.getElementById("about").scrollIntoView({behavior:"smooth"}));
document.getElementById("insightBtn")?.addEventListener("click",()=>document.getElementById("insights").scrollIntoView({behavior:"smooth"}));

const sections=[...document.querySelectorAll("main section[id]")], links=[...document.querySelectorAll(".nav a")];
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(l=>l.classList.toggle("active",l.getAttribute("href")==="#"+entry.target.id))}}),{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>observer.observe(s));
