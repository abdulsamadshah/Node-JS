const EventEmitter = require('node:events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('Waterfull', () => {
  console.log('please turn of the water!');
  setTimeout(() => {
    console.log("please turn off the water it a genter reminder")
  }, 3000);
});

myEmitter.emit('Waterfull');