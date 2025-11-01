/*=============== SEARCH ===============*/

/*===============SEARCH SHOW=============*/

 

/*===============SEARCH HIDDEN===========*/        
       
/*=============== LOGIN ===============*/
 const loginButton = document.getElementById('login-button')
       loginClose = document.getElementById('login-close')
       loginContent = document.getElementById('login-content')

/*===============LOGIN SHOW=============*/

 if(loginButton){
          loginButton.addEventListener('click', () =>{
            loginContent.classList.add('show-login')
          })
        }

/*===============LOGIN HIDDEN===========*/        
       if(loginClose){
          loginClose.addEventListener('click', () =>{
            loginContent.classList.remove('show-login')
          })
       }


/*=============== ADD SHADOW HEADER ===============*/


/*=============== HOME SWIPER ===============*/
let swiperHome = new Swiper('.home__swiper', {
  loop: true,
  spaceBetween: -24,
  grabCursor: true,
  slidesPerView: 'auto',
  centeredslides: 'auto',

  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  }

})

const shadowHeader = () =>{
  const header = document.getElementById('header')
  //When the scroll is greater than 50 viewport height //
  this.scrollY >= 50 ? header.classList.add('shadow-header')
                     : header.classList.remove('shadow-header')
}

window.addEventListener('scroll', shadowHeader)

/*=============== FEATURED SWIPER ===============*/
let swiperFeatured = new Swiper('.featured__swiper', {
  loop: true,
  spaceBetween: 16,
  grabCursor: true,
  slidesPerView: 'auto',
  centeredslides: 'auto',

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
   }
 
  

})


/*=============== NEW SWIPER ===============*/
let swiperNew = new Swiper('.new__swiper', {
  loop: true,
  spaceBetween: 16,
  slidesPerView: 'auto',

   

})

/*=============== TESTIMONIAL SWIPER ===============*/
let swiperTestimonial = new Swiper('.testimonial__swiper', {
  loop: true,
  spaceBetween: 16,
  grabCursor: true,
  slidesPerView: 'auto',
  centeredSlides: 'auto',

})


/*=============== SHOW SCROLL UP ===============*/ 


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY
    sections.forEach(current =>{
      sectionTop = current.offsetHeight,
      sectionId = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

      if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
        sectionsClass.classList.add('active-link')
      }else{
        sectionsClass.classList.remove('active-link')
      }
    })
}

window.addEventListener('scroll', scrollActive)


/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('change-theme')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

//previously selected topic
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

//we obtain the current theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? "dark" : "light"
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? '<ri-moon-line' : 'ri-sun-line'

//we validade if the user previously chose a topic
if (selectedTheme) {
  //if the validation is fulfilled, we ask what the issue was
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

//Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)

  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})
/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'scale',
  distance: '60px',
  duration: 2500,
  delay: 400,
//reset:true, //animation repeat
})

sr.reveal(`.home__data, .featured__container, .new__container,
           .join__data`)
sr.reveal(`.home__images`,{delay:10})
sr.reveal(`.services__card` , {interval: 50})
sr.reveal(`.discount__data`, {origin:'left'})
sr.reveal(`.discount__images .img-1`, {origin:'right'})
sr.reveal(`.discount__images .img-2`, {origin:'left'})


/*===============Video player================*/

const video = document.getElementById('video');
const playBtn = document.getElementById('play');
const bigPlay = document.getElementById('bigPlayBtn');
const progress = document.getElementById('progress');
const currentEl = document.getElementById('current');
const durationEl = document.getElementById('duration');
const muteBtn = document.getElementById('mute');
const volumeEl = document.getElementById('volume');
const fsBtn = document.getElementById('fs');
const player = document.getElementById('player');

function formatTime(seconds){
seconds = Math.floor(seconds) || 0;
const m = Math.floor(seconds/60);
const s = seconds % 60;
return `${m}:${s.toString().padStart(2,'0')}`;
}

// Play / Pause
function togglePlay(){
if(video.paused){
video.play();
} else {
video.pause();
}
updatePlayIcon();
}
function updatePlayIcon(){
const svg = playBtn.querySelector('svg');
if(video.paused){
svg.innerHTML = '<path d="M8 5v14l11-7z" fill="currentColor"></path>';
bigPlay.style.display = ''; // show central play when paused
} else {
svg.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"></path>';
bigPlay.style.display = 'none';
}
}


playBtn.addEventListener('click', ()=>{ togglePlay(); playBtn.focus(); });
bigPlay.addEventListener('click', ()=>{ togglePlay(); video.focus(); });

// Update times & progress
video.addEventListener('loadedmetadata', ()=>{
progress.max = video.duration;
durationEl.textContent = formatTime(video.duration);
});


video.addEventListener('timeupdate', ()=>{
progress.value = video.currentTime;
currentEl.textContent = formatTime(video.currentTime);
});


progress.addEventListener('input', (e)=>{
video.currentTime = e.target.value;
});


// Volume & mute
volumeEl.addEventListener('input', (e)=>{
video.volume = e.target.value;
if(video.volume === 0){
muteBtn.setAttribute('aria-pressed', 'true');
} else {
muteBtn.setAttribute('aria-pressed', 'false');
}
});
muteBtn.addEventListener('click', ()=>{
video.muted = !video.muted;
muteBtn.setAttribute('aria-pressed', String(video.muted));
if(video.muted){
volumeEl.dataset.prev = volumeEl.value;
volumeEl.value = 0;
} else {
volumeEl.value = volumeEl.dataset.prev || 1;
}
});

// Fullscreen
fsBtn.addEventListener('click', async ()=>{
try{
if(!document.fullscreenElement){
await player.requestFullscreen();
fsBtn.setAttribute('aria-pressed','true');
} else {
await document.exitFullscreen();
fsBtn.setAttribute('aria-pressed','false');
}
} catch(e){console.warn(e)}
});


// Keyboard shortcuts
document.addEventListener('keydown', (e)=>{
// do nothing if focus is on an input
const tag = document.activeElement.tagName.toLowerCase();
if(tag === 'input' || tag === 'textarea') return;


if(e.code === 'Space'){
e.preventDefault(); togglePlay();
} else if(e.key === 'ArrowRight'){
video.currentTime = Math.min(video.duration, video.currentTime + 5);
} else if(e.key === 'ArrowLeft'){
video.currentTime = Math.max(0, video.currentTime - 5);
} else if(e.key.toLowerCase() === 'm'){
video.muted = !video.muted; muteBtn.setAttribute('aria-pressed', String(video.muted));
} else if(e.key.toLowerCase() === 'f'){
fsBtn.click();
}
});


// Update play/pause icon on play/pause
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);


// Click on video toggles play as well
video.addEventListener('click', togglePlay);


// Ensure progress range uses duration as max when metadata loaded
video.addEventListener('durationchange', ()=>{ progress.max = video.duration; durationEl.textContent = formatTime(video.duration); });


// Initialize
updatePlayIcon();
// Accessibility: expose initial time/duration
if(video.readyState >= 1) {
durationEl.textContent = formatTime(video.duration);
}
