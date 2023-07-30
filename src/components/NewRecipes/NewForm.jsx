import { useRef, useState } from "react";
import classes from "./NewForm.module.css";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import SelectInput from "../UI/SelectInput";
import options from "./options";

const NewForm = (props) => {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const itemOneRef = useRef();
  const itemTwoRef = useRef();
  const itemThreeRef = useRef();
  const itemFourRef = useRef();
  const itemFiveRef = useRef();
  const [foodelixerCheckRef, setFoodelixerCheckRef] = useState("");
  const [selectedOptionOne, setSelectedOptionOne] = useState("");
  const [selectedOptionTwo, setSelectedOptionTwo] = useState("");
  const [selectedOptionThree, setSelectedOptionThree] = useState("");
  const [selectedOptionFour, setSelectedOptionFour] = useState("");
  const [selectedOptionFive, setSelectedOptionFive] = useState("");

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
      foodelixerCheckRef: foodelixerCheckRef.current.value,
    };

    

    if (foodelixerCheckRef === "Food") {

      console.log("POST request for Elixir:", product);
    } else {

      console.log("POST request for Food:", product);
    }

    // Clear the form fields after submission
    nameRef.current.value = "";
    descriptionRef.current.value = "";
    priceRef.current.value = "";
    itemOneRef.current.value = "";
    itemTwoRef.current.value = "";
    itemThreeRef.current.value = "";
    itemFourRef.current.value = "";
    itemFiveRef.current.value = "";
    foodelixerCheckRef.current.value = "";
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

        
        
        <button onClick={props.onCloseForm} className={classes["button--alt"]}>
          Cancel
        </button>
        <button className={classes.button} type="submit">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default NewForm;
