import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section>
        {/* afficher le resultat */}
        <div className='result'>
          <h1>Result</h1>
        </div>
        {/* pavé */}
        <div className='keypad'>

          <div className='line'>
            <button className='yellow'>AC</button>
            <button className='yellow'>&#9003;</button>
            <button className='yellow'>+/-</button>
            <button className='yellow'>&divide;</button>
          </div>

          <div className='line'>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button className='yellow'>&times;</button>
          </div>

          <div className='line'>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button className='yellow'>-</button>
          </div>

          <div className='line'>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button className='yellow'>+</button>
          </div>

          <div className='line'>
            <button>%</button>
            <button>0</button>
            <button>,</button>
            <button className='yellowWhite'>=</button>
          </div>
        </div>

      </section>

    </>
  )
}

export default App
