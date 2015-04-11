// The bubble sort algorithm:
// Compare adjacent elements. If the first is greater than the second, swap them.

// Do this for each pair of adjacent elements, starting with the first two and ending 
// with the last two. At this point the last element should be the greatest. 

// Repeat the steps for all elements except the last one. 

// Continue for one less element each time, until there are no more pairs to compare.

// console.log('hello world');





// My ruby solution:
// i = 0
// a = (1..100).to_a.shuffle
// count = a.length - 1

// until count == 0
//   while i < count
//     if a[i] > a[i+1]
//       a[i], a[i+1] = a[i+1], a[i]
//     end
//     i = i + 1
//   end
//   i = 0
//   count = count - 1
// end