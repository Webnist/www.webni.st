import { ENV } from '@/lib/env';
import { getWpPosts, getWpPostBySlug } from '@/lib/wp';
import type { BlogPost, BlogCategory } from '@/types/blog';
import { wpPostToBlogPost } from '@/types/blog';

export const USE_DUMMY_POSTS =
  process.env.NODE_ENV !== 'production' &&
  process.env.NEXT_PUBLIC_DUMMY_POSTS === 'true';
export const DUMMY_TOTAL_POSTS = 100;

function buildDummyPosts(category: BlogCategory, count = 18): BlogPost[] {
  const now = new Date();
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(now);
    date.setDate(now.getDate() - index);
    return {
      id: 10_000 + index,
      slug: `${category}-dummy-${index + 1}`,
      title: `ダミー記事 ${index + 1} (${category})`,
      excerpt:
        'これはページ送り確認用のダミー記事です。デザインとレイアウト確認のために挿入しています。',
      content: 'ダミー本文です。',
      date: date.toISOString(),
      modified: date.toISOString(),
      link: `/${category}/${category}-dummy-${index + 1}`,
      category,
      categoryIds: [],
      tags: ['Next.js', 'React', 'Performance'],
      meta: {
        lead: 'ダミーのリード文です。',
        og_image: undefined,
        published_at: date.toISOString(),
      },
      articleMeta: {
        article_kind: category,
        show_toc: false,
        reading_time: 5,
      },
    };
  });
}

/**
 * すべてのブログ投稿を取得します。
 * @param perPage - 1ページあたりの件数（デフォルト: 10）
 * @param page - ページ番号（デフォルト: 1）
 * @returns ブログ投稿の配列
 */
export async function getAllPosts(perPage = 12, page = 1): Promise<BlogPost[]> {
  if (USE_DUMMY_POSTS) {
    return buildDummyPosts('blog', perPage);
  }
  const wpPosts = await getWpPosts({
    siteId: ENV.WP_SITE_ID,
    contentTypeId: ENV.WP_TYPE_BLOG_ID,
    perPage,
    page,
  });

  return wpPosts.map(wpPostToBlogPost);
}

/**
 * カテゴリでフィルタリングしたブログ投稿を取得します。
 * @param category - カテゴリ（blog / tips）
 * @param perPage - 1ページあたりの件数（デフォルト: 10）
 * @param page - ページ番号（デフォルト: 1）
 * @returns ブログ投稿の配列
 */
export async function getPostsByCategory(
  category: BlogCategory,
  perPage = 12,
  page = 1
): Promise<BlogPost[]> {
  if (USE_DUMMY_POSTS) {
    return buildDummyPosts(category, perPage);
  }
  // WordPress の content_type に応じて適切な contentTypeId を選択
  const contentTypeId =
    category === 'tips' ? ENV.WP_TYPE_TIPS_ID : ENV.WP_TYPE_BLOG_ID;

  const wpPosts = await getWpPosts({
    siteId: ENV.WP_SITE_ID,
    contentTypeId,
    perPage,
    page,
  });

  // ACF の article_kind でフィルタリング
  const posts = wpPosts.map(wpPostToBlogPost);
  return posts.filter((post) => {
    // article_kind が設定されている場合はそれで判定、なければ category で判定
    if (post.articleMeta?.article_kind) {
      return post.articleMeta.article_kind === category;
    }
    return post.category === category;
  });
}

/**
 * スラッグでブログ投稿を取得します。
 * @param slug - スラッグ
 * @returns ブログ投稿、見つからない場合は null
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const wpPost = await getWpPostBySlug(slug);
  if (!wpPost) {
    return null;
  }

  return wpPostToBlogPost(wpPost);
}
