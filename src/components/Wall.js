// eslint-disable-next-line import/no-unresolved
import { serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js';
import { onNavigate } from '../main.js';
import {
  savePosts, onGetPosts, deletePost, getPost, updatePost,
} from '../lib/store.js';
import { auth } from '../lib/auth.js';

const div = document.createElement('div');
const containerBack = document.createElement('div');
const buttonBack = document.createElement('img');
const headerWall = document.createElement('img');
const containerContent = document.createElement('form');
const greeting = document.createElement('h2');
const questionPost = document.createElement('p');
const divNewPost = document.createElement('div');
const inputPost = document.createElement('textarea');
const buttonPost = document.createElement('img'); // const buttonPost = document.createElement('button');
const errorMessagePost = document.createElement('div'); // error messages
const containerNewsWall = document.createElement('div');
const newsWallTitle = document.createElement('h2');
const noNewsWall = document.createElement('p');

let editStatus = false;
let id = '';

buttonBack.src = './images/arrowBack.png'; //  buttonBack.textContent = '<';
headerWall.src = './images/gorro.png'; // headerWall.src = './images/logochef.jpg';
greeting.textContent = '¡Hola, bienvenido! 🖐';
questionPost.textContent = '¿Quieres compartir algo?';
inputPost.placeholder = 'Escribe aqui... ';
buttonPost.src = './images/send1.png';
errorMessagePost.textContent = ''; // Si hay error lo despliega aquí
newsWallTitle.textContent = 'Novedades';
noNewsWall.textContent = 'No hay novedades por el momento';

containerBack.className = 'containerBack';
containerContent.className = 'divCenterW';
containerContent.id = 'newPostForm';
containerNewsWall.className = 'divCenterW';
containerNewsWall.setAttribute('id', 'novedades');
buttonBack.className = 'buttonBack';
headerWall.className = 'headerWall';
greeting.className = 'titlePost';
questionPost.className = 'paragraphWall';
inputPost.className = 'inputPost';
buttonPost.className = 'buttonPost';
errorMessagePost.className = 'errorMessagesR';
newsWallTitle.className = 'titlePost';
noNewsWall.className = 'paragraphNoNewsWall';

export const Wall = () => {
  buttonBack.addEventListener('click', () => {
    onNavigate('/login');
  });
  headerWall.addEventListener('click', () => {
    onNavigate('/');
  });

  buttonPost.addEventListener('click', () => {
    if (inputPost.value === '') {
      alert('No has escrito aún');
    } else {
      const data = {
        text: inputPost.value,
        email: auth.currentUser.email,
        createdAt: serverTimestamp(),
        date: Date.now(),
        likes: [],
      };
      console.log(data);
      if (!editStatus) { // agregado para considerar el editado de post
        savePosts(data);
      } else {
        console.log('actualizando');
        updatePost(id, { text: inputPost.value });
        editStatus = false;
        buttonPost.src = './images/send1.png';
      }
      document.querySelector('.inputPost').value = '';
    }
  });

  // Mostra publicaciones en muro
  onGetPosts((callback) => {
    while (noNewsWall.firstChild) {
      noNewsWall.removeChild(noNewsWall.firstChild);
    }
    callback.forEach((doc) => {
      const post = doc.data();
      // Section para publicación
      const sectionAll = document.createElement('section');
      sectionAll.className = 'sectionAll';
      // Texto del usuario
      const textPosts = document.createElement('p');
      textPosts.className = 'textPosts';
      textPosts.textContent = post.text;
      // Correo de usuario activo
      const userTitle = document.createElement('h4');
      userTitle.className = 'usertitle';
      userTitle.textContent = post.email;
      //  icon section 1 ///////////////////////////
      const iconSection1 = document.createElement('div');
      iconSection1.className = 'iconSection';
      // Icono Editar
      const iconEdit = document.createElement('img');
      iconEdit.className = 'iconEdit';
      // Icono Borrar
      const iconDelete = document.createElement('img');
      iconDelete.className = 'iconDelete';
      //  icon section ///////////////////////////
      const iconSection = document.createElement('div');
      iconSection.className = 'iconSection';
      // icono gustar
      const iconLike = document.createElement('img');
      const counterLikes = document.createElement('p');
      iconLike.className = 'iconLike';
      counterLikes.className = 'counterLikes';
      iconLike.src = './images/iconLike.png';
      counterLikes.textContent = '0';

      // icono comentar
      const iconComment = document.createElement('img');
      const counterComment = document.createElement('p');
      iconComment.className = 'iconComment';
      counterComment.className = 'counterLikes';
      iconComment.src = './images/iconComments.png';
      counterComment.textContent = '0';

      iconSection1.append(iconDelete, iconEdit);
      iconSection.append(iconLike, counterLikes, iconComment, counterComment);
      sectionAll.append(iconSection1, userTitle, textPosts, iconSection);
      noNewsWall.append(sectionAll);
      // console.log(doc.id);

      // Solo mis publicaciones
      if (post.email === auth.currentUser.email) {
        iconDelete.src = './images/iconBin.png';
        iconEdit.src = './images/iconEdit.png';
        // Borrar publicaciones
        iconDelete.addEventListener('click', () => {
          deletePost(doc.id);
        });
        // Editar publicaciones
        iconEdit.addEventListener('click', async (e) => {
          const doc1 = await getPost(doc.id); // acceder al objeto que contiene identificadores
          const postEdit = doc1.data();
          console.log(postEdit);
          inputPost.value = postEdit.text;
          buttonPost.src = './images/iconUpdate.png';
          editStatus = true;
          id = doc.id;
        });
      }

      // // Likes
      //  iconLike.addEventListener('click', async (e) => {
      //    const doc2 = await getPost(doc.id); // acceder al objeto que contiene identificador especifico
      //    const likesEdit = doc2.data();
      //    console.log(likesEdit);
      // //   console.log(likesEdit.likes);
      // //   // likesEdit.likes: addingLike,
      // //   counterLikes.value = likesEdit + 1;
      // //   updatePost(id, { likes: counterLikes.value });
      });
    });
  });

  containerBack.append(buttonBack, headerWall);
  divNewPost.append(inputPost, buttonPost);
  containerContent.append(greeting, questionPost, divNewPost, errorMessagePost);
  containerNewsWall.append(newsWallTitle, noNewsWall);
  div.append(containerBack, containerContent, containerNewsWall);

  return div;
};
