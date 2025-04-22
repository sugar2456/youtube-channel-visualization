import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import Header from "@/components/common/Header";

describe("Header", () => {
  it("ヘッダーが正しくレンダリングされる", () => {
    render(<Header />);

    // ヘッダーが正しく表示されているか確認(大文字小文字は区別しない)
    const headerElement = screen.getByRole("heading", {
      name: /GitHub Repository Viewer/i,
    });
    expect(headerElement).toBeInTheDocument();

    const headerContainer = headerElement.closest("header");
    expect(headerContainer).toHaveClass("bg-green-600");
    expect(headerContainer).toHaveClass("text-white");
  });

  it('ヘッダーのリンクが検索画面のリンクになっている', () => {
    render(<Header />);
    const linkElement = screen.getByRole('link', { name: /GitHub Repository Viewer/i });
    expect(linkElement).toHaveAttribute('href', '/search');
  });
});