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
  assert.match(html, /Onde sua empresa deixa a oportunidade escapar\?/i);
  assert.match(html, /Você não precisa dos dois/i);
  assert.match(html, /SOLUÇÃO COMPLETA · INDEPENDENTE/i);
  assert.match(html, /Avancini Dash/i);
  assert.match(html, /Avancini Sync/i);
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
  assert.match(html, /Combo Site \+ Chatbot|Combo Site \+ Atendente IA/i);
  assert.match(html, /R\$ 89,90/i);
  assert.match(html, /R\$ 89,90\/mês/i);
  assert.match(html, /11 EXPERIÊNCIAS COMPLETAS/i);
  assert.match(html, /9<\/strong><span>conceitos por segmento/i);
  assert.match(html, /Quanto pode custar/i);
  assert.match(html, /SIMULAÇÃO, NÃO PROMESSA/i);
  assert.match(html, /Quantos novos contatos justificariam o projeto/i);
  assert.doesNotMatch(html, /percentual estimado|pontos percentuais/i);
  assert.match(html, /href="\/sync"/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/avanciniweb\.vercel\.app\/dash"/i);
  assert.match(html, /href="\/site-por-assinatura#plano-landing-page"/i);
  
  assert.match(html, /Avancini Dash/i);
  assert.doesNotMatch(html, /Avancini Web/i);
  assert.doesNotMatch(html, /Meu WhatsApp é|DDD \+ número|número do WhatsApp/i);
});

test("renderiza a Avancini Sync com oferta mensal e demonstrações", async () => {
  const response = await render("/sync");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Seu cliente chamou/i);
  assert.match(html, /R\$ 197,90/i);
  assert.match(html, /R\$ 397,90/i);
  assert.match(html, /R\$ 249,90/i);
  assert.match(html, /Sem taxa de implementação/i);
  assert.match(html, /permanência mínima de 6 meses/i);
  assert.match(html, /melhor primeiro passo para este cenário/i);
  assert.match(html, /CENTRAL DE OPERAÇÕES · SIMULAÇÃO AO VIVO/i);
  assert.match(html, /Seu concorrente não precisa ser melhor/i);
  assert.match(html, /VAZAMENTO DETECTADO/i);
  assert.match(html, /Em cada 10 bons contatos/i);
  assert.match(html, /SEM MÉDIA GENÉRICA DE MERCADO/i);
  assert.match(html, /Veja o que acontece/i);
  assert.match(html, /SYNC EM OPERAÇÃO/i);
  assert.match(html, /href="\/dash"/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/avanciniweb\.vercel\.app\/sync"/i);
  assert.doesNotMatch(html, /taxa de implantação|CRM/i);
});

test("mantém a página de planos alinhada aos valores e à marca Dash", async () => {
  const response = await render("/site-por-assinatura");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Landing Page/i);
  assert.match(html, /R\$ 89,90/i);
  assert.match(html, /R\$ 179,90/i);
  assert.match(html, /Combo Site \+ Chatbot|Combo Site \+ Atendente IA/i);
  assert.match(html, /R\$ 249,90/i);
  assert.doesNotMatch(html, /R\$ 97\/mês|sub-sticky/i);
});

test("mantém a mensagem do WhatsApp sem repetir o telefone do visitante", async () => {
  const page = await readFile(new URL("../app/web/page.tsx", import.meta.url), "utf8");
  assert.match(page, /const message = `Olá! Meu nome é \$\{cleanName\}\. \$\{leadIntent\}`/);
  assert.doesNotMatch(page, /leadPhone|leadCountry|Meu WhatsApp é|DDD \+ número/);
  assert.match(page, /ABRIR CONVERSA NO WHATSAPP/);
  assert.match(page, /timelineOptionsFor/);
});
