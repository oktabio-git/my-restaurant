import "./App.css";
import Navbar from "./components/Navbar";
import Fridge from "./components/Fridge";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ICategory } from "./interfaces/category";
import { IUnit } from "./interfaces/unit";
import { IIngredient } from "./interfaces/Ingredient";
import useFetch from "./hooks/useFetch";
import Cart from "./components/Cart";
import React from "react";
import { IContext, contextState } from "./interfaces/context";


const App: React.FC = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [units, setUnits] = useState<IUnit[]>([]);
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);
    const [cartIngreds, setCartIngred] = useState<IIngredient[]>([]);
    const { getApis } = useFetch();

    useEffect(() => {
        (async () => {
            const categories = await getApis("categories");
            setCategories(categories);
            const units = await getApis("units");
            setUnits(units);
            const ingredients = await getApis("ingredients");
            setIngredients(ingredients);
            const cartIngreds = await getApis("cart");
            setCartIngred(cartIngreds);
        })();
    }, []);

    return (
        // <defaultContext.Provider
        //     value={{
        //         ingredients,
        //         categories,
        //         units,
        //         cartIngreds,
        //         setIngredients,
        //     }}
        // >
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route
                        path="/fridge"
                        element={
                            <Fridge
                                setIngredients={setIngredients}
                                setCartIngred={setCartIngred}
                            ></Fridge>
                        }
                    ></Route>
                    <Route
                        path="/cart"
                        element={<Cart setIngredients={setCartIngred}></Cart>}
                    ></Route>
                    <Route path="/*" element={<Home></Home>}></Route>
                </Routes>
            </div>
        // </defaultContext.Provider>
    );
};

export default App;
