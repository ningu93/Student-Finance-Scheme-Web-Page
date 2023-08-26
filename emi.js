function calculateEMI() {
    var loanAmount = parseFloat(document.getElementById('loanAmount').value);
    var initialAmount = parseFloat(document.getElementById('initialAmount').value);
    var tenure = parseInt(document.getElementById('tenure').value);

    var interestRate, registrationAmountPercent;
    switch (tenure) {
        case 6:
            interestRate = 5.20;
            registrationAmountPercent = 6.00;
            break;
        case 8:
            interestRate = 6.50;
            registrationAmountPercent = 8.00;
            break;
        case 10:
            interestRate = 7.90;
            registrationAmountPercent = 10.00;
            break;
        case 12:
            interestRate = 9.12;
            registrationAmountPercent = 12.00;
            break;
        case 18:
            interestRate = 13.68;
            registrationAmountPercent = 14.00;
            break;
        case 24:
            interestRate = 18.10;
            registrationAmountPercent = 16.00;
            break;
        default:
            return;
        }

    var emi = (loanAmount - initialAmount) * (interestRate / 1200) / (1 - Math.pow(1 + (interestRate / 1200), -tenure));
    var emi1=Math.ceil(emi);
    const registrationAmount = (registrationAmountPercent / 100) * loanAmount;
    

    const resultTable = document.getElementById('resultTable');
    const newRow = resultTable.insertRow(-1);
    const loanamount=newRow.insertCell(0);
    const initialamount=newRow.insertCell(1);
    const tenureCell = newRow.insertCell(2);
    const interestRateCell = newRow.insertCell(3);
    const registerfee=newRow.insertCell(4);
    const emiCell = newRow.insertCell(5);
    
    tenureCell.innerHTML = `${tenure} months`;
    interestRateCell.innerHTML = `${interestRate.toFixed(2)}%`;
    emiCell.innerHTML = `${emi1.toFixed(2)}`;
    loanamount.innerHTML=`${loanAmount.toFixed(2)}`;
    initialamount.innerHTML=`${initialAmount.toFixed(2)}`;
    registerfee.innerHTML=`${registrationAmount.toFixed(2)}`;

    document.getElementById('te').value = tenure;
    document.getElementById('ir').value = interestRate.toFixed(2);
    document.getElementById('ra').value = registrationAmount.toFixed(2);
    document.getElementById('emi').value = emi1.toFixed(2);

}

const form = document.querySelector("#form")
const submitButton = document.querySelector("#submit")
const scriptURL ="https://script.google.com/macros/s/AKfycbxwli1amvglvKHYAX7xdEuWGl8lpMzs49JTBuc8L1Bz8mQJx9BNK7AuwwM_e-71tDCOVA/exec";
form.addEventListener('submit', e => {
    submitButton.disabled = true;
    e.preventDefault();
    let requestBody = new FormData(form);
    requestBody.append('Tenure', document.getElementById('te').value);
    requestBody.append('InterestRate', document.getElementById('ir').value);
    requestBody.append('RegistrationAmount', document.getElementById('ra').value);
    requestBody.append('EMI', document.getElementById('emi').value);

    fetch(scriptURL, { method: 'POST', body: requestBody })
    .then(response => {
        alert('Success!', response);
        submitButton.disabled = false;
    })
    .catch(error => {
        alert('Error!', error.message);
        submitButton.disabled = false;
    });
}); 