const settings = require('./settings.js');
const fs3d = require('./fs3d.js');
const sysinfo = require('systeminformation');

const profiler = {
    init:new Promise(function(resolve, reject){
        if(settings.debug){console.log('Running System Profile')};
        Promise.all([sysinfo.cpu(), sysinfo.mem(), sysinfo.graphics()]).then((values) => {
            var output = {cpu:null,memory:null,graphics:null};
            var cpu = values[0];
            var memory = values[1];
            var graphics = values[2];
            //console.log(graphics.displays);

            //Figure out which is the most powerful GFX card on the system
            var gcRam = [];
            for(card in graphics.controllers){gcRam[card] = graphics.controllers[card].vram;}
            var gfxMax = gcRam.reduce(function(a, b){return Math.max(a, b);},-Infinity);
            var gfxCard = graphics.controllers[gcRam.indexOf(gfxMax)];
            //Figure out which is the largest display



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
                depth:graphics.displays.pixelDepth,
                resX:graphics.displays.resolutionX,
                resY:graphics.displays.resolutionY,
            };
            console.log(output.graphics);
            resolve(output);
        });

    })
}

module.exports = profiler;