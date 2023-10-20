import openBrowser  from 'open-browser-webpack-plugin'

export default function (config) {
    config.plugin('open-browser').use(openBrowser, [
        {
        url: 'http://localhost:8000',
        },
    ])
}