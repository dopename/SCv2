import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import {auth} from "../actions";

class Login extends Component {

  state = {
    //username: "",
    password: "",
    email:"",
    phone_number:"",
    first_name:"",
    last_name:"",
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.register(
      this.state.first_name, this.state.last_name, this.state.email, this.state.phone_number, this.state.password
    );
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }
    return (
      <form onSubmit={this.onSubmit}>
        <div className="text-center col-4 m-auto">
        <fieldset>
          <legend>Register</legend>
          {this.props.errors.length > 0 && (
            <ul>
              {this.props.errors.map(error => (
                <li key={error.field}>{error.message}</li>
              ))}
            </ul>
          )}
          <p>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text" id="first_name" className="form-control"
              onChange={e => this.setState({first_name: e.target.value})} />
          </p>
          <p>
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text" id="last_name" className="form-control"
              onChange={e => this.setState({last_name: e.target.value})} />
          </p>
          <p>
            <label htmlFor="email">Email</label>
            <input
              type="text" id="email" className="form-control"
              onChange={e => this.setState({email: e.target.value})} />
          </p>
          <p>
            <label htmlFor="phone_number">Phone Number</label>
            <input
              type="text" id="phone_number" className="form-control"
              onChange={e => this.setState({phone_number: e.target.value})} />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password" id="password" className="form-control"
              onChange={e => this.setState({password: e.target.value})} />
          </p>
          <p>
            <button type="submit" className="btn btn-success">Register</button>
          </p>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </fieldset>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    register: (first_name, last_name, email, phone_number, password) => dispatch(auth.register(first_name, last_name, email, phone_number, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);