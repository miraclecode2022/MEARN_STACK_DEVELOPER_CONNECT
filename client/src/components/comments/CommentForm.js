import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {addComment} from '../../actions/postAction'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'

class CommentForm extends Component {
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
        const {postId} = this.props
        const commentData = {
            text : this.state.text,
            name : user.name,
            avatar : user.avatar
        }
        this.props.addComment(postId,commentData)
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
                Comment...
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <TextAreaFieldGroup
                        placeholder="Reply post"
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

CommentForm.propTypes = {
    addComment : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    postId : PropTypes.string.isRequired,
    errors : PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        auth : state.auth,
        errors: state.errors
    }
}



export default connect(mapStateToProps, {addComment})(CommentForm)