import { createBrowserRouter, Outlet } from 'react-router-dom'
import { AppProviders } from '@app/providers/AppProviders'
import { SendPage, HistoryPage } from '@pages'
import { AppLayout } from '@widgets/AppLayout'
import { Preloader } from '@features'
import { ErrorBoundary } from '@shared/ErrorBoundary'
import { ROUTES } from './routes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <AppProviders>
            <Preloader minLoadingTime={3000} />
            <AppLayout>
              <Outlet />
            </AppLayout>
        </AppProviders>
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: <SendPage /> },
      { path: ROUTES.SEND, element: <SendPage /> },
      { path: ROUTES.HISTORY, element: <HistoryPage /> }
    ]
  }
])
