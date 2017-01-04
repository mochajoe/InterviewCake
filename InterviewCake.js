'use strict';

// helper func for array equality 
const areArraysEqual = (array1, array2) => {
  var areEqual = true;
  for (var i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      areEqual = false;
    }
  }
  return areEqual && array1.length === array2.length;
};

// helper func for object equality (test not compatible in all browsers)
const areObjectsEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

// time: O(n) | space: O(1)
const stockPricesYesterday = (arg) => {
  let smallest = Infinity;
  let largest = 0;
  let buy = false;
  let length = arg.length;
  arg.forEach((stock, index) => {
    if (stock < smallest && index !== length - 1) {
      smallest = stock;
      buy = true;
    } else if (stock > largest && buy) {
      largest = stock;
    }
  });
  return largest - smallest;
};
// time: O(n) | space: O(1)
const stockPricesYesterday2 = (arg) => {
  let minPrice = arg[0];
  let maxProfit = arg[1] - arg[0];
  for (let i = 1; i < arg.length; i++) {
    let currentPrice = arg[i];
    let potentialProfit = currentPrice - minPrice;
    maxProfit = Math.max(maxProfit, potentialProfit);
    minPrice = Math.min(minPrice, currentPrice);
  }
  return maxProfit;
};

console.assert(stockPricesYesterday([10, 7, 5, 8, 11, 9]) === 6, 'should equal 6');
console.assert(stockPricesYesterday([10, 9, 8, 7, 6, 5]) === -1, 'should equal -1');
console.assert(stockPricesYesterday2([10, 7, 5, 8, 11, 9]) === 6, 'should equal 6');
console.assert(stockPricesYesterday2([10, 9, 8, 7, 6, 5]) === -1, 'should equal -1');

// time: O(n^2) | space: O(n)
const getProductsOfAllIntsExceptAtIndex = (array) => {
  const result = [];
  array.forEach(num => {
    let product = 1;
    for (let i = 0; i < array.length; i++) {
      let current = array[i];
      if (current !== num) {
        product *= current;
      }
    }
    result.push(product);
    product = 1;
  });
  return result;
};
// time: O(n) | space: O(n)
const getProductsOfAllIntsExceptAtIndex2 = (array) => {
  if (array.length === 0) {
    return [];
  }
  const result = [];
  let productSoFar = 1;
  for (let i = 0; i < array.length; i++) {
    result[i] = productSoFar;
    productSoFar *= array[i];
  }
  productSoFar = 1;
  for (let i = array.length - 1; i >= 0; i--) {
    result[i] = productSoFar * result[i];
    productSoFar *= array[i];
  }
  return result;
};

console.assert(areArraysEqual(getProductsOfAllIntsExceptAtIndex([1, 7, 3, 4]), [84, 12, 28, 21]) === true, 'should equal true');
console.assert(areArraysEqual(getProductsOfAllIntsExceptAtIndex([1, 0, 3, 4]), [0, 12, 0, 0]) === true, 'should equal true');
console.assert(areArraysEqual(getProductsOfAllIntsExceptAtIndex2([1, 7, 3, 4]), [84, 12, 28, 21]) === true, 'should equal true');
console.assert(areArraysEqual(getProductsOfAllIntsExceptAtIndex2([1, 0, 3, 4]), [0, 12, 0, 0]) === true, 'should equal true');
console.assert(areArraysEqual(getProductsOfAllIntsExceptAtIndex2([2, 4, 10]), [40, 20, 8]) === true, 'should equal true');
console.assert(areArraysEqual(getProductsOfAllIntsExceptAtIndex2([1]), [1]) === true, 'should equal true');
console.assert(areArraysEqual(getProductsOfAllIntsExceptAtIndex2([]), []) === true, 'should equal true');

