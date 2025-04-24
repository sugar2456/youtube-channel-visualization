import { test, expect } from '@playwright/test';

// 基本UIのテスト
test('基本的なUIが表示されること', async ({ page }) => {
  // ホームページにアクセス
  await page.goto('http://localhost:3000/');
  
  // 見出しの表示確認
  await expect(page.getByRole('heading', { name: 'チャンネル検索' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '動画検索' })).toBeVisible();
  
  // 検索フォームの存在確認
  await expect(page.getByPlaceholder('チャンネルを検索')).toBeVisible();
  await expect(page.getByPlaceholder('動画を検索')).toBeVisible();
  
  // 検索ボタンの存在確認
  const buttons = page.getByRole('button', { name: '検索' });
  await expect(buttons.first()).toBeVisible();
  await expect(buttons.nth(1)).toBeVisible();
});

// チャンネル検索機能のテスト
test('チャンネル検索機能', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  
  // 検索を実行
  await page.getByPlaceholder('チャンネルを検索').fill('テストチャンネル');
  await page.getByRole('button', { name: '検索' }).first().click();
  
  // 検索結果の表示を確認 - 改善版
  // 検索ボタンをクリックした直後にページ内の変化を待つ
  await page.waitForTimeout(500); // 少し待機してローディング状態が始まるのを確認
  
  // CSS セレクターを直接使用して、より確実にローディングスピナーを検出
  await expect(page.getByRole('status')).toBeVisible({
    timeout: 3000 // タイムアウトを設定
  });
  
  await expect(page.getByText('検索結果')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText(/チャンネル: テストチャンネル/)).toBeVisible();
});

// 動画検索機能のテスト
test('動画検索機能', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  
  // 検索を実行
  await page.getByPlaceholder('動画を検索').fill('テスト動画');
  await page.getByRole('button', { name: '検索' }).nth(1).click();
  
  // 検索結果の表示を確認 - 改善版
  // 検索ボタンをクリックした直後にページ内の変化を待つ
  await page.waitForTimeout(500); // 少し待機してローディング状態が始まるのを確認
  
  // CSS セレクターを直接使用して、より確実にローディングスピナーを検出
  await expect(page.getByRole('status')).toBeVisible({
    timeout: 3000 // タイムアウトを設定
  });
  
  await expect(page.getByText('検索結果')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText(/動画: テスト動画/)).toBeVisible();
});

// レスポンシブデザインのテスト
test('モバイル表示のレスポンシブデザイン', async ({ page }) => {
  // モバイルサイズに設定
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/');
  
  // レイアウト確認用に位置情報を取得
  const channelSection = page.getByRole('heading', { name: 'チャンネル検索' });
  const videoSection = page.getByRole('heading', { name: '動画検索' });
  
  // 垂直位置の比較
  const channelBox = await channelSection.boundingBox();
  const videoBox = await videoSection.boundingBox();
  
  expect(channelBox?.y).toBeLessThan(videoBox?.y as number);
});