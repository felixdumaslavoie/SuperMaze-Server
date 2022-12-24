import { Tile } from './Tile.mjs'

export class SMMap {
    #width
    #height
    #tiles

    constructor (width, height) {
        this.#width = width;
        this.#height = height;

        for (let i=0; i<this.#width; i++) {
            let rand = Math.floor(Math.random() * 10);

            if (rand >= 7)
            {
                this.#tiles[i] = new Tile("metal"); 
            }
        }
    }

}