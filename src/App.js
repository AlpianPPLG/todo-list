import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: "",
      list: [],
      deletedList: [],
      filter: "",
      deadline: "",
      category: "",
      tags: "",
      confirmDelete: false,
      sort: "asc",
      darkMode: false,
    };

    if (localStorage.getItem("todo-list")) {
      const list = JSON.parse(localStorage.getItem("todo-list"));
      this.setState({
        list,
      });
    }
  }

  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }

  addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        id: Math.random(),
        value: this.state.userInput,
        checked: false,
        deadline: this.state.deadline,
        category: this.state.category,
        tags: this.state.tags.split(",").map((tag) => tag.trim()),
      };

      const list = [...this.state.list];
      list.push(userInput);

      localStorage.setItem("todo-list", JSON.stringify(list));

      this.setState({
        list,
        userInput: "",
        deadline: "",
        category: "",
        tags: "",
      });
    } else {
      alert("Kolom input tidak boleh kosong");
    }
  }

  deleteItem(key) {
    const list = [...this.state.list];
    const updateList = list.filter((item) => item.id !== key);

    this.setState({
      deletedList: [
        ...this.state.deletedList,
        list.find((item) => item.id === key),
      ],
    });

    this.setState({
      list: updateList,
    });
  }

  confirmDeleteItem(key) {
    const confirm = window.confirm(
      "Apakah Anda yakin ingin menghapus data Todo List ini?"
    );
    if (confirm) {
      this.deleteItem(key);
      this.setState({
        confirmDelete: false,
      });
    }
  }

  undoDelete() {
    if (this.state.deletedList.length > 0) {
      const deletedItem = this.state.deletedList.pop();
      const list = [...this.state.list];
      list.push(deletedItem);
      this.setState({
        list,
        deletedList: this.state.deletedList,
      });
    }
  }

  editItem = (index) => {
    const todos = [...this.state.list];
    const editedTodo = prompt("Edit the todo:");
    if (editedTodo !== null && editedTodo.trim() !== "") {
      let updatedTodos = [...todos];
      updatedTodos[index].value = editedTodo;
      this.setState({
        list: updatedTodos,
      });
    }
  };

  handleCheckboxChange = (index) => {
    const updatedList = [...this.state.list];
    updatedList[index].checked = !updatedList[index].checked;
    this.setState({ list: updatedList });
  };

  filterTodo = (event) => {
    this.setState({
      filter: event.target.value,
    });
  };

  filterCategory = (event) => {
    this.setState({
      category: event.target.value,
    });
  };

  filterTags = (event) => {
    this.setState({
      tags: event.target.value,
    });
  };

  sortTodo = (event) => {
    this.setState({
      sort: event.target.value,
    });
  };

  toggleDarkMode = () => {
    this.setState((prevState) => ({
      darkMode: !prevState.darkMode,
    }));
  };

  render() {
    const { darkMode } = this.state;
    const appStyle = {
      backgroundColor: darkMode ? "#333" : "#fff",
      color: darkMode ? "#fff" : "#000",
      minHeight: "100vh",
      transition: "all 0.3s ease",
    };

    const totalTasks = this.state.list.length;
    const incompleteTasks = this.state.list.filter(
      (item) => !item.checked
    ).length;

    return (
      <Container style={appStyle}>
        <Row>
          <Col>
            <h2>Total Tasks: {totalTasks}</h2>
            <h3>Incomplete Tasks: {incompleteTasks}</h3>
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
            fontWeight: "bolder",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            transition: "box-shadow 0.3s ease-in-out",
          }}
          onClick={() => window.location.reload()}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.5)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)")
          }
        >
          TODO LIST
        </Row>
        <hr />
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Tambahkan tugas baru..."
                size="lg"
                value={this.state.userInput}
                onChange={(item) => this.updateInput(item.target.value)}
                onKeyPress={this.handleKeyPress}
                aria-label="add something"
                aria-describedby="basic-addon2"
              />
              <FormControl
                placeholder="Tambahkan tag..."
                size="lg"
                value={this.state.tags}
                onChange={(event) =>
                  this.setState({ tags: event.target.value })
                }
                aria-label="add tags"
                aria-describedby="basic-addon2"
              />
              <InputGroup>
                <Button
                  onClick={() => {
                    this.setState({ loading: true });
                    setTimeout(() => {
                      this.addItem();
                      this.setState({ loading: false });
                    }, 1000);
                  }}
                  style={{
                    transition: "all 0.3s ease",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    opacity: this.state.loading ? 0.5 : 1,
                    cursor: this.state.loading ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1)";
                    e.target.style.backgroundColor = "#0056b3";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.backgroundColor = "purple";
                    e.target.style.border = "none";
                  }}
                >
                  {this.state.loading ? "LOADING..." : "TAMBAH"}
                </Button>
                <Button
                  onClick={this.toggleDarkMode}
                  style={{
                    transition: "all 0.3s ease",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    opacity: this.state.loading ? 0.5 : 1,
                    cursor: this.state.loading ? "not-allowed" : "pointer",
                    margin: "3px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1)";
                    e.target.style.backgroundColor = "#0056b3";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.backgroundColor = "purple";
                    e.target.style.border = "none";
                  }}
                >
                  {this.state.darkMode ? "LIGHT MODE" : "DARK MODE"}
                </Button>
              </InputGroup>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <ListGroup>
              {this.state.list
                .filter(
                  (item) =>
                    item.value.toLowerCase().includes(this.state.filter) &&
                    item.deadline.includes(this.state.deadline) &&
                    item.category.includes(this.state.category) &&
                    item.tags.some((tag) => tag.includes(this.state.tags))
                )
                .sort((a, b) => {
                  if (this.state.sort === "asc") {
                    return a.deadline.localeCompare(b.deadline);
                  } else {
                    return b.deadline.localeCompare(a.deadline);
                  }
                })
                .map((item, index) => {
                  return (
                    <div key={index}>
                      <ListGroup.Item
                        variant={darkMode ? "secondary" : "dark"}
                        action
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          textDecoration: item.checked
                            ? "line-through"
                            : "none",
                          backgroundColor: darkMode ? "#444" : "#fff",
                          color: darkMode ? "#fff" : "#000",
                        }}
                      >
                        <Form.Check
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => this.handleCheckboxChange(index)}
                        />
                        <span
                          style={{
                            color: item.checked
                              ? "gray"
                              : darkMode
                              ? "#fff"
                              : "#000",
                          }}
                        >
                          {item.value}
                        </span>
                        <span>
                          {item.tags.map((tag, idx) => (
                            <Badge
                              key={idx}
                              bg="info"
                              style={{ margin: "0 4px" }}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </span>
                        <span>
                          <Button
                            style={{ marginRight: "10px" }}
                            variant="light"
                            onClick={() =>
                              this.setState({ confirmDelete: true })
                            }
                          >
                            Delete
                          </Button>
                          {this.state.confirmDelete && (
                            <Button
                              variant="light"
                              onClick={() => this.confirmDeleteItem(item.id)}
                              style={{ margin: "3px" }}
                            >
                              Confirm
                            </Button>
                          )}
                          <Button
                            variant="light"
                            onClick={() => this.editItem(index)}
                          >
                            Edit
                          </Button>
                        </span>
                      </ListGroup.Item>
                    </div>
                  );
                })}
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Filter</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.filter}
                  onChange={this.filterTodo}
                  placeholder="Filter by name"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                  type="date"
                  value={this.state.deadline}
                  onChange={(event) =>
                    this.setState({ deadline: event.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.category}
                  onChange={this.filterCategory}
                  placeholder="Filter by category"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.tags}
                  onChange={this.filterTags}
                  placeholder="Filter by tags"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Sortir</Form.Label>
                <Form.Control
                  as="select"
                  value={this.state.sort}
                  onChange={this.sortTodo}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </Form.Control>
              </Form.Group>
              <Button variant="light" onClick={() => this.undoDelete()}>
                Undo Delete
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
