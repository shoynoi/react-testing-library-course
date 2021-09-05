import * as React from 'react'
import userEvent from '@testing-library/user-event'
import {render, screen} from '@testing-library/react'
import {submitForm as mockSubmitForm} from '../api'
import App from '../app'

jest.mock('../api')

test('Can fill out a form across multiple pages', async () => {
  mockSubmitForm.mockResolvedValueOnce({success: true})
  const testData = {food: 'test food', drink: 'test drink'}
  render(<App />)
  userEvent.click(screen.getByRole('link', {name: /fill.*form/i}))
  userEvent.type(screen.getByLabelText(/food/i), testData.food)
  userEvent.click(screen.getByRole('link', {name: /next/i}))
  userEvent.type(screen.getByLabelText(/drink/i), testData.drink)
  userEvent.click(screen.getByRole('link', {name: /review/i}))
  expect(screen.getByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(screen.getByLabelText(/drink/i)).toHaveTextContent(testData.drink)
  userEvent.click(screen.getByRole('button', {name: /confirm/i}))
  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)
  userEvent.click(await screen.findByRole('link', {name: /home/i}))
  expect(
    screen.getByRole('heading', {level: 1, name: /welcome home/i}),
  ).toBeInTheDocument()
})
