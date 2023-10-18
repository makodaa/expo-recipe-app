import { PLACEHOLDER } from "../assets/images"
const trendingRecipes = [
    {
        id: 1,
        name: "Spaghetti With Shrimp Sauce",
        image: PLACEHOLDER,
        duration: "30 mins",
        serving: 1,
        isBookmark: false,
        category: "Pasta",
    },
    {
        id: 2,
        name: "Malaysian Chicken Satay",
        image: PLACEHOLDER,
        duration: "50 mins",
        serving: 10,
        isBookmark: true,
        category: "Local",
    },
    {
        id: 3,
        name: "Sarawak Laksa",
        image: PLACEHOLDER,
        duration: "30 mins",
        serving: 1,
        isBookmark: true,
        category: "Local",
    },
    {
        id: 4,
        name: "Nasi Lemak",
        image: PLACEHOLDER,
        duration: "1 hour",
        serving: 10,
        isBookmark: true,
        category: "Local",
    },

]

const categories = trendingRecipes

export default {
    trendingRecipes,
    categories
}