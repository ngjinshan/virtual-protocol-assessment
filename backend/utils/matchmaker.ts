export const calculateInterestSimilarity = (currentUserInterests: string, recommendedUserInterests: string) => {
    // Convert interests to sets
    const interests1 = new Set(currentUserInterests.split(",").map((interest) => interest.trim()));
    const interests2 = new Set(recommendedUserInterests.split(",").map((interest) => interest.trim()));

    // Calculate intersection (shared interests)
    const sharedInterests = new Set([...interests1].filter((interest) => interests2.has(interest)));

    // Calculate similarity score using Jaccard similarity coefficient
    const intersectionSize = sharedInterests.size;
    const unionSize = interests1.size + interests2.size - intersectionSize;
    const similarityScore = unionSize === 0 ? 0 : intersectionSize / unionSize;

    return similarityScore;
};
