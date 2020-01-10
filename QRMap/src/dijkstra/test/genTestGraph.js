import Edge from "./src/dijkstra/Edge.js";
import Graph from "./src/dijkstra/Graph.js";
import Vertex from "./src/dijkstra/Vertex.js";

export default function genTestGraph(){
    // Graphを生成
    let graph = new Graph();

    // Vertexを定義し，Graphに追加（定義された順にインデックス付けされる）
    let v0 = new Vertex(0,0,0,0,graph);
    let v1 = new Vertex(1,0,0,0,graph);
    let v2 = new Vertex(1,1,0,0,graph);
    let v3 = new Vertex(4,0,0,0,graph);
    let v4 = new Vertex(3,2,0,0,graph);
    let v5 = new Vertex(4,2,0,0,graph);
    let v6 = new Vertex(0,2,0,0,graph);

    // Edgeを定義し，Vertexに追加
    v0.appendEdge(v1,v2,v6);
    v1.appendEdge(v0,v2,v3);
    v2.appendEdge(v0,v1,v4);
    v3.appendEdge(v1,v4,v5);
    v4.appendEdge(v2,v3,v5,v6);
    v5.appendEdge(v3,v4);
    v6.appendEdge(v0,v4);

    //console.log(v0.getEdge[1].getWeight);
    //console.log(graph.getVertices[0].getEdge[1].getWeight);
    //console.log(v0.getIndex);
    //console.log(graph.getVertices[0].getIndex)
    //console.log(v0.getEdge[1].getNeighbor.getCoordinate);
    //console.log(graph.getVertices[0].getEdge[1].getNeighbor.getCoordinate);
    //console.log(v0.getEdge[1].getNeighbor.getDistance);
    //console.log(graph.getVertices[0].getEdge[1].getNeighbor.getDistance);

    return graph;
}