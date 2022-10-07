import { onNavigate } from '../main.js';
import {
  twitterUser, verify, verifyG, verifyGitHub,
} from '../lib/auth.js';

const containerContentL = document.createElement('div');
const div = document.createElement('div');
const containerBackL = document.createElement('div');
const headerLogin = document.createElement('p');
const buttonBackL = document.createElement('img');
const tittleLogin = document.createElement('h2');
const buttonGoogle = document.createElement('img');
const buttonTwitter = document.createElement('img');
const buttonGitHub = document.createElement('img');
const buttonLoginStart = document.createElement('button');
const paragraphLogin = document.createElement('p');
const inputMail = document.createElement('input');
const inputPasw = document.createElement('input');
const paragraphReg = document.createElement('p');
const buttonRegisterReturn = document.createElement('href');
const divtres = document.createElement('div');

buttonBackL.src = './images/arrowBack.png';
headerLogin.textContent = 'Bienvenida';
tittleLogin.textContent = 'Iniciar Sesión';
buttonGoogle.src = './images/web/1x/btn_google_signin_light_normal_web.png';
buttonTwitter.src = './images/web/iniciocontwitter.png';
buttonGitHub.src = './images/web/iniciogithub.png';
paragraphLogin.textContent = '__________________o__________________';
inputMail.placeholder = 'Correo electrónico';
inputPasw.placeholder = 'Contraseña';
buttonLoginStart.textContent = 'Iniciar sesión';
paragraphReg.textContent = '¿No tienes una cuenta?     ';
buttonRegisterReturn.textContent = 'Registrate';

containerContentL.className = 'divLogin';
containerContentL.className = 'divCenterL';
containerBackL.className = 'containerBackL';
buttonBackL.className = 'buttonBackL';
headerLogin.className = 'headerLogin';
tittleLogin.className = 'tittleLogin';
buttonGoogle.className = 'buttonGoogle';
buttonTwitter.className = 'buttonTwitter';
buttonGitHub.className = 'buttonGithub';
paragraphLogin.className = 'paragraphLogin';
inputMail.className = 'inputMail';
inputPasw.className = 'inputPasw';
buttonLoginStart.className = 'buttonLogin';
divtres.className = 'errorMessagesR';
paragraphReg.className = 'paragraphReg';
buttonRegisterReturn.className = 'buttonRegisterReturn';

inputPasw.type = 'password';

// eslint-disable-next-line consistent-return
export const Login = () => {
  buttonLoginStart.addEventListener('click', () => {
    verify(inputMail.value, inputPasw.value)
      .then((userCredential) => {
        // Signed in
        onNavigate('/wall');
        const user = userCredential.user;
        // console.log(user);
        // ...
      })
      .catch((error) => {
        if (inputMail.value === '' || inputPasw.value === '') {
          divtres.innerHTML = 'Llena los campos requeridos';
        } else if (error.code === 'auth/wrong-password') {
          divtres.innerHTML = 'Correo electrónico y/o contraseña incorrecta';
        } else if (error.code === 'auth/invalid-email') {
          divtres.innerHTML = 'Correo electrónico y/o contraseña incorrecta';
        }
      });
  });
  buttonBackL.addEventListener('click', () => {
    onNavigate('/');
  });
  buttonRegisterReturn.addEventListener('click', () => {
    onNavigate('/register');
  });
  buttonGoogle.addEventListener('click', () => {
    verifyG();
  });

  buttonTwitter.addEventListener('click', () => {
    twitterUser();
  });

  buttonGitHub.addEventListener('click', () => {
    verifyGitHub();
  });

  containerBackL.append(buttonBackL, headerLogin);
  paragraphReg.append(buttonRegisterReturn);
  containerContentL.append(tittleLogin, buttonGoogle, buttonTwitter, buttonGitHub, paragraphLogin, inputMail, inputPasw, divtres, buttonLoginStart, paragraphReg);
  div.append(containerBackL, containerContentL);
  return div;
  // }
};
