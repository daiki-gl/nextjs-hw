import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserList from '../app/components/organisms/UserList';
import { useShowDataContext } from '../app/components/context/ShowDataContext';
import { useSearchResultContext } from '../app/components/context/SearchResultContext';
import { useIsFormErrContext } from '../app/components/context/IsFormErrContext';
import useSelected from '../app/common/hooks/useSelected';
import useModal from '../app/common/hooks/useModal';
import { useRouter } from 'next/navigation';
import { UserData } from '@/app/common/types';

// Mock data
const mockUsers = [
  { id: 1, name: '山田太郎', phone: '09012345678', address: '東京都', status: false, payment: '1000' },
  { id: 2, name: '佐藤花子', phone: '08098765432', address: '大阪府', status: false, payment: '2000' },
  { id: 3, name: '田中一郎', phone: '07011112222', address: '神奈川県', status: true, payment: '3000' },
];


jest.mock('../app/components/context/ShowDataContext', () => ({
  useShowDataContext: jest.fn(),
}));

jest.mock('../app/components/context/SearchResultContext', () => ({
  useSearchResultContext: jest.fn(),
}));

jest.mock('../app/components/context/IsFormErrContext', () => ({
  useIsFormErrContext: jest.fn(),
}));

jest.mock('../app/common/hooks/useSelected', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    selected: {},
    toggleUserSelection: jest.fn(),
    toggleSelectAllCurrentPage: jest.fn(),
  })),
}));

jest.mock('../app/common/hooks/useModal', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isOpen: false,
    openModal: jest.fn(),
    closeModal: jest.fn(),
  })),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../app/components/molecules/Pagenation', () => ({
  __esModule: true,
  default: ({ limit, showUserData }: { limit: number; showUserData: UserData[] }) => (
    <div data-testid="pagination-mock">
      {`Pagination: limit=${limit} data-length=${showUserData?.length}`}
    </div>
  ),
}));

describe('UserListコンポーネント', () => {
  const mockSetShowUserData = jest.fn();
  const mockRouterPush = jest.fn();
  const mockSetShowAddUserData = jest.fn();
  const mockToggleUserSelection = jest.fn();
  const mockToggleSelectAll = jest.fn();
  const mockOpenModal = jest.fn();
  const mockCloseModal = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useShowDataContext as jest.Mock).mockReturnValue({
      setShowAddUserData: mockSetShowAddUserData,
    });
    (useSearchResultContext as jest.Mock).mockReturnValue({
      searchResult: mockUsers,
    });
    (useIsFormErrContext as jest.Mock).mockReturnValue({
      isFormErr: false,
    });
    (useSelected as jest.Mock).mockReturnValue({
      selected: { 1: false, 2: false },
      toggleUserSelection: mockToggleUserSelection,
      toggleSelectAllCurrentPage: mockToggleSelectAll,
    });
    (useModal as jest.Mock).mockReturnValue({
      isOpen: false,
      openModal: mockOpenModal,
      closeModal: mockCloseModal,
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  it('正しい検索結果件数とユーザーテーブルが表示されること', () => {
    render(<UserList showUserData={mockUsers} setShowUserData={mockSetShowUserData} />);
    expect(screen.getByText('検索結果 *3件')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(4); // 1 header + 3 users
  });

  it('データがないときに「表示するデータがありません」と表示されること', () => {
    render(<UserList showUserData={[]} setShowUserData={mockSetShowUserData} />);
    expect(screen.getByText('表示するデータがありません。')).toBeInTheDocument();
  });

  it('閉じるボタンをクリックするとsetShowUserDataが空の配列で呼び出されること', () => {
    render(<UserList showUserData={mockUsers} setShowUserData={mockSetShowUserData} />);
    fireEvent.click(screen.getByRole('button', { name: '閉じる' }));
    expect(mockSetShowUserData).toHaveBeenCalledWith([]);
  });

  it('ユーザーが選択されていない場合、追加ボタンが無効化されること', () => {
    render(<UserList showUserData={mockUsers} setShowUserData={mockSetShowUserData} />);
    const addButton = screen.getByRole('button', { name: '追加' });
    expect(addButton).toBeDisabled();
  });

  it('ユーザーが選択された場合、追加ボタンが有効化されること', () => {
    (useSelected as jest.Mock).mockReturnValue({
      selected: { 1: true, 2: false },
      toggleUserSelection: mockToggleUserSelection,
      toggleSelectAllCurrentPage: mockToggleSelectAll,
    });
    render(<UserList showUserData={mockUsers} setShowUserData={mockSetShowUserData} />);
    const addButton = screen.getByRole('button', { name: '追加' });
    expect(addButton).toBeEnabled();
  });

  it('追加ボタンをクリックすると/addページに遷移すること', () => {
    (useSelected as jest.Mock).mockReturnValue({
      selected: { 1: true, 2: false },
      toggleUserSelection: mockToggleUserSelection,
      toggleSelectAllCurrentPage: mockToggleSelectAll,
    });
    render(<UserList showUserData={mockUsers} setShowUserData={mockSetShowUserData} />);
    const addButton = screen.getByRole('button', { name: '追加' });
    fireEvent.click(addButton);
    expect(mockRouterPush).toHaveBeenCalledWith('/add');
  });

  it('名前をクリックするとモーダルが開き、ユーザー詳細がセットされること', async () => {
    (useModal as jest.Mock).mockReturnValue({
      isOpen: true,
      openModal: mockOpenModal,
      closeModal: mockCloseModal,
    });
    render(<UserList showUserData={mockUsers} setShowUserData={mockSetShowUserData} />);
    
    const firstUserName = screen.getByRole('button', { name: '山田太郎' });
    fireEvent.click(firstUserName);

    expect(mockOpenModal).toHaveBeenCalledTimes(1);

    // モーダルが表示されていることを確認
    await waitFor(() => {
      expect(screen.getByText('詳細情報')).toBeInTheDocument();
      expect(screen.getByText('名前：山田太郎')).toBeInTheDocument();
    });
  });

  it('ユーザーのチェックボックスをクリックするとtoggleUserSelectionフックが呼び出されること', () => {
    render(<UserList showUserData={mockUsers} setShowUserData={mockSetShowUserData} />);
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);
    expect(mockToggleUserSelection).toHaveBeenCalledWith(1, true);
  });

  it('スナップショットが一致すること', () => {
    const { asFragment } = render(<UserList showUserData={mockUsers} setShowUserData={mockSetShowUserData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});