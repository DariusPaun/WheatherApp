// LoadingSpinner.js

import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div id="spinner-container">
     <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

export default LoadingSpinner;