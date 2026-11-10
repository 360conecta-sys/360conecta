// Site estático 360 CONECTA. Edite o número de contato e os dados dos HTMLs diretamente no GitHub.
// WhatsApp: código do país + DDD + telefone, somente números.
const WHATSAPP_NUMBER = "5500000000000";
const contactMessage = encodeURIComponent("Olá! Quero saber mais sobre divulgação no 360 CONECTA.");

// Mantém a marca do cabeçalho e rodapé no formato original do portal.
document.querySelectorAll(".logo").forEach(logo => {
  logo.href = "index.html";
  logo.setAttribute("aria-label", "360 CONECTA — início");
  logo.innerHTML = '<span class="logo-mark">360</span><span>360 <strong>CONECTA</strong></span>';
});
document.querySelectorAll(".location b").forEach(element => {
  element.textContent = "Empresas da sua cidade";
});

// Estende visualmente as laterais de banners sem cortar nem distorcer a imagem original.
const adaptiveBannerStyle = document.createElement("style");
adaptiveBannerStyle.textContent = `
  .adaptive-banner-frame {
    position: relative;
    isolation: isolate;
    display: block;
    width: 100%;
    aspect-ratio: 2.5 / 1;
    min-height: 180px;
    max-height: 420px;
    overflow: hidden;
    background: #111;
  }
  .adaptive-banner-frame::before {
    content: "";
    position: absolute;
    z-index: 0;
    inset: -18px;
    background-image: var(--banner-image);
    background-position: center;
    background-size: 100% 100%;
    filter: blur(18px) brightness(.8);
    transform: scale(1.04);
  }
  .adaptive-banner-frame > img {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    max-height: none;
    margin: 0;
    object-fit: contain;
    object-position: center;
  }
  .adaptive-banner-frame.client-ad-frame {
    height: 100%;
    min-height: 180px;
    max-height: 420px;
    aspect-ratio: auto;
  }
`;
document.head.append(adaptiveBannerStyle);

function enhanceBannerImage(image) {
  if (!(image instanceof HTMLImageElement) || image.parentElement?.classList.contains("adaptive-banner-frame")) return;
  if (!image.classList.contains("profile-cover-image") && !image.classList.contains("client-ad-image")) return;
  const frame = document.createElement("div");
  frame.className = `adaptive-banner-frame${image.classList.contains("client-ad-image") ? " client-ad-frame" : " profile-cover-frame"}`;
  const imageUrl = image.currentSrc || image.src;
  frame.style.setProperty("--banner-image", `url(${JSON.stringify(imageUrl)})`);
  image.parentNode.insertBefore(frame, image);
  frame.append(image);
}

document.querySelectorAll(".profile-cover-image, .client-ad-image").forEach(enhanceBannerImage);
// A ficha do anunciante é montada dinamicamente; observa banners inseridos depois da carga.
new MutationObserver(records => {
  records.forEach(record => record.addedNodes.forEach(node => {
    if (node instanceof HTMLImageElement) enhanceBannerImage(node);
    else if (node instanceof Element) node.querySelectorAll?.(".profile-cover-image, .client-ad-image").forEach(enhanceBannerImage);
  }));
}).observe(document.documentElement, { childList: true, subtree: true });

// Exibe a arte da Eric Transportes no primeiro espaço publicitário da página inicial.
const adBox = document.querySelector(".ad-grid .ad-box");
if (adBox) {
  const adImageUrl = "https://i.postimg.cc/L4ZNNBTB/Whats-App-Image-2026-11-09-at-17-53-35.jpg";
  const adLink = document.createElement("a");
  adLink.className = "client-ad-link";
  adLink.href = "https://wa.me/5555933804369";
  adLink.target = "_blank";
  adLink.rel = "noopener noreferrer";
  adLink.setAttribute("aria-label", "Anúncio da Eric Transportes — entrar em contato pelo WhatsApp");
  const adImage = document.createElement("img");
  adImage.className = "client-ad-image";
  adImage.src = adImageUrl;
  adImage.alt = "Eric Transportes — fretes, transportes e mudanças. Contato pelo WhatsApp.";
  adLink.append(adImage);
  adBox.replaceChildren(adLink);
  adBox.classList.add("client-ad-box");
  const adStyle = document.createElement("style");
  adStyle.textContent = ".client-ad-box{padding:0!important;overflow:hidden}.client-ad-link{display:block;width:100%;height:100%;min-height:180px}";
  document.head.append(adStyle);
}

document.querySelectorAll(".whatsapp-link").forEach(link => {
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${contactMessage}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

document.querySelectorAll(".search-form").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const query = form.querySelector('input[name="q"]').value.trim();
    window.location.href = `anunciantes.html${query ? `?q=${encodeURIComponent(query)}` : ""}`;
  });
});

const params = new URLSearchParams(window.location.search);
const queryInput = document.querySelector("#directorySearch");
const categoryFilter = document.querySelector("#categoryFilter");
const directoryCards = [...document.querySelectorAll("#companyList .company-card")];
const emptyState = document.querySelector(".empty-state");
if (queryInput) queryInput.value = params.get("q") || "";
if (categoryFilter && params.has("category")) categoryFilter.value = params.get("category");
function filterDirectory() {
  if (!directoryCards.length) return;
  const query = (queryInput?.value || params.get("q") || "").toLocaleLowerCase("pt-BR");
  const category = categoryFilter?.value || params.get("category") || "";
  let visible = 0;
  directoryCards.forEach(card => {
    const matchesQuery = card.textContent.toLocaleLowerCase("pt-BR").includes(query);
    const matchesCategory = !category || card.dataset.category === category;
    card.hidden = !(matchesQuery && matchesCategory);
    if (!card.hidden) visible++;
  });
  if (emptyState) emptyState.hidden = visible > 0;
}
queryInput?.addEventListener("input", filterDirectory);
categoryFilter?.addEventListener("change", filterDirectory);
filterDirectory();
