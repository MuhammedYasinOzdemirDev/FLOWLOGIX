import { ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from './AppRoutes'
import { appTheme } from './theme'

describe('FlowLogix application shell', () => {
  it('shows the operation overview inside the main navigation layout', () => {
    render(
      <ThemeProvider theme={appTheme}>
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>
      </ThemeProvider>,
    )

    expect(screen.getByRole('navigation', { name: 'Ana navigasyon' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Operasyonun dağınık sinyallerini tek karar ekranında topla.',
      }),
    ).toBeVisible()
    expect(screen.getByText('Müşteri ve lokasyon')).toBeVisible()
    expect(screen.queryByText(/count is/i)).not.toBeInTheDocument()
  })
})
