import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {addPost} from '../../actions/postAction'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text : '',
            errors : {}
        }
    }

    onChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        this.setState({
            [name] : value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const {user} = this.props.auth
        const postData = {
            text : this.state.text,
            name : user.name,
            avatar : user.avatar
        }
        this.props.addPost(postData)
        this.setState({
            text : ''
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors : nextProps.errors
            })
        }
    }

    render() {
        const {errors} = this.state
        return (
            <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Say Somthing...
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <TextAreaFieldGroup
                        placeholder="Create a post"
                        name="text"
                        value={this.state.text}
                        onChange={this.onChange}
                        error={errors.text}
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">Submit</button>
                </form>
              </div>
            </div>
          </div>

        );
    }
}

PostForm.propTypes = {
    addPost : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        auth : state.auth,
        errors: state.errors
    }
}



export default connect(mapStateToProps, {addPost})(PostForm)