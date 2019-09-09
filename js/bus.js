window.onload = function () {
    document.querySelector("#sched").addEventListener("click", showSched);
 }

 function showSched() {
     let schedule = document.querySelector("#getRoute").value;
     let heights = document.querySelector("#r30");
     let express = document.querySelector("#r33");
        heights.style.display = "block";
        express.style.display = "block";
     if(schedule == "rt33") {
        heights.style.display = "none";
        express.style.display = "block";
     } else if (schedule == "rt30") {
        heights.style.display = "block";
        express.style.display = "none";
     }
 }