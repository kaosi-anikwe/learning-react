import MealItem from "./MealItem";
import { useHttp } from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};

export default function Meals() {
  const {
    isLoading,
    data: meals,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (error) {
    return <Error title="Failed to fetch meals" message={error.message} />;
  }

  return (
    <ul id="meals">
      {isLoading && <p className="center">Fetching meals...</p>}
      {!isLoading &&
        meals.length > 0 &&
        meals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
    </ul>
  );
}
