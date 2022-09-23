/* eslint-disable import/no-unresolved */
import { serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js';
import { onNavigate } from '../main.js';
import { savePosts, onGetPosts } from '../lib/store.js';

export const Wall = () => {
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

  buttonBack.src = './images/arrowBack.png'; //  buttonBack.textContent = '<';
  headerWall.src = './images/gorro.png'; // headerWall.src = './images/logochef.jpg';
  greeting.textContent = 'Hola, Usuari@ 🖐🙋‍♀️';
  questionPost.textContent = '¿Quieres compartir algo?';
  inputPost.placeholder = 'Escribe aqui... ';
  // buttonPost.textContent = 'Publicar';
  buttonPost.src = './images/send1.png';
  errorMessagePost.textContent = ''; // si hay error lo despliega aquí
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

  buttonBack.addEventListener('click', () => {
    onNavigate('/login');
  });
  headerWall.addEventListener('click', () => {
    onNavigate('/');
  });

  // const generatorHTMLnews = (allPostsReturned) => {
  //   const oneNew = `<section id = 'novedad'>
  //               <p> ${allPostsReturned.text}</p>
  //               </section>`;
  //   return oneNew;
  // };

  buttonPost.addEventListener('click', () => {
    const data = {
      text: inputPost.value,
      createdAt: serverTimestamp(),
    }; // console.log(data);
    savePosts(data);
    // generatorHTMLnews(data);
  });

  // let allPosts = [];
  // let showingNews = [];
  onGetPosts((callback) => {
    // allPosts = [];
    callback.forEach((doc) => {
      const post = doc.data();
      // allPosts.push(post.text);
      // showingNews += generatorHTMLnews(post);
      const sectionAll = document.createElement('section');
      sectionAll.className = 'sectionAll';
      const textPosts = document.createElement('p');
      textPosts.textContent = post.text;
      sectionAll.append(textPosts);
      noNewsWall.append(sectionAll);
    });
  });

  // generatorHTML += oneNEw;
  containerBack.append(buttonBack, headerWall);
  divNewPost.append(inputPost, buttonPost);
  containerContent.append(greeting, questionPost, divNewPost, errorMessagePost);
  containerNewsWall.append(newsWallTitle, noNewsWall);
  div.append(containerBack, containerContent, containerNewsWall);

  return div;
};
