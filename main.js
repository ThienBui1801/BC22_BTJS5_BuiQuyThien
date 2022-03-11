'use strict';

const changeMoney = new Intl.NumberFormat('VND-vn', {
  style: 'currency',
  currency: 'VND',
});

const changeMoneyUs = new Intl.NumberFormat('us-US', {
  style: 'currency',
  currency: 'USD',
});


// 1. Tính tiền grab
/**
 *  1. Đầu vào
 *    - Tạo biến lưu hãng xe người dùng nhập vào và xuất ra giá tiền
 *  2. Xử lý
 *    - Tính toán giá tiền từng km xe chạy
 *    - Render giá tổng từng km ra HTML
 *  3. Đầu ra
 *    - Render tổng giá tiền phải trả
 */

document.getElementById('btn-brand').onclick = function () {
  const brandTaxi = document.querySelector('#brandTaxi').value;
  if (brandTaxi === 'GrabCar') {
    document.getElementById('first-price').value = '8000';
    document.getElementById('second-price').value = '7500';
    document.getElementById('third-price').value = '7000';
    document.getElementById('wait-price').value = '2000';
  }

  if (brandTaxi === 'GrabSUV') {
    document.getElementById('first-price').value = '9000';
    document.getElementById('second-price').value = '8500';
    document.getElementById('third-price').value = '8000';
    document.getElementById('wait-price').value = '3000';
  }

  if (brandTaxi === 'GrabBlack') {
    document.getElementById('first-price').value = '10000';
    document.getElementById('second-price').value = '9500';
    document.getElementById('third-price').value = '9000';
    document.getElementById('wait-price').value = '4000';
  }
}

function AllKmPrice() {
  const km1 = document.getElementById('first-km').value * 1;
  const price1 = document.getElementById('first-price').value * 1;

  const km2 = document.getElementById('second-km').value * 1;
  const price2 = document.getElementById('second-price').value * 1;

  const km3 = document.getElementById('third-km').value * 1;
  const price3 = document.getElementById('third-price').value * 1;

  const waitTime = document.getElementById('time-wait').value * 1;
  const priceWait = document.getElementById('wait-price').value * 1;

  const printSum1 = document.getElementById('print-first-km');
  const printSum2 = document.getElementById('print-second-km');
  const printSum3 = document.getElementById('print-third-km');
  const printSumW = document.getElementById('print-wait');

  let sum1;
  let sum2;
  let sum3;
  let sum4;
  let sumAll;

  if (1 >= km1) {
    sum1 = km1 * price1;
    printSum1.innerHTML = changeMoney.format(sum1);
  }

  if (1 < km2 <= 19) {
    sum2 = (km1 * price1) + (km2 - km1) * price2;
    printSum2.innerHTML = changeMoney.format(sum2);
  }

  if (19 < km3) {
    sum3 = (km1 * price1) + ((km1 * price1) + (km2 - km1) * price2) + (km3 - 19) * price3;
    printSum3.innerHTML = changeMoney.format(sum3);
  }

  if (waitTime % 3 === 0) {
    sum4 = (waitTime / 3) * priceWait;
    printSumW.innerHTML = changeMoney.format(sum4);
  }

  sumAll = sum1 + sum2 + sum3 + sum4;

  document.getElementById('price-sum').innerHTML = changeMoney.format(sumAll);

};

document.getElementById('print-calc').onclick = function () {
  AllKmPrice();
}

// 3. Tính tiền thuế
/**
 *  1. Tạo hàm tính toán tiền thuế phải trả & biến lưu giá trị
 *  2. Lặp câu điều kiện với từng trường hợp từng mức % tiền thuế
 *  3. Render HTML tổng số tiền thuế phải trả
 */
function incomeTax() {
  const taxValue = document.getElementById('tax-value').value * 1;
  const taxPerson = document.getElementById('tax-person').value * 1;

  if (taxValue <= 60000000) {
    return (taxValue - 4000000 - taxPerson * 1600000) * 0.05;
  } else if (taxValue <= 120000000) {
    return (taxValue - 4000000 - taxPerson * 1600000) * 0.1;
  } else if (taxValue <= 216000000) {
    return (taxValue - 4000000 - taxPerson * 1600000) * 0.15;
  } else if (taxValue <= 384000000) {
    return (taxValue - 4000000 - taxPerson * 1600000) * 0.2;
  } else if (taxValue <= 624000000) {
    return (taxValue - 4000000 - taxPerson * 1600000) * 0.25;
  } else if (taxValue <= 960000000) {
    return (taxValue - 4000000 - taxPerson * 1600000) * 0.3;
  } else if (taxValue > 960000000) {
    return (taxValue - 4000000 - taxPerson * 1600000) * 0.35;
  }
}


