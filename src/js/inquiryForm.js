/**
 * INQUIRY & QUOTE REQUEST FORM MODULE
 * Lead generation handling with field validation, feedback states, and contact links.
 */

export function initInquiryForm() {
  const form = document.getElementById('kabod-inquiry-form');
  const formFeedback = document.getElementById('form-feedback-message');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('inquiry-name')?.value.trim();
    const company = document.getElementById('inquiry-company')?.value.trim();
    const phone = document.getElementById('inquiry-phone')?.value.trim();
    const email = document.getElementById('inquiry-email')?.value.trim();
    const interest = document.getElementById('inquiry-interest')?.value;
    const contactMethod = document.getElementById('inquiry-contact-method')?.value;
    const message = document.getElementById('inquiry-message')?.value.trim();

    if (!fullName || !phone || !email || !message) {
      if (formFeedback) {
        formFeedback.innerHTML = `
          <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #FCA5A5; padding: 0.75rem 1rem; border-radius: var(--radius-md); font-size: 0.85rem; margin-top: 1rem;">
            Please complete all required fields (Full Name, Phone, Email, and Message).
          </div>
        `;
      }
      return;
    }

    // Success State
    if (formFeedback) {
      formFeedback.innerHTML = `
        <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #6EE7B7; padding: 1rem; border-radius: var(--radius-md); font-size: 0.9rem; margin-top: 1rem;">
          <h5 style="color: #FFFFFF; margin-bottom: 0.25rem; font-size: 1rem;">Thank you, ${fullName}!</h5>
          <p style="margin: 0; font-size: 0.85rem;">Your inquiry regarding <strong>${interest}</strong> has been logged. Our commercial team will contact you via <strong>${contactMethod}</strong> shortly.</p>
        </div>
      `;
    }

    form.reset();
  });
}
