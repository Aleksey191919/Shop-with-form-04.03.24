/** @format */

function showCategories() {
  const parent = document.getElementById('categories');

  data.forEach((category) => {
    const myCategoryElement = document.createElement('div');
    myCategoryElement.textContent = category.name;
    myCategoryElement.setAttribute('data-category', category.key);

    parent.appendChild(myCategoryElement);
  });
}

function showProductsByCategory(categoryId) {
  const selectedCategory = data.find((category) => category.key === categoryId);

  const parent = document.getElementById('products');
  parent.innerHTML = '';

  selectedCategory.products.forEach((product) => {
    const productElement = document.createElement('div');
    productElement.textContent = product.name;
    productElement.setAttribute('data-product', product.id);
    productElement.setAttribute('data-category', categoryId);

    parent.appendChild(productElement);
  });
}

function showProductInfo(categoryId, productId) {
  const selectedCategory = data.find((category) => category.key === categoryId);
  const selectedProduct = selectedCategory.products.find(
    (product) => product.id == productId
  );

  const parent = document.getElementById('product');
  parent.innerHTML = `
    <h2>${selectedProduct.name}</h2>
    <p>Price: $${selectedProduct.price}</p>
    <p>${selectedProduct.description}</p>
  `;

  const buyButton = document.createElement('input');
  buyButton.setAttribute('type', 'button');
  buyButton.setAttribute('value', 'Купить');

  buyButton.addEventListener('click', function () {
    // showMessage();
    showOrderForm();
    clearUserData();
  });

  parent.appendChild(buyButton);
}

function clearUserData() {
  document.getElementById('products').innerHTML = '';
  document.getElementById('product').innerHTML = '';
}

function showMessage() {
  const messageWindow = window.open('', 'Message', 'width=400,height=200');
  messageWindow.document.write('<p>Товар успешно куплен!</p>');
  messageWindow.document.write(
    '<button onclick="window.close();">Закрыть</button>'
  );
  setTimeout(function () {
    messageWindow.close();
  }, 5000);
}
function showOrderForm() {
  const formHtml = `
    <form id="orderFormContent">
      <h3>Форма заказа</h3>
      <p><input type="text" name="name" placeholder="Ваше имя" /><span class="error error-name"></span></p>
      <p><input type="text" name="lastName" placeholder="Ваше фамилия" /><span class="error error-lastname"></span></p>
      <p><input type="text" name="surname" placeholder="Ваше отчество" /><span class="error error-surname"></span></p>
      <p>
      <select name="city">
        <option value="">--Выберите город--</option>
        <option value="Kiev">Киев</option>
        <option value="Kharkov">Харьков</option>
        <option value="Odessa">Одесса</option>
      </select>
      <span class="error error-city"></span>
      </p>
      <select name="newPost">
      <option value="">--Новой почта № --</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      </select>
      <span class="error error-post"></span>
      </p>
      <p><input type="radio" checked name="paymentMethod" value="Card" />Банковская карта</p>
      <p><input type="radio" name="paymentMethod" value="paymentCOD" />Наложенный платеж
      </p>
      <p>Количество</p>
      <p><input type="number" id="quantity" name="quantity" min="1" value="1">
      <span class="error error-message"></span>
      </p>
      <p>Комментарий к заказу</p>
      <p><textarea id="comment" name="comment"></textarea></p>
      <p><input type="button" id="orderbtn" value="Оформить заказ"></p>
    </form>
  `;

  const orderFormDiv = document.getElementById('orderForm');
  orderFormDiv.innerHTML = formHtml;
  orderFormDiv.style.display = 'block';

  document
    .querySelector('input[name="name"]')
    .addEventListener('keyup', (event) => {
      if (event.target.value === '') {
        document.querySelector('.error-name').innerHTML =
          'Пожалуйста введите ваше имя!';
        document.forms.orderFormContent.name.classList.add('input-error');
      } else {
        document.querySelector('.error-name').innerHTML = '';
        document.forms.orderFormContent.name.classList.remove('input-error');
      }
    });

  document
    .querySelector('input[name="lastName"]')
    .addEventListener('keyup', (event) => {
      if (event.target.value === '') {
        document.querySelector('.error-lastname').innerHTML =
          'Пожалуйста введите вашу фамилию!';
        document.forms.orderFormContent.lastName.classList.add('input-error');
      } else {
        document.querySelector('.error-lastname').innerHTML = '';
        document.forms.orderFormContent.lastName.classList.remove(
          'input-error'
        );
      }
    });

  document
    .querySelector('input[name="surname"]')
    .addEventListener('keyup', (event) => {
      if (event.target.value === '') {
        document.querySelector('.error-surname').innerHTML =
          'Пожалуйста введите ваше отчество';
        document.forms.orderFormContent.surname.classList.add('input-error');
      } else {
        document.querySelector('.error-surname').innerHTML = '';
        document.forms.orderFormContent.surname.classList.remove('input-error');
      }
    });

  document
    .querySelector('select[name="city"]')
    .addEventListener('change', (event) => {
      const errorElement = document.querySelector('.error-city');
      const selectElement = event.target;

      if (selectElement.value === '') {
        errorElement.innerHTML = 'Пожалуйста выберите ваш город!';
        selectElement.classList.add('input-error');
      } else {
        errorElement.innerHTML = '';
        selectElement.classList.remove('input-error');
      }
    });

  document
    .querySelector('select[name="newPost"]')
    .addEventListener('change', (event) => {
      const errorElement = document.querySelector('.error-post');
      const selectElement = event.target;

      if (selectElement.value === '') {
        errorElement.innerHTML = 'Пожалуйста выберите номер отделения!';
        selectElement.classList.add('input-error');
      } else {
        errorElement.innerHTML = '';
        selectElement.classList.remove('input-error');
      }
    });

  document.getElementById('orderbtn').onclick = function (event) {
    const form = document.forms.orderFormContent;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const surname = form.surname.value;
    const city = form.city.value;
    const newPostOffice = form.newPost.value;
    const paymentMethod = form.paymentMethod.value;
    const quantity = form.quantity.value;
    const userComment = form.comment.value;

    const userData = {
      name,
      lastName,
      surname,
      city,
      newPostOffice,
      paymentMethod,
      quantity,
      userComment,
    };
    const isFormValid = validateForm(userData);

    if (isFormValid) {
      orderFormDiv.style.display = 'none';
      const previousTable = document.getElementById('userDataTable');
      if (previousTable) {
        previousTable.remove();
      }

      const table = createTable(userData);

      const orderSummaryDiv = document.getElementById('orderSummary');
      if (orderSummaryDiv) {
        orderSummaryDiv.appendChild(table);
      } else {
        console.error('Не найден контейнер для отображения заказа');
      }
    }
  };
}

