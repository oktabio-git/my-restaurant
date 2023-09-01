import { IngredientsContextStruct } from "./state";

export enum ActionType {
    IngredientList,
    CategoryList,
    UnitList,
}

export interface IngredientList {
    type: ActionType.IngredientList;
    payload: IngredientsContextStruct["ingredients"];
}

export interface CategoryList {
    type: ActionType.CategoryList;
    payload: IngredientsContextStruct["categories"];
}

export interface UnitList {
    type: ActionType.UnitList;
    payload: IngredientsContextStruct["units"];
}

export type IngredientActions = IngredientList | CategoryList | UnitList;
