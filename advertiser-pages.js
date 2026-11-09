// Cria as fichas a partir de advertisers-data.js. Site estático: conteúdo editado pelo GitHub.
(() => {
  const advertisers = window.ADVERTISERS || [];
  const escapeHtml = value => String(value || "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const params = new URLSearchParams(location.search);

  const list = document.querySelector("#companyList");
  if (list) {
    // Mantém a arte do anunciante contida no espaço da foto, sem invadir o texto do cartão.
    const cardImageStyles = document.createElement("style");
    cardImageStyles.textContent = `
      #companyList .company-art.advertiser-card-art{position:relative;display:flex;align-items:center;justify-content:center;height:190px;min-height:190px;overflow:hidden;background:#080808}
      #companyList .advertiser-card-art .advertiser-card-logo{position:static;display:block;width:100%;height:100%;max-width:100%;max-height:100%;padding:8px;object-fit:contain;object-position:center}
    `;
    document.head.append(cardImageStyles);

    const categoryFilter = document.querySelector("#categoryFilter");
    const categories = [...new Set(advertisers.map(item => item.category).filter(Boolean))];
    categories.forEach(category => {
      if (![...categoryFilter.options].some(option => option.value === category)) {
        const option = document.createElement("option"); option.value = category; option.textContent = category; categoryFilter.append(option);
      }
    });
    list.innerHTML = advertisers.map(item => {
      const art = item.logo
        ? `<img src="${escapeHtml(item.logo)}" alt="Logo ${escapeHtml(item.name)}" class="advertiser-card-logo">`
        : `<div class="advertiser-initial">${escapeHtml(item.name.slice(0, 1))}</div>`;
      return `<article class="company-card" data-category="${escapeHtml(item.category)}" data-search="${escapeHtml(`${item.name} ${item.category} ${item.description} ${item.city}`)}">
        <div class="company-art advertiser-card-art">${art}</div><div class="company-info"><span class="eyebrow">${escapeHtml(item.category)}</span><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.description)}</p><span class="city">⌖ ${escapeHtml(item.city)}</span><a class="button button-dark" href="anunciante.html?id=${encodeURIComponent(item.id)}">Ver anunciante →</a></div></article>`;
    }).join("");
  }

  const profile = document.querySelector("#advertiserProfile");
  if (profile) {
    const advertiser = advertisers.find(item => item.id === params.get("id"));
    if (!advertiser) {
      profile.innerHTML = '<div class="profile-not-found"><h1>Anunciante não encontrado</h1><p>Confira o endereço ou veja todos os anunciantes.</p><a class="button button-green" href="anunciantes.html">Ver anunciantes</a></div>';
      return;
    }
    document.title = `${advertiser.name} — 360 CONECTA`;
    // Banner padronizado: mostra somente a imagem enviada pelo anunciante; sem texto ou conteúdo substituto.
    const cover = advertiser.cover
      ? `<img class="profile-cover-image" src="${escapeHtml(advertiser.cover)}" alt="Banner de ${escapeHtml(advertiser.name)}">`
      : '<div class="profile-cover-placeholder" aria-label="Banner ainda não cadastrado"></div>';
    const galleryPhotos = (advertiser.photos || []).filter(Boolean).slice(0, 5);
    const gallery = galleryPhotos.length
      ? `<section class="profile-gallery-section"><h2>Fotos</h2><div class="profile-gallery">${galleryPhotos.map((src, index) => `<img src="${escapeHtml(src)}" alt="Foto ${index + 1} de ${escapeHtml(advertiser.name)}" loading="lazy">`).join("")}</div></section>`
      : '<section class="profile-gallery-section"><h2>Fotos</h2><p class="muted">Ainda não foram adicionadas fotos. Você pode incluir até 5 URLs de imagens em <code>advertisers-data.js</code>.</p></section>';
    const logo = advertiser.logo ? `<img class="profile-logo" src="${escapeHtml(advertiser.logo)}" alt="Logo ${escapeHtml(advertiser.name)}">` : `<div class="profile-logo profile-logo-placeholder">${escapeHtml(advertiser.name.slice(0, 1))}</div>`;
    const phone = String(advertiser.phone || "").replace(/\D/g, "");
    const whatsapp = phone && !phone.endsWith("0000000000") ? `https://wa.me/${phone}?text=${encodeURIComponent(`Olá! Encontrei ${advertiser.name} no 360 CONECTA.`)}` : "#contato";
    profile.innerHTML = `${cover}<section class="profile-intro">${logo}<div><span class="eyebrow">${escapeHtml(advertiser.category)}</span><h1>${escapeHtml(advertiser.name)}</h1><p class="profile-city">⌖ ${escapeHtml(advertiser.city)}</p></div><a class="button button-green profile-contact" href="${whatsapp}" ${whatsapp !== "#contato" ? 'target="_blank" rel="noopener noreferrer"' : ""}>Falar com anunciante</a></section><section class="profile-description"><h2>Sobre o anunciante</h2><p>${escapeHtml(advertiser.description)}</p></section>${gallery}<p class="profile-back"><a class="text-link" href="anunciantes.html">← Voltar aos anunciantes</a></p>`;
  }
})();
