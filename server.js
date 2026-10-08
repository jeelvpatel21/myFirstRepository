const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // Website name for the course website.
    if (req.method === "GET" && req.url === "/api/getName") {
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        });

        res.end(JSON.stringify({ name: "Jeel's Website" }));
        return;
    }

    // Image for your card on the course website.
    if (req.method === "GET" && req.url === "/api/getImage") {
        res.setHeader("Access-Control-Allow-Origin", "*");

        fs.readFile(
            path.join(__dirname, "public", "background.jpg"),
            (err, data) => {
                if (err) {
                    res.writeHead(404, {
                        "Content-Type": "text/plain"
                    });
                    res.end("Image not found");
                    return;
                }

                res.writeHead(200, {
                    "Content-Type": "image/jpeg"
                });
                res.end(data);
            }
        );
        return;
    }

    // Your original response.
    let method = req.method + " ";
    let url = req.url + "\n\n";
    let headers = JSON.stringify(req.headers, null, 4);

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write(method);
    res.write(url);
    res.write(headers);
    res.end();
});

server.listen(port, hostname, () => {
    console.log(`Server started on port http://${hostname}:${port}`);
});

/*
const http = require("http");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer( (req, res) =>  {
    let method = req.method+" ";
    let url = req.url+ "\n\n";
    let headers = JSON.stringify(req.headers, null, 4);

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(method);
    res.write(url);
    res.write(headers);
    res.end();
});

server.listen(port, hostname, ()  =>  {
    console.log(`Server running at http://${hostname}:${port}`);
});
*/
