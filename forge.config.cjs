module.exports = {
    packagerConfig: {
        icon: './assets/icon',
        ignore: ['^/tests$', '^/docs$', '^/src/renderer$']
    },
    makers: [
        {
            name: '@electron-forge/maker-zip'
        }
    ]
};