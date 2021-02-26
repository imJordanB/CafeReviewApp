# CafeReviewApp
Mobile App Development Assignment - Jordan Burns 17105794

Repo: https://github.com/imJordanB/CafeReviewApp

This project has:
- All 17 endpoints
- Extension task: Add profanity filter
- Extension task: Add location searching - Click 'Nearby cafes' in the sidebar to find cafes nearest to you
- French support across all pages excluding Alerts
- Javascript Standard Styleguide for a consistent coding style (https://standardjs.com/)
- Pre-commit hook for Javascript Standard Styleguide to ensure all work pushed to GitHub meet coding standards

- Accessibility features include: 
    - aria-labels to help aid those with visual impairments understand what details are needed and why
    - aria-role = button on TouchableOpacity components to help Assistive Technologies interpret functionality on the page
    - Colour palette that meets WCAG 2.1 AA colour contrast ratio (See /src/styles) as a single reference. This means changing colours in the app only has to be done in one place
    - Conditional rendering, no use of "hidden", this means accessibility tools will only ever read out what is being shown on the screen
    - Inputs that require an email address will use keyboardType='email address' so that the relevant symbols and characters are on screen, making it easier for users to access the relevant keys