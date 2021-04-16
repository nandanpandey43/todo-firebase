import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import Todo from './Todo';
import {db} from './firebase';
import firebase from "firebase"


function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")

  
  useEffect(() => {
  
  db.collection('todos').orderBy("timestamp", "desc").onSnapshot(snapshot => {
    
    setTodos(snapshot.docs.map(doc => ({ id:doc.id, todo: doc.data().todo})))
  })}, [])

  
  const addTodo = (Event) => {
    // preventing default nature of form of refresh
    Event.preventDefault();
    
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    // to remove the entered words from input after clicking button
    setInput("");
  }



  return (
    <div className="App">
      {/* Wraping up in form to make sure enter key will submiting the form  */}
      <h1 className =  "App-header">Todo List </h1>
      <h3></h3>
      <form >
        <FormControl>
          <InputLabel><span role="img" aria-label="emoji">✅ </span> Write a Task</InputLabel>
          <Input value={input} onChange={Event => setInput(Event.target.value)} />
          <FormHelperText>make yourself more productive <span role="img" aria-label="emoji">🕒</span> </FormHelperText>
        </FormControl>

        {/* using material ui */}
        <Button disabled={!input} type="submit" variant="contained" color="primary" onClick={addTodo}>
          Add Todo
        </Button>
        {/* <button onClick={addTodo}>Add Todo </button> */}
      </form>
      <ul>
        {todos.map(todo => (
         <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;