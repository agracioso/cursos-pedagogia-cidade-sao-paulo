/* Filtros e utilidades compartilhados entre as abas Mapa e Tabela */
(function(){
const KEY='pedagogia-sp-filtros-v1';
const DEF={raio:3,ref:'qualquer',formato:'todos',precoMax:'',busca:'',soSemAlerta:false};
function ler(){try{return Object.assign({},DEF,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){return Object.assign({},DEF)}}
function gravar(f){try{localStorage.setItem(KEY,JSON.stringify(f))}catch(e){}}
const brl=v=>v==null?'—':(v===0?'Gratuito':v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}));
const km=v=>v.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+' km';
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function dist(c,ref){return ref==='mooca'?c.dm:ref==='vm'?c.dv:Math.min(c.dm,c.dv)}
function filtrar(lista,f){
  const q=(f.busca||'').trim().toLowerCase();
  const pm=f.precoMax===''?null:Number(f.precoMax);
  return lista.filter(c=>{
    if(dist(c,f.ref)>Number(f.raio))return false;
    const sp=/semi/i.test(c.formato);
    if(f.formato==='semi'&&!sp)return false;
    if(f.formato==='ead'&&sp)return false;
    if(pm!=null&&!isNaN(pm)&&(c.preco==null||c.preco>pm))return false;
    if(f.soSemAlerta&&c.alertas.length)return false;
    if(q&&!(c.ies+' '+c.polo+' '+c.bairro+' '+c.endereco).toLowerCase().includes(q))return false;
    return true});
}
function montarFiltros(el,f,onChange){
  el.innerHTML=`
  <label>Raio: <span id="raioTxt"></span><input id="fRaio" type="range" min="0.5" max="8" step="0.5"></label>
  <label>Distância medida a partir de
    <select id="fRef"><option value="qualquer">Qualquer um dos CEPs</option><option value="mooca">03167-030 (Mooca)</option><option value="vm">04018-010 (Vila Mariana)</option></select></label>
  <label>Formato
    <select id="fFormato"><option value="todos">EaD e semipresencial</option><option value="semi">Só semipresencial</option><option value="ead">Só anunciados como EaD</option></select></label>
  <label>Mensalidade máx. (R$)<input id="fPreco" type="number" inputmode="numeric" min="0" step="10" placeholder="sem limite" style="width:140px"></label>
  <label>Buscar IES ou bairro<input id="fBusca" type="search" placeholder="ex.: São Judas, Mooca" style="width:200px"></label>
  <label class="chk"><input id="fSem" type="checkbox"> Ocultar ofertas com alerta</label>
  <div class="count" id="count"></div>`;
  const $=id=>el.querySelector('#'+id);
  $('fRaio').value=f.raio;$('fRef').value=f.ref;$('fFormato').value=f.formato;$('fPreco').value=f.precoMax;$('fBusca').value=f.busca;$('fSem').checked=f.soSemAlerta;
  const upd=()=>{f.raio=Number($('fRaio').value);f.ref=$('fRef').value;f.formato=$('fFormato').value;f.precoMax=$('fPreco').value;f.busca=$('fBusca').value;f.soSemAlerta=$('fSem').checked;
    $('raioTxt').textContent=km(f.raio);gravar(f);onChange(f)};
  ['fRaio','fRef','fFormato','fPreco','fBusca','fSem'].forEach(id=>$(id).addEventListener('input',upd));
  upd();
}
window.PED={ler,gravar,brl,km,esc,dist,filtrar,montarFiltros};
})();
