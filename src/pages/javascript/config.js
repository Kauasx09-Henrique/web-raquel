// WhatsApp DA CLÍNICA Saúde da Mulher (só números: 55 + DDD + número)
export const WHATSAPP_NUMERO = '5561900000000';

export const whatsapp = (origem = 'site') =>
    'https://wa.me/' + WHATSAPP_NUMERO + '?text=' +
    encodeURIComponent('Olá! Gostaria de agendar uma consulta com a Dra. Raquel. (' + origem + ')');

export const MAPS_EMBED =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.034964091157!2d-47.932319!3d-15.802110300000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a2f4afdae2505%3A0xb440e28e2ed13c1e!2sCl%C3%ADnica%20Sa%C3%BAde%20da%20Mulher!5e0!3m2!1spt-BR!2sbr!4v1790090918562!5m2!1spt-BR!2sbr';
