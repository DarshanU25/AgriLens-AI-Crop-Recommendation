const translations = {
    'en': {
        'nav-home': 'Home',
        'nav-tips': 'Farming Tips',
        'nav-sensors': 'Field Sensors',
        'nav-records': 'Yield Records',
        'title-main': 'Smart Farming Assistant',
        'subtitle-main': 'Find the best crops for your exact soil and weather conditions.',
        'title-telemetry': 'Live Field View',
        'val-airtemp': 'Air Temp',
        'val-humidity': 'Humidity',
        'val-soiltemp': 'Soil Temp',
        'val-moisture': 'Soil Water',
        'btn-quick': 'Quick Check',
        'title-report': 'Crop Recommendations',
        'txt-report-empty': 'Select your soil and weather below to get farming advice.',
        'title-params': 'Your Field Details',
        'lbl-soil': 'Soil Type',
        'lbl-region': 'Your Region',
        'lbl-weather': 'Weather',
        'btn-run': 'Find Best Crop',
        'title-articles': 'Simple Farming Guides',
        'sub-articles': 'Learn modern farming techniques in simple words to increase your crop yield.',
        'title-nodes': 'Equipment Status',
        'sub-nodes': 'Check if your field machines and sensors are working.',
        'title-history': 'Past Harvests',
        'sub-history': 'Look back at what you grew in the past.',
        'btn-back': 'Go Back'
    },
    'hi': {
        'nav-home': 'मुख्य पृष्ठ',
        'nav-tips': 'खेती की सलाह',
        'nav-sensors': 'सेंसर',
        'nav-records': 'फसल रिकॉर्ड',
        'title-main': 'स्मार्ट कृषि सहायक',
        'subtitle-main': 'अपनी मिट्टी और मौसम के लिए सबसे अच्छी फसल खोजें।',
        'title-telemetry': 'लाइव खेत दृश्य',
        'val-airtemp': 'हवा का तापमान',
        'val-humidity': 'नमी',
        'val-soiltemp': 'मिट्टी का तापमान',
        'val-moisture': 'मिट्टी का पानी',
        'btn-quick': 'त्वरित जांच',
        'title-report': 'फसल की सिफारिश',
        'txt-report-empty': 'खेती की सलाह पाने के लिए नीचे अपनी मिट्टी और मौसम चुनें।',
        'title-params': 'आपके खेत की जानकारी',
        'lbl-soil': 'मिट्टी का प्रकार',
        'lbl-region': 'आपका क्षेत्र',
        'lbl-weather': 'मौसम',
        'btn-run': 'फसल खोजें',
        'title-articles': 'सरल खेती गाइड',
        'sub-articles': 'पैदावार बढ़ाने के लिए आधुनिक खेती के तरीके सरल शब्दों में सीखें।',
        'title-nodes': 'मशीनों की स्थिति',
        'sub-nodes': 'जांचें कि आपके खेत की मशीनें और सेंसर काम कर रहे हैं।',
        'title-history': 'पिछली फसलें',
        'sub-history': 'देखें कि आपने अतीत में क्या उगाया था।',
        'btn-back': 'वापस जाएँ'
    },
    'mr': {
        'nav-home': 'मुखपृष्ठ',
        'nav-tips': 'शेतीविषयी माहिती',
        'nav-sensors': 'सेन्सर',
        'nav-records': 'पीक रेकॉर्ड',
        'title-main': 'स्मार्ट शेती सहाय्यक',
        'subtitle-main': 'तुमच्या माती आणि हवामानानुसार सर्वोत्तम पीक शोधा.',
        'title-telemetry': 'थेट शेतातील दृश्य',
        'val-airtemp': 'हवेचे तापमान',
        'val-humidity': 'आर्द्रता',
        'val-soiltemp': 'मातीचे तापमान',
        'val-moisture': 'मातीतील पाणी',
        'btn-quick': 'जलद तपासणी',
        'title-report': 'पीक शिफारस',
        'txt-report-empty': 'सल्ला मिळवण्यासाठी खाली तुमची माती आणि हवामान निवडा.',
        'title-params': 'तुमच्या शेताचा तपशील',
        'lbl-soil': 'मातीचा प्रकार',
        'lbl-region': 'तुमचा प्रदेश',
        'lbl-weather': 'हवामान',
        'btn-run': 'पीक शोधा',
        'title-articles': 'सोपे शेती मार्गदर्शक',
        'sub-articles': 'तुमचे पीक वाढवण्यासाठी सोप्या भाषेत नवीन पद्धती शिका.',
        'title-nodes': 'मशीन्सची स्थिती',
        'sub-nodes': 'तुमच्या शेतातील मशीन्स आणि सेन्सर्स काम करत आहेत का ते तपासा.',
        'title-history': 'मागील पिके',
        'sub-history': 'तुम्ही भूतकाळात काय पिकवले ते पहा.',
        'btn-back': 'मागे चला'
    }
};

