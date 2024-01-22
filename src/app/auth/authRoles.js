export const authRoles = {
  sa: ['ROLE_MAKER'], // Only Super Admin has access
  admin: ['ROLE_MAKER', 'ADMIN'], // Only SA & Admin has access
  editor: ['ROLE_MAKER', 'ADMIN', 'EDITOR'], // Only SA & Admin & Editor has access
  guest: ['ROLE_MAKER', 'ADMIN', 'EDITOR', 'GUEST'] // Everyone has access
};