const highestProductOfThree = (array) => {

};
// console.assert(highestProductOfThree([1, 2, 3, 4]) === 24, 'should equal 24');
// console.assert(highestProductOfThree([1, 2, 3]) === 6, 'should equal 6');
// console.assert(highestProductOfThree([20, 1, 5, 16, 17, 8, 11, 9]) === 5440, 'should equal 5440');
// console.assert(highestProductOfThree([10, 1, 5, 20, 30, 8, 11, 80]) === 48000, 'should equal 5440');

const condenseMeetingTimes = (array) => {
  // sort array | O(n log n)
  array.sort((a, b) => { return a.startTime > b.startTime ? 1 : 0; });
  // create result object
  const result = [];
  // for each object in array | O(n)
  array.forEach((meeting) => {
    // check to see if start time is inbetween any elements start and end
    let flag = false;
    for (let i = 0; i < result.length; i++) {
      let sched = result[i];
      // if it is update end
      if (meeting.startTime >= sched.startTime && meeting.startTime <= sched.endTime) {
        // case for when second meeting starts later and ends sooner
        sched.endTime = Math.max(meeting.endTime, sched.endTime);
        flag = true;
        return;
      }
    }
    // else add to result object
    if (!flag) {
      result.push(meeting);
    }
  });
  return result;
};

const condenseMeetingTimes2 = (array) => {
  array.sort((a, b) => { return a.startTime > b.startTime ? 1 : 0; });
  const mergedMeetings = [array[0]];
  for (let i = 1; i < array.length; i++) {
    let currentMeeting = array[i];
    let lastMeeting = mergedMeetings[mergedMeetings.length - 1];
    if (currentMeeting.startTime <= lastMeeting.endTime) {
      lastMeeting.endTime = Math.max(lastMeeting.endTime, currentMeeting.endTime);
    } else {
      mergedMeetings.push(currentMeeting);
    }
  }
  return mergedMeetings;  
};

const meetings1 = [
  {startTime: 0, endTime: 1}, 
  {startTime: 3, endTime: 5}, 
  {startTime: 4, endTime: 8}, 
  {startTime: 10, endTime: 12}, 
  {startTime: 9, endTime: 10}
];
const meetings2 = [
  {startTime: 1, endTime: 10},
  {startTime: 2, endTime: 6},
  {startTime: 3, endTime: 5},
  {startTime: 7, endTime: 9}
];
const meetings3 = [
  {startTime: 1, endTime: 5}, 
  {startTime: 2, endTime: 3}
];
const meetings4 = [
  {startTime: 1, endTime: 2}, 
  {startTime: 2, endTime: 3}
];
const solution1 = [ 
  { startTime: 0, endTime: 1},
  { startTime: 3, endTime: 8},
  { startTime: 9, endTime: 12}
];
const solution2 = [ 
  { startTime: 1, endTime: 10}
];
const solution3 = [ 
  { startTime: 1, endTime: 5}
];
const solution4 = [ 
  { startTime: 1, endTime: 3}
];

console.assert(areObjectsEqual(condenseMeetingTimes2(meetings1), solution1), 'should be true for meetings1');
console.assert(areObjectsEqual(condenseMeetingTimes2(meetings2), solution2), 'should be true meetings2');
console.assert(areObjectsEqual(condenseMeetingTimes2(meetings3), solution3), 'should be true meetings3');
console.assert(areObjectsEqual(condenseMeetingTimes2(meetings4), solution4), 'should be true meetings4');

const coins = (amountLeft, denominations, currentIndex) => {
  currentIndex = currentIndex || 0;
  if (amountLeft === 0) {
    return 1;
  }
  if (amountLeft === 1) {
    return 0;
  }
  if (currentIndex === denominations.length) {
    return 0;
  }
  let currentCoin = denominations[currentIndex];
  let possibilities = 0;
  while (amountLeft >= 0) {
    possibilities += coins(amountLeft, denominations, currentIndex + 1);
    amountLeft -= currentCoin;
  }
  return possibilities;
};

const denominations = [1, 2, 3];
console.assert(coins(4, denominations) === 4, 'should equal true');

