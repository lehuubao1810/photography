import Image from "next/image";
import { useRef } from "react";

function ModalImg(props) {
    // const imgRef = useRef(null);
    // const imgModalRef = useRef(null);

    // // Close modal when click outside
    const closeModal = (e) => {
        props.setStatusModal(false);
    }

    

    return (
        <div className="modalImg" 
            // ref={imgModalRef}
            onClick={()=> closeModal()}
        >
            <Image
                src={props.src}
                alt={props.alt}
                width={3840}
                height={2160}
                // ref={imgRef}
                onClick={(e)=>{
                    e.stopPropagation();
                }}
            >
            </Image>
        </div>
    );
}

export default ModalImg;