import React, {Component} from 'react';
import Notifications from './Components/NotificationSystem';

import helpers from './Components/utils/helpers';

class App extends Component {

	constructor(props) {
		super(props);
    //bind this to custom functions
		this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.newUser = this.newUser.bind(this);
    this.addMedication = this.addMedication.bind(this);
    this.deleteMedication = this.deleteMedication.bind(this);
		//set initial state
    this.state = {
      isAuth: false,
			user: {
        _id: '',
        username: '',
        medications: []
      },
      notification: {
        title: null,
        message: null,
        level: null
      }
		}
	}

  componentWillMount() {
    //check if user and auth stored in session storage
    const isAuth = JSON.parse(sessionStorage.getItem('isAuth'));
    const user = JSON.parse(sessionStorage.getItem('user'));

    //only set state if we have both values in sessionstorate
    if(isAuth && user) {
      this.setState({isAuth: isAuth, user: user});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //keep notifications from refiring on every update to state
    if(prevState.notification.title) {
      this.setState({notification: {title: null, message: null, level: null}});
    }
  }

  //the following functions are promise based, the logs are set for future development in handling errors
  newUser(username, password) {
    console.log('Signup Form Submission');

    helpers.newUser(username, password).then((res) => {
      console.log('back from signup helper');

      const user = {
        _id: res.data._id,
        username: res.data.username,
        medications: res.data.medications
      }
      //store user in session storage
      sessionStorage.setItem('isAuth', 'true');
      sessionStorage.setItem('user', JSON.stringify(user));

      //setstate
      this.setState({isAuth: true, user: user});
    }).catch(err=>{
      console.error(err);
      this.setState({notification: {title: err.title, message: err.message, level: 'warning'}})
    });
  }

	login(username, password) {
		console.log('Login Form Submission');

  	helpers.loginUser(username, password).then(res=> {
  		console.log('back from login helper');
      const user = {
        _id: res.data._id,
        username: res.data.username,
        medications: res.data.medications
      }
      //store user in session storage
      sessionStorage.setItem('isAuth', 'true');
      sessionStorage.setItem('user', JSON.stringify(user));

      //setstate
      this.setState({isAuth: true, user: user});
  	}).catch(err => {
      console.error(err);
      this.setState({notification: {title: 'Invalid Username/Password', message: 'No username with this password was found. Please try again.', level: 'error'}})
    });
  }

  logout() {
    console.log('Logout User Clicked');
    helpers.logoutUser().then(res=>{
      //take user out of session storage
      sessionStorage.setItem('isAuth', 'false');
      sessionStorage.setItem('user', 'null');
      //setstate
      this.setState({isAuth: false, user: {}, notification: {title: res.title, message: res.message, level: 'success'}});
    }).catch(err=>{if(err)console.error(err)});
  }

  addMedication(medication, id) {
    console.log('Add Medication Form Submission');
    helpers.addMeds(medication, id)
    .then(({data:{user}})=> this.setState({user}))
    .catch(err=>{
      console.error(err);
      this.setState({notification: {title: 'Invalid Search Term', message: 'Please Check the Spelling of Your Search Term and Try Again', level: 'warning'}})
    });
  }

  deleteMedication(medication, id) {
    console.log('Delete Medication Called');
    helpers.deleteMeds(medication, id)
    .then(({data:{user}})=> this.setState({user}))
    .catch(err=> this.setState({
      notification: {
        title: 'Could Not Delete',
        message: 'Something Went Wrong, Please Check Your Internet Connection and Try Again',
        level: 'error'}}));
  }

  render() {
    //clone element allows us to send props down one level to the children that will be rendered later
    let parentProps = {
      isAuth: this.state.isAuth,
      newUser: this.newUser,
      login: this.login,
      logout: this.logout,
      addMedication: this.addMedication,
      deleteMedication: this.deleteMedication,
      user: this.state.user
    }
   	return (
   		<div>
        <Notifications notification={this.state.notification}/>
        {React.cloneElement(this.props.children, parentProps)}
      </div>
   	);
  }
}

export default App;
