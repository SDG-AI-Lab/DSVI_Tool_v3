import React, { useState, FormEvent, ChangeEvent } from 'react'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

export default function Register() {
  const [values, setValues] = useState(initialState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setValues({ ...values, [name]: value })
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, email, password, isMember } = values

    if (isMember) {
      console.log('Logging in user')
      return
    }
    console.log('Registering user')
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  return (
    <form onSubmit={onSubmit}>
      <h3>{values.isMember ? 'Login' : 'Register'}</h3>

      {!values.isMember && (
        <>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </>
      )}
      <br />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        value={values.email}
        onChange={handleChange}
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
      />
      <br />
      <br />
      <button type="submit">Submit</button>
      <p>
        {values.isMember ? 'Not a member yet?' : 'Already a member?'}
        <button type="button" onClick={toggleMember}>
          {values.isMember ? 'Register' : 'Login'}
        </button>
      </p>
      <br />
    </form>
  )
}
