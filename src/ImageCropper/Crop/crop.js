const createImage = url => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => { resolve(image) };
    image.onerror = error => reject(error);
    image.crossOrigin = "Anonymous";
    image.src = url;
});


export default async function crop(imageSrc, pixelCrop) {
    const image = await createImage(imageSrc);
    const copyCanvas = document.createElement('canvas');
    const copyCtx = copyCanvas.getContext('2d');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const maxSize = Math.max(image.width, image.height);
    const safe = 2 * ((maxSize / 2) * Math.sqrt(2));

    copyCanvas.width = safe;
    copyCanvas.height = safe;

    copyCtx.drawImage(
        image,
        safe / 2 - image.width * 0.5,
        safe / 2 - image.height * 0.5
    )

    const data = copyCtx.getImageData(0, 0, safe, safe);

    copyCanvas.width = pixelCrop.width;
    copyCanvas.height = pixelCrop.height

    copyCtx.putImageData(data,
        0 - safe / 2 + image.width * 0.5 - pixelCrop.x,
        0 - safe / 2 + image.height * 0.5 - pixelCrop.y);
        
    canvas.width = 1080;
    canvas.height = 1080;

    ctx.drawImage(copyCanvas, 0, 0, copyCanvas.width, copyCanvas.height, 0,0, canvas.width, canvas.height)

   return  canvas.toDataURL('image/jpeg', 0.5);
    // canvas.toBlob(file => {
    //     resolve(URL.createObjectURL(file))
    //   }, 'image/jpeg') 
}