import React, { useState,useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const enteredInputUsername = useRef();
  const enteredInputAge = useRef();
  const enteredInputCollege = useRef();
  const [error,setError] = useState("");
  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredUsername =  enteredInputUsername.current.value;
    const enteredAge = enteredInputAge.current.value;
    const enteredCollege = enteredInputCollege.current.value;
    if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0 || enteredCollege.trim().length === 0){
      setError({
        title:"Invalid input",
        message:'Please enter a valid name and age (non-empty).'
      });
      return;
    }
    if(+enteredAge < 1){
      setError({
        title:"Invalid age",
        message:'Please enter a valid age (> 0).'
      });
      return;
    }
    props.onAddUser(enteredUsername,enteredAge,enteredCollege);
    enteredInputUsername.current.value = '';
    enteredInputAge.current.value = '';
    enteredInputCollege.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  }


  return (
    <Wrapper>
    {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          ref={enteredInputUsername}
        />
        <label htmlFor="age">Age (Years)</label>
        <input
          id="age"
          type="number"
          ref={enteredInputAge}
        />
        <label htmlFor="college">College</label>
        <input 
        id="college"
        type="text"
        ref={enteredInputCollege}
        />
        <Button type="submit">Add User</Button>
      </form>
    </Card>
    </Wrapper>
  );
};

export default AddUser;
