import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Pixel artwork supplied by the user; preserve its original grid and palette.
function drawForgetMeNot(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 与参考图接近：约 15×15 像素的色块、不描边、留白底。
  const S = 15, GW = 62, GH = 80;
  const P = {
    petal: ['#bce8f8','#a4def4','#8dd4ef','#78c9ea','#65bce5','#56b2dd',
            '#469fd4','#348fca','#8ddbf3','#d3f1fa','#70bfe7','#a3d5ef'],
    petalShadow: ['#4da5d4','#398fca','#307fbd','#5aafd9','#83c8e7'],
    eye: ['#ffdd65','#f4ca49','#eeb13b','#ffd974','#f7de87','#e8a72e'],
    green: ['#98bd41','#accd53','#b8d45f','#92b83d','#7fa334','#6e902b',
            '#68892b','#87a93e','#bfd96c','#c6de79','#5a7721','#a4c65a'],
    greenDark: ['#3b4e14','#435619','#4a5f1b','#596f20','#657b22','#758d2c'],
    stem: ['#3e5117','#43571b','#475e19','#53691b','#647924','#71842a','#97a62f']
  };

  // 可重复的伪随机颜色；相同像素每帧颜色完全一致（不会闪烁）。
  function hash(a,b,seed=0) {
    const z = Math.sin(a*127.1 + b*311.7 + seed*74.7) * 43758.5453123;
    return z - Math.floor(z);
  }
  function clamp(x,a,b) {return Math.max(a,Math.min(b,x));}
  function mix(a,b,k) {return a+(b-a)*k;}

  // 一切均是独立的小色块，ctx 永远不会绘制整张花图。
  function pixel(x,y,color) {
    // 每个逻辑像素都是固定大小的方形色块。
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x*S), Math.round(y*S), S, S);
  }
  function gridLine(points, width=1, seed=1, palette=P.stem) {
    const taken = new Set();
    for (let k=0; k<points.length-1; k++) {
      const [ax,ay] = points[k], [bx,by] = points[k+1];
      const steps = Math.ceil(Math.hypot(bx-ax,by-ay)*6);
      for (let j=0; j<=steps; j++) {
        const u=j/steps, x=mix(ax,bx,u), y=mix(ay,by,u);
        for (let oy=-Math.floor((width-1)/2);oy<=Math.floor(width/2);oy++) {
          for (let ox=-Math.floor((width-1)/2);ox<=Math.floor(width/2);ox++) {
            const X=Math.round(x+ox),Y=Math.round(y+oy), key=X+','+Y;
            if(taken.has(key)) continue;
            taken.add(key);
            const h=hash(X,Y,seed);
            pixel(X,Y,palette[Math.min(palette.length-1,Math.floor(h*palette.length))]);
          }
        }
      }
    }
  }

  // 把长椭圆的外轮廓离散成方块，构成有轻微不规则锯齿的叶子。
  function leaf(base, tip, half, curvature, seed) {
    const dx=tip[0]-base[0],dy=tip[1]-base[1];
    const length=Math.hypot(dx,dy), ux=dx/length, uy=dy/length;
    const nx=-uy, ny=ux;
    const extent = Math.ceil(half+Math.abs(curvature)+2);
    const minx=Math.floor(Math.min(base[0],tip[0])-extent), maxx=Math.ceil(Math.max(base[0],tip[0])+extent);
    const miny=Math.floor(Math.min(base[1],tip[1])-extent), maxy=Math.ceil(Math.max(base[1],tip[1])+extent);
    for(let y=miny;y<=maxy;y++) for(let x=minx;x<=maxx;x++) {
      const px=x-base[0],py=y-base[1];
      const v=(px*ux+py*uy)/length;
      if(v<=.005||v>=1.05) continue;
      const side=px*nx+py*ny - Math.sin(Math.PI*clamp(v,0,1))*curvature;
      const outline=half*Math.pow(Math.max(0,Math.sin(Math.PI*clamp(v,0,1))),.77);
      const jag=(hash(x,y,seed)-.5)*.75;
      if(Math.abs(side)>outline+jag) continue;
      if(hash(x,y,seed+17)<.018 && Math.abs(side)>outline*.7) continue;
      const h=hash(x,y,seed+3);
      let c;
      if(Math.abs(side)<.55 && v>.14 && v<.9 && hash(x,y,seed+8)>.20) {
        c=P.greenDark[Math.floor(hash(x,y,seed+9)*P.greenDark.length)];
      } else if(side<-.5 && h>.22) {
        c=P.green[Math.floor(h*5)+1];
      } else if(side>1.2 && h>.35) {
        c=P.green[4+Math.floor(h*4)];
      } else {
        c=P.green[Math.floor(h*P.green.length)];
      }
      pixel(x,y,c);
    }
  }

  const flowers = [
    {x:29,y:14,r:1.07,rot:.30,seed:11},
    {x:20,y:18,r:.99,rot:.69,seed:22},
    {x:39,y:18,r:1.04,rot:-.14,seed:33},
    {x:12,y:26,r:.92,rot:.18,seed:44},
    {x:29,y:25,r:1.12,rot:.52,seed:55},
    {x:47,y:27,r:.93,rot:-.23,seed:66},
    {x:19,y:32,r:.95,rot:.02,seed:77},
    {x:38,y:32,r:.97,rot:.40,seed:88},
    {x:29,y:37,r:.78,rot:-.22,seed:99}
  ];

  // 五片圆瓣围绕黄色花心；每朵花的色块都存在自己的网格中。
  function flower(f) {
    const openEase = 1; // 所有花朵都完全开放
    const radius=f.r;
    const colors=new Map();
    const extent=Math.ceil(6.5*radius+2);
    for(let y=-extent;y<=extent;y++) for(let x=-extent;x<=extent;x++) {
      let found=false, best=-1e6, petalIdx=-1;
      for(let j=0;j<5;j++) {
        const a=f.rot+j*2*Math.PI/5-Math.PI/2;
        const ux=Math.cos(a),uy=Math.sin(a),tx=-uy,ty=ux;
        const u=x*ux+y*uy, v=x*tx+y*ty;
        const center=radius * mix(1.15,2.72,openEase);
        const rLong=radius*mix(1.22,2.70,openEase);
        const rSide=radius*mix(.76,2.03,openEase);
        const norm=((u-center)/rLong)**2+(v/rSide)**2;
        const fuzzy=(hash(f.x+x,f.y+y,f.seed+j)-.5)*.13;
        if(norm < 1+fuzzy && 1-norm>best) {found=true;best=1-norm;petalIdx=j;}
      }
      if(!found) continue;
      const X=Math.round(f.x+x),Y=Math.round(f.y+y);
      const noise=hash(X,Y,f.seed+petalIdx*11);
      // 参考图有自然的细小漏白，而不是整齐的纯色圆。
      if(best<.25 && hash(X,Y,f.seed+103)<.11) continue;
      if(best>.57 && hash(X,Y,f.seed+117)<.018) continue;
      const dist=Math.hypot(x,y)/(5.5*radius);
      let col;
      if(dist<.44 && noise<.70) col=P.petalShadow[Math.floor(noise*P.petalShadow.length)];
      else if(dist>.72 && noise>.35) col=P.petal[Math.floor(noise*4)];
      else col=P.petal[Math.floor(noise*P.petal.length)];
      colors.set(x+','+y,col);
    }
    // 涂花瓣
    for(const [coord,col] of colors) {
      const [x,y]=coord.split(',').map(Number);
      pixel(Math.round(f.x+x),Math.round(f.y+y),col);
    }
    // 小黄眼 + 暖橙花蕊，全部使用方块，绝不画圆形渐变。
    const eyeRadius=radius*mix(.65,1.18,openEase);
    for(let y=-2;y<=2;y++) for(let x=-2;x<=2;x++) {
      const h=hash(x+f.x,y+f.y,200+f.seed);
      if(x*x+y*y>eyeRadius*eyeRadius+(h-.5)*.8) continue;
      const c=(Math.abs(x)+Math.abs(y)<.65) ? '#dfa134' : P.eye[Math.floor(h*P.eye.length)];
      pixel(Math.round(f.x+x),Math.round(f.y+y),c);
    }
    if(openEase>.65) {
      pixel(Math.round(f.x),Math.round(f.y)-1,'#fff0a5');
    }
  }

  function sprig(x,y,seed) {
    // 零星的花苞：仿照参考图顶部松散伸出的细碎小像素。
    const bits=[[-1,0],[0,-1],[1,-1],[0,0],[1,0],[2,0],[0,1],[1,1],[-1,1]];
    for(const [dx,dy] of bits) {
      if(hash(x+dx,y+dy,seed)<.13) continue;
      pixel(x+dx,y+dy,dx===2?'#79b2cf':P.petal[Math.floor(hash(x+dx,y+dy,seed+5)*P.petal.length)]);
    }
    pixel(x,y+2,'#5c782a');
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.imageSmoothingEnabled=false;

    // 先画藏在花簇下面的细枝。
    const smallBranches=[
      [[30,48],[29,38],[29,25],[29,14]],
      [[29,35],[24,29],[20,18]],
      [[29,38],[18,33],[12,26]],
      [[30,42],[19,32]],
      [[30,36],[34,30],[39,18]],
      [[30,35],[38,24],[47,27]],
      [[30,42],[38,32]],
      [[30,31],[29,25]],
      [[28,38],[29,37]]
    ];
    smallBranches.forEach((path,i)=>gridLine(path,1,19+i,P.greenDark));
    // 细长小叶，给花簇与主干一个自然过渡。
    leaf([30,41],[22,38],1.65,-.5,19);
    leaf([30,42],[41,39],1.60,.45,20);
    leaf([30,44],[25,43],1.65,-.35,23);

    // 中段叶片，偏左的大叶、偏右的舒展叶和较低的两片叶。
    leaf([30,49],[46,47],3.0,-.55,121);
    leaf([30,53],[49,51],3.65,.66,122);
    leaf([30,53],[14,50],3.50,-.75,123);
    leaf([30,57],[13,56],3.85,.65,124);
    leaf([30,62],[12,65],2.75,-.9,125);
    leaf([30,60],[20,61],2.10,.32,126);
    leaf([31,44],[35,41],1.25,.0,127);
    leaf([30,46],[23,47],1.85,-.1,128);

    // 最上方与叶片之间的几个很小的花苞和绿叶。
    sprig(10,33,31);
    sprig(49,20,32);
    sprig(43,35,33);

    // 参考图中心有一根深绿、带明暗色块的直茎。
    gridLine([[31,68],[30,61],[30,54],[30,46],[29,38]],2,312,P.greenDark);
    for(let y=44;y<68;y++) {
      if(hash(31,y,451)>.26) pixel(31,y,P.stem[Math.floor(hash(31,y,452)*P.stem.length)]);
      if(y>49 && hash(30,y,453)>.74) pixel(30,y,'#c0a42e');
    }
    gridLine([[31,57],[37,53],[47,51]],1,399,P.greenDark);
    gridLine([[30,56],[22,54],[14,51]],1,400,P.greenDark);
    gridLine([[30,63],[22,64],[15,65]],1,401,P.greenDark);
    // 靠近地面的少量碎片方块，模仿截图里底部的收笔。
    const baseBits=[[29,68],[30,69],[31,67],[28,67],[32,68],[27,68],[33,67],[26,67],
                    [25,68],[35,67],[37,66],[39,67],[28,69]];
    for(const [x,y] of baseBits) pixel(x,y,P.green[Math.floor(hash(x,y,77)*P.green.length)]);

    // 最后画上花朵：遮盖花枝，保证黄眼清晰。
    flowers.forEach(f=>flower(f));
  }

  // 静态绘制：只执行一次，没有计时器、帧循环或交互控件。
  draw();
}

