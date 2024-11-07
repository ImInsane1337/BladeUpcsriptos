// ==UserScript==
// @name         BladeUp Customizer
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Изменяет секцию VIP, применяет изменения на кнопках и ролях только если активирована кастомная тема "Customed by ImInsane"
// @match        *://bladeup.pw/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ------------------------- Изменение VIP секции и кнопки -------------------------
    function modifyVipSection() {
        const vipFeatures = document.querySelectorAll('.vip-feature');
        if (vipFeatures.length > 0) {
            vipFeatures[0].textContent = 't.me/insane_ru';
            for (let i = 1; i < vipFeatures.length; i++) {
                vipFeatures[i].remove();
            }
        }

        const vipTitle = document.querySelector('.vip-title');
        if (vipTitle) {
            vipTitle.innerHTML = '<i class="fas fa-crown"></i> Custom';
        }
    }

    function modifyVipButton() {
        const vipButton = document.getElementById('buyVip');
        if (vipButton) {
            vipButton.setAttribute('onclick', "window.open('https://t.me/insane_ru', '_blank')");
            vipButton.textContent = 'My Telegram';
        }
    }

    // ------------------------- Применение тёмной темы -------------------------
    const darkThemeColors = {
        '--accent-color': '#303030',
        '--hover-button': '#808080',
        '--hover-bledni': '#00000030',
        '--defoult-mmenu': '#0f0f0f',
        '--msg-ss': '#1a1a1a',
        '--body': '#0d0d0d'
    };

    function applyDarkTheme() {
        const root = document.documentElement;
        for (let [variable, color] of Object.entries(darkThemeColors)) {
            root.style.setProperty(variable, color);
        }
    }

    // ------------------------- Замена ролей пользователей -------------------------
    function modifyMemberRoles() {
        const memberRoles = document.querySelectorAll('.member-role');
        memberRoles.forEach(role => {
            if (role.textContent === 'Owner') {
                role.textContent = 'Владелец';
            } else if (role.textContent === 'Member') {
                role.textContent = 'Участник';
            }
        });
    }

    // ------------------------- Замена текста на кнопке "Выкинуть" -------------------------
    function modifyKickButton() {
        const kickButtons = document.querySelectorAll('.kick-member.kick');
        kickButtons.forEach(button => {
            if (button.textContent === 'Выкинуть') {
                button.textContent = 'Кикнуть';
            }
        });
    }

    // ------------------------- Применение изменений -------------------------
    modifyVipSection();
    modifyVipButton();
    applyDarkTheme();
    modifyMemberRoles();
    modifyKickButton();

    // Если находимся на странице /clan/*
    if (window.location.pathname.startsWith('/clan/')) {
        const root = document.documentElement;
        root.style.setProperty('--accent-color', '#505050');
    }

    // Следим за изменениями в DOM
    const observer = new MutationObserver(() => {
        modifyVipSection();
        modifyVipButton();
        applyDarkTheme();
        modifyMemberRoles();
        modifyKickButton();

        if (window.location.pathname.startsWith('/clan/')) {
            const root = document.documentElement;
            root.style.setProperty('--accent-color', '#505050');
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
