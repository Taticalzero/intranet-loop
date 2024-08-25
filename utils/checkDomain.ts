export function checkDomain(domain: string) {
  const dominio = domain.split('@')[1]

  if (dominio !== 'loopfibra.com') {
    return 'Usuário'
  } else {
    return 'Administrador'
  }
}
