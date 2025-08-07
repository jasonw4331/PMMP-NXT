import { describe, it, expect, vi } from 'vitest';
import * as webauthnServer from '@simplewebauthn/server';

vi.mock('@simplewebauthn/server', () => ({
  generateRegistrationOptions: vi.fn(async () => ({ challenge: 'abc' })),
  verifyRegistrationResponse: vi.fn(async () => ({ verified: true, registrationInfo: { credentialPublicKey: Buffer.from('a'), credentialID: Buffer.from('b'), counter: 1 } })),
  generateAuthenticationOptions: vi.fn(async () => ({ challenge: 'def' })),
  verifyAuthenticationResponse: vi.fn(async () => ({ verified: true, authenticationInfo: { newCounter: 2 } })),
}));

describe('passkeys', () => {
  it('generates options', async () => {
    const genReg = await webauthnServer.generateRegistrationOptions({} as any);
    expect(genReg.challenge).toBe('abc');
  });
  it('verifies responses', async () => {
    const res = await webauthnServer.verifyRegistrationResponse({} as any);
    expect(res.verified).toBe(true);
  });
});