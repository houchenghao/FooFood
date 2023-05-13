import React, { useState } from 'react';
import { Link, Navigate} from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Input, Button, Typography, Card } from 'antd';



import Auth from '../utils/auth';

const { Text } = Typography;

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
    
  };

  return (
    // <main className="flex-row justify-center mb-4">
    //   <div className="col-12 col-lg-10">
    //     <div className="card">
    //       <h4 className="card-header bg-dark text-light p-2">Login</h4>
    //       <div className="card-body">
    //         {data ? (
    //           <p>
    //             Success! You may now head{' '}
    //             <Link to="/">back to the homepage.</Link>
    //           </p>
    //         ) : (
    //           <form onSubmit={handleFormSubmit}>
    //             <input
    //               className="form-input"
    //               placeholder="Your email"
    //               name="email"
    //               type="email"
    //               value={formState.email}
    //               onChange={handleChange}
    //             />
    //             <input
    //               className="form-input"
    //               placeholder="******"
    //               name="password"
    //               type="password"
    //               value={formState.password}
    //               onChange={handleChange}
    //             />
    //             <button
    //               className="btn btn-block btn-primary"
    //               style={{ cursor: 'pointer' }}
    //               type="submit"
    //             >
    //               Submit
    //             </button>
    //           </form>
    //         )}

    //         {error && (
    //           <div className="my-3 p-3 bg-danger text-white">
    //             {error.message}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </main>
  
<div className='login-flex'>
  <div className='login-container'>
    <div className="flex-row justify-center mb-4 ">
      <Card title="Login" className="login-card" 
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
              style={{backgroundColor:'#242321'}}
              className="submit-button"
              type="primary"
              block
              onClick={handleFormSubmit}
            >
              Login
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

export default Login;
