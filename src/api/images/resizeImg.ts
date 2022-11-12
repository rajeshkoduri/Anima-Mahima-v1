import express from 'express';
import sharp from 'sharp';
import { promises as fsPromises } from 'fs';

const resizeImages = async (
    req: express.Request,
    res: express.Response,
    resize: Function
): Promise<void> => {
    const url = req.url;
    const filename: string = req.query.filename as string;
    const delimitedFileName = filename.split('.')[0];
    const __dirname = `./assets/thumb/`;
    const _width: number = Number(req.query.width);
    const _height: number = Number(req.query.height);
    const thumbFile = `${delimitedFileName}_${_width}_${_height}.jpg`;
    const thumbPath: string = __dirname + thumbFile;
    const path: string = './assets/full/' + filename;
    const getImageFromFile = fsPromises.readFile(thumbPath).then(
        () => {
            res.sendFile(thumbFile, { root: __dirname });
            console.log('result');
        },
        ()=>
        fsPromises.readFile(path).then(
            (result) => getTransformedImage(result).then(
               ()=> res.sendFile(thumbFile, { root: __dirname })

            )
        )
    );

    const getTransformedImage = async (imgBuffer: Buffer) => {
        await sharp(imgBuffer)
            .resize(_width, _height)
            .jpeg({ mozjpeg: true })
            .toFile(
                `./assets/thumb/${delimitedFileName}_${_width}_${_height}.jpg`
            );
        /* console.log(
            await sharp(imgBuffer)
                .resize(_width, _height)
                .jpeg({ mozjpeg: true })
                .toBuffer()
        ); */
    };

    //res.sendFile(__dirname + thumbPath);
};

export default resizeImages;
