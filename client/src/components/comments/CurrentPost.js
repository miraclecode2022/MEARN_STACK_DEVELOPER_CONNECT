import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {getCurrentPost} from '../../actions/postAction'
import Spinner from '../common/Spinner'
import PostItem from '../posts/PostItem';
import {Link} from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentFeed from './CommentFeed'

class CurrentPost extends Component {

    componentDidMount(){
        this.props.getCurrentPost(this.props.match.params.id)
    }

    render() {
        const { post , loading } = this.props.post

        let currentPostItem

        if(post === null || loading || Object.keys(post).length === 0){
            currentPostItem = <Spinner/>
        }else {
            currentPostItem = (<div>
                <PostItem post={post} showActions={false}/>
                <CommentForm postId={post._id} />
                <CommentFeed postId={post._id} comments={post.comments}/>
            </div>)
        }

        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3" > Back To Feed </Link>
                            {currentPostItem}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CurrentPost.propTypes = {
    getCurrentPost : PropTypes.func.isRequired,
    post : PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        post: state.post
    }
}


export default connect(mapStateToProps, {getCurrentPost})(CurrentPost)