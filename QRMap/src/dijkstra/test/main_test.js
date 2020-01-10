import genTestGraph from "./genTestGraph.js";
import dijkstra from "../dijkstra.js";

const graph = genTestGraph();
const shortsetPath = dijkstra(0,5,graph);