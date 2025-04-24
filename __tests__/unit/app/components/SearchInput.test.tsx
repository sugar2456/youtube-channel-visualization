import '@testing-library/jest-dom';
import SearchInput from "@/app/components/SearchInput";
import { render, fireEvent } from "@testing-library/react";

describe("SearchInput", () => {
    it("すべてのプロパティのテスト", () => {
        const { getByPlaceholderText, getByDisplayValue } = render(
        <SearchInput
            placeholder="検索"
            value="テスト"
            onChange={() => {}}
            onSubmit={() => {}}
        />
        );
    
        expect(getByPlaceholderText("検索")).toBeInTheDocument();
        expect(getByDisplayValue("テスト")).toBeInTheDocument();
    });
    
    it("最小のプロパティのテスト", () => {
        const { getByPlaceholderText, getByDisplayValue } = render(
        <SearchInput
            placeholder="検索"
            value=""
            onChange={() => {}}
            onSubmit={() => {}}
        />
        );
    
        expect(getByPlaceholderText("検索")).toBeInTheDocument();
        expect(getByDisplayValue("")).toBeInTheDocument();
    });

    it("イベントのテスト", () => {
        const handleChange = jest.fn();
        const handleSubmit = jest.fn();
        const { getByPlaceholderText, getByRole } = render(
        <SearchInput
            placeholder="検索"
            value=""
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
        );
    
        const input = getByPlaceholderText("検索");
        const form = getByRole("form");
    
        fireEvent.change(input, { target: { value: "新しい値" } });
        fireEvent.submit(form);
    
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
});