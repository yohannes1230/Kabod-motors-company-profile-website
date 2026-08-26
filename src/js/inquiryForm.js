/**
 * INQUIRY & QUOTE REQUEST FORM MODULE
 * Lead generation handling with async backend dispatch, spam protection, safe DOM rendering, and fail-safe fallback.
 */

// Helper to sanitize HTML entities
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function populateInquiry({ interest, productName, category, details } = {}) {
  const interestSelect = document.getElementById('inquiry-interest');
  const messageTextarea = document.getElementById('inquiry-message');
  const contactSection = document.getElementById('contact');

  if (interestSelect && interest) {
    // Find matching option or set exact value
    const match = Array.from(interestSelect.options).find(opt => 
      opt.value.toLowerCase().includes(interest.toLowerCase()) || 
      opt.text.toLowerCase().includes(interest.toLowerCase())
    );
    if (match) {
      interestSelect.value = match.value;
    } else {
      interestSelect.value = interest;
    }
  }

  if (messageTextarea) {
    if (productName) {
      messageTextarea.value = `Hello Kabod Motors team, I would like to request technical specifications, local availability, and formal pricing for: ${productName}${category ? ` (${category})` : ''}.${details ? `\n\nAdditional Requirements: ${details}` : ''}`;
    } else if (details) {
      messageTextarea.value = details;
    }
  }

  if (contactSection) {
    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
    const targetPosition = contactSection.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Focus on first input after scrolling
    setTimeout(() => {
      document.getElementById('inquiry-name')?.focus();
    }, 400);
  }
}

export function initInquiryForm() {
  const form = document.getElementById('kabod-inquiry-form');
  const formFeedback = document.getElementById('form-feedback-message');
  const submitBtn = form?.querySelector('button[type="submit"]');

  if (!form) return;

  const FORM_ENDPOINT = import.meta.env?.VITE_FORM_ENDPOINT || 'https://formspree.io/f/xvzgpqab';
  const OFFICIAL_EMAIL = 'Kabodtrading094@gmail.com';
  const OFFICIAL_PHONE_RAW = '+251911235960';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot spam check
    const honeypot = document.getElementById('inquiry-gotcha');
    if (honeypot && honeypot.value.trim().length > 0) {
      console.warn('Spam submission filtered via honeypot.');
      return;
    }

    const fullName = document.getElementById('inquiry-name')?.value.trim() || '';
    const company = document.getElementById('inquiry-company')?.value.trim() || 'N/A';
    const phone = document.getElementById('inquiry-phone')?.value.trim() || '';
    const email = document.getElementById('inquiry-email')?.value.trim() || '';
    const interest = document.getElementById('inquiry-interest')?.value || 'General Inquiry';
    const contactMethod = document.getElementById('inquiry-contact-method')?.value || 'Phone Call';
    const message = document.getElementById('inquiry-message')?.value.trim() || '';

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

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      if (formFeedback) {
        formFeedback.innerHTML = `
          <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #FCA5A5; padding: 0.75rem 1rem; border-radius: var(--radius-md); font-size: 0.85rem; margin-top: 1rem;">
            Please enter a valid email address.
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

    // Prepare mailto & WhatsApp fallbacks safely encoded
    const emailSubject = encodeURIComponent(`[Kabod Motors RFQ] ${interest} — ${fullName}`);
    const emailBody = encodeURIComponent(
      `Full Name: ${fullName}\nCompany: ${company}\nPhone: ${phone}\nEmail: ${email}\nInterest: ${interest}\nPreferred Contact: ${contactMethod}\n\nMessage/Specifications:\n${message}\n\n-- Submitted via Kabod Motors Corporate Portal`
    );
    const mailtoUrl = `mailto:${OFFICIAL_EMAIL}?subject=${emailSubject}&body=${emailBody}`;
    
    const waText = encodeURIComponent(
      `*Kabod Motors Corporate RFQ*\nName: ${fullName}\nCompany: ${company}\nPhone: ${phone}\nInterest: ${interest}\nMessage: ${message}`
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
          const safeName = escapeHTML(fullName);
          const safeInterest = escapeHTML(interest);
          const safeContact = escapeHTML(contactMethod);
          const safeTarget = escapeHTML(contactMethod === 'Email' ? email : phone);

          formFeedback.innerHTML = `
            <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #6EE7B7; padding: 1.25rem; border-radius: var(--radius-md); font-size: 0.9rem; margin-top: 1.25rem;">
              <h5 style="color: #FFFFFF; margin-bottom: 0.35rem; font-size: 1.05rem;">Thank you. Your inquiry has been sent to Kabod Motors.</h5>
              <p style="margin: 0 0 0.5rem 0; font-size: 0.85rem; color: var(--color-text-secondary);">
                Dear <strong>${safeName}</strong>, your request regarding <strong>${safeInterest}</strong> has been received by our commercial team.
              </p>
              <p style="margin: 0; font-size: 0.8rem; color: var(--color-text-muted);">
                A representative will contact you via <strong>${safeContact}</strong> at <code>${safeTarget}</code> within 24 business hours.
              </p>
            </div>
          `;
        }
        form.reset();
      } else {
        throw new Error('Endpoint submission returned status ' + response.status);
      }
    } catch (err) {
      console.warn('Online submission fallback engaged:', err);
      if (formFeedback) {
        formFeedback.innerHTML = `
          <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.4); color: #FCD34D; padding: 1.25rem; border-radius: var(--radius-md); font-size: 0.875rem; margin-top: 1.25rem;">
            <h5 style="color: #FFFFFF; margin-bottom: 0.35rem; font-size: 1rem;">Direct Dispatch Options Available</h5>
            <p style="margin: 0 0 0.75rem 0; font-size: 0.85rem; color: var(--color-text-secondary);">
              If online transmission encounters connection delays, send your request directly via Email or WhatsApp for immediate response:
            </p>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <a href="${mailtoUrl}" class="btn btn-primary btn-sm" style="text-decoration: none; font-size: 0.8rem; padding: 0.45rem 0.95rem;">
                ✉️ Send via Email (${OFFICIAL_EMAIL})
              </a>
              <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="text-decoration: none; font-size: 0.8rem; padding: 0.45rem 0.95rem;">
                💬 Send via WhatsApp
              </a>
              <a href="tel:${OFFICIAL_PHONE_RAW}" class="btn btn-outline btn-sm" style="text-decoration: none; font-size: 0.8rem; padding: 0.45rem 0.95rem;">
                📞 Call +251-911235960
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
