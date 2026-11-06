# Validação do Olivo

Executar a partir da pasta `Olivo`, no workspace compartilhado `portfolio`:

```sh
npm run build
npm test
```

O build gera as cinco páginas HTML e publica somente os assets referenciados. `npm test` usa `../scripts/olivo-site-test.mjs` da infraestrutura compartilhada. A suíte inicia o preview da produção na porta local 5291 e Chrome headless com um perfil temporário; ambos são encerrados ao final. Não depende de Playwright.

Requisitos: Node 22 ou superior, dependências Vite instaladas do projeto e Google Chrome. No macOS usa o caminho padrão do aplicativo; em outro ambiente, configure `OLIVO_CHROME_PATH` para o executável disponível.

Cobertura:

- Cinco rotas em 320, 390, 700, 701, 720, 844, 1440 e 1920 px; 844 px também em paisagem.
- Banners corretos, um H1 por página, controles mobile, imagens e ausência de erros de recursos/JavaScript.
- Texto ampliado a 200% por CSS com verificação geométrica de colisão e capturas para inspeção. A largura de 720 px também cobre o refluxo equivalente a um desktop de 1440 px ampliado, sem alegar teste do menu de zoom do navegador.
- Menu e Escape, chamada “Ver programação”, autorais levando ao cardápio, filtros, Todos aberto, diálogos e retorno de foco.
- Swipe horizontal e rolagem vertical com eventos de toque sintetizados pelo CDP.
- Erros de reserva ligados aos campos e recuperação com foco, rascunho seguro do WhatsApp e estrutura do lembrete de calendário. Não envia mensagens nem salva uma reserva; o download do teste é interceptado em memória.

Resultados e capturas ficam em `../artifacts/olivo-production-tests/`, fora do repositório do site. O arquivo `tests/site.mjs` é apenas uma entrada de compatibilidade para essa mesma suíte.

Para revisão visual e contraste, os scripts compartilhados `olivo-all-banner-review.mjs` e `olivo-technical-audit.mjs` aceitam URL local e pasta de artefatos. O detector Impeccable complementa essas verificações; heurísticas de estilo devem ser conferidas contra o mockup aprovado.

Esses testes cobrem Chromium. Safari, leitor de tela e dispositivos físicos ainda exigem validação específica. Não são pontuações Lighthouse nem medições de Core Web Vitals em campo.
