import type { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Design System/Introduction',
  parameters: {
    docs: {
      page: () => (
        <div className="prose prose-invert max-w-none">
          <h1>Webnist Design System</h1>
          <p>
            Webnistデザインシステムへようこそ。このデザインシステムは、Webnistプロジェクト全体で一貫したUIコンポーネントとスタイルを提供します。
          </p>

          <h2>概要</h2>
          <p>
            このデザインシステムは、<strong>Liquid Glass</strong>
            スタイルを特徴とするモダンなUIコンポーネント集です。透明感のあるガラス効果と、洗練されたダークテーマを組み合わせています。
          </p>

          <h2>デザイントークン</h2>

          <h3>カラーパレット</h3>

          <h4>Primary Colors</h4>
          <ul>
            <li>
              <strong>Primary</strong>: <code>#fb923c</code> (orange-400) - メインアクションカラー
            </li>
            <li>
              <strong>Primary Hover</strong>: <code>#fdba74</code> (orange-300) - ホバー状態
            </li>
            <li>
              <strong>Primary Dark</strong>: <code>#ea580c</code> (orange-600) - アクティブ状態
            </li>
          </ul>

          <h4>Accent Colors</h4>
          <ul>
            <li>
              <strong>Accent</strong>: <code>#3b82f6</code> (blue-500) - セカンダリアクションカラー
            </li>
            <li>
              <strong>Accent Hover</strong>: <code>#60a5fa</code> (blue-400) - ホバー状態
            </li>
          </ul>

          <h4>Neutral Colors</h4>
          <p>グレースケールのニュートラルカラー（50-950）を提供しています。</p>

          <h4>Slate Colors</h4>
          <p>ダークテーマ用に最適化されたグレースケール（50-950）を提供しています。</p>

          <h3>Liquid Glass Effects</h3>
          <p>ガラス効果を実現するためのユーティリティクラス：</p>
          <ul>
            <li>
              <strong>.glass</strong>: 標準のガラス効果（backdrop-blur: 16px）
            </li>
            <li>
              <strong>.glass-light</strong>: 軽いガラス効果（backdrop-blur: 12px）
            </li>
            <li>
              <strong>.glass-strong</strong>: 強いガラス効果（backdrop-blur: 20px）
            </li>
          </ul>

          <h3>タイポグラフィー</h3>
          <ul>
            <li>
              <strong>フォント</strong>: Noto Sans JP（日本語対応）
            </li>
            <li>
              <strong>フォールバック</strong>: システムフォント
            </li>
          </ul>

          <h3>スペーシング</h3>
          <p>統一されたスペーシングスケール：</p>
          <ul>
            <li>
              <code>xs</code>: 0.25rem
            </li>
            <li>
              <code>sm</code>: 0.5rem
            </li>
            <li>
              <code>md</code>: 1rem
            </li>
            <li>
              <code>lg</code>: 1.5rem
            </li>
            <li>
              <code>xl</code>: 2rem
            </li>
            <li>
              <code>2xl</code>: 3rem
            </li>
            <li>
              <code>3xl</code>: 4rem
            </li>
          </ul>

          <h3>ボーダーラディウス</h3>
          <ul>
            <li>
              <code>sm</code>: 0.375rem
            </li>
            <li>
              <code>md</code>: 0.5rem
            </li>
            <li>
              <code>lg</code>: 0.75rem
            </li>
            <li>
              <code>xl</code>: 1rem
            </li>
            <li>
              <code>2xl</code>: 1.5rem
            </li>
            <li>
              <code>full</code>: 9999px
            </li>
          </ul>

          <h2>コンポーネント</h2>
          <p>このデザインシステムには以下のコンポーネントが含まれています：</p>
          <ul>
            <li>
              <strong>Button</strong>: 様々なバリアントとサイズのボタンコンポーネント
            </li>
            <li>
              <strong>Card</strong>: コンテンツを表示するためのカードコンポーネント
            </li>
            <li>
              <strong>Tag</strong>: ラベルやバッジとして使用するタグコンポーネント
            </li>
            <li>
              <strong>Section</strong>: ページセクション用のコンテナコンポーネント
            </li>
            <li>
              <strong>Container</strong>: コンテンツの幅を制御するコンテナコンポーネント
            </li>
          </ul>

          <h2>使用方法</h2>
          <p>各コンポーネントは <code>@/components/ui</code> からインポートできます：</p>
          <pre className="bg-slate-800 p-4 rounded-lg">
            <code>{`import { Button, Card, Tag, Section, Container } from '@/components/ui';`}</code>
          </pre>
          <p>詳細な使用方法は、各コンポーネントのストーリーを参照してください。</p>

          <h2>デザイン原則</h2>
          <ol>
            <li>
              <strong>一貫性</strong>: すべてのコンポーネントは統一されたデザイントークンを使用
            </li>
            <li>
              <strong>アクセシビリティ</strong>: WCAG 2.1 AA準拠を目指す
            </li>
            <li>
              <strong>パフォーマンス</strong>: 軽量で高速なレンダリング
            </li>
            <li>
              <strong>拡張性</strong>: カスタマイズ可能なプロップスとバリアント
            </li>
          </ol>

          <h2>参考資料</h2>
          <p>詳細なドキュメントは <code>docs/design-system.md</code> を参照してください。</p>
        </div>
      ),
    },
  },
};

export default meta;

