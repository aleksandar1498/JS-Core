function systemComponent(input) {
    let systema = {};
    for (let entry of input) {
        entry = entry.split(/ \| /g);
        let sys = entry[0];
        let component = entry[1];
        let subcontent = entry[2];
        if (!systema[sys]) {

            systema[sys] = {};
        }
        if (!systema[sys][component]) {
            systema[sys][component] = [];
        }

        systema[sys][component].push(subcontent);

    }
    Object.entries(systema).sort((a, b) => {

        let sort = Object.keys(b[1]).length - Object.keys(a[1]).length;
        if (sort == 0) {
            sort = a[0].localeCompare(b[0]);
        }
        return sort;
    }).forEach(sys => {
        console.log(sys[0]);
        Object.entries(sys[1]).sort((a, b) => {

            let sort = Object.keys(b[1]).length - Object.keys(a[1]).length;
            return sort;
        }).forEach(content => {
            console.log("|||"+content[0]);
            content[1].forEach(sub => console.log("||||||"+sub));
        });

    });

}