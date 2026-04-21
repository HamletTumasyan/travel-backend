document.addEventListener('DOMContentLoaded', function () {
    const addMoreBtn = document.getElementById('add-more-links');
    const socialLinksContainer = document.getElementById('social-links-container');

    if (addMoreBtn && socialLinksContainer) {
        addMoreBtn.addEventListener('click', function () {
            const template = `
                <div class="social-link-item">
                    <label>URL (e.g., https://facebook.com/) </label>
                    <input type="url" name="urls" placeholder="https://...">
                    <label>Social Icon Image</label>
                    <input type="file" accept="image/*" name="images" class="social-image-input">
                    <img src="" alt="Preview" class="image-preview">
                    <button type="button" class="remove-link">Remove</button>
                </div>
            `;
            socialLinksContainer.insertAdjacentHTML('beforeend', template);
        });
    }

    document.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('remove-link')) {
            e.target.closest('.social-link-item').remove();
        }
    });

    document.addEventListener('change', function (e) {
        if (e.target && e.target.classList.contains('social-image-input')) {
            const input = e.target;
            let preview = input.nextElementSibling;
            
            if (input.id === 'image') {
                preview = document.getElementById('preview');
            }

            const file = input.files[0];
            if (file && preview) {
                preview.src = URL.createObjectURL(file);
                preview.style.display = 'block';
                if (preview.classList.contains('image-preview')) {
                    preview.classList.add('active');
                }
            } else if (preview) {
                preview.src = '';
                preview.style.display = 'none';
            }
        }
    });
});
