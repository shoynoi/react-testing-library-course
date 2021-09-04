import * as React from 'react'
import {Provider} from 'react-redux'
import {render as rtlRender, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {createStore} from 'redux'
import {Counter} from '../redux-counter'
import {reducer} from '../redux-reducer'

function render(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {},
) {
  function Wrapper({children}) {
    return <Provider store={store}>{children}</Provider>
  }
  return {...rtlRender(ui, {wrapper: Wrapper, ...renderOptions}), store}
}

test('can render with redux with defaults', () => {
  render(<Counter />)
  userEvent.click(screen.getByRole('button', {name: '+'}))
  expect(screen.getByLabelText(/count/i)).toHaveTextContent('1')
})

test('can render with redux with custom initial state', () => {
  render(<Counter />, {initialState: {count: '3'}})
  userEvent.click(screen.getByRole('button', {name: '-'}))
  expect(screen.getByLabelText(/count/i)).toHaveTextContent('2')
})
