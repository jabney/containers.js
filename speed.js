/*
  speed.js

  Stack and queue performance tests for containers.js

  Author: James Abney
*/
(function() {
'use strict';

var
data1e2 = range(0, 1e2),
data1e3 = range(0, 1e3),
data1e4 = range(0, 1e4),
data1e5 = range(0, 1e5),
data12e5 = range(0, 1.2e5)
;

console.log('\nStack timing, using dequeArray implementation');
containers.dequeImpl = 'dequeArray'

timer('fill and drain stack (100 items)', function() {
  var s = containers.stack();
  s.items(data1e2);
  while(s.size()) {
    s.pop();
  }
});

timer('fill and drain stack (1,000 items)', function() {
  var s = containers.stack();
  s.items(data1e3);
  while(s.size()) {
    s.pop();
  }
});

timer('fill and drain stack (10,000 items)', function() {
  var s = containers.stack();
  s.items(data1e4);
  while(s.size()) {
    s.pop();
  }
});

timer('fill and drain stack (100,000 items)', function() {
  var s = containers.stack();
  s.items(data1e5);
  while(s.size()) {
    s.pop();
  }
});

timer('fill and drain stack (120,000 items)', function() {
  var s = containers.stack();
  s.items(data12e5);
  while(s.size()) {
    s.pop();
  }
});

console.log('\nStack timing, using dequeList implementation');
containers.dequeImpl = 'dequeList'

timer('fill and drain stack (100 items)', function() {
  var s = containers.stack();
  s.items(data1e2);
  while(s.size()) {
    s.pop();
  }
});

timer('fill and drain stack (1,000 items)', function() {
  var s = containers.stack();
  s.items(data1e3);
  while(s.size()) {
    s.pop();
  }
});

timer('fill and drain stack (10,000 items)', function() {
  var s = containers.stack();
  s.items(data1e4);
  while(s.size()) {
    s.pop();
  }
});

timer('fill and drain stack (100,000 items)', function() {
  var s = containers.stack();
  s.items(data1e5);
  while(s.size()) {
    s.pop();
  }
});

timer('fill and drain stack (120,000 items)', function() {
  var s = containers.stack();
  s.items(data12e5);
  while(s.size()) {
    s.pop();
  }
});

console.log('\nQueue timing, using dequeArray implementation');
containers.dequeImpl = 'dequeArray'

timer('fill and drain queue (100 items)', function() {
  var q = containers.queue();
  q.items(data1e2);
  while(q.size()) {
    q.deq();
  }
});

timer('fill and drain queue (1,000 items)', function() {
  var q = containers.queue();
  q.items(data1e3);
  while(q.size()) {
    q.deq();
  }
});

timer('fill and drain queue (10,000 items)', function() {
  var q = containers.queue();
  q.items(data1e4);
  while(q.size()) {
    q.deq();
  }
});

timer('fill and drain queue (100,000 items)', function() {
  var q = containers.queue();
  q.items(data1e5);
  while(q.size()) {
    q.deq();
  }
});

xtimer('fill and drain queue (120,000 items)', function() {
  var q = containers.queue();
  q.items(data12e5);
  while(q.size()) {
    q.deq();
  }
});

console.log('\nQueue timing, using dequeList implementation');
containers.dequeImpl = 'dequeList'

timer('fill and drain queue (100 items)', function() {
  var q = containers.queue();
  q.items(data1e2);
  while(q.size()) {
    q.deq();
  }
});

timer('fill and drain queue (1,000 items)', function() {
  var q = containers.queue();
  q.items(data1e3);
  while(q.size()) {
    q.deq();
  }
});

timer('fill and drain queue (10,000 items)', function() {
  var q = containers.queue();
  q.items(data1e4);
  while(q.size()) {
    q.deq();
  }
});

timer('fill and drain queue (100,000 items)', function() {
  var q = containers.queue();
  q.items(data1e5);
  while(q.size()) {
    q.deq();
  }
});

timer('fill and drain queue (120,000 items)', function() {
  var q = containers.queue();
  q.items(data12e5);
  while(q.size()) {
    q.deq();
  }
});

console.log('All finished');

// Perform a timed test.
function timer(message, method) {
  var t0, t1, ms;
  console.log('Running', message + '...');
  t0 = performance.now();
  method();
  t1 = performance.now();
  ms = t1 - t0;
  console.log('Finished', message, 'in', ms.toFixed(2) + 'ms');
}

// Disabled timer. Print message and do nothing.
function xtimer(message) {
  console.log('*** disabled ***', message, '*** disabled ***');
}

// Return an array of items from min to max-1.
function range(min, max) {
  var r = [], i;
  for (i = min; i < max; i++) {
    r.push(i);
  }
  return r;
}

})();
