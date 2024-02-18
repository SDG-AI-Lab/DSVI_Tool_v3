import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button, TextInput, Label } from 'flowbite-react'
import { toast } from 'react-toastify'
import customFetch from '../utils/axios'

const initialPasswordValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export default function ChangePasswordUser() {
  const [passwordValues, setPasswordValues] = useState(initialPasswordValues)
  const [isLoading, setIsLoading] = useState(false)

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setPasswordValues({ ...passwordValues, [name]: value })
  }

  const onPasswordChangeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    console.log('submitting')
    const { newPassword, confirmPassword, oldPassword } = passwordValues

    if (newPassword !== confirmPassword) {
      toast.error('New passwords are not matching')
      return
    }
    if (oldPassword === newPassword) {
      toast.error('Cannot use previous password')
      return
    }

    customFetch
      .patch('api/v1/user/update-user-password', passwordValues)
      .then((response) => {
        toast.success(response.data.msg)
        setIsLoading(false)
      })
      .catch((error) => {
        const errMsg = error.response.data
          ? error.response.data.msg
          : error.message
        toast.error(errMsg)
        setIsLoading(false)
      })
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
          type="text"
          name="oldPassword"
          id="oldPassword"
          value={passwordValues.oldPassword}
          onChange={onPasswordChange}
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="New Password:" htmlFor="newPassword" />
        </div>
        <TextInput
          type="text"
          name="newPassword"
          id="newPassword"
          value={passwordValues.newPassword}
          onChange={onPasswordChange}
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="Confirm New Password:" htmlFor="confirmPassword" />
        </div>
        <TextInput
          type="text"
          name="confirmPassword"
          id="confirmPassword"
          value={passwordValues.confirmPassword}
          onChange={onPasswordChange}
          shadow
        />
      </div>
      <Button type="submit" color="blue" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Change Password'}
      </Button>
    </form>
  )
}
