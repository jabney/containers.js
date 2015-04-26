// containers.js MIT License © 2015 James Abney http://github.com/jabney
(function(ex, undefined) {
'use strict';

// Export containers namespace.
var containers = ex.containers || (ex.containers = Object.create(null));

// containers.js version.
containers.version = '0.1.1';

// Shortcuts.

var
toString = Object.prototype.toString,
slice = Array.prototype.slice,

// Helpers.

// Return an object's built-in type via toString.
typeOf = function typeOf(obj) {
  return toString.call(obj).slice(8, -1);
},

// Encode an object's type as a number.
encodeType = (function() {
  var types = {
    'Null':      1,
    'Undefined': 2,
    'Number':    3,
    'Array':     4,
    'String':    5,
    'Object':    6,
    'Boolean':   7,
    'Function':  8,
    'Symbol':    9,
    'Date':      10,
    'Error':     11,
    'RegExp':    12,
    'Arguments': 13,
    'Math':      14,
    'JSON':      15
  };

  // Return a type code.
  function get(type) {
    // Return 0 for undefined types.
    return types[type] || 0;
  }

  // Return a numeric code corresponding to an object's type.
  return function encodeType(obj) {
    return get(typeOf(obj));
  }
})();

// ---------------------------------------------------------------
// Extend a container with properties in an object literal.
// ---------------------------------------------------------------
containers.extend = function extend(name, extendObj) {
  containers[name] = (function(ctr) {
    // This function will replace the one assigned to containers[name].
    return function extended() {
      var sourceObj = ctr(), k;
      for (k in extendObj) {
        if (extendObj.hasOwnProperty(k)) {
          sourceObj[k] = extendObj[k];
        }
      }
      return sourceObj;
    };
  })(containers[name]);
};

// ---------------------------------------------------------------
// Deque implementation used by containers bag, stack and queue.
// ---------------------------------------------------------------
containers.dequeImpl = 'dequeList';

// ---------------------------------------------------------------
// Deque - a double-ended queue (pronounced "deck").
// Return the specified implementation.
// ---------------------------------------------------------------
containers.deque = function deque() {
  var impl = containers[containers.dequeImpl];
  return impl();
};


// ---------------------------------------------------------------
// Deque - linked list implementation.
// ---------------------------------------------------------------
containers.dequeList = function dequeList() {
  var head = null, tail = null, size = 0;

  return {

  // Get or set an array of items for this queue.
  items: function(items) {
    if (!arguments.length)
      return getItems(this.forwardIterator);
    this.clear();
    items.forEach(function(item) {
      this.pushBack(item);
    }, this);
    return this;
  },

  // Add one or more items to the front of the queue. O(k)
  pushFront: function() {
    slice.call(arguments, 0).forEach(function(item) {
      if (size === 0) {
        head = tail = new Node(item, null, null);
      } else {
        head.prev = new Node(item, null, head);
        head = head.prev;
      }
      ++size;
    });
    return this;
  },

  // Add one or more items to the back of the queue. O(k)
  pushBack: function() {
    slice.call(arguments, 0).forEach(function(item) {
      if (size === 0) {
        head = tail = new Node(item, null, null);
      } else {
        tail.next = new Node(item, tail, null);
        tail = tail.next;
      }
      ++size;
    });
    return this;
  },

  // Remove an item from the front of the queue. O(1)
  popFront: function() {
    var node = head, tempNode;
    if (head !== null) {
      if (head === tail) {
        head = tail = null;
      } else {
        tempNode = head;
        head = head.next;
        tempNode.next = null;
      }
      --size;
    }
    return node && node.item;
  },

  // Remove an item from the back of the queue. O(1)
  popBack: function() {
    var node = tail, tempNode;
    if (tail !== null) {
      if (head === tail) {
        head = tail = null;
      } else {
        tempNode = tail;
        tail = tail.prev;
        tempNode.prev = null;
      }
      --size;
    }
    return node && node.item;
  },

  // Return the front item without modifying the queue. O(1)
  peekFront: function() {
    return head && head.item;
  },

  // Return the back item without modifying the queue. O(1)
  peekBack: function() {
    return tail && tail.item;
  },

  // Remove one or more items from the queue. O(kn)
  remove: function() {
    slice.call(arguments, 0).forEach(function(item) {
      removeNode(item);
    });
    return this;
  },

  // Remove all items from the queue. O(1)
  clear: function() {
    head = tail = null;
    size = 0;
    return this;
  },

  // Return a copy of this queue.
  copy: function() {
    return dequeList().items(this.items());
  },

  // Iterate the queue from front to back. O(n)
  forwardIterator: function(action, context) {
    var node = head;
    while (node !== null) {
      action.call(context, node.item);
      node = node.next;
    }
    return this;
  },

  // Iterate the queue from back to front. O(n)
  reverseIterator: function(action, context) {
    var node = tail;
    while (node !== null) {
      action.call(context, node.item);
      node = node.prev;
    }
    return this;
  },

  // Return true if the deque contains 'item'. O(n)
  has: function(item) {
    return !!find(item);
  },

  // Return the number of items in the queue. O(1)
  size: function() {
    return size;
  }};

  // Return the node that contains 'item'. O(n)
  function find(item) {
    var node = head;
    while (node !== null) {
      if (node.item === item)
        return node;
      node = node.next;
    }
    return null;
  }

  // Build an array of items from the supplied iterator. O(n)
  function getItems(iterator) {
    var items = [];
    iterator(function(item) {
      items.push(item);
    });
    return items;
  }

  // Remove a single node from the queue. O(n)
  function removeNode(item) {
    var node, tempNode;
    if ((node = find(item)) !== null) {
      if (node === head) {
        tempNode = head;
        head = head.next;
        if (head) {
          head.prev = null;
          tempNode.next = null;  
          
        }
      }
      else if (node === tail) {
        tempNode = tail;
        tail = tail.prev;
        if (tail) {
          tail.next = null;
          tempNode.prev = null;
        }
      }
      else {
        tempNode = node;
        node.prev.next = node.next;
        node.next.prev = node.prev;
        tempNode.prev = tempNode.next = null;
      }
      --size;
    }
  }

  // Return a linked node.
  function Node(item, prev, next) {
    this.item = item;
    this.prev = prev || null;
    this.next = next || null;
  }
};

// ---------------------------------------------------------------
// Deque - array implementation.
// ---------------------------------------------------------------
containers.dequeArray = function dequeArray() {
  var array = [];

  return {

  // Get or set an array of items for this queue.
  items: function(items) {
    if (!arguments.length)
      return array.slice(0, array.length);
    array = items.slice(0, items.length);
    return this;
  },

  // Add one or more items to the front of the queue.
  pushFront: function() {
    var args = slice.call(arguments, 0).reverse();
    array.unshift.apply(array, args);
    return this;
  },

  // Add one or more items to the back of the queue.
  pushBack: function() {
    array.push.apply(array, arguments);
    return this;
  },

  // Remove an item from the front of the queue.
  popFront: function() {
    var item = array.shift();
    return item !== undefined ? item : null;
  },

  // Remove an item from the back of the queue.
  popBack: function() {
    var item = array.pop();
    return item !== undefined ? item : null;
  },

  // Return the front item without modifying the queue.
  peekFront: function() {
    var item = array[0];
    return item !== undefined ? item : null;
  },

  // Return the back item without modifying the queue.
  peekBack: function() {
    var item = array[array.length-1];
    return item !== undefined ? item : null;
  },

  // Remove one or more items from the queue.
  remove: function() {
    slice.call(arguments, 0).forEach(function(item) {
      var index = array.indexOf(item);
      if (index >= 0)
        array.splice(index, 1);
    });
    return this;
  },

  // Remove all items from the queue.
  clear: function() {
    array = [];
    return this;
  },

  // Return a copy of this queue.
  copy: function() {
    return dequeArray().items(this.items());
  },

  // Iterate the queue from front to back.
  forwardIterator: function(action, context) {
    if (action)
      array.forEach(action, context);
    return this;
  },

  // Iterate the queue from back to front.
  reverseIterator: function(action, context) {
    if (action)
      array.reverse().forEach(action, context);
    return this;
  },

  // Return true if the deque contains 'item'.
  has: function(item) {
    return array.indexOf(item) >= 0;
  },

  // Return the number of items in the queue.
  size: function() {
    return array.length;
  }};
};

// ---------------------------------------------------------------
// Bag - an unordered collection of items.
// ---------------------------------------------------------------
containers.bag = function bag() {
  var deque = containers.deque();

  return {

  // Set or get an array of items for this bag.
  items: function(items) {
    if (!arguments.length)
      return deque.items();
    deque.clear();
    items.forEach(function(item) {
      this.add(item);
    }, this);
    return this;
  },

  // Add one or more items to the bag.
  add: function() {
    deque.pushBack.apply(deque, arguments);
    return this;
  },

  // Remove one or more items from the bag. O(kn)
  remove: function() {
    deque.remove.apply(deque, arguments);
    return this;
  },

  // Return a copy of this bag.
  copy: function() {
    return bag().items(deque.items());
  },

  // Iterate over items in the bag.
  each: function(action, context) {
    deque.forwardIterator(action, context);
    return this;
  },

  // Clear the contents of this bag.
  clear: function() {
    deque.clear();
    return this;
  },

  // Return true if bag contains item.
  has: deque.has,

  // Return the count of items in the bag.
  size: deque.size

  };
};

// ---------------------------------------------------------------
// Stack - a push-down LIFO stack (last in first out).
// ---------------------------------------------------------------
containers.stack = function stack() {
  var deque = containers.deque();

  return {

  // Set or get an array of items for this stack.
  items: function(items) {
    if (!arguments.length)
      return deque.items().reverse();
    deque.clear();
    items.forEach(function(item) {
      deque.pushBack(item);
    }, this);
    return this;
  },

  // Push one or more items onto the stack.
  push: function() {
    deque.pushBack.apply(deque, arguments);
    return this;
  },

  // Pop an item off of the stack.
  pop: deque.popBack,

  // Return the top item without modifying the stack.
  peek: deque.peekBack,

  // Return a copy of this stack.
  copy: function() {
    return stack().items(deque.items());
  },

  // Remove all items from the stack.
  clear: function() {
    deque.clear();
    return this;
  },

  // Iterate over items on the stack.
  each: function(action, context) {
    deque.reverseIterator(action, context);
    return this;
  },

  // Return the count of items on the stack.
  size: deque.size

  };
};

// ---------------------------------------------------------------
// Queue - a FIFO queue (first in first out).
// ---------------------------------------------------------------
containers.queue = function queue() {
  var deque = containers.deque();

  return {

  // Set or get an array of items for this queue.
  items: function(items) {
    if (!arguments.length)
      return deque.items();
    deque.clear();
    items.forEach(function(item) {
      deque.pushBack(item);
    });
    return this;
  },

  // Add one or more items to the queue.
  enq: function() {
    deque.pushBack.apply(deque, arguments);
    return this;
  },

  // Remove an item from the front of the queue.
  deq: deque.popFront,

  // Return the front item without modifying the queue.
  peek: deque.peekFront,

  // Return a copy of this queue.
  copy: function() {
    return queue().items(deque.items())
  },

  // Remove all items from the queue.
  clear: function() {
    deque.clear();
    return this;
  },

  // Iterate over items in the queue.
  each: function(action, context) {
    deque.forwardIterator(action, context);
    return this;
  },

  // Return the count of items in the queue.
  size: deque.size

  };
};

// ---------------------------------------------------------------
// Priority queue - priority item first container.
// ---------------------------------------------------------------
containers.priorityQueue = function priorityQueue() {
  var heap = [],
  // Min heap compare by default.
  compare = function(a, b) { return a < b; };

  return {

  // Get or set the compare method for maintaining heap order.
  // Method signature: function(a,b){};
  compare: function(method) {
    if (!arguments.length)
      return compare;
    compare = method;
    return this;
  },

  // Get or set an array of items for this pq.
  items: function(items) {
    if (!arguments.length)
      return heap.slice(0, heap.length);
    this.clear();
    items.forEach(function(item) {
      this.insert(item);
    }, this);
    return this;
  },

  // Add one or more items to the priority queue.
  insert: function() {
    slice.call(arguments, 0).forEach(function(item) {
      heap.push(item);
      float(heap.length-1);
    });
    return this;
  },

  // Remove the next item from the priority queue.
  next: function() {
    var head = null, last;
    if (heap.length) {
      head = heap[0];
      last = heap.length - 1;
      swap(0, last);
      heap.splice(last, 1);
      sink(0);
    }
    return head;
  },

  // Remove all items from the priority queue.
  clear: function() {
    heap = [];
    return this;
  },

  // Return the head item without modifying the queue.
  peek: function() {
    var item = heap[0];
    return item !== undefined ? item : null;
  },

  copy: function() {
    return priorityQueue().compare(this.compare()).items(heap);
  },

  // Return the count of items in the priority queue.
  size: function() {
    return heap.length
  }};

  // Sink an item from the top down to heap order.
  function sink(h) {
    var left = 2*h+1, right = 2*h+2, child = left;
    if (left < heap.length) {
      right < heap.length && compare(heap[right], heap[left]) && child++;
      if (compare(heap[child], heap[h])) {
        swap(h, child);
        sink(child);
      }
    }
  }

  // Float an item from the bottom up to heap order.
  function float(h) {
    var parent = Math.floor((h-1)/2);
    if (parent >= 0 && compare(heap[h], heap[parent])) {
        swap(h, parent);
        float(parent);
    }
  }

  // Swap two heap elements by index.
  function swap(i, j) {
    var tmp = heap[i];
    heap[i] = heap[j];
    heap[j] = tmp;
  }  
};


// ---------------------------------------------------------------
// Set - a container for unique items.
// ---------------------------------------------------------------
containers.set = function set() {
  var st = Object.create(null), size = 0,

  // The default key function for items added to the set.
  key = function() {
    return ''.concat('(', this, ':', encodeType(this), ')');
  };

  return {

  // Get or set the key method for item key generation.
  key: function(method) {
    if(!arguments.length)
      return key;
    key = method;
    return this;
  },

  // Set or get an array of items for this pq.
  items: function(items) {
    if (!arguments.length)
      return getItems(this.each);
    this.clear();
    items.forEach(function(item) {
      this.add(item);
    }, this);
    return this;
  },

  // Return an array of this set's keys.
  keys: function() {
    return getKeys(this.each).sort();
  },

  // Add one or more items to the set.
  add: function() {
    slice.call(arguments, 0).forEach(function(item) {
      if (item === undefined) return;
      var k = key.call(item);
      if (st[k] === undefined) {
        st[k] = item;
        ++size;
      }
    }, this);
    return this;
  },

  // Remove one or more items from the set.
  remove: function() {
    slice.call(arguments, 0).forEach(function(item) {
      var k = key.call(item);
      if (st[k] !== undefined) {
        delete st[k];
        --size;
      }
    }, this);
    return this;
  },

  // Clear all items from the set.
  clear: function() {
    st = Object.create(null);
    size = 0;
    return this;
  },

  // Return true if the set contains the item.
  has: function(item) {
    return st[key.call(item)] === undefined ? false : true;
  },

  // Return the number of items in this set.
  size: function() {
    return size;
  },

  // Iterate over items in the set.
  each: function(action, context) {
    for (var k in st)
      action.call(context, st[k], k);
    return this;
  },

  // Return a copy of this set.
  copy: function() {
    return set().key(this.key()).items(this.items())
  },

  // Convert this set to a representative string implicitly.
  toString: function() {
    return '{' + this.keys().join(',') + '}';
  },

  // Return true if b is equal to this set.
  equals: function(b) {
    var eq = true;
    if (this !== b) {
      // Sets should be the same size.
      if (this.size() !== b.size())
        return false;
      // Sets should have the same items.
      this.each(function(item) {
        eq = eq && b.has(item);
      });
      return eq;
    }
    return true;
  },

  // a ∪ b (elements of b added to a)
  union: function(b) {
    b.each(function(item) {
      this.add(item);
    }, this);
    return this;
  },

  // a ∩ b (elements common to both a and b)
  intersection: function(b) {
    this.each(function(item) {
      if (!b.has(item))
        this.remove(item);
    }, this);
    return this;
  },

  // a \ b (relative complement of b in a, a minus b)
  complement: function(b) {
    b.each(function(item) {
      this.remove(item);
    }, this);
    return this;
  },

  // a Δ b (symmetric difference, (a ∪ b) minus (a ∩ b))
  difference: function(b) {
    var intersection = this.copy().intersection(b);
    this.union(b);
    this.complement(intersection);
    return this;
  }};

  // Return an array of this set's items.
  function getItems(iterator) {
    var items = [];
    iterator(function(item) {
      items.push(item);
    });
    return items;
  }

  // Return an array of this set's keys.
  function getKeys(iterator) {
    var keys = [];
    iterator(function(item, key) {
      keys.push(key);
    });
    return keys;
  }
};

})(typeof exports !== 'undefined' && exports || this);

