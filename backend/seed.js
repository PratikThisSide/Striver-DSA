import dotenv from "dotenv";
import sequelize from "./db.js";
import Topic from "./models/Topic.js";
import Problem from "./models/Problem.js";

dotenv.config();

const topics = [
  // --- LEVEL 1: BASICS ---
  {
    name: "Time Complexity",
    slug: "time-complexity",
    level: "basics",
    order: 1,
    icon: "⏱️",
    theory: {
      definition: "Time complexity is a measure of the amount of time an algorithm takes to run as a function of the input size. It helps us compare algorithm efficiency without worrying about hardware differences.",
      analogy: "Imagine you're searching for a book in a library. If books are arranged randomly, you might check every shelf (O(n) linear time). But if they're sorted alphabetically, you can use the catalog to jump to the right section instantly (O(1) constant time). The way you search determines how long it takes as the library grows.",
      javaCode: `// O(1) - Constant Time
int getFirst(int[] arr) { return arr[0]; }

// O(n) - Linear Time
int sum(int[] arr) {
  int total = 0;
  for (int x : arr) total += x;
  return total;
}

// O(n^2) - Quadratic Time
boolean hasDuplicates(int[] arr) {
  for (int i = 0; i < arr.length; i++)
    for (int j = i + 1; j < arr.length; j++)
      if (arr[i] == arr[j]) return true;
  return false;
}

// O(log n) - Logarithmic Time
int binarySearch(int[] arr, int target) {
  int lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
      complexity: { time: "Varies by algorithm", space: "O(1) typically", reasoning: "Time complexity describes how runtime grows with input size. Big-O notation gives the upper bound (worst case)." },
      edgeCases: ["Constants and lower-order terms are dropped: O(2n) → O(n)", "Different inputs may require different variables: O(n + m)", "Amortized analysis: some operations are expensive but rare (e.g., ArrayList resize)"],
      dryRun: "For an array of size n=4, a linear search checks at most 4 elements. For n=1000, it checks 1000. Binary search on sorted data checks ~log₂(1000) ≈ 10 elements. This difference grows with n.",
      fullContent: `## What is Time Complexity?

Time complexity measures how the runtime of an algorithm scales with input size. We use Big-O notation to express the upper bound.

### Common Complexities (fastest to slowest)

| Notation | Name | Example |
|----------|------|---------|
| O(1) | Constant | Array access by index |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Iterating through an array |
| O(n log n) | Linearithmic | Merge sort, Quick sort (avg) |
| O(n²) | Quadratic | Nested loops |
| O(2ⁿ) | Exponential | Recursive Fibonacci |
| O(n!) | Factorial | Generating all permutations |

### How to Calculate

1. Count the number of basic operations
2. Express as a function of input size n
3. Drop constants and lower-order terms
4. Identify the dominant term

### Rules of Thumb

- A single loop → O(n)
- Nested loops → O(n × m)
- Divide in half each step → O(log n)
- Recursion with branching → often O(2ⁿ)`,
    },
    problemCount: 1,
  },
  {
    name: "Arrays Basics",
    slug: "arrays-basics",
    level: "basics",
    order: 2,
    icon: "📊",
    theory: {
      definition: "An array is a contiguous block of memory storing elements of the same type. Each element can be accessed directly via its index in O(1) time.",
      analogy: "Think of an array like a row of lockers. Each locker has a number (index 0, 1, 2...), and you can open any locker immediately if you know its number. To add a locker at the front, though, you'd need to shift all the others down.",
      javaCode: `int[] arr = new int[5];           // declare
int[] arr2 = {1, 2, 3, 4, 5};     // initialize
arr[0] = 10;                       // write O(1)
int x = arr[2];                    // read O(1)
int len = arr.length;              // length property

// Traverse
for (int i = 0; i < arr.length; i++) { /* O(n) */ }
for (int val : arr) { /* enhanced for loop */ }

// Copy
int[] copy = Arrays.copyOf(arr, arr.length);`,
      complexity: { time: "Access O(1), Search O(n), Insertion O(n), Deletion O(n)", space: "O(n) where n is the array size", reasoning: "Access is direct via index computation. Search requires iteration in worst case. Insertion/deletion at arbitrary positions requires shifting elements." },
      edgeCases: ["ArrayIndexOutOfBoundsException: accessing index >= length or < 0", "Null array reference causes NullPointerException", "Off-by-one errors in loops (use < length, not <=)"],
      dryRun: "int[] arr = {10, 20, 30, 40, 50}; To find 30, check arr[0]=10, arr[1]=20, arr[2]=30 → found at index 2. 3 comparisons out of 5 elements.",
      fullContent: `## Arrays in Java

An array is a container object that holds a fixed number of values of a single type.

### Declaration & Initialization

\`\`\`java
// Method 1: Declare then allocate
int[] numbers;
numbers = new int[5];

// Method 2: Declare and initialize
int[] numbers = new int[]{1, 2, 3, 4, 5};

// Method 3: Anonymous array
int[] numbers = {1, 2, 3, 4, 5};
\`\`\`

### Key Operations

| Operation | Time | Description |
|-----------|------|-------------|
| Access | O(1) | arr[i] |
| Update | O(1) | arr[i] = val |
| Search | O(n) | Linear scan |
| Insert (end) | O(1) | If space available |
| Insert (middle) | O(n) | Shift elements |
| Delete | O(n) | Shift elements |

### Common Pitfalls

1. **Fixed size**: Arrays cannot grow dynamically (use ArrayList)
2. **Type safety**: All elements must be same type
3. **Reference type**: Arrays are objects, assigned by reference`,
    },
    problemCount: 1,
  },
  {
    name: "Recursion Basics",
    slug: "recursion-basics",
    level: "basics",
    order: 3,
    icon: "🔄",
    theory: {
      definition: "Recursion is a technique where a function calls itself to solve smaller instances of the same problem. Every recursive solution has a base case (termination condition) and a recursive case.",
      analogy: "Russian nesting dolls (matryoshka): to open the largest doll, you open it, find a smaller one inside, open that, and repeat until you reach the smallest doll that can't be opened (base case). Then you work your way back out.",
      javaCode: `// Factorial: n! = n * (n-1)!
int factorial(int n) {
  if (n <= 1) return 1;          // base case
  return n * factorial(n - 1);   // recursive case
}

// Fibonacci: fib(n) = fib(n-1) + fib(n-2)
int fib(int n) {
  if (n <= 1) return n;          // base cases
  return fib(n - 1) + fib(n - 2);
}

// Array sum using recursion
int sum(int[] arr, int i) {
  if (i == arr.length) return 0;
  return arr[i] + sum(arr, i + 1);
}`,
      complexity: { time: "Depends on branching: factorial O(n), naive fib O(2ⁿ), memoized fib O(n)", space: "O(n) call stack depth for linear recursion", reasoning: "Each recursive call adds a frame to the call stack. Branching recursion (like naive Fibonacci) revisits the same subproblems exponentially." },
      edgeCases: ["StackOverflowError: recursion depth too large (no tail-call optimization in Java)", "Missing base case leads to infinite recursion", "Multiple recursive calls cause exponential blowup"],
      dryRun: "factorial(4): calls factorial(3) → factorial(2) → factorial(1) returns 1, then 2*1=2, 3*2=6, 4*6=24. Stack depth = 4.",
      fullContent: `## Recursion

A recursive function solves a problem by reducing it to smaller instances of the same problem.

### Components
1. **Base case**: The simplest instance, solved directly
2. **Recursive case**: Reduce the problem and call yourself

### The Call Stack

Each recursive call pushes a new frame onto the call stack with its own local variables. When the base case returns, frames pop off in reverse order.

### Tail Recursion

When the recursive call is the last operation, it's tail-recursive. Java doesn't optimize tail calls, but other languages do, making them as efficient as loops.

### When to Use Recursion
- Tree/Graph traversal
- Divide and conquer algorithms
- Backtracking problems
- Problems with recursive structure (factorial, Fibonacci)`,
    },
    problemCount: 1,
  },

  // --- LEVEL 2: INTERMEDIATE ---
  {
    name: "Sorting Algorithms",
    slug: "sorting-algorithms",
    level: "intermediate",
    order: 4,
    icon: "🔀",
    theory: {
      definition: "Sorting arranges elements in a specific order (usually ascending or descending). Different algorithms have different trade-offs between time, space, and stability.",
      analogy: "Sorting a deck of cards: you might pick the smallest card and put it first (selection sort), or insert each card into its correct position in your hand (insertion sort), or split the deck in half, sort each half, then merge (merge sort).",
      javaCode: `// Bubble Sort
void bubbleSort(int[] arr) {
  for (int i = 0; i < arr.length - 1; i++)
    for (int j = 0; j < arr.length - 1 - i; j++)
      if (arr[j] > arr[j + 1]) swap(arr, j, j + 1);
}

// Merge Sort
void mergeSort(int[] arr, int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
      complexity: { time: "O(n²) for bubble/insertion/selection, O(n log n) for merge/quick/heap", space: "O(1) for in-place sorts, O(n) for merge sort", reasoning: "Comparison-based sorting cannot be faster than O(n log n) in the worst case." },
      edgeCases: ["Already sorted array (insertion sort is O(n))", "Reverse sorted array", "Array with duplicate elements", "Single-element or empty array"],
      dryRun: "Merge sort on [4, 2, 1, 3]: split to [4,2] and [1,3], split further to [4],[2] and [1],[3], merge [4]&[2]→[2,4], merge [1]&[3]→[1,3], merge → [1,2,3,4].",
      fullContent: `## Sorting Algorithms

### Comparison-Based Sorts

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |

### When to Use What
- Small arrays: Insertion sort (fast for nearly-sorted data)
- Large arrays: Merge sort (stable) or Quick sort (fast average)
- Memory constrained: Heap sort`,
    },
    problemCount: 0,
  },
  {
    name: "Binary Search",
    slug: "binary-search",
    level: "intermediate",
    order: 5,
    icon: "🔍",
    theory: {
      definition: "Binary search is an efficient algorithm for finding a target value in a sorted array by repeatedly dividing the search interval in half. It reduces O(n) linear search to O(log n).",
      analogy: "Looking up a word in a dictionary: instead of starting at page 1, you open the dictionary in the middle. If your word comes alphabetically after, you discard the left half and repeat with the right half. Each step eliminates half the remaining pages.",
      javaCode: `int binarySearch(int[] arr, int target) {
  int lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;  // avoid overflow
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;  // not found
}`,
      complexity: { time: "O(log n)", space: "O(1) iterative, O(log n) recursive", reasoning: "Each comparison eliminates half the remaining elements. For n=1M, log₂(1M) ≈ 20 comparisons vs 1M for linear search." },
      edgeCases: ["Empty array", "Target at edges (first or last element)", "Duplicate elements (find first/last occurrence)", "Target not in array"],
      dryRun: "Search for 7 in [1, 3, 5, 7, 9, 11]: lo=0, hi=5, mid=2 → arr[2]=5 < 7, lo=3; lo=3, hi=5, mid=4 → arr[4]=9 > 7, hi=3; lo=3, hi=3, mid=3 → arr[3]=7 == 7, return 3.",
      fullContent: `## Binary Search

Binary search is one of the most fundamental algorithms in computer science.

### Prerequisites
- The array must be sorted
- Random access (array, not linked list)

### Variants
1. **Standard**: Find exact target
2. **Lower bound**: First element >= target
3. **Upper bound**: First element > target
4. **Rotated array**: Search in rotated sorted array
5. **Search space**: Apply binary search on answer space

### Common Mistakes
1. Off-by-one: Use lo <= hi (not lo < hi)
2. Overflow: mid = lo + (hi - lo) / 2
3. Infinite loop: Ensure lo and hi update correctly

### Applications Beyond Arrays
- Finding square root
- Finding peak element
- Search in rotated array
- Binary search on answer (minimize max, etc.)`,
    },
    problemCount: 1,
  },
  {
    name: "Strings",
    slug: "strings",
    level: "intermediate",
    order: 6,
    icon: "📝",
    theory: {
      definition: "Strings are sequences of characters. In Java, String is an immutable object. Operations like concatenation create new strings, which has performance implications.",
      analogy: "A string is like a strand of beads with letters on them. Once the strand is made (string created), you can't change individual beads — you have to make a new strand.",
      javaCode: `String s = "Hello";
s = s + " World";  // creates new String

// StringBuilder for efficiency
StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(" World");
sb.insert(0, "Say ");
String result = sb.toString();

// Common operations
s.length(); s.charAt(i);
s.substring(i, j);
s.indexOf("lo");
s.equals("Hello");
s.toCharArray();`,
      complexity: { time: "Concatenation O(n+m), charAt O(1), substring O(n)", space: "O(n) for new strings", reasoning: "Immutability means every modification creates a copy. StringBuilder avoids this by using a mutable char array." },
      edgeCases: ["Empty string \"\"", "Null string", "Unicode characters (char is 16-bit, some codepoints need two chars)", "String interning with == vs .equals()"],
      dryRun: "String s = \"abc\"; s = s + \"d\"; s.charAt(3) → 'd'. But 'abc' and 'd' both exist as old String objects, now unreferenced.",
      fullContent: `## Strings in Java

### Immutability
Strings are immutable in Java for security, caching, and thread safety.

### StringBuilder vs StringBuffer
- **StringBuilder**: Not thread-safe, faster
- **StringBuffer**: Thread-safe (synchronized), slower

### Common Patterns
1. Two-pointer for palindrome checking
2. Sliding window for substring problems
3. Character frequency arrays (int[26]) for anagrams
4. KMP algorithm for pattern matching

### Performance Tips
- Use StringBuilder for multiple concatenations
- Use char[] when you need to modify individual characters
- Use String.valueOf() to convert primitives`,
    },
    problemCount: 0,
  },
  {
    name: "Linked List",
    slug: "linked-list",
    level: "intermediate",
    order: 7,
    icon: "🔗",
    theory: {
      definition: "A linked list is a linear data structure where elements (nodes) are connected via pointers. Each node contains data and a reference to the next node (and previous for doubly linked lists).",
      analogy: "A treasure hunt where each clue points to the location of the next clue. To find clue #5, you must start from clue #1 and follow each pointer. You can't jump directly to #5 like you can with array indexing.",
      javaCode: `class ListNode {
  int val;
  ListNode next;
  ListNode(int val) { this.val = val; }
}

// Traverse
ListNode curr = head;
while (curr != null) {
  System.out.print(curr.val + " ");
  curr = curr.next;
}

// Reverse
ListNode prev = null;
while (head != null) {
  ListNode next = head.next;
  head.next = prev;
  prev = head;
  head = next;
}
return prev;`,
      complexity: { time: "Access O(n), Search O(n), Insert at head O(1), Delete O(1) with pointer", space: "O(n)", reasoning: "No random access — you must traverse from head. Insertion/deletion at known position is O(1) since only pointers change." },
      edgeCases: ["Empty list (head == null)", "Single node list", "Circular references causing infinite loops", "Dual pointers (slow/fast) for cycle detection"],
      dryRun: "Reverse [1→2→3→null]: prev=null, curr=1: next=2, 1→null, prev=1, curr=2; next=3, 2→1, prev=2, curr=3; next=null, 3→2, prev=3, curr=null → return 3→2→1→null.",
      fullContent: `## Linked List

### Types
1. **Singly linked**: Each node has a next pointer
2. **Doubly linked**: Each node has next and prev pointers
3. **Circular**: Last node points back to head

### Common Techniques
- **Two pointers (slow/fast)**: Cycle detection, find middle
- **Dummy node**: Simplify edge cases for insertion/deletion
- **Recursion**: Reverse, merge, etc.

### Array vs Linked List

| Operation | Array | Linked List |
|-----------|-------|-------------|
| Access | O(1) | O(n) |
| Insert at head | O(n) | O(1) |
| Insert at tail | O(1)* | O(1) with tail ptr |
| Memory | Contiguous | Scattered |`,
    },
    problemCount: 0,
  },
  {
    name: "Stack & Queue",
    slug: "stack-queue",
    level: "intermediate",
    order: 8,
    icon: "🗂️",
    theory: {
      definition: "Stack follows LIFO (Last-In-First-Out) — like a stack of plates. Queue follows FIFO (First-In-First-Out) — like a line at a ticket counter.",
      analogy: "Stack = a pile of books: you take the top one off first (LIFO). Queue = a queue at a coffee shop: the first person in line gets served first (FIFO).",
      javaCode: `// Stack
Stack<Integer> stack = new Stack<>();
stack.push(1); stack.push(2);
int top = stack.pop();    // 2
int peek = stack.peek();  // 1

// Queue (using LinkedList)
Queue<Integer> queue = new LinkedList<>();
queue.offer(1); queue.offer(2);
int front = queue.poll(); // 1
int next = queue.peek();  // 2

// Deque (double-ended)
Deque<Integer> deque = new ArrayDeque<>();
deque.addFirst(1); deque.addLast(2);`,
      complexity: { time: "Push/pop/peek O(1), Offer/poll/peek O(1)", space: "O(n)", reasoning: "Operations only touch the top (stack) or front/back (queue), no traversal needed." },
      edgeCases: ["Empty stack/queue: pop/poll throws or returns null", "Stack overflow from too many push operations", "Bounded vs unbounded implementations"],
      dryRun: "Stack push(1), push(2), push(3), pop() → returns 3. Stack now has [1,2]. Queue offer(1), offer(2), offer(3), poll() → returns 1. Queue now has [2,3].",
      fullContent: `## Stack & Queue

### Stack Applications
- Function call stack (recursion)
- Undo/Redo in editors
- Expression evaluation (infix to postfix)
- Balanced parentheses check
- DFS traversal

### Queue Applications
- BFS traversal
- Task scheduling
- Print spooling
- Message queues
- Sliding window problems

### Monotonic Stack/Queue
A stack/queue where elements are kept in sorted order. Used for:
- Next greater element
- Largest rectangle in histogram
- Sliding window maximum`,
    },
    problemCount: 0,
  },

  // --- LEVEL 3: ADVANCED ---
  {
    name: "Trees",
    slug: "trees",
    level: "advanced",
    order: 9,
    icon: "🌳",
    theory: {
      definition: "A tree is a hierarchical data structure with a root node and child nodes forming a parent-child relationship. Binary trees have at most 2 children per node.",
      analogy: "A company org chart: the CEO (root) has VPs (children), who have managers, who have ICs. This hierarchy is natural and recursive.",
      javaCode: `class TreeNode {
  int val;
  TreeNode left, right;
  TreeNode(int val) { this.val = val; }
}

// Inorder traversal (Left-Root-Right)
void inorder(TreeNode root) {
  if (root == null) return;
  inorder(root.left);
  System.out.print(root.val + " ");
  inorder(root.right);
}

// Tree height
int height(TreeNode root) {
  if (root == null) return -1;
  return 1 + Math.max(height(root.left), height(root.right));
}`,
      complexity: { time: "Traversal O(n), Height O(n)", space: "O(h) recursion stack, O(n) worst (skewed tree)", reasoning: "Each node visited once. Recursive depth equals tree height." },
      edgeCases: ["Empty tree (null root)", "Skewed tree (like a linked list) — O(n) height", "Complete binary tree — O(log n) height", "Single node tree"],
      dryRun: "Inorder of [1 (root), left=2, right=3]: go left to 2, print 2, back to root print 1, go right to 3, print 3 → output: 2 1 3.",
      fullContent: `## Trees

### Traversal Types
1. **Preorder**: Root → Left → Right (copy tree)
2. **Inorder**: Left → Root → Right (sorted in BST)
3. **Postorder**: Left → Right → Root (delete tree)
4. **Level order**: BFS using queue

### Binary Tree Types
- **Full**: Every node has 0 or 2 children
- **Complete**: All levels filled except possibly last
- **Perfect**: All internal nodes have 2 children, all leaves same level
- **Balanced**: Height difference ≤ 1 for all nodes (AVL)

### Common Problems
- LCA (Lowest Common Ancestor)
- Diameter of tree
- Path sum
- Serialize/Deserialize
- View from left/right/top`,
    },
    problemCount: 0,
  },
  {
    name: "Binary Search Trees",
    slug: "bst",
    level: "advanced",
    order: 10,
    icon: "🌲",
    theory: {
      definition: "A Binary Search Tree (BST) is a binary tree where for every node: left subtree contains only values less than the node's value, and right subtree contains only values greater.",
      analogy: "A well-organized filing cabinet: everything less than 'M' goes in the left drawer, everything greater goes in the right drawer. Finding 'Smith' means deciding left/right at each drawer, eliminating half the files each time.",
      javaCode: `class TreeNode {
  int val;
  TreeNode left, right;
  TreeNode(int val) { this.val = val; }
}

// Search O(h)
TreeNode search(TreeNode root, int key) {
  if (root == null || root.val == key) return root;
  return key < root.val
    ? search(root.left, key)
    : search(root.right, key);
}

// Insert O(h)
TreeNode insert(TreeNode root, int val) {
  if (root == null) return new TreeNode(val);
  if (val < root.val) root.left = insert(root.left, val);
  else root.right = insert(root.right, val);
  return root;
}`,
      complexity: { time: "Search/Insert/Delete O(h) where h=height — O(log n) average, O(n) worst", space: "O(h) recursion", reasoning: "Each comparison moves down one level. Balanced tree height = log n. Skewed tree height = n." },
      edgeCases: ["Duplicate values (insert left or right, be consistent)", "Deleting node with two children (find inorder successor)", "Degenerate BST (insert sorted order = linked list)"],
      dryRun: "Search for 5 in BST with root=8, left=3, right=10: 8 > 5 → go left to 3; 3 < 5 → go right, null → not found.",
      fullContent: `## Binary Search Trees

### BST Property
\`\`\`
    left < root < right
\`\`\`

### Inorder Traversal
Inorder traversal of a BST gives elements in sorted order.

### Self-Balancing BSTs
- **AVL Tree**: Height difference ≤ 1 (rotations)
- **Red-Black Tree**: Color-coded balancing (used in TreeMap)

### Why Use BST?
- Dynamic sorted data
- Range queries (find all values between x and y)
- Order statistics (kth smallest)
- Database indexing`,
    },
    problemCount: 0,
  },
  {
    name: "Heaps",
    slug: "heaps",
    level: "advanced",
    order: 11,
    icon: "⛰️",
    theory: {
      definition: "A heap is a complete binary tree where parent nodes are either greater (max-heap) or smaller (min-heap) than children. It's the underlying structure for priority queues.",
      analogy: "A hospital emergency room: patients with the most critical condition (highest priority) are treated first, regardless of when they arrived (like a max-heap).",
      javaCode: `// Min-heap (default)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5); minHeap.offer(1); minHeap.offer(3);
int smallest = minHeap.poll();  // 1

// Max-heap
PriorityQueue<Integer> maxHeap =
  new PriorityQueue<>((a, b) -> b - a);
maxHeap.offer(5); maxHeap.offer(1);
int largest = maxHeap.poll();  // 5

// Heapify array: O(n)
// PriorityQueue in Java uses heap internally`,
      complexity: { time: "Insert O(log n), Extract min/max O(log n), Peek O(1), Heapify O(n)", space: "O(n)", reasoning: "Heap is a complete binary tree: height = log n. Insert/extract sift up/down along the height." },
      edgeCases: ["Empty heap poll returns null", "Duplicate priorities (FIFO for equal priority in Java)", "Initial capacity and comparator"],
      dryRun: "Min-heap insert [3, 1, 4]: insert 3 [3], insert 1 → 1 < 3 → swap [1, 3], insert 4 → add at end [1, 3, 4], 4 > 3 → OK. Poll: remove 1, move 4 to root, sift down: 4 > 3 → swap [3, 4]. Heap = [3, 4].",
      fullContent: `## Heaps / Priority Queues

### Heap Operations
1. **Insert**: Add at end, bubble up
2. **Extract**: Remove root, move last element to root, sift down
3. **Heapify**: Build heap from array in O(n)
4. **Peek**: View root without removing

### Applications
- Kth largest/smallest element (maintain heap of size k)
- Merge k sorted lists
- Median from data stream (two heaps)
- Dijkstra's algorithm
- Huffman coding

### Java PriorityQueue Notes
- Default is min-heap
- Use Comparator.reverseOrder() for max-heap
- Not thread-safe (use PriorityBlockingQueue)
- Iterator does NOT guarantee order`,
    },
    problemCount: 0,
  },
  {
    name: "Graphs",
    slug: "graphs",
    level: "advanced",
    order: 12,
    icon: "🕸️",
    theory: {
      definition: "A graph is a collection of vertices (nodes) connected by edges. Unlike trees, graphs can have cycles and any node can connect to any other node.",
      analogy: "A social network: people (vertices) are connected by friendships (edges). You can find mutual friends through BFS, find connected groups through DFS, and find shortest introductions through Dijkstra.",
      javaCode: `// Adjacency list
List<List<Integer>> graph = new ArrayList<>();
for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
graph.get(0).add(1);  // edge 0→1

// BFS
Queue<Integer> q = new LinkedList<>();
boolean[] visited = new boolean[n];
q.offer(start); visited[start] = true;
while (!q.isEmpty()) {
  int u = q.poll();
  for (int v : graph.get(u)) {
    if (!visited[v]) { visited[v] = true; q.offer(v); }
  }
}

// DFS
void dfs(int u, boolean[] visited, List<List<Integer>> graph) {
  visited[u] = true;
  for (int v : graph.get(u))
    if (!visited[v]) dfs(v, visited, graph);
}`,
      complexity: { time: "BFS/DFS O(V + E)", space: "O(V) for visited array + queue/stack", reasoning: "Each vertex and edge visited once in traversal." },
      edgeCases: ["Disconnected graph (run DFS/BFS from each unvisited node)", "Graph with cycle (use visited set)", "Self-loops and parallel edges", "Empty graph (V=0)"],
      dryRun: "BFS on graph 0→1, 0→2, 1→3, 2→3, start=0: queue=[0], visit 0, add 1,2 → queue=[1,2]; visit 1, add 3 → queue=[2,3]; visit 2 (3 already visited) → queue=[3]; visit 3 → done.",
      fullContent: `## Graphs

### Representation
1. **Adjacency Matrix**: O(V²) space, O(1) edge lookup
2. **Adjacency List**: O(V + E) space, O(deg) edge lookup
3. **Edge List**: O(E) space

### Traversals
- **BFS**: Queue, shortest path in unweighted graphs
- **DFS**: Stack/recursion, connectivity, cycles

### Key Algorithms
- **Dijkstra**: Shortest path (weighted, non-negative)
- **Bellman-Ford**: Shortest path (negative weights)
- **Floyd-Warshall**: All-pairs shortest path
- **Kruskal/Prim**: Minimum spanning tree
- **Topological Sort**: DAG ordering
- **Kosaraju/Tarjan**: Strongly connected components`,
    },
    problemCount: 0,
  },
  {
    name: "Greedy Algorithms",
    slug: "greedy",
    level: "advanced",
    order: 13,
    icon: "💎",
    theory: {
      definition: "Greedy algorithms make the locally optimal choice at each step, hoping to find a global optimum. They work when local optimality leads to global optimality (optimal substructure + greedy choice property).",
      analogy: "Making change with coins: to give 76¢ in US coins, you take the largest coin ≤ remainder: 50¢ (25¢ left), 25¢ (0¢ left). Always taking the largest coin gives the optimal answer with standard denominations.",
      javaCode: `// Coin change (greedy — works for standard US coins)
int coinChange(int[] coins, int amount) {
  Arrays.sort(coins); // ascending
  int count = 0;
  for (int i = coins.length - 1; i >= 0; i--) {
    while (amount >= coins[i]) {
      amount -= coins[i];
      count++;
    }
  }
  return amount == 0 ? count : -1;
}`,
      complexity: { time: "O(n) or O(n log n) if sorting needed", space: "O(1)", reasoning: "Greedy algorithms process each element once. Sorting is the most expensive step if needed." },
      edgeCases: ["Greedy doesn't work for all coin systems (e.g., coins [1, 3, 4], amount 6 → greedy gives 4+1+1=3 but optimal is 3+3=2)", "Need to prove greedy choice property"],
      dryRun: "Activity selection: jobs (1,3), (2,4), (3,5), (0,6), (5,7), sorted by end time. Pick (1,3), skip (2,4) overlaps, pick (3,5), skip (0,6), pick (5,7). Max = 3 activities.",
      fullContent: `## Greedy Algorithms

### When Greedy Works
1. **Optimal substructure**: Optimal solution contains optimal solutions to subproblems
2. **Greedy choice property**: A globally optimal solution can be built from local choices

### Classic Greedy Problems
- Activity Selection (earliest finish time)
- Huffman Coding (frequency-based tree)
- Fractional Knapsack (value/weight ratio)
- Minimum Spanning Tree (Kruskal, Prim)
- Dijkstra's Shortest Path
- Job Sequencing with Deadlines

### Greedy vs DP
- Both require optimal substructure
- Greedy: one choice, no looking back
- DP: considers all choices, stores subproblem results
- If greedy fails, use DP`,
    },
    problemCount: 0,
  },
  {
    name: "Dynamic Programming",
    slug: "dp",
    level: "advanced",
    order: 14,
    icon: "🧩",
    theory: {
      definition: "Dynamic Programming (DP) solves problems by breaking them into overlapping subproblems, solving each subproblem once, and storing results for reuse (memoization or tabulation).",
      analogy: "Calculating Fibonacci: fib(5) needs fib(4) and fib(3). fib(4) needs fib(3) and fib(2). Without DP, fib(3) is computed twice — wasteful! With DP, we compute fib(3) once and store it. Like remembering phone numbers instead of re-dialing random digits each time.",
      javaCode: `// Fibonacci with memoization (top-down)
int fib(int n, int[] memo) {
  if (n <= 1) return n;
  if (memo[n] != 0) return memo[n];
  memo[n] = fib(n-1, memo) + fib(n-2, memo);
  return memo[n];
}

// Fibonacci with tabulation (bottom-up)
int fib(int n) {
  if (n <= 1) return n;
  int[] dp = new int[n + 1];
  dp[0] = 0; dp[1] = 1;
  for (int i = 2; i <= n; i++)
    dp[i] = dp[i-1] + dp[i-2];
  return dp[n];
}`,
      complexity: { time: "O(n) for Fibonacci with DP (vs O(2ⁿ) naive)", space: "O(n) memo table", reasoning: "Each subproblem solved once. Number of subproblems × time per subproblem = total time." },
      edgeCases: ["Base cases: dp[0], dp[1] initialization", "Integer overflow for large n", "State space too large (optimize with space reduction)"],
      dryRun: "DP for fib(5): dp[0]=0, dp[1]=1, dp[2]=1, dp[3]=2, dp[4]=3, dp[5]=5. Uses previous 2 values — can optimize to O(1) space by keeping only last 2.",
      fullContent: `## Dynamic Programming

### Approaches
1. **Top-down (Memoization)**: Recursive with caching
2. **Bottom-up (Tabulation)**: Iterative, building from base cases

### DP Patterns
1. **0/1 Knapsack**: Choose or skip each item
2. **Unbounded Knapsack**: Can use each item multiple times
3. **Longest Common Subsequence**: Match/mismatch
4. **Longest Increasing Subsequence**: Include or extend
5. **Edit Distance**: Insert/delete/replace
6. **Matrix Chain Multiplication**: Split at k
7. **Palindromic DP**: Expand from center or interval DP

### Steps to Solve DP
1. Define state (what does dp[i] or dp[i][j] represent?)
2. Find recurrence (how to compute dp[i] from previous states?)
3. Set base cases
4. Determine iteration order
5. Optimize space if possible`,
    },
    problemCount: 0,
  },
  {
    name: "Tries",
    slug: "tries",
    level: "advanced",
    order: 15,
    icon: "🔤",
    theory: {
      definition: "A Trie (prefix tree) is a tree-like data structure for storing strings, where each node represents a character. Paths from root to leaf spell out words. It enables fast prefix-based lookups.",
      analogy: "A phone's contact search: as you type 'Joh', the phone immediately shows 'John', 'Johnny', 'Johnson' without searching the entire contact list. That's a Trie in action — each typed letter narrows the possibilities.",
      javaCode: `class TrieNode {
  TrieNode[] children = new TrieNode[26];
  boolean isEnd = false;
}

class Trie {
  TrieNode root = new TrieNode();

  void insert(String word) {
    TrieNode node = root;
    for (char c : word.toCharArray()) {
      int idx = c - 'a';
      if (node.children[idx] == null)
        node.children[idx] = new TrieNode();
      node = node.children[idx];
    }
    node.isEnd = true;
  }

  boolean search(String word) {
    TrieNode node = root;
    for (char c : word.toCharArray()) {
      int idx = c - 'a';
      if (node.children[idx] == null) return false;
      node = node.children[idx];
    }
    return node.isEnd;
  }

  boolean startsWith(String prefix) {
    TrieNode node = root;
    for (char c : prefix.toCharArray()) {
      int idx = c - 'a';
      if (node.children[idx] == null) return false;
      node = node.children[idx];
    }
    return true;
  }
}`,
      complexity: { time: "Insert/Search/StartsWith O(L) where L = word length", space: "O(total characters stored)", reasoning: "Each operation processes one character at a time, following or creating nodes. Space is sum of all characters in all words." },
      edgeCases: ["Empty string (root may be marked as end)", "Case sensitivity (use HashMap or 52-array)", "Memory overhead (each node has 26 references)"],
      dryRun: "Insert 'cat', 'car', 'dog': root → c→a→t (end), c→a→r (end), d→o→g (end). Search 'ca': root→c→a exists, not marked end → returns false (but startsWith returns true).",
      fullContent: `## Tries (Prefix Trees)

### Advantages
- O(L) search, independent of dictionary size
- Prefix matching is natural and fast
- Autocomplete, spell checker, IP routing

### Common Uses
1. Autocomplete/Typeahead suggestions
2. Spell checker
3. Word search in grid (with backtracking)
4. Longest prefix matching
5. IP routing (using binary tries)

### Space Optimization
- **HashMap children**: Only store existing children
- **Ternary Search Tree**: Each node has 3 children (less, equal, greater)
- **Compressed Trie (Radix Tree)**: Merge single-child nodes`,
    },
    problemCount: 0,
  },
];

