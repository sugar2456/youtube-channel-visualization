import '@testing-library/jest-dom';
import ResultCard from "@/app/components/ResultCard";
import { render, fireEvent } from "@testing-library/react";

describe("ResultCard", () => {
    it("すべてのプロパティのテスト", () => {
        const { getByText } = render(
            <ResultCard
                title="Test Title"
                description="Test Description"
                imageUrl="/test.jpg"
                onClick={() => {}}
                additionalInfo={<span>Additional Info</span>}
            />
        );

        expect(getByText("Test Title")).toBeInTheDocument();
        expect(getByText("Test Description")).toBeInTheDocument();
        expect(getByText("Additional Info")).toBeInTheDocument();
    });
    it("最小のプロパティのテスト", () => {
        const { getByText } = render(
            <ResultCard
                title="Test Title"
                description="Test Description"
            />
        );

        expect(getByText("Test Title")).toBeInTheDocument();
        expect(getByText("Test Description")).toBeInTheDocument();
    });
    it("イベントのテスト", () => {
        const handleClick = jest.fn();
        const { getByText } = render(
            <ResultCard
                title="Test Title"
                description="Test Description"
                onClick={handleClick}
            />
        );

        fireEvent.click(getByText("Test Title"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});