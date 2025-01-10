import Lottie from 'react-lottie-player'
import lottieJson from '../../../public/invenzy-loader.json'

export const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
            <div className="text-center">
                <Lottie
                    loop
                    animationData={lottieJson}
                    play
                    style={{ width: 150, height: 150 }}
                />
                <h2 className="text-2xl font-bold mt-4 text-gray-800">Loading Invenzy...</h2>
            </div>
        </div>
    )
}

