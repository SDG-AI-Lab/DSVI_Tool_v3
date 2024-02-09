import React, {
  useState,
  useContext,
  ChangeEvent,
  FormEvent,
  useEffect,
} from 'react'
import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useAuth } from '../components/hooks/useAuth'

const initialState = {
  email: '',
  password: '',
}

export default function Login() {
  const [values, setValues] = useState<typeof initialState>(initialState)
  const { state } = useContext(AuthContext)
  const { loginUser, protectedRoute } = useAuth()
  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = values

    if (!email || !password) {
      toast.error('Please provide credentials')
      return
    }
    loginUser(email, password)
    setValues(initialState)
  }

  protectedRoute()

  useEffect(() => {
    if (state.user) {
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
  }, [state.user])

  return (
    <form onSubmit={onSubmit}>
      <h3>Login</h3>

      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        // required
      />
      <br />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        // required
      />
      <br />
      <br />
      <button
        type="submit"
        className="flex items-center rounded bg-blue-500 px-4 py-2 pl-5 text-white"
        disabled={state.isLoading}
      >
        {state.isLoading ? 'loading...' : 'Submit'}
      </button>
    </form>
  )
}
