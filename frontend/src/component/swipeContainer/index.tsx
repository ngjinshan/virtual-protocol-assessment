import { useEffect, useState } from "react";
import { Recommendation } from "../../interface/userProfile";
import { SwipeCard } from "../swipeCard";
import { useQuery, useQueryClient } from "react-query";
import { queryKey } from "../../constant";
import { getRecommendations, swipeRecommendation } from "../../api";

export const SwipeContainer = () => {
    const queryClient = useQueryClient();
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const { data } = useQuery<Recommendation[]>([queryKey.recommendation], getRecommendations);

    const handleSwipe = async (direction: "left" | "right") => {
        await swipeRecommendation({
            recommendationId: recommendations[0].recommended_id,
            swipeAction: direction == "left" ? "dislike" : "like",
        }).then(() => {
            queryClient.invalidateQueries([queryKey.recommendation]);
        });
    };

    useEffect(() => {
        if (data) {
            setRecommendations(data);
        }
    }, [data]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            {recommendations.length ? <SwipeCard recommendation={recommendations[0]} onSwipe={handleSwipe} /> : <p>No more profiles to show</p>}
        </div>
    );
};
