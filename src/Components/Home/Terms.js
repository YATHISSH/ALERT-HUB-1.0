import React from 'react';
import './Terms.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
const TermsPage = () => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h1 style={{fontFamily:"casteller",textAlign:"center",color:"green"}}>ABOUT ALERTHUB 1.0</h1>
        <p style={{fontFamily:"casteller",textAlign:"center",color:"rgb(8, 77, 106)"}}>Welcome to ALERTHUB 1.0!</p>
        <p>ALERTHUB 1.0 is a cloud-based ML-driven web application aimed at revolutionizing community engagement for sustainability. Users can report issues such as pollution, mosquito breeding, water logging, flood, etc., which are crucial for community well-being.</p>
        <p style={{fontFamily:"casteller",textAlign:"center",color:(8, 77, 106),fontWeight:"bolder"}}>By using ALERTHUB 1.0, you should follow the below steps without fail</p>
        <ol>
          <li>You agree to post only truthful and accurate information about issues affecting your community.</li>
          <li>You agree to abide by the rules and guidelines set forth by ALERTHUB 1.0 for user conduct and content.</li>
          <li>You understand that your use of ALERTHUB 1.0 is subject to monitoring and moderation by administrators.</li>
          <li>You agree to indemnify and hold harmless ALERTHUB 1.0 and its affiliates from any claims arising from your use of the platform.</li>
          <li>You acknowledge that ALERTHUB 1.0 reserves the right to remove any content deemed inappropriate or in violation of these terms and conditions.</li>
          <li>You understand that ALERTHUB 1.0 may periodically update these terms and conditions, and it is your responsibility to review them regularly and act accordingly.</li>
        </ol>
         {/* <p>By accepting these terms and conditions, you can proceed to use ALERTHUB 1.0.</p> */}
         <Link to="/home"><button className="accept-button" style={{fontFamily:"casteller",textAlign:"center"}}> Great ! Start Your Journey ☘️</button> </Link>
      </div>
    </div>
  );
};

export default TermsPage;


