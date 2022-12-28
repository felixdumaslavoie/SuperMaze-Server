import { SMMap } from "./gameObjects/SMMap.mjs";
import { Player } from "./gameObjects/Player.mjs";

export class World {
    #map;
    #gameObjects
    #initialize
    constructor()
    {
        //this.#map = new SMMap(100,100);
        this.#gameObjects = new Array()
        this.#initialize = true;
        this.#map = new SMMap();
    }

    addPlayer(uid)
    {
        if (!this.#initialize)
        {
            this.World();
        }
        this.#gameObjects.push(new Player(0,0,uid)) 
    }

    getMap()
    {
        return this.#map.getTilesArray();
    }

}