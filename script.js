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
