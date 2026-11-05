# Autoridade visual

Reprodução da referência `mockup bar .png`, sem propor nova direção.

Esta base permanece a identidade Cinema na Lapa. A expansão usa as cinco composições em `Olivo_Cinema_na_Lapa/` e a redução de escala da home autorizada pelo usuário. As proporções abaixo registram a referência original; o contrato responsivo em Layout descreve a entrega atual.

Desktop: hero cinematográfico (proporção 795:470), seção oliva de coquetéis (795:295), faixa de programação em papel creme (795:135), história com fotografia da Lapa (795:166).

Mobile: hero compacto com retrato, marca no cabeçalho, título à esquerda e legenda à direita; cards horizontais; programação em três ingressos empilhados; seção sobre com título à esquerda. Manter informação legível ao adaptar a escala da referência.

Paleta: creme #efddba, vinho #701f14, laranja #c35c1d, oliva #3d3d24, carvão #161510. Display serif condensado de alto contraste, marca caligráfica, interface Inter. Texturas fotográficas e de papel extraídas da referência. Botões com contorno de ingresso, títulos recortados, cartões de drinks sobrepostos.

## Layout

O conjunto mantém a colagem de cinema, com retrato, Arcos da Lapa, faixas de papel e conteúdo em oliva. A largura de todas as páginas é limitada a 1120 px, centralizada; acima de 1160 px há margem externa de 20 px. A home usa hero de 55,36% da largura do contêiner, com mínimo de 440 px e máximo de 620 px no desktop. Até 700 px, ocupa a largura da tela, com hero de 520 px; até 360 px, 490 px. O retrato permanece à esquerda, e título, legenda e ação conservam espaços próprios.

As páginas internas compartilham fotografia de abertura, cabeçalho e marca; seus títulos caligráficos e controles são específicos de cada composição. O cardápio apresenta seis autorais em três colunas no desktop, categorias em papel e busca. Entre 701 e 950 px, o título dos autorais fica acima da grade, sem sobrepor as fotos. Até 700 px, os autorais viram uma lista com miniaturas e as categorias usam acordeões.

A programação usa destaque, ingresso com data, filtros e agenda. No celular, os destaques e linhas da agenda refluem e a faixa de datas rola horizontalmente dentro da própria região. A galeria combina uma foto principal com texto em papel e uma grade assimétrica; no celular a grade tem duas colunas. O contato usa três colunas no desktop, formulário e canais no tablet, e uma coluna até 700 px. Localização e FAQ seguem o mesmo refluxo. Até 360 px há ajustes adicionais de tipografia, miniaturas e canais.

## Components

**Tipografia.** Bodoni Moda dá aos títulos o contraste de cartaz, Great Vibes escreve a marca e títulos internos, Barlow Condensed identifica ingressos, datas e ações, e Inter sustenta a leitura e os campos. As quatro famílias são locais. Não incorporar títulos aos bitmaps: a fotografia deve permitir texto HTML legível.

**Ingressos e cartões.** Ações mantêm contorno fino e pontilhado interno, rótulos em caixa alta e foco visível. Cartões de drinks combinam fotografia nítida e papel creme; a home preserva a sobreposição de três cartões visíveis e oferece seis opções, sem rotação automática. Botões, setas de teclado e gesto horizontal controlam a sequência; o gesto vertical continua a rolar a página. Detalhes e fotos ampliadas usam diálogo com fechamento por Escape e retorno de foco.

**Filtros e estados.** Filtros distinguem seleção por preenchimento e forma, além de `aria-pressed`. Cardápio e agenda apresentam estado vazio e ação de restaurar resultados. A galeria filtra fotos por categoria. A navegação destaca a página atual; até 700 px abre por botão de menu.

**Formulário.** Campos em papel, borda terrosa e foco âmbar mantêm a linguagem da referência. No celular os campos têm texto de 16 px. A confirmação visual apresenta a mensagem preparada e ações explícitas de copiar, abrir WhatsApp e salvar lembrete quando houver visita futura. O texto explica que a reserva depende de confirmação.

**Fotografia e movimento.** Fotografias geradas por IA preservam luz âmbar, sombras oliva/vinho e detalhes claros; os recortes responsivos mantêm copo, rosto e arcos reconhecíveis. Papel e oliva continuam como texturas discretas. Transições de estados duram cerca de 0,2 s; a pilha de drinks usa 0,45 s. Movimento reduzido remove transições e rolagem suave.

## Do's and Don'ts

- **Do** preservar a identidade e as composições fornecidas ao adicionar telas, usando os contratos responsivos acima.
- **Do** manter título e foto separados entre 701 e 950 px no cardápio, inclusive na transição de 700 para 701 px.
- **Do** escolher imagens responsivas pela dimensão real da fonte, sem ampliar arquivos pequenos; manter a origem e o prompt rastreáveis.
- **Don't** incorporar molduras de celular ou textos de apresentação das pranchas à página.
- **Don't** apresentar imagens geradas, agenda, preços ou canais ilustrativos como registros comerciais confirmados.
