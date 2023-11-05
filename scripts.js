function hideAllPages() {
	document.getElementById("products").setAttribute("style", "display: none");
	document.getElementById("new-product").setAttribute("style", "display: none");
	document.getElementById("my-cart").setAttribute("style", "display: none");	
}

function displayProducts() {
	hideAllPages();
	document.getElementById("products").setAttribute("style", "");
}

function displayNewProduct() {
	hideAllPages();
	document.getElementById("new-product").setAttribute("style", "");
}

function displayMyCart() {
	hideAllPages();
	document.getElementById("my-cart").setAttribute("style", "");
}

products = [];

function addProduct(name, price, description, image_url) {
	let product = {
		name,
		price,
		description,
		image_url
	}

	products.push(product);
}

let description1 = "Books serve a multitude of purposes. They educate, entertain, and inspire readers. They provide knowledge, transport us to different worlds, and stimulate our imagination. Books are essential for learning, personal growth, and leisure. They preserve knowledge, making them valuable tools for both education and enjoyment in various aspects of life.";
let description2 = "Cold drinks, such as sodas and sugary beverages, are generally not considered healthy choices. They are often high in added sugars and provide empty calories with little nutritional value. Opting for healthier alternatives like water, herbal teas, or unsweetened iced tea is a better choice for quenching your thirst and maintaining your overall health.";
let description3 = "Lays potato chips, like most snack chips, are not typically considered healthy. They are often high in salt, saturated fats, and calories, which can contribute to health issues when consumed in excess. It's advisable to enjoy them in moderation as an occasional treat and prioritize healthier snack options like fresh fruits or nuts for a balanced diet.";
let description4 = "Ice cream, while delicious, is not considered a health food. It's high in sugar, saturated fats, and calories, which can contribute to weight gain and health issues. However, there are healthier alternatives available, like low-fat frozen yogurt or dairy-free options. Enjoying ice cream in moderation can be a part of a balanced diet.";

addProduct("Stationary", 1.08, description1,"product1.jpg" );
addProduct("Cold Drink Bottles", 1.1, description2, "images/colddrinks.jpg");
addProduct("Lays", 0.7, description3, "images/lays.jpg");
addProduct("Ice-Cream", 1.5, description4, "images/IceCream.jpg");

function fillProducts(products) {
	const container = document.getElementById("products");
	container.innerHTML = "";

	products.forEach((product, index) => {
		let html = `
		<section id="p${index}" class="pclass">
			<div>
				<h2>${product.name}</h2>
				<h3>$${product.price}</h3>
				<div class="image-and-text">
					<img src="${product.image_url}" alt="${product.name}">
					<p>${product.description}</p>
				</div>
				<button class="button_add" onclick="addToCart('${product.name}', '${product.price}')" type="button">Add to cart</button>
				<button class="button_delete" onclick="deleteProduct('${product.name}')" type="button">Delete</button>
			</div>
		</section>`;
		container.innerHTML += html;
	});
	
}

fillProducts(products);

function createNewProduct() {
	const name = document.getElementById("input_name").value;
	const price = document.getElementById("input_price").value;
	const desc = document.getElementById("input_desc").value;
	const img = document.getElementById("input_img").value;

	addProduct(name, price, desc, img);
	fillProducts(products);
	
}

function searchProduct() {
	const search = document.getElementById("input_search").value;

	fillProducts(products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())));
}

my_cart = []

function fillCart() {
	const container = document.getElementById("my-cart");
	container.innerHTML = "";

	let innerHTML = "<table>";
	innerHTML += "<tr><th>Product</th><th>Price</th></tr>";

	my_cart.forEach((product) => {
		let html = `
		<tr>
			<td>${product.name}</td>
			<td>$${product.price}</td>
		</tr>`;
		innerHTML += html;
	});

	innerHTML += "</table>";
	innerHTML += `
	<button class="button_buy" onclick="completePurchase()" type="button">Complete Purchase</button>
	`;
	container.innerHTML = innerHTML;
	const buyButton = document.querySelector('.button_buy');
	buyButton.style.marginTop = '10px'; // Add some space above the button
	buyButton.style.padding = '10px 20px'; // Increase the button size
	buyButton.style.borderRadius = '5px'; // Add border radius
	buyButton.style.backgroundColor = 'grey';
	buyButton.style.color = 'white';
	buyButton.style.position = 'absolute';
	buyButton.style.left = '50%';
	buyButton.style.transform = 'translateX(-50%)';
	buyButton.style.bottom = '20px';
	// const buyButton = document.createElement('button');
	// buyButton.className = 'button_buy';
	// buyButton.textContent = 'Purchase';

	// // Style the "Buy" button
	// buyButton.style.marginTop = '20px'; // Add some space above the button
	// buyButton.style.padding = '10px 20px'; // Set the button size
	// buyButton.style.borderRadius = '5px'; // Add border radius
	// buyButton.style.backgroundColor = 'grey';
	// buyButton.style.color = 'white';

	// // Position the "Buy" button at the bottom center of the page
	// buyButton.style.position = 'absolute';
	// buyButton.style.left = '50%';
	// buyButton.style.transform = 'translateX(-50%)';
	// buyButton.style.bottom = '20px';

	// // Add the button to the document body
	// document.body.appendChild(buyButton);
}
function hideBuyButton() {
	const buyButton = document.querySelector('.button_buy');
	if (buyButton) {
	  buyButton.remove(); // Remove the "Buy" button if it exists
	}
  }
  
  // Example: Add an event listener to hide the button when the user leaves the cart page
  document.getElementById("my-cart-link").addEventListener("click", function() {
	fillCart(); // Fill the cart when the cart page is accessed
  });
  
  // Call hideBuyButton when the user navigates away from the cart page
  document.getElementById("home-link").addEventListener("click", hideBuyButton);
  
function completePurchase() {
	// Here, you can implement the logic to complete the purchase, such as calculating the total price,
	// handling payment, or any other actions you need for the purchase process.
	alert("Purchase completed!"); // Example: Show an alert to indicate the purchase is completed.
}
function addToCart(name, price) {
	let product = {
		name,
		price
	}
	my_cart.push(product);
	fillCart();
}

addToCart("Stationary", 2.16);
addToCart("Cold Drink Bottles", 3.3);
addToCart("Ice-Cream", 4.5);

function deleteProduct(name) {
	if (confirm("Are you sure?")) {
		products = products.filter((p) => p.name != name);
		fillProducts(products);
	}
}

function sortProducts() {
	var element = document.getElementById("select_sort");
	var selectedValue = element.value; 

	if (selectedValue == "nameasc") {
		// sort by name asc
		products.sort((a, b) => {
			let prod1 = a.name.toUpperCase();
			let prod2 = b.name.toUpperCase();

			if (prod1 < prod2) {
				return -1;
			}

			if (prod1 > prod2) {
				return 1;
			}

			return 0;
		});
	} else if (selectedValue == "namedesc") {
		// sort by name desc
		products.sort((a, b) => {
			let prod1 = a.name.toUpperCase();
			let prod2 = b.name.toUpperCase();

			if (prod1 > prod2) {
				return -1;
			}

			if (prod1 < prod2) {
				return 1;
			}

			return 0;
		});
	} else if (selectedValue == "priceasc") {
		// sort by price asc
		products.sort((a, b) => {
		  	return a.price - b.price;
		});
	} else if (selectedValue == "pricedesc") {
		// sort by price desc
		products.sort((a, b) => {
			return b.price - a.price;
		});
	} 

	fillProducts(products);
}
