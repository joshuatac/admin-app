import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../actions';
/**
 * @author
 * @function Register
 **/

const Register = () => {

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const auth = useSelector((state) => state.auth);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

useEffect(() => {
if (!user.loading) {
	setFirstName("");
	setLastName("");
	setEmail("");
	setPassword("");
}
}, [user.loading])

	const registerUser = (e) => { 
	
		e.preventDefault();

		const user = {
			firstName,
			lastName,
			email,
			password,
		} 

		dispatch(register(user));
	};

	if (auth.authenticate) {
		return <Redirect to={'/'} />;
	}

	if(user.loading){
		return <p>Loading.... !</p>
	}

	return (
		<Layout>
			<Container>
				{user.message}
				<Row style={{ marginTop: '50px' }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={registerUser}>
							<Row>
								<Col md={6}>
									<Input
										label='First Name'
										placeholder='Enter First Name'
										value={firstName}
										type='text'
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</Col>

								<Col md={6}>
									<Input
										label='Last Name'
										placeholder='Enter Last Name'
										value={lastName}
										type='text'
										onChange={(e) => setLastName(e.target.value)}
									/>
								</Col>
							</Row>
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
							<Button variant='primary' className="buttonColor" type='submit'>
								Submit
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
};

export default Register;
