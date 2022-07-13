import React, { FormEvent, memo } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useMutateTag } from '../hooks/useMutateTag'
import { selectTag, setEditedTag } from '../slices/todoSlice'

const TagEdit: React.FC = () => {
  const editedTag = useAppSelector(selectTag)
  const dispatch = useAppDispatch()
  const { createTagMutation, updateTagMutation } = useMutateTag()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTag.id === 0) {
      createTagMutation.mutate(editedTag)
    } else {
      updateTagMutation.mutate(editedTag)
    }
  }

  console.log('rendered TagEdit')

  if (updateTagMutation.isLoading) {
    return <span>{'Updating...'}</span>
  }
  if (createTagMutation.isLoading) {
    return <span>{'Creating...'}</span>
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="new tag ?"
          onChange={(e) =>
            dispatch(setEditedTag({ ...editedTag, name: e.target.value }))
          }
          value={editedTag.name}
        />
        <button
          className="disabled:opacity-40 my-3 mx-4 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded"
          disabled={!editedTag.name}
        >
          {editedTag.id === 0 ? 'Create' : 'Update'}
        </button>
      </form>
    </div>
  )
}

export const TagEditMemo = memo(TagEdit)
