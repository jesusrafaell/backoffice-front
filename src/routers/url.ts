// Private Routes
export const baseUrl = '/';
export const urlAdmision = `${baseUrl}Admision`;
export const urlFM = `${baseUrl}Solicitud`;
export const userAdmin = `${baseUrl}GestionUsuarios`;
export const urlAdministracion = `${baseUrl}Administracion`;
export const urlCobr = `${baseUrl}Cobranza`;
export const urlTerminales = `${baseUrl}Terminales`;

export const urlPrivate = [baseUrl, urlAdmision, urlFM, userAdmin, urlAdministracion, urlCobr, urlTerminales];

// Public Routes
export const urlLogin = `${baseUrl}auth/login`;
export const urlRegister = `${baseUrl}auth/register`;
