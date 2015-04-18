/*
  containers-spec.js

  Unit tests for containers.js

  Author: James Abney
  Date:  02-Apr-2015
*/

(function(containers) {
'use strict'


describe('Containers', function() {

  describe('Deque', function() {

    beforeEach(function() {
      this.deque = containers.deque();
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

  });


  describe('Set', function() {

  });
});

})(window.containers);

