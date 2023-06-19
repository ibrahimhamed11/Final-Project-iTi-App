import React from 'react';
import { useSelector } from 'react-redux';
const NotificationCounter = () => {
    const notificationCount = useSelector((state) => state.notificationCount);

    return (
        <div>
            <h3>Notification Count: {notificationCount}</h3>
            {/* Additional code for displaying or using the notification count */}
        </div>
    );
};

export default NotificationCounter;
