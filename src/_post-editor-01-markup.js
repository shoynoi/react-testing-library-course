import * as React from 'react'
import {savePost} from './api'

function Editor({user}) {
  const [isSaving, setIsSaving] = React.useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSaving(true)
    const {title, content, tags} = e.target.elements
    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map((tag) => tag.trim()),
      authorId: user.id,
    }
    return savePost(newPost)
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
    </form>
  )
}

export {Editor}
