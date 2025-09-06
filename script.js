// نظام إدارة اللغات
const languageManager = {
    currentLanguage: 'ar',
    
    init: function() {
        this.loadLanguagePreference();
        this.setupEventListeners();
        this.applyLanguage(this.currentLanguage);
    },
    
    loadLanguagePreference: function() {
        const savedLanguage = localStorage.getItem('kemetgift-language');
        if (savedLanguage) {
            this.currentLanguage = savedLanguage;
        }
    },
    
    setupEventListeners: function() {
        const languageSwitcher = document.getElementById('languageSwitcher');
        if (languageSwitcher) {
            languageSwitcher.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }
        
        // إغلاق القائمة عند النقر على رابط في الجوال
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    },
    
    toggleLanguage: function() {
        this.currentLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
        localStorage.setItem('kemetgift-language', this.currentLanguage);
        this.applyLanguage(this.currentLanguage);
        this.showLanguageNotification();
    },
    
    applyLanguage: function(language) {
        document.documentElement.lang = language;
        
        // تحديث نص مبدل اللغة
        const languageText = document.querySelector('#languageSwitcher span:first-child');
        if (languageText) {
            languageText.textContent = language === 'ar' ? 'EN' : 'AR';
        }
        
        // تحميل محتوى اللغة المناسب
        this.loadLanguageContent(language);
    },
    
    loadLanguageContent: function(language) {
        // هذا مجرد مثال، في التطبيق الحقيقي قد تحتاج إلى جلب المحتوى من ملفات JSON أو من الخادم
        const elements = document.querySelectorAll('[data-ar], [data-en]');
        
        elements.forEach(element => {
            if (language === 'ar' && element.hasAttribute('data-ar')) {
                element.textContent = element.getAttribute('data-ar');
            } else if (language === 'en' && element.hasAttribute('data-en')) {
                element.textContent = element.getAttribute('data-en');
            }
        });
        
        // تحديث السمة dir لمحتوى الصفحة
        document.body.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    },
    
    showLanguageNotification: function() {
        const notification = document.getElementById('notification');
        if (notification) {
            const message = this.currentLanguage === 'ar' 
                ? 'تم تغيير اللغة إلى العربية' 
                : 'Language changed to English';
                
            notification.textContent = message;
            notification.className = 'notification success';
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    }
};

// إدارة القائمة في الجوال
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
}

// التعامل مع إرسال نماذج الاتصال
function setupContactForms() {
    const contactForm = document.getElementById('contactForm');
    const notification = document.getElementById('notification');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // محاكاة إرسال النموذج
            const message = document.documentElement.lang === 'ar' 
                ? 'تم إرسال رسالتك بنجاح، سنتواصل معك قريبًا.' 
                : 'Your message has been sent successfully, we will contact you soon.';
                
            showNotification(message, 'success');
            contactForm.reset();
        });
    }
}

// وظيفة إظهار الإشعارات
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.className = 'notification ' + type;
        notification.classList.add('show');
        
        setTimeout(function() {
            notification.classList.remove('show');
        }, 3000);
    }
}

// تأثير التمرير السلس للروابط
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // إغلاق القائمة في الجوال بعد النقر على رابط
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

// Countdown Timer
function setupCountdown() {
    const launchDate = new Date('January 1, 2027 00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.innerText = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.innerText = seconds.toString().padStart(2, '0');
    }
    
    // تحديث العد التنازلي كل ثانية
    setInterval(updateCountdown, 1000);
    updateCountdown(); // التهيئة الأولية
}

// تهيئة جميع الوظائف عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    languageManager.init();
    setupMobileMenu();
    setupContactForms();
    setupSmoothScrolling();
    setupCountdown();
    
    // تحديد الصفحة النشطة في القائمة
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});