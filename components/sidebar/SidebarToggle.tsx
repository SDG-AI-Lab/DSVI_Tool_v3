import React from 'react'

interface SidebarToggleProps {
  children: JSX.Element
  onClick: () => void
}

function SidebarToggle({ children, onClick }: SidebarToggleProps) {
  return (
    <a
      className="flex h-12 items-center overflow-hidden text-ellipsis whitespace-nowrap rounded 
    py-4 px-2 text-sm text-gray-700 transition 
    duration-300 ease-in-out hover:bg-blue-50 hover:text-blue-600"
      href="#!"
      data-mdb-ripple="true"
      data-mdb-ripple-color="primary"
      onClick={onClick}
    >
      {children}
    </a>
  )
}

export default SidebarToggle
