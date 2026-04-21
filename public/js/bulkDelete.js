document.addEventListener('DOMContentLoaded', function () {
    function initBulkDelete(selectAllId, checkboxClass, deleteBtnId, hiddenInputId, formId) {
        const selectAll = document.getElementById(selectAllId);
        const checkboxes = document.querySelectorAll(checkboxClass);
        const deleteBtn = document.getElementById(deleteBtnId);
        const hiddenInput = document.getElementById(hiddenInputId);
        const bulkForm = document.getElementById(formId);

        function updateUI() {
            const checked = document.querySelectorAll(`${checkboxClass}:checked`);
            const count = checked.length;

            if (count > 0) {
                deleteBtn.style.display = 'inline-block';
                deleteBtn.textContent = count === 1 ? `Delete ${count} selected item` : `Delete ${count} selected items`;
                const ids = Array.from(checked).map(cb => cb.value);
                hiddenInput.value = ids.join(',');
            } else {
                deleteBtn.style.display = 'none';
            }

            if (selectAll) {
                if (checkboxes.length === count && checkboxes.length > 0) {
                    selectAll.checked = true;
                } else {
                    selectAll.checked = false;
                }
            }
        }

        if (selectAll) {
            selectAll.addEventListener('change', function () {
                checkboxes.forEach(cb => {
                    cb.checked = this.checked;
                });
                updateUI();
            });
        }

        checkboxes.forEach(cb => {
            cb.addEventListener('change', updateUI);
        });

        if (bulkForm) {
            bulkForm.addEventListener('submit', function (e) {
                const confirmed = confirm('Are you sure you want to remove selected data?');
                if (!confirmed) {
                    e.preventDefault();
                }
            });
        }
    }

    initBulkDelete('select-all-headings', '.row-checkbox-headings', 'delete-headings-btn', 'selected-headings-ids', 'bulk-delete-headings-form');

    initBulkDelete('select-all-packages', '.row-checkbox-packages', 'delete-packages-btn', 'selected-packages-ids', 'bulk-delete-packages-form');

    initBulkDelete('select-all-intros', '.row-checkbox-intros', 'delete-intros-btn', 'selected-intros-ids', 'bulk-delete-intros-form');

    initBulkDelete('select-all-teams', '.row-checkbox-teams', 'delete-teams-btn', 'selected-teams-ids', 'bulk-delete-teams-form');

    if (document.getElementById('select-all')) {
        initBulkDelete('select-all', '.row-checkbox', 'delete-btn', 'selected-ids', 'bulk-delete-form');
    }
});

