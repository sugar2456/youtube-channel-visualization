import { isValidRepositoryName } from "@/lib/utils/validation_utils";

describe("isValidRepositoryName", () => {
  it("有効なリポジトリ名を正しく検証する", () => {
    const validNames = [
      "repo1",
      "my-repo",
      "my_repo",
      "my.repo",
      "repo123",
      "REPO-NAME",
      "repo_name",
      "repo.name",
      "owner/repo_name",
    ];

    validNames.forEach((name) => {
      expect(isValidRepositoryName(name)).toBe(true);
    });
  });

  it("無効なリポジトリ名を正しく検証する", () => {
    const invalidNames = [
      "-repo", // 先頭にハイフン
      "repo-", // 末尾にハイフン
      ".repo", // 先頭にドット
      "repo.", // 末尾にドット
      "repo..name", // 連続するドット
      "repo@name", // 許可されていない記号
      "repo#", // 許可されていない記号
      "あいうえお", // 全角文字
    ];

    invalidNames.forEach((name) => {
      expect(isValidRepositoryName(name)).toBe(false);
    });
  });
});