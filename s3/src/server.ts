import {
    ListObjectsCommand,
    PutObjectCommand,
    PutObjectCommandInput,
    S3Client,
    S3ClientConfig
} from '@aws-sdk/client-s3';
import * as fs from "fs";


const config: S3ClientConfig = {
    credentials: {
        accessKeyId: 'AKIAUK7AAXGOCSDEL2VT',
        secretAccessKey: '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',
    },
    region: 'ap-northeast-1',
}

const client = new S3Client(config);

async function uploadFile(filePath: string, bucketName: string): Promise<void | never> {
    fs.readFile(filePath, (err: Error | null, data: Buffer) => {
        if (err) {
            throw err;
        }

        const params: PutObjectCommandInput =  {
            Bucket: bucketName,
            Key: 'image1.jpg',
            Body: data
        }

        client.send(new PutObjectCommand(params))
          .then(data => console.log(data))
          .catch(err => console.log(err))
    })
}

async function downloadFile(bucketName: string) {
    const data = await client.send(new ListObjectsCommand({
        Delimiter: '/', Bucket: bucketName
    }));

    data.Contents?.forEach(i => {
        console.log(`https://s3.${config.region}.amazonaws.com/${bucketName}/${i.Key}`)
    })
}

uploadFile('./src/image1.jpg', 'malevichtestbacket')


.then(() => {
    downloadFile('malevichtestbacket')
})