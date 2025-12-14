import React, {useState, useEffect} from "react";

const EasterEgg: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [clicks, setClicks] = useState(0);
    const [jumpscare, setJumpscare] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);
    
    const [position, setPosition] = useState({top: '50%', left: '50%'});

    var audio = new Audio("five-nights-at-freddys-2-full-scream-sound.mp3")

    //Логика за случайно появяване
    useEffect(() => {
        const randomTime = Math.random() * (30000 - 10000) + 10000;
        
        const timer = setTimeout(() => {
            if(!jumpscare && !saved){
                const randomTop = Math.floor(Math.random() * 80) + 10;
                const randomLeft = Math.floor(Math.random() * 80 + 10);

                setPosition({top: `${randomTop}%`, left: `${randomLeft}%`});

                setIsVisible(true);
                
            }
        }, randomTime);

        return () => clearTimeout(timer);
    }, [jumpscare, saved, isVisible]);

    //Логика за провал
    useEffect(() => {
        let failTimer: ReturnType<typeof setTimeout>;
        if(isVisible && !saved){
            failTimer = setTimeout(() => {
                setJumpscare(true);
                audio.play();
                setIsVisible(false);
                setTimeout(() => setJumpscare(false), 3000);
            }, 5000)
        }
        return () => clearTimeout(failTimer)
    }, [isVisible, saved])

    //Логика при клик
    const handleClick = () => {
        const newClicks = clicks + 1;
        setClicks(newClicks);
        if(newClicks >= 10){
            setSaved(true);
            setIsVisible(false);
            setTimeout(() => {
                setSaved(false);
                setClicks(0);
            }, 5000)
        }
    };

    if(jumpscare){
        return(
            <div className="fixed inset-0 z-100 bg-black flex items-center justify-center
            animate-pulse">
                <img src="foxy-jump.gif" 
                alt="Jumpscare"
                className="w-full h-full object-cover" />
                

            </div>
        )
    }

    if(saved) {
        return (
            <div className="fixed top-2 right-5 z-50 bg-green-500 text-white p-4 
            rounded-xl shadow-2xl animate-bounce">
                УСПЯ! Призракът е прогонен!
            </div>
        );
    }

    if(!isVisible){
        return null;
    }

    return(
        <div
            onClick={handleClick}
            className="fixed z-50 cursor-pointer select-none transition-all duration-100
            active:scale-90 animate-wiggle"
            style={{
                top: position.top,
                left: position.left,
                transform: 'translate(-50%, -50%)'
            }}
        >
            <div className="relative">
                <span className="text-8xl drop-shadow-2xl filter brightness-110">
                    👻
                </span>
                <div className="absolute -top-4 -right-4 bg-red-600 text-white w-10 h-10
                rounded-full flex items-center font-bold border-2 border-white">
                    {10-clicks}
                </div>
                <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/70 
                text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    КЛИКАЙ БЪРЗО!!!
                </p>
            </div>
        </div>
    );
};

export default EasterEgg;