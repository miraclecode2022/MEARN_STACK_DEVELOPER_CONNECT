import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {deleteComment} from '../../actions/postAction'

class CommentItem extends Component {

    onDelete = (postId,commentId) => {
        // console.log(postId, commentId)
        this.props.deleteComment(postId,commentId)
    }

    render() {
        const { auth, postId, comment} = this.props

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                    <a href="profile.html">
                        <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt={comment.name} />
                    </a>
                    <br />
                    <p className="text-center">{comment.name}</p>
                    </div>
                    <div className="col-md-10">
                    <p className="lead">{comment.text}</p>
                    {comment.user === auth.user._id ? (
                    <button type="button" onClick={() => this.onDelete(postId,comment._id)}
                        className="btn btn-danger mr-1">
                        <i className="fas fa-times mr-2" />
                        Delete
                        </button>
                    ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

CommentItem.propTypes = {
    deleteComment : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    comment : PropTypes.object.isRequired,
    postId : PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {deleteComment})(CommentItem)