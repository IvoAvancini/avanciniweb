import { Neighborhood } from "../types";

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: "neighborhood-jardins",
    slug: "jardins",
    name: "Jardins",
    city: "São Paulo",
    state: "SP",
    headline: "O epicentro da sofisticação urbana, alta gastronomia e ruas arborizadas.",
    description:
      "Formado pelos bairros Jardim América, Jardim Europa, Jardim Paulista e Cerqueira César, os Jardins reúnem a mais refinada oferta gastronômica da América Latina, galerias de arte, boutiques de renome e residências assinadas pelos maiores arquitetos do país.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    averagePricePerM2: 24800,
    characteristics: [
      "Ruas planas e arborizadas",
      "Alta gastronomia internacional",
      "Proximidade à Avenida Paulista",
      "Segurança patrimonial de excelência",
    ],
    lifestyleHighlights: [
      "Caminhar pela Rua Oscar Freire",
      "Jantar nos premiados D.O.M., Fasano e Maní",
      "Visitas ao MIS e MuBE",
    ],
    pointsOfInterest: [
      {
        category: "Gastronomia",
        items: ["Restaurante Fasano", "Maní", "Chez Oscar", "Bacio di Latte", "D.O.M."],
      },
      {
        category: "Cultura & Lazer",
        items: ["MIS (Museu da Imagem e do Som)", "MuBE", "Clube Paulistano", "Parque Trianon"],
      },
      {
        category: "Educação & Saúde",
        items: ["Colégio Dante Alighieri", "Hospital Sírio-Libanês", "Hospital 9 de Julho"],
      },
    ],
    totalProperties: 12,
  },
  {
    id: "neighborhood-itaim-bibi",
    slug: "itaim-bibi",
    name: "Itaim Bibi",
    city: "São Paulo",
    state: "SP",
    headline: "O polo financeiro e corporativo que nunca dorme, com vida noturna vibrante.",
    description:
      "Vibrante, cosmopolita e dinâmico. O Itaim Bibi combina sedes de grandes empresas globais com uma vida gastronômica pulsante, edifícios residenciais de última geração e fácil acesso ao Parque do Povo e à Faria Lima.",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
    averagePricePerM2: 26500,
    characteristics: [
      "Hub financeiro da Faria Lima",
      "Edifícios contemporâneos de alto padrão",
      "Parque do Povo a poucos passos",
      "Infraestrutura de serviços completa 24h",
    ],
    lifestyleHighlights: [
      "Corrida matinal no Parque do Povo",
      "Almoço executivo na Faria Lima",
      "Drinks nos rooftops mais concorridos da capital",
    ],
    pointsOfInterest: [
      {
        category: "Gastronomia",
        items: ["Nino Cucina", "Modern Mamma Osteria", "Kinoshita", "Eataly Brasil", "Due Cuochi"],
      },
      {
        category: "Lazer & Parques",
        items: ["Parque do Povo", "Shopping JK Iguatemi", "Shopping Iguatemi"],
      },
      {
        category: "Saúde & Conveniência",
        items: ["Hospital São Luiz Itaim", "Vila Nova Star", "Bio Ritmo Flagship"],
      },
    ],
    totalProperties: 9,
  },
  {
    id: "neighborhood-moema",
    slug: "moema",
    name: "Moema",
    city: "São Paulo",
    state: "SP",
    headline: "Qualidade de vida sem igual, vizinha ao Parque Ibirapuera e com ruas planas.",
    description:
      "Dividida entre Moema Pássaros e Moema Índios, a região é famosa pela tranquilidade, qualidade do ar e proximidade ao Parque Ibirapuera. Um dos bairros com maior Índice de Desenvolvimento Humano de São Paulo.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    averagePricePerM2: 21200,
    characteristics: [
      "Acesso a pé ao Parque Ibirapuera",
      "Comércio de rua charmoso e completo",
      "Estações de metrô Moema e Eucaliptos",
      "Excelente para famílias e pets",
    ],
    lifestyleHighlights: [
      "Passeio de bicicleta no Ibirapuera aos finais de semana",
      "Cafés artesanais e padarias gourmet nas esquinas",
      "Ruas tranquilas para caminhadas noturnas",
    ],
    pointsOfInterest: [
      {
        category: "Parques & Lazer",
        items: ["Parque Ibirapuera", "Parque das Bicicletas", "Shopping Ibirapuera"],
      },
      {
        category: "Gastronomia",
        items: ["Le Jazz Brasserie", "Fogo de Chão Moema", "La Guapa", "Chicohamburger"],
      },
      {
        category: "Educação & Saúde",
        items: ["Escola Móbile", "Colégio Vértice", "Hospital Alvorada"],
      },
    ],
    totalProperties: 8,
  },
  {
    id: "neighborhood-vila-nova-conceicao",
    slug: "vila-nova-conceicao",
    name: "Vila Nova Conceição",
    city: "São Paulo",
    state: "SP",
    headline: "O metro quadrado mais valorizado da cidade, emoldurado pelo verde do Ibirapuera.",
    description:
      "Exclusividade absoluta. A Vila Nova Conceição é o refúgio das famílias mais tradicionais e dos empreendimentos residenciais mais cobiçados do país, com praças impecavelmente preservadas como a Praça Pereira Coutinho.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    averagePricePerM2: 32000,
    characteristics: [
      "Praça Pereira Coutinho como ponto central",
      "Segurança privada de alto nível",
      "Edifícios neoclássicos e contemporâneos de altíssimo padrão",
      "Portão 7 do Parque Ibirapuera a minutos",
    ],
    lifestyleHighlights: [
      "Café da manhã ao redor da Praça Pereira Coutinho",
      "Passeios diários no Ibirapuera",
      "Privacidade e atmosfera de vila nobre",
    ],
    pointsOfInterest: [
      {
        category: "Parques & Praças",
        items: ["Praça Pereira Coutinho", "Parque Ibirapuera (Portão 7)", "Praça Cidade de Milão"],
      },
      {
        category: "Gastronomia",
        items: ["Clos de Tapas", "Attimo Per Mangiare", "Ruella Bistrô", "Josephine"],
      },
      {
        category: "Saúde & Serviços",
        items: ["Hospital Vila Nova Star", "Clínica Einstein Ibirapuera", "Les Cinq Gym"],
      },
    ],
    totalProperties: 7,
  },
  {
    id: "neighborhood-pinheiros",
    slug: "pinheiros",
    name: "Pinheiros",
    city: "São Paulo",
    state: "SP",
    headline: "Cultura, design independente, atmosfera cosmopolita e mobilidade exemplar.",
    description:
      "O bairro mais criativo e efervescente de São Paulo. Pinheiros une galerias de arte, cafés conceituais, feiras gastronômicas e uma das redes de transporte e ciclovias mais conectadas da cidade.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    averagePricePerM2: 19800,
    characteristics: [
      "Praça Benedito Calixto e feira de antiguidades",
      "Polo gastronômico das ruas dos Pinheiros e Fradique Coutinho",
      "Fácil acesso à Marginal Pinheiros e metrôs",
      "Arquitetura autoral e novos lançamentos modernos",
    ],
    lifestyleHighlights: [
      "Sábado de garimpo na Praça Benedito Calixto",
      "Tour gastronômico na Rua dos Pinheiros",
      "Exposições no Instituto Tomie Ohtake",
    ],
    pointsOfInterest: [
      {
        category: "Cultura & Gastronomia",
        items: ["Instituto Tomie Ohtake", "Praça Benedito Calixto", "Arturito", "Bráz Elettrica", "Futuro Refeitório"],
      },
      {
        category: "Lazer & Esporte",
        items: ["Clube Hebraica", "Esporte Clube Pinheiros", "Ciclovia Rio Pinheiros"],
      },
      {
        category: "Educação & Saúde",
        items: ["Colégio Stella Maris", "Hospital das Clínicas (FMUSP)"],
      },
    ],
    totalProperties: 8,
  },
  {
    id: "neighborhood-perdizes",
    slug: "perdizes",
    name: "Perdizes",
    city: "São Paulo",
    state: "SP",
    headline: "Tradição universitária, relevo charmoso, teatros e parques no coração da Zona Oeste.",
    description:
      "Conhecido pelas ladeiras charmosas e pela atmosfera acolhedora, Perdizes é lar da PUC-SP, do Parque da Água Branca e do Teatro TUCA. Um bairro clássico que une vida cultural rica e infraestrutura consolidada.",
    image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80",
    averagePricePerM2: 17500,
    characteristics: [
      "Parque da Água Branca com feira orgânica",
      "Hub universitário e cultural",
      "Allianz Parque e Bourbon Shopping",
      "Edifícios espaçosos com plantas generosas",
    ],
    lifestyleHighlights: [
      "Feira do produtor orgânico no Parque da Água Branca",
      "Espetáculos no Teatro TUCA",
      "Passeios a pé por ruas tranquilas e arborizadas",
    ],
    pointsOfInterest: [
      {
        category: "Lazer & Cultura",
        items: ["Parque da Água Branca", "Teatro TUCA", "Bourbon Shopping & Teatro Bradesco", "Allianz Parque"],
      },
      {
        category: "Gastronomia",
        items: ["Bráz Pizzaria Perdizes", "Padaria La Plaza", "Casa Garcia"],
      },
      {
        category: "Educação & Saúde",
        items: ["PUC-SP", "Colégio Santa Marcelina", "Hospital São Camilo"],
      },
    ],
    totalProperties: 6,
  },
];
