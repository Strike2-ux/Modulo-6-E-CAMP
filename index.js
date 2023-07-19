import app from "./app.js"


const main = () => {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log("Servidor escuchando en puerto: " + PORT);
    });
}

main()