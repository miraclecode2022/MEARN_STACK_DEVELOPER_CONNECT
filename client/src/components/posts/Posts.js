import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {getPosts} from '../../actions/postAction'
//
import Spinner from '../common/Spinner'
import PostForm from './PostForm'
import PostFeed from './PostFeed'

class Posts extends Component {
    componentDidMount(){
        this.props.getPosts()
    }
    render() {
        const { posts, loading } = this.props.post

        let postContents

        if (posts === null || loading){
            postContents = <Spinner/>
        } else {
            postContents = <PostFeed posts={posts}/>
        }
        return (
            <div className="feed">
                <div className="container">
                    <div className="col-md-12">
                         <PostForm/>
                         {postContents}
                    </div>
                </div>
            </div>
        );
    }
}

Posts.propTypes = {
    post : PropTypes.object.isRequired,
    getPosts : PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        post: state.post
    }
}

export default connect(mapStateToProps, {getPosts})(Posts)