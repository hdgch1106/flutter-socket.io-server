const {io} = require("../index");
const Bands = require("../models/bands");
const Band = require("../models/band");

const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Bon Jovi"));
bands.addBand(new Band("Aerosmith"));
bands.addBand(new Band("Metalica"));

//Mensaje de Sockets
io.on('connection', client => {
    console.log("Cliente conectado");

    client.emit("active-bands", bands.getBands());

    client.on('disconnect', () => {
        console.log("Cliente desconectado");
    });

    client.on("mensaje", (payload) => {
        console.log("Mensaje", payload);

        io.emit("mensaje", {admin: "Nuevo msj"});
    });
    
    client.on("vote-band", (payload) => {
        bands.voteBand(payload.id);
        io.emit("active-bands", bands.getBands());
    });

    client.on("add-band", (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit("active-bands", bands.getBands());
    });

    client.on("delete-band", (payload) => {
        bands.deleteBand(payload.id);
        io.emit("active-bands", bands.getBands());
    });

    /* client.on("emitir-mensaje", (payload) => {
        client.broadcast.emit("emitir-mensaje", payload);
    }); */

  });