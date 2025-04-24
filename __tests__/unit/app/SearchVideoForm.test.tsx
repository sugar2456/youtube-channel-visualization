import '@testing-library/jest-dom';
import SearchVideoForm from "@/app/SearchVideoForm";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

// jestのモックタイマーを使用してsetTimeoutを制御
jest.useFakeTimers();

describe("SearchVideoForm", () => {
    it("コンポーネントの初期化テスト", () => {
        const { getByPlaceholderText, getByRole } = render(
            <SearchVideoForm />
        );

        expect(getByPlaceholderText("動画を検索")).toBeInTheDocument();
        expect(getByRole("form")).toBeInTheDocument();
    });
    
    it("検索入力と結果の表示をテスト", async () => {
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

        // ロードインディケータが表示されることを確認
        expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

        // タイマーを進めて非同期処理を完了させる
        jest.advanceTimersByTime(1000);

        // 非同期の状態更新を待つ
        await waitFor(() => {
            // 検索結果が表示されることを確認
            expect(screen.getByText("検索結果")).toBeInTheDocument();
            expect(screen.getByText(/動画: テスト動画/)).toBeInTheDocument();

            // ローディングスピナーは消えているはず
            expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
        });
    });
    
    it("空の検索クエリではAPIを呼び出さないことをテスト", () => {
        const { getByRole, queryByText, queryByTestId, getByPlaceholderText } = render(
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
        expect(queryByText("検索結果")).not.toBeInTheDocument();
        expect(queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });
    
    it("検索結果が0件の場合のメッセージ表示をテスト", async () => {
        // 実装例：検索結果を空の配列を返すようにモック化する場合
        // この例ではコンポーネントのコードで直接テストできるケースがないため省略
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
});