import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import { Input, Button, Typography, Card } from 'antd';

import Auth from '../utils/auth';

const { Text } = Typography;

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='login-flex'>
      <div className='login-container'>
        <div className="flex-row justify-center mb-4 ">
          <Card title="Sign Up" className="login-card"
          style={{ backgroundColor: '#bcddeb', borderColor: '#7c6e52' }}>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <Input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <Input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <Input.Password
                  className="form-input"
                  placeholder="******"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <Button
                  style={{ backgroundColor: '#242321' }}
                  className="submit-button"
                  type="primary"
                  block
                  onClick={handleFormSubmit}
                >
                  Signup
                </Button>
              </form>
            )}

            {error && (
              <div className="error-message">
                <Text type="danger">{error.message}</Text>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>



  );
};

export default Signup;
