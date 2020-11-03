import React from 'react';
import Task from './Task'

class ToDo extends React.Component { 
    state = {
        tasks: [],
        inputValue: "",
    }
    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value,
        })
    };
    handleClick = () => {
        const {inputValue} =this.state;
        const taskss = [...this.state.tasks];
        taskss.push(inputValue);
        this.setState({
            tasks: taskss,
            inputValue: "",
        });
    };
    render() {
        let {tasks, inputValue} = this.state;
        return (
            <>
            <div>
            <input 
            type="text" 
            placeholder="Add new task"
            value = {inputValue}
            onChange={this.handleChange}
            />
            <button
            onClick= {this.handleClick}
            >
                Add
            </button> 
            </div>
            
            <ol>
            {tasks.map((task, index) => {
                return <Task key={index} data={task} /> 
            })}
            </ol>
            </>
        );
    }
}



export default ToDo;
;