# Shabad Papers - Official Website

This is the official website for Shabad Papers LLP, a trusted partner in the paper trading and wholesale supply industry. This project is built with Next.js, Tailwind CSS, and Firebase.

## Features

- **Modern Design:** A clean and modern user interface built with Next.js and styled with Tailwind CSS and ShadCN UI components.
- **Responsive:** Fully responsive design that works on all devices.
- **Anonymous User Tracking:** Uses Firebase Authentication to anonymously track website visitors for analytics purposes.
- **Contact Form:** A functional contact form that captures user inquiries.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm (or yarn) installed on your machine.

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/shabad-papers-website.git
    cd shabad-papers-website
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    You'll need to create a Firebase project to get the necessary API keys.

    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - Click on "Add project" and follow the steps to create a new project.
    - Once your project is created, go to **Project Settings** (the gear icon next to "Project Overview").
    - In the **General** tab, under the "Your apps" section, click the web icon (`</>`) to create a new web app.
    - Register your app. You'll be given a `firebaseConfig` object.

    Now, create a `.env.local` file in the root of your project by copying the example file:
    ```bash
    cp .env.example .env.local
    ```

    Open `.env.local` and fill in the values from the `firebaseConfig` object you got from Firebase.

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Backend & Auth:** [Firebase](https://firebase.google.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Font Awesome](https://fontawesome.com/)

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
