//variables
let card = document.querySelector('.card'),
	filterTriggers = document.querySelectorAll('.sub-menu li'),
	allBagde = document.querySelector('#allBadge'),
	maleBadge = document.querySelector('#maleBadge'),
	femaleBadge = document.querySelector('#femaleBadge'),
	leGrandBadge = document.querySelector('#leGrand'),
	krossBadge = document.querySelector('#kross'),
	explorerBadge = document.querySelector('#explorer'),
	visitorBadge = document.querySelector('#visitor'),
	ponyBadge = document.querySelector('#pony'),
	forceBadge = document.querySelector('#force'),
	eBikesBadge = document.querySelector('#eBikes'),
	idealBadge = document.querySelector('#ideal'),
	products;

$.get('https://json-project3.herokuapp.com/products').then(data => {
	console.log(data)
	products = data;

	//create card for every bike
	let createCard = arr => {
		arr.forEach(function(product) {
			card.innerHTML += `<div class="col-md-4 card-cont">
							<a href="#" class="inner">
								<div class="img-cont">
									<img src="img/${product.image}.png" class="card-img img img-responsive">
								</div>
								<div class="content-cont">
									<h2>${product.name}</h2>
									<p class="price">${product.price} $</p>
								</div>
							</a>
						</div>`;
		});
	};

	createCard(products);

	//filterize function that does filter for products by gender & brand
	let filterize = (filterName, type) => {
		filterName = products.filter(function(product) {
			return product[type] === filterName;
		});
		return filterName;
	};

	// fill the gender badges
	maleBadge.innerText = filterize('MALE', 'gender').length;
	femaleBadge.innerText = filterize('FEMALE', 'gender').length;

	// fill the brand bagdes
	leGrandBadge.innerText = filterize('LE GRAND BIKES', 'brand').length;
	krossBadge.innerText = filterize('KROSS', 'brand').length;
	explorerBadge.innerText = filterize('EXPLORER', 'brand').length;
	visitorBadge.innerText = filterize('VISITOR', 'brand').length;
	ponyBadge.innerText = filterize('PONY', 'brand').length;
	forceBadge.innerText = filterize('FORCE', 'brand').length;
	eBikesBadge.innerText = filterize('E-BIKES', 'brand').length;
	idealBadge.innerText = filterize('IDEAL', 'brand').length;
	allBadge.innerText = products.length;

	//event listeners for the filters
	filterTriggers.forEach(trigger => {
		trigger.addEventListener('click', function(e) {
			//delete the active class from every filter trigger
			filterTriggers.forEach(trigger => trigger.classList.remove('active'));

			//clear the card container at frist
			card.innerHTML = '';

			//add the active class on the current filter trigger
			e.currentTarget.classList.add('active');

			//get the currentFilter name from the event currentTarget
			let currentFilterName = e.currentTarget.children[0].innerText.toUpperCase();

			//get the currentFilter type (gender or brand) from the event currentTarget
			let currentFilterType = e.currentTarget.getAttribute('data-type');

			//filter the products array using the function from above with the current filter
			let filtered = filterize(currentFilterName, currentFilterType);

			//create a card with the filtered results
			//if you click on the 'Show all' filter give all results
			if (currentFilterType === 'all') {
				createCard(products);

				//else create card with the clicked filter (brand/gender)
			} else {
				createCard(filtered);
			}
		});
	});
});