const intersectionRect = (rect1, rect2) => {
  let highestStartpoint = Math.max(rect1.leftX, rect2.leftX);
  let lowestEndpoint = Math.min(rect1.leftX + rect1.width, rect2.leftX + rect2.width);
  if (highestStartpoint >= lowestEndpoint) {
    return false;
  }
  let highestStartpointY = Math.max(rect1.bottomY, rect2.bottomY);
  let lowestEndpointY = Math.min(rect1.bottomY + rect1.height, rect2.bottomY + rect2.height);
  let width = lowestEndpoint - highestStartpoint;
  let height = lowestEndpointY - highestStartpointY;
  const intersection = {
    leftX: highestStartpoint,
    bottomY: highestStartpointY,
    width: width,
    height: height
  };
  return intersection;
};

const myRectangle = {
  leftX: 1,
  bottomY: 5,
  width: 10,
  height: 4,
};
const myRectangle2 = {
  leftX: 5,
  bottomY: 1,
  width: 3,
  height: 8,
};
const myRectangle3 = {
  leftX: 9,
  bottomY: 7,
  width: 6,
  height: 10,
};
const myRectangle4 = {
  leftX: 15,
  bottomY: 7,
  width: 4,
  height: 7,
};
console.assert(areObjectsEqual(intersectionRect(myRectangle, myRectangle2), { leftX: 5, bottomY: 5, width: 3, height: 4 }) === true, 'should be true');
console.assert(areObjectsEqual(intersectionRect(myRectangle, myRectangle3), { leftX: 9, bottomY: 7, width: 2, height: 2 }) === true, 'should be true');
console.assert(intersectionRect(myRectangle, myRectangle4) === false, 'should be false');
// time: O(1) | space: O(1)
// take away: although we use an array, it's bounded by a value that does not depend on the size of the input
class TempTracker {
  constructor() {
    this.temps = [];
    for (let i = 0; i <= 110; i++) {
      this.temps[i] = 0;
    }
    this.sum = 0;
    this.count = 0;
    this.min = Infinity;
    this.max = 0;
    this.modeCount = 0;
    this.mode;
    this.mean;
  }
  insert(temp) {
    this.temps[temp]++;
    this.sum += temp;
    this.count++;
    this.mean = this.sum / this.count;
    if (temp > this.max) {
      this.max = temp;
    }
    if (temp < this.min) {
      this.min = temp;
    }
    if (this.temps[temp] >= this.modeCount) {
      this.modeCount = this.temps[temp];
      this.mode = temp;
    }
  }
  getMax() {
    return this.max;
  }
  getMin() {
    return this.min;
  }
  getMean() {
    return this.mean;
  }
  getMode() {
    return this.mode;
  }
}
const temp = new TempTracker();
temp.insert(100);
temp.insert(100);
temp.insert(2);
temp.insert(2);
temp.insert(2);
temp.insert(3);
temp.insert(3);
temp.insert(3);
temp.insert(6);
temp.insert(1);
temp.insert(90);
temp.insert(78);
console.assert(temp.getMode() === 3, 'should equal 3');

class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  insertLeft(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
  }
  insertRight(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
  }
  superBalanced() {
    let depths = [];
    let nodes = [[this, 0]];
    while (nodes.length) {
      let nodePair = nodes.pop();
      let node = nodePair[0];
      let depth = nodePair[1];
      if (!node.left && !node.right) {
        if (!depths.includes(depth)) {
          depths.push(depth);
          if (depths.length > 2 || depths.length === 2 && Math.abs(depths[0] - depths[1]) > 1) {
            return false;
          }
        }
      } else {
        if (node.left) {
          nodes.push([node.left, depth + 1]);
        } 
        if (node.right) {
          nodes.push([node.right, depth + 1]);
        } 
      }
    }
    return true;
  }
  isValid() {
    let prev = -1;
    const stack = [this];
    let init = this.left;
    while (init) {
      stack.push(init);
      init = init.left;
    }
    while (stack.length) {
      let current = stack.pop();
      if (prev > current.value) {
        return false;
      }
      let temp = current.right;
      while (temp) {
        stack.push(temp);
        temp = temp.left;
      }
      prev = current.value;
    }
    return true;
  }
  inOrder(cb) {
    let node = this;
    if (node.left) {
      node.left.inOrder(cb);
    }
    cb(node);
    if (node.right) {
      node.right.inOrder(cb);
    }
  }
  preOrder(cb) {
    let node = this;
    cb(node);
    if (node.left) {
      node.left.preOrder(cb);
    }
    if (node.right) {
      node.right.preOrder(cb);
    }
  }
  postOrder(cb) {
    let node = this;
    if (node.left) {
      cb(node.left);
      node.left.postOrder(cb);
    }
    if (node.right) {
      cb(node.right);
      node.right.postOrder(cb);
    }
    // cb(node);
  }
}

