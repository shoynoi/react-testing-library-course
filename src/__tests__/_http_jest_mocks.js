import 'whatwg-fetch'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import * as React from 'react'
import {GreetingLoader} from '../greeting-loader-01-mocking'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const server = setupServer(
  rest.post('/greeting', (req, res, cxt) => {
    return res(cxt.json({data: {greeting: `Hello, ${req.body.subject}!`}}))
  }),
)

beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('loads greeting on click', async () => {
  render(<GreetingLoader />)
  const nameInput = screen.getByLabelText(/name/i)
  const loadButton = screen.getByText(/load/i)
  userEvent.type(nameInput, 'Mary')
  userEvent.click(loadButton)
  await waitFor(() =>
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent(
      'Hello, Mary!',
    ),
  )
})
