import React, { useState } from 'react';
import resizeImage from '../utilities/jimp/ImageManipulation';

const ImageUploadForm = () => {
	const [media, setMedia] = useState();                       // initial upload.
	const [editingImage, setEditingImage] = useState();         // during edit.
	const [manipulatedImage, setManipulatedImage] = useState(); // new image.

	// Set state during image resize.
	const resizeCallback = (image, blob) => {
		setEditingImage(blob);      // Image created using blobs.
		setManipulatedImage(image); // Image created with File API.
	}

	// Set media upload.
	const onMediaUpload = (e) => {
		setMedia(e.target.files[0]);                    // Set fullsize image.
		resizeImage(e.target.files[0], resizeCallback); // Run image through Jimp.
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
				{ editingImage &&
					<div>
						<p>Editing Image</p>
						<img
							alt={ editingImage.name }
							src={ URL.createObjectURL(editingImage) }
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