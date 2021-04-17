import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import Todo from './Todo';
import {db} from './firebase';
import firebase from "firebase"
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap'
import { useAuth } from './contexts/AuthContext';



function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")
  const [error, setError] = useState('');
  const history = useHistory();
  const { logout } = useAuth();
  const [pending, setPending] = useState(true);


  useEffect(() => {
  
  db.collection('todos').orderBy("timestamp", "desc").onSnapshot(snapshot => {
    
    setTodos(snapshot.docs.map(doc => ({ 
      id:doc.id, 
      todo: doc.data().todo,
      pending: doc.data().pending
    })))
  })}, [])

  
  const addTodo = (Event) => {
    // preventing default nature of form of refresh
    Event.preventDefault();
    
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      pending: pending
    })

    // to remove the entered words from input after clicking button
    setInput("");
    setPending(true);
  }


  async function logOut(){
    try{
      setError("");
      // setLoading(true);
      await logout();
      // console.log( emailRef.current.value, passwordRef.current.value )
      history.push('/login');
    } catch{
      setError('failed to log out')
    }
  }

  // console.log(pending);



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
         <Todo todo={todo} setPending={setPending} />
        ))}
      </ul>

      <div className="log-out" onClick={logout} >
            {error && <Alert variant="danger">{error}</Alert>}
            <Button color="secondary" onClick={logOut} > Log Out </Button>
      </div>


    </div>
  );
}

export default App;