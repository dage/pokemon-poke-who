// Fetches external json and images into the public folder to allow Next.JS to build static pages. Create webp thumbnails.

const fetch = require('node-fetch');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imageFolder = path.resolve("public", "pokemon-images");

const fetchJson = async () => {
    const dataUri = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";
    const listing = await fetch(dataUri);
    return await listing.json();
}

let startTime;

const log = (str, omitTime) => {
    if (!startTime)
        startTime = Date.now();

    if (omitTime) {
        console.log(str);
        return;
    }

    const timeDelta = Date.now() - startTime;
    if (timeDelta > 1000)
        console.log(`${(timeDelta / 1000).toFixed(2)}s: ${str}`);
    else
        console.log(`${timeDelta}ms: ${str}`);
}


// Returns array of local filenames
const downloadImages = async (imageUris, destinationFolder) => {
    const download = async (uri) => {
        const filename = uri.substr(uri.lastIndexOf('/') + 1);
        const filepath = path.resolve(destinationFolder, filename)

        if (fs.existsSync(filepath)) {
            console.log(`${filename} already exists, skipping...`);
        }
        else {
            const response = await axios({
                url: uri,
                method: 'GET',
                responseType: 'stream'
            });
            response.data.pipe(fs.createWriteStream(filepath));
        }
        return filename;
    }

    let filenames = [];
    for (let i = 0; i < imageUris.length; i++) {
        const filename = await download(imageUris[i]);
        filenames.push(filename);
        log(`downloaded ${i + 1} of ${imageUris.length}`);
    }
    return filenames;
}

const replaceImageUris = (json, filenames) => {    
    json.pokemon.forEach((pokemon, index) => {
        pokemon.img = filenames[index].replace('.png', '');
    });
}

const saveJson = (json) => {
    fs.writeFileSync('./public/pokemon-listing.json', JSON.stringify(json));
}

const convertToWebp = (filenames) => {
    filenames.forEach((filename) => {
        const filepath = path.resolve(imageFolder, filename);
        const webpFilepath = path.resolve(imageFolder, filename.replace('.png', '.webp'));
        sharp(filepath)
            .webp({ lossless: true })
            .toFile(webpFilepath);
    });
}


const createThumbnails = (filenames) => {
    filenames.forEach((filename) => {
        const filepath = path.resolve(imageFolder, filename);
        const webpFilepath = path.resolve(imageFolder, filename.replace('.png', '-thumbnail.webp'));

        if (fs.existsSync(webpFilepath)) {
            console.log(`Thumbnail for ${filename} already exists, skipping...`);
            return;
        }

        sharp(filepath)
            .webp({ quality: 50 })
            .toFile(webpFilepath);
    });
}


const populate = async () => {
    log("starting...", true);

    const json = await fetchJson();
    const imageUris = json.pokemon.map(pokemon => pokemon.img);
    const filenames = await downloadImages(imageUris, imageFolder);
    replaceImageUris(json, filenames);
    convertToWebp(filenames);
    createThumbnails(filenames);
    saveJson(json);

    log("done");
};

populate();
