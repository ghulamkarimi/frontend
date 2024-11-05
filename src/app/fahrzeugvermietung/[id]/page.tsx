"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ImageGallery from "react-image-gallery";
import Lightbox from "yet-another-react-lightbox";
import "react-image-gallery/styles/css/image-gallery.css";
import "yet-another-react-lightbox/styles.css";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../../../feature/store/store";
import { getRentCarById } from "../../../../feature/reducers/carRentSlice";

type ImageItem = {
    original: string;
    thumbnail: string;
};

const Page = () => {
  const {id:carRentId} = useParams()
    const getOneCar = useSelector((state: RootState) => getRentCarById(state, carRentId! as string));

    console.log("carRentId",carRentId)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState<ImageItem[]>([]);

    useEffect(() => {
        console.log("getOneCar:", getOneCar); 
    
     
        if (getOneCar?.carImage) {
          
            setImages(
                Array(4).fill(getOneCar.carImage).map((img) => ({
                    original: img,
                    thumbnail: img,
                }))
            );
        }
      
    }, [getOneCar , dispatch ,carRentId]);

    const handleImageClick = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true); 
    };

  
    if (!getOneCar || images.length === 0) {
        return <div>Keine Bilder verfügbar</div>;
    }

    return (
        <div>
            <div className="w-1/2">
                <ImageGallery
                    items={images}
                    showNav={false} 
                    showFullscreenButton={false} 
                    showPlayButton={false}
                    onClick={(event) => {
                        const clickedIndex = images.findIndex(image => image.original === (event.target as HTMLImageElement).src);
                        handleImageClick(clickedIndex);
                    }}
                />

             
                {isOpen && (
                    <Lightbox
                        slides={images.map((image) => ({ src: image.original }))}
                        open={isOpen}
                        index={currentIndex}
                        close={() => setIsOpen(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default Page;
