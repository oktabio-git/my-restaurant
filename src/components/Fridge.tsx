import Form from "./Form";
import IngredientsTable from "./IngredientsTable";
import { useCallback, useContext, useState } from "react";
import { IIngredient } from "../interfaces/Ingredient";
import { Box, Button, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import useFetch from "../hooks/useFetch";
import { defaultContext } from "../App";

type IProps = {
    setIngredients: (data: IIngredient[]) => void;
    setCartIngred: (data: IIngredient[]) => void;
};

const Fridge: React.FC<IProps> = ({ setIngredients, setCartIngred }) => {
    const { ingredients, categories, units, cartIngreds } =
        useContext(defaultContext);
    const [ingredient, setIngredient] = useState<IIngredient>();
    const { getApis, postApis, updateApis } = useFetch();
    const [editFlag, setEditFlag] = useState(false);
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState("1");
    const handleToggle = () => {
        setVisible((current) => !current);
    };
    const handleOnSubmit = useCallback(async (ingredient: IIngredient) => {
        await postApis("ingredients", ingredient);
        getIngredients();
    }, []);
    const getIngredients = useCallback(async () => {
        const resIngredients = await getApis("ingredients");
        setIngredients(resIngredients);
    }, []);
    const getCartIngredients = useCallback(async () => {
        const resIngredients = await getApis("cart");
        setCartIngred(resIngredients);
    }, []);
    const handleOnSubmitEdit = (ingredient: IIngredient) => {
        const updatedIngs = ingredients.findIndex((ing) => {
            return ing.id === ingredient.id;
        });
        ingredients[updatedIngs] = ingredient;
        setIngredients(ingredients);
        setEditFlag(false);
    };
    const handleOnEdit = (ingredient: IIngredient) => {
        setIngredient(ingredient);
        setEditFlag(true);
    };
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const handleOnCart = async (id: string) => {
        const indexIng = ingredients.findIndex((ingred: IIngredient) => {
            return ingred.id === id;
        });
        const cartIndex = cartIngreds.findIndex((ingred: IIngredient) => {
            return ingred.id === id;
        });
        let tempIngred = { ...ingredients[indexIng] };
        if (ingredients[indexIng].quantity > 1) {
            ingredients[indexIng].quantity--;
        } else {
            ingredients[indexIng].quantity--;
            ingredients[indexIng].status = false;
        }
        if (cartIndex > 0) {
            cartIngreds[cartIndex].quantity++;
            await updateApis("cart", id, cartIngreds[cartIndex]);
        } else {
            tempIngred.quantity = 1;
            await postApis("cart", tempIngred);
        }
        await updateApis("ingredients", id, ingredients[indexIng]);
        await getIngredients();
        await getCartIngredients();
    };

    return (
        <TabContext value={value}>
            
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                >
                    <Tab label="Available" value="1" />
                    <Tab label="Not Available" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1">
                <Grid container spacing={2}>
                    <Grid item xs={visible ? 9 : 12} xl={visible ? 9 : 12}>
                        <IngredientsTable
                            ingredients={ingredients.filter(
                                (ing) => ing.status
                            )}
                            setIngredients={setIngredients}
                            handleOnEdit={handleOnEdit}
                            handleOnCart={handleOnCart}
                            categories={categories}
                            units={units}
                        />
                        <Box mt={2}>
                            <Button variant="contained" onClick={handleToggle}>
                                + New Ingredient
                            </Button>
                        </Box>
                    </Grid>
                    {visible && (
                        <Grid item xs={3} xl={3}>
                            <Form
                                handleOnSubmit={handleOnSubmit}
                                handleOnSubmitEdit={handleOnSubmitEdit}
                                categories={categories}
                                units={units}
                                editFlag={editFlag}
                                ingredient={ingredient}
                            />
                        </Grid>
                    )}
                </Grid>
            </TabPanel>
            <TabPanel value="2">
                <Grid container spacing={2}>
                    <Grid item xs={visible ? 9 : 12} xl={visible ? 9 : 12}>
                        <IngredientsTable
                            ingredients={ingredients.filter(
                                (ing) => !ing.status
                            )}
                            setIngredients={setIngredients}
                            handleOnEdit={handleOnEdit}
                            handleOnCart={handleOnCart}
                            categories={categories}
                            units={units}
                        />
                        <Box mt={2}>
                            <Button variant="contained" onClick={handleToggle}>
                                + New Ingredient
                            </Button>
                        </Box>
                    </Grid>
                    {visible && (
                        <Grid item xs={3} xl={3}>
                            <Form
                                handleOnSubmit={handleOnSubmit}
                                handleOnSubmitEdit={handleOnSubmitEdit}
                                categories={categories}
                                units={units}
                                editFlag={editFlag}
                                ingredient={ingredient}
                            />
                        </Grid>
                    )}
                </Grid>
            </TabPanel>
        </TabContext>
    );
};
export default Fridge;
