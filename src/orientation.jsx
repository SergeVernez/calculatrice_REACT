// composant pour rotation d'écran
import React, { useEffect, useState } from 'react';

const Orientation = ({ children }) => {
    const [orientation, setOrientation] = useState(window.innerWidth > window.innerHeight ? "landscape" : "portrait");

    useEffect(() => {
        const handleOrientationChange = () => {
            setOrientation(window.innerWidth > window.innerHeight ? "landscape" : "portrait");
        }; // SI(la largeur de la fenêtre est plus grande que la hauteur de la fenêtre) ALORS orientation = "landscape" SINON orientation = "portrait". ?  est une abréviation de if/else

        // Ajouter d'un écouteur d'événement pour détecter les changements de taille de la fenêtre
        window.addEventListener("resize", handleOrientationChange);
        return () => {
            window.removeEventListener("resize", handleOrientationChange);
        };
    }, []);

    // Retourner une fonction de nettoyage pour supprimer l'écouteur d'événement (return)
    return (
        <div>
            <div className={orientation === "portrait" ? "app-content" : "app-content hidden"}>
                {children} 
                {/* {chidren} = prop react désignant les enfants */}
            </div>
            {/* /!\ "portrait" est une valeur d'état pour indiquer l'orientation de l'écran (chaine de caractère).
            "app-content" et "hidden" sont des classes CSS appliquées en fonction de cette valeur d'état. */}
            <div className="landscape-warning">
                Veuillez passer en mode portrait pour continuer 🙂
            </div>
        </div>
    );
};

export default Orientation;
