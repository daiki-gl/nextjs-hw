import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import SearchPanel from '../app/components/organisms/SearchPanel';
import { IsFormErrContextProvider, useIsFormErrContext } from '../app/components/context/IsFormErrContext';
import { TypeContextProvider } from '../app/components/context/TypeContext';
import { SearchResultProvider } from '../app/components/context/SearchResultContext';
import { ShowDataProvider } from '../app/components/context/ShowDataContext';
import { useValidation } from '../app/common/hooks/useValidation'; 

jest.mock('../app/common/utils/serverActions', () => ({
  getUsers: jest.fn(() => Promise.resolve([])),
}));
jest.mock('../app/components/context/IsFormErrContext', () => ({
  ...jest.requireActual('../app/components/context/IsFormErrContext'),
  useIsFormErrContext: jest.fn(),
}));

jest.mock('../app/components/context/SearchResultContext', () => ({
  useSearchResultContext: jest.fn().mockReturnValue({ setSearchResult: jest.fn() }),
  SearchResultProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../app/components/context/ShowDataContext', () => ({
  ShowDataProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));


jest.mock('../app/common/hooks/useValidation', () => ({
  useValidation: jest.fn(),
}));

jest.mock('../app/common/utils/formAction', () => ({
  handleSubmit: jest.fn(),
  handleErrCheck: jest.fn(),
  handleInputChange: jest.fn((e, setInput) => {
    setInput(e.target.value);
  }),
}));


const mockSetIsFormErr = jest.fn();
(useIsFormErrContext as jest.Mock).mockReturnValue({
  isFormErr: false, // デフォルトではエラーなし
  setIsFormErr: mockSetIsFormErr,
});


const mockUseValidation = (
  paymentFromErr: boolean,
  paymentToErr: boolean,
  nameErr: boolean,
  phoneNumErr: boolean,
  adrErr: boolean,
) => ({
    checkVal: jest.fn(),
    nameErr,
    setNameErr: jest.fn(),
    phoneNumErr,
    setPhoneNumErr: jest.fn(),
    adrErr,
    setAdrErr: jest.fn(),
    paymentToErr,
    setPaymentToErr: jest.fn(),
    paymentFromErr,
    setPaymentFromErr: jest.fn(),
});


describe('SearchPanel Error State Tests', () => {
  
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
    return render(
      <IsFormErrContextProvider>
        <TypeContextProvider>
          <SearchResultProvider>
            <ShowDataProvider>
              <SearchPanel
                showUserData={[]}
                setShowUserData={jest.fn()}
              />
            </ShowDataProvider>
          </SearchResultProvider>
        </TypeContextProvider>
      </IsFormErrContextProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useValidation as jest.Mock).mockReturnValue(mockUseValidation(false, false, false, false, false));
    (useIsFormErrContext as jest.Mock).mockReturnValue({ isFormErr: false, setIsFormErr: mockSetIsFormErr });
  });

  it('paymentRangeErrorが出た時にエラーメッセージが表示される', async () => {

    (useValidation as jest.Mock).mockReturnValue(mockUseValidation(false, false, false, false, false));
    const { getByLabelText } = renderComponent('detail');
    await waitFor(() => {
        expect(getByLabelText('From')).toBeInTheDocument();
    });

    const inputFrom = getByLabelText('From') as HTMLInputElement;
    const inputTo = getByLabelText('To') as HTMLInputElement;
    fireEvent.change(inputFrom, { target: { value: '2000' } });
    fireEvent.change(inputTo, { target: { value: '1000' } });

    fireEvent.blur(inputFrom);
    await waitFor(() => {
      expect(screen.getByText('FromはToより小さい値を入力してください。')).toBeInTheDocument();
    }, { timeout: 2000 }); 
  });

  it('金額の書式エラー時にエラーメッセージが表示されること', async () => {
    (useValidation as jest.Mock).mockReturnValue(mockUseValidation(true, false, false, false, false));
    renderComponent('detail');

    await waitFor(() => {
      expect(screen.getByLabelText('From')).toBeInTheDocument();
    });
    fireEvent.blur(screen.getByLabelText('From'));

    await waitFor(() => {
      expect(screen.getByText('0以上、999999999以下の半角数字で入力してください。')).toBeInTheDocument();
    });
  });

  it('初期エラーがない場合、エラーメッセージが表示されていないこと', async () => {
    (useValidation as jest.Mock).mockReturnValue(mockUseValidation(false, false, false, false, false));
    (useIsFormErrContext as jest.Mock).mockReturnValue({ isFormErr: false, setIsFormErr: mockSetIsFormErr });
    renderComponent('detail');
    await waitFor(() => {
      expect(screen.getByLabelText('From')).toBeInTheDocument();
    });

    expect(screen.queryByText('FromはToより小さい値を入力してください。')).not.toBeInTheDocument();
    expect(screen.queryByText('0以上、999999999以下の半角数字で入力してください。')).not.toBeInTheDocument();
  });

  it('数値以外を入力した場合、エラーメッセージが表示されること', async () => {
    // Step 1: useValidationをモックし、paymentFromErrをtrueにする
    (useValidation as jest.Mock).mockReturnValue(mockUseValidation(true, false, false, false, false));
    renderComponent('detail');
    await waitFor(() => {
      expect(screen.getByLabelText('From')).toBeInTheDocument();
    });

    const inputFrom = screen.getByLabelText('From') as HTMLInputElement;
    fireEvent.change(inputFrom, { target: { value: 'abc' } });
    fireEvent.blur(inputFrom);

    await waitFor(() => {
      expect(screen.getByText('0以上、999999999以下の半角数字で入力してください。')).toBeInTheDocument();
    });
  });

  it('郵便番号の書式エラー時にエラーメッセージが表示されること', async () => {
    (useValidation as jest.Mock).mockReturnValue(mockUseValidation(false, false, false, false, true));
    renderComponent('list');
    await waitFor(() => {
      expect(screen.getByLabelText('郵便番号')).toBeInTheDocument();
    });

    const inputAdr = screen.getByLabelText('郵便番号') as HTMLInputElement;
    fireEvent.blur(inputAdr);

    // 書式エラーのメッセージが表示されていることを確認
    await waitFor(() => {
      expect(screen.getByText('1桁以上、9桁以下の半角数字で入力してください。')).toBeInTheDocument();
    });
  });   
});
