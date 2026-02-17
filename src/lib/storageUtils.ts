import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Uploads an image file to Firebase Storage and returns the download URL.
 * @param file The file object to upload
 * @param path The storage path (e.g., 'products')
 * @returns The download URL of the uploaded image
 */
export async function uploadImage(file: File, path: string = 'products'): Promise<string> {
    try {
        // Create a unique filename using timestamp
        const timestamp = Date.now();
        const filename = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const storageRef = ref(storage, `${path}/${filename}`);

        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}
