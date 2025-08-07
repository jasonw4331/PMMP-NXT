import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { prisma } from '@/server/utils/prisma';

function verifySignature(secret: string, payload: string, signature: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = `sha256=${hmac.update(payload).digest('hex')}`;
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET ?? '';
  const sig = req.headers['x-hub-signature-256'];
  const rawBody = JSON.stringify(req.body);
  if (!sig || Array.isArray(sig) || !verifySignature(secret, rawBody, sig)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  if (req.headers['x-github-event'] === 'release' && req.body.action === 'published') {
    const repoFull = req.body.repository.full_name as string; // owner/repo
    const tag = req.body.release.tag_name as string;
    const asset = req.body.release.assets?.[0];
    const product = await prisma.product.findFirst({ where: { githubRepo: repoFull } });
    if (product) {
      await prisma.productVersion.upsert({
        where: { productId_versionTag: { productId: product.id, versionTag: tag } },
        update: {},
        create: {
          productId: product.id,
          versionTag: tag,
          changelog: req.body.release.body ?? '',
          fileUrl: asset?.browser_download_url ?? '',
          fileSizeBytes: asset?.size ?? 0,
          isReleased: true,
          releaseDate: req.body.release.published_at ? new Date(req.body.release.published_at) : new Date(),
          source: 'GITHUB',
        },
      });
    }
  }
  return res.json({ ok: true });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};