import Jimp from 'jimp';

/**
 * Generate a new resized and compressed image file.
 *
 * @param {Object} File of image to resize.
 * @returns {Object} Newly resized file.
 */
const resizeImage = (imageFile, callback) => {
	Jimp.read( URL.createObjectURL(imageFile) )
	.then( image => (
		image
			.scaleToFit(800, 800)
			.quality(80)
			.getBuffer(Jimp.AUTO, (err, buffer) => {
				// Convert buffer to new image file.
				const optimizedImage = new File([buffer], imageFile.name, {
					type: 'Jimp.AUTO',
				});

				callback(optimizedImage);
			})
	))
	.catch( err => {
		console.error(err);
	} );
}

export default resizeImage;