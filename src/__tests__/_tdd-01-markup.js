import * as React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import {build, fake, sequence} from 'test-data-bot'
import userEvent from '@testing-library/user-event'
import {Redirect as MockRedirect} from 'react-router'
import {Editor} from '../_post-editor-01-markup'
import {savePost as mockSavePost} from '../api'

jest.mock('../api')
jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})

afterEach(() => {
  jest.clearAllMocks()
})

const postBuilder = build('Post').fields({
  title: fake((f) => f.lorem.words()),
  content: fake((f) => f.lorem.paragraph()),
  tags: fake((f) => [f.lorem.word(), f.lorem.word(), f.lorem.word()]),
})

const userBuilder = build('User').fields({
  id: sequence((s) => `user-${s}`),
})

test('renders a form with title, content, tags, and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce()
  const fakeUser = userBuilder()
  render(<Editor user={fakeUser} />)
  const fakePost = postBuilder()
  const preDate = new Date().getTime()

  userEvent.type(screen.getByLabelText(/title/i), fakePost.title)
  userEvent.type(screen.getByLabelText(/content/i), fakePost.content)
  userEvent.type(screen.getByLabelText(/tags/i), fakePost.tags.join(', '))
  const submitButton = screen.getByRole('button', {name: /submit/i})
  expect(submitButton).toBeInTheDocument()
  userEvent.click(submitButton)
  expect(submitButton).toBeDisabled()
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    date: expect.any(String),
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)

  const postDate = new Date().getTime()
  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()
  expect(date).toBeGreaterThanOrEqual(preDate)
  expect(date).toBeLessThanOrEqual(postDate)

  await waitFor(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
})
