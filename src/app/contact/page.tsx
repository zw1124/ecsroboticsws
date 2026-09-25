import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Contact", description: "Contact RobotECS about sponsorship or another question." };
export default function ContactPage(){return <main id="main">
  <section className="editorial-hero contact-hero"><p className="eyebrow">01 / START A CONVERSATION</p><Reveal><h1>LET&apos;S BUILD<br/><span className="text-primary">WHAT&apos;S NEXT.</span></h1><p>Interested in sponsoring RobotECS or learning more about the program? Tell us what you have in mind.</p><div className="contact-direct"><span>DIRECT EMAIL</span><a href="mailto:kajin30@ecsloudoun.org">kajin30@ecsloudoun.org</a></div></Reveal></section>
  <section className="contact-form-section"><div className="contact-form-intro"><p className="eyebrow">02 / YOUR MESSAGE</p><h2>LET&apos;S<br/><span className="text-primary">TALK.</span></h2><p>Have a sponsorship idea or a question about Team 12394? Tell us a little about it and we&apos;ll take it from there.</p><a className="contact-inline-email" href="mailto:kajin30@ecsloudoun.org">kajin30@ecsloudoun.org ↗</a></div><ContactForm/></section>
</main>}
