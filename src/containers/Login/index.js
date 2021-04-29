import React, {  useState } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
/**
 * @author
 * @function Login
 **/

const Login = (props) => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const auth = useSelector(state => state.auth);
	
	const dispatch = useDispatch();
	

	const userLogin = (e) => {
	
		e.preventDefault();
	
		const user = {
			email , password
		}
		
		dispatch(login(user));
	};

	if(auth.authenticate){
		return <Redirect to={'/'} />
	}
	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: '50px' }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={userLogin}>
							<Input
								label='Email'
								placeholder='Enter Email'
								value={email}
								type='email'
								onChange={(e) => setEmail(e.target.value)}
							/>

							<Input
								label='Password'
								placeholder='Enter Password'
								value={password}
								type='password'
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Button variant='primary' type='submit'>
								Submit
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
};

export default Login;
