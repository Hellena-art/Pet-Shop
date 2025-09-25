
import {load, save} from './services/storage.js';

function stars(n){const f=Math.max(0,Math.min(5,Math.floor(n)));return '★'.repeat(f)+'☆'.repeat(5-f);}

function renderHome(){
  const promo=document.getElementById('promoGrid');
  const prod=document.getElementById('prodGrid');
  const busca=document.getElementById('busca');
  if(!promo && !prod) return;
  const itens=load();
  if(promo){
    promo.innerHTML=itens.filter(p=>p.oldPrice).map(p=>`
      <article class='card'>
        <img src='img/${p.imagem}' alt='${p.nome}'>
        <h3 class='prod-title'>${p.nome}</h3>
        <p>${p.descricao}</p>
        <p><span class='old'>R$ ${p.oldPrice.toFixed(2)}</span> <span class='price'>R$ ${p.preco.toFixed(2)}</span></p>
        <p class='stars'>${stars(p.rating)} <span class='small'>(${p.reviews} avaliações)</span></p>
        <button class='btn-cart'>Adicionar ao carrinho</button>
      </article>`).join('');
  }
  function draw(list){
    prod.innerHTML=list.map(p=>`
      <article class='card ${p.status==='inativo'?'esgotado':''}'>
        <img src='img/${p.imagem}' alt='${p.nome}'>
        <h3 class='prod-title'>${p.nome}</h3>
        <p>${p.descricao}</p>
        <p class='stars'>${stars(p.rating)} <span class='small'>(${p.reviews} avaliações)</span></p>
        <p class='price'>R$ ${p.preco.toFixed(2)}</p>
        ${p.status==='inativo' ? '<p class="sold">❌ Esgotado</p>' : '<button class="btn-cart">Adicionar ao carrinho</button>'}
      </article>`).join('');
  }
  if(prod){
    let list=[...itens]; draw(list);
    if(busca){busca.addEventListener('input',()=>{
      const q=busca.value.toLowerCase();
      list=itens.filter(p=>p.nome.toLowerCase().includes(q)||p.categoria.toLowerCase().includes(q));
      draw(list);
    });}
  }
}

function headerState(){
  const p=new URLSearchParams(location.search);
  const logged=p.get('logged');
  const a=document.getElementById('areaAuth');
  const u=document.getElementById('areaUser');
  if(!a||!u) return;
  if(logged==='1'){a.classList.add('hide');u.classList.remove('hide');}
  else{a.classList.remove('hide');u.classList.add('hide');}
  const out=document.getElementById('logoutBtn'); if(out){out.addEventListener('click',()=>location.href=location.pathname);}
}

function setupLogin(){
  const user=document.getElementById('user');
  const pass=document.getElementById('pass');
  const btn=document.getElementById('btnLogin');
  if(!btn) return;
  btn.addEventListener('click',()=>{
    const u=(user.value||'').trim().toLowerCase();
    const p=(pass.value||'').trim();
    if((u==='admin'||u==='cliente') && p==='1234'){
      if(u==='admin') location.href='admin.html';
      else location.href='index.html?logged=1&role=cliente';
    }else alert('Use: admin/1234 ou cliente/1234');
  });
}

function setupCadastro(){
  const btn=document.getElementById('btnCadastro');
  if(!btn) return;
  btn.addEventListener('click',()=>location.href='login.html');
}

function setupAdmin(){
  const form=document.getElementById('form');
  const body=document.querySelector('#tabela tbody');
  if(!form||!body) return;
  const render=()=>{
    const arr=load();
    body.innerHTML=arr.map(p=>`
      <tr><td>${p.nome}</td><td>R$ ${Number(p.preco).toFixed(2)}</td><td>${p.status}</td>
      <td><button onclick='editar(${p.id})'>✏️ Editar</button> <button onclick='excluir(${p.id})'>🗑️ Excluir</button></td></tr>`).join('');
  };
  window.editar=(id)=>{
    const arr=load(); const p=arr.find(x=>x.id==id); if(!p) return;
    form.id.value=p.id; form.nome.value=p.nome; form.preco.value=p.preco;
    form.oldPrice.value=p.oldPrice??''; form.descricao.value=p.descricao;
    form.status.value=p.status; form.imagem.value=p.imagem||''; window.scrollTo(0,0);
  };
  window.excluir=(id)=>{ if(!confirm('Excluir?')) return; const arr=load().filter(x=>x.id!=id); save(arr); render(); };
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const arr=load();
    const item={id: form.id.value?Number(form.id.value):Date.now(),
      nome:form.nome.value.trim(),preco:Number(form.preco.value),
      oldPrice:form.oldPrice.value?Number(form.oldPrice.value):null,
      descricao:form.descricao.value.trim(),status:form.status.value,
      imagem:form.imagem.value.trim()||'Bolinha.jpg'};
    const i=arr.findIndex(x=>x.id==item.id);
    if(i>-1){item.rating=arr[i].rating||4;item.reviews=arr[i].reviews||10;arr[i]=item;}
    else{item.rating=4;item.reviews=10;arr.push(item);}
    save(arr); form.reset(); render();
  });
  render();
}

document.addEventListener('DOMContentLoaded',()=>{
  renderHome(); headerState(); setupLogin(); setupCadastro(); setupAdmin();
});
