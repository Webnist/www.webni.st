// WordPress の rendered フィールドの型定義
export type WpRendered = { rendered: string; protected: boolean };

/** WordPress の投稿データの型定義 */
export interface WpPost {
    id: number;
    slug: string;
    status: string;
    link: string;

    date: string;
    modified: string;

    title: WpRendered;
    excerpt: WpRendered;
    content: WpRendered;

    categories: number[];
    tags: number[];

    acf?: Record<string, unknown>;
    _embedded?: Record<string, unknown>;
}
