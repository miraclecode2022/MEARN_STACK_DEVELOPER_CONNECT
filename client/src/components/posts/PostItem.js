import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import classnames from 'classnames'
import {Link} from 'react-router-dom'
import {deletePost, likePost, unlikePost} from '../../actions/postAction'

class PostItem extends Component {

    onLikePost = (id) => {
        this.props.likePost(id)
    }

    onUnlikePost = (id) => {
        this.props.unlikePost(id)
    }

    onDelete = (id) => {
        this.props.deletePost(id)
    }

    findUserLike = (likes) => {
        const {auth} = this.props
        if(likes.filter(like => like.user === auth.user._id).length > 0) {
            return true
        } else {
            return false
        }
    }

    render() {
        const {post , auth, showActions} = this.props
        return (
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block" src={post.avatar}
                      alt={post.name} />
                  </a>
                  <br />
                  <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{post.text}</p>
                  {showActions ? 
                  (<span> 
                  {/* like Post */}
                  <button onClick={() => this.onLikePost(post._id)} type="button" className="btn btn-light mr-1">
                    <i className={classnames("fas fa-thumbs-up",{
                        "text-info" : this.findUserLike(post.likes)
                    })}></i>
                    <span className="badge badge-light">{post.likes.length}</span>
                  </button>
                  {/* unlike Post */}
                  <button onClick={() => this.onUnlikePost(post._id)} type="button" className="btn btn-light mr-1">
                    <i className="text-secondary fas fa-thumbs-down"></i>
                  </button>
                  <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Comments
                  </Link>
                  {post.user === auth.user._id ? (
                    <button type="button" onClick={() => this.onDelete(post._id)}
                        className="btn btn-danger mr-1">
                        <i className="fas fa-times mr-2" />
                        Delete
                    </button>
                  ) : null}
                  
                  </span>) : null}
                  
                </div>
              </div>
            </div>
        );
    }
}
PostItem.defaultProps = {
    showActions : true
}

PostItem.propTypes = {
    deletePost : PropTypes.func.isRequired,
    likePost : PropTypes.func.isRequired,
    unlikePost : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    post : PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps,{deletePost, likePost,unlikePost})(PostItem)