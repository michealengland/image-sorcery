import React, { useState, useEffect } from 'react';
import { resizeImage, imageEdit } from '../utilities/jimp/ImageManipulation';
import RangeSlider from './RangeSlider';

const ImageUploadForm = () => {
	const [media, setMedia] = useState();               // initial upload.
	const [editingImage, setEditingImage] = useState(); // during edit.
	const [previewImage, setPreviewImage] = useState(); // new image.

	// Values
	const [editSettings, setEditSettings] = useState({
		brightness: 0,
		contrast: 0,
	});

	// Setup images for manipulation.
	const resizeCallback = (blob) => {
		setPreviewImage(blob); // Optimize image for editing.
		setEditingImage(blob); // Use optimized image during editing.
	}

	// Run image through Jimp after upload.
	const onMediaUpload = (e) => {
		setMedia(e.target.files[0]);                    // Store media upload.
		resizeImage(e.target.files[0], resizeCallback); // Get compressed media upload.
	}

	// Update editor preview with current image changes.
	const editImageCallback = (blob) => {
		setEditingImage(blob);  // New Image Change.
	}

	// Clear media selection.
	const onMediaReset = () => {
		setMedia();
		setEditingImage();
		setPreviewImage();
	}

	// Submit form.
	const onSubmit = (e) => {
		e.preventDefault();
		console.log('form submitted');
	}

	// Brightness value between -1 and +1.
	const onBrightnessSelect = (rangeValue) => {
		setEditSettings( {
			...editSettings,
			brightness: rangeValue/100,
		} );
	}

	// Contrast value between -1 and +1.
	const onContrastSelect = (rangeValue) => {
		setEditSettings( {
			...editSettings,
			contrast: rangeValue/100,
		} );
	}

	useEffect(() => {
		// Generate new Image from previewImage.
		if ( previewImage && editSettings !== {} ) {
			imageEdit(previewImage, editImageCallback, editSettings);
		}
	}, [previewImage, editSettings]);

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
				{ editingImage &&
					<>
						<div>
							<button onClick={ onMediaReset }>Reset</button>
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
							label={`Brightness ${Math.floor( editSettings.brightness*100)}%`}
							name="brightness"
							min={ -100 }
							max={ 100 }
							callback={ onBrightnessSelect }
						/>
						<RangeSlider
							label={`Contrast ${Math.floor( editSettings.contrast*100)}%`}
							name="contrast"
							min={ -100 }
							max={ 100 }
							callback={ onContrastSelect }
						/>
					</>
				}
			</div>
			{ media && <button onClick={ onSubmit }>Edit Image</button> }
		</form>
	)
}

export default ImageUploadForm;