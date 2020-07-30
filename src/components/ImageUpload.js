import React, { useState } from 'react';

const ImageUploadForm = () => {
	const [media, setMedia] = useState();

	// Set media upload.
	const onMediaUpload = (e) => {
		setMedia(e.target.files[0]);
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
			</div>
			<button onClick={ onSubmit }>Edit Image</button>
		</form>
	)
}

export default ImageUploadForm;