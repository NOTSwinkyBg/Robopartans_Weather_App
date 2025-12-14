import Layout from "./components/Layout";
import Weather from "./pages/WeatherApp";
import Entertaiment from "./pages/Entertaiment";
import About from "./pages/About";
import { Route, Routes } from "react-router-dom";

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Weather/>} />
        <Route path="games" element={<Entertaiment />} />
        <Route path="about" element={<About />}/>
      </Route>
    </Routes>
  );
}