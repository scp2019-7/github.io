import genTestGraph from "./genTestGraph.js";
import dijkstra from "../dijkstra.js";

const graph = genTestGraph();
const shortestPath = dijkstra(0, 5, graph);
console.log('shortestPath: [' + shortestPath + ']');

for (let v of shortestPath)
  console.log(graph.getVertices[v].getCoordinates);