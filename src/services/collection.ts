import dateformat from "dateformat";
import { Payment, Program, StatusEnum } from "../models";

export const collection = async (collectionDate: Date) => {
    const programs = await Program.find({
        launchDay: collectionDate.getDate(),
        startDate: {
            $lte: dateformat(collectionDate, "yyyy/mm")
        },
        endDate: {
            $gte: dateformat(collectionDate, "yyyy/mm")
        },
        isActive: true
    });

    for (const program of programs) {
        const { id, sum, paymentMethod, organizationId, projectId, customerId } = program;
        const payment = await Payment.build(
            {
                sum, collectionDate,
                paymentMethod, status: true, organizationId, projectId, customerId, programId: id
            });
        await payment.save();
    }
    return programs;
}


