import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'

//
import isEmpty from '../../validations/is-empty'

// Load common field
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'

// Load action
import { createProfile, getCurrentProfile } from '../../actions/profileAction'


class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs : false,
            handle : '',
            company : '',
            website : '',
            location : '',
            status : '',
            skills : '',
            githubusername : '',
            bio : '',
            twitter : '',
            facebook : '',
            youtube : '',
            instagram : '',
            errors : {}
        }
    }

    componentDidMount(){
        this.props.getCurrentProfile()
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({
                errors : nextProps.errors
            })
        }
        if(nextProps.profile.profile){
            const profile = nextProps.profile.profile

            // Bring skills array back to CSV
            const skillsCSV = profile.skills.join(',')

            // if profile field doesnt exists , make empty string
            profile.company = !isEmpty(profile.company) ? profile.company : "" ;
            profile.website = !isEmpty(profile.website) ? profile.website : "" ;
            profile.location = !isEmpty(profile.location) ? profile.location : '' ;
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '' ;
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '' ;
            profile.social = !isEmpty(profile.social) ? profile.social : {} ;
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '' ;
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '' ;
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '' ;
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '' ;

            // Then set state for component
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                youtube: profile.youtube,
                instagram : profile.instagram,
            })
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
        const profileData = {
            handle : this.state.handle,
            company : this.state.company,
            website : this.state.website,
            location : this.state.location,
            status : this.state.status,
            skills : this.state.skills,
            githubusername : this.state.githubusername,
            bio : this.state.bio,
            twitter : this.state.twitter,
            facebook : this.state.facebook,
            youtube : this.state.youtube,
            instagram : this.state.instagram,
        }
        // do action createProfile or edit and send history to push 
        this.props.createProfile(profileData, this.props.history)
    }
    

    render() {

        const {errors, displaySocialInputs} = this.state
        
        let socialInput 

        if(displaySocialInputs){
            socialInput = (
                <div>
                    <InputGroup
                        placeholder="Facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />
                    <InputGroup
                        placeholder="Youtube Channel URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />
                    <InputGroup
                        placeholder="Instagram Channel URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>
            )
        }

        // select options for status
        const options = [
            {label : "* Select Professional Status", value : 0},
            {label : "Manager", value : 'Manager'},
            {label : "Senior Developer", value : 'Senior Developer'},
            {label : "Developer", value : 'Developer'},
            {label : "Junior Developer", value : 'Junior Developer'},
            {label : "Fresher", value : 'Fresher'},
            {label : "Intern", value : 'Intern'},
            {label : "Instructor or Teacher", value : 'Instructor or Teacher'},
            {label : "Student or Learning", value : 'Student or Learning'},
            {label : "Other", value : 'Other'}
        ]

        return (
            <div className="create-profile">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <Link to="/dashboard" className="btn btn-light">
                        Go Back
                    </Link>
                    <h1 className="display-4 text-center">Edit Your Profile</h1>
                    <p className="lead text-center">Let's edit some information to make your profile stand out</p>
                    <small className="d-block pb-3">* = required field</small>
                    <form onSubmit={this.onSubmit}>

                        <TextFieldGroup
                            type="text"
                            placeholder="* Profile handle"
                            name="handle"
                            info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                            error={errors.handle}
                            value={this.state.handle}
                            onChange={this.onChange}
                        />

                        <SelectListGroup
                            type="text"
                            placeholder="Status"
                            name="status"
                            info="Give us an idea of where you are at in your career"
                            error={errors.status}
                            value={this.state.status}
                            onChange={this.onChange}
                            options={options}
                        />

                        <TextFieldGroup
                            type="text"
                            placeholder="Company"
                            name="company"
                            info="Could be your own company or one you work for"
                            error={errors.company}
                            value={this.state.company}
                            onChange={this.onChange}
                        />
                        
                        <TextFieldGroup
                            type="text"
                            placeholder="Website"
                            name="website"
                            info="Could be your own or a company website"
                            error={errors.website}
                            value={this.state.website}
                            onChange={this.onChange}
                        />
                    
                        <TextFieldGroup
                            type="text"
                            placeholder="Location"
                            name="location"
                            info="City & District suggested (eg. HCM, Q1)"
                            error={errors.location}
                            value={this.state.location}
                            onChange={this.onChange}
                        />

                        <TextFieldGroup
                            type="text"
                            placeholder="Skills"
                            name="skills"
                            info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                            error={errors.skills}
                            value={this.state.skills}
                            onChange={this.onChange}
                        />

                        <TextFieldGroup
                            type="text"
                            placeholder="Github Username"
                            name="githubusername"
                            info="If you want your latest repos and a Github link, include your username"
                            error={errors.githubusername}
                            value={this.state.githubusername}
                            onChange={this.onChange}
                        />

                        <TextAreaFieldGroup
                            placeholder="A short bio of yourself"
                            name="bio"
                            info="Tell us a little about yourself"
                            error={errors.bio}
                            value={this.state.bio}
                            onChange={this.onChange}
                        />

                        <div className="mb-3">
                            <button type="button" className="btn btn-light" onClick={() => {
                                this.setState(preState => ({
                                    displaySocialInputs : !preState.displaySocialInputs
                                }))
                            }}>
                            Add Social Network Links
                            </button>
                            <span className="text-muted ml-3 mr-2">Optional</span>
                        </div>
                        {socialInput}
                        <button type="submit" className="btn btn-info btn-block mt-4" > Send </button>

                        
                    </form>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

CreateProfile.propTypes = {
    getCurrentProfile : PropTypes.func.isRequired,
    createProfile : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        profile: state.profile,
        errors : state.errors
    }
}

export default connect(mapStateToProps, {createProfile,getCurrentProfile})(withRouter(CreateProfile))