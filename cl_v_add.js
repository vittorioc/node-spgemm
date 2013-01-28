// Copyright (c) 2013 Vittorio Cecchetto 
// for CVD Lab (http://dia.uniroma3.it/~cvdlab)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy 
// of this software and associated documentation files (the 'Software'), to 
// deal in the Software without restriction, including without limitation the 
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
// sell copies of the Software, and to permit persons to whom the Software is 
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in 
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
// THE SOFTWARE.

// Input Parameter

var platformSelected = 1;
var devicesInContext = [2];

// Log details

var log_level = 2;
log = console.log;
var sep = "\n-------------------------------------------------------\n";

// Requirements: node.js, webcl

var nodejs = (typeof window === 'undefined');
if(nodejs) {WebCL = require('../node-webcl/webcl'); }

// Platform

try {
    var platformList = WebCL.getPlatforms();
} catch(err) {
    throw new Error("Error in getPlatforms() - " + err);
}

if (platformSelected < 0 || platformSelected > platformList.length-1) {
    throw new Error(sep + "Platform: " + platformSelected + "\n> number must be in range 0.." + (platformList.length-1) + sep);
}

try {
    var platform = platformList[platformSelected];
} catch(err) {


}

if (log_level > 0) log('Platform ['+platform.getInfo(WebCL.PLATFORM_NAME)+']');

// Devices

try {
    var deviceList = platform.getDevices(WebCL.DEVICE_TYPE_ALL);
    var counter = 0;
    deviceList.forEach(function(device){
        if (log_level > 1) log('> '+device.getInfo(WebCL.DEVICE_NAME));
        counter ++;
    });
} catch(err) {
    throw new Error("Error in getDevices(...)"+err);
}

// Context

try{
    var deviceSubList = [];
    deviceList.forEach(function(device,index){
        if (devicesInContext.indexOf(index)) deviceSubList.push(device);
    });
    var context = WebCL.createContext({
        platform: platform,
        devices: deviceSubList
    });
    if (log_level > 0) log('Context ['+context.getInfo(WebCL.CONTEXT_DEVICES).length+']');
    context.getInfo(WebCL.CONTEXT_DEVICES).forEach(function(device){
        if (log_level > 1) log('> '+device.getInfo(WebCL.DEVICE_NAME));
//      log('Context: '+context.getInfo(WebCL.CONTEXT_DEVICES)[devicesSelected[0]].getInfo(WebCL.DEVICE_NAME));
    });
}
catch(err) {
    throw new Error("Error in createContext(...)" + err);
}

    
