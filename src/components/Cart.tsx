import { Box } from "@mui/material";
import IngredientsTable from "./IngredientsTable";
import { ICategory } from "../interfaces/category";
import { IUnit } from "../interfaces/unit";
import { IIngredient } from "../interfaces/Ingredient";

type IProps = {
    categories: ICategory[];
    units: IUnit[];
    ingredients: IIngredient[];
    setIngredients: (data: IIngredient[]) => void;
};

const Cart: React.FC<IProps> = ({
    categories,
    units,
    ingredients,
    setIngredients,
}) => {
    return (
        <Box>
            <IngredientsTable
                setIngredients={setIngredients}
                categories={categories}
                units={units}
                ingredients={ingredients}
            />
        </Box>
    );
};
export default Cart;
