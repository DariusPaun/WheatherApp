import { mojs } from "../../node_modules/mo-js/build/mo";
export function initializeButtonAnimation() {
  const scaleCurve = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
  const el = document.querySelector('.button');
  const timeline = new mojs.Timeline();

  const tween1 = new mojs.Burst({
    parent: el,
    radius: { 0: 100 },
    angle: { 0: 45 },
    y: -10,
    count: 10,
    radius: 100,
    children: {
      shape: 'circle',
      radius: 30,
      fill: ['red', 'white'],
      strokeWidth: 15,
      duration: 500,
    }
  });

  const tween2 = new mojs.Tween({
    duration: 900,
    onUpdate: function(progress) {
      var scaleProgress = scaleCurve(progress);
      el.style.WebkitTransform = el.style.transform = 'scale3d(' + scaleProgress + ',' + scaleProgress + ',1)';
    }
  });

  const tween3 = new mojs.Burst({
    parent: el,
    radius: { 0: 100 },
    angle: { 0: -45 },
    y: -10,
    count: 10,
    radius: 125,
    children: {
      shape: 'circle',
      radius: 30,
      fill: ['white', 'red'],
      strokeWidth: 15,
      duration: 400,
    }
  });

  timeline.add(tween1, tween2, tween3);

  function handleClick() {
    if (el.classList.contains('active')) {
      el.classList.remove('active');
    } else {
      timeline.play();
      el.classList.add('active');
    }
  }

  // Attach the click event listener
  el.addEventListener('click', handleClick);

  // Return a cleanup function to remove the click event listener when needed
  return function cleanup() {
    el.removeEventListener('click', handleClick);
  };
}
