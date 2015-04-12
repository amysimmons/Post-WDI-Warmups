// The bubble sort algorithm:
// Compare adjacent elements. If the first is greater than the second, swap them.

// Do this for each pair of adjacent elements, starting with the first two and ending 
// with the last two. At this point the last element should be the greatest. 

// Repeat the steps for all elements except the last one. 

// Continue for one less element each time, until there are no more pairs to compare.

// console.log('hello world');

var i = 0
var a = [10, 5, 4, 3, 9, 8, 7, 1 , 2, 6];
var count = a.length - 1

console.log(a);

while (count > 0) {
  while (i < count){
    if (a[i] > a[i+1]){
      // hang onto the first value
      var x = a[i];
      // set the first value to equal the second value
      a[i] = a[i+1];
      // set the second value to equal the first value
      a[i+1] = x;
    }
    // increment i to compare the next element in the array
    i = i + 1;
  }
  // reset i to 0 so it starts comparing from the beginning
  // of the array again
  i = 0;
  // minus 1 from count so it doesn't check elements which
  // have already been sorted
  count = count - 1;
}

console.log(a);