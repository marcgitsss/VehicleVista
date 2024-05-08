import React, { useState } from 'react';
import './menu.css';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    console.log(`Clicked: ${item}`);
  };

  return (
    <div>
       <button onClick={toggleMenu}>
        <img src={"/dropMenu.svg"} alt="Menu" className='imgMenu'/>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li onClick={() => handleItemClick('Home')}>Home</li>
            <li onClick={() => handleItemClick('About Us')}>About Us</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
