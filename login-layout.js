
window.applyLoginLayout = function() {
    // تعريف db عالمياً
    if (typeof db !== 'undefined' && !window.db) {
        window.db = db;
    }
    
    // 1. التحقق من وجود صفحة تسجيل الدخول
    var loginPage = document.getElementById('loginPage');
    if (!loginPage) {
        console.log('⚠️ loginPage not found');
        return;
    }
    
    // 2. إخفاء كل الصفحات التانية
    var otherPages = ['dashboardPage', 'mainApp', 'notificationsPage', 'profilePage', 'adminPanel', 'adminSettingsPage', 'userDetailsPage', 'aboutPage'];
    otherPages.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) {
            el.classList.add('hidden');
            el.style.display = 'none';
        }
    });
    
    // 3. إظهار صفحة تسجيل الدخول
    loginPage.classList.remove('hidden');
    loginPage.style.cssText = 'display:flex;flex-direction:row-reverse;min-height:100vh;opacity:1;visibility:visible;background:#ffffff;';
    
    // 4. تخطيط الخريطة (اليمين)
    var hero = document.querySelector('.login-hero');
    if (hero) {
        hero.style.cssText = 'flex:1;display:block;position:relative;min-height:100vh;background:#f5f6fa;';
        
        var mapEl = document.getElementById('publicMap');
        if (mapEl && !hero.contains(mapEl)) {
            hero.appendChild(mapEl);
        }
        if (mapEl) {
            mapEl.style.cssText = 'width:100%;height:100%;min-height:600px;display:block;position:absolute;top:0;left:0;z-index:1;';
        }
    }
    
    // 5. تخطيط الفورم (اليسار)
    var loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
        loginContainer.style.cssText = 'flex:1;display:flex;align-items:flex-start;justify-content:center;background:#f5f6fa;padding:20px;overflow-y:auto;';
    }
    
    var loginCard = document.querySelector('.login-card');
    if (loginCard) {
        loginCard.style.cssText = 'background:white;border-radius:28px;padding:30px;box-shadow:0 4px 20px rgba(0,0,0,0.08);text-align:center;width:100%;max-width:460px;';
        
        var existingImg = loginCard.querySelector('.login-person-img');
        if (!existingImg) {
            var personImg = document.createElement('div');
            personImg.className = 'login-person-img';
            personImg.style.cssText = 'height:300px;width:110%;margin-left:-5%;background-image:url('L&F pro.png');background-size:cover;background-position:center 55%;border-radius:15px;margin-bottom:15px;';
            loginCard.insertBefore(personImg, loginCard.firstChild);
        }
    }
    
    // 6. إنشاء الخريطة
    initPublicMapLayout();
};

