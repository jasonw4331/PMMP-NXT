import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { db } from '@/server/db';
import { productVersions } from '@/server/db/schema';

export const config = {
  api: {
    bodyParser: false,
  },
};

function buffer(readable: any) {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: any[] = [];
    readable.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)));
    readable.on('end', () => resolve(Buffer.concat(chunks)));
    readable.on('error', reject);
  });
}

function verifySignature(secret: string, payload: Buffer, signature: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = `sha256=${hmac.update(payload).digest('hex')}`;
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET ?? '';
  const sig = req.headers['x-hub-signature-256'];
  const raw = await buffer(req);
  if (!sig || Array.isArray(sig) || !verifySignature(secret, raw, sig)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  const body = JSON.parse(raw.toString('utf8'));
  if (req.headers['x-github-event'] === 'release' && body.action === 'published') {
    const repoFull = body.repository.full_name as string;
    const tag = body.release.tag_name as string;
    const asset = body.release.assets?.[0];
    const product = await db.query.products.findFirst({ where: (t, { eq }) => eq(t.githubRepo, repoFull) });
    if (product) {
      const exists = await db.query.productVersions.findFirst({
        where: (t, { and, eq }) => and(eq(t.productId, product.id), eq(t.versionTag, tag)),
      });
      if (!exists) {
        await db.insert(productVersions).values({
          id: `v_${Math.random().toString(36).slice(2)}`,
          productId: product.id,
          versionTag: tag,
          changelog: body.release.body ?? '',
          fileUrl: asset?.browser_download_url ?? '',
          fileSizeBytes: asset?.size ?? 0,
          isReleased: true,
          releaseDate: body.release.published_at ? new Date(body.release.published_at) : new Date(),
          source: 'GITHUB',
        });
      }
    }
  }
  return res.json({ ok: true });
}