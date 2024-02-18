import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { Button, TextInput, Label } from 'flowbite-react'
import { AuthContext, UserAdminDetails } from '../../context/AuthContext'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'
import UserList from '../../components/UserList'

export default function Admin() {
  const { state } = useContext(AuthContext)
  const [users, setUsers] = useState<UserAdminDetails[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const getAllUsers = async () => {
    try {
      setIsLoading(true)
      const response = await customFetch.get('api/v1/user/get-all-users')

      setUsers(response.data.users)
      setIsLoading(false)
    } catch (error) {
      const errMsg = error.response.data
        ? error.response.data.msg
        : error.message

      toast.error(errMsg)
      setIsLoading(false)
    }
  }

  const getSingleUser = async () => {
    try {
      setIsLoading(true)
      const response = await customFetch.get('api/v1/user', {
        params: {
          email: searchTerm,
        },
      })
      // DEV only
      // const pause = (delay) => {
      //   return new Promise((res) => {
      //     setTimeout(res, delay)
      //   })
      // }
      // await pause(2000)

      setUsers([response.data.user])
      setSearchTerm('')
      setIsLoading(false)
    } catch (error) {
      const errMsg = error.response.data
        ? error.response.data.msg
        : error.message

      toast.error(errMsg)
      setIsLoading(false)
    }
  }

  if (!state.user || (state.user && state.user.role !== 'admin')) {
    return <>Not logged in or not admin</>
  }

  return (
    <>
      <Button className="m-2" color="blue">
        <Link href={'/register'}>Register New User</Link>
      </Button>

      <Button
        className="m-2"
        color="blue"
        onClick={getAllUsers}
        disabled={isLoading}
      >
        {isLoading ? 'loading...' : 'Get All Users'}
      </Button>

      <Button
        className="m-2"
        color="blue"
        onClick={() => setUsers([])}
        disabled={isLoading}
      >
        {isLoading ? 'loading...' : 'Clear User List'}
      </Button>
      <div className="flex items-center">
        <Label className="m-2 " htmlFor="find">
          Find One User by Email
        </Label>

        <TextInput
          className="m-2 max-w-md"
          id="find"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          onClick={getSingleUser}
          className="m-2"
          color="blue"
          disabled={isLoading}
        >
          {isLoading ? 'loading...' : 'Find'}
        </Button>
      </div>

      <UserList users={users} />
    </>
  )
}
