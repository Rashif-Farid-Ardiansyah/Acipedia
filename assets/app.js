
document.addEventListener('DOMContentLoaded', ()=>{
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
  // dropdown toggle
  document.querySelectorAll('.dropdown-toggle').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      btn.parentElement.classList.toggle('show');
    });
  });
  // modal
  document.getElementById('openLogin')?.addEventListener('click', ()=> toggleModal(true));
  document.getElementById('closeModal')?.addEventListener('click', ()=> toggleModal(false));
  

  // carousel auto-slide
  let slideIdx=0;
  setInterval(()=>{ const slides = document.getElementById('slides'); if(!slides) return; slideIdx++; const w = slides.children[0].getBoundingClientRect().width + 12; const perView = window.innerWidth < 900 ? 1:3; const maxIdx = Math.max(0, slides.children.length - perView); if(slideIdx>maxIdx) slideIdx=0; slides.style.transform='translateX('+(-slideIdx*w)+'px)'; },2000);

  // smooth scroll fix for when linking to anchors from other pages
  if(location.hash){
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if(el) setTimeout(()=> el.scrollIntoView({behavior:'smooth'}),50);
  }
});

// modal functions
function toggleModal(show){ const m=document.getElementById('modal'); if(!m) return; m.style.display = show ? 'flex':'none'; }

// shooting stars downward
(function(){
  const c = document.getElementById('bg'); if(!c) return;
  const ctx = c.getContext('2d');
  let W = c.width = innerWidth, H = c.height = innerHeight;
  window.addEventListener('resize', ()=>{ W=c.width=innerWidth; H=c.height=innerHeight; initStars(); });

  let stars=[];
  function initStars(){ stars=[]; const count = Math.floor((W*H)/18000); for(let i=0;i<count;i++){ stars.push({x:Math.random()*W, y:Math.random()*H, vy:2+Math.random()*6, len:40+Math.random()*120, size:0.6+Math.random()*1.8, delay:Math.random()*5000}); } }
  initStars();

  function draw(){ ctx.clearRect(0,0,W,H); const g = ctx.createLinearGradient(0,0,W,H); g.addColorStop(0,'rgba(6,10,18,0.95)'); g.addColorStop(1,'rgba(8,12,20,0.95)'); ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    for(let i=0;i<200;i++){ const x=(i*37)%W, y=(i*97)%H; ctx.fillStyle='rgba(255,255,255,0.03)'; ctx.fillRect(x,y,1,1); }
    const t=Date.now();
    for(let s of stars){ if(t < s.delay) continue; s.y += s.vy; if(s.y > H+50){ s.y = -50; s.x = Math.random()*W; s.vy = 2+Math.random()*6; } ctx.beginPath(); const grad=ctx.createLinearGradient(s.x,s.y,s.x,s.y - s.len); grad.addColorStop(0,'rgba(120,200,255,0.95)'); grad.addColorStop(1,'rgba(120,200,255,0.0)'); ctx.strokeStyle=grad; ctx.lineWidth=s.size; ctx.lineCap='round'; ctx.moveTo(s.x,s.y); ctx.lineTo(s.x, s.y - s.len); ctx.stroke(); ctx.beginPath(); ctx.fillStyle='rgba(180,230,255,1)'; ctx.arc(s.x,s.y,1.8*s.size,0,Math.PI*2); ctx.fill(); }
    requestAnimationFrame(draw);
  }
  draw();
})();


// --- Patched Login & Guest Handlers ---
document.getElementById('loginProceed')?.addEventListener('click', ()=>{
    const email = document.getElementById('loginEmail')?.value;
    const pass  = document.getElementById('loginPass')?.value;
    if(!email || !pass){
        alert("Isi email & password terlebih dahulu!");
        return;
    }
    localStorage.setItem("user", email);
    alert("Login berhasil!");
    toggleModal(false);
});

document.getElementById('guestProceed')?.addEventListener('click', ()=>{
    const em = document.getElementById('guestEmail')?.value || "guest";
    localStorage.setItem("user", em);
    alert("Masuk sebagai guest!");
    toggleModal(false);
});
// Tabs
const tGuest = document.getElementById("tabGuest");
const tLogin = document.getElementById("tabLogin");

const fGuest = document.getElementById("formGuest");
const fLogin = document.getElementById("formLogin");

tGuest.onclick = () => {
    tGuest.classList.add("active");
    tLogin.classList.remove("active");
    fGuest.classList.add("active");
    fLogin.classList.remove("active");
};

tLogin.onclick = () => {
    tLogin.classList.add("active");
    tGuest.classList.remove("active");
    fLogin.classList.add("active");
    fGuest.classList.remove("active");
};

// Guest
document.getElementById("guestBtn").onclick = () => {
    let em = document.getElementById("guestEmail").value || "guest";
    localStorage.setItem("user", em);
    alert("Masuk sebagai Guest!");
    window.location.href = "index.html";
};

// Login
document.getElementById("loginBtn").onclick = () => {
    let email = document.getElementById("loginEmail").value;
    let pass  = document.getElementById("loginPass").value;

    if(!email || !pass){
        alert("Isi email & password!");
        return;
    }

    localStorage.setItem("user", email);
    alert("Login berhasil!");
    window.location.href = "index.html";
};
