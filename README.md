## WanderLens-Image Gallery
A visually stunning image gallery web app that lets users explore, search, and download high-quality images.

## Features

Dynamic Image Gallery: Fetch and display images using the Unsplash API.

Search Functionality: Search for specific images by keywords.

Lightbox Viewer: View images in an enlarged format with photographer details.

Image Download: Download images directly with a single click.

Load More Images: Load additional images seamlessly with pagination.

## Project Structure

HTML: Base structure for the app with placeholders for dynamic content.
CSS: Styles the app for an elegant and responsive design.
JavaScript: Fetches data from the API, handles events, and manages UI interactions.
Tech Stack
HTML5, CSS3
Vanilla JavaScript
Unsplash API

## Setup Instructions
Clone the repository:
```bash
git clone https://github.com/SabreenaFatimah-git/WanderLens-image-gallery.git
````
## Navigate to the project folder:
cd WanderLens-image-gallery

## Open the project in your browser:

Use Live Server in VS Code or open index.html directly.

## How It Works??

Load Images:
By default, the app fetches "curated" images from Unsplash.

Search Images:
Enter a keyword and press Enter to search.

View in Lightbox:
Click on an image to open it in the lightbox with details.

Download Image:
Click the download icon on the lightbox or below an image card to download the image.

Load More:
Click the "Load More" button to fetch additional images dynamically.

## API Integration
API Used: Unsplash API
Endpoint Example:
https://api.unsplash.com/search/photos?query={query}&per_page={count}&page={page}&client_id={API_KEY}
### Replace {API_KEY} with your own Unsplash API key in the code.####

## Screenshots:

![WanderLens-home](https://github.com/user-attachments/assets/fe462cba-48fa-43e1-b41e-25e23412c7f0)

![WanderLens-lighbox](https://github.com/user-attachments/assets/7dde6eb0-9afd-4d3b-824b-218f98c0e5a6)

![Screenshot 2024-12-01 195007](https://github.com/user-attachments/assets/05ab2881-86f7-4756-b3ea-23c87ba9b02d)

## Future Enhancements
Add a theme switcher (dark/light mode).
Improve error handling for failed API requests.
Add animations for smoother transitions and loading effects.
 
