import { onNavigate } from '../main.js';
import { newUser } from '../lib/auth.js';

const div = document.createElement('div');
const containerBack = document.createElement('div');
const containerContent = document.createElement('div');
const headerRegister = document.createElement('p');
const title = document.createElement('h2');
const buttonRegisterL = document.createElement('button');
const inputUser = document.createElement('input');
const inputEmail = document.createElement('input');
const inputPass = document.createElement('input');
const errorMessageRegister = document.createElement('div'); // error messages
const buttonBack = document.createElement('img'); // document.createElement('button');
const termsLegend = document.createElement('p');
const cointenerQuestion = document.createElement('div');
const paragraph2 = document.createElement('p');
const hrefLogin = document.createElement('href');

buttonBack.src = './images/arrowBack.png'; //  buttonBack.textContent = '<';
headerRegister.textContent = 'Bienvenida';
title.textContent = 'Crea tu cuenta';
inputUser.placeholder = 'Usuario';
inputEmail.placeholder = 'Correo electrónico';
inputPass.placeholder = 'Contraseña';
buttonRegisterL.textContent = 'Registrarse';
errorMessageRegister.textContent = ''; // si hay error lo despliega aquí
termsLegend.textContent = 'Al dar click en Registrarse usted acepta nuestros Términos y Condiciones';
paragraph2.textContent = '¿Ya tienes cuenta?';
hrefLogin.textContent = 'Inicia sesión';

containerContent.className = 'divCenterR';
containerBack.className = 'containerBack';
buttonBack.className = 'buttonBack'; /* containerBack.className = 'containerBack'; */
headerRegister.className = 'headerRegister';
title.className = 'titleRegister';
inputUser.className = 'inputRegister';
inputEmail.className = 'inputRegister';
inputPass.className = 'inputRegister';
errorMessageRegister.className = 'errorMessagesR'; // errores
buttonRegisterL.className = 'buttonRegisterL';
termsLegend.className = 'termsLegend';
cointenerQuestion.className = 'containerQuestion';
paragraph2.className = 'paragraph2';
hrefLogin.className = 'hrefLogin';

inputPass.type = 'password';
const nameUser = inputUser;

export const Register = () => {
  buttonRegisterL.addEventListener('click', () => {
    if (inputUser.value === '' || inputEmail.value === '' || inputPass.value === '') {
      errorMessageRegister.innerHTML = 'Llena los campos requeridos';
    } else {
      newUser(inputEmail.value, inputPass.value).then((userCredential) => {
        // Signed in
        onNavigate('/login');
        const user = userCredential.user;
        // console.log(inputUser.value);
        // console.log(nameUser.value);
        // ...
      })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            errorMessageRegister.innerHTML = 'Ya existe una cuenta con la dirección de correo electrónico dada.'; // alert('The password is too weak.');
          } else if (error.code === 'auth/invalid-email') {
            errorMessageRegister.innerHTML = 'Dirección de correo electrónico no válida';
          } else if (error.code === 'auth/weak-password') {
            errorMessageRegister.innerHTML = 'Introduce al menos 6 caracteres de contraseña';
          }
        });
    }
  });

  buttonBack.addEventListener('click', () => {
    onNavigate('/');
  });
  hrefLogin.addEventListener('click', () => {
    onNavigate('/login');
  });

  containerBack.append(buttonBack, headerRegister);
  cointenerQuestion.append(paragraph2, hrefLogin);
  containerContent.append(title, inputUser, inputEmail, inputPass, errorMessageRegister, buttonRegisterL, termsLegend, cointenerQuestion);
  div.append(containerBack, containerContent);

  return div;
};
