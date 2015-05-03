/*
  speed.js

  Stack and queue performance tests for containers.js

  Author: James Abney
*/
(function() {
'use strict'

var
data1e4 = rand(0, 100, 1e4),
data1e5 = rand(0, 100, 1e5),
data12e5 = rand(0, 100, 1.2e5)
;

console.log('\nStack timing, using dequeArray implementation');
containers.dequeImpl = 'dequeArray'

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

console.log('\nQueue timing, using dequeList implementation');
containers.dequeImpl = 'dequeList'

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


function timer(message, method) {
  var t0, t1, ms;
  console.log('Running', message + '...');
  t0 = performance.now();
  method();
  t1 = performance.now();
  ms = t1 - t0;
  console.log('Finished', message, 'in', Math.round(ms) + 'ms');
}

function rand(min, max, count) {
  var r , i;
  if (count !== undefined) {
    r = [];
    for (i = 0; i < count; i++)
      r.push(Math.floor(Math.random() * (max-min)) + min);
    return r;
  }
  return Math.floor(Math.random() * (max-min)) + min;
}

function range(min, max) {
  var r = [], i;
  for (i = min; i < max; i++) {
    r.push(i);
  }
  return r;
}

})();
