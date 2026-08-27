# Walkthrough — E-commerce Front-End Premium: VÉRTICE

O e-commerce completo de moda esportiva, streetwear e lifestyle **VÉRTICE** foi desenvolvido do zero, atendendo rigorosamente a todos os 50 requisitos de UX, UI, design editorial, performance e arquitetura modular.

---

## 1. Identidade & Design Editorial
- **Logotipo Textual**: `VÉRTICE` em tipografia clean e monumental.
- **Paleta de Cores Sofisticada**: Titanium Black (`#070709`), Off-White (`#f8fafc`), Cinza Grafite (`#27272a`), com acentos luminosos carmim (`#ff2444`) para badges de desconto e ciano (`#22d3ee`) para rastreamento.
- **Hierarquia & Espaçamento**: Grid editorial amplo, tipografia de alto contraste e microinterações táteis e suaves.

---

## 2. Estrutura de Páginas & Funcionalidades

### 1. Header & Mega Menu
- **Announcement Bar**: Rotação dinâmica de mensagens (*"FRETE GRÁTIS EM PEDIDOS ACIMA DE R$ 399"*).
- **Sticky Shrink Header**: Transição de altura suave ao rolar a página.
- **Mega Menu Editorial**: Organização por departamentos (Masculino, Feminino), esportes (Corrida, Treino, Streetwear) e coleções (Performance, Essentials) com banner visual integrado.
- **Busca em Tempo Real (Overlay)**: Busca instantânea com sugestões de termos em alta e navegação direta.

### 2. Home Cinematográfica
- **Hero**: Tipografia de impacto (*"VÁ ALÉM DO ÓBVIO."*), descrição e CTAs para coleções.
- **Explore seu Movimento**: Grid com cards de categorias e zoom ao hover.
- **Mais Desejados & Lançamentos**: Vitrine de produtos com troca de imagem no hover e botão **⚡ COMPRA RÁPIDA**.
- **Storytelling Técnico**: Seção detalhando a placa de fibra de carbono *V-Plate 3K*, amortecimento *V-Pulse* e tecido *AeroKnit*.

### 3. Catálogo & Listagem de Produtos (`/produtos`)
- **Filtros Avançados**: Categoria, Gênero, Esporte, Tamanho (PP a GG, 38 a 44), Coleção e Faixa de Preço.
- **Chips de Filtros Ativos**: Remoção individual e botão *"Limpar Todos"*.
- **Ordenação**: Relevância, Mais Vendidos, Lançamentos, Menor/Maior Preço e Melhor Avaliação.

### 4. Página de Produto (PDP)
- **Galeria 60%**: Zoom tátil, miniaturas e visualização imersiva.
- **Informações 40%**: Seletor de cores, seletor de tamanhos com feedback de estoque, **Modal de Guia de Medidas** com tabela oficial para calçados e vestuário.
- **Preço com Pix 5% OFF** e parcelamento em até 10x.
- **Sticky Add-to-Cart Bar**: Barra fixa inferior ao rolar além da dobra principal.

### 5. Quick Shop Drawer
- Drawer lateral no desktop e bottom sheet no mobile para seleção rápida de cor/tamanho e adição instantânea à sacola.

### 6. Sacola & Carrinho (`/carrinho`)
- **Barra de Frete Grátis**: Cálculo automático do valor restante até atingir R$ 399.
- **Cupons de Desconto**: Validação de cupons (`VERTICE10`, `PRIMEIRACOMPRA`, `VIP20`).
- **Simulador de Frete**: Cálculo de prazo e modalidade expressa por CEP.

### 7. Checkout Transacional em 4 Etapas (`/checkout`)
- **Etapa 1**: Identificação (Nome, CPF, E-mail, Celular).
- **Etapa 2**: Endereço de entrega completo.
- **Etapa 3**: Pagamento (Pix com desconto, Cartão de Crédito, Boleto).
- **Etapa 4**: Confirmação e geração do pedido com código de rastreio (`BR...VT`).

### 8. Favoritos, Conta & Login
- **Favoritos**: Lista de desejos com persistência local e mover para a sacola.
- **Conta**: Painel com histórico de pedidos reais (`#VTC-10293` Em Transporte, `#VTC-10188` Entregue), rastreamento e endereços.
- **Login / Cadastro**: Formulário minimalista com alternância fluida.

---

## 3. Catálogo de 42 Produtos Mockados
- Cobrindo **Calçados & Running, Tech Fleece, Corta-Vento DWR, Camisetas de Compressão, Calças Cargo & Jogger, Shorts 2 em 1, Mochilas Táticas Cordura 1000D e Linha Jovem**.

---

## 4. Verificação de Qualidade
- **Build**: 100% aprovado via Vite/Vinext sem erros.
- **Testes Automatizados**: 7/7 suítes aprovadas com sucesso.
- **Sincronização**: Espelhado em `03-AvanciniOS`.
- **Rota do E-commerce**: `/vertice` e integrado ao showcase de moda da matriz.
