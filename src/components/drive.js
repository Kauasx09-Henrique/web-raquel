
const idDrive = (url) => {
  if (!url || !url.includes('drive.google.com')) return null;
  const m = url.match(/\/d\/([\w-]+)/) || url.match(/[?&]id=([\w-]+)/);
  return m ? m[1] : null;
};

export function driveEmbed(url) {
  const id = idDrive(url);
  return id ? 'https://drive.google.com/file/d/' + id + '/preview' : null;
}

export function driveImagem(url, largura = 1600) {
  const id = idDrive(url);
  return id ? 'https://drive.google.com/thumbnail?id=' + id + '&sz=w' + largura : url;
}
