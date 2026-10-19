# Avaliação do ecossistema comercial Avancini OS

## Design Health Score

| # | Heurística | Nota | Problema principal |
|---|---|---:|---|
| 1 | Visibilidade do status | 2 | Há estados visuais, mas o envio do Sync falha e não chega ao WhatsApp. |
| 2 | Correspondência com o mundo real | 3 | A linguagem comercial é boa, mas OS, Inbox, Radar, CRM e IA chegam antes da demonstração. |
| 3 | Controle e liberdade | 2 | Alguns modais têm bom controle; Sync não contém o foco e movimentos longos não oferecem pausa. |
| 4 | Consistência e padrões | 2 | OS, Dash e Sync parecem três marcas vizinhas. |
| 5 | Prevenção de erros | 1 | O principal envio de lead do Sync quebra por variável indefinida. |
| 6 | Reconhecimento em vez de memorização | 3 | Seções são nomeadas, mas a arquitetura dos produtos exige interpretação. |
| 7 | Flexibilidade e eficiência | n/a | Superfície comercial. |
| 8 | Estética e design minimalista | 2 | Boa execução local, porém excesso de efeitos, exemplos e caminhos. |
| 9 | Reconhecimento e recuperação de erros | 1 | Falhas de rede e do envio principal não possuem recuperação clara. |
| 10 | Ajuda e documentação | n/a | Superfície comercial; FAQ atende parte dessa função. |
| **Total** |  | **16/32** | **Visualmente promissor, comercial e tecnicamente frágil.** |

## Veredito de especificidade

O conteúdo possui uma ideia própria, mas os sistemas visuais são intercambiáveis com agência digital, SaaS de IA e plataforma de automação. O elemento realmente exclusivo é a oportunidade atravessando toda a jornada: site, WhatsApp, qualificação, CRM, próximo passo e follow-up.

O Elo serve como referência de confiança comercial, catálogo coerente, prova e produto sob uma marca única. Não deve ser copiado em paleta, robôs, carrosséis antigos ou volume de serviços. O Avancini já é mais moderno; precisa adquirir a clareza e a evidência que fazem a Elo parecer estabelecida.

## Impressão geral

A ambição existe, mas está distribuída entre três personalidades. O Dash exibe quantidade quando deveria exibir julgamento. O Sync descreve um sistema operacional, mas demonstra principalmente um chatbot roteirizado. O CRM aparece em texto e em pequenos sinais, não como produto utilizável.

A maior oportunidade é transformar a jornada da oportunidade no próprio material visual e narrativo do site.

## O que funciona

- A ideia de Dash antes do contato e Sync depois da mensagem é clara e comercialmente forte.
- A linguagem evita várias promessas inventadas e identifica conceitos e simulações.
- Existem boas bases de acessibilidade e interação no Dash, como Escape, foco e restauração.
- Clínica San Diego e Tape Car são provas reais que podem sustentar cases profundos.

## Problemas prioritários

### P0 - Conversão principal do Sync quebrada

`app/sync/page.tsx:231` envia `{ name, phone, intent }`, mas a variável existente é `leadPhone`. A exceção ocorre antes de abrir o WhatsApp.

Correção: reparar e testar o fluxo completo antes de qualquer redesign.

### P1 - O ecossistema parece três marcas

OS, Dash e Sync possuem paletas, efeitos e ritmos independentes. Isso enfraquece memória de marca e obriga o visitante a reconstruir a relação entre produtos.

Correção: um sistema matriz, com Dash e Sync como estados do mesmo percurso.

### P1 - O portfólio reduz confiança

Dois projetos reais competem com oito conceitos, domínios fictícios e Nike Lab. O visitante vê variedade, mas não comprovação de diagnóstico, entrega ou resultado.

Correção: dois cases reais profundos no corpo principal e um Avancini Lab separado com no máximo dois conceitos explicitamente demonstrativos.

### P1 - Sync promete operação, mas mostra roteiro

A demonstração avança respostas predeterminadas. CRM, responsabilidade, histórico, prazo, Radar e follow-up permanecem secundários.

Correção: um teatro operacional ponta a ponta em que uma conversa vira cadastro, etapa, responsável, próxima ação, alerta e transferência humana.

### P1 - Excesso de capítulos antes da convicção

Dash e Sync apresentam portfólio, simuladores, planos, processos, módulos e vários CTAs antes de prova suficiente.

