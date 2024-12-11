import { useState, useEffect } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Create from './pages/Create'
import Post from './pages/Post'
import Update from './pages/Update'
import { use } from 'react'


function App() {
  const [color, setColor] = useState('default')
  const routes = useRoutes([
    {
      path: "/",
      element: <Home color={color} />
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

  useEffect(() => {
    const uuidGenerator = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    if (localStorage.getItem('uuid') === null) {
      localStorage.setItem('uuid', uuidGenerator())
    }

  }, [])


  const defaultColor = () => {
    document.querySelector('body').style.backgroundColor = "#1A1A1A";
    document.querySelector('nav').style.backgroundColor = "#333333";
    setColor('default')
  }

  const bearishColor = () => {
    document.querySelector('body').style.backgroundColor = "#5C2E2E ";
    document.querySelector('nav').style.backgroundColor = "#3E1F1F";
    setColor('bearish')
  }

  const bullishColor = () => {
    document.querySelector('body').style.backgroundColor = "#2E5C2E";
    document.querySelector('nav').style.backgroundColor = "#1F401F";
    setColor('bullish')
  }
  return (
    <>
      <nav>
        <Link to="/">
          <h1>InvestNest</h1>
        </Link>
        <h4>Investor No: {localStorage.getItem("uuid")}</h4>
        <div>
          <button onClick={bearishColor} style={{ backgroundColor: "#990000" }}>Bearish</button>
          <button onClick={defaultColor}>Default</button>
          <button onClick={bullishColor} style={{ backgroundColor: "#009900 " }}>Bullish</button>
        </div>
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
