import { Welcome } from './components/Welcome.js';
import { Login } from './components/Login.js';
import { Register } from './components/Register.js';
import { Wall } from './components/Wall.js';

const root = document.getElementById('root');

const routes = {
  '/': Welcome,
  '/login': Login,
  '/register': Register,
  '/wall': Wall,
};

export const onNavigate = (pathname) => {
  console.log(window.location.pathname);
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  root.removeChild(root.firstChild);
  root.appendChild(routes[pathname]());
};

console.log(window.location.pathname);
const component = routes[window.location.pathname];


window.onpopstate = () => {
  root.removeChild(root.firstChild);
  root.append(component());
};

root.appendChild(component());
