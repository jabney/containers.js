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
+ [Augmenting a Container](#augmenting-a-container)

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

`*bag.remove()` is based on `deque.remove()` and is a linear-time operation, as it removes a specific item from the list after searching to find it. This differs from `deque.popFront()` and `deque.popBack()`, which are both constant-time operations when `containers.dequeImpl` is set to `dequeList`. `bag.add()` is a constant-time operation regardless of whether `containers.dequeImpl` is set to `dequeArray` or `dequeList`. (`bag.remove()` was provided for convenience. If your use case requires a container that can add and remove a lot of items fast, `bag` may not be the best choice. `bag` can add and iterate items quickly, using either of the included deque implementations, but removing a single item is a linear-time operation, and removing all items from a bag is quadratic.)

##Container Interfaces
###Stack

###Queue

###Bag

###Deque

###Priority Queue

###Set

##Augmenting a Container

