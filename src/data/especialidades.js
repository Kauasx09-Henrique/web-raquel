/* Conteúdo de cada especialidade. A página /especialidades/:id monta tudo a partir daqui.
   foto       → foto da Dra. Raquel no topo da página (troque pelo arquivo em public/)
   miniatura  → imagem do tema (cards "Outras especialidades")                   
   
   */

const imagem = 'fotos/especialidades/reproducao.jpg'; // em public/

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
    miniatura: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&h=1100&q=75',
    videos: [
      { titulo: "DIU e Implanon: como escolher o método", src: '/videos/contracepcao/contracepcao-1.mp4' },
      { titulo: "A sua filha adolescente já escolheu um método contraceptivo?", src: '../public/videos/contracepcao/contracepcao-2.mp4' },
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
    foto: {imagem},
    miniatura: 'https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?auto=format&fit=crop&w=900&h=1100&q=75',
    videos: [
      { titulo: "Fertilidade: sua idade importa mais do que o tratamento?", src: '/videos/reproducao-humana/reproducao-1.mp4' },
      { titulo: "Congelamento de óvulos: quando considerar?", src: '/videos/reproducao-humana/reproducao-2.mp4' },
      { titulo: "Infertilidade: quando a causa está no homem?", src: '/videos/reproducao-humana/reproducao-3.mp4' },
      { titulo: "O que acontece no processo da estimulação ovariana?", src: '/videos/reproducao-humana/reproducao-4.mp4' },
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
    foto: '/fotos/especialidades/climaterio.jpg',
    miniatura: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&h=1100&q=75',
    videos: [
      { titulo: "Climatério: o que realmente acontece com o corpo", src: '/videos/climaterio/climaterio-1.mp4' },
      { titulo: "DIU na menopausa. Quando ele pode ser útil?", src: '/videos/climaterio/climaterio-2.mp4' },
      { titulo: "Obesidade e menopausa: qual a relação?", src: '/videos/climaterio/climaterio-3.mp4' },
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
    foto: '/fotos/especialidades/saude-intima.jpg',
    miniatura: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&h=1100&q=75',
    videos: [
      { titulo: "Laser íntimo e Fraxx: para quem são indicados?", src: '/videos/saude-intima/saude-intima-1.mp4' },
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
    foto: '/fotos/especialidades/cirurgia.jpg',
    miniatura: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&h=1100&q=75',
    videos: [
      { titulo: "Histeroscopia ou laparoscopia: qual a diferença?", src: '/videos/cirurgia/cirurgia-1.mp4' },
      { titulo: "Descobriu um cisto no ovário? Respira! Talvez você não precise operar", src: '/videos/cirurgia/cirurgia-2.mp4' },
      { titulo: "“Tenho medo da laparoscopia”: o que você precisa saber", src: '/videos/cirurgia/cirurgia-3.mp4' },
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
];

export const buscarEspecialidade = (id) => ESPECIALIDADES.find((e) => e.id === id);
