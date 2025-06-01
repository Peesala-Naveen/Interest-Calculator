const Principal_amount = document.getElementById("Principal_amount");
const Time_Period_Y_M = document.getElementById("Time_Period_Y_M");
const Time_Period_M = document.getElementById("Time_Period_M");
const Rate_percent = document.getElementById("Rate_percent");
const Rate_Rs = document.getElementById("Rate_Rs");
const SI_Rs = document.getElementById("SI_Rs");
const Total_amount_Rs = document.getElementById("Total_amount_Rs");
const Calculate_btn = document.getElementById("Calculate");
const Status_msg = document.getElementById("Status_msg");
const Simple_Interest_Radio = document.getElementById("Simple_Interest_Radio");
const Compound_Interest_Radio = document.getElementById("Compound_Interest_Radio");
const n_value_for_compound = document.getElementById("n_value_for_compound");
const Rate_text = document.getElementById("Rate_text");
const Rate_percent_Radio = document.getElementById("Rate_percent_Radio");
const Rate_Rupess_Radio = document.getElementById("Rate_Rupess_Radio");

let Total_Amount = 0;
let Simple_Interest = 0;
let n = 0;
let Entered_Rate = 0;

//Calculating Simple Interest 
function Calculate_Simple_Interest(amount, rate, time) {
    Simple_Interest = (amount * rate * (time) / 100);      //PTR/100 :Formula (T in Years),(R in %)
    Total_Amount = (Simple_Interest + amount);
}

//check the n value as per selected menu item
function check_n_value() {
    n = parseInt(document.getElementById("n").value);
}

//Calculating Compound Interest
function Calculate_Compound_Interest(amount, rate, time) {
    //defination of compound interest calculation
    let exponent = n * time;
    let base = (1 + (rate / n));

    Total_Amount = amount * (base ** exponent);
    Simple_Interest = Total_Amount - amount;
}

//Handling the Rate Type radio buttons via Text 
Rate_Rupess_Radio.addEventListener('click', () => {
    Rate_text.innerText = "Enter the Rate of Interest(Rs..)";
});
Rate_percent_Radio.addEventListener('click', () => {
    Rate_text.innerText = "Enter the Rate of Interest(%)";
});

//Handling the Interest Mode Calculation radio buttons via Opacity
Compound_Interest_Radio.addEventListener('click', () => {
    n_value_for_compound.style.opacity = "1";
})
Simple_Interest_Radio.addEventListener('click', () => {
    n_value_for_compound.style.opacity = "0";
})

