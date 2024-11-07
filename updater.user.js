// ==UserScript==
// @name         BladeUp Customizer
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Изменяет секцию VIP, применяет изменения на кнопках и ролях только если активирована кастомная тема "Customed by ImInsane"
// @match        *://bladeup.pw/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ImInsane1337/BladeUpcsriptos/main/updater.meta.js
// @downloadURL  https://raw.githubusercontent.com/ImInsane1337/BladeUpcsriptos/main/updater.user.js
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

    // Добавление нового варианта в селектор цвета (это нужно только на странице интерфейса)
    function addCustomColorScheme() {
        const colorSchemeSelector = document.getElementById('colorSchemeSelector');
        if (colorSchemeSelector) {
            const customOption = document.createElement('option');
            customOption.value = 'customedByImInsane';
            customOption.textContent = 'Customed by ImInsane';
            colorSchemeSelector.appendChild(customOption);
        }
    }

    // Применение кастомной темы
    function applyCustomTheme(selectedOption) {
        const root = document.documentElement;
        
        if (selectedOption === 'customedByImInsane') {
            // Применяем кастомные цвета
            const darkThemeColors = {
                '--accent-color': '#303030',
                '--hover-button': '#808080',
                '--hover-bledni': '#00000030',
                '--defoult-mmenu': '#0f0f0f',
                '--msg-ss': '#1a1a1a',
                '--body': '#0d0d0d'
            };
            for (let [variable, color] of Object.entries(darkThemeColors)) {
                root.style.setProperty(variable, color);
            }
        } else {
            // Если выбрана не кастомная тема, сбрасываем эти стили
            root.style.setProperty('--accent-color', ''); 
            root.style.setProperty('--hover-button', ''); 
            root.style.setProperty('--hover-bledni', ''); 
            root.style.setProperty('--defoult-mmenu', ''); 
            root.style.setProperty('--msg-ss', ''); 
            root.style.setProperty('--body', '');
        }
    }

    // Проверяем сохранённый выбор из localStorage
    function loadSavedTheme() {
        const savedTheme = localStorage.getItem('customColorScheme');
        if (savedTheme) {
            applyCustomTheme(savedTheme); // Применяем сохранённую тему
        }
    }

    // Сохраняем выбранную тему в localStorage
    function saveSelectedTheme(selectedOption) {
        localStorage.setItem('customColorScheme', selectedOption);
    }

    // Следим за изменениями в селекторе на странице интерфейса
    const colorSchemeSelector = document.getElementById('colorSchemeSelector');
    if (colorSchemeSelector) {
        // Применяем сохранённую тему при загрузке
        loadSavedTheme();

        colorSchemeSelector.addEventListener('change', function() {
            const selectedOption = colorSchemeSelector.value;
            saveSelectedTheme(selectedOption); // Сохраняем выбранную тему
            applyCustomTheme(selectedOption); // Применяем выбранную тему
        });

        // Добавляем кастомную тему в селектор только на странице интерфейса
        addCustomColorScheme();

        // Если сохранена кастомная тема, ставим её в селектор
        const savedTheme = localStorage.getItem('customColorScheme');
        if (savedTheme === 'customedByImInsane') {
            colorSchemeSelector.value = 'customedByImInsane';
        }
    }

    // ------------------------- Применение изменений -------------------------
    modifyVipSection();
    modifyVipButton();
    modifyMemberRoles();
    modifyKickButton();

    // Следим за изменениями в DOM
    const observer = new MutationObserver(() => {
        modifyVipSection();
        modifyVipButton();
        modifyMemberRoles();
        modifyKickButton();
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();

