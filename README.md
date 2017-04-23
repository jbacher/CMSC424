# CMSC424
CMSC424 Webapp 2017
final paper -> https://docs.google.com/document/d/1clHSE_bR40eoVQcRG7vf9tQvJvcpSpNZZdxtdIWqSfg/edit?usp=sharing
# Use this readme to post tasks when we have them

# Tasks
- on startup, db cleans itself. Need to stop running migrations every time the app stats
- add in remaining models/controllers. controllers are just the requests 
- UX need to figure out our designs
    im thinking something that looks like google drive
- UI need to implement those designs, i don't think that there will be many pages. Maybe an about DAGR page?
- possibly a social elemen? can see everyone else's DAGRs
- consider making public/private DAGRS to give it a social aspect
- write html parser <-done i think, unless we want to handle image urls
- possibly add type to document table (would be like 'webpage' for webpages)
- with current setup cannot grab user path, it should

project deals with storing metadata from files

for html part -> html has meta tags where you can get data

2 tables, one for aggregates, and for information specific to each file
 one table stores groups of UIDs
 other table stores the metadata of the files themselves

There will also be support for categories, so one category can be a DAGR made up of many DAGRs?

He wants a specific format for tasks. Moving old task info to a new google doc
https://docs.google.com/document/d/1XnftvHBu_8bX9Y126O7hY7Og3dtOK6gV3jk2JF_IH8o/edit?usp=sharing
