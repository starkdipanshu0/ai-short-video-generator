import { useEffect, useState } from "react";

const usePreloadImages = (imageList: string[]) => {
    const [cachedImages, setCachedImages] = useState<{ [key: string]: HTMLImageElement }>({});
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const preloadImages = async () => {
            const cache: { [key: string]: HTMLImageElement } = {};

            try {
                await Promise.all(
                    imageList.map((src) =>
                        new Promise<void>((resolve, reject) => {
                            const img = new Image();
                            img.src = src;

                            img.onload = async () => {
                                try {
                                    if ('decode' in img) {
                                        await img.decode(); // Decode before usage
                                    }

                                    // Draw on an offscreen canvas to ensure it's fully rendered
                                    const canvas = document.createElement("canvas");
                                    const ctx = canvas.getContext("2d");

                                    if (ctx) {
                                        canvas.width = img.width;
                                        canvas.height = img.height;
                                        ctx.drawImage(img, 0, 0);
                                    }

                                    cache[src] = img; // Store in cache
                                    resolve();
                                } catch (err) {
                                    console.error(`Decoding failed for image: ${src}`, err);
                                    reject(err);
                                }
                            };

                            img.onerror = () => reject(`Error loading image: ${src}`);
                        })
                    )
                );

                setCachedImages(cache);
                setImagesLoaded(true);
            } catch (error) {
                console.error(error);
            }
        };

        preloadImages();
    }, [imageList]);

    return { cachedImages, imagesLoaded };
};

export default usePreloadImages;