import { renderHook, waitFor } from '@testing-library/react';
import useUserList from '@/app/common/hooks/useUserList';
import { getUsers } from '../app/common/utils/serverActions';

  const mockUsers = [
    { id: 1, name: "山田太郎", phone: "090-1234-5678", address: "123-4567", status: true, payment: "1000" },
    { id: 2, name: "佐藤花子", phone: "080-9876-5432", address: "234-5678", status: true, payment: "1000" },
    { id: 3, name: "鈴木一郎", phone: "070-1111-2222", address: "345-6789", status: false, payment: "1000" },
  ];

// getUsersサーバーアクションをモック
jest.mock('../app/common/utils/serverActions', () => ({
  getUsers: jest.fn(),
}));

describe('useUserList Hook Test', () => {
  // 各テストの前に、モック関数をリセット
  beforeEach(() => {
    (getUsers as jest.Mock).mockResolvedValue(mockUsers);
  });

  it('getUsersFunctionを呼び出した後、ユーザーデータが正しく設定されること', async () => {
    // useUserListフックをレンダリング
    const { result } = renderHook(() => useUserList());
    expect(result.current.users).toEqual([]);
    result.current.getUsersFunction();
    await waitFor(() => {
      expect(result.current.users).toEqual(mockUsers);
    });

    // getUsersサーバーアクションが1回呼び出されたことを確認
    expect(getUsers).toHaveBeenCalledTimes(1);
  });
});
