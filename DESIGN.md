# Olivo — sistema visual atual

## Autoridade e limites

Preservar Cinema na Lapa e as cinco pranchas de `Olivo_Cinema_na_Lapa/`. As decisões posteriores do usuário prevalecem: banners desktop e mobile fornecidos, largura total, letreiros de HTML, papel levemente amarelado, fotos nítidas nos cards e artes decorativas com colagem vintage. As molduras de apresentação dos mockups não fazem parte da interface.

## Identidade

Oliva, vinho, âmbar, carvão e papel creme. Bodoni Moda em títulos editoriais, Great Vibes na marca, Barlow Condensed em ações/metadados e Inter em texto e formulário. Famílias locais; títulos e botões não são rasterizados. Preload de Bodoni itálica e Great Vibes, usados no primeiro viewport.

## Tokens e superfícies

`tokens.css` é a fonte de verdade das cores e materiais reutilizados. `style.css` contém layout, componentes, estados e breakpoints.

| Papel | Tokens |
|---|---|
| Papel dos cards | `--card-paper`, `--texture-paper` |
| Papel dos ingressos | `--program-paper` |
| Botão sobre papel | `--paper-action`; hover/seleção `--paper-action-active` |
| Texto claro/escuro | `--text-on-dark`, `--text-on-paper` |
| Texto de apoio | `--text-muted-dark`, `--text-muted-paper` |
| Superfície escura | `--surface-base`, `--surface-recessed`, `--surface-deep`, `--surface-content` |
| História sobre foto | `--surface-about` |
| Bordas e foco | `--border-paper`, `--border-paper-strong`, `--border-dark`, `--focus-color` |
| Leitura e interação | `--type-body`, `--type-control`, `--control-height` |

Botões sobre papel são apenas levemente mais escuros que o card. A chamada “Ver programação” usa esse mesmo papel, com tipografia maior, borda vinho e seta, abaixo do título da faixa no desktop e em largura total após os destaques no celular. Sinais de estado não dependem só de cor: foco, contorno e `aria-pressed` acompanham a interação. Valores locais de luz, sombra e impressão não são uma paleta alternativa de UI.

## Layout e leitura

- Todas as páginas ocupam a largura da janela. Não há limite de 1120 px nem margem externa de moldura.
- A home conserva retrato e marca no desktop e o cenário vertical fornecido no mobile. No celular, título, faixa, legenda e ação têm fluxo vertical; o banner tem no mínimo uma tela e pode crescer com o conteúdo. O desktop preserva sua composição editorial.
- As páginas internas mobile posicionam os títulos na área livre do céu. Seu contêiner cresce quando o texto aumenta. A programação usa título de largura total e ingresso em linha separada junto ao subtítulo no celular; descrição e ação vêm depois. O texto do destaque usa papel claro diretamente sobre a fotografia, sem painel, contorno ou sombra; no desktop, ocupa a região escura à direita do rosto.
- A seção de coquetéis usa uma arte contínua em toda a largura no desktop: taça, balcão e papel oliva sob o texto e os cards. O carrossel é manual; fotos e texto continuam separados. A área de texto do card cresce e a foto utiliza o espaço restante.
- A faixa da home reúne três eventos e a chamada explícita à programação. Em larguras intermediárias ela distribui título, eventos e ação em linhas próprias; no celular os eventos ficam empilhados.
- Descrições, labels e metadados funcionais usam pelo menos 14 px; texto corrido mobile e campos usam 16 px quando aplicável. Colunas e cartões acomodam o texto sem esconder o final.
- Breakpoint principal de 700 px. Tablet e desktop intermediário têm regras adicionais em 950/1100 px. Texto ampliado é verificado por renderização, não só por `scrollWidth`.

## Navegação e estados

A home conduz aos autorais e ao cardápio, aos eventos completos e à galeria. A chamada final da galeria conduz ao cardápio; o rodapé destaca contato.

O cardápio usa filtros de categoria, sem busca. Em Todos todas as categorias ficam abertas e não podem ser recolhidas; selecionar uma categoria permite o acordeão. Resultados e seleções são anunciados com estados acessíveis.

Menu mobile com `aria-expanded`, links acessíveis, Escape e retorno de foco. Alvos principais de pelo menos 44 px; ações e campos com altura de referência de 48 px. Cabeçalho e rodapé respeitam áreas seguras. A navegação se posiciona abaixo do cabeçalho mesmo quando o texto aumenta.

Os detalhes do cardápio e fotos ampliadas usam `dialog` nativo, fechamento por Escape e retorno de foco. Na home, clicar no drink em destaque abre seus detalhes; clicar em um dos cards laterais o traz à frente. Os três cards visíveis são acessíveis por teclado. As chamadas explícitas continuam levando ao cardápio. Setas e swipe horizontal também alternam os seis cards; o gesto vertical rola a página. Não há autoplay. Movimento reduzido preserva os estados sem animação.

## Contato

O formulário prepara somente um rascunho. Não envia mensagens nem confirma reservas. Nome, telefone e e-mail são obrigatórios. Uma data de visita exige horário e quantidade; erros identificam os campos com `aria-invalid` e `aria-describedby` e focam o primeiro campo pendente. Corrigir o valor limpa seu estado de erro. A prévia é invalidada por novas edições.

WhatsApp abre a escolha de destinatário; o lembrete de calendário não representa reserva confirmada. Textos e valores demonstrativos seguem identificados no produto.

## Assets e publicação

Banners ativos: `hero-home-desktop-supplied` e `hero-home-mobile-supplied`. Artes decorativas: `lapa-vintage-decor`, `bossa-vintage-decor`, `cinema-vintage-decor` e `cocktails-continuous-vintage`. Originais e prompts ficam em `assets/source/` e no manifesto, inclusive versões anteriores para proveniência.

O build publica apenas imagens referenciadas pelo HTML e as doze fotos de 1440 px necessárias aos diálogos. A importação ampla de todo o diretório de fotos foi removida. Não apagar originais para reduzir o pacote publicado.

## Validação

`npm run build` gera as páginas e o pacote Vite. `npm test` utiliza `../scripts/olivo-site-test.mjs` da infraestrutura compartilhada, com Node e Chrome/CDP, sem Playwright. Testa produção em várias larguras, texto a 200%, filtros, links, teclado, retorno de foco, erros do formulário e toque sintetizado. Artefatos em `../artifacts/olivo-production-tests/`.

Conferência visual compartilhada: `../scripts/olivo-all-banner-review.mjs`, `olivo-mobile-review.mjs` e `olivo-technical-audit.mjs`. Preservar as referências originais e registrar diferenças intencionais; nenhuma captura vira mockup aprovado automaticamente. Testes em Chromium não substituem Safari, leitor de tela e dispositivos físicos.
