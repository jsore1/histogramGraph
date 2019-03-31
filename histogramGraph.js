// var dataString = JSON.parse('{"data":[{"time":"2019-01-05 18:00","value":0.3},{"time":"2019-01-05 18:05","value":0.2},{"time":"2019-01-05 18:10","value":0.6},{"time":"2019-01-05 18:15","value":0.5},{"time":"2019-01-05 18:20","value":0.2},{"time":"2019-01-05 18:25","value":0.9},{"time":"2019-01-05 18:30","value":0.2},{"time":"2019-01-05 18:35","value":0.3},{"time":"2019-01-05 18:40","value":0.5},{"time":"2019-01-05 18:45","value":0.6},{"time":"2019-01-05 18:50","value":0.4},{"time":"2019-01-05 18:55","value":0.3},{"time":"2019-01-05 19:00","value":0.6}]}');
//
// var time = [];
// var value = [];
// for (var i = 0; i < dataString.data.length; i++) {
//   time.push(dataString.data[i].time);
//   value.push(dataString.data[i].value);
// }

function formatDate(date) {
  var monthNames = [
    "01", "02", "03",
    "04", "05", "06", "07",
    "08", "09", "10",
    "11", "12"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hours = date.getHours();
  var minute = date.getMinutes();

  return year + '-' + monthNames[monthIndex] + '-' + day + ' ' + hours + ':' + minute;
}

var timeAll = [];
var valueAll = [];
for (var i = 0; i < 2899; i++) {
  timeAll[i] = formatDate(new Date(1546700400000 + (i * 300000)));
  valueAll[i] = Math.random();
}

$.datetimepicker.setLocale('ru');
var date;
var timeChange = [];
var valueChange = [];
var idx;
jQuery('#datetimepicker').datetimepicker({
  timepicker:false,
  format:'D M d Y',
  onChangeDateTime:function(dp,$input){
    date = $input.val();
    idx = timeAll.indexOf(date);
    console.log(idx);
    for (var i = 0; i < timeAll.length; i++){
      while (idx != -1) {
        timeChange.push(timeAll[idx]);
        valueChange.push(valueAll[idx]);
        idx = timeAll.indexOf(date, idx + 1);
      }
    }
  }
});

var data = [
  {
    x: timeAll,
    y: valueAll,
    type: 'bar',
  }
];

Plotly.newPlot('myDiv', data);
