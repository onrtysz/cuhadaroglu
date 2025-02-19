function findKthLargest(nums: number[], k: number): number {
  // Create a heap
  const heap: number[] = [];

  nums.forEach((num) => {
    if (heap.length < k) {
      // add the number to the heap
      heap.push(num);
      // sort the heap in ascending order
      heap.sort((a, b) => a - b);
    } else if (num > heap[0]) {
      // remove the smallest element from the heap
      heap.shift();
      // add the number to the heap
      heap.push(num);
      // sort the heap in ascending order
      heap.sort((a, b) => a - b);
    }
  });
  return heap[0]; // return the smallest element in the heap
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 4
