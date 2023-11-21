import express from "express";
import secaServices from "./seca-services.mjs"

const router = express.Router();

router.get('/events, popular', secaServices.getPopularEvent);
router.get('/events/search', secaServices.searchEvents);

export default function secaWebApi(app){
    app.use('/api', router);
}