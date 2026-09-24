/* Conteúdo de cada especialidade. A página /especialidades/:id monta tudo a partir daqui.
   foto       → foto no topo da página da especialidade
   miniatura  → imagem do card na página inicial e em "Outras especialidades"
*/

// CONSTANTES NO TOPO DO ARQUIVO:
const FOTO_REPRODUCAO = '/fotos/cirurgia-zoom.jpg'; 
const FOTO_CIRURGIA = '/fotos/cirurgia1.jpg'; 
const CLIMATERIO ='/fotos/climaterio.jpg';
const  INTIMA = '/fotos/saude-intima.png';
const ULTRASSONOGRAFIA = '/fotos/ultrassonografia.jpg';

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
    miniatura: 'https://i.pinimg.com/1200x/74/71/df/7471df6ede1b93f092d0804c6eebcaaf.jpg',
    videos: [
      { titulo: 'DIU e Implanon: como escolher o método', src: 'https://drive.google.com/file/d/1FaEG5ZZzWorUGjzbsfSn_Iie5k8vDicl/view?usp=sharing', capa: '/capas/diu-X-implanon.png' },
      { titulo: 'A sua filha adolescente já escolheu um método contraceptivo?', src: 'https://drive.google.com/file/d/1hnxDu51Mrmsv3RMSt6YFqVD4h8soSIfg/view?usp=sharing', capa: '/capas/adolescente.png' },
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
    foto: 'https://i.pinimg.com/736x/5c/84/9c/5c849c6fdc650e789bc1b145466b009e.jpg', // Usando a constante aqui!
    miniatura: 'https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?auto=format&fit=crop&w=900&h=1100&q=75',
    videos: [
      { titulo: 'Fertilidade: sua idade importa mais do que o tratamento?', src: 'https://drive.google.com/file/d/1GQSHQFWi3d1Prl66AqR3kNpXyoJJ-n6r/view?usp=sharing', capa: '/capas/infertilidade.png' },
      { titulo: 'Congelamento de óvulos: quando considerar?', src: 'https://drive.google.com/file/d/1I_avoIn1fQLuu_Edv-Pg0lqqKsYUpk96/view?usp=sharing', capa: '/capas/congelamento.png' },
      { titulo: 'Infertilidade: quando a causa está no homem?', src: 'https://drive.google.com/file/d/1pnvoGgMMn6ewaNf7hovKFedg1WpOcMHr/view?usp=sharing', capa: '/capas/infertilidade-homem.png' },
      { titulo: 'O que acontece no processo da estimulação ovariana?', src: 'https://drive.google.com/file/d/1GQSHQFWi3d1Prl66AqR3kNpXyoJJ-n6r/view?usp=sharing', capa: '/capas/estimulacao.png' },
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
    foto: CLIMATERIO, // Usando a constante aqui!
    miniatura: 'https://i.pinimg.com/1200x/0b/17/00/0b1700872d018c0a839572868a6c8f44.jpg',
    videos: [
      { titulo: 'Climatério: o que realmente acontece com o corpo', src: 'https://drive.google.com/file/d/14sx5lfU50NiNRfz1AGLqMFD4jntnx8x6/view?usp=sharing', capa: '/capas/climaterio.png' },
      { titulo: 'DIU na menopausa. Quando ele pode ser útil?', src: 'https://drive.google.com/file/d/1mXHzoM8lXYmTDvyW2XLWlygbVwKoyFn-/view?usp=sharing', capa: '/capas/diu-X-menopausa.png' },
      { titulo: 'Obesidade e menopausa: qual a relação?', src: 'https://drive.google.com/file/d/1n6RWIqw04DGdyDg7gIfXcl0nNBHJ1Dy9/view?usp=sharing', capa: '/capas/obesidade.png' },
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
    foto: INTIMA, // Usando a constante aqui!
    miniatura: 'https://plus.unsplash.com/premium_photo-1702598850330-7e442c887df7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    videos: [
      { titulo: 'Laser íntimo e Fraxx: para quem são indicados?', src: 'https://drive.google.com/file/d/17oL1LXYB7GGkaqJ7r-I0sU2nRiK8c0ew/view?usp=sharing', capa: '/capas/desconforto.png' },
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
    foto: FOTO_REPRODUCAO, // Usando a constante aqui!
    miniatura: FOTO_CIRURGIA, // Usando a constante aqui!
    videos: [
      { titulo: 'Histeroscopia ou laparoscopia: qual a diferença?', src: 'https://drive.google.com/file/d/1JoPLm18j42r-MHE_XqnG0IectAGgB7LM/view?usp=drive_link', capa: '/capas/histeroscopia-X-laparoscopia.png' },
      { titulo: 'Descobriu um cisto no ovário? Respira! Talvez você não precise operar', src: 'https://drive.google.com/file/d/1g_zVK2ebeKVqfYOMSDrK6fsnhvWxLXME/view?usp=drive_link', capa: '/capas/cisto-ovario.png' },
      { titulo: '“Tenho medo da laparoscopia”: o que você precisa saber', src: 'https://drive.google.com/file/d/1PFI0hroJAS7PnNdJkf_g3Kk9kLaGEGNY/view?usp=drive_link', capa: '/capas/laparoscopia.png' },
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
    foto: ULTRASSONOGRAFIA, // Usando a constante aqui!', 
    miniatura: 'https://i.pinimg.com/736x/d9/02/60/d902605b634265a07484e582801c3ce5.jpg',
    videos: [
      { titulo: 'Ultrassonografia transvaginal: como é o exame?', src: '', capa: '/videos/capas/ultrassonografia-1.jpg' },
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