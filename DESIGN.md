# Autoridade visual

Reprodução da referência `mockup bar .png`, sem propor nova direção.

Esta base permanece a identidade Cinema na Lapa. A expansão usa as cinco composições em `Olivo_Cinema_na_Lapa/` e a redução de escala da home autorizada pelo usuário. As proporções abaixo registram a referência original; o contrato responsivo em Layout descreve a entrega atual.

Desktop: hero cinematográfico (proporção 795:470), seção oliva de coquetéis (795:295), faixa de programação em papel creme (795:135), história com fotografia da Lapa (795:166).

Mobile: hero compacto com retrato, marca no cabeçalho, título à esquerda e legenda à direita; cards horizontais; programação em três ingressos empilhados; seção sobre com título à esquerda. Manter informação legível ao adaptar a escala da referência.

Paleta: creme #efddba, vinho #701f14, laranja #c35c1d, oliva #3d3d24, carvão #161510. Display serif condensado de alto contraste, marca caligráfica, interface Inter. Texturas fotográficas e de papel extraídas da referência. Botões com contorno de ingresso, títulos recortados, cartões de drinks sobrepostos.

## Layout

O conjunto mantém a colagem de cinema, com retrato, Arcos da Lapa, faixas de papel e conteúdo em oliva. Todas as páginas ocupam a largura da janela, sem moldura externa. A home ocupa a primeira tela com `100svh` (fallback `100vh`); no celular, tem altura mínima de 540 px para preservar a leitura em janelas baixas. O título, a legenda e a ação têm espaços próprios; na horizontal entre 701 e 950 px a marca central sai para acomodar o cartaz e a chamada.

Até 700 px, controles têm pelo menos 44 px de altura; ações principais e campos do formulário têm 48 px. Textos de cards usam 14 px, textos corridos e campos usam 16 px. A busca não dispara zoom automático por fonte pequena no iOS. O carrossel usa uma área de 390 px de altura para acomodar descrições reais, com swipe horizontal e rolagem vertical preservada. A seção sobre reflui título, texto e ação; os cards de programação crescem com o conteúdo, e o ingresso do banner reserva largura própria. A agenda coloca horário e consulta abaixo do título. O formulário, os canais de contato e as orientações de transporte usam uma coluna. A navegação móvel tem altura limitada à janela e rolagem interna; Escape fecha o menu e devolve o foco ao botão. Cabeçalho e rodapé respeitam as áreas seguras do dispositivo.

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

## Fluxo comercial

A chamada da home aponta para a seção de autorais imediatamente após o banner. Os cards dos autorais são links para o cardápio completo, no desktop e no celular; os controles e gestos continuam alternando o carrossel. No celular também há chamada explícita ao cardápio abaixo do carrossel. Os destaques da home levam à programação completa. A seção final apresenta a galeria, cuja chamada final leva ao cardápio. O rodapé destaca contato com preenchimento de papel. As cenas da galeria têm moldura e legenda em papel amarelado, com ações num tom ligeiramente mais escuro; o cartaz Coquetéis em cena aparece apenas no desktop.

## Banner mobile da home

Até 700 px a home usa uma fotografia vertical própria: coquetéis em primeiro plano, Arcos da Lapa e cinema ao fundo, com espaço escuro para o cartaz HTML. Origem: assets/source/hero-home-mobile-v1.png; prompt integral no arquivo adjacente .prompt.txt e no manifesto. Gerada com image_gen como imagem conceitual. Variantes WebP de 640 e 900 px, sem ampliação. O desktop e as páginas internas preservam os banners existentes.

## Banners vintage da home

A home usa duas artes próprias: hero-home-desktop-vintage e hero-home-mobile-vintage. Ambas foram geradas com image_gen a partir da direção de impressão do mockup 01: retícula offset, fibras de papel envelhecido, tintas em oliva, vinho e ocre e recortes de cartazes. Drinks, Arcos da Lapa e cinema são os temas. Os fundos não contêm títulos rasterizados; a tipografia e as ações continuam em HTML. Origens, dimensões, prompts completos e variantes sem ampliação estão no manifesto e em assets/source/. As páginas internas mantêm suas imagens anteriores.

## Correção do conceito desktop e drink dourado

O banner desktop da home usa hero-home-desktop-vintage-portrait, preservando a mulher, seu rosto, posição e os Arcos da Lapa do conceito original. Acabamento com recortes, papel envelhecido e impressão vintage. A coluna decorativa da seção de coquetéis usa bossa-collage, gerada a partir da foto fornecida pelo usuário, com taça dourada, película, papel rasgado e foto da Lapa. O banner mobile e as fotografias dos cards do cardápio/galeria permanecem como estavam. Fontes e prompts completos estão em assets/source/ e no manifesto.

## Banner desktop aproximado à referência

A arte desktop ativa é hero-home-desktop-vintage-mockup: mulher à esquerda, recorte de retrato na margem esquerda, Arcos da Lapa à direita, céu vinho e vegetação. Fundo com sombras profundas próprias da geração e sem reforço adicional de saturação ou filtro de contraste CSS. A argola recebeu correção localizada para uma única forma oval. O texto continua em HTML. Prompts e variantes registrados no manifesto.

## Fundo contínuo dos coquetéis

A seção desktop de coquetéis usa cocktails-continuous (2172×724 px) como uma única imagem de fundo em toda sua largura: taça e colagens à esquerda, balcão e papel oliva contínuos ao centro e à direita. Título, descrição, ação e carrossel permanecem componentes HTML sobre a arte. A imagem não contém texto nem cards rasterizados. Prompts e fonte em assets/source/; variantes de 960, 1440 e 2172 px no manifesto.

## Banners fornecidos pelo usuário

A home passa a usar os arquivos enviados pelo usuário: hero-home-desktop-supplied (1672×941 px) e hero-home-mobile-supplied (909×1730 px). Os PNGs de origem foram copiados sem alteração para assets/source/; o site usa exportações WebP responsivas, sem ampliação ou filtros adicionais de cor. A origem está identificada como user-supplied no manifesto. Textos e controles seguem em HTML.

## Banners e imagens decorativas em todas as páginas

As cinco páginas compartilham uma única definição de banner responsivo com os arquivos desktop e mobile enviados pelo usuário. O enquadramento desktop das páginas internas mostra o rosto e o céu, sem filtros adicionais de saturação. As imagens decorativas lapa-vintage-decor (sobre e FAQ), bossa-vintage-decor (apoio de contato), cinema-vintage-decor (foto de apoio do banner de programação) e cocktails-continuous-vintage (fundo contínuo dos coquetéis) foram tratadas com image_gen usando o banner aprovado como referência de papel, grão, desgaste, sombras e paleta. As fotografias dos itens do cardápio, dos cards de eventos e da galeria continuam com seus arquivos originais. As quatro artes e seus prompts completos estão em assets/source/ e no manifesto.

## Letreiros mobile e navegação do cardápio

No celular, os letreiros das páginas internas são alinhados à esquerda, a partir de 120 px do topo e 12% da largura, sobre a área livre do céu do banner enviado. A programação mantém título e ingresso em colunas separadas, seguidos pela descrição e ação. O cardápio deixa de ter barra de pesquisa em todas as telas; os filtros de categorias e a abertura obrigatória na seleção Todos permanecem funcionais.