const bstCheckerRecursive = (treeRoot, lowerBound, upperBound) => {
  lowerBound = lowerBound || Number.MIN_VALUE;
  upperBound = upperBound || Number.MAX_VALUE;
  if (!treeRoot) {
    return true;
  }
  if (treeRoot.value > upperBound || treeRoot.value < lowerBound) {
    return false;
  }
  return bstCheckerRecursive(treeRoot.left, lowerBound, treeRoot.value) && 
  bstCheckerRecursive(treeRoot.right, treeRoot.value, upperBound);
};

const binaryTree = new BinaryTreeNode(1);
binaryTree.insertLeft(2);
binaryTree.insertRight(3);
binaryTree.right.insertLeft(4);
binaryTree.right.insertRight(5);
binaryTree.right.right.insertLeft(6);
console.assert(binaryTree.superBalanced() === false, 'should be false');

const binaryTree2 = new BinaryTreeNode(7);
binaryTree2.insertLeft(5);
binaryTree2.insertRight(10);
binaryTree2.left.insertLeft(2);
binaryTree2.left.insertRight(6);
binaryTree2.right.insertLeft(8);
binaryTree2.right.insertRight(15);
console.assert(bstCheckerRecursive(binaryTree2) === true, 'shoud be true');

const binaryTree3 = new BinaryTreeNode(20);
binaryTree3.insertLeft(10);
binaryTree3.insertRight(30);
binaryTree3.left.insertLeft(6);
binaryTree3.left.insertRight(15);
binaryTree3.right.insertRight(35);
binaryTree3.right.insertLeft(25);

const binaryTree5 = new BinaryTreeNode(2);
binaryTree5.insertLeft(1);
binaryTree5.insertRight(3);
console.assert(bstCheckerRecursive(binaryTree5) === true, 'shoud be true');

const binaryTree4 = new BinaryTreeNode(5);
binaryTree4.insertLeft(3);
binaryTree4.insertRight(8);
binaryTree4.left.insertLeft(1);
binaryTree4.left.insertRight(4);
binaryTree4.right.insertRight(12);
binaryTree4.right.insertLeft(7);
binaryTree4.right.right.insertLeft(10);
binaryTree4.right.right.left.insertLeft(9);
binaryTree4.right.right.left.insertRight(11);

const findLargest = (treeNode) => {
  if (!treeNode) {
    throw new Error('Tree must have at least one node');
  }
  let node = treeNode;
  while (node.right) {
    node = node.right;
  }
  return node.value;
};
const findSecondLargest = (treeNode) => {
  if (!treeNode || !treeNode.left && !treeNode.right) {
    throw new Error('Tree must have at least two nodes');
  }
  let node = treeNode;
  while (node) {
    if (node.left && !node.right) {
      return findLargest(node.left);
    }
    if (node.right && !node.right.left && !node.right.right) {
      return node.value;
    }
    node = node.right;
  }
};
console.assert(findSecondLargest(binaryTree4) === 11, 'should be true');
console.assert(findSecondLargest(binaryTree3) === 30, 'should be true');

