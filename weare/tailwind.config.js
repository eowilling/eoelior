/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        {
            pattern: /^animate-(confetti|drop-in|bounce-slow|shimmer|tilt)$/,
        },
        'animate-confetti',
        'animate-drop-in',
        'animate-bounce-slow',
        'animate-shimmer',
        'animate-tilt',
    ],
    theme: {
        extend: {
            keyframes: {
                confetti: {
                    '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
                    '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' }
                },
                tilt: {
                    '0%, 50%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(0.5deg)' },
                    '75%': { transform: 'rotate(-0.5deg)' }
                },
                'bounce-slow': {
                    '0%, 100%': { transform: 'translateY(-5%)' },
                    '50%': { transform: 'translateY(5%)' }
                },
                shimmer: {
                    'from': { transform: 'translateX(-100%) skewX(-12deg)' },
                    'to': { transform: 'translateX(200%) skewX(-12deg)' }
                },
                'drop-in': {
                    '0%': { transform: 'translateY(-100%)', opacity: '0' },
                    '60%': { transform: 'translateY(10%)', opacity: '1' },
                    '100%': { transform: 'translateY(0)' }
                }
            },
            animation: {
                'confetti': 'confetti ease-out forwards',
                'tilt': 'tilt 10s infinite linear',
                'bounce-slow': 'bounce-slow 2s infinite ease-in-out',
                'shimmer': 'shimmer 2.5s infinite linear',
                'drop-in': 'drop-in 0.5s ease-out forwards'
            }
        },
    },
    plugins: [],
}
