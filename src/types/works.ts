import type { WpPost } from './wp';

/**
 * Works 用メタ情報（ACF: FG_works）
 */
export interface WorksMeta {
  /** クライアント名 */
  client_name?: string;
  /** プロジェクト名 */
  project_name?: string;
  /** 期間 */
  period?: string;
  /** 担当領域 */
  role?: string;
  /** 使用技術 */
  tech_stack?: string[];
  /** 公開URL */
  project_url?: string;
  /** Repo URL */
  repo_url?: string;
}

/**
 * Work 型定義
 * WordPress の WpPost を拡張し、アプリケーション固有の型として定義
 */
export interface Work {
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
  /** Works メタ情報 */
  meta: WorksMeta;
}

/**
 * WordPress の WpPost を Work に変換する
 * @param wpPost - WordPress の投稿データ
 * @returns Work
 */
export function wpPostToWork(wpPost: WpPost): Work {
  const acf = (wpPost.acf || {}) as Record<string, unknown>;

  // tech_stack は repeater または text として保存される可能性がある
  let techStack: string[] = [];
  if (Array.isArray(acf.tech_stack)) {
    techStack = acf.tech_stack as string[];
  } else if (typeof acf.tech_stack === 'string') {
    // カンマ区切りの文字列の場合
    techStack = acf.tech_stack.split(',').map(s => s.trim()).filter(Boolean);
  }

  return {
    id: wpPost.id,
    slug: wpPost.slug,
    title: wpPost.title.rendered,
    excerpt: wpPost.excerpt.rendered,
    content: wpPost.content.rendered,
    date: wpPost.date,
    modified: wpPost.modified,
    link: wpPost.link,
    meta: {
      client_name: acf.client_name as string | undefined,
      project_name: acf.project_name as string | undefined,
      period: acf.period as string | undefined,
      role: acf.role as string | undefined,
      tech_stack: techStack.length > 0 ? techStack : undefined,
      project_url: acf.project_url as string | undefined,
      repo_url: acf.repo_url as string | undefined,
    },
  };
}

