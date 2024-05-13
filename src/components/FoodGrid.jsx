import useFetch from "../hooks/useFetch"
import Meal from "./Meal";

async function fetchMeals() {
    return fetch('http://localhost:3000/meals')
}

export default function FoodGrid() {
    const [fetchedMeals, isFetching, fetchingMealsError] = useFetch([], fetchMeals);

    return <section id="meals">
        {fetchedMeals.map(meal => <Meal key={meal.id} meal={meal} />)}
    </section>
}