class Trie {
  constructor() {
    this.rootNode = {};
  }
  checkPresentAndAdd(word) {
    let currentNode = this.rootNode;
    let isNewWord = false;
    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      if (!currentNode.hasOwnProperty(char)) {
        isNewWord = true;
        currentNode[char] = {};
      }
      currentNode = currentNode[char];
    }
    if (!currentNode.hasOwnProperty('*')) {
      isNewWord = true;
      currentNode['*'] = {};
    }
    return isNewWord;
  }
  isPrefix(prefix, word) {
    let currentNode = this.rootNode;
    let count = 0;
    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      if (!currentNode.hasOwnProperty(char)) {
        return false;
      }
      currentNode = currentNode[char];
      if (char === prefix[count]) {
        count++;
      }
      if (count === prefix.length) {
        return true;
      }
    }
    return false;
  }
}
const prefixTree = new Trie();
console.assert(prefixTree.checkPresentAndAdd('julius') === true, 'should be true');
console.assert(prefixTree.checkPresentAndAdd('julius') === false, 'should be false');
console.assert(prefixTree.checkPresentAndAdd('captivating') === true, 'should be true');
console.assert(prefixTree.isPrefix('capti', 'captivating') === true, 'should be true');
console.assert(prefixTree.isPrefix('captive', 'captivating') === false, 'should be false');
console.assert(prefixTree.isPrefix('juliusbuckley', 'julius') === false, 'should be false');

const findTargetinAscendingArray = (target, array) => {
  let count = 0;
  let min = 0;
  let max = array.length - 1;
  while (min <= max) {
    let mid = Math.floor((max + min) / 2);
    let midValue = array[mid];
    if (target === midValue) {
      return mid;
    }
    if (target < midValue) {
      max = mid - 1;
    }
    if (target > midValue) {
      min = mid + 1;
    }
  }
  return undefined;
};
const array = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12];
console.assert(findTargetinAscendingArray(9, array) === undefined, 'should be undefined');
console.assert(findTargetinAscendingArray(7, array) === 6, 'should be 6');

const findRotationPoint = (array) => {
  const firstWord = array[0];
  let min = 0;
  let max = array.length - 1;
  while (min < max) {
    let mid = Math.floor((max + min) / 2);
    if (array[mid] > firstWord) {
      min = mid;
    } else {
      max = mid;
    }
    if (min + 1 === max) {
      break;
    }
  }
  return max;
};
const words = [
  'ptolemaic',
  'retrograde',
  'supplant',
  'undulate',
  'xenoepist',
  'asymptote',
  'babka',
  'banoffee',
  'engender',
  'karpatka',
  'othellolagkage',
];
console.assert(findRotationPoint(words) === 5, 'should be 5');

const selectMovies = (flightLength, movies) => {
  const hash = {};
  for (let i = 0; i < movies.length; i++) {
    let firstMovie = movies[i];
    let matchingMovie = flightLength - firstMovie;
    if (hash.hasOwnProperty(matchingMovie)) {
      return true;
    }
    if (!hash.hasOwnProperty(firstMovie)) {
      hash[firstMovie] = firstMovie;
    }
  }
  return false;
};
const movies = [130, 50, 90, 95, 70, 61, 120, 76, 35, 79, 23, 107];
console.assert(selectMovies(157, movies) === true, 'should be true');

class Fib {
  constructor() {
    this.memo = {};
  }
  getFib(num) {
    if (num < 0) {
      throw new Error('Fib must be postive');
    }
    if (num === 0 || num === 1) {
      return num;
    }
    if (this.memo.hasOwnProperty(num)) {
      return this.memo[num];
    }
    let result = this.getFib(num - 1) + this.getFib(num - 2);
    this.memo[num] = result;
    return result;
  }
}
const fib = (num) => {
  if (num < 0) {
    throw new Error('Fib must be positive');
  } else if (num === 0 || num === 1) {
    return num;
  }
  let prev = 1;
  let prevPrev = 0;
  let current;
  for (let i = 1; i < num; i++) {
    current = prev + prevPrev;
    prevPrev = prev;
    prev = current;
  }
  return current;
};
const fibMemo = new Fib();
let nums = [0, 1, 2, 3, 4];
console.assert(fibMemo.getFib(8) === 21, 'should be 21');
console.assert(fibMemo.getFib(6) === 8, 'should be 8');
console.assert(fibMemo.getFib(5) === 5, 'should be 5');
console.assert(fibMemo.getFib(3) === 2, 'should be 2');
console.assert(fib(8) === 21, 'should be 21');
console.assert(fib(6) === 8, 'should be 8');
console.assert(fib(5) === 5, 'should be 5');
console.assert(fib(3) === 2, 'should be 2');

