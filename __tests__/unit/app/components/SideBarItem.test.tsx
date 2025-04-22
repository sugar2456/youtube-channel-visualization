import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SideBarItem } from '../../../../app/components/SideBar';
import { HomeIcon } from '@heroicons/react/24/outline';

describe('SideBarItem コンポーネント', () => {
  it('アイコンとラベルが正しく表示される', () => {
    render(<SideBarItem icon={<HomeIcon data-testid="home-icon" />} label="ホーム" />);
    
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    expect(screen.getByText('ホーム')).toBeInTheDocument();
  });

  it('デフォルトのhrefが設定される', () => {
    render(<SideBarItem icon={<HomeIcon />} label="ホーム" />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '#');
  });

  it('カスタムのhrefが設定される', () => {
    render(<SideBarItem icon={<HomeIcon />} label="ホーム" href="/dashboard" />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/dashboard');
  });
});