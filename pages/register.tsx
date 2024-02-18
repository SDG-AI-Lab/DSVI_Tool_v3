import React, {
  useState,
  FormEvent,
  ChangeEvent,
  useContext,
  Fragment,
} from 'react'
import {
  AuthContext,
  RoleType,
  SelectedCountryType,
  countryValues,
  roleValues,
} from '../context/AuthContext'
import { toast } from 'react-toastify'
import { useAuth } from '../components/hooks/useAuth'
import { Button, Checkbox, Label, Select, TextInput } from 'flowbite-react'

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'user' as RoleType,
}

export default function Register() {
  const { state } = useContext(AuthContext)
  const { registerUser } = useAuth()

  const [values, setValues] = useState<typeof initialState>(initialState)
  const [selectedCountries, setSelectedCountries] = useState<
    SelectedCountryType[]
  >([])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    const { name, email, password, confirmPassword, role } = values
    if (!email || !password || !name) {
      toast.error('Please fill out all the fields')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Passwords are not matching!!!')
      return
    }
    registerUser(name, email, password, selectedCountries, role)
    setValues(initialState)
    setSelectedCountries([])
  }

  if (!state.user || (state.user && state.user.role !== 'admin')) {
    return <h1>NOT ADMIN</h1>
  }

  return (
    <form onSubmit={onSubmit} className="m-2 flex max-w-md flex-col gap-4">
      <h1>Register</h1>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name:" />
        </div>
        <TextInput
          id="name"
          type="text"
          name="name"
          placeholder="John Doe"
          value={values.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email:" />
        </div>
        <TextInput
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="john@gmail.com"
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password: " />
        </div>
        <TextInput
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="confirm-password" value="Confirm Password:" />
        </div>
        <TextInput
          type="password"
          id="confirm-password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <div>
        <h2>Countries accessible to new user</h2>
        <div className="flex max-w-md flex-col gap-2" id="checkbox">
          {countryValues.map((country) => {
            return (
              <div className="flex items-center gap-2">
                <Checkbox
                  id={country}
                  onChange={handleCountrySelect}
                  value={country}
                  color="blue"
                />
                <Label htmlFor={country}>{country}</Label>
              </div>
            )
          })}
        </div>
      </div>

      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="roles" value="New User's Role:" />
        </div>
        <Select
          id="roles"
          name="role"
          onChange={handleChange}
          value={values.role}
          required
        >
          {roleValues.map((role) => {
            return <option value={role}>{role}</option>
          })}
        </Select>
      </div>

      <Button color="blue" type="submit" disabled={state.isLoading}>
        {state.isLoading ? 'loading...' : 'Submit'}
      </Button>
    </form>
  )
}
