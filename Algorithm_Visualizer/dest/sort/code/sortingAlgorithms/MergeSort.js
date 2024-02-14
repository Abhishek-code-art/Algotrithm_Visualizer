export default function mergeSort(bookshelf) {
    const moves = [];

    const merge = (left, right) => {
        const result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex].name < right[rightIndex].name) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        // Push remaining elements from left and right arrays
        while (leftIndex < left.length) {
            result.push(left[leftIndex]);
            leftIndex++;
        }
        while (rightIndex < right.length) {
            result.push(right[rightIndex]);
            rightIndex++;
        }

        return result;
    };

    const mergeSortRecursive = (array) => {
        if (array.length <= 1) {
            return array;
        }

        const middle = Math.floor(array.length / 2);
        const left = array.slice(0, middle);
        const right = array.slice(middle);

        return merge(mergeSortRecursive(left), mergeSortRecursive(right));
    };

    const sortedBookshelf = mergeSortRecursive(bookshelf);
    // No moves are being tracked in this implementation

    return sortedBookshelf;
}
