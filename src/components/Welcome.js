import { onNavigate } from '../main.js';

export const Welcome = () => {
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const title2 = document.createElement('h2');
  const title3 = document.createElement('h2');
  const buttonLogin = document.createElement('button');
  const paragraphWelcome = document.createElement('p');
  const buttonRegister = document.createElement('href');

  buttonLogin.textContent = 'Inicia Sesión';
  paragraphWelcome.textContent = '¿No tienes cuenta?';
  buttonRegister.textContent = 'Registrate';
  title.textContent = 'Rápido.';
  title2.textContent = ' Delicioso.';
  title3.textContent = '  Bueno';

  div.className = 'divWelcome';
  title.className = 'titleWelcome';
  title2.className = 'titleWelcome2';
  title3.className = 'titleWelcome3';
  buttonLogin.className = 'buttonLogin';
  paragraphWelcome.className = 'paragraphWelcome';
  buttonRegister.className = 'buttonRegister';

  buttonLogin.addEventListener('click', () => {
    onNavigate('/login');
  });

  buttonRegister.addEventListener('click', () => {
    onNavigate('/register');
  });

  div.append(title, title2, title3, buttonLogin, paragraphWelcome, buttonRegister);

  return div;
};
