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
import { Button, Label, TextInput } from 'flowbite-react'

const initialState = {
  email: '',
  password: '',
}

export default function Login() {
  const [values, setValues] = useState<typeof initialState>(initialState)
  const { state } = useContext(AuthContext)
  const { loginUser } = useAuth()
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

  useEffect(() => {
    if (state.user) {
      setTimeout(() => {
        router.push('/')
        // setIsLoading false here
      }, 2000)
    }
  }, [state.user])

  return (
    <form onSubmit={onSubmit} className="m-2 flex max-w-md flex-col gap-4">
      <h1>Login</h1>

      <div>
        <div className="mb-2 block">
          <Label value="Email:" htmlFor="name" />
        </div>
        <TextInput
          type="text"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          shadow
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label value="Password:" htmlFor="password" />
        </div>
        <TextInput
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          shadow
        />
      </div>

      <Button type="submit" color="blue" disabled={state.isLoading}>
        {state.isLoading ? 'Loading...' : 'Submit'}
      </Button>
    </form>
  )
}
