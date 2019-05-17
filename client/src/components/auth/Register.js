import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {registerReducer} from '../../actions/authAction'
import TextFieldGroup from '../common/TextFieldGroup'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state= {
            name : '',
            email : '',
            password : '',
            password2 : '',
            errors : {}
        }
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors : nextProps.errors
            })
        }
    }

    onHandle = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name] : value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            name : this.state.name,
            email : this.state.email,
            password : this.state.password,
            password2 : this.state.password2
        }
        this.props.registerReducer(newUser, this.props.history)
        
    }
    
    render() {
        const { errors } = this.state

        return (
            <div className="register">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">Create your DevConnector account</p>
                    <form action="" onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            type="text"
                            placeholder="Name" 
                            name="name" 
                            value={this.state.name}
                            onChange={this.onHandle}
                            error={errors.name}
                        />
                        
                        <TextFieldGroup
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={this.state.email} 
                            onChange={this.onHandle} 
                            error={errors.email}
                            info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                        />

                        <TextFieldGroup
                            type="password"
                            placeholder="Password" 
                            name="password" 
                            value={this.state.password}
                            onChange={this.onHandle}
                            error={errors.password}
                        />

                        <TextFieldGroup
                            type="password"
                            placeholder="Confirm Password"
                            name="password2" 
                            value={this.state.password2}
                            onChange={this.onHandle}
                            error={errors.password2}
                        />
                        
                        <button type="submit" className="btn btn-info btn-block mt-4"> Send </button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerReducer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
        errors : state.errors
    }
}

export default connect(mapStateToProps, {registerReducer})(withRouter(Register))