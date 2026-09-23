/* Tudo que muda de clínica para clínica fica aqui. */

// WhatsApp DA CLÍNICA (não o pessoal): 55 + DDD + número, só dígitos
export const WHATSAPP_CLINICA = '5561900000000';

// Cada botão manda uma mensagem com a origem, para a secretaria saber de onde veio
export function whatsapp(origem) {
  const texto = 'Olá! Gostaria de agendar uma consulta com a Dra. Raquel Guimarães. (site — ' + origem + ')';
  return 'https://wa.me/' + WHATSAPP_CLINICA + '?text=' + encodeURIComponent(texto);
}

export const CLINICA = {
  nome: 'Clínica Saúde da Mulher',
  endereco: 'SHLS 716, Bloco X, sala 000',
  bairro: 'Asa Sul — Brasília, DF',
  horario: 'Segunda a sexta, das 8h às 18h',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.034964091157!2d-47.932319!3d-15.802110300000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a2f4afdae2505%3A0xb440e28e2ed13c1e!2sCl%C3%ADnica%20Sa%C3%BAde%20da%20Mulher!5e0!3m2!1spt-BR!2sbr!4v1790090918562!5m2!1spt-BR!2sbr',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica+Sa%C3%BAde+da+Mulher+Bras%C3%ADlia',
  instagram: 'https://www.instagram.com/draraquelmguimaraes/',
  crm: 'CRM-DF 00000 · RQE 00000',
};

// Vídeo "Como é a minha consulta": link de incorporação do reel
// ex.: 'https://www.instagram.com/reel/CODIGO/embed'
export const REEL_CONSULTA = {
  capa: '/fotos/consulta.jpg',
  embed: '',
};
