import React, { useContext } from 'react'
import { AuthContext, UserAdminDetails } from '../context/AuthContext'
import { useRouter } from 'next/router'

type UserListPropsType = {
  users: UserAdminDetails[] | []
}

export default function UserList({ users }: UserListPropsType) {
  const { dispatch } = useContext(AuthContext)
  const router = useRouter()

  const onAddUserToContext = (user: UserAdminDetails) => {
    user.password = '' // to set initial value
    dispatch({ type: 'SET_USER_ADMIN_DETAILS', payload: user })
    router.push('/admin/edit-user')
  }

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
                <button
                  onClick={() => onAddUserToContext(user)}
                  className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                >
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
