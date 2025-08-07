import { z } from 'zod';

export const LinkGitHubInput = z.object({ code: z.string() });
export const LinkGitHubOutput = z.object({ success: z.boolean() });