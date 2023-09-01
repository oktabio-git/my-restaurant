import { createContext } from "react";
import { IngredientsContextStruct, initialState } from "./state";

const IngredientContext = createContext<IngredientsContextStruct>({
    ...initialState,
});

export default IngredientContext;
