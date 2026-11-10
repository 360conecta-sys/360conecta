// Cadastro dos anunciantes: edite este arquivo no GitHub para adicionar ou atualizar empresas.
// Cada anunciante ganha uma página em anunciante.html?id=ID.
// Para banner horizontal padronizado, recomendamos 1600 x 500 px (proporção 3.2:1).
// Informe a URL/caminho da imagem em cover. Se ficar vazio, a área fica vazia e sem texto.
window.ADVERTISERS = [
  {
    id: "360-conecta",
    name: "360 CONECTA",
    category: "Classificados",
    description: "Empresa especializada em classificados. Encontre empresas, aproveite ofertas e divulgue seu negócio.",
    city: "Caçapava do Sul",
    phone: "5500000000000",
    logo: "logo.svg",
    cover: "",
    photos: []
  },
  {
    id: "erick-transportes-viagens",
    name: "Erick Transportes e Viagens",
    category: "Transportes",
    description: "Fretes, transportes e mudanças em Caçapava do Sul. Entre em contato pelo WhatsApp para consultar disponibilidade e serviços.",
    city: "Caçapava do Sul",
    phone: "5555933804369",
    logo: "https://i.postimg.cc/L4ZNNBTB/Whats-App-Image-2026-11-09-at-17-53-35.jpg",
    cover: "https://i.postimg.cc/L4ZNNBTB/Whats-App-Image-2026-11-09-at-17-53-35.jpg",
    photos: []
  },
  {
    id: "cia-47-mobilidade-urbana",
    name: "Cia 47 mobilidade urbana",
    category: "Transporte e Entregas",
    description: "Mobilidade urbana. Baixe o aplicativo Cia 47 para Android.",
    city: "Caçapava do Sul",
    phone: "5500000000000",
    logo: "https://i.postimg.cc/1RknCSzB/Whats-App-Image-2026-11-10-at-14-47-02.jpg",
    cover: "https://i.postimg.cc/1RknCSzB/Whats-App-Image-2026-11-10-at-14-47-02.jpg",
    appLink: "https://play.google.com/store/apps/details?id=br.com.cia47.passenger.drivermachine&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAac1rOWmP50bTvak6PHnVYDwKpgqCY_z1KI5qYuafAw_nwPZkbJVqyvafCGfow_aem_Qcr9N0lTOpOfuS6atJWDkw",
    photos: []
  },
  {
    id: "auto-center-exemplo",
    name: "Auto Center Exemplo",
    category: "Oficinas e Mecânicas",
    description: "Mecânica geral, troca de óleo, freios e suspensão.",
    city: "Caçapava do Sul",
    phone: "5500000000000",
    logo: "",
    cover: "",
    photos: []
  },
  {
    id: "padaria-modelo",
    name: "Padaria Modelo",
    category: "Alimentação",
    description: "Pães artesanais, bolos e café da manhã.",
    city: "Caçapava do Sul",
    phone: "5500000000000",
    logo: "",
    cover: "",
    photos: []
  },
  {
    id: "studio-beleza-demo",
    name: "Studio Beleza Demo",
    category: "Beleza e Estética",
    description: "Cortes, coloração e serviços de estética.",
    city: "Caçapava do Sul",
    phone: "5500000000000",
    logo: "",
    cover: "",
    photos: []
  },
  {
    id: "construtora-exemplo",
    name: "Construtora Exemplo",
    category: "Construção e Reformas",
    description: "Obras, reformas e projetos para sua casa.",
    city: "Caçapava do Sul",
    phone: "5500000000000",
    logo: "",
    cover: "",
    photos: []
  }
];

// Faz as imagens de banner preencherem a área, sem faixas vazias nas laterais.
const bannerImageStyle = document.createElement("style");
bannerImageStyle.textContent = `
  .advertiser-profile .profile-cover-image {
    display: block;
    width: 100%;
    height: clamp(240px, 32vw, 420px);
    object-fit: cover;
    object-position: center;
  }
  @media (max-width: 640px) {
    .advertiser-profile .profile-cover-image {
      height: 240px;
    }
  }
`;
document.head.append(bannerImageStyle);
