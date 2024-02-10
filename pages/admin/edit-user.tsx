import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useEffect,
  useState,
} from 'react'
import { useContext } from 'react'
import {
  AuthContext,
  SelectedCountryType,
  UserAdminDetails,
  countryValues,
  roleValues,
} from '../../context/AuthContext'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import _ from 'lodash'

export default function EditUser() {
  const { state, dispatch } = useContext(AuthContext)
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

  const router = useRouter()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isFormUpdated = !_.isEqual(values, state.userAdminDetails)

    if (!isFormUpdated) {
      toast.warning('Make changes before submitting')
      return
    }

    return customFetch
      .post('api/v1/user/update-user-admin', values)
      .then((response) => {
        // dispatch set admin user with response.data.user?
        toast.success(response.data.msg)
        router.push('/admin')
      })
      .catch((error) => {
        // dispatch clear admin user?
        dispatch({ type: 'SET_USER_ADMIN_DETAILS', payload: values })
        const errMsg = error.response.data
          ? error.response.data.msg
          : error.message
        toast.error(errMsg)
        return error
      })
  }

  return (
    <form onSubmit={onSubmit}>
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
      <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
        Submit Changes
      </button>
    </form>
  )
}
