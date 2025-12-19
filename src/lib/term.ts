import { ENV } from '@/lib/env';

/**
 * WordPress API の URL を生成します。
 */
function wpUrl(path: string, params?: Record<string, string | number | boolean | undefined>) {
  const url = new URL(path, ENV.WP_BASE_URL);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v === undefined) continue;
      url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

/**
 * WordPress API から JSON を取得します。
 */
async function wpFetchJson<T>(url: string, revalidateSec = 60): Promise<T> {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[WP Term]', url);
  }
  const res = await fetch(url, {
    next: { revalidate: revalidateSec },
    headers: { accept: 'application/json' },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(
      `WP term fetch failed: ${res.status} ${res.statusText} url=${url} body=${text.slice(0, 200)}`
    );
  }
  return res.json() as Promise<T>;
}

/**
 * Term情報の型定義
 */
export interface TermCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface TermInfo {
  id: number;
  name: string;
  slug: string;
  description?: string;
  categories?: TermCategory[];
}

/**
 * WordPress のカスタム REST API から term の説明を取得します。
 * @param contentTypeId - コンテンツタイプID（WP_TYPE_TIPS_ID または WP_TYPE_BLOG_ID）
 * @returns Term情報、見つからない場合は null
 */
export async function getTermByContentType(
  contentTypeId: number
): Promise<TermInfo | null> {
  try {
    // カスタムRESTエンドポイント: /wp-json/webnist/v1/term?site={siteId}&content_type={contentTypeId}
    const url = wpUrl('/wp-json/webnist/v1/term', {
      site: ENV.WP_SITE_ID,
      content_type: contentTypeId,
    });

    const term = await wpFetchJson<TermInfo>(url, 300); // 5分キャッシュ
    return term;
  } catch (error) {
    console.error('Failed to fetch term:', error);
    return null;
  }
}
