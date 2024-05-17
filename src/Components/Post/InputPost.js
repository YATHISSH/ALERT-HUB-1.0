import "../Post/InputPost.css"
// import Profile from "../../assets/profile.jpg"
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { AiOutlineIssuesClose } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { RiUserLocationLine } from "react-icons/ri";
import {MdLocationCity } from "react-icons/md"
import { Center } from "@mantine/core";
import React, { useState } from 'react';
import axios from 'axios';
// import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
// import KeyboardVoiceRoundedIcon from '@mui/icons-material/KeyboardVoiceRounded';
// import {FaSmile} from "react-icons/fa"



const InputPost = ({ handleSubmit, setBody, body, images, setImages }) => {
  const [issue, setIssue] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [issuepic,setIssuepic]=useState(null);

  const handleImageChange = (e) => {
    setIssuepic(e.target.files[0]);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!issue || !pincode || !address || !issuepic) {
      // If any of the mandatory fields is not filled, show an error
      window.alert('Please fill in all the mandatory fields');
      return;
    }
    try {
      const userId = sessionStorage.getItem('name'); 
      const score = sessionStorage.getItem('score');
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('content', issue);
      formData.append('pincode', pincode);
      formData.append('address', address);
      formData.append('issuepic', issuepic);
      formData.append('score',score);
      console.log('score:', score);
      console.log(issuepic);// You need to get the user ID somehow
      formData.append('imagePath', issuepic.name);
      setIssue('');
      setPincode('');
      setAddress('');
      setIssuepic(null);
      const response = await axios.post('http://localhost:5000/api/posts', formData,
      {headers:{
        'Content-Type': 'multipart/form-data',
      }});
      console.log(response.data.message); // Assuming the server sends back a message
      const updatedScore = parseInt(sessionStorage.getItem('score')) + 5;
      sessionStorage.setItem('score', updatedScore.toString());
      // Optionally, you can update UI or perform other actions after successful post creation
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
     <div className="i-form">
        <form onSubmit={handlePostSubmit}>
            <div className="i-input-box">
            <FaUserCircle style={{ fontSize: "38px", color: "rgb(8, 81, 113)" }}/>
            <textarea
    className="issue"
    id="issue"
    name="address"
    placeholder="Describe The Issue..."
    value={issue}
    onChange={(e) => setIssue(e.target.value)}
    style={{
      fontSize: '20px',
      borderRadius: '20px',
      width: '95%', 
      minHeight: '50%',
      textAlign: 'center',
      margin: '10px 10px 10px 10px',
      color: 'rgb(8, 81, 113)',
      resize: 'vertical', 
    }}
  ></textarea>
            </div>
            <div className="file-upload">
  <div className="file-icons">
    <label htmlFor="file" className="pv-upload">
      <input type="file" id="file" style={{ display: 'none' }} onChange={(e) => handleImageChange(e)} />
      <PhotoLibraryIcon
        className="input-svg" 
        //value={issuepic} onChange={(e) => setIssuepic(e.target.value)}
        style={{ fontSize: "38px", color: "rgb(8, 81, 113)" }}
      />
      <span className="photo-dis" style={{fontWeight:"bolder"}}>Upload Photo</span>
    </label>
<label htmlFor="dropdown" className="pv-upload">
<AiOutlineIssuesClose style={{fontSize:"40px",color:"rgb(8, 81, 113)",fontWeight:"bolder"}}/>
<span style={{fontWeight:"bolder"}} >Choose Issue</span> 
<select id="file" className="issue" style={{fontSize:"15px",borderRadius:"100px",width:"200px",height:"50px",textAlign:"center",margin:"10px 10px 10px 10px" ,color:"rgb(8, 81, 113)"}}> 
    <option value="option2">Mosquito Breeding</option>
    <option value="option3">Potholed roads</option>
    <option value="option4">Water stagnation</option>
    <option value="option8">Improper drainage system</option>
    <option value="option5">Poor quality of ration products</option>
    <option value="option6">Frequent power fluctuation </option>
    <option value="option7">Unsafe overhead electric wires</option>
    <option value="option7">Street Light</option>
    <option value="option7">Park and Playground</option>
    <option value="option7">Public Toilet</option>
    <option value="option7">Building Plan Permission</option>
    <option value="option7">Garbage</option>
    <option value="option7">General</option>
    <option value="option7">Public Health</option>
    <option value="option7">Road and Footpath</option>
    <option value="option7">Air Quality</option>
    <option value="option7">Storm Water Drains</option>
    <option value="option7">Water / Electricity</option>
    <option value="option7">MEGA STREETS - PLANNING PHASE</option>
    <option value="option7">MEGA STREETS - OPERATION PHASE</option>
</select>
</label> 
  <label htmlFor="pincode" className="pv-upload"> 
  <RiUserLocationLine style={{fontSize:"40px",color:"rgb(8, 81, 113)",}}/>
<input style={{fontSize:"20px",borderRadius:"20px",width:"150px",height:"40px",margin:"10px 10px 10px 10px",textAlign:"center" ,color:"rgb(8, 81, 113)"}}
  type="number"
    id="pincode"
    name="pincode"
    rows="1"
    placeholder=" Pincode "
    value={pincode}
    onChange={(e) => setPincode(e.target.value)}
    maxLength="6"
    onInput={(e) => e.target.value = e.target.value.slice(0, 6)}
  ></input></label>



 <label htmlFor="address" className="pv-upload">
  <MdLocationCity style={{ fontSize: '40px', color: 'rgb(8, 81, 113)' }} />
  <textarea
    className="address-input"
    id="address"
    name="address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    placeholder="Address"
    style={{
      fontSize: '20px',
      borderRadius: '20px',
      width: '100%', 
      minHeight: '80px',
      textAlign: 'center',
      marginLeft:'0%',
      margin: '10px 10px 10px 10px',
      color: 'rgb(8, 81, 113)',
      resize: 'vertical', 
    }}
  ></textarea>
</label>

          {/* <div className="pv-upload">
            <PlayCircleFilledOutlinedIcon className="input-svg" style={{fontSize:"38px",color:"black"}}/>
            <span className='photo-dis'>Video</span>
          </div>

          <div className="pv-upload">
            <KeyboardVoiceRoundedIcon className="input-svg" style={{fontSize:"38px",color:"green"}}/>
            <span className='photo-dis'>Audio</span>
          </div>

          <div className="pv-upload">
            <FaSmile className="input-svg" style={{fontSize:"30px",color:"red"}}/>
            <span className='photo-dis'>Feelings/Activity</span>
         
         </div> */}
      </div>
       
          {/* <button type='submit'>Share</button> */}

        <div style={{display:"none"}} >
            <input 
            type="file" 
            id="file"
            accept=".png,jpeg,.jpg"
            onChange={(e) => handleImageChange(e.target.files[0])}
             />
          </div>
          <button style={{}}>Post</button> 
      </div>

        {images && (
          <div className="displayImg">
            <CloseRoundedIcon onClick={()=>setImages(null)}/>
            <img src={URL.createObjectURL(images)} alt="" />
          </div>
        )}

        </form>
     </div>
  )
}

export default InputPost