import { containers, ship } from "./mock/mock";
import { generatedContainers } from "./mock/generated-data";
import * as cTable from 'console.table';
import { number } from "easy-table";


// let notPlacedContainers = [];
// let placedContainers = {};
// let floors = Math.floor(ship.height / generatedContainers[0].height);


// for (let floor = 0; floor < floors; floor++) {
//     placedContainers[`floor` + floor] = new Array(ship.length);
//     for (let i = 0; i < ship.length; i++) {
//         placedContainers[`floor` + floor][i] = new Array(ship.width);
//         for (let j = 0; j < ship.width; j++)
//             placedContainers[`floor` + floor][i][j] = 'x';
//     }
// }



const containerTest: Container[] = [{
    id: 'c1',
    width: 10,
    length: 10,
    height: 30,
    timestamp: 1
},
{
    id: 'c2',
    width: 5,
    length: 5,
    height: 30,
    timestamp: 1
},
{
    id: 'c3',
    width: 5,
    length: 15,
    height: 30,
    timestamp: 1
},
{
    id: 'c4',
    width: 10,
    length: 15,
    height: 30,
    timestamp: 1
},
{
    id: 'c5',
    width: 15,
    length: 10,
    height: 30,
    timestamp: 1
},
]


class Coord { constructor(public x: number, public y: number) { } }
class FreeSpace {
    pivot: Coord;
    size: { width: number, length: number };
    constructor(x: number, y: number, width: number, length: number) {
        this.pivot = new Coord(x, y);
        this.size = { width, length };
        // this.floors = Math.floor(ship.height / generatedContainers[0].height)
    }
}

class Warehouse {
    elements: { element: {}, pivot: Coord }[] = [];
    space: FreeSpace[];
    private strtingSpace: number;
    constructor(w,l){
        this.space = [new FreeSpace(0,0,w,l)];
        this.strtingSpace = w*l;
    }

    private findPlace(container: Container): FreeSpace | undefined {
        let freeSpace: FreeSpace;
        for (const space of this.space) {
            if (space.size.width >= container.width && space.size.length >= container.length) {
                freeSpace = space;
                break;
            }
        }
        return freeSpace;
    }

    private elementSwap(container: Container) {  [container.width, container.length] = [container.length, container.width]  }

    countFreeSpace() {
        return this.space.reduce((acc, next)=> {
            return acc + next.size.width * next.size.length;
        },0) / this.strtingSpace;
    }

    store(container: Container) {
        let freeSpace = this.findPlace(container);
        // if not enough space, swap width and length
        if(!freeSpace) {
            this.elementSwap(container);
            console.log("swaped: ", container);
            freeSpace = this.findPlace(container);   
        }
        // if place was found
        if(freeSpace) {
            // add container
            this.elements.push({element: container, pivot: freeSpace.pivot});

            // bigger on right
            if(freeSpace.size.width- container.width) {
                this.space.push(new FreeSpace(
                    freeSpace.pivot.x + container.width,
                    freeSpace.pivot.y,
                    freeSpace.size.width - container.width,
                    freeSpace.size.length
                ));
            }

            //smaller below
            if(freeSpace.size.length- container.length) {
                this.space.push(new FreeSpace(
                    freeSpace.pivot.x,
                    freeSpace.pivot.y + container.length,
                    container.width,
                    freeSpace.size.length - container.length
                ));
            }
            // plain remove
            const i = this.space.findIndex(el => el===freeSpace);
            this.space.splice(i,1);
            console.log(i)
            console.log(this.space)
            console.log(this.elements);
            console.log('\n________________________\n')
        }
    }
}

const warehouse = new Warehouse(25,30);



containerTest.forEach(el => warehouse.store(el))
console.log(warehouse.countFreeSpace());

    


/**
     * 25x30
     * czy mozna 10x10, tak mozna
     * referencje do obiektu i zapisanie że jest na pozycji (0,0)
     * 15x30, 10x20 - 25x20, 10x15  
     */






//     console.log('floor0')
// let table = cTable.getTable(placedContainers["floor0"]);
// console.table(placedContainers["floor0"]);
// console.log('floor1')
// table = cTable.getTable(placedContainers["floor1"]);
// console.table(placedContainers["floor1"]);
// console.log('floor2')
// table = cTable.getTable(placedContainers["floor2"]);
// console.table(placedContainers["floor2"]);
// console.log("notPlaced", notPlacedContainers);

