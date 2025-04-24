import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchChannelForm from "@/app/SearchChannelForm";

// jestのモックタイマーを使用してsetTimeoutを制御
jest.useFakeTimers();

describe("SearchChannelForm", () => {
    it("コンポーネントの初期化テスト", () => {
        const { getByPlaceholderText, getByRole } = render(
            <SearchChannelForm />
        );

        expect(getByPlaceholderText("チャンネルを検索")).toBeInTheDocument();
        expect(getByRole("form")).toBeInTheDocument();
    });
    
    it("検索入力と結果の表示をテスト", async () => {
        // コンポーネントをレンダリング
        const { getByPlaceholderText, getByRole, queryByText } = render(
            <SearchChannelForm />
        );
        
        // 検索フォームと入力欄を取得
        const input = getByPlaceholderText("チャンネルを検索");
        const form = getByRole("form");
        
        // 初期状態では検索結果が表示されていないことを確認
        expect(queryByText("検索結果")).not.toBeInTheDocument();
        
        // 検索語を入力
        fireEvent.change(input, { target: { value: "テストチャンネル" } });
        expect(input).toHaveValue("テストチャンネル");
        
        // 検索フォームを送信
        fireEvent.submit(form);
        
        // ロードインディケータが表示されることを確認
        expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
        
        // タイマーを進めて非同期処理を完了させる
        jest.advanceTimersByTime(1000);
        
        // 非同期の状態更新を待つ
        await waitFor(() => {
            // 検索結果が表示されることを確認
            expect(screen.getByText("検索結果")).toBeInTheDocument();
            expect(screen.getByText(/チャンネル: テストチャンネル/)).toBeInTheDocument();
            
            // ローディングスピナーは消えているはず
            expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
        });
    });
    
    it("空の検索クエリではAPIを呼び出さないことをテスト", () => {
        const { getByRole, queryByText, queryByTestId } = render(
            <SearchChannelForm />
        );
        
        const form = getByRole("form");
        
        // 空の入力で検索
        fireEvent.submit(form);
        
        // ローディングスピナーや結果が表示されないことを確認
        expect(queryByTestId("loading-spinner")).not.toBeInTheDocument();
        expect(queryByText("検索結果")).not.toBeInTheDocument();
    });
    
    it("検索結果が0件の場合のメッセージ表示をテスト", async () => {

    });
    
    it("アクセシビリティのテスト", () => {
        // フォームラベルやARIAロールなどをテスト
        const { getByRole } = render(<SearchChannelForm />);
        
        // 見出し要素が適切に設定されているか
        expect(getByRole("heading", { name: "チャンネル検索" })).toBeInTheDocument();
        
        // 検索ボタンがアクセシブルか
        expect(getByRole("button", { name: "検索" })).toBeInTheDocument();
    });
});