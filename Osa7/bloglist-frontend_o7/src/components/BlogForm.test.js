
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const mockPost = jest.fn()


beforeEach(() => {
  render(
    <BlogForm handlePostBlog={mockPost}/>
  )
})


test('send right stuff at mockpost', async () => {

  const button = screen.getByText('save')
  const texts = screen.getAllByRole('textbox')

  await userEvent.type(texts[0], 'This is title')
  await userEvent.type(texts[1], 'This is author')
  await userEvent.type(texts[2], 'This is url')
  await userEvent.click(button)

  expect(mockPost.mock.calls).toHaveLength(1)
  expect(mockPost.mock.calls[0][0].title).toBe('This is title')
  expect(mockPost.mock.calls[0][0].author).toBe('This is author')
  expect(mockPost.mock.calls[0][0].url).toBe('This is url')
})
