const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const fileSave = path.join(__dirname, '..', 'data', 'playersData.json');
const fileLogin = path.join(__dirname, '..', 'data', 'playersLogin.json');

module.exports = {
    readPlayers: () => {
        const data = fs.readFileSync(fileSave, 'utf-8');
        const dataJson = JSON.parse(data);

        return dataJson;
    },
    createPlayer: (playerObject) => {
        let info;
        fs.readFile(fileSave, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            }
            info = playerObject;
            info.id = uuidv4();
            const dataJson = JSON.parse(data);
            dataJson.push(info);

            fs.writeFile(fileSave, JSON.stringify(dataJson, null, '\t'), (error) => {
                if (error) {
                    console.log(error);
                }
            });
        });
    },
    saveLogin: (playerObject) => {
        let login = {};
        fs.readFile(fileLogin, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            }
            login.UserName = playerObject.UserName;
            login.UserPassword = playerObject.UserPassword;

            const dataJson1 = JSON.parse(data);
            dataJson1.push(login);

            fs.writeFile(fileLogin, JSON.stringify(dataJson1, null, '\t'), (error) => {
                if (error) {
                    console.log(error);
                }
            });
        });
    },
    getPlayerByID: (id) => {
        const data = fs.readFileSync(fileSave, 'utf-8');
        const dataJson = JSON.parse(data);
        let playerObject;

        dataJson.forEach((obj) => {
            if (obj.id === id) {
                playerObject = obj;
            }
        });
        return playerObject;
    },
    savePlayer: (dataPlayer, id) => {
        const data = fs.readFileSync(fileSave, 'utf-8');
        const dataJson = JSON.parse(data);

        dataJson.forEach((obj, index) => {
            if (obj.id === id) {
                const { UserName, UserPassword } = dataJson[index];
                dataJson.splice(
                    index,
                    1,
                    {
                        UserName, UserPassword, ...dataPlayer, id
                    }
                );
            }
        });
        fs.writeFile(fileSave, JSON.stringify(dataJson, null, '\t'), (err) => {
            if (err) {
                console.log(err);
            }
        });
    },
};
