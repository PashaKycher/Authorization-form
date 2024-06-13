// -----------------
let count = 1
let id
let email
let country
let tel
let firstName
let lastName
let dataOfBirth
let gender
let password

// -----------------
let loginFormDiv = document.querySelector('.loginFormDiv')
let linksDiv = document.querySelector('.linksDiv')
let firstRegistrationDiv = document.querySelector('.firstRegistrationDiv')
let secondRegistrationDiv = document.querySelector('.secondRegistrationDiv')
let thirdRegistrationDiv = document.querySelector('.thirdRegistrationDiv')

let users = []

class User {
	constructor(
		id,
		email,
		country,
		tel,
		firstName,
		lastName,
		dataOfBirth,
		gender,
		password
	) {
		this.id = id
		this.email = email
		this.country = country
		this.tel = tel
		this.firstName = firstName
		this.lastName = lastName
		this.dataOfBirth = dataOfBirth
		this.gender = gender
		this.password = password
	}
}

// Логин и пароль, вход
// Находим кнопку
let enterBtn = document.querySelector('.enter')

// Вешаем обработчик
enterBtn.addEventListener('click', function () {
	// Находим элементы
	let loginForm = document.forms.loginForm
	let loginInput = loginForm.loginInput.value
	let passwordInput = loginForm.passwordInput.value
	let jsonString = localStorage.getItem('usersRegistration')
	let userLogin = JSON.parse(jsonString)
	for (i = 0; i < userLogin.length; i++) {
		if (
			loginInput == userLogin[i].email &&
			passwordInput == userLogin[i].password
		) {
			loginFormDiv.style.display = 'none'
			linksDiv.style.display = 'block'
		}
	}
	loginForm.addEventListener('submit', function (event) {
		event.preventDefault()
	})
})

// Первое окно регистрации
// Находим кнопку
let firstBtnNext = document.querySelector('.firstBtnNext')

// Вешаем обработчик
firstBtnNext.addEventListener('click', function () {
	// Находим элементы
	let firstRegistrationForm = document.forms.firstRegistration
	let emailRegistration = firstRegistrationForm.elements.emailRegistration.value
	let countryRegistration =
		firstRegistrationForm.elements.countryRegistration.value
	let countryTelRegistration =
		firstRegistrationForm.elements.countryTelRegistration.value
	let telRegistration = firstRegistrationForm.elements.telRegistration.value

	// Добавляем элементы в юзер
	function firstRegistration() {
		id = count
		email = emailRegistration
		country = countryRegistration
		tel = countryTelRegistration + telRegistration
	}
	firstRegistration()
	count += 1
	if (firstRegistrationForm.checkValidity()) {
		firstRegistrationDiv.style.display = 'none'
		secondRegistrationDiv.style.display = 'flex'
	}
	firstRegistrationForm.addEventListener('submit', function (event) {
		event.preventDefault()
	})
})

// Второе окно регистрации
// Находим кнопки
let secondBtnBack = document.querySelector('.secondBtnBack')
let secondBtnNext = document.querySelector('.secondBtnNext')

// Вешаем обработчик на кнопку Back
secondBtnBack.addEventListener('click', function(){
	secondRegistrationDiv.style.display = 'none'
	firstRegistrationDiv.style.display = 'flex'
})

// Вешаем обработчик на кнопку Next
secondBtnNext.addEventListener('click', function () {
	// Находим элементы
	let secondRegistrationForm = document.forms.secondRegistration
	let firstNameRegistration =
		secondRegistrationForm.elements.firstNameRegistration.value
	let lastNameRegistration =
		secondRegistrationForm.elements.lastNameRegistration.value
	let dataOfBirthRegistration =
		secondRegistrationForm.elements.dataOfBirthRegistration.value
	let genderRegistration =
		secondRegistrationForm.elements.genderRegistration.value

	// Добавляем элементы в юзер
	function secondRegistration() {
		firstName = firstNameRegistration
		lastName = lastNameRegistration
		dataOfBirth = dataOfBirthRegistration
		gender = genderRegistration
	}
	secondRegistration()
	if (secondRegistrationForm.checkValidity()) {
		secondRegistrationDiv.style.display = 'none'
		thirdRegistrationDiv.style.display = 'flex'
	}
	secondRegistrationForm.addEventListener('submit', function (event) {
		event.preventDefault()
	})
})

// Третье окно регистрации
// Находим кнопки
let thirdBtnBack = document.querySelector('.thirdBtnBack')
let thirdBtnNext = document.querySelector('.thirdBtnNext')

// Вешаем обработчик на кнопку Back
thirdBtnBack.addEventListener('click', function () {
	thirdRegistrationDiv.style.display = 'none'
	secondRegistrationDiv.style.display = 'flex'
})

// Находим элементы
let thirdRegistrationForm = document.forms.thirdRegistration
let passwordCreateRegistration =
	thirdRegistrationForm.elements.passwordCreateRegistration
let passwordConfirmRegistration =
	thirdRegistrationForm.elements.passwordConfirmRegistration
// let checkboxTermsRegistration = thirdRegistrationForm.elements.checkboxTermsRegistration.value

// проверка пароля
passwordConfirmRegistration.addEventListener('input', function () {
	if (passwordCreateRegistration.value != passwordConfirmRegistration.value) {
		passwordCreateRegistration.setCustomValidity(
			'Password and password confirmation do not match'
		)
		passwordConfirmRegistration.setCustomValidity(
			'Password and password confirmation do not match'
		)
	} else {
		passwordCreateRegistration.setCustomValidity('')
		passwordConfirmRegistration.setCustomValidity('')
	}
})

// Вешаем обработчик на кнопку Next
thirdBtnNext.addEventListener('click', function () {
	// Добавляем элементы в юзер
	function thirdRegistration() {
		password = passwordCreateRegistration.value
	}
	thirdRegistration()
	const user = new User(
		id,
		email,
		country,
		tel,
		firstName,
		lastName,
		dataOfBirth,
		gender,
		password
	)
	users.push(user)
	let jsonString = JSON.stringify(users)
	localStorage.setItem('usersRegistration', jsonString)
	if (thirdRegistrationForm.checkValidity()) {
		thirdRegistrationDiv.style.display = 'none'
		firstRegistrationDiv.style.display = 'flex'
	}
	console.log(users)
	thirdRegistrationForm.addEventListener('submit', function (event) {
		event.preventDefault()
	})
})
