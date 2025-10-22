import React from 'react'
import MenuBar from './components/MenuBar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
    <div className="min-h-screen bg-gray-50">
    <MenuBar/>
    {/* Main Content Area */}
      <div className="lg:ml-64 min-h-screen p-4 pb-20 lg:pb-4">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </div>
      </div>
    </>
  )
}

export default App