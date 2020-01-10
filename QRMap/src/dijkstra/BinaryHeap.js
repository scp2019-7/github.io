export default class BinaryHeap {

    constructor(){
        var self = this;
        self._ary  = [];
    }

    _build(){
        var self = this;
        /**
         * heapify
         * 3要素を比較し最も小さい要素を親とする
         * @param {array} ary
         * @param {int} i
         * @param {max} max
         */
        var heapify = function(ary, i, max){
            /**
             * swap
             * @param {array} ary
             * @param {int} x
             * @param {int} y
             */
            var swap = function(ary, x, y){
                var a = ary[x];
                var b = ary[y];
                ary[x] = b;
                ary[y] = a;
                return true;
            }
        
            var l = 2 * i + 1;
            var r = 2 * i + 2;
            var li = 0;
            if(l < max && ary[l].priority < ary[i].priority){
                li = l;
            }
            else{
                li = i;
            }
            if(r < max && ary[r].priority < ary[li].priority){
                li = r;
            }
            if(li !== i){
                swap(ary, i, li);
                heapify(ary, li, max);
            }
        }
        var ary = self._ary;
        for(var i = ary.length - 1; i >= 0; i--){
            heapify(ary, i, self._ary.length);
        }
    }

    /**
     * BinaryHeap::insert
     * @param {Object} elm
     * @param {int} priority
     */
    insert(elm, priority){
        var self = this;
        self._ary.push({
            "priority" : priority,
            "elm"      : elm
        });
        self._build();
    }

    /**
     * BinaryHeap::changePriority
     * @param {Object} elm
     * @param {int} priority
     */
    changePriority(elm, priority){
        var self = this;
        var ary  = self._ary;
        for(var i = 0; i < ary.length; i++){
            if(elm === ary[i]["elm"]){
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
    getPrior(){
        var self = this;
        var elm  = self._ary.shift();
        self._build();
        return elm["elm"];
    }

    /**
     * BinaryHeap::getList
     */
    getList(){
        var self = this;
        return self._ary;
    }

}