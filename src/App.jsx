import { useEffect, useState } from 'react';
import './App.css';
import Orientation from './orientation';

function App() {
  const [total, setTotal] = useState("");
  //Déclaration des opérateurs pour qu'ils soient accessibles partout
  const operators = ['+', '-', '×', '÷', ','];

  // const handleClick = (valeur) => { setTotal(total + valeur); };
  const handleClick = (valeur) => {

    setTotal(prevTotal => {

      // Si le total est vide, ne pas ajouter d'opérateur
      if (prevTotal === "" && operators.includes(valeur)) return prevTotal;
      // si le dernier caractère est un opérateur, bloquer l'ajout d'un autre opérateur
      if (operators.includes(prevTotal.slice(-1)) && operators.includes(valeur)) return prevTotal;
      if (valeur === ",") {
        const parts = prevTotal.split(/[\+\-\×\÷%]/); 
        // [] un tableau pour inculre mes opérateurs
        const currentNumber = parts[parts.length - 1];
        if (currentNumber.includes(",")) return prevTotal;
      }
      // limiter le nombre de caractères a 15 sur l'affichage
      if (prevTotal.length < 15 || operators.includes(valeur)) return prevTotal + valeur;
      return prevTotal;
    });
  };

  const handleCalcul = () => {
    setTotal(prevTotal => {

      // Remplace les virgules par des points pour la calculatrice
      let caractereCalculable = prevTotal.replace(/×/g, '*').replace(/÷/g, '/').replace(/,/g, '.');

      // Solution copilote:
      // Gestion correcte du pourcentage en appliquant à la valeur précédente
      caractereCalculable = caractereCalculable.replace(/(\d+)%/g, (match, p1) => { return `(${p1}/100)`; });
      // Gestion des cas comme 100-50% => 100-50*100/100
      caractereCalculable = caractereCalculable.replace(/(\d+)([\+\-\*\/])(\(\d+\/100\))/g, (match, p1, p2, p3) => { return `${p1}${p2}${p1}*${p3}`; });


      if (caractereCalculable) {
        try {
          let resultat = eval(caractereCalculable).toString();
          // Re-remplace les points par des virgules dans le résultat final
          resultat = resultat.replace(/\./g, ',');
          // si le resultat dépasse 15 caractères alors affiche Error

          return resultat.length <= 15 ? resultat : 'Error';// affiche Error si le resultat dépasse 15 caractères affichés
        } catch (e) {
          return 'Error';
        }
      }
      return prevTotal;
    });
  };

  const reset = () => {
    setTotal('');
  }

  const handleDelete = () => {
    setTotal(prevTotal => prevTotal.slice(0, -1));
  };

  // +/-
  const handleSignChange = () => {
    setTotal(prevTotal => {
      if (prevTotal) {
        return (parseFloat(prevTotal) * -1).toString();
      }// parseFloat convertit une chaine en nombre flottant. X -1 permet de changer le signe
      return prevTotal;
    });
  };

  // useEffect est un hook: permet de gérer les effets secondaires (side effects) comme les appels API, les abonnements, ou la manipulation du DOM. ils aident à écrire du code propre et structuré, en isolant les différentes parties de la logique du composant
  useEffect(() => {
    // fonction pour l'appui des touches. (e) pour event par exemple
    const handleKeyDown = (e) => {
      const key = e.key;
      console.log(`handleKeyDown - key: ${key}`);
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
  }, []);

  return (
    // <Orientation></Orientation> est mon composant encapsulé dans une balise 
    <Orientation>
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
            <button onClick={reset} className='yellowButton'>AC</button>
            <button onClick={handleDelete} className='yellowButton'>&#9003;</button>
            {/* ou comme ceci: onClick={handleDelete} */}
            <button onClick={handleSignChange} className='yellowButton'>+/-</button>
            <button onClick={() => handleClick("÷")} className='yellowButton'>&divide;</button>
          </div>

          <div className='line'>
            <button onClick={() => handleClick(7)}>7</button>
            <button onClick={() => handleClick(8)}>8</button>
            <button onClick={() => handleClick(9)}>9</button>
            <button onClick={() => handleClick("×")} className='yellowButton'>&times;</button>
          </div>

          <div className='line'>
            <button onClick={() => handleClick(4)}>4</button>
            <button onClick={() => handleClick(5)}>5</button>
            <button onClick={() => handleClick(6)}>6</button>
            <button onClick={() => handleClick("-")} className='yellowButton'>-</button>
          </div>

          <div className='line'>
            <button onClick={() => handleClick(1)}>1</button>
            <button onClick={() => handleClick(2)}>2</button>
            <button onClick={() => handleClick(3)}>3</button>
            <button onClick={() => handleClick("+")} className='yellowButton'>+</button>
          </div>

          <div className='line'>
            <button onClick={() => handleClick("%")}>%</button>
            <button onClick={() => handleClick(0)}>0</button>
            <button onClick={() => handleClick(",")}>,</button>
            <button onClick={handleCalcul} className='yellowWhiteButton'>=</button>
          </div>
        </div>

      </section>
      <div className='info'>
        <h2>Esc = Reset | BackSpace = Delete | Enter = Result</h2>
      </div>
    </Orientation>
  );
}

export default App;
