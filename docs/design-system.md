# Webnist Design System

Webnistデザインシステムの完全なリファレンスです。デザイントークン、カラーパレット、タイポグラフィー、そして「Liquid Glass」スタイルのコンポーネント集です。

## デザイントークン

### カラーパレット

#### Primary Colors
- `--color-primary`: `#fb923c` (orange-400)
- `--color-primary-hover`: `#fdba74` (orange-300)
- `--color-primary-dark`: `#ea580c` (orange-600)

#### Accent Colors
- `--color-accent`: `#3b82f6` (blue-500)
- `--color-accent-hover`: `#60a5fa` (blue-400)

#### Neutral Colors
- `--color-neutral-50` ~ `--color-neutral-950`: グレースケール

#### Slate Colors (Dark Theme)
- `--color-slate-50` ~ `--color-slate-950`: ダークテーマ用のグレースケール

### Liquid Glass Effects

#### Glass Background
- `--glass-bg`: `rgba(15, 23, 42, 0.6)` (slate-900 with opacity)
- `--glass-border`: `rgba(148, 163, 184, 0.2)` (slate-400 with opacity)
- `--glass-shadow`: `rgba(0, 0, 0, 0.3)`

#### Utility Classes
- `.glass`: 標準のガラス効果
- `.glass-light`: 軽いガラス効果
- `.glass-strong`: 強いガラス効果

### タイポグラフィー

- `--font-sans`: Noto Sans JP, システムフォントフォールバック

### スペーシング

- `--spacing-xs`: 0.25rem
- `--spacing-sm`: 0.5rem
- `--spacing-md`: 1rem
- `--spacing-lg`: 1.5rem
- `--spacing-xl`: 2rem
- `--spacing-2xl`: 3rem
- `--spacing-3xl`: 4rem

### ボーダーラディウス

- `--radius-sm`: 0.375rem
- `--radius-md`: 0.5rem
- `--radius-lg`: 0.75rem
- `--radius-xl`: 1rem
- `--radius-2xl`: 1.5rem
- `--radius-full`: 9999px

### シャドウ

- `--shadow-sm`: 小さなシャドウ
- `--shadow-md`: 中程度のシャドウ
- `--shadow-lg`: 大きなシャドウ
- `--shadow-xl`: 非常に大きなシャドウ
- `--shadow-glass`: ガラス効果用のシャドウ

## コンポーネント

### Button

Liquid Glassスタイルのボタンコンポーネントです。

#### Variants
- `primary`: プライマリボタン（オレンジ）
- `secondary`: セカンダリボタン（グレー）
- `outline`: アウトラインスタイル
- `ghost`: ゴーストスタイル
- `glass`: ガラス効果スタイル

#### Sizes
- `sm`: 小さなボタン
- `md`: 中程度のボタン（デフォルト）
- `lg`: 大きなボタン

#### 使用例

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md">Click me</Button>
<Button variant="glass" size="lg">Glass Button</Button>
```

### Card

Liquid Glassスタイルのカードコンポーネントです。

#### Variants
- `default`: デフォルトスタイル
- `glass`: ガラス効果スタイル
- `outline`: アウトラインスタイル

#### サブコンポーネント
- `CardHeader`: カードヘッダー
- `CardTitle`: カードタイトル
- `CardDescription`: カード説明
- `CardContent`: カードコンテンツ
- `CardFooter`: カードフッター

#### 使用例

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

<Card variant="glass" hover>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

### Tag

タグコンポーネントです。

#### Variants
- `default`: デフォルトスタイル
- `primary`: プライマリスタイル（オレンジ）
- `secondary`: セカンダリスタイル（ブルー）
- `glass`: ガラス効果スタイル
- `outline`: アウトラインスタイル

#### Sizes
- `sm`: 小さなタグ
- `md`: 中程度のタグ（デフォルト）
- `lg`: 大きなタグ

#### 使用例

```tsx
import { Tag } from '@/components/ui';

<Tag variant="primary" size="md">React</Tag>
<Tag variant="glass">Next.js</Tag>
```

### Section & Container

セクションとコンテナコンポーネントです。

#### Section Variants
- `default`: デフォルトスタイル
- `glass`: ガラス効果スタイル
- `dark`: ダークスタイル

#### Container Sizes
- `sm`: 最大幅 2xl
- `md`: 最大幅 4xl
- `lg`: 最大幅 5xl（デフォルト）
- `xl`: 最大幅 7xl
- `full`: フル幅

#### 使用例

```tsx
import { Section, Container } from '@/components/ui';

<Section variant="glass">
  <Container size="lg">
    <h2>Section Title</h2>
    <p>Section content</p>
  </Container>
</Section>
```

## 使用方法

すべてのコンポーネントは `@/components/ui` からインポートできます：

```tsx
import { Button, Card, Tag, Section, Container } from '@/components/ui';
```

または個別にインポート：

```tsx
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
```

## Tailwind CSS設定

デザイントークンは `src/app/globals.css` で定義されており、Tailwind CSS v4の `@theme inline` ディレクティブを使用しています。

カスタムクラスやユーティリティクラスを追加する場合は、`@layer components` または `@layer utilities` を使用してください。

