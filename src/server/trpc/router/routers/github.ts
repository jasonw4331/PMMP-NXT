import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import type { Context } from '@/server/trpc/context';

const t = initTRPC.context<Context>().create();

export const LinkGitHubInput = z.object({ code: z.string() });
export const LinkGitHubOutput = z.object({ success: z.boolean() });

export const githubRouter = t.router({
  linkAccount: t.procedure
    .input(LinkGitHubInput)
    .output(LinkGitHubOutput)
    .mutation(async ({ input }) => {
      // In this boilerplate, actual token exchange occurs via NextAuth GitHub provider
      return { success: true };
    }),
});