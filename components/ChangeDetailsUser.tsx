import React, { FormEvent, useContext, useState } from 'react'
import { Button, TextInput, Label } from 'flowbite-react'
import { AuthContext } from '../context/AuthContext'
import customFetch from '../utils/axios'
import { toast } from 'react-toastify'

export default function ChangeDetailsUser() {
  const { state, dispatch } = useContext(AuthContext)
  if (!state.user) return <>No data to display</>

  const [name, setName] = useState(state.user.name)
  const [email, setEmail] = useState(state.user.email)
  const [confirmedChanges, setConfirmedChanges] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (name === state.user.name && email === state.user.email) {
      toast.error('No changes to submit')
      return
    }

    if (!confirmedChanges) {
      toast.error('Press Change again to CONFIRM changes!', {
        autoClose: false,
      })
      toast.onChange(() => setConfirmedChanges(true))
      return
    }

    dispatch({ type: 'SET_IS_LOADING' })

    customFetch
      .patch('api/v1/user/update-user', { name, email })
      .then((response) => {
        toast.success(response.data.msg)
        dispatch({ type: 'SET_USER', payload: response.data.user })
        dispatch({ type: 'CLEAR_IS_LOADING' })
      })
      .catch((error) => {
        const errMsg = error.response.data
          ? error.response.data.msg
          : error.message
        toast.error(errMsg)
        dispatch({ type: 'CLEAR_IS_LOADING' })
      })
  }

  const onChangeFontStyle = (entered: String, initial: String) => {
    const color = entered === initial ? 'initial' : 'red'
    return { color }
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label
            value="Name:"
            htmlFor="name"
            style={onChangeFontStyle(name, state.user.name)}
          />
        </div>
        <TextInput
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setConfirmedChanges(false)
          }}
          shadow
          style={onChangeFontStyle(name, state.user.name)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            value="Email:"
            htmlFor="email"
            style={onChangeFontStyle(email, state.user.email)}
          />
        </div>
        <TextInput
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value.trim())
            setConfirmedChanges(false)
          }}
          shadow
          style={onChangeFontStyle(email, state.user.email)}
        />
      </div>
      <Button type="submit" color="blue" disabled={state.isLoading}>
        {state.isLoading ? 'Loading...' : 'Change Details'}
      </Button>
    </form>
  )
}
