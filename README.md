# **Smart Plate** 🍽️

## What is Smart Plate?
Smart Plate is a smart meal planner that helps you create personalized meal plans. It leverages powerful APIs to suggest delicious recipes and provide detailed nutritional information, making healthy eating both easy and accessible.

## **Features**
* **Personalized Meal Planning:** Create custom meal plans tailored to your unique dietary preferences and health goals. 🥗
* **Nutritional Information:** Get detailed nutritional breakdowns for every meal to help you make informed choices. 📊
* **Recipe Suggestions:** Discover a vast library of delicious and healthy recipes curated to your tastes. 👨‍🍳
* **Ingredient Tracking:** Easily keep track of the ingredients you need for your meals with a built-in shopping list. 📝

## **Tools Used**
* **React:** The front-end of the application is built using the React library, ensuring a dynamic, responsive, and intuitive user experience. ⚛️
* **Edamam API:** We utilize the Edamam API to access a comprehensive database of recipes, ingredients, and nutritional data. 🔍
* **Gemini API:** The Gemini API is integrated to provide intelligent, personalized meal suggestions and enhance the overall user interaction with the application. ✨

## **Live Preview**
You can view a live demonstration of the application at: [smartplate.appwrite.network](https://smartplate.appwrite.network). 🚀

## **Get Started**
To set up and run the project locally, follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/hunde32/SmartPlate.git
    cd SmartPlate
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up API keys:**
    Create a new file in the root directory named `.env.local` and add your API keys in the following format:
    ```
    VITE_EDAMAM_APP_ID=YOUR_EDAMAM_APP_ID
    VITE_EDAMAM_APP_KEY=YOUR_EDAMAM_APP_KEY
    VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```
    You will need to obtain your own API keys from the respective services.

4.  **Run the application:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## **License**
This project is open source and available under the [MIT License](LICENSE). 📜
