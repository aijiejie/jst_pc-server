function ResultTemp(status, msg, data) {
    return {
        status,
        msg,
        data
    }
}

function getFormatTime(time) {
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}

function getFormatTimeNews(time) {
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
}

module.exports = {
    ResultTemp,
    getFormatTime,
    getFormatTimeNews
};