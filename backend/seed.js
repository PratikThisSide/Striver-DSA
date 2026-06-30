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
];

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced (tables dropped & recreated)");

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
