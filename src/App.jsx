import { useState } from 'react'
import './App.css'

function App() {
  const [total, setTotal] = useState("")

  // const handleClick = (valeur) => { setTotal(total + valeur); };
  const handleClick = (valeur) => {
    // limiter le nombre de caractères a 15 sur l'affichage
    const operators = ['+', '-', '×', '÷'];
    if (total.length < 15 || operators.includes(valeur)) {
      setTotal(total + valeur);
    }
  };

  const handleCalcul = () => {
    // Conversion des caractères spéciaux en équivalents JavaScript pour le calcul // On remplace toutes les occurrences de '×' par '*' (multiplication) // et '÷' par '/' (division) pour permettre à JavaScript de les interpréter correctement. Les barres obliques (slashes) délimitent l'expression régulière. Tout ce qui se trouve entre ces barres est l'expression régulière à rechercher. Le modificateur g signifie "global". Il indique que la recherche doit être effectuée sur toute la chaîne, et non pas s'arrêter à la première occurrence. Cela permet de remplacer toutes les occurrences du caractère spécifié.
    let caractereCalculable = total.replace(/×/g, '*').replace(/÷/g, '/');
    if (caractereCalculable) {
      //     try { setTotal(eval(caractereCalculable).toString()); } catch (e) { setTotal('Erreur'); } }
      // };
      try {
        let resultat = eval(caractereCalculable).toString();
        // si le resultat dépasse 15 caractères alors affiche Error
        if (resultat.length <= 15) {
          setTotal(resultat);
        } else {
          setTotal('Error');
        }

      } catch (e) {
        setTotal('Error');
      }
    }
  };


  const reset = () => {
    setTotal('');
  }

  const handleDelete = () => {
    setTotal(total.slice(0, -1));
  };
  const handleSignChange = () => {
    if (total) {
      setTotal((parseFloat(total) * -1).toString());
    }
  };
  const handleKeyDown = (event) => {
    const key = event.key;
    if (!isNaN(key)) {
      handleClick(key);
    } else if (key === "+") {
      handleClick('+');
    }
  };

  return (
    <>
      <section>
        {/* afficher le resultat */}
        <div className='result'>
          {/* <input type="text" value={total} readOnly className='resultInput' /> */}
          <h1>{total || <span className="cursor">&nbsp;</span>}</h1>
          {/* &nbsp; est un caractère spécial d'espace insécable pour pouvoir afficher le cursor*/}
        </div>
        <div>
          <hr />
        </div>
        {/* pavé */}
        <div className='keypad'>

          <div className='line'>
            <button onClick={() => reset()} className='yellowButton'>AC</button>
            <button onClick={() => { handleDelete() }} className='yellowButton'>&#9003;</button>
            {/* ou comme ceci: onClick={handleDelete} */}
            <button onClick={() => handleSignChange()} className='yellowButton'>+/-</button>
            <button onClick={() => { handleClick("÷") }} className='yellowButton'>&divide;</button>
          </div>

          <div className='line'>
            <button onClick={() => { handleClick(7) }}>7</button>
            <button onClick={() => { handleClick(8) }}>8</button>
            <button onClick={() => { handleClick(9) }}>9</button>
            <button onClick={() => { handleClick("×") }} className='yellowButton'>&times;</button>
          </div>

          <div className='line'>
            <button onClick={() => { handleClick(4) }}>4</button>
            <button onClick={() => { handleClick(5) }}>5</button>
            <button onClick={() => { handleClick(6) }}>6</button>
            <button onClick={() => { handleClick("-") }} className='yellowButton'>-</button>
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