function initPublicMapLayout() {
    var mapEl = document.getElementById('publicMap');
    if (!mapEl) return;
    
    // تنظيف
    if (mapEl._leaflet_map) {
        mapEl._leaflet_map.remove();
    }
    delete mapEl._leaflet_map;
    delete mapEl._leaflet_id;
    mapEl.innerHTML = '';
    mapEl.classList.remove('leaflet-container', 'leaflet-touch', 'leaflet-fade-anim', 'leaflet-grab', 'leaflet-touch-drag', 'leaflet-touch-zoom');
    
    var hero = document.querySelector('.login-hero');
    if (hero) {
        hero.style.cssText = 'flex:1;display:block;position:relative;min-height:100vh;background:#f5f6fa;';
    }
    
    mapEl.style.cssText = 'width:100%;height:100%;min-height:600px;display:block;position:absolute;top:0;left:0;z-index:1;';
    
    setTimeout(function() {
        if (!window.L) {
            console.log('⚠️ Leaflet not loaded');
            return;
        }
        if (!window.db) {
            console.log('⚠️ Firestore not ready — retry');
            setTimeout(initPublicMapLayout, 1000);
            return;
        }
        
        var map = L.map('publicMap').setView([31.95, 35.91], 7);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap',
            maxZoom: 19
        }).addTo(map);
        
        mapEl._leaflet_map = map;
        window.publicMapInstance = map;
        
        var lostIcon = L.divIcon({
            className: '',
            html: '<div style="background:#e74c3c;color:white;border-radius:50%;width:30px;height:30px;text-align:center;line-height:30px;font-weight:bold;font-size:14px;animation:pulse 2s infinite;box-shadow:0 0 12px #e74c3c;">L</div>',
            iconSize: [30, 30],
            popupAnchor: [0, -15]
        });
        
        var foundIcon = L.divIcon({
            className: '',
            html: '<div style="background:#27ae60;color:white;border-radius:50%;width:30px;height:30px;text-align:center;line-height:30px;font-weight:bold;font-size:14px;animation:pulse 2s infinite;box-shadow:0 0 12px #27ae60;">F</div>',
            iconSize: [30, 30],
            popupAnchor: [0, -15]
        });
        
        var rewardIcon = L.divIcon({
            className: '',
            html: '<div style="background:#f0a500;color:white;border-radius:50%;width:34px;height:34px;text-align:center;line-height:34px;font-weight:bold;font-size:17px;animation:pulse 1s infinite;box-shadow:0 0 16px #f0a500;">$</div>',
            iconSize: [34, 34],
            popupAnchor: [0, -17]
        });
        
        // جلب البيانات وعرضها
        window.db.collection('lostItems').get().then(function(snap) {
            snap.forEach(function(doc) {
                var d = doc.data();
                if (d.lat && d.lng) {
                    var icon = d.reward && d.reward.money ? rewardIcon : lostIcon;
                    var imgHTML = (d.images && d.images[0]) ? 
                        '<div style="text-align:center;"><img src="' + d.images[0] + '" style="max-width:100%;max-height:100px;border-radius:6px;margin-bottom:4px;display:block;margin-left:auto;margin-right:auto;"></div>' : '';
                    var rewardHTML = (d.reward && d.reward.money) ? 
                        '<br><span style="color:#f0a500;font-weight:bold;font-size:16px;">💰 $' + d.reward.moneyAmount + '</span>' : '';
                    
                    L.marker([d.lat, d.lng], {icon: icon})
                        .addTo(map)
                        .bindPopup('<div style="font-size:14px;line-height:1.5;max-width:280px;padding:8px;">' +
                            imgHTML +
                            '<b>🔴 Lost:</b> ' + (d.desc || 'No description') + '<br>' +
                            '<small style="font-size:12px;">👤 ' + (d.name || 'Unknown') + '<br>' +
                            '📍 ' + (d.city || 'N/A') + (d.country ? ', ' + d.country : '') + '<br>' +
                            '📅 ' + (d.date || 'N/A') + '<br>' +
                            '🏷 ' + (d.category || 'other') + '</small>' +
                            rewardHTML +
                            '</div>', {maxWidth: 300});
                }
            });
        });
        
        window.db.collection('foundItems').get().then(function(snap) {
            snap.forEach(function(doc) {
                var d = doc.data();
                if (d.lat && d.lng) {
                    var icon = d.reward && d.reward.money ? rewardIcon : foundIcon;
                    var imgHTML = (d.images && d.images[0]) ? 
                        '<div style="text-align:center;"><img src="' + d.images[0] + '" style="max-width:100%;max-height:100px;border-radius:6px;margin-bottom:4px;display:block;margin-left:auto;margin-right:auto;"></div>' : '';
                    var rewardHTML = (d.reward && d.reward.money) ? 
                        '<br><span style="color:#f0a500;font-weight:bold;font-size:16px;">💰 $' + d.reward.moneyAmount + '</span>' : '';
                    
                    L.marker([d.lat, d.lng], {icon: icon})
                        .addTo(map)
                        .bindPopup('<div style="font-size:14px;line-height:1.5;max-width:280px;padding:8px;">' +
                            imgHTML +
                            '<b>✅ Found:</b> ' + (d.desc || 'No description') + '<br>' +
                            '<small style="font-size:12px;">👤 ' + (d.name || 'Unknown') + '<br>' +
                            '📍 ' + (d.city || 'N/A') + (d.country ? ', ' + d.country : '') + '<br>' +
                            '📅 ' + (d.date || 'N/A') + '<br>' +
                            '🏷 ' + (d.category || 'other') + '</small>' +
                            rewardHTML +
                            '</div>', {maxWidth: 300});
                }
            });
        });
        
        console.log('✅ login-layout: الخريطة والبطاقات جاهزة');
        
    }, 800);
}

// تشغيل تلقائي عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(window.applyLoginLayout, 1000);
    });
} else {
    setTimeout(window.applyLoginLayout, 1000);
}

window.addEventListener('load', function() {
    setTimeout(function() {
        if (typeof window.applyLoginLayout === 'function') {
            window.applyLoginLayout();
        }
    }, 1500);
});
