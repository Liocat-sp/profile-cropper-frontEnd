import React from 'react';
import './App.css';
import ImageCropper from './ImageCropper/imageCropper';

function App() {
  return (
    <div className="App">
      <nav className="navigation"></nav>
      <main><ImageCropper /></main>
    </div>
  );
}

export default App;
