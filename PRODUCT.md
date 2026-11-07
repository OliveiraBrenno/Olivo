# Olivo Bar
<!-- impeccable:product-schema 1 -->

## Platform
web

## Purpose and constraints
Site de apresentação do Olivo Bar, na Lapa, com coquetéis, programação cultural e história do bar. A entrega amplia a home para cinco páginas reais: início, cardápio, programação, galeria e contato, com adaptação desktop, tablet e mobile.

## Brand commitments
A imagem `/Users/Brenno/Desktop/mockup bar .png` estabeleceu a identidade Cinema na Lapa. As cinco pranchas fornecidas em `Olivo_Cinema_na_Lapa/` orientam a expansão atual. Preservar a linguagem cinematográfica, a paleta terrosa, o papel, a marca caligráfica e as composições internas. As pranchas externas de apresentação e as molduras de telefone não fazem parte da página.

A versão atual ocupa toda a largura da janela. A home apresenta um banner de primeira tela, autorais com visualização dos itens e chamada ao cardápio, destaques com acesso à programação e uma chamada para a galeria. Os banners desktop e mobile enviados pelo usuário são compartilhados pelas cinco páginas. Fotos dos itens e da galeria permanecem separadas das artes decorativas. Manter os textos, preços e funcionalidades ao adaptar o layout para celular, tablet, desktop e texto ampliado.

## Implementation decisions
HTML, CSS e JavaScript com Vite, na pasta Olivo. `data.js` fornece o conteúdo compartilhado; o gerador produz os cinco arquivos HTML antes do build.

Os mockups agora fornecem valores ilustrativos de cardápio, preços, agenda, endereço e canais de contato, reproduzidos como demonstração e identificados no site. Não são dados comerciais confirmados. A agenda de janeiro e fevereiro não tem ano definido. Os seis autorais e seus complementos de conteúdo permanecem demonstrativos.

Contato prepara um rascunho local e temporário, com nome, telefone e e-mail obrigatórios. Data futura, horário e número de pessoas são opcionais para planejar uma visita; ao informar a data, horário e quantidade também são exigidos. O usuário escolhe o destinatário no WhatsApp e envia a mensagem por conta própria; não há destinatário fixo nem envio automático. O arquivo de calendário é um lembrete de visita e não confirma reserva. Não há processamento de pagamentos nem integração com uma equipe de reservas.

As fotografias desta entrega foram geradas ou editadas por IA a partir da direção aprovada; não representam registros autênticos do estabelecimento. A galeria oferece filtros e ampliação de fotos. Nenhum vídeo real foi fornecido.

## Validação

`npm run build` gera as cinco páginas e o pacote estático. `npm test` chama a suíte compartilhada `../scripts/olivo-site-test.mjs`, com Chrome DevTools Protocol e dependências nativas do Node, sem Playwright. A suíte valida a versão de produção em várias larguras, texto ampliado, foco, filtros, gestos de toque e rascunho de contato, sem enviar mensagens.
