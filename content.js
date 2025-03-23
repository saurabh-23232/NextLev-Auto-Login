// content.js
window.addEventListener('load', () => {
  const currentHostname = window.location.hostname;

  chrome.storage.local.get('credentials', (data) => {
    const credentials = data.credentials || {};

    // Match saved credentials with the current website
    const matchingWebsite = Object.keys(credentials).find((site) => currentHostname.includes(new URL(site).hostname));

    if (matchingWebsite) {
      const { username, password } = credentials[matchingWebsite];

      function overrideAutocompleteAndSpellcheck() {
        const inputs = document.querySelectorAll('input[type="password"], input[type="text"], input[type="email"]');
        
        inputs.forEach(input => {
          input.setAttribute('autocomplete', 'on'); // Override autocomplete to "on"
          input.setAttribute('spellcheck', 'true');  // Enable spellcheck (optional)
        });
      }

      // Override autocomplete and spellcheck before autofilling
      overrideAutocompleteAndSpellcheck();

      // Wait for the login form to load if it's dynamically rendered
      const observer = new MutationObserver(() => {
        const usernameField = document.querySelector('input[type="email"], input[name="emailField"], input[name="username"], input[name="email"], input[name="name"], input[name="login"], input[name="user"], input[name="user_name"], input[name="login_username"], input[name="login_email"], input[name="login_username"], input[id="username"], input[id="username"], input[type="text"]');
        const passwordField = document.querySelector('input[type="password"], input[name="passwordField"],input[id="id_password"], input[id="password"], input[id="pass"], input[name="password"]');
        const loginButton = document.querySelector('button[type="submit"], input[type="submit"], input[type="login"], input[id="loginSubmit"],input[name="login_button"], input[type="button"], input[id="signin_btn"], button[id="signin_btn"], input[data-cy="sign-in-btn"]');
       
        if (usernameField && passwordField && loginButton) {
          // observer.disconnect(); // Stop observing once fields are found

          // Auto-fill the username and password fields
          usernameField.value = username;
          usernameField.dispatchEvent(new Event('input', { bubbles: true }));
          usernameField.dispatchEvent(new Event('change', { bubbles: true }));
          usernameField.dispatchEvent(new Event('blur', { bubbles: true }));

          
          passwordField.value = password;
          passwordField.dispatchEvent(new Event('input', { bubbles: true }));
          passwordField.dispatchEvent(new Event('change', { bubbles: true }));
          passwordField.dispatchEvent(new Event('blur', { bubbles: true }));
          passwordField.focus(); 

          
    passwordField.dispatchEvent(new Event('keydown', { bubbles: true }));
    passwordField.dispatchEvent(new Event('keyup', { bubbles: true }));

          // Wait for 6 seconds before clicking the login button
          setTimeout(() => {
            loginButton.click();
          }, 6000); // Wait 6 seconds before clicking the login button
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });

      // Also check immediately in case the form is already present
      const usernameField = document.querySelector('input[type="email"], input[name="emailField"], input[name="username"], input[name="email"], input[name="name"], input[name="login"], input[name="user"], input[name="user_name"], input[name="login_username"], input[name="login_email"], input[name="login_username"], input[id="username"], input[id="username"], input[type="text"]');
      const passwordField = document.querySelector('input[type="password"],input[name="passwordField"],input[id="id_password"], input[id="password"], input[id="pass"], input[name="password"]');
      const loginButton = document.querySelector('button[type="submit"], input[type="submit"], input[type="login"], input[id="loginSubmit"],input[name="login_button"],  input[type="button"], input[id="signin_btn"], button[id="signin_btn"], input[data-cy="sign-in-btn"]');
      // const loginButton = document.querySelector('.login-btn');


      if (usernameField && passwordField && loginButton) {
        observer.disconnect();

        // Auto-fill the username and password fields
        usernameField.value = username;
        usernameField.dispatchEvent(new Event('input', { bubbles: true }));
        usernameField.dispatchEvent(new Event('change', { bubbles: true }));
        usernameField.dispatchEvent(new Event('blur', { bubbles: true }));


        
        passwordField.value = password;
        // passwordField.focus(); this lead to pswd not fill if allow
        passwordField.dispatchEvent(new Event('input', { bubbles: true }));
        passwordField.dispatchEvent(new Event('change', { bubbles: true }));
        passwordField.dispatchEvent(new Event('blur', { bubbles: true }));
        passwordField.focus();


        passwordField.dispatchEvent(new Event('keydown', { bubbles: true }));
        passwordField.dispatchEvent(new Event('keyup', { bubbles: true }));


        // Wait for 6 seconds before clicking the login button
        setTimeout(() => {
          loginButton.click();
        }, 6000); // Wait 6 seconds before clicking the login button
      } else {
        // If the form is not found, try to find it again after a short delay
        setTimeout(() => {
          // const usernameField = document.querySelector('input[type="email"], input[name="username"], input[name="email"], input[name="name"], input[name="login"], input[name="user"], input[name="user_name"], input[name="login_username"], input[name="login_email"], input[name="login_username"], input[id="username"], input[id="username"]');
          const usernameField = document.querySelector('input[type="email"], input[name="emailField"], input[name="username"], input[name="email"], input[name="name"], input[name="login"], input[name="user"], input[name="user_name"], input[name="login_username"], input[name="login_email"], input[name="login_username"], input[id="username"], input[id="username"], input[type="text"]');
          const passwordField = document.querySelector('input[type="password"], input[type="text"], input[name="passwordField"],input[id="id_password"], input[id="password"], input[id="pass"], input[name="password"]');
          const loginButton = document.querySelector('button[type="submit"], input[type="submit"], input[type="login"], input[id="loginSubmit"],input[name="login_button"], input[type="button"], input[id="signin_btn"], button[id="signin_btn"], input[data-cy="sign-in-btn"]');
         
          if (usernameField && passwordField && loginButton) {
            // Auto-fill the username and password fields
            usernameField.value = username;
            usernameField.dispatchEvent(new Event('input', { bubbles: true }));
            usernameField.dispatchEvent(new Event('change', { bubbles: true }));
            usernameField.dispatchEvent(new Event('blur', { bubbles: true }));
            usernameField.focus();
            // Auto-fill the password field
            
            passwordField.value = password;
            passwordField.dispatchEvent(new Event('input', { bubbles: true }));
            passwordField.dispatchEvent(new Event('change', { bubbles: true }));
            passwordField.dispatchEvent(new Event('blur', { bubbles: true }));
            passwordField.focus(); 
            // Focus on the username field (optional, depending on the website's behavior)
             
          // Dispatch keydown and keyup events to simulate password entry
    passwordField.dispatchEvent(new Event('keydown', { bubbles: true }));
    passwordField.dispatchEvent(new Event('keyup', { bubbles: true }));

            // Wait for 6 seconds before clicking the login button
            setTimeout(() => {
              loginButton.click();
            }, 6000); // Wait 6 seconds before clicking the login button
          }
        }, 1000);
      }
    }
  });
});