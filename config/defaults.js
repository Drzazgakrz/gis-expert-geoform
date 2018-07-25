define({
    //Default configuration settings for the applciation. This is where you"ll define things like a bing maps key,
    //default web map, default app color theme and more. These values can be overwritten by template configuration settings
    //and url parameters.
    "appid": "aaa8bbcab3124621ad8dc2122d0a593d",//"0aee2b084e334f738175231019c3f82d",
    "webmap": "f53d0e1a0f974c96ab7e4ce1fffd85fe",//"516d939901dc40fa8f116efa9b59dfbf",
    "form_layer": {
        "id": ""
    },
    "details": {
        "Title": "",
        "Logo": "",
        "Description": ""
    },
    "fields": {
    },
    "theme": "basic", // see values in themes.js
    "oauthappid": null,
    //Enter the url to the proxy if needed by the applcation. See the "Using the proxy page" help topic for details
    // //developers.arcgis.com/en/javascript/jshelp/ags_proxy.html
    "proxyurl": "http://localhost:8080/ankieta-web/proxy.jsp",
    //Example of a template specific property. If your template had several color schemes
    //you could define the default here and setup configuration settings to allow users to choose a different
    //color theme.
    //Enter the url to your organizations bing maps key if you want to use bing basemaps
    "bingmapskey": "",
    //Defaults to arcgis.com. Set this value to your portal or organization host name.
    "sharinghost": "https://www.arcgis.com",
    "units": null,
    "useSmallHeader": false,
    "enableSharing": true,
    "defaultMapExtent": true,
    "pushpinColor": "blue",
    "nextBasemap": "hybrid",
    "defaultBasemap": "topo",
    "selectedTitleField": {},
    "disableViewer": false,
    "enableAttachments": true,
    "attachmentIsRequired": false,
    "attachmentLabel": "",
    "attachmentHelpText": "",
    "showLayer": true,
    "disableLogo": false,
    "enableBasemapToggle": false,
    "enableOfflineSupport": true,
    "locate":false,
    "locationSearchOptions": {
        "enableMyLocation": true,
        "enableSearch": true,
        "enableLatLng": true,
        "enableUSNG": false,
        "enableMGRS": false,
        "enableUTM": false
    },
    "locationSearch": true,
    //When searchExtent is true the locator will prioritize results within the current map extent.
    "searchExtent": false,
    "searchLayers":[{
        "id": "",
        "fields": []
    }],
    "attachmentInfo":{
    },
    "submitButtonText": "",
    "viewSubmissionsText": "",
    "helperServices": {
        "geometry": {
            "url": null
        },
        "printTask": {
            "url": null
        },
        "elevationSync": {
            "url": null
        },
        "geocode": [{
            "url": null
        }]
    }
});