const problems = [
  {
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "easy",
    tags: ["array", "hash-map"],
    topicSlug: "arrays-basics",
    order: 1,
    statement: "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target. You may assume exactly one valid solution exists, and you may not use the same element twice.",
    inputFormat: "First line: integer n (size of array)\nSecond line: n space-separated integers\nThird line: integer target",
    outputFormat: "Two space-separated integers representing indices of the two numbers.",
    constraints: "2 ≤ n ≤ 10^4\n-10^9 ≤ nums[i] ≤ 10^9\n-10^9 ≤ target ≤ 10^9",
    sampleTestCases: [
      { input: "4\n2 7 11 15\n9", expectedOutput: "0 1", isHidden: false },
      { input: "3\n3 2 4\n6", expectedOutput: "1 2", isHidden: false },
    ],
    hiddenTestCases: [
      { input: "2\n3 3\n6", expectedOutput: "0 1", isHidden: true },
      { input: "5\n1 5 3 7 9\n8", expectedOutput: "1 2", isHidden: true },
      { input: "4\n-1 -2 -3 -4\n-3", expectedOutput: "0 1", isHidden: true },
    ],
    bruteSolution: `// Brute force: O(n²) time, O(1) space
public class Main {
  public static void main(String[] args) {
    java.util.Scanner sc = new java.util.Scanner(System.in);
    int n = sc.nextInt();
    int[] nums = new int[n];
    for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
    int target = sc.nextInt();
    for (int i = 0; i < n; i++) {
      for (int j = i + 1; j < n; j++) {
        if (nums[i] + nums[j] == target) {
          System.out.println(i + " " + j);
          return;
        }
      }
    }
  }
}`,
    optimalSolution: `// Optimal: O(n) time, O(n) space using HashMap
public class Main {
  public static void main(String[] args) {
    java.util.Scanner sc = new java.util.Scanner(System.in);
    int n = sc.nextInt();
    int[] nums = new int[n];
    for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
    int target = sc.nextInt();
    java.util.Map<Integer, Integer> map = new java.util.HashMap<>();
    for (int i = 0; i < n; i++) {
      int complement = target - nums[i];
      if (map.containsKey(complement)) {
        System.out.println(map.get(complement) + " " + i);
        return;
      }
      map.put(nums[i], i);
    }
  }
}`,
    explanation: "**Brute Force:** Check every pair (i, j) where i < j. If nums[i] + nums[j] == target, return indices. O(n²) time.\n\n**Optimal (HashMap):** Iterate once. For each element, compute complement = target - nums[i]. If complement exists in the map, we found our pair. Otherwise, store current element with its index. O(n) time, O(n) space.\n\n**Key insight:** By storing values we've seen, we reduce the inner loop from O(n) to O(1) lookup.",
  },
  {
    title: "Reverse an Array",
    slug: "reverse-array",
    difficulty: "easy",
    tags: ["array", "two-pointer"],
    topicSlug: "arrays-basics",
    order: 2,
    statement: "Given an array of integers, reverse it in-place and print the reversed array.",
    inputFormat: "First line: integer n (size of array)\nSecond line: n space-separated integers",
    outputFormat: "n space-separated integers in reversed order.",
    constraints: "1 ≤ n ≤ 10^5\n-10^9 ≤ nums[i] ≤ 10^9",
    sampleTestCases: [
      { input: "5\n1 2 3 4 5", expectedOutput: "5 4 3 2 1", isHidden: false },
      { input: "3\n10 20 30", expectedOutput: "30 20 10", isHidden: false },
    ],
    hiddenTestCases: [
      { input: "1\n42", expectedOutput: "42", isHidden: true },
      { input: "6\n-5 -4 -3 -2 -1 0", expectedOutput: "0 -1 -2 -3 -4 -5", isHidden: true },
    ],
    bruteSolution: `// Brute: O(n) time, O(n) space using extra array
public class Main {
  public static void main(String[] args) {
    java.util.Scanner sc = new java.util.Scanner(System.in);
    int n = sc.nextInt();
    int[] arr = new int[n];
    for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
    int[] rev = new int[n];
    for (int i = 0; i < n; i++) rev[i] = arr[n - 1 - i];
    for (int x : rev) System.out.print(x + " ");
  }
}`,
    optimalSolution: `// Optimal: O(n) time, O(1) space — two-pointer in-place
public class Main {
  public static void main(String[] args) {
    java.util.Scanner sc = new java.util.Scanner(System.in);
    int n = sc.nextInt();
    int[] arr = new int[n];
    for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
    int i = 0, j = n - 1;
    while (i < j) {
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      i++; j--;
    }
    for (int x : arr) System.out.print(x + " ");
  }
}`,
    explanation: "**Brute Force:** Create a new array and copy elements in reverse order. O(n) time, O(n) space.\n\n**Optimal (Two-pointer):** Use two pointers, one at start and one at end. Swap elements and move pointers toward center. O(n) time, O(1) extra space.\n\n**Key insight:** In-place reversal halves the memory usage while maintaining linear time. The two-pointer technique is fundamental for many array problems.",
  },
  {
    title: "Binary Search (Find Target)",
    slug: "binary-search-find",
    difficulty: "easy",
    tags: ["binary-search", "array"],
    topicSlug: "binary-search",
    order: 1,
    statement: "Given a sorted array of integers and a target value, return the index of the target if present. If not found, return -1.",
    inputFormat: "First line: integer n (size of array)\nSecond line: n space-separated integers (sorted ascending)\nThird line: integer target",
    outputFormat: "Single integer — index of target, or -1 if not found.",
    constraints: "1 ≤ n ≤ 10^5\n-10^9 ≤ nums[i] ≤ 10^9\nArray is sorted in ascending order.",
    sampleTestCases: [
      { input: "6\n-1 0 3 5 9 12\n9", expectedOutput: "4", isHidden: false },
      { input: "6\n-1 0 3 5 9 12\n2", expectedOutput: "-1", isHidden: false },
    ],
    hiddenTestCases: [
      { input: "1\n5\n5", expectedOutput: "0", isHidden: true },
      { input: "1\n5\n3", expectedOutput: "-1", isHidden: true },
      { input: "7\n1 3 5 7 9 11 13\n7", expectedOutput: "3", isHidden: true },
    ],
    bruteSolution: `// Brute force: O(n) linear search
public class Main {
  public static void main(String[] args) {
    java.util.Scanner sc = new java.util.Scanner(System.in);
    int n = sc.nextInt();
    int[] arr = new int[n];
    for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
    int target = sc.nextInt();
    for (int i = 0; i < n; i++) {
      if (arr[i] == target) {
        System.out.println(i);
        return;
      }
    }
    System.out.println(-1);
  }
}`,
    optimalSolution: `// Optimal: O(log n) binary search
public class Main {
  public static void main(String[] args) {
    java.util.Scanner sc = new java.util.Scanner(System.in);
    int n = sc.nextInt();
    int[] arr = new int[n];
    for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
    int target = sc.nextInt();
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
      int mid = lo + (hi - lo) / 2;
      if (arr[mid] == target) {
        System.out.println(mid);
        return;
      } else if (arr[mid] < target) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    System.out.println(-1);
  }
}`,
    explanation: "**Brute Force (Linear Search):** Check every element one by one. O(n) time, O(1) space.\n\n**Optimal (Binary Search):** At each step, compare target with middle element. If equal, found. If target > middle, search right half. If target < middle, search left half. O(log n) time, O(1) space.\n\n**Key insight:** Each comparison eliminates half the remaining elements. For n=1,000,000, binary search takes ~20 comparisons vs 1,000,000 for linear search.",
  },
  {
    title: "Find First and Last Position",
    slug: "first-last-position",
    difficulty: "medium",
    tags: ["binary-search", "array"],
    topicSlug: "binary-search",
    order: 2,
    statement: "Given a sorted array of integers (may contain duplicates) and a target value, find the first and last position of the target. Return '-1 -1' if not found.",
    inputFormat: "First line: integer n\nSecond line: n space-separated integers (sorted ascending)\nThird line: integer target",
    outputFormat: "Two space-separated integers representing first and last index.",
    constraints: "1 ≤ n ≤ 10^5\n-10^9 ≤ nums[i] ≤ 10^9",
    sampleTestCases: [
      { input: "8\n1 2 3 3 3 5 6 7\n3", expectedOutput: "2 4", isHidden: false },
      { input: "6\n1 2 3 4 5 6\n8", expectedOutput: "-1 -1", isHidden: false },
    ],
    hiddenTestCases: [
      { input: "1\n5\n5", expectedOutput: "0 0", isHidden: true },
      { input: "4\n2 2 2 2\n2", expectedOutput: "0 3", isHidden: true },
    ],
    bruteSolution: `// Brute force: O(n) linear scan
public class Main {
  public static void main(String[] args) {
    java.util.Scanner sc = new java.util.Scanner(System.in);
    int n = sc.nextInt();
    int[] arr = new int[n];
    for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
    int target = sc.nextInt();
    int first = -1, last = -1;
    for (int i = 0; i < n; i++) {
      if (arr[i] == target) {
        if (first == -1) first = i;
        last = i;
      }
    }
    System.out.println(first + " " + last);
  }
}`,
    optimalSolution: `// Optimal: O(log n) using two binary searches
public class Main {
  static int findFirst(int[] arr, int target) {
    int lo = 0, hi = arr.length - 1, ans = -1;
    while (lo <= hi) {
      int mid = lo + (hi - lo) / 2;
      if (arr[mid] >= target) { hi = mid - 1; }
      else { lo = mid + 1; }
      if (arr[mid] == target) ans = mid;
    }
    return ans;
  }
  static int findLast(int[] arr, int target) {
    int lo = 0, hi = arr.length - 1, ans = -1;
    while (lo <= hi) {
      int mid = lo + (hi - lo) / 2;
      if (arr[mid] <= target) { lo = mid + 1; }
      else { hi = mid - 1; }
      if (arr[mid] == target) ans = mid;
    }
    return ans;
  }
  public static void main(String[] args) {
    java.util.Scanner sc = new java.util.Scanner(System.in);
    int n = sc.nextInt();
    int[] arr = new int[n];
    for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
    int target = sc.nextInt();
    int first = findFirst(arr, target);
    int last = findLast(arr, target);
    System.out.println(first + " " + last);
  }
}`,
    explanation: "**Brute Force:** Scan the array once, tracking first and last occurrence. O(n) time.\n\n**Optimal (Binary Search):** Run binary search twice — once modified to find the first occurrence (search left even after finding target) and once for the last (search right even after finding target). O(log n) time.\n\n**Key insight:** Standard binary search returns any occurrence. By continuing to search after finding the target, we can find the boundaries. The >= in findFirst pushes left; <= in findLast pushes right.",
  },
  
{"title":"Find Maximum Element","slug":"find-maximum","difficulty":"easy","tags":["array"],"topicSlug":"arrays-basics","order":3,"statement":"Given an array of integers, find and print the maximum element.","inputFormat":"First line: integer n\nSecond line: n space-separated integers","outputFormat":"Single integer - the maximum element.","constraints":"1 <= n <= 10^5, -10^9 <= nums[i] <= 10^9","sampleTestCases":[{"input":"5\n3 7 2 9 1","expectedOutput":"9"},{"input":"3\n-5 -2 -8","expectedOutput":"-2"}],"hiddenTestCases":[{"input":"1\n42","expectedOutput":"42"},{"input":"6\n100 200 50 300 150 250","expectedOutput":"300"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc = new java.util.Scanner(System.in); int n = sc.nextInt(); int[] arr = new int[n]; for(int i=0;i<n;i++) arr[i]=sc.nextInt(); int max=arr[0]; for(int x:arr) if(x>max) max=x; System.out.println(max); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc = new java.util.Scanner(System.in); int n = sc.nextInt(); int max=Integer.MIN_VALUE; for(int i=0;i<n;i++) { int x=sc.nextInt(); if(x>max) max=x; } System.out.println(max); } }","explanation":"Track max while reading input - O(n) time, O(1) space. No need to store the array."},
{"title":"Check if Array is Sorted","slug":"check-sorted","difficulty":"easy","tags":["array"],"topicSlug":"arrays-basics","order":4,"statement":"Given an array of integers, check if it is sorted in non-decreasing order. Print 1 if sorted, 0 otherwise.","inputFormat":"First line: integer n\nSecond line: n space-separated integers","outputFormat":"1 if sorted, 0 otherwise.","constraints":"1 <= n <= 10^5","sampleTestCases":[{"input":"5\n1 2 3 4 5","expectedOutput":"1"},{"input":"4\n1 3 2 4","expectedOutput":"0"}],"hiddenTestCases":[{"input":"1\n10","expectedOutput":"1"},{"input":"6\n1 1 2 2 3 4","expectedOutput":"1"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc = new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); for(int i=1;i<n;i++) { if(a[i]<a[i-1]) { System.out.println(0); return; } } System.out.println(1); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc = new java.util.Scanner(System.in); int n=sc.nextInt(); int prev=sc.nextInt(); for(int i=1;i<n;i++) { int cur=sc.nextInt(); if(cur<prev) { System.out.println(0); return; } prev=cur; } System.out.println(1); } }","explanation":"O(n) single pass. For i=1..n-1, if arr[i] < arr[i-1], not sorted."},
{"title":"Remove Duplicates from Sorted Array","slug":"remove-duplicates","difficulty":"easy","tags":["array","two-pointer"],"topicSlug":"arrays-basics","order":5,"statement":"Given a sorted array, remove duplicates in-place and print the number of unique elements.","inputFormat":"First line: integer n\nSecond line: n space-separated integers (sorted ascending)","outputFormat":"Single integer - count of unique elements.","constraints":"1 <= n <= 10^5","sampleTestCases":[{"input":"5\n1 1 2 2 3","expectedOutput":"3"},{"input":"3\n1 1 1","expectedOutput":"1"}],"hiddenTestCases":[{"input":"6\n0 0 1 1 2 3","expectedOutput":"4"},{"input":"1\n5","expectedOutput":"1"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); java.util.Set<Integer> s=new java.util.HashSet<>(); for(int x:a) s.add(x); System.out.println(s.size()); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); if(n==0) { System.out.println(0); return; } int j=0; for(int i=1;i<n;i++) if(a[i]!=a[j]) a[++j]=a[i]; System.out.println(j+1); } }","explanation":"Two-pointer: j tracks the last unique position. O(n) time, O(1) space."},
{"title":"Move Zeroes","slug":"move-zeroes","difficulty":"easy","tags":["array","two-pointer"],"topicSlug":"arrays-basics","order":6,"statement":"Given an array of integers, move all zeroes to the end while maintaining the relative order of non-zero elements.","inputFormat":"First line: integer n\nSecond line: n space-separated integers","outputFormat":"n space-separated integers (zeroes moved to end).","constraints":"1 <= n <= 10^5","sampleTestCases":[{"input":"5\n0 1 0 3 12","expectedOutput":"1 3 12 0 0"},{"input":"3\n0 0 1","expectedOutput":"1 0 0"}],"hiddenTestCases":[{"input":"1\n0","expectedOutput":"0"},{"input":"4\n1 2 3 4","expectedOutput":"1 2 3 4"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int[] r=new int[n]; int idx=0; for(int x:a) if(x!=0) r[idx++]=x; for(int i=0;i<n;i++) System.out.print(r[i]+\" \"); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int j=0; for(int i=0;i<n;i++) if(a[i]!=0) { int t=a[i]; a[i]=a[j]; a[j]=t; j++; } for(int x:a) System.out.print(x+\" \"); } }","explanation":"Non-zero pointer j. When a[i] != 0, swap a[i] with a[j]. O(n) time, O(1) space."},
{"title":"Rotate Array by K","slug":"rotate-array","difficulty":"medium","tags":["array"],"topicSlug":"arrays-basics","order":7,"statement":"Given an array of integers, rotate the array to the right by k steps (k is non-negative).","inputFormat":"First line: integer n\nSecond line: n space-separated integers\nThird line: integer k","outputFormat":"n space-separated integers after rotation.","constraints":"1 <= n <= 10^5, 0 <= k <= 10^5","sampleTestCases":[{"input":"7\n1 2 3 4 5 6 7\n3","expectedOutput":"5 6 7 1 2 3 4"},{"input":"4\n-1 -100 3 99\n2","expectedOutput":"3 99 -1 -100"}],"hiddenTestCases":[{"input":"5\n1 2 3 4 5\n0","expectedOutput":"1 2 3 4 5"},{"input":"3\n1 2 3\n5","expectedOutput":"2 3 1"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int k=sc.nextInt()%n; int[] r=new int[n]; for(int i=0;i<n;i++) r[(i+k)%n]=a[i]; for(int x:r) System.out.print(x+\" \"); } }","optimalSolution":"public class Main { static void rev(int[] a,int l,int r) { while(l<r){int t=a[l];a[l]=a[r];a[r]=t;l++;r--;} } public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int k=sc.nextInt()%n; rev(a,0,n-1); rev(a,0,k-1); rev(a,k,n-1); for(int x:a) System.out.print(x+\" \"); } }","explanation":"Reverse entire array, then reverse first k, then reverse last n-k. O(n) time, O(1) space."},
{"title":"Best Time to Buy and Sell Stock","slug":"best-time-stock","difficulty":"medium","tags":["array","dp"],"topicSlug":"arrays-basics","order":8,"statement":"Given an array prices where prices[i] is the stock price on day i, find the maximum profit from a single buy and sell. Return 0 if no profit possible.","inputFormat":"First line: integer n\nSecond line: n space-separated integers (prices)","outputFormat":"Single integer - maximum profit.","constraints":"1 <= n <= 10^5, 0 <= prices[i] <= 10^4","sampleTestCases":[{"input":"6\n7 1 5 3 6 4","expectedOutput":"5"},{"input":"5\n7 6 4 3 1","expectedOutput":"0"}],"hiddenTestCases":[{"input":"2\n1 2","expectedOutput":"1"},{"input":"3\n3 3 3","expectedOutput":"0"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] p=new int[n]; for(int i=0;i<n;i++) p[i]=sc.nextInt(); int max=0; for(int i=0;i<n;i++) for(int j=i+1;j<n;j++) if(p[j]-p[i]>max) max=p[j]-p[i]; System.out.println(max); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] p=new int[n]; for(int i=0;i<n;i++) p[i]=sc.nextInt(); int min=p[0],max=0; for(int i=1;i<n;i++) { if(p[i]<min) min=p[i]; else if(p[i]-min>max) max=p[i]-min; } System.out.println(max); } }","explanation":"Track minimum price seen so far. For each day, profit = price - minPrice. O(n) time, O(1) space."},
{"title":"Print 1 to N","slug":"print-1-to-n","difficulty":"easy","tags":["recursion"],"topicSlug":"recursion-basics","order":1,"statement":"Given n, print numbers from 1 to n in increasing order using recursion (no loops).","inputFormat":"Single integer n","outputFormat":"n space-separated integers (1 to n).","constraints":"1 <= n <= 1000","sampleTestCases":[{"input":"5","expectedOutput":"1 2 3 4 5"},{"input":"3","expectedOutput":"1 2 3"}],"hiddenTestCases":[{"input":"1","expectedOutput":"1"},{"input":"10","expectedOutput":"1 2 3 4 5 6 7 8 9 10"}],"bruteSolution":"public class Main { static void print(int n) { if(n==0) return; print(n-1); System.out.print(n+\" \"); } public static void main(String[] args) { int n=new java.util.Scanner(System.in).nextInt(); print(n); } }","optimalSolution":"public class Main { static void print(int i,int n) { if(i>n) return; System.out.print(i+\" \"); print(i+1,n); } public static void main(String[] args) { int n=new java.util.Scanner(System.in).nextInt(); print(1,n); } }","explanation":"print(n) calls print(n-1) first, then prints n. This prints 1 first then 2 up to n."},
{"title":"Sum of First N Numbers","slug":"sum-first-n","difficulty":"easy","tags":["recursion"],"topicSlug":"recursion-basics","order":2,"statement":"Given n, find the sum of the first n natural numbers using recursion.","inputFormat":"Single integer n","outputFormat":"Single integer - sum from 1 to n.","constraints":"1 <= n <= 10000","sampleTestCases":[{"input":"5","expectedOutput":"15"},{"input":"3","expectedOutput":"6"}],"hiddenTestCases":[{"input":"1","expectedOutput":"1"},{"input":"10","expectedOutput":"55"}],"bruteSolution":"public class Main { static int sum(int n) { if(n==1) return 1; return n+sum(n-1); } public static void main(String[] args) { int n=new java.util.Scanner(System.in).nextInt(); System.out.println(sum(n)); } }","optimalSolution":"public class Main { public static void main(String[] args) { int n=new java.util.Scanner(System.in).nextInt(); System.out.println(n*(n+1)/2); } }","explanation":"Recursive: sum(n) = n + sum(n-1), base case sum(1)=1. Formula O(1): n(n+1)/2."},
{"title":"Factorial","slug":"factorial","difficulty":"easy","tags":["recursion"],"topicSlug":"recursion-basics","order":3,"statement":"Given n, compute n! (n factorial) using recursion.","inputFormat":"Single integer n","outputFormat":"Single integer - n!.","constraints":"0 <= n <= 12","sampleTestCases":[{"input":"5","expectedOutput":"120"},{"input":"0","expectedOutput":"1"}],"hiddenTestCases":[{"input":"1","expectedOutput":"1"},{"input":"10","expectedOutput":"3628800"}],"bruteSolution":"public class Main { static int fact(int n) { if(n<=1) return 1; return n*fact(n-1); } public static void main(String[] args) { int n=new java.util.Scanner(System.in).nextInt(); System.out.println(fact(n)); } }","optimalSolution":"public class Main { static int fact(int n,int acc) { if(n<=1) return acc; return fact(n-1,acc*n); } public static void main(String[] args) { int n=new java.util.Scanner(System.in).nextInt(); System.out.println(fact(n,1)); } }","explanation":"fact(n) = n x fact(n-1), base fact(0)=fact(1)=1. Tail-recursive with accumulator."},
{"title":"Fibonacci Number","slug":"fib-recursion","difficulty":"easy","tags":["recursion"],"topicSlug":"recursion-basics","order":4,"statement":"Given n, find the nth Fibonacci number. Fib(0)=0, Fib(1)=1, Fib(n)=Fib(n-1)+Fib(n-2).","inputFormat":"Single integer n","outputFormat":"Single integer - nth Fibonacci number.","constraints":"0 <= n <= 30","sampleTestCases":[{"input":"6","expectedOutput":"8"},{"input":"0","expectedOutput":"0"}],"hiddenTestCases":[{"input":"1","expectedOutput":"1"},{"input":"10","expectedOutput":"55"}],"bruteSolution":"public class Main { static int fib(int n) { if(n<=1) return n; return fib(n-1)+fib(n-2); } public static void main(String[] args) { int n=new java.util.Scanner(System.in).nextInt(); System.out.println(fib(n)); } }","optimalSolution":"public class Main { static int fib(int n,int a,int b) { if(n==0) return a; if(n==1) return b; return fib(n-1,b,a+b); } public static void main(String[] args) { int n=new java.util.Scanner(System.in).nextInt(); System.out.println(fib(n,0,1)); } }","explanation":"Naive recursion O(2^n). Tail-recursive with accumulators tracks prev two values, O(n)."},
{"title":"Palindrome Check (Recursion)","slug":"rec-palindrome","difficulty":"easy","tags":["recursion","string"],"topicSlug":"recursion-basics","order":5,"statement":"Given a string, check if it is a palindrome using recursion. Print 1 if yes, 0 if no.","inputFormat":"Single line containing the string (lowercase letters only)","outputFormat":"1 if palindrome, 0 otherwise.","constraints":"1 <= |s| <= 1000","sampleTestCases":[{"input":"madam","expectedOutput":"1"},{"input":"hello","expectedOutput":"0"}],"hiddenTestCases":[{"input":"a","expectedOutput":"1"},{"input":"abba","expectedOutput":"1"}],"bruteSolution":"public class Main { static boolean pal(String s,int l,int r) { if(l>=r) return true; if(s.charAt(l)!=s.charAt(r)) return false; return pal(s,l+1,r-1); } public static void main(String[] args) { String s=new java.util.Scanner(System.in).next(); System.out.println(pal(s,0,s.length()-1)?1:0); } }","optimalSolution":"public class Main { static boolean pal(String s,int i) { if(i>=s.length()/2) return true; if(s.charAt(i)!=s.charAt(s.length()-1-i)) return false; return pal(s,i+1); } public static void main(String[] args) { String s=new java.util.Scanner(System.in).next(); System.out.println(pal(s,0)?1:0); } }","explanation":"Check first and last chars recursively. Base: when pointers cross, it's a palindrome. O(n)."},
{"title":"Bubble Sort","slug":"bubble-sort","difficulty":"easy","tags":["sorting"],"topicSlug":"sorting-algorithms","order":1,"statement":"Given an array of integers, sort it in ascending order using Bubble Sort.","inputFormat":"First line: integer n\nSecond line: n space-separated integers","outputFormat":"n space-separated integers (sorted ascending).","constraints":"1 <= n <= 1000","sampleTestCases":[{"input":"6\n64 34 25 12 22 11","expectedOutput":"11 12 22 25 34 64"},{"input":"3\n3 2 1","expectedOutput":"1 2 3"}],"hiddenTestCases":[{"input":"1\n42","expectedOutput":"42"},{"input":"5\n5 1 4 2 8","expectedOutput":"1 2 4 5 8"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); for(int i=0;i<n-1;i++) for(int j=0;j<n-1-i;j++) if(a[j]>a[j+1]){int t=a[j];a[j]=a[j+1];a[j+1]=t;} for(int x:a) System.out.print(x+\" \"); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); for(int i=0;i<n-1;i++) { boolean sw=false; for(int j=0;j<n-1-i;j++) if(a[j]>a[j+1]){int t=a[j];a[j]=a[j+1];a[j+1]=t;sw=true;} if(!sw) break; } for(int x:a) System.out.print(x+\" \"); } }","explanation":"Bubble sort: swap adjacent elements if out of order. Largest bubbles to end each pass. Optimized: stop early if no swaps."},
{"title":"Selection Sort","slug":"selection-sort","difficulty":"easy","tags":["sorting"],"topicSlug":"sorting-algorithms","order":2,"statement":"Sort an array using Selection Sort.","inputFormat":"First line: integer n\nSecond line: n space-separated integers","outputFormat":"n space-separated integers (sorted ascending).","constraints":"1 <= n <= 1000","sampleTestCases":[{"input":"5\n64 25 12 22 11","expectedOutput":"11 12 22 25 64"},{"input":"4\n4 3 2 1","expectedOutput":"1 2 3 4"}],"hiddenTestCases":[{"input":"2\n2 1","expectedOutput":"1 2"},{"input":"6\n29 10 14 37 13 33","expectedOutput":"10 13 14 29 33 37"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); for(int i=0;i<n-1;i++) { int m=i; for(int j=i+1;j<n;j++) if(a[j]<a[m]) m=j; int t=a[i];a[i]=a[m];a[m]=t; } for(int x:a) System.out.print(x+\" \"); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); for(int i=0;i<n-1;i++) { int m=i; for(int j=i+1;j<n;j++) if(a[j]<a[m]) m=j; int t=a[i];a[i]=a[m];a[m]=t; } for(int x:a) System.out.print(x+\" \"); } }","explanation":"Find minimum in unsorted portion, swap to front. O(n^2) always - no early termination."},
{"title":"Insertion Sort","slug":"insertion-sort","difficulty":"easy","tags":["sorting"],"topicSlug":"sorting-algorithms","order":3,"statement":"Sort an array using Insertion Sort.","inputFormat":"First line: integer n\nSecond line: n space-separated integers","outputFormat":"n space-separated integers (sorted ascending).","constraints":"1 <= n <= 1000","sampleTestCases":[{"input":"6\n12 11 13 5 6","expectedOutput":"5 6 11 12 13"},{"input":"4\n4 3 2 1","expectedOutput":"1 2 3 4"}],"hiddenTestCases":[{"input":"1\n7","expectedOutput":"7"},{"input":"5\n3 1 5 2 4","expectedOutput":"1 2 3 4 5"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); for(int i=1;i<n;i++) { int k=a[i],j=i-1; while(j>=0&&a[j]>k) { a[j+1]=a[j]; j--; } a[j+1]=k; } for(int x:a) System.out.print(x+\" \"); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); for(int i=1;i<n;i++) { int k=a[i],j=i-1; while(j>=0&&a[j]>k) { a[j+1]=a[j]; j--; } a[j+1]=k; } for(int x:a) System.out.print(x+\" \"); } }","explanation":"Build sorted array one at a time. Pick element, shift larger right, insert. Best case O(n) (already sorted)."},
{"title":"Merge Two Sorted Arrays","slug":"merge-two-sorted","difficulty":"easy","tags":["sorting","array"],"topicSlug":"sorting-algorithms","order":4,"statement":"Given two sorted arrays, merge them into a single sorted array.","inputFormat":"First line: integer n\nSecond line: n sorted integers\nThird line: integer m\nFourth line: m sorted integers","outputFormat":"(n+m) space-separated integers (sorted).","constraints":"1 <= n,m <= 10^5","sampleTestCases":[{"input":"4\n1 3 5 7\n4\n2 4 6 8","expectedOutput":"1 2 3 4 5 6 7 8"},{"input":"2\n1 2\n2\n3 4","expectedOutput":"1 2 3 4"}],"hiddenTestCases":[{"input":"3\n1 1 1\n3\n1 1 1","expectedOutput":"1 1 1 1 1 1"},{"input":"1\n5\n1\n10","expectedOutput":"5 10"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int m=sc.nextInt(); int[] b=new int[m]; for(int i=0;i<m;i++) b[i]=sc.nextInt(); int[] r=new int[n+m]; int i=0,j=0,k=0; while(i<n&&j<m) r[k++]=a[i]<=b[j]?a[i++]:b[j++]; while(i<n) r[k++]=a[i++]; while(j<m) r[k++]=b[j++]; for(int x:r) System.out.print(x+\" \"); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int m=sc.nextInt(); int[] b=new int[m]; for(int i=0;i<m;i++) b[i]=sc.nextInt(); int i=0,j=0; while(i<n||j<m) { boolean takeA=j>=m||(i<n&&a[i]<=b[j]); System.out.print((takeA?a[i++]:b[j++])+\" \"); } } }","explanation":"Two-pointer: compare, take smaller, advance. O(n+m) time."},
{"title":"Sort Colors (0s, 1s, 2s)","slug":"sort-colors","difficulty":"medium","tags":["sorting","array"],"topicSlug":"sorting-algorithms","order":5,"statement":"Given an array containing only 0s, 1s, and 2s, sort it in ascending order in one pass O(n).","inputFormat":"First line: integer n\nSecond line: n integers (each 0, 1, or 2)","outputFormat":"n space-separated integers (sorted).","constraints":"1 <= n <= 10^5","sampleTestCases":[{"input":"6\n2 0 2 1 1 0","expectedOutput":"0 0 1 1 2 2"},{"input":"3\n0 1 2","expectedOutput":"0 1 2"}],"hiddenTestCases":[{"input":"1\n1","expectedOutput":"1"},{"input":"5\n2 2 2 2 2","expectedOutput":"2 2 2 2 2"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); java.util.Arrays.sort(a); for(int x:a) System.out.print(x+\" \"); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int l=0,m=0,h=n-1; while(m<=h) { if(a[m]==0){int t=a[l];a[l]=a[m];a[m]=t;l++;m++;} else if(a[m]==1) m++; else {int t=a[m];a[m]=a[h];a[h]=t;h--;} } for(int x:a) System.out.print(x+\" \"); } }","explanation":"Dutch National Flag: three pointers. 0s go left, 2s go right, 1s stay middle. One pass O(n)."},
{"title":"Search Insert Position","slug":"search-insert","difficulty":"easy","tags":["binary-search"],"topicSlug":"binary-search","order":3,"statement":"Given a sorted array and a target, return the index where target would be inserted to maintain order.","inputFormat":"First line: integer n\nSecond line: n sorted integers\nThird line: integer target","outputFormat":"Single integer - insert position.","constraints":"1 <= n <= 10^5","sampleTestCases":[{"input":"4\n1 3 5 6\n5","expectedOutput":"2"},{"input":"4\n1 3 5 6\n2","expectedOutput":"1"}],"hiddenTestCases":[{"input":"4\n1 3 5 6\n0","expectedOutput":"0"},{"input":"4\n1 3 5 6\n7","expectedOutput":"4"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int t=sc.nextInt(); for(int i=0;i<n;i++) if(a[i]>=t) { System.out.println(i); return; } System.out.println(n); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int t=sc.nextInt(),lo=0,hi=n; while(lo<hi) { int m=lo+(hi-lo)/2; if(a[m]>=t) hi=m; else lo=m+1; } System.out.println(lo); } }","explanation":"Lower bound binary search: first position where arr[pos] >= target. O(log n)."},
{"title":"Find Floor in Sorted Array","slug":"find-floor","difficulty":"easy","tags":["binary-search"],"topicSlug":"binary-search","order":4,"statement":"Given a sorted array and a target, find the floor (largest element <= target). Print -1 if none.","inputFormat":"First line: integer n\nSecond line: n sorted integers\nThird line: integer target","outputFormat":"Single integer - floor value (or -1).","constraints":"1 <= n <= 10^5","sampleTestCases":[{"input":"6\n1 2 8 10 11 12\n5","expectedOutput":"2"},{"input":"6\n1 2 8 10 11 12\n10","expectedOutput":"10"}],"hiddenTestCases":[{"input":"3\n1 3 5\n0","expectedOutput":"-1"},{"input":"3\n1 3 5\n6","expectedOutput":"5"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int t=sc.nextInt(),ans=-1; for(int x:a) if(x<=t) ans=x; System.out.println(ans); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int t=sc.nextInt(),lo=0,hi=n-1,ans=-1; while(lo<=hi) { int m=lo+(hi-lo)/2; if(a[m]<=t) { ans=a[m]; lo=m+1; } else hi=m-1; } System.out.println(ans); } }","explanation":"Binary search for largest element <= target. When a[mid] <= target, save and search right."},
{"title":"Count Occurrences","slug":"count-occurrences","difficulty":"easy","tags":["binary-search"],"topicSlug":"binary-search","order":5,"statement":"Given a sorted array (may contain duplicates) and a target, count how many times target appears.","inputFormat":"First line: integer n\nSecond line: n sorted integers\nThird line: integer target","outputFormat":"Single integer - count of target.","constraints":"1 <= n <= 10^5","sampleTestCases":[{"input":"8\n1 2 3 3 3 5 6 7\n3","expectedOutput":"3"},{"input":"5\n1 1 2 2 3\n4","expectedOutput":"0"}],"hiddenTestCases":[{"input":"3\n1 1 1\n1","expectedOutput":"3"},{"input":"4\n2 4 6 8\n5","expectedOutput":"0"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int t=sc.nextInt(),cnt=0; for(int x:a) if(x==t) cnt++; System.out.println(cnt); } }","optimalSolution":"public class Main { static int first(int[] a,int t) { int l=0,r=a.length-1,ans=-1; while(l<=r){int m=l+(r-l)/2; if(a[m]>=t){r=m-1;} else{l=m+1;} if(a[m]==t) ans=m;} return ans; } static int last(int[] a,int t) { int l=0,r=a.length-1,ans=-1; while(l<=r){int m=l+(r-l)/2; if(a[m]<=t){l=m+1;} else{r=m-1;} if(a[m]==t) ans=m;} return ans; } public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int t=sc.nextInt(); int f=first(a,t); if(f==-1) System.out.println(0); else System.out.println(last(a,t)-f+1); } }","explanation":"Find first and last occurrence via binary search, then last-first+1 = count. O(log n)."},
{"title":"Search in Rotated Sorted Array","slug":"search-rotated","difficulty":"medium","tags":["binary-search"],"topicSlug":"binary-search","order":6,"statement":"Given a rotated sorted array, find the index of a target. Return -1 if not found.","inputFormat":"First line: integer n\nSecond line: n integers (rotated sorted)\nThird line: integer target","outputFormat":"Single integer - index of target, or -1.","constraints":"1 <= n <= 10^5","sampleTestCases":[{"input":"7\n4 5 6 7 0 1 2\n0","expectedOutput":"4"},{"input":"7\n4 5 6 7 0 1 2\n3","expectedOutput":"-1"}],"hiddenTestCases":[{"input":"6\n1 2 3 4 5 6\n5","expectedOutput":"4"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int t=sc.nextInt(); for(int i=0;i<n;i++) if(a[i]==t) { System.out.println(i); return; } System.out.println(-1); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int t=sc.nextInt(),lo=0,hi=n-1; while(lo<=hi) { int m=lo+(hi-lo)/2; if(a[m]==t) { System.out.println(m); return; } if(a[lo]<=a[m]) { if(t>=a[lo]&&t<a[m]) hi=m-1; else lo=m+1; } else { if(t>a[m]&&t<=a[hi]) lo=m+1; else hi=m-1; } } System.out.println(-1); } }","explanation":"Modified binary search: identify sorted half, check if target lies there, else search other half. O(log n)."},
{"title":"Reverse a String","slug":"reverse-string-easy","difficulty":"easy","tags":["string"],"topicSlug":"strings","order":1,"statement":"Given a string, reverse it and print the result.","inputFormat":"Single line containing the string","outputFormat":"Reversed string.","constraints":"1 <= |s| <= 1000","sampleTestCases":[{"input":"hello","expectedOutput":"olleh"},{"input":"Java","expectedOutput":"avaJ"}],"hiddenTestCases":[{"input":"a","expectedOutput":"a"},{"input":"racecar","expectedOutput":"racecar"}],"bruteSolution":"public class Main { public static void main(String[] args) { String s=new java.util.Scanner(System.in).next(); for(int i=s.length()-1;i>=0;i--) System.out.print(s.charAt(i)); } }","optimalSolution":"public class Main { public static void main(String[] args) { String s=new java.util.Scanner(System.in).next(); System.out.println(new StringBuilder(s).reverse()); } }","explanation":"O(n) either way. StringBuilder.reverse() uses char array swap internally."},
{"title":"Valid Anagram","slug":"valid-anagram","difficulty":"easy","tags":["string","hash-map"],"topicSlug":"strings","order":2,"statement":"Given two strings s and t, check if t is an anagram of s. Print 1 if yes, 0 if no.","inputFormat":"First line: string s\nSecond line: string t","outputFormat":"1 if anagram, 0 otherwise.","constraints":"1 <= |s|,|t| <= 10^5 (lowercase letters)","sampleTestCases":[{"input":"anagram\nnagaram","expectedOutput":"1"},{"input":"rat\ncar","expectedOutput":"0"}],"hiddenTestCases":[{"input":"a\na","expectedOutput":"1"},{"input":"ab\nba","expectedOutput":"1"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); String s=sc.next(),t=sc.next(); char[] a=s.toCharArray(),b=t.toCharArray(); java.util.Arrays.sort(a); java.util.Arrays.sort(b); System.out.println(java.util.Arrays.equals(a,b)?1:0); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); String s=sc.next(),t=sc.next(); if(s.length()!=t.length()) { System.out.println(0); return; } int[] f=new int[26]; for(char c:s.toCharArray()) f[c-'a']++; for(char c:t.toCharArray()) if(--f[c-'a']<0) { System.out.println(0); return; } System.out.println(1); } }","explanation":"Frequency array (size 26). Increment for s, decrement for t. O(n) time, O(1) space."},
{"title":"First Non-Repeating Character","slug":"first-non-repeating","difficulty":"easy","tags":["string","hash-map"],"topicSlug":"strings","order":3,"statement":"Given a string, find the first non-repeating character and print its index. If none, print -1.","inputFormat":"Single line containing the string (lowercase letters only)","outputFormat":"Index of first non-repeating character, or -1.","constraints":"1 <= |s| <= 10^5","sampleTestCases":[{"input":"leetcode","expectedOutput":"0"},{"input":"aabb","expectedOutput":"-1"}],"hiddenTestCases":[{"input":"loveleetcode","expectedOutput":"2"},{"input":"a","expectedOutput":"0"}],"bruteSolution":"public class Main { public static void main(String[] args) { String s=new java.util.Scanner(System.in).next(); for(int i=0;i<s.length();i++) { boolean dup=false; for(int j=0;j<s.length();j++) if(i!=j&&s.charAt(i)==s.charAt(j)) dup=true; if(!dup) { System.out.println(i); return; } } System.out.println(-1); } }","optimalSolution":"public class Main { public static void main(String[] args) { String s=new java.util.Scanner(System.in).next(); int[] f=new int[26]; for(char c:s.toCharArray()) f[c-'a']++; for(int i=0;i<s.length();i++) if(f[s.charAt(i)-'a']==1) { System.out.println(i); return; } System.out.println(-1); } }","explanation":"Count frequencies, then scan for first char with freq 1. O(n) time, O(1) space."},
{"title":"Longest Common Prefix","slug":"longest-common-prefix","difficulty":"easy","tags":["string"],"topicSlug":"strings","order":4,"statement":"Given an array of strings, find the longest common prefix. If none, print empty line.","inputFormat":"First line: integer n\nNext n lines: each string","outputFormat":"The longest common prefix string.","constraints":"1 <= n <= 200, 0 <= |s| <= 200","sampleTestCases":[{"input":"3\nflower\nflow\nflight","expectedOutput":"fl"},{"input":"3\ndog\nracecar\ncar","expectedOutput":""}],"hiddenTestCases":[{"input":"2\napple\napril","expectedOutput":"ap"},{"input":"1\nhello","expectedOutput":"hello"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); String[] a=new String[n]; for(int i=0;i<n;i++) a[i]=sc.next(); if(n==0) return; String p=a[0]; for(String s:a) while(s.indexOf(p)!=0) p=p.substring(0,p.length()-1); System.out.println(p); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); String[] a=new String[n]; for(int i=0;i<n;i++) a[i]=sc.next(); if(a.length==0) return; for(int i=0;i<a[0].length();i++) { char c=a[0].charAt(i); for(int j=1;j<a.length;j++) if(i>=a[j].length()||a[j].charAt(i)!=c) { System.out.println(a[0].substring(0,i)); return; } } System.out.println(a[0]); } }","explanation":"Take first string as prefix. Compare char by char across all strings. Stop on mismatch."},
{"title":"Longest Substring Without Repeating Characters","slug":"longest-substring-norepeat","difficulty":"medium","tags":["string","sliding-window"],"topicSlug":"strings","order":5,"statement":"Given a string, find the length of the longest substring without repeating characters.","inputFormat":"Single line containing the string","outputFormat":"Single integer - maximum length.","constraints":"1 <= |s| <= 10^5","sampleTestCases":[{"input":"abcabcbb","expectedOutput":"3"},{"input":"bbbbb","expectedOutput":"1"}],"hiddenTestCases":[{"input":"pwwkew","expectedOutput":"3"},{"input":"","expectedOutput":"0"}],"bruteSolution":"public class Main { public static void main(String[] args) { String s=new java.util.Scanner(System.in).next(); int max=0; for(int i=0;i<s.length();i++) { boolean[] seen=new boolean[256]; for(int j=i;j<s.length();j++) { if(seen[s.charAt(j)]) break; seen[s.charAt(j)]=true; max=Math.max(max,j-i+1); } } System.out.println(max); } }","optimalSolution":"public class Main { public static void main(String[] args) { String s=new java.util.Scanner(System.in).next(); int[] idx=new int[256]; int l=0,max=0; for(int r=0;r<s.length();r++) { l=Math.max(l,idx[s.charAt(r)]); max=Math.max(max,r-l+1); idx[s.charAt(r)]=r+1; } System.out.println(max); } }","explanation":"Sliding window: expand right, track last index of each char. When duplicate found, move left past it. O(n)."},
{"title":"Reverse a Linked List","slug":"reverse-linked-list","difficulty":"easy","tags":["linked-list"],"topicSlug":"linked-list","order":1,"statement":"Given a linked list, reverse it and print the reversed list.","inputFormat":"First line: integer n\nSecond line: n space-separated integers (linked list values)","outputFormat":"n space-separated integers (reversed).","constraints":"1 <= n <= 10^5","sampleTestCases":[{"input":"5\n1 2 3 4 5","expectedOutput":"5 4 3 2 1"},{"input":"2\n10 20","expectedOutput":"20 10"}],"hiddenTestCases":[{"input":"1\n42","expectedOutput":"42"},{"input":"3\n7 8 9","expectedOutput":"9 8 7"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); for(int i=n-1;i>=0;i--) System.out.print(a[i]+\" \"); } }","optimalSolution":"public class Main { static class Node { int val; Node next; Node(int v){val=v;} } public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); Node head=null,prev=null; if(n>0){head=new Node(sc.nextInt());prev=head; for(int i=1;i<n;i++){Node t=new Node(sc.nextInt());prev.next=t;prev=t;}} Node cur=head,pr=null; while(cur!=null){Node nx=cur.next;cur.next=pr;pr=cur;cur=nx;} while(pr!=null){System.out.print(pr.val+\" \");pr=pr.next;} } }","explanation":"Reverse pointers: for each node, save next, point current.next to prev, advance. O(n) time, O(1) space."},
{"title":"Middle of Linked List","slug":"middle-linked-list","difficulty":"easy","tags":["linked-list"],"topicSlug":"linked-list","order":2,"statement":"Given a linked list, find the middle element. If even length, return the second middle.","inputFormat":"First line: integer n\nSecond line: n space-separated integers","outputFormat":"Single integer - middle element value.","constraints":"1 <= n <= 10^5","sampleTestCases":[{"input":"5\n1 2 3 4 5","expectedOutput":"3"},{"input":"4\n1 2 3 4","expectedOutput":"3"}],"hiddenTestCases":[{"input":"2\n10 20","expectedOutput":"20"},{"input":"1\n7","expectedOutput":"7"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); System.out.println(a[n/2]); } }","optimalSolution":"public class Main { static class Node { int val; Node next; Node(int v){val=v;} } public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); Node head=null,prev=null; if(n>0){head=new Node(sc.nextInt());prev=head; for(int i=1;i<n;i++){Node t=new Node(sc.nextInt());prev.next=t;prev=t;}} Node s=head,f=head; while(f!=null&&f.next!=null){s=s.next;f=f.next.next;} System.out.println(s.val); } }","explanation":"Tortoise and Hare: slow 1 step, fast 2 steps. When fast ends, slow is at middle. O(n/2)."},
{"title":"Detect Cycle in Linked List","slug":"detect-cycle-ll","difficulty":"easy","tags":["linked-list"],"topicSlug":"linked-list","order":3,"statement":"Given a linked list, detect if it has a cycle. Print 1 if cycle, 0 if not. Input includes pos where tail connects (-1 = no cycle).","inputFormat":"First line: integer n\nSecond line: n space-separated integers\nThird line: integer pos","outputFormat":"1 if cycle, 0 otherwise.","constraints":"1 <= n <= 10^4","sampleTestCases":[{"input":"4\n3 2 0 -4\n1","expectedOutput":"1"},{"input":"4\n1 2 3 4\n-1","expectedOutput":"0"}],"hiddenTestCases":[{"input":"2\n1 2\n0","expectedOutput":"1"},{"input":"1\n5\n-1","expectedOutput":"0"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int pos=sc.nextInt(); System.out.println(pos>=0?1:0); } }","optimalSolution":"public class Main { static class Node { int val; Node next; Node(int v){val=v;} } public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); Node head=null,prev=null,tail=null; for(int i=0;i<n;i++){Node t=new Node(sc.nextInt());if(head==null)head=t;else prev.next=t;prev=t;tail=t;} int pos=sc.nextInt(); if(pos>=0){Node c=head;for(int i=0;i<pos;i++)c=c.next;tail.next=c;} Node s=head,f=head; while(f!=null&&f.next!=null){s=s.next;f=f.next.next;if(s==f){System.out.println(1);return;}} System.out.println(0); } }","explanation":"Floyd's cycle detection: slow and fast pointer. If they meet, cycle exists. O(n)."},

{"title":"Valid Parentheses","slug":"valid-parentheses","difficulty":"easy","tags":["stack"],"topicSlug":"stack-queue","order":1,"statement":"Given a string containing just '(', ')', '{', '}', '[', ']', determine if it is valid (brackets close correctly in order).","inputFormat":"Single line containing the bracket string","outputFormat":"1 if valid, 0 otherwise.","constraints":"1 <= |s| <= 10^4","sampleTestCases":[{"input":"()[]{}","expectedOutput":"1"},{"input":"(]","expectedOutput":"0"}],"hiddenTestCases":[{"input":"()","expectedOutput":"1"},{"input":"([)]","expectedOutput":"0"}],"bruteSolution":"public class Main { public static void main(String[] args) { String s=new java.util.Scanner(System.in).next(); while(s.contains(\"()\")||s.contains(\"{}\")||s.contains(\"[]\")) { s=s.replace(\"()\",\"\"); s=s.replace(\"{}\",\"\"); s=s.replace(\"[]\",\"\"); } System.out.println(s.isEmpty()?1:0); } }","optimalSolution":"public class Main { public static void main(String[] args) { String s=new java.util.Scanner(System.in).next(); java.util.Stack<Character> st=new java.util.Stack<>(); for(char c:s.toCharArray()) { if(c=='(') st.push(')'); else if(c=='{') st.push('}'); else if(c=='[') st.push(']'); else if(st.isEmpty()||st.pop()!=c) { System.out.println(0); return; } } System.out.println(st.isEmpty()?1:0); } }","explanation":"Push expected closing brackets. When a closing bracket appears, it must match the top. O(n)."},
{"title":"Min Stack","slug":"min-stack","difficulty":"easy","tags":["stack"],"topicSlug":"stack-queue","order":2,"statement":"Implement a stack that supports push, pop, top, and retrieving the minimum element in O(1) time.","inputFormat":"First line: integer q (number of operations)\nNext q lines: push x | pop | top | getMin","outputFormat":"Output results of top and getMin operations, each on a new line.","constraints":"1 <= q <= 10^5, -10^9 <= x <= 10^9","sampleTestCases":[{"input":"8\npush -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin","expectedOutput":"-3\n0\n-2"}],"hiddenTestCases":[{"input":"3\npush 1\ngetMin\npop","expectedOutput":"1"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int q=sc.nextInt(); java.util.Stack<Integer> st=new java.util.Stack<>(); for(int i=0;i<q;i++) { String op=sc.next(); if(op.equals(\"push\")) st.push(sc.nextInt()); else if(op.equals(\"pop\")) st.pop(); else if(op.equals(\"top\")) System.out.println(st.peek()); else if(op.equals(\"getMin\")) { int min=Integer.MAX_VALUE; for(int x:st) if(x<min) min=x; System.out.println(min); } } } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int q=sc.nextInt(); java.util.Stack<Integer> st=new java.util.Stack<>(); java.util.Stack<Integer> minSt=new java.util.Stack<>(); for(int i=0;i<q;i++) { String op=sc.next(); if(op.equals(\"push\")) { int x=sc.nextInt(); st.push(x); if(minSt.isEmpty()||x<=minSt.peek()) minSt.push(x); } else if(op.equals(\"pop\")) { if(st.pop().equals(minSt.peek())) minSt.pop(); } else if(op.equals(\"top\")) System.out.println(st.peek()); else if(op.equals(\"getMin\")) System.out.println(minSt.peek()); } } }","explanation":"Maintain a separate minStack that tracks the current minimum. O(1) for all operations."},
{"title":"Next Greater Element","slug":"next-greater","difficulty":"medium","tags":["stack"],"topicSlug":"stack-queue","order":3,"statement":"Given an array, for each element find the next greater element (to the right). If none, print -1.","inputFormat":"First line: integer n\nSecond line: n space-separated integers","outputFormat":"n space-separated integers (next greater for each).","constraints":"1 <= n <= 10^5","sampleTestCases":[{"input":"4\n4 5 2 25","expectedOutput":"5 25 25 -1"},{"input":"3\n2 3 1","expectedOutput":"3 -1 -1"}],"hiddenTestCases":[{"input":"5\n1 2 3 4 5","expectedOutput":"2 3 4 5 -1"},{"input":"1\n10","expectedOutput":"-1"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); for(int i=0;i<n;i++) { int ng=-1; for(int j=i+1;j<n;j++) if(a[j]>a[i]) { ng=a[j]; break; } System.out.print(ng+\" \"); } } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int[] nge=new int[n]; java.util.Stack<Integer> st=new java.util.Stack<>(); for(int i=n-1;i>=0;i--) { while(!st.isEmpty()&&st.peek()<=a[i]) st.pop(); nge[i]=st.isEmpty()?-1:st.peek(); st.push(a[i]); } for(int x:nge) System.out.print(x+\" \"); } }","explanation":"Monotonic stack: traverse from right, maintain decreasing stack. O(n)."},
{"title":"Daily Temperatures","slug":"daily-temperatures","difficulty":"medium","tags":["stack","array"],"topicSlug":"stack-queue","order":4,"statement":"Given temperatures array, for each day find how many days until a warmer temperature. If none, 0.","inputFormat":"First line: integer n\nSecond line: n space-separated integers (temperatures)","outputFormat":"n space-separated integers (days until warmer).","constraints":"1 <= n <= 10^5, 30 <= temp[i] <= 100","sampleTestCases":[{"input":"8\n73 74 75 71 69 72 76 73","expectedOutput":"1 1 4 2 1 1 0 0"},{"input":"2\n75 72","expectedOutput":"0 0"}],"hiddenTestCases":[{"input":"3\n80 85 90","expectedOutput":"1 1 0"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] t=new int[n]; for(int i=0;i<n;i++) t[i]=sc.nextInt(); for(int i=0;i<n;i++) { int d=0; for(int j=i+1;j<n;j++) if(t[j]>t[i]) { d=j-i; break; } System.out.print(d+\" \"); } } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] t=new int[n]; for(int i=0;i<n;i++) t[i]=sc.nextInt(); int[] ans=new int[n]; java.util.Stack<Integer> st=new java.util.Stack<>(); for(int i=0;i<n;i++) { while(!st.isEmpty()&&t[i]>t[st.peek()]) { int idx=st.pop(); ans[idx]=i-idx; } st.push(i); } for(int x:ans) System.out.print(x+\" \"); } }","explanation":"Monotonic stack of indices. When warmer temp found, pop and calculate days difference. O(n)."},
{"title":"Binary Tree Inorder Traversal","slug":"inorder-traversal","difficulty":"easy","tags":["tree"],"topicSlug":"trees","order":1,"statement":"Given a binary tree (as array level-order with -1 for null), print its inorder traversal.","inputFormat":"First line: integer n\nSecond line: n integers (level-order, -1 = null)","outputFormat":"Space-separated inorder traversal.","constraints":"1 <= n <= 10^4","sampleTestCases":[{"input":"7\n1 2 3 4 5 -1 -1","expectedOutput":"4 2 5 1 3"},{"input":"3\n1 -1 2","expectedOutput":"1 2"}],"hiddenTestCases":[{"input":"1\n1","expectedOutput":"1"}],"bruteSolution":"public class Main { static class Node { int v; Node l,r; Node(int x){v=x;} } static void in(Node n) { if(n==null) return; in(n.l); System.out.print(n.v+\" \"); in(n.r); } public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); if(n==0) return; Node[] nodes=new Node[n]; for(int i=0;i<n;i++) nodes[i]=a[i]==-1?null:new Node(a[i]); for(int i=0;i<n;i++) if(nodes[i]!=null) { if(2*i+1<n) nodes[i].l=nodes[2*i+1]; if(2*i+2<n) nodes[i].r=nodes[2*i+2]; } in(nodes[0]); } }","optimalSolution":"public class Main { static class Node { int v; Node l,r; Node(int x){v=x;} } public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); if(n==0) return; Node[] nodes=new Node[n]; for(int i=0;i<n;i++) nodes[i]=a[i]==-1?null:new Node(a[i]); for(int i=0;i<n;i++) if(nodes[i]!=null) { if(2*i+1<n) nodes[i].l=nodes[2*i+1]; if(2*i+2<n) nodes[i].r=nodes[2*i+2]; } java.util.Stack<Node> st=new java.util.Stack<>(); Node cur=nodes[0]; while(cur!=null||!st.isEmpty()) { while(cur!=null) { st.push(cur); cur=cur.l; } cur=st.pop(); System.out.print(cur.v+\" \"); cur=cur.r; } } }","explanation":"Left-Root-Right. Recursive O(n). Iterative uses a stack to simulate recursion."},
{"title":"Maximum Depth of Binary Tree","slug":"max-depth-tree","difficulty":"easy","tags":["tree"],"topicSlug":"trees","order":2,"statement":"Given a binary tree, find its maximum depth (number of nodes on longest root-to-leaf path).","inputFormat":"First line: integer n\nSecond line: n integers (level-order, -1 = null)","outputFormat":"Single integer - maximum depth.","constraints":"1 <= n <= 10^4","sampleTestCases":[{"input":"7\n3 9 20 -1 -1 15 7","expectedOutput":"3"},{"input":"3\n1 -1 2","expectedOutput":"2"}],"hiddenTestCases":[{"input":"1\n1","expectedOutput":"1"}],"bruteSolution":"public class Main { static class Node { int v; Node l,r; Node(int x){v=x;} } static int h(Node n) { if(n==null) return 0; return 1+Math.max(h(n.l),h(n.r)); } public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); Node[] nodes=new Node[n]; for(int i=0;i<n;i++) nodes[i]=a[i]==-1?null:new Node(a[i]); for(int i=0;i<n;i++) if(nodes[i]!=null) { if(2*i+1<n) nodes[i].l=nodes[2*i+1]; if(2*i+2<n) nodes[i].r=nodes[2*i+2]; } System.out.println(h(nodes[0])); } }","optimalSolution":"// Same recursive approach - O(n) optimal","explanation":"height(node) = 1 + max(height(left), height(right)). Base case: null node returns 0. O(n)."},
{"title":"Symmetric Tree","slug":"symmetric-tree","difficulty":"easy","tags":["tree"],"topicSlug":"trees","order":3,"statement":"Given a binary tree, check if it is symmetric (mirror of itself). Print 1 if yes, 0 if no.","inputFormat":"First line: integer n\nSecond line: n integers (level-order, -1 = null)","outputFormat":"1 if symmetric, 0 otherwise.","constraints":"1 <= n <= 10^4","sampleTestCases":[{"input":"7\n1 2 2 3 4 4 3","expectedOutput":"1"},{"input":"3\n1 2 2","expectedOutput":"1"}],"hiddenTestCases":[{"input":"5\n1 2 2 -1 3","expectedOutput":"0"}],"bruteSolution":"public class Main { static class Node { int v; Node l,r; Node(int x){v=x;} } static boolean sym(Node a,Node b) { if(a==null&&b==null) return true; if(a==null||b==null) return false; return a.v==b.v&&sym(a.l,b.r)&&sym(a.r,b.l); } public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); Node[] nodes=new Node[n]; for(int i=0;i<n;i++) nodes[i]=a[i]==-1?null:new Node(a[i]); for(int i=0;i<n;i++) if(nodes[i]!=null) {if(2*i+1<n)nodes[i].l=nodes[2*i+1];if(2*i+2<n)nodes[i].r=nodes[2*i+2];} System.out.println(nodes[0]==null||sym(nodes[0].l,nodes[0].r)?1:0); } }","optimalSolution":"// Same approach - recursion checking mirror pairs","explanation":"Check left.left vs right.right and left.right vs right.left recursively. O(n)."},
{"title":"Search in BST","slug":"search-bst","difficulty":"easy","tags":["bst"],"topicSlug":"bst","order":1,"statement":"Given a BST and a target value, return 1 if target exists, 0 otherwise.","inputFormat":"First line: integer n\nSecond line: n integers (level-order of BST)\nThird line: integer target","outputFormat":"1 if found, 0 otherwise.","constraints":"1 <= n <= 10^4","sampleTestCases":[{"input":"7\n4 2 7 1 3 -1 -1\n2","expectedOutput":"1"},{"input":"3\n1 -1 2\n5","expectedOutput":"0"}],"hiddenTestCases":[{"input":"1\n1\n1","expectedOutput":"1"}],"bruteSolution":"public class Main { static class Node { int v; Node l,r; Node(int x){v=x;} } static boolean s(Node n,int t) { if(n==null) return false; if(n.v==t) return true; return t<n.v?s(n.l,t):s(n.r,t); } public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int t=sc.nextInt(); Node[] nodes=new Node[n]; for(int i=0;i<n;i++) nodes[i]=a[i]==-1?null:new Node(a[i]); for(int i=0;i<n;i++) if(nodes[i]!=null) {if(2*i+1<n)nodes[i].l=nodes[2*i+1];if(2*i+2<n)nodes[i].r=nodes[2*i+2];} System.out.println(s(nodes[0],t)?1:0); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int t=sc.nextInt(); Node[] nodes=new Node[n]; for(int i=0;i<n;i++) nodes[i]=a[i]==-1?null:new Node(a[i]); for(int i=0;i<n;i++) if(nodes[i]!=null) {if(2*i+1<n)nodes[i].l=nodes[2*i+1];if(2*i+2<n)nodes[i].r=nodes[2*i+2];} Node cur=nodes[0]; while(cur!=null) { if(cur.v==t) { System.out.println(1); return; } cur=t<cur.v?cur.l:cur.r; } System.out.println(0); } static class Node { int v; Node l,r; Node(int x){v=x;} } }","explanation":"BST property: left < root < right. Navigate left or right accordingly. O(h) where h = height."},
{"title":"Validate BST","slug":"validate-bst","difficulty":"medium","tags":["bst"],"topicSlug":"bst","order":2,"statement":"Given a binary tree, check if it is a valid BST. Print 1 if yes, 0 if no.","inputFormat":"First line: integer n\nSecond line: n integers (level-order, -1 = null)","outputFormat":"1 if valid BST, 0 otherwise.","constraints":"1 <= n <= 10^4","sampleTestCases":[{"input":"3\n2 1 3","expectedOutput":"1"},{"input":"5\n5 1 4 -1 -1","expectedOutput":"0"}],"hiddenTestCases":[{"input":"7\n5 1 7 -1 -1 6 8","expectedOutput":"0"}],"bruteSolution":"public class Main { static class Node { int v; Node l,r; Node(int x){v=x;} } static void in(Node n,java.util.List<Integer> l) { if(n==null) return; in(n.l,l); l.add(n.v); in(n.r,l); } public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); Node[] nodes=new Node[n]; for(int i=0;i<n;i++) nodes[i]=a[i]==-1?null:new Node(a[i]); for(int i=0;i<n;i++) if(nodes[i]!=null) {if(2*i+1<n)nodes[i].l=nodes[2*i+1];if(2*i+2<n)nodes[i].r=nodes[2*i+2];} java.util.List<Integer> l=new java.util.ArrayList<>(); in(nodes[0],l); for(int i=1;i<l.size();i++) if(l.get(i)<=l.get(i-1)) { System.out.println(0); return; } System.out.println(1); } }","optimalSolution":"public class Main { static class Node { int v; Node l,r; Node(int x){v=x;} } static boolean v(Node n,long mn,long mx) { if(n==null) return true; if(n.v<=mn||n.v>=mx) return false; return v(n.l,mn,n.v)&&v(n.r,n.v,mx); } public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); Node[] nodes=new Node[n]; for(int i=0;i<n;i++) nodes[i]=a[i]==-1?null:new Node(a[i]); for(int i=0;i<n;i++) if(nodes[i]!=null) {if(2*i+1<n)nodes[i].l=nodes[2*i+1];if(2*i+2<n)nodes[i].r=nodes[2*i+2];} System.out.println(v(nodes[0],Long.MIN_VALUE,Long.MAX_VALUE)?1:0); } }","explanation":"Each node must be within a valid range (min, max). Left child: (min, parent.val), right child: (parent.val, max)."},
{"title":"Kth Largest Element","slug":"kth-largest","difficulty":"medium","tags":["heap"],"topicSlug":"heaps","order":1,"statement":"Given an array, find the kth largest element.","inputFormat":"First line: integer n\nSecond line: n space-separated integers\nThird line: integer k","outputFormat":"Single integer - kth largest element.","constraints":"1 <= n <= 10^5, 1 <= k <= n","sampleTestCases":[{"input":"6\n3 2 1 5 6 4\n2","expectedOutput":"5"},{"input":"4\n1 2 3 4\n4","expectedOutput":"1"}],"hiddenTestCases":[{"input":"3\n5 5 5\n2","expectedOutput":"5"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int k=sc.nextInt(); java.util.Arrays.sort(a); System.out.println(a[n-k]); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); java.util.PriorityQueue<Integer> pq=new java.util.PriorityQueue<>(); for(int i=0;i<n;i++) { int x=sc.nextInt(); pq.offer(x); if(pq.size()>k) pq.poll(); } int k=sc.nextInt(); System.out.println(pq.peek()); } }","explanation":"Min-heap of size k. For each element, add to heap. If heap exceeds k, remove smallest. Result is top of heap. O(n log k)."},
{"title":"Kth Smallest Element","slug":"kth-smallest","difficulty":"easy","tags":["heap"],"topicSlug":"heaps","order":2,"statement":"Given an array, find the kth smallest element.","inputFormat":"First line: integer n\nSecond line: n integers\nThird line: integer k","outputFormat":"Single integer - kth smallest.","constraints":"1 <= n <= 10^5, 1 <= k <= n","sampleTestCases":[{"input":"6\n7 10 4 3 20 15\n3","expectedOutput":"7"},{"input":"4\n1 2 3 4\n2","expectedOutput":"2"}],"hiddenTestCases":[{"input":"3\n5 5 5\n2","expectedOutput":"5"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int k=sc.nextInt(); java.util.Arrays.sort(a); System.out.println(a[k-1]); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); java.util.PriorityQueue<Integer> pq=new java.util.PriorityQueue<>((x,y)->y-x); for(int i=0;i<n;i++) { int x=sc.nextInt(); pq.offer(x); if(pq.size()>k) pq.poll(); } int k=sc.nextInt(); System.out.println(pq.peek()); } }","explanation":"Max-heap of size k. Keep largest k elements seen. Top of heap is kth smallest. O(n log k)."},
{"title":"BFS of Graph","slug":"bfs-graph","difficulty":"easy","tags":["graph"],"topicSlug":"graphs","order":1,"statement":"Given an undirected graph with n nodes and e edges, print BFS traversal starting from node 0.","inputFormat":"First line: n e\nNext e lines: u v (edge between u and v)","outputFormat":"Space-separated BFS traversal.","constraints":"1 <= n <= 10^4, 0 <= e <= 10^4","sampleTestCases":[{"input":"5 4\n0 1\n0 2\n1 3\n2 4","expectedOutput":"0 1 2 3 4"}],"hiddenTestCases":[{"input":"3 2\n0 1\n1 2","expectedOutput":"0 1 2"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(),e=sc.nextInt(); java.util.List<Integer>[] g=new java.util.List[n]; for(int i=0;i<n;i++) g[i]=new java.util.ArrayList<>(); for(int i=0;i<e;i++) {int u=sc.nextInt(),v=sc.nextInt(); g[u].add(v); g[v].add(u);} boolean[] vis=new boolean[n]; java.util.Queue<Integer> q=new java.util.LinkedList<>(); q.offer(0); vis[0]=true; while(!q.isEmpty()) { int u=q.poll(); System.out.print(u+\" \"); for(int v:g[u]) if(!vis[v]) { vis[v]=true; q.offer(v); } } } }","optimalSolution":"// Same - BFS is already O(V+E) optimal","explanation":"Queue-based level-order traversal. Visit neighbors of current node, then move to next level. O(V+E)."},
{"title":"DFS of Graph","slug":"dfs-graph","difficulty":"easy","tags":["graph"],"topicSlug":"graphs","order":2,"statement":"Given an undirected graph, print DFS traversal starting from node 0.","inputFormat":"First line: n e\nNext e lines: u v","outputFormat":"Space-separated DFS traversal.","constraints":"1 <= n <= 10^4, 0 <= e <= 10^4","sampleTestCases":[{"input":"5 4\n0 1\n0 2\n1 3\n2 4","expectedOutput":"0 1 3 2 4"}],"hiddenTestCases":[{"input":"3 2\n0 1\n1 2","expectedOutput":"0 1 2"}],"bruteSolution":"public class Main { static void dfs(int u,boolean[] vis,java.util.List<Integer>[] g) { vis[u]=true; System.out.print(u+\" \"); for(int v:g[u]) if(!vis[v]) dfs(v,vis,g); } public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(),e=sc.nextInt(); java.util.List<Integer>[] g=new java.util.List[n]; for(int i=0;i<n;i++) g[i]=new java.util.ArrayList<>(); for(int i=0;i<e;i++) {int u=sc.nextInt(),v=sc.nextInt(); g[u].add(v); g[v].add(u);} dfs(0,new boolean[n],g); } }","optimalSolution":"// Same - DFS is O(V+E) optimal","explanation":"Recursive depth-first traversal. Visit node, then recursively visit unvisited neighbors. O(V+E)."},
{"title":"Number of Islands","slug":"num-islands","difficulty":"medium","tags":["graph","dfs"],"topicSlug":"graphs","order":3,"statement":"Given a grid of 1s (land) and 0s (water), count the number of islands (connected 1s horizontally/vertically).","inputFormat":"First line: rows cols\nNext rows lines: cols space-separated integers (0 or 1)","outputFormat":"Single integer - number of islands.","constraints":"1 <= rows, cols <= 200","sampleTestCases":[{"input":"4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1","expectedOutput":"3"}],"hiddenTestCases":[{"input":"1 1\n1","expectedOutput":"1"}],"bruteSolution":"public class Main { static void dfs(int[][] g,int i,int j) { if(i<0||i>=g.length||j<0||j>=g[0].length||g[i][j]==0) return; g[i][j]=0; dfs(g,i+1,j); dfs(g,i-1,j); dfs(g,i,j+1); dfs(g,i,j-1); } public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int r=sc.nextInt(),c=sc.nextInt(); int[][] g=new int[r][c]; for(int i=0;i<r;i++) for(int j=0;j<c;j++) g[i][j]=sc.nextInt(); int cnt=0; for(int i=0;i<r;i++) for(int j=0;j<c;j++) if(g[i][j]==1) { cnt++; dfs(g,i,j); } System.out.println(cnt); } }","optimalSolution":"// Same - DFS-based flood fill, O(rows*cols)","explanation":"DFS flood fill: when land found, increment count and sink the entire island via DFS. O(rows x cols)."}
,

{"title":"Activity Selection","slug":"activity-selection","difficulty":"easy","tags":["greedy"],"topicSlug":"greedy","order":1,"statement":"Given start and end times of n activities, find the maximum number of activities you can do without overlap.","inputFormat":"First line: integer n\nNext n lines: start end","outputFormat":"Single integer - max activities.","constraints":"1 <= n <= 10^5","sampleTestCases":[{"input":"4\n1 3\n2 4\n3 5\n5 6","expectedOutput":"3"}],"hiddenTestCases":[{"input":"3\n1 2\n2 4\n3 5","expectedOutput":"2"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[][] a=new int[n][2]; for(int i=0;i<n;i++){a[i][0]=sc.nextInt();a[i][1]=sc.nextInt();} java.util.Arrays.sort(a,(x,y)->x[1]-y[1]); int cnt=1,end=a[0][1]; for(int i=1;i<n;i++) if(a[i][0]>=end) { cnt++; end=a[i][1]; } System.out.println(cnt); } }","optimalSolution":"// Same - greedy is already optimal","explanation":"Sort by end time. Pick first activity, then pick next that starts after current ends. O(n log n)."},
{"title":"Assign Cookies","slug":"assign-cookies","difficulty":"easy","tags":["greedy"],"topicSlug":"greedy","order":2,"statement":"Given child greed factors and cookie sizes, assign cookies to maximize content children. Each child gets at most one cookie that must be >= their greed.","inputFormat":"First line: n m\nSecond line: n integers (greed factors)\nThird line: m integers (cookie sizes)","outputFormat":"Single integer - max content children.","constraints":"1 <= n,m <= 3*10^4","sampleTestCases":[{"input":"3 2\n1 2 3\n1 1","expectedOutput":"1"},{"input":"2 3\n1 2\n1 2 3","expectedOutput":"2"}],"hiddenTestCases":[{"input":"3 3\n3 2 1\n1 2 3","expectedOutput":"2"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(),m=sc.nextInt(); int[] g=new int[n],s=new int[m]; for(int i=0;i<n;i++) g[i]=sc.nextInt(); for(int i=0;i<m;i++) s[i]=sc.nextInt(); java.util.Arrays.sort(g); java.util.Arrays.sort(s); int i=0,j=0; while(i<n&&j<m) if(s[j]>=g[i]){i++;j++;}else j++; System.out.println(i); } }","optimalSolution":"// Same - greedy with sorting","explanation":"Sort both arrays. Assign smallest cookie that satisfies each child. O(n log n + m log m)."},
{"title":"Jump Game","slug":"jump-game","difficulty":"medium","tags":["greedy","array"],"topicSlug":"greedy","order":3,"statement":"Given an array where nums[i] = max jump length from index i, determine if you can reach the last index. Start at index 0.","inputFormat":"First line: integer n\nSecond line: n integers","outputFormat":"1 if reachable, 0 otherwise.","constraints":"1 <= n <= 10^4","sampleTestCases":[{"input":"5\n2 3 1 1 4","expectedOutput":"1"},{"input":"5\n3 2 1 0 4","expectedOutput":"0"}],"hiddenTestCases":[{"input":"2\n1 0","expectedOutput":"0"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); boolean[] dp=new boolean[n]; dp[0]=true; for(int i=0;i<n;i++) if(dp[i]) for(int j=1;j<=a[i]&&i+j<n;j++) dp[i+j]=true; System.out.println(dp[n-1]?1:0); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int max=0; for(int i=0;i<n;i++) { if(i>max) { System.out.println(0); return; } max=Math.max(max,i+a[i]); } System.out.println(1); } }","explanation":"Track the furthest reachable index. If current index exceeds max reachable, unreachable. O(n)."},
{"title":"Minimum Coins (Greedy)","slug":"min-coins-greedy","difficulty":"medium","tags":["greedy"],"topicSlug":"greedy","order":4,"statement":"Given coin denominations (Indian: 1,2,5,10,20,50,100,200,500,2000) and an amount, find minimum coins needed. Greedy works for this standard set.","inputFormat":"Single integer: amount","outputFormat":"Single integer - minimum coins.","constraints":"0 <= amount <= 10^5","sampleTestCases":[{"input":"93","expectedOutput":"4"},{"input":"11","expectedOutput":"2"}],"hiddenTestCases":[{"input":"0","expectedOutput":"0"},{"input":"2000","expectedOutput":"1"}],"bruteSolution":"public class Main { public static void main(String[] args) { int a=new java.util.Scanner(System.in).nextInt(); int[] c={2000,500,200,100,50,20,10,5,2,1}; int cnt=0; for(int d:c) { cnt+=a/d; a%=d; } System.out.println(cnt); } }","optimalSolution":"// Same - greedy works for Indian coin system","explanation":"Start with largest denomination, take as many as possible, move to next. O(1) with fixed denominations."},
{"title":"Climbing Stairs","slug":"climbing-stairs","difficulty":"easy","tags":["dp"],"topicSlug":"dp","order":1,"statement":"You climb stairs taking 1 or 2 steps at a time. Given n steps, find number of distinct ways to reach the top.","inputFormat":"Single integer n","outputFormat":"Single integer - number of ways.","constraints":"1 <= n <= 45","sampleTestCases":[{"input":"2","expectedOutput":"2"},{"input":"3","expectedOutput":"3"}],"hiddenTestCases":[{"input":"1","expectedOutput":"1"},{"input":"5","expectedOutput":"8"}],"bruteSolution":"public class Main { static int c(int n) { if(n<=2) return n; return c(n-1)+c(n-2); } public static void main(String[] args) { int n=new java.util.Scanner(System.in).nextInt(); System.out.println(c(n)); } }","optimalSolution":"public class Main { public static void main(String[] args) { int n=new java.util.Scanner(System.in).nextInt(); int a=1,b=2; for(int i=3;i<=n;i++) { int t=a+b; a=b; b=t; } System.out.println(n<=2?n:b); } }","explanation":"dp[i] = dp[i-1] + dp[i-2] (same as Fibonacci). O(n) time, O(1) space."},
{"title":"Coin Change (DP)","slug":"coin-change-dp","difficulty":"medium","tags":["dp"],"topicSlug":"dp","order":2,"statement":"Given coin denominations and an amount, find the minimum number of coins needed. This works for any coin system (unlike greedy).","inputFormat":"First line: integer n\nSecond line: n space-separated integers (coins)\nThird line: integer amount","outputFormat":"Single integer - min coins (or -1 if impossible).","constraints":"1 <= n <= 12, 1 <= amount <= 10^4","sampleTestCases":[{"input":"3\n1 2 5\n11","expectedOutput":"3"},{"input":"3\n2\n3","expectedOutput":"-1"}],"hiddenTestCases":[{"input":"1\n1\n0","expectedOutput":"0"}],"bruteSolution":"public class Main { static int min=Integer.MAX_VALUE; static void f(int[] c,int a,int cnt) { if(a==0) { min=Math.min(min,cnt); return; } if(a<0) return; for(int x:c) f(c,a-x,cnt+1); } public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] c=new int[n]; for(int i=0;i<n;i++) c[i]=sc.nextInt(); int a=sc.nextInt(); f(c,a,0); System.out.println(min==Integer.MAX_VALUE?-1:min); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); int[] c=new int[n]; for(int i=0;i<n;i++) c[i]=sc.nextInt(); int a=sc.nextInt(); int[] dp=new int[a+1]; java.util.Arrays.fill(dp,a+1); dp[0]=0; for(int i=1;i<=a;i++) for(int x:c) if(i>=x) dp[i]=Math.min(dp[i],1+dp[i-x]); System.out.println(dp[a]>a?-1:dp[a]); } }","explanation":"dp[i] = min coins to make amount i. For each coin, dp[i] = min(dp[i], 1 + dp[i-coin]). O(n x amount)."},
{"title":"Longest Common Subsequence","slug":"lcs","difficulty":"medium","tags":["dp","string"],"topicSlug":"dp","order":3,"statement":"Given two strings, find the length of their longest common subsequence (LCS).","inputFormat":"First line: string s\nSecond line: string t","outputFormat":"Single integer - LCS length.","constraints":"1 <= |s|,|t| <= 1000","sampleTestCases":[{"input":"abcde\nace","expectedOutput":"3"},{"input":"abc\nabc","expectedOutput":"3"}],"hiddenTestCases":[{"input":"abc\ndef","expectedOutput":"0"}],"bruteSolution":"public class Main { static int lcs(String s,String t,int i,int j) { if(i==0||j==0) return 0; if(s.charAt(i-1)==t.charAt(j-1)) return 1+lcs(s,t,i-1,j-1); return Math.max(lcs(s,t,i-1,j),lcs(s,t,i,j-1)); } public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); String s=sc.next(),t=sc.next(); System.out.println(lcs(s,t,s.length(),t.length())); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); String s=sc.next(),t=sc.next(); int m=s.length(),n=t.length(); int[][] dp=new int[m+1][n+1]; for(int i=1;i<=m;i++) for(int j=1;j<=n;j++) if(s.charAt(i-1)==t.charAt(j-1)) dp[i][j]=1+dp[i-1][j-1]; else dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1]); System.out.println(dp[m][n]); } }","explanation":"dp[i][j] = LCS of first i chars of s and first j chars of t. If chars match: 1 + dp[i-1][j-1]. Else: max(dp[i-1][j], dp[i][j-1]). O(mn)."},
{"title":"0/1 Knapsack","slug":"knapsack-01","difficulty":"medium","tags":["dp"],"topicSlug":"dp","order":4,"statement":"Given n items with weights and values, and a knapsack capacity W, find the maximum value you can carry. Each item can be taken once (0/1).","inputFormat":"First line: n W\nSecond line: n space-separated integers (values)\nThird line: n space-separated integers (weights)","outputFormat":"Single integer - max value.","constraints":"1 <= n <= 100, 1 <= W <= 1000","sampleTestCases":[{"input":"4 7\n1 4 5 7\n1 3 4 5","expectedOutput":"9"}],"hiddenTestCases":[{"input":"3 50\n60 100 120\n10 20 30","expectedOutput":"220"}],"bruteSolution":"public class Main { static int max=0; static void f(int[] v,int[] w,int i,int cap,int val) { if(i==v.length) { max=Math.max(max,val); return; } f(v,w,i+1,cap,val); if(w[i]<=cap) f(v,w,i+1,cap-w[i],val+v[i]); } public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(),W=sc.nextInt(); int[] v=new int[n],w=new int[n]; for(int i=0;i<n;i++) v[i]=sc.nextInt(); for(int i=0;i<n;i++) w[i]=sc.nextInt(); f(v,w,0,W,0); System.out.println(max); } }","optimalSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(),W=sc.nextInt(); int[] v=new int[n],w=new int[n]; for(int i=0;i<n;i++) v[i]=sc.nextInt(); for(int i=0;i<n;i++) w[i]=sc.nextInt(); int[][] dp=new int[n+1][W+1]; for(int i=1;i<=n;i++) for(int j=0;j<=W;j++) if(w[i-1]<=j) dp[i][j]=Math.max(dp[i-1][j],v[i-1]+dp[i-1][j-w[i-1]]); else dp[i][j]=dp[i-1][j]; System.out.println(dp[n][W]); } }","explanation":"dp[i][j] = max value using first i items with capacity j. Include or exclude each item. O(nW)."},
{"title":"Implement Trie (Prefix Tree)","slug":"implement-trie","difficulty":"medium","tags":["trie"],"topicSlug":"tries","order":1,"statement":"Implement a Trie with insert, search, and startsWith operations.","inputFormat":"First line: integer q (queries)\nNext q lines: operation arg\nOperations: insert <word>, search <word>, startsWith <prefix>","outputFormat":"For search and startsWith: 1 if true, 0 if false. Each on new line.","constraints":"1 <= q <= 10^4, words are lowercase letters","sampleTestCases":[{"input":"8\ninsert apple\nsearch apple\nsearch app\nstartsWith app\ninsert app\nsearch app\nstartsWith appl\nsearch appl","expectedOutput":"1\n0\n1\n1\n1\n0"}],"hiddenTestCases":[{"input":"3\ninsert hello\nsearch hello\nsearch world","expectedOutput":"1\n0"}],"bruteSolution":"public class Main { static class TrieNode { TrieNode[] c=new TrieNode[26]; boolean e; } static class Trie { TrieNode r=new TrieNode(); void ins(String w) { TrieNode n=r; for(char ch:w.toCharArray()) { int i=ch-'a'; if(n.c[i]==null) n.c[i]=new TrieNode(); n=n.c[i]; } n.e=true; } boolean sch(String w) { TrieNode n=r; for(char ch:w.toCharArray()) { int i=ch-'a'; if(n.c[i]==null) return false; n=n.c[i]; } return n.e; } boolean sw(String p) { TrieNode n=r; for(char ch:p.toCharArray()) { int i=ch-'a'; if(n.c[i]==null) return false; n=n.c[i]; } return true; } } public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int q=sc.nextInt(); Trie t=new Trie(); while(q-->0) { String op=sc.next(),arg=sc.next(); if(op.equals(\"insert\")) t.ins(arg); else if(op.equals(\"search\")) System.out.println(t.sch(arg)?1:0); else if(op.equals(\"startsWith\")) System.out.println(t.sw(arg)?1:0); } } }","optimalSolution":"// Same - Trie is already optimal O(L) per operation","explanation":"Trie with 26-ary children array. Each operation traverses characters. O(L) where L is word length."},
{"title":"Longest Word in Dictionary","slug":"longest-word-trie","difficulty":"medium","tags":["trie"],"topicSlug":"tries","order":2,"statement":"Given an array of words, find the longest word that can be built one character at a time (each prefix must exist). If tie, return smallest lexicographically.","inputFormat":"First line: integer n\nNext n lines: each word","outputFormat":"The longest word.","constraints":"1 <= n <= 1000, 1 <= |word| <= 30","sampleTestCases":[{"input":"6\nw\nwo\nwor\nworl\nworld\nworlds","expectedOutput":"worlds"}],"hiddenTestCases":[{"input":"3\na\nbanana\napp","expectedOutput":"a"}],"bruteSolution":"public class Main { public static void main(String[] args) { java.util.Scanner sc=new java.util.Scanner(System.in); int n=sc.nextInt(); String[] w=new String[n]; for(int i=0;i<n;i++) w[i]=sc.next(); java.util.Set<String> s=new java.util.HashSet<>(); for(String x:w) s.add(x); String ans=\"\"; for(String x:w) { boolean ok=true; for(int i=1;i<=x.length();i++) if(!s.contains(x.substring(0,i))) { ok=false; break; } if(ok&&(x.length()>ans.length()||(x.length()==ans.length()&&x.compareTo(ans)<0))) ans=x; } System.out.println(ans); } }","optimalSolution":"// Same approach using HashSet - O(n * L^2)","explanation":"Check each word: for each prefix, verify it exists in the set. Track the longest valid word. O(n x L^2)."}

];;;

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced (tables dropped & recreated)");

    // Auto-count problemCount per topic
    const counts = {};
    for (const p of problems) {
      counts[p.topicSlug] = (counts[p.topicSlug] || 0) + 1;
    }
    for (const t of topics) {
      t.problemCount = counts[t.slug] || 0;
    }
    await Topic.bulkCreate(topics, { individualHooks: false });
    console.log(`Inserted ${topics.length} topics`);

    await Problem.bulkCreate(problems, { individualHooks: false });
    console.log(`Inserted ${problems.length} problems`);

    console.log("Seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
