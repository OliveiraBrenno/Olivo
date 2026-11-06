# Auditoria técnica — Olivo

Data: 06/11/2026. Escopo: início, cardápio, programação, galeria e contato. Auditoria solicitada com `$impeccable audit`; nenhuma correção de interface aplicada.

## Veredito de integridade

**Passa como sistema visual coerente; exige correções técnicas antes de considerar acessibilidade validada.** A identidade de cinema na Lapa, os banners fornecidos, as artes decorativas, o papel e a tipografia formam um sistema específico do produto. Títulos e ações são HTML; fotografias do cardápio e galeria estão separadas dos fundos decorativos. Os problemas encontrados concentram-se em legibilidade, ampliação de texto, manutenção da cascata e confiabilidade dos testes.

## Pontuação

| Dimensão | Nota | Evidência principal |
|---|---:|---|
| Acessibilidade | 2/4 | Contraste insuficiente no subtítulo do banner de programação |
| Desempenho | 3/4 | Imagens responsivas e lazy loading; versões antigas ainda no build |
| Temas e tokens | 2/4 | Tokens existem, mas convivem com 115 cores literais distintas |
| Responsividade | 3/4 | Larguras normais passam; ensaio com texto ampliado causa sobreposição |
| Integridade da implementação | 3/4 | Identidade consistente, mas teste oficial e documentação têm contratos antigos |
| **Total** | **13/20** | **Aceitável; trabalho significativo nos pontos fracos** |

Pontuação heurística do playbook, não certificação WCAG, Lighthouse ou avaliação de hardware real.

**8 problemas consolidados: 0 P0, 2 P1, 5 P2 e 1 P3.** Ocorrências repetidas do detector foram agrupadas; decisões estéticas aprovadas não contam como defeito.

## P1 — prioridade alta

### 1. Contraste do subtítulo no banner de programação

- **Local:** `style.css:13`, `.featured-subtitle`; composição em `scripts/generate-pages.mjs:28`.
- **Categoria:** acessibilidade.
- **Evidência:** em 1440×900, “Sessão ao ar livre + trilha em vinil” fica sobre a parte iluminada do rosto. Medição de fundo por pixels encontrou mediana aproximada de **3,64:1**, com percentil 10 de **2,85:1**, em 420 amostras de traços do texto. O subtítulo tem 13 px.
- **Impacto:** dificulta a leitura da proposta principal do evento. A descrição abaixo também passa por trechos próximos ao limite: P10 ≈4,47:1, mediana ≈6,14:1.
- **Padrão:** [WCAG 1.4.3 — contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): 4,5:1 para texto normal. A fotografia exige medição local; médias globais da imagem não bastam.
- **Recomendação:** manter o banner e ajustar posição ou escurecimento localizado por trás do bloco de texto. Reavaliar todos os traços sobre os pontos mais claros, sem aumentar saturação.
- **Comando:** `$impeccable polish`.

### 2. Sobreposição e corte no ensaio de texto a 200%

- **Local:** `style.css:9`, `.hero h1`, `.hero-title`, `.poster-strip`; regras mobile da `.hero-caption`, `.featured-copy h1` e `.date-ticket`.
- **Categoria:** responsividade/acessibilidade.
- **Evidência:** em viewport 390×844, duplicando os tamanhos computados do texto, a home sobrepõe título, faixa e legenda; na programação o título entra sob o ingresso. Capturas: `../artifacts/olivo-audit/index-text200.png` e `programacao-text200.png`. A medição de `scrollWidth` continua passando, portanto o teste de overflow isolado não detecta a perda visual.
- **Impacto:** usuários que precisam de texto maior podem perder leitura mesmo quando a página não exibe rolagem horizontal.
- **Padrão:** risco relacionado a [WCAG 1.4.4 — redimensionamento do texto](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html).
- **Limite da evidência:** foi um ensaio de aumento de fontes via CSS, não o zoom nativo de Safari/Firefox. A falha desse mecanismo isolado não comprova reprovação formal de 1.4.4, que admite um mecanismo de ampliação suportado pelo navegador; validar também zoom nativo e ajustes de texto do sistema.
- **Recomendação:** permitir crescimento e quebra dos blocos; reduzir dependência de coordenadas absolutas, `white-space:nowrap` e colunas rígidas quando o texto aumenta.
- **Comando:** `$impeccable adapt`.

## P2 — próxima rodada

### 3. Texto funcional muito pequeno no desktop e tablet

