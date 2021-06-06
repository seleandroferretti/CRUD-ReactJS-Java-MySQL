import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

export default class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      emailId: "",
    };
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      EmployeeService.getEmployeeById(this.state.id).then((res) => {
        let employee = res.data;
        this.setState({
          firstName: employee.firstName,
          lastName: employee.lastName,
          emailId: employee.emailId,
        });
      });
    }
  }

  saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    let employee = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailId: this.state.emailId,
    };

    if (this.state.id === "_add") {
      EmployeeService.createEmployee(employee).then((res) => {
        this.props.history.push("/employees");
      });
    } else {
      EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
        this.props.history.push("/employees");
      });
    }
  };

  changeFirstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  };

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ emailId: event.target.value });
  };

  cancel() {
    this.props.history.push("/employees");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center mt-3">Agregar Empleado</h3>;
    } else {
      return <h3 className="text-center mt-3">Modificar Empleado</h3>;
    }
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="containier">
          <div className="row">
            <div className="card col-md-6 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group mt-2">
                    <label className="fw-bold">Nombre:</label>
                    <input
                      placeholder="Nombre"
                      name="firstName"
                      className="form-control mt-2"
                      value={this.state.firstName}
                      onChange={this.changeFirstNameHandler}
                    />
                  </div>

                  <div className="form-group mt-2">
                    <label className="fw-bold">Apellido:</label>
                    <input
                      placeholder="Apellido"
                      name="lastName"
                      className="form-control mt-2"
                      value={this.state.lastName}
                      onChange={this.changeLastNameHandler}
                    />
                  </div>

                  <div className="form-group mt-2">
                    <label className="fw-bold">Correo electrónico:</label>
                    <input
                      placeholder="Correo electrónico"
                      name="emailId"
                      className="form-control mt-2"
                      value={this.state.emailId}
                      onChange={this.changeEmailHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success mt-3"
                    onClick={this.saveOrUpdateEmployee}
                  >
                    Guardar
                  </button>
                  <button
                    className="btn btn-danger mt-3"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancelar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
