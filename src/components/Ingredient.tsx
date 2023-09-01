import { IIngredient } from "../interfaces/ingredient";

type IProps = {
    ingredient: IIngredient;
    deleteIngredient: (id: string) => void;
};

const Ingredient: React.FC<IProps> = ({ ingredient, deleteIngredient }) => {
    const { id, name, category, quantity, unit } = ingredient;
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

export default Ingredient;
