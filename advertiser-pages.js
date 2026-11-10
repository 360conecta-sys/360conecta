// Cria as fichas a partir de advertisers-data.js. Site estático: conteúdo editado pelo GitHub.
(() => {
  const advertisers = window.ADVERTISERS || [];
  const escapeHtml = value => String(value || "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const params = new URLSearchParams(location.search);

  // Os cartões mantêm a imagem inteira e proporcional dentro da moldura.
  const imageFrameStyle = document.createElement("style");
  imageFrameStyle.textContent = `
    #companyList .company-card{display:flex!important;flex-direction:column!important;overflow:hidden!important;position:relative!important}
    #companyList .company-card .company-art.advertiser-card-art{position:relative!important;inset:auto!important;display:flex!important;flex:0 0 186px!important;align-items:center!important;justify-content:center!important;width:100%!important;height:186px!important;min-height:186px!important;max-height:186px!important;margin:0!important;padding:8px!important;overflow:hidden!important;background:#fff!important}
    #companyList .company-card .advertiser-card-art .advertiser-card-logo{position:static!important;inset:auto!important;display:block!important;float:none!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;margin:0!important;padding:0!important;object-fit:contain!important;object-position:center!important;transform:none!important;border-radius:14px!important;background:#fff!important}
    #companyList .company-card .company-info{position:relative!important;inset:auto!important;z-index:1!important;display:flex!important;flex:1 0 auto!important;flex-direction:column!important;width:100%!important;height:auto!important;min-height:0!important;margin:0!important;overflow:visible!important;background:#fff!important}
    #companyList .company-card .company-info .button{margin-top:12px!important}
    .advertiser-profile .profile-cover-frame{position:relative!important;isolation:isolate!important;width:100%!important;aspect-ratio:2.5 / 1!important;max-height:420px!important;min-height:160px!important;overflow:hidden!important;margin:0 0 18px!important;border:1px solid #e7e7e7!important;border-radius:22px!important;background:#fff!important;box-shadow:0 4px 18px rgba(0,0,0,.08)!important}
    .advertiser-profile .profile-cover-frame::before{content:"";position:absolute;z-index:0;inset:-16px;background-image:var(--cover-image);background-position:center;background-size:cover;background-repeat:no-repeat;filter:blur(16px);transform:scale(1.05)}
    .advertiser-profile .profile-cover-frame .profile-cover-image{position:relative!important;z-index:1!important;display:block!important;width:auto!important;height:100%!important;max-width:100%!important;max-height:none!important;margin:0 auto!important;padding:0!important;object-fit:contain!important;object-position:center!important;background:transparent!important}
    .advertiser-profile .profile-cover-placeholder{width:100%;min-height:220px;background:#fff;border:1px solid #e7e7e7;border-radius:22px}
    @media(max-width:640px){#companyList .company-card .company-art.advertiser-card-art{flex-basis:170px!important;height:170px!important;min-height:170px!important;max-height:170px!important}.advertiser-profile .profile-cover-frame{min-height:140px!important;border-radius:16px!important}}
  `;
  document.head.append(imageFrameStyle);

  const list = document.querySelector("#companyList");
  if (list) {
    const categoryFilter = document.querySelector("#categoryFilter");
    const categories = [...new Set(advertisers.map(item => item.category).filter(Boolean))];
    categories.forEach(category => {
      if (![...categoryFilter.options].some(option => option.value === category)) {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.append(option);
      }
    });
    list.innerHTML = advertisers.map(item => {
      const art = item.logo
        ? `<img src="${escapeHtml(item.logo)}" alt="Imagem de ${escapeHtml(item.name)}" class="advertiser-card-logo" loading="lazy">`
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
    const cover = advertiser.cover
      ? `<div class="profile-cover-frame"><img class="profile-cover-image" src="${escapeHtml(advertiser.cover)}" alt="Banner de ${escapeHtml(advertiser.name)}"></div>`
      : '<div class="profile-cover-placeholder" aria-label="Banner ainda não cadastrado"></div>';
    const galleryPhotos = (advertiser.photos || []).filter(Boolean).slice(0, 5);
    const gallery = galleryPhotos.length
      ? `<section class="profile-gallery-section"><h2>Fotos</h2><div class="profile-gallery">${galleryPhotos.map((src, index) => `<img src="${escapeHtml(src)}" alt="Foto ${index + 1} de ${escapeHtml(advertiser.name)}" loading="lazy">`).join("")}</div></section>`
      : '<section class="profile-gallery-section"><h2>Fotos</h2><p class="muted">Ainda não foram adicionadas fotos. Você pode incluir até 5 URLs de imagens em <code>advertisers-data.js</code>.</p></section>';
    const logo = advertiser.logo ? `<img class="profile-logo" src="${escapeHtml(advertiser.logo)}" alt="Logo ${escapeHtml(advertiser.name)}">` : `<div class="profile-logo profile-logo-placeholder">${escapeHtml(advertiser.name.slice(0, 1))}</div>`;
    const phone = String(advertiser.phone || "").replace(/\D/g, "");
    const whatsapp = phone && !phone.endsWith("0000000000") ? `https://wa.me/${phone}?text=${encodeURIComponent(`Olá! Encontrei ${advertiser.name} no 360 CONECTA.`)}` : "#contato";
    const appButton = advertiser.appLink
      ? `<a class="button button-dark" href="${escapeHtml(advertiser.appLink)}" target="_blank" rel="noopener noreferrer">Baixar aplicativo →</a>`
      : "";
    profile.innerHTML = `${cover}<section class="profile-intro">${logo}<div><span class="eyebrow">${escapeHtml(advertiser.category)}</span><h1>${escapeHtml(advertiser.name)}</h1><p class="profile-city">⌖ ${escapeHtml(advertiser.city)}</p></div><a class="button button-green profile-contact" href="${whatsapp}" ${whatsapp !== "#contato" ? 'target="_blank" rel="noopener noreferrer"' : ""}>Falar com anunciante</a>${appButton}</section><section class="profile-description"><h2>Sobre o anunciante</h2><p>${escapeHtml(advertiser.description)}</p></section>${gallery}<p class="profile-back"><a class="text-link" href="anunciantes.html">← Voltar aos anunciantes</a></p>`;
    const coverFrame = profile.querySelector(".profile-cover-frame");
    if (coverFrame && advertiser.cover) {
      coverFrame.style.setProperty("--cover-image", `url(${JSON.stringify(advertiser.cover)})`);
    }
  }
})();
