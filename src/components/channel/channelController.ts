import { RequestHandler } from 'express';
import JWT from '../utils/jwt';
import santizeObject from '../utils/sanitizeObject';

import channelValidator from './channelValidator';
import channelService from './channelService';

// to create channels for a user
const createChannel: RequestHandler = async (req, res, next) => {
    const { createChannelSchema } = channelValidator;

    try {
        const { name, description } = req.body;
        const { userID } = JWT.JWTDecode(req.session.user);

        // validate schema
        const { error, value } = createChannelSchema.validate({
            _user: userID,
            name,
            description
        });
        if (error) next(error);

        // create channel in db
        const channel = await channelService.createChannel(value);
        res.send(channel).status(200);
    } catch (error) {
        next({ statusCode: 417, message: error.message });
    }
};

const readChannel: RequestHandler = (req, res, next) => {
    res.send('Yo');
};

// update the channel for a user
const updateChannel: RequestHandler = async (req, res, next) => {
    const { updateChannelSchema } = channelValidator;

    try {
        // userid and channel name via channel token
        const { userID } = JWT.JWTDecode(req.session.user);
        const { id } = req.params;
        const { name, description } = req.body;

        // channel schema validate
        const { error, value } = updateChannelSchema.validate({
            name,
            description
        });

        // validating
        if (error) next({ stateCode: 417, message: 'validation failed' });

        const sanitizedValue = santizeObject(value);
        const channel = { _id: id, _user: userID as string };

        const updateStatus = await channelService.updateChannel(
            channel,
            sanitizedValue
        );

        res.json({ status: 200, result: updateStatus }).status(200);
    } catch (error) {
        next({ statusCode: 417, message: error.message });
    }
};

const listChannels: RequestHandler = async (req, res, next) => {
    const { listChannelSchema } = channelValidator;

    try {
        const { userID } = JWT.JWTDecode(req.session.user);

        // channel schemea validate
        const { error, value } = listChannelSchema.validate({
            _user: userID
        });

        if (error) next({ stateCode: 417, message: 'validation failed' });
        // service to delete a channel
        const channel = await channelService.listChannels(value);
        res.send(channel).status(200);
    } catch (error) {
        next({ stateCode: 417, message: error.message });
    }
};

// delete channel of a user
const deleteChannel: RequestHandler = async (req, res, next) => {
    try {
        // userid and channel name via channel token
        const { userID } = JWT.JWTDecode(req.session.user);

        // get channel name to be deleted
        const { id } = req.params;

        // status of deletion
        const status = await channelService.deleteChannel(id, userID);
        res.json({ status: 200, message: status }).status(200);
        next();
    } catch (error) {
        next({ stateCode: 417, message: error.message });
    }
};

export default {
    createChannel,
    readChannel,
    updateChannel,
    listChannels,
    deleteChannel
};
