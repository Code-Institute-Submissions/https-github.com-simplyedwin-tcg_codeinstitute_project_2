![brandlogo](https://github.com/simplyedwin/tcg_codeinstitute_project_2/blob/master/images/AlightLiaoLahBrandLogo.svg?raw=true)

# Milestone Project 2 Interactive Front-End Development - AlightLiaoLah (ALL) Singapore Bus Stop and Bus Finder
<img src="images/ALL_landingpage.PNG">
Fig 1 - The landing page of AlightLiaoLah (ALL) Singapore Bus Stop and Bus Finder
<br/><br/>
<img src="images/alightliaolah.gif">
Demonstration of AlightLiaoLah (ALL) Singapore Bus Stop and Bus Finder

## Problem Statement

Travelling around in Singapore by public bus is a common transport that most of us would inevitably use in our daily communte. From transition between different type of transport to long distance travelling, public bus provides the cheapest and accessible means to reach our destination. Moreover, many of the bus stop are located near common amenties or landmarks, which makes it a prefer choice among the rest of the public transport. 

Despite its popularity, finding information about a bus service route or available bus service or bus stop location could be difficult, especially when you are at unfamiliar places. Also, interpretation of bus stop display information could also be challenging if one doesn't has good sense of orientation (see figure below).

<img src="images/busstopinfo.jpg">
Fig 2 - Bus route information at a bus stop<br/><br/>

To overcome this inadequacy, many would search online for bus route, location, or street name and this information is usually built into an app or web page which encompasses an interactive map showing the real-time location of bus and routes. To aid app developer, [Bus information api]("https://datamall.lta.gov.sg/content/datamall/en/dynamic-data.html") is also available with information on the bus service no, arrival time etc (see below figure).


<img src="images/busapiresult.png">

Fig 3 - Bus api result using postman<br/><br/>
Hence, by leveraging on technology such as a bus information api, this application was made to address this problem.
<br/>

## UX
Realization of this project depends on the availability of users and technologies. Users would be public bus commuters or individual who has lost his/her way at some unfamiliar places. This application should fulfill their following needs:

- "I want to find the nearest bus stop from my location within a walkable distance."
- "I want to find the bus stop which I need to alight."
- "I want to find a particular bus stop."
- "I want to know where is the bus now."
- "I want to know my current location."
- "I want to know when is the bus going to arrival."
- "I want to know what are the bus services available at the bus stop."
- "I want to know the name of the street or road or bus stop code."

By using front-end and back-end technologies such as bootstrap,  restful api, the user's needs can be achieved. This application would present a landing page of a singapore map with clickable buttons and text boxes for user's inputs. It would provides user on the location of the bus, bus stop and user, as well as real-time information of a bus stop and bus.  A wireframe of this application can be found here [here](https://xd.adobe.com/view/fbc25fb5-8cc7-4cdf-afc6-19bc692072b8-ae91/).

## Features

<img src="images/ALL_toandfrom.PNG">
<center>Fig 4 - Page showing bus information and location for from and to queries </center>
<br/><br/>

### Existing Feature
- <img src="images/ALL_topbar_tonfrom.png"><br/>
  ***From/To Query Boxes*** - This feature allow user to input a starting point or destination bus stop code or road name or street name.
<br/><br/>


- <img src="images/ALL_topbar_buttons.png" ><br/>
  
  ***Buttons*** - (From left to right) The "YOU ARE HERE" button allow user to retrieve current location information to the application, which will be filled into the "FROM" query box. The "i" button is a help feature that display information about this application and user instructions. The github icon button links to the git repository of this application.
  <br/><br/>

- <img src="images/ALL_map.PNG">
  <br/>

  ***Bus Stops on Map*** - This feature allow user to click the bus stop icon on the map to retrieve bus stop information and displayed onto the bus stop information card.The codes to be able to click onto each bus stop icon is partially extracted from app.js as shown below:

  ```
  map.on("click", "fullbuststopcode", function (e) {//codes 
  ....}
  ```
  <br/>
- <img src="images/toandfromcards.png" height=300>
  <br/>

  ***Bus Information Cards*** - This feature displays information of a bus stop. 
  <br/><br/>

- <img src="images/ALL_mapmarkers.PNG" height=80>
  <br/>

  ***Map Markers*** - (From left to right) "YOU ARE HERE" shows the current location of the on the map. The animated Green "S" and red "D" markers show the locations of the address or bus stop code in the "FROM" and "TO" query boxes. The animated white down arrow marker indicates selected bus stop on the map by the user. The animated red bus shows real time location of a bus with its service number and arrival time to the queried bus stop. The codes to make each marker is partially extracted from app.js as shown below:

  ```
  function makedommarker(
    map,
    markerid,
    imgsrc,
    width,
    height,
    clickedlong,
    clickedlat,
    busno = "",
    busarr = ""
  ) {//codes 
  ....}
  ```

<br/>
  
### Feature Left to Implement
- ***Bus Path/Route between Starting Point and Destination with user location***<br/>
  This feature will shows the path between the starting point to the destination together with the user location. This can also be shown on the bus card information.<br/><br/> 
- ***Alight Alert***<br/> This feature will reminds the user when to alight from the bus.
  <br/><br/>
- ***Bus Service Number Recommendation***<br/>
  This feature will guide the user which bus service number to board in order to reach the destination.
<br/><br/>
## Technologies Used

- [HTML/CSS](https://html.com/)<br/>
The project uses HTML/CSS for base template and styling of the landing page.
- [Javascript](javascript.com)<br/>
The project uses Javascript as the primary programming language.
- [Bootstrap](getbootstrap.com)<br/>
The project uses Bootstrap for the responsive for different screens size.
- [SVG Animation](css-tricks.com/guide-svg-animations-smil/)<br/>
The project uses SVG animation for the animation of markers.
- [Inkscape](https://inkscape.org/)<br/>
The project uses inkscape for creating svg files.
- [MapboxGL JS](docs.mapbox.com/mapbox-gl-js/api/)<br/>
The project uses MapboxGL.js for manipulation of map using javascript.
- [Mapbox Studio](docs.mapbox.com/studio-manual/guides/)<br/>
The project uses Mapbox Studio for manipulation of map to include bus stop location and icons.
- [JQuery UI](jqueryui.com)<br/>
The project uses JQuery UI for the autocomplete function when user type into the query boxes.
- [JQuery](https://jquery.com/)<br/>
The project uses JQuery to ease the manipulation of DOM. 
- [Jupyter Notebook](jupyter.org)<br/>
The project uses Jupyter Notebook for the creation of the bus stop location geodata to be used in the mapbox studio. 
- [Heroku](https://www.heroku.com/)<br/>
The project uses Heroku to host the cors anywhere instance to address the [CORS setting issue](developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors) when pulling from the bus stop information api. 
<br/><br/>

## Testing

| <h3>**Features Testing**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case 1: Landing page appeared as per Fig 1 when page is loaded or refreshed**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Expected:** The landing page shall appear as per Fig 1.<br/>**Test:** Refresh the page.<br/>**Result:** The  Landing page appeared as per Fig 1 when page is loaded or refreshed.<br/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Test Case 2: Floating label moved to top left corner of the query boxes after clicking the query boxes**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Expected:** The floating label "Type a read name/street name/bus stoop code" shall move higher when clicked onto the query boxes.<br/>**Test:** Click onto the query boxes.<br/>**Result:** The floating label "Type a read name/street name/bus stoop code" moved to the top left corner of the query boxes when clicked onto the query boxes.<br/>                                                                                                                                                                                                                                                                                                                                                                                         |
| **Test Case 3: Autocomplete menu appeared for user queries of more than 4 characters**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Expected:** The autocomplete menu shall appear if more than 4 characters are typed into the query boxes.<br/>**Test:** Type in more than 4 characters in the query boxes.<br/>**Result:** The autocomplete menu appeared when more than 4 characters are typed into the query boxes.<br/>                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Test Case 4: Autocomplete menu does not appeared for user queries of less than 4 characters**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Expected:** The autocomplete menu shall not appear if less than 4 characters are typed into the query boxes.<br/>**Test:** Type in less than 4 characters in the query boxes.<br/>**Result:** The autocomplete menu does not appeared when less than 4 characters are typed into the query boxes.<br/>                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Test Case 5: Autocomplete menu appeared for user queries of bus stop codes numbers**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Expected:** The autocomplete menu shall appear if bus stop code number of more than 4 characters are typed into the query boxes.<br/>**Test:** Type in more than 4 characters of bus stop code number in the query boxes.<br/>**Result:** The autocomplete menu appeared for bus stop code number of more than 4 characters typed into the query boxes.<br/>                                                                                                                                                                                                                                                                                                                                          |
| **Test Case 6: Warning popout appeared for user queries of invalid contents in the query boxes after clicking onto the search button.**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Expected:** A warning popout shall appear if invalid contents of more than 4 characters are typed into the query boxes after clicking onto the search button.<br/>**Test:** Click the search button after typing in more than 4 characters of invalid content.<br/>**Result:** Warning popout appeared for user queries of invalid contents in the query boxes after clicking onto the search button.<br/>                                                                                                                                                                                                                                                                                                |
| **Test Case 7: Autocomplete menu does not appeared for user queries of invalid content of more than 4 characters**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Expected:** The autocomplete menu shall not appear if more than 4 characters of invalid contents are typed into the query boxes.<br/>**Test:** Type in more than 4 characters of invalid contents in the query boxes.<br/>**Result:** The autocomplete menu does not appeared when more than 4 characters of invalid contents are typed into the query boxes.<br/>                                                                                                                                                                                                                                                                                                                                        |
| **Test Case 8: Starting point marker and destination marker appeared on the map based on the locations of the bus stop in the "FROM" and "TO" query boxes and information of these 2 bus stops appeared onto the starting point bus stop and destination information cards respectively after clicking the search button.**                                                                                                                                                                                                                                                                                                                                                                                 |
| **Expected:** After clicking the search button, the starting point marker and destination marker shall appear on the map based on the locations of the bus stop in the "FROM" and "TO" query boxes and information of these 2 bus stop shall appear onto the starting point and destination bus stop information cards respectively.<br/>**Test:** Click the search button after filing in the query boxes with valid contents.<br/>**Result:** Starting point marker and destination marker appeared on the map based on the locations of the bus stop in the "FROM" and "TO" query boxes and information of these 2 bus stops appeared onto the starting point and destination bus stop information cards respectively after clicking the search button.<br/> |
| **Test Case 9: Starting point marker appeared on the map based on the location of the bus stop in the "FROM" query box and information of the bus stop appeared onto the starting point bus stop information card after clicking the search button.**                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Expected:** After clicking the search button, the starting point marker shall appear on the map based on the location of the bus stop in the "FROM" query boxes and information of the bus stop shall appear onto the starting point bus stop information card.<br/>**Test:** Click the search button after filing the "FROM" query box with valid contents.<br/>**Result:** Starting point marker appeared on the map based on the location of the bus stop in the "FROM" query box and information of the bus stop appeared onto the starting point bus stop information card after clicking the search button.<br/>                                                                                                                                         |
| **Test Case 10: Destination marker appeared on the map based on the location of the bus stop in the "TO" query box and information of the bus stop appeared onto the destination information card after clicking the search button.**                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Expected:** After clicking the search button, the destination marker shall appear on the map based on the location of the bus stop in the "TO" query box and information of the bus stop shall appear onto the destination bus stop information card.<br/>**Test:** Click the search button after filing the "TO" query box with valid contents.<br/>**Result:**  Destination marker appeared on the map based on the location of the bus stop in the "TO" query box and information of the bus stop appeared onto the destination information card after clicking the search button.<br/>                                                                                                                                                                   |
| **Test Case 11: The content in the query boxes remained the same as the selected content from the autocomplete menu after clicking the search button**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Expected:** The content in the query boxes shall remain the same as the selected content from the autocomplete menu after clicking the search button.<br/>**Test:** After selecting one of the content from the autocomplete menu, remove some of the information in the query boxes before clicking the search button.<br/>**Result:** The content in the query boxes remained the same as the selected content from the autocomplete menu after clicking the search button.<br/>                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Test Case 12: All the markers on the map and contents in query boxes are removed after clicking onto the query boxes**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Expected:** The content in the query boxes and markers shown on the map shall be removed after clicking onto the query boxes.<br/>**Test:** Click onto the query boxes filed with valid contents and markers showing on the map.<br/>**Result:** The content in the query boxes and markers shown on the map are removed after clicking onto the query boxes.<br/>                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Test Case 13: The map focused onto the selected bus stop with a white arrow marker and the bus stop information is shown onto the bus stop information card after clicking onto the bus stop icon on the map**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Expected:** The map shall focus onto the selected bus stop with a white arrow marker and the bus stop information shall be shown onto the bus stop information card after clicking onto the bus stop icon on the map.<br/>**Test:** Click onto any of the bus stop icons on the map. <br/>**Result:** The map focused onto the selected bus stop with a white arrow marker and the bus stop information is shown onto the bus stop information card after clicking onto the bus stop icon on the map.<br/>                                                                                                                                                                                               |
| **Test Case 14: The white marker arrow moved to the selected bus stop on the map and the information on the bus stop information card changed as accordingly after clicking onto different bus stop icons on the map**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Expected:** The white marker arrow shall move to the selected bus stop on the map and the information on the bus stop information card shall change as accordingly after clicking onto different bus stop icons on the map.<br/>**Test:** Click onto any bus stop icons on the map.<br/>**Result:** The white marker arrow moved to the selected bus stop on the map and the information on the bus stop information card changed as accordingly after clicking onto different bus stop icons on the map.<br/>                                                                                                                                                                                            |
| **Test Case 15: The map focused onto the bus stop after clicking onto the bus stop code number on the bus stop information card.**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Expected:** The map shall focus onto the bus stop after clicking onto the bus stop code no on the bus stop information card.<br/>**Test:** Click onto the bus stop code no on the bus stop information card.<br/>**Result:** The map focused onto the bus stop after clicking onto the bus stop code number on the bus stop information card.<br/>                                                                                                                                                                                                                                                                                                                                                        |
| **Test Case 16: The map focused onto the bus location after clicking onto the bus service no on the bus stop information card.**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Expected:** The map shall focus onto the bus location after clicking onto the bus service no on the bus stop information card.<br/>**Test:** Click onto the bus service no on the bus stop information card.<br/>**Result:** The map focused onto the bus location after clicking onto the bus service no on the bus stop information card.<br/>                                                                                                                                                                                                                                                                                                                                                         |
| **Test Case 17: Bus location and timing changed after clicking onto the same bus service no at different time interval on the bus stop information card.**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Expected:**  Bus location and timing shall change after clicking onto the same bus service no at different time interval on the bus stop information card.<br/>**Test:** Click onto the same bus service no at different time interval on the bus stop information card.<br/>**Result:**  Bus location and timing changed after clicking onto the same bus service no at different time interval on the bus stop information card.<br/>                                                                                                                                                                                                                                                                   |
| **Test Case 18: Only one bus location appeared on the map after clicking onto different bus service no on the bus stop information card.**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Expected:**  Only one bus location shall appear on the map after clicking onto different bus service no on the bus stop information card.<br/>**Test:** Click onto any bus service no on the bus stop information card.<br/>**Result:**  Only one bus location appeared on the map after clicking onto different bus service no on the bus stop information card.<br/>                                                                                                                                                                                                                                                                                                                                    |
| **Test Case 19: The map focused onto the user current location with a "YOU ARE HERE" marker and a green arrow marker appeared onto one of the bus stop that is within 120m from the user location and the "FROM" query box and the bus stop information card are filled with the bus stop information after clicking onto the "YOU ARE HERE" button.**                                                                                                                                                                                                                                                                                                                                                                                         |
| **Expected:**  The map shall focus onto the current user location with a "YOU ARE HERE" marker and a green arrow marker shall appear on one of the bus stop that is within 120m of the user location and the "FROM" query box and the bus stop information card shall be filled with the bus stop information after clicking onto the "YOU ARE HERE" button.<br/>**Test:** Click onto the "YOU ARE HERE" button.<br/>**Result:**  The map focused onto the current user location with a "YOU ARE HERE" marker and a green arrow marker appeared on one of the bus stop that is within 120m from the user location and the "FROM" query box and the bus stop information card are filled with the bus stop information after clicking onto the "YOU ARE HERE" button.<br/>       |
| **Test Case 20: The information modal appeared above the landing page after clicking onto the information "i" button.**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Expected:** The information modal shall appear above the landing page after clicking onto the information "i" button.<br/>**Test:** Click onto the "i" button.<br/>**Result:**  The information modal appeared above the landing page after clicking onto the information "i" button.<br/>                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Test Case 21: The github repository for this application opened in a new browser tab after clicking onto the github button.**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Expected:** The github repository for this application shall be opened in a new browser tab after clicking onto the github button.<br/>**Test:** Click onto the github button.<br/>**Result:**  The github repository for this application opened in a new browser tab after clicking onto the github button.<br/>                                                                                                                                                                                                                                                                                                                                                                                        |
| **Test Case 22: The map responded accordingly to the selected map built in controls.**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Expected:** The map shall respond accordingly to the selected map built in controls.<br/>**Test:** Click onto the zoom in/out and orientation controls.<br/>**Result:**  The map responded accordingly to the selected map built in controls.<br/>                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Test Case 23: The map focused back onto the user current location with a "YOU ARE HERE" marker and a green arrow marker appeared onto one of the bus stop that is within 120m from the user location and the "FROM" query box and the bus stop information card are filled with the bus stop information after clicking onto the "YOU ARE HERE" button followby clicking onto the search button.**                                                                                                                                                                                                                                                                                                                                                                                         |
| **Expected:**  The map shall remain focus onto the current user location with a "YOU ARE HERE" marker and a green arrow marker shall appear on one of the bus stop that is within 120m of the user location and the "FROM" query box and the bus stop information card shall be filled with the bus stop information after clicking onto the "YOU ARE HERE" button followby clicking onto the search button.<br/>**Test:** Click onto the "YOU ARE HERE" button followby the search button.<br/>**Result:**  The map remained focused onto the current user location with a "YOU ARE HERE" marker and a green arrow marker appeared on one of the bus stop that is within 120m from the user location and the "FROM" query box and the bus stop information card are filled with the bus stop information after clicking onto the "YOU ARE HERE" button followby clicking onto the search button.<br/>    





### Responsiveness
**360 x 640**<br>
<img src="images/360by640Screen_1.JPG" height=200>
<img src="images/360by640Screen_2.JPG" height=200>
<img src="images/360by640Screen_3.JPG" height=200><br>

**375 x 812**<br>
<img src="images/375by812Screen_1.JPG" height=200>
<img src="images/375by812Screen_2.JPG" height=200>
<img src="images/375by812Screen_3.JPG" height=200><br>

**411 x 731**<br>
<img src="images/411by731Screen_1.JPG" height=200>
<img src="images/411by731Screen_2.JPG" height=200>
<img src="images/411by731Screen_3.JPG" height=200><br>

**768 x 1024**<br>
<img src="images/768by1024Screen_1.JPG" height=200>
<img src="images/768by1024Screen_2.JPG" height=200>
<img src="images/768by1024Screen_3.JPG" height=200><br>

### Bugs/Problems Encountered
There are a numbers of bugs or problems encountered during the development of the project. Much of these issues are mainly due to the restful api and are explained as follow:

- ***Cross-Origin Resource Sharing (CORS) Error***  
<img src="images/CorsIssue_CorsPolicyBlocked.JPG" height=70><br>
During the request of api response from the bus stop information api, an CORs error was encountered. This caused the application unable to receive any information. This was temporary resolved by running the application on a browser with lower security setting. 
However, this solution was not feasible as the application will be hosted using github.<br>
Hence, an open source nodejs proxy, called [Cors Anywhere](https://github.com/Rob--W/cors-anywhere) , was used to add CORS headers to the proxied request. This was done by prefix the URL to the bus stop information api url as follow: <br>

      "https://cors-anywhere.herokuapp.com/http://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=" +
      apicalls,
      
    While the solution worked with no cors error, due to the high number of api call requests during the initial loading of the page and other users of the same proxy, another error occured:<br>
  <img src="images/CorsIssue_TooManyRequest.JPG" height=300><br>
An eventual solution was soughted by hosting an instance of the cors anywhere proxy with whitelist limitation to only requesting from the bus stop information api. This proxy instance was hosted using heroku with the following new url:

      "https://cors-anywhere-tcgversion.herokuapp.com/http://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=" +
                apicalls,           
  By hosting a cors anywhere proxy instance which only accepts the bus stop information api, this will prevent others from using it as an open proxy. Hence, all the efforts on the api calls can be focused only to this application.  
  <br>

- ***Missing Latitude and Longitude Information From API Server*** <br>
  During the testing on markers, these markers, at some time, were found to be positioned into the sea on the map. It was then found out that the cause was due to the missing information from the api server. An eventual solution was implemented in the backend codes to check for missing api information and remove the markers if not available.  
    

## Deployment

The website is hosted using github page and can be accessed via [here]( https://simplyedwin.github.io/tcg_codeinstitute_project_2/).


## Credits

### Media
 Bus stop display board photo was obtained from [LandTransportGuru](https://www.google.com/search?q=bus%20routing%20information%20at%20bus%20stop&tbm=isch&tbs=rimg:CT679JLzyUtsYdwbmfa5wM9v&rlz=1C1CHBF_enSG748SG748&hl=en&sa=X&ved=0CBsQuIIBahcKEwio7vmusq3uAhUAAAAAHQAAAAAQLw&biw=1519&bih=674#imgrc=d53gD2hDpEValM)



### Acknowledgements

Geodatasource on the sample code for the calculation of distance between 2 coordiates [distance](https://www.geodatasource.com/developers/javascript)

Trent colleage staff and classmates for feedbacks on website design

Design of logo are sourced from [Freepik](https://www.flaticon.com/authors/freepik)

Reference script for [toast](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_snackbar)

Bootstrap 4 floating label css from [floatinglabel](https://www.cssscript.com/pure-css-floating-label-pattern-bootstrap/)

Readme template from [Code Institute](https://github.com/Code-Institute-Solutions/readme-template)

For hosting the cors anywhere instance [Cors Anywhere](https://github.com/Rob--W/cors-anywhere)
