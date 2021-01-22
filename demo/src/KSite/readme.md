run this command in your react project root

npm install bootstrap jquery react-datepicker react-redux react-router-dom reactstrap redux redux-thunk sass

add KSite folder right to your src folder to work

you can start creating your app by adding a KSite wrapper yo your app.js or elsewhere

FOR proper work of other KSITE page-building elements like KNAVBAR and KPAGE they have to be a prime descendant of KSITE, for proper work of KSECTION element with proper routing, KSECTION element have to be a prime descendant of KPage element

KSECTION and KPAGE elements can both add their reference link to navbar by passing a navbar, name and route prop to them.

KGallery is an element that takes a array of images, where a single image element object in that array should look like this.
{
src:"url",
descripton:"Lorem ipsum",
tags:[]
}
By clicking on aa image in a KGallery component a modal-like fullscreen KGallerySlider component would pop up. KGallery would provide its image list, that was provided by you, enchanted with the dimensions of each image.

If you just want to use a KGallerySlider component without a KGallery component, send a shouldLoadDimensions={true} prop to it. This way would the KGallerySlider load each image dimensions by itself. Otherways the image array passed to it would be expected to also contain the "width:x" and "height:x" keys in each array element object.
In that way the image object should look like this.
{
src:"url",
descripton:"Lorem ipsum",
tags:[],
width:1280,
height:720,
}
