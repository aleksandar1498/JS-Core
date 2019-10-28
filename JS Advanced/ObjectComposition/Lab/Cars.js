function solution(args) {
    let carManager = function () {
        let cars = {};
        return {
            create: name => {
                cars[name] = {}
            },
            inherit: (childName, parentName) => {
                Object.setPrototypeOf(cars[childName],cars[parentName])
            },
            setProp: (name, prop, value) => {
                cars[name][prop] = value;
            },
            print: (name) => {
                let output = [];
                for (const key in cars[name]) {
                  
                    output.push(`${key}:${cars[name][key]}`);
                }
                console.log(output.join(', '));
            },
           
        }
    };
    let builder = carManager();
   
    for (const arg of args) {
        callFunction(arg);
    }
    function callFunction(arg) {
        arg = arg.split(' ');
        let command = arg[0];
        let name = arg[1];
        switch (command) {
            case 'create': 
                 builder.create(name);
                if(arg.length > 2){
                    let parentName = arg[3];
                  
                    builder.inherit(name,parentName);
        
                }
    
                break;
            case 'set':
                let property = arg[2];
                let value = arg[3];
                builder.setProp(name,property,value);
                break;
            case 'print':
                    builder.print(name);
                break;
        }
    }

}
solution(['create c1',
'create c2 inherit c1',
'set c1 color red',
'set c2 model new',
'print c1',
'print c2']
);
