/**
 * Premium hero message rotator for Kabod Motors.
 * Lightweight, accessible, and respects reduced-motion preferences.
 */
export function initHeroRotator() {
  const target=document.querySelector('[data-hero-rotator]');
  if(!target)return;
  const messages=[
    'Powering Mobility.',
    'Driving Progress.',
    'Moving Business Forward.',
    'Connecting Ethiopia to the World.'
  ];
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    target.textContent=messages[0];
    return;
  }
  let messageIndex=0, charIndex=messages[0].length, deleting=false;
  const tick=()=>{
    const current=messages[messageIndex];
    target.textContent=current.slice(0,charIndex);
    if(!deleting && charIndex<current.length){charIndex++;setTimeout(tick,55);return;}
    if(!deleting){deleting=true;setTimeout(tick,1800);return;}
    if(deleting && charIndex>0){charIndex--;setTimeout(tick,28);return;}
    deleting=false;messageIndex=(messageIndex+1)%messages.length;
    setTimeout(tick,260);
  };
  target.textContent=messages[0];
  setTimeout(tick,900);
}