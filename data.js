export const drinks = [
  { id: 'negroni', name: 'Negroni da Lapa', price: 42, description: 'Gin nacional, vermute de ervas, bitter e laranja-bahia.', story: 'O clássico com sotaque carioca. Intenso, cítrico e feito para acompanhar uma boa conversa.' },
  { id: 'bossa', name: 'Bossa Dourada', price: 44, description: 'Gin, vermute branco, cordial de limão e azeitona.', story: 'Uma melodia delicada em taça: notas cítricas, frescor e um final levemente salino.' },
  { id: 'verde', name: 'Verde Olivo', price: 42, description: 'Cachaça branca, limão, manjericão e soda artesanal.', story: 'O lado verde da nossa boemia. Ervas frescas e borbulhas para as noites quentes da Lapa.' },
  { id: 'spritz', name: 'Olivo Spritz', price: 46, description: 'Espumante brut, bitter de laranja, flor de laranjeira e soda.', story: 'A cor do pôr do sol em um brinde leve, perfumado e sem pressa.' },
  { id: 'leme', name: 'Pôr do Leme', price: 44, description: 'Cachaça envelhecida, maracujá, mel e limão-siciliano.', story: 'Fruta brasileira e notas amadeiradas, com um ramo de alecrim para abrir a cena.' },
  { id: 'madrugada', name: 'Última Sessão', price: 45, description: 'Vodka, café espresso, licor de café e toque de baunilha.', story: 'Um final de filme à altura da noite: café intenso, textura aveludada e três grãos para brindar.' },
];

export const menuSections = [
  { id: 'classicos', title: 'Coquetéis clássicos', items: [
    ['Dry Martini', 'Gin, vermute seco e azeitona.', 40], ['Margarita', 'Tequila, triple sec e limão.', 38], ['Moscow Mule', 'Vodka, limão, gengibre e espuma.', 39], ['Caipirinha', 'Cachaça, limão e açúcar. Também com maracujá ou abacaxi.', 36],
  ] },
  { id: 'outros', title: 'Outros drinks', items: [
    ['Aperol Spritz', 'Aperol, espumante e soda.', 42], ['Gin Tônica Olivo', 'Gin, tônica premium e botânicos da estação.', 40], ['Clericot da Lapa', 'Vinho branco, frutas da época e toque cítrico.', 38], ['Penicillin', 'Whisky, mel, gengibre e limão.', 44],
  ] },
  { id: 'petiscos', title: 'Petiscos', photo: 'petiscos', items: [
    ['Pastel da Lapa', 'Quatro unidades com costela desfiada e queijo coalho.', 32], ['Bolinho de Bacalhau', 'Seis unidades. Crocante por fora, cremoso por dentro.', 34], ['Mandioca Frita', 'Com maionese de ervas da casa.', 28], ['Dadinho de Tapioca', 'Com geleia de pimenta e limão.', 32],
  ] },
  { id: 'pratos', title: 'Pratos da casa', photo: 'moqueca', items: [
    ['Moqueca de Peixe da Lapa', 'Peixe fresco, leite de coco, dendê e arroz de ervas.', 78], ['Bife Ancho Olivo', 'Bife ancho grelhado, farofa de castanhas e vinagrete.', 82], ['Risoto de Cogumelos', 'Cremoso, com cogumelos frescos e parmesão.', 68], ['Nhoque de Abóbora', 'Nhoque artesanal, molho de sálvia e parmesão curado.', 64],
  ] },
  { id: 'sobremesas', title: 'Sobremesas em cartaz', photo: 'sobremesa', items: [
    ['Petit Gâteau da Lapa', 'Bolo quente de chocolate com sorvete de baunilha.', 34], ['Pudim de Coco Queimado', 'Cremoso, com calda de rapadura.', 30], ['Torta de Banana', 'Banana caramelizada, creme de canela e farofa crocante.', 32], ['Sorvetes da Estação', 'Consulte os sabores do dia.', 26],
  ] },
  { id: 'sem-alcool', title: 'Sem álcool', items: [
    ['Jardim da Lapa', 'Limão, manjericão, maçã verde e soda.', 26], ['Maracujá em Cena', 'Maracujá, mel, gengibre e água com gás.', 26], ['Soda da Casa', 'Frutas da estação e água com gás.', 18], ['Sucos Naturais', 'Laranja, abacaxi ou limão.', 14],
  ] },
];

export const events = [
  { id: 'cine', name: 'Cine Lapa', day: '24', month: 'JAN', weekday: 'Sex', time: '20h00', category: 'cinema', image: 'cinema', price: 30, kind: 'Ingressos', description: 'Sessão ao ar livre + trilha em vinil', long: 'Clássicos do cinema na varanda do Olivo, com projeção ao ar livre e trilha em vinil.' },
  { id: 'samba', name: 'Roda de Samba', day: '25', month: 'JAN', weekday: 'Sáb', time: '19h30', category: 'roda', image: 'samba', price: 20, kind: 'Couvert', description: 'Samba de raiz na Lapa', long: 'Roda aberta com músicos convidados, clássicos do samba e aquele clima boêmio da Lapa.' },
  { id: 'bossa', name: 'Noite Bossa', day: '26', month: 'JAN', weekday: 'Dom', time: '20h30', category: 'musica', image: 'jazz', price: 25, kind: 'Couvert', description: 'Bossa, jazz e canções brasileiras', long: 'Uma noite dedicada à bossa nova, com repertório autoral e releituras de clássicos.' },
  { id: 'jazz', name: 'Jazz & Vermute', day: '30', month: 'JAN', weekday: 'Qui', time: '21h00', category: 'musica', image: 'jazz', price: 30, kind: 'Couvert', tags: ['drinks'], description: 'Quarteto ao vivo e carta especial', long: 'Jazz na varanda, com quarteto ao vivo e uma seleção especial de vermutes da casa.' },
  { id: 'dj', name: 'DJ Set na Varanda', day: '01', month: 'FEV', weekday: 'Sáb', time: '22h00', category: 'dj', image: 'dj', price: 25, kind: 'Entrada', description: 'Discos, brasilidades e clássicos', long: 'Pista na varanda com DJ convidado, misturando brasilidades, grooves e clássicos da noite.' },
];

export const gallery = [
  { image: 'lapa', title: 'A noite começa nos arcos', category: 'noites', shape: 'tall' },
  { image: 'bar', title: 'O cuidado por trás do balcão', category: 'bastidores', shape: 'tall' },
  { image: 'jazz', title: 'A trilha da nossa noite', category: 'musica', shape: 'wide' },
  { image: 'bossa', title: 'Bossa Dourada em cena', category: 'coqueteis', shape: '' },
  { image: 'friends', title: 'O melhor roteiro é o encontro', category: 'noites', shape: 'wide' },
  { image: 'samba', title: 'O ritmo da Lapa', category: 'musica', shape: '' },
  { image: 'negroni', title: 'Negroni, nosso protagonista', category: 'coqueteis', shape: '' },
  { image: 'cinema', title: 'Cinema sob o céu do Rio', category: 'espaco', shape: 'wide' },
  { image: 'bar', title: 'Um lugar para ficar', category: 'espaco', shape: 'wide' },
];

export const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
