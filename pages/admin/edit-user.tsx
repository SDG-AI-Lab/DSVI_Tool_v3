import React, { ChangeEvent, FormEvent, Fragment, useState } from 'react'
import { useContext } from 'react'
import {
  AuthContext,
  SelectedCountryType,
  UserAdminDetails,
  countryValues,
  roleValues,
} from '../../context/AuthContext'
import { toast } from 'react-toastify'
import _ from 'lodash'
import { useAuth } from '../../components/hooks/useAuth'
import { Button, Checkbox, Label, Select, TextInput } from 'flowbite-react'

export default function EditUser() {
  const {
    state: { userAdminDetails },
    state,
  } = useContext(AuthContext)

  const { changeUserDetailsAdmin, deleteUserAccount } = useAuth()

  if (!userAdminDetails) return <>No data to display</>
  if (state.user.role !== 'admin') return <>Not admin</>

  const [values, setValues] = useState<UserAdminDetails>(userAdminDetails)
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }

  const onCountrySelect = (e: ChangeEvent<HTMLInputElement>) => {
    const value: SelectedCountryType = e.target.value as SelectedCountryType
    if (values.countries.includes(value)) {
      setValues({
        ...values,
        countries: values.countries.filter((country) => country !== value),
      })
    } else {
      setValues({ ...values, countries: [...values.countries, value] })
    }
  }

  const onVerificationChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value
    if (value.toLowerCase() === 'yes') {
      setValues({ ...values, isVerified: true })
    } else {
      setValues({ ...values, isVerified: false })
    }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isFormUpdated = !_.isEqual(values, userAdminDetails)

    if (!isFormUpdated) {
      toast.warning('Make changes before submitting')
      return
    }
    changeUserDetailsAdmin(values)
  }

  const onChangeFontStyle = (
    entered: UserAdminDetails[keyof UserAdminDetails],
    initial: UserAdminDetails[keyof UserAdminDetails]
  ) => {
    const color = _.isEqual(entered, initial) ? 'initial' : 'red'
    return { color }
  }

  const [confirmedDelete, setConfirmedDelete] = useState(false)
  const onUserDelete = () => {
    if (!confirmedDelete) {
      toast.info('Please press Delete User again to DELETE user account', {
        autoClose: false,
      })
      toast.onChange(() => setConfirmedDelete(true))
      return
    }
    deleteUserAccount(values._id)
  }

  return (
    <form onSubmit={onSubmit} className="m-2 flex max-w-md flex-col gap-4">
      <h1>Edit User</h1>
      <div>
        <div className="mb-2 block">
          <Label
            value="Name:"
            htmlFor="name"
            style={onChangeFontStyle(values.name, userAdminDetails.name)}
          />
        </div>
        <TextInput
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={onChange}
          shadow
          style={onChangeFontStyle(values.name, userAdminDetails.name)}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label
            value="Email:"
            htmlFor="email"
            style={onChangeFontStyle(values.email, userAdminDetails.email)}
          />
        </div>
        <TextInput
          type="text"
          name="email"
          value={values.email.trim()}
          onChange={onChange}
          id="email"
          shadow
          style={onChangeFontStyle(values.name, userAdminDetails.name)}
        />
      </div>

      {/* password needs to conform to backend requirements */}
      <div>
        <div className="mb-2 block">
          <Label
            value="Password:"
            htmlFor="password"
            style={onChangeFontStyle(
              values.password,
              userAdminDetails.password
            )}
          />
        </div>
        <TextInput
          type="text"
          name="password"
          value={values.password}
          onChange={onChange}
          id="password"
          shadow
          style={onChangeFontStyle(values.password, userAdminDetails.password)}
        />
      </div>

      <div className="max-w-md">
        <div className="mb-2 block">
          <Label
            htmlFor="roles"
            value="Account Verified:"
            style={onChangeFontStyle(
              values.isVerified,
              userAdminDetails.isVerified
            )}
          />
        </div>
        <Select id="roles" name="role" onChange={onVerificationChange} required>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Select>
      </div>

      <div className="max-w-md">
        <div className="mb-2 block">
          <Label
            htmlFor="roles"
            value="User's Role:"
            style={onChangeFontStyle(values.role, userAdminDetails.role)}
          />
        </div>
        <Select
          id="roles"
          name="role"
          onChange={onChange}
          value={values.role}
          required
        >
          {roleValues.map((role) => {
            return (
              <option key={role} value={role}>
                {role}
              </option>
            )
          })}
        </Select>
      </div>

      <div>
        <h2
          style={onChangeFontStyle(
            values.countries.sort(),
            userAdminDetails.countries.sort()
          )}
        >
          Countries accessible to user
        </h2>
        <div className="flex max-w-md flex-col gap-2" id="checkbox">
          {countryValues.map((country) => {
            return (
              <div key={country} className="flex items-center gap-2">
                <Checkbox
                  id={country}
                  onChange={onCountrySelect}
                  value={country}
                  color="blue"
                  checked={values.countries.includes(country)}
                />
                <Label htmlFor={country}>{country}</Label>
              </div>
            )
          })}
        </div>
      </div>

      <Button color="blue" type="submit" disabled={state.isLoading}>
        {state.isLoading ? 'loading...' : 'Submit Changes'}
      </Button>

      <Button color="failure" disabled={state.isLoading} onClick={onUserDelete}>
        {state.isLoading ? 'loading...' : 'Delete User'}
      </Button>
    </form>
  )
}
