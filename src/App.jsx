import { useState } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Create from './pages/Create'
import Post from './pages/Post'
import Update from './pages/Update'


function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/create",
      element: <Create />
    },
    {
      path: "/post/:id",
      element: <Post />
    },
    {
      path: "/update/:id",
      element: <Update />
    }
  ])


  return (
    <>
      <nav>
        <h1>InvestNest</h1>
    
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Create</Link>
          </li>
        </ul>
      </nav>
      <div className='main-container'>
        {routes}
      </div>
    </>
  )
}

export default App
