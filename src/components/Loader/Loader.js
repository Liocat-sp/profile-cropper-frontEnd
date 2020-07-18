import React from 'react';
import './Loader.css';

const Loader = (props) => {
    return (
        <div className={`${props.asOverLay && 'loading-overlay'} `}>
            <div className="dual-ring"></div>
        </div>
    );
} 
export default Loader;