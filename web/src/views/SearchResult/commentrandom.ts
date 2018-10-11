/*
hello
hi

voice chat?// ok
kk nvm then, just text chat
mmmmm parents might be disrupted by my loudness
zzzzzz
if its shit we can voice and ill try talk soft lol
but ok
so how to do this
tldr your design spec for search results
i havent thought too much about it yet

yeah k


wait is 

btw ticking search bar in nav as done

have we 
created a pull request?
yeah
kk

but wip


so check the json/ state for the data
how do we differentiate from an empty search vs a serach with no results?
HMMM.
should we make it so that it doesn't lead them to search results if it's an empty query?
not sure? i guess? ok? 
it's not like they would type website/search
if guard around dispatch. we just dont fetch if they dont type anything? seems like the easiest fix
k will do it now stalk me
they have the search bar at the top if they ever want it

acceptance criteria:
Submit a query in the search bar and see media that have that query in their name.
Page through search results.
Click on search results to be taken to their page. => link to kevin's page.



React component will be a table... with rows that are mapped... 
TITLE,DESCRIPTION,IMAGE

image on left, title and desc on right


dispatch actions = ?
1) update global state of searchresults?
2) when user clicks on a row, update react router to go to the specific media page
3) when user clicks nextPage, it should update the results, we also have to keep track of 
what page they are on

how is pagination gonna work?
do we have arrows, or do we have numbers?
numbers is hard since we need to pre-calculate how many results there are
not only that we also need to indicate to the user what page of results they are on
so much easier if we just dumped this info in the url lol
ahhh...

custom table pagination exists... i guess we use one of those two links
or
For more advanced use cases you might be able to take advantage of:

dx-react-grid-material-ui A data grid for Material-UI with paging, sorting, filtering, grouping and editing features (custom license).
mui-datatables Responsive data tables for Material-UI with filtering, sorting, search and more.
material-table DataTable based on table component with additional features like search, filtering, sorting and much more.

or probs nah just stick to basics?
like the basic material ui one
it does get the job down
my issue is the example, it has Rows per page
Also it means we have to have calculate the number of results

hmmmm. what do...


i think state initially is empty.
we get first x results for first page. we set those x results as state
but we somehow allow user to still go to next page and click it
when they click it we do another fetch for next x...
we can hide the 1-5 of 13 part. and just have the next button
seems good, but can we hide the 1-5 of 13 part? does material-ui allow us to do that?
fuarr too advanced for me
kk, also let's not allow them to change the number of results
we also need to check if there are no more results and disable the next button 
also we need to disable the back button on the first page - true
probs not but we can override their code ;)
we can do a custom componenttttt. yeah this is getting more and more hacky tho
but i dont see another way atm
itd be an okish solution i guess...
ah true
also u know for the custom component. im gonna have to disable sean's checks cus i swear
its gonna fk me up and ask me to do all this typescript stuff lol
sadreactsonly :(

ok are we ready to yolo start coding.?
yes, pls lead the way
let me move these comments to another file just in case we want it
what is the url for this btw? is it just home/search
your choice i dunno
meh seems good enough for now
wait but then what happens if user types in the url home/search/
should be home/search/<mediaType>/<what they search>
yeah sure 
should probs be home/search/<what they searched> ? but not sure how to do it in
react router atm

i think this ones ok
https://material-ui.com/demos/tables/#custom-table-pagination-action

maybe theres a material ui component?
https://material-ui.com/api/table-pagination/
https://material-ui.com/demos/tables/ 

Edge Cases:
searching results in no results
how many results in each page

*/
