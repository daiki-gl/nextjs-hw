import React, { useState, useEffect } from 'react'; // useState と useEffect をインポート

interface TextFieldProps {
    label: string;
    description?:string;
    maxlength?: number; // 最大文字数
    name: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    value?: string; 
    setIsValid: (isValid: boolean) => void;
}

const TextField = ({label,maxlength,name,type,required,placeholder, value = '', setIsValid}: TextFieldProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [isLengthError, setIsLengthError] = useState(false);

  useEffect(() => {
    setInputValue(value);
    if (maxlength && value.length > maxlength) {
        setIsLengthError(true);
        setIsValid(false)
    } else {
        setIsLengthError(false);
        setIsValid(true);
    }
  }, [value, maxlength]); // value または maxlength が変更されたら実行

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (maxlength && newValue.length > maxlength) {
      setIsLengthError(true);
      setIsValid(false)
    } else {
      setIsLengthError(false);
      setIsValid(true);
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    if (maxlength && currentValue.length > maxlength) {
      setIsLengthError(true);
      setIsValid(false)
    } else {
      setIsLengthError(false);
      setIsValid(true);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`mt-1 block w-full px-3 py-2 border ${isLengthError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400
                     focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        />
      </label>
      {/* maxlength エラーメッセージの表示 */}
      {isLengthError && maxlength && (
        <p className="mt-1 text-xs text-red-600">
          {maxlength}文字以内で入力してください。
        </p>
      )}
    </div>
  )
}

export default TextField;