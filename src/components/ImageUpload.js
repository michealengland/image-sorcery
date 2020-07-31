import React, { useState, useEffect } from 'react';
import { imageEdit } from '../utilities/jimp/ImageManipulation';
import { brightness } from 'jimp';
import RangeSlider from './RangeSlider';

const ImageUploadForm = () => {
	const [media, setMedia] = useState();                       // initial upload.
	const [editingImage, setEditingImage] = useState();         // during edit.
	const [manipulatedImage, setManipulatedImage] = useState(); // new image.
	const [editSettings, setEditSettings] = useState({
		brightness: 0,
	});

	// Set state during image resize.
	const resizeCallback = (image, blob) => {
		setEditingImage(blob);      // Image created using blobs.
		setManipulatedImage(image); // Image created with File API.
	}

	const editImageCallback = (image, blob) => {
		setEditingImage(blob);  // Image created using blobs.
	}

	// Set media upload.
	const onMediaUpload = (e) => {
		setMedia(e.target.files[0]);                    // Set fullsize image.
		// resizeImage(e.target.files[0], resizeCallback, editSettings); // Run image through Jimp.
		imageEdit(e.target.files[0], editImageCallback, editSettings);
	}

	// Clear media selection.
	const onMediaReset = () => {
		setMedia();
		setEditingImage();
		setManipulatedImage();
	}

	// Submit form.
	const onSubmit = (e) => {
		e.preventDefault();
		console.log('form submitted');
	}

	// Brightness value beteen -1 and +1.
	const onBrightnessSelect = (rangeValue) => {
		const updateObject = {
			...editSettings,
			brightness: rangeValue/100,
		}

		setEditSettings( updateObject );
	}

	useEffect(() => {
		console.log('edit settings changed');
		if ( editSettings !== {} && media ) {
			imageEdit(media, resizeCallback, editSettings);
		}
	}, [editSettings]);

	return (
		<form>
			<div>
				<label htmlFor="image-staging">Select an Image</label>
				<input
					accept="image/png, image/jpeg"
					id="image-staging"
					name="image-staging"
					onChange={ onMediaUpload }
					type="file"
				/>
				{/* { media &&
					<div>
						<button onClick={ onMediaReset }>Reset</button>
						<img
							alt={ media.name }
							src={ URL.createObjectURL(media) }
						/>
					</div>
				} */}
				{ editingImage &&
					<>
						<div>
							<p>Editing Image</p>
							<img
								style={{
									maxHeight: '50vh',
								}}
								alt={ editingImage.name }
								src={ URL.createObjectURL(editingImage) }
							/>
						</div>
						<RangeSlider
							label="Brightness"
							name="brightness"
							min={ -100 }
							max={ 100 }
							callback={ onBrightnessSelect }
						/>
					</>
				}
				{/* { manipulatedImage &&
					<div>
						<p>New Image</p>
						<img
							alt={ manipulatedImage.name }
							src={ URL.createObjectURL(manipulatedImage) }
						/>
					</div>
				} */}
			</div>
			<button onClick={ onSubmit }>Edit Image</button>
		</form>
	)
}

export default ImageUploadForm;