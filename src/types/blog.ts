import type { WpPost } from './wp';

/**
 * カテゴリ（tips / notes）
 * 仕様書では tips と blog が定義されているが、notes は tips の別名として扱う
 */
export type BlogCategory = 'blog' | 'tips';

/**
 * タグ（文字列の配列として管理）
 */
export type Tag = string;

/**
 * 共通メタ情報（ACF: FG_common_post_meta）
 */
export interface CommonPostMeta {
  /** リード文 */
  lead?: string;
  /** OGP画像URL */
  og_image?: string;
  /** 公開日（任意） */
  published_at?: string;
}

/**
 * Blog / Tips 用メタ情報（ACF: FG_article_like）
 */
export interface ArticleMeta {
  /** 記事タイプ（blog / tips） */
  article_kind?: 'blog' | 'tips';
  /** 目次表示フラグ */
  show_toc?: boolean;
  /** 読了時間（分） */
  reading_time?: number;
}

/**
 * BlogPost 型定義
 * WordPress の WpPost を拡張し、アプリケーション固有の型として定義
 */
export interface BlogPost {
  /** WordPress の投稿ID */
  id: number;
  /** スラッグ */
  slug: string;
  /** タイトル（HTML） */
  title: string;
  /** 抜粋（HTML） */
  excerpt: string;
  /** 本文（HTML） */
  content: string;
  /** 公開日 */
  date: string;
  /** 更新日 */
  modified: string;
  /** リンクURL */
  link: string;
  /** カテゴリ */
  category: BlogCategory;
  /** カテゴリID */
  categoryIds: number[];
  /** タグ */
  tags: Tag[];
  /** 共通メタ情報 */
  meta: CommonPostMeta;
  /** 記事メタ情報 */
  articleMeta?: ArticleMeta;
}

/**
 * WordPress の WpPost を BlogPost に変換する
 * @param wpPost - WordPress の投稿データ
 * @returns BlogPost
 */
export function wpPostToBlogPost(wpPost: WpPost): BlogPost {
  const acf = (wpPost.acf || {}) as Record<string, unknown>;
  const embeddedTerms =
    (wpPost._embedded?.['wp:term'] as Array<
      Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy?: string;
      }>
    > | null) ?? [];
  const tags = embeddedTerms
    .flat()
    .filter((term) => term.taxonomy === 'post_tag')
    .map((term) => term.name);

  return {
    id: wpPost.id,
    slug: wpPost.slug,
    title: wpPost.title.rendered,
    excerpt: wpPost.excerpt.rendered,
    content: wpPost.content.rendered,
    date: wpPost.date,
    modified: wpPost.modified,
    link: wpPost.link,
    category: (acf.article_kind as BlogCategory) || 'blog',
    categoryIds: wpPost.categories ?? [],
    tags,
    meta: {
      lead: acf.lead as string | undefined,
      og_image: acf.og_image as string | undefined,
      published_at: acf.published_at as string | undefined,
    },
    articleMeta: {
      article_kind: acf.article_kind as 'blog' | 'tips' | undefined,
      show_toc: acf.show_toc as boolean | undefined,
      reading_time: acf.reading_time as number | undefined,
    },
  };
}
