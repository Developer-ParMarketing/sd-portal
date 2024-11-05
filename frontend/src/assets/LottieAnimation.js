// LottieAnimation.js
import React from 'react';
import Lottie from 'react-lottie';
import animationData from './Animation/User/User.json'; // Adjust the path to your animation file

const LottieAnimation = () => {
  const defaultOptions = {
    loop: true, // Set to true to loop the animation
    autoplay: true, // Set to true to autoplay the animation
    animationData: animationData, // Your animation data
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // Adjust as necessary
    },
  };

  return <Lottie options={defaultOptions} height={400} width={400} />;
};

export default LottieAnimation;
