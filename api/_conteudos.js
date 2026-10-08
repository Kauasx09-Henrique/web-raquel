
export const CONTEUDOS = [
  // Contracepção
  { id: 'contra-1', tema: 'Contracepção', titulo: 'DIU e Implanon: como escolher o método', src: '/aulas/fertilidade.mp4' },
  { id: 'contra-2', tema: 'Contracepção', titulo: 'A sua filha adolescente já escolheu um método contraceptivo?', src: 'https://drive.google.com/file/d/1hnxDu51Mrmsv3RMSt6YFqVD4h8soSIfg/view' },

  // Reprodução Humana
  { id: 'repro-1', tema: 'Reprodução Humana', titulo: 'Fertilidade: sua idade importa mais do que o tratamento?', src: 'https://drive.google.com/file/d/1GQSHQFWi3d1Prl66AqR3kNpXyoJJ-n6r/view' },
  { id: 'repro-2', tema: 'Reprodução Humana', titulo: 'Congelamento de óvulos: quando considerar?', src: 'https://drive.google.com/file/d/1I_avoIn1fQLuu_Edv-Pg0lqqKsYUpk96/view' },
  { id: 'repro-3', tema: 'Reprodução Humana', titulo: 'Infertilidade: quando a causa está no homem?', src: 'https://drive.google.com/file/d/1pnvoGgMMn6ewaNf7hovKFedg1WpOcMHr/view' },
  { id: 'repro-4', tema: 'Reprodução Humana', titulo: 'O que acontece no processo da estimulação ovariana?', src: '' }, // ← link

  // Climatério
  { id: 'clim-1', tema: 'Climatério', titulo: 'Climatério: o que realmente acontece com o corpo', src: 'https://drive.google.com/file/d/14sx5lfU50NiNRfz1AGLqMFD4jntnx8x6/view' },
  { id: 'clim-2', tema: 'Climatério', titulo: 'DIU na menopausa: quando ele pode ser útil?', src: '' }, // ← link
  { id: 'clim-3', tema: 'Climatério', titulo: 'Obesidade e menopausa: qual a relação?', src: 'https://drive.google.com/file/d/1n6RWIqw04DGdyDg7gIfXcl0nNBHJ1Dy9/view' },

  // Saúde Íntima
  { id: 'int-1', tema: 'Saúde Íntima', titulo: 'Laser íntimo e Fraxx: para quem são indicados?', src: 'https://drive.google.com/file/d/17oL1LXYB7GGkaqJ7r-I0sU2nRiK8c0ew/view' },

  // Cirurgias
  { id: 'cir-1', tema: 'Cirurgias', titulo: 'Histeroscopia ou laparoscopia: qual a diferença?', src: 'https://drive.google.com/file/d/1JoPLm18j42r-MHE_XqnG0IectAGgB7LM/view' },
  { id: 'cir-2', tema: 'Cirurgias', titulo: 'Descobriu um cisto no ovário? Talvez você não precise operar', src: 'https://drive.google.com/file/d/1g_zVK2ebeKVqfYOMSDrK6fsnhvWxLXME/view' },
  { id: 'cir-3', tema: 'Cirurgias', titulo: '“Tenho medo da laparoscopia”: o que você precisa saber', src: 'https://drive.google.com/file/d/1PFI0hroJAS7PnNdJkf_g3Kk9kLaGEGNY/view' },
];


export const GUIAS = {
  reproducao: {
    titulo: 'Guia da Fertilidade',
    descricao: 'Tudo o que você precisa saber antes e durante a investigação da fertilidade: exames, reserva ovariana, tratamentos e próximos passos.',
    link: '', // ← link do PDF no Drive
  },
  climaterio: {
    titulo: 'Guia do Climatério',
    descricao: 'Sintomas, mudanças no corpo, opções de tratamento e cuidados para atravessar essa fase com qualidade de vida.',
    link: '', // em produção
  },
};

/* ------------------------------------------------------------------
   CIRURGIAS ÍNTIMAS — antes e depois (links das fotos no Drive)
   Só aparece quando "antes" e "depois" estiverem preenchidos.
------------------------------------------------------------------ */
export const ANTES_DEPOIS = [
  { id: 'ninfo-1', procedimento: 'Ninfoplastia', legenda: 'Correção de pequenos lábios · resultado após 90 dias', antes: '', depois: '' },
  { id: 'laser-1', procedimento: 'Laser vulvar externo', legenda: 'Clareamento e textura · após 3 sessões', antes: '', depois: '' },
];

/* ------------------------------------------------------------------
   CASOS REAIS — vídeos curtos e fotos (Drive)
   tipo: 'video' | 'foto'
   categoria: 'Histeroscopia' | 'Mioma' | 'Pólipo' | 'Endometriose' (pode criar outras)
------------------------------------------------------------------ */
export const CASOS = [
  { id: 'caso-1', tipo: 'video', categoria: 'Histeroscopia', titulo: 'Histeroscopia: retirada de pólipo endometrial', src: '' },
  { id: 'caso-2', tipo: 'foto', categoria: 'Mioma', titulo: 'Mioma submucoso visto na histeroscopia', src: '' },
  { id: 'caso-3', tipo: 'foto', categoria: 'Pólipo', titulo: 'Pólipo endometrial', src: '' },
  { id: 'caso-4', tipo: 'foto', categoria: 'Endometriose', titulo: 'Foco de endometriose peritoneal', src: '' },
];
