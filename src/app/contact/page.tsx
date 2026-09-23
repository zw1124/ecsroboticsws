import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Contact", description: "Contact RobotECS about sponsorship or another question." };
export default function ContactPage(){return <main id="main">
  <section className="editorial-hero contact-hero"><p className="eyebrow">01 / START A CONVERSATION</p><Reveal><h1>LET&apos;S BUILD<br/><span className="text-primary">WHAT&apos;S NEXT.</span></h1><p>Interested in sponsoring RobotECS or learning more about the program? Tell us what you have in mind.</p><div className="contact-direct"><span>DIRECT EMAIL</span><a href="mailto:kajin30@ecsloudoun.org">kajin30@ecsloudoun.org</a></div></Reveal></section>
  <section className="contact-form-section"><div><p className="eyebrow">02 / YOUR MESSAGE</p><h2>START WITH<br/>A CONVERSATION.</h2><p>No commitment required. Share your question or sponsorship idea and we will prepare the next step together.</p></div><ContactForm/></section>
</main>}
