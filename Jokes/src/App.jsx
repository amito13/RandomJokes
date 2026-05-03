import { useState } from 'react'
import JokeData from './component/JokeData'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    <JokeData />
   </>
  )
}

export default App
