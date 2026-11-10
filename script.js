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

// Amplia visualmente as laterais dos banners de perfil, mantendo a arte inteira no centro.
const bannerStyle = document.createElement("style");
bannerStyle.textContent = `
  .adaptive-banner-frame {
    position: relative !important;
    isolation: isolate !important;
    display: block !important;
    width: 100% !important;
    aspect-ratio: 2.5 / 1 !important;
    min-height: 180px !important;
    max-height: 420px !important;
    overflow: hidden !important;
    background: #111 !important;
  }
  .adaptive-banner-frame::before {
    content: "" !important;
    position: absolute !important;
    z-index: 0 !important;
    inset: -20px !important;
    background-image: var(--banner-image) !important;
    background-position: center !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    filter: blur(14px) brightness(.78) !important;
    transform: scale(1.05) !important;
  }
  .adaptive-banner-frame > img {
    position: relative !important;
    z-index: 1 !important;
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    max-height: none !important;
    margin: 0 auto !important;
    object-fit: contain !important;
    object-position: center !important;
    background: transparent !important;
  }
`;
document.head.append(bannerStyle);

function enhanceProfileBanner(image) {
  if (!(image instanceof HTMLImageElement) || image.parentElement?.classList.contains("adaptive-banner-frame")) return;
  if (!image.classList.contains("profile-cover-image")) return;
  const frame = document.createElement("div");
  frame.className = "adaptive-banner-frame profile-cover-frame";
  frame.style.setProperty("--banner-image", `url("${(image.currentSrc || image.src).replaceAll('"', '%22')}")`);
  image.parentNode.insertBefore(frame, image);
  frame.append(image);
}

// A ficha do anunciante é montada dinamicamente pelo gerador.
document.querySelectorAll(".profile-cover-image").forEach(enhanceProfileBanner);
new MutationObserver(records => {
  records.forEach(record => record.addedNodes.forEach(node => {
    if (node instanceof HTMLImageElement) enhanceProfileBanner(node);
    else if (node instanceof Element) node.querySelectorAll?.(".profile-cover-image").forEach(enhanceProfileBanner);
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
  // Restaura o anúncio ao visual simples anterior, sem extensão desfocada nas laterais.
  const adStyle = document.createElement("style");
  adStyle.textContent = ".client-ad-box{padding:0!important;overflow:hidden}.client-ad-link{display:flex;width:100%;height:100%;align-items:center;justify-content:center}.client-ad-image{display:block;width:100%;height:100%;max-height:240px;object-fit:contain;object-position:center;border-radius:inherit}";
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
