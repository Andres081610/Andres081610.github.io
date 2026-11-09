(function(){
  // menú móvil
  var mb=document.querySelector('[data-menu]'),nav=document.querySelector('[data-nav]');
  if(mb)mb.onclick=function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)};
  var still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  // modo claro / oscuro (se recuerda la elección)
  var tb=document.querySelector('[data-theme-toggle]'),tm=document.querySelector('meta[name=theme-color]');
  function setTheme(t){if(t==='light')document.documentElement.dataset.theme='light';else delete document.documentElement.dataset.theme;
    if(tm)tm.content=t==='light'?'#f6f8fb':'#0d1117';try{localStorage.setItem('tema',t)}catch(e){}}
  if(tb)tb.onclick=function(){setTheme(document.documentElement.dataset.theme==='light'?'dark':'light')};
  function rgb(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim()}
  // formulario de tutorías → correo prellenado
  var tf=document.querySelector('[data-tform]');
  if(tf){document.querySelectorAll('[data-plan]').forEach(function(a){a.addEventListener('click',function(){var m=tf.querySelector('[name=modalidad]');if(m)m.value=a.dataset.plan})});
    tf.addEventListener('submit',function(e){e.preventDefault();var f=new FormData(tf);
      var subject='Tutoría: '+f.get('tipo')+' ('+f.get('modalidad')+')';
      var body='Hola Andrés,\n\nMe llamo '+f.get('nombre')+' ('+f.get('correo')+').\n\nTipo de ayuda: '+f.get('tipo')+'\nModalidad: '+f.get('modalidad')+'\nNivel: '+f.get('nivel')+'\nPara cuándo: '+(f.get('fecha')||'-')+'\n\n'+f.get('detalle')+'\n\n(Adjunto fotos o archivos si es necesario.)';
      location.href='mailto:'+tf.dataset.email+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
      var ok=tf.querySelector('[data-form-ok]');if(ok)ok.hidden=false});}
  // brillo que sigue el mouse
  document.querySelectorAll('.spot').forEach(function(el){el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();
    el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')})});
  // botón copiar en bloques de código
  document.querySelectorAll('.prose pre').forEach(function(pre){var b=document.createElement('button');b.className='copy-btn';b.type='button';b.textContent='Copiar';
    b.onclick=function(){var t=pre.querySelector('code')||pre;navigator.clipboard&&navigator.clipboard.writeText(t.innerText).then(function(){b.textContent='¡Copiado!';b.classList.add('ok');
      setTimeout(function(){b.textContent='Copiar';b.classList.remove('ok')},1800)})};pre.appendChild(b)});
  // barra de lectura y volver arriba
  var pg=document.querySelector('[data-progress]'),top=document.querySelector('[data-top]');
  function onScroll(){var h=document.documentElement,max=h.scrollHeight-h.clientHeight;
    if(pg)pg.style.width=(max>0?h.scrollTop/max*100:0)+'%';if(top)top.classList.toggle('show',h.scrollTop>600)}
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  // aparición al hacer scroll
  var rv=document.querySelectorAll('.bento-item,.service,.card,.gallery figure,.sec-title,.cta,.plan,.steps li,.tutor-band');
  if('IntersectionObserver' in window&&!still){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    rv.forEach(function(el){el.classList.add('reveal');io.observe(el)})}
  // animación de circuito en la portada
  var cv=document.querySelector('[data-circuit]');
  if(cv&&cv.getContext){var cx=cv.getContext('2d'),W,H,G=32,tr=[],dpr=Math.min(devicePixelRatio||1,2);
    function size(){W=cv.offsetWidth;H=cv.offsetHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0)}
    function nt(){var x=Math.round(Math.random()*W/G)*G,y=Math.round(Math.random()*H/G)*G,c=Math.random()<.7?rgb('--cyan-rgb'):rgb('--mag-rgb');
      return{p:[[x,y]],c:c,life:0,max:20+Math.random()*30}}
    size();addEventListener('resize',size);for(var i=0;i<26;i++)tr.push(nt());
    function step(){cx.globalCompositeOperation='destination-out';cx.fillStyle='rgba(0,0,0,.08)';cx.fillRect(0,0,W,H);cx.globalCompositeOperation='source-over';
      tr.forEach(function(t,i){var l=t.p[t.p.length-1],d=[[G,0],[0,G],[0,-G],[G,G],[G,-G]][Math.floor(Math.random()*5)];
        var n=[l[0]+d[0],l[1]+d[1]];cx.strokeStyle='rgba('+t.c+',.85)';cx.shadowColor='rgba('+t.c+',1)';cx.shadowBlur=10;cx.lineWidth=1.6;
        cx.beginPath();cx.moveTo(l[0],l[1]);cx.lineTo(n[0],n[1]);cx.stroke();t.p.push(n);t.life++;
        if(t.life>t.max||n[0]>W||n[1]<0||n[1]>H){cx.beginPath();cx.arc(n[0],n[1],3.5,0,7);cx.fillStyle='rgba('+t.c+',1)';cx.fill();tr[i]=nt()}});
      cx.shadowBlur=0;if(!still)setTimeout(function(){requestAnimationFrame(step)},55)}
    step();if(still)for(var k=0;k<60;k++)step();}
  // filtros + búsqueda
  var cards=[].slice.call(document.querySelectorAll('.cards .card')),f='*',q='';
  var empty=document.querySelector('[data-empty]');
  function apply(){var n=0;cards.forEach(function(c){
    var okF=f==='*'||(c.dataset.tags||'').split(',').indexOf(f)>-1;
    var okQ=!q||c.textContent.toLowerCase().indexOf(q)>-1;
    c.hidden=!(okF&&okQ);if(!c.hidden)n++});if(empty)empty.hidden=n>0}
  document.querySelectorAll('[data-filters] .chip').forEach(function(b){b.onclick=function(){
    document.querySelectorAll('[data-filters] .chip').forEach(function(x){x.setAttribute('aria-pressed','false')});
    b.setAttribute('aria-pressed','true');f=b.dataset.f;apply()}});
  var s=document.querySelector('[data-search]');if(s)s.oninput=function(){q=s.value.trim().toLowerCase();apply()};
  // índice automático del tutorial
  var toc=document.querySelector('[data-toc]');
  if(toc){document.querySelectorAll('.prose h2').forEach(function(h,i){
    if(!h.id)h.id='paso-'+(i+1);var li=document.createElement('li');
    li.innerHTML='<a href="#'+h.id+'"></a>';li.firstChild.textContent=h.textContent;toc.appendChild(li)});
    if(!toc.children.length)toc.parentNode.removeChild(toc.previousElementSibling),toc.remove();}
  // visor de imágenes (← → Esc)
  var imgs=[].slice.call(document.querySelectorAll('img[data-zoom]'));if(!imgs.length)return;
  var lb=document.createElement('div');lb.className='lb';lb.hidden=true;
  lb.innerHTML='<button class="x" aria-label="Cerrar">✕</button><button class="p" aria-label="Anterior">←</button><img alt=""><p></p><button class="n" aria-label="Siguiente">→</button>';
  document.body.appendChild(lb);var im=lb.querySelector('img'),cap=lb.querySelector('p'),k=0;
  function show(i){k=(i+imgs.length)%imgs.length;im.src=imgs[k].currentSrc||imgs[k].src;cap.textContent=imgs[k].alt+'  ·  '+(k+1)+'/'+imgs.length;lb.hidden=false}
  imgs.forEach(function(el,i){el.onclick=function(){show(i)}});
  lb.querySelector('.x').onclick=function(){lb.hidden=true};
  lb.querySelector('.p').onclick=function(){show(k-1)};lb.querySelector('.n').onclick=function(){show(k+1)};
  lb.onclick=function(e){if(e.target===lb)lb.hidden=true};
  document.addEventListener('keydown',function(e){if(lb.hidden)return;
    if(e.key==='Escape')lb.hidden=true;if(e.key==='ArrowLeft')show(k-1);if(e.key==='ArrowRight')show(k+1)});
})();
