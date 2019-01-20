(function(){
  'use strict';
  var ths = document.getElementsByTagName('th');
  var sortOrder = 1;

  function rebuildTbody(rows) {
    var tbody = document.querySelector('tbody');
    while(tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    var i;
    for(i=0; i<rows.length; i++){
      tbody.appendChild(rows[i]);
    }
  }

  function updateClassName(th) {
    var k;
    for(k=0; k<ths.length; k++){
      ths[k].className = '';
    }
    th.className = sortOrder === 1 ? 'asc' : 'desc';
  }

  function compare(a, b, col, type){
    var _a = a.children[col].textContent;
    var _b = b.children[col].textContent;
    if(type === "number"){
      _a*=1;
      _b*=1;
    }else if(type === "string") {
      _a.toLowerCase();
      _b.toLowerCase();
    }
      if(_a < _b) {
        return -1;
      }
      if(_a >_b) {
        return 1;
      }
      return 0;
  }

  function sortRows(th) {
    var rows = Array.prototype.slice.call(document.querySelectorAll('tbody tr'));
    var col = th.cellIndex;
    var type = th.dataset.type
    rows.sort(function(a, b){
      return compare(a, b, col, type)*sortOrder;
    });
    return rows;
  }

  function setup() {
    var i;
    for(i=0; i < ths.length; i++){
      ths[i].addEventListener('click', function(){
        var rows;
        rows = sortRows(this);
        rebuildTbody(rows);
        updateClassName(this);
        sortOrder *= -1;
      });
    }
  }
  setup();
})();
