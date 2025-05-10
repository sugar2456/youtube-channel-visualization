import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SummaryComponent, ChannelSummaryProps } from '../../../../../app/channel/[channelId]/summary_component';

// モックの設定
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('SummaryComponent', () => {
  // テストで使用するモックデータ
  const mockProps: ChannelSummaryProps = {
    channelId: 'test-channel-id',
    title: 'テストチャンネル',
    description: '説明文\n改行を含む説明',
    customUrl: '@test-channel',
    publishedAt: '2023-01-15T12:00:00Z',
    thumbnails: {
      default: { url: 'https://example.com/default.jpg' },
      medium: { url: 'https://example.com/medium.jpg' },
      high: { url: 'https://example.com/high.jpg' },
    },
    country: '日本',
  };

  // StringUtilsモジュール全体をモック
  const mockConvertNewLineToBr = jest.fn((text) => text.replace(/\n/g, '<br />'));
  jest.mock('../../../../../lib/utils/string_utils', () => ({
    convertNewLineToBr: mockConvertNewLineToBr,
  }));
  
    beforeEach(() => {
      jest.clearAllMocks();
    });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('全てのチャンネル情報が正しく表示されること', () => {
    render(<SummaryComponent {...mockProps} />);
    
    // タイトルの確認
    expect(screen.getByText('チャンネル詳細')).toBeInTheDocument();
    
    // チャンネル名の確認
    expect(screen.getByText(/チャンネル名: テストチャンネル/)).toBeInTheDocument();
    
    // チャンネルIDの確認
    expect(screen.getByText(/チャンネルID: test-channel-id/)).toBeInTheDocument();
    
    // カスタムURLの確認
    expect(screen.getByText(/カスタムURL: @test-channel/)).toBeInTheDocument();
    
    // 公開日の確認（日本語形式でフォーマットされること）
    expect(screen.getByText(/公開日: 2023\/1\/15/)).toBeInTheDocument();
    
    // 国の確認
    expect(screen.getByText(/国: 日本/)).toBeInTheDocument();
  });

  test('サムネイル画像が正しく表示されること', () => {
    render(<SummaryComponent {...mockProps} />);
    
    const image = screen.getByAltText('Channel Thumbnail');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('default.jpg'));
  });

  test('プロパティが欠けている場合も正しくレンダリングされること', () => {
    // 一部のプロパティを空文字列にした場合のテスト
    const incompleteProps = {
      ...mockProps,
      customUrl: '',
      country: '',
    };
    
    render(<SummaryComponent {...incompleteProps} />);
    
    expect(screen.getByText(/カスタムURL:/)).toBeInTheDocument();
    expect(screen.getByText(/国:/)).toBeInTheDocument();
  });
});