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
    title: "Criação, hospedagem e suporte (Avancini Dash)",
    paragraphs: [
      "Os projetos (Landing Pages de Alta Conversão, Sites Institucionais e Lojas Virtuais) possuem investimento, cronograma e condições definidos em proposta comercial personalizada, de acordo com o escopo e complexidade de cada cliente.",
      "Os projetos recebem estratégia, texto persuasivo, design autoral, versão responsiva para celular e desenvolvimento de alta performance compatíveis com o escopo contratado.",
      "A contratação contínua inclui hospedagem ultrarrápida, SSL blindado, suporte e manutenção preventiva. Novas páginas, integrações personalizadas ou reformulações estruturais podem receber orçamento sob medida.",
    ],
  },
  {
    title: "Implantação e Operação (Avancini Sync)",
    paragraphs: [
      "A implantação do Atendente de IA (Operação Essencial ou Scale Pro) é calibrada sob medida para a rotina da empresa, com valores e condições estipulados na proposta comercial após diagnóstico técnico do fluxo de atendimento.",
      "A operação inclui calibração das regras da empresa, conexão com WhatsApp e integração com Google Agenda, além de suporte contínuo para atualizações.",
      "Custos de infraestrutura de conectividade ou APIs externas, quando necessários para volumes de tráfego específicos ou integrações complexas de CRM, são detalhados com total transparência na proposta técnica.",
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
