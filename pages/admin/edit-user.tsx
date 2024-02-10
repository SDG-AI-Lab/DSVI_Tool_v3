import React, { ChangeEvent, Fragment, useState } from 'react'
import { useContext } from 'react'
import {
  AuthContext,
  SelectedCountryType,
  UserAdminDetails,
  countryValues,
  roleValues,
} from '../../context/AuthContext'

export default function EditUser() {
  const { state } = useContext(AuthContext)
  if (!state.userAdminDetails) return <></>
  const [values, setValues] = useState<UserAdminDetails>(state.userAdminDetails)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }

  const handleCountrySelect = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleVerification = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value.toLowerCase() === 'yes') {
      setValues({ ...values, isVerified: true })
    } else {
      setValues({ ...values, isVerified: false })
    }
  }

  return (
    <form>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Password:
        <input
          type="text"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Role:
        <input
          type="text"
          name="role"
          value={values.role}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <div>
        <h3>Account Verified:</h3>
        <label>
          Yes
          <input
            type="radio"
            name="isVerified"
            value="yes"
            checked={values.isVerified}
            onChange={handleVerification}
          />
        </label>
        <br />
        <label>
          No
          <input
            type="radio"
            name="isVerified"
            value="no"
            checked={!values.isVerified}
            onChange={handleVerification}
          />
        </label>
        <br />
      </div>
      <br />
      <br />
      <div>
        <h3>Choose role for user</h3>
        {roleValues.map((role) => {
          return (
            <>
              <label>
                {role}
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={values.role === role}
                  onChange={handleChange}
                />
              </label>
              <br />
            </>
          )
        })}
      </div>
      <br />
      <div>
        <h3>Countries accessible to user</h3>
        {countryValues.map((country) => {
          return (
            <Fragment key={country}>
              <label>
                <input
                  type="checkbox"
                  value={country}
                  checked={values.countries.includes(country)}
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
