import app from "./app"
import config from "./config/config"

const main = ()=>{
    app.listen(config.port, ()=>{
        console.log(`This app is listening from port number : ${config.port}`);
    })
}

main();