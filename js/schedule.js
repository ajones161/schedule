
window.onload=function() {
    let file = "schedule.json";
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (xml.readyState === 4 && xml.status === 200) {
            build(xml.responseText);
        }
    };
    xml.open("GET", file, true);
    xml.send();

    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let w = d.getDay();
console.log(h,m,w);
    //checkSchedule(h, m, w);
}

//function checkSchedule(hour, minute, day) {
    
//};

//function buildSchedule() {
//    JSON.parse
//}