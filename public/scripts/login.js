const username = document.querySelector("#username");
const password = document.querySelector("#password");
const button = document.querySelector(".LoginCard-button");

function main() {
	Array.from(username || []).forEach(
		(input) => {
			input.addEventListener("focus", (event) => {
				event.target.classList.add("focus");
			});
			input.addEventListener("blur", (event) => {
				if (!event.target.value.length) {
					event.target.classList.remove("focus");
				}
			});
		}
	);
	button.addEventListener('click', handleSubmit);
}

main();

function handleSubmit(e) {
	e.preventDefault();
	doLogin();
}

async function doLogin() {
	const response = await fetch('http://localhost:3000/api/v1/auth', {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({
			userName: username.value,
			password: password.value
		})
	})
	if (response.status !== 401) {
		window.location.replace('http://localhost:3000/index.html');
	} else {
		alert('Usuario invalido, vuelva a ingresar usuario y contraseña.');
	}
}

//api/v1/auth post
//api/v1/jobs 