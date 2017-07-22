/**
 * Created by limyandivicotrico on 7/21/17.
 */

/**
 * Created by limyandivicotrico on 7/21/17.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './View.css'

const styles = {
    width: '10%',
}

window.onload = function() {
    document.getElementById("number1").focus();
};


export class AskNumber extends Component {
    constructor() {
        super();
        this.handleValue = this.handleValue.bind(this);
    }
    handleValue() {
        const firstNum = parseInt(this.refs.firstnum.getValue(), 10);
        const secondNum = parseInt(this.refs.secondnum.getValue(), 10);
        this.props.onClick(firstNum, secondNum);
    }

    handleEnterForFirstText(event) {
        event = event || window.event;
        if(event.keyCode || event.which === 13) {
            document.getElementById("number2").focus();
            return false;
        }
        return true;
    }

    handleEnter(event) {
        event = event || window.event;
        if(event.keyCode || event.which === 13) {
            document.getElementById("continueButton").click();
            return false;
        }
        return true;
    }

    render() {
        return (
            <div className="view">
                <text>Please enter the range of number you want to play with!
                </text>
                <br />
                <TextField className="divider" id="number1" ref="firstnum" style={styles} onKeyPress={this.handleEnterForFirstText}></TextField><br/>
                <TextField className="divider" id="number2" ref="secondnum" style={styles} onKeyPress={this.handleEnter}></TextField><br/>
                <RaisedButton id="continueButton" className="separator" label="Continue" onClick={this.handleValue}/>
            </div>
        );
    }
}

export class Game extends Component {
    constructor() {
        super();
        this.handleCondition = this.handleCondition.bind(this);
    }

    handleCondition() {
        const numberEntered = document.getElementById("numberentered");
        const enteredNumber = parseInt(this.refs.enteredNum.getValue(), 10); //10 is the radix, 10 means using decimal system, 2 means using binary, 16 means hexadecimal blahblahblah.
        this.props.onClick(enteredNumber);
        numberEntered.select();
    }

    handleEnter(event) {
        event = event || window.event;
        if(event.keyCode || event.which === 13) {
            document.getElementById("submitButton").click();
            return false;
        }
        return true;
    }

    render() {
        return (
            <div className="view">
                <text>
                    Please enter a number between {this.props.firstNum} and {this.props.lastNum} exclusively
                </text>
                <br/>
                <TextField className="divider" id="numberentered" ref="enteredNum" onKeyPress={this.handleEnter} style={styles}/><br />
                <RaisedButton className="separator" id="submitButton" label="Submit" onClick={this.handleCondition}/>
            </div>
        );
    }
}

export function GameEnd(props) {
    return (
        <div className="view">
            <p>The Game has Ended! Restart the game?</p>
            <RaisedButton className="separator" onClick={props.onClick}>Restart</RaisedButton>
        </div>
    );
}
