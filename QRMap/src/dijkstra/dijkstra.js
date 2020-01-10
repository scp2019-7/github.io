import BinaryHeap from "./src/dijkstra/BinaryHeap.js";
import Edge from "./src/dijkstra/Edge.js";
import Graph from "./src/dijkstra/Graph.js";
import Vertex from "./src/dijkstra/Vertex.js";

// 入力
// startIndex：探索の始点となるVertexクラスのindex
//  goalIndex：探索の終点となるVertexクラスのindex
//      graph：Graphクラス

// 出力
// shortestPath：終点から始点に向けて最短経路をたどるときに通るVertexのindex

export default function dijkstra(startIndex,goalIndex,graph){
    // 初期化
    let N              = graph.getVertices.length;
    let path           = new Array(N); // 経路リスト
    let nonVisitedList = new Array(N); // 未探索リスト
    let priorityQueue  = new BinaryHeap(); // スタートからの距離が短い順の優先度つきキュー

    // スタートのVertexについて，スタートからの距離を0に設定
    graph.getVertices[startIndex].setDistance = 0;

    for(var i = 0; i < N; i++){
        path[i] = -1;
        nonVisitedList[i] = true;
        priorityQueue.insert(graph.getVertices[i], graph.getVertices[i].getDistance);
    }

    // 探索を行う
    while(priorityQueue.getList().length > 0){
        // スタートからの距離が最も小さいVertexであるuを取得し，uをキューから削除する
        let u = priorityQueue.getPrior();

        for(var i = 0; i < u.getEdge.length; i++){
            // uと隣接するVertexであるvを取得
            let v = u.getEdge[i].getNeighbor;

            // vが探索済みかどうかの判定
            if(nonVisitedList[v.getIndex]){
                // uを経由するときのスタートからvまでの距離を計算
                let newDistance = u.getDistance + u.getEdge[i].getWeight;

                // uを経由する方がスタートからの距離が短くなる場合，キューと経路を更新する
                if(newDistance < v.getDistance){
                    priorityQueue.changePriority(v, newDistance);
                    v.setDistance = newDistance;
                    path[v.getIndex] = u.getIndex;
                }
            }
        }

        // uを探索済みに変更 
        nonVisitedList[u.getIndex] = false;
    }

    // 最短経路をたどるのに必要なインデックス(shortestPath)をpathから取り出す
    let shortestPath = [goalIndex];

    for(var i=0; shortestPath[i] !== startIndex; i++){
        shortestPath.push(path[shortestPath[i]]);
    }

    console.log('path: [' + path + ']');
    console.log('shortestPath: [' + shortestPath + ']');

    return shortestPath;
}