const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// const playersData = require('../data/playersData');

const fileSave = path.join(__dirname, '..', 'data', 'playersData.json');


module.exports = {
    readPlayers: () => {
        const data = fs.readFileSync(fileSave, "utf-8");
        const dataJson = JSON.parse(data);
        
        return dataJson
    },
    createPlayer: (playerObject) => {
        let info;
        fs.readFile(fileSave, "utf-8", (err, data) => {
            if(err){
                console.log(err);
            }
            info = playerObject;
            info.id = uuidv4();
            dataJson = JSON.parse(data);
            dataJson.push(info);
        
            fs.writeFile(fileSave, JSON.stringify(dataJson, null, "\t"), (err) => {
                if(err){ console.log(err); }
            });
        });
    },
    getPlayerByID: (idPlayer) => {
        const data = fs.readFileSync(fileSave, "utf-8");
        const dataJson = JSON.parse(data);
        let playerObject;

        dataJson.forEach(obj => {
            if (obj.id == idPlayer) {
                playerObject = obj;
            }
        });
        return playerObject
    },
    savePlayer: (dataPlayer, idPlayer) => {
        const data = fs.readFileSync(fileSave, "utf-8");
        const dataJson = JSON.parse(data);

        dataJson.forEach((obj, index) => {
            if (obj.id == idPlayer) {
                const {UserName, UserPassword, id} =  dataJson[index];
                dataJson.splice(index, 1, { UserName, UserPassword, ...dataPlayer, idPlayer});
            }
        });
        fs.writeFile(fileSave, JSON.stringify(dataJson, null, "\t"), (err) => {
            if(err){ console.log(err); }
        });
    }
}