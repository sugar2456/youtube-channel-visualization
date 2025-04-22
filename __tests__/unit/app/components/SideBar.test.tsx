import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideBar from '../../../../app/components/SideBar';

// モジュールをモック
jest.mock('@heroicons/react/24/outline', () => ({
  HomeIcon: () => <span data-testid="home-icon" />,
  StarIcon: () => <span data-testid="star-icon" />,
  ChartBarIcon: () => <span data-testid="chart-bar-icon" />
}));

describe('SideBar コンポーネント', () => {
  it('3つのSideBarItemが表示される', () => {
    render(<SideBar />);
    
    // リスト項目が3つ存在することを確認
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('正しいラベルとアイコンが表示される', () => {
    render(<SideBar />);
    
    // 各アイコンが存在することを確認
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    expect(screen.getByTestId('chart-bar-icon')).toBeInTheDocument();
    
    // 各ラベルが存在することを確認
    expect(screen.getByText('ホーム')).toBeInTheDocument();
    expect(screen.getByText('お気に入り')).toBeInTheDocument();
    expect(screen.getByText('チャンネル分析')).toBeInTheDocument();
  });
});