import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  Modal,
  Input,
} from "@material-ui/core";
import "./Todo.css";
import { db } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';



const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    left: 400,
    // position: "center",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  button: {
    width: 150,
    // border: '2px solid #000',
    margin: "10px",
  },
}));

function Todo(props) {


  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();
  const [taskDetail, settaskDetail] = useState('Task Pending');
  const [toggle, setToggle] = useState(false);
  // const [line, setLine] = useState('');
  // const { logout } = useAuth();

  

  const handleOpen = () => {
    setOpen(true);
  };

  const updateTodo = () => {
    // update the todo with the new input
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  // if(props.todo.pending){
  //   settaskDetail("Task Pending");
  //   setToggle(false);
  // }
  // else{
  //   settaskDetail("Task Completed");
  //   setToggle(true);
  // }

  function taskDoneToggle(){

    console.log(props.todo.pending);

    if(toggle){
      db.collection("todos").doc(props.todo.id).set(
        {
          pending: true,
        },
        { merge: true }
      );
      settaskDetail("Task Pending");
      setToggle(false);
      props.setPending(true);
      // setLine('');
    }
    else{

      db.collection("todos").doc(props.todo.id).set(
        {
          pending: false,
        },
        { merge: true }
      );
      settaskDetail("Task Completed");
      setToggle(true);
      props.setPending(false);
      // setLine("line-through");
    }
    
  }



  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h3>Update the Task</h3>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(Event) => setInput(Event.target.value)}
          />
          <Button
            variant="contained"
            color="default"
            onClick={updateTodo}
            className={classes.button}
          >
            Upload ✔
          </Button>
        </div>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          {/* <h3>{props.todo.todo}</h3>
          <p> {taskDetail} </p> */}

          <ListItemText primary={props.todo.todo} secondary={taskDetail}
          style={{cursor:"pointer"}} onClick={taskDoneToggle}  />

{/* , textDecoration:`${line}`  */}
          
        </ListItem>
        <Button
          variant="contained"
          color="secondary"
          onClick={(Event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
          className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={(e) => setOpen(true)}
          className={classes.button}
          endIcon={<EditIcon>send</EditIcon>}
        >
          Edit
        </Button>

        {/* <Button className="edit__btn" onClick={e => setOpen(true)}>Edit</Button> */}
        {/* <DeleteForeverIcon onClick={Event =>db.collection('todos').doc(props.todo.id).delete()}>❌Delete</DeleteForeverIcon> */}
      </List>
          

    </>
  );
}

export default Todo;