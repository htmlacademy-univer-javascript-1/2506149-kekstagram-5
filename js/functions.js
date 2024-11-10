/* eslint-disable no-unused-vars */
function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}

function isPalindrom(str) {
  str = str.toLowerCase();
  return str === str.split('').reverse().join('');
}

function extractNumber(arg){
  const string = arg.toString();
  let res = '';
  for(let i = 0; i < string.length; i++){
    if(!Number.isNaN(parseInt(string[i], 10))){
      res += string[i];
    }
  }
  return parseInt(res, 10);
}

function isMeetingWithinWorkHours(workStart, workEnd, meetingStart, durationMinutes) {
  function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }
  const meetingEndMinutes = timeToMinutes(meetingStart) + durationMinutes;

  return timeToMinutes(workStart) <= timeToMinutes(meetingStart) && meetingEndMinutes <= timeToMinutes(workEnd);
}
