import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

let workerInstance = null;
async function getWorker() {
  if (!workerInstance) {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    const mod = await import(workerUrl.href);
    workerInstance = mod.default;
  }
  return workerInstance;
}

async function render(pathname = "/") {
  const worker = await getWorker();
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renderiza a matriz Avancini OS sem conteúdo do starter", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Avancini OS — Tecnologia com identidade<\/title>/i);
  assert.match(html, /Avancini Dash/i);
  assert.match(html, /Avancini Sync/i);
  assert.match(html, /Você pode perder o cliente/i);
  assert.match(html, /Em qual momento sua empresa perde o cliente/i);
  assert.match(html, /duas soluções independentes/i);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("renderiza a Avancini Dash com oferta e portfólio coerentes", async () => {
  const response = await render("/dash");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Tenha hoje um site/i);
  assert.match(html, /Presença que trabalha/i);
  assert.match(html, /Landing Page Profissional/i);
  assert.match(html, /Site Catálogo/i);
  assert.match(html, /R\$ 79,90/i);
  assert.match(html, /Pagamento único/i);
  assert.match(html, /sem mensalidade Avancini/i);
  assert.match(html, /RECOMENDADO PARA COMEÇAR/i);
  assert.match(html, /MAIS LIBERDADE/i);
  assert.doesNotMatch(html, /R\$ 49,90.*(?:domínio|\.com\.br)|(?:domínio|\.com\.br).*R\$ 49,90/i);
  assert.match(html, /REF:\/\/ DESTAQUES · 08/i);
  assert.match(html, /Oito experiências diferentes/i);
  assert.match(html, /Moreira (?:&|&amp;) Lima/i);
  assert.match(html, /Auréa Atelier/i);
  assert.doesNotMatch(html, /Bella - Especialista Avancini|Solicite seu orçamento/i);
  assert.match(html, /PROJETO REAL · CLÍNICA SAN DIEGO/i);
  assert.match(html, /Quanto pode custar/i);
  assert.match(html, /SIMULAÇÃO, NÃO PROMESSA/i);
  assert.match(html, /Quantos clientes adicionais formam um cenário possível/i);
  assert.match(html, /CÁLCULO VISÍVEL/i);
  assert.match(html, /clientes ou pedidos adicionais × valor médio/i);
  assert.doesNotMatch(html, /percentual estimado|pontos percentuais/i);
  assert.match(html, /href="\/sync"/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/www\.avancini\.me\/dash"/i);
  
  assert.match(html, /Avancini Dash/i);
  assert.doesNotMatch(html, /Avancini Web/i);
  assert.doesNotMatch(html, /Meu WhatsApp é|DDD \+ número|número do WhatsApp/i);
});

test("mantém a recorrência do Dash mais vantajosa que a modalidade flexível", async () => {
  const source = await readFile(new URL("../app/web/page.tsx", import.meta.url), "utf8");
  assert.match(source, /price: "R\$ 79,90\/mês"[\s\S]*?priceNoFidelity: "R\$ 99,90\/mês"/i);
  assert.match(source, /price: "A partir de R\$ 109,90\/mês"[\s\S]*?priceNoFidelity: "A partir de R\$ 139,90\/mês"/i);
  assert.match(source, /price: "A partir de R\$ 139,00\/mês"[\s\S]*?priceNoFidelity: "A partir de R\$ 169,90\/mês"/i);
  assert.match(source, /price: "A partir de R\$ 149,90\/mês"[\s\S]*?priceNoFidelity: "A partir de R\$ 189,90\/mês"/i);
});

test("mantém Torque, Advocacia e Salão como experiências realmente distintas", async () => {
  const source = await readFile(new URL("../app/web/sector-showcases.tsx", import.meta.url), "utf8");
  assert.match(source, /CENTRAL DO VEÍCULO/i);
  assert.match(source, /ORÇAMENTO TRANSPARENTE/i);
  assert.match(source, /LEGAL INTELLIGENCE/i);
  assert.match(source, /BOARD MEMO/i);
  assert.match(source, /ATELIER NOTES/i);
  assert.match(source, /PRÓXIMAS JANELAS/i);
});

test("renderiza a Avancini Sync com oferta mensal e demonstrações", async () => {
  const response = await render("/sync");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Seu cliente chamou/i);
  assert.match(html, /R\$ 129,90/i);
  assert.match(html, /R\$ 387,90/i);
  assert.match(html, /Pagamento único/i);
  assert.match(html, /R\$ 0 para ativar/i);
  assert.match(html, /permanência de 6 meses/i);
  assert.match(html, /MELHOR PRIMEIRO PASSO PARA ESTE CENÁRIO/i);
  assert.match(html, /01 — DEMONSTRAÇÃO AO VIVO/i);
  assert.match(html, /Teste uma conversa/i);
  assert.match(html, /Seu concorrente não precisa ser melhor/i);
  assert.match(html, /OPORTUNIDADES ESPERANDO/i);
  assert.match(html, /Em cada 10 bons contatos/i);
  assert.match(html, /SEM MÉDIA GENÉRICA DE MERCADO/i);
  assert.match(html, /Cada uma funciona sozinha/i);
  assert.match(html, /Chatbot organiza caminhos previsíveis/i);
  assert.match(html, /Atendente IA entende perguntas livres/i);
  assert.match(html, /href="\/dash"/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/www\.avancini\.me\/sync"/i);
  assert.doesNotMatch(html, /taxa de implantação|CRM/i);
});

test("mantém a recorrência do Sync mais vantajosa que a modalidade flexível", async () => {
  const source = await readFile(new URL("../app/sync/page.tsx", import.meta.url), "utf8");
  assert.match(source, /contractPrice: "R\$ 129,90"[\s\S]*?flexiblePrice: "R\$ 159,90"/i);
  assert.match(source, /contractPrice: "A partir de R\$ 387,90"[\s\S]*?flexiblePrice: "A partir de R\$ 449,90"/i);
  assert.match(source, /RECOMENDADO PARA COMEÇAR/i);
  assert.match(source, /custos externos separados/i);
});

test("redireciona a antiga página de planos para a oferta única do Dash", async () => {
  const response = await render("/site-por-assinatura");
  assert.ok([301, 302, 307, 308].includes(response.status));
  assert.match(response.headers.get("location") ?? "", /\/dash#investimento$/i);
});

test("redireciona o endereço antigo Web para a marca Dash", async () => {
  const response = await render("/web");
  assert.ok([301, 302, 307, 308].includes(response.status));
  assert.match(response.headers.get("location") ?? "", /\/dash$/i);
});

test("mantém demonstrações fora da indexação e o domínio oficial nos arquivos de descoberta", async () => {
  for (const route of ["/cora", "/motora", "/vertice"]) {
    const response = await render(route);
    assert.equal(response.status, 200);
    assert.match(await response.text(), /<meta name="robots" content="noindex, nofollow"/i);
  }

  const sitemap = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  const robots = await readFile(new URL("../app/robots.ts", import.meta.url), "utf8");
  assert.match(sitemap, /https:\/\/www\.avancini\.me/);
  assert.doesNotMatch(sitemap, /site-por-assinatura/);
  assert.match(robots, /https:\/\/www\.avancini\.me\/sitemap\.xml/);
});

test("mantém a mensagem do WhatsApp sem repetir o telefone do visitante", async () => {
  const page = await readFile(new URL("../app/web/page.tsx", import.meta.url), "utf8");
  assert.match(page, /const message = `Olá! Meu nome é \$\{cleanName\}\. \$\{leadIntent\}`/);
  assert.doesNotMatch(page, /leadPhone|leadCountry|Meu WhatsApp é|DDD \+ número/);
  assert.match(page, /ABRIR CONVERSA NO WHATSAPP/);
  assert.match(page, /const message = `Olá! Meu nome é \$\{cleanName\}\. \$\{leadIntent\}`/);
});

test("limita a demonstração do Sync e oferece reinício ao concluir", async () => {
  const page = await readFile(new URL("../app/sync/page.tsx", import.meta.url), "utf8");
  assert.match(page, /const MAX_DEMO_TURNS = 3/);
  assert.match(page, /if \(!text \|\| isTyping \|\| demoFinished\) return/);
  assert.match(page, /Reiniciar conversa/);
  assert.match(page, /Quero isso no meu atendimento/);
});

test("oferece pagamento único no Dash e no Sync com condições claras", async () => {
  const dash = await readFile(new URL("../app/web/page.tsx", import.meta.url), "utf8");
  const sync = await readFile(new URL("../app/sync/page.tsx", import.meta.url), "utf8");
  assert.match(dash, /oneTimePrice: "R\$ 997,00"/);
  assert.match(dash, /pagamento-unico/);
  assert.match(dash, /Domínio \.com\.br incluso, sujeito à disponibilidade e análise/i);
  assert.match(dash, /Nos formatos mensais, o \.com\.br é opcional/i);
  assert.match(sync, /oneTimePrice: "R\$ 997,00"/);
  assert.match(sync, /oneTimePrice: "A partir de R\$ 1\.997,00"/);
  assert.match(sync, /custos inevitáveis de WhatsApp, APIs, inteligência artificial/i);
});
