
// SEPARANDO CADA UM PARA FICAR MAIS ORGANIZADO E FACILITAR A TROCA DE FOTOS NO FUTURO
// CONTRACEPÇÃO

const CARD_CONTRACEPCAO = 'https://i.pinimg.com/1200x/74/71/df/7471df6ede1b93f092d0804c6eebcaaf.jpg';
const VIDEO_DIU_IMPLACON = '/videos/DIU-Implanon.mp4';
const VIDEO_CLIMATERIO_FILHA = '/videos/contracepcao-filha.mp4';
 

// REPRODUÇÃO HUMANA

const CARD_REPRODUCAO = 'https://i.pinimg.com/736x/5c/84/9c/5c849c6fdc650e789bc1b145466b009e.jpg';
const MINIATURA_REPRODUCAO = 'https://i.pinimg.com/736x/6f/59/7b/6f597bc7cc04be65f2581ecd5f5e9dc6.jpg';
const VIDEO_REPRODUCAO_FERTILIDADE = '/videos/fertilidade.mp4';
const VIDEO_REPRODUCAO_CONGELAMENTO = '/videos/congelamento.mp4';
const VIDEO_REPRODUCAO_INFERTILIDADE = '/videos/infertilidade.mp4';
const VIDEO_REPRODUCAO_ESTIMULACAO = '/videos/estimulacao.mp4';

// CLIMATÉRIO

const CARD_CLIMATERIO ='/fotos/climaterio.jpg';
const MINIATURA_CLIMATERIO = 'https://i.pinimg.com/1200x/0b/17/00/0b1700872d018c0a839572868a6c8f44.jpg';
const VIDEO_REPRODUCAO_MENOPAUSA = '/videos/menopausa.mp4';
const VIDEO_REPRODUCAO_OBESIDADE = '/videos/obesidade.mp4';
const VIDEO_REPRODUCAO_CLIMATERIO = '/videos/climaterio.mp4';

// SAÚDE ÍNTIMA
const  CARD_INTIMA = '/fotos/saude-intima.png';
const MINIATURA_INTIMA = 'https://plus.unsplash.com/premium_photo-1702598850330-7e442c887df7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const VIDEO_INTIMA = '/videos/saude-intima.mp4';

// CIRURGIA GINECOLÓGICA

const CARD_CIRURGIA = '/fotos/cirurgia-zoom.jpg'; 
const MINIATURA_CIRURGIA = '/fotos/cirurgia1.jpg'; 
const VIDEO_CIRURGIA_HISTEROSCOPIA = '/videos/histeroscopia.mp4';  
const VIDEO_CIRURGIA_LAPAROSCOPIA = '/videos/laparoscopia.mp4';
const VIDEO_CIRURGIA_CISTO = '/videos/cisto.mp4';

//ULTRASSONOGRAFIA

const CARD_ULTRASSONOGRAFIA = '/fotos/especialidades/cards/card.jpeg';
const VIDEO_ULTRASSONOGRAFIA = '/videos/ultrassonografia.mp4';
const MINIATURA_ULTRASSONOGRAFIA = '/fotos/especialidades/miniaturas/ultrassonografia.jpeg';   



