document.addEventListener('DOMContentLoaded', function() {
    const ratingInput = document.getElementById('rating');
    
    document.querySelector('.feedback-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert("This doesn't work, dummy. We haven't learned databases yet");
    });
});