- **Local:** `style.css:11–15` e regras de 701–950 px; descrições de itens do cardápio, preços/metadados da agenda, menu de navegação e ação dos coquetéis.
- **Categoria:** acessibilidade/legibilidade.
- **Evidência:** detector renderizado em 1440 px encontrou descrições de cardápio e metadados a 10 px; em 844 px, navegação e “Ver cardápio” também ficam a 10 px. Há notas e labels a 10–11 px no contato. Mobile melhorou para 14–16 px em boa parte do conteúdo, mas a legenda do mapa permanece a 10 px.
- **Impacto:** leitura difícil, especialmente no cardápio, justamente onde ingredientes e preços são essenciais.
- **Padrão:** WCAG não fixa tamanho mínimo em pixels; este é um problema de qualidade e legibilidade, não uma violação automática por tamanho.
- **Recomendação:** estabelecer escala mínima para conteúdo funcional e reorganizar as colunas para acomodá-la, preservando as famílias tipográficas aprovadas.
- **Comando:** `$impeccable typeset`.

### 4. Erro de reserva não conduz ao campo pendente

- **Local:** `src.js:222`, validação de horário/pessoas; formulário em `scripts/generate-pages.mjs:33`.
- **Categoria:** acessibilidade/interação.
- **Evidência:** com nome, telefone, e-mail e data futura preenchidos, mas sem horário/pessoas, o formulário anuncia a mensagem geral; o foco permanece em “Preparar mensagem”, sem `aria-invalid` em nenhum campo e sem associação do erro aos selects.
- **Impacto:** a pessoa precisa procurar os campos pendentes, especialmente em leitor de tela ou formulário longo no celular.
- **Padrão:** a mensagem textual já identifica os campos, portanto a ausência de `aria-invalid` isoladamente não prova falha de [WCAG 3.3.1](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html). Trata-se de melhorar associação e recuperação, incluindo a relação programática descrita em 1.3.1.
- **Recomendação:** associar erro e campos, indicar estado inválido e focar o primeiro select pendente. Manter a validação nativa existente.
- **Comando:** `$impeccable harden`.

### 5. Exportações antigas entram no build por importação ampla

- **Local:** `src.js:3–4`, `import.meta.glob('./assets/photos/*.webp', { eager: true })`.
- **Categoria:** desempenho.
- **Evidência:** o build atual contém **89 WebP, somando 15.790.958 bytes**. Pelo menos **14 arquivos / 4.797.654 bytes** pertencem a cinco IDs de artes substituídas e não aparecem no HTML atual. O glob inclui essas URLs no mapa JavaScript, emitindo os arquivos no build. JS: 24.946 bytes, ~7,6 KB gzip; CSS: 102.657 bytes, ~15,6 KB gzip.
- **Impacto:** aumenta artefato de publicação e cache/deploy; o mapa de URLs também cresce. **Não significa que o navegador baixe todas as imagens**: não foi constatada transferência simultânea de todos esses arquivos.
- **Recomendação:** limitar o mapa dinâmico às fotos realmente usadas nos diálogos; manter origens/variantes descartadas em arquivo fora do conjunto publicado, sem apagar a proveniência.
- **Comando:** `$impeccable optimize`.

### 6. Cores e estados dispersos na cascata

- **Local:** `style.css:6`, blocos históricos de papel/botões e bloco final `--paper-action`.
- **Categoria:** temas/tokens.
- **Evidência:** **123 ocorrências de cores hexadecimais, 115 valores distintos**, além dos tokens existentes. Os mesmos componentes recebem ajustes em várias regras posteriores: papel de card, botão, hover e seleção.
- **Impacto:** aumenta a chance de reaparecerem diferenças entre botões e cards em novos ajustes de cor.
- **Padrão:** manutenção do sistema visual; não é obrigação fornecer modo claro/escuro. A identidade escura fixa é intencional.
- **Recomendação:** consolidar tokens semânticos de superfície, ação, seleção, borda e texto; separar variações necessárias da imagem das cores de interface. Remover sobrescritas mortas sem trocar a paleta aprovada.
- **Comando:** `$impeccable extract`.

### 7. Teste oficial e contexto durável ainda descrevem outra versão

- **Local:** `tests/site.mjs:36`, `tests/site.mjs:72–76`, `PRODUCT.md:14` e passagens antigas de `DESIGN.md`.
- **Categoria:** integridade.
- **Evidência:** `npm test` aponta para um teste que limita a largura a 1120 px, embora a versão atual ocupe 1440/1920 px. Também espera modal ao clicar no autoral da home, hoje um link para o cardápio por solicitação do usuário. PRODUCT.md ainda declara limite de largura de 1120 px. A auditoria usou os validadores CDP compartilhados; não executou Playwright.
- **Impacto:** o comando de teste oficial não representa o comportamento aprovado e pode reprovar entregas corretas. Documentação conflitante pode induzir regressões.
- **Recomendação:** atualizar o contrato de testes e contexto para o comportamento atual e definir um comando de validação compatível com a infraestrutura realmente adotada.
- **Comando:** `$impeccable harden` para testes e `$impeccable document` para o contrato atual.

## P3 — acabamento

### 8. Preload não acompanha a face dos principais títulos

