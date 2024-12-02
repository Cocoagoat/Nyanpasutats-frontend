**Test file**

# Nyanpasutats (nps.moe)

Nyanpasutats is a website that provides personalized anime recommendations, user affinity comparisons, and seasonal statistics for anime fans. Now supports both MyAnimeList and Anilist accounts.

Note : The site is now up and available for all to use, but is still a work in progress - bugs and unexpected maintenance periods may occur. 

## Table of Contents

1. [Sections](#sections)
   
1.1 [Seasonal Stats](#seasonal-stats)
   
1.2. [Recommendations](#recommendations)

1.3. [Affinity Finder](#affinity-finder)


2.1. [Data Gathering](#data-gathering)

2.1.1. [AnimeDB](#anime-db)

2.1.2. [UserDB](#user-db)

2.1.3. [Tags](#tags)

2.1.4. [Graphs/Relations](#graphs)

2.1.5. [AffinityDB](#affinity-db)

2.1.6. [Model](#model)

2.2. [Request Flow](#request-flow)

3. [Program Flow](#program-flow)
   
4. [Tech Stack](#tech-stack)

## Sections

### Seasonal Stats

This section provides automatic customizable seasonal infographics and tier lists to the user. Example 1 Example 2


### Recommendations

This section analyzes the user's list using the neural network [Model](#model), which attempts to guess the user's score for every single anime that meets certain thresholds (popularity, score, duration - for full list see meets_conditions function in AnimeDB), and displays the highest scores, as well as the Anilist tags/genres the system deemed the user to have the highest affinity to.


## Program Flow

### AnimeDB

This is a .parquet database which holds the following information on every single ranked anime entry on MyAnimeList at the time of gathering :
    - ID (as it appears on the relevant URL on MyAnimeList, for example https://myanimelist.net/anime/34822/Tsuki_ga_Kirei)
    - Mean Score 
    - Scores (how many users scored the show)
    - Members (how many users have the show in their list)
    - Episodes (episode count)
    - Duration (of each episode)
    - Type (TV/Movie/OVA/ONA/Special)
    - Year of airing
    - Season (Winter/Spring/Summer/Fall)

There are two copies of this database - AnimeDB.parquet, which is only gathered once at the start of every data gathering cycle (every time ALL databases and the recommendations model are refreshed, roughly once per season), and AnimeDB-U.parquet, which is updated automatically daily. The former is used for parts of the app where data isn't updated daily (such as the Affinity Finder, as it works directly in tandem with UserDB which is only updated once per season)


## Tech Stack

- **Frontend:** React, Next.js (App Router), Tailwind CSS
- **Backend:** Python, Django, Celery
- **Data Processing:** Cython, Pandas, TensorFlow
- **Task Queue & Cache:** Redis
- **Hosting:** Self-hosted VPS with Nginx and Gunicorn