let currentLang = 'en';

function changeLanguage(lang) {
    if(!translations[lang]) return;
    currentLang = lang;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Update select placeholders if needed
    const optSoil = document.getElementById('opt-soil');
    if (optSoil) optSoil.innerHTML = lang === 'en' ? 'Select soil...' : (lang === 'hi' ? 'मिट्टी चुनें...' : 'माती निवडा...');
    
    const optRegion = document.getElementById('opt-region');
    if (optRegion) optRegion.innerHTML = lang === 'en' ? 'Select climate...' : (lang === 'hi' ? 'जलवायु चुनें...' : 'हवामान निवडा...');
    
    const optWeather = document.getElementById('opt-weather');
    if (optWeather) optWeather.innerHTML = lang === 'en' ? 'Select condition...' : (lang === 'hi' ? 'स्थिति चुनें...' : 'स्थिती निवडा...');

    // Re-render articles
    renderArticles();
    
    // Update active section headers manually
    const activeNav = document.querySelector('.nav-links a.active span');
    if(activeNav) {
        navigate(document.querySelector('.page-section[style*="block"]').id.replace('section-', '')); 
        // Note: navigate just patches the english text back over, so let's adjust navigate to use translation dict:
    }
}

function navigate(sectionId, element) {
    document.querySelectorAll('.page-section').forEach(sec => sec.style.display = 'none');
    
    const target = document.getElementById('section-' + sectionId);
    if(target) target.style.display = 'block';

    if(element) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        if(element.tagName === 'SPAN') { element.parentElement.classList.add('active'); }
        else { element.classList.add('active'); }
    }

    const title = document.getElementById('page-title');
    const subtitle = document.getElementById('page-subtitle');
    
    if(sectionId === 'dashboard') {
        title.innerHTML = `<span data-i18n="title-main">${translations[currentLang]['title-main']}</span>`;
        subtitle.innerHTML = `<span data-i18n="subtitle-main">${translations[currentLang]['subtitle-main']}</span>`;
    } else if (sectionId === 'insights') {
        title.innerHTML = `<span data-i18n="title-articles">${translations[currentLang]['title-articles']}</span>`;
        subtitle.innerHTML = `<span data-i18n="sub-articles">${translations[currentLang]['sub-articles']}</span>`;
    } else if (sectionId === 'sensors') {
        title.innerHTML = `<span data-i18n="title-nodes">${translations[currentLang]['title-nodes']}</span>`;
        subtitle.innerHTML = `<span data-i18n="sub-nodes">${translations[currentLang]['sub-nodes']}</span>`;
    } else if (sectionId === 'analytics') {
        title.innerHTML = `<span data-i18n="title-history">${translations[currentLang]['title-history']}</span>`;
        subtitle.innerHTML = `<span data-i18n="sub-history">${translations[currentLang]['sub-history']}</span>`;
    }
}

