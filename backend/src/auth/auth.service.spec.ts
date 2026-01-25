import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  // simple manual fake db
  const fakeDb = {
    query: async (sql: string, params: any[]) => {
      if (params[0] === 'test@test.com') {
        return {
          rows: [
            { id: 1, email: 'test@test.com', password: 'e10adc3949ba59abbe56e057f20f883e' }
          ]
        };
      }
      return { rows: [] };
    }
  };

  beforeEach(() => {
    service = new AuthService(fakeDb as any);
  });

  const cases = [
    { email: 'test@test.com', password: '123456', valid: true },
    { email: 'wrong@test.com', password: '123456', valid: false },
    { email: 'test@test.com', password: 'wrong', valid: false },
  ];

  cases.forEach(tc => {
    it(`login test for ${tc.email}`, async () => {
      try {
        const result = await service.login(tc.email, tc.password);
        expect(tc.valid).toBe(true);
        expect(result.accessToken).toBeDefined();
      } catch {
        expect(tc.valid).toBe(false);
      }
    });
  });
});
