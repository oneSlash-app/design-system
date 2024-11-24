'use client';
import React from 'react';
export default function UserImage(_a) {
    var userHandle = _a.userHandle, userImgUrl = _a.userImgUrl;
    var defaultInitial = userHandle.charAt(0).toUpperCase();
    return (<div className="flex items-center justify-center w-6 h-6 rounded-full overflow-hidden
			bg-light-background-accent200 dark:bg-dark-background-accent200 
			text-light-text-secondary dark:text-dark-text-secondary ">
      {userImgUrl ? (<img src={userImgUrl} alt={userHandle} className="w-full h-full object-cover rounded-full"/>) : (<span className="text-body1">
					{defaultInitial}
				</span>)}
    </div>);
}
