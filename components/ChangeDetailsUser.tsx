import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { Button, TextInput, Label } from 'flowbite-react'
import { useAuth } from './hooks/useAuth'
import { AuthContext } from '../context/AuthContext'

export default function ChangeDetailsUser() {
  const { state } = useContext(AuthContext)
  const { name, email } = state.user

  const [values, setValues] = useState({ name, email })

  const { changePasswordUser } = useAuth()
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value: string = e.target.value.trim()
    console.clear()
    console.log(value)
    setValues({ ...values, [name]: value })
  }

  const onPasswordChangeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submitting')

    // changePasswordUser(values)
  }

  const onChangeFontStyle = (entered: String, initial: String) => {
    const color = entered.trim() === initial.trim() ? 'initial' : 'red'

    return { color }
  }

  return (
    <form
      onSubmit={onPasswordChangeSubmit}
      className="flex max-w-md flex-col gap-4"
    >
      <div>
        <div className="mb-2 block">
          <Label
            value="Name:"
            htmlFor="name"
            style={onChangeFontStyle(values.name, name)}
          />
        </div>
        <TextInput
          type="text"
          name="name"
          id="name"
          value={values.name}
          onChange={onChange}
          shadow
          style={onChangeFontStyle(values.name, name)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            value="Email:"
            htmlFor="email"
            style={onChangeFontStyle(values.email, email)}
          />
        </div>
        <TextInput
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={onChange}
          shadow
          style={onChangeFontStyle(values.email, email)}
        />
      </div>
      <Button type="submit" color="blue" disabled={state.isLoading}>
        {state.isLoading ? 'Loading...' : 'Change Password'}
      </Button>
    </form>
  )
}
