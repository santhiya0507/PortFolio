document.getElementById("year").textContent = new Date().getFullYear();
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add("visible"); });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
const btn=document.getElementById("menuBtn"), links=document.getElementById("navLinks");
btn.addEventListener("click",()=>links.classList.toggle("open"));
links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")));
// Interactive cursor glow
const glow=document.getElementById("cursorGlow");
window.addEventListener("pointermove",(e)=>{if(glow){glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px";}});

// Subtle portrait parallax
const portrait=document.querySelector(".portrait-frame");
if(portrait){
  portrait.addEventListener("pointermove",e=>{
    const r=portrait.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    portrait.style.transform=`perspective(800px) rotateY(${x*5}deg) rotateX(${-y*5}deg) scale(1.015)`;
  });
  portrait.addEventListener("pointerleave",()=>portrait.style.transform="");
}

// Project hover movement
document.querySelectorAll(".tilt-card").forEach(card=>{
  card.addEventListener("pointermove",e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    card.style.transform=`translateX(${x*4}px)`;
  });
  card.addEventListener("pointerleave",()=>card.style.transform="");
});

// Gentle count-up for hero stats
document.querySelectorAll(".mini-stats strong").forEach(el=>{
  const raw=el.textContent.trim();
  if(raw==="850+"){
    let n=0; const target=850, step=34;
    const timer=setInterval(()=>{n=Math.min(target,n+step);el.textContent=n+"+";if(n>=target)clearInterval(timer)},28);
  }
});

// Rotating technology text
const words=["Java","Python","SQL","backend systems","clean logic"];
let wi=0, ci=0, deleting=false;
const typeEl=document.getElementById("typeText");
function typeLoop(){
  const w=words[wi];
  typeEl.textContent=w.slice(0,ci);
  if(!deleting && ci<w.length){ci++; setTimeout(typeLoop,90);}
  else if(!deleting){deleting=true;setTimeout(typeLoop,1200);}
  else if(ci>0){ci--;setTimeout(typeLoop,45);}
  else{deleting=false;wi=(wi+1)%words.length;setTimeout(typeLoop,250);}
}
typeLoop();

// Scroll progress
const progress=document.getElementById("scrollProgress");
window.addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(scrollY/max*100)+"%";
});

// Subtle pointer glow
const cursorGlowEl=document.getElementById("cursorGlow");
window.addEventListener("pointermove",e=>{
  if(cursorGlowEl){
    cursorGlowEl.style.left=e.clientX+"px";
    cursorGlowEl.style.top=e.clientY+"px";
  }
});

// Count-up achievement when visible
const countEl=document.querySelector("[data-count]");
let counted=false;
const countObs=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting && !counted){
    counted=true; const target=+countEl.dataset.count; const start=performance.now();
    function tick(now){
      const p=Math.min((now-start)/1300,1);
      countEl.textContent=Math.floor(target*(1-Math.pow(1-p,3)))+"+";
      if(p<1) requestAnimationFrame(tick);
    } requestAnimationFrame(tick);
  }
},{threshold:.45});
if(countEl) countObs.observe(countEl);

// Gentle 3D tilt on skill cards (desktop pointer devices only)
if(matchMedia("(pointer:fine)").matches){
  document.querySelectorAll(".skill-card").forEach(card=>{
    card.addEventListener("mousemove",e=>{
      const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(700px) rotateX(${-y*5}deg) rotateY(${x*5}deg) translateY(-3px)`;
    });
    card.addEventListener("mouseleave",()=>card.style.transform="");
  });
}
