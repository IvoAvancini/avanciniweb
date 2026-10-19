/**
 * BIANCA VIEIRA | CONSULTORIA DE PROCESSOS
 * Interações, Animações e Integrações da Landing Page
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect com transição suave
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Menu Mobile Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      const icon = mobileToggle.querySelector('svg');
      if (isOpen) {
        icon.innerHTML = '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>';
      } else {
        icon.innerHTML = '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileToggle.querySelector('svg');
        if (icon) {
          icon.innerHTML = '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>';
        }
      });
    });
  }

  // 3. Máscara de Telefone / WhatsApp Universal (DDD) 99999-9999
  const phoneInputs = document.querySelectorAll('.phone-mask');
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.substring(0, 11);

      // Remove zeros à esquerda do DDD (Brasil não tem DDD começando com 0)
      if (v.length >= 2 && v.startsWith('0')) {
        v = v.replace(/^0+/, '');
      }

      if (v.length > 10) {
        // (XX) XXXXX-XXXX
        v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (v.length > 6) {
        // (XX) XXXX-XXXX
        v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
      } else if (v.length > 2) {
        // (XX) XXXX
        v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
      } else if (v.length > 0) {
        v = '(' + v;
      }
      e.target.value = v;
    });
  });

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos os outros
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      // Alterna o atual
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // 5. WIDGET FLUTUANTE DE WHATSAPP (Fiel ao design Paulo Leme / WhatsApp)
  const waBtn = document.getElementById('waFloatingTrigger') || document.getElementById('waFloatingBtn');
  const waPopup = document.getElementById('waCardPopup') || document.getElementById('waChatPopup');
  const waCloseBtn = document.getElementById('waCardClose') || document.getElementById('waPopupCloseBtn');
  const waForm = document.getElementById('waChatLeadForm') || document.getElementById('waQuickForm');
  const waContainer = document.getElementById('waWidgetWrapper') || document.getElementById('waWidgetContainer');

  let userInteractedWithWa = false;

  // Alternar popup ao clicar no botão flutuante verde
  if (waBtn && waPopup) {
    waBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userInteractedWithWa = true;
      const isActive = waPopup.classList.toggle('active');
      waPopup.setAttribute('aria-hidden', !isActive);

      // Oculta badge de notificação ao abrir
      const badge = waBtn.querySelector('.wa-notification-badge, .wa-badge-notification');
      if (badge) badge.style.display = 'none';
    });
  }

  // Fechar no botão X
  if (waCloseBtn && waPopup) {
    waCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userInteractedWithWa = true;
      waPopup.classList.remove('active');
      waPopup.setAttribute('aria-hidden', 'true');
    });
  }

  // Fechar ao clicar fora do container do widget
  document.addEventListener('click', (e) => {
    if (waPopup && waPopup.classList.contains('active')) {
      if (waContainer && !waContainer.contains(e.target)) {
        waPopup.classList.remove('active');
        waPopup.setAttribute('aria-hidden', 'true');
      }
    }
  });

  // Abertura automática suave e não-invasiva após 30 segundos
  setTimeout(() => {
    if (!userInteractedWithWa && waPopup && !waPopup.classList.contains('active')) {
      waPopup.classList.add('active');
      waPopup.setAttribute('aria-hidden', 'false');
    }
  }, 30000);

  // Envio do formulário do WhatsApp
  if (waForm) {
    waForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('waLeadName') || document.getElementById('waQuickName');
      const phoneInput = document.getElementById('waLeadPhone') || document.getElementById('waQuickPhone');
      
      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';

      if (!name || !phone) {
        alert('Por favor, preencha seu nome e telefone/WhatsApp.');
        return;
      }

      const msg = 
        `Olá, Bianca!\n\n` +
        `Meu nome é ${name}\n\n` +
        `Estou no seu site e gostaria de agendar uma conversa inicial sobre a consultoria em processos operacionais para minha empresa.`;

      const waNumber = '5573982224888';
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

      window.open(waUrl, '_blank');
      waPopup.classList.remove('active');
      waForm.reset();
    });
  }

  // 6. Formulário Completo de Diagnóstico Operacional
  const leadForm = document.getElementById('diagnosticForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const company = document.getElementById('companyName').value.trim();
      const segment = document.getElementById('businessSegment').value;
      const phone = document.getElementById('clientPhone').value.trim();
      const challenge = document.getElementById('mainChallenge').value.trim();

      if (!name || !segment || !phone) {
        alert('Por favor, preencha seu nome, WhatsApp e segmento.');
        return;
      }

      const message = 
        `Olá, Bianca! Preenchi o formulário de Diagnóstico Operacional pelo seu site e gostaria de conversar sobre o meu negócio.\n\n` +
        `Nome: ${name}\n` +
        `Empresa / Negócio: ${company || 'Não informado'}\n` +
        `Segmento: ${segment}\n` +
        `Principal desafio: ${challenge || 'Organizar rotinas, alinhar equipe e eliminar gargalos operacionais.'}\n\n` +
        `Podemos conversar?`;

      const encodedMessage = encodeURIComponent(message);
      const waNumber = '5573982224888';
      const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

      window.open(waUrl, '_blank');

      const submitBtn = leadForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Mensagem Preparada! Abrindo WhatsApp...</span>';
      submitBtn.style.backgroundColor = '#25D366';
      submitBtn.style.borderColor = '#25D366';
      submitBtn.style.color = '#FFFFFF';

      setTimeout(() => {
        submitBtn.innerHTML = originalHtml;
        submitBtn.style.backgroundColor = '';
        submitBtn.style.borderColor = '';
        submitBtn.style.color = '';
        leadForm.reset();
      }, 4000);
    });
  }

  // 7. Scroll reveal suave
  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .case-card, .sector-card, .trust-card, .statement-quote-card, .sectors-versatility-banner').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `
    .in-view {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});
