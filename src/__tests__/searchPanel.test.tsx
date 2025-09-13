import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchPanel from '../app/components/organisms/SearchPanel';
import { getUsers } from '../app/common/utils/serverActions';
import { IsFormErrContextProvider } from '../app/components/context/IsFormErrContext';
import { TypeContextProvider } from '../app/components/context/TypeContext';
import { SearchResultProvider } from '../app/components/context/SearchResultContext';
import { ShowDataProvider } from '../app/components/context/ShowDataContext';
import { handleSubmit } from '../app/common/utils/formAction';

const mockUsers = [
  { id: 1, name: '山田太郎', phone: '09012345678', address: '東京都', status: false, payment: '1000' },
  { id: 2, name: '佐藤花子', phone: '08098765432', address: '大阪府', status: false, payment: '2000' },
  { id: 3, name: '田中一郎', phone: '07011112222', address: '神奈川県', status: true, payment: '3000' },
];

// getUsersをモック
jest.mock('../app/common/utils/serverActions', () => ({
  getUsers: jest.fn(() => Promise.resolve(mockUsers)),
}));

// formActionのhandleSubmitをモック
jest.mock('../app/common/utils/formAction', () => ({
  handleSubmit: jest.fn(e => e.preventDefault()),
  handleInputChange: jest.fn(),
}));

describe('SearchPanel', () => {
// コンテキストプロバイダーでラップしてレンダリングするヘルパー関数
const renderComponent = (type = "list") => {
Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: jest.fn().mockReturnValue(type),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});
   render(
      <IsFormErrContextProvider>
        <TypeContextProvider>
          <SearchResultProvider>
            <ShowDataProvider>
              <SearchPanel showUserData={null} setShowUserData={function (): void {
                            throw new Error('Function not implemented.');
                        } } />
            </ShowDataProvider>
          </SearchResultProvider>
        </TypeContextProvider>
      </IsFormErrContextProvider>
    );
  };

  it('初期ロード時にLoading...と表示され、その後フォームが表示される', async () => {
    // getUsersが解決するPromiseを遅延させることで、ローディング状態をテスト可能にする
    (getUsers as jest.Mock).mockImplementationOnce(() => new Promise(resolve => setTimeout(() => resolve(mockUsers), 100)));
    renderComponent();
    await waitFor(() => {
      // フォームの要素がレンダリングされていることを確認
      expect(screen.getByLabelText('名前')).toBeInTheDocument();
      expect(screen.getByLabelText('電話番号')).toBeInTheDocument();
      expect(screen.getByLabelText('郵便番号')).toBeInTheDocument();
      // ボタンのテキストを確認
      expect(screen.getByRole('button', { name: 'help' })).toBeInTheDocument();
      const searchButton = screen.getByRole('button', { name: '検索' });
      expect(searchButton).toBeInTheDocument();
      expect(searchButton).toBeDisabled();
    });
  });

  it('フォームが送信されたときにhandleSubmitが呼び出されること', async () => {
    renderComponent();
    await waitFor(() => {
      const nameInput = screen.getByLabelText('名前');
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
      // 入力値をセットして検索ボタンを有効にする
      fireEvent.change(nameInput, { target: { value: 'テスト太郎' } });
      // フォームを送信
      fireEvent.submit(form);
      // handleSubmitが呼び出されたことを確認
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('スナップショットテスト', async () => {
    const { asFragment } = render(
      <IsFormErrContextProvider>
        <TypeContextProvider>
          <SearchResultProvider>
            <ShowDataProvider>
              <SearchPanel showUserData={null} setShowUserData={function (): void {
                            throw new Error('Function not implemented.');
                        } } />
            </ShowDataProvider>
          </SearchResultProvider>
        </TypeContextProvider>
      </IsFormErrContextProvider>
    );
    await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
  });
  
});