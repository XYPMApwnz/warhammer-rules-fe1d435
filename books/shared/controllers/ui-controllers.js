(function(){
  'use strict';
  class TableAccessibility{
    constructor(root=document){if(root)this.apply(root);}
    apply(root=document){
      const tables=[...(root.matches?.('.weapon-table[role="table"]')?[root]:[]),...root.querySelectorAll('.weapon-table[role="table"]')];
      for(const table of tables){
        const rows=[...table.querySelectorAll('.weapon-row')];
        table.setAttribute('aria-colcount','7');table.setAttribute('aria-rowcount',String(rows.length));
        rows.forEach((row,rowIndex)=>{row.setAttribute('role','row');[...row.children].forEach((cell,columnIndex)=>cell.setAttribute('role',rowIndex===0?'columnheader':columnIndex===0?'rowheader':'cell'));});
      }
      return root;
    }
  }

  window.DGTableAccessibility=TableAccessibility;
}());
