let myCollection = (function () {
    let collection = [];
    let obj = {size : 0};
    obj['add'] =  (element) => {
        let index = -1;
        for (let i = 0; i < collection.length; i++) {
            if (collection[i] > element) {
                index = i;
                break;
            }
        }

        if (index == -1) {
            collection.push(element);
        } else {
            collection.splice(index, 0, element);
        }
        obj.size++;
    };
    obj['remove'] =(index) => {
        if (valid(index)) {
            collection.splice(index,1);
            obj.size--;
        }
        
    };
    obj['get'] = (index) => {
            if (valid(index)) {
                return collection[index];
            }
        };
        return obj;
   
    function valid(index) {
        if (index < 0 || index >= collection.length) {
            return false;
        }
        return true;
    }
})();
myCollection.add(19);
myCollection.add(11);
myCollection.remove(0);
console.log(myCollection.size)