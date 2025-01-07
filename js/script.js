// Add loading animation
document.addEventListener('DOMContentLoaded', function() {
    // Create loading element
    const loading = document.createElement('div');
    loading.className = 'loading';
    document.body.appendChild(loading);

    // Remove loading after page loads
    window.addEventListener('load', function() {
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 500);
    });

    // Animate elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    });

    // Observe all service info sections
    document.querySelectorAll('.service-info').forEach(el => observer.observe(el));
    
    // Add hover effect to navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Get all quote forms (both on main page and service pages)
    const quoteForms = document.querySelectorAll('#quoteForm');
    
    quoteForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Log the data (replace with your actual form submission logic)
            console.log('Form submitted:', data);
            
            // Show success modal
            showModal();
            
            // Reset form
            form.reset();
        });
    });

    // Modal functions
    window.showModal = function() {
        const modal = document.getElementById('thankYouMessage');
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('show'), 10);
        
        // Add body class to prevent scrolling
        document.body.style.overflow = 'hidden';
        
        // Auto-hide modal after 5 seconds
        setTimeout(() => {
            closeModal();
        }, 5000);
    }

    window.closeModal = function() {
        const modal = document.getElementById('thankYouMessage');
        modal.classList.remove('show');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }
});

// Add parallax effect to service images
window.addEventListener('scroll', function() {
    const images = document.querySelectorAll('.service-image img');
    images.forEach(img => {
        const speed = 0.5;
        const rect = img.getBoundingClientRect();
        const visible = rect.top < window.innerHeight && rect.bottom > 0;
        if (visible) {
            const yPos = (window.pageYOffset - rect.top) * speed;
            img.style.transform = `translateY(${yPos}px)`;
        }
    });
}); 