## BELAJAR DASAR JAVASCRIPT

### 1. VARIABLE
- Definisi 

`var` >> model lama, kemudian dibagi 2 :

`const` >> variable tidak bisa diubah (imutable)

`let` >> variable yg bisa diubah2 bentuk dan isinya (mutable)

- Bentuk

`string` atau character >> "satu", "dua"

`integer` atau numeric >> 1,2,3,0

`boolean` >> true/false

### 2. ARRAY


1. Create
```
const points1 = new Array(40, 100, 1, 5, 25, 10);
let points2 = [40, 100, 1, 5, 25, 10];
```

2. Tampilkan isi dalam array ke 0 

`console.log(points1[0])`

3. Periksa jumlah isi array

`console.log(points1.lenght)`

4. Periksa jika array kosong
```
//if (!array.length) {
if (array.length === 0) {
  console.log('Array is empty');
} else {
  console.log('Array is not empty');
}
```
5. Periksa apakah variable tersebut adalah array
```
if (Array.isArray(myArray)) {
  console.log('myArray is an array');
} else {
  console.log('myArray is not an array');
}
```
5. Mencari kata dalam isi array >> output variable
```
const words = ['apple', 'banana', 'orange', 'grape', 'kiwi'];
// Mencari kata "orange" dalam array
const foundWord = words.find((word) => word === 'orange');
console.log('Found word:', foundWord); // Output: orange
```
6. Mencari angka >3 dalam array >> output variable
```
const numbers = [1, 2, 3, 4, 5];
// Mencari angka lebih besar dari 3 pertama dalam array
const greaterThanThree = numbers.find((number) => number > 3);
console.log('First number greater than 3:', greaterThanThree); // Output: 4
```
7. Memeriksa apakah array mengandung variable tertentu >> output boolean true/false
```
const fruits = ['apple', 'banana', 'orange', 'grape', 'kiwi'];
// Memeriksa apakah 'banana' ada dalam array
const hasBanana = fruits.includes('banana');
console.log('Has banana:', hasBanana); // Output: true
// Memeriksa apakah 'pear' ada dalam array
const hasPear = fruits.includes('pear');
console.log('Has pear:', hasPear); // Output: false
```
8. Map >> mengambil isi tiap array dan mengubah isinya >> array baru
```
const numbers = [1, 2, 3, 4, 5];
// Mengalikan setiap angka dalam array dengan 2
const doubledNumbers = numbers.map((number) => {
  return number * 2;
});
console.log('Original array:', numbers); // Output: [1, 2, 3, 4, 5]
console.log('Doubled numbers:', doubledNumbers); // Output: [2, 4, 6, 8, 10]
```


9. Loop >> memamngil isi tiap array
```
const numbers = [1, 2, 3, 4, 5];

//for i
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
```
```
//forEach
numbers.forEach((number) => {
  console.log(number);
});
```
```
//for of
for (const number of numbers) {
  console.log(number);
}
```
### 3. OBJECT
1. Bentuk
```
let object = {
  key: 'value'
};
```
2. Cara membuat
```
let user = new Object(); // "object constructor" syntax
let user = {};  // "object literal" syntax
```
3. Bisa berisi function >> method
```
const person = {
  firstName: "John",
  lastName : "Doe",
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
};
```
4. Melihat isi object

`console.log(person.firstName)`

5. Memeriksa isi object >> output true/false
```
const obj1 = {}; // Objek kosong
const obj2 = { key: 'value' }; // Objek dengan satu properti

// Memeriksa apakah obj1 kosong
const isEmptyObj1 = Object.keys(obj1).length === 0;
console.log('Is obj1 empty?', isEmptyObj1); // Output: true

// Memeriksa apakah obj2 kosong
const isEmptyObj2 = Object.keys(obj2).length === 0;
console.log('Is obj2 empty?', isEmptyObj2); // Output: false
```

### 4. ARRAY OBJECT

1. CREATE
```
let myArray = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Peter"},
    {"id": 3, "name": "Harry"}
];
```
2. Periksa jumlah nya >> seperti operasi array

`array.length`

3.  FIND >> mencari isinya

- perintah dasar find

```
let result = arr.find(function(item, index, array) {
  // if true is returned, item is returned and iteration is stopped
  // for falsy scenario returns undefined
});
```

The function is called for elements of the array, one after another:

item is the element.
index is its index.
array is the array itself.

- find >> mencari id = 1
```
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);
console.log(user.name)

// Find the index of the first John
alert(users.findIndex(user => user.name == 'John')); // 0

```

