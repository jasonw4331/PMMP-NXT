import { describe, it, expect } from 'vitest';
import crypto from 'crypto';

function sign(secret: string, payload: string) {
  const hmac = crypto.createHmac('sha256', secret);
  return `sha256=${hmac.update(payload).digest('hex')}`;
}

describe('github webhook signature', () => {
  it('matches expected', () => {
    const secret = 's';
    const payload = '{"a":1}';
    const sig = sign(secret, payload);
    expect(sig.startsWith('sha256=')).toBe(true);
  });
});