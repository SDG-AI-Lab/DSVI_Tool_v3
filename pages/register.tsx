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
import { addUserToLocalStorage } from '../utils/localStorage'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill out all the fields')
      return
    }

    if (isMember) {
      loginUser(name, email, password)
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

      // user register post request
      const resp = await customFetch.post('api/v1/auth/register', {
        name,
        email,
        password,
      })

      const newUser = resp.data.user

      dispatch({ type: 'REGISTER_USER_FULFILLED', payload: newUser })
      addUserToLocalStorage(newUser)
    } catch (error) {
      dispatch({ type: 'REGISTER_USER_FULFILLED', error })
    }
  }

  const loginUser = async (name: string, email: string, password: string) => {
    try {
      dispatch({ type: 'REGISTER_USER_PENDING' })

      // user login post request
      const resp = await customFetch.post('api/v1/auth/login', {
        name,
        email,
        password,
      })

      const newUser = resp.data.user

      dispatch({ type: 'REGISTER_USER_FULFILLED', payload: newUser })
      addUserToLocalStorage(newUser)
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
