# CMSC424
CMSC424 Webapp 2017
final paper -> https://docs.google.com/document/d/1clHSE_bR40eoVQcRG7vf9tQvJvcpSpNZZdxtdIWqSfg/edit?usp=sharing
# Use this readme to post tasks when we have them

social element on homepage
edit your own page
view a friend page (version of edit your own page)

user can manually add in path. We will have a question mark thing you can hover over for info on how to do it
html parsing is still an option

buttons on your own dagr page
    a. add new file 
    b. add new category

# Tasks
- on startup, db cleans itself. Need to stop running migrations every time the app stats <- jake
- add in remaining models/controllers. controllers are just the requests 
- UX need to figure out our designs
    im thinking something that looks like google drive
- UI need to implement those designs, i don't think that there will be many pages. Maybe an about DAGR page?

- write html parser <- jake
- possibly add type to document table (would be like 'webpage' for webpages) <-jake
- bulk data can be put in a whole folder 
- duplicate content <- check when a new dagr is inserted

project deals with storing metadata from files

for html part -> html has meta tags where you can get data

2 tables, one for aggregates, and for information specific to each file
 one table stores groups of UIDs
 other table stores the metadata of the files themselves

There will also be support for categories, so one category can be a DAGR made up of many DAGRs?

He wants a specific format for tasks. Moving old task info to a new google doc
https://docs.google.com/document/d/1XnftvHBu_8bX9Y126O7hY7Og3dtOK6gV3jk2JF_IH8o/edit?usp=sharing

#Stack
    -NodeJS
    -Express
    -MySQL
    -Jade
    -Knex/Bookshelf