import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

const VALID_SLUGS = [
  'tape-car',
  'solaris-energia',
  'cora-imoveis',
  'vertice-store',
  'janildo-araujo',
  'clinica-san-diego',
  'bianca-vieira'
];

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export default async function DashProjetoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) {
    notFound();
  }

  const filePath = path.join(process.cwd(), 'public', 'dash-projetos', `${slug}.html`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const html = fs.readFileSync(filePath, 'utf8');

  // Extract body content or serve as dangerouslySetInnerHTML
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  const headMatches = [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*>/g)].map(m => m[0]).join('\n');
  const innerHtml = bodyMatch ? bodyMatch[1] : html;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headMatches }} />
      <div dangerouslySetInnerHTML={{ __html: innerHtml }} />
    </>
  );
}
