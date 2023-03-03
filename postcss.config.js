module.exports = {
    plugins: [
        require('postcss-import'),
        require('@tailwindcss/nesting'),
        require('@tailwindcss/typography'),
        require('tailwindcss'),
        require('autoprefixer')
    ],
};