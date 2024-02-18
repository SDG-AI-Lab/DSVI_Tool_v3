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

export default function EditUser() {
  const {
    state: { userAdminDetails },
    state,
  } = useContext(AuthContext)

  const { changeUserDetailsAdmin, deleteUserAccount, protectedRoute } =
    useAuth()

  if (!userAdminDetails) return <>No data to display</>
  if (state.user.role !== 'admin') return <>Not admin</>

  const [values, setValues] = useState<UserAdminDetails>(userAdminDetails)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const onVerificationChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    <>
      <form onSubmit={onSubmit}>
        <label style={onChangeFontStyle(values.name, userAdminDetails.name)}>
          Name:
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={onChange}
          />
        </label>
        <br />
        <br />
        <label style={onChangeFontStyle(values.email, userAdminDetails.email)}>
          Email:
          <input
            type="text"
            name="email"
            value={values.email.trim()}
            onChange={onChange}
          />
        </label>
        <br />
        <br />
        {/* password needs to conform to backend requirements */}
        <label
          style={onChangeFontStyle(values.password, userAdminDetails.password)}
        >
          Password:
          <input
            type="text"
            name="password"
            value={values.password}
            onChange={onChange}
          />
        </label>
        <br />
        <br />

        <div
          style={onChangeFontStyle(
            values.isVerified,
            userAdminDetails.isVerified
          )}
        >
          <h3>Account Verified:</h3>
          <label>
            Yes
            <input
              type="radio"
              name="isVerified"
              value="yes"
              checked={values.isVerified}
              onChange={onVerificationChange}
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
              onChange={onVerificationChange}
            />
          </label>
          <br />
        </div>
        <br />
        <br />
        <div style={onChangeFontStyle(values.role, userAdminDetails.role)}>
          <h3>Choose role for user</h3>
          {roleValues.map((role, i) => {
            return (
              <Fragment key={i}>
                <label>
                  {role}
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={values.role === role}
                    onChange={onChange}
                  />
                </label>
                <br />
              </Fragment>
            )
          })}
        </div>
        <br />
        <div
          style={onChangeFontStyle(
            values.countries.sort(),
            userAdminDetails.countries.sort()
          )}
        >
          <h3>Countries accessible to user</h3>
          {countryValues.map((country) => {
            return (
              <Fragment key={country}>
                <label>
                  <input
                    type="checkbox"
                    value={country}
                    checked={values.countries.includes(country)}
                    onChange={onCountrySelect}
                  />
                  {country}
                </label>
                <br />
              </Fragment>
            )
          })}
        </div>
        <br />
        <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
          Submit Changes
        </button>
      </form>
      <br />
      <button
        onClick={() => onUserDelete()}
        className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >
        Delete User
      </button>
    </>
  )
}
