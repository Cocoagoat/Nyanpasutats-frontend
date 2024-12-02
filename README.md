**test file, WIP**

# Nyanpasutats (nps.moe)

Nyanpasutats is a website that provides personalized anime recommendations, user affinity comparisons, and seasonal statistics for anime fans. Now supports both MyAnimeList and Anilist accounts.

Note : The site is now up and available for all to use, but is still a work in progress - bugs and unexpected maintenance periods may occur. 

## Table of Contents

1. [Sections](#sections)
   
1.1 [Seasonal Stats](#seasonal-stats)
   
1.2. [Recommendations](#recommendations)

1.3. [Affinity Finder](#affinity-finder)


2.2. [Request Flow](#request-flow)

3. [Program Flow](#program-flow)
   
4. [Tech Stack](#tech-stack)

5. [Credits](#credits)

## Sections

### Seasonal Stats

This section provides automatic customizable seasonal infographics and tier lists to the user for each season they've watched at least 5 shows in.

#### Navigation

Seasons are sortable and filterable by several metrics and are searchable. For example, you could search for "Winter", sort by mean score, and filter by year to find your highest scored Winter season in a specific year range.

<img src="https://i.imgur.com/04Luj0O.png" alt="drawing" width="200"/>

#### Graph

The above comparison can also be displayed as a graph rather than a set of cards.

#### Exclude Sequels

Removes (or at least tries its best to) remove everything that isn't a new show from the statistics.

Note : This may not work perfectly for every show, as the definition of what a "new" show is can become very muddy in extremely complex franchises such as Fate. For more details on how the distinction is done, check out the backend repository.

#### Infographic Customizations

1. Edit mode - allows you to customize the layout of the card.

<img src="https://i.imgur.com/04Luj0.png" alt="drawing" width="200"/>

2. Upload image - allows you to upload a different background image for your card and change/remove the gradient color of the background.

3. Drag mode - allows you to drag the background image.

<img src="https://i.imgur.com/04Luj0.png" alt="drawing" width="200"/>

4. Best X rankings - allows you to create custom rankings for the season (Best Girl, Best Guy, Best Couple, etc) by uploading your own images.

<img src="https://i.imgur.com/04Luj0.png" alt="drawing" width="200"/>

#### Sharing

You can copy or download the infographic as an image. Direct sharing via link is currently being worked on.

<img src="https://i.imgur.com/04Luj0.png" alt="drawing" width="200"/>

#### Tier List Customizations

1. Expand/Collapse - allows you to switch between the default 10-tier format to a 20-tier format (half points) or a 5-tier format.

<img src="https://i.imgur.com/04Luj0.png" alt="drawing" width="200"/>

2. Add Image - in case a show is missing from the automatically generated tier list (whether because of a bug or because it's a leftover from a previous season), you may add it using via a custom image.

<img src="https://i.imgur.com/04Luj0.png" alt="drawing" width="200"/>

3. Change Colors - allows you to change the colors of every tier.

<img src="https://i.imgur.com/04Luj0.png" alt="drawing" width="200"/>

4. Delete Mode - allows you to delete shows or tiers you don't want.

<img src="https://i.imgur.com/04Luj0.png" alt="drawing" width="200"/>

5. Display text - displays text over the images on the tier list.

<img src="https://i.imgur.com/04Luj0.png" alt="drawing" width="200"/>

6. Reset - undoes all changes and reverts the tier list to its auto-generated state (minus added images).

<img src="https://i.imgur.com/04Luj0.png" alt="drawing"/>

#### Sharing

Similar to infographics, you can copy or download the tier list as an image. Direct sharing via link is currently being worked on.



### Recommendations

This section analyzes the user's list using a neural network which attempts to guess the user's score for every single anime that meets certain thresholds :

<img src ="https://i.imgur.com/oKqIDUC.png" alt="drawing" width="500"/>

and displays the highest scores, as well as the Anilist tags/genres the system deemed the user to have the highest affinity to.

#### Navigation

Sorting and filtering options are available, however searching for an anime directly is not, as not all guesses made by the neural network are sent to the user - only the top few hundred out of a tho


## Program Flow




## Tech Stack

- **Frontend:** React, Next.js (App Router), Tailwind CSS
- **Backend:** Python, Django, Celery
- **Data Processing:** Cython, Pandas, TensorFlow
- **Task Queue & Cache:** Redis
- **Hosting:** Self-hosted VPS with Nginx and Gunicorn
