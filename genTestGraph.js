function genTestGraph() {
  // Graphを生成
  let graph = new Graph();

  // Vertexを定義し，Graphに追加（定義された順にインデックス付けされる）
  let v0  = new Vertex(0.500833333, 0.8088125, 1, 0, graph);
  let v1  = new Vertex(0.056388889, 0.745875,  1, 0, graph);
  let v2  = new Vertex(0.056388889, 0.2465625, 1, 0, graph);
  let v3  = new Vertex(0.348055556, 0.1494375, 1, 0, graph);
  let v4  = new Vertex(0.652388889, 0.1494375, 1, 0, graph);
  let v5  = new Vertex(0.418,       0.8088125, 1, 0, graph);
  let v6  = new Vertex(0.584166667, 0.8088125, 1, 0, graph);
  let v7  = new Vertex(0.348055556, 0.4494375, 1, 0, graph);
  let v8  = new Vertex(0.653611111, 0.4494375, 1, 0, graph);
  let v9  = new Vertex(0.125833333, 0.745875,  1, 0, graph);
  let v10 = new Vertex(0.875833333, 0.7306875, 1, 0, graph);
  let v11 = new Vertex(0.125833333, 0.2465625, 1, 0, graph);
  let v12 = new Vertex(0.875833333, 0.2619375, 1, 0, graph);
  let v13 = new Vertex(0.437444444, 0.2040625, 1, 0, graph);
  let v14 = new Vertex(0.567277778, 0.2040625, 1, 0, graph);
  let v15 = new Vertex(0.544944444, 0.1475   , 1, 0, graph);
  let v16 = new Vertex(0.125833333, 0.8088125, 1, 0, graph);
  let v17 = new Vertex(0.875833333, 0.8088125, 1, 0, graph);
  let v18 = new Vertex(0.125833333, 0.214625 , 1, 0, graph);
  let v19 = new Vertex(0.875833333, 0.214625,  1, 0, graph);
  let v20 = new Vertex(0.348055556, 0.8088125, 1, 0, graph);
  let v21 = new Vertex(0.653611111, 0.8088125, 1, 0, graph);
  let v22 = new Vertex(0.348055556, 0.2150625, 1, 0, graph);
  let v23 = new Vertex(0.653611111, 0.2150625, 1, 0, graph);
  let v24 = new Vertex(0.418,       0.8088125, 2, 0, graph);
  let v25 = new Vertex(0.584166667, 0.8088125, 2, 0, graph);
  let v26 = new Vertex(0.348055556, 0.4494375, 2, 0, graph);
  let v27 = new Vertex(0.653611111, 0.4494375, 2, 0, graph);
  let v28 = new Vertex(0.125833333, 0.73075,   2, 0, graph);
  let v29 = new Vertex(0.875833333, 0.73075,   2, 0, graph);
  let v30 = new Vertex(0.125833333, 0.262,     2, 0, graph);
  let v31 = new Vertex(0.875833333, 0.262,     2, 0, graph);
  let v32 = new Vertex(0.437444444, 0.2040625, 2, 0, graph);
  let v33 = new Vertex(0.567277778, 0.2040625, 2, 0, graph);
  let v34 = new Vertex(0.544944444, 0.1475,    2, 0, graph);
  let v35 = new Vertex(0.125833333, 0.8088125, 2, 0, graph);
  let v36 = new Vertex(0.875833333, 0.8088125, 2, 0, graph);
  let v37 = new Vertex(0.125833333, 0.214625,  2, 0, graph);
  let v38 = new Vertex(0.875833333, 0.214625,  2, 0, graph);
  let v39 = new Vertex(0.348055556, 0.8088125, 2, 0, graph);
  let v40 = new Vertex(0.653611111, 0.8088125, 2, 0, graph);
  let v41 = new Vertex(0.348055556, 0.2150625, 2, 0, graph);
  let v42 = new Vertex(0.653611111, 0.2150625, 2, 0, graph);
  let v43 = new Vertex(0.125833333, 0.533,     2, 0, graph);
  let v44 = new Vertex(0.491611111, 0.1598125, 1, 0, graph);

  // Edgeを定義し，Vertexに追加
  v0.appendEdge(v5, v6);
  v1.appendEdge(v9);
  v2.appendEdge(v11);
  v3.appendEdge(v22);
  v4.appendEdge(v23);
  v5.appendEdge(v0, v20, v24);
  v6.appendEdge(v0, v21, v25);
  v7.appendEdge(v20, v22, v26);
  v8.appendEdge(v21, v23, v27);
  v9.appendEdge(v1, v11, v16, v28);
  v10.appendEdge(v12, v17, v29);
  v11.appendEdge(v2, v9, v18, v30);
  v12.appendEdge(v10, v19, v31);
  v13.appendEdge(v22, v32, v44);
  v14.appendEdge(v15, v23, v33);
  v15.appendEdge(v14, v34, v44);
  v16.appendEdge(v9, v20);
  v17.appendEdge(v10, v21);
  v18.appendEdge(v11, v22);
  v19.appendEdge(v12, v23);
  v20.appendEdge(v5, v7, v16);
  v21.appendEdge(v6, v8, v17);
  v22.appendEdge(v3, v7, v13, v18);
  v23.appendEdge(v4, v8, v14, v19);
  v24.appendEdge(v5, v25, v39);
  v25.appendEdge(v6, v24, v40);
  v26.appendEdge(v7, v39, v41);
  v27.appendEdge(v8, v40, v42);
  v28.appendEdge(v9, v35, v43);
  v29.appendEdge(v10, v31, v36);
  v30.appendEdge(v11, v37, v43);
  v31.appendEdge(v12, v29, v38);
  v32.appendEdge(v13, v41);
  v33.appendEdge(v14, v34, v42);
  v34.appendEdge(v15, v33);
  v35.appendEdge(v28, v39);
  v36.appendEdge(v29, v40);
  v37.appendEdge(v30, v41);
  v38.appendEdge(v31, v42);
  v39.appendEdge(v24, v26, v35);
  v40.appendEdge(v25, v27, v36);
  v41.appendEdge(v26, v32, v37);
  v42.appendEdge(v27, v33, v38);
  v43.appendEdge(v28, v30);
  v44.appendEdge(v13, v15);

  //console.log(v0.getEdge[1].getWeight);
  //console.log(graph.getVertices[0].getEdge[1].getWeight);
  //console.log(v0.getIndex);
  //console.log(graph.getVertices[0].getIndex)
  //console.log(v0.getEdge[1].getNeighbor.getCoordinates);
  //console.log(graph.getVertices[0].getEdge[1].getNeighbor.getCoordinates);
  //console.log(v0.getEdge[1].getNeighbor.getDistance);
  //console.log(graph.getVertices[0].getEdge[1].getNeighbor.getDistance);

  return graph;
}