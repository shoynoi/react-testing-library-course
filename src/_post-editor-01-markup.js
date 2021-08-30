import * as React from 'react'

function Editor() {
  return (
    <form>
      <label htmlFor="input-title">Title</label>
      <input id="input-title" />

      <label htmlFor="input-content">Content</label>
      <input id="input-content" />

      <label htmlFor="input-tags">Tags</label>
      <input id="input-tags" />

      <button type="submit">Submit</button>
    </form>
  )
}

export {Editor}
