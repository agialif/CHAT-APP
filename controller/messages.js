const Message = require("../model/messages")
const User = require("../model/user")
const Supplier = require("../model/supplier")

const addMessage = (async(req, res) => {
    const from = req.body.from
    const to = req.body.to
    const supplier = await Supplier.findById(from)
    if (supplier) {
        room = from.concat(to)
    } else if(!supplier){
        room = to.concat(from)
    }
    try {
        const { from, to, message } = req.body
        const data = await Message.create({
            message: { text: message},
            users: [from, to],
            sender: from,
            roomId: room
        })
        if (data) return res.json(data);
        else return res.json({ msg: "Failed to add message to the database" });
    }
    catch(err){
        console.log(err)
        res.send(err).status(500)
    }
})

const getMessage = (async(req, res) => {
    const from = req.body.from
    const to = req.body.to
    const supplier = await Supplier.findById(from)
    if (supplier) {
        room = from.concat(to)
    } else if(!supplier){
        room = to.concat(from)
    }
   // res.json(room)
    try{
        //const roomId = req.body
        const messages = await Message.find({roomId: room}).sort({updatedAt: 1})

        const storedMessages = messages.map((msg) => {
           return{
                to: msg.users[1],
                sender: msg.sender,
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