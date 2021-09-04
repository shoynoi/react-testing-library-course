import * as React from 'react'
import {Provider} from 'react-redux'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {store} from '../redux-store'
import {Counter} from '../redux-counter'

test('can render with redux with defaults', () => {
  render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  )
  userEvent.click(screen.getByRole('button', {name: '+'}))
  expect(screen.getByLabelText(/count/i)).toHaveTextContent('1')
})
