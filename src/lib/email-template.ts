import { ContactFormValues } from "@/app/_Contact/contact-schema";

const escapeHTML = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const buildEmailHTML = (
  { name, email, company, selection }: ContactFormValues,
  categories: string[]
) => {
  const list = (items: string[]) =>
    items
      .map((item) => `<li style="margin-bottom:6px;">${escapeHTML(item)}</li>`)
      .join("");

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;max-width:640px;margin:0 auto;">
      <h2>New Contact</h2>

      <p>
        My name is <strong>${escapeHTML(name)}</strong>, and I am reaching out to explore a potential collaboration.
      </p>

      <p>
        ${
          company
            ? `I represent <strong>${escapeHTML(company)}</strong>, and we are currently seeking professional support in the following areas:`
            : `I am currently seeking professional support in the following areas:`
        }
      </p>

      <ul>${list(categories)}</ul>

      ${
        selection.services.length
          ? `<h4>Services</h4><ul>${list(selection.services)}</ul>`
          : ""
      }

      ${
        selection.categoryIds.includes("custom")
          ? `
            <h4>Custom Category</h4>
            <p><strong>${escapeHTML(selection.customCategory.subject)}</strong></p>
            <p style="white-space:pre-wrap;">${escapeHTML(selection.customCategory.description)}</p>
          `
          : ""
      }

      ${
        selection.customServiceSelected
          ? `
            <h4>Custom Service</h4>
            <p style="white-space:pre-wrap;">${escapeHTML(selection.customService)}</p>
          `
          : ""
      }

      <p style="margin-top:32px;">
        Kind regards,<br/>
        <strong>${escapeHTML(name)}</strong><br/>
        <a href="mailto:${escapeHTML(email)}" style="color:#000;">${escapeHTML(email)}</a>
      </p>
    </div>
  `;
};
