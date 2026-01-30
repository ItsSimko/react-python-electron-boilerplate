import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  // get count from python api
  const [count, setCount] = useState(0)
  
  // update count on app launch based on server sided var
  useEffect(() => {
    fetchCount()
  }, [])

  // Fetch count from Python API
  const fetchCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/count')
      setCount(response.data.count)
    } catch (error) {
      console.error('Error fetching count:', error)
    }
  }

  const updateCount = (increment: number) => {
    axios.post('http://localhost:5000/count', { increment: increment }).then(() => {
      setCount(count + increment)
    }).catch((error) => {
      console.error('Error updating count:', error)
    })
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => updateCount(1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
