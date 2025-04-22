export function isValidRepositoryName(name: string): boolean {
  // 基本ルール
  const regex = /^(?![-.])[a-zA-Z0-9._-]+(\/[a-zA-Z0-9._-]+)?(?<![-.])$/;
  // 無効なパターン（連続するドット、空白、特殊記号）
  const invalidPatterns = /(\.\.)|(\s)|[^a-zA-Z0-9._/-]/;

  // 基本ルールを満たし、かつ無効なパターンが含まれていない場合にtrueを返す
  return regex.test(name) && !invalidPatterns.test(name);
}