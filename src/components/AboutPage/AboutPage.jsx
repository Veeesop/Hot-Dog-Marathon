import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h1>About</h1>
        <h2>Special Thanks:</h2>
        <ul>
          <li>Nick Wiess</li>
          <li>Stephanie Ratanas</li>
          <li>Jeannie Branstrator</li>
          <li>Prime Academy</li>
        </ul>
        <h2>Technologies Used:</h2>
        <ul>
          <li>React</li>
          <li>Redux</li>
          <li>Redux Sagas</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>TensorFlow.js</li>
          <li>Cloudinary Api</li>
        </ul>
      </div>
      <div>
        <h2>github.com/Veeesop</h2>
        <h2>Alex Ratanas</h2>
      </div>
      
    </div>
  );
}

export default AboutPage;
