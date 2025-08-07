import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import type {
  GenerateRegistrationOptionsOpts,
  VerifyRegistrationResponseOpts,
  GenerateAuthenticationOptionsOpts,
  VerifyAuthenticationResponseOpts,
} from '@simplewebauthn/server';
import { db } from '@/server/db';
import { users, authenticators } from '@/server/db/schema';
import { storeChallenge, getAndDeleteChallenge } from './challengeStore';

const rpID = process.env.RP_ID || new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').hostname;
const rpName = 'Freeshare';

export async function generateRegistrationOptionsForUser(userId: string | null) {
  const userHandle = userId ?? 'anonymous';
  const opts: GenerateRegistrationOptionsOpts = {
    rpID,
    rpName,
    userID: userHandle,
    userName: userHandle,
    timeout: 60000,
    attestationType: 'none',
  };
  const options = await generateRegistrationOptions(opts);
  await storeChallenge(`reg:${userHandle}`, options.challenge);
  return options;
}

export async function verifyRegistrationResponseForUser(attestationResponse: any) {
  const userHandle = attestationResponse?.response?.clientDataJSON ? 'anonymous' : 'anonymous';
  const expectedChallenge = await getAndDeleteChallenge(`reg:${userHandle}`);
  if (!expectedChallenge) throw new Error('Challenge expired');
  const verifyOpts: VerifyRegistrationResponseOpts = {
    expectedChallenge,
    expectedOrigin: attestationResponse?.origin,
    expectedRPID: rpID,
    response: attestationResponse,
    requireUserVerification: true,
  } as any;
  const verification = await verifyRegistrationResponse(verifyOpts);
  if (!verification.verified || !verification.registrationInfo) {
    throw new Error('Invalid attestation');
  }
  const { credentialPublicKey, credentialID, counter } = verification.registrationInfo;
  const anonEmail = `anon-${credentialID.toString('base64url')}@example.com`;
  const existing = await db.query.users.findFirst({ where: (t, { eq }) => eq(t.email, anonEmail) });
  const userId = existing?.id ?? `u_${Math.random().toString(36).slice(2)}`;
  if (!existing) {
    await db.insert(users).values({ id: userId, email: anonEmail });
  }
  await db.insert(authenticators).values({
    id: `a_${Math.random().toString(36).slice(2)}`,
    userId,
    credentialID: Buffer.from(credentialID).toString('base64url'),
    publicKey: Buffer.from(credentialPublicKey).toString('base64url'),
    counter,
  });
  return { success: true, userId };
}

export async function generateAuthenticationOptionsForUser() {
  const opts: GenerateAuthenticationOptionsOpts = {
    rpID,
    timeout: 60000,
    userVerification: 'preferred',
  };
  const options = await generateAuthenticationOptions(opts);
  await storeChallenge('auth:any', options.challenge);
  return options;
}

export async function verifyAuthenticationResponseForUser(assertionResponse: any) {
  const expectedChallenge = await getAndDeleteChallenge('auth:any');
  if (!expectedChallenge) throw new Error('Challenge expired');

  const credentialID = assertionResponse?.id;
  const authr = await db.query.authenticators.findFirst({ where: (t, { eq }) => eq(t.credentialID, credentialID) });
  if (!authr) throw new Error('Unknown authenticator');

  const verifyOpts: VerifyAuthenticationResponseOpts = {
    expectedChallenge,
    expectedOrigin: assertionResponse?.origin,
    expectedRPID: rpID,
    response: assertionResponse,
    authenticator: {
      counter: authr.counter,
      credentialID: Buffer.from(authr.credentialID, 'base64url'),
      credentialPublicKey: Buffer.from(authr.publicKey, 'base64url'),
      transports: authr.transports?.split(',') as any,
    },
    requireUserVerification: true,
  } as any;

  const verification = await verifyAuthenticationResponse(verifyOpts);
  if (!verification.verified || !verification.authenticationInfo) throw new Error('Invalid assertion');

  await db.update(authenticators).set({ counter: verification.authenticationInfo.newCounter }).where((t, { eq }) => eq(t.id, authr.id));

  return { success: true, userId: authr.userId };
}