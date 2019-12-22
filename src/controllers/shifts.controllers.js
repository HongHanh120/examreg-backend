const responseUtil = require("../utils/response.util");
const shift = require("../models/shifts.models");

async function createShift(req, res) {
    const {examination_id} = req.tokenData;
    const {
        name,
        start_time,
        time
    } = req.body;
    try {
        if (!name)
            throw new Error("Name field is missing");
        if (!start_time)
            throw new Error("Start time field is missing");
        if (!time)
            throw new Error("Time field is missing");

        const [existedShift] = await shift.getShiftByName(name, time);
        if (existedShift.length)
            throw new Error("Shift is existed");

        await shift.createShift(name, start_time, time, examination_id);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function updateShift(req, res) {
    const {
        id,
        name,
        start_time,
        time
    } = req.body;
    try {
        if (!id)
            throw new Error("Id field is missing");
        if (!name)
            throw new Error("Name field is missing");
        if (!start_time)
            throw new Error("Start_time field is missing");
        if (!time)
            throw new Error("Time field is missing");

        const [existedShift] = await shift.getShiftById(id);
        if (!existedShift.length)
            throw new Error("This shift is not existed");

        const [duplication] = await shift.getShiftByName(name, time);
        if (duplication.length)
            throw new Error("This shift is existed");

        await shift.updateShift(id, name, start_time, time);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function deleteShift(req, res) {
    const {id} = req.query;
    try {
        if (!id)
            throw new Error("Id field is missing");

        const [existedShift] = await shift.getShiftById(id);
        if (!existedShift.length)
            throw new Error("This shift is not existed");

        await shift.deleteShiftById(id);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getAllShift(req, res) {
    try {
        let {page, pageSize} = req.query;
        if (!page) page = 1;
        if (!pageSize) pageSize = 20;
        const offset = (page - 1) * pageSize;
        const limit = Number(pageSize);

        [shifts] = await shift.getAllShifts(offset, limit);
        res.json(responseUtil.success({data: {shifts}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getInformation(req, res) {
    const {id} = req.query;
    try {
        if (!id)
            throw new Error("Id field is missing");
        let [existedShift] = await shift.getShiftById(id);
        if (!existedShift.length)
            throw new Error("This shift is not existed");
        existedShift = existedShift[0];
        res.json(responseUtil.success({data: {existedShift}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports = {
    createShift,
    updateShift,
    deleteShift,
    getAllShift,
    getInformation
};
