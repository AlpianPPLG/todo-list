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
import { useState } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    // Setting up state
    this.state = {
      userInput: "",
      list: [],
    };
  }

  // Set a user input value
  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }

  // Add item if user input in not empty
  addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        // Add a random id which is used to delete
        id: Math.random(),

        // Add a user value to list
        value: this.state.userInput,
        checked: false, // Add a new property for checkbox
      };

      // Update list
      const list = [...this.state.list];
      list.push(userInput);

      // reset state
      this.setState({
        list,
        userInput: "",
      });
    } else {
      alert("Kolom input tidak boleh kosong");
    }
  }

  // Function to delete item from list use id to delete
  deleteItem(key) {
    const list = [...this.state.list];

    // Filter values and leave value which we need to delete
    const updateList = list.filter((item) => item.id !== key);

    // Update list in state
    this.setState({
      list: updateList,
    });
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

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.setState({ loading: true }, () => {
        setTimeout(() => {
          this.addItem();
          this.setState({ loading: false });
        }, 1000);
      });
    }
  };

  render() {
    return (
      <Container>
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
                placeholder="add item . . . "
                size="lg"
                value={this.state.userInput}
                onChange={(item) => this.updateInput(item.target.value)}
                onKeyPress={this.handleKeyPress}
                aria-label="add something"
                aria-describedby="basic-addon2"
              />
              <InputGroup>
                <Button
                  className="mt-2"
                  disabled={this.state.loading}
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
              </InputGroup>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <ListGroup>
              {/* map over and print items */}
              {this.state.list.map((item, index) => {
                return (
                  <div key={index}>
                    <ListGroup.Item
                      variant="dark"
                      action
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        textDecoration: item.checked ? "line-through" : "none",
                      }}
                    >
                      <Form.Check
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => this.handleCheckboxChange(index)}
                      />
                      <span style={{ color: item.checked ? "gray" : "black" }}>
                        {item.value}
                      </span>
                      <span>
                        <Button
                          style={{ marginRight: "10px" }}
                          variant="light"
                          onClick={() => this.deleteItem(item.id)}
                        >
                          Delete
                        </Button>
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
      </Container>
    );
  }
}

export default App;
