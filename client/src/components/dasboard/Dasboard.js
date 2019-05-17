import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile, deleteAccount} from '../../actions/profileAction'
import Spinner from '../common/Spinner'
import {Link} from 'react-router-dom'
import Profile from './Profile'
import Experience from './Experience'
import Education from './Education'

class Dasboard extends Component {

    componentDidMount(){
        this.props.getCurrentProfile();
    }

    onDeleteAccount = (e) =>{
        e.preventDefault()
        this.props.deleteAccount()
    }
    
    render() {

        const {user} = this.props.auth
        const {profile,loading} = this.props.profile

        let dashboardContent;

        if(profile === null || loading) {
            dashboardContent = <Spinner/>
        }else { // trường hợp profile {} or có dữ liệu
            // Check user has profile
            if(Object.keys(profile).length > 0) { // nếu có gì đó trong obj profile thì key sẽ > 0
                dashboardContent = ( <div>
                    <p className="lead text-muted"> Welcome  <Link to={`profile/${profile.handle}`} > { user.name } </Link> </p>
                    <Profile/>
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />
                    <div style={{marginBottom : '30px'}}>
                        <button onClick={this.onDeleteAccount} className="btn btn-danger">Delete My Account</button>
                    </div>
                </div> )
            } else {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted"> Welcome  { user.name } </p>
                        <p> You have not yet profile. Please add some info </p>
                        <Link to="/create-profile" className="btn btn-lg btn-info" > Create Profile </Link>
                    </div>
                )
            }
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4"> Dashboard </h1>
                            {dashboardContent}
                        </div>   
                    </div>
                </div>
            </div>
        );
    }
}

Dasboard.propTypes = {
    getCurrentProfile : PropTypes.func.isRequired,
    deleteAccount : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    profile : PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
        profile : state.profile
    }
}


export default connect(mapStateToProps, {getCurrentProfile,deleteAccount})(Dasboard)