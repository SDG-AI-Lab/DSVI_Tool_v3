import React from 'react'
import { RoleType, SelectedCountryType } from '../pages/register'

export type UserAdminDetails = {
  countries: SelectedCountryType[]
  email: string
  isVerified: boolean
  name: string
  role: RoleType
  verificationToken: string
  verified: string
  __v: number
  _id: string
}

type UserListPropsType = {
  users: UserAdminDetails[] | []
}

export default function UserList({ users }: UserListPropsType) {
  if (!users.length) return <></>

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Email</th>
          <th>Email Verified</th>
          <th>Countries</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: UserAdminDetails) => {
          return (
            <tr key={user._id} style={{ border: '2px solid black' }}>
              <td style={{ border: '1px solid black' }}>{user.name}</td>
              <td style={{ border: '1px solid black' }}>{user.role}</td>
              <td style={{ border: '1px solid black' }}>{user.email}</td>
              <td style={{ border: '1px solid black' }}>
                {user.isVerified ? 'yes' : 'no'}
              </td>
              <td style={{ border: '1px solid black' }}>
                {user.countries.join(', ')}
              </td>

              <td style={{ border: '1px solid black' }}>
                <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
                  Edit
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
