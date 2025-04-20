import React from 'react'

const Header = () => {
  return (
    <header className="bg-white border-b border-light-gray p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="flex items-center">
        <div className="relative mr-4">
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medium-gray" 
            width="16" 
            height="16" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <button className="btn btn-primary flex items-center">
          <svg 
            className="mr-2" 
            width="16" 
            height="16" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M10 5V15M5 10H15" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          Add Task
        </button>
        
        <div className="ml-4 w-8 h-8 rounded-full bg-primary-blue text-white flex items-center justify-center font-medium">
          JD
        </div>
      </div>
    </header>
  )
}

export default Header
