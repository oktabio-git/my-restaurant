import _ from "lodash";
import { IIngredient } from "../interfaces/Ingredient";

type IProps = IIngredient;

function Table(): React.FC<IProps> {
    const Ingredient = ({
        id,
        name,
        category,
        quantity,
        unit,
        deleteIngredient,
    }) => {
        return (
            <tr key={id}>
                <th scope="row">{id}</th>
                <td>{name}</td>
                <td>{category}</td>
                <td>{quantity}</td>
                <td>{unit}</td>
                <td>
                    <button
                        className="btn btn-danger mt-3 me-2"
                        onClick={() => deleteIngredient(id)}
                    >
                        Disabled
                    </button>
                </td>
            </tr>
        );
    };

    const deleteIngredient = (id) => {
        setIngredients(
            ingredients.filter((ingredient) => ingredient.id !== id)
        );
    };

    return (
        <table className="table text-start">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit of Measure</th>
                </tr>
            </thead>
            <tbody>
                {!_.isEmpty(ingredients) ? (
                    ingredients.map((ingredient) => (
                        <Ingredient
                            key={ingredient.id}
                            {...ingredient}
                            deleteIngredient={deleteIngredient}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">
                            {" "}
                            Not ingredients available yet. Please add new
                            ingredients to the fridge.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Table;