//change text in result and do calculations
Calculate_btn.addEventListener('click', () => {
    const Entered_Amount = parseFloat(document.getElementById("Entered_Amount").value); // <-- Added this

    const startDateValue = document.getElementById("Starting_Date").value;
    const endDateValue = document.getElementById("Ending_Date").value;

    if (!startDateValue || !endDateValue) {
        Status_msg.innerText = "Please select both Starting and Ending Dates.";
        Status_msg.style.color = "red";
        Status_msg.style.fontWeight = "900";
        return;
    }

    const startDate = new Date(startDateValue);
    const endDate = new Date(endDateValue);

    const Starting_Year = startDate.getFullYear();
    const Starting_Month = startDate.getMonth() + 1;  // JS months are 0-based
    const Starting_Date = startDate.getDate();

    const Ending_Year = endDate.getFullYear();
    const Ending_Month = endDate.getMonth() + 1;
    const Ending_Date = endDate.getDate();

    //Case Handling in Years Entered
    if (Starting_Year > Ending_Year) {
        Status_msg.innerText = "Invalid Years.Please,Check(Starting Year > Ending Year)";
        Status_msg.style.color = "red";
        Status_msg.style.fontWeight = "900";
        return;
    }

    //condition for the invalid Dates of date 31 for months with only 30 days
    if ((Starting_Month === 4 || Starting_Month === 6 || Starting_Month === 9 || Starting_Month === 11) && (Starting_Date > 30)) {
        Status_msg.innerText = "Enter a valid Starting Date";
        Status_msg.style.color = "red";
        Status_msg.style.fontWeight = "900";
        return;
    }
    if ((Ending_Month === 4 || Ending_Month === 6 || Ending_Month === 9 || Ending_Month === 11) && (Ending_Date > 30)) {
        Status_msg.innerText = "Enter a valid Ending Date";
        Status_msg.style.color = "red";
        Status_msg.style.fontWeight = "900";
        return;
    }

    //Case Handling of month february
    if ((Ending_Month === 2) && (Ending_Date > 29)) {
        Status_msg.innerText = "Enter a valid Ending Date";
        Status_msg.style.color = "red";
        Status_msg.style.fontWeight = "900";
        return;
    }
    if ((Starting_Month === 2) && (Starting_Date > 29)) {
        Status_msg.innerText = "Enter a valid Starting Date";
        Status_msg.style.color = "red";
        Status_msg.style.fontWeight = "900";
        return;
    }

    //Case Handling if its not a leap Year
    if ((Starting_Month === 2) && ((Starting_Year % 4 !== 0) || (Starting_Year % 100 === 0 && Starting_Year % 400 !== 0)) && Starting_Date > 28) {
        Status_msg.innerText = "Enter a valid Starting Date, Its not a leap Year";
        Status_msg.style.color = "red";
        Status_msg.style.fontWeight = "900";
        return;
    }
    if ((Ending_Month === 2) && ((Ending_Year % 4 !== 0) || (Ending_Year % 100 === 0 && Ending_Year % 400 !== 0)) && Ending_Date > 28) {
        Status_msg.innerText = "Enter a valid Ending Date, Its not a leap Year";
        Status_msg.style.color = "red";
        Status_msg.style.fontWeight = "900";
        return;
    }

    //Case Handling When the Type of Interest is not Selected
    if (!(Simple_Interest_Radio.checked || Compound_Interest_Radio.checked)) {
        Status_msg.innerText = "Please, Select the Mode of Calculation. Either Simple / Compound";
        Status_msg.style.color = "red";
        Status_msg.style.fontWeight = "900";
        return;
    }

    // Case Handling When the Rate Type Radio Button is not Selected
    if (!(Rate_percent_Radio.checked || Rate_Rupess_Radio.checked)) {
        Status_msg.innerText = "Please, Select the Rate Type Entered";
        Status_msg.style.color = "red";
        Status_msg.style.fontWeight = "900";
        return;
    }

    let Total_months = (Ending_Year - Starting_Year) * 12 + (Ending_Month - Starting_Month);
    if (Ending_Date < Starting_Date) {
        Total_months = Total_months - 1;
    }
    const Entered_Time = Total_months;

    //Case Handling Of type of rate Entered
    if (Rate_percent_Radio.checked) {
        Entered_Rate = parseFloat(document.getElementById("Entered_Rate").value);
    }
    if (Rate_Rupess_Radio.checked) {
        Rate_text.innerText = "Enter the Rate of Interest(Rs..)";
        Entered_Rate = parseFloat(document.getElementById("Entered_Rate").value) * 12;
    }

    //case Handling of valid inputs
    if (isNaN(Entered_Amount) || isNaN(Entered_Rate) || isNaN(Entered_Time)) {
        Status_msg.innerText = "Please Enter Valid inputs, Please Check the Entered Fields";
        Status_msg.style.color = "red";
        Status_msg.style.fontWeight = "900";
        return;
    }

    //updating the result box
    Principal_amount.innerText = Entered_Amount;
    Time_Period_M.innerText = Entered_Time;
    Rate_percent.innerText = Entered_Rate;
    Time_Period_Y_M.innerText = parseInt(Entered_Time / 12) + " Years, " + (Entered_Time % 12) + " Months";
    Rate_Rs.innerText = (Entered_Rate / 12) + " Rs";

    //Condition for checking radio button is clicked or not
    if (Simple_Interest_Radio.checked) {
        Calculate_Simple_Interest(Entered_Amount, Entered_Rate, Entered_Time / 12);
    }
    if (Compound_Interest_Radio.checked) {
        check_n_value();
        Calculate_Compound_Interest(Entered_Amount, Entered_Rate / 100, Entered_Time / 12);
    }
    Total_amount_Rs.innerText = Total_Amount.toFixed(2);
    SI_Rs.innerText = Simple_Interest.toFixed(2);
    Status_msg.innerText = "Successfully Calculated";
    Status_msg.style.color = "green";
    Status_msg.style.fontWeight = "900";
});
