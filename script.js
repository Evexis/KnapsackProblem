incrementationButtons = [];

window.addEventListener("load", (event) => {

    // console.log(result.length)

    //loop for all deliveries

    for (let incrementation = 0; incrementation < result.length; incrementation++) {
        //incrementation node
        createNode("div", "container", `incrementation-wrapper${incrementation}`, "incrementation-wrapper" , null);

        createNode("div", `incrementation-wrapper${incrementation}`, `incrementation-container${incrementation}`, "incrementation-container", null)
        createNode("div", `incrementation-container${incrementation}`, null, `incrementation`, `${incrementation+1} delivery`);
        createNode("button", `incrementation-container${incrementation}`, `incrementation-button${incrementation}`, null, null);
        createNode("div", `incrementation-wrapper${incrementation}`, `ship-label${incrementation}`, "ship-label", null);
        createNode("div", `incrementation-wrapper${incrementation}`, `container-column-wrapper${incrementation}`, 'container-column-wrapper' , null);


        const incrementationButton = document.getElementById(`incrementation-button${incrementation}`);
        incrementationButtons.push({button: incrementationButton, show: true});

        incrementationButton.addEventListener("click", (event) => {
            const container = document.getElementById(`container-column-wrapper${incrementation}`);
            const button = document.getElementById(`incrementation-button${incrementation}`);

            incrementationButtons[incrementation].show = !incrementationButtons[incrementation].show;
            if(incrementationButtons[incrementation].show == true) container.classList.remove("hide-container");
            else container.classList.add("hide-container");
            button.classList.toggle("arrow-toggle");

        })


        //firstly create sectins for floors - max(floor of all ships)
        const largestFloorNumber = Math.max(...result[incrementation].map(el => el = el.containers.length));

        for (let floor = 0; floor < largestFloorNumber; floor++) {
            //container columns node
            createNode("div", `container-column-wrapper${incrementation}`, `container-columns${incrementation}-${floor}`, "container-columns", null);
            //floor-text-container node
            createNode("div", `container-columns${incrementation}-${floor}`, `floor-text-container${incrementation}-${floor}`, "floor-text-container", null);
            //floor-text node
            createNode("div", `floor-text-container${incrementation}-${floor}`, null, "floor-text", `floor${floor}`);

            for (let i = 0; i < 3; i++) createNode("div", `container-columns${incrementation}-${floor}`, `ship${incrementation}-${i + 1}-${floor}`, null, null);

        }
        //ships with canvases 
        for (let ship = 0; ship < 3; ship++) {
            createNode("div", `ship-label${incrementation}`, `ship-label-container${incrementation}-${ship}`, "ship-label-container", null);
            createNode("div", `ship-label-container${incrementation}-${ship}`, null, "ship-name", `${result[incrementation][ship].id} - free space ${(result[incrementation][ship].freeSpace * 100).toFixed(2)}%`, result[incrementation][ship].send);

            for (let floor = 0; floor < result[incrementation][ship].containers.length; floor++) {
                //prepare canvas
                const floorOfShip = (p) => {
                    p.setup = () => setCanvas(p, result[incrementation][ship]);
                    p.draw = () => drawCanvas(p, result[incrementation][ship], floor);
                };
                const shipObj = new p5(floorOfShip, window.document.getElementById(`ship${incrementation}-${ship + 1}-${floor}`));
            }
        }

    }

});

// listening on onclick event when changing radio button
const radioButtons = document.menuForm.algorithm;
let previous = null;

radioButtons.forEach((el) => el.addEventListener("click", (event) => {
    if (el !== previous) previous = el;
    console.log(el.value)
}))


//general method to create node and append it in intended place
function createNode(tag, parent, id, className, text, send = null) {
    const node = document.createElement(tag);
    if (id) node.id = id;
    if (className) node.className = className;
    if (text) {
        const textNode = document.createTextNode(text);
        node.appendChild(textNode);
    }
    if (send) node.classList.add("ship-send");
    document.getElementById(parent).appendChild(node);
}

//how much canvas should be scaled
const scale = 5;

//set canvas
function setCanvas(p, ship) {
    p.createCanvas(ship.length * scale + 1, ship.width * scale + 1);
    p.textAlign(p.CENTER, p.CENTER);
}

//draw canvas - fill with containers
function drawCanvas(p, ship, floor) {
    p.fill(180);
    p.noStroke();
    p.rect(0, 0, ship.length * scale + 1, ship.width * scale + 1);
    const containers = ship.containers[floor];
    for (var i = 0; i < containers.length; i++) {
        p.stroke(0, 0, 0);
        p.fill(124, 245, 35);
        p.rect(containers[i].pivot.x * scale, containers[i].pivot.y * scale, containers[i].element.length * scale, containers[i].element.width * scale)
        p.textSize(containers[i].element.length > containers[i].element.width ? containers[i].element.width * scale / 2 : containers[i].element.length * scale / 2);
        p.fill(0);
        p.noStroke();
        p.text(containers[i].element.id, (containers[i].pivot.x + containers[i].element.length / 2) * scale, (containers[i].pivot.y + containers[i].element.width / 2) * scale);
    }
}

