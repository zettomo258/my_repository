 (function(){
   'use strict';
   var timer = document.getElementById('timer');
   var start = document.getElementById('start');
   var stop = document.getElementById('stop');
   var reset = document.getElementById('reset');
   var startTime;
   var elapsedTime = 0;
   var timerId;
   var timeToAdd = 0;
   var isRunning = false;

   function updateTimerText(){
     var m = Math.floor(elapsedTime / 60000);
     var s = Math.floor(elapsedTime % 60000 /1000);
     var ms = elapsedTime % 1000;

     m = ('0' + m).slice(-2);
     s = ('0' + s).slice(-2);
     ms = ('00' + ms).slice(-3);

     timer.textContent = m + ':' + s + '.' + ms;
   }

   function countUp() {
     timerId = setTimeout(function(){
       elapsedTime = Date.now() - startTime + timeToAdd;
       updateTimerText();
       countUp();
     }, 10);
   }

   start.addEventListener('click', function(){
     if(isRunning === true){return;}
     isRunning = true;
     startTime = Date.now();
     countUp();
   });

   stop.addEventListener('click', function(){
     if(isRunning === false){return;}
     isRunning = false;
     clearTimeout(timerId);
     timeToAdd += Date.now() - startTime;
   });

   reset.addEventListener('click', function(){
     if(isRunning === true){return;}
     elapsedTime = 0;
     timeToAdd = 0;
     updateTimerText();
   });
 })();
