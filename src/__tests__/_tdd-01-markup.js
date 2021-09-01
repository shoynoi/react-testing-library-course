import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Editor} from '../_post-editor-01-markup'
import {savePost as mockSavePost} from '../api'

jest.mock('../api')

afterAll(() => {
  jest.clearAllMocks()
})

test('renders a form with title, content, tags, and a submit button', () => {
  const fakeUser = {
    id: 'user-id',
  }
  const fakePost = {
    title: 'Test title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  }
  mockSavePost.mockResolvedValueOnce()
  render(<Editor user={fakeUser} />)
  userEvent.type(screen.getByLabelText(/title/i), fakePost.title)
  userEvent.type(screen.getByLabelText(/content/i), fakePost.content)
  userEvent.type(screen.getByLabelText(/tags/i), fakePost.tags.join(', '))
  const submitButton = screen.getByRole('button', {name: /submit/i})
  expect(submitButton).toBeInTheDocument()
  userEvent.click(submitButton)
  expect(submitButton).toBeDisabled()
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)
})
