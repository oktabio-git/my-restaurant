import { ICategory } from "../../interfaces/category";
import { IIngredient } from "../../interfaces/ingredient";
import { IUnit } from "../../interfaces/unit";

export interface IngredientsContextStruct {
    ingredients: IIngredient[];
    ingredient: IIngredient;
    ingredientToEdit: IIngredient;
    categories: ICategory[];
    units: IUnit[];
    listIngredients: () => Promise<void>;
    listCategories: () => Promise<void>;
    listUnits: () => Promise<void>;
}

export const initialState: IngredientsContextStruct = {
    ingredients: [],
    ingredient: null!,
    ingredientToEdit: null!,
    categories: [],
    units: [],
    listIngredients: async () => {},
    listCategories: async () => {},
    listUnits: async () => {},
};
