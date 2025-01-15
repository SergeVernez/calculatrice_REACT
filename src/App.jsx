import { useState } from 'react'
import './App.css'

function App() {
  const [total, setTotal] = useState("")

  const handleClick = (valeur) => {
    setTotal(total.toString() + valeur.toString());
  }

  // const handleCalcul = () => {
  //   setTotal(eval(total))
  // }
  const handleCalcul = () => {
    if (total) {
      try {
        setTotal(eval(total));
      } catch (e) {
        setTotal("Error");
      }
    }
  }


  return (
    <>
      <section>
        {/* afficher le resultat */}
        <div className='result'>
          <h1>{total || <span className="cursor">&nbsp;</span>}</h1>
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
            <button onClick={() => { handleClick("&divide;") }} className='yellowButton'>&divide;</button>
          </div>

          <div className='line'>
            <button onClick={() => { handleClick(7) }}>7</button>
            <button onClick={() => { handleClick(8) }}>8</button>
            <button onClick={() => { handleClick(9) }}>9</button>
            <button className='yellowButton'>&times;</button>
          </div>

          <div className='line'>
            <button onClick={() => { handleClick(4) }}>4</button>
            <button onClick={() => { handleClick(5) }}>5</button>
            <button onClick={() => { handleClick(6) }}>6</button>
            <button className='yellowButton'>-</button>
          </div>

          <div className='line'>
            <button onClick={() => { handleClick(1) }}>1</button>
            <button onClick={() => { handleClick(2) }}>2</button>
            <button onClick={() => { handleClick(3) }}>3</button>
            <button onClick={() => { handleClick("+") }} className='yellowButton'>+</button>
          </div>

          <div className='line'>
            <button onClick={() => { handleClick("%") }}>%</button>
            <button onClick={() => { handleClick(0) }}>0</button>
            <button onClick={() => { handleClick(",") }}>,</button>
            <button onClick={() => handleCalcul()} className='yellowWhiteButton'>=</button>
          </div>
        </div>

      </section>

    </>
  )
}

export default App
