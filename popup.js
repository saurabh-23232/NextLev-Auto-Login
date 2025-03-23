document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('credentials-form');
  const websiteList = document.getElementById('website-list');
  const deleteButton = document.getElementById('delete-website');
  const status = document.getElementById('status');

  // Load saved websites
  loadWebsites();

  // Save credentials
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const website = document.getElementById('website').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (website && username && password) {
      chrome.storage.local.get('credentials', (data) => {
        const credentials = data.credentials || {};
        credentials[website] = { username, password };

        chrome.storage.local.set({ credentials }, () => {
          status.textContent = 'Credentials saved successfully!';
          status.style.display = 'block';
          loadWebsites();
          setTimeout(() => (status.style.display = 'none'), 2000);
        });
      });
    }
  });

  // Delete selected website
  deleteButton.addEventListener('click', () => {
    const selectedWebsite = websiteList.value;

    if (selectedWebsite) {
      chrome.storage.local.get('credentials', (data) => {
        const credentials = data.credentials || {};
        delete credentials[selectedWebsite];

        chrome.storage.local.set({ credentials }, () => {
          status.textContent = 'Website deleted successfully!';
          status.style.display = 'block';
          loadWebsites();
          setTimeout(() => (status.style.display = 'none'), 2000);
        });
      });
    }
  });

  // Load websites into the dropdown
  function loadWebsites() {
    chrome.storage.local.get('credentials', (data) => {
      const credentials = data.credentials || {};
      websiteList.innerHTML = '';

      for (const website in credentials) {
        const option = document.createElement('option');
        option.value = website;
        option.textContent = website;
        websiteList.appendChild(option);
      }
    });
  }
  
});
