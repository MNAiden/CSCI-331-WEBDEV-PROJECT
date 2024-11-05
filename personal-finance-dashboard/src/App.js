import React from 'react';
import Overview from './components/Overview';
import Portfolio from './components/Portfolio';
import Budget from './components/Budget';
import Misc from './components/Misc';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="nav">
                <h2>Personal Finance Dashboard</h2>
            </header>
            <main className="main-content">
                <div className="box">
                    <Overview />
                </div>
                <div className="box">
                    <Portfolio />
                </div>
                <div className="box">
                    <Budget />
                </div>
                <div className="box">
                    <Misc />
                </div>
            </main>
            <footer>
                <h4>Footer Title</h4>
                <p>Footer content here</p>
            </footer>
        </div>
    );
}

export default App;
