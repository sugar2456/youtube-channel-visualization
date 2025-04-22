import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import Loading from "@/app/loading";

describe("Loading", () => {
  it("ローディングコンポーネントが正しいアクセシビリティ属性を持つ", () => {
    render(<Loading />);

    const loadingContainer = screen.getByRole("status");
    expect(loadingContainer).toHaveAttribute("aria-live", "polite");
  });

  it("ローディングアニメーションが正しくレンダリングされる", () => {
    render(<Loading />);

    const spinner = screen.getByRole("status").querySelector("div[aria-hidden='true']");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
    expect(spinner).toHaveClass("rounded-full");
    expect(spinner).toHaveClass("h-32");
    expect(spinner).toHaveClass("w-32");
    expect(spinner).toHaveClass("border-t-2");
    expect(spinner).toHaveClass("border-b-2");
    expect(spinner).toHaveClass("border-blue-500");
  });
});