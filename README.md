# Nyanpasutats (nps.moe)

Nyanpasutats is a website that provides customizable auto-generated infographics, personalized anime recommendations and user affinity comparisons for MyAnimeList and Anilist users.

Note : The site is now up and available for all to use, but is still a work in progress - bugs and unexpected maintenance periods may occur. 

## Table of Contents

1. [Sections](#sections)
   
1.1.  [Seasonal Stats](#seasonal-stats)
   
1.2. [Recommendations](#recommendations)

1.3. [Affinity Finder](#affinity-finder)

2. [Program Flow](#program-flow)
3. [Simplified Flowchart](#simplified-flowchart)
4. [Tech Stack](#tech-stack)

   
----
## Sections

### Seasonal Stats

This section provides automatic customizable seasonal infographics and tier lists to the user for each season they've watched at least 5 shows in.

#### Navigation

Seasons are sortable, filterable by several metrics, and searchable.

For example, you could search for "Winter", sort by mean score, and filter by year to find your highest scored Winter season in a specific year range.

![Filter Demo](https://i.imgur.com/ZuNait7.gif)

#### Graph

The above comparison can also be displayed as a graph.

![Graph Demo](https://i.imgur.com/SgVJ8Wq.gif)

#### Exclude Sequels

Removes everything that isn't a new show (sequels, OVAs, etc) from the statistics.

**Technical Note** : To do this, the site utilizes Python's graph libraries (igraph, networkx) and a custom algorithm to create clusters of shows and find the "main" show within each cluster. So for example, the My Hero Academia cluster will be very straightforward since it has several seasons, movies and OVAs, and the first season will of course be the "main" show.

However, this may not work perfectly for every show, as the definition of a "main" show becomes very muddy in extremely complex and non-linear franchises such as Fate.

#### Infographic Customizations

1. Edit mode - allows you to customize the layout of the card.

![Edit Mode Demo](https://i.imgur.com/D8XySzL.gif)

2. Upload image - allows you to upload a different background image for your card and change/remove the gradient color of the background.
3. Drag mode - allows you to drag the background image.

![Upload Image Demo](https://i.imgur.com/kVLcrOw.gif)

4. Best X rankings - allows you to create custom rankings for the season (Best Girl, Best Guy, Best Couple, etc) by uploading your own images.

![Best X Rankings](https://i.imgur.com/3EN1S7g.gif)

#### Sharing

You can copy or download the infographic as an image. Direct sharing via link is currently being worked on.

![Copy and Download Demo](https://i.imgur.com/LCijdXg.gif)

#### Tier List Customizations

1. Expand/Collapse - allows you to switch between the default 10-tier format to a 20-tier format (half points) or a 5-tier format.

![Tier List Expand/Collapse Demo](https://i.imgur.com/8APEnhS.gif)

2. Add Image - in case a show is missing from the automatically generated tier list (whether because of a bug or because it's a leftover from a previous season), you may add the show by adding a custom image (simplest way is to use the image the show has on MAL/Anilist).

![Tier List Add Image Demo](https://i.imgur.com/tYaAxRm.gif)

3. Change Colors - allows you to change the colors of every tier.

![Tier List Colors Demo](https://i.imgur.com/lqJpeiq.gif)

4. Delete Mode - allows you to delete shows or tiers you don't want.

![Tier List Delete Mode Demo](https://i.imgur.com/rvn8MYB.gif)

5. Display text - displays text over the images on the tier list.

<img src="https://i.imgur.com/sTyFGpi.png" alt="Display Text Demo" width="500"/>

6. Reset - undoes all changes and reverts the tier list to its auto-generated state (but does not delete manually added images).

#### Sharing

Similar to infographics, you can copy or download the tier list as an image. Direct sharing via link is currently being worked on.

----------

### Recommendations

This section analyzes the user's list using a neural network, which is trained to guess the user's score for every single anime that meets certain thresholds :

<img src ="https://i.imgur.com/oKqIDUC.png" alt="drawing" width="500"/>

and displays the shows with the highest scores, as well as the Anilist tags/genres the system deemed the user to have the highest affinity to. 

**Note** : Score predictions are also performed on shows you have already seen (with data being adjusted to remove the influence of said show on the prediction of its own score). This along with the tags allows you to judge how well the model learned your tastes.

<img src ="https://i.imgur.com/YgOlsQg.png" alt="drawing" width="700" title="Recommendations"/>

**Note 2** : Only the user's existing scores are used for the predictions. The site does not gather any private information that the user may have publicized on their profile, such as gender/age/country etc, and does not use it for predictions or any other purpose.

#### Navigation

Filtering options are available, however searching for an anime directly is not, as currently, to reduce the volume of data being transferred, not all guesses made by the neural network are sent to the user - only the top few hundred predictions are. So for example, if Steins;Gate is not predicted to be in your top 400, you will not see it even if you try filtering by year and MAL score to single it out.

Sorting by score difference is also available. As the model is naturally biased towards shows with higher MAL scores, this is the preferred type of sorting for getting recommendations of shows you might have never heard of before, as the displayed shows will be those that the model thinks you are the most likely to score higher than the average person.

<img src ="https://i.imgur.com/MDadz2q.png" alt="drawing" width="500" title="Sorted by score difference"/>

#### Limitations

If you take a closer look at the above image, you'll notice that one of the predictions is heavily off the mark, missing the real score the user gave to the show "Toradora!" by a whole 5 out of 10 points. (The current margin of error of the model is slightly below 0.8 points for the average guess).

This stems from the inherent limitations of the model - what this model is capable of learning about a user is merely their preferences for certain tags and scoring patterns (since the only information it gets about a user is their anime scores). As long as the show lines up with your general taste, said show will get a high score from the model.

In this case, the user clearly enjoys slice of life and romance stories (as seen by the recommendations given in both of the above images), but likely had a specific reason to dislike that particular show that's too "deep" for the model to capture - perhaps they strongly disliked the ending, or a specific character, or maybe the reason is something even deeper that relates to their real life, and the model isn't capable of accounting for any of those.

Though while this is a clear showcase of the model's limits, it's also a showcase of its ability to capture this user's tastes, and a proof of the fact that the user's given score for a show is not known to the model when it performs the guess.

----------

### Affinity Finder

This section finds the users with the highest and lowest affinity to your MAL account (only available for MAL, as Anilist does not have the concept of affinity). Similar to what affinity.animesos.net did before shutting down.

<img src ="https://i.imgur.com/5XpgBTM.png" alt="drawing" width="500"/>

#### Limitations

As the site does not have direct access to MAL's databases, the information displayed by this section may be outdated - the user list data that it uses is currently a mix of publicly available Kaggle data and the score data gathered for the recommendation system. 

While the amount of users compared to is fairly large, for the above reasons it also does not encompass the entirety of MAL's user base.

---

## Program Flow

1. The user sends a request by either clicking on "Get List" on the homepage or visiting one of the three sections ("Get List" required beforehand). "Get List" will fetch and cache their MAL/Anilist list object, as well as generate their seasonal stats (to avoid having to make the user wait twice before they can access any section).
2. The request goes through Cloudflare's WAF, reaching the Nginx server behind which the frontend and backend are running.
3. The Nginx server redirects it to the Gunicorn socket, where the Django backend is running.
4. Celery workers, split into three queues (one for each section), await requests on the backend. Once a request gets there, it is redirected to the appropriate queue based on the request's URL, and the relevant worker picks it up and begins/queues a task to generate the relevant data.
5. Once the data generation is complete, the data is sent back to the frontend and cached inside a Redis cache for several hours for quick subsequent retrieval. The user's list is also cached to ensure we only need one call to the MAL/Anilist APIs per user.

#### Simplified Flowchart

<img src ="https://i.imgur.com/tXJOOY9.png" alt="drawing" width="500" title="Recommendations"/>


## Tech Stack

- **Frontend:** React, Next.js (App Router), TypeScript, Tailwind CSS, Nginx
- **Backend:** Python, Django, Celery, Gunicorn, Redis, SQLite
- **Data Processing:** Pandas + Polars, TensorFlow, Cython
