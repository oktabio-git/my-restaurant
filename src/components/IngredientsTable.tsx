import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { IIngredient } from "../interfaces/Ingredient";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ICategory } from "../interfaces/category";
import { IUnit } from "../interfaces/unit";

type IProps = {
    ingredients: IIngredient[];
    setIngredients: (data: IIngredient[]) => void;
    handleOnEdit: (data: IIngredient ) => void;
    categories: ICategory[];
    units: IUnit[];
};

const IngredientsTable: React.FC<IProps> = ({
    ingredients,
    setIngredients,
    handleOnEdit,
    categories,
    units,
}) => {
    const deleteIngredient = (id: string) => {
        setIngredients(
            ingredients.filter(
                (ingredient: IIngredient) => ingredient.id !== id
            )
        );
    };
    const editIngredient = (ing: IIngredient) => {
        handleOnEdit(ing);
    };
    const showCategory = (id: number): string => {
        const category = categories.find((category) => {
            return category.value === +id;
        });
        return category?.label || "";
    };
    const showUnit = (id: number): string => {
        const unit = units.find((unit) => {
            return unit.value === +id;
        });
        return unit?.label || "";
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Category</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Unit of measure</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ingredients.map((ingredient) => (
                        <TableRow
                            key={ingredient.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {ingredient.id}
                            </TableCell>
                            <TableCell align="center">
                                {ingredient.name}
                            </TableCell>
                            <TableCell align="center">
                                {showCategory(ingredient.category)}
                            </TableCell>
                            <TableCell align="center">
                                {ingredient.quantity}
                            </TableCell>
                            <TableCell align="center">
                                {showUnit(ingredient.unit)}
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    color="primary"
                                    aria-label="edit"
                                    onClick={() => editIngredient(ingredient)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    aria-label="delete"
                                    onClick={() =>
                                        deleteIngredient(ingredient.id)
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default IngredientsTable;
