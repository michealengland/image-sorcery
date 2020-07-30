import React, { useState } from 'react';
import resizeImage from '../utilities/jimp/ImageManipulation';

const ImageUploadForm = () => {
	const [media, setMedia] = useState();
	const [manipulatedImage, setManipulatedImage] = useState();

	// Set state during image resize.
	const resizeCallback = (image) => {
		setManipulatedImage(image);
	}

	// Set media upload.
	const onMediaUpload = (e) => {
		// Set fullsize image.
		setMedia(e.target.files[0]);

		// Resize
		resizeImage(e.target.files[0], resizeCallback);
	}

	// Clear media selection.
	const onMediaReset = () => {
		setMedia();
	}

	// Submit form.
	const onSubmit = (e) => {
		e.preventDefault();
		console.log('form submitted');
	}

	return (
		<form>
			<div>
				<label name="image-staging">Select an Image</label>
				<input
					accept="image/png, image/jpeg"
					id="image-staging"
					name="image-staging"
					onChange={ onMediaUpload }
					type="file"
				/>
				{ media &&
					<div>
						<button onClick={ onMediaReset }>Reset</button>
						<img
							alt={ media.name }
							src={ URL.createObjectURL(media) }
						/>
					</div>
				}
				{ manipulatedImage &&
					<div>
						<p>New Image</p>
						<img
							alt={ manipulatedImage.name }
							src={ URL.createObjectURL(manipulatedImage) }
						/>
					</div>
				}
			</div>
			<button onClick={ onSubmit }>Edit Image</button>
		</form>
	)
}

export default ImageUploadForm;