const btnTax = document.querySelector('#btn-tax');
btnTax.addEventListener('click', function () {
  const taxUser = document.getElementById('tax-user').value;
  document.getElementById('print-tax').innerHTML =
    `
  <p>${taxUser}</p>
  <p>Tiền thuế phải đóng ${changeMoney.format(incomeTax())}</p>
  `;
})

// 4. Tính tiền điện
/**
 *  1. Tạo hàm xử lý tính số tiền điện phải trả + thuế VAT 10%
 *  2. Xử lý các điều kiện với số tiền theo từng mốc số điện
 *  3. Render HTML số tiền điện phải trả
 */


function moneyElectric() {
  const numberElec = document.getElementById('number-Elec').value * 1;

  if (numberElec <= 50) {
    return (numberElec * 500) + (numberElec * 500) * 0.1;
  } else if (numberElec <= 100) {
    return ((50 * 500) + (numberElec - 50) * 650) +
      ((50 * 500) + (numberElec - 50) * 650) * 0.1;
  } else if (numberElec <= 200) {
    return (50 * 500 + (50 * 650) + (numberElec - 100) * 850) +
      (50 * 500 + (50 * 650) + (numberElec - 100) * 850) * 0.1;
  } else if (numberElec <= 350) {
    return ((50 * 500) + (50 * 650) + (100 * 850) + (numberElec - 200) * 1100) +
      ((50 * 500) + (50 * 650) + (100 * 850) + (numberElec - 200) * 1100) * 0.1;
  } else if (350 < numberElec) {
    return ((50 * 500) + (50 * 650) + (100 * 850) + (150 * 1100) + (numberElec - 350) * 1300) +
      ((50 * 500) + (50 * 650) + (100 * 850) + (150 * 1100) + (numberElec - 350) * 1300) * 0.1;
  }
}

const btnElec = document.querySelector('#btn-elec');
btnElec.addEventListener('click', function () {
  document.getElementById('print-elec').innerHTML =
    `<p>Tiền điện tháng này là ${changeMoney.format(moneyElectric())}</p>`;
})

// 5. Tính tiền cáp
/**
 *  1. Tạo biến lưu thông tin, dữ liệu nhập vào
 *  2. Xử lý
 *    - Tạo hàm để tính tiền cáp của hộ gia đình
 *    - Tạo hàn để tính tiền cáp của doanh nghiệp
 *  3. Render HTML tổng tiền phải trả của hộ gia đình và doanh nghiệp
 */

// House
function calcHouse() {
  const idHouse = document.getElementById('code__house').value;
  const idBank = document.getElementById('code__house-bank').value;
  const renderHouse = document.getElementById('print-infor-house');

  const houseRegis = document.getElementById('code__house-regis').value * 1;
  const houseCheck = document.getElementById('house-check').value * 1;
  const houseService = document.getElementById('house-service').value * 1;
  const houseChannel = document.getElementById('house-channel').value * 1;

  const allMoneyPay = houseRegis * (houseCheck + houseService + houseChannel);
  // console.log(allMoneyPay)

  renderHouse.innerHTML =
    `
  <p>Mã Khách Hàng: ${idHouse}</p>
  <p>Số Tài Khoản: ${idBank}</p>
  <p>Tổng chi phí tiền cáp: ${changeMoneyUs.format(allMoneyPay)}</p>
  `;

}

const btnHouse = document.querySelector('#btn-house');
btnHouse.addEventListener('click', calcHouse);

// Company
function calcCompany() {
  const idCompany = document.getElementById('code__company').value;
  const idBank = document.getElementById('code__company-bank').value;
  const renderCompany = document.getElementById('print-infor-company');

  const companyRegis = document.getElementById('code__company-regis').value * 1;
  const companyCheck = document.getElementById('company-check').value * 1;
  const companyService = document.getElementById('company-service').value * 1;
  const companyPlus = document.getElementById('company-service-plus').value * 1;
  const companyChannel = document.getElementById('company-channel').value * 1;

  const allMoneyPay = companyRegis * (companyCheck + companyService + companyPlus + companyChannel);

  renderCompany.innerHTML =
    `
  <p>Mã Khách Hàng: ${idCompany}</p>
  <p>Số Tài Khoản: ${idBank}</p>
  <p>Tổng chi phí tiền cáp: ${changeMoneyUs.format(allMoneyPay)}</p>
  `;

}

const btnCompany = document.querySelector('#btn-company');
btnCompany.addEventListener('click', calcCompany);