import Card from "../UI/Card";
import style from "./AvailableMeals.module.css";
import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";
function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://web-meals-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something Wrong !");
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    // i use fetchMeals.catch >>> because fetchMeals is promise and async function with promise can't use try catch you should use then catch block
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={style.LoadingMeal}>
        <p>Loading Meals ...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={style.ErrorMeal}>
        <p>{httpError}</p>
      </section>
    );
  }
  const MealsList = meals.map((meals) => (
    <MealItem
      id={meals.id}
      key={meals.id}
      name={meals.name}
      description={meals.description}
      price={meals.price}
    />
  ));
  return (
    <section className={style.meals}>
      <Card>
        <ul>{MealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
