import { getOrderDataByWebhookData } from "../repositories/webhook.repository";

export async function receiveWebhookReturnOrderData(body: any) {
    if (body.data?.id) {
        return await getOrderDataByWebhookData(body.data?.id)
    }
}