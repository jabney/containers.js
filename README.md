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
+ [About Deque's Role](#about-deque)
+ [Container Interfaces](#container-interfaces)
  + [Stack](#stack)
  + [Queue](#queue)
  + [Bag](#bag)
  + [Deque](#deque)
  + [Priority Queue](#priority-queue)
  + [Set](#set)
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

There are two implementations of `deque`: `dequeArray`, which uses a JavaScript array as a backing object, and `dequeList` which uses a linked list. The default is `dequeArray`. In almost all cases, `dequeArray` is faster (although the cost for either is fairly trivial). However, in rare circumstances with a `queue`, such as when the queue might contain more than 100,000 items, `dequeArray` can exhibit quadratic performance characteristics for filling and draining the queue, and become prohibitively slow in this circumstance. In this case it's highly advantageous to use `dequeList`, as it can add and remove items from either end of its queue in constant time.

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

###Deque

  items
  pushFront
  pushBack
  popFront
  popBack
  peekFront
  peekBack
  remove
  clear
  copy
  forwardIterator
  reverseIterator
  has
  size

###Priority Queue

###Set

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
    if (items === this)
      return items;
    else
      return items.sort();
  }

  // Return the object.
  return self;
}

// Try out the new method.
var stack = myStack();
stack.items([1, 2, 3]);
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

```