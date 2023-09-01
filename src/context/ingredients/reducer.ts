import { Reducer } from "react";
import { IngredientsContextStruct } from "./state";
import { ActionType, IngredientActions } from "./actions";

export const ingredientReducer: Reducer<
    IngredientsContextStruct,
    IngredientActions
> = (state, action) => {
    switch (action.type) {
        case ActionType.IngredientList:
            return {
                ...state,
                ingredients: [...action.payload],
            };
        case ActionType.CategoryList:
            return {
                ...state,
                categories: [...action.payload],
            };
        case ActionType.UnitList:
            return { ...state, units: [...action.payload] };
        default:
            return state;
    }
};
