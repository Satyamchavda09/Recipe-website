document.addEventListener('DOMContentLoaded', function() {
    // Select all recipe cards
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll events
    function handleScroll() {
        recipeCards.forEach(card => {
            if (isInViewport(card) && !card.classList.contains('animate')) {
                const animationType = card.getAttribute('data-animation');
                card.classList.add('animate', animationType);
            }
        });
    }
    
    // Initial check in case some cards are already in viewport on load
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Add click event to recipe buttons
    const recipeButtons = document.querySelectorAll('.view-recipe');
    recipeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.recipe-card');
            const recipeData = {
                title: card.querySelector('h2').textContent,
                image: card.querySelector('img').src,
                time: card.querySelector('.time').textContent,
                difficulty: card.querySelector('.difficulty').textContent,
                description: card.querySelector('p').textContent
            };
            
            // Store recipe data in localStorage to pass to the recipe page
            localStorage.setItem('currentRecipe', JSON.stringify(recipeData));
            
            // Redirect to recipe page
            window.location.href = 'recipe.html';
        });
    });
});