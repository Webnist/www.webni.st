# webni.st 開発フロー（Issue → PR → Deploy）

## 基本方針
- すべての作業は Issue 起点
- 小さく作って、すぐマージ
- 個人開発だが「チーム開発前提」で進める

---

## 1. Issue

### ルール
- 作業前に必ず Issue を作成
- 1 Issue = 1 目的
- フェーズ作業は [Phase]、細かい作業は [Task]

### Issue に必ず書くこと
- 目的（Why）
- やること（What）
- ゴール（Doneの定義）
- 参考リンク（公式Docs）

---

## 2. ブランチ

### 命名規則
```text
main                本番
feature/xxxx        新機能
fix/xxxx            修正
chore/xxxx          設定・雑務
```

### 例
```text
feature/setup-nextjs
feature/add-blog-routing
fix/metadata-bug
```

---

## 3. Pull Request

### PR作成ルール
- Issue を必ず紐づける
- 小さく・レビューしやすく

### PRテンプレ（本文）
```md
## 対応Issue
- close #XX

## 変更内容
- 何をしたか

## 確認方法
- npm run dev
- http://localhost:3000

## スクリーンショット（UI変更時）
（必要なら）
```

---

## 4. マージ

### マージ条件
- Issue のチェックがすべて完了
- ローカルで動作確認済み
- ESLint / TypeScript エラーなし

👉 原則 squash merge

---

## 5. Deploy

### タイミング
- main ブランチにマージされたら deploy OK
- フェーズ完了ごとに deploy 推奨

### デプロイ手段
- Vercel（基本）
- Self-host（必要に応じて）

---

## 6. Done の定義

Issue が Done になる条件：
- 実装完了
- 表示 or 動作確認済み
- 不要な console.log / TODO が残っていない
- 次の Issue が明確になっている

---

## 7. 心得（重要）
- 完璧を目指さない（60%で前進）
- 迷ったら Issue にメモを書く
- 「あとで直す」は Issue 化する

👉 継続が最優先
