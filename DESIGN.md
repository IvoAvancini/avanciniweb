---
name: Avancini OS — Sistema Operacional Vivo
description: Uma experiência editorial interativa que conecta marca, presença digital e operação.
colors:
  ink: "#07101d"
  paper: "#edf2f7"
  cobalt: "#478dff"
  ice: "#73e6ff"
  metal: "#b4b3aa"
  whatsapp: "#20b858"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(3.75rem, 6.4vw, 6rem)"
    fontWeight: 650
    lineHeight: 0.84
    letterSpacing: "-0.04em"
  editorial:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.625rem, 5.15vw, 5.125rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "0.5625rem"
    fontWeight: 720
    lineHeight: 1
    letterSpacing: "0.18em"
rounded:
  square: "0"
  control: "3px"
  compact: "10px"
  round: "50%"
spacing:
  xs: "6px"
  sm: "10px"
  md: "20px"
  lg: "34px"
  section-inline: "4.2vw"
  section-block: "128px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0 24px"
    height: "62px"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0 24px"
    height: "70px"
  module:
    backgroundColor: "{colors.metal}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "16px 10px"
---

# Design System: Avancini OS

## Overview

**Creative North Star: “Sistema Operacional Vivo”**

A Avancini OS se apresenta como uma empresa única, capaz de ligar identidade, sites, e-commerce, agentes de IA, CRM e sistemas sob a mesma direção. O site se comporta como um instrumento editorial vivo, com controles táteis, fluxos visíveis e páginas comerciais próprias para cada solução, sem cair em estética de dashboard, catálogo SaaS ou site automotivo.

A base é obsidiana e branco mineral, com azul cobalto e azul glacial derivados do “A” original da marca. Verde fica restrito ao WhatsApp e a estados operacionais inequívocos.

**Key Characteristics:**

- Contraste editorial alto, títulos fortes com teto de 6rem e respiros generosos.
- Seis frentes com o mesmo peso, conectadas pela mesma marca.
- Movimento explica estado, resposta, continuidade ou relação.
- Superfícies minerais, linhas finas e cor usada como sinal funcional.
- Trabalhos apresentados em escala, com origem e autoria explícitas.

## Colors

- **Tinta mineral `#07101d`:** hero, painéis, FAQ, rodapés e texto em fundos claros.
- **Branco mineral `#edf2f7`:** pausas editoriais e leitura longa.
- **Azul cobalto `#478dff`:** ação principal, foco e direção.
- **Azul glacial `#73e6ff`:** estados ativos, conexões e resposta.
- **Metal `#b4b3aa`:** módulos e objetos de operação.
- **Verde WhatsApp `#20b858`:** uso exclusivo do canal e de estados operacionais claros.

**Regra do sinal.** Cobalto conduz, glacial confirma. Nenhum dos dois existe como brilho gratuito.

**Regra de superfície.** Cada seção tem base clara ou escura dominante. Evitar gradientes genéricos de SaaS e vidro decorativo.

## Typography

Space Grotesk estrutura, Playfair Display muda o ritmo e Manrope sustenta a leitura. Títulos de display não ultrapassam 6rem e nenhum tracking negativo é mais fechado que `-0.04em`. Labels usam caixa alta apenas como coordenada real da interface, nunca como texto decorativo acima de todo título.

## Layout

As seções ocupam toda a largura e alternam densidade. O recuo horizontal recorrente é 4,2% no desktop, com 96 a 150px no eixo vertical. Cabeçalhos de seção usam índice, título e contexto, colapsando para uma coluna abaixo de 900–1050px.

O primeiro viewport divide narrativa e console interativo. Em telas menores, ambos empilham e os seis módulos viram uma matriz de três colunas. As larguras de referência são 360, 390, 1280 e 1440px, sem rolagem horizontal.

**Regra das frentes iguais.** Identidade, sites, e-commerce, agentes de IA, CRM e sistemas têm a mesma importância. Uma escolha ativa pode ganhar foco temporário, nunca prioridade estrutural permanente.

## Elevation & Depth

O sistema é plano por padrão. Sombras amplas aparecem somente sob consoles, painéis e ações que estão fisicamente acima do plano; linhas, contraste tonal e textura resolvem o restante da hierarquia.

**The Flat-at-Rest Rule.** Texto e seções não flutuam, profundidade pertence a objetos manipuláveis e estados de interação.

## Shapes

Retângulos retos ou quase retos definem ações, painéis e módulos. Círculos pertencem a knobs, portas, LEDs, órbitas, nós e ao atalho de WhatsApp. Bordas de um pixel organizam a interface, enquanto o “A” original da Avancini permanece íntegro em todas as aplicações.

## Components

### Buttons and icons

Botões são retangulares, com rótulo e ícone SVG consistente. Hover eleva pouco e desloca o ícone na direção da ação. Setas tipográficas e símbolos “+” decorativos não substituem ícones.

Movimento entra onde esclarece resposta ou fluxo: módulos, cabos, mapa de integração, troca de projetos, acordeão e transições de página. Interações de ponteiro não operam com `prefers-reduced-motion: reduce` e conteúdo nunca depende de animação. React Bits é repertório, não dependência integral; um efeito externo só entra quando melhora clareza sem diluir autoria, acessibilidade ou desempenho.

### Signal modules

Os seis módulos do hero são botões com knob, LED, porta e resposta visual. O módulo ativo atualiza a saída, mas todo o conteúdo permanece compreensível sem animação.

### Integration map

O mapa central mostra as seis frentes ao redor da marca e explica fluxos em três etapas. É uma visualização de relação, sem KPIs, gráficos ou dados fictícios.

### Project workbench

O workbench apresenta oito recortes: Janildo Araújo como projeto publicado e Solaris Energia, Caio Move, Vértice, Motora, Moreira Advocacia, Clínica San Diego e Nexo Odonto como experiências autorais. Cada trabalho explicita problema, direção, valor e frentes envolvidas.

### FAQ and contact

O FAQ usa acordeão escuro com estado semântico e foco visível. O fechamento glacial mantém uma única chamada principal para WhatsApp, seguido de contatos reais.

## Do's and Don'ts

### Do:

- **Do** preservar o “A” original da Avancini como assinatura central.
- **Do** dar o mesmo peso às seis soluções e manter páginas aprofundadas para todas.
- **Do** usar animação para explicar estado, fluxo, resposta ou continuidade.
- **Do** declarar autoria e manter projetos, contatos e afirmações verificáveis.

### Don't:

- **Don't** reintroduzir Dash ou Sync como marcas públicas separadas.
- **Don't** transformar o mapa num dashboard corporativo.
- **Don't** inventar métricas, clientes, resultados ou depoimentos.
- **Don't** usar microtexto técnico sem significado, slogans genéricos ou efeitos de biblioteca como decoração.
