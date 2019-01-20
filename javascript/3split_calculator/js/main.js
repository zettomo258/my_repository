(function(){
  'use strict';

  var price = document.getElementById('price');
  var num = document.getElementById('num');
  var unit = document.getElementById('unit');
  var btn = document.getElementById('btn');
  var result = document.getElementById('result');
  var reset = document.getElementById('reset');

  function checkInput() {
    if(price.value.match(/^[1-9][0-9]*$/) !== null && num.value.match(/^[1-9][0-9]*$/)){
      btn.classList.remove('disabled');
    } else {
      btn.classList.add('disabled');
    }
  }

  btn.addEventListener('click', function() {
    var payless;
    var short;
    var paymore;
    var over;
    var str;
    if(this.classList.contains('disabled') === true) {
      return;
    }
    payless = Math.floor(price.value / num.value / unit.value) * unit.value;
    short = price.value - (payless * num.value);
    paymore = Math.ceil(price.value / num.value / unit.value) * unit.value;
    over = Math.abs(price.value - (paymore * num.value));
    if(short === 0 && over === 0) {
      str = '一人' + (price.value / num.value) + '円ちょうどです！';
    } else {
      str =
      '一人' + payless + '円だと' + short + '円足りません。' +
      '一人' + paymore + '円だと' + over + '円余ります。' ;
    }
    result.textContent = str;
    reset.classList.remove('hidden');
  });
  price.addEventListener('keyup', checkInput);
  num.addEventListener('keyup', checkInput);
  reset.addEventListener('click', function(){
    result.textContent = 'ここに結果を表示します';
    price.value = '';
    num.value = '';
    unit.value = 100;
    btn.classList.add('disabled');
    this.classList.add('hidden');
    price.focus();
  });

  price.focus();
})();
