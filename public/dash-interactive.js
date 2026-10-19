(() => {
  if (typeof window === 'undefined') return;

  const init = () => {
    // -------------------------------------------------------------
    // 1. TYPEWRITER ANIMATION (NICHES)
    // -------------------------------------------------------------
    const nicheWordSpan = document.querySelector('.dash-niche-word span');
    const heroSector = document.querySelector('.dash-hero-sector');
    const niches = ['nutricionista', 'advogado', 'contador', 'clínica'];
    
    if (nicheWordSpan) {
      let nicheIdx = 0;
      let currentChars = nicheWordSpan.textContent || 'n';
      let isDeleting = false;
      let typeTimer = null;

      const tickTypewriter = () => {
        const target = niches[nicheIdx];
        const isComplete = currentChars === target;
        const isEmpty = currentChars.length === 0;

        if (!isDeleting && isComplete) {
          typeTimer = setTimeout(() => {
            isDeleting = true;
            tickTypewriter();
          }, 1100);
          return;
        }

        if (isDeleting && isEmpty) {
          isDeleting = false;
          nicheIdx = (nicheIdx + 1) % niches.length;
          typeTimer = setTimeout(() => {
            tickTypewriter();
          }, 120);
          return;
        }

        if (isDeleting) {
          currentChars = target.slice(0, Math.max(0, currentChars.length - 1));
        } else {
          currentChars = target.slice(0, currentChars.length + 1);
        }

        nicheWordSpan.textContent = currentChars;
        if (heroSector) {
          heroSector.setAttribute('aria-label', `Criação de site profissional para ${niches[nicheIdx]}`);
        }

        const delay = isDeleting ? 38 : 62;
        typeTimer = setTimeout(tickTypewriter, delay);
      };

      typeTimer = setTimeout(tickTypewriter, 400);
    }

    // -------------------------------------------------------------
    // 2. ROI CALCULATOR / SIMULATOR
    // -------------------------------------------------------------
    const calcSection = document.querySelector('.dash-return-calculator');
    if (calcSection) {
      const controls = calcSection.querySelectorAll('.dash-return-controls input[type="range"]');
      const outputs = calcSection.querySelectorAll('.dash-return-controls output');
      const resultDivs = calcSection.querySelectorAll('.dash-return-result div');
      const bars = calcSection.querySelectorAll('.dash-scenario-bars i');
      const ctaScenarioBtn = calcSection.querySelector('.dash-return-result button');

      const visitsInput = controls[0];
      const convInput = controls[1];
      const valInput = controls[2];

      const formatBRL = (val) => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          maximumFractionDigits: 0
        }).format(val).replace(/\s+/g, ' ');
      };

      const updateCalc = () => {
        const visits = parseInt(visitsInput?.value || '650', 10);
        const conv = parseFloat(convInput?.value || '2');
        const val = parseInt(valInput?.value || '450', 10);

        // Update labels
        if (outputs[0]) outputs[0].textContent = visits.toString();
        if (outputs[1]) outputs[1].textContent = `${conv.toFixed(1).replace('.', ',')}%`;
        if (outputs[2]) outputs[2].textContent = formatBRL(val);

        // Calculate results
        const contatos = Math.max(1, Math.round((conv / 100) * visits));
        const fechados = Math.max(1, Math.round(0.25 * contatos));
        const total = fechados * val;

        // Update strong output values
        const contatosStrong = resultDivs[0]?.querySelector('strong');
        const totalStrong = resultDivs[1]?.querySelector('strong');

        if (contatosStrong) contatosStrong.textContent = contatos.toString();
        if (totalStrong) totalStrong.textContent = formatBRL(total);

        // Update 12 chart bars
        bars.forEach((bar, idx) => {
          const s = idx / 11;
          const r = 7 * Math.sin(s * Math.PI * 2.35);
          const heightPct = Math.round(
            Math.min(92, 20 + 25 * s + ((visits - 100) / 2900) * 18 + ((conv - 0.5) / 5.5) * 16 + ((val - 100) / 2400) * 9 + r)
          );
          const scale = (heightPct / 100).toFixed(2);
          bar.style.setProperty('--dash-bar', `${heightPct}%`);
          bar.style.setProperty('--dash-scale', scale);
        });
      };

      controls.forEach(inp => {
        inp?.addEventListener('input', updateCalc);
        inp?.addEventListener('change', updateCalc);
      });

      // Initial calculation
      updateCalc();

      if (ctaScenarioBtn) {
        ctaScenarioBtn.addEventListener('click', () => {
          const visits = visitsInput?.value || '650';
          const conv = convInput?.value || '2';
          const val = valInput?.value || '450';
          const intent = `Simulei ${visits} visitas, ${conv}% de conversão e ticket médio de R$ ${val}. Quero entender o que faz sentido no meu cenário.`;
          openContactModal(intent);
        });
      }
    }

    // -------------------------------------------------------------
    // 3. WHATSAPP LEAD MODAL & COUNTRY SELECTOR
    // -------------------------------------------------------------
    const countries = [
      { code: "BR", name: "Brasil", dialCode: "+55", placeholder: "(11) 99999-9999", minDigits: 10, maxDigits: 11 },
      { code: "US", name: "Estados Unidos", dialCode: "+1", placeholder: "(555) 123-4567", minDigits: 10, maxDigits: 10 },
      { code: "PT", name: "Portugal", dialCode: "+351", placeholder: "912 345 678", minDigits: 9, maxDigits: 9 },
      { code: "MX", name: "México", dialCode: "+52", placeholder: "55 1234 5678", minDigits: 10, maxDigits: 10 },
      { code: "AR", name: "Argentina", dialCode: "+54", placeholder: "11 1234 5678", minDigits: 10, maxDigits: 11 },
      { code: "GB", name: "Reino Unido", dialCode: "+44", placeholder: "7700 900123", minDigits: 10, maxDigits: 11 },
      { code: "ES", name: "Espanha", dialCode: "+34", placeholder: "612 345 678", minDigits: 9, maxDigits: 9 },
      { code: "FR", name: "França", dialCode: "+33", placeholder: "6 12 34 56 78", minDigits: 9, maxDigits: 9 },
      { code: "DE", name: "Alemanha", dialCode: "+49", placeholder: "1512 3456789", minDigits: 10, maxDigits: 11 },
      { code: "JP", name: "Japão", dialCode: "+81", placeholder: "90 1234 5678", minDigits: 10, maxDigits: 11 }
    ];

    const getFlagSvg = (code) => {
      let paths = '';
      switch (code) {
        case 'US':
          paths = '<rect width="30" height="20" fill="#fff"></rect><path stroke="#b22234" stroke-width="2" d="M0 1h30M0 5h30M0 9h30M0 13h30M0 17h30"></path><rect width="13" height="10" fill="#21468b"></rect><path stroke="#fff" stroke-width="1.2" stroke-linecap="round" d="M3 2h.1m3 0h.1m3 0h.1M3 5h.1m3 0h.1m3 0h.1M3 8h.1m3 0h.1m3 0h.1"></path>';
          break;
        case 'PT':
          paths = '<rect width="30" height="20" fill="#d52b1e"></rect><rect width="12" height="20" fill="#187547"></rect><circle cx="12" cy="10" r="3.2" fill="#f5c542"></circle><circle cx="12" cy="10" r="1.7" fill="#fff" stroke="#d52b1e"></circle>';
          break;
        case 'MX':
          paths = '<rect width="30" height="20" fill="#fff"></rect><rect width="10" height="20" fill="#006847"></rect><rect x="20" width="10" height="20" fill="#ce1126"></rect><circle cx="15" cy="10" r="1.8" fill="#8a6a2f"></circle>';
          break;
        case 'AR':
          paths = '<rect width="30" height="20" fill="#75aadb"></rect><rect y="6.67" width="30" height="6.67" fill="#fff"></rect><circle cx="15" cy="10" r="1.7" fill="#f6b40e"></circle>';
          break;
        case 'GB':
          paths = '<rect width="30" height="20" fill="#21468b"></rect><path stroke="#fff" stroke-width="4" d="m0 0 30 20M30 0 0 20"></path><path stroke="#c8102e" stroke-width="1.8" d="m0 0 30 20M30 0 0 20"></path><path stroke="#fff" stroke-width="7" d="M15 0v20M0 10h30"></path><path stroke="#c8102e" stroke-width="3.6" d="M15 0v20M0 10h30"></path>';
          break;
        case 'ES':
          paths = '<rect width="30" height="20" fill="#aa151b"></rect><rect y="5" width="30" height="10" fill="#f1bf00"></rect><rect x="10" y="8" width="2" height="4" rx=".5" fill="#aa151b"></rect>';
          break;
        case 'FR':
          paths = '<rect width="30" height="20" fill="#fff"></rect><rect width="10" height="20" fill="#0055a4"></rect><rect x="20" width="10" height="20" fill="#ef4135"></rect>';
          break;
        case 'DE':
          paths = '<rect width="30" height="20" fill="#ffce00"></rect><rect width="30" height="6.67" fill="#111"></rect><rect y="6.67" width="30" height="6.67" fill="#dd0000"></rect>';
          break;
        case 'JP':
          paths = '<rect width="30" height="20" fill="#fff"></rect><circle cx="15" cy="10" r="4.2" fill="#bc002d"></circle>';
          break;
        default: // BR
          paths = '<rect width="30" height="20" fill="#27934b"></rect><path d="m15 2 12 8-12 8-12-8Z" fill="#f0ce35"></path><circle cx="15" cy="10" r="4" fill="#2457a6"></circle><path d="M11.5 9.2c2.7-.8 5.2-.3 7.2 1.3" fill="none" stroke="#fff" stroke-width=".8"></path>';
          break;
      }
      return `<span class="dash-country-flag" aria-hidden="true"><svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice">${paths}</svg></span>`;
    };

    let selectedCountry = countries[0];
    let currentIntentMessage = "Quero conversar sobre um site profissional para minha empresa.";

    // Remove any existing backdrops to prevent duplication
    const oldBackdrop = document.querySelector('.dash-contact-backdrop');
    if (oldBackdrop) oldBackdrop.remove();

    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'dash-contact-backdrop';
    modalBackdrop.setAttribute('role', 'presentation');

    modalBackdrop.innerHTML = `
      <section class="dash-contact-panel" id="dash-contact-panel" role="dialog" aria-modal="true" aria-labelledby="dash-lead-title" tabindex="-1">
        <header>
          <span class="dash-contact-avatar">
            <img src="data:image/jpeg;base64,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" alt="José Avancini" width="42" height="42" />
            <i aria-hidden="true"></i>
          </span>
          <span>
            <strong id="dash-lead-title">Avancini Dash</strong>
            <small><b>online</b><span> · responde em minutos</span></small>
          </span>
          <button type="button" class="dash-contact-close" aria-label="Fechar conversa">
            <svg viewBox="0 0 20 20" aria-hidden="true" width="18" height="18"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" stroke-width="2" fill="none"></path></svg>
          </button>
        </header>
        <form class="dash-contact-form" id="dashLeadForm">
          <label class="dash-contact-name" for="dash-lead-name">
            <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="6.5" r="3" fill="none" stroke="currentColor" stroke-width="1.8"></circle><path d="M4.8 16.5v-1.4c0-2.4 2-4.3 4.3-4.3h1.8c2.4 0 4.3 2 4.3 4.3v1.4" fill="none" stroke="currentColor" stroke-width="1.8"></path></svg>
            <span class="dash-sr-only">Seu nome</span>
            <input id="dash-lead-name" placeholder="Seu nome" autocomplete="name" maxlength="60" required />
          </label>
          <div class="dash-contact-phone-row">
            <div class="dash-country-wrap" id="dashCountryWrap">
              <button class="dash-country-code" type="button" aria-label="País: Brasil" aria-haspopup="listbox" aria-expanded="false" id="dashCountryBtn">
                <span id="dashCountryFlagContainer">${getFlagSvg(selectedCountry.code)}</span>
                <span id="dashCountryCodeTxt">${selectedCountry.dialCode}</span>
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m6 8 4 4 4-4" stroke="currentColor" stroke-width="2" fill="none"></path></svg>
              </button>
              <div class="dash-country-popover" id="dashCountryPopover" hidden>
                <label class="dash-country-search" for="dash-country-search">
                  <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.7" cy="8.7" r="5.2" fill="none" stroke="currentColor" stroke-width="1.8"></circle><path d="m12.6 12.6 4 4" stroke="currentColor" stroke-width="1.8"></path></svg>
                  <span class="dash-sr-only">Buscar país</span>
                  <input id="dash-country-search" placeholder="Buscar país…" autocomplete="off" />
                </label>
                <div class="dash-country-list" id="dashCountryList" role="listbox" aria-label="Selecione o país"></div>
              </div>
            </div>
            <label for="dash-lead-phone">
              <span class="dash-sr-only">Telefone</span>
              <input type="tel" inputmode="tel" id="dash-lead-phone" placeholder="(11) 99999-9999" autocomplete="tel-national" maxlength="18" required />
            </label>
          </div>
          <span class="dash-contact-error" id="dash-lead-error" role="alert" style="display:none;"></span>
          <button type="submit" id="dashSubmitBtn" disabled>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.16 6.44 6.6 2.01 12.05 2.01c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.23-6.16-3.48-8.41"></path></svg>
            INICIAR CONVERSA
          </button>
        </form>
      </section>
    `;

    const hostElem = document.querySelector('main.dash-page') || document.querySelector('#dash-root') || document.body;
    hostElem.appendChild(modalBackdrop);

    const nameInput = document.getElementById('dash-lead-name');
    const phoneInput = document.getElementById('dash-lead-phone');
    const errorSpan = document.getElementById('dash-lead-error');
    const countryBtn = document.getElementById('dashCountryBtn');
    const countryFlagContainer = document.getElementById('dashCountryFlagContainer');
    const countryPopover = document.getElementById('dashCountryPopover');
    const countrySearch = document.getElementById('dash-country-search');
    const countryList = document.getElementById('dashCountryList');
    const countryCodeTxt = document.getElementById('dashCountryCodeTxt');
    const submitBtn = document.getElementById('dashSubmitBtn');
    const form = document.getElementById('dashLeadForm');
    const floatingWaBtn = document.querySelector('.dash-whatsapp');

    // WhatsApp SVGs for floating button
    const waIconSvg = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.16 6.44 6.6 2.01 12.05 2.01c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.23-6.16-3.48-8.41"></path></svg>';
    const closeIconSvg = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" stroke-width="2.2" fill="none"></path></svg>';

    const validateForm = () => {
      const name = (nameInput?.value || '').trim();
      const digits = (phoneInput?.value || '').replace(/\D/g, '');
      const isValid = name.length >= 2 && digits.length >= selectedCountry.minDigits;
      if (submitBtn) {
        if (isValid) {
          submitBtn.removeAttribute('disabled');
        } else {
          submitBtn.setAttribute('disabled', 'true');
        }
      }
      return isValid;
    };

    const renderCountries = (filter = '') => {
      if (!countryList) return;
      countryList.innerHTML = '';
      const filtered = countries.filter(c => `${c.name} ${c.dialCode}`.toLowerCase().includes(filter.toLowerCase().trim()));
      if (filtered.length === 0) {
        countryList.innerHTML = '<p style="padding:10px;font-size:12px;color:#888;text-align:center;">Nenhum país encontrado.</p>';
        return;
      }
      filtered.forEach(c => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.role = 'option';
        if (c.code === selectedCountry.code) {
          btn.setAttribute('aria-selected', 'true');
        }
        btn.innerHTML = `${getFlagSvg(c.code)}<span>${c.name}</span><small>${c.dialCode}</small>`;
        btn.addEventListener('click', () => {
          selectedCountry = c;
          if (countryCodeTxt) countryCodeTxt.textContent = c.dialCode;
          if (countryFlagContainer) countryFlagContainer.innerHTML = getFlagSvg(c.code);
          if (countryBtn) {
            countryBtn.setAttribute('aria-label', `País: ${c.name}`);
            countryBtn.setAttribute('aria-expanded', 'false');
          }
          if (phoneInput) {
            phoneInput.placeholder = c.placeholder;
            phoneInput.value = '';
          }
          if (countryPopover) { countryPopover.hidden = true; }
          validateForm();
        });
        countryList.appendChild(btn);
      });
    };

    renderCountries();

    if (countryBtn && countryPopover) {
      countryBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !countryPopover.hidden;
        if (isOpen) {
          countryPopover.hidden = true;
          countryBtn.setAttribute('aria-expanded', 'false');
        } else {
          countryPopover.hidden = false;
          countryBtn.setAttribute('aria-expanded', 'true');
          if (countrySearch) {
            countrySearch.value = '';
            renderCountries();
            setTimeout(() => countrySearch.focus(), 50);
          }
        }
      });
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#dashCountryWrap')) {
          countryPopover.hidden = true;
          countryBtn.setAttribute('aria-expanded', 'false');
        }
      });
      countrySearch?.addEventListener('input', (e) => {
        renderCountries(e.target.value);
      });
    }

    // Phone format & validation listeners
    nameInput?.addEventListener('input', () => {
      if (errorSpan) errorSpan.style.display = 'none';
      validateForm();
    });

    phoneInput?.addEventListener('input', (e) => {
      if (errorSpan) errorSpan.style.display = 'none';
      if (selectedCountry.code === 'BR') {
        let v = e.target.value.replace(/\D/g, '').slice(0, 11);
        if (v.length > 10) {
          v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (v.length > 5) {
          v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
        } else if (v.length > 2) {
          v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
        }
        e.target.value = v;
      }
      validateForm();
    });

    const updateFloatingButton = (isOpen) => {
      if (!floatingWaBtn) return;
      if (isOpen) {
        floatingWaBtn.classList.add('is-open');
        floatingWaBtn.setAttribute('aria-label', 'Fechar conversa no WhatsApp');
        floatingWaBtn.setAttribute('aria-expanded', 'true');
        floatingWaBtn.innerHTML = `<span class="dash-whatsapp-ping" aria-hidden="true"></span>${closeIconSvg}`;
      } else {
        floatingWaBtn.classList.remove('is-open');
        floatingWaBtn.setAttribute('aria-label', 'Conversar com a Avancini Dash no WhatsApp');
        floatingWaBtn.setAttribute('aria-expanded', 'false');
        floatingWaBtn.innerHTML = `<span class="dash-whatsapp-ping" aria-hidden="true"></span>${waIconSvg}<span class="dash-whatsapp-alert" aria-hidden="true">1</span>`;
      }
    };

    window.openContactModal = (msg) => {
      if (msg) currentIntentMessage = msg;
      modalBackdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      updateFloatingButton(true);
      setTimeout(() => nameInput?.focus(), 80);
    };

    window.closeContactModal = () => {
      modalBackdrop.classList.remove('is-open');
      document.body.style.overflow = '';
      if (countryPopover) { countryPopover.hidden = true; }
      if (countryBtn) countryBtn.setAttribute('aria-expanded', 'false');
      if (errorSpan) errorSpan.style.display = 'none';
      updateFloatingButton(false);
    };

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeContactModal();
    });

    modalBackdrop.querySelector('.dash-contact-close')?.addEventListener('click', closeContactModal);

    // Form submission
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (nameInput?.value || '').trim();
      const digits = (phoneInput?.value || '').replace(/\D/g, '');

      if (name.length < 2) {
        if (errorSpan) {
          errorSpan.textContent = "Informe seu nome ou o nome da empresa para continuar.";
          errorSpan.style.display = 'block';
        }
        return;
      }
      if (digits.length < selectedCountry.minDigits || digits.length > selectedCountry.maxDigits) {
        if (errorSpan) {
          errorSpan.textContent = `Confira o número informado para ${selectedCountry.name}.`;
          errorSpan.style.display = 'block';
        }
        return;
      }

      const greeting = `Olá! Meu nome é ${name}. Meu telefone é ${selectedCountry.dialCode} ${digits}. ${currentIntentMessage}`;
      const url = `https://wa.me/5573981019782?text=${encodeURIComponent(greeting)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      closeContactModal();
    });

    // Floating WhatsApp button click
    floatingWaBtn?.addEventListener('click', () => {
      if (modalBackdrop.classList.contains('is-open')) {
        closeContactModal();
      } else {
        openContactModal("Quero conversar sobre um site profissional para minha empresa.");
      }
    });

    // Wire up ALL CTA buttons on the page to open the WhatsApp modal with context
    document.querySelectorAll('.dash-motion-cta, button.dash-button, [data-open-lead]').forEach(btn => {
      if (btn === submitBtn || btn.closest('.dash-contact-panel')) return;
      btn.addEventListener('click', (e) => {
        const text = btn.textContent || '';
        let intent = "Quero conversar sobre um projeto com a Avancini Dash.";
        if (text.toLowerCase().includes('cenário') || text.toLowerCase().includes('conta')) {
          const visits = document.querySelectorAll('.dash-return-controls input[type="range"]')[0]?.value || '650';
          const conv = document.querySelectorAll('.dash-return-controls input[type="range"]')[1]?.value || '2';
          const val = document.querySelectorAll('.dash-return-controls input[type="range"]')[2]?.value || '450';
          intent = `Simulei ${visits} visitas, ${conv}% de conversão e ticket médio de R$ ${val}. Quero entender o que faz sentido no meu cenário.`;
        } else if (text.toLowerCase().includes('proposta') || text.toLowerCase().includes('começar')) {
          intent = "Quero solicitar uma proposta para meu projeto.";
        } else if (text.toLowerCase().includes('estudo') || text.toLowerCase().includes('mercado')) {
          intent = "Quero começar pelo estudo de mercado e entender o potencial do meu cenário.";
        }
        openContactModal(intent);
      });
    });

    // -------------------------------------------------------------
    // 4. NAVIGATION OVERLAY MENU (#dash-navigation)
    // -------------------------------------------------------------
    const menuBtn = document.querySelector('.dash-header-menu-button');
    const navOverlay = document.getElementById('dash-navigation');
    const menuCloseBtn = navOverlay?.querySelector('.dash-navigation-close');

    if (menuBtn && navOverlay) {
      const toggleMenu = (open) => {
        menuBtn.setAttribute('aria-expanded', String(open));
        navOverlay.setAttribute('aria-hidden', String(!open));
        if (open) {
          navOverlay.classList.add('is-open');
          document.body.style.overflow = 'hidden';
        } else {
          navOverlay.classList.remove('is-open');
          document.body.style.overflow = '';
        }
      };

      menuBtn.addEventListener('click', () => {
        const isOpen = navOverlay.classList.contains('is-open');
        toggleMenu(!isOpen);
      });
      menuCloseBtn?.addEventListener('click', () => toggleMenu(false));

      navOverlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (modalBackdrop && modalBackdrop.classList.contains('is-open')) {
            closeContactModal();
          } else if (navOverlay.classList.contains('is-open')) {
            toggleMenu(false);
          }
        }
      });
    }

    // -------------------------------------------------------------
    // 5. FAQ ACCORDION
    // -------------------------------------------------------------
    const faqItems = document.querySelectorAll('.dash-faq-item');
    faqItems.forEach(item => {
      const btn = item.querySelector('button');
      btn?.addEventListener('click', () => {
        const wasOpen = item.classList.contains('is-open');
        // Toggle current item
        if (wasOpen) {
          item.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // -------------------------------------------------------------
    // 6. PORTFOLIO SPOTLIGHT MODAL (EXACT VERCEL COMPATIBLE)
    // -------------------------------------------------------------
    const projectsMap = {
      'janildo-araujo': {
        name: 'Janildo Araújo',
        slug: 'janildo-araujo',
        previewHref: '/projects/janildo-araujo/index.html',
        fullHref: '/projects/janildo-araujo/index.html',
        previewHeight: 6200
      },
      'clinica-san-diego': {
        name: 'Clínica San Diego',
        slug: 'clinica-san-diego',
        previewHref: '/clinica/index.html',
        fullHref: '/clinica/index.html',
        previewHeight: 6200
      },
      'tape-car': {
        name: 'Tape Car',
        slug: 'tape-car',
        previewHref: '/dash/projetos/tape-car',
        fullHref: '/dash/projetos/tape-car',
        previewHeight: 5200
      },
      'solaris-energia': {
        name: 'Solaris Energia',
        slug: 'solaris-energia',
        previewHref: '/dash/projetos/solaris-energia',
        fullHref: '/dash/projetos/solaris-energia',
        previewHeight: 5600
      },
      'bianca-vieira': {
        name: 'Bianca Vieira',
        slug: 'bianca-vieira',
        previewHref: '/projects/bianca-vieira/index.html',
        fullHref: '/projects/bianca-vieira/index.html',
        previewHeight: 7600
      },
      'cora-imoveis': {
        name: 'Cora Imóveis',
        slug: 'cora-imoveis',
        previewHref: '/cora',
        fullHref: '/cora',
        previewHeight: 6200
      },
      'vertice-store': {
        name: 'Vértice Store',
        slug: 'vertice-store',
        previewHref: '/vertice',
        fullHref: '/vertice',
        previewHeight: 6200
      }
    };

    // Remove any previous dialog
    const oldDialog = document.querySelector('.dash-project-dialog');
    if (oldDialog) oldDialog.remove();

    const projectDialog = document.createElement('div');
    projectDialog.className = 'dash-project-dialog';
    projectDialog.setAttribute('role', 'presentation');
    projectDialog.innerHTML = `
      <section class="dash-project-dialog-panel" role="dialog" aria-modal="true" aria-labelledby="dash-project-dialog-title" tabindex="-1">
        <header>
          <span aria-hidden="true"><i></i><i></i><i></i></span>
          <small id="dash-project-dialog-title">avancini.me/dash/projetos/</small>
          <a class="dash-project-dialog-open" id="dashProjectDialogOpen" href="#" target="_blank" rel="noreferrer">
            Abrir site completo 
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M2 7h10m0 0-4-4m4 4-4 4"></path>
            </svg>
          </a>
          <button type="button" class="dash-project-dialog-close" aria-label="Fechar visualização">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m5 5 10 10M15 5 5 15"></path>
            </svg>
          </button>
        </header>
        <div class="dash-project-dialog-preview">
          <iframe id="dashProjectIframe" class="dash-project-dialog-frame" src="" sandbox="allow-same-origin allow-scripts" scrolling="no" style="height:6200px;"></iframe>
        </div>
      </section>
    `;
    document.body.appendChild(projectDialog);

    const dialogPanel = projectDialog.querySelector('.dash-project-dialog-panel');
    const dialogTitle = projectDialog.querySelector('#dash-project-dialog-title');
    const dialogOpenLink = projectDialog.querySelector('#dashProjectDialogOpen');
    const dialogIframe = projectDialog.querySelector('#dashProjectIframe');
    const dialogCloseBtn = projectDialog.querySelector('.dash-project-dialog-close');

    const openProjectModal = (proj) => {
      if (!proj) return;
      if (dialogTitle) dialogTitle.textContent = 'avancini.me/dash/projetos/' + proj.slug;
      if (dialogOpenLink) dialogOpenLink.href = proj.fullHref || proj.previewHref;
      if (dialogIframe) {
        const targetHeight = proj.previewHeight || 6000;
        dialogIframe.style.height = targetHeight + 'px';
        dialogIframe.title = 'Visualização estática da página completa de ' + proj.name;
        dialogIframe.src = proj.previewHref;

        const updateHeight = () => {
          try {
            const doc = dialogIframe.contentDocument;
            if (doc && doc.body) {
              const h = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
              if (h > 600 && !proj.previewHeight) {
                dialogIframe.style.height = Math.min(Math.max(h, 900), 14000) + 'px';
              }
            }
          } catch(e) {}
        };

        dialogIframe.onload = () => {
          try {
            dialogIframe.contentWindow?.scrollTo(0, 0);
          } catch(e) {}
          updateHeight();
          setTimeout(updateHeight, 400);
        };
      }
      projectDialog.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      if (dialogPanel) dialogPanel.scrollTop = 0;
    };

    const closeProjectModal = () => {
      projectDialog.classList.remove('is-open');
      document.body.style.overflow = '';
      if (dialogIframe) dialogIframe.src = '';
    };

    projectDialog.addEventListener('click', (e) => {
      if (e.target === projectDialog) closeProjectModal();
    });
    dialogCloseBtn?.addEventListener('click', closeProjectModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectDialog.classList.contains('is-open')) {
        closeProjectModal();
      }
    });

    const projectCards = document.querySelectorAll('.dash-project-card');
    projectCards.forEach(card => {
      // Find theme or small text
      const small = card.querySelector('.dash-project-browser small');
      let slug = '';
      if (small) {
        const txt = small.textContent || '';
        slug = txt.replace(/.*\/projetos\//, '').trim();
      }
      if (!slug) {
        for (const cls of card.classList) {
          if (cls.startsWith('theme-')) {
            const th = cls.replace('theme-', '');
            if (th === 'sandiego') slug = 'clinica-san-diego';
            else if (th === 'cora') slug = 'cora-imoveis';
            else if (th === 'vertice') slug = 'vertice-store';
            else if (th === 'solaris') slug = 'solaris-energia';
            else if (th === 'bianca') slug = 'bianca-vieira';
            else if (th === 'tapecar') slug = 'tape-car';
            else if (th === 'janildo') slug = 'janildo-araujo';
          }
        }
      }

      const proj = projectsMap[slug] || {
        slug: slug,
        name: card.querySelector('strong')?.textContent || slug,
        previewHref: '/projects/' + slug + '/index.html',
        fullHref: '/projects/' + slug + '/index.html',
        previewHeight: 6200
      };

      card.addEventListener('click', (e) => {
        e.preventDefault();
        openProjectModal(proj);
      });
    });

    // -------------------------------------------------------------
    // 7. SCROLL REVEAL ([data-reveal])
    // -------------------------------------------------------------
    const revealElems = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && revealElems.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      revealElems.forEach(el => observer.observe(el));
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
