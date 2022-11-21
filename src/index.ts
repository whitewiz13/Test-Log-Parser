import App from './app';
let newApp = new App();

newApp.getApp().listen(newApp.getPort(), () => {
    return console.log(`Express is listening at http://localhost:${newApp.getPort()}`);
});