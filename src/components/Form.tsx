import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ICategory } from "../interfaces/category";
import { IUnit } from "../interfaces/unit";
import { IIngredient } from "../interfaces/Ingredient";
import { Button, Container, MenuItem, Stack, TextField } from "@mui/material";
import axios from "axios";

type IProps = {
    handleOnSubmit: (ingredient: IIngredient) => void;
    handleOnSubmitEdit: (ingredient: IIngredient) => void;
    categories: ICategory[];
    units: IUnit[];
    ingredient?: IIngredient;
    editFlag: boolean;
};

const Form: React.FC<IProps> = ({
    handleOnSubmit,
    handleOnSubmitEdit,
    categories,
    units,
    ingredient,
    editFlag,
}) => {
    // const createIngredient = (ingredient: IIngredient) => {
    //     try {
    //         const url = "http://localhost:3000";
    //         const response = axios.post<IIngredient>(
    //             `${url}/ingredients`,
    //             ingredient
    //         );
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const [formIngredient, setFormIngredient] = useState<IIngredient>({
        id: "",
        name: "",
        category: 0,
        quantity: 0,
        unit: 0,
    });
    const [formError, setErrorForm] = useState({
        nameError: false,
        categoryError: false,
        quantityError: false,
        unitError: false,
    });
    const { name, category, quantity, unit } = formIngredient;
    useEffect(() => {
        if (editFlag) {
            setFormIngredient({
                id: ingredient ? ingredient.id : "",
                name: ingredient ? ingredient.name : "",
                category: ingredient ? ingredient.category : 0,
                quantity: ingredient ? ingredient.quantity : 0,
                unit: ingredient ? ingredient.unit : 1,
            });
        }
    }, [editFlag]);

    // Separar las funcionalidades por dos botones distintos.
    // ?? ||
    // Limpiar el formulario.
    // Diferencia entre value y value

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const values = [name, category, quantity, unit];

        const allFieldComplete = values.every((field) => {
            const value = `${field}`.trim();
            return value !== "" && value !== "0";
        });

        if (allFieldComplete) {
            const formIngredient: IIngredient = {
                id: editFlag ? ingredient?.id! : uuidv4(),
                name,
                category,
                quantity,
                unit,
            };
            if (editFlag) {
                handleOnSubmitEdit(formIngredient);
                setFormIngredient({
                    id: "",
                    name: "",
                    category: 0,
                    quantity: 0,
                    unit: 0,
                });
            } else {
                // createIngredient(formIngredient);
                handleOnSubmit(formIngredient);
                setFormIngredient({
                    id: "",
                    name: "",
                    category: 0,
                    quantity: 0,
                    unit: 0,
                });
            }
        } else {
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        if (value === "0" || value === "")
            setErrorForm({ ...formError, [name + "Error"]: true });
        else setErrorForm({ ...formError, [name + "Error"]: false });

        setFormIngredient((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCancel = () => {};

    const categoryData = categories.map((category) => {
        return (
            <MenuItem key={category.value} value={category.value}>
                {category.label}
            </MenuItem>
        );
    });

    const unitData = units.map((unit) => {
        return (
            <MenuItem key={unit.value} value={unit.value}>
                {unit.label}
            </MenuItem>
        );
    });

    return (
        <Container maxWidth="sm">
            <form onSubmit={(event) => onSubmit(event)} noValidate>
                <Stack spacing={2}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        name="name"
                        value={name}
                        onChange={(event) => handleInputChange(event)}
                        error={formError.nameError}
                        helperText={
                            formError.nameError
                                ? "The field can't be empty."
                                : ""
                        }
                    />

                    <TextField
                        select
                        label="Select"
                        name="category"
                        value={category}
                        onChange={(event) => handleInputChange(event)}
                        error={formError.categoryError}
                        helperText={
                            formError.categoryError
                                ? "Please select a category."
                                : ""
                        }
                    >
                        <MenuItem key={0} value={0}>
                            Select an option
                        </MenuItem>
                        {categoryData}
                    </TextField>

                    <TextField
                        label="Quantity"
                        variant="outlined"
                        name="quantity"
                        value={quantity}
                        onChange={(event) => handleInputChange(event)}
                        error={formError.quantityError}
                        helperText={
                            formError.quantityError
                                ? "The field can't be less than one."
                                : ""
                        }
                    />

                    <TextField
                        select
                        label="Select"
                        name="unit"
                        value={unit}
                        onChange={(event) => handleInputChange(event)}
                        error={formError.unitError}
                        helperText={
                            formError.unitError
                                ? "Please select a unit of measure."
                                : ""
                        }
                    >
                        <MenuItem key={0} value={0}>
                            Select an option
                        </MenuItem>
                        {unitData}
                    </TextField>

                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            color={editFlag ? "secondary" : "primary"}
                        >
                            {editFlag ? "Update" : "Submit"}
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Container>
    );
};

export default Form;
