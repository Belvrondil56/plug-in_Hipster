function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
        return Math.floor(interval) + " an(s)";
    }

    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " mois";
    }

    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " jour(s)";
    }

    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " heure(s)";
    }

    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minute(s)";
    }

    return Math.floor(seconds) + " seconde(s)";
}
// var aDay = 24*60*60*1000;
// console.log(timeSince(new Date(Date.now()-aDay)));
// console.log(timeSince(new Date(Date.now()-aDay*2)));

function numFormatter(num) {
    if (num > 999 && num < 1000000) {
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    } else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    } else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
}
