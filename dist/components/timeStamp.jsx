'use client';
import React from 'react';
export default function TimeStamp(_a) {
    var createdAt = _a.createdAt, dateFormat = _a.dateFormat;
    // absolute timestamp
    var absoluteTimeStamp = function (createdAt) {
        var date = new Date(createdAt);
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var day = date.getDate().toString().padStart(2, '0');
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var formattedHours = hours.toString().padStart(2, '0');
        var formattedMinutes = minutes.toString().padStart(2, '0');
        var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var dayOfWeek = daysOfWeek[date.getDay()];
        return "".concat(month, "/").concat(day, "/").concat(year, " ").concat(dayOfWeek, " ").concat(formattedHours, ":").concat(formattedMinutes);
    };
    // relative timestamp
    var relativeTimeStamp = function (createdAt) {
        var date = new Date(createdAt);
        var now = new Date();
        var diff = now.getTime() - date.getTime();
        var seconds = Math.floor(diff / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        var weeks = Math.floor(days / 7);
        var months = Math.floor(days / 30);
        var years = Math.floor(days / 365);
        if (years > 0) {
            return "".concat(years, " year").concat(years > 1 ? 's' : '', " ago");
        }
        else if (months > 0) {
            return "".concat(months, " month").concat(months > 1 ? 's' : '', " ago");
        }
        else if (weeks > 0) {
            return "".concat(weeks, " week").concat(weeks > 1 ? 's' : '', " ago");
        }
        else if (days > 0) {
            return "".concat(days, " day").concat(days > 1 ? 's' : '', " ago");
        }
        else if (hours > 0) {
            return "".concat(hours, " hour").concat(hours > 1 ? 's' : '', " ago");
        }
        else if (minutes > 0) {
            return "".concat(minutes, " minute").concat(minutes > 1 ? 's' : '', " ago");
        }
        else {
            return "".concat(seconds, " second").concat(seconds > 1 ? 's' : '', " ago");
        }
    };
    var timeStamp = dateFormat === 'absolute' ? absoluteTimeStamp(createdAt) : relativeTimeStamp(createdAt);
    return (<p className="text-caption text-light-text-secondary dark:text-dark-text-secondary">
            {timeStamp}
        </p>);
}
;
