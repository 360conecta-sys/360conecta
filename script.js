// Site 360 CONECTA — conteúdo estático editável pelo GitHub.
// Atualize o contato abaixo com o WhatsApp (código do país + DDD + número, sem símbolos).
const WHATSAPP_NUMBER = "5500000000000";
const contactMessage = encodeURIComponent("Olá! Quero saber mais sobre divulgação no 360 CONECTA.");

// Aplica a identidade e a localização informadas para o portal.
document.querySelectorAll(".logo").forEach(logo => {
  logo.href = "index.html";
  logo.setAttribute("aria-label", "360 CONECTA — Seu portal regional de negócios");
  logo.innerHTML = '<img src="logo.svg" alt="360 CONECTA — Seu portal regional de negócios" width="170" height="54">';
});
document.querySelectorAll(".location b").forEach(element => {
  element.textContent = "Caçapava do Sul e região";
});
document.querySelectorAll(".city").forEach(element => {
  element.textContent = "⌖ Caçapava do Sul";
});
const heroTitle = document.querySelector(".hero h1");
if (heroTitle) heroTitle.textContent = "Seu portal regional de negócios!";
const heroSubtitle = document.querySelector(".hero p");
if (heroSubtitle) heroSubtitle.textContent = "Encontre empresas, aproveite ofertas e divulgue seu negócio em Caçapava do Sul e região.";
const aboutTitle = document.querySelector(".about-panel h2");
if (aboutTitle) aboutTitle.textContent = "Especialista em classificados regionais";
const aboutParagraphs = document.querySelectorAll(".about-panel p");
if (aboutParagraphs.length) {
  aboutParagraphs[0].textContent = "O 360 CONECTA é uma empresa especializada em classificados, conectando empresas, ofertas e clientes de Caçapava do Sul e região.";
}

document.querySelectorAll(".whatsapp-link").forEach(link => {
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${contactMessage}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

// A busca do cabeçalho abre o diretório de anunciantes com o termo informado.
document.querySelectorAll(".search-form").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const query = form.querySelector('input[name="q"]').value.trim();
    window.location.href = `anunciantes.html${query ? `?q=${encodeURIComponent(query)}` : ""}`;
  });
});

// Busca e filtro da página de anunciantes.
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
