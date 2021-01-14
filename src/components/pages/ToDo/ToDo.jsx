import React from 'react';
import Task from '../../Task/Task';
import styles from './ToDoStyle.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddTask from '../../AddTask/AddTask';
import Confirm from '../../Confirm';
import EditTaskModal from '../../EditTaskModal/EditTaskModal';
import { connect } from 'react-redux';
import { getTasks } from '../../../store/actions';



class ToDo extends React.PureComponent {
    state = {
        selectedTasks: new Set(),
        showConfirm: false,
        editTask: null,
        openNewTaskModal: false,
    };
    componentDidMount() {
        this.props.getTasks();
    }
    addTask = (data) => {
        fetch("http://localhost:3001/task", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: (JSON.stringify(data))
        })
            .then((res) => res.json())
            .then(response => {
                if (response.error) {
                    throw response.error;
                }
                const tasksnew = [response, ...this.state.tasks];
                this.setState({
                    tasks: tasksnew,
                    openNewTaskModal: false,
                });
            })
            .catch((error) => {
                console.log("ERROR")
            });

    };

    removeTask = (taskId) => {
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then(response => {
                if (response.error) {
                    throw response.error;
                }
                const Taskss = this.state.tasks.filter(task => task._id !== taskId);
                this.setState({
                    tasks: Taskss,

                });
            })
            .catch((error) => {
                console.log("ERROR")
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
        const body = {
            tasks: [...this.state.selectedTasks]
        }
        fetch("http://localhost:3001/task", {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then(response => {
                if (response.error) {
                    throw response.error;
                }
                let tasks = [...this.state.tasks];
                this.state.selectedTasks.forEach((id) => {
                    tasks = tasks.filter((task) => task._id !== id)
                });
                this.setState({
                    tasks,
                    selectedTasks: new Set(),
                    showConfirm: false
                });
            })
            .catch((error) => {
                console.log("ERROR")
            });

    };
    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };
    toogleEditModal = (task) => {
        this.setState({
            editTask: task
        });
    };

    saveTask = (editedTask) => {
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedTask)
        })
            .then((res) => res.json())
            .then(response => {
                if (response.error) {
                    throw response.error;
                }
                let tasks = [...this.state.tasks];
                const findIndex = tasks.findIndex((task) => task._id === editedTask._id);
                tasks[findIndex] = response;
                this.setState({
                    tasks: tasks,
                    editTask: null,
                });
            })
            .catch((error) => {
                console.log("ERROR")
            });
    };

    toggleNewTaskModal = () => {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        });
    }

    render() {
        const { selectedTasks, showConfirm, editTask, openNewTaskModal } = this.state;
        const groupTasks = this.props.tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3}>
                    <Task
                        data={task}
                        onRemove={this.removeTask}
                        onCheck={this.handleCheck}
                        disabled={!!selectedTasks.size}
                        onEdit={this.toogleEditModal}
                    />
                </Col>
            )
        });
        return (
            <div className={styles.todo}>
                <Container>
                    <Row className='justify-content-center text-center'>
                        <Col xs={4}>
                            <Button
                                variant="outline-success"
                                onClick={this.toggleNewTaskModal}
                                disabled={!!selectedTasks.size}
                            >
                                Add New Task
                            </Button>
                        </Col>
                        <Col xs={4}>
                            <Button
                                variant="outline-danger"
                                onClick={this.toggleConfirm}
                                disabled={!selectedTasks.size}
                            >
                                Remove Selected
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
                        onClose={this.toggleConfirm}
                        onSubmit={this.removeSelected}
                        count={selectedTasks.size}
                    />
                }

                {
                    !!editTask &&
                    <EditTaskModal
                        data={editTask}
                        onSave={this.saveTask}
                        onClose={() => this.toogleEditModal(null)}
                    />
                }

                { openNewTaskModal &&
                    <AddTask
                        onAdd={this.addTask}
                        onClose={this.toggleNewTaskModal}
                    />
                }
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    };
}
const mapDispatchToProps = {
    getTasks: getTasks
};


export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
