import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CleanButton from '../components/clean-button';
import { validate as validateEmail } from 'email-validator';
import { getFullEndPoint, httpResponseCodes } from '../services/http';
import { saveTokenToLocalStorage } from '../services/authentication';
import { useHistory } from 'react-router-dom';

const LoginRegisterPage = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState(null);
	const [isValidEmail, setIsValidEmail] = useState(false);
	const [password, setPassword] = useState(null);
	const history = useHistory();

	const onEmailChange = (email) => {
		const isValidEmail = validateEmail(email);
		setIsValidEmail(isValidEmail);
		setEmail(email);
	};

	const submit = async (event) => {
		event.preventDefault();

		if (isFormNotComplete()) {
			return;
		}

		try {
			const endPoint = isLogin ? 'login' : 'register';
			const result = await axios.post(getFullEndPoint(`/authentication/${endPoint}`), { email, password });
			saveTokenToLocalStorage(result.data.token);
			history.push('/drivers');
		} catch (error) {
			handelFailedSubmit(error);
		}
	};

	const handelFailedSubmit = (error) => {
		console.error(error);

		if (!error.response) {
			alert('Unable to register, please try again later');
			return;
		}

		const { response } = error;

		if (response.status === httpResponseCodes.NOT_FOUND) {
			alert('Unable to find user');
		}

		if (response.status === httpResponseCodes.CONFLICT) {
			alert('User with the same email already exist \n please try a different email');
		}
	};

	const isFormNotComplete = () => {
		return !isValidEmail || !email || !password;
	};

	const ChangeFormTypeButton = () => {
		return <CleanButton onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Register' : 'Login'}</CleanButton>;
	};

	const FormTitle = () => {
		return isLogin ? (
			<Title>
				<h1>Login</h1>
				<h5>
					If we know you, we will let you pass
					<span role='img' aria-label='unlocked'>
						🔓
					</span>
				</h5>
			</Title>
		) : (
			<Title>
				<h1>Register</h1>
				<h5>
					If you are new, we will register you
					<span role='img' aria-label='clipboard'>
						📋
					</span>
				</h5>
			</Title>
		);
	};

	return (
		<Container>
			<Form>
				<FormTitle />
				<Fields>
					<Field>
						<label>Email*</label>
						<input type='email' onChange={(event) => onEmailChange(event.target.value)} />
						{email && !isValidEmail ? <ErrorLabel>Please provide a valid email address</ErrorLabel> : null}
					</Field>
					<Field>
						<label>Password*</label>
						<input type='password' onChange={(event) => setPassword(event.target.value)} />
					</Field>
					<SubmitButton type='submit' disabled={isFormNotComplete()} onClick={submit}>
						Submit
					</SubmitButton>
				</Fields>
				<ChangeFormTypeButton />
			</Form>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	height: 100vh;
`;

const Form = styled.form`
	width: 300px;
`;

const Title = styled.div`
	display: flex;
	flex-direction: column;
	h1,
	h5 {
		margin-bottom: 7px;
	}
`;

const Fields = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid black;
	border-radius: 5px;
	padding: 20px;
	margin-bottom: 5px;
`;

const Field = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 15px;
	input {
		margin-top: 5px;
	}
`;

const ErrorLabel = styled.label`
	font-size: 10px;
	color: ${({ theme }) => theme.colors.error};
`;

const SubmitButton = styled(CleanButton)`
	width: fit-content;
	:disabled {
		opacity: 0.3;
	}
`;

export default LoginRegisterPage;
