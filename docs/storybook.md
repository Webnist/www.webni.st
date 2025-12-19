# Storybook セットアップガイド

Webnistデザインシステムのコンポーネントを表示・テストするためのStorybookがセットアップされています。

## セットアップ

### 依存関係のインストール

```bash
npm install
```

### Storybookの起動

```bash
npm run storybook
```

ブラウザで `http://localhost:6006` が自動的に開きます。

## ビルド

静的サイトとしてビルドする場合：

```bash
npm run build-storybook
```

ビルドされたファイルは `storybook-static` ディレクトリに出力されます。

## ストーリーの構造

各コンポーネントには対応するストーリーファイル（`.stories.tsx`）があります：

- `Button.stories.tsx` - ボタンコンポーネントのストーリー
- `Card.stories.tsx` - カードコンポーネントのストーリー
- `Tag.stories.tsx` - タグコンポーネントのストーリー
- `Section.stories.tsx` - セクション/コンテナコンポーネントのストーリー

## ストーリーの追加

新しいコンポーネントのストーリーを追加する場合：

1. コンポーネントファイルと同じディレクトリに `<ComponentName>.stories.tsx` を作成
2. 以下のテンプレートを使用：

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './YourComponent';

const meta: Meta<typeof YourComponent> = {
  title: 'UI/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof YourComponent>;

export const Default: Story = {
  args: {
    // プロップス
  },
};
```

## アドオン

以下のアドオンが有効になっています：

- **@storybook/addon-docs**: 自動ドキュメント生成
- **@storybook/addon-a11y**: アクセシビリティテスト
- **@storybook/addon-vitest**: テスト統合
- **@chromatic-com/storybook**: Chromatic統合（ビジュアル回帰テスト）

## Tailwind CSS統合

Storybookは `src/styles/globals.css` を自動的に読み込み、Tailwind CSSのスタイルが適用されます。

## カスタマイズ

### 背景色の変更

`.storybook/preview.ts` で背景色をカスタマイズできます：

```tsx
parameters: {
  backgrounds: {
    default: 'dark',
    values: [
      { name: 'dark', value: '#0a0a0a' },
      { name: 'light', value: '#ffffff' },
    ],
  },
}
```

## トラブルシューティング

### Tailwind CSSのスタイルが適用されない

`.storybook/preview.ts` で `globals.css` が正しくインポートされているか確認してください。

### ビルドエラー

TypeScriptの型エラーが発生する場合、`tsconfig.json` にStorybookの型定義が含まれているか確認してください。

## 参考リンク

- [Storybook公式ドキュメント](https://storybook.js.org/)
- [Next.js統合ガイド](https://storybook.js.org/docs/get-started/frameworks/nextjs)
- [デザインシステムドキュメント](./design-system.md)

