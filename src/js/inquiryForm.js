/**
 * INQUIRY & QUOTE REQUEST FORM MODULE
 * Lead generation handling with async backend dispatch, submitting states, and fail-safe fallback.
 */

export function initInquiryForm() {
  const form = document.getElementById('kabod-inquiry-form');
  const formFeedback = document.getElementById('form-feedback-message');
  const submitBtn = form?.querySelector('button[type="submit"]');

  if (!form) return;

  // Endpoint configuration: checks for environment variable or configured webhook/form service
  const FORM_ENDPOINT = import.meta.env?.VITE_FORM_ENDPOINT || 'https://formspree.io/f/xvzgpqab';
  const OFFICIAL_EMAIL = 'Kabodtrading094@gmail.com';
  const OFFICIAL_PHONE_RAW = '+251911235960';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('inquiry-name')?.value.trim();
    const company = document.getElementById('inquiry-company')?.value.trim() || 'N/A';
    const phone = document.getElementById('inquiry-phone')?.value.trim();
    const email = document.getElementById('inquiry-email')?.value.trim();
    const interest = document.getElementById('inquiry-interest')?.value;
    const contactMethod = document.getElementById('inquiry-contact-method')?.value;
    const message = document.getElementById('inquiry-message')?.value.trim();

    // Validation
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

    const inquiryPayload = {
      fullName,
      company,
      phone,
      email,
      interest,
      contactMethod,
      message,
      submittedAt: new Date().toISOString()
    };

    // Prepare mailto & WhatsApp fallbacks
    const emailSubject = encodeURIComponent(`[RFQ Inquiry] ${interest} — ${fullName}`);
    const emailBody = encodeURIComponent(
      `Full Name: ${fullName}\nCompany: ${company}\nPhone: ${phone}\nEmail: ${email}\nInterest: ${interest}\nPreferred Contact: ${contactMethod}\n\nMessage/Specs:\n${message}\n\n-- Submitted via Kabod Motors Web RFQ`
    );
    const mailtoUrl = `mailto:${OFFICIAL_EMAIL}?subject=${emailSubject}&body=${emailBody}`;
    
    const waText = encodeURIComponent(
      `*Kabod Motors RFQ Inquiry*\nName: ${fullName}\nCompany: ${company}\nPhone: ${phone}\nInterest: ${interest}\nMessage: ${message}`
    );
    const whatsappUrl = `https://wa.me/${OFFICIAL_PHONE_RAW.replace(/[^0-9]/g, '')}?text=${waText}`;

    // Submitting State
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Formal Inquiry';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span style="display: inline-flex; align-items: center; gap: 0.5rem;">
          <svg style="animation: spin 1s linear infinite;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
          Transmitting Inquiry...
        </span>
      `;
    }

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(inquiryPayload)
      });

      if (response.ok) {
        if (formFeedback) {
          formFeedback.innerHTML = `
            <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #6EE7B7; padding: 1.25rem; border-radius: var(--radius-md); font-size: 0.9rem; margin-top: 1.25rem;">
              <h5 style="color: #FFFFFF; margin-bottom: 0.35rem; font-size: 1.05rem;">Inquiry Transmitted Successfully</h5>
              <p style="margin: 0 0 0.5rem 0; font-size: 0.85rem; color: var(--color-text-secondary);">
                Thank you, <strong>${fullName}</strong>. Your request for <strong>${interest}</strong> has been logged directly into our commercial sourcing desk.
              </p>
              <p style="margin: 0; font-size: 0.8rem; color: var(--color-text-muted);">
                Our team will reach out via <strong>${contactMethod}</strong> at <code>${contactMethod === 'Email' ? email : phone}</code>.
              </p>
            </div>
          `;
        }
        form.reset();
      } else {
        throw new Error('Endpoint rejected submission or reached limit');
      }
    } catch (err) {
      console.warn('Form submission fallback engaged:', err);
      if (formFeedback) {
        formFeedback.innerHTML = `
          <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.4); color: #FCD34D; padding: 1.25rem; border-radius: var(--radius-md); font-size: 0.875rem; margin-top: 1.25rem;">
            <h5 style="color: #FFFFFF; margin-bottom: 0.35rem; font-size: 1rem;">Direct Dispatch Ready</h5>
            <p style="margin: 0 0 0.75rem 0; font-size: 0.85rem; color: var(--color-text-secondary);">
              Your inquiry details are ready. Complete submission instantly via direct email or WhatsApp to ensure zero delay:
            </p>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <a href="${mailtoUrl}" class="btn btn-primary btn-sm" style="text-decoration: none; font-size: 0.8rem; padding: 0.4rem 0.85rem;">
                ✉️ Send via Email (${OFFICIAL_EMAIL})
              </a>
              <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="text-decoration: none; font-size: 0.8rem; padding: 0.4rem 0.85rem;">
                💬 Send via WhatsApp
              </a>
            </div>
          </div>
        `;
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  });
}