const maxDuffleBagValue = (cakes, weight, totalCount, totalWeight) => {
  totalCount = totalCount || 0;
  totalWeight = totalWeight || 0;
  console.log('totalCount', totalCount);
  console.log('totalWeight', totalWeight);
  if (totalCount === weight) {
    return totalCount;
  }
  for (let i = 0; i < cakes.length; i++) {
    if (totalWeight + cakes[i].weight < weight) {
      totalWeight += cakes[i].weight;
      totalCount += cakes[i].value;
      maxDuffleBagValue(cakes, weight, totalCount, totalWeight);
    }
  }
};
const cakeTypes = [
  {weight: 7, value: 160},
  {weight: 3, value: 90},
  {weight: 2, value: 15},
];
// console.log(maxDuffleBagValue(cakeTypes, 20)); //555

class Stack {
  constructor() {
    this._storage = {};
    this._size = 0;
  }
  push(val) {
    this._storage[this._size++] = val;
  }
  pop() {
    this.size() && this._size--;
    let temp = this._storage[this._size];
    delete this._storage[this._size];
    return temp;
  }
  peek() {
    let size = this._size - 1;
    return this._storage[size];
  }
  size() {
    return this._size;
  }
}
class Queue {
  constructor() {
    this.inbox = new Stack();
    this.outbox = new Stack();
  }
  enqueue(val) {
    this.inbox.push(val);
  }
  dequeue() {
    if (this.outbox._size === 0) {
      while (this.inbox._size) {
        let temp = this.inbox.pop();
        this.outbox.push(temp);
      }
    } 
    return this.outbox.pop();
  }
}
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);
console.assert(queue.dequeue() === 1, 'should return 1');
queue.enqueue(6);
queue.enqueue(7);
queue.enqueue(8);
queue.enqueue(9);
console.assert(queue.dequeue() === 2, 'should return 2');
console.assert(queue.dequeue() === 3, 'should return 3');
console.assert(queue.dequeue() === 4, 'should return 4');
console.assert(queue.dequeue() === 5, 'should return 5');
console.assert(queue.dequeue() === 6, 'should return 5');

const uniqueInteger = array => {
  let uniqueId = 0;
  array.forEach(id => uniqueId ^= id);
  return uniqueId;
};
let ids = [120, 105, 987, 555, 281, 505, 105, 987, 879, 505, 555, 281, 120];
console.assert(uniqueInteger(ids) === 879, 'should be 879');

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  addToTail(value) {
    let node = this.createNode(value);
    if (!this.head) {
      this.head = this.tail = node;
    }
    this.tail.next = node;
    this.tail = node;
  }
  createNode(value) {
    return { value: value, next: null };
  }
  forEach(cb) {
    let currentNode = this.head;
    while (currentNode) {
      cb(currentNode.value);
      currentNode = currentNode.next;
    }
  }
  removeNode(target) {
    let current = this.head;
    let runner = this.head.next;
    if (current.value === target) {
      let temp = current.value;
      this.head = this.head.next;
      return temp;
    }
    while (runner) {
      if (runner.value === target) {
        let temp = runner.value;
        current.next = runner.next;
        return temp;
      }
      current = current.next;
      runner = runner.next;
    }
    return -1;
  }
}
const linkedList = new LinkedList();
linkedList.addToTail('A');
linkedList.addToTail('B');
linkedList.addToTail('C');
linkedList.addToTail('D');
console.assert(linkedList.removeNode('A') === 'A', 'should return A');
// linkedList.forEach(node => console.log(node));

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
const a = new LinkedListNode('A');
const b = new LinkedListNode('B');
const c = new LinkedListNode('C');
const d = new LinkedListNode('D');
const e = new LinkedListNode('E');
const f = new LinkedListNode('F');
a.next = b;
b.next = c;
c.next = d;

