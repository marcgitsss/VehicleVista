import React from 'react';
import './ChangePasswordCard.css';

function ChangePasswordCard () {
  return (
    <div className="change-password-card-container">
      <div className="change-password-form-container" >
        <form className="change-password-form">
          <p className="change-password-form-title">Change Password</p>
          <div className="change-password-input-container">
            <input type="password" placeholder="Enter old password" />
          </div>
          <div className="change-password-input-container">
            <input type="password" placeholder="Enter new password" />
          </div>
          <div className="change-password-input-container">
            <input type="password" placeholder="Confirm new password" />
          </div>
          <button type="submit" className="change-password-submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordCard;
