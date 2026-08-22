(function(){
  'use strict';
  class TableAccessibility{
    constructor(){
      for(const table of document.querySelectorAll('.weapon-table[role="table"]')){
        const rows=[...table.querySelectorAll('.weapon-row')];
        table.setAttribute('aria-colcount','7');table.setAttribute('aria-rowcount',String(rows.length));
        rows.forEach((row,rowIndex)=>{row.setAttribute('role','row');[...row.children].forEach((cell,columnIndex)=>cell.setAttribute('role',rowIndex===0?'columnheader':columnIndex===0?'rowheader':'cell'));});
      }
    }
  }

  window.DGTableAccessibility=TableAccessibility;
}());
