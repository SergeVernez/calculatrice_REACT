import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [total, setTotal] = useState("")

  const handleClick = (valeur) => {
    setTotal(total.toString() + valeur.toString());
  }

  const handleCalcul = () => {
    setTotal(eval(total))
  }

  return (
    <>
      <section>
        {/* afficher le resultat */}
        <div className='result'>
          <h1>Result {total}</h1>
        </div>
        <div>
          <hr />
        </div>
        {/* pavé */}
        <div className='keypad'>

          <div className='line'>
            <button className='yellowButton'>AC</button>
            <button className='yellowButton'>&#9003;</button>
            <button className='yellowButton'>+/-</button>
            <button className='yellowButton'>&divide;</button>
          </div>

          <div className='line'>
            <button onClick={() => { handleClick(7) }}>7</button>
            <button onClick={() => { handleClick(8) }}>8</button>
            <button>9</button>
            <button className='yellowButton'>&times;</button>
          </div>

          <div className='line'>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button className='yellowButton'>-</button>
          </div>

          <div className='line'>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button onClick={() => { handleClick("+") }} className='yellowButton'>+</button>
          </div>

          <div className='line'>
            <button>%</button>
            <button>0</button>
            <button>,</button>
            <button onClick={() => handleCalcul()} className='yellowWhiteButton'>=</button>
          </div>
        </div>

      </section>

    </>
  )
}

export default App
