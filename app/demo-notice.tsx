import Link from "next/link";

export function DemoNotice() {
  return (
    <aside className="avancini-demo-notice" aria-label="Contexto desta experiência">
      <span>Experiência autoral</span>
      <Link href="/#projetos">Avancini OS</Link>
    </aside>
  );
}
