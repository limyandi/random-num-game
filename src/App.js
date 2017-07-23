import React, {Component} from 'react';
import logo from './logo.svg';
import {AskNumber, Game, GameEnd} from './View';
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends Component {
    constructor() {
        super();
        this.state = {
            firstNum: 1,
            lastNum: 100,
            rand: 0,
            askNumberScreen: true,
            gameScreen: false,
            gameEndScreen: false,
        };
        this.gameStart = this.gameStart.bind(this);
        this.gameCommencing = this.gameCommencing.bind(this);
        this.gameEnds = this.gameEnds.bind(this);
        this.restart = this.restart.bind(this);
    }

    gameStart(enteredFirstNum, enteredLastNum) {
        const minimumRange = 10;
        const firstNum = enteredFirstNum;
        const lastNum = enteredLastNum;
        if (lastNum > firstNum) {
            if((lastNum - firstNum) > minimumRange) {
                this.setState({
                    firstNum: firstNum,
                    lastNum: lastNum,
                    rand: Math.floor(Math.random() * (lastNum - firstNum + 1) + firstNum),
                    askNumberScreen: false,
                    gameScreen: true,
                });
            }
            else {
                alert('Please enter a bigger range than ' + minimumRange);
            }
        }
        else {
            alert('Please enter the larger number in ' +
                'the second box and the smaller number in the first box');
        }
    }

    gameCommencing(enteredNum) {
        if (enteredNum > this.state.firstNum && enteredNum < this.state.lastNum) {
            if (enteredNum < this.state.rand)
                alert('bigger');
            else if (enteredNum > this.state.rand)
                alert('smaller');
            else {
                alert('You lose the game!');
                this.gameEnds();
            }
            this.setState({
                firstNum: (enteredNum < this.state.rand ? enteredNum : this.state.firstNum),
                lastNum: (enteredNum > this.state.rand ? enteredNum : this.state.lastNum)
            });
        }
        else {
            alert('Please do not enter beyond the specified range');
        }
    }

    gameEnds() {
        this.setState({
            gameScreen: false,
            gameEndScreen: true,
        });
    }

    restart() {
        this.setState({
            gameEndScreen: false,
            askNumberScreen: true,
        })
    }

    render() {
        let currentScreen;
        if (this.state.askNumberScreen) {
            currentScreen = <AskNumber onClick={this.gameStart}/>;
        }
        else if (this.state.gameScreen) {
            currentScreen =
                <Game firstNum={this.state.firstNum} lastNum={this.state.lastNum} onClick={this.gameCommencing}/>;
        }
        else {
            currentScreen = <GameEnd onClick={this.restart}/>;
        }
        return (
            <MuiThemeProvider>
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>Welcome to React</h2>
                    </div>
                    {currentScreen}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
