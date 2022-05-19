import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setErrormsg] = useState(false);
  const [errorMsg, setErrormsgdescripton] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      try {
        const d = await fetch(
          "https://foodapp-998c4-default-rtdb.firebaseio.com/meals.json",
          {
            method: "GET",
          }
        );
        const Meals_data = [];
        const data = await d.json();
        for (const key in data) {
          Meals_data.push({
            id: key,
            name: data[key].Name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(Meals_data);
        setIsLoading(false);
      } catch (e) {
        setErrormsgdescripton("Something Went Wrong");
        setErrormsg(true);
      }
    };
    fetchMeals();
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return (
      <section>
        <p className={classes.MealsLoading}>Loading...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section>
        <p className={classes.MealsLoading}>{errorMsg}</p>
      </section>
    );
  }
  const mealsList = meals.map((ele) => (
    <MealItem
      key={ele.id}
      id={ele.id}
      name={ele.name}
      description={ele.description}
      price={ele.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
