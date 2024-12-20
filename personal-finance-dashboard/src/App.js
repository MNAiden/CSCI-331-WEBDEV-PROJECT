import React, { useState } from "react";
import Overview from "./components/Overview";
import Portfolio from "./components/Portfolio";
import Budget from "./components/Budget";
import Misc from "./components/Misc";
import "./styles/App.css";

function App() {
  const [totalEquity, setTotalEquity] = useState();

  return (
    <div className="App">
      <header className="nav">
        <h2>Personal Finance Dashboard</h2>
      </header>
      <main className="main-content">
        <div className="box">
          {totalEquity !== 0 ? (
            <Overview totalEquity={totalEquity} />
          ) : (
            <p>Loading Overview...</p>
          )}
        </div>
        <div className="box">
          <Portfolio setTotalEquity={setTotalEquity} />
        </div>
        <div className="box">
          <Budget />
        </div>
        <div className="box">
          <Misc />
        </div>
      </main>
      <footer>
        <p>Created by: Gabe Martens, Victor Becker, Aiden Strong</p>
      </footer>
    </div>
  );
}

export default App;
