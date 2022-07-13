import { EditTask, Task } from './../types/types'
import { useMutation, useQueryClient } from 'react-query'
import { useAppDispatch } from '../app/hooks'
import axios from 'axios'
import { resetEditedTask } from '../slices/todoSlice'

export const useMutateTask = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const createTaskMutation = useMutation(
    (task: Omit<EditTask, 'id'>) =>
      axios.post<Task>(`${process.env.REACT_APP_REST_URL}/task/`, task),
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueriesData<Task[]>('tasks', [
            ...previousTodos,
            res.data,
          ])
        }
        dispatch(resetEditedTask())
      },
    }
  )

  const updateTaskMutation = useMutation(
    (task: EditTask) =>
      axios.put<Task>(
        `${process.env.REACT_APP_REST_URL}/task/${task.id}/`,
        task
      ),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            previousTodos.map((task) =>
              task.id === variables.id ? res.data : task
            )
          )
        }
        dispatch(resetEditedTask())
      },
    }
  )

  const deleteTaskMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_REST_URL}/task/${id}/`),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueriesData<Task[]>(
            'tasks',
            previousTodos.filter((task) => task.id !== variables)
          )
        }
        dispatch(resetEditedTask())
      },
    }
  )
  return { deleteTaskMutation, createTaskMutation, updateTaskMutation }
}
