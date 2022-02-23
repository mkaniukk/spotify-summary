import logo from './logo.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Clock from './Clock'

function App() {
  return (
    <div className="App">
      <header>
          <Clock />
        <div>
          <button>
            <Welcome name="Michal" />
          </button>
          <TasksList/>
        </div>
      </header>
    </div>
  );
}

function Welcome(props){
  return <h1>Hello, {props.name}!</h1>
}

function TasksList(props) {
  const tasks = ["cleaning", "shopping", "cooking", "studying", "sleeping"];
  const listItems = tasks.map((task) => 
    <li key={task.toString()}>{task}<input type="checkbox" id="done" name="done"></input></li>
  );
  return(
    <div>
      {listItems}
    </div>
  );
};

export default App;


