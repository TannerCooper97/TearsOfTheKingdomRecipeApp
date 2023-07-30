import classes from "./KnownRecipes.module.css";
import RecipeItem from "./RecipeItem";
import Card from "../UI/Card";
import { useEffect, useState } from "react";

const KnownRecipes = () => {
  const [meals, setMeals] = useState([]);
  const [elixers, setElixers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const mealResponse = await fetch(
          "https://totk-cookbook-default-rtdb.firebaseio.com/Meals.json"
        );

        const elixersResponse = await fetch(
          "https://totk-cookbook-default-rtdb.firebaseio.com/Elixers.json"
        );

        if (!mealResponse.ok && !elixersResponse.ok) {
          throw new Error("Something went wrong!");
        }

        const mealResponseData = await mealResponse.json();
        const elixersResponseData = await elixersResponse.json();

        const loadedMeals = [];
        const loadedElixers = [];

        for (const key in mealResponseData) {
          loadedMeals.push({
            id: key,
            name: mealResponseData[key].name,
            description: mealResponseData[key].description,
            price: mealResponseData[key].price,
            itemOne: mealResponseData[key].itemOne,
            itemTwo: mealResponseData[key].itemTwo,
            itemThree: mealResponseData[key].itemThree,
            itemFour: mealResponseData[key].itemFour,
            itemFive: mealResponseData[key].itemFive,
          });
        }

        for (const key in elixersResponseData) {
          loadedElixers.push({
            id: key,
            name: elixersResponseData[key].name,
            description: elixersResponseData[key].description,
            price: elixersResponseData[key].price,
            itemOne: elixersResponseData[key].itemOne,
            itemTwo: elixersResponseData[key].itemTwo,
            itemThree: elixersResponseData[key].itemThree,
            itemFour: elixersResponseData[key].itemFour,
            itemFive: elixersResponseData[key].itemFive,
          });
        }

        setMeals(loadedMeals);
        setElixers(loadedElixers);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    fetchRecipes();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <RecipeItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      itemOne={meal.itemOne}
      itemTwo={meal.itemTwo}
      itemThree={meal.itemThree}
      itemFour={meal.itemFour}
      itemFive={meal.itemFive}
    />
  ));

  const elixersList = elixers.map((elixer) => (
    <RecipeItem
      id={elixer.id}
      key={elixer.id}
      name={elixer.name}
      description={elixer.description}
      price={elixer.price}
      itemOne={elixer.itemOne}
      itemTwo={elixer.itemTwo}
      itemThree={elixer.itemThree}
      itemFour={elixer.itemFour}
      itemFive={elixer.itemFive}
    />
  ));

  return (
    <section className={classes.meals}>
    <div className={classes.cardEdits}>
      <Card>
        <h1>Food</h1>
        <ul>{mealsList}</ul>
      </Card>
    </div>

    <div className={classes.cardEdits}>
      <Card>
        <h1>Elixers</h1>
        <ul>{elixersList}</ul>
      </Card>
    </div>
    </section>
  );
};
export default KnownRecipes;
