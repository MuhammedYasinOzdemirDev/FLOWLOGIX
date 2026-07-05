import { Route, Routes } from 'react-router'
import { OperationsOverviewPage } from '../features/operations-overview/OperationsOverviewPage'
import { AppShell } from './AppShell'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<OperationsOverviewPage />} />
      </Route>
    </Routes>
  )
}
