
function main() {
	Array.from(document.querySelectorAll(".LoginCard-input") || []).forEach(
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
}

main();
