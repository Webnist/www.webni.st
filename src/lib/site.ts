import { ENV } from '@/lib/env';
import type { SiteSettingsResponse } from '@/types/site';

/**
 * WordPress API の URL を生成します。
 * @param path - パス
 * @param params - パラメータ
 * @returns WordPress API の URL
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
 * @param url - WordPress API の URL
 * @param revalidateSec - 再検証時間（秒）
 * @returns JSON レスポンス
 * @throws エラー
 */
async function wpFetchJson<T>(url: string, revalidateSec = 60): Promise<T> {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[WP Site]', url);
  }
  const res = await fetch(url, {
    next: { revalidate: revalidateSec },
    headers: { accept: 'application/json' },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(
      `WP site fetch failed: ${res.status} ${res.statusText} url=${url} body=${text.slice(0, 200)}`
    );
  }
  return res.json() as Promise<T>;
}

/**
 * WordPress のカスタム REST API からサイト設定を取得します。
 * @param siteId - サイトID
 * @returns サイト設定レスポンス
 * @throws エラー
 */
export async function getSiteSettings(siteId: number): Promise<SiteSettingsResponse> {
  // カスタムRESTエンドポイント: /wp-json/webnist/v1/site?site={siteId}
  const url = wpUrl('/wp-json/webnist/v1/site', {
    site: siteId,
  });

  return wpFetchJson<SiteSettingsResponse>(url, 300); // 5分キャッシュ
}

