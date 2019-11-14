import { connect } from 'react-redux';
import { createNewUser } from '../../actions/session';
import Signup from './signup';

const mapStateToProps = ({errors}) => ({
  errors: errors.session
})

const mapDispatchToProps = dispatch => {
  return {createNewUser: formUser => dispatch(createNewUser(formUser))}
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);