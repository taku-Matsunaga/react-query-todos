import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainTag } from './components/MainTag'
import { MainTask } from './components/MainTask'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 text-sm font-mono">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainTask />} />
            <Route path="/tags" element={<MainTag />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}

export default App
