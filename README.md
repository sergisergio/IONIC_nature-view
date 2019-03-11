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

***Testing our App***

- ionic serve is not enough to test our app: we need to test it in a device's emulator or a real device.  

**iOS (emulate)**

- we need MacOS and [Xcode](https://developer.apple.com/xcode/) !  
- Once XCode installed, we need some tools:  
``` bash
xcode-select --install
```    
- Then, for straight deployment on device without opening Xcode, just do that:  
``` bash
npm install -g ios-deploy
```  

- We need to add some lines in config.xml ( see edit-config).  

- To add iOS platform to our project, execute this:  
``` bash
ionic cordova platform add ios
```  
- Then we build the app:  
``` bash
ionic cordova build ios
```  

- This build can be opened in XCode: platforms/ios and .xcodeproj.  
- Create a certificate: XCode menu, settings and accounts, manage certificates button and "+" button.  
- Once the certification created, we can choose it in Signing part.  
- To start our app in an emulator, we just choose the device we need, then click Play.  
- We could also start the app by doing:  
``` bash
ionic cordova emulate ios
```  

**iOS (device)**

- The best way to test the app is testing on a real device. We just need to plug and in the same menu as before, we select our device. The Play button will start our app on our device.  
- Once the first start done, we can start our app on the device without XCode with:  
``` bash
ionic cordova run ios
```  

- We could also have more or less the same behaviour as "ionic serve" with this command:  
``` bash
ionic cordova run ios --livereload
```  

- The first command allows us to disconnect the device once the app is started.  
- The second one forces us to let our device plugged.  

See [Last Informations](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html).  

**Android (emulate)**  

- We need JDK ( Java Development Kit) available on [oracle.com](https://www.oracle.com/index.html).  
- Then, we need [Android Studio](https://developer.android.com/studio/index.html).  
- Launch Android Studio et in Configure Menu, choose SDK Manager.  
- In SDK Platforms, install API levels corresponding to android versions needed.  
- We also need SDK Build-Tools and the Support Repository.  
- Check the [environment variables](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#setting-environment-variables).  
- Add Andoid as platform:  
- We could also have more or less the same behaviour as "ionic serve" with this command:  
``` bash
ionic cordova platform add android
```  
- Execute the first build:  
``` bash
ionic cordova build android
```  
  
- With Android Studio, we can now open the android directory as project (ni platforms directory of our project).  
- To start an emulator, go to Tools->Android-> AVD Manager.  
- Create a new device.  
- Once this device created, we can start the app with Play button.  

**Android (emulate)**    

- Plug the device, activate USB debug and we'll see it in the window by clicking the Play button.  

