import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appFile = (path) => readFile(new URL(`../app/${path}`, import.meta.url), "utf8");

test("a home apresenta capacidades antes do portfólio e não usa prova social inventada", async () => {
  const client = await appFile("avancini-os-client.tsx");

  assert.ok(client.indexOf("<Capabilities") < client.indexOf("<Showcase"));
  assert.doesNotMatch(client, /StatCounterSection/);
  assert.doesNotMatch(client, /120\+|R\$\s*15M|99[,.]8%|99\.9%|ONLINE EM PRODUÇÃO|HOMOLOGADO/i);
  assert.doesNotMatch(client, /whatsapp-unread-badge|1 nova mensagem/i);
  assert.match(client, /home-hero-showcase/);
  assert.match(client, /SolutionVisual solution=\{active\} mode="hero"/);
  assert.doesNotMatch(client, /home-hero-index/);
  assert.doesNotMatch(client, /home-hero-console|home-hero-media/);
});

test("a nova entrada usa a identidade azul da Avancini e orienta a escolha", async () => {
  const client = await appFile("avancini-os-client.tsx");
  const home = await appFile("avancini-home.css");

  assert.match(client, /Escolha o ponto que precisa avançar agora/i);
  assert.match(client, /aria-live="polite"/i);
  assert.match(home, /--home-accent:\s*#478dff/i);
  assert.match(home, /--home-signal:\s*#73e6ff/i);
  assert.doesNotMatch(home, /#baff39/i);
});

test("as soluções orientam a decisão sem fingir dados operacionais", async () => {
  const client = await appFile("avancini-os-client.tsx");

  assert.match(client, /Comece por aqui se/i);
  assert.match(client, /function Capabilities[\s\S]*?useState<SolutionSlug>\("ecommerce"\)/i);
  assert.doesNotMatch(client, /\["Novos contatos", "4"\]/i);
  assert.doesNotMatch(client, /<strong>24<\/strong>/i);
  assert.doesNotMatch(client, /<strong>08<\/strong>/i);
  assert.doesNotMatch(client, /<strong>05<\/strong>/i);
});

test("o hero e o manifesto colapsam sem recorte em 390 px", async () => {
  const home = await appFile("avancini-home.css");

  assert.match(home, /@media\s*\(max-width:\s*800px\)[\s\S]*\.home-hero-layout\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/i);
  assert.match(home, /\.home-hero-copy,[\s\S]*\.home-hero-showcase\s*\{[^}]*min-width:\s*0/i);
  assert.match(home, /@media\s*\(max-width:\s*800px\)[\s\S]*\.home-hero-showcase\s*\{[^}]*min-height:\s*520px/i);
  assert.match(home, /@media\s*\(max-width:\s*800px\)[\s\S]*\.home-capabilities-layout\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/i);
  assert.doesNotMatch(home, /position:\s*sticky/i);
});

test("menu e abas devolvem foco e suportam teclado", async () => {
  const client = await appFile("avancini-os-client.tsx");

  assert.match(client, /menuTriggerRef\.current\?\.focus\(\)/);
  assert.match(client, /onKeyDown/);
  assert.match(client, /aria-controls/);
  assert.match(client, /tabIndex=\{isSelected\s*\?\s*0\s*:\s*-1\}/);
});

test("serviços têm seleção editorial e o portfólio permanece todo visível", async () => {
  const client = await appFile("avancini-os-client.tsx");

  assert.match(client, /className="home-capability-outcome"/);
  assert.match(client, /className="home-work-grid"/);
  assert.match(client, /projects\.map/);
  assert.doesNotMatch(client, /home-work-selector|project-stage/);
});

test("as páginas comerciais não usam métricas ou garantias inventadas", async () => {
  const data = await appFile("solutions-data.ts");
  const page = await appFile("solucoes/[slug]/page.tsx");
  const activeSurface = `${data}\n${page}`;

  assert.doesNotMatch(activeSurface, /120\+|R\$\s*15M|99[,.]8%|99\.9%|98\/100|\+60%|\+42%|3x|\+35%|sem alucinar|HOMOLOGADO/i);
  assert.doesNotMatch(activeSurface, /garantia de resultado|resultado garantido/i);
});
