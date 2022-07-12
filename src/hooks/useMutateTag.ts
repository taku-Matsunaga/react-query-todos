import { useAppDispatch } from './../app/hooks'
import { useMutation, useQueryClient } from 'react-query'
import { Tag } from '../types/types'
import axios from 'axios'
import { resetEditedTag } from '../slices/todoSlice'
export const useMutateTag = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  const createTagMutation = useMutation(
    (tag: Omit<Tag, 'id'>) =>
      axios.post<Tag>(`${process.env.REACT_APP_REST_URL}/tags/`, tag),
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Tag[]>('tags')
        if (previousTodos) {
          queryClient.setQueryData<Tag[]>('tags', [...previousTodos, res.data])
        }
        dispatch(resetEditedTag())
      },
    }
  )

  const updateTagMutation = useMutation(
    (tag: Tag) =>
      axios.put<Tag>(`${process.env.REACT_APP_REST_URL}/tags/${tag.id}/`, tag),
    {
      onSuccess: (res, variables) => {
        const previousTags = queryClient.getQueryData<Tag[]>('tags')
        if (previousTags) {
          queryClient.setQueryData<Tag[]>(
            'tags',
            previousTags.map((tag) =>
              tag.id === variables.id ? res.data : tag
            )
          )
        }
        dispatch(resetEditedTag())
      },
    }
  )

  const deleteTagMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_REST_URL}/tags/${id}`),
    {
      onSuccess: (res, variables) => {
        const previousTags = queryClient.getQueryData<Tag[]>('tags')
        if (previousTags) {
          queryClient.setQueryData<Tag[]>(
            'tags',
            previousTags.filter((tag) => tag.id !== variables)
          )
        }
        dispatch(resetEditedTag())
      },
    }
  )
  return { deleteTagMutation, createTagMutation, updateTagMutation }
}
