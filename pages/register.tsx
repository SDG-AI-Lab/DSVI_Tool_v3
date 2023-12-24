import React, {
  useState,
  FormEvent,
  ChangeEvent,
  useContext,
  useEffect,
} from 'react'
import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import { useRegister } from '../components/hooks/useRegister'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

export default function Register() {
  const [values, setValues] = useState(initialState)
  const { state } = useContext(AuthContext)
  const router = useRouter()
  const { registerUser, loginUser } = useRegister()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setValues({ ...values, [name]: value })
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, email, password, isMember } = values

    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill out all the fields')
      return
    }

    if (isMember) {
      loginUser(email, password)
      return
    }
    registerUser(name, email, password)
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }
  // for DEV only
  const pause = (duration) => {
    return new Promise((resolve) => {
      setTimeout(resolve, duration)
    })
  }
  console.log(state.user)
  useEffect(() => {
    console.log('redirecting to root')
    if (state.user) {
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
  }, [state.user])

  return (
    <form onSubmit={onSubmit}>
      <h3>{values.isMember ? 'Login' : 'Register'}</h3>

      {!values.isMember && (
        <>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </>
      )}
      <br />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        value={values.email}
        onChange={handleChange}
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
      />
      <br />
      <br />
      <button type="submit" disabled={state.isLoading}>
        {state.isLoading ? 'loading...' : 'Submit'}
      </button>
      <p>
        {values.isMember ? 'Not a member yet?' : 'Already a member?'}
        <button type="button" onClick={toggleMember}>
          {values.isMember ? 'Register' : 'Login'}
        </button>
      </p>
      <br />
    </form>
  )
}
