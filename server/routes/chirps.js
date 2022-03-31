import * as express from 'express';
const router = express.Router();
// const chirpsStore = require("../chirpstore.js");
// no more chirpstore! install mysql from npm and configure the routes to use that instead of chirpstore.

import db from '../db';

// REST API
router.get("/:id?", async (req, res) => {
    const id = req.params.id;

    if (id) {
        try {
            // const chirp = chirpsStore.GetChirp(id);
            res.json(await db.Chirps.one(id));
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    } else {
        try {
            //console.log(db.Chirps.all)
            //const chirps = chirpsStore.GetChirps();
            res.json(await db.Chirps.all());
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
});

// Delete
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    
    try {
        // chirpsStore.DeleteChirp(id);
        res.json(await db.Chirps.remove(id));
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Create
router.post("/", async (req, res) => {
    const body = req.body;
    
    try {
        // chirpsStore.CreateChirp(body);
        res.json(await db.Chirps.post(body.userid, body.content, body.location));
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Update
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        // chirpsStore.UpdateChirp(id, body);
        res.json(await db.Chirps.update(id, body.userid, body.content, body.location));
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;