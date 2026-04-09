import './App.css';
import Header from './MyComponents/Header';
import Todos from './MyComponents/Todos';
import Footer from './MyComponents/Footer';
import React, {useState, useEffect} from 'react';
import AddToDo from './MyComponents/AddToDo';
import About from './MyComponents/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  let initToDo;
  if(localStorage.getItem("todos")===null){
    initToDo=[];
  }
  else{
    initToDo = JSON.parse(localStorage.getItem("todos"));
  }

  const [todos, setTodos] = useState(initToDo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)); 
  }, [todos]);

  const onDelete = (todo)=>{
    console.log("I am onDelete of todo", todo);
    
    setTodos(todos.filter((e)=>{
      return e!==todo;
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addToDo = (title, desc)=>{
    console.log("I am adding this todo",title, desc);
    let sno;
    if(todos.length===0){
      sno = 0;
    }
    else{
      sno = todos[todos.length-1].sno + 1;
    }
    const myToDo = {
      sno: sno,
      title: title,
      desc: desc
    }
    setTodos([...todos, myToDo]);
    console.log(myToDo);
  }

  return (
    <>
    <Router>
      <Header title="Todos List" searchBar= {false}/>
      
      <Routes>
        <Route exact path="/" element={
          <>
            <AddToDo addToDo={addToDo}/>
            <Todos todos={todos} onDelete={onDelete}/>
          </>
        } />
        
        <Route exact path='/about' element={<About/>} />
      </Routes>
      
      <Footer/>
    </Router>
    </>
  );
}

export default App;