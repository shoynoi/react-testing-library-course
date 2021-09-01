import * as React from 'react'

function Editor() {
  const [isSaving, setIsSaving] = React.useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSaving(true)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="input-title">Title</label>
      <input id="input-title" />

      <label htmlFor="input-content">Content</label>
      <input id="input-content" />

      <label htmlFor="input-tags">Tags</label>
      <input id="input-tags" />

      <button type="submit" disabled={isSaving}>
        Submit
      </button>
    </form>
  )
}

export {Editor}
