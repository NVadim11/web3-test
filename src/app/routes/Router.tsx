import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SendPage, HistoryPage } from '@pages'
import { AppLayout } from './AppLayout'
import { ROUTES } from './routes'

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path={ROUTES.HOME} element={<SendPage />} />
          <Route path={ROUTES.SEND} element={<SendPage />} />
          <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}
