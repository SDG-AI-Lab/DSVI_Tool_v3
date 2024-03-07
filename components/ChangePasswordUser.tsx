import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { Button, TextInput, Label } from 'flowbite-react'
import { useAuth } from './hooks/useAuth'
import { AuthContext } from '../context/AuthContext'

const initialPasswordValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export default function ChangePasswordUser() {
  const [passwordValues, setPasswordValues] = useState(initialPasswordValues)
  const { changePasswordUser } = useAuth()
  const { state } = useContext(AuthContext)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setPasswordValues({ ...passwordValues, [name]: value })
  }

  const onPasswordChangeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submitting')

    changePasswordUser(passwordValues)
  }

  return (
    <form
      onSubmit={onPasswordChangeSubmit}
      className="flex max-w-md flex-col gap-4"
    >
      <div>
        <div className="mb-2 block">
          <Label value="Current Password:" htmlFor="oldPassword" />
        </div>
        <TextInput
          type="password"
          name="oldPassword"
          id="oldPassword"
          value={passwordValues.oldPassword}
          onChange={onChange}
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="New Password:" htmlFor="newPassword" />
        </div>
        <TextInput
          type="password"
          name="newPassword"
          id="newPassword"
          value={passwordValues.newPassword}
          onChange={onChange}
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="Confirm New Password:" htmlFor="confirmPassword" />
        </div>
        <TextInput
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={passwordValues.confirmPassword}
          onChange={onChange}
          shadow
        />
      </div>
      <Button type="submit" color="blue" disabled={state.isLoading}>
        {state.isLoading ? 'Loading...' : 'Change Password'}
      </Button>
    </form>
  )
}
