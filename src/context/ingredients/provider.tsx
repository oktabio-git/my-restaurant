import { ReactNode, useReducer } from "react";
import IngredientContext from "./context";
import { IngredientsContextStruct, initialState } from "./state";
import { ingredientReducer } from "./reducer";
import { ActionType } from "./actions";
import useFetch from "../../hooks/useFetch";

type IProps = {
    children: ReactNode;
};

export const IngredientContextProvider: React.FC<IProps> = ({ children }) => {
    const [state, dispatch] = useReducer(ingredientReducer, initialState);
    const { getApis } = useFetch();

    const listIngredients = async (): Promise<void> => {
        try {
            let data: IngredientsContextStruct["ingredients"] = await getApis(
                "ingredients"
            );
            
            dispatch({
                type: ActionType.IngredientList,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const listCategories = async (): Promise<void> => {
        try {
            let data: IngredientsContextStruct["categories"] = await getApis(
                "categories"
            );
            dispatch({
                type: ActionType.CategoryList,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const listUnits = async (): Promise<void> => {
        try {
            let data: IngredientsContextStruct["units"] = await getApis(
                "units"
            );
            dispatch({
                type: ActionType.UnitList,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <IngredientContext.Provider
            value={{
                ingredients: state.ingredients,
                ingredient: state.ingredient,
                ingredientToEdit: state.ingredientToEdit,
                categories: state.categories,
                units: state.units,
                listIngredients,
                listCategories,
                listUnits
            }}
        >
            {children}
        </IngredientContext.Provider>
    );
};
