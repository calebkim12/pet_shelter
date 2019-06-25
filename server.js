const express = require("express"),
        cors = require("cors"),
            bp = require("body-parser");
        DB_NAME = "petsdb",
            app = express(),
            port = 8000;

app.use(bp.json());
app.use(cors());

require("./server/utils/mongoose")(DB_NAME);
require("./server/utils/routes")(app);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});