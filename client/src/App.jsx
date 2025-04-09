import React from 'react'

import { routes } from './routes/routes'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
    <div >
      <AppRoutes/>
    </div>
  )
}

export default App
