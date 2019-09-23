function generateStatus(name, age, weightInKg, heightInCm) {
    let heightInM = heightInCm / 100;
    let status = {
        name : name,
        personalInfo : {
            age : age,
            weight : Math.round(weightInKg),
            height : Math.round(heightInCm)
        },
        
    };
    status["BMI"] = calculateBMI();
    status["status"] = defineStatus(status["BMI"]);
    if( status["status"] == "obese"){
        status["recommendation"]="admission required";
    }
    
    function calculateBMI() {
        return Math.round(weightInKg / (heightInM ** 2));
    }
    function defineStatus(bmi) {
        if (bmi < 18.5) {
            return "underweight";
        } else if (bmi < 25) {
            return "normal";
        } else if (bmi < 30) {
            return "overweight";
        }
        return "obese";
    }
    return status;
}
console.log(generateStatus("Alex", 20, 80.4, 180));