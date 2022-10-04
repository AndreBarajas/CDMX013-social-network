import { newUser } from '../src/lib/auth.js';

jest.mock('../src/lib/auth.js');

describe('register', () => {
  it('registrar con correo : algo@algo.algo y contraseña: abc123', () => {
    const email = '';
    const password = '';
    return newUser(email, password).then((user) => {
      expect(user.email === 'algo@algo.algo').toBe(true);
      expect(user.password === 'abc123').toBe(true);
    });
  });
});
