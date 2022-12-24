import Vector2 from "vector2-node";

export class Player {
    
    #id
    #position
    #direction
    #spawnPoint

    static spawnPoints = [
        new Vector2(50,80),
        new Vector2(40,4975),
        new Vector2(4945,4975),
        new Vector2(4945,80)
    ]
    
    constructor(id)
    {
        this.#id = id
        this.#direction = "up"
        //this.#spawnPoint = this.spawnRandom()
        this.#spawnPoint = this.spawnDefault()
        // Copier la position de base 
        this.#position = Object.assign({}, this.#spawnPoint) 
    }

    getID()
    {
        return this.#id;
    }

    setPosition(x,y)
    {
        this.#position.x = x;
        this.#position.y = y;
    }
    
    getPosition() {
        return this.#position;
    }

    getSpawnPoint()
    {
        return this.#spawnPoint;
    }

    spawnRandom()
    {
        let selected = Math.floor(Math.random() * Player.spawnPoints.length);
        return  Player.spawnPoints[selected];
    }

    spawnDefault()
    {
        return  Player.spawnPoints[0];
    }

}