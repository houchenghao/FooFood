import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import { Button } from 'antd';
import { UserOutlined, LogoutOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons'

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header  className=" text-light mb-4 py-3 header-background">
      <div className="container flex justify-between items-center ">
        <div>
          <Link className='header-font-family' to="/" style={{ textDecoration: 'none', color: '#d12525' }}>
            <div>
              FooFood
            </div>
          </Link>

        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="header-welcome-font" to="/me">
                {/* Welcome {Auth.getProfile().data.username} */}
                My Profile
              </Link>
                <Button onClick={logout} className="mr-2" shape="round" icon={<LogoutOutlined />}
                  style={{ color: '#282a2b', backgroundColor: '#6475f7', borderColor: '#3c1a9b' }}
                >
                  Logout
                </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className="mr-2" shape="round" icon={<LoginOutlined />}
                  style={{ color: '#282a2b', backgroundColor: '#6475f7', borderColor: '#3c1a9b' }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="mr-2" shape="round" icon={<UserAddOutlined />}
                  style={{ color: '#282a2b', backgroundColor: '#6475f7', borderColor: '#3c1a9b' }}
                >
                  Signup
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
