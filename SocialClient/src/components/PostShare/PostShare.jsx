import React, { useState, useRef } from "react";
import ProfileImage from "../../img/profileImg.jpg";
import { UilScenery } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Posts from '../Posts/Posts';

const PostShare = () => {
  const [content, setContent] = useState("");
  const [mediaType, setMedia] = useState(null);
  const [previewMedia, setPreviewMedia] = useState(null);
  const mediaRef = useRef();
  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onMediaChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let mediaFile = event.target.files[0];
      setMedia(mediaFile);
      setPreviewMedia(URL.createObjectURL(mediaFile));
    }
  };

  const handleShare = async () => {
    try {
      const formData = new FormData();
      formData.append("content", content);
      if (mediaType) {
        formData.append("mediaType", mediaType);
      }
      formData.append("location", location);
      formData.append("schedule", selectedDate);

      // Make the API call to share the post
      const response = await axios.post("http://localhost:5040/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Post shared successfully:", response.data);
       // Call the updatePosts function to fetch and update the list of posts
       //updatePosts();
       const navigateTo = useNavigate();
        // Redirect to the posts page
        navigateTo(<Posts/>);
      // Add logic to update the list of posts or redirect to the posts page
    } catch (error) {
      console.error("Error sharing post:", error);
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
            {mediaType.type.includes("image") ? (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostShare;


