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
  return <form onSubmit={submit} className="border-t-4 border-primary bg-card p-6 md:p-12" aria-label="Contact RobotECS"><p className="eyebrow mb-9">02 / YOUR MESSAGE</p><div className="grid gap-6 md:grid-cols-2"><div className="grid gap-2"><Label htmlFor="name">Your name *</Label><Input id="name" name="name" required placeholder="Your name" /></div><div className="grid gap-2"><Label htmlFor="organization">Organization <span className="text-muted-foreground">Optional</span></Label><Input id="organization" name="organization" placeholder="Company or school" /></div><div className="grid gap-2"><Label htmlFor="email">Your email *</Label><Input id="email" name="email" type="email" required placeholder="you@example.com" /></div><div className="grid gap-2"><Label htmlFor="topic">Topic</Label><Select value={topic} onValueChange={setTopic}><SelectTrigger id="topic"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Sponsorship">Sponsorship</SelectItem><SelectItem value="General question">General question</SelectItem></SelectContent></Select></div></div><div className="mt-6 grid gap-2"><Label htmlFor="message">Message *</Label><Textarea id="message" name="message" required rows={6} placeholder="What would you like to talk about?" /></div><div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center"><Button type="submit" size="lg">Prepare message <ArrowUpRight/></Button><p className="text-xs text-muted-foreground">Opens your email app for review before sending.</p></div>{status&&<p role="status" className="mt-5 text-sm text-muted-foreground">{status}</p>}</form>
}
