

    class Hotel {

        constructor(name, capacity) {
            this.name = name;
            this.rooms = {
                single: Math.floor(+capacity / 2),
                double: Math.floor(+capacity * 0.3),
                maisonette: Math.floor(+capacity * 0.2),
            };
    
            this.bookings = [];
            this.bookingId = 1;
            this.currentBookingNumber = 1;
    
        }
        get roomsPricing() {
            let prices = {};
            prices["single"] = 50;
            prices["double"] = 90;
            prices["maisonette"] = 135;
            return prices;
        }
        get servicesPricing() {
            let prices = {};
            prices["food"] = 10;
            prices["drink"] = 15;
            prices["housekeeping"] = 25;
            return prices;
        }
        checkOut(currentBookingNumber) {
            if (this.isValidBooking(currentBookingNumber)) {
                let book = this.bookings.filter(book => book.id == currentBookingNumber)[0];
                this.bookings = this.bookings.filter(book => book.id != currentBookingNumber);
                this.rooms[book['roomType']]++;
                if (book.hasOwnProperty("services")) {
                    return `We hope you enjoyed your time here, Mr./Mrs.  ${book['clientName']}. The total amount of money you have to pay is ${this.getNightTotalPrice(book) + this.getServicesTotalPrice(book)} BGN. You have used additional room services, costing ${this.getServicesTotalPrice(book)} BGN."`;
                } else {
                    return `We hope you enjoyed your time here, Mr./Mrs. ${book['clientName']}. The total amount of money you have to pay is ${this.getNightTotalPrice(book)} BGN.`
                }
    
            } else {
                return `The booking ${currentBookingNumber} is invalid.`
            }
        }
        roomService(currentBookingNumber, serviceType) {
            //console.log(this.servicesPricing);
            let user = this.bookings.find(book => book.id === currentBookingNumber);
            if (!user) {
                return `The booking ${currentBookingNumber} is invalid.`;
            }
            if (!Array.from(Object.keys(this.servicesPricing)).includes(serviceType)) {
                return `We do not offer ${serviceType} service.`;
            }
            if (!user.hasOwnProperty('services')) {
                user['services'] = [];
            }
    
            user["services"].push(serviceType);
            return `Mr./Mrs. ${user['clientName']}, Your order for ${serviceType} service has been successful.`;
    
        }
    
        rentARoom(clientName, roomType, nights) {
            let reservation = {};
    
            let rented = false;
            switch (roomType) {
                case "single":
                    if (this.rooms.single > 0) {
                        this.rooms.single--;
                        rented = true;
                    }
                    break;
                case "double":
                    if (this.rooms.double > 0) {
                        this.rooms.double--;
                        rented = true;
                    }
                    break;
                case "maisonette":
                    if (this.rooms.maisonette > 0) {
                        this.rooms.maisonette--;
                        rented = true;
                    }
                    break;
            }
            reservation["id"] = this.bookingId;
            reservation["clientName"] = clientName;
            reservation["nights"] = Number(nights);
            reservation["roomType"] = roomType;
    
            if (rented) {
                this.bookings.push(reservation);
                this.bookingId++;
                return `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${reservation["id"]}.`;
            } else {
                return this.createError(roomType, Array.from(Object.entries(this.rooms)).filter(room => room[0] != roomType && room[1] > 0));
            }
        }
        report() {
    
            if (this.bookings.length > 0) {
                let result = `${this.name.toUpperCase()} DATABASE:\n--------------------\n`;
                let bookingsArray = [];
                // let services = booking.services.join(', ');
                for (const booking of this.bookings) {
                    bookingsArray.push(`bookingNumber - ${booking.id}\nclientName - ${booking.clientName}\nroomType - ${booking.roomType}\nnights - ${booking.nights}${booking.hasOwnProperty('services') ? '\nservices: ' + booking.services.join(', ') : ''}`);
                }
    
                result += bookingsArray.join('\n----------\n');
                return result.trim();
            } else {
                return `${this.name.toUpperCase()} DATABASE:\n--------------------\nThere are currently no bookings.`;
    
            }
    
        }
        getNightTotalPrice(booking) {
            return booking['nights'] * this.roomsPricing[booking["roomType"]];
        }
        getServicesTotalPrice(booking) {
            return booking["services"].reduce((a, c) => a + this.servicesPricing[c], 0);
        }
        isValidBooking(bookingId) {
            if (this.bookings.some(x => x["id"] == bookingId)) {
                return true;
            } else {
                return false;
            }
        }
        createError(clientRoom, otherRooms) {
            return `No ${clientRoom} rooms available!${otherRooms.map(room => ` Available ${room[0]} rooms: ${room[1]}.`).join("")}`;
        }
    
    }