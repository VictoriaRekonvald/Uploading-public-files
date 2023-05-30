const fs = require('fs');
const { google } = require('googleapis');

const GOOGLE_API_FOLDER_ID = '16yszqfAyCEn7YijrMnpCtvidXbW6mkIM';

async function uploadFile() {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: './googlekey.json',
            scopes: ['https://www.googleapis.com/auth/drive']
        });

        const driveService = google.drive({
            version: 'v3',
            auth
        });

        const photoMetaData = {
            name: 'milli.jpg',
            parents: [GOOGLE_API_FOLDER_ID]
        };
        const photoMedia = {
            mimeType: 'image/jpeg',
            body: fs.createReadStream('./MILLI.jpg')
        };
        const photoResponse = await driveService.files.create({
            resource: photoMetaData,
            media: photoMedia,
            fields: 'id'
        });
        console.log('Uploaded photo:', photoResponse.data.id);

        const audioMetaData = {
            name: 'audio.mp3',
            parents: [GOOGLE_API_FOLDER_ID]
        };
        const audioMedia = {
            mimeType: 'audio/mpeg',
            body: fs.createReadStream('./audio.mp3')
        };
        const audioResponse = await driveService.files.create({
            resource: audioMetaData,
            media: audioMedia,
            fields: 'id'
        });
        console.log('Uploaded audio:', audioResponse.data.id);

        const videoMetaData = {
            name: 'draw.mp4',
            parents: [GOOGLE_API_FOLDER_ID]
        };
        const videoMedia = {
            mimeType: 'video/mp4',
            body: fs.createReadStream('./draw.mp4')
        };
        const videoResponse = await driveService.files.create({
            resource: videoMetaData,
            media: videoMedia,
            fields: 'id'
        });
        console.log('Uploaded video:', videoResponse.data.id);
    } catch (err) {
        console.log('Upload file error', err);
    }
}

uploadFile();
