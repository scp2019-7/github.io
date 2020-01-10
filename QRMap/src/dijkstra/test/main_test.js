import genTestGraph from "/src/dijkstra/test/genTestGraph.js";
import dijkstra from "/src/dijkstra/dijkstra.js";

const graph = genTestGraph();
const shortsetPath = dijkstra(0,5,graph);