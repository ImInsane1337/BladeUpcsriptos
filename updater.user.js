// ==UserScript==
// @name         BladeUp Customizer
// @namespace    http://tampermonkey.net/
// @version      1.4
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

    // ------------------------- Применение тёмной темы -------------------------
    const darkThemeColors = {
        '--accent-color': '#303030',
        '--hover-button': '#808080',
        '--hover-bledni': '#00000030',
        '--defoult-mmenu': '#0f0f0f',
        '--msg-ss': '#1a1a1a',
        '--body': '#0d0d0d'
    };

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
        if (selectedOption === 'customedByImInsane') {
            // Применяем кастомные цвета
            const darkThemeColors = {
                '--accent-color': '#303030', // Пример для кастомного акцента
                '--hover-button': '#808080', // Пример для белых кнопок
                '--hover-bledni': '#00000030', // Полупрозрачный чёрный
                '--defoult-mmenu': '#0f0f0f', // Очень тёмный оттенок для меню
                '--msg-ss': '#1a1a1a',        // Тёмный цвет для сообщений
                '--body': '#0d0d0d'           // Тёмный цвет фона
            };
            const root = document.documentElement;
            for (let [variable, color] of Object.entries(darkThemeColors)) {
                root.style.setProperty(variable, color);
            }
        } else {
            // Возвращаем стандартные цвета или другие цвета, если нужно
            const root = document.documentElement;
            root.style.setProperty('--accent-color', ''); // Применим дефолтный акцент
            root.style.setProperty('--hover-button', ''); // Применим дефолтный цвет кнопок
            // Остальные стандартные стили
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
    loadSavedTheme();
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
        loadSavedTheme();
        modifyMemberRoles();
        modifyKickButton();

        if (window.location.pathname.startsWith('/clan/')) {
            const root = document.documentElement;
            root.style.setProperty('--accent-color', '#505050');
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
