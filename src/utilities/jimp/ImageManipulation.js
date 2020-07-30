import Jimp from 'jimp';

/**
 * Generate a new resized and compressed image file.
 *
 * @param {Object} File of image to resize.
 * @param {Function} callback to execute.
 * @returns {Object} editSettings with value enhancements.
 */
const resizeImage = (imageFile, callback, editSettings) => {
	Jimp.read( URL.createObjectURL(imageFile) )
	.then( image => (
		image
			.brightness(editSettings.brightness)
			.getBuffer(Jimp.AUTO, (err, buffer) => {
				// Conver buffer into blob for image editing.
				const blob = new Blob([buffer], {type: imageFile.type});
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