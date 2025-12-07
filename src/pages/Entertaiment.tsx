import React, {useState} from "react";

interface Game {
    id: number;
    title: string;
    url: string;
    description: string;
    thumbnail: string;
    color: string;
};

const GAMES: Game[] = [
    {
        id: 1,
        title: 'Hextris',
        url: 'https://hextris.io/',
        description: 'Бърза пъзел игра, вдъхновена от Тетрис.',
        thumbnail: '⬢',
        color: 'from-blue-500 to-cyan-400'
    },
    {
        id: 2,
        title: 'Minecraft',
        url: 'https://classic.minecraft.net/',
        description: 'Онази класическа версия на Minecraft в браузъра ти.',
        thumbnail: '🟫',
        color: 'from-yellow-500 to-orage-400'
    },
    {
        id: 3,
        title: 'Dino Game',
        url: 'https://chromedino.com/',
        description: 'Легендарният динозавър от Chrome.',
        thumbnail: '🦖',
        color: 'from-green-500 to-emerald-400'
    },
    {
        id: 4,
        title: 'Windows 98 Emulator',
        url: 'https://98.js.org/',
        description: 'Емулатор на Windows 98 директно в браузъра ти.',
        thumbnail: '🖥️',
        color: 'from-green-500 to-emerald-400'
    },
];

const Entertaiment: React.FC = () => {
    const [activeGame, setActiveGame] = useState<Game | null>(null);

    return(
        <div className="h-full">
            {/* Заглавие */}
            {!activeGame && (
                <div className="mb-8 text-center"> 
                    <h2 className="text-4xl font-extrabold text-white mg-2">Зона за Игра</h2>
                    <p className="text-gray-400">Избери игра и разпусни директно в браузара си!!! ❤️</p>
                </div>
            )}

            {/* ЛОГИКА */}
            {activeGame ? (
                <div className="flex flex-col h-[70vh] bg-gray-800 rounded-2xl 
                overflow-hidden border border-gray-700">
                    <div className="bg-gray-300 p-3 flex justify-between items-center
                    border-b border-gray-700">
                        <button
                            onClick={() => setActiveGame(null)}
                            className="text-gray-300 hover:text-white transition flex
                            items-center space-x-2 px-3 py-1 rounded hover:bg-gray-800"
                            >
                            <span>🔙</span><span>Назад към Каталога</span>
                        </button>
                        <h3 className="text-lg font-bold text-white hidden md:block">
                            {activeGame.title}
                        </h3>
                    </div>
                    <iframe 
                        src={activeGame.url}
                        title={activeGame.title}
                        className="w-full h-full border-0"
                        allow="fullscreen" 
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {GAMES.map(game => (
                        <div
                            key={game.id}
                            onClick={() => setActiveGame(game)}
                            className="group relative bg-gray-800 rounded-2xl overflow-hidden
                            cursor-pointer hover:-translate-y-2 transition-all duration-300
                            shadow-lg hover:shadow-purple-500/20 border border-gray-700"
                        >
                            <div className={`h-32 bg-gradient-to-br ${game.color} flex
                            item-center justify-center`}>
                                <span className="text-6xl drop-shadow-md group-hover:scale-110
                                transition-transform duration-300">
                                    {game.thumbnail}
                                </span>
                            </div>   
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
                                <p className="text-gray-400 text-sm">{game.description}</p>
                                <div className="mt-4 text-blue-400 font-bold text-sm group-hover:translate-x-2 
                                transition-transform">
                                    Играй &rarr;
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        
    )
};

export default Entertaiment;