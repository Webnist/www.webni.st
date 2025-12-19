import { ENV } from '@/lib/env';
import { getWpPosts, getWpPostBySlug } from '@/lib/wp';
import type { Work } from '@/types/works';
import { wpPostToWork } from '@/types/works';

/**
 * すべての実績を取得します。
 * @param perPage - 1ページあたりの件数（デフォルト: 12）
 * @param page - ページ番号（デフォルト: 1）
 * @returns 実績の配列
 */
export async function getAllWorks(perPage = 12, page = 1): Promise<Work[]> {
  const wpPosts = await getWpPosts({
    siteId: ENV.WP_SITE_ID,
    contentTypeId: ENV.WP_TYPE_WORKS_ID,
    perPage,
    page,
  });

  return wpPosts.map(wpPostToWork);
}

/**
 * スラッグで実績を取得します。
 * @param slug - スラッグ
 * @returns 実績、見つからない場合は null
 */
export async function getWorkBySlug(slug: string): Promise<Work | null> {
  const wpPost = await getWpPostBySlug(slug);
  if (!wpPost) {
    return null;
  }

  return wpPostToWork(wpPost);
}

