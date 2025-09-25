
export const KEY='petvibe_produtos_v2';
export const seed=[
 {id:1,nome:'Shampoo Hipoalergênico',categoria:'Higiene',preco:39.90,oldPrice:49.90,descricao:'Ultra hidratante para peles sensíveis.',status:'ativo',imagem:'shampoo.jpg',rating:5,reviews:320},
 {id:2,nome:'Condicionador',categoria:'Higiene',preco:45.50,oldPrice:null,descricao:'Desembaraça e dá brilho.',status:'ativo',imagem:'Condicionador.jpg',rating:4,reviews:180},
 {id:3,nome:'Ração Cachorro',categoria:'Alimentação',preco:159.90,oldPrice:null,descricao:'Premium para cães adultos.',status:'ativo',imagem:'Ração_cachorro.jpg',rating:5,reviews:450},
 {id:4,nome:'Ração Gato',categoria:'Alimentação',preco:129.90,oldPrice:null,descricao:'Super premium para gatos.',status:'ativo',imagem:'Ração_gato.jpg',rating:4,reviews:210},
 {id:5,nome:'Bifinhos Quatree',categoria:'Petisco',preco:9.90,oldPrice:12.90,descricao:'Petisco sabor carne.',status:'ativo',imagem:'petisco.jpg',rating:4,reviews:95},
 {id:6,nome:'Cama Confort',categoria:'Acessórios',preco:99.90,oldPrice:null,descricao:'Confortável e macia.',status:'ativo',imagem:'Cama.jpg',rating:5,reviews:150},
 {id:7,nome:'Coleira Identificação',categoria:'Acessórios',preco:49.90,oldPrice:null,descricao:'Com plaquinha personalizada.',status:'ativo',imagem:'Coleira.jpg',rating:4,reviews:75},
 {id:8,nome:'Brinquedo para Gatos',categoria:'Brinquedos',preco:45.00,oldPrice:null,descricao:'Torre interativa.',status:'ativo',imagem:'Brinquedo_Gato.jpg',rating:4,reviews:60},
 {id:9,nome:'Bola Interativa',categoria:'Brinquedos',preco:22.90,oldPrice:null,descricao:'Estimula atividade física.',status:'ativo',imagem:'Bolinha.jpg',rating:4,reviews:50},
 {id:10,nome:'Perfume Pet Clean',categoria:'Higiene',preco:25.00,oldPrice:null,descricao:'Aroma suave diário.',status:'inativo',imagem:'Perfume.jpg',rating:4,reviews:40},
 {id:11,nome:'Hidratante de Patinhas',categoria:'Higiene',preco:28.90,oldPrice:null,descricao:'Protege contra rachaduras.',status:'inativo',imagem:'Hidratante.jpg',rating:4,reviews:30},
 {id:12,nome:'Casa para Gato',categoria:'Acessórios',preco:299.90,oldPrice:null,descricao:'Com nichos de descanso.',status:'inativo',imagem:'Casa_gato.jpg',rating:4,reviews:25},
 {id:13,nome:'Bebedouro/Comedouro Automático',categoria:'Acessórios',preco:189.90,oldPrice:null,descricao:'Praticidade e autonomia.',status:'ativo',imagem:'bebedouro-comedouro-automatico.jpg',rating:4,reviews:88}
];
export function load(){const raw=localStorage.getItem(KEY);if(!raw){localStorage.setItem(KEY,JSON.stringify(seed));return [...seed];}try{return JSON.parse(raw);}catch(e){localStorage.setItem(KEY,JSON.stringify(seed));return [...seed];}}
export function save(arr){localStorage.setItem(KEY,JSON.stringify(arr));}
