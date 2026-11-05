# Olivo — Cinema na Lapa

Site responsivo de cinco páginas em HTML, CSS e JavaScript com Vite, baseado nas cinco pranchas de `Olivo_Cinema_na_Lapa/`: início, cardápio, programação, galeria e contato. A home menor e os seis coquetéis autorais preservam a identidade cinematográfica; o conteúdo tem largura máxima de 1120 px.

```sh
npm install
npm run dev
npm run build
npm run preview
```

`npm run build` executa `scripts/generate-pages.mjs`, que usa `data.js` e as dimensões das imagens para regenerar os cinco HTML, e então compila com Vite. Edite o gerador e os dados para manter alterações nas páginas. Publique apenas `dist/`, com caminhos relativos; a saída não inclui os PNGs de origem nem os manifests de trabalho.

`npm run optimize:images` gera WebP responsivos a partir das 17 fontes em `assets/source/`, sem ampliação. Os seis masters de drinks têm 1122 × 1402 px, as cenas 1536 × 1024 px e o hero 1672 × 941 px; o hero também tem recorte para celular. O sufixo do arquivo indica a largura solicitada: a largura real é limitada à fonte. A origem e os prompts estão em `assets/generated-manifest.json`, com dimensões em `assets/image-dimensions.json`, metadados EXIF e sidecars de proveniência. As fotos foram geradas ou editadas por IA e não são registros autênticos do bar. Papel e oliva preservam as texturas da referência. Fontes locais: Bodoni Moda, Great Vibes, Barlow Condensed e Inter; licenças em `assets/fonts/`.

Inclui menu mobile, carrossel de seis autorais com botões, teclado e toque, detalhes em diálogo, busca e filtros do cardápio, agenda com data e categoria, filtros de fotos e lightbox. A galeria contém fotografias; não foi fornecido vídeo real.

O formulário exige nome, telefone e e-mail e prepara um rascunho temporário no navegador. A visita futura é opcional; ao escolher uma data, preencha também horário e número de pessoas. O usuário pode copiar o texto ou abrir o WhatsApp e escolher o destinatário; nada é enviado automaticamente e não há destinatário fixo. O lembrete `.ics` não confirma reserva. Preços, agenda, endereço e canais reproduzem valores ilustrativos dos mockups; não há integração comercial ou de pagamentos.

Depois de gerar a produção, execute `npm test` com Google Chrome instalado. A suíte testa as cinco rotas em nove larguras (320, 390, 600, 700, 701, 768, 1024, 1440 e 1920 px), fluxos de interação, teclado/foco, formulários e dimensões reais das imagens selecionadas em escala de dispositivo 2×. Gestos sintetizados no Chromium verificam o carrossel horizontal e a rolagem vertical da página. Não houve teste em Safari, Firefox ou hardware físico. Evidências e revisão visual estão em `.impeccable/review/`.
