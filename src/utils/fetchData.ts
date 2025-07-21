const TOOLKIT_URL = 'http://localhost:5000/api/ux/toolkit';
const BACKPACK_URL = 'http://localhost:5000/api/ux/toolkit/backpack';

// Promise-based fetch
export function getToolkit() {
    return fetch(TOOLKIT_URL).then(res => res.json());
}

// Async/Await fetch
export async function getBackpack() {
    const res = await fetch(BACKPACK_URL);
    return res.json();
}