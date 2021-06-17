import { Payment, Program, StatusEnum } from "../models";

export const collection = async (collectionDay: number) => {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const programs = await Program.find({ launchDay: 12 });
    for (const program of programs) {
        const { id, sum, paymentMethod, organizationId, projectId, customerId } = program;
        const payment = await Payment.build(
            {
                sum, collectionDate: new Date(year, month, 12),
                paymentMethod, status: StatusEnum.OK, organizationId, projectId, customerId, programId: id
            });
        await payment.save();
    }
    return programs;

}


