import React from 'react';
import styles from './AddTaskStyle.module.css';
import { Button, FormControl, Modal } from 'react-bootstrap';
import DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';

class AddTask extends React.Component {
    state = {
        title: '',
        description: '',
        date: new Date()

    };
    // var1
    // handleChange = (event, name) => {
    //     this.setState({
    //         [name]: event.target.value
    //     })
    // };
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
        const { title, description } = this.state;
        if (!title) {
            return;
        }
        const task = {
            title: title,
            description: description
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
                        // onChange={(event)=>this.handleChange(event, 'title')}  
                        onKeyDown={this.handleKeyDown}
                    />
                    <textarea
                        className={styles.description}
                        rows="4"
                        placeholder="Description"
                        name="description"
                        onChange={this.handleChange}
                    // onChange={(event)=>this.handleChange(event, 'description')}
                    >
                    </textarea>
                    <DatePicker 
                    selected={new Date()} 
                    onChange={this.handledatechange} />
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
    disabled: PropTypes.bool,
    onAdd: PropTypes.func.isRequired,

}
export default AddTask;
