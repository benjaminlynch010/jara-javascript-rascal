// ! ! !
// JavaScript Rascal
// See the README.md for more details
// ! ! !


// Array of products
const products = [
	{
		name: 'Chicken Harness and Leash',
		image: './images/chicken-harness.jpg',
		price: 35.00,
		reviews: {
			avgRating: 1.8,
			count: 59281
		},
		yearPosted: 2009
	},
	{
		name: 'Baguette Pillow',
		image: './images/baguette-pillow.jpg',
		price: 30.00,
		reviews: {
			avgRating: 5,
			count: 291
		},
		yearPosted: 2019
	},
	{
		name: 'The Hen Bag Handbag',
		image: './images/hen-bag.jpg',
		price: 33.00,
		reviews: {
			avgRating: 4.6,
			count: 8032
		},
		yearPosted: 2023
	},
	{
		name: 'Umbrella Hat',
		image: './images/umbrella-hat.jpg',
		price: 9.00,
		reviews: {
			avgRating: 2.3,
			count: 6
		},
		yearPosted: 1999
	}
];


function start() {
	console.log("in <start>")
	// Run the function to calculate product discounts
	calculateProductDiscounts(products);
}

// Takes in an array of products objects, calculates the
// discount for each product, and renders the results to the DOM.
function calculateProductDiscounts(arrayOfProducts) {
	console.log("in <calculateProductDiscounts>");
	// Loop through the array of products
	for (let i = 0; i < arrayOfProducts.length; i++) {
		// "i" just can't find a single product...
		const product = arrayOfProducts[i];
		// console.log("product object is:", product);
		// Calculate the discount for this one product object
		const discount = calculateDiscount(product);

		// Render the product and discount to the DOM
		renderProduct(product, discount);
	}
}

// Calculate the discount for a product, 
// based on the average review, the year it was posted, and the price
function calculateDiscount(product) {
	// Get a discount percentage, based on the product review
	let reviewDiscount = getReviewDiscount(product); 
	// console.log("in <reviewDiscount>:", reviewDiscount);
	// Get a discount percentage, based on the year the product was posted
	let yearAdjustment = getYearAdjustment(product.yearPosted);
	// console.log("year adjustment:", yearAdjustment);
	// Get a discount percentage, based on the product price
	let priceAdjustment = getPriceAdjustment(product.price);
	// console.log("in <getPriceAdjustment>:", priceAdjustment);
	// Add all the discount percentages up, to get a total discount percentage
	let discountPercent = reviewDiscount + yearAdjustment + priceAdjustment;
	console.log("discount percent:", discountPercent);
	// The discount cannot be more than 25%, or less that 0%
	if (discountPercent > 0.25) {
		discountPercent = 0.25;
	} else if (discountPercent < 0) {
		discountPercent = 0;
	}
	console.log("discount percent", discountPercent);
	// Convert the percentage to an actual dollar amount
	let discountAmount = product.price * discountPercent;
	console.log("discount amount:", discountAmount)

	return discountAmount;
}

// We'll give a bigger discount for lower rated products
function getReviewDiscount(product) {
	console.log("in <getReviewDiscount>");
	let discount = 0;
	console.log(product.reviews.avgRating);
	// 1, 2, or 3, you can't catch me!
	if (product.reviews.avgRating == 5) {
		// perfect rating 🏆, no discount
		discount = 0;
	}
	else if (product.reviews.avgRating > 4.8) {
		discount = 0.05;
	}
	else if (product.reviews.avgRating > 4.0) {
		discount = 0.10;
	}
	else if (product.reviews.avgRating > 3.5) {
		discount = 0.15;
	}
	else {
		discount = 0.20;
	}


	// Low rating, few reviews, bigger discount
	if (product.reviews.count < 100) {
		discount += 0.10;
	}
	console.log("discount is:", discount);
	return discount;
	// no discount for you!
}

// Old products get an extra 10% discount
function getYearAdjustment(yearPosted) {
	console.log("year:", yearPosted);
	if (yearPosted < 2010) {
		return 0.1;
	}
	return 0;
}

// Expensive products get an extra 8% discount
function getPriceAdjustment(price) {
	if (price > 30) {
		return 0.08;
	}
	return 0;
}

// Render a <tr> element to the DOM for a product
// NOTE: NO BUGS IN THIS FUNCTION!
function renderProduct(product, discount) {
	$('#content').append(`
		<tr>
			<td><img src="${product.image}" width=100/></td>
			<td>${product.name}</td>
			<td>${product.yearPosted}</td>
			<td>$${product.price.toFixed(2)}</td>
			<td>${product.reviews.avgRating}</td>
			<td>$${discount.toFixed(2)}</td>
		</li>
	`);
}
