/**
 * 
 * @param nums - unsorted array of integers
 * @returns length of longest consecutive sequence
 * Time: O(n), Space: O(n) set stores up unique element
 */

function longestConsecutive(nums: number[]): number {
    const set = new Set<number>(nums);
    let maxLength = 0;
    
    for(const n of set){
        if(!set.has(n - 1)){
            let length = 0;
            while(set.has(n + length)){
                length++;
                maxLength = Math.max(maxLength, length);
            }
        }
    }

    return maxLength;
};