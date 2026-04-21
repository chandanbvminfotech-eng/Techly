import React from "react";

const UserAvatar = ({name, avatarLink}) => {
  return (
     
      <img
        src={avatarLink}
        alt={name}
        className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
      />
   
  );
};

export default UserAvatar;
