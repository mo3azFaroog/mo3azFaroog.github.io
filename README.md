# Muaz Faroug - Data Analyst Portfolio

Live site: **https://mo3azfaroog.github.io/**

Personal portfolio of a Data Analyst based in Riyadh, built with plain HTML, CSS and JavaScript (no build step) and hosted on GitHub Pages. The site is bilingual (English / Arabic with RTL support) and showcases data case studies built with Power BI, Power Query, DAX, SQL Server and Informatica.

## Case studies

| Project | Page | Code |
| --- | --- | --- |
| Apex Cycle Dynamics - sales & operations intelligence | [project-apex.html](project-apex.html) | [GitHub](https://github.com/mo3azFaroog/Apex-Cycle-Dynamics) |
| HR Analytics - salary dashboard | [project-hr.html](project-hr.html) | [GitHub](https://github.com/mo3azFaroog/HR-Dashboard) |
| Zenith Retail - sales & customer satisfaction | [project-zenith.html](project-zenith.html) | [GitHub](https://github.com/mo3azFaroog/retail-sales-analysis) |
| Sales Data Analysis | [project-sales.html](project-sales.html) | [GitHub](https://github.com/mo3azFaroog/sales-analysis-dashboard) |
| Olist E-Commerce Analytics - SQL Server + Informatica + star schema + Power BI | [project-olist.html](project-olist.html) | [GitHub](https://github.com/mo3azFaroog/Olist-E-Commerce-Analytics) |

## Project structure

```
index.html            Home page (hero, about, skills, projects, certifications, contact)
contact.html          Contact form (Formspree)
project-*.html        One page per case study
style.css             Global styles
project.css           Styles shared by the case-study pages
project.js            Slideshow, menu and dropdown logic shared by the case-study pages
orbit.css / orbit.js  Hero photo with floating tool icons
404.html              Page-not-found page
assets/               Photo, tool icons, social preview image
project-*/            Dashboard screenshots (WebP)
```

## Run locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Editing

- **Add a screenshot to a case study:** put the image (WebP) in the project's folder and add an entry to `window.PROJECT_SLIDES` at the bottom of the project page.
- **Add a new case study:** copy an existing `project-*.html`, add a card in the Projects section of `index.html`, add the link to the Projects dropdown on every page, and add the URL to `sitemap.xml`.
- **Change text in both languages:** edit the `translations` object in `index.html` (keys are referenced through `data-i18n`).

## Contact

[mo3az.faroog@gmail.com](mailto:mo3az.faroog@gmail.com) - [LinkedIn](https://www.linkedin.com/in/moaz-faroog) - [Kaggle](https://www.kaggle.com/muazgasim)
