import { initTRPC } from '@trpc/server';
import type { Context } from '@/server/trpc/context';
import {
  generateRegistrationOptionsForUser,
  verifyRegistrationResponseForUser,
  generateAuthenticationOptionsForUser,
  verifyAuthenticationResponseForUser,
} from '@/server/auth/passkeys/webauthn';
import {
  PublicKeyCredentialCreationOptionsSchema,
  PublicKeyCredentialRequestOptionsSchema,
  AttestationResponseSchema,
  AssertionResponseSchema,
} from '@/server/schemas/auth';

const t = initTRPC.context<Context>().create();

export const authRouter = t.router({
  registerPasskeyOptions: t.procedure
    .output(PublicKeyCredentialCreationOptionsSchema)
    .query(async ({ ctx }) => {
      const userId = ctx.session?.user?.id ?? null;
      const options = await generateRegistrationOptionsForUser(userId);
      return options;
    }),

  registerPasskeyVerify: t.procedure
    .input(AttestationResponseSchema)
    .output(z.object({ success: z.boolean(), userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const result = await verifyRegistrationResponseForUser(input);
      return result;
    }),

  authenticatePasskeyOptions: t.procedure
    .output(PublicKeyCredentialRequestOptionsSchema)
    .query(async () => {
      const options = await generateAuthenticationOptionsForUser();
      return options;
    }),

  authenticatePasskeyVerify: t.procedure
    .input(AssertionResponseSchema)
    .output(z.object({ success: z.boolean(), userId: z.string() }))
    .mutation(async ({ input }) => {
      const result = await verifyAuthenticationResponseForUser(input);
      return result;
    }),

  logout: t.procedure
    .output(z.object({ success: z.literal(true) }))
    .mutation(async () => ({ success: true })),
});