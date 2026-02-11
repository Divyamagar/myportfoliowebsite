document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Typing animation for the hero heading
    const typingEl = document.getElementById('typing-text');
    const phrases = ["Hey I'm Divya"];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeTick() {
        if (!typingEl) return;
        const current = phrases[phraseIndex];
        if (!deleting) {
            charIndex++;
            typingEl.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(typeTick, 1200);
                return;
            }
        } else {
            charIndex--;
            typingEl.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }
        setTimeout(typeTick, deleting ? 40 : 80);
    }
    typeTick();

    // Sticky navbar + active link highlighting
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = Array.from(document.querySelectorAll('section[id]'));

    function onScroll() {
        if (window.scrollY > 50) navbar.classList.add('sticky');
        else navbar.classList.remove('sticky');

        const scrollPos = window.scrollY + window.innerHeight / 3;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
            }
        });
    }
    window.addEventListener('scroll', onScroll);
    onScroll();

    // Reveal-on-scroll using IntersectionObserver
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    reveals.forEach(r => observer.observe(r));

    // Download CV: generate a simple text CV and trigger download
    const cvBtn = document.querySelector('.hero-text button');
    if (cvBtn) {
        cvBtn.addEventListener('click', () => {
            const cvText = `DIVYA - WEB DEVELOPER
===============================================

CONTACT INFORMATION
Email: divya@example.com
Phone: +91 XXXXXXXXXX
Location: India

PROFESSIONAL SUMMARY
BCA student and beginner web developer passionate about creating simple and responsive websites. Strong foundation in HTML, CSS, and JavaScript with basic knowledge of programming languages.

SKILLS
- HTML5: 85%
- CSS3: 80%
- JavaScript: 60%
- C: 90%
- C++: 95%

EDUCATION
BCA (Bachelor of Computer Applications)
Currently Pursuing

TECHNICAL PROFICIENCIES
Frontend: HTML, CSS, JavaScript
Programming Languages: C, C++
Design: Responsive Web Design, UI Design

PORTFOLIO
Personal Portfolio: https://your-portfolio.example

ABOUT
I am a BCA student creating clean, responsive websites using modern web technologies. I enjoy turning ideas into interactive web experiences and am committed to continuous learning.`;
            const blob = new Blob([cvText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Divya_CV.txt';
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        });
    }

});
// Shows which nav item is "active" when scrolling
navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));