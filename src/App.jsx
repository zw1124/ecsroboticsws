import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import AboutChapter from './AboutChapter';
import LowerHome from './LowerHome';
import ScrollChapter from './ScrollChapter';
import Footer from './Footer';
import Hero from './Hero';
import Packages from './Packages';
import ForgetMeNot from './ForgetMeNot';
import TeamOverview from './TeamOverview';
import Sponsors from './Sponsors';
import './finish.css';
const A='/assets/';
const levels=[['Community','Up to $999','Logo on our Sponsors page'],['Bronze','$1,000–$1,999','Priority placement on our Sponsors page and a social media thank-you'],['Silver','$2,000–$4,999','Bronze benefits, team T-shirt logo and pit signage'],['Gold','$5,000–$9,999','Silver benefits and your logo on our robot'],['Premier','$10,000+','Gold benefits and our most prominent logo placement']];
function Arrow(){return <span className="arrow" aria-hidden="true"><img src={A+'arrow.svg'} alt=""/></span>}
export function App(){
 const page=location.pathname.replace(/\/$/,'')||'/';
 const home=page==='/';
 const [menu,setMenu]=useState(false),[light,setLight]=useState(false),[dialog,setDialog]=useState(''),[sent,setSent]=useState(false);
 useEffect(()=>{const descriptions = { '/': 'RobotECS is FRC Team 12394 at Evergreen Christian School in Loudoun, Virginia. Twelve students learning, organizing, and building together.', '/about': 'Meet RobotECS: 12 students learning robotics through Outreach, Programming, Build, and Design.', '/sponsors': 'Support the students behind RobotECS, FRC Team 12394. Explore sponsorship and in-kind contributions.', '/packages': 'Explore five RobotECS sponsorship levels, recognition, and ways to support our first season.', '/contact': 'Start a conversation with RobotECS, FRC Team 12394 at Evergreen Christian School.' };document.querySelector('meta[name=description]').content = descriptions[page] || descriptions['/'];document.title=`${home?'RobotECS':page.slice(1).replace(/^./,c=>c.toUpperCase())+' — RobotECS'} · Team 12394`;const scroll=()=>setLight(!document.getElementById('home')||document.getElementById('home').getBoundingClientRect().bottom<75);scroll();window.addEventListener('scroll',scroll,{passive:true});return()=>window.removeEventListener('scroll',scroll)},[]);
 useEffect(()=>{document.body.style.overflow=menu||dialog?'hidden':'';const escape=e=>{if(e.key==='Escape'){setMenu(false);setDialog('')}};window.addEventListener('keydown',escape);return()=>{document.body.style.overflow='';window.removeEventListener('keydown',escape)}},[menu,dialog]);
 useEffect(()=>{const hero=document.getElementById('home'),card=hero?.querySelector('.hero-card');if(!hero||!card)return;const size=()=>{const mobile=window.innerWidth<=600;const first=window.innerHeight;hero.style.setProperty('--card-top',`${Math.max(220,first-card.offsetHeight-(mobile?80:100))}px`)};const observer=new ResizeObserver(size);observer.observe(card);window.addEventListener('resize',size);size();return()=>{observer.disconnect();window.removeEventListener('resize',size)}},[]);
 useEffect(()=>{if(location.hash){const frame=requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'instant'}));return()=>cancelAnimationFrame(frame)}},[]);
 const nav=[['About','/about'],['Sponsors','/sponsors'],['Contact','/contact']];
 const close=()=>setMenu(false);
 const returnFocus = useRef(null);
 useEffect(() => {
  if (!dialog && !menu) return;
  returnFocus.current = document.activeElement;
  const header = document.querySelector('.topbar');
  if (dialog) header.inert = true;
  const frame = requestAnimationFrame(() => {
   const initial = dialog ? document.querySelector('.dialog input') : document.querySelector('#mobile-menu a');
   initial?.focus();
  });
  const trap = event => {
   if (event.key !== 'Tab') return;
   const scope = document.querySelector(dialog ? '.dialog' : '#mobile-menu');
   const candidates = [...scope.querySelectorAll('a[href],button,input,select,textarea')];
   if (menu && !dialog) candidates.unshift(header.querySelector('.menu-toggle'));
   const items = candidates.filter(item => !item.disabled && item.getClientRects().length);
   const first = items[0], last = items.at(-1);
   if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
   else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };
  document.addEventListener('keydown', trap);
  return () => { cancelAnimationFrame(frame); header.inert = false; document.removeEventListener('keydown', trap); returnFocus.current?.focus(); };
 }, [dialog, menu]);
 function draft(e){e.preventDefault();const data=new FormData(e.currentTarget);const body=`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nOrganization: ${data.get('organization')}\n\n${data.get('message')}`;setSent(true);window.location.href=`mailto:kajin30@ecsloudoun.org?subject=${encodeURIComponent('RobotECS — '+data.get('topic'))}&body=${encodeURIComponent(body)}`}
 return <><a className="skip" href="#main-content">Skip to content</a><header className={'topbar '+(light||menu?'on-paper':'')+(home?' intro-nav':'')}><a href="/" className="brand" onClick={close} aria-label="RobotECS home"><img src={A+((light||menu)?'robotecs-mark-dark.svg':'robotecs-mark-light.svg')} alt=""/></a><nav aria-label="Primary navigation">{nav.map(([label,to])=><a key={label} href={to} aria-current={page===to?'page':undefined}>{label}</a>)}</nav><a className="button dark" href="/packages" onClick={close}>Be our sponsor <Arrow/></a><button className="menu-toggle" aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu} aria-controls="mobile-menu" onClick={()=>setMenu(!menu)}>{menu?'×':<span className="hamburger"/>}</button></header>
 {menu&&<div className="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation"><nav aria-label="Mobile navigation"><a href="/" onClick={close}>Home</a>{nav.map(([label,to])=><a key={label} href={to} onClick={close}>{label}</a>)}<a href="/packages" onClick={close}>Packages</a></nav><p>© RobotECS · FRC Team 12394 · 2026</p></div>}
 <main id="main-content" tabIndex={-1} inert={menu || Boolean(dialog)}>{home&&<Hero/>}
 {page==='/about'&&<div className="page-heading section"><p className="eyebrow">ABOUT ROBOTECS</p><h1>Built by students.<br/>Building together.</h1></div>}
 {(home||page==='/about')&&<><section className="intro section" id="about"><div className="flower"><ForgetMeNot/></div><div className="intro-copy"><p className="eyebrow">STUDENT LED / FIRST ROBOTICS COMPETITION</p><p>RobotECS is FIRST Robotics Competition Team 12394 at Evergreen Christian School in Loudoun, Virginia.</p><p>Our 12 confirmed team members are learning the fundamentals and organizing our Outreach, Programming, Build, and Design groups. We’re building our skills and our team together.</p><h2>We learn by building,<br/>lead by serving, and use<br/>engineering to make ideas real.</h2></div></section>
 {home ? <ScrollChapter/> : <AboutChapter/>}
 </>}
 {home&&<LowerHome/>}
 {page==='/about'&&<TeamOverview/>}
 {page==='/sponsors'&&<Sponsors/>}
 {page==='/packages'&&<Packages levels={levels} onChoose={name=>{setDialog(name);setSent(false)}}/>}
 {page==='/contact'&&<section className="contact section" id="contact"><div><p className="eyebrow">LET'S BUILD SOMETHING TOGETHER</p><h1>A little support.<br/>A world of possibility.</h1><p>Support our first season, share your expertise, or ask about the team. A conversation is a good place to start.</p><button className="button dark" onClick={()=>{setDialog('General question');setSent(false)}}>Contact RobotECS <Arrow/></button><a className="text-link contact-email" href="mailto:kajin30@ecsloudoun.org">kajin30@ecsloudoun.org</a><address>Evergreen Christian School<br/>21336 Evergreen Mills Road<br/>Leesburg, VA 20175</address><a className="text-link" href="https://www.google.com/maps/dir/?api=1&destination=21336+Evergreen+Mills+Road,+Leesburg,+VA+20175" target="_blank" rel="noreferrer">Get directions <Arrow/></a></div><div className="contact-letter"><ForgetMeNot/><p>Good things grow<br/>when we build together.</p><span>RobotECS · FRC Team 12394</span></div></section>
 }
 {!home&&! ['/about','/sponsors','/packages','/contact'].includes(page)&&<section className="section"><h1>Page not found</h1><a href="/">Return home</a></section>}
 </main><div inert={menu || Boolean(dialog)}><Footer /></div>

 {dialog&&<div className="dialog-backdrop" onClick={e=>{if(e.target===e.currentTarget)setDialog('')}}><section className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><button className="dialog-close" onClick={()=>setDialog('')} aria-label="Close contact form">×</button><p className="eyebrow">START A CONVERSATION</p><h2 id="dialog-title">Let's build together.</h2><form onSubmit={draft}><label>Your name<input name="name" required autoComplete="name"/></label><label>Your email<input name="email" type="email" required autoComplete="email"/></label><label><span className="field-label">Organization <span>(optional)</span></span><input name="organization" autoComplete="organization"/></label><label>Topic<select name="topic" defaultValue={dialog==='General question'?dialog:dialog+' sponsorship'}><option>General question</option>{levels.map(([n])=><option key={n}>{n} sponsorship</option>)}</select></label><label>Message<textarea name="message" required rows="3" defaultValue={dialog==='General question'?'':`I'd like to learn more about ${dialog.toLowerCase()} sponsorship.`}/></label><button className="button dark" type="submit">Prepare message <Arrow/></button><p className="form-note" role="status">{sent?'Your email draft is ready. If your email app did not open, email kajin30@ecsloudoun.org directly.':'Opens your email app with a draft for you to review and send.'}</p></form></section></div>}</>;
}
export default App;
