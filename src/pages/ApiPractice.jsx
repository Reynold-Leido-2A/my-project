import { useEffect, useState } from 'react'
import axios from 'axios'

function ApiPractice() {
  const [posts, setPosts] = useState([])

  const [form, setForm] = useState({ title: '', body: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(null)

  const [editingId, setEditingId] = useState(null)

  const [deletingId, setDeletingId] = useState(null)
  const [deleteError, setDeleteError] = useState(null)
  const [deleteSuccess, setDeleteSuccess] = useState(null)

  useEffect(() => {
    document.title = 'API Functionality'
  }, [])


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title || !form.body) return

    setSubmitting(true)
    setSubmitError(null)

    const url = 'https://jsonplaceholder.typicode.com/posts'
    const method = editingId ? 'put' : 'post'
    const payload = editingId ? { ...form, id: editingId } : form

    axios[method](url + (editingId ? `/${editingId}` : ''), payload)
      .then((res) => {
        if (editingId) {
          const updatedPost = { ...res.data, id: editingId }
          setPosts((p) => p.map((x) => (x.id === editingId ? updatedPost : x)))
          setEditingId(null)
          setSubmitSuccess('Update successful')
        } else {
          // generate a local sequential ID starting at 1
          const nextId = posts.length > 0 ? Math.max(...posts.map((x) => x.id)) + 1 : 1
          const newPost = { ...res.data, id: nextId }
          setPosts((p) => [newPost, ...p])
          setSubmitSuccess('Post submitted successfully')
        }
        setForm({ title: '', body: '' })
      })
      .catch((err) => {
        setSubmitError(err.message || 'Something went wrong')
      })
      .finally(() => setSubmitting(false))
  }

  const startEdit = (post) => {
    setEditingId(post.id)
    setForm({ title: post.title, body: post.body })
  }

  const handleDelete = (id) => {
    setDeletingId(id)
    setDeleteError(null)

    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        setPosts((p) => p.filter((x) => x.id !== id))
        setDeleteSuccess('Deleted successfully')
      })
      .catch((err) => {
        setDeleteError(err.message || 'Delete failed')
      })
      .finally(() => setDeletingId(null))
  }


  return (
    <div className="flex flex-col items-center space-y-6 bg-gray-800 p-8 rounded-lg card-hover animate-slide-up w-full max-w-3xl">
      <h1 className="text-4xl font-bold text-indigo-400">
        API Practice
      </h1>




      <form
        onSubmit={handleSubmit}
        className="bg-gray-700 p-6 rounded-lg space-y-4 border border-gray-600 w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          {editingId ? 'Edit Post' : 'New Post'}
        </h2>
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-600 px-3 py-2 rounded bg-gray-900 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            placeholder="Enter a title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Body</label>
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            className="w-full border border-gray-600 px-3 py-2 rounded bg-gray-900 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            placeholder="Write something..."
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting || !form.title || !form.body}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed button-active flex items-center justify-center gap-2 hover:bg-green-600 transition"
          >
            {submitting && <div className="spinner"></div>}
            {submitting
              ? editingId
                ? 'Updating...'
                : 'Submitting...'
              : editingId
              ? 'Update'
              : 'Submit'}
          </button>
          {editingId && (
            <button
              type="button"
              className="px-4 py-2 border rounded text-yellow-400 hover:text-yellow-200 transition-colors"
              onClick={() => {
                setEditingId(null)
                setForm({ title: '', body: '' })
                setSubmitError(null)
              }}
            >
              Cancel
            </button>
          )}
        </div>
        {submitError && <p className="text-red-600 font-medium">{submitError}</p>}
      {submitSuccess && <p className="text-green-600 font-medium">{submitSuccess}</p>}
      {editingId && <p className="text-yellow-400">Editing post #{editingId}</p>}
      </form>


      <div className="overflow-x-auto rounded-lg shadow-sm w-full">
        {posts.length === 0 ? (
          <p className="p-6 text-center text-gray-400 italic">
            No entries yet. Fill in the form above to add a post.
          </p>
        ) : (
          <table className="w-full table-auto border-collapse text-sm text-gray-600">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">ID</th>
                <th className="border px-3 py-2">Title</th>
                <th className="border px-3 py-2">Body</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    editingId === post.id ? 'bg-yellow-50' : ''
                  }`}
                >
                  <td className="border px-3 py-2">{post.id}</td>
                  <td className="border px-3 py-2">{post.title}</td>
                  <td className="border px-3 py-2">{post.body}</td>
                  <td className="border px-3 py-2 space-x-2">
                    <button
                      onClick={() => startEdit(post)}
                      className="text-blue-400 hover:text-blue-200 transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      disabled={deletingId === post.id}
                      className="text-red-400 hover:text-red-200 transition-colors disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                    >
                      {deletingId === post.id && <div className="spinner"></div>}
                      {deletingId === post.id ? 'Deleting' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {deleteError && <p className="text-red-600 font-medium">{deleteError}</p>}
      {deleteSuccess && <p className="text-green-600 font-medium">{deleteSuccess}</p>}
    </div>
  )
}

export default ApiPractice
