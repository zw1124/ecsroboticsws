import { useState, useRef, useEffect } from 'react';
import { Sponsors, Packages, Contact, Information } from './Pages';
import './pages.css';
function FooterMechanism() {
  const svg = useRef(null);
  const pointer = useRef(null);
  const frame = useRef(0);
  const nodes = useRef(Array.from({length:45}, (_,i) => ({x:(i%15)*110-50,y:55+Math.floor(i/15)*80+(i%2)*12,dx:0,dy:0,vx:0,vy:0})));
  const edges = useRef(nodes.current.flatMap((_,i) => {
    const result=[];
    if(i%15<14) result.push([i,i+1]);
    if(i<30) {result.push([i,i+15]); if(i%15<14 && i%2===0) result.push([i,i+16]); if(i%15>0 && i%2===1) result.push([i,i+14]);}
    return result;
  }));
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  function animate() {
    const root=svg.current;if(!root)return;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let energy=0;
    nodes.current.forEach((n,i)=>{
      const p=pointer.current;const distance=p?Math.hypot(n.x-p.x,n.y-p.y):1000;
      const influence=Math.max(0,1-distance/230);
      const tx=p?(p.x-n.x)*influence*.12:0,ty=p?(p.y-n.y)*influence*.16:0;
      n.vx=(n.vx+(tx-n.dx)*.065)*.78;n.vy=(n.vy+(ty-n.dy)*.065)*.78;
      n.dx=reduced?0:n.dx+n.vx;n.dy=reduced?0:n.dy+n.vy;
      energy+=Math.abs(n.vx)+Math.abs(n.vy)+Math.abs(tx-n.dx)+Math.abs(ty-n.dy);
      const el=root.querySelector(`[data-node="${i}"]`);el.setAttribute('cx',n.x+n.dx);el.setAttribute('cy',n.y+n.dy);el.style.fill=influence>.12?'#778f9a':'#d8dadd';
    });
    edges.current.forEach(([a,b],i)=>{
      const n=nodes.current[a],m=nodes.current[b],el=root.querySelector(`[data-edge="${i}"]`);
      el.setAttribute('x1',n.x+n.dx);el.setAttribute('y1',n.y+n.dy);el.setAttribute('x2',m.x+m.dx);el.setAttribute('y2',m.y+m.dy);
      const p=pointer.current;const d=p?Math.hypot((n.x+m.x)/2-p.x,(n.y+m.y)/2-p.y):1000;
      el.style.stroke=d<200?(i%3===0?'#a88763':i%3===1?'#6d91a2':'#82917c'):'#d8dadd';
    });
    frame.current=energy>.015?requestAnimationFrame(animate):0;
  }
  function move(event) {
    const r=svg.current.getBoundingClientRect();const scale=r.height/300;
    pointer.current={x:(event.clientX-r.left-r.width/2)/scale+720,y:(event.clientY-r.top)/scale};
    if(!frame.current)frame.current=requestAnimationFrame(animate);
  }
  function leave(){pointer.current=null;if(!frame.current)frame.current=requestAnimationFrame(animate);}
  return <div className="footer-linkage" onPointerMove={move} onPointerDown={move} onPointerLeave={leave} onPointerUp={e=>{if(e.pointerType!=='mouse')leave();}} aria-hidden="true">
    <svg ref={svg} viewBox="0 0 1440 300" preserveAspectRatio="xMidYMid slice">
      {edges.current.map(([a,b],i)=><line key={i} data-edge={i} x1={nodes.current[a].x} y1={nodes.current[a].y} x2={nodes.current[b].x} y2={nodes.current[b].y}/>)}
      {nodes.current.map((n,i)=><circle key={i} data-node={i} cx={n.x} cy={n.y} r="4.5"/>)}
    </svg>
  </div>;
}
function HomeSponsor() {
  const [opacity,setOpacity]=useState(1);
  useEffect(()=>{
    let frame=0;
    const update=()=>{frame=0;const hold=Math.min(320,innerHeight*.4);setOpacity(scrollY<hold?1:0);};
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    update();window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);
    return()=>{window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll);cancelAnimationFrame(frame);};
  },[]);
  return <div className="home-sponsor-dock" style={{opacity,visibility:opacity===0?'hidden':'visible',pointerEvents:opacity===0?'none':'auto'}}>
    <a className="home-sponsor" href="/sponsors" aria-label="Our sponsor QTS — view our sponsors" tabIndex={opacity===0?-1:0}><span>Supported by</span><img src="/assets/qts-logo.png" alt="QTS" width="748" height="357"/></a>
  </div>;
}
const groups = ['Outreach', 'Programming', 'Build', 'Design'];
const content = {
  Programming: { labels: ['Sense', 'Decide', 'Move'], image: 'programming.png', alt: 'Concept diagram connecting a distance sensor, controller, and robot chassis.', description: 'Learning how code becomes motion.' },
  Build: { labels: ['Prepare', 'Assemble', 'Refine'], image: 'build.png', alt: 'Mechanical parts, an exploded wheel hub, and an assembled wheel module.', description: 'Making the pieces work together.' },
  Design: { labels: ['Sketch', 'Measure', 'Model'], image: 'design.png', alt: 'A gripper mechanism evolving from a pencil sketch through measured drawings to a CAD concept.', description: 'An idea, considered from every angle.' },
  Outreach: { labels: ['Plan', 'Share', 'Connect'], image: 'outreach.png', alt: 'An outreach notebook, a tabletop robot demonstration, and communication materials.', description: 'Sharing what we learn. Inviting others in.' },
};
const regions = { Programming: [[0,36],[36,61],[61,100]], Build: [[0,33],[33,72],[72,100]], Design: [[0,33],[33,65],[65,100]], Outreach: [[0,34],[34,67],[67,100]] };
const explanations = {
  Programming: ['Read the world through sensors.', 'Use code to make a decision.', 'Turn that decision into movement.'],
  Build: ['Get to know the parts and tools.', 'Bring the components together.', 'Check the fit and improve it.'],
  Design: ['Explore a mechanism on paper.', 'Work through dimensions and clearances.', 'Develop the idea in CAD.'],
  Outreach: ['Plan what we want to share.', 'Make robotics easier to understand.', 'Start a conversation with our community.'],
};
function DiagramPlayer({group, data}) {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(!document.hidden);
  const root = useRef(null);
  const progress = useRef([]);
  const elapsed = useRef(0);
  const stepRef = useRef(step);
  stepRef.current = step;
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    update(); preference.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {threshold:.25});
    observer.observe(root.current);
    const visibility = () => setDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => { preference.removeEventListener('change', update); observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => {
    if (paused || reduced || !visible || !documentVisible) return;
    let frame; let last;
    const tick = now => {
      if(last !== undefined) elapsed.current += Math.min(now-last,100);
      last=now;
      if(elapsed.current >= 4200) { elapsed.current=0; setStep(value => (value+1)%3); }
      progress.current.forEach((bar,index) => { if(bar) bar.style.transform = `scaleX(${index===stepRef.current ? elapsed.current/4200 : 0})`; });
      frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, reduced, visible, documentVisible]);
  function choose(index) { elapsed.current=0; setStep(index); progress.current.forEach(bar => {if(bar)bar.style.transform='scaleX(0)';}); }
  return <div ref={root} className="diagram-player">
    <div className="diagram-labels">{data.labels.map((label,index)=><button key={label} aria-pressed={step===index} onClick={()=>choose(index)}>{label}</button>)}</div>
    <div className={`diagram-stage stage-${step}`}>
      <img className="diagram diagram-muted" src={`/assets/${data.image}`} alt={data.alt} />
      {regions[group].map(([left,right],index)=><img key={index} className={`diagram diagram-highlight ${step===index?'is-active':''}`} src={`/assets/${data.image}`} alt="" aria-hidden="true" style={{clipPath:`inset(0 ${100-right}% 0 ${left}%)`}} />)}
    </div>
    <p className="step-explanation">{explanations[group][step]}</p>
    <div className="player-controls"><div className="step-track" aria-label="Diagram steps">{data.labels.map((label,index)=><button key={label} className={step===index?'current':''} aria-label={`Show step ${index+1}: ${label}`} aria-pressed={step===index} onClick={()=>choose(index)}><span className="step-indicator"><span ref={el => progress.current[index]=el}/></span></button>)}</div><button className="play-toggle" aria-label={reduced?'Next diagram step':paused?'Play diagram':'Pause diagram'} aria-pressed={paused} onClick={()=>{if(reduced){choose((step+1)%3);}else setPaused(value=>!value);}}>{paused||reduced?<span className="play-mark"/>:<span className="pause-mark"/>}</button></div>
  </div>;
}
function EntrySequence({finish}) {
  const artwork=useRef(null);
  useEffect(()=>{
    const previous=document.body.style.overflow;document.body.style.overflow='hidden';
    const position=()=>{
      const hero=document.querySelector('.hero-art');
      if(!hero||!artwork.current)return;
      const r=hero.getBoundingClientRect();
      Object.assign(artwork.current.style,{left:`${r.left}px`,top:`${r.top}px`,width:`${r.width}px`,height:`${r.height}px`});
    };
    position();window.addEventListener('resize',position);
    const key=e=>{if(e.key==='Escape')finish();};window.addEventListener('keydown',key);
    const timer=setTimeout(finish,3100);
    return()=>{clearTimeout(timer);window.removeEventListener('resize',position);window.removeEventListener('keydown',key);document.body.style.overflow=previous;};
  },[]);
  const isHome=location.pathname==='/';
  return <div className="entry-sequence entry-matched" role="dialog" aria-modal="true" aria-label="Welcome to FRC Team 12394">
    <div className="entry-build-number">FRC 12394</div>
    {isHome && <svg ref={artwork} className="entry-parts-art" viewBox="0 0 1448 1086" aria-hidden="true">
      <defs>
        <mask id="entry-base-mask"><rect width="1448" height="1086" fill="white"/><rect x="275" y="65" width="275" height="245" fill="black"/><rect x="590" y="130" width="345" height="220" fill="black"/><rect x="965" y="225" width="285" height="225" fill="black"/></mask>
        <clipPath id="entry-motor"><rect x="275" y="65" width="275" height="245"/></clipPath>
        <clipPath id="entry-controller"><rect x="590" y="130" width="345" height="220"/></clipPath>
        <clipPath id="entry-battery"><rect x="965" y="225" width="285" height="225"/></clipPath>
      </defs>
      <defs><mask id="construction-reveal"><rect width="1448" height="1086" fill="black"/><g stroke="white" fill="none" strokeLinecap="round">
        <path className="frame-trace" pathLength="1" strokeWidth="220" d="M620 438 305 643 750 860 1070 629 620 438"/>
        <circle className="wheel-reveal wheel-a" cx="260" cy="650" r="155" fill="white" stroke="none"/>
        <circle className="wheel-reveal wheel-b" cx="548" cy="410" r="130" fill="white" stroke="none"/>
        <circle className="wheel-reveal wheel-c" cx="1190" cy="693" r="145" fill="white" stroke="none"/>
        <circle className="wheel-reveal wheel-d" cx="842" cy="899" r="155" fill="white" stroke="none"/>
        <path className="interior-reveal" strokeWidth="550" d="M450 650 900 720"/>
      </g><rect className="construction-complete" width="1448" height="1086" fill="white"/></mask></defs>
      <g mask="url(#construction-reveal)"><image className="entry-part-base" href="/assets/chassis-refined.png" width="1448" height="1086" mask="url(#entry-base-mask)"/></g>
      <path className="entry-blue-trace" pathLength="1" d="M645 410 1038 597" fill="none" stroke="#739abe" strokeWidth="2"/>
      <g className="entry-part entry-part-motor"><image href="/assets/chassis-refined.png" width="1448" height="1086" clipPath="url(#entry-motor)"/></g>
      <g className="entry-part entry-part-controller"><image href="/assets/chassis-refined.png" width="1448" height="1086" clipPath="url(#entry-controller)"/></g>
      <g className="entry-part entry-part-battery"><image href="/assets/chassis-refined.png" width="1448" height="1086" clipPath="url(#entry-battery)"/></g>
    </svg>}
  </div>;
}
export function App() {
  const [entering,setEntering]=useState(()=>{
    if(location.pathname!=='/' || location.hash || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return false;
    return true;
  });
  const [active, setActive] = useState('Programming');
  const tabs = useRef([]);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [headerRaised, setHeaderRaised] = useState(false);
  useEffect(() => {
    let last = Math.max(0, window.scrollY); let accumulated=0; let direction=0; let frame=0;
    const update = () => {
      frame=0; const y=Math.max(0,window.scrollY); const delta=y-last; last=y;
      setHeaderRaised(y>90);
      if(y<70){setHeaderHidden(false);accumulated=0;return;}
      if(Math.abs(delta)<1)return;
      const next=delta>0?1:-1;
      accumulated=next===direction?accumulated+Math.abs(delta):Math.abs(delta); direction=next;
      if(accumulated>12)setHeaderHidden(next===1);
    };
    const scroll = () => {if(!frame)frame=requestAnimationFrame(update);};
    window.addEventListener('scroll',scroll,{passive:true});
    return () => {window.removeEventListener('scroll',scroll);cancelAnimationFrame(frame);};
  }, []);
  const path = location.pathname.replace(/\/$/,'') || '/';
  const home = path === '/';
  useEffect(() => {document.title = `${({'/':'Built together.','/sponsors':'Sponsors','/packages':'Sponsorship','/contact':'Contact','/site-information':'Website information'})[path] || 'Page not found'} — robotECS`;}, [path]);
  const data = content[active];
  function onKey(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % groups.length;
    if (event.key === 'ArrowLeft') next = (index + groups.length - 1) % groups.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = groups.length - 1;
    if (next !== undefined) { event.preventDefault(); setActive(groups[next]); tabs.current[next].focus(); }
  }
  return <div className={entering?'site-entering':'site-ready'}>
    {entering && <EntrySequence finish={()=>setEntering(false)}/>}
    <header inert={entering?true:undefined} className={`header ${headerHidden?'header-hidden':''} ${headerRaised?'header-raised':''}`} onFocusCapture={()=>setHeaderHidden(false)}><a className="wordmark" href={home?'#home':'/'} aria-label="robotECS home">robotECS</a><nav aria-label="Main navigation"><a href={home?'#team':'/#team'}>Team</a><a href="/sponsors" aria-current={path==='/sponsors'?'page':undefined}>Sponsors</a><a href="/contact" aria-current={path==='/contact'?'page':undefined}>Contact</a></nav></header>
    <main inert={entering?true:undefined}>
      {home && <>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <img className="hero-art" src="/assets/chassis-refined.png" alt="Illustration of a robot chassis and its components." fetchPriority="high" />
        <h1 id="hero-title">Built together.</h1>
        <p className="identity">FRC Team 12394 <span aria-hidden="true">·</span> Evergreen Christian School</p>
        <HomeSponsor/>
      </section>
      <section className="team" id="team" aria-labelledby="team-title">
        <h2 id="team-title">One team. Four ways to build.</h2>
        <div className="tabs" role="tablist" aria-label="Team groups">{groups.map((group,i) => <button key={group} ref={el => tabs.current[i]=el} role="tab" id={`tab-${group}`} aria-selected={active===group} aria-controls="group-panel" tabIndex={active===group?0:-1} onClick={() => setActive(group)} onKeyDown={e => onKey(e,i)}>{group}</button>)}</div>
        <div role="tabpanel" id="group-panel" aria-labelledby={`tab-${active}`} className={`panel ${active.toLowerCase()}`} tabIndex={0}>
          <div key={active} className="panel-inner">
            <DiagramPlayer key={active} group={active} data={data} />
          </div>
        </div>
        <a className="text-link" href="#team-details">Explore the team <span aria-hidden="true">↗</span></a>
      </section>
      <section className="season-story" id="team-details" aria-labelledby="season-title">
        <h2 id="season-title">A team in the making.</h2>
        <p className="season-intro">Twelve students. A shared curiosity.<br/>Preparing for the 2027 season.</p>
        <div className="season-notes"><div><span>01</span><h3>Learn the fundamentals.</h3><p>Mechanical, electrical, and programming skills.</p></div><div><span>02</span><h3>Find our roles.</h3><p>Four groups, learning to work as one team.</p></div><div><span>03</span><h3>Prepare for the field.</h3><p>Build the skills and support for our first season.</p></div></div>
      </section>
      <section className="support-note" id="support" aria-labelledby="support-title"><h2 id="support-title">Help the next idea take shape.</h2><a className="text-link" href="/packages">Support our first season <span aria-hidden="true">↗</span></a><p className="support-fine">Explore sponsorship and ways to help.</p></section>
      </>}
      {path==='/sponsors' && <Sponsors/>}
      {path==='/packages' && <Packages/>}
      {path==='/contact' && <Contact/>}
      {path==='/site-information' && <Information/>}
      {!['/','/sponsors','/packages','/contact','/site-information'].includes(path) && <section className="page-intro document-page"><h1>Page not found.</h1><a className="text-link" href="/">Return home ↗</a></section>}
    </main>
    <footer inert={entering?true:undefined} className="site-footer">
      <FooterMechanism/>
      <div className="footer-body"><div className="footer-columns">
        <div><h2>robotECS</h2><a href="/">Home</a><a href="/#team">Our team</a><a href="/#team-details">Our season</a></div>
        <div><h2>Support</h2><a href="/sponsors">Ways to help</a><a href="/packages">Sponsorship</a><a href="/contact?topic=In-kind%20support">In-kind gifts</a></div>
        <div><h2>Connect</h2><a href="/contact">Contact us</a><a href="mailto:kajin30@ecsloudoun.org">Email the team</a></div>
        <div><h2>Information</h2><a href="/site-information#privacy">Privacy</a><a href="/packages#sponsorship-information">Sponsorship conditions</a><a href="/site-information">Website information</a></div>
      </div><div className="footer-baseline"><span>robotECS © {new Date().getFullYear()}</span><span>FRC Team 12394 · Evergreen Christian School</span></div></div>
    </footer>
  </div>;
}
