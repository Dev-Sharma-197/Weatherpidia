// Getting element by ID
var curDate = document.getElementById("day");
var weathercon = document.getElementById("temp_status");

// Getting weather Status
const tempStatus = weathercon.innerHTML;

// Getting other countries time
const apiZone = curDate.innerHTML;

console.log(tempStatus);

// Conditioning Weather situations and icons
if (tempStatus == "Clear") {
  weathercon.innerHTML = '<i class="fas fa-sun" style= "color: #eccc68"></i>';
} else if (weathercon.innerHTML == "Clouds") {
  weathercon.innerHTML = '<i class="fas fa-cloud" style= "color: #dfe4ea"></i>';
} else if (tempStatus == "Rain") {
  weathercon.innerHTML =
    '<i class="fas fa-cloud-rain" style= "color: #898989"></i>';
} else if (tempStatus == "Snow") {
  weathercon.innerHTML = '<i class="fas fa-snowman" style= "color: #fff"></i>';
} else if (tempStatus == "Thunderstorm") {
  weathercon.innerHTML =
    ' <i class="fas fa-cloud" style= "color: #5e6364"></i> <i class="fa fa-bolt" style= "color: #dfd12b"></i>';
} else if (tempStatus == "Mist") {
  weathercon.innerHTML = '<i class="fas fa-smog" style= "color: #5e6364"></i>';
} else {
  weathercon.innerHTML = "------";
}

// Getting searched location time
var b = new Date();
var utc = b.getTime() + b.getTimezoneOffset() * 60000;
const nUtc = utc + 1000 * apiZone;

// Getting current day and displaying with user-defined function
const getCurrentDay = () => {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednnesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let currentTime = new Date(nUtc);
  let day = weekday[currentTime.getDay()];
  return day;
};

// Getting Systems current date and time and displaying with user-defined function
const getCurrentTime = () => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  var now = new Date(nUtc);
  var month = months[now.getMonth()];
  var date = now.getDate();
  let hours = now.getHours();
  let mins = now.getMinutes();
  let period = "AM";

  if (hours > 11) {
    period = "PM";
    if (hours > 12) hours -= 12;
  }

  if (mins < 10) mins = "0" + mins;
  return ` ${month} ${date} | ${hours}:${mins} ${period}`;
};

// Displaying date, time and day
curDate.childNodes[0].nodeValue = ` ${getCurrentDay()} | ${getCurrentTime()}`;

console.log("js file is running");
