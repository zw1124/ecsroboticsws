"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm(){
  const [topic,setTopic]=useState("Sponsorship");
  const [status,setStatus]=useState("");
  function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault(); const data=new FormData(event.currentTarget);
    const name=String(data.get("name")||"").trim(), organization=String(data.get("organization")||"").trim(), email=String(data.get("email")||"").trim(), message=String(data.get("message")||"").trim();
    const body=[`Name: ${name}`,...(organization?[`Organization: ${organization}`]:[]),`Email: ${email}`,`Topic: ${topic}`,"",message].join("\n");
    setStatus("Email draft ready. If your email app did not open, email kajin30@ecsloudoun.org directly.");
    window.location.href=`mailto:kajin30@ecsloudoun.org?subject=${encodeURIComponent(`RobotECS — ${topic}`)}&body=${encodeURIComponent(body)}`;
  }
  const fieldClass="rounded-sm border-black/20 bg-transparent text-black placeholder:text-black/40 focus-visible:border-primary focus-visible:ring-primary/20";
  return <form onSubmit={submit} className="contact-form-light" aria-label="Contact RobotECS"><div className="grid gap-6 md:grid-cols-2"><div className="grid min-w-0 gap-3"><Label htmlFor="name">Your name *</Label><Input className={`${fieldClass} h-12 px-4`} id="name" name="name" required placeholder="Your name" /></div><div className="grid min-w-0 gap-3"><Label htmlFor="organization">Organization <span className="text-black/45">Optional</span></Label><Input className={`${fieldClass} h-12 px-4`} id="organization" name="organization" placeholder="Company or school" /></div><div className="grid min-w-0 gap-3"><Label htmlFor="email">Your email *</Label><Input className={`${fieldClass} h-12 px-4`} id="email" name="email" type="email" required placeholder="you@example.com" /></div><div className="grid min-w-0 gap-3"><Label htmlFor="topic">Topic</Label><Select value={topic} onValueChange={setTopic}><SelectTrigger className={`${fieldClass} !h-12 w-full px-4`} id="topic"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Sponsorship">Sponsorship</SelectItem><SelectItem value="General question">General question</SelectItem></SelectContent></Select></div></div><div className="mt-8 grid gap-3"><Label htmlFor="message">Message *</Label><Textarea className={`${fieldClass} min-h-40 p-4`} id="message" name="message" required rows={7} placeholder="What would you like to talk about?" /></div><div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><Button type="submit" size="lg" className="h-12 rounded-sm px-5">Prepare message <ArrowUpRight/></Button><p className="text-xs text-black/50">Opens your email app for review before sending.</p></div>{status&&<p role="status" className="mt-5 text-sm text-black/60">{status}</p>}</form>
}
