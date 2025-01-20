import React, { useEffect, useState } from 'react';

const Orientation = ({ children }) => {
    const [orientation, setOrientation] = useState(window.innerWidth > window.innerHeight ? "landscape" : "portrait");

    useEffect(() => {
        const handleOrientationChange = () => {
            setOrientation(window.innerWidth > window.innerHeight ? "landscape" : "portrait");
        };

        window.addEventListener("resize", handleOrientationChange);
        return () => {
            window.removeEventListener("resize", handleOrientationChange);
        };
    }, []);

    return (
        <div>
            <div className={orientation === "portrait" ? "app-content" : "app-content hidden"}>
                {children}
            </div>
            <div className="landscape-warning">
                Veuillez passer en mode portrait pour continuer 🙂
            </div>
        </div>
    );
};

export default Orientation;
