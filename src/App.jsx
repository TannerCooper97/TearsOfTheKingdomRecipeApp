import { useState } from "react";
import Header from "./components/Layout/Header";
import Recipes from "./components/Recipes/Recipes";
import NewForm from "./components/NewRecipes/NewForm";

function App() {
  const [showForm, setShowForm] = useState(false);

  const showFormHandler = () => {
    setShowForm(true);
  };

  const hideFormHandler = () => {
    setShowForm(false);
  };


  return (
    <>
      {showForm && <NewForm onCloseForm={hideFormHandler}/>}
      <Header onShowForm={showFormHandler}/>
      <main>
      <Recipes/>
      </main>
    </>
  );
}

export default App;
