import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('increments the counter when the user clicks it', async () => {
    const user = userEvent.setup()

    render(<App />)

    const counterButton = screen.getByRole('button', {
      name: /count is 0/i,
    })

    await user.click(counterButton)

    expect(counterButton).toHaveTextContent('Count is 1')
  })
})
