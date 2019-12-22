const responseUtil = require("../utils/response.util");
const room = require("../models/rooms.models");

async function createRoom(req, res) {
    const {
        name,
        slot
    } = req.body;
    try {
        if (!name)
            throw new Error("Name field is missing");
        if (!slot)
            throw new Error("Slot field is missing");

        const [existedRoom] = await room.getRoomByName(name);
        if (existedRoom.length)
            throw new Error("This room is existed");

        await room.createRoom(name, slot);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function updateRoom(req, res) {
    const {
        id,
        name,
        slot
    } = req.body;
    try {
        if (!id)
            throw new Error("Id field is missing");
        if (!name)
            throw new Error("Name field is missing");
        if (!slot)
            throw new Error("Slot field is missing");

        const [existedRoom] = await room.getRoomById(id);
        console.log(existedRoom)
        if (!existedRoom.length)
            throw new Error("This room is not existed");

        const [duplication] = await room.getRoomByName(name);
        if (duplication.length)
            throw new Error("This room is existed");

        await room.updateRoom(id, name, slot);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getAllRoom(req, res) {
    try {
        [rooms] = await room.getAllRoom();
        res.json(responseUtil.success({data: {rooms}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getInformation(req, res) {
    const {id} = req.query;
    try {
        if (!id)
            throw new Error("Id field is missing");
        let [existedRoom] = await room.getRoomById(id);
        if (!existedRoom.length)
            throw new Error("This room is not existed");
        existedRoom = existedRoom[0];
        res.json(responseUtil.success({data: {existedRoom}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function deleteRoom(req, res) {
    const {id} = req.query;
    try {
        if (!id)
            throw new Error("Id field is missing");
        const [existedRoom] = await room.getRoomById(id);
        if (!existedRoom.length)
            throw new Error("This room is not existed");
        await room.deleteRoomById(id);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports = {
    createRoom,
    updateRoom,
    getAllRoom,
    getInformation,
    deleteRoom
};
