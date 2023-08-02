import { useState, useEffect } from "react";

export default function useLocalStorage(key: string, initVal: any) {
    const [value, setValue] = useState(() => {
        try {
            const localStorage = window.localStorage.getItem(key);
            return localStorage ? JSON.parse(localStorage) : initVal;
        } catch (error) {
            return initVal;
        }
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
