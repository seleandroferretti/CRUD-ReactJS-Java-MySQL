import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

export default class ViewEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      employee: {},
    };
  }

  volver() {
    this.props.history.push("/employees");
  }

  componentDidMount() {
    EmployeeService.getEmployeeById(this.state.id).then((res) => {
      this.setState({ employee: res.data });
    });
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center mt-4">Información del Empleado</h3>
          <div className="card-body">
            <div className="row">
              <label className="fw-bold">Nombre: </label>
              <div>{this.state.employee.firstName}</div>
            </div>

            <div className="row mt-2">
              <label className="fw-bold">Apellido: </label>
              <div>{this.state.employee.lastName}</div>
            </div>

            <div className="row mb-4 mt-2">
              <label className="fw-bold">Correo electrónico: </label>
              <div>{this.state.employee.emailId}</div>
            </div>

            <button
              className="btn btn-primary"
              onClick={this.volver.bind(this)}
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }
}
