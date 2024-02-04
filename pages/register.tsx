import React, { useState, FormEvent, ChangeEvent, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'
import { useAuth } from '../components/hooks/useAuth'

type CountryArrayType = Array<'Tajikistan' | 'Niger' | 'Burkina Faso'> | []

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  countries: [] as CountryArrayType,
}

export default function Register() {
  const [values, setValues] = useState<typeof initialState>(initialState)
  const [selectedCountries, setSelectedCountries] = useState([])
  const { state } = useContext(AuthContext)
  const { registerUser } = useAuth()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setValues({ ...values, [name]: value })
  }

  const handleCountrySelect = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

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

    registerUser(name, email, password, confirmPassword)
    setValues(initialState)
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
        <label>
          <input
            type="checkbox"
            value="Tajikistan"
            checked={selectedCountries.includes('Tajikistan')}
            onChange={handleCountrySelect}
          />
          Tajikistan
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="Niger"
            checked={selectedCountries.includes('Niger')}
            onChange={handleCountrySelect}
          />
          Niger
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="Burkina Faso"
            checked={selectedCountries.includes('Burkina Faso')}
            onChange={handleCountrySelect}
          />
          Burkina Faso
        </label>
      </div>
    </form>
  )
}
