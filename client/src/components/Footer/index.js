import React from 'react';
import gitHubImage from '../../images/github.png'
import linkInImage from '../../images/linkin.png'
import facebookImage from '../../images/facebook.png'


const gibHubHandleClick = () => {
    window.location.href = 'https://github.com/houchenghao';
};

const linkinHandleClick = () => {
    window.location.href = 'https://www.linkedin.com/in/chenghao-hou-7946b758/';
}

const facebookHandleClick = () => {
    window.location.href = 'https://www.facebook.com/chenghao.hou';
}

function Footer() {
  return (
    <div className='footer'>
        <div>   
            <img className='image'
                src = {gitHubImage}
                alt = 'Github'
                onClick= {gibHubHandleClick}
                style = {{cursor: 'pointer'}}
            />
        </div>
        <div>
            <img className='image'
                src = {linkInImage}
                alt = 'Github'
                onClick= {linkinHandleClick}
                style = {{cursor: 'pointer'}}
            />
        </div>
        <div>
            <img className='image'
                src = {facebookImage}
                alt = 'Facebook'
                onClick= {facebookHandleClick}
                style = {{cursor: 'pointer'}}
            />
        </div>
    </div>

  );
}
export default Footer;
