
const time_diff = (start, end) => {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    // return (hours < 9 ? "0" : "") + hours + (hours < 2 ? " Hour " : " Hours ") + (minutes < 9 ? "0" : "") + minutes + (minutes < 2 ? " Minute" : " Minutes");
    return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
}

const formatAMPM = date => {
    var hours = date.split(":")[0];
    var minutes = date.split(":")[1];
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = timeTwoDigit(hours) + ':' + timeTwoDigit(minutes) + ' ' + ampm;
    return strTime;
}

const timeTwoDigit = num => ("0" + num).slice(-2)

const dateFormat = date => `${timeTwoDigit(date.getDate())}-${timeTwoDigit(date.getMonth() + 1)}-${date.getFullYear()}`

const convertToJSDate = (dateString) => {
    let d = dateString.split("-");
    let dat = new Date(d[2] + '-' + d[1] + '-' + d[0]);
    return dat;
}

module.exports = {
    time_diff,
    formatAMPM,
    timeTwoDigit,
    dateFormat,
    convertToJSDate
}