import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Saiba como a Avancini Web trata informações de contato e dados de navegação.",
  alternates: { canonical: "/privacidade" },
};

const sections = [
  {
    title: "Quem trata as informações",
    paragraphs: [
      "A Avancini Web, uma solução da Avancini OS, é responsável pelas decisões relacionadas às informações recebidas por seus canais de atendimento.",
      "Dúvidas e solicitações podem ser enviadas para ivoavancini@hotmail.com ou pelo WhatsApp informado no site.",
    ],
  },
  {
    title: "Quais informações podem ser recebidas",
    items: [
      "Informações que você envia voluntariamente pelo WhatsApp, telefone ou e-mail, como nome, empresa, segmento, objetivo e necessidade do projeto.",
      "Dados técnicos essenciais para o funcionamento, segurança e entrega da página.",
      "Dados agregados de acesso, somente quando uma ferramenta de medição estiver legitimamente habilitada.",
    ],
  },
  {
    title: "Como essas informações são utilizadas",
    items: [
      "Responder dúvidas e preparar recomendações, briefing e proposta comercial.",
      "Executar procedimentos solicitados antes da contratação e prestar os serviços contratados.",
      "Manter suporte, segurança, registros administrativos e cumprimento de obrigações aplicáveis.",
      "Melhorar a clareza, o desempenho e a experiência do site.",
    ],
  },
  {
    title: "Formulários e WhatsApp",
    paragraphs: [
      "Os formulários atuais organizam a mensagem e abrem o WhatsApp. As respostas não são gravadas em um banco de dados próprio do site antes do envio.",
      "Ao continuar no WhatsApp, o tratamento também passa a observar as políticas e condições da plataforma utilizada pelo visitante.",
    ],
  },
  {
    title: "Cookies e medição",
    paragraphs: [
      "O site pode utilizar recursos técnicos estritamente necessários. Ferramentas publicitárias da Meta e do Google permanecem desativadas enquanto não houver configuração e mecanismo apropriado de preferência.",
      "Se ferramentas não essenciais forem ativadas futuramente, esta política e os controles de consentimento serão atualizados antes da coleta.",
    ],
  },
  {
    title: "Compartilhamento e conservação",
    paragraphs: [
      "As informações podem transitar por prestadores necessários à hospedagem, comunicação e execução do serviço, sempre de acordo com a finalidade informada.",
      "Os registros são mantidos apenas pelo período necessário ao atendimento, à relação contratual e às obrigações legais ou ao exercício regular de direitos.",
    ],
  },
  {
    title: "Seus direitos",
    paragraphs: [
      "Você pode solicitar confirmação de tratamento, acesso, correção, informação sobre compartilhamento e, quando aplicável, eliminação, oposição ou revogação do consentimento.",
      "A solicitação será analisada e respondida pelos canais indicados nesta política, observadas as hipóteses legais de conservação.",
    ],
  },
] as const;

export default function PrivacyPage() {
  return <LegalPage eyebrow="PRIVACIDADE & TRANSPARÊNCIA" title="Política de Privacidade" intro="Informação clara sobre o que acontece quando você visita o site ou conversa com a Avancini Web." sections={sections} />;
}
