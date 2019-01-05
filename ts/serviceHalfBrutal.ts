import { FreeSpace } from './classes/classes';
import { Container, Ship } from './interfaces/a';
import { ships, containers } from './mock/mock';
import { parseTxt } from './txtParser';
import { readFromFile, saveToFile } from './helpers';
import { WarehouseExtended } from './halfBrutal';

export class HalfBrutalService {
    ships = [];
    report: {count: number, date: Date, result: any[]} = {result: [], count: 0, date: new Date()};
    containersHeight: number;
    warehouses = []
    // data = []
    constructor(ships: [Ship, Ship, Ship], public data: (Container | Ship)[]) {
        //bug jeżeli w pliku będzie pierwszy statek to się wywali
        this.containersHeight = data[0].height;
        ships.forEach(ship => {
            this.ships.push(ship)
            this.warehouses.push(new WarehouseExtended(ship, this.containersHeight, []))
        });
        this.report.count = containers.reduce((result, el) => {
            if(el.id.includes('c')) return result + 1;
            else return result 
        },0)

    }

    private makeContainerChunk() {
        let containers = [];
        containers.push(this.data.shift())
        //push elements while the same timestamp
        while (this.data.length && this.data[0].id.includes('c') && containers[containers.length - 1].timestamp === (this.data[0] as Container).timestamp) {
            containers.push(this.data.shift());
        }
        return containers;
    }

    optimize() {
        let notPlacedContainers = [[], [], []];
        let containers = []
        let ships = [];
        let lastShip = undefined;

        //if not placed cos mają 
            //if container
                //ładuj kontenery 
            //if ship
                //spakuj shipy do tmp, pobierz kontenery i wroc shipy unshiftem shipy                
        //if not placed nie maja nic
            //if container
                //ładuj kontenery
            //if ship
                //ładuj ship 

        while (this.data.length) {
            //if not placed cos mają
            if (notPlacedContainers[lastShip] && notPlacedContainers[lastShip].length) {
                //if container
                if (this.data[0].id.includes('c')) {
                    //ładuj kontenery 
                    containers = [...notPlacedContainers[lastShip]]
                }
                //if ship
                else if (this.data[0].id.includes('s')) {
                    //ładuj ship 
                    while (this.data.length && this.data[0].id.includes('s')) {
                        ships.push(this.data.shift())
                    }
                }
                notPlacedContainers = [[], [], []];
            }
            //if not placed nie maja nic
            else {
                if (this.data[0].id.includes('c')) {
                    //ładuj kontenery 
                    containers = [...containers, ...this.makeContainerChunk()];
                }
                //if ship
                else if (this.data[0].id.includes('s')) {
                    //spakuj shipy do tmp, pobierz kontenery i wroc shipy unshiftem shipy   
                    let tmpShips = [];
                    while (this.data.length && this.data.length && this.data[0].id.includes('s')) {
                        tmpShips.unshift(this.data.shift())
                    }
                    containers = this.makeContainerChunk()
                    tmpShips.forEach(ship => this.data.unshift(ship))
                }
            }

            // ship change
            while (ships.length) {
                let tmpShip = ships.shift()
                this.ships.shift();
                this.ships.push(tmpShip)
                this.warehouses.shift();
                this.warehouses.push(new WarehouseExtended(tmpShip, this.containersHeight, []));
            }

            const reports = [];


            this.warehouses.forEach((warehouse: WarehouseExtended, i) => {
                warehouse.sortedContainers = [...containers];

                warehouse.placeContainers();
                notPlacedContainers[i] = warehouse.notPlacedContainers;

            })

            if (notPlacedContainers[0].length && notPlacedContainers[1].length  && notPlacedContainers[2].length ) {
                this.warehouses.forEach((warehouse, i) => {
                    warehouse.countFreeSpace();
                    reports.push({
                        id: warehouse.ship.id,
                        width: warehouse.ship.width,
                        length: warehouse.ship.length,
                        height: warehouse.ship.height,
                        containers: warehouse.elements,
                        freeSpace: warehouse.freeSpace,
                        send: false
                    })
                })

                //best space alocating
                lastShip = reports.findIndex(report => report === reports.reduce((best, el) => {
                    return best.freeSpace < el.freeSpace ? best : el
                }, { freeSpace: 1 }));
                reports[lastShip].send = true;
                this.report.result.push(reports);
                this.warehouses.forEach(warehouse => this.warehouses.push(new WarehouseExtended(this.warehouses.shift().ship, this.containersHeight, [])))
            }else lastShip = undefined;
        } 
    }

}

const data = parseTxt(readFromFile('../generated-data-txt.txt'))
const service = new HalfBrutalService([ships[0], ships[1], ships[2]], data);
service.optimize();
console.log(JSON.stringify(service.report, null, 1))
// console.log(service.report.length)
// saveToFile(JSON.stringify(service.report, null, 1), '../raport.json');





