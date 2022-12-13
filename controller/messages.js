const Message = require("../model/messages")

const addMessage = (async(req, res) => {
    try {
        const { from, to, message } = req.body
        const data = await Message.create({
            message: { text: message},
            users: [from, to],
            sender: from
        })
        if (data) return res.json({ msg: "Message added successfully." });
        else return res.json({ msg: "Failed to add message to the database" });
    }
    catch(err){
        console.log(err)
        res.send(err).status(500)
    }
})

const getMessage = (async(req, res) => {
    try{
        const {from, to} = req.body
        const messages = await Message.find({
            users: {
                $all: [from, to],
            },
        }).sort({updatedAt: 1})

        const storedMessages = messages.map((msg) => {
            return{
                //fromSelf: msg.sender.toString() == from,
                sender: from,
                message: msg.message.text
            }
        })
        res.json(storedMessages)
    }
    catch(err){
        res.send(err).status(500)
    }
})

module.exports ={
    addMessage,
    getMessage
}