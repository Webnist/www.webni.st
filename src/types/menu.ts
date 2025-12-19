/**
 * メニューアイテムの型定義
 */
export interface MenuItem {
  /** メニューアイテムID */
  id: number;
  /** タイトル */
  title: string;
  /** URL */
  url: string;
  /** 親メニューアイテムID（0の場合はトップレベル） */
  parent: number;
  /** 表示順序 */
  order: number;
  /** 子メニューアイテム */
  children: MenuItem[];
}

/**
 * WordPress メニューAPI のレスポンス型定義
 */
export interface MenuResponse {
  /** 成功フラグ */
  ok: boolean;
  /** サイトID */
  site: number;
  /** メニューエリア（header | footer） */
  area: 'header' | 'footer';
  /** メニュー情報（任意） */
  menu?: Record<string, unknown>;
  /** メニューアイテムの配列 */
  items: MenuItem[];
}

