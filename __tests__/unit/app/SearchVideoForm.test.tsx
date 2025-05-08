import '@testing-library/jest-dom';
import SearchVideoForm from "@/app/SearchVideoForm";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { searchVideoAction } from "@/app/actions/search_action";

// サーバーアクションをモック
jest.mock("@/app/actions/search_action", () => ({
  searchVideoAction: jest.fn(),
}));

describe("SearchVideoForm", () => {
    beforeEach(() => {
        // 各テスト前にモックをリセット
        jest.clearAllMocks();
    });

    it("コンポーネントの初期化テスト", () => {
        const { getByPlaceholderText, getByRole } = render(
            <SearchVideoForm />
        );

        expect(getByPlaceholderText("動画を検索")).toBeInTheDocument();
        expect(getByRole("form")).toBeInTheDocument();
    });
    
    it("検索入力と結果の表示をテスト", async () => {
        // モックの検索結果を設定
        const mockSearchResult = {
            nextPageToken: "next-token",
            items: [
                {
                    videoId: "1",
                    videoTitle: "テスト動画タイトル",
                    channelId: "ch1",
                    channelTitle: "テストチャンネル",
                    description: "これはテスト動画の説明です",
                    publishedAt: "2023-01-01T00:00:00Z",
                    thumbnails: {
                        default: { url: "https://example.com/thumb1.jpg" },
                        medium: { url: "https://example.com/thumb1-medium.jpg" },
                        high: { url: "https://example.com/thumb1-high.jpg" }
                    }
                }
            ]
        };

        // サーバーアクションのモック
        (searchVideoAction as jest.Mock).mockResolvedValue(mockSearchResult);

        // コンポーネントをレンダリング
        const { getByPlaceholderText, getByRole, queryByText } = render(
            <SearchVideoForm />
        );

        // 検索フォームと入力欄を取得
        const input = getByPlaceholderText("動画を検索");
        const form = getByRole("form");

        // 初期状態では検索結果が表示されていないことを確認
        expect(queryByText("検索結果")).not.toBeInTheDocument();

        // 検索語を入力
        fireEvent.change(input, { target: { value: "テスト動画" } });
        expect(input).toHaveValue("テスト動画");

        // 検索フォームを送信
        fireEvent.submit(form);

        // サーバーアクションが適切に呼び出されたことを確認
        expect(searchVideoAction).toHaveBeenCalledWith("テスト動画");

        // 非同期の状態更新を待つ
        await waitFor(() => {
            // 検索結果が表示されることを確認
            expect(screen.getByText("検索結果")).toBeInTheDocument();
            expect(screen.getByText("テスト動画タイトル")).toBeInTheDocument();
        });
    });
    
    it("空の検索クエリではAPIを呼び出さないことをテスト", () => {
        const { getByRole, queryByText, getByPlaceholderText } = render(
            <SearchVideoForm />
        );

        const form = getByRole("form");
        const input = getByPlaceholderText("動画を検索");

        // 空の検索語を入力
        fireEvent.change(input, { target: { value: "" } });
        expect(input).toHaveValue("");

        // 検索フォームを送信
        fireEvent.submit(form);

        // APIが呼び出されないことを確認
        expect(searchVideoAction).not.toHaveBeenCalled();
        expect(queryByText("検索結果")).not.toBeInTheDocument();
    });
    
    it("検索結果が0件の場合のメッセージ表示をテスト", async () => {
        // 空の検索結果をモック
        (searchVideoAction as jest.Mock).mockResolvedValue({
            items: []
        });

        // コンポーネントをレンダリング
        const { getByPlaceholderText, getByRole } = render(
            <SearchVideoForm />
        );

        // 検索を実行
        const input = getByPlaceholderText("動画を検索");
        fireEvent.change(input, { target: { value: "存在しない動画" } });
        fireEvent.submit(getByRole("form"));

        // 非同期の状態更新を待つ
        await waitFor(() => {
            expect(screen.getByText("検索結果がありません")).toBeInTheDocument();
        });
    });

    it("アクセシビリティのテスト", () => {
        const { getByRole } = render(
            <SearchVideoForm />
        );

        // 見出し要素が適切に設定されているか
        expect(getByRole("heading", { name: "動画検索" })).toBeInTheDocument();
        
        // 検索ボタンがアクセシブルか
        expect(getByRole("button", { name: "検索" })).toBeInTheDocument();
    });
    
    it("もっと読み込むボタンのテスト", async () => {
        // 初回の検索結果とページトークンを設定
        const firstPageResult = {
            nextPageToken: "next-page-token",
            items: [
                {
                    videoId: "video1",
                    videoTitle: "最初のビデオ",
                    channelId: "ch1",
                    channelTitle: "テストチャンネル",
                    description: "最初のビデオの説明",
                    publishedAt: "2023-01-01T00:00:00Z",
                    thumbnails: {
                        default: { url: "https://example.com/thumb1.jpg" },
                        medium: { url: "https://example.com/thumb1-medium.jpg" },
                        high: { url: "https://example.com/thumb1-high.jpg" }
                    }
                }
            ]
        };

        // 次のページの結果を設定
        const secondPageResult = {
            nextPageToken: undefined,
            items: [
                {
                    videoId: "video2",
                    videoTitle: "二番目のビデオ",
                    channelId: "ch1",
                    channelTitle: "テストチャンネル",
                    description: "二番目のビデオの説明",
                    publishedAt: "2023-01-02T00:00:00Z",
                    thumbnails: {
                        default: { url: "https://example.com/thumb2.jpg" },
                        medium: { url: "https://example.com/thumb2-medium.jpg" },
                        high: { url: "https://example.com/thumb2-high.jpg" }
                    }
                }
            ]
        };

        // サーバーアクションのモックを設定
        (searchVideoAction as jest.Mock)
            .mockResolvedValueOnce(firstPageResult)
            .mockResolvedValueOnce(secondPageResult);

        // コンポーネントをレンダリング
        render(<SearchVideoForm />);

        // 検索を実行
        const input = screen.getByPlaceholderText("動画を検索");
        fireEvent.change(input, { target: { value: "テスト" } });
        fireEvent.submit(screen.getByRole("form"));

        // 最初のページが読み込まれるのを待つ
        await waitFor(() => {
            expect(screen.getByText("最初のビデオ")).toBeInTheDocument();
        });

        // もっと読み込むボタンが表示されていることを確認
        const loadMoreButton = screen.getByText("もっと読み込む");
        expect(loadMoreButton).toBeInTheDocument();

        // もっと読み込むボタンをクリック
        fireEvent.click(loadMoreButton);

        // 次のページトークンを使ってサーバーアクションが呼び出されたことを確認
        expect(searchVideoAction).toHaveBeenCalledWith("テスト", "next-page-token");

        // 両方のアイテムが表示されるまで待つ
        await waitFor(() => {
            expect(screen.getByText("最初のビデオ")).toBeInTheDocument();
            expect(screen.getByText("二番目のビデオ")).toBeInTheDocument();
        });
    });
});