import { ENV } from '@/lib/env'; // 環境変数
import type { WpPost } from '@/types/wp'; // WordPress の投稿データの型定義

// 投稿一覧を取得するための引数
type GetPostsArgs = {
    siteId: number;
    contentTypeId: number;
    perPage?: number;
    page?: number;
};

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
 *
 * @param url - WordPress API の URL
 * @param revalidateSec - 再検証時間
 * @returns WordPress API のレスポンス
 * @throws エラー
 */
async function wpFetchJson<T>(url: string, revalidateSec = 60): Promise<T> {
    if (process.env.NODE_ENV !== 'production') {
        console.log('[WP]', url);
    }
    const res = await fetch(url, {
        next: { revalidate: revalidateSec },
        headers: { accept: 'application/json' },
    });

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`WP fetch failed: ${res.status} ${res.statusText} url=${url} body=${text.slice(0, 200)}`);
    }
    return res.json() as Promise<T>;
}

/**
 * WordPress の投稿一覧を取得します。
 * @param args - 引数
 * @returns WordPress の投稿一覧
 * @throws エラー
 */
export async function getWpPosts(args: GetPostsArgs): Promise<WpPost[]> {
    const url = wpUrl('/wp-json/wp/v2/posts', {
        per_page: args.perPage ?? 10,
        page: args.page ?? 1,
        _embed: 1,
        orderby: 'date',
        order: 'desc',
        site: args.siteId,
        content_type: args.contentTypeId,
    });

    return wpFetchJson<WpPost[]>(url, 60);
}

/**
 * WordPress の投稿をスラッグで取得します。
 * @param slug - スラッグ
 * @returns WordPress の投稿
 * @throws エラー
 */
export async function getWpPostBySlug(slug: string): Promise<WpPost | null> {
    const url = wpUrl('/wp-json/wp/v2/posts', { slug, _embed: 1, site: ENV.WP_SITE_ID });
    const posts = await wpFetchJson<WpPost[]>(url, 60);
    return posts[0] ?? null;
}
