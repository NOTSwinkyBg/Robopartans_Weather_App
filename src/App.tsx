import Layout, { type PageType } from "./components/Layout";
import Weather from "./pages/WeatherApp";
import Entertaiment from "./pages/Entertaiment";
import { useState } from "react";

export default function App() {
  // Това е "сърцето" на навигацията
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  return (
    // 1. Обвиваме всичко в Layout
    // 2. Подаваме onNavigate, за да може менюто да променя страницата
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      
      {/* 3. Условно рендиране спрямо избраната страница */}
      
      {currentPage === 'home' && (
          // Тук слагате вашия WeatherApp компонент
          <Weather/>
      )}

      {currentPage === 'games' && (
          <Entertaiment />
      )}

    </Layout>
  );
}