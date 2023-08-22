import Form from "./Form";
import IngredientsTable from "./IngredientsTable";
import { useCallback, useEffect, useState } from "react";
import { IIngredient } from "../interfaces/Ingredient";
import { Box, Button, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ICategory } from "../interfaces/category";
import { IUnit } from "../interfaces/unit";
import useFetch from "../hooks/useFetch";

type IProps = {
    categories: ICategory[];
    units: IUnit[];
    ingredients: IIngredient[];
    cartIngred: IIngredient[];
    setIngredients: (data: IIngredient[]) => void;
};

const Fridge: React.FC<IProps> = ({
    categories,
    units,
    ingredients,
    cartIngred,
    setIngredients,
}) => {
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
        const indexIng = ingredients.findIndex((ing) => {
            return ing.id === id;
        });
        const cartIndex = cartIngred.findIndex((ing) => {
            return ing.id === id;
        });
        console.log(ingredients[indexIng]);
        if (ingredients[indexIng].quantity > 1) {
            ingredients[indexIng].quantity--;
        } else {
            ingredients[indexIng].quantity--;
            ingredients[indexIng].status = false;
        }
        console.log(ingredients[indexIng]);

        if (cartIndex > 0) {
            cartIngred[cartIndex].quantity++;
            await updateApis("cart", id, cartIngred[indexIng]);
        } else {
            let tempIng = ingredients[indexIng];
            tempIng.quantity = 1;
            await postApis("cart", tempIng);
        }
        
        
        await updateApis("ingredients", id, ingredients[indexIng]);
        await getIngredients();
    };

    useEffect(() => {
        (async () => {
            const categories = await getApis("categories");
            // setCategories(categories);
            const units = await getApis("units");
            // setUnits(units);
            const resIngredients = await getApis("ingredients");
            // setIngredients(resIngredients);
        })();
    }, []);

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
                            ingredients={ingredients.filter(ing => ing.status)}
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
                            ingredients={ingredients.filter(ing => !ing.status)}
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
