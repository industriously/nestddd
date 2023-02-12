import { HttpExceptionMessage, HttpExceptionFactory } from '@COMMON/exception';

describe('HttpExceptionFactory Unit Test', () => {
  describe('BadRequest', () => {
    it('default message', () => {
      const received = HttpExceptionFactory('BadRequest');
      expect(received.message).toBe(HttpExceptionMessage.BR);
    });
    it('cutomized message', () => {
      const received = HttpExceptionFactory('BadRequest', 'hello');
      expect(received.message).toBe('hello');
    });
  });
  describe('UnAuthorized', () => {
    it('default message', () => {
      const received = HttpExceptionFactory('UnAuthorized');
      expect(received.message).toBe(HttpExceptionMessage.UAE);
    });
    it('cutomized message', () => {
      const received = HttpExceptionFactory('UnAuthorized', 'hello');
      expect(received.message).toBe('hello');
    });
  });
  describe('Forbidden', () => {
    it('default message', () => {
      const received = HttpExceptionFactory('Forbidden');
      expect(received.message).toBe(HttpExceptionMessage.FBD);
    });
    it('cutomized message', () => {
      const received = HttpExceptionFactory('Forbidden', 'hello');
      expect(received.message).toBe('hello');
    });
  });
  describe('NotFound', () => {
    it('default message', () => {
      const received = HttpExceptionFactory('NotFound');
      expect(received.message).toBe(HttpExceptionMessage.NF);
    });
    it('cutomized message', () => {
      const received = HttpExceptionFactory('NotFound', 'hello');
      expect(received.message).toBe('hello');
    });
  });
  describe('ISE', () => {
    it('default message', () => {
      const received = HttpExceptionFactory('ISE');
      expect(received.message).toBe(HttpExceptionMessage.ISE);
    });
    it('cutomized message', () => {
      const received = HttpExceptionFactory('ISE', 'hello');
      expect(received.message).toBe('hello');
    });
  });
});