- **Local:** `scripts/generate-pages.mjs:38`; `style.css:1–2`.
- **Categoria:** desempenho.
- **Evidência:** todas as páginas priorizam Bodoni regular e Great Vibes, enquanto os H1 atuais usam Bodoni itálica. O arquivo itálico local de 16.552 bytes não recebe preload.
- **Impacto:** pode atrasar a tipografia principal na primeira visita; não houve medição de LCP ou troca de fonte sob rede lenta para quantificar o efeito.
- **Recomendação:** priorizar a face realmente visível no primeiro viewport de cada rota, evitando preloads sem uso imediato.
- **Comando:** `$impeccable optimize`.

## Detector: triagem contextual

- Fonte/HTML: **39 alertas brutos**; mobile renderizado: **20**; desktop renderizado: **91**. São ocorrências e heurísticas, não 150 defeitos distintos.
- **Confirmados:** texto funcional pequeno no desktop/tablet, e algumas quebras de última palavra que podem ser refinadas depois dos problemas principais.
- **Escolhas aprovadas:** Bodoni serifada em itálico pertence ao mockup. Inter já tem exceção registrada anteriormente. Não se recomenda mudar essas fontes por um alerta genérico.
- **Falsos positivos:** o gradiente repetido da galeria é a máscara das perfurações de película; não é um fundo listrado genérico. Alertas estáticos de padding no contêiner de largura total não consideram corretamente todos os insets em porcentagem. “Bar da Lapa 56% coberto” se baseia em caixas sobrepostas do logotipo rotacionado; a captura desktop não mostra o texto sendo ocultado por glifos.
- Não foram criadas novas exceções nem alteradas configurações do detector durante esta auditoria.

## Evidências e limites

- Detector Impeccable: fonte, cinco URLs em 390×844 e cinco em 1440×900.
- Chromium/CDP: **25 combinações** de cinco rotas com 320×568, 390×844, 844×390, 1440×900 e 1920×1080. Sem overflow horizontal em escala normal; um H1 por página; nenhum controle visível mobile abaixo de 44×44 px no levantamento.
- Contraste: captura normal comparada com outra sem a tinta do texto, mantendo layout e fundo. Pixels próximos à cor computada do texto foram associados ao fundo correspondente. Estatísticas são locais e aproximadas; não substituem uma auditoria integral de contraste de todos os estados.
- Texto a 200%: aumento de fontes por CSS no mesmo viewport, inspecionado visualmente. O teste de overflow sozinho não acusou as sobreposições, como mostram as imagens.
- Formulário testado localmente, sem envio de mensagens. Diálogo da galeria abre e retorna foco ao gatilho.
- Build de produção passou. O inventário de bytes vem de `dist/`. As medições renderizadas usaram o servidor Vite; não há nota Lighthouse, medição confiável de LCP/INP/CLS ou ensaio de rede lenta nesta auditoria.
- Não houve teste em aparelho físico, Safari/Firefox ou leitor de tela real. Gestos sintetizados no Chromium haviam passado na validação imediatamente anterior; não equivalem a um teste em iPhone.
- Dados, preços, agenda e imagens demonstrativos são identificados pelo produto; não foram tratados como falhas comerciais nesta auditoria.

Arquivos brutos e capturas: `../artifacts/olivo-audit/` (`technical.json`, `detector-source.json`, `detector-mobile.json`, `detector-desktop.json`, capturas desktop e `*-text200.png`).

## Aspectos que funcionam bem

- Identidade visual específica, banners responsivos e artes com proveniência.
- Textos e ações editáveis, imagens com variantes e carregamento tardio fora do destaque.
- Menu com estado expandido, fechamento por Escape e retorno de foco.
- Diálogo nativo, foco restituído, filtros com estados e resultados anunciados.
- Modo de movimento reduzido preserva mudanças de estado sem animá-las; sem autoplay no carrossel.
- Formulário tem labels, autocomplete, tipos de campo adequados e mensagens locais. A reserva não é apresentada como confirmada automaticamente.

## Ordem recomendada

1. **[P1] `$impeccable adapt`** — robustez dos títulos, legendas e ingresso com texto ampliado.
2. **[P1] `$impeccable polish`** — contraste localizado do subtítulo da programação.
3. **[P2] `$impeccable typeset`** — escala legível de descrições, labels e metadados no desktop/tablet.
4. **[P2] `$impeccable harden`** — recuperação de erros do formulário e contratos de testes.
5. **[P2] `$impeccable extract`** e **`$impeccable document`** — consolidar tokens/cascata e contexto atual.
6. **[P2/P3] `$impeccable optimize`** — importação de imagens e preload de fontes.
7. **`$impeccable polish`** — conferência visual final, seguida de nova auditoria.

Os comandos podem ser executados um a um, em conjunto ou na ordem escolhida pelo usuário. Repetir `$impeccable audit` após as correções para comparar resultados.
