import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';  
import styles from './EditTaskStyle.module.css';


export default class EditTaskModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            ...props.data
        }
    }
    handleChange = (event)=> {
        this.setState({
            title: event.target.value    
        });
    }

    handleSave = () => {
        const {title} = this.state

        if(!title) {
            return;
        }

        this.props.onSave(this.state)
    }
    render() {
        const {title}= this.state
        return (
            <Modal show={true} onHide={this.props.onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure to remove {this.props.count} tasks</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input 
                    type="text" 
                    className={styles.taskInput}
                    value={title}
                    onChange = {this.handleChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.handleSave}>
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={this.props.onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
};


EditTaskModal.propTypes = {
    data: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};