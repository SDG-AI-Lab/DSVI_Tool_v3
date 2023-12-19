import React, {
  useState,
  FormEvent,
  ChangeEvent,
  useContext,
  useEffect,
} from 'react'
import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'next/router'
import customFetch from '../utils/axios'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

export default function Register() {
  const [values, setValues] = useState(initialState)
  const { state, dispatch } = useContext(AuthContext)
  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setValues({ ...values, [name]: value })
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, email, password, isMember } = values

    if (isMember) {
      loginUser()
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
    if (state.user) {
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
  }, [state.user])
  const registerUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      dispatch({ type: 'REGISTER_USER_PENDING' })
      // REQUEST HERE

      // await pause(2000)

      await customFetch.post('api/v1/auth/register', {
        name,
        email,
        password,
      })

      dispatch({ type: 'REGISTER_USER_FULFILLED', payload: null })
    } catch (error) {
      dispatch({ type: 'REGISTER_USER_FULFILLED', error })
    }
  }

  const loginUser = async () => {
    try {
      dispatch({ type: 'REGISTER_USER_PENDING' })
      // REQUEST HERE

      await pause(2000)

      dispatch({ type: 'REGISTER_USER_FULFILLED', payload: { name: 'vadim' } })
    } catch (error) {
      dispatch({ type: 'REGISTER_USER_FULFILLED', error })
    }
  }

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
