import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {Editor} from '../_post-editor-01-markup'

test('renders a form with title, content, tags, and a submit button', () => {
  render(<Editor />)
  expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/content/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/tags/i)).toBeInTheDocument()
  const submitButton = screen.getByRole('button', {name: /submit/i})
  expect(submitButton).toBeInTheDocument()
  submitButton.click()
  expect(submitButton).toBeDisabled()
})
