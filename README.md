# Tinker Documentation

This repository contains documentation for the Tinker project.

## Documentation

The documentation is built using [MkDocs](https://www.mkdocs.org/) with the [Material theme](https://squidfunk.github.io/mkdocs-material/).

### Viewing Documentation Locally

To view the documentation locally:

1. Install MkDocs and the Material theme:
   ```bash
   pip install mkdocs-material
   ```

2. Serve the documentation:
   ```bash
   mkdocs serve
   ```

3. Open your browser and navigate to http://localhost:8000

### Documentation Structure

The documentation is organized as follows:

- `docs/index.md`: Home page
- `docs/1_event_storming.md`: Event Storming documentation
- `docs/2_user_journeys.md`: User Journeys documentation
- `docs/3_touch_points_screens.md`: Touch Points & Screens documentation
- `docs/4_screen_mockups.md`: Screen Mockups documentation
- `docs/5_screen_variations.md`: Screen Variations documentation
- `docs/6_summary.md`: Summary documentation

### Automated Deployment

The documentation is automatically built and deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment is handled by a GitHub Actions workflow defined in `.github/workflows/docs.yml`.

You can also manually trigger the deployment by going to the Actions tab in the GitHub repository and running the "Build and Deploy Documentation" workflow.

