const settings = require('./settings.js');
const fs3d = require('./fs3d.js');
const sysinfo = require('systeminformation');

const profiler = {
    init:new Promise(function(resolve, reject){
        if(settings.debug){console.log('Running System Profile...')};
        Promise.all([sysinfo.cpu(), sysinfo.mem(), sysinfo.graphics()]).then((values) => {
            var output = {cpu:null,memory:null,graphics:null};
            var cpu = values[0];
            var memory = values[1];
            var graphics = values[2];

            //Figure out which is the most powerful GFX card on the system
            var gcRam = [];
            for(card in graphics.controllers){gcRam[card] = graphics.controllers[card].vram;}
            var gfxMax = gcRam.reduce(function(a, b){return Math.max(a, b);},-Infinity);
            var gfxCard = graphics.controllers[gcRam.indexOf(gfxMax)];
            
            //Figure out which is the largest display
            var gcDisplay = [];
            for(display in graphics.displays){gcDisplay[display] = graphics.displays[display].resolutionX;}
            var displayMax = gcDisplay.reduce(function(a, b){return Math.max(a, b);},-Infinity);
            var display = graphics.displays[gcDisplay.indexOf(displayMax)];


            output.cpu = {
                manufacturer:cpu.manufacturer,
                brand:cpu.brand,
                family:cpu.family,
                model:cpu.model,
                speed:cpu.speed,
                cores:cpu.cores
            };
            output.memory = {
                total:memory.total,
                free:memory.free,
                used:memory.used
            };
            output.graphics = {
                vendor:gfxCard.vendor,
                model:gfxCard.model,
                ram:gfxCard.vram,
                depth:display.pixelDepth,
                resX:display.resolutionX,
                resY:display.resolutionY
            };
            resolve(output);
        });

    }),

    setProfile:function(){
        var profile = null;



        return profile;
    }
}

module.exports = profiler;