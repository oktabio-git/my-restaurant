import { Box, Button, Container } from "@mui/material";
import IngredientsTable from "./IngredientsTable";
import { IIngredient } from "../interfaces/ingredient";
import { useContext, useState } from "react";
import IngredientContext from "../context/ingredients/context";

type IProps = {
    setIngredients: (data: IIngredient[]) => void;
};

const Cart: React.FC<IProps> = ({ setIngredients }) => {
    const [cartFlag, setCartFlag] = useState<boolean>(true);

    return (
        <Box mt={2}>
            <Container maxWidth="md">
                <IngredientsTable
                    setIngredients={setIngredients}
                    cartFlag={cartFlag}
                />
                <Box mt={2}>
                    <Button variant="contained" href="/fridge">
                        Back to Shop
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};
export default Cart;
