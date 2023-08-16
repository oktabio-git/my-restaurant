import { useState } from "react";
import "./App.css";
import { IIngredient } from "./interfaces/Ingredient";
import Navbar from "./components/Navbar";
import Fridge from "./components/Fridge";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/fridge" element={<Fridge></Fridge>}></Route>
                <Route path="/*" element={<Home></Home>}></Route>
            </Routes>
        </div>
    );
}

export default App;