export default function ForgetMeNot() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const source = document.createElement('canvas');
    source.width = canvas.width;
    source.height = canvas.height;
    drawForgetMeNot(source);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) {
      ctx.drawImage(source, 0, 0);
      return;
    }
    // Reveal only occupied cells from the original 15px grid.
    const data = source.getContext('2d').getImageData(0, 0, source.width, source.height).data;
    const cells = [];
    for (let y = 0; y < source.height; y += 15) {
      for (let x = 0; x < source.width; x += 15) {
        if (!data[((y + 7) * source.width + x + 7) * 4 + 3]) continue;
        const noise = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
        cells.push({ x, y, order: noise - Math.floor(noise) });
      }
    }
    cells.sort((a, b) => a.order - b.order);
    const progress = { count: 0 };
    let drawn = 0;
    let animation;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      animation = gsap.to(progress, {
        count: cells.length, duration: 1.65, ease: 'power1.inOut',
        onUpdate: () => {
          const count = Math.floor(progress.count);
          while (drawn < count) {
            const { x, y } = cells[drawn++];
            ctx.drawImage(source, x, y, 15, 15, x, y, 15, 15);
          }
        },
        onComplete: () => ctx.drawImage(source, 0, 0),
      });
      observer.disconnect();
    }, { threshold: 0.15 });
    observer.observe(canvas);
    const settle = () => {
      if (!preference.matches) return;
      observer.disconnect(); animation?.kill(); ctx.drawImage(source, 0, 0);
    };
    preference.addEventListener('change', settle);
    return () => { observer.disconnect(); animation?.kill(); preference.removeEventListener('change', settle); };
  }, []);
  return <canvas ref={canvasRef} className="forget-me-not" width={930} height={1200} role="img" aria-label="Blue pixel-art forget-me-not flowers with yellow centers">Blue forget-me-not flowers.</canvas>;
}
