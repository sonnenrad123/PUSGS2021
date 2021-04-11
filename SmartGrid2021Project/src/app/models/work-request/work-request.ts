import { WrDocumentStatus } from "../wr-document-status/wr-document-status.enum";

export class WorkRequest {
    id: string;
    start_date: Date;
    phone_no: string;
    status: WrDocumentStatus;
    address: string;
}
