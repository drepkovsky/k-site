import axios from "axios";

const dev = "https://cors-anywhere.herokuapp.com/http://www.chatacerenka.sk/";

function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
}

function dayToString(date) {
  var options = { year: "numeric", month: "2-digit", day: "2-digit" };
  var mdy = new Date(date).toLocaleString("en-GB", options);
  mdy = mdy.split("/");
  var day = mdy[0];
  var month = mdy[1];
  var year = mdy[2];

  var dayString = year + "/" + month + "/" + day + "/";

  if (dayString == "///") return undefined;

  return dayString;
}

function dayToInt(date) {
  var mdy = dayToString(date);
  mdy = mdy.split("/");
  var year = mdy[0];
  var month = mdy[1];
  var day = mdy[2];

  var dayString = year + "" + month + "" + day + "";

  if (isNaN(parseInt(dayString))) return undefined;

  return parseInt(dayString);
}

function getNightsFromDates(from, to) {
  return Math.floor((to - from) / (1000 * 60 * 60 * 24));
}

export async function checkIfDateIsValid(from, to) {
  let nights = getNightsFromDates(from, to);
  const dates = { from: dayToInt(from), to: dayToInt(to) };
  const response = await axios
    .post(dev + "service/v1/checkdates.php", getFormData(dates), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "application/json, text/javascript, */*; q=0.01",
      },
    })
    .then(
      (res) => {
        return res.data;
      },
      (error) => {
        console.log(error);
        return error;
      }
    );

  return response;
}
