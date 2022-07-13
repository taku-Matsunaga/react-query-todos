import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import { TagListMemo } from './TagList'
import { TagEditMemo } from './TagEdit'

export const MainTag: React.FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <p className="mb-10 text-xl font-bold">Tag</p>

      <div className="grid grid-cols-2 gap-40">
        <TagListMemo />
        <TagEditMemo />
      </div>

      <ChevronDoubleLeftIcon
        onClick={() => navigate('/')}
        className="h-5 w-5 mt-2 text-blue-500 cursor-pointer"
      />
      <p>Task page</p>
    </>
  )
}
