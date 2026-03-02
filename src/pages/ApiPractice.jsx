import { useEffect, useState } from 'react'
import axios from 'axios'

function ApiPractice() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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

  // fetch list
  useEffect(() => {
    let cancelled = false

    const loadPosts = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await axios.get(
          'https://jsonplaceholder.typicode.com/posts'
        )
        if (!cancelled) {
          setPosts(res.data.slice(0, 10)) // limit to 10 for brevity
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadPosts()
    return () => {
      cancelled = true
    }
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
          setPosts((p) => p.map((x) => (x.id === editingId ? res.data : x)))
          setEditingId(null)
          setSubmitSuccess('Update successful')
        } else {
          setPosts((p) => [res.data, ...p])
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

    // keep references to avoid eslint 'no-unused-vars' after removing table rows
    void posts
    void deletingId
    void startEdit
    void handleDelete

  return (
    <div className="flex flex-col items-center space-y-6 bg-gray-800 p-8 rounded-lg card-hover animate-slide-up w-full max-w-3xl">
      <h1 className="text-4xl font-bold text-indigo-400">
        API Practice
      </h1>

      {/* fetch state */}
      {loading && (
        <div className="flex items-center gap-2 text-blue-400">
          <div className="spinner"></div>
          <span>Loading data...</span>
        </div>
      )}
      {error && <p className="text-red-600 font-medium">Error: {error}</p>}

      {/* post form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-700 p-6 rounded-lg space-y-4 border border-gray-600"
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
            className="w-full border border-gray-600 px-3 py-2 rounded bg-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Body</label>
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            className="w-full border border-gray-600 px-3 py-2 rounded bg-gray-900"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50 button-active flex items-center justify-center gap-2"
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

      {/* posts table - headers only (rows removed per request) */}
      <div className="overflow-x-auto rounded-lg shadow-sm w-full">
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
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{post.id}</td>
                <td className="border px-3 py-2">{post.title}</td>
                <td className="border px-3 py-2">{post.body}</td>
                <td className="border px-3 py-2 space-x-2">
                  <button
                    onClick={() => startEdit(post)}
                    className="text-blue-400 hover:text-blue-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deletingId === post.id}
                    className="text-red-400 hover:text-red-200 transition-colors disabled:opacity-50 flex items-center gap-1"
                  >
                    {deletingId === post.id && <div className="spinner"></div>}
                    {deletingId === post.id ? 'Deleting' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteError && <p className="text-red-600 font-medium">{deleteError}</p>}
      {deleteSuccess && <p className="text-green-600 font-medium">{deleteSuccess}</p>}
    </div>
  )
}

export default ApiPractice