4. PUSH >> menambahkan object ke dalam array
```
//ADD >> PUSH
// Menambahkan objek ke dalam array:
const array = []; // Membuat array kosong
const objek = { nama: "John", umur: 30 };
array.push(objek); // Menambahkan objek ke dalam array
```
5. Melihat isi dalam array object
```
//GET
// Mengakses properti objek dalam array:
const array = [{ nama: "John", umur: 30 }, { nama: "Jane", umur: 25 }];
console.log(array[0].nama); // Output: John
console.log(array[1].umur); // Output: 25
```
6. Mengubah nilai object tertentu
```
//UPDATE
//Mengubah properti objek dalam array:
const array = [{ nama: "John", umur: 30 }, { nama: "Jane", umur: 25 }];
array[0].umur = 35;
console.log(array[0].umur); // Output: 35
```
7. Menghapus isi salah satu object dalam array
```
//DELETE
//Menghapus objek dari array berdasarkan indeks:
const array = [{ nama: "John", umur: 30 }, { nama: "Jane", umur: 25 }];
array.splice(0, 1); // Menghapus objek pertama dari array
console.log(array); // Output: [{ nama: "Jane", umur: 25 }]

//Menghapus objek dari array berdasarkan properti tertentu:
const array = [{ nama: "John", umur: 30 }, { nama: "Jane", umur: 25 }];
const indeks = array.findIndex(objek => objek.nama === "John");
array.splice(indeks, 1); // Menghapus objek dengan nama "John"
console.log(array); // Output: [{ nama: "Jane", umur: 25 }]

```

2. MAP

```
//bentuk perintah dasar map
let result = arr.map(function(item, index, array) {
  // returns the new value instead of item
});
```
```
//GET >> MAP >> menampilkan semua array
// Array objek dengan daftar pengguna
const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
];

// Menggunakan metode map() untuk membuat array baru
const userStrings = users.map((user) => {
  return `${user.name} (${user.age})`;
});

// Mencetak array baru yang telah dibuat
console.log(userStrings);

```

3. FILTER >> berdasarkan kriteria tertentu

```
let results = arr.filter(function(item, index, array) {
  // if true item is pushed to results and the iteration continues
  // returns empty array if nothing found
});
```

```
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// returns array of the first two users
let someUsers = users.filter(item => item.id < 3);
console.log(someUsers)
console.log(someUsers.length); // 2
```

```
//GET >> FILTER
//filter umur diatas 28
//Menggunakan metode filter() untuk memfilter array objek berdasarkan kriteria tertentu:
const array = [{ nama: "John", umur: 30 }, { nama: "Jane", umur: 25 }];
const newArray = array.filter(objek => objek.umur > 28);
console.log(newArray); // Output: [{ nama: "John", umur: 30 }]

//GET >> FIND
//metode find() untuk mencari objek dalam array berdasarkan kriteria tertentu:
const array = [
  { id: 1, nama: "John", umur: 30 },
  { id: 2, nama: "Jane", umur: 25 },
  { id: 3, nama: "Doe", umur: 35 }
];

// Mencari objek dengan nama "Jane"
const objekJane = array.find(objek => objek.nama === "Jane");
console.log(objekJane); // Output: { id: 2, nama: "Jane", umur: 25 }

// Mencari objek dengan umur di atas 30
const objekDiatas30 = array.find(objek => objek.umur > 30);
console.log(objekDiatas30); // Output: { id: 3, nama: "Doe", umur: 35 }

// Mencari objek dengan ID 1
const objekID1 = array.find(objek => objek.id === 1);
console.log(objekID1); // Output: { id: 1, nama: "John", umur: 30 }
```

4. LOOPING

```
// Array objek dengan data pengguna
const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
];

// Menggunakan loop for...of untuk mengiterasi array objek
for (const user of users) {
  console.log(`Name: ${user.name}, Age: ${user.age}`);
}
```
```
//hasilnya
Name: Alice, Age: 30
Name: Bob, Age: 25
Name: Charlie, Age: 35

```
### 5. FUNCTION
- Function biasa
```
function greet() {
    console.log("Hello!");
}

greet(); // Memanggil fungsi greet
```
- Fungsi dengan parameter
```
function greet(name) {
    console.log("Hello, " + name + "!");
}

greet("John"); // Output: Hello, John!

```
- Fungsi dengan nilai kembalian / return
```
function add(a, b) {
    return a + b;
}

let result = add(3, 5);
console.log(result); // Output: 8

```
- Fungsi anonim (tanpa nama)
```
let greet = function(name) {
    console.log("Hello, " + name + "!");
};

greet("Jane"); // Output: Hello, Jane!

```
- Fungsi arrow
```
let greet = (name) => {
    console.log("Hello, " + name + "!");
};

greet("Alice"); // Output: Hello, Alice!

```

### 6. CALLBACK FUNCTION

Function1 >> Function2 , function 2 dijalankan walau function 1 belum selesai, biasanya operasi asyncroun

```
function fungsiSatu(name, callback) {
  console.log('Hello, ' + name + '!');

  // Simulasi penundaan 1 detik
  setTimeout(function() {
    //fungsi callback >> dipanggil setelah timer 1 detik selesai
    callback();
  }, 1000);
}

function fungsiDua() {
  console.log('Goodbye!');
}

// Memanggil fungsi greeting dengan callback farewell
fungsiSatu('John', fungsiDua);
```
Operasi ini seperti fungsi pemanggilan data ke server yang akan membutuhkan waktu / tertunda / asynchrounc

```
async function fetchData() {
    // Melakukan operasi asynchronous
    return 'Data';
}
```
```
async function fetchData() {
    let result = await fetch('https://api.example.com/data');
    let data = await result.json();
    return data;
}
```
