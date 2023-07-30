import classes from "./RecipeItem.module.css";
import rupee from "../../assets/rupee2.png";

const RecipeItem = (props) => {
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
 
          <ul className={classes.resourcesList}>
            <li>{props.itemOne}</li>
            <li>{props.itemTwo}</li>
            <li>{props.itemThree}</li>
            <li>{props.itemFour}</li>
            <li>{props.itemFive}</li>
          </ul>

        <div className={classes.price}>
          <img src={rupee} alt="Legend of Zelda Rupee" />
          <p>{props.price}</p>
        </div>
      </div>
    </li>
  );
};

export default RecipeItem;
