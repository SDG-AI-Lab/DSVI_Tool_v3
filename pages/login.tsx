import Link from 'next/link'
import React, { useState, FormEvent } from 'react'
import Register from './register'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Logging in here')
  }

  return (
    <form action="submit" onSubmit={onSubmit}>
      <label htmlFor="username">User Name:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button>Login</button>
      <br />
      <Link href={'/register'}>Register</Link>
    </form>
  )
}
