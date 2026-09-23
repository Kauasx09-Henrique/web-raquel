export const EASE = [0.16, 1, 0.3, 1];

// entra quando a seção aparece na tela (uma vez só)
export const aoRolar = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.9, delay, ease: EASE },
});

// entra assim que a página carrega (hero)
export const aoCarregar = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});