const deleteNode = deleteNode => {
  let nextNode = deleteNode.next;
  if (nextNode) {
    deleteNode.value = nextNode.value;
    deleteNode.next = nextNode.next;
  } else { 
    throw new Error('Cannot delete last node');
  }
};

a.next = b;
b.next = c;
c.next = b;
d.next = e;
e.next = f;
const containsCycle = head => {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    if (fast.value === slow.value) {
      return true;
    }
    slow = slow.next;
    fast = fast.next.next;
  }
  return false;
};
console.assert(containsCycle(a) === true, 'should return true');

a.next = b;
b.next = c;
c.next = d;
d.next = e;
e.next = f;
const reverse = head => {
  let current = head;
  let prev = null;
  let nextNode = null;
  while (current) {
    nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }
  return prev;
};

let a1 = new LinkedListNode('Angel Food');
let b1 = new LinkedListNode('Bundt');
let c1 = new LinkedListNode('Cheese');
let d1 = new LinkedListNode('Devil\'s Food');
let e1 = new LinkedListNode('Eccles');
a1.next = b1;
b1.next = c1;
c1.next = d1;
d1.next = e1;
const kthToTheLast = (k, head) => {
  if (k < 1) {
    throw new Error('Cannot find k of less than first to last node');
  }
  let slow = head;
  let fast = head;
  let count = 0;
  let flag = false;
  let kth = undefined;
  while (fast) {
    if (count === k) {
      slow = slow.next;
      flag = true;
    }
    fast = fast.next;
    if (flag) {
      kth = slow;
      slow = slow.next;
    }
    count++;
  }
  return kth === undefined ? kth : kth.value;
};
console.assert(kthToTheLast(2, a1) === 'Devil\'s Food', 'should return Devil\'s Food');
console.assert(kthToTheLast(5, a1) === undefined, 'should return Devil\'s Food');

const reverseStringInPlace = string => {
  let str = string.split('');
  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    let temp = str[i];
    str[i] = str[str.length - 1 - i];
    str[str.length - 1 - i] = temp;
  }
  return str.join('');
};
console.assert(reverseStringInPlace('cat') === 'tac', 'should return tac');
console.assert(reverseStringInPlace('julius') === 'suiluj', 'should return suiluj');

const reverseWordsInPlace = string => {
  let str = string.split(' ');
  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    let temp = str[i];
    str[i] = str[str.length - 1 - i];
    str[str.length - 1 - i] = temp;
  }
  return str.join(' ');
};
let message = 'find you will pain only go you recordings security the into if';
let outputMessage = 'if into the security recordings you go only pain will you find';
console.assert(reverseWordsInPlace(message) === outputMessage, 'should return output');

const closingParenStack = (index, string) => {
  const stack = [];
  for (let i = 0; i < string.length; i++) {
    let char = string[i];
    if (char === '(') {
      stack.push([char, i]);
    } else if (char === ')') {
      let removed = stack.pop();
      if (removed[1] === index) {
        return i;
      }
    }
  }
  return undefined;
};
const closingParen = (index, string) => {
  let openParen = 0;
  for (let i = index + 1; i < string.length; i++) {
    let char = string[i];
    if (char === '(') {
      openParen += 1;
    } else if (char === ')') {
      if (openParen === 0) {
        return i;
      } else {
        openParen -= 1;
      }
    }
  }
  return undefined;
};
let inputString = 'Sometimes (when I nest them (my parentheticals) too much (like this (and this))) they get confusing.';
console.assert(closingParen(10, inputString) === 79, 'should return 79');