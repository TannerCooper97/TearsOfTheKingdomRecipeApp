import { useRef, useState } from "react";
import useHTTP from "../../hooks/useHTTP";
import classes from "./NewForm.module.css";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import SelectInput from "../UI/SelectInput";
import options from "./options";
import CustomAlert from "../UI/CustomAlert";

const NewForm = (props) => {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const itemOneRef = useRef();
  const itemTwoRef = useRef();
  const itemThreeRef = useRef();
  const itemFourRef = useRef();
  const itemFiveRef = useRef();
  const [selectedType, setSelectedType] = useState("");
  const [showErrorAlert, setErrorShowAlert] = useState(false);
  const [showSuccessAlert, setSuccessShowAlert] = useState(false);
  const [selectedOptionOne, setSelectedOptionOne] = useState("");
  const [selectedOptionTwo, setSelectedOptionTwo] = useState("");
  const [selectedOptionThree, setSelectedOptionThree] = useState("");
  const [selectedOptionFour, setSelectedOptionFour] = useState("");
  const [selectedOptionFive, setSelectedOptionFive] = useState("");
  const { loading, error, makeRequest } = useHTTP();

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      price: parseInt(priceRef.current.value),
      itemOne: itemOneRef.current.value,
      itemTwo: itemTwoRef.current.value,
      itemThree: itemThreeRef.current.value,
      itemFour: itemFourRef.current.value,
      itemFive: itemFiveRef.current.value,
    };

    const FormValidity =
      product.itemOne !== "Select an Item" &&
      product.itemTwo !== "Select an Item" &&
      product.itemThree !== "Select an Item" &&
      product.itemFour !== "Select an Item" &&
      product.itemFive !== "Select an Item" &&
      product.name !== "" &&
      product.description !== "";

    if (selectedType === "food" && FormValidity) {
      // Make a POST request when the form is submitted
      makeRequest(
        "https://totk-cookbook-default-rtdb.firebaseio.com/Meals.json",
        "post",
        product
      );
      console.log("POST request for Food:", product);
      setSuccessShowAlert(true); // Show success alert after successful form submission
    } else if (selectedType === "elixer" && FormValidity) {
      // Make a POST request when the form is submitted
      makeRequest(
        "https://totk-cookbook-default-rtdb.firebaseio.com/Elixers.json",
        "post",
        product
      );
      console.log("POST request for Elixer:", product);
      setSuccessShowAlert(true); // Show success alert after successful form submission
    } else {
      setErrorShowAlert(true); // Show the error alert when the conditions in the empty 'else' statement are met
    }

    // Clear the form fields after submission
    nameRef.current.value = "";
    descriptionRef.current.value = "";
    priceRef.current.value = "";
    itemOneRef.current.value = "Select an Item";
    itemTwoRef.current.value = "Select an Item";
    itemThreeRef.current.value = "Select an Item";
    itemFourRef.current.value = "Select an Item";
    itemFiveRef.current.value = "Select an Item";
  };

  const handleConfirmAlert = () => {
    console.log("Custom alert confirmed");
    setErrorShowAlert(false);
  };

  const handleConfirmSuccessAlert = () => {
    setSuccessShowAlert(false); // Hide the success alert on confirmation
    props.onCloseForm(); // Close the form on confirmation
  };

  const handleOptionChange = (ref, value) => {
    if (ref.current === itemOneRef.current) {
      setSelectedOptionOne(value);
    } else if (ref.current === itemTwoRef.current) {
      setSelectedOptionTwo(value);
    } else if (ref.current === itemThreeRef.current) {
      setSelectedOptionThree(value);
    } else if (ref.current === itemFourRef.current) {
      setSelectedOptionFour(value);
    } else if (ref.current === itemFiveRef.current) {
      setSelectedOptionFive(value);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Modal onClose={props.onCloseForm}>
      <h4>Please Enter A New Recipe</h4>
      <form className={classes.actions} onSubmit={handleSubmit}>
        <Input
          label="Name"
          input={{
            id: "name" + props.id,
            type: "text",
            ref: nameRef,
            // required: true,
          }}
        />
        <Input
          label="Description"
          input={{
            id: "description",
            type: "text",
            ref: descriptionRef,
            // required: true,
          }}
        />

        <div className={classes.selectionSection}>
          <div className={classes.selections}>
            <div className={classes.selectionContainers}>
              <p className={classes.selectHeaders}>
                Item 1: {selectedOptionOne}
              </p>
              <SelectInput
                className={classes.selectFields}
                ref={itemOneRef}
                options={options}
                value={selectedOptionOne}
                onChange={(value) => handleOptionChange(itemOneRef, value)}
              />
            </div>
            <div className={classes.selectionContainers}>
              <p>Item 2: {selectedOptionTwo}</p>
              <SelectInput
                ref={itemTwoRef}
                options={options}
                value={selectedOptionTwo}
                onChange={(value) => handleOptionChange(itemTwoRef, value)}
              />
            </div>
            <div className={classes.selectionContainers}>
              <p>Item 3: {selectedOptionThree}</p>
              <SelectInput
                ref={itemThreeRef}
                options={options}
                value={selectedOptionThree}
                onChange={(value) => handleOptionChange(itemThreeRef, value)}
              />
            </div>
            <div className={classes.selectionContainers}>
              <p>Item 4: {selectedOptionFour}</p>
              <SelectInput
                ref={itemFourRef}
                options={options}
                value={selectedOptionFour}
                onChange={(value) => handleOptionChange(itemFourRef, value)}
              />
            </div>
            <div className={classes.selectionContainers}>
              <p>Item 5: {selectedOptionFive}</p>
              <SelectInput
                ref={itemFiveRef}
                options={options}
                value={selectedOptionFive}
                onChange={(value) => handleOptionChange(itemFiveRef, value)}
              />
            </div>
          </div>
        </div>
        <Input
          label="Price"
          input={{
            id: "price",
            type: "number",
            ref: priceRef,
            step: 1,
            max: 999,
            // required: true,
          }}
        />
        <Input
          label="Food"
          input={{
            id: "food",
            type: "radio",
            checked: selectedType === "food",
            onChange: () => setSelectedType("food"),
            // required: true,
          }}
        />
        <Input
          label="Elixer"
          input={{
            id: "elixer",
            type: "radio",
            checked: selectedType === "elixer",
            onChange: () => setSelectedType("elixer"),
            // required: true,
          }}
        />
        <button onClick={props.onCloseForm} className={classes["button--alt"]}>
          Cancel
        </button>
        <button className={classes.button} type="submit">
          Submit
        </button>
      </form>
      {showErrorAlert && (
        <CustomAlert
          title="Form Error"
          message="Please fill out all fields and select an item for each slot."
          onConfirm={handleConfirmAlert}
        />
      )}
      {showSuccessAlert && (
        <CustomAlert
          title="Recipe Added!"
          message="Your Recipe has been added to the database."
          onConfirm={handleConfirmSuccessAlert}
        />
      )}
    </Modal>
  );
};

export default NewForm;
