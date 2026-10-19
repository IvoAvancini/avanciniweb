---
version: 2
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets:
  - "app/avancini-os-client.tsx"
  - "app/signal-hero.tsx"
  - "app/signal-capabilities.tsx"
  - "app/signal-system.tsx"
  - "app/signal-showcase.tsx"
  - "app/signal-closure.tsx"
---

# Home — Avancini OS

Mode: Persuade.

Audience: empresas, profissionais e marcas que precisam melhorar presença, venda, atendimento ou operação sem precisar dominar tecnologia.

Job: perceber rapidamente que a Avancini reúne seis frentes equivalentes e pode conectar marca, canais e rotina interna.

Action: explorar as frentes e trabalhos, depois iniciar uma conversa contextualizada pelo WhatsApp.

Proof: Janildo Araújo como projeto publicado; uma seleção enxuta de experiências autorais para energia solar, personal, moda, automotivo, advocacia, medicina e odontologia, sempre com origem declarada.

Constraints: Avancini OS é a única marca pública; o “A” original precisa permanecer; não inventar números, clientes, resultados ou depoimentos; as seis frentes têm o mesmo peso.

## Direction contract

THESIS: A página é um sistema operacional de negócio em movimento, uma experiência editorial interativa que vende presença, inteligência e operação com o mesmo peso. Recusa o hero automotivo, o catálogo de cards e o painel SaaS genérico.

OWN-WORLD: Obsidiana, branco mineral, azul cobalto e azul glacial extraídos do A da Avancini, com verde restrito a estados de operação. Tipografia grotesca de alta presença e serifada editorial somente onde cria contraste real. Trilhas luminosas, campos de profundidade e linhas de dados aparecem apenas quando explicam estado, fluxo ou conexão.

STORY: O visitante reconhece uma única Avancini, entende que sites são uma porta entre seis frentes equivalentes, abre uma página aprofundada da solução que precisa, vê trabalhos por segmento e inicia uma conversa com contexto.

FIRST VIEWPORT: Cabeçalho compacto com o “A” original; narrativa “Da marca à operação” à esquerda; seis módulos táteis equivalentes à direita; saída de sinal ativa e chamada “Começar um projeto”. O painel reage ao cursor e às escolhas, com alternativa completa para movimento reduzido.

FORM: Superfície editorial viva seguida por manifesto, portal de seis soluções, mapa de integração, capítulos imersivos de projetos, processo, FAQ e contato. Cada solução tem sua própria página comercial; o mapa é uma explicação relacional, não um dashboard. Direção sem seed gerado, pois o usuário fixou explicitamente Elo, Umbler e as referências internacionais como norte, com identidade própria da Avancini.

FINISH: Revisão independente encerrada com SHIP. Build, lint, 12 testes renderizados e validação responsiva no navegador passaram na rodada final.

## Motion and access

- Hero, frentes e mapa alternam automaticamente somente até a primeira escolha manual.
- Hover, foco e clique levam ao mesmo estado; toda interação importante funciona por teclado e toque.
- Revelações preservam conteúdo visível por padrão e usam IntersectionObserver apenas como melhoria.
- `prefers-reduced-motion: reduce` desliga animações e transições sem remover conteúdo.
- O menu modal prende foco, fecha com Escape e devolve foco ao botão de abertura.

## Shipping rasters and provenance

- `.impeccable/review/desktop-hero.png`: captura Playwright do localhost, hero final em desktop.
- `.impeccable/review/desktop-system.png`: captura Playwright do localhost, mapa integrado final.
- `.impeccable/review/desktop-work.png`: captura Playwright do localhost, workbench final.
- `.impeccable/review/desktop-method.png`: captura Playwright do localhost, processo e fechamento.
- `.impeccable/review/mobile-final.png`: captura Playwright do localhost, página final em mobile.
- Janildo Araújo usa material de um projeto publicado. Solaris Energia, Caio Move, Vértice, Motora, Moreira Advocacia, Clínica San Diego e Nexo Odonto são experiências autorais claramente identificadas.
