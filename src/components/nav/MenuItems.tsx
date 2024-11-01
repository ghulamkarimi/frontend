"use client";

import { useEffect, useState } from "react";

const MenuItems = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        const userId = localStorage.getItem("userId");
        setIsLoggedIn(userId !== null);
    }, []);

    const menuItems = [
        { title: 'Home', url: '/' },
        { title: 'Fahrzeugvermietung', url: '/fahrzeugvermietung' },
        { title: 'Fahrzeug kaufen', url: '/fahrzeugkaufen' },
        { title: 'Werkstatt-Service', url: '/werkstatt-service' },
        { title: 'Kontakt', url: '/kontakt' },
        { title: 'Impressum', url: '/impressum' },
        { title: 'Datenschutz', url: '/datenschutz' },

    ];

    if (!isLoggedIn) {
        menuItems.push(
            { title: 'Register', url: '/register' },
            { title: 'Login', url: '/login' }
        );
    }

    return menuItems;
};

export default MenuItems;  