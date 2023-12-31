import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

server.post("/sign-up", (req, res) => {

    const { username, avatar } = req.body;
    const newUser = { username, avatar };

    if (!username || !avatar || typeof username !== 'string' || typeof avatar !== 'string') {
        return res.status(400).send("Preencha todos os campos corretamente");
    }

    users.push(newUser);

    return res.status(201).send("OK");

});

server.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
    const userValid = users.some(u => u.username === username);

    if(userValid){
        const newTweet = {username, tweet};
        tweets.push(newTweet);
        return res.status(201).send("OK");
    }else{
        res.status(401).send("UNAUTHORIZED");
   }
});


server.get("/t", (req, res) => {
    res.send(tweets)
})

server.get("/tweets", (req, res) => {
    const lastTenTweets = tweets.slice(-10).reverse();
    const newTweets = [];

    lastTenTweets.forEach(t => {
        const avatar = users.find(user => user.username === t.username).avatar;
        const username = t.username;
        const tweet = t.tweet;
        const resp = { username, avatar, tweet };
        newTweets.push(resp);
    });

    res.send(newTweets);
});

server.listen(5000);

