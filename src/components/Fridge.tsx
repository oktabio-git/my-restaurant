import Form from "./Form";
import IngredientsTable from "./IngredientsTable";
import { useEffect, useState } from "react";
import { IIngredient } from "../interfaces/Ingredient";
import { Box, Button, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ICategory } from "../interfaces/category";
import { IUnit } from "../interfaces/unit";
import useFetch from "../hooks/useFetch";

const Fridge: React.FC = () => {
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);
    const [ingredient, setIngredient] = useState<IIngredient>();
    const { getApis, postApis } = useFetch();
    const [editFlag, setEditFlag] = useState(false);
    const [visible, setVisible] = useState(false);
    const handleToggle = () => {
        setVisible((current) => !current);
    };
    const handleOnSubmit = (ingredient: IIngredient) => {
        postApis("ingredients", ingredient);
        
    };
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
    const [value, setValue] = useState("1");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [units, setUnits] = useState<IUnit[]>([]);
    useEffect(() => {
        (async () => {
            const categories = await getApis("categories");
            setCategories(categories);
            const units = await getApis("units");
            setUnits(units);
            const resIngredients = await getApis("ingredients");
            setIngredients(resIngredients);
        })();
    }, []);
    useEffect(() => {
        (async () => {
            const resIngredients = await getApis("ingredients");
            setIngredients(resIngredients);
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
                            ingredients={ingredients}
                            setIngredients={setIngredients}
                            handleOnEdit={handleOnEdit}
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
            <TabPanel value="2">Item Two</TabPanel>
        </TabContext>
    );
};
export default Fridge;
