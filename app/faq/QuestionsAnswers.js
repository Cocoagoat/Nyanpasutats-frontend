export const AffinityAnswers = {
  "What is Affinity?": `Affinity is a way MAL uses to measure similarity between two anime lists - you can see your affinity to another user when visiting their profile.
   </br> In practice, it's simply the 

   <a href="https://www.statisticshowto.com/probability-and-statistics/correlation-coefficient-formula/" style="color: #74ceff">Pearson's Correlation Coefficient</a> between the two lists.`,

  "Is Affinity an accurate metric of how close your tastes are? ": `Well, to be honest...not really. </br>

  The correlation coefficient is much more sensitive to how similar the two lists' *rankings* of their mutual shows are, rather than how similar the scores themselves are. Here's an example to illustrate this : 
  </br>
  </br>
  List 1 : [4,5,5,9,10], List 2 : [8,9,9,10,10] ---> Affinity is 92.9%. </br> </br>
  List 1 : [3,9,8,2,4], List 2 : [10,9,8,3,2] ---> Affinity is 49.7%.
  </br>
  </br>
  
  In the first example, the users agree only on 2 of their 5 mutual shows yet have an extremely high affinity purely 
  because their ratings both would rank the five shows almost the same (5 >= 4 > 3 >= 2 > 1).</br>
  In the second they have a much lower affinity despite mostly agreeing on 4 out of 5, 
  because the users' rankings are different. User 1's ranking would be 2 > 3 > 5 > 1 > 4 while User 2's would be 1 > 2 > 3 > 4 > 5. 
  
  </br>
  </br>
  So while a person with 90% affinity to you is definitely more likely to have similar tastes to yours than a person
  with -90%, it's very far from an accurate metric.
  `,

  "How does the Affinity Finder work?": `The Affinity Finder is very simple in
  concept - it uses an existing database of recently active users who have at 
  least 50 scored shows in their lists, and calculates your affinity to each and every one of them 
   relatively quickly using Cython. `,

  "I visited a user's profile page, and the displayed affinity wasn't accurate. How come?": `The database is refreshed once every season, so the results may not be 100% accurate since
   all the users in it were active at the time they were added to it, and thus have a constantly changing list. I am not affiliated with MAL
   and do not have access to a real-time database of users.`,

  "I visited a user's profile page, and the shared amount of shows is different. How come?": `
  The "Shared" statistic you see on MAL counts all the shows both users watched, while I only count
  the shows both users scored.`,
};

