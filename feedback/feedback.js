document.addEventListener('DOMContentLoaded', function() {
    // Update rating display when slider changes
    const ratingInput = document.getElementById('rating');
    const ratingDisplay = document.querySelector('.selected-rating');
    
    ratingInput.addEventListener('input', function() {
        ratingDisplay.textContent = this.value + '/10';
        
        // Visually update the color based on rating
        if (this.value >= 8) {
            ratingDisplay.style.color = '#227c9d'; // Use workshop color for high ratings
        } else if (this.value >= 5) {
            ratingDisplay.style.color = '#4A4A4A'; // Use showcase color for medium ratings
        } else {
            ratingDisplay.style.color = '#c75146'; // Use a reddish color for low ratings
        }
    });
    
    // Initialize the form
    document.querySelector('.feedback-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your feedback! This is a demo form - in a real application, your feedback would be submitted.');
    });
});