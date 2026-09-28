/* Aceita qualquer link do Google Drive e devolve o link de incorporação (/preview).
   Ex.: https://drive.google.com/file/d/ABC123/view?usp=sharing → https://drive.google.com/file/d/ABC123/preview
   O arquivo precisa estar compartilhado como "Qualquer pessoa com o link". */
const idDrive = (url) => {
  if (!url || !url.includes('drive.google.com')) return null;
  const m = url.match(/\/d\/([\w-]+)/) || url.match(/[?&]id=([\w-]+)/);
  return m ? m[1] : null;
};

export function driveEmbed(url) {
  const id = idDrive(url);
  return id ? 'https://drive.google.com/file/d/' + id + '/preview' : null;
}

// Foto do Drive como <img>. Links que não são do Drive voltam como estão.
export function driveImagem(url, largura = 1600) {
  const id = idDrive(url);
  return id ? 'https://drive.google.com/thumbnail?id=' + id + '&sz=w' + largura : url;
}