export const RecommendationAnswers = {
  "How do the recommendations work?": `A script goes over your anime list, and determines how much you like shows with
  tag X for each tag (and some common combinations of tags) in Anilist's
   tag database. </br></br> This "tag affinity" is calculated as a number for each tag, combined
   with a show's actual "tag percentage" as seen on Anilist (For example, one show could have the "Band" tag with a 96% next to it, while another would have it with a 60% 
    - the significance of each tag is decided by users), and then these tag combinations, along with some other metrics on how you scored your anime, are fed to a neural network trained to guess the score you (a user with "tag affinities" X,Y,Z) would give some show with tags A,B,C.
</br> </br>
For example, if you have a high affinity to the "Band", "Cute Girls Doing Cute Things" and "Coming of Age" tags, you're very likely to see K-On! and Bocchi the Rock in your recommendations list - because those are some of these shows' main tags.
`,

  "Wait, what do you mean databases and neural networks? Are you stealing my data and training Big AI on it?": `No. The only thing
  stored in my databases are MAL usernames, and the scores of each stored user for each anime
  in MAL's database. No other information, including public information of users like gender/age if you
  have it set, is stored or used to train the network. </br> </br>  Also, the site is unable to access any lists set to private,
   so if yours is set to private, you are definitely not in the database (though you also won't be able to use this site, since I have no way to access your list). 
   `,

  "Why does the recommendations section only have shows with a 6.8+ MAL score?": `Two reasons : </br> </br>

  1) Resources. Every show we include in the recommendations list is a show
   that the model has to calculate your score for, and the more shows there are, the longer it takes. Without any
   filters it would have to predict your score for over 20 thousand shows, the vast majority of which would just
   clutter the recommendations. 
   
  </br> </br>
  2) The calculation of your affinity to a specific tag
       as mentioned above takes into account both your scores and the MAL scores for each show you've seen that has said tag.
       So for example, if you consistently score shows with a Romance tag much higher than their MAL scores, your affinity
       to the Romance tag will be high (the actual formula introduces a few more factors, but general idea is that your
          affinity to a tag measures how much you enjoy shows with that tag).

          </br> </br>
          However, if I were to include shows with low scores, this meaning would likely be diluted, because you
          giving a romance show rated a 6 on MAL a 3/10 does not necessarily mean you dislike romance shows - said show 
          was likely just very bad, and it should not lower your affinity to the Romance tag.

          </br> </br>
          The 6.8+ cutoff is arbitrary, but it's a good balance between including as many shows as possible and mostly 
          avoiding this phenomenon.
    `,

  "My recommendations aren't accurate at all. I'm even seeing things I gave a low score to as my top recommendations.": `
    </br>

     Overall the idea for how the predictions are done is very simple, and has many fault points. 
    The user's consistency in scoring over the years, how meaningful each tag is for a specific show (two different shows can have very similar tags
        but be very different in tone), and especially how much a user would like specific characters - those are all very important things 
        that my model has zero information on. 

        </br> </br>
    For example, the model successfully detects the fact that I love romance and slice of life shows,
     but it has absolutely no way of knowing I wouldn't like Toradora, and rightfully thinks I would give it a very high score 
     - all the tags line up with my tastes, it's pretty highly rated, and I liked almost every similar show I can think of. 
     The model has no way of knowing what exactly my problem with it is.
    
    `,
};
export const SeasonalAnswers = {
  "What is Affinity in this context?": `Same affinity as defined by MAL, but instead of measuring your affinity
   to a specific user, it's measured to the MAL scores for the shows in the season.

   </br></br>
   As explained in "Is Affinity an accurate metric of how close your tastes are?",
   this is basically a measure of how similar your ranking of the shows in the season is to the ranking of the MAL community.`,

  'How is the show labeled as "Unpopular Opinion" determined?': `The "Most Unpopular Opinion" will be the show with the highest
  difference between your score and the MAL score for that show, as long as the show meets some
  other conditions that make sure it's actually an unpopular opinion.
   
   </br></br>
   For example, a show rated 6.00 that you've given a 2 won't be considered unusual (because it's likely just a bad show),
   but a show rated 8+ that you've scored a 4 will definitely be unusual.`,

  "Some seasons don't appear for me. How come?": `Data is gathered only for seasons in which you watched at least 5 shows, both to avoid clutter and to keep the rankings meaningful.`,
  "Why can I only add certain shows to my Favorite Shows?": `The shows you can add to your Favorite Shows need to meet 2 conditions:
  </br> </br>
  1) The score for that show is equal to or higher than the score of your 5th highest-rated show that season. (So basically your favorites can be your top 5 + everything you've scored as high as the 5th highest show)
  </br> </br>
  2) The score for that show is equal to or higher than your mean score for that season.`,
  "Why are some shows from season X not appearing in my tier list, even though they're listed on MAL as airing in that season?": `The shows are likely 
  listed as ONAs on MAL. ONAs aren't included in the anime database used for this site due to how broad a category it is. You can still add the shows
  manually by adding their images to the tier list. You can also do the same for leftover shows from previous seasons.
  
  </br> </br>
  
  If the show isn't an ONA and has not been released less than 24 hours ago, please report the issue using one of my contact methods.`,
  "Why is show X appearing in season Y even though it aired in season Z?": `The MAL API sometimes misclassifies seasons -
  for example, Sousou no Frieren is listed as a Summer 2023 show for some reason. I fixed some of these manually,
  but there are likely still some left, so please report any you find using one of my contact methods.`,

  "Why did the Exclude Sequels button exclude show X when it's not a sequel?": `The MAL API has no inner mechanism that determines whether a show is a sequel or not.
  Since I'm not familiar with every franchise there is, I built a graph-based system that tries to separate all shows into groups as accurately as possible, but it depends
  on how the relations between shows are listed on MAL (sequel, prequel, alternative version, etc) and some
  franchises are too complex for it. </br> </br> For example, it properly separates Fate spinoffs like Prisma Illya,
  but the main series' root is considered to be Fate/Zero, so all the other main Fate entires are considered sequels to it,
   which isn't exactly ideal.`,
};

export const GeneralAnswers = {
  "Can I / Do I need to make an account here?": `No, the site doesn't require (or currently allow) you to log in or authenticate yourself in any way.
  It only needs your username to get your anime scores from MAL/Anilist.`,
  "Does that mean I can just enter other people's usernames instead and look at their stats?": `Yes, unless their list is private. 
  </br> </br>
   <p style="font-size:0.75rem">I would say something snarky about using your time to look at random people's anime lists in your free time, but I'm the guy
   who spent a year making this site, so that's not for me to judge.</p>
   `,
  "Are my stats/seasonal cards saved anywhere?": `No, currently they are only temporarily saved in a back-end cache for easier repeated access during a session. 
  Since there's no login system, there's no way to save your stats between sessions.</br></br>The only things that get saved are the images
  you upload into Best X lists and any tier list you open and edit - those will be saved into your browser's local storage to avoid losing
  your work in case you refresh the page. Clearing your cookies will delete them.`,
  "Nyanpasu?": `<a href="https://nyanpass.com"  style="color: #74ceff" target="_blank" rel="noopener noreferrer">Nyanpasu.</a>`,
};
