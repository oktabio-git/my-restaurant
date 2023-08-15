import Form from "./Form";
// import Tabs from "./Tabs";
import IngredientsTable from "./IngredientsTable";
import categories from "../assets/categories.json";
import units from "../assets/units.json";
import { useState } from "react";
import { IIngredient } from "../interfaces/Ingredient";
import { Box, Button, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

type IProps = {
    ingredients: IIngredient[];
    setIngredients: (data: IIngredient[]) => void;
    ingredient?: IIngredient;
    setIngredient: (data: IIngredient) => void;
};

const Fridge: React.FC<IProps> = ({
    ingredients,
    setIngredients,
    ingredient,
    setIngredient,
}) => {
    const [editFlag, setEditFlag] = useState(false);
    // Check about FC
    const [visible, setVisible] = useState(false);
    const handleToggle = () => {
        setVisible((current) => !current);
    };
    const handleOnSubmit = (ingredient: IIngredient) => {
        setIngredients([ingredient, ...ingredients]);
    };
    const handleOnSubmitEdit = (ingredient: IIngredient) => {
        const updatedIngs = ingredients.findIndex((ing) => {
            return ing.id === ingredient.id;
        })
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
