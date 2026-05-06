(function() {
  const init = () => {
    const forms = document.querySelectorAll('.contact-form');

    forms.forEach(function(form) {
      const nameInput = form.querySelector('input[name="name"]');
      const emailInput = form.querySelector('input[name="email"]');
      const subjectSelect = form.querySelector('select[name="subject"]');
      const messageTextarea = form.querySelector('textarea[name="message"]');
      const charCount = form.querySelector('.contact-char-count');
      const submitBtn = form.querySelector('.contact-submit-btn');
      const btnText = form.querySelector('.contact-btn-text');
      const btnLoading = form.querySelector('.contact-btn-loading');
      const successMsg = form.querySelector('.contact-success');

      const errorName = form.querySelector('.contact-error-name');
      const errorEmail = form.querySelector('.contact-error-email');
      const errorSubject = form.querySelector('.contact-error-subject');
      const errorMessage = form.querySelector('.contact-error-message');

      // Focus glow effect
      const inputs = form.querySelectorAll('.contact-input');
      inputs.forEach(function(input) {
        input.addEventListener('focus', function() {
          const glow = this.parentElement.querySelector('.contact-input-glow');
          if (glow) glow.style.opacity = '1';
        });
        input.addEventListener('blur', function() {
          const glow = this.parentElement.querySelector('.contact-input-glow');
          if (glow) glow.style.opacity = '0';
        });
      });

      // Select color update
      if (subjectSelect) {
        subjectSelect.addEventListener('change', function() {
          if (this.value) {
            this.classList.add('has-value');
            this.style.color = '#ffffff';
          } else {
            this.classList.remove('has-value');
            this.style.color = '#94a3b8';
          }
        });
      }

      // Char counter
      if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
          const len = this.value.length;
          const max = 1000;
          charCount.textContent = len + ' / ' + max;
          if (len > max) {
            this.value = this.value.substring(0, max);
            charCount.textContent = max + ' / ' + max;
            charCount.style.color = '#f87171';
          } else if (len > max * 0.9) {
            charCount.style.color = '#fb923c';
          } else {
            charCount.style.color = '#475569';
          }
        });
      }

      // Validate helpers
      function showError(el, show) {
        if (el) {
          if (show) {
            el.classList.remove('hidden');
          } else {
            el.classList.add('hidden');
          }
        }
      }

      function setInputError(input, hasError) {
        if (!input) return;
        if (hasError) {
          input.style.borderColor = 'rgba(248, 113, 113, 0.5)';
        } else {
          input.style.borderColor = '';
        }
      }

      function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      }

      // Real-time validation clear
      if (nameInput) {
        nameInput.addEventListener('input', function() {
          if (this.value.trim()) {
            showError(errorName, false);
            setInputError(this, false);
          }
        });
      }
      if (emailInput) {
        emailInput.addEventListener('input', function() {
          if (isValidEmail(this.value.trim())) {
            showError(errorEmail, false);
            setInputError(this, false);
          }
        });
      }
      if (subjectSelect) {
        subjectSelect.addEventListener('change', function() {
          if (this.value) {
            showError(errorSubject, false);
            setInputError(this, false);
          }
        });
      }
      if (messageTextarea) {
        messageTextarea.addEventListener('input', function() {
          if (this.value.trim()) {
            showError(errorMessage, false);
            setInputError(this, false);
          }
        });
      }

      // Form submit
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        let valid = true;

        const nameVal = nameInput ? nameInput.value.trim() : '';
        const emailVal = emailInput ? emailInput.value.trim() : '';
        const subjectVal = subjectSelect ? subjectSelect.value : '';
        const messageVal = messageTextarea ? messageTextarea.value.trim() : '';

        if (!nameVal) {
          showError(errorName, true);
          setInputError(nameInput, true);
          valid = false;
        } else {
          showError(errorName, false);
          setInputError(nameInput, false);
        }

        if (!emailVal || !isValidEmail(emailVal)) {
          showError(errorEmail, true);
          setInputError(emailInput, true);
          valid = false;
        } else {
          showError(errorEmail, false);
          setInputError(emailInput, false);
        }

        if (!subjectVal) {
          showError(errorSubject, true);
          setInputError(subjectSelect, true);
          valid = false;
        } else {
          showError(errorSubject, false);
          setInputError(subjectSelect, false);
        }

        if (!messageVal) {
          showError(errorMessage, true);
          setInputError(messageTextarea, true);
          valid = false;
        } else {
          showError(errorMessage, false);
          setInputError(messageTextarea, false);
        }

        if (!valid) return;

        // Simulate transmission
        submitBtn.disabled = true;
        if (btnText) btnText.classList.add('hidden');
        if (btnLoading) btnLoading.classList.remove('hidden');

        setTimeout(function() {
          submitBtn.disabled = false;
          if (btnText) btnText.classList.remove('hidden');
          if (btnLoading) btnLoading.classList.add('hidden');
          if (successMsg) successMsg.classList.remove('hidden');
          form.reset();
          if (subjectSelect) {
            subjectSelect.style.color = '#94a3b8';
            subjectSelect.classList.remove('has-value');
          }
          if (charCount) {
            charCount.textContent = '0 / 1000';
            charCount.style.color = '#475569';
          }
          setTimeout(function() {
            if (successMsg) successMsg.classList.add('hidden');
          }, 6000);
        }, 1800);
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();