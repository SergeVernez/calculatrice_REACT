import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [total, setTotal] = useState("");
  //Déclaration des opérateurs pour qu'ils soient accéssibles partout
  const operators = ['+', '-', '×', '÷'];

  // const handleClick = (valeur) => { setTotal(total + valeur); };
  const handleClick = (valeur) => {

    // Si le total est vide, ne pas ajouter d'opérateur
    if (total === "" && operators.includes(valeur)) {
      return;
    }
    // si le dernier caractère est un opérateur, bloquer l'ajout d'un autre opérateur
    if (operators.includes(total.slice(-1)) && operators.includes(valeur)) {
      return;
    }
    // limiter le nombre de caractères a 15 sur l'affichage
    if (total.length < 15 || operators.includes(valeur)) {
      setTotal(total + valeur);
    }
  };

  const handleCalcul = () => {
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
  // useEffect est un hook: permet de gérer les effets secondaires(side effects) comme les appels API, les abonnements, ou la manipulation du DOM. ils aident à écrire du code propre et structuré, en isolant les différentes parties de la logique du composant
  useEffect(() => {
    // fonction pour l'appuie des touches
    const handleKeyDown = (e) => {
      const key = e.key;
      if (!isNaN(key)) {
        // isNaN = is Not-a-Number
        handleClick(key);
      } else if (key === "+") {
        handleClick("+");
      } else if (key === "-") {
        handleClick("-");
      } else if (key === "*") {
        handleClick("×");
      } else if (key === "/") {
        handleClick("÷");
      } else if (key === "Enter") {
        handleCalcul();
      } else if (key === "Backspace") {
        handleDelete();
      } else if (key === "Escape") {
        reset();
      } else if (key === "%") {
        handleClick("%");
      } else if (key === ".") {
        handleClick(",");
      }
    };
    // Ajoute un écouteur d'événements `keydown` à la fenêtre
    window.addEventListener("keydown", handleKeyDown);
    // Fonction de nettoyage pour supprimer l'écouteur d'événements (mémoire) et garder la performance de l'appli
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [total]);

  return (
    <>
      <section>
        {/* afficher le resultat */}
        <div className='result' >
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
        <div className='info'>
          <h2>Esc = Reset | BackSpace = Delete | Enter = Result</h2>
        </div>

      </section>

    </>
  )
}

export default App
