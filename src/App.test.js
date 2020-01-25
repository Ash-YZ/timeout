import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

const rendered = render(<App />)

test('renders title', () => {
  const title = rendered.getByText(/Timeout lunch/i)
  expect(title).toBeInTheDocument()
})

