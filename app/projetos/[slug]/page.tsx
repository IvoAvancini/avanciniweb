import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AvanciniMark } from "../../avancini-mark";
import { DirectionIcon } from "../../direction-icon";
import { projectBySlug, projects } from "../../project-data";
import { ProjectPageMotion } from "./project-page-client";
import "./project-page.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.filter((project) => project.href.startsWith("/projetos/")).map((project) => ({ slug: project.href.replace("/projetos/", "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug[slug];
  return project ? { title: project.name, description: project.headline } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug[slug];
  if (!project) notFound();
  const whatsapp = `https://wa.me/5573981019782?text=${encodeURIComponent(`Olá, vi o projeto ${project.name} e quero conversar sobre algo para minha empresa`)}`;

  return (
    <main className={`project-page project-${project.tone}`}>
      <ProjectPageMotion />
      <header className="project-nav"><Link href="/" aria-label="Voltar para a Avancini OS"><AvanciniMark variant="os" className="project-mark" /><span>AVANCINI <b>OS</b></span></Link><span>{project.number} / {project.segment}</span><Link href="/#projetos">Todos os trabalhos <DirectionIcon /></Link></header>
      <section className="project-hero"><div className="project-hero-copy"><span>{project.category}</span><h1>{project.name}</h1><p>{project.headline}</p></div><div className="project-hero-image"><Image src={project.image} alt={`Prévia da experiência ${project.name}`} fill priority sizes="100vw" /></div></section>
      <section className="project-story"><span>Um recorte da direção</span><div><small>Ponto de partida</small><h2>{project.problem}</h2></div><div><small>Resposta</small><p>{project.direction}</p></div><div><small>Valor</small><p>{project.value}</p></div></section>
      <section className="project-principles" aria-label="Decisões do conceito">
        <header><span>O que sustenta a experiência</span><h2>Forma, conteúdo e ação seguem a mesma direção</h2></header>
        <ol>{project.scope.map((item, index) => <li key={item}><small>0{index + 1}</small><strong>{item}</strong><p>{index === 0 ? "Define a primeira impressão e torna a proposta fácil de reconhecer" : index === 1 ? "Organiza a leitura para o visitante avançar sem se perder" : "Transforma interesse em um próximo passo claro para o negócio"}</p></li>)}</ol>
      </section>
      <section className="project-scope"><span>Frentes conectadas</span><div>{project.scope.map((item, index) => <strong key={item}><small>0{index + 1}</small>{item}</strong>)}</div></section>
      <section className="project-cta"><span>Seu negócio não precisa parecer com este</span><h2>Precisa ter uma direção tão própria quanto</h2><a href={whatsapp} target="_blank" rel="noreferrer">Conversar sobre um projeto <DirectionIcon /></a></section>
    </main>
  );
}
