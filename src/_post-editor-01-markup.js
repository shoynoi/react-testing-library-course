import * as React from 'react'
import {Redirect} from 'react-router'
import {savePost} from './api'

function Editor({user}) {
  const [redirect, setRedirect] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  const [error, setError] = React.useState(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSaving(true)
    const {title, content, tags} = e.target.elements
    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map((tag) => tag.trim()),
      date: new Date().toISOString(),
      authorId: user.id,
    }
    return savePost(newPost).then(
      () => setRedirect(true),
      (response) => {
        setError(response.data.error)
        setIsSaving(false)
      },
    )
  }

  if (redirect) {
    return <Redirect to="/" />
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="input-title">Title</label>
      <input id="input-title" name="title" />

      <label htmlFor="input-content">Content</label>
      <input id="input-content" name="content" />

      <label htmlFor="input-tags">Tags</label>
      <input id="input-tags" name="tags" />

      <button type="submit" disabled={isSaving}>
        Submit
      </button>
      {error ? <div role="alert">{error}</div> : null}
    </form>
  )
}

export {Editor}
