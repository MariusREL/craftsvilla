document.addEventListener('DOMContentLoaded', () => {
    // Base price configuration for different art forms and packages (per person)
    const pricingConfig = {
        watercolour: {
            novice: { basePrice: 200 },
            artisan: { basePrice: 750 },
            virtuoso: { basePrice: 1200 }
        },
        mosaic: {
            novice: { basePrice: 400 },
            artisan: { basePrice: 950 },
            virtuoso: { basePrice: 1500 }
        },
        canvas: {
            novice: { basePrice: 300 },
            artisan: { basePrice: 850 },
            virtuoso: { basePrice: 1300 }
        }
    };

    // Default art form
    let currentArtForm = 'watercolour';

    // Function to calculate price based on participants
    function calculatePrice(artForm, packageType, adultCount, childCount) {
        const basePrice = pricingConfig[artForm][packageType].basePrice;
        
        // Children get a 30% discount
        const childDiscount = 0.7;
        
        const adultTotal = basePrice * adultCount;
        const childTotal = basePrice * childDiscount * childCount;
        
        return adultTotal + childTotal;
    }

    // Function to update all package prices
    function updateAllPrices() {
        const adults = parseInt(document.getElementById('adult').value) || 0;
        const children = parseInt(document.getElementById('children').value) || 0;
        const packages = ['novice', 'artisan', 'virtuoso'];
        
        packages.forEach(pkg => {
            const price = calculatePrice(currentArtForm, pkg, adults, children);
            const formattedPrice = `NOK ${price.toFixed(0)},-`;
            
            const priceElement = document.querySelector(`.package-card[data-package="${pkg}"] .package-price`);
            if (priceElement) {
                priceElement.textContent = formattedPrice;
            }
        });
    }

    // Initialize prices
    updateAllPrices();

    // Art form selection
    const artOptions = document.querySelectorAll('.art-option');
    const artFormInput = document.getElementById('selected-art-form');
    
    artOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options
            artOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            option.classList.add('selected');
            
            // Update the selected art form value
            currentArtForm = option.dataset.form;
            artFormInput.value = currentArtForm;
            
            // Update prices based on the selected art form and current participants
            updateAllPrices();
        });
    });
    
    // Select watercolour by default
    const defaultOption = document.querySelector('.art-option[data-form="watercolour"]');
    if (defaultOption) {
        defaultOption.classList.add('selected');
        artFormInput.value = 'watercolour';
    }

    // Number input handlers with price updates
    const incrementButtons = document.querySelectorAll('.increment');
    const decrementButtons = document.querySelectorAll('.decrement');

    incrementButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.parentElement.querySelector('input');
            input.value = parseInt(input.value) + 1;
            updateAllPrices(); // Update prices after changing participant count
        });
    });
    
    decrementButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.parentElement.querySelector('input');
            const value = parseInt(input.value);
            if (value > parseInt(input.min)) {
                input.value = value - 1;
                updateAllPrices(); // Update prices after changing participant count
            }
        });
    });

    // Also listen for direct input changes
    document.getElementById('adult').addEventListener('change', updateAllPrices);
    document.getElementById('children').addEventListener('change', updateAllPrices);
    
    // Package selection
    const packageCards = document.querySelectorAll('.package-card');
    const packageInput = document.getElementById('selected-package');
    
    packageCards.forEach(card => {
        card.addEventListener('click', () => {
            packageCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            packageInput.value = card.dataset.package;
        });
    });
    
    // Add a total price display to the form
    const totalPriceElement = document.createElement('div');
    totalPriceElement.className = 'total-price';
    totalPriceElement.innerHTML = '<span class="total-label">Total:</span> <span class="total-amount">0,-</span>';
    document.querySelector('.submit-booking').before(totalPriceElement);
    
    // Update the total when a package is selected
    packageCards.forEach(card => {
        card.addEventListener('click', () => {
            const selectedPackage = card.dataset.package;
            const adults = parseInt(document.getElementById('adult').value) || 0;
            const children = parseInt(document.getElementById('children').value) || 0;
            
            const totalPrice = calculatePrice(currentArtForm, selectedPackage, adults, children);
            document.querySelector('.total-amount').textContent = `NOK${totalPrice.toFixed(0)},-`;
        });
    });
});