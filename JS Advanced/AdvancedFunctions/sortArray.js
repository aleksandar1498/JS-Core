function solve(arr,type) {
    let sorter = sort();
    return sorter[type](arr);
    function sort() {

        return {
            asc: (arr) => arr.sort((a, b) => a - b),
            desc: (arr) => arr.sort((a, b) => b - a),

        }
    }
    
}
solve([14,7,17,6,8],"desc");



