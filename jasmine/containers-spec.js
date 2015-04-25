/*
  containers-spec.js

  Unit tests for containers.js

  Author: James Abney
  Date:  02-Apr-2015
*/

(function(containers) {
'use strict'

containers.dequeImpl = 'dequeList'

describe('Containers', function() {

  describe('Deque (linked list)', function() {

    beforeEach(function() {
      this.deque = containers.dequeList();
    });

    it('returns null when popping items from an empty queue', function() {
      expect(this.deque.popFront()).toEqual(null);
      expect(this.deque.popBack()).toEqual(null);
      expect(this.deque.size()).toEqual(0);
    });

    it('accurately reports the size of the queue', function() {
      expect(this.deque.size()).toEqual(0);
      
      this.deque.pushBack(1, 2, 3);
      expect(this.deque.size()).toEqual(3);

      this.deque.popFront();
      expect(this.deque.size()).toEqual(2);

      this.deque.popBack();
      expect(this.deque.size()).toEqual(1);

      this.deque.pushBack(7, 8, 9);
      expect(this.deque.size()).toEqual(4);

      this.deque.clear();
      expect(this.deque.size()).toEqual(0);
    });

    it('correctly peeks at front and back of queue', function() {
      this.deque.pushBack(1, 2, 3);
      expect(this.deque.peekFront()).toEqual(1);
      expect(this.deque.peekBack()).toEqual(3);

      this.deque.clear();
      expect(this.deque.peekFront()).toBe(null);
      expect(this.deque.peekBack()).toBe(null);
    });

    it('correctly clears the queue', function(){
      expect(this.deque.size()).toEqual(0);

      this.deque.pushBack(1, 2, 3, 4, 5, 6, 7);
      expect(this.deque.size()).toEqual(7);

      this.deque.clear();
      expect(this.deque.size()).toEqual(0);
      expect(this.deque.has(1)).toBe(false);
      expect(this.deque.peekFront()).toBe(null);
      expect(this.deque.peekBack()).toBe(null);
    });

    it('correctly copies the queue', function() {
      var d2;
      this.deque.pushBack(1, 2, 3, 4, 5, 6, 7);
      d2 = this.deque.copy();
      expect(this.deque).not.toBe(d2);
      expect(this.deque.size()).toEqual(d2.size());
      expect(this.deque.items()).toEqual(d2.items());
    });

    it('can accurately report if the queue contains a specific item', function() {
      this.deque.pushBack(1, 2, 3, 4, 5, 6, 7);
      expect(this.deque.has(0)).toBe(false);
      expect(this.deque.has(1)).toBe(true);
      expect(this.deque.has(2)).toBe(true);
      expect(this.deque.has(3)).toBe(true);
      expect(this.deque.has(4)).toBe(true);
      expect(this.deque.has(5)).toBe(true);
      expect(this.deque.has(6)).toBe(true);
      expect(this.deque.has(7)).toBe(true);
      expect(this.deque.has(8)).toBe(false);
    });

    it('stores items added from front or back in the correct order', function() {
      this.deque.pushFront(4, 3, 2, 1);
      expect(this.deque.size()).toEqual(4);

      this.deque.pushBack(5, 6, 7);
      expect(this.deque.size()).toEqual(7);

      expect(this.deque.items()).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('properly pops items from front and back of queue', function() {
      this.deque.pushBack(1, 2, 3, 4, 5, 6, 7);

      expect(this.deque.popFront()).toEqual(1);
      expect(this.deque.popFront()).toEqual(2);
      expect(this.deque.popFront()).toEqual(3);

      expect(this.deque.popBack()).toEqual(7);
      expect(this.deque.popBack()).toEqual(6);
      expect(this.deque.popBack()).toEqual(5);
      expect(this.deque.popBack()).toEqual(4);

      expect(this.deque.popBack()).toEqual(null);
      expect(this.deque.popFront()).toEqual(null);
      expect(this.deque.size()).toEqual(0);
    });

    it('properly removes arbitrary items from the queue', function() {
      this.deque.pushBack(1, 2, 3, 4, 5, 6, 7);
      this.deque.remove(1, 3, 4, 7);
      expect(this.deque.has(1)).toBe(false);
      expect(this.deque.has(2)).toBe(true);
      expect(this.deque.has(3)).toBe(false);
      expect(this.deque.has(4)).toBe(false);
      expect(this.deque.has(5)).toBe(true);
      expect(this.deque.has(6)).toBe(true);
      expect(this.deque.has(7)).toBe(false);
    });

    it('returns "this" for all methods that don\'t return a value', function() {
      expect(this.deque.pushFront()).toBe(this.deque);
      expect(this.deque.pushBack()).toBe(this.deque);
      expect(this.deque.remove()).toBe(this.deque);
      expect(this.deque.clear()).toBe(this.deque);
      expect(this.deque.forwardIterator()).toBe(this.deque);
      expect(this.deque.reverseIterator()).toBe(this.deque);
    });
  });


  describe('Deque (array)', function() {

    beforeEach(function() {
      this.deque = containers.dequeArray();
    });

    it('returns null when popping items from an empty queue', function() {
      expect(this.deque.popFront()).toEqual(null);
      expect(this.deque.popBack()).toEqual(null);
      expect(this.deque.size()).toEqual(0);
    });

    it('accurately reports the size of the queue', function() {
      expect(this.deque.size()).toEqual(0);
      
      this.deque.pushBack(1, 2, 3);
      expect(this.deque.size()).toEqual(3);

      this.deque.popFront();
      expect(this.deque.size()).toEqual(2);

      this.deque.popBack();
      expect(this.deque.size()).toEqual(1);

      this.deque.pushBack(7, 8, 9);
      expect(this.deque.size()).toEqual(4);

      this.deque.clear();
      expect(this.deque.size()).toEqual(0);
    });

    it('correctly peeks at front and back of queue', function() {
      this.deque.pushBack(1, 2, 3);
      expect(this.deque.peekFront()).toEqual(1);
      expect(this.deque.peekBack()).toEqual(3);

      this.deque.clear();
      expect(this.deque.peekFront()).toBe(null);
      expect(this.deque.peekBack()).toBe(null);
    });

    it('correctly clears the queue', function(){
      expect(this.deque.size()).toEqual(0);

      this.deque.pushBack(1, 2, 3, 4, 5, 6, 7);
      expect(this.deque.size()).toEqual(7);

      this.deque.clear();
      expect(this.deque.size()).toEqual(0);
      expect(this.deque.has(1)).toBe(false);
      expect(this.deque.peekFront()).toBe(null);
      expect(this.deque.peekBack()).toBe(null);
    });

    it('correctly copies the queue', function() {
      var d2;
      this.deque.pushBack(1, 2, 3, 4, 5, 6, 7);
      d2 = this.deque.copy();
      expect(this.deque).not.toBe(d2);
      expect(this.deque.size()).toEqual(d2.size());
      expect(this.deque.items()).toEqual(d2.items());
    });

    it('can accurately report if the queue contains a specific item', function() {
      this.deque.pushBack(1, 2, 3, 4, 5, 6, 7);
      expect(this.deque.has(0)).toBe(false);
      expect(this.deque.has(1)).toBe(true);
      expect(this.deque.has(2)).toBe(true);
      expect(this.deque.has(3)).toBe(true);
      expect(this.deque.has(4)).toBe(true);
      expect(this.deque.has(5)).toBe(true);
      expect(this.deque.has(6)).toBe(true);
      expect(this.deque.has(7)).toBe(true);
      expect(this.deque.has(8)).toBe(false);
    });

    it('stores items added from front or back in the correct order', function() {
      this.deque.pushFront(4, 3, 2, 1);
      expect(this.deque.size()).toEqual(4);

      this.deque.pushBack(5, 6, 7);
      expect(this.deque.size()).toEqual(7);

      expect(this.deque.items()).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('properly pops items from front and back of queue', function() {
      this.deque.pushBack(1, 2, 3, 4, 5, 6, 7);

      expect(this.deque.popFront()).toEqual(1);
      expect(this.deque.popFront()).toEqual(2);
      expect(this.deque.popFront()).toEqual(3);

      expect(this.deque.popBack()).toEqual(7);
      expect(this.deque.popBack()).toEqual(6);
      expect(this.deque.popBack()).toEqual(5);
      expect(this.deque.popBack()).toEqual(4);

      expect(this.deque.popBack()).toEqual(null);
      expect(this.deque.popFront()).toEqual(null);
      expect(this.deque.size()).toEqual(0);
    });

    it('properly removes arbitrary items from the queue', function() {
      this.deque.pushBack(1, 2, 3, 4, 5, 6, 7);
      this.deque.remove(1, 3, 4, 7);
      expect(this.deque.has(1)).toBe(false);
      expect(this.deque.has(2)).toBe(true);
      expect(this.deque.has(3)).toBe(false);
      expect(this.deque.has(4)).toBe(false);
      expect(this.deque.has(5)).toBe(true);
      expect(this.deque.has(6)).toBe(true);
      expect(this.deque.has(7)).toBe(false);
    });

    it('returns "this" for all methods that don\'t return a value', function() {
      expect(this.deque.pushFront()).toBe(this.deque);
      expect(this.deque.pushBack()).toBe(this.deque);
      expect(this.deque.remove()).toBe(this.deque);
      expect(this.deque.clear()).toBe(this.deque);
      expect(this.deque.forwardIterator()).toBe(this.deque);
      expect(this.deque.reverseIterator()).toBe(this.deque);
    });
  });


  describe('Bag', function() {

    beforeEach(function() {
      this.bag = containers.bag();
    });

    it('accurately reports bag size', function() {
      expect(this.bag.size()).toEqual(0);

      this.bag.add(1);
      expect(this.bag.size()).toEqual(1);

      this.bag.add(2, 3, 4);
      expect(this.bag.size()).toEqual(4);

      this.bag.clear();
      expect(this.bag.size()).toEqual(0);
    });

    it('can add one or more items at a time', function() {
      this.bag.add(1);
      expect(this.bag.size()).toEqual(1);

      this.bag.add(2, 3, 4);
      expect(this.bag.size()).toEqual(4);

      expect(this.bag.items()).toEqual([1, 2, 3, 4]);
    });

    it('can remove an arbitrary item from the bag', function() {
      this.bag.add(1, 2, 3, 4, 5, 6, 7);
      this.bag.remove(4);
      this.bag.remove(7);
      this.bag.remove(1);
      expect(this.bag.has(1)).toEqual(false);
      expect(this.bag.has(2)).toEqual(true);
      expect(this.bag.has(3)).toEqual(true);
      expect(this.bag.has(4)).toEqual(false);
      expect(this.bag.has(5)).toEqual(true);
      expect(this.bag.has(6)).toEqual(true);
      expect(this.bag.has(7)).toEqual(false);
    });

    it('can add and return an array of items', function() {
      this.bag.items([1, 2, 3, 4, 5, 6, 7]);
      expect(this.bag.items()).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('can iterate over its items', function() {
      var items = [1, 2, 3, 4, 5, 6, 7];
      this.bag.items(items);
      this.bag.each(function(item) {
        expect(items.indexOf(item)).toBeGreaterThan(-1);
      });
    });

    it('correctly copies the bag', function() {
      var b = this.bag.copy();
      expect(this.bag).not.toBe(b);
      expect(this.bag.items().sort()).toEqual(b.items().sort())
    });

    it('correctly clears the bag', function() {
      this.bag.items([1, 2, 3, 4]);
      expect(this.bag.size()).toEqual(4);
      this.bag.clear();
      expect(this.bag.size()).toEqual(0);
      expect(this.bag.items()).toEqual([])
    });

    it('returns "this" for all methods that don\'t return a value', function() {
      expect(this.bag.items([])).toBe(this.bag);
      expect(this.bag.add()).toBe(this.bag);
      expect(this.bag.each()).toBe(this.bag);
      expect(this.bag.clear()).toBe(this.bag);
    });
  });


  describe('Stack', function() {

    beforeEach(function() {
      this.stack = containers.stack();
    });

    it('accurately reports stack size', function() {
      expect(this.stack.size()).toEqual(0);

      this.stack.push(1);
      expect(this.stack.size()).toEqual(1);

      this.stack.push(2, 3, 4);
      expect(this.stack.size()).toEqual(4);

      this.stack.clear();
      expect(this.stack.size()).toEqual(0);
    });

    it('can add and return an array of items', function() {
      this.stack.items([1, 2, 3, 4, 5, 6, 7]);
      expect(this.stack.items()).toEqual([7, 6, 5, 4, 3, 2, 1]);
    });

    it('returns null when popping an empty stack', function() {
      expect(this.stack.pop()).toBe(null);
      expect(this.stack.size()).toEqual(0);
    });

    it('can correctly push and pop items', function() {
      this.stack.push(1);
      expect(this.stack.size()).toEqual(1);

      this.stack.push(2, 3, 4);
      expect(this.stack.size()).toEqual(4);

      expect(this.stack.pop()).toEqual(4);
      expect(this.stack.pop()).toEqual(3);
      expect(this.stack.pop()).toEqual(2);
      expect(this.stack.pop()).toEqual(1);
      expect(this.stack.pop()).toBe(null);
    });

    it('correctly peeks at the top of the stack', function() {
      expect(this.stack.peek()).toBe(null);
      this.stack.push(1, 2, 3);
      expect(this.stack.peek()).toEqual(3);
      this.stack.pop();
      expect(this.stack.peek()).toEqual(2);
      this.stack.pop();
      expect(this.stack.peek()).toEqual(1);
      this.stack.pop();
      expect(this.stack.peek()).toBe(null);
    });

    it('can iterate over its items', function() {
      var items = [1, 2, 3, 4, 5, 6, 7], count = 0;
      this.stack.items(items);
      items.reverse();
      this.stack.each(function(item) {
        expect(item).toEqual(items[count++]);
      });
    });

    it('correctly copies the stack', function() {
      var b = this.stack.copy();
      expect(this.stack).not.toBe(b);
      expect(this.stack.items()).toEqual(b.items());
      expect(this.stack.size()).toEqual(b.size());
    });

    it('correctly clears the stack', function() {
      this.stack.items([1, 2, 3, 4]);
      expect(this.stack.size()).toEqual(4);
      this.stack.clear();
      expect(this.stack.size()).toEqual(0);
      expect(this.stack.items()).toEqual([])
    });

    it('returns "this" for all methods that don\'t return a value', function() {
      expect(this.stack.items([])).toBe(this.stack);
      expect(this.stack.push()).toBe(this.stack);
      expect(this.stack.each()).toBe(this.stack);
      expect(this.stack.clear()).toBe(this.stack);
    });
  });

  describe('Queue', function() {

    beforeEach(function() {
      this.queue = containers.queue();
    });

    it('accurately reports queue size', function() {
      expect(this.queue.size()).toEqual(0);

      this.queue.enq(1);
      expect(this.queue.size()).toEqual(1);

      this.queue.enq(2, 3, 4);
      expect(this.queue.size()).toEqual(4);

      this.queue.clear();
      expect(this.queue.size()).toEqual(0);
    });

    it('can add and return an array of items', function() {
      this.queue.items([1, 2, 3, 4, 5, 6, 7]);
      expect(this.queue.items()).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('returns null when dequueing an empty queue', function() {
      expect(this.queue.deq()).toBe(null);
      expect(this.queue.size()).toEqual(0);
    });

    it('can correctly enqueue and dequeue items', function() {
      this.queue.enq(1);
      expect(this.queue.size()).toEqual(1);

      this.queue.enq(2, 3, 4);
      expect(this.queue.size()).toEqual(4);

      expect(this.queue.deq()).toEqual(1);
      expect(this.queue.deq()).toEqual(2);
      expect(this.queue.deq()).toEqual(3);
      expect(this.queue.deq()).toEqual(4);
      expect(this.queue.deq()).toBe(null);
    });

    it('correctly peeks at the top of the queue', function() {
      expect(this.queue.peek()).toBe(null);
      this.queue.enq(1, 2, 3);
      expect(this.queue.peek()).toEqual(1);
      this.queue.deq();
      expect(this.queue.peek()).toEqual(2);
      this.queue.deq();
      expect(this.queue.peek()).toEqual(3);
      this.queue.deq();
      expect(this.queue.peek()).toBe(null);
    });

    it('can iterate over its items', function() {
      var items = [1, 2, 3, 4, 5, 6, 7], count = 0;
      this.queue.items(items);
      this.queue.each(function(item) {
        expect(item).toEqual(items[count++]);
      });
    });

    it('correctly copies the queue', function() {
      var b = this.queue.copy();
      expect(this.queue).not.toBe(b);
      expect(this.queue.items()).toEqual(b.items());
      expect(this.queue.size()).toEqual(b.size());
    });

    it('correctly clears the queue', function() {
      this.queue.items([1, 2, 3, 4]);
      expect(this.queue.size()).toEqual(4);
      this.queue.clear();
      expect(this.queue.size()).toEqual(0);
      expect(this.queue.items()).toEqual([])
    });

    it('returns "this" for all methods that don\'t return a value', function() {
      expect(this.queue.items([])).toBe(this.queue);
      expect(this.queue.enq()).toBe(this.queue);
      expect(this.queue.each()).toBe(this.queue);
      expect(this.queue.clear()).toBe(this.queue);
    });
  });


  describe('Priority Queue', function() {
    // compare, items, insert, next, clear, peek, copy, size
    
    beforeEach(function() {
      this.pq = containers.priorityQueue();
    });

    it('inserts and removes items in priority order', function() {
      this.pq.insert(1, 3, 5, 4, 2);
      expect(this.pq.next()).toEqual(1);
      expect(this.pq.next()).toEqual(2);
      expect(this.pq.next()).toEqual(3);
      expect(this.pq.next()).toEqual(4);
      expect(this.pq.next()).toEqual(5);
      expect(this.pq.next()).toBe(null);
      expect(this.pq.next()).toBe(null);
    });
    
    it('returns null when queue is empty', function() {
      expect(this.pq.next()).toBe(null);
    });
    
    it('gets and sets items in the queue', function() {
      this.pq.insert(7, 8, 9);
      this.pq.items([1, 2, 3, 4]);
      expect(this.pq.size()).toEqual(4);
      expect(this.pq.next()).toEqual(1);
      expect(this.pq.next()).toEqual(2);
      expect(this.pq.next()).toEqual(3);
      expect(this.pq.next()).toEqual(4);
    });

    it('peeks at the next item in the queue', function() {
      this.pq.insert(7, 6, 5);
      expect(this.pq.peek()).toEqual(5);
      this.pq.next();
      expect(this.pq.peek()).toEqual(6);
      this.pq.next();
      expect(this.pq.peek()).toEqual(7);
      this.pq.next();
      expect(this.pq.peek()).toBe(null);
    });

    it('reports the size of the queue', function() {
      expect(this.pq.size()).toEqual(0);
      this.pq.insert(1);
      expect(this.pq.size()).toEqual(1);
      this.pq.insert(2, 3, 4);
      expect(this.pq.size()).toEqual(4);
      this.pq.next();
      expect(this.pq.size()).toEqual(3);
      this.pq.next();
      expect(this.pq.size()).toEqual(2);
      this.pq.next();
      expect(this.pq.size()).toEqual(1);
      this.pq.next();
      expect(this.pq.size()).toEqual(0);
    });

    it('copies the queue', function() {
      var pq, items = [9, 8, 7];
      this.pq.items(items);
      pq = this.pq.copy();
      expect(this.pq).not.toBe(pq);
      expect(this.pq.size()).toEqual(pq.size());
      expect(this.pq.items()).toEqual(pq.items());
      expect(this.pq.next()).toEqual(pq.next());
      expect(this.pq.next()).toEqual(pq.next());
      expect(this.pq.next()).toEqual(pq.next());
      expect(this.pq.next()).toEqual(pq.next());
      expect(this.pq.next()).toEqual(pq.next());
    });

    it('clears the queue', function() {
      this.pq.insert(2, 4, 3);
      expect(this.pq.size()).toEqual(3);
      this.pq.clear();
      expect(this.pq.size()).toEqual(0);
      expect(this.pq.next()).toBe(null);
    });

    it('gets and sets the compare method', function() {
      var compare1 = this.pq.compare(),
          compare2 = function(a, b) { return b < a; };
      expect(this.pq.compare()).toBe(compare1);
      this.pq.compare(compare2);
      expect(this.pq.compare()).toBe(compare2);
      expect(this.pq.compare()).not.toBe(compare1);
    });

    it('can use max heap compare method', function() {
      this.pq.compare(function(a, b) { return b < a; });
      this.pq.insert(1, 2, 3, 6, 5, 4);
      expect(this.pq.next()).toEqual(6);
      expect(this.pq.next()).toEqual(5);
      expect(this.pq.next()).toEqual(4);
      expect(this.pq.next()).toEqual(3);
      expect(this.pq.next()).toEqual(2);
      expect(this.pq.next()).toEqual(1);
      expect(this.pq.next()).toBe(null);
      expect(this.pq.next()).toBe(null);
    });
  });


  describe('Set', function() {
    var
    o1 = {id: 'id1', toString: toStr},
    o2 = {id: 'id2', toString: toStr},
    o3 = {id: 'id3', toString: toStr},
    o4 = {id: 'id4', toString: toStr},
    objects = [o1, o2, o3, o4];

    // The toString method for objects.
    function toStr() {
      return this.id;
    }

    beforeEach(function() {
      this.set = containers.set();
    });

    it('stores unique items', function() {
      this.set.add(1, 1, 2, 2, 3);
      expect(this.set.size()).toEqual(3);
      expect(this.set.has(1)).toBe(true);
      expect(this.set.has(2)).toBe(true);
      expect(this.set.has(3)).toBe(true);
      expect(this.set.has(4)).toBe(false);
      expect(this.set.has('1')).toBe(false);

      this.set.items(['a', 'a', 'b', 'b', 'c']);
      expect(this.set.size()).toEqual(3);
      expect(this.set.has('a')).toBe(true);
      expect(this.set.has('b')).toBe(true);
      expect(this.set.has('c')).toBe(true);
      expect(this.set.has('z')).toBe(false);

      this.set.items([o1, o2, o3, o4]);
      expect(this.set.size()).toEqual(4);
      expect(this.set.has(o1)).toBe(true);
      expect(this.set.has(o2)).toBe(true);
      expect(this.set.has(o3)).toBe(true);
      expect(this.set.has(o4)).toBe(true);
      expect(this.set.has([])).toBe(false);
      expect(this.set.has({})).toBe(false);
    });

    it('adds and removes items', function() {
      this.set.add(5, 6, 7);
      expect(this.set.has(5)).toBe(true);
      expect(this.set.has(6)).toBe(true);
      expect(this.set.has(7)).toBe(true);
      this.set.remove(6);
      expect(this.set.has(5)).toBe(true);
      expect(this.set.has(6)).toBe(false);
      expect(this.set.has(7)).toBe(true);
      this.set.remove(5, 7);
      expect(this.set.has(5)).toBe(false);
      expect(this.set.has(6)).toBe(false);
      expect(this.set.has(7)).toBe(false);
    });

    it('reports set size', function() {
      expect(this.set.size()).toEqual(0);
      this.set.add(1);
      expect(this.set.size()).toEqual(1);
      this.set.add(2, 3, 4);
      expect(this.set.size()).toEqual(4);
      this.set.remove(3);
      expect(this.set.size()).toEqual(3);
      this.set.remove(1, 2, 4);
      expect(this.set.size()).toEqual(0);
    });

    it('clears the set', function() {
      this.set.add('a', 'b', 'c');
      this.set.clear();
      expect(this.set.size()).toEqual(0);
      expect(this.set.has('a')).toBe(false);
      expect(this.set.has('b')).toBe(false);
      expect(this.set.has('c')).toBe(false);
    });

    it('reports if the set contains an item', function() {
      this.set.add('aye', 'bee', 'see');
      expect(this.set.has('aye')).toBe(true);
      expect(this.set.has('bee')).toBe(true);
      expect(this.set.has('see')).toBe(true);
      expect(this.set.has('a')).toBe(false);
      expect(this.set.has('b')).toBe(false);
      expect(this.set.has('c')).toBe(false);

      this.set.items([0, null, undefined]);
      expect(this.set.size()).toBe(2);
      expect(this.set.has(0)).toBe(true);
      expect(this.set.has(null)).toBe(true);
      expect(this.set.has(undefined)).toBe(false);
    });

    it('iterates the set', function() {
      var items = [1, 2, 3],
      keys = ['1:3', '2:3', '3:3'];
      this.set.items(items);
      this.set.each(function(value, key) {
        expect(items.indexOf(value)).toBeGreaterThan(-1);
        expect(keys.indexOf(key)).toBeGreaterThan(-1);
      });
    });

    it('copies the set', function() {
      this.set.add(6, 4, 2);
      var b = this.set.copy();
      expect(this.set).not.toBe(b);
      expect(this.set.keys()).toEqual(b.keys());
    });

    it('supports objects, strings, and numbers mixed together', function() {
      this.set.add(1, '1', o1, 2, '2', o2, 3, '3', o3);
      expect(this.set.size()).toEqual(9);
      expect(this.set.has(1)).toBe(true);
      expect(this.set.has(2)).toBe(true);
      expect(this.set.has(3)).toBe(true);
      expect(this.set.has('1')).toBe(true);
      expect(this.set.has('2')).toBe(true);
      expect(this.set.has('3')).toBe(true);
      expect(this.set.has(o1)).toBe(true);
      expect(this.set.has(o2)).toBe(true);
      expect(this.set.has(o3)).toBe(true);
    });

    it('can have its key method overriddeen', function() {
      function key() { return this.id; };
      this.set.key(key).items(objects);
      expect(this.set.key()).toBe(key);
      expect(this.set.size()).toEqual(4);
      expect(this.set.has(o1)).toBe(true);
      expect(this.set.has(o2)).toBe(true);
      expect(this.set.has(o3)).toBe(true);
      expect(this.set.has(o4)).toBe(true);
      expect(this.set.has({})).toBe(false);
    });

    it('returns set keys in sorted order', function() {
      this.set.add(1, 4, 3, 2);
      expect(this.set.keys()).toEqual(['1:3', '2:3', '3:3', '4:3']);
    });

    it('gets and sets an array of items', function() {
      this.set.items([1, 2, 3]);
      expect(this.set.size()).toEqual(3);
      expect(this.set.items().sort()).toEqual([1, 2, 3])
    });

    it('determines set equality', function() {
      this.set.items(o1, o2, o3);
      expect(this.set.equals(this.set)).toBe(true);
      var b = this.set.copy();
      expect(this.set.equals(b)).toBe(true);
      b.items([o1, o2, o4]);
      expect(this.set.equals(b)).toBe(false);
    });

    it('performs a set union', function() {
      var b = containers.set().add(1, 2, 3);
      this.set.add(2, 3, 4);
      this.set.union(b);
      expect(this.set.items().sort()).toEqual([1, 2, 3, 4]);

      this.set.items([o1, o2, o3]);
      b.items([o2, o3, o4]);
      this.set.union(b);
      expect(this.set.items().sort()).toEqual([o1, o2, o3, o4]);
    });

    it('performs a set intersection', function() {
      var b = containers.set().add(1, 2, 3);
      this.set.add(2, 3, 4);
      this.set.intersection(b);
      expect(this.set.items().sort()).toEqual([2, 3]);

      this.set.items([o1, o2, o3]);
      b.items([o2, o3, o4]);
      this.set.intersection(b);
      expect(this.set.items().sort()).toEqual([o2, o3]);
    });

    it('performs a set complement', function() {
      var b = containers.set().add(1, 2, 3);
      this.set.add(3, 4, 5);
      this.set.complement(b);
      expect(this.set.items().sort()).toEqual([4, 5]);

      this.set.items([o1, o2, o3]);
      b.items([o2, o3, o4]);
      this.set.complement(b);
      expect(this.set.items().sort()).toEqual([o1]);
    });

    it('performs a set difference', function() {
      var b = containers.set().add(1, 2, 3);
      this.set.add(2, 3, 4);
      this.set.difference(b);
      expect(this.set.items().sort()).toEqual([1, 4]);

      this.set.items([o1, o2, o3]);
      b.items([o2, o3, o4]);
      this.set.difference(b);
      expect(this.set.items().sort()).toEqual([o1, o4]);
    });
  });

  describe('Manual Augmentation', function() {

    it('can augment a container with custom properties', function() {
      containers.set = (function(set) {
        return function() {
          var s = set();
          s.prop = 'prop';
          s.method = function() { return this.prop; };
          return s;
        };
      })(containers.set);

      var set = containers.set().add(1, 2, 3);
      expect(set.size()).toEqual(3);
      expect(set.has(1)).toBe(true);
      expect(set.has(2)).toBe(true);
      expect(set.has(3)).toBe(true);
      expect(set.prop).toEqual('prop');
      expect(set.method()).toEqual('prop');

      set = containers.set();
      expect(set.size()).toEqual(0);
      expect(set.has(1)).toBe(false);
      expect(set.has(2)).toBe(false);
      expect(set.has(3)).toBe(false);
      expect(set.prop).toEqual('prop');
      expect(set.method()).toEqual('prop');
    });
  });

  describe('Extend Method', function() {
    it('can augment a container with custom properties', function() {
      // containers.set = (function(set) {
      //   return function() {
      //     var s = set();
      //     s.type = function type() { return 'set'; };
      //     return s;
      //   };
      // })(containers.set);
      containers.extend('set', {
        prop: 'prop',
        method: function() { return this.prop; },
      });
      var set = containers.set().add(1, 2, 3);
      expect(set.size()).toEqual(3);
      expect(set.has(1)).toBe(true);
      expect(set.has(2)).toBe(true);
      expect(set.has(3)).toBe(true);
      expect(set.prop).toEqual('prop');
      expect(set.method()).toEqual('prop');

      set = containers.set();
      expect(set.size()).toEqual(0);
      expect(set.has(1)).toBe(false);
      expect(set.has(2)).toBe(false);
      expect(set.has(3)).toBe(false);
      expect(set.prop).toEqual('prop');
      expect(set.method()).toEqual('prop');
    });
  });
});

})(window.containers);

