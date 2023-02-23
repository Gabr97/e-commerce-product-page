import { useRef } from "react"

export default function Carousel(props: any) {

    const closeGallery = () => {
        props.galleryRef.current.classList.add('hidden')
        props.productRef?.current?.classList?.remove('blur-lg')
    }

    const handleControl = (control: String) => {
        if (control == 'prev') {
            if (props.carouselCount <= 0) {
                props.setCaroulselCount(props.images.length - 1)
            } else {
                props.setCaroulselCount(props.carouselCount - 1)
            }
        }
        else if (control == 'next') {
            if (props.carouselCount >= (props.images.length - 1)) {
                props.setCaroulselCount(0)
            } else {
                props.setCaroulselCount(props.carouselCount + 1)
            }
        }
    }

    return (
        <>
            <div ref={props.galleryRef} type-view = {props.view} className='hidden'>
                <div className="md:fixed md:top-1/2 md:left-1/2 md:-translate-x-2/4 md:-translate-y-2/4  z-10 md:h-full">
                    <div className="md:container md:mx-auto h-full ">
                        <div className="flex md:w-[800px] items-center h-full justify-center relative">
                            <div className="absolute top-1/2 w-full h-full">
                                <div className="w-full flex h-full justify-between">
                                    <button onClick={() => handleControl('prev')} className="rounded-full md:-ml-32 bg-zinc-300 h-[40px] w-[40px] flex items-center justify-center text-gray-100 text-xl font-semibold">
                                    <img src="./icon-previous.svg"/>
                                    </button>
                                    <button onClick={() => handleControl('next')} className="rounded-full md:-mr-32 bg-zinc-300 h-[40px] w-[40px] flex items-center justify-center text-gray-100 text-xl font-semibold">
                                        <img src="./icon-next.svg"/>
                                    </button>
                                </div>
                            </div>
                            <div className="md:px-10 pb-5">
                                <img ref={props.carouselMainImg} src={`http://127.0.0.1:1337${props.mainImage}`} className='w-full object-contain rounded shadow-lg' />
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={() => closeGallery()} className="md:fixed md:top-0 md:w-screen md:h-screen z-0">
                </div>
            </div>
        </>
    )
}