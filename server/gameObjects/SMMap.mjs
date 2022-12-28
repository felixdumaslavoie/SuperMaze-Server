import { Tile } from './Tile.mjs'
import rect from 'rectangles';
const { rectangles } = rect;

class TileTypes {
    #types;
    
    constructor() {
        this.#types = new Map();
        this.#types.set("metal", 1);
        this.#types.set("lave", 2);
    }

    getTypes(type){
        return this.#types.get(type);
    }
}


export class SMMap {
    #width = 50
    #height = 50
    
    // Tiles
    #tileList

    // Tiles array
    #tiles
    // Tile property
    #tileWidth = 150

    constructor () {
        this.#tileList = new TileTypes();

        this.#tiles = [];

        for (let i = 0; i < this.#width; i++) {
            this.#tiles[i] = []
            for (let j = 0; j < this.#height; j++) {
                if (j == 0 || i == 0 || j ==  this.#height -1 || i == this.#width -1)
                {
                    this.#tiles[i][j] = new Tile(this.#tileWidth, this.#tileWidth * i, this.#tileWidth * j,  this.#tileList.getTypes("metal"));
                }	
                else 
                {
                    this.#tiles[i][j] = new Tile(this.#tileWidth, this.#tileWidth * i, this.#tileWidth * j,  this.#tileList.getTypes("lave"));
                }
              }
        }
    }

    getTilesArray()
    {
        return this.#tiles;
    }

}