export const ESPECIALIDADES = [
  {
    id: 'contracepcao',
    n: '01',
    titulo: 'Contracepção',
    headline: 'O método certo é aquele que faz sentido para você.',
    texto:
      'A avaliação contraceptiva é individualizada: considera sua idade, histórico de saúde, rotina, desejo reprodutivo e preferências. A partir daí, decidimos juntas qual caminho faz sentido agora — e quando vale rever essa escolha.',
    citacao: 'Mais liberdade para viver o seu tempo.',
    foto: '/fotos/especialidades/contracepcao.jpg',
    miniatura: CARD_CONTRACEPCAO,
    videos: [
      { titulo: 'DIU e Implanon: como escolher o método', src: VIDEO_DIU_IMPLACON, capa: '/capas/diu-X-implanon.png' },
      { titulo: 'A sua filha adolescente já escolheu um método contraceptivo?', src: VIDEO_CLIMATERIO_FILHA, capa: '/capas/adolescente.png' },
    ],
    topicos: [
      { titulo: 'DIU e Implanon', texto: 'Como funcionam, para quem são indicados e o que esperar da colocação.' },
      { titulo: 'Anticoncepção na adolescência', texto: 'Orientação segura e acolhedora para a primeira escolha de método.' },
      { titulo: 'Anticoncepcional e trombose', texto: 'Quando o risco existe e como avaliar antes de começar.' },
      { titulo: 'Contracepção após os 40', texto: 'Opções que acompanham as mudanças do corpo nessa fase.' },
    ],
    emBreve: ['DIU hormonal × DIU de cobre', 'O que considerar antes de escolher um método'],
    cta: 'Agendar avaliação contraceptiva',
  },
  {
    id: 'reproducao',
    n: '02',
    titulo: 'Reprodução Humana',
    headline: 'Seu projeto de maternidade também merece planejamento.',
    texto:
      'Avaliação e tratamento da infertilidade, planejamento reprodutivo e preservação da fertilidade — com investigação do casal e decisões tomadas com clareza sobre tempo, chances e alternativas.',
    citacao: 'Ciência hoje para mais histórias amanhã.',
    foto: CARD_REPRODUCAO, // Usando a constante aqui!
    miniatura: MINIATURA_REPRODUCAO,
    videos: [
      { titulo: 'Fertilidade: sua idade importa mais do que o tratamento?', src: VIDEO_REPRODUCAO_FERTILIDADE, capa: '/capas/infertilidade.png' },
      { titulo: 'Congelamento de óvulos: quando considerar?', src: VIDEO_REPRODUCAO_CONGELAMENTO, capa: '/capas/congelamento.png' },
      { titulo: 'Infertilidade: quando a causa está no homem?', src: VIDEO_REPRODUCAO_INFERTILIDADE, capa: '/capas/infertilidade-homem.png' },
      { titulo: 'O que acontece no processo da estimulação ovariana?', src: VIDEO_REPRODUCAO_ESTIMULACAO, capa: '/capas/estimulacao.png' },
    ],
    topicos: [
      { titulo: 'Fertilidade e idade', texto: 'O que muda com o tempo e por que planejar cedo faz diferença.' },
      { titulo: 'Congelamento de óvulos', texto: 'Quando considerar, como funciona e o que esperar do processo.' },
      { titulo: 'Infertilidade masculina', texto: 'Quando a causa pode estar no homem e como investigar o casal.' },
      { titulo: 'Reserva ovariana', texto: 'O que o AMH mostra — e o que ele não mostra — sobre a sua fertilidade.' },
    ],
    emBreve: ['FIV: o que acontece depois da coleta', 'Endometriose e fertilidade'],
    cta: 'Agendar avaliação de fertilidade',
  },
  {
    id: 'climaterio',
    n: '03',
    titulo: 'Climatério e Terapia Hormonal',
    headline: 'Uma nova fase, não o fim da sua qualidade de vida.',
    texto:
      'Sono, humor, libido, composição corporal, saúde óssea e cardiovascular fazem parte da avaliação. O tratamento é individualizado — hormonal ou não — de acordo com seus sintomas, histórico e objetivos.',
    citacao: 'Vitalidade em todas as fases.',
    foto: CARD_CLIMATERIO, // Usando a constante aqui!
    miniatura: MINIATURA_CLIMATERIO,
    videos: [
      { titulo: 'Climatério: o que realmente acontece com o corpo', src: VIDEO_REPRODUCAO_CLIMATERIO, capa: '/capas/climaterio.png' },
      { titulo: 'DIU na menopausa. Quando ele pode ser útil?', src: VIDEO_REPRODUCAO_MENOPAUSA, capa: '/capas/diu-X-menopausa.png' },
      { titulo: 'Obesidade e menopausa: qual a relação?', src: VIDEO_REPRODUCAO_OBESIDADE, capa: '/capas/obesidade.png' },
    ],
    topicos: [
      { titulo: 'Sintomas do climatério', texto: 'Calorões, sono, humor e libido: o que é esperado e o que merece atenção.' },
      { titulo: 'Terapia hormonal', texto: 'Para quem pode ser indicada, benefícios e cuidados individualizados.' },
      { titulo: 'Obesidade e menopausa', texto: 'Por que o corpo muda nessa fase e como cuidar do metabolismo.' },
      { titulo: 'Desconforto íntimo', texto: 'Ressecamento e dor na relação têm tratamento — e não são "normais da idade".' },
    ],
    emBreve: ['Sono e menopausa', 'Massa muscular depois dos 40'],
    cta: 'Agendar consulta de climatério',
  },
  {
    id: 'saude-intima',
    n: '04',
    titulo: 'Saúde Íntima',
    headline: 'Saúde íntima também é qualidade de vida.',
    texto:
      'Sintomas íntimos podem interferir na autoestima, na sexualidade, no conforto e na qualidade de vida. A avaliação ginecológica permite identificar as causas e discutir as opções de tratamento mais adequadas para cada mulher.',
    citacao: 'Conforto, segurança e bem-estar em todas as fases da sua vida.',
    foto: CARD_INTIMA, // Usando a constante aqui!
    miniatura: MINIATURA_INTIMA,
    videos: [
      { titulo: 'Laser íntimo e Fraxx: para quem são indicados?', src: VIDEO_INTIMA, capa: '/capas/desconforto.png' },
    ],
    topicos: [
      { titulo: 'Laser íntimo e Fraxx', texto: 'Tecnologias que podem ajudar em situações selecionadas, após avaliação.' },
      { titulo: 'Incontinência urinária', texto: 'Perdas de urina são comuns, mas não precisam fazer parte da rotina.' },
      { titulo: 'Ressecamento e desconforto', texto: 'Causas, tratamentos e como recuperar o conforto no dia a dia.' },
      { titulo: 'Síndrome geniturinária', texto: 'Alterações da menopausa que afetam a região íntima e urinária.' },
    ],
    situacoes: {
      titulo: '5 situações em que tecnologias como Laser Íntimo e Fraxx podem ser consideradas',
      itens: [
        'Ressecamento e desconforto vaginal',
        'Síndrome geniturinária da menopausa',
        'Alguns casos de sintomas urinários',
        'Alterações relacionadas à qualidade dos tecidos vaginais',
        'Situações selecionadas após avaliação ginecológica individualizada',
      ],
    },
    nota:
      'Tecnologias como laser íntimo e Fraxx não são indicadas para todas as mulheres nem para todos os sintomas. A indicação é individualizada, após avaliação médica.',
    emBreve: ['Qualidade dos tecidos vaginais', 'Saúde íntima no pós-parto'],
    cta: 'Conhecer as opções de tratamento',
  },
  {
    id: 'cirurgia',
    n: '05',
    titulo: 'Cirurgias Ginecológicas',
    headline: 'Planejamento, segurança e cuidado em cada etapa.',
    texto:
      'Indicação criteriosa, preparo pré-operatório, técnica minimamente invasiva sempre que possível e acompanhamento próximo na recuperação. Há situações em que a melhor conduta é justamente evitar a cirurgia — e isso também é discutido.',
    citacao: 'Tecnologia a serviço da sua saúde e bem-estar.',
    foto: CARD_CIRURGIA, // Usando a constante aqui!
    miniatura: MINIATURA_CIRURGIA, // Usando a constante aqui!
    videos: [
      { titulo: 'Histeroscopia ou laparoscopia: qual a diferença?', src: VIDEO_CIRURGIA_HISTEROSCOPIA, capa: '/capas/histeroscopia-X-laparoscopia.png' },
      { titulo: 'Descobriu um cisto no ovário? Respira! Talvez você não precise operar', src: VIDEO_CIRURGIA_CISTO, capa: '/capas/cisto-ovario.png' },
      { titulo: '“Tenho medo da laparoscopia”: o que você precisa saber', src: VIDEO_CIRURGIA_LAPAROSCOPIA, capa: '/capas/laparoscopia.png' },
    ],
    topicos: [
      { titulo: 'Histeroscopia × laparoscopia', texto: 'O que cada uma faz, quando é indicada e como é a recuperação.' },
      { titulo: 'Pólipo uterino', texto: 'Quando tratar, quando acompanhar e o que muda na menopausa.' },
      { titulo: 'Medo da cirurgia', texto: 'O que você precisa saber para chegar tranquila ao procedimento.' },
      { titulo: 'Recuperação', texto: 'Cuidados no pós-operatório e retorno às atividades.' },
    ],
    emBreve: ['Miomas', 'Endometriose', 'Cistos ovarianos'],
    cta: 'Agendar avaliação cirúrgica',
  },
  {
    id: 'ultrassonografia',
    n: '06',
    titulo: 'Ultrassonografia Transvaginal',
    headline: 'Um exame essencial para enxergar com precisão.',
    texto:
      'A ultrassonografia transvaginal avalia útero, endométrio e ovários com alta definição. É fundamental na investigação de sintomas, no acompanhamento da fertilidade e no planejamento de tratamentos — realizada com cuidado, privacidade e explicação de cada etapa.',
    citacao: 'Diagnóstico preciso, cuidado próximo.',
    foto: MINIATURA_ULTRASSONOGRAFIA, // Usando a constante aqui!
    miniatura: CARD_ULTRASSONOGRAFIA, // Usando a constante aqui!
    videos: [
      { titulo: 'Ultrassonografia transvaginal: como é o exame?', src: VIDEO_ULTRASSONOGRAFIA, capa: '/capas/ultrasonografia.png' },
    ],
    topicos: [
      { titulo: 'Como é o exame', texto: 'Rápido, feito no consultório e com orientação em cada etapa.' },
      { titulo: 'Quando é indicado', texto: 'Dor pélvica, sangramento, check-up ginecológico e investigação de alterações.' },
      { titulo: 'Fertilidade', texto: 'Contagem de folículos, avaliação da reserva ovariana e acompanhamento da ovulação.' },
      { titulo: 'Preparo', texto: 'Na maioria dos casos não exige preparo especial.' },
    ],
    emBreve: ['Ultrassom e endometriose', 'Monitorização da ovulação'],
    cta: 'Agendar ultrassonografia',
  },
];

export const buscarEspecialidade = (id) => ESPECIALIDADES.find((e) => e.id === id);