

export class Tile {
    _width
    _x
    _y
    _type


    constructor(width, x,y,type) {
        this._width = width
        this._x =x
        this._y =y

        this._type = type;
    }

    getRect()
    {
        return {x1: this._x, y1 : this._y, x2 : this._x + this._width, y2 : this._y + this._width}
    }
    
}