import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import Header from "@/app/components/Header";

describe("Header", () => {
  it("ヘッダーが正しくレンダリングされる", () => {
    render(<Header />);

    // ヘッダーが正しく表示されているか確認(大文字小文字は区別しない)
    const headerElement = screen.getByRole("heading", {
      name: /Youtube Channel Search/i,
    });
    expect(headerElement).toBeInTheDocument();

    const headerContainer = headerElement.closest("header");
    expect(headerContainer).toHaveClass("bg-red-500");
    expect(headerContainer).toHaveClass("text-white");
  });

  it('ヘッダーのリンクが検索画面のリンクになっている', () => {
    render(<Header />);
    const linkElement = screen.getByRole('link', { name: /Youtube Channel Search/i });
    expect(linkElement).toHaveAttribute('href', '/');
  });
});