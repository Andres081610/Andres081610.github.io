/* Utilidades compartidas por las guías interactivas */
(function(){
  var G = window.G = {};
  /* formato con prefijos SI y coma decimal: G.si(0.0042,'A') -> "4,2 mA" */
  G.si = function(v,u,d){d=d||3;if(!isFinite(v))return '—';if(v===0)return '0 '+u;
    var a=Math.abs(v),PF=[[1e9,'G'],[1e6,'M'],[1e3,'k'],[1,''],[1e-3,'m'],[1e-6,'µ'],[1e-9,'n']],f=1e-9,p='n';
    for(var i=0;i<PF.length;i++){if(a>=PF[i][0]*0.9995){f=PF[i][0];p=PF[i][1];break;}}
    var s=(v/f).toPrecision(d);if(s.indexOf('e')>=0)s=String(+s);
    if(s.indexOf('.')>=0)s=s.replace(/0+$/,'').replace(/\.$/,'');
    return s.replace('.',',')+' '+p+u;};
  G.fx = function(v,d){if(!isFinite(v))return '—';return (+v.toFixed(d==null?2:d)).toLocaleString('es-ES');};
  G.$ = function(s,r){return (r||document).querySelector(s);};
  G.$$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
  G.reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  G.store = function(key){var o={};try{o=JSON.parse(localStorage.getItem(key)||'{}')||{};}catch(e){}
    return {get:function(k,d){return k in o?o[k]:d;},set:function(k,v){o[k]=v;try{localStorage.setItem(key,JSON.stringify(o));}catch(e){}}};};
  /* color del sitio leído de las variables CSS (cambia con el tema) */
  G.css = function(name){return getComputedStyle(document.documentElement).getPropertyValue(name).trim();};
  G.onTheme = function(fn){new MutationObserver(fn).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});};

  function init(){
    /* índice en chips a partir de las secciones con id */
    var nav=document.querySelector('[data-gtoc]');
    if(nav){
      var secs=G.$$('.guia > section[id]');
      secs.forEach(function(s){var h=s.querySelector('h2');if(!h)return;var a=document.createElement('a');
        a.href='#'+s.id;a.textContent=s.dataset.toc||h.textContent;nav.appendChild(a);});
      if(!nav.children.length)nav.remove();
      else if('IntersectionObserver' in window){
        var links=G.$$('a',nav);
        var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){
          links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id);});}});},{rootMargin:'-30% 0px -60% 0px'});
        secs.forEach(function(s){io.observe(s);});
      }
    }
    /* pestañas: <div class="tabs"><div class="tablist"><button data-tab="a">…</button></div><div class="tabpanel" data-panel="a">… */
    G.$$('.guia .tabs').forEach(function(t,ti){
      var btns=G.$$('.tablist button',t),pans=G.$$('.tabpanel',t);
      t.querySelector('.tablist').setAttribute('role','tablist');
      btns.forEach(function(b,i){b.type='button';b.setAttribute('role','tab');b.id='tab-'+ti+'-'+i;
        if(pans[i]){pans[i].setAttribute('role','tabpanel');pans[i].setAttribute('aria-labelledby',b.id);}
        b.addEventListener('click',function(){btns.forEach(function(x,j){x.setAttribute('aria-selected',j===i);if(pans[j])pans[j].hidden=j!==i;});});
        b.addEventListener('keydown',function(e){var k=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(k){var n=btns[(i+k+btns.length)%btns.length];n.focus();n.click();}});
      });
      if(btns[0])btns[0].click();
    });
    /* quiz: <div class="quiz"><p class="q">…</p><div class="opts"><button data-ok>…</button><button data-why="…">…</button></div><p class="fb"></p> */
    G.$$('.guia .quiz').forEach(function(q){
      var fb=q.querySelector('.fb');if(fb)fb.setAttribute('aria-live','polite');
      G.$$('.opts button',q).forEach(function(b){b.type='button';b.addEventListener('click',function(){
        G.$$('.opts button',q).forEach(function(x){x.classList.remove('right','wrong');});
        var ok=b.hasAttribute('data-ok');b.classList.add(ok?'right':'wrong');
        if(fb)fb.textContent=(ok?'✔ Correcto. ':'✘ No exactamente. ')+(b.dataset.why||'');
      });});
    });
    /* checklist con progreso guardado: <ul class="chk" data-chk="clave"> */
    G.$$('.guia [data-chk]').forEach(function(ul){
      var st=G.store('chk-'+ul.dataset.chk),boxes=G.$$('input[type=checkbox]',ul),bar=document.querySelector('[data-chkbar="'+ul.dataset.chk+'"] i');
      function up(){var n=boxes.filter(function(b){return b.checked;}).length;if(bar)bar.style.width=(100*n/boxes.length)+'%';
        var o=document.querySelector('[data-chkout="'+ul.dataset.chk+'"]');if(o)o.textContent=n+' de '+boxes.length;}
      boxes.forEach(function(b,i){b.checked=!!st.get(i,false);b.addEventListener('change',function(){st.set(i,b.checked);up();});});up();
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
