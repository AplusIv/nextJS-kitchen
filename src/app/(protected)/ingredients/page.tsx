"use clent";

import IngredientsTable from "@/components/UI/tables/Ingredients";
import IngredientForm from "@/forms/ingredient.form";

const Ingredients = () => {
  return (
    <>
      <IngredientForm />
      <IngredientsTable />
    </>
  )
}

export default Ingredients