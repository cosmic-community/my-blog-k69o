import { createBucketClient } from '@cosmicjs/sdk';
import { cookies, headers } from 'next/headers';

const bucketConfig = {
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
};

const cosmic = createBucketClient(bucketConfig);

interface GetCosmicResult {
  cosmic: ReturnType<typeof createBucketClient>;
  previewToken: string | null;
}

export async function getCosmic(): Promise<GetCosmicResult> {
  let previewToken: string | null = null;

  try {
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get('cosmic_preview_token')?.value;

    const headerList = await headers();
    const headerToken = headerList.get('x-cosmic-preview-token');

    previewToken = cookieToken || headerToken || null;
  } catch {
    previewToken = null;
  }

  if (previewToken) {
    const previewClient = createBucketClient({
      ...bucketConfig,
      apiEnvironment: 'staging',
    });

    return { cosmic: previewClient, previewToken };
  }

  return { cosmic, previewToken: null };
}

export { cosmic };