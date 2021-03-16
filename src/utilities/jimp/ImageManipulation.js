import Jimp from 'jimp';

/**
 * Generate a new resized and compressed image file.
 *
 * @param {Object} File of image to resize.
 * @param {Function} callback to execute.
 * @returns {Object} editSettings with value enhancements.
 */
const resizeImage = (imageFile, callback) => {
	Jimp.read( URL.createObjectURL(imageFile) )
	.then( image => (
		image
			.scaleToFit(600, 600)
			.quality(90)
			.getBuffer(Jimp.AUTO, (err, buffer) => {
				// Conver buffer into blob for image editing.
				callback( new Blob( [buffer], {type: imageFile.type} ) );
			})
	))
	.catch( err => {
		console.error(err);
	} );
}

/**
 * Apply enhancements to an image.
 *
 * @param {Object} File of image to resize.
 * @param {Function} callback to execute.
 * @returns {Object} editSettings with value enhancements.
 */
const imageEdit = (imageFile, callback, editSettings) => {
	Jimp.read( URL.createObjectURL(imageFile) )
	.then( image => (
		image
			.brightness(editSettings.brightness)
			.contrast( editSettings.contrast )
			.color([
				{ apply: 'saturate', params: [editSettings.saturate] },
				{ apply: 'desaturate', params: [editSettings.desaturate] },
			])
			.getBuffer(Jimp.AUTO, (err, buffer) => {
				// Conver buffer into blob for image editing.
				callback( new Blob( [buffer], {type: imageFile.type} ) );
			})
	))
	.catch( err => {
		console.error(err);
	} );
}

export { resizeImage, imageEdit }