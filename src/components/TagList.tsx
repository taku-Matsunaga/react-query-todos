import React, { memo } from 'react'
import { useQueryClient } from 'react-query'
import { useQueryTags } from '../hooks/useQueryTags'
import { Tag } from '../types/types'
import { TagItemMemo } from './TagItem'

export const TagList: React.FC = () => {
  const { status, data } = useQueryTags()
  // const queryClient = useQueryClient()
  // const data = queryClient.getQueryData<Tag[]>('tags')
  console.log('rendered TagList')

  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') return <div>{'Error...'}</div>

  return (
    <div>
      {data?.map((tag) => (
        <div key={tag.id}>
          <ul>
            <TagItemMemo tag={tag} />
          </ul>
        </div>
      ))}
    </div>
  )
}

export const TagListMemo = memo(TagList)