function createTable(userData) {
  const table = document.createElement('table');
  for (const key in userData) {
    if (userData[key] !== '' && userData[key] !== 'undefined') {
      const tr = document.createElement('tr');
      const tdKey = document.createElement('td');
      tdKey.textContent = key;
      tr.appendChild(tdKey);
      const tdValue = document.createElement('td');
      tdValue.textContent = userData[key];
      tr.appendChild(tdValue);
      table.appendChild(tr);
    }
  }
  return table;
}

function validateForm(userData) {
  let isFormValid = true;

  if (!userData.name.trim()) {
    document.querySelector('.error-name').innerHTML =
      'Пожалуйста введите ваше имя!';
    document.forms.orderFormContent.name.classList.add('input-error');
    isFormValid = false;
  } else {
    document.querySelector('.error-name').innerHTML = '';
    document.forms.orderFormContent.name.classList.remove('input-error');
  }

  if (!userData.lastName.trim()) {
    document.querySelector('.error-lastname').innerHTML =
      'Пожалуйста введите вашу фамилию!';
    document.forms.orderFormContent.lastName.classList.add('input-error');
    isFormValid = false;
  } else {
    document.querySelector('.error-lastname').innerHTML = '';
    document.forms.orderFormContent.lastName.classList.remove('input-error');
  }

  if (!userData.surname.trim()) {
    document.querySelector('.error-surname').innerHTML =
      'Пожалуйста введите ваше отчество!';
    document.forms.orderFormContent.surname.classList.add('input-error');
    isFormValid = false;
  } else {
    document.querySelector('.error-surname').innerHTML = '';
    document.forms.orderFormContent.surname.classList.remove('input-error');
  }

  if (!userData.city) {
    document.querySelector('.error-city').innerHTML =
      'Пожалуйста выберите ваш город!';
    document.forms.orderFormContent.city.classList.add('input-error');
    isFormValid = false;
  } else {
    document.querySelector('.error-city').innerHTML = '';
    document.forms.orderFormContent.city.classList.remove('input-error');
  }

  if (!userData.newPostOffice) {
    document.querySelector('.error-post').innerHTML =
      'Пожалуйста выберите номер отделения!';
    document.forms.orderFormContent.newPost.classList.add('input-error');
    isFormValid = false;
  } else {
    document.querySelector('.error-post').innerHTML = '';
    document.forms.orderFormContent.newPost.classList.remove('input-error');
  }

  return isFormValid;
}
