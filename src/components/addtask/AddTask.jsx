import React, {Component, createRef }from 'react';
import styles from './AddTaskStyle.module.css';
import { Button, FormControl, Modal } from 'react-bootstrap';
import DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';

class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            date: new Date()
    
        };
        this.titleRef = createRef(null)
    }
    
    componentDidMount(){
        this.titleRef.current.focus()
    }
    handleChange = (event) => {
        const{name, value} = event.target
        this.setState({
            [name]: value
        })
    };
    handledatechange = (date) => {
        this.setState({
            date: date
        })
    }
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.addTask();
        }
    };
    addTask = () => {
        const { title, description, date } = this.state;
        if (!title) {
            return;
        }
        const task = {
            title: title,
            description: description,
            date: date.toISOString().slice(0, 10)  
        };
        this.props.onAdd(task)
    };
    
    render() {
        const { onClose } = this.props;
        return (
            <Modal show={true} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        placeholder="Title"
                        name="title"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        ref= {this.titleRef}
                        className={styles.focusSt}
                    />
                    <textarea
                        className={styles.description}
                        rows="4"
                        placeholder="Description"
                        name="description"
                        onChange={this.handleChange}

                    >
                    </textarea>
                    <DatePicker 
                    selected={this.state.date} 
                    onChange={this.handledatechange}
                    minDate= {new Date()}
                     />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.addTask}>
                        Add
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                        </Button>

                </Modal.Footer>
            </Modal>
        );
    }
}


AddTask.propTypes = {
    onAdd: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,

}
export default AddTask;
