import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchChannelForm from "@/app/SearchChannelForm";
import { searchChannelAction } from "@/app/actions/search_action";

// サーバーアクションをモック
jest.mock("@/app/actions/search_action", () => ({
  searchChannelAction: jest.fn(),
}));

// Next.js のuseRouterをモック
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    prefetch: jest.fn(),
  }),
}));

describe("SearchChannelForm", () => {
    beforeEach(() => {
        // 各テスト前にモックをリセット
        jest.clearAllMocks();
    });
    
    it("コンポーネントの初期化テスト", () => {
        const { getByPlaceholderText, getByRole } = render(
            <SearchChannelForm />
        );

        expect(getByPlaceholderText("チャンネルを検索")).toBeInTheDocument();
        expect(getByRole("form")).toBeInTheDocument();
    });
    
    it("検索入力と結果の表示をテスト", async () => {
        // モックの検索結果を設定
        const mockSearchResult = {
            nextPageToken: "next-token",
            items: [
                {
                    channelId: "ch1",
                    channelTitle: "テストチャンネル名",
                    description: "これはテストチャンネルの説明です",
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
        (searchChannelAction as jest.Mock).mockResolvedValue(mockSearchResult);
        
        // コンポーネントをレンダリング
        const { getByPlaceholderText, getByRole } = render(
            <SearchChannelForm />
        );
        
        // 検索フォームと入力欄を取得
        const input = getByPlaceholderText("チャンネルを検索");
        const form = getByRole("form");
        
        // 検索語を入力
        fireEvent.change(input, { target: { value: "テストチャンネル" } });
        expect(input).toHaveValue("テストチャンネル");
        
        // 検索フォームを送信
        fireEvent.submit(form);
        
        // サーバーアクションが適切に呼び出されたことを確認
        expect(searchChannelAction).toHaveBeenCalledWith("テストチャンネル");
        
        // 非同期の状態更新を待つ
        await waitFor(() => {
            // 検索結果が表示されることを確認
            expect(screen.getByText("検索結果")).toBeInTheDocument();
            expect(screen.getByText("テストチャンネル名")).toBeInTheDocument();
        });
    });
    
    it("空の検索クエリではAPIを呼び出さないことをテスト", () => {
        const { getByRole } = render(
            <SearchChannelForm />
        );
        
        const form = getByRole("form");
        
        // 空の入力で検索
        fireEvent.submit(form);
        
        // APIが呼び出されないことを確認
        expect(searchChannelAction).not.toHaveBeenCalled();
        expect(screen.queryByText("検索結果")).not.toBeInTheDocument();
    });
    
    it("検索結果が0件の場合のメッセージ表示をテスト", async () => {
        // 空の検索結果をモック
        (searchChannelAction as jest.Mock).mockResolvedValue({
            items: []
        });

        // コンポーネントをレンダリング
        const { getByPlaceholderText, getByRole } = render(
            <SearchChannelForm />
        );

        // 検索を実行
        const input = getByPlaceholderText("チャンネルを検索");
        fireEvent.change(input, { target: { value: "存在しないチャンネル" } });
        fireEvent.submit(getByRole("form"));

        // 非同期の状態更新を待つ
        await waitFor(() => {
            expect(screen.getByText("検索結果がありません")).toBeInTheDocument();
        });
    });
    
    it("アクセシビリティのテスト", () => {
        // フォームラベルやARIAロールなどをテスト
        const { getByRole } = render(<SearchChannelForm />);
        
        // 見出し要素が適切に設定されているか
        expect(getByRole("heading", { name: "チャンネル検索" })).toBeInTheDocument();
        
        // 検索ボタンがアクセシブルか
        expect(getByRole("button", { name: "検索" })).toBeInTheDocument();
    });

    it("もっと読み込むボタンのテスト", async () => {
        // 初回の検索結果とページトークンを設定
        const firstPageResult = {
            nextPageToken: "next-page-token",
            items: [
                {
                    channelId: "channel1",
                    channelTitle: "最初のチャンネル",
                    description: "最初のチャンネルの説明",
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
                    channelId: "channel2",
                    channelTitle: "二番目のチャンネル",
                    description: "二番目のチャンネルの説明",
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
        (searchChannelAction as jest.Mock)
            .mockResolvedValueOnce(firstPageResult)
            .mockResolvedValueOnce(secondPageResult);

        // コンポーネントをレンダリング
        render(<SearchChannelForm />);

        // 検索を実行
        const input = screen.getByPlaceholderText("チャンネルを検索");
        fireEvent.change(input, { target: { value: "テスト" } });
        fireEvent.submit(screen.getByRole("form"));

        // 最初のページが読み込まれるのを待つ
        await waitFor(() => {
            expect(screen.getByText("最初のチャンネル")).toBeInTheDocument();
        });

        // もっと読み込むボタンが表示されていることを確認
        const loadMoreButton = screen.getByText("もっと読み込む");
        expect(loadMoreButton).toBeInTheDocument();

        // もっと読み込むボタンをクリック
        fireEvent.click(loadMoreButton);

        // 次のページトークンを使ってサーバーアクションが呼び出されたことを確認
        expect(searchChannelAction).toHaveBeenCalledWith("テスト", "next-page-token");

        // 両方のアイテムが表示されるのを待つ
        await waitFor(() => {
            expect(screen.getByText("最初のチャンネル")).toBeInTheDocument();
            expect(screen.getByText("二番目のチャンネル")).toBeInTheDocument();
        });
    });

    it("チャンネルカードクリック時に正しいURLへ遷移することをテスト", async () => {
        // モックの検索結果を設定
        const mockSearchResult = {
            nextPageToken: undefined,
            items: [
                {
                    channelId: "test-channel-id",
                    channelTitle: "テストチャンネル",
                    description: "テストチャンネルの説明です",
                    publishedAt: "2023-01-01T00:00:00Z",
                    thumbnails: {
                        default: { url: "https://example.com/thumb.jpg" },
                        medium: { url: "https://example.com/thumb-medium.jpg" },
                        high: { url: "https://example.com/thumb-high.jpg" }
                    }
                }
            ]
        };

        // サーバーアクションのモック
        (searchChannelAction as jest.Mock).mockResolvedValue(mockSearchResult);
        
        // コンポーネントをレンダリング
        render(<SearchChannelForm />);
        
        // 検索を実行
        const input = screen.getByPlaceholderText("チャンネルを検索");
        fireEvent.change(input, { target: { value: "テスト" } });
        fireEvent.submit(screen.getByRole("form"));
        
        // 結果が表示されるまで待機
        await waitFor(() => {
            expect(screen.getByText("テストチャンネル")).toBeInTheDocument();
        });
        
        // チャンネルカードをクリック
        fireEvent.click(screen.getByText("テストチャンネル"));
        
        // router.pushが正しいURLで呼び出されたことを確認
        expect(mockPush).toHaveBeenCalledWith("/channel/test-channel-id");
    });
});