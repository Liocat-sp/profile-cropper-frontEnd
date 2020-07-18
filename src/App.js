import React from 'react';
import './App.css';
import ImageCropper from './ImageCropper/imageCropper';

function App() {
  return (
    <div className="App">
      <nav className="navigation">
        <div className="nav_head"><h2>Profile Cropper</h2></div>
      </nav>
      <main><ImageCropper /></main>
    </div>
  );
}

export default App;
