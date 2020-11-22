![GitHub](https://img.shields.io/github/license/BucketDev/decoders?style=flat-square)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/BucketDev/decoders?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/BucketDev/decoders?style=flat-square)


# decoders
This is a game for mobiles where you need to solve riddles, every level is harder thant the last one
#Build steps
## Capacitor
* npm install to create the node_modules dependencies
* ionic build (optional --prod --release) to build the www folder with the project files
* npx cap add android (ios) to create the android (ios) folder with the project files
* (optional) npx cap sync to sync the files to android (ios) folder
* change capacitor.config.json
```
"linuxAndroidStudioPath": "/home/UNOSQUARE/rodrigo.loyola/Documents/android-studio/bin/studio.sh"
```
to the correct adnroid stuido path, or remove it to open the default android studio version
* npx cap open android
## Android settings
* `Build.gradle (app)` under dependencies add
```
implementation 'com.google.android.gms:play-services-ads:19.5.0'
```
* `strings.xml`
```
<string name="admob_app_id">ADMOB-ID</string>
```
* `AndroidManifest.xml` add the metadata tag inside application taga and before activity tag
```
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="@string/admob_app_id"/>
```
* `MainActivity.java` add the AdMob definition to the init call
```
add(AdMob.class);
```
* Then you can run your app on a device or on a virtual device... good luck!

