import React from 'react';

function TodayInfo(){
    /**
     * Printing todays info at Navbar
     */
    const todayString = () => {
        let todaysDay = "";
        const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
        "Saturday"];
        let today = new Date();
        todaysDay = weekDay[today.getDay()] + ", " + months[today.getMonth()] + " " + today.getDate();
        return todaysDay
      };

    return(
        <div>
            <h2>My Day</h2>
            <blockquote>"The dream is free. The hustle is sold separately." – Steve Harvey</blockquote>
            <h3>{todayString()}</h3>
        </div>
    );
}

export default TodayInfo;