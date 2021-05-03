function validate(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
console.log(today)
document.getElementById("txtDate").setAttribute("min", today);


function vaccineFind() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("main").setAttribute("style","display:none;")
      var obj = this.responseText;
      var json = JSON.parse(obj);
      // console.log(json)
      if(json.centers.length == 0){
      document.getElementById("vf").innerHTML =
      "No Vaccine Available"
    }
    
      else{
        document.getElementById("vf").innerHTML =
      "Vaccine Available"
    var empTable = document.createElement('table');
        empTable.setAttribute('id', 'empTable');
        empTable.setAttribute('class','table table-sm table-bordered table-dark');  // table id.

        var tr = empTable.insertRow(0);
        console.log(Object.keys(json.centers[0]));

        for (var h = 0; h < Object.keys(json.centers[0]).length; h++) {
          
            var th = document.createElement('th'); // the header object.
            th.innerHTML = Object.keys(json.centers[0])[h];
            
            tr.appendChild(th);
        }

        var div = document.getElementById('table');
        div.appendChild(empTable);
        
        var i
        var x
        var table = document.getElementById("empTable");
        console.log("---------")
        console.log(json)
        for (i = 1;i<json.centers.length;i++){
       var row = table.insertRow(i);
        for(var h = 0; h < Object.keys(json.centers[0]).length; h++){
          if(Object.keys(json.centers[0])[h] != "sessions"){
          row.insertCell(h).innerHTML = json.centers[i][Object.keys(json.centers[0])[h]];
        }
          else{
            var sessions = json.centers[i][Object.keys(json.centers[0])[h]];
            console.log(sessions)
            
             row.insertCell(h).innerHTML +=  "date: " +sessions[0].date;
             row.insertCell(h).innerHTML +=  "available_capacity: "+sessions[0].available_capacity;
             row.insertCell(h).innerHTML +=  "slots: " + sessions[0].slots;
           



          }
        }

        }

      }
       document.getElementById("container").setAttribute("style","display:;")
    }
  };

  var pin = document.getElementById("pincode").value;
  var date = document.getElementById("txtDate").value;
var yyyy = date.slice(0,4)
var mm = date.slice(5,7)
var dd = date.slice(8,10)

console.log(dd,mm,yyyy)
  xhttp.open("GET", "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+ pin + "&date=" +dd + "-" + mm + "-" + yyyy, true);
  xhttp.send();
}