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
			.getBuffer(Jimp.AUTO, (err, buffer) => {

				// Conver buffer into blob for image editing.
				const blob = new Blob([buffer], {type: imageFile.type});

				console.log('blob', blob);

				// Convert buffer to new image file.
				const optimizedImage = new File([buffer], imageFile.name, {
					type: 'Jimp.AUTO',
				});

				callback(optimizedImage, blob);
			})
	))
	.catch( err => {
		console.error(err);
	} );
}

export default resizeImage;