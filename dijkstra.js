
/**
 * BinaryHeap
 */

class BinaryHeap {

  constructor() {
    var self = this;
    self._ary = [];
  }

  _build() {
    var self = this;
    /**
     * heapify
     * 3要素を比較し最も小さい要素を親とする
     * @param {array} ary
     * @param {int} i
     * @param {max} max
     */
    var heapify = function (ary, i, max) {
      /**
       * swap
       * @param {array} ary
       * @param {int} x
       * @param {int} y
       */
      var swap = function (ary, x, y) {
        var a = ary[x];
        var b = ary[y];
        ary[x] = b;
        ary[y] = a;
        return true;
      }

      var l = 2 * i + 1;
      var r = 2 * i + 2;
      var li = 0;
      if (l < max && ary[l].priority < ary[i].priority) {
        li = l;
      }
      else {
        li = i;
      }
      if (r < max && ary[r].priority < ary[li].priority) {
        li = r;
      }
      if (li !== i) {
        swap(ary, i, li);
        heapify(ary, li, max);
      }
    }
    var ary = self._ary;
    for (var i = ary.length - 1; i >= 0; i--) {
      heapify(ary, i, self._ary.length);
    }
  }

  /**
   * BinaryHeap::insert
   * @param {Object} elm
   * @param {int} priority
   */
  insert(elm, priority) {
    var self = this;
    self._ary.push({
      "priority": priority,
      "elm": elm
    });
    self._build();
  }

  /**
   * BinaryHeap::changePriority
   * @param {Object} elm
   * @param {int} priority
   */
  changePriority(elm, priority) {
    var self = this;
    var ary = self._ary;
    for (var i = 0; i < ary.length; i++) {
      if (elm === ary[i]["elm"]) {
        ary[i]["priority"] = priority;
        self._build();
        return true;
      }
    }
    return false;
  }

  /**
   * BinaryHeap::getPrior
   */
  getPrior() {
    var self = this;
    var elm = self._ary.shift();
    self._build();
    return elm["elm"];
  }

  /**
   * BinaryHeap::getList
   */
  getList() {
    var self = this;
    return self._ary;
  }

}


/**
 * Vertex
 */
var Vertex = (function () {
  const index = Symbol();
  const x = Symbol();
  const y = Symbol();
  const z = Symbol();
  const theta = Symbol();
  const distance = Symbol();
  const edge = Symbol();

  class Vertex {
    constructor(xCoordinate, yCoordinate, zCoordinate, direction, graph) {
      this[index] = graph.getVertices.length;
      this[x] = xCoordinate;
      this[y] = yCoordinate;
      this[z] = zCoordinate;
      this[theta] = direction;
      this[distance] = Number.POSITIVE_INFINITY;
      this[edge] = [];
      graph.appendVertex(this);
    }

    // 隣接する全てのVertexを引数として渡すことにより
    // 隣接するVertex(neighbor)と，それぞれのVertexとの距離(weight)をリスト(edge)に追加するメソッド
    appendEdge() {
      for (var i = 0; i < arguments.length; i++) {
        this[edge].push(new Edge(arguments[i],
          ((this[x] - arguments[i].getCoordinates[0]) ** 2
            + (this[y] - arguments[i].getCoordinates[1]) ** 2
            + (this[z] - arguments[i].getCoordinates[2]) ** 2) ** 0.5));
      }
    }

    get getIndex() {
      return this[index];
    }

    get getCoordinates() {
      return [this[x], this[y], this[z], this[theta]];
    }

    get getDistance() {
      return this[distance];
    }

    get getEdge() {
      return this[edge];
    }

    set setDistance(d) {
      this[distance] = d;
    }
  }

  return Vertex;
})();


/**
 * Graph
 */
var Graph = (function () {
  const vertices = Symbol();

  class Graph {
    constructor() {
      this[vertices] = [];
    }

    // Vertexをリスト(Vertices)に追加するメソッド
    appendVertex(vertex) {
      this[vertices].push(vertex);
    }

    get getVertices() {
      return this[vertices];
    }
  }

  return Graph;
})();


/**
 * Edge
 */
var Edge = (function () {
  const neighbor = Symbol();
  const weight = Symbol();

  class Edge {
    constructor(n, w) {
      this[neighbor] = n;
      this[weight] = w;
    }

    get getNeighbor() {
      return this[neighbor];
    }

    get getWeight() {
      return this[weight];
    }
  }

  return Edge;
})();

/**
 * dijkatra
 */
var dijkstra = function (startIndex, goalIndex, graph) {
  // 初期化
  var N = graph.getVertices.length;
  var path = new Array(N); // 経路リスト
  var nonVisitedList = new Array(N); // 未探索リスト
  var priorityQueue = new BinaryHeap(); // スタートからの距離が短い順の優先度つきキュー

  // スタートのVertexについて，スタートからの距離を0に設定
  graph.getVertices[startIndex].setDistance = 0;

  for (var i = 0; i < N; i++) {
    path[i] = -1;
    nonVisitedList[i] = true;
    priorityQueue.insert(graph.getVertices[i], graph.getVertices[i].getDistance);
  }

  // 探索を行う
  while (priorityQueue.getList().length > 0) {
    // スタートからの距離が最も小さいVertexであるuを取得し，uをキューから削除する
    var u = priorityQueue.getPrior();

    for (var i = 0; i < u.getEdge.length; i++) {
      // uと隣接するVertexであるvを取得
      var v = u.getEdge[i].getNeighbor;

      // vが探索済みかどうかの判定
      if (nonVisitedList[v.getIndex]) {
        // uを経由したときのスタートからvまでの距離を計算
        var newDistance = u.getDistance + u.getEdge[i].getWeight;

        // uを経由する方がスタートからの距離が短くなる場合，キューと経路を更新する
        if (newDistance < v.getDistance) {
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
  var shortestPath = [goalIndex];

  for (var i = 0; shortestPath[i] !== startIndex; i++) {
    shortestPath.push(path[shortestPath[i]]);
  }

  console.log('path: [' + path + ']');
  console.log('shortestPath: [' + shortestPath + ']');

  return shortestPath;
}