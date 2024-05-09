import React from "react";
import { Recommendation } from "../../interface/userProfile";

interface SwipeCardProps {
    recommendation: Recommendation;
    onSwipe: (direction: "left" | "right") => void;
}

export const SwipeCard = (props: SwipeCardProps) => {
    return (
        <div
            className="w-64 h-96 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center p-4"
            style={{ touchAction: "none" }} // Prevent scrolling during drag
        >
            <h2 className="text-xl font-bold">Name: {props.recommendation.recommended_user_name}</h2>
            <p>Location: {props.recommendation.recommended_user_location}</p>
            <p>University: {props.recommendation.recommended_user_university}</p>
            <p>Interests: {props.recommendation.recommended_user_interests}</p>
            <div className="mt-4 flex space-x-4">
                <button onClick={() => props.onSwipe("left")} className="bg-red-500 text-white py-1 px-3 rounded">
                    Dislike
                </button>
                <button onClick={() => props.onSwipe("right")} className="bg-green-500 text-white py-1 px-3 rounded">
                    Like
                </button>
            </div>
        </div>
    );
};