// Articles Array
const articleDB = {
    'ai-farming': {
        en: { title: 'How AI helps you farm', tag: 'AI Assist', excerpt: 'Computers can now help us guess which crop will grow best in our soil. They look at history and soil patterns.', content: '<p>Computers can now help us guess which crop will grow best in our soil. They look at history and soil patterns to give us the right answer, saving money on bad seeds.</p>' },
        hi: { title: 'AI खेती में कैसे मदद करता है', tag: 'AI सहायता', excerpt: 'कंप्यूटर अब हमें यह अनुमान लगाने में मदद कर सकते हैं कि हमारी मिट्टी में कौन सी फसल सबसे अच्छी होगी।', content: '<p>कंप्यूटर अब हमें यह अनुमान लगाने में मदद कर सकते हैं कि हमारी मिट्टी में कौन सी फसल सबसे अच्छी होगी। वे हमें सही उत्तर देने के लिए इतिहास और मिट्टी के पैटर्न को देखते हैं, जिससे खराब बीजों पर पैसे की बचत होती है।</p>' },
        mr: { title: 'AI शेतीत कशी मदत करते', tag: 'AI मदत', excerpt: 'आमच्या जमिनीत कोणते पीक सर्वात चांगले वाढेल याचा अंदाज घेण्यासाठी आधुनिक संगणक आता आम्हाला मदत करू शकतात.', content: '<p>आमच्या जमिनीत कोणते पीक सर्वात चांगले वाढेल याचा अंदाज घेण्यासाठी आधुनिक संगणक आता आम्हाला मदत करू शकतात. खराब बियाण्यांवर पैसे वाचवण्यासाठी ते आम्हाला योग्य उत्तर देण्यासाठी इतिहास आणि मातीचे नमुने पाहतात.</p>' },
        image: 'linear-gradient(135deg, #93c5fd, #3b82f6)',
        icon: 'ph-brain'
    },
    'sustainability': {
        en: { title: 'Saving Water and Fertilizer', tag: 'Savings', excerpt: 'Using smart sensors, we know exactly when the plants are thirsty.', content: '<p>Using smart sensors, we know exactly when the plants are thirsty and when they are fully fed. This saves us from wasting expensive fertilizer.</p>' },
        hi: { title: 'पानी और उर्वरक की बचत', tag: 'बचत', excerpt: 'स्मार्ट सेंसर का उपयोग करके, हम ठीक से जानते हैं कि पौधे कब प्यासे होते हैं।', content: '<p>स्मार्ट सेंसर का उपयोग करके, हम ठीक से जानते हैं कि पौधे कब प्यासे होते हैं और उन्हें कब पूरी तरह से खिलाया जाता है। यह हमें महंगा उर्वरक बर्बाद करने से बचाता है।</p>' },
        mr: { title: 'पाणी आणि खताची बचत', tag: 'बचत', excerpt: 'स्मार्ट सेन्सर वापरून, आम्हाला वेळेवर समजते की वनस्पतींना पाण्याची गरज कधी आहे.', content: '<p>स्मार्ट सेन्सर वापरून, आम्हाला वेळेवर समजते की वनस्पतींना पाण्याची गरज कधी आहे. हे आम्हाला महाग खत वाया जाण्यापासून वाचवते.</p>' },
        image: 'linear-gradient(135deg, #86efac, #22c55e)',
        icon: 'ph-tree-evergreen'
    },
    'hardware': {
        en: { title: 'What are farm sensors?', tag: 'Equipment', excerpt: 'Sensors are small devices put in the mud that talk to a computer.', content: '<p>Sensors are small devices put in the mud that talk to a computer. They measure water, heat, and nutrients automatically every day.</p>' },
        hi: { title: 'खेत के सेंसर क्या हैं?', tag: 'उपकरण', excerpt: 'सेंसर मिट्टी में लगाए गए छोटे उपकरण हैं जो कंप्यूटर से बात करते हैं।', content: '<p>सेंसर मिट्टी में लगाए गए छोटे उपकरण हैं जो कंप्यूटर से बात करते हैं। वे हर दिन स्वचालित रूप से पानी, गर्मी और पोषक तत्वों को मापते हैं।</p>' },
        mr: { title: 'शेतीचे सेन्सर काय आहेत?', tag: 'उपकरणे', excerpt: 'सेन्सर हे चिखलात ठेवलेली छोटी उपकरणे आहेत जी संगणकाशी बोलतात.', content: '<p>सेन्सर हे चिखलात ठेवलेली छोटी उपकरणे आहेत जी संगणकाशी बोलतात. ते दररोज आपोआप पाणी, उष्णता आणि खतांचे मोजमाप करतात.</p>' },
        image: 'linear-gradient(135deg, #fde047, #eab308)',
        icon: 'ph-sun'
    }
};

