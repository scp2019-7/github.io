const neighbor = Symbol(); // Edgeで接続される先のVertexクラス
const weight   = Symbol(); // Edgeの長さ

export default class Edge{
    constructor(n,w){
        this[neighbor] = n;
        this[weight] = w;
    }

    get getNeighbor(){
        return this[neighbor];
    }

    get getWeight() {
        return this[weight];
    }
}