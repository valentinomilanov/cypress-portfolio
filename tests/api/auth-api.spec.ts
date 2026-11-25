import { test, expect } from '@playwright/test';
import { apiUrl, users } from '../fixtures/testData.js';
import { logEvent } from '../../src/utils/logging.js';

test.describe('API - Authentication', () => {
  test('TC-10: POST login with valid credentials returns token', async ({ request }) => {
    logEvent(test.info(), 'INFO', `Authenticating user: ${users.validUser.email}`);
    const response = await request.post(`${apiUrl}/users/login`, {
      data: {
        email: users.validUser.email,
        password: users.validUser.password
      }
    });
    expect(response.status()).toBe(200);

    const body = await response.json() as {
      access_token: string;
      token_type: string;
      expires_in: number;
    };
    expect(body).toHaveProperty('access_token');
    expect(body.token_type).toBe('bearer');
    expect(body).toHaveProperty('expires_in');
    expect(typeof body.access_token).toBe('string');
    expect(body.access_token.length).toBeGreaterThan(0);
    logEvent(test.info(), 'VERIFICATION', 'Valid login returned a non-empty bearer access token');
  });

  test('TC-11: POST login with invalid credentials returns 401', async ({ request }) => {
    const response = await request.post(`${apiUrl}/users/login`, {
      data: {
        email: users.invalidUser.email,
        password: users.invalidUser.password
      },
      failOnStatusCode: false
    });
    expect(response.status()).toBe(401);
    logEvent(test.info(), 'VERIFICATION', 'Invalid login returns HTTP 401');
  });
});
