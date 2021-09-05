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
  userEvent.click(await screen.findByRole('link', {name: /fill.*form/i}))
  userEvent.type(await screen.findByLabelText(/food/i), testData.food)
  userEvent.click(await screen.findByRole('link', {name: /next/i}))
  userEvent.type(await screen.findByLabelText(/drink/i), testData.drink)
  userEvent.click(await screen.findByRole('link', {name: /review/i}))
  expect(await screen.findByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(await screen.findByLabelText(/drink/i)).toHaveTextContent(
    testData.drink,
  )
  userEvent.click(await screen.findByRole('button', {name: /confirm/i}))
  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)
  userEvent.click(await screen.findByRole('link', {name: /home/i}))
  expect(
    await screen.findByRole('heading', {level: 1, name: /welcome home/i}),
  ).toBeInTheDocument()
})
