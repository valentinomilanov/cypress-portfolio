import { test, expect } from '@playwright/test';
import { apiUrl, users } from '../fixtures/testData.js';
import { logEvent } from '../../src/utils/logging.js';

test.describe('API - Users', () => {
  test('TC-15: GET user profile with valid token returns 200', async ({ request }) => {
    const loginResponse = await request.post(`${apiUrl}/users/login`, {
      data: {
        email: users.validUser.email,
        password: users.validUser.password
      }
    });
    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json() as { access_token: string };
    expect(loginBody.access_token).toBeTruthy();

    const response = await request.get(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${loginBody.access_token}`
      }
    });
    expect(response.status()).toBe(200);
    const body = await response.json() as Record<string, unknown>;
    expect(body).toHaveProperty('first_name');
    expect(body).toHaveProperty('last_name');
    expect(body.email).toBe(users.validUser.email);
    expect(body).toHaveProperty('address');
    expect(body).toHaveProperty('id');
    logEvent(test.info(), 'INFO', `Profile retrieved for: ${String(body.first_name)} ${String(body.last_name)}`);
    logEvent(test.info(), 'VERIFICATION', 'Authenticated profile contains the expected user fields');
  });
});
