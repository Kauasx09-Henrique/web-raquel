/* Aceita qualquer link do Google Drive e devolve o link de incorporação (/preview).
   Ex.: https://drive.google.com/file/d/ABC123/view?usp=sharing → https://drive.google.com/file/d/ABC123/preview
   O arquivo precisa estar compartilhado como "Qualquer pessoa com o link". */
export function driveEmbed(url) {
  if (!url || !url.includes('drive.google.com')) return null;
  const m = url.match(/\/d\/([\w-]+)/) || url.match(/[?&]id=([\w-]+)/);
  return m ? 'https://drive.google.com/file/d/' + m[1] + '/preview' : null;
}
