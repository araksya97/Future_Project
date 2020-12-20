import React, {Component, createRef} from 'react';
import { FormControl, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './EditTaskStyle.module.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default class EditTaskModal extends Component {
    constructor(props) {
        super(props);
        const { date } = props.data;
        this.state = {
            ...props.data,
            date: date ? new Date(date) : new Date()
        }
        this.titleRef = createRef(null)
    }
 componentDidMount(){
     this.titleRef.current.focus();
 }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    };

    handleSave = () => {
        const { title, date } = this.state
        if (!title) {
            return;
        }
        const editedTask = {
            ...this.state,
            date: date.toISOString().slice(0, 10)
        }
        this.props.onSave(editedTask);
    };
    handledatechange = (date) => {
        this.setState({
            date: date
        })
    };
    render() {
        const { onClose } = this.props;
        const { title, description, date } = this.state
        return (
            <Modal show={true} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        ref = {this.titleRef}
                        className={styles.focusSt}
                    />
                    <textarea
                        className={styles.description}
                        rows="4"
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={this.handleChange}
                    >
                    </textarea>
                    <DatePicker
                        selected={date}
                        onChange={this.handledatechange}
                        minDate={new Date()}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleSave}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                        </Button>

                </Modal.Footer>
            </Modal>
        );
    }
};


EditTaskModal.propTypes = {
    data: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};