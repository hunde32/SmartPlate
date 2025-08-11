import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

import './userPrompt.css'; 

const UserPrompt = ({ text }) => {
  return (
    <div className="user-prompt-container">
      <FontAwesomeIcon icon={faCircleUser} className="usr-icon" />
      <div className="user-text-bubble">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default UserPrompt;