function renderArticles() {
    const list = document.getElementById('articles-list');
    if(!list) return;
    let html = '';
    for(const [id, art] of Object.entries(articleDB)) {
        html += `
        <div class="blog-card" onclick="openArticle('${id}')">
            <div class="blog-image" style="background: ${art.image};">
                <i class="ph ${art.icon}"></i>
            </div>
            <div class="blog-content">
                <span class="blog-tag">${art[currentLang].tag}</span>
                <h3 class="blog-title">${art[currentLang].title}</h3>
                <p class="blog-excerpt">${art[currentLang].excerpt}</p>
                <span class="read-more">${translations[currentLang]['btn-run']}... <i class="ph ph-arrow-right"></i></span>
            </div>
        </div>`;
    }
    list.innerHTML = html;
}

function openArticle(articleId) {
    document.querySelectorAll('.page-section').forEach(sec => sec.style.display = 'none');
    document.getElementById('section-article-detail').style.display = 'block';

    const art = articleDB[articleId];
    if(art) {
        document.getElementById('article-content-container').innerHTML = `
            <div style="background: ${art.image}; height: 200px; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 30px;">
                <i class="ph ${art.icon}" style="font-size: 5rem;"></i>
            </div>
            <span class="blog-tag">${art[currentLang].tag}</span>
            <h1 style="color: var(--text-main); font-size: 2.5rem; margin-bottom: 20px; font-family: 'Space Grotesk', sans-serif;">${art[currentLang].title}</h1>
            <div class="article-body" style="color: var(--text-muted); line-height: 1.8; font-size: 1.1rem;">
                ${art[currentLang].content}
            </div>
        `;
    }
}

// Initial draw
renderArticles();

// SENSOR MOCK
function updateSensorData() {
    ['airTemp', 'humidity', 'soilTemp', 'soilMoisture', 'co2', 'o2', 'sensorPageAirTemp', 'sensorPageMoisture'].forEach(id => {
        const el = document.getElementById(id);
        if(!el) return;
        const current = parseFloat(el.innerText);
        const value = current ? (current * 0.95 + (Math.random()*10 - 5)) : 20 + Math.random()*20;
        let unit = id.toLowerCase().includes('moisture') || id.toLowerCase().includes('humidity') || id === 'o2' ? '%' : (id === 'co2' ? 'PPM' : '°C');
        el.innerHTML = `${Math.abs(value).toFixed(1)} <span>${unit}</span>`;
    });
}
setInterval(updateSensorData, 3000);
updateSensorData();

function getCropIcon(name) { return 'ph-leaf'; }

const crops = [
    {name:"Wheat", soil:"Loamy", region:"Temperate", environment:"Moderate", fertilizer:"NPK", water:"500 mm", period:"120 days"},
    {name:"Barley", soil:"Loamy", region:"Temperate", environment:"Cold", fertilizer:"Nitrogen", water:"400 mm", period:"100 days"}
];

function generateRecCard(title, subtitle, tags, icon, isQuick, confidence) {
    let confHtml = confidence ? `<span class="rec-confidence">${confidence}</span>` : '';
    return `<div class="rec-card animate"><div class="rec-icon"><i class="${icon}"></i></div><div class="rec-content"><div class="rec-title">${title} ${confHtml}</div><p style="color:var(--text-muted);font-size:0.95rem;margin-bottom:8px;">${subtitle}</p></div></div>`;
}

function getPlantRecommendations() {
    document.getElementById('quick-recs').innerHTML = generateRecCard("Banana", "Good for your field", [], "ph-tree-palm", true);
}

async function getCropRecommendations() {
    const rDiv = document.getElementById('recommendations');
    rDiv.innerHTML = `<div class="loading-state"><i class="ph ph-spinner-gap"></i><h3>Processing...</h3></div>`;
    setTimeout(() => {
        rDiv.innerHTML = generateRecCard("Wheat", "Best fit for Loamy soil.", [], "ph-leaf", false, "98% Match");
    }, 1200);
}
