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

const App: React.FC = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [units, setUnits] = useState<IUnit[]>([]);
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);
    const [cartIngred, setCartIngred] = useState<IIngredient[]>([]);
    const { getApis } = useFetch();

    useEffect(() => {
        (async () => {
            const categories = await getApis("categories");
            setCategories(categories);
            const units = await getApis("units");
            setUnits(units);
            const resIngredients = await getApis("ingredients");
            setIngredients(resIngredients);
            const resCartIngred = await getApis("cart");
            setCartIngred(resCartIngred);
        })();
    }, []);

    return (
        <div className="App">
            <Navbar
                categories={categories}
                units={units}
                ingredients={ingredients}
                setIngredients={setIngredients}
            />
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route
                    path="/fridge"
                    element={
                        <Fridge
                            categories={categories}
                            units={units}
                            ingredients={ingredients}
                            cartIngred={cartIngred}
                            setIngredients={setIngredients}
                        ></Fridge>
                    }
                ></Route>
                <Route
                    path="/cart"
                    element={
                        <Cart
                            categories={categories}
                            units={units}
                            ingredients={cartIngred}
                            setIngredients={setCartIngred}
                        ></Cart>
                    }
                ></Route>
                <Route path="/*" element={<Home></Home>}></Route>
            </Routes>
        </div>
    );
};

export default App;