const result =[
    [
     {
      "id": "s1",
      "width": 70,
      "length": 50,
      "height": 60,
      "containers": [
       [
        {
         "element": {
          "id": "c7",
          "width": 40,
          "height": 18,
          "length": 38,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c2",
          "width": 29,
          "height": 18,
          "length": 25,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 40
         }
        },
        {
         "element": {
          "id": "c3",
          "width": 28,
          "height": 18,
          "length": 17,
          "timestamp": 0
         },
         "pivot": {
          "x": 25,
          "y": 40
         }
        },
        {
         "element": {
          "id": "c6",
          "width": 36,
          "height": 18,
          "length": 11,
          "timestamp": 0
         },
         "pivot": {
          "x": 38,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c8",
          "width": 22,
          "height": 18,
          "length": 3,
          "timestamp": 0
         },
         "pivot": {
          "x": 42,
          "y": 40
         }
        },
        {
         "element": {
          "id": "c15",
          "width": 10,
          "height": 18,
          "length": 5,
          "timestamp": 0
         },
         "pivot": {
          "x": 45,
          "y": 40
         }
        },
        {
         "element": {
          "id": "c17",
          "width": 4,
          "height": 18,
          "length": 6,
          "timestamp": 0
         },
         "pivot": {
          "x": 38,
          "y": 36
         }
        },
        {
         "element": {
          "id": "c10",
          "width": 11,
          "height": 18,
          "length": 2,
          "timestamp": 0
         },
         "pivot": {
          "x": 45,
          "y": 50
         }
        },
        {
         "element": {
          "id": "c26",
          "width": 28,
          "height": 18,
          "length": 1,
          "timestamp": 1
         },
         "pivot": {
          "x": 49,
          "y": 0
         }
        }
       ],
       [
        {
         "element": {
          "id": "c14",
          "width": 34,
          "height": 18,
          "length": 33,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c18",
          "width": 19,
          "height": 18,
          "length": 25,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 34
         }
        },
        {
         "element": {
          "id": "c19",
          "width": 29,
          "height": 18,
          "length": 14,
          "timestamp": 0
         },
         "pivot": {
          "x": 33,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c4",
          "width": 16,
          "height": 18,
          "length": 25,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 53
         }
        },
        {
         "element": {
          "id": "c12",
          "width": 15,
          "height": 18,
          "length": 25,
          "timestamp": 0
         },
         "pivot": {
          "x": 25,
          "y": 34
         }
        },
        {
         "element": {
          "id": "c11",
          "width": 16,
          "height": 18,
          "length": 20,
          "timestamp": 0
         },
         "pivot": {
          "x": 25,
          "y": 53
         }
        }
       ],
       [
        {
         "element": {
          "id": "c16",
          "width": 36,
          "height": 18,
          "length": 7,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c0",
          "width": 11,
          "height": 18,
          "length": 13,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 36
         }
        },
        {
         "element": {
          "id": "c1",
          "width": 3,
          "height": 18,
          "length": 36,
          "timestamp": 0
         },
         "pivot": {
          "x": 7,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c9",
          "width": 2,
          "height": 18,
          "length": 38,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 47
         }
        },
        {
         "element": {
          "id": "c22",
          "width": 32,
          "height": 18,
          "length": 29,
          "timestamp": 1
         },
         "pivot": {
          "x": 7,
          "y": 3
         }
        },
        {
         "element": {
          "id": "c20",
          "width": 17,
          "height": 18,
          "length": 36,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 49
         }
        },
        {
         "element": {
          "id": "c32",
          "width": 31,
          "height": 18,
          "length": 12,
          "timestamp": 1
         },
         "pivot": {
          "x": 36,
          "y": 3
         }
        },
        {
         "element": {
          "id": "c23",
          "width": 16,
          "height": 18,
          "length": 9,
          "timestamp": 1
         },
         "pivot": {
          "x": 36,
          "y": 49
         }
        },
        {
         "element": {
          "id": "c28",
          "width": 4,
          "height": 18,
          "length": 34,
          "timestamp": 1
         },
         "pivot": {
          "x": 13,
          "y": 36
         }
        },
        {
         "element": {
          "id": "c38",
          "width": 3,
          "height": 18,
          "length": 40,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 66
         }
        },
        {
         "element": {
          "id": "c39",
          "width": 3,
          "height": 18,
          "length": 34,
          "timestamp": 1
         },
         "pivot": {
          "x": 13,
          "y": 40
         }
        },
        {
         "element": {
          "id": "c36",
          "width": 3,
          "height": 18,
          "length": 32,
          "timestamp": 1
         },
         "pivot": {
          "x": 13,
          "y": 43
         }
        }
       ]
      ],
      "freeSpace": 0.0958095238095238,
      "send": true
     },
     {
      "id": "s2",
      "width": 60,
      "length": 70,
      "height": 60,
      "containers": [
       [
        {
         "element": {
          "id": "c7",
          "width": 40,
          "height": 18,
          "length": 38,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c2",
          "width": 29,
          "height": 18,
          "length": 25,
          "timestamp": 0
         },
         "pivot": {
          "x": 38,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c3",
          "width": 17,
          "height": 18,
          "length": 28,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 40
         }
        },
        {
         "element": {
          "id": "c19",
          "width": 14,
          "height": 18,
          "length": 29,
          "timestamp": 0
         },
         "pivot": {
          "x": 28,
          "y": 40
         }
        },
        {
         "element": {
          "id": "c0",
          "width": 11,
          "height": 18,
          "length": 13,
          "timestamp": 0
         },
         "pivot": {
          "x": 38,
          "y": 29
         }
        },
        {
         "element": {
          "id": "c1",
          "width": 3,
          "height": 18,
          "length": 36,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 57
         }
        },
        {
         "element": {
          "id": "c9",
          "width": 2,
          "height": 18,
          "length": 38,
          "timestamp": 0
         },
         "pivot": {
          "x": 28,
          "y": 54
         }
        },
        {
         "element": {
          "id": "c8",
          "width": 22,
          "height": 18,
          "length": 3,
          "timestamp": 0
         },
         "pivot": {
          "x": 63,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c15",
          "width": 10,
          "height": 18,
          "length": 5,
          "timestamp": 0
         },
         "pivot": {
          "x": 57,
          "y": 40
         }
        },
        {
         "element": {
          "id": "c17",
          "width": 4,
          "height": 18,
          "length": 6,
          "timestamp": 0
         },
         "pivot": {
          "x": 51,
          "y": 29
         }
        },
        {
         "element": {
          "id": "c10",
          "width": 2,
          "height": 18,
          "length": 11,
          "timestamp": 0
         },
         "pivot": {
          "x": 36,
          "y": 57
         }
        },
        {
         "element": {
          "id": "c26",
          "width": 1,
          "height": 18,
          "length": 28,
          "timestamp": 1
         },
         "pivot": {
          "x": 28,
          "y": 56
         }
        }
       ],
       [
        {
         "element": {
          "id": "c14",
          "width": 34,
          "height": 18,
          "length": 33,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c18",
          "width": 19,
          "height": 18,
          "length": 25,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 34
         }
        },
        {
         "element": {
          "id": "c4",
          "width": 25,
          "height": 18,
          "length": 16,
          "timestamp": 0
         },
         "pivot": {
          "x": 33,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c6",
          "width": 11,
          "height": 18,
          "length": 36,
          "timestamp": 0
         },
         "pivot": {
          "x": 25,
          "y": 34
         }
        },
        {
         "element": {
          "id": "c12",
          "width": 25,
          "height": 18,
          "length": 15,
          "timestamp": 0
         },
         "pivot": {
          "x": 49,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c16",
          "width": 7,
          "height": 18,
          "length": 36,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 53
         }
        },
        {
         "element": {
          "id": "c24",
          "width": 6,
          "height": 18,
          "length": 38,
          "timestamp": 1
         },
         "pivot": {
          "x": 25,
          "y": 45
         }
        },
        {
         "element": {
          "id": "c23",
          "width": 9,
          "height": 18,
          "length": 16,
          "timestamp": 1
         },
         "pivot": {
          "x": 33,
          "y": 25
         }
        },
        {
         "element": {
          "id": "c28",
          "width": 4,
          "height": 18,
          "length": 34,
          "timestamp": 1
         },
         "pivot": {
          "x": 36,
          "y": 53
         }
        },
        {
         "element": {
          "id": "c39",
          "width": 3,
          "height": 18,
          "length": 34,
          "timestamp": 1
         },
         "pivot": {
          "x": 36,
          "y": 57
         }
        }
       ],
       [
        {
         "element": {
          "id": "c11",
          "width": 20,
          "height": 18,
          "length": 16,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c22",
          "width": 32,
          "height": 18,
          "length": 29,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 20
         }
        },
        {
         "element": {
          "id": "c21",
          "width": 24,
          "height": 18,
          "length": 37,
          "timestamp": 1
         },
         "pivot": {
          "x": 29,
          "y": 20
         }
        },
        {
         "element": {
          "id": "c20",
          "width": 17,
          "height": 18,
          "length": 36,
          "timestamp": 1
         },
         "pivot": {
          "x": 16,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c38",
          "width": 3,
          "height": 18,
          "length": 40,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 52
         }
        },
        {
         "element": {
          "id": "c36",
          "width": 3,
          "height": 18,
          "length": 32,
          "timestamp": 1
         },
         "pivot": {
          "x": 29,
          "y": 44
         }
        }
       ]
      ],
      "freeSpace": 0.18746031746031744,
      "send": false
     },
     {
      "id": "s3",
      "width": 90,
      "length": 50,
      "height": 60,
      "containers": [
       [
        {
         "element": {
          "id": "c7",
          "width": 40,
          "height": 18,
          "length": 38,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c14",
          "width": 33,
          "height": 18,
          "length": 34,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 40
         }
        },
        {
         "element": {
          "id": "c3",
          "width": 17,
          "height": 18,
          "length": 28,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 73
         }
        },
        {
         "element": {
          "id": "c19",
          "width": 29,
          "height": 18,
          "length": 14,
          "timestamp": 0
         },
         "pivot": {
          "x": 34,
          "y": 40
         }
        },
        {
         "element": {
          "id": "c6",
          "width": 36,
          "height": 18,
          "length": 11,
          "timestamp": 0
         },
         "pivot": {
          "x": 38,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c11",
          "width": 16,
          "height": 18,
          "length": 20,
          "timestamp": 0
         },
         "pivot": {
          "x": 28,
          "y": 73
         }
        },
        {
         "element": {
          "id": "c17",
          "width": 4,
          "height": 18,
          "length": 6,
          "timestamp": 0
         },
         "pivot": {
          "x": 34,
          "y": 69
         }
        },
        {
         "element": {
          "id": "c10",
          "width": 2,
          "height": 18,
          "length": 11,
          "timestamp": 0
         },
         "pivot": {
          "x": 38,
          "y": 36
         }
        },
        {
         "element": {
          "id": "c26",
          "width": 28,
          "height": 18,
          "length": 1,
          "timestamp": 1
         },
         "pivot": {
          "x": 48,
          "y": 40
         }
        }
       ],
       [
        {
         "element": {
          "id": "c2",
          "width": 25,
          "height": 18,
          "length": 29,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c18",
          "width": 19,
          "height": 18,
          "length": 25,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 25
         }
        },
        {
         "element": {
          "id": "c4",
          "width": 25,
          "height": 18,
          "length": 16,
          "timestamp": 0
         },
         "pivot": {
          "x": 29,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c12",
          "width": 25,
          "height": 18,
          "length": 15,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 44
         }
        },
        {
         "element": {
          "id": "c16",
          "width": 7,
          "height": 18,
          "length": 36,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 69
         }
        },
        {
         "element": {
          "id": "c0",
          "width": 13,
          "height": 18,
          "length": 11,
          "timestamp": 0
         },
         "pivot": {
          "x": 25,
          "y": 25
         }
        },
        {
         "element": {
          "id": "c1",
          "width": 3,
          "height": 18,
          "length": 36,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 76
         }
        },
        {
         "element": {
          "id": "c9",
          "width": 2,
          "height": 18,
          "length": 38,
          "timestamp": 0
         },
         "pivot": {
          "x": 0,
          "y": 79
         }
        },
        {
         "element": {
          "id": "c8",
          "width": 3,
          "height": 18,
          "length": 22,
          "timestamp": 0
         },
         "pivot": {
          "x": 15,
          "y": 44
         }
        },
        {
         "element": {
          "id": "c15",
          "width": 5,
          "height": 18,
          "length": 10,
          "timestamp": 0
         },
         "pivot": {
          "x": 36,
          "y": 69
         }
        },
        {
         "element": {
          "id": "c27",
          "width": 21,
          "height": 18,
          "length": 24,
          "timestamp": 1
         },
         "pivot": {
          "x": 15,
          "y": 47
         }
        },
        {
         "element": {
          "id": "c24",
          "width": 6,
          "height": 18,
          "length": 38,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 81
         }
        },
        {
         "element": {
          "id": "c23",
          "width": 16,
          "height": 18,
          "length": 9,
          "timestamp": 1
         },
         "pivot": {
          "x": 39,
          "y": 47
         }
        },
        {
         "element": {
          "id": "c38",
          "width": 3,
          "height": 18,
          "length": 40,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 87
         }
        }
       ],
       [
        {
         "element": {
          "id": "c22",
          "width": 32,
          "height": 18,
          "length": 29,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c21",
          "width": 37,
          "height": 18,
          "length": 24,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 32
         }
        },
        {
         "element": {
          "id": "c25",
          "width": 29,
          "height": 18,
          "length": 26,
          "timestamp": 1
         },
         "pivot": {
          "x": 24,
          "y": 32
         }
        },
        {
         "element": {
          "id": "c20",
          "width": 17,
          "height": 18,
          "length": 36,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 69
         }
        },
        {
         "element": {
          "id": "c35",
          "width": 30,
          "height": 18,
          "length": 15,
          "timestamp": 1
         },
         "pivot": {
          "x": 29,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c28",
          "width": 4,
          "height": 18,
          "length": 34,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 86
         }
        }
       ]
      ],
      "freeSpace": 0.12977777777777777,
      "send": false
     }
    ],
    [
     {
      "id": "s1",
      "width": 70,
      "length": 50,
      "height": 60,
      "containers": [
       [
        {
         "element": {
          "id": "c21",
          "width": 37,
          "height": 18,
          "length": 24,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c25",
          "width": 26,
          "height": 18,
          "length": 29,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 37
         }
        },
        {
         "element": {
          "id": "c34",
          "width": 29,
          "height": 18,
          "length": 24,
          "timestamp": 1
         },
         "pivot": {
          "x": 24,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c27",
          "width": 24,
          "height": 18,
          "length": 21,
          "timestamp": 1
         },
         "pivot": {
          "x": 29,
          "y": 37
         }
        },
        {
         "element": {
          "id": "c24",
          "width": 6,
          "height": 18,
          "length": 38,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 63
         }
        },
        {
         "element": {
          "id": "c40",
          "width": 7,
          "height": 18,
          "length": 12,
          "timestamp": 2
         },
         "pivot": {
          "x": 24,
          "y": 29
         }
        },
        {
         "element": {
          "id": "c55",
          "width": 5,
          "height": 18,
          "length": 11,
          "timestamp": 2
         },
         "pivot": {
          "x": 38,
          "y": 63
         }
        }
       ],
       [
        {
         "element": {
          "id": "c35",
          "width": 15,
          "height": 18,
          "length": 30,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c29",
          "width": 21,
          "height": 18,
          "length": 20,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 15
         }
        },
        {
         "element": {
          "id": "c33",
          "width": 23,
          "height": 18,
          "length": 18,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 36
         }
        },
        {
         "element": {
          "id": "c46",
          "width": 11,
          "height": 18,
          "length": 31,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 59
         }
        },
        {
         "element": {
          "id": "c52",
          "width": 9,
          "height": 18,
          "length": 32,
          "timestamp": 2
         },
         "pivot": {
          "x": 18,
          "y": 36
         }
        },
        {
         "element": {
          "id": "c47",
          "width": 10,
          "height": 18,
          "length": 24,
          "timestamp": 2
         },
         "pivot": {
          "x": 20,
          "y": 15
         }
        },
        {
         "element": {
          "id": "c49",
          "width": 10,
          "height": 18,
          "length": 16,
          "timestamp": 2
         },
         "pivot": {
          "x": 30,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c57",
          "width": 5,
          "height": 18,
          "length": 31,
          "timestamp": 2
         },
         "pivot": {
          "x": 18,
          "y": 45
         }
        },
        {
         "element": {
          "id": "c51",
          "width": 4,
          "height": 18,
          "length": 15,
          "timestamp": 2
         },
         "pivot": {
          "x": 31,
          "y": 59
         }
        },
        {
         "element": {
          "id": "c45",
          "width": 3,
          "height": 18,
          "length": 17,
          "timestamp": 2
         },
         "pivot": {
          "x": 20,
          "y": 25
         }
        }
       ],
       [
        {
         "element": {
          "id": "c56",
          "width": 32,
          "height": 18,
          "length": 36,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c42",
          "width": 29,
          "height": 18,
          "length": 37,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 32
         }
        },
        {
         "element": {
          "id": "c50",
          "width": 5,
          "height": 18,
          "length": 33,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 61
         }
        }
       ]
      ],
      "freeSpace": 0.2211428571428571,
      "send": false
     },
     {
      "id": "s2",
      "width": 60,
      "length": 70,
      "height": 60,
      "containers": [
       [
        {
         "element": {
          "id": "c21",
          "width": 37,
          "height": 18,
          "length": 24,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c25",
          "width": 26,
          "height": 18,
          "length": 29,
          "timestamp": 1
         },
         "pivot": {
          "x": 24,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c27",
          "width": 21,
          "height": 18,
          "length": 24,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 37
         }
        },
        {
         "element": {
          "id": "c35",
          "width": 15,
          "height": 18,
          "length": 30,
          "timestamp": 1
         },
         "pivot": {
          "x": 24,
          "y": 37
         }
        },
        {
         "element": {
          "id": "c24",
          "width": 6,
          "height": 18,
          "length": 38,
          "timestamp": 1
         },
         "pivot": {
          "x": 24,
          "y": 26
         }
        },
        {
         "element": {
          "id": "c47",
          "width": 24,
          "height": 18,
          "length": 10,
          "timestamp": 2
         },
         "pivot": {
          "x": 53,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c50",
          "width": 5,
          "height": 18,
          "length": 33,
          "timestamp": 2
         },
         "pivot": {
          "x": 24,
          "y": 52
         }
        },
        {
         "element": {
          "id": "c49",
          "width": 10,
          "height": 18,
          "length": 16,
          "timestamp": 2
         },
         "pivot": {
          "x": 54,
          "y": 37
         }
        },
        {
         "element": {
          "id": "c57",
          "width": 5,
          "height": 18,
          "length": 31,
          "timestamp": 2
         },
         "pivot": {
          "x": 24,
          "y": 32
         }
        },
        {
         "element": {
          "id": "c40",
          "width": 12,
          "height": 18,
          "length": 7,
          "timestamp": 2
         },
         "pivot": {
          "x": 63,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c51",
          "width": 4,
          "height": 18,
          "length": 15,
          "timestamp": 2
         },
         "pivot": {
          "x": 54,
          "y": 47
         }
        },
        {
         "element": {
          "id": "c55",
          "width": 5,
          "height": 18,
          "length": 11,
          "timestamp": 2
         },
         "pivot": {
          "x": 57,
          "y": 52
         }
        }
       ],
       [
        {
         "element": {
          "id": "c34",
          "width": 24,
          "height": 18,
          "length": 29,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c29",
          "width": 21,
          "height": 18,
          "length": 20,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 24
         }
        },
        {
         "element": {
          "id": "c33",
          "width": 23,
          "height": 18,
          "length": 18,
          "timestamp": 1
         },
         "pivot": {
          "x": 29,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c46",
          "width": 11,
          "height": 18,
          "length": 31,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 45
         }
        },
        {
         "element": {
          "id": "c52",
          "width": 9,
          "height": 18,
          "length": 32,
          "timestamp": 2
         },
         "pivot": {
          "x": 20,
          "y": 24
         }
        },
        {
         "element": {
          "id": "c45",
          "width": 17,
          "height": 18,
          "length": 3,
          "timestamp": 2
         },
         "pivot": {
          "x": 47,
          "y": 0
         }
        }
       ],
       [
        {
         "element": {
          "id": "c56",
          "width": 32,
          "height": 18,
          "length": 36,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c48",
          "width": 27,
          "height": 18,
          "length": 39,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 32
         }
        },
        {
         "element": {
          "id": "c54",
          "width": 31,
          "height": 18,
          "length": 31,
          "timestamp": 2
         },
         "pivot": {
          "x": 36,
          "y": 0
         }
        }
       ]
      ],
      "freeSpace": 0.2762698412698413,
      "send": false
     },
     {
      "id": "s3",
      "width": 90,
      "length": 50,
      "height": 60,
      "containers": [
       [
        {
         "element": {
          "id": "c21",
          "width": 37,
          "height": 18,
          "length": 24,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c25",
          "width": 26,
          "height": 18,
          "length": 29,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 37
         }
        },
        {
         "element": {
          "id": "c34",
          "width": 29,
          "height": 18,
          "length": 24,
          "timestamp": 1
         },
         "pivot": {
          "x": 24,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c27",
          "width": 24,
          "height": 18,
          "length": 21,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 63
         }
        },
        {
         "element": {
          "id": "c29",
          "width": 20,
          "height": 18,
          "length": 21,
          "timestamp": 1
         },
         "pivot": {
          "x": 29,
          "y": 37
         }
        },
        {
         "element": {
          "id": "c33",
          "width": 18,
          "height": 18,
          "length": 23,
          "timestamp": 1
         },
         "pivot": {
          "x": 21,
          "y": 63
         }
        },
        {
         "element": {
          "id": "c40",
          "width": 7,
          "height": 18,
          "length": 12,
          "timestamp": 2
         },
         "pivot": {
          "x": 24,
          "y": 29
         }
        },
        {
         "element": {
          "id": "c51",
          "width": 4,
          "height": 18,
          "length": 15,
          "timestamp": 2
         },
         "pivot": {
          "x": 29,
          "y": 57
         }
        },
        {
         "element": {
          "id": "c55",
          "width": 5,
          "height": 18,
          "length": 11,
          "timestamp": 2
         },
         "pivot": {
          "x": 21,
          "y": 81
         }
        },
        {
         "element": {
          "id": "c45",
          "width": 3,
          "height": 18,
          "length": 17,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 87
         }
        }
       ],
       [
        {
         "element": {
          "id": "c35",
          "width": 15,
          "height": 18,
          "length": 30,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c24",
          "width": 6,
          "height": 18,
          "length": 38,
          "timestamp": 1
         },
         "pivot": {
          "x": 0,
          "y": 15
         }
        },
        {
         "element": {
          "id": "c56",
          "width": 36,
          "height": 18,
          "length": 32,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 21
         }
        },
        {
         "element": {
          "id": "c42",
          "width": 29,
          "height": 18,
          "length": 37,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 57
         }
        },
        {
         "element": {
          "id": "c46",
          "width": 31,
          "height": 18,
          "length": 11,
          "timestamp": 2
         },
         "pivot": {
          "x": 32,
          "y": 21
         }
        },
        {
         "element": {
          "id": "c47",
          "width": 24,
          "height": 18,
          "length": 10,
          "timestamp": 2
         },
         "pivot": {
          "x": 37,
          "y": 57
         }
        },
        {
         "element": {
          "id": "c49",
          "width": 10,
          "height": 18,
          "length": 16,
          "timestamp": 2
         },
         "pivot": {
          "x": 30,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c57",
          "width": 31,
          "height": 18,
          "length": 5,
          "timestamp": 2
         },
         "pivot": {
          "x": 43,
          "y": 21
         }
        }
       ],
       [
        {
         "element": {
          "id": "c48",
          "width": 39,
          "height": 18,
          "length": 27,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c59",
          "width": 40,
          "height": 18,
          "length": 25,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 39
         }
        },
        {
         "element": {
          "id": "c44",
          "width": 40,
          "height": 18,
          "length": 22,
          "timestamp": 2
         },
         "pivot": {
          "x": 25,
          "y": 39
         }
        },
        {
         "element": {
          "id": "c41",
          "width": 33,
          "height": 18,
          "length": 23,
          "timestamp": 2
         },
         "pivot": {
          "x": 27,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c52",
          "width": 9,
          "height": 18,
          "length": 32,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 79
         }
        }
       ]
      ],
      "freeSpace": 0.13296296296296295,
      "send": true
     }
    ],
    [
     {
      "id": "s1",
      "width": 70,
      "length": 50,
      "height": 60,
      "containers": [
       [
        {
         "element": {
          "id": "c54",
          "width": 31,
          "height": 18,
          "length": 31,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c43",
          "width": 32,
          "height": 18,
          "length": 29,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 31
         }
        },
        {
         "element": {
          "id": "c50",
          "width": 5,
          "height": 18,
          "length": 33,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 63
         }
        },
        {
         "element": {
          "id": "c78",
          "width": 27,
          "height": 18,
          "length": 17,
          "timestamp": 3
         },
         "pivot": {
          "x": 31,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c74",
          "width": 31,
          "height": 18,
          "length": 14,
          "timestamp": 3
         },
         "pivot": {
          "x": 29,
          "y": 31
         }
        },
        {
         "element": {
          "id": "c61",
          "width": 14,
          "height": 18,
          "length": 6,
          "timestamp": 3
         },
         "pivot": {
          "x": 43,
          "y": 31
         }
        },
        {
         "element": {
          "id": "c63",
          "width": 2,
          "height": 18,
          "length": 26,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 68
         }
        },
        {
         "element": {
          "id": "c67",
          "width": 17,
          "height": 18,
          "length": 2,
          "timestamp": 3
         },
         "pivot": {
          "x": 48,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c89",
          "width": 5,
          "height": 18,
          "length": 9,
          "timestamp": 4
         },
         "pivot": {
          "x": 33,
          "y": 63
         }
        },
        {
         "element": {
          "id": "c88",
          "width": 2,
          "height": 18,
          "length": 13,
          "timestamp": 4
         },
         "pivot": {
          "x": 31,
          "y": 27
         }
        }
       ],
       [
        {
         "element": {
          "id": "c72",
          "width": 37,
          "height": 18,
          "length": 33,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c79",
          "width": 31,
          "height": 18,
          "length": 39,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 37
         }
        },
        {
         "element": {
          "id": "c75",
          "width": 36,
          "height": 18,
          "length": 15,
          "timestamp": 3
         },
         "pivot": {
          "x": 33,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c64",
          "width": 25,
          "height": 18,
          "length": 10,
          "timestamp": 3
         },
         "pivot": {
          "x": 39,
          "y": 37
         }
        }
       ],
       [
        {
         "element": {
          "id": "c62",
          "width": 30,
          "height": 18,
          "length": 26,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c73",
          "width": 17,
          "height": 18,
          "length": 40,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 30
         }
        },
        {
         "element": {
          "id": "c66",
          "width": 16,
          "height": 18,
          "length": 38,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 47
         }
        },
        {
         "element": {
          "id": "c69",
          "width": 7,
          "height": 18,
          "length": 39,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 63
         }
        },
        {
         "element": {
          "id": "c70",
          "width": 12,
          "height": 18,
          "length": 20,
          "timestamp": 3
         },
         "pivot": {
          "x": 26,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c77",
          "width": 11,
          "height": 18,
          "length": 19,
          "timestamp": 3
         },
         "pivot": {
          "x": 26,
          "y": 12
         }
        },
        {
         "element": {
          "id": "c60",
          "width": 13,
          "height": 18,
          "length": 9,
          "timestamp": 3
         },
         "pivot": {
          "x": 40,
          "y": 30
         }
        },
        {
         "element": {
          "id": "c86",
          "width": 6,
          "height": 18,
          "length": 24,
          "timestamp": 4
         },
         "pivot": {
          "x": 26,
          "y": 23
         }
        }
       ]
      ],
      "freeSpace": 0.09914285714285714,
      "send": true
     },
     {
      "id": "s2",
      "width": 60,
      "length": 70,
      "height": 60,
      "containers": [
       [
        {
         "element": {
          "id": "c54",
          "width": 31,
          "height": 18,
          "length": 31,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c43",
          "width": 29,
          "height": 18,
          "length": 32,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 31
         }
        },
        {
         "element": {
          "id": "c50",
          "width": 5,
          "height": 18,
          "length": 33,
          "timestamp": 2
         },
         "pivot": {
          "x": 31,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c62",
          "width": 26,
          "height": 18,
          "length": 30,
          "timestamp": 3
         },
         "pivot": {
          "x": 32,
          "y": 31
         }
        },
        {
         "element": {
          "id": "c66",
          "width": 16,
          "height": 18,
          "length": 38,
          "timestamp": 3
         },
         "pivot": {
          "x": 31,
          "y": 5
         }
        },
        {
         "element": {
          "id": "c69",
          "width": 7,
          "height": 18,
          "length": 39,
          "timestamp": 3
         },
         "pivot": {
          "x": 31,
          "y": 21
         }
        },
        {
         "element": {
          "id": "c61",
          "width": 14,
          "height": 18,
          "length": 6,
          "timestamp": 3
         },
         "pivot": {
          "x": 62,
          "y": 31
         }
        },
        {
         "element": {
          "id": "c63",
          "width": 2,
          "height": 18,
          "length": 26,
          "timestamp": 3
         },
         "pivot": {
          "x": 32,
          "y": 57
         }
        },
        {
         "element": {
          "id": "c67",
          "width": 2,
          "height": 18,
          "length": 17,
          "timestamp": 3
         },
         "pivot": {
          "x": 31,
          "y": 28
         }
        },
        {
         "element": {
          "id": "c89",
          "width": 9,
          "height": 18,
          "length": 5,
          "timestamp": 4
         },
         "pivot": {
          "x": 62,
          "y": 45
         }
        },
        {
         "element": {
          "id": "c88",
          "width": 2,
          "height": 18,
          "length": 13,
          "timestamp": 4
         },
         "pivot": {
          "x": 48,
          "y": 28
         }
        }
       ],
       [
        {
         "element": {
          "id": "c72",
          "width": 37,
          "height": 18,
          "length": 33,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c73",
          "width": 17,
          "height": 18,
          "length": 40,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 37
         }
        },
        {
         "element": {
          "id": "c75",
          "width": 36,
          "height": 18,
          "length": 15,
          "timestamp": 3
         },
         "pivot": {
          "x": 33,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c78",
          "width": 27,
          "height": 18,
          "length": 17,
          "timestamp": 3
         },
         "pivot": {
          "x": 48,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c64",
          "width": 10,
          "height": 18,
          "length": 25,
          "timestamp": 3
         },
         "pivot": {
          "x": 40,
          "y": 37
         }
        },
        {
         "element": {
          "id": "c60",
          "width": 9,
          "height": 18,
          "length": 13,
          "timestamp": 3
         },
         "pivot": {
          "x": 48,
          "y": 27
         }
        },
        {
         "element": {
          "id": "c86",
          "width": 6,
          "height": 18,
          "length": 24,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 54
         }
        }
       ],
       [
        {
         "element": {
          "id": "c79",
          "width": 39,
          "height": 18,
          "length": 31,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c74",
          "width": 31,
          "height": 18,
          "length": 14,
          "timestamp": 3
         },
         "pivot": {
          "x": 31,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c70",
          "width": 12,
          "height": 18,
          "length": 20,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 39
         }
        },
        {
         "element": {
          "id": "c71",
          "width": 8,
          "height": 18,
          "length": 29,
          "timestamp": 3
         },
         "pivot": {
          "x": 31,
          "y": 31
         }
        },
        {
         "element": {
          "id": "c65",
          "width": 9,
          "height": 18,
          "length": 25,
          "timestamp": 3
         },
         "pivot": {
          "x": 45,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c77",
          "width": 19,
          "height": 18,
          "length": 11,
          "timestamp": 3
         },
         "pivot": {
          "x": 45,
          "y": 9
         }
        },
        {
         "element": {
          "id": "c80",
          "width": 8,
          "height": 18,
          "length": 39,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 51
         }
        },
        {
         "element": {
          "id": "c99",
          "width": 8,
          "height": 18,
          "length": 30,
          "timestamp": 4
         },
         "pivot": {
          "x": 20,
          "y": 39
         }
        },
        {
         "element": {
          "id": "c98",
          "width": 16,
          "height": 18,
          "length": 13,
          "timestamp": 4
         },
         "pivot": {
          "x": 56,
          "y": 9
         }
        }
       ]
      ],
      "freeSpace": 0.1526984126984127,
      "send": false
     },
     {
      "id": "s3",
      "width": 90,
      "length": 50,
      "height": 60,
      "containers": [
       [
        {
         "element": {
          "id": "c54",
          "width": 31,
          "height": 18,
          "length": 31,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c43",
          "width": 32,
          "height": 18,
          "length": 29,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 31
         }
        },
        {
         "element": {
          "id": "c50",
          "width": 5,
          "height": 18,
          "length": 33,
          "timestamp": 2
         },
         "pivot": {
          "x": 0,
          "y": 63
         }
        },
        {
         "element": {
          "id": "c73",
          "width": 17,
          "height": 18,
          "length": 40,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 68
         }
        },
        {
         "element": {
          "id": "c78",
          "width": 27,
          "height": 18,
          "length": 17,
          "timestamp": 3
         },
         "pivot": {
          "x": 31,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c74",
          "width": 31,
          "height": 18,
          "length": 14,
          "timestamp": 3
         },
         "pivot": {
          "x": 29,
          "y": 31
         }
        },
        {
         "element": {
          "id": "c60",
          "width": 13,
          "height": 18,
          "length": 9,
          "timestamp": 3
         },
         "pivot": {
          "x": 40,
          "y": 68
         }
        },
        {
         "element": {
          "id": "c61",
          "width": 14,
          "height": 18,
          "length": 6,
          "timestamp": 3
         },
         "pivot": {
          "x": 43,
          "y": 31
         }
        },
        {
         "element": {
          "id": "c63",
          "width": 2,
          "height": 18,
          "length": 26,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 85
         }
        },
        {
         "element": {
          "id": "c67",
          "width": 17,
          "height": 18,
          "length": 2,
          "timestamp": 3
         },
         "pivot": {
          "x": 48,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c89",
          "width": 5,
          "height": 18,
          "length": 9,
          "timestamp": 4
         },
         "pivot": {
          "x": 33,
          "y": 63
         }
        },
        {
         "element": {
          "id": "c88",
          "width": 2,
          "height": 18,
          "length": 13,
          "timestamp": 4
         },
         "pivot": {
          "x": 31,
          "y": 27
         }
        }
       ],
       [
        {
         "element": {
          "id": "c72",
          "width": 37,
          "height": 18,
          "length": 33,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c79",
          "width": 31,
          "height": 18,
          "length": 39,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 37
         }
        },
        {
         "element": {
          "id": "c66",
          "width": 16,
          "height": 18,
          "length": 38,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 68
         }
        },
        {
         "element": {
          "id": "c75",
          "width": 36,
          "height": 18,
          "length": 15,
          "timestamp": 3
         },
         "pivot": {
          "x": 33,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c64",
          "width": 25,
          "height": 18,
          "length": 10,
          "timestamp": 3
         },
         "pivot": {
          "x": 39,
          "y": 37
         }
        },
        {
         "element": {
          "id": "c86",
          "width": 6,
          "height": 18,
          "length": 24,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 84
         }
        }
       ],
       [
        {
         "element": {
          "id": "c62",
          "width": 30,
          "height": 18,
          "length": 26,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c69",
          "width": 7,
          "height": 18,
          "length": 39,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 30
         }
        },
        {
         "element": {
          "id": "c70",
          "width": 12,
          "height": 18,
          "length": 20,
          "timestamp": 3
         },
         "pivot": {
          "x": 26,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c71",
          "width": 8,
          "height": 18,
          "length": 29,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 37
         }
        },
        {
         "element": {
          "id": "c65",
          "width": 9,
          "height": 18,
          "length": 25,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 45
         }
        },
        {
         "element": {
          "id": "c77",
          "width": 19,
          "height": 18,
          "length": 11,
          "timestamp": 3
         },
         "pivot": {
          "x": 0,
          "y": 54
         }
        },
        {
         "element": {
          "id": "c96",
          "width": 19,
          "height": 18,
          "length": 35,
          "timestamp": 4
         },
         "pivot": {
          "x": 11,
          "y": 54
         }
        },
        {
         "element": {
          "id": "c97",
          "width": 17,
          "height": 18,
          "length": 29,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 73
         }
        },
        {
         "element": {
          "id": "c91",
          "width": 15,
          "height": 18,
          "length": 24,
          "timestamp": 4
         },
         "pivot": {
          "x": 26,
          "y": 12
         }
        },
        {
         "element": {
          "id": "c94",
          "width": 11,
          "height": 18,
          "length": 21,
          "timestamp": 4
         },
         "pivot": {
          "x": 29,
          "y": 73
         }
        }
       ]
      ],
      "freeSpace": 0.13592592592592592,
      "send": false
     }
    ],
    [
     {
      "id": "s2",
      "width": 60,
      "length": 70,
      "height": 60,
      "containers": [
       [
        {
         "element": {
          "id": "c87",
          "width": 30,
          "height": 18,
          "length": 26,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c96",
          "width": 19,
          "height": 18,
          "length": 35,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 30
         }
        },
        {
         "element": {
          "id": "c93",
          "width": 30,
          "height": 18,
          "length": 20,
          "timestamp": 4
         },
         "pivot": {
          "x": 26,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c90",
          "width": 23,
          "height": 18,
          "length": 23,
          "timestamp": 4
         },
         "pivot": {
          "x": 46,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c97",
          "width": 17,
          "height": 18,
          "length": 29,
          "timestamp": 4
         },
         "pivot": {
          "x": 35,
          "y": 30
         }
        },
        {
         "element": {
          "id": "c80",
          "width": 8,
          "height": 18,
          "length": 39,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 49
         }
        },
        {
         "element": {
          "id": "c99",
          "width": 8,
          "height": 18,
          "length": 30,
          "timestamp": 4
         },
         "pivot": {
          "x": 39,
          "y": 49
         }
        },
        {
         "element": {
          "id": "c86",
          "width": 6,
          "height": 18,
          "length": 24,
          "timestamp": 4
         },
         "pivot": {
          "x": 46,
          "y": 23
         }
        },
        {
         "element": {
          "id": "c89",
          "width": 9,
          "height": 18,
          "length": 5,
          "timestamp": 4
         },
         "pivot": {
          "x": 64,
          "y": 30
         }
        },
        {
         "element": {
          "id": "c88",
          "width": 2,
          "height": 18,
          "length": 13,
          "timestamp": 4
         },
         "pivot": {
          "x": 35,
          "y": 47
         }
        },
        {
         "element": {
          "id": "c104",
          "width": 2,
          "height": 18,
          "length": 33,
          "timestamp": 5
         },
         "pivot": {
          "x": 0,
          "y": 57
         }
        },
        {
         "element": {
          "id": "c110",
          "width": 2,
          "height": 18,
          "length": 7,
          "timestamp": 5
         },
         "pivot": {
          "x": 48,
          "y": 47
         }
        },
        {
         "element": {
          "id": "c129",
          "width": 8,
          "height": 18,
          "length": 5,
          "timestamp": 6
         },
         "pivot": {
          "x": 64,
          "y": 39
         }
        },
        {
         "element": {
          "id": "c132",
          "width": 2,
          "height": 18,
          "length": 13,
          "timestamp": 6
         },
         "pivot": {
          "x": 33,
          "y": 57
         }
        },
        {
         "element": {
          "id": "c130",
          "width": 1,
          "height": 18,
          "length": 22,
          "timestamp": 6
         },
         "pivot": {
          "x": 46,
          "y": 29
         }
        },
        {
         "element": {
          "id": "c144",
          "width": 1,
          "height": 18,
          "length": 20,
          "timestamp": 7
         },
         "pivot": {
          "x": 0,
          "y": 59
         }
        }
       ],
       [
        {
         "element": {
          "id": "c92",
          "width": 14,
          "height": 18,
          "length": 28,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c91",
          "width": 24,
          "height": 18,
          "length": 15,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 14
         }
        },
        {
         "element": {
          "id": "c94",
          "width": 21,
          "height": 18,
          "length": 11,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 38
         }
        },
        {
         "element": {
          "id": "c98",
          "width": 13,
          "height": 18,
          "length": 16,
          "timestamp": 4
         },
         "pivot": {
          "x": 28,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c101",
          "width": 23,
          "height": 18,
          "length": 29,
          "timestamp": 5
         },
         "pivot": {
          "x": 15,
          "y": 14
         }
        },
        {
         "element": {
          "id": "c108",
          "width": 12,
          "height": 18,
          "length": 35,
          "timestamp": 5
         },
         "pivot": {
          "x": 11,
          "y": 38
         }
        },
        {
         "element": {
          "id": "c113",
          "width": 15,
          "height": 18,
          "length": 21,
          "timestamp": 5
         },
         "pivot": {
          "x": 44,
          "y": 14
         }
        },
        {
         "element": {
          "id": "c117",
          "width": 12,
          "height": 18,
          "length": 25,
          "timestamp": 5
         },
         "pivot": {
          "x": 44,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c116",
          "width": 7,
          "height": 18,
          "length": 31,
          "timestamp": 5
         },
         "pivot": {
          "x": 11,
          "y": 50
         }
        },
        {
         "element": {
          "id": "c107",
          "width": 5,
          "height": 18,
          "length": 27,
          "timestamp": 5
         },
         "pivot": {
          "x": 42,
          "y": 50
         }
        },
        {
         "element": {
          "id": "c111",
          "width": 7,
          "height": 18,
          "length": 19,
          "timestamp": 5
         },
         "pivot": {
          "x": 46,
          "y": 38
         }
        },
        {
         "element": {
          "id": "c114",
          "width": 7,
          "height": 18,
          "length": 15,
          "timestamp": 5
         },
         "pivot": {
          "x": 44,
          "y": 29
         }
        },
        {
         "element": {
          "id": "c115",
          "width": 5,
          "height": 18,
          "length": 21,
          "timestamp": 5
         },
         "pivot": {
          "x": 46,
          "y": 45
         }
        },
        {
         "element": {
          "id": "c147",
          "width": 9,
          "height": 18,
          "length": 4,
          "timestamp": 7
         },
         "pivot": {
          "x": 65,
          "y": 14
         }
        },
        {
         "element": {
          "id": "c157",
          "width": 6,
          "height": 18,
          "length": 6,
          "timestamp": 7
         },
         "pivot": {
          "x": 59,
          "y": 29
         }
        },
        {
         "element": {
          "id": "c155",
          "width": 3,
          "height": 18,
          "length": 5,
          "timestamp": 7
         },
         "pivot": {
          "x": 65,
          "y": 38
         }
        }
       ],
       [
        {
         "element": {
          "id": "c103",
          "width": 36,
          "height": 18,
          "length": 32,
          "timestamp": 5
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c106",
          "width": 30,
          "height": 18,
          "length": 30,
          "timestamp": 5
         },
         "pivot": {
          "x": 32,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c102",
          "width": 14,
          "height": 18,
          "length": 28,
          "timestamp": 5
         },
         "pivot": {
          "x": 0,
          "y": 36
         }
        },
        {
         "element": {
          "id": "c119",
          "width": 13,
          "height": 18,
          "length": 21,
          "timestamp": 5
         },
         "pivot": {
          "x": 28,
          "y": 36
         }
        },
        {
         "element": {
          "id": "c112",
          "width": 8,
          "height": 18,
          "length": 11,
          "timestamp": 5
         },
         "pivot": {
          "x": 0,
          "y": 50
         }
        },
        {
         "element": {
          "id": "c127",
          "width": 30,
          "height": 18,
          "length": 4,
          "timestamp": 6
         },
         "pivot": {
          "x": 62,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c135",
          "width": 7,
          "height": 18,
          "length": 16,
          "timestamp": 6
         },
         "pivot": {
          "x": 49,
          "y": 36
         }
        },
        {
         "element": {
          "id": "c124",
          "width": 3,
          "height": 18,
          "length": 32,
          "timestamp": 6
         },
         "pivot": {
          "x": 32,
          "y": 30
         }
        },
        {
         "element": {
          "id": "c128",
          "width": 24,
          "height": 18,
          "length": 3,
          "timestamp": 6
         },
         "pivot": {
          "x": 66,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c143",
          "width": 7,
          "height": 18,
          "length": 37,
          "timestamp": 7
         },
         "pivot": {
          "x": 11,
          "y": 50
         }
        },
        {
         "element": {
          "id": "c141",
          "width": 4,
          "height": 18,
          "length": 22,
          "timestamp": 7
         },
         "pivot": {
          "x": 48,
          "y": 50
         }
        },
        {
         "element": {
          "id": "c145",
          "width": 4,
          "height": 18,
          "length": 9,
          "timestamp": 7
         },
         "pivot": {
          "x": 49,
          "y": 43
         }
        },
        {
         "element": {
          "id": "c158",
          "width": 3,
          "height": 18,
          "length": 8,
          "timestamp": 7
         },
         "pivot": {
          "x": 32,
          "y": 33
         }
        }
       ]
      ],
      "freeSpace": 0.10246031746031747,
      "send": false
     },
     {
      "id": "s3",
      "width": 90,
      "length": 50,
      "height": 60,
      "containers": [
       [
        {
         "element": {
          "id": "c87",
          "width": 30,
          "height": 18,
          "length": 26,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c96",
          "width": 19,
          "height": 18,
          "length": 35,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 30
         }
        },
        {
         "element": {
          "id": "c93",
          "width": 30,
          "height": 18,
          "length": 20,
          "timestamp": 4
         },
         "pivot": {
          "x": 26,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c90",
          "width": 23,
          "height": 18,
          "length": 23,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 49
         }
        },
        {
         "element": {
          "id": "c97",
          "width": 17,
          "height": 18,
          "length": 29,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 72
         }
        },
        {
         "element": {
          "id": "c91",
          "width": 15,
          "height": 18,
          "length": 24,
          "timestamp": 4
         },
         "pivot": {
          "x": 23,
          "y": 49
         }
        },
        {
         "element": {
          "id": "c94",
          "width": 11,
          "height": 18,
          "length": 21,
          "timestamp": 4
         },
         "pivot": {
          "x": 29,
          "y": 72
         }
        },
        {
         "element": {
          "id": "c98",
          "width": 16,
          "height": 18,
          "length": 13,
          "timestamp": 4
         },
         "pivot": {
          "x": 35,
          "y": 30
         }
        },
        {
         "element": {
          "id": "c86",
          "width": 6,
          "height": 18,
          "length": 24,
          "timestamp": 4
         },
         "pivot": {
          "x": 23,
          "y": 64
         }
        },
        {
         "element": {
          "id": "c89",
          "width": 5,
          "height": 18,
          "length": 9,
          "timestamp": 4
         },
         "pivot": {
          "x": 29,
          "y": 83
         }
        },
        {
         "element": {
          "id": "c88",
          "width": 2,
          "height": 18,
          "length": 13,
          "timestamp": 4
         },
         "pivot": {
          "x": 35,
          "y": 46
         }
        },
        {
         "element": {
          "id": "c110",
          "width": 2,
          "height": 18,
          "length": 7,
          "timestamp": 5
         },
         "pivot": {
          "x": 23,
          "y": 70
         }
        },
        {
         "element": {
          "id": "c127",
          "width": 30,
          "height": 18,
          "length": 4,
          "timestamp": 6
         },
         "pivot": {
          "x": 46,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c129",
          "width": 5,
          "height": 18,
          "length": 8,
          "timestamp": 6
         },
         "pivot": {
          "x": 38,
          "y": 83
         }
        },
        {
         "element": {
          "id": "c132",
          "width": 2,
          "height": 18,
          "length": 13,
          "timestamp": 6
         },
         "pivot": {
          "x": 30,
          "y": 70
         }
        },
        {
         "element": {
          "id": "c130",
          "width": 1,
          "height": 18,
          "length": 22,
          "timestamp": 6
         },
         "pivot": {
          "x": 0,
          "y": 89
         }
        },
        {
         "element": {
          "id": "c158",
          "width": 8,
          "height": 18,
          "length": 3,
          "timestamp": 7
         },
         "pivot": {
          "x": 47,
          "y": 49
         }
        },
        {
         "element": {
          "id": "c144",
          "width": 1,
          "height": 18,
          "length": 20,
          "timestamp": 7
         },
         "pivot": {
          "x": 29,
          "y": 88
         }
        },
        {
         "element": {
          "id": "c155",
          "width": 5,
          "height": 18,
          "length": 3,
          "timestamp": 7
         },
         "pivot": {
          "x": 47,
          "y": 64
         }
        }
       ],
       [
        {
         "element": {
          "id": "c92",
          "width": 14,
          "height": 18,
          "length": 28,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c80",
          "width": 8,
          "height": 18,
          "length": 39,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 14
         }
        },
        {
         "element": {
          "id": "c99",
          "width": 8,
          "height": 18,
          "length": 30,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 22
         }
        },
        {
         "element": {
          "id": "c103",
          "width": 32,
          "height": 18,
          "length": 36,
          "timestamp": 5
         },
         "pivot": {
          "x": 0,
          "y": 30
         }
        },
        {
         "element": {
          "id": "c101",
          "width": 23,
          "height": 18,
          "length": 29,
          "timestamp": 5
         },
         "pivot": {
          "x": 0,
          "y": 62
         }
        },
        {
         "element": {
          "id": "c102",
          "width": 28,
          "height": 18,
          "length": 14,
          "timestamp": 5
         },
         "pivot": {
          "x": 36,
          "y": 30
         }
        },
        {
         "element": {
          "id": "c113",
          "width": 15,
          "height": 18,
          "length": 21,
          "timestamp": 5
         },
         "pivot": {
          "x": 29,
          "y": 62
         }
        },
        {
         "element": {
          "id": "c119",
          "width": 13,
          "height": 18,
          "length": 21,
          "timestamp": 5
         },
         "pivot": {
          "x": 28,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c107",
          "width": 5,
          "height": 18,
          "length": 27,
          "timestamp": 5
         },
         "pivot": {
          "x": 0,
          "y": 85
         }
        },
        {
         "element": {
          "id": "c111",
          "width": 7,
          "height": 18,
          "length": 19,
          "timestamp": 5
         },
         "pivot": {
          "x": 30,
          "y": 22
         }
        },
        {
         "element": {
          "id": "c114",
          "width": 7,
          "height": 18,
          "length": 15,
          "timestamp": 5
         },
         "pivot": {
          "x": 29,
          "y": 77
         }
        },
        {
         "element": {
          "id": "c115",
          "width": 5,
          "height": 18,
          "length": 21,
          "timestamp": 5
         },
         "pivot": {
          "x": 27,
          "y": 85
         }
        },
        {
         "element": {
          "id": "c112",
          "width": 8,
          "height": 18,
          "length": 11,
          "timestamp": 5
         },
         "pivot": {
          "x": 39,
          "y": 14
         }
        },
        {
         "element": {
          "id": "c147",
          "width": 4,
          "height": 18,
          "length": 9,
          "timestamp": 7
         },
         "pivot": {
          "x": 36,
          "y": 58
         }
        },
        {
         "element": {
          "id": "c157",
          "width": 6,
          "height": 18,
          "length": 6,
          "timestamp": 7
         },
         "pivot": {
          "x": 44,
          "y": 77
         }
        }
       ],
       [
        {
         "element": {
          "id": "c106",
          "width": 30,
          "height": 18,
          "length": 30,
          "timestamp": 5
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c108",
          "width": 12,
          "height": 18,
          "length": 35,
          "timestamp": 5
         },
         "pivot": {
          "x": 0,
          "y": 30
         }
        },
        {
         "element": {
          "id": "c117",
          "width": 12,
          "height": 18,
          "length": 25,
          "timestamp": 5
         },
         "pivot": {
          "x": 0,
          "y": 42
         }
        },
        {
         "element": {
          "id": "c116",
          "width": 7,
          "height": 18,
          "length": 31,
          "timestamp": 5
         },
         "pivot": {
          "x": 0,
          "y": 54
         }
        },
        {
         "element": {
          "id": "c104",
          "width": 2,
          "height": 18,
          "length": 33,
          "timestamp": 5
         },
         "pivot": {
          "x": 0,
          "y": 61
         }
        },
        {
         "element": {
          "id": "c126",
          "width": 22,
          "height": 18,
          "length": 32,
          "timestamp": 6
         },
         "pivot": {
          "x": 0,
          "y": 63
         }
        },
        {
         "element": {
          "id": "c122",
          "width": 24,
          "height": 18,
          "length": 20,
          "timestamp": 6
         },
         "pivot": {
          "x": 30,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c139",
          "width": 19,
          "height": 18,
          "length": 17,
          "timestamp": 6
         },
         "pivot": {
          "x": 32,
          "y": 63
         }
        },
        {
         "element": {
          "id": "c136",
          "width": 12,
          "height": 18,
          "length": 24,
          "timestamp": 6
         },
         "pivot": {
          "x": 25,
          "y": 42
         }
        },
        {
         "element": {
          "id": "c135",
          "width": 7,
          "height": 18,
          "length": 16,
          "timestamp": 6
         },
         "pivot": {
          "x": 31,
          "y": 54
         }
        },
        {
         "element": {
          "id": "c124",
          "width": 3,
          "height": 18,
          "length": 32,
          "timestamp": 6
         },
         "pivot": {
          "x": 0,
          "y": 85
         }
        },
        {
         "element": {
          "id": "c145",
          "width": 9,
          "height": 18,
          "length": 4,
          "timestamp": 7
         },
         "pivot": {
          "x": 35,
          "y": 30
         }
        },
        {
         "element": {
          "id": "c160",
          "width": 6,
          "height": 18,
          "length": 20,
          "timestamp": 8
         },
         "pivot": {
          "x": 30,
          "y": 24
         }
        }
       ]
      ],
      "freeSpace": 0.05148148148148148,
      "send": true
     },
     {
      "id": "s4",
      "width": 95,
      "length": 81,
      "height": 82,
      "containers": [
       [
        {
         "element": {
          "id": "c87",
          "width": 30,
          "height": 18,
          "length": 26,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c96",
          "width": 19,
          "height": 18,
          "length": 35,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 30
         }
        },
        {
         "element": {
          "id": "c93",
          "width": 30,
          "height": 18,
          "length": 20,
          "timestamp": 4
         },
         "pivot": {
          "x": 26,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c90",
          "width": 23,
          "height": 18,
          "length": 23,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 49
         }
        },
        {
         "element": {
          "id": "c97",
          "width": 17,
          "height": 18,
          "length": 29,
          "timestamp": 4
         },
         "pivot": {
          "x": 35,
          "y": 30
         }
        },
        {
         "element": {
          "id": "c92",
          "width": 28,
          "height": 18,
          "length": 14,
          "timestamp": 4
         },
         "pivot": {
          "x": 46,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c91",
          "width": 15,
          "height": 18,
          "length": 24,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 72
         }
        },
        {
         "element": {
          "id": "c80",
          "width": 8,
          "height": 18,
          "length": 39,
          "timestamp": 4
         },
         "pivot": {
          "x": 23,
          "y": 49
         }
        },
        {
         "element": {
          "id": "c99",
          "width": 8,
          "height": 18,
          "length": 30,
          "timestamp": 4
         },
         "pivot": {
          "x": 0,
          "y": 87
         }
        },
        {
         "element": {
          "id": "c94",
          "width": 11,
          "height": 18,
          "length": 21,
          "timestamp": 4
         },
         "pivot": {
          "x": 60,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c98",
          "width": 16,
          "height": 18,
          "length": 13,
          "timestamp": 4
         },
         "pivot": {
          "x": 64,
          "y": 30
         }
        },
        {
         "element": {
          "id": "c86",
          "width": 6,
          "height": 18,
          "length": 24,
          "timestamp": 4
         },
         "pivot": {
          "x": 24,
          "y": 72
         }
        },
        {
         "element": {
          "id": "c89",
          "width": 5,
          "height": 18,
          "length": 9,
          "timestamp": 4
         },
         "pivot": {
          "x": 23,
          "y": 57
         }
        },
        {
         "element": {
          "id": "c88",
          "width": 2,
          "height": 18,
          "length": 13,
          "timestamp": 4
         },
         "pivot": {
          "x": 35,
          "y": 47
         }
        },
        {
         "element": {
          "id": "c113",
          "width": 15,
          "height": 18,
          "length": 21,
          "timestamp": 5
         },
         "pivot": {
          "x": 60,
          "y": 11
         }
        },
        {
         "element": {
          "id": "c116",
          "width": 7,
          "height": 18,
          "length": 31,
          "timestamp": 5
         },
         "pivot": {
          "x": 30,
          "y": 87
         }
        },
        {
         "element": {
          "id": "c107",
          "width": 5,
          "height": 18,
          "length": 27,
          "timestamp": 5
         },
         "pivot": {
          "x": 24,
          "y": 78
         }
        },
        {
         "element": {
          "id": "c111",
          "width": 7,
          "height": 18,
          "length": 19,
          "timestamp": 5
         },
         "pivot": {
          "x": 62,
          "y": 49
         }
        },
        {
         "element": {
          "id": "c114",
          "width": 7,
          "height": 18,
          "length": 15,
          "timestamp": 5
         },
         "pivot": {
          "x": 23,
          "y": 62
         }
        },
        {
         "element": {
          "id": "c115",
          "width": 5,
          "height": 18,
          "length": 21,
          "timestamp": 5
         },
         "pivot": {
          "x": 48,
          "y": 72
         }
        },
        {
         "element": {
          "id": "c104",
          "width": 2,
          "height": 18,
          "length": 33,
          "timestamp": 5
         },
         "pivot": {
          "x": 46,
          "y": 28
         }
        },
        {
         "element": {
          "id": "c110",
          "width": 2,
          "height": 18,
          "length": 7,
          "timestamp": 5
         },
         "pivot": {
          "x": 32,
          "y": 57
         }
        },
        {
         "element": {
          "id": "c127",
          "width": 4,
          "height": 18,
          "length": 30,
          "timestamp": 6
         },
         "pivot": {
          "x": 24,
          "y": 83
         }
        },
        {
         "element": {
          "id": "c135",
          "width": 7,
          "height": 18,
          "length": 16,
          "timestamp": 6
         },
         "pivot": {
          "x": 61,
          "y": 87
         }
        },
        {
         "element": {
          "id": "c124",
          "width": 3,
          "height": 18,
          "length": 32,
          "timestamp": 6
         },
         "pivot": {
          "x": 23,
          "y": 69
         }
        },
        {
         "element": {
          "id": "c128",
          "width": 3,
          "height": 18,
          "length": 24,
          "timestamp": 6
         },
         "pivot": {
          "x": 51,
          "y": 78
         }
        },
        {
         "element": {
          "id": "c129",
          "width": 5,
          "height": 18,
          "length": 8,
          "timestamp": 6
         },
         "pivot": {
          "x": 38,
          "y": 62
         }
        },
        {
         "element": {
          "id": "c132",
          "width": 2,
          "height": 18,
          "length": 13,
          "timestamp": 6
         },
         "pivot": {
          "x": 48,
          "y": 47
         }
        },
        {
         "element": {
          "id": "c130",
          "width": 1,
          "height": 18,
          "length": 22,
          "timestamp": 6
         },
         "pivot": {
          "x": 30,
          "y": 94
         }
        },
        {
         "element": {
          "id": "c141",
          "width": 4,
          "height": 18,
          "length": 22,
          "timestamp": 7
         },
         "pivot": {
          "x": 54,
          "y": 83
         }
        },
        {
         "element": {
          "id": "c147",
          "width": 4,
          "height": 18,
          "length": 9,
          "timestamp": 7
         },
         "pivot": {
          "x": 69,
          "y": 72
         }
        },
        {
         "element": {
          "id": "c145",
          "width": 9,
          "height": 18,
          "length": 4,
          "timestamp": 7
         },
         "pivot": {
          "x": 77,
          "y": 30
         }
        },
        {
         "element": {
          "id": "c158",
          "width": 3,
          "height": 18,
          "length": 8,
          "timestamp": 7
         },
         "pivot": {
          "x": 32,
          "y": 59
         }
        },
        {
         "element": {
          "id": "c144",
          "width": 1,
          "height": 18,
          "length": 20,
          "timestamp": 7
         },
         "pivot": {
          "x": 60,
          "y": 26
         }
        },
        {
         "element": {
          "id": "c155",
          "width": 5,
          "height": 18,
          "length": 3,
          "timestamp": 7
         },
         "pivot": {
          "x": 77,
          "y": 87
         }
        }
       ],
       [
        {
         "element": {
          "id": "c103",
          "width": 32,
          "height": 18,
          "length": 36,
          "timestamp": 5
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c106",
          "width": 30,
          "height": 18,
          "length": 30,
          "timestamp": 5
         },
         "pivot": {
          "x": 0,
          "y": 32
         }
        },
        {
         "element": {
          "id": "c101",
          "width": 29,
          "height": 18,
          "length": 23,
          "timestamp": 5
         },
         "pivot": {
          "x": 36,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c108",
          "width": 12,
          "height": 18,
          "length": 35,
          "timestamp": 5
         },
         "pivot": {
          "x": 0,
          "y": 62
         }
        },
        {
         "element": {
          "id": "c102",
          "width": 14,
          "height": 18,
          "length": 28,
          "timestamp": 5
         },
         "pivot": {
          "x": 30,
          "y": 32
         }
        },
        {
         "element": {
          "id": "c117",
          "width": 25,
          "height": 18,
          "length": 12,
          "timestamp": 5
         },
         "pivot": {
          "x": 59,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c119",
          "width": 21,
          "height": 18,
          "length": 13,
          "timestamp": 5
         },
         "pivot": {
          "x": 0,
          "y": 74
         }
        },
        {
         "element": {
          "id": "c112",
          "width": 11,
          "height": 18,
          "length": 8,
          "timestamp": 5
         },
         "pivot": {
          "x": 35,
          "y": 62
         }
        },
        {
         "element": {
          "id": "c131",
          "width": 14,
          "height": 18,
          "length": 36,
          "timestamp": 6
         },
         "pivot": {
          "x": 30,
          "y": 46
         }
        },
        {
         "element": {
          "id": "c122",
          "width": 20,
          "height": 18,
          "length": 24,
          "timestamp": 6
         },
         "pivot": {
          "x": 13,
          "y": 74
         }
        },
        {
         "element": {
          "id": "c139",
          "width": 17,
          "height": 18,
          "length": 19,
          "timestamp": 6
         },
         "pivot": {
          "x": 37,
          "y": 74
         }
        },
        {
         "element": {
          "id": "c136",
          "width": 12,
          "height": 18,
          "length": 24,
          "timestamp": 6
         },
         "pivot": {
          "x": 56,
          "y": 74
         }
        },
        {
         "element": {
          "id": "c134",
          "width": 14,
          "height": 18,
          "length": 20,
          "timestamp": 6
         },
         "pivot": {
          "x": 58,
          "y": 32
         }
        },
        {
         "element": {
          "id": "c121",
          "width": 9,
          "height": 18,
          "length": 30,
          "timestamp": 6
         },
         "pivot": {
          "x": 43,
          "y": 62
         }
        },
        {
         "element": {
          "id": "c157",
          "width": 6,
          "height": 18,
          "length": 6,
          "timestamp": 7
         },
         "pivot": {
          "x": 71,
          "y": 0
         }
        }
       ],
       [
        {
         "element": {
          "id": "c138",
          "width": 32,
          "height": 18,
          "length": 37,
          "timestamp": 6
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c123",
          "width": 37,
          "height": 18,
          "length": 29,
          "timestamp": 6
         },
         "pivot": {
          "x": 0,
          "y": 32
         }
        },
        {
         "element": {
          "id": "c126",
          "width": 32,
          "height": 18,
          "length": 22,
          "timestamp": 6
         },
         "pivot": {
          "x": 37,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c120",
          "width": 30,
          "height": 18,
          "length": 23,
          "timestamp": 6
         },
         "pivot": {
          "x": 29,
          "y": 32
         }
        },
        {
         "element": {
          "id": "c133",
          "width": 9,
          "height": 18,
          "length": 29,
          "timestamp": 6
         },
         "pivot": {
          "x": 0,
          "y": 69
         }
        },
        {
         "element": {
          "id": "c152",
          "width": 30,
          "height": 18,
          "length": 26,
          "timestamp": 7
         },
         "pivot": {
          "x": 52,
          "y": 32
         }
        },
        {
         "element": {
          "id": "c150",
          "width": 27,
          "height": 18,
          "length": 21,
          "timestamp": 7
         },
         "pivot": {
          "x": 59,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c149",
          "width": 17,
          "height": 18,
          "length": 25,
          "timestamp": 7
         },
         "pivot": {
          "x": 0,
          "y": 78
         }
        },
        {
         "element": {
          "id": "c143",
          "width": 7,
          "height": 18,
          "length": 37,
          "timestamp": 7
         },
         "pivot": {
          "x": 29,
          "y": 62
         }
        },
        {
         "element": {
          "id": "c154",
          "width": 7,
          "height": 18,
          "length": 34,
          "timestamp": 7
         },
         "pivot": {
          "x": 29,
          "y": 69
         }
        },
        {
         "element": {
          "id": "c148",
          "width": 6,
          "height": 18,
          "length": 39,
          "timestamp": 7
         },
         "pivot": {
          "x": 25,
          "y": 78
         }
        },
        {
         "element": {
          "id": "c156",
          "width": 6,
          "height": 18,
          "length": 29,
          "timestamp": 7
         },
         "pivot": {
          "x": 25,
          "y": 84
         }
        },
        {
         "element": {
          "id": "c164",
          "width": 6,
          "height": 18,
          "length": 26,
          "timestamp": 8
         },
         "pivot": {
          "x": 54,
          "y": 84
         }
        }
       ],
       [
        {
         "element": {
          "id": "c159",
          "width": 31,
          "height": 18,
          "length": 35,
          "timestamp": 7
         },
         "pivot": {
          "x": 0,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c151",
          "width": 39,
          "height": 18,
          "length": 23,
          "timestamp": 7
         },
         "pivot": {
          "x": 0,
          "y": 31
         }
        },
        {
         "element": {
          "id": "c140",
          "width": 19,
          "height": 18,
          "length": 38,
          "timestamp": 7
         },
         "pivot": {
          "x": 35,
          "y": 0
         }
        },
        {
         "element": {
          "id": "c163",
          "width": 38,
          "height": 18,
          "length": 31,
          "timestamp": 8
         },
         "pivot": {
          "x": 23,
          "y": 31
         }
        },
        {
         "element": {
          "id": "c166",
          "width": 29,
          "height": 18,
          "length": 24,
          "timestamp": 8
         },
         "pivot": {
          "x": 54,
          "y": 31
         }
        },
        {
         "element": {
          "id": "c165",
          "width": 15,
          "height": 18,
          "length": 35,
          "timestamp": 8
         },
         "pivot": {
          "x": 0,
          "y": 70
         }
        },
        {
         "element": {
          "id": "c162",
          "width": 9,
          "height": 18,
          "length": 31,
          "timestamp": 8
         },
         "pivot": {
          "x": 35,
          "y": 19
         }
        },
        {
         "element": {
          "id": "c161",
          "width": 6,
          "height": 18,
          "length": 25,
          "timestamp": 8
         },
         "pivot": {
          "x": 54,
          "y": 60
         }
        },
        {
         "element": {
          "id": "c160",
          "width": 6,
          "height": 18,
          "length": 20,
          "timestamp": 8
         },
         "pivot": {
          "x": 0,
          "y": 85
         }
        }
       ]
      ],
      "freeSpace": 0.16855100714749838,
      "send": false
     }
    ],
    [
     {
      "id": "s3",
      "width": 90,
      "length": 50,
      "height": 60,
      "containers": [
       [],
       [],
       []
      ],
      "freeSpace": 1,
      "send": false
     },
     {
      "id": "s4",
      "width": 95,
      "length": 81,
      "height": 82,
      "containers": [
       [],
       [],
       [],
       []
      ],
      "freeSpace": 1,
      "send": false
     },
     {
      "id": "s5",
      "width": 55,
      "length": 87,
      "height": 99,
      "containers": [
       [],
       [],
       [],
       [],
       []
      ],
      "freeSpace": 1,
      "send": true
     }
    ]
   ]




