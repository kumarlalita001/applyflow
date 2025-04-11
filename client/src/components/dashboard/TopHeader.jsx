import { Bell, LogOut, Menu, User2 } from 'lucide-react'
import React from 'react'
import { shortenText } from '../../utils/utils'


const TopHeader = ({sidebarOpenCloseFn,logoutModalOpenFn}) => {
    const  userData = JSON.parse(localStorage.getItem("userData"))

  return (
    <div className="bg-white  px-4 sm:px-4  shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={sidebarOpenCloseFn}
              className="text-gray-500 cursor-pointer"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 cursor-pointer">
                <Bell className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <User2 />
                <span className="text-gray-700 font-medium">{shortenText(userData?.name+"100002342134",10)}</span>
                <button
                  onClick={logoutModalOpenFn}
                  className="text-gray-500 cursor-pointer hover:text-gray-700"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default TopHeader
