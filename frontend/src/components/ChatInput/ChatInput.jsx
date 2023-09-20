import React, {Component} from "react";
import './ChatInput.css'

class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }
    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.props.send(this.state.message);
            this.setState({ message: "" }); 
        }
    } //enviar mensagem apertando Enter

    handleChange = (event) => {
        this.setState({ message: event.target.value });
    }

    render() {
        return (
            <div className="ChatInput">
                <input
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type some message!"/>
            </div>
        )
    }
}

export default ChatInput;