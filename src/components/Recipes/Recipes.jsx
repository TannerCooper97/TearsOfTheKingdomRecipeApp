import RecipeSummery from "./RecipeSummery";
import KnownRecipes from "./KnownRecipes";
import classes from './Recipes.module.css';

const Meals = () => {  
    return (
        <div className={classes.recipeBody}>
        <RecipeSummery />
        <KnownRecipes />
        </div>
    );
    }
export default Meals;