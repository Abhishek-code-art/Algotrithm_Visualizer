export default function mergeSort(bookshelf) {
    const moves = [];

    const merge = (start, mid, end) => {
        let start2 = mid+1;

        while(start <= mid && start2 <= end) {
            if(bookshelf[start].name <= bookshelf[start2].name) {
                start++;
            } else {
                const value = bookshelf[start2];
                let index = start2;

                while(index != start) {
                    bookshelf[index] = bookshelf[index-1];
                    moves.push({
                        indices: [index-1, index],
                        type: "swap"
                    });
                    index--;
                }

                bookshelf[start] = value;
                moves.push({
                    indices: [start],
                    type: "compare"
                });

                start++;
                mid++;
                start2++;
            }
        }  
    };

    const mergeSortRecursive = (left, right) => {
        if(left < right) {
            const middle = left + Math.floor((right-left)/2);
            
            mergeSortRecursive(left, middle);
            mergeSortRecursive(middle+1, right);
            
            merge(left, middle, right);
        }
    };

    mergeSortRecursive(0, bookshelf.length-1);
    // No moves are being tracked in this implementation
    return moves;
}
 