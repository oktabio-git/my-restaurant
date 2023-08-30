import { IIngredient } from "./Ingredient";
import { ICategory } from "./category";
import { IUnit } from "./unit";

export interface IContext {
    ingredients: IIngredient[];
    categories: ICategory[];
    units: IUnit[];
    cartIngreds: IIngredient[];
    // setIngredients: () => Promise<void>;
}

export const contextState: IContext = {
    ingredients: [],
    categories: [],
    units: [],
    cartIngreds: [],
    // setIngredients: async () => {},
};
