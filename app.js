const PexelsAPI = require('pexels-api-wrapper')
const https = require('https')
const fs = require('fs')

let pexelsClient = new PexelsAPI('INSERT YOU API KEY HERE')

let term = ['cat', 'dog', 'horse']

for (const nameClass of term) {
    if (!fs.existsSync(`./${nameClass}`)) {
        fs.mkdirSync(`./${nameClass}`);
    }

    for (let page = 1; page < 11; page++) {
        pexelsClient.search(nameClass, 40, page)
            .then((result) => {
                for (photo of result.photos) {
                    let file = fs.createWriteStream(`./${nameClass}/` + photo.id + '.jpg')

                    https.get(photo.src.small, response => response.pipe(file))
                }
            }).
            catch(ex => console.log('ERROU!!!: ', ex))

        counter++
    }
}