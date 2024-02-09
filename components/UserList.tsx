import React from 'react'
import { AuthUser } from '../context/AuthContext'

type UserListPropsType = {
  users: AuthUser[] | []
}

export default function UserList({ users }: UserListPropsType) {
  console.log(users.length)
  if (!users.length) return <></>
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Countries</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: AuthUser) => {
          return (
            <tr>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.countries}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
