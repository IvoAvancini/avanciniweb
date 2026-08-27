import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = {
  title: "Termos de Contratação",
  description: "Resumo transparente das modalidades de assinatura e pagamento único da Avancini Dash.",
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
      "Site Catálogo para exibir produtos ou serviços e encaminhar pedidos ou orçamentos ao WhatsApp.",
      "Loja Virtual para operações que exigem catálogo, carrinho, pagamento, entrega e gestão de pedidos.",
    ],
  },
  {
    title: "Implantação, hospedagem e suporte",
    paragraphs: [
      "Na modalidade com R$ 0 de taxa de criação, a Landing Page custa R$ 79,90 por mês e exige permanência mínima de 6 meses. Na opção sem fidelidade, a criação custa R$ 399,90 e a hospedagem com suporte custa R$ 49,90 por mês.",
      "As duas modalidades recebem o mesmo padrão de estratégia, texto, design, versão mobile e desenvolvimento. A diferença está na forma de contratação e no endereço escolhido, não na qualidade da entrega.",
      "O Site Institucional custa R$ 109,90 por mês na modalidade sem taxa de criação e contrato de 6 meses. Na opção sem fidelidade, a criação começa em R$ 599,90 e a hospedagem com suporte custa R$ 69,90 por mês.",
      "O Site Catálogo custa R$ 139,00 por mês na modalidade sem taxa de criação e contrato de 6 meses. Na opção sem fidelidade, a criação começa em R$ 790,00 e a hospedagem com suporte custa R$ 89,90 por mês.",
      "A Loja Virtual recebe proposta após a análise do catálogo, das formas de pagamento, da entrega e da rotina de pedidos.",
      "A contratação recorrente inclui hospedagem, SSL, suporte e um pequeno ajuste mensal. Novas seções, integrações, funcionalidades ou reformulações podem receber orçamento separado.",
    ],
  },
  {
    title: "Pagamento único",
    paragraphs: [
      "Landing, Site Institucional, Site Catálogo ou Loja Virtual podem ser contratados por pagamento único, com valor definido após o briefing e de acordo com o escopo aprovado.",
      "No pagamento único não existe mensalidade Avancini. Domínio e hospedagem são contratados e pagos pelo cliente, a manutenção é opcional depois da entrega e a proposta registra quais arquivos do projeto serão transferidos após a quitação.",
    ],
  },
  {
    title: "Domínio e continuidade",
    paragraphs: [
      "Na modalidade recorrente, pode ser utilizado um endereço Avancini incluso. Um domínio próprio já existente pode ser conectado sem taxa adicional, e um novo .com.br fica sujeito à análise e disponibilidade. Na modalidade de pagamento único, um domínio .com.br é incluído no projeto, também sujeito à disponibilidade; as condições de renovação são apresentadas na proposta.",
      "O cancelamento da contratação recorrente desativa hospedagem, suporte e publicação, respeitando o período mínimo quando aplicável. Conteúdos fornecidos pelo cliente e domínios registrados em seu nome continuam pertencendo a ele. Os arquivos do projeto não são transferidos em uma contratação recorrente, salvo quando uma condição diferente estiver expressamente registrada na proposta.",
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
