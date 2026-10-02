// B5 interactions
document.addEventListener('DOMContentLoaded',()=>{
  const ham=document.querySelector('.hamburger');
  const links=document.querySelector('.nav-links');
  // normalisasi ikon hamburger jadi 3 garis agar bisa animasi X
  if(ham&&!ham.querySelector('span')){ham.innerHTML='<span></span><span></span><span></span>';}
  // ===== Mobile dropdown menu =====
  const navbar=document.querySelector('.navbar');
  const closeMenu=()=>{if(!links)return;links.classList.remove('open');if(ham){ham.classList.remove('active');ham.setAttribute('aria-expanded','false');ham.setAttribute('aria-label','Buka menu navigasi');}};
  const openMenu=()=>{if(!links||!ham)return;links.classList.add('open');ham.classList.add('active');ham.setAttribute('aria-expanded','true');ham.setAttribute('aria-label','Tutup menu navigasi');};
  if(ham&&links){
    ham.setAttribute('aria-expanded','false');
    ham.setAttribute('aria-controls','navLinks');
    if(!links.id)links.id='navLinks';
    ham.addEventListener('click',(e)=>{e.stopPropagation();links.classList.contains('open')?closeMenu():openMenu();});
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('click',(e)=>{if(links.classList.contains('open')&&!links.contains(e.target)&&!ham.contains(e.target))closeMenu();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
    window.addEventListener('resize',()=>{if(window.innerWidth>900)closeMenu();});
  }
  // bayangan navbar saat scroll
  if(navbar){const onScroll=()=>navbar.classList.toggle('scrolled',window.scrollY>8);window.addEventListener('scroll',onScroll,{passive:true});onScroll();}
  // reveal on scroll
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  // ===== Katalog produk: filter + search =====
  const btns=document.querySelectorAll('.filter-btn');
  const cards=document.querySelectorAll('[data-cat]');
  const titles=document.querySelectorAll('.cat-title');
  const subs=document.querySelectorAll('[data-sub]');
  const search=document.getElementById('shopSearch');
  const clearBtn=document.getElementById('shopClear');
  const count=document.getElementById('shopCount');
  const emptyBox=document.getElementById('prodEmpty');
  const resetBtn=document.getElementById('prodReset');
  let activeFilter='semua';
  const applyShop=()=>{
    const q=(search?search.value:'').trim().toLowerCase();
    let shown=0;
    cards.forEach(c=>{
      const inCat=(activeFilter==='semua'||c.dataset.cat===activeFilter);
      const text=(c.querySelector('h3')?.textContent+' '+(c.querySelector('.pkat')?.textContent||'')+' '+(c.querySelector('p')?.textContent||'')).toLowerCase();
      const inSearch=(!q||text.includes(q));
      const vis=inCat&&inSearch;
      c.style.display=vis?'':'none';
      if(vis)shown++;
    });
    titles.forEach(t=>{
      const group=t.dataset.group;
      const hasVisible=[...cards].some(c=>c.style.display!==''||false);
      let any=[...cards].some(c=>c.dataset.cat===group&&c.style.display!=='none');
      t.style.display=((activeFilter==='semua'||activeFilter===group)||((activeFilter==='semua'||q)&&any))?'':'none';
      if(q&&!any)t.style.display='none';
      if(!q&&(activeFilter==='semua'||activeFilter===group))t.style.display='';
    });
    subs.forEach(s=>{
      const g=s.dataset.sub;
      const any=[...cards].some(c=>c.dataset.cat===g&&c.style.display!=='none');
      const showTitle=[...titles].some(t=>t.dataset.group===g&&t.style.display!=='none');
      s.style.display=(any&&showTitle)?'':'none';
    });
    if(count)count.innerHTML='<b>'+shown+'</b> PRODUK';
    if(emptyBox)emptyBox.classList.toggle('show',shown===0);
    if(clearBtn)clearBtn.classList.toggle('show',!!q);
  };
  const setFilter=(f)=>{activeFilter=f;btns.forEach(x=>x.classList.toggle('active',x.dataset.filter===f));applyShop();};
  btns.forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));
  if(search)search.addEventListener('input',applyShop);
  if(clearBtn)clearBtn.addEventListener('click',()=>{if(search)search.value='';applyShop();if(search)search.focus();});
  if(resetBtn)resetBtn.addEventListener('click',()=>{if(search)search.value='';setFilter('semua');});
  if(btns.length)applyShop();
  // nomor WhatsApp utama B5
  const WA1='6281224944782';
  // contact form -> WhatsApp
  const form=document.getElementById('contactForm');
  if(form){form.addEventListener('submit',e=>{
    e.preventDefault();
    const n=document.getElementById('fNama').value;
    const w=document.getElementById('fWa').value;
    const k=document.getElementById('fButuh').value;
    const p=document.getElementById('fPesan').value;
    const msg=`Halo B5! Saya ${n} (${w}). Kebutuhan: ${k}. Pesan: ${p}`;
    window.open('https://wa.me/'+WA1+'?text='+encodeURIComponent(msg),'_blank');
  });}
});
function tanyaProduk(nama){
  const msg=`Halo B5! Saya mau tanya tentang produk: ${nama}`;
  window.open('https://wa.me/6281224944782?text='+encodeURIComponent(msg),'_blank');
}
