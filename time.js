function updateTime() {
    var dt = new Date();
    var formattedTime = new Intl.DateTimeFormat('en-US', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit'
    }).format(dt);
    document.getElementById("datetime").innerHTML = formattedTime;
}

setInterval(updateTime, 1000);
updateTime();
