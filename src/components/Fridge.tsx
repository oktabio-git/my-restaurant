import Form from "./Form";
import Tabs from "./Tabs";
import Table from "./Table";
import categories from "../assets/categories.json";
import units from "../assets/units.json";
import { useState } from "react";
import { IIngredient } from "../interfaces/Ingredient";

type IProps = {
    ingredients: IIngredient[];
    setIngredients: (data: IIngredient[]) => void;
};

const Fridge: React.FC<IProps> = ({ ingredients, setIngredients }) => { // Check about FC
    const [visible, setVisible] = useState(false);
    const handleToggle = () => {
        setVisible((current) => !current);
    };
    const handleOnSubmit = (ingredient: IIngredient) => {
        console.log(ingredient);
        setIngredients([ingredient, ...ingredients]);
    };

    return (
        <div className="row mt-3">
            <div className="col-10 offset-1">
                <Tabs />
            </div>
            <div className="col-10 offset-1">
                <div className="row">
                    <div className={`${visible ? "col-9" : "col-12"}`}>
                        {/* <Table /> */}
                        <button
                            className="btn btn-primary w-25 mt-3"
                            onClick={handleToggle}
                        >
                            + New Ingredient
                        </button>
                    </div>
                    {visible && (
                        <div className="col-3">
                            <Form
                                handleOnSubmit={handleOnSubmit}
                                categories={categories}
                                units={units}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Fridge;
