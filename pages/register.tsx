import React, {
  useState,
  FormEvent,
  ChangeEvent,
  useContext,
  Fragment,
  useEffect,
} from 'react'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'
import { useAuth } from '../components/hooks/useAuth'
import { useRouter } from 'next/router'

export type SelectedCountryType = 'Tajikistan' | 'Niger' | 'Burkina Faso'
const countryValues: SelectedCountryType[] = [
  'Tajikistan',
  'Niger',
  'Burkina Faso',
]

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  countries: [] as SelectedCountryType[],
}

export default function Register() {
  const { state } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    toast.error('Not enough rights to view this page')
    if (state.user && state.user.role !== 'admin') {
      router.push('/')
    } else if (!state.user) {
      router.push('/landing')
    }
  }, [state.user, router.route])

  const [values, setValues] = useState<typeof initialState>(initialState)
  const [selectedCountries, setSelectedCountries] = useState<
    SelectedCountryType[]
  >([])
  const { registerUser } = useAuth()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setValues({ ...values, [name]: value })
  }

  const handleCountrySelect = (e: ChangeEvent<HTMLInputElement>) => {
    const value: SelectedCountryType = e.target.value as SelectedCountryType

    if (selectedCountries.includes(value)) {
      setSelectedCountries(
        selectedCountries.filter((country) => country !== value)
      )
    } else {
      setSelectedCountries([...selectedCountries, value])
    }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, email, password, confirmPassword } = values
    if (!email || !password || !name) {
      toast.error('Please fill out all the fields')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Passwords are not matching!!!')
      return
    }
    registerUser(name, email, password, selectedCountries)
    setValues(initialState)
  }

  if (!state.user || (state.user && state.user.role !== 'admin')) {
    return <h1>NOT ADMIN</h1>
  }

  return (
    <form onSubmit={onSubmit}>
      <h3>Register</h3>

      <>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          // required
        />
      </>
      <br />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
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
      <>
        <label htmlFor="name">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          // required
        />
      </>
      <br />
      <br />
      <button
        type="submit"
        className="flex items-center rounded bg-blue-500 px-4 py-2 pl-5 text-white"
        disabled={state.isLoading}
      >
        {state.isLoading ? 'loading...' : 'Submit'}
      </button>
      <br />
      <div>
        {countryValues.map((country) => {
          return (
            <Fragment key={country}>
              <label>
                <input
                  type="checkbox"
                  value={country}
                  checked={selectedCountries.includes(country)}
                  onChange={handleCountrySelect}
                />
                {country}
              </label>
              <br />
            </Fragment>
          )
        })}
      </div>
    </form>
  )
}
