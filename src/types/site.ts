/**
 * 画像オブジェクトの型定義
 */
export interface ImageObject {
  /** 画像URL */
  url: string;
  /** 幅 */
  width?: number;
  /** 高さ */
  height?: number;
  /** 代替テキスト */
  alt?: string;
}

/**
 * SNS設定の型定義
 */
export interface SnsSettings {
  /** X(Twitter) URL */
  x?: string;
  /** GitHub URL */
  github?: string;
  /** その他SNS */
  other?: Array<{ name: string; url: string }>;
}

/**
 * サイト設定の型定義
 */
export interface SiteSettings {
  /** サイト名（表示用） */
  display_name?: string;
  /** ドメイン */
  domain?: string;
  /** キャッチコピー */
  tagline?: string;
  /** 説明文（meta用） */
  description?: string;
  /** メインカラー */
  color_primary?: string;
  /** アクセントカラー */
  color_accent?: string;
  /** ロゴ画像 */
  logo?: ImageObject;
  /** 既定OGP画像 */
  default_og?: ImageObject;
  /** SNS設定 */
  sns?: SnsSettings;
  /** 有効な content_type */
  enabled_types?: string[];
}

/**
 * WordPress サイト設定API のレスポンス型定義
 */
export interface SiteSettingsResponse {
  /** 成功フラグ */
  ok: boolean;
  /** サイトID */
  site: number;
  /** サイトスラッグ */
  site_slug?: string;
  /** サイト設定 */
  settings: SiteSettings;
}

