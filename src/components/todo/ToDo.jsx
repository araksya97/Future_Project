import React from 'react';
import Task from '../task/Task';
import styles from './ToDoStyle.module.css';
import idGenerator from '../../helpers/idGenerator';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddTask from '../addtask/AddTask';
import Confirm from '../Confirm';
import EditTaskModal from '../EditTaskModal/EditTaskModal';

class ToDo extends React.PureComponent {
    state = {
        tasks: [],
        selectedTasks: new Set(),
        showConfirm: false,
        editTask: null,

    };

    addTask = (value) => {
        const newTask = {
            text: value,
            _id: idGenerator(),
        }
        const tasksnew = [newTask, ...this.state.tasks];
        this.setState({
            tasks: tasksnew,
        });
    };

    removeTask = (taskId) => {
        const Taskss = this.state.tasks.filter(task => task._id !== taskId);
        this.setState({
            tasks: Taskss,
            
        });
    };
    handleCheck = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(taskId)) {
            selectedTasks.delete(taskId);
        } else {
            selectedTasks.add(taskId);
        };
        this.setState({
            selectedTasks

        });
    };
    removeSelected = () => {
        let tasks= [...this.state.tasks];
        this.state.selectedTasks.forEach((id)=>{
            tasks = tasks.filter((task)=> task._id !== id)
        });
        this.setState({
            tasks,
            selectedTasks: new Set(),
            showConfirm: false
        });
    };
    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };
    toogleEditModal= (task) => {
        this.setState({
            editTask: task
        });
    };

    saveTask = (editedTask) =>{
        let tasks= [...this.state.tasks];
        const findIndex = tasks.findIndex((task)=>task._id===editedTask._id);
        tasks[findIndex]=editedTask;
        this.setState({
            tasks: tasks,
            editTask: null,
        });

    };
    render() {
        const { tasks,  selectedTasks, showConfirm, editTask } = this.state;
        const groupTasks = tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3}>
                    <Task
                        data={task}
                        onRemove={this.removeTask}
                        onCheck={this.handleCheck}
                        disabled= {!!selectedTasks.size}
                        onEdit = {this.toogleEditModal}
                    />
                </Col>
            )
        });
        return (
            <div className={styles.todo}>
                <Container>
                    <Row className='justify-content-center'>
                        <Col xs={12} sm={10} md={8}>
                            <AddTask 
                                onAdd = {this.addTask}
                                disabled= {!!selectedTasks.size}
                            />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col xs={4}>
                            <Button
                                variant="outline-danger"
                                onClick={this.toggleConfirm}
                                disabled={!selectedTasks.size}
                            > Remove Selected
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                        {groupTasks}
                    </Row>
                </Container>
    {
        showConfirm &&
        <Confirm 
            onClose ={this.toggleConfirm} 
            onSubmit ={this.removeSelected} 
            count = {selectedTasks.size}
        />
    }

    {
        !!editTask &&
        <EditTaskModal
            data={editTask}
            onSave = {this.saveTask}
            onClose= {()=> this.toogleEditModal(null)}
        />
    }          
            </div>
        );
    }
}



export default ToDo;
