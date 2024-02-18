import React, { useContext } from 'react'
import { AuthContext, UserAdminDetails } from '../context/AuthContext'
import { useRouter } from 'next/router'
import { Table } from 'flowbite-react'

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
    <div className="m-2 overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Email Verified</Table.HeadCell>
          <Table.HeadCell>Countries</Table.HeadCell>
          <Table.HeadCell>
            {' '}
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user: UserAdminDetails) => {
            return (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={user._id}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {user.name}
                </Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.isVerified ? 'yes' : 'no'}</Table.Cell>
                <Table.Cell>{user.countries.join(', ')}</Table.Cell>

                <Table.Cell>
                  <a
                    onClick={() => onAddUserToContext(user)}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}
