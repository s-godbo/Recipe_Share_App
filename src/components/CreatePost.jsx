import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext.jsx'
import { createPost } from '../api/posts.js'

export function CreatePost() {
  const [title, setTitle] = useState('')

  const [contents, setContents] = useState('')

  const [imageUrl, setImageUrl] = useState('')

  const [token] = useAuth()

  const queryClient = useQueryClient()

  const createPostMutation = useMutation({
    mutationFn: () => createPost(token, { title, contents, imageUrl }),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  if (!token) return <div>Please log in to create new recipe posts.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Recipe Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <label htmlFor='create-title'>Ingredients & Instructions: </label>
      <br />
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <br />
      <label htmlFor='create-image'>Recipe Photo (as URL): </label>
      <br />
      <input
        type='text'
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <br />
      <br />
      <input
        type='submit'
        value={createPostMutation.isPending ? 'Creating....' : 'Create'}
        disabled={!title}
      />
      {createPostMutation.isSuccess ? (
        <>
          <br />
          Recipe created successfully!
        </>
      ) : null}
    </form>
  )
}
