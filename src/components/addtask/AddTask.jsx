import React from 'react';
import styles from './AddTaskStyle.module.css';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

class AddTask extends React.Component {
    state = {
        inputValue: '',

    };
    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    };
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.addTask();
        }
    };
    addTask = () => {
        const { inputValue } = this.state;
        if (!inputValue) {
            return;
        }
        const task = {
            title: inputValue
        };
        this.props.onAdd(task)
        
        this.setState({
            inputValue: ''
        })

    };
   
    render() {
        const { inputValue} = this.state;
        const {disabled} = this.props;
        return (
            <InputGroup className={styles.input}>
                <FormControl
                    placeholder="Add your Task"
                    aria-label="Add your Task"
                    aria-describedby="basic-addon2"
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    value={inputValue}
                    disabled={disabled}
                />
                <InputGroup.Append>
                    <Button
                        variant="outline-success"
                        onClick={this.addTask}
                        disabled = {disabled}
                    >Add  
                                    </Button>
                </InputGroup.Append>
            </InputGroup>
        );
    }
}


AddTask.propTypes={
    disabled: PropTypes.bool,
    onAdd: PropTypes.func.isRequired,

}
export default AddTask;
