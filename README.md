### App - Geolocation, Camera and File

See [https://openclassrooms.com/fr/courses/5098931-developpez-une-application-mobile-multiplateforme-avec-ionic-3/5139546-profitez-des-native-features-preparez-lapplication](https://openclassrooms.com/fr/courses/5098931-developpez-une-application-mobile-multiplateforme-avec-ionic-3/5139546-profitez-des-native-features-preparez-lapplication)  

- Thanks to Cordova, we can use user's device native features such as camera and geolocation.  
- Ionic Native has more than 130 native plugins (See [https://ionicframework.com/docs/native/](https://ionicframework.com/docs/native/)).  

``` bash
ionic start nature-view blank
```
***First step***  

- Then we generate 3 pages (single-view, new-view and set-coordinates) and we add them in our AppModule.  
- We create a model for our data: each NatureView has name, date, description, coordinates and a path to its picture.  
- We create a service to handle data containing a list which will be emitted as a Subject.(We add the service in AppModule).  
- HomePage shows this list: so subscribe to this Subject et emit it.  
- Then we create NewViewPage by using a reactive form for name, date and description. 

***Geolocation***  

``` bash
npm install --save @agm/core
```
- Then get a [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key).  
- And we add AgmCoreModule in our AppModule.  
- SetCoordinatesPage wil be shown in a modal by using ModalController (imported and injected in NewViewPage).  
- Then we add a button "Add a site".  
- Now we create SetCoordinatesPage: latitude and longitude, marker object.  
- And we create the template (in oder to show the map, we need a CSS height for "agm-map").  
- Now, we need to get the event from the (mapClick) in onMapClicked method.  
- We pass coordinates when we close the modal and we save them only if there's a marker on map.  
- In NewViewPage, look at onOpenCoordsModal(), we use the onDidDismiss() method to get the modal close and data.  
- Then, to check saved data, we add an item in the template.  
- We need to save coords when we go back to the map (see onOpenCoordsModal).  
- Now, we need native geolocation from user's device.  

``` bash
ionic cordova plugin add cordova-plugin-geolocation
npm install --save @ionic-native/geolocation
```  

- We add Geolocation in our AppModule.  
- Then we inject Geolocation, LoadingController, ToastController in SetCoordinates.  
- And we add the geolocation button in the template.  

***Camera***

``` bash
ionic cordova plugin add cordova-plugin-camera
npm install--save @ionic-native/camera
```  

- We add Camera in our AppModule.  
- Then we add the button to take pictures.  
- We inject Camera and ToastController in NewViewPage and we create onTakePhoto() method.  
- We need to import normalizeURL from ionic-angular.
- onTakePhoto() opens our device's camera. We have to add the camera button.  

*Notice*

*We cannot use the camera in our browser: we'll see that later*

- Now, user can add a location and a picture for NatureView. He needs to save it.  
- We create a onSubmitForm() method by injecting NatureViewService and NavController; wee also need to import NatureView.  
- Location and image are required so we add them in the template in form's conditions.  
- Then we create onLoadNatureView() method.  
- Finally, we create SingleViewPage to whow a natureView.  

***File and Storage***

- For now, pics are stored in a temp directory. This directory could be deleted from the device when memory is full.  
- The File plugin is better to save our files.  

``` bash
ionic cordova plugin add cordova-plugin-file
npm install --save @ionic-native/file
```  

- We import File from @ionic-native/file in our AppModule and we add it in providers array.  
- Then we import it in NewViewPage and its constructor.  
- We modify onTakePhoto's callback to move the temp directory to a permanent directory.  
- moveFile() method takes 4 arguments: path, original filename, target, target filename.  

- For now, data are in a permanent directory but if we refresh our app, all data will be lost because they are only stored in a service.  
- First solution: backend.
- Second solution ( we choose this option): store informations locally on the device.
- To do that, wee need the cordova-sqlite-storage plugin:  

``` bash
ionic cordova plugin add cordova-sqlite-storage
```  
- (We import it in our AppModule and use its forRoot() method in imports array.).  
- Then we inject Storage in NatureViewService: so this service must become "Injectable".  
- And we create 2 methods: saveList() and fetchList(). 
- We also add this.saveList() in addNatureView().  
- So, storage data are updated for each new NatureView.  
- Finally, to fetch correctly storage data, we modify the ngOnInit() method in HomePage.  




