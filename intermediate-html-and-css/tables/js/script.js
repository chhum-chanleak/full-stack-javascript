const people = [
  {
    name: "Chris",
    age: 38
  },
  {
    name: 'Dennis',
    age: 45
  },
  {
    name: 'Sarah',
    age: 29
  },
  {
    name: 'Dennis',
    age: 47
  }
];

const createTable = (arr) => {
  const table = document.querySelector('.people-information');

  for (let i = 0; i < arr.length; i += 1) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const td2 = document.createElement('td');
    
    td.textContent = `${arr[i].name}`;
    td2.textContent = `${arr[i].age}`;
    tr.appendChild(td);
    tr.appendChild(td2);
    
    table.appendChild(tr);
  }
};