import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-light-gray flex flex-col h-screen">
      <div className="p-6 flex items-center">
        <div className="w-8 h-8 rounded-lg bg-primary-blue flex items-center justify-center text-white mr-3">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 10H15M10 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-xl font-bold text-deep-navy">TeamFlow</h1>
      </div>
      
      <div className="mt-6">
        <h2 className="px-6 text-xs font-medium text-medium-gray uppercase mb-2">Main</h2>
        <NavLink 
          to="/" 
          className={({isActive}) => 
            `flex items-center px-6 py-2 text-sm font-medium ${
              isActive 
                ? 'bg-light-blue text-primary-blue border-l-3 border-primary-blue' 
                : 'text-dark-gray hover:bg-light-blue/50'
            }`
          }
          end
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33334 10.8333V16.6667C3.33334 17.1087 3.50894 17.5326 3.82149 17.8452C4.13405 18.1577 4.55798 18.3333 5.00001 18.3333H15C15.442 18.3333 15.866 18.1577 16.1785 17.8452C16.4911 17.5326 16.6667 17.1087 16.6667 16.6667V10.8333M10 15V11.6667M8.33334 3.33333L1.66667 8.33333L8.33334 13.3333M11.6667 3.33333L18.3333 8.33333L11.6667 13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Dashboard
        </NavLink>
        
        <NavLink 
          to="/tasks" 
          className={({isActive}) => 
            `flex items-center px-6 py-2 text-sm font-medium ${
              isActive 
                ? 'bg-light-blue text-primary-blue border-l-3 border-primary-blue' 
                : 'text-dark-gray hover:bg-light-blue/50'
            }`
          }
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.66666 5H17.5M6.66666 10H17.5M6.66666 15H17.5M2.5 5H2.50833M2.5 10H2.50833M2.5 15H2.50833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          My Tasks
        </NavLink>
        
        <NavLink 
          to="/projects" 
          className={({isActive}) => 
            `flex items-center px-6 py-2 text-sm font-medium ${
              isActive 
                ? 'bg-light-blue text-primary-blue border-l-3 border-primary-blue' 
                : 'text-dark-gray hover:bg-light-blue/50'
            }`
          }
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.66666 13.3333L10 16.6667L13.3333 13.3333M10 3.33333V16.6667M3.33333 6.66667L6.66666 3.33333L10 6.66667M16.6667 6.66667L13.3333 3.33333L10 6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Projects
        </NavLink>
        
        <NavLink 
          to="/insights" 
          className={({isActive}) => 
            `flex items-center px-6 py-2 text-sm font-medium ${
              isActive 
                ? 'bg-light-blue text-primary-blue border-l-3 border-primary-blue' 
                : 'text-dark-gray hover:bg-light-blue/50'
            }`
          }
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 13.3333C12.3012 13.3333 14.1667 11.4679 14.1667 9.16667C14.1667 6.86548 12.3012 5 10 5C7.69881 5 5.83334 6.86548 5.83334 9.16667C5.83334 11.4679 7.69881 13.3333 10 13.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 13.3333V16.6667M7.5 15.8333H12.5M2.5 9.16667H5.83333M14.1667 9.16667H17.5M4.16667 4.16667L6.66667 6.66667M15.8333 4.16667L13.3333 6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Insights
        </NavLink>
      </div>
      
      <div className="mt-6">
        <h2 className="px-6 text-xs font-medium text-medium-gray uppercase mb-2">Workspace</h2>
        <NavLink 
          to="/team" 
          className={({isActive}) => 
            `flex items-center px-6 py-2 text-sm font-medium ${
              isActive 
                ? 'bg-light-blue text-primary-blue border-l-3 border-primary-blue' 
                : 'text-dark-gray hover:bg-light-blue/50'
            }`
          }
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10.8333C11.3807 10.8333 12.5 9.71405 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71405 8.61929 10.8333 10 10.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.6667 8.33333C16.6667 14.1667 10 17.5 10 17.5C10 17.5 3.33334 14.1667 3.33334 8.33333C3.33334 6.56522 4.03572 4.86953 5.28596 3.61929C6.5362 2.36905 8.2319 1.66667 10 1.66667C11.7681 1.66667 13.4638 2.36905 14.714 3.61929C15.9643 4.86953 16.6667 6.56522 16.6667 8.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Team
        </NavLink>
        
        <NavLink 
          to="/documents" 
          className={({isActive}) => 
            `flex items-center px-6 py-2 text-sm font-medium ${
              isActive 
                ? 'bg-light-blue text-primary-blue border-l-3 border-primary-blue' 
                : 'text-dark-gray hover:bg-light-blue/50'
            }`
          }
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.66666 16.6667H13.3333M10 13.3333V16.6667M5 3.33333H15C15.9205 3.33333 16.6667 4.07953 16.6667 5V11.6667C16.6667 12.5871 15.9205 13.3333 15 13.3333H5C4.07953 13.3333 3.33333 12.5871 3.33333 11.6667V5C3.33333 4.07953 4.07953 3.33333 5 3.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Documents
        </NavLink>
        
        <NavLink 
          to="/ai-assistant" 
          className={({isActive}) => 
            `flex items-center px-6 py-2 text-sm font-medium ${
              isActive 
                ? 'bg-light-blue text-primary-blue border-l-3 border-primary-blue' 
                : 'text-dark-gray hover:bg-light-blue/50'
            }`
          }
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 13.3333H10.0083" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.57501 7.5C8.77093 7.02822 9.12624 6.63729 9.58329 6.38466C10.0403 6.13203 10.5704 6.03271 11.0904 6.10208C11.6104 6.17146 12.0903 6.40608 12.4535 6.76907C12.8168 7.13205 13.0373 7.60174 13.0833 8.10833C13.0833 9.16667 11.4958 9.69583 10 9.69583V10.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          AI Assistant
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
