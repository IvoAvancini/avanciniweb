# Spec: Avancini OS — da marca à operação

## Objetivo

Manter uma única presença pública para a Avancini OS e comunicar, com o mesmo peso, seis frentes que podem funcionar separadas ou conectadas. A página precisa demonstrar capacidade visual e técnica, explicar o sistema sem jargão e conduzir a uma conversa real.

## Direção aprovada

**THESIS:** Avancini OS é um Estúdio de Sinais, um sistema editorial interativo que transforma estratégia em presença, relacionamento e operação.

**OWN-WORLD:** Tinta mineral, papel cru, metal fosco, coral e lima. Space Grotesk traz precisão, Playfair Display introduz tensão editorial e Manrope sustenta leitura. Módulos, knobs, LEDs, cabos, ondas e órbitas têm função e resposta.

**STORY:** O visitante encontra a marca única, explora seis frentes equivalentes, entende como elas se conectam, vê um projeto publicado e dois estudos autorais, conhece o processo e inicia uma conversa.

**FIRST VIEWPORT:** O “A” original e a assinatura AVANCINI OS abrem o cabeçalho. A narrativa “Da marca à operação” divide o espaço com seis módulos interativos. Cada módulo atualiza um sinal ativo; a chamada principal leva ao contato.

**FORM:** Instrumento modular editorial, responsivo e acessível. O mapa posterior mostra integração entre frentes sem imitar dashboard nem fabricar métricas.

## Stack

- Next.js/Vinex, React 19 e TypeScript.
- CSS próprio, separado por superfície, sem biblioteca visual adicional.
- Renderização estática com interações client-side para módulos, abas, menu, mapa, trabalhos e FAQ.
- `next/font` para Manrope, Space Grotesk e Playfair Display.

## Estrutura atual

- `app/page.tsx`: metadados da home e composição dos estilos da superfície.
- `app/layout.tsx`: fontes, metadados globais, canais e dados estruturados das seis frentes.
- `app/avancini-os-client.tsx`: menu modal, revelação progressiva e composição dos capítulos.
- `app/avancini-mark.tsx`: marca original reutilizada no cabeçalho, mapa e rodapé.
- `app/signal-hero.tsx` e `app/signal-hero.css`: hero modular e seis sinais.
- `app/signal-capabilities.tsx` e `app/signal-capabilities.css`: manifesto e exploração das seis frentes.
- `app/signal-system.tsx` e `app/signal-system.css`: mapa de integração e fluxo selecionado.
- `app/signal-showcase.tsx` e `app/signal-showcase.css`: Janildo, Cora e Noma.
- `app/signal-closure.tsx` e `app/signal-closure.css`: processo, FAQ, contato, rodapé e WhatsApp.
- `app/signal-shell.css`: raiz da página, revelação e menu editorial.
- `tests/rendered-html.test.mjs`: contrato renderizado de marca, conteúdo e seis frentes.

## Interações

- Hero, exploração de frentes e mapa alternam automaticamente até a primeira interação manual.
- Hover, foco e clique selecionam a mesma frente e atualizam regiões anunciadas quando aplicável.
- O menu prende foco, fecha com Escape e devolve foco ao gatilho.
- O FAQ informa `aria-expanded`, relaciona pergunta e resposta e permite fechar o item aberto.
- Movimento reduzido remove animações e transições sem retirar conteúdo ou controles.
- A página não depende de hover; todas as escolhas funcionam por teclado e toque.

## Conteúdo e portfólio

- As frentes são: identidade, sites, e-commerce, agentes de IA, CRM/WhatsApp/automação e sistemas sob medida.
- Janildo Araújo é o projeto publicado e abre a seleção.
- Cora e Noma são estudos autorais, rotulados com clareza.
- O portfólio deve continuar curto. Novos trabalhos entram apenas quando acrescentarem uma disciplina, problema ou nível de prova que ainda não existe.

## Comandos de verificação

- Desenvolvimento: `pnpm dev`.
- Build: `pnpm build`.
- Testes de conteúdo: `node --test tests/rendered-html.test.mjs`.
- Lint: `pnpm lint`.
- Detector Impeccable: executar uma vez sobre os alvos visuais alterados ao encerrar uma nova rodada de UI.

## Critérios de sucesso

- Avancini OS é a única marca pública e o “A” original aparece no sistema.
- O primeiro viewport explica “Da marca à operação”, mostra as seis frentes e oferece uma ação clara.
- Nenhuma frente recebe importância estrutural maior que as demais.
- O mapa explica integração sem KPIs, dados simulados ou aparência de dashboard.
- Janildo é identificado como publicado; Cora e Noma, como estudos autorais.
- Menu, módulos, abas, mapa, FAQ e WhatsApp funcionam com teclado e toque.
- Não há rolagem horizontal em 360, 390, 1280 ou 1440 px.
- `prefers-reduced-motion` mantém toda a informação e remove movimento não essencial.
- Build, lint e testes renderizados passam.

## Limites

### Sempre

- Preservar a marca original, os canais de contato e a distinção entre trabalho publicado e estudo autoral.
- Escrever em português natural, sem tom genérico de IA.
- Manter foco visível, semântica, leitura mobile e alternativa de movimento reduzido.
- Tratar animação como comunicação de estado ou fluxo.

### Perguntar antes

- Publicar o site.
- Criar commits ou enviar mudanças a um repositório remoto.
- Alterar contato, identidade central ou afirmações comerciais.

### Nunca

- Reintroduzir Dash ou Sync como marcas públicas independentes.
- Inventar clientes, métricas, depoimentos, resultados ou tamanho da equipe.
- Apresentar estudo autoral como entrega real.
- Esconder conteúdo essencial atrás de animação, hover ou autoplay.
- Transformar a visualização de integração em painel corporativo de métricas.

## Estado de acabamento

O finish review independente encerrou com **SHIP**. A verificação visual final cobre 360, 390, 1280 e 1440 px, interações principais, foco do menu, estados do FAQ e ausência de rolagem horizontal. Capturas de referência ficam em `.impeccable/review/desktop-hero.png`, `.impeccable/review/desktop-system.png`, `.impeccable/review/desktop-work.png`, `.impeccable/review/desktop-method.png` e `.impeccable/review/mobile-final.png`.
