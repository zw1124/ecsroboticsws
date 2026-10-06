import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact", description: "Contact RobotECS about sponsorship or another question." };

export default function ContactPage() {
  return <main id="main" className="team-page contact-page">
    <div className="contact-layout">
      <section className="contact-details" aria-labelledby="contact-heading">
        <p className="eyebrow">FRC TEAM 12394 / EVERGREEN CHRISTIAN SCHOOL</p>
        <h1 id="contact-heading">CONTACT US</h1>
        <p>Interested in sponsoring the team or learning more about RobotECS? We&apos;d love to hear from you.</p>
        <div className="contact-detail"><h2>Email</h2><a className="contact-email" href="mailto:kajin30@ecsloudoun.org">kajin30@ecsloudoun.org</a></div>
        <div className="contact-detail"><h2>Find us</h2><p>Evergreen Christian School</p><address>21336 Evergreen Mills Road<br />Leesburg, VA 20175</address><a className="team-link" href="https://www.google.com/maps/dir/?api=1&destination=21336+Evergreen+Mills+Road,+Leesburg,+VA+20175" target="_blank" rel="noreferrer">Get directions ↗</a></div>
      </section>
      <section className="contact-compose" aria-labelledby="message-heading">
        <h2 id="message-heading">Write to the team</h2>
        <p className="contact-form-note">Prepare an email below, then review and send it in your email app.</p>
        <ContactForm />
      </section>
    </div>
  </main>;
}
