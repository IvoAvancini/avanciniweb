import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = {
  title: "Termos de Contratação",
  description: "Resumo transparente das modalidades recorrentes da Avancini Dash e Avancini Sync.",
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
      "Loja Virtual para operações que exigem catálogo, carrinho, pagamento, entrega e gestão de pedidos.",
    ],
  },
  {
    title: "Criação, hospedagem e suporte",
    paragraphs: [
      "A Landing Page tem taxa de criação de R$ 299,90 no mensal, R$ 149,90 no semestral e R$ 0 no anual. A assinatura custa R$ 59,90 no mensal, R$ 289,90 no semestral ou R$ 499,90 no anual.",
      "O Site Institucional tem taxa de criação a partir de R$ 399,90 no mensal, R$ 199,90 no semestral e R$ 0 no anual. A assinatura começa em R$ 79,90 no mensal, R$ 379,90 no semestral ou R$ 669,90 no anual.",
      "A Loja Virtual tem taxa de criação a partir de R$ 599,90 no mensal, R$ 299,90 no semestral e R$ 0 no anual. A assinatura começa em R$ 119,90 no mensal, R$ 579,90 no semestral ou R$ 999,90 no anual. Catálogo, pagamento, entrega e rotina de pedidos são validados antes da proposta.",
      "Os três planos recebem estratégia, texto, design, versão mobile e desenvolvimento compatíveis com o escopo contratado.",
      "A contratação recorrente inclui hospedagem, SSL, suporte e um pequeno ajuste mensal. Novas seções, integrações, funcionalidades ou reformulações podem receber orçamento separado.",
    ],
  },
  {
    title: "Avancini Sync",
    paragraphs: [
      "O Chatbot Start custa R$ 149,90 no mensal, R$ 719,90 no semestral ou R$ 1.259,90 no anual. Não há taxa de criação.",
      "O Atendente IA começa em R$ 297,90 no mensal, R$ 1.429,90 no semestral ou R$ 2.499,90 no anual. Não há taxa de criação.",
      "Custos externos de WhatsApp, APIs, inteligência artificial ou volume de uso são validados antes da contratação e cobrados separadamente quando existirem.",
    ],
  },
  {
    title: "Domínio e continuidade",
    paragraphs: [
      "Na modalidade recorrente, pode ser utilizado um endereço Avancini incluso. Um domínio próprio já existente pode ser conectado sem taxa adicional, e um novo .com.br fica sujeito à análise, disponibilidade e condições apresentadas na proposta.",
      "O cancelamento da contratação recorrente desativa hospedagem, suporte e publicação ao fim do ciclo já pago. Conteúdos fornecidos pelo cliente e domínios registrados em seu nome continuam pertencendo a ele. Os arquivos do projeto não são transferidos em uma contratação recorrente, salvo quando uma condição diferente estiver expressamente registrada na proposta.",
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
