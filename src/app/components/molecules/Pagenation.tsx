'use client'
import { UserData } from '@/app/common/types';
import React, { SetStateAction, useEffect } from 'react'


const Pagenation = ({limit, showUserData, setShowUserData}:{limit:number,showUserData:UserData[], setShowUserData: React.Dispatch<SetStateAction<UserData[]>>}) => {
  const [currentPage, setCurrentPage] = React.useState(1)
    // totalPages は count (検索結果の全件数) に基づいて計算
    const totalPages = Math.ceil(showUserData.length / limit);

  useEffect(() => {
    setCurrentPage(1);
  }, [showUserData])

     // ページ数が1つ以下なら何も表示しない (ページネーション不要)
    if (totalPages <= 1) {
      return null;
    }
    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, currentPage + 2)


        // ページ番号の表示範囲の調整
    if(currentPage <= 3) {
      // 現在のページが最初の方のページの場合、最大5ページ表示
      endPage = Math.min(5, totalPages)
    } else if(currentPage + 2 >= totalPages) {
      // 現在のページが最後の方のページの場合、最後の5ページを表示
      startPage = Math.max(1, totalPages - 4)
    }

    const pageNumbers = []
    for(let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    setShowUserData(showUserData.slice((page - 1) * limit, page * limit));
  };

  return (
      <div>
        <button
          onClick={() => goToPage(startPage)}
          disabled={currentPage === 1}
        className={`${currentPage === 1 ? "cursor-not-allowed bg-gray-300" : "cursor-pointer"} mr-2  py-0.5 px-2 hover:bg-indigo-300 rounded-sm`}
        >
          ＜
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => goToPage(number)}
            className={`${currentPage === number ? "bg-indigo-500 text-white" : ""} mx-1 py-0.5 px-2.5 hover:bg-indigo-300  rounded-sm`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => goToPage(endPage)}
          disabled={currentPage === totalPages}
          className={`${currentPage === totalPages ? "cursor-not-allowed  bg-gray-300" : "cursor-pointer"} ml-2  py-0.5 px-2 hover:bg-indigo-300  rounded-sm`}
        >
          ＞
        </button>
      </div>
    );
  };

export default Pagenation