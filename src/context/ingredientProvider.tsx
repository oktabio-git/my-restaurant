import React from "react";
import { IContext, contextState } from "../interfaces/context";

export const defaultContext = React.createContext<IContext>({
    ...contextState,
});

export const IngredientContextProvider: React.FC = ({ children }) => {
    const initialState = { ...contextState };
    return (
        <defaultContext.Provider
            value={{
                ingredients: initialState.ingredients,
                categories: initialState.categories,
                units: initialState.units,
                cartIngreds: initialState.cartIngreds,
                // setIngredients: contextState.setIngredients,
            }}
        >
            {children}
        </defaultContext.Provider>
    );
};
