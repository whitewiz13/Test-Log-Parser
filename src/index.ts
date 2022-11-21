import { app, port } from './app';

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});