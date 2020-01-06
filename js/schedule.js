window.onload = function () {
    /* This small switch looks for a tag embedded in the header title, which tells it which class json to look for.
    Once the switch picks the right json, it dumps it into an intentionally vague variable to be loaded into an xml request.
    I could have just copied the script into a .js file for every page, but this means I have less documents to look after. */

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
        case "pa1":
            file = "/jsons/pa1.json";
            break;
        case "na1":
            file = "/jsons/na1.json";
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

    console.log(document.cookie);
    if (document.cookie == "bingBong") {
        let bing = document.getElementById("konami");
        bing.classList.remove("hide");
        bing.style.opacity = 1;
    }


}

/* Reloads page on regaining focus. 
Literally just so I can leave the page open without having to refresh manually every time I look at it again*/
window.onblur = function () {
    window.onfocus = function () {
        location.reload(true)
    }
};

/* This function builds the schedule grid. First it parses the json it's passed. */
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
        /* This grabs the day of the week, which then lets me cycle through and apply the appropriate colour
        and then dump it into the grid div.*/
        let day = schedule[i];

        for (let j = 0; j < day[dow].length; j++) {

            let checking = day[dow][j];
            let colour;
            let width;
            let fillString;

            switch (checking.year) {
                case "pa2":
                    colour = "pa2";
                    break;
                case "na2":
                    colour = "na2";
                    break;
                case "pa1":
                    colour = "pa1";
                    break;
                case "na1":
                    colour = "na1";
                    break;
            }
            /* This applies a class I have set aside to determine the grid width of the item currently being dropped in. */
            width = 'w' + checking.width;

            let innerString = checking.className + '<br>' + checking.teacherName + checking.roomNumber;
            let innerString2 = checking.className2 + '<br>' + checking.teacherName2 + checking.roomNumber2;

            if (checking.type == undefined) {
                fillString = '<div id="' +
                    checking.classStart + '" class="' + dow + ' ' + colour + ' ' + width + '">' +
                    checking.className + '<br>' + checking.teacherName + checking.roomNumber + '</div>';
            } else if (checking.type == "split") {
                fillString = '<div id="' +
                    checking.classStart + '" class="' + dow + ' ' + colour + ' ' + width + '">' +
                    '<div class="split">' + innerString + '</div>' + '<div class="split">' + innerString2 + '</div>' +
                    '</div>';
            }


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
                if (checkNode.classList.contains("w1")) {
                    nodeTimeE = nodeTimeS + 90;
                }
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
    /* This function is basically the same as the one in buildGrid.
    The only difference is that in buildGrid, Monday is 0 and not 1 because Sunday isn't accounted for in the json.*/
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

    if (fixed >= 2400) {
        fixed = tooLarge(fixed);
    }
    return fixed;
}

function tooLarge(time) {
    let split = time.split("");
    let splice = split.splice(2, 1);
    time = split.join("");
    return time;
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
                        let endTime = grabTime(checkNode);
                        let startTime = formatTimes(checkNode.id);
                        mobileDiv.innerHTML += '<div class="mobileTimes">' + startTime + '<br>' + endTime + '</div>'
                        mobileDiv.innerHTML += checkNode.outerHTML;
                    }
                }
            }

        }
    }

}

function grabTime(checkNode) {
    let nodeTimeS = parseInt(checkNode.id);
    let grabbed;
    if (checkNode.classList.contains("w1")) {
        grabbed = nodeTimeS + 90;
    }
    if (checkNode.classList.contains("w2")) {
        grabbed = nodeTimeS + 190;
    }
    if (checkNode.classList.contains("w3")) {
        grabbed = nodeTimeS + 290;
    }
    if (checkNode.classList.contains("w4")) {
        grabbed = nodeTimeS + 390;
    }
    if (checkNode.classList.contains("w5")) {
        grabbed = nodeTimeS + 490;
    }
    changed = formatTimes(grabbed.toString());
    return changed;
}

function formatTimes(time) {
    let fixed;

    let split = time.split("");
    if (split.length == 3) {
        let splice = split.splice(1, 0, ":");
    } else {
        let splice = split.splice(2, 0, ":");
    }

    fixed = split.join("");

    return fixed;
}
