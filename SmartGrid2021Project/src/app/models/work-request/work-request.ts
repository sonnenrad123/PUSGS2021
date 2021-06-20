import { Incident } from "src/app/incident-browser/incident-browser.component";
import { Device } from "src/app/incident-devices-dialog/incident-devices-dialog.component";
import { Attachment } from "../common/attachment";
import { WRStateChange } from "../common/wrstate-change";
import { WorkRequestDocumentType } from "../work-reques-doc-typet/work-request-document-type.enum";
import { WrDocumentStatus } from "../wr-document-status/wr-document-status.enum";


export class WorkRequest {
    typeOfDocument: WorkRequestDocumentType;
    statusOfDocument: WrDocumentStatus;
    createdBy: string;
    dateTimeCreated: Date;
    incident?: Incident;
    emergencyWork: boolean;
    startDateTime: Date;
    endDateTime: Date;
    phoneNo: string;
    street: string;
    company: string;
    purpose: string;
    details?: string;
    notes?: string;
    stateChangesHistory: Array<WRStateChange> = [];
    attachments: Array<Attachment> = [];
    equipment: Array<Device> = [];
    wR_id: number;
}
