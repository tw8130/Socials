import React, { useState, useRef } from "react";
import ProfileImage from "../../img/profileImg.jpg";
import { UilScenery } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
//import { Image } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
//import cloudinary from 'cloudinary-core';

//import { useNavigate } from 'react-router-dom';
import Posts from '../Posts/Posts';

const PostShare = ({ updatePosts }) => {
  const [content, setContent] = useState("");
  const [mediaType, setMediaType] = useState(null);
  const [previewMedia, setPreviewMedia] = useState(null);
  const mediaRef = useRef();
  const [locationId, setLocation] = useState(null);
  const [taggedUsername, setTaggedUsername] = useState(""); // Add state for taggedUsername

const cloud_name="dkiemwgf6"
//   const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: "dkiemwgf6" });
//const cld = new Cloudinary({cloud: {cloudName: 'dkiemwgf6'}});

  //const navigateTo = useNavigate();
  //const [selectedDate, setSelectedDate] = useState(null);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  const onMediaChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let mediaFile = event.target.files[0];
      setMediaType(mediaFile.type);
      setPreviewMedia(URL.createObjectURL(mediaFile));
    }
  };
  
 
  const handleShare = async () => {
    try {
        // If an image is selected, upload it to Cloudinary
    if (previewMedia && (mediaType.includes('image') || mediaType.includes('video'))) {
      const formData = new FormData();
      formData.append('file', mediaRef.current.files[0]);
      formData.append('upload_preset', "jwxmmglh"); // Replace with your Cloudinary upload preset
    
      const response1 = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/${mediaType.includes('image') ? 'image' : 'video'}/upload`,
        formData
      );
      
      // Get the public URL of the uploaded image/video from Cloudinary's response
      const mediaUrl = response1.data.secure_url;
      console.log('Media uploaded to Cloudinary:', mediaUrl);

      

      // Continue with sharing the post, using imageUrl as the mediaUrl
      const postData = {
        content,
        mediaType,
        mediaUrl,
        locationId,
        taggedUsername,
      };

      // Make the API call to share the post
      const response = await axios.post("http://localhost:5040/post", postData,{
        withCredentials:true
      });
      if (response.data) {
        console.log('Post shared successfully:', response.data);
        updatePosts();
      }
    } else {
      // If no image is selected, continue with sharing the post without mediaUrl
      const postData = {
        content,
        locationId,
        taggedUsername,
      };

      // Make the API call to share the post
      const response = await axios.post("http://localhost:5040/post", postData,{
        withCredentials:true
      });
      if (response.data) {
        console.log('Post shared successfully:', response.data);
        updatePosts();
      }
    }
    } catch (error) {
      console.error("Error sharing post:", error.response.data);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <img className="w-12 h-12 rounded-full" src={ProfileImage} alt="" />
      <div className="flex-grow">
        <input
          className="w-full px-4 py-2 rounded-md border"
          type="text"
          placeholder="What's happening"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex items-center space-x-1 text-primary cursor-pointer" onClick={() => mediaRef.current.click()}>
            <UilScenery />
            <span>Photo/Video</span>
          </div>
          <div className="flex items-center space-x-1 text-primary">
            <UilLocationPoint />
            <span>Location</span>
          </div>
          <div className="flex items-center space-x-1 text-primary">
            <UilSchedule />
            <span>Schedule</span>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-md" onClick={handleShare}>
            Share
          </button>
          <input type="file" className="hidden" ref={mediaRef} onChange={onMediaChange} accept="image/*, video/*" />
        </div>
        {previewMedia && (
          <div className="flex items-center space-x-1 mt-2">
            <UilTimes className="cursor-pointer" onClick={() => setPreviewMedia(null)} />
            {mediaType.includes("image") ? (
              <img className="w-32 h-32 object-cover rounded-md" src={previewMedia} alt="" />
            ) : (
              <video className="w-32 h-32 rounded-md" src={previewMedia} controls />
            )}
          </div>
        )}
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex items-center space-x-1 text-primary">
            <UilLocationPoint />
            <input
              className="w-full px-4 py-2 rounded-md border"
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-1 text-primary">
          <UilScenery />
          <input
            className="w-full px-4 py-2 rounded-md border"
            type="text"
            placeholder="Tagged Username"
            value={taggedUsername}
            onChange={(e) => setTaggedUsername(e.target.value)}
          />
        </div>
          {/* <div className="flex items-center space-x-1 text-primary">
            <UilSchedule />
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full px-4 py-2 rounded-md border"
              placeholderText="Schedule"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PostShare;


