import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = {
  title: "Termos de Contratação",
  description: "Resumo transparente das modalidades de assinatura e pagamento único da Avancini Web.",
  alternates: { canonical: "/termos" },
};

const sections = [
  {
    title: "Sobre estes termos",
    paragraphs: [
      "Este documento apresenta as condições gerais divulgadas no site. A proposta comercial e o contrato enviados antes do pagamento detalham o escopo de cada projeto e prevalecem em caso de condição específica.",
    ],
  },
  {
    title: "Serviços disponíveis",
    items: [
      "Landing de Conversão para divulgar uma oferta, campanha ou serviço específico.",
      "Site Institucional para apresentar a empresa, serviços, diferenciais e contatos.",
      "Projeto Exclusivo para necessidades, estruturas ou funcionalidades definidas em orçamento individual.",
    ],
  },
  {
    title: "Assinatura mensal",
    paragraphs: [
      "A Landing de Conversão custa R$ 97 por mês e o Site Institucional custa R$ 199,90 por mês, ambos sem entrada e com permanência mínima de 6 meses.",
      "A assinatura inclui hospedagem, suporte e um pequeno ajuste mensal. Novas seções, integrações, funcionalidades ou reformulações podem receber orçamento separado.",
    ],
  },
  {
    title: "Pagamento único",
    paragraphs: [
      "O Projeto Exclusivo é contratado por valor único definido após o briefing. O escopo aprovado, o domínio próprio e as condições de entrega são registrados na proposta.",
      "Depois da entrega, a manutenção é opcional e, quando solicitada, recebe uma condição separada.",
    ],
  },
  {
    title: "Domínio e continuidade",
    paragraphs: [
      "Na assinatura, o endereço Avancini está incluído. Um domínio que o cliente já possui pode ser conectado; o registro de um novo domínio próprio é pago à parte e permanece em nome do cliente.",
      "Após o período mínimo, o cancelamento da assinatura desativa a hospedagem e o site por assinatura. Conteúdos fornecidos pelo cliente e domínios registrados em seu nome continuam pertencendo a ele.",
    ],
  },
  {
    title: "Conteúdo, aprovação e prazo",
    paragraphs: [
      "O cliente é responsável por fornecer e aprovar textos, imagens, marcas, contatos e demais materiais que serão publicados.",
      "Os prazos disponíveis são de 7, 15 ou até 30 dias, conforme a estrutura combinada. A contagem começa após o recebimento do conteúdo necessário e a confirmação de início.",
    ],
  },
  {
    title: "Resultados e responsabilidades",
    paragraphs: [
      "O trabalho busca melhorar apresentação, clareza e caminhos de contato, mas não garante quantidade específica de vendas, contatos ou posição em mecanismos de busca, pois esses resultados também dependem da oferta, atendimento, mercado e divulgação do cliente.",
      "Materiais enviados pelo cliente devem ter autorização de uso e não podem violar direitos de terceiros ou a legislação aplicável.",
    ],
  },
  {
    title: "Dúvidas antes da contratação",
    paragraphs: [
      "Plano, domínio, conteúdo, prazo, pagamento e contrato são confirmados antes de qualquer cobrança. Você pode solicitar esclarecimentos pelo WhatsApp ou pelo e-mail ivoavancini@hotmail.com.",
    ],
  },
] as const;

export default function TermsPage() {
  return <LegalPage eyebrow="CONDIÇÕES SEM LETRA MIÚDA" title="Termos de Contratação" intro="Um resumo direto das modalidades disponíveis. A proposta e o contrato detalham o projeto escolhido antes do pagamento." sections={sections} />;
}
