(() => {
  const body = document.body;
  const menu = document.getElementById('syncMenu');
  const menuButton = document.getElementById('syncMenuBtn');
  const menuClose = document.getElementById('syncMenuClose');

  const setMenu = (open) => {
    if (!menu || !menuButton) return;
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menuButton.setAttribute('aria-expanded', String(open));
    body.classList.toggle('menu-open', open);
    (open ? menuClose : menuButton)?.focus({ preventScroll: true });
  };

  const syncLiveDemo = document.getElementById('syncLiveDemo');
  const liveSteps = [...document.querySelectorAll('[data-live-step]')];
  const liveStatus = document.getElementById('syncLiveStatus');
  const summaryStatus = document.querySelector('[data-live-summary-status]');
  const summaryNeed = document.querySelector('[data-live-need]');
  const summaryPriority = document.querySelector('[data-live-priority]');
  const summaryNext = document.querySelector('[data-live-next]');
  const summaryHandoff = document.querySelector('[data-live-handoff]');
  const summaryHandoffBadge = document.querySelector('[data-live-handoff-badge]');
  const liveStages = ['received', 'understood', 'ready'];
  const liveStageCopy = {
    received: ['Mensagem recebida', 'Aguardando leitura', 'Ainda não definida', 'Analisar a mensagem', 'Mensagem recebida', 'Na fila'],
    understood: ['Contexto identificado', 'Organizar o atendimento', 'Responder novos contatos', 'Preparar uma orientação', 'Contexto preservado', 'Organizado'],
    ready: ['Próximo passo pronto', 'Organizar o atendimento', 'Responder novos contatos', 'Apresentar o fluxo adequado', 'Pronto para a equipe', 'Encaminhado'],
  };
  let liveIndex = 0;
  let liveTimer;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const activateLiveStage = (index) => {
    if (!syncLiveDemo || !liveSteps.length) return;
    liveIndex = (index + liveStages.length) % liveStages.length;
    const stage = liveStages[liveIndex];
    const copy = liveStageCopy[stage];
    syncLiveDemo.dataset.liveStage = stage;
    if (liveStatus) liveStatus.textContent = stage === 'understood' ? 'digitando…' : 'online';
    if (summaryStatus) summaryStatus.textContent = copy[0];
    if (summaryNeed) summaryNeed.textContent = copy[1];
    if (summaryPriority) summaryPriority.textContent = copy[2];
    if (summaryNext) summaryNext.textContent = copy[3];
    if (summaryHandoff) summaryHandoff.textContent = copy[4];
    if (summaryHandoffBadge) summaryHandoffBadge.textContent = copy[5];
    liveSteps.forEach((step, stepIndex) => {
      const selected = stepIndex === liveIndex;
      step.classList.toggle('sync-live-step--active', selected);
      step.setAttribute('aria-pressed', String(selected));
    });
  };
  const startLiveDemo = () => {
    window.clearInterval(liveTimer);
    if (reducedMotion.matches || !syncLiveDemo) return;
    liveTimer = window.setInterval(() => activateLiveStage(liveIndex + 1), 4800);
  };
  liveSteps.forEach((step, index) => step.addEventListener('click', () => {
    activateLiveStage(index);
    startLiveDemo();
  }));
  if (syncLiveDemo) {
    const liveObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) startLiveDemo();
      else window.clearInterval(liveTimer);
    }, { threshold: .3 });
    liveObserver.observe(syncLiveDemo);
    document.addEventListener('visibilitychange', () => document.hidden ? window.clearInterval(liveTimer) : startLiveDemo());
    activateLiveStage(0);
  }

  menuButton?.addEventListener('click', () => setMenu(true));
  menuClose?.addEventListener('click', () => setMenu(false));
  menu?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenu(false);
      closeWhatsApp();
    }
  });

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    body.classList.add('sync-reveal-ready');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const conversations = {
    clinica: {
      contact: 'Clínica Movimento',
      intent: 'Interesse: avaliação inicial',
      messages: [
        ['from-client', 'Quero entender como funciona a primeira avaliação.'],
        ['from-sync', 'Posso orientar. É para você ou para outra pessoa? Assim preparo o caminho certo.']
      ],
      summary: 'Novo contato · avaliação inicial · aguardando preferência de horário'
    },
    imoveis: {
      contact: 'Almeida Imóveis',
      intent: 'Interesse: imóvel residencial',
      messages: [
        ['from-client', 'Procuro um apartamento com dois quartos na região central.'],
        ['from-sync', 'Entendi. Você já definiu faixa de investimento e prazo para mudança?']
      ],
      summary: 'Busca residencial · região central · necessidades em qualificação'
    },
    servicos: {
      contact: 'Ramos Consultoria',
      intent: 'Interesse: atendimento empresarial',
      messages: [
        ['from-client', 'Vocês atendem empresas com equipe em mais de uma cidade?'],
        ['from-sync', 'Sim. Para indicar o formato adequado, quantas unidades e pessoas participam do processo?']
      ],
      summary: 'Atendimento B2B · múltiplas unidades · aguardando tamanho da operação'
    }
  };

  const contact = document.getElementById('demoContact');
  const intent = document.getElementById('demoIntent');
  const stream = document.getElementById('demoMessages');
  const summary = document.getElementById('demoSummary');
  document.querySelectorAll('[data-thread]').forEach((button) => {
    button.addEventListener('click', () => {
      const data = conversations[button.dataset.thread];
      if (!data || !contact || !intent || !stream || !summary) return;
      document.querySelectorAll('[data-thread]').forEach((item) => item.classList.toggle('active', item === button));
      contact.textContent = data.contact;
      intent.textContent = data.intent;
      stream.replaceChildren(...data.messages.map(([className, text]) => {
        const message = document.createElement('p');
        message.className = className;
        message.textContent = text;
        return message;
      }));
      summary.textContent = data.summary;
      stream.animate([{ opacity: .35, transform: 'translateY(5px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'ease-out' });
    });
  });

  const workspaceTabs = [...document.querySelectorAll('[data-workspace-tab]')];
  const workspacePanels = [...document.querySelectorAll('[data-workspace-panel]')];
  const workspaceTitle = document.getElementById('workspaceTitle');
  const workspaceEyebrow = document.getElementById('workspaceEyebrow');
  const workspaceStatus = document.getElementById('workspaceStatus');
  const workspaceCopy = {
    overview: ['Hoje', 'Central de atendimento', 'Operação ativa'],
    conversations: ['Caixa de entrada', 'Conversas com contexto', 'Fila organizada'],
    opportunities: ['Pipeline', 'Oportunidades em andamento', '7 oportunidades'],
    agents: ['Equipe digital', 'Agentes em operação', '4 funções ativas'],
    knowledge: ['Base aprovada', 'Conhecimento da empresa', '1 item para revisar'],
  };

  const activateWorkspacePanel = (name, moveFocus = false) => {
    const activeTab = workspaceTabs.find((tab) => tab.dataset.workspaceTab === name);
    const activePanel = workspacePanels.find((panel) => panel.dataset.workspacePanel === name);
    if (!activeTab || !activePanel) return;
    workspaceTabs.forEach((tab) => {
      const selected = tab === activeTab;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    workspacePanels.forEach((panel) => {
      const selected = panel === activePanel;
      panel.hidden = !selected;
      panel.classList.toggle('active', selected);
    });
    const copy = workspaceCopy[name];
    if (copy) {
      if (workspaceEyebrow) workspaceEyebrow.textContent = copy[0];
      if (workspaceTitle) workspaceTitle.textContent = copy[1];
      if (workspaceStatus) workspaceStatus.textContent = copy[2];
    }
    if (moveFocus) activeTab.focus({ preventScroll: true });
  };

  workspaceTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateWorkspacePanel(tab.dataset.workspaceTab));
    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % workspaceTabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + workspaceTabs.length) % workspaceTabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = workspaceTabs.length - 1;
      else return;
      event.preventDefault();
      activateWorkspacePanel(workspaceTabs[nextIndex].dataset.workspaceTab, true);
    });
  });

  const impactTabs = [...document.querySelectorAll('[data-impact-tab]')];
  const impactPanels = [...document.querySelectorAll('[data-impact-panel]')];

  const activateImpactPanel = (name, moveFocus = false) => {
    const activeTab = impactTabs.find((tab) => tab.dataset.impactTab === name);
    const activePanel = impactPanels.find((panel) => panel.dataset.impactPanel === name);
    if (!activeTab || !activePanel) return;

    impactTabs.forEach((tab) => {
      const selected = tab === activeTab;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    impactPanels.forEach((panel) => {
      panel.hidden = panel !== activePanel;
    });
    if (moveFocus) activeTab.focus({ preventScroll: true });
  };

  impactTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateImpactPanel(tab.dataset.impactTab));
    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % impactTabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + impactTabs.length) % impactTabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = impactTabs.length - 1;
      else return;
      event.preventDefault();
      activateImpactPanel(impactTabs[nextIndex].dataset.impactTab, true);
    });
  });

  document.querySelectorAll('.sync-faq-list article').forEach((article) => {
    const button = article.querySelector('button');
    button?.addEventListener('click', () => {
      const wasOpen = article.classList.contains('open');
      document.querySelectorAll('.sync-faq-list article.open').forEach((openArticle) => {
        openArticle.classList.remove('open');
        openArticle.querySelector('button')?.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        article.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const waButton = document.getElementById('syncWaButton');
  const waDialog = document.getElementById('syncWaDialog');
  const waBackdrop = document.getElementById('syncWaBackdrop');
  const waClose = document.getElementById('syncWaClose');
  const waName = document.getElementById('syncWaName');
  const waPhone = document.getElementById('syncWaPhone');
  const waForm = document.getElementById('syncWaForm');
  const waSubmit = document.getElementById('syncWaSubmit');
  const countryButton = document.getElementById('syncCountryButton');
  const countryMenu = document.getElementById('syncCountryMenu');
  const countrySearch = document.getElementById('syncCountrySearch');
  const countryOptions = Array.from(countryMenu?.querySelectorAll('[data-code]') || []);
  const countryEmpty = countryMenu?.querySelector('.sync-country-empty');
  let countryCode = '+55';

  const normalizeCountry = (value = '') => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');

  function resetCountrySearch() {
    if (countrySearch) countrySearch.value = '';
    countryOptions.forEach((option) => { option.hidden = false; });
    if (countryEmpty) countryEmpty.hidden = true;
  }

  function closeCountryMenu() {
    countryMenu?.classList.remove('open');
    countryButton?.setAttribute('aria-expanded', 'false');
    resetCountrySearch();
  }

  function setWhatsApp(open) {
    if (!waDialog || !waButton || !waBackdrop) return;
    waDialog.classList.toggle('open', open);
    waBackdrop.classList.toggle('open', open);
    waDialog.setAttribute('aria-hidden', String(!open));
    waButton.setAttribute('aria-expanded', String(open));
      body.classList.toggle('wa-open', open);
      body.classList.toggle('dialog-open', open);
    if (open) window.setTimeout(() => waName?.focus(), 220);
  }

  function closeWhatsApp() {
    setWhatsApp(false);
    closeCountryMenu();
  }

  waButton?.addEventListener('click', () => setWhatsApp(true));
  waClose?.addEventListener('click', closeWhatsApp);
  waBackdrop?.addEventListener('click', closeWhatsApp);

  const validateWhatsApp = () => {
    const ready = Boolean(waName?.value.trim()) && (waPhone?.value.replace(/\D/g, '').length || 0) >= 8;
    waSubmit?.classList.toggle('ready', ready);
    return ready;
  };
  waName?.addEventListener('input', validateWhatsApp);
  waPhone?.addEventListener('input', () => {
    const digits = waPhone.value.replace(/\D/g, '').slice(0, 11);
    waPhone.value = digits.length > 10
      ? digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
      : digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    validateWhatsApp();
  });

  countryButton?.addEventListener('click', () => {
    const open = !countryMenu?.classList.contains('open');
    countryMenu?.classList.toggle('open', open);
    countryButton.setAttribute('aria-expanded', String(open));
    if (open) window.setTimeout(() => countrySearch?.focus(), 80);
  });

  countrySearch?.addEventListener('input', () => {
    const query = normalizeCountry(countrySearch.value.trim());
    let visibleCount = 0;
    countryOptions.forEach((option) => {
      const label = normalizeCountry(`${option.dataset.country || ''} ${option.dataset.code || ''}`);
      const visible = label.includes(query);
      option.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    if (countryEmpty) countryEmpty.hidden = visibleCount > 0;
  });

  countryOptions.forEach((option) => {
    option.addEventListener('click', () => {
      countryCode = option.dataset.code || '+55';
      const asset = option.dataset.asset || 'br';
      const flag = countryButton.querySelector('.sync-country-flag');
      const code = countryButton.querySelector('.sync-country-code');
      if (flag) flag.src = `/flags/${asset}.svg`;
      if (code) code.textContent = countryCode;
      countryOptions.forEach((item) => item.setAttribute('aria-selected', String(item === option)));
      closeCountryMenu();
      waPhone?.focus();
    });
  });

  waForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateWhatsApp()) return;
    const number = `${countryCode}${waPhone.value.replace(/\D/g, '')}`.replace(/\D/g, '');
    const message = `Olá, sou ${waName.value.trim()}. Quero avaliar como o Avancini Sync pode organizar meu atendimento. Meu telefone é ${countryCode} ${waPhone.value}.`;
    window.open(`https://wa.me/5573981019782?text=${encodeURIComponent(message)}&phone=${number}`, '_blank', 'noopener,noreferrer');
  });
})();
