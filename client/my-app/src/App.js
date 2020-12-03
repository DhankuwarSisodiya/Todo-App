import React from 'react';
import './dist/main.css';
import NavBar from './components/NavBar';
import TodayInfo from './components/todayInfo';
import TodoWorkspace from './components/todoWorkspace';

function App(){
  return (
    <div>
      <NavBar />
      <div className="hero">
      <TodayInfo />
      <TodoWorkspace />
      </div>
    </div>
  );
}

export default App;