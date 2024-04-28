import mongoose from 'mongoose';
import Utilization from '../models/utilizationModel.js'
import moment from 'moment-timezone';

export const fetchUnitConsumed = async (req, res) => {

    const { startDate, endDate } = req.query;

    const startDateUTC = moment(startDate).utc().toDate();
    const endDateUTC = moment(endDate).utc().toDate();

    const endOfDate = new Date(endDateUTC);
    endOfDate.setHours(23, 59, 59, 999);

    const userId = req.user.userId;
    try {
        const utilizationData = await Utilization
            .find({
                userId,
                startDate: { $gte: startDateUTC, $lte: endOfDate }
            })
            .select('unitConsumed')


        let totalUnitConsumed = 0;
        utilizationData.forEach(data => {
            totalUnitConsumed += data.unitConsumed;
        });

        return res.status(200).json({ totalUnitConsumed })
    }
    catch (error) {
        console.error('Error fetching unit consumed:', error);
        return res.status(500).json({ message: "Internal server error" })

    }
}

export const fetchUtilization = async (req, res) => {

    const { startDate, endDate } = req.query;
    
    const startDateUTC = moment(startDate).utc().toDate();
    const endDateUTC = moment(endDate).utc().toDate();
    const endOfDate = new Date(endDateUTC);
    endOfDate.setHours(23, 59, 59, 999);
    const userId = req.user.userId;
    try {
        const utilizationData = await Utilization
            .find({
                userId,
                startDate: { $gte: startDateUTC, $lte: endOfDate }
            })
            .sort({ startDate: -1 })
            .select('startDate endDate unitConsumed')

        const utilization = utilizationData.map(data => ({
            startDate: moment(data.startDate).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
            endDate: moment(data.endDate).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
            unitConsumed: data.unitConsumed
        }));

        console.log(utilization);

        return res.status(200).json({ utilization })
    }
    catch (error) {
        console.error('Error fetching utilization Data:', error);
        return res.status(500).json({ message: "Internal server error" })

    }
}

export const storeUtilizationData = async (req, res) => {
    const { userId, startDate, endDate, unitConsumed } = req.body;
    console.log(req.body);
    const userIdObject = new mongoose.Types.ObjectId(userId.toString());
    try {
        const utilizationData = new Utilization({
            userId: userIdObject,
            startDate,
            endDate,
            unitConsumed
        });
        await utilizationData.save()
        console.log(utilizationData);
        return res.status(201).json({ message: 'Utilization data stored successfully' });
    } catch (error) {
        console.error('Error storing utilization data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const getAllUtilizationData = async (req, res) => {
    const userId = req.user.userId;
    try {
        const utilizationData = await Utilization
            .find({ userId })
            .sort({ startDate: -1 })
            .select('startDate endDate unitConsumed')

        const utilization = utilizationData.map(data => ({
            startDate: moment(data.startDate).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
            endDate: moment(data.endDate).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
            unitConsumed: data.unitConsumed
        }));

        return res.status(200).json({ utilization });
    } catch (error) {
        console.error('Error fetching utilization data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
