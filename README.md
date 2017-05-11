# CMSC424 Final Project
CMSC424 Webapp 2017
Jake Bacher 
Ben Bellis
final paper -> https://docs.google.com/document/d/1clHSE_bR40eoVQcRG7vf9tQvJvcpSpNZZdxtdIWqSfg/edit?usp=sharing

https://docs.google.com/document/d/1XnftvHBu_8bX9Y126O7hY7Og3dtOK6gV3jk2JF_IH8o/edit?usp=sharing

# Technologies Used
- MySQL
- NodeJS
- ExpressJS
- Jade
- Bootstrap

# User Manual
- Navigate to ... and sign in with facebook
- You are now at your dashboard, where you can see your Top level DAGRs displayed as a table
  * 'View DAGR' allows you to see more information about a document-based DAGR, or view the contents of a category DAGR
  * 'Delete DAGR' allows you to delete the DAGR from the system. The user will have the option to recursively delete nested DAGRs, or just delete the selected one
- The Dashboard also presents you with a list of options at the top of the page
  * 'Add new DAGR here' allows you to insert a DAGR
  * 'Reach Query at this level' allows you to view all accessible DAGRs from the current level
  * 'Orphan Report' presents you with a list of all DAGRs that have no parent
  * 'Sterile Report' presents you with a list of all DAGRs that have no children
  * 'Search you DAGRs' allows you to search for DAGRs based on their name, or the time they were created
  * 'Bulk add DAGRs' allows you download an executable agent that will upload metadata about many files into you MMDA
  
