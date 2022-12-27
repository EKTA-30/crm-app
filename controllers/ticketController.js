const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');
const {userStatusConstants,userTypeConstants} = require('../utils/constants');
const objectConvereter = require('../utils/objectConvereter');

exports.createTicket = async function(req,res){
    const ticketObject = {
        title : req.body.title,
        ticketPriority : req.body.ticketPriority,
        decription : req.body.description,
        status : req.body.status,
        reporter : req.body.userId,
        // assignee : req.body.assignee
    }

    const engineer = await User.findOne({
        userType : userTypeConstants.engineer,
        userStatus: userStatusConstants.approved
    })

    ticketObject.assignee = engineer.userId 
    try{
        const ticket = await Ticket.create(ticketObject);
        if(ticket){
            const user = await User.findOne({
                userId : req.body.userId
            });
            user.ticketsCreated.push();
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({msg:"Internal server error"})
    }
}

exports.updateTicket = async function(req,res){

}

exports.getAllTickets =  async function(req,res){

}

exports.getOneTicket = async function(req,res){

}