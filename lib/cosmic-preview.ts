import { createBucketClient } from '@cosmicjs/sdk';
import { cookies, headers } from 'next/headers';

const bucketConfig = {
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
};

const cosmic = createBucketClient(bucketConfig);

interface GetCosmicResult {
  cosmic: ReturnType<typeof createBucketClient>;
  previewToken: string | null;
}

export async function getCosmic(): Promise<GetCosmicResult> {
  let previewToken: string | null = null;

  try {
    // The middleware forwards the token as a request header on the very first
    // framed request (the response cookie is not readable yet at that point),
    // then the cookie keeps preview alive for subsequent navigations.
    const headerList = await headers();
    const headerToken = headerList.get('x-cosmic-preview-token');

    const cookieStore = await cookies();
    const cookieToken = cookieStore.get('cosmic_preview')?.value;

    previewToken = headerToken || cookieToken || null;
  } catch {
    previewToken = null;
  }

  if (previewToken) {
    const previewClient = createBucketClient({
      ...bucketConfig,
      previewToken,
    });

    return { cosmic: previewClient, previewToken };
  }

  return { cosmic, previewToken: null };
}

export { cosmic };
