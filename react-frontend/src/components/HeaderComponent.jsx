import React, { Component } from "react";

export default class HeaderComponent extends Component {
  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark p-4 mb-4">
            <div>
              <a href="/employees" className="navbar-brand m-4">
                Administración de Empleados
              </a>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}
