import Graph from "./src/dijkstra/Graph.js";
import Edge from "./src/dijkstra/Edge.js";

const index    = Symbol(); // Graphクラス内でのインデックス
const x        = Symbol(); // x座標
const y        = Symbol(); // y座標
const z        = Symbol(); // z座標
const theta    = Symbol(); // QRコードの向き
const distance = Symbol(); // スタートからの距離
const edge     = Symbol(); // Vertexに接続するEdgeクラスの配列

export default class Vertex{
    constructor(xCoordinate, yCoordinate, zCoordinate, direction, graph){
        this[index]    = graph.getVertices.length;
        this[x]        = xCoordinate;
        this[y]        = yCoordinate;
        this[z]        = zCoordinate;
        this[theta]    = direction;
        this[distance] = Number.POSITIVE_INFINITY;
        this[edge]     = [];
        graph.appendVertex(this);
    }

    // 隣接する全てのVertexを引数として渡すことにより
    // 隣接するVertex(neighbor)と，それぞれのVertexとの距離(weight)を配列(edge)に追加するメソッド
    appendEdge(){
        for(var i = 0; i < arguments.length; i++){
            this[edge].push(new Edge(arguments[i],
                                     ((this[x] - arguments[i].getCoordinate[0])**2
                                     +(this[y] - arguments[i].getCoordinate[1])**2
                                     +(this[z] - arguments[i].getCoordinate[2])**2)**0.5));
        }
    }

    get getIndex(){
        return this[index];
    }

    get getCoordinate(){
        return [this[x], this[y], this[z], this[theta]];
    }
        
    get getDistance(){
        return this[distance];
    }

    get getEdge(){
        return this[edge];
    }

    set setDistance(d){
        this[distance] = d;
    }
}