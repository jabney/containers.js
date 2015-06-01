# containers.js
Basic containers deque, bag, stack, queue, priority queue, and set.

Use `bag` when you want to store and iterate over items, but don't particularly care about their order.

Use `stack` when you want items to be removed in reverse order from how they were added (LIFO).

Use `queue` when you want items to be removed in the same order that they were added (FIFO).

Use `deque` (pronounced "deck") when you want to add and/or remove items from either end of a queue.

Use `priorityQueue` when you want items to be removed based on a sorting order.

Use `set` when you want to store unique items and perform set operations on them.

Each container supports adding, removing, and iterating items, as well as: copying the container; querying its size; clearing the container of its contents; and returning an array of the container's items.

Contents
+ [Usage](#usage)
+ [About Deque's Role](#about-deques-role)
+ [Container Interfaces](#container-interfaces)
  + [Stack](#stack)
  + [Queue](#queue)
  + [Bag](#bag)
  + [Priority Queue](#priority-queue)
    + [Example](#priority-queue-example)
  + [Set](#set)
    + [Using Objects with Set](#using-objects-with-set)
  + [Deque](#deque)
+ [Extending a Container](#extending-a-container)
  + [Extending with Augmentation](#extending-with-augmentation)
  + [Extending with Inheritance](#extending-with-inheritance)
  + [Augment the Original Container](#augment-the-original-container)

##Usage

Load the script.

```html
<script type="text/javascript" src="containers.js"></script>
```

Create a container.

```javascript
var bag = containers.bag();

// Add some items.
bag.add(7, 4, 2);

// Iterate the bag.
bag.each(function(item) {
    console.log(item); // => 7 4 2
});

```

**Note:** while the various container interfaces have common names in most cases (such as `copy`, `size` and `clear`) the methods for adding and removing items are specific to the container. For instance, the `stack` container uses the traditional `push` and `pop` methods, while the `queue` container uses `enq` and `deq`. Bag uses `add` and `remove`, and `deque` uses `pushFront`, `popFront`, `pushBack` and `popBack`.

##About `deque`'s Role.
`deque` is the backing object for the containers `bag`, `stack`, and `queue`. In their implementations, each of these containers uses a `deque` object to do the heavy lifting. 

There are two implementations of `deque`: `dequeArray`, which uses a JavaScript array as a backing object, and `dequeList` which uses a linked list. The default is `dequeArray`. In almost all cases, `dequeArray` is faster (although the cost for either is trivial - a few microseconds per operation for `dequeList`). However, in rare circumstances with a `queue`, such as when the queue might contain more than 100,000 items, `dequeArray` can exhibit quadratic performance characteristics for filling and draining the queue, and become prohibitively slow in this circumstance. In this case it's highly advantageous to use `dequeList`, as it can add and remove items from either end of its queue in constant time.

Calling `containers.deque()` will return an instance of the currently specified deque implementation: `dequeArray` by default, or `dequeList` if it's been configured. After `containers.dequeImpl` is set, any subsequent calls to `deque` or `queue`, `stack`, and `bag`, will use the deque implementation specified by `containers.dequeImpl`.

```javascript
// Set the implementation of deque to dequeArray (default).
containers.dequeImpl = 'dequeArray';

// Return an instance of dequeArray.
var deque = containers.deque();

// Return an instance of queue which uses the dequeArray implementation.
var queue = containers.queue();

// ...

// Set the deque implementation to dequeList.
containers.dequeImpl = 'dequeList'

// Return an instance of dequeList.
deque = containers.deque();

// Return an instance of queue which uses the dequeList implementation.
var queue = containers.queue();

// ...

// Create a custom deque implementation.
containers.myDequeImpl = function myDequeImpl() { ... };

// Set the deque implementation to myDequeImpl.
containers.dequeImpl = 'myDequeImpl';

// Return an instance of myDequeImpl.
deque = containers.deque(); 

// Return an instance of queue which uses the myDequeImpl implementation.
var queue = containers.queue();

```

**Note:** if you want to provide a custom implementation of `deque`, make sure it conforms exactly to the interface as implemented by both `dequeArray` and `dequeList`. All of the methods should be present, signatures included, although the details of the implementation are entirely up you.

**Note:** the unit test file, `unit.html`, incorporates some speed tests showing the potential heavy cost of `queue` with `dequeArray` (see the console when running unit tests). On one machine under Google Chrome, `queue` using `dequeArray` took several seconds to process a queue with 120,000 items, where `dequeList` only took a fraction of a second for the same tasks. This stands in stark contrast with a queue of size 100,000 on the same machine and with the same browser, where `dequeArray` outperformed `dequeList` significantly. This margin may vary starkly on different machines, and particularly with different browsers. Since queues of this size are usually corner cases, it's probably better to stick with `dequeArray` in most situations, unless guaranteed constant-time performance for adds and removes is preferred over a general, per-operation increase in performance (this only applies to `deque`, `bag`*, `stack`, and `queue`).

`*bag.remove()` is based on `deque.remove()` and is a linear-time operation. `bag.add()` uses `deque.pushBack()` and runs in constant time for either deque implementation.

##Container Interfaces

Here each of the container interfaces are demonstrated in detail. While many interface methods are similar amongst containers, some are different. This applies particularly to methods for adding and removing items. 

Run-time complexity, where guaranteed, is noted using big-O notation. `O(1)` denotes constant time operations; `O(n)` indicates linear time based on the number of items in the container; and `O(k)` signifies linear time based on the number of arguments passed (or the size of the given array where applicable). O(?) denotes run-time complexity that is  deque implementation dependant. 

###Stack

This container adds and removes items via `push` and `pop`. The `pop` method will always remove and return the most recent item added via `push`. 

```javascript
# Create a stack.
var stack = containers.stack();

// Add one item. O(1)
stack.push(1); 

// Add multiple items. O(k)
stack.push(2, 3, 4);

// Query the number of items on the stack. O(1)
stack.size(); // => 4

// Examine the top of the stack. O(1)
stack.peek(); // => 4

// Iterate the stack in stack order. O(n)
stack.each(function(item) {
  console.log(item); // 4, 3, 2, 1
});

// Copy the stack. O(n)
var newStack = stack.copy();
newStack.size(); // => 4

// Return a list of stack-ordered items. O(n)
stack.items(); // => [4, 3, 2, 1]

// Clear the stack. O(1)
stack.clear();
stack.size(); // => 0

// Use an array to populate the stack. O(k)
stack.items([5, 6, 7]);
stack.size(); // => 3

// Remove the items in stack order. O(1) per operation
while(stack.size())
  stack.pop(); // 7, 6, 5

```

###Queue

This container adds and removes items via `enq` and `deq`. The `deq` method will always remove and return the first-most item added via `enq`. 

```javascript
// Create a queue.
var queue = containers.queue();

// Add one item. O(1)
queue.enq(1);

// Add multiple items. O(k)
queue.enq(2, 3, 4);

// Query the number of items on the queue. O(1)
queue.size(); // => 4

// Examine the top of the queue. O(1)
queue.peek(); // => 1

// Iterate the queue in queue order. O(n)
queue.each(function(item) {
  console.log(item); // 1, 2, 3, 4
});

// Copy the queue. O(n)
var newQueue = queue.copy();
newQueue.size(); // => 4

// Return a list of queue-ordered items. O(n)
queue.items(); // => [1, 2, 3, 4]

// Clear the queue. O(1)
queue.clear();
queue.size(); // => 0

// Use an array to populate the queue. O(k)
queue.items([5, 6, 7]);
queue.size(); // => 3

// Remove the items in queue order. O(?)
while(queue.size())
  queue.deq(); // 5, 6, 7

```

###Bag

This container adds and removes items via `add` and `remove`. Note that while `add` runs in constant time, `remove` is a linear-time operation. `bag` is most useful when you simply want to add items to a container and then iterate them.

```javascript
// Create a bag.
var bag = containers.bag();

// Add one item. O(1)
bag.add(1);

// Add multiple items. O(k)
bag.add(2, 3, 4);

// Query the number of items on the bag. O(1)
bag.size(); // => 4

// Iterate the bag. O(n)
bag.each(function(item) {
  console.log(item); // 1, 2, 3, 4 (order not guaranteed)
});

// Copy the bag. O(n)
var newbag = bag.copy();
newbag.size(); // => 4

// Return a list of items. O(n)
bag.items(); // => [1, 2, 3, 4] (order not guaranteed)

// Check if the bag contains an item. O(n)
bag.has(4); // => true
bag.has(5); // => false

// Clear the bag. O(1)
bag.clear();
bag.size(); // => 0

// Use an array to populate the bag. O(k)
bag.items([5, 6, 7]);
bag.size(); // => 3

// Remove an item. O(n)
bag.remove(6); // 5, 7

// Remove multiple items. O(kn)
bag.remove(5, 7);
bag.size(); // => 0

```

###Priority Queue

This container adds and removes items via `insert` and `remove`. The main difference between this and other containers is that `priorityQueue` removes items based on a sort order, defined semantically as, "the highest priority item".

```javascript
// Create a priorityQueue.
var pq = containers.priorityQueue();

// Create a compare method to order the queue high-to-low.
// The default compare method returns a < b for low to high.
pq.compare = function(a, b) { return b < a; }

// Insert some items. O(k logn)
pq.insert(5, 2, 3, 7);

// Get the queue's items as a heap-ordered array. O(n)
pq.items(); // [7, 5, 3, 2]

// Check the size of the queue. O(1)
pq.size(); // => 4

// Peek at the head item. O(1)
pq.peek(); // => 7

// Remove the head item. O(logn)
pq.remove(); // => 7

// Clear the queue. O(1)
pq.clear();
pq.size(); // => 0

// Set the queue's items with an array. O(k logn)
pq.items([1, 4, 6]);
pq.size(); // => 3;

// Copy the priority queue. O(n)
var newPq = pq.copy();
newPq.size(); // => 3

```

####Priority Queue Example

One useful application for a priority queue is to execute a series of events based on a delay. The items can be added in any order, and they will be removed based on the time delay established when they were added.

```javascript
// Create a timed event factory to help build a
// priority queue of items with expiration times.
function timedEvent(name, delayMs) {
  return {
    name: name,
    expiry: Date.now() + delayMs
  };
}

// Create a new priority queue.
var pq = containers.priorityQueue()
  // Override the compare function to remove
  // lowest priority items first.
  .compare(function(a, b) {
    return a.expiry < b.expiry;
  })
  // Add some events in arbitrary order.
  .insert(timedEvent('2 seconds', 2000))
  .insert(timedEvent('3 seconds', 3000))
  .insert(timedEvent('0 seconds', 0))
  .insert(timedEvent('1.2 seconds', 1200))
  .insert(timedEvent('0.5 seconds', 500))
  .insert(timedEvent('2 seconds', 2000))
  .insert(timedEvent('0 seconds', 0))
  .insert(timedEvent('2.5 seconds', 2500))
  .insert(timedEvent('0.75 seconds', 750))
  .insert(timedEvent('1.5 seconds', 1500))
  .insert(timedEvent('0.75 seconds', 750))
  .insert(timedEvent('2 seconds', 2000));

console.log('Running event queue with', pq.size(), 'items...');

// Start a timer to check the priority queue at regular intervals.
(function processQueue() {
  var interval = 10;

  // Check if any events in the queue have expired.
  while(pq.size() && pq.peek().expiry <= Date.now()) {
    event = pq.remove();
    console.log(event.name);
  }

  // If the queue still has items, reschedule.
  if (pq.size())
    setTimeout(processQueue, interval);
  else
    console.log('Event queue empty');
})();

```

###Set

This container adds and removes items via `add` and `remove`. The `set` container stores unique items only, so adding a duplicate item does nothing to change the set. This implementation supports mixing and matching numbers and strings, so both `1` and `"1"` can be added as separate items. This is accomplished via `set`'s default `key` method, which encodes an item's type as part of its key. Objects are supported as well, as long as the object has a `toString` method which returns a unique identifier; alternately, a custom `key` method can be supplied to generate a unique identifier for the object. These methods are discussed later.

```javascript
// Create a set.
var set = containers.set();

// Add some items.
set.add(1, 1, 2, 2, 3, 3, 3, 4);

// Check the size of the set.
set.size(); // => 4

// Remove an item.
set.remove(4);
set.size(); // => 3

// Check if the set contains an item.
set.has(3); // => true
set.has(4); // => false

// Get an array of the set's items.
set.items(); // => [1, 2, 3]

// Get an array of the set's keys
// (keys are encoded with the object's type).
set.keys(); // ["(1:3)", "(2:3)", "(3:3)"]

// Iterate over the set's items and keys.
set.each(function(item, key) {
  console.log(item, key); // => 1 "(1:3)", 2 "(2:3)", 3 "(3:3)" 
});

// Clear the set.
set.clear();
set.size(); // => 0

// Add strings instead of numbers.
set.add('1', '2', '3');

// Inspect the keys.
set.keys(); // => ["(1:5)", "(2:5)", "(3:5)"]

// Add numbers to the set.
set.add(1, 2, 3);
set.size(); // => 6

// Inspect the keys.
set.keys(); // => ["(1:3)", "(1:5)", "(2:3)", "(2:5)", "(3:3)", "(3:5)"]

// Set Operations - aside from equals, set operations modify the calling set.

// (Assume this initialization happens between set operations.)
var a = containers.set().add(1, 2, 3);
var b = containers.set().add(3, 4, 5);

// Check if the sets are equal. (a = b)
a.equals(b); // => false
b.equals(a); // => false

// Perform a set union. (a ∪ b)
a.union(b);
a.items(); // => [1, 2, 3, 4, 5]

// Perform a set intersection. (a ∩ b)
a.intersection(b);
a.items(); // => [3]

// Perform a set complement. (a - b)
a.complement(b);
a.items(); // => [1, 2]

// Perform a set difference. (symmetric difference, a Δ b)
a.difference(b);
a.items(); // => [1, 2, 4, 5]

```

####Using Objects with `set`
In order to add objects to a set, it's necessary that either: the object has a `toString` method which returns a unique identifier; or a custom `key` method is supplied which can return a unique identifier for the object.

```javascript
// Add a toString method to objects that returns a unique identifier.

// Create a toString method to be referenced from objects.
function toStr() {
  return this.id;
}

var
ob1 = {id: 1, toString: toStr},
ob2 = {id: 2, toString: toStr},
ob3 = {id: 3, toString: toStr};

// Create a new set and add the objects.
var set = containers.set()
  .add(ob1, ob2, ob2, ob3, ob3, ob3);

// Get an array of items in the set.
set.items(); // => [{id:1, ...}, {id:2, ...}, {id:3, ...}]

```

```javascript
// Supply a custom key method which returns a unique identifier for the object.

var
ob1 = {id: 1},
ob2 = {id: 2},
ob3 = {id: 3};

// Create a new set with a custom key method and add the objects.
var set = containers.set()
  .key(function() {
    return this.id;
  })
  .add(ob1, ob2, ob2, ob3, ob3, ob3);

// Get an array of items in the set.
set.items(); // => [{id:1}, {id:2}, {id:3}]

```

###Deque

This container adds and removes items via `pushFront`, `pushBack`, `popFront`, and `popBack`. `deque` is primarily used as a backing object for `bag`, `stack`, and `queue`, although it may occasionally useful for other things as well. There are two implementations of `deque` (see [About `deque`'s Role](#about-deques-role) for more details).

```javascript
// Create a deque.
var deque = containers.deque();

// Add an item to the front of the deque. O(?)
deque.pushFront(1);

// Add multiple items to the front of the deque. O(k?)
deque.pushFront(2, 3, 4);

// Peek at the front of the deque. O(1)
deque.peekFront(); // => 4

// Pop an item from the front of the deque. O(?)
deque.popFront(); // => 4

// Clear the deque of all items. O(?)
deuqe.clear();
deque.size(); // => 0

// Add an item to the back of the deque. O(?)
deque.pushBack(1);

// Add multiple items to the back of the deque. O(k)
deque.pushBack(2, 3, 4);

// Peek at the back of the deque. O(1)
deque.peekBack(); // => 4

// Pop an item from the back of the deque. O(1)
deque.popBack(); // => 4

// Query the number of items in the deque. O(1)
deque.size(); // => 3

// Iterate the deque from front to back. O(n)
deque.forwardIterator(function(item) {
  console.log(item); // 1, 2, 3
});

// Iterate the deque from back to front. O(n)
deque.reverseIterator(function(item) {
  console.log(item); // 3, 2, 1
});

// Copy the deque. O(n)
var newDeque = deque.copy();
newDeque.size(); // => 3

// Return a list of items (front-to-back). O(n)
deque.items(); // => [1, 2, 3]

// Check if the deque contains an item. O(n)
deque.has(4); // => true
deque.has(5); // => false

// Use an array to populate the deque. O(k)
deque.items([5, 6, 7]);
deque.size(); // => 3

// Remove an item. O(n)
deque.remove(6); // 5, 7

// Remove multiple items. O(kn)
deque.remove(5, 7);
deque.size(); // => 0

```

##Extending a Container

The containers in `containers.js` are factory methods, returning an object as a result of the method call. There are at least two ways to extend a container and give it new properties and methods: an augmentation pattern, and an inheritance pattern.

###Extending with Augmentation

```javascript
// Define a new stack function.
function myStack() {
  
  // Create an instance of the original stack.
  var stack = containers.stack();

  // Add a method to the instance.
  stack.has = function has(item) {
    var items = this.items(), size = this.size(), i;
    for (i = 0; i < size; i++)
      if (item === items[i])
        return true;
    return false;
  };

  // Return the augmented stack object.
  return stack;
}

// Try out the new stack method.
var stack = myStack();
stack.push(1, 2, 3);
stack.has(1); // => true
stack.has(4); // => false

```

###Extending with Inheritance

```javascript
// Define a new stack function.
function myStack() {
  
  // Get an instance of the original stack.
  var _super = containers.stack();

  // Create a new object with the instance of
  // the original stack as its prototype.
  var self = Object.create(_super);

  // Set the factory property to this new stack function.
  // This ensures that the copy method returns the correct object.
  self.factory = myStack;

  // Optionally give the object a reference to _super.
  self._super = _super;

  // Override the items method with one that returns
  // the stack items in sorted order.
  self.items = function items(items) {
    var items = _super.items.apply(this, arguments);
    return items === this ? items : items.sort();
  }

  // Return the object.
  return self;
}

// Try out the new method.
var stack = myStack();
stack.items([2, 1, 3]);
stack.items(); // => [1, 2, 3];

// Verify that the derived stack copies correctly.
var copy = stack.copy();
copy.factory === myStack; // true
copy.items(); // => [1, 2, 3]

```

###Augment the Original Container

```javascript
// Instead of creating a separate method, augment the original.
containers.stack = (function(original) {
  return function myStack() {

    // Create an instance of the original stack.
    var stack = original();

    // Add a method to the instance.
    stack.has = function has(item) {
      var items = this.items(), size = this.size(), i;
      for (i = 0; i < size; i++)
        if (item === items[i])
          return true;
      return false;
    };

    // Return the augmented stack object.
    return stack;
  };
})(containers.stack);

// Check that the container method is now myStack.
containers.stack.name; // 'myStack'

// Try out the new stack method.
var stack = containers.stack();
stack.push(1, 2, 3);
stack.has(1); // => true
stack.has(4); // => false

```

