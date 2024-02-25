export default function heapSort(bookshelf) {
    const moves = [];

    // Helper functions
    function buildMaxHeap(arr) {
        const n = arr.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
    }

    function heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left].name > arr[largest].name) {
            largest = left;
        }

        if (right < n && arr[right].name > arr[largest].name) {
            largest = right;
        }

        if (largest !== i) {
            moves.push({ indices: [i, largest], type: "compare" }); 
            [arr[i], arr[largest]] = [arr[largest], arr[i]]; 
            moves.push({ indices: [i, largest], type: "swap" }); 

            heapify(arr, n, largest);
        }
    }

    function sort(arr) {
        const n = arr.length;
        buildMaxHeap(arr); 

        for (let i = n - 1; i > 0; i--) {
            moves.push({ indices: [0, i], type: "compare" });
            [arr[0], arr[i]] = [arr[i], arr[0]];
            moves.push({ indices: [0, i], type: "swap" }); 

            heapify(arr, i, 0); 
        }
    }

    // Main logic
    sort([...bookshelf]); // Create a copy to sort
    return moves;
}
