# containers.js
Basic containers deque, bag, stack, queue, priority queue, and set.

Use `bag` when you want to store and iterate over items, but don't particularly care about their order.

Use `stack` when you want items to be removed in reverse order from how they were added (LIFO).

Use `queue` when you want items to be removed in the same order that they were added (FIFO).

Use `deque' (pronounced "deck") when you want to add and remove items from either end of a queue.

Use `priorityQueue` when you want items to be removed based on a sorting order.

Use `set` when you want to store unique items and perform set operations on them.

Each container supports adding, removing, and iterating items, as well as: copying the container; querying its size; clearing the container of its contents; and returning an array of the container's items.

##Usage

Load the script.
`<script type="text/javascript" src="containers.js"></script>`

Create a container.
```javascript
var bag = containers.bag();

// Add some items.
bag.add(7, 4, 2);

// Check its size.
bag.size(); // 3

// Iterate the bag.
bag.each(function(item) {
    console.log(item); // => 7 4 2
});

// Copy the bag.
var newBag = bag.copy();

// Clear the bag.
bag.clear();
bag.size(); // 0
```

