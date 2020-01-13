const vertices = Symbol(); // Graphに存在するVertexクラスの配列

export default class Graph{
    constructor(){
        this[vertices] = [];
    }

    // Vertexクラスを配列(Vertices)に追加するメソッド
    appendVertex(vertex){
        this[vertices].push(vertex);
    }

    get getVertices(){
        return this[vertices];
    }
}
