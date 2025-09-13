import { getUsers } from '@/app/common/utils/serverActions';

  const mockUsers = [
    { id: 1, name: "山田太郎", phone: "090-1234-5678", address: "123-4567", status: true, payment: "1000" },
    { id: 2, name: "佐藤花子", phone: "080-9876-5432", address: "234-5678", status: true, payment: "1000" },
    { id: 3, name: "鈴木一郎", phone: "070-1111-2222", address: "345-6789", status: false, payment: "1000" },
  ];

describe('getUsers', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('APIからユーザーデータを正しく取得できること', async () => {
    const users = await getUsers();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/stub/IF0001.json`,
      expect.any(Object)
    );

    expect(users).toEqual(mockUsers);
  });
});
