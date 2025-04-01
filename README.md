# 📊 Compact Carbon Footprint Calculator 🍃

[![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=%23323330)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)

**Quickly estimate your environmental impact with this interactive, single-page web application.**

> This tool provides a simplified estimate of your weekly carbon footprint based on key lifestyle factors like driving, energy use, diet, and flights. Its primary goal is to foster awareness and provide actionable insights in a clean, user-friendly interface.

---

## ✨ Core Features

*   **👣 Instant Footprint Estimation:** Calculates your approximate weekly CO2e emissions.
*   **📊 Interactive Breakdown:** Visualizes contributions from **Driving**, **Energy**, **Diet**, and **Flights** using a dynamic doughnut chart (via Chart.js).
*   **📉 Insightful Comparisons:**
    *   See how your footprint stacks up against the **US average**.
    *   Compare against a general **sustainability target**.
    *   Track changes from your **previous calculation** (uses local storage).
*   **🌳 Tree Offset Equivalent:** Estimates the number of trees needed annually to absorb your calculated emissions.
*   **💡 Smart Suggestions:** Get personalized, actionable tips focused on your *highest* impact areas.
*   **📱 Responsive & Accessible:** Adapts seamlessly to **desktop, tablet, and mobile** devices.
*   **🌓 Light & Dark Modes:** Toggle themes for optimal viewing comfort. Your preference is saved!
*   **✔️ User-Friendly Validation:** Clear, non-intrusive error messages guide input.
*   **🔄 Easy Reset:** Quickly clear the form and results to start fresh.
*   **🚀 Zero Installation:** Runs directly in your browser from a **single HTML file**.

---

## 🚀 Get Started (It's Easy!)

1.  **Download:** Grab the `index.html` file from this repository.
2.  **Open:** Double-click the file to open it in your favorite modern web browser (Chrome, Firefox, Edge, Safari). **No web server or setup required!**
3.  **Input Your Data:** Fill in the fields with your typical weekly/monthly/annual figures. Default values are provided as examples.
4.  **Hit Calculate:** Click the `Calculate` button.
5.  **Explore Your Results:**
    *   The results panel slides in (desktop) or appears below (mobile).
    *   Analyze the **chart**, **numerical breakdown**, **comparisons**, and **suggestions**.
    *   Toggle the **theme** (☀️/🌙) or **reset** the form using the secondary buttons.

---

## 🔧 Behind the Scenes: Tech Stack & Design

This calculator is built with simplicity and performance in mind, using fundamental web technologies:

*   **🏗️ Structure:** Semantic HTML5.
*   **🎨 Styling:** Modern CSS3, leveraging:
    *   **Flexbox & Grid:** For robust and responsive layouts.
    *   **Media Queries:** Adapting the UI for different screen sizes.
    *   **CSS Transitions & Animations:** For smooth interactions (like results panel reveal and validation shake).
    *   **Class-Based Theming:** Easy switching between light and dark modes.
*   **⚙️ Logic:** Vanilla JavaScript (ES6+):
    *   DOM manipulation for dynamic updates.
    *   Event handling for user interactions.
    *   Input validation and error handling.
    *   Calculation logic based on defined emission factors.
*   **📊 Charting:** [Chart.js](https://www.chartjs.org/) V3+ with the [Chart.js DataLabels Plugin](https://chartjs-plugin-datalabels.netlify.app/) for clear, interactive data visualization.
*   **💎 Icons:** [Font Awesome](https://fontawesome.com/) (loaded via CDN) for a clean visual language.
*   **💾 Persistence:** Browser `localStorage` is used minimally to store:
    *   User's theme preference (light/dark).
    *   The result of the last calculation for the "previous comparison" feature.
*   **🌐 Dependencies:** Relies on CDN links for Chart.js, its plugin, and Font Awesome. An initial internet connection is needed to fetch these libraries.

---

## 🧮 Understanding the Calculations

This tool uses **simplified averages and factors** for estimation. *Actual carbon footprints are complex and can vary significantly.*

*   **Driving:** Based on `Miles/Week` and `MPG`, using `8.887 kg CO2e/gallon` of gasoline.
*   **Electricity:** Based on `kWh/Month`, using a US average factor of `0.37 kg CO2e/kWh`. (**Note:** This varies *highly* by region/country based on the grid's energy sources).
*   **Diet:** Rough estimates based on selected meat consumption level (kg CO2e/week):
    *   Vegan/Veg: `~5` | Very Low: `~15` | Low: `~30` | Moderate: `~55` | High: `~80`
*   **Flights:** Based on `Annual Flight Hours`, using a highly simplified average of `90 kg CO2e/hour`. (Doesn't account for distance, class, aircraft, radiative forcing, etc.)
*   **Tree Offset:** Assumes `1 tree` absorbs `~22 kg CO2e/year`.
*   **Comparisons:** Uses `~15,500 kg CO2e/year` (US avg.) and `~5,000 kg CO2e/year` (general target).

---

## 💡 Roadmap & Future Ideas

While functional, this calculator could be expanded:

*   🌍 Add regional electricity grid emission factors.
*   ⛽ Include options for different fuel types (diesel, electric with grid mix).
*   🚆 Add other transport modes (public transit, cycling).
*   🗑️ Incorporate factors like waste, water, and consumption patterns.
*   ⚙️ Allow customization of emission factors and comparison targets.
*   💾 Option to save/export results history.
*   🌐 Internationalization (i18n) and unit localization (e.g., km, L/100km).
*   ♿ Conduct a thorough accessibility audit (WCAG compliance).

*Contributions and suggestions are welcome!*

---

## ❗ Important Disclaimer

This calculator provides **simplified estimates for educational and awareness purposes only**. It is **not** a substitute for a rigorous, scientific life cycle assessment (LCA) or a professional carbon footprint analysis. Emission factors are approximations and many lifestyle aspects are not included. Use the results as a starting point for reflection and learning.
