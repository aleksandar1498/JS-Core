
    function generateOrbit(data) {
        let width = Number(data[0]);
        let height = Number(data[1]);
        let  r = Number(data[2]);
        let  c = Number(data[3]);
        let orbit = initializeOrbit(width, height);
        let val = 1;
        let dis = 1;
        let len = 3;
        orbit[r][c] = val;


        while (true) {
            val++;
            let filledLeft = fillLeftSide(orbit, r, c, dis, len, val);
            let filledRight = fillRightSide(orbit, r, c, dis, len, val);
            let filledBottom = fillBottomSide(orbit, r, c, dis, len, val);
            let filledTop = fillTopSide(orbit, r, c, dis, len, val);
            if (filledLeft ||
                filledRight ||
                filledBottom ||
                filledTop) {
                dis++;
                len += 2;
            } else {
                break;
            }


        }
        printOrbit(orbit);


        function fillLeftSide(orbit, r, c, dis, len, val) {

            let filled = false;
            for (let i = r - dis; i < r - dis + len; i++) {

                if (isInLimit(orbit, i, c - dis)) {
                    filled = true;
                    orbit[i][c - dis] = val;
                }

            }
            return filled;
        }
        function fillRightSide(orbit, r, c, dis, len, val) {
            let filled = false;
            for (let i = r - dis; i < r - dis + len; i++) {

                if (isInLimit(orbit, i, c + dis)) {
                    filled = true;
                    orbit[i][c + dis] = val;
                }

            }
            return filled;
        }
        function fillBottomSide(orbit, r, c, dis, len, val) {

            let filled = false;
            for (let i = c - dis; i < c - dis + len; i++) {
                
                if (isInLimit(orbit, r + dis, i)) {
                    filled = true;
                    orbit[r + dis][i] = val;
                }

            }
         
            return filled;
        }
        function fillTopSide(orbit, r, c, dis, len, val) {
            let filled = false;
            for (let i = c - dis; i < c - dis + len; i++) {

                if (isInLimit(orbit, r - dis, i)) {
                    filled = true;
                    orbit[r - dis][i] = val;
                }

            }
            return filled;
        }
        function isInLimit(orbit, r, c) {
            return ((r >= 0 && r < orbit.length) && (c >= 0 && c < orbit[r].length));
        }
        function printOrbit(orbit) {
            for (let x = 0; x < orbit.length; x++) {
                console.log(orbit[x].join(" "));

            }
        }
        function initializeOrbit(width, height) {
            let orbit = [];
            orbit.length = width;
            for (let i = 0; i < orbit.length; i++) {
                orbit[i] = [];
                orbit[i].length = height;
            }
            return orbit;
        }

    }
    generateOrbit([4, 3, 2, 2]);
