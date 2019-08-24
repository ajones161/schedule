window.onload = function () {
    let file;
    let getTitle = document.getElementById('headTitle');
    let className = getTitle.className;
    switch (className) {
        case "pa2":
            file = "/jsons/pa2.json";
            break;
        case "na2":
            file = "/jsons/na2.json";
            break;
        case "c1":
            file = "/jsons/c1.json";
            break;
        case "c2":
            file = "/jsons/c2.json";
            break;
        case "c3":
            file = "/jsons/c3.json";
            break;
        default:
            break;
    }
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (xml.readyState === 4 && xml.status === 200) {
            buildGrid(xml.responseText);
        }
    };
    xml.open("GET", file, true);
    xml.send();
}

function buildGrid(text) {
    let data, schedule;
    data = JSON.parse(text);
    schedule = data.classes;
    let grid = document.querySelector("#containBody");

    for (let i = 0; i < schedule.length; i++) {
        let dow;


        switch (i) {
            case 0:
                dow = "monday";
                break;
            case 1:
                dow = "tuesday";
                break;
            case 2:
                dow = "wednesday";
                break;
            case 3:
                dow = "thursday";
                break;
            case 4:
                dow = "friday";
                break;
            default:
                break;
        }

        let day = schedule[i];

        for (let j = 0; j < day[dow].length; j++) {

            let checking = day[dow][j];
            let teacher;
            let width;

            switch (checking.teacherName) {
                case "---":
                    teacher = "unsort";
                    break;
                case "Cathy Burchill":
                    teacher = "cb";
                    break;
                case "Chris London":
                    teacher = "cl";
                    break;
                case "Peter McDevitt":
                    teacher = "pmcd";
                    break;
                case "Fraser Morehouse":
                    teacher = "fm";
                    break;
                case "Stephen Monk":
                    teacher = "sm";
                    break;
                case "Shane Somerville":
                    teacher = "ss";
                    break;
                case "Deborah Irvine Anderson":
                    teacher = "dia";
                    break;
                case "Martine Bernard":
                    teacher = "mb";
                    break;
                case "Jeff Morton":
                    teacher = "jeff";
                    break;
                case "Joe Mariott":
                    teacher = "joe";
                    break;
                case "Martine Bernard":
                    teacher = "mb";
                    break;
                case "George Daniels":
                    teacher = "gd";
                    break;
                default:
                    teacher = "split";
                    break;
            }

            width = 'w' + checking.width;

            let fillString = '<div id="' +
                checking.classStart + '" class="' + dow + ' ' + teacher + ' ' + width + '">' +
                checking.className + '<br>' + checking.teacherName + checking.roomNumber + '</div>';


            grid.innerHTML += fillString;
        }
    }

    checkSchedule();
} //end buildGrid

function checkSchedule() {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();



    let checkDay = grabDay(d);



    let nodeList = document.querySelector('#containBody').childNodes;
    let fullTime = h.toString() + m.toString();

    let checkTime = checkShort(fullTime);

    for (let i = 0; i < nodeList.length; i++) {
        let checkNode = nodeList[i];
        if (checkNode.id != undefined) { //for some reason my or wasn't working ¯\_(ツ)_/¯ NESTED IFS IT IS, BOYS
            if (checkNode.id != "") {
                let check = parseInt(checkTime);
                let nodeTimeS = parseInt(checkNode.id);
                let nodeTimeE;
                if (checkNode.classList.contains("w2")) {
                    nodeTimeE = nodeTimeS + 190;
                }
                if (checkNode.classList.contains("w3")) {
                    nodeTimeE = nodeTimeS + 290;
                }
                if (checkNode.classList.contains("w4")) {
                    nodeTimeE = nodeTimeS + 390;
                }
                if (checkNode.classList.contains("w5")) {
                    nodeTimeE = nodeTimeS + 490;
                }

                if (check >= nodeTimeS && check <= nodeTimeE) {
                    if (checkNode.classList.contains(checkDay)) {
                        checkNode.classList.add('highlight');
                        break;
                    }
                }
            }
        }
    }

    fillMobile(checkDay, nodeList);
}

function grabDay(d) {
    let w = d.getDay();
    let checkDay;
    switch (w) {
        case 1:
            checkDay = "monday"
            break;
        case 2:
            checkDay = "tuesday"
            break;
        case 3:
            checkDay = "wednesday"
            break;
        case 4:
            checkDay = "thursday"
            break;
        case 5:
            checkDay = "friday"
            break;
        default:
            break;
    }

    return checkDay;
}

function checkShort(time) {
    let hopefullyFour = time.length;
    let fixed;
    if (hopefullyFour == 3) {
        let split = time.split("");
        let splice = split.splice(2, 0, "0");

        fixed = split.join("");
    } else {
        fixed = time;
    }
    return fixed;
}

function fillMobile(day, nodes) {
    let mobileDiv = document.querySelector('#mobileDiv');
    if (day == undefined) {
        mobileDiv.innerHTML = '<div class="dayTitle"> Weekend! </div>';
    } else {
        mobileDiv.innerHTML = '<div class="dayTitle">' + day + '</div>';
        for (let i = 0; i < nodes.length; i++) {
            let checkNode = nodes[i];
            if (checkNode.id != undefined) {
                if (checkNode.id != "") {
                    if (checkNode.classList.contains(day)) {
                        mobileDiv.innerHTML += checkNode.outerHTML;
                    }
                }
            }

        }
    }

}