Correção: prova primeiro, escopo depois; um objetivo por capítulo e divulgação progressiva.

### P2 - Dívida visual e técnica acumulada

Dash importa seis camadas sucessivas de CSS e acumula milhares de `!important`; `sync-final-pass.css` usa um seletor raiz que não existe; há falhas de foco, tabs incompletas, animação sem pausa e faixa de tablet com risco de corte no OS.

Correção: reconstruir por componentes e tokens, removendo folhas de correção substituídas.

## Arquitetura recomendada

Modelo híbrido unificado:

1. Uma homepage canônica Avancini OS com a jornada completa.
2. `/dash` e `/sync` permanecem como páginas aprofundadas e entradas de SEO.
3. Cabeçalho, tipografia, motion, prova, footer e CTA tornam-se compartilhados.
4. A homepage usa `Visão geral / Dash / Sync / Juntos` como seletor persistente.
5. CRM continua como núcleo visível do Sync, e não como terceira marca, até existir uma oferta realmente independente.

Fluxo proposto:

1. Hero: do primeiro clique ao próximo passo.
2. Jornada animada: visita, site, WhatsApp, qualificação, CRM e follow-up.
3. Seletor Dash, Sync ou conjunto.
4. Dois cases reais e um Lab claramente separado.
5. Demonstração operacional Sync/CRM.
6. Implantação e escopo.
7. Opções de entrada e preço.
8. Diagnóstico final.

## Portfólio proposto

Cada case real deve mostrar:

1. Contexto do negócio.
2. Problema comercial.
3. Decisão estratégica.
4. Três telas anotadas.
5. Jornada que o visitante agora consegue completar.
6. Escopo e URL/status real.
7. Evidência técnica ou de processo verificável.

Remover do portfólio principal os conceitos fracos ou redundantes. Ausência é mais premium do que preenchimento.

## Sync e CRM propostos

Uma clínica pode ser a demonstração principal:

1. Mensagem de primeira consulta entra.
2. IA identifica intenção, turno e urgência.
3. Contato é criado com origem, resumo e tags.
4. CRM muda de Novo contato para Triagem concluída.
5. Recepção recebe responsabilidade e próxima ação.
6. Follow-up é programado.
7. Radar sinaliza atraso se o contato não responder.
8. Humano assume com todo o contexto.

As visões Conversa, CRM e Radar devem mostrar o mesmo evento, não três exemplos desconectados. Todos os dados demonstrativos precisam ser identificados como sintéticos.

## Direção visual

Nome de trabalho: Opportunity in Motion.

- Grafite quase preto e branco mineral.
- Verde elétrico controlado para atração/Dash.
- Ciano claro para continuidade/Sync.
- Uma linha viva atravessa a página e muda de estado com a oportunidade.
- Poucos cards, cenas amplas, tipografia curta, telas reais e vídeos curtos.
- Uma grande coreografia de scroll, em vez de orbitais, ondas, grids, typewriter, marquee e pulsos competindo.
- Versão de movimento reduzido como quatro quadros editoriais imediatos.

## Pessoas afetadas

### Visitante não técnico

Encontra nomes de produtos e módulos antes de entender o problema único. Precisa de uma jornada em linguagem de negócio.

### Pequeno empresário cético

Vê mais conceitos que entregas reais e uma demonstração roteirizada. Precisa de cases verificáveis e produto operando.

### Comprador objetivo

Precisa atravessar páginas longas e muitos efeitos para comparar. Precisa de comparação Dash, Sync e Juntos, dois cases e um diagnóstico direto.

## Observações técnicas menores

- Tabs não possuem relações completas com painéis ou navegação por setas.
- O OS possui divergência entre seleção visual e `aria-selected`.
- Modal/menu do Sync não contém foco.
- Typewriter do Dash pode anunciar caracteres repetidamente por `aria-live`.
- Inputs não possuem `name` em pontos importantes.
- Não há skip link, `theme-color` ou `color-scheme` detectados.
- O detector mecânico retornou zero achados, portanto foi falso-negativo diante dos defeitos confirmados manualmente.

## Questões estratégicas

- O visitante deve escolher um produto ou reconhecer primeiro onde perde oportunidades?
- O Sync pode vender CRM sem mostrar um CRM realmente utilizável?
- Se os conceitos fossem removidos, quais provas reais fariam o Dash ser escolhido?
- Qual transformação visual seria impossível de confundir com outra agência ou SaaS?
